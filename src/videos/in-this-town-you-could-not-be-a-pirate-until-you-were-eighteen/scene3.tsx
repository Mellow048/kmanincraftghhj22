import { cam, storyScene } from "../../engine";
import { BowKid, HatKid, Hero, Lantern, RopePlayer, ease, ramp, timing, DAY } from "./kit";

/** Two villagers and one player. Each shot is a different body. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The crew",
  shots: [
    {
      cue: "3.crew",
      ...cam.truck({ on: [0, 1.2, 0.2], dist: 6.4, yaw: 88, pitch: 6, fov: 42, by: [2.6, 0, 0] }),
      zone: "dock",
      look: DAY,
      note: "Travelling along the three he asked: straw hat, bow, and the player.",
      stage: (t) => {
        const x = ease(ramp(t, 0, 1.1)) * 1.5;
        return (
          <>
            <Hero position={[1.6, 0, 1.6]} rotationY={Math.PI} animation="wave" face="grin" />
            <HatKid position={[-2.4 + x, 0, 0.2]} rotationY={0} walk={x} />
            <BowKid position={[-1.6 + x, 0, -0.55]} rotationY={0.15} walk={x} />
            <RopePlayer position={[-0.5 + x, 0, 0.45]} rotationY={0.2} animation="walk" animDistance={x} face="smile" />
          </>
        );
      },
    },
    {
      cue: "3.hat",
      ...cam.push({ on: [-0.3, 1.15, 0.35], dist: 2.5, to: 1.7, yaw: 14, pitch: 4, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "The straw hat says yes before the question is done. He is already nodding.",
      stage: (t) => <HatKid position={[-0.3, 0, 0.3]} rotationY={0.5} lean={0.22 * ease(ramp(t, 0.1, 0.45))} />,
    },
    {
      cue: "3.bow",
      ...cam.push({ on: [0.65, 1.15, -0.15], dist: 2.7, to: 1.85, yaw: -36, pitch: 12, fov: 38 }),
      zone: "dock",
      look: DAY,
      note: "The bow, from the other shoulder, and the lantern she brought, sitting in front of her.",
      stage: () => (
        <>
          <BowKid position={[0.65, 0, -0.15]} rotationY={-0.4} />
          <Lantern position={[0.95, 0.55, 0.15]} scale={0.55} light={0.4} />
        </>
      ),
    },
    {
      cue: "3.player",
      ...cam.push({ on: [1.2, 1.4, 0.55], dist: 3.2, to: 2.2, yaw: 42, pitch: -10, fov: 38 }),
      zone: "dock",
      look: DAY,
      note: "From below. The player is not a villager. The rope is in his hand.",
      stage: () => <RopePlayer position={[1.2, 0, 0.45]} rotationY={-0.7} animation="idle" arms="hold" face="smile" />,
    },
  ],
});
