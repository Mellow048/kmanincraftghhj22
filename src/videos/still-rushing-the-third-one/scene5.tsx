import { cam, storyScene } from "../../engine";
import { timing } from "./action";
import { Action } from "./kit";
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The missing beat",
  shots: [
    {
      cue: "5.watch",
      ...cam.push({
        on: [0.3, 1.4, 0.12],
        dist: 3.6,
        to: 3.31,
        yaw: 18.0,
        pitch: 10.0,
        fov: 42.0,
      }),
      zone: "kitchen",
      note: "Bea points down at the hand, not up at the popcorn; keep her eyes and the hand in shot.",
      stage: (t) => <Action cue="5.watch" t={t} />,
    },
    {
      cue: "5.reach",
      ...cam.push({
        on: [-0.08, 1.59, 0.22],
        dist: 3.31,
        to: 3.03,
        yaw: -49.0,
        pitch: 7.0,
        fov: 39.0,
      }),
      zone: "kitchen",
      note: "Replay from the side: the third kernel is still in the air while the next reach begins.",
      stage: (t) => <Action cue="5.reach" t={t} />,
    },
    {
      cue: "5.bucket",
      ...cam.push({
        on: [0.3, 1.12, 0.35],
        dist: 2.46,
        to: 2.23,
        yaw: -13.0,
        pitch: 20.0,
        fov: 39.0,
      }),
      zone: "kitchen",
      note: "Now the palm is back at the tub; the falling third kernel beats it there.",
      stage: (t) => <Action cue="5.bucket" t={t} />,
    },
    {
      cue: "5.what",
      ...cam.push({
        on: [0.14, 1.48, 0.23],
        dist: 3.02,
        to: 2.88,
        yaw: 10.0,
        pitch: 3.0,
        fov: 39.0,
      }),
      zone: "kitchen",
      note: "Let the empty palm come up into the same frame as his puzzled face.",
      stage: (t) => <Action cue="5.what" t={t} />,
    },
    {
      cue: "5.drill",
      ...cam.push({
        on: [-0.05, 1.55, 0.16],
        dist: 3.8,
        to: 3.54,
        yaw: -13.0,
        pitch: 5.0,
        fov: 39.0,
      }),
      zone: "kitchen",
      note: "Run the corrected drill without cutting the longer pause before the third toss.",
      stage: (t) => <Action cue="5.drill" t={t} />,
    },
  ],
});
