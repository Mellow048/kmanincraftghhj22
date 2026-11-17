import type React from "react";
import { Block, PixelText, cam, storyScene } from "../../engine";
import { Adult, Dad, Friend, Hero, K, HOME, S, SPOT, EAST, NORTH, SOUTH, WEST, ramp, timing, wordAt } from "./kit";
import { Rings } from "./scene1";

/**
 * SCENE 3 — "The best-informed person in town". The week the power is a good thing.
 *
 * The montage beat, and the film's only bright stretch: he is winning. Three shots of the same idea (a sentence he
 * did not deserve to hear), then the list he writes, then the sentence that stops him — his dad, talking to a sink,
 * to nobody, every morning of his life.
 *
 * The list is the film's prop: a card on his bedroom floor with a line for every wall he has spent. It has to be
 * readable in one shot here because it comes back with a sentence on it in scene 5.
 */

/** The bedroom and the corridor, in world.tsx's zones: R(x, y, z) and H(x, y, z). */
const PLACE_X = 0;
const PLACE_Z = 80;
const R = (x: number, y: number, z: number) => [PLACE_X + x, y, PLACE_Z + z] as [number, number, number];
const H = (x: number, y: number, z: number) => [PLACE_X + x, y, 40 + z] as [number, number, number];

const WEEK = wordAt("3.week", "bestinformed");
const BEST = wordAt("3.tally", "best");
const THINK = wordAt("3.what", "really");
const ONETHING = wordAt("3.dad", "one");
const SINK = wordAt("3.dadb", "sink");
const STOP = wordAt("3.sick", "stopped");
const HANDS = wordAt("3.hands", "Doorknobs");
const STILL = wordAt("3.still", "still");

/** The list: a card on the floor, ruled, with one line for every wall he has spent, and a tick against the good ones. */
const List: React.FC<{ at: [number, number, number]; written?: number; extra?: { text: string; at: [number, number, number] } }> = ({
  at,
  written = 6,
  extra,
}) => (
  <group position={at} rotation={[-Math.PI / 2, 0, 0]}>
    <Block size={[0.62, 0.86, 0.012]} position={[0, 0, 0]} color="#f6f0dc" castShadow={false} />
    {Array.from({ length: 9 }, (_, i) => (
      <Block key={i} size={[0.52, 0.012, 0.004]} position={[0, 0.32 - i * 0.08, 0.008]} color="#b9b3a0" castShadow={false} />
    ))}
    {Array.from({ length: written }, (_, i) => (
      <Block key={`w${i}`} size={[0.3 - i * 0.014, 0.026, 0.006]} position={[-0.08 + i * 0.006, 0.32 - i * 0.08, 0.01]} color="#3a3f47" castShadow={false} />
    ))}
    {Array.from({ length: written }, (_, i) => (
      <Block key={`t${i}`} size={[0.05, 0.05, 0.006]} position={[0.22, 0.32 - i * 0.08, 0.01]} color="#3f8a4f" castShadow={false} />
    ))}
    {extra ? (
      <>
        <Block size={[0.34, 0.03, 0.006]} position={[extra.at[0], extra.at[1], 0.014]} color="#8a2b28" castShadow={false} />
      </>
    ) : null}
  </group>
);

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The best-informed person in town",
  shots: [
    {
      // He is walking and not stopping: the whole joke of the week is a kid touching everything he passes.
      cue: "3.week",
      ...cam.push({ on: S(0.20, 1.10, 0.60), dist: 3.9, to: 3.15, yaw: -54, pitch: 2, fov: 50 }),
      zone: "street",
      look: "overworld-night",
      note: "Him walking the pavement past the shelter and the shop, one hand trailing along everything he passes: the week the power made him popular.",
      stage: () => (
        <>
          <Hero position={S(-0.60, 0, 0.20)} rotationY={EAST + 0.1} animation="walk" animDistance={2.4} face="grin" />
          <Rings at={S(0.80, 1.15, -0.10)} t={0.4} from={0.3} />
        </>
      ),
    },
    {
      // On his bedroom floor: the list, and his hand doing the writing. A prop shot, from above, so a phone can
      // read every line.
      cue: "3.tally",
      // Down on the card, not on the rug: the room's floor is a 2.4 x 2 m mat at y 0.02 and the card is laid on the
      // boards beside it, so the lens is 1.4 m up and 30 degrees off vertical and the ticks are readable at phone size.
      ...cam.push({ on: R(-0.55, 0.10, -1.10), dist: 1.90, to: 1.58, yaw: 14, pitch: 40, fov: 46 }),
      zone: "room",
      look: "overworld-night",
      note: "Down on his bedroom floorboards: a ruled card with a tick against every wall he has spent, a pencil still moving on the next line, and the dark under the bed behind it.",
      stage: (t) => (
        <>
          <List at={R(-0.55, 0.06, -1.10)} written={6} />
          <Hero position={R(0.10, 0, -0.86)} rotationY={NORTH + 2.6} animation="crouch" face="grin" headPitch={0.5} />
          <PixelText text="BEST" position={R(-0.70, 0.28, -1.42)} rotation={[-Math.PI / 2, 0, 0]} height={0.09} color="#3a3f47" />
          <Rings at={R(-0.55, 0.10, -1.10)} t={t} from={BEST} />
        </>
      ),
    },
    {
      // Three quarters behind his shoulder in the corridor, and the sentence coming out of the doorway he has just
      // walked past: what somebody says to the door after you leave is the whole premise.
      cue: "3.what",
      ...cam.push({ on: H(-0.45, 1.32, 2.60), dist: 4.30, to: 3.50, yaw: 176, pitch: 2, fov: 58 }),
      zone: "hall",
      look: "overworld-day",
      note: "Him walking away down the corridor with his head half turned, and a sentence coming out of a doorway behind him that was meant for when he had gone.",
      stage: (t) => (
        <>
          <Hero position={H(-0.30, 0, 1.30)} rotationY={NORTH} animation="walk" animDistance={1.1} face="uneasy" headYaw={0.5} />
          <Adult position={H(-1.62, 0, 2.60)} rotationY={EAST - 0.5} animation="talk" face="frown" />
          <Rings at={H(-1.55, 1.22, 2.95)} t={t} from={THINK} />
        </>
      ),
    },
    {
      // Out of focus and in the foreground: his dad's hand on the counter, and the sink beyond it. A shot where a
      // grown-up is a shape rather than a face, because he is not a character yet — he is a routine.
      cue: "3.dad",
      ...cam.push({ on: K(-2.10, 1.20, -1.60), dist: 2.65, to: 2.05, yaw: 26, pitch: 3, fov: 44 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "His dad at the sink in the morning light with his back half turned, one hand on the tap: a man talking to a kitchen before anybody else is up.",
      stage: () => (
        <>
          <Dad position={K(-2.30, 0, -2.05)} rotationY={NORTH} animation="talk" face="calm" />
          <Hero position={K(-0.20, 0, 0.30)} rotationY={WEST + 0.3} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      // The same sentence, and nobody to say it to. The sink from the side, taller than it needs to be, with the
      // window above it: the room a sentence has been going into for nineteen years.
      cue: "3.dadb",
      ...cam.push({ on: K(-2.30, 1.05, -2.55), dist: 1.95, to: 1.55, yaw: 62, pitch: 8, fov: 42 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "The sink close, with last night's plate in it and the window behind: same words every morning, and there has never been anybody in the room to hear them.",
      stage: (t) => (
        <>
          <Block size={[0.34, 0.02, 0.34]} position={K(-2.30, 0.95, -2.60)} color="#f2efe0" castShadow={false} />
          <Block size={[0.30, 0.03, 0.30]} position={K(-2.30, 0.965, -2.60)} color="#d8d2c0" castShadow={false} />
          <Rings at={K(-2.30, 1.24, -2.72)} t={t} from={SINK} />
        </>
      ),
    },
    {
      // The week ends. He is not touching anything, and the not touching is what the frame is about: a boy with his
      // hands in the air in a normal kitchen.
      cue: "3.sick",
      ...cam.push({ on: K(0.30, 1.25, 0.60), dist: 2.55, to: 2.05, yaw: -18, pitch: 2, fov: 44 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "Him standing in the middle of the kitchen with both hands up and away from everything, the way you hold your hands after you break something.",
      stage: () => (
        <>
          <Hero position={K(0.30, 0, 0.30)} rotationY={SOUTH + 0.35} animation="reachUp" face="fear" headPitch={0.12} />
          <Rings at={K(-0.30, 1.15, -2.70)} t={0.5} from={0.15} />
        </>
      ),
    },
    {
      // One shot, three surfaces: a doorknob, a bed, a hand. Fast and close and hand-held, and the only warm thing
      // in it is the last one.
      cue: "3.hands",
      ...cam.push({ on: K(2.90, 1.02, -0.90), dist: 1.75, to: 1.35, yaw: 46, pitch: -6, fov: 44 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "His hand going out to a doorknob and pulling back before it lands: the reflex he cannot put down, shot at the height of a hand.",
      stage: (t) => (
        <>
          <Hero position={K(2.10, 0, -0.20)} rotationY={EAST + 0.55} animation="reach" face="uneasy" />
          <Block size={[0.09, 0.09, 0.17]} position={K(3.35, 1.02, -0.90)} color="#c9b06a" castShadow={false} />
          <Rings at={K(3.30, 1.02, -0.90)} t={t} from={HANDS - 0.4} />
        </>
      ),
    },
    {
      // The last shot of the good part: the house at night from the doorway, and a boy sitting on the floor of it
      // with his hands on his knees. Sit still, in a house like that.
      cue: "3.still",
      ...cam.push({ on: K(0.60, 0.95, -0.20), dist: 4.3, to: 3.6, yaw: -8, pitch: 6, fov: 48 }),
      zone: "kitchen",
      look: "overworld-night",
      note: "The kitchen dark from the doorway with him sitting on the floor in the middle of it, hands on his knees, not touching anything and not asleep.",
      stage: () => (
        <>
          <Hero position={K(0.30, 0, 0.70)} rotationY={NORTH} animation="sit" face="calm" headPitch={0.2} />
          <Block size={[0.4, 0.01, 0.4]} position={K(0.30, 0.16, 0.70)} color="#8a6a44" castShadow={false} />
        </>
      ),
    },
  ],
});

void EAST;
void WEST;
void Friend;
void HOME;
void ramp;
void STOP;
void STILL;
void Adult;
void SPOT;
