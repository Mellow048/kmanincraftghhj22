import { Vox, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CHILD, Friend, Hero, PLACE, ROBE, SignBoard, Splash, Villager, timing, travel } from "./kit";
import { Player } from "../../../Topics/InThisTown";

/**
 * 02 TRAINING — the water wins, every morning, until the deep end nearly keeps him.
 *
 * The pool is the antagonist: bleach smell, lanes, a wall he can hold, legs that will not float,
 * small kids laughing from the deck, and then the deep end.
 */

const P = PLACE.pool[0];

/** a kid on the deck, laughing down at the water */
const Laughing: React.FC<{ at: Vec3; who: number; turn?: number }> = ({ at, who, turn = 0 }) => (
  <Player who={who} position={at} rotationY={turn} scale={CHILD} animation="laugh" face="happy" blink />
);

export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Training",
  shots: [
    {
      cue: "2.smell",
      ...cam.truck({ on: [P - 4, 1.25, 12], dist: 5.6, yaw: 20, pitch: 8, fov: 40, by: [2.6, 0, 0] }),
      zone: "pool",
      look: "overworld-day",
      note: "Travelling: walk him in through the gate with a bucket of chlorine in frame and other kids running past. Two smells in one picture.",
      stage: (t) => (
        <>
          <Hero position={[P - 4.4 + t * 1.7, 0, 12]} rotationY={Math.PI / 2} animation="walk" animDistance={t * 1.7} face="worried" />
          <Villager position={[P - 1.2, 0, 13.4]} robe={ROBE.white} walk={1.6} phase={0.4} />
          <Villager position={[P + 2.6, 0, 11.6]} robe={ROBE.friend} walk={1.4} phase={1.7} kid scale={CHILD} />
          <group position={[P - 7.6, 0, 12.6]}>
            <Vox kind="wool" tint="#e6e2d4" position={[0, 0.2, 0]} size={[0.5, 0.4, 0.5]} />
            <Vox kind="wool" tint="#7fd4a0" position={[0, 0.42, 0]} size={[0.42, 0.06, 0.42]} />
          </group>
        </>
      ),
    },
    {
      cue: "2.everyday",
      ...cam.push({ on: [P + 8, 0.8, 0], dist: 12, to: 14, yaw: 96, pitch: 6, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Pull out across the empty morning pool to him arriving at the far corner: a small daily ritual, and the water enormous.",
      stage: () => (
        <>
          <Hero position={[P - 13.7, 0, 0]} rotationY={Math.PI / 2} animation="walk" animDistance={0.9} face="neutral" />
          <Villager position={[P - 9, 0, -8]} robe={ROBE.brown} walk={0.8} phase={0.9} />
        </>
      ),
    },
    {
      cue: "2.hold",
      ...cam.push({ on: [P + 0.4, 0.05, 5.95], dist: 1.75, to: 1.35, yaw: 6, pitch: 8, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "On the water line, at the wall: ten fingers hooked over the tile. The one thing he can do is hold on.",
      stage: () => (
        <>
          <Hero position={[P + 0.4, -0.95, 5.72]} rotationY={0} animation="hold" face="worried" />
          <Splash at={[P + 0.4, 0.02, 5.9]} size={0.1} count={5} seed={3} />
        </>
      ),
    },
    {
      cue: "2.kick",
      ...cam.push({ on: [P + 0.4, -1.1, 4.6], dist: 3.4, to: 2.6, yaw: 200, pitch: 8, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "Under the surface, behind him: legs going nowhere against blue tile. The water is a room with a ceiling.",
      stage: () => (
        <>
          <Hero position={[P + 0.4, -0.95, 5.72]} rotationY={0} animation="panic" face="scared" />
          <Splash at={[P + 0.1, 0.0, 5.4]} size={0.12} count={6} seed={8} />
        </>
      ),
    },
    {
      cue: "2.sink",
      ...cam.push({ on: [P + 0.9, 0.1, 5.2], dist: 4.4, to: 3.4, yaw: 100, pitch: 6, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Side on, water line through the frame: head above, legs already two stones going down. Show the split, not the feeling.",
      stage: () => (
        <>
          <Hero position={[P + 0.9, -1.35, 5.5]} rotationY={0.4} animation="fall" face="scared" />
        </>
      ),
    },
    {
      cue: "2.laugh",
      ...cam.push({ on: [P - 0.2, 0.75, 7.3], dist: 3.4, to: 2.7, yaw: 175, pitch: -14, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "From the water, looking up at the deck: three little kids laughing down at him. The camera is the one being laughed at.",
      stage: () => (
        <>
          <Laughing at={[P - 1.5, 0, 7.4]} who={7} turn={Math.PI} />
          <Laughing at={[P - 0.1, 0, 7.9]} who={4} turn={Math.PI + 0.3} />
          <Laughing at={[P + 1.4, 0, 7.5]} who={10} turn={Math.PI - 0.2} />
          <Hero position={[P - 0.4, -1.0, 5.9]} rotationY={Math.PI} animation="hold" face="sad" />
        </>
      ),
    },
    {
      cue: "2.deep",
      ...cam.push({ on: [P + 11, 0.4, 0], dist: 11, to: 9, yaw: -80, pitch: 10, fov: 44 }),
      zone: "pool",
      look: "overworld-day",
      note: "The deep end as a place: the far half of the pool, a depth sign on the wall, and him tiny at its edge.",
      stage: (_t, { p }) => (
        <>
          <Hero
            position={travel(p, [P + 11.4, 0, 2.6], [P + 13.9, 0, 1.4])}
            rotationY={1.1}
            animation={p < 0.9 ? "walk" : "idle"}
            animDistance={p * 1.8}
            face="scared"
          />
          <SignBoard
            at={[P + 14.4, 0, -2.6]}
            width={3.2}
            height={1.5}
            rotationY={-Math.PI / 2}
            lines={[{ text: "DEEP END", height: 0.4 }, { text: "3.5 m", height: 0.5, color: "#a83c2a" }]}
          />
        </>
      ),
    },
    {
      cue: "2.down",
      ...cam.push({ on: [P + 3.4, 0.2, 2.2], dist: 2.2, to: 1.7, yaw: 200, pitch: -48, fov: 46 }),
      zone: "pool",
      look: "overworld-day",
      note: "From under the water looking up: his head is a dark shape on a bright ceiling that keeps moving away.",
      stage: () => (
        <>
          <Hero position={[P + 3.4, -0.55, 2.2]} animation="panic" face="scared" />
          <Splash at={[P + 3.4, 0.0, 2.2]} size={0.14} count={8} seed={12} />
        </>
      ),
    },
    {
      cue: "2.arms",
      ...cam.top({ on: [P + 3.4, -0.1, 2.2], height: 3.4, to: 2.0, spin: [-16, 6], fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Straight down: two arms reaching for a surface that is not where it was. The lane rope is the only straight line left.",
      stage: () => (
        <>
          <Hero position={[P + 3.4, -1.1, 2.2]} animation="reachUp" face="scared" />
        </>
      ),
    },
    {
      cue: "2.hand",
      ...cam.orbit({ on: [P + 4.0, 0.35, 2.5], dist: 3.6, yaw: 138, pitch: 30, yawTo: 156, distTo: 3.0, pitchTo: 26, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "A close two-shot in the water: one hand comes in from the side and closes on his arm. No face, just the grab.",
      stage: (_t, { p }) => (
        <>
          <Hero position={[P + 3.5, -0.62, 2.3]} rotationY={0.9} animation="panic" face="scared" />
          <Friend
            position={travel(p, [P + 7.6, -0.5, 4.4], [P + 4.55, -0.5, 2.8])}
            rotationY={-2.2}
            animation={p < 0.9 ? "reach" : "hold"}
            face="worried"
            scale={1.0}
          />
          <Splash at={[P + 4.2, 0.0, 2.7]} size={0.13} count={7} seed={21} />
        </>
      ),
    },
    {
      cue: "2.friend",
      ...cam.push({ on: [P + 1.9, 0.55, 7.2], dist: 3.8, to: 4.8, yaw: 92, pitch: 8, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "Out on the tiles, from deck height: the friend hauls him up by the arm and both of them end up sitting, wet, on white tile.",
      stage: (_t, { p }) => (
        <>
          <Hero
            position={travel(p, [P + 2.2, -0.7, 6.15], [P + 1.9, 0, 7.25])}
            rotationY={-1.2}
            animation={p < 0.9 ? "stagger" : "sit"}
            face="sad"
          />
          <Friend
            position={travel(p, [P + 1.5, -0.55, 5.9], [P + 0.7, 0, 7.4])}
            rotationY={1.0}
            animation={p < 0.9 ? "hold" : "standUp"}
            face="worried"
          />
          <Splash at={[P + 1.4, 0.05, 6.2]} size={0.11} count={6} seed={31} />
        </>
      ),
    },
    {
      cue: "2.breath",
      ...cam.orbit({ on: [P + 2.1, 0.6, 7.2], dist: 2.4, yaw: -40, pitch: 10, yawTo: -18, fov: 36 }),
      zone: "pool",
      look: "overworld-day",
      note: "Low and tilted, at his head height: on hands and knees, coughing water onto his own hands. No line of dialogue is as wet as this shot.",
      stage: () => (
        <>
          <Hero position={[P + 2.1, 0, 7.2]} rotationY={0.6} animation="cower" face="scared" />
        </>
      ),
    },
    {
      cue: "2.days",
      ...cam.push({ on: [P - 8.5, 1.3, 11.5], dist: 6.0, to: 5.0, yaw: 96, pitch: 5, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "The poster on the gate, and three chalk marks: the race is Saturday. A clock we can see, not a feeling.",
      stage: () => (
        <>
          <SignBoard
            at={[P - 8.5, 0.9, 11.5]}
            rotationY={Math.PI / 2}
            width={3.6}
            height={2.2}
            tint="#f0e6cc"
            lines={[
              { text: "SWIM RACE", height: 0.36 },
              { text: "SATURDAY", height: 0.34, color: "#a83c2a" },
              { text: "3 DAYS", height: 0.46, color: "#3c5a66" },
            ]}
          />
          <Hero position={[P - 8.5, 0, 13.4]} rotationY={-1.9} animation="idle" face="sad" />
        </>
      ),
    },
  ],
});
