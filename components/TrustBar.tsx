import { Container } from "@/components/ui/Container";
import { getIcon } from "@/lib/icons";
import { trustBar } from "@/lib/content";

export function TrustBar() {
  return (
    <div className="border-y border-line py-6 sm:py-8">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
          {trustBar.map((t) => {
            const Icon = getIcon(t.icon);
            return (
              <div key={t.label} className="flex flex-col items-center gap-3.5 text-center">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-paper shadow-[var(--shadow-raised)]">
                  <Icon className="h-6 w-6" fill="currentColor" stroke="none" />
                </span>
                <span className="max-w-[13ch] font-sans text-[12px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-soft">
                  {t.label}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
