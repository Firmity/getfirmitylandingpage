import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { getIcon } from "@/lib/icons";
import { privacy } from "@/lib/content";

export function Privacy() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex items-end justify-between gap-10">
          <Reveal className="max-w-[46ch]">
            <SectionEyebrow>{privacy.eyebrow}</SectionEyebrow>
            <h2 className="mt-4 font-serif text-[32px] font-medium leading-[1.15] text-ink sm:text-[38px]">
              {privacy.h2}
            </h2>
          </Reveal>

          <Reveal delay={0.1} variant="fade" className="hidden shrink-0 lg:block">
            <PhotoFrame
              src="/assets/privacy-shield.webp"
              alt="Your facility data, encrypted and access-controlled"
              width={780}
              height={441}
              tilt="none"
              frame="cutout"
              className="w-[320px]"
              sizes="320px"
            />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4">
          {privacy.items.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-paper">
                  <Icon className="h-[18px] w-[18px]" fill="currentColor" stroke="none" />
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-ink-soft">{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
