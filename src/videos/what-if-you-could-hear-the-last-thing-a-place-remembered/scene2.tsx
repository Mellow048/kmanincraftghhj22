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
      // The NORTH wall, which carries the board: the classroom's one wall with something on it. He stands at its
      // south end with his palm flat on the plaster and looks along it, so the lens sees him in profile against it
      // and not the back of his head. (The first version framed the window wall: a white rectangle and no contact.)
      // Head-on at the wall, from his shoulder-line: he is in profile with his palm on the board wall, and the board
      // and its chalk run across the top of the frame he has his ear against. (Two earlier lenses on this cue framed
      // a window, then put the camera outside the room.)
      ...cam.push({ on: SPOT.at(-1.35, 1.32, -3.35), dist: 2.90, to: 2.55, yaw: -26, pitch: 3, fov: 46 }),
      zone: "class",
      look: "overworld-day",
      note: "Him in profile with his palm flat on the board wall and his ear against the chalk: the classroom giving the teacher's worst joke back to somebody who is not laughing.",
      stage: (t) => (
        <>
          <Hero position={SPOT.at(-1.35, 0, -3.35)} rotationY={NORTH - 0.80} animation="press" face="grin" />
          <Rings at={SPOT.at(-1.60, 1.20, -3.94)} t={t} from={JOKE} />
          <SoundRings position={SPOT.at(-1.60, 1.26, -3.94)} rotationY={SOUTH} t={t - JOKE} reach={1.0} color="#e8f4ff" />
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
          <Friend position={SPOT.seat(2, 2)} rotationY={NORTH + 0.5} animation="sit" face="laugh" />
        </>
      ),
    },
    {
      // The bus stop. Same sentence, same hour, and he is not touching it kindly: he knows what is coming and he
      // puts his hand on it anyway, which is the first sign that this is becoming a habit.
      cue: "2.bus",
      // From the road, at the height of the sign: the roundel end-on, his hand up at it, and his face turned to the
      // lens. The first lens sat 0.37 m from the back of his head and the frame was all hair.
      ...cam.push({ on: S(1.55, 1.38, 0.70), dist: 2.60, to: 2.20, yaw: 0, pitch: 2, fov: 48 }),
      zone: "street",
      look: "overworld-night",
      note: "The bus stop roundel lit red from the lamp with his hand flat on the sign, his face turned out to the road: one sentence, said again, at midnight.",
      stage: (t) => (
        <>
          <Hero position={S(1.55, 0, 0.78)} rotationY={SOUTH - 0.12} animation="reach" face="frown" />
          <Rings at={S(1.90, 1.70, 1.22)} t={t} from={SAME} />
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
      // Wide, from the middle of the floor, looking at the bare west end from the side he can be seen from: the mats
      // and the wall bars give the frame a scale, so "nothing at all" reads as a very large room with no voice in it.
      ...cam.push({ on: G(-7.60, 1.30, 0.10), dist: 5.4, to: 4.6, yaw: 152, pitch: 4, fov: 50 }),
      zone: "gym",
      look: "overworld-day",
      note: "The bare west end of the gym from down the room: mats, wall bars and the scrubbed plaster, and one boy standing against it with nothing happening anywhere.",
      stage: (t) => (
        <>
          <Hero position={G(-7.75, 0, 0.10)} rotationY={SOUTH + 0.2} animation="press" face="uneasy" />
          <Rings at={G(-7.96, 1.20, 0.10)} t={t} from={NOTHING} />
        </>
      ),
    },
    {
      // And the thing a kid does to a machine that has stopped working: he hits it. Knuckles on plaster, ear to it
      // after, which is the wrong way round and funnier for it.
      cue: "2.gymb",
      // Side-on and close, lens to the south of him looking north: the knuckles on the plaster on one side of the
      // frame and his ear going to it on the other.
      ...cam.push({ on: G(-7.62, 1.34, 0.10), dist: 2.75, to: 2.30, yaw: 158, pitch: 2, fov: 46 }),
      zone: "gym",
      look: "overworld-day",
      note: "Close and side-on: his knuckles white on the bare plaster, and then the side of his head going to the wall to listen to a wall that has nothing to say.",
      stage: (t) => (
        <>
          <Hero position={G(-7.70, 0, 0.10)} rotationY={WEST + 0.05} animation="press" face="ouch" />
          <Rings at={G(-7.94, 1.20, 0.10)} t={t} from={KNOCK} />
        </>
      ),
    },
    {
      // The bathroom: the one set in the film with no dark in it. Hard white tiles, a mirror, and his mother's voice
      // coming out of the grout — the first sentence that is about him.
      cue: "2.mirror",
      // The tiles to the LEFT of the glass, so the mirror is in frame and he is not standing in front of it. The
      // lens is behind his right shoulder: hand, grout, the edge of the mirror and the toothbrushes in one frame.
      // Solved by projection: from the corner of the basin, looking east along the tiles. His face centres in the
      // frame, the hand on the grout holds the left edge, and the near edge of the mirror comes into the right.
      ...cam.push({ on: B(-0.35, 1.30, -0.85), dist: 1.75, to: 1.45, yaw: -50, pitch: 3, fov: 46 }),
      zone: "bath",
      look: "overworld-day",
      note: "Along the bathroom tiles from the corner of the basin, the edge of the mirror on one side and his palm flat on the white grout on the other: a sentence coming out of the plumbing.",
      stage: (t) => (
        <>
          <Hero position={B(-0.35, 0, -0.72)} rotationY={NORTH} animation="press" face="wow" />
          <Rings at={B(-0.35, 1.26, -1.22)} t={t} from={NICE} />
        </>
      ),
    },
    {
      // The turn. He is not looking at the wall any more, he is looking at himself in the glass, because the sentence
      // made him do it. Reflections face off-axis: he sees the mirror, the lens sees his face.
      cue: "2.mirrorb",
      // His face and the mirror's edge together: he is looking INTO the glass and the audience is looking at him,
      // which is what the line is about. The voice sits between the two, at the height of a person standing there.
      ...cam.push({ on: B(-0.35, 1.42, -0.70), dist: 1.81, to: 1.48, yaw: 28, pitch: 1, fov: 42 }),
      zone: "bath",
      look: "overworld-day",
      note: "His face close and turned into the mirror, eyes wet, and the sentence six years old: the first thing the power gives him that he wanted.",
      stage: () => (
        <>
          <Hero position={B(-0.35, 0, -0.72)} rotationY={SOUTH - 0.5} animation="idle" face="calm" headPitch={-0.08} />
          <ChestVoice at={B(0.06, 1.40, -1.02)} t={SIX} />
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
