import { Block, cam, storyScene } from "../../engine";
import { Bits, CLIFF, CliffBridge, Hero, MumChicken, Puffs, ZombieKid, ZombieMum, ease, hop, ramp, timing, wordAt } from "./kit";

const snapAt = wordAt("4.crack", "snapped");
const jumpAt = wordAt("4.heavy", "jump");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Broken Before Sunrise",
  shots: [
    {
      cue: "4.trip",
      ...cam.truck({ on: [-7.0, 5.1, 95], by: [2.6, 0, 0], dist: 4.1, yaw: 20, pitch: 10, fov: 42 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "cliff",
      note: "Mountain road march: the whole zombie class hikes steadily uphill behind the mums with Hero bouncing on MumChicken.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <CliffBridge />
            <ZombieMum position={[-5.4 + k * 2.4, CLIFF.ledgeY, 94.7]} rotationY={Math.PI / 2} walk={t * 2.0} shirt="#2d7a78" hat="bow" mood="happy" />
            <ZombieMum position={[-5.7 + k * 2.4, CLIFF.ledgeY, 95.5]} rotationY={Math.PI / 2} walk={t * 2.0} shirt="#486a94" hat="straw" mood="happy" />
            <ZombieKid position={[-6.7 + k * 2.4, CLIFF.ledgeY, 94.6]} rotationY={Math.PI / 2} walk={t * 2.3} shirt="#3a7d8c" mood="happy" />
            <ZombieKid position={[-7.2 + k * 2.4, CLIFF.ledgeY, 95.4]} rotationY={Math.PI / 2} walk={t * 2.3} shirt="#548256" mood="happy" />
            <MumChicken position={[-7.9 + k * 2.4, CLIFF.ledgeY, 95.0]} rotationY={Math.PI / 2} walk={t * 2.5}>
              <Hero position={[0, 0, 0]} mood="happy" wave={0.5} />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "4.forest",
      ...cam.orbit({ on: [-4.2, 5.1, 93.8], dist: 3.4, distTo: 2.6, yaw: 24, yawTo: -12, pitch: 8, fov: 40 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "cliff",
      note: "Pine woods wander: kids meander past the lantern-lit pines looking around playfully while time slips away.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <CliffBridge />
            <ZombieMum position={[-3.0 + k * 1.4, CLIFF.ledgeY, 94.2]} rotationY={Math.PI / 2} walk={t * 1.4} shirt="#2d7a78" hat="bow" mood="calm" />
            <MumChicken position={[-4.5 + k * 1.6, CLIFF.ledgeY, 93.6]} rotationY={0.7} walk={t * 1.8} peck={Math.sin(t * 5) * 0.2}>
              <Hero position={[0, 0, 0]} mood="happy" turn={Math.sin(t * 2.5) * 0.35} />
            </MumChicken>
            <ZombieKid position={[-3.7 + k * 1.7, CLIFF.ledgeY, 94.8]} rotationY={Math.PI / 2} walk={t * 1.8} shirt="#3a7d8c" mood="happy" />
          </>
        );
      },
    },
    {
      cue: "4.orange",
      ...cam.pan({ from: [-5.4, 6.2, 99.1], on: [-3.5, 5.6, 95], onTo: [5.5, 6.4, 92], fov: 42 }),
      handheld: 0.018,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Atmosphere shift to orange dawn: everybody whips their heads east as the horizon catches golden fire.",
      stage: (t) => {
        const whip = ease(ramp(t, 0.1, 0.45));
        return (
          <>
            <CliffBridge />
            <ZombieMum position={[-2.2, CLIFF.ledgeY, 95]} rotationY={0.4 + whip * 1.1} shirt="#2d7a78" hat="bow" mood="scared" lean={-0.1 * whip} />
            <MumChicken position={[-3.6, CLIFF.ledgeY, 95]} rotationY={0.4 + whip * 1.1} flap={whip * 0.5}>
              <Hero position={[0, 0, 0]} mood="scared" armPitch={whip > 0.5 ? [-1.5, -0.4] : [-0.2, -0.2]} />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "4.burn",
      ...cam.orbit({ on: [-2.8, 5.1, 95], dist: 3.1, distTo: 2.35, yaw: -22, yawTo: 18, pitch: 8, fov: 38 }),
      handheld: 0.022,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Panic beat: zombie mums and kids recoil backward shielding their eyes from the rising sun as heat smoke rises.",
      stage: (t) => (
        <>
          <CliffBridge />
          <ZombieMum position={[-2.1 - hop(t, 0.3, 0.15, 0.4), CLIFF.ledgeY + hop(t, 0.3, 0.18, 0.35), 94.8]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.4, -2.4]} lean={-0.15} />
          <ZombieKid position={[-2.7, CLIFF.ledgeY + hop(t, 0.45, 0.2, 0.35), 95.6]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" armPitch={[-2.4, -2.4]} />
          <MumChicken position={[-3.3, CLIFF.ledgeY, 95.1]} rotationY={Math.PI / 2} flap={0.65}>
            <Hero position={[0, 0, 0]} mood="scared" armPitch={[-2.3, -2.3]} />
          </MumChicken>
          <Puffs position={[-2.1, CLIFF.ledgeY + 1.8, 94.8]} color="#ffcf88" count={6} rise={0.7} spread={0.4} size={0.07} speed={1.5} opacity={0.65} />
        </>
      ),
    },
    {
      cue: "4.bridge",
      ...cam.truck({ on: [-2.8, 5.1, 95], by: [2.6, 0, 0], dist: 4.1, yaw: 18, pitch: 10, fov: 42 }),
      handheld: 0.024,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Full-speed sprint: the entire class races onto the wooden bridge deck chasing the mums toward safety.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <CliffBridge />
            <ZombieMum position={[-1.4 + k * 2.5, CLIFF.ledgeY, 94.8]} rotationY={Math.PI / 2} walk={t * 3.4} lean={0.22} shirt="#2d7a78" hat="bow" mood="scared" />
            <ZombieKid position={[-2.3 + k * 2.5, CLIFF.ledgeY, 94.5]} rotationY={Math.PI / 2} walk={t * 3.6} lean={0.22} shirt="#3a7d8c" mood="scared" />
            <ZombieKid position={[-2.7 + k * 2.5, CLIFF.ledgeY, 95.5]} rotationY={Math.PI / 2} walk={t * 3.6} lean={0.22} shirt="#548256" mood="scared" />
            <MumChicken position={[-3.5 + k * 2.5, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} walk={t * 3.8} flap={0.7}>
              <Hero position={[0, 0, 0]} mood="scared" lean={0.2} />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "4.crack",
      ...cam.orbit({ on: [1.2, 4.7, 95], dist: 3.4, distTo: 2.8, yaw: 28, yawTo: -10, pitch: 14, fov: 42 }),
      handheld: 0.028,
      impacts: [{ at: snapAt, amp: 0.095, dur: 0.45 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Disaster: the bridge planks snap downward into the ravine with flying wood bits while kids scramble backward.",
      stage: (t) => {
        const broken = t >= snapAt;
        const dropT = broken ? Math.min(1.6, t - snapAt) : 0;
        const recoil = broken ? ease(ramp(t, snapAt, snapAt + 0.35)) : 0;
        return (
          <>
            <CliffBridge broken={broken} dropT={dropT} />
            <ZombieMum position={[-1.6 - recoil * 0.4, CLIFF.ledgeY + hop(t, snapAt, 0.22, 0.35), 94.6]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.6, -2.6]} />
            <ZombieKid position={[-1.9 - recoil * 0.5, CLIFF.ledgeY + hop(t, snapAt + 0.05, 0.25, 0.35), 95.5]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" armPitch={[-2.5, -2.5]} />
            <MumChicken position={[-2.6 - recoil * 0.3, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2} flap={broken ? 0.9 : 0.2}>
              <Hero position={[0, 0, 0]} mood="scared" />
            </MumChicken>
            <Bits position={[1.6, 4.4, 95]} t={t - snapAt} color="#8a5e39" count={18} power={4.5} />
            {broken && <Puffs position={[1.6, 4.5, 95]} color="#d8c3a5" count={8} spread={0.7} size={0.11} speed={1.8} opacity={0.75} />}
          </>
        );
      },
    },
    {
      cue: "4.heavy",
      ...cam.push({ on: [-0.8, 5.1, 95], dist: 3.4, to: 2.5, yaw: 24, pitch: 8, fov: 40 }),
      handheld: 0.024,
      impacts: [{ at: jumpAt + 0.3, amp: 0.085, dur: 0.35 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Big zombie mum charges the gap, leaps forward, and skids back onto the stone rim in a cloud of dust.",
      stage: (t) => {
        const lunge = Math.sin(ramp(t, jumpAt, jumpAt + 0.65) * Math.PI);
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum
              position={[-1.7 + lunge * 0.9, CLIFF.ledgeY + lunge * 0.52, 95]}
              rotationY={Math.PI / 2}
              walk={t * 2.5}
              shirt="#2d7a78"
              hat="bow"
              mood="scared"
              lean={0.3 - lunge * 0.45}
              armPitch={[-2.6, -2.6]}
            />
            <ZombieKid position={[-2.9, CLIFF.ledgeY + hop(t, jumpAt + 0.2, 0.2, 0.3), 95.6]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" />
            <Bits position={[-1.0, 4.6, 95]} t={t - (jumpAt + 0.3)} color="#7a828f" count={10} power={2.5} />
          </>
        );
      },
    },
    {
      cue: "4.wings",
      ...cam.orbit({ on: [-2.2, 5.2, 95], dist: 3.9, distTo: 2.9, yaw: 26, yawTo: -18, pitch: 12, fov: 42 }),
      handheld: 0.02,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Desperate tick: a golden beam sweeps onto the pine cliff as panicked kids wave arms and huddle back.",
      stage: (t, { p }) => {
        const sunX = 3.2 - ease(p) * 3.8;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <Block position={[sunX, 4.6, 95]} size={[3.4, 0.04, 5.2]} color="#ffe28a" />
            <ZombieMum position={[-2.0, CLIFF.ledgeY + hop(t, 0.4, 0.14, 0.3), 94.5]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.4, -1.8]} />
            <ZombieKid position={[-2.6, CLIFF.ledgeY + hop(t, 0.7, 0.18, 0.3), 95.6]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="scared" armPitch={[-2.6, -2.6]} />
            <ZombieKid position={[-3.1, CLIFF.ledgeY + hop(t, 1.0, 0.18, 0.3), 94.4]} rotationY={Math.PI / 2} shirt="#548256" mood="scared" armPitch={[-2.6, -2.6]} />
            <MumChicken position={[-3.3, CLIFF.ledgeY, 95.1]} rotationY={Math.PI / 2} flap={0.45}>
              <Hero position={[0, 0, 0]} mood="scared" tilt={Math.sin(t * 10) * 0.1} />
            </MumChicken>
          </>
        );
      },
    },
  ],
});
