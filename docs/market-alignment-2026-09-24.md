# Market alignment and evidence update - 2026-09-24

## Official role sample

The following official Ashby listings were read on 2026-09-24. Each page was
listed as active when read; `datePosted` is the page's structured publication
field. Compensation is copied exactly from the listing and is not a total-
compensation estimate.

| Role | Canonical listing | Published | Compensation | Location / work mode | Repeated requirements relevant here |
|---|---|---:|---|---|---|
| Baseten, Software Engineer - Baseten Inference Stack | https://jobs.ashbyhq.com/baseten/c8701794-bdc1-4932-bffa-a444ce57ed73 | 2026-06-02 | `$180K – $360K • Offers Equity` | San Francisco; Hybrid | Distributed inference orchestration; routing, autoscaling, scheduling, observability; reliability and benchmarking; deployment and monitoring; Kubernetes and GPU workloads |
| OpenAI, Software Engineer, GPT Infrastructure | https://jobs.ashbyhq.com/openai/f3ddd41c-541f-485e-90d6-86c26e018e9f | 2026-04-27 | `$293K – $385K • Offers Equity` | San Francisco; Hybrid; Seattle secondary location | Long-running workload qualification; retries, checkpointing, budgets, observability; secure execution; correctness and performance evaluation; provenance and regression workflows |
| OpenAI, Software Engineer, Model Runtime | https://jobs.ashbyhq.com/openai/ec317080-e2d2-4a73-93e6-e0a9ae6fdf96 | 2026-08-24 | `$266K – $445K • Offers Equity` | San Francisco; Hybrid | Scheduling, continuous batching, memory and KV-cache management; latency, throughput, and utilization; profiling, observability, benchmarking; correctness, reliability, and graceful behavior |
| Perplexity, Member of Technical Staff (AI Inference Engineer) | https://jobs.ashbyhq.com/perplexity/8a976851-9bef-4b07-8d36-567fa9540aef | 2026-04-13 | `$220K – $485K • Offers Equity` | San Francisco; Palo Alto and New York City secondary locations; work mode not exposed | Rust/Python/CUDA serving; ingress-to-kernel profiling; reliability, dashboards, alerts, automated remediation; Kubernetes, GPU scheduling, and autoscaling |

The pages exposed compensation as shown above. They did not expose a closing
date. The sample repeatedly asks for qualification or benchmark workflows,
operational readiness, observability, reliability boundaries, and systems that
connect execution to measured evidence.

## Evidence map

### Already demonstrated

- Public Triton/OpenAI-compatible load generation with latency, throughput,
  retry, request-path, and service-lifecycle accounting.
- Authenticated coordinator-agent execution with explicit TLS trust, bounded
  completed-result recovery, coordinator restart reconciliation, and privacy-safe
  JSON/Prometheus artifacts.
- Saved adjacent-run regression reports with p95-latency, throughput,
  success-rate, and client-attempt-amplification gates.
- Public Rust scheduling, Triton kernel correctness/performance work, and
  security/observability controls in the gateway repository.

### Present but buried

- The benchmark had a warmup phase and service-restart counter gate, but the
  README explicitly said warmup was not a cold-start measurement.
- The repository's design notes identified server-lifecycle hooks as the next
  extension, but no CLI owned the boundary from controlled process launch to
  health readiness and then to a measured benchmark phase.

### Missing and not claimed

- Production-scale multi-host orchestration, model-weight cold-start timing,
  accelerator initialization timing, and partial-workflow continuation remain
  unclaimed. The selected change does not imply any of them.

## Exactly one selected gap

**Add controlled local service-lifecycle qualification to the existing
`triton-inference-benchmark` repository.**

This closes the evidence gap for qualification workflows and readiness-aware
benchmarking without creating a duplicate repository. The wrapper launches an
explicit service command without a shell, allocates one ephemeral loopback port,
waits for an explicit loopback HTTP-200 health response, runs the existing
benchmark, and writes a privacy-safe JSON/Markdown projection. The report hashes
but does not persist the command or health URL and excludes benchmark source
paths, prompts, credentials, raw telemetry, and trace identifiers.

The measured `startup_latency_ms` is process launch to the selected health
response. It is not model cold-start time, accelerator initialization time,
service MTTR, a remote-host timing, or a production SLO.

## Implemented and verified

`WaffleBits/triton-inference-benchmark` now contains
[`lifecycle_qualification.py`](https://github.com/WaffleBits/triton-inference-benchmark/blob/main/lifecycle_qualification.py), unit tests, a delayed-readiness local HTTP/OpenAI-compatible fixture, documentation, and CI wiring. The change was merged in [PR #25](https://github.com/WaffleBits/triton-inference-benchmark/pull/25) as commit `bdf0318`.

Local verification passed before publication:

- `python -m unittest discover -s tests` - 146 tests passed.
- `python tests/run_lifecycle_qualification_fixture.py` - real CLI fixture passed.
- `python -m compileall -q benchmark.py benchmark_report.py coordinated_benchmark.py lifecycle_qualification.py remote_agent.py tests` - passed.
- `git diff --check` - passed.

The PR check passed in [CI run 35991735868](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/35991735868). The post-merge main workflow also passed in [CI run 35991822711](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/35991822711), including the new lifecycle fixture and all existing qualification fixtures.

The profile README, Astro portfolio content, one-page resume source/PDF, and
this report surface only the public behavior above. They do not claim remote
or production lifecycle measurements.
