/* =============================================================
   Request path // interactive terminal trace
   ============================================================= */
import { requestPath, fault } from "../data/portfolio";
import { pulseSentinel } from "./boot";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = <T extends Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const byId = Object.fromEntries(requestPath.map((s) => [s.id, s]));
const order = requestPath.map((s) => s.id);
let busy = false;

export function initRequestPath() {
  const track = $<HTMLElement>("#pipe-stages");
  const packet = $<HTMLElement>("#packet");
  const out = $<HTMLElement>("#pipe-out");
  if (!track || !packet || !out) return;
  const stages = $$<HTMLElement>(".stage", track);

  const setOut = (title: string, body: string, isFault = false) => {
    out.classList.toggle("fault", isFault);
    out.innerHTML = `<p class="lbl">${title}</p><p class="txt">${body}</p>`;
  };

  const select = (el: HTMLElement) => {
    stages.forEach((s) => s.classList.remove("on"));
    el.classList.add("on");
    const d = byId[el.dataset.stage!];
    if (d) setOut(d.name, d.body);
  };
  stages.forEach((s) => s.addEventListener("click", () => select(s)));

  const move = (el: HTMLElement, isFault: boolean) => {
    packet.style.opacity = "1";
    packet.classList.toggle("fault", isFault);
    packet.style.left = el.offsetLeft + el.offsetWidth / 2 - 5 + "px";
    packet.style.top = el.offsetTop + 10 + "px";
  };
  const clear = () => stages.forEach((s) => s.classList.remove("on", "live", "fault"));

  const run = (withFault: boolean) => {
    if (busy) return;
    busy = true;
    clear();
    let i = 0;
    const step = () => {
      if (i > 0) $(`.stage[data-stage="${order[i - 1]}"]`, track)?.classList.remove("live");
      if (i >= order.length) { busy = false; setTimeout(() => (packet.style.opacity = "0"), 600); return; }
      const id = order[i];
      const el = $<HTMLElement>(`.stage[data-stage="${id}"]`, track)!;
      const isFaultNode = withFault && id === fault.stage;
      el.classList.add(isFaultNode ? "fault" : "live");
      move(el, isFaultNode);
      if (isFaultNode) {
        setOut(fault.title, fault.body, true);
        pulseSentinel();
        busy = false;
        return;
      }
      setOut(byId[id].name, byId[id].body);
      i++;
      setTimeout(step, reduced ? 130 : 620);
    };
    step();
  };

  $<HTMLElement>("#run-trace")?.addEventListener("click", () => run(false));
  $<HTMLElement>("#fault-trace")?.addEventListener("click", () => run(true));
  window.addEventListener("resize", () => { if (!busy) packet.style.opacity = "0"; });
}
