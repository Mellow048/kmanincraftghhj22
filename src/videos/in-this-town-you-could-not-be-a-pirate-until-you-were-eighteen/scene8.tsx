import { Block, cam, storyScene } from "../../engine";
import { Boat, BowKid, Bubble, Fill, HatKid, Hero, Kraken, RedBall, RopePlayer, SeaShadow, ease, ramp, timing, NIGHT } from "./kit";

const D = 0.72;

/** The slow turn, then the kraken, at night. The last line is to be continued. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The turn",
  shots: [
    {
      cue: "9.past",
      ...cam.push({ on: [0.2, 1.05, 2.9], dist: 2.2, to: 1.45, yaw: 170, pitch: 2, fov: 34 }),
      zone: "sea",
      look: NIGHT,
      note: "His face, in the water, looking past the camera at something behind the boat.",
      stage: () => (
        <>
          <Fill on={[0.2, 1.1, 2.9]} yaw={170} power={5} />
          <HatKid position={[0.2, 0.02, 3.05]} rotationY={Math.PI} lean={0.08} />
          <RedBall position={[0.35, 0.85, 2.9]} />
        </>
      ),
    },
    {
      cue: "9.slow",
      ...cam.orbit({ on: [0.1, 1.4, 0.6], dist: 4.2, yaw: 20, yawTo: 160, pitch: 8, pitchTo: 4, fov: 42 }),
      zone: "sea",
      look: NIGHT,
      note: "They turn around, slowly. The camera swings with their heads, from the water to the dark behind.",
      stage: (t) => {
        const k = ease(ramp(t, 0.05, 1.4));
        const rot = k * Math.PI;
        return (
          <>
            <Fill on={[0, 1.5, 0.5]} yaw={20 + k * 140} />
            <Boat position={[0, 0.05, 0]} lantern={1} />
            <Hero position={[0.15, D, 1.05]} rotationY={rot} animation="idle" face="fear" />
            <BowKid position={[0.5, D, 0.65]} rotationY={rot} />
            <RopePlayer position={[-0.35, D, 0.8]} rotationY={rot} animation="idle" face="fear" />
          </>
        );
      },
    },
    {
      cue: "10.dark",
      ...cam.push({ on: [0, 0.3, -2.4], dist: 5.5, to: 4.2, yaw: 0, pitch: 22, fov: 44 }),
      zone: "sea",
      look: NIGHT,
      note: "The water behind the boat goes dark. A shadow spreads under the stern.",
      stage: (t) => (
        <>
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <SeaShadow position={[0, 0.04, -2.6]} spread={0.6 + ease(ramp(t, 0.1, 0.9)) * 0.8} />
        </>
      ),
    },
    {
      cue: "10.big",
      ...cam.push({ on: [0, 1.3, -1.2], dist: 8.5, to: 6.8, yaw: 24, pitch: 10, fov: 46 }),
      zone: "sea",
      look: NIGHT,
      note: "Wide. The shadow is already bigger than the boat. The lantern is a speck on the mast.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <SeaShadow position={[0, 0.04, -3.2]} spread={1.35} />
          <Hero position={[0.1, D, 0.4]} rotationY={Math.PI} animation="scared" face="fear" />
        </>
      ),
    },
    {
      cue: "10.arm",
      ...cam.push({ on: [0.4, 1.4, -1.6], dist: 4.6, to: 3.2, yaw: -16, pitch: -6, fov: 40 }),
      zone: "sea",
      look: NIGHT,
      note: "From low. One arm comes up out of the shadow, then a second, beside the stern.",
      stage: (t) => (
        <>
          <Fill on={[0.2, 1.6, -1.2]} yaw={-16} power={3} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Kraken position={[0.2, 0, -2.8]} rise={0.35 + ease(ramp(t, 0.05, 0.8)) * 0.35} arms={ease(ramp(t, 0.15, 1.1))} />
        </>
      ),
    },
    {
      cue: "10.more",
      ...cam.orbit({ on: [0, 1.8, -2.2], dist: 5.4, yaw: -30, yawTo: 40, pitch: 6, fov: 42 }),
      zone: "sea",
      look: NIGHT,
      note: "More arms than he can count. They come up one after another around the boat.",
      stage: (t) => (
        <>
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Kraken position={[0, 0, -2.6]} rise={0.75} arms={0.45 + ease(ramp(t, 0, 1)) * 0.55} />
        </>
      ),
    },
    {
      cue: "10.kraken",
      ...cam.push({ on: [0.55, 1.7, -1.5], dist: 4.8, to: 3.1, yaw: 8, pitch: 2, fov: 38 }),
      zone: "sea",
      look: NIGHT,
      note: "The eye, level with the lantern. An octopus as wide as the town, and the boat is small beside it.",
      stage: () => (
        <>
          <Fill on={[0.4, 1.8, -1.2]} yaw={8} power={3} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Kraken position={[0.3, 0, -2.2]} rise={1} arms={1} />
          <Hero position={[0.1, D, 0.2]} rotationY={Math.PI} animation="scared" face="fear" />
        </>
      ),
    },
    {
      cue: "10.night",
      ...cam.push({ on: [0.2, 2.2, -0.6], dist: 7.2, to: 5.6, yaw: 18, pitch: 8, fov: 44 }),
      zone: "sea",
      look: NIGHT,
      note: "Night. The lantern is the only light the kraken has to look at. The four of them are still on the boat.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Kraken position={[0.4, 0, -2.4]} rise={1} arms={1} />
          <Hero position={[0.1, D, 0.35]} rotationY={Math.PI} animation="scared" face="fear" />
          <HatKid position={[0.25, 0.05, 2.6]} rotationY={Math.PI} />
          <BowKid position={[0.5, D, 0.1]} rotationY={Math.PI} />
          <RopePlayer position={[-0.35, D, 0.15]} rotationY={Math.PI} animation="scared" face="fear" />
        </>
      ),
    },
    {
      cue: "11.end",
      ...cam.push({ on: [0.3, 2.0, -1.2], dist: 5.2, to: 4.2, yaw: -8, pitch: 4, fov: 40 }),
      zone: "sea",
      look: NIGHT,
      note: "To be continued, on the kraken, not on a black card. The monster is still the picture.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Kraken position={[0.2, 0, -2.2]} rise={1} arms={1} />
          <Bubble text="TO BE CONTINUED" position={[0.2, 3.3, -1.4]} rotationY={-0.1} dark scale={0.7} />
          <Block position={[0.1, D + 1.2, 0.5]} size={[0.02, 0.02, 0.02]} color="#000" />
        </>
      ),
    },
  ],
});
