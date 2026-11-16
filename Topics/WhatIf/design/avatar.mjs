import * as THREE from "../../../node_modules/three/build/three.module.js";
import fs from "node:fs";
import zlib from "node:zlib";

/**
 * Renders the What If teller with the engine's own geometry — three.js, MinecraftAvatar's numbers, and the
 * two hair blocks from Topics/WhatIf/teller.tsx — then writes front / back / side / three-quarter PNGs.
 *
 *   node Topics/WhatIf/design/avatar.mjs /tmp/teller && python3 Topics/WhatIf/design/poster.py /tmp/teller
 *
 * No browser and no GPU: it rasterises the boxes itself, so it runs where `npm ci` runs but Remotion's
 * Chromium cannot be downloaded. It is not a Remotion render — it is a picture of the same geometry.
 */
const OUT = process.argv[2] ?? "/tmp/teller";

fs.mkdirSync(OUT, { recursive: true });

const PX = 1.8 / 32;
const HERO = { skin: "#dba47c", hair: "#3b2a20", torso: "#ff7a1a", arms: "#ff7a1a", legs: "#2b2f6a" };
const TELLER_SRC = fs.readFileSync(new URL("./../teller.tsx", import.meta.url), "utf8");
const rowsOf = (name) => {
  const body = TELLER_SRC.split(`export const ${name} = [`)[1].split("];")[0];
  return [...body.matchAll(/"([^"]{8})"/g)].map((m) => m[1]);
};
const HERO_FACE = rowsOf("HERO_FACE");
const HERO_SIDE = rowsOf("HERO_SIDE");
const SIDE_R = HERO_SIDE;
const FACE   = HERO_FACE;

const rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
function shade(hex, a) {
  const [r, g, b] = rgb(hex); const f = (v) => Math.round(a >= 0 ? v + (255 - v) * a : v * (1 + a));
  return "#" + [f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, "0")).join("");
}
const PAL = { ".": HERO.skin, ",": shade(HERO.skin, -0.18), h: HERO.hair, H: shade(HERO.hair, -0.25),
  b: shade(HERO.hair, -0.45), B: shade(HERO.skin, -0.3), w: "#efece2", p: "#161a22", m: "#7a4038" };

// an 8x8 map, sampled per texel. v runs bottom-up.
function tex(rows, mirror = false) {
  // rows[0] is the TOP row of the face. A UV map runs v=0 at the bottom of the head, so build the grid
  // bottom-up: row 7 of the array lands at v near 0.
  const px = [];
  for (let v = 0; v < 8; v++) {
    const row = rows[7 - v];
    const out = [];
    for (let x = 0; x < 8; x++) out.push(rgb(PAL[row[mirror ? 7 - x : x]] ?? PAL["."]));
    px.push(out);
  }
  return { sample(u, v) { return px[Math.min(7, Math.max(0, Math.floor(v * 8)))][Math.min(7, Math.max(0, Math.floor(u * 8)))]; } };
}

const mats = {
  skin: { color: HERO.skin }, hair: { color: HERO.hair },
  face: { map: tex(FACE) }, right: { map: tex(SIDE_R) }, left: { map: tex(SIDE_R, true) },
  torso: { color: HERO.torso }, arm: { color: HERO.arms }, leg: { color: HERO.legs },
};

const geos = [];
function box(sx, sy, sz, cx, cy, cz, m) {
  const g = new THREE.BoxGeometry(sx, sy, sz);
  const mats6 = Array.isArray(m) ? m : [m, m, m, m, m, m];
  // A box drawn in one flat colour must not sample across its face (that was the stripe): pin every UV to one
  // texel. A box with a map keeps the box's own 0..1 square, so the 8x8 face map lands one texel per pixel.
  // NB: g.groups offsets index the INDEX buffer, not the attribute buffer — never use them on attributes.
  if (!mats6.some((m) => m.map)) {
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, 0.5, 0.5);
  }
  g.translate(cx, cy, cz);
  geos.push({ g, mats6 });
}

// ---- MinecraftAvatar, engine numbers, exactly: feet at 0; legs 0..12px; body group at HIP = 12px;
//      torso 12..24px; head group at 24px, head cube 24..32px. 32px = 1.8 m at scale 1 (1.44 m at KID).
box(8*PX, 12*PX, 4*PX - 0.006, 0, 18*PX, 0, mats.torso);          // torso 12..24
box(4*PX, 12*PX, 4*PX - 0.004, 6*PX - 0.002, 18*PX, 0, mats.arm); // right arm 12..24
box(4*PX, 12*PX, 4*PX - 0.004, -6*PX + 0.002, 18*PX, 0, mats.arm);// left arm 12..24
box(3.6*PX, 12*PX, 4*PX, 2.2*PX, 6*PX, 0, mats.leg);              // right leg 0..12
box(3.6*PX, 12*PX, 4*PX, -2.2*PX, 6*PX, 0, mats.leg);             // left leg 0..12
// head cube 24..32px, with the engine's material order: +X, -X, +Y, -Y, +Z (face), -Z
box(8*PX, 8*PX, 8*PX, 0, 28*PX, 0, [mats.right, mats.left, mats.hair, mats.skin, mats.face, mats.hair]);

// ---- TellerHair, the two blocks from Topics/WhatIf/teller.tsx, in head-local space at the cube's centre
const p = PX, top = 4 * p;
// No blocks on the crown: the cut is painted into the 8x8 rows, exactly as Topics/WhatIf/teller.tsx paints it.

const LIGHT = new THREE.Vector3(-0.45, 0.80, 0.40).normalize();
const FILL = new THREE.Vector3(0.62, 0.30, 0.72).normalize();
const RIM = new THREE.Vector3(0.10, 0.35, -0.93).normalize();

function render(yawDeg, pitchDeg, target, dist, W, H, fov, bg) {
  const cam = new THREE.PerspectiveCamera(fov, W / H, 0.05, 50);
  const yaw = THREE.MathUtils.degToRad(yawDeg), pit = THREE.MathUtils.degToRad(pitchDeg);
  cam.position.set(target.x + Math.sin(yaw) * Math.cos(pit) * dist, target.y + Math.sin(pit) * dist,
                   target.z + Math.cos(yaw) * Math.cos(pit) * dist);
  cam.lookAt(target); cam.updateMatrixWorld(true); cam.updateProjectionMatrix();
  const vp = new THREE.Matrix4().multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
  const buf = new Float32Array(W * H * 3);
  for (let i = 0; i < W * H; i++) {
    const y = Math.floor(i / W) / H;
    const k = 1 - 0.05 * y;               // a barely-there vertical fall, so it is a room and not a fill
    buf[i*3] = bg[0] * k; buf[i*3+1] = bg[1] * k; buf[i*3+2] = bg[2] * k;
  }

  const tris = [];
  for (const { g, mats6 } of geos) {
    const pos = g.attributes.position, uvs = g.attributes.uv, nrm = g.attributes.normal, ib = g.index;
    for (const gr of g.groups) {
      const mat = mats6[gr.materialIndex];
      const base = mat.color ? rgb(mat.color).map((v) => v / 255) : [1, 1, 1];
      for (let t = 0; t < gr.count / 3; t++) {
        const tri = [0, 1, 2].map((k) => ib.getX(gr.start + t * 3 + k));
        const P3 = tri.map((i) => new THREE.Vector3().fromBufferAttribute(pos, i));
        const U = tri.map((i) => [uvs.getX(i), uvs.getY(i)]);
        const n = new THREE.Vector3().fromBufferAttribute(nrm, tri[0]);
        const S = P3.map((v) => v.clone().applyMatrix4(vp));
        if (S.some((v) => v.z > 1 || v.z < -1)) continue;
        const sc = S.map((v) => [(v.x * 0.5 + 0.5) * W, (1 - (v.y * 0.5 + 0.5)) * H, v.z]);
        // Facing test: a face turned away is never drawn. `vp` mirrors handedness, so the sign is reversed.
        // No back-face culling: the z-buffer below is the whole answer, and culling a closed box only
        // loses the inward faces that closing a silhouette needs.
        tris.push({ sc, U, mat, base, depth: (sc[0][2] + sc[1][2] + sc[2][2]) / 3 });
      }
    }
  }
  const dep = new Float32Array(W * H).fill(Infinity);   // window-space z: -1 at the lens, +1 at the far plane, so smaller = nearer
  tris.sort((a, b) => a.depth - b.depth);
  for (const { sc, U, mat, base } of tris) {
    const n = new THREE.Vector3();
    // shade from the projected face normal so the light is in camera space, like a studio key
    const [a, b, c] = sc;
    const e1 = new THREE.Vector2(b[0]-a[0], b[1]-a[1]);
    const e2 = new THREE.Vector2(c[0]-a[0], c[1]-a[1]);
    const nz = e1.x*e2.y - e1.y*e2.x;
    const lam = Math.min(1, 0.62 + 0.30 * (Math.abs(nz) / (e1.length()*e2.length() + 1e-9)));
    const sh = lam;
    const x0 = Math.max(0, Math.floor(Math.min(a[0], b[0], c[0]))), x1 = Math.min(W - 1, Math.ceil(Math.max(a[0], b[0], c[0])));
    const y0 = Math.max(0, Math.floor(Math.min(a[1], b[1], c[1]))), y1 = Math.min(H - 1, Math.ceil(Math.max(a[1], b[1], c[1])));
    const triArea = (b[0]-a[0])*(c[1]-a[1]) - (c[0]-a[0])*(b[1]-a[1]);
    if (Math.abs(triArea) < 1e-9) continue;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const wc = ((b[0]-a[0]) * (y+0.5-a[1]) - (x+0.5-a[0]) * (b[1]-a[1])) / triArea;
      const wb = ((x+0.5-a[0]) * (c[1]-a[1]) - (c[0]-a[0]) * (y+0.5-a[1])) / triArea;
      const wa = 1 - wb - wc;
      if (wa < -0.002 || wb < -0.002 || wc < -0.002) continue;
      const z = wa*a[2] + wb*b[2] + wc*c[2];
      const o = y * W + x;
      if (z >= dep[o]) continue;
      dep[o] = z;
      let cr = base[0] * sh, cg = base[1] * sh, cb = base[2] * sh;
      if (mat.map) {
        const u = wa*U[0][0] + wb*U[1][0] + wc*U[2][0], v = wa*U[0][1] + wb*U[1][1] + wc*U[2][1];
        const t2 = mat.map.sample(u, v);
        cr = t2[0] / 255 * sh; cg = t2[1] / 255 * sh; cb = t2[2] / 255 * sh;
      }
      buf[o*3] = cr; buf[o*3+1] = cg; buf[o*3+2] = cb;
    }
  }

  // a soft contact shadow: darken the floor band under the feet
  const out = Buffer.alloc(W * H * 3);
  for (let i = 0; i < W * H * 3; i++) out[i] = Math.max(0, Math.min(255, Math.round(buf[i] * 255)));
  return { W, H, out };
}

let T = null;
function crc32(b) {
  if (!T) { T = new Int32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; T[n] = c; } }
  let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = T[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0;
}
function writePNG(path, W, H, rgbBuf) {
  const raw = Buffer.alloc((W * 3 + 1) * H);
  for (let y = 0; y < H; y++) rgbBuf.copy(raw, y * (W * 3 + 1) + 1, y * W * 3, (y + 1) * W * 3);
  const idat = zlib.deflateSync(raw, { level: 9 });
  const ch = (type, data) => {
    const b = Buffer.alloc(12 + data.length);
    b.writeUInt32BE(data.length, 0); b.write(type, 4, "ascii"); data.copy(b, 8);
    b.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type, "ascii"), data])), 8 + data.length);
    return b;
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 2;
  fs.writeFileSync(path, Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), ch("IHDR", ihdr), ch("IDAT", idat), ch("IEND", Buffer.alloc(0))]));
}

const head = new THREE.Vector3(0, 28 * PX, 0);
const bust = new THREE.Vector3(0, 0.80, 0);
const LIGHT_BG = [0.93, 0.94, 0.955];

// Generous frames; the poster crops to the subject afterwards, so nothing is ever cut.
const SHEET = [
  ["hero", 34, 7, new THREE.Vector3(0, 1.24, 0), 3.5, 30, 1500, 1700],
  ["front-wide", 0, 3, new THREE.Vector3(0, 0.86, 0), 2.9, 26, 1200, 1300],
  ["front", 0, 3, head, 2.45, 26, 1200, 1300],
  ["back", 180, 3, head, 2.45, 26, 1200, 1300],
  ["side", 90, 3, head, 2.45, 26, 1200, 1300],
  ["full", 16, 4, new THREE.Vector3(0, 0.74, 0), 4.4, 24, 900, 1500],
];
for (const [name, yaw, pitch, target, dist, fov, w, h] of SHEET) {
  const r = render(yaw, pitch, target, dist, w, h, fov, LIGHT_BG);
  writePNG(`${OUT}/${name}.png`, r.W, r.H, r.out);
  console.log("wrote", name, w, h);
}
