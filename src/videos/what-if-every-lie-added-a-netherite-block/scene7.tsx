import { cam, storyScene } from "../../engine";
import { Block } from "../../engine";
import { CloseKey, FLOAT, FRIEND, HERO, paradeStage, timing, wordAt } from "./kit";

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Two More Lies",
  shots: [
    {
      cue: "7.fix",
      ...cam.push({ on: [0.25, 1.2, 26.0], dist: 4.6, to: 3.9, yaw: 8, pitch: 2, fov: 40 }),
      zone: "parade",
      look: "overworld-night",
      note: "The friend holds the lantern steady and offers the broken switch toward the teller; he gets a clear chance to accept help.",
      stage: paradeStage({
        packCount: 1,
        heroAnimation: "crouch",
        heroArms: "ache",
        heroFace: "uneasy",
        friendAnimation: "reach",
        friendArms: "reach",
        friendFace: "calm",
        lanternBroken: true,
        lanternGlow: 0.1,
      }),
    },
    {
      cue: "7.lie",
      ...cam.push({ on: [HERO[0] + 0.33, 1.25, HERO[2] + 0.05], dist: 3.7, to: 3.0, yaw: 18, pitch: 2, fov: 36 }),
      zone: "parade",
      look: "overworld-night",
      note: "He refuses the offered hand and points at himself, making 'by myself' visible as a lonely choice; a second cube begins to join his pack.",
      stage: paradeStage({
        packCount: 2,
        packArrivalAt: wordAt("7.lie", "myself"),
        heroAnimation: "point",
        heroArms: "point",
        heroFace: "uneasy",
        friendAnimation: "reach",
        friendArms: "reach",
        friendFace: "uneasy",
        lanternBroken: true,
        lanternGlow: 0.1,
      }),
    },
    {
      cue: "7.spare",
      ...cam.push({ on: [HERO[0] + 0.1, 0.95, HERO[2] + 0.12], dist: 3.6, to: 2.9, yaw: -10, pitch: -3, fov: 36 }),
      zone: "parade",
      look: "overworld-night",
      note: "He turns out an empty pocket instead of a spare switch and still claims one exists; the third block makes the stack wider.",
      stage: paradeStage({
        packCount: 3,
        packArrivalAt: wordAt("7.spare", "spare"),
        heroAnimation: "lookAround",
        heroArms: "guard",
        heroFace: "uneasy",
        friendFace: "uneasy",
        lanternBroken: true,
        lanternGlow: 0.1,
        extra: () => (
          <>
            <CloseKey at={HERO} />
            <Block position={[HERO[0] + 0.25, 0.9, HERO[2] + 0.48]} size={[0.22, 0.14, 0.03]} color="#4d3a2b" rotation={[0, 0, -0.2]} />
          </>
        ),
      }),
    },
    {
      cue: "7.blocks",
      ...cam.push({ on: [0.1, 0.84, HERO[2] + 0.14], dist: 4.0, to: 3.5, yaw: 7, pitch: -2, fov: 40 }),
      zone: "parade",
      look: "overworld-night",
      note: "A low frame counts three heavy cubes by the teller's bent knees, while his friend alone keeps the lantern upright beside him.",
      stage: paradeStage({
        packCount: 3,
        heroAnimation: "crouch",
        heroArms: "cower",
        heroFace: "fear",
        friendAnimation: "hold",
        friendArms: "hold",
        friendFace: "uneasy",
        lanternBroken: true,
        lanternGlow: 0.1,
        extra: () => <CloseKey at={HERO} />,
      }),
    },
  ],
});