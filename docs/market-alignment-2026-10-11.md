# Market alignment and lifecycle-cancellation evidence - 2026-10-11

## Current official role sample

Listings were checked against official company career pages and job-board APIs on 2026-10-11. The OpenAI Ashby feed marked its posting listed; both Anthropic roles appeared in the Greenhouse feed. Dates below are the feeds' first-publication and update timestamps. Compensation is recorded as published, without converting equity to cash.

| Role | Canonical listing | Published / updated | Compensation as listed | Location / work mode | Recurring requirements relevant here |
|---|---|---|---|---|---|
| OpenAI, Software Engineer, Inference - Performance Optimization | https://jobs.ashbyhq.com/openai/85fceac9-fb8a-4d71-a524-a8e5f1e9b01b | Published 2026-04-25 02:24:38 UTC in Ashby feed; listing still visible on 2026-10-11 | `$266K – $500K • Offers Equity` | San Francisco; full-time; no remote classification exposed | Cross-layer profiling and benchmarking; performance models; latency, throughput, capacity, utilization, and cost analysis. |
| Anthropic, Performance Engineer, Inference Systems | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | Published 2026-05-20 18:53:11 -04:00; updated 2026-08-21 12:50:15 -04:00 | `Annual Salary: $350,000 — $850,000 USD` | San Francisco, New York City, or Seattle; Greenhouse location type is On-Site; company policy says at least 25% office time | Python; performance, reliability, and correctness investigations; observability and regression evaluation across serving configurations. |
| Anthropic, Performance Engineer, Inference Engine | https://job-boards.greenhouse.io/anthropic/jobs/5418323008 | Published 2026-09-09 19:09:53 -04:00; updated 2026-09-09 19:09:53 -04:00; listing still visible on 2026-10-11 | `Annual Salary: $350,000 — $850,000 USD` | San Francisco or New York City; Greenhouse location type is On-Site; company policy says at least 25% office time | Rust/C++/systems programming; measure before change; throughput/latency/cost/reliability; determinism, replay, and tests. |

The sample reinforces measurable reliability and correctness, repeatable testing, and systems behavior. It does not establish that these listings are an individual fit or that public fixtures represent production operations.

## Live public evidence inventory

The authenticated GitHub API confirms `WaffleBits` has 21 public repositories. Its profile repository is the TypeScript/Astro site at https://github.com/WaffleBits/WaffleBits. Its root README summarizes the AI infrastructure, security, systems, and mission projects.

The strongest directly relevant repository is [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark), a public Python serving benchmark with authenticated agents, TLS, restart-reconciliation fixtures, privacy-safe artifacts, and controlled local lifecycle tests. The source is now public at commit [`6db3a0d`](https://github.com/WaffleBits/triton-inference-benchmark/commit/6db3a0da465e0151b8eb86cd289187fbe4284339); PR [#28](https://github.com/WaffleBits/triton-inference-benchmark/pull/28) merged after PR CI passed, and post-merge main CI [run 38134745823](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/38134745823) passed. The merged test interrupts a held-open local benchmark request with SIGINT and SIGTERM, checks child/service-group cleanup, conventional 130/143 exit statuses, and absence of a success report.

Before this update, the Astro profile had 16 proof rows, including lifecycle readiness and streaming-usage validation, but did not surface the new cancellation fixture directly. Other relevant repositories already cover Rust scheduler replay, Triton kernels and correctness oracles, and gateway security/observability; no additional repository is warranted.

## Evidence map

**Already demonstrated:** the public benchmark implementation handles SIGINT/SIGTERM at safe checkpoints, shuts down the benchmark child and controlled service process group, exits with `128 + signal`, and has deterministic Python 3.13 CI fixtures for both signals. Source evidence is public and its post-merge CI passed.

**Present but buried before this update:** the profile linked controlled lifecycle readiness and described other benchmark gates, but its proof index, evidence manifest, rendered contract, and profile README did not point to the cancellation fixture.

**Missing and not claimed:** remote-agent cancellation/recovery, partial-workflow continuation, cross-host process supervision, production service recovery, model/GPU lifecycle measurements, and production SLOs.

## Exactly one selected gap

**Surface the newly merged lifecycle-cancellation behavior in the existing Astro profile and one-page technical resume.** The profile will add one typed proof row, extend the benchmark case-file evidence sentence and root README entry, and update the exact proof-count/link/privacy assertions. The resume will add one boundary-aware clause to its existing benchmark bullet and be rebuilt/checked as a one-page PDF. This will not claim remote or production recovery, add a repository, or change other resume experience.

## Implementation and acceptance plan

1. Add a proof row linking to the exact public `tests/run_lifecycle_signal_fixture.py` source and stating the SIGINT/SIGTERM, cleanup, exit-status, no-success-report, and single-host boundaries.
2. Update the benchmark project evidence sentence and root README entry with that same tested scope.
3. Extend `scripts/validate-evidence.mjs`, `scripts/validate-rendered.mjs`, and `.github/workflows/pages.yml` for the 17-row proof ledger and exact cancellation link/claim boundary.
4. Rebuild `public/assets/AdnanBerik-Resume.pdf` with `python3 scripts/build_resume.py`; verify exactly one page and extracted text containing the tested SIGINT/SIGTERM cancellation claim and evidence boundary.
5. In an ephemeral `node:24-bookworm` source copy, run `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, `npm run test:evidence`, `npm run test:rendered`, inspect rendered page/manifest and preview HTTP responses, and run `git diff --check`.
6. Commit/push only the scoped profile/resume/report changes after all checks pass. Require Pages build and post-merge build/deploy to pass; then read back merged source, live page, manifest, resume, and deployment status.

## Results

- Source implementation: PR [#28](https://github.com/WaffleBits/triton-inference-benchmark/pull/28) merged at `6db3a0da465e0151b8eb86cd289187fbe4284339`; required PR checks and post-merge [CI run 38134745823](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/38134745823) succeeded. Public source read-back confirms the referenced signal fixture is available on `main`.
- Resume: rebuilt with `python3 scripts/build_resume.py`; `pypdf` extracted 3,874 normalized text characters from exactly one page and confirmed the cancellation behavior and evidence boundary.
- Astro site: reproduced in a disposable copy with `node:24-bookworm` (`node v24.18.0`, npm 11.16.0). `npm ci` passed; `npm audit --audit-level=high` reported 0 vulnerabilities; `npm run check` reported 0 errors, warnings, or hints; `WB_BASE=/WaffleBits npm run build`, `npm run test:evidence`, and `npm run test:rendered` passed. Artifact assertions confirmed 17 proof items, 6 capabilities, 7 projects, and the rebuilt resume copied unchanged.
- Runtime: Astro preview returned HTTP 200 for `/WaffleBits/` and `/WaffleBits/evidence.json`; the served manifest contained 17 proof items. Text-file `git diff --check` passed; the binary PDF path was excluded because whitespace checks are not meaningful for a PDF. The live Pages PR/deployment result is reported separately after read-back.

## Remaining evidence boundary

The public cancellation artifact is deterministic, single-host process-cleanup evidence. It does not demonstrate cancellation/recovery of remote agents, durable in-flight work, cross-host process supervision, production service recovery, model/GPU lifecycle measurements, or production SLOs.
