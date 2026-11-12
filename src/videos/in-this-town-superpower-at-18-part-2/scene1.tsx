import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** THE STORY SO FAR, in six shots. Then it starts on the second part one stopped. */
const NEAR: Vec3 = [8.4, 0, 0.2];
const LIFE = wordAt("1.life", "life");
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The story so far",
  shots: [
    {
      cue: "1.town",
      ...cam.orbit({ on: [0, 1.7, -1.6], dist: 6.6, yaw: 18, pitch: 5, yawTo: -6 }),
      zone: ZONE.day,
      look: DAY,
      note: "The town as it was, in the sun: the bell, and three neighbours under it. On 'superpower' the bell rings and Bo, in green, jumps.",
      stage: (t) => (
        <>
          <SoundRings position={[0, 2.7, -2.2]} t={t - wordAt("1.town", "superpower")} color="#ffe08a" reach={2.8} />
          <Bo position={[1.3, hop(t, wordAt("1.town", "superpower"), 1.6, 0.8), -0.6]} rotationY={Math.PI} />
          <Mira position={[-1.3, 0, -0.6]} rotationY={Math.PI} lookAt={[0, 3, -2.5]} />
          <Tip position={[0, 0, 0.2]} rotationY={Math.PI} lookAt={[0, 3, -2.5]} />
        </>
      ),
    },
    {
      cue: "1.mine",
      ...cam.push({ on: [U[0] + 0.2, 0.9, U[2]], dist: 3.6, to: 3.0, yaw: 8, pitch: 6, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "Him, in red, under the bell, scowling down at one small daisy by his foot.",
      stage: (t, { p }) => (
        <>
          <Hero position={U} rotationY={SOUTH} animation="idle" face={p < 0.5 ? "uneasy" : "angry"} headPitch={0.4} />
          <Daisy position={[U[0] + 0.45, 0, U[2] + 0.3]} grow={ease(ramp(p, 0, 0.35))} scale={1.6} />
        </>
      ),
    },
    {
      cue: "1.his",
      ...cam.orbit({ on: [8.4, 1.25, 0.2], dist: 3.8, yaw: -20, pitch: 4, yawTo: 14 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Cut to night and fire. His twin in black, grinning, with every power he has taken wheeling round him as coloured lights.",
      stage: (t) => (
        <>
          <Brother position={NEAR} rotationY={SOUTH} animation="cheer" face="grin" flame={t} />
          <Orbs position={NEAR} t={t} count={18} />
          <Lit at={NEAR} />
        </>
      ),
    },
    {
      cue: "1.back",
      ...cam.push({ on: [8.6, 1.9, -0.6], dist: 7.6, to: 6.6, yaw: 10, pitch: 3, fov: 44 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Wider: on 'burned' the ruin behind him blows up again. He does not even look round.",
      stage: (t) => (
        <>
          <Brother position={NEAR} rotationY={SOUTH} animation="idle" face="smug" flame={t} />
          <Burst position={[9.8, 1.8, -5.2]} t={t - wordAt("1.back", "burned")} size={4.6} seed={3} />
          <Burst position={[6.8, 2.6, -4.4]} t={t - wordAt("1.back", "burned") - 0.25} size={3.2} seed={7} />
          <Lit at={NEAR} />
        </>
      ),
    },
    {
      cue: "1.life",
      ...cam.push({ on: [MUD[0], 0.4, MUD[2]], dist: 4.8, to: 4.0, yaw: 30, pitch: 36, fov: 42 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The pig pen from above: him on one knee, palm on the mud, and on 'life' the mud turning to grass and daisies all round him.",
      stage: (t) => {
        const k = ease(ramp(t, LIFE - 1.4, LIFE + 0.3));
        return (
          <>
            <Hero position={MUD} rotationY={AT} animation="crouch" arms="press" time={0.3} face="wow" headPitch={0.4} />
            <Lawn position={[MUD[0], 0.06, MUD[2]]} size={1.1 + 2.6 * k} seed={3} glow />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Daisy key={i} position={[MUD[0] + Math.cos(i * 1.1) * 1.1, 0.07, MUD[2] + Math.sin(i * 1.1) * 1.1]} grow={ease(ramp(k, 0.2 + i * 0.1, 0.5 + i * 0.1))} />
            ))}
            <pointLight position={[MUD[0], 1.2, MUD[2]]} color="#9dff8a" intensity={5 * k} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "1.know",
      ...cam.push({ on: [MUD[0], 1.3, MUD[2]], dist: 3.0, to: 2.3, yaw: 132, pitch: -2, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He stands up out of the daisies and says it, straight at his brother. The last shot of part one.",
      stage: (t, { p }) => (
        <>
          <Hero position={MUD} rotationY={AT} animation="crouch" blendTo="idle" blend={1 - ease(ramp(p, 0, 0.4))} face="brave" gaze={0} />
          <Garden />
          <FireLight position={ahead(MUD, AT, 2.2, 1.8)} power={14} reach={7} seed={4} />
        </>
      ),
    },
  ],
});
