import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** The town pays: the actor, camera and action are driven by this beat's narration. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The town pays",
  shots: [
    {
      cue: "2.bread",
      ...cam.push({ on: S(0, 1.25, -0.3), dist: 2.8, to: 2.2, yaw: 12, pitch: 12, fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "A loaf and a blue cube trade places on the counter; a happy memory buys something ordinary.",
      stage: (t, { p }) => (
        <><Bread position={S(-0.15, 1.22, -0.3)} /><Memory position={S(0.45, 1.55, -0.5)} scale={0.55} turn={t}/><Owner position={S(0, 0, -2.0)} /><Hero position={S(-0.65, 0, 0.45)} animation="reach" face="smile" time={t}/></>
      ),
    },
    {
      cue: "2.boots",
      ...cam.push({ on: S(0, 1.4, -0.8), dist: 2.8, to: 2.3, yaw: -10, pitch: 12, fov: 40 }),
      zone: "shop",
      look: "warm-room",
      note: "New boots sit exactly where the loaf was; a birthday has become the price.",
      stage: (t, { p }) => (
        <><Boots position={S(0, 1.2, -0.8)} /><Owner position={S(0.35, 0, -2)} lookAt={S(0, 1.2, 0)} /><Memory position={S(-0.45, 1.55, -0.8)} scale={0.5} turn={t}/></>
      ),
    },
    {
      cue: "2.cubes",
      ...cam.push({ on: S(0, 1.5, 0), dist: 3.9, to: 3.4, yaw: 0, pitch: 5, fov: 42 }),
      zone: "shop",
      look: "warm-room",
      note: "A memory leaves a customer in a stream of blue cubes and travels toward the jar, not a generic glow.",
      stage: (t, { p }) => (
        <><Hero position={S(-0.65, 0, 0.5)} animation="scared" face="wow" time={t}/><Owner position={S(0.5, 0, -1.9)} /><Jar position={S(0.55, 1.2, -0.8)} scale={0.75}/><MemoryStream from={S(-0.65, 1.27, 0.5)} to={S(0.55, 1.65, -0.8)} p={p}/></>
      ),
    },
    {
      cue: "2.jars",
      ...cam.push({ on: S(0, 1.75, -0.8), dist: 2.8, to: 2.3, yaw: 0, pitch: 3, fov: 38 }),
      zone: "shop",
      look: "warm-room",
      note: "A tight insert of the glass and lid makes the locked-away memory readable on a phone.",
      stage: (t, { p }) => (
        <><Jar position={S(0, 1.2, -0.8)} /><Owner position={S(0, 0, -1.9)} nod={0.12*Math.sin(t*2)} /></>
      ),
    },
    {
      cue: "2.ladder",
      ...cam.push({ on: V(9, 1.6, -3.5), dist: 5.4, to: 4.7, yaw: -15, pitch: 6, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "The man, the ladder and a blue memory share one frame, establishing his bad bargain.",
      stage: (t, { p }) => (
        <><Ladder position={V(8.6, 0, -4.0)} tilt={-0.13}/><Mom position={V(9.5, 0, -2.5)} animation="reach" face="smile" time={t}/><Memory position={V(9.2, 1.4 + 0.1*Math.sin(t*3), -2.7)} scale={0.6} turn={t}/></>
      ),
    },
    {
      cue: "2.fell",
      ...cam.push({ on: V(9, 1.55, -3.4), dist: 5, to: 4.4, yaw: 0, pitch: 3, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "He falls from the roof again, with limbs flailing and a visible landing beside the ladder.",
      stage: (t, { p }) => (
        <><Ladder position={V(8.5, 0, -4.0)} tilt={-0.13}/><Mom position={V(9, 3.0*(1-smooth(p)), -3.0)} animation="fall" face="ouch" time={t}/><Bits position={V(9, 0.12, -3)} t={t-0.72} color="#beaa8a" count={10} power={1.5}/></>
      ),
    },
  ],
});
