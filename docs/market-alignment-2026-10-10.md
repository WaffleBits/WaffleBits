# Market alignment and streaming-usage evidence - 2026-10-10

## Current official role sample

Checked against company-hosted Ashby and Greenhouse feeds on 2026-10-10. The listings below appeared in their current active feeds. Compensation is copied as published; equity is not converted into cash total compensation. For Anthropic, the Greenhouse feed exposed an update date but not an original publication date.

| Role | Canonical listing | Published / updated | Compensation as listed | Location / work mode | Recurring requirements relevant here |
|---|---|---|---|---|---|
| OpenAI, Software Engineer, Inference - Performance Optimization | https://jobs.ashbyhq.com/openai/85fceac9-fb8a-4d71-a524-a8e5f1e9b01b | Published 2026-04-25 02:24:38 UTC | `$266K – $500K • Offers Equity` | San Francisco; Ashby feed does not expose a workplace type for this posting | Cross-layer inference profiling and benchmarking; bottleneck, latency, throughput, capacity, utilization, and cost analysis; performance models that turn microbenchmarks into cost-to-serve estimates. |
| Anthropic, Performance Engineer, Inference Systems | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | Updated 2026-08-21 12:50:15 -04:00; original publication date not exposed | `Annual Salary: $350,000 — $850,000 USD` | San Francisco, New York City, or Seattle; listing gives these locations and does not expose a job-specific remote classification | Cross-layer throughput, latency, reliability, and correctness analysis; output-correctness evaluation across hardware and numerics; observability, modeling, and regression detection. |
| Cohere, Senior Software Engineer, GPU Infrastructure (HPC) | https://jobs.ashbyhq.com/cohere/ef9b939d-da66-464c-a878-ef45616c0473 | Published 2026-09-03 21:28:21 UTC | Canada: `Base Salary CA$285K – CA$340K • Offers Equity`; USA California/New York/Washington: `Base Salary $235K – $285K • Offers Equity`; other US states: `Base Salary $200K – $240K • Offers Equity` | Canada; Ashby lists Hybrid, FullTime, and a secondary United States location | Kubernetes-based GPU/TPU clusters across clouds; HPC, RDMA/NCCL, performance and reliability troubleshooting, observability, automation, infrastructure-as-code, researcher self-service, and an explicitly stated 24x7 on-call rotation. |

The repeated signal is trustworthy end-to-end measurement: performance and output correctness must be measured together, and incomplete or malformed telemetry must not be presented as a valid token-rate result.

## Live public evidence inventory

The authenticated GitHub account `WaffleBits` was inspected through the GitHub API. It currently exposes 21 public repositories. The profile repository is the public TypeScript/Astro site at https://github.com/WaffleBits/WaffleBits; its root README describes platform security and AI infrastructure engineering. The six pinned public repositories include the profile, `triton-inference-benchmark`, `secure-gpu-inference-gateway`, `deterministic-inference-scheduler`, and `triton-kernel-lab`.

The strongest directly relevant artifacts are:

- `triton-inference-benchmark`: authenticated serving benchmark with OpenAI-compatible SSE, streaming TTFT/inter-chunk timing, privacy-safe output, restart fixtures, regression gates, and content-addressed qualification evidence. Before the selected change, the live `main` commit was `ec7707e`; CI run 36414084754 passed.
- `deterministic-inference-scheduler`: Rust continuous batching and paged KV-cache scheduling model with deterministic replay and release gates.
- `triton-kernel-lab`: Triton kernels with correctness oracles and measured RTX 5070 Ti timing artifacts.
- `secure-gpu-inference-gateway`: Python model-access control, budgets, audit/telemetry, and explicitly synthetic capacity/resilience evidence.

The profile's existing README and Astro proof ledger describe streaming measurements, but do not directly expose the exact fixture that enforces completion-token usage semantics. The benchmark already treats stream chunks as chunks, not tokens, but its parser accepted Python booleans and negative integers as token counts, and did not label malformed usage separately from absent usage.

### Evidence map

**Already demonstrated:**

- The benchmark measures TTFT, inter-chunk gaps, output bytes, and server-reported completion tokens as distinct quantities.
- Its saved artifacts and deterministic SSE fixtures avoid storing prompts, responses, credentials, endpoints, and trace IDs.
- Existing tests require complete valid server usage before publishing server-reported output-token throughput; the cost model has a separately labelled configured-estimate fallback.

**Present but incomplete:**

- `OpenAICompatibleStreamingClient` used `isinstance(value, int)`, which accepts booleans; negative values were also accepted. This could let malformed provider usage contaminate token aggregates and downstream rates.
- Invalid usage and missing usage were not distinct report fields, reducing the ability to audit coverage.
- The profile's public proof index did not link directly to a command-level test of this behavior.

**Missing and not claimed:**

- Production model-fleet operation, real customer traffic, GPU-cluster ownership, multi-cloud supercluster operations, and production tokenization ground truth.
- This deterministic local fixture does not establish production throughput, latency, correctness, or scale.

## Exactly one selected gap

**Make server-reported completion-token coverage strict, fail-closed, and directly inspectable in the existing inference benchmark.** Accept only exact non-negative integers; count malformed usage separately from absent usage; suppress server-reported output-token throughput unless valid usage covers every successful stream; never infer token counts from text chunks or bytes.

The existing `triton-inference-benchmark` is the right home because it already parses OpenAI-compatible SSE, reports stream telemetry, and owns the deterministic CLI fixtures. This connects the roles' measurement/correctness signal to a real tested parser behavior without adding a duplicate repository or claiming production performance.

## Implementation and acceptance plan

1. Review and exercise the existing public streaming-usage PR, including the full unit suite, deterministic CLI fixture, dependency audit, compile checks, and privacy assertions.
2. Require its pull-request CI and post-merge main CI to pass before surfacing the behavior on the profile.
3. Add one profile proof row linking to the public CLI fixture. Extend the benchmark project evidence, root README, evidence-schema validator, rendered-page validator, and Pages workflow assertions. Do not change the resume or add scale claims.
4. In an ephemeral `node:24-bookworm` copy, run `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, `npm run test:evidence`, `npm run test:rendered`, inspect the built page and manifest, and exercise the preview endpoint.
5. Check `git diff --check`, review the exact file/commit scope, push without force, open a PR, require the Pages build, merge only after the checks pass, then read back the merged source, live page, manifest, and deployment status.

## Implementation and publication results

_To be completed after the source CI, local profile checks, and publication read-backs._

## Remaining gap

The public evidence remains a single-host synthetic protocol fixture. It does not demonstrate physical multi-host operation, production customer traffic, GPU fleet ownership, production SLOs, or production inference/token-throughput measurements.
