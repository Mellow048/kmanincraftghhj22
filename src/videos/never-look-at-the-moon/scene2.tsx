import { clamp01, defineScene, lerp, smoothstep, usePerformance, useTime } from "../../engine";
import { Kid, KID_AT_WINDOW } from "./actors";

/**
 * BEAT 02 — WHY (3.2–6.8)
 *
 * The camera comes round the boy and finds his face, and that is the left turn
 * of the whole film: he turns his back on the window. Nobody has told him why
 * the rule exists, and the room behind him is only lit by the moon he is not
 * allowed to look at. The blade on the floor is still moving.
 */
export const scene2 = defineScene({
  id: "scene2",
  title: "Why",
  duration: 3.6,
  shots: [
    {
      at: 0,
      dur: 3.6,
      from: [0.18, 1.5, 1.62],
      to: [1.45, 1.52, 1.1],
      target: [0.22, 1.68, -2.4],
      targetPath: [
        [0.22, 1.68, -2.4],
        [0.6, 1.6, -1.95],
        [0.9, 1.3, -1.45],
      ],
      fov: 60,
      fovTo: 50,
      ease: "inOutCubic",
      arc: 0.3,
      handheld: 0.004,
      note: "Swing off the window and onto his face while he turns away from it, so the shot changes subject and meaning in one move instead of cutting.",
    },
  ],
  Component: () => {
    const t = useTime();
    const turn = smoothstep(clamp01((t - 0.35) / 1.0));
    const perf = usePerformance([
      { at: 0, clip: "idle", blend: 0 },
      { at: 1.5, clip: "lookAround", blend: 0.5 },
      { at: 2.7, clip: "idle", blend: 0.5 },
    ]);
    return (
      <Kid
        position={KID_AT_WINDOW}
        rotationY={lerp(Math.PI + 0.06, 0.08, turn)}
        animation={perf.clip}
        blendTo={perf.blendTo ?? undefined}
        blend={perf.blendK}
        blendTime={perf.prevLocal ?? undefined}
        face={t > 2.1 ? "sad" : "worried"}
        headYaw={lerp(0.5, -0.5, turn)}
        headPitch={lerp(-0.16, 0.17, turn)}
        headRoll={0.04}
        breath={1.3}
      />
    );
  },
});
