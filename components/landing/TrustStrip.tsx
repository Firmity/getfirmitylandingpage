import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { trust } from "@/lib/landing";

/** Real client logos only. Fixed height, natural width, so no logo is stretched. */
export function TrustStrip() {
  return (
    <section aria-label={trust.label} className="border-b border-line bg-white">
      <Container className="py-8 sm:py-9">
        <p className="text-center text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
          {trust.label}
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 lg:justify-between lg:gap-x-6">
          {trust.logos.map((logo) => (
            <li key={logo.name} className="flex h-14 items-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                sizes="170px"
                className="h-11 w-auto max-w-[150px] object-contain sm:h-14 sm:max-w-[170px]"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
