import type React from "react";
import { Block, Dust, LightPool, PixelText, cam, storyScene } from "../../engine";
import { Adult, Friend, Hero, G, K, Mum, S, SPOT, SoundRings, B, EAST, NORTH, SOUTH, WEST, ramp, timing, wordAt } from "./kit";
import { Rings } from "./scene1";

/**
 * SCENE 2 — "The five walls". The jokes, before 0:20.
 *
 * Five surfaces, five sentences, and the joke is the same in each: a wall is not a diary. It is the last thing it
 * heard, which is usually nothing, usually somebody swearing, usually the same sentence again. He is delighted at
 * first. The bathroom is the first one that lands on him rather than on the world.
 *
 * Every wall in this film answers at a fixed height — 1.15 m, a hand held out without looking — so the audience
 * learns the rule as a shape before it learns it as a sentence. `Rings` (scene1) is the power's one look, and it is
 * never redrawn: three pale squares, once, on the word.
 */

const OW = wordAt("2.bench", "OW");
const UNDER = wordAt("2.benchb", "looked");
const JOKE = wordAt("2.class", "played");
const ALL = wordAt("2.classb", "All");
const SAME = wordAt("2.bus", "same");
const RAIN = wordAt("2.busb", "standing");
const NOTHING = wordAt("2.gym", "nothing");
const KNOCK = wordAt("2.gymb", "knocked");
const NICE = wordAt("2.mirror", "nice");
const SIX = wordAt("2.mirrorb", "six");

/** The shop's window light, put back for the shots after the bench: warm, low, and behind his shoulder. */
const BENCH = S(-4.20, 0.62, -0.20);

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The five walls",
  shots: [
    {
      // He is not standing at the bench to look at it. He is walking past and puts one hand down on it as he goes,
      // which is what makes the sentence funny and what makes it cost something later.
      cue: "2.bench",
      ...cam.push({ on: S(-4.20, 1.05, 0.55), dist: 3.05, to: 2.45, yaw: 22, pitch: 3, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "The bench outside the shop with his palm landing flat on the slats: a boy touching furniture on his way past, and a shop window lit behind him.",
      stage: (t) => (
        <>
          <Hero position={S(-4.55, 0, 0.05)} rotationY={NORTH + 0.55} animation="walk" animDistance={0.55} face="calm" />
          <Rings at={BENCH} t={t} from={OW} />
          <PixelText text="OW" position={S(-4.20, 1.52, 0.05)} height={0.3} color="#ffe9a8" />
        </>
      ),
    },
    {
      // The sight gag: he is on one knee looking under a bench with a streetlight in it, and the answer is a takeaway
      // cup. Play it flat, from a low angle, like a man checking under a car.
      cue: "2.benchb",
      ...cam.push({ on: S(-4.20, 0.62, 0.30), dist: 2.55, to: 2.05, yaw: 26, pitch: -14, fov: 46 }),
      zone: "street",
      look: "overworld-night",
      note: "Low angle under the bench: the slats, the dark, one paper cup, and him crouched with his face nearly on the pavement, looking for who said it.",
      stage: () => (
        <>
          <Hero position={S(-4.85, 0, 0.95)} rotationY={NORTH + 0.35} animation="crouch" face="wow" headPitch={0.34} />
          <Block size={[0.11, 0.15, 0.11]} position={S(-3.55, 0.08, -0.42)} color="#e8e2d0" castShadow={false} />
          <Block size={[0.13, 0.03, 0.13]} position={S(-3.55, 0.16, -0.42)} color="#f2ecd8" castShadow={false} />
          <LightPool position={S(-4.20, 0.03, -0.30)} width={3.2} depth={1.8} color="#d8d2c0" opacity={0.12} />
        </>
      ),
    },
    {
      // The classroom wall, from the wall's side of the room: the lens is low and close to the plaster so the joke
      // arrives along the surface and out towards the desks, not from the front of the room like a normal class shot.
      cue: "2.class",
      ...cam.push({ on: SPOT.at(-3.05, 1.30, 1.35), dist: 2.75, to: 2.15, yaw: 118, pitch: 4, fov: 48 }),
      zone: "class",
      look: "overworld-day",
      note: "Along the classroom wall at hand height, with the desks behind him: the plaster giving the teacher's worst joke back to an empty room.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(-2.55, 0, 0.90)} rotationY={EAST + 0.55} animation="press" face="grin" />
          <Rings at={SPOT.at(-3.32, 1.18, 1.10)} t={t} from={JOKE} />
          <SoundRings position={SPOT.at(-3.30, 1.25, 1.10)} rotationY={EAST} t={t - JOKE} reach={1.15} color="#e8f4ff" />
        </>
      ),
    },
    {
      // Two things in one frame: the wrong person laughing, and the right one not. He turns round to find a room
      // of desks and one kid who has heard the joke before and is still not over it.
      cue: "2.classb",
      ...cam.push({ on: SPOT.at(-1.10, 1.20, 1.55), dist: 3.55, to: 2.85, yaw: 196, pitch: 2, fov: 46 }),
      zone: "class",
      look: "overworld-day",
      note: "Over his shoulder into the class: one kid at a desk laughing at a joke nobody told, and eleven desks with nobody in them.",
      stage: () => (
        <>
          <Hero position={SPOT.at(-2.30, 0, 1.10)} rotationY={SOUTH - 0.25} animation="idle" face="uneasy" headYaw={-0.35} />
          <Friend position={SPOT.seat(2, 1)} rotationY={NORTH} animation="sit" face="laugh" />
        </>
      ),
    },
    {
      // The bus stop. Same sentence, same hour, and he is not touching it kindly: he knows what is coming and he
      // puts his hand on it anyway, which is the first sign that this is becoming a habit.
      cue: "2.bus",
      ...cam.push({ on: S(1.90, 1.42, 0.55), dist: 2.65, to: 2.10, yaw: -36, pitch: 2, fov: 44 }),
      zone: "street",
      look: "overworld-night",
      note: "His hand on the bus stop roundel at midnight, the red sign lit from the lamp, and the sentence it has said every day for a year.",
      stage: (t) => (
        <>
          <Hero position={S(1.30, 0, 0.95)} rotationY={NORTH + 0.7} animation="reach" face="frown" />
          <Rings at={S(1.90, 1.62, 1.24)} t={t} from={SAME} />
        </>
      ),
    },
    {
      // The payoff of the joke: the sentence is not about him, it is about somebody who is not in the shot. Empty
      // road, wet kerb, one lamp, and the rain hanging in the light where a person used to stand.
      cue: "2.busb",
      ...cam.push({ on: S(2.60, 1.30, 2.60), dist: 5.4, to: 4.7, yaw: -12, pitch: 5, fov: 50 }),
      zone: "street",
      look: "overworld-night",
      note: "The empty pavement under the lamp with the rain in it, and him small at the edge of frame: somebody stood here for a year and this is all that is left.",
      stage: () => (
        <>
          <Hero position={S(1.30, 0, 1.30)} rotationY={SOUTH + 0.5} animation="idle" face="uneasy" />
          <Dust position={S(3.10, 1.5, 1.10)} area={[3.0, 2.6, 1.8]} count={42} size={0.022} color="#cfe0ff" opacity={0.4} seed={31} speed={0.35} />
          <LightPool position={S(3.10, 0.03, 1.00)} width={2.6} depth={2.0} color="#cfe0ff" opacity={0.14} />
        </>
      ),
    },
    {
      // A wide, still, badly lit gym with a boy standing at a wall doing nothing. The joke needs the frame to be
      // boring: hold it, let the silence be long enough that the cut is the punchline.
      cue: "2.gym",
      ...cam.push({ on: G(-5.40, 1.35, 0.40), dist: 5.6, to: 4.9, yaw: 96, pitch: 4, fov: 50 }),
      zone: "gym",
      look: "overworld-day",
      note: "The whole bare end of the gym with one boy standing against the silent wall, hand flat on it, nothing happening anywhere in the frame.",
      stage: (t) => (
        <>
          <Hero position={G(-7.30, 0, 0.40)} rotationY={WEST} animation="press" face="uneasy" />
          <Rings at={G(-7.95, 1.18, 0.40)} t={t} from={NOTHING} />
        </>
      ),
    },
    {
      // And the thing a kid does to a machine that has stopped working: he hits it. Knuckles on plaster, ear to it
      // after, which is the wrong way round and funnier for it.
      cue: "2.gymb",
      ...cam.push({ on: G(-7.70, 1.22, 0.40), dist: 2.20, to: 1.72, yaw: 68, pitch: 1, fov: 42 }),
      zone: "gym",
      look: "overworld-day",
      note: "Close on his knuckles on the bare plaster and his ear going to it afterwards: he is knocking on a wall to see if a wall is broken.",
      stage: (t) => (
        <>
          <Hero position={G(-7.30, 0, 0.40)} rotationY={WEST + 0.1} animation="press" face="ouch" />
          <Rings at={G(-7.94, 1.20, 0.40)} t={t} from={KNOCK} />
        </>
      ),
    },
    {
      // The bathroom: the one set in the film with no dark in it. Hard white tiles, a mirror, and his mother's voice
      // coming out of the grout — the first sentence that is about him.
      cue: "2.mirror",
      ...cam.push({ on: B(0.10, 1.45, -0.35), dist: 2.35, to: 1.85, yaw: -6, pitch: 3, fov: 42 }),
      zone: "bath",
      look: "overworld-day",
      note: "The bathroom wall beside the mirror, tiles and toothbrushes, with his hand on the white grout and a sentence coming out of the plumbing.",
      stage: (t) => (
        <>
          <Hero position={B(-0.35, 0, 0.10)} rotationY={NORTH - 0.15} animation="press" face="wow" />
          <Rings at={B(-0.62, 1.30, -1.10)} t={t} from={NICE} />
        </>
      ),
    },
    {
      // The turn. He is not looking at the wall any more, he is looking at himself in the glass, because the sentence
      // made him do it. Reflections face off-axis: he sees the mirror, the lens sees his face.
      cue: "2.mirrorb",
      ...cam.push({ on: B(-0.30, 1.52, -0.30), dist: 1.85, to: 1.42, yaw: -20, pitch: 3, fov: 38 }),
      zone: "bath",
      look: "overworld-day",
      note: "His face close and turned towards the mirror, eyes wet, the sentence six years old: the first time the power gives him something he wanted.",
      stage: () => (
        <>
          <Hero position={B(-0.30, 0, 0.10)} rotationY={NORTH} animation="idle" face="calm" headPitch={-0.1} />
          <ChestVoice at={B(-1.06, 1.42, -0.20)} t={SIX} />
        </>
      ),
    },
  ],
});

/** The voice without a body: a soft slab of light at chest height where a speaker would be, breathing. */
const ChestVoice: React.FC<{ at: [number, number, number]; t: number }> = ({ at, t }) => {
  const k = ramp(t, 0.02, 1.6);
  return (
    <group position={at}>
      <Block size={[1.0, 0.06, 0.9]} position={[0, 0, 0]} color="#ffe9c8" emissive="#ffe9c8" emissiveIntensity={0.9} opacity={0.28 * (1 - k * 0.55)} transparent castShadow={false} />
      <Block size={[0.5, 0.5, 0.5]} position={[0, 0, 0]} color="#ffe9c8" emissive="#ffe9c8" emissiveIntensity={0.5} opacity={0.1 * (1 - k)} transparent castShadow={false} />
    </group>
  );
};

void K;
void Mum;
void Adult;
