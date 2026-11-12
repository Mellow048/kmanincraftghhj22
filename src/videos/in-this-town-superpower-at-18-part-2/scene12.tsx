import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** HE PUSHES IT BACK. And it does not go back the way it came. */
const ROSES = wordAt("12.thorns", "roses");
const THORNS = wordAt("12.thorns", "thorns");
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "Roses, then thorns",
  shots: [
    {
      cue: "12.push",
      ...cam.push({ on: [2.6, 1.4, STREET], dist: 5.6, to: 5.0, yaw: -62, pitch: 5, fov: 46 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He plants his feet and shoves the air with both hands, exactly as his brother did. The wall goes.",
      stage: (t, { p }) => (
        <>
          <Hero position={STAND} rotationY={EAST} animation="press" face="brave" />
          <Wall x={4.4 + 1.6 * ease(p) * ease(p)} kind="grass" />
          <pointLight position={[2.4, 2.4, STREET + 1.6]} color="#c8ffb0" intensity={7} distance={9} decay={2} />
        </>
      ),
    },
    {
      cue: "12.thorns",
      from: [10.5, 2.0, 10.5],
      to: [16.5, 2.0, 10.5],
      target: [6.0, 2.4, 2.8],
      targetTo: [12.0, 2.4, 2.8],
      fov: 50,
      ease: "linear",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Running ahead of the wall and looking back at its face as it comes down the street. On 'roses' red roses open all over it, dozens of them. On 'thorns' a thorn as long as an arm comes out beside every one.",
      stage: (t, { p }) => (
        <>
          <Wall x={6.0 + 6.0 * p} kind="grass" roses={ease(ramp(t, ROSES - 0.2, ROSES + 0.7))} thorns={ease(ramp(t, THORNS - 0.15, THORNS + 0.5))} />
          <Bits position={[6.5 + 6.0 * p, 0.2, STREET]} t={t % 0.6} color="#5cbd48" count={12} seed={4} power={1.1} />
          <pointLight position={[8.5 + 6.0 * p, 2.6, STREET + 2]} color="#ffe0c0" intensity={30} distance={10} decay={2} />
        </>
      ),
    },
    {
      cue: "12.late",
      ...cam.push({ on: faceOf(BFAR), dist: 3.6, to: 2.6, yaw: -128, pitch: -3, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The brother. Every stolen light he owns comes out and goes round him in a blur while he tries one hand, then the other, fire, then nothing, and green light climbs up his face. He is, for the first time, frightened.",
      stage: (t, { p }) => (
        <>
          <Brother position={BFAR} rotationY={WEST} animation="panic" face={p < 0.3 ? "wow" : "scared"} flame={p < 0.5 ? t : undefined} gaze={0} />
          <Orbs position={BFAR} t={t * 3.5} count={18} />
          <Lit at={BFAR} side={-1} />
          <pointLight position={[BFAR[0] - 2.2, 1.8, BFAR[2] + 0.4]} color="#b8ff9a" intensity={2 + 10 * p} distance={9} decay={2} />
        </>
      ),
    },
    {
      cue: "12.hit",
      ...cam.push({ on: [16.4, 1.4, STREET], dist: 7.6, to: 7.0, yaw: 35, pitch: 5, fov: 48 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Wide. The hedge arrives. On 'hit' it takes him off his feet and carries him back down the road in a cloud of leaves and petals, and then stops, and he does not.",
      stage: (t) => {
        const hit = wordAt("12.hit", "hit");
        const k = ease(ramp(t, 0, hit));
        const after = ramp(t, hit, hit + 0.6);
        return (
          <>
            <Wall x={12.4 + 2.9 * k} kind="grass" roses={1} thorns={1} />
            <Brother position={[BFAR[0] + 1.5 * ease(after), Math.sin(after * Math.PI) * 0.9, BFAR[2]]} rotationY={WEST} animation={t < hit ? "cower" : "fall"} face={t < hit ? "scared" : "ouch"} />
            <Bits position={[15.6, 1.4, STREET]} t={t - hit} color="#5cbd48" count={22} seed={3} power={2.0} />
            <Bits position={[15.6, 1.8, STREET]} t={t - hit} color="#d81f3a" count={16} seed={6} power={1.6} />
            <Bits position={[15.6, 0.8, STREET + 0.5]} t={t - hit - 0.05} color="#ff5a6e" count={12} seed={9} power={1.3} />
            <Lit at={BFAR} />
          </>
        );
      },
    },
    {
      cue: "12.dizzy",
      ...cam.push({ on: [BKNEEL[0], 1.2, BKNEEL[2]], dist: 3.5, to: 3.0, yaw: -70, pitch: 0, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He is on his feet, just. He rocks forward and back with his eyes going round, scratched all over, and there is one red rose standing straight up in his hair. Petals come down round him like snow.",
      stage: (t) => (
        <>
          <Brother position={BKNEEL} rotationY={WEST + Math.sin(t * 2.4) * 0.25} animation="idle" face="dizzy" headYaw={Math.sin(t * 3.1) * 0.3} headPitch={Math.sin(t * 2.4) * 0.15} />
          <Rose position={[BKNEEL[0], 1.74, BKNEEL[2]]} scale={1.1} />
          <Bits position={[BKNEEL[0], 2.6, BKNEEL[2]]} t={0.5 + t * 0.25} color="#d81f3a" count={14} seed={4} power={0.6} />
          <Lit at={BKNEEL} side={-1} />
        </>
      ),
    },
  ],
});
