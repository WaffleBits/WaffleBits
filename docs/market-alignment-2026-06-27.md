# Market Alignment - 2026-06-27

This note records the current hiring signal used for the June 27 maintenance
pass. It is not public resume copy. Keep company targeting and compensation
logic here, and keep the profile focused on shipped evidence.

## Current signal

- OpenAI inference and workload-enablement roles continue to emphasize
  production inference performance, latency, throughput, capacity, utilization,
  cost tradeoffs, workload-shaped validation, telemetry hooks, Kubernetes
  integration, accelerator networking, and failure triage.
- Anthropic inference systems roles continue to emphasize cross-layer profiling,
  accelerator-agnostic runtime behavior, scheduling, memory management,
  correctness gates, canary/shadow/rollback validation, deterministic testing,
  Kubernetes, SLOs, observability, resilience testing, and cost-aware capacity
  prioritization.
- Databricks model-serving and GenAI inference roles reinforce the same serving
  platform cluster: routing, caching, autoscaling, observability, SLAs, model
  versioning, GPU/CPU serving performance, and customer-facing serving APIs.
- CoreWeave and adjacent GPU-cloud roles reinforce Kubernetes-native inference
  operations, GPU scheduling, Prometheus/Grafana/OpenTelemetry observability,
  tail-latency improvement, and reliable workload orchestration.
- Jane Street and Citadel Securities remain the parallel top-comp systems lane:
  low-latency C++/systems work, concurrency, distributed systems, profiling,
  cache hierarchy, hardware counters, and clear correctness/performance
  discipline.

## Profile gap

The public profile was already aligned with AI infrastructure, inference runtime
validation, GPU kernels, secure model-serving paths, and deterministic systems.
The useful gap was not another positioning rewrite. The newest code proof needed
to make runtime replay more inspectable around capacity and utilization, because
top-paying inference roles keep asking for evidence that engineers can reason
about latency, throughput, memory, capacity, utilization, and cost tradeoffs
from concrete artifacts.

## Implemented delta

- Updated `WaffleBits/rust-inference-runtime` so replay reports now emit schema
  version 3 capacity-envelope fields: total prompt tokens, total decode tokens,
  total reserved KV pages, declared prefill/decode/KV capacity, prefill capacity
  utilization, decode capacity utilization, and KV-page occupancy.
- Added per-tick admitted prefill token counts and decoded token counts to make
  replay traces explain the aggregate capacity report.
- Regenerated checked replay artifacts. The pressure replay now records 432
  prompt tokens, 48 decode tokens, 35 reserved KV pages, 0.888889 decode-capacity
  utilization, and 0.595062 KV-page occupancy.
- Refreshed the public README and resume site to surface this shipped proof
  without naming target companies, pay, or application intent.

## Public wording to keep

- replay capacity envelopes
- prefill/decode utilization
- KV-page occupancy
- workload-pressure replay reports
- capacity/utilization evidence from checked artifacts

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
