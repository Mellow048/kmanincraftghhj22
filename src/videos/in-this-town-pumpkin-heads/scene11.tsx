import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CLOSE, Fill, Hero, KNEEL, Loose, MoonOnWater, NORTH, PUT, Tall, WATER, WaterFace, ease, ramp, timing, wordAt } from "./kit";

const MOON = wordAt("11.face", "moon");
const THERE = wordAt("11.face", "there");
const SMILING = wordAt("11.smile", "smiling");

/** THE FACE. The one happy minute, and it is true: he has a face. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "There I was in the water",
  shots: [
    {
      cue: "11.air",
      ...cam.push({ on: [PUT[0] - 0.1, 0.5, PUT[2] - 0.1], dist: 2.0, to: 1.6, yaw: 28, pitch: 5, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "The empty pumpkin on the ground, close, facing us. Past it, out of reach of the lens, he kneels with his bare head tipped back into the night air. Still only the back of him.",
      stage: (t, { p }) => (
        <>
          <Loose position={PUT} rotation={[0, 0.45, 0]} carve="flat" />
          <Hero bare position={KNEEL} rotationY={NORTH} animation="crouch" headPitch={-0.35 * ease(ramp(p, 0, 0.6))} />
          <Fill at={[PUT[0] + 1, 1.2, PUT[2] + 2]} power={8} />
        </>
      ),
    },
    {
      cue: "11.face",
      ...cam.top({ on: WATER, height: 1.9, to: 1.5, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "Straight down into the well, black. On 'moon' the water turns silver, and on 'there' a face is in it: skin, brown hair, two eyes. The first face in the film.",
      stage: (t) => {
        const moon = ease(ramp(t, MOON, MOON + 0.7));
        return (
          <>
            <MoonOnWater amount={moon} />
            {t >= THERE ? <WaterFace position={[WATER[0], WATER[1], WATER[2] + 0.12]} smile={0} /> : null}
          </>
        );
      },
    },
    {
      cue: "11.nose",
      ...cam.top({ on: [WATER[0], WATER[1], WATER[2] + 0.12], height: 1.2, to: 0.95, spin: [-4, 4], fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "Closer on the face in the water, turning a little, as he counts what he has: a nose, two eyes, a chin.",
      stage: () => (
        <>
          <MoonOnWater />
          <WaterFace position={[WATER[0], WATER[1], WATER[2] + 0.12]} smile={0} />
        </>
      ),
    },
    {
      cue: "11.smile",
      ...cam.push({ on: [KNEEL[0], 0.98, KNEEL[2]], dist: 2.1, to: 1.7, yaw: 180, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "And now him, from across the well: a real kid's face in the moonlight, and on 'smiling' it breaks into a grin. Behind him in the dark, if you look, two thin legs that were not in the script yet.",
      stage: (t) => (
        <>
          <MoonOnWater />
          <Hero bare position={KNEEL} rotationY={NORTH} animation="crouch" headPitch={0.1} face={t < SMILING ? "smile" : "grin"} gaze={0} />
          <Tall position={CLOSE} rotationY={NORTH} headPitch={0.3} />
          <Fill at={[KNEEL[0] - 0.6, 1.5, KNEEL[2] - 1.6]} power={7} color="#cfdcff" />
        </>
      ),
    },
  ],
});
