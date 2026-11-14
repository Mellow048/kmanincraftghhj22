import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** The jars break: the actor, camera and action are driven by this beat's narration. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "The jars break",
  shots: [
    {
      cue: "12.stairs",
      ...cam.truck({ on: F(-3.0, 1.6, 1), dist: 6, yaw: 0, pitch: 3, fov: 44, by: [0.9, 0, 0] }),
      zone: "factory",
      look: "warm-room",
      note: "The golem comes down the steps with heavy jointed strides, taking up the full height of the frame.",
      stage: (t, { p }) => (
        <><Machine t={t}/><IronGolem position={F(-3.8+0.9*p, 0, 1.0)} rotationY={Math.PI/2} walk={0.9*p}/></>
      ),
    },
    {
      cue: "12.lever",
      ...cam.push({ on: F(2.2, 1.0, 1), dist: 4.6, to: 4.0, yaw: 0, pitch: 7, fov: 42 }),
      zone: "factory",
      look: "warm-room",
      note: "The boy reaches out and physically throws the red lever; the gears stop.",
      stage: (t, { p }) => (
        <><Machine t={t} stopped={p>0.65}/><Lever position={F(2.5, 0, 1)} pulled={smooth(p)}/><Hero position={F(1.9, 0, 1.4)} animation="reach" face="brave" time={t}/></>
      ),
    },
    {
      cue: "12.feet",
      ...cam.push({ on: F(0, 1.1, 1), dist: 6, to: 5.3, yaw: 0, pitch: 5, fov: 44 }),
      zone: "factory",
      look: "warm-room",
      note: "Jars roll under the golem; its body tips from upright to the floor around its feet.",
      stage: (t, { p }) => (
        <><Machine t={t} stopped jar={false}/><Jar position={F(-0.4+0.8*p, 0.05, 1.2)} scale={0.65} tilt={p*3}/><Jar position={F(0.4+0.6*p, 0.05, 1.5)} scale={0.65} tilt={p*2.8}/><group position={F(-0.4,0,0.8)} rotation={[0,0,-1.25*smooth(p)]}><IronGolem walk={0.8*p} armR={-1.0} armL={-0.6}/></group></>
      ),
    },
    {
      cue: "12.free",
      ...cam.push({ on: F(0, 1.5, 0.5), dist: 5, to: 4.3, yaw: 0, pitch: 4, fov: 44 }),
      zone: "factory",
      look: "warm-room",
      note: "Glass bursts and a cloud of blue memory cubes rises out toward the town.",
      stage: (t, { p }) => (
        <><Machine t={t} stopped jar={false}/><Bits position={F(0,0.7,0.8)} t={t} color="#a6f4ff" count={18} power={2}/>{Array.from({length:9},(_,i)=><Memory key={i} position={F((i-4)*0.3, 0.7+1.4*p+(i%3)*0.2, 0.6)} scale={0.45} turn={t+i} glow={false}/>)}</>
      ),
    },
  ],
});
