import { Block, cam, storyScene } from "../../engine";
import { Bubble, GATE, Hero, MumChicken, NORTH, PATH_TOP, SCHOOL, SOUTH, SoundRings, WhiteEgg, Zombie, ZombieKid, ZombieMum, ease, pop, ramp, timing, wordAt } from "./kit";

const winPop = wordAt("2.school", "window");
const cluckAt = wordAt("2.cluck", "clucked");
const ateAt = wordAt("2.homework", "ate");
const underLook = wordAt("2.under", "under");
const eggLook = wordAt("2.egg", "egg");

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "School & The Rooftop Nest",
  shots: [
    {
      cue: "2.school",
      ...cam.push({ on: [-0.9, 1.2, 42.5], dist: 3.4, to: 2.7, yaw: 16, pitch: 8, fov: 40 }),
      look: "lantern-night",
      zone: "school",
      note: "Classroom interior: Hero sits by his desk, looks back toward the north window as mum hops onto the sill.",
      stage: (t) => (
        <>
          <Hero position={[-0.9, 0, 44.65]} rotationY={NORTH} mood={t > winPop ? "sad" : "calm"} lookAt={SCHOOL.windowSill} />
          <ZombieKid position={[-2.4, 0, 44.65]} rotationY={NORTH} shirt="#3a7d8c" lookAt={SCHOOL.windowSill} />
          <Block position={[-0.9, 0.67, 44.2]} size={[0.26, 0.015, 0.32]} color="#f5f1e6" />
          {t >= winPop - 0.2 && (
            <MumChicken
              position={[-0.9, 1.09, 41.45]}
              rotationY={0}
              scale={1.08 * pop(t, winPop - 0.2, 0.2)}
              flap={t < winPop + 0.4 ? 0.6 : 0}
              lookAt={[-0.9, 0.8, 44.5]}
            />
          )}
        </>
      ),
    },
    {
      cue: "2.cluck",
      ...cam.orbit({ on: [-0.3, 1.45, 41.8], dist: 2.9, distTo: 2.6, yaw: 34, yawTo: 20, pitch: -4, fov: 38 }),
      look: "lantern-night",
      zone: "school",
      note: "Over-the-shoulder past the tall zombie teacher staring down at the clucking chicken on the sill.",
      stage: (t) => (
        <>
          <Zombie position={[1.1, 0, 43.1]} rotationY={-2.5} shirt="#574a7a" mood="angry" lookAt={SCHOOL.windowSill} />
          <MumChicken position={[-0.9, 1.09, 41.45]} rotationY={0.4} peck={Math.sin(t * 14) * 0.4} lookAt={[1.1, 1.6, 43.1]} />
          {t >= cluckAt - 0.1 && (
            <>
              <SoundRings position={[-0.8, 1.55, 41.65]} t={(t - cluckAt + 0.1) * 1.4} color="#ffd98a" reach={0.8} />
              <Bubble dark text="CLUCK!" position={[-0.9, 2.05, 41.45]} rotationY={0.4} scale={0.45 * pop(t, cluckAt - 0.1)} />
            </>
          )}
        </>
      ),
    },
    {
      cue: "2.homework",
      ...cam.top({ on: [-0.9, 0.7, 44.3], height: 3.1, to: 2.35, spin: [0, 8], fov: 40 }),
      look: "lantern-night",
      zone: "school",
      note: "Top-down odd angle onto the wooden desk: mum hops up and gobbles the white homework sheet.",
      stage: (t) => {
        const paperScale = t < ateAt ? 1 : Math.max(0, 1 - ease(ramp(t, ateAt, ateAt + 0.25)));
        return (
          <>
            <Hero position={[-0.9, 0, 44.75]} rotationY={NORTH} mood="sad" armPitch={[-1.4, -1.4]} />
            <MumChicken position={[-0.9, 0.66, 44.15]} rotationY={0} peck={Math.max(0, Math.sin(t * 15)) * 0.8} />
            {paperScale > 0.02 && <Block position={[-0.9, 0.675, 44.28]} size={[0.26 * paperScale, 0.015, 0.32 * paperScale]} color="#f5f1e6" />}
          </>
        );
      },
    },
    {
      cue: "2.sleep",
      ...cam.push({ on: [-0.9, 0.9, 44.85], dist: 2.5, to: 2.05, yaw: -28, pitch: 14, fov: 40 }),
      look: "lantern-night",
      zone: "school",
      note: "Parents' night: tall zombie mums stand around while mum snoozes curled up on his wooden chair.",
      stage: () => (
        <>
          <ZombieMum position={[0.4, 0, 44.8]} rotationY={-1.1} shirt="#2d7a78" hat="bow" mood="calm" />
          <ZombieMum position={[-2.1, 0, 44.7]} rotationY={1.0} shirt="#486a94" hat="straw" mood="calm" />
          <Hero position={[-1.4, 0, 44.95]} rotationY={0.8} mood="sad" />
          <MumChicken position={[-0.9, 0.47, 44.85]} rotationY={0.2} crouch={0.75} asleep />
        </>
      ),
    },
    {
      cue: "2.roof",
      ...cam.push({ on: [8.8, 5.8, -5.0], dist: 7.4, to: 5.5, yaw: -28, pitch: 26, fov: 44 }),
      look: "overworld-night",
      zone: "village",
      note: "Environment shot: high aerial push revealing their straw nest perched on top of the tallest roof in town.",
      stage: () => (
        <>
          <MumChicken position={[GATE.nest[0] - 0.2, GATE.roofTopY + 0.12, GATE.nest[2]]} rotationY={-0.3} crouch={0.5} />
          <Hero position={[GATE.nest[0] + 0.35, GATE.roofTopY + 0.12, GATE.nest[2] + 0.1]} rotationY={-0.5} mood="calm" />
          <WhiteEgg position={[GATE.nest[0], GATE.roofTopY + 0.13, GATE.nest[2] - 0.22]} />
        </>
      ),
    },
    {
      cue: "2.view",
      ...cam.truck({ on: [8.6, 5.9, -2.3], by: [0.6, 0, 0], dist: 2.5, yaw: 20, pitch: 4, fov: 38 }),
      look: "overworld-night",
      zone: "village",
      note: "Hero leans near the high roof edge thinking she just likes the view; mum paces closely beside him.",
      stage: (t, { p }) => (
        <>
          <Hero position={[8.6, GATE.roofTopY, -2.0]} rotationY={SOUTH} mood="calm" turn={Math.sin(t * 2.2) * 0.25} lookAt={[8.6, 5.2, 2]} />
          <MumChicken position={[9.25 - p * 0.2, GATE.roofTopY, -2.15]} rotationY={-0.4} walk={t * 0.9} lookAt={[8.6, 5.8, -2.0]} />
        </>
      ),
    },
    {
      cue: "2.under",
      ...cam.push({ on: [-9.2, 1.8, -1.85], dist: 4.8, to: 3.9, yaw: 24, pitch: 28, fov: 44 }),
      look: "overworld-night",
      zone: "village",
      note: "Odd high angle down past the oak branch: Hero climbs high and spots his chicken mum staring straight up from directly underneath.",
      stage: (t) => (
        <>
          <Hero position={[-9.2, 3.15, -1.9]} rotationY={SOUTH} mood="calm" tilt={0.1} lookAt={[-9.2, 0.4, -1.75]} />
          <MumChicken
            position={[-9.2, PATH_TOP, -1.75]}
            rotationY={0}
            walk={t < underLook ? t * 0.8 : 0}
            lookAt={[-9.2, 3.6, -1.9]}
          />
        </>
      ),
    },
    {
      cue: "2.asked",
      ...cam.push({ on: [8.85, 6.0, -5.0], dist: 2.1, to: 1.7, yaw: 22, pitch: 12, fov: 36 }),
      look: "overworld-night",
      zone: "village",
      note: "Close two-shot in the straw nest: Hero leans down and asks her where he came from.",
      stage: () => (
        <>
          <Hero position={[9.15, GATE.roofTopY + 0.12, -4.95]} rotationY={-1.1} mood="sad" lean={0.18} lookAt={[8.6, 5.9, -5.0]} />
          <MumChicken position={[8.55, GATE.roofTopY + 0.12, -5.05]} rotationY={1.1} crouch={0.4} lookAt={[9.15, 6.1, -4.95]} />
          <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} />
        </>
      ),
    },
    {
      cue: "2.egg",
      ...cam.orbit({ on: [8.7, 5.85, -5.15], dist: 1.85, distTo: 1.55, yaw: -22, yawTo: 8, pitch: 16, fov: 36 }),
      look: "overworld-night",
      zone: "village",
      note: "Mum turns her beak toward the round white egg in the straw, then back up at him.",
      stage: (t) => {
        const lookBack = t > eggLook + 1.1;
        return (
          <>
            <Hero position={[9.15, GATE.roofTopY + 0.12, -4.95]} rotationY={-1.1} mood="calm" lookAt={[8.75, 5.6, -5.32]} />
            <MumChicken
              position={[8.55, GATE.roofTopY + 0.12, -5.05]}
              rotationY={1.1}
              crouch={0.4}
              lookAt={lookBack ? [9.15, 6.1, -4.95] : [8.75, 5.6, -5.32]}
            />
            <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} />
          </>
        );
      },
    },
    {
      cue: "2.quiet",
      ...cam.push({ on: [8.85, 5.95, -5.05], dist: 2.0, to: 2.6, yaw: 12, pitch: 10, fov: 38 }),
      look: "overworld-night",
      zone: "village",
      note: "Slow pull-back from the quiet rooftop nest under the night sky.",
      stage: () => (
        <>
          <Hero position={[9.15, GATE.roofTopY + 0.12, -4.95]} rotationY={SOUTH} mood="sad" />
          <MumChicken position={[8.55, GATE.roofTopY + 0.12, -5.05]} rotationY={0.4} crouch={0.5} />
          <WhiteEgg position={[8.75, GATE.roofTopY + 0.13, -5.32]} />
        </>
      ),
    },
  ],
});
