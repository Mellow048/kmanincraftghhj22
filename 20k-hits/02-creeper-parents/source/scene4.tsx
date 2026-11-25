import { cam, storyScene } from "../../engine";
import { Creeper, Creeps, DAD_AT, Dad, Fill, Lantern, MUM_AT, Mum, NORTH, Raider, SIX, SOUTH, SQUARE, timing, tw, w } from "./kit";

/** 04 — Players come for gunpowder, and the town starts to hiss. */
const pulse = (t: number, i = 0) => 0.5 + 0.5 * Math.sin(t * 11 + i * 1.7);

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Players",
  shots: [
    {
      cue: "4.night",
      ...cam.push({ on: [0.3, 1.25, 12.2], dist: 7.5, to: 5.6, yaw: 180, pitch: 2, fov: 44 }),
      zone: "town",
      look: "overworld-night",
      note: "Night. Six players walk in at the end of the street, side by side, lit from below by the lantern the middle one carries. We see shapes first, then swords.",
      stage: (t) => (
        <>
          {SIX.map(([x, z], i) => (
            <Raider key={i} who={i} position={[x, 0, z + 5.5 - t * 1.7]} rotationY={NORTH} animation="walk" animDistance={t * 1.7} arms={i % 2 === 0 ? "hold" : undefined} face="smug" />
          ))}
          <Lantern position={[0.3, 0.75, 14.0 - t * 1.7]} />
          <Fill at={[0.3, 1.2, 13.2 - t * 1.7]} power={9} reach={8} />
        </>
      ),
    },
    {
      cue: "4.six",
      ...cam.truck({ on: [-2.6, 1.3, 9.9], dist: 3.6, yaw: 180, pitch: 0, fov: 42, by: [5.2, 0, 0] }),
      zone: "town",
      look: "overworld-night",
      note: "The camera slides along the line of six, close: a face, a sword held up, a face, an empty sack held open, a sword, a sack.",
      stage: (t) => (
        <>
          {SIX.map(([x, z], i) => (
            <Raider key={i} who={i} position={[x, 0, 9.6 + (z - 9.6) * 0.3]} rotationY={NORTH} animation="idle" arms="hold" face={i % 2 ? "grin" : "smug"} />
          ))}
          <Fill at={[-2.6 + t * 2, 1.5, 7.6]} power={10} reach={7} />
        </>
      ),
    },
    {
      cue: "4.powder",
      ...cam.push({ on: [0, 1.25, 4.4], dist: 7.6, to: 6.8, yaw: 0, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "Over the shoulders of two players, one with a sack held open: up the street four creepers stand frozen in the lantern light, staring back.",
      stage: (t) => (
        <>
          <Raider who={0} position={[-0.95, 0, 9.3]} rotationY={NORTH} animation="idle" arms="hold" />
          <Raider who={1} position={[1.0, 0, 9.1]} rotationY={NORTH} animation="idle" arms="hold" />
          <Creeps spots={[[-0.55, 4.6], [0.35, 4.0], [-0.1, 2.6], [0.6, 1.8]]} t={t} face={SOUTH} lookAt={[0, 1.4, 9]} mood="scared" shake={0.01} walk={t * 0.4} shift={[0, 0, -t * 0.4]} first={1} />
          <Fill at={[0, 1.6, 5.5]} power={12} reach={9} />
        </>
      ),
    },
    {
      cue: "4.square",
      ...cam.push({ on: [0, 1.0, -1.5], dist: 13, to: 11.5, yaw: 18, pitch: 30, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "From above: the whole town walks backwards up the street and packs itself into the square, shoulder to shoulder, every face turned south towards the players. Mum and dad are in the front row.",
      stage: (t) => {
        const k = 1 - tw(t, 0, 1.5);
        return (
          <>
            <Creeps spots={SQUARE} t={t} face={SOUTH} walk={-k * 4} shift={[0, 0, k * 4]} mood="scared" lookAt={[0, 1.3, 14]} />
            <Mum position={[MUM_AT[0], 0, MUM_AT[2] + k * 4]} rotationY={SOUTH} walk={-k * 4} mood="scared" />
            <Dad position={[DAD_AT[0], 0, DAD_AT[2] + k * 4]} rotationY={SOUTH} walk={-k * 4} mood="angry" />
            <Fill at={[0, 3.5, 0]} power={16} reach={14} />
          </>
        );
      },
    },
    {
      cue: "4.started",
      ...cam.truck({ on: [-0.9, 1.3, -1.3], dist: 3.0, yaw: 0, pitch: 0, fov: 42, by: [1.8, 0, 0] }),
      zone: "town",
      look: "overworld-night",
      note: "Close along one row of the pack: a creeper starts to shake and swell, then the one next to it, then the next.",
      stage: (t) => (
        <>
          {[-1.9, -0.95, 0, 0.95, 1.9, -1.45, -0.5, 0.45, 1.4, 2.35].map((x, i) => {
            const on = tw(t, 0.15 + ((x + 2) / 4.4) * 0.9, 0.5 + ((x + 2) / 4.4) * 0.9);
            return <Creeper key={i} position={[x + Math.sin(t * 50 + i) * 0.012 * on, 0, i < 5 ? -1.3 : -2.5]} rotationY={SOUTH} mood={on > 0.2 ? "angry" : "scared"} fuse={on * (0.25 + 0.35 * pulse(t, i))} scarf={i % 3 === 0 ? "#7a4fb0" : i % 3 === 1 ? "#e07a2e" : undefined} hat={i === 3 ? "straw" : "none"} scale={0.95 + (i % 3) * 0.04} phase={i} />;
          })}
          <Fill at={[0, 1.8, 1.2]} power={12} reach={8} />
        </>
      ),
    },
    {
      cue: "4.hiss",
      ...cam.push({ on: [2.5, 1.2, 0], dist: 3.0, to: 2.2, yaw: -14, pitch: -6, fov: 38 }),
      zone: "town",
      look: "overworld-night",
      note: "The fact, in one creeper: it swells up, flashes white, swells more, flashes white. Every player knows what comes next.",
      stage: (t) => (
        <>
          <Creeper position={[2.5 + Math.sin(t * 55) * 0.015, 0, 0]} rotationY={SOUTH} mood="angry" fuse={0.3 + tw(t, 0, 2.4) * 0.4 + 0.3 * pulse(t)} scarf="#3f6fc2" />
          <Creeper position={[4.3, 0, -0.9]} rotationY={SOUTH} mood="angry" fuse={0.25 + 0.3 * pulse(t, 2)} phase={2} />
          <Creeper position={[1.4, 0, -1.4]} rotationY={SOUTH} mood="angry" fuse={0.25 + 0.3 * pulse(t, 4)} scale={0.9} phase={4} />
          <Fill at={[2.2, 1.6, 2.6]} power={10} reach={7} />
        </>
      ),
    },
    {
      cue: "4.chain",
      ...cam.push({ on: [0, 1.0, -2.5], dist: 10, to: 12, yaw: 0, pitch: 34, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "From above: the whole pack, and the white runs through it like a wave, from the front row to the back. There are houses on every side of them.",
      stage: (t) => (
        <>
          {SQUARE.map(([x, z], i) => (
            <Creeper key={i} position={[x + Math.sin(t * 50 + i) * 0.012, 0, z]} rotationY={SOUTH} mood="angry" fuse={0.3 + 0.55 * (0.5 + 0.5 * Math.sin(t * 9 + z * 1.1))} scarf={i % 4 === 0 ? "#7a4fb0" : i % 4 === 1 ? "#e07a2e" : i % 4 === 2 ? "#e0b83a" : undefined} hat={i % 6 === 2 ? "straw" : "none"} scale={i % 7 === 5 ? 0.62 : 0.95 + (i % 3) * 0.04} phase={i} />
          ))}
          <Mum position={MUM_AT} rotationY={SOUTH} mood="angry" fuse={0.3 + 0.55 * pulse(t, 1)} />
          <Dad position={DAD_AT} rotationY={SOUTH} mood="angry" fuse={0.3 + 0.55 * pulse(t, 2)} />
          <Fill at={[0, 4, -1]} power={18} reach={15} />
        </>
      ),
    },
    {
      cue: "4.white",
      ...cam.pan({ from: [0.05, 1.45, 4.6], on: [MUM_AT[0], 1.25, MUM_AT[2]], onTo: [DAD_AT[0], 1.3, DAD_AT[2]], fov: 30 }),
      zone: "town",
      look: "overworld-night",
      note: "Close on mum: her bow, her scarf, and her whole body flashing white. The camera swings to dad under his straw hat: white, green, white.",
      stage: (t) => (
        <>
          <Mum position={[MUM_AT[0] + Math.sin(t * 55) * 0.012, 0, MUM_AT[2]]} rotationY={SOUTH} mood="angry" fuse={0.35 + 0.6 * pulse(t, 1)} />
          <Dad position={[DAD_AT[0] + Math.sin(t * 55 + 2) * 0.012, 0, DAD_AT[2]]} rotationY={SOUTH} mood="angry" fuse={0.35 + 0.6 * pulse(t, 2.6)} />
          <Creeps spots={SQUARE.slice(0, 9)} t={t} face={SOUTH} mood="angry" fuse={0.5} shake={0.012} />
          <Fill at={[0, 1.7, 4]} power={11} reach={7} />
        </>
      ),
    },
  ],
});
