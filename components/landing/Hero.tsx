import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DemoForm } from "@/components/landing/DemoForm";
import { anchors, hero } from "@/lib/landing";

/**
 * Copy left, form right. Source order is copy -> form -> image so on mobile
 * the form sits right under the headline; on desktop the image drops under
 * the copy. The image height is capped by the viewport so it stays visible
 * above the fold instead of being pushed off-screen by the text.
 */
export function Hero() {
  return (
    <section className="border-b border-line bg-paper-dim">
      <Container className="grid gap-x-12 gap-y-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-y-4 lg:py-8">
        <div className="lg:col-start-1 lg:row-start-1">
          <h1 className="max-w-[22ch] text-balance text-[34px] font-bold leading-[1.06] tracking-[-0.035em] text-ink sm:text-[42px] lg:text-[44px]">
            {hero.headlineBefore}
            <span className="text-accent">{hero.headlineAccent}</span>
            {hero.headlineAfter}
          </h1>

          <p className="mt-3 max-w-[58ch] text-[16.5px] leading-[1.5] text-ink-soft">{hero.sub}</p>

          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5">
            {hero.ticks.map((tick) => (
              <li key={tick} className="flex items-center gap-2 text-[14.5px] font-medium text-ink">
                <Check aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={3} />
                {tick}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <DemoForm location="hero" id={anchors.heroForm} />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            priority
            sizes="(min-width: 1024px) 640px, 100vw"
            className="h-auto w-auto max-w-full object-contain object-left lg:max-h-[max(300px,calc(100svh-380px))] lg:max-w-[640px]"
          />
        </div>
      </Container>
    </section>
  );
}
