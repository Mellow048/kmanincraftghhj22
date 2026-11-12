import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** HE LOOKS UP, AND SEES WHO HE HAS LANDED NEXT TO. */
const HIMF = faceOf(LAND);
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Was that the plan?",
  shots: [
    {
      cue: "8.land",
      ...cam.push({ on: [LAND[0], 0.7, LAND[2]], dist: 2.9, to: 2.4, yaw: -70, pitch: 6, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He pushes himself up on his arms, spits out a bit of leaf, and on 'looked up' lifts his head. His face falls.",
      stage: (t) => {
        const up = t > wordAt("8.land", "looked") - 0.1;
        return (
          <>
            <Hero position={LAND} rotationY={WEST} animation="crouch" arms="press" time={0.3} face={up ? "fear" : "ouch"} headPitch={up ? -0.35 : 0.4} gaze={0} />
            <Bits position={[LAND[0] - 0.5, 0.5, LAND[2]]} t={t - 0.4} color="#5cbd48" count={6} seed={3} power={0.5} />
            <Lit at={LAND} side={-1} />
          </>
        );
      },
    },
    {
      cue: "8.them",
      ...cam.truck({ on: [-3.2, 1.45, 4.3], dist: 4.4, yaw: 82, pitch: 2, by: [0, 0, 2.2], fov: 42 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "What he sees, sliding along the faces as he names them: his mother in white. Bo, grey. Mira. Tip. And more behind, pressed together in front of the well, every one of them looking at him.",
      stage: () => (
        <>
          <Crowd at={HIMF} shake={1} />
          <FireLight position={[-1.2, 2.2, 5.4]} power={22} reach={10} seed={3} />
        </>
      ),
    },
    {
      cue: "8.led",
      ...cam.push({ on: [-1.9, 1.0, 4.6], dist: 8.6, to: 7.6, yaw: 74, pitch: 18, fov: 46 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "High and wide: him on his knees in the road, the huddle of his whole town an arm's length behind him, and nothing at all between them and the way his brother is coming from.",
      stage: (t) => (
        <>
          <Hero position={LAND} rotationY={WEST} animation="sit" face="fear" headYaw={Math.sin(t * 2.5) * 0.5} />
          <Crowd at={HIMF} shake={1} />
          <FireLight position={[-1.2, 2.6, 5.4]} power={30} reach={12} seed={3} />
        </>
      ),
    },
    {
      cue: "8.plan",
      ...cam.push({ on: [-2.1, 1.35, 3.9], dist: 6.4, to: 5.8, yaw: 10, pitch: 3, fov: 50 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Bo's long grey face on the left, asking. Him on the right, on his feet now, opening his mouth, shutting it, and shrugging.",
      stage: (t) => {
        const not = t > wordAt("8.plan", "not") - 0.2;
        return (
          <>
            <Crowd at={[-0.9, 1.5, 3.5]} />
            <Hero position={[-0.9, 0, 3.5]} rotationY={WEST} animation={not ? "shrug" : "idle"} face={not ? "uneasy" : "worried"} />
            <FireLight position={[-1.8, 2.2, 5.6]} power={20} reach={9} seed={5} />
          </>
        );
      },
    },
  ],
});
