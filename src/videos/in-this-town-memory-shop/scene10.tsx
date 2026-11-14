import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** The choice: the actor, camera and action are driven by this beat's narration. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "The choice",
  shots: [
    {
      cue: "10.sister",
      ...cam.push({ on: F(-0.85, 1.7, 0.5), dist: 4.1, to: 3.5, yaw: 0, pitch: 5, fov: 42 }),
      zone: "factory",
      look: "warm-room",
      note: "The yellow scarf identifies the stranger as she reaches across the belt toward his labeled jar.",
      stage: (t, { p }) => (
        <><Machine t={t} jarX={0.45} label/><Sister position={F(-0.95, 0.96, 0.45)} animation="reach" face="uneasy" time={t}/></>
      ),
    },
    {
      cue: "10.scarf",
      ...cam.push({ on: F(-1.35, 1.75, 0.55), dist: 4.2, to: 3.5, yaw: 0, pitch: 5, fov: 42 }),
      zone: "factory",
      look: "warm-room",
      note: "The turning gear catches a visibly taut yellow scarf and drags the sister toward it.",
      stage: (t, { p }) => (
        <><Machine t={t} jarX={0.5} label/><Sister position={F(-0.85-0.45*p, 0.96, 0.45)} animation="scared" face="fear" time={t}/><ScarfTether from={F(-0.85-0.45*p, 1.8, 0.5)} to={F(-1.75, 1.4, 0.72)}/></>
      ),
    },
    {
      cue: "10.jar",
      ...cam.push({ on: F(0.5, 1.45, 0), dist: 3.6, to: 3.0, yaw: 0, pitch: 7, fov: 40 }),
      zone: "factory",
      look: "warm-room",
      note: "The labeled jar rolls toward the press, visibly moving away from the trapped sister.",
      stage: (t, { p }) => (
        <Machine t={t} jarX={mix(-0.45,0.9,p)} label down={0.1+0.2*p}/>
      ),
    },
    {
      cue: "10.choice",
      ...cam.push({ on: F(-0.55, 1.55, 0.2), dist: 9, to: 8.4, yaw: 0, pitch: 7, fov: 46 }),
      zone: "factory",
      look: "warm-room",
      note: "In one frame the trapped sister is on the left and the jar is at the press on the right; he cannot reach both.",
      stage: (t, { p }) => (
        <><Machine t={t} jarX={0.8} label down={0.4}/><Sister position={F(-1.05, 0.96, 0.4)} animation="scared" face="fear" time={t}/><ScarfTether from={F(-1.05, 1.8, 0.4)} to={F(-1.75, 1.4, 0.72)}/><Hero position={F(-1.65, 0, 1.6)} animation="reach" face="fear" time={t}/></>
      ),
    },
  ],
});
