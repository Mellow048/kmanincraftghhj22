import { cam, storyScene } from "../../engine";
import { CLIFF, CliffBridge, Hero, MumChicken, NORTH, Puffs, SOUTH, ZombieKid, ZombieMum, ease, hop, ramp, timing } from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Chickens Float",
  shots: [
    {
      cue: "6.float",
      ...cam.truck({ on: [0.6, 3.6, 95], by: [1.8, -1.6, 0], dist: 3.4, yaw: 18, pitch: 10, fov: 42 }),
      handheld: 0.018,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Heroic parachute glide: MumChicken snaps both wings wide, banking smoothly down the golden canyon with Hero cheering on her back.",
      stage: (t, { p }) => {
        const k = ease(p);
        const x = 0.0 + k * 2.1;
        const y = 3.8 - k * 2.2 + Math.sin(t * 9) * 0.12;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            <MumChicken position={[x, y, 95 + Math.sin(t * 3) * 0.15]} rotationY={Math.PI / 2} wingsSpread={1} flap={0.9} tilt={Math.sin(t * 5) * 0.22}>
              <Hero position={[0, 0, 0]} mood="happy" wave={1} />
            </MumChicken>
            <Puffs position={[x - 0.3, y + 0.2, 95]} color="#f7f5f0" count={5} spread={0.45} size={0.07} speed={1.4} opacity={0.7} />
          </>
        );
      },
    },
    {
      cue: "6.safe",
      ...cam.orbit({ on: [2.2, 0.85, 95], dist: 3.2, distTo: 2.4, yaw: 18, yawTo: -16, pitch: 8, fov: 40 }),
      handheld: 0.015,
      impacts: [{ at: 0.35, amp: 0.055, dur: 0.3 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Feather-soft touchdown on the canyon floor: MumChicken lands in a puff of dust and Hero hops off beaming.",
      stage: (t, { p }) => {
        const land = ease(ramp(p, 0, 0.38));
        const hopOff = ease(ramp(p, 0.48, 0.85));
        const y = 0.05 + (1 - land) * 0.72;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            {p < 0.48 ? (
              <MumChicken position={[2.1, y, 95]} rotationY={0.4} flap={1 - land * 0.85} crouch={land * 0.3}>
                <Hero position={[0, 0, 0]} mood="happy" wave={0.8} />
              </MumChicken>
            ) : (
              <>
                <MumChicken position={[2.0, 0.05, 95]} rotationY={0.6} flap={0.2} />
                <Hero position={[2.0 + hopOff * 0.6, 0.05 + hop(t, 0.48, 0.3, 0.35), 95]} rotationY={SOUTH} mood="happy" wave={1} />
              </>
            )}
            {p > 0.32 && <Puffs position={[2.1, 0.2, 95]} color="#f7f5f0" count={6} spread={0.45} size={0.075} speed={1.4} opacity={0.7} />}
          </>
        );
      },
    },
    {
      cue: "6.eleven",
      ...cam.orbit({ on: [0.6, 3.6, 95], dist: 4.4, distTo: 3.3, yaw: 20, yawTo: -14, pitch: 12, fov: 44 }),
      handheld: 0.022,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Rescue montage part 1: MumChicken glides down carrying Timmy with flapping wings while Hero cheers from below.",
      stage: (t, { p }) => {
        const k = ease(p);
        const x = -0.8 + k * 2.8;
        const y = 4.4 - k * 3.4;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            <MumChicken position={[x, y, 95]} rotationY={Math.PI / 2} wingsSpread={1} flap={0.95} tilt={Math.sin(t * 7) * 0.16}>
              <ZombieKid position={[0, 0, 0]} shirt="#3a7d8c" mood="scared" armPitch={[-2.3, -2.3]} />
            </MumChicken>
            <Hero position={[2.5, 0.05 + hop(t, 0.4, 0.22, 0.3), 95.4]} rotationY={NORTH} mood="happy" wave={1} />
            <ZombieKid position={[-2.2, CLIFF.ledgeY, 95.3]} rotationY={Math.PI / 2} shirt="#548256" mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.more",
      ...cam.truck({ on: [0.8, 3.3, 95], by: [1.6, -1.3, 0], dist: 4.3, yaw: 16, pitch: 12, fov: 44 }),
      handheld: 0.022,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Rescue montage part 2: MumChicken carries Mia smoothly down into the valley where rescued kids celebrate.",
      stage: (t, { p }) => {
        const k = ease(p);
        const x = -0.6 + k * 2.7;
        const y = 4.1 - k * 3.2;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            <MumChicken position={[x, y, 95]} rotationY={Math.PI / 2} wingsSpread={1} flap={0.95} tilt={Math.sin(t * 8) * 0.18}>
              <ZombieKid position={[0, 0, 0]} shirt="#6e5482" mood="happy" wave={0.8} />
            </MumChicken>
            <ZombieKid position={[2.7, 0.05 + hop(t, 0.2, 0.2, 0.3), 94.5]} rotationY={-1.4} shirt="#3a7d8c" mood="happy" wave={0.9} />
            <ZombieKid position={[2.4, 0.05 + hop(t, 0.5, 0.2, 0.3), 95.6]} rotationY={-1.4} shirt="#548256" mood="happy" />
            <Hero position={[3.0, 0.05, 95.1]} rotationY={-1.4} mood="happy" wave={1} />
          </>
        );
      },
    },
    {
      cue: "6.sun",
      ...cam.push({ on: [2.2, 1.0, 95], dist: 2.3, to: 4.2, yaw: -32, pitch: 22, fov: 44 }),
      handheld: 0.02,
      impacts: [{ at: 0.25, amp: 0.06, dur: 0.3 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Last second save: the final kid and zombie mum drop safe into the valley shadow as blazing sunlight hits the top rim.",
      stage: (t, { p }) => {
        const drop = p < 0.35 ? (1 - p / 0.35) * 1.4 : 0;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            <MumChicken position={[2.0, 0.05 + drop, 95]} rotationY={0.4} flap={p < 0.45 ? 0.9 : 0.2}>
              {p < 0.45 ? <ZombieKid position={[0, 0, 0]} shirt="#4a7b58" mood="happy" /> : null}
            </MumChicken>
            <Hero position={[2.8, 0.05 + hop(t, 0.3, 0.25, 0.32), 95.1]} rotationY={-0.6} mood="happy" wave={1} />
            <ZombieMum position={[1.4, 0.05 + drop * 0.7, 94.3]} rotationY={0.8} shirt="#2d7a78" hat="bow" mood="happy" wave={0.8} />
            <ZombieKid position={[2.6, 0.05 + hop(t, 0.5, 0.2, 0.3), 94.4]} rotationY={-0.8} shirt="#3a7d8c" mood="happy" />
            <Puffs position={[2.0, 0.25, 95]} color="#ffe2a8" count={6} spread={0.55} size={0.08} speed={1.4} opacity={0.75} />
          </>
        );
      },
    },
  ],
});
