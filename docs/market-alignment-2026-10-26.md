# Market alignment and scheduler-evidence update — 2026-10-26

## Official role sample

Checked on 2026-10-26 against official Ashby/Greenhouse job feeds and posting content. Compensation and work constraints below follow the posting; unpublished dates are identified as such.

| Exact listing title | Official listing | Date exposed by feed | Compensation as published | Location / work mode | Recurring evidence sought |
|---|---|---|---|---|---|
| Anthropic — Performance Engineer, Inference Systems | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | Updated 2026-08-21 12:50:15 -04:00; original publication date not exposed | `Annual Salary: $350,000 — $850,000 USD` | San Francisco, New York City, or Seattle; company logistics say staff are expected in an office at least 25% of the time | Cross-layer throughput/latency/reliability analysis, inference and accelerator systems, observability, Python, correctness evaluation and regression detection. |
| Runpod — Senior ML Systems Engineer, Inference | https://jobs.ashbyhq.com/runpod/6c67ef7b-ae53-42fd-a1ca-6c635f8f00ff | Published 2026-10-01 17:16:55 UTC | `$150,000 - $220,000` competitive base pay; equity mentioned separately without a value | Remote — USA | Repeatable inference benchmarking, throughput/TTFT/inter-token latency and cost, scheduling and memory diagnosis, batching, GPU profiling, Python, and comparable serving engines such as vLLM/SGLang. Posting asks 5+ years of systems engineering experience. |
| Censys — Distributed Systems Engineer (Data Platform) [posting description calls the role Senior Distributed Systems Engineer] | https://job-boards.greenhouse.io/censys/jobs/8684280002 | Updated 2026-09-27 23:18:44 -04:00; original publication date not exposed | `$174,000 USD - $206,000 USD` in SF Bay/NYC/Seattle; `$151,000 USD - $191,000 USD` elsewhere, plus bonus eligibility and equity | Greenhouse location field says Remote (US/Canada); posting body says remote within the United States / continental US | Reliable distributed data services, testable/maintainable code, monitoring, cloud, queues/databases, and technical communication. The feed/body differ on geography, so the posting body is the narrower constraint. |

Across the sample, reviewable correctness, repeatable tests/measurement, and reliability recur. The inference postings additionally emphasize queue scheduling, latency/throughput, and systems-level bottleneck analysis. These postings are market signals, not claims of personal qualification: seniority, production-scale ownership, and authorized production inference are not established by synthetic portfolio fixtures.

## Public evidence inventory

Live GitHub API inventory was checked as `WaffleBits` on 2026-10-26: 21 public repositories. Profile metadata: no account name is set; bio is `AI infrastructure, GPU performance, secure distributed systems, and mission software.`; website is https://wafflebits.github.io/WaffleBits/. The profile repository is public, unarchived, TypeScript/Astro, default branch `main`, and uses GitHub Pages. Its README and rendered site describe platform security and AI infrastructure. The six pinned repositories are `market-microstructure-engine`, `readiness-control-tower`, `secure-gpu-inference-gateway`, `triton-kernel-lab`, `deterministic-inference-scheduler`, and `heterocore-compiler`.

Strong relevant repositories verified from the live account and public source:

- [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler): Rust continuous-batching/KV-cache simulator with replay, release gates, and tests; active, not a fork or archived, pushed 2026-10-26. PR [#9](https://github.com/WaffleBits/deterministic-inference-scheduler/pull/9) added configurable queued-request priority aging; merged to `main` as `ab68776d57b720dc1f1ea5fbfe53ada3e9221cde`. Default-branch CI run [40313848729](https://github.com/WaffleBits/deterministic-inference-scheduler/actions/runs/40313848729) passed dependency audit, formatting, Clippy, tests, regular replay, the priority-aging replay fixture, and release fixtures. The public test asserts that a low-priority request is admitted at tick 4 before the last higher-priority arrival in the synthetic fixture.
- [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark): Python serving benchmark with authenticated agents, TLS, replay/reconciliation, cancellation, privacy-safe artifacts, and reliability gates; active, not a fork or archived, pushed 2026-10-17.
- [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway): Python access-control gateway and explicitly synthetic resilience/capacity artifacts; active, not a fork or archived, pushed 2026-10-08.
- [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab): Triton kernels with correctness oracles and measured hardware artifacts; active, not a fork or archived, pushed 2026-07-30.

Topic metadata exposes relevant areas rather than proof by itself: scheduler (`inference`, `distributed-systems`, `continuous-batching`, `performance-engineering`, `vllm`, `sglang`); serving benchmark (`inference`, `model-serving`, `load-testing`, `observability`, `performance-engineering`); gateway (`ai-security`, `model-serving`, `observability`, `security`); kernel lab (`gpu`, `cuda`, `kernels`, `performance-engineering`).

At audit start, the profile site and README described the scheduler only at the earlier stable-order/replay level; the new source feature was not yet surfaced there.

## Evidence map

**Already demonstrated:** public Rust implementation and regression test for configurable priority aging; deterministic CLI replay fixture and CI; broader serving benchmark, security gateway, and GPU-kernel repositories.

**Present but buried:** the new scheduler fairness behavior is in public source and passed default-branch CI, but the portfolio's scheduler case file, verification index, and selected-work README do not surface it.

**Missing:** production workload/serving measurements, multi-node GPU operations, and evidence of the 5+ or staff-level production ownership required by some sampled positions. No synthetic replay can fill those gaps.

## Exactly one selected improvement

Update the existing profile site's scheduler case file and verification index, plus the root profile README, to surface the newly merged priority-aging regression and fixture. Keep the boundary explicit: the replay demonstrates deterministic simulator behavior, not production traffic, production fairness, or a performance result. Add assertions so the new proof is present in the machine-readable evidence and rendered site. No new repository, fabricated metric, or general claim of production scheduling will be added.

## Acceptance and verification plan

1. Add one bounded proof record linking directly to the public Rust regression; update the scheduler case-file description and the selected-work README to match the source and fixture.
2. Extend the existing manifest/rendered-output checks and Pages workflow assertions for the new proof and its synthetic-evidence boundary.
3. In a clean disposable source copy, run the real project workflow in Docker `node:24-bookworm`: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, and the repository's evidence/rendered/preview checks. Validate the actual rendered HTML, `evidence.json`, asset paths, and preview HTTP routes.
4. Run `git diff --check`, review the exact diff, commit and push a feature branch without force, open a PR, wait for Pages CI and require it to pass before merge. Then verify post-merge CI/deployment and fetch the live page and evidence manifest.

## Results

### Local verification

- Added one profile evidence item for scheduler priority aging; the scheduler test source remains the public click-through. Updated the scheduler case-file summary and the profile README with the same evidence boundary. Updated the manifest, rendered-page, preview smoke, and Pages output assertions to require the proof and its synthetic-evidence disclaimer.
- The regression test was verified on the live default branch after merge. It asserts admission at tick 4 while higher-priority requests continue arriving; scheduler configuration defaults to an aging interval of 32 ticks. This is deterministic simulator behavior only.
- TDD check: after adding the validator expectation but before the evidence record, the built manifest test failed as expected (`19 !== 20`).
- The first `npm audit --audit-level=high` failed on vulnerabilities already present in the checked-in lockfile. `npm audit fix --package-lock-only` updated transitive resolutions within existing `package.json` ranges; `package.json` is unchanged. A fresh `npm ci` and high-severity audit then reported 0 vulnerabilities.
- Runtime: Docker `node:24-bookworm`, Node `v24.18.0`, npm `11.16.0`. The host filesystem was full during an initial container attempt, so the final clean source copy, npm cache, and generated files were placed in temporary memory-backed storage; no project `node_modules` or build output was created in the checkout.
- `npm ci`: passed (265 packages installed).
- `npm audit --audit-level=high`: passed, 0 vulnerabilities.
- `npm run check`: passed, 0 errors, 0 warnings, 0 hints across 16 Astro files.
- `WB_BASE=/WaffleBits npm run build`: passed, generating the static page and `evidence.json`.
- The exact `Validate build output` shell step extracted from `.github/workflows/pages.yml` passed, including asset/base-path checks and the new proof boundary.
- `npm run test:evidence`: passed, 20 proof items, 6 capabilities, 7 projects.
- `npm run test:rendered`: passed; rendered HTML was 35,447 bytes and manifest counts matched.
- `WB_BASE=/WaffleBits npm run test:preview`: passed; `/WaffleBits/` and `/WaffleBits/evidence.json` returned HTTP 200 and the preview contained the priority-aging evidence.
- `npm run test:workflow-pins`: passed; all 5 external Pages actions remain pinned to full commit SHAs.

## Publication gate

Do not treat the profile evidence as live until the PR Pages workflow, post-merge deployment, and live-page/manifest read-back have all been verified. Local build results alone do not establish publication.

## Remaining gap

The selected update surfaces only a deterministic synthetic scheduler regression. It does not establish production traffic behavior, production fairness outcomes, throughput or latency improvement, GPU profiling, multi-node inference operations, or staff-level production infrastructure ownership.
