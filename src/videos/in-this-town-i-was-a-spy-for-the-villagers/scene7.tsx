import { cam, storyScene } from "../../engine";
import { Bearer, Bits, Blaze, Column, FireLight, Fog, Gate, Hero, NORTH, O, Pillager, Rain, Ravager, SOUTH, Smoke, SubscribeSign, EAST, WEST, cueLen, posed, timing, tw, w } from "./kit";

/** 07 — Sunrise. They wreck their own outpost; the rain takes his face off; he runs. */
const UP: Array<[number, number]> = [[0, 80], [0, 16]];
const BURN = w("12.smash", "They", 0, 1) - 0.08;
const ATE = w("12.smash", "the", 0, 2) - 0.08;
const STOP = w("12.cheer", "Then") - 0.05;
const BANNER = w("13.look", "banner") - 0.15;
const ATME = w("13.look", "me") - 0.3;
const TWO = w("14.sub", "two");
const OHNO = w("13.ohno", "no");
/** The run: metres a second, and where on the track (just outside the gate) it starts. */
const RUN = 5.2;
const RUN_FROM = 17.5;
/** Who is behind him: [x, metres behind]. */
const CHASE: Array<[number, number]> = [[-0.9, 3.9], [1.0, 4.7], [-0.3, 5.8], [1.4, 6.5], [-1.3, 7.0], [0.3, 8.1], [-0.8, 9.3], [1.1, 9.9], [0, 11.2]];
const ME = O(0, 0, 9.4);
const CAP = O(1.5, 0, 7.6);
/** Where each of them ends up standing once the cheering stops. */
const MOB: Array<[number, number, number]> = [[-2.6, 7.6, 0.5], [-1.5, 6.4, 0.2], [2.9, 7.0, -0.5], [-3.2, 9.8, 1.2], [3.4, 9.6, -1.2], [-0.3, 12.4, 0], [-4.4, 7.0, 0.8], [4.6, 7.2, -0.8], [-2.3, 11.8, 0.3], [2.2, 11.9, -0.3]];
const Wreck = ({ fire = 1 }: { fire?: number }) => (
  <>
    <Gate smashed />
    <Blaze position={O(0, 6.4, -7)} size={2.4} height={5} count={22} seed={2} />
    <Blaze position={O(-1, 0.3, -4.6)} size={1.2} height={3} count={10} seed={4} />
    <Smoke position={O(0, 9, -7)} rise={18} spread={3} size={6} count={12} lean={0.3} />
    <FireLight position={O(0, 4, -3.5)} power={2.2 * fire} reach={18} />
  </>
);
const Mob = ({ t, cheer = 0, lookAt, close = 1 }: { t: number; cheer?: number; lookAt?: [number, number, number]; close?: number }) => (
  <>
    {MOB.map(([x, z, r], i) => (
      <Pillager key={i} position={O(x * close, cheer * Math.abs(Math.sin(t * 9 + i)) * 0.18, 9.4 + (z - 9.4) * close)} rotationY={lookAt ? Math.atan2(-x, 9.4 - z) : NORTH + r * 0.4} n={i} cheer={cheer} lookAt={lookAt} phase={i} crossbow={i % 4 === 1 && cheer === 0} armR={i % 4 === 1 && cheer === 0 ? -0.3 : undefined} />
    ))}
  </>
);

export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Their own",
  shots: [
    {
      cue: "12.sun",
      ...cam.push({ on: O(0, 2.4, 20), dist: 14, to: 11.5, yaw: 3, pitch: 9, fov: 42 }),
      zone: "outpost",
      look: "overworld-sunset",
      note: "First light. Over their heads and the banner: fog across the track, and in it the dark shape of a tower with a log wall round it.",
      stage: (t) => {
        const s = 53 + t * 1.2;
        return (
          <>
            <Gate />
            <Bearer at={O(0, 0, 80 - s)} h={NORTH} t={t} walk={s} face="worried" />
            <Column origin={O} pts={UP} s={s} t={t} n={14} tired={1 - tw(t, 1.2, 2.0)} />
            <Fog at={O(0, 0, 26)} n={6} step={4.5} opacity={0.24} t={t} />
          </>
        );
      },
    },
    {
      cue: "12.charge",
      ...cam.push({ on: O(0.1, 1.5, 27), dist: 5.0, to: 4.2, yaw: 176, pitch: -6, fov: 44 }),
      zone: "outpost",
      look: "overworld-sunset",
      note: "From in front and below: the captain throws an arm up and yells, and they all come past him and past the boy at a run. The boy stays where he is.",
      stage: (t) => {
        const run = Math.max(0, t - 0.55) * 6.5;
        return (
          <>
            <Bearer at={O(-0.5, 0, 26.6)} h={NORTH} t={t} face="fear" headYaw={Math.sin(t * 6) * 0.5} side={-0.34} />
            <Pillager chief position={O(0.65, 0, 27.6)} rotationY={NORTH} armL={-3.0} talk={1} cheer={0} />
            {Array.from({ length: 12 }, (_, i) => (
              <Pillager key={i} position={O((i % 2 ? 1 : -1) * (2.0 + (i % 3) * 0.9), 0, 29.5 + Math.floor(i / 2) * 1.4 - run)} rotationY={NORTH} walk={run * 1.4 + i} n={i} armR={-2.6} lean={0.3} phase={i} />
            ))}
            <Ravager position={O(4.6, 0, 37 - run)} rotationY={NORTH} walk={run} jaw={0.9} />
            <Fog at={O(0, 0, 40)} n={3} step={-4} opacity={0.16} t={t} />
          </>
        );
      },
    },
    {
      cue: "12.smash",
      ...cam.push({ on: O(0, 1.6, 14), dist: 8.2, to: 6.8, yaw: 20, pitch: 6, fov: 44 }),
      zone: "outpost",
      look: "overworld-sunset",
      note: "'They smashed the gate': the two log doors go flat and bits fly, and they pour through over them.",
      stage: (t) => (
        <>
          <Gate smashed={t > 0.28} open={0} />
          <Bits position={O(-1, 1.6, 14)} t={t - 0.28} color="#7a5536" count={14} seed={2} power={1.6} />
          <Bits position={O(1, 1.2, 14)} t={t - 0.34} color="#5c3f24" count={12} seed={5} power={1.4} />
          {Array.from({ length: 8 }, (_, i) => (
            <Pillager key={i} position={O((i % 2 ? 0.7 : -0.7), 0, 15.2 + Math.floor(i / 2) * 1.5 - t * 5 + (t < 0.28 ? 0 : 0))} rotationY={NORTH} walk={t * 6 + i} n={i} armR={-2.6} lean={0.3} phase={i} />
          ))}
        </>
      ),
    },
    {
      cue: "12.smash",
      cut: BURN,
      ...cam.orbit({ on: O(0, 6.2, -7), dist: 14, distTo: 12.5, yaw: 28, yawTo: 40, pitch: -16, fov: 44 }),
      zone: "outpost",
      look: "overworld-sunset",
      note: "'They burned the tower': up at the top of it from the yard, fire out of the windows, and three of them under it throwing torches and dancing.",
      stage: (t) => (
        <>
          <Wreck />
          {[-2.4, 0, 2.4].map((x, i) => (
            <Pillager key={i} position={O(x, Math.abs(Math.sin(t * 9 + i)) * 0.2, -2.4 + (i % 2))} rotationY={NORTH} cheer={1} n={i} />
          ))}
        </>
      ),
    },
    {
      cue: "12.smash",
      cut: ATE,
      ...cam.push({ on: O(-3, 1.5, 9.2), dist: 8.6, to: 7.4, yaw: 104, pitch: 9, fov: 44 }),
      zone: "outpost",
      look: "overworld-sunset",
      note: "'The ravager ate the kitchen': the beast with its whole head inside the cook's stall, planks and pots going over its shoulders.",
      stage: (t) => (
        <>
          <Wreck />
          <Ravager position={O(-3, 0, 7.4)} rotationY={SOUTH} rider={false} jaw={0.5 + 0.5 * Math.sin(t * 14)} head={0.3 + Math.sin(t * 9) * 0.25} />
          {[0, 1, 2].map((i) => (
            <Bits key={i} position={O(-3 + (i - 1) * 0.6, 1.6, 9.6)} t={(t + i * 0.3) % 0.85} color={i === 1 ? "#c8924a" : "#8a5a2e"} count={10} seed={i + 6} power={1.3} toward={[0, 2, -2]} />
          ))}
          <Hero coat ash={1} position={O(-7.5, 0, 8.6)} rotationY={EAST} animation="idle" face="surprised" lookAt={O(-3, 1.4, 10)} />
        </>
      ),
    },
    {
      cue: "12.cheer",
      ...cam.push({ on: O(0, 1.6, 6.4), dist: 9.6, to: 8.6, yaw: 184, pitch: 4, fov: 44 }),
      zone: "outpost",
      look: "overworld-sunset",
      note: "From the tower's side: ten of them jumping with their arms up in the firelight. Then the arms come down, one after another.",
      stage: (t) => {
        const c = 1 - tw(t, STOP, STOP + 0.35);
        return (
          <>
            <Wreck />
            <Mob t={t} cheer={c} />
            <Pillager chief position={CAP} rotationY={NORTH} cheer={c} turn={(1 - c) * Math.sin(t * 5) * 0.8} />
            <Bearer at={ME} h={NORTH} t={t} face="fear" />
          </>
        );
      },
    },
    {
      cue: "12.own",
      ...cam.orbit({ on: O(0, 2.5, 1), dist: 27, distTo: 24, yaw: 30, yawTo: 14, pitch: 33, fov: 46 }),
      zone: "outpost",
      look: "overworld-sunset",
      note: "The same high view as the start of the film: the same wall, the same fire, the same pen. The gate flat, the tower alight, and nobody moving.",
      stage: (t) => (
        <>
          <Wreck />
          <Mob t={t} />
          <Pillager chief position={CAP} rotationY={NORTH} />
          <Bearer at={ME} h={NORTH} t={t} face="fear" />
          <Ravager position={O(-3, 0, 7.6)} rotationY={SOUTH} rider={false} jaw={0.2} head={0.3} />
          <Smoke position={O(-3, 1, 10.5)} rise={8} spread={1.5} size={3} count={8} seed={3} />
        </>
      ),
    },
    {
      cue: "13.look",
      ...cam.push({ on: [CAP[0] - 0.2, 1.75, CAP[2]], dist: 3.4, to: 2.9, yaw: 204, pitch: -5, fov: 38 }),
      zone: "outpost",
      look: "overworld-sunset",
      note: "The captain's face, close, lit orange by his own tower. He looks up at it. Then he turns right round, to the banner behind him.",
      stage: (t) => (
        <>
          <Wreck fire={0.6} />
          <Pillager chief position={CAP} rotationY={NORTH + 0.3 - tw(t, BANNER - 0.1, BANNER + 0.3) * (Math.PI - 0.5)} nod={t < BANNER ? -0.45 : -0.1} mad={1} />
          <Bearer at={ME} h={NORTH} t={t} face="fear" />
        </>
      ),
    },
    {
      cue: "13.look",
      cut: ATME,
      ...cam.push({ on: O(0.3, 1.5, 8.2), dist: 3.4, to: 2.9, yaw: 6, pitch: -14, fov: 44 }),
      zone: "outpost",
      look: "overworld-sunset",
      note: "'Then at me': from behind his shoulder and below. The captain, and every one of them behind the captain, looking down at one small back.",
      stage: (t) => (
        <>
          <Wreck fire={0.6} />
          <Mob t={t} lookAt={[ME[0], 1.3, ME[2]]} />
          <Pillager chief position={CAP} rotationY={SOUTH - 0.6} lookAt={[ME[0], 1.3, ME[2]]} mad={1} lean={0.2} />
          <Bearer at={ME} h={NORTH} t={t} face="fear" />
        </>
      ),
    },
    {
      cue: "13.rain",
      ...cam.push({ on: [ME[0], 1.7, ME[2]], dist: 4.4, to: 3.7, yaw: 160, pitch: -12, fov: 44 }),
      zone: "outpost",
      look: "overworld-storm",
      note: "Up at him and the sky from the ground: the first drops, then all of it. He looks up. He knows what is on his face.",
      stage: (t) => (
        <>
          <Wreck fire={0.5} />
          <Bearer at={ME} h={NORTH} t={t} face="fear" headPitch={-0.5 * tw(t, 0.4, 0.8)} />
          <Pillager chief position={CAP} rotationY={SOUTH - 0.6} lookAt={[ME[0], 1.3, ME[2]]} mad={1} />
          <Rain center={[ME[0], 0, ME[2] - 1]} t={t} area={[12, 12]} count={Math.round(60 + 260 * tw(t, 0, 1))} height={9} />
          <pointLight position={O(-0.6, 1.6, 7.4)} color="#eef2ff" intensity={26} distance={8} decay={1.5} />
        </>
      ),
    },
    {
      cue: "13.ash",
      ...cam.push({ on: [ME[0], 1.3, ME[2]], dist: 1.7, to: 1.3, yaw: 176, pitch: 0, fov: 38 }),
      zone: "outpost",
      look: "overworld-storm",
      note: "His face, very close, in the rain: the grey goes in streaks, top to bottom, and under it he is as pink as he ever was.",
      stage: (t) => (
        <>
          <Bearer at={ME} h={NORTH} t={t} ash={1 - tw(t, 0.1, 1.2)} face="worried" side={0.62} />
          <Rain center={[ME[0], 0, ME[2] - 1]} t={t + 3} area={[5, 5]} count={160} height={5} />
          {[0, 1, 2, 3].map((i) => {
            const k = (t * 0.9 + i * 0.27) % 1;
            return (
              <mesh key={i} position={[ME[0] - 0.17 + i * 0.11, 1.5 - k * 0.42, ME[2] - 0.235]}>
                <boxGeometry args={[0.035, 0.09, 0.012]} />
                <meshStandardMaterial color="#8d9296" />
              </mesh>
            );
          })}
          <pointLight position={O(0.6, 1.8, 7.6)} color="#eef2ff" intensity={6} distance={5} decay={1.5} />
          <FireLight position={O(-2, 2, 6)} power={0.7} reach={8} />
        </>
      ),
    },
    {
      cue: "13.ohno",
      ...cam.push({ on: [ME[0], 1.25, ME[2]], dist: 3.6, to: 3.1, yaw: 155, pitch: 12, fov: 42 }),
      zone: "outpost",
      look: "overworld-storm",
      note: "Past the captain's wet shoulder, down at him: a pink boy in a pillager's coat, the banner still in his hands, and every one of them behind him looking.",
      stage: (t) => (
        <>
          <Wreck fire={0.5} />
          <Mob t={t} lookAt={[ME[0], 1.3, ME[2]]} close={0.62} />
          <Pillager chief position={CAP} rotationY={SOUTH - 0.6} lookAt={[ME[0], 1.3, ME[2]]} mad={1} lean={0.25 + 0.1 * tw(t, 0.3, 0.7)} />
          <Bearer at={ME} h={NORTH} t={t} ash={0} face={t < OHNO ? "worried" : "fear"} side={0.5} headPitch={-0.35} headYaw={Math.sin(t * 9) * 0.08} />
          <Rain center={[ME[0], 0, ME[2] - 1]} t={t + 5} area={[10, 10]} count={300} height={8} />
          <pointLight position={O(0.6, 2.2, 7.6)} color="#eef2ff" intensity={18} distance={7} decay={1.5} />
        </>
      ),
    },
    {
      cue: "14.sub",
      ...cam.truck({ on: O(0.1, 1.55, RUN_FROM), dist: 4.7, yaw: 5, pitch: 2, fov: 44, by: [0, 0, RUN * cueLen("14.sub")] }),
      // The lens backs away at his own steady speed, so the ground runs under him the whole time; he gains on it a little.
      ease: "linear",
      zone: "outpost",
      look: "overworld-storm",
      note: "Backing away down the track in front of him: he runs at the lens with a SUBSCRIBE sign over his head, and out of the broken gate behind him come the captain, all of them, and the beast.",
      stage: (t) => {
        const z = RUN_FROM + (RUN + 0.5) * t;
        const bob = Math.abs(Math.sin(t * 11)) * 0.07;
        const back = t > TWO - 0.15 ? 1 : 0;
        return (
          <>
            <Wreck fire={0.7} />
            <Hero coat ash={0} position={O(0, bob, z)} rotationY={SOUTH} pose={posed("run", t * 2, { armR: [-2.85, 0, -0.14], armL: [-2.85, 0, 0.14] })} face="fear" headYaw={back * 0.9} />
            <SubscribeSign position={O(0, 2.34 + bob, z + 0.04)} rotationY={SOUTH} scale={0.5} tilt={Math.sin(t * 11) * 0.07} />
            <Pillager chief position={O(0.55, 0, z - 2.7 + t * 0.25)} rotationY={SOUTH} walk={z * 1.3} armR={-1.5} armL={-1.5} lean={0.32} mad={1} />
            {CHASE.map(([x, back2], i) => (
              <Pillager key={i} position={O(x, 0, z - back2 + t * 0.2)} rotationY={SOUTH} walk={z * 1.3 + i} n={i} armR={i % 2 ? -2.6 : -1.4} armL={i % 2 ? -2.6 : undefined} crossbow={i % 2 === 0} lean={0.3} phase={i} />
            ))}
            <Ravager position={O(0.2, 0, z - 13.2)} rotationY={SOUTH} walk={z} jaw={0.5 + 0.5 * Math.sin(t * 13)} />
            <Rain center={O(0, 0, z - 2)} t={t + 7} area={[10, 14]} count={320} height={8} />
            <pointLight position={O(0.8, 2.2, z + 2.4)} color="#eef2ff" intensity={16} distance={7} decay={1.5} />
            <pointLight position={O(-1.5, 3, z - 4)} color="#dfe8ff" intensity={30} distance={12} decay={1.5} />
          </>
        );
      },
    },
  ],
});
