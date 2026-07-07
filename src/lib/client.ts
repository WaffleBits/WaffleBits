/* =============================================================
   Client entry // wires the terminal together
   ============================================================= */
import { initBoot } from "./boot";
import { initReveal, typeNow } from "./reveal";
import { initRequestPath } from "./requestPath";
import { initPalette } from "./palette";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = <T extends Element>(s: string) => document.querySelector<T>(s);
const $$ = <T extends Element>(s: string) => Array.from(document.querySelectorAll<T>(s));

/* ASCII rules that fill to width, with a slow-moving scan marker */
function initDividers() {
  const dvs = $$<HTMLElement>("[data-rule]");
  const build = (d: HTMLElement) => {
    const n = Math.max(12, Math.floor(d.clientWidth / 7.2));
    (d as any)._n = n;
    (d as any)._base = "·".repeat(n);
    d.textContent = (d as any)._base;
  };
  dvs.forEach((d) => { build(d); (d as any)._pos = Math.floor(Math.random() * ((d as any)._n || 40)); });
  window.addEventListener("resize", () => dvs.forEach(build));
  if (reduced || !dvs.length) return;
  let last = 0;
  const loop = (ts: number) => {
    if (ts - last > 90) {
      last = ts;
      dvs.forEach((d) => {
        const n = (d as any)._n as number;
        if (!n) return;
        (d as any)._pos = ((d as any)._pos + 1) % n;
        const arr = ((d as any)._base as string).split("");
        const p = (d as any)._pos as number;
        arr[p] = "◄";
        if (arr[p + 1] !== undefined) arr[p + 1] = "►";
        d.textContent = arr.join("");
      });
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function initClock() {
  const el = $<HTMLElement>("#clk");
  if (!el) return;
  const pad = (n: number) => String(n).padStart(2, "0");
  const tick = () => {
    const d = new Date();
    el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  tick();
  setInterval(tick, 1000);
}

function init() {
  initReveal();
  initRequestPath();
  initPalette();
  initDividers();
  initClock();
  typeNow($<HTMLElement>("#hero-prompt"));
  initBoot(); // gates the intro, then starts ambient eyes
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
