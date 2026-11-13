import { cam, storyScene } from "../../engine";
import { MonsterEgg, SoundRings } from "../../../Topics/InThisTown/creatures";
import { CARRIED, EAST, Hero, HeroEgg, TABLE_EGG, jolt, room, timing, wordAt } from "./kit";
import { BedBlanket, EGG_GAZE, IN_BED, ON_BED } from "./scene6";

const EGG = TABLE_EGG;
const EGG_MID: [number, number, number] = [EGG[0], EGG[1] + 0.22, EGG[2]];
const ALIVE = wordAt("8.alive", "alive");
const UP = room(0.25, 0, -0.9);

/** THE DECISION. One night, one question, and he answers it himself. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The decision",
  shots: [
    {
      cue: "8.awake",
      ...cam.top({ on: room(-0.7, 0.6, -1.78), height: 2.6, to: 2.15, spin: [7, -6], fov: 44 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "The bed from above again, closer and turning the other way: just his open eyes and the egg beside them. He is not looking at the ceiling.",
      stage: () => (
        <>
          <Hero position={IN_BED} animation="lie" face="uneasy" headYaw={0.7} gaze={0} />
          <BedBlanket />
          <MonsterEgg position={EGG} rotationY={0.3} scale={CARRIED} cracked />
        </>
      ),
    },
    {
      cue: "8.why",
      ...cam.orbit({ on: room(-0.75, 0.95, -1.9), dist: 2.35, yaw: 26, yawTo: 62, pitch: 10 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "He sits up and studies it. The camera swings from beside him to behind the egg, so the question ends on his face.",
      stage: () => (
        <>
          <Hero position={ON_BED} rotationY={EAST} animation="sit" face="uneasy" lookAt={EGG_GAZE} gaze={0} />
          <MonsterEgg position={EGG} rotationY={0.9} scale={CARRIED} cracked />
        </>
      ),
    },
    {
      cue: "8.alive",
      ...cam.push({ on: EGG_MID, dist: 1.4, to: 0.95, yaw: 14, pitch: 6, fov: 36 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "'Still alive inside it': the egg alone in the moonlight, and on the word 'alive' it moves. Once.",
      stage: (t) => (
        <>
          <MonsterEgg position={EGG} rotationY={0.2} scale={CARRIED} cracked tilt={jolt(t, ALIVE, 0.3)} />
          <SoundRings position={[EGG[0], EGG[1] + 0.24, EGG[2] + 0.2]} t={(t - ALIVE) * 1.6} reach={0.5} />
        </>
      ),
    },
    {
      cue: "8.decide",
      ...cam.push({ on: [UP[0], 1.0, UP[2]], dist: 2.5, to: 1.8, yaw: -8, pitch: -12 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "'I decided to hatch it myself': on his feet, egg in his arms, shot from below with the moon window behind him.",
      stage: () => <HeroEgg position={UP} rotationY={0} carry="hug" face="brave" />,
    },
  ],
});
