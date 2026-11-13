import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
  DustRing, HANDS, Plunger, ROOTWAY, Streaks, Veins, jolt, pathAt, pop, tossed,
} from "./kit";

/** HE HAD NO IDEA. And before he can get one, Tip has a go. */
const FLICK = Math.max(0.3, wordAt("2.fling", "flicked") - 0.1);
/** Tip runs in along the south side of the square, clear of the well. */
const TIP0: Vec3 = [2.5, 0, 8.2];
const TIP1: Vec3 = [-6.05, 0, 7.25];
const SKID: Vec3 = [-4.7, 0, 7.4];
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "That was a lie",
  shots: [
    {
      cue: "2.lie",
      ...cam.push({ on: [MUD[0], 1.3, MUD[2]], dist: 2.3, to: 3.0, yaw: 132, pitch: -2, fov: 36 }),
      handheld: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The same face, the same frame, and the brave look slides off it. His eyes go left, then right. He takes half a step back. He has nothing.",
      stage: (t, { p }) => (
        <>
          <Hero position={ahead(MUD, AT, -0.35 * ease(ramp(p, 0.3, 0.7)))} rotationY={AT} animation="idle" face={p < 0.3 ? "brave" : "uneasy"} gaze={p < 0.3 ? 0 : p < 0.65 ? -1 : 1} headYaw={p < 0.3 ? 0 : p < 0.65 ? -0.3 : 0.3} />
          <Garden />
          <FireLight position={ahead(MUD, AT, 2.2, 1.8)} power={14} reach={7} seed={4} />
        </>
      ),
    },
    {
      cue: "2.up",
      from: [-4.9, 1.9, 6.0],
      to: [-5.4, 1.7, 6.5],
      target: [-8.6, 1.1, 9.2],
      fov: 48,
      ease: "inOutSine",
      handheld: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Over his brother's shoulder: him in the pen, still straightening up; his brother starting to walk at him, fire in one hand.",
      stage: (t, { p }) => (
        <>
          <Hero position={MUD} rotationY={AT} animation="crouch" blendTo="idle" blend={1 - ease(ramp(p, 0.1, 0.9))} face="uneasy" />
          <Garden />
          <Brother {...stride(ahead(B0, BACK, -0.5), B0, p)} animation="walk" face="smug" flame={t} />
          <Lit at={B0} />
        </>
      ),
    },
    {
      cue: "2.tip",
      from: [5.2, 1.9, 9.1],
      to: [-3.4, 1.6, 8.3],
      target: [1.5, 1.2, 8.0],
      targetTo: [-7, 1.2, 7.1],
      fov: 50,
      ease: "linear",
      shake: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Running behind a yellow robe as it pelts along the edge of the square, straight at the brother's back, bobbing and puffing dust at every step: Tip. On 'north' a little red arrow pops up over his head.",
      stage: (t, { p }) => {
        const at = lerp3(TIP0, SKID, p);
        const bob = Math.abs(Math.sin(t * 13)) * 0.16;
        return (
          <>
            <Tip position={[at[0], bob, at[2]]} rotationY={WEST} walk={t * 4} lean={0.45} strain={1} />
            <Bits position={[at[0] + 0.5, 0.1, at[2]]} t={(((t * 3) % 1) + 0.05) * 0.4} color="#b8a890" count={5} seed={3} power={0.5} />
            {t > wordAt("2.tip", "north") ? <North position={[at[0], 2.3 + bob, at[2]]} scale={0.6 * Math.min(1.3, pop(t, wordAt("2.tip", "north")))} /> : null}
            <Brother position={B0} rotationY={BACK} animation="idle" face="smug" flame={t} />
            <Lit at={B0} />
            <FireLight position={[at[0] - 1, 2, at[2] + 1.4]} power={12} reach={7} seed={6} />
          </>
        );
      },
    },
    {
      cue: "2.look",
      ...cam.push({ on: [-6.5, 1.4, 7.2], dist: 3.9, to: 3.2, yaw: 0, pitch: 2, fov: 42 }),
      handheld: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Tip skids to a stop in a cloud of dust, nose to chin with him. The brother turns his head, slowly, and looks down at him.",
      stage: (t, { p }) => {
        const k = 1 - (1 - Math.min(1, p / 0.35)) ** 2;
        const at = lerp3(SKID, TIP1, k);
        return (
          <>
            <Brother position={B0} rotationY={BACK + (EAST - BACK) * ease(ramp(p, 0.3, 0.7))} animation="idle" face="smug" headPitch={0.2} gaze={0} />
            <Tip position={at} rotationY={WEST} strain={1} lean={-0.3 * (1 - k)} tilt={jolt(t, 0.6, 0.2)} />
            <Bits position={[at[0] - 0.3, 0.1, at[2]]} t={t * 0.9} color="#b8a890" count={12} seed={4} power={0.9} />
            <DustRing position={TIP1} t={t - 0.45} size={1.0} />
            <FireLight position={[-6.4, 1.8, 9.0]} power={14} reach={7} seed={2} />
          </>
        );
      },
    },
    {
      cue: "2.fling",
      from: [-6.5, 1.6, 10.8],
      to: [-6.2, 1.9, 11.4],
      target: [-6.5, 1.4, 7.2],
      targetTo: [-5.8, 4.4, 7.1],
      fov: 46,
      ease: "inCubic",
      impacts: [{ at: FLICK, amp: 0.09, dur: 0.4 }],
      zone: ZONE.ruin,
      look: CHAOS,
      note: "One finger. He draws it back, and on 'flicked' lets go: a white crack, a ring of dust, and Tip leaves the ground like a cork, the camera whipping up after him.",
      stage: (t) => {
        const x = Math.max(0, t - FLICK);
        const wind = ease(ramp(t, 0, FLICK - 0.08));
        return (
          <>
            <Brother position={B0} rotationY={EAST - 0.5 * wind + 0.5 * ramp(t, FLICK - 0.08, FLICK)} animation="idle" blendTo="point" blend={1 - ramp(t, FLICK - 0.1, FLICK)} face="smug" />
            <Tip position={[TIP1[0] + x * 2.6, x * 12 - x * x * 3, TIP1[2]]} rotationY={WEST + x * 9} tilt={x * 6} strain={1} />
            <Bits position={[-6.4, 1.3, 7.2]} t={t - FLICK} color="#ffffff" count={16} seed={3} power={1.6} />
            <DustRing position={TIP1} t={t - FLICK} size={1.8} />
            <Streaks position={[TIP1[0] + x * 2.6, x * 6, TIP1[2]]} yaw={0} pitch={-1.5708} t={t} n={x > 0 ? 8 : 0} spread={0.5} speed={20} color="#ffffff" />
            <FireLight position={[-6.4, 1.8, 9.0]} power={14} reach={7} seed={2} />
          </>
        );
      },
    },
    {
      cue: "2.north",
      from: [-9, 3, 16],
      to: [-3, 5, 15],
      target: [-6.4, 3, 6.9],
      targetTo: [-0.6, 10.2, 5.8],
      fov: 48,
      ease: "linear",
      shake: 0.025,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Up over the burning roofs: Tip, turning over and over against the smoke, speed lines streaming off him, with his red arrow still faithfully pointing north.",
      stage: (t, { p }) => {
        const at = tipAt(0.05 + 0.4 * p);
        return (
          <>
            <Tip position={at} rotationY={t * 9} tilt={Math.sin(t * 8) * 0.9} strain={1} />
            <North position={[at[0], at[1] + 2.4, at[2]]} scale={0.7} />
            <Streaks position={at} yaw={ROOTWAY + Math.PI} pitch={0.9} t={t} n={10} spread={1.1} speed={18} color="#ffffff" />
          </>
        );
      },
    },
  ],
});
