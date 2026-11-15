import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Vox } from "../../engine";
import { CHILD, Hero, PLACE, ROBE, Trophy, Villager, timing } from "./kit";

/**
 * 01 HOOK — the premise, the trophy, and the one thing he cannot do.
 *
 * The town is walking to the water. He is not. The trophy is in the window. He can shower.
 * The water past his toes makes him a worm. And he wants it anyway.
 */

const LENS: Vec3 = [0, 1.66, 5.6];
const ME: Vec3 = [0, 0, 3.1];

/** A tiled shower against the back of the changing hut. */
const Shower: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Vox kind="stoneBrick" tint="#dfe6e4" position={[0, 1.2, -0.7]} size={[2.4, 2.4, 0.2]} />
    <Vox kind="stoneBrick" tint="#cfd8d6" position={[-1.2, 1.2, 0]} size={[0.2, 2.4, 1.6]} />
    <Vox kind="stoneBrick" tint="#e8eeec" position={[0, 0.03, 0]} size={[2.4, 0.06, 1.6]} />
    <Vox kind="stone" tint="#9aa4a8" position={[0, 1.75, -0.55]} size={[0.09, 0.9, 0.09]} />
    <Vox kind="stone" tint="#9aa4a8" position={[0, 2.2, -0.4]} size={[0.09, 0.09, 0.45]} />
    <Vox kind="stone" tint="#9aa4a8" position={[0, 2.14, -0.2]} size={[0.34, 0.14, 0.3]} />
    {/* the water, falling */}
    <mesh position={[0, 0.95, -0.2]}>
      <boxGeometry args={[0.62, 1.9, 0.62]} />
      <meshStandardMaterial color="#bfe9f0" transparent opacity={0.3} roughness={0.1} />
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
      ...cam.push({ on: [0, 1.15, 1.6], dist: 7.0, to: 5.2, yaw: 0, pitch: 5, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "Premise in frame one: the whole town is walking to the water with towels, and one red shirt is standing still, facing away.",
      stage: () => (
        <>
          <Villager position={[-1.6, 0, 1.2]} robe={ROBE.brown} walk={0.9} phase={0.2} />
          <Villager position={[1.5, 0, 1.5]} robe={ROBE.white} walk={0.9} phase={1.1} />
          <Villager position={[2.9, 0, 2.2]} robe={ROBE.farmer} walk={0.8} phase={2.2} lookAt={LENS} />
          <Villager position={[-3.1, 0, 2.4]} robe={ROBE.blue} kid scale={CHILD} walk={1.1} phase={0.7} />
          <Hero position={ME} rotationY={Math.PI} animation="idle" face="neutral" />
        </>
      ),
    },
    {
      cue: "1.trophy",
      ...cam.push({ on: [0.15, 0.82, -3.5], dist: 2.0, to: 1.35, yaw: 6, pitch: 1, fov: 34 }),
      zone: "village",
      look: "overworld-day",
      note: "The prize, at its own height, inside the glass. As big as a kid's head is the next line's joke; show the head-size next to it.",
      stage: () => (
        <>
          <Trophy position={[-0.34, 0.56, -3.5]} scale={0.8} glow={0.5} />
          <Hero position={[0.62, 0, -2.6]} rotationY={Math.PI} animation="peek" face="surprised" headPitch={0.06} />
        </>
      ),
    },
    {
      cue: "1.window",
      ...cam.truck({ on: [0, 2.3, -2.6], dist: 7.2, yaw: 12, pitch: 9, fov: 40, by: [7, 0, 0] }),
      zone: "village",
      look: "overworld-day",
      note: "Travelling shot: slide along the hall front, so the window with the trophy goes past like a fixture of the town, all year.",
      stage: () => (
        <>
          <Villager position={[-2.2, 0, -1.4]} robe={ROBE.farmer} walk={1.2} phase={1.4} />
          <Villager position={[3.4, 0, -1.5]} robe={ROBE.smith} walk={1} phase={0.4} />
          <Hero position={[1.1, 0, -2.2]} rotationY={0.2} animation="idle" face="sad" lookAt={[-0.1, 1.2, -3.5]} />
        </>
      ),
    },
    {
      cue: "1.shower",
      ...cam.orbit({ on: [0, 1.1, 0], dist: 2.5, yaw: -38, pitch: 6, yawTo: -12, fov: 38 }),
      zone: "pool",
      look: "overworld-day",
      note: "He can do this part: water, but from above. The one place water is safe, shown at an odd side angle so it does not look like the pool.",
      stage: () => (
        <>
          <group position={[PLACE.pool[0] - 19, 0, 8]}>
            <Shower at={[0, 0, 0]} />
            <Hero position={[0, 0, 0.05]} rotationY={0} animation="idle" face="happy" headPitch={-0.18} />
          </group>
        </>
      ),
    },
    {
      cue: "1.toes",
      ...cam.push({ on: [PLACE.pool[0] + 1.2, 0.32, 6.05], dist: 2.7, to: 1.7, yaw: 6, pitch: -13, fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Low, at deck height: ten toes on the tile and the water one centimetre away, so 'past my toes' is a physical line, not a feeling.",
      stage: () => (
        <>
          <Hero position={[PLACE.pool[0] + 1.2, 0, 6.35]} rotationY={Math.PI} animation="idle" face="scared" headPitch={-0.22} />
          <Villager position={[PLACE.pool[0] - 2.2, 0, 6.6]} robe={ROBE.white} walk={1.3} phase={0.5} />
        </>
      ),
    },
    {
      cue: "1.worm",
      ...cam.top({ on: [PLACE.pool[0] + 1.2, -1.2, 5.55], height: 4.6, to: 2.7, spin: [-14, 6], fov: 40 }),
      zone: "pool",
      look: "overworld-day",
      note: "Straight down on the wall: fingers hooked on the tile, legs going like a worm under salt. The first of the film's two top-down pool shots.",
      stage: () => (
        <>
          <group position={[PLACE.pool[0] + 1.2, -0.95, 5.66]}>
            <Hero position={[0, 0, 0]} rotationY={0} animation="panic" face="scared" />
          </group>
          <Villager position={[PLACE.pool[0] + 4.2, 0, 6.4]} robe={ROBE.friend} kid scale={CHILD} lookAt={[PLACE.pool[0] + 1.2, 0.2, 5.4]} />
        </>
      ),
    },
    {
      cue: "1.want",
      ...cam.push({ on: [0, 1.02, -3.15], dist: 2.1, to: 1.25, yaw: 0, pitch: 2, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "Over his shoulder at the glass, and the cup on the other side of it. He does not touch it yet. The last shot of the hook is a want.",
      stage: () => (
        <>
          <Hero position={[0, 0, -2.75]} rotationY={Math.PI} animation="peek" face="neutral" headPitch={0.1} />
        </>
      ),
    },
  ],
});
