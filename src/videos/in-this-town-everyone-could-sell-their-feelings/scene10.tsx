import { cam, storyScene, stride } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, Villager, ROBE, timing, wordAt, ramp, Cart } from "./kit";

const STAND: Vec3 = [6.4, 0, -1.2];
const CART_START: Vec3 = [13, 0, 3.8];

/** THE EDGE — rush, line, pouring with both hands, not hearing wheels. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "The edge",
  shots: [
    {
      cue: "10.rush",
      ...cam.push({ on: [6.4, 1.15, -1.0], dist: 3.0, to: 2.5, yaw: -14, pitch: 6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'The rush came just before close': wide — line forming fast, afternoon light, his stall suddenly centre of town.",
      stage: (t, { p }) => (
        <>
          <Hero position={STAND} animation="talk" face="grin" />
          <Villager position={[4.9, 0, -0.2]} robe={ROBE.brown} lookAt={[6.4, 1.0, -1.0]} phase={0.3} />
          <Villager position={[5.4, 0, 0.2]} robe={ROBE.white} lookAt={[6.4, 1.0, -1.0]} phase={1.9} />
          <Villager position={[7.4, 0, -0.3]} robe={ROBE.blue} lookAt={[6.4, 1.0, -1.0]} phase={2.4} />
        </>
      ),
    },
    {
      cue: "10.line",
      ...cam.truck({ on: [7.5, 1.0, 3.8], dist: 3.8, yaw: 85, pitch: 4, by: [-4.5, 0, 0], fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'A line for lemonade, a cart rolling behind me, and I felt nothing': tracking behind stall — cart enters left, rolls right, his back to it. Nothing in face.",
      stage: (t, { p }) => (
        <>
          <Hero position={STAND} rotationY={0.1} animation="idle" face="smile" />
          <Cart position={[13 - p * 9, 0, 3.8]} />
        </>
      ),
    },
    {
      cue: "10.hands",
      ...cam.push({ on: [6.4, 0.92, -1.6], dist: 1.7, to: 1.4, yaw: -8, pitch: 18, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "'I kept pouring with both hands': close on hands — pitcher tipped, cups filling, both hands busy so neither can grab or shield.",
      stage: () => <Hero position={STAND} animation="hold" face="grin" gaze={0} />,
    },
    {
      cue: "10.lean",
      ...cam.push({ on: [6.35, 1.15, -0.9], dist: 2.0, to: 1.6, yaw: 28, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'I leaned over the counter and didn't hear the wheels': he leans in to hear order, ears away from road — cart now inches behind, silent to him.",
      stage: (t, { p }) => (
        <>
          <Hero position={STAND} rotationY={-0.35} animation="idle" face="smile" headPitch={0.22} />
          <Cart position={[5.2 - p * 0.5, 0, 3.8]} />
        </>
      ),
    },
  ],
});
