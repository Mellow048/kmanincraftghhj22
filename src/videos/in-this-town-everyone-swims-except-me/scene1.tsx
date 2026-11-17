import { cam, storyScene } from "../../engine";
import {
  CHILD, Cast, Dive, Drops, EAST, Floatie, Hang, Hero, Kid, NORTH, P, PoolLife, Puffs, ROBE, SH, Splash, Swim, Villager, WEST, WL,
  laneZ, POOL, posed, timing, tw,
} from "./kit";

/**
 * 01 HOOK — the premise, the trophy, and the one thing he cannot do.
 *
 * Frame one is the whole film: four kids go off the blocks at the lens and one red shirt stays on the deck.
 * Then the prize (at his head's height, because it is as big as his head), the one kind of water he is fine
 * with, and what happens when it is any other kind.
 *
 * This lens (portrait 9:16, fov 40) sees 0.41 × the distance across and 0.73 × the distance up.
 * Pitch is POSITIVE when the camera is ABOVE what it looks at. Yaw 0 is a camera on the south (+Z) side.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.race",
      ...cam.push({ on: P(-9.5, 0.8, 0), dist: 8.6, to: 4.2, yaw: 90, pitch: 9, fov: 46 }),
      zone: "pool",
      look: "overworld-day",
      note: "From over the water: four kids go off the blocks straight at the lens and swim under it. The red shirt between the blocks does not move. The push ends on him.",
      stage: (t) => (
        <>
          <PoolLife lanes={[]} />
          {[1, 2, 3, 4].map((ln) => (
            <Dive key={ln} who={ln + 2} from={P(-8.6, 0.5, laneZ(ln, POOL))} heading={EAST} t={t} at={0.3 + ((ln * 3) % 4) * 0.06} speed={2.4} rate={1.5} seed={ln} />
          ))}
          <Hero position={P(-9.7, 0, 0)} rotationY={EAST} animation="idle" face={t < 1.1 ? "uneasy" : "frown"} headYaw={Math.sin(t * 2.2) * 0.5 * (1 - tw(t, 0.9, 1.3))} headPitch={tw(t, 1.0, 1.5) * 0.35} />
          <Villager position={P(-11.0, 0, -1.3)} rotationY={EAST} robe={ROBE.farmer} hmm={tw(t, 0.3, 0.7)} phase={0.5} />
          <Villager position={P(-11.6, 0, 1.2)} rotationY={EAST} robe={ROBE.blue} hmm={tw(t, 0.4, 0.8)} phase={1.5} />
          <Kid n={8} scale={0.56} position={P(-10.4, 0, 1.6)} rotationY={EAST} animation="cheer" face="laugh" phase={0.4} />
          <Kid n={1} scale={0.6} position={P(-10.5, 0, -2.0)} rotationY={EAST} animation="cheer" face="laugh" phase={1.4} />
        </>
      ),
    },
    {
      cue: "1.trophy",
      ...cam.orbit({ on: [0.42, 1.0, -3.3], dist: 3.4, distTo: 2.8, yaw: -22, yawTo: -8, pitch: 5, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "The cup in the hall window and his head beside the glass, the same size. He leans in until his nose is nearly on it, and grins.",
      stage: (t) => (
        <>
          <Hero position={[1.0, 0, -2.95]} rotationY={-1.95} pose={posed("idle", t, { bodyPitch: 0.2 + tw(t, 0.2, 0.9) * 0.28, bodyY: -0.1 })} face={t < 0.8 ? "surprised" : "grin"} headPitch={-0.2} />
          <Villager position={[3.6 - t * 0.9, 0, -1.9]} rotationY={WEST} robe={ROBE.blue} walk={t * 0.9} phase={0.6} />
        </>
      ),
    },
    {
      cue: "1.window",
      ...cam.push({ on: [0, 1.7, -3.2], dist: 5.0, to: 9.5, yaw: -18, pitch: 6, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "Pull back off the window: the hall, the square, the town going by with towels and rubber rings, and him still at the glass with his back to all of it.",
      stage: (t) => (
        <>
          <Hero position={[0.2, 0, -2.5]} rotationY={NORTH} animation="idle" headPitch={0.15} face="smile" />
          {[0, 1, 2, 3].map((i) => (
            <Kid key={i} n={i + 3} position={[-7 + i * 1.7 + t * 3.1, 0, -0.6 + (i % 2) * 1.1]} rotationY={EAST} animation="run" animDistance={t * 3.1 + i} face="laugh">
              {i % 2 === 0 ? <Floatie position={[0, -0.05, 0.1]} color={i ? "#e86aa8" : "#f0c030"} scale={0.7} /> : null}
            </Kid>
          ))}
          <Villager position={[-4 + t * 1.2, 0, 1.6]} rotationY={EAST} robe={ROBE.white} walk={t * 1.2} phase={0.2} />
          <Villager position={[1.5 + t * 1.0, 0, 1.9]} rotationY={EAST} robe={ROBE.brown} walk={t * 1.0} phase={1.4} />
          <Villager position={[3.5 + t * 1.1, 0, 0.4]} rotationY={EAST} robe={ROBE.farmer} kid scale={CHILD} walk={t * 1.1} phase={2.1} />
        </>
      ),
    },
    {
      cue: "1.shower",
      ...cam.push({ on: SH(0, 1.0, -0.5), dist: 4.1, to: 3.1, yaw: 16, pitch: 5, fov: 40 }),
      zone: "home",
      look: "warm-room",
      note: "The one kind of water he is fine with: under the shower, eyes shut, washing his hair with both hands, steam coming up. On 'swim' his arms stop.",
      stage: (t) => {
        const stop = tw(t, 0.85, 1.1);
        return (
          <>
            <Hero
              position={SH(0, 0, -0.55)}
              rotationY={0.15}
              pose={posed("idle", t, {
                armR: [-2.5 + Math.sin(t * 9) * 0.25 * (1 - stop) + stop * 2.3, 0, 0.35],
                armL: [-2.5 - Math.sin(t * 9) * 0.25 * (1 - stop) + stop * 2.3, 0, -0.35],
                bodyY: Math.abs(Math.sin(t * 4.5)) * 0.03 * (1 - stop),
              })}
              face={stop > 0.5 ? "frown" : "laugh"}
              headPitch={-0.2 + stop * 0.35}
            />
            <Drops top={SH(0, 2.55, -0.72)} t={t} height={2.5} spread={0.3} n={46} />
            <Puffs position={SH(0, 0.2, -0.3)} color="#ffffff" count={5} rise={1.0 + t * 0.3} spread={1.0} size={0.22} />
          </>
        );
      },
    },
    {
      cue: "1.toes",
      ...cam.push({ on: P(-5, 0.3, 3.75), dist: 2.7, to: 2.0, yaw: 152, pitch: 10, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "From the water: he sits on the edge and lets himself down a finger at a time. The water comes up over his toes.",
      stage: (t) => (
        <>
          <PoolLife />
          <Hero position={P(-5, -0.27 - tw(t, 0.1, 1.0) * 0.13, 4.02)} rotationY={NORTH} animation="sit" face={t < 0.7 ? "uneasy" : "fear"} headPitch={0.5} />
          <Splash at={P(-5, WL, 3.72)} k={(t - 0.75) / 0.5} size={0.35} n={6} />
        </>
      ),
    },
    {
      cue: "1.toes",
      cut: 1.2,
      ...cam.push({ on: P(-5, 0.75, 5.0), dist: 5.2, to: 4.4, yaw: 205, pitch: 9, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "And he is gone: backwards up the deck with both arms in the air, while a kid half his size treads water and watches him go.",
      stage: (t) => (
        <>
          <PoolLife />
          <Hero position={P(-5, 0, 4.5 + tw(t, 0, 0.8) * 1.5)} rotationY={NORTH} animation="panic" face="fear" />
          <Swim who={4} at={P(-4.1, WL, 2.6)} heading={0.3} mode="tread" t={t} seed={3} face="neutral" />
          <Splash at={P(-5, WL, 3.7)} k={t / 0.6} size={0.8} />
        </>
      ),
    },
    {
      cue: "1.worm",
      ...cam.orbit({ on: P(-5, -0.1, 2.3), dist: 5.2, distTo: 4.4, yaw: 25, yawTo: -20, pitch: 46, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "From above: him in the shallow end, every limb going a different way, in a ring of white water. A small kid on a float drifts through it and out again.",
      stage: (t) => (
        <>
          <PoolLife lanes={[1]} />
          <Swim at={P(-5 + Math.sin(t * 5) * 0.2, WL, 2.3 + Math.cos(t * 4) * 0.15)} heading={t * 2.6} mode="flail" t={t} rate={1.4} face="fear" foam={1.3} />
          {[0, 1, 2].map((i) => (
            <Splash key={i} at={P(-5 + Math.cos(i * 2.1) * 0.6, WL, 2.3 + Math.sin(i * 2.1) * 0.6)} k={((t * 1.6 + i * 0.33) % 1)} size={0.7} seed={i + 2} />
          ))}
          <Cast who={2} scale={0.56} position={P(-7.2 + t * 1.1, -0.72, 3.2 - t * 0.35)} rotationY={EAST} animation="sit" face="smile" shadow={false} />
          <Floatie position={P(-7.2 + t * 1.1, WL + 0.05, 3.2 - t * 0.35)} color="#f0c030" scale={1.1} />
        </>
      ),
    },
    {
      cue: "1.want",
      ...cam.push({ on: P(-5, 0.12, 3.6), dist: 2.5, to: 1.7, yaw: 12, pitch: 24, fov: 36 }),
      zone: "pool",
      look: "overworld-day",
      note: "Close, from the deck: he hangs off the wall by both hands, water running off his hair, and his face has changed. He looks up past the lens.",
      stage: (t) => (
        <>
          <PoolLife />
          <Hang wall={P(-5, 0, 4.0)} heading={0} k={0.55} t={t} kick={0.1} face="brave" headPitch={-0.1 - tw(t, 0.1, 0.6) * 0.3} />
          <Drops top={P(-5, 0.25, 3.72)} t={t} height={0.4} spread={0.14} n={8} speed={1.6} />
        </>
      ),
    },
  ],
});
