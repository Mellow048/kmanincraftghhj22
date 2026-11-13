import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Bits, Bubble, Bus, Crowd, Dad, Folk, Hero, Hiss, Mum, NORTH, EAST, PEN_X, Postman, Puffs, SHELF_X, WARM, WELL, ZONES,
  dur, ease, faceOf, h, hop, jolt, monsterFace, pop, ramp, timing, wordAt,
} from "./kit";
import type { Kind } from "./kit";

/** Where each of them stands when the village is in a clump in the middle of the big room. */
export const AT = {
  hero: h(0, 0, 1.3),
  mum: h(-1.6, 0, 0.2),
  dad: h(-0.6, 0, -0.4),
  hiss: h(0.6, 0, 0.1),
  post: h(1.9, 0, -0.9),
  bus: h(-3.4, 0, -0.8),
  /** The teacher, at the back, and where he steps out to. */
  teacher0: h(3.4, 0, -1.8),
  teacher: h(2.5, 0, -0.5),
};
/** The rest of the village, behind the family. Room coordinates. */
export const REST: Array<[Kind, number, number, number?]> = [
  ["zombie", -2.6, -1.4],
  ["skeleton", -1.5, -1.9],
  ["creeper", 0.2, -1.7],
  ["zombie", 1.2, -2.2],
  ["skeleton", -3.2, -2.6],
  ["enderman", -0.6, -3.0],
  ["zombie", 2.4, -2.9, 0.76],
  ["creeper", -2.0, -3.2, 0.78],
  ["spider", 3.2, -3.2, 0.8],
];

/** The whole village in its clump. `look` is where their heads point; `up` lifts them in a hop at that time. */
export const Everyone: React.FC<{ t: number; look?: Vec3; mood?: "calm" | "happy" | "scared" | "sad" | "angry"; hopAt?: number; lean?: number; hero?: boolean; teacher?: boolean; bus?: boolean }> = ({
  t, look, mood = "calm", hopAt, lean = 0, hero = true, teacher = true, bus = true,
}) => {
  const up = (i: number): number => (hopAt === undefined ? 0 : hop(t, hopAt + i * 0.05, 0.3, 0.3));
  return (
    <>
      {hero ? <Hero position={[AT.hero[0], up(0), AT.hero[2]]} animation="idle" face={mood === "happy" ? "grin" : mood === "calm" ? "wow" : "uneasy"} lookAt={look} /> : null}
      <Mum position={[AT.mum[0], up(1), AT.mum[2]]} mood={mood} lookAt={look} lean={lean} arms={0.5} />
      <Dad position={[AT.dad[0], up(2), AT.dad[2]]} mood={mood} lookAt={look} lean={lean} />
      <Hiss position={[AT.hiss[0], up(3), AT.hiss[2]]} mood={mood} lookAt={look} lean={lean} />
      <Postman position={AT.post} lookAt={look} lean={lean} />
      {bus ? <Bus position={[AT.bus[0], up(4) * 1.5, AT.bus[2]]} mood={mood} size={1.5} /> : null}
      {teacher ? <Folk kind="enderman" n={0} position={AT.teacher0} lookAt={look} lean={lean} /> : null}
      <Crowd who={REST} dx={h(0, 0, 0)[0]} dz={h(0, 0, 0)[2]} look={look} mood={mood} hopAt={hopAt === undefined ? undefined : hopAt + 0.1} t={t} />
    </>
  );
};

const T = AT.teacher;
const TFACE = monsterFace("enderman", T);

/** THE HIDEOUT, and then the question nobody wants asked, and the doubt. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Where is Mo?",
  shots: [
    {
      cue: "3.room",
      ...cam.push({ on: h(0, 2.2, -1), dist: 15, to: 12.6, yaw: 0, pitch: 7, fov: 46 }),
      zone: ZONES.hide,
      look: WARM,
      note: "The whole room at once, lamps hanging from the beams: a well, shelves to the roof, a fire, pens. The village is a small clump in the middle of it with their heads going round.",
      stage: (t) => <Everyone t={t} look={h(10 * Math.sin(t * 2.2), 3, -6)} />,
    },
    {
      cue: "3.floor",
      ...cam.push({ on: h(-6.45, 0.9, -1.7), dist: 6.0, to: 5.2, yaw: 0, pitch: 11, fov: 44 }),
      zone: ZONES.hide,
      look: WARM,
      note: "The boy jumps on the floor to hear it: wood. Then he sees the well beside him, and the water in it is blue and lit.",
      stage: (t) => {
        const wood = wordAt("3.floor", "wood");
        const well = wordAt("3.floor", "well");
        return (
          <>
            <Hero position={h(-5.75, hop(t, wood - 0.2, 0.35, 0.3), -1.2)} rotationY={-0.2} animation="idle" face={t > well ? "wow" : "grin"} headYaw={-1.1 * ease(ramp(t, well - 0.15, well + 0.1))} headPitch={0.2} />
            <Bits position={h(-5.75, 0.1, -1.2)} t={t - wood - 0.1} color="#c9a877" count={6} power={1.2} />
            <Bits position={[WELL[0], 0.8, WELL[2]]} t={t - well} color="#8fd0ff" count={12} power={2} />
            <Mum position={h(-5.4, 0, -2.9)} rotationY={-0.5} mood="happy" lookAt={[WELL[0], 0.7, WELL[2]]} arms={0.5} />
          </>
        );
      },
    },
    {
      cue: "3.food",
      ...cam.push({ on: h(SHELF_X, 1.3, -6.6), onTo: h(SHELF_X, 3.9, -6.6), dist: 5.6, to: 5.6, yaw: 0, pitch: -6, fov: 44 }),
      zone: ZONES.hide,
      look: WARM,
      note: "The camera climbs the shelves, bread and melons and apples, row over row, all the way to the beams. Mum and dad at the foot of them with their heads tipped right back.",
      stage: (t, { p }) => (
        <>
          <Mum position={h(SHELF_X - 0.7, 0, -4.6)} rotationY={NORTH} nod={-0.2 - 0.6 * p} mood="happy" arms={0.4} />
          <Dad position={h(SHELF_X + 0.7, 0, -4.4)} rotationY={NORTH} nod={-0.2 - 0.6 * p} mood="happy" />
        </>
      ),
    },
    {
      cue: "3.animals",
      ...cam.truck({ on: h(6, 0.8, -3.6), dist: 4.8, yaw: 0, pitch: 9, fov: 42, by: [7, 0, 0] }),
      ease: "linear",
      zone: ZONES.hide,
      look: WARM,
      note: "Along the three pens, each one as it is named: chickens, cows, and the pigs from the farm upstairs. The boy runs along the rail with his head turned to them.",
      stage: (t, { p }) => {
        const pigs = wordAt("3.animals", "pigs");
        return (
          <>
            <Hero position={h(5.3 + 7 * p, hop(t, pigs, 0.3, 0.3), -2.0)} rotationY={EAST} animation="run" animDistance={7 * p} face={t > pigs ? "laugh" : "grin"} headYaw={1.2} />
            <Bits position={h(PEN_X[2], 0.6, -4.2)} t={t - pigs} color="#f0a6a2" count={8} power={1.6} />
          </>
        );
      },
    },
    {
      cue: "3.cheer",
      ...cam.push({ on: h(-5.6, 1.2, -1.4), dist: 10, to: 9.2, yaw: 0, pitch: 15, fov: 46 }),
      zone: ZONES.hide,
      look: WARM,
      note: "They all go up in the air together. Then the bus takes a run, leaves the floor, and comes down in the well. Water everywhere.",
      impacts: [{ at: 1.72, amp: 0.06, dur: 0.3 }],
      stage: (t) => {
        const jump = wordAt("3.cheer", "jumped");
        const k = ramp(t, jump, jump + 0.42);
        const bx = -4.2 + (WELL[0] - h(0, 0, 0)[0] + 4.2) * k;
        const bz = -0.4 + (-2.4 + 0.4) * k;
        const by = k < 1 ? 1.9 * 4 * k * (1 - k) + 0.45 * k : 0.45;
        const land = jump + 0.42;
        const cheer = (i: number): number => (t < jump ? Math.abs(Math.sin((t + i * 0.13) * 9)) * 0.25 : 0);
        return (
          <>
            <Mum position={h(-5.2, cheer(0), 0.6)} mood="happy" wave={1} lookAt={t > jump ? [WELL[0], 1, WELL[2]] : undefined} />
            <Dad position={h(-3.9, cheer(1), 0.2)} mood="happy" wave={1} rattle={0.5} lookAt={t > jump ? [WELL[0], 1, WELL[2]] : undefined} />
            <Hiss position={h(-6.3, cheer(2), 0.9)} mood="happy" lookAt={t > jump ? [WELL[0], 1, WELL[2]] : undefined} />
            <Hero position={h(-4.6, cheer(3), 1.3)} animation="wave" face="laugh" />
            <Folk kind="zombie" n={0} position={h(-3.6, cheer(4), -1.5)} mood="happy" wave={1} />
            <Folk kind="skeleton" n={1} position={h(-7.3, cheer(5), 0.3)} mood="happy" wave={1} />
            <Bus position={h(bx, by, bz)} rotationY={-0.6} squash={t > land ? Math.sin((t - land) * 16) * Math.exp(-(t - land) * 4) * 0.3 : -0.1 * Math.sin(k * Math.PI)} mood="happy" size={1.5} />
            <Bits position={[WELL[0], 0.9, WELL[2]]} t={t - land} color="#8fd0ff" count={22} power={4.4} />
            <Bits position={[WELL[0], 0.9, WELL[2]]} t={t - land - 0.05} color="#d8f0ff" count={12} power={3} seed={4} />
          </>
        );
      },
    },
    {
      cue: "3.hiss",
      ...cam.push({ on: monsterFace("creeper", AT.hiss), dist: 3.7, to: 3.0, yaw: 8, pitch: 2, fov: 40 }),
      zone: ZONES.hide,
      look: WARM,
      note: "Hiss, in the middle of the cheering, looking one way and then the other for somebody. Then the two words, in a bubble, and everybody behind him stops moving.",
      stage: (t) => {
        const where = wordAt("3.hiss", "where");
        const look = t > 0.4 && t < 1.2 ? Math.sin((t - 0.4) * 7.8) : 0;
        const party = (i: number): number => (t < where ? Math.abs(Math.sin((t + i * 0.2) * 8)) * 0.2 : 0);
        return (
          <>
            <Hiss position={AT.hiss} turn={1.0 * look} mood={t > where ? "sad" : "calm"} tilt={jolt(t, where, 0.3)} />
            <Bubble text="WHERE IS MO?" position={[AT.hiss[0], monsterFace("creeper", AT.hiss)[1] + 0.62, AT.hiss[2] + 0.3]} rotationY={0.14} scale={0.34 * pop(t, where - 0.06)} tail={0} dark />
            <Mum position={[AT.mum[0] + 0.3, party(0), AT.mum[2] - 1.2]} mood={t > where ? "sad" : "happy"} wave={t > where ? 0 : 1} />
            <Dad position={[AT.dad[0] + 2.4, party(1), AT.dad[2] - 0.9]} mood={t > where ? "sad" : "happy"} wave={t > where ? 0 : 1} />
          </>
        );
      },
    },
    {
      cue: "3.knew",
      ...cam.push({ on: faceOf(AT.hero), dist: 2.2, to: 4.8, yaw: 0, pitch: 4, fov: 40 }),
      zone: ZONES.hide,
      look: WARM,
      note: "The boy's face going down to look at his own shoes. The camera backs off him, and mum and dad are either side, looking at him; on 'knew' their heads go down too.",
      stage: (t) => {
        const down = 0.55 * ease(ramp(t, 0.1, 0.5));
        const knew = wordAt("3.knew", "knew");
        const k = 0.5 * ease(ramp(t, knew - 0.3, knew + 0.1));
        return (
          <>
            <Hero position={AT.hero} animation="idle" face="frown" headPitch={down} gaze={0} />
            <Mum position={h(-1.15, 0, 0.5)} rotationY={0.5} mood="sad" nod={k} turn={0.4 * (1 - k * 2)} arms={0.2} />
            <Dad position={h(1.15, 0, 0.5)} rotationY={-0.5} mood="sad" nod={k} turn={-0.4 * (1 - k * 2)} />
            <Hiss position={h(0.6, 0, -0.9)} mood="sad" nod={k} />
            <Folk kind="zombie" n={0} position={h(-0.7, 0, -1.2)} mood="sad" nod={k} />
          </>
        );
      },
    },
    {
      cue: "4.ender",
      ...cam.push({ on: TFACE, dist: 4.7, to: 3.8, yaw: -18, pitch: -10, fov: 42 }),
      zone: ZONES.hide,
      look: WARM,
      note: "From below: one enderman steps out of the back of the crowd, the tallest thing in the room. It is the teacher from the school.",
      stage: (t) => {
        const k = ease(ramp(t, 0.2, 1.3));
        const at: Vec3 = [AT.teacher0[0] + (T[0] - AT.teacher0[0]) * k, 0, AT.teacher0[2] + (T[2] - AT.teacher0[2]) * k];
        return (
          <>
            <Folk kind="enderman" n={0} position={at} rotationY={-0.5} walk={1.6 * k} nod={0.3} />
            <Folk kind="zombie" n={4} position={h(4.6, 0, -2.4)} rotationY={-0.8} mood="sad" lookAt={TFACE} />
            <Folk kind="skeleton" n={3} position={h(3.9, 0, -3.3)} rotationY={-0.6} mood="sad" lookAt={TFACE} />
          </>
        );
      },
    },
    {
      cue: "4.trap",
      ...cam.push({ on: TFACE, dist: 2.9, to: 2.3, yaw: -10, pitch: -6, fov: 38 }),
      zone: ZONES.hide,
      look: WARM,
      note: "His face, close, purple eyes. His jaw comes open on the word, and the word hangs over him.",
      impacts: [{ at: 0.6, amp: 0.04, dur: 0.3 }],
      stage: (t) => {
        const trap = wordAt("4.trap", "trap");
        return (
          <>
            <Folk kind="enderman" n={0} position={T} rotationY={-0.3} jaw={t > trap - 0.1 && t < trap + 0.5 ? 0.7 : 0.15} nod={0.2} />
            <Bubble text="A TRAP." position={[T[0], TFACE[1] + 0.52, T[2] + 0.3]} rotationY={-0.17} scale={0.38 * pop(t, trap - 0.08)} tail={0} dark />
          </>
        );
      },
    },
    {
      cue: "4.why",
      ...cam.push({ on: h(-0.5, 1.35, 0), dist: 5.7, to: 5.0, yaw: -8, pitch: 4, fov: 42 }),
      zone: ZONES.hide,
      look: WARM,
      note: "The ones he is saying it to: mum, dad, Hiss, the boy in front. They were looking at him. On 'player' they start looking at each other.",
      stage: (t) => {
        const turn = ease(ramp(t, wordAt("4.why", "player"), wordAt("4.why", "himself")));
        return (
          <>
            <Mum position={AT.mum} mood="scared" turn={0.9 - 1.3 * turn} arms={0.3} />
            <Dad position={AT.dad} mood="scared" turn={0.9 - 1.6 * turn} rattle={0.3 * turn} />
            <Hiss position={AT.hiss} mood="scared" turn={0.9 - 1.9 * turn} />
            <Hero position={h(-0.5, 0, 1.3)} animation="idle" face="uneasy" headYaw={0.9 * (1 - turn)} headPitch={0.3 * turn} />
            <Folk kind="zombie" n={0} position={h(-2.4, 0, -1.2)} mood="scared" turn={0.9 - 1.4 * turn} />
          </>
        );
      },
    },
    {
      cue: "4.hole",
      ...cam.push({ on: h(0, 0.8, 0.1), dist: 3.7, to: 4.25, yaw: 0, pitch: 70, fov: 46 }),
      zone: ZONES.hide,
      look: WARM,
      note: "What he means, shown: the camera is up where the door is, looking straight down, and the whole village is one small knot on the floor, every face turned up at us. All of them, in one hole.",
      stage: (t, { p }) => {
        const eye = h(0, 5, 1.6);
        const s = 1.25 - 0.25 * p;
        const at = (x: number, z: number): Vec3 => h(x * s, 0, z * s);
        return (
          <>
            <Hero position={at(0, 1.0)} animation="idle" face="fear" lookAt={eye} />
            <Mum position={at(-0.6, 0.15)} mood="scared" lookAt={eye} arms={0.2} />
            <Dad position={at(0.6, 0.15)} mood="scared" lookAt={eye} rattle={0.4} />
            <Hiss position={at(0, -0.65)} mood="scared" lookAt={eye} />
            <Folk kind="zombie" n={0} position={at(-0.65, -1.25)} mood="scared" lookAt={eye} arms={0.2} />
            <Folk kind="skeleton" n={1} position={at(0.65, -1.3)} mood="scared" lookAt={eye} />
            <Folk kind="creeper" n={3} position={at(-0.75, 1.5)} scale={0.78} mood="scared" lookAt={eye} />
            <Folk kind="zombie" n={2} position={at(0.75, 1.6)} scale={0.76} mood="scared" lookAt={eye} arms={0.2} />
          </>
        );
      },
    },
    {
      cue: "4.silent",
      ...cam.push({ on: faceOf(AT.hero), dist: 2.3, to: 1.9, yaw: -12, pitch: 0, fov: 38 }),
      zone: ZONES.hide,
      look: WARM,
      note: "The boy. His mouth shut, his eyes going from one of them to the next.",
      stage: (t) => <Hero position={AT.hero} animation="idle" face="uneasy" headPitch={0.12} headYaw={0.15 * Math.sin(t * 5)} saccade={false} gaze={t < 0.55 ? -1 : 1} />,
    },
    {
      cue: "4.think",
      ...cam.push({ on: h(0, 1.8, 0), dist: 7.0, to: 6.4, yaw: 0, pitch: 3, fov: 42 }),
      zone: ZONES.hide,
      look: WARM,
      note: "Four of them in a row, and the same thought arriving over each head in turn, left to right, a bubble at a time.",
      stage: (t) => {
        const at = [wordAt("4.think", "one"), wordAt("4.think", "one", 1), wordAt("4.think", "everybody"), wordAt("4.think", "started")];
        const xs = [-1.5, -0.5, 0.5, 1.5];
        const mood = (i: number): "calm" | "scared" => (t > at[i] ? "scared" : "calm");
        return (
          <>
            <Mum position={h(xs[0], 0, 0)} mood={mood(0)} tilt={jolt(t, at[0], 0.3)} arms={0.3} />
            <Dad position={h(xs[1], 0, 0)} mood={mood(1)} tilt={jolt(t, at[1], 0.3)} />
            <Hiss position={h(xs[2], 0, 0)} mood={mood(2)} tilt={jolt(t, at[2], 0.3)} />
            <Folk kind="zombie" n={0} position={h(xs[3], 0, 0)} mood={mood(3)} tilt={jolt(t, at[3], 0.3)} arms={0.3} />
            {xs.map((x, i) => (
              <Bubble key={i} text="TRAP?" position={h(x, 2.42 + (i % 2) * 0.36, 0.4)} scale={0.58 * pop(t, at[i] - 0.05)} tail={0} dark />
            ))}
          </>
        );
      },
    },
    {
      cue: "4.looks",
      ...cam.truck({ on: h(-1.5, 1.5, 0), dist: 4.4, yaw: 0, pitch: 3, fov: 40, by: [2, 0, 0] }),
      ease: "linear",
      zone: ZONES.hide,
      look: WARM,
      note: "Along the same row. Mum's head turns to the ladder. Dad's turns to the shelves. And Hiss, at the end, starts to swell and flash, and the zombie next to him leans away.",
      stage: (t) => {
        const mum = wordAt("4.looks", "looked");
        const dad = wordAt("4.looks", "looked", 1);
        const hiss = wordAt("4.looks", "started");
        const fuse = t > hiss ? Math.min(1, (t - hiss) / 0.8) * (0.7 + 0.3 * Math.sin((t - hiss) * 28)) : 0;
        return (
          <>
            <Mum position={h(-1.5, 0, 0)} mood="scared" turn={1.1 * ease(ramp(t, mum - 0.1, mum + 0.2))} arms={0.3} />
            <Dad position={h(-0.5, 0, 0)} mood="scared" turn={-1.1 * ease(ramp(t, dad - 0.1, dad + 0.2))} rattle={0.3} />
            <Hiss position={h(0.5, 0, 0)} mood="scared" fuse={fuse} scale={1 + 0.14 * fuse} />
            <Folk kind="zombie" n={0} position={h(1.55 + 0.35 * fuse, 0, 0)} mood="scared" tilt={-0.3 * fuse} lookAt={h(0.5, 1.4, 0)} arms={0.3} />
            {t > hiss ? <Puffs position={h(0.5, 1.7, 0.1)} color="#f4fff0" count={6} rise={0.9} spread={0.3} size={0.07} speed={1.6} opacity={0.8} /> : null}
          </>
        );
      },
    },
  ],
});
