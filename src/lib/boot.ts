/* =============================================================
   Sentinel loader // a short ASCII loading screen.
   The eye resolves from noise while an ASCII bar fills, then the
   system idles and prompts the visitor to scroll. Scrolling (or any
   key / click) dismisses it, wakes the transcript, and fades the
   ambient matrix field in behind it.
   ============================================================= */
import { renderEye, fitEye } from "./eye";
import { typeEl, staggerIn, reduced } from "./reveal";
import { startMatrix } from "./matrix";

const $ = <T extends Element>(s: string) => document.querySelector<T>(s);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const LOADER = [
  { at: 240, t: "mount /sentinel" },
  { at: 640, t: "verify signatures" },
  { at: 1040, t: "link observability" },
  { at: 1440, t: "arm promotion gate" },
];

const BAR_W = 26;
const D_END = 1900;

let raf = 0;
let dismissed = false;
let aStart: number | null = null;
let aLast = 0;

const LOAD_COLS = 46;
const LOAD_RATIO = 0.5;
const HERO_COLS = 44;
const HERO_RATIO = 0.5;

function bar(p: number) {
  const f = Math.round(p * BAR_W);
  return "[" + "█".repeat(f) + "░".repeat(BAR_W - f) + "] " + String(Math.round(p * 100)).padStart(3) + "%";
}

/* ---------- ambient eyes (hero + contact) ---------- */
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

/* ---------- wake the transcript ---------- */
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

let woke = false;
function wake() {
  if (woke) return;
  woke = true;
  revealHero();
  startAmbient();
  startMatrix();
}

/* ---------- loader ---------- */
function dismiss(boot: HTMLElement) {
  if (dismissed) return;
  dismissed = true;
  if (raf) cancelAnimationFrame(raf);
  document.body.classList.remove("boot-lock");
  boot.classList.add("leaving");
  const hide = () => { boot.hidden = true; boot.setAttribute("aria-hidden", "true"); };
  boot.addEventListener("animationend", hide, { once: true });
  setTimeout(hide, 800);
  (boot as any)._off?.();
  wake();
}

export function initBoot() {
  const boot = $<HTMLElement>("#boot");
  if (!boot) { wake(); return; }

  let seen = false;
  try { seen = sessionStorage.getItem("wb_eye") === "1"; } catch {}

  if (reduced || seen) {
    boot.hidden = true;
    wake();
    return;
  }
  try { sessionStorage.setItem("wb_eye", "1"); } catch {}

  boot.hidden = false;
  boot.setAttribute("aria-hidden", "false");
  document.body.classList.add("boot-lock");

  const pre = $<HTMLElement>("#boot-eye")!;
  const barEl = $<HTMLElement>("#boot-bar")!;
  const cue = $<HTMLElement>("#boot-cue")!;
  const logEl = $<HTMLElement>("#boot-loadlog")!;
  const { cols, rows } = fitEye(pre, LOAD_COLS, LOAD_RATIO);

  // any intent to move on dismisses the loader
  const go = () => dismiss(boot);
  const onKey = (e: KeyboardEvent) => {
    if (["Escape", "Enter", " ", "ArrowDown", "PageDown", "End"].includes(e.key)) { e.preventDefault(); go(); }
  };
  const opts: AddEventListenerOptions = { passive: true };
  try { history.scrollRestoration = "manual"; } catch {}
  window.scrollTo(0, 0);
  window.addEventListener("wheel", go, opts);
  window.addEventListener("touchmove", go, opts);
  document.addEventListener("keydown", onKey);
  boot.addEventListener("click", go);
  (boot as any)._off = () => {
    window.removeEventListener("wheel", go);
    window.removeEventListener("touchmove", go);
    window.removeEventListener("scroll", go);
    document.removeEventListener("keydown", onKey);
  };

  const shown = new Set<number>();
  let start: number | null = null;
  const D_NOISE = 760, D_OPEN_A = 200, D_OPEN = 700, D_SCAN_A = 980, D_SCAN = 620;

  const frame = (ts: number) => {
    if (start == null) start = ts;
    const e = ts - start;
    const noise = e < D_NOISE ? 1 - e / D_NOISE : 0;
    const open = e < D_OPEN_A ? 0.06 : Math.min(1, (e - D_OPEN_A) / D_OPEN);
    let scanY: number | undefined;
    if (e > D_SCAN_A && e < D_SCAN_A + D_SCAN) scanY = ((e - D_SCAN_A) / D_SCAN) * rows;
    const lookX = Math.sin(e / 620) * (cols * 0.018);
    pre.textContent = renderEye(cols, rows, { t: e / 1000, open: Math.max(open, 0.06), noise, scanY, lookX });

    const p = clamp(e / (D_END - 120), 0, 1);
    barEl.textContent = bar(p);

    LOADER.forEach((l, i) => {
      if (e >= l.at && !shown.has(i)) {
        shown.add(i);
        const li = document.createElement("li");
        li.innerHTML = `<span class="ok">▸</span> ${l.t} <span class="fl">::</span> <span class="ok">ok</span>`;
        logEl.appendChild(li);
        requestAnimationFrame(() => li.classList.add("show"));
      }
    });

    if (e < D_END) { raf = requestAnimationFrame(frame); return; }

    // ready: hold the open eye and invite the visitor in
    pre.textContent = renderEye(cols, rows, { open: 1 });
    barEl.textContent = bar(1);
    boot.classList.add("ready");
    cue.classList.add("on");
    document.body.classList.remove("boot-lock");
    // only now does an actual page scroll mean "enter"
    window.addEventListener("scroll", go, { passive: true });
  };
  raf = requestAnimationFrame(frame);
}

export function replayIntro() {
  try { sessionStorage.removeItem("wb_eye"); } catch {}
  const boot = $<HTMLElement>("#boot");
  if (!boot || reduced) return;
  const logEl = $<HTMLElement>("#boot-loadlog");
  if (logEl) logEl.innerHTML = "";
  $<HTMLElement>("#boot-cue")?.classList.remove("on");
  boot.classList.remove("leaving", "ready");
  boot.hidden = false;
  dismissed = false;
  initBoot();
}
