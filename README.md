# Adnan Berik

U.S. Air Force cyber defense, TS/SCI cleared. Independently, I build and benchmark security and AI infrastructure software.

I build the security and platform layer around model serving. My work covers authenticated inference paths, policy and audit controls, release-gate tooling, and the observability that makes serving behavior measurable. I like deterministic systems that can be tested under pressure and explained line by line.

## Selected work

- [secure-gpu-inference-gateway](https://github.com/WaffleBits/secure-gpu-inference-gateway): inference gateway demo showing the security control plane around a mock backend: access control, spending limits, audit logs, supply-chain checks, a [synthetic capacity plan](https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/main/artifacts/capacity-plan-evidence.json) with per-model cost and policy-envelope fields that does not claim production capacity, and a [synthetic resilience drill](https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/main/artifacts/resilience-drill-evidence.json) covering failure signals, mitigation, rollback, and recovery thresholds.
- [deterministic-inference-scheduler](https://github.com/WaffleBits/deterministic-inference-scheduler): deterministic continuous-batching and paged KV-cache scheduler with configurable priority aging (32-tick default), replayable traces, release gates, and 128 bounded generated property cases for replay/accounting and active/KV-capacity invariants on synthetic workloads. Its priority-aging regression admits an older low-priority request at tick 4 during continuing higher-priority arrivals ([test](https://github.com/WaffleBits/deterministic-inference-scheduler/blob/main/tests/scheduler.rs), [synthetic fixture](https://github.com/WaffleBits/deterministic-inference-scheduler/blob/main/fixtures/priority_aging.json)); this is replay behavior, not production fairness or a performance result.
- [triton-kernel-lab](https://github.com/WaffleBits/triton-kernel-lab): fused Triton RMSNorm and SwiGLU kernels with FP32 oracles and measured latency comparisons.
- [triton-inference-benchmark](https://github.com/WaffleBits/triton-inference-benchmark): load-generation toolkit for Triton and OpenAI-compatible serving. Its public CI includes a verified TLS 1.2+ path with explicit CA trust: two authenticated HTTPS agents, wrong-bearer and wrong-CA rejection before target work, and artifact privacy checks. The published `benchmark_report.py` compares ordered saved JSON runs with explicit p95-latency, throughput, success-rate, and retry-amplification gates without copying endpoints or prompts. `lifecycle_qualification.py` starts an explicit service command without a shell, waits for loopback HTTP-200 readiness, then runs the benchmark and emits a privacy-safe startup report. Its [SIGINT/SIGTERM cancellation fixtures](https://github.com/WaffleBits/triton-inference-benchmark/blob/main/tests/run_lifecycle_signal_fixture.py) interrupt a held-open local request, verify benchmark-child and service-group cleanup, require exit status 130/143, and check that no success report is written. This is single-host process cleanup, not remote-agent cancellation or recovery. Existing fixtures also recover one completed shard across an agent restart and both coordinator shards after response loss without duplicate target requests. Its public `qualification_manifest.py` re-derives a saved trend report and binds it to exact ordered input bytes with SHA-256 digests while keeping paths, prompts, endpoints, credentials, outputs, and raw telemetry out of the manifest. The streaming client accepts only exact non-negative integer completion-token counts, distinguishes malformed from missing usage, and emits server-reported output-token throughput only with complete valid coverage; the client keeps text chunks and output bytes separate from token counts. The public CI also runs a deterministic [coordinator CLI fixture](https://github.com/WaffleBits/triton-inference-benchmark/blob/main/tests/run_remote_agent_cancellation_fixture.py) against two authenticated loopback agents and a delayed OpenAI-compatible target: SIGINT/SIGTERM cancel the exact runs, verify agent-child cleanup and cancellation acknowledgements, require exit status 130/143, and leave no success aggregate. This is loopback protocol evidence, not production networking or interrupted-work recovery. The lifecycle value is process-launch to selected health readiness, not model cold-start time; partial-workflow continuation, interrupted-work recovery, multi-host behavior, and production-network behavior remain unverified.
- [heterocore-compiler](https://github.com/WaffleBits/heterocore-compiler): compiler and cost model for mixed analog-digital inference accelerators.
- [market-microstructure-engine](https://github.com/WaffleBits/market-microstructure-engine): limit-order-book matching engine with a C++20 core and Python parity checks.
- [readiness-control-tower](https://github.com/WaffleBits/readiness-control-tower): mission readiness decision tool built on synthetic operational data.

## Background

USAF cyber defense operations.

- Supported cyber defense across 26 wings.
- Cut threat resolution time from 5 days to 2.
- Hardened 30,000 assets.
- Named A6 Airman of the Year, 2025.

## Links

- Portfolio: https://wafflebits.github.io/WaffleBits/
- LinkedIn: https://www.linkedin.com/in/adnanberik/
