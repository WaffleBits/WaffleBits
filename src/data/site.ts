/* =============================================================
   Page content. Facts come from the resume and the public repos.
   Nothing is invented, projections are labelled as projections,
   and the professional record is kept separate from the personal
   projects rather than blended into one claim.
   ============================================================= */

export const role = "Platform security and AI infrastructure";

export const openTo = "New York · Washington, D.C.";

export const intro =
  "Cyber defense operations for the U.S. Air Force, TS/SCI cleared. Independently, I build and benchmark infrastructure around AI model serving.";

/* Two measured results, both reproducible from the repositories. */
export const measured = [
  {
    n: "2.2",
    unit: "×",
    what: "faster than compiled PyTorch, at best",
    how: "Fused Triton RMSNorm on an RTX 5070 Ti, 1.25× at the largest shape, validated against an FP32 reference",
    href: "https://github.com/WaffleBits/triton-kernel-lab#readme",
  },
  {
    n: "5.1",
    unit: "M/s",
    what: "orders matched, p50 150 ns",
    how: "C++20 core on a Ryzen 9800X3D under WSL, final state matched against a Python engine",
    href: "https://github.com/WaffleBits/market-microstructure-engine#readme",
  },
];

/* The gateway request path. Short technical labels, no narration. */
export const gates = [
  ["01", "Identity", "bearer JWT checked for issuer, audience, signature and expiry"],
  ["02", "Policy", "role allowed for this model, reason required where policy says so"],
  ["03", "Rate limit", "requests per minute, per caller and model"],
  ["04", "Budget", "estimated input tokens per minute, per caller and model"],
  ["05", "Backend", "mock by default, or an OpenAI-compatible endpoint"],
  ["06", "Measure", "Prometheus metrics for outcomes, tokens and latency"],
  ["07", "Record", "audit event and trace span for every outcome, including denials"],
];

/* End-to-end benchmark. Permalinked to the measurement commit so the
   links survive a merge or a deleted branch. Wording states the null
   result: the differences sat inside run-to-run variance, so no
   overhead or speedup figure is claimed. */
export const measurement = {
  label: "End-to-end measurement",
  body:
    "Benchmarked against direct vLLM on the same host: Qwen2.5-3B on an RTX 5070 Ti, driven by vLLM's own serving client with paired seeds and three repetitions. 3,000 requests, no failures. Gateway throughput tracked direct within run-to-run variance, so no overhead or speedup figure is claimed.",
  method: "https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/e15b9f0/bench/README.md",
  results: "https://github.com/WaffleBits/secure-gpu-inference-gateway/blob/e15b9f0/bench/results/20260803T212059Z-rtx5070ti-qwen25-3b-vllm026/report.md",
};

export const limiterCode = `local current = redis.call("INCRBY", KEYS[1], ARGV[1])
if current == tonumber(ARGV[1]) then
  redis.call("PEXPIRE", KEYS[1], ARGV[2])
end
if current > tonumber(ARGV[3]) then
  return {0, current, tonumber(ARGV[3])}
end
return {1, current, tonumber(ARGV[3])}`;

export const limiterNote =
  "Separate read, increment and expire calls can race across gateway replicas. The Lua script makes the fixed-window counter atomic, sets expiry only on the call that opens the window, and returns the decision with the updated counter. The principal id is SHA-256 hashed into the key rather than stored.";

/* Everything not given a full section. */
export const index = [
  {
    title: "Market Microstructure Engine",
    line: "Limit order book with price-time priority. C++20 core, with a Python engine checking final-state parity.",
    fig: "5.1M orders/s",
    stack: "C++20, Python",
    href: "https://github.com/WaffleBits/market-microstructure-engine",
  },
  {
    title: "Readiness Control Tower",
    line: "Root-cause scoring and what-if analysis over synthetic operational data. Runs in the browser.",
    fig: "Live demo",
    stack: "FastAPI, React",
    href: "https://wafflebits.github.io/readiness-control-tower/",
  },
  {
    title: "Inference Load Benchmark",
    line: "A single-host synthetic CI fixture runs two authenticated TLS 1.2+ HTTPS agents with an explicit CA, then recovers completed shards after response loss/restart; the privacy-safe trend report compares ordered saved runs with explicit p95-latency, throughput, success-rate, and retry-amplification gates. A shell-free lifecycle qualifier measures process-launch to selected HTTP-200 readiness before benchmark work; this is not model cold-start time or a production measurement. A content-addressed qualification manifest re-derives the report and verifies ordered input bytes without serializing paths, prompts, endpoints, credentials, or raw telemetry. Target traffic remains eight requests with zero duplicates. Partial, multi-host, and production recovery are not claimed.",
    fig: "2 HTTPS agents / 8 requests / 0 duplicates",
    stack: "Python",
    href: "https://github.com/WaffleBits/triton-inference-benchmark",
  },
  {
    title: "HeteroCore Compiler",
    line: "ONNX compiler and cost model for mixed analog-digital accelerators, linked to RTL and an FPGA prototype.",
    fig: "68% projected",
    stack: "ONNX, RTL",
    href: "https://github.com/WaffleBits/heterocore-compiler",
  },
];
