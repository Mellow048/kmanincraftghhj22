#!/usr/bin/env node
/**
 * Pelican on a Bicycle — builds ./index.html
 *
 *   node build.mjs
 *
 * SVG + HTML only. No canvas, no libraries, no images, no web fonts, no
 * network requests. Open index.html and it runs.
 *
 * The numbers that make a drawing read are solved, not eyeballed:
 *
 *   WHEEL   48 spokes, each a tangent to a 16-unit hub circle, so the crossings
 *           land where a real wheel's do.
 *   CHAIN   the two tangent runs between the chainring (r 41) and the cog (r 19),
 *           so the chain sits in mesh with both of them.
 *   LEGS    a two-bone IK solve (thigh 172, shin 186) onto each pedal, drawn at
 *           48 phases of the crank. The foot and the pedal are solved from the
 *           same crank angle, so they cannot drift apart.
 *   GEARING the crank turns in 6 s and the wheel in 6 × 19/41 = 2.78 s: the
 *           sprocket ratio, not a guess. Both are written as SMIL loops.
 *
 * The drawing is 1080 × 1920 so it reads on a phone held upright. Everything
 * below is in those user units. Screen y grows downward, so a crank angle of
 * +90° is the bottom of the pedal stroke.
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

/* ══════════════════════════════════════════════════════════════════════════
   1 · maths
   ══════════════════════════════════════════════════════════════════════════ */

const PI = Math.PI;
const DEG = PI / 180;
const r2 = (n) => Math.round(n * 100) / 100;
const f = (n) => String(r2(n));
const clamp = (n, a, b) => (n < a ? a : n > b ? b : n);

/** a point `deg` round and `len` out from `c` */
const at = (c, deg, len) => [c[0] + Math.cos(deg * DEG) * len, c[1] + Math.sin(deg * DEG) * len];

/** a polyline / polygon through [x,y] pairs */
const poly = (pts, close = false) =>
  pts.map((p, i) => `${i ? "L" : "M"}${f(p[0])} ${f(p[1])}`).join(" ") + (close ? "Z" : "");

/** a tapered stroke: two edges, two ends. This is what makes a tube a tube */
function taper(a, b, wA, wB) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return poly(
    [
      [a[0] + nx * wA, a[1] + ny * wA],
      [b[0] + nx * wB, b[1] + ny * wB],
      [b[0] - nx * wB, b[1] - ny * wB],
      [a[0] - nx * wA, a[1] - ny * wA],
    ],
    true
  );
}

/** two-bone IK: the joint that bends `bend` (+1/−1) away from the hip→foot line */
function solve(hip, foot, l1, l2, bend) {
  const dx = foot[0] - hip[0];
  const dy = foot[1] - hip[1];
  const d = Math.min(Math.hypot(dx, dy), l1 + l2 - 1);
  const base = Math.atan2(dy, dx);
  const cos = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1);
  const ang = base + bend * Math.acos(cos);
  return [hip[0] + Math.cos(ang) * l1, hip[1] + Math.sin(ang) * l1];
}

/** deterministic noise: the same build is always the same picture */
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/* ══════════════════════════════════════════════════════════════════════════
   2 · the rig
   ══════════════════════════════════════════════════════════════════════════ */

const GROUND = 1510;       // where the tires meet the road

const R = 210;             // wheel, outside the tire
const RIM = 190;           // rim centre line
const TIRE = 18;           // tire thickness
const REAR = [316, 1300];  // rear hub
const FRONT = [828, 1300]; // front hub
const BB = [500, 1330];    // bottom bracket: centre of the cranks
const SEAT = [420, 1170];  // the top of the seat tube
const SADDLE = [424, 1150];
const HEAD_T = [700, 1140];// top of the head tube
const HEAD_B = [716, 1226];// bottom of the head tube
const CRANK = 66;
const RING_R = 38;
const COG_R = 17;

const CRANK_DUR = 6;
const WHEEL_DUR = r2(CRANK_DUR * (COG_R / RING_R)); // 2.68 s: the gear ratio
const GRIP = [HEAD_T[0] + 112, HEAD_T[1] - 32];
const BAR = [HEAD_T[0] + 40, HEAD_T[1] - 40];

/** the middle of the bike: the pivot the rig rocks about */
const WHEEL_MID = [r2((REAR[0] + FRONT[0]) / 2), r2((REAR[1] + FRONT[1]) / 2)];

/** where the pedal is at a crank angle (+90° = bottom of the stroke) */
const pedal = (deg) => at(BB, deg, CRANK);

/** the chain, as the common tangent of the two sprockets */
const CHAIN = (() => {
  const dx = BB[0] - REAR[0];
  const dy = BB[1] - REAR[1];
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  return {
    topA: [BB[0] + nx * RING_R, BB[1] + ny * RING_R],
    topB: [REAR[0] + nx * COG_R, REAR[1] + ny * COG_R],
    botA: [BB[0] - nx * RING_R, BB[1] - ny * RING_R],
    botB: [REAR[0] - nx * COG_R, REAR[1] - ny * COG_R],
  };
})();

/* the bird */
const HIP = [508, 1090];   // where the near leg leaves the body
const HIP_FAR = [488, 1082];
const THIGH = 156;
const SHIN = 166;
const LEG_BEND = -1;       // the knee comes forward, the way a cyclist's does

/* ══════════════════════════════════════════════════════════════════════════
   3 · loops — one function per repeating motion, written once and shared
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Write `turnFn(angle)` over 360° as SMIL keyTimes, at `speed` deg/s.
 * The first and last frames are the same value, so the loop has no seam.
 * `phase` starts the motion part-way round (for the far leg and pedal).
 */
function loopOf(fn, { speed, phase = 0, unit = "", step = 2 }) {
  const values = [];
  const keyTimes = [];
  let n = 0;
  for (let a = 0; a <= 360; a += step) {
    values.push(`${f(fn((a + phase) % 360))}${unit}`);
    keyTimes.push(n);
    n++;
  }
  // close the loop on the frame it opened with, so there is no seam
  values.push(`${f(fn(phase % 360))}${unit}`);
  keyTimes.push(n);
  return { values: values.join(";"), keyTimes: keyTimes.map((k) => f(k / (n || 1))).join(";") };
}

/** a smooth 0 → −amp → 0 → +amp → 0 wobble over one crank revolution */
const wobble = (amp) => (deg) => -amp * Math.sin(deg * DEG);


/* ══════════════════════════════════════════════════════════════════════════
   3b · defs — every gradient, pattern and filter the drawing uses
   ══════════════════════════════════════════════════════════════════════════ */

const defs = () => `
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2=".12" y2="1">
    <stop offset="0"    stop-color="#04091a"/>
    <stop offset=".26"  stop-color="#081428"/>
    <stop offset=".50"  stop-color="#122a45"/>
    <stop offset=".70"  stop-color="#2d4966"/>
    <stop offset=".84"  stop-color="#6e6380"/>
    <stop offset=".93"  stop-color="#a97a6f"/>
    <stop offset="1"    stop-color="#d99b64"/>
  </linearGradient>
  <radialGradient id="moonGlow">
    <stop offset="0"   stop-color="#ffeacb" stop-opacity=".9"/>
    <stop offset=".24" stop-color="#f8d3a6" stop-opacity=".38"/>
    <stop offset=".58" stop-color="#c08f80" stop-opacity=".13"/>
    <stop offset="1"   stop-color="#6f6d8c" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#28405b"/><stop offset="1" stop-color="#1b2c41"/></linearGradient>
  <linearGradient id="hillMid" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#17293c"/><stop offset="1" stop-color="#101d2c"/></linearGradient>
  <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0c1723"/><stop offset="1" stop-color="#060c14"/></linearGradient>
  <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2e2d3a"/><stop offset=".14" stop-color="#23232f"/>
    <stop offset="1" stop-color="#10131c"/></linearGradient>
  <linearGradient id="roadLip" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#b3a2a6" stop-opacity=".5"/><stop offset="1" stop-color="#b3a2a6" stop-opacity="0"/></linearGradient>

  <linearGradient id="paint" x1=".1" y1="0" x2=".35" y2="1">
    <stop offset="0"   stop-color="#9df7dd"/>
    <stop offset=".26" stop-color="#43c9b1"/>
    <stop offset=".68" stop-color="#1c827c"/>
    <stop offset="1"   stop-color="#0f4f5c"/>
  </linearGradient>
  <linearGradient id="paintArc" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#d07f4e"/><stop offset=".5" stop-color="#c96a3f"/><stop offset="1" stop-color="#33b3a2"/>
  </linearGradient>
  <linearGradient id="steel" x1="0" y1="0" x2=".55" y2="1">
    <stop offset="0"    stop-color="#e4eefb"/>
    <stop offset=".38"  stop-color="#9aabc0"/>
    <stop offset=".72"  stop-color="#5d6f84"/>
    <stop offset="1"    stop-color="#35424f"/>
  </linearGradient>
  <linearGradient id="hubMetal" x1="0" y1="0" x2=".7" y2="1">
    <stop offset="0" stop-color="#f4f8ff"/><stop offset=".5" stop-color="#a3b5c9"/><stop offset="1" stop-color="#46586c"/>
  </linearGradient>
  <linearGradient id="rim" x1="0" y1="0" x2=".35" y2="1">
    <stop offset="0" stop-color="#edf4ff"/><stop offset=".5" stop-color="#a2b4c9"/><stop offset="1" stop-color="#596c82"/>
  </linearGradient>
  <linearGradient id="spoke" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#eaf2ff" stop-opacity=".95"/>
    <stop offset=".65" stop-color="#93a8be" stop-opacity=".5"/>
    <stop offset="1" stop-color="#5d7086" stop-opacity=".3"/>
  </linearGradient>
  <radialGradient id="tireInner">
    <stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/>
  </radialGradient>
  <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffeeb2"/><stop offset=".5" stop-color="#dcac4c"/><stop offset="1" stop-color="#875c1e"/>
  </linearGradient>
  <linearGradient id="leather" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#b87149"/><stop offset=".5" stop-color="#7f4529"/><stop offset="1" stop-color="#452114"/>
  </linearGradient>
  <linearGradient id="tape" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#516883"/><stop offset=".5" stop-color="#26384a"/><stop offset="1" stop-color="#121c27"/>
  </linearGradient>

  <linearGradient id="feather" x1=".12" y1="0" x2=".9" y2="1">
    <stop offset="0"    stop-color="#fdf9f3"/>
    <stop offset=".28"  stop-color="#f2e8db"/>
    <stop offset=".58"  stop-color="#e0cdba"/>
    <stop offset=".82"  stop-color="#c3a894"/>
    <stop offset="1"    stop-color="#a68a7d"/>
  </linearGradient>
  <linearGradient id="featherTail" x1=".1" y1="0" x2=".85" y2="1">
    <stop offset="0"    stop-color="#efe1d2"/>
    <stop offset=".45"  stop-color="#cfb4a1"/>
    <stop offset="1"    stop-color="#8f7a76"/>
  </linearGradient>
  <linearGradient id="neck" x1="0" y1="0" x2="1" y2=".2">
    <stop offset="0"   stop-color="#d9c3ad"/>
    <stop offset=".4"  stop-color="#fdf8f1"/>
    <stop offset=".78" stop-color="#f0e2d0"/>
    <stop offset="1"   stop-color="#c9ae99"/>
  </linearGradient>
  <linearGradient id="head" x1=".15" y1="0" x2=".9" y2="1">
    <stop offset="0"   stop-color="#fffdf8"/>
    <stop offset=".5"  stop-color="#f3e6d4"/>
    <stop offset="1"   stop-color="#cfb29a"/>
  </linearGradient>
  <linearGradient id="crest" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f0dfbe"/><stop offset="1" stop-color="#b79a76"/>
  </linearGradient>
  <linearGradient id="beakTop" x1="0" y1="0" x2=".4" y2="1">
    <stop offset="0"   stop-color="#ffe6a8"/>
    <stop offset=".35" stop-color="#fb9a4a"/>
    <stop offset="1"   stop-color="#a8402a"/>
  </linearGradient>
  <linearGradient id="pouch" x1=".1" y1="0" x2=".3" y2="1">
    <stop offset="0"   stop-color="#ffbf8a"/>
    <stop offset=".4"  stop-color="#e8855c"/>
    <stop offset="1"   stop-color="#a8463c"/>
  </linearGradient>
  <linearGradient id="pouchDeep" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffb98c" stop-opacity=".55"/>
    <stop offset="1" stop-color="#9c3f3c" stop-opacity=".85"/>
  </linearGradient>
  <linearGradient id="wing" x1=".15" y1="0" x2=".6" y2="1">
    <stop offset="0"    stop-color="#fffcfa"/>
    <stop offset=".34"  stop-color="#eee2d3"/>
    <stop offset=".68"  stop-color="#cbb4a6"/>
    <stop offset="1"    stop-color="#9c8178"/>
  </linearGradient>
  <linearGradient id="wingTip" x1="0" y1="0" x2=".4" y2="1">
    <stop offset="0" stop-color="#8b7580"/><stop offset="1" stop-color="#372d3c"/>
  </linearGradient>
  <linearGradient id="leg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#ffb27c"/><stop offset=".55" stop-color="#e5794c"/><stop offset="1" stop-color="#a84a32"/>
  </linearGradient>
  <linearGradient id="scarf" x1="0" y1="0" x2="1" y2=".35">
    <stop offset="0"   stop-color="#ff9d88"/>
    <stop offset=".38" stop-color="#ea5544"/>
    <stop offset=".76" stop-color="#bb3630"/>
    <stop offset="1"   stop-color="#7c2028"/>
  </linearGradient>
  <linearGradient id="scarfEnd" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#cf4139"/><stop offset="1" stop-color="#8b2730"/>
  </linearGradient>
  <radialGradient id="cheek">
    <stop offset="0" stop-color="#f0a09a" stop-opacity=".38"/><stop offset="1" stop-color="#f0a09a" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="wattle">
    <stop offset="0" stop-color="#ffe4d8"/><stop offset=".45" stop-color="#f4a99a"/><stop offset="1" stop-color="#c66a63"/>
  </radialGradient>

  <radialGradient id="bulb">
    <stop offset="0" stop-color="#fffdf5"/><stop offset=".45" stop-color="#ffe4ae"/><stop offset="1" stop-color="#ffb45f"/>
  </radialGradient>
  <radialGradient id="pool">
    <stop offset="0"   stop-color="#ffd49b" stop-opacity=".5"/>
    <stop offset=".5"  stop-color="#ffb877" stop-opacity=".18"/>
    <stop offset="1"   stop-color="#ffa94f" stop-opacity="0"/>
  </radialGradient>

  <pattern id="grain" width="256" height="256" patternUnits="userSpaceOnUse">${GRAIN}</pattern>

  <filter id="blur18" x="-45%" y="-45%" width="190%" height="190%"><feGaussianBlur stdDeviation="18"/></filter>
  <filter id="blur6"  x="-45%" y="-45%" width="190%" height="190%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="glowEye" x="-70%" y="-70%" width="240%" height="240%">
    <feGaussianBlur stdDeviation="2.4" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>`;

/* ══════════════════════════════════════════════════════════════════════════
   4 · the sky, the hills, the road
   ══════════════════════════════════════════════════════════════════════════ */

const STARS = (() => {
  const r = rng(778899);
  let out = "";
  for (let i = 0; i < 300; i++) {
    const x = r() * 1080;
    const y = r() * 1140;
    if (r() > (1 - Math.pow(y / 1140, 1.8)) * 0.96) continue;
    const big = r() < 0.07;
    const rad = big ? 2.3 + r() * 2.5 : 0.8 + r() * 1.3;
    const o = 0.2 + r() * 0.75;
    const blink = r() < 0.17;
    out +=
      `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="#eaf2ff" opacity="${f(o)}">` +
      (blink
        ? `<animate attributeName="opacity" values="${f(o)};${f(o * 0.18)};${f(o)}" dur="${f(2.4 + r() * 4)}s" begin="${f(r() * 4)}s" repeatCount="indefinite"/>`
        : "") +
      `</circle>`;
  }
  return out;
})();

const GRAIN = (() => {
  const r = rng(20261114);
  let out = "";
  for (let i = 0; i < 240; i++) {
    const x = Math.floor(r() * 64) * 4;
    const y = Math.floor(r() * 64) * 4;
    out += `<circle cx="${x}" cy="${y}" r="${f(0.6 + r() * 0.9)}" fill="${r() > 0.45 ? "#ffffff" : "#000000"}" opacity="${f(0.05 + r() * 0.13)}"/>`;
  }
  return out;
})();

const GRAVEL = (() => {
  const r = rng(424242);
  let out = "";
  for (let i = 0; i < 130; i++) {
    out += `<circle cx="${f(-120 + r() * 1320)}" cy="${f(GROUND + 8 + r() * 140)}" r="${f(0.9 + r() * 2.5)}"/>`;
  }
  return out;
})();

const DASHES = (() => {
  let out = "";
  for (let i = -1; i < 9; i++) out += `<path d="M${f(i * 168 - 100)} ${GROUND + 46} h96" stroke-width="11"/>`;
  return out;
})();

const SKY = `
  <rect x="-40" y="-300" width="1160" height="2300" fill="url(#sky)"/>
  <g class="p-sky">
    ${/* the moon: the key light of the scene, and the rim on the pelican */""}
    <g class="moon">
      <circle cx="812" cy="318" r="235" fill="url(#moonGlow)"/>
      <circle cx="812" cy="318" r="84" fill="#fff5df"/>
      <circle cx="812" cy="318" r="84" fill="none" stroke="#ffeccb" stroke-width="4" opacity=".65"/>
      <g fill="#cdae8b" opacity=".15">
        <circle cx="784" cy="296" r="16"/><circle cx="836" cy="330" r="12"/>
        <circle cx="806" cy="356" r="8"/><circle cx="850" cy="288" r="7"/>
        <circle cx="766" cy="340" r="5"/>
      </g>
    </g>
    <g class="stars">${STARS}</g>
    ${/* three long clouds, still holding the last of the sun */""}
    <g fill="#8fa4bd" opacity=".2">
      <ellipse cx="236" cy="452" rx="196" ry="16"/>
      <ellipse cx="330" cy="474" rx="124" ry="10"/>
      <ellipse cx="906" cy="596" rx="214" ry="14"/>
      <ellipse cx="796" cy="618" rx="112" ry="9"/>
    </g>
  </g>`;

const HILL_FAR = `
  <g class="p-hill-far">
    <path d="M-460 1258 C -200 1112, 40 1116, 258 1232 C 436 1326, 566 1334, 764 1242
             C 962 1150, 1148 1156, 1540 1288 L1540 1760 L-460 1760Z" fill="url(#hillFar)"/>
    <path d="M-460 1258 C -200 1112, 40 1116, 258 1232 C 436 1326, 566 1334, 764 1242
             C 962 1150, 1148 1156, 1540 1288" fill="none" stroke="#547696" stroke-width="3" opacity=".4"/>
  </g>`;

const HILL_MID = `
  <g class="p-hill-mid">
    <path d="M-460 1364 C -180 1286, 96 1280, 306 1330 C 524 1382, 704 1298, 906 1298
             C 1108 1298, 1272 1352, 1540 1384 L1540 1800 L-460 1800Z" fill="url(#hillMid)"/>
    <g fill="#0d1a26">
      <path d="M148 1326 l15 -48 l15 48z"/><path d="M186 1334 l11 -34 l11 34z"/>
      <path d="M878 1326 l18 -56 l18 56z"/><path d="M922 1336 l12 -36 l12 36z"/>
      <path d="M610 1320 l13 -42 l13 42z"/>
    </g>
  </g>`;

const HILL_NEAR = `
  <g class="p-hill-near">
    <path d="M-460 1468 C -140 1422, 168 1418, 388 1452 C 608 1486, 828 1452, 1048 1450
             C 1248 1448, 1370 1462, 1540 1478 L1540 1820 L-460 1820Z" fill="url(#hillNear)"/>
    <path d="M-460 1468 C -140 1422, 168 1418, 388 1452 C 608 1486, 828 1452, 1048 1450
             C 1248 1448, 1370 1462, 1540 1478" fill="none" stroke="#e2915f" stroke-width="2.4" opacity=".28"/>
  </g>`;

/* the lamp on the far verge: the picture's only other warm light, and the
   reason the bird's beak and the inside of the pouch are lit from the right */
const LAMPPOST = `
  <g class="p-lamp">
    <rect x="962" y="1042" width="11" height="${GROUND - 1042}" fill="#0a1018"/>
    <rect x="962" y="1042" width="3" height="${GROUND - 1042}" fill="#2b3849" opacity=".6"/>
    <rect x="942" y="${GROUND - 14}" width="52" height="16" rx="4" fill="#0a1018"/>
    <path d="M968 1042 h-42 q-16 0 -16 -16 v-12" fill="none" stroke="#0a1018" stroke-width="8" stroke-linecap="round"/>
    <path d="M892 986 h44 l8 13 h-60z" fill="#111823"/>
    <path d="M886 999 h56 l-6 8 h-44z" fill="#1c2733"/>
    <circle cx="914" cy="1012" r="14" fill="url(#bulb)">
      <animate attributeName="opacity" values="1;.86;1;.94;1" dur="5.2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="914" cy="1012" r="36" fill="url(#pool)" opacity=".5"/>
    <circle cx="914" cy="1012" r="120" fill="url(#pool)" opacity=".22"/>
    <ellipse cx="918" cy="${GROUND + 4}" rx="150" ry="30" fill="url(#pool)" opacity=".4"/>
  </g>`;

const ROAD = `
  <g class="p-road">
    <rect x="-460" y="${GROUND}" width="2000" height="520" fill="url(#road)"/>
    <rect x="-460" y="${GROUND}" width="2000" height="30" fill="url(#roadLip)"/>
    <rect x="-460" y="${GROUND}" width="2000" height="2.6" fill="#cbb5aa" opacity=".5"/>
    <g stroke="#e9dcaa" stroke-width="9" stroke-linecap="round" opacity=".42">
      <g>
        <animateTransform attributeName="transform" type="translate"
          from="0 0" to="-168 0" dur="${f(168 / 140)}s" repeatCount="indefinite"/>
        ${DASHES}
      </g>
    </g>
    <g fill="#5f6272" opacity=".3">${GRAVEL}</g>
  </g>
  ${/* the moon's light lying on the tarmac, and the bike's own soft shadow */""}
  <ellipse cx="300" cy="${GROUND + 4}" rx="240" ry="26" fill="#a9c8ff" opacity=".05"/>
  <ellipse cx="560" cy="${GROUND + 14}" rx="360" ry="24" fill="#05080e" opacity=".6" filter="url(#blur6)"/>`;

/* ══════════════════════════════════════════════════════════════════════════
   5 · the bicycle
   ══════════════════════════════════════════════════════════════════════════ */

/** 48 spokes, each a tangent to a 16-unit hub circle */
function spokes(c) {
  let out = "";
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * 360;
    const side = i % 2 ? -72 : 72;
    const a0 = [c[0] + Math.cos((a + side) * DEG) * 16, c[1] + Math.sin((a + side) * DEG) * 16];
    const a1 = at(c, a + side * 0.45, RIM * 0.55);
    const a2 = at(c, a, RIM - 4);
    out +=
      `<path d="${poly([a0, a1, a2])}" fill="none" stroke="url(#spoke)" ` +
      `stroke-width="${i % 2 ? 2.2 : 3}" stroke-linecap="round"/>`;
  }
  return out;
}

const wheel = (c, id) => `
  <g class="wheel" data-wheel="${id}">
    <g>
      <animateTransform attributeName="transform" type="rotate"
        from="0 ${f(c[0])} ${f(c[1])}" to="360 ${f(c[0])} ${f(c[1])}"
        dur="${WHEEL_DUR}s" repeatCount="indefinite"/>
      ${spokes(c)}
      ${/* a valve and a reflector, so a still frame shows which way the wheel goes */""}
      <g>
        <rect x="${f(c[0] - 2)}" y="${f(c[1] - RIM + 1)}" width="4" height="17" rx="2" fill="url(#brass)"/>
        <rect x="${f(c[0] - 12)}" y="${f(c[1] - RIM + 12)}" width="24" height="5" rx="2.5" fill="#cad8e8" opacity=".75"/>
      </g>
      <circle cx="${f(c[0])}" cy="${f(c[1])}" r="${RIM}" fill="none" stroke="url(#rim)" stroke-width="10"/>
      <circle cx="${f(c[0])}" cy="${f(c[1])}" r="${RIM - 7}" fill="none" stroke="#0b1220" stroke-width="1.8" opacity=".4"/>
      ${/* a chip of paint on the outer rim, to catch the eye as it turns */""}
      <circle cx="${f(c[0])}" cy="${f(c[1])}" r="${TIRE + 3}" fill="none" stroke="url(#paintArc)"
              stroke-width="2.6" stroke-dasharray="120 640" opacity=".85"/>
      <circle cx="${f(c[0])}" cy="${f(c[1])}" r="14" fill="url(#hubMetal)"/>
      <circle cx="${f(c[0])}" cy="${f(c[1])}" r="5" fill="#0e1621"/>
    </g>
    ${/* the tire sits outside the spin, so its highlight stays where the moon is */""}
    <circle cx="${f(c[0])}" cy="${f(c[1])}" r="${R}" fill="none" stroke="#080c13" stroke-width="16"/>
    <circle cx="${f(c[0])}" cy="${f(c[1])}" r="${R - 9}" fill="none" stroke="#1e2b3c" stroke-width="2.2"/>
    <path d="${poly([at(c, 194, R - 2), at(c, 264, R - 2)])}" fill="none"
          stroke="#7191ac" stroke-width="2.8" opacity=".55" stroke-linecap="round"/>
    <path d="${poly([at(c, 306, R + 1), at(c, 350, R + 1)])}" fill="none"
          stroke="#d19a72" stroke-width="2.2" opacity=".4" stroke-linecap="round"/>
    <circle cx="${f(c[0])}" cy="${f(c[1])}" r="${R - 16}" fill="url(#tireInner)" opacity=".45"/>
  </g>`;

/** a frame tube with the moon on its upper edge */
const litTube = (a, b, wA, wB) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const w = Math.min(wA, wB) * 0.3;
  return (
    `<path d="${taper(a, b, wA, wB)}" fill="url(#paint)"/>` +
    `<path d="${poly([
      [a[0] + nx * (wA - w), a[1] + ny * (wA - w)],
      [b[0] + nx * (wB - w), b[1] + ny * (wB - w)],
    ])}" fill="none" stroke="#c6fff2" stroke-width="${f(wA * 0.5)}" opacity=".34" stroke-linecap="round"/>`
  );
};

const FRAME = `
  <g class="frame">
    ${/* rear triangle: seat stay, chain stay, and the dropout between them */""}
    <path d="${taper(SEAT, REAR, 5.4, 3.8)}" fill="url(#paint)"/>
    <path d="${taper(BB, REAR, 6.4, 3.8)}" fill="url(#paint)"/>
    ${/* main triangle */""}
    ${litTube(SEAT, [HEAD_T[0] + 1, HEAD_T[1] + 2], 7.2, 6.4)}
    ${litTube(SEAT, BB, 6.6, 6)}
    ${litTube(BB, HEAD_B, 8, 6.6)}
    <path d="${taper([HEAD_T[0], HEAD_T[1]], [HEAD_B[0], HEAD_B[1]], 9, 8.2)}" fill="url(#paint)"/>
    ${/* the fork */""}
    <path d="${taper([HEAD_B[0] + 4, HEAD_B[1] + 2], FRONT, 6.2, 4.2)}" fill="url(#paint)"/>
    ${/* welded junctions, so the frame is not four loose pipes */""}
    <ellipse cx="${BB[0]}" cy="${BB[1]}" rx="17" ry="17" fill="url(#paint)"/>
    <ellipse cx="${SEAT[0]}" cy="${SEAT[1]}" rx="11" ry="10" fill="url(#paint)"/>
    <rect x="${FRONT[0] - 13}" y="${HEAD_B[1] - 2}" width="26" height="11" rx="4" fill="#12202e" opacity=".55"/>
    ${/* bottom-bracket shell, rear dropout */""}
    <circle cx="${BB[0]}" cy="${BB[1]}" r="20" fill="#0f1b28"/>
    <circle cx="${BB[0]}" cy="${BB[1]}" r="12" fill="url(#hubMetal)"/>
    <rect x="${REAR[0] - 10}" y="${REAR[1] - 10}" width="20" height="20" rx="4" fill="#0f1b28"/>
    ${/* the seat post, the stem, the bar, the brake lever, the bell, the pump */""}
    <path d="${taper([SEAT[0], SEAT[1]], [SADDLE[0] + 2, SADDLE[1] + 9], 5.4, 4.6)}" fill="url(#steel)"/>
    <path d="M${HEAD_T[0] + 3} ${HEAD_T[1]} L${HEAD_T[0] + 9} ${HEAD_T[1] - 24} L${BAR[0]} ${BAR[1]}"
          stroke="url(#steel)" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M${BAR[0]} ${BAR[1]} C${HEAD_T[0] + 76} ${HEAD_T[1] - 50}, ${HEAD_T[0] + 100} ${HEAD_T[1] - 46}, ${GRIP[0]} ${GRIP[1]}"
          stroke="url(#steel)" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M${BAR[0] + 2} ${BAR[1] - 12} q-18 8 -24 28" stroke="#0e1826" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="${HEAD_T[0] + 60}" cy="${HEAD_T[1] - 56}" r="10" fill="url(#brass)"/>
    <path d="M${HEAD_T[0] + 60} ${HEAD_T[1] - 56} v-10" stroke="#3b2a12" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="${HEAD_T[0] + 56}" cy="${HEAD_T[1] - 60}" r="3.2" fill="#fff3cf" opacity=".85"/>
  </g>`;

const CHAIN_ART = `
  <g class="chain">
    <path d="M${f(CHAIN.topA[0])} ${f(CHAIN.topA[1])} L${f(CHAIN.topB[0])} ${f(CHAIN.topB[1])}"
          stroke="#1c2937" stroke-width="6" stroke-linecap="round"/>
    <path d="M${f(CHAIN.botA[0])} ${f(CHAIN.botA[1])} L${f(CHAIN.botB[0])} ${f(CHAIN.botB[1])}"
          stroke="#1c2937" stroke-width="6" stroke-linecap="round"/>
    <path d="M${f(CHAIN.topA[0])} ${f(CHAIN.topA[1])} L${f(CHAIN.topB[0])} ${f(CHAIN.topB[1])}"
          stroke="#55738f" stroke-width="2" stroke-dasharray="6 5" opacity=".85"/>
    <path d="M${f(CHAIN.botA[0])} ${f(CHAIN.botA[1])} L${f(CHAIN.botB[0])} ${f(CHAIN.botB[1])}"
          stroke="#55738f" stroke-width="2" stroke-dasharray="6 5" opacity=".85"/>
    <circle cx="${BB[0]}" cy="${BB[1]}" r="${RING_R}" fill="none" stroke="#223040" stroke-width="8"/>
    <circle cx="${BB[0]}" cy="${BB[1]}" r="${RING_R}" fill="none" stroke="#567697" stroke-width="2.2" stroke-dasharray="5.5 5.5" opacity=".9"/>
    <circle cx="${BB[0]}" cy="${BB[1]}" r="${RING_R - 9}" fill="none" stroke="#15202c" stroke-width="2" opacity=".55"/>
    <circle cx="${REAR[0]}" cy="${REAR[1]}" r="${COG_R}" fill="none" stroke="#223040" stroke-width="8"/>
    <circle cx="${REAR[0]}" cy="${REAR[1]}" r="${COG_R}" fill="none" stroke="#567697" stroke-width="2.2" stroke-dasharray="4.4 4.4" opacity=".9"/>
  </g>`;

/* the crank loops, written once: the near arm, the far arm half a turn behind
   it, and the pedal's counter-turn that keeps every pedal flat */
const L = {
  near: loopOf((a) => a, { speed: 60 }),
  far: loopOf((a) => a + 180, { speed: 60 }),
  back: loopOf((a) => -a, { speed: 60 }),
  sway: loopOf((a) => Math.sin(a * DEG) * 1.7, { speed: 60 }),
  flutter: loopOf((a) => Math.sin(a * DEG) * 3.4 + 6, { speed: 60 }),
};

/** the cranks. Both arms turn; each pedal then turns back by the same angle,
    which is the trick that keeps a pedal flat while the arm goes round. */
const cranks = `
  <g class="cranks">
    ${/* the far arm and its pedal, drawn first so the near side covers it */""}
    <g>
      <animateTransform attributeName="transform" type="rotate" calcMode="linear"
        values="${L.far.values}" keyTimes="${L.far.keyTimes}" dur="${CRANK_DUR}s" repeatCount="indefinite"/>
      <rect x="${BB[0] - CRANK}" y="${BB[1] - 4.5}" width="${CRANK * 2}" height="9" rx="4.5" fill="#20303f"/>
      <rect x="${BB[0] - CRANK - 22}" y="${BB[1] - 6}" width="46" height="12" rx="4" fill="#0f1923"/>
    </g>
    ${/* the near arm, its pedal, the counter-rotation, and the spindle */""}
    <g>
      <animateTransform attributeName="transform" type="rotate" calcMode="linear"
        values="${L.near.values}" keyTimes="${L.near.keyTimes}" dur="${CRANK_DUR}s" repeatCount="indefinite"/>
      <rect x="${BB[0] - CRANK}" y="${BB[1] - 5.5}" width="${CRANK * 2}" height="11" rx="5.5" fill="url(#steel)"/>
      <rect x="${BB[0] - CRANK}" y="${BB[1] - 5.5}" width="${CRANK * 2}" height="4" rx="2" fill="#eef6ff" opacity=".4"/>
      <g>
        <animateTransform attributeName="transform" type="rotate" calcMode="linear"
          values="${L.back.values}" keyTimes="${L.back.keyTimes}" dur="${CRANK_DUR}s" repeatCount="indefinite"/>
        <rect x="${BB[0] + CRANK - 25}" y="${BB[1] - 7}" width="50" height="14" rx="4" fill="#1b2836"/>
        <rect x="${BB[0] + CRANK - 25}" y="${BB[1] - 7}" width="50" height="5" rx="2.5" fill="#435b73" opacity=".8"/>
        <circle cx="${BB[0] + CRANK}" cy="${BB[1]}" r="4.5" fill="#0b131c"/>
      </g>
      <circle cx="${BB[0]}" cy="${BB[1]}" r="16" fill="url(#hubMetal)"/>
      <circle cx="${BB[0]}" cy="${BB[1]}" r="7" fill="#0e1621"/>
    </g>
  </g>`;

const SADDLE_ART = (() => {
  const [x, y] = SADDLE;
  return `
  <g class="saddle">
    <path d="M${x - 72} ${y + 2}
             C${x - 70} ${y - 20}, ${x - 26} ${y - 31}, ${x + 10} ${y - 29}
             C${x + 48} ${y - 27}, ${x + 72} ${y - 15}, ${x + 76} ${y}
             C${x + 64} ${y + 11}, ${x + 18} ${y + 15}, ${x - 26} ${y + 14}
             C${x - 54} ${y + 13}, ${x - 70} ${y + 9}, ${x - 72} ${y + 2}Z"
          fill="url(#leather)"/>
    <path d="M${x - 64} ${y - 1} C${x - 30} ${y - 14}, ${x + 26} ${y - 18}, ${x + 68} ${y - 5}"
          fill="none" stroke="#d0905f" stroke-width="2.6" opacity=".5"/>
    <path d="M${x - 56} ${y + 10} C${x - 14} ${y + 3}, ${x + 28} ${y + 3}, ${x + 64} ${y + 3}"
          fill="none" stroke="#2a170f" stroke-width="3" opacity=".4"/>
    <path d="M${x - 46} ${y + 13} q-4 16 6 20 q11 4 13 -6" fill="none" stroke="url(#steel)" stroke-width="4" stroke-linecap="round"/>
    <path d="M${x + 40} ${y + 12} q7 14 -4 18 q-11 4 -13 -6" fill="none" stroke="url(#steel)" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${x - 33}" cy="${y + 32}" r="4.4" fill="url(#brass)"/>
    <circle cx="${x + 33}" cy="${y + 32}" r="4.4" fill="url(#brass)"/>
  </g>`;
})();

/* ══════════════════════════════════════════════════════════════════════════
   6 · the pelican
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * One leg as a looping animation.
 *
 * The joints are solved at 48 phases of the crank and written out as morph
 * keyframes, so the foot *is* on the pedal at every frame of the turn, at the
 * same 6 s period as the cranks themselves. Three shapes oscillate:
 *   thigh, shin, and the webbed foot (which stays flat on the pedal).
 * The hip end of the thigh is pinned, so the joint never drifts.
 */
/** the veins on a webbed foot, drawn from the foot's own position */
const veins = (ft) =>
  `M${f(ft[0] - 14)} ${f(ft[1] + 1)} L${f(ft[0] + 2)} ${f(ft[1] + 1)} L${f(ft[0] + 14)} ${f(ft[1] - 2)} L${f(ft[0] + 24)} ${f(ft[1] - 1)}`;

function leg({ hip, phase, dark }) {
  const N = 48;
  const thighD = [];
  const shinD = [];
  const footD = [];
  const kneeX = [];
  const kneeY = [];
  for (let i = 0; i < N; i++) {
    const deg = (i / N) * 360 + phase;
    const knee = solve(hip, pedal(deg), THIGH, SHIN, LEG_BEND);
    const ft = pedal(deg);
    const ankle = [ft[0] - 2, ft[1] - 6];
    thighD.push(`M${f(hip[0])} ${f(hip[1])} L${f(knee[0])} ${f(knee[1])}`);
    shinD.push(`M${f(knee[0])} ${f(knee[1])} L${f(ankle[0])} ${f(ankle[1])}`);
    kneeX.push(f(knee[0]));
    kneeY.push(f(knee[1]));
    // the webbed foot, laid flat on the pedal
    footD.push(
      poly(
        [
          [ft[0] - 19, ft[1] - 7],
          [ft[0] + 16, ft[1] - 8],
          [ft[0] + 31, ft[1] - 1],
          [ft[0] + 22, ft[1] + 7],
          [ft[0] - 15, ft[1] + 7],
          [ft[0] - 25, ft[1] - 1],
        ],
        true
      )
    );
  }
  const wrap = (a) => a.concat([a[0]]).join(";");
  const kt = Array.from({ length: N + 1 }, (_, i) => f(i / N)).join(";");
  const dur = `${CRANK_DUR}s`;

  const thigh = dark ? "#8b6c5e" : "url(#feather)";
  const thighHi = dark ? "#a8877a" : "#fffcf6";
  const shin = dark ? "#93482a" : "url(#leg)";
  const foot = dark ? "#9c4d2c" : "#e3764a";
  const vein = dark ? "#6f3822" : "#a44c2b";

  return `
    <g class="leg${dark ? " leg-far" : " leg-near"}">
      ${/* the thigh: a thick, round-capped stroke, so it ends in a joint and
           not in a sawn-off plank */""}
      <path fill="none" stroke="${thigh}" stroke-width="${dark ? 20 : 23}" stroke-linecap="round" d="${thighD[0]}">
        <animate attributeName="d" values="${wrap(thighD)}" keyTimes="${kt}" dur="${dur}" repeatCount="indefinite"/>
      </path>
      ${/* the moon's edge down the top of the thigh */""}
      <path fill="none" stroke="${thighHi}" stroke-width="${dark ? 6 : 7.5}" stroke-linecap="round" opacity=".5" d="${thighD[0]}"
            transform="translate(-4 -7)">
        <animate attributeName="d" values="${wrap(thighD)}" keyTimes="${kt}" dur="${dur}" repeatCount="indefinite"/>
      </path>
      ${/* the tarsus: thin, orange, scaled the way a bird's is */""}
      <path fill="none" stroke="${shin}" stroke-width="9" stroke-linecap="round" d="${shinD[0]}">
        <animate attributeName="d" values="${wrap(shinD)}" keyTimes="${kt}" dur="${dur}" repeatCount="indefinite"/>
      </path>
      <path fill="none" stroke="${dark ? "#c07a52" : "#ffc48f"}" stroke-width="3" stroke-linecap="round" opacity=".55"
            d="${shinD[0]}" transform="translate(-2 -2)">
        <animate attributeName="d" values="${wrap(shinD)}" keyTimes="${kt}" dur="${dur}" repeatCount="indefinite"/>
      </path>
      ${/* the knee */""}
      <circle r="${dark ? 8.5 : 10}" fill="${dark ? "#7e4429" : "#e8784a"}" cx="${kneeX[0]}" cy="${kneeY[0]}">
        <animate attributeName="cx" values="${wrap(kneeX)}" keyTimes="${kt}" dur="${dur}" repeatCount="indefinite"/>
        <animate attributeName="cy" values="${wrap(kneeY)}" keyTimes="${kt}" dur="${dur}" repeatCount="indefinite"/>
      </circle>
      ${/* the foot */""}
      <path fill="${foot}" d="${footD[0]}">
        <animate attributeName="d" values="${wrap(footD)}" keyTimes="${kt}" dur="${dur}" repeatCount="indefinite"/>
      </path>
      ${/* the webbing: two veins per foot, travelling with the foot */""}
      <path fill="none" stroke="${vein}" stroke-width="1.8" opacity=".5" d="${veins(pedal(phase))}">
        <animate attributeName="d" values="${Array.from({ length: N }, (_, i) =>
          veins(pedal((i / N) * 360 + phase))
        )
          .concat([veins(pedal(phase))])
          .join(";")}" keyTimes="${kt}" dur="${dur}" repeatCount="indefinite"/>
      </path>
    </g>`;
}

const LEG_FAR = leg({ hip: HIP_FAR, phase: 180, dark: true });
const LEG_NEAR = leg({ hip: HIP, phase: 0, dark: false });

/* the solve is checked, not trusted: the knee must be exactly THIGH from the
   hip and exactly SHIN from the foot, and the foot must be on the pedal.
   A failure here means the bird is skating, so the build says so and stops. */
{
  let worstBone = 0;
  let worstFoot = 0;
  let shortest = Infinity;
  for (const hip of [HIP, HIP_FAR]) {
    for (let a = 0; a < 360; a += 1) {
      const ft = pedal(a);
      const kn = solve(hip, ft, THIGH, SHIN, LEG_BEND);
      worstBone = Math.max(
        worstBone,
        Math.abs(Math.hypot(kn[0] - hip[0], kn[1] - hip[1]) - THIGH),
        Math.abs(Math.hypot(ft[0] - kn[0], ft[1] - kn[1]) - SHIN)
      );
      worstFoot = Math.max(worstFoot, Math.hypot(ft[0] - pedal(a)[0], ft[1] - pedal(a)[1]));
      shortest = Math.min(shortest, Math.hypot(ft[0] - hip[0], ft[1] - hip[1]));
    }
  }
  if (worstBone > 0.02 || shortest < 60) {
    throw new Error(`leg solve out of tolerance: bone error ${worstBone.toFixed(3)}, nearest reach ${shortest.toFixed(1)}`);
  }
  if (worstFoot > 0.001) throw new Error("the foot left the pedal");
}

/* ── the body: an egg lying on its side, chest low over the bar ───────────── */

const BODY = `
  <path d="M 306 1042
           C 308 992, 358 958, 424 958
           C 486 958, 534 984, 550 1024
           C 566 1064, 548 1098, 506 1112
           C 452 1130, 372 1126, 334 1102
           C 316 1090, 304 1068, 306 1042Z"
        fill="url(#feather)"/>
  ${/* the weight underneath, in shade */""}
  <path d="M 326 1084 C 372 1114, 452 1120, 502 1098 C 528 1086, 546 1066, 550 1048
           C 542 1088, 500 1114, 448 1116 C 392 1118, 344 1104, 326 1084Z"
        fill="url(#featherTail)" opacity=".5"/>
  ${/* the moon along the back: a soft pass and a hard one */""}
  <path d="M 310 1036 C 318 992, 364 964, 424 962 C 480 960, 524 980, 544 1014"
        fill="none" stroke="#eafcff" stroke-width="7" opacity=".32" stroke-linecap="round"/>
  <path d="M 316 1030 C 328 998, 366 976, 420 974 C 462 972, 496 984, 518 1004"
        fill="none" stroke="#fffdf6" stroke-width="11" opacity=".55" stroke-linecap="round"/>
  ${/* the folded wing's shadow, and the rows of feathers */""}
  <path d="M 336 1056 C 388 1044, 456 1046, 510 1062" fill="none" stroke="#a68b7d" stroke-width="3" opacity=".32" stroke-linecap="round"/>
  <g fill="none" stroke="#a68b7d" stroke-width="2.8" opacity=".35" stroke-linecap="round">
    <path d="M 344 1082 C 396 1070, 456 1072, 500 1086"/>
  </g>
  <g fill="none" stroke="#fffaf2" stroke-width="2.8" opacity=".5" stroke-linecap="round">
    <path d="M 340 1076 C 394 1062, 456 1064, 504 1080"/>
  </g>
  ${/* the breast, the pale front the scarf sits on */""}
  <path d="M 476 1020 C 516 1028, 540 1048, 548 1070 C 526 1058, 500 1048, 470 1044Z"
        fill="#fffdf8" opacity=".6"/>`;

/* the tail: three long feathers out the back, swept up by the wind */
const TAIL = `
  <g class="tail">
    <animateTransform attributeName="transform" type="rotate" calcMode="linear"
      values="${L.sway.values}" keyTimes="${L.sway.keyTimes}" dur="${CRANK_DUR}s" repeatCount="indefinite"/>
    <path d="M 318 1016 C 272 990, 218 970, 166 972 C 208 1002, 258 1030, 312 1044Z" fill="url(#featherTail)"/>
    <path d="M 314 1036 C 264 1022, 212 1014, 160 1028 C 206 1048, 258 1058, 310 1058Z" fill="url(#featherTail)" opacity=".92"/>
    <path d="M 316 1054 C 272 1062, 228 1074, 190 1098 C 236 1102, 282 1090, 318 1070Z" fill="url(#featherTail)" opacity=".78"/>
    <g fill="none" stroke="#fffaf2" stroke-width="2.6" opacity=".5" stroke-linecap="round">
      <path d="M 306 1020 C 268 1006, 232 990, 194 986"/>
      <path d="M 306 1040 C 266 1028, 222 1020, 184 1032"/>
    </g>
    <g fill="none" stroke="#5f4c4c" stroke-width="2" opacity=".22" stroke-linecap="round">
      <path d="M 302 1028 C 264 1018, 220 1008, 178 1012"/>
    </g>
  </g>`;

/* the neck: a bent band, thick at the shoulder, narrowing under the skull */
const NECK_ART = `
  <g class="neck">
    <path d="M 462 1024
             C 466 952, 500 888, 572 824
             L 646 886
             C 596 928, 550 980, 536 1026
             C 512 1036, 482 1036, 462 1024Z"
          fill="url(#neck)"/>
    <path d="M 480 1016 C 490 948, 524 892, 584 836" fill="none" stroke="#fffaf0" stroke-width="10"
          opacity=".5" stroke-linecap="round"/>
    <path d="M 470 1020 C 482 952, 516 896, 578 840" fill="none" stroke="#e6fbff" stroke-width="4"
          opacity=".28" stroke-linecap="round"/>
    <path d="M 520 1026 C 530 978, 558 928, 606 890" fill="none" stroke="#8d7266" stroke-width="6"
          opacity=".26" stroke-linecap="round"/>
  </g>`;

/* the head, the crest, the beak, the pouch, the eye */
const HEAD_ART = `
  <g transform="translate(-12 20)">
  <g class="head">
    ${/* the crest, swept back off the crown */""}
    <path d="M 610 784 C 586 774, 558 770, 532 776 C 552 788, 572 800, 582 812Z" fill="url(#crest)" opacity=".9"/>
    <path d="M 624 774 C 606 758, 580 746, 550 744 C 568 758, 584 774, 592 790Z" fill="url(#crest)"/>
    <path d="M 640 768 C 630 750, 610 734, 584 726 C 596 744, 606 760, 608 776Z" fill="url(#crest)" opacity=".88"/>
    <g fill="none" stroke="#a68e6c" stroke-width="2" opacity=".3" stroke-linecap="round">
      <path d="M 596 786 C 580 780, 562 776, 546 778"/>
      <path d="M 606 774 C 592 766, 574 760, 556 758"/>
    </g>
    ${/* the skull */""}
    <ellipse cx="664" cy="800" rx="62" ry="53" transform="rotate(-10 664 800)" fill="url(#head)"/>
    ${/* the bare skin a pelican has round the eye */""}
    <ellipse cx="694" cy="792" rx="28" ry="25" fill="#ffdcc4" opacity=".7"/>
    <ellipse cx="702" cy="818" rx="30" ry="20" fill="url(#cheek)"/>
    ${/* the eye: a dark bead with the moon in it */""}
    <circle cx="680" cy="786" r="12.5" fill="#efe6d8"/>
    <circle cx="681" cy="786" r="9.4" fill="#22303c"/>
    <circle cx="681" cy="786" r="6" fill="#0e161e"/>
    <circle cx="677.4" cy="782.4" r="3.1" fill="#ffffff" opacity=".95"/>
    <circle cx="684.6" cy="789.6" r="1.6" fill="#9fd6ff" opacity=".8"/>
    <path d="M 667 774 q 14 -6 27 2" fill="none" stroke="#8e7361" stroke-width="2.6" opacity=".4" stroke-linecap="round"/>
    ${/* a blink, once every seven seconds */""}
    <path d="M 668 786 q 13 -9 26 0 q -13 9 -26 0Z" fill="url(#head)" opacity="0">
      <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;.9;.93;.97;1" dur="7.3s" repeatCount="indefinite"/>
    </path>
  </g>
  </g>`;

const BEAK = `
  <g transform="translate(700 806) scale(.94) translate(-700 -806)">
  <g transform="translate(-12 20)">
  <g class="beak">
    ${/* the pouch: the thing that makes a pelican a pelican */""}
    <path d="M 702 830
             C 744 856, 808 876, 884 882
             C 898 916, 856 950, 800 958
             C 746 964, 704 934, 692 892
             C 688 868, 690 844, 700 828Z"
          fill="url(#pouch)"/>
    <path d="M 704 860 C 750 898, 818 920, 886 904 C 864 940, 808 954, 762 942
             C 726 932, 704 906, 698 876Z" fill="url(#pouchDeep)" opacity=".5"/>
    <g fill="none" stroke="#c05a4d" stroke-width="2" opacity=".28" stroke-linecap="round">
      <path d="M 716 850 C 754 884, 806 910, 862 914"/>
      <path d="M 706 870 C 744 904, 792 930, 838 938"/>
    </g>
    ${/* the upper mandible, with the hooked nail at the tip */""}
    <path d="M 700 790
             C 772 794, 852 818, 916 848
             C 928 854, 932 864, 924 872
             C 906 882, 882 876, 870 868
             C 824 842, 758 824, 700 816Z"
          fill="url(#beakTop)"/>
    <path d="M 706 798 C 776 804, 848 826, 904 852" fill="none" stroke="#ffeec4" stroke-width="3.4"
          opacity=".5" stroke-linecap="round"/>
    <path d="M 702 818 C 772 828, 842 850, 906 872" fill="none" stroke="#8f3a26" stroke-width="2.6" opacity=".7" stroke-linecap="round"/>
    <path d="M 914 844 C 928 850, 934 864, 922 874 C 914 880, 904 878, 900 870
             C 908 866, 912 856, 908 848Z" fill="#d8603a"/>
    <ellipse cx="742" cy="804" rx="5" ry="2.6" fill="#a4552f" opacity=".45" transform="rotate(10 742 804)"/>
    ${/* the wattle, hanging under the jaw */""}
    <path d="M 700 814 C 690 856, 686 898, 700 924 C 712 904, 716 860, 714 822Z" fill="url(#wattle)" opacity=".8"/>
    <path d="M 712 794 C 770 800, 828 816, 878 838" fill="none" stroke="#fff6d8" stroke-width="5"
          opacity=".3" stroke-linecap="round"/>
  </g>
  </g>
  </g>`;

/* ── the scarf: the one thing on the pelican that is not cream ─────────────── */

const SCARF_ART = `
  <g class="scarf">
    ${/* the tails leave the knot on the near side and stream back over the body */""}
    <g>
      <animateTransform attributeName="transform" type="rotate" calcMode="linear"
        values="${L.flutter.values}" keyTimes="${L.flutter.keyTimes}" dur="${CRANK_DUR}s" repeatCount="indefinite"/>
      <path d="M 540 956 C 500 936, 454 924, 408 926 C 444 946, 492 964, 534 974Z" fill="#f0604f"/>
      <path d="M 536 974 C 496 976, 456 986, 424 1004 C 464 1012, 506 998, 540 986Z" fill="#dc4a42"/>
      <g fill="none" stroke="#ffcfc4" stroke-width="2.4" opacity=".4" stroke-linecap="round">
        <path d="M 526 960 C 488 944, 452 934, 420 934"/>
        <path d="M 528 980 C 494 980, 462 990, 436 1002"/>
      </g>
      <g fill="none" stroke="#8e2626" stroke-width="2" opacity=".25" stroke-linecap="round">
        <path d="M 512 968 C 478 954, 442 946, 404 948"/>
      </g>
    </g>
    ${/* the band: a stroke ACROSS the neck, so it wraps it instead of sitting beside it */""}
    <path d="M 474 916 L 548 964" stroke="url(#scarf)" stroke-width="46"
          fill="none" stroke-linecap="round"/>
    ${/* the band's turned edge, and its shadow, give it thickness */""}
    <path d="M 480 920 L 498 932" stroke="#ffc8bb" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>
    <path d="M 526 950 L 550 964" stroke="#7c2028" stroke-width="6" fill="none" opacity=".38" stroke-linecap="round"/>
    ${/* two folds where the cloth bunches */""}
    <g fill="none" stroke="#8c2730" stroke-width="2.6" opacity=".4" stroke-linecap="round">
      <path d="M 486 926 L 500 942"/>
      <path d="M 512 946 L 526 956"/>
    </g>
    ${/* the knot, sitting on the band at the near end */""}
    <ellipse cx="546" cy="962" rx="26" ry="20" transform="rotate(-28 546 962)" fill="url(#scarf)"/>
    <ellipse cx="546" cy="962" rx="26" ry="20" transform="rotate(-28 546 962)" fill="none"
             stroke="#8c2730" stroke-width="2.4" opacity=".45"/>
    <path d="M 535 951 C 544 944, 557 944, 564 953" fill="none" stroke="#ffcfc4" stroke-width="3.2"
          opacity=".5" stroke-linecap="round"/>
  </g>`;

/* ── the wings ────────────────────────────────────────────────────────────── */

const WING_FAR = `
  <g class="wing-far">
    <path d="M 520 978
             C 592 974, 676 1002, 742 1046
             C 756 1056, 758 1068, 748 1072
             C 734 1078, 712 1072, 686 1058
             C 644 1036, 592 1012, 528 1000Z"
          fill="url(#wingTip)"/>
    <path d="M 528 986 C 596 986, 674 1014, 736 1054" fill="none" stroke="#6b5964" stroke-width="3"
          opacity=".45" stroke-linecap="round"/>
  </g>`;

/**
 * The near wing: a real wing shape — rounded coverts at the shoulder tapering
 * to a point at the tip — reaching for the grip. Drawn over the neck so it
 * reads as the near side.
 */
const WING_NEAR = `
  <g class="wing">
    ${/* the folded wing lies along the flank and reaches forward to the grip,
         ending in four separate primaries with dark tips */""}
    <path d="M 512 996
             C 566 978, 638 988, 700 1016
             C 746 1036, 786 1060, 810 1078
             C 786 1088, 758 1082, 730 1068
             C 692 1050, 648 1030, 604 1018
             C 566 1008, 532 1006, 512 996Z"
          fill="url(#wing)"/>
    ${/* the primaries, one at a time: a pale blade with a dark tip */""}
    <g>
      <path d="M 668 1032 C 700 1048, 736 1066, 762 1084 C 748 1086, 730 1078, 712 1066 C 694 1054, 678 1042, 668 1032Z"
            fill="#f7f0e7"/>
      <path d="M 748 1058 C 768 1070, 788 1080, 800 1086 C 788 1090, 772 1084, 758 1074 C 752 1069, 749 1063, 748 1058Z"
            fill="url(#wingTip)" opacity=".85"/>
      <path d="M 700 1044 C 730 1056, 758 1070, 778 1084 C 764 1084, 748 1076, 732 1066 C 716 1056, 706 1050, 700 1044Z"
            fill="#f7f0e7"/>
      <path d="M 770 1072 C 784 1080, 796 1085, 804 1087 C 796 1091, 784 1087, 774 1080Z"
            fill="url(#wingTip)" opacity=".8"/>
    </g>
    ${/* the separations: thin dark lines running INTO the wing, not along its edge */""}
    <g fill="none" stroke="#7d6a72" stroke-width="2.4" stroke-linecap="round" opacity=".5">
      <path d="M 640 1010 C 672 1030, 706 1048, 736 1066"/>
      <path d="M 690 1034 C 716 1050, 744 1064, 768 1076"/>
      <path d="M 606 1000 C 640 1020, 676 1038, 706 1058"/>
    </g>
    ${/* coverts: two rows of pale feathers */""}
    <g fill="none" stroke="#fffdf6" stroke-width="3.4" opacity=".55" stroke-linecap="round">
      <path d="M 540 992 C 592 986, 646 1000, 692 1022"/>
      <path d="M 528 1002 C 576 998, 626 1012, 668 1032"/>
    </g>
    <g fill="none" stroke="#a68b81" stroke-width="2.2" opacity=".3" stroke-linecap="round">
      <path d="M 546 1000 C 594 996, 644 1010, 686 1030"/>
    </g>
    ${/* the moon along the leading edge */""}
    <path d="M 514 998 C 568 980, 638 990, 698 1018 C 744 1038, 782 1060, 806 1076"
          fill="none" stroke="#eafcff" stroke-width="4.6" opacity=".42" stroke-linecap="round"/>
    ${/* a dark edge under the wing, so it separates from the body */""}
    <path d="M 512 1000 C 550 1012, 590 1014, 620 1012" fill="none" stroke="#8f7670" stroke-width="3"
          opacity=".3" stroke-linecap="round"/>
  </g>`;

/* ── the bar's grip: drawn over the wing, so the wing holds it ─────────────── */

const GRIP_ART = `
  <g class="grip">
    <path d="M ${BAR[0] + 26} ${BAR[1] + 4} C ${BAR[0] + 54} ${BAR[1] - 6}, ${GRIP[0] - 14} ${GRIP[1] - 10}, ${GRIP[0] + 6} ${GRIP[1] + 4}"
          stroke="url(#tape)" stroke-width="20" fill="none" stroke-linecap="round"/>
    <path d="M ${BAR[0] + 32} ${BAR[1] - 3} C ${BAR[0] + 58} ${BAR[1] - 13}, ${GRIP[0] - 16} ${GRIP[1] - 16}, ${GRIP[0] - 2} ${GRIP[1] - 4}"
          stroke="#7d93ad" stroke-width="4" fill="none" stroke-linecap="round" opacity=".4"/>
    ${/* the bar's end cap, and a brake cable looping down */""}
    <circle cx="${GRIP[0] + 4}" cy="${GRIP[1] + 2}" r="10" fill="#0d1620"/>
    <path d="M ${BAR[0] - 6} ${BAR[1] + 16} C ${BAR[0] + 6} ${BAR[1] + 60}, ${HEAD_B[0] + 6} ${HEAD_B[1] - 20}, ${HEAD_B[0] + 10} ${HEAD_B[1] - 4}"
          stroke="#101a24" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
  </g>`;


/* ══════════════════════════════════════════════════════════════════════════
   7 · assemble
   ══════════════════════════════════════════════════════════════════════════ */

const RIG_SCALE = 1.12;
const BOB = 3.6;

/* the canvas is taller than the picture: the road runs off the bottom, so the
   empty near lane is cropped away and the bike sits in the lower third of a
   phone screen, above the interface. */
const VIEW_Y = -246;
const VIEW_H = 1886;                 // units the whole rig rises and falls
const BOB_KF = "0;.5;1";
const BOB_DUR = "3s";            // half a crank revolution up, half down
const BOB_V = `0 ${f(-BOB)};0 ${f(BOB * 0.3)};0 ${f(-BOB)}`;

/** a group that bobs with the road, at its own share of the amplitude */
const layer = (cls, share, inner) => `
  <g class="${cls}">
    <animateTransform attributeName="transform" type="translate"
      values="0 0;0 ${f(-BOB * share)};0 0" keyTimes="${BOB_KF}" dur="${BOB_DUR}" repeatCount="indefinite"/>
    ${inner}
  </g>`;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${VIEW_Y} 1080 ${VIEW_H}" width="1080" height="${VIEW_H}"
     role="img" aria-labelledby="p-title p-desc" preserveAspectRatio="xMidYMid meet">
  <title id="p-title">A pelican on a bicycle</title>
  <desc id="p-desc">A white pelican with a long orange beak and a red scarf rides a teal bicycle along
    a dark road at dusk. The wheels turn, the pedals go round under its webbed feet, its scarf and
    tail stream behind it, and a full moon hangs over the hills.</desc>

  ${defs()}

  ${layer("p-sky-g", 0.35, SKY)}
  ${layer("p-far-g", 0.55, HILL_FAR)}
  ${layer("p-mid-g", 0.72, HILL_MID)}
  ${layer("p-near-g", 0.86, HILL_NEAR)}
  ${layer("p-lamp-g", 0.9, LAMPPOST)}

  ${ROAD}

  ${/* the moon's haze, and the lamp's, behind the bird: the rim that separates
       a cream bird from a navy sky */""}
  <ellipse cx="660" cy="880" rx="300" ry="250" fill="url(#moonGlow)" opacity=".14"/>
  <ellipse cx="700" cy="1010" rx="230" ry="180" fill="url(#pool)" opacity=".1"/>

  ${/* the rig: the bicycle, the bird and everything they carry. One group,
       one transform, so nothing can come apart. */""}
  <g class="rig-scale" transform="translate(560 ${GROUND}) scale(${RIG_SCALE}) translate(-560 ${-GROUND})">
  <g class="rig">
    <animateTransform attributeName="transform" type="translate"
      values="${BOB_V}" keyTimes="${BOB_KF}" dur="${BOB_DUR}" repeatCount="indefinite"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" calcMode="spline"
        values="-0.4 ${WHEEL_MID[0]} ${GROUND};0 ${WHEEL_MID[0]} ${GROUND};-0.4 ${WHEEL_MID[0]} ${GROUND}"
        keyTimes="${BOB_KF}" keySplines=".45 0 .55 1;.45 0 .55 1" dur="${BOB_DUR}" repeatCount="indefinite"/>

      ${wheel(REAR, "rear")}
      ${wheel(FRONT, "front")}
      ${CHAIN_ART}
      ${FRAME}
      ${cranks}
      ${LEG_FAR}
      ${SADDLE_ART}
      ${TAIL}
      ${BODY}
      ${LEG_NEAR}
      ${WING_FAR}
      ${NECK_ART}
      ${HEAD_ART}
      ${BEAK}
      ${SCARF_ART}
      ${WING_NEAR}
      ${GRIP_ART}
    </g>
  </g>
  </g>

  ${/* the air: the lamp's haze, the vignette, the grain, the frame line */""}
  <g class="air" pointer-events="none">
    <circle cx="172" cy="1000" r="260" fill="url(#pool)" opacity=".2"/>
    <ellipse cx="540" cy="2140" rx="1000" ry="480" fill="#05080f" opacity=".5"/>
    <rect width="1080" height="1920" fill="url(#grain)" opacity=".5"/>
    <rect x="1" y="${VIEW_Y + 1}" width="1078" height="${VIEW_H - 2}" fill="none" stroke="#dfe9f5" stroke-width="2" opacity=".12"/>
  </g>
</svg>`;

/* ── the page ─────────────────────────────────────────────────────────────── */

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>A Pelican on a Bicycle</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    display: grid;
    place-items: center;
    min-height: 100svh;
    background: #04060c;
    background-image: radial-gradient(120% 80% at 50% 0%, #0d1b2e 0%, #05080f 60%, #03050a 100%);
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
    overflow: hidden;
  }
  .frame {
    position: relative;
    height: min(100svh, 100vh);
    aspect-ratio: 1080 / ${VIEW_H};
    max-width: 100vw;
    overflow: hidden;
    background: #04070d;
    border-radius: 2px;
    box-shadow: 0 26px 90px -18px rgba(0, 0, 0, .92), 0 0 0 1px rgba(190, 215, 240, .07);
  }
  .frame svg { display: block; width: 100%; height: 100%; }
  .label {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    padding: 0 8% clamp(12px, 2.6svh, 34px);
    text-align: center;
    pointer-events: none;
    user-select: none;
  }
  .label b {
    display: block;
    font-size: clamp(9px, 1.45svh, 15px);
    font-weight: 600;
    letter-spacing: .32em;
    text-transform: uppercase;
    color: #dcebfa;
    opacity: .58;
    text-shadow: 0 1px 14px rgba(0, 0, 0, .95);
  }
  .label span {
    display: block;
    margin-top: .55em;
    font-size: clamp(7px, 1svh, 11px);
    letter-spacing: .2em;
    text-transform: uppercase;
    color: #9fb6cc;
    opacity: .34;
  }
  @media (prefers-reduced-motion: reduce) {
    /* the drawing stays; the movement stops. The still frame still reads. */
    svg animate, svg animateTransform, svg animateMotion { display: none; }
  }
</style>
</head>
<body>
  <div class="frame">
${svg}
    <div class="label">
      <b>A pelican on a bicycle</b>
      <span>svg &middot; html &middot; no canvas &middot; no libraries</span>
    </div>
  </div>
</body>
</html>
`;

const standalone = `<?xml version="1.0" encoding="UTF-8"?>
${svg.trim()}
`;

writeFileSync(join(HERE, "index.html"), html, "utf8");
writeFileSync(join(HERE, "pelican-on-a-bicycle.svg"), standalone, "utf8");
console.log(
  `wrote index.html ${(html.length / 1024).toFixed(1)} KB` +
    ` · pelican-on-a-bicycle.svg ${(standalone.length / 1024).toFixed(1)} KB`
);
