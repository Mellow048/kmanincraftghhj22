import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** HE DOES NOT THINK. Both arms into the mud; roots; one giant leaf. The first time he uses it on purpose. */
const LEAFW = wordAt("3.leaf", "leaf");
const HANDS: Vec3 = [MUD[0] + 0.45, 0.05, MUD[2] - 0.35];
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Roots",
  shots: [
    {
      cue: "3.fast",
      ...cam.push({ on: [MUD[0], 0.8, MUD[2]], dist: 3.6, to: 2.8, yaw: 96, pitch: 8, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He throws himself down on his knees, and on 'arms' drives both hands into the mud up to the elbows. Mud flies.",
      stage: (t) => {
        const hit = wordAt("3.fast", "arms");
        return (
          <>
            <Hero position={MUD} rotationY={EAST} animation={t < hit - 0.3 ? "scared" : "crouch"} arms={t < hit - 0.3 ? undefined : "press"} time={t < hit - 0.3 ? t : 0.3} face="brave" headPitch={0.35} />
            <Garden />
            <Bits position={HANDS} t={t - hit + 0.1} color="#5a4030" count={16} seed={3} power={1.3} />
            <Lit at={MUD} />
          </>
        );
      },
    },
    {
      cue: "3.green",
      ...cam.push({ on: [HANDS[0], 0.25, HANDS[2]], dist: 2.2, to: 1.7, yaw: 70, pitch: 30, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second: his arms in the mud, and green light pouring up out of the ground round them.",
      stage: (t, { p }) => (
        <>
          <Hero position={MUD} rotationY={EAST} animation="crouch" arms="press" time={0.3} face="brave" headPitch={0.35} />
          <Garden />
          <Glow position={[HANDS[0], 0.3, HANDS[2]]} size={1.6 + 1.6 * p} color="#9dff8a" opacity={0.75} />
          <pointLight position={[HANDS[0], 0.5, HANDS[2]]} color="#9dff8a" intensity={10 + 20 * p} distance={7} decay={2} />
        </>
      ),
    },
    {
      cue: "3.roots",
      ...cam.push({ on: [-7.4, 0.7, 9.4], dist: 5.6, to: 6.6, yaw: -112, pitch: 16, fov: 46 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From behind him: the ground splits in front of his hands and roots as thick as his arm come boiling up out of it, through the fence, and away across the town.",
      stage: (t, { p }) => (
        <>
          <Hero position={MUD} rotationY={EAST} animation="crouch" arms="press" time={0.3} face="brave" headPitch={0.2} />
          <Garden />
          <Roots from={HANDS} to={LEAF} k={0.02 + 0.3 * ease(p)} />
          <Bits position={[HANDS[0] + 1, 0.2, HANDS[2] - 0.3]} t={t} color="#5a4030" count={14} seed={5} power={1.2} />
          <Brother position={B0} rotationY={EAST} animation="idle" face="wow" />
        </>
      ),
    },
    {
      cue: "3.chase",
      from: [-3.5, 2.2, 15.5],
      to: [3.5, 2.2, 13.5],
      target: [-4.4, 3.2, 8.2],
      targetTo: [3.2, 3.0, 5.2],
      fov: 52,
      ease: "linear",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Racing alongside: the roots tearing over the ground past the well, glowing green at the front, and high above them a small yellow figure coming down fast. The roots are winning.",
      stage: (t, { p }) => (
        <>
          <Roots from={HANDS} to={LEAF} k={0.32 + 0.6 * p} />
          <Tip position={tipAt(0.5 + 0.34 * p)} rotationY={t * 4} tilt={Math.sin(t * 5) * 0.6} strain={1} />
        </>
      ),
    },
    {
      cue: "3.leaf",
      ...cam.push({ on: [LEAF[0], 2.4, LEAF[2]], dist: 7.6, to: 6.6, yaw: 16, pitch: 4, fov: 46 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The road. Tip is one second from it. The roots arrive underneath him, rear up, and on 'leaf' open into a single green leaf the size of a cart.",
      stage: (t, { p }) => (
        <>
          <Roots from={HANDS} to={LEAF} k={0.92 + 0.08 * ease(ramp(t, 0, LEAFW - 0.3))} />
          <BigLeaf position={LEAF} grow={ease(ramp(t, LEAFW - 0.35, LEAFW + 0.3))} rotationY={0.3} />
          <Tip position={tipAt(0.84 + 0.14 * p)} rotationY={t * 4} tilt={Math.sin(t * 5) * 0.5} strain={1} />
        </>
      ),
    },
    {
      cue: "3.catch",
      ...cam.push({ on: [LEAF[0], 1.5, LEAF[2]], dist: 4.6, to: 4.0, yaw: 24, pitch: 16, fov: 42 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He drops into it. The leaf sags right down under him, folds up round him, and bounces him once. He is fine.",
      stage: (t) => {
        const drop = ease(ramp(t, 0, 0.3));
        const dip = Math.sin(Math.min(1, t / 0.9) * Math.PI) * 0.45 * (t < 0.9 ? 1 : 0);
        return (
          <>
            <Roots from={HANDS} to={LEAF} k={1} />
            <BigLeaf position={LEAF} rotationY={0.3} dip={dip} />
            <Tip position={[LEAF[0], 3.2 - 2.15 * drop - dip + hop(t, 0.9, 0.35, 0.5), LEAF[2]]} rotationY={0.4} scale={0.94} tilt={0.5 * (1 - drop)} />
            <Bits position={[LEAF[0], 1.3, LEAF[2]]} t={t - 0.28} color="#5cbd48" count={12} seed={4} power={0.9} />
          </>
        );
      },
    },
    {
      cue: "3.thanks",
      ...cam.push({ on: [LEAF[0], 2.1, LEAF[2]], dist: 3.2, to: 2.7, yaw: 20, pitch: 6, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Tip sits in the leaf, perfectly calm, and points. The red arrow pops up beside him. It is, in fact, north.",
      stage: (t) => (
        <>
          <BigLeaf position={LEAF} rotationY={0.3} />
          <Tip position={[LEAF[0], 1.05, LEAF[2]]} rotationY={0.4} hmm={1} nod={0.2} />
          {t > wordAt("3.thanks", "north") - 0.3 ? <North position={[LEAF[0] + 0.9, 2.6, LEAF[2]]} scale={0.7} /> : null}
          <Lit at={[LEAF[0], 1, LEAF[2]]} />
        </>
      ),
    },
  ],
});
