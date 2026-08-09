# AI infrastructure market alignment — 2026-08-09

## Scope and source discipline

This review used active listings from official Anthropic Greenhouse and OpenAI
Ashby feeds on 2026-08-09. Dates below are the boards' exposed publication and
update values. Compensation is quoted as published; equity is not converted to
cash. No remote option is inferred where the feed does not state one.

## Current role evidence

### Anthropic — Performance Engineer, Inference Systems

- Canonical listing: https://job-boards.greenhouse.io/anthropic/jobs/5224564008
- First published: 2026-05-20; board updated: 2026-07-14
- Location: San Francisco, New York City, or Seattle; board metadata says on-site
- Published compensation: **$350,000—$850,000 USD annual salary**
- Relevant requirements: cross-layer investigation across accelerator kernels,
  model servers, routing, autoscaling, and capacity; throughput, latency,
  reliability, correctness, Python, profiling, roofline analysis, and telemetry
  or observability for distributed systems.

### Anthropic — Performance Engineer, GPU

- Canonical listing: https://job-boards.greenhouse.io/anthropic/jobs/4926227008
- First published: 2025-09-22; board updated: 2026-07-14
- Location: San Francisco, New York City, or Seattle; board metadata says on-site
- Published compensation: **$280,000—$850,000 USD annual salary**
- Relevant requirements: GPU optimization at scale; CUDA, Triton, CUTLASS,
  FlashAttention, kernel fusion, memory-bandwidth optimization, Nsight,
  NCCL/NVLink collectives, performance models, resilient distributed systems,
  and production-serving bottleneck analysis.

### OpenAI — Software Engineer, Model Inference

- Canonical listing: https://jobs.ashbyhq.com/openai/83b6755d-7785-4186-9050-5ef3ad127941
- Published: 2025-02-06
- Location: San Francisco; the feed exposes no remote option
- Published compensation: **$295,000—$555,000 USD plus equity**
- Relevant requirements: inference latency, throughput, and efficiency; PyTorch,
  NVIDIA GPUs, CUDA, NCCL, InfiniBand/MPI/NVLink; and architecting, observing,
  and debugging performance-critical distributed systems. The listing asks for
  at least five years of professional software-engineering experience.

### OpenAI — Software Engineer, GPU Infrastructure - HPC

- Canonical listing: https://jobs.ashbyhq.com/openai/f58cb1eb-9642-4a4d-a14d-d7a57d583a11
- Published: 2026-02-05
- Location: San Francisco; the feed exposes no remote option
- Published compensation: **$230,000—$490,000 USD plus equity**
- Relevant requirements: reliable GPU/server fleets, provisioning automation,
  server-health and performance monitoring, Python or Go, Linux and low-level
  hardware tooling, PCIe/InfiniBand/networking/power, kernel tuning, HPC, and
  distributed systems.

## Recurring demand

Across all four roles:

1. Performance must be investigated across layers, not only benchmarked at one
   API boundary.
2. GPU utilization and bottleneck evidence must be observable and explainable.
3. Reliability, failure accounting, and production debugging are first-class.
4. Python is common; GPU roles add CUDA/Triton and distributed communication.
5. Multi-node or fleet-scale work is important, but cannot be claimed from a
   local fixture or single-GPU benchmark.

## Evidence map

### Already demonstrated

- `triton-kernel-lab`: correctness-gated Triton kernels and published raw RTX
  5070 Ti measurements.
- `deterministic-inference-scheduler`: Rust continuous batching, paged KV-cache
  admission, replay fingerprints, and release decisions.
- `triton-inference-benchmark`: warmup/measurement separation, Triton and
  OpenAI-compatible load generation, server-counter deltas and fail-closed
  failure/queue gates, workload assumptions, and streaming latency semantics.
- `secure-gpu-inference-gateway`: authenticated serving controls, Prometheus and
  OpenTelemetry evidence, runbooks, and supply-chain checks.

### Present but buried before this change

- The benchmark already had an explicit telemetry client, bounded HTTP scrapes,
  DCGM parsing, privacy tests, and a deterministic HTTP fixture. Its profile
  summary surfaced only the two boundary counter snapshots.

### Missing before this change

- DCGM gauges were represented only by the post-run point snapshot. The artifact
  could not show a sampled GPU-utilization or memory distribution spanning the
  measured request phase.

## Exactly one selected improvement

Extend `triton-inference-benchmark`, rather than create another repository. The
existing harness owned measurement phases, telemetry parsing, privacy policy,
Prometheus export, and the deterministic fixture, so repeated gauge sampling was
one coherent capability rather than a new system class.

Public implementation:

- Commit: https://github.com/WaffleBits/triton-inference-benchmark/commit/9776e91ff3c0595fc0e4154b251c6b5ff44e7601
- Pull request: https://github.com/WaffleBits/triton-inference-benchmark/pull/8
- Passing CI: https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/31310550365

The opt-in sampler starts after measured requests are submitted and stops when
the measured phase completes. It parses and retains only known GPU gauge values,
then combines them with pre/post boundary captures. JSON and Prometheus outputs
record scrape/value coverage plus sample average, p50, p95, min, and max for GPU
utilization, memory-copy utilization, and memory used. Failed in-window scrapes
abort qualification. Endpoints, credentials, raw responses, and series labels
remain outside artifacts.

Claim boundary: these are sampled values, not time-weighted measurements. The
harness does not persist target identity or isolate a shared telemetry endpoint.
The deterministic fixture proves CLI wiring, serialization, gates, and privacy;
it is not evidence of operating a production GPU fleet.

## Remaining gap

The highest-value unresolved gap is authorized multi-node GPU evidence: a real
DCGM run with stable target membership, controlled competing traffic, and
correlation to NCCL/InfiniBand behavior. This environment has no such fleet, so
this review does not claim production scale or multi-node operation.
