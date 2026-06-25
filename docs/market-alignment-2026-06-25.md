# Market Alignment - 2026-06-25

## Sources Checked

- OpenAI, Software Engineer, Workload Enablement. Signal: workload-shaped benchmarks, stress and fault tests, CI/lab validation, Kubernetes integration, telemetry hooks, NCCL/RCCL/RDMA, and profiling from traces/counters.
  - https://openai.com/careers/software-engineer-workload-enablement-san-francisco/
- Anthropic, Senior Software Engineer, Inference. Signal: compute-agnostic inference deployments, request routing, fleet-wide orchestration, batching, caching, Kubernetes/cloud infrastructure, and production-workload observability.
  - https://www.anthropic.com/careers/jobs/4641822008
- Databricks, Staff Software Engineer, Model Serving. Signal: high-throughput, low-latency CPU/GPU model serving, routing, caching, observability, autoscaling, SLAs, cost efficiency, and customer-facing platform APIs.
  - https://www.databricks.com/company/careers/engineering/staff-software-engineer-model-serving--8211647002
- xAI, Member of Technical Staff - Compute Infrastructure. Signal: GPU clusters for training and inference, low-level CUDA kernels, Linux scheduling and memory management, orchestration/virtualization, Nsight profiling, and memory/network bottleneck analysis.
  - https://job-boards.greenhouse.io/xai/jobs/5052040007
- Jane Street, Low-Latency Engineer. Signal: low-level systems optimization, network applications with low latency and high throughput, hardware performance counters, cache hierarchy fluency, and kernel-bypass/networking depth.
  - https://www.janestreet.com/join-jane-street/position/6254435002/
- Citadel, Software Engineer. Signal: systems that support research, analysis, trading, risk, funding, and settlement; strong CS fundamentals; Java/C++/Python; problem solving; and software design under dynamic requirements.
  - https://www.citadel.com/careers/details/software-engineer/

## Interpretation

The profile is still aimed at the right market: inference infrastructure, runtime reliability, GPU performance, secure AI service boundaries, and deterministic systems. The incremental gap was not another broad rewrite. The strongest current job signal is evidence that validation can run under workload pressure, not only on clean fixtures.

## Implemented

- Added workload-pressure replay summary fields to `WaffleBits/rust-inference-runtime`: maximum queued requests, maximum active requests, peak KV pressure percentage, queued-pressure ticks, active-capacity ticks, and pressure ratios.
- Added a pressure fixture and checked artifact. The fixture completes eight mixed-priority requests in 27 ticks, reaches all three active slots, records a max queue depth of five, peaks at 13 of 15 KV pages, and reports 86.666667% peak KV pressure.
- Updated runtime docs/tests and profile README/site copy to surface the new proof without naming compensation or target companies publicly.

## Public Copy Guidance

Keep the public phrasing concrete and evidence-first:

- workload-pressure replay summaries
- queue-pressure and active-capacity replay reports
- peak KV pressure
- deterministic trace fingerprints
- token-path telemetry
- canary/shadow promote, hold, and rollback gates
