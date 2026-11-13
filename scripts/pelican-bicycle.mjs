#!/usr/bin/env node
/**
 * scripts/pelican-bicycle.mjs — builds `pelican/pelican-on-a-bicycle.svg`.
 *
 * One inline SVG. No JavaScript, no images, no fonts, no libraries, no network.
 * Every movement is a native <animate> or <animateTransform>; the numbers are
 * worked out here, once, and written into the file as plain keyframes.
 *
 * The clock, and why these numbers:
 *   - One turn of the wheels is 1.2 s, and the tyre's outer edge is exactly 150
 *     from the hub, so the pier has to scroll 2π × 150 = 942.5 px in that time
 *     (785.4 px/s). A bollard is one circumference from the next, so one passes
 *     every turn and the wheels never skate. The nearer foreground moves 1.7×
 *     faster, which is what a nearer thing does to a lens travelling with the
 *     rider.
 *   - 50-tooth chainring, 24-tooth cog: the cranks turn once per 2.4 s while the
 *     wheels turn twice. The chain runs 130.9 px/s; its drawn links are 13.09 px
 *     apart and each takes 0.1 s to travel one pitch, so the dashes move at the
 *     speed of the chain they are drawn on.
 *   - The legs are solved, not guessed: two bones (thigh 140, shin 140), 48
 *     poses per turn of the cranks, so every webbed foot stays on its pedal.
 *
 * The picture, against the house rules in this repo:
 *   one world; a phone-first 9:16 frame; a low warm sun as the key (from the
 *   left, so his face is lit), the lighthouse as the practical, and the cold sky
 *   edge on his back as the rim; foreground, midground and background all doing
 *   work; every pixel an object in the scene, no overlays, no screen effects.
 *
 * Run: node scripts/pelican-bicycle.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "..", "pelican", "pelican-on-a-bicycle.svg");

/* ------------------------------------------------------------------ numbers */
const W = 1200, H = 1800;
const HORIZON = 1042;
const GROUND = 1560;                 // the pier's edge: the tyres touch here
const WHEEL_R = 150, WHEEL_C = 1.2;
const REAR = [330, 1410], FRONT = [930, 1410];
const BB = [610, 1478];
const CRANK_R = 70, RING = 50, COG = 24, CRANK_C = 2.4;
const CHAIN_SPEED = ((2 * Math.PI) / CRANK_C) * RING;
const LINK = CHAIN_SPEED * 0.1;
const ROLL = 2 * Math.PI * WHEEL_R;
const SCROLL = ROLL / WHEEL_C;                       // 785.40 px/s
const STRIP = 1200;
const GROUND_T = STRIP / SCROLL;                     // 1.5279 s
const FORE_T = STRIP / (SCROLL * 1.7);
const HIP = [694, 1318], THIGH = 134, SHIN = 130;

const f = (n, d = 1) => String(Math.round(n * 10 ** d) / 10 ** d);
const pts = (arr) => arr.map(([x, y]) => `${f(x)} ${f(y)}`).join(" ");
const polar = (c, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
};
const el = (tag, attrs = {}, body = "") => {
  const a = Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  return body ? `<${tag} ${a}>${body}</${tag}>` : `<${tag} ${a}/>`;
};
const anim = (attrs) => el("animate", attrs);
const spin = (from, to, dur) =>
  el("animateTransform", { attributeName: "transform", type: "rotate", from, to, dur: `${dur}s`, repeatCount: "indefinite" });

/* ---------------------------------------------------------------- the crank */
const pedalAt = (deg) => polar(BB, CRANK_R, deg);

/** Two-bone solve. The knee takes the answer that sits forward (−x) of the line. */
function kneeAt(pedal) {
  const [hx, hy] = HIP;
  let dx = pedal[0] - hx, dy = pedal[1] - hy;
  let d = Math.hypot(dx, dy);
  const lo = Math.abs(THIGH - SHIN) + 0.01, hi = THIGH + SHIN - 0.01;
  if (d < lo) { const k = lo / d; dx *= k; dy *= k; d = lo; }
  if (d > hi) { const k = hi / d; dx *= k; dy *= k; d = hi; }
  const a = (THIGH * THIGH - SHIN * SHIN + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, THIGH * THIGH - a * a));
  const ux = dx / d, uy = dy / d;
  const mx = hx + a * ux, my = hy + a * uy;
  const k1 = [mx - h * uy, my + h * ux];
  const k2 = [mx + h * uy, my - h * ux];
  return k1[0] <= k2[0] ? k1 : k2;
}

/** A limb: a tapered quad, stroked so it keeps an edge at any size. */
function limb(a, b, wa, wb, fill, stroke = "#22252b", sw = 7) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const d = Math.hypot(dx, dy) || 1;
  const nx = -dy / d, ny = dx / d;
  const p = [
    [a[0] + nx * wa, a[1] + ny * wa],
    [b[0] + nx * wb, b[1] + ny * wb],
    [b[0] - nx * wb, b[1] - ny * wb],
    [a[0] - nx * wa, a[1] - ny * wa],
  ];
  return el("path", { d: `M ${pts(p)} Z`, fill, stroke, "stroke-width": sw, "stroke-linejoin": "round" });
}

/** A webbed foot, flat on a level pedal. */
function foot(pedal, fill = "#e79231", stroke = "#22252b", sw = 7) {
  const [x, y] = pedal;
  const ay = y - 24;
  const d =
    `M ${f(x + 2)} ${f(ay)} C ${f(x - 6)} ${f(y - 18)} ${f(x - 16)} ${f(y - 10)} ${f(x - 22)} ${f(y - 4)} ` +
    `C ${f(x - 8)} ${f(y + 3)} ${f(x + 8)} ${f(y + 3)} ${f(x + 24)} ${f(y - 5)} ` +
    `C ${f(x + 16)} ${f(y - 12)} ${f(x + 8)} ${f(y - 20)} ${f(x + 2)} ${f(ay)} Z`;
  return (
    el("path", { d, fill, stroke, "stroke-width": sw, "stroke-linejoin": "round" }) +
    `<path d="M ${f(x - 18)} ${f(y - 4)} L ${f(x - 2)} ${f(y - 8)} M ${f(x + 22)} ${f(y - 5)} L ${f(x + 4)} ${f(y - 9)}" ` +
      `fill="none" stroke="${stroke}" stroke-width="2" opacity="0.45"/>`
  );
}

function legFrames(prefix, offsetDeg) {
  const out = [];
  for (let i = 0; i < 48; i++) {
    const deg = 360 * (i / 48) + offsetDeg;
    const pedal = pedalAt(deg);
    const knee = kneeAt(pedal);
    const ankle = [pedal[0] + 2, pedal[1] - 24];
    const mid = (t) => [knee[0] + (ankle[0] - knee[0]) * t, knee[1] + (ankle[1] - knee[1]) * t];
    const s1 = mid(0.36), s2 = mid(0.66);
    const g = [
      limb(HIP, knee, 27, 19, "#f7f3e9"),                                  // feathered thigh
      limb(knee, ankle, 15, 11, "#ec9a37"),                                // scaly shin
      el("circle", { cx: f(knee[0]), cy: f(knee[1]), r: 14, fill: "#f7f3e9", stroke: "#22252b", "stroke-width": 7 }),
      `<path d="M ${f(s1[0] - 7)} ${f(s1[1] + 3)} L ${f(s1[0] + 7)} ${f(s1[1] - 2)} M ${f(s2[0] - 6)} ${f(s2[1] + 3)} L ${f(s2[0] + 6)} ${f(s2[1] - 2)}" fill="none" stroke="#c2741d" stroke-width="2.6" stroke-linecap="round" opacity="0.65"/>`,
      foot(pedal),
      el("circle", { cx: f(ankle[0]), cy: f(ankle[1]), r: 8.5, fill: "#ec9a37", stroke: "#22252b", "stroke-width": 5 }),
    ].join("\n        ");
    out.push(`      <g id="${prefix}${i}">\n        ${g}\n      </g>`);
  }
  return out.join("\n");
}

function cycleUse(prefix, period = CRANK_C) {
  const frames = [...Array(48).keys()].map((i) => `#${prefix}${i}`);
  return el("use", { href: frames[0] }, el("animate", {
    attributeName: "href", values: frames.join(";"),
    dur: `${period}s`, repeatCount: "indefinite", calcMode: "discrete",
  }));
}

/* ------------------------------------------------------------- chain maths */
function chainLoop() {
  const [r1, r2] = [RING, COG];
  const dx = REAR[0] - BB[0], dy = REAR[1] - BB[1];
  const d = Math.hypot(dx, dy);
  const a = Math.atan2(dy, dx);
  const b = Math.acos((r1 - r2) / d);
  const at = (c, r, ang) => [c[0] + r * Math.cos(ang), c[1] + r * Math.sin(ang)];
  const p1u = at(BB, r1, a + b), p2u = at(REAR, r2, a + b);
  const p1l = at(BB, r1, a - b), p2l = at(REAR, r2, a - b);
  const dPath =
    `M ${f(p1u[0])} ${f(p1u[1])} L ${f(p2u[0])} ${f(p2u[1])} ` +
    `A ${r2} ${r2} 0 0 1 ${f(p2l[0])} ${f(p2l[1])} ` +
    `L ${f(p1l[0])} ${f(p1l[1])} A ${r1} ${r1} 0 0 1 ${f(p1u[0])} ${f(p1u[1])}`;
  return { dPath };
}

/* ---------------------------------------------------------------- the defs */
const defs = () => `
<defs>
  <linearGradient id="sky" x1="0.05" y1="0" x2="0.55" y2="1">
    <stop offset="0" stop-color="#0d2138"/>
    <stop offset="0.28" stop-color="#274a63"/>
    <stop offset="0.55" stop-color="#6a8491"/>
    <stop offset="0.78" stop-color="#c3ab90"/>
    <stop offset="1" stop-color="#f2d3aa"/>
  </linearGradient>
  <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#fff1d2" stop-opacity="0.98"/>
    <stop offset="0.22" stop-color="#ffdc9f" stop-opacity="0.55"/>
    <stop offset="0.55" stop-color="#ffc98a" stop-opacity="0.22"/>
    <stop offset="1" stop-color="#ffc98a" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#9fb0aa"/>
    <stop offset="0.08" stop-color="#547e83"/>
    <stop offset="0.5" stop-color="#2b5059"/>
    <stop offset="1" stop-color="#18323a"/>
  </linearGradient>
  <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#8d8577"/>
    <stop offset="0.5" stop-color="#5d574d"/>
    <stop offset="1" stop-color="#372f28"/>
  </linearGradient>
  <linearGradient id="pier" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4a4036"/>
    <stop offset="0.35" stop-color="#2e2721"/>
    <stop offset="1" stop-color="#151210"/>
  </linearGradient>
  <linearGradient id="beak" x1="0" y1="0" x2="0.3" y2="1">
    <stop offset="0" stop-color="#ffe3a6"/>
    <stop offset="0.4" stop-color="#f7bd5e"/>
    <stop offset="1" stop-color="#e2952f"/>
  </linearGradient>
  <linearGradient id="pouch" x1="0" y1="0" x2="0.25" y2="1">
    <stop offset="0" stop-color="#fbd68a"/>
    <stop offset="0.45" stop-color="#f0a63c"/>
    <stop offset="1" stop-color="#cc7820"/>
  </linearGradient>
  <linearGradient id="feather" x1="0.1" y1="0" x2="0.9" y2="1">
    <stop offset="0" stop-color="#fffdf7"/>
    <stop offset="0.5" stop-color="#f5f0e4"/>
    <stop offset="1" stop-color="#d5cdbb"/>
  </linearGradient>
  <linearGradient id="frame" x1="0" y1="0" x2="0.15" y2="1">
    <stop offset="0" stop-color="#2a8b80"/>
    <stop offset="0.6" stop-color="#1c6a63"/>
    <stop offset="1" stop-color="#124a46"/>
  </linearGradient>
  <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f6f8fa"/>
    <stop offset="0.5" stop-color="#c4ced6"/>
    <stop offset="1" stop-color="#8e9aa4"/>
  </linearGradient>
  <radialGradient id="brass" cx="0.35" cy="0.3" r="0.8">
    <stop offset="0" stop-color="#ffeeb8"/>
    <stop offset="0.6" stop-color="#d8b45e"/>
    <stop offset="1" stop-color="#9c7c31"/>
  </radialGradient>
  <filter id="blur18" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
  <filter id="blur8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="blur30" x="-40%" y="-90%" width="180%" height="280%"><feGaussianBlur stdDeviation="30"/></filter>

  <!-- one wheel, hub at 0 0. Its outer edge is 150, which is the number the
       pier's scroll is calculated from -->
  <g id="wheel">
    <circle r="138" fill="none" stroke="#14141a" stroke-width="24"/>
    <circle r="139" fill="none" stroke="#33343d" stroke-width="3" opacity="0.65"/>
    ${[...Array(18).keys()].map((i) => {
      const a = polar([0, 0], 130, i * 20), b = polar([0, 0], 147, i * 20);
      return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#09090d" stroke-width="3.6" stroke-linecap="round" opacity="0.9"/>`;
    }).join("")}
    <circle r="120" fill="none" stroke="#e7edf2" stroke-width="6"/>
    <circle r="112" fill="none" stroke="#9aa7b3" stroke-width="2" opacity="0.85"/>
    ${[...Array(16).keys()].map((i) => {
      const ang = (360 / 16) * i + 11;
      const a = polar([0, 0], 14, ang), b = polar([0, 0], 112, ang);
      return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#f2f6f8" stroke-width="2.6" opacity="0.95"/>`;
    }).join("")}
    <circle r="15" fill="#2a2e35"/><circle r="8" fill="url(#chrome)"/><circle r="3" fill="#6c7782"/>
  </g>

  <g id="wheelSpin">
    <g>${spin("0", "-360", WHEEL_C)}<use href="#wheel"/></g>
  </g>

  <g id="cog">
    ${[...Array(9).keys()].map((i) => {
      const a = polar([0, 0], COG - 3, i * 40), b = polar([0, 0], COG + 4, i * 40);
      return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#78838f" stroke-width="5"/>`;
    }).join("")}
    <circle r="${COG}" fill="none" stroke="#9aa6b2" stroke-width="5"/>
    <circle r="7" fill="#bcc6ce"/>
  </g>

  <g id="pierStrip">
    <!-- the deck: a stone coping, then the shadowed face of the pier -->
    <rect x="0" y="${GROUND}" width="${STRIP}" height="16" fill="url(#stone)"/>
    <rect x="0" y="${GROUND}" width="${STRIP}" height="3" fill="#ffe6bc" opacity="0.55"/>
    <rect x="0" y="${GROUND + 16}" width="${STRIP}" height="${H - GROUND - 16}" fill="url(#pier)"/>
    ${[...Array(9).keys()].map((i) => `<rect x="${20 + i * 140}" y="${GROUND + 16}" width="5" height="${H - GROUND - 16}" fill="#0d0b0a" opacity="0.55"/>`).join("")}
    ${[60, 260, 460, 660, 860, 1060].map((x) => `<rect x="${x}" y="${GROUND + 62}" width="190" height="4" fill="#6b6156" opacity="0.22"/>`).join("")}
    ${[0, 1, 2].map((i) => `<ellipse cx="${120 + i * 400}" cy="${GROUND + 120}" rx="70" ry="10" fill="#5a5148" opacity="0.18"/>`).join("")}
    <!-- a moss line where the stone is wet, and weeds out of the joints -->
    <rect x="0" y="${GROUND + 16}" width="${STRIP}" height="7" fill="#37402f" opacity="0.55"/>
    ${[250, 700, 1080].map((x, i) => `
    <g transform="translate(${x},${GROUND + 20})">
      <path d="M0 0 C -8 -22 -18 -32 -34 -42 C -16 -36 -6 -24 0 -10" fill="#2f3a2b"/>
      <path d="M6 0 C 6 -26 12 -44 28 -58 C 18 -38 16 -18 16 0" fill="#3a4734"/>
      <path d="M-4 0 C -16 -12 -26 -16 -40 -16 C -24 -8 -14 -4 -6 3" fill="#28321f"/>
    </g>`).join("")}
    <!-- a mooring bollard, and the rope over it -->
    <g transform="translate(520,0)">
      <path d="M-16 ${GROUND + 8} L-11 ${GROUND - 46} C -11 ${GROUND - 56} 11 ${GROUND - 56} 11 ${GROUND - 46} L16 ${GROUND + 8} Z" fill="#241d18"/>
      <ellipse cx="0" cy="${GROUND - 48}" rx="13" ry="5" fill="#3a2f26"/>
      <path d="M-12 ${GROUND - 30} C -24 ${GROUND - 12} -26 ${GROUND + 30} -16 ${GROUND + 50}" fill="none" stroke="#8b7c60" stroke-width="7" stroke-linecap="round"/>
      <path d="M-12 ${GROUND - 30} C -24 ${GROUND - 12} -26 ${GROUND + 30} -16 ${GROUND + 50}" fill="none" stroke="#5c503c" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 7"/>
    </g>
    <!-- a plank ramp and a coil of rope, all on the deck, all scrolling with it -->
    <rect x="820" y="${GROUND + 4}" width="220" height="10" rx="3" fill="#6a5b48" opacity="0.75"/>
    <ellipse cx="960" cy="${GROUND + 34}" rx="34" ry="12" fill="none" stroke="#8b7c60" stroke-width="6" opacity="0.85"/>
    <ellipse cx="960" cy="${GROUND + 34}" rx="20" ry="7" fill="none" stroke="#6f6249" stroke-width="4" opacity="0.8"/>
  </g>

  <g id="foreStrip">
    <g transform="translate(120,1800)">
      <path d="M0 0 C -12 -70 -40 -112 -88 -150 C -34 -126 -6 -88 8 -36 C 26 -86 62 -128 108 -154 C 62 -112 38 -66 28 0 Z" fill="#0a0c09" opacity="0.95"/>
    </g>
    <g transform="translate(700,1800)">
      <path d="M0 0 C -8 -52 -30 -88 -66 -114 C -24 -100 -4 -70 6 -26 C 20 -70 44 -100 82 -116 C 48 -84 30 -52 22 0 Z" fill="#0a0c09" opacity="0.92"/>
    </g>
    <g transform="translate(1130,1800)">
      <ellipse cx="0" cy="10" rx="140" ry="80" fill="#070806" opacity="0.85"/>
      <path d="M-100 0 C -88 -54 -56 -84 -8 -104 C -50 -80 -72 -46 -80 0 Z" fill="#0c0f0b"/>
      <path d="M80 0 C 70 -40 44 -66 8 -80 C 46 -58 66 -30 72 0 Z" fill="#0c0f0b"/>
    </g>
    <g transform="translate(420,1800)">
      <path d="M0 0 C -6 -34 -24 -56 -50 -70 C -18 -60 -2 -40 6 -14" fill="#0b0e0a" opacity="0.8"/>
    </g>
  </g>

${legFrames("legA", 0)}
${legFrames("legB", 180)}
</defs>`;

/* --------------------------------------------------------------- the sky */
const sky = () => `
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <!-- key: a low sun off the left, so his face is the lit side and the rim comes
       from the cold sky behind his back -->
  <circle cx="238" cy="1006" r="392" fill="url(#sunGlow)"/>
  <circle cx="238" cy="1006" r="50" fill="#fff5dd"/>
  <circle cx="238" cy="1006" r="64" fill="#ffe9bd" opacity="0.26"/>
  <!-- god rays from the sun: long cards, breathing, never across his face -->
  ${[
    { w: 120, rot: -20, op: 0.10, dur: 13 },
    { w: 64, rot: -12, op: 0.09, dur: 17 },
    { w: 180, rot: -27, op: 0.06, dur: 23 },
  ].map((r) => `
  <g transform="translate(238,1006) rotate(${r.rot})">
    <rect x="0" y="-1900" width="${r.w}" height="2000" fill="#ffe6bb" opacity="${r.op}">
      ${anim({ attributeName: "opacity", values: `${r.op};${f(r.op * 0.4, 3)};${r.op}`, dur: `${r.dur}s`, repeatCount: "indefinite" })}
    </rect>
  </g>`).join("")}
  <!-- cloud banks: three depths, drifting at three speeds -->
  <g filter="url(#blur30)">
    <g>
      ${anim({ attributeName: "transform", type: "translate", values: "0 0; 120 4; 0 0", dur: "58s", repeatCount: "indefinite" })}
      <ellipse cx="880" cy="700" rx="430" ry="30" fill="#c9d4d6" opacity="0.18"/>
      <ellipse cx="1010" cy="742" rx="280" ry="18" fill="#dbe2df" opacity="0.14"/>
    </g>
    <g>
      ${anim({ attributeName: "transform", type: "translate", values: "0 0; -90 6; 0 0", dur: "44s", repeatCount: "indefinite" })}
      <ellipse cx="420" cy="826" rx="360" ry="34" fill="#efdfc7" opacity="0.24"/>
      <ellipse cx="620" cy="800" rx="210" ry="22" fill="#f6e6cd" opacity="0.18"/>
    </g>
    <g>
      ${anim({ attributeName: "transform", type: "translate", values: "0 0; -60 2; 0 0", dur: "34s", repeatCount: "indefinite" })}
      <ellipse cx="700" cy="924" rx="320" ry="20" fill="#f3e2c8" opacity="0.26"/>
    </g>
  </g>
  <!-- gulls, high and away, going the other way -->
  ${[
    [905, 616, 11, 7.2, 0], [958, 588, 8.5, 9.1, 1], [872, 566, 7, 11.4, 2],
  ].map(([x, y, s, dur, i]) => `
  <g transform="translate(${x},${y})">
    <g>
      ${anim({ attributeName: "transform", type: "translate", values: "0 0; 46 -8; 0 0", dur: `${dur}s`, repeatCount: "indefinite" })}
      <path d="M-${s} 0 C -${f(s * 0.5, 1)} -${f(s * 0.55, 1)} -${f(s * 0.2, 1)} -${f(s * 0.55, 1)} 0 0 C ${f(s * 0.2, 1)} -${f(s * 0.55, 1)} ${f(s * 0.5, 1)} -${f(s * 0.55, 1)} ${s} 0"
            fill="none" stroke="#22303a" stroke-width="2.2" stroke-linecap="round" opacity="0.5">
        ${anim({ attributeName: "opacity", values: "0.5;0.3;0.5", dur: `${f(1.3 + i * 0.35, 2)}s`, repeatCount: "indefinite" })}
      </path>
    </g>
  </g>`).join("")}
`;

/* ------------------------------------------------------------ the far world */
const far = () => `
  <rect x="0" y="${HORIZON}" width="${W}" height="${GROUND - HORIZON}" fill="url(#sea)"/>
  <rect x="0" y="${HORIZON}" width="${W}" height="3" fill="#ffe0b0" opacity="0.6"/>
  ${[...Array(10).keys()].map((i) => `<rect x="0" y="${HORIZON + 10 + i * 50}" width="${W}" height="2" fill="#b6cac4" opacity="${f(0.15 - i * 0.011, 3)}"/>`).join("")}
  <!-- the sun's road on the water, under the sun -->
  ${[...Array(18).keys()].map((i) => {
    const y = HORIZON + 12 + i * 26;
    const w = 28 + i * 14, x = 238 - w / 2 + Math.sin(i * 1.7) * 26;
    const o = f(0.52 - i * 0.024, 3);
    return `<rect x="${f(x)}" y="${y}" width="${w}" height="${f(2 + i * 0.3)}" rx="2" fill="#ffe0b2" opacity="${o}">
      ${anim({ attributeName: "opacity", values: `${o};${f(0.18 - i * 0.008, 3)};${o}`, dur: `${f(2.2 + i * 0.37, 2)}s`, repeatCount: "indefinite" })}
    </rect>`;
  }).join("")}
  <!-- a small sail, going the other way, alone on the water -->
  <g transform="translate(700,1128)" opacity="0.72">
    <g>${anim({ attributeName: "transform", type: "translate", values: "0 0; -18 2; 0 0", dur: "26s", repeatCount: "indefinite" })}
      <path d="M0 0 L0 -46 L26 -2 Z" fill="#26333b"/>
      <path d="M-4 0 L-4 -34 L-18 -2 Z" fill="#1d2830"/>
      <path d="M-22 0 L34 0 L28 6 L-16 6 Z" fill="#1a242b"/>
    </g>
  </g>
  <!-- headlands: far, flat, hazed; the right one carries the lighthouse -->
  <path d="M0 ${HORIZON} L0 ${HORIZON - 26} C 70 ${HORIZON - 40} 140 ${HORIZON - 20} 210 ${HORIZON - 8} C 268 ${HORIZON + 2} 300 ${HORIZON + 8} 340 ${HORIZON} Z" fill="#5d7280" opacity="0.75"/>
  <path d="M1200 ${HORIZON} L1200 ${HORIZON - 92} C 1150 ${HORIZON - 96} 1104 ${HORIZON - 74} 1062 ${HORIZON - 66} C 1014 ${HORIZON - 58} 972 ${HORIZON - 76} 928 ${HORIZON - 66} C 892 ${HORIZON - 58} 866 ${HORIZON - 38} 852 ${HORIZON} Z" fill="#41525d"/>
  <path d="M1200 ${HORIZON} L1200 ${HORIZON - 52} C 1140 ${HORIZON - 58} 1080 ${HORIZON - 40} 1020 ${HORIZON - 34} C 972 ${HORIZON - 28} 930 ${HORIZON - 40} 900 ${HORIZON} Z" fill="#2c3b45"/>
  <g transform="translate(1108,${HORIZON - 84})">
    <path d="M0 0 L-12 0 L-7 -84 L7 -84 L12 0 Z" fill="#e8e3d6"/>
    <path d="M-6 -86 L6 -86 L4 -58 L-4 -58 Z" fill="#cfc8b8" opacity="0.6"/>
    <path d="M-5 -52 L-4 -30 L4 -30 L5 -52 Z" fill="#8d4a3c"/>
    <rect x="-9" y="-96" width="18" height="12" fill="#2b3037"/>
    <rect x="-6.5" y="-94" width="13" height="8" fill="#ffd489">
      ${anim({ attributeName: "opacity", values: "1;0.7;1;0.88;1", dur: "3.4s", repeatCount: "indefinite" })}
    </rect>
    <path d="M-11 -96 L11 -96 L0 -107 Z" fill="#2b3037"/>
    <circle cx="0" cy="-89" r="30" fill="#ffd08a" opacity="0.3" filter="url(#blur8)">
      ${anim({ attributeName: "opacity", values: "0.3;0.15;0.3", dur: "4.6s", repeatCount: "indefinite" })}
    </circle>
    <!-- the beam: the button, at the very end of the film's logic -->
    <g opacity="0.2">
      ${anim({ attributeName: "opacity", values: "0.12;0.24;0.14;0.28;0.12", dur: "19s", repeatCount: "indefinite" })}
      <g transform="translate(0,-89)"><g>${spin("0", "360", 19)}
        <path d="M0 0 L-460 -30 L-460 34 Z" fill="#ffeccb" opacity="0.5"/>
        <path d="M0 0 L460 30 L460 -34 Z" fill="#ffeccb" opacity="0.3"/>
      </g></g>
    </g>
  </g>
  <g filter="url(#blur30)"><ellipse cx="600" cy="${HORIZON + 34}" rx="760" ry="40" fill="#e6d9c2" opacity="0.22"/></g>
`;

/* --------------------------------------------------------------- the deck */
const deck = () => `
  <g>
    ${el("animateTransform", { attributeName: "transform", type: "translate", from: "0 0", to: `${STRIP} 0`, dur: `${f(GROUND_T, 4)}s`, repeatCount: "indefinite" })}
    <use href="#pierStrip" x="0"/><use href="#pierStrip" x="${STRIP}"/><use href="#pierStrip" x="${STRIP * 2}"/>
  </g>
`;

/* --------------------------------------------------------------- the bike */
const bike = () => `
  <g id="bike">
    <!-- the far crank and the far leg pass behind the frame -->
    <g transform="translate(${BB[0]},${BB[1]})">
      <g>${spin("180", "540", CRANK_C)}
        <line x1="0" y1="0" x2="${CRANK_R}" y2="0" stroke="#7f8b96" stroke-width="10" stroke-linecap="round"/>
        <g transform="translate(${CRANK_R},0)"><g>${spin("-180", "-540", CRANK_C)}
          <rect x="-16" y="-5" width="32" height="10" rx="3" fill="#1b1f25"/>
        </g></g>
      </g>
    </g>
    ${cycleUse("legB")}

    <use href="#wheelSpin" x="${REAR[0]}" y="${REAR[1]}"/>
    <use href="#wheelSpin" x="${FRONT[0]}" y="${FRONT[1]}"/>

    <!-- mudguards: hug the tyre, 200° of arc, cream with a warm top edge -->
    ${[REAR, FRONT].map((c) => {
      const a1 = polar(c, 168, 158), a2 = polar(c, 168, 358);
      const d = `M ${f(a1[0])} ${f(a1[1])} A 168 168 0 1 1 ${f(a2[0])} ${f(a2[1])}`;
      return `<path d="${d}" fill="none" stroke="#f1e7d2" stroke-width="11" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="#ffd9a0" stroke-width="3" stroke-linecap="round" opacity="0.5"/>`;
    }).join("")}

    <g transform="translate(${REAR[0]},${REAR[1]})"><g>${spin("0", "-360", WHEEL_C)}<use href="#cog"/></g></g>
    <path d="${chainLoop().dPath}" fill="none" stroke="#2f343a" stroke-width="6" stroke-linecap="round"/>
    <path d="${chainLoop().dPath}" fill="none" stroke="#9aa4ae" stroke-width="3.2"
          stroke-dasharray="${f(LINK * 0.5, 3)} ${f(LINK * 0.5, 3)}" opacity="0.9">
      ${anim({ attributeName: "stroke-dashoffset", from: "0", to: `${f(-LINK, 3)}`, dur: "0.1s", repeatCount: "indefinite" })}
    </path>

    <!-- the frame: a lacquered teal roadster, cream panels, brass fittings -->
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${BB[0]} ${BB[1]} L ${REAR[0]} ${REAR[1]}" stroke="url(#frame)" stroke-width="16"/>
      <path d="M 692 1314 L ${REAR[0]} ${REAR[1]}" stroke="url(#frame)" stroke-width="12"/>
      <path d="M ${BB[0]} ${BB[1]} L 692 1314" stroke="url(#frame)" stroke-width="18"/>
      <path d="M ${BB[0]} ${BB[1]} L 806 1288" stroke="url(#frame)" stroke-width="20"/>
      <path d="M 690 1312 L 812 1200" stroke="url(#frame)" stroke-width="15"/>
      <path d="M 806 1290 L 820 1192" stroke="url(#frame)" stroke-width="18"/>
      <path d="M 816 1280 C 830 1338 890 1372 ${FRONT[0]} ${FRONT[1]}" stroke="#1f7269" stroke-width="14"/>
      <path d="M 820 1300 C 856 1352 906 1384 ${FRONT[0] + 3} ${FRONT[1] + 3}" stroke="#155049" stroke-width="4" opacity="0.8"/>
      <!-- cream panels on the head tube and the seat tube -->
      <path d="M 810 1274 L 818 1210" stroke="#f1e7d2" stroke-width="8" opacity="0.9"/>
      <path d="M 684 1300 L 692 1266" stroke="#f1e7d2" stroke-width="6" opacity="0.5"/>
    </g>
    <ellipse cx="812" cy="1242" rx="8" ry="14" fill="url(#brass)" opacity="0.95"/>

    <!-- saddle on its post, and the leather bag behind it -->
    <path d="M 692 1314 L 698 1296" stroke="#b9c3cb" stroke-width="11" stroke-linecap="round"/>
    <path d="M 634 1322 C 654 1306 700 1296 744 1304 C 766 1308 774 1318 762 1326 C 730 1338 668 1338 634 1322 Z" fill="#7a4a2c"/>
    <path d="M 642 1318 C 664 1306 702 1300 738 1306" stroke="#a06b45" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="740" cy="1312" r="2.8" fill="#e3d3ab"/><circle cx="718" cy="1318" r="2.8" fill="#e3d3ab"/>
    <path d="M 748 1306 C 774 1300 794 1312 792 1336 C 790 1356 768 1364 750 1356 C 738 1350 738 1322 748 1306 Z" fill="#8f5230"/>
    <path d="M 748 1306 C 774 1300 794 1312 792 1336 L 762 1328 Z" fill="#ab6a42" opacity="0.9"/>
    <rect x="744" y="1298" width="11" height="10" rx="3" fill="#e3d3ab"/>

    <!-- stem, handlebar, bell, brake; and the basket with his lunch in it -->
    <path d="M 820 1192 L 828 1132" stroke="#cfd6dd" stroke-width="12" stroke-linecap="round"/>
    <path d="M 772 1160 C 794 1142 812 1130 830 1128 C 850 1126 864 1132 874 1142"
          fill="none" stroke="#cfd6dd" stroke-width="11" stroke-linecap="round"/>
    <path d="M 770 1161 L 756 1168" stroke="#23272e" stroke-width="18" stroke-linecap="round"/>
    <path d="M 876 1143 L 888 1150" stroke="#23272e" stroke-width="18" stroke-linecap="round"/>
    <circle cx="820" cy="1136" r="10" fill="url(#brass)"/><circle cx="820" cy="1136" r="3.6" fill="#8a6c2c"/>
    <path d="M 852 1136 C 866 1152 870 1164 862 1170" fill="none" stroke="#9aa6b2" stroke-width="4.5"/>
    <!-- a front basket, hanging off the bar, with the fish he is taking home in it -->
    <g transform="translate(944,1156)">
      <path d="M-56 0 C -52 -14 52 -14 56 0" fill="none" stroke="#8f6a34" stroke-width="7"/>
      <path d="M-54 0 L52 0 L44 62 L-46 62 Z" fill="#cf9f5f"/>
      <path d="M-54 0 L52 0 L44 62 L-46 62 Z" fill="none" stroke="#7d5c2c" stroke-width="3.4"/>
      ${[14, 28, 42, 56].map((y) => `<path d="M${f(-53 + y * 0.18)} ${y} L${f(51 - y * 0.14)} ${y}" stroke="#9d7638" stroke-width="2.6"/>`).join("")}
      ${[-38, -22, -6, 10, 26, 42].map((x) => `<path d="M${x} 4 L${f(x * 0.86)} 60" stroke="#a97f3d" stroke-width="2.4"/>`).join("")}
      <path d="M-12 -4 C -4 -34 16 -44 34 -40 C 24 -28 14 -16 8 -2 Z" fill="#98a7b0"/>
      <path d="M-10 -4 C -2 -30 16 -40 32 -38 C 24 -22 14 -10 6 -2 Z" fill="#c6d2d8" opacity="0.85"/>
      <path d="M-14 -4 C -22 -30 -12 -44 4 -46 C -2 -30 -6 -16 -6 -4 Z" fill="#8fa0a9"/>
      <ellipse cx="-4" cy="-2" rx="10" ry="4" fill="#b9c6cd"/>
    </g>

    <!-- chainring, near crank, near pedal, in front of the frame -->
    <g transform="translate(${BB[0]},${BB[1]})">
      <g>${spin("0", "-360", CRANK_C)}
        ${[...Array(13).keys()].map((i) => {
          const a = polar([0, 0], RING - 3, i * (360 / 13)), b = polar([0, 0], RING + 4.5, i * (360 / 13));
          return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#c4ced6" stroke-width="6"/>`;
        }).join("")}
        <circle r="${RING}" fill="none" stroke="#dbe2e8" stroke-width="6"/>
        <circle r="36" fill="none" stroke="#dbe2e8" stroke-width="5"/>
        ${[0, 120, 240].map((a) => { const p = polar([0, 0], 32, a); return `<line x1="0" y1="0" x2="${f(p[0])}" y2="${f(p[1])}" stroke="#dbe2e8" stroke-width="9"/>`; }).join("")}
      </g>
    </g>
    <g transform="translate(${BB[0]},${BB[1]})">
      <g>${spin("0", "360", CRANK_C)}
        <line x1="0" y1="0" x2="${CRANK_R}" y2="0" stroke="#9aa6b2" stroke-width="12" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="${CRANK_R}" y2="0" stroke="#e9eff4" stroke-width="4" stroke-linecap="round" opacity="0.75"/>
        <g transform="translate(${CRANK_R},0)"><g>${spin("0", "-360", CRANK_C)}
          <rect x="-17" y="-6" width="34" height="12" rx="4" fill="#1b1f25"/>
          <rect x="-13" y="-5" width="26" height="3.4" fill="#3a424b"/>
          <circle cx="0" cy="0" r="2.6" fill="#8f9aa4"/>
        </g></g>
        <circle r="8" fill="#9aa6b2"/>
      </g>
    </g>
    ${cycleUse("legA")}
  </g>
`;

/* ------------------------------------------------------------- the rider */
/* Measured in the frame, not guessed. A pelican is a bill with a bird behind it:
   the skull is 96 px across, the bill three times that long and set low, the
   neck shorter than the head is deep, and the folded wing is the biggest shape
   on him after the body. The first passes drew a goose with a duck's bill. */
const rider = () => `
  <g id="rider">
    <g>
      ${anim({ attributeName: "transform", type: "translate", values: "0 0; 0 -3.4; 0 0", dur: `${WHEEL_C}s`, repeatCount: "indefinite" })}

      <!-- tail: a short fan of stiff feathers, swept up off the rump -->
      <path d="M 776 1218 C 812 1198 846 1190 874 1194 C 852 1216 822 1236 790 1250 Z" fill="#efe9dc"/>
      <path d="M 784 1244 C 814 1228 844 1222 868 1224 C 846 1242 820 1256 794 1264 Z" fill="#e4ddcd"/>
      <path d="M 840 1198 C 862 1196 880 1202 892 1212 C 872 1220 850 1222 834 1218 Z" fill="#31353d"/>

      <!-- body: one heavy egg, breast high and forward, rump low and back -->
      <path d="M 618 1132 C 566 1168 544 1238 566 1300 C 588 1358 646 1388 710 1382
               C 776 1376 810 1330 806 1272 C 802 1206 762 1156 706 1132
               C 670 1116 640 1120 618 1132 Z" fill="url(#feather)"/>
      <path d="M 618 1132 C 570 1170 550 1236 568 1296 C 574 1244 590 1206 620 1178 C 644 1156 668 1146 690 1152 C 670 1132 640 1120 618 1132 Z" fill="#fffdf6" opacity="0.95"/>
      <path d="M 748 1140 C 790 1178 808 1236 802 1288 C 800 1234 776 1184 738 1152 Z" fill="#d3d9d3" opacity="0.45"/>
      ${[
        "M 626 1224 C 662 1252 702 1262 740 1260",
        "M 618 1266 C 656 1294 700 1304 740 1302",
        "M 624 1308 C 660 1334 700 1342 736 1340",
      ].map((d) => `<path d="${d}" fill="none" stroke="#ddd5c4" stroke-width="4.4" stroke-linecap="round" opacity="0.85"/>`).join("")}
      ${["M 644 1242 C 658 1244 672 1242 686 1236", "M 640 1284 C 654 1286 668 1284 682 1278", "M 646 1324 C 660 1326 674 1324 688 1318"]
        .map((d) => `<path d="${d}" fill="none" stroke="#c9c0ad" stroke-width="2.6" stroke-linecap="round" opacity="0.7"/>`).join("")}

      <!-- the folded wing: the biggest shape on him after the body. It has its
           own edge and its own shade, or white on white reads as one blob. -->
      <path d="M 630 1148 C 690 1164 738 1206 758 1262 C 768 1292 762 1316 744 1332
               C 728 1346 704 1352 686 1346
               C 700 1332 708 1314 706 1294 C 700 1252 672 1204 630 1178 Z" fill="#fbf8f0" stroke="#cfc7b4" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M 630 1148 C 690 1164 738 1206 758 1262 C 764 1284 762 1304 750 1320
               C 748 1288 738 1258 720 1236 C 700 1212 668 1192 638 1180 Z" fill="#f1ebdc" opacity="0.95"/>
      ${[
        "M 692 1196 C 718 1218 736 1248 744 1282",
        "M 664 1182 C 694 1202 718 1232 730 1266",
      ].map((d) => `<path d="${d}" fill="none" stroke="#e0d9c7" stroke-width="6" stroke-linecap="round" opacity="0.9"/>`).join("")}
      <!-- the primaries: long, dark-tipped, laid over the rump -->
      <path d="M 752 1302 C 764 1324 768 1346 764 1366 C 754 1348 746 1326 742 1308 Z" fill="#f4eee2" stroke="#d9d1bf" stroke-width="2"/>
      <path d="M 734 1320 C 744 1342 746 1362 740 1380 C 732 1362 726 1342 724 1324 Z" fill="#efe8da" stroke="#d9d1bf" stroke-width="2"/>
      <path d="M 764 1366 C 762 1378 756 1388 748 1396 C 750 1380 752 1366 754 1352 Z" fill="#2c3038"/>
      <path d="M 740 1380 C 738 1392 732 1402 724 1410 C 726 1394 728 1380 730 1366 Z" fill="#2c3038"/>
      <path d="M 706 1330 C 712 1348 712 1364 706 1378 C 702 1362 700 1346 700 1332 Z" fill="#3a3f47" opacity="0.9"/>

      <!-- neck: one thick S, short. The shade first, the white over it, so the
           cool edge sits on his back and never cuts a band into him. -->
      <path d="M 574 1000 C 596 1052 618 1096 640 1134 C 652 1154 664 1168 676 1178"
            fill="none" stroke="#c2ccc6" stroke-width="76" stroke-linecap="round"/>
      <path d="M 566 1000 C 588 1050 610 1094 632 1132 C 644 1152 656 1166 668 1176"
            fill="none" stroke="#faf6ed" stroke-width="72" stroke-linecap="round"/>

      <!-- head -->
      <g>
        ${anim({ attributeName: "transform", type: "rotate", values: "-1.4 578 958; 1.8 578 958; -1.4 578 958", dur: "3.8s", repeatCount: "indefinite" })}
        <!-- crest: three short feathers off a flat crown, laid back -->
        <g>
          ${anim({ attributeName: "transform", type: "rotate", values: "0 612 916; -4 612 916; 0 612 916", dur: "2.7s", repeatCount: "indefinite" })}
          <path d="M 606 908 C 632 886 664 874 696 870 C 670 890 648 906 632 926 Z" fill="#f7f2e7"/>
          <path d="M 616 928 C 640 908 670 896 698 892 C 674 910 654 924 640 942 Z" fill="#ece5d5"/>
          <path d="M 634 946 C 654 932 674 924 696 920 C 678 934 662 946 650 956 Z" fill="#dfd8c7"/>
        </g>
        <!-- skull: a wedge, flat on the crown, full in the cheek, jaw set back -->
        <path d="M 556 906 C 592 900 620 914 630 940 C 638 962 634 984 618 996
                 C 600 1010 568 1010 548 996 C 530 984 522 962 526 940
                 C 530 920 540 910 556 906 Z" fill="#fbf8ef"/>
        <path d="M 556 906 C 532 912 522 932 526 956 C 530 980 542 994 558 1000
                 C 546 984 540 966 542 950 C 544 928 548 916 556 906 Z" fill="#dde4dc" opacity="0.45"/>
        <!-- bare skin round the eye and the base of the bill -->
        <path d="M 528 936 C 542 922 566 918 580 928 C 586 940 578 954 562 956 C 544 958 530 950 528 936 Z" fill="#f0b28f" opacity="0.6"/>
        <!-- the bill: a flat wedge, 36 px deep at the base, 10 at the tip, the
             culmen straight and the tip turned down into a hook -->
        <path d="M 540 924 C 470 926 366 936 300 948 C 296 949 293 952 294 956
                 C 298 962 304 964 310 964 C 366 960 446 956 504 956
                 C 518 956 530 950 538 942 Z" fill="url(#beak)"/>
        <path d="M 540 924 C 470 926 366 936 300 948 C 296 950 294 953 296 956
                 C 330 952 400 946 470 942 C 496 940 520 936 538 930 Z" fill="#ffeec8" opacity="0.65"/>
        <path d="M 300 948 C 292 950 288 956 291 961 C 294 966 302 966 306 961 C 303 958 301 953 300 948 Z" fill="#d1852a"/>
        <!-- pouch: filled from the whole underside of the bill, sagging low -->
        <path d="M 538 942 C 530 950 518 956 504 958 C 452 976 392 1040 330 1040
                 C 306 1040 292 1026 288 1006 C 285 988 292 964 300 950
                 C 340 946 460 938 538 942 Z" fill="url(#pouch)"/>
        <path d="M 314 986 C 336 1016 364 1032 396 1034" fill="none" stroke="#bf7322" stroke-width="3.4" opacity="0.45"/>
        <path d="M 342 1010 C 364 1030 388 1038 412 1036" fill="none" stroke="#bf7322" stroke-width="2.8" opacity="0.32"/>
        <path d="M 300 952 C 360 962 452 952 536 940" fill="none" stroke="#a8621c" stroke-width="3.2" opacity="0.75"/>
        <path d="M 536 926 C 470 928 366 938 302 950" fill="none" stroke="#fff6dd" stroke-width="3.6" opacity="0.9" stroke-linecap="round"/>
        <circle cx="452" cy="936" r="2.2" fill="#b4711f" opacity="0.45"/>
        <circle cx="398" cy="942" r="2" fill="#b4711f" opacity="0.38"/>
        <!-- eye -->
        <circle cx="556" cy="932" r="11.5" fill="#f8f5ea" stroke="#23272e" stroke-width="2.6"/>
        <circle cx="558" cy="933" r="6" fill="#1a1f26"/>
        <circle cx="555.2" cy="929.6" r="2.2" fill="#ffffff"/>
        <path d="M 544 922 C 551 915 563 915 570 920" fill="none" stroke="#cbc4b3" stroke-width="2.8" stroke-linecap="round"/>
        <ellipse cx="556" cy="932" rx="12.5" ry="0.1" fill="#fbf8ef">
          ${anim({ attributeName: "ry", values: "0.1;0.1;12.7;12.7;0.1", keyTimes: "0;0.88;0.905;0.93;0.96", dur: "4.4s", repeatCount: "indefinite" })}
        </ellipse>
        <path d="M 546 937 C 551 943 562 943 567 937" fill="none" stroke="#7d7466" stroke-width="2.2" stroke-linecap="round" opacity="0">
          ${anim({ attributeName: "opacity", values: "0;0;1;1;0", keyTimes: "0;0.88;0.905;0.93;0.96", dur: "4.4s", repeatCount: "indefinite" })}
        </path>

        <!-- the neckerchief: a collar at the base of the neck, a knot at the side,
             and one tail flying back. His one loud colour. -->
        <path d="M 572 1016 C 600 1006 628 1012 646 1032 C 656 1046 654 1060 642 1066
                 C 620 1048 594 1040 570 1044 Z" fill="#b5462f"/>
        <path d="M 570 1040 C 594 1036 620 1044 638 1062 C 624 1070 598 1064 576 1052 Z" fill="#9c3a26"/>
        <circle cx="648" cy="1048" r="13" fill="#c24d33"/>
        <circle cx="648" cy="1048" r="6" fill="#9c3a26"/>
        <g>${anim({ attributeName: "transform", type: "rotate", values: "-6 652 1054; 8 652 1054; -6 652 1054", dur: "1.4s", repeatCount: "indefinite" })}
          <path d="M 654 1042 C 690 1052 722 1072 746 1100 C 718 1096 690 1084 668 1070 C 656 1062 652 1052 654 1042 Z" fill="#a83f2b"/>
          <path d="M 656 1066 C 686 1080 714 1100 732 1122 C 710 1112 688 1098 670 1084 Z" fill="#94371f" opacity="0.9"/>
        </g>
      </g>

      <!-- the near arm: out of the wing's shoulder, forward along the top tube,
           over the bar, three fingers closed on the grip -->
      <path d="M 660 1188 C 700 1198 736 1216 762 1240
               C 776 1252 786 1262 792 1272
               C 782 1288 766 1296 752 1294
               C 732 1266 706 1244 676 1228
               C 658 1220 648 1206 660 1188 Z" fill="#fffdf7" stroke="#d5cdbb" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M 660 1188 C 700 1198 736 1216 762 1240" fill="none" stroke="#e6dfcd" stroke-width="5" opacity="0.9"/>
      <!-- the hand -->
      <path d="M 784 1268 C 796 1272 804 1282 806 1294 C 802 1302 792 1306 784 1304
               C 778 1292 776 1278 776 1270 Z" fill="#fbf7ec" stroke="#d5cdbb" stroke-width="2.2"/>
      <path d="M 788 1274 C 796 1280 800 1288 800 1296" fill="none" stroke="#cfc6b2" stroke-width="2.6"/>
      <path d="M 784 1286 C 792 1292 796 1300 796 1308" fill="none" stroke="#cfc6b2" stroke-width="2.4"/>
      <path d="M 776 1268 C 788 1262 798 1262 806 1266 L 804 1278 C 796 1274 786 1274 778 1278 Z" fill="#f2ecdf" stroke="#d5cdbb" stroke-width="2"/>
    </g>
  </g>
`;

/* -------------------------------------------------------------- the light */
const air = () => `
  <!-- dust in the sunbeam -->
  ${[
    [640, 1080, 2.6, 7.4], [520, 1200, 2.0, 9.2], [760, 980, 3.0, 8.2], [300, 1290, 2.2, 10.4],
    [420, 880, 1.8, 8.8], [860, 1060, 2.4, 11.2], [200, 1150, 1.6, 7.8], [980, 900, 2.0, 9.6],
  ].map(([x, y, r, dur], i) => `
  <circle cx="${x}" cy="${y}" r="${r}" fill="#ffeccb" opacity="0.45">
    ${anim({ attributeName: "cy", values: `${y};${y - 30 - i * 3};${y}`, dur: `${dur}s`, repeatCount: "indefinite" })}
    ${anim({ attributeName: "opacity", values: "0.08;0.55;0.08", dur: `${dur}s`, repeatCount: "indefinite" })}
  </circle>`).join("")}
`;

/* ------------------------------------------------------------ the ground shadow */
const shadows = () => `
  <!-- the sun is low and off the left, so the bike and the rider throw a long
       shadow to the right, and it travels with them -->
  <g opacity="0.5" filter="url(#blur8)">
    <path d="M ${REAR[0] - 40} ${GROUND - 4} C 470 ${GROUND} 700 ${GROUND + 4} 1010 ${GROUND + 10}
             L 1010 ${GROUND + 22} C 700 ${GROUND + 16} 440 ${GROUND + 10} ${REAR[0] - 40} ${GROUND + 8} Z" fill="#0a0b09"/>
    <ellipse cx="${REAR[0] + 40}" cy="${GROUND + 1}" rx="86" ry="7" fill="#0a0b09"/>
    <ellipse cx="${FRONT[0] + 40}" cy="${GROUND + 1}" rx="86" ry="7" fill="#0a0b09"/>
    <path d="M 560 ${GROUND} C 640 ${GROUND - 6} 760 ${GROUND - 4} 880 ${GROUND} L 900 ${GROUND + 8} C 760 ${GROUND + 4} 640 ${GROUND + 4} 566 ${GROUND + 8} Z" fill="#0a0b09"/>
  </g>
  <ellipse cx="${REAR[0]}" cy="${GROUND + 2}" rx="36" ry="5" fill="#060706" opacity="0.7"/>
  <ellipse cx="${FRONT[0]}" cy="${GROUND + 2}" rx="36" ry="5" fill="#060706" opacity="0.7"/>
`;

/* --------------------------------------------------------------- the page */
const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A pelican riding a bicycle</title>
</head>
<body>
<!--
  A pelican riding a bicycle. HTML, and one inline SVG.

  No JavaScript, no images, no fonts, no libraries, no network. Every movement is
  a native SVG <animate> or <animateTransform>. The CSS below only lets the
  drawing fill the window, and it stops the clock for a reader who asked for less
  motion.

  Drawn to this repo's house rules (AGENTS.md, docs/CAMERA-BIBLE.md,
  docs/STYLE.md): one world; a phone-first 9:16 frame; three jobs for the light —
  a low warm sun off the left as the key (so his face is the lit side), the
  lighthouse as the practical, and the cold sky on his back as the rim;
  foreground (dark grass, blurred), midground (the rider), background (sea,
  headlands, lighthouse, sun) all doing work; and everything on screen is an
  object in the scene. No overlays, no cards, no screen-space effects.

  What is exact, and why:
    - The wheels roll without slipping. One turn is 1.2 s and the tyre's outer
      edge is 150 from the hub, so the pier scrolls 2*pi*150 = 942.5 px in that
      time. A bollard is one circumference from the next, so one passes every
      turn. The near foreground moves 1.7x faster, as a nearer thing must when
      the lens travels with the rider.
    - 50-tooth chainring, 24-tooth cog: the wheels turn twice while the cranks
      turn once (1.2 s and 2.4 s). The chain runs 130.9 px a second; the links
      drawn on it are 13.09 px apart and each takes 0.1 s to travel one pitch.
    - The legs are solved, not guessed: two bones (thigh 140, shin 140), 48 poses
      per turn of the cranks, so each webbed foot stays on its pedal.
    - The pedals counter-rotate and stay level; the far leg is half a turn ahead.
    - His weight bobs 3.4 px per turn of the wheels, and his head and crest
      carry a slower idle, so nothing in the frame is ever quite still.

  Read it in the order it was drawn: sky, far world, deck, bike, rider, air.
-->
<style>
  html, body { height: 100%; margin: 0; background: #0d1a26; }
  body { display: grid; place-items: center; overflow: hidden; }
  svg { display: block; width: 100%; height: 100%; max-width: 100vw; max-height: 100vh; }
  @media (prefers-reduced-motion: reduce) {
    /* the browsers that honour this on SMIL leave the drawing still */
    svg animate, svg animateTransform { display: none; }
  }
</style>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet"
     role="img" aria-labelledby="pelicanTitle pelicanDesc">
  <title id="pelicanTitle">A pelican riding a bicycle</title>
  <desc id="pelicanDesc">A white pelican in a rust-red neckerchief pedals a teal bicycle along a stone pier at
  low sun, one wing on the handlebar, a basket with a fish in it, the sea and a lighthouse behind him.</desc>
${defs()}
  <g id="world">
${sky()}
${far()}
${deck()}
${shadows()}
${bike()}
${rider()}
${air()}
    <g>
      ${el("animateTransform", { attributeName: "transform", type: "translate", from: "0 0", to: `${STRIP} 0`, dur: `${f(FORE_T, 4)}s`, repeatCount: "indefinite" })}
      <use href="#foreStrip" x="0"/><use href="#foreStrip" x="${STRIP}"/><use href="#foreStrip" x="${STRIP * 2}"/>
    </g>
  </g>
</svg>
</body>
</html>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, page);
console.log(`wrote ${path.relative(process.cwd(), OUT)} — ${(fs.statSync(OUT).size / 1024).toFixed(1)} kB`);
console.log(`deck ${f(SCROLL)} px/s (one strip per ${f(GROUND_T, 4)} s) · foreground ${f(FORE_T, 4)} s · link ${f(LINK, 2)} px`);
