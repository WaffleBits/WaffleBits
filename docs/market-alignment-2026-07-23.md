# Market alignment :: 2026-07-23

## Current roles reviewed

Primary listings were pulled from the OpenAI Ashby feed, Anthropic Greenhouse feed, and Jane Street's careers site on 2026-07-23.

## Revalidation and shipped evidence :: 2026-07-29

The official OpenAI Ashby and Anthropic Greenhouse feeds were queried again on 2026-07-29. The three OpenAI roles below remain active; `Compute Foundations Systems` was published 2026-07-21. All four Anthropic roles remain active with the same published ranges: Inference Systems $350K-$850K, GPU $280K-$850K, Inference Deployment $320K-$485K, and Platform Security / Operating Systems $320K-$405K.

The highest-leverage portfolio gap identified below is now implemented and publicly verifiable in `triton-inference-benchmark`: an OpenAI-compatible streaming client, local SSE integration tests, measured TTFT/inter-chunk/output-volume metrics, usage-complete token throughput, Prometheus export, opt-in credentials, and prompt/endpoint redaction. The implementation passed 34 unit tests and the repository's CI-shaped mock run before the profile and résumé claims were updated.

| Company | Role | Published or updated | Published compensation | Relevant requirements |
|---|---|---:|---:|---|
| OpenAI | [Software Engineer, Compute Foundations Systems](https://jobs.ashbyhq.com/openai/770d5c3f-4e72-4b49-aec4-d444e8ad7a64) | 2026-07-21 | Not exposed in feed | Linux images, kernels, drivers, provisioning, system qualification, canary and rollback |
| OpenAI | [Software Engineer, Model Inference](https://jobs.ashbyhq.com/openai/83b6755d-7785-4186-9050-5ef3ad127941) | Active | Not exposed in feed | Distributed inference, CUDA, NCCL/NVLink, latency, throughput, production debugging |
| OpenAI | [Software Engineer, Security Observability](https://jobs.ashbyhq.com/openai/1e4e9985-babf-4bd9-8fe8-a2016250780d) | Active | Not exposed in feed | Python or Go, security data pipelines, infrastructure as code, cloud, detection engineering |
| Anthropic | [Performance Engineer, Inference Systems](https://job-boards.greenhouse.io/anthropic/jobs/5224564008) | Updated 2026-07-14 | $350K-$850K | End-to-end profiling, tail latency, telemetry analysis, correctness regression gates, Python |
| Anthropic | [Performance Engineer, GPU](https://job-boards.greenhouse.io/anthropic/jobs/4926227008) | Updated 2026-07-14 | $280K-$850K | CUDA/Triton/CUTLASS, Nsight, memory bandwidth, quantization, NCCL/NVLink |
| Anthropic | [Staff + Senior Software Engineer, Inference Deployment](https://job-boards.greenhouse.io/anthropic/jobs/5285557008) | Published 2026-06-29 | $320K-$485K | Request routing, fleet orchestration, Kubernetes, cloud infrastructure, Python or Rust |
| Anthropic | [Platform Security Engineering, Operating Systems](https://job-boards.greenhouse.io/anthropic/jobs/5290426008) | Published 2026-07-07 | $320K-$405K | Linux hardening, kernel/runtime controls, hardware-aware security without unacceptable performance cost |
| Jane Street | [Machine Learning Performance Engineer](https://www.janestreet.com/join-jane-street/position/7449077002/) | Active | $300K base plus bonus | Low-level GPU systems, CUDA/Triton, memory behavior, GPU networking, distributed collectives |
| Jane Street | [Low-Latency Engineer](https://www.janestreet.com/join-jane-street/position/6254435002/) | Active | $250K-$300K base plus bonus | Systems optimization, hardware counters, computer architecture, low-latency network applications |

## Repeated skill signal

Fifteen directly relevant engineering listings were normalized. The most common signals were:

- security: 11 roles
- distributed systems: 10
- GPU systems: 8
- Python: 6
- reliability: 6
- networking: 6
- inference: 5
- observability: 5
- Rust: 4
- latency and throughput: 4 each
- Kubernetes: 4
- profiling and capacity: 3 each
- Linux: 3

CUDA, NCCL, NVLink, quantization, PyTorch, scheduling, Prometheus, Triton, Nsight, and OpenTelemetry recur in the narrower performance tracks.

## Portfolio assessment

The public work already covers the important intersection:

- `secure-gpu-inference-gateway`: access policy, token budgets, audit evidence, Prometheus/OpenTelemetry, deployment controls, and supply-chain checks.
- `deterministic-inference-scheduler`: Rust scheduling, paged KV accounting, replay, and release gates.
- `triton-kernel-lab`: measured Triton kernels with correctness oracles and raw RTX 5070 Ti timing artifacts.
- `triton-inference-benchmark`: concurrency, latency percentiles, regression gates, workload profiles, cost assumptions, and Triton/DCGM telemetry correlation.
- `market-microstructure-engine`: C++20 low-latency work with a separate Python correctness oracle.
- USAF record: TS/SCI-cleared cyber defense, enterprise incident response, and operational leadership.

The profile does not need another broad repository. It needs a stronger bridge between the existing benchmark harness and the OpenAI-compatible LLM serving interfaces used by vLLM, SGLang, and other inference stacks.

## Changes selected

1. Extend `triton-inference-benchmark` with an OpenAI-compatible streaming mode that measures TTFT, inter-chunk latency, output bytes, transport chunk count, server-reported output tokens, end-to-end latency, and token throughput when usage coverage is complete.
2. Keep the implementation dependency-free and test it against a local SSE server in CI.
3. Add the measured streaming fields to JSON and Prometheus output without presenting mock results as hardware evidence.
4. Update the benchmark README, design notes, and operations guide.
5. Update the portfolio and résumé only after the code and tests pass.
6. Fill the blank GitHub name and location fields when authenticated GitHub write access is available.

## Deliberate exclusions

No claim will be made about operating a frontier-model fleet, multi-node NCCL performance, production customer traffic, or real cloud capacity. Those require authorized infrastructure and measured evidence. The public work will continue to distinguish implementation, synthetic fixtures, local measurements, and production experience.
