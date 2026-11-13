import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Hero, Villager, IronGolem, ROBE, timing, wordAt, pop, ramp, ease,
  HelmetChair, Bottle, Coins, LemonadeStall, SoupSpill, CHILD, EAST, WEST, SOUTH, NORTH, PLACE, KID,
} from "./kit";

const PLINK = wordAt("3.anger", "plink");
const BLUE = wordAt("3.sad", "blue");
const WAVE = wordAt("3.shy", "waved");
const MIMIC = wordAt("3.mimic", "second");
const LONELY = wordAt("3.golem", "lonely");

/** THE TOUR — every sale is a picture you can point at. Continuity: neighbor is brown-robe across 3.anger→3.calm. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The tour",
  shots: [
    {
      cue: "3.shop",
      ...cam.push({ on: [0.2, 1.6, 60.4], dist: 3.2, to: 2.6, yaw: -10, pitch: -2, fov: 40 }),
      zone: "shop",
      look: "warm-room",
      note: "'One humming helmet and shelves of empty glass': helmet centre, empty glass left/right catching light — the shop before any sale.",
      stage: (t) => (
        <>
          <HelmetChair position={[0, 0, 60]} hum={t} />
          <Villager position={[-2.0, 0, 60.9]} rotationY={EAST} robe={ROBE.elder} lookAt={[0, 1.0, 60]} phase={2.2} />
        </>
      ),
    },
    {
      cue: "3.anger",
      ...cam.push({ on: [0, 1.25, 60], dist: 2.4, to: 1.9, yaw: 0, pitch: 8, fov: 36 }),
      zone: "shop",
      look: "warm-room",
      note: "'My neighbor sold his anger. It dropped with a plink': NEIGHBOR (brown robe) under helmet, RED anger drop falls on 'plink' into bottle front and centre — you see who and what.",
      stage: (t) => {
        const plink = pop(t, PLINK, 0.2);
        const falling = ramp(t, PLINK - 0.25, PLINK) * 0.55;
        return (
          <>
            {/* Neighbor sitting — this is the brown-robe man you will see again in 3.calm */}
            <Villager position={[0, 0, 60]} rotationY={SOUTH} robe={ROBE.brown} phase={0.3} />
            <HelmetChair position={[0, 0, 60]} hum={t} />
            {/* Falling red cube on 'plink' */}
            <group position={[0.35, 0.85 - falling, 60.35]}>
              <mesh>
                <boxGeometry args={[0.14, 0.14, 0.14]} />
                <meshStandardMaterial color="#ff3a3a" emissive="#ff3a3a" emissiveIntensity={0.5} />
              </mesh>
            </group>
            {/* Bottle appears on plink */}
            <group position={[0.35, 0.35, 60.45]} scale={plink}>
              <Bottle position={[0, 0, 0]} color="#ff3a3a" />
            </group>
            <Villager position={[-1.8, 0, 60.6]} rotationY={0.6} robe={ROBE.elder} lookAt={[0, 1.0, 60]} phase={2.2} />
          </>
        );
      },
    },
    {
      cue: "3.calm",
      ...cam.push({ on: [-1.2, 1.05, 1.45], dist: 2.2, to: 1.85, yaw: 12, pitch: 6, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'Kid spilled soup on his shoes and he just smiled': SAME NEIGHBOR (brown) now in village, soup spill orange on his shoes, kid with tipped bowl — his face is calm, wrong-calm.",
      stage: () => (
        <>
          <Villager position={[-1.2, 0, 1.6]} robe={ROBE.brown} lookAt={[0, 1.2, 3]} phase={0.3} />
          <Villager position={[-1.85, 0, 2.15]} robe={ROBE.farmer} scale={CHILD} kid lookAt={[-1.2, 0.3, 1.6]} phase={2.7} hat="straw" />
          {/* Bowl */}
          <mesh position={[-1.85, 0.58, 2.15]}><cylinderGeometry args={[0.14, 0.12, 0.08, 12]} /><meshStandardMaterial color="#d8c49a" /></mesh>
          <SoupSpill position={[-1.2, 0, 1.22]} />
          {/* Bottle from sale at his feet to link */}
          <Bottle position={[-1.05, 0.45, 1.8]} color="#ff3a3a" />
        </>
      ),
    },
    {
      cue: "3.sad",
      ...cam.push({ on: [2.1, 1.0, -0.7], dist: 2.4, to: 2.0, yaw: -6, pitch: 6, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'My friend sold her sadness. It fell blue and she laughed when rain ruined her drawings': BLUE sadness in shop overlay then cut to her laughing over wet smeared paper — blue is the feeling colour.",
      stage: (t) => {
        const k = pop(t, BLUE, 0.22);
        return (
          <>
            <Villager position={[2.2, 0, -0.9]} robe={ROBE.white} lookAt={[2.2, 0.6, 0.2]} phase={1.9} />
            {/* Blue bottle popping on 'blue' */}
            <group position={[2.4, 0.45, -0.4]} scale={k}>
              <Bottle position={[0, 0, 0]} color="#6bc8ff" />
            </group>
            {/* Wet paper with blue smear */}
            <Block position={[2.05, 0.012, -0.3]} size={[0.7, 0.02, 0.5]} color="#e8e8f0" />
            <Block position={[2.1, 0.015, -0.28]} size={[0.45, 0.02, 0.3]} color="#6bc8ff" opacity={0.45} transparent />
            <Block position={[2.05, 0.015, -0.32]} size={[0.06, 0.02, 0.06]} color="#2a5a9a" />
          </>
        );
      },
    },
    {
      cue: "3.shy",
      ...cam.truck({ on: [0.2, 1.05, 2.4], dist: 3.0, yaw: 0, pitch: 4, by: [2.6, 0, 0], fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'The shy boy sold his shyness and waved at the whole square the next day': tracking with shy boy (blue robe) waving — first full-arm wave in town, villagers turn to look.",
      stage: (t) => {
        const w = pop(t, WAVE, 0.26);
        return (
          <>
            <Hero position={[1.8, 0, 2.4]} animation="wave" face="grin" />
            <Villager position={[-1.0, 0, 2.0]} robe={ROBE.brown} lookAt={[1.8, 1.2, 2.4]} phase={0.3} />
            <Villager position={[0.4, 0, 1.4]} robe={ROBE.blue} lookAt={[1.8, 1.2, 2.4]} phase={1.9} hmm={ramp(t, WAVE - 0.2, WAVE + 0.4) * 0.15} />
            {/* The wave triggers head turns */}
            <Villager position={[2.8, 0, 1.6]} robe={ROBE.red} lookAt={[1.8, 1.2, 2.4]} phase={0.9} />
          </>
        );
      },
    },
    {
      cue: "3.greedy",
      ...cam.push({ on: [8.5, 1.0, -0.15], dist: 2.1, to: 1.8, yaw: -20, pitch: 7, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'One man sold everything and just stared at his coins': close on greedy (smith robe) — flat mouth, coins stacked, eyes locked down — the warning.",
      stage: () => (
        <>
          <Villager position={[8.5, 0, -0.8]} robe={ROBE.smith} lookAt={[8.5, 0.35, -0.15]} phase={1.4} />
          <Coins position={[8.45, 0.38, -0.15]} amount={18} />
        </>
      ),
    },
    {
      cue: "3.mimic",
      ...cam.push({ on: [5.0, 1.15, 1.4], dist: 4.0, to: 3.4, yaw: 10, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'He copied how we sat, how we smiled — a second late': two villagers sit/smile, greedy (smith) copies 0.7s late — logic not feeling.",
      stage: (t) => {
        const sitA = ramp(t, MIMIC - 0.5, MIMIC - 0.1);
        const sitB = ramp(t, MIMIC + 0.35, MIMIC + 0.75);
        return (
          <>
            <Villager position={[4.2, 0, 1.2]} robe={ROBE.brown} sit lean={-0.12 * sitA} phase={0.3} />
            <Villager position={[5.8, 0, 1.2]} robe={ROBE.white} sit hmm={sitA * 0.18} phase={1.9} />
            <Villager position={[6.9, 0, 1.2]} robe={ROBE.smith} sit={sitB > 0.15} lean={-0.12 * sitB} hmm={sitB * 0.18} phase={1.4} />
          </>
        );
      },
    },
    {
      cue: "3.golem",
      ...cam.push({ on: [-5, 1.6, 5.2], dist: 5.2, to: 4.5, yaw: 18, pitch: -8, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'Even iron golem left his lonely — and stood taller': from low, golem bows placing small grey-blue bottle, then stands taller — lonely is tiny but heaviest.",
      stage: (t) => {
        const arm = -0.32 + (-0.95 + 0.32) * ramp(t, LONELY - 0.45, LONELY + 0.15);
        return (
          <>
            <IronGolem position={[-5, 0, 4.8]} rotationY={SOUTH} bow={0.28 * ramp(t, LONELY - 0.5, LONELY + 0.1)} armR={arm} headPitch={0.22} />
            <Bottle position={[-4.85, 0.55, 4.55]} color="#7a8a9a" />
          </>
        );
      },
    },
  ],
});

import { Block } from "../../engine";
