/* =============================================================
   Client entry // boots the terminal session
   ============================================================= */
import { initBoot } from "./boot";
import { initReveal } from "./reveal";
import { initRequestPath } from "./requestPath";
import { initPalette } from "./palette";

const $ = <T extends Element>(s: string) => document.querySelector<T>(s);

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
  initClock();
  initBoot();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
