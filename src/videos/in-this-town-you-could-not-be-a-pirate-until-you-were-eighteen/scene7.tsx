import { cam, storyScene } from "../../engine";
import { Boat, BowKid, Bubble, Fill, HatKid, Hero, MapSheet, RedBall, RopePlayer, ease, ramp, timing, wordAt, NIGHT } from "./kit";

const D = 0.72;

/** They play. He will not look up. The ball goes in. The straw hat goes after it. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Play with us",
  shots: [
    {
      cue: "7.play",
      ...cam.truck({ on: [-1.3, 1.35, 0.3], dist: 4.4, yaw: 86, pitch: 8, fov: 42, by: [0, 0, 1.6] }),
      zone: "sea",
      look: NIGHT,
      note: "Three of them and a red ball on the deck. He is in the foreground with the map, not looking.",
      stage: (t) => (
        <>
          <Fill on={[0.2, 1.5, 1.2]} yaw={80} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={[0.45, D, 1.15]} rotationY={0.5} animation="idle" face="frown" headPitch={0.3}>
            <MapSheet />
          </Hero>
          <HatKid position={[-0.45, D, 0.15]} rotationY={0.4} walk={t * 0.8} />
          <BowKid position={[0.5, D, -0.35]} rotationY={-0.5} />
          <RopePlayer position={[-0.15, D, -0.55]} rotationY={0.8} animation="idle" face="grin" />
          <RedBall position={[-0.1 + Math.sin(t * 4) * 0.25, D + 0.55, 0.05]} />
        </>
      ),
    },
    {
      cue: "7.us",
      ...cam.push({ on: [-0.2, 1.45, 0.35], dist: 2.7, to: 2.1, yaw: 20, pitch: 6, fov: 36 }),
      zone: "sea",
      look: NIGHT,
      note: "They say it to his back. The words are in the air. He does not turn.",
      stage: () => (
        <>
          <Fill on={[0.3, 1.5, 1.1]} yaw={15} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={[0.4, D, 1.1]} rotationY={0.2} animation="idle" face="frown" />
          <HatKid position={[-0.35, D, 0.2]} rotationY={0.1} />
          <Bubble text="PLAY" position={[-0.35, 2.05, 0.15]} rotationY={0.2} dark scale={0.7} />
        </>
      ),
    },
    {
      cue: "7.slip",
      ...cam.push({ on: [0.7, 1.05, 1.5], dist: 3.6, to: 2.7, yaw: 40, pitch: 16, fov: 40 }),
      zone: "sea",
      look: NIGHT,
      note: "The ball hits the rail and drops off the side. The splash is the end of the shot.",
      stage: (t) => {
        const fall = ease(ramp(t, wordAt("7.slip", "water") - 0.35, wordAt("7.slip", "water") + 0.25));
        return (
          <>
            <Fill on={[0.4, 1.4, 1.2]} yaw={30} />
            <Boat position={[0, 0.05, 0]} lantern={1} />
            <RedBall position={[0.7 + fall * 0.7, 1.15 - fall * 1.2, 1.3 + fall * 0.5]} />
            <Hero position={[0.35, D, 0.9]} rotationY={0.6} animation="reach" face="wow" />
          </>
        );
      },
    },
    {
      cue: "8.jump",
      ...cam.truck({ on: [0.2, 1.2, 1.1], dist: 4.2, yaw: 78, pitch: 6, fov: 42, by: [1.4, -0.3, 0.4] }),
      zone: "sea",
      look: NIGHT,
      note: "He leaves the deck. Side-on, the arc ends in the water beside the ball.",
      stage: (t) => {
        const jump = ease(ramp(t, wordAt("8.jump", "jumped") - 0.1, wordAt("8.jump", "jumped") + 0.55));
        const x = -0.2 + jump * 1.7;
        const y = D + Math.sin(jump * Math.PI) * 0.85 - jump * 0.7;
        return (
          <>
            <Fill on={[1.2, 1.2, 1.6]} yaw={70} />
            <Boat position={[0, 0.05, 0]} lantern={1} />
            <HatKid position={[x, 0, 1.15]} y={y - 0} />
            <RedBall position={[1.7, 0.12, 1.55]} />
          </>
        );
      },
    },
    {
      cue: "8.watch",
      ...cam.push({ on: [0.15, 1.45, 0.5], dist: 4.2, to: 3.3, yaw: 168, pitch: 8, fov: 42 }),
      zone: "sea",
      look: NIGHT,
      note: "From behind the three on deck, looking at the water where he went in. Their backs are to the other sea.",
      stage: () => (
        <>
          <Fill on={[0.2, 1.6, 1.6]} yaw={170} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={[0.35, D, 0.7]} rotationY={0.35} animation="idle" face="uneasy" />
          <BowKid position={[0.7, D, 0.15]} rotationY={0.5} />
          <RopePlayer position={[-0.25, D, 0.25]} rotationY={0.2} animation="idle" face="wow" />
          <HatKid position={[1.55, -0.05, 1.7]} rotationY={Math.PI} />
          <RedBall position={[1.75, 0.2, 1.85]} />
        </>
      ),
    },
    {
      cue: "8.got",
      ...cam.push({ on: [1.5, 0.9, 1.75], dist: 3.4, to: 2.5, yaw: 24, pitch: 10, fov: 38 }),
      zone: "sea",
      look: NIGHT,
      note: "He holds the ball up out of the water, then stops. The laugh dies on his face.",
      stage: (t) => {
        const stop = ease(ramp(t, wordAt("8.got", "stopped"), wordAt("8.got", "stopped") + 0.3));
        return (
          <>
            <Fill on={[1.2, 1.1, 2.4]} yaw={20} power={6} />
            <Boat position={[0, 0.05, 0]} lantern={1} />
            <HatKid position={[1.5, -0.08, 1.65]} rotationY={2.4} lean={stop * 0.15} />
            <RedBall position={[1.35, 0.85 + (1 - stop) * 0.25, 1.85]} />
          </>
        );
      },
    },
  ],
});
