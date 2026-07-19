/* =============================================================
   WaffleBits // content model  (single source of truth)
   Real portfolio content. No invented claims.
   Writing rule: every visible line leads with plain language a
   non-specialist understands; deep technical detail lives behind
   the inspect expanders.
   ============================================================= */

export const identity = {
  handle: "wafflebits",
  host: "sentinel",
  name: "Adnan Berik",
  alias: "WaffleBits",
  clearance: "TS/SCI",
  location: "Hampton, VA",
  open: "New York, NY / Washington, D.C.",
  role: "Platform Security & AI Infrastructure Engineer",
  tagline: "I protect and run the systems that serve AI models.",
  summary:
    "By day I do cyber defense for the US Air Force (TS/SCI clearance). On my own time I build the software layer that keeps AI model serving secure, measured, and reliable.",
  plain:
    "When a company runs AI models, someone has to control who can use them, watch speed and cost, catch failures before users see them, and prove afterward what happened. That is the layer I build.",
  links: {
    github: "https://github.com/WaffleBits",
    linkedin: "https://www.linkedin.com/in/adnanberik/",
    email: "adnanberik@hotmail.com",
  },
  domains: [
    "AI infrastructure",
    "platform security",
    "inference serving",
    "GPU performance",
    "distributed systems",
    "observability",
    "cyber defense",
  ],
};

export type Stage = {
  id: string;
  seq: string;
  name: string;
  meta: string;
  body: string;
};

/* Follow one AI request through the control layer. Plain wording;
   the stage names keep the terminal flavor. */
export const requestPath: Stage[] = [
  { id: "ingress", seq: "01", name: "WHO ARE YOU", meta: "identity :: access",
    body: "First gate: prove who you are. The system checks identity and decides which models this caller is allowed to use, before anything runs." },
  { id: "policy", seq: "02", name: "SHOULD THIS RUN", meta: "limits :: reasons",
    body: "Second gate: should this request happen at all? Spending limits, rate limits, and a required reason for access. Denials are recorded, not silently dropped." },
  { id: "routing", seq: "03", name: "PICK A PATH", meta: "batching :: routing",
    body: "The request is grouped with others for efficiency and sent to the right model server. The chosen path is recorded so any answer can be traced back to the machine that produced it." },
  { id: "runtime", seq: "04", name: "DO THE WORK", meta: "memory :: replay",
    body: "The model runs under measured memory and capacity budgets, in a way that can be replayed exactly. If something goes wrong, I can reproduce it instead of guessing." },
  { id: "observe", seq: "05", name: "MEASURE IT", meta: "speed :: cost",
    body: "Speed, cost, and failures are measured live and fed to dashboards. My rule: if it is not measured, it does not ship." },
  { id: "audit", seq: "06", name: "WRITE IT DOWN", meta: "audit trail",
    body: "Every request leaves a reviewable record: who asked, what ran, what it cost. When someone asks 'what happened?', there is an answer." },
  { id: "gate", seq: "07", name: "CATCH BAD SHIPS", meta: "promote / rollback",
    body: "Before a new model version goes live, automated checks compare it against the current one. Versions that fail get blocked and rolled back automatically." },
];

export const fault = {
  stage: "gate",
  title: "FAULT CAUGHT :: ROLLED BACK",
  body: "A bad model version just tried to ship. The gate caught the mismatch, blocked it, rolled back to the good version, and logged the reason. No user ever saw it. This is the moment the whole layer exists for.",
};

export type CaseFile = {
  id: string;
  roles: string;
  title: string;
  tags: string[];
  plain: string;        // one or two sentences anyone can understand
  problem: string;      // technical detail, shown on inspect
  system: string;
  evidence: string;
  impact: string;
  url: string;
  demo?: string;        // live demo link
  chart?: string;       // published measurement/chart link
};

export const caseFiles: CaseFile[] = [
  {
    id: "CF-01", roles: "security ai", title: "Secure GPU Inference Gateway",
    tags: ["Security", "AI Serving", "Python"],
    plain: "A security checkpoint for AI models. It decides who may use which model, enforces spending limits, writes an audit record for every request, and exports live health metrics.",
    problem: "Model-serving paths are high-value and under-governed: who may call which model, at what budget, with what audit trail?",
    system: "Authenticated gateway enforcing role-based access and reason-for-access policy, with request and token budgets (distributed-limiter ready for Redis/Envoy).",
    evidence: "Sanitized trace logs, OTLP trace export, deployment-readiness gates (shadow / canary / staged / rollback), resilience-drill evidence, a bounded aggregate endpoint probe, CI-enforced pinned dependency audit, SPDX image SBOM, high-severity container scanning, executable deployment-posture tests, Grafana dashboards, and incident runbooks.",
    impact: "A defensible, observable model-access boundary with a clear path to policy-as-code and external authorization.",
    url: "https://github.com/WaffleBits/secure-gpu-inference-gateway",
  },
  {
    id: "CF-02", roles: "ai", title: "Deterministic Inference Scheduler",
    tags: ["Rust", "Reliability"],
    plain: "The traffic controller inside an AI server, rebuilt in Rust so every run is exactly repeatable. Repeatable runs mean failures can be reproduced and new versions can be tested safely.",
    problem: "Serving reliability breaks silently: non-deterministic batching and cache admission make regressions hard to catch before promotion.",
    system: "Continuous batching with stable priority ordering, paged KV-cache admission, and round-robin decode progress, mirrored against vLLM/SGLang-style observations.",
    evidence: "Deterministic replay fingerprints, workload-pressure summaries, capacity envelopes, latency checks, and structured hold/rollback triage.",
    impact: "Promote / hold / rollback decisions backed by reproducible evidence instead of vibes.",
    url: "https://github.com/WaffleBits/deterministic-inference-scheduler",
  },
  {
    id: "CF-03", roles: "ai", title: "Triton Kernel Lab",
    tags: ["GPU", "Performance"],
    plain: "Hand-tuned GPU code for two core AI operations, measured honestly against PyTorch's best. Up to 2.2x faster on real hardware, with the charts and raw data published.",
    problem: "Kernel-level performance claims are worthless without correctness oracles and controlled measurement.",
    system: "Fused RMSNorm and autotuned SwiGLU kernels in OpenAI Triton, validated against FP32 reference implementations with explicit cache control.",
    evidence: "Raw p50/p95/p99 latency distributions from an RTX 5070 Ti, torch.compile baselines, machine-readable reports, and a regression gate in CI.",
    impact: "Performance claims a reviewer can check: measured, correctness-gated, and regression-protected.",
    url: "https://github.com/WaffleBits/triton-kernel-lab",
    chart: "https://github.com/WaffleBits/triton-kernel-lab#readme",
  },
  {
    id: "CF-04", roles: "ai", title: "Inference Load Benchmark",
    tags: ["Benchmarking", "Cost"],
    plain: "A stress-testing tool for AI serving: how fast is it, how often does it fail, and what does each request cost. It turns 'it feels fast' into numbers you can defend.",
    problem: "Serving decisions need repeatable numbers: latency, throughput, failure accounting, and cost-to-serve.",
    system: "Repeatable load-generation harness for NVIDIA Triton-style serving with concurrency controls and retry/failure accounting.",
    evidence: "Latency percentiles, throughput, Prometheus export, regression gates, batch-invariance checks, and cost-per-request estimates.",
    impact: "Capacity and cost tradeoffs expressed as defensible numbers.",
    url: "https://github.com/WaffleBits/triton-inference-benchmark",
  },
  {
    id: "CF-05", roles: "mission", title: "Readiness Control Tower",
    tags: ["Mission", "Live Demo"],
    plain: "A dashboard that tells a military commander why readiness is dropping and what to fix first, built on synthetic data. Click the live demo and try the what-if controls yourself.",
    problem: "Operators drown in raw sortie, maintenance, supply, and outage data with no path to root cause under pressure.",
    system: "FastAPI + React platform with root-cause scoring, what-if analysis, and command-facing workflows over synthetic operational data.",
    evidence: "Prioritized recommendations, Dockerized deployment, test coverage, and a static live demo on GitHub Pages.",
    impact: "Ambiguous operational data becomes a decision surface that helps people act under uncertainty.",
    url: "https://github.com/WaffleBits/readiness-control-tower",
    demo: "https://wafflebits.github.io/readiness-control-tower/",
  },
  {
    id: "CF-06", roles: "ai", title: "HeteroCore Compiler",
    tags: ["Hardware", "Research"],
    plain: "Research asking: what if part of an AI chip were analog instead of digital? The cost model projects up to 68% energy savings, clearly labeled as projections, with the full math published.",
    problem: "Analog/digital accelerator tradeoffs are opaque: projections, simulations, and measurements get conflated.",
    system: "ONNX compiler and analytical cost model for mixed analog-digital inference, linked to analog simulation, memory-hierarchy analysis, RTL, and an FPGA prototype.",
    evidence: "A versioned plan that separates projections, simulations, synthesis outputs, and future board measurements.",
    impact: "Honest hardware/software co-design analysis with explicit simulation-versus-measurement boundaries.",
    url: "https://github.com/WaffleBits/heterocore-compiler",
  },
  {
    id: "CF-07", roles: "mission ai", title: "Market Microstructure Engine",
    tags: ["C++", "Low Latency"],
    plain: "A stock-exchange matching engine built for speed and correctness: 300,000+ orders per second measured, with a Python model double-checking every answer the C++ core gives.",
    problem: "Matching logic is unforgiving: a single ordering bug corrupts every downstream fill.",
    system: "Python and C++20 matching engines covering price-time priority, partial fills, market orders, and cancellations.",
    evidence: "Measured benchmark committed to the repo (312K orders/s, p50 1.7 microseconds on a Ryzen 9800X3D), cross-language parity checks, and native tests.",
    impact: "A benchmarkable, provably-consistent deterministic core with an independent oracle guarding it.",
    url: "https://github.com/WaffleBits/market-microstructure-engine",
  },
];

/* Proof: real, clickable artifacts. Plain labels; each row links out. */
export type Proof = { label: string; plain: string; href: string; kind: string };

export const proof: Proof[] = [
  { label: "live demo", kind: "interactive",
    plain: "The mission readiness dashboard, running in your browser right now.",
    href: "https://wafflebits.github.io/readiness-control-tower/" },
  { label: "GPU benchmark chart", kind: "measured",
    plain: "Real RTX 5070 Ti results: my kernels vs PyTorch, chart and raw data in the repo.",
    href: "https://github.com/WaffleBits/triton-kernel-lab#readme" },
  { label: "matching-engine benchmark", kind: "measured",
    plain: "312,000 orders per second, measured and committed with the machine specs.",
    href: "https://github.com/WaffleBits/market-microstructure-engine#readme" },
  { label: "replayable test runs", kind: "deterministic",
    plain: "Scheduler traces that replay exactly, so any failure can be reproduced.",
    href: "https://github.com/WaffleBits/deterministic-inference-scheduler" },
  { label: "observability configs", kind: "operational",
    plain: "Grafana dashboards, Prometheus metrics, and incident runbooks in the gateway repo.",
    href: "https://github.com/WaffleBits/secure-gpu-inference-gateway" },
  { label: "backend probe", kind: "measured",
    plain: "A bounded local endpoint sample with response validation, aggregate latency, and success evidence.",
    href: "https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/main/artifacts/backend-probe-evidence.json" },
  { label: "deployment safety", kind: "verified",
    plain: "CI checks dependency risk, publishes an SPDX image SBOM, scans the container, and tests restricted runtime posture.",
    href: "https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/main/.github/workflows/supply-chain.yml" },
  { label: "energy projection model", kind: "research",
    plain: "The analog-chip cost model and its projected 68% energy savings, math included.",
    href: "https://github.com/WaffleBits/heterocore-compiler" },
];

export type ServiceEntry = {
  span: string;
  org: string;
  unit: string;
  role: string;
  lines: string[];
};

export const serviceRecord: ServiceEntry[] = [
  {
    span: "2023 / PRESENT", org: "United States Air Force",
    unit: "ACC :: Langley AFB, VA",
    role: "Cyber Defense Operations Specialist (TS/SCI)",
    lines: [
      "Help run 24/7 cyber defense for 26 wings across 15 bases, roughly 27,000 users.",
      "Built a tracking tool that fused 216,000 data points into 4 live dashboards, cutting threat resolution from 5 days to 2.",
      "Helped resolve a NORAD network outage: found a failed $700K circuit and coordinated the enterprise-wide fix.",
      "Led 11 Airmen through 18 cyber tasking orders, hardening 30,000 systems.",
      "Named HQ ACC/A6 Airman of the Year, 2025.",
    ],
  },
  {
    span: "ONGOING", org: "Independent Engineering",
    unit: "Remote",
    role: "Builder of the projects on this page",
    lines: [
      "AI serving infrastructure: the gateway, scheduler, kernels, and benchmarks above, all public on GitHub.",
      "Hardware/software co-design research: the HeteroCore compiler family.",
      "Ran Linux game-server infrastructure for a 29,000-player community: monitoring, backups, performance tuning.",
    ],
  },
];

export type CapabilityGroup = { code: string; title: string; plain: string; items: string };

export const capability: CapabilityGroup[] = [
  { code: "AI", title: "Run and measure AI serving",
    plain: "Stand up model serving, then prove how fast, reliable, and expensive it is.",
    items: "latency percentiles / throughput / cost per request / GPU kernels / benchmarking" },
  { code: "SEC", title: "Lock systems down",
    plain: "Control who gets access, cap what they can spend, and keep records that hold up.",
    items: "access control / token budgets / audit trails / threat modeling / incident response" },
  { code: "OBS", title: "Make systems observable",
    plain: "If something breaks at 3am, the dashboards already know what and why.",
    items: "Prometheus / Grafana / OpenTelemetry / release gates / runbooks" },
  { code: "SYS", title: "Build low-level systems",
    plain: "Write the fast, correct core in Rust or C++ and prove it behaves with tests and replays.",
    items: "Rust / C++20 / deterministic replay / cross-language testing" },
  { code: "OPS", title: "Operate under pressure",
    plain: "My day job: enterprise cyber defense for the Air Force, with a TS/SCI clearance.",
    items: "vulnerability management / compliance / enterprise tooling" },
  { code: "LNG", title: "Daily tools",
    plain: "The stack I actually work in.",
    items: "Python / Rust / TypeScript / C++ / SQL / Linux / Docker / Kubernetes / Git" },
];

export const awards = [
  "HQ ACC/A6 Airman of the Year, 2025",
  "HQ ACC/A6 Team of the Year, 2025",
  "HQ ACC/A6 Warfighter Communication Award, 2025",
  "4x Squadron Team of the Quarter",
];

export const certifications = [
  "TS/SCI Security Clearance",
  "CompTIA Security+ :: CompTIA A+",
  "AWS Technical Essentials",
];

export const education = [
  "Western Governors University :: B.S. Cybersecurity & Information Assurance (in progress)",
  "Northern Virginia Community College :: Computer Science coursework (60+ credits)",
];
