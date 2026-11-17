import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Carrot, DEG, DeadBush, EAST, Emerald, Heart, Him, Kid, Llama, Loaf, Mum, NORTH, Puffs, ROBE, SOUTH, Shop, Square, Stall, SubscribeSign, Villager, Vox, hop, pop, timing, tw, w } from "./kit";

/** 08 — Morning. The bush is in a window. He is somewhere else, with forty minutes and one emerald. */
const WIN: Vec3 = [-4.1, 1.74, -9.86];
const ME: Vec3 = [0, 0, 2.0];
const Sill: React.FC<{ bush?: boolean }> = ({ bush = true }) => (
  <>
    <Vox kind="planks" position={[WIN[0], WIN[1] - 0.05, WIN[2]]} size={[1.0, 0.1, 0.34]} />
    {bush ? <DeadBush pot position={[WIN[0], WIN[1], WIN[2] + 0.02]} scale={1.5} /> : null}
  </>
);
/** The next town's own shops, and the people behind them. */
const NextTown: React.FC<{ look?: Vec3 }> = ({ look }) => (
  <>
    <Stall position={[-2.5, 0, -1.4]} rotationY={0.5} cloth="#c9862a">
      <Loaf position={[-0.25, 0, 0]} />
      <Loaf position={[0.28, 0, 0.04]} rotation={[0, 0.5, 0]} />
    </Stall>
    <Villager position={[-2.86, 0, -2.06]} rotationY={0.5} robe={ROBE.elder} lookAt={look} />
    <Stall position={[2.7, 0, -1.0]} rotationY={-0.5} cloth="#5f9a3a">
      <Carrot position={[-0.25, 0, 0]} />
      <Carrot position={[0.2, 0, 0.06]} rotation={[0, 0.6, 0]} />
    </Stall>
    <Villager position={[3.06, 0, -1.66]} rotationY={-0.5} robe={ROBE.brown} hat="straw" lookAt={look} />
  </>
);
const Thought: React.FC<{ position: Vec3; scale: number; t: number }> = ({ position, scale, t }) =>
  scale <= 0.01 ? null : (
    <group position={position} scale={scale}>
      <Block position={[0, 0, -0.06]} size={[1.16, 1.06, 0.04]} color="#15151a" castShadow={false} />
      <Block position={[0, 0, -0.04]} size={[1.06, 0.96, 0.04]} color="#ffffff" castShadow={false} />
      <Block position={[-0.5, -0.66, -0.04]} size={[0.2, 0.2, 0.04]} color="#ffffff" castShadow={false} />
      <Block position={[-0.7, -0.9, -0.04]} size={[0.12, 0.12, 0.04]} color="#ffffff" castShadow={false} />
      <Llama position={[-0.05, -0.42, 0.05]} rotationY={0.6} scale={0.36} t={t} />
    </group>
  );

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Morning",
  shots: [
    {
      cue: "8.kid",
      ...cam.push({ on: [-4.1, 1.45, -9.4], dist: 4.6, to: 4.1, yaw: 14, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Morning, at the kid's house. His mum, in a red robe and a white scarf, sets a pot on the window sill: the dead bush. The kid stands beside her, watching it go up.",
      stage: (t) => {
        const put = t > w("8.kid", "window") - 0.5;
        return (
          <>
            <Square t={t} folk={3} />
            <Sill bush={put} />
            <Mum position={[-4.75, 0, -9.0]} rotationY={NORTH - 0.5} carry={put ? undefined : <DeadBush pot position={[0, 0.3, 0.02]} scale={1.5} />} strain={1} nod={-0.2} />
            <Kid position={[-3.4, hop(t, w("8.kid", "window") - 0.4, 0.2, 0.3), -8.8]} rotationY={NORTH + 0.5} nod={-0.45} />
          </>
        );
      },
    },
    {
      cue: "8.ugly",
      ...cam.push({ on: [-4.5, 1.65, -9.6], dist: 3.6, to: 3.1, yaw: 28, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Close on the window. Five brown twigs in a pot, in the sun. Her face next to it, head on one side. On 'she loves it' a red heart comes up over it.",
      stage: (t) => (
        <>
          <Square t={t} folk={0} vendors={false} />
          <Sill />
          <Mum position={[-4.85, 0, -9.3]} rotationY={EAST - 0.75} tilt={0.3 * tw(t, 0.3, 0.7)} lookAt={[WIN[0], 1.9, WIN[2]]} />
          <Heart position={[WIN[0], 2.72, WIN[2] + 0.1]} rotationY={28 * DEG} scale={0.6 * pop(t, w("8.ugly", "loves") - 0.15, 0.22)} />
        </>
      ),
    },
    {
      cue: "8.next",
      ...cam.push({ on: [0, 1.3, 1.6], dist: 5.8, to: 5.0, yaw: 0, pitch: 3, fov: 46 }),
      zone: "next",
      look: "overworld-day",
      note: "A different town: blue roofs. A puff, and he is standing in the middle of it with his shop at his elbow and a fresh 40:00 over his head. No llamas behind him. Two shops behind him.",
      stage: (t) => (
        <>
          <NextTown look={[ME[0], 1.6, ME[2]]} />
          {t > 0.15 ? <Shop position={[1.15, 0, 2.2]} bush={false} slime={false} /> : null}
          {t > 0.15 ? <Him cue="8.next" t={t} position={ME} rotationY={SOUTH} rise={hop(t, 0.15, 0.25, 0.3)} /> : null}
          {t < 0.7 ? <Puffs position={[0.5, 0.9, 2.1]} count={12} spread={0.9} size={0.32} rise={1.2} speed={2.2} color="#e6e9f2" /> : null}
        </>
      ),
    },
    {
      cue: "8.know",
      ...cam.push({ on: [0, 1.7, 2.0], dist: 3.7, to: 3.2, yaw: -14, pitch: 0, fov: 46 }),
      zone: "next",
      look: "overworld-day",
      note: "He looks over his shoulder at the shops, then back at us, and brings the emerald up out of his sleeves. He knows what it is for now.",
      stage: (t) => {
        const got = tw(t, w("8.know", "And") - 0.1, w("8.know", "And") + 0.3);
        return (
          <>
            <NextTown look={[ME[0], 1.6, ME[2]]} />
            <Shop position={[1.15, 0, 2.2]} bush={false} slime={false} />
            <Him cue="8.know" t={t} position={ME} rotationY={SOUTH - 0.2} face={-14 * DEG} turn={-1.2 * (1 - tw(t, 0.9, 1.2))} carry={<Emerald position={[0, 0.02 + 0.13 * got, 0.03]} scale={1.4} />} strain={got} rise={hop(t, w("8.know", "one") - 0.05, 0.18, 0.3)} clockScale={0.55} />
          </>
        );
      },
    },
    {
      cue: "8.sub",
      ...cam.push({ on: [0.2, 2.0, 2.0], dist: 6.0, to: 5.4, yaw: 0, pitch: 2, fov: 46 }),
      zone: "next",
      look: "overworld-day",
      note: "After the payoff, never before. The sign pops up over his clock. On 'my llamas back' a thought comes up beside his head with a llama in it, and he sets off toward the shops.",
      stage: (t) => (
        <>
          <NextTown look={[ME[0], 1.6, ME[2]]} />
          <Shop position={[1.15, 0, 2.2]} bush={false} slime={false} />
          <Him cue="8.sub" t={t} position={ME} rotationY={SOUTH} carry={<Emerald position={[0, 0.1, 0.03]} scale={1.3} />} strain={0.8} rise={hop(t, w("8.sub", "llamas") - 0.05, 0.2, 0.3)} clockScale={0.55} />
          <SubscribeSign position={[0, 3.75 + Math.sin(t * 8) * 0.05, 2.0]} scale={0.95 * pop(t, w("8.sub", "subscribe") - 0.2, 0.2)} tilt={Math.sin(t * 5) * 0.05} />
          <Thought position={[0.68, 2.2, 2.2]} scale={0.66 * pop(t, w("8.sub", "llamas") - 0.25, 0.22)} t={t} />
        </>
      ),
    },
  ],
});
