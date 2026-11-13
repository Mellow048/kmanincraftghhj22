import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
  DustRing, HANDS, Plunger, ROOTWAY, Streaks, Veins, jolt, pathAt, pop, tossed,
} from "./kit";

/** NO LEAF. NO TREE. NO IDEA. One finger, and his eyes shut: and the camera shuts its eyes with him. */
const CLOSED = wordAt("10.eyes", "closed");
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "He closed his eyes",
  shots: [
    {
      cue: "10.none",
      ...cam.push({ on: faceOf(STAND), dist: 3.4, to: 2.8, yaw: 66, pitch: -2, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Him, standing in the road between the wall and his town, lit brighter and brighter orange. He looks at his hands, at the ground, behind him. On each 'no' there is nothing there.",
      stage: (t, { p }) => (
        <>
          <Hero position={STAND} rotationY={EAST} animation="lookAround" face="fear" />
          <Crowd at={faceOf(STAND)} shake={1} />
          <pointLight position={[STAND[0] + 2.5, 2, STAND[2] + 0.5]} color="#ff6a2a" intensity={10 + 30 * p} distance={9} decay={2} />
        </>
      ),
    },
    {
      cue: "10.finger",
      ...cam.push({ on: [STAND[0] + 0.3, 1.35, STAND[2]], dist: 3.0, to: 2.6, yaw: 12, pitch: 0, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Side on. He stops looking. He lifts one arm, straight out at the wall, one finger: the same way his brother pointed at him.",
      stage: (t, { p }) => (
        <>
          <Hero position={STAND} rotationY={EAST} animation="idle" blendTo="point" blend={1 - ease(ramp(p, 0.15, 0.7))} face="brave" />
          <pointLight position={[STAND[0] + 2.5, 2, STAND[2] + 1]} color="#ff6a2a" intensity={40} distance={9} decay={2} />
        </>
      ),
    },
    {
      cue: "10.eyes",
      from: [4.0, 1.6, 2.8],
      to: [3.9, 1.6, 2.8],
      target: [1.5, 1.56, 2.8],
      fov: 38,
      ease: "linear",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "His face, head on, the orange getting fiercer. On 'closed' his eyes shut. And then ours do: two black lids come together from the top and bottom of the screen until there is nothing.",
      stage: (t) => (
        <>
          <Hero position={STAND} rotationY={EAST} animation="point" face={t > CLOSED - 0.15 ? "sleepy" : "brave"} gaze={0} />
          <pointLight position={[3.4, 1.9, 3.6]} color="#ff6a2a" intensity={30} distance={8} decay={2} />
          <Lids at={[3.2, 1.6, 2.8]} k={ease(ramp(t, CLOSED + 0.1, CLOSED + 0.55))} />
        </>
      ),
    },
    {
      cue: "10.heat",
      from: [1.5, 1.6, 2.8],
      to: [1.52, 1.6, 2.8],
      target: [6, 1.6, 2.8],
      fov: 44,
      ease: "linear",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Black. Our eyes are shut. Only a red-orange glow coming through the lids, swelling: the wall is nearly on us.",
      stage: (t, { p }) => (
        <>
          <Lids at={[2.2, 1.6, 2.8]} k={1} />
          <Glow position={[2.0, 1.6, 2.8]} size={0.9 + 1.4 * p} color="#ff4a12" opacity={0.35 + 0.5 * p} />
        </>
      ),
    },
    {
      cue: "10.cool",
      from: [1.5, 1.6, 2.8],
      to: [1.52, 1.6, 2.8],
      target: [6, 1.6, 2.8],
      fov: 44,
      ease: "linear",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Still black. The red glow falters, and goes out. One breath of nothing. Then, very faint, green.",
      stage: (t, { p }) => (
        <>
          <Lids at={[2.2, 1.6, 2.8]} k={1} />
          <Glow position={[2.0, 1.6, 2.8]} size={2.3 * (1 - p * 0.6)} color="#ff4a12" opacity={0.85 * Math.max(0, 1 - p * 2.2)} />
          <Glow position={[2.0, 1.6, 2.8]} size={1.6} color="#7dff6a" opacity={0.4 * Math.max(0, p * 2 - 1)} />
        </>
      ),
    },
    {
      cue: "10.open",
      from: [1.5, 1.6, 2.8],
      to: [1.52, 1.6, 2.8],
      target: [6, 1.9, 2.8],
      fov: 44,
      ease: "linear",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second: the lids part. Through the gap, where the lava was: green. Leaves.",
      stage: (t, { p }) => (
        <>
          <Wall x={4.4} kind="grass" />
          <Lids at={[2.2, 1.6, 2.8]} k={1 - ease(p)} />
          <Glow position={[2.0, 1.6, 2.8]} size={1.6} color="#7dff6a" opacity={0.4 * (1 - p)} />
        </>
      ),
    },
  ],
});
