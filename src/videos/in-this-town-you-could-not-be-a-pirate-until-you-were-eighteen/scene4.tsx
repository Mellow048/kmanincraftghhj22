import { Block, cam, storyScene } from "../../engine";
import { Boat, Chest, Dad, Hero, Mum, RedBall, ease, ramp, timing, DAY } from "./kit";

/** Food, water, the red ball, then mum and dad. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The list",
  shots: [
    {
      cue: "4.food",
      ...cam.top({ on: [0.4, 0.2, 2.4], height: 2.8, to: 1.7, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "Straight down into the chest as the food goes in. The list is things.",
      stage: () => (
        <>
          <Chest position={[0.4, 0, 2.4]} open={0.45}>
            <Block position={[0, 0.36, 0]} size={[0.28, 0.1, 0.18]} color="#c4a574" />
          </Chest>
          <Hero position={[-0.35, 0, 1.65]} rotationY={0.5} animation="reach" face="smile" />
        </>
      ),
    },
    {
      cue: "4.water",
      ...cam.push({ on: [0.4, 0.75, 2.4], dist: 2.1, to: 1.45, yaw: 22, pitch: 30, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "The water goes in beside the food. A blue bottle, beside the bread.",
      stage: () => (
        <Chest position={[0.4, 0, 2.4]} open={0.6}>
          <Block position={[-0.12, 0.34, 0]} size={[0.2, 0.08, 0.14]} color="#c4a574" />
          <Block position={[0.16, 0.4, 0.02]} size={[0.1, 0.22, 0.1]} color="#3d8ec9" />
        </Chest>
      ),
    },
    {
      cue: "4.ball",
      ...cam.push({ on: [0.55, 0.9, 2.3], dist: 1.8, to: 1.15, yaw: -18, pitch: 22, fov: 34 }),
      zone: "dock",
      look: DAY,
      note: "The red ball drops in last. It is the thing that will go into the sea.",
      stage: (t) => (
        <>
          <Chest position={[0.4, 0, 2.4]} open={0.75} />
          <RedBall position={[0.5, 1.35 - ease(ramp(t, 0.15, 0.75)) * 0.75, 2.35]} />
        </>
      ),
    },
    {
      cue: "4.mum",
      ...cam.push({ on: [0.0, 1.2, 1.4], dist: 2.7, to: 1.9, yaw: -10, pitch: 4, fov: 38 }),
      zone: "dock",
      look: DAY,
      note: "Mum stands against his sleeve. She has no hands. The robe is what will not let go.",
      stage: () => (
        <>
          <Hero position={[0.2, 0, 1.55]} rotationY={-0.7} animation="idle" face="uneasy" />
          <Mum position={[-0.28, 0, 1.32]} rotationY={0.9} lean={0.24} />
          <Boat position={[0, 0, 6.4]} />
        </>
      ),
    },
    {
      cue: "4.dad",
      ...cam.orbit({ on: [0.95, 1.35, 1.05], dist: 2.4, yaw: 8, yawTo: 50, pitch: 6, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "Dad smiles. The line is his, and the hat brim tips with it.",
      stage: () => <Dad position={[0.95, 0, 1.05]} rotationY={-0.6} lean={0.06} />,
    },
  ],
});
