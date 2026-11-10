import { ContactShadow, defineScene } from "../../engine";
import { Figure, Kid } from "./actors";

/**
 * BEAT 02 — THROUGH THE DOOR (0:03–0:07)
 * One unbroken flight. The camera leaves the boy, crosses the threshold and
 * follows the red runner until the figure is standing at the end of the hall.
 * No cut: the hallway is the same physical world as the room.
 */
export const scene2 = defineScene({
  id: "scene2",
  title: "Through the Door",
  duration: 4.0,
  shots: [
    {
      at: 0,
      dur: 4.0,
      from: [0.9, 1.6, 1.82],
      path: [
        [0.9, 1.6, 1.82],
        [1.2, 1.58, 2.3],
        [1.55, 1.55, 2.95],
        [1.45, 1.52, 3.6],
        [1.05, 1.49, 4.3],
        [0.6, 1.47, 4.8],
        [0.25, 1.45, 5.2],
      ],
      target: [-1.8, 1.37, -0.72],
      targetPath: [
        [-1.8, 1.37, -0.72],
        [-0.8, 1.4, 0.8],
        [1.5, 1.65, 2.95],
        [0.8, 1.55, 4.8],
        [0.5, 1.4, 7.0],
        [0.3, 1.2, 10.15],
      ],
      fov: 45,
      fovTo: 38,
      ease: "inOutSine",
      note: "Leave the boy, physically pass through the doorway and follow the corridor until the figure is revealed. The reveal is the distance, not a cut.",
    },
  ],
  Component: () => (
    <>
      <Kid face="worried" headYaw={0.95} headPitch={0.04} />
      <Figure />
      <ContactShadow position={[0.3, 0.013, 10.15]} width={1.5} depth={0.75} opacity={0.55} />
    </>
  ),
});
