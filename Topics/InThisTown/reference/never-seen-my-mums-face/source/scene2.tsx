import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Dad, Enders, GROUND_SIT, Hero, KID, KitchenGone, Mum, NORTH, PLACE, Pan, PhotoBorder, Plate, Puddle, Rain, SOUTH, EAST, WEST, STREET, Stove, Table, Zap, hop, posed, sitPose, timing, tw, w } from "./kit";

/** 02 — How you live with a mum you cannot look at. */
const T = PLACE.table;
const P = PLACE.photo;
const K = PLACE.kitchen;
export const PHOTO_CAM: Vec3 = [P[0], 1.25, P[2] + 6.2];

/** The dinner table, across the yard, with three plates. */
export const Dinner: React.FC<{ kidPlate?: Vec3 }> = ({ kidPlate }) => (
  <>
    <group position={T} rotation={[0, Math.PI / 2, 0]}>
      <Table position={[0, 0, 0]} length={2.9} />
    </group>
    <Plate position={kidPlate ?? [T[0], 0.8, T[2] - 0.25]} />
    <Plate position={[T[0] - 0.95, 0.8, T[2]]} food="#7a5aa8" />
    <Plate position={[T[0] + 0.95, 0.8, T[2]]} food="#5faa3a" />
  </>
);

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "By her knees",
  shots: [
    {
      cue: "2.knees",
      ...cam.push({ on: [0.25, 0.8, -2.6], dist: 4.4, to: 3.5, yaw: 16, pitch: 0, fov: 44 }),
      zone: "town",
      look: "overworld-day",
      note: "At his height: a wood of thin black legs, all the same. One pair has a pink band on each knee. He walks straight to it, eyes down, and hugs the leg.",
      stage: (t) => {
        const go = tw(t, 0.1, 1.0);
        return (
          <>
            <Enders spots={[[-1.3, -3.6], [1.6, -3.2], [-0.6, -5.2], [1.0, -5.6], [-2.3, -2.2], [2.5, -4.8], [0.2, -7], [-1.8, -6.6]]} t={t} face={SOUTH} first={2} />
            <Mum position={[0.3, 0, -2.6]} rotationY={SOUTH} lookAt={[0.1, 1.2, -1.8]} />
            <Hero position={[-0.9 + go * 0.95, 0, -0.9 - go * 1.38]} rotationY={NORTH - 0.5 + go * 0.5} animation={go < 1 ? "walk" : "hug"} headPitch={0.45} face="smile" />
          </>
        );
      },
    },
    {
      cue: "2.dinner",
      ...cam.push({ on: [T[0], 1.55, T[2]], dist: 8.2, to: 7.2, yaw: 0, pitch: 7, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "Dinner in the yard, front on: mum at one end of the table and dad at the other, three metres tall and bent right over plates that are down at their knees; the kid in the middle, nose to his plate. Then mum's head turns, just a little, to him.",
      stage: (t) => {
        const peek = t > w("2.dinner", "plates") - 0.1;
        return (
          <>
            <Dinner />
            <Hero position={[T[0], 0, T[2] - 0.85]} rotationY={SOUTH} headPitch={0.75} face="calm" />
            <Mum position={[T[0] - 1.55, 0, T[2]]} rotationY={EAST} lookAt={peek ? [T[0], 1.2, T[2] - 0.85] : [T[0] - 0.95, 0.8, T[2]]} lean={0.25} />
            <Dad position={[T[0] + 1.55, 0, T[2]]} rotationY={WEST} lookAt={[T[0] + 0.95, 0.8, T[2]]} lean={0.25} />
          </>
        );
      },
    },
    {
      cue: "2.photo",
      ...cam.push({ on: [P[0], 1.25, P[2]], dist: 6.2, to: 6.2, yaw: 0, pitch: 0, fov: 46 }),
      zone: "photo",
      look: "overworld-day",
      note: "The family photo, with its white border: dad looks into the lens and smiles, mum looks down at her boy, and the boy, between them, looks at his shoes.",
      stage: (t) => (
        <>
          <PhotoBorder camera={PHOTO_CAM} fov={46} />
          <Mum position={[P[0] - 0.75, 0, P[2] - 0.5]} rotationY={SOUTH} lookAt={[P[0], 1.2, P[2] + 0.2]} tilt={Math.sin(t * 2) * 0.03} />
          <Dad position={[P[0] + 0.8, 0, P[2] - 0.5]} rotationY={SOUTH} mood="happy" />
          <Hero position={[P[0], 0, P[2] + 0.2]} rotationY={SOUTH} headPitch={0.85} face="uneasy" />
        </>
      ),
    },
    {
      cue: "2.seek",
      ...cam.push({ on: [0, 1.1, 4.4], dist: 7.6, to: 6.6, yaw: -10, pitch: 12, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Hide and seek: he runs at a small enderman with his hand out, and on 'teleport' it is a purple puff and his hand closes on nothing. It is behind him now. So is another one.",
      stage: (t) => {
        const tp = w("2.seek", "teleport") - 0.12;
        const run = tw(t, 0.2, tp);
        return (
          <>
            <Hero position={[-1.2 + run * 1.5, 0, 6.4 - run * 2.6]} rotationY={NORTH - 0.5} animation={t < tp ? "run" : "reach"} face={t < tp ? "grin" : "wow"} />
            {t < tp ? <Enders spots={[[0.9, 3.1, SOUTH + 0.6]]} t={t} first={4} scale={0.6} hold={false} mood="happy" /> : <Enders spots={[[-1.3, 6.9, NORTH]]} t={t} first={4} scale={0.6} hold={false} mood="happy" />}
            <Zap position={[0.9, -0.5, 3.1]} t={t - tp} seed={4} />
            <Zap position={[-1.3, -0.5, 6.9]} t={t - tp - 0.06} seed={6} />
            {t > tp + 0.35 ? <Enders spots={[[1.1, 6.2, NORTH + 0.5]]} t={t} first={8} scale={0.55} hold={false} mood="happy" /> : null}
            <Zap position={[1.1, -0.5, 6.2]} t={t - tp - 0.35} seed={7} />
          </>
        );
      },
    },
    {
      cue: "2.won",
      ...cam.push({ on: [0, 1.0, 5], dist: 4.4, to: 3.7, yaw: 6, pitch: 4, fov: 42 }),
      zone: "town",
      look: "overworld-day",
      note: "He turns to us, flat. Behind him the little one pops up on his left, then on his right, waving.",
      stage: (t) => {
        const tp = 0.55;
        return (
          <>
            <Hero position={[0, 0, 5]} rotationY={SOUTH} face="frown" animation="shrug" />
            {t < tp ? <Enders spots={[[-1.0, 3.6]]} t={t} first={4} scale={0.6} hold={false} mood="happy" tilt={0.5} /> : <Enders spots={[[1.0, 3.4]]} t={t} first={4} scale={0.6} hold={false} mood="happy" tilt={0.5} />}
            <Zap position={[-1.0, -0.5, 3.6]} t={t - tp} seed={4} />
            <Zap position={[1.0, -0.5, 3.4]} t={t - tp - 0.05} seed={8} />
          </>
        );
      },
    },
    {
      cue: "2.rain",
      ...cam.push({ on: [0, 1.2, 2.5], dist: 14.5, to: 12.5, yaw: 10, pitch: 24, fov: 48 }),
      zone: "town",
      look: "overworld-day",
      note: "The street from above, full of endermen. The rain starts, and one after another every one of them is a purple puff and gone. The kid is left in the middle of an empty street with his hands out.",
      stage: (t) => {
        const r = w("2.rain", "rains") - 0.3;
        return (
          <>
            <Rain center={[0, 0, 3]} t={t} area={[11, 17]} count={170} k={tw(t, r, r + 0.5)} />
            <Enders spots={STREET} t={t} face={SOUTH} outAt={(i) => r + 0.35 + i * 0.085} lookAt={[0, 9, 4]} mood="scared" />
            <Hero position={[0.2, 0, 4.4]} rotationY={SOUTH} animation="lookAround" face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "2.alone",
      ...cam.push({ on: [0, 1.0, 5], dist: 5.8, to: 4.8, yaw: 82, pitch: 7, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "He jumps in a puddle in the rain by himself, and he is laughing. Far behind him, flat against a house wall under the edge of its roof, mum stands out of the rain and watches him.",
      stage: (t) => {
        const beat = 0.62;
        const k = (t % beat) / beat;
        const y = Math.sin(k * Math.PI) * 0.42;
        const n = Math.floor(t / beat);
        return (
          <>
            <Rain center={[-3.5, 0, 5]} t={t + 3} area={[10, 7]} count={150} />
            <Puddle position={[0, 0, 5]} size={[1.7, 1.2]} />
            <Hero position={[0, y, 5]} rotationY={EAST - 0.2} animation="cheer" face="laugh" />
            {n > 0 ? <Bits position={[0, 0.1, 5]} t={t - n * beat} color="#9fd0ff" count={10} seed={n} power={0.7} /> : null}
            <Mum position={[-8.0, 0, 3.6]} rotationY={EAST} lookAt={[0, 1.2, 5]} />
          </>
        );
      },
    },
    {
      cue: "2.kitchen",
      ...cam.push({ on: [K[0] + 0.1, 1.3, K[2] + 0.8], dist: 5.6, to: 4.9, yaw: 6, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "Where the kitchen was: three pale squares on the wall and three on the floor. Dad walks off with the stove in his arms, very pleased. The kid stands in the middle with a frying pan and an egg, and watches the stove go.",
      stage: (t) => {
        const go = Math.max(0, t - 0.4) * 0.8;
        return (
          <>
            <KitchenGone position={K} />
            <Dad position={[K[0] - 0.75 + go, 0, K[2] + 2.0]} rotationY={EAST} walk={go} carry={1} mood="happy">
              <group scale={0.75} position={[0, -0.3, 0]}>
                <Stove />
              </group>
            </Dad>
            <Hero position={[K[0] - 0.5, 0, K[2] + 0.7]} rotationY={SOUTH + 0.25} animation="hold" face={t > w("2.kitchen", "Yesterday") ? "frown" : "wow"} headYaw={t > w("2.kitchen", "Yesterday") ? 0 : -0.9} headPitch={t > w("2.kitchen", "Yesterday") ? 0.35 : 0}>
              <Pan />
            </Hero>
          </>
        );
      },
    },
    {
      cue: "2.want",
      ...cam.push({ on: [-1.5, 0.72, -13.4], dist: 3.5, to: 2.6, yaw: -16, pitch: 3, fov: 40 }),
      zone: "town",
      look: "overworld-sunset",
      note: "Evening on the step. He sits on the ground and looks at his shoes; her legs, with the pink knees, stand beside him. On 'just once' his head starts to come up, gets half way, and goes down again.",
      stage: (t) => {
        const a = w("2.want", "Just") - 0.1;
        const lift = tw(t, a, a + 0.35) * (1 - tw(t, a + 0.55, a + 0.8));
        return (
          <>
            <Hero position={[-1.5, GROUND_SIT * KID, -13.4]} rotationY={SOUTH} pose={sitPose(t)} headPitch={0.6 - lift * 0.7} face={lift > 0.3 ? "uneasy" : "frown"} />
            <Mum position={[-0.7, 0, -13.7]} rotationY={SOUTH} lookAt={[-1.5, 0.8, -13.4]} lean={0.2} />
          </>
        );
      },
    },
  ],
});
