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
        "TS/SCI-cleared US Air Force Cyber Defense Operations specialist building secure AI inference systems, "
        "GPU performance tooling, and deterministic low-level software in Python, Rust, and C++20. Operational "
        "experience spans enterprise incident response, vulnerability management, and automation across mission-critical networks.",
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

    Paragraph("TECHNICAL PROJECTS", styles["h2"]), rule,
    Paragraph("Secure AI Inference Gateway (Python)", styles["roleline"]),
    *bullets([
        "Built an authenticated model-serving gateway with role and reason-for-access policy, request/token budgets, structured audit evidence, Prometheus/OpenTelemetry telemetry, and optional Redis-backed atomic rate limits.",
        "Added deployment posture checks, dependency auditing, SPDX SBOM generation, container vulnerability gates, resilience drills, and bounded backend probes with aggregate-only artifacts.",
    ]),
    Paragraph("Inference Runtime &amp; GPU Performance (Rust, Triton, Python)", styles["roleline"]),
    *bullets([
        "Implemented a deterministic continuous-batching and paged KV-cache scheduler in Rust with replay fingerprints and promote/hold/rollback release gates.",
        "Developed correctness-gated Triton RMSNorm, SwiGLU, attention, KV-movement, and INT4 kernels; published raw RTX 5070 Ti measurements up to 2.2x faster than torch.compile for the primary kernel set.",
        "Extended a serving benchmark with phase-separated warmup, workload profiles, regression gates, Triton/DCGM telemetry correlation, and measured OpenAI-compatible streaming TTFT and inter-chunk latency.",
    ]),
    Paragraph("Low-Latency Matching Engine (C++20, Python)", styles["roleline"]),
    *bullets([
        "Built price-time-priority matching engines in C++20 and Python with deterministic parity tests; measured the Python reference at 312K orders/second on a Ryzen 9800X3D.",
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
        "<b>Languages:</b> Python, Rust, C++20, TypeScript, SQL, Bash. <b>AI &amp; Performance:</b> "
        "OpenAI Triton, PyTorch, model-serving benchmarks, latency profiling, continuous batching, KV-cache systems. "
        "<b>Platform:</b> Linux, Docker, Kubernetes, Redis, Prometheus, Grafana, OpenTelemetry, Git. "
        "<b>Security:</b> access control, audit logging, vulnerability management, incident response, threat modeling, ACAS, Tanium, eMASS.",
        styles["body"],
    ),
]

OUT.parent.mkdir(parents=True, exist_ok=True)
doc.build(story)
print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")
