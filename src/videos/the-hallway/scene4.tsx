import { defineScene } from "../../engine";
import { Figure, Kid } from "./actors";

/**
 * BEAT 04 — THE LONG HALL (0:11.6–0:15.4)
 * One unbroken flight that begins exactly where scene 3 stopped: inside the
 * ward doorway, behind the boy, looking down the hall. The camera passes him
 * and keeps going, so the cut is a hand-off rather than a teleport.
 */
export const scene4 = defineScene({
  id: "scene4",
  title: "The Long Hall",
  duration: 3.8,
  shots: [
    {
      at: 0,
      dur: 3.8,
      from: [1.5, 1.55, 2.6],
      path: [
        [1.5, 1.55, 2.6],
        [1.35, 1.53, 3.15],
        [1.0, 1.51, 3.9],
        [0.75, 1.49, 4.7],
        [0.55, 1.47, 5.5],
        [0.4, 1.46, 6.2],
      ],
      target: [0.4, 1.0, 8.5],
      targetPath: [
        [0.4, 1.0, 8.5],
        [0.45, 1.02, 9.0],
        [0.38, 1.04, 9.6],
        [0.3, 1.05, 10.15],
      ],
      fov: 42,
      fovTo: 40,
      ease: "inOutSine",
      handheld: 0.005,
      note: "Take the boy's eyeline and walk it: through the doorway, past the wet floor, down the long hall to the figure waiting under the lamp.",
    },
  ],
  Component: () => (
    <>
      <Kid
        face="scared"
        position={[1.72, 0, 4.35]}
        rotationY={0.15}
        lookAt={[0.3, 1.5, 10.15]}
        headPitch={0.12}
        animation="idle"
      />
      <Figure />
    </>
  ),
});
