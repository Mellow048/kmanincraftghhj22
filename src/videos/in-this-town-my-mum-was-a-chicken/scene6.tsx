import { Block, cam, storyScene } from "../../engine";
import { CLIFF, CliffBridge, Hero, MumChicken, ZombieKid, ZombieMum, ease, jolt, ramp, timing, wordAt } from "./kit";

const wingsOpen = wordAt("6.float", "wings");

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Chickens Float",
  shots: [
    {
      cue: "6.float",
      ...cam.truck({ on: [0.3, 4.45, 95], by: [1.5, -1.8, 0], dist: 4.3, yaw: 26, pitch: 10, fov: 44 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Sweeping mid-air glide past the canyon wall: white wings open wide and flap gently as they float downward instead of falling.",
      stage: (t, { p }) => {
        const k = ease(p);
        const flap = t >= wingsOpen - 0.2 ? 1 : 0.6;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <ZombieMum position={[-1.6, CLIFF.ledgeY, 94.6]} rotationY={Math.PI / 2} shirt="#2d7a78" hat="bow" mood="happy" lookAt={[0.3 + k * 1.5, 4.1 - k * 1.9, 95]} />
            <ZombieKid position={[-1.9, CLIFF.ledgeY, 95.5]} rotationY={Math.PI / 2} shirt="#3a7d8c" mood="happy" lookAt={[0.3 + k * 1.5, 4.1 - k * 1.9, 95]} />
            <MumChicken position={[0.3 + k * 1.5, 4.1 - k * 1.9, 95]} rotationY={Math.PI / 2} flap={flap}>
              <Hero position={[0, 0, 0]} mood="happy" armPitch={[-2.3, -2.3]} />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "6.safe",
      ...cam.push({ on: [2.0, 0.65, 95], dist: 2.8, to: 2.1, yaw: 10, pitch: 6, fov: 40 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Low valley floor shot: feather-soft touchdown on green grass with zero damage—Hero beams and pats her back.",
      stage: (t, { p }) => {
        const land = ease(ramp(p, 0, 0.45));
        const y = 0.85 * (1 - land) + 0.05;
        const squash = jolt(t, 0.9, 0.14);
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <MumChicken position={[2.0, y, 95]} rotationY={0.2} flap={land < 0.95 ? 1 : 0} crouch={Math.abs(squash)}>
              <Hero position={[0, 0, 0]} mood="happy" wave={land > 0.95 ? 0.8 : 0} />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "6.eleven",
      ...cam.orbit({ on: [1.4, 2.5, 95], dist: 4.5, distTo: 3.6, yaw: 30, yawTo: -10, pitch: 12, fov: 42 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Rescue montage: she glides swiftly back down from the high ledge carrying Timmy while Hero cheers below.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <Hero position={[3.0, 0.05, 95.8]} rotationY={-0.6} mood="happy" wave={0.9} lookAt={[0.5 + k * 1.8, 4.3 - k * 3.8, 95]} />
            <MumChicken position={[0.2 + k * 2.0, 4.2 - k * 3.9, 95]} rotationY={Math.PI / 2} flap={1}>
              <ZombieKid position={[0, 0, 0]} shirt="#3a7d8c" mood="happy" />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "6.more",
      ...cam.push({ on: [2.0, 1.4, 95], dist: 4.2, to: 3.2, yaw: 12, pitch: -10, fov: 42 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "Low valley reverse looking up as she swoops down with Mia while rescued zombie kids cheer along the grass.",
      stage: (t, { p }) => {
        const k = ease(p);
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <Hero position={[3.1, 0.05, 95.6]} rotationY={-0.8} mood="happy" wave={0.7} />
            <ZombieKid position={[1.4, 0.05, 96.1]} rotationY={0.5} shirt="#3a7d8c" mood="happy" armPitch={[-2.6, -2.6]} />
            <ZombieKid position={[3.8, 0.05, 94.5]} rotationY={-1.1} shirt="#6e5482" mood="happy" armPitch={[-2.4, -2.4]} />
            <MumChicken position={[0.4 + k * 1.9, 4.0 - k * 3.7, 94.9]} rotationY={Math.PI / 2} flap={1}>
              <ZombieKid position={[0, 0, 0]} shirt="#548256" mood="happy" />
            </MumChicken>
          </>
        );
      },
    },
    {
      cue: "6.sun",
      ...cam.push({ on: [-1.4, 4.9, 95], dist: 4.0, to: 3.0, yaw: 34, pitch: 6, fov: 40 }),
      look: "overworld-sunset",
      zone: "cliff",
      note: "High cliff beat: the final kid leaps off with mum right as bright golden sunlight sweeps across the empty stone.",
      stage: (t, { p }) => {
        const k = ease(p);
        const sunX = 4.2 - k * 6.2;
        return (
          <>
            <CliffBridge broken dropT={1.5} />
            <Block position={[sunX, 4.6, 95]} size={[3.2, 0.04, 5.0]} color="#ffe28a" />
            <MumChicken position={[-1.4 + k * 2.5, CLIFF.ledgeY - k * 1.8, 95]} rotationY={Math.PI / 2} flap={1}>
              <ZombieKid position={[0, 0, 0]} shirt="#826546" mood="scared" />
            </MumChicken>
          </>
        );
      },
    },
  ],
});
