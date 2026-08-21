import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <span className="font-serif text-[16px] text-ink">{site.name}</span>
        <p className="text-[13px] text-ink-faint">{site.legalFooter}</p>
      </Container>
    </footer>
  );
}
