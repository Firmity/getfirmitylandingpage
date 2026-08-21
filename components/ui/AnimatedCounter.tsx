"use client";

import { useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  /** Raw display value, e.g. "15–25%", "3–5x", "14". Parsed for the leading integer to animate. */
  value: string;
  className?: string;
  duration?: number;
};

/**
 * Animates the first integer found in `value` from 0 up to its real
 * number on scroll-into-view, then re-renders the original string
 * (so "15–25%" still shows its full range, just with "15" counted up).
 * Falls back to a static render if no digits are found.
 */
export function AnimatedCounter({ value, className, duration = 1.4 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const match = value.match(/\d+/);
  const target = match ? parseInt(match[0], 10) : null;
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(target === null ? value : value.replace(match![0], "0"));

  useEffect(() => {
    if (target === null || !inView) return;
    const controls = animate(motionVal, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(value.replace(match![0], String(Math.round(v))));
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
