import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
  DustRing, HANDS, Plunger, ROOTWAY, Streaks, Veins, jolt, pathAt, pop, tossed,
} from "./kit";

/** HIS BROTHER HAS HAD ENOUGH. One finger, lava; and a tree where the teller was. */
const TIPF: Vec3 = [B0[0] - 0.42, 1.38, B0[2] + 0.62];
const GROW = Math.max(0.3, wordAt("5.tree", "grew"));
const UP = GROW + 0.22;
const AIR = 1.0;
const TOP = 6.15;
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Lava",
  shots: [
    {
      cue: "5.point",
      ...cam.push({ on: chestOf(B0), dist: 4.2, to: 2.6, yaw: -52, pitch: 2, fov: 40 }),
      handheld: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second, rushing in: the brother, not smiling any more, his arm snapping up, level, pointing straight at us.",
      stage: (t, { p }) => (
        <>
          <Brother position={B0} rotationY={BACK} animation="idle" blendTo="point" blend={1 - ease(p * 2.2)} face="angry" gaze={0} />
          <Lit at={B0} side={-1} />
        </>
      ),
    },
    {
      cue: "5.red",
      ...cam.push({ on: TIPF, dist: 2.2, to: 1.2, yaw: -84, pitch: 2, fov: 38 }),
      shake: 0.03,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The end of his finger. It goes dull red, then orange, then too bright to look at; sparks are sucked into it and the whole frame starts to shake.",
      stage: (t, { p }) => (
        <>
          <Brother position={B0} rotationY={BACK} animation="point" face="angry" />
          <Block position={TIPF} size={[0.09 + 0.1 * p, 0.09 + 0.1 * p, 0.09 + 0.1 * p]} rotation={[t * 9, t * 7, 0]} color="#000000" emissive={p < 0.4 ? "#c92a12" : p < 0.75 ? "#ff8a1c" : "#fff0b0"} emissiveIntensity={1.2} castShadow={false} />
          <Bits position={TIPF} t={0.45 - ((t * 2.5) % 1) * 0.4} color="#ff8a1c" count={10} seed={3} power={0.7} />
          <Glow position={TIPF} size={0.5 + 1.8 * p} color="#ff5a1a" opacity={0.75} />
          <pointLight position={TIPF} color="#ff6a2a" intensity={4 + 26 * p} distance={6} decay={2} />
        </>
      ),
    },
    {
      cue: "5.lava",
      from: [-4.3, 2.3, 6.7],
      to: [-4.6, 2.1, 7.0],
      target: [-8.6, 1.1, 9.2],
      fov: 48,
      ease: "linear",
      impacts: [{ at: 0.05, amp: 0.08, dur: 0.4 }],
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Over his shoulder: his arm kicks, and a rope of lava jumps from his fingertip across the gap. The teller sees it coming and slaps both hands flat on the ground.",
      stage: (t, { p }) => (
        <>
          <Brother position={ahead(B0, BACK, -0.25 * Math.exp(-t * 6))} rotationY={BACK} animation="point" face="angry" />
          <LavaJet from={TIPF} to={[MUD[0], 0.9, MUD[2]]} k={Math.min(0.93, p * 1.5)} t={t} />
          <Hero position={MUD} rotationY={AT} animation={p < 0.45 ? "scared" : "crouch"} arms={p < 0.45 ? undefined : "press"} time={p < 0.45 ? t : 0.3} face="scared" />
          <Veins position={MUD} yaw={AT} k={ramp(p, 0.5, 1)} reach={1.6} />
          <Garden />
        </>
      ),
    },
    {
      cue: "5.tree",
      ...cam.push({ on: [-9.2, 4.4, 9.2], dist: 11, to: 12.5, yaw: 100, pitch: 0, fov: 54 }),
      impacts: [
        { at: GROW, amp: 0.12, dur: 0.5 },
        { at: UP + AIR, amp: 0.05, dur: 0.3 },
      ],
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Wide. On 'grew' a whole oak punches up out of the mud under his feet in a blink and THROWS him: he goes on up above the treetop, arms and legs flailing, hangs, comes down into the leaves, bounces, bounces again, and stays. The lava hits the trunk where he was and sprays.",
      stage: (t) => {
        const g = ramp(t, GROW, UP);
        const size = g < 1 ? g : 1 + 0.07 * Math.exp(-(t - UP) * 7) * Math.cos((t - UP) * 24);
        const air = tossed(t, UP, 2.1, AIR);
        const flying = t > UP && air > 0.04;
        const y = TOP * Math.min(1, g) + air;
        return (
          <>
            <Brother position={B0} rotationY={BACK} animation="point" face={t < GROW ? "angry" : "wow"} headPitch={-0.6 * Math.min(1, g)} />
            <LavaJet from={TIPF} to={[MUD[0], 0.9, MUD[2]]} k={0.93 + t} t={t} />
            <GrowTree position={MUD} grow={size} />
            <group position={[MUD[0], y, MUD[2]]} rotation={[flying ? Math.sin(t * 9) * 0.5 : 0, 0, flying ? Math.cos(t * 7) * 0.5 : 0]}>
              <Hero position={[0, 0, 0]} rotationY={AT + (flying ? (t - UP) * 5 : 0)} animation={t < GROW ? "crouch" : flying ? "panic" : g < 1 ? "scared" : "lookAround"} arms={t < GROW ? "press" : undefined} time={t < GROW ? 0.3 : t * (flying ? 2 : 1)} face={flying || g < 1 ? "scared" : "fear"} />
            </group>
            <Bits position={[MUD[0], 0.3, MUD[2]]} t={t - GROW} color="#5a4030" count={24} seed={4} power={2.4} />
            <DustRing position={MUD} t={t - GROW} size={3.0} color="#6a5040" />
            <Bits position={[MUD[0] + 0.8, 1.0, MUD[2] - 0.9]} t={(((t - UP) * 2.5) % 1) * 0.4 + (t > UP ? 0.02 : -1)} color="#ff8a1c" count={14} seed={6} power={1.5} />
            <Bits position={[MUD[0], TOP + 0.2, MUD[2]]} t={t - UP - AIR} color="#4fae3c" count={18} seed={8} power={1.6} />
            <Bits position={[MUD[0], TOP + 0.2, MUD[2]]} t={t - UP - AIR * 1.38} color="#4fae3c" count={10} seed={9} power={1.0} />
            <Streaks position={[MUD[0], 3, MUD[2]]} yaw={0} pitch={-1.5708} t={t} n={t > GROW && t < UP + 0.35 ? 12 : 0} spread={1.6} speed={24} />
            <FireLight position={[-6.5, 3.5, 11.5]} power={30} reach={14} seed={5} />
          </>
        );
      },
    },
    {
      cue: "5.breath",
      ...cam.push({ on: [TREETOP[0], TREETOP[1] + 1.35, TREETOP[2]], dist: 2.9, to: 2.3, yaw: 150, pitch: -6, fov: 38 }),
      handheld: 0.03,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second: him on top of his tree, still rocking with it, hair full of leaves, sucking in one huge breath.",
      stage: (t) => (
        <>
          <GrowTree position={MUD} grow={1} />
          <Hero position={[TREETOP[0] + Math.sin(t * 6) * 0.06, TREETOP[1] + Math.abs(Math.sin(t * 6)) * 0.05, TREETOP[2]]} rotationY={AT} animation="idle" time={t * 3} face="fear" headPitch={-0.25 + Math.sin(t * 7) * 0.12} />
          <Bits position={[TREETOP[0], TREETOP[1] + 1.9, TREETOP[2]]} t={0.15 + t * 0.5} color="#4fae3c" count={8} seed={4} power={0.5} />
          <FireLight position={[TREETOP[0] - 1.5, 7.4, TREETOP[2] - 1.5]} power={14} reach={7} seed={3} />
        </>
      ),
    },
  ],
});
