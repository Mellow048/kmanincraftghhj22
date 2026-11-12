import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** HIS BROTHER HAS HAD ENOUGH. One finger, lava; and a tree where the teller was. */
const TIPF: Vec3 = [B0[0] - 0.42, 1.38, B0[2] + 0.62];
const TREE = wordAt("5.tree", "tree");
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Lava",
  shots: [
    {
      cue: "5.point",
      ...cam.push({ on: chestOf(B0), dist: 3.6, to: 3.0, yaw: -52, pitch: 2, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second: the brother, not smiling any more, and his arm coming up, level, pointing straight at us.",
      stage: (t, { p }) => (
        <>
          <Brother position={B0} rotationY={BACK} animation="idle" blendTo="point" blend={1 - ease(p * 1.6)} face="angry" gaze={0} />
          <Lit at={B0} side={-1} />
        </>
      ),
    },
    {
      cue: "5.red",
      ...cam.push({ on: TIPF, dist: 1.9, to: 1.3, yaw: -84, pitch: 2, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The end of his finger. It goes dull red, then orange, then too bright to look at, and the air round it shakes.",
      stage: (t, { p }) => (
        <>
          <Brother position={B0} rotationY={BACK} animation="point" face="angry" />
          <Block position={TIPF} size={[0.09 + 0.1 * p, 0.09 + 0.1 * p, 0.09 + 0.1 * p]} rotation={[t * 5, t * 3, 0]} color="#000000" emissive={p < 0.4 ? "#c92a12" : p < 0.75 ? "#ff8a1c" : "#fff0b0"} emissiveIntensity={1.2} castShadow={false} />
          <Glow position={TIPF} size={0.5 + 1.8 * p} color="#ff5a1a" opacity={0.75} />
          <pointLight position={TIPF} color="#ff6a2a" intensity={4 + 26 * p} distance={6} decay={2} />
        </>
      ),
    },
    {
      cue: "5.lava",
      ...cam.push({ on: [-8.3, 1.1, 8.7], dist: 6.4, to: 5.8, yaw: 52, pitch: 5, fov: 44 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Side on: a rope of lava jumps from his fingertip across the gap, at the teller, who is still on his knees.",
      stage: (t, { p }) => (
        <>
          <Brother position={B0} rotationY={BACK} animation="point" face="angry" />
          <LavaJet from={TIPF} to={[MUD[0], 0.9, MUD[2]]} k={p * 0.9} t={t} />
          <Hero position={MUD} rotationY={AT} animation="cower" face="scared" />
          <Garden />
        </>
      ),
    },
    {
      cue: "5.tree",
      ...cam.push({ on: [-8.6, 3.2, 9.0], dist: 11.5, to: 12.5, yaw: 52, pitch: 4, fov: 50 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The same view, pulling back. On 'tree' a whole oak comes up out of the mud under his feet like a fist and carries him six blocks into the air. The lava hits the trunk where he was.",
      stage: (t) => {
        const g = ease(ramp(t, TREE - 0.25, TREE + 0.45));
        return (
          <>
            <Brother position={B0} rotationY={BACK} animation="point" face="angry" headPitch={-0.5 * g} />
            <LavaJet from={TIPF} to={[MUD[0], 0.9, MUD[2]]} k={0.9 + t} t={t} />
            <GrowTree position={MUD} grow={g} />
            <Hero position={[MUD[0], TREETOP[1] * g, MUD[2]]} rotationY={AT} animation={g < 1 ? "cower" : "panic"} face="scared" />
            <Bits position={[MUD[0], 0.3, MUD[2]]} t={t - TREE + 0.2} color="#5a4030" count={20} seed={4} power={1.8} />
            <Bits position={[MUD[0], 1.0, MUD[2]]} t={t - TREE - 0.3} color="#ff8a1c" count={16} seed={6} power={1.4} />
          </>
        );
      },
    },
    {
      cue: "5.breath",
      ...cam.push({ on: faceOf(TREETOP), dist: 2.5, to: 2.2, yaw: 150, pitch: -6, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second: him on top of his tree, in the leaves, sucking in one huge breath.",
      stage: (t) => (
        <>
          <GrowTree position={MUD} grow={1} />
          <Hero position={TREETOP} rotationY={AT} animation="idle" time={t * 3} face="fear" headPitch={-0.2} />
          <FireLight position={[TREETOP[0] - 1.5, 7.4, TREETOP[2] - 1.5]} power={14} reach={7} seed={3} />
        </>
      ),
    },
  ],
});
