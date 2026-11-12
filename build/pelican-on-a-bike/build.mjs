#!/usr/bin/env node
/**
 * pelican-on-a-bike.html — a pelican riding a bicycle along a seaside boardwalk.
 * Pure inline SVG, animated with SMIL. No frameworks, no images, no script.
 *
 * The generator exists so the mechanics can be computed rather than eyeballed:
 * the two-bone leg is solved with inverse kinematics for every frame of the crank
 * revolution, the wheel speed comes from the gear ratio so the boardwalk scrolls
 * at exactly the rate the tyres roll, and the chain is a real external tangent
 * between two circles in the right radius ratio.
 *
 *   node build/pelican-on-a-bike/build.mjs                    → writes the page
 *   node build/pelican-on-a-bike/build.mjs --static --t=0.6   → one frame on stdout
 *
 * --static bakes every animated value at time t and drops all SMIL, which is what
 * rasterisers need in order to show a frame.
 */
import fs from "node:fs";
import path from "node:path";

/* ════════════════════════════════════════════════════════════════ arguments */
const argv = process.argv.slice(2);
const STATIC = argv.includes("--static") || process.env.PEL_STATIC === "1";
const T = parseFloat((argv.find((a) => a.startsWith("--t=")) || "--t=0").slice(4)) || 0;
const OUT = (argv.find((a) => a.startsWith("--out=")) || "").slice(6);
const BIRD_ONLY = argv.includes("--bird");
const ROOT = path.resolve(import.meta.dirname, "..", "..");

/* ══════════════════════════════════════════════════════════════════ palette */
const INK = "#1b2733";
const SKY = ["#2e7fa8", "#69b0cd", "#a8d4e2", "#dcecf0"];
const SEA = ["#2f86a4", "#1a5f7d"];
const WAT = ["#155976", "#0a3040"];
const DECK = { top: "#d9b184", mid: "#c09059", low: "#8a5f33", dark: "#5d3d1d", line: "#e8c79b" };
const FRM = "#166b86", FRM_D = "#0b4356", FRM_L = "#37a7c4";
const CHR = "#eef3f8", CHR_M = "#b6c4d1", CHR_D = "#8b9aa8";
const SAD = "#8a5a2f", SAD_L = "#b07a45";
const SKN = "#efa23d", SKN_D = "#c8761f", SKN_L = "#ffc670";
const BIL = "#f7ae44", BIL_D = "#c9761f", POU = "#f0a044", POU_D = "#b96b16";
const RED = "#d94a34", RED_D = "#a83220", RED_L = "#ff7a5e";
const NVY = "#22344f", NVY_L = "#3b5378";
const FEA = "#ffffff", FEA_M = "#eaf2f9", FEA_S = "#c8d8e6", FEA_D = "#a9bed2";

/* ═════════════════════════════════════════════════════════════════ geometry */
const W = 1600, H = 1000;
const HORIZON = 690;
const DECK_Y = 862;                 // where the tyres touch the boards
const R = 205;                      // tyre outer radius
const REAR = { x: 395, y: DECK_Y - R };
const FRONT = { x: 1095, y: DECK_Y - R };
const BB = { x: 700, y: 706 };
const CRANK = 98;
const RING_R = 54, COG_R = 23;
const SEAT_TOP = { x: 618, y: 448 };
const SADDLE = { x: 578, y: 430 };
const HEAD_TOP = { x: 965, y: 452 };
const HEAD_BOT = { x: 1000, y: 578 };
const STEM = { x: 1006, y: 408 };
const GRIP = { x: 918, y: 418 };

const HIP = { x: 600, y: 402 };
const THIGH = 172, SHIN = 258;
const ANKLE_OFF = { x: 4, y: -22 };

const CRANK_T = 2.2;
const WHEEL_T = (CRANK_T * COG_R) / RING_R;
const V = (2 * Math.PI * R) / WHEEL_T;
const PITCH = 340;
const BOARD_T = PITCH / V;
const LINK = 26;
const CHAIN_V = ((2 * Math.PI) / CRANK_T) * RING_R;
const LINK_T = LINK / CHAIN_V;
const STEPS = 36;

/* ═════════════════════════════════════════════════════════════════ helpers */
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const n3 = (v) => Math.round(v * 1000) / 1000;
const series = (n, fn) => Array.from({ length: n + 1 }, (_, i) => n3(fn(i / n))).join(";");

function lerp(a, b, f) {
  const A = String(a).trim().split(/\s+/), B = String(b).trim().split(/\s+/);
  if (A.length !== B.length || A.some((v) => !isFinite(+v)) || B.some((v) => !isFinite(+v))) {
    return f < 0.5 ? String(a).trim() : String(b).trim();
  }
  return A.map((v, i) => n3(+v + (+B[i] - +v) * f)).join(" ");
}
function at(values, dur, t, keyTimes) {
  const vals = String(values).split(";");
  const n = vals.length - 1;
  if (n <= 0) return vals[0];
  const phase = (((t % dur) + dur) % dur) / dur;
  if (keyTimes) {
    const kt = String(keyTimes).split(";").map(Number);
    for (let i = 0; i < n; i++) {
      if (phase >= kt[i] && phase <= kt[i + 1]) return lerp(vals[i], vals[i + 1], (phase - kt[i]) / (kt[i + 1] - kt[i] || 1));
    }
    return vals[n];
  }
  const p = phase * n;
  const i = Math.min(n - 1, Math.floor(p));
  return lerp(vals[i], vals[i + 1], p - i);
}

function spin(values, dur, content) {
  const v = STATIC ? at(values, dur, T) : String(values).split(";")[0];
  const e = STATIC ? "" : `<animateTransform attributeName="transform" type="rotate" values="${values}" dur="${dur}s" repeatCount="indefinite" calcMode="linear"/>`;
  return `<g transform="rotate(${v})">${e}${content}</g>`;
}
/** rotate wrapper that can hold nested groups (spin() replaces its content) */
function rot(values, dur, content) {
  const v = STATIC ? at(values, dur, T) : String(values).split(";")[0];
  const e = STATIC ? "" : `<animateTransform attributeName="transform" type="rotate" values="${values}" dur="${dur}s" repeatCount="indefinite" calcMode="linear"/>`;
  return `<g transform="rotate(${v})">${e}${content}</g>`;
}
function slide(values, dur, content) {
  const v = STATIC ? at(values, dur, T) : String(values).split(";")[0];
  const e = STATIC ? "" : `<animateTransform attributeName="transform" type="translate" values="${values}" dur="${dur}s" repeatCount="indefinite" calcMode="linear"/>`;
  return `<g transform="translate(${v})">${e}${content}</g>`;
}
function track(name, values, dur, keyTimes) {
  const v = STATIC ? at(values, dur, T, keyTimes) : String(values).split(";")[0];
  const e = STATIC ? "" : `<animate attributeName="${name}" values="${values}" dur="${dur}s"${keyTimes ? ` keyTimes="${keyTimes}"` : ""} repeatCount="indefinite" calcMode="linear"/>`;
  return { a: `${name}="${v}"`, e };
}

/* ═════════════════════════════════════════════════════════════ inverse kinematics */
function ik(hip, ankle) {
  const dx = ankle.x - hip.x, dy = ankle.y - hip.y;
  const d = Math.hypot(dx, dy) || 1e-6;
  const ux = dx / d, uy = dy / d;
  const a = (THIGH * THIGH - SHIN * SHIN + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, THIGH * THIGH - a * a));
  const knee = { x: hip.x + ux * a + uy * h, y: hip.y + uy * a - ux * h };
  return {
    knee,
    thigh: deg(Math.atan2(knee.y - hip.y, knee.x - hip.x)),
    shin: deg(Math.atan2(ankle.y - knee.y, ankle.x - knee.x)),
  };
}
const pedalAt = (deg0) => ({ x: BB.x + CRANK * Math.cos(rad(deg0)), y: BB.y + CRANK * Math.sin(rad(deg0)) });
function poses(hip, phase) {
  return Array.from({ length: STEPS + 1 }, (_, i) => {
    const th = (i / STEPS) * 360 + phase;
    const p = pedalAt(th);
    const ankle = { x: p.x + ANKLE_OFF.x, y: p.y + ANKLE_OFF.y };
    const d = Math.hypot(ankle.x - hip.x, ankle.y - hip.y);
    if (d > THIGH + SHIN - 1) throw new Error(`leg cannot reach the pedal (${d.toFixed(1)} > ${THIGH + SHIN})`);
    if (d < Math.abs(THIGH - SHIN) + 1) throw new Error(`leg is folded shut (${d.toFixed(1)})`);
    return ik(hip, ankle);
  });
}

/* ═══════════════════════════════════════════════════════════════════ scenery */
function sky() {
  const pulse = track("r", "96;112;96", 6.8);
  const gull = (s) => `<g transform="scale(${s})" stroke="${INK}" stroke-width="${4 / s}" fill="none" stroke-linecap="round" opacity=".5">
      <path d="M0 0 C 10 -11, 22 -11, 31 1 C 40 -11, 52 -11, 62 0"/>
    </g>`;
  const cloud = (x, y, s, o, d, i) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}">
      ${slide(`0 0;${d} 0;0 0`, 30 + i * 8, `<g fill="#ffffff">
        <ellipse cx="0" cy="0" rx="92" ry="34"/><ellipse cx="-58" cy="14" rx="52" ry="26"/>
        <ellipse cx="52" cy="16" rx="60" ry="28"/><ellipse cx="10" cy="-22" rx="52" ry="30"/>
      </g>`)}
    </g>`;
  return `
  <rect width="${W}" height="${H}" fill="url(#skyG)"/>
  <circle cx="262" cy="208" r="240" fill="url(#sunGlow)"/>
  <circle cx="262" cy="208" fill="url(#sunCore)" ${pulse.a}>${pulse.e}</circle>
  <circle cx="262" cy="208" r="96" fill="none" stroke="#fffbe6" stroke-width="4" opacity=".55"/>
  ${cloud(210, 300, 1.0, 0.95, 54, 0)}
  ${cloud(980, 168, 1.3, 0.92, 40, 1)}
  ${cloud(1350, 372, 0.82, 0.82, 68, 2)}
  ${cloud(560, 108, 0.6, 0.7, 32, 3)}
  <g transform="translate(1180 300)">${gull(0.9)}</g>
  <g transform="translate(1265 350) rotate(6)">${gull(0.55)}</g>
  <g transform="translate(700 430)">${gull(0.42)}</g>`;
}

function sea() {
  const boats = [
    [200, 760, 0.9], [470, 742, 0.62], [860, 772, 1.0], [1290, 752, 0.72], [1460, 784, 0.5],
  ].map(
    ([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})" opacity=".9">
      <path d="M0 -46 L0 -2 L30 -2 Z" fill="#fdfefe"/>
      <path d="M-3 -34 L-3 -2 L-23 -2 Z" fill="#dceaf2"/>
      <path d="M-30 0 L34 0 L24 12 L-18 12 Z" fill="#2b3f52"/>
    </g>`
  ).join("");
  return `
  <rect x="0" y="${HORIZON}" width="${W}" height="${DECK_Y - HORIZON + 6}" fill="url(#seaG)"/>
  <rect x="0" y="${HORIZON}" width="${W}" height="3" fill="#e8f7fb" opacity=".75"/>
  <rect x="0" y="${HORIZON + 3}" width="${W}" height="60" fill="url(#seaHaze)"/>
  ${boats}
  <g stroke="#c6ecf6" stroke-width="3.5" stroke-linecap="round" opacity=".5">
    <path d="M120 742 h130"/><path d="M392 786 h86"/><path d="M700 754 h140"/>
    <path d="M1060 800 h96"/><path d="M1320 766 h150"/><path d="M250 818 h120"/>
    <path d="M900 828 h160"/><path d="M1420 812 h110"/>
  </g>`;
}

function deck() {
  const b1 = track("stroke-dashoffset", `0;${PITCH}`, BOARD_T);
  const b2 = track("stroke-dashoffset", `0;${PITCH}`, BOARD_T);
  const b3 = track("stroke-dashoffset", `0;${PITCH}`, BOARD_T);
  const plank = `${PITCH - 24}`;
  return `
  <rect x="0" y="${DECK_Y - 16}" width="${W}" height="20" fill="${DECK.dark}"/>
  <line x1="-${PITCH}" y1="${DECK_Y}" x2="${W + PITCH}" y2="${DECK_Y}"
        stroke="${DECK.top}" stroke-width="26" stroke-dasharray="${plank} 24"
        ${b1.a}>${b1.e}</line>
  <line x1="-${PITCH}" y1="${DECK_Y - 9}" x2="${W + PITCH}" y2="${DECK_Y - 9}"
        stroke="${DECK.line}" stroke-width="4" stroke-dasharray="${plank} 24"
        ${b2.a}>${b2.e}</line>
  <line x1="-${PITCH}" y1="${DECK_Y + 10}" x2="${W + PITCH}" y2="${DECK_Y + 10}"
        stroke="${DECK.mid}" stroke-width="5" stroke-dasharray="${plank} 24"
        ${b3.a}>${b3.e}</line>
  <rect x="0" y="${DECK_Y + 13}" width="${W}" height="14" fill="${DECK.mid}"/>
  <rect x="0" y="${DECK_Y + 27}" width="${W}" height="88" fill="${DECK.low}"/>
  <g stroke="${DECK.dark}" stroke-width="5" opacity=".55">
    ${Array.from({ length: 14 }, (_, i) => `<line x1="${40 + i * 118}" y1="${DECK_Y + 30}" x2="${40 + i * 118}" y2="${DECK_Y + 112}"/>`).join("")}
  </g>
  <rect x="0" y="${DECK_Y + 27}" width="${W}" height="6" fill="${DECK.dark}" opacity=".6"/>
  <rect x="0" y="${H - 26}" width="${W}" height="26" fill="#33200f"/>
  <g stroke="#2a1a0c" stroke-width="9" opacity=".8" stroke-linecap="round">
    ${Array.from({ length: 7 }, (_, i) => `<line x1="${96 + i * 232}" y1="${DECK_Y + 34}" x2="${96 + i * 232}" y2="${DECK_Y + 150}"/>`).join("")}
  </g>
  <ellipse cx="${(REAR.x + FRONT.x) / 2}" cy="${DECK_Y + 4}" rx="380" ry="15" fill="#7a5228" opacity=".45"/>`;
}

/* ─────────────────────────────────────────────────────────────────── wheel */
function wheel(hub, phase) {
  const spokes = Array.from({ length: 32 }, (_, i) => {
    const a = (i * Math.PI) / 16;
    return `<line x1="${n3(Math.cos(a) * 20)}" y1="${n3(Math.sin(a) * 20)}" x2="${n3(Math.cos(a) * 170)}" y2="${n3(Math.sin(a) * 170)}"
      stroke="${CHR_D}" stroke-width="${i % 2 ? 1.8 : 2.6}"/>`;
  }).join("");
  const valve = phase === "rear" ? 0 : 143;
  const body = `
    <circle cx="0" cy="0" r="${R - 16}" fill="none" stroke="#1a2733" stroke-width="34"/>
    <circle cx="0" cy="0" r="${R - 16}" fill="none" stroke="#2f4251" stroke-width="24"/>
    <circle cx="0" cy="0" r="${R - 34}" fill="none" stroke="${CHR_M}" stroke-width="9"/>
    <circle cx="0" cy="0" r="${R - 42}" fill="none" stroke="${CHR_D}" stroke-width="3"/>
    ${spokes}
    <g transform="rotate(${valve})">
      <rect x="${R - 48}" y="-6" width="30" height="12" rx="5" fill="#f0a63c" stroke="${INK}" stroke-width="3"/>
      <rect x="${-R + 30}" y="-5" width="22" height="10" rx="4" fill="#d94a34" stroke="${INK}" stroke-width="3"/>
    </g>
    <circle cx="0" cy="0" r="23" fill="${CHR}" stroke="${INK}" stroke-width="6"/>
    <circle cx="0" cy="0" r="9" fill="${CHR_D}" stroke="${INK}" stroke-width="3"/>`;
  return `<g transform="translate(${hub.x} ${hub.y})">${spin(series(STEPS, (f) => f * 360), WHEEL_T, body)}</g>`;
}

function fender(hub, from, to, w) {
  const r = R - 30;
  const p = (a) => `${n3(hub.x + r * Math.cos(rad(a)))} ${n3(hub.y + r * Math.sin(rad(a)))}`;
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  const d = `M${p(from)} A${r} ${r} 0 ${large} 1 ${p(to)}`;
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 10}" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="${FRM}" stroke-width="${w}" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="${FRM_L}" stroke-width="3.5" stroke-linecap="round" opacity=".8"/>`;
}

/* ─────────────────────────────────────────────────────────────────── frame */
function frame() {
  const tube = (a, b, w, c = FRM) => `
    <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${INK}" stroke-width="${w + 9}" stroke-linecap="round"/>
    <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>
    <line x1="${a.x}" y1="${a.y - w * 0.28}" x2="${b.x}" y2="${b.y - w * 0.28}" stroke="${FRM_L}" stroke-width="${Math.max(3, w * 0.24)}" stroke-linecap="round" opacity=".9"/>`;

  const fork = `<path d="M${HEAD_BOT.x} ${HEAD_BOT.y} C ${HEAD_BOT.x + 8} ${HEAD_BOT.y + 46}, ${FRONT.x - 22} ${FRONT.y - 44}, ${FRONT.x} ${FRONT.y}"
      fill="none" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>
    <path d="M${HEAD_BOT.x} ${HEAD_BOT.y} C ${HEAD_BOT.x + 8} ${HEAD_BOT.y + 46}, ${FRONT.x - 22} ${FRONT.y - 44}, ${FRONT.x} ${FRONT.y}"
      fill="none" stroke="${FRM}" stroke-width="16" stroke-linecap="round"/>
    <path d="M${HEAD_BOT.x - 6} ${HEAD_BOT.y} C ${HEAD_BOT.x + 2} ${HEAD_BOT.y + 46}, ${FRONT.x - 30} ${FRONT.y - 44}, ${FRONT.x - 8} ${FRONT.y}"
      fill="none" stroke="${FRM_L}" stroke-width="4" stroke-linecap="round" opacity=".8"/>`;

  const bar = `<g>
      <path d="M${HEAD_TOP.x} ${HEAD_TOP.y} L${STEM.x} ${STEM.y}" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>
      <path d="M${HEAD_TOP.x} ${HEAD_TOP.y} L${STEM.x} ${STEM.y}" stroke="${CHR_M}" stroke-width="13" stroke-linecap="round"/>
      <path d="M${STEM.x - 6} ${STEM.y + 4} C ${STEM.x + 10} ${STEM.y - 22}, ${GRIP.x + 60} ${GRIP.y - 20}, ${GRIP.x + 16} ${GRIP.y + 2}"
            fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/>
      <path d="M${STEM.x - 6} ${STEM.y + 4} C ${STEM.x + 10} ${STEM.y - 22}, ${GRIP.x + 60} ${GRIP.y - 20}, ${GRIP.x + 16} ${GRIP.y + 2}"
            fill="none" stroke="${CHR_M}" stroke-width="15" stroke-linecap="round"/>
      <path d="M${GRIP.x + 22} ${GRIP.y + 4} L${GRIP.x - 34} ${GRIP.y + 12}" stroke="${INK}" stroke-width="26" stroke-linecap="round"/>
      <path d="M${GRIP.x + 22} ${GRIP.y + 4} L${GRIP.x - 34} ${GRIP.y + 12}" stroke="#2b3743" stroke-width="18" stroke-linecap="round"/>
      <path d="M${GRIP.x + 16} ${GRIP.y - 2} L${GRIP.x - 26} ${GRIP.y + 4}" stroke="#54616d" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${STEM.x + 16}" cy="${STEM.y - 22}" r="13" fill="${CHR}" stroke="${INK}" stroke-width="5"/>
      <circle cx="${STEM.x + 16}" cy="${STEM.y - 34}" r="6.5" fill="#f0a63c" stroke="${INK}" stroke-width="3.5"/>
    </g>`;

  const saddle = `<g>
      <path d="M${SADDLE.x - 76} ${SADDLE.y + 14}
               C ${SADDLE.x - 44} ${SADDLE.y - 8}, ${SADDLE.x + 40} ${SADDLE.y - 10}, ${SADDLE.x + 70} ${SADDLE.y + 2}
               C ${SADDLE.x + 40} ${SADDLE.y + 16}, ${SADDLE.x - 40} ${SADDLE.y + 24}, ${SADDLE.x - 76} ${SADDLE.y + 14} Z"
            fill="${SAD}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
      <path d="M${SADDLE.x - 62} ${SADDLE.y + 8} C ${SADDLE.x - 26} ${SADDLE.y - 2}, ${SADDLE.x + 24} ${SADDLE.y - 4}, ${SADDLE.x + 54} ${SADDLE.y + 2}"
            fill="none" stroke="${SAD_L}" stroke-width="5" stroke-linecap="round"/>
      <path d="M${SEAT_TOP.x - 16} ${SEAT_TOP.y + 6} L${SADDLE.x - 18} ${SADDLE.y + 18}" stroke="${INK}" stroke-width="8" stroke-linecap="round" opacity=".8"/>
    </g>`;

  return `
    ${fender(REAR, 196, 22, 14)}
    ${fender(FRONT, 200, 18, 13)}
    ${tube({ x: BB.x, y: BB.y }, REAR, 11)}
    ${tube(SEAT_TOP, REAR, 10)}
    ${tube({ x: BB.x, y: BB.y }, HEAD_BOT, 19)}
    ${tube({ x: BB.x, y: BB.y }, SEAT_TOP, 19)}
    ${tube(SEAT_TOP, HEAD_TOP, 17)}
    ${tube(HEAD_TOP, HEAD_BOT, 21)}
    ${fork}
    ${bar}
    ${saddle}
    <circle cx="${REAR.x}" cy="${REAR.y}" r="10" fill="${CHR_D}" stroke="${INK}" stroke-width="4.5"/>
    <circle cx="${FRONT.x}" cy="${FRONT.y}" r="10" fill="${CHR_D}" stroke="${INK}" stroke-width="4.5"/>`;
}

/* ────────────────────────────────────────────────── chainring, cog, chain */
function drivetrain() {
  const teeth = (r, n, fill) =>
    Array.from({ length: n }, (_, i) => `<rect x="${n3(r - 4)}" y="-4.5" width="11" height="9" rx="2.5" fill="${fill}" transform="rotate(${n3((i / n) * 360)})"/>`).join("");

  const ringShape = `<g>
      <circle cx="0" cy="0" r="${RING_R}" fill="none" stroke="${INK}" stroke-width="13"/>
      <circle cx="0" cy="0" r="${RING_R}" fill="none" stroke="${CHR}" stroke-width="7"/>
      ${teeth(RING_R + 2, 46, CHR_D)}
      <circle cx="0" cy="0" r="${RING_R - 13}" fill="none" stroke="${CHR_M}" stroke-width="5" opacity=".8"/>
      <g stroke="${CHR_M}" stroke-width="8" stroke-linecap="round">
        ${Array.from({ length: 5 }, (_, i) => `<line x1="0" y1="0" x2="${n3((RING_R - 12) * Math.cos(rad(i * 72 + 20)))}" y2="${n3((RING_R - 12) * Math.sin(rad(i * 72 + 20)))}"/>`).join("")}
      </g>
      <circle cx="0" cy="0" r="13" fill="${CHR}" stroke="${INK}" stroke-width="4.5"/>
    </g>`;

  const cog = `<g transform="translate(${REAR.x} ${REAR.y})">
      <circle cx="0" cy="0" r="${COG_R}" fill="none" stroke="${INK}" stroke-width="9"/>
      <circle cx="0" cy="0" r="${COG_R}" fill="none" stroke="${CHR_D}" stroke-width="5"/>
      ${teeth(COG_R + 2, 18, CHR_D)}
    </g>`;

  const dx = REAR.x - BB.x, dy = REAR.y - BB.y;
  const D = Math.hypot(dx, dy), ux = dx / D, uy = dy / D;
  const cs = (RING_R - COG_R) / D, sn = Math.sqrt(Math.max(0, 1 - cs * cs));
  const nT = { x: cs * ux - sn * uy, y: cs * uy + sn * ux };
  const nB = { x: cs * ux + sn * uy, y: cs * uy - sn * ux };
  const P = (c, r, n) => `${n3(c.x + r * n.x)} ${n3(c.y + r * n.y)}`;
  const chain = `M${P(BB, RING_R, nT)} L${P(REAR, COG_R, nT)} A${COG_R} ${COG_R} 0 0 0 ${P(REAR, COG_R, nB)} L${P(BB, RING_R, nB)} A${RING_R} ${RING_R} 0 1 1 ${P(BB, RING_R, nT)}`;
  const links = track("stroke-dashoffset", `0;${LINK}`, LINK_T);

  return `
    ${cog}
    <g transform="translate(${BB.x} ${BB.y})">${spin(series(STEPS, (f) => f * 360), CRANK_T, ringShape)}</g>
    <path d="${chain}" fill="none" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>
    <path d="${chain}" fill="none" stroke="${CHR_M}" stroke-width="6" stroke-dasharray="13 13" ${links.a}>${links.e}</path>`;
}

function crankArm(side, phase) {
  const far = side === "far";
  const c = far ? CHR_D : CHR;
  const arm = `<g>
      <line x1="0" y1="0" x2="${CRANK}" y2="0" stroke="${INK}" stroke-width="${far ? 18 : 21}" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="${CRANK}" y2="0" stroke="${c}" stroke-width="${far ? 9 : 12}" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="8" fill="${INK}"/>
    </g>
    <g transform="translate(${CRANK} 0)">
      <rect x="-29" y="-9" width="58" height="18" rx="5" fill="#333f4b" stroke="${INK}" stroke-width="4.5"/>
      <rect x="-24" y="-6" width="48" height="4" rx="2" fill="#5f6d7a"/>
    </g>`;
  return `<g transform="translate(${BB.x} ${BB.y})">${spin(series(STEPS, (f) => f * 360 + phase), CRANK_T, arm)}</g>`;
}

/* ──────────────────────────────────────────────────────────────────── leg */
function foot() {
  return `<g>
      <path d="M-6 -12 C 20 -19, 46 -16, 62 -6 C 69 -2, 66 8, 57 10 C 38 15, 13 15, -3 10 Z"
            fill="${SKN}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <g stroke="${INK}" stroke-width="2.8" fill="none" opacity=".5">
        <path d="M18 -15 C 23 -5, 25 4, 25 10"/>
        <path d="M42 -13 C 45 -4, 46 4, 45 10"/>
      </g>
      <path d="M2 -7 C 20 -11, 40 -9, 54 -3" fill="none" stroke="${SKN_L}" stroke-width="3.6" stroke-linecap="round"/>
    </g>`;
}

function leg(side, phase) {
  const far = side === "far";
  const hip = far ? { x: HIP.x - 16, y: HIP.y - 6 } : HIP;
  const pl = poses(hip, phase);
  const thighVals = pl.map((p) => n3(p.thigh)).join(";");
  const shinVals = pl.map((p) => n3(p.shin - p.thigh)).join(";");
  const footVals = pl.map((p) => n3(-p.shin)).join(";");

  const skin = far ? SKN_D : SKN;
  const skinL = far ? SKN : SKN_L;

  /* the thigh leaves the body: it starts INSIDE the body silhouette (negative x
   * from the far side of the hip) so no outline shows through the feathers */
  const thighShape = `
    <path d="M-44 -23 C ${THIGH * 0.45} -19, ${THIGH - 18} -15, ${THIGH} -12
             C ${THIGH + 2} -5, ${THIGH + 2} 5, ${THIGH} 12
             C ${THIGH - 18} 15, ${THIGH * 0.45} 19, -44 23 Z"
          fill="${skin}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
    <path d="M-10 -18 C ${THIGH * 0.45} -15, ${THIGH - 26} -9, ${THIGH - 12} -6"
          fill="none" stroke="${skinL}" stroke-width="4.2" stroke-linecap="round" opacity=".9"/>
    <g stroke="${INK}" stroke-width="2.4" fill="none" opacity=".25">
      <path d="M${THIGH * 0.42} -20 C ${THIGH * 0.44} -8, ${THIGH * 0.44} 8, ${THIGH * 0.42} 20"/>
      <path d="M${THIGH * 0.7} -17 C ${THIGH * 0.72} -7, ${THIGH * 0.72} 7, ${THIGH * 0.7} 17"/>
    </g>
    <circle cx="${THIGH}" cy="0" r="18" fill="${skin}" stroke="${INK}" stroke-width="5.5"/>
    <circle cx="${THIGH - 5}" cy="-6" r="5" fill="${skinL}" opacity=".75"/>`;

  /* the shin: rounded at both ends, so the knee joint reads as a joint rather
   * than as two tubes colliding */
  const shinShape = `
    <path d="M0 -19
             C ${SHIN * 0.42} -21, ${SHIN * 0.72} -17, ${SHIN - 16} -13
             A 13 13 0 0 1 ${SHIN - 16} 13
             C ${SHIN * 0.72} 17, ${SHIN * 0.42} 21, 0 19
             C -21 13, -21 -13, 0 -19 Z"
          fill="${skin}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
    <path d="M8 -11 C ${SHIN * 0.45} -10, ${SHIN * 0.72} -7, ${SHIN - 22} -4"
          fill="none" stroke="${skinL}" stroke-width="4.4" stroke-linecap="round" opacity=".9"/>
    <g stroke="${INK}" stroke-width="2.1" fill="none" opacity=".22">
      <path d="M${SHIN * 0.34} -16 C ${SHIN * 0.36} -6, ${SHIN * 0.36} 6, ${SHIN * 0.34} 16"/>
      <path d="M${SHIN * 0.56} -14 C ${SHIN * 0.58} -5, ${SHIN * 0.58} 5, ${SHIN * 0.56} 14"/>
      <path d="M${SHIN * 0.78} -12 C ${SHIN * 0.8} -4, ${SHIN * 0.8} 4, ${SHIN * 0.78} 12"/>
    </g>
    <circle cx="${SHIN}" cy="0" r="14" fill="${skin}" stroke="${INK}" stroke-width="5"/>
    <circle cx="${SHIN - 4}" cy="-5" r="4" fill="${skinL}" opacity=".7"/>`;

  // thigh rotates about the hip; the shin hangs off the knee and rotates in the
  // thigh's frame; the foot hangs off the ankle and cancels the shin so it stays level
  const chain = rot(
    shinVals,
    CRANK_T,
    shinShape + `<g transform="translate(${SHIN} 0)">${rot(footVals, CRANK_T, foot())}</g>`
  );
  return `<g transform="translate(${hip.x} ${hip.y})">${rot(
    thighVals,
    CRANK_T,
    thighShape + `<g transform="translate(${THIGH} 0)">${chain}</g>`
  )}</g>`;
}

/* ───────────────────────────────────────────────────────────────── pelican
 *
 * Anchors (page coordinates, the bird faces +x):
 *
 *            (548,232) rump          (736,236) shoulder ──┐
 *                 \                                          \
 *                  |  body  centred (655,310)                 \  neck → head (886,152)
 *                  |                                            \        eye (916,134)
 *            (548,386) under-tail        (782,366) breast ────────╲____ bill (930,160)→(1180,186)
 *                      \  folded wing, primaries (556,384)→(478,424)   pouch to (1050,268)
 *                       \  hip (600,402)  →  saddle (578,430)
 *                        knee ── shin ── ankle on the pedal
 *                        near wing: shoulder (756,268) → elbow (846,330) → wrist (896,404) on the grip
 */
function pelican() {
  /* ── tail: a short, wide fan off the rump ───────────────────────────────── */
  const tail = `<path d="M560 322
               C 520 302, 476 296, 444 306
               C 468 320, 488 336, 500 354
               C 474 354, 450 362, 436 374
               C 466 384, 504 382, 532 370
               C 548 364, 558 350, 560 338 Z"
            fill="${FEA}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
      <g stroke="${FEA_D}" stroke-width="3.4" fill="none" stroke-linecap="round">
        <path d="M540 330 C 512 316, 484 310, 462 310"/>
        <path d="M538 346 C 512 344, 488 352, 470 364"/>
      </g>`;

  /* ── body: teardrop — rump high, breast full, belly tucked up clear of the
   *   top tube so the bicycle frame can be seen under the bird ─────────────── */
  const body = `<path d="M566 400
               C 528 342, 520 272, 560 236
               C 606 196, 700 198, 748 244
               C 788 282, 800 336, 776 382
               C 754 418, 690 432, 636 424
               C 606 420, 582 412, 566 400 Z"
            fill="url(#bodyG)" stroke="${INK}" stroke-width="6.5" stroke-linejoin="round"/>
      <path d="M570 392 C 538 342, 532 282, 566 248 C 532 292, 536 348, 562 400
               C 574 418, 602 428, 632 431 C 598 426, 576 412, 570 392 Z"
            fill="${FEA_S}" opacity=".85"/>
      <path d="M598 258 C 658 226, 726 228, 772 260" fill="none" stroke="${FEA}" stroke-width="11" stroke-linecap="round" opacity=".95"/>
      <path d="M590 270 C 652 242, 722 242, 764 272" fill="none" stroke="${FEA_S}" stroke-width="5" stroke-linecap="round" opacity=".6"/>
      <g stroke="${FEA_S}" stroke-width="3.4" fill="none" opacity=".45" stroke-linecap="round">
        <path d="M648 350 C 688 338, 734 336, 764 346"/>
        <path d="M654 378 C 692 368, 732 366, 758 374"/>
      </g>
      <!-- the folded far wing along the flank: soft, so it never reads as a second bird -->
      <path d="M756 252 C 786 296, 788 352, 762 398 C 736 434, 688 448, 642 448
               C 678 424, 696 382, 694 338 C 692 296, 718 270, 756 252 Z"
            fill="${FEA_M}" opacity=".6"/>
      <path d="M758 258 C 788 302, 790 356, 764 400" fill="none" stroke="${FEA_D}" stroke-width="4" stroke-linecap="round" opacity=".5"/>
      <!-- the hip patch where the leg leaves the body -->
      <path d="M566 396 C 584 384, 606 384, 620 394 C 610 412, 588 418, 570 412 Z"
            fill="${FEA_S}" opacity=".8"/>`;

  /* ── neck: leaves the top-front of the body, curves up and forward ───────── */
  const neck = `<path d="M740 262
               C 742 208, 774 164, 820 148
               L 878 190
               C 848 216, 830 252, 826 292
               C 796 302, 764 290, 740 262 Z"
            fill="url(#neckG)" stroke="${INK}" stroke-width="6.5" stroke-linejoin="round"/>
      <path d="M826 164 C 796 190, 776 228, 770 274" fill="none" stroke="${FEA}" stroke-width="9.5" stroke-linecap="round" opacity=".9"/>
      <path d="M854 194 C 828 220, 812 252, 806 288" fill="none" stroke="${FEA_S}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`;

  /* ── head: cap on the crown, eye under the brim, bill below the eye ─────── */
  const head = `<ellipse cx="884" cy="184" rx="58" ry="55" fill="url(#headG)" stroke="${INK}" stroke-width="6.5"/>
      <path d="M840 162 C 852 134, 880 120, 908 124" fill="none" stroke="${FEA}" stroke-width="9" stroke-linecap="round" opacity=".85"/>
      <path d="M850 218 C 866 230, 890 232, 906 224" fill="none" stroke="${FEA_S}" stroke-width="4" stroke-linecap="round" opacity=".45"/>
      <ellipse cx="918" cy="200" rx="16" ry="17" fill="#ffffff" stroke="${INK}" stroke-width="4.5"/>
      <circle cx="921" cy="201" r="8" fill="${INK}"/>
      <circle cx="924" cy="197" r="2.9" fill="#ffffff"/>
      ${(() => {
        const lid = track("ry", "0;0;17;0;0", 5.4, "0;0.9;0.935;0.965;1");
        return `<ellipse cx="918" cy="200" rx="17" fill="${FEA}" stroke="${INK}" stroke-width="3" ${lid.a}>${lid.e}</ellipse>`;
      })()}`;

  /* ── bill: hangs from the head, well below the eye ─────────────────────── */
  const bill = `<path d="M930 240
               C 1004 256, 1072 270, 1136 276
               C 1106 322, 1034 332, 972 316
               C 944 308, 932 274, 930 240 Z"
            fill="url(#pouchG)" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M948 266 C 998 288, 1056 296, 1104 288" fill="none" stroke="${POU_D}" stroke-width="4" stroke-linecap="round" opacity=".5"/>
      <path d="M952 258 C 1002 276, 1054 284, 1100 278" fill="none" stroke="#ffd9a4" stroke-width="5" stroke-linecap="round" opacity=".75"/>
      <path d="M922 224
               C 1004 226, 1086 244, 1154 274
               C 1146 286, 1130 294, 1112 296
               C 1044 278, 970 262, 928 258 Z"
            fill="url(#billG)" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M936 234 C 1006 234, 1072 250, 1124 272" fill="none" stroke="#ffe0b0" stroke-width="5" stroke-linecap="round" opacity=".85"/>
      <path d="M1148 276 C 1156 286, 1154 296, 1142 302" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <path d="M928 258 C 996 266, 1064 278, 1120 288" fill="none" stroke="${BIL_D}" stroke-width="5" stroke-linecap="round" opacity=".85"/>`;

  const cap = `<path d="M828 168 C 824 134, 856 112, 892 116 C 916 120, 932 136, 936 156 L 940 170 L 828 176 Z"
            fill="${RED}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
      <path d="M878 116 C 882 136, 884 154, 884 172" fill="none" stroke="${RED_D}" stroke-width="4" stroke-linecap="round"/>
      <path d="M834 160 C 862 142, 902 138, 936 148" fill="none" stroke="${RED_L}" stroke-width="5.5" stroke-linecap="round" opacity=".85"/>
      <path d="M936 142 C 962 138, 988 144, 998 154 C 980 164, 948 164, 932 156 Z"
            fill="${RED_D}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="916" cy="118" r="7.5" fill="${BIL}" stroke="${INK}" stroke-width="4"/>`;

  /* ── scarf: band + knot at the front of the neck, tails whipped back ─────── */
  const scarf = `<g>
      <!-- the band, round the neck just under the head -->
      <path d="M772 196 C 780 226, 810 244, 838 242
               C 846 256, 844 270, 834 280
               C 802 286, 770 266, 760 240
               C 758 224, 764 208, 772 196 Z"
            fill="${RED}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
      <path d="M776 210 C 790 232, 812 244, 832 246" fill="none" stroke="${RED_L}" stroke-width="5" stroke-linecap="round" opacity=".9"/>
      <!-- the knot, at the front of the throat -->
      <path d="M832 236 C 858 228, 880 238, 884 254 C 880 270, 856 278, 834 266 Z"
            fill="${RED}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
      <path d="M838 242 C 854 240, 868 246, 872 254" fill="none" stroke="${RED_L}" stroke-width="4.5" stroke-linecap="round" opacity=".85"/>
      <!-- one tail, whipped back over the shoulder -->
      <path d="M766 250 C 726 236, 682 214, 644 202
               C 668 236, 712 268, 754 288 Z"
            fill="${RED_D}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
      <path d="M750 268 C 720 254, 690 234, 668 218" fill="none" stroke="${RED}" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    </g>`;

  /* ── near wing: shoulder at the top of the body, elbow out, wrist on the grip ── */
  const reach = (() => {
    const sh = { x: 748, y: 264 }, el = { x: 830, y: 330 }, wr = { x: 896, y: 400 };
    const seg = (a, b, w0, w1) => {
      const L = Math.hypot(b.x - a.x, b.y - a.y);
      const ang = deg(Math.atan2(b.y - a.y, b.x - a.x));
      return `<g transform="translate(${a.x} ${a.y}) rotate(${n3(ang)})">
        <path d="M-12 ${-w0} C ${L * 0.5} ${-w0 - 6}, ${L - 14} ${-w1 - 3}, ${L} ${-w1}
                 C ${L + 7} ${-w1 * 0.4}, ${L + 7} ${w1 * 0.4}, ${L} ${w1}
                 C ${L - 14} ${w1 + 3}, ${L * 0.5} ${w0 + 6}, -12 ${w0} Z"
              fill="url(#wingG)" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
        <path d="M0 ${-w0 + 13} C ${L * 0.5} ${-w0 + 7}, ${L - 22} ${-w1 + 5}, ${L - 14} ${-w1 + 9}"
              fill="none" stroke="${FEA}" stroke-width="5.5" stroke-linecap="round" opacity=".9"/>
      </g>`;
    };
    return `<g>
      ${seg(sh, el, 38, 28)}
      ${seg(el, wr, 28, 20)}
      <circle cx="${el.x}" cy="${el.y}" r="27" fill="url(#wingG)" stroke="${INK}" stroke-width="5.5"/>
      <path d="M${el.x - 11} ${el.y - 20} C ${el.x + 8} ${el.y - 29}, ${el.x + 22} ${el.y - 17}, ${el.x + 26} ${el.y - 3}"
            fill="none" stroke="${FEA}" stroke-width="5" stroke-linecap="round" opacity=".9"/>
      <circle cx="${wr.x}" cy="${wr.y}" r="21" fill="${FEA}" stroke="${INK}" stroke-width="5.5"/>
      <g fill="${NVY}" stroke="${INK}" stroke-width="4.5">
        <rect x="${GRIP.x - 6}" y="${GRIP.y - 28}" width="19" height="48" rx="9" transform="rotate(-18 ${GRIP.x + 4} ${GRIP.y})"/>
        <rect x="${GRIP.x + 14}" y="${GRIP.y - 34}" width="19" height="50" rx="9" transform="rotate(-6 ${GRIP.x + 24} ${GRIP.y - 6})"/>
        <rect x="${GRIP.x - 26}" y="${GRIP.y - 22}" width="18" height="44" rx="9" transform="rotate(-30 ${GRIP.x - 16} ${GRIP.y + 2})"/>
      </g>
    </g>`;
  })();

  return `${tail}${body}${neck}${head}${bill}${cap}${scarf}${reach}`;
}

/* ──────────────────────────────────────────────────────────────── basket */
function basket() {
  const x = 1128, y = 498, w = 152, h = 108;
  return `<g>
    <path d="M${HEAD_BOT.x + 6} ${HEAD_BOT.y - 6} L${x + 24} ${y + 30}" stroke="${INK}" stroke-width="9" stroke-linecap="round" opacity=".85"/>
    <path d="M${x + 10} ${y + h} L${FRONT.x - 4} ${FRONT.y - 24}" stroke="${INK}" stroke-width="8" stroke-linecap="round" opacity=".8"/>
    <path d="M${x + w - 6} ${y + h} L${FRONT.x + 22} ${FRONT.y - 34}" stroke="${INK}" stroke-width="7" stroke-linecap="round" opacity=".65"/>
    <path d="M${x} ${y} L${x + w} ${y} L${x + w - 18} ${y + h} L${x + 18} ${y + h} Z"
          fill="url(#basketG)" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
    <g stroke="${DECK.dark}" stroke-width="3.4" opacity=".5">
      ${Array.from({ length: 4 }, (_, i) => `<line x1="${x + 6 + i * 37}" y1="${y + 5}" x2="${x + 16 + i * 35}" y2="${y + h - 5}"/>`).join("")}
      ${Array.from({ length: 3 }, (_, i) => `<line x1="${x + 6}" y1="${y + 28 + i * 27}" x2="${x + w - 6}" y2="${y + 28 + i * 27}"/>`).join("")}
    </g>
    <rect x="${x - 9}" y="${y - 14}" width="${w + 18}" height="20" rx="9" fill="${DECK.top}" stroke="${INK}" stroke-width="5.5"/>
    <g transform="translate(${x + 46} ${y - 32}) rotate(-22)">
      <ellipse cx="0" cy="0" rx="48" ry="16" fill="#e9c385" stroke="${INK}" stroke-width="4.5"/>
      <path d="M-32 -8 L-26 7" stroke="${DECK.dark}" stroke-width="3"/>
      <path d="M0 -13 L2 7" stroke="${DECK.dark}" stroke-width="3"/>
      <path d="M30 -8 L26 5" stroke="${DECK.dark}" stroke-width="3"/>
    </g>
    <g transform="translate(${x + 106} ${y - 28}) rotate(16)">
      <path d="M0 0 C 28 -7, 64 -2, 80 9 C 64 16, 26 13, 0 7 Z" fill="#9fc4d8" stroke="${INK}" stroke-width="4.5"/>
      <path d="M80 9 L100 2 L93 13 Z" fill="#9fc4d8" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
      <circle cx="17" cy="4" r="2.8" fill="${INK}"/>
    </g>
  </g>`;
}

/* ═══════════════════════════════════════════════════════════════════ compose */
const rig = () => `<g id="rig">
    ${wheel(REAR, "rear")}
    ${wheel(FRONT, "front")}
    ${crankArm("far", 180)}
    ${leg("far", 180)}
    ${frame()}
    ${drivetrain()}
    ${crankArm("near", 0)}
    ${leg("near", 0)}
    ${pelican()}
    ${basket()}
  </g>`;

const defs = `
  <defs>
    <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
      ${SKY.map((c, i) => `<stop offset="${[0, 0.5, 0.82, 1][i]}" stop-color="${c}"/>`).join("")}
    </linearGradient>
    <radialGradient id="sunGlow">
      <stop offset="0" stop-color="#fff2c2" stop-opacity=".9"/>
      <stop offset=".5" stop-color="#ffe294" stop-opacity=".34"/>
      <stop offset="1" stop-color="#ffd97c" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sunCore" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fffdf2"/><stop offset="1" stop-color="#ffd877"/>
    </linearGradient>
    <linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${SEA[0]}"/><stop offset="1" stop-color="${SEA[1]}"/>
    </linearGradient>
    <linearGradient id="seaHaze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfecf4" stop-opacity=".55"/>
      <stop offset="1" stop-color="#cfecf4" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${WAT[0]}"/><stop offset="1" stop-color="${WAT[1]}"/>
    </linearGradient>
    <linearGradient id="bodyG" x1=".25" y1="0" x2=".85" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f4f9fd"/>
      <stop offset="1" stop-color="#d3e0ee"/>
    </linearGradient>
    <linearGradient id="neckG" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#e6eef7"/><stop offset=".55" stop-color="#fbfdff"/>
      <stop offset="1" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="headG" x1=".2" y1="0" x2=".9" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dde8f3"/>
    </linearGradient>
    <linearGradient id="wingG" x1="0" y1="0" x2=".7" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cadbea"/>
    </linearGradient>
    <linearGradient id="billG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffcf7a"/><stop offset="1" stop-color="#e08f1c"/>
    </linearGradient>
    <linearGradient id="pouchG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${POU}"/><stop offset="1" stop-color="${POU_D}"/>
    </linearGradient>
    <linearGradient id="basketG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${DECK.top}"/><stop offset="1" stop-color="${DECK.mid}"/>
    </linearGradient>
  </defs>`;

function scene() {
  if (BIRD_ONLY) return `<rect width="${W}" height="${H}" fill="#8fb9cc"/>${pelican()}`;
  return `${sky()}${sea()}${deck()}${rig()}`;
}

function assertWellFormed(xml) {
  const stack = [];
  const re = /<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
  let m;
  while ((m = re.exec(xml))) {
    const [, close, name, attrs, self] = m;
    if (close) {
      const top = stack.pop();
      if (!top || top !== name) throw new Error(`mismatched </${name}> (found <${top}>) at byte ${m.index}`);
    } else if (!self) stack.push(name);
    if (!close) {
      const seen = new Set();
      for (const a of attrs.matchAll(/([\w:-]+)\s*=/g)) {
        const key = a[1].toLowerCase();
        if (seen.has(key)) throw new Error(`duplicate attribute ${key} on <${name}> at byte ${m.index}`);
        seen.add(key);
      }
    }
  }
  if (stack.length) throw new Error(`unclosed <${stack.join(">, <")}>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="ttl dsc">
  <title id="ttl">A pelican riding a bicycle along a seaside boardwalk</title>
  <desc id="dsc">Side view of a white pelican in a red cap and scarf pedalling a teal bicycle past a summer sea, with a basket of bread and fish on the handlebars.</desc>
  ${defs}
  ${scene()}
</svg>`;

assertWellFormed(svg);

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>A pelican riding a bicycle</title>
<style>
  html, body { margin: 0; height: 100%; background: #0b1f2c; }
  body { display: flex; align-items: center; justify-content: center; }
  svg { display: block; width: min(100vw, calc(100vh * ${W} / ${H})); height: auto; }
</style>
</head>
<body>
${svg}
</body>
</html>
`;

if (STATIC) {
  process.stdout.write(svg);
} else {
  const dest = path.join(ROOT, OUT || "pelican-on-a-bike.html");
  fs.writeFileSync(dest, page);
  console.log(`wrote ${dest} · ${(page.length / 1024).toFixed(1)} kB`);
  console.log({ wheelT: +WHEEL_T.toFixed(4), boardT: +BOARD_T.toFixed(4), linkT: +LINK_T.toFixed(4), speed: Math.round(V), legReach: THIGH + SHIN });
}
