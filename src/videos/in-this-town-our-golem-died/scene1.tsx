import { cam, storyScene } from "../../engine";
import { Creeper, Hero, IronGolem, PLACE, SOUTH, Smoke, Villager, ROBE, timing } from "./kit";

const FELL = PLACE.fell;

/**
 * BEAT 1 — the hook, in his words: it died, the next morning it came back, nobody would tell him how.
 *
 * Shot one is the ash where the golem stood, with the boy still in it (Rule A). Shot two cuts to the
 * impossible thing, from below, at the well — the one place in town that has anything to do with
 * coming back. Shot three is the town refusing to answer.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Our golem died",
  shots: [
    {
      cue: "1.died",
      ...cam.push({ on: [FELL[0] - 0.3, 1.05, FELL[2]], dist: 3.4, to: 2.6, yaw: -8, pitch: -4, fov: 38 }),
      zone: "gate",
      look: "lantern-night",
      note: "The words are 'our golem died' and the picture is where it died: the scorched ground inside the gate, smoke still going up, the boy crouched in the middle of it. Not the fight — the morning after the fight.",
      stage: (t) => (
        <>
          <Hero position={[20.6, 0, 2.0]} rotationY={SOUTH - 0.6} animation="crouch" face="fear" gaze={0} />
          <Smoke position={[FELL[0], 0, FELL[2]]} count={14} rise={3.2} spread={1.6} size={0.26} opacity={0.55} lean={0.3} />
          <Creeper position={[23.4, 0, 0.4]} rotationY={SOUTH + 2.2} fuse={0.0001} />
        </>
      ),
    },
    {
      cue: "1.back",
      ...cam.push({ on: [PLACE.well[0] + 0.4, 2.0, PLACE.well[2] - 0.6], dist: 5.4, to: 4.5, yaw: -24, pitch: -9, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "The impossible thing, from below, in morning light: the golem standing at the well, whole, a flower in its hand. The line says it came back; the picture says nothing about it is different.",
      stage: (t) => (
        <>
          <IronGolem position={[-2.6, 0, 3.4]} rotationY={SOUTH - 0.35} flower headPitch={0.12} headYaw={-0.15} />
          <Hero position={[-0.2, 0, 5.6]} rotationY={SOUTH + 0.5} animation="idle" face="wow" gaze={0} />
        </>
      ),
    },
    {
      cue: "1.how",
      ...cam.push({ on: [-11, 1.62, -4.1], dist: 2.0, to: 1.55, yaw: 26, pitch: -2, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'Nobody would tell me how': the oldest woman, on her porch, looks at him and then away. One face, one refusal, nothing else moving.",
      stage: (t) => (
        <>
          <Villager position={[-11, 0.5, -4.1]} rotationY={SOUTH + 0.5} robe={ROBE.white} hat="straw" turn={0.4} hmm={0.35} phase={0.4} />
          <Hero position={[-11, 0, -2.4]} rotationY={SOUTH} animation="idle" face="uneasy" gaze={0} />
        </>
      ),
    },
  ],
});
