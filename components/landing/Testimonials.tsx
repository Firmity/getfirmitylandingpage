import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/landing";

/**
 * Renders only real quotes (`pending` entries are skipped), so the page never
 * ships a "[Add a customer quote]" placeholder. One quote gets a large layout,
 * two or three share a grid.
 */
export function Testimonials() {
  const quotes = testimonials.quotes.filter((q) => !q.pending && q.quote && q.name);
  if (quotes.length === 0) return null;

  const single = quotes.length === 1;

  return (
    <section className="border-b border-line bg-paper-dim py-12 sm:py-14">
      <Container>
        <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[38px]">
          {testimonials.heading}
        </h2>

        <div className={`mt-8 grid gap-6 ${single ? "" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {quotes.map((q) => (
            <figure
              key={q.name}
              className={`border-l-4 border-accent bg-white p-6 sm:p-8 ${single ? "max-w-[860px]" : ""}`}
            >
              <blockquote
                className={`font-medium tracking-[-0.015em] text-ink ${
                  single ? "text-[22px] leading-[1.4] sm:text-[26px]" : "text-[17px] leading-[1.55]"
                }`}
              >
                <p>&ldquo;{q.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-5 text-[14.5px]">
                <span className="font-semibold text-ink">{q.name}</span>
                <span className="text-ink-soft">, {q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
