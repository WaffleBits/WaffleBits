# Market alignment — 2026-07-11

## Current role signals

- [OpenAI Inference Performance Optimization](https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/) continues to emphasize workload analysis across application, model, and fleet layers, microbenchmark-derived cost-to-serve models, latency/throughput bottleneck tooling, and capacity reasoning.
- [OpenAI AMD GPU Enablement](https://openai.com/careers/software-engineer-inference-amd-gpu-enablement-san-francisco/) emphasizes vLLM/Triton integration, correctness and performance across accelerators, distributed inference, HIP/CUDA/Triton kernels, RCCL/NCCL, and GPU profiling.
- [NVIDIA AI Inference Systems](https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/job/Senior-Software-Engineer--AI-Inference-Systems_JR2007798-1) emphasizes vLLM/SGLang, batching and KV-cache behavior, multi-GPU execution, profiling, Kubernetes/Slurm, and Python/C++/Rust systems work.
- [NVIDIA AI Inference](https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/job/Senior-Software-Engineer---AI-Inference_JR2016392) emphasizes upstream runtime changes, request lifecycle and streaming, KV-cache efficiency, correctness/performance regression tests, and multi-GPU reliability.

## Decision

The existing public profile already covers GPU kernels, Rust inference runtime validation, release gates, observability, and secure serving. The next credible gap was a real integration boundary rather than another wording pass.

This run shipped and merged `secure-gpu-inference-gateway` PR #10. The gateway now includes an optional, mock-by-default OpenAI-compatible completion adapter for vLLM/SGLang-style endpoints. It validates completion and chat-completion response shapes, applies bounded timeouts, returns generic backend-error responses with trace IDs, and keeps prompts, outputs, API keys, and endpoint errors out of audit and trace records.

## Public boundary

The profile surfaces the shipped adapter as an integration boundary. It does not claim production traffic, live vLLM/SGLang operation, multi-GPU scale, or measured backend capacity; those remain the next validation step.
