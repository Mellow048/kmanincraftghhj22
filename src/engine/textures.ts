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

/** Acoustic ceiling tile: off-white with a pinhole grid and a dark recess edge. */
export function tileCeilingTex(repeat: [number, number] = [1, 1]): THREE.CanvasTexture {
  const key = `ceiling|${repeat.join(",")}`;
  return texture(
    key,
    16,
    16,
    (ctx) => {
      const rand = mulberry32(hashString(key));
      ctx.fillStyle = "#cfd6dd";
      ctx.fillRect(0, 0, 16, 16);
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const hole = (x % 3 === 1 && y % 3 === 1) || (x % 5 === 2 && y % 4 === 2);
          const edge = x === 0 || y === 0;
          if (hole) ctx.fillStyle = shade("#cfd6dd", -0.3);
          else if (edge) ctx.fillStyle = shade("#cfd6dd", -0.45);
          else ctx.fillStyle = shade("#cfd6dd", (rand() * 2 - 1) * 0.045);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    },
    repeat,
  );
}

/** Night sky with a moon, stars and a rooftop silhouette. This is the hero window. */
export function moonWindowTex(): THREE.CanvasTexture {
  const key = "moonwindow";
  return texture(key, 48, 48, (ctx) => {
    const rand = mulberry32(2024);

    // sky gradient
    for (let y = 0; y < 48; y++) {
      const k = y / 47;
      const r = Math.round(10 + (26 - 10) * k);
      const g = Math.round(16 + (38 - 16) * k);
      const b = Math.round(34 + (74 - 34) * k);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, 48, 1);
    }

    // stars
    for (let i = 0; i < 70; i++) {
      const x = Math.floor(rand() * 48);
      const y = Math.floor(rand() * 34);
      const bright = rand();
      ctx.fillStyle = bright > 0.92 ? "#ffffff" : `rgba(220,235,255,${0.25 + bright * 0.5})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // moon with craters
    const mx = 31;
    const my = 12;
    const mr = 7;
    for (let y = -mr; y <= mr; y++) {
      for (let x = -mr; x <= mr; x++) {
        if (x * x + y * y > mr * mr) continue;
        const d = Math.sqrt(x * x + y * y) / mr;
        const crater = (x + 2) ** 2 + (y - 1) ** 2 < 7 || (x - 3) ** 2 + (y + 3) ** 2 < 5;
        ctx.fillStyle = crater ? "#b9c6d8" : shade("#f2f6ff", -d * 0.22);
        ctx.fillRect(mx + x, my + y, 1, 1);
      }
    }
    // halo
    for (let y = -mr - 3; y <= mr + 3; y++) {
      for (let x = -mr - 3; x <= mr + 3; x++) {
        const d = Math.sqrt(x * x + y * y);
        if (d > mr && d <= mr + 3) {
          ctx.fillStyle = `rgba(190,215,255,${(1 - (d - mr) / 3) * 0.22})`;
          ctx.fillRect(mx + x, my + y, 1, 1);
        }
      }
    }

    // drifting cloud
    for (let i = 0; i < 3; i++) {
      const cx = 4 + i * 15;
      const cy = 8 + (i % 2) * 6;
      ctx.fillStyle = "rgba(120,150,195,0.32)";
      for (let k = 0; k < 9; k++) ctx.fillRect(cx + k, cy + (k % 3 === 0 ? -1 : 0), 2, 2);
    }

    // rooftop silhouette with a water tower and chimneys
    ctx.fillStyle = "#070c16";
    ctx.fillRect(0, 38, 48, 10);
    ctx.fillRect(3, 34, 8, 4);
    ctx.fillRect(5, 32, 2, 2);
    ctx.fillRect(18, 35, 10, 3);
    ctx.fillRect(20, 30, 3, 5);
    ctx.fillRect(30, 33, 6, 5);
    ctx.fillRect(38, 36, 9, 2);
    // a couple of lit windows far away
    ctx.fillStyle = "#ffcf7a";
    ctx.fillRect(21, 31, 1, 1);
    ctx.fillRect(32, 34, 1, 1);
  });
}

export type CrayonDrawingOptions = {
  /** "shadow" draws the tall black figure; "family" draws a house and people. */
  kind?: "shadow" | "family";
  paper?: string;
  seed?: number;
};

/** A child's crayon drawing on paper. The shadow variant is the story hook. */
export function crayonDrawingTex(options: CrayonDrawingOptions = {}): THREE.CanvasTexture {
  const { kind = "shadow", paper = "#f4eedd", seed = 5 } = options;
  const key = `crayon|${kind}|${paper}|${seed}`;
  return texture(key, 64, 64, (ctx) => {
    const rand = mulberry32(seed * 7919 + 13);

    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, 64, 64);

    // paper grain
    for (let y = 0; y < 64; y++) {
      for (let x = 0; x < 64; x++) {
        if (rand() > 0.86) {
          ctx.fillStyle = shade(paper, -0.06);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    const stroke = (color: string, x: number, y: number, w: number, h: number) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
      // crayon raggedness: nibble the edges and let the paper show through
      for (let i = 0; i < w * h * 0.2; i++) {
        const rx = x + Math.floor(rand() * w);
        const ry = y + Math.floor(rand() * h);
        if (rand() > 0.45) {
          ctx.fillStyle = paper;
          ctx.fillRect(rx, ry, 1, 1);
        } else {
          ctx.fillStyle = shade(color, (rand() * 2 - 1) * 0.12);
          ctx.fillRect(rx, ry, 1, 1);
        }
      }
    };

    if (kind === "shadow") {
      // sun
      stroke("#e8c33c", 4, 4, 8, 8);
      // grass
      stroke("#5a9b4a", 0, 52, 64, 8);
      // house
      stroke("#c8503c", 38, 26, 18, 22);
      stroke("#8a5a34", 44, 36, 6, 12);
      // the tall black figure — deliberately scribbled and wrong
      for (let i = 0; i < 90; i++) {
        const fx = 12 + rand() * 12;
        const fy = 16 + rand() * 36;
        ctx.fillStyle = shade("#12161f", (rand() * 2 - 1) * 0.25);
        ctx.fillRect(Math.floor(fx), Math.floor(fy), 2, 2);
      }
      // head blob
      for (let i = 0; i < 30; i++) {
        const a = rand() * Math.PI * 2;
        const r = rand() * 6;
        ctx.fillStyle = shade("#0d1119", (rand() * 2 - 1) * 0.2);
        ctx.fillRect(Math.floor(17 + Math.cos(a) * r), Math.floor(14 + Math.sin(a) * r), 2, 2);
      }
      // two white eyes
      ctx.fillStyle = "#f6fbff";
      ctx.fillRect(15, 13, 2, 2);
      ctx.fillRect(20, 13, 2, 2);
      // long arms
      ctx.fillStyle = "#12161f";
      ctx.fillRect(8, 24, 5, 2);
      ctx.fillRect(24, 24, 5, 2);
    } else {
      // family drawing: house, sun, three stick people
      stroke("#e8c33c", 4, 4, 8, 8);
      stroke("#5a9b4a", 0, 52, 64, 8);
      stroke("#c8503c", 34, 24, 22, 24);
      stroke("#3f6fa8", 40, 12, 10, 10);
      stroke("#8a5a34", 46, 36, 6, 12);
      const people: Array<[number, string]> = [
        [8, "#d96a3c"],
        [20, "#3f6fa8"],
        [28, "#4a9b5c"],
      ];
      for (const [x, color] of people) {
        stroke(color, x, 22, 4, 4); // head
        stroke(color, x, 26, 4, 12); // body
        stroke(color, x - 4, 28, 4, 2); // arm
        stroke(color, x + 4, 28, 4, 2); // arm
        stroke(color, x, 38, 2, 10); // leg
        stroke(color, x + 2, 38, 2, 10); // leg
      }
    }
  });
}

/** A patient chart: grid paper, red header, an ECG trace and a scrawled note. */
export function chartTex(): THREE.CanvasTexture {
  const key = "chart";
  return texture(key, 64, 64, (ctx) => {
    ctx.fillStyle = "#e9eef4";
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = "#c8402f";
    ctx.fillRect(0, 0, 64, 8);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 5px monospace";
    ctx.fillText("WARD 9 · BED 2", 3, 6);

    // grid
    ctx.strokeStyle = "rgba(90,120,160,0.35)";
    ctx.lineWidth = 1;
    for (let y = 12; y < 64; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(64, y + 0.5);
      ctx.stroke();
    }

    // ECG trace
    ctx.strokeStyle = "#1d8a4a";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x < 60; x++) {
      const beat = x % 12;
      let y = 26;
      if (beat === 5) y = 18;
      else if (beat === 6) y = 34;
      else if (beat === 7) y = 24;
      if (x === 0) ctx.moveTo(2 + x, y);
      else ctx.lineTo(2 + x, y);
    }
    ctx.stroke();

    // scrawl
    ctx.strokeStyle = "#2a3340";
    ctx.lineWidth = 1;
    for (let row = 0; row < 3; row++) {
      ctx.beginPath();
      const y = 42 + row * 7;
      ctx.moveTo(3, y);
      for (let x = 0; x < 22; x++) {
        ctx.lineTo(3 + x * 2, y + Math.sin(x * 1.7 + row) * 1.6);
      }
      ctx.stroke();
    }
  });
}

/** Yellow wet-floor caution sign face. */
export function wetFloorTex(): THREE.CanvasTexture {
  const key = "wetfloor";
  return texture(key, 24, 32, (ctx) => {
    ctx.fillStyle = "#f2c61a";
    ctx.fillRect(0, 0, 24, 32);
    ctx.fillStyle = "#1b1f26";
    ctx.fillRect(0, 0, 24, 2);
    ctx.fillRect(0, 30, 24, 2);
    // triangle
    ctx.fillStyle = "#1b1f26";
    for (let i = 0; i < 12; i++) {
      ctx.fillRect(12 - i, 6 + i, i * 2, 1);
    }
    ctx.fillStyle = "#f2c61a";
    ctx.fillRect(11, 8, 2, 5);
    ctx.fillRect(11, 15, 2, 2);
    ctx.fillStyle = "#1b1f26";
    ctx.font = "bold 4px monospace";
    ctx.fillText("WET", 6, 24);
    ctx.fillText("FLOOR", 4, 29);
  });
}

/** A strip of wet footprints, used as a floor decal. */
export function footprintTex(): THREE.CanvasTexture {
  const key = "footprints";
  return texture(key, 32, 64, (ctx) => {
    ctx.clearRect(0, 0, 32, 64);
    const print = (cx: number, cy: number, flip: boolean) => {
      ctx.fillStyle = "rgba(120,160,205,0.5)";
      // sole
      ctx.fillRect(cx - 3, cy - 6, 6, 9);
      // heel
      ctx.fillRect(cx - 2, cy + 3, 4, 4);
      // toes
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(cx - 4 + i * 2 + (flip ? 1 : 0), cy - 9, 1, 2);
      }
    };
    print(9, 18, false);
    print(22, 38, true);
    print(9, 58, false);
  });
}

/** Green illuminated EXIT sign. */
export function exitSignTex(): THREE.CanvasTexture {
  const key = "exit";
  return texture(key, 48, 20, (ctx) => {
    ctx.fillStyle = "#0d3a22";
    ctx.fillRect(0, 0, 48, 20);
    ctx.fillStyle = "#16a057";
    ctx.fillRect(1, 1, 46, 18);
    ctx.fillStyle = "#eafff2";
    ctx.font = "bold 11px monospace";
    ctx.fillText("EXIT", 12, 15);
    // arrow
    ctx.fillRect(36, 8, 8, 4);
    ctx.fillRect(42, 6, 3, 8);
  });
}

/** Small room-number plate. */
export function doorPlateTex(label = "9"): THREE.CanvasTexture {
  const key = `plate|${label}`;
  return texture(key, 32, 16, (ctx) => {
    ctx.fillStyle = "#1d2b45";
    ctx.fillRect(0, 0, 32, 16);
    ctx.fillStyle = "#c8402f";
    ctx.fillRect(0, 0, 32, 2);
    ctx.fillStyle = "#e8eef7";
    ctx.font = "bold 10px monospace";
    ctx.fillText(label, 11, 13);
  });
}

/** Cork notice board with pinned memos. */
export function noticeBoardTex(seed = 3): THREE.CanvasTexture {
  const key = `notice|${seed}`;
  return texture(key, 64, 48, (ctx) => {
    const rand = mulberry32(seed * 331 + 7);
    ctx.fillStyle = "#8a6a44";
    ctx.fillRect(0, 0, 64, 48);
    for (let y = 0; y < 48; y++) {
      for (let x = 0; x < 64; x++) {
        if (rand() > 0.8) {
          ctx.fillStyle = shade("#8a6a44", (rand() * 2 - 1) * 0.2);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    const notes = 8;
    for (let i = 0; i < notes; i++) {
      const w = 8 + Math.floor(rand() * 8);
      const h = 8 + Math.floor(rand() * 8);
      const x = 3 + Math.floor(rand() * (64 - w - 6));
      const y = 3 + Math.floor(rand() * (48 - h - 6));
      ctx.fillStyle = ["#f2ecd8", "#dfe8f2", "#f6d9d2", "#e4f0d8"][i % 4];
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "#c8402f";
      ctx.fillRect(x + w / 2, y - 1, 2, 2);
      ctx.fillStyle = "rgba(40,50,70,0.6)";
      for (let l = 0; l < Math.floor(h / 3); l++) {
        ctx.fillRect(x + 1, y + 2 + l * 3, w - 2, 1);
      }
    }
  });
}

/** Vertical fabric folds for curtains. */
export function curtainTex(base = "#2b4a7a", repeat: [number, number] = [1, 1]): THREE.CanvasTexture {
  const key = `curtain|${base}|${repeat.join(",")}`;
  return texture(
    key,
    16,
    16,
    (ctx) => {
      for (let x = 0; x < 16; x++) {
        const fold = Math.sin((x / 16) * Math.PI * 4);
        ctx.fillStyle = shade(base, fold * 0.16 - 0.06);
        ctx.fillRect(x, 0, 1, 16);
      }
    },
    repeat,
  );
}

/** Dull institutional vinyl wall with a scuff band and a rail groove. */
export function wardWallTex(base = "#3a5a72", repeat: [number, number] = [1, 1]): THREE.CanvasTexture {
  const key = `wardwall|${base}|${repeat.join(",")}`;
  return texture(
    key,
    16,
    16,
    (ctx) => {
      const rand = mulberry32(hashString(key));
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          let amount = (rand() * 2 - 1) * 0.05;
          if (y === 0 || y === 15) amount -= 0.18;
          ctx.fillStyle = shade(base, amount);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    },
    repeat,
  );
}

/** Speckled vinyl composite floor tile, the stuff every hospital corridor uses. */
export function floorTex(base = "#4a5a63", repeat: [number, number] = [1, 1]): THREE.CanvasTexture {
  const key = `floor|${base}|${repeat.join(",")}`;
  return texture(
    key,
    16,
    16,
    (ctx) => {
      const rand = mulberry32(hashString(key));
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const speckle = rand();
          let color = shade(base, (rand() * 2 - 1) * 0.045);
          if (speckle > 0.93) color = shade(base, 0.28);
          else if (speckle < 0.07) color = shade(base, -0.24);
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }
      ctx.fillStyle = shade(base, -0.3);
      ctx.fillRect(0, 0, 16, 1);
      ctx.fillRect(0, 0, 1, 16);
    },
    repeat,
  );
}
