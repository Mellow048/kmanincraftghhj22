import { clamp01, defineScene, usePerformance, useTime, useWalkPath } from "../../engine";
import type { Vec3 } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 03 — HE GETS UP (0:07.2–0:11.6)
 * The boy stands, crosses the room and walks out through the doorway. This is
 * the first real locomotion in the film: the legs are driven by ground distance,
 * not the clock, so his feet land where the floor actually is.
 */
const KID_PATH: Vec3[] = [
  [-1.8, 0, -0.72],
  [-1.75, 0, 0.2],
  [-1.2, 0, 1.3],
  [-0.2, 0, 2.2],
  [0.9, 0, 2.8],
  [1.55, 0, 3.15],
  [1.6, 0, 3.5],
];

export const scene3 = defineScene({
  id: "scene3",
  title: "He Gets Up",
  duration: 4.4,
  shots: [
    {
      at: 0,
      dur: 1.2,
      from: [1.15, 1.55, 2.0],
      to: [0.6, 1.5, 1.3],
      target: [1.6, 1.5, 3.05],
      targetTo: [-1.8, 1.05, -0.72],
      fov: 42,
      fovTo: 44,
      ease: "inOutCubic",
      note: "Turn off the door and push in on the boy as he gets up. The camera moves first and he follows it with his whole body.",
    },
    {
      at: 1.2,
      dur: 3.2,
      from: [0.6, 1.5, 1.3],
      path: [
        [0.6, 1.5, 1.3],
        [0.9, 1.49, 2.2],
        [1.5, 1.48, 2.9],
        [1.5, 1.48, 3.6],
        [1.1, 1.48, 4.1],
      ],
      target: [-1.8, 1.05, -0.72],
      targetPath: [
        [-1.8, 1.05, -0.72],
        [-1.5, 1.05, 0.6],
        [-0.4, 1.05, 2.0],
        [0.9, 1.05, 2.9],
        [1.6, 1.05, 3.5],
      ],
      fov: 44,
      fovTo: 42,
      ease: "inOutSine",
      note: "Lead him through the doorway and out into the hall. He walks, the camera walks, and the threshold is crossed without a cut.",
    },
  ],
  Component: () => {
    const t = useTime();
    const walk = useWalkPath({ points: KID_PATH, duration: 4.4, delay: 1.0, ease: "linear" });
    const perf = usePerformance([
      { at: 0, clip: "sit", blend: 0 },
      { at: 0.3, clip: "standUp", blend: 0.35 },
      { at: 1.0, clip: "walk", blend: 0.4 },
    ]);
    const scared = clamp01((t - 2.6) / 1.2);
    return (
      <Kid
        face={scared > 0.5 ? "scared" : "worried"}
        animation={perf.clip}
        blendTo={perf.blendTo ?? undefined}
        blend={perf.blendK}
        blendTime={perf.prevLocal ?? undefined}
        animDistance={walk.distance}
        position={walk.position}
        rotationY={walk.yaw}
        headYaw={0.15 * (1 - scared)}
        headPitch={0.06}
      />
    );
  },
});
