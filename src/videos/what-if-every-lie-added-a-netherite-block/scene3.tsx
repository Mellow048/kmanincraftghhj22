import { cam, storyScene } from "../../engine";
import { Block, Glow } from "../../engine";
import { timing, HERO, FRIEND, paradeStage, wordAt } from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The Rule and the Limit",
  shots: [
    {
      cue: "3.rule",
      ...cam.push({ on: [HERO[0] + 0.28, 1.25, HERO[2]], dist: 4.4, to: 3.7, yaw: 14, pitch: 2, fov: 39 }),
      zone: "parade",
      look: "overworld-day",
      note: "One dark cube arrives behind his shoulder on the word 'one': the supernatural rule is physical, visible, and consistent with the hook.",
      stage: paradeStage({
        packCount: 1,
        packArrivalAt: wordAt("3.rule", "one"),
        heroAnimation: "idle",
        heroFace: "uneasy",
        friendFace: "calm",
      }),
    },
    {
      cue: "3.secret",
      ...cam.push({ on: [0.4, 1.38, 26.0], dist: 5.2, to: 4.4, yaw: 13, pitch: 5, fov: 43 }),
      zone: "parade",
      look: "overworld-day",
      note: "The friend stays intent on the lantern while the cube sits in the teller's eyeline; a side angle makes the private visual rule plain without a label.",
      stage: paradeStage({
        packCount: 1,
        heroFace: "wow",
        heroGaze: 1,
        friendAt: [FRIEND[0], 0, FRIEND[2] - 0.4],
        friendFace: "grin",
        friendAnimation: "hold",
        friendArms: "hold",
      }),
    },
    {
      cue: "3.truth",
      ...cam.push({ on: [0.05, 1.22, 26.3], dist: 4.3, to: 3.7, yaw: -12, pitch: 2, fov: 39 }),
      zone: "parade",
      look: "overworld-day",
      note: "The teller looks his friend in the eye; the one cube shrinks away as a truthful admission removes its matching weight.",
      stage: paradeStage({
        packCount: 1,
        packRemoveAfter: 0,
        packRemoveAt: wordAt("3.truth", "cleared"),
        heroAnimation: "talk",
        heroArms: "reach",
        heroFace: "brave",
        friendFace: "calm",
        extra: (t) => <Glow position={[HERO[0] + 0.38, 1.3, HERO[2] - 0.24]} size={1.0} color="#b294d5" opacity={0.22 * Math.max(0, 1 - t)} />,
      }),
    },
    {
      cue: "3.limit",
      ...cam.push({ on: [HERO[0] + 0.25, 1.52, HERO[2] + 0.02], dist: 3.5, to: 2.9, yaw: 17, pitch: 4, fov: 36 }),
      zone: "parade",
      look: "overworld-day",
      note: "With no words or symbols on the cube, the teller searches it for a clue and finds nothing; the magic adds weight, not answers.",
      stage: paradeStage({
        packCount: 1,
        heroAnimation: "lookAround",
        heroArms: "reach",
        heroFace: "uneasy",
        showFriend: false,
      }),
    },
    {
      cue: "3.danger",
      ...cam.push({ on: [HERO[0] + 0.12, 0.82, HERO[2] + 0.08], dist: 4.1, to: 3.4, yaw: 8, pitch: -5, fov: 37 }),
      zone: "parade",
      look: "overworld-day",
      note: "A five-cube stack compresses the teller into a crouch, planting the real danger before the later lies build to it.",
      stage: paradeStage({
        packCount: 5,
        heroAnimation: "crouch",
        heroArms: "cower",
        heroFace: "fear",
        friendFace: "uneasy",
        friendHeadPitch: 0.1,
      }),
    },
  ],
});