"use client";

import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { pushDataLayerEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { Field, inputClass } from "@/components/landing/formParts";
import { contact, demoForm, moduleOptions } from "@/lib/landing";

type FormLocation = "hero" | "closing";

type FieldName = "name" | "phone" | "email" | "company" | "module";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "error";

type FormValues = Record<FieldName, string>;

const EMPTY: FormValues = { name: "", phone: "", email: "", company: "", module: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+\-\s()]+$/;

/** Pure validator, kept outside the component so it is unit-testable. */
export function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Enter your full name";

  const phone = values.phone.trim();
  if (!phone || !PHONE_RE.test(phone) || phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Enter a valid phone number";
  }
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid work email";
  if (!values.company.trim()) errors.company = "Enter your company or property";
  if (!values.module) errors.module = "Choose a module";
  return errors;
}

export function DemoForm({ location, id }: { location: FormLocation; id: string }) {
  const router = useRouter();
  const uid = useId();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  // Persist first-touch UTM/gclid as soon as the form mounts, in case the
  // visitor navigates before submitting.
  useEffect(() => {
    getAttribution();
  }, []);

  const setField = useCallback((field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear that field's error as soon as the visitor edits it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = (Object.keys(found) as FieldName[])[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          module: values.module,
          source: location,
          attribution: getAttribution(),
          website: honeypot,
        }),
      });

      if (!res.ok) {
        console.error(`[FORM_ERR] form=${location} status=${res.status}`);
        setStatus("error");
        return;
      }

      pushDataLayerEvent({
        event: "contact_form_submit",
        form_name: "contact",
        form_location: location,
        module_interest: values.module,
      });
      router.push("/thank-you");
    } catch (err) {
      console.error(`[FORM_ERR] form=${location} network error`, err);
      setStatus("error");
    }
  }

  const submitting = status === "submitting";

  return (
    <div id={id} className="scroll-mt-24 rounded-lg border border-line bg-white p-5 shadow-[0_1px_0_rgba(10,20,40,0.04),0_18px_40px_-24px_rgba(10,20,40,0.35)] sm:p-6">
      <h2 className="text-[20px] font-bold leading-tight tracking-[-0.02em] text-ink">{demoForm.title}</h2>
      <p className="mt-0.5 text-[14px] text-ink-soft">{demoForm.subtitle}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
        <Field label="Full name" id={`${uid}-name`} error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            className={`${inputClass} ${errors.name ? "border-red" : "border-line-strong"}`}
          />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Phone" id={`${uid}-phone`} error={errors.phone}>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
              className={`${inputClass} ${errors.phone ? "border-red" : "border-line-strong"}`}
            />
          </Field>
          <Field label="Work email" id={`${uid}-email`} error={errors.email}>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${uid}-email-err` : undefined}
              className={`${inputClass} ${errors.email ? "border-red" : "border-line-strong"}`}
            />
          </Field>
        </div>

        <Field label="Company or property" id={`${uid}-company`} error={errors.company}>
          <input
            id={`${uid}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? `${uid}-company-err` : undefined}
            className={`${inputClass} ${errors.company ? "border-red" : "border-line-strong"}`}
          />
        </Field>

        <Field label="Module you want to see" id={`${uid}-module`} error={errors.module}>
          <div className="relative">
            <select
              id={`${uid}-module`}
              name="module"
              value={values.module}
              onChange={(e) => setField("module", e.target.value)}
              aria-invalid={Boolean(errors.module)}
              aria-describedby={errors.module ? `${uid}-module-err` : undefined}
              className={`${inputClass} appearance-none pr-10 ${values.module ? "" : "text-ink-faint"} ${
                errors.module ? "border-red" : "border-line-strong"
              }`}
            >
              <option value="">Select a module</option>
              {moduleOptions.map((option) => (
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

        {/* Honeypot: off-screen, unreachable by keyboard, ignored by people. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input
              type="text"
              name="website"
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
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent text-[16px] font-semibold text-white transition-colors hover:bg-accent-strong disabled:opacity-70"
        >
          {submitting ? "Sending your request" : demoForm.submitLabel}
        </button>

        <div role="status" aria-live="polite">
          {status === "error" && (
            <p className="rounded-md border border-red/30 bg-red-soft px-3 py-2 text-[13.5px] text-red">
              {demoForm.errorMessage}
            </p>
          )}
        </div>

        <p className="text-[12.5px] leading-[1.5] text-ink-soft">
          {demoForm.note}{" "}
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
  );
}
