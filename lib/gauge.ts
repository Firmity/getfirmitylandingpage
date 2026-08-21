/**
 * Pure geometry helpers for the semicircle gauge mockup. Kept separate
 * from the component so the math is unit-testable and reusable if a
 * second gauge (e.g. per-domain mini gauges) is ever needed.
 */

export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

/** Describes an SVG arc path sweeping from a larger angle to a smaller one across the top semicircle. */
export function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = Math.abs(startAngle - endAngle) <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

/** Maps a 0–100 score to the needle rotation used by the gauge (-90deg = 0, 90deg = 100). */
export function scoreToNeedleAngle(score: number) {
  const clamped = Math.max(0, Math.min(100, score));
  return -90 + (clamped / 100) * 180;
}

export type ScoreBand = "attention" | "moderate" | "healthy";

export function scoreBand(score: number): ScoreBand {
  if (score < 40) return "attention";
  if (score < 75) return "moderate";
  return "healthy";
}

export const scoreBandColor: Record<ScoreBand, string> = {
  attention: "var(--color-red)",
  moderate: "var(--color-amber)",
  healthy: "var(--color-green)",
};
