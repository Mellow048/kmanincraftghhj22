import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { EAST, FaceLight, FireMob, GATE_EYE, Glow, Hero, IronGolem, Kid, Puffs, WEST, ease, jolt, onRoad, ramp, roadY, timing, wordAt } from "./kit";

const LIT = wordAt("8.night", "lit");
/** The thing comes through as he says what it is not. */
const OUT = wordAt("8.out", "not");
const FLY = wordAt("8.out", "fly");
/** Where the first one hangs, over the top of the hill. */
const FIRST: Vec3 = [38.6, 12.3, 2.2];

// ---- 8.march: twenty of them, four abreast.
const COLS = [-1.9, -0.65, 0.65, 1.9];
const CHEERED = wordAt("8.march", "cheered");
/** Where the twenty stand once they are up: five steps of four. */
const STEPS = [32.25, 33.75, 35.25, 36.75, 38.25];

/** THE GATE OPENS, on time, as it does every year. What comes out of it is new. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The gate lit up",
  shots: [
    {
      cue: "8.night",
      ...cam.push({ on: [GATE_EYE[0], GATE_EYE[1] - 0.2, GATE_EYE[2]], dist: 10.5, to: 8.6, yaw: -78, pitch: -11, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'That year, the gate lit up right on time': the black frame against the stars, from below it on the hill, with one iron golem on watch. On 'lit' the hole in it fills with purple and the golem's head comes up. It has seen this before.",
      stage: (t) => (
        <>
          {/* The moon's haze behind it, so the black frame has something to be black against. */}
          <Glow position={[46.5, 9.4, 2]} size={17} color="#8296e6" opacity={0.34} />
          <FaceLight position={[36, 11.5, 6.5]} power={110} reach={24} color="#b4c6ff" />
          <IronGolem position={[39.4, 6, 3.9]} rotationY={EAST - 0.4} headPitch={0.15 - 0.4 * ease(ramp(t, LIT, LIT + 0.15)) + jolt(t, LIT, 0.2)} armR={-0.5 * ease(ramp(t, LIT + 0.1, LIT + 0.4))} armL={-0.5 * ease(ramp(t, LIT + 0.1, LIT + 0.4))} />
          {t > LIT ? <Puffs position={[41.3, 6.2, 2]} color="#b06aff" count={8} rise={3.4} spread={1.1} size={0.16} speed={0.9} opacity={0.7} seed={6} /> : null}
        </>
      ),
    },
    {
      cue: "8.march",
      ...cam.push({ on: [27.5, 3.3, 2], dist: 15.5, to: 13.8, yaw: -95, pitch: -3, fov: 46 }),
      zone: "village",
      look: "overworld-night",
      note: "'Twenty iron golems marched up the hill. We cheered': from behind the kids at the foot of it. Four abreast, the whole town's golems go up the steps at the purple gate, as they do every year, and every arm in front of us goes up. Nothing has come out yet.",
      stage: (t) => {
        const d = 1.7 * t;
        return (
          <>
            <FaceLight position={[19, 10, 2]} power={170} reach={34} color="#b4c6ff" />
            <FaceLight position={[15.2, 2.6, 2.2]} power={10} reach={6} color="#c8d4ff" />
            {Array.from({ length: 20 }, (_, i) => {
              const x = 22.4 + Math.floor(i / 4) * 1.9 + d;
              return <IronGolem key={i} position={onRoad(x, COLS[i % 4])} rotationY={EAST} walk={d + i * 0.7} />;
            })}
            {[[16.6, 0.9], [17.3, 3.3], [15.9, 2.2], [17.9, 1.7]].map(([x, z], i) => (
              <Kid key={i} n={i + 1} position={[x, 0, z]} rotationY={EAST} animation="idle" blendTo="cheer" blend={1 - ease(ramp(t, CHEERED - 0.3 + i * 0.06, CHEERED))} phase={i} />
            ))}
            <Hero position={[16.9, 0, 2.6]} rotationY={EAST} animation="idle" blendTo="cheer" blend={1 - ease(ramp(t, CHEERED - 0.25, CHEERED))} />
          </>
        );
      },
    },
    {
      cue: "8.out",
      ...cam.push({ on: [40.2, 8.5, 2.1], onTo: [39.3, 11.0, 2.1], dist: 5.6, to: 7.2, yaw: -70, pitch: -12, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'But this time, it was not piglins. It was on fire, and it could fly': the purple, with an orange light growing inside it. On 'not' a burning head comes through with rods of fire turning under it, hangs there and looks at the town. On 'fly' it goes straight up, and the lens after it.",
      stage: (t) => {
        const through = ease(ramp(t, OUT - 0.2, OUT + 0.35));
        const up = ease(ramp(t, FLY - 0.25, FLY + 0.45));
        // It drifts up from the second it is through, so the lens that climbs with it never leaves it at the bottom edge.
        const drift = ease(ramp(t, OUT + 0.25, FLY - 0.2));
        const at: Vec3 = [GATE_EYE[0] - 2.4 * through - 1.0 * up, 8.4 + (FIRST[1] - 8.4) * (0.42 * drift + 0.58 * up), FIRST[2]];
        const near = ramp(t, 0.1, OUT);
        return (
          <>
            {/* Before it shows: something bright on the far side of the purple, and coming closer. */}
            {t < OUT + 0.3 ? <Glow position={[GATE_EYE[0] - 0.4, 8.5, 2]} size={1.5 + 5.5 * near} color="#ff8a2a" opacity={0.7 * near * (1 - ramp(t, OUT, OUT + 0.3))} /> : null}
            {t > OUT - 0.22 ? <FireMob position={at} rotationY={WEST} scale={0.3 + 0.7 * ramp(t, OUT - 0.2, OUT + 0.1)} light={34} angry={ramp(t, OUT + 0.4, OUT + 0.8)} seed={1} /> : null}
          </>
        );
      },
    },
    {
      cue: "8.more",
      ...cam.push({ on: [39.2, 10.2, 2], dist: 16, to: 15, yaw: -72, pitch: -15, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "'Then ten more': from down the slope, over the backs of the twenty golems on the steps. The first one hangs over the hill, and ten more pour out of the gate under it and fan out across the sky. Twenty iron heads go back to look.",
      stage: (t) => (
        <>
          <FireMob position={FIRST} rotationY={WEST} light={26} angry={1} seed={1} />
          <FaceLight position={[28, 12, 2]} power={150} reach={30} color="#b4c6ff" />
          {Array.from({ length: 20 }, (_, i) => {
            const row = Math.floor(i / 4);
            return <IronGolem key={`g${i}`} position={[STEPS[row], roadY(STEPS[row]), 2 + (i % 4 - 1.5) * 1.75 + (row % 2) * 0.4]} rotationY={EAST} headPitch={-0.5 * ease(ramp(t, 0.05 + (i % 5) * 0.04, 0.4 + (i % 5) * 0.04))} />;
          })}
          {Array.from({ length: 10 }, (_, i) => {
            const k = ease(ramp(t, i * 0.035, 0.42 + i * 0.035));
            const to: Vec3 = [40.2 - (i % 4) * 1.5, 8.2 + (i % 3) * 1.7 + (i % 2) * 0.6, 2 + (i - 4.5) * 1.05];
            return (
              <FireMob
                key={i}
                position={[GATE_EYE[0] + (to[0] - GATE_EYE[0]) * k, GATE_EYE[1] + (to[1] - GATE_EYE[1]) * k, GATE_EYE[2] + (to[2] - GATE_EYE[2]) * k]}
                rotationY={WEST}
                scale={0.4 + 0.6 * k}
                angry={1}
                seed={i + 2}
              />
            );
          })}
        </>
      ),
    },
  ],
});
