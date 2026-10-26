import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { faq } from "@/lib/landing";

/**
 * Native <details>: keyboard and screen-reader behaviour for free, zero JS.
 * `pending` items (answers the content doc still needs) are not rendered.
 */
export function FAQ() {
  const items = faq.items.filter((item) => !item.pending && item.q && item.a);
  if (items.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-16 border-b border-line bg-white py-12 sm:py-14">
      <Container className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-12">
        <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[38px]">
          {faq.heading}
        </h2>

        <div className="border-t border-line">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-accent transition-transform duration-150 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-[62ch] pb-5 text-[15.5px] leading-[1.6] text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
