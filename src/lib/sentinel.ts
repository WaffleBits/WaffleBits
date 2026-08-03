/* =============================================================
   Sentinel // the one piece of ASCII left on the page.
   It sits in the contact block as a signature mark, tracks the
   pointer, blinks on its own, and flashes when the promotion gate
   catches a bad version. Only runs while it is on screen.
   ============================================================= */
import { renderEye, fitEye } from "./eye";
import { reduced } from "./reveal";

const COLS = 34;
const RATIO = 0.46;

let el: HTMLElement | null = null;
let cols = COLS, rows = 16;
let start: number | null = null;
let last = 0;
let onScreen = false;
let pulseUntil = 0;
let lx = 0, ly = 0;
let px = -1, py = -1, pAge = 1e6;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function frame(ts: number) {
  requestAnimationFrame(frame);
  if (!el || !onScreen || document.hidden) return;
  if (start == null) start = ts;
  const e = ts - start;
  if (e - last < 52) return;
  const dt = e - last;
  last = e;
  pAge += dt;

  let open = 1;
  const bt = e % 5200;
  if (bt > 4940) open = 1 - (bt - 4940) / 260;
  else if (bt < 260 && e > 5200) open = bt / 260;

  let tx = Math.sin(e / 1100) * (cols * 0.02);
  let ty = Math.cos(e / 1600) * 0.35;
  if (px >= 0 && pAge < 2400) {
    const r = el.getBoundingClientRect();
    if (r.width > 0) {
      tx = clamp((px - (r.left + r.width / 2)) / (r.width * 0.9), -1, 1) * cols * 0.07;
      ty = clamp((py - (r.top + r.height / 2)) / (r.height * 1.7), -1, 1) * 1.4;
    }
  }
  lx += (tx - lx) * 0.15;
  ly += (ty - ly) * 0.15;

  let scanY: number | undefined;
  if (e < pulseUntil) scanY = (1 - (pulseUntil - e) / 820) * rows;

  el.textContent = renderEye(cols, rows, { t: e / 1000, open: clamp(open, 0.05, 1), lookX: lx, lookY: ly, scanY });
}

export function pulseSentinel() {
  if (start == null) return;
  pulseUntil = performance.now() - start + 820;
}

export function initSentinel() {
  el = document.getElementById("eye");
  if (!el) return;
  const fit = fitEye(el, COLS, RATIO);
  cols = fit.cols;
  rows = fit.rows;
  el.textContent = renderEye(cols, rows, { open: 1 });
  if (reduced) return;

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { threshold: 0 }).observe(el);
  } else {
    onScreen = true;
  }
  window.addEventListener("pointermove", (ev) => { px = ev.clientX; py = ev.clientY; pAge = 0; }, { passive: true });
  requestAnimationFrame(frame);
}
