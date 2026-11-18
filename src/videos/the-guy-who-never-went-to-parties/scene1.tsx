import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { B, CHILD, Hero, PLACE, Player, ROBE, Villager, Vox, chestOf, faceOf, timing } from "./kit";

/**
 * BEAT 1 — THE HOOK (0:00–0:11).
 *
 * The premise in the first second: the whole town, at a party, and the teller walking the other way with a
 * box of vegetables. Every line of narration.md is one shot, in script order.
 *
 * Stacking: a 9:16 frame at 40 degrees is 23 degrees across. Two things go in it one above the other, never
 * side by side, so the crowds here are built by DEPTH and by putting people on the stall and the porch.
 */

const ME: Vec3 = [-2.2, 0, 1.0];

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The hook",
  shots: [
    {
      cue: "1.party",
      // The whole town at once, and it must read as a party in one second: people stacked into the depth of
      // the street, lanterns, and the teller's back at the bottom of the frame walking out of it.
      ...cam.push({ on: [0, 1.9, -0.5], dist: 12.0, to: 10.0, yaw: 6, pitch: 12, fov: 48 }),
      zone: "village",
      look: "overworld-sunset",
      note: "The rule of the town as one picture: everybody in the street dancing under lanterns, and the teller in the foreground walking the other way with a bag. It has to read in one second.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={Math.PI / 2} animation="walk" animDistance={t * 0.7} face="calm" />
          {/* stacked by depth: near and low, then further up the street and higher in frame */}
          <Villager position={[0.4, 0, 0.6]} robe={ROBE.red} phase={0.2} walk={Math.sin(t * 3) * 0.3} />
          <Villager position={[-0.9, 0, -0.8]} robe={ROBE.blue} phase={1.4} walk={Math.cos(t * 2.6) * 0.35} />
          <Villager position={[1.3, 0, -1.9]} robe={ROBE.white} phase={2.2} walk={Math.sin(t * 3.4 + 1) * 0.3} />
          <Villager position={[-2.2, 0, -2.6]} robe={ROBE.farmer} phase={0.9} walk={Math.cos(t * 2.2) * 0.3} />
          <Villager position={[0.2, 0, -3.6]} robe={ROBE.brown} phase={1.8} walk={Math.sin(t * 2.9) * 0.3} />
          <Player who={2} position={[2.2, 0, -0.6]} rotationY={-0.4} animation="idle" face="grin" />
          <Player who={5} position={[-1.6, 0, -3.9]} rotationY={0.7} animation="idle" face="laugh" />
          <Player who={9} position={[3.0, 0, -3.2]} rotationY={0.2} animation="idle" face="smile" />
        </>
      ),
    },
    {
      cue: "1.home",
      // Nobody leaves. The same crowd, but the camera is now low and pointing back at the house fronts: every
      // window is lit and every door is open, and nobody is going in.
      ...cam.truck({ on: [-1.0, 1.5, -2.0], dist: 6.4, yaw: -20, pitch: 9, fov: 46, by: [3.2, 0, 1.2] }),
      zone: "village",
      look: "overworld-sunset",
      note: "Nobody ever went home: the camera tracks past the house fronts at a low angle, every window lit, every door open, so the street reads as inside-out.",
      stage: (t) => (
        <>
          <Villager position={[-2.4, 0, -3.4]} robe={ROBE.friend} phase={0.4} walk={Math.sin(t * 3.1) * 0.4} />
          <Villager position={[0.6, 0, -3.0]} robe={ROBE.red} phase={1.5} walk={Math.cos(t * 2.7) * 0.4} />
          <Player who={3} position={[2.6, 0, -3.6]} rotationY={Math.PI + 0.4} animation="idle" face="grin" />
        </>
      ),
    },
    {
      cue: "1.dinner",
      // THE JOKE THAT SETS THE FILM. A long table in the street with a party on it and not one plate of food.
      ...cam.top({ on: [0.4, 0.74, 0.8], height: 5.4, to: 4.3, spin: [-8, 8], fov: 44 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Straight down on the party's table: bowls, glasses, confetti, a speaker, a birthday cake nobody has cut, and no food at all. The viewer should notice what is missing before the line says it.",
      stage: () => (
        <>
          <Vox kind="planks" tint="#c9a06a" position={[0.4, 0.72, 0.8]} size={[2.6, 0.08, 1.4]} />
          {[-0.6, 0.1, 0.8, 1.5].map((x) => (
            <Vox key={x} kind="wool" tint="#f7f4ea" position={[x - 1.1, 0.8, 0.8]} size={[0.3, 0.05, 0.3]} />
          ))}
          <Vox kind="wool" tint="#c8402f" position={[0.3, 0.86, 0.4]} size={[0.26, 0.12, 0.26]} />
          <Vox kind="wool" tint="#e8a21c" position={[1.1, 0.86, 1.1]} size={[0.22, 0.12, 0.22]} />
          <Vox kind="wool" tint="#8fd0ff" position={[-0.7, 0.86, 1.2]} size={[0.2, 0.1, 0.2]} />
          {/* the cake, whole, with the knife still lying beside it */}
          <Vox kind="wool" tint="#f7e8d8" position={[1.4, 0.9, 0.3]} size={[0.5, 0.24, 0.5]} />
          <Vox kind="wool" tint="#e8d0b0" position={[1.4, 1.04, 0.3]} size={[0.52, 0.04, 0.52]} />
          <Vox kind="wool" tint="#c8ced4" position={[0.75, 0.8, 0.15]} size={[0.4, 0.02, 0.07]} />
        </>
      ),
    },
    {
      cue: "1.me",
      // The teller in the crowd, not dancing, holding a bag of vegetables. Everyone around him is moving.
      ...cam.push({ on: chestOf(ME, 0.8), dist: 3.6, to: 3.0, yaw: -18, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Cut in to the teller standing still in a moving crowd, holding a paper bag of vegetables like a briefcase. The one person in the frame not at the party.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={0.35} animation="idle" face="uneasy" gaze={0} />
          <Vox kind="wool" tint="#b89a6a" position={[-2.6, 0.55, 1.25]} size={[0.34, 0.4, 0.24]} />
          <Vox kind="wool" tint="#5f9a3c" position={[-2.6, 0.78, 1.25]} size={[0.3, 0.1, 0.2]} />
          <Villager position={[0.2, 0, -1.4]} robe={ROBE.red} phase={t * 2} walk={Math.sin(t * 4) * 0.5} />
          <Player who={7} position={[-1.5, 0, -2.4]} rotationY={0.8} animation="idle" face="laugh" />
          <Player who={1} position={[1.8, 0, -3.0]} rotationY={-0.6} animation="idle" face="grin" />
        </>
      ),
    },
    {
      cue: "1.normal",
      // Everyone thinks this is normal, so: a two-shot of two villagers mid-dance, and NOTHING else in frame.
      // No food, no table, no plates. The normality is the joke.
      ...cam.orbit({ on: [0.6, 1.5, -1.2], dist: 5.2, distTo: 4.4, yaw: -32, yawTo: 16, pitch: 7, fov: 44 }),
      zone: "village",
      look: "overworld-sunset",
      note: "Two villagers dancing badly, entirely unbothered, with an empty street around them. No food anywhere. The town thinks this is normal.",
      stage: (t) => (
        <>
          <Villager position={[-0.4, 0, -1.0]} robe={ROBE.white} phase={0.3} walk={Math.sin(t * 3.6) * 0.5} tilt={Math.sin(t * 3.6) * 0.06} />
          <Villager position={[0.75, 0, -2.0]} robe={ROBE.brown} phase={1.7} walk={Math.cos(t * 3.2) * 0.5} tilt={Math.cos(t * 3.2) * 0.06} />
          <Villager position={[1.9, 0, -3.4]} robe={ROBE.farmer} phase={2.4} walk={Math.sin(t * 2.8) * 0.45} />
          <Villager position={[-1.9, 0, -3.0]} robe={ROBE.blue} phase={1.0} walk={Math.cos(t * 3.0) * 0.45} />
        </>
      ),
    },
    {
      cue: "1.cook",
      // The dream, said as a fact: he is now in his own bedroom under the poster of a chef, holding a knife.
      ...cam.push({ on: chestOf(B(0, 0, 0), 0.8), dist: 3.7, to: 3.1, yaw: -12, pitch: 8, fov: 40 }),
      zone: "room",
      look: "kitchen-day",
      note: "The teller alone in his bedroom under a hand-drawn poster of a chef, holding a kitchen knife like a sword. The want, in one picture.",
      stage: () => (
        <>
          <Hero position={B(0, 0, 0)} rotationY={0.2} animation="idle" face="brave" gaze={0} />
          <Vox kind="wool" tint="#c8ced4" position={B(0.34, 0.92, 0.24)} size={[0.05, 0.26, 0.05]} />
          <Vox kind="wool" tint="#8a6a44" position={B(0.34, 0.76, 0.24)} size={[0.09, 0.12, 0.06]} />
        </>
      ),
    },
    {
      cue: "1.chop",
      // THE HOOK'S PAYOFF: the first chop, close, in the kitchen, on the board. The film's central object.
      ...cam.push({ on: [0, 1.15, 400.3], dist: 3.5, to: 3.0, yaw: -24, pitch: 14, fov: 40 }),
      zone: "home",
      look: "kitchen-day",
      note: "Close on the cutting board: one onion, a knife coming down, and his hands. The object the whole film is about, in its own light.",
      stage: (t) => (
        <>
          <Vox kind="wool" tint="#d9c8a8" position={[-0.15, 0.9, 400.25]} size={[0.26, 0.18, 0.26]} />
          <Vox kind="wool" tint="#e8e2d0" position={[-0.42, 0.89, 400.3]} size={[0.12, 0.06, 0.12]} />
          <Vox kind="wool" tint="#c8ced4" position={[-0.1, 1.02 + Math.abs(Math.sin(t * 9)) * 0.12, 400]} size={[0.05, 0.3, 0.12]} />
          <Vox kind="wool" tint="#8a6a44" position={[-0.1, 0.92 + Math.abs(Math.sin(t * 9)) * 0.12, 400]} size={[0.06, 0.08, 0.16]} />
        </>
      ),
    },
  ],
});

// A kid's face: on faceOf(p), dist 1.9 -> 1.4, fov 36. Waist up: chestOf(p), 2.1 -> 1.6, fov 38-40.
void PLACE;
void CHILD;
void ROBE;
