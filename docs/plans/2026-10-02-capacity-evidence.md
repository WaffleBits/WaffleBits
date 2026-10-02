# Plan: surface synthetic capacity evidence

Date: 2026-10-02 (America/New_York)
Repository: `WaffleBits/WaffleBits`
Branch: `feat/surface-capacity-evidence-20261002`

## Role signal from primary listings

I read these active official company listings on 2026-10-02. The dates and compensation below are copied from the listing data. Equity is not converted into total compensation, and no closing dates were exposed.

| Role | Canonical listing | Published | Compensation as listed | Location / work mode |
|---|---|---:|---|---|
| OpenAI, Software Engineer, Inference - Performance Optimization | https://jobs.ashbyhq.com/openai/85fceac9-fb8a-4d71-a524-a8e5f1e9b01b | 2026-04-25 | `$266K – $500K • Offers Equity` | San Francisco, California; full-time; the structured listing exposes San Francisco as the job location |
| Anthropic, Performance Engineer, Inference Systems | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | 2026-05-20 18:53:11 -04:00 | `$350,000 - $850,000 USD` annual salary | San Francisco, CA; New York City, NY; Seattle, WA; Anthropic states that staff are expected in an office at least 25% of the time, with some roles requiring more |
| LiveKit, Staff Software Engineer, Distributed Systems | https://jobs.ashbyhq.com/livekit/b278b3c7-f9cd-4564-9c6b-ee655de75039 | 2026-07-23 | `$135K – $300K • Offers Equity` | North America / NAMER; `TELECOMMUTE`; APJ and EMEA are secondary applicant regions |

The repeated signal is a measurable systems boundary. OpenAI asks for performance models that turn microbenchmarks into cost-to-serve estimates and make latency, capacity, utilization, and cost tradeoffs legible across application, model, and fleet layers. Anthropic asks for cross-layer analysis of throughput, latency, reliability, and correctness, plus observability/modeling tools, autoscaling and capacity reasoning, and regression-detection evidence. LiveKit asks for region-spanning systems that degrade gracefully under partial failure, with metrics, tracing, testing, and understandable distributed state.

## Live public evidence inventory

The authenticated `WaffleBits` account was read through the GitHub API before implementation. It exposes 21 public repositories. The profile repository is the TypeScript/Astro site at https://github.com/WaffleBits/WaffleBits, published at https://wafflebits.github.io/WaffleBits/. The profile README and current `main` commit (`39f11bad7b7eb5350bf2216982d1b29ad1838631`) were inspected.

The strongest relevant public repositories remain:

- `secure-gpu-inference-gateway`: Python gateway with access control, token/request budgets, audit and telemetry controls, deployment posture checks, and public synthetic capacity, workload, and resilience artifacts. Its `artifacts/capacity-plan-evidence.json` reports per-model request/token cost estimates, modeled rates, observed synthetic p95 latency/utilization, and policy envelopes while explicitly excluding request data, identities, secrets, and production logs.
- `triton-inference-benchmark`: authenticated serving benchmark with explicit TLS trust, restart reconciliation, lifecycle qualification, privacy-safe aggregates, trend gates, and content-addressed qualification evidence. Its latest public CI run for `main` passed.
- `deterministic-inference-scheduler`: Rust continuous-batching and paged-KV scheduling model with replayable traces and promote/hold/rollback gates.
- `triton-kernel-lab`: Triton kernels with correctness oracles, measured timing artifacts, and regression checks.
- `market-microstructure-engine`: C++20/Python matching-engine parity and latency artifacts.

The profile already links cost-per-request as a capability and describes the gateway's controls, but its 14-row verification index has no direct link to the gateway's capacity-plan artifact. The evidence is public and checked in the gateway repository; it is present but buried from a reviewer following the profile's evidence index.

### Evidence map

**Already demonstrated:**

- The gateway repository and CI publish a synthetic capacity-plan artifact with explicit cost, rate, p95-latency, utilization, and policy-envelope fields.
- The profile already publishes gateway access-control, audit, telemetry, deployment, benchmark, lifecycle, provenance, and resilience evidence.
- The current profile evidence contract validates public links, schema, project records, and privacy-sensitive exclusions.

**Present but buried:**

- `artifacts/capacity-plan-evidence.json` is linked from the gateway README but not from the profile proof ledger or the root profile README's gateway entry.
- The gateway `caseFiles` record names controls and failure evidence but does not expose the capacity-plan boundary in the profile's project-level manifest.

**Missing and not claimed:**

- Real GPU/TPU fleet capacity, production cost accounting, customer traffic, autoscaler control, multi-region operation, production SLOs, 24x7 on-call, and physical multi-host measurements remain outside the public evidence boundary.
- The synthetic artifact does not establish production capacity or generalize its cost/p95/utilization values beyond its checked fixture assumptions.

## Exactly one selected gap

**Surface the existing synthetic capacity-plan artifact as a direct, boundary-aware verification item in the WaffleBits profile.**

This is one evidence-discoverability change aligned to the repeated capacity, cost, observability, and regression-review signal. It will add one proof row, extend the existing gateway project evidence sentence, and update the root README's gateway entry. It will not add a repository, metric, technology, production claim, resume claim, or new capacity implementation.

## Implementation plan

1. Add one typed proof entry in `src/data/portfolio.ts` linking to the exact public capacity artifact and stating the synthetic cost/p95/utilization/policy scope and production-capacity boundary.
2. Update the gateway `caseFiles` evidence sentence and the root README gateway entry to surface the same already-published artifact without changing its claim boundary.
3. Extend `scripts/validate-evidence.mjs`, `scripts/validate-rendered.mjs`, and `.github/workflows/pages.yml` for the 15-row proof ledger and exact capacity-artifact assertions.
4. Reproduce the repository checks in an ephemeral `node:24-bookworm` source copy because the Oracle Linux 7 host Node binary cannot start: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, evidence validation, rendered-output validation, preview HTTP read-back, PDF inspection, and `git diff --check`.
5. Commit only the scoped plan, proof/content, validator, and workflow changes. Push without force, open a PR, require the Pages build and deployment workflow to pass, merge only after the relevant checks are green, and read back the merged remote and live page/manifest.

## Local implementation verification

The scoped implementation was completed in the existing profile repository. The tracked changes are the new plan, one proof row, the gateway project/README wording, evidence/rendered validators, Pages assertions, and a lockfile-only remediation required by the current npm advisory database.

The profile checks were reproduced in a clean, ephemeral `node:24-bookworm` source copy because the Oracle Linux 7 host Node binary is incompatible:

- Node `v24.18.0`; npm `11.16.0`.
- `npm ci` passed; 267 packages were installed.
- The first audit run found one high `devalue` advisory and one moderate `fast-uri` advisory. `npm audit fix --package-lock-only --ignore-scripts` updated `devalue` `5.8.1` to `5.9.4` and `fast-uri` `3.1.7` to `3.1.8`; the requested `npm audit --audit-level=high` then passed with `0 vulnerabilities`.
- `npm run check` passed with 0 errors, 0 warnings, and 0 hints.
- `WB_BASE=/WaffleBits npm run build` passed and generated one static page plus `evidence.json`.
- `npm run test:evidence` passed with 15 proof items, 6 capabilities, and 7 projects. The validator checks the exact capacity artifact URL, cost/policy wording, and production-capacity boundary.
- `npm run test:rendered` passed with 31,279-byte HTML, 15 proof rows, 6 capability rows, 7 project records, the capacity artifact link, correct `/WaffleBits/` asset paths, and no em dash.
- A real `astro preview` read-back returned HTTP 200 for `/WaffleBits/` and `/WaffleBits/evidence.json`; the page response was 31,361 bytes and the JSON contained 15 proof, 6 capability, and 7 project records, including `capacity plan`.
- The unchanged `public/assets/AdnanBerik-Resume.pdf` was inspected with `pypdf`: 4,849 bytes, one page, 3,757 extracted characters, with `ADNAN BERIK`, `TS/SCI`, and `github.com/WaffleBits` present.
- `git diff --check` passed, and no secret-like or environment files are tracked.

## Publication verification

- PR [#60](https://github.com/WaffleBits/WaffleBits/pull/60) merged with squash at commit [`1b29893`](https://github.com/WaffleBits/WaffleBits/commit/1b29893c0565c22ff7f2b7ffc560e5be502e24a2).
- The pull-request Pages build passed in [run 36999627986](https://github.com/WaffleBits/WaffleBits/actions/runs/36999627986).
- The post-merge Pages workflow [run 36999683529](https://github.com/WaffleBits/WaffleBits/actions/runs/36999683529) passed both `build` and `deploy`; the GitHub Pages API reports `status: built` for `https://wafflebits.github.io/WaffleBits/`.
- GitHub contents API read-back on `main` confirmed the scoped source, README, validators, workflow, lockfile, and plan at the merged revision. The remote `src/data/portfolio.ts` and `README.md` both retain the exact public capacity artifact URL.
- A cache-busting live read returned HTTP 200 for `https://wafflebits.github.io/WaffleBits/` and `/evidence.json`. The page was 31,279 bytes with 15 proof rows, the exact capacity artifact link, correct `/WaffleBits/` asset paths, and no em dash. The live manifest was 18,597 bytes with 15 proof items, 6 capabilities, and 7 projects; its `capacity plan` record points to the exact gateway artifact.
- GitHub emitted only non-blocking action-runtime and future `ubuntu-latest` migration annotations; the build and deployment conclusions were successful.


## Remaining gap

The public portfolio will still show synthetic capacity planning rather than production autoscaler ownership, multi-region fleet operation, real customer-traffic cost accounting, or production SLOs.
