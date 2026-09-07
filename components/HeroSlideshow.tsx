"use client"

// ─── Hero slideshow — ported from Firmity-Website- (src/components/home-sections.tsx: HeroSection + SlideshowLeft + ALL_SLIDES) ───
// Per request: copy the homepage slideshow wholesale, change nothing about
// its own layout/behavior/colors, but every CTA now points at this site's
// own lead-capture form (#lead-form) instead of the source app's internal
// routes (/contact, /features, /facility-records, ...), which don't exist
// here. Font classes (font-serif/font-sans) resolve to THIS site's fonts
// (Fraunces/Geist), not the source's (Playfair/DM Sans) — untouched
// per request, this file just inherits whatever the sitewide tokens are.

import Link from "next/link"
import { useEffect, useState, type CSSProperties } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const HERO_PX = "px-6 sm:px-10 lg:px-16"

type ModuleListItem = {
  title: string
  desc: string
}

// Source order: Facility Tasks, Assets, Complaints, Inventory, Visitor,
// Employee, Payroll, Expense (src/components/home-sections.tsx MODULES_LIST).
const MODULES_LIST: ModuleListItem[] = [
  { title: "Facility Task Automation", desc: "Schedule, assign, and auto-trigger recurring facility tasks and PPM cycles — nothing falls through the cracks." },
  { title: "Assets & Spares Automation", desc: "Live asset registry with spares stock, AMC tracking, and lifecycle alerts across your entire estate." },
  { title: "Complaint & Helpdesk Automation", desc: "QR-based ticket raising from any location, assigned and tracked with a full audit trail through to resolution." },
  { title: "Inventory & Vendor Automation ERP", desc: "Stock tracking, auto-reorder triggers, and vendor workflows — purchase to delivery in one place." },
  { title: "Visitor Management Automation", desc: "Digital gate entries, host approvals, and badge printing — contactless, and fully audit-ready." },
  { title: "Employee Management Automation", desc: "Face-recognition attendance, shift scheduling, and real-time presence tracking across all sites." },
  { title: "Payroll Automation ERP", desc: "Attendance-linked payroll runs with automatic deductions, payslips, and compliance filings." },
  { title: "Facility Expense Automation ERP", desc: "Track spend by category and site, flag budget overruns early, and keep every expense audit-ready." },
]

const MODULE_INDICATOR_LABELS = [
  "Facility Tasks", "Assets", "Complaints", "Inventory", "Visitor", "Employee", "Payroll", "Expense",
]

const MODULE_IMAGES = [
  "/assets/slideshow/slide-facility-tasks.webp",
  "/assets/slideshow/slide-assets.webp",
  "/assets/slideshow/slide-complaints.webp",
  "/assets/slideshow/slide-inventory.webp",
  "/assets/slideshow/slide-visitor.webp",
  "/assets/slideshow/slide-employee.webp",
  "/assets/slideshow/slide-payroll.webp",
  "/assets/slideshow/slide-expense.webp",
]

const MOD_ADVANCE_MS = 5500

// Every slide shares one accent (#63b3ed) — source's 2026-09-05 update
// ("look exactly like the first slide") replaced a per-module rainbow with
// this single consistent blue across hero + all 8 module slides.
const ACCENT = "#63b3ed"

type SlideEntry = {
  key: string
  indicatorId: string
  indicatorLabel: string
  kicker: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  desc: string
  title?: string // undefined on hero → branded h1 block
  image: string
  imageAlt: string
}

const ALL_SLIDES: SlideEntry[] = [
  {
    key: "hero",
    indicatorId: "",
    indicatorLabel: "Home",
    kicker: "Powered by UFirm Technologies",
    ctaPrimary: { label: "Book a Demo", href: "#lead-form" },
    ctaSecondary: { label: "Explore Features", href: "#lead-form" },
    desc: "Firmity is a smart, integrated facility management software built to simplify operations, enhance visibility, and empower teams with real-time control over maintenance, assets, workforce, and compliance.",
    image: "/assets/slideshow/slide-hero.webp",
    imageAlt: "Firmity dashboard shown on a laptop, next to the Firmity mobile app login screen on a phone",
  },
  ...MODULES_LIST.map((m, i) => ({
    key: String(i + 1).padStart(2, "0"),
    indicatorId: String(i + 1).padStart(2, "0"),
    indicatorLabel: MODULE_INDICATOR_LABELS[i],
    kicker: "",
    ctaPrimary: { label: "Explore the module", href: "#lead-form" },
    ctaSecondary: { label: "Explore Features", href: "#lead-form" },
    desc: m.desc,
    title: m.title,
    image: MODULE_IMAGES[i],
    imageAlt: `${m.title} module`,
  })),
]

/**
 * Darken the accent toward near-black navy so it stays legible as TEXT on
 * the light frosted mobile panel. Source: inkAccent() in home-sections.tsx.
 */
function inkAccent(hex: string): string {
  const m = hex.replace("#", "")
  if (m.length !== 6) return "#132339"
  const r = parseInt(m.slice(0, 2), 16)
  const g = parseInt(m.slice(2, 4), 16)
  const b = parseInt(m.slice(4, 6), 16)
  const mix = (c: number) => Math.round(c * 0.5 + 18 * 0.5)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

function SlideshowLeft({
  activeIndex,
  animKey,
  paused,
  goTo,
}: {
  activeIndex: number
  animKey: number
  paused: boolean
  goTo: (i: number) => void
}) {
  const slide = ALL_SLIDES[activeIndex]
  const isHero = activeIndex === 0

  return (
    <div
      className="relative overflow-hidden h-full flex flex-col"
      style={{ background: "rgba(255,255,255,0.6)", transition: "background 600ms ease", ["--ink" as string]: inkAccent(ACCENT) } as CSSProperties}
    >
      <div
        className="lg:hidden absolute inset-0 z-0 transition-[background] duration-700"
        aria-hidden
        style={{ background: "linear-gradient(160deg, #ffffff 0%, #f2f2f2 62%, #ececec 100%)" }}
      />
      <style>{`
        @keyframes hsModUp  { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        @keyframes hsModUp2 { 0%{opacity:0;transform:translateY(36px);} 18%{opacity:0;transform:translateY(36px);} 100%{opacity:1;transform:translateY(0);} }
        @keyframes hsModUp3 { 0%{opacity:0;transform:translateY(36px);} 32%{opacity:0;transform:translateY(36px);} 100%{opacity:1;transform:translateY(0);} }
        @keyframes hsModUp4 { 0%{opacity:0;transform:translateY(36px);} 46%{opacity:0;transform:translateY(36px);} 100%{opacity:1;transform:translateY(0);} }
        @keyframes hsModProg { from { width:0; } to { width:100%; } }
      `}</style>

      {/* Ghost watermark */}
      <div className="absolute right-0 top-0 bottom-0 flex items-end pb-16 pr-4 select-none pointer-events-none" aria-hidden>
        <span
          className="font-serif font-light leading-none"
          style={{
            fontSize: isHero ? "clamp(42px,6vw,80px)" : "clamp(90px,11vw,170px)",
            color: `${ACCENT}08`,
            transition: "color 600ms ease, font-size 600ms ease",
            letterSpacing: isHero ? "0.18em" : undefined,
          }}
        >
          {isHero ? "FIRMITY" : slide.key}
        </span>
      </div>

      {/* Main content */}
      <div className={`${HERO_PX} flex-1 flex flex-col justify-center py-20 lg:py-0 relative z-10`}>
        <div key={animKey} className="flex flex-col">
          {slide.kicker && (
            <div style={{ animation: "hsModUp 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px" style={{ background: "var(--color-accent-mid)" }} />
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--color-accent-mid)" }}>
                  {slide.kicker}
                </span>
              </div>
            </div>
          )}

          <div style={{ animation: "hsModUp2 0.65s cubic-bezier(0.22,1,0.36,1) both" }}>
            {isHero ? (
              <h1 className="font-serif font-medium text-accent leading-[1.1] tracking-tight mb-4" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
                The Complete<br />
                <em className="not-italic" style={{ color: "var(--color-accent-mid)" }}>Facility Automation</em><br />
                Software Suite
              </h1>
            ) : (
              <h1 className="font-serif font-medium text-accent leading-[1.08] tracking-tight mb-4" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
                {slide.title}
              </h1>
            )}
          </div>

          <div style={{ animation: "hsModUp3 0.8s cubic-bezier(0.22,1,0.36,1) both" }}>
            <p className="text-[13.5px] font-light leading-[1.75] mb-7 max-w-[380px] text-[#000000]">{slide.desc}</p>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-3" style={{ animation: "hsModUp4 0.95s cubic-bezier(0.22,1,0.36,1) both" }}>
            <Link href={slide.ctaPrimary.href} className={"group inline-flex items-center justify-center gap-2 text-[13px] font-semibold px-7 py-3 rounded-[4px] transition-colors whitespace-nowrap " + (isHero ? "bg-accent text-white hover:bg-accent-strong" : "bg-black hover:bg-[#1a1a1a] text-white")}>
              {slide.ctaPrimary.label}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom indicators */}
      <div className={`${HERO_PX} pb-7 relative z-10`}>
        <div className="flex items-end gap-2 lg:gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {ALL_SLIDES.map((s, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={s.key}
                onClick={() => goTo(i)}
                className="cursor-pointer flex-shrink-0 flex flex-col items-start gap-1.5 focus:outline-none"
                aria-label={`Go to slide: ${s.indicatorLabel}`}
              >
                <span className="flex items-center" style={{ minHeight: "14px" }}>
                  {s.indicatorId ? (
                    <span
                      className="text-[10px] font-semibold tracking-[0.15em] leading-none transition-colors duration-300"
                      style={{ color: isActive ? ACCENT : "rgba(17,29,53,0.2)" }}
                    >
                      {s.indicatorId}
                    </span>
                  ) : (
                    <span
                      className="block w-[5px] h-[5px] rounded-full transition-colors duration-300"
                      style={{ background: isActive ? ACCENT : "rgba(17,29,53,0.2)" }}
                    />
                  )}
                </span>
                <span
                  className="text-[9.5px] font-light transition-colors duration-300 hidden xl:block leading-tight whitespace-nowrap"
                  style={{ color: isActive ? "rgba(17,29,53,0.7)" : "rgba(17,29,53,0.2)" }}
                >
                  {s.indicatorLabel}
                </span>
                <div
                  className="h-[2px] rounded-full overflow-hidden"
                  style={{ width: i === 0 ? "20px" : "16px", background: "rgba(17,29,53,0.08)" }}
                >
                  {isActive && (
                    <div
                      key={`bar-${animKey}`}
                      className="h-full rounded-full"
                      style={{
                        background: ACCENT,
                        animation: paused ? "none" : `hsModProg ${MOD_ADVANCE_MS}ms linear forwards`,
                        width: paused ? "100%" : undefined,
                        transition: "background 600ms ease",
                      }}
                    />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % ALL_SLIDES.length)
      setAnimKey((k) => k + 1)
    }, MOD_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [activeIndex, paused])

  function goTo(i: number) {
    setActiveIndex(i)
    setAnimKey((k) => k + 1)
  }

  function goToPrev() {
    goTo((activeIndex - 1 + ALL_SLIDES.length) % ALL_SLIDES.length)
  }
  function goToNext() {
    goTo((activeIndex + 1) % ALL_SLIDES.length)
  }

  return (
    <section
      className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[100svh] lg:min-h-[88vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={goToPrev}
        aria-label="Previous slide"
        className="cursor-pointer absolute left-2 sm:left-4 top-20 lg:top-1/2 lg:-translate-y-1/2 z-20 p-1.5 text-accent opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:opacity-100"
      >
        <ChevronLeft size={44} strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={goToNext}
        aria-label="Next slide"
        className="cursor-pointer absolute right-2 sm:right-4 top-20 lg:top-1/2 lg:-translate-y-1/2 z-20 p-1.5 text-accent opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus-visible:opacity-100"
      >
        <ChevronRight size={44} strokeWidth={2} />
      </button>

      <div className="relative overflow-hidden order-1 min-h-[360px] lg:min-h-0">
        <SlideshowLeft activeIndex={activeIndex} animKey={animKey} paused={paused} goTo={goTo} />
      </div>

      <div className="hidden lg:block relative overflow-hidden bg-[#f7f7f7]">
        <div className="absolute inset-0" style={{ background: "#f7f7f7" }} />

        {ALL_SLIDES.map((s, i) => {
          const visible = i === activeIndex
          return (
            <div
              key={s.key}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: visible ? 1 : 0 }}
            >
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 lg:px-10 py-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  className="w-full max-w-[560px] h-auto select-none drop-shadow-[0_24px_48px_rgba(17,29,53,0.18)]"
                  draggable={false}
                />
                {i === 0 && (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-center max-w-[420px]">
                    <span className="text-[11px] font-semibold text-accent-mid tracking-[0.04em]">
                      Also available on Android &amp; iOS
                    </span>
                    <span className="text-[#c0ccd8]">·</span>
                    <span className="text-[11px] font-light text-[#000000]">
                      same live data on web, desktop, and mobile
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
