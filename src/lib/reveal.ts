/* Entrance choreography. Opacity and transform only, so nothing reflows. */

export const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initReveal() {
  document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((g) => {
    Array.from(g.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
  });

  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-in], [data-stagger]"));
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
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );
  items.forEach((e) => io.observe(e));
}

/* The two replay strips must show the same pattern: that is the claim. */
export function initStrips() {
  const strips = Array.from(document.querySelectorAll<HTMLElement>("[data-strip]"));
  if (!strips.length) return;
  const N = 28;
  const pattern = Array.from({ length: N }, (_, i) => (i * 7 + ((i * i) % 5)) % 3 === 0);
  for (const s of strips) {
    s.innerHTML = "";
    for (const on of pattern) {
      const i = document.createElement("i");
      if (on) i.className = "on";
      s.appendChild(i);
    }
  }
}
