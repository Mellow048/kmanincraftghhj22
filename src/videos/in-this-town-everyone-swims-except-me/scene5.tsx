import { cam, storyScene } from "../../engine";
import { Hero, PLACE, Ring, Stranger, timing } from "./kit";

/**
 * 05 THE RING — the woods, the stranger, the question with no answer.
 *
 * Night. No music of the town, no friend: the first scene where nobody else is swimming.
 * The ring is the only warm thing in the frame, and the stranger is never seen from the front.
 */

const WOODS = PLACE.woods;
const X = WOODS[0];

export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The Ring",
  shots: [
    {
      cue: "5.home",
      ...cam.truck({ on: [6, 1.3, 2.2], dist: 5.6, yaw: 58, pitch: 10, fov: 40, by: [-4, 0, 0] }),
      zone: "village",
      look: "overworld-night",
      note: "Night street, travelling with him as he walks home alone: the town's windows are lit and he is outside all of them.",
      stage: (t) => (
        <>
          <Hero position={[6.2 - t * 1.5, 0, 2.2]} rotationY={-Math.PI / 2} animation="walk" animDistance={t * 1.5} face="sad" />
        </>
      ),
    },
    {
      cue: "5.call",
      ...cam.push({ on: [0.4, 1.25, 1.2], dist: 4.2, to: 3.2, yaw: 6, pitch: 8, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "He stops: the name comes out of the dark at the edge of town, and there is nothing there to see. The camera stays behind him.",
      stage: () => (
        <>
          <Hero position={[0.4, 0, 2.6]} rotationY={Math.PI + 0.3} animation="idle" face="surprised" headYaw={0.5} />
        </>
      ),
    },
    {
      cue: "5.woods",
      ...cam.push({ on: [X, 1.15, 75.5], dist: 3.8, to: 3.0, yaw: 2, pitch: 8, fov: 40 }),
      zone: "woods",
      look: "overworld-night",
      note: "Into the trees on a path with one lamp: he walks toward the lens, which means the audience walks backwards into the woods with him.",
      stage: (t) => (
        <>
          <Hero position={[X, 0, 72.0 + t * 1.1]} rotationY={0} animation="walk" animDistance={t * 1.1} face="worried" />
        </>
      ),
    },
    {
      cue: "5.stranger",
      ...cam.push({ on: [X + 0.3, 1.2, 81], dist: 3.4, to: 2.7, yaw: 184, pitch: 5, fov: 40 }),
      zone: "woods",
      look: "overworld-night",
      note: "Over his shoulder: a tall shape between the trees holding something out. We never get the stranger's face — only the hand and the ring.",
      stage: () => (
        <>
          <Stranger position={[X, 0, 81.4]} rotationY={Math.PI} animation="hold" />
          <Hero position={[X + 0.3, 0, 78.4]} rotationY={Math.PI} animation="idle" face="surprised" headPitch={-0.1} />
          <Ring position={[X, 1.12, 80.6]} scale={1.2} glow={0.8} />
        </>
      ),
    },
    {
      cue: "5.ask",
      ...cam.push({ on: [X, 1.15, 79.6], dist: 3.6, to: 3.0, yaw: -96, pitch: 6, fov: 38 }),
      zone: "woods",
      look: "overworld-night",
      note: "He asks the question. The ring is huge and out of focus in the foreground, because the answer is going to be nothing.",
      stage: () => (
        <>
          <Hero position={[X, 0, 78.8]} rotationY={0.1} animation="talk" face="worried" />
          <Stranger position={[X, 0, 81.2]} rotationY={Math.PI} animation="hold" />
          <Ring position={[X, 1.12, 80.5]} rotation={[0.2, 0.5, 0]} scale={1.6} glow={1.0} />
        </>
      ),
    },
    {
      cue: "5.silent",
      ...cam.push({ on: [X, 1.15, 79.8], dist: 6.4, to: 7.4, yaw: 92, pitch: 9, fov: 42 }),
      zone: "woods",
      look: "overworld-night",
      note: "Side on, both of them, and nothing happens: the stranger does not move, the trees do not move. The silence is the joke and the threat.",
      stage: () => (
        <>
          <Stranger position={[X, 0, 81.4]} rotationY={Math.PI} animation="hold" />
          <Hero position={[X, 0, 78.4]} rotationY={0} animation="idle" face="worried" />
        </>
      ),
    },
    {
      cue: "5.left",
      ...cam.push({ on: [X, 1.1, 78.6], dist: 2.4, to: 5.2, yaw: 24, pitch: 9, fov: 42 }),
      zone: "woods",
      look: "overworld-night",
      note: "Pull back: the tall shape is simply not there any more. Only the boy, the lamp, and the ring already in his hand.",
      stage: () => (
        <>
          <Hero position={[X, 0, 78.6]} rotationY={0.6} animation="idle" face="surprised" headYaw={-0.6} />
        </>
      ),
    },
    {
      cue: "5.cold",
      ...cam.push({ on: [X, 1.05, 78.5], dist: 0.7, to: 0.5, yaw: 28, pitch: 26, fov: 40 }),
      zone: "woods",
      look: "overworld-night",
      note: "A ring in a boy's palm, at the size of a ring: cold metal and three little buttons, humming with a light that has no source.",
      stage: () => (
        <>
          <Ring position={[X, 1.02, 78.62]} rotation={[0.3, 0.8, 0]} scale={2.2} glow={1.1} />
          <Hero position={[X, 0, 78.6]} rotationY={0.4} animation="hold" face="neutral" />
        </>
      ),
    },
    {
      cue: "5.lamp",
      ...cam.push({ on: [120.2, 0.9, 39.8], dist: 3.6, to: 2.8, yaw: 6, pitch: 13, fov: 42 }),
      zone: "home",
      look: "overworld-night",
      note: "His room at night, the ring on the table by the lamp, him asleep facing it. The last quiet shot before the trick works.",
      stage: () => (
        <>
          <Hero position={[121.1, 0.34, 39.7]} rotationY={0} animation="sleep" face="sleepy" />
          <Ring position={[118.3, 0.7, 39.6]} rotation={[0.2, 0.3, 0]} scale={1.5} glow={1.0} />
        </>
      ),
    },
  ],
});
