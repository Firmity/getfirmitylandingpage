import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { propertyTypeOptions } from "@/lib/landing";
import { attributionRows, deliverLead } from "@/lib/leadDelivery";
import { attributionSchema, phoneSchema } from "@/lib/leadSchemas";

/**
 * Lead capture for the "Book a survey" dialog (free facility health survey).
 * Same pipeline and response shape as /api/leads/demo.
 * Error taxonomy: [INVALID_INPUT] [SPAM_TRAP] [INTERNAL_ERR] (+ delivery tags).
 */

const LeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  phone: phoneSchema,
  email: z.string().trim().email("Enter a valid work email").max(320),
  property_name: z.string().trim().min(1, "Property name is required").max(200),
  property_type: z.enum(propertyTypeOptions),
  city: z.string().trim().min(1, "City is required").max(120),
  attribution: attributionSchema,
  website: z.string().max(200).optional(),
});

const SUCCESS_MESSAGE = "Thanks. We will reach out within 24 hours to schedule your survey.";

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

  const { website, ...lead } = parsed.data;

  if (website) {
    console.warn(`[SPAM_TRAP] request_id=${requestId} honeypot_filled=true`);
    return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
  }

  try {
    const result = await deliverLead(
      { form: "survey", ...lead, ...lead.attribution },
      {
        title: "New facility survey request",
        subject: `New facility survey request from ${lead.property_name}`,
        replyTo: lead.email,
        rows: [
          ["Name", lead.name],
          ["Phone", lead.phone],
          ["Email", lead.email],
          ["Property", lead.property_name],
          ["Property type", lead.property_type],
          ["City", lead.city],
          ...attributionRows(lead.attribution),
        ],
      },
      requestId
    );

    if (result === "failed") {
      return NextResponse.json(
        {
          ok: false,
          message: "We could not confirm your request. Please try again or WhatsApp us.",
          error_code: "DELIVERY_FAILED",
        },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
  } catch (err) {
    console.error(`[INTERNAL_ERR] request_id=${requestId} error=${(err as Error).message}`);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again.", error_code: "INTERNAL_ERR" },
      { status: 500 }
    );
  }
}
