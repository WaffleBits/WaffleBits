# Market alignment audit — 2026-08-31

## Scope and source policy

This audit used current primary job-board feeds and live GitHub evidence. The
Anthropic and Together AI listings were active in the companies' official
Greenhouse feeds on 2026-08-31. Greenhouse `updated_at` dates are recorded because
separate publication dates were not exposed. Compensation is copied as published;
no equity or total-compensation value is inferred.

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
   autonomous remediation, shared-state recovery, performance diagnosis, and
   incident response all require evidence across process boundaries.

The highest-leverage gap from the 2026-08-16 audit was therefore a reproducible
request path with independent router and backend processes, independently scraped
counters, failures at both boundaries, and measured retry recovery. Another
standalone framework repository would not have addressed that evidence gap.

## Public evidence inventory

GitHub's live profile API on 2026-08-31 showed 21 public repositories. The profile
bio names AI infrastructure, GPU performance, secure distributed systems, and
mission software. The six pinned repositories remained
`market-microstructure-engine`, `readiness-control-tower`,
`secure-gpu-inference-gateway`, `triton-kernel-lab`,
`deterministic-inference-scheduler`, and `heterocore-compiler`.

Strongest relevant repositories:

| Repository | Public evidence | Live activity read from GitHub |
|---|---|---:|
| [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark) | Python load generator; open-loop and streaming timing; retry, trace, correctness, regression, GPU/server telemetry, and privacy-safe serving-path gates; deterministic HTTP fixtures and Docker | [`9380387`](https://github.com/WaffleBits/triton-inference-benchmark/commit/9380387f062526d63293c7b3a6b961a86dba3baa), merged 2026-08-31; [post-merge CI passed](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/33367141855) |
| [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway) | Authenticated policy and budget controls, audit evidence, Redis-backed limits, OpenTelemetry/Prometheus, deployment checks, SBOM, and vulnerability gates | pushed 2026-08-04 |
| [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab) | Triton kernels with correctness gates and raw RTX 5070 Ti measurements | pushed 2026-07-30 |
| [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler) | Rust continuous batching, paged KV-cache accounting, replay fingerprints, and release gates | pushed 2026-07-16 |
| [`market-microstructure-engine`](https://github.com/WaffleBits/market-microstructure-engine) | C++20 and Python price-time matching engines with parity tests and a documented local benchmark boundary | pushed 2026-07-24 |

The benchmark is now the most recently updated relevant repository, although it
is not one of the six profile pins. The profile README and Astro portfolio already
linked it; their wording described the earlier single-process counter fixture and
therefore buried the new evidence before this revision.

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

- The benchmark accepts repeated Prometheus endpoints and captures them
  concurrently before and after measured load.
- Its committed CI fixture launches separate router and backend OS processes,
  injects a controlled 503 at each boundary on different logical requests, and
  validates independent ingress/backend/success counters.
- The artifact reports the count of telemetry endpoints, but not their URLs, raw
  responses, selected raw metric names, labels, credentials, prompts, outputs, or
  trace identifiers.
- It reports client-observed latency for requests that eventually succeed after
  retry while explicitly stating that this is not service MTTR.

### Missing

- An orchestrated deployment with a real router, model server, GPU, and isolated
  production-like metrics.
- Multi-node load generation and distributed-clock handling.
- Actual process restart or autonomous remediation measurements; the fixture
  injects HTTP failures but does not restart or heal a service.
- A way to pin the benchmark through the available repository API; GitHub profile
  pins are not changed by this revision.

## Selected implementation

**One gap:** qualify request-path accounting through independent local router and
backend processes in the existing `triton-inference-benchmark`.

The existing repository was the correct home because it already owned the client
attempt count, retry semantics, trace propagation, bounded HTTP telemetry, metric
privacy rules, and exact path gate. Extending those boundaries produces one
inspectable evidence chain; a new repository would duplicate them.

Public implementation: [`9380387`](https://github.com/WaffleBits/triton-inference-benchmark/commit/9380387f062526d63293c7b3a6b961a86dba3baa), merged through [PR #16](https://github.com/WaffleBits/triton-inference-benchmark/pull/16).

The implementation:

- makes `--telemetry-url` repeatable and concurrently scrapes every configured
  source at both benchmark boundaries;
- rejects duplicate endpoints, shares a 10 MiB response budget, and fails closed
  if any source fails or the combined response is oversized;
- records only the endpoint count in summary artifacts, not endpoint URLs or raw
  responses;
- adds a separate local forwarding router and OpenAI-compatible backend fixture;
- injects one router-local 503 and one backend 503 on different logical requests;
- validates six client attempts, six router receipts, five backend receipts, four
  backend successes, and two recovered logical requests for four synthetic
  measured requests;
- verifies unique W3C context on all six client attempts and response continuation
  for successful requests without serializing trace identifiers;
- exports a recovered-request latency distribution labeled as client-observed
  end-to-end time that includes failed attempts, not service MTTR.

### Verification boundary

- TDD began with failing tests for the missing multi-endpoint client and
  recovered-latency summary. The complete suite passed **101 tests** on the host
  and in the repository's Python container.
- The real CLI multi-process fixture passed on the host and in the container. Its
  request-path, retry-amplification, and trace-continuation gates all passed.
- The fixture asserts that raw metric names, labels, telemetry URLs, the backend
  endpoint, prompts, authorization material, and trace identifiers are absent
  from JSON and Prometheus artifacts.
- The Docker image built and completed a non-root packaged mock-CLI smoke run.
- Strict requirement and installed-environment audits in Python 3.12 reported no
  known vulnerabilities. The Oracle Linux host's Python 3.9 cannot resolve the
  pinned urllib3 2.7 wheel, so the supported container—not that incompatible host
  interpreter—was used for the canonical audit.
- Python compilation and `git diff --check` passed.
- [Feature-branch CI](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/33367102909) passed, followed by [post-merge `main` CI](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/33367141855), including the real multi-process CLI step.

The deterministic fixture proves process separation, controlled retry behavior,
and independent local metric sources. It does not prove Kubernetes operation,
production isolation, a real model or GPU, multi-node behavior, autonomous
service recovery, or service MTTR.

## Positioning revision

Only after the supporting implementation was public and post-merge CI passed,
this revision updates the profile README, Astro portfolio data, repository
description, and one-page resume. The wording names separate **local fixture
processes**, labels the workload **synthetic**, and keeps aggregate counter
agreement distinct from per-request causality.

## Highest remaining gap

The highest remaining gap is to run this same multi-source path qualification in
an authorized orchestrated environment with a real inference router and model
server, isolated metrics, GPU execution, and controlled service lifecycle events.
Until that exists, the public evidence should continue to be described as a
synthetic single-host qualification rather than production operations or MTTR.
