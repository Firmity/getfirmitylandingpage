import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardMockup } from "@/components/DashboardMockup";
import { getIcon } from "@/lib/icons";
import { cmmsBridge } from "@/lib/content";

export function CmmsBridge() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-start gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionEyebrow>{cmmsBridge.eyebrow}</SectionEyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-[32px] font-medium leading-[1.15] text-ink sm:text-[38px]">
              {cmmsBridge.h2}
            </h2>
            <p className="mt-5 max-w-[56ch] text-[16.5px] leading-[1.65] text-ink-soft">
              {cmmsBridge.intro}
            </p>
          </Reveal>

          <div className="mt-11 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {cmmsBridge.features.map((f, i) => {
              const Icon = getIcon(f.icon);
              return (
                <Reveal key={f.title} delay={i * 0.06}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-paper">
                    <Icon className="h-[18px] w-[18px]" fill="currentColor" stroke="none" />
                  </div>
                  <h3 className="mt-3.5 text-[16px] font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.55] text-ink-soft">{f.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1} variant="fade" className="mx-auto lg:mx-0 lg:justify-self-end">
          <DashboardMockup />
        </Reveal>
      </Container>
    </section>
  );
}
