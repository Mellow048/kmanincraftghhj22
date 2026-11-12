import { clamp01, defineScene, smoothstep, usePerformance, useTime } from "../../engine";
import { Kid, KID_AT_WINDOW } from "./actors";

/**
 * BEAT 04 — THE MOON (10.2–16.0)
 *
 * The signature move and the longest shot in the film, and the one place a cut
 * would ruin it: the camera walks out through the gap the boy is holding open,
 * over the rooftops, and up to the moon. It is the same moon from the first
 * frame, which is the point. Something in it turns over. The beam sweeps the
 * town, finds the window we came out of, and the eye shuts on us.
 *
 * No cut, one `path`, 5.8s — the one shot allowed to run past five seconds.
 */
export const scene4 = defineScene({
  id: "scene4",
  title: "The Moon",
  duration: 5.8,
  shots: [
    {
      at: 0,
      dur: 5.8,
      from: [0.2, 1.63, 0.1],
      path: [
        [0.2, 1.63, 0.1],
        [0.18, 1.78, -1.1],
        [0.12, 2.05, -2.6],
        [0.22, 2.55, -4.0],
        [0.5, 3.2, -5.0],
      ],
      target: [0.02, 1.58, -2.36],
      targetPath: [
        [0.02, 1.58, -2.36],
        [-0.1, 2.3, -5.5],
        [-0.95, 4.6, -30],
      ],
      fov: 46,
      fovTo: 48,
      ease: "inOutSine",
      handheld: 0.003,
      note: "Carry the camera through the gap he is holding open, over the street and up into the eye, so the reveal is the same physical moon and not a cut to a new threat.",
    },
  ],
  Component: () => {
    const t = useTime();
    const perf = usePerformance([
      { at: 0, clip: "reach", blend: 0 },
      { at: 4.2, clip: "scared", blend: 0.5 },
    ]);
    const brace = smoothstep(clamp01((t - 4.1) / 0.9));
    return (
      <Kid
        position={KID_AT_WINDOW}
        rotationY={Math.PI - 0.04}
        animation={perf.clip}
        blendTo={perf.blendTo ?? undefined}
        blend={perf.blendK}
        blendTime={perf.prevLocal ?? undefined}
        face={brace > 0.4 ? "scared" : "surprised"}
        headYaw={0.04}
        headPitch={-0.1 - 0.12 * brace}
        breath={0.6}
      />
    );
  },
});
