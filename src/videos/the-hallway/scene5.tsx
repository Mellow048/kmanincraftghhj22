import { clamp01, defineScene, usePerformance, useTime } from "../../engine";
import { Figure, Kid } from "./actors";

/**
 * BEAT 05 — IT SEES HIM (0:15.4–0:20.0)
 * The corridor lamp above the figure gives up at 16.3s. In the dark that is
 * left, the figure takes one small step towards the camera and stops. The camera
 * keeps a medium distance so the silhouette and the eyes do the work. We end
 * before it reaches us.
 */
export const scene5 = defineScene({
  id: "scene5",
  title: "It Sees Him",
  duration: 4.6,
  shots: [
    {
      at: 0,
      dur: 3.2,
      from: [0.3, 1.44, 6.7],
      to: [0.28, 1.43, 6.9],
      target: [0.3, 1.1, 10.15],
      targetTo: [0.3, 1.05, 10.0],
      fov: 38,
      fovTo: 36,
      ease: "inOutSine",
      handheld: 0.006,
      impacts: [{ at: 1.7, amp: 0.02, dur: 0.45 }],
      note: "Push on the eyes while the lamp dies. The audience needs the dark to realise the two lights are a face and not a reflection.",
    },
    {
      at: 3.2,
      dur: 1.4,
      from: [0.28, 1.43, 6.9],
      to: [0.29, 1.43, 7.0],
      target: [0.3, 1.18, 10.0],
      targetTo: [0.3, 1.16, 9.95],
      fov: 36,
      ease: "inOutSine",
      shake: 0.004,
      note: "Tighten on the face after the step lands. A tiny handheld tremor sells the impact without turning the ending into a music video.",
    },
  ],
  Component: () => {
    const t = useTime();
    const advance = clamp01((t - 1.7) / 1.2) * 0.24;
    const perf = usePerformance([
      { at: 0, clip: "idle", blend: 0 },
      { at: 1.7, clip: "walk", blend: 0.25, speed: 0.6 },
      { at: 2.9, clip: "idle", blend: 0.3 },
    ]);
    const tilt = clamp01((t - 0.4) / 2.0) * 0.12;
    return (
      <>
        <Kid face="scared" position={[1.5, 0, 3.3]} rotationY={0.1} headYaw={0.2} headPitch={0.12} animation="idle" />
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
      </>
    );
  },
});
