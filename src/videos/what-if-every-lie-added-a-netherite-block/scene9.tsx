import { cam, storyScene } from "../../engine";
import { Block } from "../../engine";
import { CloseKey, FRIEND, HERO, paradeStage, timing, wordAt } from "./kit";

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "I'm Fine",
  shots: [
    {
      cue: "9.friend",
      ...cam.push({ on: [0.1, 1.38, 26.0], dist: 4.4, to: 3.7, yaw: -8, pitch: 3, fov: 39 }),
      zone: "parade",
      look: "overworld-night",
      note: "The friend catches the tell the narrator misses: blue sweat pixels gather at his brow while four dark cubes press over his shoulder.",
      stage: paradeStage({
        packCount: 4,
        heroFace: "uneasy",
        friendFace: "uneasy",
        friendHeadPitch: 0.12,
        lanternBroken: true,
        lanternGlow: 0.08,
        extra: () => (
          <>
            <Block position={[HERO[0] + 0.16, 1.66, HERO[2] + 0.18]} size={[0.07, 0.13, 0.06]} color="#9bc9ec" emissive="#8ac8ff" emissiveIntensity={0.35} />
            <Block position={[HERO[0] + 0.36, 1.52, HERO[2] + 0.18]} size={[0.05, 0.1, 0.05]} color="#9bc9ec" emissive="#8ac8ff" emissiveIntensity={0.3} />
          </>
        ),
      }),
    },
    {
      cue: "9.fine",
      ...cam.push({ on: [0.12, 1.3, 26.0], dist: 3.9, to: 3.2, yaw: -12, pitch: 2, fov: 37 }),
      zone: "parade",
      look: "overworld-night",
      note: "His friend leans in to check on him, not the lantern; the teller's shoulders stay stiff under the growing weight.",
      stage: paradeStage({
        packCount: 4,
        heroAnimation: "ache",
        heroFace: "uneasy",
        friendAnimation: "reach",
        friendArms: "reach",
        friendFace: "calm",
        lanternBroken: true,
        lanternGlow: 0.08,
        extra: () => <Block position={[HERO[0] + 0.2, 1.68, HERO[2] + 0.19]} size={[0.06, 0.12, 0.05]} color="#9bc9ec" emissive="#8ac8ff" emissiveIntensity={0.35} />,
      }),
    },
    {
      cue: "9.lie",
      ...cam.push({ on: [HERO[0] + 0.38, 1.28, HERO[2] - 0.05], dist: 3.6, to: 2.9, yaw: 19, pitch: 2, fov: 36 }),
      zone: "parade",
      look: "overworld-night",
      note: "On 'fine', a fifth cube arrives behind his back while he forces a reassuring smile; his friend's reaching hand stays suspended.",
      stage: paradeStage({
        packCount: 5,
        packArrivalAt: wordAt("9.lie", "fine"),
        heroAnimation: "talk",
        heroArms: "guard",
        heroFace: "smile",
        friendFace: "uneasy",
        friendAnimation: "reach",
        friendArms: "reach",
        lanternBroken: true,
        lanternGlow: 0.08,
      }),
    },
    {
      cue: "9.breath",
      ...cam.push({ on: [HERO[0] + 0.05, 1.02, HERO[2] + 0.1], dist: 3.9, to: 3.3, yaw: 7, pitch: 0, fov: 40 }),
      zone: "parade",
      look: "overworld-night",
      handheld: 0.012,
      note: "The fifth block fills the upper edge of a compressed frame as he curls around his chest; the friend's open hand remains close enough to help.",
      stage: paradeStage({
        packCount: 5,
        heroAnimation: "crouch",
        heroArms: "ache",
        heroFace: "fear",
        heroHeadPitch: 0.18,
        friendAnimation: "reach",
        friendArms: "reach",
        friendFace: "fear",
        lanternBroken: true,
        lanternGlow: 0.08,
        extra: () => <CloseKey at={HERO} cold={11} warm={7} />,
      }),
    },
  ],
});