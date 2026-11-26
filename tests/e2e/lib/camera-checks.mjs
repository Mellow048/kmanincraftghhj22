import * as THREE from "three";

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const focalMmToFov = (mm, sensorHeightMm = 24) =>
  (2 * Math.atan(sensorHeightMm / (2 * Math.max(1, mm))) * 180) / Math.PI;

export const EASINGS = {
  linear: (t) => t,
  inSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  outSine: (t) => Math.sin((t * Math.PI) / 2),
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  inCubic: (t) => t * t * t,
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuint: (t) => 1 - Math.pow(1 - t, 5),
  outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inOutExpo: (t) =>
    t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
  inOutQuint: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2),
  snap: (t) => 1 - Math.pow(1 - clamp01(t), 4),
  hold: () => 0,
};

function hasEndpointChange(shot) {
  const posMoved =
    (shot.path && shot.path.length >= 2) ||
    (shot.to && shot.from && Math.hypot(shot.to[0] - shot.from[0], shot.to[1] - shot.from[1], shot.to[2] - shot.from[2]) > 0.01);
  const targetMoved =
    (shot.targetPath && shot.targetPath.length >= 2) ||
    (shot.targetTo && shot.target && Math.hypot(shot.targetTo[0] - shot.target[0], shot.targetTo[1] - shot.target[1], shot.targetTo[2] - shot.target[2]) > 0.01);
  const fovMoved = shot.fovTo != null && shot.fov != null && Math.abs(shot.fovTo - shot.fov) > 0.1;
  const rollMoved = shot.rollTo != null && shot.roll != null && Math.abs(shot.rollTo - shot.roll) > 0.01;
  return Boolean(posMoved || targetMoved || fovMoved || rollMoved);
}

/**
 * Detect `outExpo` (or overly front-loaded) tail-freeze shots where dur > 0.65s
 * and the trailing >= 40% of the shot travels < 5% of the eased move.
 */
export function detectOutExpoTailFreeze(
  shot,
  { minFreezeDur = 0.65, tailFraction = 0.4, maxTailMoveRatio = 0.05 } = {},
) {
  if (!shot || shot.locked) return null;
  const dur = Number(shot.dur ?? 0);
  const easeName = shot.ease ?? "inOutCubic";
  if (dur <= minFreezeDur) return null;
  if (!hasEndpointChange(shot)) return null;

  const fn = EASINGS[easeName];
  if (!fn) return null;

  const pSplit = 1 - tailFraction;
  const totalMove = Math.abs(fn(1) - fn(0));
  if (totalMove < 1e-6) return null;
  const tailMove = Math.abs(fn(1) - fn(pSplit)) / totalMove;

  if (easeName === "outExpo" && tailMove < maxTailMoveRatio) {
    const tailSec = dur * tailFraction;
    return {
      cue: shot.cue ?? "shot",
      dur,
      ease: easeName,
      tailFraction,
      tailSec,
      tailMoveRatio: tailMove,
      message: `[${shot.cue ?? "shot"}] outExpo tail freeze: dur=${dur.toFixed(2)}s (> ${minFreezeDur}s) leaves only ${(tailMove * 100).toFixed(2)}% motion over final ${tailSec.toFixed(2)}s (${(tailFraction * 100).toFixed(0)}%)`,
    };
  }
  return null;
}

function samplePath(pathPts, a, b, e, arc = 0) {
  if (pathPts && pathPts.length >= 2) {
    const curve = new THREE.CatmullRomCurve3(
      pathPts.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
      false,
      "centripetal",
      0.5,
    );
    return curve.getPointAt(clamp01(e));
  }
  const end = b ?? a;
  const p = new THREE.Vector3(a[0], a[1], a[2]).lerp(new THREE.Vector3(end[0], end[1], end[2]), e);
  if (arc !== 0) {
    const dir = new THREE.Vector3(end[0] - a[0], 0, end[2] - a[2]);
    if (dir.lengthSq() > 1e-6) {
      const side = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize();
      p.addScaledVector(side, Math.sin(Math.PI * e) * arc);
    }
  }
  return p;
}

/**
 * Construct a 9:16 `THREE.PerspectiveCamera` matching `src/engine/Camera.tsx` at local time `localT` inside `shot`.
 */
export function makePerspectiveCamera(shot, localT = 0, aspect = 9 / 16) {
  const dur = Math.max(shot.dur ?? 1, 1e-6);
  const p = clamp01(localT / dur);
  const easeFn = EASINGS[shot.ease ?? "inOutCubic"] ?? EASINGS.inOutCubic;
  const e = easeFn(p);

  const position = samplePath(shot.path, shot.from ?? [0, 1.5, 4], shot.to, e, shot.arc ?? 0);
  const target = samplePath(shot.targetPath, shot.target ?? [0, 1.2, 0], shot.targetTo, e, 0);
  target.y += shot.aim ?? 0;

  const baseFov = shot.focalLength != null ? focalMmToFov(shot.focalLength) : (shot.fov ?? 38);
  const endFov =
    shot.focalLength != null
      ? focalMmToFov(shot.focalLengthTo ?? shot.focalLength)
      : (shot.fovTo ?? baseFov);
  const fov = baseFov + (endFov - baseFov) * e;
  const roll = (shot.roll ?? 0) + ((shot.rollTo ?? shot.roll ?? 0) - (shot.roll ?? 0)) * e;

  if (shot.screenOffset && (shot.screenOffset[0] !== 0 || shot.screenOffset[1] !== 0)) {
    const fwd = target.clone().sub(position);
    const dist = fwd.length();
    if (dist > 1e-4) {
      const fovRad = (fov * Math.PI) / 180;
      const vSpan = 2 * dist * Math.tan(fovRad / 2);
      const hSpan = vSpan * aspect;
      const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
      const camUp = new THREE.Vector3().crossVectors(right, fwd).normalize();
      target.addScaledVector(right, -shot.screenOffset[0] * hSpan);
      target.addScaledVector(camUp, -shot.screenOffset[1] * vSpan);
    }
  }

  const cam = new THREE.PerspectiveCamera(fov, aspect, 0.05, 250);
  cam.position.copy(position);
  cam.up.set(0, 1, 0);
  cam.lookAt(target);
  if (roll) cam.rotateZ(roll);
  cam.updateMatrixWorld();
  cam.updateProjectionMatrix();
  return cam;
}

export function projectWorldPoint(camera, worldVec3) {
  const v = new THREE.Vector3(worldVec3[0], worldVec3[1], worldVec3[2]).project(camera);
  return {
    x: v.x,
    y: v.y,
    z: v.z,
    inFront: v.z > -1 && v.z < 1,
    insideMargins: (margin = 0.88) => v.z > -1 && v.z < 1 && Math.abs(v.x) < margin && Math.abs(v.y) < margin,
  };
}

export function projectBox3Corners(camera, minVec3, maxVec3) {
  const xs = [minVec3[0], maxVec3[0]];
  const ys = [minVec3[1], maxVec3[1]];
  const zs = [minVec3[2], maxVec3[2]];
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;
  for (const x of xs) {
    for (const y of ys) {
      for (const z of zs) {
        const p = projectWorldPoint(camera, [x, y, z]);
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
        if (p.z < minZ) minZ = p.z;
        if (p.z > maxZ) maxZ = p.z;
      }
    }
  }
  return {
    minX,
    maxX,
    minY,
    maxY,
    minZ,
    maxZ,
    widthFraction: (maxX - minX) / 2,
    heightFraction: (maxY - minY) / 2,
    visibleInFront: maxZ > -1 && minZ < 1,
  };
}

/**
 * Verify projected UI / FloatingNumber / ServerChatBox bounds against 9:16 safe margins
 * and the bottom Captions zone (`y = 0.67` -> clip center `-0.34`, band roughly `[-0.44, -0.20]`).
 */
export function checkCaptionsSafeZone(boxNdc, { minBottomNdcY = -0.2, maxTopNdcY = 0.92, maxMarginX = 0.92 } = {}) {
  const issues = [];
  if (!boxNdc.visibleInFront) {
    issues.push("Element is behind camera or clipped past far plane");
  }
  if (boxNdc.minX < -maxMarginX || boxNdc.maxX > maxMarginX) {
    issues.push(`Horizontal NDC [${boxNdc.minX.toFixed(2)}, ${boxNdc.maxX.toFixed(2)}] exceeds ±${maxMarginX}`);
  }
  if (boxNdc.minY < minBottomNdcY) {
    issues.push(`Bottom NDC ${boxNdc.minY.toFixed(2)} intrudes into Captions band (< ${minBottomNdcY})`);
  }
  if (boxNdc.maxY > maxTopNdcY) {
    issues.push(`Top NDC ${boxNdc.maxY.toFixed(2)} exceeds top safe margin (> ${maxTopNdcY})`);
  }
  return { ok: issues.length === 0, issues };
}
