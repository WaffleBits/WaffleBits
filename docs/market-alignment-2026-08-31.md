# Market alignment audit — 2026-08-31

## Scope and source policy

This audit used current primary job-board feeds and live GitHub evidence. The
Anthropic and Together AI listings below were active in the companies' official
Greenhouse feeds on 2026-08-31. Greenhouse `updated_at` dates are recorded because
separate publication dates were not exposed. Compensation is copied exactly as
published; no equity or total-compensation value is inferred.

These listings include staff-level and production-scale responsibilities. They
show market demand; they are not a claim that this portfolio demonstrates those
levels or operating scales.

## Current role evidence

| Role | Official URL | Feed update date | Published compensation | Location / constraints | Representative requirements |
|---|---|---:|---|---|---|
| AI Infrastructure Systems Engineer | https://job-boards.greenhouse.io/togetherai/jobs/5138540007 | 2026-08-04 | `$190,000 - $270,000 + equity + benefits` | San Francisco; the feed did not expose a remote option | Automate deployment, monitoring, diagnosis, failure triage, and remediation for GPU fleets; Linux, Kubernetes, Terraform or Ansible; distributed AI workloads; Python, Go, or Rust; performance and reliability |
| Staff Software Engineer, Environments Infrastructure | https://job-boards.greenhouse.io/anthropic/jobs/5367436008 | 2026-08-21 | `$405,000—$605,000 USD` annual salary | San Francisco, CA or New York City, NY; hybrid policy states at least 25% office time | Deep Python; production systems that are monitored and easy to triage; intuition for silent failure; stateful distributed systems; shared-state correctness and recovery |
| Performance Engineer, Inference Systems | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | 2026-08-21 | `$350,000—$850,000 USD` annual salary | San Francisco, CA; New York City, NY; or Seattle, WA; hybrid policy states at least 25% office time | Cross-layer work spanning accelerator kernels, model servers, distributed routing, autoscaling, and capacity management; profiling and root-cause investigation; production Python and data analysis |
| Staff+ Site Reliability Engineer, Safeguards ML Infra | https://job-boards.greenhouse.io/anthropic/jobs/5230394008 | 2026-08-21 | `$405,000—$485,000 USD` annual salary | Remote-friendly with required travel; San Francisco, Seattle, or New York City also listed | Reliability for ML infrastructure; architecture and operations; incident response; automation; Python with Rust as a plus; cross-functional debugging and operational ownership |

## Recurring requirements

Across this set:

1. **Python systems work** appears in all four listings; Go and Rust recur as
   infrastructure languages.
2. **Failure diagnosis, recovery, reliability, or incident response** is explicit
   in all four.
3. **Cross-layer AI infrastructure work** recurs from GPU and network validation
   through routing, model servers, autoscaling, capacity, and safeguard services.
4. **Observable and triageable operation** appears as fleet monitoring, root-cause
   analysis, production-system triage, or SRE incident ownership.
5. **Distributed or stateful systems evidence** recurs in three listings; the SRE
   listing emphasizes the same operational class through scalable ML services.
6. **Automation must produce verifiable behavior**, not merely configuration:
   remediation, shared-state recovery, performance diagnosis, and incident
   response all require evidence across process boundaries.

The previous public benchmark qualified retries across router and backend
processes, but its failures were HTTP responses from services that never exited.
The highest-leverage remaining local gap was therefore an actual process exit,
a supervisor-completed restart, a retry policy that crosses that boundary, and a
privacy-safe lifecycle gate.

## Public evidence inventory

GitHub's live GraphQL API on 2026-08-31 showed 21 public repositories. The profile
bio names AI infrastructure, GPU performance, secure distributed systems, and
mission software. The six pinned repositories remained
`market-microstructure-engine`, `readiness-control-tower`,
`secure-gpu-inference-gateway`, `triton-kernel-lab`,
`deterministic-inference-scheduler`, and `heterocore-compiler`.

Strongest relevant repositories:

| Repository | Public evidence | Live activity read from GitHub |
|---|---|---:|
| [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark) | Python load generator; open-loop and streaming timing; retry, trace, correctness, regression, GPU/server telemetry, privacy-safe serving-path gates, and a supervised crash/restart fixture | [`730cfd7`](https://github.com/WaffleBits/triton-inference-benchmark/commit/730cfd79fa2217afc3fe763a44d4ae791a31c07c), merged 2026-08-31; [post-merge CI passed](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/33387506464) |
| [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway) | Authenticated policy and budget controls, audit evidence, Redis-backed limits, OpenTelemetry/Prometheus, deployment checks, SBOM, and vulnerability gates | pushed 2026-08-04 |
| [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab) | Triton kernels with correctness gates and raw RTX 5070 Ti measurements | pushed 2026-07-30 |
| [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler) | Rust continuous batching, paged KV-cache accounting, replay fingerprints, and release gates | pushed 2026-07-16 |
| [`market-microstructure-engine`](https://github.com/WaffleBits/market-microstructure-engine) | C++20 and Python price-time matching engines with parity tests and a documented local benchmark boundary | pushed 2026-07-24 |

The benchmark is the most recently updated relevant repository, although it is
not one of the six profile pins. The profile README and Astro portfolio already
linked it, but their wording stopped at HTTP failure injection and therefore did
not surface the completed lifecycle evidence.

## Evidence map

### Already demonstrated

- Python AI-serving and platform tooling with tests, CI, Docker, JSON, and
  Prometheus artifacts.
- Open-loop request pacing, streaming timing, trace continuity, retry budgets,
  correctness checks, regression gates, and bracketed server telemetry.
- Triton kernel correctness tests and explicitly labeled local GPU measurements.
- Deterministic continuous batching and KV-cache scheduling in Rust.
- Inference access controls, observability, deployment checks, and resilience
  evidence in the gateway.
- C++20 systems work with deterministic Python parity tests.

### Present but buried before this profile revision

- A dedicated local supervisor process launches the OpenAI-compatible backend,
  observes a controlled child exit, and starts a replacement on the same port.
- A fixed, recorded between-attempt retry delay lets the real benchmark CLI cross
  the controlled lifecycle boundary; it is explicitly not described as MTTR.
- Paired Prometheus evidence includes a completed-restart counter with minimum and
  maximum bounds, reset/membership validation, and exit status 8 on failure.
- The deterministic fixture reconciles six client/router attempts, five backend
  receipts, four completions, two recovered logical requests, and one completed
  restart. Request-path, retry, trace, and lifecycle gates pass.
- Artifacts exclude endpoint URLs, raw scrapes, selected raw metric names, labels,
  prompts, outputs, credentials, and trace identifiers.

### Missing

- An authorized orchestrated deployment with a real router, model server, GPU,
  and isolated production-like metrics.
- Kubernetes/controller reconciliation evidence rather than a local Python
  supervisor fixture.
- Multi-node load generation and distributed-clock handling.
- Production incident or service-level recovery measurements.
- A way to pin the benchmark through the available repository API; GitHub profile
  pins are not changed by this revision.

## Selected implementation

**Exactly one gap:** qualify a real local backend process exit and supervisor
restart inside the existing `triton-inference-benchmark` request window.

The existing repository was the correct home because it already owned client
attempt counts, retry semantics, trace propagation, multi-source bracketed
telemetry, privacy rules, and the exact path gate. A new repository would have
duplicated those controls and produced a weaker evidence chain.

Public implementation: [`730cfd7`](https://github.com/WaffleBits/triton-inference-benchmark/commit/730cfd79fa2217afc3fe763a44d4ae791a31c07c), merged through [PR #17](https://github.com/WaffleBits/triton-inference-benchmark/pull/17).

The implementation:

- adds `--retry-backoff-seconds`, a fixed configured delay between failed
  attempts that is recorded but never labeled measured recovery time;
- derives a privacy-safe completed-restart delta from an operator-selected
  cumulative Prometheus counter;
- supports explicit minimum/maximum restart bounds and a fail-closed lifecycle
  gate while retaining only hashed metric identity and series membership;
- adds a dedicated local supervisor and persistent synthetic backend state;
- makes the backend exit during one measured request, restarts it on the same
  local port, and verifies that later synthetic requests complete;
- validates one completed restart, six ingress attempts, five backend receipts,
  four successes, and two retry-recovered logical requests;
- keeps raw metric names, labels, endpoint URLs, raw scrapes, prompts, outputs,
  credentials, and trace IDs out of JSON and Prometheus artifacts.

### Verification boundary

- TDD began with failing lifecycle-accounting and retry-delay tests. The complete
  suite passed **105 tests** on the host.
- The real supervised multi-process CLI fixture passed on the host and in
  `python:3.12-slim`; its request-path, retry, trace, and lifecycle gates passed.
- A separate paired-file CLI exercise passed an exact one-restart gate and labeled
  its alignment `operator_supplied_unverified`.
- The packaged Docker image built and completed an eight-request mock smoke run.
- `pip-audit -r requirements.txt` in `python:3.13-bookworm` reported no known
  vulnerabilities. Python compilation and `git diff --check` passed.
- [Feature-branch CI](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/33387446267) passed, followed by [post-merge `main` CI](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/33387506464), including the supervised lifecycle fixture.
- The implementation was read back from public `main` before this positioning
  revision was started.

The fixture proves that one local child exited, a local supervisor completed one
replacement launch, later synthetic requests reached the backend, and aggregate
path/retry/lifecycle evidence reconciled. It does not prove Kubernetes operation,
production isolation, a real model or GPU, autonomous fleet remediation,
per-request causal linkage to the restart, or service MTTR.

## Positioning revision

Only after the supporting implementation was public and post-merge CI passed,
this revision updates the profile README, Astro portfolio data, repository
description, and one-page resume. The wording names a **local synthetic fixture**
and keeps configured delay, completed restart count, recovered-request latency,
and service MTTR as distinct concepts.

## Highest remaining gap

The highest remaining gap is an authorized orchestrated qualification with a real
inference router and model server, isolated metrics, GPU execution, and a
controller-managed lifecycle event. Until that exists, the public evidence should
remain described as a deterministic single-host fixture—not production operation,
autonomous fleet remediation, or MTTR.
