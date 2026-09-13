# Market alignment audit - 2026-09-13

## Scope and source policy

This audit used current primary company job-board feeds and live GitHub evidence.
All four listings below returned active records from the companies' official
Greenhouse per-job APIs on 2026-09-13. `first_published` and `updated_at` are feed
fields, not inferred dates. Compensation is copied from each posting; equity and
total compensation are not estimated.

These listings include senior and staff responsibilities at production scale.
They show market demand, not a claim that this portfolio demonstrates the listed
level, fleet size, or operating scale.

## Current role evidence

| Role | Official URL | First published | Feed updated | Published compensation | Location / constraints | Representative requirements |
|---|---|---:|---:|---|---|---|
| Anthropic, Software Engineer, Research Infrastructure | https://job-boards.greenhouse.io/anthropic/jobs/5283063008 | 2026-07-06 | 2026-09-09 | `$405,000-$625,000 USD` annual salary | San Francisco or New York City; on-site listing and at least 25% office time | Build and operate distributed research infrastructure; reliability, scalability, cloud infrastructure, infrastructure-as-code, architecture and cross-team delivery |
| Anthropic, Staff + Senior Software Engineer, Inference Infrastructure | https://job-boards.greenhouse.io/anthropic/jobs/5245851008 | 2026-06-08 | 2026-09-03 | `$320,000-$485,000 USD` annual salary | San Francisco, New York City, or Seattle; on-site listing and at least 25% office time | Distributed serving, request routing, load balancing, orchestration, deployment pipelines, Kubernetes/cloud, observability, Python or Rust |
| Anthropic, Performance Engineer, Inference Systems | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | 2026-05-20 | 2026-08-21 | `$350,000-$850,000 USD` annual salary | San Francisco, New York City, or Seattle; on-site listing and at least 25% office time | Cross-layer throughput, latency, reliability and correctness; profiling, telemetry, routing, autoscaling, tail latency, Python and quantitative analysis |
| Together AI, AI Infrastructure Systems Engineer | https://job-boards.greenhouse.io/togetherai/jobs/5138540007 | 2026-05-14 | 2026-09-09 | `$190,000 - $270,000 + equity + benefits` US base salary | San Francisco; the feed did not expose a remote option | Fleet automation, diagnosis and remediation, distributed systems, Python/Go/Rust, Linux, Kubernetes, Terraform or Ansible, GPU availability and reliability |

The three Anthropic postings state that applications are reviewed on a rolling
basis and expose no deadline. The Together AI record exposes no deadline.

## Recurring requirements

1. **Distributed infrastructure is the common systems layer.** All four roles
   cover distributed serving, research infrastructure, or GPU-fleet platforms.
2. **Reliability under partial failure matters alongside performance.** The roles
   repeatedly join availability, remediation, tail latency, correctness, and
   throughput rather than treating benchmark speed as sufficient evidence.
3. **Operational behavior must be inspectable.** Observability, telemetry,
   quantitative root-cause work, validation systems, and clear findings recur.
4. **Automation and orchestration are expected.** Routing, load balancing,
   deployment pipelines, autoscaling, fleet lifecycle work, and
   infrastructure-as-code appear across the set.
5. **Python systems work is broadly relevant.** Python appears explicitly in
   three listings; Rust appears in two, and Kubernetes/cloud or infrastructure
   automation appears in multiple listings.

## Live public evidence inventory

GitHub's live APIs on 2026-09-13 returned 21 public repositories. The profile bio
names AI infrastructure, GPU performance, secure distributed systems, and mission
software. The six pins were `market-microstructure-engine`,
`readiness-control-tower`, `secure-gpu-inference-gateway`, `triton-kernel-lab`,
`deterministic-inference-scheduler`, and `heterocore-compiler`; none was archived
or a fork.

Strongest relevant public evidence inspected:

- [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark):
  Python load generation, real Triton/OpenAI-compatible client paths,
  authenticated coordinator-agent execution, open-loop pacing, clock-quality and
  trace gates, bounded privacy-safe artifacts, Docker packaging, tests, and CI.
- [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway):
  authenticated policy and budget controls, Redis-backed limits, audit evidence,
  Prometheus/OpenTelemetry, deployment checks, SBOM, and vulnerability gates.
- [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab):
  Triton kernels with FP32 correctness gates and raw RTX 5070 Ti measurements.
- [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler):
  Rust continuous batching, paged KV-cache accounting, deterministic replay, and
  promote/hold/rollback gates.
- [`market-microstructure-engine`](https://github.com/WaffleBits/market-microstructure-engine):
  C++20/Python price-time matching engines with parity tests and a bounded local
  performance measurement.

The benchmark is the most recently updated relevant repository and was the right
place to close the selected gap. A new repository would have duplicated its
existing authenticated protocol, benchmark CLI, aggregate semantics, and privacy
controls instead of exercising them under a real failure mode.

## Evidence map

### Already demonstrated before this change

- Authenticated coordinator-to-agent benchmark execution with explicit credential
  selection and a minimal child environment.
- Same-host independent benchmark processes with sampled clock bounds,
  conservative skew/overlap/throughput gates, and eight distinct trace contexts.
- Replay rejection using a hashed run/client identity.
- Real CLI fixtures spanning agent services, benchmark child processes, a
  synthetic SSE target, JSON/Markdown/Prometheus artifacts, and CI.
- Artifact-level exclusions for credentials, URLs, prompts, outputs, child paths,
  and trace identifiers.

### Present but buried before this change

- The hashed run/client identity was already a natural idempotency key.
- The agent already validated a complete bounded request before launching a child.
- Coordinator reconciliation needed only a narrow result projection. The agent
  did not need to retain or return the child's configuration, URL, prompt, output,
  path, trace identifier, or authorization data for recovery.
- The client transport boundary could distinguish an ambiguous connection failure
  from an explicit HTTP protocol or application rejection.

### Missing before this change

If an agent completed its child process but the successful HTTP response was lost,
the coordinator could not distinguish failed execution from failed delivery. A
retry was rejected as a replay, so the completed shard was unavailable and the
coordinated run failed. No public fixture injected that failure or proved that an
identical retry could retrieve the result without running the child twice.

## Exactly one selected gap

**Recover a completed authenticated-agent result after an ambiguous response loss
without re-executing the benchmark child.**

The implementation was planned in
[`docs/plans/2026-09-13-idempotent-agent-result-recovery.md`](https://github.com/WaffleBits/triton-inference-benchmark/blob/main/docs/plans/2026-09-13-idempotent-agent-result-recovery.md),
reviewed and tested locally, merged without a force push through
[PR #20](https://github.com/WaffleBits/triton-inference-benchmark/pull/20), and
read back from public `main` at
[`3730c3c`](https://github.com/WaffleBits/triton-inference-benchmark/commit/3730c3cc4bd3b23cb89ff8969e1592ad69106cec).

The selected change:

- adds a transport-specific error so only ambiguous connection/response failures
  are retried; explicit HTTP rejections remain terminal;
- tracks bounded in-memory run state by hashed run/client identity and canonical
  request fingerprint;
- returns a coordinator-only completed-result projection for an identical retry
  without launching another child;
- rejects conflicting identity reuse, unfinished duplicates, and completed runs
  whose result projection has expired from the bounded cache;
- reports fresh, cached, retried, and transport-recovered result counts without
  exposing agent URLs or request fingerprints in benchmark artifacts; and
- extends the real authenticated-agent fixture with an intermediary that forwards
  one request, discards its successful response, and then permits recovery.

## Implementation verification

The source repository passed its canonical checks before publication:

- Host Python: **123 tests passed**.
- Clean writable `python:3.13-bookworm` copy: **123 tests passed**.
- `run_coordinated_client_fixture.py`, `run_remote_agent_fixture.py`, and
  `run_multi_process_path_fixture.py`: all passed.
- The fault-injected agent fixture completed **8 logical requests, 8 successful
  requests, and 8 unique trace contexts** across two loopback agents. It recorded
  one transport retry and one cached result; the dropped-response, wrong-key, and
  conflicting-replay assertions all passed. Keeping target execution at eight
  requests is the fixture's duplicate-execution check.
- Python compilation and `git diff --check` passed.
- `pip-audit 2.9.0 --strict -r requirements.txt` in
  `python:3.13-bookworm` returned success with no known vulnerabilities.
- The production Docker image built successfully; its default mock CLI and an
  authenticated packaged-agent smoke path completed successfully.
- Feature-branch CI passed before merge. Post-merge
  [`main` CI](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/34754188073)
  passed for commit `3730c3c`.
- GitHub's public contents API returned the implementation, plan, and README from
  `main`; repository metadata was read back with the restrained result-recovery
  description.

The recovery cache stores only the fields needed by coordinator reconciliation,
not the child configuration, target URL, prompt, output, path, trace identifier,
or authorization data. Credentials remain explicitly selected rather than read
from an ambient key. The fixture uses a synthetic local target and loopback
agents; it is protocol and failure-semantics evidence, not a production
performance measurement.

## Positioning revision

Only after the supporting implementation was public and post-merge CI passed,
this repository updated the profile README, Astro portfolio data/index, generated
resume, source-repository description, and rendered-output checks. The wording
states one dropped successful response, one bounded in-memory recovery, eight
target requests, two loopback agents, and the lack of duplicate execution. It
also names the limits: no persistence, separate hosts, production network, or
real-model/GPU measurement is claimed.

Profile verification used a clean owner-writable source copy in
`node:24-bookworm` because this Oracle Linux 7 host's Node binary is incompatible
with glibc 2.17:

- `npm ci`: 267 packages installed; install audit reported zero vulnerabilities.
- `npm audit --audit-level=high`: zero vulnerabilities.
- `npm run check`: 11 files checked with zero errors, warnings, or hints.
- `npm run build`: one static page built successfully.
- Rendered validation found four required artifacts and 15 required strings/links,
  verified `/WaffleBits/` asset bases, and found no welded asset path or rendered
  em dash. `dist/index.html` was 18,914 bytes.
- The regenerated resume was 4,794 bytes. `pypdf` verified one page, and extracted
  text verified the response-loss recovery, no-duplicate-execution boundary,
  eight-request/eight-trace/two-loopback-agent fixture, clearance, and GitHub link.
- `git diff --check` is required before publication, excluding only the binary PDF
  from text whitespace checking.

## Highest remaining gap

The highest remaining gap is **durable recovery across agent or coordinator
process loss, followed by authenticated multi-host execution over a real network**.
That would require persistent idempotency state, an explicit expiry/ownership
model, cross-host clock-quality evidence, and an authorized orchestrated
router/model-server/GPU deployment with isolated telemetry. Until then, public
claims should remain limited to bounded in-memory recovery in a deterministic
same-host synthetic fixture.
