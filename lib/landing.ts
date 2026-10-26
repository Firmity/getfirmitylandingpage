/**
 * Copy and data for the landing page. Source of truth:
 * "Firmity Landing Page Content" (Oct 2026). Components stay presentational,
 * so editing marketing copy means editing this file, not JSX.
 *
 * Items flagged `pending: true` are copy the content doc still lists as
 * "needed before going live". They are filtered out at render time, so
 * nothing placeholder-shaped ever reaches the public page. Fill in the text,
 * flip `pending` to false (or delete the flag) and it appears.
 */

export const meta = {
  title: "Firmity | Facility Management Software for India",
  description:
    "Track PPM, assets, complaints, visitors, attendance and inventory in one app. Get in touch with Firmity.",
};

export const contact = {
  email: "sales@firmity.in",
  whatsappDisplay: "+91 92173 40884",
  whatsappUrl: "https://wa.me/919217340884",
  privacyUrl: "https://www.firmity.in/privacy",
  termsUrl: "https://www.firmity.in/terms",
};

export const anchors = {
  heroForm: "contact",
  closingForm: "contact-final",
} as const;

export const hero = {
  badge: "Facility management software for India",
  headlineBefore: "Stop chasing work orders. Run your ",
  headlineAccent: "whole facility",
  headlineAfter: " from one app.",
  sub: "Track PPM, assets, complaints, visitors, attendance and inventory in real time, on web, Android and iOS.",
  ticks: ["Free consultation", "Reply in 24 hours", "No obligation"],
  image: {
    src: "/assets/slideshow/slide-hero.webp",
    alt: "Firmity dashboard on a laptop next to the Firmity mobile app on a phone",
    width: 1536,
    height: 1048,
  },
};

export const demoForm = {
  title: "Get in touch",
  subtitle: "See Firmity on your own facility.",
  submitLabel: "Send My Request",
  note: "By submitting you agree to be contacted about Firmity.",
  errorMessage: `Something went wrong. Please try again, or WhatsApp us on ${contact.whatsappDisplay}.`,
};

export const moduleOptions = [
  "Facility Tasks (PPM)",
  "Assets & Spares",
  "Complaints & Helpdesk",
  "Visitor Management",
  "Employee & Attendance",
  "Inventory & Vendors",
  "Not sure yet",
] as const;

export const trust = {
  label: "Trusted by teams at",
  logos: [
    { name: "Park Hyatt", src: "/assets/clients/Park-hyatt.webp", width: 480, height: 142 },
    { name: "ITC Hotels", src: "/assets/clients/ITC_Hotels.webp", width: 400, height: 240 },
    { name: "Marriott", src: "/assets/clients/Marriott.webp", width: 427, height: 240 },
    { name: "Sobha", src: "/assets/clients/Sobha.webp", width: 154, height: 189 },
    { name: "Indian Navy", src: "/assets/clients/indian-navy.webp", width: 189, height: 240 },
    { name: "L&T", src: "/assets/clients/LT.webp", width: 240, height: 240 },
    { name: "Schaeffler", src: "/assets/clients/Schaeffler.webp", width: 480, height: 60 },
    { name: "CK Birla Hospital", src: "/assets/clients/Ck-Birla-Hospital.webp", width: 480, height: 64 },
  ],
};

export const modules = {
  heading: "Six modules. Start with one, add the rest as you grow.",
  sub: "Every module runs on the same platform, so each step connects to the last.",
  ctaLabel: "Get in Touch",
  items: [
    {
      tab: "Facility Tasks (PPM)",
      title: "Facility Tasks (PPM)",
      body: "Schedule, assign and track work orders with automated triggers and real-time updates.",
      image: "/assets/slideshow/slide-facility-tasks.webp",
      width: 1589,
      height: 990,
    },
    {
      tab: "Assets & Spares",
      title: "Assets & Spares",
      body: "QR-tagged assets give technicians instant access to history, AMC contracts and spares.",
      image: "/assets/slideshow/slide-assets.webp",
      width: 1589,
      height: 990,
    },
    {
      tab: "Complaints & Helpdesk",
      title: "Complaints & Helpdesk",
      body: "Scan-to-raise QR tickets auto-route to technicians, with live status boards and a full SLA audit trail.",
      image: "/assets/slideshow/slide-complaints.webp",
      width: 1589,
      height: 990,
    },
    {
      tab: "Visitor Management",
      title: "Visitor Management",
      body: "Contactless QR check-ins and pre-approved gate passes, with instant host alerts and occupancy tracking.",
      image: "/assets/slideshow/slide-visitor.webp",
      width: 1589,
      height: 990,
    },
    {
      tab: "Employee & Attendance",
      title: "Employee & Attendance",
      body: "Geo-fenced facial-recognition attendance with digital leave and payroll-ready exports.",
      image: "/assets/slideshow/slide-employee.webp",
      width: 1536,
      height: 1024,
    },
    {
      tab: "Inventory & Vendors",
      title: "Inventory & Vendors",
      body: "Automated PO generation and GRN tracking keep stock and vendors aligned with your general ledger.",
      image: "/assets/slideshow/slide-inventory.webp",
      width: 1536,
      height: 1024,
    },
  ],
};

export type Quote = {
  quote: string;
  name: string;
  role: string;
  pending?: boolean;
};

export const testimonials = {
  heading: "What our customers say",
  quotes: [
    {
      quote:
        "The report was incredibly detailed. They found three active leakages we had no idea about and gave us a clear priority list for the next six months.",
      name: "Anuj Handoo",
      role: "Director, Royal Nest Estates, Delhi NCR",
    },
    // Needed before going live: two more quotes about the software itself
    // (hotel, hospital or plant customers read best on a module-wise page).
    { quote: "", name: "", role: "", pending: true },
    { quote: "", name: "", role: "", pending: true },
  ] as Quote[],
};

export type FaqItem = { q: string; a: string; pending?: boolean };

export const faq = {
  heading: "Frequently asked questions",
  items: [
    {
      q: "What is Firmity?",
      a: "A cloud-based facility management platform for India that combines CMMS and ERP in one system, covering maintenance, assets, inventory, payroll, expenses and compliance.",
    },
    {
      q: "Does it work on mobile?",
      a: "Yes. Firmity is available on Android and iOS, with the same live data on web, desktop and mobile.",
    },
    // Needed before going live: typical go-live timeline.
    { q: "How long does it take to go live?", a: "", pending: true },
    // Needed before going live: multi-site answer.
    { q: "Can I manage more than one site?", a: "", pending: true },
    {
      q: "How is Firmity priced?",
      // Fallback wording offered in the content doc; swap in a real pricing
      // model here if you want one on the page.
      a: "We share a quote after we speak, based on the modules and users you need.",
    },
  ] as FaqItem[],
};

export const closing = {
  heading: "Ready to see Firmity on your facility?",
  line: "Share your details and we will show you the module that matters most to you.",
};

export const footer = {
  legal: "© 2026 UFIRM Technologies (P) Limited · Made in India",
};

export const propertyTypeOptions = [
  "Residential Society",
  "Corporate Office",
  "Manufacturing Plant",
  "Hospital / Clinic",
  "Educational Campus",
  "Hotel / Hospitality",
] as const;

/** Strip above the footer: free on-site survey, with the explainer video. */
export const survey = {
  heading: "Your facility deserves a health check.",
  body: "A certified surveyor visits your property and inspects it across 14 critical areas. Our AI turns it into a complete Facility Health Report in 10 minutes.",
  ticks: ["100% free", "Confidential", "Report in 10 minutes", "No obligation"],
  ctaLabel: "Book a Survey",
  // YouTube Short; rendered through the privacy-enhanced nocookie embed.
  videoId: "d86RQOVL6IY",
  videoTitle: "Firmity facility health survey, in under a minute",
  dialog: {
    title: "Book your free survey",
    subtitle: "Tell us about your property so we can send the right surveyor.",
    submitLabel: "Book My Survey",
    note: "Takes under 2 minutes. By submitting you agree to be contacted about Firmity.",
    closeLabel: "Close",
  },
};

export const footerNav = {
  tagline: "Facility management software for India.",
  modulesHeading: "Modules",
  contactHeading: "Contact",
  companyHeading: "Company",
  siteLabel: "firmity.in",
  siteUrl: "https://www.firmity.in",
};

type ThankYouCopy = {
  h1: string;
  sub: string;
  steps: { num: string; title: string; body: string }[];
  trustLines: string[];
  ctaLabel: string;
};

export const surveyThankYou: ThankYouCopy = {
  h1: "Thank you. Your survey request is in.",
  sub: "We have your details and a certified surveyor is being assigned to your property. Most visits get scheduled within 2 to 3 working days.",
  steps: [
    {
      num: "01",
      title: "We review your details",
      body: "We check your property type and location to assign the right surveyor.",
    },
    {
      num: "02",
      title: "You get a call within 24 hours",
      body: "We confirm a convenient visit slot on the number you shared.",
    },
    {
      num: "03",
      title: "Your report arrives in 10 minutes",
      body: "After the on-site visit, our AI turns the survey into a complete Facility Health Report.",
    },
  ],
  trustLines: ["100% free", "No obligation to buy Firmity software afterward"],
  ctaLabel: "Back to Home",
};
