# Market Alignment - 2026-07-03

This note records the hiring signal used for the July 3 maintenance pass. It
is not resume copy. Keep target-company research and compensation logic here;
keep the public profile focused on shipped evidence.

## Current signal

- Levels.fyi showed OpenAI U.S. software engineering compensation from $254K
  to $1.23M with an $800K median as checked on 2026-07-03. The public takeaway
  is not compensation language; it is that top-of-market AI infrastructure
  roles reward concrete evidence around production inference systems.
- OpenAI Inference Performance Optimization emphasizes performance models,
  cost-to-serve estimates, bottleneck analysis, latency, capacity, utilization,
  and cross-layer performance work.
- OpenAI Workload Enablement emphasizes repeatable workload and stress
  harnesses, correctness and performance readiness bars, NCCL/RCCL/RDMA,
  telemetry hooks, failure triage loops, and actionable pass/fail outputs.
- Anthropic inference roles emphasize compute-agnostic model serving, request
  routing, fleet orchestration, batching, caching, Kubernetes/cloud
  infrastructure, and production ML systems.
- Databricks Foundation Model Serving emphasizes high-throughput,
  low-latency GPU serving, operational excellence, vLLM/SGLang-style systems,
  token-based rate limiters, autoscaling, and operational efficiency.
- Citadel Securities platform roles reinforce the adjacent systems signal:
  distributed production infrastructure, process scheduling, observability,
  Linux, C++/Python, reliability, and comprehensive testing.

## Profile gap

The profile already surfaced sanitized trace export, token-budget controls,
capacity/cost planning, runtime replay evidence, and routing/scheduler
provenance. The remaining gap was checked gateway proof that the policy and
limiter paths can be replayed as a local readiness gate, not just described in
docs or inferred from unit tests.

## Implemented delta

- Added `gateway/workload_replay.py` to `secure-gpu-inference-gateway`.
- Added `artifacts/workload-readiness-evidence.json` with aggregate outcome
  coverage for allowed, policy-denied, rate-limited, and token-budget-limited
  paths, plus p95 latency and model-level policy pressure summaries.
- Added tests for readiness pass/hold behavior and public-safe artifact
  content.
- Updated gateway docs so model policy changes now regenerate both the
  capacity artifact and workload-readiness artifact.
- Updated the public profile only after the gateway PR merged and CI passed.

## Public wording to keep

- workload-readiness replay
- guardrail coverage
- checked trace, workload-readiness, and capacity-plan artifacts
- allowed, policy-denied, rate-limited, and token-budget-limited paths

## Sources checked

- Levels.fyi OpenAI Software Engineer Salary:
  https://www.levels.fyi/companies/openai/salaries/software-engineer
- OpenAI Software Engineer, Inference - Performance Optimization:
  https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- OpenAI Software Engineer, Workload Enablement:
  https://openai.com/careers/software-engineer-workload-enablement-san-francisco/
- Anthropic Senior Software Engineer, Inference:
  https://job-boards.greenhouse.io/anthropic/jobs/4641822008
- Anthropic Performance Engineer, GPU:
  https://job-boards.greenhouse.io/anthropic/jobs/4926227008
- Databricks Staff Software Engineer, Foundational Model Serving:
  https://www.databricks.com/company/careers/engineering/staff-software-engineer-foundational-model-serving-8224683002
- Citadel Securities Senior Platform Infrastructure Engineer:
  https://www.citadelsecurities.com/careers/details/senior-platform-infrastructure-engineer/
