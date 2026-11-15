import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Crate, Dad, EAST, GATE_EYE, Glow, Hero, IronBlock, IronGolem, Kid, NORTH, PLACE, Piglin, Puffs, Pumpkin, ROBE, SOUTH, SnowBlock, SnowCover, SnowGolem, Snowfall,
  Villager, WEST, beside, ease, jolt, pop, ramp, timing, wordAt,
} from "./kit";

/** The town's golems, on an ordinary day: [x, z, facing, metres a second]. */
const TOWN: Array<[number, number, number, number]> = [
  [-9, 1.2, EAST, 1.0], [-5.5, 3.6, WEST, 0.9], [-1, 0.6, EAST, 1.1], [3.5, 3.9, WEST, 1.0], [8, 1.4, EAST, 0.9], [13, 3.2, WEST, 1.0], [18.5, 1.0, EAST, 1.0],
  [-12.5, -1.6, SOUTH, 0], [-6.5, 5.9, NORTH, 0], [3.6, -1.7, SOUTH, 0], [7.2, 6.1, NORTH, 0], [12.6, -1.5, SOUTH, 0], [17, 6.0, NORTH, 0], [22.5, -1.2, SOUTH, 0], [24, 4.6, WEST, 0],
];

/** Where a golem is put together, in front of the bell. */
const SPOT: Vec3 = [0.2, 0, 1.2];
/** When the gate lights, in the shot that shows what comes out of it. */
const LIT = wordAt("2.lit", "lit");
const PIGS_OUT = wordAt("2.lit", "piglins") - 0.2;
/** The three that come out: [how far across the gate, how long after the first]. */
const PIGS: Array<[number, number]> = [[0, 0], [-0.75, 0.45], [0.7, 0.85]];
const DEFEAT = wordAt("2.fight", "defeat");
/** The two golems that do the work on the hill top, in both shots of it. */
const G1: Vec3 = [39.3, 6, 2.6];
const G2: Vec3 = [39.0, 6, 0.6];
/** The golem the first piglin picks a fight with: further from the gate, so the gate stays out of that picture. */
const F1: Vec3 = [38.25, 6, 2.6];
const THROW = wordAt("2.gate", "throw");
const EVERY_ONE = wordAt("2.gate", "one");
const BACK = wordAt("2.gate", "back");
const FOUR = wordAt("2.build", "four");
const A_PUMPKIN = wordAt("2.build", "pumpkin");
const RAN = wordAt("2.ran", "ran");
/** In front of his own house, the day it snowed. */
const YARD: Vec3 = [9.4, 0, -0.6];
const ONE = wordAt("2.snow", "one");
const HAPPY = wordAt("2.snow", "happy");

/** A block that drops into place at `at`. */
const drop = (t: number, at: number, from = 1.6) => (1 - ease(ramp(t, at - 0.16, at))) * from;

const Winter = () => (
  <>
    <SnowCover />
    <Snowfall center={[9, 4.2, 0.5]} area={[12, 9, 10]} count={170} seed={4} />
  </>
);

/** THE RULE. What the golems are for, how a golem is made, and the year the iron ran out. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "The rule",
  shots: [
    {
      cue: "2.why",
      ...cam.pan({ from: [24.2, 1.6, 4.0], on: [27.4, 1.5, 2.1], onTo: [GATE_EYE[0], GATE_EYE[1] - 0.4, 2], fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "'On the hill over our town stood an old black gate': an iron golem stands guard at the foot of the hill with a kid beside it, both looking up. Tilt up over them: six steps of road, and on top a frame of black stone with nothing in it.",
      stage: (t) => (
        <>
          <IronGolem position={[27.6, 0, 2.6]} rotationY={EAST - 0.25} headPitch={-0.3} headYaw={0.15 * Math.sin(t * 0.9)} />
          <Kid n={2} position={[26.6, 0, 1.3]} rotationY={EAST + 0.2} animation="idle" headPitch={-0.35} />
        </>
      ),
    },
    {
      cue: "2.lit",
      ...cam.push({ on: [40.9, 7.35, 2], dist: 7.2, to: 5.9, yaw: -74, pitch: 3, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'Once a year, it lit up, and piglins came out to attack our town': the gate from in front of it, on the top of the hill, black and empty. On 'lit' it fills with purple. On 'piglins' three of them walk out of it one after another with their gold swords up, straight at the lens.",
      stage: (t) => (
        <>
          {PIGS.map(([z, wait], i) => {
            const since = t - (PIGS_OUT + wait);
            return since > 0 ? (
              <Piglin key={i} position={[GATE_EYE[0] + 0.25 - 1.15 * since, 6, 2 + z]} rotationY={WEST} walk={1.15 * since + i * 0.4} sword raise={0.6 + 0.2 * Math.sin(t * 9 + i * 2)} headPitch={0.1} seed={i} />
            ) : null;
          })}
          {t > LIT ? <Puffs position={[GATE_EYE[0] - 0.5, 6.4, 2]} color="#b06aff" count={8} rise={3.2} spread={1.1} size={0.16} speed={0.9} opacity={0.7} seed={6} /> : null}
        </>
      ),
    },
    {
      cue: "2.fight",
      ...cam.push({ on: [39.0, 7.7, 2.4], dist: 9.0, to: 8.0, yaw: 8, pitch: 3, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'So every year, we needed our golems to defeat the piglins': from the side, on the hill top. A piglin hacks at an iron golem's shin with its gold sword and nothing happens. The golem looks down at it. On 'defeat' the iron arms come down, take hold of it and lift it clean over the golem's head, kicking. The piglin behind sees that, drops its sword arm and turns to run.",
      stage: (t) => {
        const grab = ease(ramp(t, DEFEAT - 0.3, DEFEAT - 0.05));
        const lift = ease(ramp(t, DEFEAT, DEFEAT + 0.45));
        const flee = ease(ramp(t, DEFEAT + 0.2, DEFEAT + 0.5));
        const chop = 0.42 + 0.3 * Math.sin(t * 13);
        const arm = -1.25 * grab - 1.65 * lift;
        const kick = lift > 0.9 ? 0.12 * Math.sin(t * 16) : 0;
        return (
          <>
            <IronGolem position={F1} rotationY={EAST} armR={arm} armL={arm} headPitch={0.45 * (1 - lift) - 0.2 * lift} />
            <Piglin position={[F1[0] + 1.2 - 0.8 * lift, 6 + 2.5 * lift, F1[2]]} rotationY={WEST} rotation={[-1.45 * lift + kick, 0, 0]} sword={grab < 0.5} raise={grab > 0.5 ? 0 : chop} scared={grab} headPitch={0.05} seed={1} />
            <Piglin position={[40.6 + 1.2 * ramp(t, DEFEAT + 0.35, DEFEAT + 1.0), 6, 1.7]} rotationY={WEST + Math.PI * flee} walk={t < DEFEAT ? 0 : 3 * (t - DEFEAT)} sword raise={0.55 * (1 - flee)} scared={flee} headPitch={-0.3 * flee} seed={2} />
          </>
        );
      },
    },
    {
      cue: "2.gate",
      ...cam.push({ on: [40.0, 8.0, 2.0], dist: 11.6, to: 10.8, yaw: -35, pitch: 4, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'And throw every one of them back in': the two iron golems on the hill top, each with a piglin over its head. On 'throw' the first one goes, arms and legs out, into the purple and is gone; on 'one', the second. The third looks up at them going over, and on 'back' runs in by himself.",
      stage: (t) => {
        /** One piglin, from over a golem's head into the middle of the gate. */
        const thrown = (from: Vec3, at: number) => {
          const k = ramp(t, at, at + 0.32);
          const p: Vec3 = [from[0] + 0.4 + (GATE_EYE[0] - from[0] - 0.4) * k, 8.5 + (7.3 - 8.5) * k + 0.9 * Math.sin(Math.PI * k), from[2] + (2 - from[2]) * k];
          return { k, p };
        };
        const a = thrown(G1, THROW - 0.02);
        const b = thrown(G2, EVERY_ONE - 0.02);
        const arm = (k: number) => -2.9 + 1.7 * ease(ramp(k, 0, 0.45));
        const run = 40.3 + 3.4 * Math.max(0, t - BACK + 0.25);
        return (
          <>
            <IronGolem position={G1} rotationY={EAST} armR={arm(a.k)} armL={arm(a.k)} headPitch={-0.15} />
            <IronGolem position={G2} rotationY={EAST} armR={arm(b.k)} armL={arm(b.k)} headPitch={-0.15} />
            {a.k < 0.96 ? <Piglin position={a.p} rotationY={EAST} rotation={[-1.45 + 9 * a.k, 0, 0]} scared={1} seed={1} /> : null}
            {b.k < 0.96 ? <Piglin position={b.p} rotationY={EAST} rotation={[-1.45 + 9 * b.k, 0, 0]} scared={1} seed={3} /> : null}
            {run < GATE_EYE[0] - 0.3 ? <Piglin position={[run, 6, 2.0]} rotationY={EAST} walk={t > BACK - 0.25 ? 3.4 * (t - BACK + 0.25) : 0} scared={1} headPitch={-0.4 * (1 - ramp(t, BACK - 0.3, BACK - 0.2))} seed={2} /> : null}
            <Puffs position={[GATE_EYE[0] - 0.5, 6.4, 2]} color="#b06aff" count={10} rise={3.4} spread={1.2} size={0.18} speed={1.1} opacity={0.75} seed={6} />
          </>
        );
      },
    },
    {
      cue: "2.need",
      ...cam.push({ on: [9, 1.5, 2.2], dist: 34, to: 29, yaw: -90, pitch: 17, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'That is why every kid got a golem at ten': the whole street from its west end, looking down its length. Eight houses, and fifteen iron golems, on the road and at every door, each with its kid. At the far end, the hill, and the gate on top of it, dark again until next year.",
      stage: (t) => (
        <>
          {TOWN.map(([x, z, rot, v], i) => (
            <group key={i}>
              <IronGolem position={[x + Math.sin(rot) * v * t, 0, z]} rotationY={rot} walk={v ? v * t + i : 0} headYaw={v ? 0 : Math.sin(t * 0.8 + i) * 0.5} />
              {i % 2 === 0 ? (
                <Kid n={i} position={[x + Math.sin(rot) * (v * t + 1.3) + (v ? 0 : 0.9), 0, z + (v ? 0.9 : 1.1)]} rotationY={v ? rot : SOUTH} animation={v ? "walk" : "idle"} animDistance={v * t + i} />
              ) : null}
            </group>
          ))}
        </>
      ),
    },
    {
      cue: "2.build",
      ...cam.push({ on: [0.2, 1.45, 1.2], dist: 8.2, to: 7.0, yaw: 10, pitch: 4, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'Four iron blocks and a pumpkin': the blocks drop into a T one at a time in front of a kid who cannot stand still, the pumpkin lands on top, and the T is a golem.",
      stage: (t) => {
        const made = A_PUMPKIN + 0.22;
        const at = [FOUR - 0.42, FOUR - 0.22, FOUR - 0.02, FOUR + 0.18];
        const spots: Vec3[] = [[0, 0.4, 0], [-0.8, 1.2, 0], [0, 1.2, 0], [0.8, 1.2, 0]];
        return (
          <>
            <Kid n={0} position={[-0.2, 0, 3.3]} rotationY={2.9} animation="cheer" face={t < made ? "wow" : "laugh"} />
            <Villager position={[1.3, 0, 3.1]} rotationY={WEST + 0.6} robe={ROBE.elder} lookAt={[0.2, 1.4, 1.2]} />
            {t < made ? (
              <>
                {spots.map((p, i) =>
                  t > at[i] - 0.16 ? <IronBlock key={i} position={[SPOT[0] + p[0], p[1] + drop(t, at[i]), SPOT[2] + p[2]]} /> : null,
                )}
                {t > A_PUMPKIN - 0.2 ? <Pumpkin position={[SPOT[0], 1.92 + drop(t, A_PUMPKIN - 0.04), SPOT[2]]} scale={1.15} /> : null}
              </>
            ) : (
              <>
                <IronGolem position={SPOT} scale={0.55 + 0.45 * pop(t, made, 0.2)} headPitch={0.3} headYaw={-0.4} armR={-0.25 * ramp(t, made, made + 0.3)} />
                <Puffs position={[SPOT[0], 0.6, SPOT[2] + 0.4]} color="#f2f2ee" count={9} rise={2.2} spread={0.9} size={0.34} speed={1.4} opacity={0.75} seed={3} />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "2.ran",
      ...cam.orbit({ on: [-0.25, 0.9, 1.85], dist: 4.3, yaw: 55, yawTo: 34, pitch: 30, pitchTo: 14, distTo: 3.6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'The iron ran out': the teller on the same spot, both hands held out, in front of the crate the iron comes in. Come round and down from the inside of the crate, which is empty, to his face as he sees it.",
      stage: (t) => (
        <>
          <Hero position={[-1.05, 0, 1.95]} rotationY={EAST} animation="idle" blendTo="hold" blend={ease(ramp(t, RAN, RAN + 0.35))} face={t < RAN ? "grin" : "frown"} headPitch={0.3 * ramp(t, RAN - 0.5, RAN)} gaze={0} />
          <Crate position={[0.45, 0, 1.75]} rotationY={0.2} />
          <Villager position={[1.75, 0, 1.6]} rotationY={WEST} robe={ROBE.smith} turn={Math.sin(t * 7) * 0.35 * ramp(t, RAN - 0.25, RAN)} nod={0.15} />
        </>
      ),
    },
    {
      cue: "2.dad",
      ...cam.push({ on: [9.08, 1.22, -3.3], dist: 4.8, to: 4.1, yaw: -10, pitch: -3, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'My dad looked outside. It was snowing': the two of them on their doorstep, the boy holding the pumpkin he was given. His dad looks up into the snow, and then down at him, and has had an idea.",
      stage: (t) => {
        const me: Vec3 = [9.5, 0, -2.95];
        const snowing = wordAt("2.dad", "snowing");
        return (
          <>
            <Winter />
            <Dad position={[8.6, 0, -3.45]} animation="idle" headPitch={-0.42 + 0.72 * ease(ramp(t, snowing, snowing + 0.35))} headYaw={0.5 * ease(ramp(t, snowing, snowing + 0.35))} />
            <Hero position={me} rotationY={-0.25} animation="hold" face="frown" headYaw={-0.5} headPitch={-0.3} gaze={0} />
            <Pumpkin position={beside(me, -0.25, 0, 0.84, 0.36)} rotationY={-0.25} scale={0.8} />
          </>
        );
      },
    },
    {
      cue: "2.snow",
      ...cam.push({ on: [9.42, 1.05, -0.6], dist: 5.9, to: 5.3, yaw: 4, pitch: 4, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'Two blocks of snow. One pumpkin. Happy birthday': one block, a second on it, the pumpkin from his dad's hands, and on 'birthday' two sticks spring out of it and it looks at the boy.",
      stage: (t) => {
        const alive = t > ONE + 0.32;
        return (
          <>
            <Winter />
            <Dad position={[10.1, 0, -1.25]} rotationY={-0.75} animation="shrug" blendTo="reachUp" blend={ease(ramp(t, HAPPY - 0.2, HAPPY + 0.1))} headPitch={0.15} />
            <Hero position={[8.78, 0, -0.1]} rotationY={0.95} animation="idle" face={t < HAPPY ? "wow" : "uneasy"} headPitch={-0.15} gaze={0} />
            {alive ? (
              <SnowGolem
                position={YARD}
                headYaw={-0.6 * ease(ramp(t, HAPPY + 0.15, HAPPY + 0.45))}
                headRoll={jolt(t, HAPPY, 0.4)}
                armR={t > HAPPY ? { raise: 0.3 + 0.9 * pop(t, HAPPY, 0.3) - 0.9, swing: 0.2 } : null}
                armL={t > HAPPY + 0.06 ? { raise: 0.3 + 0.9 * pop(t, HAPPY + 0.06, 0.3) - 0.9, swing: 0.2 } : null}
              />
            ) : (
              <>
                {t > -0.1 ? <SnowBlock position={[YARD[0], 0.36 + drop(t, 0.2), YARD[2]]} size={0.84} /> : null}
                {t > 0.3 ? <SnowBlock position={[YARD[0], 1.0 + drop(t, 0.5), YARD[2]]} size={0.64} /> : null}
                {t > ONE - 0.1 ? <Pumpkin position={[YARD[0] + 0.5 * (1 - ease(ramp(t, ONE, ONE + 0.3))), 1.5 + drop(t, ONE + 0.3, 0.5), YARD[2]]} scale={0.84} /> : null}
              </>
            )}
            {t > HAPPY ? <Puffs position={[YARD[0], 0.9, YARD[2] + 0.4]} color="#ffffff" count={8} rise={1.4} spread={0.9} size={0.22} speed={1.5} opacity={0.8 * (1 - ramp(t, HAPPY + 0.3, HAPPY + 0.6))} seed={8} /> : null}
          </>
        );
      },
    },
  ],
});
