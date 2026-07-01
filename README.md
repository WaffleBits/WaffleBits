Cleared U.S. cyber operations specialist building the platform and security software layer around AI infrastructure: secure model access, token-budget controls, LLM serving reliability tooling, inference runtime validation, token-path telemetry, mission decision systems, and performance-sensitive engineering projects.

I am strongest where backend/platform engineering meets high-stakes operations: securing model-serving paths, turning policy and audit requirements into software controls, measuring inference reliability, translating ambiguous workflows into operational software, and building deterministic systems that can be tested under pressure.

**Resume website:** [wafflebits.github.io/WaffleBits](https://wafflebits.github.io/WaffleBits/)

## Target Engineering Lane

- Platform security and security software engineering: authenticated service boundaries, policy-as-code direction, audit evidence, secure CI/CD thinking, request and token-budget limits, incident runbooks, and developer-facing controls.
- AI infrastructure security: model-serving gateways, protected inference paths, token-path telemetry, model authorization, redaction and data-handling roadmap, GPU-aware reliability, and production observability.
- Forward-deployed mission engineering: cleared operational context, synthetic public-safe mission workflows, root-cause analysis, what-if planning, and systems that help users act under pressure.

## Proof Snapshot

- Inference runtime validation: Rust scheduler core with continuous batching, paged KV-cache admission, deterministic replay, workload-pressure replay summaries, replay capacity envelopes, prefill/decode utilization, KV-page occupancy, backend-scoped numeric tolerance, vLLM/SGLang mirror normalization, streaming-token event ingestion, route/scheduler provenance coverage, segmented release reports, TTFT and decode-token p95 checks, KV memory-pressure reporting, model-version transitions, token-trace fingerprints, structured release-triage owner hints, and `promote`, `hold`, and `rollback` gates.
- GPU performance evidence: Triton RMSNorm and SwiGLU kernels with FP32 oracles, launch autotuning, cache-controlled CUDA-event measurement, raw p50/p95/p99 timing artifacts, and `torch.compile` baselines.
- AI reliability and operations: inference benchmark reports for latency, throughput, failures, token/GPU-hour capacity, cost-to-serve estimates, Prometheus output, batch-invariance gates, deterministic trace artifacts, and Kubernetes-shaped execution.
- Secure mission delivery: TS/SCI operational context combined with authenticated model access, RBAC, policy controls, request and token-budget limits, audit trails, sanitized trace export, Grafana/Prometheus observability evidence, incident runbooks, and public-safe mission decision software.

## Technical Focus

- AI compute and inference infrastructure: custom Triton kernels, cache-controlled GPU benchmarks, model-serving gateways, inference benchmarks, Docker/Kubernetes-oriented deployment thinking, Prometheus-compatible artifacts, routing/scheduling/autoscaling concepts, latency/throughput regression checks, token and GPU-hour capacity modeling, token-path telemetry, and production ML reliability.
- Inference runtime performance: Rust continuous batching, paged KV-cache admission, deterministic replay, workload-pressure summaries, replay capacity envelopes, prefill/decode utilization, KV-page occupancy, vLLM/SGLang-style mirror normalization, streaming-token event validation, route/scheduler provenance checks, canary/shadow release gates, structured hold/rollback triage, model-aware numeric tolerance, segmented backend validation, TTFT and decode-token p95 checks, KV memory-pressure reporting, model-version transition metadata, token-trace fingerprints, fused Triton kernels, PyTorch and `torch.compile` baselines, workload profiling, accelerator-aware capacity analysis, tail-latency analysis, instrumentation/profiling direction, and regression harnesses.
- Hardware/software co-design: ONNX graph ingestion, mixed analog-digital partitioning, explicit accelerator and memory cost models, SystemVerilog control/datapath blocks, FPGA synthesis flows, and model-level quality evaluation with clear simulation-versus-measurement boundaries.
- Infrastructure security and reliability: authentication, authorization, RBAC, request and token-budget limits, audit trails, policy enforcement, threat modeling, secure service boundaries, AI observability, sanitized trace evidence, Grafana dashboard provisioning, SLOs, resilience testing direction, and production extension paths such as OIDC, mTLS, external policy engines, and key management.
- Forward-deployed / mission engineering: turning ambiguous operational data into working tools for root-cause analysis, what-if planning, observable delivery, and decision support.
- Quantitative systems engineering: deterministic matching, market microstructure, C++20, latency distributions, cross-language correctness gates, Linux fundamentals, performance counters, cache-aware data-structure direction, and low-level systems discipline.

## Current Stack

- Languages: Rust, Python, C++20, SystemVerilog, TypeScript, Java, Bash; CUDA-facing work through Triton kernels, CUDA-event timing, and planned Nsight/performance-counter capture.
- Backend/platform: FastAPI, REST APIs, Docker, Linux, CI, service boundaries, testable architecture, and Kubernetes deployment shapes.
- AI infrastructure: Triton GPU kernels, FP32-accumulating correctness oracles, launch autotuning, cache-cold CUDA-event benchmarking, PyTorch compile comparisons, latency percentiles, token throughput, GPU-hour capacity, cost-to-serve estimates, failure accounting, exact-output batch-invariance checks, Prometheus output, routing/scheduling/autoscaling concepts, vLLM/SGLang-style release-gate adapters, streaming-token trace fixtures, route/scheduler provenance coverage, replay capacity-envelope reports, structured release-triage output, accelerator-aware release gates, instrumentation/tracing/profiling direction, and GPU-aware reliability.
- Accelerator co-design: ONNX, analytical performance/energy models, analog non-ideality simulation, banked-SRAM traffic analysis, SystemVerilog, Icarus Verilog, Verilator, Yosys, OpenLane configuration, and FPGA schedule execution.
- Security: access control, policy enforcement, audit logging, request and token-budget limiting, public-safe threat modeling, incident response, and secure service design.
- Product judgment: synthetic operational data modeling, command-facing workflows, explainable recommendations, reviewer-friendly docs, stakeholder translation, and public-safe portfolio discipline.

## Role Alignment

- AI compute and inference infrastructure teams: distributed services, model-serving reliability, customer-facing serving APIs, Kubernetes-oriented operations, observability, inference benchmarking, routing/scheduling/autoscaling concepts, performance regression tracking, and hardware-aware debugging.
- Inference runtime and performance teams: Rust scheduling, paged KV admission, deterministic replay, workload-pressure replay reports, replay capacity envelopes, prefill/decode utilization, KV-page occupancy, vLLM/SGLang mirror normalization, streaming-token trace validation, route/scheduler provenance checks, canary/shadow/rollback validation, structured release-triage owner hints, model/backend numeric drift gates, TTFT and decode-token p95 checks, KV memory-pressure reporting, model-version transition metadata, Triton kernel development, cache-state control, tracing/profiling direction, tail-latency investigation, transparent cost modeling, and native C++ performance measurement.
- AI reliability / production engineering teams: SLOs, Prometheus-compatible artifacts, incident runbooks, release gates, triage routing, failure accounting, deterministic fixtures, trace/replay tooling, token-path telemetry, streaming trace coverage, token-budget limiter evidence, sanitized trace export, Grafana dashboard provisioning, resilience testing direction, and telemetry that makes regressions visible.
- Accelerator and hardware/software co-design teams: compiler partitioning, cost-model assumptions, memory hierarchy analysis, low-precision datapaths, RTL verification, FPGA synthesis, and model-level accuracy tradeoff analysis.
- Infrastructure security teams: secure access paths, service boundaries, policy enforcement, audit evidence, threat models, incident runbooks, and controls around AI workloads.
- Forward-deployed AI / government engineering teams: cleared mission context, stakeholder translation, full-stack prototypes, data-backed workflows, observable systems, and delivery under ambiguous requirements.
- Quantitative systems teams: deterministic execution, market mechanics, Linux fundamentals, C++20, latency measurement, oracle testing, performance-counter direction, cache-aware benchmarking direction, and strong CS fundamentals.

## Evidence Map

- GPU kernel performance: Triton Kernel Lab shows fused RMSNorm and SwiGLU kernels, FP32 oracle validation, shape-aware launch autotuning, cache-cold and cache-hot modes, raw timing samples, p50/p95/p99 tails, `torch.compile` comparison, and a machine-readable regression gate measured on an RTX 5070 Ti.
- Hardware/software co-design: HeteroCore connects ONNX compilation, analog non-ideality simulation, SRAM/DRAM traffic modeling, synthesizable SystemVerilog, and FPGA schedule execution through a versioned execution plan. Projected and simulated results are labeled separately from synthesis outputs and physical measurements.
- Compute / inference infrastructure: Triton-style benchmark work shows concurrency control, latency percentiles, token throughput, requests per GPU-hour, normalized cost-to-serve estimates, retry/failure accounting, exact-output checks across isolated and concurrent execution, Prometheus output, baseline/candidate regression reports, traceable workload artifacts, and Kubernetes job posture.
- Inference runtime engineering: Rust Inference Runtime implements stable priority admission, bounded prefill work, conservative paged KV reservations, round-robin decode scheduling, deterministic trace fingerprints, queue-pressure and active-capacity replay summaries, replay capacity-envelope reports, prefill/decode utilization, KV-page occupancy, vLLM/SGLang-style mirrored observation normalization, streaming-token event ingestion, route/scheduler provenance coverage, model-aware numeric tolerance for backend drift, segmented release reports, TTFT and decode-token p95 checks, KV memory-pressure reporting, model-version transition metadata, token-trace fingerprints, structured triage for hold/rollback reasons, and baseline/candidate `promote`, `hold`, and `rollback` decisions.
- Secure AI platform engineering: Secure GPU Inference Gateway shows authenticated model access, RBAC, reason-for-access policy, request and token-budget limits, audit trails, Prometheus metrics, estimated input-token throughput, sanitized trace JSONL evidence, Grafana dashboard provisioning, SLO notes, incident runbooks, and extension points for OIDC, mTLS, KMS, policy-as-code, redaction, GPU telemetry, and external policy engines.
- Forward-deployed mission software: Readiness Control Tower shows public-safe operational data modeling, root-cause scoring, what-if analysis, recommendations, full-stack workflow design, Docker, and tests.
- Systems / quant fundamentals: Market Microstructure Engine pairs a Python correctness oracle with a dependency-free C++20 core, deterministic parity checks, latency distributions, and measured native throughput.

## Featured Work

### [Triton Kernel Lab](https://github.com/WaffleBits/triton-kernel-lab)

Correctness-first GPU kernel lab with fused Triton RMSNorm and SwiGLU implementations, FP32 oracles, and controlled comparison with PyTorch eager and `torch.compile`.

The June 14 RTX 5070 Ti report records 100 warmups and 500 cache-cold samples per case, correctness errors, p50/p95/p99/max latency, environment metadata, and FP16 p50 speedups of 1.25x-2.21x for RMSNorm and 1.07x-2.07x for SwiGLU over the compiled baselines.

### [Rust Inference Runtime](https://github.com/WaffleBits/rust-inference-runtime)

Deterministic, accelerator-agnostic runtime core for continuous batching, paged KV-cache admission, replayable scheduling traces, workload-pressure summaries, replay capacity envelopes, vLLM/SGLang-style mirror normalization, streaming-token event validation, route/scheduler provenance coverage, model-aware numeric tolerance, segmented backend reports, structured release triage, token-path telemetry, and canary/shadow release validation.

The checked workload completes four synthetic requests in 11 scheduler ticks, accounts for 224 prompt tokens, 18 decode tokens, and 18 reserved KV pages, peaks at 12 of 20 KV pages, records queue-pressure and active-capacity ticks, reports 0.818182 decode-capacity utilization, returns all reservations on completion, and emits a stable trace fingerprint. A pressure fixture completes eight mixed-priority requests in 27 ticks, reaches all three active slots, records a max queue depth of five, accounts for 432 prompt tokens, 48 decode tokens, and 35 reserved KV pages, reports 86.666667% peak KV pressure, 0.888889 decode-capacity utilization, and 0.595062 KV-page occupancy. Separate fixtures exercise `promote`, `hold`, and `rollback` policy paths through exact output, numeric drift tolerance, error-rate, coverage, segmented backend, p95 latency checks, TTFT and decode-token p95 telemetry, KV memory-pressure checks, model-version transition metadata, token-trace fingerprints, release-triage owner hints, a vLLM-to-SGLang backend mirror report, and a streaming mirror report with `candidate_routing_provenance_rate: 1.0`, `candidate_streaming_trace_rate: 1.0`, two candidate routes, and `continuous-batching` scheduler evidence.

### [HeteroCore Compiler](https://github.com/WaffleBits/heterocore-compiler)

Compiler and analytical cost model for mixed analog-digital AI inference, linked to separate analog simulation, memory hierarchy, RTL, and FPGA repositories through a versioned execution plan.

Covers ONNX import, explainable operator placement, peripheral-aware energy sensitivity, model-level quality evaluation, banked-SRAM traffic analysis, synthesizable INT8 datapaths, self-checking simulation, and FPGA synthesis. Analytical projections, simulations, synthesis outputs, and future board measurements are explicitly distinguished.

### [Readiness Control Tower](https://github.com/WaffleBits/readiness-control-tower)

Synthetic mission readiness platform that fuses sortie, maintenance, supply, personnel, and outage data into a command-facing decision surface.

Covers operational data modeling, FastAPI service design, React/TypeScript workflow design, root-cause scoring, what-if analysis, Docker, tests, and public-safe mission framing.

### [Triton Inference Benchmark](https://github.com/WaffleBits/triton-inference-benchmark)

Distributed inference benchmarking toolkit for Triton-compatible model-serving workflows.

Covers Python load generation, configurable concurrency, retry-aware execution, p50/p95/p99 latency, throughput, success-rate reporting, JSON outputs, and a clean path from mock CI to live inference testing.

Includes Prometheus text export, baseline-versus-candidate regression reporting, batch-invariance probes under concurrent noise traffic, token-throughput and GPU-capacity metrics, explicit accelerator/energy cost assumptions, normalized cost-to-serve estimates, operations notes, and a Kubernetes Job shape for cluster-local benchmark runs.

### [Secure GPU Inference Gateway](https://github.com/WaffleBits/secure-gpu-inference-gateway)

Security-focused AI infrastructure project for authenticated model access, RBAC, request and token-budget limiting, audit logs, policy checks, and observability.

Covers authenticated model access, per-model authorization, reason-for-access enforcement, request and token-budget limiting, structured audit logs, Prometheus-compatible metrics, estimated input-token throughput, opt-in sanitized trace export that omits prompts, outputs, access reasons, and principal identifiers, a checked trace artifact, Grafana dashboard provisioning, Kubernetes health/scrape posture, SLO notes, incident runbooks, policy checks, tests, and production extension points such as OIDC, mTLS, KMS, policy-as-code, prompt/output redaction, GPU telemetry, and external policy engines.

### [Market Microstructure Engine](https://github.com/WaffleBits/market-microstructure-engine)

Low-level matching engine and backtesting project for limit-order-book mechanics, deterministic execution, latency measurement, and market simulation.

Covers price-time priority, integer tick prices, partial fills, market orders, cancellations, deterministic snapshots, Python/C++20 parity checks, native edge-case tests, and p50/p95/p99/max latency reporting.

## Next Build Priorities

1. Extend the Triton kernel lab with Nsight Compute counters, roofline analysis, and controlled hardware-counter reports.
2. Connect the Rust runtime streaming mirror adapter to live vLLM/SGLang traces with production traffic provenance and audited rollout metadata.
3. Upgrade the secure GPU inference gateway from local sanitized trace/Grafana proof to full OTLP collector export, distributed request/token-budget controls, profiling hooks, resilience probes, and captured dashboard screenshots.
4. Load compiler-generated HeteroCore tiles through a host interface and record physical FPGA timing, utilization, and wall-power measurements.
5. Extend the Kubernetes, metrics, SLO, rollback, and runbook pattern into the readiness repo.
6. Add Linux performance-counter capture, cache-aware data-structure comparisons, and replay-style market data ingestion to the C++20 matching engine.

## Public-Safe Portfolio Note

All public repositories use synthetic data, mock integrations, or open tooling. I do not publish operational, classified, proprietary, government-furnished, or sensitive customer data.
