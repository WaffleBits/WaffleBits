# Market alignment :: 2026-08-01

Primary listings were read from the companies' official Ashby and Greenhouse
feeds on 2026-08-01 at 11:00 UTC. Listings below were present in those feeds at
review time. Compensation is reproduced only when the feed published it.

## Current role evidence

| Company | Role | Published / updated | Published compensation | Location / work model | Relevant requirements |
|---|---|---|---|---|---|
| Anthropic | [Performance Engineer, Inference Systems](https://job-boards.greenhouse.io/anthropic/jobs/5224564008) | Published 2026-05-20; updated 2026-07-14 | Annual Salary: `$350,000—$850,000 USD` | San Francisco, New York City, or Seattle; hybrid, at least 25% in office | Cross-layer profiling, latency/throughput/reliability, correctness regression gates, observability, roofline analysis, Python |
| Anthropic | [Performance Engineer, GPU](https://job-boards.greenhouse.io/anthropic/jobs/4926227008) | Published 2025-09-22; updated 2026-07-14 | Annual Salary: `$280,000—$850,000 USD` | San Francisco, New York City, or Seattle; hybrid, at least 25% in office | CUDA/Triton/CUTLASS, Nsight, kernel fusion, memory bandwidth, low precision, NCCL/NVLink, performance modeling |
| OpenAI | [Workload Porting & Performance Engineer](https://jobs.ashbyhq.com/openai/ec0a4e03-bbcc-4c64-813f-b53dabb8f53a) | Published 2026-04-20; update date not exposed | Not exposed in the Ashby feed | San Francisco; hybrid, three office days per week | Port workloads, run controlled performance experiments, profile compute/memory/storage/networking, compare expected and observed behavior, debug across hardware and software |
| SpaceXAI / xAI | [Software Engineer - Training/Inference (C++)](https://job-boards.greenhouse.io/xai/jobs/4533894007) | Published 2024-10-04; updated 2026-07-28 | `$180,000 - $440,000 USD` | Palo Alto, CA; remote status not exposed | C++ or Rust, continuous batching, KV cache, load balancing, quantization, GPU kernels, vLLM/SGLang/Triton, trace/replay tooling, CI/CD |

## Repeated requirements

The narrow sample is consistent about four signals:

1. Controlled benchmark methodology and workload experiments, not isolated
   latency claims.
2. Tail latency, throughput, reliability, and correctness reported together.
3. Cross-layer evidence spanning requests, schedulers, runtimes, kernels, and
   accelerator behavior.
4. Tools that preserve enough context to explain a regression and make a release
   decision.

## Evidence map

### Already demonstrated

- `triton-kernel-lab`: correctness-gated Triton kernels, raw RTX 5070 Ti timing
  samples, torch.compile comparisons, roofline reports, and artifact validation.
- `deterministic-inference-scheduler`: Rust continuous batching, paged KV-cache
  accounting, replay fingerprints, and promote/hold/rollback gates.
- `triton-inference-benchmark`: concurrent Triton and OpenAI-compatible load
  paths, streaming TTFT/inter-chunk semantics, telemetry correlation,
  batch-invariance checks, workload profiles, and regression gates.
- `secure-gpu-inference-gateway`: policy, audit, Prometheus/OpenTelemetry, Redis
  rate limits, deployment posture, and supply-chain checks.

### Present but buried

- The benchmark already separated caller-provided estimates from measurements
  and kept transport chunks distinct from server-reported tokens, but this claim
  boundary was more visible in design notes than in the profile summary.
- The kernel lab's committed artifact validator recomputes percentile, speedup,
  bandwidth, and roofline summaries from raw evidence; the profile names the raw
  data but not all of the validation boundary.

### Missing before this change

The serving benchmark could not precondition a client/server path without mixing
those requests into headline latency, throughput, token, regression, and cost
results. That weakens baseline/candidate comparability when setup effects matter.

## Selected implementation

Extend the existing `triton-inference-benchmark`; do not create another
repository. The missing behavior belongs in the load harness and reuses its
clients, report model, Prometheus export, cost model, and regression pipeline.

The implementation adds `--warmup-requests`, runs the phase to completion before
measured work, reports its outcomes and latency distribution separately, and
keeps all existing headline and cost calculations scoped to measured requests.
It explicitly does not call the phase a cold-start measurement because the
harness does not control server restarts, model loading, or accelerator state.

## Publication proof

- Plan: [`docs/plans/2026-08-01-phase-separated-warmup.md`](https://github.com/WaffleBits/triton-inference-benchmark/blob/main/docs/plans/2026-08-01-phase-separated-warmup.md)
- Pull request: [triton-inference-benchmark #5](https://github.com/WaffleBits/triton-inference-benchmark/pull/5)
- Public main commit: [`61a5a78`](https://github.com/WaffleBits/triton-inference-benchmark/commit/61a5a783d249e7dcc25a9675b8e5c79183048688)
- Main-branch CI: [run 30697126165](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/30697126165), passed
- Local checks: 37 unit tests passed; the real mock CLI produced separate JSON
  and Prometheus warmup records; privacy and phase-isolation assertions passed;
  Python compileall passed; Docker built and ran as non-root; `pip-audit` found no
  known vulnerabilities; `git diff --check` passed.

The profile and resume surface only the implemented phase separation. The CLI
fixture is synthetic and is not presented as a GPU, model, fleet, or production
measurement.

## Remaining gap

Defensible cold-start evidence still needs an authorized lifecycle controller
that restarts the server, records model-load readiness, and establishes the
accelerator-state boundary. Multi-node collective performance and production
fleet scale also remain unsupported by public evidence.