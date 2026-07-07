/* =============================================================
   Reveal system // content materializes as it scrolls into view.
   Modes: scramble (matrix resolve), type (teletype), fade (default).
   No-JS safe: content is visible unless JS hides it; reduced-motion
   reveals everything immediately.
   ============================================================= */

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFxo";
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scramble(el: HTMLElement) {
  const target = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = target;
  const dur = Math.min(820, 240 + target.length * 20);
  let start: number | null = null;
  const frame = (now: number) => {
    if (start == null) start = now;
    const p = Math.min(1, (now - start) / dur);
    const revealed = Math.floor(p * target.length);
    let s = "";
    for (let i = 0; i < target.length; i++) {
      const ch = target[i];
      if (i < revealed || ch === " ") s += ch;
      else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = s;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = target;
  };
  requestAnimationFrame(frame);
}

function typewriter(el: HTMLElement) {
  const target = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = target;
  el.textContent = "";
  let i = 0;
  const step = () => {
    i++;
    el.textContent = target.slice(0, i);
    if (i < target.length) setTimeout(step, 14);
  };
  step();
}

export function initReveal() {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        el.classList.add("is-in");
        const mode = el.dataset.reveal;
        if (mode === "scramble") scramble(el);
        else if (mode === "type") typewriter(el);
      }
    },
    { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

// Run a scramble immediately (used for above-the-fold hero labels).
export function scrambleNow(el: HTMLElement | null) {
  if (!el) return;
  if (reduced) return;
  scramble(el);
}
export function typeNow(el: HTMLElement | null) {
  if (!el) return;
  if (reduced) return;
  typewriter(el);
}
