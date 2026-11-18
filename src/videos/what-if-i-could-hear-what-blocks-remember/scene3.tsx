import { cam, storyScene } from "../../engine";
import { EchoTrace, Hero, NORTH, SPOT, timing, wordAt } from "./kit";

const TEST = SPOT.at(0.45, 0.95, -0.9);

/** The rule and its limit: a block keeps a phrase, never its speaker or its context. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The rule",
  shots: [
    {
      cue: "3.touch",
      ...cam.push({ on: [TEST[0] - 0.25, TEST[1] + 0.15, TEST[2]], dist: 2.9, to: 2.35, yaw: 12, pitch: 6, fov: 46 }),
      zone: "class",
      note: "His fingertips meet a plain classroom block; the first blue rings begin on the spoken word. The camera pushes toward the cause, not a magical figure.",
      stage: (t) => (
        <>
          <Hero position={SPOT.seat(1, 0)} rotationY={NORTH} animation="reach" arms="reach" face="wow" />
          <EchoTrace at={TEST} t={t - wordAt("3.touch", "block")} />
        </>
      ),
    },
    {
      cue: "3.voice",
      ...cam.push({ on: [TEST[0], TEST[1] + 0.1, TEST[2] + 0.3], dist: 2.2, to: 1.75, yaw: 5, pitch: 6, fov: 34 }),
      zone: "class",
      note: "The same square blue ripple travels off the stone face. Keep the color and scale identical to the hook so the audience learns one power-look.",
      stage: (t) => <EchoTrace at={TEST} t={t - wordAt("3.voice", "echo")} />,
    },
    {
      cue: "3.name",
      ...cam.push({ on: [TEST[0], 1.2, TEST[2] + 0.3], dist: 4.1, to: 3.8, yaw: 5, pitch: 2, fov: 40 }),
      zone: "class",
      note: "The echo rings over a plain classroom desk. No speaker or timestamp is in view; the room offers many possible voices and no answer.",
      stage: (t) => <EchoTrace at={TEST} t={t - wordAt("3.name", "speaker")} />,
    },
    {
      cue: "3.meaning",
      ...cam.push({ on: SPOT.face(1, 2), dist: 2.0, to: 1.65, yaw: 176, pitch: 3, fov: 36 }),
      zone: "class",
      note: "A small reaction instead of another explanation: he hears the words and fills in a meaning the stone never gave him.",
      stage: () => <Hero position={SPOT.seat(1, 2)} rotationY={NORTH} animation="idle" face="fear" gaze={0} />,
    },
    {
      cue: "3.power",
      ...cam.push({ on: [TEST[0], TEST[1] + 0.2, TEST[2]], dist: 3.0, to: 2.4, yaw: 12, pitch: 5, fov: 38 }),
      zone: "class",
      note: "End on the gray face of the block; the boy is only a reflection in its dark edge. The power gives him words, not the person behind them.",
      stage: (t) => <EchoTrace at={TEST} t={t - wordAt("3.power", "stone")} />,
    },
  ],
});
