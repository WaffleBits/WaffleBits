/* =============================================================
   WaffleBits // Secure AI Infrastructure Command Center
   Vanilla JS. No dependencies. GitHub Pages friendly.

   Sections:
     0. Content data (separated from presentation)
     1. Sentinel eye: procedural ASCII renderer
     2. Boot / intro controller (session-gated, skippable)
     3. Ambient eyes
     4. Live signals + session clock
     5. System map (request path)
     6. Role / view filters
     7. Command palette
     8. Renderers (case files, evidence, dividers)
     9. Init
   ============================================================= */
"use strict";

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const announce = (msg) => { const l = $("#live"); if (l) l.textContent = msg; };

/* =============================================================
   0. CONTENT DATA
   ============================================================= */

const CASE_FILES = [
  {
    id: "CF-01", icon: "§", roles: "security ai",
    title: "Secure GPU Inference Gateway",
    tags: ["Platform Security", "AI Infra", "Policy"],
    problem: "Model-serving paths are high-value and under-governed: who may call which model, at what budget, with what audit trail?",
    system: "Authenticated gateway enforcing RBAC and reason-for-access policy, request and token-budget limits, and a distributed-limiter readiness path for Redis/Envoy migration.",
    evidence: "Sanitized trace JSONL, OTLP collector-ready payloads, deployment-readiness gates (shadow / canary / staged / rollback), Grafana provisioning, SLO notes, and incident runbooks.",
    impact: "A defensible, observable model-access boundary with a roadmap to policy-as-code, redaction, and external authorization engines.",
    url: "https://github.com/WaffleBits/secure-gpu-inference-gateway",
  },
  {
    id: "CF-02", icon: "▤", roles: "ai",
    title: "Rust Inference Runtime",
    tags: ["Rust", "Scheduling", "Determinism"],
    problem: "Serving reliability breaks silently: non-deterministic batching and cache admission make regressions hard to catch before promotion.",
    system: "Continuous batching with stable priority ordering, paged KV-cache admission, round-robin decode progress, and vLLM/SGLang-style mirror normalization.",
    evidence: "Deterministic replay fingerprints, workload-pressure summaries, replay capacity envelopes, prefill/decode utilization, KV-page occupancy, TTFT and decode-token p95 checks, and structured hold/rollback triage.",
    impact: "Promote / hold / rollback decisions backed by reproducible evidence. A runtime that catches the bad path before it ships.",
    url: "https://github.com/WaffleBits/rust-inference-runtime",
  },
  {
    id: "CF-03", icon: "◈", roles: "ai",
    title: "Triton Kernel Lab",
    tags: ["GPU", "Triton", "Perf"],
    problem: "Kernel-level performance claims are worthless without correctness oracles and controlled measurement.",
    system: "Fused RMSNorm and autotuned SwiGLU Triton kernels validated against FP32 oracles, with explicit cache control and CUDA-event timing.",
    evidence: "Raw p50/p95/p99 latency distributions, torch.compile baselines, machine-readable reports, and a cache-cold GPU regression gate.",
    impact: "Trustworthy kernel performance evidence: measured, correctness-gated, and regression-protected.",
    url: "https://github.com/WaffleBits/triton-kernel-lab",
  },
  {
    id: "CF-04", icon: "◎", roles: "ai",
    title: "Triton Inference Benchmark",
    tags: ["Load", "Cost", "Reliability"],
    problem: "Serving decisions need repeatable numbers: latency, throughput, failure accounting, and cost-to-serve, not vibes.",
    system: "Repeatable load-generation harness with concurrency controls, retry/failure accounting, and Kubernetes job posture.",
    evidence: "p50/p95/p99 latency, throughput, Prometheus export, baseline regression gates, exact-output batch-invariance checks, token & GPU-hour capacity, and normalized cost-to-serve estimates.",
    impact: "A capacity- and cost-aware benchmark that turns serving tradeoffs into defensible numbers.",
    url: "https://github.com/WaffleBits/triton-inference-benchmark",
  },
  {
    id: "CF-05", icon: "⧉", roles: "mission",
    title: "Readiness Control Tower",
    tags: ["Mission", "FastAPI", "Decision"],
    problem: "Operators drown in raw sortie, maintenance, supply, and outage data with no path to root cause under pressure.",
    system: "Synthetic mission-readiness platform (FastAPI + React) with root-cause scoring, what-if analysis, and command-facing workflows.",
    evidence: "Operational recommendations, Dockerized deployment, and test coverage over synthetic data.",
    impact: "Ambiguous operational data becomes a decision surface that helps users act under uncertainty.",
    url: "https://github.com/WaffleBits/readiness-control-tower",
  },
  {
    id: "CF-06", icon: "⊟", roles: "ai",
    title: "HeteroCore Compiler",
    tags: ["Co-Design", "ONNX", "FPGA"],
    problem: "Analog/digital accelerator tradeoffs are opaque: projections, simulations, and measurements get conflated.",
    system: "ONNX compiler and analytical cost model for mixed analog-digital inference, linked to analog simulation, memory-hierarchy analysis, synthesizable RTL, and FPGA schedule execution.",
    evidence: "A versioned plan that clearly separates projections, simulations, synthesis outputs, and future board measurements.",
    impact: "Honest hardware/software co-design analysis with explicit simulation-versus-measurement boundaries.",
    url: "https://github.com/WaffleBits/heterocore-compiler",
  },
  {
    id: "CF-07", icon: "≋", roles: "mission ai",
    title: "Market Microstructure Engine",
    tags: ["C++20", "Determinism", "Latency"],
    problem: "Matching logic is unforgiving: a single ordering bug corrupts every downstream fill.",
    system: "Python and C++20 matching engines covering price-time priority, partial fills, market orders, and cancellations.",
    evidence: "Deterministic cross-language parity checks, integer tick accounting, native tests, and p50/p95/p99 latency distributions.",
    impact: "A benchmarkable, provably-consistent deterministic core with a Python oracle guarding the C++ implementation.",
    url: "https://github.com/WaffleBits/market-microstructure-engine",
  },
];

const EVIDENCE = [
  { glyph: "◎", title: "Benchmarks", roles: "ai", items: [
    "p50 / p95 / p99 latency distributions",
    "throughput & token / GPU-hour capacity",
    "normalized cost-to-serve estimates",
    "cache-cold GPU regression artifacts",
  ]},
  { glyph: "⟳", title: "Replay Fixtures", roles: "ai", items: [
    "deterministic replay fingerprints",
    "workload-pressure replay summaries",
    "replay capacity envelopes",
    "0.888889 decode-capacity / 0.595062 KV occupancy fixture",
  ]},
  { glyph: "◈", title: "Traces", roles: "ai security", items: [
    "sanitized trace JSONL evidence",
    "OTLP collector-ready payloads",
    "streaming-token event validation",
    "route / scheduler provenance coverage",
  ]},
  { glyph: "▤", title: "Dashboards", roles: "security ai", items: [
    "Grafana dashboard provisioning",
    "Prometheus-compatible metrics",
    "SLO notes & burn tracking",
    "correlated Triton / DCGM telemetry",
  ]},
  { glyph: "⧗", title: "Promotion Gates", roles: "ai", items: [
    "batch-invariance CI gates",
    "latency regression gates",
    "canary / shadow / staged rollout",
    "structured hold / rollback triage",
  ]},
  { glyph: "≣", title: "Runbooks & Audit", roles: "security mission", items: [
    "incident runbooks",
    "audit trails & RBAC records",
    "reason-for-access policy checks",
    "deployment-readiness reviews",
  ]},
];

const MAP_NODES = {
  ingress: { title: "Ingress / Auth", body: "Authenticated service boundary. Callers present identity; RBAC decides which models and scopes they may touch before a single token is generated." },
  policy:  { title: "Policy", body: "Reason-for-access checks, request and token-budget limits, and distributed-limiter readiness. Denied and rate-limited paths are first-class, not afterthoughts." },
  routing: { title: "Routing", body: "Scheduler and continuous-batching decisions with stable priority ordering. Provenance is recorded so a request can be traced back to the route that served it." },
  runtime: { title: "Runtime", body: "Paged KV-cache admission and deterministic decode. Prefill/decode utilization and KV-page occupancy are measured, not assumed." },
  observe: { title: "Observability", body: "Prometheus metrics, OTLP trace export, TTFT and decode-token p95 checks. If it isn't measured, it isn't shipped." },
  audit:   { title: "Audit", body: "Sanitized trace log with token-trace fingerprints. Every served request leaves a reviewable record." },
  gate:    { title: "Promotion Gate", body: "Batch-invariance, latency-regression, and replay gates decide promote / hold / rollback. This is where a bad path gets caught." },
};

const MAP_ORDER = ["ingress", "policy", "routing", "runtime", "observe", "audit", "gate"];
const FAULT = {
  node: "gate",
  title: "Fault caught // rollback",
  body: "Batch-invariance gate flagged a non-deterministic output at the promotion boundary. The candidate is held and rolled back automatically; the audit log records the reason. The sentinel caught the failure path before it reached production.",
};

/* =============================================================
   1. SENTINEL EYE: procedural ASCII renderer
   Not a fixed template: the eye is generated per-frame from an
   almond aperture + iris striations + pupil catchlight, resolving
   from noise and sweeping a scan line.
   ============================================================= */

const RAMP = " .·:-=+*o#%@";

function renderEye(cols, rows, o) {
  o = o || {};
  const open  = o.open == null ? 1 : o.open;
  const t     = o.t || 0;
  const noise = o.noise || 0;
  const scanY = o.scanY;                 // row units, or undefined
  const lookX = o.lookX || 0;
  const lookY = o.lookY || 0;
  const ASPECT = 2.05;                    // monospace cell height : width
  const cx = (cols - 1) / 2, cy = (rows - 1) / 2;
  const W = cols * 0.47;
  const H = W * 0.40 * open;              // vertical half-aperture
  const irisR  = W * 0.34;
  const pupilR = W * 0.14;
  const last = RAMP.length - 1;
  const rowsArr = new Array(rows);

  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      const X = c - cx;
      const Y = (r - cy) * ASPECT;
      const u = X / W;
      const inX = u > -1 && u < 1;
      const Ylid = inX ? H * Math.pow(1 - u * u, 0.72) : 0;
      const inside = inX && Math.abs(Y) <= Ylid;
      let v = 0;

      if (inside) {
        const Xi = X - lookX, Yi = Y - lookY;
        const R = Math.hypot(Xi, Yi);
        const nearLid = Ylid - Math.abs(Y);
        if (R < pupilR) {
          v = 0.04;                                    // pupil
          const clx = Xi + pupilR * 0.5, cly = Yi + pupilR * 0.7;
          if (Math.hypot(clx, cly) < pupilR * 0.5) v = 1; // catchlight
        } else if (R < irisR) {
          const ang = Math.atan2(Yi, Xi);
          const spokes = Math.sin(ang * 20 + R * 0.12);
          const ring = Math.sin(R * 0.95 - t * 2.0);
          v = 0.5 + 0.22 * spokes + 0.16 * ring;
          if (R > irisR * 0.8) v += 0.28;              // limbus ring
        } else {
          v = 0.10;                                    // sclera
        }
        if (nearLid < 1.1) v = Math.max(v, 0.85);      // eyelid edge
      } else if (inX) {
        const d = Math.abs(Y) - Ylid;                  // canthus corners
        if (d > 0 && d < 1.4) v = 0.5;
      }

      if (scanY != null && inside && Math.abs(r - scanY) < 0.9) v = 1;
      if (noise > 0 && Math.random() < noise * 0.55) v = Math.random();

      const idx = clamp(Math.round(v * last), 0, last);
      line += v <= 0 ? " " : RAMP[idx];
    }
    rowsArr[r] = line;
  }
  return rowsArr.join("\n");
}

// Size a <pre> so `cols` columns fit its container width exactly.
function fitEye(pre, cols, ratio) {
  const host = pre.parentElement || pre;
  const w = host.clientWidth || 320;
  const charW = 0.60;                              // monospace advance ≈ 0.6em
  let fs = w / (cols * charW);
  fs = clamp(fs, 4.5, 15);
  pre.style.fontSize = fs.toFixed(2) + "px";
  const rows = Math.max(6, Math.round(cols * ratio));
  return { cols, rows };
}

function introCols() {
  const w = window.innerWidth;
  if (w < 600) return 46;
  if (w < 980) return 66;
  return 88;
}

/* =============================================================
   2. BOOT / INTRO CONTROLLER
   ============================================================= */

const BOOT_LOG = [
  { at: 300,  lbl: "auth boundary", val: "RBAC ok" },
  { at: 700,  lbl: "policy engine", val: "loaded" },
  { at: 1100, lbl: "runtime · KV admission", val: "nominal" },
  { at: 1500, lbl: "observability · OTLP", val: "streaming" },
  { at: 1900, lbl: "audit trail", val: "sealed" },
  { at: 2250, lbl: "promotion gate", val: "armed" },
];

let bootRAF = null, bootDone = false;

function initBoot() {
  const boot = $("#boot");
  if (!boot) return afterBoot();

  let seen = false;
  try { seen = sessionStorage.getItem("wb_intro_seen") === "1"; } catch (e) {}

  if (seen) { boot.hidden = true; return afterBoot(); }
  try { sessionStorage.setItem("wb_intro_seen", "1"); } catch (e) {}

  bootDone = false;
  boot.hidden = false;
  boot.setAttribute("aria-hidden", "false");
  document.body.classList.add("boot-lock");

  const skip = $("#boot-skip");
  const endIntro = () => finishBoot(boot);
  skip && skip.addEventListener("click", endIntro);
  const onKey = (e) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") endIntro(); };
  document.addEventListener("keydown", onKey);
  boot.addEventListener("click", (e) => {
    if (e.target === boot || e.target.classList.contains("boot-inner")) endIntro();
  });
  boot._cleanup = () => document.removeEventListener("keydown", onKey);

  const pre = $("#sentinel-eye");
  const { cols, rows } = fitEye(pre, introCols(), 0.52);

  if (REDUCED) {
    pre.textContent = renderEye(cols, rows, { open: 1, t: 0 });
    BOOT_LOG.forEach((b) => addBootLine(b));
    setTimeout(endIntro, 900);
    return;
  }

  const shown = new Set();
  let start = null;
  const D_NOISE = 1000, D_OPEN_A = 320, D_OPEN = 980,
        D_SCAN_A = 1350, D_SCAN = 1050, D_END = 2650;

  function frame(ts) {
    if (start == null) start = ts;
    const e = ts - start;

    const noise = e < D_NOISE ? 1 - e / D_NOISE : 0;
    const open  = e < D_OPEN_A ? 0.06 : Math.min(1, (e - D_OPEN_A) / D_OPEN);
    let scanY;
    if (e > D_SCAN_A && e < D_SCAN_A + D_SCAN) scanY = ((e - D_SCAN_A) / D_SCAN) * rows;
    const lookX = Math.sin(e / 620) * (cols * 0.018);

    pre.textContent = renderEye(cols, rows, {
      t: e / 1000, open: Math.max(open, 0.06), noise, scanY, lookX,
    });

    BOOT_LOG.forEach((b) => {
      if (e >= b.at && !shown.has(b.at)) { shown.add(b.at); addBootLine(b); }
    });

    if (e < D_END) bootRAF = requestAnimationFrame(frame);
    else endIntro();
  }
  bootRAF = requestAnimationFrame(frame);
}

function addBootLine(b) {
  const log = $("#boot-log");
  if (!log) return;
  const li = document.createElement("li");
  li.innerHTML = `<span class="ok">▸</span><span class="lbl">${b.lbl}</span><span class="val">${b.val}</span>`;
  log.appendChild(li);
  requestAnimationFrame(() => li.classList.add("show"));
}

function finishBoot(boot) {
  if (bootDone) return;
  bootDone = true;
  if (bootRAF) cancelAnimationFrame(bootRAF);
  boot._cleanup && boot._cleanup();
  boot.classList.add("is-leaving");
  document.body.classList.remove("boot-lock");
  const done = () => { boot.hidden = true; boot.setAttribute("aria-hidden", "true"); };
  boot.addEventListener("animationend", done, { once: true });
  setTimeout(done, 700);
  const h1 = $("#hero-title");
  if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  afterBoot();
}

let afterBootRan = false;
function afterBoot() {
  if (afterBootRan) return;
  afterBootRan = true;
  startAmbientEyes();
}

/* =============================================================
   3. AMBIENT EYES  (hero + contact)
   ============================================================= */

const ambient = [];
function startAmbientEyes() {
  const defs = [
    { el: $("#ambient-eye"), cols: 34, ratio: 0.46 },
    { el: $("#contact-eye"), cols: 30, ratio: 0.46 },
  ];
  defs.forEach((d) => {
    if (!d.el) return;
    const dim = fitEye(d.el, d.cols, d.ratio);
    const inst = Object.assign({}, d, dim, { pulseUntil: 0 });
    ambient.push(inst);
    if (REDUCED) d.el.textContent = renderEye(dim.cols, dim.rows, { open: 1 });
  });
  if (!REDUCED && ambient.length) requestAnimationFrame(ambientFrame);
}

let ambStart = null, ambLast = 0;
function ambientFrame(ts) {
  if (ambStart == null) ambStart = ts;
  const e = ts - ambStart;
  if (e - ambLast > 42) {                 // ~24fps
    ambLast = e;
    for (const a of ambient) {
      if (document.hidden) continue;
      let open = 1;
      const bt = e % 5200;                 // blink cycle
      if (bt > 4900) open = 1 - (bt - 4900) / 300;
      else if (bt < 300 && e > 5200) open = bt / 300;
      const lookX = Math.sin(e / 900 + a.cols) * (a.cols * 0.02);
      const lookY = Math.cos(e / 1400) * 0.4;
      let scanY;
      if (e < a.pulseUntil) scanY = (1 - (a.pulseUntil - e) / 900) * a.rows;
      a.el.textContent = renderEye(a.cols, a.rows, {
        t: e / 1000, open: clamp(open, 0.05, 1), lookX, lookY, scanY,
      });
    }
  }
  requestAnimationFrame(ambientFrame);
}

// "the sentinel reappears": sweep the ambient eyes when audit/evidence opens
function pulseSentinel() {
  const now = performance.now() - (ambStart || 0);
  ambient.forEach((a) => (a.pulseUntil = now + 900));
}

/* =============================================================
   4. LIVE SIGNALS + CLOCK
   ============================================================= */

function startSignals() {
  const rows = {
    ttft:   { min: 180, max: 320, unit: "ms", pct: (v) => (v - 120) / 260 },
    decode: { min: 16,  max: 42,  unit: "ms", pct: (v) => (v - 10) / 40 },
    kv:     { min: 52,  max: 78,  unit: "%",  pct: (v) => v / 100 },
    policy: { min: 986, max: 1000, pct: (v) => v / 1000, fmt: (v) => (v / 10).toFixed(1) + "%" },
    audit:  { min: 40,  max: 130, unit: "ms", pct: (v) => 1 - (v - 30) / 130 },
  };
  const tick = () => {
    for (const key in rows) {
      const cfg = rows[key];
      const li = $(`.signal-list li[data-metric="${key}"]`);
      if (!li) continue;
      const v = cfg.min + Math.random() * (cfg.max - cfg.min);
      const bar = $(".bar i", li), val = $(".v", li);
      bar.style.width = clamp(cfg.pct(v) * 100, 6, 100).toFixed(0) + "%";
      val.textContent = cfg.fmt ? cfg.fmt(v) : Math.round(v) + cfg.unit;
    }
  };
  tick();
  if (!REDUCED) setInterval(tick, 1700);
}

function startClock() {
  const el = $("#sys-clock");
  if (!el) return;
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const d = new Date();
    el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  tick();
  setInterval(tick, 1000);
}

/* =============================================================
   5. SYSTEM MAP: request path
   ============================================================= */

let packetBusy = false;
function initMap() {
  const track = $("#map-track");
  const packet = $("#packet");
  const detail = $("#node-detail");
  if (!track) return;

  const nodes = $$(".node", track);

  const setDetail = (title, body, fault) => {
    detail.classList.toggle("fault", !!fault);
    detail.innerHTML =
      `<p class="node-detail-title">${title}</p><p class="node-detail-body">${body}</p>`;
  };

  const selectNode = (el) => {
    nodes.forEach((n) => n.classList.remove("is-active"));
    el.classList.add("is-active");
    const d = MAP_NODES[el.dataset.node];
    if (d) { setDetail(d.title, d.body); announce(d.title + " stage selected"); }
  };
  nodes.forEach((n) => n.addEventListener("click", () => selectNode(n)));

  const movePacketTo = (el, fault) => {
    packet.style.opacity = "1";
    packet.classList.toggle("is-fault", !!fault);
    packet.style.left = (el.offsetLeft + el.offsetWidth / 2 - 6) + "px";
    packet.style.top = (el.offsetTop + 10) + "px";
  };

  const clearLive = () => nodes.forEach((n) => n.classList.remove("is-live", "is-fault", "is-active"));

  const run = (withFault) => {
    if (packetBusy) return;
    packetBusy = true;
    clearLive();
    let i = 0;
    const step = () => {
      if (i > 0) $(`.node[data-node="${MAP_ORDER[i - 1]}"]`)?.classList.remove("is-live");
      if (i >= MAP_ORDER.length) {
        packetBusy = false;
        setTimeout(() => (packet.style.opacity = "0"), 600);
        return;
      }
      const id = MAP_ORDER[i];
      const el = $(`.node[data-node="${id}"]`);
      const isFaultNode = withFault && id === FAULT.node;
      el.classList.add(isFaultNode ? "is-fault" : "is-live");
      movePacketTo(el, isFaultNode);
      if (isFaultNode) {
        setDetail(FAULT.title, FAULT.body, true);
        pulseSentinel();
        announce("Fault caught and rolled back at promotion gate");
        packetBusy = false;
        return;
      }
      setDetail(MAP_NODES[id].title, MAP_NODES[id].body);
      i++;
      setTimeout(step, REDUCED ? 140 : 620);
    };
    step();
  };

  $("#run-packet")?.addEventListener("click", () => run(false));
  $("#fault-packet")?.addEventListener("click", () => run(true));
  window.addEventListener("resize", () => { if (!packetBusy) packet.style.opacity = "0"; });
}

/* =============================================================
   6. ROLE / VIEW FILTERS
   ============================================================= */

function initRoles() {
  const btns = $$(".role-btn");
  const targets = () => $$("[data-roles]");

  const apply = (role) => {
    btns.forEach((b) => b.classList.toggle("is-active", b.dataset.role === role));
    const show = role === "all" || role === "recruiter";
    targets().forEach((el) => {
      el.classList.toggle("dim", !show && !el.dataset.roles.split(" ").includes(role));
    });
    if (role === "recruiter") {
      $$(".cf-dossier[open]").forEach((d) => (d.open = false));
      $("#impact")?.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
      announce("Recruiter fast-scan: outcomes and highlights first");
    } else {
      announce(role === "all" ? "Showing full spectrum" : "Filtered to " + role);
    }
  };

  btns.forEach((b) => b.addEventListener("click", () => apply(b.dataset.role)));
  window.setRole = apply;
}

/* =============================================================
   7. COMMAND PALETTE
   ============================================================= */

function buildCommands() {
  const cmds = [];
  CASE_FILES.forEach((cf) => cmds.push({
    glyph: cf.icon, name: "open " + cf.title.toLowerCase(), desc: "case file",
    keys: cf.title + " " + cf.tags.join(" "),
    run: () => openCaseFile(cf.id),
  }));
  [
    ["ai", "AI Infrastructure"], ["security", "Platform Security"],
    ["mission", "Mission Engineering"], ["recruiter", "Recruiter fast-scan"], ["all", "Full spectrum"],
  ].forEach(([r, label]) => cmds.push({
    glyph: "◱", name: "view " + label.toLowerCase(), desc: "filter", keys: "view role filter " + label,
    run: () => window.setRole && window.setRole(r),
  }));
  [
    ["request path", "#map"], ["case files", "#casefiles"], ["evidence locker", "#evidence"],
    ["service record", "#experience"], ["skills", "#skills"], ["contact", "#contact"],
  ].forEach(([label, sel]) => cmds.push({
    glyph: "→", name: "goto " + label, desc: "jump", keys: "goto go " + label,
    run: () => document.querySelector(sel)?.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" }),
  }));
  cmds.push({ glyph: "↗", name: "open github", desc: "external", keys: "github repo code",
    run: () => window.open("https://github.com/WaffleBits", "_blank", "noopener") });
  cmds.push({ glyph: "↗", name: "open linkedin", desc: "external", keys: "linkedin contact connect",
    run: () => window.open("https://www.linkedin.com/in/wafflebits/", "_blank", "noopener") });
  cmds.push({ glyph: "↺", name: "replay sentinel intro", desc: "system", keys: "replay intro boot eye",
    run: () => replayIntro() });
  return cmds;
}

function openCaseFile(id) {
  const el = document.getElementById("cf-" + id);
  if (!el) return;
  el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" });
  const det = $(".cf-dossier", el);
  if (det) det.open = true;
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 800);
}

function replayIntro() {
  try { sessionStorage.removeItem("wb_intro_seen"); } catch (e) {}
  const boot = $("#boot");
  if (!boot) return;
  const log = $("#boot-log");
  if (log) log.innerHTML = "";
  boot.classList.remove("is-leaving");
  initBoot();
}

function initPalette() {
  const overlay = $("#palette");
  const input = $("#palette-input");
  const list = $("#palette-list");
  if (!overlay) return;
  const commands = buildCommands();
  let active = 0, filtered = commands.slice();

  const render = () => {
    list.innerHTML = "";
    if (!filtered.length) { list.innerHTML = `<li class="palette-empty">No matching command</li>`; return; }
    filtered.forEach((c, i) => {
      const li = document.createElement("li");
      li.className = "palette-item" + (i === active ? " is-active" : "");
      li.setAttribute("role", "option");
      li.innerHTML = `<span class="p-glyph">${c.glyph}</span><span class="p-name">${c.name}</span><span class="p-desc">${c.desc}</span>`;
      li.addEventListener("click", () => execute(i));
      li.addEventListener("mousemove", () => { active = i; paint(); });
      list.appendChild(li);
    });
  };
  const paint = () => $$(".palette-item", list).forEach((el, i) => el.classList.toggle("is-active", i === active));
  const scrollActive = () => $$(".palette-item", list)[active]?.scrollIntoView({ block: "nearest" });

  const filter = (q) => {
    q = q.trim().toLowerCase();
    filtered = !q ? commands.slice()
      : commands.filter((c) => (c.name + " " + c.keys).toLowerCase().includes(q));
    active = 0; render();
  };

  const execute = (i) => {
    const c = filtered[i];
    if (!c) return;
    close();
    setTimeout(() => c.run(), 60);
  };

  const open = () => { overlay.hidden = false; input.value = ""; filter(""); setTimeout(() => input.focus(), 20); };
  const close = () => { overlay.hidden = true; };

  input.addEventListener("input", () => filter(input.value));
  input.addEventListener("keydown", (e) => {
    const n = Math.max(1, filtered.length);
    if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % n; paint(); scrollActive(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + n) % n; paint(); scrollActive(); }
    else if (e.key === "Enter") { e.preventDefault(); execute(active); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
  });
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); overlay.hidden ? open() : close(); }
    else if (e.key === "/" && overlay.hidden && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
  });
  $("#cmd-open")?.addEventListener("click", open);
  $$('[data-cmd="palette"]').forEach((b) => b.addEventListener("click", open));
  window.openPalette = open;
}

/* =============================================================
   8. RENDERERS
   ============================================================= */

function renderCaseFiles() {
  const grid = $("#casefile-grid");
  if (!grid) return;
  grid.innerHTML = CASE_FILES.map((cf) => `
    <article class="casefile" id="cf-${cf.id}" data-roles="${cf.roles}">
      <div class="cf-head">
        <span class="cf-icon ascii-glyph" aria-hidden="true">${cf.icon}</span>
        <span class="cf-id">${cf.id}</span>
      </div>
      <h3>${cf.title}</h3>
      <div class="cf-tags">${cf.tags.map((t) => `<span class="cf-tag">${t}</span>`).join("")}</div>
      <p class="cf-problem">${cf.problem}</p>
      <details class="cf-dossier">
        <summary>Open dossier</summary>
        <dl>
          <div class="cf-block"><dt>SYSTEM</dt><dd>${cf.system}</dd></div>
          <div class="cf-block"><dt>EVIDENCE</dt><dd>${cf.evidence}</dd></div>
          <div class="cf-block"><dt>IMPACT</dt><dd>${cf.impact}</dd></div>
        </dl>
        <div class="cf-links"><a href="${cf.url}" target="_blank" rel="noreferrer">Repository ↗</a></div>
      </details>
    </article>`).join("");
}

function renderEvidence() {
  const grid = $("#evidence-grid");
  if (!grid) return;
  grid.innerHTML = EVIDENCE.map((ev) => `
    <details class="evidence-item" data-roles="${ev.roles}">
      <summary>
        <span class="ev-glyph ascii-glyph" aria-hidden="true">${ev.glyph}</span>
        <span class="ev-title">${ev.title}</span>
        <span class="ev-count">${String(ev.items.length).padStart(2, "0")}</span>
      </summary>
      <div class="ev-body"><ul>${ev.items.map((i) => `<li>${i}</li>`).join("")}</ul></div>
    </details>`).join("");
  $$(".evidence-item").forEach((d) =>
    d.addEventListener("toggle", () => { if (d.open) pulseSentinel(); }));
}

// ASCII scan-line dividers
function initDividers() {
  const dvs = $$("[data-divider]");
  dvs.forEach((d) => {
    const build = () => {
      const n = Math.max(12, Math.floor(d.clientWidth / 8));
      d._n = n; d._base = "·".repeat(n); d.textContent = d._base;
    };
    build();
    d._pos = Math.floor(Math.random() * (d._n || 40));
    window.addEventListener("resize", build);
  });
  if (REDUCED || !dvs.length) return;
  let last = 0;
  const loop = (ts) => {
    if (ts - last > 90) {
      last = ts;
      dvs.forEach((d) => {
        if (!d._n) return;
        d._pos = (d._pos + 1) % d._n;
        const arr = d._base.split("");
        arr[d._pos] = "◄";
        if (arr[d._pos + 1] !== undefined) arr[d._pos + 1] = "►";
        d.textContent = arr.join("");
      });
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* small flash effect for command-opened case files */
const flashStyle = document.createElement("style");
flashStyle.textContent = ".casefile.flash{border-color:var(--amber)!important;box-shadow:var(--glow-amber);}";
document.head.appendChild(flashStyle);

/* =============================================================
   9. INIT
   ============================================================= */

function init() {
  renderCaseFiles();
  renderEvidence();
  initMap();
  initRoles();
  initPalette();
  initDividers();
  startSignals();
  startClock();
  initBoot();          // gates the intro; calls afterBoot() -> ambient eyes
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
