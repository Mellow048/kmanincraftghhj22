import { cam, storyScene } from "../../engine";
import { Bits, SoundRings, timing, HERO, FRIEND, paradeStage, wordAt } from "./kit";

export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The First Confession",
  shots: [
    {
      cue: "11.admit",
      ...cam.push({ on: [0.1, 1.0, 26.0], dist: 3.9, to: 3.2, yaw: -7, pitch: 1, fov: 37 }),
      zone: "parade",
      look: "overworld-storm",
      handheld: 0.01,
      note: "He finally meets his friend's eyes and owns the broken switch; as 'broke' lands, one cube leaves the five-block stack.",
      stage: paradeStage({
        packCount: 5,
        packRemoveAfter: 4,
        packRemoveAt: wordAt("11.admit", "broke"),
        heroAnimation: "talk",
        heroArms: "reach",
        heroFace: "brave",
        friendAnimation: "hold",
        friendArms: "hold",
        friendFace: "calm",
        lanternBroken: true,
        lanternGlow: 0.06,
        extra: (t) => (
          <>
            <SoundRings position={[HERO[0], 1.55, HERO[2] + 0.24]} t={t - wordAt("11.admit", "broke")} color="#d9d9ff" reach={1.1} />
            <Bits position={[HERO[0] + 0.45, 1.45, HERO[2] - 0.28]} t={t - wordAt("11.admit", "broke")} color="#51445b" count={7} power={0.26} seed={91} />
          </>
        ),
      }),
    },
    {
      cue: "11.spare",
      ...cam.push({ on: [0.22, 1.05, 26.0], dist: 3.8, to: 3.1, yaw: 9, pitch: 1, fov: 36 }),
      zone: "parade",
      look: "overworld-storm",
      handheld: 0.01,
      note: "He admits the spare switch never existed; a second cube vanishes on 'spare', while the friend keeps one hand on the rope.",
      stage: paradeStage({
        packCount: 4,
        packRemoveAfter: 3,
        packRemoveAt: wordAt("11.spare", "spare"),
        heroAnimation: "talk",
        heroArms: "reach",
        heroFace: "brave",
        friendAnimation: "hold",
        friendArms: "hold",
        friendFace: "calm",
        lanternBroken: true,
        lanternGlow: 0.06,
        extra: (t) => <Bits position={[HERO[0] + 0.46, 1.4, HERO[2] - 0.27]} t={t - wordAt("11.spare", "spare")} color="#51445b" count={6} power={0.24} seed={92} />,
      }),
    },
    {
      cue: "11.vanish",
      ...cam.push({ on: [HERO[0] + 0.25, 1.05, HERO[2] - 0.06], dist: 4.0, to: 3.25, yaw: 18, pitch: 2, fov: 38 }),
      zone: "parade",
      look: "overworld-storm",
      handheld: 0.009,
      note: "The shot holds on his chest rising as two more cubes fade out of the five; the three still attached keep him on his knees.",
      stage: paradeStage({
        packCount: 5,
        packRemoveAfter: 3,
        packRemoveAt: 0,
        heroAnimation: "crouch",
        heroArms: "ache",
        heroFace: "uneasy",
        friendAnimation: "hold",
        friendArms: "hold",
        friendFace: "calm",
        lanternBroken: true,
        lanternGlow: 0.06,
      }),
    },
  ],
});