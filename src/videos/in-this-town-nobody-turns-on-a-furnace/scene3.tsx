import {
  FloatingNumber,
  Hero,
  SnowGolem,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Blacksmith Furnace Warning & Summer Heat",
  shots: [
    {
      cue: "5.forge",
      ...cam.push({
        on: [4.0, 1.0, 1.5],
        dist: 3.6,
        to: 2.95,
        yaw: -20,
        pitch: 10,
        fov: 40,
      }),
      zone: "town",
      note: "Dad accidentally steps too close to the blacksmith's glowing Furnace on the square.",
      stage: (t) => (
        <SnowGolem position={[3.0 + Math.min(0.7, t * 0.6), 0, 1.6]} rotationY={Math.PI / 2} pumpkin walk={t * 1.4} />
      ),
    },
    {
      cue: "5.hurt",
      ...cam.orbit({
        on: [3.8, 1.1, 1.5],
        dist: 3.1,
        yaw: -24,
        yawTo: 12,
        pitch: 8,
        fov: 38,
      }),
      zone: "town",
      note: "Vanilla mechanic proof: heat hisses and flashes red -1 HP above Dad as he hops backward.",
      stage: (t) => (
        <>
          <SnowGolem
            position={[3.7 - ease(ramp(t, 0.5, 1.1)) * 0.9, 0, 1.6]}
            rotationY={Math.PI / 2}
            pumpkin
            melt={0.18}
          />
          <FloatingNumber text="-1 HP" color="#ff4f42" position={[3.6, 2.0, 1.6]} height={0.58 * pop(t, 0.25)} />
          <Hero position={[2.2, 0, 2.1]} rotationY={0.9} animation="idle" face="wow" time={t} />
        </>
      ),
    },
    {
      cue: "5.heat",
      ...cam.crane({
        on: [0, 1.4, 1.5],
        dist: 4.9,
        fromPitch: 6,
        toPitch: 18,
        yaw: -14,
        fov: 42,
      }),
      zone: "town",
      note: "Crane over dry village square as shimmering HEATWAVE text rises in summer air.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 1.5]} rotationY={0.2} animation="idle" face="uneasy" time={t} />
          <FloatingNumber text="HEATWAVE" color="#ff8e2b" position={[0, 2.2 + ease(ramp(t, 0.1, 1.0)) * 0.2, 1.5]} height={0.6 * pop(t, 0.2)} />
        </>
      ),
    },
  ],
});
