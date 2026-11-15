import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, PLACE, Ring, Rival, Splash, Swimmer, timing, travel } from "./kit";
import { Player } from "../../../Topics/InThisTown";

/**
 * 08 THE RACE — second place, and the ring on the winner's hand.
 *
 * He does not win. He is not supposed to win. The prize of the race is a look at somebody else's hand,
 * and the last line is a promise: this is going to be a problem.
 */

const A = PLACE.arena[0];

/** a kid face down, swimming, at a lane's z */
const Crawling: React.FC<{ at: Vec3; turn?: number; ring?: boolean }> = ({ at, turn = 0, ring = false }) => (
  <Swimmer at={at} turn={turn}>
    <group rotation={[0, 0, Math.PI]}>
      <Hero position={[0, 0, 0]} animation="reach" face="scared" ring={ring} />
    </group>
  </Swimmer>
);

const Other: React.FC<{ at: Vec3; who?: number; turn?: number }> = ({ at, who = 1, turn = 0 }) => (
  <Swimmer at={at} turn={turn}>
    <group rotation={[0, 0, Math.PI]}>
      <Player who={who} position={[0, 0, 0]} animation="reach" />
    </group>
  </Swimmer>
);

export const scene8 = storyScene(timing, {
  id: "scene8",
  title: "Second",
  shots: [
    {
      cue: "8.water",
      ...cam.push({ on: [A - 11, 0.45, 0], dist: 9, to: 7.4, yaw: 100, pitch: 7, fov: 44 }),
      zone: "arena",
      look: "overworld-day",
      note: "Everybody hits the water at once: five splashes across the frame, and the smallest pool turns into the whole world.",
      stage: () => (
        <>
          {[-4, -2, 0, 2, 4].map((z, i) => (
            <Splash key={z} at={[A - 11.6, 0.05, z]} size={0.24} count={10} seed={90 + i} />
          ))}
          <Hero position={[A - 11.2, 0.55 - 0.85, 0]} rotationY={-1.6} animation="fall" face="scared" ring />
        </>
      ),
    },
    {
      cue: "8.tenth",
      ...cam.push({ on: [A - 8, -0.85, 0], dist: 2.8, to: 2.1, yaw: 94, pitch: 6, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "Under the surface, behind him: everybody else's feet are already a wall of bubbles ahead. He is last, and the camera is last with him.",
      stage: () => (
        <>
          <Hero position={[A - 8, -1.05, 0]} rotationY={Math.PI / 2} animation="panic" face="scared" />
          <Splash at={[A - 7.4, -0.1, 0]} size={0.12} count={6} seed={95} />
        </>
      ),
    },
    {
      cue: "8.eighth",
      ...cam.truck({ on: [A - 4, 0.35, 0], dist: 3.6, yaw: 92, pitch: 13, fov: 40, by: [6, 0, 0] }),
      zone: "arena",
      look: "overworld-day",
      note: "Travelling with him as he comes past one: a red shoulder draws level with a white one, and the lane rope goes by underneath.",
      stage: (t) => (
        <>
          <Crawling at={[A - 6 + t * 2.6, -0.02, 0]} turn={Math.PI / 2} />
          <Other at={[A - 6.7 + t * 2.2, -0.02, -2]} who={5} turn={Math.PI / 2} />
          <Other at={[A - 3.4 + t * 2.4, -0.02, 2]} who={1} turn={Math.PI / 2} />
          <Splash at={[A - 6 + t * 2.6, 0.03, 0]} size={0.14} count={8} seed={97} />
        </>
      ),
    },
    {
      cue: "8.seventh",
      ...cam.top({ on: [A + 1, 0, 0], height: 22, to: 19, spin: [-4, 1], fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "Straight down from high above: six lanes, six wakes, and one red wake in the middle of them, seventh.",
      stage: () => (
        <>
          {[-4, -2, 2, 4].map((z, i) => (
            <Other key={z} at={[A + 2 + i * 0.8, -0.02, z]} who={2 + i * 2} turn={Math.PI / 2} />
          ))}
          <Crawling at={[A - 1.2, -0.02, 0]} turn={Math.PI / 2} />
        </>
      ),
    },
    {
      cue: "8.fourth",
      ...cam.push({ on: [A + 8, 0.4, -1], dist: 10, to: 8.4, yaw: 4, pitch: 8, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "From the finish wall, looking back at the field: three heads ahead of him, and his red one moving up through them.",
      stage: () => (
        <>
          <Other at={[A + 9.4, -0.02, -4]} who={1} turn={Math.PI / 2} />
          <Other at={[A + 9.0, -0.02, -2]} who={5} turn={Math.PI / 2} />
          <Other at={[A + 9.6, -0.02, 2]} who={11} turn={Math.PI / 2} />
          <Crawling at={[A + 7.6, -0.02, 0]} turn={Math.PI / 2} />
        </>
      ),
    },
    {
      cue: "8.feel",
      ...cam.push({ on: [A + 4, 0.0, 1], dist: 1.4, to: 1.1, yaw: 118, pitch: 18, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "Right at the water line, on his hands: the ring is doing the work and his arms are only holding on to it.",
      stage: () => (
        <>
          <Crawling at={[A + 4, -0.02, 1]} turn={Math.PI / 2} ring />
        </>
      ),
    },
    {
      cue: "8.saw",
      ...cam.push({ on: [A + 5.4, 0.1, 1], dist: 2.0, to: 1.5, yaw: 66, pitch: 10, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "Mid-stroke, he turns his head to breathe and sees something at the edge of the lane: the first hint of the ending.",
      stage: () => (
        <>
          <Hero position={[A + 5.4, -0.35, 1]} rotationY={Math.PI / 2} animation="reach" face="surprised" headYaw={-0.9} />
          <Splash at={[A + 5.4, 0.0, 1]} size={0.12} count={6} seed={101} />
        </>
      ),
    },
    {
      cue: "8.glint",
      ...cam.push({ on: [A + 7.8, 0.62, 1.9], dist: 3.2, to: 2.5, yaw: 256, pitch: 4, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "SLOW: a gold band with three buttons on the hand of the boy in front. The same ring, on somebody else, in the same race.",
      stage: () => (
        <>
          <Rival position={[A + 7.8, -0.2, 2]} rotationY={Math.PI / 2} animation="reach" face="smug" ring />
        </>
      ),
    },
    {
      cue: "8.panic",
      ...cam.push({ on: [A + 6, 0.35, 1], dist: 3.2, to: 2.4, yaw: 192, pitch: 7, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "From in front, low: he swims harder than he has ever swum, and the water does not care about effort.",
      stage: () => (
        <>
          <Crawling at={[A + 6, -0.02, 1]} turn={Math.PI / 2} />
          <Splash at={[A + 6.3, 0.05, 1]} size={0.2} count={10} seed={103} />
        </>
      ),
    },
    {
      cue: "8.third",
      ...cam.push({ on: [A + 9, 0.4, 0], dist: 6.4, to: 5.2, yaw: 96, pitch: 12, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "Side on: he is third now, one arm ahead of the next boy, and the two leaders are a lane apart in front of him.",
      stage: () => (
        <>
          <Crawling at={[A + 9, -0.02, 0]} turn={Math.PI / 2} />
          <Other at={[A + 9.8, -0.02, -2]} who={5} turn={Math.PI / 2} />
          <Other at={[A + 10.4, -0.02, 2]} who={1} turn={Math.PI / 2} />
        </>
      ),
    },
    {
      cue: "8.second",
      ...cam.push({ on: [A + 10.2, 0.12, 1.2], dist: 2.0, to: 1.6, yaw: 104, pitch: 8, fov: 36 }),
      zone: "arena",
      look: "overworld-day",
      note: "Two heads at the water line, inches apart: second place is not a number yet, it is a shoulder he can see.",
      stage: () => (
        <>
          <Crawling at={[A + 10.2, -0.02, 0]} turn={Math.PI / 2} />
          <Other at={[A + 10.6, -0.02, 2]} who={1} turn={Math.PI / 2} />
        </>
      ),
    },
    {
      cue: "8.catch",
      ...cam.push({ on: [A + 9.6, 0.3, 2], dist: 3.4, to: 2.6, yaw: 178, pitch: 8, fov: 40 }),
      zone: "arena",
      look: "overworld-day",
      note: "From behind him: the white shoulders in front are not getting closer. He can see the wall and he cannot reach it first.",
      stage: () => (
        <>
          <Crawling at={[A + 9.6, -0.02, 0]} turn={Math.PI / 2} />
          <Other at={[A + 11.2, -0.02, 2]} who={1} turn={Math.PI / 2} />
        </>
      ),
    },
    {
      cue: "8.dare",
      ...cam.push({ on: [A + 9.8, 0.85, 1.2], dist: 3.4, to: 2.8, yaw: 40, pitch: 12, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "His thumb over the red button, and the ring glowing under it. He could. He does not. The film's choice happens in one centimetre.",
      stage: () => (
        <>
          <Hero position={[A + 9.8, -0.75, 1.2]} rotationY={Math.PI / 2} animation="press" face="worried" ring />
        </>
      ),
    },
    {
      cue: "8.lose",
      ...cam.push({ on: [A + 12.1, 0.2, 2], dist: 2.6, to: 2.0, yaw: 176, pitch: 3, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "The white hand slaps the wall first. The race is decided by a sound and a splash, not by a look.",
      stage: () => (
        <>
          <Other at={[A + 11.8, -0.02, 2]} who={1} turn={Math.PI / 2} />
          <Splash at={[A + 12.2, 0.06, 2]} size={0.2} count={9} seed={107} />
        </>
      ),
    },
    {
      cue: "8.secondplace",
      ...cam.push({ on: [A + 11.4, 0.45, 1], dist: 5.4, to: 4.4, yaw: 34, pitch: 12, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "He stops, standing in the water in his own lane, and looks down it: second, and the length of the pool behind him is the proof.",
      stage: () => (
        <>
          <Hero position={[A + 11.2, -0.9, 0]} rotationY={Math.PI / 2} animation="idle" face="sad" />
        </>
      ),
    },
    {
      cue: "8.tiles",
      ...cam.top({ on: [A + 10, 0.1, -7.8], height: 5.4, to: 3.6, spin: [-8, 2], fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "The owner's ending shot: straight down, on the white tiles, arms out, a wet red shirt and a number that says sixty-six. He does not move.",
      stage: () => (
        <>
          <Hero position={[A + 10, 0, -7.8]} rotationY={1.2} animation="lie" face="sad" />
          <Splash at={[A + 10, 0.02, -7.3]} size={0.08} count={4} seed={109} />
        </>
      ),
    },
    {
      cue: "8.hand",
      ...cam.push({ on: [A + 10.4, 0.65, -7.1], dist: 3.4, to: 2.8, yaw: 12, pitch: 8, fov: 42 }),
      zone: "arena",
      look: "overworld-day",
      note: "From the tiles, looking up: the winner stands over him with a hand out — and the ring is on that hand, at his eye level.",
      stage: () => (
        <>
          <Rival position={[A + 10.7, 0, -6.7]} rotationY={Math.PI + 0.4} animation="reach" face="smug" ring />
          <Hero position={[A + 10.2, 0.02, -7.8]} rotationY={1.2} animation="lie" face="surprised" headYaw={-0.5} />
        </>
      ),
    },
    {
      cue: "8.problem",
      ...cam.push({ on: [A + 10.2, 0.22, -7.7], dist: 1.2, to: 0.95, yaw: 76, pitch: 8, fov: 36 }),
      zone: "arena",
      look: "overworld-day",
      note: "Cheek on the tile, one eye open, the ring still in his own hand: 'this is going to be a problem' — said with no breath left.",
      stage: () => (
        <>
          <Hero position={[A + 10.2, 0.02, -7.7]} rotationY={1.2} animation="lie" face="worried" headPitch={0.2} />
        </>
      ),
    },
    {
      cue: "8.sub",
      ...cam.push({ on: [A + 10.2, 0.35, -7.7], dist: 2.2, to: 1.7, yaw: 4, pitch: 14, fov: 38 }),
      zone: "arena",
      look: "overworld-day",
      note: "He lifts his head off the tiles and looks straight into the lens: part two is a promise, and he is the one making it.",
      stage: () => (
        <>
          <Hero position={[A + 10.2, 0.02, -7.7]} rotationY={0} animation="lift" face="smug" headPitch={-0.15} />
        </>
      ),
    },
  ],
});
