import { clamp01, defineScene, usePerformance, useTime } from "../../engine";
import { Figure } from "./actors";

/**
 * BEAT 05 — IT SEES HIM (0:15.4–0:20.0)
 * The corridor lamp above the figure gives up at 16.3s. In the dark that is
 * left, the figure takes one small step towards the camera and stops. The
 * camera stays wide enough to keep the whole silhouette, so the audience sees
 * a shape the size of a person rather than a pair of eyes. We end before it
 * reaches us.
 */
export const scene5 = defineScene({
  id: "scene5",
  title: "It Sees Him",
  duration: 4.6,
  shots: [
    {
      at: 0,
      dur: 3.2,
      from: [0.4, 1.46, 6.2],
      to: [0.38, 1.45, 6.62],
      target: [0.3, 1.05, 10.15],
      targetTo: [0.3, 1.03, 10.1],
      fov: 40,
      fovTo: 39,
      ease: "inOutSine",
      handheld: 0.006,
      impacts: [{ at: 1.7, amp: 0.02, dur: 0.45 }],
      note: "Push on the figure while the lamp dies. The audience needs the dark to realise the two lights are a face and not a reflection.",
    },
    {
      at: 3.2,
      dur: 1.4,
      from: [0.38, 1.45, 6.62],
      to: [0.4, 1.45, 6.78],
      target: [0.3, 1.03, 10.1],
      targetTo: [0.3, 1.01, 10.05],
      fov: 39,
      ease: "inOutSine",
      shake: 0.004,
      note: "Tighten on the face after the step lands. A tiny handheld tremor sells the impact without turning the ending into a music video.",
    },
  ],
  Component: () => {
    const t = useTime();
    const advance = clamp01((t - 1.7) / 1.2) * 0.18;
    const perf = usePerformance([
      { at: 0, clip: "idle", blend: 0 },
      { at: 1.7, clip: "walk", blend: 0.25, speed: 0.6 },
      { at: 2.9, clip: "idle", blend: 0.3 },
    ]);
    const tilt = clamp01((t - 0.4) / 2.0) * 0.12;
    return (
      <Figure
        position={[0.3, 0, 10.15 - advance]}
        animation={perf.clip}
        blendTo={perf.blendTo ?? undefined}
        blend={perf.blendK}
        blendTime={perf.prevLocal ?? undefined}
        animDistance={advance}
        headPitch={0.1 + tilt}
        headRoll={tilt * 0.6}
      />
    );
  },
});
