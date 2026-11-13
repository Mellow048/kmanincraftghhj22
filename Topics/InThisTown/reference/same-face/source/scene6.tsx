import { cam, storyScene } from "../../engine";
import { EAST, Hero, PLACE, WEST, ease, ramp, timing, wordAt } from "./kit";

const ME = PLACE.streetEnd;
const HILL_AT = wordAt("6.plant", "hill");

/** THE DECISION. The planted question: what do hands have to do with a hill? The answer is the ending. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The decision",
  shots: [
    {
      cue: "6.plant",
      ...cam.push({ on: [24, 1.16, 2.0], dist: 1.64, to: 1.42, yaw: -90, pitch: -6, fov: 55 }),
      zone: "village",
      look: "overworld-day",
      note: "'What did my hands have to do with a hill?': his two hands held out to us at the bottom of the frame, his face over them, and the whole hill standing behind his head. On 'hill' he looks back at it over his shoulder.",
      stage: (t) => {
        const back = ease(ramp(t, HILL_AT - 0.3, HILL_AT + 0.1));
        return <Hero position={ME} rotationY={WEST} animation="hold" face="uneasy" headPitch={0.22 - back * 0.42} headYaw={back * 1.1} breath={0} />;
      },
    },
    {
      cue: "6.decide",
      ...cam.push({ on: [24, 1.2, 2], dist: 1.85, to: 1.4, yaw: 76, pitch: -4, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'I decided to go and see': his face, close, made up. The town he is about to disobey is all behind him.",
      stage: () => <Hero position={ME} rotationY={EAST} animation="idle" face="brave" gaze={0} headPitch={-0.12} />,
    },
  ],
});
