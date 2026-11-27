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

  /** Minimum distance (metres) so a horizontal span (two actors or 3D text/sign) fits cleanly inside the narrow 9:16 width. */
  fitWidth(widthMetres: number, fov = 44, fillRatio = 0.82): number {
    const span = widthMetres / Math.max(0.1, fillRatio);
    return round(span / (2 * Math.tan((fov * RAD) / 2) * (9 / 16)));
  },

  /**
   * Facing-aware 3/4 FRONT push shot. Pass the actor's feet `actor` and `facing` (`rotationY` in radians)
   * so the camera ALWAYS shoots their face/front instead of the back of their head, at a phone-safe 9:16 distance.
   */
  front(o: {
    actor: Vec3;
    /** Actor's `rotationY` in radians (0 = +Z, Math.PI = -Z). */
    facing?: number;
    /** Height above actor's feet to aim at. Default 1.25 (chest/face). */
    height?: number;
    /** Start distance in metres. Default 4.6 (20k-hit sweet spot). */
    dist?: number;
    /** End distance in metres. Default 3.9. */
    to?: number;
    /** Degrees off the actor's front nose axis (3/4 angle). Default 18. */
    side?: number;
    pitch?: number;
    fov?: number;
    screenOffset?: [number, number];
    ease?: Shot["ease"];
  }): Move {
    const on: Vec3 = [o.actor[0], round(o.actor[1] + (o.height ?? 1.25)), o.actor[2]];
    const yaw = round(((o.facing ?? 0) / RAD) + (o.side ?? 18));
    const dist = o.dist ?? 6.2;
    const to = o.to ?? round(Math.max(4.4, dist - 1.0));
    return cam.push({
      on,
      dist,
      to,
      yaw,
      pitch: o.pitch ?? 6,
      fov: o.fov ?? 44,
      ...(o.screenOffset ? { screenOffset: o.screenOffset } : {}),
      ease: o.ease ?? "inOutSine",
    });
  },

  /**
   * Auto-fitted 9:16 two-shot (two actors, or an actor + 3D sign/prop). Computes the minimum safe distance
   * via `fitWidth` so neither subject nor 3D text gets cropped off the narrow 9:16 edges.
   */
  twoShot(o: {
    a: Vec3;
    b: Vec3;
    /** Optional facing angle in radians for the front side of the pair (default: perpendicular front). */
    facing?: number;
    height?: number;
    /** Extra margin beyond auto-fitted distance. */
    dist?: number;
    to?: number;
    side?: number;
    pitch?: number;
    fov?: number;
    screenOffset?: [number, number];
    ease?: Shot["ease"];
  }): Move {
    const fov = o.fov ?? 46;
    const mid: Vec3 = [
      round((o.a[0] + o.b[0]) / 2),
      round((o.a[1] + o.b[1]) / 2 + (o.height ?? 1.25)),
      round((o.a[2] + o.b[2]) / 2),
    ];
    const sep = Math.hypot(o.b[0] - o.a[0], o.b[2] - o.a[2]);
    const minSafe = Math.max(4.4, cam.fitWidth(sep + 1.15, fov, 0.84));
    const dist = Math.max(minSafe, o.dist ?? round(minSafe + 0.6));
    const to = Math.max(minSafe * 0.9, o.to ?? round(dist - 0.7));
    const baseYaw =
      o.facing !== undefined
        ? o.facing / RAD
        : Math.atan2(-(o.b[2] - o.a[2]), o.b[0] - o.a[0]) / RAD;
    return cam.push({
      on: mid,
      dist,
      to,
      yaw: round(baseYaw + (o.side ?? 14)),
      pitch: o.pitch ?? 8,
      fov,
      ...(o.screenOffset ? { screenOffset: o.screenOffset } : {}),
      ease: o.ease ?? "inOutSine",
    });
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
    const back = o.back ?? 2.35;
    const push = o.push ?? 0.72;
    const h = o.height ?? 0.22;
    const lat = 0.85;
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
      fov: o.fov ?? 44,
      screenOffset: [0, 0.04],
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

  /**
   * True tracking shot alongside a walking/running character from `from` to `to`.
   * Glides smoothly down a street or path so motion reads like a real animated film.
   */
  track(o: {
    from: Vec3;
    to: Vec3;
    sideDist?: number;
    side?: -1 | 1;
    height?: number;
    lead?: number;
    fov?: number;
    ease?: Shot["ease"];
  }): Move {
    const dx = o.to[0] - o.from[0];
    const dz = o.to[2] - o.from[2];
    const len = Math.hypot(dx, dz) || 1;
    const ux = dx / len;
    const uz = dz / len;
    const side = o.side ?? 1;
    const sd = o.sideDist ?? 5.8;
    const lead = o.lead ?? 1.8;
    const h = o.height ?? 1.65;
    const px = -uz * sd * side + ux * lead;
    const pz = ux * sd * side + uz * lead;
    return {
      from: [round(o.from[0] + px), round(o.from[1] + h), round(o.from[2] + pz)],
      to: [round(o.to[0] + px), round(o.to[1] + h), round(o.to[2] + pz)],
      target: [round(o.from[0]), round(o.from[1] + 1.25), round(o.from[2])],
      targetTo: [round(o.to[0]), round(o.to[1] + 1.25), round(o.to[2])],
      fov: o.fov ?? 44,
      ease: o.ease ?? "inOutSine",
    };
  },

  /**
   * Dramatic parallax orbit sweep (default 34° arc) around a subject or prop.
   * Shifts background houses, trees, and sky visibly so the camera feels alive.
   */
  sweep(o: {
    on: Vec3;
    dist?: number;
    distTo?: number;
    fromYaw?: number;
    toYaw?: number;
    pitch?: number;
    fov?: number;
    ease?: Shot["ease"];
  }): Move {
    const dist = o.dist ?? 6.4;
    const fromYaw = o.fromYaw ?? -18;
    const toYaw = o.toYaw ?? 16;
    return cam.orbit({
      on: o.on,
      dist,
      distTo: o.distTo ?? round(Math.max(4.8, dist - 0.8)),
      yaw: fromYaw,
      yawTo: toYaw,
      pitch: o.pitch ?? 8,
      fov: o.fov ?? 44,
      ease: o.ease ?? "inOutSine",
    });
  },

  /**
   * Low-angle dramatic upward tilt for towering monsters, statues, or villains.
   */
  heroLow(o: {
    on: Vec3;
    dist?: number;
    yaw?: number;
    fov?: number;
    ease?: Shot["ease"];
  }): Move {
    const dist = o.dist ?? 6.2;
    return cam.orbit({
      on: [o.on[0], round(o.on[1] + 1.5), o.on[2]],
      dist,
      distTo: round(Math.max(4.6, dist - 1.1)),
      yaw: o.yaw ?? -12,
      yawTo: (o.yaw ?? -12) + 14,
      pitch: -12,
      pitchTo: -4,
      fov: o.fov ?? 46,
      ease: o.ease ?? "inOutSine",
    });
  },

  /**
   * High crane / aerial sweep looking down a full village street or crowd.
   */
  streetOverview(o: {
    from: Vec3;
    to: Vec3;
    height?: number;
    fov?: number;
    ease?: Shot["ease"];
  }): Move {
    const h = o.height ?? 6.5;
    return {
      from: [round(o.from[0]), round(o.from[1] + h), round(o.from[2])],
      to: [round(o.to[0]), round(o.to[1] + Math.max(2.6, h - 2.4)), round(o.to[2])],
      target: [round(o.from[0]), round(o.from[1] + 1.1), round(o.from[2] - 8)],
      targetTo: [round(o.to[0]), round(o.to[1] + 1.1), round(o.to[2] - 6)],
      fov: o.fov ?? 48,
      ease: o.ease ?? "inOutSine",
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
