/* =============================================================
   Reveal engine // terminal materialization
   Each [data-block] types its command, then prints its [data-in]
   rows one by one, as if the terminal is generating the output.
   [data-hero] blocks are driven by boot.ts. No-JS + reduced-motion
   safe: content is server-rendered and only hidden when JS is
   present and motion is allowed.
   ============================================================= */

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFxo*#@%&";
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function typeEl(el: HTMLElement | null, done?: () => void) {
  if (!el) { done?.(); return; }
  const text = el.dataset.type ?? el.textContent ?? "";
  if (reduced) { el.textContent = text; done?.(); return; }
  el.textContent = "";
  let i = 0;
  const step = () => {
    i++;
    el.textContent = text.slice(0, i);
    if (i < text.length) setTimeout(step, 16);
    else done?.();
  };
  step();
}

function scrambleEl(el: HTMLElement, text: string) {
  if (reduced) { el.textContent = text; return; }
  const dur = Math.min(820, 220 + text.length * 18);
  const last = GLYPHS.length - 1;
  let start: number | null = null;
  const frame = (now: number) => {
    if (start == null) start = now;
    const p = Math.min(1, (now - start) / dur);
    const revealed = Math.floor(p * text.length);
    let s = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (i < revealed || ch === " ") s += ch;
      else s += GLYPHS[(Math.random() * last) | 0];
    }
    el.textContent = s;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = text;
  };
  requestAnimationFrame(frame);
}

export function scrambleNow(el: HTMLElement | null) {
  if (!el) return;
  scrambleEl(el, el.dataset.scramble ?? el.textContent ?? "");
}

/* Stagger every [data-in] row inside a container, one at a time. */
export function staggerIn(parent: HTMLElement | null, delay = 34, done?: () => void) {
  if (!parent) { done?.(); return; }
  const items = Array.from(parent.querySelectorAll<HTMLElement>("[data-in]"));
  if (!items.length) { done?.(); return; }
  if (reduced) { items.forEach((it) => it.classList.add("show")); done?.(); return; }
  let i = 0;
  const step = () => {
    if (i < items.length) { items[i].classList.add("show"); i++; setTimeout(step, delay); }
    else done?.();
  };
  step();
}

/* Drive one [data-block]: type its command, then print its rows. */
function runBlock(block: HTMLElement) {
  if (block.dataset.done) return;
  block.dataset.done = "1";
  block.classList.add("active");
  const cmd = block.querySelector<HTMLElement>("[data-type]");
  const start = () => staggerIn(block);
  if (cmd && !reduced) typeEl(cmd, start);
  else { if (cmd) cmd.textContent = cmd.dataset.type ?? cmd.textContent ?? ""; start(); }
  block.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el) => {
    if (reduced) return;
    scrambleEl(el, el.dataset.scramble ?? el.textContent ?? "");
  });
}

export function initReveal() {
  const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-block]"));
  if (reduced || !("IntersectionObserver" in window)) {
    blocks.forEach((b) => { b.dataset.done = "1"; b.classList.add("active"); });
    document.querySelectorAll<HTMLElement>("[data-in]").forEach((el) => el.classList.add("show"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        runBlock(e.target as HTMLElement);
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );
  blocks.forEach((b) => io.observe(b));
}

/* Safety net: if anything stalled, force the whole buffer visible. */
export function forceRevealAll() {
  document.querySelectorAll<HTMLElement>("[data-block],[data-hero]").forEach((b) => {
    b.classList.add("active");
    b.dataset.done = "1";
  });
  document.querySelectorAll<HTMLElement>("[data-in]").forEach((el) => el.classList.add("show"));
  document.querySelectorAll<HTMLElement>("[data-type]").forEach((el) => {
    if (!el.textContent) el.textContent = el.dataset.type ?? "";
  });
}
