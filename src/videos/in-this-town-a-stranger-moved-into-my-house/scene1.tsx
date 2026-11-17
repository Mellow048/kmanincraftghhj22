import { cam, storyScene } from "../../engine";
import { Vox } from "../../engine";
import { Bubble, EAST, Life, Loaf, Pickaxe, Lying, Me, MiniBed, MyRoom, NORTH, PLACE, Puffs, SOUTH, Stranger, Town, Villager, ROBE, pop, posed, timing, tw } from "./kit";

/** 01 — A stranger moved into his house, and put his bed in his pocket. */
const BED = PLACE.bed;
export const NOW = { bell: false, hole: true, wheat: 0, torches: true, wall: true };

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "He did not knock",
  shots: [
    {
      cue: "1.moved",
      ...cam.push({ on: [0.55, 1.05, -0.5], dist: 5.3, to: 4.0, yaw: 0, pitch: 10, fov: 50 }),
      zone: "room",
      look: "overworld-day",
      note: "The hook, and it keeps changing: a villager stands beside his own bed. There is a player asleep in it with his boots on. A Z pops off him, a pickaxe lands against the bed, a question mark over the villager, a loaf on the blanket, a block of dirt on the floor, another on top, more Zs, and then the villager looks at us with a ! over his head.",
      stage: (t) => (
        <>
          <MyRoom bed door="flat" />
          <Stranger position={[BED[0], 0.56 + Math.sin(t * 3) * 0.015, BED[2] + 0.15]} rotationY={SOUTH + Math.sin(tw(t, 1.0, 1.3) * Math.PI) * 0.25} animation="sleep" face="sleepy" time={t} />
          <Me position={[0.05, 0, -0.35]} rotationY={SOUTH} turn={t < 0.35 ? 0.9 : t > 1.1 && t < 1.55 ? 0.9 : 0} nod={t < 0.35 || (t > 1.1 && t < 1.55) ? 0.25 : 0} />
          {[0.15, 0.75, 1.35].map((at, i) => (
            <Bubble key={i} text="Z" position={[BED[0] - 0.15 + i * 0.22, 1.25 + i * 0.32 + (t - at) * 0.25, BED[2] - 0.5]} scale={(0.55 + i * 0.14) * pop(t, at, 0.16)} tail={-1} tilt={0.15} />
          ))}
          {/* his things arrive one at a time: a pickaxe against my bed, my bread on my blanket, two blocks of dirt on my floor */}
          <Pickaxe position={[0.5, 0.04, 0.12]} rotation={[-1.42, 0, 0]} scale={1.1 * pop(t, 0.28, 0.14)} />
          <Loaf position={[BED[0] + 0.1, 0.56, BED[2] + 0.95]} rotation={[0, 0.5, 0]} scale={0.9 * pop(t, 0.62, 0.14)} />
          {pop(t, 0.9, 0.14) > 0.01 ? <group position={[1.2, 0, 1.25]} scale={0.62 * pop(t, 0.9, 0.14)}><Vox kind="dirt" position={[0, 0.3, 0]} size={[0.6, 0.6, 0.6]} /></group> : null}
          {pop(t, 1.25, 0.14) > 0.01 ? <group position={[1.14, 0.372, 1.22]} rotation={[0, 0.3, 0]} scale={0.62 * pop(t, 1.25, 0.14)}><Vox kind="dirt" position={[0, 0.3, 0]} size={[0.6, 0.6, 0.6]} /></group> : null}
          <Bubble text="?" position={[-0.25, 2.25, -0.3]} scale={0.6 * pop(t, 0.42, 0.14) * (t > 1.1 ? 0 : 1)} tail={1} tilt={-0.1} />
          <Bubble text="!" position={[-0.25, 2.25, -0.3]} scale={0.7 * pop(t, 1.6, 0.14)} tail={1} tilt={-0.1} />
        </>
      ),
    },
    {
      cue: "1.knock",
      ...cam.push({ on: [-0.2, 0.8, -1.4], dist: 5.0, to: 4.5, yaw: 6, pitch: 22, fov: 44 }),
      zone: "room",
      look: "overworld-day",
      note: "The door. It is lying flat on the floor with a boot print on it, and daylight comes through the hole where it was.",
      stage: (t) => (
        <>
          <MyRoom bed door="flat" />
          <Me position={[0.35, 0, -1.0]} rotationY={-1.1} lookAt={[-0.6, 0, -1.2]} hmm={t > 0.3 ? 0.5 : 0} />
        </>
      ),
    },
    {
      cue: "1.slept",
      ...cam.push({ on: [0.7, 0.9, -1.0], dist: 5.0, to: 4.6, yaw: 0, pitch: 26, fov: 44 }),
      zone: "room",
      look: "overworld-day",
      note: "From above the bed: the stranger flat out in it with his mouth open and his boots on the blanket, and the villager standing over him, looking down.",
      stage: (t) => (
        <>
          <MyRoom bed door="flat" />
          <Stranger position={[BED[0], 0.56 + Math.sin(t * 3) * 0.015, BED[2] + 0.15]} rotationY={SOUTH} animation="sleep" face="sleepy" time={t} />
          <Me position={[0.2, 0, -1.1]} rotationY={EAST} nod={0.45} />
          <Bubble text="Z" position={[BED[0] + 0.1, 1.5 + t * 0.2, BED[2] - 0.5]} scale={0.7} tail={-1} tilt={0.15} />
        </>
      ),
    },
    {
      cue: "1.pocket",
      ...cam.push({ on: [0.55, 1.0, -0.8], dist: 5.4, to: 4.8, yaw: 0, pitch: 13, fov: 46 }),
      zone: "room",
      look: "overworld-day",
      note: "He gets up, hits the bed once, and it turns into a small spinning bed that flies into him. Where it stood there is a pale mark on the floor. The villager watches it go.",
      stage: (t) => {
        const hit = 0.3;
        const fly = tw(t, hit + 0.1, hit + 0.55);
        const gone = t > hit;
        const item: [number, number, number] = [BED[0] + (0.25 - BED[0]) * fly, 0.7 + Math.sin(fly * Math.PI) * 0.5 + 0.3 * fly, BED[2] + (-0.7 - BED[2]) * fly];
        return (
          <>
            <MyRoom bed={!gone} door="flat" />
            <Stranger position={[0.2, 0, -0.75]} rotationY={EAST - 0.3} face="smile" pose={posed("idle", t, { armR: [-1.5 + Math.sin(tw(t, 0.1, hit + 0.1) * Math.PI) * 0.9, 0, 0] })} />
            {gone && fly < 1 ? <MiniBed position={item} spin={t * 9} scale={1.6 - fly} /> : null}
            {gone && t < hit + 0.5 ? <Puffs position={[BED[0], 0.4, BED[2]]} count={7} spread={1} size={0.3} rise={0.8} speed={2} color="#e9d9c0" /> : null}
            <Me position={[-0.75, 0, 0.5]} rotationY={NORTH - 0.7} lookAt={gone ? [item[0], item[1], item[2]] : [BED[0], 0.6, BED[2]]} />
          </>
        );
      },
    },
    {
      cue: "1.days",
      ...cam.push({ on: [BED[0], 0.2, BED[2] + 0.1], dist: 4.4, to: 4.0, yaw: 0, pitch: 58, fov: 44 }),
      zone: "room",
      look: "overworld-night",
      note: "Thirty nights later, from above: the villager asleep on the bare floor, exactly on the pale mark where his bed was.",
      stage: (t) => (
        <>
          <MyRoom door="flat" night torches={3} />
          <Lying position={[BED[0], 0.16, BED[2] + 0.95]}>
            <Me position={[0, 0, 0]} nod={-0.1 + Math.sin(t * 2) * 0.03} />
          </Lying>
        </>
      ),
    },
    {
      cue: "1.want",
      ...cam.push({ on: [0, 1.2, 2.6], dist: 8.6, to: 7.8, yaw: 0, pitch: 9, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Outside. The stranger runs across the square, jumping with every step the way players do. Three villagers stand in a row and their heads follow him.",
      stage: (t) => {
        const x = -1.9 + t * 3.1;
        const y = Math.abs(Math.sin(t * 7.5)) * 0.55;
        return (
          <>
            <Town {...NOW} />
            <Life t={t} n={2} look={[x, 1.4, 4.2]} />
            {([[-1.4, 0.4, ROBE.brown], [0, -0.3, ROBE.farmer], [1.4, 0.4, ROBE.blue]] as Array<[number, number, string]>).map(([vx, vz, robe], i) => (
              <Villager key={i} position={[vx, 0, vz]} rotationY={SOUTH} robe={robe} lookAt={[x, 1.4 + y, 4.2]} phase={i + 5} />
            ))}
            <Stranger position={[x, y, 4.2]} rotationY={EAST} animation="run" face="grin" />
          </>
        );
      },
    },
  ],
});
