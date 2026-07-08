/* =============================================================
   Client entry // wires the terminal session together
   ============================================================= */
import { initBoot } from "./boot";
import { initReveal, forceRevealAll } from "./reveal";
import { initRequestPath } from "./requestPath";
import { initPalette } from "./palette";

const $ = <T extends Element>(s: string) => document.querySelector<T>(s);

/* Active section indicator in the command nav */
function initSectionNav() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".tnav a"));
  const map = new Map<string, HTMLAnchorElement>();
  links.forEach((a) => { const id = (a.getAttribute("href") || "").slice(1); if (id) map.set(id, a); });
  const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
  if (!sections.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((l) => l.classList.remove("on"));
      map.get((e.target as HTMLElement).id)?.classList.add("on");
    }
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  sections.forEach((s) => io.observe(s));
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
  initSectionNav();
  initClock();
  initBoot();
  // safety net: if any observer/animation stalled, force the buffer visible
  setTimeout(forceRevealAll, 3500);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
