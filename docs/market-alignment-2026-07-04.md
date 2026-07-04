# Market Alignment - 2026-07-04

This note records the hiring signal used for the July 4 maintenance pass. It
is not resume copy. Keep target-company research and compensation logic here;
keep the public profile focused on shipped evidence.

## Current signal

- OpenAI Tokens-as-a-Service lists $293K-$385K plus equity and emphasizes
  systems that measure token throughput, utilization, SLAs, reliability,
  operational metrics, dashboards, benchmarking, and integration across
  first-party and partner compute environments.
- OpenAI Workload Enablement emphasizes workload-shaped benchmarks, CI/lab
  stress harnesses, telemetry hooks, failure triage loops, pass/fail outputs,
  Kubernetes integration, NCCL/RCCL/RDMA, and profiling from traces/counters.
- OpenAI Compute Infrastructure emphasizes capacity planning, Kubernetes and
  scheduling, observability, workload profiling, benchmarking, high-performance
  networking, NCCL, RDMA, GPUs, NICs, topology, firmware, and failure modes.
- OpenAI Detection and Response reinforces the security-adjacent signal:
  high-signal telemetry, evidence capture, Kubernetes/cloud visibility,
  investigation automation, measurable/auditable workflows, and threat-model
  requirements for new infrastructure.
- Anthropic GPU Performance lists $280K-$850K and emphasizes GPU utilization,
  production ML systems, CUDA/Triton/CUTLASS, Nsight profiling, NCCL/NVLink,
  model parallelism, fault tolerance, and performance modeling.
- Databricks GenAI Inference lists $190.9K-$232.8K base and emphasizes
  high-throughput, low-latency inference, instrumentation, profiling, tracing,
  routing, batching, scheduling, memory management, A/B launches, rollback,
  model versioning, and distributed inference.
- Jane Street and Citadel Securities reinforce the adjacent systems bar:
  low-level systems programming, profiling, hardware counters, modern computer
  architecture, C++/multithreading, distributed production systems, reliability,
  throughput, and production ownership.

## Profile gap

The profile already surfaced sanitized trace JSONL, Prometheus/Grafana,
token-budget controls, workload-readiness replay, and capacity/cost planning.
The remaining gap was collector-grade observability proof: a checked OTLP
payload path that can send sanitized gateway traces to a collector without
widening the public trace data boundary.

## Implemented delta

- Added OTLP/HTTP trace payload generation to `secure-gpu-inference-gateway`.
- Added optional live posting through `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` /
  `OTLP_TRACES_ENDPOINT` while preserving the JSONL trace evidence path.
- Added `gateway/otlp_export.py` so the checked sanitized trace sample can be
  converted into `artifacts/otlp-collector-payload.json`.
- Added local OpenTelemetry Collector compose/config files.
- Added unit tests that verify OTLP payload shape and sensitive-field
  exclusion.
- Updated the public profile only after gateway PR #6 merged and CI passed.

## Public wording to keep

- OTLP collector trace export
- OTLP collector-ready trace payloads
- checked trace, workload-readiness, collector-payload, and capacity-plan artifacts
- sanitized trace export without prompt/output/access-reason/principal fields

## Sources checked

- OpenAI Tokens-as-a-Service Software Engineer:
  https://openai.com/careers/tokens-as-a-service-%28taas%29-software-engineer-san-francisco/
- OpenAI Software Engineer, Workload Enablement:
  https://openai.com/careers/software-engineer-workload-enablement-san-francisco/
- OpenAI Software Engineer, Compute Infrastructure:
  https://openai.com/careers/software-engineer-compute-infrastructure-san-francisco/
- OpenAI Security Engineer, Detection and Response:
  https://openai.com/careers/security-engineer-detection-and-response-emea-london-uk/
- Anthropic Performance Engineer, GPU:
  https://job-boards.greenhouse.io/anthropic/jobs/4926227008
- Databricks Staff Software Engineer, GenAI Inference:
  https://www.databricks.com/company/careers/engineering---pipeline/staff-software-engineer---genai-inference-8202698002
- Jane Street Low-Latency Engineer:
  https://www.janestreet.com/join-jane-street/position/6254435002/
- Citadel Securities C++ Software Engineer:
  https://www.citadelsecurities.com/careers/details/c-software-engineer-2/
