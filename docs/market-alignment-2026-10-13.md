# Market alignment and remote-agent cancellation evidence - 2026-10-13

## Current official role sample

Listings were checked on 2026-10-13 in the companies' official Ashby and Greenhouse job feeds and pages. Only active feed entries are included. Compensation is quoted as published; equity is not converted to cash. These roles are market signals, not assertions of individual fit.

| Role | Canonical listing | Published / updated | Compensation as listed | Location / work mode | Repeated requirements relevant here |
|---|---|---|---|---|---|
| Lambda, Senior Software Engineer - Infrastructure Storage | https://jobs.ashbyhq.com/lambda/20599b39-8482-4852-a955-f279bbb5463f | Published 2026-07-16 23:04:41 UTC; listed in the 2026-10-13 Ashby feed | `$296K – $395K` San Francisco/San Jose; `$266K – $356K` Bellevue, annual salary | San Francisco/San Jose or Bellevue office; hybrid, 4 days/week onsite | Distributed storage and systems; performance, scalability, availability, consistency and fault tolerance; Linux/system programming; C/C++/Go/Python; CI/CD and distributed-systems QA. |
| Docker, Senior Software Engineer, Infrastructure | https://jobs.ashbyhq.com/docker/ae03031e-7080-472c-bcc6-207833a8d2f9 | Published 2026-04-03 23:02:53 UTC; listed in the 2026-10-13 Ashby feed | `$160,900 – $260,700 + equity` (United States) | Remote; full-time | Go; self-service platform APIs; Terraform and GitOps/Argo CD; EKS, multi-region cross-account networking; deployment safety, SLOs, alerting, incident follow-up, and measured adoption. |
| Anthropic, Performance Engineer, Inference Engine | https://job-boards.greenhouse.io/anthropic/jobs/5418323008 | Published and updated 2026-09-09 19:09:53 -04:00; present in the 2026-10-13 Greenhouse feed | `Annual Salary: $350,000 — $850,000 USD` | San Francisco or New York City; hybrid policy expects at least 25% office time | Rust/C++ or similar systems programming; inference performance, reliability and latency; measure/profile before changing code; tests, determinism, replay, and reproducibility. |

Across these listings, the recurring signal is tested reliability in complex systems: failure handling, observable operating behavior, and evidence that changes work under repeatable conditions. The profile already demonstrates inference benchmarking, distributed-agent reconciliation, and local lifecycle cleanup; none of these roles makes the portfolio evidence equivalent to production ownership.

## Live public evidence inventory

The authenticated GitHub API confirms the `WaffleBits` account has 21 public repositories. The profile metadata describes AI infrastructure, GPU performance, secure distributed systems, and mission software; the profile site is https://wafflebits.github.io/WaffleBits/. The public profile repository is the TypeScript/Astro site at https://github.com/WaffleBits/WaffleBits, currently at main commit `34a646b50166b1c3486ce46312dd85f6aeb74c9` before this change.

The strongest relevant public repositories are:

- [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark): Python benchmark/coordination harness; its newest public commit is `d4bb4f4cdb7db7a06850a336476f28bee129fa83` (`feat: cancel remote benchmark runs on coordinator signals`, PR #29). It contains the exact remote-cancellation fixture and public CI run [38243517820](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/38243517820), which completed successfully.
- [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway): Python inference gateway with policy, audit, observability, and explicitly synthetic resilience/capacity evidence.
- [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler): Rust scheduler with replayable traces and release gates.
- [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab): Triton kernels with correctness oracles and measured hardware artifacts.

The profile already surfaced local SIGINT/SIGTERM lifecycle cleanup but did not directly surface the newly public remote-agent cancellation fixture. Existing storage, recovery, gateway, scheduler, and GPU projects make a new repository unnecessary.

## Evidence map

**Already demonstrated:** The public benchmark coordinator cancels exact active runs on two authenticated loopback agents after SIGINT/SIGTERM; its deterministic fixture checks cancellation acknowledgement, agent child-process cleanup, exit status 130/143, and no success aggregate. The source is on public `main`, and its GitHub Actions CI passed.

**Present but buried:** The profile README/site described local cancellation and benchmark recovery but lacked a direct evidence-index link to remote-agent cancellation. The resume's boundary sentence also said its fixtures did not establish remote cancellation, which is no longer accurate after the public source change.

**Missing and not claimed:** Interrupted remote-work recovery, arbitrary or production-network behavior, multi-host fleet scale, production service recovery/SLOs, and model cold-start behavior remain unverified.

## Exactly one selected gap

**Surface the newly merged remote-agent cancellation test in the existing portfolio and correct the resume's now-stale evidence boundary.** This is one evidence-discoverability and claim-accuracy change aligned with recurring platform reliability, systems testing, and operational-safety requirements. It will add one boundary-aware proof row, update the existing benchmark case-file and GitHub profile README, extend the profile's existing evidence/rendered/Pages checks, and update the matching resume bullet. It does not add a project, claim production operation, or imply interrupted-work recovery.

## Acceptance plan

1. Verify the referenced source fixture and successful upstream CI from public GitHub; read the live official role feeds and capture exact listing links, publication dates, salary ranges, work modes, and repeated requirements.
2. Add the single proof row and matching project/README wording. Extend exact URL, claim-boundary, and proof-count checks from 17 to 18.
3. Revise the resume generation source so it distinguishes local process cleanup from authenticated loopback remote cancellation and keeps recovery/production limits explicit; rebuild and inspect the PDF page count and extracted text.
4. In an ephemeral `node:24-bookworm` source copy, run `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, `npm run test:evidence`, and `npm run test:rendered`. Inspect rendered HTML/manifest and preview HTTP responses. Re-run the remote-agent cancellation fixture for SIGINT and SIGTERM against the public source checkout; run `git diff --check` on text files.
5. Commit and push only the scoped report, site, resume source, and generated resume after all checks pass. Open a PR, require its Pages build to pass, merge without force, then verify post-merge Pages build/deploy and read the live site/manifest and PDF back.

## Verification results

- Source: public main commit `d4bb4f4cdb7db7a06850a336476f28bee129fa83` contains `tests/run_remote_agent_cancellation_fixture.py`; public CI [run 38243517820](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/38243517820) passed. Re-ran the fixture from a fresh public clone in Python 3.13 with installed repository requirements: SIGINT and SIGTERM both passed.
- Resume: `python3 scripts/build_resume.py` regenerated the PDF at 4,899 bytes. `pypdf` extracted 3,879 characters from exactly one page and confirmed the loopback cancellation, agent-child cleanup, exit 130/143, no-success-aggregate, and recovery/production boundary wording.
- Profile: in a clean ephemeral source copy under `node:24-bookworm` (`node v24.18.0`, npm 11.16.0), `npm ci` installed 267 packages; `npm audit --audit-level=high` reported 0 vulnerabilities; `npm run check` reported 0 errors, warnings, or hints; `WB_BASE=/WaffleBits npm run build` passed. `npm run test:evidence` validated 18 proof items, 6 capabilities, and 7 projects; `npm run test:rendered` passed with 33,393-byte rendered HTML. Additional artifact checks confirmed 18 proof rows and the exact source link and evidence boundary.
- Runtime: Astro preview returned HTTP 200 for `/WaffleBits/` and `/WaffleBits/evidence.json`; the served manifest contained 18 proof items and the page included the remote-cancellation link.
- Publication: not yet attempted. The current change set has not been committed or pushed; PR/Pages verification remains after final diff review.

## Remaining evidence boundary

The remote-cancellation artifact is a deterministic authenticated loopback protocol/process test. It does not establish interrupted-work recovery, arbitrary network conditions, multi-host fleet operation, production recovery, or production SLOs.
