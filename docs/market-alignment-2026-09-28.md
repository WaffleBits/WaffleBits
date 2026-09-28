# Market alignment and evidence update - 2026-09-28

## Official role sample

The following active listings were read directly from official Ashby or Greenhouse
posting pages on 2026-09-28. Publication fields and compensation are copied from
the pages. No closing dates were exposed, and equity is not converted into total
compensation.

| Role | Canonical listing | Published / updated | Compensation as listed | Location / remote constraint | Repeated requirements relevant here |
|---|---|---:|---|---|---|
| OpenAI, Software Engineer, GPT Infrastructure | https://jobs.ashbyhq.com/openai/f3ddd41c-541f-485e-90d6-86c26e018e9f | 2026-04-27 / not separately exposed | `$293K – $385K • Offers Equity` | San Francisco, California; applicant location requirement United States; the structured posting exposes `TELECOMMUTE` as its job-location type | Distributed systems and infrastructure platforms; Python, C++, Go, or Rust; APIs, job orchestration, durable workflows, retries, checkpointing, budgets, observability, secure execution, correctness/performance evaluation, artifact management, provenance, and regression testing |
| OpenAI, Software Engineer, Model Runtime | https://jobs.ashbyhq.com/openai/ec317080-e2d2-4a73-93e6-e0a9ae6fdf96 | 2026-08-24 / not separately exposed | `$266K – $445K • Offers Equity` | San Francisco, California; applicant location requirement United States; the structured posting exposes `TELECOMMUTE` as its job-location type | C++, Rust, Python, or comparable systems programming; LLM runtime, continuous batching, memory and KV-cache management, distributed execution, latency/throughput/utilization, profiling, observability, correctness, reliability, and graceful behavior |
| Cohere, Senior Software Engineer, GPU Infrastructure (HPC) | https://jobs.ashbyhq.com/cohere/ef9b939d-da66-464c-a878-ef45616c0473 | 2026-09-03 / not separately exposed | Canada: `CA$285K – CA$340K • Offers Equity`; USA California/New York/Washington: `Base Salary $235K – $285K • Offers Equity`; all other USA states: `Base Salary $200K – $240K • Offers Equity` | Canada primary and United States secondary; applicant locations United States and Canada; the structured posting exposes `TELECOMMUTE`; the listing explicitly requires a 24x7 on-call rotation | Kubernetes GPU/TPU superclusters across clouds; Python and Go; JAX/PyTorch/TensorFlow; Linux, RDMA, NCCL, high-speed interconnects; stability, scalability, observability, automation, infrastructure-as-code, troubleshooting, and researcher self-service |
| Figma, IT Engineer, Internal AI Infrastructure | https://boards.greenhouse.io/figma/jobs/6164379004?gh_jid=6164379004 | first published 2026-08-27 14:11:40 -04:00; updated field not separately exposed | `$153,000 - $269,000 USD` annual base salary | San Francisco, CA; New York, NY; United States, as shown in the listing location field | Internal AI hosting and long-running/scheduled agent execution; model routing by cost, capability, and policy; telemetry, usage analytics, audit logging, cost attribution; identity/access and security; resilient observable production systems; MCP or agent orchestration familiarity |

The repeated signal is a systems boundary: qualification and runtime behavior must
connect to measurable performance, reliability, security, cost, observability, and
reviewable provenance. The strongest missing public evidence is not another
benchmark number; it is a verifiable link between saved qualification output and
the exact ordered artifacts that produced it.

## Live public evidence inventory

The authenticated GitHub account `WaffleBits` was read through the GitHub API on
2026-09-28:

- The account exposes 21 public repositories. The profile repository is
  `https://github.com/WaffleBits/WaffleBits`, a TypeScript/Astro site described as
  `Portfolio: platform security and AI infrastructure engineering`, with Pages at
  `https://wafflebits.github.io/WaffleBits/`.
- The strongest relevant public repositories are `triton-inference-benchmark`
  (Python serving benchmark, authenticated agents, lifecycle and recovery
  fixtures), `secure-gpu-inference-gateway` (access control, budgets, audit, and
  telemetry), `deterministic-inference-scheduler` (Rust batching/KV-cache replay
  and release gates), `triton-kernel-lab` (Triton correctness/performance
  artifacts), `market-microstructure-engine` (C++20/Python parity), and
  `readiness-control-tower` (synthetic operational dashboard).
- Before this change, the profile `main` branch was at
  `50e0999ea0f3ae1af63e136b1ad0b4bfea1ab059` and its Pages workflows were green.
  The public benchmark was at
  `bdf03183082f627d904b947f42c004ec3dedc317`; its prior main CI was green.
- The benchmark's new public merge is PR [#26](https://github.com/WaffleBits/triton-inference-benchmark/pull/26),
  merge commit
  [`ec7707e`](https://github.com/WaffleBits/triton-inference-benchmark/commit/ec7707e728d03c63c77a5533a6a9cdefe5d14b6e).

### Evidence map

**Already demonstrated:**

- Privacy-safe benchmark summaries and adjacent-run regression gates for p95
  latency, throughput, success rate, and client-attempt amplification.
- Authenticated agents, explicit TLS CA trust, clock uncertainty bounds, completed
  result recovery, coordinator restart reconciliation, and redacted JSON/Prometheus
  artifacts in deterministic loopback fixtures.
- Controlled local process-launch-to-loopback-health qualification with a shell-free
  command boundary.
- Rust continuous batching and paged KV-cache scheduling with replay/release
  evidence; Triton GPU kernel correctness and measured latency; Python/C++20
  matching-engine parity; gateway access-control and observability controls.

**Present but buried:**

- `benchmark_report.py` already re-derived privacy-safe headline values from saved
  runs, but the report did not bind itself to the exact input bytes or expose a
  verification command.
- The profile README and Astro page already exposed benchmark, lifecycle, and
  recovery evidence, but did not surface a content-addressed qualification record.

**Missing and not claimed:**

- Production-scale multi-host operation, physical-host identity, real GPU/TPU
  cluster ownership, model or accelerator cold-start timing, interrupted-child
  continuation, 24x7 production on-call, enterprise adoption, and production SLOs.
- Go/Kubernetes supercluster operation and RDMA/NCCL fleet evidence remain gaps in
  the public portfolio. The selected change does not imply any of them.

## Exactly one selected gap

**Make saved benchmark qualification evidence content-addressed and verifiable in
the existing `triton-inference-benchmark` repository.**

This is one bounded provenance and artifact-management change. The new CLI
re-derives the saved trend report from the ordered input artifacts before creating
a manifest, records only SHA-256 digests, byte counts, run indexes, bounded schema
metadata, and gate status, and verifies the same later. `--require-pass` rejects a
report whose configured regression gate failed. The manifest does not serialize
paths, prompts, endpoints, credentials, outputs, or raw telemetry and does not
claim target-system or production identity.

## Implementation and verification

The implementation was completed in the existing benchmark repository rather than
creating a duplicate project:

- `qualification_manifest.py` adds `create` and `verify` commands, safe report
  re-derivation, exact-byte hashing, fail-closed policy checks, and bounded output.
- `tests/test_qualification_manifest.py` covers privacy, report reconstruction,
  whitespace tampering, and failed-regression rejection.
- `tests/run_qualification_manifest_fixture.py` runs two real mock benchmarks, the
  existing trend-report CLI, manifest creation with `--require-pass`, verification,
  and a tampered-artifact rejection through subprocesses.
- `README.md`, `DESIGN.md`, and
  `docs/plans/2026-09-28-content-addressed-qualification.md` document the
  workflow and its evidence boundary.
- `.github/workflows/ci.yml` runs the new fixture as part of the repository's
  existing test job.

Local checks passed before publication:

- `python -m unittest discover -s tests` - 149 tests passed.
- `python tests/run_qualification_manifest_fixture.py` - passed, including real
  CLI creation, verification, privacy assertions, and tamper rejection.
- `python -m compileall -q benchmark.py benchmark_report.py qualification_manifest.py lifecycle_qualification.py remote_agent.py coordinated_benchmark.py tests` - passed.
- `git diff --check` - passed.

The pull-request workflow passed in
[run 36414001299](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/36414001299).
The post-merge `main` workflow passed in
[run 36414084754](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/36414084754)
at merge commit `ec7707e`.

## Profile publication scope

After the benchmark merge and green main CI, this profile change surfaces the
public evidence without changing the resume or inventing a production claim:

- `README.md` adds the public qualification-manifest behavior to the benchmark
  entry.
- `src/data/portfolio.ts` adds one verification-index row and extends the existing
  benchmark evidence boundary.
- `src/data/site.ts` adds the same capability to the selected-work summary.
- `.github/workflows/pages.yml` asserts the new row and 13-row proof ledger after
  the production build.
- This report records the source research and publication sequence.

The Astro host Node binary is incompatible with Oracle Linux 7 glibc 2.17, so the
profile checks were reproduced in clean `node:24-bookworm` containers with
owner-writable generated directories and an ephemeral source copy:

- Node `v24.18.0`; npm `11.16.0`.
- `npm ci` passed; 267 packages were installed.
- `npm audit --audit-level=high` passed at the requested threshold. npm reported one existing **moderate** `devalue <5.9.1` advisory (`GHSA-9rgm-9g3h-6x36`) and no high-severity finding. This remains a disclosed dependency follow-up, not a clean-audit claim.
- `npm run check` passed with 0 errors, 0 warnings, and 0 hints.
- `WB_BASE=/WaffleBits npm run build` passed; one static page was generated.
- Rendered-output validation passed: 29,923-byte HTML, 13 proof rows, six capability rows, the new manifest link, base-path assets, prior project links, and no em dash.
- `npm run preview -- --host 127.0.0.1 --port 4321` was exercised at `http://127.0.0.1:4321/WaffleBits/`: HTTP 200 and 29,923-byte response with the new evidence.
- The unchanged `public/assets/AdnanBerik-Resume.pdf` was inspected with `pypdf`: one page, 4,849 bytes, 3,757 extracted characters, and the identity, `TS/SCI`, and GitHub fields present. The extracted name is line-safe uppercase `ADNAN BERIK`.
- The repository's rendered-output assertions from `.github/workflows/pages.yml` also passed in `node:24-bookworm`.
- `git diff --check` passed for the tracked text changes.

The profile branch is ready for the branch/PR/Pages publication sequence. The
remote profile commit and live Pages read-back are recorded after that sequence;
no publication is claimed before those checks pass.

## Remaining gap

The public portfolio now shows a reproducible provenance boundary for synthetic
qualification artifacts. It still does not demonstrate physical multi-host
coordination, real GPU-cluster operation, interrupted-child continuation, model or
accelerator cold-start timing, 24x7 production on-call, enterprise adoption, or a
production SLO.
