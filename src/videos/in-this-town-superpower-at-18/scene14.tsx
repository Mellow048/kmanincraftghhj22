import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Brother, CHAOS, FireLight, Hero, NORTH, SOUTH, ZONE, ease, faceOf, ramp, stride, timing, wordAt } from "./kit";
import { NEAR, STOOD } from "./scene12";

const PUSHED = wordAt("14.push", "pushed");
const HIT: Vec3 = [8.4, 0, 0.82];

/** HE PUSHES HIM. Nothing happens. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "He did not move an inch",
  shots: [
    {
      cue: "14.anger",
      ...cam.push({ on: faceOf(STOOD), dist: 1.6, to: 1.25, yaw: 48, pitch: -2, fov: 34 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "His face, very close, the fire in his eyes. Worry goes out of it and something else comes in.",
      stage: (t, { p }) => (
        <>
          <Hero position={STOOD} rotationY={0.85} animation="idle" face={p < 0.35 ? "fear" : "angry"} gaze={0} />
          <FireLight position={[STOOD[0] + 1.4, 1.6, STOOD[2] + 1.4]} power={12} reach={6} seed={2} />
        </>
      ),
    },
    {
      cue: "14.push",
      ...cam.push({ on: [8.4, 1.05, 0.6], dist: 3.6, to: 3.1, yaw: 62, pitch: 3, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Side on. He spins round and throws himself at his brother with both hands. On 'pushed' he hits him square in the chest.",
      stage: (t) => {
        const k = ease(ramp(t, 0, PUSHED));
        return (
          <>
            <Hero {...stride(STOOD, HIT, k)} rotationY={NORTH} animation={k < 1 ? "run" : "idle"} arms="press" time={t - PUSHED + 0.25} face="angry" />
            <Brother position={NEAR} rotationY={SOUTH} animation="idle" face="smug" flame={t} />
          </>
        );
      },
    },
    {
      cue: "14.inch",
      ...cam.push({ on: faceOf(NEAR), dist: 1.9, to: 1.6, yaw: 32, pitch: -4, fov: 36 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second: his brother's face over the teller's straining shoulder. Bored. He has not moved at all.",
      stage: (t) => (
        <>
          <Hero position={HIT} rotationY={NORTH} animation="idle" arms="press" time={0.3} face="angry" headPitch={0.2} />
          <Brother position={NEAR} rotationY={SOUTH} animation="idle" face="smug" gaze={0} flame={t} />
        </>
      ),
    },
  ],
});
