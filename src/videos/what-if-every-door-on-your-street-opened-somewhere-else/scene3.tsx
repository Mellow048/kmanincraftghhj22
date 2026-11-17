import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import { Hero, Mum, H, K, SubscribeSign, NORTH, EAST, timing, wordAt, pop, ramp } from "./kit";

/**
 * SCENE 3 — "It was my room". The tally that outgrew his, his own bedroom seen from the outside, and his
 * mother in the kitchen, sitting down.
 */

const TALLY_COUNT = wordAt("11.count", "tally");
const ROOM = wordAt("11.room", "room");
const MUM_SIT = wordAt("12.sat", "sitting");
const SUB = wordAt("12.sub", "subscribe");

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "It was my room",
  shots: [
    {
      // Past the doorway of the hall and into the room the stuck door hides: the tally, and it is not his.
      cue: "11.count",
      // THIRTY-ONE MARKS, not five. This shot used to draw its own row of blocks five to a hand-span, half a metre
      // out from the wall and drifting into the room; the world already has a `Tally` that puts marks flat on the
      // plaster, five to a group with the fifth struck across, and this count is the difference between the two
      // rooms. Same wall, same place, forty-one marks against his twelve.
      ...cam.push({ on: H(0.25, 1.10, 7.96), dist: 2.30, to: 2.00, yaw: 180, pitch: 3, fov: 54 }),
      zone: "hisroom",
      look: "overworld-night",
      note: "The tally on the far wall, longer than his by a hand he does not know: five, ten, twenty, more than he has ever cut.",
      stage: () => (
        <>
          <Hero position={H(0.10, 0, 6.70)} rotationY={NORTH} animation="idle" face="fear" />
        </>
      ),
    },
    {
      // THROUGH HIS OWN DOORWAY, from the hall: it is his bedroom, and he is standing in it.
      cue: "11.room",
      ...cam.push({ on: H(0.10, 1.30, 6.30), dist: 2.60, to: 2.20, yaw: 180, pitch: 3, fov: 56 }),
      zone: "hisroom",
      look: "overworld-night",
      note: "His own bedroom, seen from the wrong side of his own door: the bed, the window, the tally, and him small in the middle of it.",
      stage: (t) => (
        <>
          <Hero position={H(0.10, 0, 6.80)} rotationY={NORTH} animation="idle" face="fear" />
          <Block size={[1.16, 2.3, 0.05]} position={H(0.10, 1.15, 5.60)} color="#1a1614" opacity={0.2} transparent castShadow={false} />
          <Block size={[1.5, 0.02, 1.2]} position={H(0.2, 0.02, 6.50)} color="#a9c6ff" emissive="#a9c6ff" emissiveIntensity={0.2 * pop(t, ROOM)} castShadow={false} />
        </>
      ),
    },
    {
      // HOME, and MUM, sitting down in the kitchen.
      cue: "12.mum",
      ...cam.push({ on: K(0.30, 1.00, 1.30), dist: 2.04, to: 1.44, yaw: -63, pitch: 10, fov: 42 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "The kitchen at home, and his mother at the table with her coat still on, because she has only just come in.",
      stage: () => (
        <>
          <Mum position={K(0.30, 0, 1.30)} rotationY={NORTH} animation="sit" face="calm" />
          <Hero position={K(1.55, 0, 2.30)} rotationY={-Math.PI / 2} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "12.sat",
      // Her hands, and her shoes: she has been walking all day.
      ...cam.push({ on: K(0.30, 0.55, 1.20), dist: 1.43, to: 0.98, yaw: 0, pitch: 12, fov: 40 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "Down at her feet under the table: her shoes, dusty to the laces, and the hem of her coat. The walking is the proof.",
      stage: (t) => (
        <>
          <Mum position={K(0.30, 0, 1.30)} rotationY={NORTH} animation="sit" face="calm" />
          <Block size={[0.22, 0.12, 0.34]} position={K(0.10, 0.06, 1.90)} color="#4a3a2e" castShadow={false} />
          <Block size={[0.22, 0.12, 0.34]} position={K(0.52, 0.06, 1.90)} color="#4a3a2e" castShadow={false} />
          <Block size={[0.44, 0.03, 0.4]} position={K(0.31, 0.02, 1.95)} color="#b8a894" opacity={0.55 * pop(t, MUM_SIT)} transparent castShadow={false} />
        </>
      ),
    },
    {
      cue: "12.paid",
      // He sits down opposite her: the first time in the film he is not going anywhere.
      ...cam.push({ on: K(0.30, 1.10, 1.20), dist: 2.84, to: 2.14, yaw: 73, pitch: 8, fov: 44 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "The two of them at the table: him sitting down for the first time in the film, opposite the person who has been walking while he did not.",
      stage: () => (
        <>
          <Mum position={K(0.30, 0, 1.30)} rotationY={NORTH} animation="sit" face="smile" />
          <Hero position={K(0.30, 0, 2.55)} rotationY={NORTH} animation="sit" face="sad" />
        </>
      ),
    },
    {
      cue: "12.why",
      // Her face, close, and she is not angry about any of it.
      ...cam.push({ on: K(0.30, 1.02, 1.30), dist: 1.12, to: 0.72, yaw: -56, pitch: 15, fov: 36 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "Her, close, tired and kind: not to get anywhere, just to see where he had got to. The whole cost of the power in one face.",
      stage: () => (
        <>
          <Mum position={K(0.30, 0, 1.30)} rotationY={NORTH} animation="sit" face="smile" gaze={0} blink />
        </>
      ),
    },
    {
      cue: "12.sub",
      // THE LAST PICTURE: the kitchen, the sign, and the two of them at the table.
      ...cam.push({ on: K(0.35, 1.30, 0.30), dist: 2.26, to: 1.76, yaw: 28, pitch: 4, fov: 50 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "The last frame: the kitchen, the fridge he used first, his mother at the table, and the sign. The CTA is after the payoff, never in the middle of it.",
      stage: (t) => (
        <>
          <Mum position={K(0.30, 0, 1.30)} rotationY={NORTH} animation="sit" face="smile" />
          <Hero position={K(0.30, 0, 2.55)} rotationY={NORTH} animation="sit" face="smile" />
          <SubscribeSign position={K(1.30, 2.45, -0.60)} rotationY={-0.55} scale={pop(t, SUB, 0.3)} tilt={0.03} />
        </>
      ),
    },
  ],
});

void EAST;
void ramp;
