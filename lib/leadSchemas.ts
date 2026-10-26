import { z } from "zod";

/** Zod fragments shared by every lead endpoint. */

export const phoneSchema = z
  .string()
  .trim()
  .max(25)
  .regex(/^[0-9+\-\s()]+$/, "Phone number contains invalid characters")
  .refine((v) => v.replace(/\D/g, "").length >= 8, "Phone number looks too short");

const attributionField = z.string().trim().max(200).optional();

export const attributionSchema = z
  .object({
    utm_source: attributionField,
    utm_medium: attributionField,
    utm_campaign: attributionField,
    utm_term: attributionField,
    utm_content: attributionField,
    gclid: attributionField,
    landing_path: attributionField,
    referrer: attributionField,
  })
  .default({});
