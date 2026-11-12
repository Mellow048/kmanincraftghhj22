import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { BED, BedBox, Hero, IN_BED, SOUTH, Townie, WEST, EAST, chestOf, room, stride, timing } from "./kit";

const ME: Vec3 = [0, 0, 3.2];

/** THE HOOK. The rule, and how far it goes. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Everyone wore a pumpkin",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: chestOf(ME), dist: 2.9, to: 2.2, yaw: 8, pitch: 3, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The square in daylight. A kid in red looks straight at us with a grinning pumpkin for a head, and behind him, stacked up the street, everyone else has one too.",
      stage: (t, { p }) => (
        <>
          <Hero position={ME} rotationY={SOUTH} animation="idle" carve="grin" />
          <Townie who={1} position={[-1.15, 0, 1.3]} rotationY={0.3} animation="wave" carve="glad" />
          <Townie who={2} {...stride([2.6, 0, 0.2], [0.6, 0, 0.0], p)} animation="walk" carve="flat" />
          <Townie who={3} position={[1.3, 0, -1.6]} rotationY={-0.4} animation="talk" carve="grin" />
          <Townie who={7} position={[0.35, 0, -1.9]} rotationY={EAST} animation="idle" carve="wow" />
          <Townie who={8} {...stride([-3.2, 0, -0.6], [-1.6, 0, -0.9], p)} animation="walk" carve="grin" />
          <Townie who={9} position={[-0.4, 0, -3.4]} rotationY={WEST} animation="idle" carve="frown" />
        </>
      ),
    },
    {
      cue: "1.bed",
      ...cam.top({ on: room(-0.9, 0.5, -1.3), height: 3.5, to: 3.0, spin: [-10, 6], fov: 44 }),
      zone: "room",
      look: "overworld-night",
      note: "'Even in bed': straight down on his bed at night. He is asleep under the blanket with the pumpkin still on. Its carved eyes are shut.",
      stage: () => (
        <>
          <BedBox position={BED} />
          <Hero position={IN_BED} animation="lie" carve="sleep" />
        </>
      ),
    },
  ],
});
