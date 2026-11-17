import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Counter, Dad, EAST, Enders, Fill, Heart, Hero, Mum, NORTH, PLACE, PUMPS, PhotoBorder, Puffs, Pumpkin, SOUTH, SQUARE, Shelf, Stove, SubscribeSign, Sword, Thing, Wisps, Zap, hop, posed, timing, tw, w } from "./kit";
import { Dinner, PHOTO_CAM } from "./scene2";

/** 06 — He puts a pumpkin on, goes home, and looks up. Then everything after. */
const N = "overworld-night" as const;
const T = PLACE.table;
const P = PLACE.photo;
const K = PLACE.kitchen;
/** Where she waits, in front of the door, and where he stops. */
const MUM: Vec3 = [0, 0, -12.2];
const ME: Vec3 = [0, 0, -10.95];
/** Her face when she bends down to him, and his eyes. */
const FACE: Vec3 = [0, 2.2, -11.52];
const EYES: Vec3 = [0, 1.3, -10.75];
const BIG = 1.15;

const Pumpkins: React.FC<{ skip?: number; rock?: number }> = ({ skip = -1, rock = 0 }) => (
  <>
    {PUMPS.map(([x, z, r], i) =>
      i === skip ? null : (
        <group key={i} position={[x, 0.28, z]} rotation={[0, r, i === 0 ? rock : 0]}>
          <Pumpkin position={[0, 0, 0]} />
        </group>
      ),
    )}
    <group position={[1.9, 0.05, 1.3]} rotation={[0, 0.9, 0]}>
      <Sword />
    </group>
    <group position={[-1.9, 0.05, 3.2]} rotation={[0, -2.2, 0]}>
      <Sword />
    </group>
  </>
);

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Looking up",
  shots: [
    {
      cue: "6.left",
      ...cam.push({ on: [0, 0.4, 2.2], dist: 4.8, to: 3.9, yaw: 14, pitch: 11, fov: 44 }),
      zone: "town",
      look: N,
      note: "The empty street in the moonlight: six pumpkins lying where they fell, one still rocking, and two swords. The kid walks in among them.",
      stage: (t) => (
        <>
          <Pumpkins rock={Math.sin(t * 9) * 0.22 * Math.max(0, 1 - t * 0.7)} />
          <Hero position={[2.3 - tw(t, 0, 1.4) * 1.6, 0, 0.5]} rotationY={-1.2} animation={t < 1.3 ? "walk" : "idle"} headPitch={0.4} face="wow" />
          <Enders spots={SQUARE.slice(3, 12)} t={t} face={SOUTH} hold={false} first={3} />
          <Fill at={[0, 2.6, 3.6]} power={14} reach={9} />
        </>
      ),
    },
    {
      cue: "6.picked",
      ...cam.push({ on: [0.2, 0.85, 2.85], dist: 3.7, to: 2.9, yaw: -10, pitch: 4, fov: 42 }),
      zone: "town",
      look: N,
      note: "He lifts one in both arms. It is wider than he is: on 'too big' his knees give a little under it. On 'pie' he lifts it to his nose, and smiles.",
      stage: (t) => {
        const up = tw(t, 0.1, 0.65);
        const big = w("6.picked", "big");
        const pie = w("6.picked", "smelled") - 0.1;
        const sag = hop(t, big - 0.2, 0.14, 0.5);
        const nose = tw(t, pie, pie + 0.35);
        return (
          <>
            <Pumpkins skip={0} />
            <Hero position={[0.2, -sag * 0.6, 2.7]} rotationY={SOUTH} animation="hold" face={nose > 0.5 ? "smile" : "wow"} headPitch={0.3} />
            <Pumpkin position={[0.2, 0.3 + up * 0.48 - sag + nose * 0.22, 3.08]} rotationY={0.15} />
            {nose > 0.6 ? <Wisps position={[0.2, 1.25, 3.05]} t={t - pie - 0.2} count={5} reach={0.7} color="#ffd9a0" size={0.14} opacity={0.6} dir={[0, 1, 0]} /> : null}
            <Fill at={[0.5, 2.2, 4.6]} power={12} reach={8} />
          </>
        );
      },
    },
    {
      cue: "6.on",
      ...cam.push({ on: [0.2, 1.05, 2.7], dist: 2.8, to: 2.3, yaw: 8, pitch: 2, fov: 40 }),
      zone: "town",
      look: N,
      note: "It is on his head: an enormous pumpkin on a small yellow kid, crooked, wobbling, with his arms out to keep it there.",
      stage: (t) => (
        <>
          <Hero position={[0.2, -hop(t, 0, 0.1, 0.3), 2.7]} rotationY={SOUTH} pumpkin={BIG} askew={0.1 + Math.sin(t * 13) * 0.22 * Math.exp(-t * 2.6)} pose={posed("idle", t, { armL: [0, 0, -0.9], armR: [0, 0, 0.9] })} />
          <Pumpkins skip={0} />
          <Fill at={[0.5, 2.2, 4.6]} power={12} reach={8} />
        </>
      ),
    },
    {
      cue: "6.knees",
      ...cam.push({ on: [0, 0.9, -11.5], dist: 4.4, to: 3.6, yaw: 62, pitch: 2, fov: 44 }),
      zone: "town",
      look: N,
      note: "Home, by the light from the door. A pumpkin on two short legs walks along with its hands out in front, feeling, and walks into a pair of thin black legs with a pink band on each knee. It stops.",
      stage: (t) => {
        const tb = w("6.knees", "found") + 0.1;
        const go = tw(t, 0, tb);
        return (
          <>
            <Mum position={MUM} rotationY={SOUTH} lookAt={[0, 1.3, ME[2] + 2.3 * (1 - go)]} lean={go * 0.3} />
            <Hero position={[0, 0, ME[2] + 2.3 * (1 - go) + hop(t, tb, 0.1, 0.25)]} rotationY={NORTH} pumpkin={BIG} pose={posed(t < tb ? "walk" : "idle", t, { armR: [-1.35, 0, 0.12], armL: [-1.35, 0, -0.12] })} />
            <Fill at={[1.8, 2.2, -10.4]} power={14} reach={9} />
          </>
        );
      },
    },
    {
      cue: "6.up",
      ...cam.pan({ from: EYES, on: [0, 0.86, -12.2], onTo: FACE, fov: 52 }),
      ease: "outCubic" as const,
      zone: "town",
      look: N,
      note: "What he sees: the pink knees, then up, up the thin black body, and in the half second where nobody speaks, there it is, bent down to him: his mum's face. Two purple eyes.",
      stage: () => (
        <>
          <Mum position={MUM} rotationY={SOUTH} lean={0.6} lookAt={EYES} />
          <Fill at={[1.2, 2.0, -10.2]} power={10} reach={8} />
        </>
      ),
    },
    {
      cue: "7.eyes",
      ...cam.push({ on: [0, 2.07, -11.48], dist: 1.25, to: 1.0, yaw: 0, pitch: -46, fov: 40 }),
      zone: "town",
      look: N,
      note: "Her face fills the picture: black, square, two long purple eyes glowing in it. She is smiling.",
      stage: (t) => (
        <>
          <Mum position={MUM} rotationY={SOUTH} lean={0.6} lookAt={EYES} mood="happy" tilt={Math.sin(t * 2.4) * 0.05} />
          <Fill at={[1.2, 2.0, -10.2]} power={10} reach={8} />
        </>
      ),
    },
    {
      cue: "7.already",
      ...cam.push({ on: [0, 1.7, -11.35], dist: 5.0, to: 4.3, yaw: 74, pitch: 0, fov: 46 }),
      zone: "town",
      look: N,
      note: "Side on: she is bent right over him, her face a hand away from the pumpkin, and the pumpkin is tipped all the way back. Neither of them moves. A heart comes up between them.",
      stage: (t) => (
        <>
          <Mum position={MUM} rotationY={SOUTH} lean={0.6} lookAt={[0, 1.3, ME[2]]} mood="happy" />
          <Hero position={ME} rotationY={NORTH} pumpkin={BIG} headPitch={-0.8} />
          <Heart position={[0.2, 2.75, -11.2]} rotationY={EAST} scale={tw(t, 0.25, 0.55) * 1.1} />
          <Fill at={[2.8, 2.4, -11.2]} power={24} reach={10} />
        </>
      ),
    },
    {
      cue: "7.always",
      ...cam.push({ on: [0.2, 1.7, -11.6], dist: 6.0, to: 7.2, yaw: 26, pitch: 2, fov: 46 }),
      zone: "town",
      look: N,
      note: "We pull back from the two of them in the light of the open door. Dad pops in beside them with his flowers and bends down to look too.",
      stage: (t) => (
        <>
          <Mum position={MUM} rotationY={SOUTH} lean={0.6} lookAt={[0, 1.3, ME[2]]} mood="happy" />
          <Hero position={ME} rotationY={NORTH} pumpkin={BIG} headPitch={-0.8} />
          <Heart position={[0.1, 2.9, -11.2]} rotationY={0.4} scale={1.1} />
          {t > 0.3 ? (
            <Dad position={[1.3, 0, -12.5]} rotationY={-0.5} lean={tw(t, 0.4, 0.9) * 0.4} lookAt={[0, 1.3, ME[2]]} mood="happy" carry={1}>
              <Thing kind={8} />
            </Dad>
          ) : null}
          <Zap position={[1.3, 0, -12.5]} t={t - 0.3} seed={4} />
          <Fill at={[2.2, 2.4, -9.6]} power={16} reach={10} />
        </>
      ),
    },
    {
      cue: "8.dinner",
      ...cam.push({ on: [T[0], 1.5, T[2]], dist: 8.2, to: 7.0, yaw: 0, pitch: 7, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Dinner again, and it is the other way up: the pumpkin is tipped back, looking from mum to dad and back, and both of them are bent down looking at him. His hand pats the table everywhere except where the plate is.",
      stage: (t) => {
        const pat = Math.sin(t * 5.5);
        return (
          <>
            <Dinner />
            <Hero position={[T[0], 0, T[2] - 0.85]} rotationY={SOUTH} pumpkin={BIG} headPitch={-0.5} headYaw={Math.sin(t * 2.4) * 0.7} pose={posed("idle", t, { armR: [-1.15 + Math.abs(pat) * 0.25, 0, 0.5 * pat], armL: [-0.2, 0, -0.1] })} />
            <Mum position={[T[0] - 1.55, 0, T[2]]} rotationY={EAST} lookAt={[T[0], 1.3, T[2] - 0.85]} lean={0.3} mood="happy" />
            <Dad position={[T[0] + 1.55, 0, T[2]]} rotationY={-EAST} lookAt={[T[0], 1.3, T[2] - 0.85]} lean={0.3} mood="happy" />
            <Heart position={[T[0], 2.3, T[2] - 0.8]} scale={tw(t, w("8.dinner", "care") - 0.3, w("8.dinner", "care")) * 1.0} />
          </>
        );
      },
    },
    {
      cue: "8.photo",
      ...cam.push({ on: [P[0], 1.25, P[2]], dist: 6.2, to: 6.2, yaw: 0, pitch: 0, fov: 46 }),
      zone: "photo",
      look: "overworld-day",
      note: "The new family photo in its white border: the same three in the same places. Mum and dad look down at him, smiling, and the pumpkin between them is tipped right back, looking up at her.",
      stage: (t) => (
        <>
          <PhotoBorder camera={PHOTO_CAM} fov={46} />
          <Mum position={[P[0] - 0.75, 0, P[2] - 0.5]} rotationY={SOUTH} lookAt={[P[0], 1.3, P[2] + 0.2]} mood="happy" lean={0.25} />
          <Dad position={[P[0] + 0.8, 0, P[2] - 0.5]} rotationY={SOUTH} lookAt={[P[0], 1.3, P[2] + 0.2]} mood="happy" lean={0.2} />
          <Hero position={[P[0], 0, P[2] + 0.2]} rotationY={SOUTH} pumpkin={BIG} headPitch={-0.7} headYaw={0.55} animation="wave" />
          <Heart position={[P[0], 3.45, P[2] - 0.2]} scale={tw(t, 0.2, 0.5)} />
        </>
      ),
    },
    {
      cue: "8.kitchen",
      ...cam.push({ on: [K[0], 1.35, K[2] + 0.9], dist: 5.9, to: 5.2, yaw: 6, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The kitchen is back: two counters, a shelf of jars, and dad letting the stove down into the gap between them with a thump. The kid, in his pumpkin, throws both arms up.",
      stage: (t) => {
        const down = tw(t, 0.05, 0.4);
        return (
          <>
            <Counter position={[K[0] - 1, 0, K[2]]} />
            <Counter position={[K[0] + 1, 0, K[2]]} on="loaf" />
            <Shelf position={[K[0], 1.85, K[2] - 0.3]} />
            <Stove position={[K[0], (1 - down) * 0.8, K[2]]} lit />
            {t > 0.4 ? <Puffs position={[K[0], 0.1, K[2] + 0.5]} count={6} rise={0.5} spread={0.6} size={0.16} /> : null}
            <Dad position={[K[0] + 1.0, 0, K[2] + 1.5]} rotationY={NORTH + 0.75} carry={1 - tw(t, 0.4, 0.75)} lean={0.3 * (1 - tw(t, 0.4, 0.8))} mood="happy" lookAt={t > 0.7 ? [K[0] - 0.8, 1.3, K[2] + 1.7] : [K[0], 0.5, K[2]]} />
            <Hero position={[K[0] - 0.8, 0, K[2] + 1.7]} rotationY={NORTH - 0.6} pumpkin={BIG} animation={t > 0.45 ? "cheer" : "idle"} headPitch={-0.4} />
          </>
        );
      },
    },
    {
      cue: "9.sub",
      ...cam.push({ on: [0, 1.6, 6.4], dist: 6.2, to: 5.7, yaw: 0, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The last picture: mum holds the red sign in both arms and looks down at her boy; he stands in front with the pumpkin pushed back on his head like a hat, waving. On 'do not stare' he pulls it down over his face. On 'behind you' he points past us, and dad pops in right in front of the lens, bent down, head on one side.",
      stage: (t) => {
        const st = w("9.sub", "stare") - 0.25;
        const td = w("9.sub", "behind") - 0.3;
        const down = tw(t, st, st + 0.25);
        return (
          <>
            <Mum position={[0, 0, 5.2]} rotationY={SOUTH} carry={1} mood="happy" lookAt={[0, 1.3, 6.8]}>
              <SubscribeSign position={[0, 0.72, 0.1]} scale={0.8} tilt={Math.sin(t * 3) * 0.04} />
            </Mum>
            <Hero position={[0, 0, 6.8]} rotationY={SOUTH} pumpkin={BIG} up={1 - down} askew={0.08} animation={t > td - 0.35 ? "point" : down > 0.5 ? "idle" : "wave"} face="grin" />
            {t > td ? <Dad position={[0.3, -0.75, 9.5]} rotationY={SOUTH} lean={0.45} lookAt={[0, 1.8, 12.4]} mood="happy" tilt={0.25 + Math.sin((t - td) * 5) * 0.12} /> : null}
            <Zap position={[0.3, 0.2, 9.9]} t={t - td} seed={6} />
          </>
        );
      },
    },
  ],
});
