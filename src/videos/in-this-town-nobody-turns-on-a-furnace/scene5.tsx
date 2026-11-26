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
        yaw: -12,
        yawTo: 12,
        pitch: 10,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Frightened villagers abandon buckets and run down the cobblestone street.",
      stage: (t) => (
        <>
          <Villager position={[PLACE.bakery[0] - 0.65, 0, PLACE.bakery[2] + 1.4 + t * 0.65]} robe={ROBE.smith} rotationY={Math.PI} walk={t * 1.8} />
          <Villager position={[PLACE.bakery[0] + 0.65, 0, PLACE.bakery[2] + 1.7 + t * 0.65]} robe={ROBE.brown} rotationY={Math.PI} walk={t * 1.8 + 0.4} />
          <Blaze position={[PLACE.bakery[0] - 0.7, 3.0, PLACE.bakery[2] - 2.3]} size={0.8} height={1.6} count={18} seed={1} />
          <Blaze position={[PLACE.bakery[0] + 0.7, 3.0, PLACE.bakery[2] - 2.3]} size={0.8} height={1.6} count={18} seed={2} />
        </>
      ),
    },
    {
      cue: "7.charge",
      ...cam.push({
        on: [PLACE.bakery[0], 1.15, PLACE.bakery[2] + 0.1],
        dist: 2.6,
        to: 2.1,
        yaw: -14,
        pitch: 6,
        fov: 38,
        screenOffset: [0, 0.14],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Hero watches through rising sparks as Dad steps forward with zero hesitation.",
      stage: (t) => (
        <>
          <Hero position={[PLACE.bakery[0] - 0.15, 0, PLACE.bakery[2] + 0.05]} rotationY={0.12} animation="lookAround" face="fear" time={t} />
          <EmberDrift position={[PLACE.bakery[0], 1.5, PLACE.bakery[2]]} area={[2.2, 2.0, 2.2]} count={18} />
        </>
      ),
    },
    {
      cue: "7.dad",
      ...cam.push({
        on: [PLACE.bakery[0], 1.2, PLACE.bakery[2] + 0.6],
        dist: 4.1,
        to: 3.1,
        yaw: 14,
        pitch: 6,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Snow Golem Dad sprints directly through the blazing oak doorway.",
      stage: (t) => (
        <>
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] + 2.2 - t * 1.65]} rotationY={Math.PI} pumpkin walk={t * 3.0} />
          <Blaze position={[PLACE.bakery[0] - 0.65, 3.0, PLACE.bakery[2] - 2.3]} size={0.75} height={1.5} count={18} seed={3} />
          <Blaze position={[PLACE.bakery[0] + 0.65, 3.0, PLACE.bakery[2] - 2.3]} size={0.75} height={1.5} count={18} seed={4} />
          <EmberDrift position={[PLACE.bakery[0], 1.4, PLACE.bakery[2]]} area={[3, 2.5, 3]} count={18} />
        </>
      ),
    },
    {
      cue: "7.melt",
      ...cam.push({
        on: [PLACE.bakery[0], 1.05, PLACE.bakery[2] - 0.4],
        dist: 3.3,
        to: 2.6,
        yaw: -14,
        pitch: 8,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Inside the hot rafters, Dad visibly shrinks block by block.",
      stage: (t) => {
        const melt = 0.22 + 0.35 * ease(ramp(t, 0.05, 1.3));
        return (
          <>
            <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.4]} rotationY={Math.PI} pumpkin melt={melt} />
            <Blaze position={[PLACE.bakery[0], 2.9, PLACE.bakery[2] - 2.3]} size={0.75} height={1.4} count={20} seed={5} />
          </>
        );
      },
    },
    {
      cue: "7.hearts",
      ...cam.push({
        on: [PLACE.bakery[0] - 0.2, 1.15, PLACE.bakery[2] - 0.1],
        dist: 2.6,
        to: 2.1,
        yaw: 14,
        pitch: 5,
        fov: 38,
        screenOffset: [0, 0.14],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Flashing red -1 HP damage pops above Dad as Hero reaches out in panic.",
      stage: (t) => (
        <>
          <SnowGolem position={[PLACE.bakery[0] + 0.15, 0, PLACE.bakery[2] - 0.35]} rotationY={Math.PI} pumpkin melt={0.5} walk={t * 0.2} />
          <Hero position={[PLACE.bakery[0] - 0.45, 0, PLACE.bakery[2] + 0.25]} rotationY={0.85} animation="reach" face="ouch" time={t} />
          <FloatingNumber text="-1 HP" color="#ff4f42" position={[PLACE.bakery[0] + 0.15, 1.85, PLACE.bakery[2] - 0.35]} height={0.32 * pop(t, 0.15)} />
        </>
      ),
    },
    {
      cue: "7.shield",
      ...cam.ots({
        speaker: [PLACE.bakery[0], 1.0, PLACE.bakery[2] - 0.25],
        listener: [PLACE.bakery[0] - 0.38, 1.0, PLACE.bakery[2] + 0.7],
      }),
      screenOffset: [0, 0.12],
      look: "overworld-sunset",
      zone: "bakery",
      note: "OTS protective push: Dad stands between embers and shoves Hero toward the doorway.",
      stage: (t) => (
        <>
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.25]} rotationY={Math.PI} pumpkin melt={0.5} armThrow={-0.65} />
          <Hero position={[PLACE.bakery[0] - 0.38, 0, PLACE.bakery[2] + 0.7]} rotationY={Math.PI} animation="run" animDistance={t * 1.4} face="fear" />
          <EmberDrift position={[PLACE.bakery[0], 1.5, PLACE.bakery[2] - 0.3]} area={[2, 2.2, 2]} count={22} />
        </>
      ),
    },
    {
      cue: "7.throw",
      ...cam.orbit({
        on: [PLACE.bakery[0], 1.15, PLACE.bakery[2] - 0.6],
        dist: 3.5,
        yaw: -16,
        yawTo: 14,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Shrinking Dad slings rapid-fire white snowballs straight up into the burning roof.",
      stage: (t) => {
        const cycle = (t * 2.6) % 1;
        return (
          <>
            <SnowGolem
              position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.2]}
              rotationY={Math.PI}
              pumpkin
              melt={0.56 + Math.min(0.22, t * 0.12)}
              armThrow={-1.15 + cycle * 1.4}
            />
            <Snowball position={[PLACE.bakery[0], 1.1 + cycle * 1.6, PLACE.bakery[2] - 0.4 - cycle * 1.5]} scale={1.1} />
            <Blaze position={[PLACE.bakery[0], 2.8, PLACE.bakery[2] - 2.2]} size={0.7} height={1.3} count={18} seed={6} />
          </>
        );
      },
    },
    {
      cue: "7.arms",
      ...cam.push({
        on: [PLACE.bakery[0], 2.2, PLACE.bakery[2] - 1.6],
        dist: 3.1,
        to: 2.5,
        yaw: 12,
        pitch: -5,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Upward shot showing final white snowballs smashing directly into shrinking roof Blaze.",
      stage: (t) => {
        const cycle = ((t + 0.3) * 2.8) % 1;
        return (
          <>
            <Snowball position={[PLACE.bakery[0] - 0.22, 1.4 + cycle * 1.4, PLACE.bakery[2] - 1.0 - cycle * 1.1]} scale={1.2} />
            <Snowball position={[PLACE.bakery[0] + 0.22, 1.6 + ((cycle + 0.5) % 1) * 1.2, PLACE.bakery[2] - 1.2 - ((cycle + 0.5) % 1) * 0.9]} scale={1.1} />
            <Blaze position={[PLACE.bakery[0], 2.9, PLACE.bakery[2] - 2.3]} size={Math.max(0.25, 0.75 - t * 0.35)} height={1.1} count={16} seed={7} />
          </>
        );
      },
    },
  ],
});
