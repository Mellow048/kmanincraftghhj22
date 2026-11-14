import { cam, storyScene } from "../../engine";
import {
  Bell,
  Bits,
  EAST,
  Hero,
  IronGolem,
  PLACE,
  ROBE,
  SOUTH,
  Skeleton,
  Sword,
  Villager,
  Zombie,
  ease,
  jolt,
  pop,
  ramp,
  timing,
  wordAt,
} from "./kit";

const BELL = PLACE.bell;
const SWORD_AT = [9.2, 0, -3.5] as [number, number, number];
const HIT_Z = wordAt("7.zombie", "zombie");
const HIT_S = wordAt("7.skeleton", "skeleton");

/**
 * BEATS 6 and 7 — the night the monsters came, and the two kills.
 *
 * The sword is his father's and it is too big for him; that is the joke and the problem. Both kills
 * land on the word that names them, with a jolt on the hit, so the sound sheet has something exact
 * to sit on.
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The night they came",
  shots: [
    {
      cue: "6.bell",
      ...cam.push({ on: [BELL[0], 1.6, BELL[2] + 0.2], dist: 5.4, to: 4.5, yaw: 10, pitch: -4, fov: 42 }),
      zone: "village",
      look: "lantern-night",
      note: "'Then one night, the bell rang': the bell, low, with a villager's whole weight on the rope. The line is a sound, so the picture is the thing making it.",
      stage: (t) => (
        <>
          <Bell position={BELL} />
          <Villager position={[BELL[0] + 1.5, 0, BELL[2] - 1.2]} rotationY={SOUTH - 0.8} robe={ROBE.brown} lean={0.5 + 0.12 * Math.sin(t * 6)} phase={1.4} />
        </>
      ),
    },
    {
      cue: "6.wall",
      ...cam.push({ on: [22, 3.1, 2.0], dist: 8.2, to: 6.8, yaw: -80, pitch: -18, fov: 46 }),
      zone: "gate",
      look: "lantern-night",
      note: "'Something was on the wall': from the bottom of the wall, looking up. Three shapes standing on top of it, black against the moon, and the golem's head at the left edge, turning.",
      stage: (t) => (
        <>
          <Zombie position={[22.0, 3.0, 0.2]} rotationY={SOUTH - 0.4} phase={0.4} mood="angry" />
          <Skeleton position={[22.0, 3.0, 2.6]} rotationY={SOUTH + 0.2} phase={1.7} />
          <Zombie position={[22.0, 3.0, 4.9]} rotationY={SOUTH + 0.5} phase={2.6} baby />
          <IronGolem position={[19.4, 0, 2.0]} rotationY={EAST - 0.2} headYaw={-0.5} headPitch={-0.25} />
        </>
      ),
    },
    {
      cue: "7.sword",
      ...cam.push({ on: [SWORD_AT[0] - 0.2, 1.15, SWORD_AT[2]], dist: 3.8, to: 3.1, yaw: 44, pitch: 2, fov: 40 }),
      zone: "village",
      look: "lantern-night",
      note: "'I grabbed my father's diamond sword': a blade leaning against the door frame, and a kid's hand closing round a grip that is too long for it. It is the only blue in the film.",
      stage: (t) => (
        <>
          <Sword position={[SWORD_AT[0], 0.5, SWORD_AT[2]]} rotation={[0, 0.4, 0.16]} glow={0.55} />
          <Hero position={[SWORD_AT[0] - 0.5, 0, SWORD_AT[2] + 0.5]} rotationY={SOUTH + 1.1} animation="reach" face="brave" gaze={0} />
        </>
      ),
    },
    {
      cue: "7.zombie",
      ...cam.push({ on: [19.8, 1.4, 2.0], dist: 3.6, to: 3.0, yaw: 100, pitch: 4, fov: 40 }),
      zone: "gate",
      look: "lantern-night",
      note: "'I got the zombie': he swings on the word and the zombie goes over backwards, arms still out. Green on orange, and the wall behind them. One jolt on contact, nothing else shaking.",
      stage: (t) => {
        const hit = HIT_Z;
        return (
          <>
            <Hero
              position={[19.0, 0, 2.0]}
              rotationY={EAST}
              animation={t < hit ? "reach" : "point"}
              face={t < hit ? "brave" : "grin"}
              gaze={0}
              headPitch={jolt(t, hit, 0.06)}
            />
            <Zombie
              position={[20.3 + ease(ramp(t, hit, hit + 0.5)) * 0.7, 0, 1.6]}
              rotationY={SOUTH + 0.9}
              lean={-0.9 * ease(ramp(t, hit, hit + 0.55))}
              walk={ease(ramp(t, hit, hit + 0.5)) * 0.7}
              phase={0.9}
              arms={1}
              mood={t < hit ? "angry" : "scared"}
            />
            <Bits position={[20.2, 1.2, 1.7]} t={t - hit} color="#4f8f3a" count={9} power={1.2} />
          </>
        );
      },
    },
    {
      cue: "7.skeleton",
      ...cam.push({ on: [20.6, 1.35, 3.0], dist: 4.2, to: 3.4, yaw: -58, pitch: -10, fov: 40 }),
      zone: "gate",
      look: "lantern-night",
      note: "'I got the skeleton': the other side of the lens, and the other joke — the skull comes off on the hit and rolls. From below, so the two of them are tall shapes against the moonlit wall.",
      stage: (t) => {
        const hit = HIT_S;
        return (
          <>
            <Skeleton
              position={[20.9, 0, 3.4]}
              rotationY={SOUTH - 0.6}
              headDrop={ease(ramp(t, hit, hit + 0.4)) * 0.55}
              rattle={0.4}
              phase={1.7}
              lean={-0.5 * ease(ramp(t, hit + 0.1, hit + 0.6))}
            />
            <Hero position={[19.4, 0, 2.6]} rotationY={EAST + 0.4} animation={t < hit ? "reach" : "point"} face={t < hit ? "brave" : "grin"} gaze={0} />
            <Bits position={[20.9, 1.55, 3.3]} t={t - hit} color="#d9d3bd" count={10} power={1.1} />
          </>
        );
      },
    },
    {
      cue: "7.proud",
      ...cam.push({ on: [19.0, 1.3, 2.0], dist: 2.2, to: 1.8, yaw: 412, pitch: 2, fov: 36 }),
      zone: "gate",
      look: "lantern-night",
      note: "'I was so proud of myself that I forgot to look behind it': his face, lit by the gate lantern, absolutely delighted. Hold it. The next line is the reason this face is the last happy one.",
      stage: (t) => (
        <>
          <Hero position={[19.0, 0, 2.0]} rotationY={EAST} animation="idle" face="grin" gaze={0} headPitch={-0.04 * Math.sin(t * 3)} />
        </>
      ),
    },
  ],
});

void pop;
