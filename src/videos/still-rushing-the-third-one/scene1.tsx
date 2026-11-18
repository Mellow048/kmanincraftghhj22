import { cam, storyScene } from "../../engine";
import { timing } from "./action";
import { Action } from "./kit";
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Third kernel",
  shots: [
    {
      cue: "1.trial",
      ...cam.push({
        on: [0.0, 1.53, 0.17],
        dist: 3.65,
        to: 3.37,
        yaw: -8.0,
        pitch: 4.0,
        fov: 40.0,
      }),
      zone: "cinema",
      note: "Start on the first flick: keep the raised hand, mouth, forehead and striped bucket in one frame.",
      stage: (t) => <Action cue="1.trial" t={t} />,
    },
    {
      cue: "1.two",
      ...cam.push({
        on: [-0.12, 1.73, 0.19],
        dist: 3.06,
        to: 2.84,
        yaw: -29.0,
        pitch: 7.0,
        fov: 39.0,
      }),
      zone: "cinema",
      note: "Slow the same trajectory down from the throwing side so the forehead bounce has a destination.",
      stage: (t) => <Action cue="1.two" t={t} />,
    },
    {
      cue: "1.best",
      ...cam.push({
        on: [-0.03, 1.79, 0.12],
        dist: 2.15,
        to: 2.0,
        yaw: 14.0,
        pitch: -2.0,
        fov: 34.0,
      }),
      zone: "cinema",
      note: "A tiny proud nod even though the evidence is sitting in his bucket.",
      stage: (t) => <Action cue="1.best" t={t} />,
    },
    {
      cue: "1.drink",
      ...cam.push({
        on: [0.97, 1.38, -0.18],
        dist: 3.16,
        to: 2.78,
        yaw: 5.0,
        pitch: 6.0,
        fov: 37.0,
      }),
      zone: "cinema",
      note: "Bea moves her turquoise soda out of his range without taking her eyes off him.",
      stage: (t) => <Action cue="1.drink" t={t} />,
    },
    {
      cue: "1.book",
      ...cam.push({
        on: [0.12, 1.34, 0.29],
        dist: 3.46,
        to: 2.84,
        yaw: 15.0,
        pitch: 10.0,
        fov: 38.0,
      }),
      zone: "cinema",
      note: "Follow the little notebook up from his lap into the space between them.",
      stage: (t) => <Action cue="1.book" t={t} />,
    },
    {
      cue: "1.day",
      ...cam.push({
        on: [0.035, 1.23, 0.43],
        dist: 2.28,
        to: 2.17,
        yaw: 3.0,
        pitch: 4.0,
        fov: 39.0,
      }),
      zone: "cinema",
      note: "Read the actual forty-seventh entry and underlined last word on the page, not a floating title.",
      stage: (t) => <Action cue="1.day" t={t} />,
    },
  ],
});
