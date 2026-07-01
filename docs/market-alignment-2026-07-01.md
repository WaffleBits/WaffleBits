# Market Alignment - 2026-07-01

This note records the hiring signal used for the July 1 maintenance pass. It
is not resume copy. Keep target-company research and compensation logic here;
keep the public profile focused on shipped evidence.

## Current signal

- OpenAI inference performance roles continue to emphasize end-to-end workload
  analysis, profiling, bottleneck tooling, latency/throughput tradeoffs,
  capacity/utilization reasoning, and cost-to-serve modeling. The current
  Inference Performance Optimization posting lists $295K-$555K plus equity.
- OpenAI inference productivity roles emphasize deploy gates, CI/CD,
  production readiness, TTFT/TBT validation, rollout safety, observability,
  triage automation, and trustworthy regression signals. The current posting
  lists $230K-$385K.
- OpenAI workload enablement reinforces system software, networking, platform
  architecture, fleet monitoring, distributed systems, HPC, PyTorch/LLM stacks,
  and RDMA/NCCL/RCCL-style communication debugging.
- Anthropic inference roles reinforce distributed systems, production
  inference reliability, high-ownership engineering, and operational excellence.
- Databricks model-serving roles reinforce low-latency serving, routing,
  scheduling, autoscaling, observability, and scalable distributed systems.
- Jane Street and Citadel Securities remain the parallel systems lane:
  correctness, performance, low-level systems, C++/ML performance, and
  high-ownership engineering. Current public postings list Jane Street ML
  performance base salary at $300K and Citadel Securities C++ base range at
  $150K-$300K plus discretionary incentive compensation.

## Profile gap

The profile already surfaced runtime release gates, streaming trace coverage,
route/scheduler provenance, Triton kernel work, secure model access, sanitized
trace export, and Grafana/Prometheus proof. The useful gap was capacity and
abuse-control evidence inside the secure gateway: request limits existed, but
the profile still listed token-based rate-limit evidence as future work.

## Implemented delta

- Added estimated input-token accounting and a fixed-window token-budget
  limiter to `secure-gpu-inference-gateway`.
- Added per-model `input_tokens_per_minute` policy metadata and returned it on
  `/v1/models`.
- Added audit evidence for estimated input tokens and configured token budget.
- Added Prometheus `security_gateway_input_tokens_total` and expanded model
  policy metadata with request and token limits.
- Extended sanitized trace export with `ai.gateway.estimated_input_tokens` and
  `ai.gateway.token_budget_limit`, while continuing to omit prompt text,
  output text, access reason, subject, and principal identifiers.
- Added deterministic tests for token estimation, token-budget limiting, app
  429 behavior, metrics, and trace privacy.
- Updated the Grafana dashboard with estimated input-token-rate review and
  budget metadata.
- Updated public README/site wording only after the gateway code and tests
  existed.

## Public wording to keep

- request and token-budget limits
- estimated input-token throughput
- token-budget limiter evidence
- sanitized trace export that omits prompts, outputs, access reasons, and
  principal identifiers

## Sources checked

- OpenAI Software Engineer, Inference - Performance Optimization:
  https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- OpenAI Software Engineer, Productivity - Inference Runtime:
  https://openai.com/careers/software-engineer-productivity-inference-runtime-san-francisco/
- OpenAI Software Engineer, Workload Enablement:
  https://openai.com/careers/software-engineer-workload-enablement-san-francisco/
- Anthropic Senior Software Engineer, Inference:
  https://www.anthropic.com/careers/jobs/4641822008
- Databricks Staff Software Engineer, Model Serving:
  https://www.databricks.com/company/careers/engineering/staff-software-engineer-model-serving--8211647002
- Jane Street Machine Learning Performance Engineer:
  https://www.janestreet.com/join-jane-street/position/7449077002/
- Citadel Securities C++ Software Engineer:
  https://www.citadelsecurities.com/careers/details/c-software-engineer-2/
- Levels.fyi Software Engineer Salary:
  https://www.levels.fyi/t/software-engineer
