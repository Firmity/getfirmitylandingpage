import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { comparisonImage } from "@/lib/content";

/**
 * Raw-image alternative to Comparison.tsx — embeds the design team's
 * Footer.png as-is (re-encoded to webp). Option 2 of 2, kept side by side
 * on the page so the client can compare and decide which to keep.
 */
export function ComparisonImage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionEyebrow>{comparisonImage.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 max-w-[22ch] font-serif text-[32px] font-medium leading-[1.15] text-ink sm:text-[40px]">
            {comparisonImage.h2}
          </h2>
        </Reveal>

        <Reveal delay={0.1} variant="fade" className="mt-10">
          <PhotoFrame
            src="/assets/comparison-infographic.webp"
            alt={comparisonImage.alt}
            width={2000}
            height={1125}
            tilt="none"
            frame="card"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </Reveal>
      </Container>
    </section>
  );
}
