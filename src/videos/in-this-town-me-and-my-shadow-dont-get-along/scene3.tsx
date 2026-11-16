import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Block,
  Bubble,
  Friend,
  HER_DESK,
  HER_TABLE,
  Her,
  Kid,
  Me,
  MY_DESK,
  P,
  PencilCase,
  PixelText,
  Shadow,
  Tray,
  faceOf,
  timing,
} from "./kit";

/** Her seat, and his. Both in the far row, so the room is between them. */
const HER: Vec3 = [HER_DESK[0], 0.46, HER_DESK[2] + 0.78];
const HIS: Vec3 = [MY_DESK[0], 0.46, MY_DESK[2] + 0.78];
const TABLE_ME: Vec3 = P("cafe", -4.6, 0, 0.6);
const SEAT_ME: Vec3 = [TABLE_ME[0], 0.46, TABLE_ME[2] - 0.86];
const SEAT_FRIEND: Vec3 = [TABLE_ME[0] + 0.85, 0.46, TABLE_ME[2] - 0.86];

/**
 * THE ITCH, AND THE FRIEND. The one thing the shadow cannot do for him, and the person who is tired of hearing
 * about it. The room he cannot cross is four metres wide.
 */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Her",
  shots: [
    {
      cue: "4.one",
      ...cam.push({ on: [-2.10, 1.00, 0.70], dist: 3.15, to: 2.80, yaw: -39.6, pitch: 18.5, fov: 44 }),
      zone: "class",
      look: "town-day",
      note: "'But one thing it could not do': the silhouette stands by his desk, arms down, doing nothing, for once. From the floor, so it looks tall.",
      stage: () => (
        <>
          <Shadow position={[MY_DESK[0] + 1.1, 0, MY_DESK[2] + 0.2]} rotationY={Math.PI * 0.75} pose="idle" lift={0} scale={0.84} />
          <Me position={[MY_DESK[0] - 0.5, 0, MY_DESK[2] + 0.95]} rotationY={0.7} animation="cower" face="worried" gaze={1} />
          <Her position={HER} rotationY={Math.PI} animation="idle" face="neutral" />
        </>
      ),
    },
    {
      cue: "4.her",
      ...cam.push({ on: [3.00, 1.15, 1.18], dist: 3.32, to: 2.82, yaw: -31.6, pitch: 23.1, fov: 38 }),
      zone: "class",
      look: "town-day",
      note: "'Her. Just her': the first proper look at her, across four metres of classroom floor, with the window light on her. The camera comes in slow, like somebody who cannot walk over.",
      stage: () => (
        <>
          <Her position={HER} rotationY={Math.PI} animation="talk" face="happy" blink />
          <Kid n={2} position={[1.5, 0.46, 1.18]} rotationY={Math.PI} animation="idle" />
          <Me position={HIS} rotationY={Math.PI * 0.86} animation="idle" face="worried" gaze={1} />
        </>
      ),
    },
    {
      cue: "4.stop",
      ...cam.push({ on: [-3.00, 0.25, 1.20], dist: 1.98, to: 1.78, yaw: 42.7, pitch: 27.0, fov: 34 }),
      zone: "class",
      look: "town-day",
      note: "'My legs stopped': the floor under his desk. One shoe has come up off the ground and stayed there. Nothing else moves.",
      stage: () => (
        <>
          <Me position={HIS} rotationY={Math.PI} animation="sit" arms="hold" face="scared" />
          <Block position={[MY_DESK[0] + 0.1, 0.06, MY_DESK[2] + 1.35]} size={[0.22, 0.1, 0.34]} color="#f2f2f2" />
        </>
      ),
    },
    {
      cue: "5.friend",
      ...cam.push({ on: [75.80, 1.10, 0.60], dist: 2.71, to: 2.41, yaw: 13.5, pitch: 18.3, fov: 42 }),
      zone: "cafe",
      look: "town-day",
      note: "'My best friend was tired of hearing about her': the two of them on the far bench, tray between, her head already turned away from him.",
      stage: () => (
        <>
          <Me position={SEAT_ME} rotationY={0} animation="talk" arms="hold" face="happy" gaze={1} />
          <Friend position={SEAT_FRIEND} rotationY={0} animation="idle" face="sad" />
          <Tray position={[TABLE_ME[0] + 0.45, 0.8, TABLE_ME[2]]} rotationY={0.2} roll />
          <PencilCase position={[TABLE_ME[0] + 0.15, 0.86, TABLE_ME[2] + 0.3]} rotationY={-0.3} />
        </>
      ),
    },
    {
      cue: "5.quote",
      ...cam.push({ on: [76.25, 1.45, 0.20], dist: 1.64, to: 1.44, yaw: 12.3, pitch: 1.7, fov: 33 }),
      zone: "cafe",
      look: "town-day",
      note: "'You have described her pencil case twice today': on the friend, and the bubble. She is not angry. She is finished.",
      stage: (t, { p }) => (
        <>
          <Friend position={SEAT_FRIEND} rotationY={0} animation="talk" face="sad" />
          <Bubble
            text="TWICE TODAY"
            position={[SEAT_FRIEND[0] + 0.5, 1.85, SEAT_FRIEND[2] + 0.7]}
            rotationY={-0.3}
            scale={0.34 * Math.min(1, p * 3)}
            tail={-1}
          />
        </>
      ),
    },
    {
      cue: "5.cat",
      ...cam.top({ on: [75.50, 0.90, 0.92], height: 1.3, to: 0.95, spin: [-8, 4], fov: 36 }),
      zone: "cafe",
      look: "town-day",
      note: "'It has a cat on it': straight down on the pencil case in his hands. A cat, painted badly, still a cat.",
      stage: () => (
        <>
          <PencilCase position={[TABLE_ME[0] + 0.1, 0.86, TABLE_ME[2] + 0.32]} rotationY={-0.3} />
          <Block position={[TABLE_ME[0] - 0.28, 0.9, TABLE_ME[2] + 0.2]} size={[0.1, 0.06, 0.1]} color="#f0c49c" />
          <Block position={[TABLE_ME[0] + 0.48, 0.9, TABLE_ME[2] + 0.4]} size={[0.1, 0.06, 0.1]} color="#f0c49c" />
        </>
      ),
    },
    {
      cue: "5.ask",
      ...cam.push({ on: [75.90, 1.05, 0.70], dist: 3.24, to: 2.84, yaw: 13.1, pitch: 18.0, fov: 46 }),
      zone: "cafe",
      look: "town-day",
      note: "'Ask her': she gets up and walks off with her tray. He stays seated with his mouth open. The shadow, flat on the floor under the table, does not help.",
      stage: (t, { p }) => (
        <>
          <Me position={SEAT_ME} rotationY={0} animation="shrug" arms="hold" face="sad" />
          <Friend
            position={[SEAT_FRIEND[0] + 1.5 * p, 0, SEAT_FRIEND[2] + 0.4 * p]}
            rotationY={1.2}
            animation="walk"
            animDistance={2.4 * p}
            face="neutral"
          />
          <Shadow position={[TABLE_ME[0] + 0.55, 0, TABLE_ME[2] + 0.3]} rotationY={0.4} pose="idle" scale={0.8} />
        </>
      ),
    },
  ],
});

void Kid;
void Tray;
void HER_TABLE;
