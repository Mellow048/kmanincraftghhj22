import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Block, Friend, Her, Kid, Me, P, Shadow, faceOf, timing } from "./kit";

/** Where everybody stands at prom. She waits in the middle of the floor, under the ball. */
export const HER_STAND: Vec3 = P("gym", 0.4, 0, 0.5);
const ME_EDGE: Vec3 = P("gym", -3.0, 0, 2.5);
const MIRROR_ME: Vec3 = P("gym", 7.55, 0, -3.2);

/**
 * PROM NIGHT, AND THE THREE STEPS. The loudest, brightest place in the film, and he cannot cross it. Then the
 * plant, which is where he ends up.
 */
export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Three steps",
  shots: [
    {
      cue: "9.night",
      ...cam.push({ on: [124.00, 1.10, 0.90], dist: 6.21, to: 5.61, yaw: -29.2, pitch: 22.7, fov: 50 }),
      zone: "gym",
      look: "prom-night",
      note: "'Prom night. Loud music. Shoes too tight': the whole gym. Bunting, the ball, kids dancing badly, and him at the edge with one shoe half off.",
      stage: (t, { p }) => (
        <>
          <Me position={ME_EDGE} rotationY={0.9} animation="sit" face="worried" />
          <Her position={HER_STAND} rotationY={-0.5} animation="idle" face="neutral" />
          {[
            [-1.1, -1.2, 0],
            [1.0, -2.0, 1],
            [1.3, 0.6, 2],
            [-1.2, 1.9, 3],
            [0.2, 2.8, 4],
            [-2.0, -0.2, 5],
          ].map(([x, z, n], i) => (
            <Kid
              key={i}
              n={n}
              position={[P("gym", x, 0, z)[0], 0, z]}
              rotationY={Math.sin(t + i) * 0.7}
              animation={i % 2 ? "cheer" : "jump"}
              phase={i * 0.7 + p * 0.3}
            />
          ))}
        </>
      ),
    },
    {
      cue: "9.mirror",
      ...cam.push({ on: [131.55, 1.15, -3.20], dist: 2.54, to: 2.24, yaw: -59.0, pitch: 23.2, fov: 40 }),
      zone: "gym",
      look: "prom-night",
      note: "'In the mirror I practised': over his shoulder at the mirror. He says it to his own reflection; behind him on the floor his shadow says it to the mirror too, perfectly.",
      stage: () => (
        <>
          <Me position={MIRROR_ME} rotationY={Math.PI / 2} animation="talk" face="scared" />
          <Shadow position={[MIRROR_ME[0] + 0.9, 0, MIRROR_ME[2] + 0.2]} rotationY={0} pose="walk" lift={0} scale={0.8} />
        </>
      ),
    },
    {
      cue: "9.steps",
      ...cam.truck({ on: [120.10, 0.80, 2.20], dist: 2.31, yaw: -143.1, pitch: 29.9, by: [2.2, 0, -0.5], fov: 44 }),
      zone: "gym",
      look: "prom-night",
      note: "'I got three steps across the floor': behind his shoes at ankle height, three steps out from the plant, and then the shoes stop on the fourth.",
      stage: (t) => (
        <>
          <Me position={[P("gym", -3.9, 0, 2.2)[0], 0, 2.2]} rotationY={1.4} animation="walk" animDistance={1.6} face="scared" />
          <Shadow position={[P("gym", -4.1, 0, 2.0)[0], 0, 2.0]} rotationY={1.4} pose="walk" scale={0.8} t={t} swing={0.7} />
        </>
      ),
    },
    {
      cue: "9.plant",
      ...cam.push({ on: [119.10, 0.80, 3.20], dist: 1.92, to: 1.62, yaw: 51.3, pitch: 3.0, fov: 44 }),
      zone: "gym",
      look: "prom-night",
      note: "'Then I was behind a plant, hiding': from the floor, past the leaves, him crouched behind the pot in the dark edge of the room, and the lit floor he is not on.",
      stage: () => (
        <>
          <Me position={[P("gym", -4.9, 0, 3.2)[0], 0, 3.2]} rotationY={1.1} animation="cower" face="scared" />
          <Shadow position={[P("gym", -4.5, 0, 3.4)[0], 0, 3.4]} rotationY={1.1} pose="cower" lift={0.4} scale={0.8} />
        </>
      ),
    },
    {
      cue: "9.found",
      ...cam.push({ on: [119.60, 1.00, 3.20], dist: 1.91, to: 1.61, yaw: 100.6, pitch: 31.6, fov: 42 }),
      zone: "gym",
      look: "prom-night",
      note: "'My friend found me': the two of them crouched in the leaves, her face saying it is worse than she thought.",
      stage: () => (
        <>
          <Me position={[P("gym", -4.9, 0, 3.2)[0], 0, 3.2]} rotationY={0.6} animation="cower" face="sad" />
          <Friend position={[P("gym", -3.6, 0, 3.5)[0], 0, 3.5]} rotationY={-0.9} animation="leanOver" face="sad" />
          <Block position={[P("gym", -5.3, 1.1, 2.6)[0], 1.1, 2.6]} size={[1.0, 0.5, 1.0]} color="#3f7f3d" />
        </>
      ),
    },
  ],
});

void faceOf;
