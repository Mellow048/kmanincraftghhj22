import { Block, cam, storyScene } from "../../engine";
import { Bits, CLIFF, CliffBridge, Hero, MumChicken, ZombieKid, ZombieMum, jolt, ramp, timing, wordAt } from "./kit";

const crackAt = wordAt("4.crack", "snapped");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Sunrise on the Cliff Bridge",
  shots: [
    {
      cue: "4.trip",
      ...cam.push({ on: [-4.0, 5.2, 95], dist: 7.5, to: 5.8, yaw: 24, pitch: 22, fov: 44 }),
      look: "overworld-night",
      zone: "cliff",
      note: "Environment wide shot: class of zombie kids and big mums walking along the high cliff trail under night lanterns.",
      stage: (t) => (
        <>
          <CliffBridge />
          <ZombieMum position={[-2.4, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} walk={t * 1.0} shirt="#2d7a78" hat="bow" />
          <ZombieKid position={[-3.4, CLIFF.ledgeY, 94.7]} rotationY={Math.PI / 2} walk={t * 1.1} shirt="#3a7d8c" />
          <ZombieKid position={[-4.2, CLIFF.ledgeY, 95.3]} rotationY={Math.PI / 2} walk={t * 1.1} shirt="#548256" />
          <MumChicken position={[-5.4, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} walk={t * 1.3}>
            <Hero position={[0, 0, 0]} mood="calm" />
          </MumChicken>
        </>
      ),
    },
    {
      cue: "4.forest",
      ...cam.truck({ on: [-5.4, 5.1, 95], by: [1.6, 0, 0], dist: 3.1, yaw: 16, pitch: 10, fov: 38 }),
      look: "overworld-night",
      zone: "cliff",
      note: "Travelling shot beside Hero on his chicken mum beneath the dark pine silhouettes.",
      stage: (t, { p }) => (
        <>
          <CliffBridge />
          <MumChicken position={[-5.4 + p * 1.6, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} walk={t * 1.4}>
            <Hero position={[0, 0, 0]} mood="calm" />
          </MumChicken>
          <ZombieKid position={[-3.7 + p * 1.4, CLIFF.ledgeY, 94.8]} rotationY={Math.PI / 2} walk={t * 1.2} shirt="#3a7d8c" />
        </>
      ),
    },
    {
      cue: "4.orange",
      ...cam.pan({ from: [-5.4, 6.2, 99.1], on: [-3.5, 5.6, 95], onTo: [5.5, 6.2, 92], fov: 42 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Atmosphere shift to orange dawn: pan from the alarmed group onto the rising amber glow behind the hills.",
      stage: () => (
        <>
          <CliffBridge />
          <ZombieMum position={[-2.2, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" />
          <MumChicken position={[-3.6, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2}>
            <Hero position={[0, 0, 0]} mood="scared" />
          </MumChicken>
        </>
      ),
    },
    {
      cue: "4.burn",
      ...cam.push({ on: [-3.6, 5.2, 95], dist: 1.9, to: 1.45, yaw: 34, pitch: -4, fov: 36 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Tight close-up on Hero's scared face lit orange as he reminds us zombies burn in the sun.",
      stage: () => (
        <>
          <CliffBridge />
          <MumChicken position={[-3.6, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2}>
            <Hero position={[0, 0, 0]} mood="scared" />
          </MumChicken>
        </>
      ),
    },
    {
      cue: "4.bridge",
      ...cam.push({ on: [0.5, 5.2, 95], dist: 6.4, to: 5.0, yaw: 28, pitch: 20, fov: 42 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "High wide shot of the whole class running toward the narrow wooden bridge over the canyon.",
      stage: (t, { p }) => (
        <>
          <CliffBridge />
          <ZombieMum position={[-1.4 + p * 1.4, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} walk={t * 2.4} shirt="#2d7a78" hat="bow" mood="scared" />
          <ZombieKid position={[-2.2 + p * 1.3, CLIFF.ledgeY, 94.7]} rotationY={Math.PI / 2} walk={t * 2.5} shirt="#3a7d8c" mood="scared" />
          <ZombieKid position={[-2.8 + p * 1.2, CLIFF.ledgeY, 95.3]} rotationY={Math.PI / 2} walk={t * 2.5} shirt="#548256" mood="scared" />
          <MumChicken position={[-3.6 + p * 1.4, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} walk={t * 2.8} flap={0.3}>
            <Hero position={[0, 0, 0]} mood="scared" />
          </MumChicken>
        </>
      ),
    },
    {
      cue: "4.crack",
      ...cam.push({ on: [1.6, 4.1, 95], dist: 4.5, to: 3.7, yaw: 12, pitch: -10, fov: 40 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Odd low angle under the bridge planks: halfway across, the timbers snap and fall into the ravine.",
      stage: (t) => {
        const broken = t >= crackAt;
        const dropT = broken ? Math.min(1.5, t - crackAt) : 0;
        return (
          <>
            <CliffBridge broken={broken} dropT={dropT} />
            <ZombieMum position={[-0.9, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" />
            <ZombieKid position={[-1.7, CLIFF.ledgeY, 94.8]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" />
            {broken && <Bits position={[1.6, 4.3, 95]} t={t - crackAt} color="#7c5432" count={18} power={4.2} />}
          </>
        );
      },
    },
    {
      cue: "4.heavy",
      ...cam.orbit({ on: [-1.4, 5.2, 95], dist: 3.2, distTo: 2.7, yaw: 42, yawTo: 22, pitch: 8, fov: 38 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Medium edge shot: a tall zombie mum tries to jump the gap, slips back onto the ledge, and stones tumble.",
      stage: (t) => {
        const jump = Math.max(0, Math.sin(ramp(t, 0.3, 1.15) * Math.PI));
        const slip = jolt(t, 1.15, 0.25);
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum
              position={[-1.5 + jump * 0.45, CLIFF.ledgeY + jump * 0.45, 95]}
              rotationY={Math.PI / 2}
              shirt="#2d7a78"
              hat="bow"
              mood="scared"
              lean={slip}
              armPitch={[-2.2, -2.2]}
            />
            <ZombieKid position={[-2.4, CLIFF.ledgeY, 94.7]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" />
            <MumChicken position={[-3.0, CLIFF.ledgeY, 95.1]} rotationY={Math.PI / 2}>
              <Hero position={[0, 0, 0]} mood="scared" />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "4.wings",
      ...cam.push({ on: [-2.6, 5.5, 95], dist: 5.4, to: 4.1, yaw: -32, pitch: 24, fov: 42 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "High shot from the shade side as golden morning sunbeams creep across the pines toward the trapped class.",
      stage: (t) => (
        <>
          <CliffBridge broken dropT={1.5} />
          <Block position={[6.5 - t * 0.4, 4.58, 95]} size={[1.4, 0.03, 4.0]} color="#ffd57a" />
          <ZombieMum position={[-2.0, CLIFF.ledgeY, 94.6]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" />
          <ZombieMum position={[-2.6, CLIFF.ledgeY, 95.5]} rotationY={Math.PI / 2} shirt="#486a94" hat="straw" mood="scared" />
          <ZombieKid position={[-1.8, CLIFF.ledgeY, 95.2]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" />
          <MumChicken position={[-3.1, CLIFF.ledgeY, 95.0]} rotationY={Math.PI / 2}>
            <Hero position={[0, 0, 0]} mood="scared" />
          </MumChicken>
        </>
      ),
    },
  ],
});
