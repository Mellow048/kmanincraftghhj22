import { cam, storyScene } from "../../engine";
import { Basket, FishPile, Hero, Jar, JETTY_CROWD, Keeper, Line, NORTH, Rod, SOUTH, Villager, timing } from "./kit";

/**
 * 16 — Dawn, and the thing the film has been promising.
 *
 * He comes down expecting to have failed, and the whole town has been fishing all night. The man in the clean coat is
 * back in his basket, buying — except this time he is not buying fish, he is selling one apple.
 */
export const scene16 = storyScene(timing, {
  id: "scene16",
  title: "A year of fish",
  shots: [
    {
      cue: "16.dawn",
      ...cam.truck({ on: [1.2, 12, -28], dist: 7.2, yaw: 6, pitch: 6, fov: 46, by: [0, 0, 2.4] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-golden",
      note: "Coming down: the same steps, this time in first light, and the town below is full of orange. He stops on the last step.",
      stage: (t) => (
        <>
          <Hero position={[1.2, 10.2 - t * 1.6, -22]} rotationY={SOUTH} animation={t < 1.6 ? "walk" : "idle"} animDistance={t * 1.2} face="uneasy" />
          <Jar position={[1.55, 11.0 - t * 1.6, -22.2]} fill={1} scale={0.85} />
        </>
      ),
    },
    {
      cue: "16.jetty",
      ...cam.push({ on: [0, 1.2, 9], dist: 16.5, to: 13.6, yaw: -4, pitch: 7, fov: 48 }),
      zone: "bottom",
      look: "overworld-rain",
      note: "The jetty, every rod in town on it, everybody soaked. Twenty people who do not own a boat between them, fishing in the rain, for her.",
      stage: (t) => (
        <>
          {JETTY_CROWD.map(([x, z], i) => (
            <group key={i}>
              <VillagerRod x={x} z={z} i={i} t={t} />
            </group>
          ))}
          <FishPile position={[1.6, 0.5, 12.2]} n={14} seed={11} />
        </>
      ),
    },
    {
      cue: "16.allnight",
      ...cam.push({ on: [0, 1.3, 11.4], dist: 4.2, to: 3.6, yaw: 20, pitch: 2, fov: 40 }),
      zone: "bottom",
      look: "overworld-rain",
      note: "Two of them, grey with tiredness, still holding rods. On 'for my mum' neither of them turns round; they are working, not posing.",
      stage: () => (
        <>
          <VillagerRod x={-0.8} z={11.6} i={0} t={0} tired />
          <VillagerRod x={0.9} z={12.0} i={1} t={1} tired />
          <FishPile position={[0.1, 0.5, 11.0]} n={8} seed={13} />
        </>
      ),
    },
    {
      cue: "16.basket",
      ...cam.push({ on: [0, 1.2, 15], dist: 6.6, to: 5.4, yaw: -12, pitch: 4, fov: 44 }),
      zone: "bottom",
      look: "overworld-rain",
      note: "The basket, at the end of the jetty, and him standing in it in the rain in his clean coat. He has come down twice in one year, which he has never done.",
      stage: () => (
        <>
          <Basket position={[0, 0.5, 15]} rope={2.4} />
          <Keeper position={[0, 0.5, 15]} rotationY={SOUTH} animation="idle" face="blank" />
          <Hero position={[0.2, 0.5, 12.6]} rotationY={NORTH} animation="idle" face="surprised" headPitch={-0.2} />
        </>
      ),
    },
    {
      cue: "16.year",
      ...cam.push({ on: [0, 1.5, 15], dist: 2.6, to: 2.2, yaw: 8, pitch: -2, fov: 36, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "His face on the price. On 'every fish we catch' he looks past the boy, at the pile, and does the sum: a year of fish is worth more than an apple, and he is the only one who thinks so.",
      stage: (t) => (
        <>
          <Keeper position={[0, 0.5, 15]} rotationY={SOUTH} animation={t < 1.4 ? "talk" : "idle"} face="blank" headPitch={0.15} />
          <FishPile position={[-1.4, 0.5, 14.2]} n={16} seed={17} />
        </>
      ),
    },
  ],
});

/** A villager with a rod, working. */
const VillagerRod: React.FC<{ x: number; z: number; i: number; t: number; tired?: boolean }> = ({ x, z, i, t, tired }) => (
  <>
    <Villager position={[x, 0.5, z]} rotationY={NORTH} strain={tired ? 0.7 : 0.4} hmm={tired ? 0 : 0.2} />
    <Rod position={[x + 0.3, 0.95, z - 0.1]} rotationY={0.15 * (i % 3)} bend={0.3 + Math.sin(t * 3 + i) * 0.06} />
    <Line position={[x + 0.45, 0.85, z - 1.7]} length={1.3} bob={Math.sin(t * 6 + i) * 0.05} />
  </>
);
