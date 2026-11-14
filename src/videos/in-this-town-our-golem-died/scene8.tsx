import { cam, storyScene } from "../../engine";
import { BedBox, Hero, IronGolem, IronHeap, ROBE, SOUTH, Villager, room, timing } from "./kit";

const BED = room(1.1, 0, -1.5);

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
      cue: "12.home",
      ...cam.push({ on: room(0.5, 1.0, 0.2), dist: 5.0, to: 4.2, yaw: 10, pitch: 4, fov: 46 }),
      zone: "room",
      look: "lantern-night",
      note: "'I went home': the room, the bed, the one window, and him standing in the doorway with his hands empty. A small room lit by one torch, and the bed is the biggest thing in it.",
      stage: () => (
        <>
          <BedBox position={BED} rotationY={0} />
          <Hero position={room(0.4, 0, 1.6)} rotationY={Math.PI} animation="idle" face="frown" gaze={0} />
        </>
      ),
    },
    {
      cue: "12.bed",
      ...cam.push({ on: room(1.1, 0.7, -1.2), dist: 4.4, to: 3.6, yaw: 24, pitch: 34, fov: 46 }),
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
      ...cam.push({ on: room(1.3, 1.85, -2.3), dist: 5.0, to: 4.0, yaw: -10, pitch: 2, fov: 46 }),
      zone: "room",
      look: "overworld-day",
      note: "'In the morning, the sun came in': the window, and the dust in the light, and nobody in the frame at all. One empty shot before the answer, so the answer has somewhere to land.",
      stage: () => (
        <>
          <BedBox position={BED} rotationY={0} />
        </>
      ),
    },
    {
      cue: "13.square",
      ...cam.truck({ on: [1.0, 1.45, 3.4], dist: 4.2, yaw: 100, pitch: 12, by: [-1.0, 0, 0], fov: 44 }),
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
      ...cam.push({ on: [-1.2, 1.9, 2.2], dist: 6.4, to: 5.4, yaw: 16, pitch: -6, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'It was standing there': not a reveal of a monster — a reveal of a thing that has been put back, standing in the middle of the square with the whole town keeping its distance from it. He is in the frame, small, at the left.",
      stage: () => (
        <>
          <IronGolem position={[-1.2, 0, 1.6]} rotationY={SOUTH + 0.15} headPitch={0.1} />
          <Hero position={[1.9, 0, 3.2]} rotationY={SOUTH + 0.5} animation="idle" face="wow" gaze={0} />
          <Villager position={[-4.2, 0, 1.0]} rotationY={SOUTH + 0.3} robe={ROBE.white} hat="straw" phase={0.4} />
          {/* the iron that built it, still where they left it */}
          <IronHeap position={[-1.2, 0, 3.6]} />
        </>
      ),
    },
  ],
});
