import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** Save her: the actor, camera and action are driven by this beat's narration. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "Save her",
  shots: [
    {
      cue: "11.jump",
      ...cam.truck({ on: F(-2.2, 1.45, 0.5), dist: 6.6, yaw: 0, pitch: 8, fov: 44, by: [0.8, 0, 0] }),
      zone: "factory",
      look: "warm-room",
      note: "He jumps from the floor onto the belt, reaches her and pulls the scarf clear in one continuous move.",
      stage: (t, { p }) => (
        <><Machine t={t} jarX={0.85} label down={0.55+0.3*p}/><Sister position={F(-1.25, 0.96, 0.4)} animation="scared" face="fear" time={t}/>{p<0.65 ? <ScarfTether from={F(-1.25, 1.8, 0.4)} to={F(-1.75, 1.4, 0.72)}/> : null}<Hero position={F(mix(-2.8,-1.55,p), 0.96*p+jump(p,0.65), 1.15-0.6*p)} animation="jump" face="brave" time={t}/></>
      ),
    },
    {
      cue: "11.tumble",
      ...cam.push({ on: F(-1.8, 0.9, 1), dist: 5, to: 4.3, yaw: 0, pitch: 8, fov: 42 }),
      zone: "factory",
      look: "warm-room",
      note: "The siblings fall off the belt together, rotating and dropping to the floor rather than teleporting.",
      stage: (t, { p }) => (
        <><Machine t={t} jarX={0.9} label down={0.9}/><group position={F(-1.7-0.5*p, 1.0*(1-p), 0.8+0.35*p)} rotation={[0, 0, 1.1*p]}><Hero position={[-0.25,0,0]} animation="fall" face="ouch" time={t}/><Sister position={[0.35,0,-0.2]} animation="fall" face="fear" time={t}/></group></>
      ),
    },
    {
      cue: "11.press",
      ...cam.push({ on: F(0.9, 1.55, 0), dist: 3.8, to: 3.1, yaw: 0, pitch: 6, fov: 40 }),
      zone: "factory",
      look: "warm-room",
      note: "The labeled jar is under the descending press; blue glass bursts when it strikes.",
      stage: (t, { p }) => (
        <><Machine t={t} jarX={0.9} label jar={p<0.55} down={smooth(Math.min(1,p*1.65))}/><Bits position={F(0.9, 1.15, 0)} t={t-0.5} color="#92eaff" count={18} power={2.1}/></>
      ),
    },
    {
      cue: "11.one",
      ...cam.push({ on: F(0.95, 1.2, 0.35), dist: 3.2, to: 2.5, yaw: 0, pitch: 7, fov: 38 }),
      zone: "factory",
      look: "warm-room",
      note: "One green emerald replaces the jar while the siblings are together, safe but changed.",
      stage: (t, { p }) => (
        <><Machine t={t} jar={false} down={1-smooth(p)} emerald/><Emerald position={F(0.95, 1.18, 0.6)} scale={1.05} turn={t}/><Hero position={F(-0.25, 0, 1.5)} face="frown"/><Sister position={F(-0.7, 0, 1.5)} face="frown"/></>
      ),
    },
  ],
});
