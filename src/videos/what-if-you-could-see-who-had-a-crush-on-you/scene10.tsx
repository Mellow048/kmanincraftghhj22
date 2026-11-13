import type React from "react";
import { Block, cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Ben, Card, Classmate, Dad, Dog, EAST, GYM, GymTeacher, HEART, Heart, Held, Hero, HeroInTie, Lily, MathTeacher, Mia, NORTH, SOUTH, SoundRings, TALL, Tie, WEST, ease, jolt, ramp, room, timing, wordAt } from "./kit";

const NIGHT = wordAt("10.dance", "night");
const CARD_W = wordAt("10.card", "card");
const YES = wordAt("10.dog", "yes");
const TIE_W = wordAt("10.tie", "tie");
const KNEES = wordAt("10.tie", "knees");
const NOT_COMING = wordAt("10.jo", "not");

/** The question, in six letters: all that fits on a card that a phone can read. */
export const QUESTION = "DANCE?";
/** Ink that still reads under a lamp. */
export const INK = "#141c44";

/** His desk (world.tsx puts it there), and the card on it. */
const DESK = room(-0.7, 0, -2.0);
const ON_DESK: Vec3 = [DESK[0], 0.668, DESK[2] + 0.08];
/** The floor of his room: he kneels to the dog. */
const HE_KNEELS = room(0.38, 0, 0.6);
const DOG_SITS = room(1.2, 0, 0.6);
const HE_STANDS = room(0.55, 0, 0.35);

type Spot = [x: number, z: number, who: number, phase: number];
/** The far half of the floor, behind whoever stands under the lights. */
const BACK: Spot[] = [
  [-1.3, -2.2, 6, 0.4],
  [1.4, -1.8, 9, 1.9],
  [0.55, -3.8, 1, 2.7],
  [-0.75, -4.6, 11, 0.9],
  [2.4, -3.6, 4, 3.3],
  [-2.5, -3.9, 7, 1.4],
  [-0.2, -6.2, 10, 2.2],
  [1.5, -5.6, 3, 0.2],
  [-1.6, -6.0, 5, 1.1],
];
/** Down both sides, from the lights to the door. */
const SIDES: Spot[] = [
  [-2.4, -0.4, 8, 2.5],
  [2.5, 0.3, 10, 0.7],
  [-3.6, 1.6, 3, 1.6],
  [3.7, 1.9, 6, 3.0],
  [-2.2, 3.3, 9, 0.3],
  [2.3, 3.6, 1, 2.0],
  [-3.4, 5.2, 4, 1.2],
  [3.2, 5.6, 7, 2.9],
  [-1.7, 6.4, 11, 0.8],
  [1.8, 6.9, 5, 1.7],
];
/** The ones he has to walk between: a metre either side of the way in from the door. */
const AISLE: Spot[] = [
  [-0.95, 3.4, 7, 2.3],
  [1.05, 4.3, 11, 0.5],
  [-1.0, 5.2, 3, 1.4],
  [1.1, 6.3, 8, 2.6],
  [-1.15, 7.8, 6, 0.1],
  [1.0, 8.7, 9, 1.9],
];

/**
 * WHO IS AT THE DANCE. Everybody jumping, in three groups: the far half of the floor, the two sides, and the ones a
 * metre either side of the way in (`aisle`). `keep` drops the ones a shot does not want between its lens and its
 * people: it is given each dancer's place on the floor. The middle of the floor is left to the one who stands still.
 */
export const Dancers: React.FC<{ t: number; aisle?: boolean; pair?: boolean; keep?: (x: number, z: number) => boolean }> = ({ t, aisle = false, pair = true, keep = () => true }) => (
  <>
    {[...BACK, ...SIDES, ...(aisle ? AISLE : [])]
      .filter(([x, z]) => keep(x, z))
      .map(([x, z, who, phase], i) => {
        const hop = Math.abs(Math.sin(t * 5.2 + phase)) * 0.1;
        return (
          <Classmate
            key={`${x}${z}`}
            who={who}
            position={GYM.at(x + Math.sin(t * 1.3 + phase) * 0.12, hop, z)}
            rotationY={phase * 2 + Math.sin(t * 2.1 + phase) * 0.7}
            animation="idle"
            arms={i % 3 === 0 ? "wave" : "cheer"}
            face={i % 3 ? "grin" : "laugh"}
            phase={phase}
          />
        );
      })}
    {/* the two it worked for, and the two teachers by the wall */}
    {pair ? (
      <>
        <Ben position={GYM.at(-1.25, Math.abs(Math.sin(t * 5.2)) * 0.07, -3.4)} rotationY={EAST} animation="idle" arms="cheer" face="grin" />
        <Lily position={GYM.at(-0.5, Math.abs(Math.sin(t * 5.2 + 1.2)) * 0.07, -3.4)} rotationY={WEST} animation="idle" arms="cheer" face="laugh" />
      </>
    ) : null}
    <MathTeacher position={GYM.at(-6.6, 0, 1.2)} rotationY={EAST - 0.3} animation="idle" face="grin" />
    <GymTeacher position={GYM.at(-6.6, 0, 2.0)} rotationY={EAST + 0.3} animation="idle" arms="wave" face="grin" />
  </>
);

/**
 * FRIDAY. The plan, in four props: a card, a dog, a tie, a dance. Fast and funny, because the next beat is not.
 * The last picture of it is an empty gate: Jo is not coming.
 */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "Friday",
  shots: [
    {
      cue: "10.dance",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 2.3, 10.4), dist: 12.5, to: 8.2, yaw: 3, pitch: 1, fov: 46 }),
      shake: 0.01,
      zone: "gym",
      note: "Night. The lens runs up the path to the gym: the door open and gold, DANCE over it, the windows lit, kids running in ahead of us and the music coming out in rings.",
      stage: (t) => (
        <>
          <Classmate who={6} {...stride(GYM.at(-0.5, 0, 16.5), GYM.at(-0.35, 0, 11.4), ramp(t, -0.2, 1.6))} animation="run" face="grin" />
          <Classmate who={1} {...stride(GYM.at(0.55, 0, 18.2), GYM.at(0.4, 0, 12.6), ramp(t, -0.2, 1.6))} animation="run" face="laugh" phase={0.5} />
          <Classmate who={9} position={GYM.at(1.5, Math.abs(Math.sin(t * 6)) * 0.08, 11.3)} rotationY={WEST + 0.5} animation="idle" arms="wave" face="grin" />
          {[0, 0.42].map((d) => (
            <SoundRings key={d} position={GYM.at(0, 1.7, 10.7)} t={((t + d) % 0.84) / 1.3} color="#ffe2a0" reach={2.2} />
          ))}
          <SoundRings position={GYM.at(0, 1.7, 10.7)} t={(t - NIGHT) / 1.2} color="#ffffff" reach={3} />
        </>
      ),
    },
    {
      cue: "10.card",
      look: "overworld-night",
      ...cam.top({ on: [ON_DESK[0], 0.67, ON_DESK[2] + 0.1], height: 1.7, to: 1.45, spin: [-4, 2], fov: 40 }),
      handheld: 0.006,
      zone: "room",
      note: "Straight down on his desk, in the lamp: the card, his two hands, a pencil, and the question going on letter by letter until it is all there on 'card'. It is one word, because that is all the room there is.",
      stage: (t) => {
        const written = 1 + (QUESTION.length - 1) * ramp(t, 0.1, CARD_W - 0.05);
        const done = written >= QUESTION.length;
        // Where the next letter goes: the pencil's point is on it, and lifts off when the word is done.
        const x = ON_DESK[0] - 0.17 + 0.34 * (Math.min(written, QUESTION.length) / QUESTION.length);
        return (
          <>
            {/* He sits well back: from straight above, a head of dark hair any nearer the card is a black square under the caption. */}
            <Hero position={[DESK[0], 0, DESK[2] + 0.76]} rotationY={NORTH} animation="sit" arms="hold" face="brave" headPitch={0.3} />
            <Card position={ON_DESK} rotation={[-Math.PI / 2, 0, 0]} text={QUESTION} written={written} scale={1.2} ink={INK} />
            <group position={[x + Math.sin(t * 38) * (done ? 0 : 0.006), 0.75 + (done ? 0.05 : 0), ON_DESK[2] + 0.09 + Math.cos(t * 31) * (done ? 0 : 0.006)]} rotation={[-0.95, 0, 0.35]}>
              <Block size={[0.024, 0.024, 0.17]} color="#f2c230" castShadow={false} />
              <Block position={[0, 0, -0.095]} size={[0.02, 0.02, 0.03]} color="#3a2c1c" castShadow={false} />
              <Block position={[0, 0, 0.095]} size={[0.026, 0.026, 0.02]} color="#d86a6a" castShadow={false} />
            </group>
          </>
        );
      },
    },
    {
      cue: "10.dog",
      look: "overworld-night",
      ...cam.push({ on: room(0.8, 0.7, 0.6), dist: 3.1, to: 2.75, yaw: 16, pitch: 6, fov: 42 }),
      handheld: 0.012,
      impacts: [{ at: YES, amp: 0.04, dur: 0.3 }],
      zone: "room",
      note: "The floor of his room, the two of them nose to nose: he kneels and holds the card out to the dog with his eyes screwed shut. The dog has its head on one side. On 'yes' it jumps and barks and its tail goes like a fan, and both his fists go up.",
      stage: (t) => {
        const yes = t - YES;
        const hop = yes > 0 ? 0.22 * Math.abs(Math.sin(yes * 9)) * Math.exp(-yes * 2.2) : 0;
        const dog: Vec3 = [DOG_SITS[0], hop, DOG_SITS[2]];
        return (
          <>
            {/* Both turned a third of the way to the lens: side on, a head is the side of a box. */}
            <Hero position={HE_KNEELS} rotationY={EAST - 0.6} animation="crouch" arms={yes > 0.12 ? "cheer" : "reach"} face={yes > 0.05 ? "grin" : "fear"} gaze={0} />
            {/* The room's own night light comes from behind the lens and is blue; this is the lamp, on his face. */}
            <pointLight position={room(1.9, 1.3, 2.2)} color="#ffe2b8" intensity={14} distance={6} decay={2} />
            {yes > 0.12 ? null : (
              <Held by={HE_KNEELS} facing={EAST - 0.85} out={0.44} up={0.72}>
                <Card text={QUESTION} scale={0.95} ink={INK} />
              </Held>
            )}
            <Dog position={dog} rotationY={WEST + 0.4} pose={yes > 0 ? "stand" : "sit"} wag={yes > 0 ? 5 : 1.2} headTilt={yes > 0 ? 0 : 0.28} headPitch={-0.25} bark={yes > 0 && yes < 0.5} />
            <Heart over={dog} tall={TALL.dogSitting} size={HEART.small} yaw={16} />
          </>
        );
      },
    },
    {
      cue: "10.tie",
      look: "overworld-night",
      ...cam.push({ on: [HE_STANDS[0], 1.2, HE_STANDS[2]], onTo: [HE_STANDS[0], 0.45, HE_STANDS[2]], dist: 2.5, to: 2.15, yaw: 6, pitch: 3, fov: 40 }),
      handheld: 0.01,
      zone: "room",
      note: "His dad's tie, on him: he pulls the knot up under his chin, proud, with his dad right behind him in an open collar, looking down at it. Then the lens goes down the tie, and down, to where it ends on 'knees'.",
      stage: (t) => {
        const knot = ramp(t, 0.15, TIE_W) - ramp(t, TIE_W + 0.2, TIE_W + 0.5);
        const down = ease(ramp(t, KNEES - 0.6, KNEES));
        return (
          <>
            <Hero position={HE_STANDS} rotationY={SOUTH} animation="idle" arms={knot > 0.3 ? "hug" : undefined} face={down > 0.5 ? "uneasy" : "brave"} headPitch={0.5 * down} gaze={0} />
            <Tie position={HE_STANDS} rotationY={SOUTH} scale={0.8} reach={0.25} sway={Math.sin(t * 3.1) * 0.05 + jolt(t, KNEES, 0.25)} />
            <Dad position={[HE_STANDS[0] + 0.17, 0, HE_STANDS[2] - 0.9]} rotationY={SOUTH - 0.1} animation="idle" arms="shrug" face="uneasy" headPitch={0.3} />
          </>
        );
      },
    },
    {
      cue: "10.lights",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0, 1.5, 0), dist: 8.2, to: 4.4, yaw: 5, pitch: 4, fov: 44 }),
      handheld: 0.015,
      zone: "gym",
      note: "The dance, from the door, and in through it: everybody jumping in the coloured light, and in the middle of the floor, in the one white beam, Mia, standing still. The lens goes between the dancers all the way to her. The heart over her is small.",
      stage: (t) => (
        <>
          {/* The lens goes in along the right of the aisle: nobody dances with an arm up within a metre of it. */}
          <Dancers t={t} aisle keep={(x, z) => !(x > 0.5 && x < 1.6 && z > 3.8)} />
          <Mia position={GYM.lights} rotationY={SOUTH} animation="idle" face="smile" headRoll={Math.sin(t * 2.6) * 0.1} headYaw={Math.sin(t * 1.3) * 0.25} gaze={0} />
          <Heart over={GYM.lights} size={HEART.small} yaw={5} />
        </>
      ),
    },
    {
      cue: "10.jo",
      look: "overworld-night",
      ...cam.push({ on: GYM.at(0.35, 1.45, 17), dist: 14.6, to: 13.6, yaw: 180, pitch: 0, fov: 40 }),
      handheld: 0.012,
      zone: "gym",
      note: "The other way: out of the door, down the dark path to the gate and its one lamp. Nobody is there. He stands in the doorway and looks, and on 'not coming' he turns his back on it and faces the room.",
      stage: (t) => {
        const turn = ease(ramp(t, NOT_COMING - 0.15, NOT_COMING + 0.3));
        return (
          <>
            <HeroInTie t={t} position={GYM.at(-0.5, 0, 9.1)} rotationY={SOUTH + Math.PI * turn} animation="idle" face={turn > 0.5 ? "brave" : "uneasy"} headYaw={0.3 * (1 - turn)} gaze={0} />
            <Classmate who={6} position={GYM.at(2.6, Math.abs(Math.sin(t * 5.2)) * 0.08, 6.4)} rotationY={WEST} animation="idle" arms="cheer" face="grin" />
            <Classmate who={1} position={GYM.at(-2.7, Math.abs(Math.sin(t * 5.2 + 1)) * 0.08, 6.9)} rotationY={EAST} animation="idle" arms="wave" face="laugh" />
          </>
        );
      },
    },
  ],
});
