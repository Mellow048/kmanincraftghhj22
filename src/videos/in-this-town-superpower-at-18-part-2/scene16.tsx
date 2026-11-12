import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";
import { Kneeling } from "./scene14";

/** HE DOES NOT BELIEVE IT. The teller stands there until he does. */
const KFACE: Vec3 = [BKNEEL[0], 1.12, BKNEEL[2]];
export const scene16 = storyScene(timing, {
  id: "scene16",
  title: "He shook it",
  shots: [
    {
      cue: "16.worse",
      ...cam.push({ on: KFACE, dist: 2.4, to: 2.1, yaw: -80, pitch: 14, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The brother's face comes up. He looks at the hand, and past it at the face, and he flinches: he is still waiting for the blow.",
      stage: (t, { p }) => (
        <>
          <Kneeling face={p < 0.4 ? "wow" : "fear"} headPitch={0.6 - 0.95 * ease(ramp(p, 0, 0.35)) + (p > 0.55 && p < 0.7 ? 0.2 : 0)} />
          <FireLight position={[16.4, 1.9, 4.2]} power={16} reach={7} seed={3} />
        </>
      ),
    },
    {
      cue: "16.believe",
      ...cam.push({ on: KFACE, dist: 2.1, to: 1.8, yaw: -60, pitch: 0, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Closer. He looks away from it, off down the road he burned. He will not look back.",
      stage: (t, { p }) => (
        <>
          <Kneeling face="crying" headPitch={0.1} headYaw={-0.7 * ease(ramp(p, 0, 0.5))} />
          <FireLight position={[16.4, 1.7, 4.2]} power={16} reach={7} seed={3} />
        </>
      ),
    },
    {
      cue: "16.wrong",
      ...cam.push({ on: [16.85, 1.1, STREET], dist: 5.6, to: 4.4, yaw: 0, pitch: 3, fov: 42 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Wide, side on, a slow push in, and nothing happens: one of them kneeling with his face turned away, the other standing with his hand held out, and he does not lower it, and he does not lower it.",
      stage: (t) => (
        <>
          <Hero position={HSTOP} rotationY={EAST} animation="reach" face="smile" headPitch={0.3} />
          <Kneeling face="crying" headPitch={0.1} headYaw={-0.7} />
          <FireLight position={[16.9, 2, 4.6]} power={22} reach={9} seed={3} />
          <Bits position={[16.8, 2.8, 2.6]} t={0.6 + t * 0.2} color="#d81f3a" count={8} seed={4} power={0.6} />
        </>
      ),
    },
    {
      cue: "16.look",
      ...cam.push({ on: KFACE, dist: 2.2, to: 1.9, yaw: -84, pitch: 10, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "His head comes back round. He looks at the hand. Only at the hand.",
      stage: (t, { p }) => (
        <>
          <Kneeling face="uneasy" headPitch={-0.1} headYaw={-0.7 * (1 - ease(Math.min(1, p * 1.6)))} />
          <FireLight position={[16.4, 1.9, 4.2]} power={16} reach={7} seed={3} />
        </>
      ),
    },
    {
      cue: "16.shook",
      ...cam.push({ on: [16.85, 1.15, STREET], dist: 2.9, to: 2.5, yaw: 4, pitch: 2, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second, side on: a black sleeve comes up and takes the red one. Green sparks jump where the hands meet.",
      stage: (t) => (
        <>
          <Hero position={HSTOP} rotationY={EAST} animation="reach" face="smile" headPitch={0.3} />
          <Brother position={[BKNEEL[0] - 0.35, -0.3, BKNEEL[2]]} rotationY={WEST} animation="reach" face="uneasy" headPitch={-0.3} />
          <Rose position={[BKNEEL[0] - 0.35, 1.54, BKNEEL[2]]} scale={1.5} />
          <Bits position={[16.75, 1.3, STREET + 0.3]} t={t - 0.15} color="#8dff7a" count={16} seed={4} power={0.9} />
          <Glow position={[16.75, 1.3, STREET + 0.3]} size={1.4} color="#9dff8a" opacity={0.5} />
          <FireLight position={[16.9, 2, 4.4]} power={20} reach={8} seed={3} />
        </>
      ),
    },
  ],
});
