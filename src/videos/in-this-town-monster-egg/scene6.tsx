import type React from "react";
import { Torch, cam, storyScene } from "../../engine";
import { MonsterEgg, SoundRings } from "../../../Topics/InThisTown/creatures";
import { Blanket, CARRIED, EAST, Hero, TABLE_EGG, jolt, room, timing, wordAt } from "./kit";

const EGG = TABLE_EGG;
const EGG_MID: [number, number, number] = [EGG[0], EGG[1] + 0.22, EGG[2]];
/** Lying in bed, head on the pillow. */
export const IN_BED = room(-1.0, 0.2, -1.28);
/** Sitting on the edge of the bed, facing the bedside table. */
export const ON_BED = room(-1.2, 0.2, -1.85);
/** Where he looks when he looks at the egg: a little over it, so his chin stays up. */
export const EGG_GAZE: [number, number, number] = [EGG[0], EGG[1] + 0.75, EGG[2]];
const TAPS = [0, 1, 2].map((n) => wordAt("6.tap", "tap", n));

export const BedBlanket: React.FC = () => <Blanket position={room(-1.1, 0.7, -0.85)} size={[1.04, 0.16, 1.3]} />;

const WithTorch: React.FC<{ face: "uneasy" | "wow" }> = ({ face }) => (
  <Hero position={ON_BED} rotationY={EAST} animation="sit" arms="reach" face={face} lookAt={EGG_GAZE}>
    <group rotation={[1.55, 0, 0]}>
      <Torch position={[0, -0.25, 0]} light={7} seed={3} />
    </group>
  </Hero>
);

/** THE TEASE. The egg is not dead: something taps, and stops when he looks. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The tease",
  shots: [
    {
      cue: "6.bed",
      ...cam.top({ on: room(-0.78, 0.5, -1.3), height: 3.6, to: 2.9, spin: [-12, 8], fov: 44 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "The first held breath: straight down on the bed, slowly turning. He lies awake; the egg is on the table by his head.",
      stage: () => (
        <>
          <Hero position={IN_BED} animation="lie" face="uneasy" headYaw={0.5} gaze={0} />
          <BedBlanket />
          <MonsterEgg position={EGG} rotationY={0.3} scale={CARRIED} cracked />
        </>
      ),
    },
    {
      cue: "6.tap",
      ...cam.push({ on: EGG_MID, dist: 1.75, to: 1.25, yaw: 24, pitch: 8, fov: 38 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "'Tap. Tap. Tap.': the egg, close, and it jumps on each word. The sound is drawn as rings because the film has no sound effects.",
      stage: (t) => (
        <>
          <Hero position={IN_BED} animation="lie" face="wow" headYaw={0.6} gaze={0} />
          <BedBlanket />
          <MonsterEgg position={EGG} rotationY={0.3} scale={CARRIED} cracked tilt={TAPS.reduce((sum, at) => sum + jolt(t, at, 0.22), 0)} />
          {TAPS.map((at, i) => (
            <SoundRings key={i} position={[EGG[0] + 0.05, EGG[1] + 0.24, EGG[2] + 0.2]} rotationY={0.3} t={(t - at) * 1.6} reach={0.5} />
          ))}
        </>
      ),
    },
    {
      cue: "6.torch",
      ...cam.push({ on: room(-0.8, 0.95, -1.9), dist: 2.55, to: 2.05, yaw: 40, pitch: 9 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "'I lit a torch': he is up, torch held out to the egg. Warm light in a blue room; the first time the two colours meet.",
      stage: () => (
        <>
          <WithTorch face="uneasy" />
          <MonsterEgg position={EGG} rotationY={0.3} scale={CARRIED} cracked />
        </>
      ),
    },
    {
      cue: "6.gone",
      ...cam.push({ on: [EGG[0], EGG[1] + 0.25, EGG[2]], dist: 1.5, to: 1.05, yaw: 76, pitch: 5, fov: 38 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "'It stopped': the egg dead still in the torchlight, his face behind it. Only the camera moves.",
      stage: () => (
        <>
          <WithTorch face="wow" />
          <MonsterEgg position={EGG} rotationY={1.2} scale={CARRIED} cracked />
        </>
      ),
    },
  ],
});
