import { cam, storyScene } from "../../engine";
import { Hero, Jar, NORTH, SOUTH, timing } from "./kit";

/**
 * 13 — The climb. The only place in the film where he is alone with the jar.
 *
 * Three shots, all of them going up, and the town gets smaller in every one. There is no dialogue for the last half:
 * the ladder does the talking.
 */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "Nine thousand steps",
  shots: [
    {
      cue: "13.steps",
      from: [1.2, 0.4, -7.4],
      to: [1.2, 4.2, -11.2],
      target: [1.2, 1.8, -12.6],
      targetTo: [1.2, 6.6, -17],
      fov: 44,
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-night",
      note: "On 'nine thousand' the lens is under him on the steps, looking up past his boots: the ladder goes out of the top of frame and keeps going.",
      stage: (t) => (
        <>
          <Hero position={[1.2, 0.5 + t * 0.35, -11.4 - t * 0.4]} rotationY={NORTH} animation="walk" animDistance={t * 0.8} face="blank" headPitch={-0.2} />
          <Jar position={[1.55, 1.0 + t * 0.35, -11.6]} fill={1} scale={0.85} />
        </>
      ),
    },
    {
      cue: "13.night",
      ...cam.push({ on: [1.2, 9.2, -24], dist: 7.0, to: 6.0, yaw: -12, pitch: 6, fov: 44 }),
      zone: "bottom",
      look: "overworld-night",
      note: "High on the face, a kid on a ladder in the dark, one hand and one boot visible, the rest of him in the stone's shadow. Somebody is still climbing at this hour.",
      stage: (t) => (
        <Hero position={[1.2, 8.6, -24]} rotationY={NORTH} animation={t < 0.6 ? "reachUp" : "walk"} animDistance={t} face="blank" headPitch={-0.1} />
      ),
    },
    {
      cue: "13.small",
      ...cam.push({ on: [1.2, 20.5, -28.4], dist: 9.0, to: 7.6, yaw: 8, pitch: -12, fov: 46 }),
      zone: "bottom",
      look: "overworld-night",
      note: "From just under the top, looking back down: the whole town is a handful of orange lights, and the jetty is a line. On 'only lights' the mountain is bigger than the town, which is the point.",
      stage: () => (
        <>
          <Hero position={[1.2, 19.4, -28.6]} rotationY={SOUTH} animation="idle" face="uneasy" headPitch={0.3} />
        </>
      ),
    },
  ],
});
