import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { BED, BedBox, Hero, IN_BED, NORTH, SOUTH, ease, faceOf, ramp, room, timing, wordAt } from "./kit";

const UP: Vec3 = room(0.5, 0, 0.2);
const OFF = wordAt("6.decide", "off");

/** THE NIGHT HE DECIDES. The question the whole film answers is asked here, out loud. */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Hiding from whom",
  shots: [
    {
      cue: "6.sleep",
      ...cam.top({ on: room(-0.9, 0.5, -1.4), height: 2.9, to: 2.4, spin: [8, -6], fov: 44 }),
      zone: "room",
      look: "overworld-night",
      note: "Straight down on the bed again, closer. This time the carved eyes are wide open, and the pumpkin rolls from side to side on the pillow.",
      stage: (t) => (
        <>
          <BedBox position={BED} />
          <Hero position={IN_BED} animation="lie" headYaw={Math.sin(t * 2.6) * 0.5} carve="wow" />
        </>
      ),
    },
    {
      cue: "6.plant",
      ...cam.push({ on: room(1.3, 1.6, -2.3), dist: 3.3, to: 2.5, yaw: -8, pitch: 2, fov: 40 }),
      zone: "room",
      look: "overworld-night",
      note: "He is up, at his window, a small back in the moonlight looking out at the town. We push in past him at the glass. Whatever a whole town hides from is out there.",
      stage: () => (
        <>
          <BedBox position={BED} />
          <Hero position={room(1.3, 0, -1.55)} rotationY={NORTH} animation="idle" headPitch={-0.2} carve="flat" />
        </>
      ),
    },
    {
      cue: "6.decide",
      ...cam.push({ on: faceOf(UP), dist: 2.0, to: 1.5, yaw: 10, pitch: 0, fov: 36 }),
      zone: "room",
      look: "overworld-night",
      note: "He turns to us and puts both hands up to his pumpkin. On 'off' it shifts, a finger's width. He has made up his mind.",
      stage: (t) => {
        const k = ease(ramp(t, 0.2, OFF));
        return <Hero position={UP} rotationY={SOUTH} animation="idle" blendTo="lift" blend={0.7 * k} raise={0.05 * ease(ramp(t, OFF, OFF + 0.3))} carve="grin" />;
      },
    },
  ],
});
