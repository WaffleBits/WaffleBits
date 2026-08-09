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
    what: "faster than compiled PyTorch",
    how: "Fused Triton RMSNorm, RTX 5070 Ti, validated against an FP32 reference",
    href: "https://github.com/WaffleBits/triton-kernel-lab#readme",
  },
  {
    n: "312",
    unit: "K/s",
    what: "orders matched, p50 1.7 microseconds",
    how: "C++20 matching core, Ryzen 9800X3D, checked against a Python oracle",
    href: "https://github.com/WaffleBits/market-microstructure-engine#readme",
  },
];

/* The gateway request path. Short technical labels, no narration. */
export const gates = [
  ["01", "Identity", "caller authenticated, model allowlist checked"],
  ["02", "Policy", "token and request budgets, rate limit, reason for access"],
  ["03", "Route", "batched, dispatched, path recorded with the response"],
  ["04", "Execute", "memory and capacity budgets, replayable"],
  ["05", "Measure", "latency, cost and failures to Prometheus"],
  ["06", "Record", "who asked, what ran, what it cost"],
  ["07", "Gate", "promote, hold or roll back on regression"],
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
    line: "Limit order book with price-time priority. C++20 core, Python model checking every fill.",
    fig: "312K orders/s",
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
    line: "Load generation with separate warmup, sampled (not time-weighted) GPU gauges, and fail-closed server evidence gates.",
    fig: "3 workload shapes",
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
