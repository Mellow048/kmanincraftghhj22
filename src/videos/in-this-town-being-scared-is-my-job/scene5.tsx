import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, DEG, Farm, Gary, Kevin, Me, NORTH, NewOne, PLACE, SOUTH, Shake, pop, timing, tw, w } from "./kit";
import { BossBucket, HELD, NEW } from "./scene4";

/** 05 — He tries to scream on purpose. It comes out as "hello". */
const ME = PLACE.me;
const KEV = PLACE.kevin;
const eyes: Vec3 = [KEV[0], 1.3, KEV[2]];

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Hello",
  shots: [
    {
      cue: "5.tried",
      ...cam.push({ on: [0, 1.5, 0.4], dist: 4.4, to: 3.8, yaw: 22, pitch: 5, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "Over Kevin's shoulder. The villager squares up to the glass, strains at his sleeves, takes the biggest breath of his life and throws his head back.",
      stage: (t, { dur }) => (
        <>
          <Farm />
          <Me position={ME} rotationY={SOUTH} lookAt={t < dur * 0.45 ? eyes : undefined} strain={tw(t, 0.1, dur * 0.5)} nod={t > dur * 0.45 ? -0.5 * tw(t, dur * 0.45, dur * 0.7) : 0} lean={-0.1 * tw(t, dur * 0.45, dur * 0.7)} />
          <Kevin tagTurn={0.35} />
        </>
      ),
    },
    {
      cue: "5.hello",
      ...cam.push({ on: [0.1, 1.4, 1.15], dist: 5.4, to: 4.9, yaw: 56, pitch: 6, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "From the side. It comes out as a small polite bubble: HELLO. Kevin waves back.",
      stage: (t) => {
        const say = w("5.hello", "hello") - 0.1;
        return (
          <>
            <Farm />
            <Me position={ME} rotationY={SOUTH} lookAt={eyes} hmm={t > say && t < say + 0.5 ? 0.6 : 0} />
            <Bubble text="HELLO" position={[0.2, 2.85, 1.15]} rotationY={56 * DEG} scale={0.55 * pop(t, say, 0.14)} tail={1} />
            <Kevin tagTurn={56 * DEG} lookAt={[0, 1.6, 0.25]} wave={t > say + 0.25 ? 1 : 0} mood="happy" />
          </>
        );
      },
    },
    {
      cue: "5.eep",
      ...cam.push({ on: [-2.3, 1.5, 0.3], dist: 4.6, to: 4.1, yaw: -10, pitch: 5, fov: 44 }),
      zone: "farm",
      look: "overworld-day",
      note: "Gary. He throws his head back and gives it everything he has left: a bubble the size of a button. EEP.",
      stage: (t) => {
        const say = w("5.eep", "eep") - 0.1;
        return (
          <>
            <Farm />
            <Gary position={PLACE.gary} rotationY={SOUTH} nod={t > say - 0.4 && t < say + 0.4 ? -0.5 : 0.15} />
            <Bubble text="EEP" position={[-2.15, 2.3, 1.15]} scale={0.4 * pop(t, say, 0.14)} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "5.lift",
      ...cam.push({ on: [0.45, 1.65, 2.5], dist: 5.4, to: 4.8, yaw: 28, pitch: 4, fov: 46 }),
      zone: "farm",
      look: "overworld-day",
      note: "The ledge, from outside. The boss lifts the bucket up over the boat, and tips it a little. Kevin, underneath, looks up at the bottom of it. The new one stands by and watches nothing.",
      stage: (t, { dur }) => {
        const k = tw(t, 0.1, dur * 0.8);
        return (
          <>
            <Farm />
            <Me position={ME} rotationY={SOUTH} lookAt={[HELD[0], 2.2, HELD[2]]} />
            <BossBucket t={t} lift={k} face="frown" />
            <Kevin tagTurn={0.5} lookAt={[HELD[0] - 0.2, 1.3 + k * 1.2, HELD[2]]} mood="scared" />
            <NewOne position={NEW} rotationY={NORTH + 0.2} />
          </>
        );
      },
    },
    {
      cue: "5.kevin",
      ...cam.push({ on: [-0.12, 1.45, KEV[2]], dist: 3.0, to: 2.7, yaw: 154, pitch: 0, fov: 48 }),
      zone: "farm",
      look: "overworld-day",
      note: "Kevin, through the glass, with the bucket hanging over his head. He is not looking at the bucket. He is looking at us. A small bubble: URR.",
      stage: (t) => {
        const say = w("5.kevin", "urr") - 0.1;
        return (
          <>
            <Farm />
            <BossBucket t={t} lift={1} face="frown" />
            <Kevin tagTurn={154 * DEG} lookAt={[0.9, 1.6, 0.3]} mood="sad" wave={t > say ? 0.6 : 0} />
            <Bubble text="URR" position={[-0.36, 1.5, KEV[2] - 0.2]} rotationY={154 * DEG} scale={0.36 * pop(t, say, 0.14)} tail={1} />
          </>
        );
      },
    },
    {
      cue: "5.bye",
      ...cam.push({ on: [0, 1.5, 0.3], dist: 3.4, to: 2.5, yaw: 12, pitch: 3, fov: 42 }),
      zone: "farm",
      look: "overworld-day",
      note: "The villager, close, behind the glass. He has understood it. His head comes down.",
      stage: (t, { dur }) => (
        <>
          <Farm />
          <Shake t={t} k={0.25 * tw(t, dur * 0.5, dur)}>
            <Me position={ME} rotationY={SOUTH} nod={0.35 * tw(t, 0.3, dur * 0.6)} />
          </Shake>
          <Kevin tag={false} />
        </>
      ),
    },
  ],
});
