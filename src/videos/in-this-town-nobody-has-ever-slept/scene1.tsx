import { Block, cam, storyScene } from "../../engine";
import {
  Baker,
  Bubble,
  CellarGate,
  Dad,
  EAST,
  Hero,
  LavaBucket,
  Mum,
  NORTH,
  PLACE,
  ROBE,
  SOUTH,
  Villager,
  WEST,
  ease,
  faceOf,
  pop,
  ramp,
  timing,
  villagerFace,
  wordAt,
} from "./kit";

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.work",
      ...cam.truck({ on: [-0.8, 1.15, 2], by: [2.2, 0, 0], dist: 5.2, yaw: 16, pitch: 8, fov: 44, screenOffset: [0, 0.06] }),
      zone: "nether",
      look: "lava-shore",
      note: "Hero marches briskly through bustling glowing Nether lane while exhausted tireless villagers haul lava and heave goods.",
      stage: (t) => {
        const SLEPT = wordAt("1.work", "slept");
        const hx = -1.6 + ease(ramp(t, 0, 2.8)) * 3.1;
        return (
          <>
            <Hero
              position={[hx, 0, 2.1]}
              rotationY={EAST - 0.15}
              animation={t < SLEPT ? "walk" : "point"}
              animDistance={t * 1.4}
              face={t < SLEPT ? "calm" : "wow"}
              headYaw={Math.sin(t * 2.4) * 0.35}
              time={t}
            />
            <Mum position={[-2.2 + t * 0.9, 0, -0.3]} rotationY={EAST} walk={t * 1.2} carry={<LavaBucket position={[0, 0.42, 0]} scale={0.62} swing={Math.sin(t * 5) * 0.25} />} />
            <Dad position={[3.2 - t * 0.7, 0, 0.4]} rotationY={WEST} walk={t * 1.1} nod={0.2 * Math.sin(t * 3)} />
            <Baker position={[0.4 + t * 0.5, 0, 4.1]} rotationY={EAST} walk={t * 0.8} strain={0.35 + 0.2 * Math.sin(t * 4)} />
            <Villager robe={ROBE.brown} position={[-4 + t * 0.8, 0, 3.8]} rotationY={EAST} walk={t * 1.0} hmm={0.2 + 0.2 * Math.sin(t * 3)} />
            <Bubble text="WORK" position={[-2.2 + t * 0.9, 2.25, -0.3]} dark rotationY={0.25} scale={pop(t, 0.45)} />
          </>
        );
      },
    },
    {
      cue: "1.bed",
      ...cam.push({ on: [PLACE.cellar[0], 1.2, PLACE.cellar[2] + 0.4], dist: 4.1, to: 2.35, yaw: -18, pitch: 8, fov: 38, screenOffset: [0, 0.06] }),
      zone: "nether",
      look: "lava-shore",
      note: "Camera pushes fast onto chained iron cellar bulkhead pulsing red lock glow as Hero leans forward peeking.",
      stage: (t) => {
        const LOCKED = wordAt("1.bed", "locked");
        return (
          <>
            <CellarGate position={[PLACE.cellar[0], 0, PLACE.cellar[2]]} chainRattle={Math.sin(t * 14) * 0.08 * ramp(t, LOCKED, LOCKED + 0.6)} />
            <Hero
              position={[PLACE.cellar[0] - 1.35 + ease(ramp(t, 0, 1.4)) * 0.45, 0, PLACE.cellar[2] + 1.55]}
              rotationY={0.45}
              animation="reach"
              face={t < LOCKED ? "calm" : "wow"}
              headYaw={-0.35 + 0.25 * Math.sin(t * 2.5)}
              time={t}
            />
            <Bubble text="LOCKED" position={[PLACE.cellar[0], 2.55, PLACE.cellar[2] + 0.3]} dark rotationY={-0.3} scale={pop(t, LOCKED)} />
          </>
        );
      },
    },
    {
      cue: "1.aim",
      ...cam.orbit({ on: faceOf([0, 0, 2]), dist: 2.35, yaw: 24, yawTo: -18, pitch: 4, fov: 34, screenOffset: [0, 0.05] }),
      zone: "nether",
      look: "lava-shore",
      note: "Tight orbit across Hero dropping onto elbow in daydream longing to finally sleep.",
      stage: (t) => {
        const SLEEP = wordAt("1.aim", "sleep");
        return (
          <>
            <Hero
              position={[0, 0, 2 - ramp(t, 0, 0.9) * 0.3]}
              rotationY={Math.sin(t * 1.4) * 0.2}
              animation={t < SLEEP ? "idle" : "reachUp"}
              face={t < SLEEP ? "frown" : "sleepy"}
              headPitch={0.18 + Math.sin(t * 2) * 0.08}
              time={t}
            />
            <Block position={[0.75, 1.45 + 0.1 * Math.sin(t * 4), 2.1]} size={[0.14, 0.14, 0.14]} color="#b4d8ff" emissive="#8ec4ff" emissiveIntensity={0.6} />
            <Bubble text="SLEEP..." position={[-0.7, 1.65, 2.1]} dark rotationY={0.15} scale={pop(t, SLEEP)} />
          </>
        );
      },
    },
  ],
});
