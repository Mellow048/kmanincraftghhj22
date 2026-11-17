import { cam, storyScene } from "../../engine";
import { Block } from "../../engine";
import { CloseKey, FLOAT, HERO, NightWash, paradeStage, timing, wordAt } from "./kit";

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "A Red Light",
  shots: [
    {
      cue: "8.red",
      ...cam.push({ on: [FLOAT[0] + 0.5, 1.35, FLOAT[2] + 0.55], dist: 3.2, to: 2.7, yaw: 8, pitch: 0, fov: 35 }),
      zone: "parade",
      look: "overworld-night",
      note: "A close-up makes the red fault lamp unmistakable inside the lantern; the three cubes stay visible behind the teller's shoulder.",
      stage: paradeStage({
        packCount: 3,
        heroAt: [HERO[0] + 0.3, 0, HERO[2]],
        heroFace: "uneasy",
        friendFace: "uneasy",
        lanternBroken: true,
        lanternGlow: 0.08,
      }),
    },
    {
      cue: "8.lie",
      ...cam.push({ on: [0.18, 1.38, 26.05], dist: 6.8, to: 6.1, yaw: 180, pitch: 3, fov: 60 }),
      zone: "parade",
      look: "overworld-night",
      note: "The teller waves toward the dead red light as if it is warming up; his friend's still posture quietly contradicts the reassurance.",
      stage: paradeStage({
        packCount: 4,
        packArrivalAt: wordAt("8.lie", "warming"),
        heroRotation: 2.4,
        friendRotation: -2.4,
        heroAnimation: "talk",
        heroArms: "guard",
        heroFace: "uneasy",
        friendFace: "frown",
        friendHeadPitch: 0.1,
        lanternBroken: true,
        lanternGlow: 0.08,
      }),
    },
    {
      cue: "8.weight",
      ...cam.push({ on: [HERO[0] + 0.2, 0.9, HERO[2] + 0.05], dist: 4.0, to: 3.3, yaw: 13, pitch: -4, fov: 38 }),
      zone: "parade",
      look: "overworld-night",
      note: "A slow, off-balance step toward the cart shows the fourth cube changing his movement, not just adding a symbol to the frame.",
      stage: paradeStage({
        packCount: 4,
        heroAt: (t) => [HERO[0] + Math.min(0.38, t * 0.24), 0, HERO[2] - Math.min(0.12, t * 0.07)],
        heroAnimation: "stagger",
        heroArms: "ache",
        heroFace: "ouch",
        friendFace: "uneasy",
        lanternBroken: true,
        lanternGlow: 0.08,
        extra: (t) => (
          <>
            <NightWash cold={0.22} warm={0.12} />
            <CloseKey at={HERO} cold={13} warm={9} />
            <Block position={[HERO[0] + 0.55, 1.3, HERO[2] - 0.28]} size={[0.055, 0.055, 0.055]} color="#aebbe6" emissive="#8299e9" emissiveIntensity={0.6} opacity={Math.max(0, 0.6 - t * 0.3)} transparent castShadow={false} />
          </>
        ),
      }),
    },
  ],
});