# Market alignment and evidence update — 2026-09-23

## Official role sample

Public Greenhouse records were read on 2026-09-23. Dates below are the feed's
`first_published` and `updated_at` values; compensation is copied exactly when
shown, not inferred.

| Role | Source dates | Location | Published compensation |
|---|---|---|---|
| [Software Engineer, Research Infrastructure](https://job-boards.greenhouse.io/anthropic/jobs/5283063008) — Anthropic | first published 2026-07-06; updated 2026-09-09 | San Francisco, CA; New York City, NY | $405,000 — $625,000 USD annual salary |
| [Staff + Senior Software Engineer, Inference Infrastructure](https://job-boards.greenhouse.io/anthropic/jobs/5245851008) — Anthropic | first published 2026-06-08; updated 2026-09-03 | San Francisco, CA; New York City, NY; Seattle, WA | $320,000 — $485,000 USD annual salary |
| [Performance Engineer, Inference Systems](https://job-boards.greenhouse.io/anthropic/jobs/5224564008) — Anthropic | first published 2026-05-20; updated 2026-08-21 | San Francisco, CA; New York City, NY; Seattle, WA | $350,000 — $850,000 USD annual salary |
| [AI Infrastructure Systems Engineer](https://job-boards.greenhouse.io/togetherai/jobs/5138540007) — Together AI | first published 2026-05-14; updated 2026-09-09 | San Francisco | $190,000 - $270,000 + equity + benefits |

Repeated requirements are Python plus Rust or Go, distributed systems and
infrastructure platforms, Kubernetes/cloud tooling, inference or accelerator
systems, performance measurement/profiling, and evidence-based reliability
work. The sample also repeatedly asks for operating systems across multiple
hosts or cloud environments rather than only writing an isolated model call.

## Evidence map and one selected gap

- **Already demonstrated:** public Triton/OpenAI-compatible load generation;
  authenticated coordinator-agent execution; TLS with explicit CA trust;
  restart reconciliation; JSON/Prometheus aggregate artifacts; CI fixtures;
  GPU kernel correctness and latency measurement; scheduler replay and release
  gates.
- **Present but buried:** repeatable benchmark summaries and retry/latency/
  throughput fields existed in saved run artifacts, but there was no public
  ordered-run report that made trend and regression decisions inspectable.
- **Missing:** production-scale, multi-host deployment and partial-workflow
  continuation remain unclaimed. This change does not imply either.

**Selected gap:** saved benchmark reports with trend comparisons over time.
This closes several recurring requirements at once: performance analysis,
release/regression gates, reliability accounting, and privacy-conscious
operational evidence, while extending the existing benchmark rather than
creating a duplicate repository.

## Implemented and verified

`WaffleBits/triton-inference-benchmark` now contains `benchmark_report.py`, a
standard-library CLI that projects only measured run summaries, compares
adjacent runs in caller-supplied order, and gates p95 latency, throughput,
success rate, and retry amplification. It omits paths, endpoints, prompts,
raw outputs, configuration, and credentials from emitted JSON/Markdown. The
implementation, tests, CLI fixture, documentation, and CI change were merged
in [PR #24](https://github.com/WaffleBits/triton-inference-benchmark/pull/24)
(commit `b3ac43e`); the post-merge [CI run](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/35854305689)
passed.

The WaffleBits profile and one-page resume now surface this exact behavior. The
claim boundary remains single-host synthetic protocol evidence; no production
throughput, multi-host recovery, or partial-workflow continuation is claimed.
