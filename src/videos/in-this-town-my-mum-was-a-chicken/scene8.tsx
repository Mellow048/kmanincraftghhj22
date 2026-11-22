import { cam, storyScene } from "../../engine";
import { Bits, GATE, Hero, MumChicken, Puffs, SOUTH, SoundRings, SubscribeSign, WhiteEgg, ease, hop, pop, ramp, timing, wordAt } from "./kit";

const hatchAt = wordAt("8.sub", "hatches");

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Subscribe Before It Hatches",
  shots: [
    {
      cue: "8.sub",
      ...cam.push({ on: [8.85, 6.32, -4.95], dist: 2.9, to: 2.35, yaw: 10, pitch: 8, fov: 42 }),
      handheld: 0.015,
      impacts: [{ at: hatchAt, amp: 0.055, dur: 0.3 }],
      look: "overworld-night",
      zone: "village",
      note: "Final punchy CTA: egg cracks open front-center with golden sparks as baby chick hops out and SubscribeSign reads crisp above.",
      stage: (t) => {
        const hatched = t >= hatchAt;
        const hatchBounce = hatched ? hop(t, hatchAt, 0.25, 0.35) : 0;
        const babyX = 8.82 + ease(ramp(t, hatchAt, hatchAt + 0.5)) * 0.12;
        return (
          <>
            <Hero position={[9.42, GATE.roofTopY + 0.12, -5.05]} rotationY={SOUTH} mood="happy" wave={1} tilt={Math.sin(t * 5) * 0.08} />
            <MumChicken position={[8.35, GATE.roofTopY + 0.12, -5.05]} rotationY={0.4} flap={hatched ? 0.65 : 0.15} />
            <WhiteEgg position={[8.82, GATE.roofTopY + 0.13, -4.68]} wobble={hatched ? 0 : 1.1} cracked={hatched} />
            {hatched && (
              <>
                <MumChicken position={[babyX, GATE.roofTopY + 0.15 + hatchBounce, -4.68]} rotationY={0.2} scale={0.46 * pop(t, hatchAt)} flap={0.9} peck={Math.sin(t * 14) * 0.25} />
                <Bits position={[8.82, 5.85, -4.68]} t={t - hatchAt} color="#fff2a8" count={14} power={3.2} />
                <Puffs position={[8.82, 5.85, -4.68]} color="#fff7cc" count={6} spread={0.4} size={0.07} speed={1.4} opacity={0.8} />
                <SoundRings position={[8.82, 5.9, -4.68]} t={(t - hatchAt) * 1.4} color="#ffe08a" reach={0.85} />
              </>
            )}
            <SubscribeSign position={[8.85, GATE.roofTopY + 1.32 + Math.sin(t * 5) * 0.04, -4.75]} scale={0.42 * pop(t, 0.12)} tilt={Math.sin(t * 3.5) * 0.04} />
          </>
        );
      },
    },
  ],
});
