import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** IT COSTS HIM. And then it dawns on him that he could always do it. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The whole time?",
  shots: [
    {
      cue: "4.tired",
      ...cam.push({ on: [MUD[0], 0.7, MUD[2]], dist: 3.8, to: 3.3, yaw: 60, pitch: 10, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Back in the pen. He tries to stand, and his legs go: down on his hands and knees in his own daisies.",
      stage: (t) => (
        <>
          <Hero position={MUD} rotationY={EAST} animation="collapse" time={t} face="ouch" />
          <Garden />
          <Lit at={MUD} />
        </>
      ),
    },
    {
      cue: "4.big",
      ...cam.push({ on: [MUD[0], 0.75, MUD[2]], dist: 2.4, to: 2.0, yaw: 100, pitch: 4, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Close, low: his face, grey and puffing, eyes going round. The green glow in the mud by his hands flickers and goes out.",
      stage: (t, { p }) => (
        <>
          <Hero position={MUD} rotationY={EAST} animation="crouch" time={t * 2.2} face="dizzy" headPitch={0.25 + Math.sin(t * 7) * 0.08} />
          <Garden />
          <Glow position={[MUD[0] + 0.5, 0.3, MUD[2]]} size={1.6} color="#9dff8a" opacity={0.5 * (1 - p) * (0.6 + 0.4 * Math.sin(t * 25))} />
          <Lit at={MUD} />
        </>
      ),
    },
    {
      cue: "4.along",
      ...cam.push({ on: [MUD[0], 1.0, MUD[2]], dist: 2.9, to: 2.4, yaw: 84, pitch: 2, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He sits back on his heels and holds both hands up in front of his face and stares at them. Then, on 'nobody', at us. Outraged.",
      stage: (t) => {
        const told = t > wordAt("4.along", "Nobody");
        return (
          <>
            <Hero position={MUD} rotationY={EAST} animation="sit" arms={told ? "shrug" : "lift"} face={told ? "frown" : "wow"} headPitch={told ? 0 : 0.3} gaze={0} />
            <Garden />
            <Lit at={MUD} />
          </>
        );
      },
    },
  ],
});
