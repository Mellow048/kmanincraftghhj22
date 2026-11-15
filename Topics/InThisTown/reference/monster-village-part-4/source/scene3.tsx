import { Block, cam, getPose, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, BUSH, Bubble, Bush, CLASH, Dad, EAST, Fill, Flat, Folk, HOLE, Hero, Hiss, IronGolem, IronHelmet, Key, LOCK, ME, Mum, NIGHT4, NORTH, OUTDOOR, Postman, Puffs,
  MONSTER, Raider, Ravager, Skeleton, Spider, TopCard, VGuard, WEST, Web, Z, Zombie, dur, ease, f, faceOf, manFace, o, ramp, timing,
} from "./kit";
import type { Kind } from "./kit";
import { DAD_BUSH, GUARD_DOWN } from "./scene1";
import { Battle, G, T2, Yard, bump, clamp, outPose, up, w } from "./shared";
import type { Fight } from "./shared";

/** The golem and the ravager, still at it in the middle of the yard behind everything else. */
const Duel: React.FC<{ t: number }> = ({ t }) => (
  <>
    <IronGolem position={[CLASH[0] - 2 + Math.sin(t * 1.4) * 0.4, 0, CLASH[2] - 4.5]} rotationY={EAST} scale={G} armR={-1.5 - bump(t % 1.6, 0.2, 0.6)} armL={-1.5} walk={t} />
    <Ravager position={[CLASH[0] + 2.6 + Math.sin(t * 1.4) * 0.5, 0, CLASH[2] - 4.5]} rotationY={WEST} walk={t * 2} jaw={0.5 + 0.5 * Math.sin(t * 5)} scale={1.35} />
  </>
);
/** Everybody who came through the hole, in the order he names them: [who, x behind the front, z]. */
const LINE: Array<[Kind | "mum" | "dad" | "hiss", number, number]> = [
  ["mum", 0, -3.4], ["dad", 0.2, -2.2], ["hiss", 0, -1.1], ["zombie", 0.3, 0.1], ["zombie", 0.1, 1.1], ["skeleton", 0.3, 2.3], ["skeleton", 0, 3.3], ["spider", 0.4, 4.9], ["spider", 0.2, 6.9],
  ["zombie", 2.2, -2.8], ["creeper", 2.4, -0.6], ["enderman", 2.6, 1.6], ["skeleton", 2.3, 4.0], ["slime", 2.5, 5.8], ["zombie", 4.4, -1.6], ["spider", 4.8, 1.0], ["creeper", 4.5, 3.2],
];
const Friends: React.FC<{ t: number; x: number; z0?: number; speed?: number }> = ({ t, x, z0 = HOLE[2] + 1.6, speed = 1.6 }) => (
  <>
    {LINE.map(([who, back, z], i) => {
      const p: Vec3 = [x + back, 0, z0 + z * (who === "mum" || who === "dad" || who === "hiss" || back === 0 || i < 9 ? 1 : 1)];
      const walk = t * Math.min(speed, 2.6) + i;
      const lean = speed > 2 ? 0.22 : 0;
      if (who === "mum") return <Mum key={i} position={p} rotationY={WEST} walk={walk} mood="angry" lean={lean} />;
      if (who === "dad") return <Dad key={i} position={p} rotationY={WEST} walk={walk} mood="angry" lean={lean} />;
      if (who === "hiss") return <Hiss key={i} position={p} rotationY={WEST} walk={walk} mood="angry" lean={lean} />;
      return <Folk key={i} kind={who} n={i} position={[p[0], who === "spider" || who === "slime" ? Math.abs(Math.sin(t * 6 + i)) * (speed > 2 ? 0.35 : 0) : 0, p[2]]} rotationY={WEST} walk={walk} mood="angry" lean={lean} />;
    })}
  </>
);
/** A sword somebody has bent: two halves at a right angle. */
const BentSword: React.FC<{ position: Vec3; k: number }> = ({ position, k }) => (
  <group position={position}>
    <Block position={[0, 0, 0]} size={[0.3, 0.07, 0.07]} color="#5c3f24" />
    <Block position={[0, 0.3, 0]} size={[0.08, 0.6, 0.04]} color="#dfe6ee" emissive="#8fa0b4" emissiveIntensity={0.3} />
    <group position={[0, 0.6, 0]} rotation={[0, 0, -1.9 * k]}>
      <Block position={[0, 0.25, 0]} size={[0.08, 0.5, 0.04]} color="#dfe6ee" emissive="#8fa0b4" emissiveIntensity={0.3} />
    </group>
  </group>
);

/** Where the heap of guards is, behind the bush. */
const PILE: Vec3 = [GUARD_DOWN[0] + 1.5, 0, GUARD_DOWN[2] + 2.6];
/** The key, on the belt of the one on top. */
const KEY0: Vec3 = [PILE[0] + 0.55, 0.66, PILE[2] - 1.0];
const DADAT: Vec3 = [PILE[0] - 1.7, 0, PILE[2] - 0.6];
/** Seconds into "4 minutes earlier" at which the film cuts from the heap to the walk. */
const WALK_AT = 3.0;
/**
 * THREE PEOPLE IN A HEAP: two side by side on their backs, the third thrown across them. All three are OUT:
 * eyes shut ("sleepy"), no blink, limbs from `outPose`. `twitch` 0–1 jolts the top one (somebody is at his belt).
 */
const Heap: React.FC<{ t: number; twitch?: number }> = ({ twitch = 0 }) => (
  <>
    {[0, 1].map((i) => (
      <Flat key={i} position={[PILE[0] + (i ? 0.42 : -0.3), 0, PILE[2] + (i ? 0.25 : 0)]} rotationY={i ? 0.3 : -0.15}>
        <Raider who={[2, 1][i]} sword={false} pose={outPose(i)} face="sleepy" blink={false} breath={0} weightShift={0} saccade={false} />
      </Flat>
    ))}
    <Flat position={[PILE[0] - 0.75, 0.3 + 0.05 * twitch, PILE[2] - 1.0]} rotationY={WEST + 0.12}>
      <Raider who={3} sword={false} pose={outPose(2)} face="sleepy" blink={false} breath={0} weightShift={0} saccade={false} />
    </Flat>
  </>
);
/** Where an enderman's two hands are, for `lean` and `carry` as given to it. */
const enderHand = (p: Vec3, ry: number, lean: number, carry: number): Vec3 => {
  const u = 1.8 / 32;
  const a = 0.75 * carry - lean;
  const fwd = 11 * u * Math.sin(lean) + 29 * u * Math.sin(a);
  const y = 30 * u + 11 * u * Math.cos(lean) - 29 * u * Math.cos(a);
  return [p[0] + Math.sin(ry) * fwd, p[1] + y, p[2] + Math.cos(ry) * fwd];
};
/** Where a zombie's hand is: `s` −1 or 1 for the arm, `a` its pitch as given to `armPitch`. */
const zombieHand = (p: Vec3, ry: number, s: number, a: number): Vec3 => {
  const u = 1.8 / 32;
  const lx = s * 6 * u;
  const lz = -11 * u * Math.sin(a);
  return [p[0] + lx * Math.cos(ry) + lz * Math.sin(ry), p[1] + 22 * u - 11 * u * Math.cos(a), p[2] - lx * Math.sin(ry) + lz * Math.cos(ry)];
};
/** A spark where steel meets something harder. */
const Spark: React.FC<{ at: Vec3; k: number }> = ({ at, k }) =>
  k > 0.05 ? (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Block key={i} position={[at[0] + Math.cos(i * 1.1) * 0.45 * k, at[1] + Math.sin(i * 1.1) * 0.45 * k, at[2] + (i % 2 ? 0.12 : -0.12)]} size={[0.08, 0.08, 0.08]} color="#000000" emissive="#ffe070" emissiveIntensity={3} castShadow={false} />
      ))}
      <pointLight position={at} color="#ffd060" intensity={14 * k} distance={4} decay={2} />
    </>
  ) : null;
/** AN ARROW IN FLIGHT you can see: the shaft, and a long white streak behind it. `k` 0–1 along `from` → `to`. */
const Arrow: React.FC<{ from: Vec3; to: Vec3; k: number }> = ({ from, to, k }) => {
  const d: Vec3 = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];
  const len = Math.hypot(d[0], d[1], d[2]);
  const yaw = Math.atan2(d[0], d[2]);
  const pitch = -Math.asin(d[1] / len);
  const trail = Math.min(2.2, len * k);
  return (
    <group position={[from[0] + d[0] * k, from[1] + d[1] * k, from[2] + d[2] * k]} rotation={[0, yaw, 0]}>
      <group rotation={[pitch, 0, 0]}>
        <Block position={[0, 0, -0.35]} size={[0.05, 0.05, 0.7]} color="#e8e4d8" emissive="#e8e4d8" emissiveIntensity={0.8} castShadow={false} />
        <Block position={[0, 0, -0.35 - trail / 2]} size={[0.025, 0.025, trail]} color="#ffffff" emissive="#ffffff" emissiveIntensity={1.6} castShadow={false} />
      </group>
    </group>
  );
};
/** A helmet that an arrow has just taken off a head at `at`: it goes up and back, turning over, with the arrow through it. */
const Popped: React.FC<{ at: Vec3; k: number }> = ({ at, k }) =>
  k < 0 ? (
    <IronHelmet position={at} rotation={[0, WEST, 0]} />
  ) : k < 1.6 ? (
    <group position={[at[0] + k * 2.6, at[1] + k * 3.4 - 4.2 * k * k, at[2] - k * 0.5]} rotation={[k * 3, 0, -k * 11]}>
      <IronHelmet position={[0, 0, 0]} rotation={[0, WEST, 0]} />
      <Block position={[0, 0.02, 0]} size={[0.95, 0.04, 0.04]} color="#e8e4d8" castShadow={false} />
    </group>
  ) : null;
/** 7.zombie: when the blade is caught, when it is bent, when it is given back. */
const ZT = Math.max(0.45, w("7.zombie", "sword", 0.9) - 0.25);
const ZB = Math.max(ZT + 0.6, w("7.zombie", "bent", 1.6));
const ZG = Math.min(dur("7.zombie") - 0.32, ZB + 0.3);
/** 7.skel: the first arrow lands, the cut to the player, the second arrow lands. */
const SA = w("7.skel", "off", 1.1);
const SCUT = SA + 0.42;
const SB = Math.max(SCUT + 0.55, w("7.skel", "under", 2.2) - 0.1);
const SKEL: Vec3 = f(1.6, 0, 7);
const SHOT: Vec3 = f(6.6, 0, 7);
/** 7.spider: the wrapping is done, the spider is on top. */
const WWRAP = 1.05;
const WTOP = 1.3;
/** The fights mum walks between: close on both sides of her path, players AND villagers. */
const MUMFIGHTS: Fight[] = [
  ["zombie", 6.6, 2.9, 10, "duel"], ["skeleton", 3.2, 8.3, 2, "shoot"], ["spider", 3.6, 2.6, 3, "pounce"], ["creeper", 6.4, 8.6, 11, "chase"], ["zombie", 0.2, 3.2, 1, "duel"], ["enderman", -0.6, 8.0, 12, "pounce"],
];

/** THE KEY, THE JOKE, AND THE FIGHT. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Friends",
  shots: [
    {
      cue: "6.pop",
      ...cam.push({ on: f(-4.7, 1.7, 1.3), dist: 5.4, to: 4.6, yaw: 52, pitch: 4 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The boy's cage from the corner. Pop: purple sparks, and an enderman three metres tall in a yellow scarf is standing at the bars, bent over, where nobody was. The boy jumps back.",
      stage: (t) => {
        const p = w("6.pop", "pop", 0.5);
        const k = ease(ramp(t, p, p + 0.12));
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={up(T2, 2.6)} heroFace={t > p ? "wow" : "uneasy"} />
            <Duel t={t} />
            {t > p ? <Postman position={T2} rotationY={NORTH} scale={0.3 + 0.7 * k} nod={0.5} shake={0.3} /> : null}
            {t > p - 0.05 && t < p + 1.2 ? <Puffs position={up(T2, 1.4)} color="#b060ff" count={12} rise={1.6} spread={0.9} size={0.2} /> : null}
            <Fill on={up(ME, 0.9)} yaw={52} power={6} />
            <Fill on={up(T2, 2.6)} yaw={52} power={8} d={2.5} />
          </>
        );
      },
    },
    {
      cue: "6.key",
      ...cam.push({ on: LOCK, dist: 1.9, to: 1.5, yaw: 44, pitch: 12 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The lock on the cage door, very close: a gold key in the end of a long black arm, tapping all round the keyhole and missing it. The key will not hold still.",
      stage: (t) => {
        const sh = Math.sin(t * 31) * 0.035 + Math.sin(t * 17) * 0.025;
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={LOCK} />
            <Postman position={T2} rotationY={NORTH} nod={0.7} shake={1} carry={1} />
            <Key position={[LOCK[0] + 0.1 + sh, LOCK[1] + Math.cos(t * 23) * 0.03, LOCK[2] + 0.22 + 0.04 * Math.sin(t * 9)]} rotation={[0, Math.PI, sh * 4]} scale={0.9} />
            <Block position={[LOCK[0] + 0.1, LOCK[1] + 0.02, LOCK[2] + 0.62]} size={[0.07, 0.07, 0.6]} color="#0c0c10" />
            <pointLight position={[LOCK[0] + 0.8, LOCK[1] + 0.4, LOCK[2] + 1]} color="#fff0d0" intensity={4} distance={4} decay={2} />
          </>
        );
      },
    },
    {
      cue: "6.where",
      ...cam.push({ on: f(-5, 1.05, 0.45), dist: 2.6, to: 2.3, yaw: -16, pitch: 2 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The boy through the bars, close, looking up and to one side at the teacher, one eyebrow up, a bubble: WHERE?",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          <Hero position={f(-5, 0.08, 0.45)} animation="talk" face="uneasy" lookAt={up(T2, 2.6)} />
          <Bubble text="WHERE?" position={f(-5.5, 1.95, 0.9)} rotationY={-0.28} scale={0.42} />
          <Fill on={f(-5, 1.1, 0.45)} yaw={-16} power={7} />
        </>
      ),
    },
    {
      cue: "6.ask",
      ...cam.push({ on: up(T2, 2.55), dist: 3.2, to: 2.9, yaw: 196, pitch: -22 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "From inside the cage, looking up at the enderman's face against the stars. His purple eyes slide away to one side. DO NOT ASK.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          <Postman position={T2} rotationY={NORTH} turn={0.7 * ease(ramp(t, 0.1, 0.5))} nod={0.2} shake={0.4} />
          <Bubble text="DO NOT ASK" position={[T2[0] - 0.2, 3.5, T2[2] - 0.6]} rotationY={Math.PI + 0.25} scale={0.42} tail={1} />
          <Fill on={up(T2, 2.6)} yaw={196} power={8} d={2.2} />
        </>
      ),
    },
    {
      cue: "6.earlier",
      ...cam.push({ on: [PILE[0] + 0.5, 0.95, PILE[2] - 0.7], dist: 6.0, to: 4.6, yaw: 24, pitch: 13 }),
      zone: Z.out,
      look: NIGHT4,
      note: "THE JOKE, part one. No voice, a silly march. White words at the top: 4 MINUTES EARLIER. Behind the bush, three guards in a heap, one on top of the other two, eyes shut, arms and legs any old how. Dad dusts his hands. The enderman folds himself in half over the heap, picks a gold key off the top one's belt with two fingers, and stands up with it.",
      stage: (t) => {
        const down = ease(ramp(t, 0.5, 1.3)) - ease(ramp(t, 2.2, 3.0));
        const got = t > 1.75;
        const ep: Vec3 = [KEY0[0] + 0.62, 0, KEY0[2]];
        const h = enderHand(ep, WEST, 0.78 * down - 0.25 * (1 - down) * (got ? 1 : 0), 1);
        return (
          <>
            <Bush position={BUSH} />
            <Heap t={t} twitch={bump(t, 1.75, 0.35)} />
            <Dad position={DADAT} rotationY={0.9} lookAt={up(KEY0, 0.3)} mood="happy" nod={0.15 * Math.sin(t * 6)} raise={0.5 + 0.3 * Math.sin(t * 14)} jaw={0.1} />
            <Postman position={ep} rotationY={WEST} lean={0.78 * down - 0.25 * (1 - down) * (got ? 1 : 0)} carry={1} nod={0.5 * down} shake={got ? 0 : 0.25 * down} mood={got ? "happy" : "calm"} />
            <Key position={got ? [h[0], h[1] + 0.05, h[2]] : KEY0} rotation={got ? [0, 0, 1.2 + t * 2] : [1.5, 0.4, 0]} scale={2.2} />
            {t > 1.75 && t < 2.3 ? <Puffs position={KEY0} color="#ffe070" count={6} rise={0.6} spread={0.5} size={0.12} /> : null}
            <TopCard text="4 MINUTES EARLIER" position={[PILE[0] + 0.5, 3.75, PILE[2] - 0.7]} yaw={(24 * Math.PI) / 180} height={0.36} width={3.0} />
            <pointLight position={[PILE[0] + 1, 3, PILE[2] + 3]} color="#e6ecff" intensity={40} distance={12} decay={2} />
          </>
        );
      },
    },
    {
      cue: "6.earlier",
      cut: WALK_AT,
      ...cam.push({ on: o(1.7, 1.6, 2.8), dist: 11, to: 10.4, yaw: 22, pitch: 11 }),
      zone: Z.out,
      look: NIGHT4,
      note: "THE JOKE, part two. Wide: the heap of guards behind the bush, dad standing over it with his chest out, and the enderman marching away from them to the castle door in step with the music, knees high, the gold key held out in front of him in both hands.",
      stage: (t) => {
        const k = ramp(t, 0, dur("6.earlier") - WALK_AT - 0.2);
        const a: Vec3 = [KEY0[0] + 0.62, 0, KEY0[2]];
        const b: Vec3 = [OUTDOOR[0], 0, OUTDOOR[2] + 0.9];
        const yaw = Math.atan2(b[0] - a[0], b[2] - a[2]);
        const tp: Vec3 = [a[0] + (b[0] - a[0]) * k, Math.abs(Math.sin(t * 6.3)) * 0.12, a[2] + (b[2] - a[2]) * k];
        const h = enderHand(tp, yaw, -0.25, 1);
        return (
          <>
            <Bush position={BUSH} />
            <Heap t={t} />
            <Dad position={DADAT} rotationY={0.9} lookAt={up(tp, 2.5)} mood="happy" nod={0.12 * Math.sin(t * 6.3)} />
            <Postman position={tp} rotationY={yaw} walk={k * 4.2} carry={1} lean={-0.25} mood="happy" />
            <Key position={[h[0], h[1] + 0.05, h[2]]} rotation={[0, yaw, 1.2]} scale={2.2} />
            <TopCard text="4 MINUTES EARLIER" position={o(1.7, 4.55, 2.8)} yaw={(22 * Math.PI) / 180} height={0.4} width={3.3} />
            <pointLight position={o(2, 3, 6)} color="#e6ecff" intensity={40} distance={12} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.hole",
      ...cam.push({ on: [HOLE[0] - 3, 1.7, HOLE[2]], dist: 10, to: 6.2, yaw: -88, pitch: 5 }),
      zone: Z.fort,
      look: NIGHT4,
      shake: 0.012,
      impacts: [{ at: 0.4, amp: 0.05, dur: 0.3 }, { at: 1.2, amp: 0.05, dur: 0.3 }, { at: 2.0, amp: 0.06, dur: 0.3 }],
      note: "The hole in the wall again, and the smoke. Out of it AT A RUN, in a line as wide as the hole: mum with her bow, dad with his jaw open, Hiss, and a whole village of monsters behind them, leaning into it, dust coming up off their feet. Guards in front of them turn and leg it.",
      stage: (t) => {
        const x = HOLE[0] + 3.2 - t * 3.3;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Friends t={t} x={x} z0={HOLE[2] + 1.1} speed={3.3} />
            {[0, 1, 2].map((i) => (
              <Raider key={i} who={i + 2} sword={i !== 1} position={[HOLE[0] - 4.2 - i * 1.3 - t * (3.6 + i * 0.4), 0, HOLE[2] - 2 + i * 2]} rotationY={WEST} animation="run" animDistance={t * 3.8} face="scared" headYaw={i ? 0.5 : -0.5} />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <Puffs key={i} position={[x - 0.2 + (i % 2), 0.1, HOLE[2] - 2.2 + i * 1.6]} color="#8a7a66" count={4} rise={0.7} spread={0.9} size={0.28} />
            ))}
            <pointLight position={[HOLE[0] - 5, 3, HOLE[2]]} color="#e6ecff" intensity={80} distance={16} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.all",
      ...cam.push({ on: f(-5.9, 1.35, 6.5), onTo: f(4.4, 1.0, 6.5), dist: 3.6, to: 3.6, yaw: 0, pitch: 2 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "Close, sliding down the front row as he names them: mum's face, dad's skull, Hiss, two zombies, two skeletons with bows, two spiders. Every one of them is frowning.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          <group position={f(-2.5, 0, 6.5)} rotation={[0, Math.PI / 2, 0]}>
            <Friends t={t} x={0} z0={0} />
          </group>
          <pointLight position={f(-5 + t * 2.4, 2, 9.5)} color="#e6ecff" intensity={30} distance={10} decay={2} />
        </>
      ),
    },
    {
      cue: "7.armour",
      ...cam.push({ on: f(-3.2, 1.5, -5.4), dist: 6.6, to: 5.6, yaw: 58, pitch: 6 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "The other side: players and villagers in a row. Iron helmets drop onto their heads one after another down the line, clank, clank, clank. The last man gets three, one on top of the other.",
      stage: (t) => (
        <>
          <Yard t={t} smoke hero="none" />
          {[0, 1, 2, 3, 4].map((i) => {
            const p = f(-3, 0, -8 + i * 1.25);
            const d = clamp((t - 0.5 - i * 0.42) / 0.18);
            const villager = i === 1 || i === 3;
            const head = villager ? 1.95 : 1.74;
            return (
              <group key={i}>
                {villager ? <VGuard position={p} rotationY={EAST} n={i} /> : <Raider who={i + 1} position={p} rotationY={EAST} animation="guard" face="worried" />}
                {t > 0.5 + i * 0.42 - 0.05 ? <IronHelmet position={[p[0], head + 1.5 * (1 - d), p[2]]} rotation={[0, EAST, 0]} scale={villager ? 1.1 : 1} /> : null}
                {i === 4
                  ? [1, 2].map((n) => {
                      const dd = clamp((t - 2.2 - n * 0.3) / 0.18);
                      return t > 2.2 + n * 0.3 - 0.05 ? <IronHelmet key={n} position={[p[0], head + n * 0.3 + 1.5 * (1 - dd), p[2]]} rotation={[0, EAST, 0]} /> : null;
                    })
                  : null}
              </group>
            );
          })}
          <pointLight position={f(0, 2.5, -4)} color="#e6ecff" intensity={45} distance={12} decay={2} />
        </>
      ),
    },
    {
      cue: "7.help",
      ...cam.top({ on: f(3, 0, -5), height: 21, to: 19 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: 0.42, amp: 0.14, dur: 0.35 }],
      note: "Straight down, one look: the short row in helmets on the left, the wide dark crowd of monsters coming in from the right at a run. They hit. The row goes over backwards like skittles, and seven helmets go up in the air.",
      stage: (t) => {
        const hit = 0.42;
        const a = Math.max(0, t - hit);
        return (
          <>
            <Yard t={t} smoke hero="stand" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <group key={i}>
                <Raider who={i} position={f(-3 - a * (5 + (i % 3)), 0, -9 + i * 1.25 + a * (i - 3) * 0.6)} rotationY={EAST + a * (i % 2 ? 3 : -3)} animation={a > 0 ? "stagger" : "guard"} face={a > 0 ? "scared" : "worried"} />
                <IronHelmet position={f(-3 - a * (2 + i), 1.74 + a * 9 - 14 * a * a, -9 + i * 1.25)} rotation={[a * 11, EAST, a * 8]} />
              </group>
            ))}
            <Friends t={t} x={f(-0.2, 0, 0)[0] - t * 5.2} z0={f(0, 0, -7)[2]} speed={5.2} />
            <pointLight position={f(0, 8, -5)} color="#e6ecff" intensity={160} distance={24} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.zombie",
      ...cam.push({ on: f(-0.4, 1.4, 6), dist: 4.3, to: 3.7, yaw: 6, pitch: 3 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: ZT, amp: 0.1, dur: 0.25 }, { at: ZB, amp: 0.06, dur: 0.2 }, { at: ZG, amp: 0.12, dur: 0.3 }],
      note: "A player brings his sword down on a zombie with both hands. The zombie's hand comes up and CATCHES the blade: sparks. It pulls the sword out of his grip, holds it up, puts its other hand on the tip and folds the blade over double, shaking with the effort. Then it punches the bent sword back into his chest and he goes backwards with it.",
      stage: (t) => {
        const chop = ease(ramp(t, ZT - 0.22, ZT));
        const yank = ease(ramp(t, ZT + 0.05, ZT + 0.35));
        const bent = ease(ramp(t, ZB - 0.3, ZB + 0.05));
        const give = ease(ramp(t, ZG - 0.12, ZG + 0.06));
        const back = ease(ramp(t, ZG, ZG + 0.3));
        const strain = bump(t, ZB - 0.35, 0.45);
        const zry = WEST + 0.25 * yank * (1 - give);
        const zp: Vec3 = f(0.25 - 0.35 * give, 0, 6);
        const rp: Vec3 = f(-1.25 + 0.35 * chop + 0.15 * yank - 0.75 * back, 0, 6);
        // +X hand (toward the camera) holds the hilt; the −X hand catches, then goes to the tip and pushes it down.
        const hold = -1.5 + 0.25 * yank * (1 - give) - 0.2 * give;
        const other = t < ZT + 0.05 ? -0.2 - 1.3 * ease(ramp(t, ZT - 0.1, ZT)) : -1.5 - 0.95 * yank * (1 - bent) + 0.2 * bent * (1 - give);
        const hand = zombieHand(zp, zry, 1, hold);
        const taken = t >= ZT;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Battle t={t} />
            <Zombie
              position={[zp[0] + Math.sin(t * 60) * 0.012 * strain, 0, zp[2]]} rotationY={zry} scarf="#e0b83a" phase={5.4}
              armPitch={taken ? [other, hold] : [other, other]} lean={0.1 * strain + 0.3 * give * (1 - back)} mood={back > 0.3 ? "happy" : "angry"} lookAt={manFace(rp)}
            />
            <Raider
              who={4} sword={!taken} position={rp} rotationY={EAST}
              pose={{ ...getPose(back > 0 ? "stagger" : yank > 0 ? "scared" : "guard", t), ...(taken ? (back > 0 ? { armR: [-1.2, 0, -0.5] as Vec3, armL: [-1.2, 0, 0.5] as Vec3 } : {}) : { armR: [-2.9 + 1.6 * chop, 0, -0.25] as Vec3, armL: [-2.9 + 1.6 * chop, 0, 0.25] as Vec3, bodyPitch: -0.15 + 0.4 * chop }) }}
              face={!taken ? "angry" : back > 0 ? "wow" : "surprised"} lookAt={back > 0 ? [rp[0] + 0.4, 1.0, rp[2]] : [zp[0], 1.7, zp[2]]}
            />
            <IronHelmet position={[rp[0], 1.74, rp[2]]} rotation={[0, EAST, 0]} />
            {taken ? (
              <group position={back > 0 ? [rp[0] + 0.42, 1.0, rp[2] + 0.05] : [hand[0] - 0.02, hand[1] - 0.12, hand[2]]} rotation={[0, Math.PI, back > 0 ? 0.3 : 0.25 * yank * (1 - give) + 1.3 * give]}>
                <BentSword position={[0, 0, 0]} k={bent} />
              </group>
            ) : null}
            <Spark at={[zp[0] - 0.62, 1.55, zp[2] + 0.1]} k={bump(t, ZT - 0.03, 0.22)} />
            <Spark at={[hand[0] - 0.1, hand[1] + 0.5, hand[2]]} k={bump(t, ZB - 0.2, 0.3)} />
            <Fill on={manFace(rp)} yaw={6} power={7} d={2.6} />
            <Fill on={up(zp, 1.6)} yaw={6} power={6} d={2.6} />
          </>
        );
      },
    },
    {
      cue: "7.skel",
      ...cam.push({ on: f(3.4, 1.55, 7), dist: 6.4, to: 6.0, yaw: -74, pitch: 5, fov: 48 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: SA, amp: 0.1, dur: 0.25 }],
      note: "Over a skeleton's shoulder: it leans back, pulls the string to its jaw with an arrow on it, and lets go. A white streak down the yard, a spark, and the top helmet of a player wearing two leaves his head with the arrow through it, spinning.",
      stage: (t) => {
        const c = t < SA - 0.1 ? ease(ramp(t, 0.05, SA - 0.2)) : t > SA + 0.12 ? ease(ramp(t, SA + 0.15, SA + 0.4)) : 0;
        const k = (t - (SA - 0.1)) / 0.1;
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Battle t={t} />
            <Skeleton position={SKEL} rotationY={EAST} scarf="#3f6fc2" phase={2.1} bow draw={c} lean={-0.12 * c + 0.1 * bump(t, SA - 0.1, 0.25)} mood="angry" lookAt={manFace(SHOT)} jaw={0.3 * bump(t, SA - 0.1, 0.5)} />
            {k > 0 && k < 1 ? <Arrow from={[SKEL[0] + 0.7, 1.5, SKEL[2] + 0.28]} to={[SHOT[0], 2.06, SHOT[2]]} k={k} /> : null}
            <Raider who={2} position={SHOT} rotationY={WEST} animation={t > SA ? "scared" : "guard"} face={t > SA ? "surprised" : "worried"} headPitch={-0.35 * bump(t, SA, 0.4)} />
            <IronHelmet position={[SHOT[0], 1.74, SHOT[2]]} rotation={[0, WEST, 0]} />
            <Popped at={[SHOT[0], 2.04, SHOT[2]]} k={t - SA} />
            <Spark at={[SHOT[0] - 0.3, 2.06, SHOT[2]]} k={bump(t, SA - 0.02, 0.22)} />
            <Fill on={manFace(SHOT)} yaw={-74} power={9} d={2.6} />
            <Fill on={up(SKEL, 1.6)} yaw={-74} power={5} d={2.2} />
          </>
        );
      },
    },
    {
      cue: "7.skel",
      cut: SCUT,
      ...cam.push({ on: [SHOT[0], 1.62, SHOT[2]], dist: 3.6, to: 3.0, yaw: -52, pitch: 2 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: SB - SCUT, amp: 0.12, dur: 0.25 }],
      note: "The player, close, one helmet left, looking up at where the other one was. A second streak comes in past the lens: spark, and the last helmet is gone too, turning over and over in the air behind him. His hair stands up. His sword falls out of his hand. He feels the top of his head.",
      stage: (t) => {
        const b = SB - SCUT;
        const k = (t - (b - 0.1)) / 0.1;
        const drop = Math.max(0, t - b - 0.15);
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Battle t={t} />
            {k > 0 && k < 1 ? <Arrow from={[SHOT[0] - 3.4, 1.6, SHOT[2] + 0.5]} to={[SHOT[0], 1.78, SHOT[2]]} k={k} /> : null}
            <Raider who={2} sword={drop <= 0} position={SHOT} rotationY={WEST} animation={t > b + 0.2 ? "reachUp" : "scared"} face={t > b ? "wow" : "uneasy"} headPitch={t < b ? -0.3 : -0.3 * bump(t, b, 0.4)} gaze={0} />
            {drop > 0 ? <AimSword position={[SHOT[0] - 0.35, Math.max(0.06, 0.8 - 5 * drop * drop), SHOT[2] + 0.4]} yaw={1 + drop * 6} pitch={Math.max(0, 1.2 - drop * 5)} /> : null}
            <Popped at={[SHOT[0], 1.74, SHOT[2]]} k={t - b} />
            <Spark at={[SHOT[0] - 0.3, 1.78, SHOT[2]]} k={bump(t, b - 0.02, 0.22)} />
            <Fill on={manFace(SHOT)} yaw={-52} power={8} d={2.2} />
          </>
        );
      },
    },
    {
      cue: "7.spider",
      ...cam.orbit({ on: f(-6, 1.0, 4.6), dist: 6.6, yaw: -40, yawTo: 50, pitch: 34 }),
      zone: Z.fort,
      look: NIGHT4,
      impacts: [{ at: WTOP + 0.28, amp: 0.14, dur: 0.35 }],
      note: "From above, swinging round the other way: three players back to back, swords out. A spider goes round them flat out, closer every lap, with a white rope from its tail to the three of them, and they turn inside it like a spool. Swords drop. It jumps on top of the white parcel, the parcel goes over like a tree, and the spider rides it down.",
      stage: (t) => {
        const mid = f(-6, 0, 4.6);
        const wrap = clamp(t / WWRAP);
        const a = 15.5 * wrap * (1 - 0.3 * wrap);
        const rad = 2.3 - 1.25 * wrap;
        const jump = ease(ramp(t, WWRAP, WTOP));
        const fall = ease(ramp(t, WTOP + 0.05, WTOP + 0.3));
        const sp: Vec3 = [Math.sin(a) * rad * (1 - jump), 0.15 * (1 - jump) + 1.95 * jump + Math.sin(Math.PI * jump) * 0.7, Math.cos(a) * rad * (1 - jump)];
        const len = Math.hypot(sp[0], sp[2]);
        return (
          <>
            <Yard t={t} smoke hero="none" door={0} />
            <Battle t={t} n={4} />
            <group position={mid} rotation={[0, 0, 1.45 * fall]}>
              <group rotation={[0, -a * 0.35, 0]}>
                {[0, 1, 2].map((i) => (
                  <Raider key={i} who={i + 1} sword={wrap < 0.45 + i * 0.12} position={[Math.sin(i * 2.09) * 0.36, 0, Math.cos(i * 2.09) * 0.36]} rotationY={i * 2.09} animation={wrap < 0.5 ? "panic" : "scared"} face={fall > 0.5 ? "dizzy" : "scared"} headYaw={Math.sin(t * 9 + i) * 0.5} />
                ))}
                <Web position={[0, 0, 0]} k={wrap} />
              </group>
              {jump > 0 ? <Spider position={[0, sp[1], 0]} rotationY={a + Math.PI / 2 + jump * 2} rear={jump * (1 - fall * 0.5)} walk={t * 3} scarf="#e8e4d8" phase={3.7} mood="happy" /> : null}
            </group>
            {jump <= 0 ? (
              <>
                <Spider position={[mid[0] + sp[0], 0, mid[2] + sp[2]]} rotationY={a + Math.PI / 2} walk={a * rad * 0.6} lean={0.15} scarf="#e8e4d8" phase={3.7} mood="angry" />
                <group position={[mid[0] + sp[0] / 2, 0.75 + 0.5 * wrap, mid[2] + sp[2] / 2]} rotation={[0, a + Math.PI / 2, 0]}>
                  <Block size={[len, 0.04, 0.04]} color="#f4f4f0" emissive="#f4f4f0" emissiveIntensity={0.5} castShadow={false} />
                </group>
              </>
            ) : null}
            {[0, 1, 2].map((i) =>
              wrap >= 0.45 + i * 0.12 ? <AimSword key={i} position={[mid[0] + Math.sin(i * 2.09 + 1) * 1.2, 0.06, mid[2] + Math.cos(i * 2.09 + 1) * 1.2]} yaw={i * 2} pitch={0} /> : null,
            )}
            {fall > 0.9 ? <Puffs position={[mid[0] - 1.4, 0.1, mid[2]]} color="#8a7a66" count={8} rise={0.8} spread={1.4} size={0.3} /> : null}
            <pointLight position={up(mid, 5)} color="#e6ecff" intensity={70} distance={12} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.mum",
      from: f(8.8, 1.62, 5.6),
      to: f(3.4, 1.62, 5.6),
      target: f(5.0, 1.3, 3.4),
      targetPath: [f(5.0, 1.3, 3.4), f(1.5, 1.3, 8.2), f(-1.2, 1.35, 3.6), f(-5, 1.4, 0.6)],
      ease: "linear",
      fov: 62,
      shake: 0.008,
      zone: Z.fort,
      look: NIGHT4,
      note: "THROUGH MUM'S EYES. We are her: two green arms stick out in front of us and we walk straight through the middle of the fight. We look right: a zombie pushing a villager back. We look left: a skeleton shooting, a player running. Players in our way see us, back off and scatter. Then we look at the cages, and there, small, behind the bars, is the boy.",
      stage: (t) => {
        const x = 8.8 - (5.4 * t) / dur("7.mum");
        const bob = Math.abs(Math.sin(t * 5.2)) * 0.02;
        return (
          <>
            <Yard t={t} smoke hero="stand" heroLook={f(x, 1.6, 5.6)} heroFace="wow" teacher />
            <Duel t={t} />
            <Battle t={t} />
            <Battle t={t + 3} fights={MUMFIGHTS} />
            {[-1, 1].map((s) => (
              <group key={s} position={f(x, 1.24 + bob * s, 5.6 + s * 0.3)} rotation={[0, 0, 0.06 * Math.sin(t * 5.2 + s)]}>
                <Block position={[-0.38, 0, 0]} size={[0.3, 0.2, 0.2]} color={MONSTER.zombieShirt} castShadow={false} />
                <Block position={[-0.72, 0, 0]} size={[0.4, 0.19, 0.19]} color={MONSTER.zombieSkin} castShadow={false} />
              </group>
            ))}
            {[0, 1, 2].map((i) => {
              const px = [6.3, 4.6, 2.8][i];
              const side = i % 2 ? 1 : -1;
              const near = ease(ramp(x - px, 2.6, 1.0));
              const flee = Math.max(0, 2.6 - (x - px)) * 0.5;
              const p = f(px - 0.3 * near, 0, 5.6 + side * (0.15 + 1.6 * near + flee * 0.5));
              return <Raider key={i} who={i + 4} sword={near < 0.3} position={p} rotationY={near > 0.1 ? EAST + side * -1.1 * near : EAST} animation={near > 0.05 && near < 0.98 ? "panic" : near >= 0.98 ? "run" : "guard"} animDistance={flee * 2} face={x - px < 3.4 ? "scared" : "worried"} lookAt={near < 0.98 ? f(x, 1.6, 5.6) : undefined} />;
            })}
            <pointLight position={f(x - 2.5, 3, 5.6)} color="#e6ecff" intensity={50} distance={11} decay={2} />
            <pointLight position={f(-5, 2.6, 2.4)} color="#e6ecff" intensity={30} distance={7} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.hiss",
      ...cam.push({ on: f(1.2, 1.0, 6.4), dist: 11, to: 10, yaw: 6, pitch: 24 }),
      zone: Z.fort,
      look: NIGHT4,
      note: "From above and to one side: a small green creeper walks, not fast, at four big players with swords. They look at him, look at each other, drop the swords and run off the left of the picture with their arms in the air.",
      stage: (t) => {
        const go = w("7.hiss", "ran", 1.8) - 0.5;
        const run = Math.max(0, t - go);
        return (
          <>
            <Yard t={t} smoke hero="none" />
            <Hiss position={f(4.4 - t * 1.1, 0, 6.4)} rotationY={WEST} walk={t * 1.6} mood="happy" />
            {[0, 1, 2, 3].map((i) => (
              <group key={i}>
                <Raider who={i} sword={run <= 0} position={f(0.4 - (i % 2) * 0.9 - run * (5 + i * 0.6), 0, 5.2 + i * 0.8)} rotationY={run > 0 ? WEST : EAST} animation={run > 0 ? "panic" : "guard"} face={run > 0 ? "scared" : "worried"} />
                {run > 0 ? <AimSword position={f(0.8 - (i % 2) * 0.9, 0.06, 5.2 + i * 0.8)} yaw={i} pitch={0} /> : null}
              </group>
            ))}
            <pointLight position={f(1, 5, 8)} color="#e6ecff" intensity={80} distance={14} decay={2} />
          </>
        );
      },
    },
  ],
});
void faceOf;
