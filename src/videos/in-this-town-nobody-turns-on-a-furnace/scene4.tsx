import {
  Blaze,
  EmberDrift,
  FloatingNumber,
  PLACE,
  ROBE,
  SnowGolem,
  Snowball,
  Villager,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
} from "./kit";

export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "Into the Fire",
  shots: [
    {
      cue: "7.run",
      ...cam.orbit({
        on: [PLACE.bakery[0], 1.2, PLACE.bakery[2] + 1.5],
        dist: 4.5,
        yaw: -14,
        yawTo: 14,
        pitch: 10,
        fov: 42,
      }),
      zone: "bakery",
      note: "Villagers back away from the burning bakery while flames roar above.",
      stage: (t) => (
        <>
          <Villager position={[PLACE.bakery[0] - 1.2, 0, PLACE.bakery[2] + 1.6 + t * 0.5]} robe={ROBE.smith} rotationY={Math.PI} walk={t * 1.6} />
          <Villager position={[PLACE.bakery[0] + 1.1, 0, PLACE.bakery[2] + 1.8 + t * 0.5]} robe={ROBE.brown} rotationY={Math.PI} walk={t * 1.6 + 0.4} />
          <Blaze position={[PLACE.bakery[0], 2.8, PLACE.bakery[2] - 2.2]} size={3.0} height={1.7} />
        </>
      ),
    },
    {
      cue: "7.dad",
      ...cam.push({
        on: [PLACE.bakery[0], 1.25, PLACE.bakery[2] + 0.6],
        dist: 4.1,
        to: 3.1,
        yaw: 16,
        pitch: 5,
        fov: 40,
      }),
      zone: "bakery",
      note: "Snow Golem Dad charges straight past the retreating crowd into the burning doorway.",
      stage: (t) => (
        <>
          <SnowGolem
            position={[PLACE.bakery[0], 0, PLACE.bakery[2] + 2.4 - t * 1.6]}
            rotationY={Math.PI}
            pumpkin
            walk={t * 2.8}
          />
          <Blaze position={[PLACE.bakery[0], 2.7, PLACE.bakery[2] - 2.0]} size={2.8} height={1.6} />
          <EmberDrift position={[PLACE.bakery[0], 1.4, PLACE.bakery[2]]} area={[3, 2.5, 3]} count={18} />
        </>
      ),
    },
    {
      cue: "7.melt",
      ...cam.push({
        on: [PLACE.bakery[0], 1.1, PLACE.bakery[2] - 0.5],
        dist: 3.3,
        to: 2.6,
        yaw: -14,
        pitch: 8,
        fov: 38,
      }),
      zone: "bakery",
      note: "Dad visibly shrinks (`melt`) inside the flames as red -1 HP ticks above his pumpkin.",
      stage: (t) => {
        const melt = 0.25 + 0.45 * ease(ramp(t, 0.1, 1.8));
        return (
          <>
            <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.4]} rotationY={Math.PI} pumpkin melt={melt} />
            <Blaze position={[PLACE.bakery[0], 2.5, PLACE.bakery[2] - 2.0]} size={2.4} height={1.3} />
            <FloatingNumber text="-1 HP" color="#ff4f42" position={[PLACE.bakery[0], 1.9, PLACE.bakery[2] - 0.4]} height={0.6 * pop(t, 0.2)} />
          </>
        );
      },
    },
    {
      cue: "7.throw",
      ...cam.orbit({
        on: [PLACE.bakery[0], 1.15, PLACE.bakery[2] - 0.8],
        dist: 3.6,
        yaw: -18,
        yawTo: 16,
        pitch: 9,
        fov: 40,
      }),
      zone: "bakery",
      note: "Rapid snowball barrage: Dad slings snowballs up into the Blaze flames as he melts further.",
      stage: (t) => {
        const cycle = (t * 2.5) % 1;
        return (
          <>
            <SnowGolem
              position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.2]}
              rotationY={Math.PI}
              pumpkin
              melt={0.62}
              armThrow={-1.1 - Math.sin(t * 14) * 0.45}
            />
            <Snowball position={[PLACE.bakery[0], 1.0 + cycle * 1.8, PLACE.bakery[2] - 0.4 - cycle * 1.4]} />
            <Snowball position={[PLACE.bakery[0] + 0.25, 1.2 + ((cycle + 0.5) % 1) * 1.6, PLACE.bakery[2] - 0.6 - ((cycle + 0.5) % 1) * 1.2]} />
            <Blaze position={[PLACE.bakery[0], 2.5, PLACE.bakery[2] - 2.0]} size={2.0} height={0.9 * (1 - ease(ramp(t, 0.5, 2.2)))} />
          </>
        );
      },
    },
  ],
});
