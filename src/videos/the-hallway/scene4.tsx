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
        [0.95, 1.5, -0.3],
        [1.1, 1.51, 0.6],
        [1.35, 1.52, 1.6],
        [1.5, 1.53, 2.6],
        [1.4, 1.51, 3.4],
        [1.05, 1.49, 4.4],
        [0.75, 1.48, 5.3],
        [0.4, 1.46, 6.2],
      ],
      target: [1.72, 1.2, 4.35],
      targetPath: [
        [1.72, 1.2, 4.35],
        [1.62, 1.17, 4.9],
        [1.15, 1.13, 5.7],
        [0.65, 1.1, 6.9],
        [0.25, 1.07, 8.6],
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
