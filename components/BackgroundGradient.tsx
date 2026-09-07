/**
 * The site's single ambient gradient field. Fixed to the viewport (not
 * the page), so it reads as one continuous, slowly drifting backdrop
 * behind every section rather than a per-section hero background.
 *
 * Pure CSS transform/opacity animation (see .bg-blob-* in globals.css) —
 * no JS, no layout thrash, disabled entirely under prefers-reduced-motion.
 */
export function BackgroundGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper"
    >
      <div
        className="bg-blob-a absolute -left-[10%] -top-[15%] h-[65vmax] w-[65vmax] rounded-full opacity-[0.55] blur-[110px]"
        style={{
          // 2026-09: full palette swap to blue/white/black — this blob now
          // tracks the accent token directly instead of a pinned hex, so it
          // stays blue if the accent ever changes.
          background:
            "radial-gradient(circle at 30% 30%, var(--color-accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="bg-blob-b absolute -right-[15%] top-[10%] h-[55vmax] w-[55vmax] rounded-full opacity-[0.4] blur-[110px]"
        style={{
          background: "radial-gradient(circle at 60% 40%, var(--color-accent-light) 0%, transparent 72%)",
        }}
      />
      <div
        className="bg-blob-c absolute -bottom-[20%] left-[15%] h-[60vmax] w-[60vmax] rounded-full opacity-[0.35] blur-[120px]"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--color-ink) 0%, transparent 70%)",
        }}
      />
      {/* Soft top-to-bottom paper wash so the gradient never fights body copy */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/10 via-paper/70 to-paper" />
    </div>
  );
}
