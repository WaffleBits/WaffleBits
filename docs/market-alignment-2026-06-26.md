# Market Alignment - 2026-06-26

## Sources Checked

- OpenAI, Software Engineer, Productivity, Inference Runtime. Signal: deploy-gate quality, TTFT/TBT and numerical soundness checks, noisy-failure reduction, automated triage, and debugging/escalation paths for inference runtime releases.
  - https://openai.com/careers/software-engineer-productivity-inference-runtime-san-francisco/
- Anthropic, Performance Engineer, Inference Systems. Signal: inference performance, hardware-aware optimization, production reliability, distributed systems, and measurement discipline.
  - https://job-boards.greenhouse.io/anthropic/jobs/5224564008
- Databricks, Staff Software Engineer, Model Serving. Signal: high-throughput, low-latency model serving, observability, autoscaling, routing, caching, SLAs, and cost-efficient serving APIs.
  - https://www.databricks.com/company/careers/engineering/staff-software-engineer-model-serving--8211647002
- xAI, Member of Technical Staff - Compute Infrastructure. Signal: GPU clusters, low-level scheduling and memory management, orchestration, profiling, and memory/network bottleneck analysis.
  - https://job-boards.greenhouse.io/xai/jobs/5052040007
- Jane Street, Low-Latency Engineer. Signal: low-level systems optimization, latency/throughput engineering, hardware counters, cache hierarchy, and networking depth.
  - https://www.janestreet.com/join-jane-street/position/6254435002/
- Citadel, Software Engineer. Signal: strong CS fundamentals, Java/C++/Python, problem solving, and software design under dynamic requirements.
  - https://www.citadel.com/careers/details/software-engineer/

## Interpretation

The profile is already aligned with high-compensation AI infrastructure,
runtime, security, and systems roles. The useful delta was operational signal
quality: release gates should not only say `hold` or `rollback`; they should
route the failed signal to a likely owner with a concrete next action.

## Implemented

- Merged `WaffleBits/rust-inference-runtime` PR #3 after CI passed.
- Added schema-v3 release reports with structured `triage` items for hold and
  rollback reasons.
- Triage items record the failed signal, recommended response, owner hint, next
  investigation action, and original reason.
- Updated checked artifacts, tests, README, and release-validation docs.
- Refreshed the public profile README/site to surface structured release-triage
  proof without compensation, company-targeting, or recruiting-heavy language.

## Public Copy Guidance

Keep public phrasing concrete and evidence-first:

- structured release-triage owner hints
- structured triage for hold/rollback reasons
- failed-signal, response, owner hint, and next-action routing
- canary/shadow promote, hold, and rollback gates
