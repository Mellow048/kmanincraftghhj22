import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  ADULT, Bread, Bubble, Classmates, DAY, EAST, Hero, NORTH, NewKid, POOL, Player, ROBE, SPOT, TABLE, Villager, WEST, YARD, at, ease, kidHead, pop, ramp, timing, wordAt,
} from "./kit";

/** The back row: the teller's seat and face, the new kid's seat and face. */
export const HS: Vec3 = SPOT.seat(1, 2);
export const KS: Vec3 = SPOT.seat(0, 2);
export const HF: Vec3 = SPOT.face(1, 2);
export const KF: Vec3 = SPOT.face(0, 2);

/**
 * ACT 1. The new kid and his helmet: in class, at lunch, in the pool. Nobody knows his face.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The helmet",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: KF, dist: 2.4, to: 1.5, yaw: 150, pitch: 3, fov: 38 }),
      zone: "class",
      look: DAY,
      note: "The premise in the first second: a kid at a school desk with an iron helmet over his whole head, and the lens going in on the slit. The teller beside him, looking.",
      stage: () => (
        <>
          <NewKid position={KS} rotationY={NORTH} animation="sit" breath={0.4} />
          <Hero position={HS} rotationY={NORTH} animation="sit" face="uneasy" lookAt={KF} />
          <Classmates />
        </>
      ),
    },
    {
      cue: "1.not",
      ...cam.push({ on: KF, dist: 2.3, to: 2.0, yaw: 122, pitch: 6, fov: 38 }),
      zone: "class",
      look: DAY,
      note: "Not in class: the helmet in profile against the window, writing.",
      stage: () => (
        <>
          <NewKid position={KS} rotationY={NORTH} animation="sit" arms="hold" breath={0.4} />
          <Classmates />
        </>
      ),
    },
    {
      cue: "1.not",
      cut: wordAt("1.not", "lunch") - 0.42,
      ...cam.push({ on: at(TABLE, 0, 1.05, -0.75), dist: 2.7, to: 2.3, yaw: 12, pitch: 8, fov: 40 }),
      zone: "yard",
      look: DAY,
      note: "Not at lunch: he lifts a roll to the slit and it stops there. The two beside him stare.",
      stage: (t) => {
        const k = ease(ramp(t, 0.05, 0.45));
        return (
          <>
            <NewKid position={at(TABLE, 0, 0, -0.75)} animation="sit" arms="hold" />
            <Bread position={at(TABLE, 0.12, 0.86 + 0.3 * k, -0.42)} rotation={[0.2, 0, 0]} />
            <Player who={4} scale={0.8} position={at(TABLE, -0.95, 0, -0.75)} animation="sit" lookAt={kidHead(at(TABLE, 0, -0.1, -0.75))} face="wow" />
            <Player who={9} scale={0.8} position={at(TABLE, 0.95, 0, -0.75)} animation="sit" lookAt={kidHead(at(TABLE, 0, -0.1, -0.75))} face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "1.not",
      cut: wordAt("1.not", "even") - 0.3,
      ...cam.push({ on: at(POOL, 0, 1.0, 0), dist: 4.8, to: 4.1, yaw: -18, pitch: 16, fov: 42 }),
      zone: "yard",
      look: DAY,
      note: "Not even in the pool: in to the waist, arms at his sides, the helmet on. Two kids splash and he does not move.",
      stage: (t) => (
        <>
          <NewKid position={at(POOL, 0, 0.04, 0)} animation="idle" breath={0.3} weightShift={0} />
          <Player who={8} scale={0.8} position={at(POOL, -1.7, 0.04, 0.7)} rotationY={1.2} animation="cheer" face="laugh" phase={0.3} />
          <Player who={10} scale={0.8} position={at(POOL, 1.6, 0.04 + Math.abs(Math.sin(t * 7)) * 0.12, -0.8)} rotationY={-1.0} animation="cheer" face="grin" />
        </>
      ),
    },
    {
      cue: "1.teacher",
      ...cam.push({ on: at(KS, 0.55, 1.2, 0), dist: 4.4, to: 3.8, yaw: 180, pitch: 17, fov: 42 }),
      zone: "class",
      look: DAY,
      note: "The teacher has come down the aisle and bends over him. The helmet turns left, right, left: no. The teller watches from the next desk.",
      stage: (t) => {
        const shook = wordAt("1.teacher", "shook") - 0.25;
        return (
          <>
            <NewKid position={KS} rotationY={NORTH} animation="sit" headYaw={t > shook ? Math.sin((t - shook) * 11) * 0.5 : 0} />
            <Villager position={at(KS, 1.2, 0, 0)} rotationY={WEST} scale={ADULT} robe={ROBE.white} lookAt={KF} hmm={t < shook ? 1 : 0} />
            <Hero position={HS} rotationY={NORTH} animation="sit" face="wow" lookAt={KF} />
            <Classmates look={KF} />
          </>
        );
      },
    },
    {
      cue: "1.face",
      ...cam.push({ on: at(YARD, -6.5, 1.0, 1.5), dist: 7.6, to: 8.2, yaw: 86, pitch: 6, fov: 40 }),
      zone: "yard",
      look: DAY,
      note: "After school he walks off down the road alone, towards the woods, and two classmates watch him go with a question over their heads.",
      stage: (t) => (
        <>
          <NewKid position={at(YARD, -5.5 - 1.3 * t, 0, 1.5)} rotationY={WEST} animation="walk" animDistance={1.3 * t} />
          <Player who={4} scale={0.8} position={at(YARD, -1.5, 0, 0.75)} rotationY={WEST} animation="idle" />
          <Player who={8} scale={0.8} position={at(YARD, -1.3, 0, 2.3)} rotationY={WEST} animation="shrug" />
          <Bubble text="?" position={at(YARD, -1.4, 1.9, 1.5)} rotationY={EAST} scale={pop(t, wordAt("1.face", "where") - 0.1) * 0.9} />
        </>
      ),
    },
    {
      cue: "1.back",
      ...cam.push({ on: at(KS, 1.2, 1.0, 0), dist: 3.9, to: 3.3, yaw: 58, pitch: 12, fov: 46 }),
      zone: "class",
      look: DAY,
      note: "From behind the back row and to one side, so the two stack in a tall frame: two backs, a green one and a grey one with an iron box on it, and the whole class in front of them.",
      stage: (t) => (
        <>
          <NewKid position={KS} rotationY={NORTH} animation="sit" breath={0.3} />
          <Hero position={HS} rotationY={NORTH} animation="sit" face="smile" lookAt={t > wordAt("1.back", "never") - 0.2 ? at(KF, 0, 0, -0.4) : undefined} />
          <Villager position={SPOT.teacher} scale={ADULT} robe={ROBE.white} hmm={1} />
          <Classmates />
        </>
      ),
    },
    {
      cue: "1.shy",
      ...cam.push({ on: HF, dist: 1.8, to: 1.45, yaw: 196, pitch: 2, fov: 36 }),
      zone: "class",
      look: DAY,
      note: "The teller, close, with a small shrug: he means well. The last easy face of the film.",
      stage: () => (
        <>
          <Hero position={HS} rotationY={NORTH} animation="sit" arms="shrug" face="smile" />
          <NewKid position={KS} rotationY={NORTH} animation="sit" breath={0.3} />
          <Classmates hide={["1,1"]} />
        </>
      ),
    },
  ],
});
