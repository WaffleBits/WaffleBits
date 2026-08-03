/* =============================================================
   Presentation layer // how the material in portfolio.ts is
   sequenced, weighted, and framed on the page.
   Facts here are drawn from the resume and the public repos.
   Nothing is invented. Projections are labelled as projections.
   ============================================================= */

/* ---- figures: all from Air Force service, all on the resume ---- */
export type Figure = { n: string; u?: string; l: string };

export const figures: Figure[] = [
  { n: "$1.3", u: "B", l: "Value of the Air Force network environment under the watch I help run." },
  { n: "27,000", l: "Users defended around the clock across 26 wings and 15 bases." },
  { n: "5→2", u: "days", l: "Threat resolution time after I built the tracking dashboards." },
  { n: "30,000", l: "Systems hardened through 18 cyber tasking orders, leading 11 Airmen." },
];

export const signalClaim =
  "None of this is a side project at scale. It is <em>live enterprise cyber defense</em>, run on a watch floor, with a TS/SCI clearance and an award trail behind it.";

/* ---- work: three studies, one live demo, three in the archive ---- */
export type Study = {
  cf: string;                    // caseFiles id
  kind: string;                  // label above the title
  why: string;                   // why it exists
  hard: string;                  // the hard part
  out: string;                   // outcome
  stack: string;
  media: "gateway" | "kernels" | "replay";
};

export const studies: Study[] = [
  {
    cf: "CF-01",
    kind: "Platform security // AI serving",
    why: "Model endpoints are the most valuable and least governed surface in an AI company. Anyone with a key can spend money and read answers, and afterwards nobody can say who did what.",
    hard: "Enforcing identity, budget, and reason-for-access on the request path without adding latency the serving layer cannot afford, and keeping the limiter correct when it runs on many servers at once.",
    out: "Every call arrives authenticated, priced, and recorded. Denials are logged rather than dropped, and the release path covers shadow, canary, staged rollout, and rollback.",
    stack: "Python / FastAPI / Redis / OpenTelemetry / Prometheus / Grafana / Docker",
    media: "gateway",
  },
  {
    cf: "CF-03",
    kind: "GPU performance // measured",
    why: "Kernel speed claims are the easiest thing in machine learning to overstate. Most published numbers have no correctness oracle and no cache control, so they measure the benchmark rather than the kernel.",
    hard: "Fusing RMSNorm and autotuning SwiGLU so they beat a compiled PyTorch baseline, while validating every output against an FP32 reference and flushing cache between runs so the numbers mean something.",
    out: "Up to 2.2x faster than the PyTorch baseline on an RTX 5070 Ti, with full latency distributions, machine-readable reports, and a regression gate in CI.",
    stack: "OpenAI Triton / PyTorch / CUDA / pytest",
    media: "kernels",
  },
  {
    cf: "CF-02",
    kind: "Serving internals // Rust",
    why: "Serving regressions hide. Batching and cache admission drift between runs, so a version that is quietly worse can pass review and reach production before anyone notices.",
    hard: "Rebuilding continuous batching, paged KV-cache admission, and decode scheduling so that identical input produces a byte-identical trace, then turning that trace into a promotion decision.",
    out: "Replay fingerprints that let a failure be reproduced instead of argued about, plus structured hold and rollback triage backed by capacity envelopes.",
    stack: "Rust / deterministic replay / vLLM and SGLang observations",
    media: "replay",
  },
];

/* ---- how I think: each line is a rule one of the repos enforces ---- */
export const tenets = [
  { t: "If it is not measured, it does not ship.", b: "Latency percentiles, throughput, cost per request, and failure accounting exist before a change is called an improvement." },
  { t: "Reproduce, then fix.", b: "Deterministic replay turns a flaky report into a fingerprint. Debugging a recording beats debugging a memory of production." },
  { t: "A denial is a record, not a dead end.", b: "Refused requests are written down with a reason. The interesting question after an incident is always what was blocked and why." },
  { t: "The fast path needs an oracle.", b: "The C++ matching engine is checked against an independent Python model. Speed only counts once something else agrees with the answer." },
];

/* ---- the real Lua limiter from the gateway repo ---- */
export const limiterCode = `-- gateway/rate_limit.py :: the Redis path, one round trip
local current = redis.call("INCRBY", KEYS[1], ARGV[1])
if current == tonumber(ARGV[1]) then
  redis.call("PEXPIRE", KEYS[1], ARGV[2])
end
if current > tonumber(ARGV[3]) then
  return {0, current, tonumber(ARGV[3])}
end
return {1, current, tonumber(ARGV[3])}`;

export const limiterWhy =
  "Spending limits have to hold when the gateway is running on ten machines at once. Doing the read, the increment, and the expiry as three separate calls lets two servers both believe they are under budget. This runs as one atomic script, sets the expiry only on the call that created the window, and returns the decision with the counter, so the caller can be told exactly how much budget is left. The key is a hash, so the limiter never stores who made the request.";

/* ---- about ---- */
export const about = [
  "I spend my working hours on an Air Force watch floor, defending a network that covers 26 wings and 15 bases. It is where I learned that the systems worth building are the ones people still trust at three in the morning.",
  "The rest of my time goes to the layer above AI model serving. <strong>Who is allowed to call this model, what did it cost, was it fast, and what record exists afterward.</strong> Everything on this page is public on GitHub with the measurements attached, including the ones that were not flattering.",
  "Before any of it I ran Linux game servers for a community of 29,000 players, who complain within seconds of anything breaking. Still the most useful operations training I have had.",
];
