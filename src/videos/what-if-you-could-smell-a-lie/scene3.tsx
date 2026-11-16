import { cam, storyScene } from "../../engine";
import { A, Hero, Mum, Toast, timing } from "./kit";

/**
 * THE FIRST TRY, THE SECOND TRY, THE PRICE. Nine shots.
 *
 * He catches her in one lie and is delighted. Then he pushes, and wins, and she stops talking. The win is the
 * loss: that is the beat the whole film turns on, so it gets the most shots after the reveal.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "He catches her",
  shots: [
    {
      cue: "7.sunday",
      ...cam.push({ on: A("kitchen", -0.4, 1.3, 0.2), dist: 2.6, to: 2.3, yaw: -10, pitch: 6, fov: 42 }),
      zone: "kitchen",
      note: "Him, at the table, asking the question he has been saving.",
      stage: () => <Hero position={A("kitchen", -0.4, 0, 0.2)} rotationY={Math.PI * 0.9} animation="idle" face="uneasy" />,
    },
    {
      cue: "7.coming",
      ...cam.push({ on: A("kitchen", 0.5, 1.45, -1.8), dist: 2.3, to: 2.0, yaw: 10, pitch: 5, fov: 40 }),
      zone: "kitchen",
      note: "Her, saying it. The smoke is not in this shot yet: it arrives on the next word.",
      stage: () => <Mum position={A("kitchen", 0.5, 0, -1.8)} rotationY={0.2} animation="talk" face="smile" />,
    },
    {
      cue: "7.caught",
      ...cam.push({ on: A("kitchen", 0.45, 1.4, -1.75), dist: 1.8, to: 1.55, yaw: 6, pitch: 3, fov: 36 }),
      zone: "kitchen",
      note: "Toast off her mouth, and her face still smiling. The first time in the film the smoke comes from her.",
      stage: () => (
        <>
          <Mum position={A("kitchen", 0.5, 0, -1.8)} rotationY={0} animation="talk" face="smile" />
          <Toast at={A("kitchen", 0.5, 0, -1.7)} n={14} seed={4} />
        </>
      ),
    },
    {
      cue: "7.proud",
      ...cam.push({ on: A("kitchen", -0.4, 1.25, 0.2), dist: 2.0, to: 1.75, yaw: -8, pitch: 4, fov: 38 }),
      zone: "kitchen",
      note: "Him, pleased with himself. This is the shot the audience should hate him in, gently.",
      stage: () => <Hero position={A("kitchen", -0.4, 0, 0.2)} rotationY={Math.PI * 0.85} animation="idle" face="grin" />,
    },
    {
      cue: "8.shout",
      ...cam.push({ on: A("kitchen", -0.4, 1.3, 0.3), dist: 2.2, to: 1.95, yaw: 14, pitch: 5, fov: 40 }),
      zone: "kitchen",
      note: "He leans in. Same room, closer lens, and the warmth is gone out of the light.",
      stage: () => (
        <>
          <Hero position={A("kitchen", -0.4, 0, 0.3)} rotationY={Math.PI * 0.9} animation="talk" face="frown" />
          <Mum position={A("kitchen", 0.6, 0, -1.8)} rotationY={0.2} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "8.wrong",
      ...cam.push({ on: A("kitchen", 0.5, 1.45, -1.8), dist: 2.0, to: 1.75, yaw: -12, pitch: 4, fov: 38 }),
      zone: "kitchen",
      note: "Her face taking it. No smoke on her now: she is the one being told the truth, and it is not kind.",
      stage: () => <Mum position={A("kitchen", 0.5, 0, -1.8)} rotationY={0.1} animation="idle" face="sad" />,
    },
    {
      cue: "8.win",
      ...cam.push({ on: A("kitchen", -0.4, 1.2, 0.2), dist: 2.4, to: 2.1, yaw: -18, pitch: 8, fov: 42 }),
      zone: "kitchen",
      note: "He is right, and the room is small and quiet, and being right looks like this.",
      stage: () => <Hero position={A("kitchen", -0.4, 0, 0.2)} rotationY={Math.PI * 0.85} animation="idle" face="brave" />,
    },
    {
      cue: "8.quiet",
      ...cam.push({ on: A("kitchen", 0.2, 1.3, -0.8), dist: 3.6, to: 3.2, yaw: 6, pitch: 10, fov: 48 }),
      zone: "kitchen",
      note: "The two of them with four metres of kitchen between them, and not one wisp in the air.",
      stage: () => (
        <>
          <Mum position={A("kitchen", 0.9, 0, -2.0)} rotationY={-0.2} animation="idle" face="calm" />
          <Hero position={A("kitchen", -0.9, 0, 0.6)} rotationY={Math.PI * 0.85} animation="idle" face="calm" />
        </>
      ),
    },
    {
      cue: "8.lost",
      ...cam.push({ on: A("kitchen", -0.6, 1.15, 0.6), dist: 2.5, to: 2.2, yaw: 20, pitch: 8, fov: 42 }),
      zone: "kitchen",
      note: "He is alone with the empty half of the kitchen. She has gone, and he thinks he won.",
      stage: () => <Hero position={A("kitchen", -0.6, 0, 0.6)} rotationY={Math.PI * 0.7} animation="idle" face="calm" />,
    },
  ],
});
