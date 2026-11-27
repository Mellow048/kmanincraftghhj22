import React, { createContext, useContext, useEffect, useId, useMemo } from "react";
import type { Vec3 } from "./math";
import type { SetSolid } from "./blocking";

/**
 * Valve-style (TF2 / Left 4 Dead 2) Soft Pushback & Anti-Phasing Collision Layer.
 *
 * 1. Living actors (MinecraftAvatar) register their feet position + body radius.
 *    When two actors overlap in XZ (within `rA + rB`), both receive a gentle,
 *    deterministic radial pushback so they never phase through each other.
 * 2. Registered set walls/props (`<SolidBox />`) gently push overlapping actors
 *    out along the shallowest XZ axis and keep feet above the floor (`y >= 0`).
 * 3. `Camera.tsx` runs a spring-arm ray test (`target -> desiredPos`) against all
 *    registered `SolidBox` walls + floor (`y >= 0.35`). If a wall sits between the
 *    lens and the subject (or the camera backs into a wall), the camera is gently
 *    pulled inward along the ray so walls NEVER cover the frame.
 */

export type ActorBody = {
  id: string;
  position: Vec3;
  radius: number;
  height: number;
};

export type SolidEntry = SetSolid & { id: string; blocksCamera?: boolean };

export class CollisionWorld {
  private solids = new Map<string, SolidEntry>();
  private actors = new Map<string, ActorBody>();

  registerSolid(entry: SolidEntry): void {
    this.solids.set(entry.id, entry);
  }

  unregisterSolid(id: string): void {
    this.solids.delete(id);
  }

  updateActor(body: ActorBody): void {
    this.actors.set(body.id, body);
  }

  unregisterActor(id: string): void {
    this.actors.delete(id);
  }

  /**
   * TF2 / L4D2-style gentle pushback for a living character:
   * - Softly pushes away from any overlapping teammate/character in XZ
   * - Gently pushes out of any registered solid wall/prop AABB
   * - Keeps feet from sinking below floor y = 0 (unless intentionally negative, e.g. pit)
   */
  resolveActor(id: string, desired: Vec3, radius = 0.34, height = 1.85): Vec3 {
    let x = desired[0];
    let y = desired[1];
    let z = desired[2];

    // 1. Actor-vs-Actor soft radial separation (TF2 / L4D2 teammate bump)
    for (const other of this.actors.values()) {
      if (other.id === id) continue;
      // Ignore actors in completely different zones (> 12m away) or different vertical floors
      if (Math.abs(other.position[1] - y) > 1.5) continue;
      const dx = x - other.position[0];
      const dz = z - other.position[2];
      const minDist = radius + other.radius;
      const d2 = dx * dx + dz * dz;
      if (d2 < minDist * minDist) {
        const d = Math.sqrt(d2);
        // Deterministic push direction even at exact overlap
        let nx = 1;
        let nz = 0;
        if (d > 1e-4) {
          nx = dx / d;
          nz = dz / d;
        } else {
          nx = id < other.id ? -1 : 1;
          nz = 0;
        }
        // Gentle half-push (each actor yields ~55% of overlap)
        const push = (minDist - d) * 0.55;
        x += nx * push;
        z += nz * push;
      }
    }

    // 2. Actor-vs-Solid wall/prop soft pushback
    for (const s of this.solids.values()) {
      const minY = s.position[1] - s.size[1] / 2;
      const maxY = s.position[1] + s.size[1] / 2;
      if (y + height <= minY + 0.05 || y >= maxY - 0.05) continue;

      const hx = s.size[0] / 2 + radius;
      const hz = s.size[2] / 2 + radius;
      const dx = x - s.position[0];
      const dz = z - s.position[2];
      if (Math.abs(dx) < hx && Math.abs(dz) < hz) {
        const penX = hx - Math.abs(dx);
        const penZ = hz - Math.abs(dz);
        if (penX < penZ) {
          x += (dx >= 0 ? 1 : -1) * (penX + 0.03);
        } else {
          z += (dz >= 0 ? 1 : -1) * (penZ + 0.03);
        }
      }
    }

    // 3. Floor anti-sink guard (gentle clamp above ground plane)
    if (y < 0 && y > -0.25) {
      y = 0;
    }

    return [x, y, z];
  }

  /**
   * Spring-arm camera anti-clip test:
   * Casts segment `target -> desiredPos` against every camera-blocking solid wall.
   * If a wall blocks the line of sight or the camera backs into a wall, gently pulls
   * the camera inward along the ray to `hitT - margin` so a wall never covers the lens.
   */
  resolveCamera(target: Vec3, desiredPos: Vec3, margin = 0.38): Vec3 {
    const dx = desiredPos[0] - target[0];
    const dy = desiredPos[1] - target[1];
    const dz = desiredPos[2] - target[2];
    const rayLen = Math.hypot(dx, dy, dz);
    if (rayLen < 0.2) return desiredPos;

    let bestT = 1.0;
    const pad = 0.16;

    for (const s of this.solids.values()) {
      if (s.blocksCamera === false) continue;
      // Slab intersection of segment [0, 1] with expanded AABB
      let tmin = 0.0;
      let tmax = 1.0;
      const mins: Vec3 = [
        s.position[0] - s.size[0] / 2 - pad,
        s.position[1] - s.size[1] / 2 - pad,
        s.position[2] - s.size[2] / 2 - pad,
      ];
      const maxs: Vec3 = [
        s.position[0] + s.size[0] / 2 + pad,
        s.position[1] + s.size[1] / 2 + pad,
        s.position[2] + s.size[2] / 2 + pad,
      ];
      const orig: Vec3 = target;
      const dir: Vec3 = [dx, dy, dz];

      let hit = true;
      for (let k = 0; k < 3; k++) {
        if (Math.abs(dir[k]) < 1e-6) {
          if (orig[k] < mins[k] || orig[k] > maxs[k]) {
            hit = false;
            break;
          }
        } else {
          let t1 = (mins[k] - orig[k]) / dir[k];
          let t2 = (maxs[k] - orig[k]) / dir[k];
          if (t1 > t2) [t1, t2] = [t2, t1];
          tmin = Math.max(tmin, t1);
          tmax = Math.min(tmax, t2);
          if (tmin > tmax) {
            hit = false;
            break;
          }
        }
      }

      // Only pull in if the wall is between target and camera (tmin > 0.05)
      if (hit && tmin > 0.05 && tmin < bestT) {
        bestT = tmin;
      }
    }

    let finalT = bestT;
    if (bestT < 1.0) {
      const pull = margin / rayLen;
      finalT = Math.max(0.28, bestT - pull);
    }

    const rx = target[0] + dx * finalT;
    const ry = Math.max(0.35, target[1] + dy * finalT);
    const rz = target[2] + dz * finalT;
    return [rx, ry, rz];
  }
}

const CollisionContext = createContext<CollisionWorld | null>(null);

export const CollisionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const world = useMemo(() => new CollisionWorld(), []);
  return <CollisionContext.Provider value={world}>{children}</CollisionContext.Provider>;
};

export const useCollisionWorld = (): CollisionWorld | null => useContext(CollisionContext);

/**
 * Drop into any `world.tsx` or set component (`Room`, `VillageStreet`, `ClassroomRoom`)
 * to register a solid wall/obstacle for both Valve-style actor pushback and camera anti-clip.
 */
export const SolidBox: React.FC<{
  name: string;
  position: Vec3;
  size: Vec3;
  blocksCamera?: boolean;
}> = ({ name, position, size, blocksCamera = true }) => {
  const world = useCollisionWorld();
  const id = useId();
  const px = position[0], py = position[1], pz = position[2];
  const sx = size[0], sy = size[1], sz = size[2];

  useEffect(() => {
    if (!world) return;
    world.registerSolid({ id, name, position: [px, py, pz], size: [sx, sy, sz], blocksCamera });
    return () => world.unregisterSolid(id);
  }, [world, id, name, px, py, pz, sx, sy, sz, blocksCamera]);

  return null;
};
