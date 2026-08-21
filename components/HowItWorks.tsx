import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-[46ch]">
          <SectionEyebrow>{howItWorks.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 font-serif text-[32px] font-medium leading-[1.15] text-ink sm:text-[40px]">
            {howItWorks.h2}
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* connecting line, desktop only */}
          <div className="pointer-events-none absolute top-[19px] left-0 right-0 hidden h-px bg-line lg:block" />

          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="relative">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper-raised font-sans font-semibold text-[13px] text-ink">
                  {step.num}
                </div>
                <h3 className="mt-5 font-serif text-[19px] font-medium leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-[32ch] text-[15px] leading-[1.6] text-ink-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
