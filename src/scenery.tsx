import type React from "react";
import { Block, Glow, LightPool, Vox, cam, defineFilm, storyScene } from "./engine";
import { Hut } from "../Topics/InThisTown";

/**
 * SCENERY — a shader test bench, not a film.
 *
 * One meadow with a cottage, three trees and a stone path, shot wide, medium and
 * close. Rendered as stills to judge the look: sky gradient, sun, bloom, grade.
 * It lives outside src/videos on purpose, so `npm run check` does not ask it for
 * narration or cues.
 */

/** An oak: a planks trunk and a blocky canopy. */
const Oak: React.FC<{ at: [number, number, number]; height: number }> = ({ at, height }) => (
  <group position={at}>
    <Vox kind="planks" position={[0, height / 2, 0]} size={[0.7, height, 0.7]} />
    <Vox kind="leaves" position={[0, height + 0.6, 0]} size={[3.4, 2.2, 3.4]} />
    <Vox kind="leaves" position={[0, height + 2.1, 0]} size={[2.2, 1.6, 2.2]} />
  </group>
);

const World: React.FC = () => (
  <>
    {/* Meadow: 60 x 40 blocks, ground at y = 0. */}
    <Vox kind="grass" position={[0, -0.5, 0]} size={[60, 1, 40]} />

    {/* A dirt path curving in from the camera to the cottage door. */}
    <Vox kind="path" position={[0, 0.02, 2.2]} size={[2.6, 0.06, 9]} />
    <Vox kind="path" position={[0, 0.021, -3.2]} size={[6.4, 0.06, 3]} />

    {/* The cottage, sitting deep in the frame so the sky has room above it. */}
    <Hut at={[0, 0, -8]} w={7} d={6} h={3.2} wall="planks" windows={[0, 1]} door={0} turn={0} />

    {/* A little cluster of flowers and shrubs at the doorstep. */}
    <Vox kind="leaves" position={[-3.2, 0.35, -4.6]} size={[1.4, 0.7, 1.2]} />
    <Vox kind="leaves" position={[3.4, 0.3, -4.4]} size={[1.1, 0.6, 1.0]} />
    <Block position={[2.6, 0.12, -3.4]} size={[0.3, 0.24, 0.3]} color="#c8483a" castShadow={false} />
    <Block position={[-2.4, 0.12, -3.1]} size={[0.3, 0.24, 0.3]} color="#e0c040" castShadow={false} />

    {/* Three oaks, built from blocks so they cannot go missing. */}
    <Oak at={[-8.6, 0, -7]} height={7.5} />
    <Oak at={[7.2, 0, -5]} height={8} />
    <Oak at={[-11.5, 0, -10]} height={9} />

    {/* Flowers in the grass, so the meadow is not a lawn. */}
    {[[-2.1, -2.2], [1.9, -1.6], [-4.2, -2.6], [3.6, -3.2], [-1.2, -1.2], [5.1, -2.0]].map(([x, z], i) => (
      <Block
        key={i}
        position={[x, 0.12, z]}
        size={[0.16, 0.16, 0.16]}
        color={["#c8483a", "#e0c040", "#7a5fd0", "#e07a40"][i % 4]}
        castShadow={false}
      />
    ))}

    {/* A lamp post east of the door, for a warm practical in the dusk shot. */}
    <Vox kind="planks" position={[2.6, 1.6, -3.6]} size={[0.24, 3.2, 0.24]} />
    <Glow position={[2.6, 3.3, -3.6]} size={1.1} color="#ffca7a" opacity={0.75} />
    <LightPool position={[2.6, 0.04, -3.6]} width={5} depth={5} color="#ffb45e" opacity={0.3} />
    <pointLight position={[2.6, 3.2, -3.6]} color="#ffb066" intensity={7} distance={11} decay={2} />

  </>
);

/** Three three-second beats. The cues are placeholders: this bench has no narration. */
const TIMING = {
  fps: 30,
  duration: 9,
  cues: [
    { id: "scenery.wide", start: 0, end: 3, text: "" },
    { id: "scenery.medium", start: 3, end: 6, text: "" },
    { id: "scenery.close", start: 6, end: 9, text: "" },
  ],
  words: [],
};

const SCENE = storyScene(TIMING, {
  id: "scenery",
  title: "Meadow and cottage",
  shots: [
    {
      cue: "scenery.wide",
      ...cam.push({ on: [-1.0, 2.6, -4.5], dist: 15.5, to: 15, yaw: -6, pitch: 11, fov: 58 }),
      note: "Wide: the whole meadow, the cottage small against the sky.",
      stage: () => null,
    },
    {
      cue: "scenery.medium",
      ...cam.push({ on: [-0.8, 1.9, -3.8], dist: 8.2, to: 7.6, yaw: -7, pitch: 10, fov: 50 }),
      note: "Medium: the cottage and the path, sky still above the roof.",
      stage: () => null,
    },
    {
      cue: "scenery.close",
      ...cam.push({ on: [0.9, 1.5, -4.2], dist: 3.4, to: 3.0, yaw: 10, pitch: 5, fov: 42 }),
      note: "Close: the door and the flowers, to check texture and shadow detail.",
      stage: () => null,
    },
  ],
});

export const sceneryDay = defineFilm({
  id: "scenery-day",
  title: "Scenery — Noon",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "overworld-day",
  post: { shaders: true },
  World,
  scenes: [SCENE],
});

export const scenerySunset = defineFilm({
  id: "scenery-sunset",
  title: "Scenery — Sunset",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "overworld-sunset",
  // The sunset look is already orange, so the grade only has to finish it, not start it.
  post: { shaders: { warmth: 0.45, saturation: 1.25, shafts: 0.5 } },
  World,
  scenes: [SCENE],
});

export const sceneryNight = defineFilm({
  id: "scenery-night",
  title: "Scenery — Lantern Night",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "lantern-night",
  // A night sky has no sun to bloom, so the threshold drops to where the lanterns live.
  post: { shaders: { bloom: 0.7, threshold: 1.02, warmth: 0.55, lift: 0.035, shafts: 0 } },
  World,
  scenes: [SCENE],
});

export const SCENERY = [sceneryDay, scenerySunset, sceneryNight];
