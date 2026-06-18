# Portfolio Market Alignment - 2026-06-18

This note records the hiring signal used for the June 18 profile maintenance pass. It is not resume copy; it is a reference for keeping public work pointed at valuable engineering problems.

## Top-Paying Market Signal

- OpenAI remains one of the strongest compensation signals for inference engineering. Levels.fyi showed U.S. software engineering compensation ranging from $249K to $1.23M with a median of $805K as of 2026-06-18. Current OpenAI inference postings emphasize production distributed systems, bottleneck visibility, GPU utilization, CUDA/NCCL, HPC networking, latency, throughput, capacity, and cost-to-serve modeling.
- Anthropic staff-level infrastructure and inference roles list base salary ranges from $325K-$485K and $405K-$485K. Their strongest recurring signals are accelerator depth, performance profiling, latency/throughput optimization, SLOs, measurable reliability improvement, shadow traffic, canaries, automated baseline comparison, fast rollback, deterministic hardware-dependent testing, Kubernetes, and AI-specific observability.
- xAI's Member of Technical Staff - Inference role lists $180K-$440K base plus equity. It is direct about C/C++ or Rust, large-scale high-concurrency serving, vLLM/SGLang/Triton/TensorRT-LLM, batching, caching, load balancing, parallelism, benchmarking, CI/CD, and inference service reliability.
- Quant and market-making firms continue to reward low-level systems fluency. Jane Street's Low-Latency Engineer role lists $250K-$300K base plus bonus and asks for hardware performance counters, modern CPU cache hierarchy knowledge, low-level optimization, high-throughput network applications, and kernel-bypass familiarity. Citadel Securities lists $150K-$300K base plus discretionary incentive compensation for C++ engineers focused on latency, reliability, throughput, concurrency, and distributed systems.
- Defense-tech and forward-deployed roles are lower in public base salary than frontier AI or top quant roles, but they create a strong differentiated lane for this profile because of TS/SCI context. Anduril mission autonomy roles emphasize clearance eligibility, C++/Rust/Python/JavaScript breadth, data processing, complex codebases, secure communications, autonomy, modeling/simulation, and real-world mission impact. Palantir FDSE roles emphasize strong coding across Python/Java/C++/TypeScript, technical breadth, client travel, and field ownership.

## Profile Deltas Detected

- The profile already has the right macro-positioning: secure AI infrastructure, inference runtime work, GPU kernel evidence, hardware/software co-design, mission software, and deterministic C++ systems.
- The weak spot was not the direction; it was scanability. A hiring manager looking for "exceptional work" had to read too far before seeing the strongest proof.
- The phrase "building toward deeper CUDA systems work" undersold existing CUDA-facing evidence. The update now names Triton kernels, CUDA-event timing, and planned Nsight/performance-counter work without overstating raw CUDA driver expertise.
- AI reliability needed to be more visible as its own lane. The update now surfaces SLOs, Prometheus artifacts, incident runbooks, release gates, failure accounting, deterministic fixtures, resilience testing direction, and regression telemetry.
- Quant alignment needed a stronger forward path. The update now names performance-counter direction and cache-aware benchmarking direction beside the existing C++20/order-book evidence.

## Update Applied

- Added a top-level README proof snapshot covering inference runtime validation, GPU performance evidence, AI reliability/operations, and secure mission delivery.
- Added a public resume-site "Proof Snapshot" section immediately after mission impact so the strongest evidence is visible before the longer role-fit and project sections.
- Updated technical focus, role alignment, skills, and next-build priorities to emphasize accelerator-aware release gates, AI observability, resilience probes, OpenTelemetry, Grafana, queue-depth reporting, performance counters, and cache-aware benchmarking.
- Kept compensation and company-targeting language in this maintenance note, not in the public-facing profile.

## Sources Checked

- OpenAI Software Engineer, Model Inference: https://openai.com/careers/software-engineer-model-inference-san-francisco/
- OpenAI Software Engineer, Inference - Performance Optimization: https://openai.com/careers/software-engineer-inference-performance-optimization-san-francisco/
- OpenAI Software Engineer, Inference - Multi Modal: https://openai.com/careers/software-engineer-inference-multi-modal-san-francisco/
- Anthropic Staff+ Software Engineer, Inference Runtime: https://job-boards.greenhouse.io/anthropic/jobs/5257650008
- Anthropic Staff Software Engineer, AI Reliability: https://job-boards.greenhouse.io/anthropic/jobs/5113224008
- xAI Member of Technical Staff - Inference: https://job-boards.greenhouse.io/xai/jobs/4533894007
- Jane Street Low-Latency Engineer, New York: https://www.janestreet.com/join-jane-street/position/6254435002/
- Citadel Securities C++ Software Engineer: https://www.citadelsecurities.com/careers/details/c-software-engineer-2/
- Anduril Mission Software Engineer, Air Vehicle Autonomy: https://job-boards.greenhouse.io/andurilindustries/jobs/4800373007
- Palantir Forward Deployed Software Engineer: https://jobs.lever.co/palantir/dab396d4-2f14-4796-aac0-0d82883dccf0
- Levels.fyi OpenAI Software Engineer Compensation: https://www.levels.fyi/companies/openai/salaries/software-engineer
- Levels.fyi Databricks Software Engineer Compensation: https://www.levels.fyi/companies/databricks/salaries/software-engineer
- Levels.fyi Citadel Software Engineer Compensation: https://www.levels.fyi/companies/citadel/salaries/software-engineer
- Levels.fyi Jane Street Software Engineer Compensation: https://www.levels.fyi/companies/jane-street/salaries/software-engineer
- Levels.fyi Palantir FDSE Compensation: https://www.levels.fyi/companies/palantir/salaries/software-engineer/title/fdse
