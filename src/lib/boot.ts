/* =============================================================
   Hero sentinel // in-flow ASCII eye + boot sequence.
   No overlay. The eye is the first screen of the buffer; the
   session types in beneath it. Continuous, scrollable, skippable
   by simply scrolling. Reduced-motion renders a static eye.
   ============================================================= */
import { renderEye, fitEye } from "./eye";
import { typeEl, staggerIn } from "./reveal";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = <T extends Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

let raf = 0;
let aStart: number | null = null;
let aLast = 0;

/* hero sentinel eye geometry — resolve + ambient must match to avoid a jump */
const HERO_COLS = 50;
const HERO_RATIO = 0.5;

/* ---- resolve-from-noise animation (plays once per session) ---- */
function playResolve(pre: HTMLElement, cols: number, rows: number, done: () => void) {
  let start: number | null = null;
  const D_NOISE = 700, D_OPEN_A = 220, D_OPEN = 620, D_SCAN_A = 880, D_SCAN = 620, D_END = 1700;
  const frame = (ts: number) => {
    if (start == null) start = ts;
    const e = ts - start;
    const noise = e < D_NOISE ? 1 - e / D_NOISE : 0;
    const open = e < D_OPEN_A ? 0.06 : Math.min(1, (e - D_OPEN_A) / D_OPEN);
    let scanY: number | undefined;
    if (e > D_SCAN_A && e < D_SCAN_A + D_SCAN) scanY = ((e - D_SCAN_A) / D_SCAN) * rows;
    const lookX = Math.sin(e / 620) * (cols * 0.018);
    pre.textContent = renderEye(cols, rows, { t: e / 1000, open: Math.max(open, 0.06), noise, scanY, lookX });
    if (e < D_END) raf = requestAnimationFrame(frame);
    else { pre.textContent = renderEye(cols, rows, { open: 1 }); done(); }
  };
  raf = requestAnimationFrame(frame);
}

/* ---- ambient blink/look loop (subtle, paused when tab hidden) ---- */
interface Amb { el: HTMLElement; cols: number; rows: number; pulseUntil: number; }
const ambient: Amb[] = [];

function ambientFrame(ts: number) {
  if (aStart == null) aStart = ts;
  const e = ts - aStart;
  if (e - aLast > 46) {
    aLast = e;
    for (const a of ambient) {
      if (document.hidden) continue;
      let open = 1;
      const bt = e % 5400;
      if (bt > 5100) open = 1 - (bt - 5100) / 300;
      else if (bt < 300 && e > 5400) open = bt / 300;
      const lookX = Math.sin(e / 900 + a.cols) * (a.cols * 0.02);
      const lookY = Math.cos(e / 1400) * 0.4;
      let scanY: number | undefined;
      if (e < a.pulseUntil) scanY = (1 - (a.pulseUntil - e) / 900) * a.rows;
      a.el.textContent = renderEye(a.cols, a.rows, { t: e / 1000, open: clamp(open, 0.05, 1), lookX, lookY, scanY });
    }
  }
  requestAnimationFrame(ambientFrame);
}

function startAmbient() {
  const defs = [
    { sel: "#hero-eye", cols: HERO_COLS, ratio: HERO_RATIO },
    { sel: "#contact-eye", cols: 24, ratio: 0.46 },
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

export function pulseSentinel() {
  const now = performance.now() - (aStart || 0);
  ambient.forEach((a) => (a.pulseUntil = now + 900));
}

/* ---- reveal the hero session: boot log -> command -> identity ---- */
function revealHero() {
  const hero = $<HTMLElement>("[data-hero]");
  if (!hero) return;
  hero.classList.add("active");
  hero.dataset.done = "1";
  const bootLog = $<HTMLElement>("#boot-log");
  staggerIn(bootLog, 95, () => {
    const cmd = $<HTMLElement>("[data-hero] [data-type]");
    typeEl(cmd, () => staggerIn($<HTMLElement>("#hero-identity"), 32));
  });
}

export function initBoot() {
  const pre = $<HTMLElement>("#hero-eye");
  if (pre) {
    const { cols, rows } = fitEye(pre, HERO_COLS, HERO_RATIO);
    let seen = false;
    try { seen = sessionStorage.getItem("wb_eye") === "1"; } catch {}
    if (reduced || seen) {
      pre.textContent = renderEye(cols, rows, { open: 1 });
    } else {
      try { sessionStorage.setItem("wb_eye", "1"); } catch {}
      playResolve(pre, cols, rows, () => {});
    }
  }
  startAmbient();
  // reveal the typed session shortly after, alongside the eye.
  setTimeout(revealHero, reduced ? 120 : 320);
}

export function replayIntro() {
  const pre = $<HTMLElement>("#hero-eye");
  if (!pre || reduced) return;
  try { sessionStorage.removeItem("wb_eye"); } catch {}
  const { cols, rows } = fitEye(pre, HERO_COLS, HERO_RATIO);
  if (raf) cancelAnimationFrame(raf);
  playResolve(pre, cols, rows, () => {});
}
