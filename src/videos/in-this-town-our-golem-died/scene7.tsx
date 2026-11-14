import { cam, storyScene } from "../../engine";
import { Bucket, Hero, PLACE, ROBE, Rose, SOUTH, Smoke, Villager, ease, ramp, timing, wordAt } from "./kit";

const FELL = PLACE.fell;
const WELL = PLACE.well;
const ROSE_ON_RIM = [WELL[0] + 1.02, 0.82, WELL[2] + 0.34] as [number, number, number];
const PICK = wordAt("11.pick", "picked");
const PUT = wordAt("11.put", "put");

/**
 * BEATS 10 and 11 — the ash, the rose, and the well.
 *
 * The rose is the only warm colour left in the film after the explosion, so the camera stops moving
 * towards things and starts holding still: two of these shots barely push at all, because he has
 * stopped running.
 */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The rose",
  shots: [
    {
      cue: "10.finish",
      ...cam.push({ on: [22.0, 1.5, 2.4], dist: 9.0, to: 7.6, yaw: -72, pitch: 6, fov: 46 }),
      zone: "gate",
      look: "lantern-night",
      note: "'We finished the monsters': the town's people at the end of it, torches up, the last of them going over the wall. He is not in it — he is somewhere at the edge of the light, already looking the wrong way.",
      stage: (t) => (
        <>
          <Villager position={[22.4, 0, 3.4]} rotationY={SOUTH - 0.5} robe={ROBE.brown} walk={t * 1.2} phase={0.3} />
          <Villager position={[23.2, 0, 0.6]} rotationY={SOUTH + 0.7} robe={ROBE.blue} walk={t * 1.1} phase={3.4} />
          <Villager position={[21.4, 0, 4.4]} rotationY={SOUTH - 1.2} robe={ROBE.white} phase={1.9} />
          <Smoke position={[FELL[0], 0, FELL[2]]} count={8} rise={3.0} spread={2.0} size={0.3} opacity={0.35} lean={0.2} />
        </>
      ),
    },
    {
      cue: "10.walk",
      ...cam.truck({ on: [20.4, 1.3, 2.0], dist: 4.2, yaw: -90, pitch: 4, by: [1.1, 0, 0], fov: 40 }),
      zone: "gate",
      look: "lantern-night",
      note: "'I walked to where it fell': from behind him, going with him, the scorch mark growing in the top of the frame. The lens does not get there first.",
      stage: (t, { p }) => (
        <>
          <Hero position={[20.4 + 1.1 * p, 0, 2.0]} rotationY={90 * (Math.PI / 180)} animation="walk" face="frown" gaze={0} />
          <Smoke position={[FELL[0], 0, FELL[2]]} count={10} rise={3.4} spread={2.4} size={0.3} opacity={0.45} lean={0.25} />
        </>
      ),
    },
    {
      cue: "10.rose",
      ...cam.top({ on: [FELL[0] + 0.1, 0.12, FELL[2]], height: 2.4, to: 1.9, spin: [10, 2], fov: 40 }),
      zone: "gate",
      look: "lantern-night",
      note: "'In the ash was a rose': straight down on the scorch, and one red poppy lying in the middle of it, on its side, with the smoke drifting over it. The only colour in the frame.",
      stage: () => (
        <>
          <Rose position={[FELL[0] + 0.1, 0.06, FELL[2]]} scale={1.5} turn={1.2} />
          <Smoke position={[FELL[0] + 0.9, 0, FELL[2] - 0.8]} count={7} rise={2.2} spread={1.6} size={0.22} opacity={0.3} lean={0.1} />
        </>
      ),
    },
    {
      cue: "11.pick",
      ...cam.push({ on: [FELL[0] + 0.1, 0.6, FELL[2] + 0.1], dist: 2.8, to: 2.3, yaw: 64, pitch: 14, fov: 38 }),
      zone: "gate",
      look: "lantern-night",
      note: "'I picked it up. It was still warm': from the ground, the flower lifted on the word, a kid's hand under it. The camera stays on the ground so the hand comes down to it.",
      stage: (t) => {
        const up = ease(ramp(t, PICK, PICK + 0.5));
        return (
          <>
            <Rose position={[FELL[0] + 0.1, 0.06 + up * 0.5, FELL[2]]} scale={1.5} turn={1.2} />
            <Hero position={[FELL[0] - 0.85, 0, FELL[2] + 0.2]} rotationY={90 * (Math.PI / 180)} animation="crouch" face="frown" gaze={0} />
          </>
        );
      },
    },
    {
      cue: "11.put",
      ...cam.push({ on: [ROSE_ON_RIM[0], ROSE_ON_RIM[1] + 0.1, ROSE_ON_RIM[2]], dist: 5.0, to: 4.3, yaw: 66, pitch: 6, fov: 42 }),
      zone: "village",
      look: "lantern-night",
      note: "'I put it on the well, with all the others': the rose set down on the rim among fourteen others, his hand still on it at the end. One movement, one frame, no cut away from it.",
      stage: (t) => {
        const down = ease(ramp(t, PUT, PUT + 0.55));
        return (
          <>
            <Rose position={[ROSE_ON_RIM[0], ROSE_ON_RIM[1] + 0.22 * (1 - down), ROSE_ON_RIM[2]]} scale={1.45} turn={0.6} />
            <Hero position={[ROSE_ON_RIM[0] - 1.1, 0, ROSE_ON_RIM[2] + 0.35]} rotationY={SOUTH + 1.87} animation="reach" face="frown" gaze={0} />
            <Bucket position={[WELL[0] - 1.1, 0.45, WELL[2] + 1.4]} scale={0.8} handle swing={0.2} />
          </>
        );
      },
    },
    {
      cue: "11.letgo",
      ...cam.push({ on: [WELL[0] + 0.6, 1.05, WELL[2] + 0.5], dist: 4.6, to: 3.8, yaw: 10, pitch: 12, fov: 42 }),
      zone: "village",
      look: "lantern-night",
      note: "'The rule said never keep it. So I let it go': he steps back, and the frame is the well full of flowers with one boy's back at the edge of it. The flowers are lit; nothing else is.",
      stage: (t) => (
        <>
          <Hero position={[WELL[0] + 0.2, 0, WELL[2] + 2.5]} rotationY={SOUTH + 3.05} animation="walk" face="frown" gaze={0} />
          <Rose position={ROSE_ON_RIM} scale={1.45} turn={0.6} />
        </>
      ),
    },
  ],
});
