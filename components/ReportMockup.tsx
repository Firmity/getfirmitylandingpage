"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleScore, sampleScoreStatus, deliverable, gaugeDomains } from "@/lib/content";

type Tab = (typeof deliverable.mockup.tabs)[number];

const severityColor = {
  HIGH: "text-red bg-red-soft",
  MED: "text-amber bg-amber-soft",
  LOW: "text-green bg-green-soft",
} as const;

const dotColor = {
  HIGH: "bg-red",
  MED: "bg-amber",
  LOW: "bg-green",
} as const;

const scoreShortStatus = sampleScoreStatus.split(" · ")[0];

/**
 * Product mockup of the Facility Health Report — the artifact the
 * customer actually receives. Each tab renders genuinely different
 * content (not just a decorative underline) so it reads as a real
 * product surface rather than a static illustration.
 */
export function ReportMockup() {
  const [activeTab, setActiveTab] = useState<Tab>(deliverable.mockup.tabs[0]);

  return (
    <div className="w-full max-w-[440px] rounded-[24px] border border-line bg-paper-raised shadow-[var(--shadow-floating)]">
      <div className="no-scrollbar flex gap-0.5 overflow-x-auto rounded-t-[24px] border-b border-line px-2 pt-3 sm:gap-1 sm:px-3">
        {deliverable.mockup.tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative shrink-0 whitespace-nowrap rounded-t-lg px-2.5 py-2.5 text-[12.5px] font-medium transition-colors sm:px-3.5 sm:text-[13px] ${
              activeTab === tab ? "text-ink" : "text-ink-faint hover:text-ink-soft"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="report-tab-underline"
                className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-6">
        <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
          Facility Health Report · Prepared by Firmity AI
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "Summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mt-2 font-serif text-[21px] font-medium text-ink">Executive Summary</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-[34px] leading-none text-ink">{sampleScore}</span>
                <span className="text-[13px] text-ink-faint">/ 100, {scoreShortStatus}</span>
              </div>
              <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-paper-dim">
                <div className="h-full rounded-full bg-amber" style={{ width: `${sampleScore}%` }} />
              </div>

              <div className="mt-6 space-y-3.5 border-t border-line pt-5">
                {deliverable.mockup.summaryFindings.map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-[13.5px] text-ink">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor[f.severity]}`} />
                      {f.label}
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 font-sans text-[10.5px] font-semibold ${severityColor[f.severity]}`}
                    >
                      {f.severity}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Scores" && (
            <motion.div
              key="scores"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mt-2 font-serif text-[21px] font-medium text-ink">Score by Domain</h3>
              <div className="mt-5 space-y-3">
                {gaugeDomains.map((d) => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="w-[100px] shrink-0 text-[12px] text-ink-soft">{d.label}</span>
                    <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-paper-dim">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${d.value}%` }} />
                    </div>
                    <span className="w-6 shrink-0 text-right text-[12px] text-ink">{d.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Findings" && (
            <motion.div
              key="findings"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mt-2 font-serif text-[21px] font-medium text-ink">All Findings</h3>
              <div className="mt-5 space-y-3.5">
                {deliverable.mockup.findings.map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-[13.5px] text-ink">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor[f.severity]}`} />
                      {f.label}
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 font-sans text-[10.5px] font-semibold ${severityColor[f.severity]}`}
                    >
                      {f.severity}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "Action Plan" && (
            <motion.div
              key="action-plan"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mt-2 font-serif text-[21px] font-medium text-ink">Priority Action Matrix</h3>
              <div className="mt-5 space-y-3.5">
                {deliverable.mockup.actionPlan.map((a, i) => (
                  <div key={a.title} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-[13.5px] text-ink">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[10px] font-semibold text-accent">
                        {i + 1}
                      </span>
                      {a.title}
                    </div>
                    <span className="shrink-0 rounded-full bg-paper-dim px-2 py-0.5 text-[10.5px] font-semibold text-ink-soft">
                      {a.timeframe}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
