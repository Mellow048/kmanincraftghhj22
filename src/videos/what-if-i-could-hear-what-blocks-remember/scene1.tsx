import { cam, storyScene } from "../../engine";
import { EchoTrace, GYM, Hero, timing, wordAt } from "./kit";

const QUESTION = wordAt("1.what", "block");
const WHISPER = wordAt("1.echo", "whispered");
const BRICK = GYM.at(-3.1, 1.25, -9.32);

/** The hook: a normal school wall says the one thing the narrator fears hearing. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The words on the wall",
  shots: [
    {
      cue: "1.what",
      ...cam.push({ on: GYM.at(-2.5, 1.45, -7.5), dist: 7.4, to: 4.9, yaw: 14, pitch: 7, fov: 48 }),
      zone: "gym",
      note: "Open on the power already at work: one ordinary gym brick pulses blue as the boy touches it, seen across the dark gym so the room gives the frame its depth. The lens drives in on it over the line. The phrase appears before we know who said it, so the question and the danger arrive together.",
      stage: (t) => (
        <>
          <Hero position={GYM.at(-4.2, 0.87, -6.9)} rotationY={0} animation="reach" face="wow" gaze={0} />
          <EchoTrace at={BRICK} t={t - QUESTION} />
        </>
      ),
    },
    {
      cue: "1.echo",
      ...cam.push({ on: [BRICK[0], BRICK[1] + 0.25, BRICK[2] + 0.1], dist: 2.5, to: 1.8, yaw: 0, pitch: 4, fov: 34 }),
      zone: "gym",
      note: "Cut to the block, not a talking person: its blue sound rings and the dark 3D bubble carry the exact remembered words while the boy's fingertips stay at the edge of frame.",
      stage: (t) => <EchoTrace at={BRICK} t={t - WHISPER} />,
    },
  ],
});
