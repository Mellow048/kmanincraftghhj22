import {
  FloatingNumber,
  Hero,
  SnowGolem,
  SnowTrail,
  cam,
  pop,
  room,
  storyScene,
  timing,
} from "./kit";

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Snow Trails & Cold Kitchen",
  shots: [
    {
      cue: "1.town",
      ...cam.push({
        on: [0, 1.1, 1.5],
        dist: 4.5,
        to: 3.6,
        yaw: 14,
        pitch: 10,
        fov: 42,
      }),
      zone: "town",
      note: "Bright daylight Frame-1 hook: Snow Golem Dad & Mum in carved pumpkins stand on crisp white snow tiles.",
      stage: (t) => (
        <>
          <SnowGolem position={[-0.9, 0, 1.4]} rotationY={0.25} pumpkin walk={t * 0.4} />
          <SnowGolem position={[1.0, 0, 1.6]} rotationY={-0.2} pumpkin walk={t * 0.4 + 0.5} />
          <Hero position={[0, 0, 2.3]} rotationY={Math.PI} animation="lookAround" face="uneasy" time={t} />
        </>
      ),
    },
    {
      cue: "1.trail",
      ...cam.orbit({
        on: [0, 0.7, 1.5],
        dist: 4.0,
        yaw: -20,
        yawTo: 18,
        pitch: 16,
        fov: 42,
      }),
      zone: "town",
      note: "Low orbit showing white SnowTrail patches appearing across green grass as Mum & Dad walk.",
      stage: (t) => (
        <>
          <SnowGolem position={[-1.4 + t * 0.75, 0, 1.5]} rotationY={Math.PI / 2} pumpkin walk={t * 1.4} />
          <SnowTrail points={[[-1.8, 0, 1.5], [-1.0, 0, 1.5], [-0.2, 0, 1.5]]} />
        </>
      ),
    },
    {
      cue: "2.cold",
      ...cam.push({
        on: room(0.8, 1.0, -2.5),
        dist: 3.8,
        to: 3.1,
        yaw: -14,
        pitch: 8,
        fov: 40,
      }),
      zone: "room",
      note: "Inside the house: Hero shivers next to dark unlit stone Furnace with icy 0 HEAT popup.",
      stage: (t) => (
        <>
          <Hero position={room(0.4, 0, -1.6)} rotationY={0.35} animation="cower" face="worried" time={t} />
          <FloatingNumber text="0 HEAT" color="#66c8ff" position={room(1.8, 1.35, -3.1)} height={0.55 * pop(t, 0.35)} />
        </>
      ),
    },
    {
      cue: "2.food",
      ...cam.push({
        on: room(0, 1.0, -0.5),
        dist: 3.0,
        to: 2.5,
        yaw: 10,
        pitch: 16,
        fov: 38,
      }),
      zone: "room",
      note: "Hero frowns at frozen berries for dinner while Mum watches silently.",
      stage: (t) => (
        <>
          <Hero position={room(-0.7, 0, -0.1)} rotationY={0.65} animation="idle" face="frown" lookAt={room(0, 0.85, -0.5)} time={t} />
          <SnowGolem position={room(0.95, 0, -0.7)} rotationY={-0.65} pumpkin walk={t * 0.2} />
        </>
      ),
    },
  ],
});
