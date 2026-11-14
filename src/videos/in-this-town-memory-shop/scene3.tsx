import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** Yellow scarf and paper boats: the actor, camera and action are driven by this beat's narration. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Yellow scarf and paper boats",
  shots: [
    {
      cue: "3.scarf",
      ...cam.push({ on: R(0, 1.05, 2.7), dist: 2.8, to: 2.2, yaw: 0, pitch: 5, fov: 38 }),
      zone: "river",
      look: "overworld-day",
      note: "Meet the little sister close enough that her yellow scarf will be recognizable later.",
      stage: (t, { p }) => (
        <Sister position={R(0, 0, 2.7)} animation="wave" face="smile" time={t} />
      ),
    },
    {
      cue: "3.boats",
      ...cam.push({ on: R(0, 0.7, 1.3), dist: 5.7, to: 5.0, yaw: 0, pitch: 18, fov: 44 }),
      zone: "river",
      look: "overworld-day",
      note: "Both children lean toward two paper boats moving down the same bright river.",
      stage: (t, { p }) => (
        <><Hero position={R(-0.55, 0, 2.6)} animation="leanOver" face="grin" time={t}/><Sister position={R(0.55, 0, 2.5)} animation="leanOver" face="laugh" time={t}/><Boat position={R(-0.65+0.7*p, 0.03, 0.25)} scale={0.7}/><Boat position={R(0.35+0.7*p, 0.03, -0.55)} scale={0.7}/></>
      ),
    },
    {
      cue: "3.mine",
      ...cam.top({ on: R(0, 0, 0), height: 5.4, to: 4.8, fov: 46 }),
      zone: "river",
      look: "overworld-day",
      note: "Seen from above, his paper boat sinks while hers stays afloat and travels ahead.",
      stage: (t, { p }) => (
        <><Boat position={R(-0.55, 0.05-0.2*smooth(p), 0.4)} scale={0.8} tilt={0.65*p}/><Boat position={R(0.55+0.35*p, 0.05, -0.4)} scale={0.8}/></>
      ),
    },
    {
      cue: "3.bed",
      ...cam.push({ on: B(0, 0.7, -0.4), dist: 4.1, to: 3.6, yaw: 12, pitch: 18, fov: 42 }),
      zone: "room",
      look: "warm-room",
      note: "Beside the bed she sets down a paper boat: their nightly ritual is a physical action.",
      stage: (t, { p }) => (
        <><BedBox position={B(-0.7, 0, -1.0)}/><Sister position={B(0.55, 0, -0.1)} animation="reach" face="smile" time={t}/><Boat position={B(0.12, 0.07, -0.1)} scale={0.55}/></>
      ),
    },
  ],
});
