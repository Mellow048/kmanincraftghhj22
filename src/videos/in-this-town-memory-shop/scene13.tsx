import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** The town helps: the actor, camera and action are driven by this beat's narration. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "The town helps",
  shots: [
    {
      cue: "13.town",
      ...cam.push({ on: V(0, 1.35, 0.7), dist: 6, to: 5.2, yaw: 0, pitch: 5, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "The town gathers in front of the shop as its blue memories return.",
      stage: (t, { p }) => (
        <><Hero position={V(0,0,1.2)} face="wow"/><Owner position={V(0,0,-1.0)} /><Villager position={V(-0.9,0,-0.1)} robe="#8a6a3a"/><Villager position={V(0.9,0,-0.5)} robe="#3f5f9a"/>{[-0.9,0,0.9].map((x,i)=><Memory key={x} position={V(x,1.6+0.5*p,-0.1)} scale={0.45} turn={t+i}/>)}</>
      ),
    },
    {
      cue: "13.food",
      ...cam.push({ on: V(0, 1.0, 1), dist: 4.8, to: 4.1, yaw: 0, pitch: 8, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "Neighbours bring a full basket to the family, answering the hunger at the start.",
      stage: (t, { p }) => (
        <><Basket position={V(0,0,1)} /><Hero position={V(-0.5,0,0.15)} face="smile"/><Sister position={V(0.45,0,0.0)} face="smile"/><Mom position={V(0,0,-1.1)} face="smile"/><Villager position={V(0.7,0,-1.4)} robe="#3f5f9a"/></>
      ),
    },
    {
      cue: "13.river",
      ...cam.truck({ on: R(0, 1.0, 3), dist: 5.2, yaw: 0, pitch: 5, fov: 42, by: [0.8, 0, 0] }),
      zone: "river",
      look: "overworld-day",
      note: "The two children walk together back to their river, their steps moving with the ground.",
      stage: (t, { p }) => (
        <><Hero position={R(-0.45+0.8*p,0,3)} rotationY={Math.PI/2} animation="walk" animDistance={0.8*p} face="uneasy"/><Sister position={R(0.45+0.8*p,0,2.5)} rotationY={Math.PI/2} animation="walk" animDistance={0.8*p} face="smile"/></>
      ),
    },
  ],
});
