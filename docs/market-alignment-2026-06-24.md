# Market Alignment - 2026-06-24

## Sources Checked

- Levels.fyi software engineer salary page. Signal: OpenAI, Anthropic, and xAI remain among the highest-compensating software-engineering targets in the current data.
  - https://www.levels.fyi/t/software-engineer
- OpenAI, Software Engineer, Inference - Performance Optimization: $295K-$555K plus equity. Signal: application/model/fleet performance modeling, cost-to-serve estimates, latency, capacity, utilization, and cost tradeoffs.
  - https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- OpenAI, Software Engineer, Inference - AMD GPU Enablement. Signal: vLLM/Triton integration, correctness and performance on AMD GPU hardware, memory/network/compute debugging, HIP/CUDA/Triton, RCCL/NCCL-style collective communication, GPU profiling, and model/tensor parallelism.
  - https://openai.com/careers/software-engineer-inference-amd-gpu-enablement-san-francisco/
- OpenAI, Software Engineer, Productivity - Inference Runtime. Signal: deploy gates, TTFT/TBT validation, canary and large-scale validation, release automation, noisy failure reduction, and inference reliability tooling.
  - https://openai.com/careers/software-engineer-productivity-inference-runtime-san-francisco/
- OpenAI, Software Engineer, Workload Enablement. Signal: workload-shaped benchmarks, stress and fault tests, NCCL/RCCL/RDMA, Kubernetes integration, telemetry hooks, CI/lab validation, and early hardware bring-up.
  - https://openai.com/careers/software-engineer-workload-enablement-san-francisco/
- Anthropic, Performance Engineer, Inference Systems: $350K-$850K. Signal: cross-layer investigations across kernels, model servers, routing, batching, autoscaling, capacity management, correctness evals, roofline analysis, latency/cost modeling, and evidence-based prioritization.
  - https://job-boards.greenhouse.io/anthropic/jobs/5224564008
- Anthropic, Staff+ Software Engineer, Inference Runtime: $405K-$485K. Signal: accelerator-agnostic runtime architecture, Rust/Python performance-sensitive code, utilization, scheduling, memory management, partitioned builds, canary/shadow/rollback, deterministic or simulation-based testing, CI/CD, Kubernetes job scheduling, and platform metrics.
  - https://job-boards.greenhouse.io/anthropic/jobs/5257650008
- Anthropic, TPU Kernel Engineer: $280K-$850K. Signal: TPU/GPU/accelerator optimization, kernels, ML framework internals, transformers, low-precision inference, collective communication, and assembly-level performance debugging.
  - https://job-boards.greenhouse.io/anthropic/jobs/4720576008
- xAI, Member of Technical Staff - Inference: $180K-$440K. Signal: global KV cache, continuous batching, load balancing, autoscaling, GPU kernels, quantization, speculative decoding, trace/replay tooling, CI/CD for inference, and reliability of inference services.
  - https://job-boards.greenhouse.io/xai/jobs/4533894007
- xAI, Member of Technical Staff - Compute Infrastructure: $180K-$440K. Signal: massive GPU clusters, low-level CUDA kernels, Linux internals, scheduling, memory management, virtualization, orchestration beyond standard Kubernetes, and infrastructure-as-code.
  - https://job-boards.greenhouse.io/xai/jobs/5052040007
- CoreWeave careers and related software-engineer listings. Signal: AI workload orchestration, Kubernetes-native scheduling, Kueue, Volcano, Ray, observability, secure audit visibility, and reliable AI infrastructure operations.
  - https://www.coreweave.com/careers
- Databricks, Staff Software Engineer - Distributed Data Systems. Signal: distributed storage/processing systems, runtime performance, SQL engine performance, big data systems, and customer-impact delivery.
  - https://www.databricks.com/company/careers/engineering---pipeline/staff-software-engineer---distributed-data-systems-5646855002
- Jane Street, Software Engineer and Low-Latency Engineer. Signal: high-performance systems, OCaml/Python, low-latency trading systems, correctness, and deep systems fundamentals.
  - https://www.janestreet.com/join-jane-street/position/4274288002/
  - https://www.janestreet.com/join-jane-street/position/6254435002/
- Citadel Securities, C++ Software Engineer. Signal: clean performant C++, multithreading, concurrency, distributed systems, high ownership, and low-latency trading context.
  - https://www.citadelsecurities.com/careers/details/c-software-engineer-2/

## Interpretation

The useful delta is now code evidence, not another broad repositioning. Top-paying AI infrastructure postings are converging on a concrete pattern: inference runtime correctness, accelerator-agnostic serving surfaces, workload-shaped validation, tail-latency and token-path telemetry, memory pressure, release gates, and cross-layer analysis from request routing down to kernels and collectives.

The public profile already points at the right field: AI infrastructure, inference runtime, GPU kernels, secure AI service boundaries, mission delivery, and deterministic systems. The profile should now emphasize the newly implemented runtime proof: model-version transition metadata, token-trace fingerprints, TTFT and decode-token p95 checks, KV memory-pressure reporting, and hold/promote/rollback policy behavior.

## Implemented

- Updated `WaffleBits/rust-inference-runtime` to extend mirrored backend observations with model version, queue depth, KV page pressure, TTFT, decode-token latencies, and token-trace fingerprints.
- Extended release reports with aggregate and segmented TTFT/decode-token p95, memory pressure, queue depth, model-version transition metadata, and token-trace mismatch rates.
- Added policy checks that hold a candidate for TTFT, decode-token p95, or memory-pressure regressions while preserving rollback for correctness/numeric/reliability failures.
- Updated runtime tests, docs, fixtures, and checked artifacts.
- Updated the public profile README and resume site to reflect the new runtime proof without naming companies or compensation publicly.

## Public Copy Guidance

Keep compensation, company names, and job-post targeting out of public-facing copy. The public phrasing should stay proof-first:

- TTFT and decode-token p95 checks
- KV memory-pressure reporting
- model-version transition metadata
- token-trace fingerprints
- vLLM/SGLang-style mirror normalization
- canary/shadow promote, hold, and rollback gates

## Validation Notes

- `cargo fmt --check` passed in `rust-inference-runtime`.
- JSON fixtures and artifacts parse with PowerShell `ConvertFrom-Json`.
- `git diff --check` passed in `rust-inference-runtime`.
- `cargo test --all-targets` was attempted but blocked by the local Windows Rust/MSVC environment because `link.exe` is missing. Install Visual C++ Build Tools or add a working non-MSVC Rust target to run the full test suite locally.
