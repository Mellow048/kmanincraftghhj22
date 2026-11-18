import { cam, storyScene } from "../../engine";
import { timing } from "./action";
import { Action } from "./kit";
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Friday final",
  shots: [
    {
      cue: "6.full",
      ...cam.push({
        on: [0.04, 1.16, -1.29],
        dist: 5.79,
        to: 5.32,
        yaw: -20.0,
        pitch: 17.0,
        fov: 47.0,
      }),
      zone: "cinema",
      note: "The Friday audience fills stepped rows behind the prize and the uniformed usher.",
      stage: (t) => <Action cue="6.full" t={t} />,
    },
    {
      cue: "6.rope",
      ...cam.push({
        on: [0.42, 1.08, 0.27],
        dist: 3.17,
        to: 2.92,
        yaw: 17.0,
        pitch: 12.0,
        fov: 39.0,
      }),
      zone: "cinema",
      note: "Gold posts frame the usher's hand lifting the velvet rope out of the way.",
      stage: (t) => <Action cue="6.rope" t={t} />,
    },
    {
      cue: "6.pick",
      ...cam.push({
        on: [0.12, 1.05, 0.15],
        dist: 3.68,
        to: 3.31,
        yaw: -17.0,
        pitch: 21.0,
        fov: 42.0,
      }),
      zone: "cinema",
      note: "Set the striped bucket all the way down; no fourth grab this time.",
      stage: (t) => <Action cue="6.pick" t={t} />,
    },
    {
      cue: "6.two",
      ...cam.push({
        on: [-0.02, 1.5, 0.16],
        dist: 3.52,
        to: 3.32,
        yaw: 6.0,
        pitch: 7.0,
        fov: 39.0,
      }),
      zone: "cinema",
      note: "Two clean tosses in a steady front view, then the throwing hand stays open.",
      stage: (t) => <Action cue="6.two" t={t} />,
    },
    {
      cue: "6.three",
      ...cam.push({
        on: [-0.05, 1.75, 0.19],
        dist: 2.98,
        to: 2.82,
        yaw: -12.0,
        pitch: 2.0,
        fov: 39.0,
      }),
      zone: "cinema",
      note: "The long arc comes straight down into his mouth; no chant over the real contest.",
      stage: (t) => <Action cue="6.three" t={t} />,
    },
  ],
});
