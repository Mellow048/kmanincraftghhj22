import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** HOME. Four plates, as always. Three of them are used. */
const TABLE = room(0.7, 0, 0.5);
const SIGN: Vec3 = [0, 0, 3.2];
export const scene18 = storyScene(timing, {
  id: "scene18",
  title: "Four plates",
  shots: [
    {
      cue: "18.plates",
      ...cam.top({ on: [TABLE[0], 0.8, TABLE[2]], height: 3.3, to: 2.8, spin: [-8, 4], fov: 46 }),
      zone: ZONE.room,
      look: DAY,
      note: "Straight down on the table at home, exactly as in the first film: his mother beside it, and four plates.",
      stage: () => (
        <>
          <Table position={TABLE} />
          <Mom position={[TABLE[0] - 1.35, 0, TABLE[2]]} rotationY={EAST} nod={0.3} />
        </>
      ),
    },
    {
      cue: "18.three",
      ...cam.push({ on: [TABLE[0], 0.9, TABLE[2]], dist: 4.6, to: 4.2, yaw: 0, pitch: 20, fov: 66 }),
      zone: ZONE.room,
      look: DAY,
      note: "From the empty side of the table: his mother at the far side, a boy in red on her left and a boy in black on her right, all three sitting down. The plate nearest us is clean and empty.",
      stage: () => (
        <>
          <Table position={TABLE} />
          <Mom position={[TABLE[0], 0, TABLE[2] - 1.35]} rotationY={SOUTH} nod={0.15} />
          <Hero position={[TABLE[0] - 1.1, -0.3, TABLE[2]]} rotationY={EAST} animation="sit" face="grin" />
          <Brother position={[TABLE[0] + 1.1, -0.3, TABLE[2]]} rotationY={WEST} animation="sit" face="smile" headPitch={0.15} />
        </>
      ),
    },
    {
      cue: "18.daisy",
      ...cam.push({ on: [DOOR[0] + 0.6, 0.3, DOOR[2] + 0.2], dist: 3.4, to: 1.6, yaw: 18, pitch: 12, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "Their front door. We go down, and in, to the step: and beside it, opening as we arrive, one small white daisy. Nobody is near it.",
      stage: (t, { p }) => (
        <>
          <Daisy position={[DOOR[0] + 0.6, 0, DOOR[2] + 0.2]} grow={ease(ramp(p, 0.25, 0.8))} scale={1.5} />
          <Glow position={[DOOR[0] + 0.6, 0.3, DOOR[2] + 0.2]} size={1.4} color="#9dff8a" opacity={0.3 * ease(ramp(p, 0.25, 0.8))} />
        </>
      ),
    },
    {
      cue: "18.sub",
      ...cam.push({ on: [0, 1.15, 3.0], dist: 5.4, to: 4.9, yaw: 0, pitch: 2, fov: 46 }),
      zone: ZONE.day,
      look: DAY,
      note: "Under the bell. The twins side by side facing us, red and black, grown. A SUBSCRIBE sign stands in the daisies between them. The one in black gives a small, embarrassed wave.",
      stage: (t) => (
        <>
          <Hero position={[-0.78, 0, 2.6]} rotationY={0.15} animation="idle" face="grin" />
          <Brother position={[0.78, 0, 2.6]} rotationY={-0.15} animation="wave" face="smile" />
          <SubscribeSign position={[SIGN[0], 0.95, SIGN[2]]} rotationY={0} scale={0.42} />
          <Block position={[SIGN[0], 0.45, SIGN[2] - 0.03]} size={[0.05, 0.9, 0.05]} color="#5c3f24" />
          <Daisy position={[SIGN[0] - 0.4, 0, SIGN[2] + 0.3]} />
          <Daisy position={[SIGN[0] + 0.45, 0, SIGN[2] + 0.2]} />
        </>
      ),
    },
  ],
});
