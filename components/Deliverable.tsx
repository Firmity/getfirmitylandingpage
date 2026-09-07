import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckBadge } from "@/components/ui/CheckBadge";
import { ReportMockup } from "@/components/ReportMockup";
import { deliverable } from "@/lib/content";

export function Deliverable() {
  return (
    <section className="py-10 sm:py-14">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <SectionEyebrow tone="accent">{deliverable.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 max-w-[20ch] font-serif text-[32px] font-medium leading-[1.15] text-ink sm:text-[38px]">
            {deliverable.h2}
          </h2>

          <ul className="mt-8 space-y-3.5">
            {deliverable.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15.5px] leading-[1.5] text-ink-soft">
                <CheckBadge className="mt-[3px]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Button href={deliverable.ctaHref} variant="outline" className="mt-9">
            {deliverable.ctaLabel}
          </Button>
        </Reveal>

        <Reveal delay={0.1} variant="fade" className="mx-auto lg:mx-0 lg:justify-self-end">
          <ReportMockup />
        </Reveal>
      </Container>
    </section>
  );
}
