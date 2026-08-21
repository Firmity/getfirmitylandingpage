import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { getIcon } from "@/lib/icons";
import { whyAssessed, type RiskLevel } from "@/lib/content";

const riskStyle: Record<RiskLevel, string> = {
  high: "text-red bg-red-soft",
  medium: "text-amber bg-amber-soft",
  rising: "text-green bg-green-soft",
};

const riskIconBg: Record<RiskLevel, string> = {
  high: "bg-red",
  medium: "bg-amber",
  rising: "bg-green",
};

export function WhyAssessed() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_260px] lg:gap-16">
          <Reveal>
            <SectionEyebrow>{whyAssessed.eyebrow}</SectionEyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-[32px] font-medium leading-[1.15] text-ink sm:text-[40px]">
              {whyAssessed.h2}
            </h2>
            <p className="mt-5 max-w-[58ch] text-[16.5px] leading-[1.65] text-ink-soft">
              {whyAssessed.intro}
            </p>
          </Reveal>

          <Reveal delay={0.1} variant="fade" className="hidden justify-self-end lg:block">
            <PhotoFrame
              src="/assets/report-cover.webp"
              alt="Facility Health Report cover"
              width={512}
              height={582}
              tilt="none"
              frame="cutout"
              className="max-w-[240px]"
              sizes="240px"
            />
          </Reveal>
        </div>

        <div className="mt-14 divide-y divide-line border-t border-line">
          {whyAssessed.items.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="grid gap-4 py-10 sm:grid-cols-[minmax(0,280px)_1fr] sm:gap-10 lg:grid-cols-[280px_1fr_240px]">
                  <div>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full text-paper ${riskIconBg[item.risk]}`}>
                      <Icon className="h-5 w-5" fill="currentColor" stroke="none" />
                    </div>
                    <span
                      className={`mt-4 inline-block rounded-full px-2.5 py-1 font-sans font-semibold text-[11px] uppercase tracking-[0.08em] ${riskStyle[item.risk]}`}
                    >
                      {item.riskLabel}
                    </span>
                    <h3 className="mt-3 font-serif text-[22px] font-medium leading-tight text-ink">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[16px] leading-[1.65] text-ink-soft sm:max-w-[54ch]">
                    {item.body}
                  </p>

                  <div className="flex items-start sm:items-center lg:justify-end">
                    <p className="text-[15px] leading-[1.5] text-ink lg:text-right">
                      <span className="font-serif text-[26px] font-medium text-accent">
                        {item.statValue}
                      </span>{" "}
                      <span className="text-ink-soft">{item.statLabel}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
