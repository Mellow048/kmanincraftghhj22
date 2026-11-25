import { cam, storyScene } from "../../engine";
import { Gate, Hero, Jar, PriceBoard, SOUTH, top, tw, timing } from "./kit";

/**
 * 15 — The bottom of the whole film. "It was a street. Just a street."
 *
 * Two shots, and the second one is the turn: through iron bars, in a clean rich street. The reveal is not a secret,
 * it is a disappointment, and the joke is that the top was never worth eleven years.
 */
export const scene15 = storyScene(timing, {
  id: "scene15",
  title: "Just a street",
  shots: [
    {
      cue: "15.sit",
      ...cam.push({ on: top(0.2, 1.1, -297.6), dist: 5.2, to: 4.2, yaw: -22, pitch: 8, fov: 42 }),
      zone: "top",
      look: "overworld-sunset",
      note: "He sits down on the top step with his back to the gate and his jar beside him, and the shadow of the wall goes across him. The sun goes down on the richest place in the world.",
      stage: (t) => (
        <>
          <Gate position={top(0, 0, -300)} />
          <Hero position={top(-1.2, 0, -297.8)} rotationY={SOUTH} animation={t < 0.5 ? "sitDown" : "sit"} face="sad" headPitch={0.25} />
          <Jar position={top(-0.6, 0.05, -297.6)} fill={1} scale={0.9} />
        </>
      ),
    },
    {
      cue: "15.street",
      ...cam.push({ on: top(0, 1.8, -308), dist: 13.0, to: 10.4, yaw: 0, pitch: 4, fov: 44 }),
      zone: "top",
      look: "overworld-sunset",
      note: "Through the bars, slowly, the whole of the top: a lamp, a bin, a bench, one thin tree, plaster walls. On 'just a street' the lens stops moving, because there is nothing else to show.",
      stage: () => (
        <>
          <Gate position={top(0, 0, -300)} />
        </>
      ),
    },
  ],
});
