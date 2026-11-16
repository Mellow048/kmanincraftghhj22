import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Me, Shadow, P, faceOf, timing } from "./kit";
import { BedBox } from "../../../Topics/InThisTown";

const IN_BED: Vec3 = P("room", -1.0, 0.22, -1.2);
const BESIDE: Vec3 = P("room", -1.9, 0, -0.4);
const WALL_Z = -2.46;

/**
 * THE DECISION, AT NIGHT. He cannot sleep, his shadow is doing push-ups on the wall, and the question he asks
 * himself is the one the film answers: whose shadow is it, if it does all the living?
 */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "Whose shadow is it",
  shots: [
    {
      cue: "8.night",
      ...cam.top({ on: P("room", -1.0, 0.45, -1.2), height: 3.1, to: 2.5, spin: [6, -4], fov: 44 }),
      zone: "room",
      look: "overworld-night",
      note: "'That night I could not sleep': straight down on the bed. He is on his back with his eyes open, and the blanket is still made on one side.",
      stage: () => (
        <>
          <BedBox position={P("room", -1.0, 0, -1.2)} />
          <Me position={IN_BED} rotationY={Math.PI / 2} animation="lie" face="sleepy" />
        </>
      ),
    },
    {
      cue: "8.wall",
      ...cam.push({ on: P("room", -1.0, 1.4, -2.2), dist: 2.5, to: 2.1, yaw: 4, pitch: 3, fov: 44 }),
      zone: "room",
      look: "overworld-night",
      note: "'On the wall, doing push-ups': the wall beside the bed, and his shadow going up and down on it, flat, like it is keeping fit while he lies there.",
      stage: (t) => (
        <>
          <Shadow
            position={P("room", -0.55, 1.15, WALL_Z)}
            rotationY={0}
            pose="out"
            lift={1}
            roll={1.42}
            scale={0.86}
            t={t}
            swing={1.6}
          />
          <BedBox position={P("room", -1.0, 0, -1.2)} />
          <Me position={IN_BED} rotationY={Math.PI / 2} animation="lie" face="sleepy" />
        </>
      ),
    },
    {
      cue: "8.q",
      ...cam.push({ on: P("room", -0.7, 1.15, -1.1), dist: 4.2, to: 3.6, yaw: 17, pitch: 9, fov: 50 }),
      zone: "room",
      look: "overworld-night",
      note: "'Whose shadow is it': the whole room. Him sitting up with the blanket round him, and the shadow on the wall now enormous, standing over the bed.",
      stage: () => (
        <>
          <BedBox position={P("room", -1.0, 0, -1.2)} />
          <Me position={P("room", -1.0, 0.52, -1.0)} rotationY={Math.PI} animation="sit" face="worried" />
          <Shadow position={P("room", -0.4, 1.2, WALL_Z)} rotationY={0} pose="idle" lift={1} scale={1.5} />
        </>
      ),
    },
    {
      cue: "8.dec",
      ...cam.push({ on: faceOf(P("room", -1.0, 0.55, -1.0)), dist: 1.6, to: 1.3, yaw: -15, pitch: 2, fov: 32 }),
      zone: "room",
      look: "overworld-night",
      note: "'So I decided': his face in the moonlight, and the first time all film he does not look scared of anything.",
      stage: () => (
        <>
          <Me position={P("room", -1.0, 0.52, -1.0)} rotationY={Math.PI * 0.86} animation="sit" face="neutral" gaze={0} />
          <Block position={BESIDE} size={[0.01, 0.01, 0.01]} color="#000000" castShadow={false} />
        </>
      ),
    },
  ],
});
