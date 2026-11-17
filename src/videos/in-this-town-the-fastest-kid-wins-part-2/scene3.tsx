import { Block, cam, gaitPose, getPose, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Board, Bubble, Card, Cup, DAY, DS, Drone, DustRing, GATE_X, Glint, LANE, LINE2, Me, Pal, Place, Puffs, R, ROBE, Rival, Streaks, Sweat, Van, Villager,
  dur, ease, faceOf, hop, pop, ramp, timing, w,
} from "./kit";
import { E, FRONT_X, Grid, ME_Z, Pack, TRIO_Z, bump, clamp, up } from "./cast";

/** The water table in the river camp, and where he stands at it (south of it, facing north). */
const WT: Vec3 = R(GATE_X + 1.6, 0, -3.3);
const ATWT: Vec3 = [WT[0], 0, WT[2] + 0.85];
/** His place on the line. */
const MYLINE: Vec3 = R(FRONT_X, 0, ME_Z);
/** Metres a second: the pack, and him once the shoes are on. */
export const V = 5.2;
/** Where the pack is when each stretch of the desert starts (zone x of the teller). */
/** Tired runners still RUN: slower, heads down. Metres a second. */
export const TIRED = 3.4;
/** The gait is driven by metres run, and the engine holds a foot still for a negative distance: every distance gets this added. */
export const GAIT = 500;
/** Where each stretch of the desert starts (zone x of the teller). All of it is between x = -45 and 40, where the desert is dressed, and none of it is near the gate at END2. */
export const X0 = { river: LINE2 + 4.5, desert: -44, tired: -30, van: -8, angry: 4, no: 15, press: 20, jog: 22, run: -42, catch: -30, feet: -16, maybe: 0, boom: 14, behind: -36, van2: -6 };
/** The van's driver: a villager in white, turned to whoever he is talking to. */
export const Driver: React.FC<{ turn?: number; gape?: number }> = ({ turn = 0, gape = 0 }) => (
  <>
    <Villager position={[1.15, -0.1, 0.05]} rotationY={E - turn * 1.3} robe={ROBE.white} />
    <group position={[1.15, -0.1, 0.05]} rotation={[0, E - turn * 1.3, 0]}>
      <Block position={[0, 1.47 - 0.07 * gape, 0.27]} size={[0.2, 0.05 + 0.2 * gape, 0.03]} color="#2a0f0f" castShadow={false} />
    </group>
  </>
);
const drink = (t: number, k: number) => ({ ...getPose("idle", t), armR: [-TIRED * k, 0, -0.35 * k] as Vec3, head: [-0.35 * k, 0, 0] as Vec3 });

/** THE SECOND STAGE. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Ninth",
  shots: [
    {
      cue: "5.later",
      ...cam.push({ on: R(LINE2 - 1.6, 1.1, LANE), dist: 9.6, to: 8.4, yaw: 28, pitch: 12, fov: 52 }),
      zone: "river",
      look: DAY,
      note: "TEN MINUTES LATER across the top. The white line of stage two on the grass, and twenty runners walking up to it from all over the camp and falling into three rows. The boy, in blue shoes, takes a place at the front. The three in red shoes are next to him.",
      stage: (t) => (
        <>
          <Grid t={t} gather={ease(ramp(t, 0, dur("5.later") - 0.5))} meFace="smile" />
          <Card text="10 MINUTES LATER" position={R(LINE2 - 1.6, 4.3, LANE)} yaw={0.49} height={0.5} width={6} />
        </>
      ),
    },
    {
      cue: "5.water",
      ...cam.push({ on: [ATWT[0], 1.15, ATWT[2]], dist: 3.0, to: 2.5, yaw: 168, pitch: 4, fov: 44 }),
      zone: "river",
      look: DAY,
      note: "A second before: the boy at the water table, a cup tipped right up over his face. Four empty cups lie on their sides on the table in front of him. He puts the fifth down with them and wipes his mouth.",
      stage: (t) => {
        const k = 1 - ease(ramp(t, w("5.water", "ready", 1.3) - 0.5, w("5.water", "ready", 1.3) - 0.2));
        return (
          <>
            <Me position={ATWT} rotationY={Math.PI} face={k > 0.5 ? "calm" : "brave"} pose={drink(t, k)} />
            <Cup position={k > 0.5 ? [ATWT[0] - 0.3, 1.5, ATWT[2] - 0.42] : [WT[0] - 0.28, 0.86, WT[2] + 0.25]} rotationY={0} tip={k > 0.5 ? 1 : 0} />
            {[-0.7, -0.45, 0.3, 0.6].map((dx, i) => (
              <Cup key={i} position={[WT[0] + dx, 0.86, WT[2] + 0.22 - (i % 2) * 0.12]} rotationY={i * 1.3} tip={1} />
            ))}
            <Glint position={up(ATWT, 1.9)} t={t - w("5.water", "ready", 1.3)} size={0.8} />
          </>
        );
      },
    },
    {
      cue: "5.bend",
      ...cam.push({ on: R(FRONT_X + 0.1, 0.55, TRIO_Z[0]), dist: 4.6, to: 3.4, yaw: 62, pitch: 9, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "The front row, from just past the line. The runner in black bends down to his shoe, then the grey one on each side of him: three hands on three shoes, and three orange lights come on: the middle button, TOO FAST. The boy, next to them, turns his head and watches.",
      stage: (t) => {
        const b = w("5.bend", "bend", 1.4);
        const pr = w("5.bend", "pressed", 2.3);
        const bend = (o: number): number => ease(ramp(t, b - 0.3 + o, b + o)) * (1 - ease(ramp(t, pr + 0.6 + o, pr + 0.9 + o)));
        return (
          <>
            <Grid t={t} bend={[bend(0.15), bend(0), bend(0.3)]} meFace={t > b ? "uneasy" : "brave"} meLook={t > b - 0.2 ? R(FRONT_X, 0.4, TRIO_Z[1]) : undefined} />
            {TRIO_Z.map((z, i) => (
              <Glint key={i} position={R(FRONT_X + 0.25, 0.15, z + 0.1)} t={t - pr - i * 0.12} size={0.8} />
            ))}
            <Board post={false} position={R(FRONT_X + 0.5, 0.7, TRIO_Z[1])} rotationY={1.1} text="TOO FAST" scale={0.3 * pop(t, pr + 0.1)} color="#15151a" ink="#ffb030" />
          </>
        );
      },
    },
    {
      cue: "5.nervous",
      ...cam.push({ on: faceOf(MYLINE), dist: 1.7, to: 1.5, yaw: 72, pitch: 0, fov: 38 }),
      zone: "river",
      look: DAY,
      note: "His face, close: he swallows. One drop of sweat.",
      stage: (t) => (
        <>
          <Grid t={t} meFace="fear" />
        </>
      ),
    },
    {
      cue: "5.go",
      ...cam.push({ on: R(FRONT_X, 1.0, LANE), dist: 9.5, to: 7.8, yaw: 90, pitch: 8, fov: 50 }),
      zone: "river",
      look: DAY,
      note: "The whole line from in front, everybody down with one foot back. 3, 2, 1 come up over them one after another. On GO the three in red are gone in three white lines and everybody else starts to run.",
      stage: (t) => {
        const ws = [w("5.go", "three", 0.1), w("5.go", "two", 0.7), w("5.go", "one", 1.3), w("5.go", "go", 1.9)];
        const n = t < ws[1] ? 0 : t < ws[2] ? 1 : t < ws[3] ? 2 : 3;
        return (
          <>
            <Grid t={t} set go={ws[3]} streak meFace="brave" />
            <Place text={["3", "2", "1", "GO!"][n]} position={R(FRONT_X + 1, 3.3, LANE)} rotationY={E} scale={1.1 * pop(t, ws[n])} />
            <DustRing position={R(FRONT_X, 0.05, TRIO_Z[1])} t={t - ws[3]} size={2.6} color="#b79d63" />
          </>
        );
      },
    },
    {
      cue: "5.ran",
      ...cam.truck({ on: R(FRONT_X + 3, 1.1, LANE), dist: 10, yaw: 16, pitch: 9, fov: 54, by: [5.2 * 2.4, 0, 0] }),
      ease: "linear",
      zone: "river",
      look: DAY,
      note: "Side on, moving with them: twenty runners in a bunch, the boy in the middle of it. In front of all of them three red-shoed runners are pulling away, white lines off their heels, a camera drone flying along over the three.",
      stage: (t) => (
        <>
          <Grid t={t} go={-0.55} streak meFace="brave" />
          <Drone position={R(FRONT_X + 9.5 * (t + 0.55) + 1.5, 3.4, LANE + 1.2)} yaw={-E} tilt={0.7} t={t} scale={1.4} />
        </>
      ),
    },
    {
      cue: "6.forgot",
      ...cam.truck({ on: R(X0.river, 0.3, ME_Z), dist: 2.7, yaw: 14, pitch: 8, fov: 40, by: [V * 2.53, 0, 0] }),
      ease: "linear",
      zone: "river",
      look: DAY,
      note: "His two blue shoes, running, the lens going along with them at the level of the grass. On the side of the shoe the THIRD button is the one lit, and the label comes up over it: JUST RIGHT.",
      stage: (t) => {
        const x = X0.river + V * t;
        const third = w("6.forgot", "third", 1.9);
        return (
          <>
            <Me position={R(x, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="uneasy" />
            <Board post={false} position={R(x + 0.1, 0.62, ME_Z + 0.3)} text="JUST RIGHT" scale={0.13 * pop(t, third - 0.2)} color="#15151a" ink="#6fb8ff" />
            <Puffs position={R(x - 0.5, 0.05, ME_Z)} color="#8a9a5a" count={3} rise={0.2} spread={0.3} size={0.08} speed={2} opacity={0.5} />
          </>
        );
      },
    },
    {
      cue: "6.notyet",
      ...cam.truck({ on: R(X0.river + 16, 1.2, ME_Z), dist: 4.2, yaw: 52, pitch: 5, fov: 46, by: [V * 2.8, 0, 0] }),
      ease: "linear",
      zone: "river",
      look: DAY,
      note: "The boy running, from in front. His hand goes down towards his shoe and stops. He takes it back. He looks up: far ahead of him, over the three in red shoes, the drone's red light is on them.",
      stage: (t) => {
        const x = X0.river + 16 + V * t;
        const k = bump(t, 0.2, 1.3);
        return (
          <>
            <Me position={R(x, 0, ME_Z)} rotationY={E} face={t > 1.5 ? "brave" : "uneasy"} headPitch={0.4 * k - 0.15 * ease(ramp(t, 1.6, 2.0))} pose={{ ...gaitPose("run", GAIT + x), ...(k > 0.3 ? { armR: [-0.4 + 0.9 * k, 0, 0.1] as Vec3, bodyPitch: 0.25 * k } : {}) }} />
            <Pack x={R(x, 0, 0)[0]} z={R(0, 0, 0)[2]} d={x} ahead={6} n={12} t={t} />
            <Drone position={R(x + 7, 3.0, ME_Z + 0.8)} yaw={-E} tilt={0.8} t={t} scale={1.6} />
          </>
        );
      },
    },
    {
      cue: "6.ninth",
      ...cam.truck({ on: R(X0.river + 26, 1.2, LANE), dist: 9.5, yaw: 10, pitch: 10, fov: 52, by: [V * 1.93, 0, 0] }),
      ease: "linear",
      zone: "river",
      look: DAY,
      note: "The bunch, side on: he is one runner among the rest, eight in front of him, the same speed as all of them. 9th comes up over his head.",
      stage: (t) => {
        const x = X0.river + 26 + V * t;
        return (
          <>
            <Me position={R(x, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="calm" />
            <Pack x={R(x, 0, 0)[0]} z={R(0, 0, 0)[2]} d={x} ahead={8} n={15} t={t} />
            <Place text="9th" position={R(x, 2.3, ME_Z)} scale={0.6 * pop(t, w("6.ninth", "ninth", 1.3))} />
          </>
        );
      },
    },
    {
      cue: "6.desert",
      ...cam.truck({ on: DS(X0.desert + 2, 1.3, LANE), dist: 11, yaw: 24, pitch: 12, fov: 54, by: [V * 1.87, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "Sand, cactus, a white sun. The bunch runs in off the grass, dust coming up behind every foot, the air shaking over the sand.",
      stage: (t) => {
        const x = X0.desert + V * t;
        return (
          <>
            <Me position={DS(x, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="uneasy" />
            <Pack x={DS(x, 0, 0)[0]} z={DS(0, 0, 0)[2]} d={x} ahead={8} n={15} t={t} />
            <Puffs position={DS(x - 3, 0.1, LANE)} color="#e2cf9a" count={10} rise={0.6} spread={2.5} size={0.16} speed={1.5} opacity={0.55} />
            <Card text="HOT" position={DS(x + 1, 4.6, LANE)} yaw={0.42} height={0.7} width={3} color="#ffb030" />
          </>
        );
      },
    },
    {
      cue: "6.tired",
      ...cam.truck({ on: DS(X0.tired, 1.15, ME_Z), dist: 5.2, yaw: 38, pitch: 6, fov: 48, by: [TIRED * 3.23, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "Nobody is running any more. Heads down, arms hanging, feet dragging in the sand, sweat flying off all of them. The boy is the same. Over his head a cup of water comes up, and tips over, empty.",
      stage: (t) => {
        const x = X0.tired + TIRED * t;
        const cup = w("6.tired", "water", 2.2);
        return (
          <>
            <Me position={DS(x, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="ouch" headPitch={0.3} />
            <Sweat position={DS(x, 1.6, ME_Z)} t={t} much={1} />
            <Pack x={DS(x, 0, 0)[0]} z={DS(0, 0, 0)[2]} d={x} ahead={8} n={15} mode="tired" t={t} />
            <group scale={1}>
              <Cup position={DS(x + 0.1, 2.25, ME_Z)} tip={ease(ramp(t, cup + 0.2, cup + 0.6))} />
            </group>
          </>
        );
      },
    },
    {
      cue: "6.lead",
      ...cam.truck({ on: DS(X0.tired + 12, 1.5, ME_Z), dist: 3.4, yaw: -90, pitch: 6, fov: 50, by: [TIRED * 3.63, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "From behind his shoulder, looking up the track: a long way ahead, small, three runners in a row with red shoes, and the drone over them. They are not running either. One of them has a hand on his knee.",
      stage: (t) => {
        const x = X0.tired + 12 + TIRED * t;
        const fx = x + 17 + 0.3 * t;
        return (
          <>
            <Me position={DS(x, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="ouch" />
            <Pack x={DS(x, 0, 0)[0]} z={DS(0, 0, 0)[2]} d={x} ahead={4} n={9} mode="tired" t={t} hole={1.6} />
            <Rival position={DS(fx, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (fx)} face="ouch" />
            <Pal n={0} position={DS(fx - 1.2, 0, ME_Z - 1.1)} rotationY={E} animation="run" animDistance={GAIT + (fx + 1)} face="ouch" />
            <Pal n={1} position={DS(fx - 1.6, 0, ME_Z + 1.1)} rotationY={E} animation="ache" face="ouch" />
            <Drone position={DS(fx - 1, 3.2, ME_Z)} yaw={E} tilt={0.9} t={t} scale={2} />
            <Puffs position={DS(fx - 1, 0.1, ME_Z)} color="#e2cf9a" count={6} rise={0.5} spread={1.5} size={0.18} opacity={0.5} />
          </>
        );
      },
    },
    {
      cue: "7.van",
      ...cam.truck({ on: DS(X0.van + 0.6, 1.25, ME_Z - 1.2), dist: 6.4, yaw: 8, pitch: 7, fov: 50, by: [TIRED * 3.3, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "A white van with QUIT? in red on its side comes up from behind and slows down next to the boy, on the far side of him. Its side is open. The driver, a villager, turns his head to him: GET IN, IF YOU WANT TO QUIT!",
      stage: (t) => {
        const x = X0.van + TIRED * t;
        const say = w("7.van", "you", 1.6);
        const vx = x - 9 * (1 - ease(ramp(t, 0, say - 0.2))) + 0.3;
        return (
          <>
            <Me position={DS(x, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="ouch" headYaw={0.7 * ease(ramp(t, say - 0.3, say))} />
            <Sweat position={DS(x, 1.6, ME_Z)} t={t} much={0.7} />
            <Pack x={DS(x, 0, 0)[0]} z={DS(0, 0, 0)[2] + 1.6} d={x} ahead={3} n={7} mode="tired" t={t} hole={2.2} />
            <Van position={DS(vx, 0, ME_Z - 2.4)} d={vx} driver={<Driver turn={ease(ramp(t, say - 0.4, say))} gape={0.25 * Math.abs(Math.sin(t * 9)) * (t > say ? 1 : 0)} />} />
            <Bubble text="WANT TO QUIT?" position={DS(vx + 1.1, 2.9, ME_Z - 2.3)} scale={0.6 * pop(t, say)} />
          </>
        );
      },
    },
    {
      cue: "7.angry",
      ...cam.truck({ on: DS(X0.angry, 1.45, ME_Z), dist: 2.4, yaw: 62, pitch: 0, fov: 40, by: [TIRED * 3.03, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "His face, close, the van's white side behind it. The tiredness goes out of it and his brows come down. Over his shoulder, small, comes the old picture: a baby villager going past him.",
      stage: (t) => {
        const x = X0.angry + TIRED * t;
        const yrs = w("7.angry", "years", 1.6);
        return (
          <>
            <Me position={DS(x, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face={t > 0.5 ? "angry" : "ouch"} headPitch={-0.1} />
            <Van position={DS(x + 0.3, 0, ME_Z - 2.4)} d={x} driver={<Driver turn={1} />} />
            <Bubble text="SLOWEST" position={DS(x - 0.2, 2.25, ME_Z)} rotationY={0.9} scale={0.4 * pop(t, yrs)} />
          </>
        );
      },
    },
    {
      cue: "7.no",
      ...cam.truck({ on: DS(X0.no, 1.25, ME_Z - 1.2), dist: 5.6, yaw: 8, pitch: 7, fov: 48, by: [TIRED * 1.13, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "He shakes his head at the van, hard, and turns his face to the track.",
      stage: (t) => {
        const x = X0.no + TIRED * t;
        return (
          <>
            <Me position={DS(x, 0, ME_Z)} rotationY={E} animation="run" animDistance={GAIT + (x)} face="angry" headYaw={0.6 * Math.sin(t * 13) * (1 - ease(ramp(t, 0.6, 0.9)))} />
            <Van position={DS(x + 0.3, 0, ME_Z - 2.4)} d={x} driver={<Driver turn={1} />} />
            <Bubble text="NO." position={DS(x, 2.3, ME_Z)} scale={0.5 * pop(t, 0.1)} />
          </>
        );
      },
    },
    {
      cue: "7.press",
      ...cam.push({ on: DS(X0.press, 0.6, ME_Z), dist: 4.6, to: 2.6, yaw: 30, pitch: 14, fov: 46 }),
      zone: "desert",
      look: DAY,
      note: "The middle of the bunch: tired legs all round him. He goes down on one knee between them as if to do up a shoe. Over the bunch a drone goes past looking the other way. His finger goes to the SECOND button: it lights orange, TOO FAST.",
      stage: (t) => {
        const down = ease(ramp(t, 0.3, 0.9));
        const pr = w("7.press", "pressed", 2.9);
        const x = X0.press + 1.2 * t * (1 - down);
        return (
          <>
            <Me position={DS(x, 0, ME_Z)} rotationY={E} animation={down > 0.5 ? "crouch" : "walk"} animDistance={GAIT + (x)} face="brave" headPitch={0.3 * down} headYaw={0.5 * bump(t, 1.0, 1.2)} shoeGlow={t > pr ? 1 : 0.3} />
            <Pack x={DS(x, 0, 0)[0] + 0.5 * t} z={DS(0, 0, 0)[2]} d={x + t} ahead={5} n={12} mode="walk" t={t} hole={0.7} gap={0.8} />
            <Drone position={DS(x - 5 + 4.5 * t, 3.3, ME_Z + 1.5)} yaw={E} tilt={0.5} t={t} scale={1.4} />
            <Board post={false} position={DS(x + 0.15, 0.75, ME_Z + 0.35)} text="TOO FAST" scale={0.24 * pop(t, pr)} color="#15151a" ink="#ffb030" />
            <Glint position={DS(x + 0.25, 0.15, ME_Z + 0.2)} t={t - pr} size={0.8} />
          </>
        );
      },
    },
    {
      cue: "7.jog",
      ...cam.truck({ on: DS(X0.jog + 3, 1.2, LANE), dist: 9.5, yaw: 10, pitch: 10, fov: 54, by: [TIRED * 4.17 + 2, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "Side on. He jogs one step and shoots out of the front of the bunch with white lines behind him: TOO FAST. He leans back, heels in the sand, and drops back to them. Then he finds it: a jog only a little quicker than theirs, going up through the bunch one runner at a time. JUST RIGHT.",
      stage: (t) => {
        const fast = w("7.jog", "fast", 1.2);
        const slow = w("7.jog", "slowed", 1.8);
        const right = w("7.jog", "right", 2.9);
        const base = X0.jog + TIRED * t;
        const surge = 6.5 * ease(ramp(t, 0.35, fast)) - 5.5 * ease(ramp(t, slow - 0.2, right - 0.3)) + 1.1 * Math.max(0, t - right);
        const x = base + surge;
        const braking = t > slow - 0.2 && t < right - 0.3;
        return (
          <>
            <Me position={DS(x, 0, ME_Z)} rotationY={E} animation={braking ? "stagger" : "run"} animDistance={GAIT + (x)} face={t < fast ? "wow" : braking ? "uneasy" : "grin"} shoeGlow={0.8} pose={braking ? { ...gaitPose("stagger", GAIT + x), bodyPitch: -0.3 } : undefined} />
            {t > 0.35 && t < slow ? <Streaks position={DS(x - 0.6, 0.6, ME_Z)} yaw={E} t={(t * 2.5) % 1} n={7} spread={0.4} speed={10} /> : null}
            {braking ? <Puffs position={DS(x + 0.4, 0.1, ME_Z)} color="#e2cf9a" count={6} rise={0.5} spread={0.5} size={0.15} speed={2} opacity={0.6} /> : null}
            <Pack x={DS(base, 0, 0)[0]} z={DS(0, 0, 0)[2] + 1.3} d={base} ahead={5} n={12} mode="tired" t={t} hole={0.5} />
            <Place text={t < right - 0.15 ? "TOO FAST" : "JUST RIGHT"} position={DS(x, 2.35, ME_Z)} scale={0.5 * (t < right - 0.15 ? pop(t, fast - 0.25) : pop(t, right - 0.15))} />
          </>
        );
      },
    },
    {
      cue: "7.run",
      ...cam.truck({ on: DS(X0.run + 1.1, 1.45, ME_Z - 2.0), dist: 3.4, yaw: 20, pitch: 3, fov: 44, by: [TIRED * 2.23, 0, 0] }),
      ease: "linear",
      zone: "desert",
      look: DAY,
      note: "The van, close, the driver at his wheel. The boy goes past his window, running, properly running, sand flying. The driver's head goes round after him and his mouth drops open.",
      stage: (t) => {
        const vx = X0.run + TIRED * t;
        const pass = 0.55;
        const x = vx - 4.5 + (t / pass) * 5.5;
        const seen = ease(ramp(t, pass - 0.2, pass + 0.2));
        return (
          <>
            <Van position={DS(vx, 0, ME_Z - 2.4)} d={vx} driver={<Driver turn={1 - 0.9 * ease(ramp(t, pass, pass + 0.5))} gape={ease(ramp(t, w("7.run", "mouth", 1.6) - 0.3, w("7.run", "mouth", 1.6)))} />} />
            <Me position={DS(x, 0, ME_Z - 0.6)} rotationY={E} animation="run" animDistance={GAIT + (x * 1.2)} face="brave" shoeGlow={1} />
            <Puffs position={DS(x - 0.7, 0.1, ME_Z - 0.6)} color="#e2cf9a" count={6} rise={0.5} spread={0.5} size={0.14} speed={2} opacity={0.6} />
            <Bubble text="!" position={DS(vx + 1.2, 2.85, ME_Z - 2.3)} scale={0.5 * pop(t, pass + 0.3) * seen} />
          </>
        );
      },
    },
  ],
});
void hop;
void clamp;
