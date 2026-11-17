import { Block, cam, storyScene } from "../../engine";
import { Boat, Chest, Dad, Hero, Mum, RedBall, ease, ramp, timing, wordAt, DAY } from "./kit";

/** Food, water, the red ball, then mum and dad. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The list",
  shots: [
    {
      cue: "4.food",
      ...cam.push({ on: [0.35, 0.9, 2.55], dist: 2.8, to: 2.15, yaw: 36, pitch: 28, fov: 38 }),
      zone: "dock",
      look: DAY,
      note: "Looking down into an open chest as the bread goes in. The lid is the action.",
      stage: (t) => {
        const open = 0.2 + ease(ramp(t, 0.1, 0.6)) * 0.6;
        return (
          <>
            <Chest position={[0.35, 0, 2.35]} open={open}>
              <Block position={[0, 0.38, 0.02]} size={[0.32, 0.12, 0.2]} color="#c4a574" />
            </Chest>
            <Hero position={[-0.45, 0, 1.45]} rotationY={0.45} animation="reach" face="smile" />
          </>
        );
      },
    },
    {
      cue: "4.water",
      ...cam.push({ on: [0.4, 0.85, 2.4], dist: 2.4, to: 1.85, yaw: -20, pitch: 32, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "A blue bottle drops in beside the bread. Water, not a colour on the dock.",
      stage: () => (
        <>
          <Chest position={[0.35, 0, 2.35]} open={0.7}>
            <Block position={[-0.12, 0.38, 0]} size={[0.28, 0.1, 0.16]} color="#c4a574" />
            <Block position={[0.14, 0.42, 0.02]} size={[0.12, 0.22, 0.12]} color="#3d8fd4" />
          </Chest>
        </>
      ),
    },
    {
      cue: "4.ball",
      ...cam.push({ on: [0.5, 0.9, 2.2], dist: 2.6, to: 1.9, yaw: 18, pitch: 22, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "The red ball goes in last, and it is the only red thing in the chest.",
      stage: (t) => {
        const drop = ease(ramp(t, wordAt("4.ball", "red") - 0.2, wordAt("4.ball", "red") + 0.35));
        return (
          <>
            <Chest position={[0.35, 0, 2.35]} open={0.75} />
            <RedBall position={[0.35, 1.15 - drop * 0.7, 2.35]} />
            <Hero position={[-0.4, 0, 1.4]} rotationY={0.4} animation="reach" face="grin" />
          </>
        );
      },
    },
    {
      cue: "4.mum",
      ...cam.push({ on: [0.2, 1.3, 1.5], dist: 2.8, to: 2.15, yaw: 24, pitch: 4, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "Mum stands against his sleeve and will not step back. Both faces, no roof in the way.",
      stage: () => (
        <>
          <Mum position={[-0.55, 0, 1.35]} rotationY={0.6} lean={0.18} />
          <Hero position={[0.45, 0, 1.55]} rotationY={-0.7} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "4.dad",
      ...cam.push({ on: [1.15, 1.35, 1.35], dist: 2.5, to: 1.9, yaw: -18, pitch: 4, fov: 34 }),
      zone: "dock",
      look: DAY,
      note: "Dad, calm, with the boat behind him. The smile is the voice. The boat is the promise.",
      stage: () => (
        <>
          <Dad position={[1.2, 0, 1.15]} rotationY={-0.4} lean={0.04} />
          <Hero position={[0.25, 0, 1.7]} rotationY={0.5} animation="idle" face="smile" />
          <Boat position={[0, 0, 8.8]} />
        </>
      ),
    },
  ],
});
