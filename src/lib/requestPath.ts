/* =============================================================
   Request path // interactive terminal trace (vertical pipeline)
   ============================================================= */
import { requestPath, fault } from "../data/portfolio";
import { pulseSentinel } from "./boot";
import { reduced } from "./reveal";

const $ = <T extends Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const byId = Object.fromEntries(requestPath.map((s) => [s.id, s]));
const order = requestPath.map((s) => s.id);
let busy = false;

export function initRequestPath() {
  const trace = $<HTMLElement>("#trace");
  const out = $<HTMLElement>("#trace-out");
  if (!trace || !out) return;
  const lines = $$<HTMLElement>(".tl", trace);

  const setOut = (title: string, body: string, isFault = false) => {
    out.classList.toggle("fault", isFault);
    out.innerHTML = `<span class="k">${isFault ? "!!" : ">>"}</span> <span class="t">${title}</span>\n   ${body}`;
  };
  const select = (el: HTMLElement) => {
    lines.forEach((l) => l.classList.remove("on"));
    el.classList.add("on");
    const d = byId[el.dataset.stage!];
    if (d) setOut(d.name, d.body);
  };
  lines.forEach((l) => l.addEventListener("click", () => select(l)));

  const run = (withFault: boolean) => {
    if (busy) return;
    busy = true;
    lines.forEach((l) => l.classList.remove("on", "cur", "fault"));
    let i = 0;
    const step = () => {
      if (i > 0) $(`.tl[data-stage="${order[i - 1]}"]`, trace)?.classList.remove("cur");
      if (i >= order.length) { busy = false; return; }
      const id = order[i];
      const el = $<HTMLElement>(`.tl[data-stage="${id}"]`, trace)!;
      const isFaultNode = withFault && id === fault.stage;
      el.classList.add(isFaultNode ? "fault" : "cur");
      if (isFaultNode) { setOut(fault.title, fault.body, true); pulseSentinel(); busy = false; return; }
      setOut(byId[id].name, byId[id].body);
      i++;
      setTimeout(step, reduced ? 120 : 480);
    };
    step();
  };

  $<HTMLElement>("#trace-run")?.addEventListener("click", () => run(false));
  $<HTMLElement>("#trace-fault")?.addEventListener("click", () => run(true));
}
