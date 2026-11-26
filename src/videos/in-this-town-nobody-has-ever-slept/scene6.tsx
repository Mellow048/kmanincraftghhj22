import { Block, cam, storyScene } from "../../engine";
import {
  Baker,
  Bubble,
  EAST,
  Hero,
  Hole,
  LavaBucket,
  Mum,
  NORTH,
  PLACE,
  ROBE,
  SOUTH,
  SoupCauldron,
  Villager,
  WEST,
  ease,
  faceOf,
  pop,
  ramp,
  timing,
  wordAt,
} from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The Price",
  shots: [
    {
      cue: "6.ash",
      ...cam.push({ on: [0, 0.8, 2.2], dist: 3.4, to: 1.9, yaw: -20, pitch: 8, fov: 38 }),
      zone: "nether",
      look: "lava-shore",
      note: "Soaked in soot Hero blinks awake on blasted stone crater edge while angry villagers hoist him by collar.",
      stage: (t) => {
        const HANDS = wordAt("6.ash", "hands");
        const lift = ease(ramp(t, HANDS, HANDS + 0.55));
        return (
          <>
            <Hole position={[0, 0.02, 2]} size={2.1} rim="#1b1514" />
            <Hero position={[0, 0.12 + lift * 0.35, 2]} rotationY={0.15} animation={t < HANDS ? "shrug" : "scared"} face="ouch" time={t} />
            <Villager robe={ROBE.smith} position={[-1.05, 0, 1.85]} rotationY={EAST} lean={0.28} strain={0.75} />
            <Villager robe={ROBE.brown} position={[1.05, 0, 1.85]} rotationY={WEST} lean={0.28} strain={0.75} />
          </>
        );
      },
    },
    {
      cue: "6.soup",
      ...cam.truck({ on: [PLACE.soupShed[0] - 0.6, 1.0, PLACE.soupShed[2] + 2.2], by: [2.4, 0, 0.2], dist: 3.8, yaw: 14, pitch: 10, fov: 40 }),
      zone: "nether",
      look: "lava-shore",
      note: "Tracker slides past splintered timber beam and overturned tipped cauldron spilling cold brown broth.",
      stage: (t) => {
        const SOUP = wordAt("6.soup", "soup");
        return (
          <>
            <SoupCauldron position={[PLACE.soupShed[0] + 1.1, 0, PLACE.soupShed[2] + 2.2]} heat={0} broken />
            <Block position={[PLACE.soupShed[0] - 0.3, 0.14, PLACE.soupShed[2] + 2.5]} rotation={[0, 0.4, 0.05]} size={[2.2, 0.22, 0.3]} color="#3a2720" />
            <Baker position={[PLACE.soupShed[0] + 2.2 - ramp(t, 0, 1) * 0.25, 0, PLACE.soupShed[2] + 2.7]} rotationY={WEST} lean={0.35} nod={0.45 * ramp(t, SOUP, SOUP + 0.5)} />
            <Bubble text="RUINED" position={[PLACE.soupShed[0] + 1.2, 1.75, PLACE.soupShed[2] + 2.4]} dark rotationY={0.15} scale={pop(t, SOUP)} />
          </>
        );
      },
    },
    {
      cue: "6.cold",
      ...cam.orbit({ on: [0, 1.15, 2], dist: 4.5, yaw: 28, yawTo: -22, pitch: 8, fov: 42 }),
      zone: "nether",
      look: "lava-shore",
      note: "Orbit sweeps past grim sullen line of townsfolk staring hard at guilty Hero beside unheated soup buckets.",
      stage: (t) => {
        const COLD = wordAt("6.cold", "cold");
        return (
          <>
            <Hero position={[-1.4, 0, 2.3]} rotationY={EAST} animation="shrug" face="frown" headPitch={0.35} time={t} />
            {[
              [0.5, 1.6, ROBE.brown],
              [1.5, 2.3, ROBE.white],
              [2.2, 1.2, ROBE.elder],
              [2.8, 2.5, ROBE.red],
            ].map(([vx, vz, r], i) => (
              <Villager key={i} robe={r as string} position={[vx as number, 0, vz as number]} lookAt={[-1.4, 0.8, 2.3]} nod={t > COLD ? 0.15 : 0} />
            ))}
          </>
        );
      },
    },
    {
      cue: "6.job",
      ...cam.crane({ on: [0, 0.9, -1], dist: 4.9, yaw: -24, fromPitch: 12, toPitch: 22, fov: 44 }),
      zone: "under",
      look: "lava-shore",
      note: "Hero trudge alone across glowing cavern rock bridge hauling twin heavy lava pails as punishment.",
      stage: (t) => {
        const ALONE = wordAt("6.job", "alone");
        const march = ease(ramp(t, 0, 2.4));
        return (
          <>
            <Hero
              position={[0, 0, 3.2 - march * 4.4]}
              rotationY={NORTH}
              animation="hold"
              animDistance={t * 1.1}
              face={t < ALONE ? "worried" : "frown"}
              headPitch={0.22}
              time={t}
            />
            <LavaBucket position={[0.45, 0.68, 3.2 - march * 4.4]} scale={0.55} swing={Math.sin(t * 4) * 0.2} />
            <LavaBucket position={[-0.45, 0.68, 3.2 - march * 4.4]} scale={0.55} swing={-Math.sin(t * 4) * 0.2} />
          </>
        );
      },
    },
  ],
});
