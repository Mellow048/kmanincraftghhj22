import { cam, storyScene } from "../../engine";
import { CHILD, EAST, Hero, IronGolem, PLACE, Pole, ROBE, Walker, ease, ramp, slabAt, timing, wordAt } from "./kit";

const DOWN = wordAt("8.down", "down");
const WELL = PLACE.well;

/** Where his feet are when his hands are on the edge of the lid, and when the end of his rail is. */
const handsAt = (slab: number) => WELL[2] - 1.05 + slab - 0.74;
const railAt = (slab: number) => WELL[2] - 1.05 + slab - 1.5;

/** THE LID. Second try: the other way. Nobody ever said he could not look down. Thirty nights of pushing a stone. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The lid",
  shots: [
    {
      cue: "8.down",
      ...cam.push({ on: [0, 1.15, 0.45], dist: 1.7, to: 1.38, yaw: 5, pitch: -1, fov: 40 }),
      zone: "village",
      note: "'Nobody had ever said I could not look down': the lens lies on the lid of the well and he is looking straight down at it. His eyes go left, go right. Nobody. On 'down' he grins.",
      stage: (t) => (
        <Hero position={[0, 0, 0.3]} animation="idle" face={t < DOWN ? "brave" : "grin"} gaze={t < 0.57 ? 0 : t < 0.9 ? -1 : t < 1.22 ? 1 : 0} saccade={false} headPitch={0.4} />
      ),
    },
    {
      cue: "8.lid",
      ...cam.push({ on: [0, 1.0, 0.75], dist: 3.1, to: 2.7, yaw: 56, pitch: 1, fov: 42 }),
      zone: "village",
      note: "'I pushed the lid of the well a little further': from the corner of the well, at the height of the slab. Both hands on the stone, his whole body behind it, and on each heave it gives a finger's width. Behind him the town walks by with its eyes on its feet.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, handsAt(slabAt("8.lid", t))]} animation="push" face="brave" gaze={0} />
          <Walker from={[-0.6, 0, -5.5]} to={[-2.6, 0, 2]} t={t + 2.6} speed={0.85} robe={ROBE.white} phase={1.9} />
          <Walker from={[-3.6, 0, 1.6]} to={[-1.2, 0, -5]} t={t + 1.2} speed={0.8} robe={ROBE.farmer} phase={2.7} />
        </>
      ),
    },
    {
      cue: "8.nobody",
      ...cam.push({ on: [0, 0.8, 1.2], dist: 9.6, to: 8.8, yaw: 32, pitch: 40, fov: 44 }),
      zone: "village",
      note: "'Nobody was ever looking': from high up. One boy levering at the well with a fence rail, in the middle of the square, in lantern light: and a whole town of hats going round him. Even the golem walks past.",
      stage: (t) => (
        <>
          <Hero position={[0, 0, railAt(slabAt("8.nobody", t))]} animation="push" face="brave" gaze={0}>
            <Pole />
          </Hero>
          <Walker from={[-4.4, 0, 4.6]} to={[4.6, 0, 4.4]} t={t + 2.8} speed={0.95} robe={ROBE.blue} phase={3.4} />
          <Walker from={[4.3, 0, 5.9]} to={[-4.6, 0, 5.7]} t={t + 1.2} speed={0.9} robe={ROBE.white} phase={1.9} />
          <Walker from={[-2.5, 0, 6.8]} to={[-2.3, 0, -4]} t={t + 3.4} speed={0.85} robe={ROBE.farmer} phase={2.7} />
          <Walker from={[2.6, 0, -3.6]} to={[2.4, 0, 7]} t={t + 3.6} speed={0.9} robe={ROBE.red} phase={0.9} />
          <Walker from={[3.4, 0, 2.2]} to={[-1, 0, -3.4]} t={t} speed={1.5} robe={ROBE.friend} scale={CHILD} kid phase={1.1} />
          <Walker from={[-2.4, 0, 2.6]} to={[-2.2, 0, -3]} t={t + 0.4} speed={0.8} robe={ROBE.brown} phase={0.3} />
          <Walker from={[1.9, 0, -2.2]} to={[2.1, 0, 3]} t={t + 0.2} speed={0.75} robe={ROBE.smith} phase={0.7} />
          <Walker from={[-0.6, 0, 4.6]} to={[3.2, 0, 4.2]} t={t + 0.6} speed={0.85} robe={ROBE.elder} phase={2.2} />
          <IronGolem position={[-4.6 + t * 0.7, 0, -2.3]} rotationY={EAST} walk={t * 0.7} headPitch={0.28} hat />
        </>
      ),
    },
    {
      cue: "8.nights",
      ...cam.truck({ on: [0.5, 0.46, 0.8], dist: 1.9, yaw: 180, pitch: 3, by: [-1.15, 0, 0], fov: 38 }),
      zone: "village",
      note: "'It took thirty nights': the wall of the well, close. One scratch for every night, in bundles of five. Slide along them to the end. On 'thirty' the last one is cut.",
      stage: () => null,
    },
  ],
});

void ease;
void ramp;
