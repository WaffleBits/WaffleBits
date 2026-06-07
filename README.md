Cleared U.S. cyber operations specialist building secure AI infrastructure, inference reliability tooling, mission decision systems, and performance-sensitive engineering projects.

I am strongest where backend/platform engineering meets high-stakes operations: securing model-serving paths, measuring inference reliability, translating ambiguous workflows into operational software, and building deterministic systems that can be tested under pressure.

**Resume website:** [wafflebits.github.io/WaffleBits](https://wafflebits.github.io/WaffleBits/)

## Technical Focus

- AI compute and inference infrastructure: model-serving gateways, inference benchmarks, Docker/Kubernetes-oriented deployment thinking, Prometheus-compatible artifacts, latency/throughput regression checks, GPU-aware system design, and production ML reliability.
- Inference runtime performance: request routing, batching/caching concepts, workload profiling, tail-latency analysis, regression harnesses, and a practical path toward vLLM/SGLang-style serving work.
- Infrastructure security: authentication, authorization, RBAC, rate limits, audit trails, policy enforcement, threat modeling, secure service boundaries, and production extension paths such as OIDC, mTLS, external policy engines, and key management.
- Forward-deployed / mission engineering: turning ambiguous operational data into working tools for root-cause analysis, what-if planning, observable delivery, and decision support.
- Quantitative systems engineering: deterministic matching, market microstructure, C++20, latency distributions, cross-language correctness gates, and Linux fundamentals.

## Current Stack

- Languages: Python, C++20, TypeScript, Java; building toward deeper CUDA/Rust systems work.
- Backend/platform: FastAPI, REST APIs, Docker, Linux, CI, service boundaries, testable architecture, and Kubernetes deployment shapes.
- AI infrastructure: Triton-style serving concepts, benchmarking, latency percentiles, throughput, failure accounting, exact-output batch-invariance checks, Prometheus output, regression comparison, queueing/batching concepts, and GPU-aware reliability.
- Security: access control, policy enforcement, audit logging, rate limiting, public-safe threat modeling, incident response, and secure service design.
- Product judgment: synthetic operational data modeling, command-facing workflows, explainable recommendations, reviewer-friendly docs, stakeholder translation, and public-safe portfolio discipline.

## Role Alignment

- AI compute and inference infrastructure teams: distributed services, model-serving reliability, Kubernetes-oriented operations, observability, inference benchmarking, performance regression tracking, and hardware-aware debugging.
- Inference runtime and performance teams: request lifecycle design, routing, batching, caching, tail-latency investigation, benchmark-driven optimization, and native C++ performance measurement.
- Infrastructure security teams: secure access paths, service boundaries, policy enforcement, audit evidence, threat models, incident runbooks, and controls around AI workloads.
- Forward-deployed AI / government engineering teams: cleared mission context, stakeholder translation, full-stack prototypes, data-backed workflows, observable systems, and delivery under ambiguous requirements.
- Quantitative systems teams: deterministic execution, market mechanics, Linux fundamentals, C++20, latency measurement, oracle testing, and strong CS fundamentals.

## Evidence Map

- Compute / inference infrastructure: Triton-style benchmark work shows concurrency control, latency percentiles, throughput, retry/failure accounting, exact-output checks across isolated and concurrent execution, Prometheus output, baseline/candidate regression reports, and Kubernetes job posture.
- Runtime performance direction: the benchmark and gateway repos create a public-safe path for workload profiles, routing policy, queue-depth signals, server-side telemetry correlation, and future vLLM/SGLang-compatible testing.
- Secure AI platform engineering: Secure GPU Inference Gateway shows authenticated model access, RBAC, reason-for-access policy, audit trails, metrics, SLO notes, incident runbooks, and extension points for OIDC, mTLS, KMS, GPU telemetry, and external policy engines.
- Forward-deployed mission software: Readiness Control Tower shows public-safe operational data modeling, root-cause scoring, what-if analysis, recommendations, full-stack workflow design, Docker, and tests.
- Systems / quant fundamentals: Market Microstructure Engine pairs a Python correctness oracle with a dependency-free C++20 core, deterministic parity checks, latency distributions, and measured native throughput.

## Featured Work

### [Readiness Control Tower](https://github.com/WaffleBits/readiness-control-tower)

Synthetic mission readiness platform that fuses sortie, maintenance, supply, personnel, and outage data into a command-facing decision surface.

Covers operational data modeling, FastAPI service design, React/TypeScript workflow design, root-cause scoring, what-if analysis, Docker, tests, and public-safe mission framing.

### [Triton Inference Benchmark](https://github.com/WaffleBits/triton-inference-benchmark)

Distributed inference benchmarking toolkit for Triton-compatible model-serving workflows.

Covers Python load generation, configurable concurrency, retry-aware execution, p50/p95/p99 latency, throughput, success-rate reporting, JSON outputs, and a clean path from mock CI to live inference testing.

Includes Prometheus text export, baseline-versus-candidate regression reporting, batch-invariance probes under concurrent noise traffic, operations notes, and a Kubernetes Job shape for cluster-local benchmark runs.

### [Secure GPU Inference Gateway](https://github.com/WaffleBits/secure-gpu-inference-gateway)

Security-focused AI infrastructure project for authenticated model access, RBAC, rate limiting, audit logs, policy checks, and observability.

Covers authenticated model access, per-model authorization, reason-for-access enforcement, rate limiting, structured audit logs, Prometheus-compatible metrics, Kubernetes health/scrape posture, SLO notes, incident runbooks, policy checks, tests, and production extension points such as OIDC, mTLS, KMS, GPU telemetry, and external policy engines.

### [Market Microstructure Engine](https://github.com/WaffleBits/market-microstructure-engine)

Low-level matching engine and backtesting project for limit-order-book mechanics, deterministic execution, latency measurement, and market simulation.

Covers price-time priority, integer tick prices, partial fills, market orders, cancellations, deterministic snapshots, Python/C++20 parity checks, native edge-case tests, and p50/p95/p99/max latency reporting.

## Next Build Priorities

1. Add warmup/cold-start windows, payload profiles, model-aware numeric tolerance, distributed load generation, and workload comparison reports to the Triton benchmark.
2. Add a vLLM/SGLang-compatible mock profile that exercises request routing, batching, streaming, and tail-latency regression behavior without requiring private models.
3. Add OIDC/JWT verification, distributed rate limiting, OpenTelemetry traces, and Grafana dashboard screenshots to the secure GPU inference gateway.
4. Extend the Kubernetes, metrics, SLO, rollback, and runbook pattern into the readiness repo.
5. Add Linux performance-counter capture, cache-aware data-structure comparisons, and replay-style market data ingestion to the C++20 matching engine.
6. Prepare the local LLM inference-serving stack for public release only after README cleanup, tests, and a reviewer-safe benchmark report.

## Public-Safe Portfolio Note

All public repositories use synthetic data, mock integrations, or open tooling. I do not publish operational, classified, proprietary, government-furnished, or sensitive customer data.
