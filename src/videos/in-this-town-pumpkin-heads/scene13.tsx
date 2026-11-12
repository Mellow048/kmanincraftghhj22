import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CLOSE, Fill, HOME_WINDOW, Hero, KNEEL, Loose, PLACE, PUT, SOUTH, STAND, Tall, Townie, Watchers, EAST, ease, ramp, stride, timing, wordAt } from "./kit";

const LOOK = wordAt("13.find", "look");
const AT_HOME = STAND[5];

/** THE REVEAL. What the rule was hiding, how many, how long, and why the pumpkins worked. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "One beside every house",
  shots: [
    {
      cue: "13.tall",
      from: [KNEEL[0] - 1.8, 0.35, KNEEL[2] - 0.1],
      to: [KNEEL[0] - 1.5, 0.5, KNEEL[2] + 0.1],
      target: [CLOSE[0], 1.9, CLOSE[2]],
      targetTo: [CLOSE[0], 2.3, CLOSE[2]],
      fov: 50,
      ease: "inOutSine",
      zone: "village",
      look: "overworld-night",
      note: "From the ground, looking up past the kid. He has spun round, and standing over him is a thing three metres tall, thin as a post, blacker than the sky behind it. It does not move.",
      stage: () => (
        <>
          <Hero bare position={KNEEL} rotationY={SOUTH} animation="scared" headPitch={-0.5} face="fear" gaze={0} blink={false} />
          <Tall position={CLOSE} rotationY={Math.PI} headPitch={0.35} />
          <Fill at={[KNEEL[0] - 2, 2.2, KNEEL[2] + 1]} power={14} color="#c9b8ff" />
        </>
      ),
    },
    {
      cue: "13.every",
      from: [-31, 1.7, -1.0],
      to: [-28, 1.8, -1.3],
      target: [-8, 2.3, -4.1],
      fov: 44,
      ease: "inOutSine",
      zone: "village",
      look: "overworld-night",
      note: "Down the line of house fronts, from the end of the street. Beside the first house, one. Beside the next, one. And the next, all the way down, getting smaller.",
      stage: () => (
        <>
          <Watchers />
          <Fill at={[-22, 3, 0]} power={20} color="#c9b8ff" />
          <Fill at={[-10, 3, 0]} power={20} color="#c9b8ff" />
        </>
      ),
    },
    {
      cue: "13.windows",
      ...cam.push({ on: [HOME_WINDOW[0] + 0.5, 2.3, HOME_WINDOW[2] + 0.5], dist: 3.6, to: 3.0, yaw: -28, pitch: -8, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "The one at his own house, close. It is bent to his bedroom window with its face almost on the glass. That is the window he climbed out of.",
      stage: () => (
        <>
          <Tall position={AT_HOME[0]} rotationY={AT_HOME[1]} headPitch={0.3} />
          <Fill at={[HOME_WINDOW[0] - 1, 2.6, HOME_WINDOW[2] + 3]} power={12} color="#c9b8ff" />
        </>
      ),
    },
    {
      cue: "13.always",
      ...cam.push({ on: [-8.6, 1.7, -3.6], dist: 5.2, to: 4.5, yaw: 24, pitch: 2, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "A cut to broad daylight, the happy street from the start, people walking by in their pumpkins. And the same black things, standing among them at the windows. They were in every shot. We just could not see them.",
      stage: (t, { p }) => (
        <>
          <Watchers />
          <Townie who={6} old position={PLACE.porch} rotationY={SOUTH} animation="idle" carve="flat" />
          <Townie who={2} {...stride([-9.6, 0, -1.6], [-7.6, 0, -1.7], p)} animation="walk" carve="grin" />
          <Townie who={9} position={[-6.6, 0, -2.6]} rotationY={-EAST} animation="wave" carve="glad" />
        </>
      ),
    },
    {
      cue: "13.eyes",
      ...cam.push({ on: [PUT[0], PUT[1] + 0.08, PUT[2]], dist: 1.6, to: 0.72, yaw: 26, pitch: 3, fov: 34 }),
      zone: "village",
      look: "overworld-night",
      note: "His pumpkin, lying where he left it. A long push into the two carved holes: narrow on purpose, so that nobody wearing one could ever see far enough.",
      stage: () => (
        <>
          <Loose position={PUT} rotation={[0, 0.45, 0]} carve="flat" />
          <Fill at={[PUT[0] + 1, 0.9, PUT[2] + 1.6]} power={6} />
        </>
      ),
    },
    {
      cue: "13.find",
      ...cam.push({ on: [CLOSE[0], 2.72, CLOSE[2]], dist: 2.0, to: 1.5, yaw: 172, pitch: -12, fov: 36 }),
      zone: "village",
      look: "overworld-night",
      note: "Its head, from below, blank. On 'look' two pale eyes open in it.",
      stage: (t) => (
        <>
          <Tall position={CLOSE} rotationY={Math.PI} headPitch={0.4} eyes={ease(ramp(t, LOOK, LOOK + 0.35))} />
          <Fill at={[CLOSE[0] - 1, 1.8, CLOSE[2] - 2]} power={9} color="#c9b8ff" />
        </>
      ),
    },
  ],
});
