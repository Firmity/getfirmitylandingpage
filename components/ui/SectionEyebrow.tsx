type SectionEyebrowProps = {
  children: React.ReactNode;
  tone?: "accent" | "amber" | "ink";
  className?: string;
};

const toneClass: Record<NonNullable<SectionEyebrowProps["tone"]>, string> = {
  accent: "text-accent",
  amber: "text-amber",
  ink: "text-ink-soft",
};

/**
 * Small kicker label used above every H2 — bold sans, wide tracking,
 * uppercase. Same treatment as the "SAMPLE" / "FACILITY HEALTH SCORE"
 * labels in the report mockups so UI labels and section labels feel related.
 */
export function SectionEyebrow({ children, tone = "accent", className = "" }: SectionEyebrowProps) {
  return (
    <div
      className={`font-sans text-[13px] font-semibold uppercase tracking-[0.14em] ${toneClass[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
