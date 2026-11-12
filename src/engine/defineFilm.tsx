import { createContext, useContext, useMemo } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { Camera } from "./Camera";
import { GlowProvider, Look } from "./Look";
import type { FilmConfig, SceneDef } from "./types";
import { clamp01 } from "./math";

type SceneInfo = { id: string; title: string; index: number; duration: number; elapsed: number };

const SceneContext = createContext<SceneInfo | null>(null);

/** Seconds since the start of the current scene. */
export function useTime(): number {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
}

/** Seconds since the start of the whole film. Only valid outside a <Sequence>. */
export function useFilmTime(): number {
  return useTime();
}

/** Info about the current beat. */
export function useScene(): SceneInfo {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useScene() must be called inside a scene component.");
  return ctx;
}

export const SceneMount: React.FC<{ def: SceneDef; index: number }> = ({ def, index }) => {
  const elapsed = useTime();
  return (
    <SceneContext.Provider value={{ id: def.id, title: def.title, index, duration: def.duration, elapsed }}>
      <Camera shots={def.shots} duration={def.duration} sceneId={def.id} />
      <def.Component />
    </SceneContext.Provider>
  );
};

/** Identity helper that gives scene files autocomplete and catches typos early. */
export function defineScene(def: SceneDef): SceneDef {
  return def;
}

const Fade: React.FC<{ fadeIn?: number; fadeOut?: number; total: number }> = ({ fadeIn = 0, fadeOut = 0, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const inAlpha = fadeIn > 0 ? 1 - clamp01(t / fadeIn) : 0;
  const outAlpha = fadeOut > 0 ? clamp01((t - (total - fadeOut)) / fadeOut) : 0;
  const alpha = Math.max(inAlpha, outAlpha);
  if (alpha <= 0) return null;
  return <AbsoluteFill style={{ backgroundColor: "#000", opacity: alpha, pointerEvents: "none" }} />;
};

const FilmView: React.FC<{ config: FilmConfig }> = ({ config }) => {
  const { fps, width, height } = useVideoConfig();
  const audioTracks = config.audio ? (Array.isArray(config.audio) ? config.audio : [config.audio]) : [];

  // Lay the scenes out in FRAMES, not seconds. Rounding each scene's start and
  // length independently can leave a one-frame gap or overlap between scenes
  // (scene N ends on frame 101, scene N+1 starts on frame 102). Accumulating
  // frames keeps every scene butt-joined to the previous one.
  const sequences = useMemo(() => {
    let cursorFrames = 0;
    return config.scenes.map((scene, index) => {
      const from = cursorFrames;
      const durationInFrames = Math.max(1, Math.round(scene.duration * fps));
      cursorFrames += durationInFrames;
      return { scene, index, from, durationInFrames };
    });
  }, [config.scenes, fps]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <ThreeCanvas
        width={width}
        height={height}
        shadows
        dpr={1}
        camera={{
          fov: 38,
          near: 0.05,
          far: 200,
          position: [0, 1.5, 5],
        }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <GlowProvider value={config.post?.bloom ?? 1}>
          <Look preset={config.look} post={config.post} />
          {config.World ? <config.World /> : null}

          {sequences.map(({ scene, index, from, durationInFrames }) => (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={durationInFrames}
            layout="none"
            name={`${scene.id} · ${scene.title}`}
          >
              <SceneMount def={scene} index={index} />
            </Sequence>
          ))}
        </GlowProvider>
      </ThreeCanvas>

      {audioTracks.map((track, i) => (
        <Sequence
          key={`audio-${i}-${track.src}`}
          from={Math.max(0, Math.round((track.at ?? 0) * fps))}
          layout="none"
          name={`audio · ${track.src}`}
        >
          <Audio src={staticFile(track.src)} volume={track.volume ?? 1} />
        </Sequence>
      ))}

      <Fade fadeIn={config.fadeIn} fadeOut={config.fadeOut} total={config.scenes.reduce((a, s) => a + s.duration, 0)} />
    </AbsoluteFill>
  );
};

export type Film = FilmConfig & {
  Component: React.FC;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  totalSeconds: number;
};

/**
 * Turns a film config into a Remotion composition. One film = one folder =
 * one MP4. The folder name should be the slug of the title.
 */
export function defineFilm(config: FilmConfig): Film {
  const fps = config.fps ?? 30;
  const width = config.width ?? 1080;
  const height = config.height ?? 1920;

  if (!config.id.match(/^[a-z0-9]+(-[a-z0-9]+)*$/)) {
    throw new Error(`Film id "${config.id}" must be kebab-case, e.g. "the-schedule".`);
  }
  if (config.scenes.length === 0) throw new Error("A film needs at least one scene.");

  const ids = new Set<string>();
  for (const scene of config.scenes) {
    if (ids.has(scene.id)) throw new Error(`Duplicate scene id "${scene.id}".`);
    ids.add(scene.id);
    if (scene.duration <= 0) throw new Error(`Scene "${scene.id}" needs a positive duration.`);
    if (scene.shots.length === 0) throw new Error(`Scene "${scene.id}" has no shots.`);
    for (const shot of scene.shots) {
      if (!shot.note) throw new Error(`A shot in "${scene.id}" is missing its storytelling note.`);
    }
  }

  const totalSeconds = config.scenes.reduce((a, s) => a + s.duration, 0);
  const durationInFrames = Math.max(1, Math.round(totalSeconds * fps));

  const Component: React.FC = () => <FilmView config={config} />;

  return { ...config, fps, width, height, totalSeconds, durationInFrames, Component };
}
