import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Beam, Bits, Bubble, Bush, Crater, CutTree, DUSK, DustRing, Fill, Hero, Jets, Katana, OldMan, Slash, Smoke, Streaks, ZONE,
  ease, f, front, hop, jolt, lerp, pop, ramp, timing, wordAt,
} from "./kit";
import { BUSH, TREE } from "./scene5";

/**
 * The fight. Everything here MOVES: nobody stands on a mark and waits for the line. The clearing runs west to
 * east; the camera is south of it. The fight starts in the middle, is driven east until the teller's back is
 * against a tree, goes up over the pines, and comes down again in a hole.
 */
export const ME0: Vec3 = f(0.6, 0, -0.7);
export const OLD0: Vec3 = f(2.7, 0, -1.2);
const TREE2: Vec3 = f(-0.9, 0, -1.5);
const SAPLING: Vec3 = f(2.3, 0, -2.9);
export const BIG: Vec3 = f(5.9, 0, -1.5);
/** Where he comes down. */
export const CR: Vec3 = f(1.2, 0, -0.2);
/** How high "over the trees" is. */
const SKY = 9.2;
const RED = "#ff3b2e";
const CYAN = "#4fe3ff";
const E = Math.PI / 2;
const W = -Math.PI / 2;
const Z = FZ(-0.7);
function FZ(z: number) {
  return f(0, 0, z)[2];
}
const at = (x: number, y = 0, z = -0.7): Vec3 => f(x, y, z);

/** One chop: the arm is up, comes down on `when`, stays down a moment, goes back up. 0 = up, 1 = down. */
const chop = (t: number, when: number) => ramp(t, when - 0.09, when + 0.02) * (1 - ramp(t, when + 0.22, when + 0.42));

/** The old man with the blade out. `swing` 0 holds it over his head, 1 has it down in front of him. */
const Blade: React.FC<{ position: Vec3; yaw: number; swing?: number; out?: number; headPitch?: number; t?: number }> = ({ position, yaw, swing = 0, out = 1, headPitch = 0 }) => (
  <OldMan position={position} rotationY={yaw} suit={1} animation="reachUp" blendTo="point" blend={1 - swing} headPitch={headPitch}>
    <Katana out={out} />
  </OldMan>
);

/** What is standing in the clearing while they fight. */
export const Woods: React.FC<{ cut2?: number; sap?: number; big?: number; shake?: number; t?: number; hole?: boolean }> = ({ cut2 = 0, sap = 0, big = 0, shake = 0, t = 0, hole = false }) => (
  <>
    <CutTree position={TREE} cut={1} dir={-1} />
    <CutTree position={TREE2} cut={cut2} at={1.75} dir={-1} />
    <CutTree position={SAPLING} height={3.4} cut={sap} at={1.5} dir={1} />
    <CutTree position={BIG} height={6.5} cut={big} at={1.7} dir={1} />
    <Bush position={BUSH} shake={shake} t={t} />
    {hole ? <Crater position={CR} /> : null}
  </>
);

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The fight",
  shots: [
    {
      cue: "12.suit",
      ...cam.orbit({ on: [OLD0[0], 1.25, OLD0[2]], dist: 4.6, distTo: 3.6, yaw: -32, yawTo: 14, pitch: 2, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The camera swings round the old man as he stops shaking and stands up straight. Dark metal snaps shut over him from the feet up, a ring of dust goes out along the grass, and where his face was there are two red eyes. Behind him the teller takes a step back.",
      impacts: [{ at: 1.1, amp: 0.07, dur: 0.35 }],
      stage: (t) => {
        const not = wordAt("12.suit", "not");
        const on = t > not;
        const back = 0.7 * ease(ramp(t, not, not + 0.6));
        return (
          <>
            <OldMan position={[OLD0[0] + (on ? 0 : Math.sin(t * 42) * 0.015), hop(t, not, 0.25, 0.3), OLD0[2]]} rotationY={W * 0.5} animation={on ? "guard" : t > not - 0.5 ? "idle" : "ache"} suit={on ? 1 : 0} />
            <DustRing position={OLD0} t={t - not} size={2.4} color="#6a7a5a" />
            <Bits position={[OLD0[0], 1.0, OLD0[2] + 0.3]} t={t - not} color={RED} count={22} power={3} />
            <Bits position={[OLD0[0], 0.3, OLD0[2] + 0.3]} t={t - not} color="#34343e" count={14} power={2.4} />
            {on ? <pointLight position={[OLD0[0] - 0.3, 1.6, OLD0[2] + 0.9]} color={RED} intensity={6 + 24 * jolt(t, not, 0.5)} distance={5} decay={2} /> : null}
            <Hero position={[ME0[0] - back, 0, ME0[2]]} rotationY={E} animation={on ? "stagger" : "reach"} animDistance={back} suit={1} visor={on ? 0 : 1} face="wow" />
            <Fill on={[OLD0[0], 1.3, OLD0[2]]} yaw={-10} power={4} />
            <Woods />
          </>
        );
      },
    },
    {
      cue: "12.katana",
      ...cam.push({ on: at(2.0, 1.3, -1.0), onTo: at(1.0, 1.3, -0.9), dist: 6.4, to: 5.4, yaw: 0, pitch: 3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "A long thin blade slides out of his arm with a line of sparks. He drops low, and on 'jumped' he comes across the clearing in one leap with the blade over his head, speed lines behind him. The teller is going backwards already.",
      impacts: [{ at: 1.5, amp: 0.05, dur: 0.25 }],
      stage: (t) => {
        const k = wordAt("12.katana", "katana");
        const j = wordAt("12.katana", "jumped");
        const go = ramp(t, j - 0.05, j + 0.5);
        const x = lerp(OLD0[0], ME0[0] + 0.3, go * go);
        const back = 0.9 * ease(ramp(t, k, j + 0.5));
        return (
          <>
            <Hero position={[ME0[0] - 0.7 - back, 0, ME0[2]]} rotationY={E} animation="stagger" animDistance={0.7 + back} suit={1} />
            <Blade position={[x, 1.3 * Math.sin(Math.PI * go) + (go <= 0 ? -0.1 * ease(ramp(t, k, j)) : 0), lerp(OLD0[2], ME0[2], go)]} yaw={W} swing={go > 0.8 ? 1 : 0} out={ease(ramp(t, k - 0.15, k + 0.15))} />
            <Bits position={[OLD0[0] - 0.4, 1.2, OLD0[2] + 0.3]} t={t - k} color="#ffd8cc" count={10} power={1.6} />
            {go > 0 && go < 1 ? <Streaks position={[x + 1.2, 1.4, Z]} yaw={W} t={t} n={10} spread={0.9} speed={18} color="#ffb0a0" /> : null}
            <DustRing position={OLD0} t={t - j + 0.05} size={1.8} color="#6a7a5a" />
            <Woods />
          </>
        );
      },
    },
    {
      cue: "12.duck",
      ...cam.push({ on: [ME0[0] - 1.5, 1.7, ME0[2]], dist: 3.4, to: 2.3, yaw: 38, pitch: -2, fov: 42 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Over his shoulder, slow: the old man hanging in the air, the blade coming down. The helmet's eyes flash and one word comes up: DUCK.",
      stage: (t, { p }) => {
        const d = wordAt("12.duck", "duck");
        const H: Vec3 = [ME0[0] - 1.6, 0, ME0[2]];
        return (
          <>
            <Hero position={H} rotationY={E * 0.6} animation="scared" suit={1} eyes={1 + 2.5 * jolt(t, d, 0.5)} />
            <Blade position={[H[0] + 2.3 - 0.9 * p, 1.2 - 0.5 * p, H[2] - 0.2]} yaw={W} swing={0.5 * p} />
            <Streaks position={[H[0] + 2.6, 1.6, H[2]]} yaw={W} t={t * 0.3} n={8} spread={1.0} speed={10} color="#ffb0a0" />
            <group scale={pop(t, d - 0.12)}>
              <Bubble text="DUCK!" position={[H[0] - 0.15, 2.38, H[2] + 0.2]} rotationY={0.5} scale={0.5} dark />
            </group>
            <pointLight position={[H[0] + 0.8, 1.8, H[2] + 0.8]} color={RED} intensity={0.6 + 1.6 * p} distance={4} decay={2} />
            <Fill on={[H[0], 1.5, H[2]]} yaw={38} power={3} />
          </>
        );
      },
    },
    {
      cue: "12.ducked",
      ...cam.push({ on: at(-0.6, 1.2, -1.0), onTo: at(-0.9, 1.3, -1.1), dist: 5.6, to: 5.0, yaw: 0, pitch: 3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "He drops flat. The old man goes over the top of him, the blade draws a red line through the air and through the tree behind, and the old man lands in a skid. The top of the tree slides off. The teller rolls out from under and runs.",
      impacts: [{ at: 0.5, amp: 0.05, dur: 0.2 }, { at: 1.75, amp: 0.07, dur: 0.3 }],
      stage: (t) => {
        const tree = wordAt("12.ducked", "tree");
        const over = ramp(t, 0.05, 0.75);
        const H0: Vec3 = [ME0[0] - 1.6, 0, ME0[2]];
        const skid = 0.5 * ease(ramp(t, 0.75, 1.3));
        const ox = lerp(H0[0] + 1.4, TREE2[0] + 1.2, over) - skid;
        const away = ease(ramp(t, 0.9, 2.4));
        const sl = 0.42;
        return (
          <>
            <Hero position={[H0[0] + 2.4 * away, 0, H0[2] + 0.5 * Math.sin(Math.PI * away)]} rotationY={E} animation={t < 0.9 ? "crouch" : "run"} animDistance={2.4 * away} suit={1} />
            <Blade position={[ox, 0.85 * Math.sin(Math.PI * Math.min(1, over)), lerp(H0[2], TREE2[2] + 0.6, over)]} yaw={W} swing={chop(t, sl)} />
            <Slash position={[ox - 0.2, 1.5, H0[2] - 0.1]} rotationY={W} t={t - sl} flat r={1.5} />
            <Bits position={[TREE2[0] + 0.3, 1.75, TREE2[2] + 0.3]} t={t - sl - 0.05} color="#ffb060" count={18} power={3} />
            <DustRing position={[TREE2[0] + 0.9, 0, TREE2[2] + 0.6]} t={t - 0.75} size={1.4} color="#6a7a5a" />
            <Woods cut2={ease(ramp(t, tree - 0.5, tree + 0.4))} />
          </>
        );
      },
    },
    {
      cue: "12.again",
      ...cam.truck({ on: at(0.9, 1.25, -0.8), dist: 6.2, yaw: 0, pitch: 3, fov: 44, by: [1.3, 0, 0] }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The old man turns on his heel and comes after him: three cuts, one on each 'again', each one a step closer. The teller jumps back from the first, leans away from the second (it takes the top off a young tree instead), and gets a foot-jet lit just in time to skip away from the third. The camera goes with them.",
      impacts: [{ at: 1.2, amp: 0.04, dur: 0.2 }, { at: 2.2, amp: 0.05, dur: 0.2 }, { at: 3.1, amp: 0.06, dur: 0.25 }],
      stage: (t) => {
        const a = [wordAt("12.again", "again", 0), wordAt("12.again", "again", 1), wordAt("12.again", "again", 2)];
        const turn = ease(ramp(t, 0.05, 0.45));
        // the old man: turn, then three lunges
        const ox = -0.4 + 0.5 * ease(ramp(t, 0.4, a[0])) + 0.75 * ease(ramp(t, a[0] + 0.3, a[1])) + 0.75 * ease(ramp(t, a[1] + 0.3, a[2]));
        const swing = Math.max(chop(t, a[0]), chop(t, a[1]), chop(t, a[2]));
        // the teller: three escapes
        const hx = 0.85 + 0.55 * ease(ramp(t, a[0] - 0.12, a[0] + 0.2)) + 0.6 * ease(ramp(t, a[1] - 0.12, a[1] + 0.2)) + 0.75 * ease(ramp(t, a[2] - 0.12, a[2] + 0.25));
        const hy = hop(t, a[0] - 0.12, 0.35, 0.35) + hop(t, a[2] - 0.12, 0.7, 0.45);
        const lean = jolt(t, a[1], 0.4);
        return (
          <>
            <Hero position={at(hx, hy, -0.7 + 0.35 * lean)} rotationY={W} animation={lean > 0.1 ? "cower" : hy > 0.05 ? "fall" : "scared"} suit={1} />
            <Jets position={at(hx, hy, -0.7)} power={ramp(t, a[2] - 0.15, a[2]) * (1 - ramp(t, a[2] + 0.3, a[2] + 0.5))} t={t} />
            <Blade position={at(ox, 0.12 * swing, -0.75)} yaw={lerp(W, E, turn)} swing={swing} />
            {a.map((w, i) => (
              <group key={i}>
                <Slash position={at(-0.4 + [0.5, 1.25, 2.0][i] + 0.2, 1.45, -0.75)} rotationY={E} t={t - w} flat={i === 1} r={1.4} />
                <Bits position={at(-0.4 + [0.5, 1.25, 2.0][i] + 1.1, i === 1 ? 1.5 : 0.2, i === 1 ? -2.6 : -0.6)} t={t - w - 0.03} color={i === 1 ? "#ffb060" : "#8aa070"} count={14} power={2.6} />
              </group>
            ))}
            <Woods cut2={1} sap={ease(ramp(t, a[1], a[1] + 0.7))} />
          </>
        );
      },
    },
    {
      cue: "12.back",
      ...cam.truck({ on: at(3.3, 1.25, -0.8), dist: 6.4, yaw: 0, pitch: 3, fov: 44, by: [1.5, 0, 0] }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The teller going backwards across the clearing as fast as his legs will go, arms out, the old man walking after him without hurrying, the point of the blade drawing sparks along the ground. On 'forest' the teller's back hits a tree. That is the end of the clearing.",
      impacts: [{ at: 1.9, amp: 0.06, dur: 0.25 }],
      stage: (t) => {
        const hit = wordAt("12.back", "forest");
        const k = ramp(t, 0, hit);
        const hx = lerp(2.75, 5.25, k);
        const ox = lerp(1.6, 3.9, ramp(t, 0, hit + 0.4));
        return (
          <>
            <Hero position={at(hx)} rotationY={W} animation={k < 1 ? "stagger" : "scared"} animDistance={-2.5 * k * 1.6} suit={1} />
            <Bits position={at(5.5, 1.3, -1.0)} t={t - hit} color="#3a7d34" count={14} power={2.2} />
            <Bits position={at(5.2, 0.1, -0.6)} t={t - hit} color="#8aa070" count={8} power={1.4} />
            <OldMan position={at(ox, 0, -0.75)} rotationY={E} suit={1} animation="walk" animDistance={ox - 1.6}>
              <Katana out={1} />
            </OldMan>
            <Bits position={at(ox + 0.5, 0.05, -0.55)} t={(t % 0.25)} color="#ffd8a0" count={5} power={1.0} />
            <Streaks position={at(hx - 1.0, 1.2, -0.7)} yaw={W} t={t} n={7} spread={0.8} speed={k < 1 ? 14 : 0} color="#d8f4ff" />
            <Woods cut2={1} sap={1} />
          </>
        );
      },
    },
    {
      cue: "12.up",
      ...cam.push({ on: at(5.0, 1.6, -0.7), onTo: at(5.0, 4.6, -0.7), dist: 6.4, to: 7.2, yaw: 0, pitch: -14, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The blade comes round flat, at neck height. Both his boots light and he is gone, straight up, and the blade goes through the tree he was standing against instead.",
      impacts: [{ at: 0.3, amp: 0.08, dur: 0.3 }],
      stage: (t) => {
        const up = ramp(t, 0.12, 0.8);
        const hy = 7 * up * up;
        return (
          <>
            <Hero position={at(5.25, hy)} rotationY={W} animation={up > 0 ? "reachUp" : "scared"} suit={1} />
            <Jets position={at(5.25, hy)} power={up > 0 ? 1 : 0} t={t} />
            <DustRing position={at(5.25)} t={t - 0.12} size={2.2} color="#6a7a5a" />
            <Blade position={at(lerp(3.9, 4.55, ease(ramp(t, 0, 0.3))), 0, -0.75)} yaw={E} swing={chop(t, 0.28)} />
            <Slash position={at(4.7, 1.5, -0.75)} rotationY={E} t={t - 0.28} flat r={1.5} />
            <Bits position={at(5.7, 1.7, -1.2)} t={t - 0.3} color="#ffb060" count={18} power={3} />
            <Woods cut2={1} sap={1} big={ease(ramp(t, 0.3, 1.2))} />
          </>
        );
      },
    },
    {
      cue: "12.follow",
      ...cam.push({ on: at(4.55, 1.5, -0.75), onTo: at(4.55, 3.4, -0.75), dist: 4.6, to: 6.6, yaw: -14, pitch: -10, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The old man lets the blade drop and tips his head back to look up at him. The tree behind him is still falling. Then red fire comes out of his own boots, and he goes up after him, faster.",
      impacts: [{ at: 1.5, amp: 0.05, dur: 0.3 }],
      stage: (t) => {
        const feet = wordAt("12.follow", "feet");
        const up = ramp(t, feet + 0.15, feet + 0.9);
        const P = at(4.55, 6.5 * up * up, -0.75);
        return (
          <>
            <OldMan position={P} rotationY={0.3} suit={1} animation={up > 0 ? "reachUp" : "idle"} headPitch={-0.7 * ease(ramp(t, 0.1, 0.5))}>
              <Katana out={1} />
            </OldMan>
            <Jets position={P} power={ramp(t, feet - 0.05, feet + 0.15)} t={t} color={RED} />
            <DustRing position={at(4.55, 0, -0.75)} t={t - feet - 0.15} size={2.2} color="#6a7a5a" />
            <Bits position={at(4.55, 0.1, -0.75)} t={t - feet} color={RED} count={14} power={2.4} />
            <Woods cut2={1} sap={1} big={ease(ramp(t, -0.9, 0.5))} />
            <Fill on={at(4.55, 1.5, -0.75)} yaw={-14} power={3} />
          </>
        );
      },
    },
    {
      cue: "12.chase",
      ...cam.push({ on: at(-3.6, SKY + 1.0, -1), onTo: at(2.8, SKY + 1.0, -1), dist: 9.0, to: 8.0, yaw: 0, pitch: -3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Over the tops of the pines, both of them going flat out from left to right. The teller is all over the sky, up, down, arms going; the old man behind him flies in a dead straight line with the blade held out in front, and closes the gap.",
      shake: 0.012,
      stage: (t, { p }) => {
        const hx = lerp(-3.4, 3.6, p);
        const ox = hx - lerp(2.7, 1.3, p);
        const hy = SKY + 0.7 * Math.sin(t * 6.5) + 0.25 * Math.sin(t * 15);
        const H = at(hx, hy, -1 + 0.4 * Math.sin(t * 4));
        const O = at(ox, SKY + 0.3, -1);
        return (
          <>
            <Hero position={H} rotationY={E + 0.4 * Math.sin(t * 6.5)} animation="panic" suit={1} />
            <Jets position={H} power={1} t={t} />
            <Beam from={[H[0] - 0.3, H[1] + 0.2, H[2]]} to={[H[0] - 2.2, H[1] + 0.2 - 0.6 * Math.cos(t * 6.5), H[2]]} width={0.1} color={CYAN} core="#eaffff" />
            <Blade position={O} yaw={E} swing={1} />
            <Jets position={O} power={1} t={t} color={RED} />
            <Beam from={[O[0] - 0.3, O[1] + 0.2, O[2]]} to={[O[0] - 3.0, O[1] + 0.2, O[2]]} width={0.1} color={RED} core="#ffd0c0" />
            <Streaks position={at(lerp(-3.6, 2.8, p), SKY + 1.0, -1)} yaw={W} t={t} n={16} spread={2.6} speed={22} color="#d8e4ff" />
          </>
        );
      },
    },
    {
      cue: "12.beam",
      ...cam.push({ on: at(0.4, SKY + 1.2, -1), dist: 7.4, to: 6.6, yaw: 0, pitch: -3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The teller spins round in the air and puts his hand out: the blue beam goes straight at the old man. The old man does not move out of the way. The blade comes down through the beam and the beam goes past him in two halves, one each side.",
      impacts: [{ at: 1.7, amp: 0.07, dur: 0.3 }],
      stage: (t) => {
        const b = wordAt("12.beam", "beam");
        const cut = wordAt("12.beam", "cut");
        const spin = ease(ramp(t, 0.05, b - 0.1));
        const H = at(1.7 + 0.15 * Math.sin(t * 5), SKY + 0.12 * Math.sin(t * 7), -1);
        const O = at(-1.6 + 1.0 * ease(ramp(t, 0, cut)), SKY + 0.2, -1);
        const hand = front(H, W, 0.7, 1.25);
        const P: Vec3 = [O[0] + 0.85, O[1] + 1.25, O[2]];
        const on = t > b && t < cut + 0.75;
        const split = t > cut;
        return (
          <>
            <Hero position={H} rotationY={lerp(E, W, spin)} animation={t > b - 0.3 ? "point" : "panic"} suit={1} eyes={on ? 2 : 1} />
            <Jets position={H} power={1} t={t} />
            <Blade position={O} yaw={E} swing={chop(t, cut) + (t > cut + 0.3 ? ramp(t, cut + 0.3, cut + 0.5) : 0)} />
            <Jets position={O} power={1} t={t} color={RED} />
            {on ? <Beam from={hand} to={P} width={0.2 + 0.04 * Math.sin(t * 60)} /> : null}
            {on && split ? <Beam from={P} to={[P[0] - 9, P[1] + 3.2, P[2] - 1]} width={0.12} /> : null}
            {on && split ? <Beam from={P} to={[P[0] - 9, P[1] - 3.2, P[2] + 1]} width={0.12} /> : null}
            {on ? <pointLight position={[P[0], P[1], P[2] + 1]} color={CYAN} intensity={40} distance={8} decay={2} /> : null}
            <Slash position={[O[0] + 0.1, O[1] + 1.4, O[2]]} rotationY={E} t={t - cut} r={1.4} />
            <Bits position={P} t={t - cut} color="#eaffff" count={24} power={3.6} />
            <Bits position={P} t={t - b - 0.1} color={CYAN} count={10} power={2} />
          </>
        );
      },
    },
    {
      cue: "12.swat",
      ...cam.push({ on: at(1.0, SKY + 1.0, -1), onTo: at(1.3, 3.2, -0.6), dist: 7.0, to: 8.4, yaw: 0, pitch: -3, fov: 44 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "The old man is across the gap before the teller's hand is down: a red streak, a full turn in the air, and the flat of his arm sends the teller out of the sky. He goes down through the frame turning over and over, his jets going out, and the camera goes down after him.",
      impacts: [{ at: 0.8, amp: 0.1, dur: 0.4 }],
      stage: (t) => {
        const hit = wordAt("12.swat", "bumped");
        const dash = ramp(t, hit - 0.3, hit);
        const O = at(lerp(-0.6, 1.1, dash * dash), SKY + 0.2, -1);
        const fall = ramp(t, hit, 2.47);
        const H = at(1.7 - 0.5 * fall, lerp(SKY, 0.6, fall * fall * 0.6 + fall * 0.4), -1 + 0.6 * fall);
        return (
          <>
            <Hero position={H} rotationY={W + (fall > 0 ? t * 11 : 0)} animation={fall > 0 ? "fall" : "scared"} suit={1} eyes={fall > 0 ? 0.3 + 0.7 * (Math.sin(t * 40) > 0 ? 1 : 0) : 1} />
            <Jets position={H} power={fall > 0 ? (Math.sin(t * 30) > 0.3 ? 0.5 : 0) : 1} t={t} />
            <OldMan position={O} rotationY={E + Math.PI * 2 * ease(ramp(t, hit - 0.12, hit + 0.25))} suit={1} animation="point">
              <Katana out={1} />
            </OldMan>
            <Jets position={O} power={1} t={t} color={RED} />
            {dash > 0 && dash < 1 ? <Beam from={at(-0.6, SKY + 1.2, -1)} to={[O[0], O[1] + 1.2, O[2]]} width={0.16} color={RED} core="#ffd0c0" /> : null}
            <Slash position={[O[0], O[1] + 1.2, O[2]]} rotationY={E} t={t - hit + 0.05} flat r={1.3} color="#ffffff" />
            <Bits position={[1.7, SKY + 1.1, H[2]]} t={t - hit} color="#eaffff" count={26} power={4} />
            {fall > 0 ? <Streaks position={[H[0], H[1] + 2.2, H[2]]} yaw={0} pitch={Math.PI / 2} t={t} n={10} spread={0.8} speed={20} color="#d8e4ff" /> : null}
            <Woods cut2={1} sap={1} big={1} />
          </>
        );
      },
    },
    {
      cue: "12.hole",
      ...cam.top({ on: [CR[0], 0, CR[2] - 0.2], height: 9.5, to: 6.2, fov: 40 }),
      zone: ZONE.forest,
      look: DUSK,
      note: "Straight down. He hits the grass. A ring of dirt goes out, and when it clears there is a hole in the ground the exact shape of him, arms out, and him lying in the bottom of it with his visor up and his eyes going round.",
      impacts: [{ at: 0.12, amp: 0.14, dur: 0.6 }],
      stage: (t) => {
        const hit = 0.12;
        const down = t > hit;
        const hole = wordAt("12.hole", "hole");
        return (
          <>
            <Hero position={[CR[0], down ? 0.04 : 5 * (1 - t / hit), CR[2] - 0.25]} rotationY={0} animation={down ? "lie" : "fall"} suit={1} visor={ease(ramp(t, hole - 0.3, hole))} face="dizzy" eyes={0.4} />
            {down ? <Crater position={CR} /> : null}
            <DustRing position={CR} t={t - hit} size={3.4} color="#7a6a4a" />
            <DustRing position={CR} t={t - hit - 0.12} size={2.2} color="#6a7a5a" />
            <Bits position={[CR[0], 0.3, CR[2]]} t={t - hit} color="#7a6a4a" count={30} power={4.2} />
            <Bits position={[CR[0], 0.3, CR[2]]} t={t - hit} color="#6a8a4a" count={20} power={3.2} />
            {down && t < 1.4 ? <Smoke position={[CR[0], 0.3, CR[2]]} count={8} spread={1.4} /> : null}
            <Woods cut2={1} sap={1} big={1} />
          </>
        );
      },
    },
  ],
});
