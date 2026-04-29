# WaffleBits
https://wafflebits.github.io/WaffleBits/

Cleared U.S. cyber operations specialist building security-minded AI infrastructure, mission decision systems, and performance-sensitive engineering projects.

I am strongest where backend and platform engineering meet high-stakes operations: securing model-serving paths, measuring inference reliability, translating messy workflows into operational software, and building deterministic systems that can be tested under pressure.

**Resume website:** [wafflebits.github.io/WaffleBits](https://wafflebits.github.io/WaffleBits/)

## Technical Focus

- AI infrastructure / platform engineering: model-serving gateways, inference benchmarks, Docker/Kubernetes-oriented deployment thinking, observability, reliability, and GPU-aware system design.
- Security infrastructure: authentication, authorization, RBAC, rate limits, audit trails, policy enforcement, threat modeling, and secure service boundaries.
- Forward deployed / mission engineering: turning ambiguous operational data into working tools for root-cause analysis, what-if planning, and decision support.
- Quantitative systems engineering: deterministic matching, market microstructure, latency measurement, correctness testing, and a C++/Rust systems roadmap.

## Current Stack

- Languages: Python, TypeScript, Java; actively building toward Rust/C++ for systems and quant work.
- Backend/platform: FastAPI, REST APIs, Docker, Linux, CI, service boundaries, testable architecture.
- AI infrastructure: Triton-style serving concepts, benchmarking, latency percentiles, throughput, failure accounting, and GPU-aware reliability.
- Security: access control, policy enforcement, audit logging, rate limiting, public-safe threat modeling.
- Product judgment: synthetic operational data modeling, command-facing workflows, explainable recommendations, and public-safe portfolio discipline.

## Work Areas

- AI infrastructure teams: distributed services, model-serving reliability, Kubernetes-oriented operations, observability, inference benchmarking, and security controls around AI workloads.
- Mission and deployment engineering teams: operational workflows, synthetic mission data, root-cause analysis, and software that helps users act under uncertainty.
- Quantitative systems teams: deterministic execution, market mechanics, performance measurement, strong CS fundamentals, and a path toward lower-level implementations.

## Featured Work

### [Readiness Control Tower](https://github.com/WaffleBits/readiness-control-tower)

Synthetic mission readiness platform that fuses sortie, maintenance, supply, personnel, and outage data into a command-facing decision surface.

Covers operational data modeling, FastAPI service design, React/TypeScript workflow design, root-cause scoring, what-if analysis, Docker, tests, and public-safe mission framing.

### [Triton Inference Benchmark](https://github.com/WaffleBits/triton-inference-benchmark)

Distributed inference benchmarking toolkit for Triton-compatible model-serving workflows.

Covers Python load generation, configurable concurrency, retry-aware execution, p50/p95/p99 latency, throughput, success-rate reporting, JSON outputs, and a clean path from mock CI to live inference testing.

### [Secure GPU Inference Gateway](https://github.com/WaffleBits/secure-gpu-inference-gateway)

Security-focused AI infrastructure project for authenticated model access, RBAC, rate limiting, audit logs, policy checks, and observability.

Covers authenticated model access, per-model authorization, reason-for-access enforcement, rate limiting, structured audit logs, Prometheus-compatible metrics, Kubernetes health/scrape posture, SLO notes, incident runbooks, policy checks, tests, and production extension points such as OIDC, mTLS, KMS, GPU telemetry, and external policy engines.

### [Market Microstructure Engine](https://github.com/WaffleBits/market-microstructure-engine)

Low-level matching engine and backtesting project for limit-order-book mechanics, deterministic execution, latency measurement, and market simulation.

Covers price-time priority, integer tick prices, partial fills, market orders, cancellations, deterministic snapshots, edge-case tests, and benchmarkable execution. Next phase is a C++20 or Rust core with latency histograms and replay-style market data ingestion.

## Next Build Priorities

1. Extend the Kubernetes, metrics, SLO, and runbook pattern from Secure GPU Inference Gateway into the Triton benchmark and readiness repos.
2. Add a live Triton or vLLM adapter path with reproducible benchmark reports and regression comparison.
3. Port the market microstructure core to C++20 or Rust and compare latency, memory layout, and throughput against the Python reference.
4. Add stronger incident-response artifacts: runbooks, fault injection, alert quality examples, and postmortem templates.

## Public-Safe Portfolio Note

All public repositories use synthetic data, mock integrations, or open tooling. I do not publish operational, classified, proprietary, government-furnished, or sensitive customer data.
