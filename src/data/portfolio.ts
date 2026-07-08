/* =============================================================
   WaffleBits // content model  (single source of truth)
   Real, public-safe portfolio content. No invented claims.
   ============================================================= */

export const identity = {
  handle: "wafflebits",
  host: "sentinel",
  name: "WaffleBits",
  clearance: "TS/SCI",
  location: "VA",
  open: "New York, NY / Washington, D.C.",
  role: "Platform Security & AI Infrastructure Engineer",
  tagline: "I build the secure control layer around AI infrastructure.",
  summary:
    "Cleared cyber operations specialist engineering the platform-security and observability layer for model serving: secure access, policy enforcement, inference reliability, token-path telemetry, audit trails, and replay evidence. I turn operational pressure into tested systems that verify, observe, and catch the failure path.",
  domains: [
    "secure AI infrastructure",
    "platform security",
    "observability",
    "inference reliability",
    "auditability",
    "mission software",
  ],
  links: {
    github: "https://github.com/WaffleBits",
    linkedin: "https://www.linkedin.com/in/wafflebits/",
  },
};

export type Stage = {
  id: string;
  seq: string;
  name: string;
  meta: string;
  body: string;
};

export const requestPath: Stage[] = [
  { id: "ingress", seq: "01", name: "INGRESS / AUTH", meta: "identity :: rbac",
    body: "Authenticated service boundary. Callers present identity; RBAC decides which models and scopes they may touch before a single token is generated." },
  { id: "policy", seq: "02", name: "POLICY", meta: "reason :: budgets",
    body: "Reason-for-access checks, request and token-budget limits, and distributed-limiter readiness. Denied and rate-limited paths are first-class, not afterthoughts." },
  { id: "routing", seq: "03", name: "ROUTING", meta: "scheduler :: batching",
    body: "Scheduler and continuous-batching decisions with stable priority ordering. Provenance is recorded so a request can be traced back to the route that served it." },
  { id: "runtime", seq: "04", name: "RUNTIME", meta: "paged-kv :: decode",
    body: "Paged KV-cache admission and deterministic decode. Prefill/decode utilization and KV-page occupancy are measured, not assumed." },
  { id: "observe", seq: "05", name: "OBSERVABILITY", meta: "metrics :: traces",
    body: "Prometheus metrics, OTLP trace export, TTFT and decode-token p95 checks. If it is not measured, it is not shipped." },
  { id: "audit", seq: "06", name: "AUDIT", meta: "trace :: fingerprint",
    body: "Sanitized trace log with token-trace fingerprints. Every served request leaves a reviewable record." },
  { id: "gate", seq: "07", name: "PROMOTION GATE", meta: "promote/hold/rollback",
    body: "Batch-invariance, latency-regression, and replay gates decide promote / hold / rollback. This is where a bad path gets caught." },
];

export const fault = {
  stage: "gate",
  title: "FAULT CAUGHT :: ROLLBACK",
  body: "Batch-invariance gate flagged a non-deterministic output at the promotion boundary. The candidate is held and rolled back automatically; the audit log records the reason. The sentinel caught the failure path before it reached production.",
};

export type CaseFile = {
  id: string;
  roles: string;
  title: string;
  tags: string[];
  problem: string;
  system: string;
  evidence: string;
  impact: string;
  url: string;
};

export const caseFiles: CaseFile[] = [
  {
    id: "CF-01", roles: "security ai", title: "Secure GPU Inference Gateway",
    tags: ["Platform Security", "AI Infra", "Policy"],
    problem: "Model-serving paths are high-value and under-governed: who may call which model, at what budget, with what audit trail?",
    system: "Authenticated gateway enforcing RBAC and reason-for-access policy, request and token-budget limits, and a distributed-limiter readiness path for Redis/Envoy migration.",
    evidence: "Sanitized trace JSONL, OTLP collector-ready payloads, deployment-readiness gates (shadow / canary / staged / rollback), Grafana provisioning, SLO notes, and incident runbooks.",
    impact: "A defensible, observable model-access boundary with a roadmap to policy-as-code, redaction, and external authorization engines.",
    url: "https://github.com/WaffleBits/secure-gpu-inference-gateway",
  },
  {
    id: "CF-02", roles: "ai", title: "Rust Inference Runtime",
    tags: ["Rust", "Scheduling", "Determinism"],
    problem: "Serving reliability breaks silently: non-deterministic batching and cache admission make regressions hard to catch before promotion.",
    system: "Continuous batching with stable priority ordering, paged KV-cache admission, round-robin decode progress, and vLLM/SGLang-style mirror normalization.",
    evidence: "Deterministic replay fingerprints, workload-pressure summaries, replay capacity envelopes, prefill/decode utilization, KV-page occupancy, TTFT and decode-token p95 checks, and structured hold/rollback triage.",
    impact: "Promote / hold / rollback decisions backed by reproducible evidence. A runtime that catches the bad path before it ships.",
    url: "https://github.com/WaffleBits/rust-inference-runtime",
  },
  {
    id: "CF-03", roles: "ai", title: "Triton Kernel Lab",
    tags: ["GPU", "Triton", "Perf"],
    problem: "Kernel-level performance claims are worthless without correctness oracles and controlled measurement.",
    system: "Fused RMSNorm and autotuned SwiGLU Triton kernels validated against FP32 oracles, with explicit cache control and CUDA-event timing.",
    evidence: "Raw p50/p95/p99 latency distributions, torch.compile baselines, machine-readable reports, and a cache-cold GPU regression gate.",
    impact: "Trustworthy kernel performance evidence: measured, correctness-gated, and regression-protected.",
    url: "https://github.com/WaffleBits/triton-kernel-lab",
  },
  {
    id: "CF-04", roles: "ai", title: "Triton Inference Benchmark",
    tags: ["Load", "Cost", "Reliability"],
    problem: "Serving decisions need repeatable numbers: latency, throughput, failure accounting, and cost-to-serve, not vibes.",
    system: "Repeatable load-generation harness with concurrency controls, retry/failure accounting, and Kubernetes job posture.",
    evidence: "p50/p95/p99 latency, throughput, Prometheus export, baseline regression gates, exact-output batch-invariance checks, token & GPU-hour capacity, and normalized cost-to-serve estimates.",
    impact: "A capacity- and cost-aware benchmark that turns serving tradeoffs into defensible numbers.",
    url: "https://github.com/WaffleBits/triton-inference-benchmark",
  },
  {
    id: "CF-05", roles: "mission", title: "Readiness Control Tower",
    tags: ["Mission", "FastAPI", "Decision"],
    problem: "Operators drown in raw sortie, maintenance, supply, and outage data with no path to root cause under pressure.",
    system: "Synthetic mission-readiness platform (FastAPI + React) with root-cause scoring, what-if analysis, and command-facing workflows.",
    evidence: "Operational recommendations, Dockerized deployment, and test coverage over synthetic data.",
    impact: "Ambiguous operational data becomes a decision surface that helps users act under uncertainty.",
    url: "https://github.com/WaffleBits/readiness-control-tower",
  },
  {
    id: "CF-06", roles: "ai", title: "HeteroCore Compiler",
    tags: ["Co-Design", "ONNX", "FPGA"],
    problem: "Analog/digital accelerator tradeoffs are opaque: projections, simulations, and measurements get conflated.",
    system: "ONNX compiler and analytical cost model for mixed analog-digital inference, linked to analog simulation, memory-hierarchy analysis, synthesizable RTL, and FPGA schedule execution.",
    evidence: "A versioned plan that clearly separates projections, simulations, synthesis outputs, and future board measurements.",
    impact: "Honest hardware/software co-design analysis with explicit simulation-versus-measurement boundaries.",
    url: "https://github.com/WaffleBits/heterocore-compiler",
  },
  {
    id: "CF-07", roles: "mission ai", title: "Market Microstructure Engine",
    tags: ["C++20", "Determinism", "Latency"],
    problem: "Matching logic is unforgiving: a single ordering bug corrupts every downstream fill.",
    system: "Python and C++20 matching engines covering price-time priority, partial fills, market orders, and cancellations.",
    evidence: "Deterministic cross-language parity checks, integer tick accounting, native tests, and p50/p95/p99 latency distributions.",
    impact: "A benchmarkable, provably-consistent deterministic core with a Python oracle guarding the C++ implementation.",
    url: "https://github.com/WaffleBits/market-microstructure-engine",
  },
];

export type EvidenceGroup = { code: string; title: string; items: string[] };

export const evidence: EvidenceGroup[] = [
  { code: "BNCH", title: "Benchmarks", items: [
    "p50 / p95 / p99 latency distributions",
    "throughput & token / GPU-hour capacity",
    "normalized cost-to-serve estimates",
    "cache-cold GPU regression artifacts",
  ]},
  { code: "RPLY", title: "Replay Fixtures", items: [
    "deterministic replay fingerprints",
    "workload-pressure replay summaries",
    "replay capacity envelopes",
    "0.888889 decode-capacity / 0.595062 KV occupancy fixture",
  ]},
  { code: "TRCE", title: "Traces", items: [
    "sanitized trace JSONL evidence",
    "OTLP collector-ready payloads",
    "streaming-token event validation",
    "route / scheduler provenance coverage",
  ]},
  { code: "DASH", title: "Dashboards", items: [
    "Grafana dashboard provisioning",
    "Prometheus-compatible metrics",
    "SLO notes & burn tracking",
    "correlated Triton / DCGM telemetry",
  ]},
  { code: "GATE", title: "Promotion Gates", items: [
    "batch-invariance CI gates",
    "latency regression gates",
    "canary / shadow / staged rollout",
    "structured hold / rollback triage",
  ]},
  { code: "AUDT", title: "Runbooks & Audit", items: [
    "incident runbooks",
    "audit trails & RBAC records",
    "reason-for-access policy checks",
    "deployment-readiness reviews",
  ]},
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
    unit: "ACC Communications Support Squadron :: Joint Base Langley-Eustis, VA",
    role: "Cyber Defense Operations Specialist / Mission Assurance Technician",
    lines: [
      "24/7 cyber command-and-control and tier-1 support to 26 wings across 13 CONUS bases (27K users) on an 11-member team.",
      "Engineered a tracking tool fusing 216K data points into 4 live dashboards over a $1.3B environment, cutting threat resolution from 5 days to 2.",
      "Led 11 Airmen across 18 AFCYBER tasking orders, hardening 5 sites and 30K assets for 1.3K units across 262 locations.",
      "Deployed SolarWinds Observability across ACC bases; restored data paths and strengthened enterprise situational awareness.",
      "Expedited 5 urgent change requests from 21 days to 5 for a combat-readiness exercise supporting 10K warfighters.",
      "Authored a behavioral analytic for cyber risk; trained 14 squadrons; contributed to remediation of 486 exploits.",
    ],
  },
  {
    span: "ONGOING", org: "Independent Technical Projects", unit: "Remote",
    role: "Developer / Systems Builder",
    lines: [
      "AI infrastructure and mission software across Rust, Python, FastAPI, React, Docker, and Kubernetes-shaped deployments, with metrics, tests, policy controls, and runbooks.",
      "Hardware/software co-design prototypes: ONNX partitioning, analytical cost models, analog non-ideality simulation, self-checking RTL, and FPGA schedule execution.",
      "Deterministic market systems: order-book mechanics, a dependency-free C++20 core, Python-oracle parity checks, and p50/p95/p99 latency measurement.",
      "Administer Linux-hosted game infrastructure for a 600+ member community: SSH ops, observability, permissions, and profiling.",
    ],
  },
];

export type CapabilityGroup = { code: string; title: string; items: string };

export const capability: CapabilityGroup[] = [
  { code: "AI", title: "AI Infrastructure", items: "inference benchmarking / model-serving gateways / latency percentiles / throughput / token & GPU-hour capacity / cost-to-serve / Triton GPU kernels / autotuning / CUDA events / vLLM/SGLang adapters / workload-readiness replay / prefill-decode utilization / KV-page occupancy" },
  { code: "SEC", title: "Platform / Security", items: "authenticated service boundaries / RBAC / policy enforcement / request & token-budget limits / audit trails / threat modeling / secure CI-CD direction / OIDC-mTLS-external-policy roadmap / sanitized trace evidence" },
  { code: "OBS", title: "Observability / Reliability", items: "Prometheus / OpenTelemetry / OTLP collector export / Grafana provisioning / SLOs / release gates / deterministic fixtures / distributed-limiter readiness / deployment-readiness gates / incident runbooks / resilience testing direction" },
  { code: "SYS", title: "Systems / Low-Level", items: "Rust scheduling / continuous batching / paged KV admission / ONNX / SystemVerilog / FPGA flows / analytical accelerator models / C++20 / cross-language oracle testing / Linux performance counters / cache-aware benchmarking" },
  { code: "OPS", title: "Cyber / Security Ops", items: "SolarWinds Observability / ServiceNow / Remedy / eMASS / ACAS / Tanium / vulnerability management / incident response / compliance tracking / POA&M-MTO workflows" },
  { code: "LNG", title: "Languages & Tooling", items: "Rust / Python / TypeScript / Java / C++20 / SQL / Bash / FastAPI / React / Docker / Kubernetes / Git / Linux" },
];

export const awards = [
  "HQ ACC/A6 Airman of the Year, 2025",
  "HQ ACC/A6 Team of the Year, 2025",
  "HQ ACC/A6 Warfighter Communication Award, 2025",
  "HQ ACC/A6 Airman of the 3rd Quarter, 2024",
  "4x Squadron Team of the Quarter :: A6 1-star coin",
];

export const certifications = [
  "CompTIA Security+ :: CompTIA A+",
  "AWS Technical Essentials",
  "Generative AI Essentials on AWS",
  "Introduction to Generative AI on AWS",
  "Introduction to Cloud Financial Management",
];

export const education = [
  "Western Governors University :: B.S. Cybersecurity & Information Assurance (in progress)",
  "Northern Virginia Community College :: Computer Science coursework (60+ credits)",
];

export type Impact = { id: string; metric: string; value: string; source: string };
export const impact: Impact[] = [
  { id: "01", metric: "enterprise_terrain", value: "$1.3B", source: "live cyber dashboard engineering" },
  { id: "02", metric: "threat_resolution_cycle", value: "5d -> 2d", source: "dashboard workflow improvement" },
  { id: "03", metric: "urgent_change_execution", value: "21d -> 5d", source: "combat-readiness support" },
  { id: "04", metric: "assets_hardened", value: "30K", source: "18 tasking orders" },
];

export const volunteer = [
  "Booster Club concessions committee :: 80 hours",
  "Food bank volunteer :: packaged 11K lbs",
  "AFCEA event support :: base appearance team",
];

export const bootLog = [
  { lbl: "auth boundary", val: "rbac ok" },
  { lbl: "policy engine", val: "loaded" },
  { lbl: "runtime :: kv admission", val: "nominal" },
  { lbl: "observability :: otlp", val: "streaming" },
  { lbl: "audit trail", val: "sealed" },
  { lbl: "promotion gate", val: "armed" },
];
