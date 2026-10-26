import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SurveyDialog } from "@/components/landing/SurveyDialog";
import { survey } from "@/lib/landing";

/**
 * Light band between the dark closing form and the dark footer. Video sits on
 * the left at its native 9:16 (it is a YouTube Short), copy and CTA on the
 * right. The iframe is lazy so it costs nothing until the strip nears view.
 */
export function SurveyStrip() {
  return (
    <section aria-labelledby="survey-heading" className="border-b border-line bg-paper-dim py-12 sm:py-14">
      <Container className="grid items-center gap-8 md:grid-cols-[280px_minmax(0,1fr)] md:gap-14">
        <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-lg border border-line bg-night shadow-[var(--shadow-raised)]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${survey.videoId}?rel=0&playsinline=1`}
            title={survey.videoTitle}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="block aspect-[9/16] w-full border-0"
          />
        </div>

        <div>
          <h2
            id="survey-heading"
            className="max-w-[20ch] text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[40px]"
          >
            {survey.heading}
          </h2>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.55] text-ink-soft">{survey.body}</p>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {survey.ticks.map((tick) => (
              <li key={tick} className="flex items-center gap-2 text-[14.5px] font-medium text-ink">
                <Check aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={3} />
                {tick}
              </li>
            ))}
          </ul>

          <SurveyDialog className="mt-7 !px-7 !py-3.5 text-[16px]" />
        </div>
      </Container>
    </section>
  );
}
