/* =============================================================
   Client entry // boots the terminal session
   ============================================================= */
import { initBoot } from "./boot";
import { initReveal, reduced } from "./reveal";
import { initRequestPath } from "./requestPath";
import { initPalette, setRole } from "./palette";

const $ = <T extends Element>(s: string) => document.querySelector<T>(s);
const $$ = <T extends Element>(s: string) => Array.from(document.querySelectorAll<T>(s));

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

/* status-bar activity spinner */
function initSpinner() {
  const el = $<HTMLElement>("#spin");
  if (!el || reduced) return;
  const F = ["|", "/", "-", "\\"];
  let i = 0;
  setInterval(() => { el.textContent = F[i++ % F.length]; }, 130);
}

/* animated ASCII separators printed between command blocks */
function initRules() {
  const ops = $$<HTMLElement>("[data-op]");
  const rules: HTMLElement[] = [];
  ops.forEach((op, i) => {
    if (i === 0) return;
    const r = document.createElement("div");
    r.className = "rule";
    r.setAttribute("aria-hidden", "true");
    op.parentNode?.insertBefore(r, op);
    rules.push(r);
  });
  if (!rules.length) return;

  const build = (r: HTMLElement) => {
    const n = Math.max(16, Math.floor(r.clientWidth / 7.3));
    (r as any)._n = n;
    (r as any)._base = "·".repeat(n);
    r.textContent = (r as any)._base;
  };
  rules.forEach((r) => { build(r); (r as any)._pos = Math.floor(Math.random() * 40); });
  window.addEventListener("resize", () => rules.forEach(build));
  if (reduced) return;

  let last = 0;
  const loop = (ts: number) => {
    requestAnimationFrame(loop);
    if (document.hidden || ts - last < 95) return;
    last = ts;
    for (const r of rules) {
      const n = (r as any)._n as number;
      if (!n) continue;
      (r as any)._pos = ((r as any)._pos + 1) % n;
      const arr = ((r as any)._base as string).split("");
      const p = (r as any)._pos as number;
      arr[p] = "═";
      if (arr[p + 1] !== undefined) arr[p + 1] = "▸";
      r.textContent = arr.join("");
    }
  };
  requestAnimationFrame(loop);
}

function init() {
  // recruiter fast path via URL: skip the loader entirely, render instantly
  const wantsRecruiter =
    location.hash === "#recruiter" || new URLSearchParams(location.search).get("view") === "recruiter";
  if (wantsRecruiter) {
    try { sessionStorage.setItem("wb_eye", "1"); } catch {}
  }

  initReveal();
  initRequestPath();
  initPalette();
  initRules();
  initClock();
  initSpinner();
  initBoot();

  if (wantsRecruiter) setRole("recruiter");
  document.getElementById("boot-recruiter")?.addEventListener("click", () => setRole("recruiter"));
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
