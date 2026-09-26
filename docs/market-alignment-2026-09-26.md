# Market alignment and evidence update - 2026-09-26

## Official role sample

The following active company listings were read from primary Ashby or Greenhouse
sources on 2026-09-26. Dates are the listing/feed publication fields. Compensation
is copied exactly from the source; equity and total compensation are not inferred.
No closing date was exposed in the records below.

| Role | Canonical listing | Published / updated | Compensation as listed | Location / work mode | Repeated requirements relevant here |
|---|---|---:|---|---|---|
| OpenAI, Software Engineer, Model Runtime | https://jobs.ashbyhq.com/openai/ec317080-e2d2-4a73-93e6-e0a9ae6fdf96 | 2026-08-24 / not separately exposed | `$266K – $445K • Offers Equity` | San Francisco; `Hybrid`; applicant location requirement United States | LLM runtime, scheduling, continuous batching, memory and KV-cache management, distributed execution across chips/hosts/racks, latency/throughput/utilization, profiling, observability, correctness, reliability, Python/C++/Rust systems work |
| Cohere, Senior Software Engineer, GPU Infrastructure (HPC) | https://jobs.ashbyhq.com/cohere/ef9b939d-da66-464c-a878-ef45616c0473 | 2026-09-03 / not separately exposed | `CA$285K – CA$340K • Offers Equity` (Canada); `Base Salary $235K – $285K • Offers Equity` (USA - California, New York and Washington); `Base Salary $200K – $240K • Offers Equity` (USA - all other states) | Canada with United States secondary location; `Hybrid`; applicant locations United States and Canada | Kubernetes GPU/TPU superclusters, multi-cloud operations, throughput/latency, stability/scalability/observability, Python and Go, Linux/RDMA, troubleshooting, 24x7 on-call |
| Figma, IT Engineer, Internal AI Infrastructure | https://boards.greenhouse.io/figma/jobs/6164379004?gh_jid=6164379004 | first published 2026-08-27; updated 2026-08-27 | `$153,000 - $269,000 USD` annual base salary | San Francisco, New York, or United States remote | Internal AI hosting, model routing by cost/capability/policy, observability, usage analytics, audit logging, per-team cost attribution, identity/access controls, resilient production systems, LLM operations |

The recurring signal is a systems map rather than a keyword list: strong roles
connect runtime or platform behavior to performance, reliability, security,
observability, and cost evidence, and expect engineers to explain the relevant
languages and systems boundary.

## Live public evidence inventory

The live `WaffleBits` account and public repository metadata were read through the
GitHub API on 2026-09-26:

- `WaffleBits` has 21 public repositories. The profile repository is the public
  TypeScript/Astro site at https://github.com/WaffleBits/WaffleBits, described as
  `Portfolio: platform security and AI infrastructure engineering`, with Pages at
  https://wafflebits.github.io/WaffleBits/.
- The strongest relevant repositories are `triton-inference-benchmark` (Python
  serving benchmark, authenticated agents, lifecycle and recovery fixtures),
  `secure-gpu-inference-gateway` (policy, budgets, audit and telemetry),
  `deterministic-inference-scheduler` (Rust batching/KV-cache replay and release
  gates), `triton-kernel-lab` (Triton correctness/performance artifacts),
  `market-microstructure-engine` (C++20/Python parity), and
  `readiness-control-tower` (synthetic operational dashboard).
- Public main was at `13c06e3` (`feat: render public verification index (#49)`).
  The Pages workflow for that commit passed in run
  https://github.com/WaffleBits/WaffleBits/actions/runs/36128474502. The live
  page returned HTTP 200 and contained the 12-row verification index before this
  change.
- The inspected public READMEs and file trees expose concrete code, tests, CI,
  reports, dashboards, and explicitly bounded synthetic/projection artifacts.

### Evidence map

**Already demonstrated:**

- Authenticated inference benchmark coordination with explicit TLS trust, wrong
  credential and wrong-CA rejection, bounded completed-result recovery,
  coordinator restart reconciliation, and privacy-safe aggregate artifacts.
- Ordered benchmark trend reports with explicit p95-latency, throughput,
  success-rate, and retry-amplification gates.
- Controlled local process-launch-to-loopback-health qualification with a shell-free
  command boundary and redacted JSON/Markdown output.
- Rust continuous batching and paged KV-cache scheduling with replay/release
  evidence; Triton GPU kernel correctness and measured latency; Python/C++20
  matching-engine parity; gateway access-control and observability controls.

**Present but buried:**

- `src/data/portfolio.ts` already contains a typed `capability` map covering AI
  serving, security, observability, low-level systems, operations, and the daily
  toolchain. Each statement is supported by the public work or work-history
  content, but the page does not render the map.
- The profile's new verification index links individual artifacts, but it does
  not give a reviewer one compact systems-level view of which recurring role
  requirement each group of artifacts addresses.

**Missing and not claimed:**

- Production-scale multi-host operation, real GPU-cluster ownership, model or
  accelerator cold-start timing, 24x7 production on-call, enterprise adoption,
  and production SLOs remain outside the public evidence boundary. This change
  does not imply any of them.

## Exactly one selected gap

**Render the existing capability map as an evidence-backed systems map in the
`WaffleBits` Astro profile.**

This is one presentation-and-navigation change, not a new repository, metric, or
experience claim. It closes the discoverability gap across the sampled roles:
a reviewer can see the platform/security/performance/operations surface in plain
language, the technical stack behind each group, and the existing public or
on-page evidence to inspect. The map will remain subordinate to the artifacts;
it will not claim production scale or add unsupported technologies.

## Implementation plan

1. Extend the existing typed capability entries with a verified evidence target
   and render them in an accessible `#capabilities` section. Use public repository
   links for project-backed groups and the existing experience/work anchors for
   work-history/toolchain groups.
2. Add one restrained navigation link and responsive rule-based styling. Preserve
   the current verification index and all existing claim-boundary wording.
3. Extend the Pages workflow's rendered-output assertions to prove the section,
   all six capability rows, representative repository links, and the existing
   evidence/project links survived the production build.
4. Reproduce the repository's checks in a clean `node:24-bookworm` Docker copy
   because the Oracle Linux 7 host Node binary is incompatible: `npm ci`,
   `npm audit --audit-level=high`, `npm run check`, `npm run build`, and rendered
   output validation. Exercise the built site through the local preview server,
   inspect the resume PDF without changing it, and run `git diff --check` on text.
5. Commit on a feature branch, push without force, open a PR, require the Pages
   workflow/deployment to pass, merge only after the relevant checks are green,
   and read back the remote commit and live rendered page.

## Implementation and verification

The plan was implemented in the existing `WaffleBits` Astro repository on branch
`feat/render-capability-evidence-20260926`:

- `src/data/portfolio.ts` now gives each existing capability entry a verified
  destination, whether it is an external artifact, and a restrained link label.
  No capability wording or project measurement was invented.
- `src/pages/index.astro` renders the existing six-entry map as an accessible
  `#capabilities` section. It links project-backed groups to their public
  repositories and points the work-history/toolchain groups to the existing page
  sections.
- `src/components/Nav.astro` adds the Capabilities section link.
- `src/styles/global.css` adds the responsive, rule-based capability layout.
- `.github/workflows/pages.yml` checks the section, all six capability rows,
  representative artifact links, the existing 12 proof rows, base-path assets,
  and prior project links.
- `docs/market-alignment-2026-09-26.md` records the source research, evidence
  boundary, and implementation scope. The resume source/PDF and the underlying
  project repositories were not changed.

The required clean-host reproduction passed in a fresh `node:24-bookworm`
container using an ephemeral source copy, owner-writable npm directories, and
`WB_BASE=/WaffleBits`:

- `node --version`: `v24.18.0`; `npm --version`: `11.16.0`.
- `npm ci`: passed; 267 packages installed.
- `npm audit --audit-level=high`: passed at the requested threshold. The output
  reports one existing **moderate** `devalue <5.9.1` advisory
  (`GHSA-9rgm-9g3h-6x36`); no high-severity finding was reported. This remains a
  disclosed dependency follow-up rather than a claim of a clean audit.
- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `WB_BASE=/WaffleBits npm run build`: passed; one static page generated.
- Rendered output validation: passed. The production HTML was 29,169 bytes,
  contained the capability and verification sections, all 12 proof rows and six
  capability rows, representative public links, correct `/WaffleBits/` asset
  paths, and no em dash or welded asset path.
- `npm run preview -- --host 127.0.0.1` was exercised against
  `http://127.0.0.1:4321/WaffleBits/`: HTTP 200 and 29,169-byte response with
  both new and existing sections.
- The unchanged `public/assets/AdnanBerik-Resume.pdf` was inspected with
  `pypdf`: one page, 4,849 bytes, readable extracted text with identity, role,
  clearance, and GitHub fields present.
- `git diff --check` passed for tracked text changes, excluding only the binary
  PDF path.

## Publication verification

- PR [#50](https://github.com/WaffleBits/WaffleBits/pull/50) was merged with
  squash after its pull-request `build` check passed in
  [run 36238111234](https://github.com/WaffleBits/WaffleBits/actions/runs/36238111234).
  Its implementation merge is
  [`e81ab9f`](https://github.com/WaffleBits/WaffleBits/commit/e81ab9fdca7444f0d80c4e2f60c9dee464379b56).
- PR [#51](https://github.com/WaffleBits/WaffleBits/pull/51) merged the completed
  publication record. The public contents API read back both the updated page
  source and this report from `main` after that merge. Its post-merge Pages
  workflow,
  [36238271391](https://github.com/WaffleBits/WaffleBits/actions/runs/36238271391),
  passed both `build` and `deploy`; GitHub Pages reported `built`.
- PR [#52](https://github.com/WaffleBits/WaffleBits/pull/52) corrected the
  publication wording after the report-only merge. Its post-merge Pages
  workflow,
  [36238419763](https://github.com/WaffleBits/WaffleBits/actions/runs/36238419763),
  also passed both `build` and `deploy`.
- The live profile at https://wafflebits.github.io/WaffleBits/ returned HTTP 200
  after deployment. A cache-busting read found the new `#capabilities` section,
  the `systems → evidence` label, six capability rows, all 12 proof rows,
  representative benchmark/gateway/scheduler links, and the `/WaffleBits/`
  resume asset path.

The remaining evidence gap is unchanged: the public work demonstrates controlled
and synthetic evidence, not production-scale multi-host operation, real
GPU-cluster ownership, model/accelerator cold-start timing, 24x7 production
on-call, enterprise adoption, or a production SLO.
