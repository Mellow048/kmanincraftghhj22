import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** A missing sister: the actor, camera and action are driven by this beat's narration. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "A missing sister",
  shots: [
    {
      cue: "6.gone",
      ...cam.push({ on: B(0, 0.85, 0.5), dist: 4.3, to: 3.7, yaw: 0, pitch: 12, fov: 42 }),
      zone: "room",
      look: "warm-room",
      note: "The next morning the bed has a note, not a sister, and the boy searches the room.",
      stage: (t, { p }) => (
        <><BedBox position={B(-0.7, 0, -1)}/><Hero position={B(0.45, 0, 0.3)} animation="lookAround" face="uneasy" time={t}/><Note position={B(-0.45, 0.7, -0.7)} scale={0.8}/></>
      ),
    },
    {
      cue: "6.note",
      ...cam.top({ on: B(0, 0.55, 0), height: 2.8, to: 2.2, fov: 38 }),
      zone: "room",
      look: "warm-room",
      note: "A close paper note on the bed is the first clue to where the sister went.",
      stage: (t, { p }) => (
        <><BedBox position={B(0, 0, 0)}/><Note position={B(0, 0.63, 0)} scale={1.1}/></>
      ),
    },
    {
      cue: "6.picture",
      ...cam.push({ on: B(0, 1.2, 0.4), dist: 4.0, to: 3.4, yaw: 0, pitch: 5, fov: 40 }),
      zone: "room",
      look: "warm-room",
      note: "Mom holds up a simple portrait showing the yellow scarf; he studies it without recognition.",
      stage: (t, { p }) => (
        <><Mom position={B(0, 0, -0.5)} animation="hold" face="frown" time={t}/><Portrait position={B(0, 1.05, 0.15)} scale={1.1}/><Hero position={B(0.5, 0, 0.8)} animation="lookAround" face="uneasy"/></>
      ),
    },
    {
      cue: "6.looking",
      ...cam.truck({ on: V(0, 1.1, 1.4), dist: 3.8, yaw: 0, pitch: 4, fov: 40, by: [1.3, 0, 0] }),
      zone: "village",
      look: "overworld-day",
      note: "He crosses the village searching anyway, with actual ground travel and feet tied to distance.",
      stage: (t, { p }) => (
        <Hero position={V(-0.65+1.3*p, 0, 1.4)} rotationY={Math.PI/2} animation="run" animDistance={1.3*p} face="brave"/>
      ),
    },
    {
      cue: "6.lie",
      ...cam.push({ on: S(0, 1.55, -1.9), dist: 2.8, to: 2.3, yaw: 0, pitch: 5, fov: 38 }),
      zone: "shop",
      look: "warm-room",
      note: "The owner shakes his head behind the counter while the boy questions him.",
      stage: (t, { p }) => (
        <><Owner position={S(0, 0, -1.9)} turn={0.35*Math.sin(t*5)} /><Hero position={S(0.5, 0, 0.5)} animation="point" face="uneasy" time={t}/></>
      ),
    },
    {
      cue: "6.door",
      ...cam.top({ on: V(0, 0, -4.25), height: 3.4, to: 2.8, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "A little paper boat trapped at the shop door contradicts the owner; the boy points down at it.",
      stage: (t, { p }) => (
        <><Boat position={V(0, 0.04, -4.28)} scale={0.7}/><Hero position={V(0.55, 0, -3.35)} animation="point" face="wow" time={t}/></>
      ),
    },
  ],
});
