# Market alignment audit — 2026-09-09

## Scope and source policy

This audit used current primary company job-board feeds and live GitHub evidence.
The four listings below were active in the companies' official Greenhouse feeds
on 2026-09-09. Greenhouse exposed `updated_at`, not a distinct publication date,
so the table labels that value as the feed update date. Compensation is copied
from each posting; no equity value or total compensation is inferred.

These listings include senior and staff responsibilities and production-scale
systems. They show market demand, not a claim that this portfolio demonstrates
the listed level, fleet size, or operating scale.

## Current role evidence

| Role | Official URL | Feed update date | Published compensation | Location / constraints | Representative requirements |
|---|---|---:|---|---|---|
| Staff + Senior Software Engineer, Inference Infrastructure | https://job-boards.greenhouse.io/anthropic/jobs/5245851008 | 2026-09-03 | `$320,000—$485,000 USD` annual salary | San Francisco, New York City, or Seattle; Anthropic states at least 25% office time | High-performance distributed inference; request routing, load balancing, traffic management, autoscaling, orchestration, deployment pipelines, Kubernetes/cloud infrastructure, observability, Python or Rust |
| Performance Engineer, Inference Systems | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | 2026-08-21 | `$350,000—$850,000 USD` annual salary | San Francisco, New York City, or Seattle; Anthropic states at least 25% office time | Cross-layer throughput, latency, reliability, and correctness investigations; profiling and root cause analysis; Python and data analysis; distributed telemetry; routing, autoscaling, capacity, and tail latency |
| Staff Software Engineer, AI Reliability | https://job-boards.greenhouse.io/anthropic/jobs/5113224008 | 2026-08-21 | `$325,000—$485,000 USD` annual salary | San Francisco, New York City, or Seattle; Anthropic states at least 25% office time | End-to-end serving-path reliability; SLOs; monitoring and observability; multi-region availability; incident response; distributed systems; chaos engineering and resilience testing |
| AI Infrastructure Systems Engineer | https://job-boards.greenhouse.io/togetherai/jobs/5138540007 | 2026-09-08 | `$190,000 - $270,000 + equity + benefits` US base salary | San Francisco; the feed did not expose a remote option | Fleet automation; deployment, monitoring, diagnosis, remediation, and validation; distributed systems; Python, Go, or Rust; Linux, Kubernetes, Terraform or Ansible; performance and reliability |

The Anthropic postings list no deadline and state that applications are reviewed
on a rolling basis. The Together AI feed did not expose a deadline.

## Recurring requirements

1. **Distributed serving and infrastructure systems** appear in all four roles,
   from request routing and load balancing to end-to-end reliability and GPU-fleet
   automation.
2. **Performance and reliability must be inspectable.** Throughput, latency,
   correctness, tail behavior, monitoring, diagnosis, incident response, and
   failure remediation recur throughout the set.
3. **Coordination across components or fleet boundaries** is explicit through
   traffic management, autoscaling, multi-region availability, orchestration,
   and fleet-wide validation.
4. **Evidence-driven engineering** recurs as cross-layer telemetry analysis,
   correctness gates, SLOs, root-cause investigation, and systematic resilience
   testing.
5. **Python systems work** appears in three listings; Rust appears in two, while
   Kubernetes/cloud or infrastructure automation appears in two.

The benchmark already measured one client process and a supervised local service
lifecycle, but it could not coordinate and reconcile independent load-generator
processes. That was the highest-leverage gap that could be closed honestly on the
available host without claiming a distributed fleet.

## Public evidence inventory

GitHub's live APIs on 2026-09-09 showed 21 public repositories. The profile bio
names AI infrastructure, GPU performance, secure distributed systems, and mission
software. The six pinned repositories were `market-microstructure-engine`,
`readiness-control-tower`, `secure-gpu-inference-gateway`, `triton-kernel-lab`,
`deterministic-inference-scheduler`, and `heterocore-compiler`.

Strongest relevant repositories:

| Repository | Public evidence | Live state read from GitHub |
|---|---|---|
| [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark) | Python load generator with real Triton/OpenAI client paths, open-loop pacing, retry and trace gates, privacy-safe path/lifecycle telemetry, supervised restart qualification, and same-host multi-process coordination | [`86f5326`](https://github.com/WaffleBits/triton-inference-benchmark/commit/86f53265ca76499ee73ce55ca03d2d1ac833f3c1), merged 2026-09-09 through [PR #18](https://github.com/WaffleBits/triton-inference-benchmark/pull/18); [post-merge CI passed](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/34343841296) |
| [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway) | Authenticated policy and budget controls, Redis-backed limits, audit evidence, Prometheus/OpenTelemetry, deployment checks, SBOM, and vulnerability gates | Default-branch CI and supply-chain workflows were successful on the live pinned commit; pushed 2026-08-04 |
| [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab) | Triton kernels with FP32 correctness gates and raw RTX 5070 Ti measurements | Default-branch CI was successful on the live pinned commit; pushed 2026-07-30 |
| [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler) | Rust continuous batching, paged KV-cache accounting, deterministic replay, backend adapter, and promote/hold/rollback gates | Default-branch CI was successful on the live pinned commit; pushed 2026-07-16 |
| [`market-microstructure-engine`](https://github.com/WaffleBits/market-microstructure-engine) | C++20 and Python price-time matching engines with parity tests and a documented local benchmark boundary | Default-branch CI was successful on the live pinned commit; pushed 2026-07-24 |

The benchmark is the most recently updated relevant repository, but it is not one
of the six profile pins. Before this revision, the profile README, portfolio data,
site index, and resume surfaced the supervised restart fixture but not the new
coordinated-client evidence.

## Evidence map

### Already demonstrated

- Python model-serving benchmarks with real CLIs, deterministic fixtures, tests,
  CI, Docker, JSON, and Prometheus artifacts.
- Open-loop request pacing, streaming timing, retry accounting, W3C trace
  continuity, correctness checks, regression gates, and bracketed server telemetry.
- A separate router/backend/supervisor fixture with request-path and completed
  lifecycle-restart gates.
- Triton GPU kernels with explicit correctness and measurement boundaries.
- Rust continuous batching and KV-cache scheduling with deterministic replay.
- Model-serving access controls, observability, deployment checks, and resilience
  evidence in the gateway.

### Present but buried before this positioning revision

- `coordinated_benchmark.py` launches independent benchmark CLI processes against
  one future start on the same host.
- Child results retain only a run fingerprint, configuration fingerprint, numeric
  client index/count, and measured wall-clock window for coordination.
- The aggregate rejects missing/duplicate clients, configuration or planned-start
  disagreement, excessive measured start skew, and non-overlapping windows.
- Aggregate request and retry counts reconcile across clients, while successful
  completion throughput uses the union of their measured windows.
- Child percentile summaries are explicitly not merged or relabeled as global
  latency percentiles.
- Aggregate artifacts omit child paths, endpoints, prompts, outputs, raw run IDs,
  and trace identifiers. Shared server-counter windows are rejected because they
  cannot be attributed honestly to individual clients.

### Missing

- Authenticated agents on multiple hosts and an explicit cross-host clock-quality
  protocol.
- Network-fault handling and coordinator recovery across host boundaries.
- An authorized orchestrated router/model-server/GPU deployment with isolated
  production-like telemetry.
- Fleet-scale routing, autoscaling, multi-region, or incident-operation evidence.
- A way to pin the benchmark through the available repository API.

## Exactly one selected gap

**Coordinate and reconcile independent benchmark client processes on one host.**

The existing `triton-inference-benchmark` repository was the correct home because
it already owned request execution, open-loop pacing, retries, trace propagation,
artifact privacy, and benchmark semantics. A new repository would have duplicated
those controls and weakened the evidence chain.

The implementation was planned in
[`docs/plans/2026-09-08-coordinated-multi-client-load.md`](https://github.com/WaffleBits/triton-inference-benchmark/blob/main/docs/plans/2026-09-08-coordinated-multi-client-load.md),
implemented on the feature branch, reviewed and tested locally, merged without a
force push through [PR #18](https://github.com/WaffleBits/triton-inference-benchmark/pull/18),
and read back from public `main` at
[`86f5326`](https://github.com/WaffleBits/triton-inference-benchmark/commit/86f53265ca76499ee73ce55ca03d2d1ac833f3c1).

The selected change:

- adds a same-host coordinator for independent `benchmark.py` processes;
- assigns one future wall-clock start and validates a complete client set;
- fingerprints the run and persisted child configuration without retaining the
  raw run ID;
- aggregates reconciled request/retry counters and completion throughput over the
  union of measured client windows;
- fails closed on start-skew or window-overlap violations;
- refuses to manufacture global latency percentiles from child quantiles; and
- excludes paths, endpoints, prompts, outputs, and trace IDs from the aggregate.

## Verification boundary and results

- Host Python 3.9: **113 tests passed**.
- `python:3.13-bookworm`: **113 tests passed**.
- The real two-client CLI fixture completed 8/8 requests with 8 distinct valid
  trace contexts. This audit's rerun observed `0.438644 ms` start skew and
  `0.152522 s` overlap; the coordination and trace gates passed.
- The existing supervised lifecycle fixture also passed: 6 ingress attempts, 5
  backend receipts, 4 completions, 2 retry recoveries, and 1 completed restart.
- Python compilation and `git diff --check` passed.
- Docker rebuilt image
  `sha256:3463562339434e032ef8caf91ba97f0f0562b5926ac320013a9a77ada897df01`.
  Its default mock CLI completed 8/8 requests as UID 10001. A packaged three-client
  coordinator smoke run completed 18/18 requests with overlapping windows and a
  passing gate; that run observed `0.109841 ms` start skew.
- `pip-audit 2.9.0 --strict -r requirements.txt` in `python:3.13-bookworm`
  reported no known vulnerabilities.
- [Feature-branch CI](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/34221527387)
  passed, followed by [post-merge `main` CI](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/34343841296).
- GitHub's public contents API returned `coordinated_benchmark.py` and the updated
  README from `main`; repository metadata was read back with the new restrained
  description.

The deterministic fixture proves same-host process launch, common-start metadata,
complete-client/configuration reconciliation, bounded start skew, overlapping
windows, aggregate counts, and artifact redaction. It does not prove multi-node
load, cross-host clock synchronization, a real model or GPU, production isolation,
server-counter attribution across clients, or fleet-scale performance.

## Positioning revision

Only after the supporting source was on public `main` and post-merge CI passed,
this revision updates the profile README, Astro project index/data, repository
description, and one-page resume. The wording says **same-host**, **independent
client processes**, and **deterministic local SSE fixture**. It does not call the
fixture distributed load or claim that child latency quantiles form a global
percentile.

The first clean dependency install exposed five current advisories (four high and
one critical) in the prior lockfile, including Astro, `fast-uri`, `js-yaml`,
`sharp`, and `svgo`. The lockfile was refreshed within the existing declared
ranges; it now resolves Astro 7.3.2, `fast-uri` 3.1.7, `js-yaml` 4.3.2, `sharp`
0.35.4, and `svgo` 4.1.0. No dependency range was widened.

### Profile verification

A clean ephemeral source copy was exercised in `node:24-bookworm` because the
Oracle Linux 7 host Node binary is incompatible with glibc 2.17:

- `npm ci`: 267 packages installed; the install audit reported zero
  vulnerabilities.
- `npm audit --audit-level=high`: zero vulnerabilities.
- `npm run check`: 11 files checked, zero errors, warnings, or hints.
- `npm run build`: one static page built successfully.
- Rendered output validation found all four required artifacts, all eight checked
  strings and links, correct `/WaffleBits/` asset bases, no welded asset path,
  and no rendered em dash; `dist/index.html` was 18,896 bytes in that build.
- The regenerated resume was 4,775 bytes and `pypdf` verified one page. Extracted
  text contains the same-host coordination, two-client/eight-request boundary,
  false-global-percentile refusal, clearance, and GitHub link.
- `git diff --check` passed for all text changes; the binary PDF was excluded
  from that text-only whitespace check.

## Highest remaining gap

The highest remaining gap is authenticated multi-node coordination with an
explicit clock-quality protocol, network-fault handling, and an authorized
orchestrated inference deployment with isolated router/model-server/GPU telemetry.
Until that evidence exists, public claims should remain limited to deterministic
same-host process coordination.
