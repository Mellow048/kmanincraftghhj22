import { Block, Glow, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AimSword, Bits, Bubble, Bus, Dad, DustRing, Fill, Hiss, MONSTER, Mum, NIGHT, Postman, Puffs, Raider, Streaks, ZONE,
  ease, flat, handOf, hillY, hop, jolt, manFace, monsterFace, pop, ramp, timing, wordAt,
} from "./kit";

const E = Math.PI / 2;
const W = -Math.PI / 2;
const TOP: Vec3 = [-28.5, 3, 2];
const DADP: Vec3 = [-8.0, 0, 2.6];
const TREE: Vec3 = [-12, 6.3, 6.5];

/** THE PLAYERS, and a fight in which the monsters will not hurt anybody. Each line is one gag with a wind-up and a hit. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Players",
  shots: [
    {
      cue: "10.players",
      ...cam.push({ on: [-28.7, 4.35, 2], dist: 5.4, to: 4.2, yaw: 90, pitch: -6, fov: 42 }),
      ease: "outExpo",
      zone: ZONE.night,
      look: NIGHT,
      note: "On the hill top, from below: people. Faces like his, lit by torches. On 'swords' the blades come up.",
      stage: (t) => {
        const up = t > wordAt("10.players", "swords") - 0.1;
        return (
          <>
            <Raider who={0} position={[-28.4, 3, 2]} rotationY={E} animation="idle" arms={up ? "reachUp" : undefined} face="angry" />
            <Raider who={1} position={[-29.3, 3, 1.1]} rotationY={E} animation="idle" arms="reachUp" torch face="angry" />
            <Raider who={2} position={[-29.3, 3, 2.9]} rotationY={E} animation="idle" arms={up ? "reachUp" : undefined} face="angry" />
            <Raider who={4} position={[-30.3, 3, 2.0]} rotationY={E} animation="idle" arms="reachUp" torch face="angry" />
            <Glow position={[-28.2, 4.6, 2]} size={3} color="#ffa040" opacity={0.25} />
          </>
        );
      },
    },
    {
      cue: "10.clear",
      ...cam.push({ on: manFace([-28.4, 3, 2]), dist: 3.0, to: 2.2, yaw: 70, pitch: -10, fov: 38 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "The big one in dark red. He looks down at the village, and levels his sword at it.",
      stage: (t) => {
        const k = ease(ramp(t, 0.3, 0.7));
        return (
          <>
            <Raider who={0} position={[-28.4, 3, 2]} rotationY={E} animation="point" blendTo="reachUp" blend={k} face="angry" headPitch={0.25} />
            <Fill on={manFace([-28.4, 3, 2])} yaw={70} power={7} />
            <Raider who={1} position={[-29.3, 3, 1.1]} rotationY={E} animation="idle" arms="reachUp" torch face="angry" />
          </>
        );
      },
    },
    {
      cue: "10.shout",
      ...cam.push({ on: [-28.6, 4.4, 2], dist: 4.4, to: 5.2, yaw: 84, pitch: -4, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "He shouts it and every sword behind him goes up. The words are in the air over them.",
      impacts: [{ at: 0.1, amp: 0.05, dur: 0.3 }, { at: 1.1, amp: 0.06, dur: 0.4 }],
      stage: (t) => {
        const get = wordAt("10.shout", "get");
        return (
          <>
            <Raider who={0} position={[-28.4, 3, 2]} rotationY={E} animation="point" face="angry" />
            <Raider who={1} position={[-29.3, 3 + hop(t, get, 0.3, 0.3), 1.1]} rotationY={E} animation="cheer" torch face="angry" />
            <Raider who={2} position={[-29.3, 3 + hop(t, get + 0.05, 0.3, 0.3), 2.9]} rotationY={E} animation="idle" arms="reachUp" face="angry" />
            <Raider who={4} position={[-30.3, 3 + hop(t, get + 0.1, 0.3, 0.3), 2.0]} rotationY={E} animation="cheer" torch face="angry" />
            {t < get ? (
              <Bubble text="MONSTERS!" position={[-28.2, 5.5, 2]} rotationY={E} scale={0.5 * pop(t, 0.05)} dark tail={-1} />
            ) : (
              <Bubble text="GET THEM ALL!" position={[-28.2, 5.5, 2]} rotationY={E} scale={0.42 * pop(t, get)} dark tail={-1} />
            )}
          </>
        );
      },
    },
    {
      cue: "11.charge",
      ...cam.push({ on: [-26.6, 3.6, 2], onTo: [-19.6, 1.2, 2], dist: 5.6, to: 5.0, yaw: 86, pitch: 2, fov: 44 }),
      ease: "inCubic",
      shake: 0.03,
      zone: ZONE.night,
      look: NIGHT,
      note: "Down the steps of the hill at a run, straight at the camera, which is going backwards as fast as it can.",
      stage: (t, { p }) => {
        const k = p * p;
        return (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const x = -28.4 - (i % 3) * 0.9 + 7.6 * k;
              return <Raider key={i} who={i} position={[x, hillY(x) + hop(t, 0.2 + i * 0.13, 0.25, 0.25), 0.7 + i * 0.52]} rotationY={E} animation="run" arms={i % 2 ? "reachUp" : "point"} torch={i === 4} animDistance={7.6 * k} face="angry" />;
            })}
            <Streaks position={[-28 + 7.6 * k, 2, 2]} yaw={W} t={t} n={10} spread={2.4} speed={16} />
          </>
        );
      },
    },
    {
      cue: "11.dad",
      ...cam.push({ on: [-8.4, 1.2, 2.7], dist: 5.8, to: 5.0, yaw: 6, pitch: 6, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "A player runs in and swings: on 'lost' dad's arm spins off and lands in the dirt. Dad looks at it. On 'picked' he bends and has it. On 'bonked' it comes down on the man's head and he folds up.",
      impacts: [{ at: 0.55, amp: 0.06, dur: 0.3 }, { at: 2.2, amp: 0.09, dur: 0.4 }],
      stage: (t) => {
        const lost = wordAt("11.dad", "lost");
        const pick = wordAt("11.dad", "picked");
        const bonk = wordAt("11.dad", "bonked") + 0.1;
        const run = ease(ramp(t, 0, lost));
        const R: Vec3 = [-11.2 + 2.2 * run, 0, 2.6];
        const fly = ramp(t, lost, lost + 0.5);
        const lift = ease(ramp(t, pick - 0.1, pick + 0.25));
        const swing = ramp(t, bonk - 0.2, bonk);
        const ground: Vec3 = [-7.3, 0.08, 3.5];
        const hand: Vec3 = [-8.35, 1.25, 2.95];
        const head: Vec3 = [-8.95, 1.95, 2.6];
        const bone: Vec3 =
          t < pick - 0.1
            ? [-8.2 + 0.9 * fly, 1.3 + 1.6 * 4 * fly * (1 - fly) - 1.22 * fly, 2.6 + 0.9 * fly]
            : t < bonk - 0.2
              ? [ground[0] + (hand[0] - ground[0]) * lift, ground[1] + (hand[1] - ground[1]) * lift, ground[2] + (hand[2] - ground[2]) * lift]
              : [hand[0] + (head[0] - hand[0]) * swing, hand[1] + 1.0 * Math.sin(swing * Math.PI) * (1 - swing) + (head[1] - hand[1]) * swing * swing, hand[2] + (head[2] - hand[2]) * swing];
        const spin = t < pick - 0.1 ? fly * 9 + (fly >= 1 ? 1.5 : 0) : t < bonk - 0.2 ? 1.5 * (1 - lift) : -1.3 * swing;
        return (
          <>
            <Dad position={DADP} rotationY={W + 0.5} lean={t > pick - 0.1 && t < pick + 0.25 ? 0.7 * Math.sin(lift * Math.PI) : swing * 0.3} rattle={jolt(t, lost, 3) + (t > lost && t < pick ? 0.4 : 0)} mood={t < lost ? "scared" : t < pick ? "sad" : "angry"} nod={t > lost + 0.3 && t < pick ? 0.4 : 0} turn={t > lost + 0.3 && t < pick ? -0.6 : 0} wave={t > pick + 0.2 ? 1 : 0} />
            <Block position={bone} size={[0.11, 0.66, 0.11]} color={MONSTER.bone} rotation={[0.2, 0, spin]} />
            {t < bonk ? (
              <Raider who={3} position={R} rotationY={E} animation={t < lost ? "run" : "idle"} arms={t < lost - 0.2 ? "reachUp" : t < lost + 0.15 ? "point" : undefined} animDistance={2.2 * run} face={t > pick ? "fear" : "angry"} />
            ) : (
              <Raider who={3} position={R} rotationY={E} animation="collapse" time={(t - bonk) * 2.2} face="dizzy" />
            )}
            <Bits position={[-8.2, 1.3, 2.6]} t={t - lost} color={MONSTER.bone} count={6} power={2} />
            <Bits position={head} t={t - bonk} color="#ffe27a" count={10} power={2.6} />
            <DustRing position={[R[0], 0.05, R[2]]} t={t - bonk - 0.25} size={1.2} />
          </>
        );
      },
    },
    {
      cue: "11.bus",
      ...cam.push({ on: [-7.6, 1.3, 1.9], dist: 6.4, to: 5.6, yaw: -10, pitch: 8, fov: 44 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Three of them look up. The bus is already in the air. On 'sat' it lands on all three and wobbles, and their legs stick out round the edge.",
      impacts: [{ at: 0.6, amp: 0.12, dur: 0.45 }],
      stage: (t) => {
        const land = wordAt("11.bus", "sat") + 0.12;
        const k = ramp(t, 0, land);
        const x = -5.2 - 3.0 * k;
        const y = 2.8 * 4 * k * (1 - k) * (k < 1 ? 1 : 0) + (k < 0.5 ? 0 : 0);
        const wob = t > land ? Math.sin((t - land) * 17) * Math.exp(-(t - land) * 4) * 0.4 : -0.15 * k;
        const spots: Vec3[] = [[-9.0, 0, 1.4], [-7.5, 0, 1.2], [-8.3, 0, 2.7]];
        return (
          <>
            <Bus position={[x, y, 1.8]} rotationY={W} squash={wob} mood="angry" />
            {spots.map((s, i) =>
              t < land ? (
                <Raider key={i} who={i + 1} position={s} rotationY={E + (i - 1) * 0.5} animation="cower" face="fear" headPitch={-0.5} />
              ) : (
                <Raider key={i} who={i + 1} position={flat([s[0] + (i - 1) * 0.5, 0, s[2] + (i === 2 ? 0.7 : -0.5)])} rotationY={[2.6, 3.7, 0.3][i]} animation="lie" face="dizzy" />
              ),
            )}
            <DustRing position={[-8.2, 0.05, 1.8]} t={t - land} size={2.6} />
            <Bits position={[-8.2, 0.3, 1.8]} t={t - land} color="#8fe07a" count={14} power={3.4} />
          </>
        );
      },
    },
    {
      cue: "11.post",
      ...cam.push({ on: [-11.0, 2.3, 5.9], onTo: [-11.8, 5.6, 6.4], dist: 6.4, to: 6.8, yaw: 158, pitch: -4, fov: 44 }),
      ease: "inOutCubic",
      zone: ZONE.night,
      look: NIGHT,
      note: "The postman has one by the collar like a parcel. He looks at the tree, and on 'top' throws him. The camera goes up with him to where he lands, hugging the top branch.",
      impacts: [{ at: 1.75, amp: 0.05, dur: 0.3 }],
      stage: (t) => {
        const toss = wordAt("11.post", "one") + 0.05;
        const k = ramp(t, toss, toss + 0.55);
        const from: Vec3 = [-10.5, 1.9, 4.2];
        const at: Vec3 = [from[0] + (TREE[0] - from[0]) * k, from[1] + (TREE[1] - from[1]) * k + 1.6 * 4 * k * (1 - k), from[2] + (TREE[2] - from[2]) * k];
        return (
          <>
            <Postman position={[-10.4, 0, 5.0]} rotationY={Math.PI - 0.2} carry={k > 0 ? 1 - k : 1} nod={k > 0 ? -0.5 * k : 0.2} turn={-0.4} lean={k > 0 ? -0.2 * Math.sin(k * Math.PI) : 0.1 * Math.sin(t * 6)} />
            <group position={k >= 1 ? [TREE[0] + jolt(t, toss + 0.55, 0.3), TREE[1], TREE[2]] : at} rotation={[0, 0, k < 1 ? k * 6.28 : 0]}>
              <Raider who={5} position={[0, t < toss ? Math.sin(t * 20) * 0.03 : 0, 0]} rotationY={Math.PI} animation={k >= 1 ? "cower" : "panic"} face={k >= 1 ? "fear" : "ouch"} sword={k <= 0} scale={0.9} />
            </group>
            <Bits position={[TREE[0], TREE[1] + 0.2, TREE[2]]} t={t - toss - 0.55} color="#3f7f2d" count={14} power={2.8} />
          </>
        );
      },
    },
    {
      cue: "11.hiss",
      ...cam.push({ on: monsterFace("creeper", [-5.3, 0, 3.6]), dist: 5.0, to: 4.3, yaw: 24, pitch: 4, fov: 40 }),
      shake: 0.012,
      zone: ZONE.night,
      look: NIGHT,
      note: "Hiss with two swords at his chest. He shakes harder and harder and on 'white' goes pale all over: the players leap away. On 'off' he lets it go in one long puff and is green again.",
      stage: (t) => {
        const white = wordAt("11.hiss", "white");
        const off = wordAt("11.hiss", "off");
        const fuse = t < white ? 0.5 * ramp(t, 0.2, white) : t < off ? 0.5 + 0.5 * ramp(t, white, white + 0.25) : 1 - ease(ramp(t, off, off + 0.3));
        const sh = Math.sin(t * 46) * 0.05 * fuse;
        const away = ease(ramp(t, white, white + 0.3));
        return (
          <>
            <Hiss position={[-5.0 + sh, 0, 3.6]} rotationY={-0.2} fuse={fuse} mood={t > off + 0.2 ? "sad" : "scared"} scale={1 + 0.08 * fuse} />
            <Raider who={1} position={[-6.2 - 1.3 * away, hop(t, white, 0.4, 0.3), 3.3]} rotationY={E} animation={away > 0 ? "scared" : "point"} face={away > 0 ? "fear" : "angry"} />
            <Raider who={2} position={[-5.7 - 1.2 * away, hop(t, white + 0.05, 0.4, 0.3), 4.7 + 0.6 * away]} rotationY={2.3} animation={away > 0 ? "scared" : "point"} face={away > 0 ? "fear" : "angry"} />
            {t > off ? <Puffs position={[-5.0, 1.6, 3.7]} color="#ffffff" count={8} rise={1.3} spread={0.3} size={0.14} speed={1.2} opacity={0.7} /> : null}
          </>
        );
      },
    },
    {
      cue: "11.losing",
      ...cam.truck({ on: [-5.2, 1.3, 2.4], dist: 6.6, yaw: 88, pitch: 8, fov: 44, by: [1.6, 0, 0] }),
      zone: ZONE.night,
      look: NIGHT,
      note: "From behind the family: they are walking backwards, towards us, and the swords are coming on. Not one of them has hit back.",
      stage: (t, { p }) => {
        const d = 1.6 * p;
        return (
          <>
            <Mum position={[-3.4 + d, 0, 3.0]} rotationY={W} walk={-d} mood="scared" arms={0.6} />
            <Dad position={[-4.0 + d, 0, 1.7]} rotationY={W} walk={-d} mood="scared" rattle={0.5} />
            <Hiss position={[-2.6 + d, 0, 2.3]} rotationY={W} walk={-d} mood="scared" />
            {[0, 1, 2, 4].map((who, i) => (
              <Raider key={who} who={who} position={[-8.4 + (i % 2) * 0.9 + d * 1.2, 0, 1.0 + i * 0.95]} rotationY={E} animation="walk" arms="point" animDistance={d * 1.2} face="angry" />
            ))}
          </>
        );
      },
    },
  ],
});
