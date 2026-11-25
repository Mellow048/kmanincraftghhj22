import {
  FloatingNumber,
  Hero,
  Player,
  SnowGolem,
  SnowTrail,
  Snowball,
  cam,
  pop,
  room,
  storyScene,
  timing,
} from "./kit";

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Snow Trails & Freezing House",
  shots: [
    {
      cue: "1.town",
      ...cam.push({
        on: [0, 1.15, 0.8],
        dist: 4.5,
        to: 3.7,
        yaw: 10,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Frame-1 Teller + Village Home: Hero faces camera with his cozy plank/blue-roof house, flower boxes, bell, and Snow Golem parents behind.",
      stage: (t) => (
        <>
          <Hero position={[0.15, 0, 1.85]} rotationY={0.14} animation="lookAround" face="uneasy" time={t} />
          <SnowGolem position={[-0.6, 0, -0.35]} rotationY={0.2} pumpkin walk={t * 0.45} />
          <SnowGolem position={[0.55, 0, -0.95]} rotationY={-0.15} pumpkin walk={t * 0.45 + 0.5} />
        </>
      ),
    },
    {
      cue: "1.trail",
      ...cam.orbit({
        on: [0, 1.0, 1.1],
        dist: 3.8,
        yaw: -14,
        yawTo: 12,
        pitch: 12,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "town",
      note: "Snow Golem Mum & Dad stroll side by side across the morning square.",
      stage: (t) => (
        <>
          <SnowGolem position={[-0.6 + t * 0.75, 0, 1.3]} rotationY={Math.PI / 2} pumpkin walk={t * 1.4} />
          <SnowGolem position={[0.55 - t * 0.4, 0, 0.35]} rotationY={-Math.PI / 2} pumpkin walk={t * 1.3 + 0.4} />
        </>
      ),
    },
    {
      cue: "1.snow",
      ...cam.push({
        on: [0.05, 0.55, 1.3],
        dist: 2.9,
        to: 2.3,
        yaw: 16,
        pitch: 22,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Low angle showing crisp white SnowTrail patches stamped behind Hero across the lawn.",
      stage: (t) => (
        <>
          <SnowTrail points={[[-1.2, 0, 1.3], [-0.35, 0, 1.3], [0.5, 0, 1.3]]} />
          <Hero position={[0.2, 0, 1.9]} rotationY={0.15} animation="shrug" face="frown" time={t} />
        </>
      ),
    },
    {
      cue: "2.cold",
      ...cam.push({
        on: room(-0.15, 1.05, -1.05),
        dist: 4.1,
        to: 3.5,
        yaw: 14,
        pitch: 9,
        fov: 40,
        screenOffset: [0, 0.06],
      }),
      zone: "room",
      note: "Indoor kitchen shot cleanly inside frame: upright Hero shivers beside dark unlit stone Furnace and crisp 0 HEAT popup.",
      stage: (t) => (
        <>
          <Hero position={room(-0.42, 0, -0.5)} rotationY={0.35} animation="shrug" face="uneasy" time={t} />
          <FloatingNumber text="0 HEAT" color="#66c8ff" position={room(0.2, 1.5, -1.65)} height={0.28 * pop(t, 0.25)} />
        </>
      ),
    },
    {
      cue: "2.dark",
      ...cam.push({
        on: room(-0.1, 0.65, -1.8),
        dist: 2.1,
        to: 1.65,
        yaw: 18,
        pitch: 8,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      zone: "room",
      note: "Close insert on the dark unlit cold stone Furnace chamber as Hero inspects it.",
      stage: (t) => (
        <Hero position={room(-0.55, 0, -1.15)} rotationY={1.15} headYaw={-0.1 + t * 0.2} animation="reach" face="ouch" time={t} />
      ),
    },
    {
      cue: "2.potato",
      ...cam.push({
        on: [4.5, 1.15, -1.0],
        dist: 3.5,
        to: 2.9,
        yaw: -24,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "At the vibrant red-striped market Stall: school kids eat warm baked potatoes in a totally distinct corner of town.",
      stage: (t) => (
        <>
          <Player who={6} scale={0.8} position={[4.1, 0, -0.6 - t * 0.1]} rotationY={0.3} animation="cheer" face="grin" time={t} />
          <Player who={1} scale={0.8} position={[4.75, 0, -1.1]} rotationY={-0.35} headYaw={Math.sin(t * 3) * 0.2} animation="idle" face="smile" time={t} />
        </>
      ),
    },
    {
      cue: "2.food",
      ...cam.top({
        on: room(1.3, 0.85, 0.5),
        height: 2.2,
        to: 1.75,
        spin: [-8, 10],
        fov: 38,
      }),
      zone: "room",
      note: "Top-down spin over the cold sweet berries on the plank breakfast table as Hero reaches slowly.",
      stage: (t) => (
        <>
          <Hero position={room(0.55, 0, 0.45)} rotationY={1.4 - t * 0.15} animation="reach" face="frown" time={t} />
          <Snowball position={room(1.45, 0.92, 0.45)} scale={0.75 + Math.sin(t * 4) * 0.04} />
        </>
      ),
    },
  ],
});
