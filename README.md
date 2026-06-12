Cleared U.S. cyber operations specialist building secure AI infrastructure, inference reliability tooling, mission decision systems, and performance-sensitive engineering projects.

I am strongest where backend/platform engineering meets high-stakes operations: securing model-serving paths, measuring inference reliability, translating ambiguous workflows into operational software, and building deterministic systems that can be tested under pressure.

**Resume website:** [wafflebits.github.io/WaffleBits](https://wafflebits.github.io/WaffleBits/)

## Technical Focus

- AI compute and inference infrastructure: custom Triton kernels, cache-controlled GPU benchmarks, model-serving gateways, inference benchmarks, Docker/Kubernetes-oriented deployment thinking, Prometheus-compatible artifacts, latency/throughput regression checks, token and GPU-hour capacity modeling, and production ML reliability.
- Inference runtime performance: fused RMSNorm, PyTorch and `torch.compile` baselines, request routing, batching/caching concepts, workload profiling, tail-latency analysis, cost-to-serve estimates, regression harnesses, and a practical path toward vLLM/SGLang-style serving work.
- Infrastructure security: authentication, authorization, RBAC, rate limits, audit trails, policy enforcement, threat modeling, secure service boundaries, and production extension paths such as OIDC, mTLS, external policy engines, and key management.
- Forward-deployed / mission engineering: turning ambiguous operational data into working tools for root-cause analysis, what-if planning, observable delivery, and decision support.
- Quantitative systems engineering: deterministic matching, market microstructure, C++20, latency distributions, cross-language correctness gates, and Linux fundamentals.

## Current Stack

- Languages: Python, C++20, TypeScript, Java; building toward deeper CUDA and Rust systems work.
- Backend/platform: FastAPI, REST APIs, Docker, Linux, CI, service boundaries, testable architecture, and Kubernetes deployment shapes.
- AI infrastructure: Triton GPU kernels, FP32-accumulating correctness oracles, cache-cold CUDA-event benchmarking, PyTorch compile comparisons, latency percentiles, token throughput, GPU-hour capacity, cost-to-serve estimates, failure accounting, exact-output batch-invariance checks, Prometheus output, and GPU-aware reliability.
- Security: access control, policy enforcement, audit logging, rate limiting, public-safe threat modeling, incident response, and secure service design.
- Product judgment: synthetic operational data modeling, command-facing workflows, explainable recommendations, reviewer-friendly docs, stakeholder translation, and public-safe portfolio discipline.

## Role Alignment

- AI compute and inference infrastructure teams: distributed services, model-serving reliability, Kubernetes-oriented operations, observability, inference benchmarking, performance regression tracking, and hardware-aware debugging.
- Inference runtime and performance teams: Triton kernel development, cache-state control, PyTorch compiler comparison, request lifecycle design, routing, batching, tail-latency investigation, transparent cost modeling, and native C++ performance measurement.
- Infrastructure security teams: secure access paths, service boundaries, policy enforcement, audit evidence, threat models, incident runbooks, and controls around AI workloads.
- Forward-deployed AI / government engineering teams: cleared mission context, stakeholder translation, full-stack prototypes, data-backed workflows, observable systems, and delivery under ambiguous requirements.
- Quantitative systems teams: deterministic execution, market mechanics, Linux fundamentals, C++20, latency measurement, oracle testing, and strong CS fundamentals.

## Evidence Map

- GPU kernel performance: Triton Kernel Lab shows a fused RMSNorm kernel, FP32 oracle validation, cache-cold and cache-hot modes, raw timing samples, p50/p95/p99 tails, `torch.compile` comparison, and a machine-readable regression gate measured on an RTX 5070 Ti.
- Compute / inference infrastructure: Triton-style benchmark work shows concurrency control, latency percentiles, token throughput, requests per GPU-hour, normalized cost-to-serve estimates, retry/failure accounting, exact-output checks across isolated and concurrent execution, Prometheus output, baseline/candidate regression reports, and Kubernetes job posture.
- Runtime performance direction: the benchmark and gateway repos create a public-safe path for workload profiles, routing policy, queue-depth signals, server-side telemetry correlation, and future vLLM/SGLang-compatible testing.
- Secure AI platform engineering: Secure GPU Inference Gateway shows authenticated model access, RBAC, reason-for-access policy, audit trails, metrics, SLO notes, incident runbooks, and extension points for OIDC, mTLS, KMS, GPU telemetry, and external policy engines.
- Forward-deployed mission software: Readiness Control Tower shows public-safe operational data modeling, root-cause scoring, what-if analysis, recommendations, full-stack workflow design, Docker, and tests.
- Systems / quant fundamentals: Market Microstructure Engine pairs a Python correctness oracle with a dependency-free C++20 core, deterministic parity checks, latency distributions, and measured native throughput.

## Featured Work

### [Triton Kernel Lab](https://github.com/WaffleBits/triton-kernel-lab)

Correctness-first GPU kernel lab centered on a fused Triton RMSNorm implementation and controlled comparison with PyTorch eager and `torch.compile`.

The committed RTX 5070 Ti report records 100 warmups and 500 cache-cold samples per case, correctness errors, p50/p95/p99/max latency, environment metadata, and 1.15x-2.44x FP16 p50 speedups over the compiled baseline across the tested shapes.

### [Readiness Control Tower](https://github.com/WaffleBits/readiness-control-tower)

Synthetic mission readiness platform that fuses sortie, maintenance, supply, personnel, and outage data into a command-facing decision surface.

Covers operational data modeling, FastAPI service design, React/TypeScript workflow design, root-cause scoring, what-if analysis, Docker, tests, and public-safe mission framing.

### [Triton Inference Benchmark](https://github.com/WaffleBits/triton-inference-benchmark)

Distributed inference benchmarking toolkit for Triton-compatible model-serving workflows.

Covers Python load generation, configurable concurrency, retry-aware execution, p50/p95/p99 latency, throughput, success-rate reporting, JSON outputs, and a clean path from mock CI to live inference testing.

Includes Prometheus text export, baseline-versus-candidate regression reporting, batch-invariance probes under concurrent noise traffic, token-throughput and GPU-capacity metrics, explicit accelerator/energy cost assumptions, normalized cost-to-serve estimates, operations notes, and a Kubernetes Job shape for cluster-local benchmark runs.

### [Secure GPU Inference Gateway](https://github.com/WaffleBits/secure-gpu-inference-gateway)

Security-focused AI infrastructure project for authenticated model access, RBAC, rate limiting, audit logs, policy checks, and observability.

Covers authenticated model access, per-model authorization, reason-for-access enforcement, rate limiting, structured audit logs, Prometheus-compatible metrics, Kubernetes health/scrape posture, SLO notes, incident runbooks, policy checks, tests, and production extension points such as OIDC, mTLS, KMS, GPU telemetry, and external policy engines.

### [Market Microstructure Engine](https://github.com/WaffleBits/market-microstructure-engine)

Low-level matching engine and backtesting project for limit-order-book mechanics, deterministic execution, latency measurement, and market simulation.

Covers price-time priority, integer tick prices, partial fills, market orders, cancellations, deterministic snapshots, Python/C++20 parity checks, native edge-case tests, and p50/p95/p99/max latency reporting.

## Next Build Priorities

1. Extend the Triton kernel lab with Nsight Compute counters, fused gated activations, shape-specific autotuning, and controlled hardware-counter reports.
2. Add a vLLM/SGLang-compatible mock profile that exercises request routing, batching, streaming, and tail-latency regression behavior without requiring private models.
3. Add OIDC/JWT verification, distributed rate limiting, OpenTelemetry traces, and Grafana dashboard screenshots to the secure GPU inference gateway.
4. Extend the Kubernetes, metrics, SLO, rollback, and runbook pattern into the readiness repo.
5. Add Linux performance-counter capture, cache-aware data-structure comparisons, and replay-style market data ingestion to the C++20 matching engine.
6. Prepare the local LLM inference-serving stack for public release only after README cleanup, tests, and a reviewer-safe benchmark report.

## Public-Safe Portfolio Note

All public repositories use synthetic data, mock integrations, or open tooling. I do not publish operational, classified, proprietary, government-furnished, or sensitive customer data.
