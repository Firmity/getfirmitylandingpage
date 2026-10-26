import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

/**
 * Flat, rectangular buttons (6px radius), no scale-on-hover. Variant names are
 * kept stable because older components still reference them.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold tracking-[-0.005em] transition-colors duration-150 disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  "primary-inverse": "bg-white text-ink hover:bg-accent-soft",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-soft": "border border-white/35 text-white hover:bg-white hover:text-ink",
} as const;

type Variant = keyof typeof variants;

type CommonProps = {
  variant?: Variant;
  className?: string;
};

type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; type?: never };

type ActionButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export function Button(props: LinkButtonProps | ActionButtonProps) {
  const { variant = "primary", className = "", ...rest } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  return <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
