import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { testimonial } from "@/lib/content";

export function Testimonial() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-[820px] text-center">
        <Reveal>
          <blockquote className="font-serif text-[24px] font-normal italic leading-[1.5] text-ink sm:text-[30px]">
            “{testimonial.quote}”
          </blockquote>

          <div className="mt-9 flex flex-col items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-sans font-semibold text-[13px] text-paper">
              {testimonial.initials}
            </div>
            <div>
              <div className="text-[15px] font-medium text-ink">{testimonial.name}</div>
              <div className="mt-0.5 text-[13.5px] text-ink-soft">
                {testimonial.role} ·{" "}
                <span className="text-accent">{testimonial.badge}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} variant="fade" className="mt-14 hidden sm:block">
          <PhotoFrame
            src="/assets/report-snapshot.webp"
            alt="A real page from a Firmity Facility Health Report"
            width={1400}
            height={503}
            tilt="none"
            frame="cutout"
            sizes="(min-width: 820px) 820px, 100vw"
          />
        </Reveal>
      </Container>
    </section>
  );
}
