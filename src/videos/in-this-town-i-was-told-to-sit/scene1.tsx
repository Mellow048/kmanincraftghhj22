import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Bubble, Camp, DayCount, Dog, LENS, Life, Loaf, NORTH, Owner, PERCH, Parrot, ROBE, SOUTH, Sword, TownParts, Villager, hop, pop, timing, tw, w } from "./kit";

/** 01 — He was told to sit, four hundred days ago, and he has not moved. */
const HOOK = [0.22, 0.38, 0.54, 0.7, 1.12, 1.12, 1.12, 1.12];

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Told to sit",
  shots: [
    {
      cue: "1.sit",
      ...cam.push({ on: [0, 1.05, 0], dist: 4.3, to: 3.5, yaw: 0, pitch: 8, fov: 50 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The hook, and it never holds still: a white dog drops into a sit in an empty meadow and looks into the lens, and a town pops up round him a piece at a time: a house, a house, a house, a bell, three villagers, lamps, a sign at his shoulder, a parrot on the sign, a farmer, and a loaf on his head. Everyone looks at us. He does not move.",
      stage: (t) => {
        const grow = (i: number) => (i < 3 ? pop(t, HOOK[i], 0.2) : i === 9 ? pop(t, HOOK[3], 0.2) : i >= 11 && i <= 12 ? pop(t, HOOK[4], 0.2) : 0);
        const sat = tw(t, 0.02, 0.16);
        const folk: Array<[Vec3, string, number, boolean]> = [
          [[-1.75, 0, -2.3], ROBE.brown, 0.84, false],
          [[1.05, 0, -3.3], ROBE.blue, 0.98, false],
          [[-0.75, 0, -3.9], ROBE.friend, 1.26, true],
        ];
        const farmer = 1.62;
        const loaf = 1.86;
        return (
          <>
            <Camp sign={pop(t, 1.4, 0.2)} />
            <TownParts grow={grow} />
            <Dog sit={sat} wag={t < 0.3 ? 1 : 0} headPitch={-hop(t, loaf, 0.1, 0.3)} mood={t > loaf + 0.1 && t < loaf + 0.3 ? "wide" : "calm"} lookAt={undefined} onHead={<Loaf scale={0.8 * pop(t, loaf, 0.16)} position={[0, 0.5 * (1 - tw(t, loaf, loaf + 0.12)), 0]} />} />
            {folk.map(([p, robe, at, kid], i) => (
              <Villager key={i} position={[p[0], hop(t, at, 0.35, 0.25), p[2]]} scale={(kid ? 0.7 : 0.94) * pop(t, at, 0.18)} kid={kid} robe={robe} lookAt={LENS} phase={i} />
            ))}
            <Villager position={[-1.2, hop(t, farmer, 0.3, 0.22), 0.5]} rotationY={0.9} scale={0.94 * pop(t, farmer, 0.18)} robe={ROBE.farmer} hat="straw" lookAt={LENS} />
            <Parrot position={[PERCH[0], PERCH[1] + 1.6 * (1 - tw(t, 1.5, 1.66)), PERCH[2]]} scale={1.7 * pop(t, 1.5, 0.14)} flap={t < 1.7 ? 1 : 0} headYaw={-0.3} />
          </>
        );
      },
    },
    {
      cue: "1.days",
      ...cam.push({ on: [0, 0.78, 0.5], dist: 3.9, to: 3.4, yaw: -7, pitch: 3, fov: 40 }),
      zone: "town",
      look: "overworld-day",
      note: "Close on him, the loaf on his head. Over him a counter spins up from DAY 1 to DAY 400 and lands with a bump. The town strolls about behind him. He blinks once.",
      stage: (t) => {
        const land = w("1.days", "hundred") + 0.12;
        const n = 1 + 399 * tw(t, 0.05, land);
        return (
          <>
            <Camp />
            <Life t={t} creeper={false} />
            <Dog blink={false} mood={t > land + 0.25 && t < land + 0.4 ? "shut" : "calm"} onHead={<Loaf scale={0.8} />} />
            <Parrot position={PERCH} headYaw={-0.3} tilt={0.2} />
            <DayCount position={[-0.08, 1.72 + hop(t, land, 0.08, 0.2), 0.8]} n={n} scale={0.56 * pop(t, 0.02, 0.15) * (1 + hop(t, land, 0.18, 0.22))} rotationY={-0.12} />
          </>
        );
      },
    },
    {
      cue: "1.moved",
      ...cam.push({ on: [0, 0.82, 0.62], dist: 2.5, to: 2.2, yaw: 58, pitch: 2, fov: 36 }),
      zone: "town",
      look: "overworld-day",
      note: "His face from the side, very close. A yellow butterfly comes down and lands on the end of his nose. His eyes go wide. Nothing else of him moves.",
      stage: (t) => {
        const land = 0.55;
        const k = tw(t, 0, land);
        const nose: Vec3 = [0, 0.86, 1.1];
        const from: Vec3 = [0.9, 1.7, 1.9];
        const p: Vec3 = [from[0] + (nose[0] - from[0]) * k + Math.sin(t * 9) * 0.1 * (1 - k), from[1] + (nose[1] - from[1]) * k + Math.sin(t * 13) * 0.06 * (1 - k), from[2] + (nose[2] - from[2]) * k];
        const flap = Math.sin(t * (k < 1 ? 38 : 9)) * (k < 1 ? 0.9 : 0.5);
        return (
          <>
            <Camp />
            <Life t={t} n={3} creeper={false} />
            <Dog blink={false} mood={t > land ? "wide" : "calm"} onHead={<Loaf scale={0.8} />} />
            <group position={p} rotation={[0, 0.9, 0]}>
              <Block size={[0.03, 0.04, 0.14]} color="#2a211c" castShadow={false} />
              {[-1, 1].map((s) => (
                <group key={s} rotation={[0, 0, s * (0.5 + flap)]}>
                  <Block position={[s * 0.1, 0, 0]} size={[0.2, 0.014, 0.17]} color="#f5c93a" emissive="#f5c93a" emissiveIntensity={0.3} castShadow={false} />
                </group>
              ))}
            </group>
          </>
        );
      },
    },
    {
      cue: "1.owner",
      ...cam.push({ on: [0.35, 0.95, 1.4], dist: 4.9, to: 5.4, yaw: 184, pitch: 5, fov: 43 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Four hundred days ago, from behind the dog and under his little roof: no town, only the meadow and the forest. His owner, in a red shirt and iron armour with a sword, points at him. A bubble: SIT. The dog, who was standing and wagging, sits. The owner turns and walks down the path into the trees.",
      stage: (t) => {
        const say = w("1.owner", "one") - 0.1;
        const leave = w("1.owner", "walked") - 0.15;
        const k = tw(t, leave + 0.25, leave + 2.2);
        const turn = tw(t, leave, leave + 0.25);
        const z = 2.6 + k * 7.5;
        const x = 0.95 - k * 0.7;
        return (
          <>
            <Camp sign={0} />
            <Dog sit={tw(t, say + 0.12, say + 0.3)} wag={t < say + 0.2 ? 1 : 0.25} tail={t < say + 0.2 ? 0.6 : 0} lookAt={[x, 1.5, z]} />
            <Owner armour position={[x, 0, z]} rotationY={NORTH + turn * Math.PI} animation={t < leave ? "point" : "walk"} animDistance={k * 7.5} face={t < leave ? "calm" : "frown"} headPitch={t < leave ? 0.25 : 0}>
              <Sword />
            </Owner>
            <Bubble text="SIT" position={[0.75, 2.3, 2.4]} rotationY={NORTH} scale={1.25 * pop(t, say, 0.16) * (t > leave + 0.2 ? 1 - tw(t, leave + 0.2, leave + 0.4) : 1)} tail={1} />
          </>
        );
      },
    },
  ],
});
void SOUTH;
