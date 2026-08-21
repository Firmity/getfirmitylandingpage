import { useState, useRef, useEffect } from 'react';
import './FirmityLandingPage.css';

// ---- Static data ----------------------------------------------------

const GAUGE_DOMAINS = [
  { label: 'Infrastructure', value: 68 },
  { label: 'Fire Safety', value: 74 },
  { label: 'Security', value: 81 },
  { label: 'Maintenance', value: 65 },
  { label: 'Sustainability', value: 70 },
  { label: 'Housekeeping', value: 88 },
];

const SAMPLE_SCORE = 72; // used for the hero gauge needle angle

const FAQ_DATA = [
  {
    q: 'Is the assessment really free?',
    a: 'Yes — no cost at any stage, and no card details required.',
  },
  {
    q: 'Do I have to buy Firmity software after this?',
    a: 'No. The report is yours to use however you want, with zero obligation.',
  },
  {
    q: 'How long does the on-site visit take?',
    a: 'Depends on property size — most single-property visits are completed in a day.',
  },
  {
    q: 'Who sees my report?',
    a: 'Only the contact you name at the time of booking.',
  },
  {
    q: 'What kind of properties do you cover?',
    a: 'Residential societies, corporate offices, manufacturing plants, hospitals, educational campuses, and hotels.',
  },
];

const PROPERTY_TYPES = [
  'Residential Society',
  'Corporate Office',
  'Manufacturing Plant',
  'Hospital / Clinic',
  'Educational Campus',
  'Hotel / Hospitality',
];

const INITIAL_FORM_STATE = {
  fname: '',
  fphone: '',
  femail: '',
  fproperty: '',
  ftype: '',
  fcity: '',
};

// ---- Component --------------------------------------------------------

export default function FirmityLandingPage() {
  const needleRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState({ message: '', ok: false, show: false });
  const [submitting, setSubmitting] = useState(false);

  // Animate the gauge needle to the sample score on mount.
  useEffect(() => {
    const angle = -90 + (SAMPLE_SCORE / 100) * 180;
    const timer = setTimeout(() => {
      if (needleRef.current) {
        needleRef.current.style.transform = `rotate(${angle}deg)`;
      }
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ message: '', ok: false, show: false });

    const payload = {
      name: form.fname,
      phone: form.fphone,
      email: form.femail,
      property_name: form.fproperty,
      property_type: form.ftype,
      city: form.fcity,
      source: 'landing_page_survey',
    };

    try {
      // TODO (dev): replace with your real leads API / CRM webhook endpoint.
      const res = await fetch('/api/leads/facility-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('submit failed');

      // Fire GTM event only after a successful submit — see gtm-setup.md
      // for how to wire this event into a GA4 / Google Ads conversion in GTM.
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'survey_form_submit',
          form_name: 'facility_health_survey',
          property_type: form.ftype,
          city: form.fcity,
        });
      }

      setStatus({
        message: "Thanks — we'll reach out within 24 hours to schedule your visit.",
        ok: true,
        show: true,
      });
      setForm(INITIAL_FORM_STATE);
    } catch (err) {
      setStatus({
        message: 'Something went wrong — please try again or call us directly.',
        ok: false,
        show: true,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="firmity-landing">
      {/* ===== HEADER ===== */}
      <header>
        <div className="header-inner">
          <div className="logo">
            Firm<span>ity</span>
          </div>
          <a href="#lead-form" className="btn btn-outline-dark header-cta">
            Free Assessment →
          </a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="hero-eyebrow eyebrow">Free AI Facility Health Assessment</div>
            <h1>Find out what's actually wrong with your facility — before it costs you</h1>
            <p className="sub">
              A certified surveyor visits your property, inspects it across 14 critical areas,
              and our AI turns it into a complete Facility Health Report in 10 minutes. 100%
              free. No sales call required.
            </p>
            <div className="hero-ctas">
              <a href="#lead-form" className="btn btn-primary">
                Get My Free Facility Health Report
              </a>
            </div>
            <div className="hero-microtrust">
              <span>No cost, ever</span>
              <span>Fully confidential</span>
              <span>Report in 10 minutes</span>
            </div>
          </div>

          <div className="gauge-card">
            <div className="gauge-card-label mono">
              <span>FACILITY HEALTH SCORE</span>
              <span>SAMPLE</span>
            </div>
            <div className="gauge-wrap">
              <svg width="220" height="130" viewBox="0 0 220 130" aria-hidden="true">
                <path
                  d="M 10 110 A 100 100 0 0 1 76 20"
                  fill="none"
                  stroke="#C1442D"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 82 16 A 100 100 0 0 1 138 16"
                  fill="none"
                  stroke="#E8A33D"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 144 20 A 100 100 0 0 1 210 110"
                  fill="none"
                  stroke="#3C8D6B"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <g ref={needleRef} className="needle-pivot" style={{ transform: 'rotate(-90deg)' }}>
                  <line x1="110" y1="108" x2="110" y2="30" stroke="#F7F6F1" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="110" cy="108" r="7" fill="#F7F6F1" />
                </g>
              </svg>
              <div className="gauge-readout">
                {SAMPLE_SCORE}
                <small>/100</small>
              </div>
              <div className="gauge-status">Moderate — Attention Required</div>
            </div>
            <div className="gauge-domains mono">
              {GAUGE_DOMAINS.map((d) => (
                <div className="gauge-domain" key={d.label}>
                  {d.label} <b>{d.value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <div className="trustbar">
        <div className="wrap">
          {['Residential Societies', 'Corporate Offices', 'Manufacturing Plants', 'Hospitals & Clinics', 'Educational Campuses', 'Hotels'].map(
            (t, i, arr) => (
              <span key={t}>
                {t}
                {i < arr.length - 1 && <span className="divider">/</span>}
              </span>
            )
          )}
        </div>
      </div>

      {/* ===== PROBLEM CARDS ===== */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Why Get Assessed</div>
            <h2>Most facilities look fine on paper. They're not.</h2>
            <p>
              Day-to-day operations hide problems until they show up as a burst pipe, a failed
              fire audit, or a breakdown nobody saw coming.
            </p>
          </div>
          <div className="card-grid">
            <div className="p-card">
              <span className="tag tag-red">Risk: High</span>
              <h3>Water &amp; Leakages</h3>
              <p>
                Terrace waterproofing, plumbing lines and wet areas leak quietly for months
                before anyone notices — and by the time it's visible, you're paying for
                structural repair, not a fix.
              </p>
              <div className="stat">
                <b>15–25%</b> higher operating cost from undetected leakages
              </div>
            </div>
            <div className="p-card">
              <span className="tag tag-amber">Risk: Medium</span>
              <h3>Fire Safety &amp; Security</h3>
              <p>
                An extinguisher past its service date. A blocked evacuation route. A CCTV blind
                spot. None of it announces itself — until an audit, or an incident, forces the
                issue.
              </p>
              <div className="stat">
                Compliance gaps found in <b>most</b> first-time assessments
              </div>
            </div>
            <div className="p-card">
              <span className="tag tag-green">Risk: Rising</span>
              <h3>Assets &amp; Maintenance</h3>
              <p>
                HVAC running past its service interval, STP systems underperforming, equipment
                ageing without a maintenance log — nothing fails on schedule, but everything gets
                costlier the longer it's ignored.
              </p>
              <div className="stat">
                <b>3–5x</b> costlier: reactive repair vs. preventive
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <div className="stats-strip">
        <div className="wrap stats-inner">
          <div className="cell">
            <div className="stat-num">15–25%</div>
            <div className="stat-label">Increase in operating cost from undetected leakages</div>
          </div>
          <div className="cell">
            <div className="stat-num">3–5x</div>
            <div className="stat-label">Higher repair cost — reactive vs. preventive maintenance</div>
          </div>
          <div className="cell">
            <div className="stat-num">14</div>
            <div className="stat-label">Domains inspected in a single on-site visit</div>
          </div>
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Powered by AI</div>
            <h2>Four steps. One visit. A report you can act on.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num mono">01</div>
              <h3>Schedule Your Assessment</h3>
              <p>Pick a date, tell us about your property, choose the domains you want covered. Under 5 minutes.</p>
            </div>
            <div className="step">
              <div className="step-num mono">02</div>
              <h3>On-site Facility Survey</h3>
              <p>A certified surveyor inspects your property in person — photos, notes, structured checks across every selected domain.</p>
            </div>
            <div className="step">
              <div className="step-num mono">03</div>
              <h3>AI Builds Your Report</h3>
              <p>Within 10 minutes of the visit, AI compiles everything into a scored, structured Facility Health Report.</p>
            </div>
            <div className="step">
              <div className="step-num mono">04</div>
              <h3>You Decide What's Next</h3>
              <p>Use the report to prioritise repairs, fix compliance gaps, or plan next year's maintenance budget. No obligation to do anything else.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REPORT SECTION ===== */}
      <section style={{ background: 'var(--paper-dim)' }}>
        <div className="wrap report-split">
          <div>
            <div className="eyebrow" style={{ color: 'var(--amber-deep)' }}>
              Your Deliverable
            </div>
            <h2 style={{ marginTop: 12 }}>A report you can actually hand to management.</h2>
            <ul className="report-list" style={{ marginTop: 26 }}>
              <li>Overall Facility Health Score + score by domain</li>
              <li>Green / Amber / Red risk rating on every finding</li>
              <li>Photo evidence, tagged by location</li>
              <li>Priority action matrix — what to fix first, and why</li>
              <li>Executive summary for leadership / management committee</li>
              <li>Compliance snapshot</li>
              <li>Shared only with the contact you authorise</li>
            </ul>
            <a href="/sample-facility-report.pdf" className="btn btn-outline-light" style={{ marginTop: 28 }}>
              Download a Sample Report →
            </a>
          </div>
          <div className="report-doc">
            <div className="report-doc-top">
              <span className="active">Summary</span>
              <span>Scores</span>
              <span>Findings</span>
              <span>Action Plan</span>
            </div>
            <div className="report-doc-body">
              <div className="rd-eyebrow">Facility Health Report · Prepared by Firmity AI</div>
              <h3>Executive Summary</h3>
              <div className="rd-score">
                <b>72</b>
                <span style={{ color: 'var(--slate-soft)', fontSize: 13 }}>/ 100 — Moderate</span>
              </div>
              <div className="rd-bar">
                <i></i>
              </div>
              <div className="rd-findings">
                <div className="rd-finding">
                  <span>
                    <span className="dot" style={{ background: 'var(--red)' }}></span>
                    Terrace waterproofing — active leak
                  </span>
                  <span className="mono" style={{ color: 'var(--red)' }}>
                    HIGH
                  </span>
                </div>
                <div className="rd-finding">
                  <span>
                    <span className="dot" style={{ background: 'var(--amber-deep)' }}></span>
                    2 extinguishers past service date
                  </span>
                  <span className="mono" style={{ color: 'var(--amber-deep)' }}>
                    MED
                  </span>
                </div>
                <div className="rd-finding">
                  <span>
                    <span className="dot" style={{ background: 'var(--green)' }}></span>
                    Housekeeping standards
                  </span>
                  <span className="mono" style={{ color: 'var(--green)' }}>
                    LOW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <div className="testimonial-wrap">
        <section>
          <div className="wrap testimonial">
            <blockquote>
              The Firmity team assessed our entire residential campus in a single day. The report
              was incredibly detailed — they found three active leakages we had no idea about,
              flagged two fire extinguishers that were past service date, and gave us a clear
              priority list for the next six months. It helped us allocate our maintenance budget
              with confidence.
            </blockquote>
            <div className="testimonial-foot">
              <div className="avatar">AS</div>
              <div>
                <div style={{ color: 'var(--ink)', fontWeight: 600 }}>Anuj Handoo</div>
                <div style={{ color: 'var(--slate-soft)' }}>
                  Directot · Royal Nest Estates, Delhi NCR ·{' '}
                  <span className="verified">Verified Review</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== BRIDGE: SURVEY -> CMMS ===== */}
      <div className="bridge">
        <section>
          <div className="wrap bridge-inner">
            <div>
              <div className="eyebrow bridge-eyebrow">What Happens After Your Report</div>
              <h2 style={{ marginTop: 12 }}>Your report shows what's wrong. Firmity CMMS makes sure it gets fixed.</h2>
              <p className="lead">
                Most facility teams already know their problems by the time they get the report —
                a leak here, an overdue AMC there. What's usually missing isn't the diagnosis,
                it's a system to act on it.
              </p>
              <div className="bridge-features">
                <div className="bf">
                  <div className="bf-mark">✓</div>
                  <div>
                    <b>Automated PPM schedules</b>
                    <span>So the same AMC doesn't get missed twice.</span>
                  </div>
                </div>
                <div className="bf">
                  <div className="bf-mark">✓</div>
                  <div>
                    <b>Asset tracking</b>
                    <span>Every equipment, its condition, its history — in one place.</span>
                  </div>
                </div>
                <div className="bf">
                  <div className="bf-mark">✓</div>
                  <div>
                    <b>Visitor &amp; gate management</b>
                    <span>Digital logs instead of a register at the desk.</span>
                  </div>
                </div>
                <div className="bf">
                  <div className="bf-mark">✓</div>
                  <div>
                    <b>Live dashboards</b>
                    <span>Downtime, costs and staff performance, visible to management in real time.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bridge-card">
              <div className="eyebrow">Firmity CMMS</div>
              <h3>See how the software works</h3>
              <p>
                Once you've seen your report, take a look at the system that turns findings into
                follow-through — no pressure, no obligation.
              </p>
              <a href="https://firmity.in/features" className="btn btn-outline-dark">
                See How Firmity CMMS Works →
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ===== LEAD FORM ===== */}
      <section className="form-section" id="lead-form">
        <div className="wrap form-grid">
          <div>
            <div className="eyebrow" style={{ color: 'var(--amber)' }}>
              Get Started Today
            </div>
            <h2>Book your free facility health assessment</h2>
            <p className="sub">
              Tell us a bit about your property so we can send the right kind of surveyor — most
              bookings get scheduled within 2–3 working days.
            </p>
            <div className="form-trust">
              <div>100% free — no cost at any stage</div>
              <div>Report shared only with your authorised contact</div>
              <div>No obligation to buy Firmity software afterward</div>
            </div>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <h3>Schedule My Free Assessment</h3>
            <p className="form-note">Takes under 2 minutes.</p>

            <div className="field">
              <label htmlFor="fname">Full Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                required
                placeholder="Your name"
                value={form.fname}
                onChange={handleChange}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="fphone">Work Phone</label>
                <input
                  type="tel"
                  id="fphone"
                  name="fphone"
                  required
                  placeholder="10-digit number"
                  value={form.fphone}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="femail">Work Email</label>
                <input
                  type="email"
                  id="femail"
                  name="femail"
                  required
                  placeholder="you@company.com"
                  value={form.femail}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="fproperty">Property / Society / Company Name</label>
              <input
                type="text"
                id="fproperty"
                name="fproperty"
                required
                placeholder="e.g. Greenfield Housing Society"
                value={form.fproperty}
                onChange={handleChange}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="ftype">Property Type</label>
                <select id="ftype" name="ftype" required value={form.ftype} onChange={handleChange}>
                  <option value="" disabled>
                    Select type
                  </option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="fcity">City</label>
                <input
                  type="text"
                  id="fcity"
                  name="fcity"
                  required
                  placeholder="e.g. Pune"
                  value={form.fcity}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Schedule My Free Assessment'}
            </button>

            {status.show && (
              <div className={`form-status mono show ${status.ok ? 'ok' : ''}`}>{status.message}</div>
            )}
          </form>
        </div>
      </section>

      {/* ===== PRIVACY ===== */}
      <section>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 36 }}>
            <div className="eyebrow">Privacy Commitment</div>
            <h2>Your facility data stays private.</h2>
          </div>
          <div className="privacy-grid">
            <div className="priv-item">
              <h3>Authorised contacts only</h3>
              <p>The report goes exclusively to the contact you designate at booking — no exceptions.</p>
            </div>
            <div className="priv-item">
              <h3>No third-party disclosure</h3>
              <p>Your data and findings are never sold, shared, or disclosed to any third party.</p>
            </div>
            <div className="priv-item">
              <h3>Nothing retained beyond the report</h3>
              <p>Information about your operations is used only to prepare your report.</p>
            </div>
            <div className="priv-item">
              <h3>No obligation, ever</h3>
              <p>Receiving the report doesn't commit you to purchasing Firmity or anything else.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ background: 'var(--paper-dim)' }}>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 20 }}>
            <div className="eyebrow">Common Questions</div>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq-list">
            {FAQ_DATA.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.q}>
                  <button className="faq-q" onClick={() => setOpenFaq(isOpen ? null : i)}>
                    {item.q} <span className="plus">+</span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: isOpen ? '200px' : '0px' }}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta">
        <div className="wrap final-cta-inner">
          <h2>Your facility deserves a health check.</h2>
          <p>
            Whether you run a residential community, a corporate office, or a manufacturing plant
            — knowing where you actually stand beats assuming everything's fine.
          </p>
          <a href="#lead-form" className="btn btn-primary">
            Get My Free Facility Health Assessment
          </a>
          <div className="hero-microtrust" style={{ justifyContent: 'center', marginTop: 24 }}>
            <span>100% Free</span>
            <span>Confidential</span>
            <span>Report in 10 minutes</span>
            <span>No obligation</span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer>
        <div className="wrap footer-inner">
          <div className="logo" style={{ fontSize: 16 }}>
            Firm<span>ity</span>
          </div>
          <p>© 2026 UFIRM Technologies (P) Limited — Proudly Made in India</p>
        </div>
      </footer>
    </div>
  );
}
