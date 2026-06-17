# Portfolio Market Alignment - 2026-06-17

This note records the hiring signal used for the June 17 profile maintenance pass. It is not resume copy; it is a reference for keeping the public work pointed at valuable engineering problems.

## Current Signal

- OpenAI inference roles emphasize high-performance runtimes, memory management, batching, scheduling, multi-GPU execution, profiling, observability, and correctness. Current examples include Inference Performance Optimization, AMD GPU Enablement, Research Inference, and Workload Enablement.
- Anthropic inference roles are especially direct about runtime ownership, performance-sensitive Rust/Python code, accelerator-agnostic scheduling and memory management, deterministic hardware-dependent tests, canary/shadow/rollback validation, cross-layer profiling, numerical correctness, and segmented latency/cost/reliability analysis.
- xAI inference and observability roles emphasize Rust or C++, production serving, global KV cache, continuous batching, load balancing, GPU kernels, tracing/replay tooling, CI/CD for inference updates, and high-scale telemetry pipelines.
- NVIDIA inference postings continue to point at upstream vLLM/SGLang/TensorRT-LLM work, CUDA/Triton/CUTLASS, NCCL/RDMA, multi-GPU debugging, profiling, and benchmark methodology.

## Update Applied

- Implemented and merged `WaffleBits/rust-inference-runtime` PR #1 with model-aware numeric release gates, backend/accelerator-scoped tolerance policy, per-segment release reports, checked fixtures, and CI coverage.
- Updated the profile README and resume site to surface this evidence without adding compensation language or unsupported production-scale claims.
- Kept the next-build roadmap focused on real backend integration, streaming mirrored observations, Nsight/roofline work, and physical FPGA measurement.

## Sources Checked

- OpenAI Software Engineer, Inference - Performance Optimization: https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- OpenAI Software Engineer, Inference - AMD GPU Enablement: https://openai.com/careers/software-engineer-inference-amd-gpu-enablement-san-francisco/
- OpenAI TL, Research Inference: https://openai.com/careers/tl-research-inference-san-francisco/
- OpenAI Software Engineer, Workload Enablement: https://openai.com/careers/software-engineer-workload-enablement-san-francisco/
- Anthropic Staff+ Software Engineer, Inference Runtime: https://job-boards.greenhouse.io/anthropic/jobs/5257650008
- Anthropic Performance Engineer, Inference Systems: https://job-boards.greenhouse.io/anthropic/jobs/5224564008
- xAI Member of Technical Staff - Inference: https://job-boards.greenhouse.io/xai/jobs/4533894007
- xAI Member of Technical Staff - Observability: https://job-boards.greenhouse.io/xai/jobs/4803905007
- NVIDIA Principal Software Engineer - AI Inference: https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/job/Principal-Software-Engineer---AI-Inference_JR2013753
- NVIDIA Senior Software Engineer, DGX Cloud AI Infrastructure: https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/job/Senior-Software-Engineer--DGX-Cloud-AI-Infrastructure_JR2019246
