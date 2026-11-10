import { ContactShadow, defineScene, Glow } from "../../engine";
import { Figure, Kid } from "./actors";

/**
 * BEAT 04 — THROUGH THE DOOR (0:11–0:17)
 * Purpose: the signature Zack D transition. One continuous camera move leaves
 * the boy, crosses the threshold, and reveals what has been standing in the hall.
 * No cut. The hallway is the same physical world as the room.
 */
export const scene4 = defineScene({
  id: "scene4",
  title: "Through the Door",
  duration: 6.0,
  shots: [
    {
      at: 0,
      dur: 6.0,
      from: [1.15, 1.62, 1.5],
      path: [
        [1.15, 1.62, 1.5],
        [1.42, 1.6, 2.1],
        [1.62, 1.58, 2.9],
        [1.42, 1.55, 3.55],
        [0.95, 1.52, 4.4],
        [0.48, 1.49, 5.6],
        [0.22, 1.46, 6.2],
        [0.18, 1.43, 6.45],
      ],
      target: [1.65, 1.76, 2.98],
      targetPath: [
        [1.65, 1.76, 2.98],
        [1.3, 1.72, 4.4],
        [0.4, 1.55, 7.0],
        [0.1, 1.32, 9.4],
      ],
      fov: 38,
      fovTo: 42,
      ease: "inOutSine",
      note: "One unbroken flight: physically pass through the doorway, follow the corridor, and reveal The Figure that was always out there. Do not cut.",
    },
  ],
  Component: () => (
    <>
      <Kid face="scared" headYaw={0.9} headPitch={0.02} />
      <Figure />
      <ContactShadow position={[0.1, 0.013, 9.4]} width={1.5} depth={0.75} opacity={0.55} />
      <Glow position={[-0.005, 1.74, 9.08]} size={0.075} color="#eaf7ff" opacity={0.75} />
      <Glow position={[0.205, 1.74, 9.08]} size={0.075} color="#eaf7ff" opacity={0.75} />
    </>
  ),
});
