/* =============================================================
   Hero sentinel // in-flow ASCII eye + boot sequence.
   The eye is the first frame of the buffer; the session types in
   beneath it. Continuous and scrollable (no blocking overlay),
   skipped by scrolling. Reduced-motion renders a static eye.
   ============================================================= */
import { renderEye, fitEye } from "./eye";
import { typeEl, staggerIn, reduced } from "./reveal";

const $ = <T extends Element>(s: string) => document.querySelector<T>(s);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

let raf = 0;
let aStart: number | null = null;
let aLast = 0;

const HERO_COLS = 48;
const HERO_RATIO = 0.5;

function playResolve(pre: HTMLElement, cols: number, rows: number) {
  let start: number | null = null;
  const D_NOISE = 700, D_OPEN_A = 220, D_OPEN = 640, D_SCAN_A = 900, D_SCAN = 640, D_END = 1720;
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
    else pre.textContent = renderEye(cols, rows, { open: 1 });
  };
  raf = requestAnimationFrame(frame);
}

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
    { sel: "#contact-eye", cols: 22, ratio: 0.46 },
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

function revealHero() {
  const hero = $<HTMLElement>("[data-hero]");
  if (!hero) return;
  hero.classList.add("live");
  staggerIn($<HTMLElement>("#boot-log"), 90, () => {
    typeEl($<HTMLElement>("[data-hero] [data-type]"), () =>
      staggerIn($<HTMLElement>("#hero-identity"), 34, () => hero.classList.add("done"))
    );
  });
}

export function initBoot() {
  const pre = $<HTMLElement>("#hero-eye");
  if (pre) {
    const { cols, rows } = fitEye(pre, HERO_COLS, HERO_RATIO);
    let seen = false;
    try { seen = sessionStorage.getItem("wb_eye") === "1"; } catch {}
    if (reduced || seen) pre.textContent = renderEye(cols, rows, { open: 1 });
    else { try { sessionStorage.setItem("wb_eye", "1"); } catch {} playResolve(pre, cols, rows); }
  }
  startAmbient();
  setTimeout(revealHero, reduced ? 100 : 340);
}

export function replayIntro() {
  const pre = $<HTMLElement>("#hero-eye");
  if (!pre || reduced) return;
  try { sessionStorage.removeItem("wb_eye"); } catch {}
  const { cols, rows } = fitEye(pre, HERO_COLS, HERO_RATIO);
  if (raf) cancelAnimationFrame(raf);
  playResolve(pre, cols, rows);
}
