// Inspect a constructed film, not the names of recipes in its TSX. No renderer or live hooks.
import React from 'react';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ReactCjs = (() => { try { return require('react'); } catch { return null; } })();

const rad = Math.PI / 180;
const gap = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));
const points = (path, from, to) => path?.length >= 2 ? path : [from, to ?? from];
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const EASE = {
  linear: (t) => t,
  inSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  outSine: (t) => Math.sin((t * Math.PI) / 2),
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  inCubic: (t) => t * t * t,
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuint: (t) => 1 - Math.pow(1 - t, 5),
  outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inOutExpo: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2),
  inOutQuint: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2),
  inBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return c3 * t * t * t - c1 * t * t; },
  outBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  inOutBack: (t) => { const c1 = 1.70158, c2 = c1 * 1.525; return t < 0.5 ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2; },
  snap: (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 4),
  hold: () => 0,
};
const evalEase = (name, p) => (EASE[name] ?? EASE.inOutCubic)(clamp(p, 0, 1));
const GAITS = new Set(['walk', 'run', 'creep', 'stagger']);
const PRIMITIVES = new Set(['Block', 'Vox', 'Water', 'Glow', 'LightPool', 'Dust', 'FogCard', 'GodRay', 'ContactShadow', 'group', 'mesh', 'Fragment', 'component']);
const WORLD_LEAF = new Set([
  'Block', 'Vox', 'Water', 'Glow', 'LightPool', 'Dust', 'FogCard', 'GodRay', 'ContactShadow',
  'Tree', 'Torch', 'Clouds', 'Hut', 'Room', 'LampPost', 'Lantern', 'LanternLine',
  'Bell', 'Well', 'Fence', 'Stall', 'Furnace', 'CellarGate', 'ChalkWall', 'BedBox',
  'Boat', 'SnowTrail', 'Plinth', 'RoyalCarpet', 'LavaSurface', 'MushroomRow',
  'GlowstoneCluster', 'SoupCauldron', 'RuinedDoor', 'Hero', 'Mum', 'Dad', 'Baker',
  'Villager', 'IronGolem', 'SnowGolem', 'CitizenLead', 'EliteLead', 'ExplainerCrowd', 'MinecraftAvatar',
]);

function lens(s, end = false) {
  if (s.focalLength == null) return (end ? s.fovTo ?? s.fov : s.fov) ?? 38;
  const mm = end ? s.focalLengthTo ?? s.focalLength : s.focalLength;
  return 2 * Math.atan(12 / Math.max(1, mm)) / rad; // Camera.tsx: vertical 24mm sensor
}
function framing(eye, target, aim, fov, roll) {
  const ray = eye.map((v, i) => v - target[i] - (i === 1 ? aim : 0));
  const distance = Math.hypot(...ray);
  return { axis: ray.map(v => v / distance), dist: distance, span: 2 * distance * Math.tan(fov * rad / 2), roll };
}
function similar(a, b) {
  return a && a.axis.reduce((d, v, i) => d + v * b.axis[i], 0) > Math.cos(9 * rad) &&
    Math.abs(Math.log(a.span / b.span)) < Math.log(1.18) && Math.abs(a.roll - b.roll) < 6 * rad;
}

function camera(s) {
  const eyes = points(s.path, s.from, s.to), targets = points(s.targetPath, s.target, s.targetTo);
  const start = framing(eyes[0], targets[0], s.aim ?? 0, lens(s), s.roll ?? 0);
  const end = framing(eyes.at(-1), targets.at(-1), s.aim ?? 0, lens(s, true), s.rollTo ?? start.roll);
  // With a stationary eye, moving its target directly along the look ray does NOT pan.
  const eyeDist = Math.max(0, ...eyes.map(p => gap(p, eyes[0])));
  const targetSweep = Math.max(
    0,
    ...targets.map(p => {
      const f = framing(eyes[0], p, s.aim ?? 0, lens(s), start.roll);
      return Math.acos(clamp(f.axis.reduce((d, v, i) => d + v * start.axis[i], 0), -1, 1)) / rad;
    }),
  );
  const endAng = Math.acos(clamp(start.axis.reduce((d, v, i) => d + v * end.axis[i], 0), -1, 1)) / rad;
  const angDeg = Math.max(endAng, targetSweep);
  const spanRatio = Math.max(start.span / Math.max(1e-6, end.span), end.span / Math.max(1e-6, start.span));
  const rollDeg = Math.abs(start.roll - end.roll) / rad;
  const activeImpact = s.impacts?.some(i => i.amp > 0 && i.at < s.at + s.dur && i.at + (i.dur ?? .35) > s.at);
  const changes = eyeDist > .001 || angDeg > .06 || Math.abs(lens(s) - lens(s, true)) > .01 ||
    Math.abs(start.roll - end.roll) > .001 || s.shake > 0 || s.handheld > 0 || activeImpact;
  const strongFx = s.shake >= .01 || s.impacts?.some(i => i.amp >= .015 && i.at < s.at + s.dur && i.at + (i.dur ?? .35) > s.at);
  const micro = !strongFx && eyeDist < .35 && angDeg < 4 && spanRatio < 1.1 && rollDeg < 4;
  const meaningful = strongFx || eyeDist >= .6 || angDeg >= 8 || spanRatio >= 1.18 || rollDeg >= 6;
  return { start, end, changes, strongFx, eyeDist, angDeg, spanRatio, rollDeg, micro, meaningful };
}

const vecAdd = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const elemName = (el) => (typeof el.type === 'string' ? el.type : (el.type?.displayName || el.type?.name || 'component'));
const isVec3 = (v) => Array.isArray(v) && v.length >= 3 && v.slice(0, 3).every((n) => typeof n === 'number' && Number.isFinite(n));

function collectActors(node, out, offset = [0, 0, 0]) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { for (const c of node) collectActors(c, out, offset); return; }
  if (!node.$$typeof || !node.props) return;
  const name = elemName(node);
  const p = node.props;
  const nextOffset = name === 'group' && isVec3(p.position) ? vecAdd(offset, p.position) : offset;
  if (typeof p.walk === 'number' || typeof p.animation === 'string') {
    const pos = isVec3(p.position) ? vecAdd(p.position, offset) : [...offset];
    out.push({ name, props: p, pos });
  }
  if (p.children) collectActors(p.children, out, nextOffset);
}

function collectStageItems(node, out, offset = [0, 0, 0]) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { for (const c of node) collectStageItems(c, out, offset); return; }
  if (!node.$$typeof || !node.props) return;
  const name = elemName(node);
  const p = node.props;
  const nextOffset = name === 'group' && isVec3(p.position) ? vecAdd(offset, p.position) : offset;
  const pos = isVec3(p.position) ? vecAdd(p.position, offset) : null;
  if (pos || name === 'SnowTrail') out.push({ name, pos, offset, props: p });
  if (p.children) collectStageItems(p.children, out, nextOffset);
}

function expandWorld(World) {
  const items = [];
  if (typeof World !== 'function') return items;
  const slots = [React?.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactCjs?.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE].filter(Boolean);
  const prevHs = slots.map((s) => s.H);
  const prevTime = globalThis.__REHEARSAL_TIME__;
  const prevShot = globalThis.__REHEARSAL_SHOT__;
  const hadDoc = 'document' in globalThis;
  const prevDoc = globalThis.document;
  const mockH = {
    useMemo: (fn) => fn(),
    useCallback: (fn) => fn,
    useState: (init) => [typeof init === 'function' ? init() : init, () => {}],
    useReducer: (_red, init, initFn) => [initFn ? initFn(init) : init, () => {}],
    useRef: (v) => ({ current: v }),
    useEffect: () => {},
    useLayoutEffect: () => {},
    useInsertionEffect: () => {},
    useContext: (ctx) => ctx?._currentValue ?? null,
    useId: () => 'rehearsal',
    useTransition: () => [false, (fn) => fn()],
    useDeferredValue: (v) => v,
    useSyncExternalStore: (_sub, getSnap) => getSnap(),
    use: (v) => v,
  };
  try {
    globalThis.__REHEARSAL_TIME__ = 0;
    globalThis.__REHEARSAL_SHOT__ = null;
    if (!globalThis.document) {
      globalThis.document = {
        createElement: () => ({
          width: 64, height: 64,
          getContext: () => ({
            fillStyle: '', font: '', textBaseline: '',
            fillRect() {}, clearRect() {}, fillText() {}, strokeRect() {},
            measureText: () => ({ width: 8 }),
            getImageData: (_x, _y, w, h) => ({ data: new Uint8ClampedArray((w || 64) * (h || 64) * 4) }),
            putImageData() {},
          }),
        }),
      };
    }
    for (const s of slots) s.H = mockH;
    const visit = (node, offset = [0, 0, 0], zone = null, companions = []) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { for (const c of node) visit(c, offset, zone, companions); return; }
      if (!node.$$typeof || !node.props) return;
      const name = elemName(node);
      const p = node.props;
      if (name === 'Zone' && typeof p.name === 'string') {
        visit(p.children, offset, p.name, Array.isArray(p.with) ? p.with : []);
        return;
      }
      if (typeof node.type === 'function' && !WORLD_LEAF.has(name)) {
        let rendered = null;
        try { rendered = node.type(p); } catch { rendered = null; }
        if (rendered) { visit(rendered, offset, zone, companions); return; }
      }
      const nextOffset = name === 'group' && isVec3(p.position) ? vecAdd(offset, p.position) : offset;
      const pos = isVec3(p.position) ? vecAdd(p.position, offset) : null;
      if (pos || name === 'SnowTrail') items.push({ name, pos, offset, props: p, zone, with: companions });
      if (p.children) visit(p.children, nextOffset, zone, companions);
    };
    let rootTree = null;
    try { rootTree = World({}); } catch { rootTree = null; }
    visit(rootTree);
  } finally {
    slots.forEach((s, idx) => { s.H = prevHs[idx]; });
    if (prevTime === undefined) delete globalThis.__REHEARSAL_TIME__;
    else globalThis.__REHEARSAL_TIME__ = prevTime;
    if (prevShot === undefined) delete globalThis.__REHEARSAL_SHOT__;
    else globalThis.__REHEARSAL_SHOT__ = prevShot;
    if (!hadDoc) delete globalThis.document;
    else globalThis.document = prevDoc;
  }
  return items;
}

const zonesOverlap = (shotZone, item) => {
  if (!shotZone || !item.zone) return true;
  const active = shotZone.split('+');
  return active.includes(item.zone) || (item.with ?? []).some((w) => active.includes(w));
};

const worldZonesOverlap = (a, b) => !a.zone || !b.zone || a.zone === b.zone ||
  (a.with ?? []).includes(b.zone) || (b.with ?? []).includes(a.zone);

const boxBounds = (pos, size) => {
  const s = isVec3(size) ? size : [1, 1, 1];
  return {
    x0: pos[0] - s[0] / 2, x1: pos[0] + s[0] / 2,
    y0: pos[1] - s[1] / 2, y1: pos[1] + s[1] / 2,
    z0: pos[2] - s[2] / 2, z1: pos[2] + s[2] / 2,
  };
};

const snowBoxes = (item) => {
  const off = item.offset ?? [0, 0, 0];
  const out = [];
  if (Array.isArray(item.props.points)) {
    for (const pt of item.props.points) {
      if (!isVec3(pt)) continue;
      const p = vecAdd(pt, off);
      out.push({ x0: p[0] - 0.425, x1: p[0] + 0.425, y0: p[1], y1: p[1] + 0.05, z0: p[2] - 0.425, z1: p[2] + 0.425 });
    }
  } else if (isVec3(item.props.from) && isVec3(item.props.to)) {
    const count = Math.max(1, item.props.count ?? 8);
    const w = (item.props.width ?? 0.5) / 2;
    for (let i = 0; i < count; i++) {
      const k = count === 1 ? 0 : i / (count - 1);
      const p = [
        item.props.from[0] + (item.props.to[0] - item.props.from[0]) * k + off[0],
        item.props.from[1] + (item.props.to[1] - item.props.from[1]) * k + off[1],
        item.props.from[2] + (item.props.to[2] - item.props.from[2]) * k + off[2],
      ];
      out.push({ x0: p[0] - w, x1: p[0] + w, y0: p[1], y1: p[1] + 0.05, z0: p[2] - w, z1: p[2] + w });
    }
  }
  return out;
};

const axisOverlap = (a0, a1, b0, b1) => Math.min(a1, b1) - Math.max(a0, b0);

const ACTING_ANIMS = new Set([
  'wave', 'talk', 'laugh', 'cheer', 'clap', 'shrug', 'cower', 'lean', 'leanOver',
  'lookAround', 'point', 'reach', 'reachUp', 'hold', 'crouch', 'hug', 'scared',
  'panic', 'cry', 'sit', 'strain', 'rattle', 'push', 'hurt', 'jump', 'hop',
]);
const STANDING_POSES = new Set([
  'idle', 'talk', 'shrug', 'lookAround', 'laugh', 'cheer', 'wave', 'hold',
  'reach', 'lean', 'leanOver', 'point', 'sit', 'clap',
]);

function hasClockMotionProps(node) {
  if (!node || typeof node !== 'object') return false;
  if (Array.isArray(node)) return node.some(hasClockMotionProps);
  if (!node.$$typeof || !node.props) return false;
  const name = elemName(node);
  const p = node.props;
  if (ACTING_ANIMS.has(p.animation) && typeof (p.time ?? p.t) === 'number') return true;
  if ((typeof p.rattle === 'number' && p.rattle > 0) || (typeof p.strain === 'number' && p.strain > 0) || (typeof p.jaw === 'number' && p.jaw > 0) || (typeof p.shake === 'number' && p.shake > 0) || (typeof p.wave === 'number' && p.wave > 0)) return true;
  if (['FloatingHeart', 'SoundRings', 'Bits', 'EmberDrift', 'Puffs', 'Sparkle', 'ChatToast', 'ServerChatBox', 'BadgePop'].includes(name)) return true;
  return p.children ? hasClockMotionProps(p.children) : false;
}

function blockerBoxes(w) {
  if (!zonesOverlap) return [];
  if (w.name === 'Vox' || w.name === 'Block') {
    if (!w.pos) return [];
    const sz = w.props.size ?? [1, 1, 1];
    const bb = boxBounds(w.pos, sz);
    if (sz[1] < 0.7 && bb.y1 <= 0.15) return [];
    return [bb];
  }
  if (w.name === 'LampPost' && w.pos) {
    return [boxBounds([w.pos[0], w.pos[1] + 1.4, w.pos[2]], [0.46, 2.8, 0.46])];
  }
  if (w.name === 'Torch' && w.pos) {
    return [boxBounds([w.pos[0], w.pos[1] + 0.55, w.pos[2]], [0.36, 1.1, 0.36])];
  }
  if (w.name === 'Tree' && w.pos) {
    const h = w.props.height ?? 4;
    return [boxBounds([w.pos[0], w.pos[1] + h * 0.35, w.pos[2]], [0.6, h * 0.7, 0.6])];
  }
  return [];
}

function rayHitsBoxMid(eye, target, bb) {
  let tMin = 0, tMax = 1;
  for (let a = 0; a < 3; a++) {
    const d = target[a] - eye[a];
    const lo = a === 0 ? bb.x0 : a === 1 ? bb.y0 : bb.z0;
    const hi = a === 0 ? bb.x1 : a === 1 ? bb.y1 : bb.z1;
    if (Math.abs(d) < 1e-6) {
      if (eye[a] <= lo + 0.04 || eye[a] >= hi - 0.04) return false;
    } else {
      let t0 = (lo - eye[a]) / d;
      let t1 = (hi - eye[a]) / d;
      if (t0 > t1) [t0, t1] = [t1, t0];
      tMin = Math.max(tMin, t0);
      tMax = Math.min(tMax, t1);
      if (tMin >= tMax) return false;
    }
  }
  return tMax > 0.12 && tMin < 0.88;
}

// A child can run its own animation clock. Don't call it here (it may use hooks),
// and don't count passing t={t} to an inert child as proof that it moved.
function stagePrint(node) {
  return JSON.stringify(node, (key, v) => {
    if (['time', 't', 'clock'].includes(key) && typeof v === 'number') return '[clock]';
    if (v && typeof v === 'object') {
      if (v.$$typeof && v.props) return [typeof v.type === 'string' ? v.type : v.type?.name ?? 'component', v.props];
      if (!Array.isArray(v) && Object.getPrototypeOf(v) !== Object.prototype && Object.getPrototypeOf(v) !== null) return v.constructor?.name;
    }
    return typeof v === 'number' ? Math.round(v * 1000) / 1000 : v;
  });
}

function narration(film, timing, topic, script, covered, frames, r, replayLegacy) {
  const { fps } = film, { errors, unfinished, review } = r;
  if (!timing?.words?.length || !timing.cues?.length) {
    errors.push('Missing word or cue track. Rebuild timing.json from narration.md.');
    return;
  }
  const { words, cues, clips = [] } = timing;
  if (timing.fps !== fps || !Number.isFinite(timing.duration) || timing.duration <= 0) errors.push('Film and voice clocks disagree (fps/duration).');
  if (script && (script.cues.length !== cues.length || cues.some((c, i) => c.id !== script.cues[i].id || c.text !== script.cues[i].text))) errors.push('The cue transcript is stale. Record the edited script and rebuild timing.json.');
  const expected = cues.flatMap(c => c.text.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)));
  if (expected.length !== words.length || words.some((w, i) => w.w !== expected[i])) errors.push('Caption text differs from the cue transcript. Rebuild timing.json; do not edit the captions.');
  const bad = words.findIndex((w, i) => !Number.isFinite(w.s) || !Number.isFinite(w.e) || w.s < 0 || w.e <= w.s ||
    w.e > timing.duration + 1/fps || (i > 0 && (w.s < words[i-1].s || w.s < words[i-1].e - .001)));
  if (bad >= 0) errors.push(`Word ${bad + 1} (${words[bad].w}): invalid or overlapping onset/end.`);
  const track = film.captions?.words;
  if (track?.length !== words.length || words.some((w, i) => track[i].w !== w.w || track[i].s !== w.s || track[i].e !== w.e)) errors.push('The displayed captions are not the recorded timing.words track (wrong words or offset).');
  if (!timing.audio || timing.estimated || !clips.length || (timing.wordTiming && timing.wordTiming !== 'aligned')) unfinished.push('No fully aligned word track. Record the clips and build with --require-alignment.');
  if (script && clips.length && (script.clipNames.length !== clips.length || clips.some((c, i) => c.name !== script.clipNames[i]))) unfinished.push('Clip timing does not account for each recording in the script, in order.');
  const guessed = [...new Set(clips.filter(c => c.timing !== 'aligned').map(c => c.name))];
  if (guessed.length) {
    const archivedClock = replayLegacy && !timing.estimated && timing.audio && timing.wordTiming === undefined && film.captions?.motion !== 'on-beat';
    (archivedClock ? review : unfinished).push(`Word timing needs alignment in: ${guessed.join(', ')}. ${archivedClock ? 'Replaying the legacy clock without retiming an archived cut; this would not pass --final.' : 'Having a voice file does not mean its words were measured.'}`);
  }
  if (covered.length !== cues.length || covered.some((c, i) => c.id !== cues[i]?.id || Math.abs(c.frame - Math.round(cues[i].start * fps)) > 1) || Math.abs(frames - Math.round(timing.duration * fps)) > 1) unfinished.push('The staged cut does not cover the whole voice on its cue frames, in order. Finish the shots before delivery.');
  const mix = `audio/${film.id}/mix.mp3`;
  const voiceOnly = topic.sound?.voiceOnly?.[film.id];
  const wanted = topic.sound?.required && !voiceOnly ? mix : timing.audio;
  if (!film.audio?.src || film.audio.volume <= 0 || (film.audio.src !== wanted && !(voiceOnly && film.audio.src === mix))) unfinished.push(`Film is not playing its finished audio (${wanted ?? 'recording missing'}).`);
  if (timing.wordTiming !== undefined && film.captions?.motion !== 'on-beat') unfinished.push('New voice clock, legacy caption motion. Set captions.motion to "on-beat" for this cut.');
  if (!film.post?.shaders || film.post.shaders.enabled === false) {
    (timing.wordTiming !== undefined || film.captions?.motion === 'on-beat' ? unfinished : review).push('Built-in shader chain is off. Keep an approved legacy look; new work uses post.shaders, not just post.bloom.');
  }
}

export function directionReport(film, timing, topic, script, { replayLegacy = false } = {}) {
  const r = { shots: 0, sampled: 0, changing: 0, errors: [], unfinished: [], review: [] };
  const { fps } = film, covered = [];
  let prior, alike = 0, quiet = 0, frame = 0;
  const isModern = timing?.wordTiming !== undefined || film.captions?.motion === 'on-beat';
  const bucket = isModern ? r.unfinished : r.review;
  const worldItems = expandWorld(film.World);
  const worldBoxes = worldItems.filter((w) => (w.name === 'Vox' || w.name === 'Block') && w.pos);
  const seenSnowWorld = new Set();
  for (const w of worldItems) {
    if (w.name !== 'SnowTrail') continue;
    const zKey = w.zone ?? '*';
    for (const sb of snowBoxes(w)) {
      for (const wb of worldBoxes) {
        if (!worldZonesOverlap(w, wb)) continue;
        const bb = boxBounds(wb.pos, wb.props.size);
        if (axisOverlap(sb.x0, sb.x1, bb.x0, bb.x1) > 0.05 && axisOverlap(sb.z0, sb.z1, bb.z0, bb.z1) > 0.05 && Math.abs(sb.y1 - bb.y1) < 0.002) {
          const key = `${zKey}:${wb.name}:${sb.y1.toFixed(3)}`;
          if (!seenSnowWorld.has(key)) {
            seenSnowWorld.add(key);
            bucket.push(`World coplanar y=${sb.y1.toFixed(3)}: ${wb.name} vs SnowTrail (zone ${zKey}). Raise SnowTrail or lower base slab >=0.005m.`);
          }
        }
      }
    }
  }
  const seenDup = new Set();
  const seenBoat = new Set();
  const seenSnowStage = new Set();

  for (const scene of film.scenes) {
    const duration = Math.max(1, Math.round(scene.duration * fps));
    for (const [i, s] of scene.shots.entries()) {
      r.shots++;
      // Same threshold as pickShot: the earliest output frame that actually selects it.
      const first = Math.max(0, Math.ceil((s.at - 1e-6) * fps));
      const next = scene.shots[i + 1];
      const last = (next ? Math.ceil((next.at - 1e-6) * fps) : duration) - 1;
      const where = `[${s.cue ?? `${scene.id}/${i + 1}`}] frame ${frame + first}`;
      const cueKey = s.cue ?? `${scene.id}/${i + 1}`;
      if (s.cue && covered.at(-1)?.id !== s.cue) covered.push({ id: s.cue, frame: frame + first });
      const view = camera(s);
      if (![view.start, view.end].every(v => Number.isFinite(v.span) && v.span > 0)) r.errors.push(`${where}: lens has no valid view of its subject.`);
      if (last < first) r.errors.push(`${where}: this shot has no screen frames.`);
      if (scene.sampleStage && !view.changes && !s.locked) {
        bucket.push(`${where}: camera resolves to a hold. Change the endpoints, or for a deliberate photograph/POV set locked: true and explain it in the note.`);
      } else if (scene.sampleStage && view.changes && !s.locked) {
        if (view.micro) {
          bucket.push(
            `${where}: camera barely moves (${view.eyeDist.toFixed(2)}m, ${view.angDeg.toFixed(1)}deg). That reads like a PowerPoint slide. Push >=0.5m, orbit >=15deg, truck with the actor, or set locked: true.`,
          );
        } else if (!view.meaningful) {
          r.review.push(
            `${where}: small camera travel (${view.eyeDist.toFixed(2)}m, ${view.angDeg.toFixed(1)}deg). Give the move more travel so the frame carries real motion energy.`,
          );
        }
      }
      if (s.dur > 0.95 && view.changes && !s.locked && !view.strongFx) {
        const easeName = s.ease ?? 'inOutCubic';
        if (easeName === 'outExpo' || evalEase(easeName, 0.5) >= 0.95) {
          bucket.push(
            `${where}: ${easeName} over ${s.dur.toFixed(2)}s finishes >95% of its move by halfway and freezes the tail. Keep cam.whip <= 0.85s or use "inOutSine".`,
          );
        }
      }
      if (r.shots === 1 && view.start.dist > 11 && !s.locked) {
        bucket.push(
          `${where}: opening hook camera starts ${view.start.dist.toFixed(1)}m from subject — lead characters read as specks on phones. Frame Frame 1 close (<= 8.5m) with immediate action.`,
        );
      }
      if (s.locked && view.changes) r.errors.push(`${where}: shot says locked but the camera moves.`);
      alike = similar(prior, view.start) ? alike + 1 : 1;
      if (alike === 3) r.review.push(`${where}: third consecutive opening with nearly the same view angle and frame size. Does the cut reveal anything new?`);
      prior = view.start;
      if (!scene.sampleStage || last < first) continue;
      r.sampled++;
      const sampleNodes = [0, .15, .5, .85, 1].map(p => scene.sampleStage(i, (first + Math.round(p * (last - first))) / fps - s.at));
      const poses = new Set(sampleNodes.map(n => stagePrint(n)));
      const clockActing = sampleNodes.some(hasClockMotionProps);
      if (poses.size > 1 || clockActing) { r.changing++; quiet = 0; }
      else if (!s.locked) {
        quiet++;
        if (isModern && quiet >= 2) {
          r.unfinished.push(`${where}: ${quiet} shots in a row send frozen unchanged props across 5 samples (no acting, motion, or expression).`);
        } else {
          r.review.push(`${where}: ${r.shots === 1 ? 'the opening sends' : 'shot sends'} unchanged props (apart from clocks) at five samples. Check the child rig on screen; a moving lens alone is not acting.`);
        }
      }

      // Stationary / post-stop / uncoupled / sideways walk / standing-slide detection across the 5 sampled stage trees
      const actorSamples = sampleNodes.map((n) => {
        const list = [];
        collectActors(n, list);
        return list;
      });
      if (actorSamples[0].length > 0 && actorSamples.every((list) => list.length === actorSamples[0].length)) {
        for (let k = 0; k < actorSamples[0].length; k++) {
          const name = actorSamples[0][k].name;
          if (!actorSamples.every((list) => list[k].name === name)) continue;
          const pts = actorSamples.map((list) => list[k]);
          const maxMove = Math.max(0, ...pts.map((pt) => gap(pt.pos, pts[0].pos)));
          const totalHoriz = Math.hypot(pts[pts.length - 1].pos[0] - pts[0].pos[0], pts[pts.length - 1].pos[2] - pts[0].pos[2]);
          const totalVert = Math.abs(pts[pts.length - 1].pos[1] - pts[0].pos[1]);
          const hasPos = pts.some((pt) => Array.isArray(pt.props.position));
          const hasAlt = pts.some((pt) => pt.props.shift !== undefined || pt.props.at !== undefined || pt.props.positions !== undefined);
          const walks = pts.map((pt) => pt.props.walk ?? 0);
          const walkSpan = pts.every((pt) => typeof pt.props.walk === 'number') ? Math.max(...walks) - Math.min(...walks) : 0;

          if (pts.every((pt) => typeof pt.props.walk === 'number') && pts.some((pt) => (pt.props.gaitWeight ?? 1) > 1e-4)) {
            if (walkSpan > 0.05 && (!hasAlt || hasPos)) {
              if (maxMove < 0.05) {
                bucket.push(`${where}: ${name} plays walk cycle (walk delta ${walkSpan.toFixed(2)}) while stationary (moved ${maxMove.toFixed(2)}m).`);
              } else {
                for (let j = 1; j < pts.length; j++) {
                  if (Math.abs(walks[j] - walks[j - 1]) > 0.25 && gap(pts[j].pos, pts[j - 1].pos) < 0.02 && Math.max(pts[j].props.gaitWeight ?? 1, pts[j - 1].props.gaitWeight ?? 1) > 0.05) {
                    bucket.push(`${where}: ${name} keeps cycling walk after stopping (walk delta ${Math.abs(walks[j] - walks[j - 1]).toFixed(2)} with <0.02m move).`);
                    break;
                  }
                }
              }
            }
          }

          const gaitPts = pts.filter((pt) => GAITS.has(pt.props.animation) && (pt.props.blend ?? 1) >= 0.05);
          if (gaitPts.length > 0) {
            const missingDist = gaitPts.find((pt) => typeof pt.props.animDistance !== 'number');
            if (missingDist && !gaitPts.some((pt) => pt.props.timeGait)) {
              bucket.push(`${where}: ${name} uses gait animation "${missingDist.props.animation}" without animDistance.`);
            } else if (gaitPts.every((pt) => typeof pt.props.animDistance === 'number')) {
              const dists = gaitPts.map((pt) => pt.props.animDistance);
              const distSpan = Math.max(...dists) - Math.min(...dists);
              if (distSpan > 0.05 && maxMove < 0.05 && (!hasAlt || hasPos)) {
                bucket.push(`${where}: ${name} advances animDistance (${distSpan.toFixed(2)}m) while stationary (moved ${maxMove.toFixed(2)}m).`);
              } else if (pts.length >= 5) {
                const p3 = pts[3], p4 = pts[4];
                if (
                  GAITS.has(p3.props.animation) &&
                  GAITS.has(p4.props.animation) &&
                  (p3.props.blend ?? 1) >= 0.95 &&
                  (p4.props.blend ?? 1) >= 0.95 &&
                  typeof p3.props.animDistance === 'number' &&
                  typeof p4.props.animDistance === 'number' &&
                  Math.abs(p4.props.animDistance - p3.props.animDistance) < 0.005 &&
                  p4.props.animDistance > 0.01 &&
                  gap(p4.pos, p3.pos) < 0.005
                ) {
                  bucket.push(`${where}: ${name} freezes mid-stride in "${p4.props.animation}" after stopping (animDistance=${p4.props.animDistance.toFixed(2)}). Use walkSegment/useWalkPath or blend back to "idle".`);
                }
              }
            }
          }

          // Anti-sidewalk / anti-moonwalk & anti-standing-slide checks
          if (isModern && totalHoriz >= 0.18 && totalVert < 0.25 && (!hasAlt || hasPos)) {
            const activelyWalking = gaitPts.length > 0 || walkSpan > 0.15;
            if (!activelyWalking) {
              const standingBad = pts.every((pt) => STANDING_POSES.has(pt.props.animation ?? 'idle'));
              if (standingBad) {
                bucket.push(`${where}: ${name} slides ${totalHoriz.toFixed(2)}m while in standing pose "${pts[2].props.animation ?? 'idle'}". Keep feet planted when standing, or walk forward with gait.`);
              }
            } else if (totalHoriz >= 0.30) {
              for (let j = 1; j < pts.length; j++) {
                const stepDx = pts[j].pos[0] - pts[j - 1].pos[0];
                const stepDz = pts[j].pos[2] - pts[j - 1].pos[2];
                const stepH = Math.hypot(stepDx, stepDz);
                const yaw = pts[j].props.rotationY ?? pts[j - 1].props.rotationY;
                const stepWalk = gaitPts.includes(pts[j]) || Math.abs(walks[j] - walks[j - 1]) > 0.12;
                if (stepWalk && stepH >= 0.14 && typeof yaw === 'number') {
                  const moveYaw = Math.atan2(stepDx, stepDz);
                  const diffDeg = Math.abs(Math.atan2(Math.sin(moveYaw - yaw), Math.cos(moveYaw - yaw))) * 180 / Math.PI;
                  if (diffDeg > 55) {
                    bucket.push(`${where}: ${name} walks sideways/backwards (travels ${Math.round(moveYaw * 180 / Math.PI)}deg, faces ${Math.round(yaw * 180 / Math.PI)}deg, diff ${Math.round(diffDeg)}deg). Face direction of travel!`);
                    break;
                  }
                }
              }
            }
          }
        }
      }

      // World vs stage duplicate / coplanar / Boat-vs-Vox / Camera-pillar obstruction checks
      if (worldItems.length > 0) {
        const midEye = s.path?.length >= 2 ? s.path[Math.floor(s.path.length / 2)] : [
          ((s.from?.[0] ?? 0) + (s.to?.[0] ?? s.from?.[0] ?? 0)) / 2,
          ((s.from?.[1] ?? 0) + (s.to?.[1] ?? s.from?.[1] ?? 0)) / 2,
          ((s.from?.[2] ?? 0) + (s.to?.[2] ?? s.from?.[2] ?? 0)) / 2,
        ];
        const midTarget = s.targetPath?.length >= 2 ? s.targetPath[Math.floor(s.targetPath.length / 2)] : [
          ((s.target?.[0] ?? 0) + (s.targetTo?.[0] ?? s.target?.[0] ?? 0)) / 2,
          ((s.target?.[1] ?? 0) + (s.targetTo?.[1] ?? s.target?.[1] ?? 0)) / 2,
          ((s.target?.[2] ?? 0) + (s.targetTo?.[2] ?? s.target?.[2] ?? 0)) / 2,
        ];
        if (isModern) {
          for (const wi of worldItems) {
            if (!zonesOverlap(s.zone, wi)) continue;
            for (const bb of blockerBoxes(wi)) {
              if (rayHitsBoxMid(midEye, midTarget, bb)) {
                const pos = wi.pos ?? [0, 0, 0];
                const key = `${cueKey}:cam:${wi.name}:${Math.round(pos[0])},${Math.round(pos[2])}`;
                if (!seenDup.has(key)) {
                  seenDup.add(key);
                  bucket.push(`${where}: Camera ray blocked by World <${wi.name}> near [${pos.map(n => Math.round(n * 10) / 10).join(', ')}]. Move pillar/lamp/wall or reposition camera.`);
                }
                break;
              }
            }
          }
        }
        const stageItems = [];
        collectStageItems(sampleNodes[2], stageItems);
        for (const st of stageItems) {
          if (st.pos && !PRIMITIVES.has(st.name)) {
            for (const wi of worldItems) {
              if (wi.name !== st.name || !wi.pos || !zonesOverlap(s.zone, wi)) continue;
              const d = gap(st.pos, wi.pos);
              if (d < 0.5) {
                const key = `${cueKey}:${st.name}`;
                if (!seenDup.has(key)) {
                  seenDup.add(key);
                  bucket.push(`${where}: Dup World+Stage <${st.name}> in [${cueKey}] (d=${d.toFixed(2)}m). Remove static World copy or omit from stage.`);
                }
              }
            }
          }
          if (st.name === 'Boat' && st.pos) {
            const boatBox = {
              x0: st.pos[0] - 0.78, x1: st.pos[0] + 0.78,
              y0: st.pos[1] + 0.10, y1: st.pos[1] + 0.78,
              z0: st.pos[2] - 1.65, z1: st.pos[2] + 1.65,
            };
            for (const wi of worldItems) {
              if (wi.name !== 'Vox' || !wi.pos || !zonesOverlap(s.zone, wi)) continue;
              const wb = boxBounds(wi.pos, wi.props.size);
              if (
                axisOverlap(boatBox.x0, boatBox.x1, wb.x0, wb.x1) > 0.3 &&
                axisOverlap(boatBox.y0, boatBox.y1, wb.y0, wb.y1) > 0.01 &&
                axisOverlap(boatBox.z0, boatBox.z1, wb.z0, wb.z1) > 0.3
              ) {
                const key = `${cueKey}:Boat`;
                if (!seenBoat.has(key)) {
                  seenBoat.add(key);
                  bucket.push(`${where}: Stage <Boat> intersects World <Vox> in [${cueKey}]. Remove the static boat slab from World.`);
                }
              }
            }
          }
          if (st.name === 'SnowTrail') {
            for (const sb of snowBoxes(st)) {
              for (const wb of worldBoxes) {
                if (!zonesOverlap(s.zone, wb)) continue;
                const bb = boxBounds(wb.pos, wb.props.size);
                if (
                  axisOverlap(sb.x0, sb.x1, bb.x0, bb.x1) > 0.05 &&
                  axisOverlap(sb.z0, sb.z1, bb.z0, bb.z1) > 0.05 &&
                  Math.abs(sb.y1 - bb.y1) < 0.002
                ) {
                  const key = `${cueKey}:${wb.name}:${sb.y1.toFixed(3)}`;
                  if (!seenSnowStage.has(key)) {
                    seenSnowStage.add(key);
                    bucket.push(`${where}: Stage <SnowTrail> coplanar y=${sb.y1.toFixed(3)} with World <${wb.name}> in [${cueKey}].`);
                  }
                }
              }
            }
          }
        }
      }
    }
    frame += duration;
  }
  if (topic?.film?.captions) narration(film, timing, topic, script, covered, frame, r, replayLegacy);
  return r;
}
