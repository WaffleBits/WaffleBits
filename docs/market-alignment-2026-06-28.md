# Market Alignment - 2026-06-28

This note records the hiring signal used for the June 28 maintenance pass. It
is not resume copy. Keep target-company research and compensation logic here;
keep the public profile focused on shipped evidence.

## Current signal

- OpenAI inference roles continue to emphasize production inference
  performance, workload analysis, latency/throughput bottlenecks, capacity and
  utilization tradeoffs, model-serving productivity, and reliable rollout
  tooling.
- Anthropic inference systems roles continue to emphasize accelerator-agnostic
  runtime work, scheduling and memory management, canary/shadow/rollback
  validation, deterministic tests, observability, SLOs, and resilience.
- Databricks model-serving and GenAI inference roles reinforce serving-platform
  work around routing, caching, autoscaling, model versioning, SLAs,
  observability, GPU/CPU serving performance, and customer-facing APIs.
- CoreWeave and GPU-cloud infrastructure roles reinforce Kubernetes-native
  scheduling, Prometheus/Grafana/OpenTelemetry observability, tail-latency
  improvement, reliable workload orchestration, and GPU platform operations.
- Jane Street and Citadel Securities remain the parallel systems-performance
  lane: C++/systems work, low-latency design, concurrency, profiling, cache
  behavior, hardware-aware debugging, and rigorous correctness/performance
  measurement.

## Profile gap

The profile already surfaced inference runtime replay, capacity-envelope
reporting, backend mirror normalization, numeric tolerances, token-path
telemetry, and structured triage. The useful next delta was not another broad
positioning rewrite. The remaining gap was live-serving shaped evidence:
streaming token traces, route/scheduler provenance, and a gate that can hold a
candidate when the serving-path evidence is incomplete even if outputs are
correct.

## Implemented delta

- Merged `WaffleBits/rust-inference-runtime` PR #5 at `741887c`.
- Added streaming token-event ingestion for mirrored backend observations.
- Added schema version 4 release reports with candidate route/scheduler
  provenance coverage, streaming trace coverage, candidate route count, and
  scheduler policy reporting.
- Added opt-in gate thresholds for required candidate route provenance and
  required streaming-token traces; missing evidence produces `hold`, not an
  unsupported promote.
- Added a checked vLLM-to-SGLang streaming fixture and artifact. The report
  promotes with `candidate_routing_provenance_rate: 1.0`,
  `candidate_streaming_trace_rate: 1.0`, two candidate routes, and
  `continuous-batching` scheduler evidence.
- Refreshed the public README and resume site to surface this shipped proof
  without target-company, pay, or application-intent language.

## Public wording to keep

- streaming-token event validation
- route/scheduler provenance coverage
- checked streaming mirror promote report
- candidate routing provenance and streaming trace coverage
- live-serving shaped release-gate evidence

## Sources checked

- OpenAI Software Engineer, Inference - Performance Optimization:
  https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- OpenAI Software Engineer, Workload Enablement:
  https://openai.com/careers/software-engineer-workload-enablement-san-francisco/
- Anthropic Performance Engineer, Inference Systems:
  https://job-boards.greenhouse.io/anthropic/jobs/5224564008
- Databricks Staff Software Engineer, GenAI Inference:
  https://www.databricks.com/company/careers/engineering---pipeline/staff-software-engineer---genai-inference-8202698002
- CoreWeave careers:
  https://www.coreweave.com/careers
- Jane Street Low-Latency Engineer:
  https://www.janestreet.com/join-jane-street/position/7674282002/low-latency-engineer-london/
- Citadel Securities C++ Software Engineer:
  https://www.citadelsecurities.com/careers/details/c-software-engineer-2026-university-graduate-us/
