import type React from "react";
import { Vox, cam, lerp, storyScene } from "../../engine";
import { MonsterEgg, Puffs, RankSign, Worm } from "../../../Topics/InThisTown/creatures";
import { CARRIED, EAST, Hero, PLACE, Ripples, WEST, ease, faceOf, pop, ramp, timing, wordAt } from "./kit";

const EDGE = PLACE.edge;
const CRUST = PLACE.crust;
const SINK: [number, number, number] = [42.6, -0.3, 1];
const WORM_AT: [number, number, number] = [42.8, -0.2, 1];
const RANK = wordAt("15.rank", "rank");

/** The egg after it has drunk the lake: the only light left. */
const HotEgg: React.FC<{ open?: number; tilt?: number; glow?: number }> = ({ open = 0, tilt = 0, glow = 1 }) => (
  <>
    <MonsterEgg position={CRUST} rotationY={WEST} scale={CARRIED} cracked glow={glow} open={open} tilt={tilt} />
    {/* The light stands off the egg, so it lights the rock and the kid and not the shell it comes from. */}
    <pointLight position={[CRUST[0] - 1.1, 0.75, CRUST[2] + 0.5]} color="#ff8a2e" intensity={9 * glow} distance={9} decay={2} />
    <Puffs position={[CRUST[0] + 0.5, -0.2, CRUST[2] - 0.6]} color="#6a6f7c" count={5} rise={1.6} spread={0.3} size={0.2} speed={0.4} opacity={0.45} seed={51} />
  </>
);

/** THE FALL. He thinks he has killed it. Then the lake goes out. */
export const scene15 = storyScene(timing, {
  id: "scene15",
  title: "The fall",
  shots: [
    {
      cue: "15.sure",
      ...cam.push({ on: faceOf(EDGE), dist: 2.0, to: 1.5, yaw: 84, pitch: -8, fov: 38 }),
      zone: "lake",
      look: "lava-shore",
      note: "'I was sure I had destroyed it': his face, from the lava's side, hands still out and empty. He looks at what he has done.",
      stage: () => <Hero position={EDGE} rotationY={EAST} animation="hold" face="fear" headPitch={0.3} gaze={0} />,
    },
    {
      cue: "15.sank",
      ...cam.push({ on: SINK, dist: 2.3, to: 1.6, yaw: 50, pitch: 32 }),
      zone: "lake",
      look: "lava-shore",
      note: "'Sank without a sound': the egg going under, slowly, and square ripples spreading from it. Nothing else moves.",
      stage: (t, { p }) => (
        <>
          <MonsterEgg position={[SINK[0], lerp(-0.4, -0.76, p * p), SINK[2]]} rotationY={0.9} scale={CARRIED} cracked glow={0.5} tilt={lerp(0.15, 0.6, p)} />
          <Ripples position={[SINK[0], -0.27, SINK[2]]} t={t} />
        </>
      ),
    },
    {
      cue: "15.dark",
      ...cam.push({ on: [58, 0, 1], dist: 34, to: 30, yaw: -84, pitch: 24, fov: 52 }),
      zone: "lake",
      look: "lava-shore",
      note: "'The whole lake went dark': the second wide of the film. From over the wall, black spreads across the fire from the spot where it sank.",
      stage: () => <Hero position={EDGE} rotationY={EAST} animation="hold" face="fear" />,
    },
    {
      cue: "15.swallow",
      ...cam.push({ on: [CRUST[0], 0.1, CRUST[2]], dist: 4.9, to: 3.9, yaw: -78, pitch: 15 }),
      zone: "lake",
      look: "overworld-night",
      note: "'Swallowed all the fire': over his shoulder, a cold black lake and one hot thing on it. The egg holds every bit of light there is.",
      stage: () => (
        <>
          <Hero position={EDGE} rotationY={EAST} animation="idle" face="fear" />
          <HotEgg />
        </>
      ),
    },
    {
      cue: "15.shake",
      ...cam.push({ on: [42.2, 0.3, 1.1], dist: 2.7, to: 2.35, yaw: -78, pitch: 4 }),
      shake: 0.07,
      zone: "lake",
      look: "overworld-night",
      note: "'The ground began to shake': the frame rattles, stones hop on the rock, and he throws his arms out to stay up.",
      stage: (t) => (
        <>
          <Hero position={EDGE} rotationY={EAST} animation="scared" face="fear" />
          <HotEgg tilt={Math.sin(t * 38) * 0.1} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Vox
              key={i}
              kind="basalt"
              position={[40.6 + ((i * 53) % 17) / 10, 0.07 + Math.abs(Math.sin(t * 21 + i * 1.9)) * 0.13, 0.1 + ((i * 31) % 19) / 10]}
              size={[0.14, 0.14, 0.14]}
            />
          ))}
        </>
      ),
    },
    {
      cue: "15.split",
      ...cam.push({ on: [CRUST[0], 0.05, CRUST[2]], dist: 1.75, to: 1.25, yaw: -72, pitch: 14, fov: 38 }),
      zone: "lake",
      look: "overworld-night",
      note: "'The shell split open': close on the egg as the top lifts off and light pours out of it.",
      stage: (t) => <HotEgg open={ease(ramp(t, 0.3, 0.85))} tilt={Math.sin(t * 38) * 0.08 * (1 - ramp(t, 0.3, 0.6))} />,
    },
    {
      cue: "15.worm",
      ...cam.push({ on: [43.2, -0.05, 1], onTo: [42.66, -0.08, 1], dist: 1.35, to: 1.2, yaw: -76, pitch: 16, fov: 38 }),
      zone: "lake",
      look: "overworld-night",
      note: "'The smallest monster I had ever seen': after all that, a worm the length of a hand crawls out of the shell towards us.",
      stage: (t, { p }) => (
        <>
          <HotEgg open={1} glow={lerp(1, 0.45, p)} />
          <Worm
            position={[lerp(CRUST[0] - 0.05, WORM_AT[0], ease(p)), WORM_AT[1] + lerp(0.1, 0, ease(p)), WORM_AT[2]]}
            rotationY={WEST}
            scale={0.9}
            crawl={p * 0.5}
            lift={0.15}
          />
        </>
      ),
    },
    {
      cue: "15.rank",
      ...cam.push({ on: [WORM_AT[0], 0.14, WORM_AT[2]], dist: 1.95, to: 1.45, yaw: -80, pitch: 6, fov: 38 }),
      zone: "lake",
      look: "overworld-night",
      note: "'A worm. Rank one.': it rears up to look at him, and on the word a sign as big as the worm pops up over it. The joke of the film.",
      stage: (t) => (
        <>
          <HotEgg open={1} glow={0.45} />
          <Worm position={WORM_AT} rotationY={WEST} scale={0.9} lift={ease(ramp(t, 0, 0.45))} />
          {pop(t, RANK) > 0 ? (
            <RankSign position={[WORM_AT[0], WORM_AT[1] + 0.56, WORM_AT[2]]} rotationY={WEST} rank="1" scale={0.31 * pop(t, RANK)} post />
          ) : null}
        </>
      ),
    },
  ],
});
