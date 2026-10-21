# Plan: surface generated scheduler-invariant evidence

Date: 2026-10-21
Repository: `WaffleBits/WaffleBits` (profile/site and resume)
Branch: `feat/scheduler-property-evidence-20261021`

## Current role sample

Checked 2026-10-21 against active listings in the companies' official Greenhouse feeds. The feed's `updated_at` values are recorded below; original publication dates are not exposed by these API records. Compensation is copied as published, with base salary distinguished from additional incentives.

| Role | Canonical listing | Feed updated | Compensation | Location / work mode | Repeated requirements relevant here |
|---|---|---|---|---|---|
| Anthropic — Performance Engineer, Inference Engine | https://job-boards.greenhouse.io/anthropic/jobs/5418323008 | 2026-09-09 19:09:53 -04:00 | Annual salary `$350,000 — $850,000 USD` | San Francisco, CA or New York City, NY; feed gives locations but no job-specific remote field | Rust systems work, inference performance/reliability, determinism, replay, and property-based tests. |
| Anduril — Staff AI Infrastructure Engineer | https://boards.greenhouse.io/andurilindustries/jobs/5212860007?gh_jid=5212860007 | 2026-10-05 19:17:56 -04:00 | US salary range `$220,000 — $292,000 USD` (base salary) | Costa Mesa, CA; Seattle, WA; or Washington, DC; feed does not state remote eligibility | Python/Go/C++ or similar, distributed computing, Docker/Kubernetes, GPU scheduling/orchestration, CI/CD, and serving. |
| Robinhood — Staff Software Engineer, AI Security | https://boards.greenhouse.io/robinhood/jobs/8214383?t=gh_src=&gh_jid=8214383 | 2026-10-06 12:11:22 -04:00 | Base pay: Zone 1 `$230,000—$270,000 USD`; Zone 2 `$203,000—$238,000 USD`; Zone 3 `$180,000—$211,000 USD`, plus bonus/equity/benefits | Bellevue, WA or Menlo Park, CA; listing requires at least three office days per week | AI platform services, distributed systems, identity/authentication/authorization, Go or Python, cloud/Kubernetes, reliability, and secure design. |
| SpaceX — Sr. Software Engineer, AI Infrastructure (Starshield) | https://boards.greenhouse.io/spacex/jobs/8861768002?gh_jid=8861768002 | 2026-10-01 17:15:16 -04:00 | Level 3 pay range `$165,000.00 - $265,000.00`; additional incentives/benefits are separate | Palo Alto, CA; feed does not state remote eligibility | Linux, Kubernetes, infrastructure automation, GPU platforms, monitoring, CI/testing, and availability. |

Each listing was present in its company's active jobs feed when checked. These are role-market signals, not claims of individual fit or production experience. Compensation ranges are not normalized across levels or locations.

## Live public evidence inventory

Authenticated GitHub API access confirmed the account is `WaffleBits` with 21 public repositories. The profile repository is the public, unarchived TypeScript/Astro site `https://github.com/WaffleBits/WaffleBits`, with the Pages site at `https://wafflebits.github.io/WaffleBits/`.

Relevant public projects, verified from live repository metadata and source:

- [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler): Rust continuous-batching and paged-KV scheduler. Merged commit [`d53fc0e`](https://github.com/WaffleBits/deterministic-inference-scheduler/commit/d53fc0ec5a380f9ae14ccfe8d36ff8dc4b66c50a) adds a 128-case bounded `proptest` covering deterministic replay, request lifecycle/accounting, trace consistency, and active/KV limits on generated synthetic workloads. Its CI run [39598902096](https://github.com/WaffleBits/deterministic-inference-scheduler/actions/runs/39598902096) passed.
- [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark): Python serving benchmark with authenticated agents, TLS, restart reconciliation, privacy-safe output, and reliability checks.
- [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway): inference gateway with access controls, budgets, audit/observability, and explicitly synthetic capacity/resilience artifacts.
- [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab): Triton kernels with correctness oracles and hardware measurement artifacts.

The Astro portfolio already links the scheduler and includes a general replay item in its verification index. The new generated property test is publicly implemented and CI-verified, but the profile does not yet name or link this evidence. The one-page resume also summarizes the scheduler without describing generated invariant coverage.

## Evidence map and selected gap

**Already demonstrated:** public scheduler code and passing CI cover deterministic replays, per-request lifecycle/accounting, trace invariants, and active/KV capacity bounds over bounded synthetic inputs. The profile has tested evidence and rendered-output contracts.

**Present but buried:** the new scheduler test and its 128 generated cases are public but not surfaced in the profile evidence index, profile README, or resume.

**Missing:** representative production traces, live serving or GPU scheduling, production reliability, performance gains from this test, and staff-level organizational ownership. This work will not claim any of those.

**Exactly one selected improvement:** update the existing profile evidence row, GitHub README, and resume to expose the newly public property-based scheduler tests with the synthetic evidence boundary. This addresses the explicit Rust/reproducibility/property-testing signal in the live Anthropic inference-engine listing while complementing recurring reliability and verification requirements across the other active AI-infrastructure roles. No new repository or benchmark is justified.

## Acceptance plan

1. Confirm the profile checkout is clean and at `origin/main`; verify the scheduler source and successful CI from the public remote before changing positioning.
2. Add regression checks for a new proof row, its exact public source URL and synthetic-scope wording, and a 19-row rendered count; run them against the old artifact to establish the expected red state.
3. Add the evidence row, update the profile README and resume source, regenerate the one-page PDF, and record this plan.
4. In a disposable source copy, run the Pages pipeline in Docker `node:24-bookworm`: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, `npm run test:evidence`, `npm run test:rendered`, and `WB_BASE=/WaffleBits npm run test:preview`. Inspect the built HTML, manifest, PDF page count, and extracted text. Run `git diff --check`.
5. Commit and push only after local checks pass, open a PR, require the Pages workflow to pass, merge only after CI passes, and verify the post-merge deployment plus live page, evidence manifest, README, and PDF.

## Implementation and local verification

- Added a generated-scheduler proof row to the portfolio and evidence manifest, linked to the public test source. Updated the GitHub profile README and resume source to state the test count and invariants while identifying the workload as synthetic.
- Updated evidence-schema, rendered-page, preview HTTP, and Pages workflow count checks from 18 to 19 proof items. The preview check now verifies the exact source link and evidence-boundary wording on both HTML and JSON routes.
- Confirmed the supporting scheduler implementation was public before profile edits: merge commit [`d53fc0e`](https://github.com/WaffleBits/deterministic-inference-scheduler/commit/d53fc0ec5a380f9ae14ccfe8d36ff8dc4b66c50a), CI run [39598902096](https://github.com/WaffleBits/deterministic-inference-scheduler/actions/runs/39598902096) succeeded.
- TDD check: before adding profile content, the new schema validator failed on the old 18-item manifest, and the rendered validator failed because the new proof was absent. The first full preview run then caught a stale 18-item count in the HTTP smoke test; updated it and added route-level assertions before rerunning.
- The first `npm audit --audit-level=high` reported one high-severity Vite finding for old locked `vite` 8.1.5, listing GHSA-698v-4r3x-3vcv, GHSA-r825-w8mm-5pxw, and GHSA-587h-7wmj-h5pm. In the disposable copy, semver-safe `npm audit fix` updated the lockfile only; the manifest is unchanged. Vite resolved to 8.3.5 and the audit then reported 0 vulnerabilities. The reviewed package-lock update was included and validated with a fresh `npm ci`.
- Reproduced the Pages workflow in a clean ephemeral copy using Docker `node:24-bookworm` (Node v24.18.0, npm 11.16.0): `npm ci` passed; `npm audit --audit-level=high` passed with 0 vulnerabilities; `npm run check` reported 0 errors, 0 warnings, and 0 hints; `WB_BASE=/WaffleBits npm run build` passed; `npm run test:evidence` validated 19 proof items, 6 capabilities, and 7 projects; `npm run test:rendered` validated the 34,788-byte rendered page; and `WB_BASE=/WaffleBits npm run test:preview` returned HTTP 200 for the page and manifest and validated the same counts and new proof boundary.
- Independent artifact inspection confirmed the exact test URL and synthetic boundary in rendered HTML; the generated manifest has 19/6/7 records and contains no request or credential data under the existing privacy validator. The regenerated resume PDF is one page (4,964 bytes); text extraction confirms the 128-case generated-test wording.
- `git diff --check` passed. The implementation does not claim performance improvement, production trace coverage, live deployment behavior, production-scale reliability, or staff-level organizational ownership.

## Pull request and publication results

- PR [#71](https://github.com/WaffleBits/WaffleBits/pull/71) merged at `69ddd45f20b8da1c8c97448263ab58508e5bd12b`. Its pull-request Pages build [39602621105](https://github.com/WaffleBits/WaffleBits/actions/runs/39602621105) passed; deployment was skipped for the pull-request event as configured.
- Post-merge Pages run [39602743378](https://github.com/WaffleBits/WaffleBits/actions/runs/39602743378) passed the build and deployment jobs. Audit, Astro diagnostics, build, output validation, evidence validation, rendered-profile validation, preview HTTP smoke, and artifact upload all passed. GitHub displayed non-blocking notices about Node 20 action runtimes and the `ubuntu-latest` migration.
- Read-back from `main` confirmed the profile source and README contain the new claim and public test link. Cache-busted live requests returned HTTP 200 for the page (34,885 bytes), `/WaffleBits/evidence.json` (21,806 bytes; 19 proof / 6 capability / 7 project records), and the resume PDF (4,964 bytes). The live page and manifest include the exact scheduler test URL and synthetic-workload boundary; extracted live PDF text includes the 128-case test wording, and the PDF is one page.
