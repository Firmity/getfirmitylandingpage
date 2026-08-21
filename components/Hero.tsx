import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CheckBadge } from "@/components/ui/CheckBadge";
import { GaugeWidget } from "@/components/GaugeWidget";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="pt-14 pb-20 sm:pt-20 sm:pb-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <Reveal>
            <div className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
              {hero.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 max-w-[16ch] font-serif text-[40px] font-medium leading-[1.08] tracking-[-0.01em] text-ink sm:text-[52px] lg:text-[56px]">
              {hero.h1}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-ink-soft sm:text-[18px]">
              {hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button href="#lead-form" variant="primary">
                {hero.ctaLabel}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {hero.microTrust.map((line) => (
                <li key={line} className="flex items-center gap-2 text-[13.5px] text-ink-faint">
                  <CheckBadge />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} variant="fade" className="mx-auto lg:mx-0 lg:justify-self-end">
          <GaugeWidget />
        </Reveal>
      </Container>
    </section>
  );
}
