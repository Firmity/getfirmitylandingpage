import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { anchors, contact, hero } from "@/lib/landing";

/**
 * Plain sticky bar: logo left, WhatsApp + one CTA right. Absolute "/#..."
 * hrefs so the same header works on /thank-you too.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" aria-label="Firmity home" className="shrink-0">
            <Image
              src="/assets/firmity-logo.png"
              alt="Firmity"
              width={114}
              height={40}
              priority
              className="h-9 w-auto"
            />
          </a>
          <p className="hidden border-l border-line pl-4 text-[14px] text-ink-soft lg:block">
            {hero.badge}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[14.5px] font-medium text-ink-soft hover:text-ink sm:inline"
          >
            Talk to sales: {contact.whatsappDisplay}
          </a>
          <Button href={`/#${anchors.heroForm}`} className="!px-4 !py-2.5 text-[14.5px]">
            Get in Touch
          </Button>
        </div>
      </Container>
    </header>
  );
}
