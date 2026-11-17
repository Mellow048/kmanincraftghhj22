import type React from "react";
import { Block, PixelText, cam, storyScene } from "../../engine";
import { Hero, G, S, SPOT, B, EAST, NORTH, SOUTH, WEST, ramp, timing, wordAt } from "./kit";
import { Rings } from "./scene1";

/**
 * SCENE 5 — "What it was actually doing". The misread, and the bill.
 *
 * The film's thesis lands in two lines (`5.thought`, `5.instead`) and then the price is paid in three shots: the
 * bench, the list, and the wall of his own bedroom that will not answer him. Nothing here is a new idea; every shot
 * is a thing the film has already planted, coming back wrong.
 *
 * The silence is built as a visual: where the power has been spent, the rings do not come. A shot with no `Rings`
 * in it is a wall that has nothing left, and the audience reads it without a word.
 */

const THOUGHT = wordAt("5.thought", "important");
const INSTEAD = wordAt("5.instead", "last");
const BENCHAGAIN = wordAt("6.comeback", "bench");
const GONE = wordAt("6.gone", "taken");
const LIST = wordAt("6.list", "silent");
const MINE = wordAt("6.mine", "not");
const QUIET = wordAt("7.quiet", "own");
const WAIT = wordAt("7.wait", "back");

/** His bedroom's south wall: the one surface in the film the camera has been inside all along. */
const OWN_WALL = [0, 1.15, 80 - 2.42] as [number, number, number];

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "What it was actually doing",
  shots: [
    {
      // He is walking and talking to the lens's side: the only shot in the film where he addresses the audience
      // directly, because it is the only shot where he knows something he wishes he did not.
      cue: "5.thought",
      ...cam.push({ on: G(-6.30, 1.32, 0.30), dist: 2.45, to: 1.95, yaw: 8, pitch: 1, fov: 40 }),
      zone: "gym",
      look: "overworld-day",
      note: "Him turned half towards the lens in the empty gym, mid-sentence, with the silent wall behind his shoulder: a kid correcting his own story out loud.",
      stage: () => (
        <>
          <Hero position={G(-6.60, 0, 0.30)} rotationY={SOUTH - 0.8} animation="talk" face="frown" headYaw={-0.2} />
        </>
      ),
    },
    {
      // The wall from its own side with nothing in front of it: the thesis, and the emptiest frame in the film.
      cue: "5.instead",
      ...cam.push({ on: G(-7.95, 1.30, 0.30), dist: 2.35, to: 1.85, yaw: 88, pitch: 1, fov: 40 }),
      zone: "gym",
      look: "overworld-day",
      note: "The bare wall filling the frame with no actor in it at all: the last thing it heard, not the best thing, and those are not the same sentence.",
      stage: (t) => (
        <>
          <Rings at={G(-7.94, 1.20, 0.10)} t={t} from={INSTEAD} />
        </>
      ),
    },
    {
      // Back to the bench, and the joke is now a receipt: same shot, same height, and no rings.
      cue: "6.comeback",
      ...cam.push({ on: S(-4.20, 1.05, 0.55), dist: 3.05, to: 2.55, yaw: 22, pitch: 3, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "The same bench outside the shop, framed exactly as it was when it said OW: a boy coming back to a place he has already spent.",
      stage: (t) => (
        <>
          <Hero position={S(-4.20, 0, 0.30)} rotationY={NORTH} animation="press" face="uneasy" headPitch={0.28} />
          <Rings at={S(-4.20, 1.05, -0.05)} t={t} from={BENCHAGAIN - 0.2} />
        </>
      ),
    },
    {
      // The hand comes off the slats and there is nothing: the shot holds on a palm on wood, and the joke turns into
      // a bill. Same angle, further in.
      cue: "6.gone",
      ...cam.push({ on: S(-4.20, 0.78, 0.10), dist: 1.95, to: 1.50, yaw: 18, pitch: 6, fov: 40 }),
      zone: "street",
      look: "overworld-night",
      note: "Close on his palm flat on the bench slats and nothing coming out of them: the OW is gone because he is the one who took it.",
      stage: () => (
        <>
          <Hero position={S(-4.20, 0, 0.30)} rotationY={NORTH + 0.1} animation="press" face="frown" headPitch={0.34} />
          <Block size={[2.2, 0.08, 0.5]} position={S(-4.20, 0.45, -0.20)} color="#8a6a44" castShadow={false} />
        </>
      ),
    },
    {
      // Down the corridor of his own house, past doors that are all silent now, with the list in his hand.
      cue: "6.list",
      ...cam.push({ on: [0, 1.20, 0.60], dist: 4.2, to: 3.4, yaw: 176, pitch: 3, fov: 46 }),
      zone: "room",
      look: "overworld-night",
      note: "Him standing in his own dark bedroom with the list in one hand and every wall quiet: the room he has been in all film and never once touched.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, -0.60]} rotationY={SOUTH + 0.2} animation="idle" face="uneasy" />
          <HeldList at={[0.34, 1.02, -0.30]} t={t} from={LIST} />
        </>
      ),
    },
    {
      // The list, and the line he did not write. Same card, same top-down lens as scene 3: the audience reads the
      // handwriting change before he says anything about it.
      cue: "6.mine",
      ...cam.push({ on: [0.10, 0.86, -0.30], dist: 1.85, to: 1.45, yaw: 6, pitch: 66, fov: 42 }),
      zone: "room",
      look: "overworld-night",
      note: "Straight down on the list with one more line at the bottom in his own hand: he can read it and he has never heard it said.",
      stage: (t) => (
        <>
          <Block size={[0.62, 0.86, 0.012]} position={[0.10, 0.06, -0.30]} rotation={[-Math.PI / 2, 0, 0]} color="#f6f0dc" castShadow={false} />
          <Block size={[0.44, 0.02, 0.006]} position={[0.10, 0.10, -0.62]} rotation={[-Math.PI / 2, 0, 0]} color="#8a2b28" castShadow={false} />
          <PixelText text="?" position={[0.10, 0.30, -0.30]} rotation={[-Math.PI / 2, 0, 0]} height={0.12} color="#8a2b28" />
          <Rings at={[0.10, 0.10, -0.62]} t={t} from={MINE} />
        </>
      ),
    },
    {
      // His own bedroom wall, and the lens at the height of his face: the one surface he has slept beside and never
      // put a hand on, because it was his.
      cue: "7.quiet",
      ...cam.push({ on: OWN_WALL, dist: 2.15, to: 1.70, yaw: 12, pitch: 2, fov: 40 }),
      zone: "room",
      look: "overworld-night",
      note: "His hand on his own bedroom wall, close, and no rings and no sentence: the last wall in the film that has kept something for him.",
      stage: (t) => (
        <>
          <Hero position={[-0.30, 0, -1.60]} rotationY={NORTH + 0.15} animation="press" face="calm" />
          <Rings at={[0.15, 1.15, -2.36]} t={t} from={QUIET} />
        </>
      ),
    },
    {
      // The turn before the reveal: the wall is not empty, it is full and holding. Pull back off the hand and let the
      // frame fill with the one wall that has been listening to him all film.
      cue: "7.wait",
      ...cam.push({ on: OWN_WALL, dist: 3.1, to: 4.0, yaw: 4, pitch: 6, fov: 46 }),
      zone: "room",
      look: "overworld-night",
      note: "The wall still holding, him small against it at the edge of frame: not empty, not broken, and waiting for him to be ready to hear it.",
      stage: () => (
        <>
          <Hero position={[-0.30, 0, -1.90]} rotationY={NORTH + 0.1} animation="idle" face="fear" headYaw={0.2} />
          <Block size={[1.5, 1.5, 0.08]} position={[0.0, 1.55, -2.39]} color="#5c3f24" castShadow={false} />
          <Block size={[1.2, 1.2, 0.06]} position={[0.0, 1.55, -2.33]} color="#a9c6ff" emissive="#7fa8ff" emissiveIntensity={1.5} castShadow={false} />
          <Block size={[0.34, 0.34, 0.02]} position={[0.25, 1.80, -2.27]} color="#f4f7ff" emissive="#ffffff" emissiveIntensity={2.2} castShadow={false} />
        </>
      ),
    },
  ],
});

/** The list held up: the same card as scene 3, and it comes back one line longer. */
const HeldList: React.FC<{ at: [number, number, number]; t: number; from: number }> = ({ at, t, from }) => {
  const k = ramp(t, from, from + 0.8);
  return (
    <group position={at} rotation={[0.16, WEST + 0.5, 0.04 + k * 0.02]}>
      <Block size={[0.62, 0.86, 0.012]} color="#f6f0dc" castShadow={false} />
      {Array.from({ length: 9 }, (_, i) => (
        <Block key={i} size={[0.52, 0.012, 0.004]} position={[0, 0.32 - i * 0.08, 0.008]} color="#b9b3a0" castShadow={false} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <Block key={`w${i}`} size={[0.3 - i * 0.014, 0.026, 0.006]} position={[-0.08 + i * 0.006, 0.32 - i * 0.08, 0.012]} color="#3a3f47" castShadow={false} />
      ))}
      <Block size={[0.34, 0.03, 0.006]} position={[0, -0.16, 0.014]} color="#8a2b28" castShadow={false} />
    </group>
  );
};

void SPOT;
void B;
void EAST;
void GONE;
