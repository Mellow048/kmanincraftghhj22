import { defineScene } from "../../engine";
import { Figure, Kid } from "./actors";

/**
 * BEAT 04 — THE LONG HALL (0:11.6–0:15.4)
 * One unbroken flight that begins exactly where scene 3 stopped: inside the
 * doorway, behind the boy, looking down the hall. The camera passes him,
 * keeps going, and the figure resolves out of the dark at the far end.
 */
export const scene4 = defineScene({
  id: "scene4",
  title: "The Long Hall",
  duration: 3.8,
  shots: [
    {
      at: 0,
      dur: 3.8,
      from: [0.9, 1.5, 0.15],
      path: [
        [0.9, 1.5, 0.15],
        [1.05, 1.51, 0.8],
        [1.3, 1.52, 1.7],
        [1.45, 1.53, 2.5],
        [1.38, 1.51, 3.2],
        [1.05, 1.49, 4.0],
        [0.75, 1.48, 4.8],
        [0.55, 1.47, 5.5],
        [0.4, 1.46, 6.2],
      ],
      target: [1.72, 1.2, 4.35],
      targetPath: [
        [1.72, 1.2, 4.35],
        [1.6, 1.18, 4.9],
        [1.3, 1.15, 5.6],
        [0.9, 1.1, 6.8],
        [0.5, 1.08, 8.4],
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
