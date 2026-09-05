"use client";

import { useEffect, useRef } from "react";

// Slowed down from native speed per client request — the raw footage reads
// as too frantic next to the calm gauge widget beside it.
const PLAYBACK_RATE = 0.6;

/**
 * Contained video card for the Hero's right column. Styled to match
 * GaugeWidget's card treatment (rounded/bordered/shadowed) so the dark
 * stock footage reads as a deliberate, framed element rather than a raw
 * clip dropped onto the light theme.
 */
export function HeroVideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = PLAYBACK_RATE;
  }, []);

  return (
    <div className="w-full max-w-[420px] rounded-[28px] border border-line bg-paper-raised p-3 shadow-[var(--shadow-floating)]">
      <div className="overflow-hidden rounded-[20px] bg-ink">
        <video
          ref={videoRef}
          className="block h-auto w-full"
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
      </div>
    </div>
  );
}
