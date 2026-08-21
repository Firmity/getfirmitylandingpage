import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { statsStrip } from "@/lib/content";

export function StatsStrip() {
  return (
    <section className="border-y border-line py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3 sm:divide-x sm:divide-line">
          {statsStrip.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <div className="text-center sm:text-left">
                <AnimatedCounter
                  value={s.value}
                  className="font-serif text-[44px] font-medium leading-none text-ink sm:text-[52px]"
                />
                <p className="mx-auto mt-3 max-w-[26ch] text-[14.5px] leading-[1.5] text-ink-soft sm:mx-0">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
