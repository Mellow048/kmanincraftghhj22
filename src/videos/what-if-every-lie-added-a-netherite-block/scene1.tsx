import { cam, storyScene } from "../../engine";
import { Bits, CloseKey, FRIEND, HERO, paradeStage, timing, wordAt } from "./kit";

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "One Block",
  shots: [
    {
      cue: "1.what",
      ...cam.push({ on: [0, 1.45, 25.8], dist: 8.0, to: 7.2, yaw: 180, pitch: 8, fov: 60 }),
      zone: "parade",
      look: "overworld-storm",
      handheld: 0.012,
      note: "The question opens on its power already at work: a dark Netherite cube appears behind the teller as a storm swings the parade lantern. His friend sees the lantern, not the cube.",
      stage: paradeStage({
        packCount: 1,
        packArrivalAt: wordAt("1.what", "block"),
        heroRotation: 2.4,
        heroAnimation: "stagger",
        heroArms: "cower",
        heroFace: "fear",
        friendAnimation: "reach",
        friendArms: "hold",
        friendFace: "fear",
        lanternBroken: true,
        lanternGlow: 0.16,
        lanternSwing: 0.14,
        floatTilt: 0.035,
      }),
    },
    {
      cue: "1.weight",
      ...cam.push({ on: [HERO[0] + 0.05, 0.98, HERO[2] + 0.1], dist: 4.1, to: 3.5, yaw: 9, pitch: 2, fov: 42 }),
      zone: "parade",
      look: "overworld-storm",
      handheld: 0.014,
      impacts: [{ at: wordAt("1.weight", "knees"), amp: 0.025, dur: 0.42 }],
      note: "Cut low and close as the single invisible-to-his-friend block buckles his knees; the open hand and taut rope keep the lantern and the danger in the same picture.",
      stage: paradeStage({
        packCount: 1,
        heroAnimation: "crouch",
        heroArms: "cower",
        heroFace: "ouch",
        heroHeadPitch: 0.15,
        friendAt: [FRIEND[0], FRIEND[1], FRIEND[2] - 0.25],
        friendAnimation: "reach",
        friendArms: "hold",
        friendFace: "fear",
        lanternBroken: true,
        lanternGlow: 0.12,
        lanternSwing: 0.16,
        extra: (t) => (
          <>
            <CloseKey at={HERO} />
            <Bits position={[HERO[0] + 0.32, 1.18, HERO[2] - 0.1]} t={t - wordAt("1.weight", "buckle")} color="#41384a" count={7} power={0.28} seed={17} />
          </>
        ),
      }),
    },
  ],
});