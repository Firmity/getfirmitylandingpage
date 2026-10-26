"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { anchors, modules } from "@/lib/landing";

const contactHref = `#${anchors.heroForm}`;

/**
 * One panel, six modules. Desktop: a numbered list on the left (the active
 * row expands to show its description and CTA) with the screenshot on the
 * right. Mobile: a scrolling tab strip, then description, CTA and image.
 * Content comes from lib/landing.ts; nothing here is hard-coded copy.
 */
export function Modules() {
  const [active, setActive] = useState(0);
  const items = modules.items;
  const current = items[active] ?? items[0];
  if (!current) return null;

  return (
    <section id="modules" className="scroll-mt-16 border-b border-line bg-white py-12 sm:py-14">
      <Container>
        <div className="max-w-[640px]">
          <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[38px]">
            {modules.heading}
          </h2>
          <p className="mt-3 text-[16.5px] leading-[1.55] text-ink-soft">{modules.sub}</p>
        </div>

        {/* Mobile / tablet tab strip */}
        <div
          role="tablist"
          aria-label="Modules"
          className="no-scrollbar -mx-6 mt-7 flex gap-2 overflow-x-auto px-6 sm:-mx-8 sm:px-8 lg:hidden"
        >
          {items.map((item, i) => (
            <button
              key={item.tab}
              role="tab"
              type="button"
              id={`module-tab-m-${i}`}
              aria-selected={i === active}
              aria-controls="module-panel"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-md border px-3.5 py-2 text-[14px] font-semibold transition-colors ${
                i === active
                  ? "border-accent bg-accent text-white"
                  : "border-line-strong bg-white text-ink hover:border-ink"
              }`}
            >
              {item.tab}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-8 lg:mt-9 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-12">
          {/* Desktop list */}
          <div role="tablist" aria-orientation="vertical" aria-label="Modules" className="hidden lg:block">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <div key={item.tab} className="border-b border-line first:border-t">
                  <button
                    role="tab"
                    type="button"
                    id={`module-tab-d-${i}`}
                    aria-selected={isActive}
                    aria-controls="module-panel"
                    onClick={() => setActive(i)}
                    className={`flex w-full items-baseline gap-4 border-l-[3px] py-4 pl-4 pr-2 text-left transition-colors ${
                      isActive ? "border-accent" : "border-transparent hover:bg-paper-dim"
                    }`}
                  >
                    <span
                      className={`text-[13px] font-semibold tabular-nums ${
                        isActive ? "text-accent" : "text-ink-faint"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[18px] font-semibold tracking-[-0.015em] ${
                        isActive ? "text-ink" : "text-ink-soft"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                  {isActive && (
                    <div className="border-l-[3px] border-accent pb-5 pl-[52px] pr-2">
                      <p className="text-[15.5px] leading-[1.6] text-ink-soft">{item.body}</p>
                      <Button href={contactHref} className="mt-4">
                        {modules.ctaLabel}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Panel: mobile text + image (desktop shows image only) */}
          <div id="module-panel" role="tabpanel" aria-label={current.title}>
            <div className="lg:hidden">
              <h3 className="text-[20px] font-semibold tracking-[-0.015em] text-ink">{current.title}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-ink-soft">{current.body}</p>
              <Button href={contactHref} className="mt-4">
                {modules.ctaLabel}
              </Button>
            </div>
            <div className="mt-7 rounded-lg border border-line bg-paper-dim p-3 sm:p-5 lg:mt-0">
              <Image
                key={current.image}
                src={current.image}
                alt={`${current.title} screen in Firmity`}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 720px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
