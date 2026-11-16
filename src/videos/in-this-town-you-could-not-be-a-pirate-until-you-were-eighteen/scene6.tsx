import { cam, storyScene } from "../../engine";
import { Boat, BowKid, Chest, Fill, HatKid, Hero, MapSheet, RedBall, RopePlayer, ease, ramp, timing, NIGHT } from "./kit";

const D = 0.72;

/** Bored, under the floor, the ball comes up. Night. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The hold",
  shots: [
    {
      cue: "6.bored",
      ...cam.push({ on: [0.15, 1.55, 0.7], dist: 3.4, to: 2.3, yaw: -12, pitch: 6, fov: 40 }),
      zone: "sea",
      look: NIGHT,
      note: "He will not look up from the map. The other three are already restless behind him.",
      stage: () => (
        <>
          <Fill on={[0.15, 1.6, 0.7]} yaw={-12} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={[0.15, D, 0.85]} rotationY={0.2} animation="idle" face="frown" headPitch={0.45}>
            <MapSheet position={[0.05, 0.02, 0.12]} rotation={[0.8, 0, 0]} />
          </Hero>
          <HatKid position={[-0.55, D, -0.15]} rotationY={1.2} lean={0.12} />
          <BowKid position={[0.55, D, 0.05]} rotationY={-1.1} />
          <RopePlayer position={[-0.1, D, -0.7]} rotationY={0} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "6.down",
      ...cam.truck({ on: [0.35, 0.55, -0.2], dist: 2.8, yaw: 40, pitch: 28, fov: 42, by: [0, -0.35, -0.8] }),
      zone: "sea",
      look: NIGHT,
      ease: "linear",
      note: "The camera follows the straw hat down the ladder, under the floor of the boat.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 1.1));
        return (
          <>
            <Fill on={[0.3, 0.8, -0.4]} yaw={40} power={4} />
            <Boat position={[0, 0.05, 0]} lantern={1} hatch={0.3 + k * 0.7} />
            <HatKid position={[0.4, D - k * 0.85, -0.5 - k * 0.4]} rotationY={Math.PI} y={0} lean={0.3 * k} />
          </>
        );
      },
    },
    {
      cue: "6.chest",
      ...cam.push({ on: [0.35, 0.55, -0.7], dist: 2.4, to: 1.6, yaw: -8, pitch: 18, fov: 38 }),
      zone: "sea",
      look: NIGHT,
      note: "The chest opens and the red ball comes up in the straw hat's folded sleeves.",
      stage: (t) => {
        const k = ease(ramp(t, 0.2, 0.8));
        return (
          <>
            <Fill on={[0.3, 0.7, -0.5]} yaw={-8} power={5} />
            <Boat position={[0, 0.05, 0]} lantern={1} hatch={1} />
            <Chest position={[0.15, 0.05, -0.85]} open={0.2 + k * 0.8} />
            <RedBall position={[0.15, 0.45 + k * 0.55, -0.7]} />
            <HatKid position={[0.55, 0.15, -0.35]} rotationY={-2.2} lean={0.35} />
          </>
        );
      },
    },
  ],
});
