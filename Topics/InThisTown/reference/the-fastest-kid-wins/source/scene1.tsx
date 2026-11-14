import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Baby, Board, Chicken, DAY, DustRing, Glint, HILL, Hero, LANE, POND, Player, Puffs, ROBE, STAND, Streaks, Sweat, Villager, babyFace, ease, faceOf, hop,
  jolt, pop, ramp, room, timing, wordAt,
} from "./kit";

const E = Math.PI / 2;
const CUPTOP: Vec3 = [STAND[0], 1.55, STAND[2]];
/** Somebody running east: where he is `t` seconds in. */
const run = (x0: number, v: number, t: number, z = LANE, y = 0): Vec3 => [x0 + v * t, y, z];

/**
 * ACT 1 and 2. The trophy, the slowest kid in town, and a week of training that changes nothing.
 * Rule A (OWNER.md): the premise is in the first second: the cup, big, and everybody running for it.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The slowest kid in town",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: CUPTOP, dist: 3.1, to: 4.6, yaw: 10, pitch: -6, fov: 50 }),
      zone: "village",
      look: DAY,
      note: "The premise in second one: the gold cup fills the frame, and the whole town tears past behind the lens for it. He comes last, alone.",
      stage: (t) => {
        const me = run(-9 + 0, 2.6, t, 0.5);
        return (
          <>
            <Glint position={[CUPTOP[0] + 0.2, CUPTOP[1] + 0.25, CUPTOP[2] + 0.3]} t={t - 0.1} size={1.4} />
            <Glint position={[CUPTOP[0] - 0.2, CUPTOP[1] + 0.1, CUPTOP[2] + 0.3]} t={t - 1.6} size={1.1} />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const p = run(-3 - i * 2.1, 9.5, t, 0.2 + (i % 3) * 0.45);
              return i % 3 === 2 ? (
                <Villager key={i} position={p} rotationY={E} walk={p[0] * 1.3} robe={[ROBE.brown, ROBE.red, ROBE.blue][i % 3]} lean={0.3} />
              ) : (
                <Player key={i} who={i + 1} position={p} rotationY={E} animation="run" animDistance={p[0] + 40} face="brave" />
              );
            })}
            <Streaks position={[STAND[0] - 1, 0.7, 0.6]} yaw={E} t={t} n={8} spread={1.1} speed={14} />
            <Hero position={me} rotationY={E} animation="stagger" animDistance={me[0] + 20} face="ouch" />
            <Sweat position={faceOf(me)} t={t} />
          </>
        );
      },
    },
    {
      cue: "1.slow",
      ...cam.truck({ on: [-1.2, 1.25, LANE], dist: 1.7, yaw: 62, pitch: 2, fov: 40, by: [0.5, 0, 0] }),
      zone: "village",
      look: DAY,
      note: "A new size and a new side: his face, from in front, red and wet. Behind him the street is empty: everybody else has gone.",
      stage: (t) => {
        const me = run(-1.4, 0.45, t);
        return (
          <>
            <Hero position={me} rotationY={E} animation="stagger" animDistance={me[0] * 2 + 20} face="ouch" gaze={0} />
            <Sweat position={faceOf(me)} t={t} much={1.4} />
          </>
        );
      },
    },
    {
      cue: "1.baby",
      ...cam.orbit({ on: [3, 0.8, LANE], dist: 4.4, yaw: -8, yawTo: 8, pitch: 12, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "The joke, wide and from the side: he runs flat out and a baby villager walks past him. On 'Twice' the same baby laps him.",
      stage: (t) => {
        const me = run(2.2, 0.55, t, LANE - 0.3);
        const one = wordAt("1.baby", "One");
        const twice = wordAt("1.baby", "Twice");
        const b1 = run(-0.6, 3.4, t - 0.1, LANE + 0.45);
        const b2 = run(-1.5, 5.2, t - twice + 0.25, LANE + 0.6);
        return (
          <>
            <Hero position={me} rotationY={E} animation="run" animDistance={me[0] * 3} face={t > one ? "fear" : "ouch"} headYaw={t > one ? -0.5 : 0} />
            <Sweat position={faceOf(me)} t={t} />
            <Baby position={b1} walk={b1[0] * 1.5} lookAt={t > one - 0.3 && t < twice ? faceOf(me) : undefined} />
            {t > twice - 0.25 ? <Baby position={b2} walk={b2[0] * 1.5} /> : null}
            {t > twice - 0.25 ? <Streaks position={[b2[0] - 0.6, 0.4, b2[2]]} yaw={E} t={t - twice + 0.25} n={5} spread={0.4} speed={9} /> : null}
          </>
        );
      },
    },
    {
      cue: "1.want",
      ...cam.push({ on: [STAND[0] + 0.15, 1.15, STAND[2] + 0.5], dist: 3.6, to: 2.9, yaw: 24, pitch: -10, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "Ten years old: from low behind a very small boy, on his toes with his hand up at a cup he cannot reach.",
      stage: (t) => {
        const kid: Vec3 = [STAND[0] + 0.35, 0, STAND[2] + 1.0];
        return (
          <>
            <Hero position={[kid[0], hop(t, 0.5, 0.18, 0.4) + hop(t, 1.2, 0.2, 0.4), kid[2]]} rotationY={Math.PI + 0.3} scale={0.52} animation="reachUp" face="wow" gaze={0} />
            <Glint position={[CUPTOP[0], CUPTOP[1] + 0.3, CUPTOP[2] - 0.2]} t={t - 0.7} size={1.3} />
          </>
        );
      },
    },
    {
      cue: "1.now",
      ...cam.orbit({ on: room(-0.9, 1.5, -1.6), dist: 2.9, yaw: 38, yawTo: 14, pitch: 6, fov: 46 }),
      zone: "room",
      look: DAY,
      note: "Eighteen: indoors, quiet, his back to us and the bare shelf over his head. Dust comes off it when he wipes it.",
      stage: (t) => {
        const wipe = wordAt("1.now", "shelf");
        return (
          <>
            <Hero position={room(-0.75, 0, -1.25)} rotationY={Math.PI - 0.25} animation={t > wipe - 0.5 ? "reachUp" : "idle"} face="frown" headPitch={-0.3} />
            {t > wipe - 0.2 ? <Puffs position={room(-1.1, 1.8, -2.1)} color="#cfc6b4" count={5} rise={0.3} spread={0.5} size={0.06} speed={1.2} opacity={0.6} /> : null}
          </>
        );
      },
    },

    // ------------------------------------------------------------------ 2. training
    {
      cue: "2.train",
      ...cam.top({ on: [-12, 0, LANE], height: 5.5, to: 4.4, spin: [20, -10], fov: 52 }),
      zone: "village",
      look: DAY,
      note: "Straight down on the street: one yellow dot running along it, and his shadow. The first shot of the montage is the map of it.",
      stage: (t) => {
        const me = run(-15, 3.2, t);
        return (
          <>
            <Hero position={me} rotationY={E} animation="run" animDistance={me[0] + 30} face="brave" />
            <Puffs position={[me[0] - 0.5, 0.05, me[2]]} color="#b79d63" count={3} rise={0.25} spread={0.2} size={0.06} speed={2} opacity={0.5} />
          </>
        );
      },
    },
    {
      cue: "2.hill",
      ...cam.push({ on: [HILL[0] + 1.2, 2.0, HILL[2]], dist: 17, to: 15, yaw: 6, pitch: 4, fov: 46 }),
      zone: "village",
      look: DAY,
      note: "The hill, whole, with him small on it: up the three steps in three jumps.",
      stage: (t, { dur }) => {
        const k = ramp(t, 0, dur + 0.3);
        const x = HILL[0] + 4.8 - k * 5.4;
        const y = x < HILL[0] + 0.5 ? 3 : x < HILL[0] + 2.5 ? 2 : x < HILL[0] + 4.5 ? 1 : 0;
        return (
          <>
            <Hero position={[x, y + Math.abs(Math.sin(t * 7)) * 0.22, HILL[2] + 0.4]} rotationY={-E} animation="run" animDistance={t * 3} face="ouch" />
            <Sweat position={[x, y + 1.2, HILL[2] + 0.4]} t={t} />
          </>
        );
      },
    },
    {
      cue: "2.hill",
      cut: wordAt("2.hill", "round") - 0.25,
      ...cam.orbit({ on: [POND[0], 0.6, POND[2]], dist: 12.5, yaw: -30, yawTo: 25, pitch: 42, fov: 48 }),
      zone: "village",
      look: DAY,
      note: "The pond, from above and turning with him: once round the water.",
      stage: (t) => {
        const a = 2.4 + t * 2.6;
        const me: Vec3 = [POND[0] + Math.cos(a) * 4.1, 0, POND[2] + Math.sin(a) * 2.7];
        return (
          <>
            <Hero position={me} rotationY={Math.atan2(-Math.sin(a) * 4.1, Math.cos(a) * 2.7)} animation="run" animDistance={t * 9} face="ouch" />
            <Sweat position={faceOf(me)} t={t} />
          </>
        );
      },
    },
    {
      cue: "2.push",
      ...cam.push({ on: [-8, 0.3, 6.2], dist: 2.3, to: 1.9, yaw: 64, pitch: 3, fov: 44 }),
      zone: "village",
      look: DAY,
      note: "The lens on the grass, nose to nose with him. He goes up once, shaking, and drops flat on 'one'.",
      stage: (t) => {
        const one = wordAt("2.push", "one");
        const up = ease(ramp(t, 0.15, 0.6)) * (1 - ease(ramp(t, one, one + 0.12)));
        return (
          <>
            <Hero position={[-8.7 + Math.sin(t * 40) * 0.008 * up, up * 0.26, 6.2]} rotationY={E} animation="collapse" time={1.2} face={t > one ? "ouch" : "brave"} />
            <DustRing position={[-8, 0.05, 6.2]} t={t - one - 0.1} size={0.9} color="#9fbf7a" />
            <Sweat position={[-7.8, 0.4, 6.2]} t={t} much={0.8} />
          </>
        );
      },
    },
    {
      cue: "2.sweat",
      ...cam.truck({ on: [6, 0.7, 6.4], dist: 5.2, yaw: -12, pitch: 16, fov: 46, by: [2.2, 0, 0] }),
      zone: "village",
      look: DAY,
      note: "He runs through the chickens and they clear out of his way in three directions: the sweat is the joke, so it is everywhere.",
      stage: (t) => {
        const me = run(3.4, 2.7, t, 6.4);
        const away = wordAt("2.sweat", "chickens") - 0.3;
        const k = ease(ramp(t, away, away + 0.8));
        return (
          <>
            <Hero position={me} rotationY={E} animation="run" animDistance={me[0] * 2} face="ouch" />
            <Sweat position={faceOf(me)} t={t} much={2.4} />
            <Sweat position={[me[0], 0.8, me[2]]} t={t + 0.2} much={2} />
            <Chicken position={[8.2 + k * 1.5, hop(t, away, 0.5, 0.4), 5.6 - k * 3.2]} rotationY={k > 0 ? 2.6 : -1} phase={1} />
            <Chicken position={[9.4 + k * 3.4, hop(t, away + 0.1, 0.6, 0.4), 7.1 + k * 2.4]} rotationY={k > 0 ? 0.9 : 2} phase={2.2} />
            <Chicken position={[10.3 + k * 4, hop(t, away + 0.2, 0.45, 0.4), 6.1 - k * 1.2]} rotationY={k > 0 ? 1.7 : 0.4} phase={3.1} />
          </>
        );
      },
    },
    {
      cue: "2.fail",
      ...cam.push({ on: [-3.2, 1.0, LANE], dist: 5.6, to: 4.6, yaw: 74, pitch: 6, fov: 44 }),
      zone: "village",
      look: DAY,
      note: "Down the street at the line, head on: the baby strolls over it and he falls over it, far behind.",
      stage: (t) => {
        const lost = wordAt("2.fail", "lost");
        const b: Vec3 = [Math.min(-2.6, -6.5 + t * 2.6), hop(t, lost, 0.35, 0.35) + hop(t, lost + 0.4, 0.3, 0.35), LANE + 0.5];
        const me = run(-12.5, 2.1, Math.min(t, lost + 0.3), LANE - 0.5);
        return (
          <>
            <Baby position={b} rotationY={E} walk={b[0] * 1.5} />
            <Hero position={me} rotationY={E} animation={t > lost + 0.3 ? "collapse" : "stagger"} time={t > lost + 0.3 ? t - lost - 0.3 : undefined} animDistance={me[0] * 2 + 40} face="ouch" />
            <DustRing position={[me[0] + 0.9, 0.05, me[2]]} t={t - lost - 1.0} size={1} color="#b79d63" />
          </>
        );
      },
    },
    {
      cue: "2.fail",
      cut: wordAt("2.fail", "To") - 0.1,
      ...cam.push({ on: babyFace([-2.6, 0, LANE + 0.5]), dist: 1.5, to: 1.15, yaw: 80, pitch: -4, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "The same baby, close, from below. It does not even look tired. It tilts its head at us.",
      stage: (t) => <Baby position={[-2.6, 0, LANE + 0.5]} rotationY={E} tilt={0.22 * ease(ramp(t, 0.2, 0.5))} nod={jolt(t, 0.6, 0.2)} />,
    },
    {
      cue: "2.week",
      ...cam.push({ on: [-7.5, 1.35, 0.1], dist: 5.6, to: 4.8, yaw: 8, pitch: 0, fov: 42 }),
      zone: "village",
      look: DAY,
      note: "The clock of the story, as a thing in the town: the board by the street. He stands under it and reads it.",
      stage: (t) => {
        const fast = wordAt("2.week", "fast");
        return (
          <>
            <Board position={[-7.6, 0, -0.2]} text="7 DAYS" scale={1.25 * (0.9 + 0.1 * pop(t, 0.05))} />
            <Hero position={[-7.3, 0, 1.0]} rotationY={Math.PI - 0.2} animation={t > fast ? "panic" : "idle"} face={t > fast ? "fear" : "uneasy"} headPitch={-0.25} />
          </>
        );
      },
    },
    {
      cue: "2.week",
      cut: wordAt("2.week", "quickly") - 0.35,
      ...cam.push({ on: faceOf([-6.75, 0, 0.75]), dist: 1.7, to: 1.3, yaw: 20, pitch: 2, fov: 36 }),
      zone: "village",
      look: DAY,
      note: "He turns round to us on 'quickly': the face of somebody with no plan at all.",
      stage: () => <Hero position={[-6.75, 0, 0.75]} rotationY={0.3} animation="scared" face="fear" gaze={0} />,
    },
  ],
});
