import { cam, storyScene } from "../../engine";
import { CHILD, Folk, PLACE, ROBE, Walker, timing } from "./kit";

/** THREE THINGS NOBODY KNEW. The rule, the nights, and the scarecrows: the three questions the film answers. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Three things nobody knew",
  shots: [
    {
      cue: "2.rule",
      ...cam.push({ on: [PLACE.sign[0] + 0.05, 1.92, PLACE.sign[2]], dist: 3.6, to: 3.1, yaw: 168, pitch: -18, fov: 54 }),
      zone: "village",
      note: "'Who had made the rule': the rule itself, on a board so old it has moss on it: a moon, crossed out. And behind the board, in the sky, the thing it is a picture of. Somebody walks past under both and looks at neither.",
      stage: (t) => <Walker from={[6.6, 0, 5.7]} to={[0.4, 0, 5.5]} t={t + 2.2} speed={0.9} robe={ROBE.brown} phase={0.3} />,
    },
    {
      cue: "2.awake",
      ...cam.truck({ on: [-2.0, 1.35, 3.2], dist: 5.0, yaw: 0, pitch: -2, by: [2.2, 0, 0], fov: 44 }),
      zone: "village",
      note: "'Why we stayed awake all night': the square at midnight, as busy as a market day. Slide along it: two children chasing each other past the well, two neighbours with their brims together, hats coming down the lane under the lanterns.",
      stage: (t) => (
        <>
          <Walker from={[1.7, 0, 6.3]} to={[-4, 0, 6.3]} t={t + 0.2} speed={1.0} robe={ROBE.blue} phase={3.4} />
          <Walker from={[-4.2, 0, 4.4]} to={[3.6, 0, 4.4]} t={t} speed={2.2} robe={ROBE.friend} scale={CHILD} kid phase={1.1} />
          <Walker from={[-5.2, 0, 4.25]} to={[3.6, 0, 4.25]} t={t} speed={2.2} robe={ROBE.red} scale={CHILD} kid phase={2.9} />
          <Folk position={[-1.95, 0, -0.35]} rotationY={0.9} robe={ROBE.brown} hmm={0.6} phase={0.3} />
          <Folk position={[-1.0, 0, -0.75]} rotationY={-1.2} robe={ROBE.white} hmm={0.3} phase={1.9} />
          <Walker from={[-0.75, 0, -8]} to={[-0.5, 0, -2]} t={t} speed={0.85} robe={ROBE.farmer} phase={2.7} />
          <Walker from={[0.9, 0, -4]} to={[1.1, 0, -10]} t={t} speed={0.8} robe={ROBE.smith} phase={0.7} />
        </>
      ),
    },
    {
      cue: "2.crows",
      ...cam.push({ on: [-6.5, 1.75, -24], dist: 14.5, to: 10.5, yaw: 22, pitch: 1, fov: 44 }),
      zone: "village",
      note: "'Who kept putting scarecrows in our fields': out through the gate at the end of the lane, past the fence, at one of them. The wheat is white under the moon and they stand in it, every one of them facing the town.",
      stage: () => null,
    },
  ],
});
