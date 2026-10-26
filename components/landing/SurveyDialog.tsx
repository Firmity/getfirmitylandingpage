"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, borderFor, inputClass } from "@/components/landing/formParts";
import { pushDataLayerEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { contact, propertyTypeOptions, survey } from "@/lib/landing";

type FieldName = "name" | "phone" | "email" | "property_name" | "property_type" | "city";
type FormValues = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "error";

const EMPTY: FormValues = {
  name: "",
  phone: "",
  email: "",
  property_name: "",
  property_type: "",
  city: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+\-\s()]+$/;

/** Pure validator, kept outside the component so it is unit-testable. */
export function validateSurvey(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Enter your full name";

  const phone = values.phone.trim();
  if (!phone || !PHONE_RE.test(phone) || phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Enter a valid phone number";
  }
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid work email";
  if (!values.property_name.trim()) errors.property_name = "Enter your property name";
  if (!values.property_type) errors.property_type = "Choose a property type";
  if (!values.city.trim()) errors.city = "Enter your city";
  return errors;
}

/**
 * Trigger button + native <dialog>. showModal() gives focus trapping, Esc to
 * close and an inert background without extra code. Page scroll is locked
 * while it is open.
 */
export function SurveyDialog({ className = "" }: { className?: string }) {
  const router = useRouter();
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
    getAttribution();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Unlock scroll on every close path (button, Esc, backdrop, unmount).
  useEffect(() => {
    const dialog = dialogRef.current;
    const unlock = () => {
      document.documentElement.style.overflow = "";
    };
    dialog?.addEventListener("close", unlock);
    return () => {
      dialog?.removeEventListener("close", unlock);
      unlock();
    };
  }, []);

  const setField = useCallback((field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validateSurvey(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (Object.keys(found) as FieldName[])[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          property_name: values.property_name.trim(),
          property_type: values.property_type,
          city: values.city.trim(),
          attribution: getAttribution(),
          website: honeypot,
        }),
      });

      if (!res.ok) {
        console.error(`[FORM_ERR] form=survey status=${res.status}`);
        setStatus("error");
        return;
      }

      pushDataLayerEvent({
        event: "survey_form_submit",
        form_name: "facility_health_survey",
        property_type: values.property_type,
        city: values.city.trim(),
      });
      router.push("/thank-you/survey");
    } catch (err) {
      console.error("[FORM_ERR] form=survey network error", err);
      setStatus("error");
    }
  }

  const submitting = status === "submitting";
  const text = survey.dialog;

  return (
    <>
      <Button type="button" onClick={open} className={className}>
        {survey.ctaLabel}
      </Button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${uid}-title`}
        onClick={(e) => {
          // A click on the backdrop targets the <dialog> element itself.
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto max-h-[92vh] w-[calc(100%-2rem)] max-w-[480px] overflow-y-auto rounded-lg border border-line bg-white p-0 text-ink shadow-[var(--shadow-floating)] backdrop:bg-night/70"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={`${uid}-title`} className="text-[22px] font-bold leading-tight tracking-[-0.02em]">
                {text.title}
              </h2>
              <p className="mt-1 text-[14.5px] text-ink-soft">{text.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={text.closeLabel}
              className="-mr-2 -mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink-soft hover:bg-paper-dim hover:text-ink"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <Field label="Full name" id={`${uid}-name`} error={errors.name}>
              <input
                id={`${uid}-name`}
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                className={`${inputClass} ${borderFor(Boolean(errors.name))}`}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone" id={`${uid}-phone`} error={errors.phone}>
                <input
                  id={`${uid}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                  className={`${inputClass} ${borderFor(Boolean(errors.phone))}`}
                />
              </Field>
              <Field label="Work email" id={`${uid}-email`} error={errors.email}>
                <input
                  id={`${uid}-email`}
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                  className={`${inputClass} ${borderFor(Boolean(errors.email))}`}
                />
              </Field>
            </div>

            <Field label="Property name" id={`${uid}-property_name`} error={errors.property_name}>
              <input
                id={`${uid}-property_name`}
                type="text"
                autoComplete="organization"
                value={values.property_name}
                onChange={(e) => setField("property_name", e.target.value)}
                aria-invalid={Boolean(errors.property_name)}
                aria-describedby={errors.property_name ? `${uid}-property_name-err` : undefined}
                className={`${inputClass} ${borderFor(Boolean(errors.property_name))}`}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Property type" id={`${uid}-property_type`} error={errors.property_type}>
                <div className="relative">
                  <select
                    id={`${uid}-property_type`}
                    value={values.property_type}
                    onChange={(e) => setField("property_type", e.target.value)}
                    aria-invalid={Boolean(errors.property_type)}
                    aria-describedby={errors.property_type ? `${uid}-property_type-err` : undefined}
                    className={`${inputClass} appearance-none pr-10 ${
                      values.property_type ? "" : "text-ink-faint"
                    } ${borderFor(Boolean(errors.property_type))}`}
                  >
                    <option value="">Select type</option>
                    {propertyTypeOptions.map((option) => (
                      <option key={option} value={option} className="text-ink">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                  />
                </div>
              </Field>
              <Field label="City" id={`${uid}-city`} error={errors.city}>
                <input
                  id={`${uid}-city`}
                  type="text"
                  autoComplete="address-level2"
                  value={values.city}
                  onChange={(e) => setField("city", e.target.value)}
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? `${uid}-city-err` : undefined}
                  className={`${inputClass} ${borderFor(Boolean(errors.city))}`}
                />
              </Field>
            </div>

            {/* Honeypot: off-screen, unreachable by keyboard, ignored by people. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 w-full items-center justify-center rounded-md bg-accent text-[16px] font-semibold text-white transition-colors hover:bg-accent-strong disabled:opacity-70"
            >
              {submitting ? "Booking your survey" : text.submitLabel}
            </button>

            <div role="status" aria-live="polite">
              {status === "error" && (
                <p className="rounded-md border border-red/30 bg-red-soft px-3 py-2 text-[13.5px] text-red">
                  Something went wrong. Please try again, or WhatsApp us on {contact.whatsappDisplay}.
                </p>
              )}
            </div>

            <p className="text-[12.5px] leading-[1.5] text-ink-soft">
              {text.note}{" "}
              <a
                href={contact.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-2 hover:text-accent-strong"
              >
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
}
