"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { describeArc, polarToCartesian, scoreToNeedleAngle, scoreBand, scoreBandColor } from "@/lib/gauge";
import { gaugeDomains, sampleScore, sampleScoreStatus } from "@/lib/content";

const CX = 120;
const CY = 116;
const R = 92;
const STROKE = 15;
const NEEDLE_LEN = R - 20;
const NEEDLE_BASE_HALF = 3.5;
const NEEDLE_TIP_HALF = 0.75;

const TICKS = [0, 25, 50, 75, 100];

function needlePath() {
  const baseLeft = { x: CX - NEEDLE_BASE_HALF, y: CY };
  const baseRight = { x: CX + NEEDLE_BASE_HALF, y: CY };
  const tipLeft = { x: CX - NEEDLE_TIP_HALF, y: CY - NEEDLE_LEN };
  const tipRight = { x: CX + NEEDLE_TIP_HALF, y: CY - NEEDLE_LEN };
  return `M ${baseLeft.x} ${baseLeft.y} L ${tipLeft.x} ${tipLeft.y} L ${tipRight.x} ${tipRight.y} L ${baseRight.x} ${baseRight.y} Z`;
}

/**
 * Product mockup: the "Facility Health Score" gauge shown in the hero.
 * One continuous gradient arc (red -> amber -> green) rather than
 * separate segments, so there are no seams at the color boundaries.
 * All geometry is computed (see lib/gauge.ts) from the sample score.
 */
export function GaugeWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const needleAngle = scoreToNeedleAngle(sampleScore);
  const band = scoreBand(sampleScore);

  return (
    <div
      ref={ref}
      className="w-full max-w-[420px] rounded-[28px] border border-line bg-paper-raised p-6 shadow-[var(--shadow-floating)] sm:p-7"
    >
      <div className="flex items-center justify-between font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
        <span>Facility Health Score</span>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">Sample</span>
      </div>

      <div className="relative mt-2 flex flex-col items-center">
        <svg viewBox="0 0 240 132" className="w-full max-w-[280px]" aria-hidden="true">
          <defs>
            <linearGradient id="gaugeArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-red)" />
              <stop offset="50%" stopColor="var(--color-amber)" />
              <stop offset="100%" stopColor="var(--color-green)" />
            </linearGradient>
            <filter id="needleShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* track (full-strength color arc) */}
          <path
            d={describeArc(CX, CY, R, 180, 0)}
            fill="none"
            stroke="url(#gaugeArcGradient)"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />

          {/* tick marks */}
          {TICKS.map((t) => {
            const angle = 180 - t * 1.8;
            const inner = polarToCartesian(CX, CY, R - STROKE / 2 - 6, angle);
            const outer = polarToCartesian(CX, CY, R - STROKE / 2 - 12, angle);
            return (
              <line
                key={t}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="var(--color-ink-faint)"
                strokeWidth={t === 0 || t === 50 || t === 100 ? 2 : 1}
                strokeLinecap="round"
                opacity={0.5}
              />
            );
          })}

          <motion.g
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            initial={{ rotate: -90 }}
            animate={inView ? { rotate: needleAngle } : { rotate: -90 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            filter="url(#needleShadow)"
          >
            <path d={needlePath()} fill="var(--color-ink)" />
            <circle cx={CX} cy={CY} r={7.5} fill="var(--color-ink)" />
            <circle cx={CX} cy={CY} r={3} fill="var(--color-paper)" />
          </motion.g>
        </svg>

        <div className="-mt-4 flex items-baseline gap-1">
          <span className="font-serif text-[46px] leading-none text-ink">{sampleScore}</span>
          <span className="text-[15px] text-ink-faint">/100</span>
        </div>
        <div
          className="mt-1.5 text-[13px] font-medium"
          style={{ color: scoreBandColor[band] }}
        >
          {sampleScoreStatus}
        </div>
      </div>

      <div className="mt-6 space-y-2.5 border-t border-line pt-5">
        {gaugeDomains.map((d, i) => (
          <div key={d.label} className="flex items-center gap-3">
            <span className="w-[104px] shrink-0 font-sans text-[11px] font-semibold text-ink-soft">{d.label}</span>
            <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-paper-dim">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={inView ? { width: `${d.value}%` } : { width: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.06 }}
              />
            </div>
            <span className="w-6 shrink-0 text-right font-sans text-[11px] font-semibold text-ink">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
