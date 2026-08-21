"use client";

import { motion } from "framer-motion";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-ink text-paper hover:bg-accent-strong",
  "primary-inverse": "bg-paper text-ink hover:bg-accent-soft",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-soft": "border border-paper/35 text-paper hover:bg-paper hover:text-ink",
} as const;

type Variant = keyof typeof variants;

type CommonProps = {
  variant?: Variant;
  className?: string;
};

// framer-motion redefines these event handlers with its own gesture-aware
// signatures, so plain HTML attribute types for them conflict on spread.
type MotionConflicts =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflicts> & { href: string; type?: never };

type ActionButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflicts> & { href?: never };

export function Button(props: LinkButtonProps | ActionButtonProps) {
  const { variant = "primary", className = "", ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      MotionConflicts
    > & { href: string };
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.15 }}
        {...anchorRest}
      />
    );
  }

  const buttonRest = rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflicts>;
  return (
    <motion.button
      className={classes}
      whileHover={{ scale: buttonRest.disabled ? 1 : 1.015 }}
      whileTap={{ scale: buttonRest.disabled ? 1 : 0.985 }}
      transition={{ duration: 0.15 }}
      {...buttonRest}
    />
  );
}
