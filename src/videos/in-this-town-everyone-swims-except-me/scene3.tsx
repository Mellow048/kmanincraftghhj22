import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, Phone, PLACE, Splash, Swimmer, timing, travel } from "./kit";

/**
 * 03 PHONE — "learn fast", and the one thing the video cannot teach him.
 *
 * He learns to move through the water. He never learns to stay on it.
 * Every shot here is his own private experiment, so the pool is empty and the camera is close.
 */

const P = PLACE.pool[0];

/** A kid at the surface, face down, swimming. */
const Crawling: React.FC<{ at: Vec3; turn?: number; splash?: boolean }> = ({ at, turn = 0, splash = false }) => (
  <Swimmer at={at} turn={turn}>
    <group rotation={[0, 0, Math.PI]}>
      <Hero position={[0, 0, 0]} animation="reach" face="scared" />
    </group>
    {splash ? <Splash at={[0, 0.3, 0]} size={0.12} count={7} seed={4} /> : null}
  </Swimmer>
);

/** A kid on his back, floating. */
const Floating: React.FC<{ at: Vec3; turn?: number }> = ({ at, turn = 0 }) => (
  <Swimmer at={at} turn={turn}>
    <Hero position={[0, 0, 0]} animation="lie" face="surprised" />
  </Swimmer>
);

export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Learn Fast",
  shots: [
    {
      cue: "3.phone",
      ...cam.push({ on: [121.3, 0.95, 39.6], dist: 3.6, to: 2.6, yaw: -8, pitch: 12, fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "The room at night, lit only by the phone: him on the bed, the screen the brightest thing in the town. The idea arrives as a small blue rectangle.",
      stage: () => (
        <>
          <Hero position={[122.7, 0.34, 39.9]} rotationY={0} animation="lie" face="sleepy" />
          <Phone position={[121.1, 0.66, 39.95]} rotation={[-0.5, 0, 0]} scale={1} />
        </>
      ),
    },
    {
      cue: "3.title",
      ...cam.top({ on: [120.9, 0.68, 39.95], height: 1.05, to: 0.8, spin: [-8, 4], fov: 40 }),
      zone: "home",
      look: "overworld-night",
      note: "Straight down on the screen: two words, held by two thumbs. The whole plan of the film is a video title.",
      stage: () => (
        <>
          <Phone position={[120.9, 0.66, 39.95]} rotation={[-0.35, 0.06, 0]} word="LEARN FAST" />
        </>
      ),
    },
    {
      cue: "3.try",
      ...cam.push({ on: [P + 2, 0.85, 5.5], dist: 3.2, to: 2.4, yaw: 198, pitch: 4, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Next morning, alone: he stands at the wall with his fists closed, doing the thing the video said before he does it.",
      stage: (_t, { p }) => (
        <>
          <Hero
            position={travel(p, [P + 2.6, 0, 7.6], [P + 2, -1.0, 5.5])}
            rotationY={Math.PI}
            animation={p < 0.55 ? "walk" : "fall"}
            animDistance={p * 1.6}
            face="worried"
            headPitch={0.1}
          />
        </>
      ),
    },
    {
      cue: "3.sank",
      ...cam.push({ on: [P + 3.2, -0.9, 4.2], dist: 2.8, to: 2.1, yaw: 104, pitch: 2, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Side on, under the surface: down he goes, and the water does not care. One clean vertical drop in a horizontal film.",
      stage: (_t, { p }) => (
        <>
          <Hero position={[P + 3.2, -0.5 - p * 1.25, 4.2]} animation="fall" face="scared" />
          <Splash at={[P + 3.2, -0.05, 4.2]} size={0.14} count={7} seed={17} />
        </>
      ),
    },
    {
      cue: "3.again",
      ...cam.orbit({ on: [P + 5, 0.25, 4.2], dist: 2.2, yaw: -118, pitch: 10, yawTo: -146, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "On the water line, orbiting his head as he comes up and starts again: the trying is a loop, and the camera goes round once.",
      stage: () => (
        <>
          <Hero position={[P + 5, -0.85, 4.2]} rotationY={-1.2} animation="panic" face="scared" />
          <Splash at={[P + 5, 0.0, 4.2]} size={0.12} count={8} seed={23} />
        </>
      ),
    },
    {
      cue: "3.again2",
      ...cam.top({ on: [P + 5.4, -0.2, 4.2], height: 4.0, to: 2.7, spin: [12, -4], fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Straight down again, from higher: the same patch of water, the same boy, the same failure, made into a pattern.",
      stage: () => (
        <>
          <Hero position={[P + 5.4, -1.15, 4.2]} animation="panic" face="scared" />
          <Splash at={[P + 5.4, 0.0, 4.2]} size={0.13} count={9} seed={29} />
        </>
      ),
    },
    {
      cue: "3.up",
      ...cam.push({ on: [P + 8, 0.15, 2.4], dist: 4.6, to: 3.4, yaw: 34, pitch: 24, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "High and tilted: he is on his back on the surface, arms out, eyes open. The first time the water holds him, seen from above like a map.",
      stage: () => (
        <Floating at={[P + 8, -0.02, 2.4]} turn={0.5} />
      ),
    },
    {
      cue: "3.cross",
      ...cam.truck({ on: [P + 8, 0.4, 2.4], dist: 3.2, yaw: 92, pitch: 12, fov: 40, by: [4, 0, 0] }),
      zone: "pool",
      look: "overworld-day",
      note: "Travelling beside the lane as he actually swims: splash trail, lane rope cutting the frame, the far wall arriving.",
      stage: (t) => (
        <>
          <Crawling at={[P + 6.6 + t * 1.6, -0.02, 2.4]} turn={Math.PI / 2} splash />
        </>
      ),
    },
    {
      cue: "3.stop",
      ...cam.push({ on: [P + 11, 0.3, 2.4], dist: 4.6, to: 3.6, yaw: 96, pitch: 5, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "From the end of the lane: he stops to breathe, and the water starts taking him back down. The stop is the turn.",
      stage: () => (
        <>
          <Hero position={[P + 10.4, -0.2, 2.4]} rotationY={-Math.PI / 2} animation="panic" face="scared" />
          <Splash at={[P + 10.4, 0.0, 2.4]} size={0.1} count={5} seed={31} />
        </>
      ),
    },
    {
      cue: "3.coin",
      ...cam.top({ on: [P + 10.2, -0.8, 2.4], height: 3.2, to: 1.5, spin: [-9, 3], fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Straight down as he sinks: a coin dropped in a glass, the lane rope above him like a bar. The pool keeps what it is given.",
      stage: (_t, { p }) => (
        <>
          <Hero position={[P + 10.2, -0.6 - p * 1.1, 2.4]} animation="fall" face="blank" />
        </>
      ),
    },
  ],
});
