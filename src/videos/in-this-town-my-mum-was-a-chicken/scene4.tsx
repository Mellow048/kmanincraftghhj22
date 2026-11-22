import { cam, storyScene } from "../../engine";
import { Bits, CLIFF, CliffBridge, Hero, MumChicken, Puffs, ZombieKid, ZombieMum, ease, hop, ramp, timing, wordAt } from "./kit";

const snapAt = wordAt("4.crack", "snapped");
const jumpAt = wordAt("4.heavy", "jump");

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Broken Before Sunrise",
  shots: [
    {
      cue: "4.trip",
      ...cam.truck({ on: [-5.6, 5.2, 95], by: [2.4, 0, 0], dist: 4.5, yaw: 18, pitch: 10, fov: 44 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "cliff",
      note: "Mountain hike: tight group marches uphill 1:1 with the tracking camera so every character stays centered.",
      stage: (t, { p }) => (
        <>
          <CliffBridge />
          <ZombieMum position={[-4.9 + p * 2.4, CLIFF.ledgeY, 94.7]} rotationY={Math.PI / 2 - 0.25} walk={p * 2.4} shirt="#2d7a78" hat="bow" mood="happy" />
          <ZombieKid position={[-5.4 + p * 2.4, CLIFF.ledgeY, 95.3]} rotationY={Math.PI / 2 - 0.25} walk={p * 2.6} shirt="#3a7d8c" mood="happy" />
          <ZombieKid position={[-5.9 + p * 2.4, CLIFF.ledgeY, 94.6]} rotationY={Math.PI / 2 - 0.25} walk={p * 2.6} shirt="#548256" mood="happy" />
          <MumChicken position={[-6.4 + p * 2.4, CLIFF.ledgeY, 95.0]} rotationY={Math.PI / 2 - 0.25} walk={p * 2.8} flap={0.35}>
            <Hero position={[0, 0, 0]} mood="happy" wave={0.5} />
          </MumChicken>
        </>
      ),
    },
    {
      cue: "4.forest",
      ...cam.orbit({ on: [-4.0, 5.2, 94.8], onTo: [-2.8, 5.2, 94.8], dist: 3.8, distTo: 3.1, yaw: 18, yawTo: -10, pitch: 8, fov: 42 }),
      handheld: 0.016,
      look: "overworld-night",
      zone: "cliff",
      note: "Unobstructed pine trail: class strolls beneath tall pines as Hero looks playfully around on MumChicken.",
      stage: (t, { p }) => (
        <>
          <CliffBridge />
          <ZombieMum position={[-3.3 + p * 1.2, CLIFF.ledgeY, 94.4]} rotationY={Math.PI / 2 - 0.3} walk={p * 1.6} shirt="#2d7a78" hat="bow" mood="calm" />
          <MumChicken position={[-4.2 + p * 1.3, CLIFF.ledgeY, 94.9]} rotationY={0.9} walk={p * 2.0} peck={Math.sin(t * 5) * 0.2}>
            <Hero position={[0, 0, 0]} mood="happy" turn={Math.sin(t * 2.5) * 0.35} />
          </MumChicken>
          <ZombieKid position={[-3.6 + p * 1.3, CLIFF.ledgeY, 95.4]} rotationY={Math.PI / 2 - 0.3} walk={p * 2.0} shirt="#3a7d8c" mood="happy" />
        </>
      ),
    },
    {
      cue: "4.orange",
      ...cam.pan({ from: [-4.2, 6.2, 98.8], on: [-2.6, 5.5, 95], onTo: [4.5, 6.3, 93], fov: 44 }),
      handheld: 0.018,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Dawn whip pan: everybody whips around as golden orange light floods the eastern pines.",
      stage: (t) => {
        const whip = ease(ramp(t, 0.1, 0.45));
        return (
          <>
            <CliffBridge />
            <ZombieMum position={[-2.1, CLIFF.ledgeY, 94.8]} rotationY={0.4 + whip * 0.9} shirt="#2d7a78" hat="bow" mood="scared" lean={-0.1 * whip} />
            <MumChicken position={[-3.0, CLIFF.ledgeY, 95.1]} rotationY={0.4 + whip * 0.9} flap={whip * 0.5}>
              <Hero position={[0, 0, 0]} mood="scared" armPitch={whip > 0.5 ? [-1.5, -0.4] : [-0.2, -0.2]} />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "4.burn",
      ...cam.orbit({ on: [-2.5, 5.15, 95], dist: 3.6, distTo: 2.8, yaw: -16, yawTo: 14, pitch: 10, fov: 42 }),
      handheld: 0.022,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Panic beat: zombie mums and kids recoil clutching eyes in the orange sun while heat smoke rises.",
      stage: (t) => (
        <>
          <CliffBridge />
          <ZombieMum position={[-2.0 - hop(t, 0.3, 0.15, 0.4), CLIFF.ledgeY + hop(t, 0.3, 0.18, 0.35), 94.7]} rotationY={Math.PI / 2 - 0.35} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.4, -2.4]} lean={-0.15} />
          <ZombieKid position={[-2.5, CLIFF.ledgeY + hop(t, 0.45, 0.2, 0.35), 95.4]} rotationY={Math.PI / 2 - 0.35} shirt="#3a7d8c" mood="scared" armPitch={[-2.4, -2.4]} />
          <MumChicken position={[-3.0, CLIFF.ledgeY, 95.0]} rotationY={Math.PI / 2 - 0.35} flap={0.65}>
            <Hero position={[0, 0, 0]} mood="scared" armPitch={[-2.3, -2.3]} />
          </MumChicken>
          <Puffs position={[-2.0, CLIFF.ledgeY + 1.8, 94.7]} color="#ffcf88" count={6} rise={0.7} spread={0.4} size={0.07} speed={1.5} opacity={0.65} />
        </>
      ),
    },
    {
      cue: "4.bridge",
      ...cam.truck({ on: [-1.8, 5.15, 95], by: [2.6, 0, 0], dist: 4.4, yaw: 16, pitch: 10, fov: 44 }),
      handheld: 0.024,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Full-speed tracked bridge sprint: camera tracks 1:1 beside the class racing onto the wooden planks.",
      stage: (t, { p }) => (
        <>
          <CliffBridge />
          <ZombieMum position={[-1.0 + p * 2.6, CLIFF.ledgeY, 94.7]} rotationY={Math.PI / 2 - 0.25} walk={p * 3.4} lean={0.22} shirt="#2d7a78" hat="bow" mood="scared" />
          <ZombieKid position={[-1.6 + p * 2.6, CLIFF.ledgeY, 94.5]} rotationY={Math.PI / 2 - 0.25} walk={p * 3.6} lean={0.22} shirt="#3a7d8c" mood="scared" />
          <ZombieKid position={[-1.9 + p * 2.6, CLIFF.ledgeY, 95.4]} rotationY={Math.PI / 2 - 0.25} walk={p * 3.6} lean={0.22} shirt="#548256" mood="scared" />
          <MumChicken position={[-2.4 + p * 2.6, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2 - 0.25} walk={p * 3.8} flap={0.7}>
            <Hero position={[0, 0, 0]} mood="scared" lean={0.2} />
          </MumChicken>
        </>
      ),
    },
    {
      cue: "4.crack",
      ...cam.orbit({ on: [-0.35, 5.1, 95], dist: 4.8, distTo: 4.0, yaw: 20, yawTo: -10, pitch: 14, fov: 44 }),
      handheld: 0.028,
      impacts: [{ at: snapAt, amp: 0.095, dur: 0.45 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Bridge snap: planks collapse center-right with flying wood bits while kids and mums scramble back on the left rim.",
      stage: (t) => {
        const broken = t >= snapAt;
        const dropT = broken ? Math.min(1.6, t - snapAt) : 0;
        const recoil = broken ? ease(ramp(t, snapAt, snapAt + 0.35)) : 0;
        return (
          <>
            <CliffBridge broken={broken} dropT={dropT} />
            <ZombieMum position={[-1.25 - recoil * 0.3, CLIFF.ledgeY + hop(t, snapAt, 0.22, 0.35), 94.7]} rotationY={Math.PI / 2 - 0.25} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.6, -2.6]} />
            <ZombieKid position={[-1.5 - recoil * 0.4, CLIFF.ledgeY + hop(t, snapAt + 0.05, 0.25, 0.35), 95.4]} rotationY={Math.PI / 2 - 0.25} shirt="#3a7d8c" mood="scared" armPitch={[-2.5, -2.5]} />
            <MumChicken position={[-1.9 - recoil * 0.25, CLIFF.ledgeY, 95]} rotationY={Math.PI / 2 - 0.25} flap={broken ? 0.9 : 0.2}>
              <Hero position={[0, 0, 0]} mood="scared" />
            </MumChicken>
            <Bits position={[1.2, 4.4, 95]} t={t - snapAt} color="#8a5e39" count={18} power={4.5} />
            {broken && <Puffs position={[1.2, 4.5, 95]} color="#d8c3a5" count={8} spread={0.7} size={0.11} speed={1.8} opacity={0.75} />}
          </>
        );
      },
    },
    {
      cue: "4.heavy",
      ...cam.push({ on: [-1.4, 5.15, 95], dist: 3.6, to: 2.8, yaw: 20, pitch: 10, fov: 42 }),
      handheld: 0.024,
      impacts: [{ at: jumpAt + 0.3, amp: 0.085, dur: 0.35 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Big zombie mum charges forward to the broken edge, leaps, and lands heavy back onto the stone rim.",
      stage: (t) => {
        const charge = ramp(t, 0, jumpAt);
        const lunge = Math.sin(ramp(t, jumpAt, jumpAt + 0.65) * Math.PI);
        const x = -2.25 + charge * 0.55 + lunge * 0.85;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum
              position={[x, CLIFF.ledgeY + lunge * 0.52, 95]}
              rotationY={Math.PI / 2 - 0.25}
              walk={t < jumpAt ? charge * 1.4 : 0}
              shirt="#2d7a78"
              hat="bow"
              mood="scared"
              lean={0.3 - lunge * 0.45}
              armPitch={[-2.6, -2.6]}
            />
            <ZombieKid position={[-2.4, CLIFF.ledgeY + hop(t, jumpAt + 0.2, 0.2, 0.3), 95.4]} rotationY={Math.PI / 2 - 0.25} shirt="#3a7d8c" mood="scared" />
            <Bits position={[-1.0, 4.6, 95]} t={t - (jumpAt + 0.3)} color="#7a828f" count={10} power={2.5} />
          </>
        );
      },
    },
    {
      cue: "4.wings",
      ...cam.orbit({ on: [-2.4, 5.2, 95], dist: 4.2, distTo: 3.3, yaw: 22, yawTo: -14, pitch: 12, fov: 44 }),
      handheld: 0.02,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Panicked kids wave arms and huddle back on the cliff rim in the warm orange sunrise.",
      stage: (t) => (
        <>
          <CliffBridge broken dropT={1.5} />
          <ZombieMum position={[-2.0, CLIFF.ledgeY + hop(t, 0.4, 0.14, 0.3), 94.6]} rotationY={Math.PI / 2 - 0.25} shirt="#2d7a78" hat="bow" mood="scared" armPitch={[-2.4, -1.8]} />
          <ZombieKid position={[-2.4, CLIFF.ledgeY + hop(t, 0.7, 0.18, 0.3), 95.4]} rotationY={Math.PI / 2 - 0.25} shirt="#3a7d8c" mood="scared" armPitch={[-2.6, -2.6]} />
          <MumChicken position={[-2.9, CLIFF.ledgeY, 95.0]} rotationY={Math.PI / 2 - 0.25} flap={0.45}>
            <Hero position={[0, 0, 0]} mood="scared" tilt={Math.sin(t * 10) * 0.1} />
          </MumChicken>
        </>
      ),
    },
  ],
});
