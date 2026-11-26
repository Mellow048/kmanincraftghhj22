import { Block, cam, storyScene } from "../../engine";
import {
  Bubble,
  EAST,
  Hero,
  NORTH,
  OldWick,
  PLACE,
  RuinedDoor,
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

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The Reveal",
  shots: [
    {
      cue: "8.boy",
      ...cam.ots({ speaker: [2.1, 0.55, -4.1], listener: [0.6, 0.95, -3.0], back: 2.0, push: 0.72, height: 1.15, fov: 36 }),
      zone: "under",
      look: "lava-shore",
      note: "Over Hero's shoulder as Old Wick gazes softly upward recalling golden dawn mornings long vanished.",
      stage: (t) => {
        const MORN = wordAt("8.boy", "morning");
        return (
          <>
            <RuinedDoor position={PLACE.portal} lit={0} t={t} />
            <Hero position={[0.6, 0, -3.0]} rotationY={NORTH + 0.5} animation="idle" face="calm" time={t} />
            <OldWick position={[2.1, -0.5, -4.1]} sit rotationY={WEST + 0.3} nod={-0.28 * ramp(t, 0, MORN)} turn={0.18 * Math.sin(t * 2)} />
            <Bubble text="MORNING" position={[2.1, 1.55, -4.1]} dark rotationY={-0.3} scale={pop(t, MORN)} />
          </>
        );
      },
    },
    {
      cue: "8.sky",
      ...cam.crane({ on: [0, 2.2, -5.8], dist: 4.5, yaw: 18, fromPitch: 4, toPitch: -12, fov: 44 }),
      zone: "overworld",
      look: "overworld-night",
      note: "Dream flashback sweeps up past green meadow tree crowns under deep dark starry Overworld night sky.",
      stage: (t) => {
        const GRASS = wordAt("8.sky", "grass");
        return (
          <>
            <Hero
              position={[-1.0 + ease(ramp(t, 0, 1.8)) * 2.0, 0, -3.5]}
              rotationY={0.2}
              animation="walk"
              animDistance={t * 1.1}
              face={t < GRASS ? "wow" : "smile"}
              headPitch={-0.45}
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "8.out",
      ...cam.push({ on: [0, 2.2, -6.5], dist: 4.8, to: 2.6, yaw: -16, pitch: 6, fov: 40 }),
      zone: "under",
      look: "lava-shore",
      note: "Sudden cold snap back to darkened ruined portal flickering violently once before dying black.",
      stage: (t) => {
        const OUT = wordAt("8.out", "out");
        const flash = t < OUT ? Math.max(0, Math.sin(t * 22) * 0.45) : 0;
        return (
          <>
            <RuinedDoor position={PLACE.portal} lit={flash} t={t} />
            <OldWick position={[2.0, -0.5, -4.1]} sit rotationY={WEST + 0.3} lean={0.2 * ramp(t, OUT, OUT + 0.5)} />
            <Hero position={[0.4, 0, -3.0]} rotationY={NORTH} animation="scared" face="fear" time={t} />
          </>
        );
      },
    },
    {
      cue: "8.short",
      ...cam.orbit({ on: villagerFace([2.0, 0.35, -4.1]), dist: 2.6, yaw: -20, yawTo: 24, pitch: 8, fov: 36 }),
      zone: "under",
      look: "lava-shore",
      note: "Orbital closeup past Old Wick sitting bowed while ancient soot-stained obsidian arch looms cold behind.",
      stage: (t) => {
        const THOUS = wordAt("8.short", "thousand");
        return (
          <>
            <RuinedDoor position={PLACE.portal} lit={0} t={t} />
            <OldWick position={[2.0, -0.5, -4.1]} sit rotationY={WEST + 0.25} nod={0.25 + 0.1 * Math.sin(t * 2)} />
            <Bubble text="4,000 SHIFTS" position={[1.9, 1.6, -4.1]} dark rotationY={0.15} scale={pop(t, THOUS)} />
          </>
        );
      },
    },
    {
      cue: "8.reason",
      ...cam.dollyZoom({ on: faceOf([0.2, 0, -3.1]), dist: 2.5, to: 1.7, fov: 42, yaw: 18, pitch: 4 }),
      zone: "under",
      look: "lava-shore",
      note: "Dolly-zoom epiphany on Hero's widened eyes realizing nobody here couldn't sleep—everyone simply forgot how.",
      stage: (t) => {
        const FORGOT = wordAt("8.reason", "forgotten");
        return (
          <>
            <RuinedDoor position={PLACE.portal} lit={0} t={t} />
            <Hero
              position={[0.2, 0, -3.1]}
              rotationY={0.2}
              animation={t < FORGOT ? "idle" : "point"}
              face="wow"
              headPitch={-0.1}
              time={t}
            />
            <Block position={[0.2, 1.85, -3.1]} size={[0.16, 0.16, 0.16]} color="#ffe57a" emissive="#ffc43b" emissiveIntensity={ramp(t, FORGOT, FORGOT + 0.4)} />
          </>
        );
      },
    },
  ],
});
