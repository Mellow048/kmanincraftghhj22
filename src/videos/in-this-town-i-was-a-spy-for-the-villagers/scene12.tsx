import { Block, cam, storyScene } from "../../engine";
import { Barrel, BatteringRam, BellTower, HayPile, MarketCart, Pillager, ROBE, Villager, timing, wordAt, jolt, ramp } from "./kit";

const BURY = wordAt("12.swing", "buried");

/** The dawn raid enters the zigzag; the ram misses the bell and lands in hay. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "The dawn raid",
  shots: [
    {
      cue: "12.charge",
      ...cam.push({ on: [0, 2.5, 7], dist: 16, to: 12.8, yaw: 0, pitch: 10, fov: 52 }),
      zone: "village",
      look: "overworld-day",
      note: "A wide view makes the village street and its zigzag defences readable as the pillagers charge in.",
      stage: (t, { p }) => (
        <>
          <MarketCart position={[-4.6, 0, 4.2]} rotationY={-0.12} load />
          <Barrel position={[1.2, 0, 1.9]} />
          <HayPile position={[-2.2, 0, -0.4]} />
          <MarketCart position={[4.0, 0, -3.3]} rotationY={0.32} />
          <HayPile position={[7.4, 0, -0.8]} />
          <BatteringRam position={[0, 0, 14 - p * 1.2]} wheelSpin={t * 7} yaw={Math.PI} bob={Math.abs(Math.sin(t * 10)) * 0.05} />
          <Pillager position={[-1.2, 0, 16 - p]} n={0} chief walk={t * 1.3} cheer={0.2} />
          <Pillager position={[1.4, 0, 16.6 - p]} n={1} walk={t * 1.3} />
          <Villager position={[-7, 0, -1]} robe={ROBE.blue} hmm={0.5} phase={0.8} />
        </>
      ),
    },
    {
      cue: "12.ram",
      ...cam.truck({ on: [0, 1.15, 4], dist: 5.5, yaw: 76, pitch: 1, by: [2.2, 0, -1.1], fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The camera races beside the ram as its square wheels rattle between the first two carts.",
      stage: (t, { p }) => (
        <>
          <MarketCart position={[-4.6, 0, 4.2]} rotationY={-0.12} load />
          <Barrel position={[1.2, 0, 1.9]} />
          <HayPile position={[-2.2, 0, -0.4]} />
          <MarketCart position={[4.0, 0, -3.3]} rotationY={0.32} />
          <BatteringRam position={[-0.2 + p * 1.6, 0, 11 - p * 5.4]} wheelSpin={t * 10} yaw={Math.PI + p * 0.14} bob={Math.abs(Math.sin(t * 13)) * 0.07} />
          <Pillager position={[-1.6, 0, 12.6 - p * 4]} n={2} walk={t * 1.5} lean={-0.2} />
          <Pillager position={[1.4, 0, 12.9 - p * 4]} n={3} walk={t * 1.5} lean={-0.2} />
        </>
      ),
    },
    {
      cue: "12.swing",
      ...cam.orbit({ on: [3.0, 1.45, 2.0], dist: 12.5, distTo: 12.2, yaw: 0, yawTo: 6, pitch: 7, fov: 62 }),
      zone: "village",
      look: "overworld-day",
      note: "The ram swings wide on the word buried and thumps into the soft hay instead of the bell tower.",
      stage: (t) => {
        const swing = ramp(t, 0.2, BURY + 0.18);
        const hit = ramp(t, BURY, BURY + 0.2);
        const ramX = 1.4 + swing * 2.7;
        const ramZ = 5.6 - swing * 6.8;
        const ramYaw = Math.PI + 0.14 * (1 - swing) - swing * (Math.PI / 2 + 0.14);
        return (
          <>
            <MarketCart position={[-4.6, 0, 4.2]} rotationY={-0.12} load />
            <Barrel position={[1.2, 0, 1.9]} />
            <MarketCart position={[4.0, 0, -3.3]} rotationY={0.32} />
            <HayPile position={[7.0, 0, -1.2]} topple={hit * 0.14} />
            <group position={[0, 0, 0.8]}><BatteringRam position={[ramX + jolt(t, BURY, 0.16), 0, ramZ]} wheelSpin={t * 9} yaw={ramYaw} lean={hit * 0.18} tilt={-hit * 0.12} bob={hit * 0.24} /></group>
            <group position={[6.5 + hit * 0.6, hit * 1.3, 0.4]} rotation={[0, 0, hit * 1.5]}><Pillager position={[0, 0, 0]} n={1} cheer={hit * 0.4} /></group>
            <Pillager position={[2.4, 0, 1.9]} n={2} walk={t * 0.6} lean={hit * 0.4} />
            <Block position={[7.3, 1.4 + hit * 0.6, -0.4]} size={[0.18, 0.18, 0.18]} color="#d9b23a" />
          </>
        );
      },
    },
    {
      cue: "12.bell",
      ...cam.pan({ from: [6, 3.1, 4.2], on: [4.8, 1.4, -1.2], onTo: [0, 3.2, -7], fov: 43 }),
      zone: "village",
      look: "overworld-day",
      note: "The pan passes the toppled ram and lands on the bell still standing while villagers cheer below it.",
      stage: (t) => (
        <>
          <BellTower position={[0, 0, -7]} />
          <HayPile position={[7, 0, -1.2]} topple={0.12} />
          <BatteringRam position={[4.1, 0, -1.2]} wheelSpin={t * 1.5} yaw={Math.PI / 2} lean={0.14} tilt={-0.12} />
          <Villager position={[-1.8, 0, -1.2]} robe={ROBE.brown} hmm={0.8} lean={0.12} phase={0.3} />
          <Villager position={[1.8, 0, -1.6]} robe={ROBE.red} hmm={0.7} lean={-0.1} phase={1.5} />
          <Villager position={[0, 0, 1.2]} robe={ROBE.white} hmm={0.9} phase={2.8} />
        </>
      ),
    },
  ],
});
