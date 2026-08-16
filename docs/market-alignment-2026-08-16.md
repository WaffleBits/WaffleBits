# Market alignment audit — 2026-08-16

## Scope and source policy

This audit used current primary job-board feeds and live GitHub evidence. Anthropic and Together AI role data came from their official Greenhouse feeds on 2026-08-16. Feed `updated_at` timestamps are recorded because separate publication dates were not exposed. Compensation is copied as published; no equity or total-compensation value is inferred.

The listings include staff-level roles and production-scale responsibilities. They are market-demand evidence, not a claim that this portfolio demonstrates those levels or operating scales.

## Current role evidence

All four listings were active in the companies' official Greenhouse feeds on 2026-08-16.

| Role | Official URL | Feed update date | Published compensation | Location / constraints | Representative requirements |
|---|---|---:|---|---|---|
| AI Infrastructure Systems Engineer | https://job-boards.greenhouse.io/togetherai/jobs/5138540007 | 2026-08-04 | `$190,000 - $270,000 + equity + benefits` | San Francisco; the feed did not expose a remote option | GPU-fleet automation; monitoring, diagnosis, and remediation; performance and reliability; Kubernetes; distributed systems; Python, Go, Rust, or C++ |
| Staff Software Engineer, Environments Infrastructure | https://job-boards.greenhouse.io/anthropic/jobs/5367436008 | 2026-08-03 | `$405,000—$605,000 USD` | San Francisco, CA; New York City, NY; hybrid policy states at least 25% office time | Deep Python; monitored and triageable production systems; silent-failure prevention; stateful distributed systems; shared-state correctness and recovery; targeted testing and deep verification |
| Staff+ Software Engineer, Infrastructure (Distributed Systems) | https://job-boards.greenhouse.io/anthropic/jobs/4970314008 | 2026-08-07 | `$320,000—$485,000 USD` | San Francisco, CA; New York City, NY; Seattle, WA; hybrid policy states at least 25% office time | Distributed systems that train, serve, and secure models; Kubernetes and cloud infrastructure; databases and observability; Python, Rust, Go, or Java; ML infrastructure and accelerator networking as preferred evidence |
| Software Engineer, Infrastructure, Interpretability | https://job-boards.greenhouse.io/anthropic/jobs/5388612008 | 2026-08-13 | `$320,000—$485,000 USD` | San Francisco, CA; hybrid policy states at least 25% office time | Secure and scalable research infrastructure; Python plus Rust, Go, or Java; distributed systems; dependable audit pipelines; Kubernetes; compute scheduling; accelerator fleets; developer tooling and observability |

## Recurring requirements

Across this set:

1. **Reliable distributed infrastructure** appears in all four listings.
2. **Monitoring, observability, diagnosis, or triage** appears in all four.
3. **Failure handling, recovery, or verification** is explicit in three and part of autonomous fleet operation in the fourth.
4. **Python systems work** appears in all four; Rust and Go recur as accepted infrastructure languages.
5. **AI serving, training, research, or GPU-fleet infrastructure** appears in all four.
6. **Inspecting behavior across system layers** recurs through fleet health, state recovery, observability, audit pipelines, and distributed serving infrastructure.

The high-leverage gap was therefore not another standalone framework sample. It was truthful evidence that could reconcile what the benchmark client attempted with what successive serving-path counters recorded.

## Public evidence inventory

GitHub API inventory on 2026-08-16 showed 21 public repositories, of which 17 were active, non-fork repositories. The six pinned repositories were `market-microstructure-engine`, `readiness-control-tower`, `secure-gpu-inference-gateway`, `triton-kernel-lab`, `deterministic-inference-scheduler`, and `heterocore-compiler`.

Strongest relevant repositories:

| Repository | Public evidence | Live activity read from GitHub |
|---|---|---:|
| [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark) | Python load generator; open-loop pacing; streaming and queue timing; retry accounting; GPU/server telemetry; trace, correctness, regression, and serving-path gates; Docker and deterministic HTTP fixtures | [`5ac6e36`](https://github.com/WaffleBits/triton-inference-benchmark/commit/5ac6e3602eacb2b1ec013e356989186496aaf4c4), merged 2026-08-16; [post-merge CI passed](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/31944131114) |
| [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway) | Authenticated policy and budget controls, audit evidence, Redis-backed limits, OpenTelemetry/Prometheus, deployment checks, SBOM, and vulnerability gates | pushed 2026-08-04 |
| [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab) | Triton kernels with correctness gates and raw RTX 5070 Ti measurements | pushed 2026-07-30 |
| [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler) | Rust continuous batching, paged KV-cache accounting, replay fingerprints, and release gates | pushed 2026-07-16 |
| [`market-microstructure-engine`](https://github.com/WaffleBits/market-microstructure-engine) | C++20 and Python price-time matching engines with parity tests and a documented local benchmark boundary | pushed 2026-07-24 |

## Evidence map

### Already demonstrated

- Python serving and platform tooling with tests, CI, Docker, JSON, and Prometheus artifacts.
- Open-loop load scheduling, streaming timing, queue-delay decomposition, retry accounting, trace propagation, telemetry windows, correctness checks, and regression gates.
- Triton kernel correctness checks and explicitly labeled local GPU measurements.
- Deterministic continuous batching and KV-cache scheduling in Rust.
- Security controls, observability, deployment checks, and resilience evidence in the inference gateway.
- C++20 systems work with deterministic cross-language parity tests.

### Present but buried before this change

- The benchmark already scraped Prometheus counters immediately before and after measured load.
- Client-attempt amplification already distinguished harness calls from logical requests and explicitly stated that a client attempt did not prove server receipt.
- The telemetry parser already understood labeled counter series and stable membership fingerprints, but it could not correlate operator-selected ingress, backend, and success counters with measured harness activity.

### Missing before this change

- An inspectable serving-path accounting report linking client attempts to layer counter deltas.
- Fail-closed handling for missing counters, resets, non-integral values, duplicate series, and series-membership churn in that report.
- A privacy boundary that retained aggregate path evidence without serializing raw metric names, labels, or scrape bodies.

## Selected implementation

**One gap:** add opt-in request-path counter accounting to the existing `triton-inference-benchmark`.

The existing benchmark was the correct repository because it already owned the measured request window, retry counts, Prometheus snapshots, artifact serialization, fail gates, and deterministic HTTP fixture. A new repository would duplicate that system and weaken the evidence chain.

Public implementation: [`5ac6e36`](https://github.com/WaffleBits/triton-inference-benchmark/commit/5ac6e3602eacb2b1ec013e356989186496aaf4c4), merged through [PR #15](https://github.com/WaffleBits/triton-inference-benchmark/pull/15).

The implementation:

- adds opt-in ingress, backend, and success metric selectors for either a telemetry URL or paired snapshots;
- computes per-series deltas only when before/after membership is stable;
- rejects missing, duplicate, non-finite, negative, non-integral, reset, or membership-changing evidence;
- evaluates exact invariants from integer counts: ingress equals client attempts, ingress is at least backend, backend is at least success, and success equals successful logical requests;
- exports aggregate JSON and Prometheus summaries plus an opt-in exit gate;
- retains only metric-name hashes, series-membership fingerprints, counts, ratios, and fixed stage labels; raw metric names, series labels, scrape bodies, prompts, outputs, authorization headers, request IDs, and trace IDs are not serialized;
- extends the deterministic streaming fixture with ingress, backend, and success counters and one controlled ingress-only transient failure;
- pins pip 26.2.1 in the container build after the installed-environment audit identified vulnerabilities in the base image's bundled pip 25.0.1.

### Verification boundary

- TDD started with failing imports for the new accounting API; the completed suite passed **96 tests** on the host and in `python:3.13-slim`.
- The real OpenAI-compatible streaming CLI ran against the deterministic local fixture: 4 logical requests produced 5 client attempts, 5 ingress receipts, 4 backend receipts, and 4 successful completions. The exact request-path gate passed.
- Tests cover counter resets, series-membership churn, missing counters, non-finite, negative, non-integral, and duplicate series, plus CLI validation, exit code 7, Prometheus output, and privacy boundaries.
- The Docker image built and completed a non-root packaged-CLI smoke run.
- A full installed-environment `pip-audit --strict` passed after the pip pin; `pip-audit --strict -r requirements.txt` also reported no known vulnerabilities.
- Python syntax compilation and `git diff --check` passed.
- Feature-branch CI passed, then post-merge `main` CI passed all unit and deterministic CLI steps: https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/31944131114

The fixture is local and deterministic. It produces three stage counters from one test server. The implementation accepts metrics from real layers, but this run does not demonstrate a deployed router/backend topology, production traffic, cluster scale, or per-request causal tracing.

## Positioning change

Only after the implementation was public and post-merge CI passed, the profile README, Astro site data, portfolio evidence model, and one-page resume were updated to surface request-path counter reconciliation. The wording states the isolated-counter requirement and does not turn aggregate agreement into per-request causality.

## Highest remaining gap

The highest remaining gap is a reproducible multi-process serving fixture with independently scraped router and backend processes, controlled drops and retries at each boundary, and recovery-time measurements. That would validate the generic counter-accounting path against genuinely separate layer sources. A real GPU endpoint and multi-node environment remain infrastructure-dependent; local fixture results must continue to be labeled synthetic.