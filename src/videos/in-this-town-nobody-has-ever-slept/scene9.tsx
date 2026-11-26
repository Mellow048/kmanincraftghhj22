import { Block, cam, storyScene } from "../../engine";
import {
  Bubble,
  EAST,
  Hero,
  NORTH,
  OldWick,
  PLACE,
  ROBE,
  RuinedDoor,
  SOUTH,
  Villager,
  WEST,
  ease,
  pop,
  ramp,
  timing,
  wordAt,
} from "./kit";

export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The Other Side",
  shots: [
    {
      cue: "9.flint",
      ...cam.push({ on: [1.1, 0.85, -3.4], dist: 2.8, to: 1.65, yaw: 20, pitch: 6, fov: 34 }),
      zone: "under",
      look: "lava-shore",
      note: "Close push as Old Wick lifts glinting silver flint-and-steel from ancient sleeve and presses it into Hero's eager hands.",
      stage: (t) => {
        const FLINT = wordAt("9.flint", "flint");
        const k = ease(ramp(t, FLINT, FLINT + 0.55));
        return (
          <>
            <RuinedDoor position={PLACE.portal} lit={0} t={t} />
            <OldWick position={[1.8, -0.5, -3.9]} sit rotationY={WEST} lean={0.18 * k} />
            <Hero position={[0.45, 0, -3.1]} rotationY={EAST - 0.35} animation="reach" face="wow" time={t} />
            <Block position={[1.3 - k * 0.55, 0.72 + Math.sin(k * Math.PI) * 0.25, -3.45 + k * 0.2]} rotation={[k * 2, k * 3, 0]} size={[0.2, 0.2, 0.12]} color="#c9d4e3" emissive="#9ac8ff" emissiveIntensity={0.45} />
          </>
        );
      },
    },
    {
      cue: "9.lit",
      ...cam.whip({ from: [-2.0, 2.2, -1.8], on: [-1.4, 1.8, -5.8], onTo: [1.0, 2.0, -6.5], fov: 42 }),
      impacts: [{ at: 0.4, amp: 0.1, dur: 0.4 }],
      zone: "under",
      look: "lava-shore",
      note: "Sparks ignite towering swirling purple portal veil as Hero leaps straight through into radiant violet glow.",
      stage: (t) => {
        const LIT = wordAt("9.lit", "lit");
        const litAmt = ease(ramp(t, LIT, LIT + 0.45));
        const enter = ease(ramp(t, LIT + 0.35, LIT + 1.35));
        return (
          <>
            <RuinedDoor position={PLACE.portal} lit={litAmt} t={t} />
            <Hero
              position={[0, 0, -4.3 - enter * 2.2]}
              rotationY={NORTH}
              animation="run"
              animDistance={t * 2.2}
              face="brave"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "9.sky",
      ...cam.crane({ on: [0, 1.5, -2.5], dist: 5.2, yaw: -18, fromPitch: 6, toPitch: -18, fov: 46 }),
      zone: "overworld",
      look: "overworld-night",
      note: "Camera tilts up over dewy green hillocks into vast dark blue Overworld sky where stars shimmer quietly.",
      stage: (t) => {
        const DARK = wordAt("9.sky", "dark");
        return (
          <>
            <Hero
              position={[0, 0, -4.8 + ease(ramp(t, 0, 1.8)) * 2.3]}
              rotationY={0.15}
              animation={t < DARK ? "walk" : "lookAround"}
              animDistance={t * 1.1}
              headPitch={-0.65}
              face="wow"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "9.asleep",
      ...cam.truck({ on: [-4.5, 1.1, 3.8], by: [9.0, 0, 0], dist: 5.2, yaw: 12, pitch: 12, fov: 44 }),
      zone: "overworld",
      look: "overworld-night",
      note: "Gentle truck sweeps past Overworld cottages and cosy wool beds where peaceful villagers lie fast asleep.",
      stage: (t) => {
        const ASLEEP = wordAt("9.asleep", "asleep");
        return (
          <>
            <group position={[-4.5, 0.56, 4.0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
              <Villager robe={ROBE.brown} position={[0, 0, 0]} nod={Math.sin(t * 1.4) * 0.05} />
            </group>
            <group position={[4.5, 0.56, 4.0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
              <Villager robe={ROBE.blue} position={[0, 0, 0]} nod={Math.cos(t * 1.4) * 0.05} />
            </group>
            <Hero position={[-1.4 + t * 1.0, 0, 2.2]} rotationY={EAST} animation="walk" animDistance={t * 0.8} face="smile" time={t} />
            <Bubble text="Zzz..." position={[-4.5, 1.5, 4.0]} dark rotationY={0.15} scale={pop(t, ASLEEP)} />
          </>
        );
      },
    },
    {
      cue: "9.best",
      ...cam.push({ on: [0, 1.15, 2.0], dist: 3.4, to: 1.9, yaw: 20, pitch: 4, fov: 36 }),
      zone: "overworld",
      look: "overworld-night",
      note: "Slow awe-struck push on Hero standing silent tearful beneath starry Overworld village peace.",
      stage: (t) => {
        const BEST = wordAt("9.best", "beautiful");
        return (
          <>
            <Hero
              position={[0, 0, 2.0 - ramp(t, 0, 2) * 0.25]}
              rotationY={-0.25}
              animation={t < BEST ? "idle" : "wave"}
              face="smile"
              headPitch={-0.18}
              time={t}
            />
            <Bubble text="PEACE" position={[0.7, 1.7, 2.0]} dark rotationY={-0.2} scale={pop(t, BEST)} />
          </>
        );
      },
    },
  ],
});
