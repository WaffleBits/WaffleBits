/* =============================================================
   Request path // interactive terminal trace (vertical pipeline)
   A packet marker travels the pipeline stage by stage. The trace
   plays itself once when the section is first read, so a visitor
   who never clicks anything still sees the layer work.
   ============================================================= */
import { requestPath, fault } from "../data/portfolio";
import { pulseSentinel } from "./boot";
import { reduced } from "./reveal";

const $ = <T extends Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const byId = Object.fromEntries(requestPath.map((s) => [s.id, s]));
const order = requestPath.map((s) => s.id);
const STEP = 480;
let busy = false;

export function initRequestPath() {
  const trace = $<HTMLElement>("#trace");
  const out = $<HTMLElement>("#trace-out");
  if (!trace || !out) return;
  const lines = $$<HTMLElement>(".tl", trace);
  const pkt = $<HTMLElement>("#trace-pkt");

  /* park the packet beside a stage row */
  const movePkt = (el: HTMLElement | null, state = "") => {
    if (!pkt) return;
    pkt.className = "pkt" + (state ? " " + state : "");
    if (!el) { pkt.style.opacity = "0"; return; }
    pkt.style.opacity = "1";
    pkt.style.transform = `translateY(${el.offsetTop + (el.offsetHeight - pkt.offsetHeight) / 2}px)`;
  };

  const setOut = (title: string, body: string, isFault = false) => {
    out.classList.toggle("fault", isFault);
    out.innerHTML = `<span class="k">${isFault ? "!!" : ">>"}</span> <span class="t">${title}</span>\n   ${body}`;
  };
  const select = (el: HTMLElement) => {
    lines.forEach((l) => l.classList.remove("on"));
    el.classList.add("on");
    movePkt(el);
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
      movePkt(el, isFaultNode ? "bad" : "live");
      if (isFaultNode) { setOut(fault.title, fault.body, true); pulseSentinel(); busy = false; return; }
      setOut(byId[id].name, byId[id].body);
      i++;
      setTimeout(step, reduced ? 120 : STEP);
    };
    step();
  };

  $<HTMLElement>("#trace-run")?.addEventListener("click", () => run(false));
  $<HTMLElement>("#trace-fault")?.addEventListener("click", () => run(true));

  if (reduced || !("IntersectionObserver" in window)) { movePkt(lines[0]); return; }

  // play the trace once, unprompted, the first time the section is read.
  // waits for the stage rows to finish printing so nothing highlights blind.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.disconnect();
        let waited = 0;
        const armed = () => {
          const printed = lines[lines.length - 1]?.classList.contains("is-in");
          if (printed || waited > 6000) setTimeout(() => run(false), 500);
          else { waited += 160; setTimeout(armed, 160); }
        };
        armed();
      }
    },
    { threshold: 0.35 }
  );
  io.observe(trace);
}
