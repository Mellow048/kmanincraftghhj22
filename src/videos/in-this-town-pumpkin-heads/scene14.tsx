import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CLOSE, Fill, Hero, KNEEL, SOUTH, SubscribeSign, Tall, Watchers, ease, faceOf, ramp, timing } from "./kit";

/** THE END. It does not end: it is still happening. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "Neither have I",
  shots: [
    {
      cue: "14.looked",
      ...cam.push({ on: faceOf(KNEEL), dist: 1.7, to: 1.35, yaw: -14, pitch: -2, fov: 34 }),
      zone: "village",
      look: "overworld-night",
      note: "His bare face, close, eyes as wide as they go. A second ago he was grinning.",
      stage: () => (
        <>
          <Hero bare position={KNEEL} rotationY={SOUTH} animation="scared" face="fear" gaze={0} blink={false} />
          <Fill at={[KNEEL[0] - 0.8, 1.5, KNEEL[2] + 1.8]} power={7} color="#cfdcff" />
        </>
      ),
    },
    {
      cue: "14.turned",
      from: [-31, 1.7, -1.0],
      to: [-30, 1.7, -1.1],
      target: [-8, 2.3, -4.1],
      fov: 44,
      ease: "inOutSine",
      zone: "village",
      look: "overworld-night",
      note: "The line of them down the street again. The nearest head swings away from its window to face the well, and its eyes come on. Then the next. Then the next.",
      stage: (t, { dur }) => (
        <>
          <Watchers toward={KNEEL} turned={(i) => ease(ramp(t, 0.1 + i * (dur - 0.7) * 0.2, 0.5 + i * (dur - 0.7) * 0.2))} />
          <Fill at={[-22, 3, 0]} power={46} color="#c9b8ff" />
          <Fill at={[-10, 3, 0]} power={46} color="#c9b8ff" />
        </>
      ),
    },
    {
      cue: "14.still",
      ...cam.push({ on: [KNEEL[0], 1.25, KNEEL[2] + 0.5], dist: 5.0, to: 4.7, yaw: 16, pitch: 3, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "From behind the closest one: its back fills one side of the frame, and past it, small, the kid stands at the well staring up at it. Neither moves. The camera barely does.",
      stage: () => (
        <>
          <Tall position={CLOSE} rotationY={Math.PI} headPitch={0.35} eyes={1} />
          <Hero bare position={KNEEL} rotationY={SOUTH} animation="scared" headPitch={-0.45} face="fear" gaze={0} blink={false} />
          <Fill at={[KNEEL[0] + 0.8, 1.6, KNEEL[2] + 1.4]} power={8} color="#cfdcff" />
        </>
      ),
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [KNEEL[0] + 0.02, 1.08, KNEEL[2] + 0.1], dist: 3.0, to: 2.7, yaw: 3, pitch: 0, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "From where it stands, looking down at him. He has not blinked. Without taking his eyes off us he holds up a sign that says SUBSCRIBE, and it shakes.",
      stage: (t) => (
        <>
          <Hero bare position={KNEEL} rotationY={SOUTH} animation="hold" headPitch={-0.3} face="fear" gaze={0} blink={false} />
          <SubscribeSign position={[KNEEL[0] + 0.02, 0.9, KNEEL[2] + 0.42]} rotationY={SOUTH} scale={0.34} tilt={Math.sin(t * 19) * 0.03} />
          <Fill at={[KNEEL[0] - 0.6, 1.7, KNEEL[2] + 2]} power={8} color="#cfdcff" />
        </>
      ),
    },
  ],
});
