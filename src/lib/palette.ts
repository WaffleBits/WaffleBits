/* =============================================================
   Command palette // keyboard-first navigation.
   Cmd-K or Ctrl-K. Jump to a section, open a repository, grab the
   email. Fuzzy-ish substring match, arrow keys, focus restored on
   close.
   ============================================================= */
import { identity, caseFiles } from "../data/portfolio";

type Cmd = { kind: string; label: string; hint?: string; run: () => void };

const goto = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};
const open = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

export function initPalette() {
  const pal = document.getElementById("pal");
  const input = document.getElementById("pal-input") as HTMLInputElement | null;
  const list = document.getElementById("pal-list");
  if (!pal || !input || !list) return;

  const resume = document.querySelector<HTMLAnchorElement>('a[href$="AdnanBerik-Resume.pdf"]')?.href || "";

  const cmds: Cmd[] = [
    { kind: "go", label: "Work", hint: "section", run: goto("work") },
    { kind: "go", label: "System", hint: "section", run: goto("system") },
    { kind: "go", label: "Experience", hint: "section", run: goto("experience") },
    { kind: "go", label: "About", hint: "section", run: goto("about") },
    { kind: "go", label: "Contact", hint: "section", run: goto("contact") },
    { kind: "open", label: "Resume (PDF)", hint: "download", run: open(resume) },
    { kind: "open", label: "GitHub profile", hint: "external", run: open(identity.links.github) },
    { kind: "open", label: "LinkedIn", hint: "external", run: open(identity.links.linkedin) },
    { kind: "mail", label: identity.links.email, hint: "compose", run: () => { location.href = `mailto:${identity.links.email}`; } },
    {
      kind: "copy", label: "Copy email address", hint: "clipboard",
      run: () => { navigator.clipboard?.writeText(identity.links.email); },
    },
    ...caseFiles.map((c) => ({ kind: "repo", label: c.title, hint: "repository", run: open(c.url) })),
  ];

  let shown: Cmd[] = cmds;
  let cur = 0;
  let opener: HTMLElement | null = null;

  const render = () => {
    list.innerHTML = "";
    if (!shown.length) {
      const li = document.createElement("li");
      li.className = "pal__none";
      li.textContent = "Nothing matches that.";
      list.appendChild(li);
      return;
    }
    shown.forEach((c, i) => {
      const li = document.createElement("li");
      li.className = "pal__item";
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(i === cur));
      li.innerHTML = `<span class="ic">${c.kind}</span><span class="lb"></span><span class="hn">${c.hint || ""}</span>`;
      li.querySelector(".lb")!.textContent = c.label;
      li.addEventListener("mouseenter", () => { cur = i; mark(); });
      li.addEventListener("click", () => fire(i));
      list.appendChild(li);
    });
  };

  const mark = () => {
    Array.from(list.children).forEach((li, i) =>
      (li as HTMLElement).setAttribute("aria-selected", String(i === cur))
    );
    (list.children[cur] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest" });
  };

  const filter = () => {
    const q = input.value.trim().toLowerCase();
    shown = q ? cmds.filter((c) => (c.kind + " " + c.label + " " + (c.hint || "")).toLowerCase().includes(q)) : cmds;
    cur = 0;
    render();
  };

  const close = () => {
    pal.hidden = true;
    document.body.style.removeProperty("overflow");
    opener?.focus();
  };

  const show = (from?: HTMLElement) => {
    opener = from || null;
    pal.hidden = false;
    document.body.style.overflow = "hidden";
    input.value = "";
    filter();
    input.focus();
  };

  const fire = (i: number) => {
    const c = shown[i];
    if (!c) return;
    close();
    c.run();
  };

  input.addEventListener("input", filter);
  pal.querySelector("[data-pal-close]")?.addEventListener("click", close);
  document.querySelectorAll("[data-open-pal]").forEach((b) =>
    b.addEventListener("click", () => show(b as HTMLElement))
  );

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); cur = Math.min(cur + 1, shown.length - 1); mark(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); cur = Math.max(cur - 1, 0); mark(); }
    else if (e.key === "Enter") { e.preventDefault(); fire(cur); }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      pal.hidden ? show(document.activeElement as HTMLElement) : close();
    } else if (e.key === "Escape" && !pal.hidden) {
      close();
    }
  });
}
