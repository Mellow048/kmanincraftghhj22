import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Fill, HOME_WINDOW, Hero, SOUTH, ease, ramp, timing, wordAt } from "./kit";

const CLIMB = wordAt("8.window", "climbed");
const WIN = HOME_WINDOW;

/** ATTEMPT TWO BEGINS. Not in front of everyone: at night, alone. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "A night with a full moon",
  shots: [
    {
      cue: "8.moon",
      from: [-12, 1.5, 8.6],
      to: [-12, 1.5, 7.4],
      target: [-13, 9, -45],
      targetTo: [-14, 29, -45],
      fov: 36,
      ease: "inOutSine",
      zone: "village",
      look: "overworld-night",
      note: "We tilt up off the dark roofs to the sky: a full square moon, low and huge over the town.",
      stage: () => null,
    },
    {
      cue: "8.window",
      ...cam.push({ on: [WIN[0], 1.3, WIN[2] + 0.7], dist: 3.9, to: 3.2, yaw: 18, pitch: 2, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "The front of his house in moonlight, every other window black. On 'climbed' a small red figure with a pumpkin drops out of his own window and lands in a crouch.",
      stage: (t) => {
        const k = ramp(t, CLIMB - 0.1, CLIMB + 0.45);
        const y = 1.45 * (1 - k * k);
        return (
          <>
            <Hero position={[WIN[0], y, WIN[2] + 0.35 + 0.75 * ease(k)]} rotationY={SOUTH} animation={k < 1 ? "fall" : "crouch"} blendTo="crouch" blend={k <= 0 ? 1 : 0} carve="wow" />
            <Fill at={[WIN[0] + 1.5, 2, WIN[2] + 4]} power={12} />
          </>
        );
      },
    },
  ],
});
