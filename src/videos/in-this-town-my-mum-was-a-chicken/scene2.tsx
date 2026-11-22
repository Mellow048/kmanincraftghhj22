import { Block, cam, storyScene } from "../../engine";
import { Bits, Bubble, GATE, Hero, MumChicken, NORTH, PATH_TOP, Puffs, SCHOOL, SOUTH, SoundRings, WhiteEgg, Zombie, ZombieMum, ease, hop, jolt, pop, ramp, timing, wordAt } from "./kit";

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
      ...cam.truck({ on: [-0.9, 1.05, 43.2], by: [1.4, 0.18, 0], dist: 4.5, yaw: 14, pitch: 8, fov: 42 }),
      handheld: 0.015,
      impacts: [{ at: winPop, amp: 0.04, dur: 0.25 }],
      look: "lantern-night",
      zone: "school",
      note: "Classroom motion: Hero walks into his seat while MumChicken sprints outside and leaps cleanly onto the window sill.",
      stage: (t) => {
        const walkIn = ease(ramp(t, 0, 0.85));
        const jumpSill = ease(ramp(t, winPop - 0.2, winPop + 0.2));
        const cx = -2.6 + jumpSill * 1.7;
        const cy = jumpSill > 0.1 ? Math.sin(jumpSill * Math.PI) * 0.45 + 1.09 * jumpSill : 0;
        return (
          <>
            <Hero position={[-0.9, 0, 45.2 - walkIn * 0.45]} rotationY={NORTH} walk={walkIn < 0.95 ? t * 2.4 : 0} mood="sad" lookAt={SCHOOL.windowSill} />
            <Zombie position={[1.1, 0, 43.1]} rotationY={-2.5} shirt="#574a7a" mood="calm" tilt={Math.sin(t * 3) * 0.08} lookAt={[-0.9, 0.9, 44.5]} />
            <MumChicken
              position={[cx, cy, 41.45]}
              rotationY={0.2}
              walk={jumpSill < 0.8 ? t * 3.0 : 0}
              flap={jumpSill > 0.05 && jumpSill < 0.95 ? 0.9 : 0.25}
              lookAt={[-0.9, 0.8, 44.5]}
            />
          </>
        );
      },
    },
    {
      cue: "2.cluck",
      ...cam.orbit({ on: [-0.3, 1.45, 41.8], dist: 3.1, distTo: 2.5, yaw: 38, yawTo: 12, pitch: -4, fov: 38 }),
      handheld: 0.016,
      impacts: [{ at: cluckAt, amp: 0.035, dur: 0.25 }],
      look: "lantern-night",
      zone: "school",
      note: "Teacher whips round toward the sill as MumChicken flaps, clucks loudly with sound rings, and Hero shrinks down.",
      stage: (t) => {
        const turnTeacher = ease(ramp(t, 0.05, cluckAt));
        return (
          <>
            <Zombie position={[1.1, 0, 43.1]} rotationY={-1.9 - turnTeacher * 0.7} shirt="#574a7a" mood="angry" lean={0.18 * turnTeacher} lookAt={SCHOOL.windowSill} />
            <Hero position={[-0.9, 0, 44.75]} rotationY={NORTH} mood="sad" lean={0.3} armPitch={[-1.9, -1.9]} />
            <MumChicken position={[-0.9, 1.09 + hop(t, cluckAt, 0.14, 0.25), 41.45]} rotationY={0.4} flap={t >= cluckAt - 0.1 ? 0.85 : 0.2} peck={Math.sin(t * 16) * 0.45} lookAt={[1.1, 1.6, 43.1]} />
            {t >= cluckAt - 0.1 && (
              <>
                <SoundRings position={[-0.8, 1.55, 41.65]} t={(t - cluckAt + 0.1) * 1.5} color="#ffd98a" reach={0.95} />
                <Bubble dark text="CLUCK!" position={[-0.9, 2.05, 41.45]} rotationY={0.35} scale={0.45 * pop(t, cluckAt - 0.1)} />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "2.homework",
      ...cam.top({ on: [-0.9, 0.7, 44.3], height: 3.15, to: 2.3, spin: [0, 14], fov: 40 }),
      handheld: 0.015,
      impacts: [{ at: ateAt, amp: 0.035, dur: 0.25 }],
      look: "lantern-night",
      zone: "school",
      note: "Spinning top-down desk shot: MumChicken pecks down rapidly, shredding the white homework sheet into flying paper bits while Hero reaches out.",
      stage: (t) => {
        const paperScale = t < ateAt ? 1 : Math.max(0, 1 - ease(ramp(t, ateAt, ateAt + 0.25)));
        return (
          <>
            <Hero position={[-0.9, hop(t, ateAt, 0.18, 0.3), 44.75]} rotationY={NORTH} mood="scared" armPitch={[-1.6, -1.6]} lean={0.25} />
            <MumChicken position={[-0.9, 0.66 + hop(t, ateAt - 0.15, 0.12, 0.22), 44.15]} rotationY={0} peck={Math.max(0, Math.sin(t * 18)) * 0.95} flap={0.3} />
            {paperScale > 0.02 && <Block position={[-0.9, 0.675, 44.28]} size={[0.26 * paperScale, 0.015, 0.32 * paperScale]} color="#f5f1e6" />}
            <Bits position={[-0.9, 0.75, 44.28]} t={t - ateAt} color="#f5f1e6" count={12} power={2.5} />
          </>
        );
      },
    },
    {
      cue: "2.sleep",
      ...cam.orbit({ on: [-0.9, 0.9, 44.85], dist: 2.75, distTo: 2.1, yaw: -30, yawTo: 12, pitch: 14, fov: 40 }),
      handheld: 0.012,
      look: "lantern-night",
      zone: "school",
      note: "Parents' night: tall zombie mums lean in whispering while MumChicken curls down snoozing on his chair with rising Z puffs.",
      stage: (t) => (
        <>
          <ZombieMum position={[0.4, 0, 44.8]} rotationY={-1.1} shirt="#2d7a78" hat="bow" mood="calm" tilt={Math.sin(t * 4) * 0.12} lean={0.15} />
          <ZombieMum position={[-2.1, 0, 44.7]} rotationY={1.0} shirt="#486a94" hat="straw" mood="calm" nod={Math.sin(t * 3.5) * 0.14} lean={0.12} />
          <Hero position={[-1.4, 0, 44.95]} rotationY={0.8} mood="sad" armPitch={[-2.0, -2.0]} tilt={Math.sin(t * 6) * 0.1} />
          <MumChicken position={[-0.9, 0.47, 44.85]} rotationY={0.2} crouch={0.6 + Math.sin(t * 3) * 0.15} asleep />
          <Puffs position={[-0.9, 1.05, 44.85]} color="#dce8ff" count={4} rise={0.5} spread={0.15} size={0.055} speed={0.8} opacity={0.65} />
        </>
      ),
    },
    {
      cue: "2.roof",
      ...cam.orbit({ on: [8.8, 5.9, -5.0], dist: 4.8, distTo: 3.3, yaw: 24, yawTo: -16, pitch: 20, fov: 40 }),
      handheld: 0.012,
      look: "overworld-night",
      zone: "village",
      note: "Rooftop terrace at night: Hero paces near the straw nest while MumChicken flutters down onto her perch.",
      stage: (t, { p }) => {
        const settle = ease(ramp(p, 0, 0.5));
        return (
          <>
            <MumChicken position={[GATE.nest[0] - 0.2, GATE.roofTopY + 0.12 + (1 - settle) * 0.65, GATE.nest[2]]} rotationY={-0.3} flap={1 - settle * 0.8} crouch={settle * 0.5} />
            <Hero position={[GATE.nest[0] + 0.55 - p * 0.25, GATE.roofTopY + 0.12, GATE.nest[2] + 0.1]} rotationY={-0.5} walk={t * 1.4} mood="calm" lookAt={GATE.nest} />
            <WhiteEgg position={[GATE.nest[0], GATE.roofTopY + 0.13, GATE.nest[2] - 0.22]} />
          </>
        );
      },
    },
    {
      cue: "2.view",
      ...cam.truck({ on: [8.6, 5.9, -2.3], by: [1.1, 0, 0], dist: 2.7, yaw: 20, pitch: 4, fov: 38 }),
      handheld: 0.014,
      look: "overworld-night",
      zone: "village",
      note: "Hero walks to the roof rim peering down across the street; MumChicken scurries beside him flapping anxiously to keep him back.",
      stage: (t, { p }) => (
        <>
          <Hero position={[8.35 + p * 0.45, GATE.roofTopY, -2.0]} rotationY={SOUTH} walk={t * 1.4} mood="calm" turn={Math.sin(t * 3.5) * 0.25} lean={0.18} lookAt={[8.6, 4.4, 3]} />
          <MumChicken position={[9.3 - p * 0.4, GATE.roofTopY + hop(t, 0.6, 0.15, 0.25), -2.15]} rotationY={-0.4} walk={t * 2.2} flap={0.65} lookAt={[8.6, 5.8, -2.0]} />
        </>
      ),
    },
    {
      cue: "2.under",
      ...cam.push({ on: [-9.2, 1.8, -1.85], dist: 5.0, to: 3.6, yaw: 24, pitch: 28, fov: 44 }),
      handheld: 0.015,
      look: "overworld-night",
      zone: "village",
      note: "Climbing oak branch: Hero scrambles higher up the branch while MumChicken sprints underneath and cranes straight up.",
      stage: (t, { p }) => {
        const climb = ease(ramp(p, 0, 0.5));
        const runUnder = ease(ramp(t, 0, Math.max(0.4, underLook)));
        return (
          <>
            <Hero
              position={[-9.2, 2.55 + climb * 0.65, -1.9]}
              rotationY={SOUTH}
              walk={climb < 0.95 ? t * 2.6 : 0}
              mood="calm"
              tilt={0.12}
              armPitch={climb < 0.95 ? [-2.2, -1.2] : [-0.4, -0.4]}
              lookAt={[-9.2, 0.4, -1.75]}
            />
            <MumChicken
              position={[-10.8 + runUnder * 1.6, PATH_TOP, -1.75]}
              rotationY={runUnder < 0.95 ? Math.PI / 2 : 0}
              walk={runUnder < 0.95 ? t * 2.8 : 0}
              flap={runUnder < 0.95 ? 0.55 : 0}
              lookAt={[-9.2, 3.6, -1.9]}
            />
          </>
        );
      },
    },
    {
      cue: "2.asked",
      ...cam.orbit({ on: [8.85, 6.0, -5.0], dist: 2.35, distTo: 1.75, yaw: 26, yawTo: -10, pitch: 12, fov: 36 }),
      handheld: 0.014,
      look: "overworld-night",
      zone: "village",
      note: "Close two-shot in the straw nest: Hero leans in gesturing earnestly as MumChicken hops slightly and tilts her head.",
      stage: (t) => (
        <>
          <Hero position={[9.18, GATE.roofTopY + 0.12, -4.95]} rotationY={-1.1} mood="sad" lean={0.2 + Math.sin(t * 4) * 0.06} armPitch={[-1.3, -0.7]} lookAt={[8.55, 5.9, -5.0]} />
          <MumChicken position={[8.55, GATE.roofTopY + 0.12 + hop(t, 0.5, 0.12, 0.25), -5.05]} rotationY={1.1} crouch={0.35} headYaw={Math.sin(t * 3) * 0.2} lookAt={[9.18, 6.1, -4.95]} />
          <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} />
        </>
      ),
    },
    {
      cue: "2.egg",
      ...cam.orbit({ on: [8.7, 5.85, -5.15], dist: 2.1, distTo: 1.55, yaw: -26, yawTo: 16, pitch: 16, fov: 36 }),
      handheld: 0.012,
      look: "overworld-night",
      zone: "village",
      note: "MumChicken steps near the straw, dips her beak to the white egg, then snaps her gaze back up at Hero.",
      stage: (t) => {
        const lookBack = t > eggLook + 1.0;
        const step = ease(ramp(t, 0.1, 0.6));
        return (
          <>
            <Hero position={[9.18, GATE.roofTopY + 0.12, -4.95]} rotationY={-1.1} mood="calm" nod={lookBack ? -0.1 : 0.15} lookAt={[8.75, 5.6, -5.32]} />
            <MumChicken
              position={[8.4 + step * 0.16, GATE.roofTopY + 0.12, -5.05]}
              rotationY={1.1}
              walk={step < 0.95 ? t * 2.0 : 0}
              crouch={0.38}
              peck={lookBack ? 0 : Math.sin(t * 6) * 0.25}
              lookAt={lookBack ? [9.18, 6.1, -4.95] : [8.75, 5.6, -5.32]}
            />
            <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} wobble={0.35} />
          </>
        );
      },
    },
    {
      cue: "2.quiet",
      ...cam.push({ on: [8.85, 5.95, -5.05], dist: 1.9, to: 2.9, yaw: 14, pitch: 12, fov: 38 }),
      handheld: 0.012,
      look: "overworld-night",
      zone: "village",
      note: "Slow emotional pull-back as Hero walks back two steps looking down and MumChicken settles quietly beside the egg.",
      stage: (t, { p }) => (
        <>
          <Hero position={[9.15 + p * 0.35, GATE.roofTopY + 0.12, -4.95 + p * 0.25]} rotationY={SOUTH} walk={t * 1.2} mood="sad" lean={0.18} />
          <MumChicken position={[8.55, GATE.roofTopY + 0.12, -5.05]} rotationY={0.4} crouch={0.4 + p * 0.3} />
          <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} />
        </>
      ),
    },
  ],
});
