import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** The truth: the actor, camera and action are driven by this beat's narration. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The truth",
  shots: [
    {
      cue: "9.truth",
      ...cam.push({ on: F(-1.1, 1.2, 1.4), dist: 3.4, to: 2.7, yaw: -8, pitch: 3, fov: 38 }),
      zone: "factory",
      look: "warm-room",
      note: "His shocked face is framed against the machinery: the jars were never safe.",
      stage: (t, { p }) => (
        <><Hero position={F(-1.1, 0, 1.4)} animation="lookAround" face="wow" time={t}/><Machine t={t} jarX={-0.3}/></>
      ),
    },
    {
      cue: "9.crush",
      ...cam.push({ on: F(0.9, 1.6, 0), dist: 4.0, to: 3.2, yaw: 0, pitch: 7, fov: 40 }),
      zone: "factory",
      look: "warm-room",
      note: "One blue jar is crushed and replaced by one green emerald, making the secret visual before the explanation ends.",
      stage: (t, { p }) => (
        <><Machine t={t} down={p<0.65 ? smooth(p/0.45) : 1-smooth((p-0.65)/0.35)} jar={p<0.5} jarX={0.9} emerald={p>=0.5}/><Bits position={F(0.9, 1.2, 0)} t={t-0.55} color="#7adfff" count={12} power={1.8}/></>
      ),
    },
  ],
});
