"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Use for elements that should scale/fade in place instead of rising. */
  variant?: "rise" | "fade";
};

const easeOut = [0.16, 1, 0.3, 1] as const;

function buildVariants(y: number, variant: "rise" | "fade", delay: number): Variants {
  return {
    hidden: { opacity: 0, y: variant === "rise" ? y : 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut, delay },
    },
  };
}

/**
 * Scroll-triggered reveal. Animates once (viewport margin pulls the
 * trigger slightly before the element is fully visible) so the page
 * never re-triggers on scroll-up, which reads as jittery.
 */
export function Reveal({ children, className, delay = 0, y = 22, variant = "rise" }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={buildVariants(y, variant, delay)}
    >
      {children}
    </motion.div>
  );
}
