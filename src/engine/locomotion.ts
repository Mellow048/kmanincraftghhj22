import { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { AnimName } from "./anim";
import { clamp01, easings, smoothstep } from "./math";
import type { EaseName, Vec3 } from "./math";

/**
 * Locomotion and performance helpers.
 *
 * `useWalkPath` moves an actor along a real curve and reports how far they have
 * travelled. Feed that distance into `MinecraftAvatar` and the legs are driven by
 * ground travel instead of the clock — the feet can no longer skate.
 *
 * `usePerformance` plays a list of clips in order, blending across the joins, so
 * a character can stand up, walk, stop and look around without pose pops.
 */

export type WalkPathOptions = {
  points: Vec3[];
  /** Seconds the whole travel takes, including delay and tail. */
  duration: number;
  ease?: EaseName;
  /** Fixed facing yaw in radians. Default: face along the direction of travel. */
  yaw?: number;
  /** Seconds to hold at the start before moving. */
  delay?: number;
  /** Seconds to hold at the end after arriving. */
  tail?: number;
  /** Vertical bow in metres, for a gentle rise/fall over the move. */
  arc?: number;
};

export type WalkState = {
  position: Vec3;
  yaw: number;
  /** Metres travelled so far. Feed to the avatar's `animDistance`. */
  distance: number;
  /** Instantaneous ground speed in m/s. */
  speed: number;
  /** 0..1 along the whole walk. */
  progress: number;
  moving: boolean;
};

type Sample = { point: THREE.Vector3; tangent: THREE.Vector3; arc: number };

function buildSamples(points: Vec3[], segments: number): { samples: Sample[]; total: number } {
  const curve =
    points.length === 2
      ? new THREE.LineCurve3(
          new THREE.Vector3(points[0][0], points[0][1], points[0][2]),
          new THREE.Vector3(points[1][0], points[1][1], points[1][2]),
        )
      : new THREE.CatmullRomCurve3(
          points.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
          false,
          "centripetal",
          0.5,
        );

  const samples: Sample[] = [];
  let total = 0;
  let prev = curve.getPoint(0);
  samples.push({ point: prev.clone(), tangent: new THREE.Vector3(0, 0, 1), arc: 0 });

  for (let i = 1; i <= segments; i++) {
    const u = i / segments;
    const point = curve.getPoint(u);
    total += point.distanceTo(prev);
    const tangent = point.clone().sub(prev);
    if (tangent.lengthSq() < 1e-10) tangent.set(0, 0, 1);
    tangent.normalize();
    samples.push({ point, tangent, arc: total });
    prev = point;
  }

  return { samples, total };
}

function sampleAt(samples: Sample[], total: number, arc: number): Sample {
  if (arc <= 0) return samples[0];
  if (arc >= total) return samples[samples.length - 1];
  let lo = 0;
  let hi = samples.length - 1;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (samples[mid].arc <= arc) lo = mid;
    else hi = mid;
  }
  const a = samples[lo];
  const b = samples[hi];
  const span = Math.max(b.arc - a.arc, 1e-6);
  const k = (arc - a.arc) / span;
  return {
    point: a.point.clone().lerp(b.point, k),
    tangent: a.tangent.clone().lerp(b.tangent, k).normalize(),
    arc,
  };
}

export function useWalkPath(options: WalkPathOptions): WalkState {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const { points, duration, ease = "inOutSine", yaw, delay = 0, tail = 0, arc = 0 } = options;

  const { samples, total } = useMemo(() => buildSamples(points, 480), [points]);

  return useMemo(() => {
    const travel = Math.max(1e-3, duration - delay - tail);
    const dt = 1 / Math.max(fps, 1);

    const evalAt = (time: number) => {
      const raw = clamp01((time - delay) / travel);
      const eased = easings[ease](raw);
      return { raw, eased, sample: sampleAt(samples, total, eased * total) };
    };

    const now = evalAt(t);
    const before = evalAt(t - dt);

    const moving = now.raw > 1e-4 && now.raw < 1 - 1e-4;
    const speed = moving ? Math.max(0, now.sample.arc - before.sample.arc) / dt : 0;

    const position: Vec3 = [
      now.sample.point.x,
      now.sample.point.y + (arc !== 0 ? Math.sin(Math.PI * now.eased) * arc : 0),
      now.sample.point.z,
    ];

    const facing = yaw !== undefined ? yaw : Math.atan2(now.sample.tangent.x, now.sample.tangent.z);

    return {
      position,
      yaw: facing,
      distance: now.sample.arc,
      speed,
      progress: now.eased,
      moving,
    };
  }, [samples, total, t, duration, delay, tail, ease, yaw, arc, fps]);
}

export type PerformanceStep = {
  /** Seconds into the scene when this clip starts. */
  at: number;
  clip: AnimName;
  /** Seconds of blend into this clip from the previous one. Default 0.18. */
  blend?: number;
  /** Clip speed multiplier. */
  speed?: number;
};

export type PerformanceState = {
  clip: AnimName;
  /** Local seconds inside the current clip. */
  local: number;
  /** Previous clip while blending, otherwise null. */
  blendTo: AnimName | null;
  /** 0 = previous pose, 1 = current pose. */
  blendK: number;
  /** Local seconds inside the previous clip, so a blend never snaps back to its start. */
  prevLocal: number | null;
  speed: number;
};

/**
 * Plays a list of clips in order. Every step is continuous in time, so blending
 * two poses never pops even when the previous clip was mid-stride.
 */
export function usePerformance(steps: PerformanceStep[]): PerformanceState {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return useMemo(() => {
    if (steps.length === 0) {
      return { clip: "idle" as AnimName, local: t, blendTo: null, blendK: 1, prevLocal: null, speed: 1 };
    }

    let index = 0;
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].at <= t + 1e-6) index = i;
    }

    const step = steps[index];
    const local = Math.max(0, t - step.at);
    const blend = step.blend ?? 0.18;
    const prev = index > 0 ? steps[index - 1] : undefined;

    if (prev && blend > 0 && local < blend) {
      return {
        clip: step.clip,
        local,
        blendTo: prev.clip,
        blendK: smoothstep(local / blend),
        prevLocal: Math.max(0, t - prev.at),
        speed: step.speed ?? 1,
      };
    }

    return { clip: step.clip, local, blendTo: null, blendK: 1, prevLocal: null, speed: step.speed ?? 1 };
  }, [steps, t]);
}
