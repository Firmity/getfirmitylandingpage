import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/landing";

export type ThankYouCopy = {
  h1: string;
  sub: string;
  steps: { num: string; title: string; body: string }[];
  trustLines: string[];
  ctaLabel: string;
};

/** Shared layout for /thank-you (contact) and /thank-you/survey. Copy is passed in. */
export function ThankYouView({ copy }: { copy: ThankYouCopy }) {
  return (
    <section className="flex-1 bg-paper-dim py-14 sm:py-20">
      <Container className="max-w-[860px]">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-white">
          <Check aria-hidden="true" className="h-6 w-6" strokeWidth={3} />
        </span>

        <h1 className="mt-6 max-w-[20ch] text-[38px] font-bold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[50px]">
          {copy.h1}
        </h1>
        <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.55] text-ink-soft">{copy.sub}</p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {copy.trustLines.map((line) => (
            <li key={line} className="flex items-center gap-2 text-[14.5px] font-medium text-ink">
              <Check aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={3} />
              {line}
            </li>
          ))}
        </ul>

        <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3">
          {copy.steps.map((step) => (
            <li key={step.num} className="bg-white p-6">
              <span className="text-[13px] font-semibold tabular-nums text-accent">{step.num}</span>
              <h2 className="mt-3 text-[18px] font-semibold leading-snug tracking-[-0.015em] text-ink">
                {step.title}
              </h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href="/">{copy.ctaLabel}</Button>
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-medium text-accent underline underline-offset-4 hover:text-accent-strong"
          >
            Prefer WhatsApp? {contact.whatsappDisplay}
          </a>
        </div>
      </Container>
    </section>
  );
}
