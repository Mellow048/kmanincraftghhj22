import { Fragment } from "react";
import type React from "react";
import { useActiveShot, useTime } from "./defineFilm";
import { clamp01 } from "./math";
import type { Vec3 } from "./math";
import type { CaptionWord, SceneDef, Shot } from "./types";

/**
 * STORY FILMS — the narration is the clock.
 *
 * In a narrated, fast-cut film nobody types `at: 12.4`. The voice is recorded,
 * `scripts/narration.py` measures when each word is said, and every shot is
 * tied to the words spoken over it (a CUE). Change the script, rebuild the
 * timing, and all 80 cuts move with it.
 *
 *   narration.md  →  audio  →  timing.json  →  storyScene(timing, …)
 */

export type Timing = {
  fps: number;
  /** Whole film, seconds. */
  duration: number;
  /** True when no audio was measured and the times are a words-per-minute guess. */
  estimated?: boolean;
  cues: Array<{ id: string; start: number; end: number; text: string }>;
  words: CaptionWord[];
};

export type StageInfo = {
  /** Length of this shot in seconds. */
  dur: number;
  /** 0 at the cut in, 1 at the cut out. */
  p: number;
};

export type StoryShot = Omit<Shot, "at" | "dur" | "cue"> & {
  /** Id of the narration line this shot is cut to. */
  cue: string;
  /**
   * A cut INSIDE a line. Leave it out and the shot starts with the line. Give seconds (into the line) and this
   * shot takes over from the one before it, which must be on the same cue: an action line can be three or four
   * angles instead of one. `t` in `stage` then counts from this cut, so subtract `cut` from a `wordAt` time.
   */
  cut?: number;
  /**
   * Who and what is in front of the lens for this shot. `t` is seconds since
   * the cut. It is a plain function: do not call hooks in it (return a
   * component that does, if you need one).
   */
  stage?: (t: number, info: StageInfo) => React.ReactNode;
};

export type StorySceneDef = {
  id: string;
  title: string;
  shots: StoryShot[];
  /** Optional: things that stay for the whole scene. */
  Component?: React.FC;
};

function cueOf(timing: Timing, id: string, sceneId: string) {
  const cue = timing.cues.find((c) => c.id === id);
  if (!cue) {
    throw new Error(
      `[${sceneId}] shot cue "${id}" is not in timing.json. Is the line in narration.md, and did you rebuild the timing?`,
    );
  }
  return cue;
}

/** Build an engine scene whose cuts land on narration cues. */
export function storyScene(timing: Timing, def: StorySceneDef): SceneDef {
  if (def.shots.length === 0) throw new Error(`[${def.id}] a story scene needs at least one shot.`);
  const start = cueOf(timing, def.shots[0].cue, def.id).start;

  let cursor = start;
  let previous = "";
  const begins: number[] = def.shots.map((shot) => {
    const cue = cueOf(timing, shot.cue, def.id);
    if (shot.cut !== undefined && shot.cut > 0) {
      if (shot.cue !== previous) throw new Error(`[${def.id}] shot "${shot.cue}" has \`cut\` but the shot before it is on another cue.`);
      if (cue.start + shot.cut >= cue.end) throw new Error(`[${def.id}] shot "${shot.cue}" cuts at ${shot.cut}s, after its line has ended.`);
      return cue.start + shot.cut;
    }
    if (Math.abs(cue.start - cursor) > 1e-3) {
      throw new Error(
        `[${def.id}] cue "${shot.cue}" starts at ${cue.start}s but the previous shot ends at ${cursor.toFixed(3)}s. ` +
          `Shots in a scene must follow narration.md line by line, with none skipped.`,
      );
    }
    cursor = cue.end;
    previous = shot.cue;
    return cue.start;
  });
  const shots: Shot[] = def.shots.map((shot, i) => {
    const cue = cueOf(timing, shot.cue, def.id);
    const next = def.shots[i + 1];
    const end = next && next.cut !== undefined && next.cut > 0 ? begins[i + 1] : cue.end;
    if (end - begins[i] < 0.1) throw new Error(`[${def.id}] shot ${i} on "${shot.cue}" is shorter than a tenth of a second.`);
    const { stage: _stage, cut: _cut, ...camera } = shot;
    return { ...camera, at: begins[i] - start, dur: end - begins[i] };
  });

  const Component: React.FC = () => {
    const t = useTime();
    let index = 0;
    for (let i = 0; i < shots.length; i++) if (shots[i].at <= t + 1e-6) index = i;
    const local = t - shots[index].at;
    const dur = shots[index].dur;
    const stage = def.shots[index].stage;
    return (
      <>
        {def.Component ? <def.Component /> : null}
        {/* The key remounts the stage on every cut, so one shot's state never leaks into the next. */}
        <Fragment key={`${def.shots[index].cue}#${index}`}>{stage ? stage(local, { dur, p: clamp01(local / dur) }) : null}</Fragment>
      </>
    );
  };

  return { id: def.id, title: def.title, duration: cursor - start, shots, Component };
}

/**
 * A part of the world that only exists for some shots. A shot names its zone
 * (`zone: "town"`); every other zone is hidden, lights included, so a film can
 * hold a village, a bedroom and a lava lake without drawing all three.
 * A shot with no zone shows everything. "a+b" shows two zones.
 * `with` lists other zones this one also appears in: a town wall that is seen
 * from the town and from outside it is `<Zone name="wall" with={["town", "lake"]}>`.
 */
export const Zone: React.FC<{ name: string; with?: string[]; children: React.ReactNode }> = ({
  name,
  with: companions = [],
  children,
}) => {
  const active = useActiveShot();
  const zone = active?.shot.zone;
  const on = zone === undefined ? null : zone.split("+");
  const visible = on === null || on.includes(name) || companions.some((other) => on.includes(other));
  return <group visible={visible}>{children}</group>;
};

/**
 * Walk in a straight line during a shot. Spread the result into an avatar:
 *   <Hero {...stride([0,0,0], [0,0,3], p)} animation="walk" />
 * The feet follow the ground because `animDistance` is real metres.
 */
export function stride(a: Vec3, b: Vec3, p: number): { position: Vec3; rotationY: number; animDistance: number } {
  const k = clamp01(p);
  const dx = b[0] - a[0];
  const dz = b[2] - a[2];
  return {
    position: [a[0] + dx * k, a[1] + (b[1] - a[1]) * k, a[2] + dz * k],
    rotationY: Math.atan2(dx, dz),
    animDistance: Math.hypot(dx, dz) * k,
  };
}
