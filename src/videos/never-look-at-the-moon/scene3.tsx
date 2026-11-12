import { clamp01, defineScene, lerp, smoothstep, usePerformance, useTime } from "../../engine";
import { Kid, KID_AT_WINDOW } from "./actors";

/**
 * BEAT 03 — THE GAP (6.8–10.2)
 *
 * He goes back to the glass and lifts the edge of the curtain with one hand.
 * The camera slides in behind his shoulder, so the gap between the curtains
 * becomes a doorway the audience wants the camera to go through — and then it
 * does, in the next scene, without a cut. Cold light floods his face and stays
 * there: the reveal is that he is lit by the thing he was told not to look at.
 */
export const scene3 = defineScene({
  id: "scene3",
  title: "The Gap",
  duration: 3.4,
  shots: [
    {
      at: 0,
      dur: 3.4,
      from: [1.45, 1.52, 1.1],
      to: [0.2, 1.63, 0.1],
      target: [0.9, 1.3, -1.45],
      targetTo: [0.02, 1.58, -2.36],
      fov: 50,
      fovTo: 46,
      ease: "inOutCubic",
      handheld: 0.004,
      note: "Drift past his shoulder to the gap as the curtain opens, so his arm leaves frame and the audience is left standing where he is standing.",
    },
  ],
  Component: () => {
    const t = useTime();
    const turn = smoothstep(clamp01((t - 0.15) / 0.95));
    const perf = usePerformance([
      { at: 0, clip: "idle", blend: 0 },
      { at: 0.95, clip: "reach", blend: 0.45 },
    ]);
    const flood = smoothstep(clamp01((t - 1.85) / 0.8));
    return (
      <Kid
        position={KID_AT_WINDOW}
        rotationY={lerp(0.08, Math.PI - 0.04, turn)}
        animation={perf.clip}
        blendTo={perf.blendTo ?? undefined}
        blend={perf.blendK}
        blendTime={perf.prevLocal ?? undefined}
        face={flood > 0.55 ? "surprised" : "worried"}
        headYaw={lerp(-0.12, 0.1, turn)}
        headPitch={lerp(0.14, -0.06, turn)}
        headRoll={-0.03}
        breath={0.85}
      />
    );
  },
});
