import { Block, Glow, Sign, cam, storyScene } from "../../engine";
import { Basket, BedBox, Bits, Boat, Boots, Bread, Cart, DeadCrops, Emerald, Hero, IronGolem, Jar, Ladder, Lever, Machine, Memory, MemoryStream, Mom, Note, Owner, Portrait, ScarfTether, Sister, SubscribeSign, Villager, at, jump, mix, smooth, timing } from "./kit";

const V = (x: number,y: number,z: number) => at("village",x,y,z);
const R = (x: number,y: number,z: number) => at("river",x,y,z);
const B = (x: number,y: number,z: number) => at("room",x,y,z);
const S = (x: number,y: number,z: number) => at("shop",x,y,z);
const F = (x: number,y: number,z: number) => at("factory",x,y,z);

/** The cart: the actor, camera and action are driven by this beat's narration. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The cart",
  shots: [
    {
      cue: "7.pipe",
      ...cam.push({ on: V(-3.2, 2, -4.4), dist: 6.2, to: 5.4, yaw: 0, pitch: 5, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "The drainpipe breaks as he climbs: he rises, flails, and begins falling in the same shot.",
      stage: (t, { p }) => (
        <><Hero position={V(-3.2, p < 0.46 ? 1+2*p : 1.92-1.92*(p-0.46)/0.54, -4.3)} animation={p<0.46 ? "reachUp" : "fall"} face={p<0.46 ? "brave" : "wow"} time={t}/><Bits position={V(-3.2, 2.2, -4.4)} t={t-0.5} color="#8fa2a0" count={10} power={1.3}/></>
      ),
    },
    {
      cue: "7.cart",
      ...cam.push({ on: V(-2.1, 0.9, -3.4), dist: 4.4, to: 3.8, yaw: 0, pitch: 10, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "He lands in the potato cart with a burst of loose potatoes rather than disappearing between cuts.",
      stage: (t, { p }) => (
        <><Cart position={V(-2, 0, -3.5)}/><Hero position={V(-2, Math.max(0.55, 2.5-2.5*p), -3.5)} animation="fall" face="ouch" time={t}/><Bits position={V(-2, 1.15, -3.5)} t={t-0.3} color="#b98e58" count={10} power={1.8}/></>
      ),
    },
    {
      cue: "7.sack",
      ...cam.push({ on: V(-2, 1.05, -3.5), dist: 3.5, to: 2.9, yaw: 5, pitch: 8, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "He ducks under a sack in the cart as heavy footsteps approach.",
      stage: (t, { p }) => (
        <><Cart position={V(-2, 0, -3.5)}/><Hero position={V(-2, 0.55, -3.5)} animation="crouch" face="fear" time={t}/><Block position={V(-1.85, 1.33-0.2*smooth(p), -3.25)} size={[1.0, 0.35, 0.75]} color="#b59a75"/></>
      ),
    },
    {
      cue: "7.golem",
      ...cam.truck({ on: V(-3.0, 1.35, -3.3), dist: 8.5, yaw: 0, pitch: 6, fov: 46, by: [1.4, 0, 0] }),
      zone: "village",
      look: "overworld-day",
      note: "The iron golem actually pushes the cart toward the shop, its steps driving the movement.",
      stage: (t, { p }) => (
        <><Cart position={V(-2.4+1.4*p, 0, -3.5)}/><IronGolem position={V(-3.8+1.4*p, 0, -3.5)} rotationY={Math.PI/2} walk={1.4*p} armR={-1.2} armL={-1.2}/></>
      ),
    },
  ],
});
