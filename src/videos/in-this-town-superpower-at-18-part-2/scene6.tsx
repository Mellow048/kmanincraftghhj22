import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** OF COURSE HE CAN FLY. So the teller grows a wing. */
const WING = wordAt("6.wing", "leaf");
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Gliding",
  shots: [
    {
      cue: "6.fly",
      from: [-3.2, 1.5, 11.5],
      to: [-3.2, 3.0, 11.5],
      target: [-7, 1.6, 7.1],
      targetTo: [-7, 6.6, 7.1],
      fov: 46,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The brother bends his knees and simply leaves the ground, fire roaring out from under his feet, straight up until he is level with the treetop. He looks bored by it.",
      stage: (t, { p }) => {
        const y = 5.4 * ease(ramp(p, 0.1, 0.9));
        return (
          <>
            <Brother position={[B0[0], y, B0[2]]} rotationY={BACK} animation={p < 0.1 ? "crouch" : "idle"} face="smug" headPitch={-0.2} />
            {y > 0.05 ? <Flame t={t} position={[B0[0], y - 0.75, B0[2]]} size={2.2} /> : null}
            <Bits position={[B0[0], 0.2, B0[2]]} t={t - 0.25} color="#8a7a66" count={14} seed={5} power={1.2} />
            <GrowTree position={MUD} grow={1} />
            <Lit at={[B0[0], y, B0[2]]} />
          </>
        );
      },
    },
    {
      cue: "6.wing",
      ...cam.push({ on: [TREETOP[0], TREETOP[1] + 1.2, TREETOP[2]], dist: 5.0, to: 4.4, yaw: -30, pitch: 8, fov: 42 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "On the treetop. On 'leaf' one long leaf unrolls out of his shoulders to both sides, wider than he is tall, green and glowing.",
      stage: (t) => {
        const g = ease(ramp(t, WING - 0.3, WING + 0.5));
        return (
          <>
            <GrowTree position={MUD} grow={1} />
            <Glider position={TREETOP} yaw={GLIDE_YAW} pitch={0} wing={g} animation="idle" face="brave" />
            <Glow position={[TREETOP[0], TREETOP[1] + 1.2, TREETOP[2]]} size={3 * g} color="#9dff8a" opacity={0.3} />
            <pointLight position={[TREETOP[0], TREETOP[1] + 2.2, TREETOP[2] + 1]} color="#c8ffb0" intensity={14} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "6.glide",
      from: [-2.5, 5.0, 5.5],
      to: [-1.5, 4.6, 4.5],
      target: [-9.6, 6.6, 10.2],
      targetTo: [-6.4, 5.2, 7.6],
      fov: 46,
      ease: "linear",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He throws himself off. For a moment he drops; then the leaf fills, and he is sliding out over the burning town on the hot air.",
      stage: (t, { p }) => {
        const at = glideAt(0.4 * p);
        return (
          <>
            <GrowTree position={MUD} grow={1} />
            <Glider position={[at[0], at[1] - Math.sin(Math.min(1, p * 2.5) * Math.PI) * 0.7, at[2]]} yaw={GLIDE_YAW} pitch={1.15 * ease(ramp(p, 0, 0.3))} roll={Math.sin(t * 2.2) * 0.12} face="fear" />
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
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Flying with him, close, just ahead: his face, and it is the biggest grin of both films. On 'daisy boy' he whoops.",
      stage: (t, { p }) => (
        <>
          <Glider position={glideAt(0.4 + 0.26 * p)} yaw={GLIDE_YAW} roll={Math.sin(t * 2.2) * 0.14} face={p < 0.45 ? "wow" : "laugh"} />
          <pointLight position={[glideAt(0.4 + 0.26 * p)[0] + 1.5, 3.6, glideAt(0.4 + 0.26 * p)[2] - 1.2]} color="#ffc890" intensity={16} distance={7} decay={2} />
        </>
      ),
    },
  ],
});
