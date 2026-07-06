# Market Alignment - 2026-07-06

This note records the hiring signal used for the July 6 maintenance pass. It
is not resume copy. Keep target-company research and compensation logic here;
keep the public profile focused on shipped evidence.

## Current signal

- Levels.fyi's software-engineer salary page still points the top of the
  market toward AI labs and infrastructure-heavy companies, with OpenAI shown
  as a top-paying software-engineering company in the visible crawl output.
- OpenAI Model Inference emphasizes high-volume, low-latency, high-availability
  inference for frontier models, with compensation listed at $295K-$555K plus
  equity.
- OpenAI Inference Performance Optimization emphasizes systems profiling,
  benchmarking, capacity, utilization, latency, and cost-to-serve modeling
  across application, model, and fleet layers.
- OpenAI Inference AMD GPU Enablement emphasizes accelerator-portability work
  from low-level kernel performance through high-level distributed execution.
- Anthropic Staff+ Inference Runtime lists $405K-$485K base and emphasizes an
  accelerator-agnostic inference runtime across GPUs, TPUs, and Trainium; Rust
  and Python; utilization, scheduling, memory management; validation systems;
  and canary, shadow, and rollback mechanisms.
- Anthropic Inference Deployment lists $320K-$485K base and emphasizes
  capacity-aware deployment scheduling, Kubernetes deployments, multi-stage
  release pipelines, progressive delivery, automated rollback, and observability
  that answers what code is running and what validation passed.
- Anthropic AI Reliability lists $325K-$485K base and emphasizes SLOs,
  monitoring across the token path, high-availability serving infrastructure,
  incident response, accelerator diversity, RDMA/InfiniBand, AI-specific
  observability, and resilience testing.
- CoreWeave open roles and product positioning reinforce the same infrastructure
  signal: Kubernetes interfaces, GPU infrastructure, observability, secure audit
  visibility, and automated operations for AI infrastructure.
- Jane Street and Citadel Securities reinforce the adjacent top-market systems
  bar: low-level systems programming, latency, throughput, reliability,
  profiling, hardware counters, modern CPU architecture, and production
  ownership.

## Profile gap

The secure gateway already surfaced request/token budgets, sanitized trace
export, OTLP collector payloads, workload-readiness replay, capacity/cost
planning, and distributed limiter migration evidence. The remaining current
gap was deployment-control evidence: show how capacity, workload, and limiter
artifacts compose into a release review with shadow, canary, staged rollout,
and rollback gates.

## Implemented delta

- Added `gateway/deployment_readiness.py` to generate a deterministic,
  public-safe deployment-readiness report.
- Added `artifacts/deployment-readiness-evidence.json` with source evidence
  status, shadow/canary/staged/full rollout phases, per-model reserved capacity,
  rollback triggers, and release gates.
- Added unit tests proving the happy path, capacity-hold behavior, utilization
  threshold holds, invalid phase rejection, and sensitive-field exclusion.
- Updated secure-gateway README, operations notes, review notes, and roadmap
  to frame the artifact as local deployment review evidence, not a live
  production rollout system.
- Updated public profile wording only after the gateway artifact and tests
  existed.

## Public wording to keep

- deployment-readiness gates
- shadow, canary, staged rollout, and rollback review
- checked trace, workload-readiness, collector-payload, distributed-limiter,
  deployment-readiness, and capacity-plan artifacts
- capacity-aware release phase review

## Sources checked

- Levels.fyi Software Engineer Salary:
  https://www.levels.fyi/t/software-engineer
- OpenAI Software Engineer, Model Inference:
  https://openai.com/careers/software-engineer-model-inference-san-francisco/
- OpenAI Software Engineer, Inference - Performance Optimization:
  https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- OpenAI Software Engineer, Inference - AMD GPU Enablement:
  https://openai.com/careers/software-engineer-inference-amd-gpu-enablement-san-francisco/
- Anthropic Staff+ Software Engineer, Inference Runtime:
  https://job-boards.greenhouse.io/anthropic/jobs/5257650008
- Anthropic Staff + Senior Software Engineer, Inference Deployment:
  https://job-boards.greenhouse.io/anthropic/jobs/5285557008
- Anthropic Staff Software Engineer, AI Reliability:
  https://job-boards.greenhouse.io/anthropic/jobs/5113224008
- Anthropic jobs:
  https://www.anthropic.com/careers/jobs
- CoreWeave careers:
  https://www.coreweave.com/careers
- Jane Street Low-Latency Engineer:
  https://www.janestreet.com/join-jane-street/position/6254435002/
- Citadel Securities C++ Software Engineer:
  https://www.citadelsecurities.com/careers/details/c-software-engineer-2/
