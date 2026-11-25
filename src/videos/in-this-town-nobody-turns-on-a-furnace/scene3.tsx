import {
  EmberDrift,
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
  title: "Blacksmith Furnace & Summer Heatwave",
  shots: [
    {
      cue: "5.forge",
      ...cam.push({
        on: [3.9, 1.0, 1.5],
        dist: 3.6,
        to: 3.0,
        yaw: -18,
        pitch: 9,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      zone: "town",
      note: "Dad walks cheerfully across the cobblestones toward the lit blacksmith corner.",
      stage: (t) => (
        <SnowGolem position={[3.0 + Math.min(0.7, t * 0.65), 0, 1.6]} rotationY={Math.PI / 2} pumpkin walk={t * 1.5} />
      ),
    },
    {
      cue: "5.near",
      ...cam.push({
        on: [4.15, 0.7, 1.55],
        dist: 2.2,
        to: 1.75,
        yaw: -24,
        pitch: 8,
        fov: 38,
        screenOffset: [0, 0.1],
      }),
      zone: "town",
      note: "Tight insert on glowing furnace firelight right beside Dad's lower snow block.",
      stage: (t) => (
        <>
          <SnowGolem position={[3.72, 0, 1.55]} rotationY={Math.PI / 2} pumpkin walk={t * 0.4} />
          <EmberDrift position={[4.1, 0.5, 1.55]} area={[1.0, 1.0, 1.0]} count={14} />
        </>
      ),
    },
    {
      cue: "5.hurt",
      ...cam.orbit({
        on: [3.6, 1.1, 1.6],
        dist: 3.2,
        yaw: -22,
        yawTo: 10,
        pitch: 8,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-golden",
      zone: "town",
      note: "Furnace heat sizzles Dad, shrinking him with red -1 HP popup as he jumps backward.",
      stage: (t) => (
        <>
          <SnowGolem
            position={[3.7 - ease(ramp(t, 0.35, 0.95)) * 0.85, 0, 1.6]}
            rotationY={Math.PI / 2}
            pumpkin
            melt={0.18 + Math.min(0.08, t * 0.05)}
          />
          <FloatingNumber text="-1 HP" color="#ff4f42" position={[3.55, 1.95, 1.6]} height={0.55 * pop(t, 0.2)} />
        </>
      ),
    },
    {
      cue: "5.jump",
      ...cam.push({
        on: [2.3, 1.15, 2.0],
        dist: 2.35,
        to: 1.85,
        yaw: 16,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.14],
      }),
      look: "overworld-golden",
      zone: "town",
      note: "Close Hero gasp reacting to how dangerously fast Dad took damage from heat.",
      stage: (t) => (
        <Hero position={[2.3, 0, 2.0]} rotationY={0.4} animation="panic" face="wow" time={t} />
      ),
    },
    {
      cue: "5.heat",
      ...cam.crane({
        on: [0, 1.25, 1.5],
        dist: 4.5,
        fromPitch: 6,
        toPitch: 16,
        yaw: -14,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-golden",
      zone: "town",
      note: "Golden heatwave crane across sunlit town as orange HEATWAVE rises over Hero.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, 1.5]} rotationY={0.18} animation="idle" face="uneasy" time={t} />
          <FloatingNumber text="HEATWAVE" color="#ff8e2b" position={[0, 2.15 + ease(ramp(t, 0.1, 1.0)) * 0.2, 1.5]} height={0.55 * pop(t, 0.15)} />
          <EmberDrift position={[0, 1.6, 1.5]} area={[4, 2.5, 4]} count={14} />
        </>
      ),
    },
    {
      cue: "5.dry",
      ...cam.push({
        on: [0, 1.3, 1.5],
        dist: 2.6,
        to: 2.1,
        yaw: 14,
        pitch: 4,
        fov: 38,
        screenOffset: [0, 0.14],
      }),
      look: "overworld-golden",
      zone: "town",
      note: "Tight Hero look glaring uneasily toward the dried-out timber bakery down the road.",
      stage: (t) => (
        <Hero position={[0, 0, 1.5]} rotationY={-0.3} animation="lookAround" face="ouch" time={t} />
      ),
    },
  ],
});
