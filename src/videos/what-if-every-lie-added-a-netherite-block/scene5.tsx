import { cam, storyScene } from "../../engine";
import { timing, HERO, FRIEND, FLOAT, paradeStage } from "./kit";

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The Blue Ribbon",
  shots: [
    {
      cue: "5.proud",
      ...cam.push({ on: [0.1, 1.16, FLOAT[2] + 0.4], dist: 4.9, to: 4.2, yaw: 7, pitch: 2, fov: 40 }),
      zone: "parade",
      look: "overworld-day",
      note: "The teller's finger lands beside the blue ribbon on their finished float; the prize is a small, readable goal under the lantern he is proud of.",
      stage: paradeStage({
        packCount: 0,
        heroAnimation: "point",
        heroArms: "point",
        heroFace: "grin",
        friendAt: [FRIEND[0] + 0.25, 0, FRIEND[2] - 0.3],
        friendFace: "smile",
        lanternGlow: 0.45,
      }),
    },
    {
      cue: "5.friend",
      ...cam.push({ on: [0.1, 1.25, 25.9], dist: 4.9, to: 4.2, yaw: -9, pitch: 3, fov: 42 }),
      zone: "parade",
      look: "overworld-day",
      note: "His friend answers the fear before anything breaks: one steady hand on the teller's shoulder, the other held toward the lantern, their shared repair plan planted in a two-shot.",
      stage: paradeStage({
        packCount: 0,
        heroAnimation: "idle",
        heroFace: "smile",
        friendAnimation: "reach",
        friendArms: "reach",
        friendFace: "grin",
        lanternGlow: 0.48,
      }),
    },
  ],
});