# Market alignment and resume evidence plan — 2026-10-27

## Official role sample

Checked against active company feeds/postings on 2026-10-27. Salary and work constraints are quoted as posted; no equity value is inferred.

| Role | Official listing | Publication/update date exposed | Compensation | Location / work mode | Recurring requirements |
|---|---|---|---|---|---|
| OpenAI — Software Engineer, Compute Foundations | https://jobs.ashbyhq.com/openai/40f2f959-20f8-40ca-8b8c-154b6774193a | Published 2026-09-16 23:39 UTC | `$255K–$490K` salary; equity offered separately | San Francisco | Kubernetes controllers, distributed infrastructure, reconciliation/idempotency, lifecycle recovery, staged rollout, GPU systems. |
| Anthropic — Performance Engineer, Inference Systems | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | Greenhouse exposes updated 2026-08-21 12:50 -04:00; original publication date not exposed | Annual salary `$350,000–$850,000 USD` | San Francisco, New York City, or Seattle | Inference throughput/latency/reliability/correctness, observability, profiling, and regression detection. |
| Runpod — Senior ML Systems Engineer, Inference | https://jobs.ashbyhq.com/runpod/6c67ef7b-ae53-42fd-a1ca-6c635f8f00ff | Published 2026-10-01 17:16 UTC | Base pay `$150,000–$220,000`; stock options mentioned without a published dollar value | Remote — USA | Repeatable inference measurement, batching/scheduling/memory/kernel analysis, single- and multi-node GPUs, vLLM/SGLang, and 5+ years of systems experience. |

Across this sample, repeatable correctness, performance analysis, reliability, and inference scheduling recur. Production-scale and multi-node ownership are experience requirements; local synthetic fixtures cannot establish them.

## Live evidence and gap

The live `WaffleBits` profile has 21 public repositories and an Astro/TypeScript profile repository. Relevant public repositories are active, unarchived, and not forks: `deterministic-inference-scheduler` (Rust), `triton-inference-benchmark` (Python), `secure-gpu-inference-gateway` (Python), and `triton-kernel-lab` (Python/Triton). The profile README and rendered site already expose scheduler priority aging and link to its test.

The scheduler's public default branch contains configurable priority aging. Its deterministic synthetic regression admits an older low-priority request at tick 4 during continued higher-priority arrivals. The merged commit is [`ab68776`](https://github.com/WaffleBits/deterministic-inference-scheduler/commit/ab68776d57b720dc1f1ea5fbfe53ada3e9221cde); default-branch CI [40313848729](https://github.com/WaffleBits/deterministic-inference-scheduler/actions/runs/40313848729) passed tests, lint, supply-chain policy, and replay fixtures. The source test is https://github.com/WaffleBits/deterministic-inference-scheduler/blob/main/tests/scheduler.rs.

**Present but buried:** the resume lists deterministic batching, KV-cache scheduling, release gates, and generated tests, but omits the newly merged priority-aging behavior that specifically demonstrates an inspectable queue-scheduling regression.

**Missing:** authorized real multi-node GPU inference operation and production SLO/performance evidence. No suitable live workload or cluster is available to this maintenance task. Do not simulate these into a production claim.

## One selected improvement

Update only the existing one-page PDF resume source and generated artifact to state the implemented priority-aging behavior, its synthetic boundary, and a clickable link to the public scheduler test. The profile README and site already describe this; do not duplicate it elsewhere or add new code/features.

## Acceptance checks

1. Preserve the one-page resume and existing claims; make the new wording match the public test and synthetic fixture exactly.
2. Rebuild the PDF, verify one page, extracted wording, and the link annotation.
3. Run the profile's clean `node:24-bookworm` workflow: `npm ci`, `npm audit --audit-level=high`, `npm run check`, `npm run build` with `WB_BASE=/WaffleBits`, evidence/rendered/preview checks, pinned-action validation, and rendered asset/content assertions.
4. Review the exact diff, push a feature branch, and require the Pages pull-request workflow to pass. Do not merge or claim live publication without authorization and a successful deployment/read-back.
