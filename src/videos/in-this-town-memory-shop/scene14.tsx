import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** A new memory: the actor, camera and action are driven by this beat's narration. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "A new memory",
  shots: [
    {
      cue: "14.ask",
      ...cam.push({ on: R(0, 1.05, 2.8), dist: 2.8, to: 2.2, yaw: 0, pitch: 4, fov: 38 }),
      zone: "river",
      look: "overworld-day",
      note: "Close on her face and yellow scarf as she asks whether he remembers.",
      stage: (t, { p }) => (
        <Sister position={R(0,0,2.8)} animation="talk" face="uneasy" time={t}/>
      ),
    },
    {
      cue: "14.shook",
      ...cam.push({ on: R(0, 1.2, 2.8), dist: 2.5, to: 2, yaw: 0, pitch: 3, fov: 36 }),
      zone: "river",
      look: "overworld-day",
      note: "His head shakes gently: the rescue did not bring his memories back.",
      stage: (t, { p }) => (
        <Hero position={R(0,0,2.8)} animation="idle" face="frown" headYaw={0.38*Math.sin(t*8)} time={t}/>
      ),
    },
    {
      cue: "14.teach",
      ...cam.push({ on: R(0, 1.05, 2.5), dist: 4.3, to: 3.6, yaw: 0, pitch: 6, fov: 42 }),
      zone: "river",
      look: "overworld-day",
      note: "She offers a fresh sheet of paper and he reaches for it: a new memory, not a restoration.",
      stage: (t, { p }) => (
        <><Hero position={R(0.4,0,2.8)} animation="reach" face="uneasy" time={t}/><Sister position={R(-0.4,0,2.5)} animation="reach" face="smile" time={t}/><Note position={R(mix(-0.2,0.25,p),0.85,2.9)} scale={0.55}/></>
      ),
    },
    {
      cue: "14.fold",
      ...cam.push({ on: R(0, 0.7, 1.4), dist: 5.2, to: 4.5, yaw: 0, pitch: 18, fov: 42 }),
      zone: "river",
      look: "overworld-day",
      note: "The children set two newly folded boats on the water together.",
      stage: (t, { p }) => (
        <><Hero position={R(-0.5,0,2.6)} animation="leanOver" face="smile" time={t}/><Sister position={R(0.5,0,2.5)} animation="leanOver" face="smile" time={t}/><Boat position={R(-0.5, mix(0.65,0.05,p), mix(2.4,0.55,p))} scale={0.7}/><Boat position={R(0.5, mix(0.65,0.05,p), mix(2.4,-0.25,p))} scale={0.7}/></>
      ),
    },
    {
      cue: "14.result",
      ...cam.top({ on: R(0,0,0), height: 5.4, to: 4.8, fov: 46 }),
      zone: "river",
      look: "overworld-day",
      note: "His boat sinks again while hers floats; the repeated image pays off their old game.",
      stage: (t, { p }) => (
        <><Boat position={R(-0.55,0.05-0.2*smooth(p),0.45)} scale={0.8} tilt={0.7*p}/><Boat position={R(0.55+0.35*p,0.05,-0.45)} scale={0.8}/></>
      ),
    },
    {
      cue: "14.laugh",
      ...cam.push({ on: R(0, 1.1, 2.7), dist: 4.4, to: 3.7, yaw: 0, pitch: 5, fov: 40 }),
      zone: "river",
      look: "overworld-day",
      note: "A new shared laugh, not a lecture, ends the emotional story.",
      stage: (t, { p }) => (
        <><Hero position={R(-0.42,0,2.8)} animation="laugh" face="laugh" time={t}/><Sister position={R(0.42,0,2.4)} animation="laugh" face="laugh" time={t}/></>
      ),
    },
    {
      cue: "14.sub",
      ...cam.push({ on: R(0, 1.05, 2.7), dist: 4.2, to: 3.7, yaw: 0, pitch: 5, fov: 40 }),
      zone: "river",
      look: "overworld-day",
      note: "The teller holds the subscribe sign beside the paper boat as the river story finishes.",
      stage: (t, { p }) => (
        <><Hero position={R(0,0,2.8)} animation="hold" face="grin" time={t}/><Sister position={R(-0.65,0,2.1)} face="smile"/><SubscribeSign position={R(0,0.9,3.4)} scale={0.7}/><Boat position={R(0.55,0.05,0.3)} scale={0.7}/></>
      ),
    },
  ],
});
