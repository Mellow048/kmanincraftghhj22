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
      ...cam.push({
        on: [PLACE.bakery[0], 2.2, PLACE.bakery[2] - 1.2],
        dist: 3.8,
        to: 3.1,
        yaw: -10,
        pitch: 4,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "bakery",
      note: "Final flames hiss out leaving gentle grey Smoke rising over the saved timber roof.",
      stage: (t) => (
        <>
          <Smoke position={[PLACE.bakery[0], 3.1 + t * 0.45, PLACE.bakery[2] - 2.0]} rise={2.2} count={10} opacity={0.35} />
          <Hero position={[PLACE.bakery[0], 0, PLACE.bakery[2] + 0.4]} rotationY={Math.PI} animation="lookAround" face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "8.kids",
      ...cam.push({
        on: [PLACE.bakery[0], 1.15, PLACE.bakery[2] + 1.1],
        dist: 4.2,
        to: 3.4,
        yaw: 12,
        pitch: 8,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Exact 4-kid continuity: Hero and all 3 other kids scramble out together onto the cobblestones.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 0.42, 0, PLACE.bakery[2] + 1.1 + t * 0.45]} rotationY={0} animation="run" animDistance={t * 1.6} face="brave" />
          <Player who={2} scale={0.8} position={[PLACE.bakery[0] + 0.42, 0, PLACE.bakery[2] + 1.05 + t * 0.45]} rotationY={0} animation="run" animDistance={t * 1.5} face="wow" />
          <Player who={1} scale={0.8} position={[PLACE.bakery[0] - 0.18, 0, PLACE.bakery[2] + 0.45 + t * 0.45]} rotationY={0} animation="run" animDistance={t * 1.5} face="uneasy" />
          <Player who={3} scale={0.8} position={[PLACE.bakery[0] + 0.25, 0, PLACE.bakery[2] + 0.4 + t * 0.45]} rotationY={0} animation="run" animDistance={t * 1.5} face="brave" />
        </>
      ),
    },
    {
      cue: "8.puddle",
      ...cam.push({
        on: [PLACE.bakery[0] - 0.2, 1.05, PLACE.bakery[2] + 0.3],
        dist: 2.9,
        to: 2.3,
        yaw: 14,
        pitch: 10,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Hero stops outside turning back anxiously through the silent doorway.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 0.45, 0, PLACE.bakery[2] + 0.5]} rotationY={2.5} animation="crouch" face="frown" time={t} />
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.2]} rotationY={0.1} pumpkin melt={0.95} />
        </>
      ),
    },
    {
      cue: "8.left",
      ...cam.top({
        on: [PLACE.bakery[0], 0.35, PLACE.bakery[2] - 0.1],
        height: 2.1,
        to: 1.65,
        spin: [-6, 8],
        fov: 38,
      }),
      zone: "bakery",
      note: "Top-down held beat over carved pumpkin on tiny melting slab beside Hero crouching gently.",
      stage: (t) => (
        <>
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.1]} rotationY={0.1} pumpkin melt={0.95} walk={t * 0.1} />
          <Hero position={[PLACE.bakery[0] - 0.65, 0, PLACE.bakery[2] + 0.35]} rotationY={0.85} animation="crouch" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "9.cry",
      ...cam.push({
        on: [PLACE.bakery[0] - 0.2, 0.95, PLACE.bakery[2] + 0.4],
        dist: 3.1,
        to: 2.55,
        yaw: 16,
        pitch: 9,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Hero sprints straight back inside cradling fresh white snowballs scooped off the grass.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 0.85 + t * 0.45, 0, PLACE.bakery[2] + 0.65]} rotationY={0.65} animation="run" animDistance={t * 1.6} face="brave">
            <Snowball position={[0, -0.05, 0.2]} scale={1.3} />
          </Hero>
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.1]} rotationY={0.1} pumpkin melt={0.92} />
        </>
      ),
    },
    {
      cue: "9.save",
      ...cam.orbit({
        on: [PLACE.bakery[0] - 0.1, 1.05, PLACE.bakery[2] + 0.1],
        dist: 3.4,
        yaw: -14,
        yawTo: 12,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "bakery",
      note: "Hero packs fresh white snow stacking Dad back to full height with bright green +2 HP.",
      stage: (t) => {
        const heal = ease(ramp(t, 0.15, 1.4));
        return (
          <>
            <SnowGolem position={[PLACE.bakery[0] + 0.1, 0, PLACE.bakery[2]]} rotationY={0.15} pumpkin melt={0.92 * (1 - heal)} />
            <Hero position={[PLACE.bakery[0] - 0.65, 0, PLACE.bakery[2] + 0.35]} rotationY={0.8} animation="lift" face="happy" time={t} />
            <FloatingNumber text="+2 HP" color="#3fd46a" position={[PLACE.bakery[0] + 0.1, 1.85, PLACE.bakery[2]]} height={0.32 * pop(t, 0.45)} />
          </>
        );
      },
    },
    {
      cue: "9.love",
      ...cam.push({
        on: [1.5, 1.25, -1.2],
        dist: 4.3,
        to: 3.55,
        yaw: -24,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Village square payoff framed toward the cozy plank/blue-roof house, striped Stall & green oak trees.",
      stage: (t) => (
        <>
          <SnowGolem position={[0.9, 0, -1.1]} rotationY={0.35} pumpkin={false} walk={t * 0.15} />
          <SnowGolem position={[1.95, 0, -1.5]} rotationY={-0.1} pumpkin walk={t * 0.15} />
          <Hero position={[1.4, 0, -0.7]} rotationY={0.25} animation="hug" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "9.home",
      ...cam.push({
        on: [1.2, 1.32, -0.9],
        dist: 2.9,
        to: 2.35,
        yaw: -18,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Close warm family look between grinning unmasked Dad and smiling Hero beside village square houses.",
      stage: (t) => (
        <>
          <SnowGolem position={[0.9, 0, -1.05]} rotationY={0.35} pumpkin={false} walk={t * 0.1} />
          <Hero position={[1.55, 0, -0.75]} rotationY={-0.15} animation="idle" face="happy" time={t} />
        </>
      ),
    },
    {
      cue: "10.sub",
      ...cam.push({
        on: [1.4, 1.25, -0.9],
        dist: 4.2,
        to: 3.6,
        yaw: -22,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.08],
      }),
      zone: "town",
      note: "SubscribeSign pops cleanly above unmasked Dad and waving Hero with sunlit houses behind.",
      stage: (t) => (
        <>
          <SnowGolem position={[0.9, 0, -1.05]} rotationY={0.35} pumpkin={false} walk={t * 0.15} />
          <Hero position={[1.65, 0, -0.7]} rotationY={0.15} animation="wave" face="grin" time={t} />
          <SubscribeSign position={[1.35, 2.35, -1.1]} rotationY={-0.35} scale={pop(t, 0.15) * 0.9} />
        </>
      ),
    },
  ],
});
