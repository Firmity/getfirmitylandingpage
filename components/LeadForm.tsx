"use client";

import { useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckBadge } from "@/components/ui/CheckBadge";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { pushDataLayerEvent } from "@/lib/analytics";
import { leadForm, propertyTypes } from "@/lib/content";

type FormState = {
  fname: string;
  fphone: string;
  femail: string;
  fproperty: string;
  ftype: string;
  fcity: string;
};

const INITIAL_STATE: FormState = {
  fname: "",
  fphone: "",
  femail: "",
  fproperty: "",
  ftype: "",
  fcity: "",
};

type SubmitStatus = { kind: "idle" } | { kind: "success"; message: string } | { kind: "error"; message: string };

const inputClass =
  "w-full rounded-xl border border-line bg-paper-raised px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint transition-colors focus:border-accent";

export function LeadForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ kind: "idle" });

    try {
      const res = await fetch("/api/leads/facility-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fname,
          phone: form.fphone,
          email: form.femail,
          property_name: form.fproperty,
          property_type: form.ftype,
          city: form.fcity,
          source: "landing_page_survey",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "submit_failed");
      }

      pushDataLayerEvent({
        event: "survey_form_submit",
        form_name: "facility_health_survey",
        property_type: form.ftype,
        city: form.fcity,
      });

      setStatus({ kind: "success", message: leadForm.successMessage });
      setForm(INITIAL_STATE);
    } catch {
      setStatus({ kind: "error", message: leadForm.errorMessage });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="lead-form" className="py-10 sm:py-14">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionEyebrow tone="amber">{leadForm.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 max-w-[18ch] font-serif text-[32px] font-medium leading-[1.15] text-ink sm:text-[38px]">
            {leadForm.h2}
          </h2>
          <p className="mt-5 max-w-[50ch] text-[16px] leading-[1.6] text-ink-soft">{leadForm.sub}</p>

          <ul className="mt-8 space-y-3">
            {leadForm.trustLines.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-[14.5px] text-ink-soft">
                <CheckBadge className="mt-[2px]" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-10 hidden lg:block">
            <PhotoFrame
              src="/assets/report-stack-alt.webp"
              alt="Facility Health Reports, printed and ready to hand over"
              width={748}
              height={438}
              tilt="none"
              frame="cutout"
              className="max-w-[380px]"
              sizes="380px"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} variant="fade">
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-line bg-paper-raised p-7 shadow-[var(--shadow-raised)] sm:p-9"
            noValidate
          >
            <h3 className="font-serif text-[21px] font-medium text-ink">{leadForm.formTitle}</h3>
            <p className="mt-1 text-[13.5px] text-ink-faint">{leadForm.formNote}</p>

            <div className="mt-6 space-y-5">
              <Field label="Full Name" htmlFor="fname">
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputClass}
                  value={form.fname}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Work Phone" htmlFor="fphone">
                  <input
                    id="fphone"
                    name="fphone"
                    type="tel"
                    required
                    placeholder="10-digit number"
                    className={inputClass}
                    value={form.fphone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Work Email" htmlFor="femail">
                  <input
                    id="femail"
                    name="femail"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={inputClass}
                    value={form.femail}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </Field>
              </div>

              <Field label="Property / Society / Company Name" htmlFor="fproperty">
                <input
                  id="fproperty"
                  name="fproperty"
                  type="text"
                  required
                  placeholder="e.g. Greenfield Housing Society"
                  className={inputClass}
                  value={form.fproperty}
                  onChange={handleChange}
                  autoComplete="organization"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Property Type" htmlFor="ftype">
                  <select
                    id="ftype"
                    name="ftype"
                    required
                    className={`${inputClass} appearance-none`}
                    value={form.ftype}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="City" htmlFor="fcity">
                  <input
                    id="fcity"
                    name="fcity"
                    type="text"
                    required
                    placeholder="e.g. Pune"
                    className={inputClass}
                    value={form.fcity}
                    onChange={handleChange}
                    autoComplete="address-level2"
                  />
                </Field>
              </div>
            </div>

            <Button type="submit" variant="primary" disabled={submitting} className="mt-7 w-full">
              {submitting ? "Submitting…" : leadForm.submitLabel}
            </Button>

            {status.kind !== "idle" && (
              <div
                role="status"
                className={`mt-4 flex items-start gap-2 rounded-xl px-3.5 py-3 text-[13.5px] ${
                  status.kind === "success" ? "bg-green-soft text-green" : "bg-red-soft text-red"
                }`}
              >
                <span
                  className={`mt-[1px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                    status.kind === "success" ? "bg-green" : "bg-red"
                  }`}
                >
                  {status.kind === "success" ? (
                    <Check className="h-2.5 w-2.5 text-paper" strokeWidth={3} />
                  ) : (
                    <X className="h-2.5 w-2.5 text-paper" strokeWidth={3} />
                  )}
                </span>
                {status.message}
              </div>
            )}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}
