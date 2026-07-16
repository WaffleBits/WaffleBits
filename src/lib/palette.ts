/* =============================================================
   Command palette // terminal navigation + role filter
   ============================================================= */
import { caseFiles, identity } from "../data/portfolio";
import { pulseSentinel, replayIntro } from "./boot";
import { reduced } from "./reveal";

const $ = <T extends Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

interface Cmd { g: string; n: string; d: string; keys: string; run: () => void; }

const scrollTo = (sel: string) =>
  document.querySelector(sel)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

function openFile(id: string) {
  const el = document.getElementById("case-" + id) as HTMLDetailsElement | null;
  if (!el) return;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  el.open = true;
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 800);
}

export function setRole(role: string) {
  $$<HTMLElement>(".rolepick .tok").forEach((b) => b.classList.toggle("on", b.dataset.role === role));
  const show = role === "all" || role === "recruiter";
  $$<HTMLElement>("[data-roles]").forEach((el) => {
    el.classList.toggle("dim", !show && !el.dataset.roles!.split(" ").includes(role));
  });
  const live = $<HTMLElement>("#live");
  if (live) live.textContent = role === "all" ? "view :: full spectrum" : "view :: " + role;
  document.body.classList.toggle("recruiter", role === "recruiter");
  if (role === "recruiter") {
    // true fast path: render everything instantly, plain headers, no ambience
    $$<HTMLElement>("[data-line]").forEach((el) => el.classList.add("is-in"));
    $$<HTMLElement>("[data-type]").forEach((el) => {
      if (el.dataset.text) el.textContent = el.dataset.text;
      el.classList.remove("typing");
      el.classList.add("done");
    });
    $$<HTMLElement>("[data-op]").forEach((op) => { op.dataset.ran = "1"; op.classList.add("live", "done"); });
    $$<HTMLElement>("[data-out]").forEach((out) => out.classList.add("is-in"));
    $$<HTMLDetailsElement>(".fentry[open]").forEach((d) => (d.open = false));
    scrollTo("#impact");
  }
}

function build(): Cmd[] {
  const cmds: Cmd[] = [];
  caseFiles.forEach((cf) =>
    cmds.push({ g: cf.id.replace("CF-", ""), n: "open " + cf.title.toLowerCase(), d: "case", keys: cf.title + " " + cf.tags.join(" "), run: () => openFile(cf.id) })
  );
  ([["ai", "ai_infra"], ["security", "platform_sec"], ["mission", "mission_eng"], ["recruiter", "recruiter"], ["all", "full"]] as const).forEach(
    ([r, label]) => cmds.push({ g: "#", n: "view " + label, d: "filter", keys: "view role " + label, run: () => setRole(r) })
  );
  ([["impact", "#impact"], ["trace", "#request"], ["cases", "#files"], ["evidence", "#evidence"], ["service", "#service"], ["capability", "#capability"], ["recognition", "#recognition"], ["contact", "#contact"]] as const).forEach(
    ([label, sel]) => cmds.push({ g: ">", n: "goto " + label, d: "jump", keys: "goto cd " + label, run: () => scrollTo(sel) })
  );
  cmds.push({ g: "^", n: "open github", d: "link", keys: "github repo", run: () => window.open(identity.links.github, "_blank", "noopener") });
  cmds.push({ g: "^", n: "open linkedin", d: "link", keys: "linkedin contact", run: () => window.open(identity.links.linkedin, "_blank", "noopener") });
  cmds.push({ g: "~", n: "replay sentinel", d: "sys", keys: "replay intro boot eye", run: () => replayIntro() });
  return cmds;
}

export function initPalette() {
  const overlay = $<HTMLElement>("#palette");
  const input = $<HTMLInputElement>("#palette-input");
  const list = $<HTMLElement>("#palette-list");
  if (!overlay || !input || !list) return;
  const cmds = build();
  let active = 0;
  let filtered = cmds.slice();

  const paint = () => $$<HTMLElement>(".palette__item", list).forEach((el, i) => el.classList.toggle("on", i === active));
  const render = () => {
    if (!filtered.length) { list.innerHTML = `<li class="palette__empty">command not found</li>`; return; }
    list.innerHTML = filtered
      .map((c, i) => `<li class="palette__item${i === active ? " on" : ""}" role="option"><span class="g">${c.g}</span><span class="n">${c.n}</span><span class="d">${c.d}</span></li>`)
      .join("");
    $$<HTMLElement>(".palette__item", list).forEach((li, i) => {
      li.addEventListener("click", () => exec(i));
      li.addEventListener("mousemove", () => { active = i; paint(); });
    });
  };
  const filter = (q: string) => {
    q = q.trim().toLowerCase();
    filtered = !q ? cmds.slice() : cmds.filter((c) => (c.n + " " + c.keys).toLowerCase().includes(q));
    active = 0;
    render();
  };
  const exec = (i: number) => { const c = filtered[i]; if (!c) return; close(); setTimeout(() => c.run(), 40); };
  const open = () => { overlay.hidden = false; input.value = ""; filter(""); setTimeout(() => input.focus(), 20); };
  const close = () => { overlay.hidden = true; };

  input.addEventListener("input", () => filter(input.value));
  input.addEventListener("keydown", (e) => {
    const n = Math.max(1, filtered.length);
    if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % n; paint(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + n) % n; paint(); }
    else if (e.key === "Enter") { e.preventDefault(); exec(active); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
  });
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); overlay.hidden ? open() : close(); }
    else if (e.key === "/" && overlay.hidden && !/input|textarea/i.test((document.activeElement as HTMLElement)?.tagName || "")) { e.preventDefault(); open(); }
  });
  $$<HTMLElement>("[data-open-palette]").forEach((b) => b.addEventListener("click", open));
  $$(".rolepick .tok").forEach((b) => b.addEventListener("click", () => setRole((b as HTMLElement).dataset.role!)));

  // single-open inspection: opening one entry closes its siblings
  ["fentry"].forEach((cls) => {
    $$<HTMLDetailsElement>("." + cls).forEach((d) =>
      d.addEventListener("toggle", () => { if (d.open) { pulseSentinel(); $$<HTMLDetailsElement>("." + cls).forEach((o) => { if (o !== d) o.open = false; }); } })
    );
  });
}
