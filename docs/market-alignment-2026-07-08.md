# Market Alignment - 2026-07-08

## Current hiring signal

- Levels.fyi still shows the highest software engineering compensation signal concentrated around frontier AI companies, with OpenAI listed as the highest-paying software engineering company on the title page and Anthropic software engineering compensation ranging from $363K to $841K in the United States as of 2026-07-08.
- OpenAI inference and workload-enablement postings continue to emphasize production distributed systems, observability/debugging, CUDA/NCCL/RCCL/HIP/Triton, high-throughput model serving, stress benchmarks, and end-to-end failure-mode characterization.
- Anthropic GPU and inference performance postings reinforce GPU utilization, low-level performance work, production ML systems, inference efficiency, and cross-layer optimization.
- CoreWeave current career listings reinforce inference, Kubernetes, GPU infrastructure, observability, and AI workload operations.
- Jane Street and Citadel Securities remain useful parallel signals for low-level systems discipline: performance-critical C++/systems programming, concurrency, distributed systems, profiling, and latency-sensitive reliability.

## Profile decision

The useful update was not another broad rewrite. The profile already points at platform security, AI infrastructure, inference runtime validation, workload-readiness, deployment-readiness, distributed limiter evidence, and observability.

The narrow proof gap was resilience evidence: show how the gateway treats backend degradation as a reviewed release gate, not just an operations note.

## Implemented proof

- Added `gateway/resilience_drill.py` to `secure-gpu-inference-gateway`.
- Added `artifacts/resilience-drill-evidence.json` with synthetic aggregate checks for backend latency spike, backend error burst, queue saturation, and audit backpressure.
- Added tests for pass/hold behavior, required scenario coverage, invalid probe validation, and sensitive-field exclusion.
- Updated gateway README, operations notes, roadmap, and portfolio review notes.
- Merged the gateway proof in `WaffleBits/secure-gpu-inference-gateway` PR #9 after local tests and GitHub Actions passed.

## Public copy surfaced

Only the merged proof is surfaced publicly:

- resilience-drill evidence
- backend degradation paths
- latency spike, backend error burst, queue saturation, and audit backpressure checks
- checked resilience-drill artifact

Company names, compensation details, and target-company rationale remain out of the visible resume copy.

## Sources checked

- OpenAI Software Engineer, Model Inference: https://openai.com/careers/software-engineer-model-inference-san-francisco/
- OpenAI Software Engineer, Inference - AMD GPU Enablement: https://openai.com/careers/software-engineer-inference-amd-gpu-enablement-san-francisco/
- OpenAI Software Engineer, Workload Enablement: https://openai.com/careers/software-engineer-workload-enablement-san-francisco/
- Anthropic jobs: https://www.anthropic.com/careers/jobs
- CoreWeave careers: https://www.coreweave.com/careers
- Jane Street Machine Learning Performance Engineer: https://www.janestreet.com/join-jane-street/position/7449077002/
- Jane Street Software Engineer: https://www.janestreet.com/join-jane-street/position/4274288002/
- Citadel Securities C++ Software Engineer: https://www.citadelsecurities.com/careers/details/c-software-engineer/
- Levels.fyi Software Engineer Salary: https://www.levels.fyi/t/software-engineer
- Levels.fyi Anthropic Software Engineer Salary: https://www.levels.fyi/companies/anthropic/salaries/software-engineer
- Levels.fyi CoreWeave Software Engineer Salary: https://www.levels.fyi/companies/coreweave/salaries/software-engineer
