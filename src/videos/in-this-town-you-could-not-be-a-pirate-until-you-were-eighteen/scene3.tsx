import { cam, storyScene } from "../../engine";
import { BowKid, HatKid, Hero, Lantern, RopePlayer, ease, ramp, timing, DAY } from "./kit";

/** Two villagers and one player. Each yes is a different picture. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "The crew",
  shots: [
    {
      cue: "3.crew",
      ...cam.truck({ on: [-1.2, 1.2, 2.2], dist: 5.4, yaw: 78, pitch: 6, fov: 44, by: [3.4, 0, 0] }),
      zone: "dock",
      look: DAY,
      note: "Travelling the crew he asked: straw hat, bow, and the player with the rope, spaced apart.",
      stage: (t) => {
        const walk = ease(ramp(t, 0.1, 1)) * 1.2;
        return (
          <>
            <Hero position={[-1.6, 0, 2.6]} rotationY={0.4} animation="talk" face="smile" />
            <HatKid position={[-0.2, 0, 1.7]} rotationY={2.4} walk={walk} />
            <BowKid position={[1.15, 0, 1.85]} rotationY={2.2} />
            <RopePlayer position={[2.4, 0, 1.55]} rotationY={2.6} animation="walk" animDistance={walk} face="smile" />
          </>
        );
      },
    },
    {
      cue: "3.hat",
      ...cam.push({ on: [-0.15, 1.25, 1.7], dist: 2.3, to: 1.75, yaw: 18, pitch: 4, fov: 34 }),
      zone: "dock",
      look: DAY,
      note: "The straw hat, close, saying yes before the question has finished.",
      stage: () => <HatKid position={[-0.15, 0, 1.55]} rotationY={2.8} lean={-0.06} />,
    },
    {
      cue: "3.bow",
      ...cam.push({ on: [1.2, 1.2, 1.9], dist: 2.5, to: 1.9, yaw: -16, pitch: 6, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "The bow, and the lantern he brought, both in the frame when the word lands.",
      stage: () => (
        <>
          <BowKid position={[1.15, 0, 1.7]} rotationY={2.5} />
          <Lantern position={[1.55, 1.05, 1.95]} light={0.4} scale={0.85} />
        </>
      ),
    },
    {
      cue: "3.player",
      ...cam.push({ on: [2.35, 1.25, 1.6], dist: 2.7, to: 2.05, yaw: 12, pitch: 4, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "The player, and the rope in his hands, not a crowd standing on top of him.",
      stage: () => <RopePlayer position={[2.35, 0, 1.45]} rotationY={2.7} animation="idle" arms="hold" face="smile" />,
    },
  ],
});
