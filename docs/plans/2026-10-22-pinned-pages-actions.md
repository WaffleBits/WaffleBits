# Plan: pin Pages workflow actions to immutable commits

Date checked: 2026-10-22
Repository: `WaffleBits/WaffleBits` (public Astro profile)
Branch: `fix/pin-pages-actions-20261022`

## Current official role sample

Checked on 2026-10-22 against official Ashby/Greenhouse job-board feeds. Listings below were present in their active feeds. Ashby exposes its publication timestamp; Greenhouse exposes `updated_at`, not an original publication date. Compensation is copied from each post; base pay and office constraints are not inferred.

| Role | Official listing | Published / feed updated | Compensation as listed | Location / work mode | Repeated requirements relevant here |
|---|---|---|---|---|---|
| Anthropic — Performance Engineer, Inference Engine | https://job-boards.greenhouse.io/anthropic/jobs/5418323008 | Feed updated 2026-09-09 19:09:53 -04:00 | Annual salary `$350,000 — $850,000 USD` | San Francisco, CA or New York City, NY; at least 25% office attendance under current policy | Inference systems depth, profiling before changes, hypothesis-driven optimization, code quality and tests. |
| Robinhood — Staff Software Engineer, AI Security | https://boards.greenhouse.io/robinhood/jobs/8214383?t=gh_src=&gh_jid=8214383 | Feed updated 2026-10-06 12:11:22 -04:00 | Base pay: Zone 1 `$230,000 — $270,000 USD`; Zone 2 `$203,000 — $238,000 USD`; Zone 3 `$180,000 — $211,000 USD`, plus bonus/equity/benefits | Bellevue, WA or Menlo Park, CA; listing requires at least three office days/week | Secure AI platform, identity/authentication/authorization, cloud-native and distributed systems, reusable platform capabilities, automation for reliability and security. |
| Point72 — GenAI Security Engineer | https://boards.greenhouse.io/point72/jobs/8399360002?gh_jid=8399360002 | Feed updated 2026-09-23 04:47:54 -04:00 | Annual base salary `$225,000-$300,000 (USD)`, excluding discretionary bonus and benefits | New York, NY | AI security controls, agent/tool-calling protection, containerized services/Kubernetes, infrastructure and application pipelines, control testing and audit-ready evidence. |
| Runpod — Senior ML Systems Engineer, Inference | https://jobs.ashbyhq.com/runpod/6c67ef7b-ae53-42fd-a1ca-6c635f8f00ff | Published 2026-10-01 17:16:55.632 UTC | Base pay `$150,000 - $220,000`; posting also describes equity | Remote — USA | Python, vLLM/SGLang or comparable serving, rigorous repeatable benchmarking, GPU profiling, production-ready inference runtimes. |

This is a role-market sample, not a claim of fit or production experience. Security-by-design, automated infrastructure/application pipelines, and testable delivery are particularly explicit in the two security listings; performance profiling and repeatable measurement recur in the inference roles.

## Live public evidence inventory

GitHub API access authenticated as `WaffleBits` confirmed 21 public repositories. The profile repository is public, unarchived, TypeScript/Astro, with the live site at https://wafflebits.github.io/WaffleBits/. The profile README and six pinned projects were read from the account. The strongest relevant public projects include:

- [deterministic-inference-scheduler](https://github.com/WaffleBits/deterministic-inference-scheduler): Rust continuous-batching/KV-cache scheduler with deterministic replay and bounded generated property tests; last pushed 2026-10-21.
- [triton-inference-benchmark](https://github.com/WaffleBits/triton-inference-benchmark): Python serving benchmark with authenticated agents, restart reconciliation, privacy-safe artifacts, and reliability gates.
- [secure-gpu-inference-gateway](https://github.com/WaffleBits/secure-gpu-inference-gateway): Python inference gateway with access policy, budgets, audit/observability, and explicitly synthetic capacity/resilience artifacts.
- [triton-kernel-lab](https://github.com/WaffleBits/triton-kernel-lab): Triton GPU kernels with correctness oracles and measured hardware artifacts.

The profile's existing Pages workflow already runs dependency audit, Astro diagnostics, build, artifact/schema/render checks, and preview HTTP smoke tests. A read of the public `main` workflow confirmed all five external actions used floating major-version tags (`checkout@v4`, `setup-node@v4`, `upload-pages-artifact@v5`, `configure-pages@v6`, `deploy-pages@v5`). This was a remaining supply-chain reproducibility gap in an otherwise gated deployment workflow.

## Evidence map and one selected improvement

**Already demonstrated:** a public Pages workflow with least-privilege permissions, locked npm install, high-severity audit, diagnostics, static build, evidence/privacy assertions, rendered-output validation, and HTTP preview smoke testing.

**Missing:** external GitHub Actions were referenced by mutable major-version tags, and no CI check prevented a later tag-based reference from being reintroduced.

**Exactly one selected gap:** pin all external actions in this existing Pages workflow to full commit SHAs and add a small repository check that rejects non-SHA external action references. This is a bounded secure-pipeline hardening change aligned with the live security roles' explicit infrastructure/application pipelines, security-by-design, and automation requirements. It changes no profile/resume claims and does not imply production-scale CI experience.

## Implementation and acceptance plan

1. Add `scripts/validate-workflow-pins.mjs` and an npm script that checks external action references in the Pages workflow for 40-character commit SHAs; run it before changing the current tags and confirm the expected failing result.
2. Pin each of the five external actions to the commit currently resolved from its official major-version tag, retaining the major version in a comment. Add the pin check to the workflow.
3. In an ephemeral source copy, reproduce the site pipeline in `node:24-bookworm`: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, `npm run test:evidence`, `npm run test:rendered`, `WB_BASE=/WaffleBits npm run test:preview`, and the new workflow pin check. Inspect built output and privacy/evidence validation, run `git diff --check`, and verify no generated files are tracked.
4. Commit and push a feature branch, open a PR, require the Pages workflow to pass, merge only after that check is green, and verify the post-merge deployment and live profile/evidence routes.

## Implementation and local verification

- `scripts/validate-workflow-pins.mjs` and `npm run test:workflow-pins` were added; the Pages workflow runs this policy check after `npm ci`. Before pinning, the check failed as expected on all five floating refs: `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v5`, `actions/configure-pages@v6`, and `actions/deploy-pages@v5`.
- The five actions are now pinned to the commits returned by their official `v4`/`v5`/`v6` refs: checkout `11d5960a326750d5838078e36cf38b85af677262`, setup-node `49933ea5288caeca8642d1e84afbd3f7d6820020`, upload-pages-artifact `fc324d3547104276b827a68afc52ff2a11cc49c9`, configure-pages `45bfe0192ca1faeb007ade9deae92b16b8254a0d`, and deploy-pages `368f82528645a54fb793d4d04e342629a3f51346`. The workflow keeps the major-version labels as comments for review.
- Full repository checks ran in a clean ephemeral source copy using Docker `node:24-bookworm` (Node `v24.18.0`, npm `11.16.0`); the host Node executable is incompatible with this Oracle Linux 7/glibc 2.17 host.
  - `npm ci`: passed. npm printed a non-fatal `allowScripts` notice for `esbuild@0.28.1`.
  - `npm audit --audit-level=high`: passed, 0 vulnerabilities.
  - `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
  - `WB_BASE=/WaffleBits npm run build`: passed.
  - `npm run test:evidence`: passed, 19 proof items / 6 capabilities / 7 projects.
  - `npm run test:rendered`: passed, validating 34,788-byte rendered HTML and the 19/6/7 manifest counts.
  - `WB_BASE=/WaffleBits npm run test:preview`: passed; both site and evidence JSON routes returned HTTP 200 with 19/6/7 counts.
  - `npm run test:workflow-pins`: passed, confirming all 5 external actions use full commit SHAs.
  - Independent artifact inspection found `dist/index.html` (34,885 bytes), `dist/evidence.json` (21,806 bytes), the profile title, and the expected 19/6/7 records.
- No profile or resume claims changed. The implementation is CI pipeline hardening, not evidence of production-scale CI or platform operation.

## Pull request and publication results

- PR [#73](https://github.com/WaffleBits/WaffleBits/pull/73) merged at `ff9c29421fbf257711578074fa29b6dad8fc7f7c` on 2026-10-22 11:07:03 UTC. Its Pages PR run [39768088635](https://github.com/WaffleBits/WaffleBits/actions/runs/39768088635) passed the build job, including the new pinned-action check, audit, Astro diagnostics, build, evidence/render validation, and preview HTTP smoke. The deploy job was skipped for the pull-request event as configured.
- Post-merge Pages run [39768172105](https://github.com/WaffleBits/WaffleBits/actions/runs/39768172105) passed both build and deployment. API read-back from `main` confirmed all five action references are full commit SHAs.
- Cache-busted live requests returned HTTP 200 for the [profile](https://wafflebits.github.io/WaffleBits/) and [evidence manifest](https://wafflebits.github.io/WaffleBits/evidence.json). The live page contains the profile title and 19 proof rows; the manifest contains 19 proof items, 6 capabilities, and 7 projects.
- GitHub emitted non-blocking notices that checkout/setup-node's pinned v4 commits declare the deprecated Node 20 action runtime (the runner forced Node 24), and that `ubuntu-latest` is migrating to Ubuntu 26. The workflow completed successfully; these notices are retained as maintenance items rather than obscured.

## Remaining gap

This change hardens only the profile repository's small Pages workflow. It does not establish high-volume/remote build execution, production-scale CI ownership, or large-scale service operation. The two v4 actions' Node 20 runtime notices should be reviewed before GitHub removes compatibility; no action-version upgrade was included in this bounded pinning change.
