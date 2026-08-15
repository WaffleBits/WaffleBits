# Market alignment audit — 2026-08-15

## Scope and source policy

This audit used live public evidence and primary sources. Role status, feed update timestamps, compensation, locations, and requirements were read from Anthropic's official Greenhouse feed on 2026-08-15. GitHub profile and repository metadata were read through GitHub's API for the authenticated `WaffleBits` account. Compensation is quoted from the feed; no equity or total-compensation value is inferred.

The listings include very senior roles. They are used as market-demand evidence, not as a claim that the portfolio demonstrates the listed level or production scale.

## Current role evidence

All four listings were present in Anthropic's official board feed on 2026-08-15.

| Role | Official URL | Feed update date | Published compensation | Location / constraints | Representative requirements |
|---|---|---:|---|---|---|
| Performance Engineer, GPU | https://job-boards.greenhouse.io/anthropic/jobs/4926227008 | 2026-08-03 | `$280,000—$850,000 USD` | San Francisco, CA; New York City, NY; Seattle, WA; hybrid policy states at least 25% office time | CUDA/Triton/CUTLASS; kernel fusion and memory-bandwidth optimization; profiling; distributed communication; fault tolerance; production serving performance |
| Performance Engineer, Inference Systems | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | 2026-08-03 | `$350,000—$850,000 USD` | San Francisco, CA; New York City, NY; Seattle, WA; hybrid policy states at least 25% office time | Python; throughput, latency, reliability, and correctness; root-cause investigation; telemetry and dashboards; tail latency; load balancing, routing, and high-throughput services |
| Staff+ Software Engineer, Inference Runtime | https://job-boards.greenhouse.io/anthropic/jobs/5257650008 | 2026-08-03 | `$405,000—$485,000 USD` | Remote-friendly with travel; San Francisco, CA; Seattle, WA; New York City, NY; hybrid policy states at least 25% office time | Rust and Python; scheduling and memory management; profiling; SLOs and engineering metrics; change-scoped testing; canary, shadow, and rollback validation; distributed systems |
| Staff+ Software Engineer, Infrastructure (Distributed Systems) | https://job-boards.greenhouse.io/anthropic/jobs/4970314008 | 2026-08-07 | `$320,000—$485,000 USD` | San Francisco, CA; New York City, NY; Seattle, WA; hybrid policy states at least 25% office time | Reliable, scalable, secure distributed systems; Python/Rust/Go/Java; Kubernetes and cloud infrastructure; incident response and postmortems; ML infrastructure, NCCL, Linux tuning, and security as preferred evidence |

The feed did not expose separate publication dates, so the table records its `updated_at` dates. The displayed annual salary ranges are copied as published.

## Recurring requirements

Across the four active listings:

1. **Large-scale or distributed systems** appears in all four.
2. **Reliability, correctness, or operational validation** appears in all four.
3. **Performance profiling and measurable engineering signals** appears directly in three and as operational/scalability ownership in the fourth.
4. **Python systems work** appears directly in three; Rust appears directly in one and as an accepted infrastructure language in another.
5. **Inference or accelerator internals** appears in three.
6. **Observability, SLOs, incident learning, or regression detection** recurs across the inference-systems, runtime, and infrastructure roles.

The high-leverage intersection is therefore not another isolated technology sample. It is inspectable evidence that connects load generation, retries, reliability telemetry, and an enforceable operational decision.

## Public evidence inventory

GitHub API inventory on 2026-08-15 showed 21 public repositories, of which 17 were active, non-fork repositories. The six profile pins were `market-microstructure-engine`, `readiness-control-tower`, `secure-gpu-inference-gateway`, `triton-kernel-lab`, `deterministic-inference-scheduler`, and `heterocore-compiler`. The active profile repository contains the profile README, Astro site, resume source, and generated PDF.

Strongest relevant repositories:

| Repository | Public evidence | Activity read from GitHub |
|---|---|---:|
| [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark) | Python serving benchmark; open-loop pacing; warmup separation; queue and streaming timing; GPU/server telemetry; trace, correctness, regression, and client-attempt amplification gates; Docker and deterministic HTTP fixtures | [`82dde2b`](https://github.com/WaffleBits/triton-inference-benchmark/commit/82dde2beb9b3db80d8187e559b3cccf64bc039c4), merged 2026-08-15; [main CI passed](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/31881605708) |
| [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab) | Triton RMSNorm, SwiGLU, attention, KV-movement, and INT4 kernels; correctness gates and raw RTX 5070 Ti measurements | pushed 2026-07-30 |
| [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler) | Rust continuous batching, paged KV-cache accounting, replay fingerprints, and release gates | pushed 2026-07-16 |
| [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway) | Authenticated policy and budget controls, audit evidence, Redis-backed atomic limits, OpenTelemetry/Prometheus, deployment checks, SBOM, and vulnerability gates | pushed 2026-08-04 |
| [`market-microstructure-engine`](https://github.com/WaffleBits/market-microstructure-engine) | C++20 and Python price-time matching engines with parity tests and a documented local benchmark boundary | pushed 2026-07-24 |

The GitHub profile bio was `AI infrastructure, GPU performance, secure distributed systems, and mission software.` The benchmark repository's public `main` branch and post-merge CI were read back before any profile claim was added.

## Evidence map

### Already demonstrated

- Python serving and platform tooling with tests, CI, Docker, JSON, and Prometheus artifacts.
- Triton kernel correctness checks and labeled local GPU measurements.
- Deterministic continuous batching and KV-cache scheduling in Rust.
- Security controls, deployment checks, observability, and resilience evidence in the inference gateway.
- Open-loop load scheduling, queue-delay decomposition, streaming timing, trace propagation, telemetry windows, correctness checks, and regression gates in the benchmark.
- C++20 systems work with deterministic cross-language parity tests.

### Present but buried before this change

- The benchmark already retried failed client calls, but each logical request produced one final result and the summary did not expose the number of underlying calls.
- Retry behavior therefore affected endpoint load and capacity interpretation without appearing in JSON or Prometheus output.
- Existing fail gates made a retry reliability budget a natural extension, but the profile and resume could not point to that evidence until it was implemented, merged, and verified publicly.

### Missing

- A deployed multi-node inference or training system with measured fault recovery.
- Server- or router-side receipt accounting that can distinguish client calls from requests accepted by each serving layer.
- Public RDMA, collective-communication, or kernel-bypass networking work.
- Large-cluster operational evidence; deterministic local fixtures and personal hardware are not cluster operation.
- Model-quality evaluation beyond equality or operator-selected numeric closeness.

## Selected implementation

**One gap:** make client retry load amplification observable and enforceable without implying server receipt.

This belongs in the existing `triton-inference-benchmark`, not a new repository. The benchmark already owns retry execution, logical request results, JSON and Prometheus output, CLI fail gates, and deterministic OpenAI-compatible HTTP fixtures. A new repository would duplicate the system and weaken the evidence chain.

Public implementation: [`82dde2b`](https://github.com/WaffleBits/triton-inference-benchmark/commit/82dde2beb9b3db80d8187e559b3cccf64bc039c4), merged through [PR #14](https://github.com/WaffleBits/triton-inference-benchmark/pull/14).

The implementation:

- records an attempt count on every logical result, including terminal failures;
- reports logical requests, client attempts, retry attempts, retried requests, successful recovery, retry exhaustion, and client-attempt amplification;
- excludes warmup attempts from the measured run's amplification gate while reporting warmup separately;
- adds `--max-client-attempt-amplification` and opt-in `--fail-on-retry-gate` behavior;
- evaluates the gate from integer request/attempt counts rather than a rounded display value;
- exports aggregate JSON and Prometheus evidence without prompts, outputs, authorization headers, request identifiers, or trace identifiers;
- labels a client attempt as one harness call and explicitly states that it does not prove endpoint, router, model-server, or accelerator receipt.

### Verification boundary

- 90 Python unit/integration tests passed on the host and in `python:3.13-slim`, including retry recovery, terminal exhaustion, threshold validation, exact count-based gate evaluation, Prometheus export, and exit-code behavior.
- The real CLI ran against a deterministic local SSE fixture that failed its first HTTP request: 4 logical requests generated 5 client attempts, 1 retry, 1 recovered request, 0 exhausted requests, and 1.25 amplification; the 1.25 gate passed.
- Artifact privacy checks confirmed that fixture trace identifiers and the prompt were absent from JSON and Prometheus output.
- The Docker image built and ran the gate through the packaged CLI.
- `pip-audit -r requirements.txt` reported no known vulnerabilities in Python 3.13.
- Feature-branch CI and post-merge `main` CI passed, including the deterministic transient-failure CLI step.

The fixture is local and deterministic. These results demonstrate harness accounting and gate semantics, not production traffic, cluster scale, or server receipt.

## Positioning change

The profile README, Astro site, repository description, and one-page resume now surface measured client attempts and the retry-amplification budget as one part of the existing serving benchmark. The wording retains the client-call boundary and does not convert fixture results into a production claim.

## Highest remaining gap

The next credible reliability step is a reproducible multi-process serving fixture with separate aggregate counters at the client, router, and backend layers, plus controlled failure injection and recovery timing. That would show where amplification is absorbed or forwarded without serializing request bodies, authorization data, trace identifiers, or private outputs. A real GPU endpoint can be added when accessible, but synthetic/local evidence must remain labeled as such.
