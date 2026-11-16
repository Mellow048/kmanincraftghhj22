import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Friend, Her, Kid, Me, P, Shadow, faceOf, timing } from "./kit";

const ME: Vec3 = P("gym", -2.4, 0, 1.7);
const HER: Vec3 = P("gym", 0.4, 0, 0.5);
const HERE = (x: number, z: number): Vec3 => [P("gym", x, 0, z)[0], 0, z];
const CORNER: Vec3 = P("gym", -6.8, 0, 5.4);

/**
 * THE ACT, AND THE YES. He says it himself. The shadow goes flat under his shoes, she says yes, and the two of
 * them dance like a badly drawn puppet, which is what a first dance is.
 */
export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Do you want to dance with me",
  shots: [
    {
      cue: "12.knees",
      ...cam.push({ on: [ME[0] + 0.1, 0.36, ME[2]], dist: 1.35, to: 1.1, yaw: 24, pitch: -9, fov: 34 }),
      zone: "gym",
      look: "hallway-night",
      note: "'My knees shook so hard my shoelaces moved': down at his knees and shoes, and the laces going.",
      stage: (t) => (
        <>
          <Me position={ME} rotationY={1.3} animation="scared" arms="cower" face="scared" phase={t} />
        </>
      ),
    },
    {
      cue: "12.breath",
      ...cam.push({ on: faceOf(ME), dist: 1.45, to: 1.2, yaw: -9, pitch: 3, fov: 30 }),
      zone: "gym",
      look: "hallway-night",
      note: "'I took one breath': his face, and one breath, and the coloured light going round on it.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.25} animation="idle" face="worried" gaze={1} />
        </>
      ),
    },
    {
      cue: "12.ask",
      ...cam.push({ on: [ME[0] + 1.3, 1.2, ME[2] - 0.5], dist: 3.3, to: 2.8, yaw: 52, pitch: 3, fov: 44 }),
      zone: "gym",
      look: "hallway-night",
      note: "'Do you want to dance with me?': the two of them and nobody else, the way it feels when it is finally happening.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.3} animation="talk" face="worried" />
          <Her position={HER} rotationY={-0.4} animation="idle" face="surprised" />
          <Shadow position={HERE(-2.9, 2.1)} rotationY={1.3} pose="idle" scale={0.8} />
        </>
      ),
    },
    {
      cue: "12.voice",
      ...cam.push({ on: [ME[0] + 0.1, 1.15, ME[2]], dist: 1.7, to: 1.45, yaw: 14, pitch: 2, fov: 34 }),
      zone: "gym",
      look: "hallway-night",
      note: "'My voice. Cracked and quiet and mine': the first thing in this film that is his, and it comes out wrong, and that is fine.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.2} animation="talk" face="surprised" />
        </>
      ),
    },
    {
      cue: "12.still",
      ...cam.push({ on: [HERE(-2.9, 2.0)[0], 0.2, 2.0], dist: 2.4, to: 2.0, yaw: 28, pitch: -6, fov: 40 }),
      zone: "gym",
      look: "hallway-night",
      note: "'My shadow went still': on the floor behind him, the black shape stops mid-step, all at once, like a machine switched off.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.2} animation="idle" face="neutral" />
          <Shadow position={HERE(-2.9, 2.1)} rotationY={1.3} pose="walk" scale={0.8} />
        </>
      ),
    },
    {
      cue: "12.floor",
      ...cam.top({ on: [ME[0] + 0.35, 0.1, ME[2] + 0.3], height: 2.1, to: 1.45, spin: [12, -6], fov: 40 }),
      zone: "gym",
      look: "hallway-night",
      note: "'Stepped onto the floor and slid under my shoes': straight down. The black shape steps down and slides in under his two shoes, and is a shadow again.",
      stage: (t, { p }) => (
        <>
          <Me position={ME} rotationY={1.2} animation="idle" face="neutral" />
          <Shadow
            position={[ME[0] + 0.05, 0, ME[2] + 0.05]}
            rotationY={1.2}
            pose="idle"
            lift={Math.max(0, 0.55 - p * 0.7)}
            scale={0.8 * (1 - 0.15 * p)}
            t={t}
          />
        </>
      ),
    },
    {
      cue: "13.yes",
      ...cam.push({ on: faceOf(HER), dist: 1.6, to: 1.35, yaw: 11, pitch: 3, fov: 31 }),
      zone: "gym",
      look: "hallway-night",
      note: "'She said yes': her face while she says it, two words, and the whole film turns over.",
      stage: () => (
        <>
          <Her position={HER} rotationY={-0.4} animation="talk" face="happy" blink />
        </>
      ),
    },
    {
      cue: "13.follow",
      ...cam.push({ on: [ME[0] + 0.9, 1.05, ME[2] - 0.4], dist: 4.2, to: 3.6, yaw: 29, pitch: 17, fov: 50 }),
      zone: "gym",
      look: "hallway-night",
      note: "'She took my hand, and my shadow followed on the floor': from above and behind, the two of them together, and one flat shadow under both pairs of shoes.",
      stage: () => (
        <>
          <Me position={[ME[0] + 0.5, 0, ME[2] - 0.2]} rotationY={1.3} animation="idle" face="happy" />
          <Her position={[HER[0] - 0.55, 0, HER[2] + 0.35]} rotationY={-1.9} animation="idle" face="happy" />
          <Shadow position={[ME[0] + 0.55, 0, ME[2] - 0.1]} rotationY={1.3} pose="idle" scale={0.84} />
        </>
      ),
    },
    {
      cue: "13.dance",
      ...cam.push({ on: [P("gym", -0.5, 1.05, 1.0)[0], 1.05, 1.0], dist: 3.2, to: 2.7, yaw: 74, pitch: 4, fov: 44 }),
      zone: "gym",
      look: "hallway-night",
      note: "'We danced like a badly drawn puppet': side on, both of them stepping the same wrong way, and the shadow under them doing the same wrong step.",
      stage: (t) => (
        <>
          <Me position={[P("gym", -0.9, 0, 1.0)[0], 0, 1.0]} rotationY={1.2} animation="cheer" face="happy" />
          <Her position={[P("gym", -0.1, 0, 1.0)[0], 0, 1.0]} rotationY={-1.9} animation="cheer" face="happy" />
          <Shadow position={[P("gym", -0.5, 0, 1.3)[0], 0, 1.3]} rotationY={1.2} pose="cheer" scale={0.8} t={t} swing={1} />
          <Kid n={2} position={[P("gym", 2.2, 0, -1.6)[0], 0, -1.6]} rotationY={2.2} animation="cheer" />
          <Kid n={4} position={[P("gym", -3.2, 0, -0.9)[0], 0, -0.9]} rotationY={1.4} animation="jump" />
        </>
      ),
    },
    {
      cue: "13.friend",
      ...cam.push({ on: faceOf(CORNER), dist: 1.7, to: 1.45, yaw: -21, pitch: 3, fov: 33 }),
      zone: "gym",
      look: "hallway-night",
      note: "'My friend cried in the corner. She blames the smoke machine': on the friend, pretending hard, one hand on her eye.",
      stage: () => (
        <>
          <Friend position={CORNER} rotationY={0.9} animation="idle" arms="reach" face="crying" />
        </>
      ),
    },
  ],
});
