# Market alignment update — 2026-08-10

## Current role evidence

Active listings were re-read on 2026-08-10 from official company job boards or their primary feeds. Compensation is quoted as published rather than inferred.

| Company | Role | Published | Published compensation | Location | Repeated evidence sought |
| --- | --- | --- | --- | --- | --- |
| Anthropic | [Performance Engineer, Inference Systems](https://job-boards.greenhouse.io/anthropic/jobs/5224564008) | 2026-05-20 | $350,000–$850,000 USD annual salary | Hybrid: San Francisco, New York City, or Seattle | Cross-layer investigations, root-cause analysis, telemetry, correctness, reliability, distributed systems |
| OpenAI | [Software Engineer, Inference - Performance Optimization](https://jobs.ashbyhq.com/openai/85fceac9-fb8a-4d71-a524-a8e5f1e9b01b) | 2026-04-25 | $295K–$555K plus equity | San Francisco | Profiling and benchmarking across application, model, and fleet layers; latency, utilization, and cost tradeoffs |
| OpenAI | [ChatGPT Performance Engineer](https://jobs.ashbyhq.com/openai/38ddaa2c-a490-427a-8457-0e92bf00138c) | 2026-04-15 | $325K–$405K plus equity | San Francisco, New York City, Seattle, or US remote | Instrumentation, tracing, observability, regression investigation, reliability, performance testing |
| Etched | [Software Engineer – Performance Profiling](https://jobs.ashbyhq.com/etched/610c3836-9798-46ea-931a-02bb95b29467) | 2026-01-18 | $150K–$275K plus significant equity | On-site: San Jose | Correlated events across devices and hosts, precise synchronization, counter collection, tracing, bottleneck analysis |

The recurring signal is evidence that stays attributable while workloads, replicas, devices, and collection targets change. Counter collection by itself is insufficient.

## Public evidence inventory

The live profile and strongest relevant public repositories were reviewed before changing positioning:

- [`WaffleBits/WaffleBits`](https://github.com/WaffleBits/WaffleBits) presents platform security and AI infrastructure work, a generated one-page résumé, measured kernel and matching-engine results, and project links.
- [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark) owns phase-separated load generation, streaming semantics, paired server-counter gates, sampled GPU gauges, privacy controls, a deterministic telemetry fixture, and CI.
- [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab) provides GPU-kernel correctness oracles and raw local measurements.
- [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway) provides authenticated serving controls, audit evidence, telemetry, resilience checks, and a published same-host comparison against direct vLLM.
- [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler) provides replayable batching/KV-cache behavior and release gates.
- [`market-microstructure-engine`](https://github.com/WaffleBits/market-microstructure-engine) provides low-level C++20 implementation and Python parity testing.

## Evidence map

### Already demonstrated

- Deterministic tests and release gates around serving, scheduling, security, and low-level kernels.
- Paired Triton counter windows, opt-in sampled GPU gauges, artifact privacy tests, and a real local HTTP fixture.
- Explicit boundaries between measured, configured, estimated, and synthetic evidence.

### Present but buried

- Prometheus labels were already parsed in memory, making stable series comparison possible without publishing target labels.
- The benchmark already normalized exporter aliases for values, but this normalization was not applied to target-membership evidence.

### Missing before this update

- Counter windows could aggregate a different selected series set before and after a run.
- Sampled GPU distributions could mix values after a selected accelerator or replica appeared or disappeared.
- Shareable artifacts did not record whether the selected scrape membership stayed stable.

## One selected improvement

The existing benchmark was the correct home; a new repository would have duplicated its parser, telemetry alignment, gate, fixture, and CI.

[`triton-inference-benchmark` PR #9](https://github.com/WaffleBits/triton-inference-benchmark/pull/9) adds one coherent capability: privacy-preserving telemetry series-membership verification. It:

- hashes unique logical metric names and sorted label pairs after exporter-alias normalization;
- persists only a SHA-256 fingerprint and series count, not raw labels, endpoint data, headers, tokens, or scrape text;
- invalidates paired counter evidence and fails configured gates when membership changes;
- rejects sampled GPU windows with mixed selected-series membership;
- exports numeric membership stability and count indicators to Prometheus.

The supporting implementation is public at [`fa69388`](https://github.com/WaffleBits/triton-inference-benchmark/commit/fa69388f1443dfe216c34421b9844564b067d1cf). Its main-branch [CI run](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/31382809850) passed before this profile wording was prepared.

## Positioning changes

After the implementation became public and CI passed:

- the portfolio project card names hashed series-membership checks and target-churn rejection;
- the profile README adds hashed series-membership validation;
- the résumé source and generated PDF add the same evidence with no fleet-scale or production claim.

## Claim boundary and remaining gap

A matching hash proves only that the selected logical Prometheus series identities were unchanged across captured scrapes. It does not prove target health, physical target identity, clock synchronization, traffic isolation, or production operation.

The largest remaining market gap is controlled multi-host/GPU evidence: synchronized traces and counter attribution across a distributed load generator and serving fleet. That requires authorized infrastructure; a deterministic local fixture or synthetic benchmark should not be presented as a substitute.
