# Market Alignment - 2026-07-05

This note records the hiring signal used for the July 5 maintenance pass. It
is not resume copy. Keep target-company research and compensation logic here;
keep the public profile focused on shipped evidence.

## Current signal

- Levels.fyi's U.S. software-engineer leaderboard shows the top of the market
  remains concentrated in quant, AI, and data infrastructure companies, with
  Hudson River Trading, Harvey, D. E. Shaw, Jane Street, Databricks, and OpenAI
  appearing in the visible top entries.
- OpenAI Inference AMD GPU Enablement emphasizes scaling and optimizing
  inference infrastructure across emerging GPU platforms, spanning low-level
  kernel performance through high-level distributed execution.
- OpenAI Infrastructure Security emphasizes security software for GPU
  supercomputing clusters, multi-cloud infrastructure, datacenters, networking,
  storage, and critical services that power frontier AI models.
- Anthropic's current infrastructure listings include inference, GPU, AI
  reliability, privacy, cluster infrastructure, and developer-productivity
  roles. The inference deployment signal emphasizes Kubernetes deployments,
  rolling updates, container orchestration, resource-constrained rollout
  windows, capacity planning, scheduling, Python/Rust, and accelerator diversity.
- CoreWeave inference roles emphasize Kubernetes-native low-latency inference,
  request routing, scheduling, GPU resource management, and reliability across
  real-time AI systems.
- Databricks backend roles reinforce the need to design, test, and operate
  production platform microservices, data pipelines, cloud APIs, and
  infrastructure-as-code surfaces.
- Jane Street's technology material reinforces adjacent top-market systems
  signals: low-latency networking, compilers, and distributed systems design.

## Profile gap

The secure gateway already surfaced in-memory request/token budgets, sanitized
traces, OTLP collector payloads, workload-readiness replay, and capacity/cost
planning. The remaining gap for July 5 was the next deployment-control step:
show how the configured budgets would migrate to distributed Redis or Envoy
global limiter controls without exposing payloads, identities, secrets, or
production traffic.

## Implemented delta

- Added `gateway/distributed_limiter.py` to generate a deterministic,
  public-safe distributed-limiter readiness report.
- Added `artifacts/distributed-limiter-evidence.json` with request-count and
  estimated-input-token rules for each configured model policy, Redis atomic
  script shape, Envoy descriptor shape, sample allow/deny decisions, and
  release gates.
- Added unit tests proving policy budget coverage, atomic Redis script shape,
  and artifact exclusion of sensitive payload and identity fields.
- Updated secure-gateway docs to describe the evidence as migration readiness,
  not a live Redis or Envoy deployment.
- Updated public profile wording only after the gateway artifact and tests
  existed.

## Public wording to keep

- distributed-limiter readiness evidence
- Redis/Envoy limiter migration artifact
- distributed request/token-budget control path
- checked trace, workload-readiness, collector-payload, distributed-limiter, and
  capacity-plan artifacts

## Sources checked

- Levels.fyi Software Engineer leaderboard:
  https://www.levels.fyi/leaderboard/Software-Engineer/Entry-Level-Engineer/country/United-States/
- OpenAI Software Engineer, Inference - AMD GPU Enablement:
  https://openai.com/careers/software-engineer-inference-amd-gpu-enablement-san-francisco/
- OpenAI Principal Software Engineer, Infrastructure Security:
  https://openai.com/careers/principal-software-engineer-infrastructure-security-remote-us/
- Anthropic jobs:
  https://www.anthropic.com/careers/jobs
- Anthropic Staff/Senior Software Engineer, Inference Deployment:
  https://jobs.menlovc.com/companies/anthropic/jobs/85283116-staff-senior-software-engineer-inference-deployment
- CoreWeave Staff Inference Software Engineer:
  https://www.welcometothejungle.com/en/companies/coreweave/jobs/staff-inference-software-engineer_sunnyvale_sqow4mhp
- Databricks Staff Software Engineer - Backend:
  https://www.databricks.com/company/careers/engineering---pipeline/staff-software-engineer---backend-6779232002
- Jane Street Technology:
  https://www.janestreet.com/technology/
