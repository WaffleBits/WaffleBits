# Plan: surface failure-mode evidence

Date: 2026-10-01 (America/New_York)
Repository: `WaffleBits/WaffleBits`
Branch: `feat/surface-resilience-evidence-20261001`

## Role signal from primary listings

I fetched these active official Ashby postings on 2026-10-01. The dates and compensation below are copied from the posting data. Equity is not converted into total compensation, and no closing dates were exposed.

| Role | Canonical listing | Published | Compensation as listed | Location / work mode |
|---|---|---:|---|---|
| Hedra, Senior/Staff Software Engineer, Distributed Systems | https://jobs.ashbyhq.com/hedra/da0ed497-8952-4dea-8057-91c32de437f5 | 2026-05-21 | `Estimated Base Salary $175K – $275K • Offers Equity and Comprehensive Benefits Package` | San Francisco, California; in person five days a week |
| fomo Labs, Staff Distributed Systems Engineer | https://jobs.ashbyhq.com/fomo-labs/8ad45fa9-6fbc-455d-8c0b-4ab8bc99b8c8 | 2026-08-31 | `$300K – $500K • Offers Equity` | New York City; work mode not exposed in the posting data |
| LiveKit, Staff Software Engineer, Distributed Systems | https://jobs.ashbyhq.com/livekit/b278b3c7-f9cd-4564-9c6b-ee655de75039 | 2026-07-23 | `$135K – $300K • Offers Equity` | North America; structured posting exposes `TELECOMMUTE`; APJ and EMEA are secondary locations |

Across the sample, the recurring requirement is not another isolated benchmark number. These roles ask engineers to reason about partial failure and unpredictable load, define mitigation or failover paths, operate systems end to end, and connect metrics, tracing, testing, rollout gates, and incident response to a reviewable decision. Hedra names deployment, CI/CD, validation, observability, monitoring, alerting, debugging, and incident response. fomo Labs emphasizes multi-region failure handling, backpressure, load shedding, bounded retries, failover and disaster recovery. LiveKit emphasizes region-spanning partial failure, metrics, tracing, testing, and distributed state.

## Public evidence inventory

The authenticated `WaffleBits` account was read through the GitHub API before implementation. It exposes 21 public repositories. The profile repository is the TypeScript/Astro site at https://github.com/WaffleBits/WaffleBits, published at https://wafflebits.github.io/WaffleBits/. The current public `main` commit was `ee506d6` and the Pages workflow was green in run `36707049664`.

The strongest relevant repositories remain:

- `secure-gpu-inference-gateway`: public Python gateway with access control, budgets, audit and telemetry controls, deployment posture checks, and a checked `artifacts/resilience-drill-evidence.json` artifact.
- `triton-inference-benchmark`: authenticated serving benchmark with explicit TLS trust, restart reconciliation, lifecycle qualification, privacy-safe aggregates, and content-addressed qualification evidence.
- `deterministic-inference-scheduler`: Rust scheduler with replayable traces and promote/hold/rollback release gates.
- `triton-kernel-lab`: Triton kernels with correctness oracles, measured latency artifacts, and regression checks.
- `market-microstructure-engine`: C++20/Python matching-engine parity and latency artifacts.

The profile's typed `caseFiles` already say that the gateway has incident runbooks and shadow/canary/staged rollout gates. The public gateway README and artifact go further: its synthetic resilience drill covers backend latency spikes, backend error bursts, queue saturation, and audit-sink backpressure, with detection signals, mitigation paths, rollback actions, recovery thresholds, and privacy exclusions. The profile's 13-entry proof ledger does not link that artifact directly, so the strongest failure-mode evidence is present but buried.

### Evidence map

**Already demonstrated:**

- Public gateway code, tests, runbooks, deployment posture checks, and the checked synthetic resilience artifact.
- Four named failure scenarios with pass/hold thresholds, explicit mitigation and rollback paths, and a public-safe artifact boundary.
- Benchmark restart reconciliation, lifecycle qualification, content-addressed provenance, Rust release gates, and GPU/kernel correctness artifacts.

**Present but buried:**

- The gateway project record mentions incident runbooks and rollback, but a reviewer has no direct profile proof row to the exact resilience artifact.
- The existing machine-readable `evidence.json` contract already derives from the proof ledger, so one verified source entry can reach the page and JSON without a new schema or repository.

**Missing and not claimed:**

- Real multi-region failover, production disaster recovery, physical multi-host behavior, customer traffic, production incident response, 24x7 on-call, and production SLOs remain outside the public evidence boundary.
- The synthetic drill is not a claim that the gateway operates a live GPU fleet or that its recovery seconds generalize to production.

## Exactly one selected gap

**Surface the existing synthetic failure-mode drill as a direct, boundary-aware verification item in the WaffleBits profile.**

This is one evidence-discoverability change. It will add one typed proof entry pointing to the public gateway artifact, update the existing gateway project evidence sentence and profile README entry, and extend the existing rendered and JSON contract checks. It will not add a repository, metric, technology, production claim, resume claim, or new resilience implementation.

## Implementation plan

1. Add one `verified` proof entry in `src/data/portfolio.ts` linking to the exact public resilience artifact and stating the four scenarios, mitigation/rollback coverage, synthetic scope, and privacy boundary.
2. Update the gateway `caseFiles` evidence sentence and the root README's gateway entry to surface the same already-published artifact without changing its claim boundary.
3. Update `scripts/validate-evidence.mjs`, `scripts/validate-rendered.mjs`, and `.github/workflows/pages.yml` for the 14-row proof ledger and the new artifact link/wording.
4. Reproduce the repository checks in an ephemeral `node:24-bookworm` source copy because the Oracle Linux 7 host Node binary cannot start: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, evidence validation, rendered-output validation, preview HTTP read-back, PDF inspection, and `git diff --check`.
5. Commit only the plan, proof/content, validator, and workflow changes. Push without force, open a PR, require the Pages build and deployment workflow to pass, merge only after the relevant checks are green, then read back the merged remote and live page/manifest.

## Local implementation verification

The profile checks were reproduced in a clean, ephemeral `node:24-bookworm` source copy because the Oracle Linux 7 host Node binary is incompatible:

- Node `v24.18.0`; npm `11.16.0`.
- `npm ci` passed; 267 packages were installed.
- `npm audit --audit-level=high` passed at the requested threshold. The audit reported two existing **moderate** advisories: `devalue <5.9.1` (`GHSA-9rgm-9g3h-6x36`) and `fast-uri 3.0.0 - 3.1.7` (`GHSA-hrr3-gc8f-f4qj`). No high-severity finding was reported. This is not a clean-audit claim.
- `npm run check` passed with 0 errors, 0 warnings, and 0 hints.
- `WB_BASE=/WaffleBits npm run build` passed and generated one static page plus `evidence.json`.
- `npm run test:evidence` passed with 14 proof items, 6 capabilities, and 7 projects. The validator checks the exact resilience artifact URL and boundary wording.
- `npm run test:rendered` passed with 30,674-byte HTML, 14 proof rows, the resilience artifact link, six capability rows, seven project records, correct `/WaffleBits/` asset paths, and no em dash.
- A real `astro preview` read-back returned HTTP 200 for `/WaffleBits/` and `/WaffleBits/evidence.json`; the response was 30,674 bytes and the JSON contained 14 proof, 6 capability, and 7 project records.
- The unchanged `public/assets/AdnanBerik-Resume.pdf` was inspected with `pypdf`: 4,849 bytes, one page, 3,757 extracted characters, with `ADNAN BERIK`, `TS/SCI`, and `github.com/WaffleBits` present.
- `git diff --check` passed for the tracked text changes, excluding only the unchanged binary PDF path.

## Publication verification

To be completed after the scoped commit, pull request, green Pages workflow/deployment, remote read-back, and live profile/manifest read-back. The moderate npm advisories above will remain disclosed; no clean-audit claim will be made.

## Remaining gap

The public portfolio will still demonstrate controlled and synthetic failure-mode evidence rather than production multi-region failover, physical fleet operation, production disaster recovery, or a production SLO.
