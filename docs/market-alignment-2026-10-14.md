# Market alignment and CI quality-gate evidence - 2026-10-14

## Current official role sample

Checked on 2026-10-14 against the companies' official public Greenhouse feeds. Each listing was present in its company's active feed at the time checked. Dates are the feed's `updated_at`; the feed does not expose an original publication date for these records. Compensation and work locations below are copied from the posting; no equity value is inferred.

| Role | Canonical listing | Updated | Compensation as listed | Location / work mode | Repeated requirements relevant here |
|---|---|---|---|---|---|
| Anthropic, Performance Engineer, Inference Engine | https://job-boards.greenhouse.io/anthropic/jobs/5418323008 | 2026-09-09 19:09:53 -04:00 | `Annual Salary: $350,000 — $850,000 USD` | San Francisco, CA or New York City, NY; the feed exposes locations but no job-specific remote classification | Systems profiling before changes; reliability and latency; Rust/systems skills; determinism, replay, and property-based tests. |
| Robinhood, Senior Staff Software Engineer, Developer Infrastructure | https://boards.greenhouse.io/robinhood/jobs/8189867?t=gh_src=&gh_jid=8189867 | 2026-10-11 03:14:59 -04:00 | `$264,000 — $310,000 USD` base pay in each of the three published zones, plus bonus/equity/benefits | Menlo Park, CA or New York, NY; posting expects in-office attendance at least 3 days/week | Bazel/monorepo and remote build execution; CI/CD and test infrastructure for thousands of daily builds; pre-merge checks; multi-language developer tooling and AI-assisted SDLC. The 10+ years and org-level leadership requirements are substantially beyond what this repository change establishes. |
| Gemini, Staff Platform Engineer | https://boards.greenhouse.io/embed/job_app?for=gemini&token=8186546&gh_jid=8186546 | 2026-10-02 14:40:35 -04:00 | `$168,000 - $240,000` base salary for New York State; other location-specific ranges are not exposed in the feed | New York, NY; Miami, FL; or Remote (USA) | Platform automation, CI/CD, test/deployment validation, Kubernetes/cloud infrastructure, and operational reliability/SLOs. Requires 8+ years and substantial production ownership. |

Across this sample, CI/test quality, repeatable validation, and reliability recur alongside role-specific systems expertise. The roles are market signals, not claims of individual fit; public project fixtures do not establish production ownership or staff-level organizational scope.

## Live public evidence inventory

The authenticated GitHub API was queried on 2026-10-14 as `WaffleBits`: 21 public repositories. The profile repository is the TypeScript/Astro site at https://github.com/WaffleBits/WaffleBits, default branch `main`, public and unarchived; current base commit before this change was `461362add25d61ec51ef3c6916c8f37e5d15f07b`. Its README presents platform security and AI infrastructure engineering.

Strong relevant public repositories, confirmed from the live account inventory and repository metadata/README links:

- [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark): Python serving benchmark with authenticated agents, TLS, restart reconciliation, cancellation, privacy-safe artifacts, and reliability gates.
- [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway): Python inference gateway with access policy, budgets, audit/observability, and explicitly synthetic capacity/resilience evidence.
- [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler): Rust continuous-batching/KV-cache model with replayable traces and release gates.
- [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab): Triton GPU kernels with correctness oracles and measured hardware artifacts.

The existing Astro repository already has a Pages build, evidence-schema validation, rendered-output checks, and privacy assertions. Its public Pages workflow at `.github/workflows/pages.yml` installs the locked dependencies, builds the site, and runs the evidence/render validators, but does not run `npm audit --audit-level=high` or `npm run check`. The local package scripts already provide both the dependency audit (npm) and Astro diagnostics (`astro check`).

## Evidence map

**Already demonstrated:** public code and CI cover tested serving behavior across Python, Rust, and Triton projects. The Astro site has machine-readable public evidence and checks its built page/manifest in CI.

**Present but buried:** `npm audit --audit-level=high` and `npm run check` exist as reproducible repository commands and can be run locally, but neither is an automated pull-request gate in the current Pages workflow.

**Missing:** CI does not yet fail a Pages pull request for a high-severity npm advisory or Astro diagnostics errors. This does not imply CI scalability, remote build execution, production deployment operations, or thousands-of-build capacity.

## Exactly one selected gap

**Add dependency-severity and Astro-diagnostic gates to the existing profile's GitHub Pages workflow.** This is one coherent continuous-integration quality gap aligned with repeated role requirements for secure, tested pre-merge delivery. It will make the current repository checks enforceable for pull requests without inventing metrics, adding a repository, changing profile claims, or implying large-scale CI experience.

## Implementation and acceptance plan

1. In `.github/workflows/pages.yml`, run `npm audit --audit-level=high` and `npm run check` immediately after `npm ci`, before the production build and existing evidence/rendered-output validators.
2. Reproduce the full workflow in a disposable `node:24-bookworm` copy because the Oracle Linux 7 host Node executable is incompatible with glibc 2.17. Run, in order, `npm ci`, `npm audit --audit-level=high`, `npm run check`, `npm run build` with `WB_BASE=/WaffleBits`, `npm run test:evidence`, and `npm run test:rendered`.
3. Launch Astro preview against the built output and verify HTTP responses and the rendered proof/manifest contract. Run `git diff --check` and review the exact staged scope.
4. Push a feature branch without force, open a PR, require its Pages workflow to pass, merge only after that check is green, and verify the post-merge Pages build/deploy, remote workflow contents, and live page/manifest.

## Implementation and publication results

### Local verification

The two CI gates were added to the existing Pages workflow immediately after `npm ci`; no user-facing profile or resume claims changed. The required runtime was reproduced in a disposable copy running in Docker `node:24-bookworm` because the host Node executable cannot start against this Oracle Linux 7 host's glibc 2.17.

- Runtime: Node `v24.18.0`, npm `11.16.0`.
- `npm ci`: passed. npm emitted a non-fatal `allowScripts` notice for `esbuild@0.28.1`; Astro check and production build both completed successfully.
- `npm audit --audit-level=high`: passed, `found 0 vulnerabilities`.
- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `WB_BASE=/WaffleBits npm run build`: passed; generated the static page and `evidence.json`.
- `npm run test:evidence`: passed with 18 proof items, 6 capabilities, and 7 projects.
- `npm run test:rendered`: passed with 33,393-byte rendered HTML and expected manifest counts.
- `astro preview`: page and `/evidence.json` both returned HTTP 200; runtime assertions confirmed 18 proof rows, 18 manifest proof items, 6 capabilities, 7 projects, and the remote-cancellation proof link.
- `git diff --check`: passed. The only intended source change is the Pages workflow; this report records the market evidence and verification. No credential-like filenames are tracked.

### Pull-request validation

- PR [#66](https://github.com/WaffleBits/WaffleBits/pull/66) was opened from `feat/ci-quality-gates-20261014`. At implementation commit `09613af43ca839fc1f0de8635aaf9a2a36efa3b`, Pages run [38554085178](https://github.com/WaffleBits/WaffleBits/actions/runs/38554085178) passed. GitHub's job-step read-back shows both `Audit dependency tree` and `Check Astro diagnostics`, plus the build, artifact, evidence, and rendered-contract validations, all succeeded.
- The deploy job was skipped for the pull-request event by the workflow's `if: github.event_name != 'pull_request'` condition. Deployment and live read-back are separate post-merge checks.

## Remaining gap

This change provides small-repository dependency and Astro-check gates only. It does not demonstrate Bazel/remote build execution, high-volume CI, multi-team production platform ownership, or large-scale distributed-service operation.
