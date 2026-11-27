import type React from "react";
import {
  ChiefFlint,
  FireflyJar,
  FireflySwarm,
  FloatingNumber,
  Kai,
  PipFirefly,
  ShadowCreature,
  Smoke,
  Townie,
  WindStreaks,
  cam,
  clamp01,
  lerp,
  moveBetween,
  storyScene,
  timing,
} from "./kit";

/**
 * Scene 3 (13 shots): The howling windstorm extinguishes every torch,
 * shadows invade the square, and Kai unleashes Pip + 50 glowing fireflies!
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Scene 3",
  shots: [
    {
      cue: "5.wind",
      look: "overworld-storm",
      note: "Stormy crane sweeps down the 56m street as howling wind streaks slam through town.",
      ...cam.streetOverview({ from: [-2.4, 0, 12.6], to: [1.6, 0, 6.2], height: 5.4, fov: 48 }),
      stage: (t) => (
        <>
          <WindStreaks t={t} center={[0, 2.2, 1.0]} />
          <Townie who={1} position={[-2.2, 0, 1.6]} rotationY={0.4} animation="cower" face="scared" torch time={t} />
          <Townie who={3} position={[2.2, 0, 1.8]} rotationY={-0.4} animation="cower" face="scared" torch time={t} />
          <Kai position={[0, 0, 2.4]} animation="idle" face="worried" time={t} />
        </>
      ),
    },
    {
      cue: "5.out2",
      look: "overworld-storm",
      note: "Wide storm sweep as every single torch on the street blows out in puffs of smoke.",
      ...cam.sweep({ on: [0, 1.35, 1.6], dist: 5.6, fromYaw: -40, toYaw: 40, pitch: 9, fov: 44 }),
      stage: (t) => (
        <>
          <WindStreaks t={t} center={[0, 2.0, 1.2]} />
          <Townie who={1} position={[-2.2, 0, 1.6]} rotationY={0.4} animation="cower" face="scared" time={t} />
          <Townie who={3} position={[2.2, 0, 1.8]} rotationY={-0.4} animation="cower" face="scared" time={t} />
          <Smoke position={[-2.2, 1.3, 1.6]} count={10} />
          <Smoke position={[2.2, 1.3, 1.8]} count={10} />
        </>
      ),
    },
    {
      cue: "5.lock",
      look: "overworld-storm",
      note: "Low dramatic angle on Chief Flint slamming his shop shut and demanding two hundred emeralds.",
      ...cam.heroLow({ on: [3.8, 0, -2.5], dist: 5.0, yaw: -24, fov: 44 }),
      stage: (t) => (
        <>
          <WindStreaks t={t} center={[3.2, 2.0, -2.0]} />
          <ChiefFlint position={[3.8, 0, -2.5]} rotationY={-1.3} animation="laugh" face="smug" torch light={3.2} time={t} />
          <FloatingNumber text="200 EMERALDS!" position={[3.6, 2.2, -2.5]} color="#ff4444" height={0.4} />
        </>
      ),
    },
    {
      cue: "5.creep",
      look: "overworld-storm",
      note: "Tracking camera glides alongside three tall living shadows advancing onto the cobble square.",
      ...cam.track({ from: [0, 0, -10.5], to: [0, 0, -3.2], sideDist: 5.0, side: -1, height: 1.6, fov: 44 }),
      stage: (t) => {
        const adv = moveBetween([0, 0, -10.5], [0, 0, -3.2], t, 0, 2.2);
        return (
          <>
            <WindStreaks t={t} center={[0, 2.0, adv.position[2]]} />
            <ShadowCreature position={[adv.position[0] - 2.0, 0, adv.position[2]]} rotationY={0.15} scale={1.2} t={t} />
            <ShadowCreature position={[adv.position[0], 0, adv.position[2] - 0.8]} rotationY={0} scale={1.3} t={t} />
            <ShadowCreature position={[adv.position[0] + 2.0, 0, adv.position[2]]} rotationY={-0.15} scale={1.2} t={t} />
          </>
        );
      },
    },
    {
      cue: "5.trap",
      look: "overworld-storm",
      note: "Cross-square sweep as terrified neighbors back up waving dead cold sticks in panic.",
      ...cam.sweep({ on: [0, 1.3, 1.4], dist: 6.2, fromYaw: 38, toYaw: -34, pitch: 12, fov: 44 }),
      stage: (t) => (
        <>
          <WindStreaks t={t} center={[0, 2.0, 1.0]} />
          <Townie who={1} position={[-2.2, 0, 1.6]} rotationY={0.4} animation="cower" face="scared" time={t} />
          <Townie who={3} position={[2.2, 0, 1.8]} rotationY={-0.4} animation="cower" face="scared" time={t} />
          <Townie who={5} position={[-3.4, 0, 3.2]} rotationY={0.6} animation="shrug" face="worried" time={t} />
          <ShadowCreature position={[-2.4, 0, -2.4]} rotationY={0.25} scale={1.2} t={t} />
          <ShadowCreature position={[2.6, 0, -2.2]} rotationY={-0.25} scale={1.2} t={t} />
        </>
      ),
    },
    {
      cue: "5.broke",
      look: "overworld-storm",
      note: "Tight tense sweep across the trapped villagers with empty pockets as shadows close in.",
      ...cam.sweep({ on: [0, 1.35, 1.6], dist: 5.0, fromYaw: -28, toYaw: 24, pitch: 7, fov: 40 }),
      stage: (t) => (
        <>
          <Townie who={1} position={[-1.6, 0, 1.6]} rotationY={0.4} animation="shrug" face="sad" time={t} />
          <Townie who={3} position={[1.6, 0, 1.6]} rotationY={-0.4} animation="shrug" face="worried" time={t} />
          <Kai position={[0, 0, 1.8]} animation="idle" face="worried" time={t} />
          <FireflyJar position={[0.35, 1.15, 1.95]} hasPip t={t} />
        </>
      ),
    },
    {
      cue: "6.rule",
      look: "overworld-storm",
      note: "Hero low-angle shot on Kai realizing the one simple rule everyone in town forgot.",
      ...cam.heroLow({ on: [0, 0, 1.8], dist: 4.4, yaw: -20, fov: 42 }),
      stage: (t) => (
        <>
          <Kai position={[0, 0, 1.8]} animation="idle" face="brave" time={t} />
          <FireflyJar position={[0.35, 1.15, 1.95]} hasPip t={t} />
        </>
      ),
    },
    {
      cue: "6.fire",
      look: "overworld-storm",
      note: "Quick arc showing wind streaks snuffing out a smoking torch in half a second.",
      ...cam.sweep({ on: [-1.8, 1.3, 1.6], dist: 4.6, fromYaw: 30, toYaw: -26, pitch: 8, fov: 40 }),
      stage: (t) => (
        <>
          <WindStreaks t={t} center={[-1.8, 1.8, 1.6]} />
          <Townie who={1} position={[-1.8, 0, 1.6]} animation="cower" face="scared" time={t} />
          <Smoke position={[-1.8, 1.3, 1.6]} count={12} />
        </>
      ),
    },
    {
      cue: "6.bug",
      look: "overworld-storm",
      note: "Glowing close-up sweep on Pip shining steadily inside the glass jar despite the storm.",
      ...cam.sweep({ on: [0.35, 1.25, 1.9], dist: 3.8, fromYaw: -28, toYaw: 28, pitch: 6, fov: 36 }),
      stage: (t) => (
        <>
          <WindStreaks t={t} center={[0, 2.2, 1.4]} />
          <Kai position={[0, 0, 1.8]} animation="idle" face="brave" time={t} />
          <FireflyJar position={[0.35, 1.2, 1.95]} hasPip t={t} />
        </>
      ),
    },
    {
      cue: "6.open",
      look: "overworld-storm",
      note: "Dramatic low hero angle as Kai pops Pip's cork lid open and raises the jar skyward.",
      ...cam.heroLow({ on: [0, 0.2, 1.8], dist: 4.4, yaw: 24, fov: 42 }),
      stage: (t) => (
        <>
          <Kai position={[0, 0, 1.8]} animation="reachUp" face="brave" time={t} />
          <FireflyJar position={[0.35, 1.75, 1.95]} open={clamp01(t / 0.8)} hasPip t={t} />
        </>
      ),
    },
    {
      cue: "6.fly",
      look: "overworld-storm",
      note: "Upward sweeping tilt following Pip rocketing skyward like a tiny golden star.",
      ...cam.sweep({ on: [0, 3.2, 1.6], dist: 5.4, fromYaw: -28, toYaw: 26, pitch: -8, fov: 44 }),
      stage: (t) => (
        <>
          <Kai position={[0, 0, 1.8]} animation="reachUp" face="wow" time={t} />
          <PipFirefly position={[0, lerp(1.65, 4.4, clamp01(t / 1.5)), 1.6]} scale={1.45} t={t} />
        </>
      ),
    },
    {
      cue: "6.call",
      look: "overworld-storm",
      note: "High crane past hovering Pip blinking three golden signals toward the dark pine woods.",
      ...cam.streetOverview({ from: [1.8, 0, 4.2], to: [-1.4, 0, -1.6], height: 4.6, fov: 46 }),
      stage: (t) => (
        <>
          <Kai position={[0, 0, 1.8]} rotationY={Math.PI} animation="idle" face="brave" time={t} />
          <PipFirefly position={[0, 4.2, -1.5]} scale={1.55} t={t} pulse={0.6 + 0.8 * Math.abs(Math.sin(t * 9))} />
        </>
      ),
    },
    {
      cue: "6.swarm",
      look: "lantern-night",
      note: "Epic high crane descending over the square as fifty glowing fireflies flood the entire street.",
      ...cam.streetOverview({ from: [-2.8, 0, 11.4], to: [2.2, 0, 6.0], height: 5.6, fov: 48 }),
      stage: (t) => (
        <>
          <FireflySwarm center={[0, 2.2, 0]} count={36} spread={10.5} t={t} />
          <Kai position={[0, 0, 1.8]} animation="cheer" face="happy" time={t} />
          <Townie who={1} position={[-2.4, 0, 2.0]} rotationY={0.4} animation="cheer" face="wow" time={t} />
          <Townie who={3} position={[2.4, 0, 2.0]} rotationY={-0.4} animation="cheer" face="happy" time={t} />
        </>
      ),
    },
  ],
});
