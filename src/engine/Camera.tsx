import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";
import { clamp01, easings, wobble } from "./math";
import type { Vec3 } from "./math";
import type { Shot } from "./types";

/**
 * Drives the render camera from a list of SHOTS.
 *
 * One `<Camera>` per scene. Each shot owns a time window, so hard cuts inside a
 * scene are explicit and reviewable. Between scenes the camera simply keeps its
 * last transform, which is how a continuous fly-through can carry across a cut.
 */

function pathCurve(points: Vec3[]): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
    false,
    "centripetal",
    0.5,
  );
}

function samplePath(
  path: Vec3[] | undefined,
  a: Vec3,
  b: Vec3 | undefined,
  e: number,
  arc: number,
): THREE.Vector3 {
  if (path && path.length >= 2) {
    return pathCurve(path).getPointAt(clamp01(e));
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

function pickShot(shots: Shot[], t: number): Shot {
  let active = shots[0];
  for (const shot of shots) {
    if (shot.at <= t + 1e-6) active = shot;
  }
  return active;
}

export const Camera: React.FC<{ shots: Shot[]; duration: number; sceneId?: string }> = ({
  shots,
  duration,
  sceneId,
}) => {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const shot = pickShot(shots, t);
  const p = clamp01((t - shot.at) / Math.max(shot.dur, 1e-6));
  const e = easings[shot.ease ?? "inOutCubic"](p);

  // Camera position
  const position = samplePath(shot.path, shot.from, shot.to, e, shot.arc ?? 0);

  // Where it looks
  const target = samplePath(shot.targetPath, shot.target, shot.targetTo, e, 0);
  target.y += shot.aim ?? 0;

  // Handheld instability: deterministic, subtle, applied to both ends of the look ray.
  if (shot.shake && shot.shake > 0) {
    const amp = shot.shake;
    position.x += wobble(t * 7.1, 1) * amp;
    position.y += wobble(t * 6.3, 2) * amp * 0.7;
    position.z += wobble(t * 5.7, 3) * amp;
    target.x += wobble(t * 7.9, 4) * amp * 1.2;
    target.y += wobble(t * 8.3, 5) * amp * 0.9;
    target.z += wobble(t * 6.9, 6) * amp * 1.2;
  }

  const baseFov = shot.fov ?? 38;
  const fov = shot.fovTo != null ? baseFov + (shot.fovTo - baseFov) * e : baseFov;

  useFrame(() => {
    camera.position.copy(position);
    camera.up.set(0, 1, 0);
    camera.lookAt(target);
    if (shot.roll) camera.rotateZ(shot.roll);
    if (Math.abs(camera.fov - fov) > 1e-4) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });

  useEffect(() => {
    const last = shots[shots.length - 1];
    const end = last.at + last.dur;
    if (end < duration - 0.05) {
      console.warn(
        `[${sceneId ?? "scene"}] camera plan ends at ${end.toFixed(2)}s but the scene is ${duration.toFixed(2)}s. ` +
          `The last shot will hold. Add a shot or shorten the scene.`,
      );
    }
    for (let i = 1; i < shots.length; i++) {
      if (shots[i].at < shots[i - 1].at + shots[i - 1].dur - 0.001) {
        console.warn(`[${sceneId ?? "scene"}] shot ${i} overlaps shot ${i - 1}.`);
      }
    }
  }, [shots, duration, sceneId]);

  return null;
};
