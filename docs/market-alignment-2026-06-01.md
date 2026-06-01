# Portfolio Market Alignment - 2026-06-01

This note records the public hiring signal used to tune the profile. It is not resume copy; it is a maintenance reference for keeping the public work pointed at valuable engineering problems.

## Top-Market Signal

- Levels.fyi's U.S. software engineering leaderboard, last updated May 10, 2026, shows AI labs, high-growth infrastructure companies, and quant firms clustered near the top of total compensation: Anthropic, OpenAI, Citadel, Databricks, Meta, and related companies all appear in the upper tier. In New York, OpenAI, Databricks, Citadel, HRT, Anthropic, Jump, Datadog, Scale AI, and Jane Street are visible high-paying signals.
- OpenAI compute infrastructure postings emphasize distributed systems, Kubernetes/scheduling, observability, reliability engineering, GPU infrastructure, RDMA/NCCL, workload profiling, benchmarking, and hardware-aware performance optimization.
- Anthropic inference postings emphasize large-scale distributed systems, intelligent request routing, fleet orchestration across accelerators, LLM inference optimization, batching/caching, Kubernetes/cloud infrastructure, Python/Rust, observability analysis, and multi-region deployments.
- NVIDIA AI inference postings emphasize vLLM/SGLang contributions, batching/scheduling, streaming, KV-cache efficiency, Python plus C++/CUDA, profiling, distributed inference, multi-GPU reliability, performance regression tests, and open-source review habits.
- Jane Street and HRT postings emphasize strong programming ability, Linux, low-level systems programming, C++/OCaml/Python, networking, performance counters, computer architecture, low-latency/high-throughput systems, and real-time production debugging.
- Palantir production infrastructure and forward-deployed material emphasizes secure and highly available software, Kubernetes as a deployment substrate, customer/mission workflow decomposition, scalable data infrastructure, and AI systems that work in practice.

## Profile Updates Applied

- Shifted the top-line language from broad AI infrastructure toward secure inference systems, reliability tooling, and performance-sensitive engineering.
- Added explicit inference runtime performance language: request routing, batching/caching, workload profiling, tail latency, regression harnesses, and vLLM/SGLang-style serving direction.
- Strengthened role fit for AI compute infrastructure, inference runtime performance, secure AI platforms, forward-deployed AI, and quant/systems engineering.
- Kept the tone evidence-first: shipped repos, metrics, tests, operations notes, and roadmap items carry the message instead of availability language.

## Build Priorities

1. Add a vLLM/SGLang-compatible mock workload path to the inference benchmark.
2. Add queue-depth, batching, streaming, and server-side telemetry correlation to benchmark reports.
3. Add OIDC/JWT, OpenTelemetry, distributed rate limiting, and Grafana screenshots to the secure gateway.
4. Port the market microstructure core to C++20 or Rust and publish latency histograms.
5. Prepare the local LLM serving stack for public release only after tests, README cleanup, and reviewer-safe benchmarks.

## Sources Checked

- Levels.fyi U.S. software engineering leaderboard: https://www.levels.fyi/leaderboard/Software-Engineer/All-Levels/country/United-States/
- Levels.fyi New York software engineering leaderboard: https://www.levels.fyi/leaderboard/Software-Engineer/All-Levels/city/New-York/
- OpenAI Software Engineer, Compute Infrastructure: https://openai.com/careers/software-engineer-compute-infrastructure-san-francisco/
- Anthropic Staff + Sr. Software Engineer, Inference: https://job-boards.greenhouse.io/anthropic/jobs/4951696008
- NVIDIA Senior Software Engineer - AI Inference: https://jobs.nvidia.com/careers/job/893394678645
- Jane Street Software Engineer, New York: https://www.janestreet.com/join-jane-street/position/8046410002/
- Jane Street Low-Latency Engineer, New York: https://www.janestreet.com/join-jane-street/position/6254435002/
- Hudson River Trading Work at HRT: https://www.hudsonrivertrading.com/work-at-hrt/
- Palantir Production Infrastructure: https://www.palantir.com/careers/infrastructure/
