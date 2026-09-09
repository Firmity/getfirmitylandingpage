import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckBadge } from "@/components/ui/CheckBadge";
import { thankYou } from "@/lib/content";

export const metadata: Metadata = {
  title: "Assessment Booked | Firmity",
  description: "Your free Facility Health Assessment has been booked. Here's what happens next.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-[760px] text-center">
        <Reveal>
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-paper shadow-[var(--shadow-floating)]">
            <Check className="h-8 w-8" strokeWidth={3} />
          </span>

          <SectionEyebrow tone="accent" className="mt-7 justify-center flex">
            {thankYou.eyebrow}
          </SectionEyebrow>
          <h1 className="mx-auto mt-4 max-w-[22ch] font-serif text-[32px] font-medium leading-[1.15] text-ink sm:text-[42px]">
            {thankYou.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-ink-soft">
            {thankYou.sub}
          </p>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2.5">
            {thankYou.trustLines.map((line) => (
              <li key={line} className="flex items-center gap-2 text-[13.5px] text-ink-soft">
                <CheckBadge />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative mt-16 grid gap-10 text-left sm:grid-cols-3 sm:gap-8">
          {/* connecting line, desktop only — same treatment as HowItWorks */}
          <div className="pointer-events-none absolute top-[19px] left-0 right-0 hidden h-px bg-line sm:block" />

          {thankYou.steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="relative">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper-raised font-sans font-semibold text-[13px] text-ink">
                  {step.num}
                </div>
                <h3 className="mt-5 font-serif text-[18px] font-medium leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-soft">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16 flex justify-center">
          <Button href="/" variant="primary">
            {thankYou.ctaLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
