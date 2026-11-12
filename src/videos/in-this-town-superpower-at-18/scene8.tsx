import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { BED, BedBox, Hero, IN_BED, NIGHT, ZONE, room, timing } from "./kit";
import { Glow } from "../../engine";

/** THE NIGHT BEFORE. The question the film answers is asked here. */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "A boy who kicked pigs",
  shots: [
    {
      cue: "8.plant",
      from: [5, 1.9, -12],
      to: [5, 2.8, -14],
      target: [4, 6, -45],
      fov: 42,
      ease: "inOutSine",
      zone: ZONE.day,
      look: NIGHT,
      note: "Night. The road north and the black hills under the moon. Beyond them, low, one small orange light is flickering where there should be none.",
      stage: (t) => (
        <>
          <Glow position={[-2, 8.5, -62]} size={9 + Math.sin(t * 9) * 1.2} color="#ff8a3a" opacity={0.5} />
          <Glow position={[-2, 8, -62]} size={3} color="#ffd27a" opacity={0.8} />
        </>
      ),
    },
    {
      cue: "8.what",
      ...cam.top({ on: room(-0.9, 0.5, -1.4), height: 3.0, to: 2.5, spin: [8, -5], fov: 44 }),
      zone: ZONE.room,
      look: NIGHT,
      note: "Straight down on his bed. He is wide awake, staring up at us, turning it over.",
      stage: (t) => (
        <>
          <BedBox position={BED} />
          <Hero position={IN_BED} animation="lie" face="uneasy" headYaw={Math.sin(t * 2.2) * 0.35} gaze={0} />
        </>
      ),
    },
  ],
});
