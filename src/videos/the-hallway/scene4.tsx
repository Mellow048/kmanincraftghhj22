import { defineScene, useWalkPath } from "../../engine";
import type { Vec3 } from "../../engine";
import { Figure, Kid } from "./actors";

/**
 * BEAT 04 — THE LONG HALL (0:11.6–0:15.4)
 * The hand-off is continuous: the same camera, the same boy, the same mark.
 * He keeps walking, slowly, because he can see what is under the lamp. The
 * camera follows, overtakes him, and leaves him at the edge of the frame as
 * the figure resolves out of the dark.
 */
const BOY_PATH: Vec3[] = [
  [1.72, 0, 4.35],
  [1.74, 0, 5.2],
  [1.76, 0, 6.1],
];

export const scene4 = defineScene({
  id: "scene4",
  title: "The Long Hall",
  duration: 3.8,
  shots: [
    {
      at: 0,
      dur: 3.8,
      from: [0.9, 1.5, -1.0],
      path: [
        [0.9, 1.5, -1.0],
        [0.98, 1.5, -0.2],
        [1.25, 1.51, 0.7],
        [1.55, 1.52, 1.6],
        [1.72, 1.53, 2.5],
        [1.75, 1.51, 3.3],
        [1.45, 1.49, 4.2],
        [1.0, 1.48, 5.1],
        [0.4, 1.46, 6.2],
      ],
      target: [1.72, 1.25, 4.35],
      targetPath: [
        [1.72, 1.25, 4.35],
        [1.74, 1.22, 4.9],
        [1.76, 1.18, 5.5],
        [1.3, 1.12, 6.9],
        [0.55, 1.08, 8.6],
        [0.0, 1.05, 10.15],
      ],
      fov: 42,
      fovTo: 40,
      ease: "inOutSine",
      handheld: 0.005,
      note: "Follow him down the hall until the figure under the lamp takes the frame away from him. The boy slows because he has already seen it.",
    },
  ],
  Component: () => {
    const walk = useWalkPath({ points: BOY_PATH, duration: 3.8, delay: 0.3, ease: "inOutSine" });
    return (
      <>
        <Kid
          face="scared"
          position={walk.position}
          rotationY={walk.yaw}
          animation="creep"
          animDistance={walk.distance}
          lookAt={[-0.3, 1.5, 10.15]}
          headPitch={0.12}
          headYaw={walk.headYaw}
          blink
          shadow
        />
        <Figure />
      </>
    );
  },
});
