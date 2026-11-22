import { cam, storyScene } from "../../engine";
import { CLIFF, CliffBridge, Hero, MumChicken, SOUTH, ZombieKid, ZombieMum, ease, hop, ramp, timing } from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Chickens Float",
  shots: [
    {
      cue: "6.float",
      ...cam.orbit({ on: [0.0, 4.4, 95], onTo: [2.0, 2.35, 95], dist: 4.2, distTo: 3.6, yaw: 18, yawTo: -12, pitch: 10, fov: 44 }),
      handheld: 0.018,
      look: "overworld-sunset",
      zone: "cliff",
      note: "1:1 tracked parachute glide: MumChicken spreads both wings wide banking down the golden canyon with Hero cheering dead-center.",
      stage: (t, { p }) => {
        const k = ease(p);
        const x = 0.0 + k * 2.0;
        const y = 3.8 - k * 2.2 + Math.sin(t * 9) * 0.1;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            <MumChicken position={[x, y, 95 + Math.sin(t * 3) * 0.12]} rotationY={0.75} wingsSpread={1} flap={0.9} tilt={Math.sin(t * 5) * 0.2}>
              <Hero position={[0, 0, 0]} mood="happy" wave={1} />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "6.safe",
      ...cam.orbit({ on: [2.15, 0.95, 95], dist: 3.05, distTo: 2.75, yaw: -24, yawTo: 8, pitch: 6, fov: 42 }),
      handheld: 0.015,
      impacts: [{ at: 0.35, amp: 0.055, dur: 0.3 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Full-body canyon floor touchdown: MumChicken lands softly and Hero hops cleanly off her back beside her beaming.",
      stage: (t, { p }) => {
        const land = ease(ramp(p, 0, 0.38));
        const hopOff = ease(ramp(p, 0.48, 0.82));
        const y = 0.05 + (1 - land) * 0.65;
        const heroY = 0.05 + (1 - hopOff) * 0.55 + Math.sin(hopOff * Math.PI) * 0.35;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            {p < 0.48 ? (
              <MumChicken position={[2.0, y, 95]} rotationY={0.45} wingsSpread={1 - land * 0.7} flap={1 - land * 0.85} crouch={land * 0.25}>
                <Hero position={[0, 0, 0]} mood="happy" wave={0.8} />
              </MumChicken>
            ) : (
              <>
                <MumChicken position={[2.0 - hopOff * 0.25, 0.05, 95]} rotationY={0.55} flap={0.2} />
                <Hero position={[2.0 + hopOff * 0.75, heroY, 95 + hopOff * 0.25]} rotationY={SOUTH - 0.25} mood="happy" wave={1} />
              </>
            )}
          </>
        );
      },
    },
    {
      cue: "6.eleven",
      ...cam.orbit({ on: [-0.4, 3.8, 95], onTo: [2.0, 1.0, 95], dist: 4.5, distTo: 3.4, yaw: 20, yawTo: -12, pitch: 12, fov: 44 }),
      handheld: 0.022,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Tracked rescue dive 1: MumChicken glides down carrying Timmy dead-center while Hero cheers below.",
      stage: (t, { p }) => {
        const k = ease(p);
        const x = -0.5 + k * 2.4;
        const y = 4.1 - k * 3.1;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            <MumChicken position={[x, y, 95]} rotationY={0.85} wingsSpread={1} flap={0.95} tilt={Math.sin(t * 7) * 0.16}>
              <ZombieKid position={[0, 0, 0]} shirt="#3a7d8c" mood="scared" armPitch={[-2.3, -2.3]} />
            </MumChicken>
            <Hero position={[2.45, 0.05 + hop(t, 0.4, 0.22, 0.3), 95.3]} rotationY={-0.6} mood="happy" wave={1} />
            <ZombieKid position={[-2.1, CLIFF.ledgeY, 95.2]} rotationY={Math.PI / 2 - 0.3} shirt="#548256" mood="scared" />
          </>
        );
      },
    },
    {
      cue: "6.more",
      ...cam.orbit({ on: [-0.2, 3.5, 95], onTo: [2.1, 0.9, 95], dist: 4.3, distTo: 3.3, yaw: 14, yawTo: -16, pitch: 12, fov: 44 }),
      handheld: 0.022,
      look: "overworld-sunset",
      zone: "cliff",
      note: "Tracked rescue dive 2: MumChicken carries Mia smoothly down into the valley where rescued kids jump cheering.",
      stage: (t, { p }) => {
        const k = ease(p);
        const x = -0.3 + k * 2.3;
        const y = 3.8 - k * 2.9;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            <MumChicken position={[x, y, 95]} rotationY={0.85} wingsSpread={1} flap={0.95} tilt={Math.sin(t * 8) * 0.18}>
              <ZombieKid position={[0, 0, 0]} shirt="#6e5482" mood="happy" wave={0.8} />
            </MumChicken>
            <ZombieKid position={[2.6, 0.05 + hop(t, 0.2, 0.2, 0.3), 94.5]} rotationY={-0.8} shirt="#3a7d8c" mood="happy" wave={0.9} />
            <ZombieKid position={[2.25, 0.05 + hop(t, 0.5, 0.2, 0.3), 95.5]} rotationY={-0.8} shirt="#548256" mood="happy" />
            <Hero position={[2.8, 0.05, 95.0]} rotationY={-0.8} mood="happy" wave={1} />
          </>
        );
      },
    },
    {
      cue: "6.sun",
      ...cam.push({ on: [2.0, 1.05, 94.9], dist: 3.8, to: 4.8, yaw: -14, pitch: 15, fov: 46 }),
      handheld: 0.02,
      impacts: [{ at: 0.25, amp: 0.06, dur: 0.3 }],
      look: "overworld-sunset",
      zone: "cliff",
      note: "Last second valley save: pull back to reveal the whole rescued group safe in valley shadow as blazing sun hits the high rim.",
      stage: (t, { p }) => {
        const drop = p < 0.35 ? (1 - p / 0.35) * 0.85 : 0;
        return (
          <>
            <CliffBridge broken dropT={1.7} />
            <MumChicken position={[1.95, 0.05 + drop, 95]} rotationY={0.4} flap={p < 0.45 ? 0.9 : 0.2}>
              {p < 0.45 ? <ZombieKid position={[0, 0, 0]} shirt="#4a7b58" mood="happy" /> : null}
            </MumChicken>
            <Hero position={[2.45, 0.05 + hop(t, 0.3, 0.25, 0.32), 95.25]} rotationY={-0.45} mood="happy" wave={1} />
            <ZombieMum position={[1.48, 0.05 + drop * 0.7, 94.55]} rotationY={0.55} shirt="#2d7a78" hat="bow" mood="happy" wave={0.8} />
            <ZombieKid position={[2.35, 0.05 + hop(t, 0.5, 0.2, 0.3), 94.45]} rotationY={-0.55} shirt="#3a7d8c" mood="happy" />
          </>
        );
      },
    },
  ],
});
