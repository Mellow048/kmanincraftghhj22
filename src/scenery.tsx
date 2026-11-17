import type React from "react";
import { Block, Clouds, Glow, LightPool, Tree, Vox, cam, defineFilm, storyScene } from "./engine";
import { Hut } from "../Topics/InThisTown";

/**
 * SCENERY — a shader test bench, not a film.
 *
 * One meadow with a cottage, three trees and a stone path, shot wide, medium and
 * close. Rendered as stills to judge the look: sky gradient, sun, bloom, grade.
 * It lives outside src/videos on purpose, so `npm run check` does not ask it for
 * narration or cues.
 */

const World: React.FC = () => (
  <>
    {/* Meadow: 60 x 40 blocks, ground at y = 0. */}
    <Vox kind="grass" position={[0, -0.5, 0]} size={[60, 1, 40]} />

    {/* A dirt path curving in from the camera to the cottage door. */}
    <Vox kind="path" position={[0, 0.02, 6]} size={[3.2, 0.06, 14]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[6, 0.06, 3]} />

    {/* The cottage, sitting deep in the frame so the sky has room above it. */}
    <Hut at={[0, 0, -8]} w={7} d={6} h={3.2} wall="planks" windows={[0, 1]} door={0} turn={0} />

    {/* A little cluster of flowers and shrubs at the doorstep. */}
    <Vox kind="leaves" position={[-3.2, 0.35, -4.6]} size={[1.4, 0.7, 1.2]} />
    <Vox kind="leaves" position={[3.4, 0.3, -4.4]} size={[1.1, 0.6, 1.0]} />
    <Block position={[2.6, 0.12, -3.4]} size={[0.3, 0.24, 0.3]} color="#c8483a" castShadow={false} />
    <Block position={[-2.4, 0.12, -3.1]} size={[0.3, 0.24, 0.3]} color="#e0c040" castShadow={false} />

    {/* Three oaks, placed so they frame the cottage rather than hide it. */}
    <Tree position={[-7, 0, -2]} height={7} />
    <Tree position={[8, 0, -4]} height={8} />
    <Tree position={[-12, 0, 4]} height={6} />

    {/* A lamp post east of the door, for a warm practical in the dusk shot. */}
    <Vox kind="planks" position={[2.6, 1.6, -3.6]} size={[0.24, 3.2, 0.24]} />
    <Glow position={[2.6, 3.3, -3.6]} size={1.1} color="#ffca7a" opacity={0.75} />
    <LightPool position={[2.6, 0.04, -3.6]} width={5} depth={5} color="#ffb45e" opacity={0.3} />
    <pointLight position={[2.6, 3.2, -3.6]} color="#ffb066" intensity={7} distance={11} decay={2} />

    <Clouds y={38} span={110} opacity={0.9} />
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
      ...cam.push({ on: [0, 1.4, -1.5], dist: 12.5, to: 12, yaw: 0, pitch: 9, fov: 46 }),
      note: "Wide: the whole meadow, the cottage small against the sky.",
      stage: () => null,
    },
    {
      cue: "scenery.medium",
      ...cam.push({ on: [0, 1.35, -3.5], dist: 7.2, to: 6.6, yaw: 0, pitch: 7, fov: 44 }),
      note: "Medium: the cottage and the path, sky still above the roof.",
      stage: () => null,
    },
    {
      cue: "scenery.close",
      ...cam.push({ on: [0.4, 1.3, -3.0], dist: 4.2, to: 3.6, yaw: 8, pitch: 4, fov: 42 }),
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
  post: { shaders: true },
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
  post: { shaders: true },
  World,
  scenes: [SCENE],
});

export const SCENERY = [sceneryDay, scenerySunset, sceneryNight];
