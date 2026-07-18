# Market alignment :: 2026-07-18

## Current signals

- [OpenAI Inference Performance Optimization](https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/) lists a $295K-$555K base range plus equity and emphasizes end-to-end workload analysis, microbenchmark-derived cost-to-serve models, latency/throughput bottleneck tools, and capacity/utilization tradeoffs.
- [Anthropic's current infrastructure roles](https://www.anthropic.com/careers/jobs?lang=us) include inference, inference deployment, inference runtime, AI reliability, Kubernetes platform, and GPU/performance tracks. The repeated signal is reliable serving across runtime, cluster, and observability boundaries.
- [Jane Street Low-Latency Engineer](https://www.janestreet.com/join-jane-street/position/6254435002/) lists $250K-$300K base plus discretionary bonus and emphasizes low-level systems optimization, hardware performance counters, modern computer architecture, and high-throughput network applications.
- [Citadel Software Engineer](https://www.citadel.com/careers/details/software-engineer/) lists a $150K-$300K base range plus discretionary incentive compensation and emphasizes C++/Python/Java, distributed systems, analysis, and software that moves quickly into production.

## Decision

No new repository was necessary. The current portfolio already covers scheduler/runtime, GPU kernels, inference benchmarking, secure serving, and low-level C++ work. The remote profile and gateway were force-rewritten since the previous run, and the current public copy had dropped the shipped backend-probe proof. This run restores that evidence in plain language.

## Public-safety boundary

The profile describes the probe as bounded local endpoint-readiness evidence. It does not claim production fleet capacity, live GPU serving, or customer traffic. The next evidence upgrade remains a real authorized endpoint run with aggregate-only telemetry, or hardware-counter capture when the profiling environment permits it.
