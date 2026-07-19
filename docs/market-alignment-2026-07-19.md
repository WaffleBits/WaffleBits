# Market alignment :: 2026-07-19

## Current signals

- [OpenAI Inference Performance Optimization](https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/) emphasizes workload-shaped profiling, microbenchmark-to-cost models, latency, capacity, utilization, and end-to-end inference analysis.
- [OpenAI Compute Infrastructure](https://openai.com/careers/software-engineer-compute-infrastructure-san-francisco/) emphasizes distributed systems, Kubernetes, scheduling, observability, reliability, GPU infrastructure, networking, and hardware-aware benchmarking.
- [OpenAI Inference Runtime Productivity](https://openai.com/careers/software-engineer-productivity-inference-runtime-san-francisco/) emphasizes correctness and performance deploy gates, TTFT/TBT, rollout safety, triage, and observability.
- [Jane Street Machine Learning Performance](https://www.janestreet.com/join-jane-street/position/7449077002/) emphasizes low-level systems, CUDA/Triton, profiling, memory behavior, GPU networking, and distributed collectives.
- [Anthropic's current engineering roles](https://www.anthropic.com/careers/jobs?lang=us) continue to include inference, GPU performance, observability, and ML systems work.

## Decision

The portfolio already demonstrates inference measurement, TTFT/TBT release gates, Triton kernels, Rust scheduling, and secure model-serving boundaries. The next credible gap was not another headline or synthetic benchmark; it was making deployment and supply-chain controls executable and reviewable.

The gateway now adds:

- pinned dependency auditing;
- an SPDX image SBOM;
- a high-severity container vulnerability gate; and
- tests for non-root, read-only, capability-dropped Kubernetes deployment posture, health probes, resource limits, and metrics scraping.

Public copy names the shipped controls without naming employers, compensation, or unsupported production scale.
