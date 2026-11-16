import { cam, storyScene } from "../../engine";
import { Boat, Buoy, DockChain, Hero, MapSheet, PaperHat, ease, ramp, timing, DAY } from "./kit";

const ME: [number, number, number] = [0.15, 0, 1.55];

/** The rule, in the first second: a kid, a map, a boat he is not allowed to take. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The rule",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0.2, 1.15, 2.2], dist: 4.6, to: 3.4, yaw: 16, pitch: 8, fov: 42 }),
      zone: "dock",
      look: DAY,
      note: "Frame one: the yellow kid already reaching for the chained boat, the map in his hand.",
      stage: (t) => (
        <>
          <Hero position={[ME[0], 0, ME[2] + ease(ramp(t, 0, 0.8)) * 0.3]} rotationY={0} animation="reach" face="grin" head={<PaperHat />}>
            <MapSheet position={[0.08, 0.02, 0.12]} rotation={[0.6, 0.2, 0]} />
          </Hero>
          <DockChain />
          <Boat position={[0, 0, 6.4]} />
        </>
      ),
    },
    {
      cue: "1.why",
      ...cam.truck({ on: [1.6, 0.9, 10], dist: 5.5, yaw: 70, pitch: 12, fov: 40, by: [0, 0, 3.2] }),
      zone: "dock",
      look: DAY,
      note: "Travelling out past the last buoy, the water the boats do not come back from.",
      stage: () => (
        <>
          <Buoy position={[1.6, 0, 12]} bob={0.08} />
          <Boat position={[0, 0, 6.4]} />
          <Hero position={ME} animation="idle" face="uneasy" head={<PaperHat />} />
        </>
      ),
    },
    {
      cue: "1.map",
      ...cam.top({ on: [0.2, 0.2, 1.7], height: 2.4, to: 1.5, fov: 38 }),
      zone: "dock",
      look: DAY,
      note: "Straight down on the map in his hands. He cannot put it down.",
      stage: () => (
        <Hero position={ME} animation="idle" face="smile" headPitch={0.5}>
          <MapSheet position={[0.05, 0.05, 0.16]} rotation={[1.1, 0, 0]} big={1.15} />
        </Hero>
      ),
    },
    {
      cue: "1.x",
      ...cam.push({ on: [0.35, 1.35, 1.85], dist: 1.7, to: 1.15, yaw: -18, pitch: 22, fov: 34 }),
      zone: "dock",
      look: DAY,
      note: "Close on the red X. The buoy is still in the frame behind the sheet.",
      stage: () => (
        <>
          <Hero position={ME} animation="idle" face="frown" headPitch={0.35}>
            <MapSheet position={[0.06, 0.04, 0.14]} rotation={[0.9, -0.2, 0]} big={1.3} />
          </Hero>
          <Buoy position={[1.6, 0, 12]} />
        </>
      ),
    },
  ],
});
