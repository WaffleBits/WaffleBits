/* =============================================================
   Hero instrument // synthetic audit ledger.
   Draws the record shape the gateway writes for every model call:
   who asked, which model, what the policy decided, what it cost.
   The data is generated, and the frame says so.
   ============================================================= */
import { reduced } from "./reveal";

const WHO = [
  "svc:rag-index", "usr:a.berik", "svc:batch-eval", "svc:report-gen",
  "svc:analytics", "usr:contractor", "svc:redteam", "svc:ingest",
];
const MODEL = ["llama-70b", "qwen-32b", "mistral-7b", "embed-v3"];

type Verdict = "ALLOW" | "DENY" | "LIMIT" | "ROLLBACK";

const pick = <T,>(a: T[]) => a[(Math.random() * a.length) | 0];
const pad = (n: number, w = 2) => String(n).padStart(w, "0");

function verdict(i: number): Verdict {
  if (i > 0 && i % 23 === 0) return "ROLLBACK";
  const r = Math.random();
  if (r < 0.08) return "DENY";
  if (r < 0.15) return "LIMIT";
  return "ALLOW";
}

export function initLedger() {
  const host = document.getElementById("lg-rows");
  const counter = document.getElementById("lg-count");
  if (!host) return;

  // synthetic clock, so nothing here can be mistaken for live traffic
  let t = 14 * 3600 + 2 * 60 + 11;
  let n = 0;

  const emit = () => {
    t += 1 + ((Math.random() * 3) | 0);
    n++;
    const v = verdict(n);
    const who = v === "ROLLBACK" ? "gate:promote" : pick(WHO);
    const model = pick(MODEL);
    const tk = v === "DENY" ? 0 : 40 + ((Math.random() * 1800) | 0);
    const ms = v === "DENY" ? 2 + ((Math.random() * 5) | 0) : 60 + ((Math.random() * 900) | 0);

    const row = document.createElement("div");
    row.className = "lrow";
    row.dataset.v = v;
    row.innerHTML =
      `<span class="ts">${pad(Math.floor(t / 3600) % 24)}:${pad(Math.floor(t / 60) % 60)}:${pad(t % 60)}</span>` +
      `<span class="who">${who} → ${v === "ROLLBACK" ? "v2.4.1 blocked" : model}</span>` +
      `<span class="vd">${v}</span>` +
      `<span class="cost">${tk ? tk + "t" : "0t"} · ${ms}ms</span>`;

    host.prepend(row);
    while (host.childElementCount > 14) host.lastElementChild?.remove();
    if (counter) counter.textContent = `${n.toLocaleString("en-US")} records`;
  };

  for (let i = 0; i < 9; i++) emit();
  if (reduced) return;

  let timer = 0;
  let visible = true;

  const tick = () => {
    if (visible && !document.hidden) emit();
    timer = window.setTimeout(tick, 620 + Math.random() * 520);
  };
  timer = window.setTimeout(tick, 700);

  // stop paying for rows nobody is looking at
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0 }
    ).observe(host);
  }
  window.addEventListener("pagehide", () => clearTimeout(timer));
}
