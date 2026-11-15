import { cam, storyScene, stride } from "../../engine";
import { Barrel, Hero, HayPile, MarketCart, ROBE, Villager, timing } from "./kit";

/** The spy warns the village; the villagers turn the market into a zigzag. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "The warning",
  shots: [
    {
      cue: "11.warn",
      ...cam.push({ on: [0, 1.42, 3.3], dist: 5.0, to: 3.6, yaw: 11, pitch: 4, fov: 39 }),
      zone: "village",
      look: "overworld-day",
      note: "The spy points from the villagers to the bell tower, telling them what the ram is meant to hit.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 3.4]} masked face="worried" animation="point" headYaw={-0.18} />
          <Villager position={[-2.2, 0, 1.3]} robe={ROBE.brown} hmm={0.25 + Math.sin(t * 4) * 0.05} phase={0.4} />
          <Villager position={[2.1, 0, 1.2]} robe={ROBE.blue} hmm={0.32} phase={2.2} />
          <Villager position={[0, 0, -0.1]} robe={ROBE.red} lean={0.16} phase={1.2} />
        </>
      ),
    },
    {
      cue: "11.carts",
      ...cam.truck({ on: [-1.5, 1.0, 2.7], dist: 4.8, yaw: 80, pitch: 2, by: [3.5, 0, -1.2], fov: 41 }),
      zone: "village",
      look: "overworld-day",
      note: "Two villagers drag a wooden cart across the road while another rolls a barrel into the next gap.",
      stage: (t, { p }) => (
        <>
          <MarketCart position={[-4.6 + p * 2.0, 0, 4.0]} rotationY={-0.08} wobble={Math.sin(t * 10) * 0.05} load />
          <Barrel position={[1.0 - p * 0.5, 0, 1.8]} rotationY={p * 0.4} />
          <Villager {...stride([-6.2, 0, 4.2], [-4.2, 0, 4.2], p)} robe={ROBE.farmer} walk={t * 1.2} phase={2.3} />
          <Villager {...stride([-3.1, 0, 4.4], [-1.5, 0, 4.4], p)} robe={ROBE.smith} walk={t * 1.2} phase={1.1} />
        </>
      ),
    },
    {
      cue: "11.path",
      ...cam.top({ on: [0, 0.1, 2], height: 13, to: 8.2, spin: [0, 16], fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "From above, carts, barrels and hay alternate across the road in the sharp zigzag the ram cannot turn through.",
      stage: () => (
        <>
          <MarketCart position={[-4.6, 0, 4.2]} rotationY={-0.12} load />
          <Barrel position={[1.2, 0, 1.9]} />
          <HayPile position={[-2.2, 0, -0.4]} />
          <MarketCart position={[4.0, 0, -3.3]} rotationY={0.32} />
          <Barrel position={[-4.5, 0, -5.2]} />
          <Villager position={[5.6, 0, 3.2]} robe={ROBE.red} walk={0.8} phase={0.5} />
          <Villager position={[-6.0, 0, -1.6]} robe={ROBE.white} walk={0.7} phase={2.5} />
        </>
      ),
    },
  ],
});
