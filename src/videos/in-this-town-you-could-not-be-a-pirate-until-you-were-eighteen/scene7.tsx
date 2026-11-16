import { cam, storyScene } from "../../engine";
import { Boat, BowKid, Bubble, Fill, HatKid, Hero, MapSheet, RedBall, RopePlayer, ease, ramp, timing, NIGHT } from "./kit";

const D = 0.72;

/** They play. He does not. The ball goes into the water. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The ball",
  shots: [
    {
      cue: "7.play",
      ...cam.truck({ on: [0, 1.5, 0.2], dist: 4.8, yaw: 100, pitch: 8, fov: 42, by: [0, 0, 1.6] }),
      zone: "sea",
      look: NIGHT,
      ease: "linear",
      note: "The three of them play on the deck. He stays at the bow with the map and does not look up.",
      stage: (t) => (
        <>
          <Fill on={[0, 1.5, 0.4]} yaw={100} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={[0.15, D, 1.35]} rotationY={0} animation="idle" face="frown" headPitch={0.4}>
            <MapSheet position={[0.05, 0.02, 0.1]} rotation={[0.7, 0, 0]} />
          </Hero>
          <HatKid position={[-0.35 + Math.sin(t * 3) * 0.15, D, 0.1]} rotationY={0.6} />
          <BowKid position={[0.4, D, -0.15]} rotationY={-0.8} />
          <RopePlayer position={[0.05, D, -0.45]} rotationY={Math.PI} animation="idle" face="grin" />
          <RedBall position={[-0.1, 1.15 + Math.abs(Math.sin(t * 4)) * 0.35, 0.15]} />
        </>
      ),
    },
    {
      cue: "7.us",
      ...cam.push({ on: [-0.1, 1.45, 0.15], dist: 2.8, to: 2.0, yaw: 8, pitch: 4, fov: 38 }),
      zone: "sea",
      look: NIGHT,
      note: "Play with us. The words are in the air over the straw hat, and the boy does not turn.",
      stage: () => (
        <>
          <Fill on={[-0.2, 1.5, 0.2]} yaw={8} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <HatKid position={[-0.35, D, 0.15]} rotationY={0.4} />
          <Bubble text="PLAY" position={[-0.35, 2.15, 0.15]} rotationY={0.2} dark />
          <Hero position={[0.2, D, 1.4]} rotationY={0} animation="idle" face="frown" headPitch={0.5} />
        </>
      ),
    },
    {
      cue: "7.slip",
      ...cam.push({ on: [0.7, 1.15, 2.2], dist: 3.2, to: 2.2, yaw: -20, pitch: 14, fov: 40 }),
      zone: "sea",
      look: NIGHT,
      note: "The ball hits the rail and drops off the bow into the water.",
      stage: (t) => {
        const k = ease(ramp(t, 0.25, 0.9));
        return (
          <>
            <Fill on={[0.4, 1.3, 1.8]} yaw={-20} />
            <Boat position={[0, 0.05, 0]} lantern={1} />
            <RedBall position={[0.55, 1.2 - k * 1.05, 1.6 + k * 1.3]} />
          </>
        );
      },
    },
    {
      cue: "8.jump",
      ...cam.push({ on: [0.2, 1.1, 2.4], dist: 4.2, to: 3.2, yaw: 6, pitch: 6, fov: 42 }),
      zone: "sea",
      look: NIGHT,
      note: "The straw hat leaves the deck and goes into the water after the ball.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 0.7));
        const y = D + Math.sin(k * Math.PI) * 0.7 - k * 0.7;
        return (
          <>
            <Fill on={[0.1, 1.2, 2]} yaw={6} />
            <Boat position={[0, 0.05, 0]} lantern={1} />
            <HatKid position={[0.15, y, 1.3 + k * 1.6]} rotationY={0} />
            <RedBall position={[0.4, 0.15, 3.1]} />
          </>
        );
      },
    },
    {
      cue: "8.watch",
      ...cam.push({ on: [0, 1.45, 0.3], dist: 3.6, to: 2.6, yaw: 180, pitch: 8, fov: 42 }),
      zone: "sea",
      look: NIGHT,
      note: "From behind the three on the deck. Their backs are to the sea, and to what is coming.",
      stage: () => (
        <>
          <Fill on={[0, 1.5, 0.2]} yaw={180} power={4} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={[0.15, D, 1.15]} rotationY={0} animation="idle" face="wow" />
          <BowKid position={[0.55, D, 0.7]} rotationY={0.1} />
          <RopePlayer position={[-0.4, D, 0.85]} rotationY={0.15} animation="idle" face="wow" />
          <HatKid position={[0.2, 0.05, 3.0]} rotationY={Math.PI} />
        </>
      ),
    },
    {
      cue: "8.got",
      ...cam.push({ on: [0.25, 0.7, 3.05], dist: 2.8, to: 1.9, yaw: 12, pitch: 4, fov: 38 }),
      zone: "sea",
      look: NIGHT,
      note: "He has the ball up. Then the laugh stops. He is looking past the boat.",
      stage: (t) => (
        <>
          <Fill on={[0.25, 0.9, 2.8]} yaw={12} power={4} />
          <HatKid position={[0.2, 0.02, 3.05]} rotationY={Math.PI} lean={t > 0.7 ? 0.12 : 0} />
          <RedBall position={[0.2, 1.15, 2.85]} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
        </>
      ),
    },
  ],
});
