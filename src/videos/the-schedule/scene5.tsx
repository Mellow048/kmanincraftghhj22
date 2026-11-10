import { clamp01, ContactShadow, defineScene, FogCard, Glow, useTime } from "../../engine";
import { Figure } from "./actors";

/**
 * BEAT 05 — IT SEES HIM (0:17–0:20.2)
 * Purpose: pay off the reveal. The figure does not teleport: it takes one slow
 * step into the light while the hallway dies. The camera slides off-axis, so the
 * final close-up is a 3/4 silhouette instead of a flat mask. Ends before it reaches us.
 */
export const scene5 = defineScene({
  id: "scene5",
  title: "It Sees Him",
  duration: 3.2,
  shots: [
    {
      at: 0,
      dur: 1.9,
      from: [0.18, 1.43, 6.45],
      to: [-0.48, 1.48, 7.05],
      target: [0.1, 1.32, 9.4],
      targetTo: [0.1, 1.6, 9.4],
      fov: 42,
      fovTo: 39,
      ease: "inOutSine",
      note: "Slide left while pushing in. The move turns the figure into a 3/4 silhouette, so the eyes read as eyes and the body has depth.",
    },
    {
      at: 1.9,
      dur: 1.3,
      from: [-0.48, 1.48, 7.05],
      to: [-0.62, 1.49, 7.2],
      target: [0.1, 1.6, 9.4],
      targetTo: [0.1, 1.64, 9.4],
      fov: 39,
      shake: 0.006,
      note: "The step lands. A tiny handheld tremor on the last push sells the impact without becoming a music video.",
    },
  ],
  Component: () => {
    const t = useTime();
    const advance = clamp01((t - 1.1) / 2.0) * 0.65;
    return (
      <>
        <FogCard position={[-0.1, 1.4, 8.55]} width={4.4} height={3.2} color="#0a1826" opacity={0.2} />
        <pointLight position={[-0.05, 1.15, 8.0]} color="#5877a0" intensity={4.5} distance={3.4} decay={2} />
        <pointLight position={[0.86, 1.6, 8.95 - advance]} color="#9fc0ee" intensity={3.4} distance={1.5} decay={2} />
        <pointLight position={[-0.72, 1.52, 8.95 - advance]} color="#7f9fce" intensity={2.2} distance={1.5} decay={2} />
        <pointLight position={[0.1, 1.75, 9.98 - advance]} color="#9fc6ff" intensity={4.5} distance={1.4} decay={2} />
        <ContactShadow position={[0.1, 0.013, 9.4 - advance]} width={1.5} depth={0.75} opacity={0.55} />
        <Glow position={[-0.005, 1.74, 9.08 - advance]} size={0.075} color="#eaf7ff" opacity={0.75} />
        <Glow position={[0.205, 1.74, 9.08 - advance]} size={0.075} color="#eaf7ff" opacity={0.75} />
        <Figure
          position={[0.1, 0, 9.4 - advance]}
          animation={t > 1.1 ? "walk" : "idle"}
          animSpeed={0.65}
          phase={-1.1 * 0.65}
          headPitch={0.1}
        />
      </>
    );
  },
});
