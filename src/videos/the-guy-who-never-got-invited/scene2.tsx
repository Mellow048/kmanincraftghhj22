import { cam } from "../../engine";
import { Him, Speaker, stagedScene } from "./kit";

/**
 * BEAT 2 — REWIND. Four years earlier, and it is the same doorway in daylight.
 *
 * The reel's tape-rewind sound is the time machine: no caption, no title card. One shot of the door
 * with nobody in it, then he walks up to it hopefully with the speaker, which is how we learn he has
 * been doing this for years.
 */
export const scene2 = stagedScene("scene2", [
  {
    id: "2.empty",
    ...cam.push({ on: [0, 1.55, -4.0], dist: 7.8, to: 6.8, fov: 50, pitch: 5 }),
    zone: "street",
    look: "overworld-day",
    note: "The same doorway, daylight, no party: the rewind lands on the empty version of the first picture.",
    stage: () => null,
  },
  {
    id: "2.walk",
    ...cam.push({ on: [-0.1, 1.3, 0.6], dist: 4.8, to: 3.6, fov: 46, yaw: -16, pitch: 3 }),
    zone: "street",
    look: "overworld-day",
    note: "He arrives with the borrowed speaker in his arms, walking towards the door like it is an appointment.",
    stage: (t) => {
      const walked = Math.min(3.6, t * 1.55);
      const p: [number, number, number] = [0.35, 0, 3.2 - walked];
      return (
        <>
          <Him position={p} rotationY={Math.PI} animation="walk" arms="hold" face="smile" headphones="neck" />
          <Speaker position={[p[0], 0.62, p[2] - 0.58]} rotationY={Math.PI} tall={0.86} />
        </>
      );
    },
  },
]);
