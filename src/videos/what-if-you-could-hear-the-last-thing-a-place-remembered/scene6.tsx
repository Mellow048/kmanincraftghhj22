import type React from "react";
import { Block, PixelText, cam, storyScene } from "../../engine";
import { Adult, Hero, K, Mum, NORTH, S, SOUTH, WEST, ramp, timing, wordAt } from "./kit";
import { Rings } from "./scene1";
import { SubscribeSign, SoundRings } from "./kit";

/**
 * SCENE 6 — "Your turn". The reveal, and the last picture.
 *
 * The whole film has been about one sentence in one room with no windows. The kitchen has been in the film since
 * 3.dad, and the lens has always been pointed at the sink — at the back of a man talking to nobody. Now it is the
 * same room, the same sink, and his mother standing where his dad always stood, saying the thing he said every
 * morning of nineteen years.
 *
 * The reveal is not a twist about the power. It is a twist about the father: he was not talking to the sink. He was
 * talking to his son through it, every morning, in a room the boy was never up early enough to be in.
 */

const MORNING = wordAt("8.morning", "kitchen");
const SAID = wordAt("8.said", "said");
const TAKE = wordAt("8.wall", "take");
const EVERY = wordAt("8.why", "every");
const YOURTURN = wordAt("9.heard", "turn");
const TO_ME = wordAt("9.that", "me");
const SUB = wordAt("10.sub", "Subscribe");

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Your turn",
  shots: [
    {
      // The kitchen in the morning light, his mother at the sink where his dad has always been, and him stopped in
      // the doorway not moving into the room.
      cue: "8.morning",
      ...cam.push({ on: K(0.30, 1.20, -0.60), dist: 3.4, to: 2.75, yaw: 8, pitch: 3, fov: 46 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "His mother at the sink in the same morning light his dad stood in, and him stopped in the kitchen doorway: the routine has a second person in it now.",
      stage: () => (
        <>
          <Mum position={K(-2.20, 0, -2.00)} rotationY={NORTH} animation="talk" face="calm" />
          <Hero position={K(2.30, 0, -0.70)} rotationY={WEST + 0.4} animation="idle" face="wow" />
        </>
      ),
    },
    {
      // The sentence, and it is the same sentence. Shot from behind his mother's shoulder onto the sink, so the
      // audience recognises the words before he does.
      cue: "8.said",
      ...cam.push({ on: K(-2.30, 1.28, -2.35), dist: 1.85, to: 1.45, yaw: 152, pitch: 4, fov: 42 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "Over her shoulder onto the sink with the window in it, the words coming out in a voice the film has heard all along and he has not.",
      stage: (t) => (
        <>
          <Mum position={K(-2.20, 0, -2.00)} rotationY={NORTH} animation="talk" face="calm" />
          <Rings at={K(-2.30, 1.24, -2.80)} t={t} from={SAID} />
        </>
      ),
    },
    {
      // The wall takes it: a hard cut to the plaster beside the window, no actor in frame, and the sentence going
      // into it and staying. The last time the power works in the film, and it works away from him.
      cue: "8.wall",
      // THE SHOP WINDOW, which is the only lit thing on this street. The kitchen was tried four times and every
      // version failed for the same reason: the pack's kitchen whitewashes that wall, so any lens close enough to
      // hold the plaster blows it out to a blank page. The window has a frame, a lit sill and a dark street behind
      // the lens, which is what a reflection needs, and the film already has the street in it.
      ...cam.push({ on: S(-9.40, 2.00, -0.98), dist: 4.00, to: 3.30, yaw: 0, pitch: 2, fov: 58 }),
      zone: "street",
      look: "overworld-night",
      note: "The shop window at midnight with the lit sill and the dark glass, taking the sentence without a person anywhere near it.",
      stage: (t) => (
        <>
          <Rings at={S(-9.40, 2.30, -0.94)} t={t} from={TAKE} />
        </>
      ),
    },
    {
      // Nineteen years, in one frame: the calendar on the kitchen wall, and his dad's handwriting on it in the same
      // place month after month.
      cue: "8.why",
      ...cam.push({ on: K(1.40, 1.55, -2.90), dist: 1.70, to: 1.35, yaw: -8, pitch: 2, fov: 38 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "A calendar on the kitchen wall with nineteen years of the same handwriting in the same corner of every month: a man keeping a record of a conversation.",
      stage: (t) => (
        <>
          <Block size={[0.9, 1.1, 0.03]} position={K(1.40, 1.55, -2.96)} color="#f6f0dc" castShadow={false} />
          <Block size={[0.86, 0.16, 0.02]} position={K(1.40, 1.98, -2.93)} color="#8a2b28" castShadow={false} />
          {Array.from({ length: 4 }, (_, i) =>
            Array.from({ length: 5 }, (_, j) => (
              <Block key={`${i}${j}`} size={[0.12, 0.12, 0.008]} position={K(1.14 + j * 0.13, 1.80 - i * 0.15, -2.93)} color="#eae4d2" castShadow={false} />
            )),
          )}
          <PixelText text="1997" position={K(1.40, 2.02, -2.92)} height={0.1} color="#fff2cf" />
          <Rings at={K(1.40, 1.55, -2.90)} t={t} from={EVERY} />
        </>
      ),
    },
    {
      // The sentence itself, and he is the one hearing it now: his face, close, and the rings coming off the wall
      // past his cheek. The power has never done anything kind before this shot.
      cue: "9.heard",
      ...cam.push({ on: K(-0.85, 1.48, -1.85), dist: 1.65, to: 1.30, yaw: -32, pitch: 2, fov: 36 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "His face up close with the sentence going past his ear in his mother's voice: the words his dad said every morning of his life, finally at the address they were meant for.",
      stage: (t) => (
        <>
          <Hero position={K(0.30, 0, -1.70)} rotationY={WEST + 0.2} animation="idle" face="calm" headPitch={-0.12} />
          <Rings at={K(-1.30, 1.45, -2.40)} t={t} from={YOURTURN} />
          <SoundRings position={K(-1.25, 1.45, -2.40)} rotationY={SOUTH} t={t - YOURTURN} reach={1.4} color="#ffe9a8" />
        </>
      ),
    },
    {
      // Wide, from the doorway, the two of them in the same room and not touching: the whole film in one frame, and
      // the first time the kitchen has had more than one person in it.
      cue: "9.that",
      ...cam.push({ on: K(-0.60, 1.15, -1.20), dist: 4.5, to: 3.7, yaw: 14, pitch: 4, fov: 48 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "The two of them in the kitchen from the doorway, his mother at the sink and him a metre away: nineteen years of a sentence arriving in the only room it was ever meant for.",
      stage: () => (
        <>
          <Mum position={K(-2.20, 0, -2.00)} rotationY={SOUTH + 0.3} animation="idle" face="calm" />
          <Hero position={K(0.10, 0, -1.60)} rotationY={WEST + 0.1} animation="idle" face="calm" headPitch={0.06} />
          <Block size={[0.34, 0.02, 0.34]} position={K(-2.30, 0.95, -2.60)} color="#f2efe0" castShadow={false} />
        </>
      ),
    },
    {
      // The last picture: the sign, in the kitchen, and he is looking at it instead of at us. Every film of the
      // topic ends on the same red board — hold it in the same place in frame every time.
      cue: "10.sub",
      // Solved by projection: from the doorway, the board's whole width lands inside +-0.45 of frame with his face
      // at +0.34 beside it. The first version hung the board above a bare wall and cut it off at the top.
      ...cam.push({ on: K(0.10, 1.66, -1.30), dist: 4.20, to: 3.70, yaw: 30, pitch: 4, fov: 52 }),
      zone: "kitchen",
      look: "overworld-day",
      note: "The red subscribe board on the kitchen wall with him standing beside it and his mother still at the sink: the one promise the film makes about what happens next.",
      stage: (t) => (
        <>
          <Hero position={K(0.62, 0, -1.10)} rotationY={SOUTH - 0.2} animation="idle" face="grin" />
          <SubscribeSign position={K(-0.30, 2.05, -1.95)} rotationY={SOUTH + 0.06} scale={0.8} tilt={0.02} />
          <Rings at={K(-0.30, 2.05, -1.90)} t={t} from={SUB} />
        </>
      ),
    },
  ],
});

void Adult;
void ramp;
void WEST;
