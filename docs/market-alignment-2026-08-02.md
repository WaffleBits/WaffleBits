# Market alignment :: 2026-08-02

Primary listings were read from the companies' official Ashby and Greenhouse
feeds on 2026-08-02 at 11:28 UTC. Each listing below was active in its feed at
review time. Compensation is copied from the feed rather than inferred.

## Current role evidence

| Company | Role | Published / updated | Published compensation | Location / work model | Relevant requirements |
|---|---|---|---|---|---|
| Anthropic | [Performance Engineer, Inference Systems](https://job-boards.greenhouse.io/anthropic/jobs/5224564008) | Published 2026-05-20; updated 2026-07-14 | Annual Salary: `$350,000—$850,000 USD` | San Francisco, New York City, or Seattle; hybrid, at least 25% in office | Cross-layer throughput, latency, reliability, and correctness investigations; telemetry, dashboards, rooflines, regression criteria, Python, distributed serving |
| Anthropic | [Performance Engineer, GPU](https://job-boards.greenhouse.io/anthropic/jobs/4926227008) | Published 2025-09-22; updated 2026-07-14 | Annual Salary: `$280,000—$850,000 USD` | San Francisco, New York City, or Seattle; hybrid, at least 25% in office | CUDA/Triton/CUTLASS, Nsight, fusion and memory-bandwidth work, low precision, NCCL/NVLink, production serving, GPU performance models |
| OpenAI | [Workload Porting & Performance Engineer](https://jobs.ashbyhq.com/openai/ec0a4e03-bbcc-4c64-813f-b53dabb8f53a) | Published 2026-04-20; update date not exposed | `$293K – $385K • Offers Equity` | San Francisco; role text specifies hybrid, three office days per week; Seattle appears as a secondary feed location | Controlled performance experiments, compute/memory/storage/network profiling, expected-versus-observed analysis, system debugging, workload porting, readiness decisions |
| Modal | [Member of Technical Staff - ML Performance](https://jobs.ashbyhq.com/modal/af17da5e-23ca-4802-854d-5f0546e1ed32) | Published 2026-04-21; update date not exposed | `$200K – $350K • Offers Equity` | New York; San Francisco is a secondary feed location; remote status not exposed | High-performance code, PyTorch, vLLM or TensorRT, NVIDIA architecture, CUDA, occupancy and host-overhead debugging, high-throughput low-latency inference |

## Repeated requirements

The four-role sample repeats four technical signals:

1. Controlled performance experiments that explain expected versus observed
   behavior, rather than isolated latency numbers.
2. Cross-layer evidence spanning requests, routing and batching, runtimes,
   accelerators, memory, and networking.
3. Telemetry that connects throughput, tail latency, reliability, correctness,
   and cost to a deployment or release decision.
4. GPU and systems depth: Python plus low-level profiling, Triton/CUDA,
   distributed serving, and root-cause analysis.

## Public evidence inventory

The live GitHub profile README matched this checkout byte-for-byte at review time.
Its selected-work list already linked the serving benchmark, scheduler, kernel
lab, secure gateway, compiler, matching engine, and readiness dashboard. The six
pinned repositories were `market-microstructure-engine`,
`readiness-control-tower`, `secure-gpu-inference-gateway`, `triton-kernel-lab`,
`deterministic-inference-scheduler`, and `heterocore-compiler`; the serving
benchmark was visible in the profile README but was not pinned.

### Already demonstrated

- `triton-kernel-lab`: correctness-gated Triton kernels, raw RTX 5070 Ti timing
  evidence, torch.compile comparisons, roofline reports, and artifact validation.
- `deterministic-inference-scheduler`: Rust continuous batching, paged KV-cache
  accounting, replay fingerprints, and promote/hold/rollback decisions.
- `triton-inference-benchmark`: phase-separated warmup, concurrent Triton and
  OpenAI-compatible load paths, measured TTFT/inter-chunk timing, workload
  profiles, batch-invariance checks, cost estimates, and client-side regression
  gates.
- `secure-gpu-inference-gateway`: access policy, audit records,
  Prometheus/OpenTelemetry, Redis-backed limits, deployment controls, and
  supply-chain checks.

### Present but buried

Before this change, the benchmark could parse and summarize a single Triton/DCGM
Prometheus snapshot. The profile called that telemetry correlation, but neither
the profile nor the harness made clear that Triton request and duration metrics
are cumulative counters. A single value could not support an observed-window
failure rate or queue share.

### Missing before this change

The serving benchmark could not turn paired server counter evidence into an
explicit qualification decision. It had no before/after delta semantics, no
fail-closed server failure-rate or queue-fraction checks, and no artifact test
ensuring operator paths and raw scrape text stayed out of public reports.

## Selected implementation

Extend `triton-inference-benchmark`; do not create another repository. The gap
belongs in the existing load harness and reuses its parser, report model,
Prometheus exporter, CLI, CI fixture, and regression workflow.

The implementation adds an operator-supplied baseline snapshot, computes
model-filtered Triton counter deltas, derives server failure rate and queue
fraction, detects aggregate counter decreases and missing metric families, and
supports opt-in status-4 failure when configured thresholds are exceeded or
unevaluable. JSON and Prometheus artifacts contain summaries and deltas, not raw
scrapes or source paths.

The files are not claimed to bracket the harness automatically. Artifacts label
their alignment `operator_supplied_unverified`; DCGM values remain post-snapshot
gauges, and operators must keep the aggregate scrape target set stable.

## Publication proof

- Plan: [`docs/plans/2026-08-02-counter-window-telemetry-gates.md`](https://github.com/WaffleBits/triton-inference-benchmark/blob/main/docs/plans/2026-08-02-counter-window-telemetry-gates.md)
- Pull request: [triton-inference-benchmark #6](https://github.com/WaffleBits/triton-inference-benchmark/pull/6), merged
- Public main commit: [`c97041c`](https://github.com/WaffleBits/triton-inference-benchmark/commit/c97041c36e30595025c3c61767c62c2551e0e876), verified
- Main-branch CI: [run 30745749393](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/30745749393), passed
- Local checks: 45 unit tests passed; Python compileall passed; passing and
  failing real CLI paths produced the expected gate and exit status 4; JSON
  privacy and Prometheus semantics checks passed; Docker Python 3.12 built and
  ran as non-root; the synchronous Triton client imported with `urllib3 2.7.0`
  and no unused `aiohttp` extra; `pip-audit` found no known vulnerabilities;
  `git diff --check` passed.

## Fit boundary

These listings are market-signal sources, not a claim of immediate level fit.
Anthropic asks for hands-on work in complex production systems, its GPU role
prefers production ML and distributed GPU depth, and Modal asks for 5+ years of
high-performance engineering. The public repositories demonstrate relevant
methods and inspectable implementation, but they do not prove ownership of a
large inference fleet, multi-node collective tuning, or years of production GPU
operation. The portfolio should support adjacent AI infrastructure and
performance-engineering conversations without presenting synthetic fixtures as
that missing experience.

## Remaining gap

The harness still does not capture authorized telemetry automatically around its
own request phase or compare stable per-replica series membership. Real
qualification evidence therefore needs an operator or sidecar to bracket the
window, keep the scrape target set stable, and provide real endpoint/GPU
snapshots. The committed fixtures are synthetic and are not presented as fleet,
model, or accelerator measurements.
