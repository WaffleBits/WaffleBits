/* =============================================================
   Command palette // terminal navigation
   ============================================================= */
import { caseFiles, identity } from "../data/portfolio";
import { pulseSentinel, replayIntro } from "./boot";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = <T extends Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

interface Cmd { g: string; n: string; d: string; keys: string; run: () => void; }

const scrollTo = (sel: string) =>
  document.querySelector(sel)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

function openFile(id: string) {
  const el = document.getElementById("file-" + id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  const det = el.querySelector<HTMLDetailsElement>("details");
  if (det) det.open = true;
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 800);
}

export function setRole(role: string) {
  $$<HTMLElement>(".view").forEach((b) => b.classList.toggle("on", b.dataset.role === role));
  const show = role === "all" || role === "recruiter";
  $$<HTMLElement>("[data-roles]").forEach((el) => {
    el.classList.toggle("dim", !show && !el.dataset.roles!.split(" ").includes(role));
  });
  const live = $<HTMLElement>("#live");
  if (live) live.textContent = role === "all" ? "view :: full spectrum" : "view :: " + role;
  if (role === "recruiter") {
    $$<HTMLDetailsElement>(".file details[open]").forEach((d) => (d.open = false));
    scrollTo("#impact");
  }
}

function build(): Cmd[] {
  const cmds: Cmd[] = [];
  caseFiles.forEach((cf) =>
    cmds.push({ g: cf.id.replace("CF-", ""), n: "open " + cf.title.toLowerCase(), d: "case file", keys: cf.title + " " + cf.tags.join(" "), run: () => openFile(cf.id) })
  );
  ([["ai", "ai infrastructure"], ["security", "platform security"], ["mission", "mission engineering"], ["recruiter", "recruiter fast-scan"], ["all", "full spectrum"]] as const).forEach(
    ([r, label]) => cmds.push({ g: "◱", n: "view " + label, d: "filter", keys: "view role " + label, run: () => setRole(r) })
  );
  ([["request path", "#request"], ["case files", "#files"], ["evidence", "#evidence"], ["service record", "#service"], ["capability", "#capability"], ["contact", "#contact"]] as const).forEach(
    ([label, sel]) => cmds.push({ g: "→", n: "goto " + label, d: "jump", keys: "goto " + label, run: () => scrollTo(sel) })
  );
  cmds.push({ g: "↗", n: "open github", d: "external", keys: "github repo", run: () => window.open(identity.links.github, "_blank", "noopener") });
  cmds.push({ g: "↗", n: "open linkedin", d: "external", keys: "linkedin contact", run: () => window.open(identity.links.linkedin, "_blank", "noopener") });
  cmds.push({ g: "↺", n: "replay sentinel intro", d: "system", keys: "replay intro boot eye", run: () => replayIntro() });
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
  const scrollActive = () => $$<HTMLElement>(".palette__item", list)[active]?.scrollIntoView({ block: "nearest" });

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
  const exec = (i: number) => { const c = filtered[i]; if (!c) return; close(); setTimeout(() => c.run(), 50); };
  const open = () => { overlay.hidden = false; input.value = ""; filter(""); setTimeout(() => input.focus(), 20); };
  const close = () => { overlay.hidden = true; };

  input.addEventListener("input", () => filter(input.value));
  input.addEventListener("keydown", (e) => {
    const n = Math.max(1, filtered.length);
    if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % n; paint(); scrollActive(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + n) % n; paint(); scrollActive(); }
    else if (e.key === "Enter") { e.preventDefault(); exec(active); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
  });
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); overlay.hidden ? open() : close(); }
    else if (e.key === "/" && overlay.hidden && !/input|textarea/i.test((document.activeElement as HTMLElement)?.tagName || "")) { e.preventDefault(); open(); }
  });
  $$<HTMLElement>("[data-open-palette]").forEach((b) => b.addEventListener("click", open));

  // role buttons
  $$<HTMLElement>(".view").forEach((b) => b.addEventListener("click", () => setRole(b.dataset.role!)));

  // sentinel reappears when an evidence item opens
  $$<HTMLDetailsElement>(".ev").forEach((d) => d.addEventListener("toggle", () => { if (d.open) pulseSentinel(); }));
}
