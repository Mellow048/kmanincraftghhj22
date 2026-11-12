import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** ONE WEEK LATER. Daylight. He gives it all back. */
const ROW: Vec3[] = [[-2.4, 0, 2.6], [-0.8, 0, 2.6], [0.8, 0, 2.6], [2.4, 0, 2.6]];
const HUE = ["#ffd24a", "#7ac8ff", "#c58aff", "#8dff7a"];
const PEN = PLACE.pen;
export const scene17 = storyScene(timing, {
  id: "scene17",
  title: "One week later",
  shots: [
    {
      cue: "17.week",
      ...cam.push({ on: [0, 3.3, 2], dist: 9.0, to: 8.4, yaw: 0, pitch: -4, fov: 46 }),
      zone: ZONE.day,
      look: DAY,
      note: "Blue sky, the bell, every roof back on. Big white letters hang in the air over the square: 1 WEEK LATER.",
      stage: () => (
        <>
          <Card text="1 WEEK LATER" position={[0, 3.6, 2]} height={0.9} />
          <Mira position={[-1.6, 0, 0.4]} rotationY={0.3} />
          <Old position={[1.8, 0, 0.2]} rotationY={-0.3} />
        </>
      ),
    },
    {
      cue: "17.gave",
      ...cam.truck({ on: [-1.6, 1.3, 2.9], dist: 6.4, yaw: 0, pitch: 5, by: [3.2, 0, 0], fov: 44 }),
      zone: ZONE.day,
      look: DAY,
      note: "A line of villagers in grey, drained robes, in the sun. The boy in black walks along it, and as he passes each one a coloured light leaves his chest and goes home, and the robe takes its colour back.",
      stage: (t, { p }) => {
        const bx = -3.4 + 6.8 * p;
        return (
          <>
            {ROW.map((at, i) => {
              const k = ramp(bx, at[0] - 0.5, at[0] + 0.9);
              return (
                <group key={i}>
                  {k >= 1 ? <Folk n={i} position={at} rotationY={SOUTH} nod={0.2} /> : <Bo drained position={at} rotationY={SOUTH} />}
                  <Drain from={[bx, 1.15, 3.5]} to={[at[0], 1.2, at[2]]} k={k * 0.98} color={HUE[i]} />
                  <Bits position={[at[0], 1.3, at[2]]} t={k >= 1 ? (bx - at[0] - 0.9) * 0.4 : -1} color={HUE[i]} count={10} seed={i + 2} power={0.8} />
                </group>
              );
            })}
            <Brother {...stride([-3.4, 0, 3.5], [3.4, 0, 3.5], p)} animation="walk" face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "17.bo",
      ...cam.push({ on: [0, 2.2, 2.2], dist: 7.0, to: 6.4, yaw: 10, pitch: -4, fov: 46 }),
      zone: ZONE.day,
      look: DAY,
      note: "Bo, bright green again, going up and down in front of the bell like a ball, one block higher than anyone, over and over. The twins watch him, their heads going up and down together.",
      stage: (t) => {
        const y = Math.abs(Math.sin(t * 3.4)) * 2.1;
        return (
          <>
            <Bo position={[0, y, 1.6]} rotationY={SOUTH} />
            <Hero position={[-1.5, 0, 2.6]} rotationY={0.9} animation="idle" face="grin" headPitch={-0.2 - y * 0.12} />
            <Brother position={[1.5, 0, 2.6]} rotationY={-0.9} animation="idle" face="smile" headPitch={-0.2 - y * 0.12} />
          </>
        );
      },
    },
    {
      cue: "17.fix",
      ...cam.push({ on: [9.3, 1.4, -3.4], dist: 6.2, to: 5.4, yaw: 14, pitch: 6, fov: 44 }),
      zone: ZONE.day,
      look: DAY,
      note: "Their own house, whole again but for one gap by the door. On 'he carries' the boy in black comes past with an oak log on his shoulder. On 'I grow' the boy in red puts his palm on the gap, there is a green flash, and new planks fill it.",
      stage: (t, { p }) => {
        const g0 = wordAt("17.fix", "grow");
        const grow = ease(ramp(t, g0, g0 + 0.6));
        const bro = stride([6.2, 0, -2.4], [9.6, 0, -2.6], ease(ramp(p, 0.2, 0.9)));
        return (
          <>
            <Brother {...bro} animation="walk" arms="hold" face="smile" />
            <Block position={[bro.position[0], 1.72, bro.position[2]]} size={[1.5, 0.34, 0.34]} color="#6b4a2a" />
            <Hero position={[10.6, 0, -3.3]} rotationY={NORTH} animation="idle" arms="press" time={0.3} face="grin" />
            <Block position={[10.6, 1.2, -3.95]} size={[1.0 * grow, 1.0 * grow, 0.1]} color="#caa268" />
            <Glow position={[10.6, 1.2, -3.8]} size={2.2 * grow} color="#9dff8a" opacity={0.6 * (1 - Math.abs(grow * 2 - 1))} />
            <Bits position={[10.6, 1.2, -3.7]} t={t - g0 - 0.2} color="#8dff7a" count={12} seed={3} power={0.8} />
          </>
        );
      },
    },
    {
      cue: "17.pigs",
      ...cam.push({ on: [PEN[0] + 0.2, 0.6, PEN[2]], dist: 4.4, to: 3.6, yaw: 16, pitch: 14, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "The pig pen, grass in it now, and daisies. The boy in black is kneeling in front of three pigs with his head down. Two have their backs to him. On 'thinking' the third turns round, slowly, and looks at him.",
      stage: (t) => {
        const w = wordAt("17.pigs", "thinking");
        const turn = ease(ramp(t, w - 0.3, w + 0.6));
        return (
          <>
            <Lawn position={[PEN[0], 0.06, PEN[2]]} size={4.2} seed={3} />
            <Daisy position={[PEN[0] + 1.6, 0.07, PEN[2] + 1.2]} />
            <Daisy position={[PEN[0] - 1.5, 0.07, PEN[2] + 1.4]} />
            <Daisy position={[PEN[0] + 0.3, 0.07, PEN[2] + 1.7]} />
            <Brother position={[PEN[0] - 1.1, -0.42, PEN[2] + 0.2]} rotationY={EAST} animation="sit" face="sad" headPitch={0.45} />
            <Pig position={[PEN[0] + 0.5, 0, PEN[2] - 0.5]} rotationY={1.1} />
            <Pig position={[PEN[0] + 1.3, 0, PEN[2] + 0.5]} rotationY={1.9} />
            <Pig position={[PEN[0] + 0.5, 0, PEN[2] + 0.6]} rotationY={1.5708 - 3.14 * turn} />
          </>
        );
      },
    },
  ],
});
