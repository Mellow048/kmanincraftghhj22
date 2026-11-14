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
