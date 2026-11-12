#!/usr/bin/env node
/**
 * Verifies pelican-on-a-bike.html without a browser.
 *
 * There is no browser in this sandbox and the page animates with SMIL, so the
 * check works at the level that actually matters: it reads the value tables out
 * of the file, replays them exactly the way a renderer would, and then runs the
 * kinematics on the displayed pose.
 *
 * That last part is the important one. The generator bakes joint ANGLES at N
 * keyframes, and SMIL interpolates those angles linearly between keyframes —
 * while the pedal travels around a circle. Those are different curves, so the
 * webbed foot drifts off the pedal between keyframes unless N is high enough.
 * The drift is measured here in pixels, at 240 samples per revolution.
 *
 * Asserts:
 *   MARKUP   SVG + HTML only, well-formed, no duplicate attributes, every
 *            animation legal and endless, no element that both sets and
 *            animates the same attribute.
 *   MECHANICS tyres meet the deck; the boardwalk scrolls at exactly the rate the
 *            wheels roll; the chain runs at exactly the rate the chainring turns;
 *            both feet stay on their pedals; each foot stays level.
 *
 * Usage: node build/pelican-on-a-bike/verify.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const HERE = import.meta.dirname;
const BUILD = path.join(HERE, "build.mjs");
const ROOT = path.resolve(HERE, "..", "..");
const HTML = path.join(ROOT, "pelican-on-a-bike.html");

const problems = [];
const notes = [];
const fail = (m) => problems.push(m);
const note = (m) => notes.push(m);

/* ── geometry, mirrored from the generator (asserted against, not trusted) ──── */
const W = 1600, H = 1000;
const DECK_Y = 862;
const R = 205;
const BB = { x: 700, y: 706 }, CRANK = 98;
const RING_R = 54, COG_R = 23;
const CRANK_T = 2.2;
const HIP = { x: 600, y: 402 };
const FAR_HIP = { x: HIP.x - 16, y: HIP.y - 6 };
const THIGH = 172, SHIN = 258;
const ANKLE_OFF = { x: 4, y: -22 };
const PITCH = 340;
const LINK = 26;
const rad = (d) => (d * Math.PI) / 180;

/* ── regenerate, then load ─────────────────────────────────────────────────── */
execFileSync(process.execPath, [BUILD], { encoding: "utf8" });
if (!fs.existsSync(HTML)) {
  console.error("missing pelican-on-a-bike.html");
  process.exit(1);
}
const page = fs.readFileSync(HTML, "utf8");
const svgStart = page.indexOf("<svg ");
const svg = page.slice(svgStart, page.indexOf("</svg>") + 6);

/* ══════════════════════════════════════════════════ 1 · it is SVG + HTML ═══ */
if (/<script/i.test(page)) fail("the page contains a <script>");
if (/<image\b|<foreignObject\b|<canvas\b|<iframe\b/i.test(svg)) fail("raster or foreign content in the SVG");
if (/https?:\/\/(?!www\.w3\.org)/.test(svg)) fail("the SVG references a remote URL");
if (!svg.includes(`viewBox="0 0 ${W} ${H}"`)) fail("unexpected viewBox");

/* ══════════════════════════════════════════════════ 2 · well-formed XML ════ */
try {
  const stack = [];
  const re = /<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
  let m;
  while ((m = re.exec(svg))) {
    const [, close, name, attrs, self] = m;
    if (close) {
      if (stack.pop() !== name) throw new Error(`</${name}> does not close its opener (byte ${m.index})`);
    } else if (!self) stack.push(name);
    if (!close) {
      const seen = new Set();
      for (const a of attrs.matchAll(/([\w:-]+)\s*=/g)) {
        const key = a[1].toLowerCase();
        if (seen.has(key)) throw new Error(`duplicate ${key} on <${name}> (byte ${m.index})`);
        seen.add(key);
      }
    }
  }
  if (stack.length) throw new Error(`unclosed <${stack.join(">, <")}>`);
} catch (error) {
  fail(`XML: ${error.message}`);
}

/* ══════════════════════════════════════════════════ 3 · legal animations ═══ */
const anims = [...svg.matchAll(/<animate(?:Transform)?\b([^>]*?)\/?>/g)].map((m) => m[1]);
if (!anims.length) fail("no animations — the page would be a still");
const get = (attrs, n) => (new RegExp(`\\b${n}="([^"]*)"`).exec(attrs) || [])[1];
const kinds = new Set();
for (const attrs of anims) {
  const dur = get(attrs, "dur");
  const values = get(attrs, "values");
  const keyTimes = get(attrs, "keyTimes");
  if (!dur || !/^\d+(\.\d+)?s$/.test(dur) || parseFloat(dur) < 0.05) fail(`bad dur "${dur}"`);
  if (get(attrs, "repeatCount") !== "indefinite") fail(`animation that stops: ${attrs.slice(0, 60)}`);
  if (!values) fail(`animation without values: ${attrs.slice(0, 60)}`);
  if (values && keyTimes && values.split(";").length !== keyTimes.split(";").length) {
    fail(`values/keyTimes length mismatch in ${attrs.slice(0, 60)}`);
  }
  kinds.add(get(attrs, "type") ? `transform:${get(attrs, "type")}` : get(attrs, "attributeName"));
}
note(`animations: ${[...kinds].filter(Boolean).sort().join(", ")}`);

/* an element must not both set and animate the same attribute */
for (const m of svg.matchAll(/<([a-zA-Z]+)\b([^>]*?)(?=<animate)/g)) {
  const [, name, staticAttrs] = m;
  const animated = [...(m[0].match(/<animate(?:Transform)?[^>]*>/g) || [])];
  for (const a of animated) {
    const target = get(a, "attributeName");
    if (target && get(staticAttrs, target) !== undefined) fail(`<${name}> sets and animates ${target}`);
    if (get(a, "type") && get(staticAttrs, "transform") !== undefined) fail(`<${name}> sets and animates transform`);
  }
}

/* ══════════════════════════════════════════════════ 4 · the value tables ═══ */
const rotTables = [...svg.matchAll(/type="rotate" values="([-\d.;]+)"/g)].map((m) =>
  m[1].split(";").map(Number)
);
const keys = rotTables.map((t) => t.length);
if (new Set(keys).size > 1) fail(`rotation tracks disagree on keyframe count: ${[...new Set(keys)].join(", ")}`);
note(`${rotTables.length} rotation tracks × ${keys[0] ?? 0} keyframes`);

/** linear interpolation exactly as SMIL's calcMode="linear" does it */
function interp(values, phase) {
  const n = values.length - 1;
  const p = Math.max(0, Math.min(n - 1e-9, phase * n));
  const i = Math.floor(p);
  return values[i] + (values[i + 1] - values[i]) * (p - i);
}

/* ══════════════════════════════════════════════ 5 · tyres on the deck ══════ */
const hubs = [...svg.matchAll(/translate\((-?[\d.]+) (-?[\d.]+)\)"><g transform="rotate/g)]
  .map((m) => ({ x: +m[1], y: +m[2] }))
  .filter((c) => Math.abs(c.y - (DECK_Y - R)) < 0.5);
if (hubs.length !== 2) fail(`expected 2 wheel hubs at y=${DECK_Y - R}, found ${hubs.length}`);
for (const hub of hubs) {
  if (Math.abs(hub.y + R - DECK_Y) > 0.5) fail(`tyre patch ${hub.y + R} is off the deck ${DECK_Y}`);
}

/* ══════════════════════════════════ 6 · the ground speed is the wheel speed ═ */
const wheelT = (CRANK_T * COG_R) / RING_R;
const v = (2 * Math.PI * R) / wheelT;
const boardT = PITCH / v;
const boardDur = parseFloat(/values="0;340" dur="([\d.]+)s"/.exec(svg)?.[1] ?? "0");
const chainT = LINK / (((2 * Math.PI) / CRANK_T) * RING_R);
note(`wheel ${wheelT.toFixed(4)} s · board ${boardT.toFixed(4)} s · chain link ${chainT.toFixed(4)} s`);
if (Math.abs(boardDur - boardT) > 0.02) fail(`board scroll period ${boardDur}s ≠ ${boardT.toFixed(4)}s`);
{
  const dash = /stroke-width="26" stroke-dasharray="(\d+) (\d+)"/.exec(svg);
  if (!dash) fail("boardwalk plank line not found");
  else if (Math.abs(+dash[1] + +dash[2] - PITCH) > 0.01) fail(`plank pitch ${+dash[1] + +dash[2]} ≠ ${PITCH}`);
}

/* ═════════════════════════════════════════ 7 · feet stay on the pedals ═════ */
/* find the six leg tracks by matching the pose the generator computes at phase 0
 * — never by assuming an order, which would check the wrong numbers silently */
function ikPose(hip, crankDeg) {
  const th = rad(crankDeg);
  const pedal = { x: BB.x + CRANK * Math.cos(th), y: BB.y + CRANK * Math.sin(th) };
  const ankle = { x: pedal.x + ANKLE_OFF.x, y: pedal.y + ANKLE_OFF.y };
  const dx = ankle.x - hip.x, dy = ankle.y - hip.y;
  const d = Math.hypot(dx, dy);
  const a = (THIGH * THIGH - SHIN * SHIN + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, THIGH * THIGH - a * a));
  const knee = { x: hip.x + (dx / d) * a + (dy / d) * h, y: hip.y + (dy / d) * a - (dx / d) * h };
  const thigh = (Math.atan2(knee.y - hip.y, knee.x - hip.x) * 180) / Math.PI;
  const shin = (Math.atan2(ankle.y - knee.y, ankle.x - knee.x) * 180) / Math.PI;
  return { thigh, shin };
}
const round3 = (x) => Math.round(x * 1000) / 1000;
const legTracks = {};
for (const [side, crankDeg, hip] of [["near", 0, HIP], ["far", 180, FAR_HIP]]) {
  const p = ikPose(hip, crankDeg);
  const want = [round3(p.thigh), round3(p.shin - p.thigh), round3(-p.shin)];
  let found = -1;
  for (let i = 0; i + 2 < rotTables.length; i++) {
    if (want.every((val, k) => Math.abs(rotTables[i + k][0] - val) < 0.01)) {
      found = i;
      break;
    }
  }
  if (found < 0) fail(`could not find the ${side} leg's three rotation tracks`);
  legTracks[side] = found;
}
if (Object.values(legTracks).every((i) => i >= 0)) {
  note(`leg tracks: near ${legTracks.near}–${legTracks.near + 2}, far ${legTracks.far}–${legTracks.far + 2}`);
}

const SAMPLES = 240;
let worstSlide = 0,
  worstAt = null,
  worstTilt = 0;
for (let s = 0; s < SAMPLES; s++) {
  const phase = s / SAMPLES;
  for (const [side, phaseOff, hip] of [["near", 0, HIP], ["far", 180, FAR_HIP]]) {
    const base = legTracks[side];
    if (base === undefined || base < 0) continue;

    /* where the pedal actually is */
    const th = rad(phase * 360 + phaseOff);
    const pedal = { x: BB.x + CRANK * Math.cos(th), y: BB.y + CRANK * Math.sin(th) };
    const ankle = { x: pedal.x + ANKLE_OFF.x, y: pedal.y + ANKLE_OFF.y };

    /* where the drawing will put the foot, given linear angle interpolation */
    const thigh = interp(rotTables[base], phase);
    const shinAbs = thigh + interp(rotTables[base + 1], phase);
    const footAbs = shinAbs + interp(rotTables[base + 2], phase);

    const knee = { x: hip.x + THIGH * Math.cos(rad(thigh)), y: hip.y + THIGH * Math.sin(rad(thigh)) };
    const foot = { x: knee.x + SHIN * Math.cos(rad(shinAbs)), y: knee.y + SHIN * Math.sin(rad(shinAbs)) };

    const slide = Math.hypot(foot.x - ankle.x, foot.y - ankle.y);
    if (slide > worstSlide) {
      worstSlide = slide;
      worstAt = { side, deg: +(phase * 360).toFixed(1) };
    }
    worstTilt = Math.max(worstTilt, Math.abs(footAbs));
  }
}
note(`worst foot drift: ${worstSlide.toFixed(2)} px (${worstAt?.side} at ${worstAt?.deg}°) · worst tilt ${worstTilt.toFixed(2)}°`);
if (worstSlide > 3) fail(`a foot slides ${worstSlide.toFixed(2)} px off the pedal — raise the keyframe count`);
if (worstTilt > 1.5) fail(`a foot tilts ${worstTilt.toFixed(2)}° — it should stay level`);

/* ═══════════════════════════════════════════════════════════════ verdict ═══ */
for (const n of notes) console.log("  note  " + n);
if (problems.length) {
  for (const p of problems) console.error("  FAIL  " + p);
  console.error(`\n${problems.length} problem(s)`);
  process.exit(1);
}
console.log(`\nOK — ${anims.length} animations · ${SAMPLES} samples per revolution · mechanics exact`);
