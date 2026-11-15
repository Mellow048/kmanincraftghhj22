import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { EAST, FireMob, GATE_EYE, Glow, IronGolem, Puffs, WEST, ease, jolt, ramp, timing, wordAt } from "./kit";

const LIT = wordAt("8.night", "lit");
const OUT = wordAt("8.out", "out");
const FLY = wordAt("8.out", "fly");
/** Where the first one hangs, over the top of the hill. */
const FIRST: Vec3 = [38.6, 12.3, 2.2];

/** THE GATE OPENS. The thing nobody went near does what it was always going to do. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The gate lit up",
  shots: [
    {
      cue: "8.night",
      ...cam.push({ on: [GATE_EYE[0], GATE_EYE[1] - 0.2, GATE_EYE[2]], dist: 10.5, to: 8.6, yaw: -78, pitch: -11, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'Then one night, the gate lit up purple': the black frame against the stars, from below it on the hill, with one iron golem on watch. On 'lit' the hole in it fills with purple and the golem's head comes up.",
      stage: (t) => (
        <>
          {/* The moon's haze behind it, so the black frame has something to be black against. */}
          <Glow position={[46.5, 9.4, 2]} size={17} color="#8296e6" opacity={0.34} />
          <IronGolem position={[39.4, 6, 3.9]} rotationY={EAST - 0.4} headPitch={0.15 - 0.4 * ease(ramp(t, LIT, LIT + 0.15)) + jolt(t, LIT, 0.2)} armR={-0.5 * ease(ramp(t, LIT + 0.1, LIT + 0.4))} armL={-0.5 * ease(ramp(t, LIT + 0.1, LIT + 0.4))} />
          {t > LIT ? <Puffs position={[41.3, 6.2, 2]} color="#b06aff" count={8} rise={3.4} spread={1.1} size={0.16} speed={0.9} opacity={0.7} seed={6} /> : null}
        </>
      ),
    },
    {
      cue: "8.out",
      ...cam.push({ on: [40.2, 8.5, 2.1], onTo: [39.3, 11.0, 2.1], dist: 5.6, to: 7.2, yaw: -70, pitch: -12, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'Something came out. It was on fire, and it could fly': a burning head comes through the purple with rods of fire turning under it, hangs there and looks at the town. On 'fly' it goes straight up, and the lens after it.",
      stage: (t) => {
        const through = ease(ramp(t, OUT - 0.2, OUT + 0.35));
        const up = ease(ramp(t, FLY - 0.25, FLY + 0.45));
        const at: Vec3 = [GATE_EYE[0] - 2.4 * through - 1.0 * up, 8.4 + (FIRST[1] - 8.4) * up, FIRST[2]];
        return <FireMob position={at} rotationY={WEST} scale={0.3 + 0.7 * ramp(t, OUT - 0.2, OUT + 0.1)} light={34} angry={ramp(t, OUT + 0.4, OUT + 0.8)} seed={1} />;
      },
    },
    {
      cue: "8.more",
      ...cam.push({ on: [39.2, 10.2, 2], dist: 16, to: 15, yaw: -72, pitch: -15, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "'Then ten more': from down the slope. The first one hangs over the hill, and ten more pour out of the gate under it and fan out across the sky.",
      stage: (t) => (
        <>
          <FireMob position={FIRST} rotationY={WEST} light={26} angry={1} seed={1} />
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
