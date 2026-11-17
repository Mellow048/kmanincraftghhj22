import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { COUNTER, Kid, Me, Shadow, Teacher, chestOf, faceOf, P, stride, timing, PixelText, Block, Tray, Cook, Principal } from "./kit";

const WALL_Z = -2.78;
/** Where the boy is in the hallway shots (middle of the corridor). */
const WALK_A: Vec3 = P("hall", -6.5, 0, 0.5);
const WALK_B: Vec3 = P("hall", -0.5, 0, 0.5);

/**
 * THE RULE, AND THE TOUR. What a shadow is meant to do, what his does instead: answer in class, walk the wall in
 * the hallway, take the last pudding at lunch. All of it is a joke until the last line.
 */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "What it does instead",
  shots: [
    {
      cue: "2.rule",
      ...cam.top({ on: [38.50, 0.10, 0.90], height: 2.6, to: 2.0, spin: [0, 11], fov: 42 }),
      zone: "hall",
      look: "town-day",
      note: "'A shadow belongs under your shoes': straight down on three pairs of shoes in the corridor, each with its own flat shadow under it. The fourth pair has nothing.",
      stage: () => (
        <>
          {[
            [-2.6, 0],
            [-1.6, 0.2],
            [-0.6, -0.15],
          ].map(([x, r], i) => (
            <group key={i}>
              <Kid n={i + 1} position={P("hall", x, 0, 1.2 + r)} rotationY={Math.PI} animation="idle" />
              <Shadow position={P("hall", x, 0, 1.2 + r)} rotationY={Math.PI} scale={0.78} />
            </group>
          ))}
          <Me position={P("hall", 0.6, 0, 1.1)} rotationY={Math.PI} animation="idle" face="worried" />
        </>
      ),
    },
    {
      cue: "2.mine",
      ...cam.truck({ on: [36.80, 1.25, 0.20], dist: 2.42, yaw: 0.0, pitch: 18.1, by: [6.4, 0, 0], fov: 46 }),
      zone: "hall",
      look: "town-day",
      note: "'Up walls, into rooms without me': the camera tracks along the corridor at the height of the lockers. He walks with his head down; his shadow walks the wall above him, in step, out of reach.",
      stage: (t, { p }) => (
        <>
          <Me {...stride(WALK_A, WALK_B, p)} animation="walk" face="sad" />
          <Shadow
            position={P("hall", -6.0 + 6.0 * p, 1.72, WALL_Z)}
            rotationY={0}
            pose="walk"
            lift={1}
            scale={0.8}
            t={t}
            swing={0.9}
          />
        </>
      ),
    },
    {
      cue: "2.why",
      ...cam.push({ on: [39.40, 1.15, 0.60], dist: 2.57, to: 2.27, yaw: 2.5, pitch: 26.5, fov: 44 }),
      zone: "hall",
      look: "town-day",
      note: "'Nobody knew why': over the principal's shoulder. He has a clipboard, a pen, and no idea. Behind him the shadow stands on the lockers like a poster of a boy.",
      stage: () => (
        <>
          <Principal position={P("hall", -0.6, 0, 1.9)} rotationY={Math.PI} animation="talk" face="surprised" />
          <Me position={P("hall", -0.6, 0, 0.1)} rotationY={0} animation="shrug" face="worried" />
          <Shadow position={P("hall", -0.6, 1.66, WALL_Z)} rotationY={0} pose="idle" lift={1} scale={0.8} />
        </>
      ),
    },
    {
      cue: "2.only",
      ...cam.push({ on: [0.60, 1.00, 1.70], dist: 2.99, to: 2.59, yaw: 10.9, pitch: 27.9, fov: 44 }),
      zone: "class",
      look: "town-day",
      note: "'The only one like this': from the floor in front of the class, five kids standing in a row, a shadow under every pair of shoes but his. His is standing next to him.",
      stage: () => (
        <>
          {[
            [-1.7, 2, 2.6],
            [1.5, 3, 2.4],
            [-1.2, 4, 0.2],
            [1.6, 5, 0.1],
          ].map(([x, n, z], i) => (
            <group key={i}>
              <Kid n={n} position={[x, 0, z]} rotationY={Math.PI} animation="idle" />
              <Shadow position={[x, 0, z]} rotationY={Math.PI} scale={0.78} />
            </group>
          ))}
          <Me position={[-0.45, 0, 1.55]} rotationY={Math.PI} animation="idle" face="sad" gaze={-1} />
          <Shadow position={[0.4, 0, 1.35]} rotationY={Math.PI * 0.85} pose="idle" lift={0} scale={0.8} />
        </>
      ),
    },
    {
      cue: "3.class",
      ...cam.push({ on: [0.60, 1.40, -3.50], dist: 3.12, to: 2.72, yaw: 5.9, pitch: 20.7, fov: 42 }),
      zone: "class",
      look: "town-day",
      note: "'My shadow stood up and answered the questions': on the board, from the class. The silhouette is at the board with chalk, the teacher is at the side, letting it.",
      stage: () => (
        <>
          <Shadow position={[0.85, 0, -3.35]} rotationY={0} pose="point" lift={0} scale={0.86} />
          <Teacher position={[2.7, 0, -3.5]} rotationY={-0.5} animation="idle" face="worried" />
          <Block position={[1.02, 1.86, -4.30]} size={[0.05, 0.05, 0.05]} color="#f4f2ea" />
        </>
      ),
    },
    {
      cue: "3.mark",
      ...cam.top({ on: [-3.00, 0.78, 0.45], height: 1.6, to: 1.15, spin: [9, -5], fov: 38 }),
      zone: "class",
      look: "town-day",
      note: "'A better mark than me': straight down on his test paper. A, and a red tick that is too big. His own hands are not on the desk: the black arm across it is the shadow's.",
      stage: () => (
        <>
          <Block position={[-3, 0.76, 0.4]} size={[0.34, 0.01, 0.44]} color="#f4f0e4" />
          <PixelText text="A" position={[-3.05, 0.775, 0.34]} height={0.16} color="#c9302a" />
          <PixelText text="PERFECT" position={[-3, 0.775, 0.56]} height={0.06} color="#2a4a8a" />
          <Block position={[-2.55, 0.79, 0.15]} size={[0.7, 0.03, 0.14]} color="#0a0d16" castShadow={false} />
          <Me position={[-3.95, 0, 0.95]} rotationY={2.1} animation="cower" face="scared" />
        </>
      ),
    },
    {
      cue: "3.hall",
      ...cam.truck({ on: [36.50, 1.05, 0.40], dist: 2.68, yaw: -97.1, pitch: 25.4, by: [6.2, 0, 0], fov: 46 }),
      zone: "hall",
      look: "town-day",
      note: "'Walked the wall and waved at the principal': behind him down the corridor. He walks with his bag; his shadow walks the lockers and waves at the principal, who waves back.",
      stage: (t, { p }) => (
        <>
          <Me {...stride(P("hall", -6.2, 0, 0.5), P("hall", 0.2, 0, 0.5), p)} animation="walk" face="neutral" />
          <Shadow
            position={P("hall", -6.0 + 6.0 * p, 1.6, WALL_Z)}
            rotationY={0}
            pose="point"
            lift={0}
            scale={0.8}
            t={t}
            swing={0.5}
          />
          <Principal position={P("hall", 1.6, 0, -1.5)} rotationY={2.6} animation="wave" face="happy" />
        </>
      ),
    },
    {
      cue: "3.lunch",
      ...cam.push({ on: [79.50, 1.10, -3.60], dist: 2.15, to: 1.90, yaw: 27.9, pitch: 26.3, fov: 38 }),
      zone: "cafe",
      look: "town-day",
      note: "'Took the last pudding': close on the counter at the end of the line. One pudding left. A black arm comes in from the left and takes it.",
      stage: () => (
        <>
          <Tray position={[COUNTER[0] - 0.5, 1.12, COUNTER[2] + 0.4]} pudding={1} rotationY={0.12} />
          <Shadow position={[COUNTER[0] - 1.5, 0, COUNTER[2] + 2.2]} rotationY={0.1} pose="reach" lift={0} scale={0.84} />
          <Kid n={5} position={[COUNTER[0] + 1.1, 0, COUNTER[2] + 2.4]} rotationY={0.4} animation="idle" face="sad" />
        </>
      ),
    },
    {
      cue: "3.cook",
      ...cam.push({ on: [80.90, 1.30, -4.55], dist: 2.60, to: 2.30, yaw: -14.0, pitch: 17.9, fov: 42 }),
      zone: "cafe",
      look: "town-day",
      note: "'The cook shouted. My shadow blew her a kiss': over the counter, the cook leaning out at him. Below her, out of her eyeline, the silhouette does the kiss.",
      stage: () => (
        <>
          <Cook position={[COUNTER[0] + 0.9, 0, COUNTER[2] - 0.35]} rotationY={0} animation="panic" face="angry" />
          <Me position={[COUNTER[0] + 1.4, 0, COUNTER[2] + 2.1]} rotationY={Math.PI * 0.9} animation="cower" face="scared" />
          <Shadow position={[COUNTER[0] + 0.1, 0, COUNTER[2] + 1.9]} rotationY={0.3} pose="out" lift={0.8} scale={0.8} />
        </>
      ),
    },
    {
      cue: "3.good",
      ...cam.push({ on: [79.90, 0.90, 3.60], dist: 4.72, to: 4.22, yaw: 52.8, pitch: 39.5, fov: 50 }),
      zone: "cafe",
      look: "town-day",
      note: "'The best part of me was not me': the lunch room from up in a corner. He is alone at a table with a tray, and the flat black shape beside him on the bench is sitting like a friend.",
      stage: () => (
        <>
          <Me position={[-0.1, 0.46, 3.6]} rotationY={0.5} animation="sit" arms="hold" face="sad" />
          <Shadow position={[0.62, 0, 3.6]} rotationY={1.4} pose="sit" lift={0.82} scale={0.8} />
          {[
            [-4.6, 0.6],
            [4.6, 0.6],
            [0.3, 0.6],
          ].map(([x, z], i) => (
            <Kid key={i} n={i + 1} position={[x + 0.6, 0.46, z + 0.9]} rotationY={Math.PI} animation="sit" />
          ))}
        </>
      ),
    },
  ],
});
