import { cam, storyScene } from "../../engine";
import React from "react";
import type { Vec3 } from "../../engine";
import { DEG, EAST, Him, Lead, Llama, Llamas, Post, NORTH, SOUTH, SPOT, Shop, Square, Villager, ROBE, hop, pop, timing, tw, w } from "./kit";

/** 01 — The hook. A trader, two llamas, a shop, and a clock over his head that is already running. */
const ME = SPOT.me;
/** Grows its children out of the ground at `at`, about the point `p`. */
const Grow: React.FC<{ p: Vec3; k: number; children: React.ReactNode }> = ({ p, k, children }) =>
  k <= 0.01 ? null : (
    <group position={p} scale={k}>
      <group position={[-p[0], -p[1], -p[2]]}>{children}</group>
    </group>
  );

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Forty minutes",
  shots: [
    {
      cue: "1.forty",
      ...cam.push({ on: [0, 1.3, 2.6], dist: 5.0, to: 4.3, yaw: 0, pitch: 3, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The hook, built a piece at a time round him. A trader in a blue hood hops in and looks at us; over his head a clock, 40:00, is already counting down; a llama pops up at one shoulder, then the other; his shop lands at his elbow; and a villager walks past at the edge of the frame without turning his head.",
      stage: (t) => (
        <>
          <Square t={t} folk={5} />
          <Grow p={[-0.1, 0, 0.75]} k={pop(t, 0.15, 0.14)}>
            <Post />
          </Grow>
          <Grow p={SPOT.llamaA} k={pop(t, 0.25, 0.16)}>
            <Llama position={[SPOT.llamaA[0], hop(t, 0.25, 0.3, 0.24), SPOT.llamaA[2]]} rotationY={0.25} t={t} look={0.15} />
          </Grow>
          <Grow p={SPOT.llamaB} k={pop(t, 0.45, 0.16)}>
            <Llama position={[SPOT.llamaB[0], hop(t, 0.45, 0.3, 0.24), SPOT.llamaB[2]]} rotationY={-0.3} coat="#9a7a56" t={t + 0.4} look={-0.2} />
          </Grow>
          {t > 0.6 ? (
            <>
              <Lead a={[-0.1, 1.1, 0.75]} b={[SPOT.llamaA[0] + 0.1, 1.45, SPOT.llamaA[2] + 0.45]} />
              <Lead a={[-0.1, 1.1, 0.75]} b={[SPOT.llamaB[0] - 0.1, 1.45, SPOT.llamaB[2] + 0.45]} />
            </>
          ) : null}
          <Grow p={SPOT.shop} k={pop(t, 0.65, 0.16)}>
            <Shop />
          </Grow>
          <Him cue="1.forty" t={t} rotationY={SOUTH} rise={hop(t, 0.04, 0.3, 0.26) + hop(t, 0.9, 0.16, 0.28)} hmm={tw(t, 0.2, 0.6)} />
          <Villager position={[-1.3 + (t - 0.95) * 1.3, 0, 4.7]} rotationY={EAST} walk={t * 1.4} robe={ROBE.brown} scale={0.94 * pop(t, 0.95, 0.14)} />
        </>
      ),
    },
    {
      cue: "1.sell",
      ...cam.push({ on: [0.5, 1.1, 3.3], dist: 5.2, to: 4.7, yaw: 36, pitch: 8, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side of the shop. A villager walks along the front of it. The trader's head follows him the whole way. The villager does not slow down.",
      stage: (t, { dur }) => {
        const x = 1.9 - (t / dur) * 4.4;
        return (
          <>
            <Square t={t} folk={4} />
            <Llamas t={t} />
            <Shop />
            <Him cue="1.sell" t={t} face={36 * DEG} rotationY={SOUTH + 0.3} lookAt={[x, 1.5, 4.3]} strain={tw(t, 0.2, 0.7)} />
            <Villager position={[x, 0, 4.3]} rotationY={-EAST} walk={t * 3.2} robe={ROBE.red} />
          </>
        );
      },
    },
    {
      cue: "1.llamas",
      ...cam.push({ on: [-0.1, 1.45, 1.4], dist: 4.2, to: 3.7, yaw: -8, pitch: 2, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "The two llamas, close, chewing. On 'they do not want them either' both heads turn away from the shop at the same moment, one left and one right.",
      stage: (t) => {
        const no = tw(t, w("1.llamas", "They") - 0.05, w("1.llamas", "They") + 0.3);
        return (
          <>
            <Square t={t} folk={3} />
            <Llamas t={t} look={[0.15 + 0.85 * no, -0.2 - 0.85 * no]} nod={-0.12 * no} />
          </>
        );
      },
    },
    {
      cue: "1.clock",
      ...cam.push({ on: [0, 1.6, 3.0], dist: 4.1, to: 3.6, yaw: 14, pitch: -8, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "From below: his face, and the clock over it, ticking. He looks up at it.",
      stage: (t) => (
        <>
          <Square t={t} folk={2} />
          <Him cue="1.clock" t={t} face={14 * DEG} rotationY={SOUTH + 0.2} nod={-0.55 * tw(t, 0.2, 0.6)} clockScale={0.62} />
        </>
      ),
    },
    {
      cue: "1.where",
      ...cam.push({ on: [0, 0.6, 1.2], dist: 15, to: 18, yaw: 22, pitch: 40, fov: 46 }),
      zone: "town",
      look: "overworld-day",
      note: "High over the square, pulling away: the whole town going about its day, and in the middle of it one blue hood with a clock, two llamas and nobody near him. He shrugs with his head.",
      stage: (t) => (
        <>
          <Square t={t} folk={6} />
          <Llamas t={t} />
          <Shop />
          <Him cue="1.where" t={t} face={22 * DEG} rotationY={SOUTH} tilt={0.25 * Math.sin(tw(t, w("1.where", "never") - 0.1, w("1.where", "never") + 0.5) * Math.PI)} clockScale={1.3} />
        </>
      ),
    },
  ],
});
void NORTH;
void ME;
