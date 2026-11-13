import { Block, Glow, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bits, Bread, Bubble, DAY, Hero, Lantern, ME_SIT, MO_SIT, Mo, NIGHT, PLACE, Puffs, Rod, Stew, ZONE, ease, faceOf, hop, jolt, manFace, pop, ramp, timing, tossed, wordAt } from "./kit";

const MID: Vec3 = [3.25, 0.95, 6.5];
const moFace: Vec3 = [MO_SIT[0], 1.38, MO_SIT[2]];
const meFace: Vec3 = [ME_SIT[0], 1.14, ME_SIT[2]];

/** THE WALL. Bread, and then everything they have in common: each one is a clue, and he reads none of them. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The wall",
  shots: [
    {
      cue: "5.wall",
      ...cam.push({ on: [2.1, 0.85, 6.4], dist: 4.2, to: 3.5, yaw: -8, pitch: 8, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "He sits on the low wall in full sun with his bowl. He looks left, looks right, and on 'hiding' flings the stew into the bush, which shakes and steams.",
      stage: (t) => {
        const hide = wordAt("5.wall", "hiding");
        const k = ramp(t, hide, hide + 0.35);
        const blob: Vec3 = [2.35 - 1.0 * k, 0.95 + 0.5 * 4 * k * (1 - k) - 0.3 * k, 6.7 - 0.3 * k];
        const shake = 1 + jolt(t, hide + 0.35, 0.5);
        return (
          <>
            <Hero position={ME_SIT} animation="sit" arms={t < hide ? "hold" : "reach"} face={t < hide ? "uneasy" : "grin"} headYaw={t < hide ? Math.sin(t * 4.2) * 0.8 : 0.5}>
              <Stew position={[-0.12, 0.02, 0.1]} />
            </Hero>
            {k > 0 && k < 1 ? <Block position={blob} size={[0.14, 0.1, 0.14]} color="#7d8478" /> : null}
            <group position={[PLACE.bush[0], 0, PLACE.bush[2]]} scale={[shake, 1 / shake, shake]}>
              <Block position={[0.1, 1.3, 0.2]} size={[0.5, 0.4, 0.5]} color="#3f7f2d" />
            </group>
            {t > hide + 0.35 ? <Puffs position={[1.2, 1.1, 6.5]} color="#9bc46a" count={7} rise={1.1} spread={0.3} size={0.12} speed={1} opacity={0.8} /> : null}
          </>
        );
      },
    },
    {
      cue: "5.sat",
      ...cam.push({ on: MID, dist: 5.2, to: 4.5, yaw: 6, pitch: 7, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "Mo walks in from the right, turns, and drops onto the wall beside him. The boy freezes and leans away. They are both in full sunlight.",
      impacts: [{ at: 1.1, amp: 0.03, dur: 0.25 }],
      stage: (t) => {
        const walk = ease(ramp(t, 0, 0.75));
        const sit = ease(ramp(t, 0.75, 1.1));
        const x = 6.4 - 2.5 * walk;
        const z = 7.15 - (7.15 - MO_SIT[2]) * sit;
        return (
          <>
            <Hero position={ME_SIT} rotationY={0.15 * sit} animation="sit" face={sit > 0 ? "fear" : "uneasy"} headYaw={0.9} />
            <Mo position={[x, MO_SIT[1] * sit, z]} rotationY={-Math.PI / 2 * (1 - sit)} animation="sit" blendTo="walk" blend={sit} animDistance={2.5 * walk} face="neutral" gaze={0} />
            <Glow position={[3.9, 2.4, 6.4]} size={2.4} color="#ffe9a0" opacity={0.22 * sit} />
          </>
        );
      },
    },
    {
      cue: "5.burn",
      ...cam.push({ on: moFace, dist: 2.7, to: 2.2, yaw: -14, pitch: 2, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "The boy points at him: no smoke. Mo taps the brim of his hat on 'hat', and says the first words anybody has heard from him.",
      stage: (t) => {
        const hat = wordAt("5.burn", "hat");
        return (
          <>
            <Hero position={ME_SIT} rotationY={0.3} animation="sit" arms="point" face="wow" headYaw={0.7} />
            <Mo position={MO_SIT} animation="sit" arms={t > hat - 0.2 ? "reachUp" : undefined} face="neutral" headYaw={-0.5} headRoll={jolt(t, hat, 0.25)} gaze={0} />
            <Bubble text="It is the hat." position={[4.5, 2.25, 6.5]} rotationY={-0.24} scale={0.75 * pop(t, hat - 0.25)} tail={-1} />
          </>
        );
      },
    },
    {
      cue: "5.bread",
      ...cam.push({ on: [MO_SIT[0], 0.98, 6.95], dist: 2.2, to: 1.7, yaw: -10, pitch: 18, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "His hands. On 'bread' a loaf comes up out of his shirt; on 'broke' he snaps it in two and crumbs fly.",
      impacts: [{ at: 1.9, amp: 0.03, dur: 0.2 }],
      stage: (t) => {
        const loaf = wordAt("5.bread", "loaf");
        const brk = wordAt("5.bread", "broke");
        const up = pop(t, loaf - 0.15);
        const apart = ease(ramp(t, brk, brk + 0.2)) * 0.13;
        const at: Vec3 = [MO_SIT[0], 0.72 + 0.26 * Math.min(1, up) + jolt(t, brk, 0.08), MO_SIT[2] + 0.5];
        return (
          <>
            <Mo position={MO_SIT} animation="sit" arms="hold" face="neutral" headPitch={0.3} gaze={0} />
            <Hero position={ME_SIT} rotationY={0.3} animation="sit" face="wow" headYaw={0.8} headPitch={0.3} />
            {apart > 0 ? (
              <>
                <Bread position={[at[0] - 0.02 - apart, at[1], at[2]]} rotation={[0, 0, 0.5 * apart * 4]} half={-1} />
                <Bread position={[at[0] + 0.02 + apart, at[1], at[2]]} rotation={[0, 0, -0.5 * apart * 4]} half={1} />
              </>
            ) : (
              <Bread position={at} scale={Math.min(1.1, up)} />
            )}
            <Bits position={at} t={t - brk} color="#f3e2b8" count={9} power={1.6} />
          </>
        );
      },
    },
    {
      cue: "5.eat",
      ...cam.push({ on: [MID[0], 1.1, MID[2]], dist: 3.7, to: 3.1, yaw: 4, pitch: 5, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "He holds half out. The boy stares at it, then on 'ask' snatches it and stuffs it in, crumbs everywhere. Mo's half goes up under his scarf.",
      stage: (t) => {
        const ask = wordAt("5.eat", "ask");
        const grab = ease(ramp(t, ask - 0.1, ask + 0.15));
        const chew = t > ask + 0.15 ? Math.abs(Math.sin((t - ask) * 11)) * 0.04 : 0;
        const mine: Vec3 = [3.25 - 0.6 * grab, 1.0 + 0.1 * grab - chew, 6.75 - 0.03 * grab];
        return (
          <>
            <Hero position={ME_SIT} rotationY={0.25 * (1 - grab)} animation="sit" arms={grab > 0.5 ? "reachUp" : "reach"} face={grab > 0.5 ? "laugh" : "wow"} headYaw={0.7 * (1 - grab)} headPitch={chew * 3} />
            <Mo position={MO_SIT} rotationY={-0.25} animation="sit" arms={grab < 0.5 ? "reach" : "reachUp"} face="neutral" headYaw={-0.5} headPitch={chew * 2} gaze={0} />
            <Bread position={mine} half={-1} scale={grab > 0.9 ? 1 - 0.6 * ramp(t, ask + 0.3, ask + 1.6) : 1} />
            <Bits position={[ME_SIT[0], 1.08, 6.75]} t={(t - ask - 0.3) % 0.5} color="#f3e2b8" count={5} power={1.2} />
          </>
        );
      },
    },
    {
      cue: "6.every",
      ...cam.truck({ on: MID, dist: 4.6, yaw: 0, pitch: 7, fov: 42, by: [0.9, 0, 0] }),
      zone: ZONE.day,
      look: DAY,
      note: "Three days in two seconds: on each beat the two of them snap into a new pose on the same wall. Talking, pointing at something, both leaning back.",
      stage: (t, { p }) => {
        const day = Math.min(2, Math.floor(p * 3));
        const since = t - (day * 2.1) / 3;
        const y = hop(since, 0, 0.12, 0.2);
        const mine = (["talk", "point", "laugh"] as const)[day];
        return (
          <>
            <Hero position={[ME_SIT[0], ME_SIT[1] + y, ME_SIT[2]]} rotationY={0.3} animation="sit" arms={mine} face={(["smile", "wow", "laugh"] as const)[day]} headYaw={0.6} />
            <Mo position={[MO_SIT[0], MO_SIT[1] + y, MO_SIT[2]]} rotationY={-0.3} animation="sit" arms={(["hold", "talk", "shrug"] as const)[day]} face="neutral" headYaw={-0.6} gaze={0} />
            {day === 1 ? <Bread position={[3.25, 0.56, 6.5]} /> : null}
            {day === 2 ? <Stew position={[3.25, 0.5, 6.5]} /> : null}
          </>
        );
      },
    },
    {
      cue: "6.lamp",
      ...cam.push({ on: [14.4, 1.15, -0.5], onTo: [15.2, 1.15, -0.5], dist: 5.2, to: 4.4, yaw: 22, pitch: 5, fov: 42 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Night. The two of them walk along with a lantern each. On 'either' Mo walks flat into the lamp post, as the boy did into the wall. Then both lift their lanterns.",
      impacts: [{ at: 1.0, amp: 0.07, dur: 0.3 }],
      stage: (t) => {
        const hit = wordAt("6.lamp", "either") - 0.15;
        const lift = wordAt("6.lamp", "lantern");
        const go = ramp(t, 0, hit);
        const back = t > hit ? Math.min(0.45, (t - hit) * 1.5) : 0;
        const x = 13.0 + 2.3 * go - back;
        const up = t > lift - 0.2;
        return (
          <>
            <Mo position={[x, 0, -1.0]} rotationY={Math.PI / 2} animation={t < hit ? "walk" : back < 0.45 ? "stagger" : "idle"} arms={up ? "reachUp" : "hold"} animDistance={2.3 * go + back} face="neutral" headRoll={jolt(t, hit, 0.5)} gaze={0}>
              <Lantern position={[0, -0.02, 0.1]} chain={0.12} light={7} reach={8} seed={3} />
            </Mo>
            <Hero position={[12.6 + 2.0 * ease(ramp(t, 0, hit + 0.3)), 0, 0.1]} rotationY={Math.PI / 2} animation={t < hit + 0.3 ? "walk" : "idle"} arms={up ? "reachUp" : "hold"} animDistance={2.0 * ease(ramp(t, 0, hit + 0.3))} face={t > hit ? "laugh" : "smile"} headYaw={t > hit ? 0.6 : 0}>
              <Lantern position={[0, -0.02, 0.1]} chain={0.12} light={7} reach={8} seed={5} />
            </Hero>
            <Bits position={[15.5, 1.5, -1.0]} t={t - hit} color="#ffe27a" count={8} power={2.2} toward={[-1, 0.5, 0.4]} />
          </>
        );
      },
    },
    {
      cue: "6.cold",
      ...cam.push({ on: MID, dist: 3.9, to: 3.4, yaw: -6, pitch: 5, fov: 40 }),
      zone: ZONE.night,
      look: NIGHT,
      note: "Night on the wall, both of them hugging themselves and shivering in time, breath coming out white. Zombies have no breath.",
      stage: (t) => {
        const sh = Math.sin(t * 38) * 0.012;
        return (
          <>
            <Hero position={[ME_SIT[0] + sh, ME_SIT[1], ME_SIT[2]]} animation="sit" arms="hug" face="frown" />
            <Mo position={[MO_SIT[0] - sh, MO_SIT[1], MO_SIT[2]]} animation="sit" arms="hug" face="neutral" gaze={0} />
            <Puffs position={[ME_SIT[0], 1.1, 6.85]} color="#ffffff" count={4} rise={0.5} spread={0.12} size={0.07} speed={1.1} opacity={0.7} seed={2} />
            <Puffs position={[MO_SIT[0], 1.3, 6.85]} color="#ffffff" count={4} rise={0.5} spread={0.12} size={0.08} speed={1.1} opacity={0.7} seed={9} />
            <Lantern position={[3.25, 0.95, 6.9]} chain={0.1} light={8} reach={7} seed={4} />
          </>
        );
      },
    },
    {
      cue: "6.sneeze",
      ...cam.push({ on: [3.5, 1.25, 6.5], dist: 3.3, to: 2.8, yaw: 8, pitch: 3, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "Mo's head goes back, back, and on 'sneezed' snaps forward: his hat jumps a foot off his head and lands again. The boy squints at him. Mo looks away.",
      impacts: [{ at: 0.75, amp: 0.06, dur: 0.3 }],
      stage: (t) => {
        const at = wordAt("6.sneeze", "sneezed");
        const wind = ease(ramp(t, 0, at)) * (t < at ? 1 : 0);
        const snap = t >= at ? Math.exp(-(t - at) * 5) : 0;
        const sus = wordAt("6.sneeze", "monsters");
        return (
          <>
            <Mo position={MO_SIT} animation="sit" face="neutral" hat={false} headPitch={-0.5 * wind + 0.55 * snap} headYaw={t > sus ? -0.0 + 0.7 * ease(ramp(t, sus, sus + 0.3)) : 0} gaze={0} />
            <group position={[MO_SIT[0], 1.62 + tossed(t, at, 0.5, 0.5) + 0.06 * wind, MO_SIT[2] + 0.1 * snap - 0.12 * wind]} rotation={[-0.5 * wind + 0.5 * snap, 0, jolt(t, at, 0.4)]}>
              <Block position={[0, 0.02, 0]} size={[0.92, 0.045, 0.92]} color="#d9b65a" />
              <Block position={[0, 0.13, 0]} size={[0.54, 0.2, 0.54]} color="#e3c46c" />
              <Block position={[0, 0.07, 0]} size={[0.56, 0.06, 0.56]} color="#7a4a22" />
            </group>
            <Bits position={[MO_SIT[0], 1.3, 6.85]} t={t - at} color="#e8f2ff" count={12} power={3} toward={[0, 0, 1]} />
            <Hero position={[ME_SIT[0], ME_SIT[1] + hop(t, at, 0.15, 0.25), ME_SIT[2]]} rotationY={0.3} animation="sit" face={t > sus ? "uneasy" : t > at ? "wow" : "smile"} headYaw={0.8} headRoll={t > sus ? -0.25 * ease(ramp(t, sus, sus + 0.3)) : 0} />
          </>
        );
      },
    },
    {
      cue: "6.fish",
      ...cam.push({ on: [10.6, 1.0, 8.0], dist: 5.0, to: 4.4, yaw: 62, pitch: 8, fov: 42 }),
      zone: ZONE.day,
      look: DAY,
      note: "At the pond. Mo's float dips, he yanks, and on 'fish' a fish flies out of the water in an arc and smacks into the boy's arms.",
      impacts: [{ at: 1.1, amp: 0.04, dur: 0.25 }],
      stage: (t) => {
        const yank = wordAt("6.fish", "fish") - 0.15;
        const k = ramp(t, yank, yank + 0.45);
        const fish: Vec3 = [12.2 - 2.1 * k, 0.1 + 0.95 * k + 1.6 * 4 * k * (1 - k), 8.3 - 0.9 * k];
        return (
          <>
            <Mo position={[10.0, 0, 8.6]} rotationY={Math.PI / 2} animation="idle" arms={t > yank ? "reachUp" : "hold"} face="neutral" gaze={0}>
              <Rod bob={t < yank ? Math.sin(t * 9) * 0.05 - 0.1 * ramp(t, yank - 0.3, yank) : 0.9} />
            </Mo>
            <Hero position={[10.0, hop(t, yank + 0.45, 0.2, 0.25), 7.4]} rotationY={Math.PI / 2} animation="idle" arms={k >= 1 ? "hug" : "hold"} face={k >= 1 ? "laugh" : "wow"} headYaw={0.4} />
            {k > 0 ? <Block position={k >= 1 ? [10.3, 0.85 + hop(t, yank + 0.45, 0.2, 0.25), 7.4] : fish} size={[0.4, 0.2, 0.12]} color="#5f8fd0" rotation={[0, 0.4, k < 1 ? t * 14 : Math.sin(t * 20) * 0.3]} /> : null}
            <Bits position={[12.2, 0.15, 8.3]} t={t - yank} color="#bfe0ff" count={10} power={2.6} />
          </>
        );
      },
    },
    {
      cue: "6.laugh",
      ...cam.push({ on: [3.4, 1.2, 6.5], dist: 3.5, to: 2.9, yaw: 10, pitch: 3, fov: 38 }),
      zone: ZONE.day,
      look: DAY,
      note: "The boy laughs and waves at him to try. Mo's shoulders jerk once, twice, like an engine that will not start. On 'forgotten' it catches and he rocks with it.",
      stage: (t) => {
        const got = wordAt("6.laugh", "forgotten") - 0.1;
        const on = t > got;
        const rock = on ? Math.sin((t - got) * 15) * 0.05 : 0;
        return (
          <>
            <Hero position={ME_SIT} rotationY={0.3} animation="sit" arms="laugh" face="laugh" headYaw={0.6} headPitch={Math.sin(t * 14) * 0.08} />
            <Mo position={[MO_SIT[0], MO_SIT[1] + jolt(t, 0.5, 0.12) + jolt(t, 1.0, 0.12) + Math.abs(rock), MO_SIT[2]]} rotationY={-0.25} animation="sit" arms={on ? "laugh" : undefined} face={on ? "laugh" : "neutral"} headYaw={-0.5} headPitch={-0.3 * (on ? 1 : 0) + rock * 2} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "6.like",
      ...cam.orbit({ on: [3.3, 1.1, 6.5], dist: 4.4, yaw: 180, pitch: 10, yawTo: 58, pitchTo: 4, distTo: 3.0, onTo: moFace, fov: 40 }),
      zone: ZONE.day,
      look: DAY,
      note: "From behind: two backs on a wall, the same shape, legs swinging in time. The camera comes round to Mo's face as he looks down at the boy. On 'why' his eyes go to the hills.",
      stage: (t) => {
        const why = wordAt("6.like", "why");
        return (
          <>
            <Hero position={ME_SIT} animation="sit" face="smile" headPitch={Math.sin(t * 2.4) * 0.06} />
            <Mo position={MO_SIT} animation="sit" face="neutral" headYaw={-0.6 + 1.0 * ease(ramp(t, why - 0.3, why + 0.2))} headPitch={0.2 * (1 - ease(ramp(t, why - 0.3, why + 0.2)))} gaze={0} />
          </>
        );
      },
    },
  ],
});
