# Market alignment :: 2026-08-03

Primary listings were read from the companies' official Greenhouse feeds on
2026-08-03 at 11:04 UTC. Each listing below was active in its feed at review
time. Compensation and timestamps are copied from the feed rather than inferred.

## Current role evidence

| Company | Role | Published / updated | Published compensation | Location / work model | Relevant requirements |
|---|---|---|---|---|---|
| Anthropic | [Performance Engineer, Inference Systems](https://job-boards.greenhouse.io/anthropic/jobs/5224564008) | Published 2026-05-20; updated 2026-07-14 | Annual Salary: `$350,000—$850,000 USD` | San Francisco, New York City, or Seattle; hybrid, at least 25% in office | Cross-layer inference investigation; throughput, latency, reliability, correctness, cost, telemetry, dashboards, Python, and trusted release criteria |
| Anthropic | [Performance Engineer, GPU](https://job-boards.greenhouse.io/anthropic/jobs/4926227008) | Published 2025-09-22; updated 2026-07-14 | Annual Salary: `$280,000—$850,000 USD` | San Francisco, New York City, or Seattle; hybrid, at least 25% in office | GPU optimization, CUDA/Triton/CUTLASS, distributed communication, profiling, and production ML performance |
| Anthropic | [Staff+ Software Engineer, Safeguards ML Infrastructure](https://job-boards.greenhouse.io/anthropic/jobs/4778843008) | Published 2025-06-24; updated 2026-07-14 | Annual Salary: `$320,000—$485,000 USD` | San Francisco; hybrid, at least 25% in office | Production distributed systems, SLOs, observability, alerting, incident response, Python, and optional Rust |
| SpaceXAI | [Software Engineer - Training/Inference (C++)](https://job-boards.greenhouse.io/xai/jobs/4533894007) | Published 2024-10-04; updated 2026-07-28 | `$180,000 - $440,000 USD` | Palo Alto, California; remote status not exposed | C++/Rust, distributed model serving, load balancing, autoscaling, continuous batching, GPU kernels, benchmarking, testing, and reliability |

## Repeated requirements

The four-role sample repeats five relevant signals:

1. Controlled inference experiments and benchmarking rather than isolated
   latency numbers.
2. Telemetry and observability that connect throughput, latency, failures,
   queueing, correctness, and cost to a release decision.
3. Distributed serving and reliability controls: load balancing, autoscaling,
   SLOs, alerting, incident response, and explicit failure modes.
4. Python plus low-level systems depth in C++, Rust, CUDA, or Triton.
5. Credible production ownership. This is a level requirement, not something a
   deterministic local fixture can substitute for.

## Public evidence inventory

The live GitHub profile README matched this checkout before the positioning
change. It linked the serving benchmark, scheduler, kernel lab, secure gateway,
compiler, matching engine, and readiness dashboard. The six pinned repositories
were `market-microstructure-engine`, `readiness-control-tower`,
`secure-gpu-inference-gateway`, `triton-kernel-lab`,
`deterministic-inference-scheduler`, and `heterocore-compiler`; all six default
branches had successful check rollups. The benchmark was linked from the profile
README but not pinned.

### Already demonstrated

- `triton-inference-benchmark`: concurrent Triton and OpenAI-compatible load,
  phase-separated warmup, streaming TTFT/inter-chunk timing, workload profiles,
  cost models, exact-output probes, and fail-closed paired-counter gates.
- `triton-kernel-lab`: correctness-gated Triton kernels, raw RTX 5070 Ti timing
  evidence, torch.compile comparisons, roofline reports, and artifact validation.
- `deterministic-inference-scheduler`: Rust continuous batching, paged KV-cache
  accounting, deterministic replay fingerprints, and release decisions.
- `secure-gpu-inference-gateway`: access policy, audit records,
  Prometheus/OpenTelemetry, Redis-backed limits, deployment controls, and
  supply-chain checks.

### Present but buried

The serving harness already controlled the transition from warmup to measured
load and could evaluate paired Triton counters. Its only input, however, was a
pair of files supplied after the run. Even carefully captured files had to stay
labeled `operator_supplied_unverified` because the harness did not own either
scrape call.

### Missing before this change

There was no opt-in HTTP path that captured Prometheus counters immediately
before and after the measured request phase. There was also no end-to-end test
proving phase order, explicit-only authentication, response bounds, and the
absence of endpoint URLs, bearer tokens, authorization headers, and raw scrapes
from shareable artifacts.

## Selected implementation

Extend `triton-inference-benchmark`; do not create another repository. The gap
belongs in the runner that already owns request phase ordering, Prometheus
parsing, server-counter semantics, CLI thresholds, artifacts, and CI.

The implementation adds an HTTP(S)-only Prometheus client with a 10 MiB response
limit and configurable timeout. Bearer authentication is disabled unless the
operator explicitly names a non-empty environment variable. The harness takes
its first scrape after warmup and immediately before measured work, then takes
the second after measured requests complete. Existing model-filtered counter
deltas and failure/queue gates are reused. Artifacts label the process ordering
`harness_bracketed_measured_phase` while omitting the URL, authentication data,
and raw responses.

File-based snapshots remain supported and retain their
`operator_supplied_unverified` label.

## Supporting implementation publication proof

Profile wording was not changed until the source implementation was public and
its main-branch CI passed.

- Plan: [`docs/plans/2026-08-03-bracketed-telemetry-capture.md`](https://github.com/WaffleBits/triton-inference-benchmark/blob/main/docs/plans/2026-08-03-bracketed-telemetry-capture.md)
- Pull request: [triton-inference-benchmark #7](https://github.com/WaffleBits/triton-inference-benchmark/pull/7), merged
- Public main commit: [`d05fef6`](https://github.com/WaffleBits/triton-inference-benchmark/commit/d05fef61c12c4ba9b000ace9303cf9de8b7c0041), verified
- Main-branch CI: [run 30808815176](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/30808815176), passed
- Repository description was read back after publication and now names
  harness-bracketed server telemetry.
- Local checks: 53 tests passed on the host and in Python 3.13; Python compileall
  passed; a real CLI against a deterministic local HTTP fixture produced the
  expected 101-request server window and passing JSON/Prometheus gate; a second
  real CLI returned status 4 on an unevaluable window; the Docker Python 3.12
  image built and ran as UID 10001; the Triton sync client imported with
  `urllib3 2.7.0`; `pip-audit` found no known vulnerabilities; and
  `git diff --check` passed.

## Positioning update

The profile README, Astro case file, proof link, and generated one-page resume
now describe the same bounded behavior: opt-in Prometheus scrapes immediately
around measured load with fail-closed server gates. The copy does not call the
synthetic fixture a model, GPU, fleet, or production measurement.

## Fit boundary

These listings are market-signal sources, not a claim of immediate level fit.
The Anthropic roles require production ownership at scale, its GPU role expects
deep accelerator optimization, and the SpaceXAI listing asks for large-scale,
high-concurrency production serving. The public repositories demonstrate
inspectable methods and implementation but do not prove ownership of a large
inference fleet, multi-node collective tuning, or years of production GPU
operation.

## Remaining gap

Harness bracketing proves scrape-call order relative to this process; it does
not isolate the server from unrelated traffic or compare stable per-replica
series membership. DCGM values remain post-run gauges rather than in-window
aggregates. Real qualification evidence still requires an authorized endpoint,
stable scrape targets, controlled background traffic, and actual model/GPU
infrastructure. The committed fixture is deterministic and synthetic and is not
presented as fleet, model, or accelerator evidence.
