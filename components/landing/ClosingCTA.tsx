import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DemoForm } from "@/components/landing/DemoForm";
import { anchors, closing, contact } from "@/lib/landing";

export function ClosingCTA() {
  return (
    <section className="bg-night text-white">
      <Container className="grid items-start gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14">
        <div className="lg:pt-4">
          <h2 className="max-w-[18ch] text-[32px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[42px]">
            {closing.heading}
          </h2>
          <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.55] text-white/75">{closing.line}</p>

          <ul className="mt-7 space-y-3.5 text-[16px]">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 font-medium text-white hover:text-accent-light"
              >
                <Mail aria-hidden="true" className="h-5 w-5 text-accent-light" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-medium text-white hover:text-accent-light"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5 text-accent-light" />
                WhatsApp {contact.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>

        <DemoForm location="closing" id={anchors.closingForm} />
      </Container>
    </section>
  );
}
