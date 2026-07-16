"""Build the one-page resume PDF at public/assets/AdnanBerik-Resume.pdf."""
from pathlib import Path

from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer

OUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "AdnanBerik-Resume.pdf"

INK = "#111111"
DIM = "#444444"

styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=17, leading=20, alignment=TA_CENTER, textColor=INK),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8.5, leading=12, alignment=TA_CENTER, textColor=DIM),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=10.5, leading=13, spaceBefore=8, spaceAfter=2, textColor=INK),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9, leading=12, textColor=INK),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9, leading=12, leftIndent=12, bulletIndent=2, textColor=INK),
    "roleline": ParagraphStyle("roleline", fontName="Helvetica-Bold", fontSize=9.5, leading=12, spaceBefore=2, textColor=INK),
}


def bullets(items):
    return [Paragraph(t, styles["bullet"], bulletText="•") for t in items]


doc = SimpleDocTemplate(
    str(OUT), pagesize=letter,
    leftMargin=0.65 * inch, rightMargin=0.65 * inch, topMargin=0.5 * inch, bottomMargin=0.5 * inch,
    title="Adnan Berik - Resume", author="Adnan Berik",
)

rule = HRFlowable(width="100%", thickness=0.7, color=DIM, spaceBefore=2, spaceAfter=4)

story = [
    Paragraph("ADNAN BERIK", styles["name"]),
    Paragraph("Cyber Defense Operations | Platform Security and AI Infrastructure", styles["contact"]),
    Paragraph(
        "Hampton, VA | Willing to relocate to New York, NY or Washington, D.C.<br/>"
        'Email: adnanberik@hotmail.com | LinkedIn: linkedin.com/in/adnanberik | GitHub: github.com/WaffleBits',
        styles["contact"],
    ),
    Spacer(1, 6),

    Paragraph("SUMMARY", styles["h2"]), rule,
    Paragraph(
        "Active-duty US Air Force Cyber Defense Operations specialist (1D7X1Q, TS/SCI) securing mission-critical "
        "networks and services for combat and training operations. Strong software and data background (Python, "
        "Java, SQL, Linux, automation) and systems-thinking mindset, focused on building reliable systems under "
        "real-world constraints.",
        styles["body"],
    ),

    Paragraph("EXPERIENCE", styles["h2"]), rule,
    Paragraph("United States Air Force | Cyber Defense Operations Specialist (1D7X1Q), ACC, Langley AFB, VA | 2023 - Present", styles["roleline"]),
    *bullets([
        "Coordinate enterprise cyber priorities and core service status across 32 sites, delivering 24/7 support for 5 NAFs and 26 Wings at 15 ACC bases; recognized with quarterly award and commanders coin.",
        "Resolved NORAD NIPR outage by coordinating 4 units to identify a failed $700K relay circuit and implement an enterprise-wide fix, restoring missile sensor warnings for 29M sq mi of US &amp; Canadian airspace.",
        "Designed and implemented a $1.2M virtual enclave to segregate foreign networks at Mountain Home AFB, preserving CUI access without interrupting flight training for 187 coalition pilots.",
        "Configured switches and managed 50+ SIPR assets during RED FLAG 24-3, sustaining 2K members from 39 joint units in 8 classified areas and enabling 1.1K aircraft sorties.",
        "Led 11 Airmen to manage 18 AFCYBER tasking orders, strengthening 5 vulnerable sites and 30K assets and ensuring C4ISR capabilities for 1.3K units at 262 locations.",
    ]),
    Paragraph("Selected Community &amp; Leadership", styles["roleline"]),
    *bullets([
        "Led Booster Club concessions committee, dedicating 80+ hours to fund 3 morale events for 132 personnel.",
        "Volunteered at local food bank, packaging 11K lbs of food; supported AFCEA by escorting distinguished visitors on base.",
    ]),

    Paragraph("TECHNICAL PROJECTS", styles["h2"]), rule,
    Paragraph("Options &amp; Market Data Analytics (Personal)", styles["roleline"]),
    *bullets([
        "Built Python tooling to screen equities and options using technical indicators (MACD, Supertrend, volatility, OI) and macro data; designed backtests to evaluate robustness and risk.",
    ]),
    Paragraph("Minecraft Infrastructure &amp; Scale (Personal)", styles["roleline"]),
    *bullets([
        "Deployed and administered Linux-based Minecraft servers on Docker and Oracle Cloud ARM, serving 29,323+ unique players and 600+ concurrent players; automated backups, monitoring, and performance tuning via scripts and plugins.",
    ]),

    Paragraph("EDUCATION", styles["h2"]), rule,
    *bullets([
        "Western Governors University | B.S. Cybersecurity &amp; Information Assurance (in progress)",
        "Northern Virginia Community College | Computer Science coursework (60+ credits completed)",
    ]),

    Paragraph("CERTIFICATIONS &amp; CLEARANCE", styles["h2"]), rule,
    *bullets(["TS/SCI Security Clearance", "CompTIA Security+"]),

    Paragraph("TECHNICAL SKILLS", styles["h2"]), rule,
    Paragraph(
        "<b>Languages &amp; Data:</b> Python, Java, SQL, Bash. <b>Infrastructure &amp; OS:</b> Linux, Docker, Git, "
        "networking fundamentals. <b>Security &amp; Tools:</b> ACAS, Tanium, ServiceNow, Remedy, eMASS, vulnerability "
        "management, incident response. <b>Concepts:</b> Distributed systems basics, data pipelines, systems thinking "
        "under operational constraints.",
        styles["body"],
    ),
]

OUT.parent.mkdir(parents=True, exist_ok=True)
doc.build(story)
print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")
