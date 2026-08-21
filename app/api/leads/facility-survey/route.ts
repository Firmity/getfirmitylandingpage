import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadEmail } from "@/lib/mailer";

/**
 * Lead capture endpoint for the facility health survey form.
 *
 * Behavior:
 *  - Validates the payload (fails loudly, 400, on bad input).
 *  - Delivers the lead through every configured channel, in parallel:
 *      - EMAIL_USER/EMAIL_PASS/RECEIVER_EMAIL set -> emails the lead (see lib/mailer.ts)
 *      - LEADS_WEBHOOK_URL set -> forwards to the CRM/webhook with timeout + one retry
 *  - If neither channel is configured, logs the lead and returns success anyway,
 *    so the frontend/GTM integration is testable before delivery is wired up.
 *  - The request only fails if at least one channel IS configured and ALL
 *    configured channels failed — a working channel means the lead got through.
 *  - Response shape is stable regardless of which path was taken.
 *
 * Error taxonomy: [INVALID_INPUT] [WEBHOOK_ERR] [EMAIL_ERR] [EMAIL_SKIPPED] [INTERNAL_ERR] [LEAD_RECEIVED]
 */

const LeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  phone: z
    .string()
    .trim()
    .min(6, "Phone number looks too short")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Phone number contains invalid characters"),
  email: z.string().trim().email("Enter a valid work email").max(320),
  property_name: z.string().trim().min(1, "Property name is required").max(200),
  property_type: z.string().trim().min(1, "Select a property type").max(80),
  city: z.string().trim().min(1, "City is required").max(120),
  source: z.string().trim().max(80).optional(),
});

type LeadPayload = z.infer<typeof LeadSchema>;

const WEBHOOK_TIMEOUT_MS = 6000;

async function forwardToWebhook(webhookUrl: string, lead: LeadPayload, requestId: string): Promise<boolean> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, request_id: requestId }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) return true;

      console.error(
        `[WEBHOOK_ERR] attempt=${attempt} request_id=${requestId} status=${res.status}`
      );
    } catch (err) {
      clearTimeout(timeout);
      console.error(
        `[WEBHOOK_ERR] attempt=${attempt} request_id=${requestId} error=${(err as Error).message}`
      );
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    console.error(`[INVALID_INPUT] request_id=${requestId} reason=malformed_json`);
    return NextResponse.json(
      { ok: false, message: "Invalid request body.", error_code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    console.error(
      `[INVALID_INPUT] request_id=${requestId} issues=${JSON.stringify(parsed.error.flatten().fieldErrors)}`
    );
    return NextResponse.json(
      { ok: false, message: "Please check the form and try again.", error_code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const lead = parsed.data;
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const emailConfigured = Boolean(
    process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.RECEIVER_EMAIL
  );

  try {
    const configuredChannels = (webhookUrl ? 1 : 0) + (emailConfigured ? 1 : 0);

    if (configuredChannels === 0) {
      // No delivery channel wired up yet — log-only fallback so the funnel still works in dev/staging.
      console.info(`[LEAD_RECEIVED] request_id=${requestId} lead=${JSON.stringify(lead)}`);
      return NextResponse.json({
        ok: true,
        message: "Thanks! We'll reach out within 24 hours to schedule your visit.",
      });
    }

    const [webhookDelivered, emailDelivered] = await Promise.all([
      webhookUrl ? forwardToWebhook(webhookUrl, lead, requestId) : Promise.resolve(false),
      emailConfigured ? sendLeadEmail(lead, requestId) : Promise.resolve(false),
    ]);

    const anyDelivered = webhookDelivered || emailDelivered;

    if (!anyDelivered) {
      // Every configured channel failed — still log the lead so it isn't lost.
      console.error(
        `[WEBHOOK_ERR] request_id=${requestId} lead_undelivered=true lead=${JSON.stringify(lead)}`
      );
      return NextResponse.json(
        {
          ok: false,
          message: "We received your details but couldn't confirm scheduling. Please call us directly.",
          error_code: "WEBHOOK_ERR",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks! We'll reach out within 24 hours to schedule your visit.",
    });
  } catch (err) {
    console.error(`[INTERNAL_ERR] request_id=${requestId} error=${(err as Error).message}`);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again.", error_code: "INTERNAL_ERR" },
      { status: 500 }
    );
  }
}
