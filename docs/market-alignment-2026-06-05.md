# Portfolio Market Alignment - 2026-06-05

This note records the public hiring signal used to tune the profile. It is not resume copy; it is a maintenance reference for keeping the public work pointed at valuable engineering problems.

## Top-Market Signal

- OpenAI's current Model Inference and Inference Performance Optimization roles list base compensation up to $555K plus equity. The work centers on production distributed systems, bottleneck visibility, GPU utilization, latency/throughput/cost modeling, CUDA/NCCL, and hardware-aware performance work.
- Anthropic's current Performance Engineer, Inference Systems role lists $350K-$850K. It emphasizes cross-layer profiling, roofline analysis, correctness regression gates, telemetry, tail latency, accelerator behavior, and quantitative prioritization.
- Anthropic's Inference and Cloud Inference roles list up to $485K and emphasize intelligent routing, autoscaling, heterogeneous accelerators, Kubernetes/cloud operations, Python/Rust, capacity management, and observability-driven optimization.
- NVIDIA's current AI Inference Systems roles emphasize upstream vLLM/SGLang work, Python plus C/C++, CUDA/NCCL, profiling, scheduling, KV-cache efficiency, multi-GPU reliability, and performance/correctness regression tests.
- Jane Street's current Machine Learning Performance Engineer role lists $300K base plus bonus; its Low-Latency Engineer role lists $250K-$300K base plus bonus. Both emphasize low-level systems work, hardware performance counters, computer architecture, networking, and whole-system optimization.
- xAI's current inference role lists $180K-$440K base plus equity and emphasizes batching, caching, load balancing, parallelism, GPU kernels, quantization, benchmarking, and production serving reliability.

## Profile Updates Applied

- Replaced the C++/Rust roadmap language with shipped C++20 evidence in the profile README and resume site.
- Added Python-oracle parity checks, native tests, latency distributions, and measured throughput to the systems/quant evidence.
- Kept compensation data and hiring research in this maintenance note rather than using it as public-facing recruiting language.
- Preserved an evidence-first tone: implementations, tests, CI gates, and benchmark methodology carry the signal.

## Implementation Added

- `market-microstructure-engine` now includes a dependency-free C++20 order book alongside the Python reference implementation.
- Both implementations consume the same deterministic SplitMix64 workload.
- CI compiles the native engine, runs language-specific tests, and verifies final-state parity across multiple seeds.
- Benchmarks report p50/p95/p99/max latency and throughput only after the correctness gate passes.
- Draft PR: https://github.com/WaffleBits/market-microstructure-engine/pull/1

## Build Priorities

1. Add a vLLM/SGLang-compatible mock workload path to the inference benchmark.
2. Add queue-depth, batching, streaming, and workload-comparison reports to the inference benchmark.
3. Add JWKS/RS256 key rotation, OpenTelemetry export, and Grafana screenshots to the secure gateway.
4. Add Linux performance counters, cache-aware container comparisons, and replay ingestion to the C++20 engine.
5. Prepare the local LLM serving stack for public release only after tests, README cleanup, and reviewer-safe benchmarks.

## Sources Checked

- OpenAI Software Engineer, Model Inference: https://openai.com/careers/software-engineer-model-inference/
- OpenAI Software Engineer, Inference - Performance Optimization: https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- Anthropic Performance Engineer, Inference Systems: https://job-boards.greenhouse.io/anthropic/jobs/5224564008
- Anthropic Staff + Sr. Software Engineer, Inference: https://job-boards.greenhouse.io/anthropic/jobs/4951696008
- Anthropic Staff + Sr. Software Engineer, Cloud Inference: https://job-boards.greenhouse.io/anthropic/jobs/5231496008
- NVIDIA Senior Software Engineer, AI Inference Systems: https://jobs.nvidia.com/careers/job/893392030572
- NVIDIA Senior Software Engineer, AI Inference: https://jobs.nvidia.com/careers/job/893394678645
- Jane Street Machine Learning Performance Engineer: https://www.janestreet.com/join-jane-street/position/7449077002/
- Jane Street Low-Latency Engineer, New York: https://www.janestreet.com/join-jane-street/position/6254435002/
- xAI Member of Technical Staff - Inference: https://job-boards.greenhouse.io/xai/jobs/4533894007
