import {
  Blaze,
  EmberDrift,
  FloatingNumber,
  Hero,
  PLACE,
  ROBE,
  Smoke,
  SnowGolem,
  Snowball,
  Villager,
  cam,
  ease,
  pop,
  ramp,
  storyScene,
  timing,
  wordAt,
} from "./kit";

const hitWord = wordAt("7.hearts", "ticking");
const shoveWord = wordAt("7.shield", "shoves");

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Into the Blaze & Melting Sacrifice",
  shots: [
    {
      cue: "7.run",
      ...cam.orbit({
        on: [PLACE.bakery[0], 1.2, PLACE.bakery[2] + 1.6],
        dist: 4.9,
        distTo: 3.4,
        yaw: -26,
        yawTo: 24,
        pitch: 10,
        fov: 42,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Frightened villagers bolt fast past the camera down the cobblestone avenue while flames tower behind.",
      stage: (t) => (
        <>
          <Villager position={[PLACE.bakery[0] - 0.65, 0, PLACE.bakery[2] + 1.1 + t * 1.35]} robe={ROBE.smith} rotationY={Math.PI} walk={t * 2.4} />
          <Villager position={[PLACE.bakery[0] + 0.65, 0, PLACE.bakery[2] + 1.4 + t * 1.4]} robe={ROBE.brown} rotationY={Math.PI} walk={t * 2.4 + 0.4} />
          <Blaze position={[PLACE.bakery[0] - 0.7, 3.0, PLACE.bakery[2] - 2.3]} size={0.8} height={1.6} count={18} seed={1} />
          <Blaze position={[PLACE.bakery[0] + 0.7, 3.0, PLACE.bakery[2] - 2.3]} size={0.8} height={1.6} count={18} seed={2} />
        </>
      ),
    },
    {
      cue: "7.charge",
      ...cam.push({
        on: [PLACE.bakery[0], 1.15, PLACE.bakery[2] + 0.25],
        dist: 3.3,
        to: 1.95,
        yaw: -18,
        pitch: 6,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Hero whips his head forward in awe as Snow Golem Dad charges directly toward the entrance.",
      stage: (t) => {
        const dash = ease(ramp(t, 0, 1.35));
        return (
          <>
            <Hero position={[PLACE.bakery[0] - 0.25, 0, PLACE.bakery[2] + 0.05]} rotationY={0.18 - dash * 0.25} animation={dash > 0.5 ? "reach" : "lookAround"} face="wow" time={t} />
            <SnowGolem position={[PLACE.bakery[0] + 0.2, 0, PLACE.bakery[2] + 2.6 - dash * 1.4]} rotationY={Math.PI} pumpkin walk={dash * 1.4} />
            <EmberDrift position={[PLACE.bakery[0], 1.5, PLACE.bakery[2]]} area={[2.2, 2.0, 2.2]} count={20} />
          </>
        );
      },
    },
    {
      cue: "7.dad",
      ...cam.truck({
        on: [PLACE.bakery[0], 1.2, PLACE.bakery[2] + 1.5],
        by: [0, 0, -1.6],
        dist: 3.6,
        yaw: 16,
        pitch: 7,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Tracking camera dives beside Dad as he sprints straight through burning doorway into embers.",
      stage: (t) => (
        <>
          <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] + 2.1 - t * 1.95]} rotationY={Math.PI} pumpkin walk={t * 3.4} />
          <Blaze position={[PLACE.bakery[0] - 0.65, 3.0, PLACE.bakery[2] - 2.3]} size={0.75} height={1.5} count={18} seed={3} />
          <Blaze position={[PLACE.bakery[0] + 0.65, 3.0, PLACE.bakery[2] - 2.3]} size={0.75} height={1.5} count={18} seed={4} />
          <EmberDrift position={[PLACE.bakery[0], 1.4, PLACE.bakery[2]]} area={[3, 2.5, 3]} count={22} />
        </>
      ),
    },
    {
      cue: "7.melt",
      ...cam.push({
        on: [PLACE.bakery[0], 1.0, PLACE.bakery[2] - 0.4],
        dist: 3.8,
        to: 2.35,
        yaw: -16,
        pitch: 8,
        fov: 38,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Inside scorching rafters, Dad shoves forward while melting block by block in thick white steam.",
      stage: (t) => {
        const melt = 0.18 + 0.42 * ease(ramp(t, 0.05, 1.35));
        return (
          <>
            <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.15 - t * 0.35]} rotationY={Math.PI} pumpkin melt={melt} walk={t * 2.0} />
            <Smoke position={[PLACE.bakery[0], 1.2 + t * 0.35, PLACE.bakery[2] - 0.4]} rise={1.6} count={12} opacity={0.45} />
            <Blaze position={[PLACE.bakery[0], 2.9, PLACE.bakery[2] - 2.3]} size={0.75} height={1.4} count={20} seed={5} />
          </>
        );
      },
    },
    {
      cue: "7.hearts",
      ...cam.push({
        on: [PLACE.bakery[0] - 0.15, 1.15, PLACE.bakery[2] - 0.1],
        dist: 3.15,
        to: 1.9,
        yaw: 18,
        pitch: 5,
        fov: 38,
        screenOffset: [0, 0.14],
      }),
      impacts: [{ at: hitWord, amp: 0.025, dur: 0.25 }],
      look: "overworld-sunset",
      zone: "bakery",
      note: "Hero lunges toward Dad trying to pull him back as flashing -1 HP hits repeatedly above shrinking Dad.",
      stage: (t) => {
        const pull = ease(ramp(t, 0.1, 1.1));
        return (
          <>
            <SnowGolem position={[PLACE.bakery[0] + 0.15, 0, PLACE.bakery[2] - 0.35]} rotationY={Math.PI} pumpkin melt={0.45 + pull * 0.15} />
            <Hero position={[PLACE.bakery[0] - 0.75 + pull * 0.35, 0, PLACE.bakery[2] + 0.4 - pull * 0.25]} rotationY={0.85} animation="reach" face="ouch" time={t * 1.3} />
            <FloatingNumber text="-1 HP" color="#ff4f42" position={[PLACE.bakery[0] + 0.15, 1.85 + pull * 0.25, PLACE.bakery[2] - 0.35]} height={0.32 * pop(t, Math.min(0.2, hitWord))} />
          </>
        );
      },
    },
    {
      cue: "7.shield",
      ...cam.ots({
        speaker: [PLACE.bakery[0], 1.0, PLACE.bakery[2] - 0.25],
        listener: [PLACE.bakery[0] - 0.38, 1.0, PLACE.bakery[2] + 1.1],
      }),
      impacts: [{ at: shoveWord, amp: 0.026, dur: 0.25 }],
      screenOffset: [0, 0.12],
      look: "overworld-sunset",
      zone: "bakery",
      note: "OTS protective shove: Dad braces arms forward pushing Hero out doorway toward safety.",
      stage: (t) => {
        const push = ease(ramp(t, Math.max(0.05, shoveWord - 0.1), 1.4));
        return (
          <>
            <SnowGolem position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.25]} rotationY={Math.PI} pumpkin melt={0.52} armThrow={-0.65 - push * 0.7} />
            <Hero position={[PLACE.bakery[0] - 0.38, 0, PLACE.bakery[2] + 0.35 + push * 1.1]} rotationY={0} animation="run" animDistance={t * 1.8} face="fear" />
            <EmberDrift position={[PLACE.bakery[0], 1.5, PLACE.bakery[2] - 0.3]} area={[2, 2.2, 2]} count={22} />
          </>
        );
      },
    },
    {
      cue: "7.throw",
      ...cam.orbit({
        on: [PLACE.bakery[0], 1.15, PLACE.bakery[2] - 0.6],
        dist: 4.0,
        distTo: 2.95,
        yaw: -26,
        yawTo: 22,
        pitch: 8,
        fov: 40,
        screenOffset: [0, 0.12],
      }),
      look: "overworld-sunset",
      zone: "bakery",
      note: "Rapid camera orbit around shrinking Dad as he windmills arms slinging nonstop white snowballs into flames.",
      stage: (t) => {
        const cycle = (t * 2.8) % 1;
        return (
          <>
            <SnowGolem
              position={[PLACE.bakery[0], 0, PLACE.bakery[2] - 0.2]}
              rotationY={Math.PI}
              pumpkin
              melt={0.56 + Math.min(0.24, t * 0.14)}
              armThrow={-1.25 + cycle * 1.6}
            />
            <Snowball position={[PLACE.bakery[0], 1.1 + cycle * 1.7, PLACE.bakery[2] - 0.4 - cycle * 1.5]} scale={1.15} />
            <Blaze position={[PLACE.bakery[0], 2.8, PLACE.bakery[2] - 2.2]} size={0.7} height={1.3} count={18} seed={6} />
          </>
        );
      },
    },
    {
      cue: "7.arms",
      ...cam.crane({
        on: [PLACE.bakery[0], 2.0, PLACE.bakery[2] - 1.6],
        dist: 3.4,
        toDist: 2.35,
        yaw: 14,
        fromPitch: -2,
        toPitch: -18,
        fov: 40,
        screenOffset: [0, 0.1],
      }),
      impacts: [{ at: 0.45, amp: 0.02, dur: 0.2 }, { at: 0.9, amp: 0.02, dur: 0.2 }],
      look: "overworld-sunset",
      zone: "bakery",
      note: "Upward crane watching twin snowballs impact & douse the collapsing roof Blaze while smoke surges.",
      stage: (t) => {
        const cycle = ((t + 0.3) * 2.8) % 1;
        return (
          <>
            <Snowball position={[PLACE.bakery[0] - 0.22, 1.4 + cycle * 1.45, PLACE.bakery[2] - 1.0 - cycle * 1.1]} scale={1.2} />
            <Snowball position={[PLACE.bakery[0] + 0.22, 1.6 + ((cycle + 0.5) % 1) * 1.25, PLACE.bakery[2] - 1.2 - ((cycle + 0.5) % 1) * 0.9]} scale={1.1} />
            <Blaze position={[PLACE.bakery[0], 2.9, PLACE.bakery[2] - 2.3]} size={Math.max(0.2, 0.8 - t * 0.4)} height={1.1} count={16} seed={7} />
          </>
        );
      },
    },
  ],
});
