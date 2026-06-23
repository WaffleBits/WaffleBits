# Portfolio Market Alignment - 2026-06-22

This note records the current hiring signal used for the June 22 maintenance pass. It is not resume copy; it is a reference for keeping public work pointed at valuable engineering problems without making the profile sound compensation-driven.

## Top-Paying Market Signal

- OpenAI remains one of the clearest top-comp inference signals. Levels.fyi showed U.S. software engineering compensation from $249K to $1.23M with an $805K median as of 2026-06-22. Current OpenAI inference postings emphasize high-volume, low-latency, high-availability serving; bottleneck visibility; latency, throughput, capacity, utilization, and cost tradeoffs; GPU memory/FLOP utilization; CUDA, NCCL, InfiniBand, MPI, and NVLink familiarity; and production distributed systems debugging.
- Anthropic's current inference runtime and AI reliability postings continue to validate the existing direction: accelerator-agnostic runtime architecture, Rust/Python performance-sensitive code, scheduling and memory management, canary/shadow/rollback validation, deterministic hardware-dependent testing, Kubernetes, SLOs, AI observability, resilience testing, incident response, and accelerator/networking depth across GPU/TPU/Trainium, RDMA, and InfiniBand.
- Databricks is a stronger signal in this pass than the earlier profile note reflected. Current model-serving and GenAI inference postings emphasize customer-facing serving APIs, routing, scheduling, autoscaling, observability, model container deployment workflows, scalable batching, dynamic loading, memory management, model versioning, A/B launches, tracing, profiling, CUDA/GPU/NCCL experience, and translating product/customer needs into reliable serving systems.
- xAI's inference posting reinforces the same concentrated cluster: C/C++ or Rust, global KV cache, continuous batching, load balancing, autoscaling, GPU kernels, quantization, speculative decoding, tail latency, trace/replay tooling, CI/CD, and inference service reliability.
- Quant and market-making firms remain a parallel high-comp lane for low-level systems evidence. Jane Street's low-latency role emphasizes hardware performance counters, profiling tools, cache hierarchy, low-level optimization, extremely low-latency/high-throughput networking, and kernel-bypass experience. Citadel Securities emphasizes C++, multithreading, concurrency, distributed systems, latency, reliability, throughput, production ownership, and communication.
- CoreWeave postings surfaced through current job indexes reinforce a GPU-cloud variant of the same theme: Kubernetes-native inference platforms, P99 service reliability, Prometheus/Grafana/OpenTelemetry observability, CUDA/NCCL/RDMA/NUMA, GPU interconnects, vLLM/Triton/TensorRT-LLM/Ray Serve/TorchServe familiarity, and metrics-driven tail-latency improvements.

## Profile Deltas Detected

- The public profile was already correctly pointed at secure AI infrastructure, inference runtime validation, GPU kernel evidence, hardware/software co-design, mission software, and deterministic C++ systems.
- The useful June 22 delta is model-serving platform depth: routing, scheduling, autoscaling, memory pressure, tracing/profiling, model versioning, A/B launches, and customer-facing serving APIs should be more visible as the next build direction.
- The public profile should not claim direct production experience with vLLM, SGLang, TensorRT-LLM, NCCL/RDMA, or large GPU fleets unless future repos produce evidence. It is acceptable to name adapter direction, concepts, and planned evidence when clearly framed as next-build priorities.
- No new repository is necessary yet. A new repo would make sense only after there is fresh shipped evidence, such as a small vLLM/SGLang adapter harness, OpenTelemetry/Grafana trace package, or Nsight Compute report set.

## Update Applied

- Tightened the public README opening around LLM serving reliability and inference runtime validation.
- Added routing/scheduling/autoscaling, instrumentation/tracing/profiling direction, customer-facing serving APIs, and memory/model-version rollback paths to public profile copy where those terms describe either existing evidence or explicitly stated build direction.
- Kept compensation/company targeting in this note instead of the public profile surface.

## Sources Checked

- OpenAI Software Engineer, Model Inference: https://openai.com/careers/software-engineer-model-inference-san-francisco/
- OpenAI Software Engineer, Inference - Performance Optimization: https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- Anthropic Staff+ Software Engineer, Inference Runtime: https://job-boards.greenhouse.io/anthropic/jobs/5257650008
- Anthropic Staff Software Engineer, AI Reliability: https://job-boards.greenhouse.io/anthropic/jobs/5113224008
- Databricks Senior Software Engineer, Model Serving: https://www.databricks.com/company/careers/engineering/senior-software-engineer-model-serving-8211648002
- Databricks Software Engineer, GenAI Inference: https://www.databricks.com/company/careers/engineering---pipeline/software-engineer---genai-inference--8202670002
- Databricks Staff Software Engineer, GenAI Inference: https://www.databricks.com/company/careers/engineering---pipeline/staff-software-engineer---genai-inference-8202698002
- Databricks Staff Software Engineer, Foundational Model Serving: https://www.databricks.com/company/careers/engineering/staff-software-engineer-foundational-model-serving-8224683002
- xAI Member of Technical Staff - Inference: https://job-boards.greenhouse.io/xai/jobs/4533894007
- Jane Street Low-Latency Engineer, New York: https://www.janestreet.com/join-jane-street/position/6254435002/
- Citadel Securities C++ Software Engineer: https://www.citadelsecurities.com/careers/details/c-software-engineer-2/
- CoreWeave Careers: https://www.coreweave.com/careers
- Levels.fyi OpenAI Software Engineer Compensation: https://www.levels.fyi/companies/openai/salaries/software-engineer
- Levels.fyi Databricks Software Engineer Compensation: https://www.levels.fyi/companies/databricks/salaries/software-engineer
- Levels.fyi Jane Street Software Engineer Compensation: https://www.levels.fyi/companies/jane-street/salaries/software-engineer
- Levels.fyi Citadel Software Engineer Compensation: https://www.levels.fyi/companies/citadel/salaries/software-engineer
