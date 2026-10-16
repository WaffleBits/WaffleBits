# Plan: exercise the built Pages site over HTTP

Date: 2026-10-16 (UTC)
Repository: `WaffleBits/WaffleBits`
Branch: `test/astro-preview-http-smoke-20261016`

## Current primary-source role sample

Checked on 2026-10-16 against official Greenhouse job-board feeds. These records were present in the active feeds at the time checked. Greenhouse exposes `updated_at`, not an original publication date, so the dates below are feed update dates. Compensation is quoted as shown; equity is not converted to a total-compensation estimate.

| Role | Canonical listing | Feed updated | Compensation as listed | Location / work mode |
|---|---|---|---|---|
| Anthropic, Performance Engineer, Inference Engine | https://job-boards.greenhouse.io/anthropic/jobs/5418323008 | 2026-09-09 19:09:53 -04:00 | `Annual Salary: $350,000 — $850,000 USD` | San Francisco, CA or New York City, NY; company policy expects staff in an office at least 25% of the time, with some roles requiring more. |
| Robinhood, Senior Staff Software Engineer, Developer Infrastructure | https://boards.greenhouse.io/robinhood/jobs/8189867?t=gh_src=&gh_jid=8189867 | 2026-10-11 03:14:59 -04:00 | `$264,000 — $310,000 USD` base pay in each of three published US zones, plus bonus, equity, and benefits | Menlo Park, CA or New York, NY for this listing; the role describes at least three in-office days each week. |
| Gemini, Staff Platform Engineer | https://boards.greenhouse.io/embed/job_app?for=gemini&token=8186546&gh_jid=8186546 | 2026-10-02 14:40:35 -04:00 | `$168,000 - $240,000` base salary for New York State; bonus and equity are additional and not priced in the listing | New York, NY; Miami, FL; or Remote (USA); remote staff are part of a remote workforce, with in-person onboarding. |

Recurring signals include careful testing and pre-merge validation (Anthropic, Robinhood, Gemini), production/deployment validation (Robinhood, Gemini), observability and reliability controls (Anthropic, Gemini), and repeatable evidence for systems behavior (Anthropic). Existing public work already demonstrates deterministic Rust scheduling, measured GPU kernels, security controls, CI checks, and static artifact validation. These listings do not establish applicant fit: in particular, the senior/staff roles describe production ownership and organizational scope beyond what these project fixtures demonstrate.

## Live evidence inventory and gap

The authenticated GitHub account `WaffleBits` has 21 public repositories. The public `WaffleBits/WaffleBits` Astro profile is the selected existing repository; its live homepage and `evidence.json` were reachable and the manifest contained 18 proof records, 6 capabilities, and 7 projects. The strongest adjacent repositories include `triton-inference-benchmark`, `secure-gpu-inference-gateway`, `deterministic-inference-scheduler`, and `triton-kernel-lab`, all already providing inspectable code, tests, or artifacts.

The current Pages workflow runs `npm ci`, the high-severity audit, Astro diagnostics, production build, static output assertions, and evidence/rendered validators. It does not start Astro Preview or make HTTP requests to the built output. A successful generated-file check therefore does not exercise the configured `/WaffleBits/` request path or the HTTP-served JSON document.

## Exactly one selected improvement

Add a dependency-free `npm run test:preview` check that starts the actual Astro Preview server against the production build and verifies HTTP success, content types, base-path routing, representative page content, and the served evidence-manifest schema/counts. Run it in the existing Pages workflow after build-output validation and before artifact upload.

This closes an end-to-end validation gap while reusing the existing site and evidence contract. It does not add profile claims, repositories, external services, synthetic metrics, or claims of production platform scale.

## Implementation and acceptance plan

1. Add `scripts/smoke-preview.mjs`. It must start Preview itself, wait with a bounded timeout for readiness, request `/WaffleBits/` and `/WaffleBits/evidence.json`, assert status/content type/base-path and manifest contract, and terminate the spawned process on success, failure, or interruption.
2. Add `test:preview` to `package.json` and invoke it in `.github/workflows/pages.yml` after the build-output checks. Set the base path explicitly to `/WaffleBits` for the smoke-test process.
3. In a disposable, owner-writable source copy, reproduce the workflow using Docker `node:24-bookworm`: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, `npm run test:evidence`, `npm run test:rendered`, and `WB_BASE=/WaffleBits npm run test:preview`. Also verify a rejected HTTP route or otherwise demonstrate that the smoke check fails closed on an invalid contract.
4. Review `git diff --check`, run any relevant local validations, then commit/push without force, open a PR, require its Pages workflow to pass, and verify post-merge Pages deployment and live homepage/manifest.

## Local results

Implementation is complete. The new smoke test starts Astro Preview itself, checks HTTP 200 and content types for the built page and JSON manifest under `/WaffleBits/`, validates the manifest shape/counts, and stops the spawned server on pass, failure, or SIGINT/SIGTERM. CI runs the same check after the build and existing static contract validators.

All requested local checks passed in a disposable source copy with Docker `node:24-bookworm` (Node `v24.18.0`, npm `11.16.0`); the host Node binary cannot run against this Oracle Linux 7 host's glibc 2.17:

- `npm ci`: passed; 267 packages installed. npm emitted a non-fatal `allowScripts` notice for `esbuild@0.28.1`.
- `npm audit --audit-level=high`: passed, 0 vulnerabilities.
- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `WB_BASE=/WaffleBits npm run build`: passed.
- `npm run test:evidence`: passed with 18 proof items, 6 capabilities, and 7 projects.
- `npm run test:rendered`: passed with 33,393-byte rendered HTML and expected manifest counts.
- `WB_BASE=/WaffleBits npm run test:preview`: passed; `/WaffleBits/` and `/WaffleBits/evidence.json` both returned HTTP 200 and the served manifest contained 18 proof items, 6 capabilities, and 7 projects.
- Negative check: running the smoke test with `WB_BASE=/wrong-base` failed with exit 1 because the page did not link to that incorrect manifest path.
- Interruption check: sent SIGTERM to a running smoke test; it exited 143 and its spawned Preview process was absent afterward.
- `git diff --check`: passed. No profile or resume claims changed.

## Publication results

- PR [#67](https://github.com/WaffleBits/WaffleBits/pull/67) merged by squash at [`55861a0`](https://github.com/WaffleBits/WaffleBits/commit/55861a0c065097a7489affca84fd0c94cbe93096).
- The PR Pages workflow [run 38891512882](https://github.com/WaffleBits/WaffleBits/actions/runs/38891512882) passed its build. GitHub's step read-back confirms the new `Smoke-test preview HTTP routes` check passed; the deploy job was correctly skipped for the pull-request event.
- Post-merge Pages run [38891610997](https://github.com/WaffleBits/WaffleBits/actions/runs/38891610997) passed both build and deploy, including the preview HTTP smoke step.
- GitHub Contents API read-back on `main` confirmed `.github/workflows/pages.yml`, `package.json`, `scripts/smoke-preview.mjs`, and this plan at the merged revision.
- Cache-busted live reads after deployment returned HTTP 200 for the portfolio page (33,481 bytes, `text/html`) and `/WaffleBits/evidence.json` (21,326 bytes, `application/json`). Runtime assertions confirmed 18 proof items, 6 capabilities, 7 projects, and the remote-agent cancellation proof link.
- GitHub reported non-blocking action-runtime deprecation and upcoming `ubuntu-latest` migration annotations; build and deployment conclusions were successful.

## Remaining boundary

This adds HTTP-level validation for the static profile build. It does not demonstrate large-scale CI, production distributed-service operation, production ownership, or organizational scope; those are not inferred from this test or the sampled job listings.
