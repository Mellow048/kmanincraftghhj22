#!/usr/bin/env node
/**
 * A pelican riding a bicycle — "salt flat, early light".
 *
 * Emits one self-contained HTML file: one inline SVG, no JavaScript, no
 * images, no fonts, no network. Every movement is a native <animate> or
 * <animateTransform>. Portrait 900 x 1350, risograph palette.
 *
 *   node scripts/build-pelican-saltflat.mjs [phase] [--svg] [--check]
 *
 * The mechanics, solved here and asserted by --check:
 *   • wheels r=150 turn once per 0.9 s; the cranks turn 2:1, once per 1.8 s
 *     (36t ring r=32 driving an 18t cog r=16 — one pitch, 5.585 px, at both)
 *   • one wheel turn covers 2π·150 = 942.48 px, so the salt cracks scroll
 *     exactly 942.48 px per 0.9 s, over tiles a quarter of that wide
 *   • the chain marches at 2π·32 / 1.8 = 111.70 px/s = 20 pitches a second
 *   • the legs are solved: pedal on the crank circle, knee at the forward
 *     intersection of the thigh circle (96) and the shin circle (92)
 */
import fs from "node:fs";
import path from "node:path";

/* ── the drawing ────────────────────────────────────────────────────────── */

const W = 900;
const H = 1350;
const GROUND = 1190;
const HORIZON = 800;
const OX = -22; // the rig, nudged so the bill tip has air on its right

const R_WHEEL = 150;
const REAR = { x: 225, y: GROUND - R_WHEEL };
const FRONT = { x: 715, y: GROUND - R_WHEEL };
const BB = { x: 455, y: 1072 };
const CRANK_R = 44;
const RING_R = 32;
const RING_T = 36;
const COG_R = 16;
const COG_T = 18;
const CRANK_T = 1.8;
const WHEEL_T = 0.9;
const GEAR = CRANK_T / WHEEL_T;

const HIP = { x: 378, y: 958 };
const HIP_FAR = { x: 370, y: 952 };
const THIGH = 96;
const SHIN = 92;
const ANKLE_UP = 9;
const KEYFRAMES = 48;

const PAPER = "#f2e9d8";
const SALT = "#e5d7bb";
const WHITE = "#fdf8ec";
const INK = "#1b2a3f";
const INK2 = "#41536a";
const CORAL = "#dd5738";
const AMBER = "#eca53b";
const AMBER_D = "#d68f22";

const phase = Number(process.argv[2] ?? 0);
const PHASE_DEG = 360 * phase;
const WANT_SVG = process.argv.includes("--svg");
const WANT_CHECK = process.argv.includes("--check");

/* ── arithmetic ─────────────────────────────────────────────────────────── */

const r2 = (n) => Math.round(n * 100) / 100;
const pt = (p) => `${r2(p.x)} ${r2(p.y)}`;
const rad = (d) => (d * Math.PI) / 180;
const keyTimes = (n) => Array.from({ length: n + 1 }, (_, i) => r2(i / n)).join(";");
const valuesOf = (frames, fn) => frames.map((f, i) => fn(f, i)).join(";");

function pedalAt(deg) {
  return { x: BB.x + CRANK_R * Math.cos(rad(deg)), y: BB.y + CRANK_R * Math.sin(rad(deg)) };
}

/** Forward knee: the intersection of the thigh circle and the shin circle. */
function knee(hip, foot) {
  const dx = foot.x - hip.x;
  const dy = foot.y - hip.y;
  const d = Math.hypot(dx, dy);
  if (d > THIGH + SHIN || d < Math.abs(THIGH - SHIN)) throw new Error(`leg cannot reach: ${r2(d)} px`);
  const a = (THIGH * THIGH - SHIN * SHIN + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, THIGH * THIGH - a * a));
  const ux = dx / d;
  const uy = dy / d;
  const mx = hip.x + ux * a;
  const my = hip.y + uy * a;
  const k1 = { x: mx - uy * h, y: my + ux * h };
  const k2 = { x: mx + uy * h, y: my - ux * h };
  return k1.x >= k2.x ? k1 : k2;
}

function legFrames(hip, offsetDeg) {
  const out = [];
  for (let i = 0; i <= KEYFRAMES; i++) {
    const deg = offsetDeg + PHASE_DEG + (360 * i) / KEYFRAMES;
    const pedal = pedalAt(deg);
    const ankle = { x: pedal.x, y: pedal.y - ANKLE_UP };
    out.push({ pedal, ankle, knee: knee(hip, ankle), deg });
  }
  return out;
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A feather with a rounded tip, for the folded primaries. */
function blade(a, b, width, bow = 0.1) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const mx = (a.x + b.x) / 2 - dx * bow;
  const my = (a.y + b.y) / 2 - dy * bow;
  const c1 = { x: mx + nx * width, y: my + ny * width };
  const c2 = { x: mx - nx * width, y: my - ny * width };
  const t = { x: b.x + nx * width * 0.42, y: b.y + ny * width * 0.42 };
  const t2 = { x: b.x - nx * width * 0.42, y: b.y - ny * width * 0.42 };
  return `M ${pt(a)} Q ${pt(c1)} ${pt(t)} A ${r2(width * 0.42)} ${r2(width * 0.42)} 0 0 1 ${pt(t2)} Q ${pt(
    c2
  )} ${pt(a)} Z`;
}

/** A rounded feather blade from a to b. */
function feather(a, b, width, bow = 0.16) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const mx = (a.x + b.x) / 2 - dx * bow;
  const my = (a.y + b.y) / 2 - dy * bow;
  const c1 = { x: mx + nx * width, y: my + ny * width };
  const c2 = { x: mx - nx * width, y: my - ny * width };
  return `M ${pt(a)} Q ${pt(c1)} ${pt(b)} Q ${pt(c2)} ${pt(a)} Z`;
}

/* ── the chain ──────────────────────────────────────────────────────────── */

function chainGeometry() {
  const dx = REAR.x - BB.x;
  const dy = REAR.y - BB.y;
  const d = Math.hypot(dx, dy);
  const base = Math.atan2(dy, dx);
  const alpha = Math.acos((RING_R - COG_R) / d);
  const on = (c, r, a) => ({ x: c.x + r * Math.cos(a), y: c.y + r * Math.sin(a) });
  const t1 = on(BB, RING_R, base + alpha);
  const t2 = on(REAR, COG_R, base + alpha);
  const b1 = on(BB, RING_R, base - alpha);
  const b2 = on(REAR, COG_R, base - alpha);
  const dPath = [
    `M ${pt(t1)}`,
    `L ${pt(t2)}`,
    `A ${COG_R} ${COG_R} 0 0 0 ${pt(b2)}`,
    `L ${pt(b1)}`,
    `A ${RING_R} ${RING_R} 0 0 0 ${pt(t1)}`,
    "Z",
  ].join(" ");
  const length =
    Math.hypot(t2.x - t1.x, t2.y - t1.y) +
    COG_R * (Math.PI - 2 * alpha) +
    Math.hypot(b1.x - b2.x, b1.y - b2.y) +
    RING_R * (Math.PI + 2 * alpha);
  return { d: dPath, length, pitch: (2 * Math.PI * RING_R) / RING_T, speed: (2 * Math.PI * RING_R) / CRANK_T };
}

const CHAIN = chainGeometry();
const ROAD_PER_TURN = 2 * Math.PI * R_WHEEL;
const TILE = ROAD_PER_TURN / 4; // the crack pattern repeats 4x a wheel turn
const SCROLL = TILE * 2; // two tiles per half turn: seam-free at any speed

/* ── the salt flat ──────────────────────────────────────────────────────── */

function crackShapes(seed, x0, width) {
  const rnd = mulberry32(seed);
  const out = [];
  for (let i = 0; i < 14; i++) {
    const x = x0 + 16 + rnd() * (width - 32);
    const y = HORIZON + 26 + rnd() * (H - HORIZON - 46);
    const segs = 2 + Math.floor(rnd() * 3);
    let d = `M ${r2(x)} ${r2(y)}`;
    let cx = x;
    let cy = y;
    for (let s = 0; s < segs; s++) {
      const ang = -32 + rnd() * 64;
      const len = 11 + rnd() * 34;
      cx += Math.cos(rad(ang)) * len;
      cy += Math.sin(rad(ang)) * len * 0.3;
      d += ` L ${r2(cx)} ${r2(cy)}`;
      if (rnd() > 0.62) {
        d += ` L ${r2(cx + Math.cos(rad(ang + 76)) * (6 + rnd() * 13))} ${r2(cy + Math.sin(rad(ang + 76)) * (4 + rnd() * 7))}`;
      }
    }
    out.push(d);
  }
  return out;
}

function crackStrip() {
  const paths = [];
  for (let i = 0; i < 7; i++) paths.push(...crackShapes(470011 + i * 37, -TILE + i * 2 * TILE, TILE));
  return `<g fill="none" stroke="${INK}" stroke-width="1.7" stroke-linecap="round" opacity=".2">${paths
    .map((d) => `<path d="${d}"/>`)
    .join("")}</g>`;
}

function crystals() {
  const rnd = mulberry32(99117);
  const out = [];
  for (let i = 0; i < 24; i++) {
    const x = -40 + rnd() * (W + 80);
    const y = GROUND - 8 + rnd() * (H - GROUND + 4);
    const s = 2.4 + rnd() * 5.5;
    out.push(
      `<path d="M ${r2(x)} ${r2(y)} l ${r2(s)} ${r2(-s * 0.66)} l ${r2(s * 0.55)} ${r2(s * 0.66)} Z" fill="${INK}" opacity="${r2(
        0.08 + rnd() * 0.14
      )}"/>`
    );
  }
  return `<g>${out.join("")}</g>`;
}

function skyline() {
  return `<g fill="${INK}" opacity=".13">
      <path d="M -30 ${HORIZON} L -30 756 L 92 756 L 118 776 L 186 776 L 210 ${HORIZON} Z"/>
      <path d="M 296 ${HORIZON} L 326 766 L 400 766 L 416 784 L 468 784 L 484 ${HORIZON} Z"/>
      <path d="M 556 ${HORIZON} L 588 760 L 700 760 L 726 780 L 802 780 L 832 ${HORIZON} Z"/>
      <path d="M 742 ${HORIZON} L 772 776 L 850 776 L 878 ${HORIZON} Z"/>
    </g>
    <g fill="${INK}" opacity=".07">
      <path d="M 60 800 C 96 786 150 786 186 800 Z"/>
      <path d="M 430 800 C 470 782 540 782 578 800 Z"/>
      <path d="M 700 800 C 726 788 776 788 802 800 Z"/>
    </g>
    <rect x="0" y="${HORIZON}" width="${W}" height="26" fill="${INK}" opacity=".05"/>
    <rect x="0" y="${HORIZON - 2}" width="${W}" height="2.5" fill="${INK}" opacity=".3"/>`;
}

function sun() {
  const cx = 176;
  const cy = 348;
  const r = 186;
  const dots = [];
  for (let ring = 0; ring < 5; ring++) {
    const rr = r + 12 + ring * 12;
    const n = 24 + ring * 9;
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i + ring * 5;
      dots.push(
        `<circle cx="${r2(cx + Math.cos(rad(a)) * rr)}" cy="${r2(cy + Math.sin(rad(a)) * rr)}" r="${r2(2.4 - ring * 0.29)}"/>`
      );
    }
  }
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${AMBER}"/>
    <g fill="${AMBER}" opacity=".65">${dots.join("")}</g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="2.4" opacity=".7"/>
  </g>`;
}

function farBirds() {
  const b = (x, y, s) =>
    `<path d="M ${r2(x - 15 * s)} ${r2(y)} q ${r2(7.5 * s)} ${r2(-7 * s)} ${r2(15 * s)} 0 q ${r2(7.5 * s)} ${r2(
      -7 * s
    )} ${r2(15 * s)} 0" fill="none" stroke="${INK}" stroke-width="${r2(2.1 * s)}" stroke-linecap="round" opacity=".5"/>`;
  return `<g>
    <animateTransform attributeName="transform" type="translate" values="0 0;20 -4;0 0" dur="19s" repeatCount="indefinite"/>
    ${b(598, 322, 1)} ${b(664, 276, 0.78)} ${b(724, 336, 0.62)} ${b(786, 262, 0.5)} ${b(842, 310, 0.4)}
  </g>`;
}

/* ── wheels, frame, chain ───────────────────────────────────────────────── */

function spokes(c, n = 16) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (360 / n) * i + 7.5;
    out.push(
      `<line x1="${r2(c.x)}" y1="${r2(c.y)}" x2="${r2(c.x + Math.cos(rad(a)) * (R_WHEEL - 14))}" y2="${r2(
        c.y + Math.sin(rad(a)) * (R_WHEEL - 14)
      )}"/>`
    );
  }
  return out.join("");
}

function teeth(c, r, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (360 / n) * i;
    const x = c.x + Math.cos(rad(a)) * r;
    const y = c.y + Math.sin(rad(a)) * r;
    out.push(
      `<rect x="${r2(x - 2)}" y="${r2(y - 2)}" width="4" height="4" fill="${INK}" transform="rotate(${r2(a)} ${r2(
        x
      )} ${r2(y)})"/>`
    );
  }
  return `<g>${out.join("")}</g>`;
}

function wheel(c, extra = "") {
  return `<g>
    <circle cx="${c.x}" cy="${c.y}" r="${R_WHEEL - 4}" fill="none" stroke="${INK}" stroke-width="13"/>
    <circle cx="${c.x}" cy="${c.y}" r="${R_WHEEL - 4}" fill="none" stroke="${PAPER}" stroke-width="4" opacity=".35"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" from="0 ${c.x} ${c.y}" to="360 ${c.x} ${c.y}" dur="${WHEEL_T}s" repeatCount="indefinite"/>
      <g stroke="${INK}" stroke-width="1.5" opacity=".38">${spokes(c)}</g>
      <circle cx="${c.x}" cy="${c.y}" r="${R_WHEEL - 12}" fill="none" stroke="${INK}" stroke-width="3.5"/>
      ${extra}
    </g>
    <circle cx="${c.x}" cy="${c.y}" r="13" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
    <circle cx="${c.x}" cy="${c.y}" r="4" fill="${INK}"/>
  </g>`;
}

function guard(c, from, to) {
  const r = R_WHEEL - 1;
  const arc = `M ${r2(c.x + r * Math.cos(rad(from)))} ${r2(c.y + r * Math.sin(rad(from)))} A ${r} ${r} 0 0 1 ${r2(
    c.x + r * Math.cos(rad(to))
  )} ${r2(c.y + r * Math.sin(rad(to)))}`;
  return `<g fill="none" stroke-linecap="round">
    <path d="${arc}" stroke="${INK}" stroke-width="13"/>
    <path d="${arc}" stroke="${CORAL}" stroke-width="8"/>
    <path d="${arc}" stroke="${PAPER}" stroke-width="2" opacity=".45" transform="translate(0 -4)"/>
  </g>`;
}

function frame() {
  const seatTop = { x: 386, y: 952 };
  const headTop = { x: 658, y: 806 };
  const headBot = { x: 672, y: 866 };
  const tube = (a, b, w = 9) => `<path d="M ${pt(a)} L ${pt(b)}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round"/>`;
  return `<g>
    ${tube(BB, REAR, 7)}
    ${tube(seatTop, REAR, 7)}
    ${tube(seatTop, BB, 10)}
    ${tube({ x: 396, y: 940 }, { x: 654, y: 810 }, 9)}
    ${tube(BB, { x: 666, y: 852 }, 10)}
    ${tube(headTop, headBot, 12)}
    ${tube({ x: 668, y: 858 }, FRONT, 8)}
    ${tube(seatTop, { x: 382, y: 938 }, 7)}
    <path d="M ${headTop.x} ${headTop.y} L 664 780" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
    <path d="M 664 780 C 648 770 630 772 618 782" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 648 776 L 616 786" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
    <path d="M 648 776 L 616 786" stroke="${PAPER}" stroke-width="5" stroke-linecap="round" opacity=".45"/>
    <circle cx="668" cy="778" r="6.5" fill="${AMBER}" stroke="${INK}" stroke-width="2.4"/>
  </g>`;
}

function saddle() {
  return `<g>
    <path d="M 352 950 C 366 940 400 938 414 946 C 410 958 380 962 358 960 Z" fill="${CORAL}" stroke="${INK}" stroke-width="3"/>
    <path d="M 358 950 C 374 946 396 946 410 948" stroke="${INK}" stroke-width="1.5" opacity=".4" fill="none"/>
  </g>`;
}

function crankAssembly(near, far) {
  const pNear = near.frames[0].pedal;
  const pFar = far.frames[0].pedal;
  const arm = (p, w, o) =>
    `<path d="M ${pt(BB)} L ${r2(p.x)} ${r2(p.y)}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;
  return `<g>
    ${arm(pFar, 9, 0.5)}
    <circle cx="${BB.x}" cy="${BB.y}" r="${RING_R}" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" from="${PHASE_DEG} ${BB.x} ${BB.y}" to="${PHASE_DEG + 360} ${BB.x} ${BB.y}" dur="${CRANK_T}s" repeatCount="indefinite"/>
      ${(function () {
        const arms = [];
        for (let i = 0; i < 5; i++) {
          const a = rad(i * 72 + 18);
          arms.push(
            `<path d="M ${r2(BB.x + Math.cos(a) * 9)} ${r2(BB.y + Math.sin(a) * 9)} L ${r2(BB.x + Math.cos(a) * (RING_R - 6))} ${r2(
              BB.y + Math.sin(a) * (RING_R - 6)
            )}" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" opacity=".55"/>`
          );
        }
        return arms.join("");
      })()}
      ${teeth(BB, RING_R, RING_T)}
      <circle cx="${BB.x}" cy="${BB.y}" r="${RING_R - 13}" fill="none" stroke="${INK}" stroke-width="2" opacity=".35"/>
      ${arm(pNear, 10, 1)}
    </g>
    <circle cx="${BB.x}" cy="${BB.y}" r="10" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
  </g>`;
}

function pedalMarkup(frames, lvl) {
  const p0 = frames[0].pedal;
  const rel = valuesOf(frames, (f) => `${r2(f.pedal.x - p0.x)} ${r2(f.pedal.y - p0.y)}`);
  return `<g transform="translate(${r2(p0.x)} ${r2(p0.y)})">
    <g>
      <animateTransform attributeName="transform" type="translate" values="${rel}" keyTimes="${keyTimes(
    KEYFRAMES
  )}" dur="${CRANK_T}s" repeatCount="indefinite" calcMode="linear"/>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="${CRANK_T}s" repeatCount="indefinite"/>
        <rect x="-20" y="-6" width="40" height="12" rx="3" fill="${INK}"/>
        <rect x="-20" y="-6" width="40" height="5.5" rx="2.5" fill="${PAPER}" opacity=".5"/>
        <rect x="-14" y="-2" width="28" height="2" fill="${INK}" opacity=".5"/>
      </g>
    </g>
  </g>`;
}

function chainMarkup() {
  const dash = CHAIN.pitch * 0.52;
  const gap = CHAIN.pitch - dash;
  const advance = CHAIN.speed * CRANK_T; // = ring circumference, exactly 36 pitches
  return `<g>
    <path d="${CHAIN.d}" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>
    <path d="${CHAIN.d}" fill="none" stroke="${INK}" stroke-width="4.5" stroke-dasharray="${r2(dash)} ${r2(
    gap
  )}" stroke-dashoffset="0">
      <animate attributeName="stroke-dashoffset" from="0" to="${r2(-advance)}" dur="${CRANK_T}s" repeatCount="indefinite"/>
    </path>
    <path d="${CHAIN.d}" fill="none" stroke="${PAPER}" stroke-width="1.6" opacity=".5" stroke-dasharray="1.4 3.4">
      <animate attributeName="stroke-dashoffset" from="0" to="${r2(-advance)}" dur="${CRANK_T}s" repeatCount="indefinite"/>
    </path>
  </g>`;
}

/* ── the pelican ────────────────────────────────────────────────────────── */

const BODY = [
  "M 505 762",
  "C 470 726 402 716 350 742",
  "C 306 764 282 806 280 852",
  "C 278 902 300 940 344 958",
  "C 396 980 470 976 508 950",
  "C 540 928 556 888 552 846",
  "C 548 806 532 784 505 762",
  "Z",
].join(" ");

const NECK = [
  "M 470 792",
  "C 508 766 540 730 556 694",
  "C 568 668 580 646 596 632",
  "L 632 660",
  "C 616 674 604 696 592 722",
  "C 572 762 542 796 512 818",
  "Z",
].join(" ");

const headC = { x: 606, y: 620 };
const billRoot = { x: 642, y: 612 };
const BILL = [
  "M 638 600",
  "C 700 604 790 616 848 628",
  "C 862 631 866 638 858 642",
  "C 852 640 846 636 836 634",
  "C 776 626 690 616 640 614",
  "Z",
].join(" ");

const BILL_LOW = [
  "M 640 614",
  "C 694 618 774 628 840 636",
  "C 848 637 854 640 857 643",
  "C 800 640 708 632 642 628",
  "Z",
].join(" ");

const POUCH = [
  "M 642 626",
  "C 652 686 690 748 748 768",
  "C 806 788 844 756 852 652",
  "C 806 646 718 634 642 626",
  "Z",
].join(" ");

const WING = [
  "M 486 782",
  "C 520 776 556 772 588 772",
  "C 606 772 618 777 621 786",
  "C 624 796 616 804 602 806",
  "C 570 810 528 816 500 822",
  "C 486 825 476 816 478 802",
  "C 479 792 481 786 486 782",
  "Z",
].join(" ");

const WING_TIP = [
  "M 610 778",
  "C 620 769 634 772 636 781",
  "C 638 791 629 798 620 795",
  "C 613 793 608 785 610 778",
  "Z",
].join(" ");

function primaries() {
  const d = [
    "M 570 792",
    "C 544 802 502 824 456 846",
    "L 434 862 L 456 870",
    "L 446 890 L 470 894",
    "L 466 916",
    "C 512 892 548 848 572 810",
    "Z",
  ].join(" ");
  return `<g>
    <path d="${d}" fill="${INK}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    <g stroke="${PAPER}" stroke-width="1.6" opacity=".28" fill="none">
      <path d="M 552 812 C 522 830 490 848 456 862"/>
      <path d="M 540 830 C 512 850 486 872 468 890"/>
    </g>
  </g>`;
}

function tailFeathers() {
  return `<g stroke="${INK}" stroke-width="2.8" stroke-linejoin="round" fill="${WHITE}">
    <path d="${blade({ x: 340, y: 862 }, { x: 252, y: 892 }, 19, -0.05)}"/>
    <path d="${blade({ x: 344, y: 886 }, { x: 262, y: 922 }, 18, -0.03)}"/>
    <path d="${blade({ x: 350, y: 906 }, { x: 286, y: 946 }, 16)}"/>
  </g>`;
}

function scarf() {
  const k = { x: 502, y: 782 };
  const wave = `-3.5 ${k.x} ${k.y};3.5 ${k.x} ${k.y};-3.5 ${k.x} ${k.y}`;
  const FLY = [
    "M 500 770",
    "C 468 748 434 724 396 712",
    "C 364 702 330 704 304 714",
    "L 316 730",
    "L 300 738",
    "C 330 728 364 726 396 736",
    "C 432 748 466 768 496 794",
    "Z",
  ].join(" ");
  return `<g>
    <g>
      <animateTransform attributeName="transform" type="rotate" values="${wave}" dur="${CRANK_T}s" repeatCount="indefinite"/>
      <path d="${FLY}" fill="${CORAL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M 330 706 C 366 702 398 706 424 716" stroke="${INK}" stroke-width="1.4" opacity=".28" fill="none"/>
    </g>
    <path d="M 490 770 C 494 758 512 754 524 762 C 534 769 534 783 522 790 C 508 797 490 790 488 780 Z"
      fill="${CORAL}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 496 772 C 506 767 516 768 522 773" stroke="${INK}" stroke-width="1.4" opacity=".38" fill="none"/>
  </g>`;
}

function bird() {
  const bob = `<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0;0 2;0 0"
      keyTimes="0;0.25;0.5;0.75;1" dur="${WHEEL_T}s" repeatCount="indefinite"/>`;
  return `<g>
    <g>${bob}
      ${tailFeathers()}
      <path d="${NECK}" fill="${WHITE}" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="${BODY}" fill="${WHITE}" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
      <g stroke="${INK}" stroke-width="1.7" opacity=".16" fill="none">
        <path d="M 330 806 C 352 800 374 802 390 810"/>
        <path d="M 318 848 C 344 842 370 844 392 854"/>
        <path d="M 322 892 C 348 888 374 892 396 902"/>
      </g>
      <path d="M 286 880 C 300 940 360 986 440 986 C 480 986 512 968 528 940 C 500 962 462 970 424 962 C 366 950 316 924 286 880 Z"
        fill="${AMBER}" opacity=".07"/>
      <path d="M 292 906 C 330 928 392 942 446 940" stroke="${INK}" stroke-width="2" opacity=".16" fill="none"/>
      <path d="M 520 792 C 546 764 566 732 580 700" stroke="${INK}" stroke-width="1.6" opacity=".16" fill="none"/>
      ${primaries()}
      <g>
        <circle cx="${headC.x}" cy="${headC.y}" r="42" fill="${WHITE}" stroke="${INK}" stroke-width="3.2"/>
        <path d="M 596 612 C 606 606 618 606 626 610 C 616 616 604 616 596 612 Z" fill="${AMBER}" opacity=".85"/>
        <circle cx="622" cy="606" r="5" fill="${INK}"/>
        <circle cx="624" cy="604" r="1.6" fill="${WHITE}"/>
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values="0 ${billRoot.x} ${billRoot.y};1.3 ${billRoot.x} ${billRoot.y};0 ${billRoot.x} ${billRoot.y};-1.5 ${billRoot.x} ${billRoot.y};0 ${billRoot.x} ${billRoot.y}"
          keyTimes="0;0.25;0.5;0.75;1" dur="${CRANK_T}s" repeatCount="indefinite"/>
        <path d="${POUCH}" fill="${AMBER_D}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M 668 690 C 700 736 748 764 792 762" stroke="${INK}" stroke-width="2.2" opacity=".45" fill="none"/>
        <path d="M 700 612 C 740 616 780 622 812 628" stroke="${INK}" stroke-width="1.6" opacity=".42" fill="none"/>
        <path d="${BILL}" fill="${AMBER}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
        <path d="${BILL_LOW}" fill="${AMBER_D}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
        <circle cx="662" cy="608" r="2.4" fill="${INK}" opacity=".55"/>
      </g>
      <path d="M 490 820 C 530 816 574 812 604 808" stroke="${INK}" stroke-width="3" opacity=".18" fill="none"/>
      <path d="${WING}" fill="#f7f2e3" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="${WING_TIP}" fill="#f7f2e3" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <g stroke="${INK}" stroke-width="1.6" opacity=".25" fill="none">
        <path d="M 508 812 C 536 814 566 818 592 822"/>
        <path d="M 500 818 C 528 821 558 826 584 831"/>
      </g>
      ${scarf()}
    </g>
  </g>`;
}

/* ── legs and feet ──────────────────────────────────────────────────────── */

function footPath() {
  return [
    "M -10 0",
    "C -5 -8 6 -8 15 -6",
    "L 38 -8",
    "C 48 -9 53 -1 47 6",
    "C 44 13 37 19 29 20",
    "C 16 22 1 17 -9 10",
    "Z",
  ].join(" ");
}

function legMarkup(frames, hip, colour, w) {
  const framePath = (f) => `M ${pt(hip)} L ${pt(f.knee)} L ${pt(f.ankle)}`;
  const d0 = framePath(frames[0]);
  const d = valuesOf(frames, framePath);
  return `<g>
    <path d="${d0}" fill="none" stroke="${INK}" stroke-width="${w + 5}" stroke-linejoin="round" stroke-linecap="round">
      <animate attributeName="d" values="${d}" keyTimes="${keyTimes(KEYFRAMES)}" dur="${CRANK_T}s" repeatCount="indefinite" calcMode="linear"/>
    </path>
    <path d="${d0}" fill="none" stroke="${colour}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round">
      <animate attributeName="d" values="${d}" keyTimes="${keyTimes(KEYFRAMES)}" dur="${CRANK_T}s" repeatCount="indefinite" calcMode="linear"/>
    </path>
    <circle r="7.5" fill="${colour}" stroke="${INK}" stroke-width="2.6" cx="${r2(frames[0].knee.x)}" cy="${r2(frames[0].knee.y)}">
      <animate attributeName="cx" values="${valuesOf(frames, (f) => r2(f.knee.x))}" keyTimes="${keyTimes(
    KEYFRAMES
  )}" dur="${CRANK_T}s" repeatCount="indefinite" calcMode="linear"/>
      <animate attributeName="cy" values="${valuesOf(frames, (f) => r2(f.knee.y))}" keyTimes="${keyTimes(
    KEYFRAMES
  )}" dur="${CRANK_T}s" repeatCount="indefinite" calcMode="linear"/>
    </circle>
  </g>`;
}

function footMarkup(frames, colour) {
  const a0 = frames[0].ankle;
  const rel = valuesOf(frames, (f) => `${r2(f.ankle.x - a0.x)} ${r2(f.ankle.y - a0.y)}`);
  return `<g transform="translate(${r2(a0.x)} ${r2(a0.y)})">
    <g>
      <animateTransform attributeName="transform" type="translate" values="${rel}" keyTimes="${keyTimes(
    KEYFRAMES
  )}" dur="${CRANK_T}s" repeatCount="indefinite" calcMode="linear"/>
      <path d="${footPath()}" fill="${colour}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/>
      <g stroke="${INK}" stroke-width="1.5" opacity=".4" fill="none">
        <path d="M 2 -3 L 36 -6"/>
        <path d="M 0 3 L 30 12"/>
        <path d="M -3 8 L 20 18"/>
      </g>
    </g>
  </g>`;
}

/* ── dust ───────────────────────────────────────────────────────────────── */

function dust() {
  const puff = (delay, x, y, s) => `<g opacity="0">
      <animate attributeName="opacity" values="0;.5;0" keyTimes="0;.35;1" dur="${WHEEL_T}s" begin="${delay}s" repeatCount="indefinite"/>
      <circle cx="${x}" cy="${y}" r="${5 + s}" fill="none" stroke="${INK}" stroke-width="2"/>
    </g>`;
  return `<g>${puff(0, 96, 1156, 0)}${puff(0.3, 84, 1148, 3)}${puff(0.6, 92, 1166, 2)}</g>`;
}

/* ── assemble ───────────────────────────────────────────────────────────── */

const NEAR = legFrames(HIP, 0);
const FAR = legFrames(HIP_FAR, 180);

const scene = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 ${W} 1214" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="t d">
  <title id="t">A pelican riding a bicycle</title>
  <desc id="d">A white pelican with a coral scarf pedals an ink-black bicycle across a salt flat in early light.
  The wheels, cranks, chain and legs are geared together so the feet stay on the pedals and the ground moves at the
  speed of the tyres.</desc>
  <defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="n"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${sun()}
  ${farBirds()}
  ${skyline()}

  <rect x="0" y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="${SALT}"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;${-r2(SCROLL)} 0" dur="${WHEEL_T}s" repeatCount="indefinite"/>
    ${crackStrip()}
    ${crackStrip()}
    ${crackStrip()}
  </g>
  ${crystals()}

  <g fill="${INK}" opacity=".1">
    <ellipse cx="470" cy="1196" rx="330" ry="15"/>
    <ellipse cx="${REAR.x}" cy="1196" rx="34" ry="7" opacity=".7"/>
    <ellipse cx="${FRONT.x}" cy="1196" rx="34" ry="7" opacity=".7"/>
  </g>

  ${dust()}

  <g transform="translate(${OX} 0)">
    ${legMarkup(FAR, HIP_FAR, "#c08018", 9)}
    ${pedalMarkup(FAR, "far")}
    ${footMarkup(FAR, "#c08018")}
    ${wheel(REAR, `<circle cx="${REAR.x}" cy="${REAR.y}" r="${COG_R}" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>${teeth(
  REAR,
  COG_R,
  COG_T
)}`)}
    ${wheel(FRONT)}
    ${frame()}
    ${saddle()}
    ${chainMarkup()}
    ${crankAssembly({ frames: NEAR }, { frames: FAR })}
    ${pedalMarkup(NEAR, "near")}
    ${legMarkup(NEAR, HIP, AMBER, 10)}
    ${bird()}
    ${footMarkup(NEAR, AMBER)}
    ${guard(REAR, 196, 344)}
    ${guard(FRONT, 186, 340)}
  </g>

  <rect width="${W}" height="${H}" filter="url(#grain)" opacity=".05"/>
</svg>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A pelican riding a bicycle — salt flat, early light</title>
<!--
  One file, one inline SVG, no JavaScript, no images, no fonts, no network.
  Every movement is a native SVG <animate> / <animateTransform>.

  The rig is geared, not decorated (all solved by scripts/build-pelican-saltflat.mjs):
    · wheels r=150, one turn per 0.9 s; cranks 2:1, one turn per 1.8 s
    · 36t chainring r=32 driving an 18t cog r=16, one pitch of 5.585 px at both
    · chain 111.70 px/s = 20 pitches a second; the dashes march with the links
    · the salt cracks move exactly 2π·150 = 942.48 px per wheel turn
    · 48 leg keyframes: pedal on the crank circle, knee at the forward
      intersection of the thigh (96) and shin (92) — the foot never leaves the pedal
-->
<style>
  html, body { margin: 0; height: 100%; background: #f2e9d8; }
  body { display: grid; place-items: center; }
  svg { display: block; width: 100%; height: 100%; max-height: 100vh; }
</style>
</head>
<body>
${scene}
</body>
</html>`;

/* ── checks ─────────────────────────────────────────────────────────────── */

if (WANT_CHECK) {
  let worstFoot = 0;
  let worstThigh = 0;
  let worstShin = 0;
  for (const [hip, set] of [
    [HIP, NEAR],
    [HIP_FAR, FAR],
  ]) {
    for (const f of set) {
      worstFoot = Math.max(worstFoot, Math.hypot(f.ankle.x - f.pedal.x, f.ankle.y - (f.pedal.y - ANKLE_UP)));
      worstThigh = Math.max(worstThigh, Math.abs(Math.hypot(f.knee.x - hip.x, f.knee.y - hip.y) - THIGH));
      worstShin = Math.max(worstShin, Math.abs(Math.hypot(f.ankle.x - f.knee.x, f.ankle.y - f.knee.y) - SHIN));
    }
  }
  const pitch = (2 * Math.PI * RING_R) / RING_T;
  const pitch2 = (2 * Math.PI * COG_R) / COG_T;
  const advance = CHAIN.speed * CRANK_T;
  const ok = (cond, label) => console.log(`${cond ? "ok  " : "FAIL"}  ${label}`);
  ok(Math.abs(pitch - pitch2) < 1e-9, `one pitch at both sprockets: 36t r32 = 18t r16 = ${pitch.toFixed(4)} px`);
  ok(Math.abs(advance - 2 * Math.PI * RING_R) < 1e-9, `chain advances ${advance.toFixed(2)} px per crank turn = the ring's circumference`);
  ok(Math.abs(advance / pitch - RING_T) < 1e-9, `that is exactly ${RING_T} pitches, so the dash loop has no seam`);
  ok(Math.abs(ROAD_PER_TURN - 2 * Math.PI * R_WHEEL) < 1e-9, `ground moves ${ROAD_PER_TURN.toFixed(2)} px per wheel turn = 2π·150`);
  ok(Math.abs(SCROLL * 2 - ROAD_PER_TURN) < 1e-9, `the crack strip repeats ${r2(SCROLL)} px, half a turn, twice a turn`);
  ok(worstFoot < 1e-9, `all ${NEAR.length * 2} keyframes: ankle on the pedal (worst ${worstFoot.toExponential(1)} px)`);
  ok(worstThigh < 1e-9, `thigh length constant at ${THIGH} (worst ${worstThigh.toExponential(1)})`);
  ok(worstShin < 1e-9, `shin length constant at ${SHIN} (worst ${worstShin.toExponential(1)})`);
  ok(GEAR === 2, `gear 2:1 — ${(1 / CRANK_T).toFixed(2)} crank rev/s, ${(1 / WHEEL_T).toFixed(2)} wheel rev/s`);
  ok(!/<script/i.test(html), "no JavaScript");
  ok(!/https?:\/\/(?!www\.w3\.org)/i.test(html), "no network references");
}

fs.writeFileSync(path.join(process.cwd(), "pelican-saltflat.html"), html);
if (WANT_SVG) fs.writeFileSync("/tmp/pelican-saltflat.svg", scene);
console.log(
  `pelican-saltflat.html  ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB  phase ${phase}\n` +
    `chain ${CHAIN.length.toFixed(1)} px · ground ${(ROAD_PER_TURN / WHEEL_T).toFixed(0)} px/s · chain ${CHAIN.speed.toFixed(1)} px/s`
);
