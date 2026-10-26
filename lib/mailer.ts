import nodemailer from "nodemailer";

/**
 * Delivers lead submissions to a real inbox via Gmail SMTP. Kept isolated from
 * the route handler so the external-call surface (transporter setup,
 * timeout) lives in one place.
 *
 * Required env: EMAIL_USER, EMAIL_PASS (a Gmail App Password, not the
 * account password). Optional: RECEIVER_EMAIL (defaults to DEFAULT_RECEIVER). If any are missing, sendLeadEmail
 * resolves to false immediately rather than throwing, so the caller can
 * fall back gracefully (see lib/leadDelivery.ts).
 */

export type LeadEmail = {
  /** Heading inside the email body. */
  title: string;
  /** Subject line; CR/LF are stripped before sending. */
  subject: string;
  replyTo: string;
  rows: Array<[string, string]>;
};

const SEND_TIMEOUT_MS = 8000;

/** Inbox that receives every lead unless RECEIVER_EMAIL overrides it. */
export const DEFAULT_RECEIVER = "firmity9@gmail.com";

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return null;

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
      connectionTimeout: SEND_TIMEOUT_MS,
      socketTimeout: SEND_TIMEOUT_MS,
    });
  }
  return cachedTransporter;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("email_send_timeout")), ms)),
  ]);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Strips CR/LF so user input can never inject extra mail headers via the subject. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/**
 * Sends one lead as an email to RECEIVER_EMAIL. Returns true on confirmed
 * delivery, false on any failure or missing config, never throws.
 */
export async function sendLeadEmail(lead: LeadEmail, requestId: string): Promise<boolean> {
  const receiver = process.env.RECEIVER_EMAIL || DEFAULT_RECEIVER;
  const transporter = getTransporter();

  if (!transporter || !receiver) {
    console.info(`[EMAIL_SKIPPED] request_id=${requestId} reason=not_configured`);
    return false;
  }

  const rows = lead.rows;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <div style="font-family:sans-serif;font-size:14px;color:#17181b;">
      <h2 style="margin:0 0 16px;">${escapeHtml(lead.title)}</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="color:#4a5568;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td>
            <td>${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="color:#718096;font-size:12px;margin-top:16px;">Request ID: ${requestId}</p>
    </div>
  `;

  try {
    await withTimeout(
      transporter.sendMail({
        from: `"Firmity Website" <${process.env.EMAIL_USER}>`,
        to: receiver,
        replyTo: lead.replyTo,
        subject: singleLine(lead.subject),
        text,
        html,
      }),
      SEND_TIMEOUT_MS
    );
    return true;
  } catch (err) {
    console.error(`[EMAIL_ERR] request_id=${requestId} error=${(err as Error).message}`);
    return false;
  }
}
