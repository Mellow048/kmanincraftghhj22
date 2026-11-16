import { cam, storyScene } from "../../engine";
import { Boat, BowKid, Buoy, Fill, HatKid, Hero, Lantern, MapSheet, RopePlayer, faceOf, timing, DAY, NIGHT } from "./kit";

const D = 0.72;

/** Day, then night, then day, then night. The X gets closer. The town gets small. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The sea",
  shots: [
    {
      cue: "5.sail",
      ...cam.truck({ on: [0, 1.4, 0], dist: 7.2, yaw: 78, pitch: 8, fov: 40, by: [0, 0, 4] }),
      zone: "sea",
      look: DAY,
      ease: "linear",
      note: "The boat leaves. The town is already small behind the stern. A travelling shot.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} />
          <Hero position={[0.15, D, 0.6]} rotationY={0} animation="idle" face="grin" />
          <HatKid position={[-0.4, D, -0.2]} rotationY={0.2} />
          <BowKid position={[0.45, D, -0.1]} rotationY={-0.2} />
          <RopePlayer position={[-0.15, D, 1.1]} rotationY={0} animation="idle" face="smile" />
        </>
      ),
    },
    {
      cue: "5.buoy",
      ...cam.push({ on: [1.4, 0.8, -2.2], dist: 4.4, to: 2.8, yaw: 24, pitch: 10, fov: 40 }),
      zone: "sea",
      look: DAY,
      note: "The last buoy goes by the stern. He is on the deck and does not turn his head.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} />
          <Buoy position={[1.8, 0, -2.6]} bob={0.1} />
          <Hero position={[0.2, D, 0.8]} rotationY={0} animation="idle" face="brave" />
        </>
      ),
    },
    {
      cue: "5.day",
      ...cam.orbit({ on: [0.2, 1.5, 0.7], dist: 3.4, yaw: -30, yawTo: 20, pitch: 12, fov: 38 }),
      zone: "sea",
      look: DAY,
      note: "The sun on the water. He holds the map up, and the boat is the world.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} />
          <Hero position={[0.2, D, 0.7]} rotationY={0.3} animation="reachUp" face="smile">
            <MapSheet position={[0.02, 0.15, 0.08]} rotation={[-0.4, 0, 0]} />
          </Hero>
        </>
      ),
    },
    {
      cue: "5.night",
      ...cam.push({ on: [0.3, 2.8, 0.2], dist: 3.6, to: 2.4, yaw: 18, pitch: -12, fov: 40 }),
      zone: "sea",
      look: NIGHT,
      note: "Night. The lantern goes up onto the mast. The only warm light on the water.",
      stage: (t) => (
        <>
          <Fill on={[0.2, 1.6, 0.6]} yaw={20} power={4} />
          <Boat position={[0, 0.05, 0]} lantern={t > 0.4 ? 1 : 0} />
          <Lantern position={[0.5, 1.2 + Math.min(1, t) * 1.8, 0.3]} light={1.4} scale={0.6} />
          <Hero position={[0.15, D, 0.4]} rotationY={0.2} animation="reachUp" face="calm" />
        </>
      ),
    },
    {
      cue: "5.up",
      ...cam.top({ on: [0.25, 0.8, 0.7], height: 3.2, to: 2.1, fov: 36 }),
      zone: "sea",
      look: DAY,
      note: "Morning, from above. The map is open on the deck and he checks the X twice.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} />
          <MapSheet position={[0.25, 0.82, 0.55]} rotation={[1.2, 0.2, 0]} big={1.4} />
          <Hero position={[0.15, D, 1.05]} rotationY={Math.PI} animation="crouch" face="frown" headPitch={0.6} />
        </>
      ),
    },
    {
      cue: "5.down",
      ...cam.push({ on: [0, 1.6, 0], dist: 11, to: 8.5, yaw: 160, pitch: 14, fov: 46 }),
      zone: "sea",
      look: NIGHT,
      note: "Night again. No land. The boat is small, and the map is the only thing in his hands.",
      stage: () => (
        <>
          <Fill on={[0.1, 1.5, 0.4]} yaw={160} power={6} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={[0.1, D, 0.5]} rotationY={0} animation="idle" face="calm">
            <MapSheet position={[0.06, 0.02, 0.1]} rotation={[0.5, 0, 0]} />
          </Hero>
          <HatKid position={[-0.45, D, -0.3]} rotationY={1} />
          <BowKid position={[0.5, D, -0.15]} rotationY={-1} />
          <RopePlayer position={[-0.1, D, 1.15]} rotationY={Math.PI} animation="idle" face="calm" />
        </>
      ),
    },
  ],
});

void faceOf;
