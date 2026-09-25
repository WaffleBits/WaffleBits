# Market alignment and evidence update — 2026-09-25

## Official role sample

The following public Ashby job listings were fetched directly on 2026-09-25. The
published dates and compensation are copied from the listing's structured job
posting or compensation fields. Compensation is the stated range, not a total
compensation estimate. No closing dates were exposed.

| Role | Canonical listing | Published | Compensation as listed | Location / work mode | Repeated requirements relevant here |
|---|---|---:|---|---|---|
| Baseten, Software Engineer - Baseten Inference Stack | https://jobs.ashbyhq.com/baseten/c8701794-bdc1-4932-bffa-a444ce57ed73 | 2026-06-02 | `$180K – $360K • Offers Equity` | San Francisco; Hybrid; secondary locations Toronto, New York, Montreal, Seattle | Distributed LLM inference, Kubernetes orchestration, routing, autoscaling, scheduling, observability, reliability, benchmarking, release automation, GPU workloads |
| OpenAI, Software Engineer, GPT Infrastructure | https://jobs.ashbyhq.com/openai/f3ddd41c-541f-485e-90d6-86c26e018e9f | 2026-04-27 | `$293K – $385K • Offers Equity` | San Francisco; Hybrid; Seattle secondary location | Long-running qualification workflows, scheduling, retries, checkpointing, budgets, secure execution, correctness/performance evaluation, provenance, regression testing, observability |
| OpenAI, Software Engineer, Model Runtime | https://jobs.ashbyhq.com/openai/ec317080-e2d2-4a73-93e6-e0a9ae6fdf96 | 2026-08-24 | `$266K – $445K • Offers Equity` | San Francisco; Hybrid | Scheduling, continuous batching, memory and KV-cache management, distributed execution, latency/throughput/utilization, profiling, observability, correctness, reliability, graceful behavior |
| Perplexity, Member of Technical Staff (AI Inference Engineer) | https://jobs.ashbyhq.com/perplexity/8a976851-9bef-4b07-8d36-567fa9540aef | 2026-04-13 | `$220K – $485K • Offers Equity` | San Francisco; secondary locations Palo Alto and New York City; work mode not exposed | Rust/Python/CUDA serving, GPU programming, request scheduling, KV-cache management, profiling, distributed systems under load, dashboards/alerts, automated remediation, Kubernetes/GPU scheduling |

The repeated market signal is not a generic list of keywords: these roles ask for
systems that connect runtime behavior to inspectable correctness, performance,
reliability, operational, and security evidence.

## Public evidence inventory

The live `WaffleBits` account was read through the GitHub API on 2026-09-25:

- `WaffleBits` has 21 public repositories. The profile repository is a TypeScript
  Astro site described as `Portfolio: platform security and AI infrastructure
  engineering`.
- The strongest relevant public repositories are `triton-inference-benchmark`
  (Python benchmark and recovery fixtures), `secure-gpu-inference-gateway`
  (access control and observability), `deterministic-inference-scheduler`
  (Rust scheduling/replay), `triton-kernel-lab` (Triton correctness/performance),
  `market-microstructure-engine` (C++20/Python parity), and
  `readiness-control-tower` (synthetic operational dashboard).
- The profile's latest public commit before this change is
  [`6016523`](https://github.com/WaffleBits/WaffleBits/commit/601652365ca417fae2c61c4e00c8500a50a82c16),
  which surfaces the lifecycle qualification evidence from
  `triton-inference-benchmark`. Its Pages workflow was green in run
  [35992472058](https://github.com/WaffleBits/WaffleBits/actions/runs/35992472058).
- The benchmark's public lifecycle implementation is in
  [`bdf0318`](https://github.com/WaffleBits/triton-inference-benchmark/commit/bdf03183082f627d904b947f42c004ec3dedc317).
  Its post-merge CI was green in run
  [35991822711](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/35991822711).

### Evidence map

**Already demonstrated:**

- Authenticated inference benchmark coordination with explicit TLS trust,
  wrong-credential and wrong-CA rejection, bounded completed-result recovery,
  coordinator restart reconciliation, and privacy-safe aggregate artifacts.
- Ordered benchmark trend reports with explicit p95-latency, throughput,
  success-rate, and retry-amplification gates.
- Controlled local process-launch-to-loopback-health qualification with a
  shell-free command boundary and redacted JSON/Markdown output.
- Rust continuous batching and paged KV-cache scheduling with replay/release
  evidence; Triton GPU kernel correctness and measured latency; Python/C++20
  matching-engine parity; gateway access-control and observability controls.

**Present but buried:**

- `src/data/portfolio.ts` already contains a typed `proof` ledger linking public
  artifacts for the live demo, measured GPU and matching-engine results,
  replayable scheduler traces, observability, restart reconciliation, lifecycle
  qualification, rate limiting, telemetry correlation, deployment safety, and the
  explicitly labelled energy projection.
- `src/pages/index.astro` does not render that ledger. Visitors must discover
  evidence through project prose or individual links, so the strongest
  qualification and claim-boundary evidence is not available as one auditable
  index.

**Missing and not claimed:**

- Production-scale multi-host operation, real model/GPU cold-start timing,
  partial-workflow continuation, physical-machine separation, and production
  SLOs remain outside the public evidence boundary. This change does not imply
  any of them.

## Exactly one selected gap

**Render the existing public proof ledger as a verification index in the
`WaffleBits` Astro profile.**

This is one presentation-and-navigation change, not a new claim or repository.
It closes the evidence-discoverability gap that matters across the sampled roles:
reviewers can move from a capability statement to the exact public artifact and
see whether the item is interactive, measured, deterministic, operational,
verified, or research. The labels describe the existing evidence type; they do
not turn synthetic or projected work into production measurement.

## Implementation plan

1. Import the existing `proof` data into the page and render one accessible
   `#evidence` section between the selected-work index and experience.
2. Keep each row linked to its current public repository/artifact, show its
   evidence kind, and add a short boundary-aware explanation from the existing
   data. Add one navigation link without changing the existing content claims.
3. Add restrained responsive CSS for the index and extend the Pages workflow's
   rendered-output assertions to prove the section, representative evidence
   labels, and public links survived the production build.
4. Reproduce the repository's checks in a clean `node:24-bookworm` Docker copy
   because the Oracle Linux 7 host Node binary is incompatible: `npm ci`,
   `npm audit --audit-level=high`, `npm run check`, `npm run build`, and rendered
   output validation. Run `git diff --check` on text files and inspect the PDF
   and generated output without changing the resume.
5. Commit on a feature branch, push without force, open a PR, require the Pages
   workflow to pass, merge only after the relevant CI/deployment checks are
   green, and read back the remote commit and live rendered page.

## Implemented and verified

The plan was implemented in the existing `WaffleBits` Astro repository on
branch `feat/render-verification-index-20260925`:

- `src/pages/index.astro` now renders the existing 12-entry `proof` ledger as
  an accessible `#evidence` verification index. It preserves each artifact URL,
  evidence category, and boundary-aware description.
- `src/components/Nav.astro` adds the `Evidence` section link.
- `src/styles/global.css` adds the responsive, rule-based index layout.
- `.github/workflows/pages.yml` checks the rendered section, representative
  artifact links, all 12 proof rows, existing project links, base-path assets,
  and the no-em-dash invariant.
- `docs/market-alignment-2026-09-25.md` records the source research and exact
  scope. The resume source/PDF and underlying project repositories were not
  changed because this gap was discoverability, not missing evidence.

The required clean-host reproduction passed in two `node:24-bookworm` Docker
containers using an ephemeral source copy and owner-writable npm directories:

- `node --version`: `v24.18.0`; `npm --version`: `11.16.0`.
- `npm ci`: passed.
- `npm audit --audit-level=high`: passed at the requested threshold. The output
  reports one existing **moderate** `devalue <5.9.1` advisory
  (`GHSA-9rgm-9g3h-6x36`); no high-severity finding was reported. It remains a
  disclosed dependency follow-up rather than a silent claim of a clean audit.
- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `WB_BASE=/WaffleBits npm run build`: passed; one static page generated.
- Rendered output validation: passed. The production HTML contains the evidence
  section, representative public artifact links, all 12 proof rows, required
  project links, correct `/WaffleBits/` asset paths, and no em dash.
- `git diff --check`: passed for the tracked text changes before commit.

The remaining gap is unchanged: the public work demonstrates controlled and
synthetic evidence, not production-scale multi-host operation, model/GPU
cold-start timing, partial-workflow continuation, or a production SLO.
