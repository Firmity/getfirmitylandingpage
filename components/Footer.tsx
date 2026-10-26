import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { anchors, contact, footer, footerNav, modules } from "@/lib/landing";

const linkClass = "text-white/70 transition-colors hover:text-white";
const headingClass = "text-[12.5px] font-semibold uppercase tracking-[0.1em] text-white/50";

/**
 * Three columns on desktop (brand + CTA, modules, contact) and a legal bar
 * with Privacy Policy and Terms and Conditions. Absolute "/#..." hrefs so it
 * also works on the thank-you pages. The logo PNG is dark-on-transparent, so
 * it is inverted to white on the night background.
 */
export function Footer() {
  return (
    <footer className="bg-night text-[15px] text-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-14 lg:py-14">
        <div>
          <a href="/" aria-label="Firmity home" className="inline-block">
            <Image
              src="/assets/firmity-logo.png"
              alt="Firmity"
              width={114}
              height={40}
              className="h-9 w-auto brightness-0 invert"
            />
          </a>
          <p className="mt-4 max-w-[30ch] leading-[1.55] text-white/70">{footerNav.tagline}</p>
          <Button href={`/#${anchors.heroForm}`} variant="primary-inverse" className="mt-6 !px-5 !py-2.5">
            {modules.ctaLabel}
          </Button>
        </div>

        <nav aria-label="Modules">
          <h2 className={headingClass}>{footerNav.modulesHeading}</h2>
          <ul className="mt-4 space-y-2.5">
            {modules.items.map((item) => (
              <li key={item.tab}>
                <a href="/#modules" className={linkClass}>
                  {item.tab}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>{footerNav.contactHeading}</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp {contact.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={footerNav.siteUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {footerNav.siteLabel}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-[13.5px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.legal}</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-1">
            <a href={contact.privacyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Privacy Policy
            </a>
            <a href={contact.termsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Terms and Conditions
            </a>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
