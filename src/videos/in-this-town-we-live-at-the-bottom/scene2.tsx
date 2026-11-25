import { cam, storyScene } from "../../engine";
import { Boat, EAST, Hero, Line, NORTH, PLACE, Rod, SOUTH, Villager, WEST, timing } from "./kit";

/**
 * 02 — The ladder. How many steps, and nobody has ever answered why.
 *
 * Every shot here goes UP: the lens climbs the ladder face, and the last one comes back down to a kid's face so the
 * question lands on a person instead of on scenery.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Nine thousand",
  shots: [
    {
      cue: "2.fish",
      ...cam.push({ on: [0, 1.0, 8], dist: 11.5, to: 9.6, yaw: -12, pitch: 8, fov: 46 }),
      zone: "bottom",
      look: "overworld-golden",
      note: "Down on the planks: hands, floats, the bucket of fish. Morning fishing, before the sun gets here, which the water says by being grey.",
      stage: (t) => (
        <>
          <Hero position={[0, 0.5, 9.4]} rotationY={NORTH} animation="crouch" face="neutral" headPitch={0.35} />
          <Rod position={[0.4, 0.8, 9.3]} rotationY={0.1} bend={0.2} />
          <Line position={[0.5, 0.7, 8.4]} length={1.1} bob={Math.sin(t * 4) * 0.04} />
          <Villager position={[-1.3, 0.5, 8.2]} rotationY={NORTH} hmm={0.2} />
          <Rod position={[-1.0, 0.85, 8.1]} bend={0.22} />
        </>
      ),
    },
    {
      cue: "2.steps",
      from: [1.2, 1.4, -4.6],
      to: [1.2, 9.0, -7.6],
      target: [1.2, 1.2, -13.5],
      targetTo: [1.2, 8.4, -13.5],
      fov: 44,
      ease: "linear" as const,
      zone: "bottom",
      look: "overworld-day",
      note: "The ladder from its foot, climbing with it: the rungs go up out of the top of frame and keep going. Nine thousand is a number you cannot see the end of.",
      stage: () => <Villager position={[1.2, 0.4, -10.2]} rotationY={NORTH} strain={0.6} />,
    },
    {
      cue: "2.dad",
      ...cam.push({ on: [1.3, 1.2, -9.4], dist: 4.6, to: 4.0, yaw: 12, pitch: 4, fov: 42 }),
      zone: "bottom",
      look: "overworld-day",
      note: "His dad, at the foot of the steps, doing the sum on his fingers. He has counted them. Nobody has counted them back.",
      stage: (t) => (
        <>
          <Villager position={[1.0, 0, -10.2]} rotationY={SOUTH} strain={0.2 + 0.2 * Math.sin(t * 2)} hat="straw" lookAt={[1.0, 1.4, -9]} />
          <Hero position={[2.1, 0, -9.2]} rotationY={-0.5} animation="idle" face="uneasy" headPitch={-0.3} lookAt={[1.0, 1.4, -10.2]} />
        </>
      ),
    },
    {
      cue: "2.why",
      ...cam.push({ on: [2.1, 1.45, -9.2], dist: 2.6, to: 2.3, yaw: -6, pitch: 0, fov: 34, screenOffset: [0, 0.1] }),
      zone: "bottom",
      look: "overworld-day",
      note: "On the question, straight to his face, the ladder filling the frame behind his head. Nobody answers him, so the film does not either: the shot just holds until the line is over.",
      stage: (t) => (
        <Hero position={[2.1, 0, -9.2]} rotationY={SOUTH} animation={t < 0.3 ? "idle" : "talk"} face={t > 1.2 ? "frown" : "uneasy"} headPitch={-0.05} />
      ),
    },
  ],
});
