import { cam, storyScene } from "../../engine";
import { Bits, timing, HERO, FRIEND, FLOAT, paradeStage, wordAt } from "./kit";

const SWITCH: [number, number, number] = [FLOAT[0] + 0.88, 1.22, FLOAT[2] + 0.18];
const HAND: [number, number, number] = [SWITCH[0] - 0.2, 1.18, SWITCH[2] + 0.28];

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The Switch Breaks",
  shots: [
    {
      cue: "6.accident",
      ...cam.push({ on: [0.45, 1.45, 26.1], dist: 4.4, to: 3.6, yaw: 12, pitch: 4, fov: 39 }),
      zone: "parade",
      look: "overworld-night",
      handheld: 0.009,
      impacts: [{ at: wordAt("6.accident", "snapped"), amp: 0.022, dur: 0.34 }],
      note: "The teller showboats with one hand at the lantern switch; on 'snapped', sparks and the red fault light reveal that he broke the part he just claimed to test.",
      stage: paradeStage({
        packCount: 0,
        heroAt: [0.65, 0, HERO[2] - 0.05],
        heroAnimation: "press",
        heroArms: "press",
        heroFace: "grin",
        friendAt: [FRIEND[0] + 0.7, 0, FRIEND[2] - 0.1],
        friendFace: "wow",
        lanternGlow: 0.92,
        lanternBrokenAt: wordAt("6.accident", "snapped"),
        extra: (t) => <Bits position={SWITCH} t={t - wordAt("6.accident", "snapped")} color="#ff743e" count={8} power={0.65} seed={23} />,
      }),
    },
    {
      cue: "6.deny",
      ...cam.push({ on: [0.55, 1.35, 26.2], dist: 3.8, to: 3.1, yaw: -13, pitch: 2, fov: 37 }),
      zone: "parade",
      look: "overworld-night",
      note: "A tight two-shot catches the lie and the friend's startled eyes; the red switch stays visibly broken while the teller avoids his gaze.",
      stage: paradeStage({
        packCount: 0,
        heroAt: [0.68, 0, HERO[2] - 0.02],
        heroAnimation: "talk",
        heroArms: "guard",
        heroFace: "uneasy",
        heroGaze: -1,
        friendFace: "wow",
        lanternBroken: true,
        lanternGlow: 0.12,
      }),
    },
    {
      cue: "6.weight",
      ...cam.push({ on: [HERO[0] + 0.36, 1.25, HERO[2] - 0.1], dist: 3.8, to: 3.1, yaw: 19, pitch: 2, fov: 37 }),
      zone: "parade",
      look: "overworld-night",
      note: "On 'block', the first post-confession lie adds a cube to the same pack; his shoulders dip while the friend's attention is still on the ruined switch.",
      stage: paradeStage({
        packCount: 1,
        packArrivalAt: wordAt("6.weight", "block"),
        heroAnimation: "stagger",
        heroArms: "ache",
        heroFace: "uneasy",
        friendFace: "uneasy",
        lanternBroken: true,
        lanternGlow: 0.1,
        extra: (t) => <Bits position={[HERO[0] + 0.38, 1.28, HERO[2] - 0.32]} t={t - wordAt("6.weight", "dragged")} color="#51445b" count={5} power={0.22} seed={61} />,
      }),
    },
    {
      cue: "6.hide",
      ...cam.push({ on: [0.0, 1.3, 25.9], dist: 4.4, to: 3.8, yaw: -5, pitch: 3, fov: 40 }),
      zone: "parade",
      look: "overworld-night",
      note: "He forces a smile and turns his shoulders to hide the growing weight; his friend stays worried and does not look at the invisible stack.",
      stage: paradeStage({
        packCount: 1,
        heroAnimation: "shrug",
        heroArms: "guard",
        heroFace: "smile",
        friendFace: "uneasy",
        friendHeadPitch: 0.12,
        lanternBroken: true,
        lanternGlow: 0.1,
      }),
    },
  ],
});