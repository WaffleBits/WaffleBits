/* Reading progress on the nav hairline, plus the active section marker. */

export function initNav() {
  const bar = document.getElementById("navbar");
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
  const secs = links.map((l) => document.getElementById(l.dataset.nav || ""));

  let queued = false;
  const paint = () => {
    queued = false;
    const span = document.documentElement.scrollHeight - window.innerHeight;
    const p = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
    if (bar) bar.style.transform = `scaleX(${p})`;

    const line = window.scrollY + window.innerHeight * 0.3;
    let cur = -1;
    secs.forEach((s, i) => { if (s && s.offsetTop <= line) cur = i; });
    links.forEach((l, i) => l.classList.toggle("on", i === cur));
  };

  paint();
  window.addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(paint);
  }, { passive: true });
  window.addEventListener("resize", paint, { passive: true });
}
