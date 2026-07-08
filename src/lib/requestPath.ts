/* =============================================================
   Request path // interactive terminal trace (tree selection)
   ============================================================= */
import { requestPath, fault } from "../data/portfolio";
import { pulseSentinel } from "./boot";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = <T extends Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const byId = Object.fromEntries(requestPath.map((s) => [s.id, s]));
const order = requestPath.map((s) => s.id);
let busy = false;

export function initRequestPath() {
  const track = $<HTMLElement>("#pipe-stages");
  const out = $<HTMLElement>("#pipe-out");
  if (!track || !out) return;
  const lines = Array.from(track.querySelectorAll<HTMLElement>(".tline"));

  const render = (title: string, body: string, isFault = false) => {
    out.classList.toggle("is-fault", isFault);
    const lblCls = isFault ? "tout__lbl" : "tout__lbl";
    const lblInner = isFault ? `<span class="w">${title}</span>` : title;
    out.innerHTML = `<p class="${lblCls}">${lblInner}</p><p class="tout__txt">${body}</p>`;
  };

  const select = (el: HTMLElement) => {
    lines.forEach((l) => l.classList.remove("on"));
    el.classList.add("on");
    const d = byId[el.dataset.stage!];
    if (d) render(`# stage ${d.seq} :: ${d.id}`, d.body);
  };
  lines.forEach((l) => l.addEventListener("click", () => select(l)));

  const clear = () => lines.forEach((l) => l.classList.remove("on", "live", "fault"));

  const run = (withFault: boolean) => {
    if (busy) return;
    busy = true;
    clear();
    let i = 0;
    const step = () => {
      if (i > 0) {
        const prev = track.querySelector<HTMLElement>(`.tline[data-stage="${order[i - 1]}"]`);
        prev?.classList.remove("live");
      }
      if (i >= order.length) { busy = false; return; }
      const id = order[i];
      const el = track.querySelector<HTMLElement>(`.tline[data-stage="${id}"]`)!;
      const isFaultNode = withFault && id === fault.stage;
      el.classList.add(isFaultNode ? "fault" : "live");
      if (isFaultNode) {
        render(fault.title, fault.body, true);
        pulseSentinel();
        busy = false;
        return;
      }
      const d = byId[id];
      render(`# stage ${d.seq} :: ${d.id}`, d.body);
      i++;
      setTimeout(step, reduced ? 120 : 560);
    };
    step();
  };

  $("#run-trace")?.addEventListener("click", () => run(false));
  $("#fault-trace")?.addEventListener("click", () => run(true));
}
