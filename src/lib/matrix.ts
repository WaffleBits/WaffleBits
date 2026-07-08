/* =============================================================
   Ambient ASCII matrix // background character field.
   Deliberately dim and slow: it is atmosphere, never content.
   Paused when the tab is hidden. Disabled under reduced-motion.
   ============================================================= */
import { reduced } from "./reveal";

const CH = "01<>[]{}/\\|=+*#%&$?!:;.~^ABCDEF";
const FS = 13;
const GAP = 15;

let started = false;

export function startMatrix() {
  if (started || reduced) return;
  const c = document.getElementById("matrix") as HTMLCanvasElement | null;
  if (!c) return;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  started = true;

  let w = 0, h = 0, cols = 0;
  let drops: number[] = [];
  let speeds: number[] = [];
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    c.width = w * dpr;
    c.height = h * dpr;
    c.style.width = w + "px";
    c.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${FS}px "JetBrains Mono", ui-monospace, monospace`;
    cols = Math.ceil(w / GAP);
    drops = Array.from({ length: cols }, () => Math.random() * -60);
    speeds = Array.from({ length: cols }, () => 0.22 + Math.random() * 0.42);
  };
  resize();
  window.addEventListener("resize", resize);

  // fade the field in once it exists
  requestAnimationFrame(() => c.classList.add("on"));

  let last = 0;
  const frame = (ts: number) => {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    if (ts - last < 58) return; // ~17fps, plenty for drifting glyphs
    last = ts;

    // trail fade
    ctx.fillStyle = "rgba(5,7,10,0.12)";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < cols; i++) {
      const y = drops[i] * FS;
      if (y > 0 && y < h + FS) {
        const ch = CH[(Math.random() * CH.length) | 0];
        ctx.fillStyle = Math.random() < 0.07 ? "rgba(150,240,190,0.34)" : "rgba(111,224,160,0.15)";
        ctx.fillText(ch, i * GAP, y);
      }
      drops[i] += speeds[i];
      if (y > h + Math.random() * 500) drops[i] = -Math.random() * 50;
    }
  };
  requestAnimationFrame(frame);
}
