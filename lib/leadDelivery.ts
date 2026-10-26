import { sendLeadEmail, type LeadEmail } from "@/lib/mailer";

/**
 * Shared delivery for every lead form (contact + survey).
 *
 * Channels run in parallel: email (EMAIL_USER/EMAIL_PASS; recipient defaults to firmity9@gmail.com) and
 * a CRM webhook (LEADS_WEBHOOK_URL, 6s timeout + one retry).
 *  - "logged":    no channel configured; lead only logged (dev/staging).
 *  - "delivered": at least one configured channel succeeded.
 *  - "failed":    channels are configured and ALL failed.
 *
 * Error taxonomy: [WEBHOOK_ERR] [EMAIL_ERR] [EMAIL_SKIPPED] [LEAD_RECEIVED]
 */

export type DeliveryResult = "logged" | "delivered" | "failed";

const WEBHOOK_TIMEOUT_MS = 6000;

async function forwardToWebhook(
  webhookUrl: string,
  body: Record<string, unknown>,
  requestId: string
): Promise<boolean> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, request_id: requestId }),
        signal: controller.signal,
      });
      if (res.ok) return true;

      console.error(`[WEBHOOK_ERR] attempt=${attempt} request_id=${requestId} status=${res.status}`);
    } catch (err) {
      console.error(
        `[WEBHOOK_ERR] attempt=${attempt} request_id=${requestId} error=${(err as Error).message}`
      );
    } finally {
      clearTimeout(timeout);
    }
  }
  return false;
}

export async function deliverLead(
  webhookBody: Record<string, unknown>,
  email: LeadEmail,
  requestId: string
): Promise<DeliveryResult> {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const emailConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

  if (!webhookUrl && !emailConfigured) {
    console.info(`[LEAD_RECEIVED] request_id=${requestId} lead=${JSON.stringify(webhookBody)}`);
    return "logged";
  }

  const [webhookOk, emailOk] = await Promise.all([
    webhookUrl ? forwardToWebhook(webhookUrl, webhookBody, requestId) : Promise.resolve(false),
    emailConfigured ? sendLeadEmail(email, requestId) : Promise.resolve(false),
  ]);

  if (webhookOk || emailOk) return "delivered";

  // Every configured channel failed. Log the lead so it is recoverable from logs.
  console.error(`[WEBHOOK_ERR] request_id=${requestId} lead_undelivered=true lead=${JSON.stringify(webhookBody)}`);
  return "failed";
}

/** Flattens attribution into labelled email rows, skipping empty values. */
export function attributionRows(attribution: Record<string, string | undefined>): Array<[string, string]> {
  return Object.entries(attribution).flatMap(([key, value]) => (value ? [[key, value] as [string, string]] : []));
}
