import { cam, storyScene } from "../../engine";
import { EAST, Hero, NORTH, PLACE, ROBE, Villager, WEST, timing } from "./kit";

const FOUND = PLACE.found;

/** THREE MYSTERIES. Where he came from, the black house, the hill. Each one is paid back at the end. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Three mysteries",
  shots: [
    {
      cue: "2.from",
      ...cam.push({ on: [FOUND[0] - 0.45, 0.92, FOUND[2]], dist: 2.7, to: 2.3, yaw: 62, pitch: -9, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'Where I had come from': years ago, in the grass under the hill. From behind a very small him, both arms up to be lifted; the oldest villager bends her one face down over him. Nobody else, and nothing to say how he got there.",
      stage: () => (
        <>
          <Hero position={FOUND} rotationY={WEST} scale={0.45} animation="lift" face="wow" />
          <Villager position={[FOUND[0] - 0.8, 0, FOUND[2]]} rotationY={EAST} robe={ROBE.elder} nod={0.5} lean={0.2} phase={2.2} />
        </>
      ),
    },
    {
      cue: "2.black",
      ...cam.push({ on: [-21, 1.8, -6.5], dist: 13, to: 10.6, yaw: 16, pitch: -2, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "The word is 'burned black': push in on the one black house in a bright town, with him small in front of it on the scorched ground, looking up.",
      stage: () => <Hero position={[-20.4, 0, -2.2]} rotationY={NORTH} animation="idle" face="uneasy" headPitch={-0.3} />,
    },
    {
      cue: "2.hill",
      ...cam.pan({ from: [20.4, 2.3, 4.3], on: [24, 1.3, 2], onTo: [43, 8.6, 0], fov: 48 }),
      zone: "village",
      look: "overworld-day",
      note: "'Behind the hill': from the back of his head, tilt up to the green ridge that closes the valley. This is the place the film is going.",
      stage: () => <Hero position={PLACE.streetEnd} rotationY={EAST} animation="idle" face="uneasy" headPitch={-0.25} />,
    },
  ],
});
