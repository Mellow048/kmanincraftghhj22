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
  title: "Puddle Low Point, Snow Rebuild & Goofy Smile",
  shots: [
    {
      cue: "8.clear",
      ...cam.push({
        on: [PLACE.bakery[0], 1.25, PLACE.bakery[2] + 1.1],
        dist: 4.1,
        to: 3.3,
        yaw: 14,
        pitch: 7,
        fov: 40,
      }),
      zone: "bakery",
      note: "Final flames die in thin smoke as Hero and rescued kids rush out safely.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 0.5, 0, PLACE.bakery[2] + 1.0 + t * 0.4]} rotationY={0} animation="run" animDistance={t * 1.5} face="brave" />
          <Player who={2} scale={0.8} position={[PLACE.bakery[0] + 0.5, 0, PLACE.bakery[2] + 1.1 + t * 0.4]} rotationY={0} animation="run" animDistance={t * 1.5} face="wow" />
          <Smoke position={[PLACE.bakery[0], 3.4, PLACE.bakery[2] - 2.0]} rise={2.0} count={8} opacity={0.35} />
        </>
      ),
    },
    {
      cue: "8.puddle",
      ...cam.push({
        on: [PLACE.bakery[0], 0.65, PLACE.bakery[2] - 0.1],
        dist: 2.8,
        to: 2.2,
        yaw: -14,
        pitch: 16,
        fov: 38,
      }),
      zone: "bakery",
      note: "Heartbreaking low point: only carved pumpkin and one tiny melting snow slab left.",
      stage: (t) => (
        <>
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.1]} rotationY={0.1} pumpkin melt={0.95} />
          <Hero position={[PLACE.bakery[0] - 0.85, 0, PLACE.bakery[2] + 0.45]} rotationY={0.75} animation="crouch" face="crying" time={t} />
        </>
      ),
    },
    {
      cue: "9.cry",
      ...cam.push({
        on: [PLACE.bakery[0] - 0.4, 0.9, PLACE.bakery[2] + 0.4],
        dist: 3.1,
        to: 2.55,
        yaw: 16,
        pitch: 10,
        fov: 40,
      }),
      zone: "bakery",
      note: "Hero sprints back in scooping fresh white snowballs off the yard.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 1.1 + t * 0.5, 0, PLACE.bakery[2] + 0.7]} rotationY={0.65} animation="run" animDistance={t * 1.6} face="brave">
            <Snowball position={[0, -0.05, 0.2]} scale={1.3} />
          </Hero>
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.1]} rotationY={0.1} pumpkin melt={0.92} />
        </>
      ),
    },
    {
      cue: "9.save",
      ...cam.orbit({
        on: [PLACE.bakery[0], 1.1, PLACE.bakery[2] + 0.1],
        dist: 3.5,
        yaw: -16,
        yawTo: 12,
        pitch: 9,
        fov: 40,
      }),
      zone: "bakery",
      note: "Hero stacks fresh snow block-by-block restoring Dad back to full height (+2 HP).",
      stage: (t) => {
        const heal = ease(ramp(t, 0.15, 1.4));
        return (
          <>
            <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2]]} rotationY={0.2} pumpkin melt={0.92 * (1 - heal)} />
            <Hero position={[PLACE.bakery[0] - 0.95, 0, PLACE.bakery[2] + 0.35]} rotationY={0.85} animation="lift" face="happy" time={t} />
            <FloatingNumber text="+2 HP" color="#3fd46a" position={[PLACE.bakery[0], 1.85, PLACE.bakery[2]]} height={0.6 * pop(t, 0.45)} />
          </>
        );
      },
    },
    {
      cue: "9.love",
      ...cam.push({
        on: [0, 1.25, 1.6],
        dist: 3.8,
        to: 3.0,
        yaw: -12,
        pitch: 6,
        fov: 40,
      }),
      zone: "town",
      note: "Warm daylight family payoff: Dad grins without pumpkin beside Mum & Hero hugging.",
      stage: (t) => (
        <>
          <SnowGolem position={[-0.7, 0, 1.5]} rotationY={0.2} pumpkin={false} walk={t * 0.15} />
          <SnowGolem position={[0.9, 0, 1.5]} rotationY={-0.25} pumpkin walk={t * 0.15} />
          <Hero position={[0.1, 0, 2.0]} rotationY={0.05} animation="hug" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "10.sub",
      ...cam.push({
        on: [0, 1.2, 2.0],
        dist: 4.1,
        to: 3.5,
        yaw: 10,
        pitch: 6,
        fov: 40,
      }),
      zone: "town",
      note: "SubscribeSign pops cleanly over the Snow Golem family in bright daylight.",
      stage: (t) => (
        <>
          <SnowGolem position={[-0.8, 0, 1.6]} rotationY={0.15} pumpkin={false} />
          <Hero position={[0.2, 0, 1.9]} rotationY={-0.1} animation="wave" face="grin" time={t} />
          <SubscribeSign position={[0, 2.35, 1.4]} scale={pop(t, 0.15) * 0.9} />
        </>
      ),
    },
  ],
});
