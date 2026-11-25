import { cam, storyScene } from "../../engine";
import { EAST, Hero, Jar, Mum, NORTH, SOUTH, Villager, WEST, timing } from "./kit";

/**
 * 05 — The adults.
 *
 * Three people tell him no, and none of them is cruel about it. That is the point: the rule at the bottom is not a
 * villain, it is arithmetic that everybody has already agreed to.
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Not for one person",
  shots: [
    {
      cue: "5.mum",
      ...cam.push({ on: [-0.4, 1.35, -1.6], dist: 3.0, to: 2.6, yaw: -12, pitch: 2, fov: 38 }),
      zone: "room",
      look: "warm-room",
      note: "She takes the jar out of his hands and puts it back on the shelf. Not angry: practiced. He is holding nothing by the end of the line.",
      stage: (t) => (
        <>
          <Mum position={[-1.0, 0, -1.9]} rotationY={EAST} animation={t < 0.7 ? "hold" : "idle"} face="worried" headPitch={0.12} lookAt={[0.1, 1.2, -1.8]} />
          <Hero position={[0.35, 0, -1.8]} rotationY={WEST} animation={t < 0.7 ? "reach" : "idle"} face="frown" headPitch={0.1} />
          <Jar position={[-0.6, 1.28, -2.6]} fill={0.45} />
        </>
      ),
    },
    {
      cue: "5.old",
      ...cam.push({ on: [1.1, 1.5, -10.2], dist: 2.9, to: 2.5, yaw: 14, pitch: 3, fov: 36 }),
      zone: "bottom",
      look: "overworld-day",
      note: "The oldest man in town, at the foot of the ladder he has never climbed, shaking his head with his eyes shut. He is not telling the kid a rule; he is remembering one.",
      stage: (t) => (
        <>
          <Villager position={[1.0, 0, -10.0]} rotationY={SOUTH} hmm={0.5 + 0.5 * Math.sin(t * 2.2)} hat="wide" />
          <Hero position={[2.0, 0, -9.2]} rotationY={-0.6} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "5.two",
      ...cam.push({ on: [6.2, 6.2, -31.4], dist: 7.4, to: 6.0, yaw: -6, pitch: 4, fov: 40 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Two families on their own step up on the ledge, waving down at people they left behind six years ago. They wave at a town they cannot see well enough to name.",
      stage: (t) => (
        <>
          <Villager position={[5.4, 5.85, -31.4]} rotationY={SOUTH} hat="straw" hmm={0} />
          <Villager position={[6.2, 5.85, -31.2]} rotationY={SOUTH} kid />
          <Villager position={[7.1, 5.85, -31.5]} rotationY={SOUTH} robe="#7a5a44" />
          <Villager position={[7.8, 5.85, -31.3]} rotationY={SOUTH} kid />
        </>
      ),
    },
    {
      cue: "5.more",
      ...cam.push({ on: [2.0, 1.42, -9.2], dist: 2.4, to: 2.15, yaw: -14, pitch: 0, fov: 34, screenOffset: [0, 0.08] }),
      zone: "bottom",
      look: "overworld-day",
      note: "Back on his face, and he is not talked out of it: the jaw sets and the eyes go up. This is the shot that makes the climb his idea.",
      stage: () => (
        <Hero position={[2.0, 0, -9.2]} rotationY={NORTH} animation="idle" face="brave" headPitch={-0.6} lookAt={[2, 30, -31]} />
      ),
    },
  ],
});
