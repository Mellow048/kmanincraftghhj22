import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const sha1 = (buf) => crypto.createHash("sha1").update(buf).digest("hex");
const textSha1 = (str) => sha1(Buffer.from(str.replace(/\r\n/g, "\n").trim(), "utf8"));

/**
 * Create an isolated temp workspace mirroring `src/engine`, `Topics`, `node_modules`, and `scripts`
 * without ever modifying the real repository.
 */
export function createTempWorkspace(repoRoot, { prefix = "e2e-ws-", copyScripts = true } = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  fs.mkdirSync(path.join(dir, "src", "videos"), { recursive: true });
  fs.mkdirSync(path.join(dir, "public", "audio"), { recursive: true });
  fs.mkdirSync(path.join(dir, "Topics"), { recursive: true });
  fs.mkdirSync(path.join(dir, "scripts"), { recursive: true });

  fs.symlinkSync(path.join(repoRoot, "src", "engine"), path.join(dir, "src", "engine"), "dir");
  fs.symlinkSync(path.join(repoRoot, "node_modules"), path.join(dir, "node_modules"), "dir");

  for (const entry of fs.readdirSync(path.join(repoRoot, "Topics"), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const srcTopic = path.join(repoRoot, "Topics", entry.name);
    const dstTopic = path.join(dir, "Topics", entry.name);
    fs.mkdirSync(dstTopic, { recursive: true });
    for (const f of fs.readdirSync(srcTopic)) {
      const full = path.join(srcTopic, f);
      const isDir = fs.statSync(full).isDirectory();
      fs.symlinkSync(full, path.join(dstTopic, f), isDir ? "dir" : "file");
    }
  }

  if (copyScripts) {
    for (const name of fs.readdirSync(path.join(repoRoot, "scripts"))) {
      const srcScript = path.join(repoRoot, "scripts", name);
      if (fs.statSync(srcScript).isFile()) {
        fs.copyFileSync(srcScript, path.join(dir, "scripts", name));
      }
    }
  }

  return {
    root: dir,
    cleanup() {
      fs.rmSync(dir, { recursive: true, force: true });
    },
  };
}

/**
 * Generate a minimal valid synthetic speech-like WAV or MP3 using ffmpeg.
 */
export function synthToneAudio(outPath, { duration = 2.0, freq = 220, format = "mp3" } = {}) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const args = [
    "-y",
    "-v", "error",
    "-f", "lavfi",
    "-i", `sine=frequency=${freq}:sample_rate=44100:duration=${duration}`,
  ];
  if (format === "wav") {
    args.push("-c:a", "pcm_s16le", outPath);
  } else {
    args.push("-b:a", "128k", outPath);
  }
  execFileSync("ffmpeg", args, { stdio: "pipe" });
}

/**
 * Build a complete synthetic aligned story film in `wsRoot` that passes `rehearse --final`
 * and optionally `check-story-film` / `sound.lock.json` checks.
 */
export function writeSyntheticStoryFilm(
  wsRoot,
  slug,
  {
    estimated = false,
    missingAudio = false,
    corruptLock = false,
    staleSoundJson = false,
    include2DOverlay = false,
    includeSoundLock = true,
    shadersEnabled = true,
    topic = "in-this-town",
    cut = "short",
  } = {},
) {
  const filmDir = path.join(wsRoot, "src", "videos", slug);
  const audioDir = path.join(wsRoot, "public", "audio", slug);
  fs.mkdirSync(filmDir, { recursive: true });
  fs.mkdirSync(audioDir, { recursive: true });

  const cues = [
    { id: "1.hook", start: 0, end: 1.5, text: "In this town we walk." },
    { id: "2.end", start: 1.5, end: 3.0, text: "Like and subscribe for more." },
  ];
  const words = [
    { w: "In", s: 0.05, e: 0.25 },
    { w: "this", s: 0.28, e: 0.48 },
    { w: "town", s: 0.52, e: 0.78 },
    { w: "we", s: 0.82, e: 1.02 },
    { w: "walk.", s: 1.05, e: 1.4 },
    { w: "Like", s: 1.55, e: 1.75 },
    { w: "and", s: 1.78, e: 1.95 },
    { w: "subscribe", s: 2.0, e: 2.35 },
    { w: "for", s: 2.4, e: 2.6 },
    { w: "more.", s: 2.65, e: 2.95 },
  ];

  const narrationMd = `# ${slug}\n\n\`\`\`narration\n# clip hook\n[1.hook] In this town we walk.\n[2.end] Like and subscribe for more.\n\`\`\`\n`;
  fs.writeFileSync(path.join(filmDir, "narration.md"), narrationMd);

  const timing = {
    fps: 30,
    duration: 3.0,
    audio: missingAudio ? null : `audio/${slug}/narration.mp3`,
    estimated,
    wordTiming: estimated ? "estimated" : "aligned",
    wordsPerMinute: 200,
    clips: [{ name: "hook", timing: estimated ? "estimated" : "aligned" }],
    cues,
    words,
  };
  const timingRaw = JSON.stringify(timing, null, 2);
  fs.writeFileSync(path.join(filmDir, "timing.json"), timingRaw);

  const narrationMp3 = path.join(audioDir, "narration.mp3");
  const mixMp3 = path.join(audioDir, "mix.mp3");
  if (!missingAudio) {
    synthToneAudio(narrationMp3, { duration: 3.0, freq: 240 });
    synthToneAudio(mixMp3, { duration: 3.0, freq: 260 });
  }

  const soundJsonObj = {
    music: {
      track: "Topics/InThisTown/InThisTownMusic.aac",
      gain: -16,
      sections: [{ from: "1.hook", mood: "town" }],
    },
    beds: [{ from: "1.hook", bed: "village" }],
    sfx: [{ cue: "1.hook", sfx: "step_grass" }],
  };
  const soundJsonRaw = JSON.stringify(soundJsonObj, null, 2);
  fs.writeFileSync(path.join(filmDir, "sound.json"), soundJsonRaw);

  if (includeSoundLock && !missingAudio) {
    if (corruptLock) {
      fs.writeFileSync(path.join(filmDir, "sound.lock.json"), "{ invalid-json");
    } else {
      const lockObj = {
        version: 1,
        mix: `public/audio/${slug}/mix.mp3`,
        mix_sha1: sha1(fs.readFileSync(mixMp3)),
        built_from: {
          "timing.json": textSha1(timingRaw),
          "sound.json": staleSoundJson ? "0".repeat(40) : textSha1(soundJsonRaw),
          "narration.mp3": sha1(fs.readFileSync(narrationMp3)),
        },
        music_sections: [{ t: 0, mood: "town" }],
        beds: 1,
        failures: [],
        measured: {
          musicUnderVoiceDb: 18.0,
          secondsWithoutMusic: 0.0,
          sfx: 2,
          sfxPerMinute: 40.0,
          longestGapSeconds: 1.5,
          longestGapAt: 1.5,
          sfxBuried: 0,
          voiceOverRestWorstDb: 6.0,
          voiceOverRestMedianDb: 12.0,
          lufs: -14.8,
          truePeakDb: -1.2,
        },
      };
      fs.writeFileSync(path.join(filmDir, "sound.lock.json"), JSON.stringify(lockObj, null, 2));
    }
  }

  fs.writeFileSync(
    path.join(filmDir, "world.tsx"),
    `import type React from "react";
import { Dust, Glow, GodRay, LightPool, Vox, Zone } from "../../engine";
export const World: React.FC = () => (
  <Zone name="town">
    <Vox kind="grass" position={[0, -0.25, 0]} size={[16, 0.5, 16]} />
    <GodRay position={[0, 4, -2]} />
    <LightPool position={[0, 0.03, 0]} />
    <Glow position={[0, 1.5, 0]} />
    <Dust position={[0, 1.5, 0]} />
  </Zone>
);
`,
  );

  const overlayTag = include2DOverlay ? `<div style={{ color: "red" }}>2D</div>` : "";
  fs.writeFileSync(
    path.join(filmDir, "scene1.tsx"),
    `import { Hero, cam, ease, ramp, storyScene, stride } from "../../engine";
import timing from "./timing.json";
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.hook",
      ...cam.push({ on: [0, 1.2, 0], dist: 4.5, to: 2.8 }),
      zone: "town",
      note: "Hero walks forward down the town street toward camera.",
      stage: (t, { p }) => (
        <>
          <Hero {...stride([0, 0, -1], [0, 0, 1.5], ease(ramp(p, 0, 1)))} animation="walk" time={t} />
          ${overlayTag}
        </>
      ),
    },
    {
      cue: "2.end",
      ...cam.orbit({ on: [0, 1.2, 1.5], dist: 3.4, yaw: 0, yawTo: 24 }),
      zone: "town",
      note: "Camera orbits hero waving goodbye for the subscribe beat.",
      stage: (t) => <Hero position={[0, 0, 1.5]} animation="wave" time={t} />,
    },
  ],
});
`,
  );

  fs.writeFileSync(
    path.join(filmDir, "film.tsx"),
    `import { defineFilm } from "../../engine";
import { World } from "./world";
import { scene1 } from "./scene1";
import timing from "./timing.json";
export const film = defineFilm({
  id: "${slug}",
  title: "Synthetic Test",
  topic: "${topic}",
  cut: "${cut}",
  fps: 30,
  width: 1080,
  height: 1920,
  look: "overworld-golden",
  post: { shaders: ${shadersEnabled ? "true" : "{ enabled: false }"} },
  captions: { words: timing.words, motion: "on-beat" },
  audio: { src: "audio/${slug}/mix.mp3" },
  World,
  scenes: [scene1],
});
`,
  );

  return { filmDir, audioDir, timing, narrationMp3, mixMp3 };
}
