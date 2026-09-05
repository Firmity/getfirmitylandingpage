"use client";

import { useEffect, useRef } from "react";

// Slowed down from native speed per client request — the raw footage reads
// as too frantic at full speed for a background element sitting behind copy.
const PLAYBACK_RATE = 0.6;

/**
 * Full-bleed video background for the Hero section. Fills the section
 * (absolute inset-0, object-cover) behind the headline/copy and the gauge
 * widget, with a dark scrim layered on top so text stays readable against
 * the footage. Sits at z-0 inside the Hero's own `isolate` stacking
 * context, so it never fights BackgroundGradient's page-wide -z-10 layer.
 */
export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = PLAYBACK_RATE;
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/hero-video-poster.webp"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = PLAYBACK_RATE;
        }}
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>
      {/* Scrim: darkest over the copy (left), fading toward the gauge side
          (right) so the footage still reads through on that half. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/10" />
    </div>
  );
}
