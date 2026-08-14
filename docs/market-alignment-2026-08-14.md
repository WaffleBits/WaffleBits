# Market alignment audit — 2026-08-14

## Scope and source policy

This audit used live public evidence and primary company sources. Role status, exposed dates, compensation, and requirements were read from Anthropic's official Greenhouse feed on 2026-08-14. GitHub profile and repository metadata were read from GitHub's API for the authenticated `WaffleBits` account. Compensation below is quoted from the feed, not inferred.

## Current role evidence

All four listings returned HTTP 200 from Anthropic's official board on 2026-08-14.

| Role | Official URL | Feed update date | Published compensation | Location / constraints | Representative requirements |
|---|---|---:|---|---|---|
| Software Engineer, Inference | https://job-boards.greenhouse.io/anthropic/jobs/5388612008 | 2026-08-14 | `$320,000 - $405,000 USD` | San Francisco, CA; hybrid, at least 25% office time | Low-level GPU optimization in CUDA/Triton; C++ and Python; serving engines such as vLLM/SGLang; latency/throughput tradeoffs; benchmarking and profiling; distributed inference; numerical precision |
| ML Systems Engineer, RL Engineering | https://job-boards.greenhouse.io/anthropic/jobs/4970314008 | 2026-08-07 | `$500,000 - $850,000 USD` | San Francisco, CA; hybrid, at least 25% office time | Distributed systems for ML; fault tolerance and recovery; continuous batching; tensor/pipeline parallelism; PyTorch/JAX; observability; high-throughput serving and training infrastructure |
| Research Engineer, Inference | https://job-boards.greenhouse.io/anthropic/jobs/5224564008 | 2026-08-14 | `$320,000 - $405,000 USD` | San Francisco, CA or Seattle, WA; hybrid, at least 25% office time; optional equity, benefits, and relocation stated | Python; ML systems and GPU programming; large-scale distributed inference; reliable, high-performance implementations; correctness and model-quality validation |
| Software Engineer, ML Networking | https://job-boards.greenhouse.io/anthropic/jobs/4926227008 | 2026-08-07 | `$320,000 - $405,000 USD` | San Francisco, CA, New York City, NY, or Seattle, WA; hybrid, at least 25% office time | C++ and Python; RDMA/InfiniBand/Ethernet; communication libraries; kernel-bypass networking; observability; benchmarking; reliable distributed infrastructure |

The feed did not expose a separate publication date, so the table records only its `updated_at` value. The compensation amounts are the published annual salary ranges; no equity value or total compensation was calculated.

## Recurring requirements

Across the four active listings:

1. **Python systems work** appears in all four.
2. **Performance measurement and optimization** appears in all four through benchmarking, profiling, latency/throughput, or network/runtime efficiency.
3. **Distributed, high-throughput infrastructure** appears in all four.
4. **Reliability, observability, or correctness validation** appears in all four.
5. **GPU kernels or inference internals** appears in three.
6. **C++** appears in two; distributed training frameworks and continuous batching appear directly in the RL engineering listing.

## Public evidence inventory

GitHub API inventory on 2026-08-14 showed a public profile README and 42 public, non-fork repositories. The profile links directly to the source and measurement boundaries rather than presenting synthetic work as production operation.

Strongest relevant repositories:

| Repository | Public evidence | Activity read from GitHub |
|---|---|---:|
| [`triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark) | Python serving benchmark; open-loop pacing; warmup separation; client queue delay; streaming latency; DCGM/server telemetry windows; trace-continuation and regression gates; Docker and 86-test CI | `ccc8b596eeff53536c23ce36f91c32460cd43735`, merged 2026-08-14; [main CI passed](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/31795336114) |
| [`triton-kernel-lab`](https://github.com/WaffleBits/triton-kernel-lab) | Triton RMSNorm, SwiGLU, attention, KV-movement, and INT4 kernels; correctness gates and raw RTX 5070 Ti measurements | pushed 2026-08-07 |
| [`deterministic-inference-scheduler`](https://github.com/WaffleBits/deterministic-inference-scheduler) | Rust continuous batching, paged KV-cache accounting, replay fingerprints, and release gates | pushed 2026-08-07 |
| [`secure-gpu-inference-gateway`](https://github.com/WaffleBits/secure-gpu-inference-gateway) | Authenticated policy and budget controls, audit evidence, Redis-backed atomic limits, OpenTelemetry/Prometheus, deployment checks, SBOM and vulnerability gates | pushed 2026-08-08 |
| [`market-microstructure-engine`](https://github.com/WaffleBits/market-microstructure-engine) | C++20 and Python price-time matching engines with parity tests and a documented local benchmark boundary | pushed 2026-07-30 |

Profile metadata read from GitHub: `Adnan Berik`, Hampton, Virginia, public bio `Cyber Defense Operations | Platform Security & AI Infrastructure`, and links to the GitHub Pages portfolio and LinkedIn. The pinned repositories exposed through GraphQL were the inference benchmark, inference gateway, kernel lab, deterministic scheduler, readiness control tower, and market microstructure engine.

## Evidence map

### Already demonstrated

- Python serving and platform tooling with tests, CI, Docker, JSON, and Prometheus artifacts.
- Triton kernel correctness checks and labeled local GPU measurements.
- Deterministic continuous batching and KV-cache scheduling in Rust.
- Security controls, deployment checks, observability, and resilience evidence in the inference gateway.
- Open-loop load scheduling, queue-delay decomposition, trace propagation, streaming metrics, telemetry stability checks, and regression gating in the benchmark.
- C++20 systems work with deterministic parity tests in the matching engine.

### Present but buried before this change

- The benchmark already isolated fixed inputs and compared exact output fingerprints under concurrent noise, but the portfolio copy mentioned only trace and telemetry gates.
- Output evidence already stayed out of serialized benchmark artifacts; the same boundary could support numeric comparison without publishing predictions.
- The main profile and resume grouped benchmark work into one broad sentence, leaving batch-dependent model-output correctness implicit.

### Missing

- A deployed multi-node inference or training system with measured recovery behavior.
- Public RDMA, collective-communication, or kernel-bypass networking work.
- Large-cluster operational evidence; local fixtures and personal hardware are not cluster operation.
- Model-quality evaluation beyond output equality or operator-selected numeric closeness.
- Live Triton/GPU evidence showing a real model's isolated and batched outputs under this tolerance gate.

## Selected implementation

**One gap:** make batch-dependent output correctness usable for numeric models while preserving exact comparison and privacy by default.

This belongs in the existing `triton-inference-benchmark`, not a new repository. That project already owns deterministic probe inputs, isolated/concurrent execution, artifacts, Prometheus export, and fail gates. A new repository would duplicate the harness and weaken the evidence chain.

Public implementation: [`ccc8b596`](https://github.com/WaffleBits/triton-inference-benchmark/commit/ccc8b596eeff53536c23ce36f91c32460cd43735), merged through [PR #13](https://github.com/WaffleBits/triton-inference-benchmark/pull/13).

The implementation:

- keeps exact dtype/shape/byte fingerprints as the zero-tolerance default;
- adds explicit run-scoped `--batch-output-atol` and `--batch-output-rtol` policies for numeric Triton outputs;
- evaluates `abs(candidate - isolated) <= atol + rtol * abs(isolated)` element by element;
- fails closed on non-numeric, structural, dtype, shape, and non-finite incompatibilities;
- separates exact matches from tolerance matches;
- emits only the policy, aggregate finite errors, counts, safe reason classes, and gate status to JSON and Prometheus;
- keeps tensor values and fingerprints in process memory.

### Verification boundary

- 86 Python tests passed, including within/outside tolerance, structural, non-numeric, non-finite, CLI validation, Prometheus export, and artifact privacy cases.
- A real mock CLI run exercised policy parsing, the fail gate, JSON and Prometheus artifact generation, and absence of output evidence in artifacts.
- The existing paced OpenAI-compatible and bracketed telemetry fixtures passed.
- The Docker image built and ran the mock CLI successfully.
- `pip-audit -r requirements.txt` reported no known vulnerabilities in a Python 3.13 container.
- PR CI and post-merge main CI passed.

No Triton server or GPU model was used in this verification. The acceptance/rejection semantics are test-fixture evidence; they are not a claim that any particular model is invariant under batching.

## Positioning change

The profile site and one-page resume now surface run-scoped numeric batch-output gates as one part of the existing serving benchmark. Wording states behavior and the privacy boundary; it does not claim production scale or semantic model equivalence.

## Highest remaining gap

The next credible step is not more profile copy. It is a reproducible live Triton fixture using a small public model on an accessible GPU, with isolated and concurrent/batched outputs evaluated under a documented model-specific policy. The artifact should record model/version and aggregate comparison coverage while continuing to omit inputs, predictions, authorization data, and raw output fingerprints.
