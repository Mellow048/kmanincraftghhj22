import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, IronGolem, ROBE, SOUTH, Smoke, Villager, timing } from "./kit";

const POST: Vec3 = [0, 0, -1.2];
const ME: Vec3 = [-1.6, 0, 1.7];

/**
 * BEAT 1 — the hook. Placeholder staging: three shots, enough for the film to
 * check and render while the script waits for the owner's yes.
 *
 * The order is the point (draft 3, the owner's own hook): it died, the next
 * morning it came back, nobody would tell him how. Frame one is the ash and
 * the empty gate with the boy in it — Rule A, the strange thing and the person
 * it is strange for, in one frame. Not a wide of the town, and not a golem
 * handing out flowers.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Our golem died",
  shots: [
    {
      cue: "1.died",
      ...cam.push({ on: [ME[0], 0.95, ME[2] - 0.2], dist: 3.0, to: 2.3, yaw: 8, pitch: 7, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "The death, and the boy in it: the ash at the empty gate where the golem stood, and him crouched in the middle of it. The town walks past behind him, already finished with the monsters.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={SOUTH - 0.5} animation="crouch" face="uneasy" gaze={0} />
          <Smoke position={[POST[0], 0, POST[2] + 0.3]} count={10} rise={2.4} spread={1.3} size={0.22} opacity={0.5} lean={0.2} />
          <Villager position={[1.9, 0, 0.4]} rotationY={SOUTH + 0.8} walk={t * 1.1} robe={ROBE.brown} phase={0.3} />
          <Villager position={[-3.2, 0, 0.1]} rotationY={SOUTH - 0.6} robe={ROBE.white} phase={1.9} />
        </>
      ),
    },
    {
      cue: "1.back",
      ...cam.push({ on: [POST[0], 1.9, POST[2]], dist: 5.6, to: 4.8, yaw: -12, pitch: -7, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "Cut to the impossible thing, from below: the golem standing at the gate in the morning, whole. The line says the town rebuilt it; the picture says it is the same golem.",
      stage: () => (
        <>
          <IronGolem position={POST} rotationY={SOUTH} headYaw={0.12} />
          <Hero position={ME} rotationY={SOUTH} animation="idle" face="wow" gaze={0} />
        </>
      ),
    },
    {
      cue: "1.how",
      ...cam.push({ on: [1.9, 1.55, 0.4], dist: 2.0, to: 1.55, yaw: 22, pitch: 2, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "The question, on a face that will not answer it: a villager looks at him and looks away. His shoulder is at the edge of the frame.",
      stage: () => (
        <>
          <Villager position={[1.9, 0, 0.4]} rotationY={SOUTH + 0.55} robe={ROBE.brown} turn={0.35} phase={0.3} hmm={0.3} />
          <Hero position={[1.9, 0, 1.9]} rotationY={SOUTH} animation="idle" face="frown" gaze={0} />
        </>
      ),
    },
  ],
});
