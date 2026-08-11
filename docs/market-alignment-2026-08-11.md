# Market alignment review — 2026-08-11

## Scope and source method

This review continues the 2026-08-09 and 2026-08-10 audits. Active roles were read again on 2026-08-11 from official Anthropic Greenhouse and OpenAI/Etched Ashby pages and feeds. Compensation is quoted only where the official posting exposes it. The GitHub inventory was read from the live `WaffleBits` account and public repository default branches.

## Active role evidence

| Company | Role | Official date exposed | Location | Published compensation | Recurring evidence requested |
|---|---|---|---|---|---|
| Anthropic | [Performance Engineer, Inference](https://job-boards.greenhouse.io/anthropic/jobs/5224564008) | Board updated 2026-08-03 | San Francisco, New York City, Seattle | **$320,000-$485,000 USD** annual salary | PyTorch, CUDA/Metal/Triton, custom GPU kernels, distributed computation, Python and C++, benchmarking and profiling inference systems |
| Anthropic | [Performance Engineer, GPU](https://job-boards.greenhouse.io/anthropic/jobs/4926227008) | Board updated 2026-08-03 | San Francisco, New York City, Seattle | **$500,000-$850,000 USD** annual salary | Python/C++, CUDA or ROCm, ML frameworks, GPU hardware and interconnects including NVLink/InfiniBand, hardware counters and performance analysis |
| OpenAI | [Infrastructure Reliability Engineer](https://jobs.ashbyhq.com/openai/85fceac9-fb8a-4d71-a524-a8e5f1e9b01b) | Published 2026-04-25 | San Francisco | **$230K-$385K + offers equity** | Python, Rust, C/C++ or Go; GPU-backed distributed systems; reliability, observability, incident response, Kubernetes and measurable automation |
| OpenAI | [Performance Engineer, ChatGPT](https://jobs.ashbyhq.com/openai/38ddaa2c-a490-427a-8457-0e92bf00138c) | Published 2026-04-15 | San Francisco | **$310K-$460K + offers equity** | C/C++, Python and distributed systems; profiling end-to-end latency/throughput across CPUs, GPUs, networks and storage; tracing and system-level performance work |
| Etched | [Performance Engineer](https://jobs.ashbyhq.com/etched/610c3836-9798-46ea-931a-02bb95b29467) | Published 2026-01-18 | San Jose | **Not exposed** in the official feed | Modern C++, low-level multithreading/networking, Linux profiling, distributed inference performance, accelerator-aware optimization |

Dates above are publication or update dates exactly as exposed by the official feeds; no missing publication date or compensation was inferred.

## Repeated requirements

Across these five representative roles, the strongest repeated requirements are:

1. **Python plus low-level systems work.** C/C++, Rust, CUDA/Triton and accelerator-aware implementation appear repeatedly.
2. **Inference and distributed-systems performance.** Roles ask for latency/throughput analysis across request, runtime, GPU and network layers rather than isolated microbenchmarks alone.
3. **Profiling, observability and trace continuity.** OpenAI explicitly asks for tracing; the reliability role asks for observability; both Anthropic roles ask for benchmark/profiling evidence that connects software behavior to hardware.
4. **Correctness and reproducibility.** Representative postings emphasize rigorous measurement, debugging and optimization under production-like constraints.
5. **Large-system evidence.** Multi-GPU, multi-host, interconnect and real production reliability remain higher-level expectations.

## Live public evidence inventory

The profile repository, profile README, generated resume source, deployed Astro site, repository descriptions/topics, default-branch READMEs, tests and current Actions status were inspected from GitHub.

### Already demonstrated

- `secure-gpu-inference-gateway`: authenticated Python/FastAPI serving control plane, policy, budgets, audit records, OpenTelemetry/Prometheus paths, security checks and bounded probes.
- `triton-inference-benchmark`: Triton and OpenAI-compatible live clients, warmup/measured phase separation, streaming TTFT/inter-chunk semantics, sampled DCGM gauges, privacy-preserving series-membership checks, bracketed server counters, regression gates, cost models, Kubernetes execution shape and deterministic fixtures.
- `triton-kernel-lab`: correctness-gated Triton kernels and published RTX 5070 Ti measurements.
- `deterministic-inference-scheduler`: Rust continuous batching, paged KV-cache admission, replay fingerprints and release gates.
- `market-microstructure-engine`: C++20/Python deterministic parity evidence for a latency-sensitive system.
- Operational background: USAF cyber defense, enterprise incident response, vulnerability management and automation evidence already represented in the profile and resume.

### Present but buried before this review

The benchmark could already drive real Triton and OpenAI-compatible HTTP paths, while the gateway already demonstrated OpenTelemetry instrumentation. The portfolio did not connect those layers: a benchmark request could not initiate standards-based context for continuation by a trace-enabled serving stack.

### Missing after this review

- Evidence that an authorized Triton/vLLM/SGLang deployment accepted the propagated context, created and exported spans, and correlated request work with scheduler/GPU spans.
- Measured multi-host and fabric behavior, including NVLink/InfiniBand counters and topology-aware attribution.
- Production incident or scale claims beyond the documented USAF operational record. No portfolio wording should imply those claims.

## Exactly one selected gap

**Gap:** request-level trace-context continuity from the load generator into live serving infrastructure.

This was selected because it closes the observability/tracing requirement shared by performance and reliability roles, extends the strongest existing serving benchmark, and can be verified locally without inventing GPU, multi-host or production evidence. A new repository would only fragment the existing benchmark story.

## Implemented public evidence

Repository: [`WaffleBits/triton-inference-benchmark`](https://github.com/WaffleBits/triton-inference-benchmark)

- Plan: [`docs/plans/2026-08-11-w3c-trace-context.md`](https://github.com/WaffleBits/triton-inference-benchmark/blob/main/docs/plans/2026-08-11-w3c-trace-context.md)
- Pull request: [#10](https://github.com/WaffleBits/triton-inference-benchmark/pull/10)
- Main commit: [`0a2cc54`](https://github.com/WaffleBits/triton-inference-benchmark/commit/0a2cc54d6738bc5fb0ee4407ebed350f968326ef)
- Main CI: [run 31485705964](https://github.com/WaffleBits/triton-inference-benchmark/actions/runs/31485705964), passed

The implementation adds an explicit `--propagate-trace-context` flag for live Triton and OpenAI-compatible modes. Each physical HTTP attempt, including a retry, receives a fresh sampled W3C `traceparent` with non-zero random identifiers. The flag is off by default, does not read ambient tracing configuration, and is rejected in mock mode.

The deterministic local SSE fixture exercised the real CLI with 3 warmup and 12 measured requests. It received **15/15 unique, syntactically valid** headers. JSON and Prometheus artifacts contained none of those identifiers. The artifact records only that propagation was configured and states that server acceptance/export was not verified.

This is configured propagation plus local HTTP proof, not a production tracing result.

## Verification

Source-repository checks completed before publication:

- `python3 -m unittest discover -s tests`: **67 tests passed**.
- Real traced OpenAI-compatible CLI fixture: **15 headers received, 15 unique, 0 measured failures**, server-reported token usage for all 12 measured requests, no header identifiers in JSON/Prometheus.
- Bracketed telemetry fixture: counter/gauge membership stable and telemetry gate passed.
- Python syntax/compile checks: passed.
- Docker image build and containerized mock CLI: passed with 10 measured and 2 warmup requests plus Prometheus output.
- Python 3.13 container `pip-audit -r requirements.txt`: **no known vulnerabilities**. Host Python 3.9 could not resolve the repository's Python >=3.10 dependency set, so the audit used the supported container runtime.
- `git diff --check`: passed.
- Pull-request CI and post-merge main CI: passed.

## Positioning update

The profile README, Astro project card and one-page resume now name the opt-in W3C trace-context capability without implying downstream server acceptance. The supporting source was merged and its main CI passed before these claims were added.

## Remaining highest-value gap

The next meaningful step is an **authorized end-to-end trace artifact** from the benchmark through a trace-enabled inference server and collector, with sanitized span names/timings and explicit clock/sampling boundaries. Multi-host GPU/interconnect attribution remains valuable but requires suitable infrastructure. Neither should be represented as complete until measured on an authorized deployment.
