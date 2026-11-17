import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Count, DEG, Emerald, Him, Lead, Llama, Llamas, SOUTH, SPOT, Shop, Square, EAST, hop, pop, timing, tw, w } from "./kit";

/** 02 — The shop. Four things nobody wants, one price, nine hundred towns, and what he has decided the problem is. */
const BEHIND: Vec3 = [SPOT.shop[0], 0, SPOT.shop[2] - 0.8];

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The shop",
  shots: [
    {
      cue: "2.goods",
      ...cam.truck({ on: [0.8, 0.95, 3.25], dist: 2.5, yaw: 0, pitch: 14, fov: 46, by: [0.55, 0, 0] }),
      zone: "town",
      look: "overworld-day",
      note: "Close on the table, sliding along it. Each thing jumps on its word: the sapling, the slime ball, the fish in its bucket. He stands behind them like a man showing jewels.",
      stage: (t) => (
        <>
          <Square t={t} folk={2} />
          <Shop lift={[hop(t, w("2.goods", "sapling") - 0.08, 0.2, 0.3), hop(t, w("2.goods", "slime") - 0.08, 0.2, 0.3), hop(t, w("2.goods", "fish") - 0.08, 0.2, 0.3), 0]} />
          <Him cue="2.goods" t={t} position={BEHIND} rotationY={SOUTH} nod={0.35} clock={false} />
        </>
      ),
    },
    {
      cue: "2.bush",
      ...cam.push({ on: [1.61, 0.98, 3.25], dist: 1.5, to: 1.15, yaw: -8, pitch: 10, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The dead bush, alone, very close. Five brown twigs. One twig drops a little.",
      stage: (t) => (
        <>
          <Square t={t} folk={0} />
          <Shop lift={[0, 0, 0, -0.03 * tw(t, 0.4, 0.55)]} />
        </>
      ),
    },
    {
      cue: "2.five",
      ...cam.push({ on: [1.15, 0.62, 3.5], dist: 2.3, to: 1.9, yaw: 10, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The price card on the front of the shop: a 5 and an emerald. The same card for the sapling and for the dead bush.",
      stage: (t) => (
        <>
          <Square t={t} folk={0} />
          <Shop />
          <Him cue="2.five" t={t} position={BEHIND} rotationY={SOUTH} nod={0.3} clock={false} />
        </>
      ),
    },
    {
      cue: "2.nine",
      ...cam.truck({ on: [-2.4, 1.9, 15], dist: 8.6, yaw: 0, pitch: 4, fov: 46, by: [2.1, 0, 0] }),
      zone: "field",
      look: "overworld-day",
      note: "The road. He walks along it with a llama on each lead, small under a big sky, and a number comes up over him: 900.",
      stage: (t) => {
        const x = -1.4 + t * 1.5;
        return (
          <>
            <Him cue="2.nine" t={t} position={[x, 0, 15]} rotationY={EAST} walk={t * 1.5} clockScale={0.55} />
            <Llama position={[x - 1.5, 0, 14.8]} rotationY={EAST} walk={t * 1.5} t={t} />
            <Llama position={[x - 3.1, 0, 15.1]} rotationY={EAST} walk={t * 1.5 + 0.7} coat="#9a7a56" t={t} />
            <Lead a={[x - 0.25, 1.0, 15]} b={[x - 0.95, 1.5, 14.8]} />
            <Lead a={[x - 2.1, 1.1, 14.8]} b={[x - 2.55, 1.5, 15.1]} />
            <Count position={[x - 1.3, 3.9, 15]} text="900" scale={2.2 * pop(t, 0.25, 0.25)} />
          </>
        );
      },
    },
    {
      cue: "2.sold",
      ...cam.push({ on: [0, 1.75, 3.0], dist: 3.0, to: 2.7, yaw: 10, pitch: 0, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "His face, flat, looking at us. Beside it a 0 and an emerald.",
      stage: (t) => (
        <>
          <Square t={t} folk={2} />
          <Llamas t={t} />
          <Him cue="2.sold" t={t} rotationY={SOUTH + 0.17} clock={false} />
          <group position={[-0.12, 2.35, 3.0]} rotation={[0, 10 * DEG, 0]} scale={pop(t, 0.3, 0.2)}>
            <Count position={[0, 0, 0]} text="0" scale={0.8} />
            <Emerald position={[0.4, 0, 0]} scale={1.3} />
          </group>
        </>
      ),
    },
    {
      cue: "2.think",
      ...cam.push({ on: [0.55, 1.2, 3.1], dist: 3.9, to: 3.5, yaw: 20, pitch: -2, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "He looks down at his shop, then nods slowly at it, a man who has worked it out. Behind him a llama shakes its head.",
      stage: (t) => {
        const nod = tw(t, w("2.think", "prices") - 0.1, w("2.think", "prices") + 0.2);
        return (
          <>
            <Square t={t} folk={2} />
            <Llamas t={t} look={[0.15 + Math.sin(t * 9) * 0.35 * tw(t, 0.9, 1.1), -0.2]} />
            <Shop />
            <Him cue="2.think" t={t} rotationY={SOUTH + 0.5} face={20 * DEG} nod={0.25 + 0.25 * Math.sin(nod * t * 9)} hmm={1} clockScale={0.55} />
          </>
        );
      },
    },
  ],
});
