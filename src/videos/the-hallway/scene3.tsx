import { clamp01, defineScene, usePerformance, useTime, useWalkPath } from "../../engine";
import type { Vec3 } from "../../engine";
import { Kid } from "./actors";

/**
 * BEAT 03 — HE GETS UP (0:06.8–0:11.6)
 * The boy stands, crosses the room and walks out through the doorway. This is
 * the first real locomotion in the film: the legs are driven by ground distance,
 * not the clock, so his feet land where the floor actually is.
 *
 * Two shots, cut on his exit. The first holds the bed as he stands and walks
 * towards the lens; the second picks him up from inside the doorway as he
 * passes through, so the walk itself is never a cropped back filling the frame.
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
      dur: 2.7,
      from: [1.15, 1.55, 2.0],
      to: [0.95, 1.52, 1.7],
      target: [1.6, 1.5, 3.05],
      targetTo: [-1.8, 1.2, -1.35],
      fov: 42,
      fovTo: 44,
      ease: "inOutCubic",
      note: "Turn off the door and find the boy on the bed. The camera moves first and he follows it with his whole body, so standing up becomes the cut.",
    },
    {
      at: 2.7,
      dur: 2.1,
      from: [0.9, 1.5, 0.15],
      target: [1.55, 1.3, 3.2],
      targetPath: [
        [1.55, 1.3, 3.2],
        [1.56, 1.3, 3.35],
        [1.62, 1.26, 3.75],
        [1.68, 1.21, 4.15],
        [1.72, 1.2, 4.35],
      ],
      fov: 42,
      ease: "inOutSine",
      note: "From inside the doorway, pick him up as he comes through and hold on his back. The walk-out happens at full body height, not as a shoulder across the lens.",
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
