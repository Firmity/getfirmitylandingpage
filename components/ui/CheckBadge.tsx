import { Check } from "lucide-react";

type CheckBadgeProps = {
  /** "accent" for light backgrounds (solid green disc, white check).
   *  "inverse" for dark backgrounds (translucent paper disc, paper check). */
  tone?: "accent" | "inverse";
  className?: string;
};

/**
 * Small solid checkmark badge used for trust-line bullets throughout the
 * site (hero, lead form, final CTA). A filled disc + contrasting check,
 * not a bare outline icon, so trust lines read as deliberate iconography.
 */
export function CheckBadge({ tone = "accent", className = "" }: CheckBadgeProps) {
  const bg = tone === "accent" ? "bg-accent" : "bg-paper/20";
  const iconColor = tone === "accent" ? "text-paper" : "text-paper";
  return (
    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${bg} ${className}`}>
      <Check className={`h-2.5 w-2.5 ${iconColor}`} strokeWidth={3} />
    </span>
  );
}
