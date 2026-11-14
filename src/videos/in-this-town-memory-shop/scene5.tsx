import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** Forgetting: the actor, camera and action are driven by this beat's narration. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Forgetting",
  shots: [
    {
      cue: "5.cubes",
      ...cam.push({ on: S(0, 1.45, 0), dist: 4.4, to: 3.7, yaw: 0, pitch: 5, fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "Blue cubes physically leave his head and enter a labeled jar on the counter.",
      stage: (t, { p }) => (
        <><Hero position={S(-0.5, 0, 0.6)} animation="scared" face="wow" time={t}/><Owner position={S(0.5, 0, -1.9)}/><Jar position={S(0.5, 1.17, -0.6)} label scale={0.85}/><MemoryStream from={S(-0.5, 1.24, 0.6)} to={S(0.5, 1.6, -0.6)} p={p}/></>
      ),
    },
    {
      cue: "5.smile",
      ...cam.push({ on: S(0, 1.15, 0), dist: 4.3, to: 3.6, yaw: 0, pitch: 4, fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "Her smile remains, but his face changes to confusion as he looks past her to Mom.",
      stage: (t, { p }) => (
        <><Hero position={S(0.0, 0, 0.7)} animation="lookAround" face="uneasy" time={t}/><Sister position={S(-0.45, 0, -0.25)} animation="idle" face="smile"/><Mom position={S(0.55, 0, -0.9)} face="frown"/></>
      ),
    },
    {
      cue: "5.boat",
      ...cam.push({ on: S(0, 0.95, 0.2), dist: 4.5, to: 3.8, yaw: 0, pitch: 8, fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "The paper boat moves toward him, then returns to her; he does not understand the gift.",
      stage: (t, { p }) => (
        <><Hero position={S(0.28, 0, 0.7)} animation="reach" face="uneasy" time={t}/><Sister position={S(-0.45, 0, -0.2)} animation="reach" face="frown" time={t}/><Boat position={S(mix(-0.35, 0.3, p < 0.5 ? p*2 : 2-p*2), 0.85, 0.7)} scale={0.48}/></>
      ),
    },
  ],
});
