# Market Alignment - 2026-07-02

This note records the hiring signal used for the July 2 maintenance pass. It
is not resume copy. Keep target-company research and compensation logic here;
keep the public profile focused on shipped evidence.

## Current signal

- Levels.fyi showed OpenAI U.S. software engineering compensation from $254K
  to $1.23M with an $800K median as checked on 2026-07-02. The useful takeaway
  for the public profile is not compensation language; it is that top-of-market
  AI infrastructure roles reward evidence around production inference systems.
- OpenAI's Inference Performance Optimization posting emphasizes performance
  models across application, model, and fleet layers; cost-to-serve estimates
  from microbenchmarks; and tools for reasoning about latency, capacity,
  utilization, and cost tradeoffs.
- Anthropic's GPU performance role emphasizes GPU utilization, custom kernel
  work, hardware/software navigation, distributed systems, NCCL/NVLink,
  profiling, and production ML performance improvements.
- Databricks GenAI inference roles emphasize kernels, runtimes, orchestration,
  memory management, instrumentation, profiling, tracing, routing, batching,
  scheduling, dynamic loading, rollback, model versioning, and distributed
  inference infrastructure.
- Citadel Securities reinforces the adjacent systems lane: C++, concurrency,
  distributed systems, latency, reliability, throughput, and ownership in
  production.

## Profile gap

The profile already surfaced token-budget abuse control, sanitized trace export,
Prometheus/Grafana proof, runtime capacity envelopes, routing/scheduler
provenance, and cost-to-serve language from benchmark work. The gap was that
the secure gateway had policy and token limits but no checked artifact that
connected those limits to capacity, utilization, latency, and cost assumptions.

## Implemented delta

- Added `gateway/capacity_plan.py` to `secure-gpu-inference-gateway`.
- Added `artifacts/capacity-plan-evidence.json` with synthetic aggregate
  request capacity, input-token capacity, decode-token capacity, p95 latency,
  utilization assumptions, and cost-to-serve estimates for each configured
  model policy.
- Added tests for report generation, invalid-profile validation, capacity
  status, cost input validation, and public-safe aggregate artifact content.
- Updated gateway docs so policy changes now reference the capacity plan before
  raising request or input-token limits.
- Updated the public profile only after the gateway module, tests, and checked
  artifact existed.

## Public wording to keep

- synthetic capacity/cost planning
- gateway policy capacity planning
- checked trace and capacity-plan artifacts
- cost-to-serve estimates tied to model policy

## Sources checked

- Levels.fyi OpenAI Software Engineer Salary:
  https://www.levels.fyi/companies/openai/salaries/software-engineer
- OpenAI Software Engineer, Inference - Performance Optimization:
  https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- Anthropic Performance Engineer, GPU:
  https://job-boards.greenhouse.io/anthropic/jobs/4926227008
- Databricks Software Engineer - GenAI inference:
  https://www.databricks.com/company/careers/engineering---pipeline/software-engineer---genai-inference--8202670002
- Citadel Securities C++ Software Engineer:
  https://www.citadelsecurities.com/careers/details/c-software-engineer/
