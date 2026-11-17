import type React from "react";
import { Block, cam, storyScene } from "../../engine";
import { Dust, Glow, LightPool } from "../../engine";
import { Adult, Hero, K, Mum, S, B, EAST, NORTH, SOUTH, WEST, ramp, timing, wordAt } from "./kit";

const ONCE = wordAt("1.once", "quiet");

/**
 * SCENE 1 — "One sentence, then nothing". The hook, and the rule.
 *
 * Five shots of the film's opening: the bus shelter at midnight, the first sentence he ever hears, and the glass
 * going quiet. The rest of narration.md (2.bench onward) still needs its scenes and its recorded voice.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "One sentence, then nothing",
  shots: [
    {
      // Frame one: his palm flat on the glass of a bus shelter at midnight. The power is being used before it has
      // a name, and the street behind him has nobody in it.
      cue: "1.if",
      ...cam.push({ on: S(2.00, 1.35, -0.60), dist: 4.40, to: 3.75, yaw: -22, pitch: 3, fov: 50 }),
      zone: "street",
      look: "overworld-night",
      note: "The bus shelter at midnight with his palm flat on the glass, and an empty street behind him: something is already happening in frame one.",
      stage: () => (
        <>
          <Hero position={S(1.55, 0, 0.15)} rotationY={NORTH} animation="reach" face="calm" />
        </>
      ),
    },
    {
      cue: "1.rule",
      // Closer on the hand and the glass, so the rule has something to be about.
      ...cam.push({ on: S(1.60, 1.30, -0.30), dist: 2.05, to: 1.60, yaw: -14, pitch: 2, fov: 42 }),
      zone: "street",
      look: "overworld-night",
      note: "His palm on the glass, close: twelve words of rule, and the hand they happen to.",
      stage: () => (
        <>
          <Hero position={S(1.55, 0, 0.15)} rotationY={NORTH} animation="reach" face="calm" gaze={0} />
        </>
      ),
    },
    {
      cue: "1.once",
      // The sentence leaving the glass: rings of light, once, and then nothing.
      ...cam.push({ on: S(1.55, 1.28, 0.05), dist: 2.35, to: 1.90, yaw: -30, pitch: 1, fov: 42 }),
      zone: "street",
      look: "overworld-night",
      note: "The same hand, listening: one sentence out of the glass, and then it is only glass, which is worse.",
      stage: (t) => (
        <>
          <Hero position={S(1.55, 0, 0.15)} rotationY={NORTH} animation="idle" face="wow" headPitch={-0.16} />
          <Rings at={S(1.55, 1.30, -0.66)} t={t} from={ONCE} />
        </>
      ),
    },
    {
      cue: "1.found",
      // The whole street, from the road: one lamp, one shelter, one kid, no bus until morning.
      ...cam.push({ on: S(1.20, 1.15, 1.40), dist: 6.6, to: 5.85, yaw: 12, pitch: 4, fov: 52 }),
      zone: "street",
      look: "overworld-night",
      note: "The whole street at midnight from the road: one lamp, one shelter, one kid, and no bus until morning.",
      stage: () => (
        <>
          <Hero position={S(1.55, 0, 0.15)} rotationY={NORTH} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "1.one",
      // The glass from the side, and the street through it: a window again.
      ...cam.push({ on: S(1.20, 1.40, -0.70), dist: 2.30, to: 1.80, yaw: -4, pitch: 2, fov: 40 }),
      zone: "street",
      look: "overworld-night",
      note: "The glass from the side with the street behind it: one sentence came out of it and now it is a window again.",
      stage: () => (
        <>
          <Hero position={S(1.55, 0, 0.15)} rotationY={NORTH + 0.4} animation="idle" face="fear" />
        </>
      ),
    },
  ],
});

/** One sentence leaving a surface: three rings, once, on the word. */
export const Rings: React.FC<{ at: [number, number, number]; t: number; from: number }> = ({ at, t, from }) => {
  const k = ramp(t, from + 0.04, from + 1.15);
  return (
    <group position={at}>
      {[0, 1, 2].map((i) => {
        const s = (0.24 + k * (0.8 + i * 0.42)) * 2;
        return (
          <Block
            key={i}
            size={[s, s, 0.02]}
            position={[0, 0, 0.14 + i * 0.05]}
            color="#ffe9a8"
            emissive="#ffe9a8"
            emissiveIntensity={1.5}
            opacity={(1 - k) * 0.4}
            transparent
            castShadow={false}
            rotation={[0, 0, Math.PI / 4]}
          />
        );
      })}
    </group>
  );
};

void EAST;
void WEST;
void Adult;
void Mum;
void K;
void B;
void SOUTH;
void Dust;
void Glow;
void LightPool;
