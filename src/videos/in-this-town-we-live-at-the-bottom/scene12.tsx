import { cam, storyScene } from "../../engine";
import { Friend, Hero, Jar, NORTH, SOUTH, tw, w, timing } from "./kit";

/**
 * 12 — The friend, and the best line in the film.
 *
 * "What if you climb it and there is nothing up there?" / "Then I will know what we were saving for." Two kids at the
 * bottom of a ladder, and the smaller one is the one who has thought about it.
 */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "What if there is nothing",
  shots: [
    {
      cue: "12.walk",
      ...cam.truck({ on: [1.1, 1.1, -6.4], dist: 4.6, yaw: 62, pitch: 4, fov: 44, by: [0.4, 0, -2.2] }),
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "The two of them walking the length of the lane to the foot of the ladder, side by side, the way kids walk when one of them is leaving.",
      stage: (t) => (
        <>
          <Hero position={[1.1, 0, -6.4 - t * 0.9]} rotationY={NORTH} animation="walk" animDistance={t * 0.9} face="uneasy" />
          <Friend position={[0.2, 0, -6.2 - t * 0.9]} rotationY={NORTH} animation="walk" animDistance={t * 0.9 + 0.4} face="worried" />
        </>
      ),
    },
    {
      cue: "12.q",
      ...cam.push({ on: [0.4, 1.42, -8.4], dist: 3.9, to: 3.4, yaw: 24, pitch: 0, fov: 36 }),
      zone: "bottom",
      look: "overworld-day",
      note: "The friend asks it looking at the steps, not at him. On 'nothing up there' he finally looks at him, and the question is not a joke.",
      stage: (t) => (
        <>
          <Friend position={[0.1, 0, -8.2]} rotationY={SOUTH} animation={t > 0.8 ? "talk" : "idle"} face="worried" headPitch={t > 1.6 ? 0.1 : -0.35} lookAt={[0.9, 1.4, -8.8]} />
          <Hero position={[0.9, 0, -8.8]} rotationY={SOUTH} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "12.a",
      ...cam.push({ on: [0.9, 1.45, -8.8], dist: 3.9, to: 3.4, yaw: -18, pitch: -2, fov: 34, screenOffset: [0, 0.06] }),
      zone: "bottom",
      look: "overworld-day",
      note: "His answer, straight down the lens, with the jar in his bag and the steps behind his head. He has already done the sum and he does not like it.",
      stage: (t) => (
        <>
          <Hero position={[0.9, 0, -8.8]} rotationY={SOUTH} animation={t < 1.2 ? "talk" : "idle"} face={tw(t, 1.0, 1.6) > 0.5 ? "brave" : "sad"} />
          <Jar position={[1.35, 0.85, -9.0]} fill={1} scale={0.9} />
        </>
      ),
    },
  ],
});
