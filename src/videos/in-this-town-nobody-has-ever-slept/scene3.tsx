import { cam, storyScene } from "../../engine";
import {
  Baker,
  Bits,
  Bubble,
  ChalkWall,
  Dad,
  EAST,
  Hero,
  LavaBucket,
  LavaSurface,
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
  wordAt,
} from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Life Under Glowstone",
  shots: [
    {
      cue: "3.rows",
      ...cam.truck({ on: [PLACE.mushrooms[0] - 1.5, 1.1, PLACE.mushrooms[2] + 0.9], by: [3.0, 0, 0], dist: 4.4, yaw: 20, pitch: 8, fov: 42 }),
      zone: "nether",
      look: "lava-shore",
      note: "Camera trucks past Dad trimming glowing red fungal beds under pulsing amber glowstone.",
      stage: (t) => {
        const GLOW = wordAt("3.rows", "glowstone");
        return (
          <>
            <Dad position={[PLACE.mushrooms[0] - 0.8 + t * 0.65, 0, PLACE.mushrooms[2] + 1.1]} rotationY={EAST - 0.3} walk={t * 0.8} nod={0.3 + Math.sin(t * 4) * 0.12} />
            <Villager robe={ROBE.farmer} position={[PLACE.mushrooms[0] + 1.4 - t * 0.4, 0, PLACE.mushrooms[2] - 0.8]} rotationY={WEST} walk={t * 0.6} lean={0.2} />
            <Hero position={[PLACE.mushrooms[0] + 2.2, 0, PLACE.mushrooms[2] + 1.4]} rotationY={WEST} animation={t < GLOW ? "idle" : "lookAround"} headPitch={t < GLOW ? 0 : -0.55} face="wow" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.lava",
      ...cam.crane({ on: [0, 0.8, 7.2], dist: 5.5, yaw: -22, fromPitch: 12, toPitch: 28, fov: 46 }),
      zone: "nether",
      look: "lava-shore",
      note: "Crane rises sharply above steaming lava shore as bucket brigade hauls glowing buckets uphill in lockstep.",
      stage: (t) => {
        const BUCKETS = wordAt("3.lava", "buckets");
        return (
          <>
            <Mum position={[-2.2, 0, 7.1 - ease(ramp(t, 0, 1.9)) * 1.9]} rotationY={NORTH} walk={t * 1.4} strain={0.65} carry={<LavaBucket position={[0, 0.44, 0]} scale={0.7} swing={Math.sin(t * 5) * 0.25} />} />
            <Villager robe={ROBE.smith} position={[0.4, 0, 7.4 - ease(ramp(t, 0.2, 2.1)) * 1.8]} rotationY={NORTH} walk={t * 1.3} carry={<LavaBucket position={[0, 0.44, 0]} scale={0.7} fill={t < BUCKETS ? 0.5 : 1} />} />
            <Hero position={[2.2, 0, 6.7]} rotationY={WEST} animation="reach" face="worried" time={t} />
          </>
        );
      },
    },
    {
      cue: "3.water",
      ...cam.push({ on: [0.2, 0.5, 3.2], dist: 3.4, to: 1.8, yaw: 18, pitch: 22, fov: 36 }),
      zone: "nether",
      look: "lava-shore",
      note: "Low push on single blue splash hitting scorching floor and vanishing instantly in billowing white steam puffs.",
      stage: (t) => {
        const STEAM = wordAt("3.water", "steamed");
        const k = ramp(t, 0.3, STEAM + 0.9);
        return (
          <>
            <Hero position={[-1.0, 0, 2.8]} rotationY={EAST} animation={t < STEAM ? "point" : "scared"} face="wow" time={t} />
            {k < 0.7 ? <Bits position={[0.3, 0.08, 3.1]} t={t} color="#58b4ff" count={10} power={1.1} /> : null}
            <Bits position={[0.3, 0.1, 3.1]} t={Math.max(0.01, t - STEAM * 0.6)} color="#f2f6ff" count={14} power={1.5} />
            <Bubble text="HISS!" position={[0.3, 1.3 + k * 0.7, 3.1]} dark rotationY={0.2} scale={pop(t, STEAM)} />
          </>
        );
      },
    },
    {
      cue: "3.marks",
      ...cam.truck({ on: [PLACE.chalk[0] - 1.1, 1.4, PLACE.chalk[2] + 0.4], by: [2.2, 0, 0], dist: 3.1, yaw: 12, pitch: 2, fov: 38 }),
      zone: "nether",
      look: "lava-shore",
      note: "Slider track across tallies scratched thickly into basalt wall while Baker slashes another chalk shift mark.",
      stage: (t) => {
        const THOUS = wordAt("3.marks", "thousand");
        return (
          <>
            <ChalkWall position={[PLACE.chalk[0], 0, PLACE.chalk[2] + 0.35]} rows={4} cols={7} highlightProgress={0.55 + ease(ramp(t, 0, THOUS + 0.6)) * 0.45} />
            <Baker position={[PLACE.chalk[0] + 0.9 - ramp(t, 0, 1.8) * 0.4, 0, PLACE.chalk[2] + 1.1]} rotationY={NORTH} walk={t * 0.7} nod={Math.sin(t * 7) * 0.18} />
            <Bubble text="4,000" position={[PLACE.chalk[0] - 0.3, 2.45, PLACE.chalk[2] + 0.6]} dark rotationY={0.2} scale={pop(t, THOUS)} />
          </>
        );
      },
    },
    {
      cue: "3.lie",
      ...cam.top({ on: [0, 0.4, 2.2], height: 5.0, to: 1.8, spin: [0, 0.25], fov: 44 }),
      zone: "nether",
      look: "lava-shore",
      note: "Overhead birdseye of Hero splayed sideways alone in red-tinted stone lane while upright villagers keep marching.",
      stage: (t) => {
        const ME = wordAt("3.lie", "me");
        return (
          <>
            <group position={[0, 0.25, 2.2]} rotation={[-Math.PI / 2, 0, 0.4 + Math.sin(t * 2) * 0.08]}>
              <Hero position={[0, 0, 0]} animation={t < ME ? "idle" : "wave"} face="calm" time={t} />
            </group>
            <Villager robe={ROBE.brown} position={[-2.2 + t * 1.4, 0, 0.5]} rotationY={EAST} walk={t * 1.5} />
            <Villager robe={ROBE.smith} position={[2.4 - t * 1.5, 0, 3.6]} rotationY={WEST} walk={t * 1.5} />
          </>
        );
      },
    },
    {
      cue: "3.want",
      ...cam.push({ on: faceOf([0, 0, 2]), dist: 3.1, to: 1.6, yaw: -20, pitch: 4, fov: 34 }),
      zone: "nether",
      look: "lava-shore",
      note: "Intimate push as Hero closes eyes smiling softly holding imaginary pillow with tired hopeful face.",
      stage: (t) => {
        const SLEEP = wordAt("3.want", "sleep");
        return (
          <>
            <Hero
              position={[0, 0, 2 - ramp(t, 0, 1.5) * 0.25]}
              rotationY={-0.2 + Math.sin(t * 1.5) * 0.1}
              animation={t < SLEEP ? "hold" : "reachUp"}
              face={t < SLEEP ? "smile" : "sleepy"}
              headPitch={0.12 + ramp(t, SLEEP, SLEEP + 0.6) * 0.22}
              time={t}
            />
            <Bubble text="ONE NIGHT" position={[0.7, 1.65, 2.0]} dark rotationY={-0.25} scale={pop(t, SLEEP)} />
          </>
        );
      },
    },
  ],
});
