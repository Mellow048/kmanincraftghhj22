import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { EAST, Hero, NORTH, SOUTH, Townie, WEST, faceOf, timing, wordAt } from "./kit";

const ME: Vec3 = [3, 0, 3];
const MUM: Vec3 = [3.2, 0, 1.9];
const WHY = wordAt("2.why", "why");

/** THE RULE NOBODY EXPLAINS. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Nobody knew",
  shots: [
    {
      cue: "2.who",
      ...cam.truck({ on: [-2.4, 1.5, 0.4], dist: 3.3, yaw: -24, pitch: 2, by: [0.5, 0, -0.5] }),
      zone: "village",
      look: "overworld-day",
      note: "Three grown-ups in a row down the street, nearest to farthest, and each one shrugs.",
      stage: () => (
        <>
          <Townie who={1} position={[-3.0, 0, 1.6]} rotationY={-0.5} animation="shrug" carve="flat" />
          <Townie who={3} position={[-2.2, 0, 0.3]} rotationY={-0.4} animation="shrug" carve="wow" />
          <Townie who={7} position={[-1.5, 0, -1.0]} rotationY={-0.3} animation="shrug" carve="frown" />
        </>
      ),
    },
    {
      cue: "2.mother",
      ...cam.push({ on: [MUM[0], 1.55, MUM[2]], dist: 3.0, to: 2.4, yaw: 12, pitch: -10, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "From behind the kid, looking up: his mother bends her pumpkin down to him. It has a kind carved smile, and that is all he has ever seen of her.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={NORTH} animation="idle" headPitch={-0.3} carve="flat" />
          <Townie who={4} position={MUM} rotationY={SOUTH} animation="idle" headPitch={0.32} carve="glad" />
          <Townie who={9} position={[4.6, 0, -0.8]} rotationY={WEST} animation="idle" carve="grin" />
        </>
      ),
    },
    {
      cue: "2.why",
      ...cam.push({ on: faceOf(ME), dist: 1.9, to: 1.4, yaw: -10, pitch: 2, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "The teller's pumpkin, close, and now it frowns. He looks left and right for anyone who will answer. Nobody is looking at him.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={SOUTH} animation="idle" headYaw={Math.sin((t - WHY) * 4) * 0.5} carve="frown" />
          <Townie who={2} position={[1.9, 0, 1.2]} rotationY={EAST * -1} animation="idle" carve="flat" />
          <Townie who={8} position={[4.3, 0, 0.6]} rotationY={NORTH} animation="idle" carve="grin" />
        </>
      ),
    },
  ],
});
