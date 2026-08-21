"""
Builds public/sample-facility-report.pdf — the placeholder PDF backing the
"Download a Sample Report" CTA. Mirrors the on-page report mockup (score,
domain breakdown, findings) so the download matches what visitors already
saw in the UI. Replace with a real report export once the product can
generate one; this keeps the CTA from being a dead link in the meantime.
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)

INK = colors.HexColor("#17181B")
INK_SOFT = colors.HexColor("#585C53")
ACCENT = colors.HexColor("#2F5D4C")
PAPER_DIM = colors.HexColor("#F2EFE6")
RED = colors.HexColor("#B8412A")
RED_SOFT = colors.HexColor("#F6E5DF")
AMBER = colors.HexColor("#B9812F")
AMBER_SOFT = colors.HexColor("#F6ECDA")
GREEN = colors.HexColor("#3C8D6B")
GREEN_SOFT = colors.HexColor("#E6F0EA")
LINE = colors.HexColor("#E6E2D5")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle("FirmityWordmark", fontName="Times-Bold", fontSize=16, textColor=INK, leading=20, spaceAfter=6))
styles.add(ParagraphStyle("Eyebrow", fontName="Courier-Bold", fontSize=9, textColor=ACCENT, spaceAfter=6, leading=12))
styles.add(ParagraphStyle("H1", fontName="Times-Bold", fontSize=24, textColor=INK, leading=28, spaceAfter=6))
styles.add(ParagraphStyle("H2", fontName="Times-Bold", fontSize=15, textColor=INK, leading=19, spaceBefore=14, spaceAfter=8))
styles.add(ParagraphStyle("Body", fontName="Helvetica", fontSize=10, textColor=INK_SOFT, leading=15))
styles.add(ParagraphStyle("ScoreNum", fontName="Times-Bold", fontSize=40, textColor=INK, leading=44))
styles.add(ParagraphStyle("ScoreStatus", fontName="Helvetica-Bold", fontSize=11, textColor=AMBER, spaceAfter=4))
styles.add(ParagraphStyle("SampleNote", fontName="Helvetica-Oblique", fontSize=8.5, textColor=INK_SOFT, leading=12))
styles.add(ParagraphStyle("Footer", fontName="Helvetica", fontSize=8, textColor=INK_SOFT))

SEVERITY_STYLE = {
    "HIGH": (RED, RED_SOFT),
    "MED": (AMBER, AMBER_SOFT),
    "LOW": (GREEN, GREEN_SOFT),
}

DOMAINS = [
    ("Infrastructure", 68),
    ("Fire Safety", 74),
    ("Security", 81),
    ("Maintenance", 65),
    ("Sustainability", 70),
    ("Housekeeping", 88),
]

FINDINGS = [
    ("Terrace waterproofing — active leak at north parapet", "HIGH",
     "Standing water and visible seepage staining on the terrace deck. Left untreated, this "
     "typically migrates into structural slab and ceiling below within 2–3 monsoon cycles."),
    ("2 fire extinguishers past service date (Block B, 3rd floor)", "MED",
     "Units FE-014 and FE-019 are 7 months past their annual service window. Non-compliant "
     "under most local fire-safety audit checklists."),
    ("Housekeeping standards — common areas", "LOW",
     "Lobby and stairwell upkeep meets baseline standard; minor scuffing noted on lift lobby "
     "flooring, cosmetic only."),
]


def score_bar(score: int, width_mm: float = 150) -> Table:
    filled = width_mm * (score / 100)
    data = [[""]]
    t = Table(data, colWidths=[width_mm * mm], rowHeights=[3 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PAPER_DIM),
        ("BOX", (0, 0), (-1, -1), 0, colors.white),
    ]))
    # Overlaid filled portion via a second table is overkill for reportlab;
    # simplest reliable approach is drawing two adjacent cells.
    filled_frac = max(0.0, min(1.0, score / 100))
    row = Table(
        [["", ""]],
        colWidths=[width_mm * mm * filled_frac, width_mm * mm * (1 - filled_frac)],
        rowHeights=[3 * mm],
    )
    row.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), AMBER),
        ("BACKGROUND", (1, 0), (1, 0), PAPER_DIM),
        ("LINEBELOW", (0, 0), (-1, -1), 0, colors.white),
    ]))
    return row


def build():
    doc = SimpleDocTemplate(
        "public/sample-facility-report.pdf",
        pagesize=A4,
        leftMargin=22 * mm,
        rightMargin=22 * mm,
        topMargin=16 * mm,
        bottomMargin=14 * mm,
        title="Firmity — Sample Facility Health Report",
        author="Firmity AI",
    )

    story = []

    story.append(Paragraph("Firmity", styles["FirmityWordmark"]))
    story.append(Paragraph("FACILITY HEALTH REPORT · SAMPLE", styles["Eyebrow"]))
    story.append(Paragraph("Executive Summary", styles["H1"]))
    story.append(Paragraph(
        "Greenfield Housing Society · Pune · Residential Society · Assessed 12 Aug 2026",
        styles["Body"],
    ))
    story.append(Spacer(1, 10))

    story.append(Paragraph('72 <font size="12" color="#585C53">/ 100</font>', styles["ScoreNum"]))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Moderate — Attention Required", styles["ScoreStatus"]))
    story.append(score_bar(72))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "This score reflects a weighted composite across 14 inspected domains. Scores below "
        "40 indicate urgent risk; 40–74 indicates issues that should be scheduled within the "
        "current quarter; 75+ indicates the domain is in good standing.",
        styles["SampleNote"],
    ))

    story.append(Paragraph("Score by Domain", styles["H2"]))
    domain_rows = [["Domain", "Score", ""]]
    for label, value in DOMAINS:
        domain_rows.append([label, str(value), ""])

    dom_table = Table(domain_rows, colWidths=[55 * mm, 18 * mm, 90 * mm])
    dom_style = [
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9.5),
        ("TEXTCOLOR", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 1), (-1, -1), INK_SOFT),
        ("LINEBELOW", (0, 0), (-1, 0), 0.75, LINE),
        ("LINEBELOW", (0, 1), (-1, -1), 0.5, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    dom_table.setStyle(TableStyle(dom_style))
    story.append(dom_table)

    story.append(Paragraph("Findings", styles["H2"]))
    for title, severity, body in FINDINGS:
        color, soft = SEVERITY_STYLE[severity]
        badge = Table([[severity]], colWidths=[16 * mm], rowHeights=[6 * mm])
        badge.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), soft),
            ("TEXTCOLOR", (0, 0), (-1, -1), color),
            ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 8),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]))
        finding_table = Table(
            [[Paragraph(f"<b>{title}</b>", ParagraphStyle("f", parent=styles["Body"], textColor=INK, fontName="Helvetica-Bold", fontSize=10.5)), badge]],
            colWidths=[143 * mm, 20 * mm],
        )
        finding_table.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ]))
        story.append(finding_table)
        story.append(Paragraph(body, styles["Body"]))
        story.append(HRFlowable(width="100%", thickness=0.5, color=LINE, spaceBefore=8, spaceAfter=8))

    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "This is a sample report generated for demonstration purposes only. Findings, "
        "photographs, and priority actions in your actual report are specific to your "
        "on-site survey and are shared exclusively with your authorised contact.",
        styles["SampleNote"],
    ))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=0.5, color=LINE))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Firmity — © 2026 UFIRM Technologies (P) Limited — Proudly Made in India",
        styles["Footer"],
    ))

    doc.build(story)
    print("wrote public/sample-facility-report.pdf")


if __name__ == "__main__":
    build()
