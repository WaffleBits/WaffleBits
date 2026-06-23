# Market Alignment - 2026-06-23

## Sources Checked

- OpenAI, Software Engineer, Inference - Performance Optimization: $295K-$555K plus equity. Signal: cost-to-serve modeling, bottleneck tooling, latency/throughput tradeoffs, capacity/utilization reasoning, and production inference performance.
  - https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- OpenAI, TL, Research Inference. Signal: high-performance inference runtimes, model execution, memory management, batching, scheduling, distributed inference, kernels, profiling, observability, correctness, and reliability.
  - https://openai.com/careers/tl-research-inference-san-francisco/
- OpenAI, Software Engineer, Workload Enablement. Signal: workload-shaped benchmarks, CI/lab regression outputs, NCCL/RCCL/RDMA, Kubernetes integration, telemetry hooks, failure triage, and end-to-end workload validation.
  - https://openai.com/careers/software-engineer-workload-enablement-san-francisco/
- Anthropic, Performance Engineer, GPU: $280K-$850K. Signal: CUDA, Triton, CUTLASS, FlashAttention, Nsight profiling, torch.compile, NCCL/NVLink, low precision, and production systems.
  - https://job-boards.greenhouse.io/anthropic/jobs/4926227008
- xAI, Member of Technical Staff - Inference: $180K-$440K. Signal: testing, benchmarking, reliability of inference services, and CI/CD infrastructure for inference.
  - https://job-boards.greenhouse.io/xai/jobs/4533894007
- NVIDIA, Senior Software Engineer - AI Inference. Signal: inference-runtime batching and scheduling policies, streaming, KV-cache efficiency, paging, and sharding.
  - https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/job/Senior-Software-Engineer---AI-Inference_JR2016392

## Interpretation

The strongest current signal is not another broad profile rewrite. The public portfolio already shows GPU kernels, Rust scheduling, inference release gates, cost modeling, secure serving, and hardware/software co-design. The new gap was making the Rust runtime less synthetic by adding an adapter surface that can normalize mirrored backend observations from common inference engines before evaluating release policy.

## Implemented

- Merged `WaffleBits/rust-inference-runtime` PR #2 with a backend mirror adapter.
- Added `runtime-lab mirror` and `runtime-lab mirror-gate`.
- Added a vLLM-to-SGLang fixture and checked `promote` report.
- Added adapter tests for token-fingerprint matching, numeric tolerance, segment reporting, and invalid successful observations without output material.
- Updated the public profile README and resume site to replace adapter roadmap phrasing with shipped backend mirror evidence.

## Public Copy Guidance

Keep salary and company names out of public-facing copy. Use the terms only where supported by shipped repo evidence:

- vLLM/SGLang-style mirror normalization
- mirrored observation adapters
- backend-scoped numeric tolerance
- segmented release reports
- canary/shadow promote, hold, and rollback gates

## Next Useful Work

Do not repeat another wording-only profile pass. Highest-value follow-up is extending the adapter from checked mirror summaries to live streaming observations: token-level traces, queue-depth reporting, memory-pressure checks, model-version rollback paths, and tail-latency validation.
