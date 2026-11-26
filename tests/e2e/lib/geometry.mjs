import * as THREE from "three";

const GAIT_ANIMS = new Set(["walk", "run", "creep", "stagger"]);

export const DEFAULT_TRACKED_ACTORS = new Set([
  "Villager",
  "SnowGolem",
  "Strider",
  "IronGolem",
  "MinecraftAvatar",
  "Hero",
  "Mum",
  "Dad",
  "Baker",
  "OldWick",
  "Teller",
  "Fox",
  "Sister",
  "ServerPlayer",
  "CitizenLead",
  "EliteLead",
  "Official",
]);

function nodeTypeName(node) {
  if (!node || typeof node !== "object") return null;
  if (typeof node.type === "string") return node.type;
  if (typeof node.type === "function") return node.type.displayName || node.type.name || "Component";
  if (typeof node.type === "symbol") return "Fragment";
  return null;
}

function nodeChildren(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node.children)) return node.children;
  const c = node.props?.children;
  if (c == null) return [];
  return Array.isArray(c) ? c.flat(Infinity).filter(Boolean) : [c];
}

function toVec3(v, fallback = [0, 0, 0]) {
  if (Array.isArray(v) && v.length >= 3) return [Number(v[0]) || 0, Number(v[1]) || 0, Number(v[2]) || 0];
  if (typeof v === "number" && Number.isFinite(v)) return [v, v, v];
  return fallback;
}

function getLocalTransform(props = {}) {
  const pos = toVec3(props.position, [0, 0, 0]);
  const rot = props.rotation
    ? toVec3(props.rotation, [0, 0, 0])
    : [
        Number(props["rotation-x"] ?? props.rotationX ?? 0) || 0,
        Number(props["rotation-y"] ?? props.rotationY ?? 0) || 0,
        Number(props["rotation-z"] ?? props.rotationZ ?? 0) || 0,
      ];
  const scl = props.scale !== undefined ? toVec3(props.scale, [1, 1, 1]) : [1, 1, 1];
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rot[0], rot[1], rot[2], "XYZ"));
  m.compose(new THREE.Vector3(pos[0], pos[1], pos[2]), q, new THREE.Vector3(scl[0], scl[1], scl[2]));
  return { matrix: m, pos, rot, scl };
}

export function walkElements(root, visitor, { activeZone = undefined } = {}) {
  const identity = new THREE.Matrix4();

  function visit(node, parentMatrix, zoneCtx, path) {
    if (node == null || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach((child, idx) => visit(child, parentMatrix, zoneCtx, `${path}[${idx}]`));
      return;
    }

    const name = nodeTypeName(node);
    if (!name) return;
    const props = node.props ?? {};

    let nextZone = zoneCtx;
    if (name === "Zone") {
      const zName = props.name;
      const companions = props.with ?? [];
      if (activeZone !== undefined && zName) {
        const activeList = String(activeZone).split("+");
        const visible = activeList.includes(zName) || companions.some((c) => activeList.includes(c));
        if (!visible) return;
      }
      nextZone = zName ?? zoneCtx;
    }
    if (props.visible === false) return;

    const { matrix: localM } = getLocalTransform(props);
    const worldM = parentMatrix.clone().multiply(localM);
    const nodePath = `${path}/${name}`;

    visitor({ node, name, props, worldMatrix: worldM, zone: nextZone, path: nodePath });

    for (const [idx, child] of nodeChildren(node).entries()) {
      visit(child, worldM, nextZone, `${nodePath}.${idx}`);
    }
  }

  visit(root, identity, undefined, "root");
}

function transformedBox(localMin, localMax, worldMatrix) {
  const b = new THREE.Box3(
    new THREE.Vector3(localMin[0], localMin[1], localMin[2]),
    new THREE.Vector3(localMax[0], localMax[1], localMax[2]),
  );
  b.applyMatrix4(worldMatrix);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  b.getCenter(center);
  b.getSize(size);
  return {
    min: [b.min.x, b.min.y, b.min.z],
    max: [b.max.x, b.max.y, b.max.z],
    center: [center.x, center.y, center.z],
    size: [size.x, size.y, size.z],
  };
}

/**
 * Extract world-space AABBs from Block, Vox, and raw Three.js <mesh> elements.
 */
export function extractBoxes(root, { activeZone = undefined, includePlanes = false } = {}) {
  const boxes = [];

  walkElements(
    root,
    ({ node, name, props, worldMatrix, zone, path }) => {
      if ((name === "Block" || name === "Vox") && Array.isArray(props.size)) {
        const [w, h, d] = props.size.map(Number);
        const box = transformedBox([-w / 2, -h / 2, -d / 2], [w / 2, h / 2, d / 2], worldMatrix);
        boxes.push({ ...box, tag: name, path, zone, props });
        return;
      }

      if (name === "mesh") {
        const children = nodeChildren(node);
        for (const c of children) {
          const cName = nodeTypeName(c);
          const args = c?.props?.args;
          if (cName === "boxGeometry" && Array.isArray(args) && args.length >= 3) {
            const [w, h, d] = args.map(Number);
            const box = transformedBox([-w / 2, -h / 2, -d / 2], [w / 2, h / 2, d / 2], worldMatrix);
            boxes.push({ ...box, tag: "mesh:box", path, zone, props });
          } else if (cName === "cylinderGeometry" && Array.isArray(args) && args.length >= 3) {
            const rt = Number(args[0]) || 0.5;
            const rb = Number(args[1]) || rt;
            const r = Math.max(rt, rb);
            const h = Number(args[2]) || 1;
            const box = transformedBox([-r, -h / 2, -r], [r, h / 2, r], worldMatrix);
            boxes.push({ ...box, tag: "mesh:cylinder", path, zone, props, args });
          } else if (includePlanes && cName === "planeGeometry" && Array.isArray(args) && args.length >= 2) {
            const [w, h] = args.map(Number);
            const box = transformedBox([-w / 2, -h / 2, -0.0005], [w / 2, h / 2, 0.0005], worldMatrix);
            boxes.push({ ...box, tag: "mesh:plane", path, zone, props });
          }
        }
      }
    },
    { activeZone },
  );

  return boxes;
}

function intervalOverlap(a0, a1, b0, b1) {
  return Math.min(a1, b1) - Math.max(a0, b0);
}

/**
 * Detect coplanar faces (within `eps`, default 0.001m) and 3D intersecting AABB volumes.
 * Touching stacked boxes (where A.maxY === B.minY and volumes do not interpenetrate) are valid.
 */
export function findCoplanarOrOverlapping(boxes, { eps = 0.001, overlapEps = 0.001 } = {}) {
  const conflicts = [];

  for (let i = 0; i < boxes.length; i++) {
    const a = boxes[i];
    for (let j = i + 1; j < boxes.length; j++) {
      const b = boxes[j];
      const ox = intervalOverlap(a.min[0], a.max[0], b.min[0], b.max[0]);
      const oy = intervalOverlap(a.min[1], a.max[1], b.min[1], b.max[1]);
      const oz = intervalOverlap(a.min[2], a.max[2], b.min[2], b.max[2]);

      // 1) Volume intersection
      if (ox > overlapEps && oy > overlapEps && oz > overlapEps) {
        conflicts.push({
          type: "overlap",
          a,
          b,
          overlap: [ox, oy, oz],
          message: `3D AABB overlap between ${a.tag}(${a.path}) and ${b.tag}(${b.path}) by [${ox.toFixed(4)}, ${oy.toFixed(4)}, ${oz.toFixed(4)}]m`,
        });
        continue;
      }

      // 2) Coplanar same-normal faces on Y, X, or Z where orthogonal footprint overlaps
      if (ox > overlapEps && oz > overlapEps) {
        if (Math.abs(a.max[1] - b.max[1]) < eps) {
          conflicts.push({
            type: "coplanar",
            axis: "+Y",
            y: (a.max[1] + b.max[1]) / 2,
            a,
            b,
            message: `Coplanar +Y face at y=${a.max[1].toFixed(4)}m (Δ=${Math.abs(a.max[1] - b.max[1]).toFixed(5)}m) between ${a.path} and ${b.path}`,
          });
          continue;
        }
        if (Math.abs(a.min[1] - b.min[1]) < eps) {
          conflicts.push({
            type: "coplanar",
            axis: "-Y",
            y: (a.min[1] + b.min[1]) / 2,
            a,
            b,
            message: `Coplanar -Y face at y=${a.min[1].toFixed(4)}m (Δ=${Math.abs(a.min[1] - b.min[1]).toFixed(5)}m) between ${a.path} and ${b.path}`,
          });
          continue;
        }
      }

      if (oy > overlapEps && oz > overlapEps) {
        if (Math.abs(a.max[0] - b.max[0]) < eps || Math.abs(a.min[0] - b.min[0]) < eps) {
          conflicts.push({
            type: "coplanar",
            axis: "X",
            a,
            b,
            message: `Coplanar X face between ${a.path} and ${b.path}`,
          });
          continue;
        }
      }

      if (ox > overlapEps && oy > overlapEps) {
        if (Math.abs(a.max[2] - b.max[2]) < eps || Math.abs(a.min[2] - b.min[2]) < eps) {
          conflicts.push({
            type: "coplanar",
            axis: "Z",
            a,
            b,
            message: `Coplanar Z face between ${a.path} and ${b.path}`,
          });
        }
      }
    }
  }

  return conflicts;
}

/**
 * Inspect Bill / BillStack / Printer trees for vertical spacing >= minPitch (0.019m).
 */
export function checkBillStackSpacing(root, { minPitch = 0.019 } = {}) {
  const billPositions = [];
  walkElements(root, ({ name, props, worldMatrix, path }) => {
    if (name === "Bill") {
      const p = new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
      billPositions.push({ y: p.y, x: p.x, z: p.z, path });
    } else if (name === "Block" && Array.isArray(props.size) && Math.abs(props.size[0] - 0.46) < 1e-4 && Math.abs(props.size[1] - 0.012) < 1e-4) {
      // Expanded Bill base block (center at y + 0.006)
      const p = new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
      billPositions.push({ y: p.y - 0.006, x: p.x, z: p.z, path });
    }
  });

  // Sort by Y and check consecutive bills that share XZ footprint (< 0.5m apart)
  const violations = [];
  const sorted = [...billPositions].sort((a, b) => a.y - b.y);
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    if (Math.hypot(curr.x - prev.x, curr.z - prev.z) < 0.45) {
      const dy = curr.y - prev.y;
      if (dy < minPitch - 1e-5) {
        violations.push({
          dy,
          minPitch,
          prev,
          curr,
          message: `Bill stack vertical spacing ${dy.toFixed(4)}m < required ${minPitch.toFixed(3)}m`,
        });
      }
    }
  }
  return { count: sorted.length, violations };
}

/**
 * Inspect FlatCoin / CoinStack / CoinPile cylinder pairs for coplanar top/bottom faces.
 */
export function checkFlatCoinNonCoplanar(root, { minFaceGap = 0.002 } = {}) {
  const cylinders = extractBoxes(root).filter((b) => b.tag === "mesh:cylinder");
  const violations = [];

  for (let i = 0; i < cylinders.length; i++) {
    const a = cylinders[i];
    for (let j = i + 1; j < cylinders.length; j++) {
      const b = cylinders[j];
      const xzDist = Math.hypot(a.center[0] - b.center[0], a.center[2] - b.center[2]);
      if (xzDist > 0.02) continue;
      // Same coin stack/coin pair: check if top or bottom planes are too close without full containment clearance
      const topGap = Math.abs(a.max[1] - b.max[1]);
      const botGap = Math.abs(a.min[1] - b.min[1]);
      const aY = a.min[1] <= b.max[1] && b.min[1] <= a.max[1];
      if (aY && (topGap < minFaceGap || botGap < minFaceGap)) {
        violations.push({
          a,
          b,
          topGap,
          botGap,
          message: `FlatCoin coplanar/near-coplanar cylinder faces (topGap=${topGap.toFixed(5)}m, botGap=${botGap.toFixed(5)}m < ${minFaceGap}m) at ${a.path} vs ${b.path}`,
        });
      }
    }
  }
  return { cylinderCount: cylinders.length, violations };
}

/**
 * Check World element tree vs Scene stage element trees for duplicate animated props.
 */
export function findDuplicateWorldSceneProps(
  worldRoot,
  sceneRoots,
  { tracked = ["Furnace", "CellarGate", "ChalkWall", "Stall", "Boat"], radius = 1.0 } = {},
) {
  const trackedSet = new Set(tracked);
  const worldProps = [];
  walkElements(worldRoot, ({ name, props, worldMatrix, zone, path }) => {
    if (trackedSet.has(name)) {
      const p = new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
      worldProps.push({ name, pos: [p.x, p.y, p.z], zone, path, props });
    }
  });

  const duplicates = [];
  for (const item of sceneRoots) {
    const sceneZone = item.zone;
    const stageRoot = item.root ?? item;
    walkElements(stageRoot, ({ name, worldMatrix, path }) => {
      if (!trackedSet.has(name)) return;
      const sp = new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
      for (const wp of worldProps) {
        if (wp.name !== name) continue;
        if (sceneZone && wp.zone && !String(sceneZone).split("+").includes(wp.zone)) continue;
        const xzDist = Math.hypot(sp.x - wp.pos[0], sp.z - wp.pos[2]);
        if (xzDist <= radius) {
          duplicates.push({
            prop: name,
            worldPos: wp.pos,
            scenePos: [sp.x, sp.y, sp.z],
            xzDist,
            zone: wp.zone ?? sceneZone ?? "all",
            cue: item.cue ?? path,
            message: `Duplicate ${name} in World (${wp.pos.map((n) => n.toFixed(2)).join(",")}) and scene ${item.cue ?? ""} (${[sp.x, sp.y, sp.z].map((n) => n.toFixed(2)).join(",")})`,
          });
        }
      }
    });
  }
  return duplicates;
}

/**
 * Sample `sampleStage(i, t)` across each shot in a scene and detect:
 *  - stationary walk / animDistance (`Δpos < 0.05` while `Δwalk > 0.05` or `ΔanimDistance > 0.05`)
 *  - uncoupled gait (`animation in GAIT_ANIMS` with `animDistance === undefined`)
 *  - skating non-gait (`animDistance` advancing on non-gait pose like `hold`/`push`/`reach`/`shrug` while translating)
 *  - crab-walk (`Δpos_xz > 0.1` while `walk` advances and movement direction disagrees with `rotationY`)
 */
export function detectStationaryWalks(
  sampleStageFn,
  shots,
  { actors = DEFAULT_TRACKED_ACTORS, checkCrabWalk = true } = {},
) {
  const issues = [];
  const sampleFracs = [0.05, 0.25, 0.5, 0.75, 0.95];

  for (let i = 0; i < shots.length; i++) {
    const shot = shots[i];
    const dur = Math.max(0.05, shot.dur ?? 1);
    const tracks = new Map();

    for (const frac of sampleFracs) {
      const t = frac * dur;
      let stage;
      try {
        stage = sampleStageFn(i, t);
      } catch {
        continue;
      }
      if (!stage) continue;

      let ordinal = 0;
      walkElements(stage, ({ name, props, worldMatrix }) => {
        if (!actors.has(name)) return;
        const key = `${name}#${props.role ?? props.nameTag ?? props.robe ?? ordinal++}`;
        const posVec = new THREE.Vector3(0, 0, 0).applyMatrix4(worldMatrix);
        const rot = props.rotation ? toVec3(props.rotation) : [0, Number(props.rotationY ?? props["rotation-y"] ?? 0) || 0, 0];

        if (!tracks.has(key)) tracks.set(key, []);
        tracks.get(key).push({
          t,
          pos: [posVec.x, posVec.y, posVec.z],
          rotationY: rot[1],
          walk: typeof props.walk === "number" ? props.walk : undefined,
          animDistance: typeof props.animDistance === "number" ? props.animDistance : undefined,
          animation: props.animation,
          blendTo: props.blendTo,
        });
      });
    }

    for (const [actorKey, samples] of tracks.entries()) {
      if (samples.length < 2) continue;
      const first = samples[0];
      const last = samples[samples.length - 1];

      let maxPosDelta = 0;
      let totalPosDelta = 0;
      for (let k = 1; k < samples.length; k++) {
        const d = Math.hypot(
          samples[k].pos[0] - samples[k - 1].pos[0],
          samples[k].pos[1] - samples[k - 1].pos[1],
          samples[k].pos[2] - samples[k - 1].pos[2],
        );
        totalPosDelta += d;
        const dFromStart = Math.hypot(
          samples[k].pos[0] - first.pos[0],
          samples[k].pos[1] - first.pos[1],
          samples[k].pos[2] - first.pos[2],
        );
        if (dFromStart > maxPosDelta) maxPosDelta = dFromStart;
      }

      const walkVals = samples.map((s) => s.walk).filter((v) => v !== undefined);
      const walkDelta = walkVals.length >= 2 ? Math.max(...walkVals) - Math.min(...walkVals) : 0;

      const distVals = samples.map((s) => s.animDistance).filter((v) => v !== undefined);
      const animDistDelta = distVals.length >= 2 ? Math.max(...distVals) - Math.min(...distVals) : 0;

      const anim = first.animation;
      const cue = shot.cue ?? `shot-${i}`;

      if (walkDelta > 0.05 && maxPosDelta < 0.05 && totalPosDelta < 0.05) {
        issues.push({
          kind: "stationary-walk",
          cue,
          actor: actorKey,
          walkDelta,
          posDelta: maxPosDelta,
          message: `[${cue}] ${actorKey}: walk advances by ${walkDelta.toFixed(2)} while position moves ${maxPosDelta.toFixed(3)}m (< 0.05m)`,
        });
      }

      if (animDistDelta > 0.05 && maxPosDelta < 0.05 && totalPosDelta < 0.05) {
        issues.push({
          kind: "stationary-animDistance",
          cue,
          actor: actorKey,
          animDistDelta,
          posDelta: maxPosDelta,
          message: `[${cue}] ${actorKey}: animDistance advances by ${animDistDelta.toFixed(2)}m while stationary (${maxPosDelta.toFixed(3)}m)`,
        });
      }

      if (anim && GAIT_ANIMS.has(anim) && distVals.length === 0) {
        issues.push({
          kind: "uncoupled-gait",
          cue,
          actor: actorKey,
          animation: anim,
          message: `[${cue}] ${actorKey}: gait animation "${anim}" used without animDistance`,
        });
      }

      if (anim && !GAIT_ANIMS.has(anim) && distVals.length > 0 && (animDistDelta > 0.05 || maxPosDelta > 0.15)) {
        issues.push({
          kind: "uncoupled-animDistance-non-gait",
          cue,
          actor: actorKey,
          animation: anim,
          animDistDelta,
          posDelta: maxPosDelta,
          message: `[${cue}] ${actorKey}: non-gait animation "${anim}" paired with animDistance (skating)`,
        });
      }

      if (checkCrabWalk && (walkDelta > 0.05 || animDistDelta > 0.05)) {
        const dx = last.pos[0] - first.pos[0];
        const dz = last.pos[2] - first.pos[2];
        const xzMove = Math.hypot(dx, dz);
        // Check oscillating zero-net-progress walk (like Math.sin(t * 2.5) * 0.25) or lateral crab-walk
        if (walkDelta > 0.2 && xzMove < 0.05 && totalPosDelta >= 0.05) {
          issues.push({
            kind: "oscillating-walk",
            cue,
            actor: actorKey,
            message: `[${cue}] ${actorKey}: oscillating in place with advancing walk (${walkDelta.toFixed(2)})`,
          });
        } else if (xzMove > 0.15) {
          const avgRy = first.rotationY;
          const fwdX = Math.sin(avgRy);
          const fwdZ = Math.cos(avgRy);
          const dot = (dx / xzMove) * fwdX + (dz / xzMove) * fwdZ;
          if (dot < 0.45) {
            issues.push({
              kind: "crab-walk",
              cue,
              actor: actorKey,
              dot,
              message: `[${cue}] ${actorKey}: moving direction disagrees with facing rotationY (dot=${dot.toFixed(2)})`,
            });
          }
        }
      }
    }
  }

  return issues;
}
