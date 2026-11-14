import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** Memories are money: the actor, camera and action are driven by this beat's narration. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Memories are money",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: V(0, 1.15, 1), dist: 3.5, to: 2.8, yaw: 0, pitch: 5, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "Meet the teller with a blue memory in his hands and the shop behind: the rule is a picture.",
      stage: (t, { p }) => (
        <><Hero position={V(0, 0, 1)} animation="talk" face="grin" time={t}/><Memory position={V(0, 0.92 + 0.06*Math.sin(t*3), 1.45)} scale={0.95} turn={t}/><Owner position={V(0, 0, -2.0)} /></>
      ),
    },
    {
      cue: "1.what",
      ...cam.push({ on: S(0, 1.6, -1.4), dist: 3.2, to: 2.7, yaw: 8, pitch: 4, fov: 40 }),
      zone: "shop",
      look: "warm-room",
      note: "The shopkeeper watches from behind his counter, with the blue jars behind him and no explanation.",
      stage: (t, { p }) => (
        <><Owner position={S(0, 0, -1.9)} lookAt={S(0, 1.2, 2)} /><Jar position={S(0, 1.2, -0.7)} scale={0.8} /><Memory position={S(0.55, 2.0 + 0.08*Math.sin(t*3), -0.7)} scale={0.45} turn={t}/></>
      ),
    },
    {
      cue: "1.shook",
      ...cam.push({ on: V(0, 2.9, -4.8), dist: 9, to: 8, yaw: 0, pitch: 7, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "At night the entire shop trembles; the pale blue windows make the secret a place to look for.",
      stage: (t, { p }) => (
        <><Memory position={V(-1.9, 1.95, -4.55)} scale={0.5} turn={t*2}/><Memory position={V(1.9, 1.95, -4.55)} scale={0.5} turn={-t*2}/><Hero position={V(0, 0, 0.5)} animation="lookAround" face="uneasy" time={t} /></>
      ),
    },
    {
      cue: "1.back",
      ...cam.push({ on: S(0, 1.7, -0.8), dist: 2.7, to: 2.2, yaw: 5, pitch: 2, fov: 38 }),
      zone: "shop",
      look: "warm-room",
      note: "Push on the closed lid and trapped memory: nothing comes back out.",
      stage: (t, { p }) => (
        <><Jar position={S(0, 1.15, -0.8)} scale={1} /><Owner position={S(0, 0, -2.0)} lookAt={S(0, 1.5, 0)} /></>
      ),
    },
  ],
});
