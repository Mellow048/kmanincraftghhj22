import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Friend, HAT_BACK, Hero, KID, PLACE, ease, ramp, timing, wordAt } from "./kit";

const UP = wordAt("4.what", "up");

/** Where the two of them sit: the bench under his window. They face north, into the square. */
const HIS: Vec3 = [PLACE.bench[0] - 0.36, 0, PLACE.bench[2]];
const HERS: Vec3 = [PLACE.bench[0] + 0.42, 0.44 - 0.394, PLACE.bench[2]];
/** His face when he is sitting. */
const FACE: Vec3 = [HIS[0], 1.53 * KID - 0.1, HIS[2]];

/** THE ITCH. A good life, with one thing in it you may not look at. The film turns on the second line. */
export const scene4 = storyScene(timing, {
  id: "scene4",
  title: "The itch",
  shots: [
    {
      cue: "4.good",
      ...cam.push({ on: [PLACE.bench[0], 0.95, PLACE.bench[2]], dist: 3.7, to: 3.15, yaw: 172, pitch: -4, fov: 40 }),
      zone: "village",
      note: "'A quiet life, and a good one': him and his best friend on the bench under his window, feet off the ground, brims overlapping like roof tiles. She leans her hat on his. Nothing has ever happened here.",
      stage: (t) => (
        <>
          <Hero position={HIS} rotationY={Math.PI} animation="sit" face="smile" gaze={0} headRoll={-0.06} />
          <Friend position={HERS} rotationY={Math.PI} sit nod={0.3} tilt={0.2 * ease(ramp(t, 0.3, 1.1))} />
        </>
      ),
    },
    {
      cue: "4.what",
      ...cam.push({ on: FACE, dist: 1.5, to: 1.22, yaw: 166, pitch: -17, fov: 36 }),
      zone: "village",
      note: "'But what was up there?': the same bench, his face alone. On 'up' his head goes back as far as it dares, and the brim comes up with it. It stops. This is the itch the rest of the film scratches.",
      stage: (t) => {
        const k = ease(ramp(t, UP - 0.12, UP + 0.2));
        return <Hero position={HIS} rotationY={Math.PI} animation="sit" face="wow" gaze={0} headPitch={-0.3 * k} hatTilt={HAT_BACK - 0.1 * k} />;
      },
    },
  ],
});
