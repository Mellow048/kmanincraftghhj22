import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** HE HAD NO IDEA. And before he can get one, Tip has a go. */
const FLICK = wordAt("2.fling", "flicked");
const TIP0: Vec3 = [-2.5, 0, 4.6];
const TIP1: Vec3 = [-6.3, 0, 6.7];
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "That was a lie",
  shots: [
    {
      cue: "2.lie",
      ...cam.push({ on: [MUD[0], 1.3, MUD[2]], dist: 2.3, to: 2.7, yaw: 132, pitch: -2, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The same face, the same frame, and the brave look slides off it. His eyes go left, then right. He has nothing.",
      stage: (t, { p }) => (
        <>
          <Hero position={MUD} rotationY={AT} animation="idle" face={p < 0.3 ? "brave" : "uneasy"} gaze={p < 0.3 ? 0 : p < 0.65 ? -1 : 1} />
          <Garden />
          <FireLight position={ahead(MUD, AT, 2.2, 1.8)} power={14} reach={7} seed={4} />
        </>
      ),
    },
    {
      cue: "2.up",
      from: [-4.9, 1.9, 6.0],
      to: [-5.1, 1.8, 6.2],
      target: [-8.6, 1.1, 9.2],
      fov: 48,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Over his brother's shoulder: him in the pen, still straightening up; his brother a few steps off, waiting, fire in one hand.",
      stage: (t, { p }) => (
        <>
          <Hero position={MUD} rotationY={AT} animation="crouch" blendTo="idle" blend={1 - ease(ramp(p, 0.1, 0.9))} face="uneasy" />
          <Garden />
          <Brother position={B0} rotationY={BACK} animation="idle" face="smug" flame={t} />
          <Lit at={B0} />
        </>
      ),
    },
    {
      cue: "2.tip",
      from: [-8.2, 1.7, 9.4],
      to: [-8.0, 1.6, 9.2],
      target: [-5.05, 1.2, 5.5],
      fov: 50,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From the right a yellow robe comes pelting across the square, nose first, straight at the brother's back: Tip. On 'north' a little red arrow pops up over his head, pointing the wrong way.",
      stage: (t, { p }) => (
        <>
          <Tip {...waddle(TIP0, TIP1, ease(Math.min(1, p * 1.05)))} lean={0.3} />
          {t > wordAt("2.tip", "north") ? <North position={[TIP0[0] + (TIP1[0] - TIP0[0]) * p, 2.3, TIP0[2] + (TIP1[2] - TIP0[2]) * p]} scale={0.6} /> : null}
          <Brother position={B0} rotationY={BACK} animation="idle" face="smug" flame={t} />
          <Lit at={B0} />
        </>
      ),
    },
    {
      cue: "2.look",
      ...cam.push({ on: faceOf(B0), dist: 2.6, to: 2.1, yaw: 62, pitch: -3, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The brother turns his head, slowly, and looks down his nose at Tip, who has skidded to a stop in front of him.",
      stage: (t, { p }) => (
        <>
          <Brother position={B0} rotationY={BACK + 1.5 * ease(ramp(p, 0, 0.5))} animation="idle" face="smug" headPitch={0.15} gaze={0} />
          <Tip position={TIP1} rotationY={WEST} lookAt={faceOf(B0)} strain={1} />
          <FireLight position={[B0[0] + 1.6, 1.8, B0[2] + 1.2]} power={12} reach={7} seed={2} />
        </>
      ),
    },
    {
      cue: "2.fling",
      ...cam.push({ on: [-6.6, 1.3, 6.9], dist: 3.4, to: 3.0, yaw: 10, pitch: 2, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "One finger again. On 'flicked' there is a white crack and the yellow robe is gone, straight up out of the top of the frame.",
      stage: (t) => {
        const gone = t > FLICK ? (t - FLICK) * 24 : 0;
        return (
          <>
            <Brother position={B0} rotationY={EAST} animation="point" face="smug" />
            <Tip position={[TIP1[0] + gone * 0.3, gone, TIP1[2]]} rotationY={WEST} strain={1} turn={gone * 2} />
            <Bits position={[-6.6, 1.3, 6.8]} t={t - FLICK} color="#ffffff" count={12} seed={3} power={1.2} />
            <FireLight position={[-6, 1.8, 8.4]} power={12} reach={7} seed={2} />
          </>
        );
      },
    },
    {
      cue: "2.north",
      from: [-9, 3, 16],
      to: [-5, 4, 16],
      target: [-6.4, 6, 6.9],
      targetTo: [-1.6, 10, 5.9],
      fov: 46,
      ease: "linear",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Up over the burning roofs: Tip, turning over and over against the smoke, getting smaller, with his red arrow still faithfully pointing north.",
      stage: (t, { p }) => {
        const at = tipAt(0.05 + 0.4 * p);
        return (
          <>
            <Tip position={at} rotationY={t * 4} tilt={Math.sin(t * 5) * 0.6} strain={1} />
            <North position={[at[0], at[1] + 2.4, at[2]]} scale={0.7} />
          </>
        );
      },
    },
  ],
});
