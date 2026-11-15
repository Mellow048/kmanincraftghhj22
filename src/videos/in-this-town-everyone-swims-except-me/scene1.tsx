import { Vox, cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CHILD, Hero, PLACE, ROBE, Trophy, Villager, timing, travel } from "./kit";
import { Player } from "../../../Topics/InThisTown";

/**
 * 01 HOOK — the premise, the trophy, and the one thing he cannot do.
 *
 * The town is walking to the water. He is not. The trophy is in the window. He can shower.
 * The water past his toes makes him a worm. And he wants it anyway.
 *
 * Framing, measured on this lens (portrait 9:16, fov 40 sees 23° across, 40° up):
 *   the whole street   dist 16  pitch 16
 *   a pool's length    dist 12  pitch 6
 *   waist up           dist 2.6 pitch 6
 *   hands / a cup      dist 1.8 pitch 3
 *   pitch is POSITIVE when the camera is ABOVE the thing it looks at.
 */

const P = PLACE.pool[0];

/** A tiled shower against the back of the changing hut. */
const Shower: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Vox kind="stoneBrick" tint="#dfe6e4" position={[0, 1.2, -0.7]} size={[2.4, 2.4, 0.2]} />
    <Vox kind="stoneBrick" tint="#cfd8d6" position={[-1.2, 1.2, 0]} size={[0.2, 2.4, 1.6]} />
    <Vox kind="stoneBrick" tint="#e8eeec" position={[0, 0.03, 0]} size={[2.4, 0.06, 1.6]} />
    <Vox kind="stone" tint="#9aa4a8" position={[0, 1.75, -0.55]} size={[0.09, 0.9, 0.09]} />
    <Vox kind="stone" tint="#9aa4a8" position={[0, 2.2, -0.4]} size={[0.09, 0.09, 0.45]} />
    <Vox kind="stone" tint="#9aa4a8" position={[0, 2.14, -0.2]} size={[0.34, 0.14, 0.3]} />
    <mesh position={[0, 0.95, -0.2]}>
      <boxGeometry args={[0.62, 1.9, 0.62]} />
      <meshStandardMaterial color="#bfe9f0" transparent opacity={0.28} roughness={0.1} />
    </mesh>
    <mesh position={[0, 0.02, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.9, 24]} />
      <meshStandardMaterial color="#9fd8e4" transparent opacity={0.4} roughness={0.1} />
    </mesh>
  </group>
);

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.race",
      ...cam.push({ on: [1, 1.0, 0.2], dist: 16, to: 13, yaw: 58, pitch: 16, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "The whole street from above, and the whole town walking one way with towels. One red shirt is not walking. Premise in frame one.",
      stage: (t) => (
        <>
          <Villager position={[-4 + t * 1.1, 0, -1.2]} rotationY={Math.PI / 2} robe={ROBE.brown} walk={t * 1.1} phase={0.2} />
          <Villager position={[-1.4 + t * 0.9, 0, 0.4]} rotationY={Math.PI / 2} robe={ROBE.white} walk={t * 0.9} phase={1.1} />
          <Villager position={[2.6 + t * 1.2, 0, -0.8]} rotationY={Math.PI / 2} robe={ROBE.farmer} walk={t * 1.2} phase={2.2} />
          <Villager position={[0.8 + t * 1.4, 0, 1.8]} rotationY={Math.PI / 2} robe={ROBE.blue} kid scale={CHILD} walk={t * 1.4} phase={0.7} />
          <Villager position={[4.6 + t * 0.6, 0, 2.4]} rotationY={Math.PI / 2} robe={ROBE.smith} walk={t * 0.6} phase={3.1} />
          <Hero position={[0.9, 0, 2.6]} rotationY={-2.4} animation="idle" face="neutral" />
          <Player who={9} position={[6.4, 0, 1.2]} rotationY={-1.8} scale={CHILD} animation="walk" animDistance={t * 0.4} />
        </>
      ),
    },
    {
      cue: "1.trophy",
      ...cam.push({ on: [-0.3, 0.95, -3.45], dist: 2.7, to: 2.1, yaw: 6, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "The prize at its own height, in the glass. There is a boy's shoulder at the edge of the frame, for scale: it is as big as his head.",
      stage: () => (
        <>
          <Hero position={[1.25, 0, -2.35]} rotationY={Math.PI + 0.25} animation="peek" face="surprised" headPitch={0.08} />
        </>
      ),
    },
    {
      cue: "1.window",
      ...cam.truck({ on: [-1.2, 2.2, -3.3], dist: 10.5, yaw: 34, pitch: 12, fov: 42, by: [4.5, 0, 0] }),
      zone: "village",
      look: "overworld-day",
      note: "Travelling along the front of the hall: the window with the cup in it goes past like a fixture, there all year, above everyone's heads.",
      stage: (t) => (
        <>
          <Villager position={[-2.6 + t * 1.5, 0, -1.0]} rotationY={Math.PI / 2} robe={ROBE.farmer} walk={t * 1.5} phase={1.4} />
          <Villager position={[3.2 + t * 1.2, 0, -1.4]} rotationY={Math.PI / 2} robe={ROBE.smith} walk={t * 1.2} phase={0.4} />
          <Hero position={[2.9 - t * 1.5, 0, -1.6]} rotationY={0.38} animation="walk" animDistance={t * 1.5} face="sad" lookAt={[-0.34, 1.1, -3.4]} />
        </>
      ),
    },
    {
      cue: "1.shower",
      ...cam.orbit({ on: [P - 17.5, 1.05, 13.7], dist: 3.0, yaw: 26, pitch: 8, yawTo: 10, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "He can do this part. Water, from above, on his own terms — and the only place in the film water is safe. An odd angle, half behind the wall.",
      stage: () => (
        <>
          <Shower at={[P - 17.5, 0, 14.0]} />
          <Hero position={[P - 17.5, 0, 13.6]} rotationY={0} animation="idle" face="happy" headPitch={-0.2} />
        </>
      ),
    },
    {
      cue: "1.toes",
      ...cam.push({ on: [P + 1.2, 0.85, 5.98], dist: 6.4, to: 5.4, yaw: 172, pitch: 12, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "From above and behind: ten toes on the tile, the water one centimetre past them. The line in the sand is a line of tile.",
      stage: (t, { p }) => (
        <>
          <Hero
            position={travel(p, [P + 1.1, 0, 8.1], [P + 1.2, 0, 6.12])}
            rotationY={Math.PI}
            animation={p < 0.85 ? "walk" : "idle"}
            animDistance={p * 2}
            face="scared"
            headPitch={-0.26}
          />
          <Villager position={[P - 3.2 + t * 0.9, 0, 6.6]} rotationY={Math.PI / 2} robe={ROBE.white} walk={t * 0.9} phase={0.5} />
        </>
      ),
    },
    {
      cue: "1.worm",
      ...cam.push({ on: [P + 1.2, 0.32, 5.7], dist: 5.0, to: 4.2, yaw: 104, pitch: 16, fov: 42 }),
      zone: "pool",
      look: "overworld-day",
      note: "On the water line at the wall: fingers hooked on the tile, the rest of him going like a worm under salt.",
      stage: () => (
        <>
          <Hero position={[P + 1.2, -0.95, 5.7]} rotationY={0} animation="panic" face="scared" />
          <Villager position={[P + 4.6, 0, 6.4]} robe={ROBE.friend} kid scale={CHILD} lookAt={[P + 1.2, 0.2, 5.4]} />
        </>
      ),
    },
    {
      cue: "1.want",
      ...cam.push({ on: [0, 1.15, -3.35], dist: 2.6, to: 1.9, yaw: -10, pitch: 5, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "Over his shoulder at the glass and the cup behind it. He does not touch it. The last shot of the hook is a want, not a plan.",
      stage: () => (
        <>
          <Hero position={[0.5, 0, -2.45]} rotationY={Math.PI - 0.1} animation="peek" face="neutral" headPitch={0.12} />
        </>
      ),
    },
  ],
});
