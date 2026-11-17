import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  BULLY, EAST, Fill, HIDE, Helmet, Hero, KID, KIDSPOT, NIGHT, NORTH, NewKid, Player, Tentacle, WEST, WOODS, at, ease, faceOf, jolt, kidHead, mix, ramp, timing,
  wordAt,
} from "./kit";
import { PEEK } from "./scene3";

/** The big kids' size, and where each stands: west of him, east of him, and in front of him (south). */
const BIG = 0.98;
const K = KIDSPOT;
const B: Vec3[] = [at(K, -1.25, 0, 0.1), at(K, 1.25, 0, 0.1), at(K, 0.1, 0, 1.4)];
const FACING = [EAST, WEST, NORTH];
const HEAD = kidHead(K);
/** What the teller sees from behind his tree: the clearing, with the trunk down the right edge of the frame. */
export const POV = { on: at(WOODS, 0, 1.3, 1.8) as Vec3, yaw: 74, pitch: 3 };
const PURPLE = "#b25ad0";
/** Where the kid stands once they have hold of him, and the middle of his head there. */
const P: Vec3 = at(K, 0, 0, -0.32);
const HEADP = kidHead(P);
/** The two on his arms; where they end up when they let go; where the puller stops after his step back. */
const HOLD: Vec3[] = [at(P, -0.62, 0, 0.05), at(P, 0.62, 0, 0.05)];
const FREE: Vec3[] = [at(P, -1.2, 0, 0.5), at(P, 1.2, 0, 0.5)];
const PUL: Vec3 = at(P, 0.04, 0, 1.1);
/** Where the helmet lands (scene 5 picks it up from the same place). */
const FELL: Vec3 = at(KIDSPOT, 1.0, 0.25, 1.3);
const MOVED = wordAt("4.moved", "moved");
const FIVE = wordAt("4.tent", "five");
const MANY = wordAt("4.tent", "many");

type Mood = { animation?: "idle" | "scared" | "panic" | "push" | "point" | "hold" | "lift" | "cower" | "laugh" | "stagger"; face?: "grin" | "angry" | "fear" | "wow" | "laugh" | "smug" };
/** The three, each at his own place (or the one given), each with his own mood. `hide` leaves one out. */
const Three: React.FC<{ at?: Vec3[]; mood?: Mood[]; all?: Mood; hide?: number[]; scale?: number[] }> = ({ at: where = B, mood = [], all = {}, hide = [], scale = [] }) => (
  <>
    {BULLY.map((who, i) =>
      hide.includes(i) ? null : (
        <Player key={who} who={who} scale={BIG * (scale[i] ?? 1)} position={where[i]} rotationY={FACING[i]} animation={mood[i]?.animation ?? all.animation ?? "idle"} face={mood[i]?.face ?? all.face ?? "grin"} phase={i * 0.9} blink />
      ),
    )}
  </>
);

/** Where the tentacles go when there is nobody to hold: a fan round the head. */
const fan = (i: number, n: number, reach: number): Vec3 => {
  const a = (i / n) * Math.PI * 2 + 0.4;
  return [HEAD[0] + Math.cos(a) * reach, HEAD[1] + 0.5 + 1.1 * Math.abs(Math.sin(i * 2.1)), HEAD[2] + 0.5 + Math.sin(a) * reach * 0.8];
};

/**
 * ACT 4. Under the old lamp. Three big kids, the helmet, and what was under it.
 */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Under the lamp",
  shots: [
    {
      cue: "4.lamp",
      ...cam.push({ on: at(POV.on, 0.4, 0.5, -0.4), dist: 8.8, to: 8.4, yaw: 68, pitch: POV.pitch, fov: 35 }),
      zone: "woods",
      look: NIGHT,
      note: "What the teller sees: his own tree down the edge of the frame, and past it one warm lamp in the dark with the grey kid under it. On 'not alone' three bigger shapes walk into the light.",
      stage: (t) => {
        const k = ease(ramp(t, wordAt("4.lamp", "not") - 0.5, wordAt("4.lamp", "alone") + 0.5));
        return (
          <>
            <NewKid position={K} animation="idle" breath={0.3} />
            <Three at={[mix(at(B[0], -3.5, 0, -1), B[0], k), mix(at(B[1], 1.5, 0, -3.5), B[1], k), mix(at(B[2], -1, 0, 3.8), B[2], k)]} />
            <Hero position={HIDE} rotationY={WEST} animation="peek" face="fear" />
          </>
        );
      },
    },
    {
      cue: "4.circle",
      ...cam.orbit({ on: at(K, 0, 1.0, 0.5), dist: 6.0, distTo: 5.2, yaw: 56, yawTo: 38, pitch: 28, fov: 44 }),
      zone: "woods",
      look: NIGHT,
      note: "From above, going round them, because from the side their backs hide him: three big kids and a small one in the middle. They are grinning. He looks at the ground.",
      stage: () => (
        <>
          <NewKid position={K} animation="idle" headPitch={0.35} breath={0.3} />
          <Three all={{ face: "grin" }} mood={[{}, { animation: "laugh", face: "laugh" }, { face: "smug" }]} />
          <Fill position={at(K, 2.5, 1.4, 3.6)} power={6} color="#ffd9a0" />
        </>
      ),
    },
    {
      cue: "4.push",
      ...cam.push({ on: at(K, 0, 1.0, 0.7), dist: 5.0, to: 4.4, yaw: 47, pitch: 18, fov: 44 }),
      zone: "woods",
      look: NIGHT,
      note: "The one in front shoves him in the chest. He goes back a step, and his arms stay down.",
      stage: (t) => {
        const hit = wordAt("4.push", "pushed");
        const back = ease(ramp(t, hit, hit + 0.25)) * 0.32;
        return (
          <>
            <NewKid position={at(K, jolt(t, hit, 0.03), 0, -back)} animation={t > hit && t < hit + 0.5 ? "stagger" : "idle"} headPitch={0.3} />
            <Three mood={[{}, {}, { animation: t > hit - 0.2 && t < hit + 0.35 ? "push" : "idle", face: "angry" }]} at={[B[0], B[1], at(B[2], 0, 0, t > hit - 0.2 ? -0.35 * ease(ramp(t, hit - 0.2, hit)) : 0)]} />
            <Fill position={at(K, 2.4, 1.4, 2.8)} power={6} color="#ffd9a0" />
          </>
        );
      },
    },
    {
      cue: "4.take",
      ...cam.push({ on: faceOf(B[2], BIG), dist: 1.95, to: 1.6, yaw: 201, pitch: 1, fov: 38 }),
      zone: "woods",
      look: NIGHT,
      note: "Past the edge of the helmet, at the one who is talking: the first big face of the scene, and it is enjoying this.",
      stage: () => (
        <>
          <NewKid position={at(K, 0, 0, -0.32)} animation="idle" />
          <Three hide={[0, 1]} mood={[{}, {}, { animation: "point", face: "angry" }]} />
          <Fill position={at(B[2], -0.8, 1.6, -1.2)} power={7} color="#ffd9a0" />
        </>
      ),
    },
    {
      cue: "4.held",
      ...cam.push({ on: at(HEAD, 0, -0.05, -0.32), dist: 1.8, to: 1.45, yaw: 14, pitch: 2, fov: 38 }),
      zone: "woods",
      look: NIGHT,
      note: "Close on him from the front: both hands up on the iron, pressing it down, and all of him shaking.",
      stage: (t) => (
        <>
          <NewKid position={at(K, Math.sin(t * 41) * 0.012, 0, -0.32 + Math.sin(t * 37) * 0.008)} animation="scared" breath={2} />
          <Three hide={[2]} />
          <Fill position={at(K, 0.8, 1.5, 1.4)} power={6} color="#ffd9a0" />
        </>
      ),
    },
    {
      cue: "4.scared",
      ...cam.push({ on: at(HEAD, 0, 0.03, -0.32), dist: 1.05, to: 0.72, yaw: -9, pitch: 0, fov: 36 }),
      zone: "woods",
      look: NIGHT,
      note: "The slit, as close as the lens gets. On 'not of them' something behind it lights up, faintly, and goes dark again.",
      stage: (t) => {
        const them = wordAt("4.scared", "not", 1) - 0.1;
        const g = t > them ? Math.max(0, Math.sin((t - them) * 4.2)) * 0.9 : 0;
        return (
          <>
            <NewKid position={at(K, Math.sin(t * 41) * 0.008, 0, -0.32)} animation="scared" glow={g} />
            <Fill position={at(K, -0.5, 1.5, 1.2)} power={5} color="#ffd9a0" />
          </>
        );
      },
    },
    {
      cue: "4.pull",
      ...cam.push({ on: at(K, 0, 1.2, 0.1), dist: 5.0, to: 4.2, yaw: 46, pitch: 15, fov: 42 }),
      zone: "woods",
      look: NIGHT,
      note: "All four of them, low and wide: one on each arm, and the third with both hands on the helmet. On 'pulled' it starts to come.",
      stage: (t) => {
        const hold = ease(ramp(t, 0, 0.6));
        const pull = wordAt("4.pull", "pulled") - 0.1;
        const up = ease(ramp(t, pull, pull + 0.6));
        const p = at(K, Math.sin(t * 30) * 0.015, 0, -0.32);
        return (
          <>
            <NewKid position={p} animation="scared" lift={up * 0.1 + (t > 0.8 ? Math.abs(Math.sin(t * 12)) * 0.015 : 0)} glow={up * 0.6} />
            <Three
              at={[mix(B[0], at(p, -0.62, 0, 0.05), hold), mix(B[1], at(p, 0.62, 0, 0.05), hold), mix(B[2], at(p, 0.04, 0, 0.66), ease(ramp(t, 0.3, 1.0)))]}
              mood={[{ animation: "hold", face: "grin" }, { animation: "hold", face: "laugh" }, { animation: t > 0.9 ? "lift" : "idle", face: "angry" }]}
            />
            <Fill position={at(K, 2.2, 1.4, 2.6)} power={6} color="#ffd9a0" />
          </>
        );
      },
    },
    {
      cue: "4.off",
      ...cam.push({ on: at(K, 0, 2.0, 0.2), dist: 3.2, to: 2.9, yaw: 4, pitch: -14, fov: 44 }),
      impacts: [{ at: 0.03, amp: 0.06, dur: 0.4 }],
      zone: "woods",
      look: NIGHT,
      note: "From behind the one who pulled, low: the helmet comes off in his hands, he goes back a step, and it leaves his fingers and goes up past the lamp, turning. We cannot see the kid's head yet, only the light that comes from where it is.",
      stage: (t) => {
        const k = ramp(t, 0.02, 1.0);
        return (
          <>
            <NewKid position={P} animation="idle" bare holeGlow={1.5} breath={0} weightShift={0} />
            <group scale={KID}>
              <Helmet position={[(P[0] + 0.6 * k) / KID, (1.62 + 2.3 * k - 1.4 * k * k) / KID, (P[2] + 0.5 + 0.7 * k) / KID]} rotation={[k * 5, k * 2, 0.4 * k]} />
            </group>
            <Three at={[HOLD[0], HOLD[1], at(P, 0.04, 0, 0.66 + 0.24 * ease(k))]} mood={[{ animation: "hold", face: "grin" }, { animation: "hold", face: "laugh" }, { animation: k < 0.5 ? "lift" : "stagger", face: "wow" }]} />
            <Fill position={at(P, 0, 1.3, 0.3)} power={10 + 30 * k} color={PURPLE} reach={5} />
          </>
        );
      },
    },
    {
      cue: "4.off",
      cut: 1.05,
      ...cam.push({ on: at(FELL, -0.3, 0.3, -0.3), dist: 3.7, to: 3.2, yaw: 35, pitch: 4, fov: 34 }),
      impacts: [{ at: 0.3, amp: 0.05, dur: 0.35 }, { at: 0.72, amp: 0.02, dur: 0.25 }],
      zone: "woods",
      look: NIGHT,
      note: "No words. From the ground: the helmet lands in the dirt, bounces once and rocks until it is still. Behind it, out of reach of the lens, four pairs of legs that have stopped moving, and a purple light that was not on the ground before.",
      stage: (t) => {
        const fall = ramp(t, 0, 0.3);
        const hop = t > 0.3 && t < 0.72 ? Math.sin(((t - 0.3) / 0.42) * Math.PI) * 0.22 : 0;
        const rock = t > 0.72 ? Math.sin((t - 0.72) * 16) * 0.3 * Math.max(0, 1 - (t - 0.72) / 0.8) : 0;
        const y = 1.6 + (FELL[1] - 1.6) * fall * fall + hop;
        const light = ease(ramp(t, 0.2, 1.5));
        return (
          <>
            <NewKid position={P} animation="idle" bare holeGlow={1.5} breath={0} weightShift={0} />
            <group scale={KID}>
              <Helmet position={[FELL[0] / KID, y / KID, FELL[2] / KID]} rotation={[0.2 + (1 - fall) * 2 + rock * 0.4, 0.7 + (1 - fall) * 1.5, 1.2 + rock]} />
            </group>
            <Three at={[HOLD[0], HOLD[1], mix(at(P, 0.04, 0, 0.9), PUL, ease(ramp(t, 0.1, 0.8)))]} mood={[{ animation: "hold", face: "wow" }, { animation: "hold", face: "wow" }, { animation: t < 0.8 ? "stagger" : "scared", face: "fear" }]} />
            <Fill position={at(P, 0, 0.9, 0.5)} power={1.2 + 3.6 * light + 0.9 * Math.sin(t * 11) * light} color={PURPLE} reach={4} />
            <Fill position={at(FELL, 0.8, 0.8, 0.9)} power={3} color="#ffd9a0" reach={3} />
          </>
        );
      },
    },
    {
      cue: "4.noface",
      ...cam.push({ on: faceOf(PUL, BIG), dist: 1.75, to: 1.3, yaw: 188, pitch: -3, fov: 38 }),
      handheld: 0.012,
      zone: "woods",
      look: NIGHT,
      note: "The puller's face, from where the kid's head is. He is still half laughing when the line starts. Then he sees it, and the laugh goes out of him.",
      stage: (t) => {
        const saw = t > 0.28;
        return (
          <>
            <Three hide={[0, 1]} at={[B[0], B[1], at(PUL, saw ? Math.sin(t * 40) * 0.008 : 0, 0, 0)]} mood={[{}, {}, { animation: saw ? "scared" : "idle", face: saw ? "fear" : "wow" }]} />
            <Fill position={at(P, 0, 1.3, 0.2)} power={1.6 + 1.6 * ease(ramp(t, 0.1, 0.9)) + 0.5 * Math.sin(t * 13)} color={PURPLE} reach={4} />
          </>
        );
      },
    },
    {
      cue: "4.noface",
      cut: 0.95,
      ...cam.push({ on: at(P, 0, 1.15, 0.6), dist: 4.1, to: 3.7, yaw: 150, pitch: 40, fov: 40 }),
      zone: "woods",
      look: NIGHT,
      note: "No words. From behind his bare head, so we still have not seen it: the two who held his arms let go, one and then the other, and step away from him. He lifts his head and looks at each of them.",
      stage: (t) => {
        const a = ease(ramp(t, 0.12, 0.55));
        const b = ease(ramp(t, 0.5, 0.95));
        return (
          <>
            <NewKid position={P} animation="idle" bare holeGlow={1.2} headPitch={0.45 - 0.45 * ease(ramp(t, 0.1, 0.9))} headYaw={0.5 * Math.sin(ramp(t, 0.5, 1.3) * Math.PI * 2)} breath={0} weightShift={0} />
            <Three
              at={[mix(HOLD[0], FREE[0], a), mix(HOLD[1], FREE[1], b), PUL]}
              mood={[{ animation: a > 0.05 ? "scared" : "hold", face: "fear" }, { animation: b > 0.05 ? "scared" : "hold", face: b > 0.05 ? "fear" : "wow" }, { animation: "scared", face: "fear" }]}
            />
            <Fill position={at(P, 0, 1.3, 0.45)} power={4 + 1.5 * Math.sin(t * 12)} color={PURPLE} reach={4} />
            <Fill position={at(P, -1.5, 1.6, -1.4)} power={3} color="#ffd9a0" reach={4} />
          </>
        );
      },
    },
    {
      cue: "4.hole",
      ...cam.push({ on: at(HEADP, 0, -0.04, 0), dist: 2.3, to: 1.2, yaw: 6, pitch: -2, fov: 36 }),
      zone: "woods",
      look: NIGHT,
      note: "The reveal, as the puller sees it. His head is down when the shot starts; it comes up on the word 'hole', and where the face should be there is a square of black with a wet rim. Nothing in it yet.",
      stage: (t) => (
        <>
          <NewKid position={P} animation="idle" bare holeGlow={0.25 + 0.5 * ease(ramp(t, 0.5, 1.6))} headPitch={0.6 - 0.6 * ease(ramp(t, 0.08, 0.7))} breath={0} weightShift={0} />
          <Fill position={at(P, 0.6, 1.5, 1.5)} power={4} color="#ffd9a0" />
          <Fill position={at(HEADP, 0, 0, 0.5)} power={1 + 2.5 * ease(ramp(t, 0.5, 1.6))} color={PURPLE} reach={3} />
        </>
      ),
    },
    {
      cue: "4.moved",
      ...cam.push({ on: at(HEADP, 0, 0, 0.1), dist: 1.15, to: 0.82, yaw: -9, pitch: 0, fov: 34 }),
      handheld: 0.008,
      zone: "woods",
      look: NIGHT,
      note: "Closer than anybody would want to be. Something dark slides about in the black; the bits of the rim twitch. On 'moved' one thin end comes up over the edge and feels its way along the rim.",
      stage: (t) => {
        const out = ease(ramp(t, MOVED - 0.35, MOVED + 0.45));
        return (
          <>
            <NewKid position={P} animation="idle" bare stir={t * 1.4} holeGlow={0.7 + 0.35 * Math.sin(t * 6)} headRoll={0.12 * ease(ramp(t, 0.2, 1.4))} breath={0} weightShift={0} />
            <Tentacle from={at(HEADP, 0.05, -0.06, 0.13)} to={at(HEADP, 0.2 * Math.sin(t * 2.6), -0.1 + 0.12 * Math.cos(t * 3.1), 0.36)} k={out} t={t} thick={0.075} seed={3} bend={0.5} n={10} />
            <Fill position={at(P, 0.6, 1.5, 1.4)} power={4} color="#ffd9a0" />
            <Fill position={at(HEADP, 0, 0, 0.5)} power={3.5 + Math.sin(t * 6)} color={PURPLE} reach={3} />
          </>
        );
      },
    },
    {
      cue: "4.moved",
      cut: 1.7,
      ...cam.push({ on: at(P, 0, 1.25, 0.55), dist: 3.9, to: 3.6, yaw: 90, pitch: 3, fov: 46 }),
      zone: "woods",
      look: NIGHT,
      note: "No words. From the side: the small kid on the left, the big one on the right, shaking and not able to move. The thin arm crosses the gap between them slowly and touches his face. Then it is gone back in, fast.",
      stage: (t, { dur }) => {
        const reach = ease(ramp(t, 0, 1.15));
        const back = ramp(t, dur - 0.16, dur - 0.02);
        const face = at(faceOf(PUL, BIG), 0, -0.04, -0.27);
        return (
          <>
            <NewKid position={P} animation="idle" bare stir={t * 1.4} holeGlow={1.2} headRoll={0.12} headPitch={-0.12 * reach} breath={0} weightShift={0} />
            <Tentacle from={at(HEADP, 0, -0.04, 0.13)} to={face} k={Math.max(0.05, (0.1 + 0.9 * reach) * (1 - back))} t={t * 0.6} thick={0.085} seed={3} bend={0.35} n={26} />
            <Three
              hide={[1]}
              at={[at(FREE[0], -0.25 * reach, 0, 0.2 * reach), FREE[1], at(PUL, Math.sin(t * 44) * 0.01, 0, 0)]}
              mood={[{ animation: "cower", face: "fear" }, {}, { animation: "idle", face: "fear" }]}
            />
            <Fill position={at(P, 2.2, 1.5, 0.55)} power={5} color="#ffd9a0" reach={5} />
            <Fill position={at(HEADP, 0, 0, 0.5)} power={4 + Math.sin(t * 7)} color={PURPLE} reach={3.5} />
          </>
        );
      },
    },
    {
      cue: "4.tent",
      ...cam.push({ on: at(K, 0, 1.7, 0.2), dist: 5.2, to: 6.2, yaw: 14, pitch: -8, fov: 46 }),
      impacts: [{ at: 0.05, amp: 0.05, dur: 0.3 }, { at: FIVE - 0.12, amp: 0.07, dur: 0.4 }, { at: MANY - 0.15, amp: 0.11, dur: 0.7 }],
      zone: "woods",
      look: NIGHT,
      note: "Low and pulling back, because the frame has to get bigger: one, then five, then a crown of them, taller than the lamp. The three back away and do not turn round.",
      stage: (t) => {
        const one = wordAt("4.tent", "one") - 0.1;
        const five = wordAt("4.tent", "five") - 0.15;
        const many = wordAt("4.tent", "many") - 0.2;
        const p = at(K, 0, 0, -0.32);
        const h = at(kidHead(p), 0, 0, 0.14);
        const away = ease(ramp(t, one, many + 0.4));
        return (
          <>
            <NewKid position={p} animation="idle" bare holeGlow={1.4} headPitch={-0.25} breath={0} weightShift={0} />
            {Array.from({ length: 13 }, (_, i) => {
              const start = i === 0 ? one : i < 5 ? five + i * 0.05 : many + (i - 5) * 0.06;
              return <Tentacle key={i} from={h} to={fan(i, 13, 2.2 + (i % 3) * 0.5)} k={ease(ramp(t, start, start + 0.55))} t={t} thick={0.16 + (i % 3) * 0.04} seed={i + 1} />;
            })}
            <Three at={[at(B[0], -0.9 * away, 0, 0.5 * away), at(B[1], 1.3 * away, 0, 0.2 * away), at(B[2], -1.3 * away, 0, 0.5 * away)]} all={{ animation: "scared", face: "fear" }} />
            <Fill position={at(p, 0, 1.6, 0.6)} power={30} color={PURPLE} reach={7} />
          </>
        );
      },
    },
    {
      cue: "4.thick",
      ...cam.orbit({ on: at(K, 0, 2.0, 0.5), dist: 6.4, distTo: 5.6, yaw: -22, yawTo: 14, pitch: -13, fov: 48 }),
      zone: "woods",
      look: NIGHT,
      note: "From the ground, looking up: they are as thick as the trunks behind them now. One goes round each big kid and lifts him off his feet.",
      stage: (t) => {
        const grab = wordAt("4.thick", "wrapped") - 0.25;
        const p = at(K, 0, 0, -0.32);
        const h = at(kidHead(p), 0, 0, 0.14);
        const far = [at(B[0], -0.9, 0, 0.5), at(B[1], 0.9, 0, 0.5), at(B[2], 0.2, 0, 1.1)];
        return (
          <>
            <NewKid position={p} animation="idle" bare holeGlow={1.6} headPitch={-0.3} breath={0} weightShift={0} />
            {far.map((f, i) => {
              const k = ease(ramp(t, grab + i * 0.12, grab + 0.5 + i * 0.12));
              const up = ease(ramp(t, grab + 0.5 + i * 0.12, grab + 1.3 + i * 0.12));
              const body = at(f, 0, 1.5 * up, 0);
              return (
                <group key={i}>
                  <Player who={BULLY[i]} scale={BIG} position={body} rotationY={FACING[i]} animation="panic" face="fear" phase={i} />
                  <Tentacle from={h} to={at(body, 0, 1.0, 0)} k={0.55 + 0.45 * k} t={t} thick={0.46} seed={i + 21} bend={0.8} n={34} />
                  {/* a coil round the chest */}
                  {k > 0.9
                    ? [0, 1, 2, 3].map((j) => (
                        <group key={j} position={[body[0] + Math.cos(j * 1.57 + t) * 0.3, body[1] + 0.95 + j * 0.06, body[2] + Math.sin(j * 1.57 + t) * 0.3]}>
                          <mesh>
                            <boxGeometry args={[0.3, 0.26, 0.3]} />
                            <meshStandardMaterial color="#5a2470" emissive="#3a1050" emissiveIntensity={0.5} />
                          </mesh>
                        </group>
                      ))
                    : null}
                </group>
              );
            })}
            {Array.from({ length: 8 }, (_, i) => (
              <Tentacle key={i} from={h} to={fan(i, 8, 2.8 + (i % 3) * 0.6)} k={1} t={t} thick={0.3 + (i % 2) * 0.1} seed={i + 5} />
            ))}
            <Fill position={at(p, 0, 1.8, 0.8)} power={40} color={PURPLE} reach={8} />
          </>
        );
      },
    },
    {
      cue: "4.scream",
      ...cam.push({ on: faceOf(PEEK), dist: 1.6, to: 1.3, yaw: -78, pitch: 0, fov: 36 }),
      zone: "woods",
      look: NIGHT,
      note: "The teller, close, at the edge of his tree: the purple light coming and going on his face. He has stopped blinking.",
      stage: (t) => (
        <>
          <Hero position={PEEK} rotationY={WEST} animation="peek" face="fear" gaze={0} blink={false} breath={0.2} />
          <Fill position={at(PEEK, -1.4, 1.3, 0.3)} power={2.2 + 1.2 * Math.sin(t * 9)} color={PURPLE} reach={5} />
        </>
      ),
    },
    {
      cue: "4.swallow",
      ...cam.push({ on: at(POV.on, 0.4, 0.7, -0.4), dist: 8.8, to: 8.5, yaw: 68, pitch: POV.pitch, fov: 37 }),
      zone: "woods",
      look: NIGHT,
      note: "The whole of it from behind the tree, small and far away, which is worse: three kids in the air go in towards one small grey kid, one after another, and are not there any more. Then the arms go back in.",
      stage: (t) => {
        const times = [wordAt("4.swallow", "in") - 0.25, wordAt("4.swallow", "all") - 0.1, wordAt("4.swallow", "three") - 0.05];
        const gone = wordAt("4.swallow", "gone") - 0.35;
        const back = 1 - ease(ramp(t, gone, gone + 0.7));
        const p = at(K, 0, 0, -0.32);
        const h = at(kidHead(p), 0, 0, 0.14);
        const far = [at(B[0], -0.9, 1.5, 0.5), at(B[1], 0.9, 1.5, 0.5), at(B[2], 0.2, 1.5, 1.1)];
        return (
          <>
            <NewKid position={p} animation="idle" bare holeGlow={1.6} headPitch={-0.2} breath={0} weightShift={0} />
            {far.map((f, i) => {
              const k = ease(ramp(t, times[i], times[i] + 0.5));
              const body = mix(f, at(h, 0, -0.5, 0), k);
              return (
                <group key={i}>
                  {k < 0.97 ? <Player who={BULLY[i]} scale={BIG * (1 - 0.85 * k)} position={body} rotationY={FACING[i]} animation="panic" face="fear" phase={i} /> : null}
                  <Tentacle from={h} to={at(body, 0, 1.0 * (1 - k), 0)} k={k < 0.97 ? 1 : back} t={t} thick={0.42} seed={i + 21} bend={0.8 * (1 - k * 0.6)} n={30} />
                </group>
              );
            })}
            {Array.from({ length: 8 }, (_, i) => (
              <Tentacle key={i} from={h} to={fan(i, 8, 2.8 + (i % 3) * 0.6)} k={back} t={t} thick={0.3} seed={i + 5} />
            ))}
            <Hero position={HIDE} rotationY={WEST} animation="peek" face="fear" />
            <Fill position={at(p, 0, 1.8, 0.8)} power={36 * back + 4} color={PURPLE} reach={8} />
          </>
        );
      },
    },
  ],
});
