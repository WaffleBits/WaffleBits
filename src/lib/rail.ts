/* =============================================================
   Scroll rail // a fixed ASCII gauge down the left edge.
   Fills as the transcript is read, names the section currently
   under the cursor line, and gives the page a continuous
   scroll-linked motion instead of one-shot reveals.
   Desktop only. Hidden under reduced-motion and on narrow screens.
   ============================================================= */
import { reduced } from "./reveal";

const ROWS = 34;
const SECTIONS: Array<[string, string]> = [
  ["impact", "impact"],
  ["request", "trace"],
  ["files", "projects"],
  ["evidence", "proof"],
  ["service", "experience"],
  ["capability", "skills"],
  ["recognition", "awards"],
  ["contact", "contact"],
];

export function initRail() {
  const rail = document.getElementById("rail");
  if (!rail) return;
  const gauge = rail.querySelector<HTMLElement>(".rail__gauge");
  const label = rail.querySelector<HTMLElement>(".rail__label");
  const pct = rail.querySelector<HTMLElement>(".rail__pct");
  if (!gauge || !label || !pct) return;

  const nodes = SECTIONS
    .map(([id, name]) => {
      const el = document.getElementById(id);
      return el ? { el, name } : null;
    })
    .filter(Boolean) as Array<{ el: HTMLElement; name: string }>;

  let queued = false;
  let shownLabel = "";

  const paint = () => {
    queued = false;
    const doc = document.documentElement;
    const span = doc.scrollHeight - window.innerHeight;
    const p = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
    const head = Math.round(p * (ROWS - 1));

    let s = "";
    for (let i = 0; i < ROWS; i++) {
      s += (i === head ? "▶" : i < head ? "█" : "·") + "\n";
    }
    gauge.textContent = s;
    pct.textContent = String(Math.round(p * 100)).padStart(2, "0");

    // whichever section has crossed the reading line most recently
    const line = window.scrollY + window.innerHeight * 0.35;
    let name = "identity";
    for (const n of nodes) if (n.el.offsetTop <= line) name = n.name;
    if (name !== shownLabel) {
      shownLabel = name;
      label.textContent = name;
    }
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(paint);
  };

  paint();
  if (reduced) return;
  rail.classList.add("on");
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}
