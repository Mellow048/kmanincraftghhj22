import { clamp01, defineScene, usePerformance, useTime, useWalkPath } from "../../engine";
import type { Vec3 } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 03 — HE GETS UP (0:06.8–0:11.6)
 * The boy stands, crosses the room and walks out through the doorway. This is
 * the first real locomotion in the film: the legs are driven by ground distance,
 * not the clock, so his feet land where the floor actually is.
 *
 * The camera does not turn around. It stays behind him and backs through the
 * doorway, so he walks away from us, out of the room and into the corridor,
 * and the last thing in the frame is the back of his head against the long
 * dark hall.
 */
const KID_PATH: Vec3[] = [
  [-1.8, 0, -1.35],
  [-1.62, 0, -0.35],
  [-1.0, 0, 0.8],
  [-0.2, 0, 1.85],
  [0.6, 0, 2.45],
  [1.32, 0, 2.7],
  [1.55, 0, 3.05],
  [1.62, 0, 3.6],
  [1.72, 0, 4.35],
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
      to: [0.5, 1.5, 0.7],
      target: [1.6, 1.5, 3.05],
      targetTo: [-1.8, 1.2, -1.35],
      fov: 42,
      fovTo: 44,
      ease: "inOutCubic",
      note: "Turn off the door and push in on the boy as he gets up. The camera moves first and he follows it with his whole body.",
    },
    {
      at: 1.6,
      dur: 3.2,
      from: [0.5, 1.5, 0.7],
      path: [
        [0.5, 1.5, 0.7],
        [1.0, 1.52, 1.5],
        [1.35, 1.54, 2.15],
        [1.5, 1.55, 2.6],
      ],
      target: [-1.8, 1.2, -1.35],
      targetPath: [
        [-1.8, 1.15, -1.35],
        [-1.2, 1.15, 0.4],
        [-0.2, 1.12, 1.8],
        [0.8, 1.1, 3.2],
        [1.0, 1.05, 5.5],
        [0.4, 1.0, 8.5],
      ],
      fov: 44,
      fovTo: 42,
      ease: "inOutSine",
      note: "Stay behind him and back through the doorway as he walks out, so the last thing we see is his back against the long dark hall.",
    },
  ],
  Component: () => {
    const t = useTime();
    const walk = useWalkPath({ points: KID_PATH, duration: 4.8, delay: 1.1, ease: "inOutSine" });
    const perf = usePerformance([
      { at: 0, clip: "sit", blend: 0 },
      { at: 0.25, clip: "standUp", blend: 0.35 },
      { at: 1.1, clip: "walk", blend: 0.4 },
    ]);
    const scared = clamp01((t - 2.6) / 1.4);
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
        headYaw={walk.headYaw + 0.1 * (1 - scared)}
        headPitch={0.06}
      />
    );
  },
});
