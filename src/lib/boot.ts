/* =============================================================
   Boot / intro controller  (session-gated, skippable)
   ============================================================= */
import { renderEye, fitEye } from "./eye";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = <T extends Element>(s: string) => document.querySelector<T>(s);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

let raf = 0;
let done = false;

function introCols() {
  const w = window.innerWidth;
  if (w < 600) return 46;
  if (w < 980) return 66;
  return 86;
}

export function initBoot() {
  const boot = $<HTMLElement>("#boot");
  if (!boot) return afterBoot();

  let seen = false;
  try { seen = sessionStorage.getItem("wb_boot") === "1"; } catch {}
  if (seen) { boot.hidden = true; return afterBoot(); }
  try { sessionStorage.setItem("wb_boot", "1"); } catch {}

  done = false;
  boot.hidden = false;
  boot.setAttribute("aria-hidden", "false");
  document.body.classList.add("boot-lock");

  const end = () => finishBoot(boot);
  $<HTMLElement>("#boot-skip")?.addEventListener("click", end);
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") end(); };
  document.addEventListener("keydown", onKey);
  boot.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t === boot || t.classList.contains("boot__inner")) end();
  });
  (boot as any)._cleanup = () => document.removeEventListener("keydown", onKey);

  const pre = $<HTMLElement>("#boot-eye")!;
  const { cols, rows } = fitEye(pre, introCols(), 0.52);
  const logItems = Array.from(document.querySelectorAll<HTMLElement>("#boot-log li"));

  if (reduced) {
    pre.textContent = renderEye(cols, rows, { open: 1 });
    logItems.forEach((li) => li.classList.add("show"));
    setTimeout(end, 850);
    return;
  }

  const shown = new Set<number>();
  const logAt = [300, 700, 1100, 1500, 1900, 2250];
  let start: number | null = null;
  const D_NOISE = 1000, D_OPEN_A = 320, D_OPEN = 980, D_SCAN_A = 1350, D_SCAN = 1050, D_END = 2650;

  const frame = (ts: number) => {
    if (start == null) start = ts;
    const e = ts - start;
    const noise = e < D_NOISE ? 1 - e / D_NOISE : 0;
    const open = e < D_OPEN_A ? 0.06 : Math.min(1, (e - D_OPEN_A) / D_OPEN);
    let scanY: number | undefined;
    if (e > D_SCAN_A && e < D_SCAN_A + D_SCAN) scanY = ((e - D_SCAN_A) / D_SCAN) * rows;
    const lookX = Math.sin(e / 620) * (cols * 0.018);
    pre.textContent = renderEye(cols, rows, { t: e / 1000, open: Math.max(open, 0.06), noise, scanY, lookX });
    logAt.forEach((at, i) => { if (e >= at && !shown.has(i)) { shown.add(i); logItems[i]?.classList.add("show"); } });
    if (e < D_END) raf = requestAnimationFrame(frame);
    else end();
  };
  raf = requestAnimationFrame(frame);
}

function finishBoot(boot: HTMLElement) {
  if (done) return;
  done = true;
  if (raf) cancelAnimationFrame(raf);
  (boot as any)._cleanup?.();
  boot.classList.add("leaving");
  document.body.classList.remove("boot-lock");
  const hide = () => { boot.hidden = true; boot.setAttribute("aria-hidden", "true"); };
  boot.addEventListener("animationend", hide, { once: true });
  setTimeout(hide, 700);
  const h1 = $<HTMLElement>("#hero-h1");
  if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  afterBoot();
}

let afterRan = false;
function afterBoot() {
  if (afterRan) return;
  afterRan = true;
  startAmbient();
}

/* ---- ambient eyes (hero panel + contact) ---- */
interface Amb { el: HTMLElement; cols: number; rows: number; pulseUntil: number; }
const ambient: Amb[] = [];

function startAmbient() {
  const defs = [
    { sel: "#hero-eye", cols: 30, ratio: 0.46 },
    { sel: "#contact-eye", cols: 26, ratio: 0.46 },
  ];
  for (const d of defs) {
    const el = $<HTMLElement>(d.sel);
    if (!el) continue;
    const { cols, rows } = fitEye(el, d.cols, d.ratio);
    ambient.push({ el, cols, rows, pulseUntil: 0 });
    if (reduced) el.textContent = renderEye(cols, rows, { open: 1 });
  }
  if (!reduced && ambient.length) requestAnimationFrame(ambientFrame);
}

let aStart: number | null = null, aLast = 0;
function ambientFrame(ts: number) {
  if (aStart == null) aStart = ts;
  const e = ts - aStart;
  if (e - aLast > 42) {
    aLast = e;
    for (const a of ambient) {
      if (document.hidden) continue;
      let open = 1;
      const bt = e % 5200;
      if (bt > 4900) open = 1 - (bt - 4900) / 300;
      else if (bt < 300 && e > 5200) open = bt / 300;
      const lookX = Math.sin(e / 900 + a.cols) * (a.cols * 0.02);
      const lookY = Math.cos(e / 1400) * 0.4;
      let scanY: number | undefined;
      if (e < a.pulseUntil) scanY = (1 - (a.pulseUntil - e) / 900) * a.rows;
      a.el.textContent = renderEye(a.cols, a.rows, { t: e / 1000, open: clamp(open, 0.05, 1), lookX, lookY, scanY });
    }
  }
  requestAnimationFrame(ambientFrame);
}

export function pulseSentinel() {
  const now = performance.now() - (aStart || 0);
  ambient.forEach((a) => (a.pulseUntil = now + 900));
}

export function replayIntro() {
  try { sessionStorage.removeItem("wb_boot"); } catch {}
  const boot = $<HTMLElement>("#boot");
  if (!boot) return;
  boot.classList.remove("leaving");
  Array.from(document.querySelectorAll("#boot-log li")).forEach((li) => li.classList.remove("show"));
  initBoot();
}
