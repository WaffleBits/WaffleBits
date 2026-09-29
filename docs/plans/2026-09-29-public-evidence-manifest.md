# Plan: publish a machine-readable evidence manifest

Date: 2026-09-29
Repository: `WaffleBits/WaffleBits`

## Role signal from primary listings

I read these current official company job-board postings on 2026-09-29. Dates and compensation are copied from the listing data; no closing dates were exposed.

| Role | Canonical listing | Published | Compensation as listed | Location / work mode |
|---|---|---:|---|---|
| LiveKit, Staff Software Engineer, Distributed Systems | https://jobs.ashbyhq.com/livekit/b278b3c7-f9cd-4564-9c6b-ee655de75039 | 2026-07-23 | `$135K - $300K` USD, offers equity | Telecommute; applicant regions APJ, EMEA, and NAMER |
| Saviynt, Principal Engineer, Cloud Platforms | https://jobs.lever.co/saviynt/4c04d8f8-6238-4b67-a45b-bdce049af145 | 2026-02-18 | `$235,000 - $250,000 a year`; discretionary bonus may apply | Milpitas, California or Atlanta; no remote mode stated |
| Aledade PBC, Principal Engineer - AI Data and Infrastructure, Remote | https://jobs.lever.co/aledade/e9636a60-5455-4a52-afed-eeadb50424cd | 2026-05-26 | Not exposed; stock options and benefits are listed | Remote, United States |
| Agave, Senior Software Engineer | https://jobs.ashbyhq.com/agave/17152c30-ad35-403d-a144-80bcfeee5cfa | 2026-09-25 | `$220K - $285K` USD, offers equity, bonus, and sign-on bonus | San Francisco; five days in office for Bay Area candidates, remote optional outside the Bay Area |

Repeated requirements are a systems boundary rather than a keyword count: resilient distributed services, state/coordination and failure handling, measurable performance, observability, security and policy, cloud/platform automation, CI/CD, and artifacts or explanations that let another engineer verify the decision. LiveKit and Agave emphasize end-to-end ownership and understandable tradeoffs; Saviynt and Aledade emphasize shared platforms, reliability, cloud/data infrastructure, and internal consumers.

## Public evidence inventory

The authenticated `WaffleBits` account was read from the GitHub API before implementation. It has 21 public repositories. The profile repository is the TypeScript/Astro site at https://github.com/WaffleBits/WaffleBits, published at https://wafflebits.github.io/WaffleBits/.

The strongest relevant repositories are:

- `triton-inference-benchmark`: Python serving benchmark with authenticated agents, TLS trust, restart reconciliation, privacy-safe aggregates, lifecycle qualification, trend gates, and content-addressed qualification evidence.
- `secure-gpu-inference-gateway`: Python gateway with access control, budgets, audit records, Prometheus/OpenTelemetry telemetry, and deployment posture checks.
- `deterministic-inference-scheduler`: Rust continuous-batching and paged-KV scheduling model with replay and release gates.
- `triton-kernel-lab`: Triton kernels with correctness oracles, raw timing artifacts, and regression checks.
- `market-microstructure-engine`: C++20/Python matching-engine parity and latency artifacts.

The profile already renders a verification index and capability map. Its typed `proof` and `capability` arrays are the source of truth, but a reviewer or tool still has to parse the HTML to consume the evidence. The current page is human-readable; it does not publish a stable, privacy-reviewed structured contract for the existing claims.

## Exactly one selected gap

**Publish a machine-readable, privacy-safe evidence manifest derived from the existing typed profile data.**

This is one artifact-management and discoverability change. It does not add a project, metric, technology, or production claim. The manifest will expose the existing proof statements, capability links, evidence kind, topic labels, and explicit boundary text. It will omit private request data, credentials, prompts, raw telemetry, and local filesystem paths. It directly supports the recurring role expectation that systems, decisions, and provenance be understandable and reviewable.

The following remain explicitly out of scope and will not be implied by this change: production-scale multi-host operation, real GPU-cluster ownership, multi-region production SLOs, 24x7 production on-call, enterprise adoption, and unverified Go/Kubernetes/RDMA/service-mesh experience.

## Implementation and verification steps

1. Add a static `evidence.json` endpoint that derives a stable schema from the existing `proof` and `capability` arrays, with public links and evidence-boundary metadata only.
2. Add a visible link to the manifest beside the existing verification index so the artifact is discoverable without changing the existing claim wording.
3. Add a dependency-free Node validator that checks schema, counts, unique IDs, public-link scope, non-empty statements, and privacy-sensitive patterns in the built artifact.
4. Run that validator in the existing Pages workflow and assert the manifest/link survive the production build.
5. Reproduce the repository checks in a clean `node:24-bookworm` container because the Oracle Linux 7 host Node binary cannot start: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `npm run build`, evidence validation, rendered-output assertions, preview HTTP read-back, PDF inspection, and `git diff --check`.
6. Commit only the scoped files on this feature branch, push without force, open a PR, require the Pages build/deployment workflow to pass, then read back the merged remote and live page.
