import { cam, storyScene } from "../../engine";
import { timing, HERO, FRIEND, FLOAT, paradeStage } from "./kit";

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The Lantern",
  shots: [
    {
      cue: "2.day",
      ...cam.push({ on: [0, 1.55, 25.9], dist: 8.8, to: 7.8, yaw: -2, pitch: 7, fov: 52 }),
      zone: "parade",
      look: "overworld-day",
      note: "A bright daytime wide makes the parade route legible before the night storm returns. The two friends lift the tall lantern frame onto their cart together.",
      stage: paradeStage({
        packCount: 0,
        heroAt: [HERO[0], 0, HERO[2] - 0.65],
        heroAnimation: "lift",
        heroArms: "hold",
        heroFace: "grin",
        friendAt: [FRIEND[0], 0, FRIEND[2] - 0.65],
        friendAnimation: "lift",
        friendArms: "hold",
        friendFace: "smile",
        lanternAt: [FLOAT[0], FLOAT[1] + 0.35, FLOAT[2]],
        lanternGlow: 0.32,
        showFloat: true,
      }),
    },
    {
      cue: "2.goal",
      ...cam.push({ on: [0, 2.55, 26.8], dist: 6.2, to: 5.3, yaw: 5, pitch: 15, fov: 45 }),
      zone: "parade",
      look: "overworld-day",
      note: "A low hero angle makes the lantern feel giant above the small cart; the blue ribbon on the float plants the prize they hope to win.",
      stage: paradeStage({
        packCount: 0,
        heroAnimation: "hold",
        heroArms: "hold",
        heroFace: "grin",
        friendAnimation: "hold",
        friendArms: "hold",
        friendFace: "grin",
        lanternGlow: 0.48,
        extra: () => null,
      }),
    },
  ],
});