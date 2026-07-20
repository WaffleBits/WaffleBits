# Market alignment :: 2026-07-20

## Current signals

- [OpenAI Inference Performance Optimization](https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/) lists $295K-$555K plus equity and emphasizes end-to-end profiling, microbenchmark-to-cost models, latency, capacity, utilization, and hardware-aware inference analysis.
- [Anthropic Performance Engineer, Inference Systems](https://job-boards.greenhouse.io/anthropic/jobs/5224564008) lists $350K-$850K and emphasizes roofline analysis, correctness regression gates, observability, tail latency, token-path behavior, and quantitative prioritization.
- [Anthropic Staff + Senior Software Engineer, Inference Deployment](https://job-boards.greenhouse.io/anthropic/jobs/5285557008) lists $320K-$485K and emphasizes request routing, load balancing, autoscaling, Kubernetes/cloud infrastructure, deployment pipelines, and Python or Rust.
- [Anthropic Performance Engineer, GPU](https://job-boards.greenhouse.io/anthropic/jobs/4926227008) lists $280K-$850K and emphasizes CUDA/Triton/CUTLASS, Nsight profiling, kernel fusion, memory bandwidth, NCCL/NVLink, quantization, and resilient distributed infrastructure.
- [Jane Street Machine Learning Performance Engineer](https://www.janestreet.com/join-jane-street/position/7449077002/) lists a $300K base salary plus discretionary bonus and emphasizes low-level GPU systems, profiling, memory behavior, GPU networking, and distributed collectives.

## Decision

The public portfolio already covers GPU kernels, Rust scheduling, inference cost models, deployment safety, secure serving, and bounded backend probes. The useful next proof was not another headline or compensation-oriented rewrite; it was a small, executable artifact that makes the existing observability path easier to review.

The gateway now adds an aggregate telemetry snapshot that:

- parses only the gateway's safe Prometheus request, token, and latency metrics;
- reports conservative histogram latency upper bounds rather than pretending bucket data is exact percentiles;
- correlates those metrics with a whitelisted bounded-probe report; and
- holds the review status when the backend probe is held.

The checked artifact uses a local review fixture and remains explicitly separate from production capacity, GPU utilization, customer traffic, prompts, outputs, credentials, endpoint URLs, and identities. Public copy surfaces the proof without naming employers or compensation.
