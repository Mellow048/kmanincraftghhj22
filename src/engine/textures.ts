import * as THREE from "three";
import { hashString, mulberry32, shade } from "./math";

/**
 * Every texture in this framework is generated procedurally at runtime.
 * No image assets, no downloads, no broken paths — and everything stays
 * pixel-crisp with NearestFilter, which is what makes it read as Minecraft.
 */

const CACHE = new Map<string, THREE.CanvasTexture>();

function texture(
  key: string,
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
  repeat: [number, number] = [1, 1],
): THREE.CanvasTexture {
  const hit = CACHE.get(key);
  if (hit) return hit;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d")!);

  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestMipmapLinearFilter;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  CACHE.set(key, tex);
  return tex;
}

/** Flat colour with subtle per-pixel value noise. The bread and butter of the look. */
export function pixelTex(
  base: string,
  repeat: [number, number] = [1, 1],
  opts: { jitter?: number; size?: number; seed?: number } = {},
): THREE.CanvasTexture {
  const size = opts.size ?? 8;
  const jitter = opts.jitter ?? 0.07;
  const seed = opts.seed ?? hashString(base);
  const key = `pixel|${base}|${repeat.join(",")}|${size}|${jitter}|${seed}`;

  return texture(
    key,
    size,
    size,
    (ctx) => {
      const rand = mulberry32(seed);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          ctx.fillStyle = shade(base, (rand() * 2 - 1) * jitter);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    },
    repeat,
  );
}

/** Two-tone stripes, vertical or horizontal. Used for the hospital gown, wood, walls. */
export function stripeTex(
  a: string,
  b: string,
  opts: { count?: number; horizontal?: boolean; repeat?: [number, number]; seed?: number } = {},
): THREE.CanvasTexture {
  const count = opts.count ?? 4;
  const repeat = opts.repeat ?? [1, 1];
  const key = `stripes|${a}|${b}|${count}|${opts.horizontal ? "h" : "v"}|${repeat.join(",")}|${opts.seed ?? 0}`;

  return texture(
    key,
    8,
    8,
    (ctx) => {
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          const band = Math.floor(((opts.horizontal ? y : x) / 8) * count);
          ctx.fillStyle = band % 2 === 0 ? a : b;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    },
    repeat,
  );
}

/** Dark wood planks. */
export function plankTex(base = "#4a3524", repeat: [number, number] = [1, 1]): THREE.CanvasTexture {
  const key = `plank|${base}|${repeat.join(",")}`;
  return texture(
    key,
    16,
    16,
    (ctx) => {
      const rand = mulberry32(hashString(key));
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, 16, 16);
      for (let y = 0; y < 16; y += 4) {
        ctx.fillStyle = shade(base, -0.18);
        ctx.fillRect(0, y, 16, 1);
        for (let x = 0; x < 16; x += 1) {
          ctx.fillStyle = shade(base, (rand() * 2 - 1) * 0.08);
          ctx.fillRect(x, y + 1, 1, 3);
        }
        ctx.fillStyle = shade(base, -0.28);
        ctx.fillRect((y * 3) % 16, y + 1, 1, 3);
      }
    },
    repeat,
  );
}

/** Red carpet with a woven border pattern. */
export function carpetTex(repeat: [number, number] = [1, 1]): THREE.CanvasTexture {
  const key = `carpet|${repeat.join(",")}`;
  return texture(
    key,
    16,
    16,
    (ctx) => {
      const rand = mulberry32(88);
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const edge = x < 1 || x > 14 || y < 1 || y > 14;
          const motif = (x % 8 === 3 || x % 8 === 4) && (y % 8 === 3 || y % 8 === 4);
          const base = edge ? "#3a0710" : motif ? "#650d1a" : "#7e1020";
          ctx.fillStyle = shade(base, (rand() * 2 - 1) * 0.06);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    },
    repeat,
  );
}

export type PosterOptions = {
  title: string;
  subtitle?: string;
  lines?: string[];
  bg?: string;
  fg?: string;
  accent?: string;
  /** Draw a colourful 4×3 block grid like the "MY TIMETABLE" chart. */
  grid?: boolean;
  /** 0..1, relative text size. */
  scale?: number;
  border?: boolean;
};

/** A pixelated wall poster / sign. Text is rasterised tiny and upscaled for the Minecraft look. */
export function posterTex(opts: PosterOptions): THREE.CanvasTexture {
  const {
    title,
    subtitle,
    lines = [],
    bg = "#e6dfcc",
    fg = "#1b2028",
    accent = "#c8402f",
    grid = false,
    scale = 1,
    border = true,
  } = opts;
  const key = `poster|${JSON.stringify(opts)}`;

  return texture(key, 96, 128, (ctx) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 96, 128);

    if (border) {
      ctx.strokeStyle = shade(bg, -0.35);
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, 92, 124);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(6, 6, 84, 116);
    }

    ctx.fillStyle = fg;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const titleSize = Math.max(8, Math.round(13 * scale));
    ctx.font = `bold ${titleSize}px monospace`;
    ctx.fillText(title, 48, 22);

    if (subtitle) {
      ctx.font = `bold ${Math.max(6, Math.round(8 * scale))}px monospace`;
      ctx.fillStyle = accent;
      ctx.fillText(subtitle, 48, 34);
    }

    if (grid) {
      const colors = ["#3b74c4", "#d9a441", "#4a9b5c", "#b8543c", "#7a5aa6", "#3f9aa0"];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          ctx.fillStyle = colors[(row * 4 + col + 1) % colors.length];
          ctx.fillRect(10 + col * 20, 42 + row * 20, 18, 18);
          ctx.fillStyle = "rgba(0,0,0,0.25)";
          ctx.fillRect(10 + col * 20, 58 + row * 20, 18, 2);
        }
      }
      ctx.fillStyle = fg;
      ctx.font = `bold 7px monospace`;
      ctx.fillText("WEEK 12", 48, 104);
      return;
    }

    ctx.font = `bold ${Math.max(6, Math.round(9 * scale))}px monospace`;
    lines.forEach((line, i) => {
      ctx.fillStyle = i === 0 ? accent : fg;
      ctx.fillText(line, 48, 46 + i * 12);
    });
  });
}

/** Soft radial white glow. Used for light pools, lamp falloff, dust sprites. */
export function glowTex(): THREE.CanvasTexture {
  const key = "glow";
  return texture(key, 64, 64, (ctx) => {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  });
}

/** Soft vertical shaft, used for volumetric god-rays. */
export function beamTex(): THREE.CanvasTexture {
  const key = "beam";
  return texture(key, 64, 128, (ctx) => {
    const v = ctx.createLinearGradient(0, 0, 0, 128);
    v.addColorStop(0, "rgba(255,255,255,0.85)");
    v.addColorStop(0.55, "rgba(255,255,255,0.3)");
    v.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, 64, 128);

    const h = ctx.createLinearGradient(0, 0, 64, 0);
    h.addColorStop(0, "rgba(0,0,0,0)");
    h.addColorStop(0.3, "rgba(255,255,255,1)");
    h.addColorStop(0.7, "rgba(255,255,255,1)");
    h.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = h;
    ctx.fillRect(0, 0, 64, 128);
  });
}

/** Emissive window pane with a faint cross-bar pattern. */
export function windowTex(warm = false): THREE.CanvasTexture {
  const key = `window|${warm}`;
  return texture(key, 32, 32, (ctx) => {
    const rand = mulberry32(warm ? 12 : 9);
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const edge = x < 2 || x > 29 || y < 2 || y > 29;
        const bar = Math.abs(x - 15) < 1 || Math.abs(y - 15) < 1;
        const base = edge ? "#1a2233" : bar ? "#2b3852" : warm ? "#ffd9a0" : "#bcd8ff";
        ctx.fillStyle = edge || bar ? base : shade(base, (rand() * 2 - 1) * 0.09);
        ctx.fillRect(x, y, 1, 1);
      }
    }
  });
}
