/* Entrance, trace strips, and the one piece of motion that explains
   something: a marker running the gateway request path once. */

export const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initReveal() {
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-in]"));
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach((e) => e.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        e.target.classList.add("is-in");
      }
    },
    { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
  );
  items.forEach((e) => io.observe(e));

  // An entrance animation must never be why content is unreadable.
  window.setTimeout(() => {
    for (const e of items) {
      if (e.classList.contains("is-in")) continue;
      const r = e.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        io.unobserve(e);
        e.classList.add("is-in");
      }
    }
  }, 1400);
}

/* Both strips carry the same pattern: that is the claim being made. */
export function initTrace() {
  const strips = Array.from(document.querySelectorAll<HTMLElement>("[data-trace]"));
  if (!strips.length) return;
  const pattern = Array.from({ length: 40 }, (_, i) => (i * 7 + ((i * i) % 5)) % 3 === 0);
  for (const s of strips) {
    s.replaceChildren(
      ...pattern.map((on) => {
        const i = document.createElement("i");
        if (on) i.className = "on";
        return i;
      })
    );
  }
}

/* One request travelling the path, once, when the list is first seen. */
export function initGates() {
  const list = document.getElementById("gates");
  if (!list || reduced || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const rows = list.querySelectorAll<HTMLElement>(".gate");
      const last = rows[rows.length - 1];
      if (last) list.style.setProperty("--travel", `${last.offsetTop + last.offsetHeight - 44}px`);
      list.classList.add("run");
    },
    { threshold: 0.15 }
  );
  io.observe(list);
}
