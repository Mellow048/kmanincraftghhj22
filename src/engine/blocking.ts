import type { Vec3 } from './math';

/** World-space occupied boxes, in metres. Use the SAME position/size for the set mesh.
 * A walker's position is its feet. Contact is legal; penetration is not. These are
 * conservative blocking volumes, not a physics simulation of swinging limbs.
 */
export type SetSolid = { name: string; position: Vec3; size: Vec3 };
export type BodyClearance = { radius: number; height: number };
const EPS = 1e-6;
const finitePoint = (p: Vec3) => p.length === 3 && p.every(Number.isFinite);

// Intersect the entire segment with the box expanded by the actor's footprint
// and height. Checking only marks (or sampling a few frames) misses thin walls.
function crosses(a: Vec3, b: Vec3, box: SetSolid, body: BodyClearance) {
  let enter = 0, leave = 1;
  for (let k = 0; k < 3; k++) {
    const low = box.position[k] - box.size[k] / 2 - (k === 1 ? body.height : body.radius) + EPS;
    const high = box.position[k] + box.size[k] / 2 + (k === 1 ? 0 : body.radius) - EPS;
    const delta = b[k] - a[k];
    if (Math.abs(delta) < EPS) {
      if (a[k] <= low || a[k] >= high) return false;
    } else {
      const t0 = (low - a[k]) / delta, t1 = (high - a[k]) / delta;
      enter = Math.max(enter, Math.min(t0, t1)); leave = Math.min(leave, Math.max(t0, t1));
      if (leave < enter) return false;
    }
  }
  return true;
}

/** Rehearse once, at construction. Then sample exactly this path (not a spline
 * that cuts the corner). The returned distance drives MinecraftAvatar's gait.
 * One mark is allowed: check a stationary actor too. Pass only this zone's solids.
 */
export function blockedRoute(label: string, marks: Vec3[], solids: SetSolid[], body: BodyClearance) {
  if (!marks.length || marks.some(p => !finitePoint(p)) || !Number.isFinite(body.height) || body.height <= 0 ||
      !Number.isFinite(body.radius) || body.radius < 0) throw Error(`${label}: invalid marks or body clearance`);
  for (const s of solids) {
    if (!finitePoint(s.position) || !finitePoint(s.size) || s.size.some(v => v <= 0)) throw Error(`${label}: invalid solid ${s.name}`);
  }
  const fixed = marks.map(p => [...p] as Vec3); // a caller moving its input must not change the checked path
  const legs = fixed.map((a, i) => {
    const b = fixed[i + 1] ?? a;
    for (const s of solids) if (crosses(a, b, s, body)) {
      throw Error(`${label}: mark ${i + 1}${i + 1 < marks.length ? ` → ${i + 2}` : ''} crosses ${s.name}. Move the mark or route around it.`);
    }
    return { a, b, length: Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) };
  }).filter(l => l.length > EPS);
  const length = legs.reduce((n, l) => n + l.length, 0);
  function sample(distance: number): Vec3 {
    let left = distance;
    for (const leg of legs) {
      if (left <= leg.length || leg === legs[legs.length - 1]) {
        const { a, b } = leg, k = Math.min(1, left / leg.length);
        return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
      }
      left -= leg.length;
    }
    return [...fixed[0]];
  }
  return (progress: number) => {
    if (!Number.isFinite(progress)) throw Error(`${label}: non-finite route progress`);
    const animDistance = Math.min(1, Math.max(0, progress)) * length;
    // Soften the facing, NOT the path: a spline here would cut the checked corner.
    const before = sample(Math.max(0, animDistance - .15));
    const after = sample(Math.min(length, animDistance + .15));
    return { position: sample(animDistance), rotationY: Math.atan2(after[0] - before[0], after[2] - before[2]), animDistance };
  };
}
