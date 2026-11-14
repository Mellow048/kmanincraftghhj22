import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** Under the shop: the actor, camera and action are driven by this beat's narration. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Under the shop",
  shots: [
    {
      cue: "8.stairs",
      ...cam.truck({ on: F(-4.3, 1.1, 1), dist: 4.5, yaw: 0, pitch: 7, fov: 42, by: [0.7, 0, -0.7] }),
      zone: "factory",
      look: "warm-room",
      note: "He creeps down real stone steps toward the rhythmic thump, travelling rather than sliding.",
      stage: (t, { p }) => (
        <Hero position={F(-4.6+0.7*p, 1.0*(1-p), 1.4-0.7*p)} rotationY={2.3} animation="creep" animDistance={p} face="uneasy"/>
      ),
    },
    {
      cue: "8.belts",
      ...cam.truck({ on: F(-1, 1.35, 0), dist: 5.8, yaw: 0, pitch: 8, fov: 44, by: [1.1, 0, 0] }),
      zone: "factory",
      look: "warm-room",
      note: "A conveyor carries glowing jars across the secret basement; turning gears explain the motion.",
      stage: (t, { p }) => (
        <><Machine t={t} jarX={-2.3+1.1*p}/><Jar position={F(-0.3+0.8*p, 0.95, 0)} scale={0.68}/><Hero position={F(-2.9, 0, 1.3)} animation="peek" face="wow" time={t}/></>
      ),
    },
    {
      cue: "8.press",
      ...cam.push({ on: F(0.9, 1.9, 0), dist: 4.2, to: 3.5, yaw: 5, pitch: 7, fov: 42 }),
      zone: "factory",
      look: "warm-room",
      note: "The giant piston winds up and drops onto a jar; the moving gear makes its force legible.",
      stage: (t, { p }) => (
        <Machine t={t} jarX={0.9} down={smooth(Math.min(1,p*1.6))}/>
      ),
    },
    {
      cue: "8.emerald",
      ...cam.push({ on: F(0.9, 1.3, 0), dist: 3.2, to: 2.6, yaw: 0, pitch: 8, fov: 40 }),
      zone: "factory",
      look: "warm-room",
      note: "The press rises; an emerald falls where the memory jar stood.",
      stage: (t, { p }) => (
        <><Machine t={t} down={1-smooth(p)} jar={p<0.25} jarX={0.9} emerald={p>0.25}/><Emerald position={F(1.1, 1.2-0.16*smooth(p), 0.6)} scale={0.8} turn={t}/></>
      ),
    },
  ],
});
