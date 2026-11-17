import { cam, storyScene } from "../../engine";
import { Bottle, Clock, DEG, EAST, Glow, Him, NightLights, Post, Puffs, ROBE, SOUTH, SPOT, Shop, Square, Villager, left, timing, tw, w } from "./kit";

/** 05 — Night. No window is lit. He drinks the potion so nobody has to see him not being bought from. */
const ME = SPOT.me;

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Night",
  shots: [
    {
      cue: "5.night",
      ...cam.push({ on: [0.3, 1.3, 2.6], dist: 8.6, to: 8.0, yaw: -14, pitch: 12, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The same square, dark. Torches, and not one lit window. He is still standing at his shop, with the post and two cut leads behind him.",
      stage: (t) => (
        <>
          <Square t={t} night folk={0} />
          <NightLights />
          <Post cut />
          <Shop />
          <Him cue="5.night" t={t} rotationY={SOUTH} face={-14 * DEG} clockScale={0.75} />
        </>
      ),
    },
    {
      cue: "5.potion",
      ...cam.push({ on: [0, 1.4, 3.0], dist: 2.9, to: 2.5, yaw: 10, pitch: 0, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "Close. He lifts a grey bottle up in both sleeves and looks at us over it, like a man showing his one trick.",
      stage: (t) => (
        <>
          <Square t={t} night folk={0} />
          <NightLights />
          <Post cut />
          <Him cue="5.potion" t={t} rotationY={SOUTH + 0.15} face={10 * DEG} carry={<Bottle position={[0, 0.04 + 0.14 * tw(t, 0.25, 0.6), 0.03]} scale={1.1} />} strain={tw(t, 0.25, 0.6)} clockScale={0.5} />
        </>
      ),
    },
    {
      cue: "5.invisible",
      ...cam.push({ on: [0.4, 1.35, 3.1], dist: 5.4, to: 4.8, yaw: -18, pitch: 4, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "He drinks, and on 'invisible' he is gone in a grey puff: the swirl, and the clock hanging over nothing. Then a villager walks past the shop without looking, exactly as before, but now with nobody to not look at.",
      stage: (t, { dur }) => {
        const gone = w("5.invisible", "invisible") - 0.1;
        const x = 3.4 - tw(t, w("5.invisible", "So") - 0.2, dur) * 5.2;
        return (
          <>
            <Square t={t} night folk={0} />
            <NightLights />
            <Post cut />
            <Shop />
            <Him cue="5.invisible" t={t} ghost={t > gone} rotationY={SOUTH} face={-18 * DEG} carry={<Bottle position={[0, 0.3, 0.03]} rotation={[-0.9, 0, 0]} scale={1.1} />} nod={-0.5} strain={1} />
            {t > gone && t < gone + 0.5 ? <Puffs position={[ME[0], 0.9, ME[2]]} count={9} spread={0.5} size={0.3} rise={1.0} speed={2.4} color="#cfd6e4" /> : null}
            {t > w("5.invisible", "So") - 0.2 ? <Villager position={[x, 0, 4.6]} rotationY={-EAST} walk={t * 3} robe={ROBE.brown} /> : null}
          </>
        );
      },
    },
    {
      cue: "5.clock",
      ...cam.push({ on: [0, 2.2, 3.0], dist: 3.6, to: 3.0, yaw: 8, pitch: -4, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The clock, alone in the dark over a little grey swirl: 9:01, 9:00.",
      stage: (t) => (
        <>
          <Square t={t} night folk={0} />
          <NightLights />
          <Him cue="5.clock" t={t} ghost clock={false} />
          <Clock position={[0, 2.6, 3]} sec={left("5.clock", t)} scale={0.6} rotationY={8 * DEG} />
          <Glow position={[0, 2.6, 2.8]} size={2.2} color="#ffe27a" opacity={0.16} />
        </>
      ),
    },
    {
      cue: "5.alone",
      ...cam.push({ on: [0, 1.4, 2.4], dist: 7.5, to: 9.4, yaw: 16, pitch: 30, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "Pulling up and away. The dark square, the shops with their torches, and in the middle one small yellow clock counting over an empty spot.",
      stage: (t) => (
        <>
          <Square t={t} night folk={0} />
          <NightLights />
          <Post cut />
          <Shop />
          <Him cue="5.alone" t={t} ghost face={16 * DEG} clockScale={1.1} />
          <Glow position={[0, 2.7, 2.8]} size={2.6} color="#ffe27a" opacity={0.14} />
        </>
      ),
    },
  ],
});
