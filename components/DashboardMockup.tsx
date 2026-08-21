"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { cmmsBridge } from "@/lib/content";

const downtimeBars = [38, 52, 31, 60, 27, 44, 20];
const kpis = [
  { label: "Open work orders", value: "12", trend: "−4 this week" },
  { label: "PPM compliance", value: "94%", trend: "+6% vs last qtr" },
];

/**
 * Coded mockup of the Firmity CMMS dashboard — illustrates the product
 * the report links into, without a screenshot of the real app.
 */
export function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="w-full max-w-[440px] rounded-[24px] border border-line bg-paper-raised p-6 shadow-[var(--shadow-floating)]"
    >
      <div className="flex items-center justify-between">
        <span className="font-sans font-semibold text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          {cmmsBridge.card.eyebrow}
        </span>
        <span className="flex items-center gap-1.5 font-sans font-semibold text-[11px] text-green">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
          </span>
          Live
        </span>
      </div>

      <h3 className="mt-3 font-serif text-[19px] font-medium leading-tight text-ink">
        {cmmsBridge.card.title}
      </h3>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl bg-paper-dim px-4 py-3.5">
            <div className="font-serif text-[24px] leading-none text-ink">{kpi.value}</div>
            <div className="mt-1.5 text-[11.5px] leading-tight text-ink-soft">{kpi.label}</div>
            <div className="mt-1 text-[10.5px] text-accent">{kpi.trend}</div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[11.5px] text-ink-faint">
          <span>Downtime (last 7 days)</span>
        </div>
        <div className="mt-2.5 flex h-16 items-end gap-1.5">
          {downtimeBars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-[3px] bg-accent/70"
              initial={{ height: 0 }}
              animate={inView ? { height: `${h}%` } : { height: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
            />
          ))}
        </div>
      </div>

      <p className="mt-5 text-[13.5px] leading-[1.55] text-ink-soft">{cmmsBridge.card.body}</p>

      <Button href={cmmsBridge.card.ctaHref} variant="outline" className="mt-5 w-full !px-4 !py-3 text-[13.5px]">
        {cmmsBridge.card.ctaLabel}
      </Button>
    </div>
  );
}
