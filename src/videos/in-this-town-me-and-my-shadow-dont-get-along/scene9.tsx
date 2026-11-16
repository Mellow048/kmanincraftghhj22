import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Her, Kid, LikeCard, Me, P, Shadow, faceOf, timing } from "./kit";

const ME: Vec3 = P("gym", -2.4, 0, 1.7);
const HERE = (x: number, z: number): Vec3 => [P("gym", x, 0, z)[0], 0, z];
/** Sitting on the front of the stage, later, when the floor has emptied. */
const ON_STAGE_ME: Vec3 = P("gym", -0.9, 0.62, -4.9);
const ON_STAGE_HER: Vec3 = P("gym", 0.15, 0.62, -4.9);

/**
 * THE REVEAL. What the shadow was, all along. Everything the first minute showed as a joke was the boy's own
 * courage doing his living for him, and now it is back under his shoes where it belongs.
 */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "It had my mind",
  shots: [
    {
      cue: "14.real",
      ...cam.push({ on: [ME[0] + 0.15, 1.15, ME[2]], dist: 2.6, to: 2.2, yaw: 20, pitch: 3, fov: 42 }),
      zone: "gym",
      look: "hallway-night",
      note: "'My shadow never had a mind of its own': him standing on the floor, and his shadow back under his shoes where every other shadow in town is.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.25} animation="idle" face="neutral" />
          <Shadow position={[ME[0] + 0.05, 0, ME[2] + 0.05]} rotationY={1.25} pose="idle" scale={0.8} />
        </>
      ),
    },
    {
      cue: "14.mine",
      ...cam.top({ on: [ME[0] + 0.1, 0.1, ME[2] + 0.2], height: 1.9, to: 1.35, spin: [-10, 6], fov: 38 }),
      zone: "gym",
      look: "hallway-night",
      note: "'It had my mind': straight down on his two shoes and the flat black thing between them. Just a shadow. It always was.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.25} animation="idle" face="neutral" />
          <Shadow position={[ME[0] + 0.05, 0, ME[2] + 0.05]} rotationY={1.25} pose="idle" scale={0.8} />
        </>
      ),
    },
    {
      cue: "14.part",
      ...cam.push({ on: [P("gym", -0.6, 1.1, 0.9)[0], 1.1, 0.9], dist: 4.3, to: 3.7, yaw: -17, pitch: 9, fov: 50 }),
      zone: "gym",
      look: "hallway-night",
      note: "'The part of me that was not scared': the two of them in the middle of the floor, and the bunting, and the ball, and one shadow under two pairs of shoes.",
      stage: () => (
        <>
          <Me position={[P("gym", -1.1, 0, 1.0)[0], 0, 1.0]} rotationY={1.2} animation="idle" face="happy" />
          <Her position={[P("gym", -0.3, 0, 1.0)[0], 0, 1.0]} rotationY={-1.9} animation="idle" face="happy" />
          <Shadow position={[P("gym", -0.7, 0, 1.3)[0], 0, 1.3]} rotationY={1.2} pose="idle" scale={0.82} />
          <Kid n={3} position={[P("gym", 3.0, 0, -1.0)[0], 0, -1.0]} rotationY={2.0} animation="idle" />
        </>
      ),
    },
    {
      cue: "14.now",
      ...cam.push({ on: [P("gym", -0.4, 1.35, -4.2)[0], 1.35, -4.2], dist: 3.4, to: 2.9, yaw: 8, pitch: 5, fov: 44 }),
      zone: "gym",
      look: "hallway-night",
      note: "'She is asleep on my shoulder': later, the floor emptied, the two of them sitting on the front of the stage with her head tipped onto his shoulder.",
      stage: () => (
        <>
          <Me position={ON_STAGE_ME} rotationY={0} animation="sit" face="happy" />
          <Her position={ON_STAGE_HER} rotationY={0.35} animation="sit" face="sleepy" />
          <Shadow position={[ON_STAGE_ME[0] + 0.1, 0.63, ON_STAGE_ME[2] + 0.5]} rotationY={0} pose="idle" scale={0.8} />
        </>
      ),
    },
    {
      cue: "14.together",
      ...cam.push({ on: [P("gym", 0, 1.5, -2.4)[0], 1.5, -2.4], dist: 6.6, to: 5.9, yaw: 6, pitch: 7, fov: 50 }),
      zone: "gym",
      look: "hallway-night",
      note: "'Both of us are where we belong': the gym behind them, half the lights off, bunting still up, the two of them small at the front of the stage.",
      stage: () => (
        <>
          <Me position={ON_STAGE_ME} rotationY={0} animation="sit" face="happy" />
          <Her position={ON_STAGE_HER} rotationY={0.35} animation="sit" face="sleepy" />
          <Shadow position={[ON_STAGE_ME[0] + 0.1, 0.63, ON_STAGE_ME[2] + 0.5]} rotationY={0} pose="idle" scale={0.8} />
        </>
      ),
    },
    {
      cue: "15.like",
      ...cam.push({ on: [P("gym", -0.4, 1.5, -3.4)[0], 1.5, -3.4], dist: 3.6, to: 3.0, yaw: 3, pitch: 2, fov: 42 }),
      zone: "gym",
      look: "hallway-night",
      note: "'Like this video if you had to borrow your courage': the two of them behind it, the card in front, held up like a photo somebody took of the night.",
      stage: () => (
        <>
          <Me position={ON_STAGE_ME} rotationY={0} animation="sit" arms="reach" face="happy" />
          <Her position={ON_STAGE_HER} rotationY={0.35} animation="sit" face="sleepy" />
          <LikeCard position={[P("gym", -0.35, 1.62, -3.55)[0], 1.62, -3.55]} rotationY={-0.06} scale={0.9} />
        </>
      ),
    },
  ],
});

void faceOf;
