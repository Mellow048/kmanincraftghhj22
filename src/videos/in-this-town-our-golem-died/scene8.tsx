import { cam, storyScene } from "../../engine";
import {
  BedBox,
  Bits,
  Bucket,
  Hero,
  IronGolem,
  IronHeap,
  PLACE,
  ROBE,
  Rose,
  SOUTH,
  Villager,
  Wisps,
  ease,
  ramp,
  room,
  timing,
  wordAt,
} from "./kit";

const BED = room(1.1, 0, -1.5);
const WELL = PLACE.well;
const ROSE_ON_RIM = [WELL[0] + 1.02, 0.82, WELL[2] + 0.34] as [number, number, number];
const PUT = wordAt("11.put", "put");

/**
 * BEATS 12 and 13 — the night he did not sleep, and the morning.
 *
 * Three shots in the room, then two outside. The room is the only place in the film where the
 * camera is above him, because it is the only place where nothing can get him.
 */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "The morning",
  shots: [
    {
      cue: "11.put",
      ...cam.top({ on: [ROSE_ON_RIM[0] - 0.05, ROSE_ON_RIM[1], ROSE_ON_RIM[2] - 0.2], height: 3.5, to: 2.5, spin: [-7, 5], fov: 42 }),
      shake: 0.008,
      impacts: [{ at: PUT + 0.5, amp: 0.03, dur: 0.22 }],
      zone: "village",
      look: "lantern-night",
      note: "'I put the rose on the well, with all the others': straight down, the lens falling with the hand, the rose set into the one gap on the rim.",
      stage: (t) => {
        const down = ease(ramp(t, PUT, PUT + 0.55));
        return (
          <>
            <Rose position={[ROSE_ON_RIM[0], ROSE_ON_RIM[1] + 0.3 * (1 - down), ROSE_ON_RIM[2]]} scale={1.45} turn={0.6} />
            <Hero
              position={[ROSE_ON_RIM[0] + 0.34, 0, ROSE_ON_RIM[2] + 0.72]}
              rotationY={SOUTH - 2.69}
              animation={t < PUT + 0.5 ? "reach" : "idle"}
              face="frown"
              gaze={0}
            />
            <Bucket position={[WELL[0] - 1.1, 0.45, WELL[2] + 1.4]} scale={0.8} handle swing={0.2} />
          </>
        );
      },
    },
    {
      cue: "11.letgo",
      ...cam.orbit({ on: [WELL[0] + 0.4, 1.1, WELL[2] + 0.4], dist: 5.2, yaw: 8, yawTo: 62, pitch: 12, distTo: 3.4, fov: 44 }),
      shake: 0.01,
      zone: "village",
      look: "lantern-night",
      note: "'The rule said never keep it. So I let it go': the lens swings round the well while he backs away from it, and ends behind his shoulder, so the flowers are his view.",
      stage: (t, { p }) => (
        <>
          <Hero position={[WELL[0] + 0.2, 0, WELL[2] + 1.5 + 0.9 * p]} rotationY={SOUTH + 3.1} animation="walk" face="frown" gaze={0} />
          <Rose position={ROSE_ON_RIM} scale={1.45} turn={0.6} />
          <Wisps position={[WELL[0] - 0.4, 1.5, WELL[2] + 0.2]} t={t} count={6} reach={2.0} />
        </>
      ),
    },
    {
      cue: "12.home",
      ...cam.push({ on: room(0.5, 1.0, 0.4), dist: 5.8, to: 3.3, yaw: 6, pitch: 6, fov: 48 }),
      shake: 0.014,
      zone: "room",
      look: "lantern-night",
      note: "'I went home': the room, the bed, the one window, and him standing in the doorway with his hands empty. A small room lit by one torch, and the bed is the biggest thing in it.",
      stage: (t) => (
        <>
          <BedBox position={BED} rotationY={0} />
          <Hero
            position={room(0.4, 0, 1.6 - 1.1 * Math.min(1, t * 1.6))}
            rotationY={Math.PI}
            animation="walk"
           
            face="frown"
            gaze={0}
          />
        </>
      ),
    },
    {
      cue: "12.bed",
      ...cam.push({ on: room(1.1, 0.7, -1.2), dist: 4.8, to: 2.6, yaw: 20, pitch: 42, fov: 46 }),
      handheld: 0.014,
      zone: "room",
      look: "lantern-night",
      note: "'I lay on my bed and did not sleep': straight down on him lying on top of the blanket with his eyes open, the way a kid lies when he is not going to sleep. The camera sinks slowly, which is the only movement.",
      stage: () => (
        <>
          <BedBox position={BED} rotationY={0} />
          <Hero position={room(0.75, 0.56, -1.5)} rotationY={Math.PI / 2} animation="lie" face="frown" gaze={0} />
        </>
      ),
    },
    {
      cue: "13.light",
      ...cam.push({ on: room(1.3, 1.8, -2.3), dist: 5.6, to: 2.8, yaw: -9, pitch: 5, fov: 48 }),
      handheld: 0.012,
      zone: "room",
      look: "overworld-day",
      note: "'In the morning, the sun came in': the window, and the dust in the light, and nobody in the frame at all. One empty shot before the answer, so the answer has somewhere to land.",
      stage: (t) => (
        <>
          <BedBox position={BED} rotationY={0} />
          {/* dust going round in the light, because nothing else in the room is moving */}
          <Bits position={room(1.3, 1.7, -2.1)} t={t * 0.6} color="#ffe6b0" count={12} power={0.18} />
        </>
      ),
    },
    {
      cue: "13.square",
      ...cam.truck({ on: [1.0, 1.45, 3.4], dist: 4.6, yaw: 100, pitch: 12, by: [-2.0, 0, 0], fov: 44 }),
      shake: 0.016,
      zone: "village",
      look: "overworld-day",
      note: "'I went to the square': travelling with him from behind, the square opening up past his shoulder, people standing about in it, all of them turned the same way.",
      stage: (t, { p }) => (
        <>
          <Hero position={[2.2 - 1.0 * p, 0, 3.4]} rotationY={-90 * (Math.PI / 180)} animation="walk" face="uneasy" gaze={0} />
          <Villager position={[-3.6, 0, 1.2]} rotationY={SOUTH + 0.4} robe={ROBE.blue} phase={3.4} />
          <Villager position={[4.2, 0, 0.4]} rotationY={SOUTH - 0.5} robe={ROBE.farmer} hat="straw" phase={0.9} />
        </>
      ),
    },
    {
      cue: "13.there",
      ...cam.push({ on: [-1.2, 1.6, 2.2], dist: 8.4, to: 4.2, yaw: 13, pitch: 3, fov: 46 }),
      shake: 0.012,
      zone: "village",
      look: "overworld-day",
      note: "'It was standing there': not a reveal of a monster — a reveal of a thing that has been put back, standing in the middle of the square with the whole town keeping its distance from it. He is in the frame, small, at the left.",
      stage: () => (
        <>
          <IronGolem position={[-1.2, 0, 1.6]} rotationY={SOUTH + 0.15} headPitch={0.1} />
          <Hero position={[1.9, 0, 3.2]} rotationY={SOUTH + 0.5} animation="idle" face="wow" gaze={0} />
          <Villager position={[-4.2, 0, 1.0]} rotationY={SOUTH + 0.3} robe={ROBE.white} hat="straw" phase={0.4} />
          {/* the iron that built it, still where they left it */}
          <IronHeap position={[-4.4, 0, 2.4]} />
        </>
      ),
    },
  ],
});
