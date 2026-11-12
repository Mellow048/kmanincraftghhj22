import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** IT IS A HEDGE. It is as tall as the bell, it is one step from his finger, and it is his. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "A wall of grass",
  shots: [
    {
      cue: "11.grass",
      ...cam.push({ on: [3.6, 2.5, STREET], dist: 9.5, to: 11.5, yaw: -78, pitch: 5, fov: 52 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Pulling back from behind the town to take it all in: one small figure in red with one finger out, and in front of that finger, from house to house and as high as the bell, a wall of living green with daisies in it.",
      stage: (t) => (
        <>
          <Hero position={STAND} rotationY={EAST} animation="point" face="wow" />
          <Crowd at={[4.4, 3, STREET]} />
          <Wall x={4.4} kind="grass" />
          <Bits position={[4.0, 3.5, STREET]} t={t} color="#5cbd48" count={16} seed={3} power={1.4} />
          <pointLight position={[2.6, 3, STREET + 1]} color="#c8ffb0" intensity={24} distance={10} decay={2} />
        </>
      ),
    },
    {
      cue: "11.how",
      ...cam.push({ on: faceOf(STAND), dist: 2.5, to: 2.2, yaw: 62, pitch: -2, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He turns his finger round and looks at the end of it. Then at us. He shrugs with his whole face.",
      stage: (t, { p }) => (
        <>
          <Hero position={STAND} rotationY={EAST} animation={p < 0.55 ? "point" : "shrug"} face={p < 0.55 ? "wow" : "uneasy"} headPitch={p < 0.55 ? 0.2 : 0} gaze={0} />
          <pointLight position={[STAND[0] + 2, 2, STAND[2] + 1.4]} color="#c8ffb0" intensity={18} distance={8} decay={2} />
        </>
      ),
    },
    {
      cue: "11.mine",
      ...cam.push({ on: faceOf(STAND), dist: 2.6, to: 1.9, yaw: 40, pitch: -6, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "And then the shrug turns into a grin. He has stopped being afraid.",
      stage: (t, { p }) => (
        <>
          <Hero position={STAND} rotationY={EAST} animation="idle" face={p < 0.35 ? "uneasy" : "grin"} gaze={0} />
          <Wall x={4.4} kind="grass" />
          <pointLight position={[STAND[0] + 1.6, 2, STAND[2] + 1.6]} color="#c8ffb0" intensity={18} distance={8} decay={2} />
        </>
      ),
    },
  ],
});
