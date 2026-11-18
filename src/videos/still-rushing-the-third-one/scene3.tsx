import { cam, storyScene } from "../../engine";
import { timing } from "./action";
import { Action } from "./kit";
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Kitchen drills",
  shots: [
    {
      cue: "3.friday",
      ...cam.push({
        on: [0.0, 1.49, -1.38],
        dist: 5.34,
        to: 5.16,
        yaw: -3.0,
        pitch: 6.0,
        fov: 54.0,
      }),
      zone: "street",
      note: "The Friday crowd is moving under the illuminated marquee, not standing at a party sign.",
      stage: (t) => <Action cue="3.friday" t={t} />,
    },
    {
      cue: "3.stay",
      ...cam.push({
        on: [-0.03, 1.34, -0.17],
        dist: 4.38,
        to: 3.96,
        yaw: 16.0,
        pitch: 11.0,
        fov: 42.0,
      }),
      zone: "kitchen",
      note: "Hard cut from the warm street to tiled mint kitchen and a familiar bucket.",
      stage: (t) => <Action cue="3.stay" t={t} />,
    },
    {
      cue: "3.same",
      ...cam.push({
        on: [0.8, 1.28, 0.35],
        dist: 2.08,
        to: 1.95,
        yaw: 1.0,
        pitch: 6.0,
        fov: 37.0,
      }),
      zone: "kitchen",
      note: "The phone on its stand records his very serious while-they-are-out-partying practice video.",
      stage: (t) => <Action cue="3.same" t={t} />,
    },
    {
      cue: "3.same",
      cut: 1.36,
      ...cam.push({
        on: [0.025, 1.17, 0.2],
        dist: 3.16,
        to: 2.9,
        yaw: -19.0,
        pitch: 13.0,
        fov: 41.0,
      }),
      zone: "kitchen",
      note: "Reverse from the phone to the actor adjusting his hand to its mark.",
      stage: (t) => <Action cue="3.same" t={t + 1.36} />,
    },
    {
      cue: "3.ceiling",
      ...cam.push({
        on: [-0.14, 2.1, -0.02],
        dist: 3.09,
        to: 2.92,
        yaw: -14.0,
        pitch: -7.0,
        fov: 42.0,
      }),
      zone: "kitchen",
      note: "The hanging lamp is just above his head. His eyes find it before the next set.",
      stage: (t) => <Action cue="3.ceiling" t={t} />,
    },
    {
      cue: "3.reps",
      ...cam.push({
        on: [-0.02, 1.52, -0.54],
        dist: 5.33,
        to: 5.15,
        yaw: 3.0,
        pitch: 20.0,
        fov: 44.0,
      }),
      zone: "kitchen",
      note: "Three practice flicks in one view; trace each piece away from his hand toward its target.",
      stage: (t) => <Action cue="3.reps" t={t} />,
    },
  ],
});
