import type React from "react";
import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Bush, Chest, Cow, Crab, EAST, Fill, Gate, Golem, Heap, Hider, IceThrower, Lantern, Mailboxes, NORTH, Penguin, SOUTH, Slip, Stone, Votes, WEST, hop, pop, timing, tw, w } from "./kit";

/** 06 — He comes back, orange, with a chest. It is full of their votes. */
const C: Vec3 = [0, 0, 5.2];
/** Everybody, in a ring round the chest in the middle of the street, under the lantern. */
const Ring: React.FC<{ t: number; happy?: number; cow?: boolean; stone?: boolean; heaps?: boolean; lookUp?: number }> = ({ t, happy = 0, cow = true, stone = true, heaps = false, lookUp = 0 }) => (
  <>
    <Gate open={1} press={1} glow />
    <Lantern position={[-2.3, 0, 6.6]} />
    <Lantern position={[2.3, 0, 3.6]} />
    <Fill at={[0, 3, 3.2]} power={28} reach={10} />
    <Golem position={[0, 0, 6.35]} rotationY={NORTH} t={t} nod={-0.2 * lookUp} />
    {cow ? <Cow position={[-1.45, 0, 5.1]} rotationY={EAST} t={t} wide={happy > 0.5} nod={-0.35 * lookUp} /> : null}
    <IceThrower position={[1.35, 0, 5.5]} rotationY={WEST} t={t} ice={0} nod={-0.4 * lookUp} />
    <Bush position={[1.15, 0, 6.5]} rotationY={-2.6} t={t} soft={happy} />
    {stone ? <Stone position={[-0.45, 0, 3.9]} rotationY={NORTH} t={t} happy={happy} /> : null}
    <Crab position={[-1.35, 0, 4.2]} rotationY={2.3} t={t} wave={happy} />
    <Penguin position={[-1.5, 0, 6.3]} rotationY={2.2} t={t} flap={happy} />
    <Hider position={[2.1, 0, 4.9]} t={t} up={happy} />
    {heaps ? (
      <>
        <Heap position={[1.15, 0, 4.95]} of="ice" n={26} r={0.45} h={0.4} />
        <Heap position={[0.8, 0, 6.0]} of="bush" n={26} r={0.45} h={0.4} />
        <Heap position={[-1.0, 0, 4.6]} of="crab" n={26} r={0.45} h={0.4} />
        <Heap position={[-1.1, 0, 5.9]} of="penguin" n={26} r={0.45} h={0.4} />
        <Heap position={[-0.8, 0, 5.1]} of="cow" n={30} r={0.5} h={0.5} />
      </>
    ) : null}
  </>
);

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The chest",
  shots: [
    {
      cue: "6.press",
      ...cam.push({ on: [0.5, 1.15, 8.2], dist: 5.6, to: 5.0, yaw: 172, pitch: 5, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "Night, the shut gate, one lantern. The grey button on the post goes orange by itself, and a line of warm light opens down the middle of the doors. In front, her head comes up.",
      stage: (t) => {
        const p = tw(t, w("6.press", "pressed") - 0.1, w("6.press", "pressed") + 0.1);
        return (
          <>
            <Gate press={p} open={tw(t, w("6.press", "pressed") + 0.2, w("6.press", "gate") + 0.4) * 0.45} glow />
            <Lantern position={[-2.3, 0, 6.6]} />
            <Fill at={[0, 3, 4.6]} power={24} reach={10} />
            <Cow position={[1.2, 0, 6.8]} rotationY={SOUTH} t={t} nod={0.5 - 0.7 * p} />
          </>
        );
      },
    },
    {
      cue: "6.him",
      ...cam.push({ on: [0, 0.95, 7.6], dist: 3.9, to: 3.3, yaw: 174, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "The doors are open on a warm light, and he walks in through it: small, bright orange, shining, holding a copper chest out in front of him with both arms. He is looking at us. He is very pleased.",
      stage: (t, { dur }) => {
        const k = tw(t, 0, dur);
        return (
          <>
            <Gate open={1} press={1} glow />
            <Lantern position={[-2.3, 0, 6.6]} />
            <Fill at={[0.5, 2.2, 5.2]} power={28} reach={9} />
            <Golem position={[0, 0, 8.9 - k * 1.5]} rotationY={NORTH} t={t} walk={k * 1.5}>
              <Chest position={[0, -0.26, 0.05]} scale={1.2} />
            </Golem>
          </>
        );
      },
    },
    {
      cue: "6.job",
      ...cam.push({ on: [0, 0.9, -1.5], dist: 4.6, to: 4.2, yaw: 0, pitch: 8, fov: 56 }),
      zone: "out",
      look: "warm-room",
      note: "Out there: a player's storeroom, wooden chests stacked up one wall. He walks from a copper chest on the left to a wooden one on the right with a green block held out in front, puts it in, and turns to go back for the next.",
      stage: (t, { dur }) => {
        const k = tw(t, 0.2, dur - 0.6);
        const put = tw(t, dur - 0.6, dur - 0.3);
        return (
          <>
            <Fill at={[0, 2.6, 1.5]} power={16} reach={14} color="#fff0d0" />
            <Chest position={[-1.3, 0, -1.4]} scale={1.3} open={1} />
            <Chest position={[1.3, 0, -1.4]} scale={1.3} wood open={put} />
            <Chest position={[1.45, 0.87, -2.4]} scale={1.5} wood />
            <Chest position={[0.5, 0, -2.4]} scale={1.5} wood />
            <Chest position={[-0.6, 0, -2.4]} scale={1.5} wood />
            <Chest position={[-0.05, 0.87, -2.4]} scale={1.5} wood />
            <Golem position={[-0.6 + k * 1.1, 0, -0.9]} rotationY={put > 0.9 ? WEST : EAST} t={t} walk={k * 2.2}>
              {put > 0.5 ? null : <Block position={[0, 0.02, 0]} size={[0.26, 0.26, 0.26]} color="#3fd07a" emissive="#3fd07a" emissiveIntensity={0.3} />}
            </Golem>
          </>
        );
      },
    },
    {
      cue: "6.for",
      ...cam.push({ on: [0, 0.6, 5.1], dist: 6.2, to: 5.8, yaw: 150, pitch: 30, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "From above, in the lantern light: the copper chest on the path, shut, and all of them in a ring round it. Nobody touches it. Even the barrel has come.",
      stage: (t) => (
        <>
          <Ring t={t} />
          <Mailboxes />
          <Chest position={C} rotationY={NORTH} />
        </>
      ),
    },
    {
      cue: "6.open",
      ...cam.push({ on: [0, 1.5, 5.2], dist: 5.0, to: 5.4, yaw: 160, pitch: -4, fov: 50 }),
      zone: "town",
      look: "overworld-night",
      note: "The lid goes up and paper comes out of it like a fountain: hundreds of little white slips, up into the dark and down over all of them. Every head tips back.",
      stage: (t) => {
        const o = tw(t, 0.1, 0.5);
        return (
          <>
            <Ring t={t} lookUp={o} />
            <Chest position={C} rotationY={NORTH} open={o} full />
            <Votes position={C} t={t} k={tw(t, 0.35, 1.5)} count={110} spread={2.6} />
          </>
        );
      },
    },
    {
      cue: "6.votes",
      ...cam.push({ on: [-0.75, 1.0, 5.15], dist: 2.9, to: 2.6, yaw: 68, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "One slip comes down in front of her nose and stops there. On it: a small yellow square with a flower, and a green tick. A vote. Hers. Her eyes cross to read it.",
      stage: (t) => {
        const land = tw(t, 0, 0.6);
        return (
          <>
            <Lantern position={[-2.3, 0, 6.6]} />
            <Fill at={[0.6, 1.6, 6.2]} power={28} reach={8} />
            <Cow position={[-1.45, 0, 5.1]} rotationY={EAST} t={t} wide nod={0.15 * land} />
            <Slip position={[-0.3, 0.78 + (1 - land) * 1.6, 5.15]} rotation={[0, 68 * (Math.PI / 180), 0.15 * Math.sin(t * 3)]} scale={2.3} of="cow" />
            <Votes position={[-0.4, 0, 4.4]} t={t} count={26} spread={2.2} />
          </>
        );
      },
    },
    {
      cue: "6.mine",
      ...cam.push({ on: [0.0, 1.2, 5.0], dist: 6.2, to: 5.7, yaw: 166, pitch: 6, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "Her next to her pile. It is taller than she is: yellow slip after yellow slip, still coming down. She looks up at the top of it, and then, on 'picked the cow', at us.",
      stage: (t) => {
        const us = tw(t, w("6.mine", "picked") - 0.1, w("6.mine", "picked") + 0.2);
        const grow = tw(t, 0, 2.4);
        return (
          <>
            <Gate open={1} press={1} glow />
            <Lantern position={[-2.3, 0, 6.6]} />
            <Lantern position={[2.3, 0, 3.6]} />
            <Fill at={[0, 3, 2.6]} power={32} reach={10} />
            <Cow position={[-0.95, 0, 5.3]} rotationY={NORTH - 0.5} t={t} wide look={0.9 * (1 - us)} nod={-0.4 * (1 - us)} />
            <Block position={[0.75, 0.6 * grow, 5.0]} size={[1.0, 1.2 * grow + 0.02, 0.9]} color="#f6f1e2" />
            <Block position={[0.75, 1.2 * grow + 0.3 * grow, 5.0]} size={[0.66, 0.6 * grow + 0.02, 0.6]} color="#f6f1e2" />
            <Heap position={[0.75, 1.8 * grow, 5.0]} of="cow" n={24} r={0.42} h={0.35} />
            <Heap position={[0.75, 1.2 * grow, 5.0]} of="cow" n={30} r={0.6} h={0.2} />
            <Heap position={[0.75, 0, 5.0]} of="cow" n={60} r={1.0} h={0.3} />
            <Votes position={[0.75, 1.0, 5.0]} t={t} count={40} spread={1.1} of="cow" />
          </>
        );
      },
    },
    {
      cue: "6.lost",
      ...cam.push({ on: [0, 0.7, 5.0], dist: 6.4, to: 6.0, yaw: 150, pitch: 28, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "The ring again from above, and now each of them has a pile of his own colour in front of him and is reading. The bush has stopped frowning. Two eyes are up over the barrel.",
      stage: (t) => (
        <>
          <Ring t={t} happy={tw(t, 0.2, 0.8)} heaps />
          <Chest position={C} rotationY={NORTH} open={1} full />
          <Votes position={C} t={t} count={50} spread={2.8} />
        </>
      ),
    },
    {
      cue: "6.one",
      ...cam.push({ on: [-1.15, 1.0, 5.1], dist: 2.9, to: 2.7, yaw: 100, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "Close on her, a slip stuck to her nose. She says it to us like something she has only just understood: they could only pick one.",
      stage: (t) => (
        <>
          <Lantern position={[-2.3, 0, 6.6]} />
          <Fill at={[0.8, 1.6, 5.6]} power={28} reach={8} />
          <Cow position={[-1.45, 0, 5.1]} rotationY={EAST} t={t} look={0.15}>
            <Slip position={[0.12, -0.1, 0.53]} rotation={[0, 0, 0.3]} scale={0.8} of="cow" />
          </Cow>
          <Votes position={[-0.8, 0, 4.2]} t={t} count={20} spread={2} />
        </>
      ),
    },
    {
      cue: "6.hold",
      ...cam.push({ on: [-0.75, 0.95, 4.1], dist: 3.5, to: 3.1, yaw: 168, pitch: 4, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "The little stone one, arms out, under a stack of paper twice his height. The others keep putting more on. His eyes are two happy curves. He is not going to put it down.",
      stage: (t) => {
        const n = 3 + Math.floor(tw(t, 0.2, 2.4) * 5);
        return (
          <>
            <Lantern position={[-2.3, 0, 5.4]} />
            <Fill at={[-0.2, 1.8, 2.4]} power={30} reach={8} />
            <Stone position={[-0.75, hop(t, w("6.hold", "happier") - 0.1, 0.1, 0.3), 4.1]} rotationY={NORTH + 0.25} t={t} happy={1}>
              {Array.from({ length: n }, (_, i) => (
                <group key={i} position={[Math.sin(i * 2.1) * 0.03, 0.12 + i * 0.2, 0]} rotation={[0, Math.sin(i * 1.7) * 0.25, 0]} scale={pop(t, i < 3 ? -1 : 0.2 + (i - 3) * 0.44, 0.18)}>
                  <Block size={[0.46, 0.19, 0.36]} color="#f6f1e2" />
                  <Block position={[0, 0, 0.181]} size={[0.3, 0.05, 0.01]} color={["#f2c81e", "#7fb4e0", "#4f7a2f", "#4a78d0", "#8a8f86"][i % 5]} castShadow={false} />
                </group>
              ))}
            </Stone>
            <Votes position={[-0.2, 0, 4.6]} t={t} count={24} spread={2.2} />
          </>
        );
      },
    },
    {
      cue: "6.left",
      ...cam.push({ on: [2.45, 1.0, 7.6], dist: 3.5, to: 3.2, yaw: -74, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-night",
      note: "The post by the gate again, at night. He looks back up the street once, then lifts his arm and presses the button, the way he pressed it the first time. He did not have to. The gate was open.",
      stage: (t) => {
        const p = tw(t, w("6.left", "pressed") - 0.2, w("6.left", "pressed") + 0.05);
        const back = 1 - tw(t, 0.6, 1.0);
        return (
          <>
            <Gate open={1} press={p} glow />
            <Lantern position={[1.2, 0, 6.2]} />
            <Fill at={[1.2, 1.8, 8.3]} power={24} reach={7} />
            <Golem position={[2.5, 0, 7.18]} rotationY={SOUTH} t={t} press={p} look={-1.6 * back} />
          </>
        );
      },
    },
  ],
});
