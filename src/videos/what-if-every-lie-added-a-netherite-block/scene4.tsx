import { cam, storyScene } from "../../engine";
import { Bits, timing, HERO, FLOAT, paradeStage, wordAt } from "./kit";

const SWITCH: [number, number, number] = [FLOAT[0] + 0.88, 1.22, FLOAT[2] + 0.18];

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The First Lie",
  shots: [
    {
      cue: "4.test",
      ...cam.push({ on: [HERO[0] + 0.45, 1.25, HERO[2] + 0.08], dist: 4.8, to: 4.1, yaw: 5, pitch: 4, fov: 41 }),
      zone: "parade",
      look: "overworld-day",
      note: "He gestures proudly at the new switch as if it is proven; the lantern is still intact and his pack is empty.",
      stage: paradeStage({
        packCount: 0,
        heroAnimation: "talk",
        heroArms: "point",
        heroFace: "smile",
        friendFace: "grin",
        lanternGlow: 0.42,
      }),
    },
    {
      cue: "4.block",
      ...cam.push({ on: [HERO[0] + 0.42, 1.4, HERO[2] - 0.18], dist: 3.8, to: 3.1, yaw: 20, pitch: 1, fov: 38 }),
      zone: "parade",
      look: "overworld-day",
      impacts: [{ at: wordAt("4.block", "slammed"), amp: 0.028, dur: 0.4 }],
      note: "Cut to his back as a Netherite cube drops into the private stack exactly on 'block'; the fresh weight bends his shoulders.",
      stage: paradeStage({
        packCount: 1,
        packArrivalAt: wordAt("4.block", "block"),
        heroAnimation: "stagger",
        heroArms: "ache",
        heroFace: "uneasy",
        extra: (t) => <Bits position={[HERO[0] + 0.4, 1.28, HERO[2] - 0.35]} t={t - wordAt("4.block", "slammed")} color="#55475f" count={6} power={0.24} seed={4} />,
      }),
    },
    {
      cue: "4.told",
      ...cam.push({ on: [0.15, 1.35, 25.8], dist: 4.5, to: 3.8, yaw: -8, pitch: 3, fov: 40 }),
      zone: "parade",
      look: "overworld-day",
      note: "He turns away from the cube and tells his friend the truth; it vanishes as 'never tested' lands, and the friend stays beside him.",
      stage: paradeStage({
        packCount: 1,
        packRemoveAfter: 0,
        packRemoveAt: wordAt("4.told", "never"),
        heroAnimation: "talk",
        heroArms: "reach",
        heroFace: "brave",
        friendFace: "calm",
        extra: (t) => <Bits position={[SWITCH[0], SWITCH[1], SWITCH[2]]} t={t - wordAt("4.told", "never")} color="#55475f" count={4} power={0.14} seed={41} />,
      }),
    },
  ],
});