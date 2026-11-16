import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Bubble, Her, Kid, Me, P, Shadow, faceOf, timing } from "./kit";

const ME: Vec3 = P("gym", -2.4, 0, 1.7);
const PUSHED: Vec3 = P("gym", -3.2, 0, 2.4);
const HER: Vec3 = P("gym", 0.4, 0, 0.5);
const HERE = (x: number, z: number): Vec3 => [P("gym", x, 0, z)[0], 0, z];

/**
 * THE PUSH, AND HER QUESTION. It walks him out onto the floor, then offers its hand instead of him, and she
 * looks past it. This is the worst thing that happens in the film and nobody touches anybody.
 */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Is your shadow going to ask me",
  shots: [
    {
      cue: "10.legs",
      ...cam.push({ on: [ME[0] + 0.2, 0.24, ME[2] - 0.1], dist: 1.7, to: 1.35, yaw: 34, pitch: -7, fov: 36 }),
      zone: "gym",
      look: "hallway-night",
      note: "'Then my legs started walking without me': on his shoes, moving, while the rest of him leans back like a kid being carried.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.3} animation="walk" animDistance={0.9} arms="cower" face="scared" />
          <Shadow position={HERE(-2.9, 2.2)} rotationY={1.3} pose="walk" scale={0.8} />
        </>
      ),
    },
    {
      cue: "10.push",
      ...cam.push({ on: [ME[0] + 0.1, 1.0, ME[2]], dist: 3.2, to: 2.7, yaw: 98, pitch: 5, fov: 44 }),
      zone: "gym",
      look: "hallway-night",
      note: "'My shadow was behind me, pushing': side on, the black shape at his back with both arms out, walking him across the floor like furniture.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.3} animation="stagger" animDistance={1.4} arms="cower" face="scared" />
          <Shadow position={PUSHED} rotationY={1.3} pose="out" lift={1} scale={0.84} />
          <Kid n={3} position={HERE(1.4, -2.6)} rotationY={2.4} animation="idle" face="surprised" />
        </>
      ),
    },
    {
      cue: "10.her",
      ...cam.push({ on: faceOf(HER), dist: 3.4, to: 2.2, yaw: 9, pitch: 4, fov: 38 }),
      zone: "gym",
      look: "hallway-night",
      note: "'She was under the lights, waiting': the ball turning overhead, the coloured light on her, and her looking at him come across the floor.",
      stage: () => (
        <>
          <Her position={HER} rotationY={-0.4} animation="idle" face="neutral" blink />
          <Kid n={5} position={HERE(1.9, 1.9)} rotationY={-1.2} animation="idle" />
        </>
      ),
    },
    {
      cue: "10.mouth",
      ...cam.push({ on: faceOf(ME), dist: 1.25, to: 1.05, yaw: 6, pitch: 2, fov: 28 }),
      zone: "gym",
      look: "hallway-night",
      note: "'Nothing came out': right in on his mouth, open, and the whole film holding its breath.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.3} animation="talk" face="scared" gaze={1} />
        </>
      ),
    },
    {
      cue: "11.hand",
      ...cam.push({ on: [ME[0] + 0.9, 1.1, ME[2] - 0.2], dist: 2.3, to: 1.9, yaw: -22, pitch: 2, fov: 40 }),
      zone: "gym",
      look: "hallway-night",
      note: "'My shadow put out its hand instead of me': from her side of the gap. The black arm comes out past the boy's shoulder, straight at her.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.3} animation="idle" arms="cower" face="scared" />
          <Shadow position={HERE(-1.85, 1.35)} rotationY={1.1} pose="reach" lift={1} scale={0.86} />
          <Her position={HER} rotationY={-0.4} animation="idle" face="surprised" />
        </>
      ),
    },
    {
      cue: "11.past",
      ...cam.push({ on: faceOf(HER), dist: 1.55, to: 1.3, yaw: -13, pitch: 2, fov: 30 }),
      zone: "gym",
      look: "hallway-night",
      note: "'She looked right past it. At me': her eyes, and what they are looking at is not the hand.",
      stage: () => (
        <>
          <Her position={HER} rotationY={-0.4} animation="talk" face="neutral" gaze={-1} />
        </>
      ),
    },
    {
      cue: "11.q",
      ...cam.push({ on: [ME[0] + 0.5, 1.2, ME[2] - 0.3], dist: 3.0, to: 2.5, yaw: 44, pitch: 3, fov: 44 }),
      zone: "gym",
      look: "hallway-night",
      note: "'Is your shadow going to ask me?': both of them in one frame, and the bubble between them, and the shadow still standing there with its hand out.",
      stage: (t, { p }) => (
        <>
          <Me position={ME} rotationY={1.3} animation="idle" arms="cower" face="scared" />
          <Her position={HER} rotationY={-0.4} animation="talk" face="neutral" />
          <Shadow position={HERE(-1.85, 1.35)} rotationY={1.1} pose="reach" lift={1} scale={0.86} />
          <Bubble
            text="ARE YOU GOING TO ASK ME?"
            position={[P("gym", -0.4, 2.35, 1.0)[0], 2.35, 1.0]}
            rotationY={-0.4}
            scale={0.4 * Math.min(1, p * 3)}
          />
        </>
      ),
    },
    {
      cue: "11.stop",
      ...cam.push({ on: [P("gym", 0, 1.25, 0.9)[0], 1.25, 0.9], dist: 7.0, to: 6.2, yaw: -6, pitch: 11, fov: 52 }),
      zone: "gym",
      look: "hallway-night",
      note: "'The music stopped. Even my shadow stopped': the whole gym, every kid frozen mid-dance, all of them looking at the two of them. The ball has stopped turning.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.3} animation="idle" arms="cower" face="scared" />
          <Her position={HER} rotationY={-0.4} animation="idle" face="neutral" />
          <Shadow position={HERE(-1.85, 1.35)} rotationY={1.1} pose="reach" lift={1} scale={0.86} />
          {[
            [-3.6, -1.4],
            [2.4, -2.4],
            [3.8, 1.0],
            [-1.2, 3.4],
            [1.2, 4.0],
            [-4.4, 0.6],
          ].map(([x, z], i) => (
            <Kid key={i} n={i + 1} position={HERE(x, z)} rotationY={Math.atan2(-x, -z)} animation="idle" face="surprised" />
          ))}
        </>
      ),
    },
  ],
});
