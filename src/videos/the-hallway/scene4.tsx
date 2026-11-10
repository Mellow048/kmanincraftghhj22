import { defineScene } from "../../engine";
import { Figure, Kid } from "./actors";

/**
 * BEAT 04 — THE LONG HALL (0:11.6–0:15.4)
 * One unbroken flight. The camera leaves the boy in the doorway, slides down
 * the corridor past the wheelchair, the wet floor and the fire exit, and lands
 * on the figure standing at the end of the hall. The reveal is the distance.
 */
export const scene4 = defineScene({
  id: "scene4",
  title: "The Long Hall",
  duration: 3.8,
  shots: [
    {
      at: 0,
      dur: 3.8,
      from: [0.3, 1.48, 5.6],
      path: [
        [0.3, 1.48, 5.6],
        [0.29, 1.47, 6.0],
        [0.28, 1.46, 6.3],
        [0.27, 1.45, 6.55],
        [0.26, 1.44, 6.7],
      ],
      target: [1.5, 1.15, 3.3],
      targetPath: [
        [1.5, 1.15, 3.3],
        [1.3, 1.28, 4.6],
        [0.6, 1.3, 6.8],
        [0.3, 1.25, 10.15],
      ],
      fov: 42,
      fovTo: 38,
      ease: "inOutSine",
      handheld: 0.005,
      note: "Leave the boy in the doorway and fly the corridor. Every prop on the way is a reason to keep looking, and the figure is waiting at the end of it.",
    },
  ],
  Component: () => (
    <>
      <Kid face="scared" position={[1.5, 0, 3.3]} rotationY={0.1} headYaw={0.2} headPitch={0.12} animation="idle" />
      <Figure />
    </>
  ),
});
