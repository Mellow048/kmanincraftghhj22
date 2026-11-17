import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, Carrot, Clock, DEG, EAST, Emerald, Fish, Glow, Him, Loaf, NORTH, NightLights, Post, Puffs, ROBE, SOUTH, SPOT, Shop, SlimeBall, Square, Trail, Vendor, Person, front, go, hop, pop, sideYaw, stallOf, timing, tw, vendorAt, w } from "./kit";

/** 07 — Two minutes, one emerald. He spends it, and it goes round the whole town. */
const ME = SPOT.me;
const BUYER: Vec3 = [1.95, 0, 4.15];
const lights = (
  <>
    <NightLights />
    <Post cut />
  </>
);
const em = (y = 0.1, s = 1.1) => <Emerald position={[0, y, 0.03]} scale={s} />;
/** The way the emerald went: him, the baker, the fisherman, the farmer, and back to his shop. */
const WAY: Vec3[] = [ME, front("baker", 1.0).position, front("fisher", 1.0).position, front("farmer", 1.0).position, BUYER];

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Round the town",
  shots: [
    {
      cue: "7.tell",
      ...cam.push({ on: [0, 1.7, 3.0], dist: 3.5, to: 3.1, yaw: 158, pitch: 0, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "From behind him. He spins round to us with the emerald held up high, the happiest we have seen him.",
      stage: (t) => {
        const k = tw(t, 0.1, 0.55);
        return (
          <>
            <Square t={t} night folk={0} />
            {lights}
            <pointLight position={[0.7, 2.3, 0.4]} color="#ffd9a0" intensity={26} distance={8} decay={2} />
            <Him cue="7.tell" t={t} rotationY={SOUTH + (NORTH - 0.35) * k} face={158 * DEG} carry={em(0.16, 1.3)} strain={1} rise={hop(t, 0.6, 0.22, 0.3)} clockScale={0.55} />
          </>
        );
      },
    },
    {
      cue: "7.right",
      ...cam.push({ on: [-0.1, 0.9, 1.1], dist: 3.9, to: 3.4, yaw: -20, pitch: 22, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "What he is looking at: a post, two cut leads hanging from it, and nobody. His sleeves come down.",
      stage: (t) => (
        <>
          <Square t={t} night folk={0} />
          {lights}
          <Him cue="7.right" t={t} rotationY={NORTH - 0.2} face={-20 * DEG} carry={em(0.16 - 0.12 * tw(t, 0.3, 0.8), 1.3)} strain={1 - tw(t, 0.3, 0.8)} nod={0.35 * tw(t, 0.3, 0.8)} clockScale={0.55} />
          <pointLight position={[-0.1, 1.8, 1.4]} color="#ffd9a0" intensity={9} distance={5} decay={2} />
        </>
      ),
    },
    {
      cue: "7.two",
      ...cam.push({ on: [-0.05, 1.72, 3.05], dist: 3.4, to: 2.9, yaw: -40, pitch: -9, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "From low at his side, looking up: the emerald in his sleeves, green on his chin, and the red clock, 2:00, over his hood. He looks at it for the whole line, turning it a little.",
      stage: (t) => (
        <>
          <Square t={t} night folk={0} />
          {lights}
          <Shop price="" bush={false} />
          <Him cue="7.two" t={t} rotationY={SOUTH - 0.35} face={-40 * DEG} carry={<Emerald position={[0, 0.1, 0.03]} rotation={[0, t * 1.5, 0]} scale={1.4} />} strain={0.8} nod={0.4} clockScale={0.62} />
                    <Glow position={[0, 1.15, 3.35]} size={0.8} color="#5cff9a" opacity={0.1} />
        </>
      ),
    },
    {
      cue: "7.buy",
      ...cam.push({ on: [-1.2, 1.1, 1.4], dist: 7.4, to: 6.6, yaw: 20, pitch: 12, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "He leaves his shop for the first time in the film and walks across the dark square to the baker's, emerald out in front of him.",
      stage: (t, { dur }) => (
        <>
          <Square t={t} night folk={0} vendorLook={[ME[0], 1.5, ME[2]]} />
          {lights}
          <NightLights at={[-2.2, 0, -0.6]} power={0.7} />
          <Shop price="" bush={false} />
          <Him cue="7.buy" t={t} {...go(ME, front("baker", 1.0).position, tw(t, 0.2, dur))} face={20 * DEG} carry={em(0.1, 1.2)} strain={0.8} clockScale={0.7} />
        </>
      ),
    },
    {
      cue: "7.bread",
      ...cam.push({ on: [stallOf("baker")[0] + 0.06, 1.3, stallOf("baker")[2] + 0.11], dist: 7.4, to: 6.9, yaw: sideYaw("baker"), pitch: 4, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The baker's shop from the side, the same picture as this afternoon, lit by a torch. This time the emerald goes across the table and the loaf comes back. On 'his first sale too' the baker stares into his own sleeves.",
      stage: (t) => {
        const f = front("baker", 1.0);
        const swap = t > w("7.bread", "baker") - 0.1;
        return (
          <>
            <Square t={t} night folk={0} away={["baker"]} />
            {lights}
            <NightLights at={[-2.2, 0, -0.9]} />
            <Vendor who="baker" carry={swap ? em(0.12, 1.3) : <Loaf position={[0, 0.12, 0.02]} />} strain={0.9} nod={swap ? 0.45 : 0} lookAt={swap ? undefined : [f.position[0], 1.6, f.position[2]]} />
            <Him cue="7.bread" t={t} position={[f.position[0], hop(t, w("7.bread", "baker"), 0.15, 0.3), f.position[2]]} rotationY={f.rotationY} face={sideYaw("baker") * DEG} carry={swap ? <Loaf position={[0, 0.12, 0.02]} /> : em(0.14, 1.3)} strain={0.8} clockScale={0.5} />
          </>
        );
      },
    },
    {
      cue: "7.round",
      ...cam.push({ on: [0.1, 0.6, 1.6], dist: 11.5, to: 10.5, yaw: 0, pitch: 40, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "From above. The baker runs out from behind his shop and across to the fisherman's; then the fisherman runs to the farmer's. A line of green sparks is left on the ground where the emerald has been.",
      stage: (t, { dur }) => {
        const half = w("7.round", "fisherman", 0, 1) - 0.2;
        const a = tw(t, 0.1, half - 0.1);
        const b = tw(t, half, dur - 0.1);
        const bk = go(vendorAt("baker").position, front("fisher", 1.0).position, a);
        const fs = go(vendorAt("fisher").position, front("farmer", 1.0).position, b);
        return (
          <>
            <Square t={t} night folk={0} away={["baker", "fisher"]} />
            <NightLights power={0.45} />
            <Post cut />
                        <Shop price="" bush={false} />
            <Him cue="7.round" t={t} rotationY={NORTH} carry={<Loaf position={[0, 0, 0.02]} />} clockScale={0.85} />
            <Person {...bk} robe={ROBE.white} carry={b > 0 ? <Fish position={[0, 0.2, 0.02]} /> : em(0.25, 1.6)} strain={0.8} />
            <Person {...fs} robe={vendorAt("fisher").robe} carry={em(0.25, 1.6)} strain={0.8} />
            <Trail pts={WAY} k={(0.22 + 0.33 * a + 0.3 * b)} t={t} />
          </>
        );
      },
    },
    {
      cue: "7.town",
      ...cam.push({ on: [stallOf("farmer")[0] + 0.12, 1.3, stallOf("farmer")[2] + 0.05], dist: 7.4, to: 6.9, yaw: sideYaw("farmer"), pitch: 4, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "The farmer's shop. The fisherman puts the emerald on the table and takes a carrot. The farmer, in his straw hat, holds the emerald up to the torch.",
      stage: (t) => {
        const f = front("farmer", 1.0);
        const swap = t > 0.55;
        return (
          <>
            <Square t={t} night folk={0} away={["farmer", "fisher"]} />
            {lights}
            <NightLights at={[-2.4, 0, 4.9]} />
            <Vendor who="farmer" carry={swap ? em(0.2, 1.4) : <Carrot position={[0, 0.2, 0.02]} scale={1.2} />} strain={1} nod={swap ? -0.3 : 0} />
            <Person position={[f.position[0], hop(t, 0.6, 0.15, 0.3), f.position[2]]} rotationY={f.rotationY} robe={vendorAt("fisher").robe} carry={swap ? <Carrot position={[0, 0.12, 0.02]} scale={1.2} /> : em(0.14, 1.3)} strain={0.8} />
          </>
        );
      },
    },
    {
      cue: "7.why",
      ...cam.push({ on: [0, 1.3, 2.4], dist: 5.6, to: 5.0, yaw: -4, pitch: 3, fov: 46 }),
      zone: "dark",
      look: "overworld-night",
      note: "Him, facing us, eating his loaf, with the red clock over him. Behind him the baker and the fisherman are jumping behind their shops, each holding something he did not make: the baker has a fish.",
      stage: (t) => (
        <>
          <Square t={t} night folk={0} away={["baker", "fisher"]} />
          {lights}
          <NightLights at={[0, 0, -1]} power={0.9} />
          <Shop price="" bush={false} />
          {(["baker", "fisher"] as const).map((who, i) => {
            const v = vendorAt(who);
            return (
              <Person key={who} position={[v.position[0], hop((t + i * 0.3) % 0.7, 0.05, 0.3, 0.4), v.position[2]]} rotationY={v.rotationY} robe={v.robe} carry={who === "baker" ? <Fish position={[0, 0.3, 0.02]} /> : <Carrot position={[0, 0.3, 0.02]} scale={1.3} />} strain={1} />
            );
          })}
          <Him cue="7.why" t={t} rotationY={SOUTH} face={-4 * DEG} carry={<Loaf position={[0, -0.06 + 0.04 * Math.sin(t * 8), 0.02]} />} strain={0.5} nod={0.15 + 0.12 * Math.sin(t * 8)} clockScale={0.62} />
        </>
      ),
    },
    {
      cue: "7.lights",
      ...cam.push({ on: [0.4, 2.6, -8], dist: 12.5, to: 11.5, yaw: 4, pitch: -3, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "The north side of the square, which has been black all night: every window is yellow now, all at once.",
      stage: (t) => (
        <>
          <Square t={t} night folk={0} />
          <NightLights at={[0, 0, -3]} power={1.6} />
          <Glow position={[0, 2.6, -9]} size={12} color="#ffd070" opacity={0.12 * tw(t, 0, 0.4)} />
        </>
      ),
    },
    {
      cue: "7.back",
      ...cam.push({ on: [0.95, 1.35, 3.5], dist: 6.6, to: 6.0, yaw: -8, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "His own shop, windows lit behind it. The farmer in the straw hat is standing in front of it with the emerald, pointing his nose at the slime ball. On 'slime ball' it goes across, and the emerald comes back.",
      stage: (t) => {
        const swap = t > w("7.back", "slime") - 0.1;
        return (
          <>
            <Square t={t} night folk={0} away={["farmer"]} />
            {lights}
            <Shop price="" bush={false} slime={!swap} />
            <Him cue="7.back" t={t} rotationY={SOUTH + 0.9} face={-8 * DEG} lookAt={[BUYER[0], 1.5, BUYER[2]]} carry={swap ? em(0.1, 1.3) : <Loaf position={[0, 0.1, 0.02]} />} rise={hop(t, w("7.back", "slime") + 0.05, 0.2, 0.3)} clockScale={0.55} />
            <Person position={BUYER} rotationY={NORTH + 0.9} robe={ROBE.farmer} hat="straw" carry={swap ? <SlimeBall position={[0, 0.1, 0.02]} scale={1.3} /> : em(0.14, 1.3)} strain={0.9} nod={swap ? 0.4 : 0.2} />
          </>
        );
      },
    },
    {
      cue: "7.zero",
      ...cam.push({ on: [0, 1.7, 3.0], dist: 3.5, to: 3.0, yaw: 10, pitch: -3, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "His face and the clock: 0:03, 0:02, 0:01. He has the emerald in his sleeves and his head comes up to say it. A bubble starts: TH.",
      stage: (t) => {
        const say = w("7.zero", "thank") - 0.15;
        return (
          <>
            <Square t={t} night folk={0} />
            {lights}
            <Him cue="7.zero" t={t} rotationY={SOUTH + 0.2} face={10 * DEG} carry={em(0.08, 1.3)} strain={0.7} nod={-0.2 * tw(t, say, say + 0.2)} clockScale={0.66} />
            <group position={[0.5, 2.02, 3.3]} rotation={[0, 10 * DEG, 0]}>
              <Bubble text="TH" position={[0, 0, 0]} scale={0.55 * pop(t, say, 0.18)} tail={-1} />
            </group>
          </>
        );
      },
    },
    {
      cue: "7.poof",
      ...cam.push({ on: [0.95, 1.35, 3.5], dist: 6.2, to: 6.0, yaw: -8, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "A puff of grey where he was, and where his shop was. A clock at 0:00 hangs for a moment and drops. The farmer is left holding a slime ball, looking at an empty square.",
      stage: (t) => (
        <>
          <Square t={t} night folk={0} away={["farmer"]} />
          <NightLights power={0.7} />
          <Puffs position={[ME[0], 0.9, ME[2]]} count={10} spread={0.55} size={0.32} rise={1.2} speed={2.2} color="#cfd6e4" />
          <Puffs position={[SPOT.shop[0], 0.8, SPOT.shop[2]]} count={10} spread={0.7} size={0.32} rise={1.2} speed={2.0} color="#cfd6e4" seed={9} />
          <Clock position={[0, 2.55 - 2.1 * tw(t, 0.3, 0.8) ** 2, 3]} sec={0} scale={0.7} rotationY={-8 * DEG} />
          <Person position={[BUYER[0], hop(t, 0.05, 0.2, 0.3), BUYER[2]]} rotationY={NORTH + 0.9} robe={ROBE.farmer} hat="straw" carry={<SlimeBall position={[0, 0.2, 0.02]} scale={1.3} />} strain={0.6} />
        </>
      ),
    },
  ],
});
void EAST;
void (null as unknown as React.ReactNode);
