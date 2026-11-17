import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, Count, DEG, DeadBush, EAST, Emerald, Glow, Heart, Him, Kid, NORTH, NightLights, Post, Puffs, SOUTH, SPOT, Shop, Square, go, hop, pop, timing, tw, w } from "./kit";

/** 06 — Three minutes. Somebody pulls his robe. */
const ME = SPOT.me;
const TUG: Vec3 = [-0.62, 0, 3.25];
const AT: Vec3 = [1.2, 0, 4.3];
const set = (t: number, extra?: React.ReactNode) => (
  <>
    <Square t={t} night folk={0} />
    <NightLights />
    <Post cut />
    {extra}
  </>
);

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The kid",
  shots: [
    {
      cue: "6.kid",
      ...cam.push({ on: [-0.2, 1.5, 3.2], dist: 4.9, to: 4.4, yaw: 22, pitch: 2, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The clock goes red: 3:00. Under it the grey swirl, and beside the swirl a kid in a yellow robe, reaching up into nothing and pulling. The swirl jerks toward him.",
      stage: (t) => {
        const pull = Math.max(0, Math.sin((t - 0.9) * 9)) * tw(t, 0.9, 1.0);
        return (
          <>
            {set(t, <Shop />)}
            <Him cue="6.kid" t={t} ghost position={[ME[0] - 0.08 * pull, 0, ME[2]]} face={22 * DEG} clockScale={0.7} />
            <Kid position={TUG} rotationY={EAST} lookAt={[0, 2.7, 3]} strain={0.6 + 0.4 * pull} lean={0.2 * pull} />
          </>
        );
      },
    },
    {
      cue: "6.see",
      ...cam.push({ on: [-0.25, 1.5, 3.1], dist: 4.9, to: 4.4, yaw: -16, pitch: 3, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "On 'he should not' the trader is back with a pop, a full head taller than the kid, staring down at him. The kid looks up, not at his face: at the clock.",
      stage: (t) => {
        const back = w("6.see", "He") - 0.1;
        return (
          <>
            {set(t, <Shop />)}
            <Him cue="6.see" t={t} ghost={t < back} rotationY={SOUTH - 0.9} face={-16 * DEG} lookAt={[TUG[0], 0.9, TUG[2]]} rise={hop(t, back, 0.25, 0.3)} clockScale={0.6} />
            {t > back && t < back + 0.45 ? <Puffs position={[ME[0], 0.9, ME[2]]} count={8} spread={0.5} size={0.28} rise={0.9} speed={2.4} color="#cfd6e4" /> : null}
            <Kid position={TUG} rotationY={EAST} lookAt={[0, 2.75, 3]} />
          </>
        );
      },
    },
    {
      cue: "6.said",
      ...cam.push({ on: [TUG[0], 1.15, TUG[2]], dist: 3.0, to: 2.7, yaw: 62, pitch: 18, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The kid, from where the trader's face is: a small face turned up, pointing with his whole head at something over us. A speech bubble: a little clock.",
      stage: (t) => (
        <>
          {set(t)}
          <Kid position={TUG} rotationY={EAST + 0.5} nod={-0.5} />
          <group position={[TUG[0] + 0.15, 1.62, TUG[2] + 0.1]} rotation={[0, 62 * DEG, 0]} scale={0.7 * pop(t, w("6.said", "see") - 0.15, 0.2)}>
            <Bubble text="   " position={[0, 0, 0]} scale={0.8} />
            <Count position={[0, 0.02, 0.03]} text="3" scale={0.5} color="#ff6a5a" />
          </group>
        </>
      ),
    },
    {
      cue: "6.want",
      ...cam.push({ on: [1.3, 1.05, 3.9], dist: 3.0, to: 2.6, yaw: 184, pitch: 8, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "From behind the shop, over the table. The dead bush near us; across the table the kid, only his eyes and nose over the edge, looking at it like it is a cake. On 'for his mum' a small red heart comes up over the bush.",
      stage: (t) => (
        <>
          {set(t, <Shop price="" />)}
          <Kid position={[AT[0], hop(t, 0.3, 0.12, 0.25), AT[2]]} rotationY={NORTH} lookAt={[1.61, 0.95, 3.25]} />
          <Heart position={[1.61, 1.5, 3.3]} rotationY={Math.PI} scale={0.55 * pop(t, w("6.want", "mum") - 0.15, 0.22)} />
          <pointLight position={[1.5, 1.6, 3.9]} color="#ffd9a0" intensity={7} distance={5} decay={2} />
        </>
      ),
    },
    {
      cue: "6.one",
      ...cam.push({ on: [1.25, 1.05, 4.2], dist: 3.2, to: 2.9, yaw: 181, pitch: 6, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The kid holds one emerald up over the table in both sleeves. On 'the bush is five' a price tag comes up beside the bush: 5. He looks at the tag, then at his one emerald.",
      stage: (t) => {
        const five = w("6.one", "five") - 0.25;
        return (
          <>
            {set(t, <Shop price="" />)}
            <Kid position={AT} rotationY={NORTH} carry={<Emerald position={[0, 0.16, 0.03]} scale={1.2} />} strain={1} nod={t > five + 0.3 ? 0.2 : -0.1} />
            <group position={[1.5, 1.55, 3.3]} rotation={[0, 181 * DEG, 0]} scale={0.8 * pop(t, five, 0.2)}>
              <Count position={[0, 0, 0]} text="5" scale={0.6} />
              <Emerald position={[0.3, 0, 0]} scale={0.9} />
            </group>
            <pointLight position={[1.5, 1.6, 3.9]} color="#ffd9a0" intensity={7} distance={5} decay={2} />
          </>
        );
      },
    },
    {
      cue: "6.looked",
      ...cam.push({ on: [0, 1.7, 3.0], dist: 3.4, to: 3.0, yaw: 24, pitch: -2, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "His face and the red clock over it. His eyes go up to the clock. Then down, to the kid.",
      stage: (t) => {
        const down = tw(t, w("6.looked", "kid") - 0.6, w("6.looked", "kid") - 0.3);
        return (
          <>
            {set(t)}
            <Him cue="6.looked" t={t} rotationY={SOUTH + 0.6} face={24 * DEG} nod={-0.55 + 1.0 * down} clockScale={0.62} />
          </>
        );
      },
    },
    {
      cue: "6.deal",
      ...cam.push({ on: [0.4, 1.3, 3.45], dist: 5.8, to: 5.3, yaw: -50, pitch: 4, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The two of them and the shop. He bends down to the kid and says it: a bubble with a 1. The kid jumps.",
      stage: (t) => {
        const said = w("6.deal", "today") - 0.1;
        return (
          <>
            {set(t, <Shop price="" />)}
            <Him cue="6.deal" t={t} rotationY={SOUTH + 1.0} face={-50 * DEG} lean={0.12 * tw(t, 0.2, 0.5)} nod={0.3} clockScale={0.55} />
            <group position={[0.55, 2.15, 3.9]} rotation={[0, -50 * DEG, 0]} scale={1.0 * pop(t, said, 0.2)}>
              <Bubble text="    " position={[0, 0, 0]} scale={0.8} tail={1} />
              <Count position={[-0.12, 0.02, 0.03]} text="1" scale={0.5} />
              <Emerald position={[0.16, 0.02, 0.05]} scale={0.8} />
            </group>
            <Kid position={[AT[0], hop(t, w("6.deal", "one") - 0.05, 0.3, 0.3), AT[2]]} rotationY={-EAST - 0.5} lookAt={[0, 1.6, 3]} carry={<Emerald position={[0, 0.1, 0.03]} scale={1.1} />} />
          </>
        );
      },
    },
    {
      cue: "6.first",
      ...cam.push({ on: [0, 1.7, 3.0], dist: 3.4, to: 2.9, yaw: -8, pitch: 0, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The emerald is in his sleeves now, and it lights his face green from below. He does not blink. On 'my first sale' he goes up on his toes.",
      stage: (t) => (
        <>
          {set(t)}
          <Him cue="6.first" t={t} rotationY={SOUTH - 0.1} face={-8 * DEG} carry={<Emerald position={[0, 0.1, 0.03]} scale={1.4} />} strain={0.8} nod={0.45 * (1 - tw(t, w("6.first", "first") - 0.1, w("6.first", "first") + 0.15))} rise={hop(t, w("6.first", "sale") - 0.1, 0.2, 0.35)} clockScale={0.55} />
                    <Glow position={[0, 1.15, 3.35]} size={0.8} color="#5cff9a" opacity={0.1} />
        </>
      ),
    },
    {
      cue: "6.home",
      ...cam.push({ on: [-2.1, 0.95, 2.0], dist: 4.6, to: 4.2, yaw: -112, pitch: 5, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The kid walks home across the dark square with the dead bush held up over his head in both sleeves, looking up at it the whole way. Behind him, small, the trader and his red clock, watching him go.",
      stage: (t, { dur }) => {
        const k = go([0.4, 0, 3.9], [-2.9, 0, 1.5], t / dur);
        return (
          <>
            {set(t, <Shop price="" bush={false} />)}
            <Him cue="6.home" t={t} rotationY={-EAST} face={-112 * DEG} lookAt={[k.position[0], 1, k.position[2]]} carry={<Emerald position={[0, 0.1, 0.03]} />} clockScale={0.6} />
            <Kid {...k} carry={<DeadBush position={[0, 0.42, 0.02]} scale={1.5} />} strain={1} nod={-0.4} />
            <pointLight position={[k.position[0] - 0.8, 1.6, k.position[2]]} color="#ffd9a0" intensity={8} distance={5} decay={2} />
          </>
        );
      },
    },
  ],
});
