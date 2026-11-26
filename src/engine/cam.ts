import type { Vec3 } from "./math";
import type { Shot } from "./types";

/**
 * Camera recipes: a shot described the way a director says it.
 *
 *   ...cam.push({ on: [0, 1.5, 0], dist: 3, to: 2.3, yaw: 20 })
 *
 * Every recipe MOVES. That is the point: a fast-cut film dies on a locked-off
 * frame, and a hand-typed from/to pair is where still frames and typos come from.
 *
 * Angles are degrees.
 *   yaw   — where the camera stands around the subject. 0 = on the +Z side,
 *           looking back at it (the front of an actor whose rotationY is 0).
 *           90 = on the +X side. 180 = behind.
 *   pitch — how high. 0 = level with the look point, 30 = above looking down,
 *           -20 = below looking up (a hero angle).
 *
 * Spread the result into a shot. Add `note`, and `stage` in a story scene.
 */

type Move = Pick<
  Shot,
  "from" | "to" | "path" | "target" | "targetTo" | "fov" | "fovTo" | "roll" | "rollTo" | "ease" | "screenOffset"
>;

const RAD = Math.PI / 180;

/** A point `dist` metres from `on`, at the given yaw/pitch. */
export function around(on: Vec3, dist: number, yaw = 0, pitch = 0): Vec3 {
  const y = yaw * RAD;
  const p = pitch * RAD;
  return [
    round(on[0] + dist * Math.sin(y) * Math.cos(p)),
    round(on[1] + dist * Math.sin(p)),
    round(on[2] + dist * Math.cos(y) * Math.cos(p)),
  ];
}

const round = (n: number) => Math.round(n * 1000) / 1000;
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

type Framing = {
  /** The point the lens looks at: usually a chest (y≈1.25), a face (y≈1.55) or a prop. */
  on: Vec3;
  /** Metres from the look point when the shot opens. */
  dist: number;
  yaw?: number;
  pitch?: number;
  /** Vertical field of view. Default 40. Close-ups 30–36, wides 48–58. */
  fov?: number;
  /** Normalized 9:16 screen offset `[x, y]` (positive `y` moves subject up above captions). */
  screenOffset?: [number, number];
};

export const cam = {
  /** Minimum distance (metres) so a subject of `heightMetres` fits cleanly inside `fillRatio` of the 9:16 height. */
  fitHeight(heightMetres: number, fov = 42, fillRatio = 0.72): number {
    const span = heightMetres / Math.max(0.1, fillRatio);
    return round(span / (2 * Math.tan((fov * RAD) / 2)));
  },

  /** Dolly in (to < dist) or pull out (to > dist) along the lens axis. Smooth `inOutSine` curve matches classic 20k-hit camera flow. */
  push(o: Framing & { to: number; onTo?: Vec3; fovTo?: number; ease?: Shot["ease"] }): Move {
    return {
      from: around(o.on, o.dist, o.yaw, o.pitch),
      to: around(o.onTo ?? o.on, o.to, o.yaw, o.pitch),
      target: o.on,
      ...(o.onTo ? { targetTo: o.onTo } : {}),
      fov: o.fov ?? 40,
      ...(o.fovTo ? { fovTo: o.fovTo } : {}),
      ...(o.screenOffset ? { screenOffset: o.screenOffset } : {}),
      ease: o.ease ?? "inOutSine",
    };
  },

  /** Swing around the subject. yawTo/pitchTo/distTo are where the arc ends. */
  orbit(o: Framing & { yawTo: number; pitchTo?: number; distTo?: number; onTo?: Vec3; ease?: Shot["ease"] }): Move {
    const steps = 5;
    const path: Vec3[] = [];
    for (let i = 0; i < steps; i++) {
      const k = i / (steps - 1);
      const on: Vec3 = o.onTo
        ? [lerp(o.on[0], o.onTo[0], k), lerp(o.on[1], o.onTo[1], k), lerp(o.on[2], o.onTo[2], k)]
        : o.on;
      path.push(
        around(
          on,
          lerp(o.dist, o.distTo ?? o.dist, k),
          lerp(o.yaw ?? 0, o.yawTo, k),
          lerp(o.pitch ?? 0, o.pitchTo ?? o.pitch ?? 0, k),
        ),
      );
    }
    return {
      from: path[0],
      path,
      target: o.on,
      ...(o.onTo ? { targetTo: o.onTo } : {}),
      fov: o.fov ?? 40,
      ...(o.screenOffset ? { screenOffset: o.screenOffset } : {}),
      ease: o.ease ?? "inOutSine",
    };
  },

  /** The camera stays put and the look sweeps from one thing to another. */
  pan(o: { from: Vec3; on: Vec3; onTo: Vec3; fov?: number; fovTo?: number; screenOffset?: [number, number]; ease?: Shot["ease"] }): Move {
    return {
      from: o.from,
      target: o.on,
      targetTo: o.onTo,
      fov: o.fov ?? 40,
      ...(o.fovTo ? { fovTo: o.fovTo } : {}),
      ...(o.screenOffset ? { screenOffset: o.screenOffset } : {}),
      ease: o.ease ?? "inOutSine",
    };
  },

  /**
   * Fast snappy whip-pan (`outExpo` speed ramp) for comedy turns, reveals, and reaction snaps.
   * Keep `dur <= 0.85s` (or split with `cut:`) for the sharpest whips; longer shots receive
   * `Camera.tsx` follow-through drift (or prefer `cam.pan` for `>0.95s` sweeps).
   */
  whip(o: { from: Vec3; on: Vec3; onTo: Vec3; fov?: number; fovTo?: number; screenOffset?: [number, number]; ease?: Shot["ease"] }): Move {
    return {
      from: o.from,
      target: o.on,
      targetTo: o.onTo,
      fov: o.fov ?? 40,
      ...(o.fovTo ? { fovTo: o.fovTo } : {}),
      ...(o.screenOffset ? { screenOffset: o.screenOffset } : {}),
      ease: o.ease ?? "outExpo",
    };
  },

  /**
   * Hitchcock / Vertigo dolly-zoom: moves distance (`dist` → `to`) while compensating `fov` so the
   * subject stays the same height on the phone screen while the background dramatically warps.
   */
  dollyZoom(o: Framing & { to: number; ease?: Shot["ease"] }): Move {
    const fov = o.fov ?? 40;
    const halfH = o.dist * Math.tan((fov * RAD) / 2);
    const fovTo = round(clampFov((2 * Math.atan(halfH / Math.max(0.4, o.to))) / RAD));
    return {
      from: around(o.on, o.dist, o.yaw, o.pitch),
      to: around(o.on, o.to, o.yaw, o.pitch),
      target: o.on,
      fov,
      fovTo,
      ...(o.screenOffset ? { screenOffset: o.screenOffset } : {}),
      ease: o.ease ?? "inOutCubic",
    };
  },

  /** Vertical crane up or down (e.g. from a kid's shoes up to a 2.9 m Enderman's eyes). */
  crane(o: {
    on: Vec3;
    onTo?: Vec3;
    dist: number;
    toDist?: number;
    yaw?: number;
    fromPitch: number;
    toPitch: number;
    fov?: number;
    screenOffset?: [number, number];
    ease?: Shot["ease"];
  }): Move {
    const dest = o.onTo ?? o.on;
    return {
      from: around(o.on, o.dist, o.yaw ?? 0, o.fromPitch),
      to: around(dest, o.toDist ?? o.dist, o.yaw ?? 0, o.toPitch),
      target: o.on,
      ...(o.onTo ? { targetTo: o.onTo } : {}),
      fov: o.fov ?? 40,
      ...(o.screenOffset ? { screenOffset: o.screenOffset } : {}),
      ease: o.ease ?? "inOutSine",
    };
  },

  /**
   * Over-the-shoulder framing tuned for the narrow 9:16 phone slit: keeps `speaker` cleanly off-axis
   * at the edge of frame while aiming at `listener` with dynamic push-in and rule-of-thirds headroom.
   */
  ots(o: {
    speaker: Vec3;
    listener: Vec3;
    side?: -1 | 1;
    back?: number;
    push?: number;
    height?: number;
    fov?: number;
    ease?: Shot["ease"];
  }): Move {
    const dx = o.listener[0] - o.speaker[0];
    const dz = o.listener[2] - o.speaker[2];
    const len = Math.hypot(dx, dz) || 1;
    const nx = dx / len;
    const nz = dz / len;
    const side = o.side ?? 1;
    const rx = -nz * side;
    const rz = nx * side;
    const back = o.back ?? 1.85;
    const push = o.push ?? 0.72;
    const h = o.height ?? 0.14;
    const lat = 0.62;
    return {
      from: [
        round(o.speaker[0] - nx * back + rx * lat),
        round(o.speaker[1] + h),
        round(o.speaker[2] - nz * back + rz * lat),
      ],
      to: [
        round(o.speaker[0] - nx * (back - push) + rx * (lat * 0.88)),
        round(o.speaker[1] + h),
        round(o.speaker[2] - nz * (back - push) + rz * (lat * 0.88)),
      ],
      target: o.listener,
      fov: o.fov ?? 40,
      screenOffset: [0, 0.06],
      ease: o.ease ?? "inOutSine",
    };
  },

  /** Camera and look point slide together by `by`: linear default matches steady walking/running speed. */
  truck(o: Framing & { by: Vec3; ease?: Shot["ease"] }): Move {
    const from = around(o.on, o.dist, o.yaw, o.pitch);
    return {
      from,
      to: [round(from[0] + o.by[0]), round(from[1] + o.by[1]), round(from[2] + o.by[2])],
      target: o.on,
      targetTo: [round(o.on[0] + o.by[0]), round(o.on[1] + o.by[1]), round(o.on[2] + o.by[2])],
      fov: o.fov ?? 40,
      ...(o.screenOffset ? { screenOffset: o.screenOffset } : {}),
      ease: o.ease ?? "linear",
    };
  },

  /** Straight down on a thing on the floor. `spin` (degrees) turns the frame as it rises or sinks. */
  top(o: { on: Vec3; height: number; to: number; spin?: [number, number]; fov?: number; ease?: Shot["ease"] }): Move {
    // A hair off vertical so the camera always knows which way is up.
    const at = (h: number): Vec3 => [o.on[0], round(o.on[1] + h), round(o.on[2] + h * 0.02)];
    return {
      from: at(o.height),
      to: at(o.to),
      target: o.on,
      fov: o.fov ?? 40,
      ...(o.spin ? { roll: o.spin[0] * RAD, rollTo: o.spin[1] * RAD } : {}),
      ease: o.ease ?? "inOutSine",
    };
  },
};

const clampFov = (deg: number) => Math.max(18, Math.min(85, deg));
