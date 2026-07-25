/* =============================================================
   Ambient ASCII matrix // background character field.
   Three depth layers, each falling at its own rate. The field
   reacts to the visitor: it accelerates with scroll velocity and
   decodes into brighter glyphs around the pointer. Real words
   from the work drift through it so the noise is not pure noise.
   Atmosphere only, never content. Paused when the tab is hidden.
   Disabled under reduced-motion.
   ============================================================= */
import { reduced } from "./reveal";

const CH = "01<>[]{}/\\|=+*#%&$?!:;.~^ABCDEF";

/* legible fragments from the actual work, drifting in the field */
const WORDS = [
  "ACCESS", "POLICY", "AUDIT", "BUDGET", "DENY", "ALLOW", "TRACE",
  "BATCH", "KV-CACHE", "REPLAY", "ROLLBACK", "CANARY", "GATE",
  "LATENCY", "P99", "THROUGHPUT", "TOKENS", "SCHEDULER", "GPU",
  "INGRESS", "SIGNED", "NOMINAL", "PROMOTE", "HOLD",
];

interface Layer {
  fs: number;       // glyph size
  gap: number;      // column pitch
  base: number;     // fall rate
  react: number;    // how strongly this depth answers scroll velocity
  head: string;     // bright leading glyph
  body: string;     // trailing glyph
  cols: number;
  y: Float32Array;  // head position per column, in rows
  v: Float32Array;  // per-column rate jitter
}

interface Ghost { word: string; col: number; row: number; layer: number; life: number; }

const LAYERS: Array<Omit<Layer, "cols" | "y" | "v">> = [
  { fs: 10, gap: 22, base: 0.14, react: 0.35, head: "rgba(120,200,170,0.22)", body: "rgba(90,180,140,0.09)" },
  { fs: 13, gap: 15, base: 0.24, react: 0.7,  head: "rgba(150,240,190,0.34)", body: "rgba(111,224,160,0.15)" },
  { fs: 17, gap: 26, base: 0.40, react: 1.25, head: "rgba(175,255,215,0.40)", body: "rgba(120,235,175,0.16)" },
];

const POINTER_R = 150;   // decode radius around the cursor
const MONO = '"JetBrains Mono", ui-monospace, monospace';

let started = false;

export function startMatrix() {
  if (started || reduced) return;
  const c = document.getElementById("matrix") as HTMLCanvasElement | null;
  if (!c) return;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  started = true;

  let w = 0, h = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const layers: Layer[] = [];
  const ghosts: Ghost[] = [];

  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    c.width = w * dpr;
    c.height = h * dpr;
    c.style.width = w + "px";
    c.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layers.length = 0;
    for (const d of LAYERS) {
      const cols = Math.ceil(w / d.gap) + 1;
      layers.push({
        ...d,
        cols,
        y: Float32Array.from({ length: cols }, () => Math.random() * -80),
        v: Float32Array.from({ length: cols }, () => 0.7 + Math.random() * 0.7),
      });
    }
    ghosts.length = 0;
  };
  resize();
  window.addEventListener("resize", resize);

  /* ---- pointer field: glyphs decode brighter near the cursor ---- */
  let px = -9e3, py = -9e3, pStrength = 0;
  window.addEventListener("pointermove", (e) => {
    px = e.clientX; py = e.clientY; pStrength = 1;
  }, { passive: true });
  window.addEventListener("pointerleave", () => { pStrength = 0; }, { passive: true });

  /* ---- scroll velocity: the field falls faster while you move ---- */
  let lastY = window.scrollY, vel = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    vel = Math.min(14, vel + Math.abs(y - lastY) * 0.09);
    lastY = y;
  }, { passive: true });

  requestAnimationFrame(() => c.classList.add("on"));

  const spawnGhost = () => {
    const li = 1 + ((Math.random() * 2) | 0);
    const L = layers[li];
    if (!L) return;
    const word = WORDS[(Math.random() * WORDS.length) | 0];
    ghosts.push({
      word,
      col: (Math.random() * Math.max(1, L.cols - word.length)) | 0,
      row: -2,
      layer: li,
      life: 1,
    });
  };

  let last = 0;
  const frame = (ts: number) => {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    if (ts - last < 33) return; // ~30fps: smooth enough to feel alive, cheap enough to ignore
    last = ts;

    vel *= 0.9;
    pStrength *= 0.985;

    // trail fade
    ctx.fillStyle = "rgba(5,7,10,0.13)";
    ctx.fillRect(0, 0, w, h);

    const R2 = POINTER_R * POINTER_R;

    for (const L of layers) {
      ctx.font = `${L.fs}px ${MONO}`;
      const rate = L.base + vel * L.react * 0.06;
      for (let i = 0; i < L.cols; i++) {
        const yPix = L.y[i] * L.fs;
        if (yPix > -L.fs && yPix < h + L.fs) {
          const xPix = i * L.gap;
          let fill = Math.random() < 0.07 ? L.head : L.body;
          // decode disc: anything the pointer is near burns brighter and colder
          if (pStrength > 0.02) {
            const dx = xPix - px, dy = yPix - py;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              const k = (1 - d2 / R2) * pStrength;
              fill = `rgba(120,220,235,${(0.10 + k * 0.55).toFixed(3)})`;
            }
          }
          ctx.fillStyle = fill;
          ctx.fillText(CH[(Math.random() * CH.length) | 0], xPix, yPix);
        }
        L.y[i] += rate * L.v[i];
        if (yPix > h + Math.random() * 500) L.y[i] = -Math.random() * 60;
      }
    }

    // legible fragments falling with the field
    if (ghosts.length < 3 && Math.random() < 0.02) spawnGhost();
    for (let g = ghosts.length - 1; g >= 0; g--) {
      const gh = ghosts[g];
      const L = layers[gh.layer];
      if (!L) { ghosts.splice(g, 1); continue; }
      ctx.font = `${L.fs}px ${MONO}`;
      ctx.fillStyle = `rgba(224,178,87,${(0.20 * gh.life).toFixed(3)})`;
      const yPix = gh.row * L.fs;
      for (let k = 0; k < gh.word.length; k++) {
        ctx.fillText(gh.word[k], (gh.col + k) * L.gap, yPix);
      }
      gh.row += (L.base + vel * L.react * 0.06) * 0.9;
      gh.life -= 0.004;
      if (yPix > h || gh.life <= 0) ghosts.splice(g, 1);
    }
  };
  requestAnimationFrame(frame);
}
