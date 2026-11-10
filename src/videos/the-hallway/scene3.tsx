import { clamp01, ContactShadow, defineScene, FogCard, useTime } from "../../engine";
import { Figure } from "./actors";

/**
 * BEAT 03 — IT SEES HIM (0:07–0:10)
 * The hallway light dies. The figure takes one small step, then stops. The
 * camera keeps a medium distance so the silhouette and the eyes do the work.
 * End before it reaches us.
 */
export const scene3 = defineScene({
  id: "scene3",
  title: "It Sees Him",
  duration: 3.0,
  shots: [
    {
      at: 0,
      dur: 1.6,
      from: [0.25, 1.45, 5.2],
      to: [0.22, 1.46, 5.55],
      target: [0.3, 1.2, 10.15],
      targetTo: [0.3, 1.25, 10.15],
      fov: 38,
      fovTo: 37,
      ease: "inOutSine",
      note: "Push on the eyes. The audience needs time to realise the two lights are a face, not a reflection.",
    },
    {
      at: 1.6,
      dur: 1.4,
      from: [0.22, 1.46, 5.55],
      to: [0.19, 1.46, 5.7],
      target: [0.3, 1.25, 10.15],
      targetTo: [0.3, 1.27, 10.15],
      fov: 37,
      shake: 0.005,
      note: "The step lands. A tiny handheld tremor on the final push sells the impact without becoming a music video.",
    },
  ],
  Component: () => {
    const t = useTime();
    const advance = clamp01((t - 1.2) / 1.6) * 0.14;
    return (
      <>
        <FogCard position={[0.3, 1.45, 10.9]} width={4.2} height={3.1} color="#0a1826" opacity={0.18} />
        <ContactShadow position={[0.3, 0.013, 10.15 - advance]} width={1.5} depth={0.75} opacity={0.55} />
        <Figure
          position={[0.3, 0, 10.15 - advance]}
          animation={t > 1.2 ? "walk" : "idle"}
          animSpeed={0.55}
          phase={-1.2 * 0.55}
          headPitch={0.08}
        />
      </>
    );
  },
});
