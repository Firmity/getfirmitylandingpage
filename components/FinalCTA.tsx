import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckBadge } from "@/components/ui/CheckBadge";
import { finalCta } from "@/lib/content";

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16"
      style={{
        // 2026-09: full palette swap to blue/white/black — deep blue into
        // ink black, replacing the old pine-green gradient.
        background:
          "linear-gradient(135deg, var(--color-accent-strong) 0%, #0a2f6b 55%, var(--color-ink) 100%)",
      }}
    >
      {/* light-blue glow, upper-left — echoes the page-wide ambient gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] -top-[25%] h-[480px] w-[600px] rounded-full opacity-[0.35] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)" }}
      />
      {/* black glow, lower-right — deepens toward the gradient's ink base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] bottom-[-30%] h-[520px] w-[640px] rounded-full opacity-[0.4] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-ink) 0%, transparent 70%)" }}
      />

      {/* brand watermark: the logo, inverted (black -> white) and dimmed way down */}
      <img
        src="/assets/firmity-logo.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.06] sm:w-[900px]"
        style={{ filter: "invert(1) brightness(2)" }}
      />

      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[18ch] font-serif text-[34px] font-medium leading-[1.15] text-paper sm:text-[44px]">
            {finalCta.h2}
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-[16.5px] leading-[1.6] text-paper/70">
            {finalCta.body}
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="#lead-form" variant="primary-inverse">
              {finalCta.ctaLabel}
            </Button>
          </div>
          <ul className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3">
            {finalCta.trustLine.map((line) => (
              <li key={line} className="flex items-center gap-2 text-[13px] text-paper/70">
                <CheckBadge tone="inverse" />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
