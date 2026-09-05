/**
 * Single source of truth for landing-page copy, pulled directly from
 * firmity-landing-content-final.md (with revisions per client feedback:
 * positive framing over negative claims, no em dashes). Components stay
 * presentational — editing marketing copy means editing this file, not JSX.
 */

export const site = {
  name: "Firmity",
  legalFooter: "© 2026 UFIRM Technologies (P) Limited · Proudly Made in India",
};

export const hero = {
  eyebrow: "Free AI Facility Health Assessment",
  h1: "Find out the real health of your facility before it costs you",
  sub: "A certified surveyor visits your property, inspects it across 14 critical areas, and our AI turns it into a complete Facility Health Report in 10 minutes. 100% free. No sales call required.",
  ctaLabel: "Get My Free Facility Health Report",
  microTrust: ["No cost, ever", "Fully confidential", "Report in 10 minutes"],
};

export const gaugeDomains = [
  { label: "Infrastructure", value: 68 },
  { label: "Fire Safety", value: 74 },
  { label: "Security", value: 81 },
  { label: "Maintenance", value: 65 },
  { label: "Sustainability", value: 70 },
  { label: "Housekeeping", value: 88 },
] as const;

export const sampleScore = 72;
export const sampleScoreStatus = "Moderate · Attention Suggested";

export const trustBar = [
  { label: "Residential Societies", icon: "home" },
  { label: "Corporate Offices", icon: "building-2" },
  { label: "Manufacturing Plants", icon: "factory" },
  { label: "Hospitals & Clinics", icon: "heart-pulse" },
  { label: "Educational Campuses", icon: "graduation-cap" },
  { label: "Hotels", icon: "hotel" },
];

export type RiskLevel = "high" | "medium" | "rising";

export const whyAssessed = {
  eyebrow: "Why Get Assessed",
  h2: "Most facilities look fine on paper. They're not.",
  intro:
    "Day-to-day operations hide problems until they show up as a burst pipe, a failed fire audit, or a breakdown nobody saw coming.",
  items: [
    {
      icon: "droplets",
      risk: "high" as RiskLevel,
      riskLabel: "Risk: High",
      title: "Water & Leakages",
      body: "Terrace waterproofing, plumbing lines and wet areas leak quietly for months before anyone notices, and by the time it's visible, you're paying for structural repair, not a fix.",
      statValue: "15–25%",
      statLabel: "higher operating cost from undetected leakages",
    },
    {
      icon: "flame",
      risk: "medium" as RiskLevel,
      riskLabel: "Risk: Medium",
      title: "Fire Safety & Security",
      body: "An extinguisher past its service date. A blocked evacuation route. A CCTV blind spot. None of it announces itself until an audit, or an incident, forces the issue.",
      statValue: "Most",
      statLabel: "first-time assessments turn up compliance gaps",
    },
    {
      icon: "wrench",
      risk: "rising" as RiskLevel,
      riskLabel: "Risk: Rising",
      title: "Assets & Maintenance",
      body: "HVAC running past its service interval, STP systems underperforming, equipment ageing without a maintenance log. Nothing fails on schedule, but everything gets costlier the longer it's ignored.",
      statValue: "3–5x",
      statLabel: "costlier: reactive repair vs. preventive",
    },
  ],
};

export const statsStrip = [
  { value: "15–25%", label: "Increase in operating cost from undetected leakages" },
  { value: "3–5x", label: "Higher repair cost for reactive fixes vs. preventive maintenance" },
  { value: "14", label: "Domains inspected in a single on-site visit" },
];

export const howItWorks = {
  eyebrow: "Powered by AI",
  h2: "Four steps. One visit. A report you can act on.",
  steps: [
    {
      num: "01",
      title: "Schedule Your Assessment",
      body: "Pick a date, tell us about your property, choose the domains you want covered. Under 5 minutes.",
    },
    {
      num: "02",
      title: "On-site Facility Survey",
      body: "A certified surveyor inspects your property in person, with photos, notes, and structured checks across every selected domain.",
    },
    {
      num: "03",
      title: "AI Builds Your Report",
      body: "Within 10 minutes of the visit, AI compiles everything into a scored, structured Facility Health Report.",
    },
    {
      num: "04",
      title: "You Decide What's Next",
      body: "Use the report to prioritise repairs, close compliance gaps, or plan next year's maintenance budget. No obligation to do anything else.",
    },
  ],
};

export const deliverable = {
  eyebrow: "Your Deliverable",
  h2: "A report you can actually hand to management.",
  items: [
    "Overall Facility Health Score + score by domain",
    "Green / Amber / Red risk rating on every finding",
    "Photo evidence, tagged by location",
    "Priority action matrix: what to fix first, and why",
    "Executive summary for leadership / management committee",
    "Compliance snapshot",
    "Shared only with the contact you authorise",
  ],
  ctaLabel: "Download a Sample Report →",
  ctaHref: "/sample-facility-report.pdf",
  mockup: {
    tabs: ["Summary", "Scores", "Findings", "Action Plan"] as const,
    summaryFindings: [
      { label: "Terrace waterproofing: active leak", severity: "HIGH" as const },
      { label: "2 extinguishers past service date", severity: "MED" as const },
      { label: "Housekeeping standards", severity: "LOW" as const },
    ],
    findings: [
      { label: "Terrace waterproofing: active leak", severity: "HIGH" as const },
      { label: "2 extinguishers past service date", severity: "MED" as const },
      { label: "CCTV blind spot, east stairwell", severity: "MED" as const },
      { label: "STP output below rated capacity", severity: "MED" as const },
      { label: "Housekeeping standards", severity: "LOW" as const },
    ],
    actionPlan: [
      { title: "Repair terrace waterproofing", timeframe: "This week" },
      { title: "Service 2 fire extinguishers", timeframe: "This week" },
      { title: "Add CCTV coverage, east stairwell", timeframe: "This month" },
      { title: "Inspect STP output", timeframe: "This month" },
      { title: "Housekeeping refresh", timeframe: "Next cycle" },
    ],
  },
};

export const testimonial = {
  quote:
    "The Firmity team assessed our entire residential campus in a single day. The report was incredibly detailed: they found three active leakages we had no idea about, flagged two fire extinguishers that were past service date, and gave us a clear priority list for the next six months. It helped us allocate our maintenance budget with confidence.",
  name: "Anuj Handoo",
  role: "Director, Royal Nest Estates, Delhi NCR",
  badge: "Verified Review",
  initials: "AH",
};

export const cmmsBridge = {
  eyebrow: "What Happens After Your Report",
  h2: "Your report shows where you stand. Firmity CMMS keeps you moving forward.",
  intro:
    "Most facility teams already know their property well by the time they get the report. What's usually missing isn't the insight, it's a system that turns that insight into steady follow-through.",
  features: [
    {
      icon: "calendar-clock",
      title: "Automated PPM schedules",
      body: "So every AMC gets tracked and completed on time.",
    },
    {
      icon: "box",
      title: "Asset tracking",
      body: "Every piece of equipment, its condition, and its history, all in one place.",
    },
    {
      icon: "id-card",
      title: "Visitor & gate management",
      body: "Digital logs instead of a register at the desk.",
    },
    {
      icon: "activity",
      title: "Live dashboards",
      body: "Downtime, costs and staff performance, visible to management in real time.",
    },
  ],
  card: {
    eyebrow: "Firmity CMMS",
    title: "See how the software works",
    body: "Once you've seen your report, take a look at the system that turns findings into follow-through, with no pressure and no obligation.",
    ctaLabel: "See How Firmity CMMS Works →",
    ctaHref: "https://firmity.co/features",
  },
};

export const leadForm = {
  eyebrow: "Get Started Today",
  h2: "Book your free facility health assessment",
  sub: "Tell us a bit about your property so we can send the right kind of surveyor. Most bookings get scheduled within 2–3 working days.",
  trustLines: [
    "100% free, no cost at any stage",
    "Report shared only with your authorised contact",
    "No obligation to buy Firmity software afterward",
  ],
  formTitle: "Schedule My Free Assessment",
  formNote: "Takes under 2 minutes.",
  submitLabel: "Schedule My Free Assessment",
  successMessage: "Thanks! We'll reach out within 24 hours to schedule your visit.",
  errorMessage: "Something went wrong. Please try again, or call us directly.",
};

export const propertyTypes = [
  "Residential Society",
  "Corporate Office",
  "Manufacturing Plant",
  "Hospital / Clinic",
  "Educational Campus",
  "Hotel / Hospitality",
];

export const privacy = {
  eyebrow: "Privacy Commitment",
  h2: "Your facility data stays private.",
  items: [
    {
      icon: "user-check",
      title: "Authorised contacts only",
      body: "The report goes exclusively to the contact you designate at booking, no exceptions.",
    },
    {
      icon: "shield-off",
      title: "No third-party disclosure",
      body: "Your data and findings are never sold, shared, or disclosed to any third party.",
    },
    {
      icon: "eraser",
      title: "Nothing retained beyond the report",
      body: "Information about your operations is used only to prepare your report.",
    },
    {
      icon: "circle-off",
      title: "No obligation, ever",
      body: "Receiving the report doesn't commit you to purchasing Firmity or anything else.",
    },
  ],
};

export const faq = {
  eyebrow: "Common Questions",
  h2: "Frequently asked questions",
  items: [
    {
      q: "Is the assessment really free?",
      a: "Yes, no cost at any stage, and no card details required.",
    },
    {
      q: "Do I have to buy Firmity software after this?",
      a: "No. The report is yours to use however you want, with zero obligation.",
    },
    {
      q: "How long does the on-site visit take?",
      a: "Depends on property size. Most single-property visits are completed in a day.",
    },
    {
      q: "Who sees my report?",
      a: "Only the contact you name at the time of booking.",
    },
    {
      q: "What kind of properties do you cover?",
      a: "Residential societies, corporate offices, manufacturing plants, hospitals, educational campuses, and hotels.",
    },
  ],
};

// Source graphic for this section is the design team's approved Footer.png
// asset, embedded as-is (see ComparisonImage.tsx) rather than rebuilt with
// site components.
export const comparisonImage = {
  eyebrow: "The Difference Firmity Makes",
  h2: "What changes when you get assessed.",
  alt: "Comparison graphic: without Firmity, facilities face unnoticed issues, higher costs and unexpected downtime; with Firmity, they get lower costs, proactive checks and smooth operations.",
};

export const finalCta = {
  h2: "Your facility deserves a health check.",
  body: "Whether you run a residential community, a corporate office, or a manufacturing plant, knowing exactly where you stand keeps it running at its best.",
  ctaLabel: "Get My Free Facility Health Assessment",
  trustLine: ["100% Free", "Confidential", "Report in 10 minutes", "No obligation"],
};
