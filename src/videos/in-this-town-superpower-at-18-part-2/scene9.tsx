import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** FAR DOWN THE STREET. He does not come closer. He does not need to. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "A wall of lava",
  shots: [
    {
      cue: "9.wall",
      ...cam.push({ on: chestOf(BFAR), dist: 6.0, to: 4.6, yaw: -76, pitch: 3, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The far end of the street: a small black figure standing in the middle of the road with the town burning either side. On 'both hands' he lifts them, slowly.",
      stage: (t) => {
        const up = ease(ramp(t, wordAt("9.wall", "raised") - 0.2, wordAt("9.wall", "hands")));
        return (
          <>
            <Brother position={BFAR} rotationY={WEST} animation="idle" blendTo="cheer" blend={1 - up} face="angry" />
            <Glow position={[BFAR[0] - 2, 0.2, STREET]} size={6 * up} color="#ff5a1a" opacity={0.5 * up} />
            <Lit at={BFAR} side={-1} />
          </>
        );
      },
    },
    {
      cue: "9.lava",
      ...cam.push({ on: [13.5, 2.6, STREET], dist: 12.5, to: 11.5, yaw: -90, pitch: 2, fov: 52 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From where the town is standing: the road in front of him cracks from one side of the street to the other, and a wall of lava climbs up out of the crack, from house to house, hiding him.",
      stage: (t, { p }) => (
        <>
          <Brother position={BFAR} rotationY={WEST} animation="cheer" face="angry" />
          <Wall x={13.5} kind="lava" rise={ease(ramp(p, 0.05, 0.95))} t={t} />
          <Bits position={[13.5, 0.2, STREET - 2]} t={t} color="#ff8a1c" count={16} seed={3} power={1.6} />
          <Bits position={[13.5, 0.2, STREET + 2]} t={t - 0.2} color="#8a7a66" count={16} seed={5} power={1.6} />
        </>
      ),
    },
    {
      cue: "9.high",
      from: [-4.5, 1.2, 9.5],
      to: [-4.0, 1.2, 9.0],
      target: [6, 3.4, 0.5],
      fov: 56,
      ease: "inOutSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second, from the ground: the bell on its post on the left, and the wall beyond it, exactly as tall, lighting the whole street orange.",
      stage: (t) => <Wall x={13.5} kind="lava" t={t} />,
    },
    {
      cue: "9.push",
      ...cam.push({ on: [11.5, 2.3, STREET], dist: 10.5, to: 9.5, yaw: -58, pitch: 6, fov: 50 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He shoves both palms forward, and the whole wall starts to slide up the street towards us, eating the road as it comes.",
      stage: (t, { p }) => (
        <>
          <Wall x={13.5 - 4.5 * ease(p)} kind="lava" t={t} />
          <Bits position={[13 - 4.5 * ease(p), 0.2, STREET]} t={t % 0.6} color="#ff8a1c" count={14} seed={4} power={1.2} />
        </>
      ),
    },
  ],
});
