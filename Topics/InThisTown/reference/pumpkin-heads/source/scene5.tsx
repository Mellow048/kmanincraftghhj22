import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, NORTH, PLACE, SOUTH, Townie, faceOf, stride, timing, ramp, ease, wordAt } from "./kit";

const P = PLACE.porch;
const FOOT = PLACE.porchFoot;
const SHUT = wordAt("5.away", "shut");

/** HE ASKS. The one person who should know does not. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "That is all I was ever told",
  shots: [
    {
      cue: "5.ask",
      ...cam.push({ on: [P[0], 1.75, P[2]], dist: 4.4, to: 3.7, yaw: 7, pitch: -5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "From behind the kid, low: he stands at the foot of her porch looking up, and she stands over him in the brown pumpkin. Small below, old above.",
      stage: () => (
        <>
          <Hero position={FOOT} rotationY={NORTH} animation="talk" headPitch={-0.35} carve="wow" />
          <Townie who={6} old position={P} rotationY={SOUTH} animation="idle" headPitch={0.3} carve="flat" />
        </>
      ),
    },
    {
      cue: "5.tap",
      ...cam.push({ on: [P[0], P[1] + 1.6, P[2]], dist: 1.9, to: 1.5, yaw: -20, pitch: -4, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "Her pumpkin, close: seventy years old, cracked, the carving worn soft. She raises a hand to the side of it and taps, thinking.",
      stage: () => <Townie who={6} old position={P} rotationY={SOUTH} animation="wave" headPitch={0.12} carve="flat" />,
    },
    {
      cue: "5.rule",
      ...cam.push({ on: [P[0], P[1] + 1.55, P[2]], dist: 2.3, to: 1.8, yaw: 4, pitch: -16, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "From the kid's height, looking up at her as she says it. She does not know either. Nobody alive knows.",
      stage: () => <Townie who={6} old position={P} rotationY={SOUTH} animation="talk" headPitch={0.38} carve="frown" />,
    },
    {
      cue: "5.away",
      ...cam.push({ on: faceOf(FOOT), dist: 2.3, to: 1.9, yaw: 158, pitch: 6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "From the porch, looking down at him: she walks out of the frame towards her door and he is left alone at the bottom of the step, frowning up.",
      stage: (t) => (
        <>
          <Hero position={FOOT} rotationY={NORTH} animation="idle" headPitch={-0.3 + 0.35 * ease(ramp(t, SHUT, SHUT + 0.5))} carve="frown" />
          <Townie who={6} old {...stride([P[0] + 0.9, P[1], P[2] + 0.2], [P[0] + 1.3, P[1], P[2] - 0.7], ramp(t, 0, SHUT))} animation="walk" carve="flat" />
        </>
      ),
    },
  ],
});
