import { Block, cam, storyScene } from "../../engine";
import { Bits, Bubble, GATE, Hero, MumChicken, NORTH, PATH_TOP, SCHOOL, SOUTH, SoundRings, WhiteEgg, Zombie, ZombieMum, ease, hop, pop, ramp, timing, wordAt } from "./kit";

const winPop = wordAt("2.school", "window");
const cluckAt = wordAt("2.cluck", "clucked");
const ateAt = wordAt("2.homework", "ate");
const underLook = wordAt("2.under", "stared");
const eggLook = wordAt("2.egg", "egg");

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Followed Me Everywhere",
  shots: [
    {
      cue: "2.school",
      ...cam.push({ on: [-0.35, 1.05, 43.0], dist: 5.5, to: 4.5, yaw: 20, pitch: 8, fov: 46 }),
      handheld: 0.015,
      impacts: [{ at: winPop, amp: 0.04, dur: 0.25 }],
      look: "lantern-night",
      zone: "school",
      note: "Unobstructed classroom diagonal: Hero walks cleanly to his desk left, teacher stands right, MumChicken leaps onto window sill.",
      stage: (t) => {
        const walkIn = ramp(t, 0, 0.85);
        const jumpSill = ramp(t, winPop - 0.25, winPop + 0.18);
        const cx = -2.1 + ease(jumpSill) * 1.2;
        const cy = jumpSill > 0.05 ? Math.sin(ease(jumpSill) * Math.PI) * 0.45 + 1.09 * ease(jumpSill) : 0;
        return (
          <>
            <Hero position={[-1.15, 0, 45.3 - walkIn * 0.95]} rotationY={NORTH + 0.4} walk={walkIn < 0.99 ? walkIn * 2.2 : 0} mood="sad" lookAt={SCHOOL.windowSill} />
            <Zombie position={[0.7, 0, 42.9]} rotationY={-2.2} shirt="#574a7a" mood="calm" tilt={Math.sin(t * 3) * 0.08} lookAt={[-1.15, 0.9, 44.35]} />
            <MumChicken
              position={[cx, cy, 41.45]}
              rotationY={0.25}
              walk={jumpSill < 0.05 ? t * 2.0 : 0}
              flap={jumpSill > 0.05 && jumpSill < 0.95 ? 0.9 : 0.25}
              lookAt={[-1.15, 0.8, 44.35]}
            />
          </>
        );
      },
    },
    {
      cue: "2.cluck",
      ...cam.orbit({ on: [-0.85, 1.38, 41.6], dist: 2.9, distTo: 2.3, yaw: 158, yawTo: 192, pitch: 6, fov: 40 }),
      handheld: 0.016,
      impacts: [{ at: cluckAt, amp: 0.035, dur: 0.25 }],
      look: "lantern-night",
      zone: "school",
      note: "Outside-in through open window: MumChicken flaps clucking in foreground as angry teacher spins round inside behind her.",
      stage: (t) => {
        const turnTeacher = ease(ramp(t, 0.05, cluckAt));
        return (
          <>
            <Zombie position={[0.6, 0, 43.1]} rotationY={-2.2 - turnTeacher * 0.6} shirt="#574a7a" mood="angry" lean={0.18 * turnTeacher} lookAt={SCHOOL.windowSill} />
            <Hero position={[-1.1, 0, 44.4]} rotationY={NORTH} mood="sad" lean={0.3} armPitch={[-1.9, -1.9]} />
            <MumChicken position={[-0.9, 1.09 + hop(t, cluckAt, 0.14, 0.25), 41.45]} rotationY={-0.3} flap={t >= cluckAt - 0.1 ? 0.9 : 0.25} peck={Math.sin(t * 16) * 0.45} lookAt={[0.6, 1.6, 43.1]} />
            {t >= cluckAt - 0.1 && (
              <>
                <SoundRings position={[-0.85, 1.55, 41.7]} t={(t - cluckAt + 0.1) * 1.5} color="#ffd98a" reach={0.85} />
                <Bubble dark text="CLUCK!" position={[-0.9, 2.02, 41.45]} rotationY={Math.PI} scale={0.42 * pop(t, cluckAt - 0.1)} />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "2.homework",
      ...cam.orbit({ on: [-1.05, 0.92, 44.35], dist: 3.15, distTo: 2.6, yaw: 34, yawTo: 12, pitch: 18, fov: 42 }),
      handheld: 0.015,
      impacts: [{ at: ateAt, amp: 0.035, dur: 0.25 }],
      look: "lantern-night",
      zone: "school",
      note: "3/4 close desk shot: MumChicken pecks furiously shredding the white homework sheet into flying bits while Hero reaches out.",
      stage: (t) => {
        const paperScale = t < ateAt ? 1 : Math.max(0, 1 - ease(ramp(t, ateAt, ateAt + 0.25)));
        return (
          <>
            <Hero position={[-1.4, hop(t, ateAt, 0.18, 0.3), 44.65]} rotationY={1.0} mood="scared" armPitch={[-1.6, -1.6]} lean={0.25} />
            <MumChicken position={[-0.85, 0.66 + hop(t, ateAt - 0.15, 0.12, 0.22), 44.15]} rotationY={-0.35} peck={Math.max(0, Math.sin(t * 18)) * 0.95} flap={0.35} />
            {paperScale > 0.02 && <Block position={[-0.88, 0.675, 44.3]} size={[0.26 * paperScale, 0.015, 0.32 * paperScale]} color="#f5f1e6" />}
            <Bits position={[-0.88, 0.75, 44.3]} t={t - ateAt} color="#f5f1e6" count={14} power={2.8} />
          </>
        );
      },
    },
    {
      cue: "2.sleep",
      ...cam.push({ on: [-0.95, 1.0, 44.2], dist: 3.6, to: 2.8, yaw: 6, pitch: 12, fov: 44 }),
      handheld: 0.012,
      look: "lantern-night",
      zone: "school",
      note: "Stacked depth in parents' night: Hero left, MumChicken snoozing on chair front-center, tall zombie mums looming behind.",
      stage: (t) => (
        <>
          <ZombieMum position={[-0.35, 0, 43.3]} rotationY={SOUTH - 0.2} shirt="#2d7a78" hat="bow" mood="calm" tilt={Math.sin(t * 4) * 0.12} lean={0.14} />
          <ZombieMum position={[-1.45, 0, 43.35]} rotationY={SOUTH + 0.2} shirt="#486a94" hat="straw" mood="calm" nod={Math.sin(t * 3.5) * 0.14} lean={0.12} />
          <Hero position={[-1.45, 0, 44.65]} rotationY={0.75} mood="sad" armPitch={[-2.0, -2.0]} tilt={Math.sin(t * 6) * 0.1} />
          <MumChicken position={[-0.88, 0.47, 44.85]} rotationY={0.15} crouch={0.6 + Math.sin(t * 3) * 0.15} asleep />
        </>
      ),
    },
    {
      cue: "2.roof",
      ...cam.orbit({ on: [8.85, 5.95, -5.0], dist: 3.8, distTo: 2.9, yaw: 18, yawTo: -14, pitch: 18, fov: 42 }),
      handheld: 0.012,
      look: "overworld-night",
      zone: "village",
      note: "Rooftop terrace at night: MumChicken flutters down onto her straw nest left while Hero watches beside her and WhiteEgg sits front.",
      stage: (t, { p }) => {
        const settle = ease(ramp(p, 0, 0.5));
        return (
          <>
            <MumChicken position={[8.45, GATE.roofTopY + 0.12 + (1 - settle) * 0.6, -5.05]} rotationY={0.5} flap={1 - settle * 0.8} crouch={settle * 0.45} />
            <Hero position={[9.2, GATE.roofTopY + 0.12, -4.95]} rotationY={-0.65} mood="calm" tilt={Math.sin(t * 2.5) * 0.08} lookAt={GATE.nest} />
            <WhiteEgg position={[8.82, GATE.roofTopY + 0.13, -4.68]} />
          </>
        );
      },
    },
    {
      cue: "2.view",
      ...cam.truck({ on: [8.7, 6.0, -2.1], by: [0.6, 0, 0], dist: 3.2, yaw: 32, pitch: 8, fov: 42 }),
      handheld: 0.014,
      look: "overworld-night",
      zone: "village",
      note: "Hero walks cleanly to the south roof edge then stops peering down; MumChicken scurries beside him.",
      stage: (t, { p }) => {
        const walkP = ramp(p, 0, 0.72);
        return (
          <>
            <Hero position={[8.1 + walkP * 0.95, GATE.roofTopY, -2.0]} rotationY={SOUTH} walk={walkP < 0.99 ? walkP * 1.9 : 0} mood="calm" turn={Math.sin(t * 3.5) * 0.25} lean={0.18} lookAt={[8.6, 4.4, 3]} />
            <MumChicken position={[9.55 - walkP * 0.75, GATE.roofTopY + hop(t, 0.6, 0.15, 0.25), -2.15]} rotationY={-0.3} walk={walkP < 0.99 ? walkP * 2.3 : 0} flap={0.75} lookAt={[8.6, 5.8, -2.0]} />
          </>
        );
      },
    },
    {
      cue: "2.under",
      ...cam.orbit({ on: [-8.8, 1.6, -2.85], dist: 5.4, distTo: 4.65, yaw: 28, yawTo: 10, pitch: 10, fov: 44 }),
      handheld: 0.015,
      look: "overworld-night",
      zone: "village",
      note: "Real tree climb: Hero scrambles hand-over-hand up the oak trunk onto the south-east branch while MumChicken sprints underneath staring up.",
      stage: (t, { p }) => {
        const climb = ramp(p, 0, 0.58);
        const perch = ramp(p, 0.58, 0.76);
        const climbing = climb < 0.99;
        const hy = climbing ? 0.35 + climb * 2.15 : 2.5 + perch * 0.15;
        const hx = -8.9 + perch * 0.3;
        const hz = -3.1 + perch * 0.55;
        const runUnder = ramp(t, 0, Math.max(0.4, underLook));
        return (
          <>
            <Hero
              position={[hx, hy, hz]}
              rotationY={climbing ? NORTH - 0.35 : SOUTH}
              walk={climbing ? climb * 4.2 : 0}
              mood="calm"
              lean={climbing ? 0.22 : 0.08}
              armPitch={climbing ? [-2.5 + Math.sin(t * 16) * 0.65, -2.5 - Math.sin(t * 16) * 0.65] : [-0.3, -0.3]}
              lookAt={climbing ? [-9.1, 3.2, -3.5] : [-8.6, 0.4, -2.3]}
            />
            <MumChicken
              position={[-10.4 + runUnder * 1.8, PATH_TOP, -2.3]}
              rotationY={runUnder < 0.99 ? Math.PI / 2 : 0.2}
              walk={runUnder < 0.99 ? runUnder * 3.0 : 0}
              flap={runUnder < 0.99 ? 0.65 : 0.2}
              lookAt={[hx, hy + 0.4, hz]}
            />
          </>
        );
      },
    },
    {
      cue: "2.asked",
      ...cam.orbit({ on: [8.82, 5.95, -5.0], dist: 3.1, distTo: 2.45, yaw: 4, yawTo: -14, pitch: 14, fov: 40 }),
      handheld: 0.014,
      look: "overworld-night",
      zone: "village",
      note: "Clean unblocked rooftop two-shot: MumChicken left, Hero right gesturing earnestly, egg front-center.",
      stage: (t) => (
        <>
          <Hero position={[9.22, GATE.roofTopY + 0.12, -5.0]} rotationY={-0.95} mood="sad" lean={0.15 + Math.sin(t * 4) * 0.06} armPitch={[-1.3, -0.7]} lookAt={[8.45, 5.9, -5.05]} />
          <MumChicken position={[8.45, GATE.roofTopY + 0.12 + hop(t, 0.5, 0.12, 0.25), -5.05]} rotationY={0.95} crouch={0.35} headYaw={Math.sin(t * 3) * 0.2} lookAt={[9.22, 6.1, -5.0]} />
          <WhiteEgg position={[8.82, GATE.roofTopY + 0.13, -4.68]} />
        </>
      ),
    },
    {
      cue: "2.egg",
      ...cam.orbit({ on: [8.82, 5.75, -4.9], dist: 2.6, distTo: 2.0, yaw: -14, yawTo: 12, pitch: 18, fov: 40 }),
      handheld: 0.012,
      look: "overworld-night",
      zone: "village",
      note: "Egg stacked low-center in foreground: MumChicken dips her beak toward the white egg, then snaps her eyes back up to Hero.",
      stage: (t) => {
        const lookBack = t > eggLook + 1.0;
        const step = ramp(t, 0.1, 0.55);
        return (
          <>
            <Hero position={[9.2, GATE.roofTopY + 0.12, -5.1]} rotationY={-0.85} mood="calm" nod={lookBack ? -0.1 : 0.15} lookAt={[8.82, 5.6, -4.68]} />
            <MumChicken
              position={[8.32 + step * 0.22, GATE.roofTopY + 0.12, -5.1]}
              rotationY={0.85}
              walk={step < 0.99 ? step * 1.2 : 0}
              crouch={0.38}
              peck={lookBack ? 0 : Math.sin(t * 6) * 0.25}
              lookAt={lookBack ? [9.2, 6.1, -5.1] : [8.82, 5.6, -4.68]}
            />
            <WhiteEgg position={[8.82, GATE.roofTopY + 0.13, -4.68]} wobble={0.45} />
          </>
        );
      },
    },
    {
      cue: "2.quiet",
      ...cam.push({ on: [8.82, 5.95, -5.0], dist: 2.35, to: 3.45, yaw: 10, pitch: 14, fov: 40 }),
      handheld: 0.012,
      look: "overworld-night",
      zone: "village",
      note: "Emotional pull-back: Hero walks cleanly back looking down while MumChicken settles quietly beside the egg.",
      stage: (t, { p }) => {
        const walkOut = ramp(p, 0.12, 0.9);
        return (
          <>
            <Hero position={[9.1 + walkOut * 0.65, GATE.roofTopY + 0.12, -5.0 + walkOut * 0.65]} rotationY={SOUTH - 0.3} walk={walkOut > 0.01 && walkOut < 0.99 ? walkOut * 1.8 : 0} mood="sad" lean={0.18} />
            <MumChicken position={[8.45, GATE.roofTopY + 0.12, -5.05]} rotationY={0.4} crouch={0.4 + p * 0.3} />
            <WhiteEgg position={[8.82, GATE.roofTopY + 0.13, -4.68]} />
          </>
        );
      },
    },
  ],
});
