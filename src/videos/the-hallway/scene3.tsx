import { clamp01, ContactShadow, defineScene, FogCard, Glow, useTime } from "../../engine";
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
      from: [0.35, 1.45, 6.6],
      to: [0.32, 1.46, 6.82],
      target: [0.1, 1.38, 9.4],
      targetTo: [0.1, 1.52, 9.4],
      fov: 42,
      fovTo: 40,
      ease: "inOutSine",
      note: "Push on the eyes. The audience needs time to realise the two lights are a face, not a reflection.",
    },
    {
      at: 1.6,
      dur: 1.4,
      from: [0.32, 1.46, 6.82],
      to: [0.3, 1.47, 6.92],
      target: [0.1, 1.52, 9.4],
      targetTo: [0.1, 1.55, 9.4],
      fov: 40,
      shake: 0.005,
      note: "The step lands. A tiny handheld tremor on the final push sells the impact without becoming a music video.",
    },
  ],
  Component: () => {
    const t = useTime();
    const advance = clamp01((t - 1.2) / 1.6) * 0.22;
    return (
      <>
        <FogCard position={[-0.1, 1.4, 8.4]} width={4.2} height={3.1} color="#0a1826" opacity={0.15} />
        <ContactShadow position={[0.1, 0.013, 9.4 - advance]} width={1.5} depth={0.75} opacity={0.55} />
        <Glow position={[-0.005, 1.74, 9.08 - advance]} size={0.075} color="#eaf7ff" opacity={0.75} />
        <Glow position={[0.205, 1.74, 9.08 - advance]} size={0.075} color="#eaf7ff" opacity={0.75} />
        <Figure
          position={[0.1, 0, 9.4 - advance]}
          animation={t > 1.2 ? "walk" : "idle"}
          animSpeed={0.55}
          phase={-1.2 * 0.55}
          headPitch={0.08}
        />
      </>
    );
  },
});
