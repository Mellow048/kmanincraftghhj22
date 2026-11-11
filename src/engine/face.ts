import * as THREE from "three";
import { hashString, mulberry32, shade } from "./math";

/**
 * 8×8 Minecraft face maps. One character per pixel.
 *
 *   .  skin            ,  skin shadow      h  hair
 *   H  hair dark       b  brow             w  eye white
 *   p  pupil           m  mouth            r  open mouth
 *   t  teeth           g  glow eye         x  shadow face
 *
 * This is deliberately NOT realistic. It is an 8×8 skin, like Minecraft.
 * Add a new expression by adding a map here — nothing else needs to change.
 */
export type FaceName =
  | "neutral"
  | "worried"
  | "scared"
  | "surprised"
  | "happy"
  | "angry"
  | "sad"
  | "sleepy"
  | "blank"
  | "smug"
  | "crying"
  | "hollow"
  | "dizzy"
  | "hurt";

const FACES: Record<FaceName, string[]> = {
  neutral: [
    "hhhhhhhh",
    "hhhhhhhh",
    "........",
    ".bb..bb.",
    ".wp..pw.",
    "........",
    "...mm...",
    "........",
  ],
  worried: [
    "hhhhhhhh",
    "hhhhhhhh",
    ".b....b.",
    "..bb.bb.",
    ".wp..pw.",
    "........",
    "...mm...",
    "........",
  ],
  scared: [
    "hhhhhhhh",
    "hhhhhhhh",
    "........",
    ".b....b.",
    ".ww..ww.",
    ".wp..pw.",
    "...rr...",
    "........",
  ],
  surprised: [
    "hhhhhhhh",
    "hhhhhhhh",
    ".b....b.",
    "........",
    ".ww..ww.",
    ".wp..pw.",
    "...rr...",
    "........",
  ],
  happy: [
    "hhhhhhhh",
    "hhhhhhhh",
    "........",
    ".bb..bb.",
    "..p..p..",
    "........",
    "..mmmm..",
    "........",
  ],
  angry: [
    "hhhhhhhh",
    "hhhhhhhh",
    "........",
    ".bb..bb.",
    ".wp..pw.",
    "........",
    "..m..m..",
    "...mm...",
  ],
  sad: [
    "hhhhhhhh",
    "hhhhhhhh",
    ".b....b.",
    "..bb.bb.",
    ".wp..pw.",
    "........",
    "..m..m..",
    "...mm...",
  ],
  sleepy: [
    "hhhhhhhh",
    "hhhhhhhh",
    "........",
    ".bb..bb.",
    ".mm..mm.",
    "........",
    "...mm...",
    "........",
  ],
  blank: [
    "hhhhhhhh",
    "hhhhhhhh",
    "........",
    "........",
    "..p..p..",
    "........",
    "...mm...",
    "........",
  ],
  smug: [
    "hhhhhhhh",
    "hhhhhhhh",
    ".b......",
    "..bb.bb.",
    ".wp..pw.",
    "........",
    "..mmmm..",
    "........",
  ],
  crying: [
    "hhhhhhhh",
    "hhhhhhhh",
    ".b....b.",
    "..bb.bb.",
    ".wp..pw.",
    ".w....w.",
    "..m..m..",
    "...mm...",
  ],
  hollow: [
    "hhhhhhhh",
    "hhhhhhhh",
    "xnnnnnnx",
    "nxxxxxxn",
    "nxgxxgxn",
    "nxxxxxxn",
    "xnnnnnnx",
    "xxxxxxxx",
  ],
  dizzy: [
    "hhhhhhhh",
    "hhhhhhhh",
    ".b....b.",
    "..x..x..",
    ".xx..xx.",
    "........",
    "..m..m..",
    "...mm...",
  ],
  hurt: [
    "hhhhhhhh",
    "hhhhhhhh",
    ".b....b.",
    "..b..b..",
    ".wp..pw.",
    ".w....w.",
    "..m..m..",
    "...mm...",
  ],
};

const CACHE = new Map<string, THREE.CanvasTexture>();

const PALETTE = (skin: string, hair: string) => ({
  ".": skin,
  ",": shade(skin, -0.18),
  h: hair,
  H: shade(hair, -0.25),
  b: shade(hair, -0.45),
  w: "#efece2",
  p: "#161a22",
  m: "#7a4038",
  r: "#241014",
  t: "#efece2",
  g: "#eaf7ff",
  x: "#0a0e16",
  X: "#0d121c",
  n: "#141b28",
  N: "#1b2333",
});

export type FaceOptions = {
  skin?: string;
  hair?: string;
  /** Add per-pixel skin grain so the face does not look like flat vector art. */
  grain?: number;
  /** Pupil offset: -1 left, 1 right, 0 centre. Gives a held eye-dart. */
  gaze?: -1 | 0 | 1;
};

function buildFaceTexture(rowsIn: string[], key: string, options: FaceOptions): THREE.CanvasTexture {
  const skin = options.skin ?? "#e8b78d";
  const hair = options.hair ?? "#4a2e1c";
  const grain = options.grain ?? 0.05;
  const hit = CACHE.get(key);
  if (hit) return hit;

  const rows = rowsIn;
  if (rows.length !== 8 || rows.some((r) => r.length !== 8)) {
    throw new Error(`Face "${key}" must be an 8×8 pixel map.`);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 8;
  const ctx = canvas.getContext("2d")!;
  const pal = PALETTE(skin, hair);
  const rand = mulberry32(hashString(key));

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const ch = rows[y][x];
      let color = (pal as Record<string, string>)[ch] ?? skin;
      if (grain > 0 && (ch === "." || ch === ",")) {
        color = shade(color, (rand() * 2 - 1) * grain);
      }
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  CACHE.set(key, tex);
  return tex;
}

/** Returns a cached 8×8 CanvasTexture for a face. */
export function faceTexture(name: FaceName, options: FaceOptions = {}): THREE.CanvasTexture {
  const skin = options.skin ?? "#e8b78d";
  const hair = options.hair ?? "#4a2e1c";
  const grain = options.grain ?? 0.05;
  const gaze = options.gaze ?? 0;
  const key = `face|${name}|${skin}|${hair}|${grain}|${gaze}`;
  const source = FACES[name] ?? FACES.neutral;
  // Eyes are 2px wide: swapping white/pupil moves the pupil one pixel and reads
  // as a glance. Do it per pair so both eyes look the same way.
  const rows =
    gaze === 0
      ? source
      : source.map((row) => (gaze > 0 ? row.replace(/wp/g, "pw") : row.replace(/pw/g, "wp")));
  return buildFaceTexture(rows, key, options);
}

/**
 * The same face with the eyes shut. Whites become skin, pupils become a thin
 * shadow line, so a blink reads at a glance instead of looking like a new face.
 * Faces with glowing eyes (hollow) do not blink.
 */
export function blinkFaceTexture(name: FaceName, options: FaceOptions = {}): THREE.CanvasTexture {
  const skin = options.skin ?? "#e8b78d";
  const hair = options.hair ?? "#4a2e1c";
  const grain = options.grain ?? 0.05;
  const key = `blink|${name}|${skin}|${hair}|${grain}`;

  const source = FACES[name] ?? FACES.neutral;
  const hasOpenEyes = source.some((row) => /[wp]/.test(row));

  if (!hasOpenEyes) {
    return buildFaceTexture(source, key, options);
  }

  const rows = source.map((row) =>
    row
      .split("")
      .map((ch) => {
        if (ch === "w") return ".";
        if (ch === "p") return ",";
        return ch;
      })
      .join(""),
  );

  return buildFaceTexture(rows, key, options);
}

/**
 * Side-of-head maps. In a Minecraft head the hair covers the whole back half
 * and the top; only the cheek is skin. Getting this wrong makes a 3/4 shot
 * read as a bald mannequin, so each side gets its own mirrored map.
 *
 * Texture u runs front→back on the +X face and back→front on the -X face,
 * so the "right" map has hair on the high-u columns and the "left" map has
 * it on the low-u columns.
 */
const SIDE_ROWS_RIGHT = [
  "hhhhhhhh",
  "hhhhhhhh",
  "..hhhhhh",
  "..hhhhhh",
  "..hhhhhh",
  "..hhhhhh",
  "...hhhhh",
  "....hh..",
];

const SIDE_ROWS_LEFT = SIDE_ROWS_RIGHT.map((row) =>
  row
    .split("")
    .reverse()
    .join(""),
);

export type HeadSide = "left" | "right";

/** Hair wraps around the sides of the head, so a 3/4 shot never looks bald. */
export function headSideTexture(skin: string, hair: string, side: HeadSide = "right"): THREE.CanvasTexture {
  const key = `headside|${side}|${skin}|${hair}`;
  const hit = CACHE.get(key);
  if (hit) return hit;

  const rows = side === "right" ? SIDE_ROWS_RIGHT : SIDE_ROWS_LEFT;

  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 8;
  const ctx = canvas.getContext("2d")!;
  const pal = PALETTE(skin, hair);
  const rand = mulberry32(hashString(key));
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const ch = rows[y][x];
      let color = (pal as Record<string, string>)[ch] ?? skin;
      if (ch === ".") color = shade(color, (rand() * 2 - 1) * 0.05);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  CACHE.set(key, tex);
  return tex;
}

export const FACE_NAMES = Object.keys(FACES) as FaceName[];
