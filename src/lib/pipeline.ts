/* =============================================================
   Request pipeline // the interactive part of the System section.
   Click a gate to read it, run the trace to watch a request pass
   through, or inject a bad version and watch the last gate stop it.
   Plays itself once when first read, so a passive visitor sees it.
   ============================================================= */
import { requestPath, fault } from "../data/portfolio";
import { reduced } from "./reveal";
import { pulseSentinel } from "./sentinel";

const byId = Object.fromEntries(requestPath.map((s) => [s.id, s]));
const order = requestPath.map((s) => s.id);
const STEP = 460;

export function initPipeline() {
  const list = document.getElementById("pipe");
  const out = document.getElementById("sysout");
  const outT = document.getElementById("sysout-t");
  const outB = document.getElementById("sysout-b");
  const pkt = document.getElementById("pkt");
  if (!list || !out || !outT || !outB) return;

  const stages = Array.from(list.querySelectorAll<HTMLElement>(".stage"));
  // generation counter: a new run supersedes the one in flight, so a click
  // during the autoplay is never swallowed
  let gen = 0;

  const say = (title: string, body: string, bad = false) => {
    out.classList.toggle("bad", bad);
    outT.textContent = bad ? fault.title : title;
    outB.textContent = body;
  };

  const move = (el: HTMLElement | null, state: "" | "live" | "bad") => {
    if (!pkt) return;
    pkt.className = "pipe__pkt" + (state ? " " + state : "");
    if (!el) { pkt.style.opacity = "0"; return; }
    pkt.style.opacity = "1";
    pkt.style.transform = `translateY(${el.offsetTop + (el.offsetHeight - pkt.offsetHeight) / 2}px)`;
  };

  const clear = () => stages.forEach((s) => s.classList.remove("sel", "live", "bad"));

  const select = (el: HTMLElement) => {
    gen++;
    clear();
    el.classList.add("sel");
    move(el, "");
    const d = byId[el.dataset.stage || ""];
    if (d) say(d.name, d.body);
  };
  stages.forEach((s) => s.addEventListener("click", () => select(s)));

  const run = (withFault: boolean) => {
    const mine = ++gen;
    clear();
    let i = 0;
    const step = () => {
      if (mine !== gen) return;
      if (i > 0) stages[i - 1]?.classList.remove("live");
      if (i >= order.length) {
        stages[order.length - 1]?.classList.add("sel");
        return;
      }
      const id = order[i];
      const el = stages[i];
      const isFault = withFault && id === fault.stage;
      el.classList.add(isFault ? "bad" : "live");
      move(el, isFault ? "bad" : "live");
      if (isFault) {
        say(fault.title, fault.body, true);
        pulseSentinel();
        return;
      }
      say(byId[id].name, byId[id].body);
      i++;
      window.setTimeout(step, reduced ? 90 : STEP);
    };
    step();
  };

  document.getElementById("pipe-run")?.addEventListener("click", () => run(false));
  document.getElementById("pipe-fault")?.addEventListener("click", () => run(true));

  if (reduced || !("IntersectionObserver" in window)) { move(stages[0], ""); return; }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.disconnect();
        window.setTimeout(() => run(false), 620);
      }
    },
    { threshold: 0.4 }
  );
  io.observe(list);
}
