import { cam, storyScene } from "../../engine";
import { EmptyPack, SubscribeSign, timing, HERO, FRIEND, FLOAT, paradeStage } from "./kit";

const EMPTY: [number, number, number] = [FLOAT[0] - 0.55, 0.02, FLOAT[2] - 1.55];

export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "An Empty Pack",
  shots: [
    {
      cue: "14.action",
      ...cam.push({ on: [0.1, 1.2, FLOAT[2] - 1.2], dist: 7.2, to: 6.4, yaw: 180, pitch: 4, fov: 58 }),
      zone: "parade",
      look: "overworld-night",
      note: "He sets the now-ordinary empty pack beside their crooked glowing lantern; the friend waits next to him instead of watching him carry everything alone.",
      stage: paradeStage({
        packCount: 0,
        heroRotation: 2.4,
        friendRotation: -2.4,
        heroAnimation: "crouch",
        heroArms: "reach",
        heroFace: "smile",
        friendAnimation: "idle",
        friendFace: "smile",
        lanternGlow: 0.94,
        lanternTilt: -0.055,
        extra: () => <EmptyPack position={EMPTY} rotationY={-0.35} />,
      }),
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [0.1, 2.0, FLOAT[2] - 1.2], dist: 7.2, to: 6.4, yaw: 180, pitch: 7, fov: 60 }),
      zone: "parade",
      look: "overworld-night",
      note: "Final button: both friends face the lens beside the glowing lantern; the empty pack rests below a small SUBSCRIBE sign above it, closing the story's honesty theme.",
      stage: paradeStage({
        packCount: 0,
        heroRotation: Math.PI,
        friendRotation: Math.PI,
        heroAnimation: "wave",
        heroArms: "wave",
        heroFace: "grin",
        friendAnimation: "idle",
        friendFace: "grin",
        lanternGlow: 0.94,
        lanternTilt: -0.055,
        extra: () => (
          <>
            <EmptyPack position={EMPTY} rotationY={-0.35} />
            <SubscribeSign position={[0.1, 4.5, FLOAT[2] + 0.6]} rotationY={Math.PI} scale={0.9} tilt={-0.04} />
          </>
        ),
      }),
    },
  ],
});