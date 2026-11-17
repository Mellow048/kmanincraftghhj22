import { cam, storyScene } from "../../engine";
import { Boat, BowKid, Chest, Fill, HatKid, Hero, MapSheet, RedBall, RopePlayer, ease, ramp, timing, wordAt, NIGHT } from "./kit";

const D = 0.72;

/** They get bored. He does not. The straw hat goes under the floor and comes up with the ball. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "The ball",
  shots: [
    {
      cue: "6.bored",
      ...cam.push({ on: [0.35, 1.45, 1.15], dist: 3.4, to: 2.5, yaw: 156, pitch: 8, fov: 40 }),
      zone: "sea",
      look: NIGHT,
      note: "He holds the map. Behind him the other three have stopped looking at it.",
      stage: () => (
        <>
          <Fill on={[0.5, 1.5, 1.8]} yaw={150} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={[0.4, D, 1.05]} rotationY={0.3} animation="idle" face="frown" headPitch={0.2}>
            <MapSheet />
          </Hero>
          <HatKid position={[-0.55, D, 0.15]} rotationY={1.2} lean={0.12} />
          <BowKid position={[0.65, D, -0.35]} rotationY={-0.8} />
          <RopePlayer position={[-0.2, D, -0.7]} rotationY={0.6} animation="idle" face="uneasy" />
        </>
      ),
    },
    {
      cue: "6.down",
      ...cam.push({ on: [-0.15, 1.1, -0.2], dist: 3.6, to: 2.7, yaw: 40, pitch: 22, fov: 40 }),
      zone: "sea",
      look: NIGHT,
      note: "The straw hat drops through the hatch. The ladder and the open lid are the picture.",
      stage: (t) => {
        const down = ease(ramp(t, wordAt("6.down", "down"), wordAt("6.down", "floor") + 0.3));
        return (
          <>
            <Fill on={[0.4, 1.4, 0.8]} yaw={30} />
            <Boat position={[0, 0.05, 0]} hatch={0.3 + down * 0.7} lantern={1} />
            <HatKid position={[-0.15, D - down * 0.7, -0.15]} rotationY={0.2} y={0} />
          </>
        );
      },
    },
    {
      cue: "6.chest",
      ...cam.push({ on: [0.15, 1.15, 0.15], dist: 2.8, to: 2.15, yaw: -24, pitch: 24, fov: 38 }),
      zone: "sea",
      look: NIGHT,
      note: "He comes back up through the hatch with the red ball. The chest is open behind him.",
      stage: (t) => {
        const up = ease(ramp(t, wordAt("6.chest", "came"), wordAt("6.chest", "ball")));
        return (
          <>
            <Fill on={[0.5, 1.3, 0.9]} yaw={-10} power={6} />
            <Boat position={[0, 0.05, 0]} hatch={0.8} lantern={1} />
            <Chest position={[0.55, D, -0.55]} open={0.7} />
            <HatKid position={[-0.1, D - 0.35 + up * 0.4, -0.1]} />
            <RedBall position={[0.15, 0.85 + up * 0.45, 0.15]} />
          </>
        );
      },
    },
  ],
});
