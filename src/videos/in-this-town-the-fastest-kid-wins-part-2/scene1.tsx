import { Block, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  BENCH, BENCH_TOP, Baby, Bits, Board, Bubble, DAY, DustRing, FOREST, GATE_X, Glint, HIDE, LANE, Me, NIGHT, Pal, Place, Player, Puffs, R, ROBE, Rival, STAND, ShoePair, Streaks, TREE, Villager,
  WITCH, Witch, at, ease, faceOf, hop, pop, ramp, timing, w,
} from "./kit";
import { E, bump, up } from "./cast";

const lamp = (p: Vec3, k = 7) => <pointLight position={p} color="#cfd8ff" intensity={k} distance={7} decay={2} />;
/** The log, as part one left it: he is on the west half, first place on the east half. */
export const MEX = -0.6;
export const RVX = 0.6;
export const SIT_Y = BENCH_TOP - 0.4;
export const SIT_Z = 0.1;
export const MYSEAT: Vec3 = [BENCH[0] + MEX, SIT_Y, BENCH[2] + SIT_Z];
export const HISSEAT: Vec3 = [BENCH[0] + RVX, SIT_Y - 0.04, BENCH[2] + SIT_Z];
/** The shoe held up for the three labels. */
const HELD: Vec3 = at(FOREST, 1.5, 0.84, 2.0);
/** Where the three stand in the camp once the friends are in: a row, facing the camera. */
export const TRIO: Vec3[] = [R(GATE_X + 2.3, 0, 0.2), R(GATE_X + 3.0, 0, 0.3), R(GATE_X + 3.7, 0, 0.2)];
/** From the north-east, the side of the tree he is on. */
const HYAW = 118;
const HRY = 2.25;

/** THE RECAP, AND THE TREE. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Behind a tree",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [STAND[0] - 0.4, 1.25, STAND[2] + 0.4], dist: 5.4, to: 4.4, yaw: 14, pitch: 6, fov: 48 }),
      zone: "village",
      look: DAY,
      note: "RECAP, fast. The gold trophy on its stone stand in the village, and the boy in yellow looking up at it. On 'slowest' a baby villager goes past behind him like a train, and he turns to us with a long face.",
      stage: (t) => {
        const slow = w("1.town", "slowest", 2.4);
        const bx = STAND[0] - 9 + Math.max(0, t - slow + 0.5) * 11;
        return (
          <>
            <Me blue={false} shoes={undefined} position={[STAND[0] - 0.95, 0, STAND[2] + 0.9]} rotationY={t > slow ? 0.1 : 2.2} animation={t > slow ? "shrug" : "idle"} face={t > slow ? "frown" : "smile"} headPitch={t > slow ? 0 : -0.35} />
            <Baby position={[bx, hop(t, slow, 0.15, 0.3), STAND[2] + 2.3]} rotationY={E} walk={bx * 2} />
            <Puffs position={[bx - 0.5, 0.05, STAND[2] + 2.3]} color="#b79d63" count={4} rise={0.3} spread={0.3} size={0.1} speed={2} opacity={0.6} />
            <Glint position={[STAND[0], 1.7, STAND[2] + 0.3]} t={t - 0.5} size={1.2} />
          </>
        );
      },
    },
    {
      cue: "1.witch",
      ...cam.push({ on: [WITCH[0] + 0.75, 1.05, WITCH[2] + 0.1], dist: 4.3, to: 3.5, yaw: 8, pitch: 5, fov: 46 }),
      zone: "forest",
      look: NIGHT,
      note: "The forest at night: the witch in her pointed hat leans out to him with a pair of red shoes lying on her sleeves, glowing. He takes a step back, then a step in.",
      stage: (t) => {
        const give = ease(ramp(t, 0.2, 0.9));
        return (
          <>
            <Witch position={WITCH} rotationY={E} give={give} t={t} wave={0.3 * (1 - give)}>
              <ShoePair scale={0.9} glow={0.6 + 0.4 * Math.sin(t * 6)} />
            </Witch>
            <Me blue={false} shoes={undefined} position={[WITCH[0] + 1.55 - 0.25 * ease(ramp(t, 1.2, 1.8)), 0, WITCH[2] + 0.2]} rotationY={-E} animation={t > 1.3 ? "reach" : "scared"} face={t > 1.2 ? "wow" : "uneasy"} headPitch={0.2} />
            <Glint position={[WITCH[0] + 0.6, 1.0, WITCH[2] + 0.3]} t={t - 0.9} size={0.9} />
            {lamp([WITCH[0] + 0.8, 1.6, WITCH[2] + 2.2], 10)}
          </>
        );
      },
    },
    {
      cue: "1.buttons",
      ...cam.push({ on: [HELD[0], HELD[1] + 0.2, HELD[2]], dist: 1.15, to: 0.85, yaw: 4, pitch: 4, fov: 38 }),
      zone: "forest",
      look: NIGHT,
      note: "The side of one shoe, filling the frame: three buttons. They light one after another as he names them, and each one's label comes up over it: LIGHT SPEED, TOO FAST, JUST RIGHT.",
      stage: (t) => {
        const at2 = w("1.buttons", "too", 0.8) - 0.1;
        const at3 = w("1.buttons", "just", 1.5) - 0.1;
        const on = t < at2 ? 0 : t < at3 ? 1 : 2;
        const said = [0.05, at2, at3][on];
        return (
          <>
            <ShoePair one position={HELD} rotation={[0, -E, 0]} scale={1.4} glow={0.7} on={on} />
            <Board post={false} position={[HELD[0] - 0.02, HELD[1] + 0.36, HELD[2] + 0.13]} text={["LIGHT SPEED", "TOO FAST", "JUST RIGHT"][on]} scale={0.16 * pop(t, said)} color="#15151a" ink={["#4dff6a", "#ffb030", "#6fb8ff"][on]} />
            <Glint position={[HELD[0] - 0.1 + on * 0.1, HELD[1] + 0.14, HELD[2] + 0.13]} t={t - said} size={0.4} />
            {lamp([HELD[0] + 0.4, HELD[1] + 0.5, HELD[2] + 1], 3)}
          </>
        );
      },
    },
    {
      cue: "1.second",
      ...cam.push({ on: [BENCH[0], 1.0, BENCH[2]], onTo: [BENCH[0], 0.42, BENCH[2] + 0.4], dist: 3.8, to: 3.4, yaw: 2, pitch: 5, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "The log by the river, where part one stopped: the boy with 2nd over his head, the runner in black beside him with 1st. The lens goes down to four feet hanging off the log. Four red shoes, the same.",
      stage: (t) => {
        const same = w("1.second", "same", 2.7);
        return (
          <>
            <Me blue={false} position={MYSEAT} rotationY={0} animation="sit" face={t > same - 0.6 ? "wow" : "smile"} headYaw={0.7 * ease(ramp(t, 1.2, 1.7))} headPitch={0.5 * ease(ramp(t, same - 0.8, same - 0.3))} shoeGlow={0.5 + 0.5 * ease(ramp(t, same - 0.2, same + 0.2))} />
            <Rival position={HISSEAT} rotationY={0} animation="sit" face="calm" shoeGlow={0.5 + 0.5 * ease(ramp(t, same - 0.2, same + 0.2))} />
            <Place text="2nd" position={[MYSEAT[0], 1.95, MYSEAT[2]]} scale={0.5 * pop(t, 0.15) * (t < 1.6 ? 1 : 0)} />
            <Place text="1st" position={[HISSEAT[0], 2.0, HISSEAT[2]]} scale={0.5 * pop(t, w("1.second", "first", 1.4)) * (t < same - 0.5 ? 1 : 0)} />
            <Glint position={[BENCH[0] + RVX + 0.1, 0.2, BENCH[2] + 0.5]} t={t - same} size={0.8} />
            <Glint position={[BENCH[0] + MEX - 0.1, 0.2, BENCH[2] + 0.5]} t={t - same - 0.2} size={0.8} />
          </>
        );
      },
    },
    {
      cue: "2.turn",
      ...cam.push({ on: [BENCH[0] + 0.1, 1.0, BENCH[2]], dist: 3.9, to: 3.3, yaw: -8, pitch: 5, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "The log again. The runner in black turns his head to the boy's place: a ring of dust, a few white streaks going off behind the log, and nobody. He looks left, right, over his shoulder. A question mark comes up over his head.",
      stage: (t) => {
        const gone = w("2.turn", "gone", 0.9);
        const conf = w("2.turn", "confused", 1.9);
        return (
          <>
            <Rival position={HISSEAT} rotationY={0} animation="sit" face={t > gone ? "uneasy" : "calm"} headYaw={t < gone ? -0.9 * ease(ramp(t, 0.1, 0.5)) : -0.9 + 1.9 * ease(ramp(t, gone + 0.15, gone + 0.6)) - 1.4 * ease(ramp(t, conf - 0.3, conf + 0.1))} headRoll={0.2 * ease(ramp(t, conf - 0.1, conf + 0.2))} />
            <DustRing position={[MYSEAT[0], BENCH_TOP + 0.05, MYSEAT[2]]} t={t - 0.05} size={0.9} color="#c9a36a" />
            <Streaks position={[MYSEAT[0] - 0.4, 0.6, MYSEAT[2] - 0.5]} yaw={-2.2} t={t - 0.02} n={7} spread={0.4} speed={12} />
            <Puffs position={[MYSEAT[0], 0.5, MYSEAT[2]]} color="#c9a36a" count={5} rise={0.5} spread={0.4} size={0.12} opacity={0.5} />
            <Bubble text="?" position={[HISSEAT[0] + 0.1, 2.05, HISSEAT[2]]} scale={0.55 * pop(t, conf - 0.1)} />
          </>
        );
      },
    },
    {
      cue: "2.tree",
      ...cam.push({ on: up(HIDE, 1.0), dist: 3.0, to: 2.3, yaw: HYAW, pitch: 3, fov: 44 }),
      zone: "river",
      look: DAY,
      note: "The other side of a tree in the camp: the boy flat against the trunk, chest going up and down, eyes like plates. He looks down at his own red shoes, lit up, and back up at us.",
      stage: (t) => {
        const same = w("2.tree", "same", 1.9);
        return (
          <>
            <Me blue={false} position={[HIDE[0], hop(t, same - 0.1, 0.1, 0.25), HIDE[2]]} rotationY={HRY} animation="scared" face={t > same - 0.3 ? "wow" : "fear"} headPitch={0.55 * bump(t, same - 0.9, 0.9)} shoeGlow={0.6 + 0.4 * Math.sin(t * 8)} />
            <Bits position={up(HIDE, 1.5)} t={(t % 0.6)} color="#7fd0ff" count={3} power={1.2} seed={2} />
            <Glint position={[HIDE[0] + 0.2, 0.15, HIDE[2] - 0.3]} t={t - same} size={0.7} />
          </>
        );
      },
    },
    {
      cue: "2.three",
      ...cam.push({ on: R(GATE_X + 0.8, 1.25, LANE), dist: 6.6, to: 5.8, yaw: 22, pitch: 7, fov: 52 }),
      zone: "river",
      look: DAY,
      note: "The line of stage one, side on: three runners come through it one after another, out of breath, and a card comes up over each: 3rd, 4th, 5th. The third one is very small.",
      stage: (t) => {
        const ws = [w("2.three", "third", 1.7), w("2.three", "fourth", 2.2), w("2.three", "fifth", 2.7)];
        const run = (at0: number, v: number, stop: number): number => GATE_X + (t < at0 ? (t - at0) * v : stop * (1 - Math.exp((-(t - at0) * v) / stop)));
        const xs = [run(ws[0], 5.5, 2.6), run(ws[1], 5.2, 1.7), run(ws[2], 4.6, 0.9)];
        return (
          <>
            <Player who={2} position={R(xs[0], 0, LANE + 0.7)} rotationY={E} animation={t < ws[0] + 0.5 ? "run" : "stagger"} animDistance={xs[0] + 60} face="ouch" />
            <Villager position={R(xs[1], 0, LANE - 0.1)} rotationY={E} walk={(xs[1] + 60) * 1.3} robe={ROBE.farmer} lean={t < ws[1] ? 0.3 : 0.45} />
            <Baby position={R(xs[2], 0, LANE - 0.9)} rotationY={E} walk={(xs[2] + 60) * 1.8} />
            {["3rd", "4th", "5th"].map((s, i) => (
              <Place key={s} text={s} position={R(xs[i] + 0.1, [2.35, 2.5, 1.6][i], LANE + [0.7, -0.1, -0.9][i])} rotationY={0.3} scale={0.55 * pop(t, ws[i])} />
            ))}
            <Rival position={R(GATE_X + 3.4, 0, -0.4)} rotationY={-0.9} animation="lookAround" face="uneasy" />
          </>
        );
      },
    },
    {
      cue: "2.baby",
      ...cam.push({ on: R(GATE_X + 1.5, 0.62, LANE - 0.9), dist: 3.2, to: 2.5, yaw: 10, pitch: 6, fov: 44 }),
      zone: "river",
      look: DAY,
      note: "The baby villager, close, strutting past the line with his nose in the air, a little hop every other step, 5th over his head. He does not look tired at all.",
      stage: (t) => {
        const x = GATE_X + 0.9 + t * 0.55;
        const y = Math.abs(Math.sin(t * 6)) * 0.07;
        return (
          <>
            <Baby position={R(x, y, LANE - 0.9)} rotationY={E - 0.5} walk={t * 1.4} nod={-0.25} tilt={0.1 * Math.sin(t * 6)} />
            <Place text="5th" position={R(x + 0.05, 1.5 + y, LANE - 0.9)} scale={0.45 * pop(t, 0.1)} />
            <Player who={2} position={R(GATE_X + 3.2, 0, LANE + 1.2)} rotationY={2.6} animation="ache" face="ouch" />
          </>
        );
      },
    },
    {
      cue: "2.friends",
      ...cam.push({ on: R(GATE_X + 3.0, 1.1, 0.3), onTo: R(GATE_X + 3.0, 0.3, 0.4), dist: 5.4, to: 3.2, yaw: 8, pitch: 6, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "Two more runners come through the line, in grey, white hair like his. The runner in black waves them over, they bump fists in a row, and the lens goes down their legs to their feet.",
      stage: (t) => {
        const fr = w("2.friends", "friends", 1.6);
        const k = ease(ramp(t, 0.1, fr - 0.1));
        const from = (i: number): Vec3 => R(GATE_X - 5 - i * 1.4, 0, LANE - 0.3 + i * 0.6);
        const pos = (i: number, to: Vec3): Vec3 => [from(i)[0] + (to[0] - from(i)[0]) * k, hop(t, fr + 0.1 + i * 0.12, 0.18, 0.3), from(i)[2] + (to[2] - from(i)[2]) * k];
        const there = k >= 1;
        return (
          <>
            <Rival position={[TRIO[1][0], hop(t, fr + 0.2, 0.18, 0.3), TRIO[1][2]]} rotationY={there ? 0 : -1.2} animation={there ? "idle" : "wave"} face="grin" />
            <Pal n={0} position={pos(0, TRIO[0])} rotationY={there ? 0.25 : E} animation={there ? "cheer" : "run"} animDistance={k * 8} face="grin" />
            <Pal n={1} position={pos(1, TRIO[2])} rotationY={there ? -0.25 : E} animation={there ? "cheer" : "run"} animDistance={k * 9} face="grin" />
          </>
        );
      },
    },
    {
      cue: "2.too",
      ...cam.push({ on: [TRIO[1][0], 0.12, TRIO[1][2] + 0.3], dist: 3.0, to: 2.5, yaw: 5, pitch: 10, fov: 40 }),
      zone: "river",
      look: DAY,
      note: "Six feet in a row on the grass, close: six red shoes with a green light on the side of every right one. A glint runs along them, one, two, three.",
      stage: (t) => (
        <>
          <Rival position={TRIO[1]} rotationY={0} animation="idle" face="grin" shoeGlow={0.6 + 0.4 * ease(ramp(t, 0.3, 0.7))} />
          <Pal n={0} position={TRIO[0]} rotationY={0.25} animation="idle" face="grin" shoeGlow={0.6 + 0.4 * ease(ramp(t, 0.15, 0.5))} />
          <Pal n={1} position={TRIO[2]} rotationY={-0.25} animation="idle" face="grin" shoeGlow={0.6 + 0.4 * ease(ramp(t, 0.45, 0.9))} />
          {TRIO.map((p, i) => (
            <Glint key={i} position={[p[0], 0.15, p[2] + 0.35]} t={t - 0.2 - i * 0.22} size={0.7} />
          ))}
        </>
      ),
    },
    {
      cue: "2.hide",
      ...cam.push({ on: [HIDE[0] + 0.2, 0.75, HIDE[2]], dist: 4.4, to: 3.6, yaw: 96, pitch: 9, fov: 46 }),
      zone: "river",
      look: DAY,
      note: "The tree from its far side: half of the boy's face is out past the trunk, one eye. It snaps back in. He puts his back against the bark and slides down it until he is sitting on the ground with his knees up, looking at nothing.",
      stage: (t) => {
        const back = ease(ramp(t, 0.35, 0.6));
        const down = ease(ramp(t, w("2.hide", "peek", 1.6) - 0.5, w("2.hide", "peek", 1.6)));
        const p: Vec3 = [TREE[0] + 0.85 - 0.85 * back, -0.25 * down, TREE[2] - 0.55 - 0.35 * back];
        return (
          <>
            <Me blue={false} position={p} rotationY={back < 0.5 ? 0.9 : HRY - 0.5} animation={down > 0.5 ? "cower" : back < 1 ? "peek" : "scared"} face="fear" headYaw={back < 0.5 ? 0.3 : 0} />
            <Puffs position={[HIDE[0], 0.1, HIDE[2]]} color="#8a9a5a" count={down > 0.8 ? 4 : 0} rise={0.3} spread={0.4} size={0.1} opacity={0.5} />
            <Rival position={TRIO[1]} rotationY={0.3} animation="talk" face="grin" />
            <Pal n={0} position={TRIO[0]} rotationY={0.9} animation="laugh" face="laugh" />
            <Pal n={1} position={TRIO[2]} rotationY={-0.9} animation="talk" face="grin" />
          </>
        );
      },
    },
  ],
});
void Block;
