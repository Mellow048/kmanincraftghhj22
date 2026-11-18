import { cam, storyScene } from "../../engine";
import { timing } from "./action";
import { Action } from "./kit";
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The gold seat",
  shots: [
    {
      cue: "2.gold",
      ...cam.push({
        on: [0.0, 0.94, -0.06],
        dist: 3.89,
        to: 3.14,
        yaw: -26.0,
        pitch: 14.0,
        fov: 40.0,
      }),
      zone: "cinema",
      note: "One gold chair in front of rows of red; swing in off the rope to reveal the prize.",
      stage: (t) => <Action cue="2.gold" t={t} />,
    },
    {
      cue: "2.win",
      ...cam.push({
        on: [0.0, 1.16, -0.17],
        dist: 3.1,
        to: 2.9,
        yaw: 4.0,
        pitch: 8.0,
        fov: 40.0,
      }),
      zone: "cinema",
      note: "The three pieces and the contest placard share the same vertical sightline.",
      stage: (t) => <Action cue="2.win" t={t} />,
    },
    {
      cue: "2.year",
      ...cam.push({
        on: [0.0, 1.24, -0.2],
        dist: 3.05,
        to: 2.88,
        yaw: 2.0,
        pitch: 2.0,
        fov: 40.0,
      }),
      zone: "cinema",
      note: "Closer on the one-year offer with its gold upholstery still underneath it.",
      stage: (t) => <Action cue="2.year" t={t} />,
    },
    {
      cue: "2.fame",
      ...cam.push({
        on: [-0.27, 1.58, 1.0],
        dist: 2.92,
        to: 2.62,
        yaw: 18.0,
        pitch: 4.0,
        fov: 37.0,
      }),
      zone: "cinema",
      note: "Hands up: he shrugs off fame while glancing back at the chair he actually wants.",
      stage: (t) => <Action cue="2.fame" t={t} />,
    },
    {
      cue: "2.fold",
      ...cam.push({
        on: [0.96, 1.06, 0.13],
        dist: 3.65,
        to: 3.24,
        yaw: -9.0,
        pitch: 9.0,
        fov: 40.0,
      }),
      zone: "cinema",
      note: "A regular red seat closes; his hands shoot up and his knees come forward.",
      stage: (t) => <Action cue="2.fold" t={t} />,
    },
  ],
});
