import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** The bargain: the actor, camera and action are driven by this beat's narration. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The bargain",
  shots: [
    {
      cue: "4.crops",
      ...cam.top({ on: V(2, 0, 3.0), height: 5.2, to: 4.5, fov: 44 }),
      zone: "village",
      look: "overworld-storm",
      note: "The green village turns to a patch of brown, fallen crops, while the teller stands at its edge.",
      stage: (t, { p }) => (
        <><DeadCrops position={V(2, 0.05, 3)}/><Hero position={V(0.75, 0, 4.4)} animation="lookAround" face="frown" time={t}/></>
      ),
    },
    {
      cue: "4.mom",
      ...cam.push({ on: S(0, 1.2, -0.15), dist: 4.6, to: 4, yaw: 0, pitch: 6, fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "Mom gives up one blue memory for a basket while the owner watches from behind the counter.",
      stage: (t, { p }) => (
        <><Mom position={S(-0.55, 0, 0.45)} animation="reach" face="uneasy" time={t}/><Owner position={S(0.6, 0, -1.9)}/><Basket position={S(0.1, 0, 0.3)} scale={0.8}/><MemoryStream from={S(-0.55, 1.5, 0.4)} to={S(0.6, 1.65, -0.9)} p={p} count={5}/></>
      ),
    },
    {
      cue: "4.offer",
      ...cam.push({ on: S(0, 1.2, -0.1), dist: 4.7, to: 4.0, yaw: 0, pitch: 8, fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "The basket sits between the boy and the owner; his sister stands behind him when the price is named.",
      stage: (t, { p }) => (
        <><Hero position={S(-0.42, 0, 0.5)} animation="lookAround" face="uneasy" time={t}/><Sister position={S(-0.75, 0, -0.1)} face="frown"/><Owner position={S(0.45, 0, -1.9)}/><Basket position={S(0.0, 0, 0.8)} scale={0.75}/></>
      ),
    },
    {
      cue: "4.no",
      ...cam.push({ on: S(0, 1.2, 0.4), dist: 2.5, to: 2, yaw: 0, pitch: 3, fov: 38 }),
      zone: "shop",
      look: "warm-room",
      note: "His first answer is a close, visible shake of the head, not the shopkeeper or the food.",
      stage: (t, { p }) => (
        <Hero position={S(0, 0, 0.4)} animation="idle" face="frown" headYaw={0.5*Math.sin(t*8)} time={t}/>
      ),
    },
    {
      cue: "4.okay",
      ...cam.push({ on: S(0, 1.06, 0.5), dist: 2.9, to: 2.3, yaw: -7, pitch: 3, fov: 38 }),
      zone: "shop",
      look: "warm-room",
      note: "The sister offers reassurance; her hand reaches toward him and the scarf stays in the frame.",
      stage: (t, { p }) => (
        <><Sister position={S(0, 0, 0.5)} animation="reach" face="smile" time={t}/><Hero position={S(0.38, 0, -0.5)} face="uneasy"/></>
      ),
    },
    {
      cue: "4.yes",
      ...cam.push({ on: S(0, 1.2, 0.5), dist: 2.4, to: 1.9, yaw: 4, pitch: 3, fov: 36 }),
      zone: "shop",
      look: "warm-room",
      note: "A small nod from the boy makes the irreversible decision visible.",
      stage: (t, { p }) => (
        <Hero position={S(0, 0, 0.5)} animation="idle" face="uneasy" headPitch={0.32*smooth(p)} time={t}/>
      ),
    },
  ],
});
