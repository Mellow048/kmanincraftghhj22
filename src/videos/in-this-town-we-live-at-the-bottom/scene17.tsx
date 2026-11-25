import { cam, storyScene } from "../../engine";
import { FishPile, GoldenApple, Hero, Keeper, SOUTH, timing } from "./kit";

/**
 * 17 — The truth, and it is not a kindness.
 *
 * He did not do it because she was sick. He did it because a year of fish is worth more than an apple. The film says
 * the cold thing out loud so that "the bottom saved her" is not a warm lie.
 */
export const scene17 = storyScene(timing, {
  id: "scene17",
  title: "He did the sums",
  shots: [
    {
      cue: "17.cold",
      ...cam.push({ on: [0, 1.55, 15], dist: 2.5, to: 2.2, yaw: -8, pitch: 0, fov: 34, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "The keeper's face while the line says he did not do it for her. There is nothing on it at all, which is worse than cruelty.",
      stage: () => (
        <Keeper position={[0, 0.5, 15]} rotationY={SOUTH} animation="idle" face="blank" headPitch={0.1} />
      ),
    },
    {
      cue: "17.sums",
      ...cam.push({ on: [0.2, 0.9, 14.2], dist: 3.0, to: 2.6, yaw: 26, pitch: 18, fov: 40 }),
      zone: "bottom",
      look: "overworld-rain",
      note: "The pile of fish, and the apple in his gloved hand above it. The whole argument of the film is two objects in one frame, and the fish are the bigger one.",
      stage: () => (
        <>
          <FishPile position={[0.2, 0.5, 14.2]} n={20} seed={19} />
          <GoldenApple position={[0.9, 1.1, 14.6]} scale={1.2} />
          <Keeper position={[1.3, 0.5, 15]} rotationY={SOUTH} animation="hold" face="blank" />
        </>
      ),
    },
    {
      cue: "17.save",
      ...cam.push({ on: [0.3, 1.45, 12.9], dist: 2.8, to: 2.4, yaw: 14, pitch: 0, fov: 34, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-rain",
      note: "On 'the bottom did' the lens finds the town behind him, all of it, every rod still in the water. He is not the hero of this line; they are.",
      stage: (t) => (
        <Hero position={[0.3, 0.5, 12.9]} rotationY={SOUTH} animation={t < 1.2 ? "talk" : "idle"} face={t < 1.2 ? "hurt" : "calm"} />
      ),
    },
  ],
});
