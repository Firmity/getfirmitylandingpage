import Image from "next/image";

type PhotoFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Physical-object photos (books, printed reports) get a slight tilt for a tactile, "on the desk" feel. Screen mockups stay level. */
  tilt?: "left" | "right" | "none";
  /**
   * "card" boxes the image in a bordered, shadowed rounded panel — for
   * rectangular screenshots/mockups that need a defined edge.
   * "cutout" renders the image directly with no wrapper — for pre-isolated
   * PNGs (transparent background, shadow already baked into the render)
   * where a card would just draw a visible box around empty alpha.
   */
  frame?: "card" | "cutout";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const tiltClass: Record<NonNullable<PhotoFrameProps["tilt"]>, string> = {
  left: "-rotate-2",
  right: "rotate-2",
  none: "",
};

/**
 * Shared wrapper for real photographic/rendered assets (report mockups, book
 * photography) so every non-coded visual across the page shares one visual
 * language, matching the coded widgets (GaugeWidget, ReportMockup,
 * DashboardMockup) where a card frame makes sense, and floating cleanly on
 * the page where the source asset is already a clean isolated cutout.
 */
export function PhotoFrame({
  src,
  alt,
  width,
  height,
  tilt = "none",
  frame = "card",
  className = "",
  sizes,
  priority,
}: PhotoFrameProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={frame === "card" ? "h-auto w-full object-cover" : "h-auto w-full object-contain"}
    />
  );

  if (frame === "cutout") {
    return (
      <div
        className={`transition-transform duration-500 will-change-transform hover:rotate-0 ${tiltClass[tilt]} ${className}`}
      >
        {image}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-[24px] border border-line bg-paper-raised shadow-[var(--shadow-floating)] transition-transform duration-500 will-change-transform hover:rotate-0 ${tiltClass[tilt]} ${className}`}
    >
      {image}
    </div>
  );
}
