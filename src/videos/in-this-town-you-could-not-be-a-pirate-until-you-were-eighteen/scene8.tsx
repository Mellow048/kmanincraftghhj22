import { cam, storyScene } from "../../engine";
import { Boat, BowKid, Fill, HatKid, Hero, Kraken, RopePlayer, SeaShadow, ease, ramp, timing, wordAt, NIGHT } from "./kit";

const D = 0.72;

/** The slow turn, then the kraken, at night. The last line is to be continued. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The turn",
  shots: [
    {
      cue: "9.past",
      ...cam.push({ on: [1.45, 0.95, 1.7], dist: 2.6, to: 1.95, yaw: 18, pitch: 6, fov: 34 }),
      zone: "sea",
      look: NIGHT,
      note: "His face in the water, the ball in his hands, looking past the boat at something we cannot see yet.",
      stage: () => (
        <>
          <Fill on={[1.1, 1.1, 2.3]} yaw={10} power={6} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <HatKid position={[1.5, -0.05, 1.65]} rotationY={Math.PI} lean={0.05} />
        </>
      ),
    },
    {
      cue: "9.slow",
      ...cam.orbit({ on: [0.1, 1.45, 0.35], dist: 4.8, yaw: 30, yawTo: 150, pitch: 8, fov: 42 }),
      zone: "sea",
      look: NIGHT,
      note: "The three on deck turn around, slowly. The camera swings with them, from the swimmer to the dark.",
      stage: (t) => {
        const k = ease(ramp(t, 0.1, 1.5));
        const rot = k * Math.PI;
        return (
          <>
            <Fill on={[0.2, 1.6, 1.2]} yaw={30 + k * 120} />
            <Boat position={[0, 0.05, 0]} lantern={1} />
            <Hero position={[0.4, D, 0.85]} rotationY={rot} animation="idle" face="fear" />
            <BowKid position={[0.65, D, 0.1]} rotationY={rot} />
            <RopePlayer position={[-0.4, D, 0.15]} rotationY={rot} animation="idle" face="fear" />
          </>
        );
      },
    },
    {
      cue: "10.dark",
      ...cam.push({ on: [0, 1.3, -1.6], dist: 6.4, to: 5, yaw: 72, pitch: 10, fov: 46 }),
      zone: "sea",
      look: NIGHT,
      note: "From the side of the boat: the water astern has gone dark, wider than the hull.",
      stage: () => (
        <>
          <Fill on={[0.8, 1.5, 0.4]} yaw={60} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <SeaShadow position={[0.2, 0.08, -4.2]} spread={1.8} />
          <Hero position={[0.35, D, 0.4]} rotationY={Math.PI} animation="idle" face="fear" />
        </>
      ),
    },
    {
      cue: "10.big",
      ...cam.push({ on: [0.1, 1.5, -2.4], dist: 7.2, to: 5.8, yaw: 80, pitch: 12, fov: 46 }),
      zone: "sea",
      look: NIGHT,
      note: "The shadow is bigger than the boat. Both are in the frame, so bigger is a fact.",
      stage: (t) => {
        const grow = 1.4 + ease(ramp(t, 0.1, 0.9)) * 0.8;
        return (
          <>
            <Fill on={[1, 1.6, 0.2]} yaw={70} />
            <Boat position={[0, 0.05, 0]} lantern={1} />
            <SeaShadow position={[0.3, 0.08, -4.6]} spread={grow} />
            <Hero position={[0.3, D, 0.35]} rotationY={Math.PI} animation="point" face="fear" />
          </>
        );
      },
    },
    {
      cue: "10.arm",
      ...cam.push({ on: [0.4, 1.6, -3.2], dist: 6.8, to: 5.4, yaw: 68, pitch: 8, fov: 44 }),
      zone: "sea",
      look: NIGHT,
      note: "One arm comes up out of the dark, then a second. The boat is still the small thing.",
      stage: (t) => {
        const arms = ease(ramp(t, wordAt("10.arm", "arm"), wordAt("10.arm", "another") + 0.3));
        return (
          <>
            <Fill on={[1.1, 1.7, -0.4]} yaw={60} />
            <Boat position={[0, 0.05, 0]} lantern={1} />
            <SeaShadow position={[0.4, 0.08, -4.8]} spread={2.1} />
            <Kraken position={[0.6, 0, -5.2]} rise={0.45 + arms * 0.25} arms={0.25 + arms * 0.35} />
          </>
        );
      },
    },
    {
      cue: "10.more",
      ...cam.push({ on: [0.3, 2, -3.4], dist: 7.4, to: 6, yaw: 84, pitch: 14, fov: 48 }),
      zone: "sea",
      look: NIGHT,
      note: "More arms than the frame can count. They come up between the boat and the dark.",
      stage: () => (
        <>
          <Fill on={[1.2, 1.8, -0.6]} yaw={70} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Kraken position={[0.5, 0, -5.4]} rise={0.75} arms={0.85} />
          <Hero position={[0.25, D, 0.3]} rotationY={Math.PI} animation="scared" face="fear" />
        </>
      ),
    },
    {
      cue: "10.kraken",
      ...cam.push({ on: [0.2, 2.1, -2.6], dist: 9.2, to: 7.4, yaw: 76, pitch: 10, fov: 46 }),
      zone: "sea",
      look: NIGHT,
      note: "The eye, level with the lantern. An octopus beside a boat that is suddenly small.",
      stage: () => (
        <>
          <Fill on={[1.4, 1.8, -0.2]} yaw={70} power={4} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Kraken position={[0.4, 0, -5.6]} rise={1} arms={1} />
          <Hero position={[0.2, D, 0.35]} rotationY={Math.PI} animation="scared" face="fear" />
          <BowKid position={[0.6, D, -0.1]} rotationY={Math.PI} />
          <RopePlayer position={[-0.4, D, 0.1]} rotationY={Math.PI} animation="scared" face="fear" />
        </>
      ),
    },
    {
      cue: "10.night",
      ...cam.push({ on: [0.15, 2.4, -2.2], dist: 10, to: 8.2, yaw: 88, pitch: 12, fov: 48 }),
      zone: "sea",
      look: NIGHT,
      note: "Night. The lantern is the only warm light, and the kraken is looking at it.",
      stage: () => (
        <>
          <Fill on={[1.5, 1.8, 0.2]} yaw={80} power={3} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Kraken position={[0.4, 0, -5.6]} rise={1} arms={1} />
          <Hero position={[0.25, D, 0.4]} rotationY={Math.PI} animation="scared" face="fear" />
          <HatKid position={[1.5, -0.05, 1.7]} rotationY={Math.PI} />
          <BowKid position={[0.6, D, -0.15]} rotationY={Math.PI} />
          <RopePlayer position={[-0.4, D, 0.05]} rotationY={Math.PI} animation="scared" face="fear" />
        </>
      ),
    },
    {
      cue: "11.end",
      ...cam.push({ on: [0.2, 2.3, -2.4], dist: 9.4, to: 8, yaw: 70, pitch: 8, fov: 46 }),
      zone: "sea",
      look: NIGHT,
      note: "To be continued, on the kraken and the boat, not on a sign clipped by the mast.",
      stage: () => (
        <>
          <Fill on={[1.3, 1.8, -0.2]} yaw={64} power={4} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Kraken position={[0.4, 0, -5.6]} rise={1} arms={1} />
          <Hero position={[0.2, D, 0.4]} rotationY={Math.PI} animation="scared" face="fear" />
          <HatKid position={[1.55, -0.05, 1.65]} rotationY={2.6} />
        </>
      ),
    },
  ],
});
