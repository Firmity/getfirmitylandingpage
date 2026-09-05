import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";
import { comparison } from "@/lib/content";

/**
 * Native rebuild of the design team's Footer.png comparison graphic, using
 * the site's own icon set, type, and color tokens instead of the supplied
 * illustration. Option 1 of 2 (see ComparisonImage.tsx for the raw-image
 * alternative) — kept side by side in the page so the client can pick one.
 */

type Side = "without" | "with";

const sideTone: Record<Side, { text: string; soft: string; label: string }> = {
  without: { text: "text-red", soft: "bg-red-soft", label: "text-red" },
  with: { text: "text-accent", soft: "bg-green-soft", label: "text-accent" },
};

function ComparisonCard({ side }: { side: Side }) {
  const data = comparison[side];
  const tone = sideTone[side];
  const HeaderIcon = getIcon(data.icon);

  return (
    <Reveal className="h-full">
      <div className="flex h-full flex-col rounded-[28px] border border-line bg-paper-raised p-8 shadow-[var(--shadow-raised)] sm:p-10">
        <div className="flex items-center gap-3">
          <HeaderIcon className={`h-7 w-7 ${tone.text}`} />
          <h3 className="font-sans text-[21px] font-bold text-ink sm:text-[22px]">
            {side === "without" ? (
              <>
                Without <span className={tone.text}>Firmity</span>
              </>
            ) : (
              <>
                With <span className={tone.text}>Firmity</span>
              </>
            )}
          </h3>
        </div>

        <div className="mt-9 grid grid-cols-3 divide-x divide-line border-t border-line pt-8">
          {data.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.title} className="px-2 text-center sm:px-3">
                <div
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full ${tone.soft} ${tone.text}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 font-sans text-[13.5px] font-semibold leading-snug text-ink sm:text-[14.5px]">
                  {item.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-ink-soft sm:text-[13px]">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <span
            className={`rounded-full px-5 py-2 font-sans text-[14px] font-semibold ${tone.soft} ${tone.label}`}
          >
            {data.tagline}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export function Comparison() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <SectionEyebrow>{comparison.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 max-w-[22ch] font-serif text-[32px] font-medium leading-[1.15] text-ink sm:text-[40px]">
            {comparison.h2}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ComparisonCard side="without" />
          <ComparisonCard side="with" />
        </div>
      </Container>
    </section>
  );
}
