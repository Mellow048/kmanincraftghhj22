import { cam, storyScene } from "../../engine";
import { Bits, Classmate, FLOAT, FRIEND, HERO, NightWash, StreetFill, paradeStage, timing, wordAt } from "./kit";

export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "Together, It Lights",
  shots: [
    {
      cue: "13.release",
      ...cam.push({ on: [0.2, 1.0, 25.8], dist: 7.0, to: 6.2, yaw: 180, pitch: 3, fov: 56 }),
      zone: "parade",
      look: "overworld-night",
      handheld: 0.008,
      note: "A last smoky afterimage drifts off the now-empty pack as the friend grips the teller's wrist and helps him stand; the rope remains in the friend's other hand.",
      stage: paradeStage({
        packCount: 0,
        heroRotation: 2.25,
        friendRotation: -2.25,
        heroAnimation: "standUp",
        heroArms: "reach",
        heroFace: "brave",
        friendAnimation: "reach",
        friendArms: "reach",
        friendFace: "smile",
        lanternBroken: true,
        lanternGlow: 0.08,
        extra: (t) => <Bits position={[HERO[0] + 0.4, 1.42, HERO[2] - 0.26]} t={t - wordAt("13.release", "disappeared")} color="#51445b" count={11} power={0.34} seed={131} />,
      }),
    },
    {
      cue: "13.repair",
      ...cam.push({ on: [0.1, 1.25, 26.4], dist: 4.2, to: 3.5, yaw: 6, pitch: 2, fov: 39 }),
      zone: "parade",
      look: "overworld-night",
      note: "The two friends work side by side: the teller reaches the switch, the friend steadies the rope, and its red indicator flips green on the word 'switch'.",
      stage: paradeStage({
        packCount: 0,
        heroAt: [HERO[0] + 0.5, 0, HERO[2] - 0.18],
        heroAnimation: "reach",
        heroArms: "reach",
        heroFace: "brave",
        friendAnimation: "hold",
        friendArms: "hold",
        friendFace: "smile",
        lanternBroken: true,
        lanternRepairAt: wordAt("13.repair", "switch"),
        lanternGlow: 0.25,
        lanternSwing: 0.025,
        floatTilt: -0.01,
      }),
    },
    {
      cue: "13.light",
      ...cam.push({ on: [0.0, 2.05, 26.6], dist: 6.0, to: 5.1, yaw: -2, pitch: 8, fov: 46 }),
      zone: "parade",
      look: "overworld-night",
      note: "The lantern returns, slightly crooked but bright; warm light reaches the friends and a few waiting parade kids who cheer in the street.",
      stage: paradeStage({
        packCount: 0,
        heroAnimation: "cheer",
        heroArms: "cheer",
        heroFace: "grin",
        friendAnimation: "cheer",
        friendArms: "cheer",
        friendFace: "grin",
        lanternBroken: false,
        lanternGlow: 1,
        lanternTilt: -0.055,
        lanternSwing: 0.018,
        floatTilt: -0.015,
        extra: () => (
          <>
            <NightWash cold={0.5} warm={0.34} />
            <StreetFill at={[0, 0, 26.9]} intensity={36} color="#ffc98a" />
            <Classmate who={2} position={[-3.0, 0, 26.7]} rotationY={0} animation="cheer" face="grin" />
            <Classmate who={5} position={[3.1, 0, 27.1]} rotationY={0} animation="cheer" face="smile" />
            <Classmate who={8} position={[-2.6, 0, 29.2]} rotationY={0} animation="cheer" face="grin" />
          </>
        ),
      }),
    },
  ],
});