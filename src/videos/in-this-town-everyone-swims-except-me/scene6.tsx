import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, PLACE, Ring, Splash, Swimmer, timing, travel } from "./kit";

/**
 * 06 THE BUTTONS — the ring works, and the boy is too frightened to use it properly.
 *
 * He wears it for luck. Then the pool becomes a thing he can cross in one stroke, which is not the same
 * as swimming. Three buttons: max, medium, low. The one he keeps is the one that only makes him fast.
 */

const P = PLACE.pool[0];

const Crawling: React.FC<{ at: Vec3; turn?: number; splash?: boolean }> = ({
  at,
  turn = 0,
  splash = false,
}) => (
  <Swimmer at={at} turn={turn}>
    <group rotation={[0, 0, Math.PI]}>
      <Hero position={[0, 0, 0]} animation="reach" face="scared" />
    </group>
    {splash ? <Splash at={[0, 0.35, 0]} size={0.14} count={9} seed={7} /> : null}
  </Swimmer>
);

export const scene6 = storyScene(timing, {
  id: "scene6",
  title: "Three Buttons",
  shots: [
    {
      cue: "6.morning",
      ...cam.push({ on: [121.1, 0.95, 40.3], dist: 1.1, to: 0.8, yaw: 24, pitch: 24, fov: 38 }),
      zone: "home",
      look: "overworld-day",
      note: "Morning, close: the ring goes onto a finger in his own room. A small, ordinary act — like putting on a watch before a test.",
      stage: () => (
        <>
          <Hero position={[121.1, 0.34, 39.7]} rotationY={0} animation="sit" face="neutral" />
          <Ring position={[121.1, 0.86, 40.05]} rotation={[0.4, 0.3, 0]} scale={1.2} glow={0.5} lit={0} />
        </>
      ),
    },
    {
      cue: "6.luck",
      ...cam.push({ on: [120.9, 1.0, 40.4], dist: 2.6, to: 2.0, yaw: -20, pitch: 6, fov: 38 }),
      zone: "home",
      look: "overworld-day",
      note: "Waist up: he holds the hand out and turns it, the way you check a lucky coin. He still thinks it is a lucky coin.",
      stage: () => (
        <>
          <Hero position={[120.9, 0, 40.4]} rotationY={-0.3} animation="hold" face="happy" ring />
        </>
      ),
    },
    {
      cue: "6.alone",
      ...cam.push({ on: [P - 4, 1.1, 4], dist: 13, to: 15, yaw: 24, pitch: 18, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "The pool with nobody in it: no friend on the deck, no kids at the fence. One red shirt at the gate, all the water to himself.",
      stage: () => (
        <>
          <Hero position={[P - 12.2, 0, 8.6]} rotationY={-1.5} animation="walk" animDistance={0.6} face="worried" />
        </>
      ),
    },
    {
      cue: "6.dive",
      ...cam.push({ on: [P + 1.2, 0.35, 6.4], dist: 4.2, to: 3.4, yaw: 96, pitch: 8, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Side on at the edge, mid-air: he dives in the way a boy dives who has watched one video about it. Splash before the water.",
      stage: (_t, { p }) => (
        <>
          <Hero
            position={[P + 1.2 + p * 0.9, 0.6 - p * 1.1, 5.5]}
            rotationY={-Math.PI / 2}
            animation={p < 0.55 ? "jump" : "fall"}
            face="scared"
            ring
          />
          <Splash at={[P + 1.6, 0.02, 5.2]} size={0.26} count={12} seed={61} />
        </>
      ),
    },
    {
      cue: "6.bonk",
      ...cam.push({ on: [P + 12.1, -0.45, 2], dist: 2.2, to: 1.7, yaw: 178, pitch: 3, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Underwater at the far wall: his head arrives at the tile before the rest of him. The wall is not where it was supposed to be.",
      stage: (_t, { p }) => (
        <>
          <Hero position={travel(p, [P + 9.4, -0.9, 2], [P + 11.8, -0.9, 2])} rotationY={-Math.PI / 2} animation="stagger" face="surprised" ring />
          <Splash at={[P + 12.2, -0.1, 2]} size={0.14} count={6} seed={67} />
        </>
      ),
    },
    {
      cue: "6.side",
      ...cam.push({ on: [P + 11.2, -0.05, 2], dist: 5.6, to: 4.4, yaw: 88, pitch: 7, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "He comes up where the far wall should have been a length away, and the lane behind him is the whole pool. Wide, from the water.",
      stage: () => (
        <>
          <Hero position={[P + 11.2, -0.95, 2]} rotationY={0.4} animation="panic" face="surprised" headYaw={-0.8} />
        </>
      ),
    },
    {
      cue: "6.back",
      ...cam.truck({ on: [P + 6, 0.35, 2], dist: 3.2, yaw: 92, pitch: 12, fov: 40, by: [-4, 0, 0] }),
      zone: "pool",
      look: "overworld-day",
      note: "Travelling the other way as he swims back, and the pool keeps getting shorter under him. The camera has to hurry to keep up.",
      stage: (t) => (
        <Crawling at={[P + 8 - t * 1.8, -0.02, 2]} turn={-Math.PI / 2} splash />
      ),
    },
    {
      cue: "6.bonk2",
      ...cam.push({ on: [P - 12.1, 0.25, 2], dist: 2.6, to: 2.0, yaw: 4, pitch: 4, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "The other wall, the other bonk, from the deck this time: he arrives head first again and the water jumps.",
      stage: () => (
        <>
          <Hero position={[P - 11.7, -0.85, 2]} rotationY={Math.PI / 2} animation="stagger" face="surprised" />
          <Splash at={[P - 12.1, 0.0, 2]} size={0.18} count={8} seed={71} />
        </>
      ),
    },
    {
      cue: "6.same",
      ...cam.push({ on: [P, 0.2, 2], dist: 18, to: 20, yaw: 44, pitch: 28, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "High corner of the whole pool, both walls in frame: the same length crossed in one breath, twice, from above where it looks impossible.",
      stage: () => (
        <>
          <Hero position={[P + 2, -0.9, 2]} rotationY={Math.PI / 2} animation="panic" face="surprised" />
          <Splash at={[P + 2, 0.0, 2]} size={0.12} count={6} seed={73} />
        </>
      ),
    },
    {
      cue: "6.dream",
      ...cam.orbit({ on: [P + 3, 0.55, 7.4], dist: 2.2, yaw: 158, pitch: 13, yawTo: 176, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "Sitting on the tiles with his knees up, an odd low angle from behind: he pinches his own arm to check whether any of this is happening.",
      stage: () => (
        <>
          <Hero position={[P + 3, 0, 7.4]} rotationY={2.2} animation="sit" face="worried" />
        </>
      ),
    },
    {
      cue: "6.hurt",
      ...cam.push({ on: [P + 3, 1.0, 7.4], dist: 2.6, to: 2.0, yaw: -32, pitch: 6, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "He holds his head where it hit. This is the only proof the trick is real, and it is a bruise.",
      stage: () => (
        <>
          <Hero position={[P + 3, 0, 7.4]} rotationY={-0.5} animation="ache" face="sad" headPitch={0.15} />
        </>
      ),
    },
    {
      cue: "6.looked",
      ...cam.push({ on: [P + 3.15, 0.75, 7.55], dist: 2.6, to: 2.0, yaw: 150, pitch: 12, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Over his shoulder to the hand: the ring is doing something. It has a light in it that was not there in the woods.",
      stage: () => (
        <>
          <Hero position={[P + 3, 0, 7.4]} rotationY={0.2} animation="hold" face="surprised" ring />
        </>
      ),
    },
    {
      cue: "6.buttons",
      ...cam.top({ on: [P + 3.42, 0.42, 7.76], height: 0.75, to: 0.55, spin: [-10, 2], fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "Straight down, filling the frame: three little buttons on a gold band around his arm. Red, yellow, green — a toy's idea of power.",
      stage: () => (
        <>
          <Hero position={[P + 3, 0, 7.4]} rotationY={0.4} animation="hold" face="surprised" ring />
        </>
      ),
    },
    {
      cue: "6.medium",
      ...cam.push({ on: [P + 3.5, 0.62, 7.8], dist: 1.5, to: 1.15, yaw: 16, pitch: 18, fov: 36 }),
      zone: "pool",
      look: "overworld-day",
      note: "A finger over the middle button, and the ring glowing under it. 'Max speed. Medium. Low.' — three words, one choice.",
      stage: () => (
        <>
          <Hero position={[P + 3, 0, 7.4]} rotationY={0.4} animation="press" face="worried" ring />
        </>
      ),
    },
    {
      cue: "6.scared",
      ...cam.push({ on: [P + 11.6, 0.45, 2], dist: 4.4, to: 3.4, yaw: 152, pitch: 9, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Medium, and the pool is one stroke long: he stands in the water and the far wall is suddenly close enough to touch. The scale is the scare.",
      stage: () => (
        <>
          <Hero position={[P + 11.4, -0.9, 2]} rotationY={Math.PI / 2} animation="reach" face="scared" />
        </>
      ),
    },
    {
      cue: "6.low",
      ...cam.push({ on: [P + 3.52, 0.6, 7.8], dist: 1.45, to: 1.1, yaw: 22, pitch: 20, fov: 36 }),
      zone: "pool",
      look: "overworld-day",
      note: "The same finger moves one button down, to green. Not because low is clever — because medium was frightening.",
      stage: () => (
        <>
          <Hero position={[P + 3, 0, 7.4]} rotationY={0.4} animation="press" face="sad" ring />
        </>
      ),
    },
    {
      cue: "6.fast",
      ...cam.truck({ on: [P + 2, 0.35, 4.5], dist: 3.0, yaw: 90, pitch: 12, fov: 40, by: [7, 0, 0] }),
      zone: "pool",
      look: "overworld-day",
      note: "Travelling flat out beside him: low, and he is genuinely fast — a long white wake down the lane like a boat with a boy in it.",
      stage: (t) => (
        <Crawling at={[P - 2 + t * 4.6, -0.02, 4.5]} turn={Math.PI / 2} splash />
      ),
    },
    {
      cue: "6.how",
      ...cam.push({ on: [P + 8, 0.2, 4.5], dist: 2.6, to: 2.0, yaw: 138, pitch: 12, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "He stops, standing in the water, and looks at his own hand: the question of the film, asked at arm's length.",
      stage: () => (
        <>
          <Hero position={[P + 8, -0.9, 4.5]} rotationY={-1.9} animation="hold" face="worried" headPitch={0.35} />
        </>
      ),
    },
    {
      cue: "6.shrug",
      ...cam.push({ on: [P + 8, 1.0, 6.4], dist: 2.6, to: 2.0, yaw: 4, pitch: 6, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "On the deck, wet, ring on his hand, shrugging straight into the lens: he does not know, and the film does not tell him.",
      stage: () => (
        <>
          <Hero position={[P + 8, 0, 6.4]} rotationY={0} animation="shrug" face="neutral" ring />
        </>
      ),
    },
  ],
});
