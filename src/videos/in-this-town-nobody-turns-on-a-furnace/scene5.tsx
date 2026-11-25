import {
  Blaze,
  EmberDrift,
  FloatingNumber,
  Hero,
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

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Into the Blaze & Melting Sacrifice",
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
      note: "Villagers retreat from the roaring flames outside the bakery door.",
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
      note: "Heroic sprint: Snow Golem Dad charges straight past the retreating crowd into the fire.",
      stage: (t) => (
        <>
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] + 2.4 - t * 1.6]} rotationY={Math.PI} pumpkin walk={t * 2.8} />
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
      note: "Dad melts block by block inside the heat as red -1 HP flashes above him.",
      stage: (t) => {
        const melt = 0.25 + 0.4 * ease(ramp(t, 0.1, 1.8));
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
      cue: "7.shield",
      ...cam.ots({
        speaker: [PLACE.bakery[0], 1.0, PLACE.bakery[2] - 0.2],
        listener: [PLACE.bakery[0] - 0.5, 1.0, PLACE.bakery[2] + 0.8],
      }),
      zone: "bakery",
      note: "OTS protective shield: Dad stands between falling embers and Hero nudging him out.",
      stage: (t) => (
        <>
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.2]} rotationY={Math.PI} pumpkin melt={0.52} armThrow={-0.6} />
          <Hero position={[PLACE.bakery[0] - 0.45, 0, PLACE.bakery[2] + 0.7]} rotationY={Math.PI} animation="run" animDistance={t * 1.4} face="fear" />
          <EmberDrift position={[PLACE.bakery[0], 1.5, PLACE.bakery[2] - 0.3]} area={[2, 2.2, 2]} count={22} />
        </>
      ),
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
      note: "Snowball barrage: shrinking Dad extinguishes the rafters one throw at a time.",
      stage: (t) => {
        const cycle = (t * 2.5) % 1;
        return (
          <>
            <SnowGolem
              position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.2]}
              rotationY={Math.PI}
              pumpkin
              melt={0.68}
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
