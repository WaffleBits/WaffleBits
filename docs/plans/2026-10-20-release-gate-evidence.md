# Plan: make scheduler release-gate evidence inspectable

Date: 2026-10-20 (UTC)
Repository: `WaffleBits/WaffleBits`
Branch: `feat/release-gate-evidence-20261020`

## Current official role sample

Checked on 2026-10-20 against active listings in the companies' official Ashby and Greenhouse feeds. Dates below are feed publication dates when exposed; Anthropic's Greenhouse feed exposes `updated_at`, not an original publication date. Compensation and location/work mode are copied from the listing; equity is not converted into cash.

| Role | Canonical listing | Published / updated | Compensation as listed | Location / work mode | Repeated requirements relevant here |
|---|---|---|---|---|---|
| Anthropic, Performance Engineer, Inference Engine | https://job-boards.greenhouse.io/anthropic/jobs/5418323008 | Feed `updated_at`: 2026-09-09 19:09:53 -04:00; original publication date not exposed by feed | `Annual Salary: $350,000 — $850,000 USD` | San Francisco, CA or New York City, NY; feed marks Location Type `On-Site`; company policy says staff are expected in an office at least 25% of the time, with some roles requiring more | Rust/C++ systems programming, inference-engine performance/reliability/latency, profiling before changes, and code quality/tests. The listing describes consequential work at Anthropic scale; this project does not establish that production scale. |
| Harvey, Staff Software Engineer, Core Infrastructure | https://jobs.ashbyhq.com/harvey/c2d6c21b-1563-4000-a8a3-b751c79535da | Published 2026-04-27 20:18:36 UTC; listed as active on 2026-10-20 | `$236,000 - $290,000 USD` annual salary; offers bonus and equity, amounts not specified | San Francisco, CA; in-person work model | Multi-cloud infrastructure, Kubernetes/networking, distributed reliability/failover, observability and incident response, IaC (Terraform/Pulumi), CI/CD. Requires 10+ years in production infrastructure/platform engineering. |
| Sentry, Staff Software Engineer, Platform & Infrastructure | https://jobs.ashbyhq.com/sentry/68b3897c-bbb0-4f90-aa9a-57981323e26b | Published 2026-10-16 18:42:19 UTC; listed as active on 2026-10-20 | `$240,000 to $400,000` base salary; up to 15% performance bonus plus equity | San Francisco, CA; Ashby feed flags remote eligibility and `Hybrid` workplace type; precise location terms should be confirmed with the employer | Distributed systems, cloud infrastructure, reliability/performance/operational efficiency, CI/CD/developer infrastructure, production ownership and technical leadership. Requires 8+ years. |

Across the sample, repeatable testing, performance/reliability evidence, deployment/CI, and observability recur. The strongest public evidence is the Triton benchmark's privacy-safe qualification/recovery fixtures, deterministic Rust scheduler and its synthetic release gate, secure inference gateway, measured GPU kernels, and the profile's checked Pages workflow. Those public project artifacts do not establish production operations, multi-region scale, or staff-level organizational leadership.

## Live public evidence inventory

Authenticated GitHub API access as `WaffleBits` succeeded. The account has 21 public repositories. The public `WaffleBits/WaffleBits` profile repository is TypeScript/Astro, unarchived, and clean at base commit `0c70659d7c844254be967c2983625a4e49293661`; its README presents platform security and AI infrastructure work. The live profile site and `evidence.json` are public. The strongest relevant repositories confirmed from live metadata and their public READMEs are:

- [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark): Python load generator with authenticated agents, TLS, restart reconciliation, privacy-safe reports, and CI fixtures. Its local checkout contains unrelated staged work on `feat/remote-agent-lease-safety-20261015`; it will not be modified.
- [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway): Python control-plane demo with access policy, audit/observability, deployment posture checks, and explicitly synthetic resilience/capacity artifacts. The local checkout diverges from origin and will not be modified.
- [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler): Rust scheduler with deterministic traces and promote/hold/rollback release decisions. Its public `docs/RELEASE_VALIDATION.md` says checked fixtures are synthetic and lists audited rollback execution as a real rollout-system extension point.
- [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab): Triton kernels with correctness oracles and measured hardware artifacts.

The current profile site shows a scheduler replay trace and links the repository root, but does not link the scheduler's release-decision contract or its safe/rollback fixtures. Its generic gateway gate row says “promote, hold or roll back on regression” without saying that this is a synthetic decision output, not deployment or rollback execution. The public scheduler docs/fixtures already contain the material to make that distinction inspectable.

## Evidence map and ranked gap

**Already demonstrated:** deterministic synthetic baseline/candidate comparisons can return promote, hold, or rollback; release-policy docs describe the decision rules; fixtures include both safe and mismatching/error candidates. Other repositories provide actual serving benchmark, security, and measured-kernel evidence.

**Present but buried:** the release-gate contract and fixtures are public, but the profile site does not link them directly or state the execution boundary.

**Missing:** real deployment/rollback integration, production traffic or SLOs, multi-region/cloud operations, and the years/organizational ownership requested in the staff postings. This small profile change cannot close those experience gaps and will not claim to.

Ranked highest for this run: make the existing release-gate artifact discoverable and its synthetic decision boundary explicit. It recurs with the postings' deployment validation and reliability requirements, costs little, is backed by already-public source and tests, and produces directly inspectable evidence without inventing operational results.

## Exactly one selected improvement

Add a short release-gate evidence panel to the existing scheduler section of the portfolio. Link the Rust scheduler's public release validation contract and the safe and rollback input fixtures. State accurately that these deterministic synthetic fixtures exercise decision outputs and do not deploy or roll back a live model. Add rendered-output assertions for the wording and exact source links. Do not change the resume, add repositories, alter the benchmark checkout, or claim production deployment experience.

## Acceptance plan

1. Confirm the official feeds still mark each sampled role active and capture the precise listing metadata/content. Confirm the live public profile/repositories, clean profile checkout, and existing Pages workflow.
2. Add the panel to the scheduler section and assertions to `scripts/validate-rendered.mjs`; keep the existing proof-manifest shape/count unchanged.
3. In a disposable owner-writable source copy, run the canonical Pages validation on Docker `node:24-bookworm`: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, `npm run test:evidence`, `npm run test:rendered`, and `WB_BASE=/WaffleBits npm run test:preview`. Inspect the built page/manifest and exercise preview HTTP routes. Run `git diff --check`.
4. Review the scoped diff, commit and push without force, open a PR, require its Pages workflow to pass, merge only after it passes, and verify post-merge Pages build/deployment plus live page/manifest read-back.

## Implementation and publication results

### Local verification

- Added the release-gate evidence panel to the existing scheduler section and rendered-output assertions for the boundary text plus the exact decision-contract, safe-fixture, and rollback-fixture URLs. The proof manifest shape/count and resume were not changed.
- Reproduced the Pages pipeline in a disposable `node:24-bookworm` copy (Node `v24.18.0`, npm `11.16.0`); the host runtime remains unsuitable on Oracle Linux 7/glibc 2.17.
- `npm ci`: passed; 267 packages installed. npm emitted a non-fatal `allowScripts` notice for `esbuild@0.28.1`.
- `npm audit --audit-level=high`: passed, 0 vulnerabilities.
- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `WB_BASE=/WaffleBits npm run build`: passed.
- `npm run test:evidence`: passed with 18 proof items, 6 capabilities, and 7 projects.
- `npm run test:rendered`: passed on the 34,236-byte page and verified the decision boundary and all three exact scheduler artifact links; manifest counts remained 18/6/7.
- `WB_BASE=/WaffleBits npm run test:preview`: passed; the built page and `/WaffleBits/evidence.json` returned HTTP 200 with expected content and manifest counts.
- An independent artifact read confirmed the built HTML contains the scope statement and all three exact URLs. The disposable build copy was removed.
- `git diff --check`: passed.

### Pull request and publication

- PR [#69](https://github.com/WaffleBits/WaffleBits/pull/69) merged by squash at [`8b32722`](https://github.com/WaffleBits/WaffleBits/commit/8b32722b9fb102d84b58caec7d86611929a771fa).
- The first PR Actions run [39412614273](https://github.com/WaffleBits/WaffleBits/actions/runs/39412614273) failed at `npm audit` because npm's advisory endpoint returned HTTP 503. Re-running the failed job without code changes passed: audit, Astro diagnostics, build, all output validators, preview HTTP smoke, and artifact upload succeeded. The PR deploy job was skipped as expected.
- Post-merge Pages run [39412892085](https://github.com/WaffleBits/WaffleBits/actions/runs/39412892085) passed both build and deploy, including the rendered contract and preview HTTP smoke. GitHub emitted non-blocking notices about Node 20 action runtimes and the upcoming `ubuntu-latest` image migration.
- GitHub Contents API read-back on `main` confirmed the page, rendered validator, and dated evidence plan at the merge revision.
- Cache-busted live reads after deployment returned HTTP 200 for the portfolio page (34,331 bytes, `text/html`) and `/WaffleBits/evidence.json` (21,326 bytes, `application/json`). Runtime assertions confirmed the exact scope boundary, all three release-gate links, and manifest counts of 18 proof items, 6 capabilities, and 7 projects.

## Remaining boundary

The release gate returns a policy decision from synthetic baseline/candidate fixtures. The project does not connect that decision to a model deployment or rollback system. No production, multi-region, staff-level scope, or CI fleet-scale claim follows from this profile change.
