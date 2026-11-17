import { cam, storyScene } from "../../engine";
import { Boat, Buoy, DockChain, Hero, MapSheet, PaperHat, ease, ramp, timing, DAY } from "./kit";

const ME: [number, number, number] = [0.25, 0, 1.45];
const BOAT: [number, number, number] = [0, 0, 8.8];

/** The rule, in the first second: a kid, a map, and the boat he is not allowed to take. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The rule",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0.2, 1.35, 4.4], dist: 6.2, to: 4.8, yaw: 168, pitch: 6, fov: 48 }),
      zone: "dock",
      look: DAY,
      note: "From the land behind him: yellow kid, map, chain, and the boat past the chain.",
      stage: (t) => {
        const step = ease(ramp(t, 0.15, 1));
        return (
          <>
            <Hero position={[ME[0], 0, ME[2] + step * 0.45]} rotationY={0.05} animation="reach" face="grin" head={<PaperHat />}>
              <MapSheet />
            </Hero>
            <DockChain />
            <Boat position={BOAT} />
          </>
        );
      },
    },
    {
      cue: "1.why",
      ...cam.truck({ on: [0.3, 1.2, 2.2], dist: 5.2, yaw: 150, pitch: 8, fov: 46, by: [1.2, 0, 2.2] }),
      zone: "dock",
      look: DAY,
      note: "He looks out at the last buoy. The water past it is empty. That is the rule.",
      stage: () => (
        <>
          <Hero position={ME} rotationY={0.3} animation="idle" face="uneasy" head={<PaperHat />} />
          <Buoy position={[2.4, 0, 11.5]} bob={0.1} />
          <Boat position={BOAT} />
          <DockChain />
        </>
      ),
    },
    {
      cue: "1.map",
      ...cam.push({ on: [0.35, 1.2, 1.7], dist: 2.6, to: 2.05, yaw: 198, pitch: 14, fov: 36 }),
      zone: "dock",
      look: DAY,
      note: "The map is in his hands, the red X readable, and he will not put it down.",
      stage: () => (
        <Hero position={ME} animation="idle" face="smile" headPitch={0.35} head={<PaperHat />}>
          <MapSheet position={[0.02, 0.01, 0.08]} rotation={[0.55, 0.1, 0]} />
        </Hero>
      ),
    },
    {
      cue: "1.x",
      ...cam.push({ on: [0.4, 1.25, 1.75], dist: 2.15, to: 1.7, yaw: 214, pitch: 12, fov: 32 }),
      zone: "dock",
      look: DAY,
      note: "The red X fills the sheet beside his face. The buoy is still small behind him.",
      stage: () => (
        <>
          <Hero position={ME} animation="idle" face="frown" headPitch={0.3} head={<PaperHat />}>
            <MapSheet position={[0.04, 0.02, 0.1]} rotation={[0.7, -0.15, 0]} big={1.15} />
          </Hero>
          <Buoy position={[2.4, 0, 11.5]} />
        </>
      ),
    },
  ],
});
