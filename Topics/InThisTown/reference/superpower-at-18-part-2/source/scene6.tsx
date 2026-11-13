import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
  DustRing, HANDS, Plunger, ROOTWAY, Streaks, Veins, jolt, pathAt, pop, tossed,
} from "./kit";

/** OF COURSE HE CAN FLY. So the teller grows a wing. */
const WING = wordAt("6.wing", "leaf");
const LIFT = 0.55;
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Gliding",
  shots: [
    {
      cue: "6.fly",
      from: [-3.2, 1.5, 11.5],
      to: [-3.0, 3.2, 11.8],
      target: [-7, 1.6, 7.1],
      targetTo: [-7, 6.8, 7.1],
      fov: 46,
      ease: "inOutCubic",
      impacts: [{ at: LIFT, amp: 0.08, dur: 0.4 }],
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The brother drops into a crouch, the ground under him glows, and he goes UP on a column of fire that blasts a ring of dust out across the square, straight up until he is level with the treetop. He looks bored by it.",
      stage: (t) => {
        const x = Math.max(0, t - LIFT);
        const y = 5.4 * (1 - Math.exp(-x * 3.2));
        return (
          <>
            <Brother position={[B0[0], y, B0[2]]} rotationY={BACK} animation={t < LIFT ? "crouch" : "idle"} face="smug" headPitch={-0.2} />
            {x > 0 ? <Flame t={t} position={[B0[0], y - 0.75, B0[2]]} size={2.6} /> : <Glow position={[B0[0], 0.2, B0[2]]} size={2.5 * (t / LIFT)} color="#ff5a1a" opacity={0.6} />}
            <DustRing position={B0} t={x} size={3.2} />
            <Bits position={[B0[0], 0.2, B0[2]]} t={x} color="#8a7a66" count={18} seed={5} power={1.8} />
            <Burst position={[B0[0], 0.4, B0[2]]} t={x} size={1.6} seed={4} />
            <GrowTree position={MUD} grow={1} />
            <Lit at={[B0[0], y, B0[2]]} />
          </>
        );
      },
    },
    {
      cue: "6.wing",
      ...cam.orbit({ on: [TREETOP[0], TREETOP[1] + 1.2, TREETOP[2]], dist: 5.4, yaw: 175, pitch: 6, yawTo: 120, distTo: 4.6, fov: 44 }),
      handheld: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Swinging round him on the treetop. He throws his arms wide, and on 'leaf' one long leaf snaps open out of his shoulders to both sides, wider than he is tall, green and glowing, with a burst of small leaves.",
      stage: (t) => {
        const g = Math.min(1.15, pop(t, WING - 0.25, 0.3));
        return (
          <>
            <GrowTree position={MUD} grow={1} />
            <Glider position={[TREETOP[0], TREETOP[1] + jolt(t, WING - 0.25, 0.15), TREETOP[2]]} yaw={GLIDE_YAW} pitch={0} wing={g} animation={t < WING - 0.35 ? "idle" : "cheer"} face="brave" />
            <Bits position={[TREETOP[0], TREETOP[1] + 1.3, TREETOP[2]]} t={t - WING + 0.25} color="#5cbd48" count={18} seed={4} power={1.6} />
            <Glow position={[TREETOP[0], TREETOP[1] + 1.2, TREETOP[2]]} size={3 * Math.min(1, g)} color="#9dff8a" opacity={0.3} />
            <pointLight position={[TREETOP[0], TREETOP[1] + 2.2, TREETOP[2] + 1]} color="#c8ffb0" intensity={14} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "6.glide",
      from: [-2.5, 5.0, 5.5],
      to: [-1.5, 4.6, 4.5],
      target: [-9.6, 7.0, 10.2],
      targetTo: [-6.4, 5.2, 7.6],
      fov: 46,
      ease: "linear",
      shake: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He takes two running steps along the top of the tree and throws himself off, straight at us. He drops like a stone; then the leaf fills with a snap, and he swoops out over the burning town on the hot air.",
      stage: (t, { p }) => {
        const run = Math.min(1, p / 0.28);
        const g = 0.4 * ramp(p, 0.28, 1);
        const at = glideAt(g);
        const dropped = Math.sin(ramp(p, 0.28, 0.75) * Math.PI) * 0.5;
        return (
          <>
            <GrowTree position={MUD} grow={1} />
            {p < 0.28 ? (
              <Glider position={ahead(TREETOP, GLIDE_YAW, -0.9 + 0.9 * run)} yaw={GLIDE_YAW} pitch={0.25 * run} animation="run" face="brave" />
            ) : (
              <Glider position={[at[0], at[1] - dropped, at[2]]} yaw={GLIDE_YAW} pitch={1.15 * ease(ramp(p, 0.28, 0.5))} roll={Math.sin(t * 3.2) * 0.25} face={p < 0.7 ? "scared" : "wow"} />
            )}
            <Bits position={[TREETOP[0], TREETOP[1] + 0.2, TREETOP[2]]} t={p - 0.26} color="#4fae3c" count={14} seed={4} power={1.2} />
            <Streaks position={[at[0], at[1], at[2]]} yaw={GLIDE_YAW} t={t} n={p > 0.5 ? 10 : 0} spread={1.8} speed={18} color="#ffffff" />
            <pointLight position={[at[0] + 2, at[1] + 0.5, at[2] - 2]} color="#ffc890" intensity={20} distance={9} decay={2} />
          </>
        );
      },
    },
    {
      cue: "6.me",
      from: [-2.4, 4.0, 5.6],
      to: [-0.6, 3.2, 4.2],
      target: [-6.4, 5.2, 7.6],
      targetTo: [-4.3, 4.4, 6.0],
      fov: 44,
      ease: "linear",
      shake: 0.02,
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Flying with him, close, just ahead and below, the town streaming past: he banks left, banks right, and it is the biggest grin of both films. On 'daisy boy' he whoops.",
      stage: (t, { p }) => {
        const at = glideAt(0.4 + 0.26 * p);
        return (
          <>
            <Glider position={[at[0], at[1] + Math.sin(t * 4) * 0.18, at[2]]} yaw={GLIDE_YAW} roll={Math.sin(t * 3.4) * 0.38} face={p < 0.45 ? "wow" : "laugh"} />
            <Streaks position={at} yaw={GLIDE_YAW} t={t} n={14} spread={2.2} speed={20} color="#ffffff" />
            <pointLight position={[at[0] + 1.5, 3.6, at[2] - 1.2]} color="#ffc890" intensity={16} distance={7} decay={2} />
          </>
        );
      },
    },
  ],
});
