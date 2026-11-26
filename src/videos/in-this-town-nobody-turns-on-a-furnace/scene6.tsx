import {
  FloatingNumber,
  Hero,
  PLACE,
  Player,
  Smoke,
  SnowGolem,
  Snowball,
  SubscribeSign,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "All Four Kids Safe, Rebuild & Goofy Grin Payoff",
  shots: [
    {
      cue: "8.clear",
      ...cam.crane({
        on: [PLACE.bakery[0], 1.4, PLACE.bakery[2] - 0.8],
        onTo: [PLACE.bakery[0], 2.6, PLACE.bakery[2] - 1.5],
        dist: 4.3,
        toDist: 2.9,
        yaw: -14,
        fromPitch: 10,
        toPitch: -12,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "bakery",
      note: "Camera cranes up dying smoke plume as Hero stumbles forward waving soot clear of his face.",
      stage: (t) => (
        <>
          <Smoke position={[PLACE.bakery[0], 3.1 + t * 0.55, PLACE.bakery[2] - 2.0]} rise={2.3} count={10} opacity={0.35} />
          <Hero position={[PLACE.bakery[0] - 0.15 + t * 0.25, 0, PLACE.bakery[2] + 0.15 + t * 0.45]} rotationY={0.25} animation="wave" animDistance={t * 0.7} face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "8.kids",
      ...cam.truck({
        on: [PLACE.bakery[0], 1.15, PLACE.bakery[2] + 0.9],
        by: [0, 0, 1.45],
        dist: 4.1,
        yaw: 14,
        pitch: 8,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "All 4 kids sprint together straight toward camera out of doorway onto sunlit cobblestones.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 0.42, 0, PLACE.bakery[2] + 0.5 + t * 1.45]} rotationY={0} animation="run" animDistance={t * 2.2} face="brave" />
          <Player who={2} scale={0.8} position={[PLACE.bakery[0] + 0.42, 0, PLACE.bakery[2] + 0.45 + t * 1.4]} rotationY={0} animation="run" animDistance={t * 2.1} face="wow" />
          <Player who={1} scale={0.8} position={[PLACE.bakery[0] - 0.18, 0, PLACE.bakery[2] - 0.05 + t * 1.35]} rotationY={0} animation="run" animDistance={t * 2.0} face="uneasy" />
          <Player who={3} scale={0.8} position={[PLACE.bakery[0] + 0.25, 0, PLACE.bakery[2] - 0.1 + t * 1.35]} rotationY={0} animation="run" animDistance={t * 2.0} face="brave" />
        </>
      ),
    },
    {
      cue: "8.puddle",
      ...cam.push({
        on: [PLACE.bakery[0] - 0.2, 1.0, PLACE.bakery[2] + 0.3],
        dist: 3.5,
        to: 2.15,
        yaw: 16,
        pitch: 10,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Hero stops sharply and runs back inside dropping to his knees beside Dad's melting silhouette.",
      stage: (t) => {
        const back = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Hero
              position={[PLACE.bakery[0] - 0.75 + back * 0.3, 0, PLACE.bakery[2] + 0.9 - back * 0.45]}
              rotationY={2.5}
              animation={back < 0.6 ? "run" : "crouch"}
              animDistance={back * 0.7}
              face="frown"
              time={t}
            />
            <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.2]} rotationY={0.1} pumpkin melt={0.93 + back * 0.03} />
          </>
        );
      },
    },
    {
      cue: "8.left",
      ...cam.top({
        on: [PLACE.bakery[0], 0.35, PLACE.bakery[2] - 0.1],
        height: 2.9,
        to: 1.55,
        spin: [-18, 16],
        fov: 40,
      }),
      zone: "bakery",
      note: "Top-down spin diving into puddle as Hero creeps closer reaching tenderly toward Dad's pumpkin.",
      stage: (t) => {
        const reach = ease(ramp(t, 0, 1.2));
        return (
          <>
            <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.1]} rotationY={0.1} pumpkin melt={0.95} />
            <Hero position={[PLACE.bakery[0] - 0.9 + reach * 0.35, 0, PLACE.bakery[2] + 0.45 - reach * 0.15]} rotationY={0.9} animation={reach < 0.5 ? "crouch" : "reach"} face="frown" time={t} />
          </>
        );
      },
    },
    {
      cue: "9.cry",
      ...cam.push({
        on: [PLACE.bakery[0] - 0.2, 0.95, PLACE.bakery[2] + 0.4],
        dist: 3.6,
        to: 2.2,
        yaw: 18,
        pitch: 9,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Hero bursts straight back inside hoisting giant freshly packed snowball high above Dad.",
      stage: (t) => {
        const run = ease(ramp(t, 0, 1.0));
        return (
          <>
            <Hero position={[PLACE.bakery[0] - 1.1 + run * 0.65, 0, PLACE.bakery[2] + 0.9 - run * 0.35]} rotationY={0.65} animation="run" animDistance={t * 1.9} face="brave">
              <Snowball position={[0, -0.05, 0.2]} scale={1.35} />
            </Hero>
            <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.1]} rotationY={0.1} pumpkin melt={0.92} />
          </>
        );
      },
    },
    {
      cue: "9.save",
      ...cam.orbit({
        on: [PLACE.bakery[0] - 0.1, 1.05, PLACE.bakery[2] + 0.1],
        dist: 3.8,
        distTo: 2.75,
        yaw: -24,
        yawTo: 22,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Hero lifts and stacks bright white blocks back onto Dad as Dad rises block by block with green +2 HP.",
      stage: (t) => {
        const heal = ease(ramp(t, 0.1, 1.35));
        return (
          <>
            <SnowGolem position={[PLACE.bakery[0] + 0.1, 0, PLACE.bakery[2]]} rotationY={0.15} pumpkin melt={0.92 * (1 - heal)} />
            <Hero position={[PLACE.bakery[0] - 0.72, 0, PLACE.bakery[2] + 0.35]} rotationY={0.85} animation="lift" blendTo="reach" blend={1 - heal} face="happy" time={t} />
            <FloatingNumber text="+2 HP" color="#3fd46a" position={[PLACE.bakery[0] + 0.1, 1.85 + heal * 0.2, PLACE.bakery[2]]} height={0.34 * pop(t, 0.4)} />
          </>
        );
      },
    },
    {
      cue: "9.love",
      ...cam.orbit({
        on: [1.4, 1.25, -1.1],
        dist: 4.5,
        distTo: 3.25,
        yaw: -28,
        yawTo: 18,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Hero runs cleanly between Mum & unmasked grinning Dad for a warm family hug in the sunlit square.",
      stage: (t) => {
        const hug = ease(ramp(t, 0, 1.0));
        return (
          <>
            <SnowGolem position={[0.75 + hug * 0.15, 0, -1.1]} rotationY={0.35} pumpkin={false} walk={hug * 0.15} />
            <SnowGolem position={[2.05 - hug * 0.15, 0, -1.4]} rotationY={-0.1} pumpkin walk={hug * 0.15} />
            <Hero
              position={[1.4, 0, -0.35 - hug * 0.45]}
              rotationY={0.2}
              animation={hug > 0.55 ? "hug" : "run"}
              animDistance={hug * 0.7}
              face="smile"
              time={t}
            />
          </>
        );
      },
    },
    {
      cue: "9.home",
      ...cam.push({
        on: [1.2, 1.32, -0.9],
        dist: 3.3,
        to: 2.1,
        yaw: -20,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Close warm family beat as unmasked Dad nudges beside laughing Hero jumping joyfully.",
      stage: (t) => (
        <>
          <SnowGolem position={[0.85 + t * 0.1, 0, -1.05]} rotationY={0.35} pumpkin={false} walk={t * 1.4} armThrow={Math.sin(t * 5) * 0.3} />
          <Hero position={[1.55, 0, -0.75]} rotationY={-0.18} animation="cheer" face="happy" time={t} />
        </>
      ),
    },
    {
      cue: "10.sub",
      ...cam.push({
        on: [1.4, 1.25, -0.9],
        dist: 4.5,
        to: 3.2,
        yaw: -24,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.08],
      }),
      zone: "town",
      note: "SubscribeSign bursts overhead as unmasked Dad tosses snowball up and Hero steps forward waving joyfully.",
      stage: (t) => (
        <>
          <SnowGolem position={[0.9, 0, -1.05]} rotationY={0.35} pumpkin={false} armThrow={-0.6 + Math.sin(t * 7) * 0.5} />
          <Hero position={[1.65, 0, -0.9 + Math.min(0.45, t * 0.4)]} rotationY={0.15} animation="wave" face="grin" time={t} />
          <SubscribeSign position={[1.35, 2.35, -1.1]} rotationY={-0.35} scale={pop(t, 0.15) * 0.9} />
        </>
      ),
    },
  ],
});
