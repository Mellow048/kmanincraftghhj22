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
      ...cam.push({ on: [121.60, 0.35, 1.70], dist: 1.42, to: 1.22, yaw: 39.3, pitch: 4.0, fov: 34 }),
      zone: "gym",
      look: "prom-night",
      note: "'My knees shook so hard my shoelaces moved': down at his knees and shoes, and the laces going.",
      stage: (t) => (
        <>
          <Me position={ME} rotationY={1.3} animation="scared" arms="cower" face="scared" phase={t} />
        </>
      ),
    },
    {
      cue: "12.breath",
      ...cam.push({ on: [121.60, 1.30, 1.70], dist: 1.44, to: 1.24, yaw: 20.3, pitch: 4.0, fov: 30 }),
      zone: "gym",
      look: "prom-night",
      note: "'I took one breath': his face, and one breath, and the coloured light going round on it.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.25} animation="idle" face="worried" gaze={1} />
        </>
      ),
    },
    {
      cue: "12.ask",
      ...cam.push({ on: [123.00, 1.15, 1.10], dist: 2.98, to: 2.58, yaw: 21.0, pitch: 20.7, fov: 44 }),
      zone: "gym",
      look: "prom-night",
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
      ...cam.push({ on: [121.60, 1.25, 1.70], dist: 1.74, to: 1.49, yaw: 11.6, pitch: 3.3, fov: 34 }),
      zone: "gym",
      look: "prom-night",
      note: "'My voice. Cracked and quiet and mine': the first thing in this film that is his, and it comes out wrong, and that is fine.",
      stage: () => (
        <>
          <Me position={ME} rotationY={1.2} animation="talk" face="surprised" />
        </>
      ),
    },
    {
      cue: "12.still",
      ...cam.push({ on: [121.10, 0.35, 2.10], dist: 2.78, to: 2.48, yaw: 20.2, pitch: 43.2, fov: 42 }),
      zone: "gym",
      look: "prom-night",
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
      ...cam.top({ on: [121.90, 0.10, 1.75], height: 2.0, to: 1.4, spin: [12, -6], fov: 40 }),
      zone: "gym",
      look: "prom-night",
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
      ...cam.push({ on: [124.40, 1.35, 0.50], dist: 1.68, to: 1.48, yaw: 17.4, pitch: 5.1, fov: 31 }),
      zone: "gym",
      look: "prom-night",
      note: "'She said yes': her face while she says it, two words, and the whole film turns over.",
      stage: () => (
        <>
          <Her position={HER} rotationY={-0.4} animation="talk" face="happy" blink />
        </>
      ),
    },
    {
      cue: "13.follow",
      ...cam.push({ on: [122.60, 1.05, 0.90], dist: 4.08, to: 3.58, yaw: 23.6, pitch: 31.0, fov: 48 }),
      zone: "gym",
      look: "prom-night",
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
      ...cam.push({ on: [123.50, 1.00, 1.00], dist: 3.49, to: 3.09, yaw: 52.4, pitch: 20.1, fov: 44 }),
      zone: "gym",
      look: "prom-night",
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
      ...cam.push({ on: [117.20, 1.20, 5.40], dist: 2.00, to: 1.80, yaw: -153.4, pitch: 26.7, fov: 33 }),
      zone: "gym",
      look: "prom-night",
      note: "'My friend cried in the corner. She blames the smoke machine': on the friend, pretending hard, one hand on her eye.",
      stage: () => (
        <>
          <Friend position={CORNER} rotationY={0.9} animation="idle" arms="reach" face="crying" />
        </>
      ),
    },
  ],
});
