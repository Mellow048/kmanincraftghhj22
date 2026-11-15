import { cam, storyScene } from "../../engine";
import { Hero, HayPile, SubscribeSign, timing } from "./kit";

/** The story's Subscribe button stays in the village, beside the spy's hay landing. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "The button",
  shots: [
    {
      cue: "14.sub",
      ...cam.push({ on: [6.2, 1.2, 0.2], dist: 5.8, to: 4.8, yaw: 0, pitch: 6, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "A red three-dimensional Subscribe sign rises beside the hay pile as the masked spy starts to wave.",
      stage: (t) => (
        <>
          <HayPile position={[5.7, 0, 0.5]} topple={0.2} />
          <Hero position={[5.6, 0, 1.1]} masked face="ouch" animation="wave" gaze={0} />
          <SubscribeSign position={[6.8, 0.85, -0.75]} rotationY={-0.15} scale={0.8} tilt={Math.sin(t * 4) * 0.025} />
        </>
      ),
    },
    {
      cue: "14.sub",
      cut: 0.42,
      ...cam.orbit({ on: [6.2, 1.2, 0.1], dist: 5.0, yaw: -24, yawTo: 28, pitch: 6, fov: 43 }),
      zone: "village",
      look: "overworld-day",
      note: "A small orbit gives the red sign and the spy's clumsy pillager pose one last changing silhouette.",
      stage: (t) => (
        <>
          <HayPile position={[5.7, 0, 0.5]} topple={0.2} />
          <Hero position={[5.6, 0, 1.1]} masked face="ouch" animation="wave" headYaw={Math.sin(t * 3) * 0.12} />
          <SubscribeSign position={[6.8, 0.85, -0.75]} rotationY={-0.15} scale={0.8} tilt={Math.sin(t * 4) * 0.025} />
        </>
      ),
    },
    {
      cue: "14.sub",
      cut: 0.92,
      ...cam.push({ on: [6.2, 1.2, 0.1], dist: 5.4, to: 7.2, yaw: -8, pitch: 8, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "The camera eases back from the sign, holding the clumsy spy in the hay for the final word.",
      stage: () => (
        <>
          <HayPile position={[5.7, 0, 0.5]} topple={0.2} />
          <Hero position={[5.6, 0, 1.1]} masked face="ouch" animation="idle" />
          <SubscribeSign position={[6.8, 0.85, -0.75]} rotationY={-0.15} scale={0.8} />
        </>
      ),
    },
  ],
});
