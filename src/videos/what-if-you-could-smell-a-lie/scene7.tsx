import { cam, storyScene } from "../../engine";
import { A, Hero, Mum, SPOT, timing, fit } from "./kit";

/**
 * THE BUTTON. Three shots.
 *
 * He sits down and eats cake that tastes of nothing. Then the first true sentence in months, and the line the
 * story has earned. Warm, low, no smoke anywhere.
 */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The button",
  shots: [
    {
      cue: "14.smell",
      ...cam.push(fit({ on: SPOT.at(0, 1.0, 0.9), dist: 3.5, to: 3.1, yaw: -30, pitch: 10, fov: 48 })),
      zone: "class",
      look: "overworld-sunset",
      note: "He sits down on the chair with the cake and eats it. The room has stopped smoking.",
      stage: () => (
        <>
          <Hero position={SPOT.at(0, 0, 0.9)} rotationY={0} animation="sit" face="calm" />
          <Mum position={SPOT.at(1.7, 0, -0.3)} rotationY={Math.PI * 0.9} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "14.truth",
      ...cam.push(fit({ on: SPOT.at(0, 1.0, 0.9), dist: 2.3, to: 2.1, yaw: -30, pitch: 6, fov: 52 })),
      zone: "class",
      look: "overworld-sunset",
      note: "Close on his face for the true sentence. No toast, and he is not surprised any more.",
      stage: () => <Hero position={SPOT.at(0, 0, 0.9)} rotationY={0} animation="talk" face="sad" />,
    },
    {
      cue: "14.sub",
      ...cam.push(fit({ on: A("kitchen", 0.1, 1.25, -0.8), dist: 5.4, to: 4.9, yaw: -30, pitch: 12, fov: 50 })),
      zone: "kitchen",
      look: "overworld-sunset",
      note: "The last picture: the two of them in the kitchen, the empty chair between them, and no smoke.",
      stage: () => (
        <>
          <Mum position={A("kitchen", 0.7, 0, -1.7)} rotationY={0.2} animation="idle" face="calm" />
          <Hero position={A("kitchen", -0.7, 0, 0.2)} rotationY={Math.PI * 0.9} animation="idle" face="smile" />
        </>
      ),
    },
  ],
});
