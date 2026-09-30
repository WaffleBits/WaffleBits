# Plan: publish project-level evidence records

Date: 2026-09-30
Repository: `WaffleBits/WaffleBits`

## Role signal from primary listings

I read the following active company listings and official job-board records on 2026-09-30. Publication dates and compensation are copied from the listing data. No closing dates were exposed, and equity is not converted into total compensation.

| Role | Canonical listing | Published | Compensation as listed | Location / work mode |
|---|---|---:|---|---|
| OpenAI, Software Engineer, GPT Infrastructure | https://jobs.ashbyhq.com/openai/f3ddd41c-541f-485e-90d6-86c26e018e9f | 2026-04-27 | `$293K – $385K • Offers Equity` | San Francisco, California; structured feed exposes `TELECOMMUTE`; United States applicant requirement |
| Confluent, Staff Software Engineer | https://jobs.ashbyhq.com/confluent/80a47c3e-a160-4277-a452-1eef9c689167 | 2026-07-22 | `$235.7K – $277K • Offers Equity` | Mountain View, California; structured feed exposes `TELECOMMUTE`; United States applicant requirement |
| Snowflake, Staff Software Engineer - FDB Platform | https://jobs.ashbyhq.com/snowflake/3b88b373-39b0-472c-99ec-410efdf37a15 | 2026-06-30 | `$236,000 – $339,250 • Offers Equity` | US-CA-Menlo Park; no remote mode exposed in the listing record |

Repeated requirements are a systems boundary rather than a keyword count: distributed or stateful systems, platform/control-plane design, resource and failure management, measurable performance, observability, security, cloud/container operations, and artifacts that let another engineer inspect the decision. OpenAI also calls out retries, checkpointing, budgets, secure execution, provenance, and regression testing. Confluent emphasizes Kubernetes control loops/API servers, networking, and resource isolation. Snowflake emphasizes cloud-agnostic stateful services, cluster management/autoscaling, and database/distributed-systems fundamentals.

## Public evidence inventory

The authenticated `WaffleBits` account was read through the GitHub API before implementation. It exposes 21 public repositories. The profile repository is the TypeScript/Astro site at https://github.com/WaffleBits/WaffleBits, published at https://wafflebits.github.io/WaffleBits/.

The strongest relevant public repositories and inspected evidence are:

- `triton-inference-benchmark`: Python serving benchmark with authenticated agents, explicit TLS trust, restart reconciliation, lifecycle qualification, trend gates, and content-addressed qualification evidence.
- `secure-gpu-inference-gateway`: Python gateway with access control, budgets, audit records, Prometheus/OpenTelemetry telemetry, deployment posture, and resilience artifacts.
- `deterministic-inference-scheduler`: Rust continuous-batching and paged-KV scheduling model with replay and release gates.
- `triton-kernel-lab`: Triton kernels with correctness oracles, raw timing artifacts, and regression checks.
- `market-microstructure-engine`: C++20/Python matching-engine parity and latency artifacts.

The profile's source model already contains seven typed `caseFiles` entries. Each includes a project summary, problem, system boundary, evidence description, impact, public repository URL, and optional demo or chart. The current public `evidence.json` endpoint exposes only the separate proof and capability arrays, so the richer project-level design and verification records are present in source but not available to reviewers or tooling as a stable contract.

### Evidence map

**Already demonstrated:**

- Public code, tests, CI, measured or synthetic artifacts, operational notes, and explicit claim boundaries across the benchmark, gateway, scheduler, kernels, and matching engine.
- A privacy-checked machine-readable manifest for the existing proof ledger and capability map.
- Typed project records in `src/data/portfolio.ts` that describe problem, system, evidence, and impact without adding new claims.

**Present but buried:**

- `caseFiles` contains the clearest project-level explanation of why each system exists, what it implements, and what a reviewer can inspect, but the array is not rendered or exported.
- The existing `evidence.json` link is discoverable, but a consumer cannot retrieve a stable project-level systems map from it.

**Missing and not claimed:**

- Production-scale multi-host operation, real GPU/TPU cluster ownership, 24x7 production on-call, enterprise adoption, production SLOs, and unverified fleet/RDMA/NCCL experience remain outside the public evidence boundary.

## Exactly one selected gap

**Publish the existing typed project records as validated, privacy-safe entries in the profile's `evidence.json` contract.**

This is one artifact discoverability and evidence-contract change. It does not add a repository, metric, technology, production claim, or resume wording. The endpoint will expose the existing project summary, problem, system, evidence, impact, tags, role surfaces, and public links. Validation will reject duplicate IDs, non-public links, missing fields, and credential/path-like content. The visible link will make clear that the artifact includes project records as well as the existing proof and capability data.

## Implementation and verification steps

1. Extend `src/pages/evidence.json.ts` to derive a `projects` array from `caseFiles`, normalizing role labels and preserving optional public demo/chart links.
2. Extend the dependency-free evidence validator with project schema, count, uniqueness, public-link, and privacy assertions; extend rendered-output validation to check the project count.
3. Update the Pages workflow so the production build and CI validate the new contract without changing existing page claim wording.
4. Reproduce the canonical checks in an ephemeral `node:24-bookworm` source copy because the Oracle Linux 7 host Node binary cannot start: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `WB_BASE=/WaffleBits npm run build`, evidence validation, rendered-output validation, preview HTTP read-back, PDF inspection, and `git diff --check`.
5. Commit only the scoped plan, endpoint, validators, workflow, and link-label files on this branch. Push without force, open a PR, require the Pages build/deployment workflow to pass, merge only after the relevant checks are green, and read back the merged remote and live manifest/page.
