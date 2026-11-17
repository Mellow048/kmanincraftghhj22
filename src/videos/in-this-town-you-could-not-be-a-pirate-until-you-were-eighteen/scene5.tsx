import { Vox, cam, storyScene } from "../../engine";
import { Boat, BowKid, Buoy, Fill, HatKid, Hero, Lantern, MapSheet, RopePlayer, timing, wordAt, ease, ramp, DAY, SUNSET, NIGHT } from "./kit";

const D = 0.72;
const HERO: [number, number, number] = [0.42, D, 0.95];
const HAT: [number, number, number] = [-0.5, D, 0.4];
const BOW: [number, number, number] = [0.55, D, -0.25];
const PLAY: [number, number, number] = [-0.35, D, -0.65];

/** They leave. The town gets small. Day, then night, then day, then night, and no land. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The leaving",
  shots: [
    {
      cue: "5.sail",
      ...cam.push({ on: [0, 2.1, -0.4], dist: 10.5, to: 8.2, yaw: 4, pitch: 4, fov: 52 }),
      zone: "sea",
      look: DAY,
      note: "From ahead of the boat, looking back: the boat leaves, and the town is a small shore behind it.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} />
          <Hero position={HERO} rotationY={Math.PI} animation="idle" face="brave" />
          <RopePlayer position={PLAY} rotationY={Math.PI} animation="idle" face="smile" />
          <group position={[0, 0.4, -18]}>
            <Vox kind="grass" position={[0, 0.2, 0]} size={[18, 0.4, 6]} />
            <Vox kind="cobble" position={[-5, 1.4, 0]} size={[2.2, 2.4, 2]} />
            <Vox kind="planks" position={[-1.6, 1.1, 0.2]} size={[2.4, 1.8, 2]} />
            <Vox kind="cobble" position={[2.2, 1.6, -0.2]} size={[2.6, 2.8, 2.2]} />
            <Vox kind="planks" position={[5.4, 1.2, 0.3]} size={[2, 1.6, 1.8]} />
          </group>
        </>
      ),
    },
    {
      cue: "5.buoy",
      ...cam.truck({ on: [1.6, 1.1, 2.4], dist: 4.6, yaw: 70, pitch: 8, fov: 42, by: [0, 0, 2.2] }),
      zone: "sea",
      look: DAY,
      note: "The last buoy slides past the rail. He is on the boat and he does not turn around.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} />
          <Buoy position={[2.3, 0, 3.2]} bob={0.12} />
          <Hero position={HERO} rotationY={0.2} animation="idle" face="brave" />
        </>
      ),
    },
    {
      cue: "5.day",
      ...cam.push({ on: [0.4, 1.45, 1.05], dist: 3.2, to: 2.45, yaw: 150, pitch: 10, fov: 38 }),
      zone: "sea",
      look: SUNSET,
      note: "Sunset. He holds the map up to the sun, and the water is the same colour as the sky.",
      stage: (t) => {
        const up = ease(ramp(t, wordAt("5.day", "map"), wordAt("5.day", "map") + 0.4));
        return (
          <>
            <Boat position={[0, 0.05, 0]} />
            <Hero position={HERO} rotationY={0.4} animation={up > 0.4 ? "reachUp" : "idle"} face="smile">
              <MapSheet position={[0.02, 0.04 + up * 0.08, 0.1]} rotation={[0.4, 0, 0]} />
            </Hero>
          </>
        );
      },
    },
    {
      cue: "5.night",
      ...cam.push({ on: [0.3, 1.8, 1.3], dist: 4.6, to: 3.6, yaw: 48, pitch: 14, fov: 42 }),
      zone: "sea",
      look: NIGHT,
      note: "Night. The lantern goes onto the mast. The four of them are still on the deck, not inside the sail.",
      stage: () => (
        <>
          <Fill on={[0.4, 1.6, 1.6]} yaw={40} power={5} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={HERO} rotationY={-0.4} animation="reachUp" face="calm" />
          <BowKid position={BOW} rotationY={0.2} />
          <Lantern position={[0.35, 3.5, 0.2]} light={1.6} scale={0.7} />
        </>
      ),
    },
    {
      cue: "5.up",
      ...cam.push({ on: [0.45, 1.4, 1.1], dist: 2.8, to: 2.15, yaw: 168, pitch: 8, fov: 36 }),
      zone: "sea",
      look: DAY,
      note: "Morning. He checks the map twice. The X is closer, and his face says so.",
      stage: () => (
        <>
          <Boat position={[0, 0.05, 0]} />
          <Hero position={HERO} rotationY={0.2} animation="idle" face="grin" headPitch={0.25}>
            <MapSheet />
          </Hero>
        </>
      ),
    },
    {
      cue: "5.down",
      ...cam.orbit({ on: [0.1, 1.5, 0.2], dist: 5.6, yaw: 30, yawTo: 110, pitch: 12, fov: 46 }),
      zone: "sea",
      look: NIGHT,
      note: "Night again. A slow turn of the boat: four people, a lantern, and no land anywhere.",
      stage: () => (
        <>
          <Fill on={[0.6, 1.6, 1.4]} yaw={20} />
          <Boat position={[0, 0.05, 0]} lantern={1} />
          <Hero position={HERO} animation="idle" face="uneasy" />
          <HatKid position={HAT} />
          <BowKid position={BOW} />
          <RopePlayer position={PLAY} animation="idle" face="calm" />
        </>
      ),
    },
  ],
});
