import { cam, storyScene, stride } from "../../engine";
import { BatteringRam, Hero, HayPile, Pillager, SubscribeSign, timing, wordAt } from "./kit";

const HAY = wordAt("13.stumble", "hay");

/** The spy keeps the stiff pillager march and walks straight into the hay. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "Still marching",
  shots: [
    {
      cue: "13.march",
      ...cam.truck({ on: [2.6, 1.2, 2.2], dist: 4.5, yaw: 77, pitch: 3, by: [2.4, 0, -0.4], fov: 39 }),
      zone: "village",
      look: "overworld-day",
      note: "A side track follows the spy trying to march out proudly while the villagers cheer behind.",
      stage: (t, { p }) => (
        <>
          <Hero {...stride([1, 0, 3], [4, 0, 2.6], p)} masked face="brave" animation="walk" animDistance={t * 0.9} />
          <Pillager position={[6.2, 0, 0]} n={0} walk={t * 0.4} cheer={0.2} />
          <BatteringRam position={[7.4, 0, -1.2]} wheelSpin={t * 0.4} yaw={Math.PI / 2} lean={0.12} />
        </>
      ),
    },
    {
      cue: "13.stumble",
      ...cam.push({ on: [5.0, 0.75, 0.8], dist: 3.5, to: 2.6, yaw: 12, pitch: -9, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "The spy's rigid steps keep going until the mask and shoulder disappear into a hay bale.",
      stage: (t) => {
        const bonk = wordAt("13.stumble", "straight");
        const bump = Math.max(0, Math.min(1, (t - bonk) * 4));
        return (
          <>
            <HayPile position={[5.7, 0, 0.5]} topple={bump * 0.26} />
            <Hero position={[4.0 + bump * 1.5, 0, 1.9 - bump * 1.3]} rotationY={2.285} masked face="surprised" animation="walk" animDistance={bump * 1.98} headPitch={-bump * 0.34} />
          </>
        );
      },
    },
    {
      cue: "13.stumble",
      cut: Math.max(0.4, HAY + 0.28),
      ...cam.top({ on: [5.7, 0.4, 0.5], height: 4.8, to: 3.1, spin: [0, 13], fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "An overhead odd angle reveals the spy planted face-first among square hay bales, still in full disguise.",
      stage: (t) => (
        <>
          <HayPile position={[5.7, 0, 0.5]} topple={0.2} />
          <Hero position={[5.6, 0, 1.1]} masked face="ouch" animation="crouch" />
        </>
      ),
    },
  ],
});
