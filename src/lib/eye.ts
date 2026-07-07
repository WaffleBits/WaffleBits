/* =============================================================
   Sentinel eye // procedural ASCII renderer
   Generated per frame from an almond aperture + iris striations +
   pupil catchlight, resolving from noise with a scan sweep.
   ============================================================= */

const RAMP = " .·:-=+*o#%@";

export interface EyeOpts {
  open?: number;
  t?: number;
  noise?: number;
  scanY?: number;
  lookX?: number;
  lookY?: number;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function renderEye(cols: number, rows: number, o: EyeOpts = {}): string {
  const open = o.open == null ? 1 : o.open;
  const t = o.t || 0;
  const noise = o.noise || 0;
  const scanY = o.scanY;
  const lookX = o.lookX || 0;
  const lookY = o.lookY || 0;
  const ASPECT = 2.05;
  const cx = (cols - 1) / 2, cy = (rows - 1) / 2;
  const W = cols * 0.47;
  const H = W * 0.4 * open;
  const irisR = W * 0.34;
  const pupilR = W * 0.14;
  const last = RAMP.length - 1;
  const out: string[] = new Array(rows);

  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      const X = c - cx;
      const Y = (r - cy) * ASPECT;
      const u = X / W;
      const inX = u > -1 && u < 1;
      const Ylid = inX ? H * Math.pow(1 - u * u, 0.72) : 0;
      const inside = inX && Math.abs(Y) <= Ylid;
      let v = 0;

      if (inside) {
        const Xi = X - lookX, Yi = Y - lookY;
        const R = Math.hypot(Xi, Yi);
        const nearLid = Ylid - Math.abs(Y);
        if (R < pupilR) {
          v = 0.04;
          const clx = Xi + pupilR * 0.5, cly = Yi + pupilR * 0.7;
          if (Math.hypot(clx, cly) < pupilR * 0.5) v = 1;
        } else if (R < irisR) {
          const ang = Math.atan2(Yi, Xi);
          const spokes = Math.sin(ang * 20 + R * 0.12);
          const ring = Math.sin(R * 0.95 - t * 2.0);
          v = 0.5 + 0.22 * spokes + 0.16 * ring;
          if (R > irisR * 0.8) v += 0.28;
        } else {
          v = 0.1;
        }
        if (nearLid < 1.1) v = Math.max(v, 0.85);
      } else if (inX) {
        const d = Math.abs(Y) - Ylid;
        if (d > 0 && d < 1.4) v = 0.5;
      }

      if (scanY != null && inside && Math.abs(r - scanY) < 0.9) v = 1;
      if (noise > 0 && Math.random() < noise * 0.55) v = Math.random();

      const idx = clamp(Math.round(v * last), 0, last);
      line += v <= 0 ? " " : RAMP[idx];
    }
    out[r] = line;
  }
  return out.join("\n");
}

// Size a <pre> so `cols` columns fit its container width.
export function fitEye(pre: HTMLElement, cols: number, ratio: number) {
  const host = pre.parentElement || pre;
  const w = host.clientWidth || 320;
  let fs = w / (cols * 0.6);
  fs = clamp(fs, 4.5, 15);
  pre.style.fontSize = fs.toFixed(2) + "px";
  return { cols, rows: Math.max(6, Math.round(cols * ratio)) };
}
