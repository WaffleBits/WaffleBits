# Market Alignment - 2026-06-30

This note records the hiring signal used for the June 30 maintenance pass. It
is not resume copy. Keep target-company research and compensation logic here;
keep the public profile focused on shipped evidence.

## Current signal

- OpenAI inference postings continue to emphasize high-volume, low-latency,
  high-availability inference, workload analysis, capacity/utilization
  tradeoffs, and developer systems that preserve reliability and performance.
  The current Inference Performance Optimization posting lists $295K-$555K
  plus equity.
- Anthropic inference and performance roles continue to emphasize GPU and
  inference-system performance, distributed systems, reliability, SLOs,
  observability, and production safety. The current Performance Engineer
  posting lists $280K-$850K.
- Databricks model-serving roles reinforce large-scale distributed systems,
  low-latency serving, routing, scheduling, autoscaling, observability,
  operational excellence, and measurable customer value.
- CoreWeave observability/GPU-cloud roles reinforce telemetry pipelines,
  logging, tracing, metrics, Kubernetes-oriented infrastructure, reliability,
  incident response, and secure operations across large GPU clusters.
- Jane Street, Citadel, and Citadel Securities remain the parallel systems
  lane: C++ or low-level systems, concurrency, distributed systems, profiling,
  low-latency design, and high-ownership correctness/performance work.

## Profile gap

The public profile already surfaced Rust inference runtime evidence, streaming
trace coverage, route/scheduler provenance, Triton kernel work, and secure model
access controls. The useful next delta was not another broad positioning rewrite
or a new repository. The gap was proof that the secure gateway can produce
reviewable observability evidence while keeping prompts, outputs, access
reasons, subjects, and principal IDs out of trace artifacts.

## Implemented delta

- Added `secure-gpu-inference-gateway/gateway/trace_exporter.py` with opt-in
  `TRACE_EXPORT_PATH` / `OTEL_TRACE_EXPORT_PATH` sanitized span export.
- Integrated the exporter into allowed, policy-denied, and rate-limited
  inference paths without changing request policy behavior.
- Added tests proving exported trace evidence omits prompt text, generated
  output, access reason, and principal identifiers.
- Added `artifacts/sanitized-trace-evidence.jsonl` as checked review evidence.
- Added local Prometheus/Grafana provisioning files and a dashboard covering
  request outcomes, p95 latency, auth outcomes, denials, and model policy
  metadata.
- Updated the public README and resume site with restrained shipped-evidence
  wording only.

## Public wording to keep

- sanitized trace export
- checked trace artifact
- Grafana dashboard provisioning
- Prometheus metrics
- observability evidence that omits prompts, outputs, reasons, and principal IDs

## Sources checked

- OpenAI Software Engineer, Inference - Performance Optimization:
  https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- OpenAI Software Engineer, Model Inference:
  https://openai.com/careers/software-engineer-model-inference-san-francisco/
- OpenAI Software Engineer, Productivity - Inference Runtime:
  https://openai.com/careers/software-engineer-productivity-inference-runtime-san-francisco/
- Anthropic careers:
  https://www.anthropic.com/careers/jobs
- Anthropic Performance Engineer:
  https://job-boards.greenhouse.io/anthropic/jobs/4020350008
- Databricks Staff Software Engineer, Model Serving:
  https://www.databricks.com/company/careers/engineering/staff-software-engineer-model-serving--8211647002
- Databricks Staff Software Engineer, Foundational Model Serving:
  https://www.databricks.com/company/careers/engineering/staff-software-engineer-foundational-model-serving-8224683002
- CoreWeave careers:
  https://www.coreweave.com/careers
- Jane Street Low-Latency Engineer:
  https://www.janestreet.com/join-jane-street/position/6254435002/
- Jane Street Machine Learning Performance Engineer:
  https://www.janestreet.com/join-jane-street/position/7449077002/
- Citadel Securities C++ Software Engineer:
  https://www.citadelsecurities.com/careers/details/c-software-engineer-2/
- NVIDIA AI Inference Performance Engineer:
  https://jobs.nvidia.com/careers/job/893393884394
