/* =============================================================
   Reveal engine // terminal-native animation primitives.
   Everything renders as if a system is printing it: commands
   type in, output decodes from glyph-noise line by line.
   No-JS safe (content present); reduced-motion shows instantly.
   ============================================================= */

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFxo:.";
export const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* matrix-resolve an element's text from glyph noise */
export function scramble(el: HTMLElement, dur = 0): Promise<void> {
  const target = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = target;
  const d = dur || Math.min(700, 180 + target.length * 16);
  return new Promise((resolve) => {
    let start: number | null = null;
    const frame = (now: number) => {
      if (start == null) start = now;
      const p = Math.min(1, (now - start) / d);
      const cut = Math.floor(p * target.length);
      let s = "";
      for (let i = 0; i < target.length; i++) {
        const ch = target[i];
        s += i < cut || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = s;
      if (p < 1) requestAnimationFrame(frame);
      else { el.textContent = target; resolve(); }
    };
    requestAnimationFrame(frame);
  });
}

/* typewriter a single line (used for command prompts) */
export function typeEl(el: HTMLElement | null, done?: () => void) {
  if (!el) { done?.(); return; }
  const target = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = target;
  if (reduced) { el.textContent = target; el.classList.add("done"); done?.(); return; }
  el.textContent = "";
  el.classList.add("typing");
  let i = 0;
  const step = () => {
    i++;
    el.textContent = target.slice(0, i);
    if (i < target.length) setTimeout(step, 12 + Math.random() * 20);
    else { el.classList.remove("typing"); el.classList.add("done"); done?.(); }
  };
  step();
}

/* reveal [data-line] children one at a time, each decoding from noise */
export function staggerIn(container: HTMLElement | null, gap = 55, done?: () => void) {
  if (!container) { done?.(); return; }
  const lines = Array.from(container.querySelectorAll<HTMLElement>("[data-line]"));
  container.classList.add("is-in");
  if (reduced || !lines.length) { lines.forEach((l) => l.classList.add("is-in")); done?.(); return; }
  let i = 0;
  const next = () => {
    if (i >= lines.length) { done?.(); return; }
    const line = lines[i++];
    line.classList.add("is-in");
    const scr = line.querySelector<HTMLElement>("[data-scramble]") || (line.hasAttribute("data-scramble") ? line : null);
    if (scr) scramble(scr);
    setTimeout(next, gap);
  };
  next();
}

/* drive one terminal operation: type its command, then print output */
function runOp(op: HTMLElement) {
  if (op.dataset.ran) return;
  op.dataset.ran = "1";
  op.classList.add("live");
  const cmd = op.querySelector<HTMLElement>("[data-type]");
  const out = op.querySelector<HTMLElement>("[data-out]");
  const finish = () => op.classList.add("done");
  if (reduced) {
    cmd?.classList.add("done");
    out?.classList.add("is-in");
    out?.querySelectorAll<HTMLElement>("[data-line]").forEach((l) => l.classList.add("is-in"));
    finish();
    return;
  }
  typeEl(cmd, () => staggerIn(out, out?.dataset.gap ? +out.dataset.gap : 48, finish));
}

/* observe every [data-op] and render it when scrolled into view */
export function initReveal() {
  const ops = Array.from(document.querySelectorAll<HTMLElement>("[data-op]"));
  if (reduced || !("IntersectionObserver" in window)) { ops.forEach(runOp); return; }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        runOp(e.target as HTMLElement);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  ops.forEach((op) => io.observe(op));
}
