import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
  DustRing, HANDS, Plunger, ROOTWAY, Streaks, Veins, jolt, pathAt, pop, tossed,
} from "./kit";

/** HIS CHANCE. He runs at him, and the film slows right down, and we hear what he is thinking. */
const R0: Vec3 = [1.5, 0, 2.8];
const R1: Vec3 = [8.0, 0, 2.8];
const R2: Vec3 = [9.0, 0, 2.8];
/** One stride, frozen and crawling: the run clip played at a twelfth of its speed. */
const SLOW = 0.08;
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "I see my brother",
  shots: [
    {
      cue: "13.chance",
      ...cam.truck({ on: [R0[0] + 1, 1.2, 2.8], dist: 4.6, yaw: 62, pitch: 3, by: [6.5, 0, 0], fov: 44 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He goes. Flat out down the middle of the burning street, running backwards ahead of him as he comes.",
      stage: (t, { p }) => (
        <>
          <Hero {...stride(R0, R1, p)} animation="run" face="brave" />
          <Bits position={[R0[0] + 6.5 * p - 0.4, 0.1, 2.8]} t={t % 0.35} color="#8a7a66" count={6} seed={3} power={0.6} />
          <pointLight position={[R0[0] + 6.5 * p + 2, 2, 4.4]} color="#ffb070" intensity={18} distance={8} decay={2} />
        </>
      ),
    },
    {
      cue: "13.slow",
      ...cam.orbit({ on: [8.5, 1.2, 2.8], dist: 3.8, yaw: 60, pitch: 4, yawTo: 28 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "And on 'slow' everything does. One stride takes the whole shot. Embers and rose petals hang in the air round him, hardly moving. We drift round to his side.",
      stage: (t, { p }) => (
        <>
          <Hero position={[R1[0] + (R2[0] - R1[0]) * p * 0.4, 0, 2.8]} rotationY={EAST} animation="run" time={0.2 + t * SLOW} face="brave" />
          <Bits position={[8.6, 1.6, 3.2]} t={0.45 + t * 0.05} color="#d81f3a" count={14} seed={4} power={1.2} />
          <Bits position={[8.2, 1.2, 2.2]} t={0.4 + t * 0.05} color="#ff8a1c" count={14} seed={7} power={1.4} />
          <pointLight position={[10, 2, 4.6]} color="#ffb070" intensity={18} distance={8} decay={2} />
        </>
      ),
    },
    {
      cue: "13.thought",
      ...cam.push({ on: [8.6, 1.35, 2.8], dist: 2.8, to: 2.3, yaw: 74, pitch: -2, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "His face, still in slow motion. The fight goes out of it. He is not looking at an enemy; he is looking at someone he has missed for ten years.",
      stage: (t, { p }) => (
        <>
          <Hero position={[8.4 + 0.4 * p, 0, 2.8]} rotationY={EAST} animation="run" time={0.31 + t * SLOW} face={p < 0.3 ? "brave" : "sad"} gaze={0} />
          <Bits position={[9.4, 1.8, 1.6]} t={0.5 + t * 0.05} color="#d81f3a" count={10} seed={5} power={1.0} />
          <pointLight position={[10.4, 2, 4.2]} color="#ffb070" intensity={16} distance={8} decay={2} />
        </>
      ),
    },
    {
      cue: "13.enemy",
      ...cam.push({ on: chestOf(BKNEEL), dist: 5.6, to: 4.8, yaw: -86, pitch: 2, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "What he is running at: his brother, swaying in the road, scratched, a rose in his hair. He looks eighteen. He looks eight.",
      stage: (t) => (
        <>
          <Brother position={BKNEEL} rotationY={WEST} animation="idle" time={t * 0.3} headPitch={0.2} face="dizzy" />
          <Rose position={[BKNEEL[0], 1.74, BKNEEL[2]]} scale={1.1} />
          <Lit at={BKNEEL} side={-1} />
        </>
      ),
    },
    {
      cue: "13.brother",
      ...cam.push({ on: [0, 0.95, 3], dist: 3.6, to: 3.3, yaw: 0, pitch: 2, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "Half a second, in full sunlight: two eight-year-olds side by side under the bell, one red shirt, one black, the same face.",
      stage: () => (
        <>
          <Hero kid position={[-0.45, 0, 3]} rotationY={SOUTH} animation="idle" face="smile" />
          <Brother kid position={[0.45, 0, 3]} rotationY={SOUTH} animation="idle" face="smile" />
        </>
      ),
    },
  ],
});
