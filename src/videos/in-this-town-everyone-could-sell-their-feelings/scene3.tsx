import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Hero, Villager, IronGolem, ROBE, timing, wordAt, pop, ramp, ease,
  HelmetChair, Bottle, Coins, LemonadeStall, SoupSpill, CHILD, EAST, WEST, SOUTH, NORTH, PLACE, KID,
} from "./kit";

const PLINK = wordAt("3.anger", "plink");
const BLUE = wordAt("3.sad", "blue");
const WAVE = wordAt("3.shy", "waved");
const GREEDY = wordAt("3.greedy", "coins");
const MIMIC = wordAt("3.mimic", "second");
const LONELY = wordAt("3.golem", "lonely");

const SHOP_C: Vec3 = [0, 0, 60];
const HELMET_AT = [0, 0, 60] as Vec3;

/** THE TOUR — how feelings are sold, one impossible sale after another. Every clause a picture. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The tour",
  shots: [
    {
      cue: "3.shop",
      ...cam.push({ on: [0.2, 1.6, 60.4], dist: 3.6, to: 2.9, yaw: -12, pitch: -4, fov: 40 }),
      zone: "shop",
      look: "warm-room",
      note: "'One humming helmet and shelves of empty glass': the helmet centre frame humming, empty shelves left and right waiting to be filled.",
      stage: (t) => (
        <>
          <HelmetChair position={[0, 0, 60]} hum={t} />
          {/* witch watches from side */}
          <Villager position={[-2.2, 0, 60.8]} rotationY={EAST} robe={ROBE.elder} lookAt={[0, 1.0, 60]} phase={2.2} />
        </>
      ),
    },
    {
      cue: "3.anger",
      ...cam.push({ on: [0, 0.9, 60.6], dist: 2.2, to: 1.75, yaw: 0, pitch: 18, fov: 36 }),
      zone: "shop",
      look: "warm-room",
      note: "'It dropped with a plink': neighbor under helmet — red anger blob falls with pop on 'plink'.",
      stage: (t) => {
        const k = pop(t, PLINK, 0.18);
        return (
          <>
            <Villager position={[0, 0, 59.2]} rotationY={NORTH} robe={ROBE.brown} phase={0.3} />
            <HelmetChair position={[0, 0, 60]} />
            {/* Anger drop */}
            <group position={[0, 1.1, 60]} scale={k}>
              <Bottle position={[0, 0, 0]} color="#ff3a3a" />
            </group>
            {/* Anger blob falling */}
            <Block position={[0, 0.96 - ramp(t, PLINK - 0.2, PLINK) * 0.55, 60]} size={[0.18, 0.18, 0.18]} color="#ff3a3a" emissive="#ff3a3a" emissiveIntensity={0.6} />
          </>
        );
      },
    },
    {
      cue: "3.calm",
      ...cam.push({ on: [-1.4, 1.0, 1.8], dist: 2.4, to: 2.0, yaw: 18, pitch: 4, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Kid spilled soup on his shoes and he just smiled': morning after — kid with bowl tipped, orange spill on dad's shoes, dad's face calm, wrong-calm.",
      stage: () => (
        <>
          <Villager position={[-1.2, 0, 1.6]} robe={ROBE.brown} lookAt={[0, 1.5, 5]} phase={0.3} />
          <Villager position={[-1.9, 0, 2.2]} robe={ROBE.friend} scale={CHILD} kid lookAt={[-1.2, 0.3, 1.6]} phase={1.1} />
          <SoupSpill position={[-1.2, 0, 1.25]} />
          <Bottle position={[-1.2, 0.45, 1.7]} color="#ff3a3a" />
        </>
      ),
    },
    {
      cue: "3.sad",
      ...cam.push({ on: [2.1, 1.0, -1.0], dist: 2.6, to: 2.1, yaw: -8, pitch: 4, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'It fell blue and she laughed when rain ruined drawings': blue sadness drop in bottle, then girl laughing with smeared wet paper.",
      stage: (t) => {
        const k = pop(t, BLUE, 0.2);
        return (
          <>
            <Villager position={[2.2, 0, -1.4]} robe={ROBE.white} lookAt={[2.2, 0.8, -0.5]} phase={1.9} />
            <group position={[2.2, 0.45, -0.8]} scale={k}>
              <Bottle position={[0, 0, 0]} color="#6bc8ff" />
            </group>
            {/* rain ruined drawings */}
            <Block position={[2.0, 0.012, -0.4]} size={[0.7, 0.02, 0.5]} color="#c8d8e8" />
            <Block position={[2.05, 0.015, -0.36]} size={[0.45, 0.02, 0.3]} color="#6bc8ff" opacity={0.4} transparent />
          </>
        );
      },
    },
    {
      cue: "3.shy",
      ...cam.truck({ on: [0, 1.05, 2.4], dist: 3.0, yaw: 0, pitch: 4, by: [2.6, 0, 0], fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Waved at whole square the next day': shy boy yesterday hiding, now tracking shot with his wave travelling across square, arms wide.",
      stage: (t) => {
        const w = pop(t, WAVE, 0.26);
        return (
          <>
            <Hero position={[1.8, 0, 2.4]} animation="wave" face="grin" />
            <Villager position={[-1.2, 0, 2.0]} robe={ROBE.brown} lookAt={[1.8, 1.2, 2.4]} phase={0.3} />
            <Villager position={[0.4, 0, 1.4]} robe={ROBE.blue} lookAt={[1.8, 1.2, 2.4]} phase={1.9} />
          </>
        );
      },
    },
    {
      cue: "3.greedy",
      ...cam.push({ on: [8.5, 0.95, -0.1], dist: 2.2, to: 1.85, yaw: -28, pitch: 6, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'One man sold everything and just stared at his coins': close on greedy man's flat face, coins stacked, eyes not moving.",
      stage: (t) => (
        <>
          <Villager position={[8.5, 0, -0.8]} robe={ROBE.smith} lookAt={[8.5, 0.6, 1.2]} phase={1.4} />
          <Coins position={[8.4, 0.4, -0.15]} amount={18} />
        </>
      ),
    },
    {
      cue: "3.mimic",
      ...cam.push({ on: [5.2, 1.15, 1.6], dist: 4.0, to: 3.4, yaw: 12, pitch: 4, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'He copied how we sat, how we smiled — a second late': split frame — villagers sit then greedy sits a beat late, smile a beat late. Logic, not life.",
      stage: (t) => {
        const sitA = ramp(t, MIMIC - 0.4, MIMIC - 0.1);
        const sitB = ramp(t, MIMIC + 0.6, MIMIC + 0.9);
        const smileA = ramp(t, MIMIC - 0.4, MIMIC);
        const smileB = ramp(t, MIMIC + 0.6, MIMIC + 0.95);
        return (
          <>
            {/* Originals */}
            <Villager position={[4.2, 0, 1.2]} robe={ROBE.brown} sit lean={-0.12 * sitA} phase={0.3} />
            <Villager position={[5.8, 0, 1.2]} robe={ROBE.white} sit hmm={smileA * 0.2} phase={1.9} />
            {/* Greedy copies late */}
            <Villager position={[6.9, 0, 1.2]} robe={ROBE.smith} sit={sitB > 0.1} lean={-0.12 * sitB} hmm={smileB * 0.2} phase={1.4} />
          </>
        );
      },
    },
    {
      cue: "3.golem",
      ...cam.push({ on: [-5, 1.45, 5.2], dist: 5.6, to: 4.7, yaw: 22, pitch: -10, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'Even iron golem left his lonely — and stood taller': from below, golem huge, head down placing small grey-blue bottle on shelf, shoulders back afterwards.",
      stage: (t) => {
        const arm = -0.35 + (-0.95 + 0.35) * ramp(t, LONELY - 0.4, LONELY + 0.2);
        return (
          <>
            <IronGolem position={[-5, 0, 4.8]} rotationY={SOUTH} bow={0.25 * ramp(t, LONELY - 0.5, LONELY)} armR={arm} headPitch={0.22} flower={false} />
            <Bottle position={[-5.1, 0.5, 4.55]} color="#7a8a9a" glow={ramp(t, LONELY, LONELY + 0.4) > 0.5 ? true : false} />
            {/* empty well behind to show he guards square */}
          </>
        );
      },
    },
  ],
});

import { Block } from "../../engine";
