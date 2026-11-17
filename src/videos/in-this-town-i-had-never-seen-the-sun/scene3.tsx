import { cam, storyScene } from "../../engine";
import {
  Bees, Bits, Block, Bone, Bubble, DEG, DayTown, EAST, Fill, HelmetProp, Loaf, Lying, Me, NORTH, PLACE, Pal, Puffs, ROBE, SOUTH, Sunflower, Villager, WEST, WearBar,
  go, hop, jolt, meFace, palFace, pop, timing, tw, w,
} from "./kit";

/** 03 — The day. Everything has a colour, the hat wears out, and a kid from the day town. */
const SPOT: [number, number, number] = [0, 0, 1.4];
const PALP: [number, number, number] = [1.3, 0, 3.2];
const F = PLACE.flower;

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The day",
  shots: [
    {
      cue: "5.nothing",
      ...cam.push({ on: meFace(SPOT), dist: 2.3, to: 2.0, yaw: 8, pitch: 2, fov: 38 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Full daylight, and his face under the hat: both arms up in front of it, waiting to burn. Then one arm comes down and he looks.",
      stage: (t) => (
        <>
          <Me position={SPOT} rotationY={SOUTH + 0.15} helmet armPitch={[-2.2, -2.2 + tw(t, 0.4, 0.65) * 1.4]} mood={t > 0.55 ? "calm" : "scared"} />
        </>
      ),
    },
    {
      cue: "5.colour",
      ...cam.push({ on: [0, 3.2, -6], dist: 15, to: 12, yaw: 12, pitch: -7, fov: 52 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The cut the film is built on: after a minute of blue, the whole meadow in full colour. Flowers, a row of sunflowers, a town far off, a blue sky with the sun in it. He is small in the middle of it, with his back to us.",
      stage: (t) => (
        <>
          <Me position={[1.4, 0, 1.6]} rotationY={NORTH} helmet turn={Math.sin(t * 2.4) * 0.7} armPitch={[-0.4, -0.4]} />
          <Bees center={[2.3, 0.7, 2.6]} t={t} n={3} />
        </>
      ),
    },
    {
      cue: "5.grass",
      ...cam.push({ on: [0, 0.7, 1.5], dist: 2.8, to: 2.4, yaw: 16, pitch: 7, fov: 40 }),
      zone: "meadow",
      look: "overworld-day",
      note: "He looks down at the grass round his feet, then bends and pats it with both hands. Bits of green fly up.",
      stage: (t) => {
        const pat = w("5.grass", "green");
        return (
          <>
            <Me position={SPOT} rotationY={SOUTH + 0.1} helmet nod={0.4} lean={tw(t, 0.15, pat) * 0.22} armPitch={[-0.9, -0.9]} mood={t > pat + 0.5 ? "happy" : "calm"} />
            <Bits position={[SPOT[0], 0.1, SPOT[2] + 0.45]} t={t - pat} color="#5fb03c" count={9} power={1.0} />
            <Bits position={[SPOT[0], 0.1, SPOT[2] + 0.45]} t={t - pat - 0.6} color="#5fb03c" count={9} power={1.0} seed={4} />
          </>
        );
      },
    },
    {
      cue: "5.bees",
      ...cam.push({ on: [0.45, 0.55, 1.5], dist: 2.8, to: 2.3, yaw: -18, pitch: 8, fov: 40 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Low among the flowers: red, white, blue and orange ones in front, bees going round them, and his face behind, following one bee with his whole head.",
      stage: (t) => {
        const c: [number, number, number] = [0.7, 0.55, 1.9];
        return (
          <>
            {([[0.4, 2.1, "#e8566a"], [0.9, 2.0, "#ffffff"], [0.65, 2.35, "#6a9be8"], [1.15, 2.3, "#f08a2a"], [0.2, 2.45, "#f2d24a"]] as Array<[number, number, string]>).map(([x, z, c2], i) => (
              <group key={i} position={[x, 0, z]}>
                <Block position={[0, 0.17, 0]} size={[0.05, 0.34, 0.05]} color="#3f8a34" castShadow={false} />
                <Block position={[0, 0.4, 0]} size={[0.2, 0.13, 0.2]} color={c2} />
              </group>
            ))}
            <Bees center={c} t={t} n={4} reach={0.5} />
            <Me position={[0.25, 0, 1.2]} rotationY={SOUTH + 0.3} helmet lookAt={[c[0] + Math.sin(t * 2.2) * 0.5, 0.75, c[2] + 0.4]} mood="happy" />
          </>
        );
      },
    },
    {
      cue: "5.up",
      ...cam.push({ on: [0.15, 1.9, -1.2], dist: 3.4, to: 3.2, yaw: 14, pitch: -20, fov: 46 }),
      zone: "meadow",
      look: "overworld-day",
      note: "From behind and below him: his head tips back, and there over the rim of the hat is the sun itself.",
      stage: (t) => (
        <>
          <Me position={[0.5, 0, 0.25]} rotationY={NORTH} helmet nod={-tw(t, 0.1, 0.6) * 0.75} armPitch={[-0.3, -0.3]} />
        </>
      ),
    },
    {
      cue: "5.small",
      ...cam.push({ on: meFace([0.15, 0, 0.9]), dist: 2.6, to: 2.1, yaw: 186, pitch: 20, fov: 38 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Looking down at him from where the sun is: he squints up at us. On \"could not look\" he turns his head away and blinks, and three purple spots float in front of his eyes.",
      stage: (t) => {
        const away = w("5.small", "And");
        const k = tw(t, away, away + 0.3);
        const p: [number, number, number] = [0.15, 0, 0.9];
        return (
          <>
            <Me position={p} rotationY={NORTH} helmet nod={-0.6 + k * 0.85} turn={k * 0.7} mood={k > 0.5 ? "sad" : "calm"} />
            {k > 0.6
              ? [0, 1, 2].map((i) => (
                  <Block key={i} position={[p[0] + 0.25 - i * 0.16 + Math.sin(t * 3 + i) * 0.04, 1.1 + i * 0.09 + Math.sin(t * 2 + i * 2) * 0.05, p[2] - 0.5]} size={[0.11 - i * 0.02, 0.11 - i * 0.02, 0.02]} color="#8a5ae0" emissive="#8a5ae0" emissiveIntensity={0.6} castShadow={false} />
                ))
              : null}
            <Fill at={[0.2, 2.6, -1.0]} power={10} color="#fff0c8" />
          </>
        );
      },
    },
    {
      cue: "5.flower",
      ...cam.push({ on: [0.55, 1.2, -1.0], dist: 4.4, to: 3.4, yaw: 150, pitch: 0, fov: 42 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The tall sunflower and the kid, side by side: it is a head taller than he is. He looks up at it. Then both of them have their faces tipped up to the sun at the same angle.",
      stage: (t) => {
        const too = w("5.flower", "too");
        const k = tw(t, too - 0.5, too - 0.15);
        const p: [number, number, number] = [0.05, 0, -0.75];
        return (
          <>
            <Sunflower position={F} rotationY={NORTH} height={1.8} up={0.55} sway={Math.sin(t * 1.4) * 0.03} />
            <Me position={p} rotationY={NORTH} helmet lookAt={k < 0.5 ? [F[0], 1.85, F[2]] : undefined} nod={-0.55} mood="happy" />
            <Bees center={[F[0], 1.7, F[2] - 0.3]} t={t} n={2} reach={0.4} />
            <Fill at={[0.6, 2.2, -3.0]} power={10} color="#fff0c8" />
          </>
        );
      },
    },
    {
      cue: "5.hat",
      ...cam.push({ on: [SPOT[0], 1.32, SPOT[2]], dist: 2.2, to: 1.8, yaw: 10, pitch: 5, fov: 38 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Close on the hat. A bar pops up over it, nearly full and green. It drops a notch, and another, and a thread of smoke comes off the iron. His eyes roll up to look at it. The bar stays for the rest of the day.",
      stage: (t) => {
        const a = w("5.hat", "eating");
        const b = w("5.hat", "little");
        const k = 0.86 - (t > a ? 0.08 : 0) - (t > b ? 0.08 : 0);
        return (
          <>
            <Me position={SPOT} rotationY={SOUTH + 0.2} helmet nod={-tw(t, 0.35, 0.6) * 0.3} mood={t > a ? "scared" : "calm"} />
            <WearBar position={[SPOT[0], 1.6 + jolt(t, a, 0.05) + jolt(t, b, 0.05), SPOT[2]]} k={k} yaw={10 * DEG} scale={pop(t, 0.25, 0.16)} t={t} />
            <Puffs position={[SPOT[0] + 0.05, 1.3, SPOT[2]]} count={4} rise={0.5} spread={0.07} size={0.08} speed={1.1} color="#e8e8e8" opacity={0.6} />
          </>
        );
      },
    },
    {
      cue: "6.kid",
      ...cam.push({ on: [0.75, 1.0, 0.9], dist: 5.2, to: 4.4, yaw: 14, pitch: 5, fov: 44 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Over the shoulder of a villager kid in a red robe, who has come out of the flowers with a loaf: there is the zombie kid, with his back to him, at the sunflower. The villager kid stops.",
      stage: (t) => (
        <>
          <Sunflower position={F} rotationY={NORTH} height={1.8} up={0.55} />
          <Me position={[0.35, 0, -0.1]} rotationY={NORTH + 0.2} helmet wear={0.66} barYaw={14 * DEG} barT={t} nod={-0.5} />
          <Pal {...go([3.0, 0, 4.7], [1.8, 0, 3.5], tw(t, 0, 0.9))} carry={<Loaf position={[0, 0.0, 0.14]} scale={0.7} />} />
          <Bubble text="!" position={[1.5, 1.72, 3.5]} scale={0.55 * pop(t, 1.0, 0.14)} tail={-1} dark />
        </>
      ),
    },
    {
      cue: "6.scream",
      ...cam.push({ on: [PALP[0], palFace(PALP)[1] + 0.12, PALP[2]], dist: 3.0, to: 2.7, yaw: 188, pitch: 2, fov: 38 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The villager kid's face: he jumps, the loaf goes up in the air, and AAAH! fills the top of the frame.",
      stage: (t) => (
        <>
          <Pal position={[PALP[0], hop(t, 0.05, 0.3, 0.45), PALP[2]]} rotationY={NORTH} tilt={Math.sin(t * 30) * 0.08} nod={-0.2} />
          <Loaf position={[PALP[0] - 0.5, 0.7 + hop(t, 0.05, 0.7, 0.7), PALP[2] - 0.2]} rotation={[t * 6, 0, t * 4]} scale={0.7} />
          <Bubble text="AAAH!" position={[PALP[0], 1.84, PALP[2]]} rotationY={Math.PI} scale={0.5 * pop(t, 0.05, 0.12)} tail={1} tilt={0.1} dark />
        </>
      ),
    },
    {
      cue: "6.only",
      ...cam.push({ on: [F[0] + 0.05, 1.3, F[2] - 0.35], dist: 3.2, to: 2.7, yaw: 122, pitch: 0, fov: 40 }),
      zone: "meadow",
      look: "overworld-day",
      note: "And the monster he is screaming at: a small zombie in a hat too big for him, with his nose in a sunflower and bees round his head. He has not even heard.",
      stage: (t) => (
        <>
          <Sunflower position={F} rotationY={NORTH} height={1.55} up={0.15} sway={Math.sin(t * 2) * 0.03} />
          <Me position={[F[0], 0, F[2] - 0.62]} rotationY={SOUTH} helmet wear={0.62} barYaw={122 * DEG} barT={t} nod={-0.35} mood="happy" />
          <Bees center={[F[0], 1.5, F[2] - 0.4]} t={t} n={3} reach={0.45} />
          <Fill at={[2.4, 1.8, -2.2]} power={8} color="#fff0c8" />
        </>
      ),
    },
    {
      cue: "6.stop",
      ...cam.push({ on: palFace(PALP), dist: 2.5, to: 2.3, yaw: 200, pitch: 2, fov: 38 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The villager kid, mouth shut, head on one side. A question mark.",
      stage: (t) => (
        <>
          <Pal position={PALP} rotationY={NORTH} tilt={tw(t, 0.05, 0.3) * 0.3} />
          <Loaf position={[PALP[0] + 0.5, 0, PALP[2] - 0.3]} rotation={[0, 0.6, 0]} scale={0.7} />
          <Bubble text="?" position={[PALP[0] - 0.3, 1.72, PALP[2]]} rotationY={Math.PI} scale={0.55 * pop(t, 0.12, 0.14)} tail={-1} dark />
        </>
      ),
    },
    {
      cue: "6.town",
      ...cam.push({ on: [0, 1.5, -0.6], dist: 9.6, to: 9.0, yaw: 2, pitch: 5, fov: 46 }),
      zone: "daytown",
      look: "overworld-day",
      note: "The day town, seen over two hay bales with two heads sticking up behind them: a red hood and an iron hat. Every door on the street stands open and villagers walk in and out. The bar over the hat is at half.",
      stage: (t) => (
        <>
          <DayTown />
          {/* an open door in full sun: a warm panel over the lit doorway, which blooms to white at this distance */}
          {([[-7.2, -4.93], [0, -5.53], [7.2, -4.93]] as Array<[number, number]>).map(([x, z]) => (
            <Block key={x} position={[x, 1.0, z]} size={[1.0, 2.0, 0.05]} color="#7a5a34" castShadow={false} />
          ))}
          {([[-5.5, -2.4, ROBE.brown, 1], [3.5, -1.4, ROBE.farmer, -1], [-1.5, -3.4, ROBE.white, 1], [6.5, -3.0, ROBE.red, -1]] as Array<[number, number, string, number]>).map(([x, z, robe, dir], i) => (
            <Villager key={i} position={[x + dir * t * 0.7, 0, z]} rotationY={dir > 0 ? EAST : WEST} walk={t * 0.7 + i} robe={robe} phase={i * 1.3} carry={i === 1 ? <Loaf position={[0, 0, 0.16]} scale={0.8} /> : undefined} />
          ))}
          <Villager position={[0, 0, -5.1 + tw(t, 0.6, 2.2) * 2.2]} rotationY={SOUTH} walk={tw(t, 0.6, 2.2) * 2.2} robe={ROBE.brown} scale={0.96} phase={4} />
          <Me position={[-0.55, 0, 5.05]} rotationY={NORTH} helmet wear={0.5} barYaw={0} barT={t} turn={Math.sin(t * 1.6) * 0.5} />
          <Pal position={[0.5, 0, 5.1]} rotationY={NORTH} turn={tw(t, 1.2, 1.6) * 1.0} />
        </>
      ),
    },
    {
      cue: "6.bread",
      ...cam.push({ on: [0.45, 0.9, 1.3], dist: 3.9, to: 3.4, yaw: 4, pitch: 5, fov: 40 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The two of them face to face in the flowers. A loaf crosses from his arms to the zombie kid's hands. Then a bone crosses the other way.",
      stage: (t) => {
        const a = w("6.bread", "gave");
        const b = w("6.bread", "gave", 1);
        const k1 = tw(t, a - 0.1, a + 0.3);
        const k2 = tw(t, b - 0.05, b + 0.35);
        const me: [number, number, number] = [0.02, 0, 1.3];
        const pal: [number, number, number] = [0.9, 0, 1.3];
        const hand: [number, number, number] = [me[0] + 0.42, 0.74, me[2]];
        const arms: [number, number, number] = [pal[0] - 0.24, 0.66, pal[2]];
        const mix = (p: [number, number, number], q: [number, number, number], k: number): [number, number, number] => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k + Math.sin(k * Math.PI) * 0.12, p[2] + (q[2] - p[2]) * k];
        return (
          <>
            <Me position={me} rotationY={EAST} helmet wear={0.4} barYaw={4 * DEG} barT={t} armPitch={[-1.5, -1.5]} mood="happy" />
            <Pal position={pal} rotationY={WEST} nod={k2 > 0.9 ? 0.45 : 0} />
            <Loaf position={mix(arms, [hand[0], hand[1] + 0.02, hand[2] + 0.12], k1)} rotation={[0, Math.PI / 2, 0]} scale={0.6} />
            {t > b - 0.45 ? <Bone position={mix([hand[0], hand[1] + 0.08, hand[2] - 0.14], [arms[0], arms[1] + 0.1, arms[2]], k2)} rotation={[0, Math.PI / 2, 0.3]} scale={1.1 * pop(t, b - 0.45, 0.14)} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.bone",
      ...cam.push({ on: [0.2, 0.95, 1.25], dist: 3.6, to: 3.1, yaw: -8, pitch: 4, fov: 40 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The villager kid looks down at the bone lying on his sleeves for a long moment. Then he looks up again and keeps it. Beside him the zombie kid has half the loaf in his mouth.",
      stage: (t) => {
        const kept = w("6.bone", "kept");
        const me: [number, number, number] = [-0.22, 0, 1.15];
        return (
          <>
            <Pal position={[0.62, 0, 1.3]} rotationY={SOUTH - 0.3} nod={0.5 - tw(t, kept - 0.15, kept + 0.15) * 0.55} carry={<Bone position={[0, 0.05, 0.14]} rotation={[0, 0, 0.2]} scale={1.1} />} />
            <Me position={me} rotationY={SOUTH + 0.35} helmet wear={0.32} barYaw={-8 * DEG} barT={t} armPitch={[-2.05, -2.05]} mood="happy" nod={Math.sin(t * 9) * 0.06} />
            <Loaf position={[me[0] + 0.14, 0.96, me[2] + 0.36]} rotation={[0, 0.35, 0]} scale={0.55 * (1 - tw(t, 0.3, 2.2) * 0.45)} />
          </>
        );
      },
    },
    {
      cue: "6.best",
      ...cam.top({ on: [0.1, 0, 1.6], height: 4.8, to: 4.0, spin: [-8, 4], fov: 44 }),
      zone: "meadow",
      look: "overworld-day",
      note: "From straight above: the two of them flat on their backs in the flowers, side by side, looking up. The bone is on his chest. The bar by the hat is yellow, and while we watch it goes red.",
      stage: (t) => (
        <>
          <Lying position={[-0.4, 0.12, 2.25]}>
            <Me rotationY={0} helmet mood="happy" armPitch={[-0.5, -0.5]} />
          </Lying>
          <WearBar position={[-0.4, 0.5, 0.65]} k={0.3 - tw(t, 0.2, 1.5) * 0.17} flat t={t} />
          <Lying position={[0.6, 0.1, 2.3]}>
            <Pal rotationY={0} carry={<Bone position={[0, 0.05, 0.14]} scale={1.1} />} />
          </Lying>
        </>
      ),
    },
    {
      cue: "6.crack",
      ...cam.push({ on: [SPOT[0], 1.22, SPOT[2]], dist: 1.9, to: 1.6, yaw: -10, pitch: 4, fov: 38 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Close on the hat. On \"crack\" a black line splits the front of it and bits of iron jump off. The bar is red and blinking. His eyes roll up.",
      stage: (t) => {
        const c = w("6.crack", "crack");
        return (
          <>
            <Me position={[SPOT[0] + jolt(t, c, 0.04), 0, SPOT[2]]} rotationY={SOUTH - 0.1} helmet crack={t > c ? 0.5 + tw(t, c, c + 0.5) * 0.5 : 0} wear={0.11} barYaw={-10 * DEG} barT={t} nod={t > c ? -0.3 : 0} mood={t > c ? "scared" : "happy"} />
            <Bits position={[SPOT[0] - 0.05, 1.2, SPOT[2] + 0.25]} t={t - c} color="#c9ced6" count={8} power={1.1} />
          </>
        );
      },
    },
  ],
});
