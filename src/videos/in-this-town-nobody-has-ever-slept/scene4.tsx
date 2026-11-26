import { Block, cam, storyScene } from "../../engine";
import {
  Bubble,
  EAST,
  FakeBed,
  Hero,
  NORTH,
  ROBE,
  SOUTH,
  Strider,
  Villager,
  WEST,
  ease,
  faceOf,
  jolt,
  pop,
  ramp,
  timing,
  wordAt,
} from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The Tries",
  shots: [
    {
      cue: "4.tried",
      ...cam.whip({ from: [2.4, 1.5, 5.2], on: [-1.4, 1.15, 2], onTo: [0.8, 1.15, 2], fov: 38, ease: "inOutSine" }),
      zone: "nether",
      look: "lava-shore",
      note: "Fast whip pan onto determined Hero pounding fist and sprinting forward to try sleeping.",
      stage: (t) => {
        const EVERY = wordAt("4.tried", "everything");
        return (
          <>
            <Hero
              position={[-0.8 + ease(ramp(t, 0, 1.1)) * 1.5, 0, 2.1]}
              rotationY={EAST - 0.4}
              animation={t < EVERY ? "run" : "point"}
              animDistance={t * 2.2}
              face="brave"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "4.square",
      ...cam.truck({ on: [-1.4, 0.9, 2], by: [3.0, 0, 0], dist: 4.5, yaw: 18, pitch: 14, fov: 44 }),
      zone: "nether",
      look: "lava-shore",
      note: "Ground-hugging track as Hero lies flat in busy stone square while brisk villagers step straight past and over him.",
      stage: (t) => {
        const HUND = wordAt("4.square", "hundred");
        return (
          <>
            <group position={[0, 0.25, 2]} rotation={[-Math.PI / 2, 0, 0]}>
              <Hero position={[0, 0, 0]} animation={t < HUND ? "idle" : "shrug"} face="ouch" time={t} />
            </group>
            <Villager robe={ROBE.brown} position={[-2.2 + t * 1.7, 0.08 + Math.max(0, Math.sin(t * 5)) * 0.35, 1.8]} rotationY={EAST} walk={t * 2.4} />
            <Villager robe={ROBE.elder} position={[2.4 - t * 1.8, 0.08 + Math.max(0, Math.sin(t * 5 + 1)) * 0.35, 2.2]} rotationY={WEST} walk={t * 2.5} />
            <Villager robe={ROBE.blue} position={[-0.8 + t * 1.5, 0, 3.2]} rotationY={EAST} walk={t * 2.1} />
          </>
        );
      },
    },
    {
      cue: "4.lick",
      ...cam.push({ on: [0.3, 0.7, 2.2], dist: 2.8, to: 1.55, yaw: -22, pitch: 8, fov: 36 }),
      zone: "nether",
      look: "lava-shore",
      note: "Close comical push as shaggy pink strider walks right up and extends wet tongue across Hero's recoiling face.",
      stage: (t) => {
        const LICK = wordAt("4.lick", "licked");
        const k = ramp(t, LICK, LICK + 0.55);
        return (
          <>
            <group position={[-0.35, 0.25, 2.1]} rotation={[-Math.PI / 2, 0, 0.3]}>
              <Hero position={[0, 0, 0]} animation={t > LICK ? "shrug" : "idle"} face={t > LICK ? "ouch" : "calm"} time={t} />
            </group>
            <Strider
              position={[1.05 - ramp(t, 0, LICK) * 0.45, 0, 2.1]}
              rotationY={WEST - 0.15}
              walk={ramp(t, 0, LICK) * 0.45}
              headTilt={0.28 + k * 0.25}
              lick={k}
            />
            <Bubble text="SLURP" position={[0.45, 1.55, 2.1]} dark rotationY={-0.3} scale={pop(t, LICK)} />
          </>
        );
      },
    },
    {
      cue: "4.wool",
      ...cam.orbit({ on: [0, 1.0, 2], dist: 3.4, yaw: -25, yawTo: 24, pitch: 8, fov: 38 }),
      zone: "nether",
      look: "lava-shore",
      note: "Hero holds out empty arms inspecting barren red wasteland stone horizon where zero white sheep exist.",
      stage: (t) => {
        const SHEEP = wordAt("4.wool", "sheep");
        return (
          <>
            <Hero
              position={[0, 0, 2]}
              rotationY={Math.sin(t * 2) * 0.5}
              animation={t < SHEEP ? "lookAround" : "shrug"}
              face="frown"
              time={t}
            />
            <Bubble text="NO SHEEP" position={[0.6, 1.65, 2]} dark rotationY={0.2} scale={pop(t, SHEEP)} />
          </>
        );
      },
    },
    {
      cue: "4.fake",
      ...cam.crane({ on: [0, 0.55, 2], dist: 3.6, yaw: 24, fromPitch: 14, toPitch: 28, fov: 40 }),
      zone: "nether",
      look: "lava-shore",
      note: "Crane descends as Hero slams red wool blanket atop plank slab building a decoy wooden bed.",
      stage: (t) => {
        const RED = wordAt("4.fake", "red");
        return (
          <>
            <FakeBed position={[0, 0, 2]} rotationY={EAST} bounce={jolt(t, RED, 0.9)} />
            <Hero
              position={[-0.95 + ease(ramp(t, 0, 1.2)) * 0.35, 0, 2.1]}
              rotationY={EAST}
              animation={t < RED ? "reach" : "point"}
              face={t < RED ? "brave" : "grin"}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "4.safe",
      ...cam.push({ on: [0, 0.7, 2], dist: 3.3, to: 1.9, yaw: -20, pitch: 12, fov: 38 }),
      zone: "nether",
      look: "lava-shore",
      note: "Hero hops enthusiastically onto stiff fake wooden bed smiling relieved when nothing explodes.",
      stage: (t) => {
        const SAFE = wordAt("4.safe", "safe");
        const b = Math.abs(Math.sin(t * 6)) * (t < SAFE ? 0.25 : 0.05);
        return (
          <>
            <FakeBed position={[0, 0, 2]} rotationY={EAST} bounce={b * 0.4} />
            <Hero
              position={[0, 0.56 + b, 2]}
              rotationY={0.2}
              animation={t < SAFE ? "jump" : "laugh"}
              face="grin"
              time={t}
            />
            <Block position={[0.85, 1.5, 2]} size={[0.16, 0.16, 0.16]} color="#55e87a" emissive="#22b444" emissiveIntensity={0.4} />
          </>
        );
      },
    },
  ],
});
