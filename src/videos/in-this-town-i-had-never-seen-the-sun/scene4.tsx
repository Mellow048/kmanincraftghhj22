import { cam, storyScene } from "../../engine";
import {
  Bits, Blaze, Block, Bubble, DEG, EAST, Fill, Grandpa, HelmetProp, Homes, Me, PLACE, Pal, Puddle, Puffs, Rain, SOUTH, Sunflower, WEST, WearBar, bigFace, go, hop,
  meFace, pop, timing, tw, w,
} from "./kit";

/** 04 — The hat breaks. The pond at noon. Then the rain. */
const IN = PLACE.inPond;
const OUT: [number, number, number] = [-7, 0, 5.9];
const PALB: [number, number, number] = [-4.3, 0, 3.4];
/** Where he has waded to by the time the kid sits down: as near the bank as the water goes. */
const NEAR: [number, number, number] = [-5.65, -0.74, 3.3];
const G = PLACE.grandpa;

/** The two halves of the hat, where they fell on the bank. */
const Halves = () => (
  <>
    <HelmetProp position={[-6.25, 0.02, 5.2]} rotation={[0.2, 0.6, 1.3]} half={-1} />
    <HelmetProp position={[-6.9, 0.02, 5.25]} rotation={[-0.2, -0.4, -1.2]} half={1} />
  </>
);
/** Rings going out on the water round his neck. */
const Ripples = ({ t }: { t: number }) => (
  <>
    {[0, 1].map((i) => {
      const k = (t * 0.6 + i * 0.5) % 1;
      const r = 0.3 + k * 0.7;
      return (
        <group key={i} position={[IN[0], 0.06, IN[2]]}>
          {[0, 1, 2, 3].map((j) => (
            <Block key={j} position={[j < 2 ? 0 : (j === 2 ? -r : r), 0, j < 2 ? (j === 0 ? -r : r) : 0]} size={j < 2 ? [r * 2, 0.012, 0.04] : [0.04, 0.012, r * 2]} color="#d8efff" castShadow={false} />
          ))}
        </group>
      );
    })}
  </>
);

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The pond",
  shots: [
    {
      cue: "7.far",
      ...cam.push({ on: [-7, 1.8, 1.3], dist: 15, to: 12.5, yaw: 84, pitch: 5, fov: 50 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Very wide, looking west: the kid is tiny in the flowers with a red blinking bar over his head, and the dark line of the wood is a long, long way off on the horizon.",
      stage: (t) => (
        <>
          <Me position={[0.4, 0, 1.3]} rotationY={WEST} helmet crack={1} wear={0.08} barYaw={84 * DEG} barT={t} turn={Math.sin(t * 5) * 0.5} />
          <Pal position={[1.2, 0, 2.1]} rotationY={WEST} />
        </>
      ),
    },
    {
      cue: "7.ran",
      ...cam.truck({ on: [-2.2, 0.7, 2.0], dist: 3.6, yaw: 12, pitch: 5, fov: 44, by: [-1.6, 0, 0.4] }),
      zone: "meadow",
      look: "overworld-day",
      note: "Low and alongside: he runs flat out through the flowers, dust at his heels, the hat jumping on his head and the bar at its last sliver.",
      stage: (t) => {
        const g = go([-0.8, 0, 1.6], [-4.2, 0, 2.6], 0.2 + t * 0.75);
        return (
          <>
            <Me {...g} helmet crack={1} wear={0.04} barYaw={12 * DEG} barT={t} lean={0.3} mood="scared" />
            <Puffs position={[g.position[0] + 0.5, 0.1, g.position[2] - 0.1]} count={5} spread={0.3} size={0.2} rise={0.5} speed={1.8} color="#e9e2d0" />
          </>
        );
      },
    },
    {
      cue: "7.broke",
      ...cam.push({ on: [-4.4, 1.15, 2.7], dist: 2.6, to: 2.2, yaw: 6, pitch: 0, fov: 40 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The hat splits down the middle and the two halves fly off left and right. The bar goes out. He is bare-headed in the sun, and the first smoke comes off him.",
      stage: (t) => {
        const b = 0.22;
        const k = Math.max(0, t - b);
        const p: [number, number, number] = [-4.4, 0, 2.7];
        return (
          <>
            <Me position={p} rotationY={SOUTH + 0.1} helmet={t < b} crack={1} mood="scared" armPitch={t > b ? [-2.6, -2.6] : [0, 0]} />
            {t < b ? <WearBar position={[p[0], 1.58, p[2]]} k={0.02} yaw={6 * DEG} t={t} /> : null}
            {t >= b
              ? [-1, 1].map((s) => (
                  <HelmetProp key={s} position={[p[0] + s * (0.2 + k * 1.6), 1.0 + k * 1.6 - k * k * 3.2, p[2] + 0.1]} rotation={[k * 3, 0, s * k * 5]} half={s as -1 | 1} />
                ))
              : null}
            <Bits position={[p[0], 1.25, p[2] + 0.2]} t={t - b} color="#c9ced6" count={12} power={1.6} />
            <Bits position={[p[0], 1.6, p[2]]} t={t - b} color="#f0402a" count={6} power={1.0} seed={5} />
            {t > b + 0.3 ? <Puffs position={[p[0], 1.25, p[2]]} count={5} rise={0.7} spread={0.1} size={0.12} speed={1.4} color="#e8e8e8" opacity={0.7} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.pond",
      ...cam.push({ on: [-6.4, 0.7, 3.3], dist: 5.4, to: 4.6, yaw: -10, pitch: 12, fov: 44 }),
      zone: "meadow",
      look: "overworld-day",
      note: "The pond. He comes in from the right with flames on his head, jumps, and goes in with a splash that throws water over the bank and a puff of steam.",
      stage: (t) => {
        const land = 0.62;
        const k = Math.min(1, t / land);
        const x = -4.2 + (IN[0] + 4.2) * k;
        const y = t < land ? Math.sin(k * Math.PI) * 0.9 + IN[1] * k * k : IN[1];
        return (
          <>
            <Me position={[x, y, 2.9 + (IN[2] - 2.9) * k]} rotationY={WEST} armPitch={[-2.8, -2.8]} mood="scared" />
            {t < land ? <Blaze position={[x, y + 1.0, 2.9 + (IN[2] - 2.9) * k]} size={0.3} height={0.6} count={7} /> : null}
            <Bits position={[IN[0], 0.1, IN[2]]} t={t - land} color="#7fbcf2" count={18} power={2.2} />
            <Bits position={[IN[0], 0.1, IN[2]]} t={t - land - 0.05} color="#d8efff" count={12} power={1.6} seed={7} />
            {t > land ? <Puffs position={[IN[0], 0.3, IN[2]]} count={8} rise={1.6} spread={0.4} size={0.3} speed={1.0} color="#ffffff" opacity={0.7} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.neck",
      ...cam.push({ on: [IN[0], 0.38, IN[2]], dist: 2.8, to: 2.3, yaw: 8, pitch: 11, fov: 40 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Only his head is out of the water, with rings going out round his neck and the last of the steam. His face goes from terror to surprise: nothing is burning.",
      stage: (t) => {
        const ok = w("7.neck", "burn");
        return (
          <>
            <Me position={IN} rotationY={SOUTH + 0.1} mood={t > ok - 0.3 ? "calm" : "scared"} turn={Math.sin(t * 2) * 0.25} />
            <Ripples t={t} />
            {t < 1.0 ? <Puffs position={[IN[0], 0.55, IN[2]]} count={5} rise={0.9} spread={0.15} size={0.16} speed={1.0} color="#ffffff" opacity={0.6} /> : null}
          </>
        );
      },
    },
    {
      cue: "7.stuck",
      ...cam.top({ on: [-7, 0, 3], height: 8, to: 12, spin: [0, 8], fov: 46 }),
      zone: "meadow",
      look: "overworld-day",
      note: "From straight above, and rising: the pond is a small blue patch in a great bright field, his head is a green dot in the middle of it, and the two halves of the hat lie on the bank.",
      stage: (t) => (
        <>
          <Me position={IN} rotationY={SOUTH} nod={-0.9} mood="sad" />
          <Ripples t={t} />
          <Halves />
          <Pal position={[-5.7, 0, 5.5]} rotationY={Math.PI * 0.8} lookAt={meFace(IN)} />
        </>
      ),
    },
    {
      cue: "7.kid",
      ...cam.push({ on: [-5.0, 0.45, 3.4], dist: 4.3, to: 3.6, yaw: 58, pitch: 9, fov: 42 }),
      zone: "meadow",
      look: "overworld-day",
      note: "Along the bank: the villager kid comes to the edge and sits down with his legs out towards the water, and just past him is a green head sticking out of the pond. The two of them look at each other. Neither has an idea.",
      stage: (t) => {
        const sat = t > 0.75;
        return (
          <>
            <Me position={NEAR} rotationY={EAST} mood="sad" lookAt={[PALB[0], 0.8, PALB[2]]} />
            <group position={[NEAR[0] - IN[0], 0, NEAR[2] - IN[2]]}>
              <Ripples t={t} />
            </group>
            {sat ? <Pal position={[PALB[0], -0.39, PALB[2]]} rotationY={WEST} sit nod={0.15} tilt={Math.sin(t * 1.2) * 0.08} /> : <Pal {...go([-3.0, 0, 4.0], PALB, tw(t, 0, 0.75))} />}
          </>
        );
      },
    },
    {
      cue: "7.grey",
      ...cam.push({ on: [IN[0], 2.6, IN[2] - 3], dist: 5.4, to: 4.8, yaw: 4, pitch: -17, fov: 46 }),
      zone: "meadow",
      look: "overworld-rain",
      note: "From low behind his head, looking up: the blue has gone out of the sky. Cloud has come over the sun, and the whole field is in shadow.",
      stage: (t) => (
        <>
          <Me position={IN} rotationY={SOUTH + Math.PI} nod={-0.8} />
          <Ripples t={t} />
        </>
      ),
    },
    {
      cue: "7.drop",
      ...cam.push({ on: [IN[0], 0.36, IN[2]], dist: 2.1, to: 1.8, yaw: -6, pitch: 7, fov: 38 }),
      zone: "meadow",
      look: "overworld-rain",
      note: "His face, close. One drop falls and lands on his nose, and his eyes cross to look at it. Then the whole sky comes down.",
      stage: (t) => {
        const hit = 0.42;
        const all = w("7.drop", "Then");
        return (
          <>
            <Me position={IN} rotationY={SOUTH} mood={t > all + 0.3 ? "happy" : "calm"} nod={t > hit && t < all ? 0.12 : -tw(t, all, all + 0.4) * 0.5} />
            <Ripples t={t} />
            {t < hit ? <Block position={[IN[0], 0.42 + (hit - t) * 6, IN[2] + 0.2]} size={[0.05, 0.3, 0.05]} color="#cfe4ff" emissive="#9cc4ff" emissiveIntensity={0.6} castShadow={false} /> : null}
            <Bits position={[IN[0], 0.42, IN[2] + 0.22]} t={t - hit} color="#cfe4ff" count={6} power={0.6} />
            <Rain center={[IN[0], 0, IN[2]]} t={t} area={[9, 8]} count={170} k={tw(t, all - 0.1, all + 0.5)} />
          </>
        );
      },
    },
    {
      cue: "7.walk",
      ...cam.push({ on: [-6.8, 0.75, 4.7], dist: 5.4, to: 4.2, yaw: -8, pitch: 6, fov: 44 }),
      zone: "meadow",
      look: "overworld-rain",
      note: "In the pouring rain he walks up out of the pond towards us: shoulders, then chest, then knees, then all of him on the bank, with nothing on his head and his arms a little out. The villager kid jumps up.",
      stage: (t) => {
        const k = tw(t, 0.15, 2.1);
        const g = go(IN, OUT, k);
        return (
          <>
            <Me {...g} position={[g.position[0], IN[1] * (1 - Math.min(1, k * 1.7)), g.position[2]]} armPitch={[-0.6, -0.6]} nod={-0.2} mood={k > 0.6 ? "happy" : "calm"} />
            <Halves />
            <Pal position={[-5.95, hop(t, 1.3, 0.25, 0.35), 5.5]} rotationY={WEST} lookAt={meFace(OUT)} />
            <Rain center={[-6.6, 0, 4.4]} t={t} area={[10, 9]} count={190} />
          </>
        );
      },
    },
    {
      cue: "7.nofire",
      ...cam.push({ on: meFace(OUT), dist: 2.1, to: 1.8, yaw: 10, pitch: -3, fov: 38 }),
      zone: "meadow",
      look: "overworld-rain",
      note: "His bare head, close, with the rain bouncing off it and running down his face. Not one flame. He grins.",
      stage: (t) => (
        <>
          <Me position={OUT} rotationY={SOUTH + 0.1} mood="happy" armPitch={[-2.6, -2.6]} nod={-0.3} />
          {[0, 0.3, 0.6].map((d, i) => (
            <Bits key={d} position={[OUT[0] + (i - 1) * 0.1, 1.3, OUT[2] + 0.1]} t={t - d} color="#cfe4ff" count={5} power={0.7} seed={i + 2} />
          ))}
          <Rain center={[OUT[0], 0, OUT[2] - 2.6]} t={t + 2} area={[7, 5]} count={170} />
        </>
      ),
    },
    {
      cue: "7.good",
      ...cam.push({ on: bigFace(G), dist: 3.4, to: 2.6, yaw: -18, pitch: -5, fov: 40 }),
      zone: "under",
      look: "overworld-night",
      note: "Grandpa again, as we saw him at the start: out in the rain under the trees with both arms up. This time he brings his face down and looks straight at us.",
      stage: (t) => {
        const down = tw(t, w("7.good", "good") - 0.2, w("7.good", "good") + 0.3);
        return (
          <>
            <Homes />
            <Rain center={[G[0], 0, G[2] + 0.5]} t={t} area={[9, 8]} count={150} />
            <Puddle position={[G[0] - 0.3, 0, G[2] + 0.9]} />
            <Grandpa position={G} rotationY={SOUTH} armPitch={[-2.7, -2.7]} nod={-0.5 + down * 0.6} mood="happy" lean={0} />
            <Fill at={[G[0] - 1, 2.2, G[2] + 2.4]} power={12} color="#cfe8ff" />
          </>
        );
      },
    },
    {
      cue: "7.been",
      ...cam.push({ on: [0.1, 1.25, -0.7], dist: 4.6, to: 3.6, yaw: 12, pitch: 1, fov: 42 }),
      zone: "meadow",
      look: "overworld-rain",
      note: "The same field, long ago, in the rain: a young zombie in grandpa's purple shirt stands by the sunflowers with his face up. In his hand is an iron hat with a dent in it.",
      stage: (t) => {
        const p: [number, number, number] = [-0.2, 0, -0.6];
        return (
          <>
            <Sunflower position={[0.95, 0, -1.1]} rotationY={SOUTH} height={1.8} up={0.4} sway={Math.sin(t * 1.4) * 0.03} />
            <Grandpa young position={p} rotationY={SOUTH + 0.15} armPitch={[-0.2, -0.95]} nod={-0.45} mood="happy" />
            <HelmetProp position={[p[0] + 0.42, 0.62, p[2] + 0.62]} rotation={[0.2, 0.1, 0]} />
            <Bubble text="LONG AGO" position={[p[0] - 0.2, 2.25, p[2]]} scale={0.4 * pop(t, w("7.been", "long") - 0.1, 0.14)} dark tail={-1} />
            <Rain center={[0, 0, 0.5]} t={t + 4} area={[9, 8]} count={170} />
          </>
        );
      },
    },
  ],
});
