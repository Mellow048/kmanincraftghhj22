import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { EAST, Hero, KID, SOUTH, Townie, WEST, chestOf, faceOf, stride, timing } from "./kit";

const ME: Vec3 = [-1.2, 0, 3.4];

/** THE WISH. He likes it here. He wants one thing. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "I had never seen my face",
  shots: [
    {
      cue: "4.liked",
      ...cam.orbit({ on: chestOf([-0.85, 0, 3.4]), dist: 2.6, yaw: -14, pitch: 4, yawTo: 4 }),
      zone: "village",
      look: "overworld-day",
      note: "He and his best friend side by side in the sun, laughing, pumpkins and all. People pass behind them. It is a good town.",
      stage: (t, { p }) => (
        <>
          <Hero position={ME} rotationY={0.2} animation="laugh" carve="glad" />
          <Townie who={5} scale={KID} position={[-0.5, 0, 3.3]} rotationY={-0.3} animation="cheer" carve="grin" />
          <Townie who={2} {...stride([-3.4, 0, 1.2], [-1.6, 0, 1.0], p)} animation="walk" carve="grin" />
          <Townie who={9} position={[0.9, 0, 0.6]} rotationY={WEST} animation="wave" carve="glad" />
        </>
      ),
    },
    {
      cue: "4.wish",
      ...cam.push({ on: faceOf(ME), dist: 2.0, to: 1.5, yaw: 16, pitch: 0, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "Alone now. He lowers his head and the carved smile is gone flat.",
      stage: (t, { p }) => <Hero position={ME} rotationY={SOUTH} animation="idle" headPitch={0.1 + 0.25 * p} carve="flat" />,
    },
    {
      cue: "4.what",
      ...cam.push({ on: faceOf(ME), dist: 1.15, to: 0.85, yaw: 0, pitch: 0, fov: 30 }),
      zone: "village",
      look: "overworld-day",
      note: "Under a second long: the two carved eye holes fill the frame, with nothing in them but dark.",
      stage: () => <Hero position={ME} rotationY={SOUTH} animation="idle" carve="wow" />,
    },
  ],
});
