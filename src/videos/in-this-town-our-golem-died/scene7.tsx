import { cam, storyScene } from "../../engine";
import {
  Elder,
  Hero,
  PLACE,
  ROBE,
  Rose,
  SOUTH,
  Smoke,
  Villager,
  Wisps,
  ease,
  jolt,
  ramp,
  timing,
  wordAt,
} from "./kit";

const FELL = PLACE.fell;
const WELL = PLACE.well;
const ROSE_ON_RIM = [WELL[0] + 1.02, 0.82, WELL[2] + 0.34] as [number, number, number];
const PICK = wordAt("11.pick", "picked");
const PUT = wordAt("11.put", "put");
const KEEP = wordAt("5.say", "keep");
const AWAY = wordAt("5.walk", "walked");

/**
 * BEATS 9 to 11 — the ash, the rose, the oldest woman, and the well.
 *
 * Every shot here travels: the lens goes with him while he walks, sinks onto the rim, or swings
 * round the well. Nobody in this scene stands still and looks at a camera, because that is what the
 * first cut of this film was full of.
 */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The rose",
  shots: [
    {
      cue: "10.finish",
      ...cam.truck({ on: [21.2, 1.5, 2.6], dist: 8.4, yaw: -76, pitch: 6, by: [2.4, 0, -0.7], fov: 46 }),
      shake: 0.012,
      zone: "gate",
      look: "lantern-night",
      note: "'We finished the monsters': the lens tracks along the wall while the town goes past it the other way — torches, running people, the last of it going over. He is not in it.",
      stage: (t) => (
        <>
          <Villager position={[20.6 + t * 2.2, 0, 3.6]} rotationY={SOUTH - 0.4} robe={ROBE.brown} phase={0.3} />
          <Villager position={[19.4 + t * 2.4, 0, 0.4]} rotationY={SOUTH + 0.5} robe={ROBE.blue} phase={3.4} />
          <Villager position={[22.4 + t * 1.6, 0, 4.6]} rotationY={SOUTH - 0.9} robe={ROBE.white} phase={1.9} />
          <Smoke position={[FELL[0], 0, FELL[2]]} count={9} rise={3.2} spread={2.2} size={0.3} opacity={0.4} lean={0.2} />
        </>
      ),
    },
    {
      cue: "10.walk",
      ...cam.truck({ on: [20.2, 1.25, 1.9], dist: 4.0, yaw: -96, pitch: 5, by: [1.7, 0, -0.1], fov: 42 }),
      shake: 0.014,
      zone: "gate",
      look: "lantern-night",
      note: "'I walked to where it fell': behind him, going with him at his own speed, the scorch coming into the top of the frame before he gets there.",
      stage: (t, { p }) => (
        <>
          <Hero position={[20.0 + 1.7 * p, 0, 1.9 - 0.1 * p]} rotationY={Math.PI / 2} animation="walk" face="frown" gaze={0} />
          <Smoke position={[FELL[0], 0, FELL[2]]} count={11} rise={3.6} spread={2.4} size={0.3} opacity={0.45} lean={0.25} />
        </>
      ),
    },
    {
      cue: "10.rose",
      ...cam.top({ on: [FELL[0] + 0.1, 0.12, FELL[2]], height: 2.7, to: 1.7, spin: [14, -6], fov: 40 }),
      handheld: 0.01,
      zone: "gate",
      look: "lantern-night",
      note: "'In the ash was a rose': the lens drops onto the scorch and twists as it comes down, and the one red thing in the film is lying in the middle of it.",
      stage: (t) => (
        <>
          <Rose position={[FELL[0] + 0.1, 0.06, FELL[2]]} scale={1.5} turn={1.2 + t * 0.06} />
          <Smoke position={[FELL[0] + 0.9, 0, FELL[2] - 0.8]} count={8} rise={2.6} spread={1.8} size={0.22} opacity={0.3} lean={0.1} />
        </>
      ),
    },
    {
      cue: "11.pick",
      ...cam.push({ on: [FELL[0] + 0.1, 0.5, FELL[2] + 0.1], dist: 3.6, to: 2.0, yaw: 62, pitch: 16, fov: 40 }),
      shake: 0.008,
      handheld: 0.008,
      impacts: [{ at: PICK + 0.42, amp: 0.02, dur: 0.2 }],
      zone: "gate",
      look: "lantern-night",
      note: "'I picked it up. It was still warm': from the ground. The hand comes down into frame, closes on the stem on the word, and lifts it out of the ash.",
      stage: (t) => {
        const down = ease(ramp(t, 0, PICK + 0.2));
        const up = ease(ramp(t, PICK + 0.2, PICK + 0.9));
        return (
          <>
            <Rose position={[FELL[0] + 0.1, 0.06 + up * 0.62, FELL[2]]} scale={1.5} turn={1.2} />
            <Hero
              position={[FELL[0] - 0.85, 0, FELL[2] + 0.2 + down * 0.12]}
              rotationY={Math.PI / 2}
              animation={t < PICK + 0.25 ? "reach" : "point"}
              face="frown"
              gaze={0}
              headPitch={0.3 - up * 0.25}
            />
          </>
        );
      },
    },
    {
      cue: "5.ask",
      ...cam.orbit({ on: [PLACE.porch[0] + 0.1, 1.5, PLACE.porch[2] + 0.2], dist: 5.6, yawTo: 6, yaw: 40, pitch: 4, distTo: 3.4, fov: 44 }),
      shake: 0.014,
      zone: "village",
      look: "lantern-night",
      note: "'So I took it to the oldest woman in town': he walks in from the right edge while the lens swings round onto her porch, so we arrive with him.",
      stage: (t, { p }) => (
        <>
          <Elder position={PLACE.porch} rotationY={SOUTH + 0.5} hat="straw" turn={0.4 + 0.25 * p} lean={0.06} />
          <Hero position={[-8.6 + 1.1 * p, 0, -2.5 - 0.5 * p]} rotationY={SOUTH + 0.4} animation="walk" face="uneasy" gaze={0} />
          <Rose position={[-9.0 + 1.1 * p, 1.0, -2.5 - 0.5 * p]} scale={1.2} turn={0.6} />
          <Wisps position={[PLACE.porch[0] + 1.2, 1.4, PLACE.porch[2] + 1.6]} t={t} count={5} reach={1.4} />
        </>
      ),
    },
    {
      cue: "5.say",
      ...cam.push({ on: [PLACE.porch[0], 1.62, PLACE.porch[2] + 0.1], dist: 3.5, to: 2.0, yaw: 34, pitch: 3, fov: 34 }),
      shake: 0.012,
      impacts: [{ at: KEEP, amp: 0.035, dur: 0.25 }],
      zone: "village",
      look: "lantern-night",
      note: "'Never keep a golem's flower,' she said: her face, and the word 'keep' lands with a jolt. She does not look at him; she looks at his hand.",
      stage: (t) => (
        <>
          <Elder
            position={PLACE.porch}
            rotationY={SOUTH + 0.6}
            hat="straw"
            nod={0.1 + 0.16 * jolt(t, KEEP, 0.2)}
            turn={-0.2}
            phase={0.4}
          />
          <Hero position={[-9.9, 0, -2.9]} rotationY={SOUTH + 0.3} animation="reach" face="uneasy" gaze={0} />
        </>
      ),
    },
    {
      cue: "5.again",
      ...cam.orbit({ on: [PLACE.porch[0] + 0.05, 1.55, PLACE.porch[2]], dist: 2.6, yaw: 18, yawTo: 44, pitch: 2, distTo: 2.0, fov: 32 }),
      shake: 0.016,
      zone: "village",
      look: "lantern-night",
      note: "'I asked her again': the same face, swung round to the other side, because she is not going to answer twice. Nothing in frame but her and the dark behind.",
      stage: (t) => (
        <>
          <Elder position={PLACE.porch} rotationY={SOUTH + 0.9} hat="straw" turn={0.35 + 0.1 * Math.sin(t * 2)} hmm={0.4} phase={0.4} />
        </>
      ),
    },
    {
      cue: "5.walk",
      ...cam.truck({ on: [PLACE.porch[0] - 0.6, 1.4, PLACE.porch[2] - 0.4], dist: 3.6, yaw: 28, pitch: 6, by: [-1.5, 0, -0.9], fov: 40 }),
      shake: 0.014,
      zone: "village",
      look: "lantern-night",
      note: "'She walked away': she goes, and the lens goes with her, and he is left standing at the edge of the frame holding the flower.",
      stage: (t, { p }) => (
        <>
          <Elder
            position={[PLACE.porch[0] - 1.5 * p, PLACE.porch[1], PLACE.porch[2] - 0.9 * p]}
            rotationY={SOUTH}
            hat="straw"
           
            phase={0.4}
          />
          <Hero position={[-9.4, 0, -2.9]} rotationY={SOUTH + 1.5} animation="idle" face="frown" gaze={0} />
          <Rose position={[-9.4, 0.95, -3.1]} scale={1.2} turn={0.6} />
        </>
      ),
    },
  ],
});

