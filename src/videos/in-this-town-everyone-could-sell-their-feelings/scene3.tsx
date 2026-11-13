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

/** THE TOUR — studied from same-face: every sale is depth-stacked 9:16, every shot moves, kids are real kids, motion never stops. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The tour",
  shots: [
    {
      cue: "3.shop",
      ...cam.push({ on: [0.2, 1.6, 60.4], dist: 3.8, to: 3.2, yaw: -10, pitch: -2, fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "'One humming helmet and shelves of empty glass': helmet centre (now raised), empty glass left/right catching light — shop before any sale, witch quarter-off watching.",
      stage: (t) => (
        <>
          <HelmetChair position={[0, 0, 60]} hum={t} />
          <Villager position={[-2.0, 0, 60.9]} rotationY={EAST} robe={ROBE.elder} lookAt={[0, 1.4, 60]} phase={2.2} />
          {/* Foreground empty bottle silhouettes to show empty */}
          <Bottle position={[-1.6, 1.02, 60.7]} color="#d8e8f8" glow={false} />
          <Bottle position={[1.6, 1.02, 60.7]} color="#d8e8f8" glow={false} />
        </>
      ),
    },
    {
      cue: "3.anger",
      ...cam.push({ on: [0, 1.35, 60.2], dist: 2.9, to: 2.4, yaw: 0, pitch: 10, fov: 40 }),
      zone: "shop",
      look: "warm-room",
      note: "'My neighbor sold his anger. It dropped with a plink': NEIGHBOR (brown robe) under raised helmet — RED anger cube falls on 'plink' into bottle front-centre, witch leans in. You see who and what, zoomed out so helmet not cropping.",
      stage: (t) => {
        const plink = pop(t, PLINK, 0.2);
        const falling = ramp(t, PLINK - 0.25, PLINK) * 0.62;
        return (
          <>
            <Villager position={[0, 0, 60]} rotationY={SOUTH} robe={ROBE.brown} phase={0.3} />
            <HelmetChair position={[0, 0, 60]} hum={t} />
            {/* Falling red anger — travels from helmet visor to bottle */}
            <group position={[0.36, 1.18 - falling, 60.38]}>
              <mesh><boxGeometry args={[0.14, 0.14, 0.14]} /><meshStandardMaterial color="#ff3a3a" emissive="#ff3a3a" emissiveIntensity={0.55} /></mesh>
            </group>
            <group position={[0.36, 0.38, 60.5]} scale={plink}>
              <Bottle position={[0, 0, 0]} color="#ff3a3a" />
            </group>
            <Villager position={[-1.9, 0, 60.6]} rotationY={0.6} robe={ROBE.elder} lookAt={[0.36, 0.5, 60.5]} phase={2.2} lean={0.08 * ramp(t, PLINK - 0.2, PLINK + 0.3)} />
          </>
        );
      },
    },
    {
      cue: "3.calm",
      ...cam.push({ on: [-1.45, 1.0, 1.6], dist: 2.8, to: 2.4, yaw: 14, pitch: 8, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Kid spilled soup on his shoes and he just smiled': SAME NEIGHBOR (brown) in village, KID in full 3D (CHILD kid, green friend robe, holding bowl) mid-tilt with soup stream, orange spill on dad's shoes, dad's face wrong-calm — stacked depth for 9:16.",
      stage: (t, { p }) => (
        <>
          {/* Dad — brown robe, centre */}
          <Villager position={[-1.2, 0, 1.45]} robe={ROBE.brown} lookAt={[0, 1.2, 2.8]} phase={0.3} />
          {/* Kid — REAL kid, not villager: CHILD scale, kid flag, green robe, walking in via stride, bowl tipping */}
          <Villager position={[-1.9, 0, 2.05]} rotationY={0.9} robe={ROBE.friend} scale={CHILD} kid phase={1.1} tilt={0.18 * Math.sin(t * 2.1)} />
          {/* Bowl in kid's hands, tipping on 'spilled' */}
          <group position={[-1.78, 0.62, 2.05]} rotation={[0, 0, -0.35 - ramp(t, 0.4, 0.9) * 0.6]}>
            <mesh><cylinderGeometry args={[0.14, 0.12, 0.07, 12]} /><meshStandardMaterial color="#e8d4b0" /></mesh>
            {/* Soup inside sloshing */}
            <mesh position={[0, -0.02, 0]}><cylinderGeometry args={[0.11, 0.1, 0.02, 12]} /><meshStandardMaterial color="#c86a2a" /></mesh>
          </group>
          {/* Soup stream */}
          <mesh position={[-1.5, 0.32 - ramp(t, 0.35, 0.85) * 0.18, 1.78]}><boxGeometry args={[0.04, 0.28, 0.04]} /><meshStandardMaterial color="#d87a3a" /></mesh>
          <SoupSpill position={[-1.22, 0, 1.12]} />
          {/* Bottle link at his feet */}
          <Bottle position={[-0.95, 0.42, 1.65]} color="#ff3a3a" />
          {/* Motion: a passerby behind with stride, head turning to look */}
          <Villager {...stride([-4, 0, 0.4], [-1.5, 0, 0.6], p * 0.8)} walk={t * 0.9} robe={ROBE.blue} phase={1.9} />
        </>
      ),
    },
    {
      cue: "3.sad",
      ...cam.orbit({ on: [2.1, 1.0, -0.7], dist: 2.6, yaw: 18, yawTo: -8, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'It fell blue and she laughed when rain ruined her drawings': orbit from profile to front — BLUE sadness bottle pops on 'blue', then rain streaks and wet smeared paper, girl's laugh is a head-back.",
      stage: (t) => {
        const k = pop(t, BLUE, 0.22);
        return (
          <>
            <Villager position={[2.2, 0, -0.9]} rotationY={SOUTH} robe={ROBE.white} lookAt={[2.2, 0.6, 0.4]} phase={1.9} tilt={Math.sin(t * 1.6) * 0.06} />
            <group position={[2.45, 0.52, -0.38]} scale={k}>
              <Bottle position={[0, 0, 0]} color="#6bc8ff" />
            </group>
            {/* Wet paper with blue smear — rain streaks */}
            <Block position={[2.05, 0.012, -0.3]} size={[0.7, 0.02, 0.5]} color="#e8e8f0" />
            <Block position={[2.1, 0.015, -0.28]} size={[0.45, 0.02, 0.3]} color="#6bc8ff" opacity={0.48} transparent />
            {Array.from({ length: 4 }, (_, i) => (
              <Block key={i} position={[2.0 + i * 0.08, 0.35 - i * 0.06, -0.25]} size={[0.02, 0.28, 0.02]} color="#a0c8ff" opacity={0.45} transparent />
            ))}
            {/* Second kid watching, reacting */}
            <Villager position={[1.4, 0, -0.2]} rotationY={-0.6} robe={ROBE.blue} scale={CHILD} kid lookAt={[2.2, 0.9, -0.9]} phase={2.4} />
          </>
        );
      },
    },
    {
      cue: "3.shy",
      ...cam.truck({ on: [0.2, 1.05, 2.4], dist: 3.2, yaw: 0, pitch: 5, by: [2.8, 0, 0], fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'The shy boy sold his shyness and waved at the whole square': TRUCK with waving Hero — first full-arm wave, villagers turn heads with stride, one stops walking to stare.",
      stage: (t) => (
        <>
          <Hero position={[1.9, 0, 2.4]} animation="wave" face="grin" />
          <Villager position={[-1.2, 0, 2.0]} robe={ROBE.brown} lookAt={[1.9, 1.2, 2.4]} phase={0.3} tilt={ramp(t, WAVE - 0.15, WAVE + 0.3) * 0.12} />
          <Villager {...stride([0.6, 0, 1.2], [1.4, 0, 1.0], t * 0.6)} walk={t * 1.0} robe={ROBE.blue} lookAt={[1.9, 1.2, 2.4]} phase={1.9} />
          <Villager position={[2.9, 0, 1.5]} robe={ROBE.red} lookAt={[1.9, 1.2, 2.4]} phase={0.9} nod={ramp(t, WAVE, WAVE + 0.5) * 0.1} />
        </>
      ),
    },
    {
      cue: "3.greedy",
      ...cam.push({ on: [8.5, 1.05, -0.1], dist: 2.6, to: 2.2, yaw: -18, pitch: 8, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'One man sold everything and just stared at his coins': greedy (smith) head down, coins stacked catching godray, background villagers walking past with motion blur — he doesn't track them.",
      stage: (t) => (
        <>
          <Villager position={[8.5, 0, -0.8]} robe={ROBE.smith} lookAt={[8.5, 0.32, -0.15]} phase={1.4} tilt={0.04 * Math.sin(t * 0.8)} />
          <Coins position={[8.45, 0.38, -0.15]} amount={18} />
          {/* Passersby — he ignores */}
          <Villager {...stride([10.5, 0, 0.2], [7.5, 0, 0.4], t * 0.5)} walk={t * 0.95} robe={ROBE.white} phase={1.9} />
        </>
      ),
    },
    {
      cue: "3.mimic",
      ...cam.push({ on: [5.2, 1.15, 1.4], dist: 4.4, to: 3.8, yaw: 10, pitch: 6, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'He copied how we sat, how we smiled — a second late': two villagers sit/smile with lean/hmm, greedy copies 0.7s late — beat-late motion tells the word 'second'.",
      stage: (t) => {
        const sitA = ramp(t, MIMIC - 0.5, MIMIC - 0.1);
        const sitB = ramp(t, MIMIC + 0.35, MIMIC + 0.75);
        return (
          <>
            <Villager position={[4.2, 0, 1.2]} robe={ROBE.brown} sit lean={-0.14 * sitA} tilt={sitA * 0.05} phase={0.3} />
            <Villager position={[5.8, 0, 1.2]} robe={ROBE.white} sit hmm={sitA * 0.2} nod={sitA * 0.08} phase={1.9} />
            <Villager position={[6.9, 0, 1.2]} robe={ROBE.smith} sit={sitB > 0.15} lean={-0.14 * sitB} hmm={sitB * 0.2} tilt={sitB * 0.04} phase={1.4} />
          </>
        );
      },
    },
    {
      cue: "3.golem",
      ...cam.push({ on: [-5, 1.7, 5.2], dist: 5.8, to: 5.0, yaw: 16, pitch: -6, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'Even iron golem left his lonely — and stood taller': LOW angle, golem huge, head slowly yawing, bows placing tiny grey lonely bottle, then chest up — lonely is smallest bottle.",
      stage: (t) => {
        const arm = -0.32 + (-0.96 + 0.32) * ramp(t, LONELY - 0.45, LONELY + 0.15);
        return (
          <>
            <IronGolem position={[-5, 0, 4.8]} rotationY={SOUTH} bow={0.3 * ramp(t, LONELY - 0.5, LONELY + 0.1)} armR={arm} headPitch={0.22} headYaw={Math.sin(t * 0.9) * 0.25} />
            <Bottle position={[-4.85, 0.58, 4.52]} color="#7a8a9a" />
            {/* Kids at golem's feet looking up — scale contrast */}
            <Villager position={[-4.4, 0, 4.2]} rotationY={0.4} robe={ROBE.friend} scale={CHILD} kid lookAt={[-5, 1.8, 4.8]} phase={1.1} />
            <Villager position={[-5.6, 0, 4.3]} rotationY={-0.3} robe={ROBE.red} scale={CHILD} kid lookAt={[-5, 1.8, 4.8]} phase={2.0} />
          </>
        );
      },
    },
  ],
});

import { Block } from "../../engine";
