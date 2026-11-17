import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { BOARD, Her, Kid, ME_JEANS, MY_DESK, Me, Shadow, Teacher, chestOf, faceOf, stride, timing } from "./kit";

const SEAT: Vec3 = [MY_DESK[0], 0.46, MY_DESK[2] + 0.78];
const HIDE: Vec3 = [MY_DESK[0] - 1.05, 0, MY_DESK[2] + 0.85];
/** His shadow, out at the board on its own. */
const AT_BOARD: Vec3 = [0.85, 0, -2.95];
const SH_AT_DESK: Vec3 = [MY_DESK[0] + 1.0, 0, MY_DESK[2] + 0.1];

/**
 * HERO + THE RULE. The premise in one picture: a boy on the floor beside his own desk, and his shadow standing at
 * the board like it is the one who lives here.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Me and my shadow",
  shots: [
    {
      cue: "1.copy",
      ...cam.push({ on: [-2.90, 1.00, 1.20], dist: 4.97, to: 4.47, yaw: 50.5, pitch: 27.6, fov: 48 }),
      zone: "class",
      look: "town-day",
      note: "The whole classroom in one frame: the class sitting still with their shadows under their desks, and one shadow standing up at the board. The boy is on the floor beside his own desk.",
      stage: () => (
        <>
          <Teacher position={[-0.5, 0, -3.9]} animation="talk" />
          <Shadow position={[-2.2, 0, 1.0]} rotationY={2.9} pose="idle" lift={0} scale={0.8} />
          {[
            [-0.7, 0],
            [0.9, 0],
            [2.6, 0],
            [0.4, 1],
          ].map(([x, r], i) => (
            <group key={i}>
              <Kid n={i + 2} position={[x, 0.46, 1.18 + r * 2.1]} rotationY={Math.PI} animation="idle" />
              <Shadow position={[x, 0, 1.18 + r * 2.1]} rotationY={Math.PI} scale={0.78} pose="idle" />
            </group>
          ))}
          <Her position={[2.7, 0.46, 1.18]} rotationY={Math.PI} animation="idle" face="neutral" />
          <Me position={HIDE} rotationY={2.6} animation="cower" face="scared" gaze={-1} />
        </>
      ),
    },
    {
      cue: "1.own",
      ...cam.push({ on: [-3.20, 0.95, 1.10], dist: 3.01, to: 2.61, yaw: -30.3, pitch: 22.5, fov: 42 }),
      zone: "class",
      look: "town-day",
      note: "'Mine had a mind of its own': the boy on the floor beside his desk, and his shadow standing up beside him, facing the board. Side on, from as low as the floor.",
      stage: () => (
        <>
          <Me position={HIDE} rotationY={Math.PI} animation="cower" face="scared" />
          <Shadow position={SH_AT_DESK} rotationY={Math.PI * 0.86} pose="idle" lift={0} scale={0.84} />
          <Kid n={4} position={[0, 0.46, 1.18]} rotationY={Math.PI} animation="idle" />
        </>
      ),
    },
    {
      cue: "1.brave",
      ...cam.push({ on: [0.85, 1.00, -2.95], dist: 1.72, to: 1.37, yaw: 135.0, pitch: 8.4, fov: 42 }),
      zone: "class",
      look: "town-day",
      note: "'Not scared of anything': from the floor, up at the black silhouette standing at the board with its arm out, pointing at the answer. It owns the room.",
      stage: () => (
        <>
          <Shadow position={AT_BOARD} rotationY={0.12} pose="point" lift={0} scale={0.86} />
          <Teacher position={[-1.0, 0, -3.9]} animation="idle" face="surprised" />
        </>
      ),
    },
    {
      cue: "1.me",
      ...cam.push({ on: [-3.40, 0.95, 1.50], dist: 1.89, to: 1.64, yaw: 32.0, pitch: 4.5, fov: 34 }),
      zone: "class",
      look: "town-day",
      note: "'Scared of everything': down at his face under the desk lid, knees up, one eye on the room.",
      stage: () => (
        <>
          <Me position={HIDE} rotationY={Math.PI} animation="cower" face="scared" gaze={-1} />
        </>
      ),
    },
  ],
});
