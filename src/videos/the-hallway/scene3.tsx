import { clamp01, defineScene, usePerformance, useTime, useWalkPath } from "../../engine";
import type { Vec3 } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 03 — HE GETS UP (0:06.8–0:11.6)
 * The boy stands, crosses the room and walks out into the corridor. This is the
 * first real locomotion in the film: the legs are driven by ground distance,
 * not the clock, so his feet land where the floor actually is. The camera backs
 * out through the doorway ahead of him and ends up looking back through the
 * open door, which frames him for the reveal.
 */
const KID_PATH: Vec3[] = [
  [-1.8, 0, -0.72],
  [-1.75, 0, 0.2],
  [-1.2, 0, 1.3],
  [-0.2, 0, 2.2],
  [0.9, 0, 2.8],
  [1.5, 0, 3.3],
];

export const scene3 = defineScene({
  id: "scene3",
  title: "He Gets Up",
  duration: 4.8,
  shots: [
    {
      at: 0,
      dur: 1.6,
      from: [1.15, 1.55, 2.0],
      to: [0.5, 1.5, 1.2],
      target: [1.6, 1.5, 3.05],
      targetTo: [-1.8, 1.15, -0.72],
      fov: 42,
      fovTo: 44,
      ease: "inOutCubic",
      note: "Turn off the door and push in on the boy as he gets up. The camera moves first and he follows it with his whole body.",
    },
    {
      at: 1.6,
      dur: 3.2,
      from: [0.5, 1.5, 1.2],
      path: [
        [0.5, 1.5, 1.2],
        [1.2, 1.5, 2.2],
        [1.55, 1.49, 3.2],
        [1.3, 1.48, 4.3],
        [0.7, 1.48, 5.6],
      ],
      target: [-1.8, 1.1, -0.72],
      targetPath: [
        [-1.8, 1.1, -0.72],
        [-1.2, 1.1, 0.6],
        [-0.2, 1.1, 2.0],
        [0.9, 1.1, 2.8],
        [1.5, 1.1, 3.3],
      ],
      fov: 44,
      fovTo: 42,
      ease: "inOutSine",
      note: "Back out through the doorway ahead of him and keep him framed in the open door. He walks, the camera walks, and the threshold is crossed without a cut.",
    },
  ],
  Component: () => {
    const t = useTime();
    const walk = useWalkPath({ points: KID_PATH, duration: 4.8, delay: 1.4, ease: "linear" });
    const perf = usePerformance([
      { at: 0, clip: "sit", blend: 0 },
      { at: 0.3, clip: "standUp", blend: 0.35 },
      { at: 1.4, clip: "walk", blend: 0.4 },
    ]);
    const scared = clamp01((t - 2.8) / 1.2);
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
