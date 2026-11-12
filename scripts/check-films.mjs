#!/usr/bin/env node
/**
 * Director/contract lint for every film in src/videos.
 *
 * It checks the mechanical rules from AGENTS.md:
 *   - vertical 1080x1920, 30fps
 *   - shot durations, notes, motion, scene totals
 *   - scene files exist and are registered
 *   - world has GodRay, LightPool, Glow and Dust
 *   - doors have frames, beds have bedding
 *   - no 2D overlays, no postprocessing package
 *   - no Math.random / wall-clock time (renders must be deterministic)
 *   - total runtime <= 21s
 *
 * It also warns (does not fail) on:
 *   - a camera jump across a scene boundary (position/target/FOV teleport);
 *   - a `path`/`targetPath` whose first point is not `from`/`target`;
 *   - an out-of-range `fov`, or a shot with both `focalLength` and `fov`;
 *   - a `narration.md` with long lines or banned phrases.
 *
 * A film that names a topic (`topic: "in-this-town"`) whose topic.json has
 * `"profile": "story"` is checked by check-story-film.mjs instead: those films
 * are long, narrated and cut to the voice, so the 20-second numbers above do
 * not apply to them. See Topics/README.md.
 *
 * It cannot check whether the film is beautiful. A human still has to look.
 */
import fs from "node:fs";
import path from "node:path";
import { checkStoryFilm, loadTopic } from "./check-story-film.mjs";

const root = process.cwd();
const videosDir = path.join(root, "src", "videos");
const problems = [];
const infos = [];

const fail = (message) => problems.push(message);
const info = (message) => infos.push(message);

if (!fs.existsSync(videosDir)) {
  console.error("No src/videos directory. Nothing to check.");
  process.exit(1);
}

const filmDirs = fs
  .readdirSync(videosDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

if (filmDirs.length === 0) {
  console.error("No film folders in src/videos.");
  process.exit(1);
}

const TWO_D = /<(div|img|video|canvas|AbsoluteFill)\b|backgroundImage|linear-gradient\(/i;
const POST_FIELDS = /\b(vignette|grain|chromatic|toneMapping)\b/;

/**
 * Rendering is frame-deterministic: the same frame must produce the same image
 * on every machine. Wall-clock time and Math.random break that, so they are
 * banned in engine and film source. Comments are stripped first.
 */
const DETERMINISM = /\bMath\.random\s*\(|\bDate\.now\s*\(|\bperformance\.now\s*\(/;

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, " "))
    .replace(/(^|[^:\\])\/\/.*$/gm, "$1");
}

// --- shot parsing helpers --------------------------------------------------
const NUM_RE = /-?\d+(?:\.\d+)?/g;

/** The raw text of `key: [ ... ]` including every nested bracket. */
function extractArray(body, key) {
  const match = body.match(new RegExp(`(?:^|\\n)\\s*${key}:\\s*\\[`));
  if (!match) return null;
  let i = match.index + match[0].length - 1;
  const start = i;
  let depth = 0;
  for (; i < body.length; i++) {
    if (body[i] === "[") depth++;
    else if (body[i] === "]") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  return body.slice(start, i);
}

function vecList(body, key) {
  const arr = extractArray(body, key);
  if (!arr) return [];
  return [...arr.matchAll(/\[([^\[\]]*)\]/g)]
    .map((m) => (m[1].match(NUM_RE) ?? []).map(Number))
    .filter((v) => v.length >= 3)
    .map((v) => v.slice(0, 3));
}

function vecAt(body, key) {
  const list = vecList(body, key);
  return list.length > 0 ? list[0] : null;
}

function numAt(body, key) {
  const match = body.match(new RegExp(`(?:^|\\n)\\s*${key}:\\s*(-?[\\d.]+)`));
  return match ? Number(match[1]) : null;
}

/** Vertical FOV for a full-frame lens. Mirrors src/engine/math.ts. */
function focalMmToFov(mm, sensorHeightMm = 24) {
  return (2 * Math.atan(sensorHeightMm / (2 * Math.max(1, mm))) * 180) / Math.PI;
}

/** The FOV a shot opens on. Millimetres win over degrees, as in Camera.tsx. */
function shotFov(body) {
  const fl = numAt(body, "focalLength");
  if (fl != null) return focalMmToFov(fl);
  return numAt(body, "fov") ?? 38;
}

/** The FOV a shot closes on. */
function shotFovTo(body) {
  const fl = numAt(body, "focalLength");
  if (fl != null) return focalMmToFov(numAt(body, "focalLengthTo") ?? fl);
  return numAt(body, "fovTo") ?? numAt(body, "fov") ?? 38;
}

/** Where the camera is on a shot's first frame (path wins over `to`). */
function shotStart(body) {
  const path = vecList(body, "path");
  return path.length >= 2 ? path[0] : vecAt(body, "from");
}

/** Where the camera is on a shot's last frame. */
function shotEnd(body) {
  const path = vecList(body, "path");
  if (path.length >= 2) return path[path.length - 1];
  return vecAt(body, "to") ?? vecAt(body, "from");
}

function targetStart(body) {
  const path = vecList(body, "targetPath");
  return path.length >= 2 ? path[0] : vecAt(body, "target");
}

function targetEnd(body) {
  const path = vecList(body, "targetPath");
  if (path.length >= 2) return path[path.length - 1];
  return vecAt(body, "targetTo") ?? vecAt(body, "target");
}

const dist = (a, b) => (a && b ? Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) : 0);

/** Phrases the voice contract bans. See docs/NARRATION-RULES.md. */
const BANNED_PHRASES = [
  "little did he know",
  "little did she know",
  "in that moment",
  "at that moment",
  "chill ran down",
  "sense of dread",
  "air was thick",
  "everything changed",
  "this wasn't just",
  "this was not just",
  "it was then that",
  "without warning",
  "in the blink of an eye",
  "symphony of",
  "tapestry of",
  "silence was deafening",
  "time stood still",
  "blood ran cold",
  "eerie",
  "foreboding",
  "malevolent",
  "otherworldly",
  "ethereal",
  "juxtaposition",
  "myriad",
  "plethora",
  "utilize",
  "commence",
  "endeavor",
  "and so it came to pass",
];

function scanDeterminism(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDeterminism(full);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      const rel = path.relative(root, full);
      const lines = stripComments(fs.readFileSync(full, "utf8")).split("\n");
      lines.forEach((line, index) => {
        if (DETERMINISM.test(line)) {
          fail(
            `${rel}:${index + 1}: non-deterministic call. Use hashString/mulberry32/wobble instead of Math.random, Date.now or performance.now.`,
          );
        }
      });
    }
  }
}

scanDeterminism(path.join(root, "src", "engine"));
scanDeterminism(videosDir);
scanDeterminism(path.join(root, "Topics"));

for (const slug of filmDirs) {
  const dir = path.join(videosDir, slug);
  const filmPath = path.join(dir, "film.tsx");
  if (!fs.existsSync(filmPath)) {
    fail(`${slug}: missing film.tsx`);
    continue;
  }

  const film = fs.readFileSync(filmPath, "utf8");
  const id = film.match(/^\s*id:\s*["']([^"']+)["']/m)?.[1];
  if (!id) fail(`${slug}: film.tsx has no id`);

  const width = Number(film.match(/^\s*width:\s*(\d+)/m)?.[1] ?? 1080);
  const height = Number(film.match(/^\s*height:\s*(\d+)/m)?.[1] ?? 1920);
  const fps = Number(film.match(/^\s*fps:\s*(\d+)/m)?.[1] ?? 30);

  const is1080 = width === 1080 && height === 1920;
  const is720 = width === 720 && height === 1280;
  if (!is1080 && !is720) {
    fail(`${slug}: must be 1080x1920 or 720x1280 vertical, got ${width}x${height}`);
  }
  if (is720) {
    info(`${slug}: 720x1280 test render`);
  }
  if (fps !== 30) {
    fail(`${slug}: must be 30fps, got ${fps}`);
  }
  if (POST_FIELDS.test(film)) {
    fail(`${slug}: PostSettings only supports exposure and bloom`);
  }
  if (film.includes("@react-three/postprocessing")) {
    fail(`${slug}: do not add @react-three/postprocessing; it renders black under software WebGL`);
  }
  if (TWO_D.test(film)) {
    fail(`${slug}: film.tsx contains a 2D overlay`);
  }

  // A topic film follows its topic's rules, not the 20-second base contract.
  const topicId = film.match(/^\s*topic:\s*["']([^"']+)["']/m)?.[1];
  if (topicId) {
    const topic = loadTopic(root, topicId);
    if (!topic) {
      fail(`${slug}: topic "${topicId}" has no Topics/<Folder>/topic.json`);
      continue;
    }
    if (topic.profile === "story") {
      checkStoryFilm({ root, slug, dir, film, topic, fail, info, TWO_D, BANNED_PHRASES });
      info(`${slug}: ${width}x${height}@${fps}${id ? `, id=${id}` : ""}, topic=${topicId}`);
      continue;
    }
  }

  const scenesBlock = film.match(/scenes:\s*\[([\s\S]*?)\]/);
  let sceneIds = scenesBlock
    ? scenesBlock[1]
        .split(",")
        .map((value) => value.trim())
        .filter((value) => /^scene\d+$/.test(value))
    : [];

  if (sceneIds.length === 0) {
    fail(`${slug}: film.tsx registers no scenes`);
    continue;
  }

  const sceneFilesOnDisk = fs
    .readdirSync(dir)
    .filter((file) => /^scene\d+\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ""));

  for (const unused of sceneFilesOnDisk.filter((scene) => !sceneIds.includes(scene))) {
    info(`${slug}: ${unused}.tsx exists but is not in film.tsx scenes[]`);
  }

  let total = 0;
  const boundaries = [];

  for (const sceneId of sceneIds) {
    const scenePath = path.join(dir, `${sceneId}.tsx`);
    if (!fs.existsSync(scenePath)) {
      fail(`${slug}: ${sceneId}.tsx is registered but missing`);
      continue;
    }

    const scene = fs.readFileSync(scenePath, "utf8");
    const duration = Number(scene.match(/^\s*duration:\s*([\d.]+)/m)?.[1]);

    if (!Number.isFinite(duration) || duration <= 0) {
      fail(`${slug}/${sceneId}: missing or invalid duration`);
    } else {
      total += duration;
    }

    if (TWO_D.test(scene)) {
      fail(`${slug}/${sceneId}: 2D overlay found. Build the object in 3D.`);
    }
    if (!/^\s*Component\s*:/m.test(scene)) {
      fail(`${slug}/${sceneId}: missing Component`);
    }
    if (!/^\s*id:\s*["']scene\d+["']/m.test(scene)) {
      fail(`${slug}/${sceneId}: scene id must be sceneN`);
    }

    const shots = [];
    const shotRe = /\{\s*at:\s*([\d.]+),\s*dur:\s*([\d.]+),([\s\S]*?)\n\s*\},/g;
    let match;
    while ((match = shotRe.exec(scene))) {
      shots.push({ at: Number(match[1]), dur: Number(match[2]), body: match[3] });
    }

    if (shots.length === 0) {
      fail(`${slug}/${sceneId}: no shots parsed. Use the standard shot object format.`);
      continue;
    }

    let expected = 0;
    for (const [index, shot] of shots.entries()) {
      const label = `${slug}/${sceneId} shot ${index + 1}`;

      if (Math.abs(shot.at - expected) > 0.02) {
        fail(`${label}: starts at ${shot.at}s, expected ${expected.toFixed(2)}s`);
      }
      expected += shot.dur;

      if (shot.dur <= 0) fail(`${label}: duration must be positive`);
      if (shot.dur > 7) fail(`${label}: ${shot.dur}s is too long even for a fly-through`);
      if (shot.dur > 5 && !/(^|\n)\s*path:\s*\[/m.test(shot.body)) {
        fail(`${label}: ${shot.dur}s is over 5s; only a continuous path move may run that long`);
      }

      const noteMatch = shot.body.match(/note:\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/);
      const note = noteMatch ? noteMatch[1] ?? noteMatch[2] ?? noteMatch[3] : "";
      if (!note || note.trim().length < 24) {
        fail(`${label}: note must explain the story reason (24+ chars)`);
      }

      const focal = shot.body.match(/\bfocalLength:\s*([\d.]+)/);
      if (focal) {
        const mm = Number(focal[1]);
        if (mm < 8 || mm > 200) {
          fail(`${label}: focalLength ${mm}mm is outside the supported 8–200mm range`);
        }
      }
      const focalTo = shot.body.match(/\bfocalLengthTo:\s*([\d.]+)/);
      if (focalTo) {
        const mm = Number(focalTo[1]);
        if (mm < 8 || mm > 200) {
          fail(`${label}: focalLengthTo ${mm}mm is outside the supported 8–200mm range`);
        }
      }

      const fovValue = numAt(shot.body, "fov");
      if (fovValue != null && (fovValue < 10 || fovValue > 120)) {
        info(`${label}: fov ${fovValue}° is outside the sensible 10–120° range.`);
      }
      const fovToValue = numAt(shot.body, "fovTo");
      if (fovToValue != null && (fovToValue < 10 || fovToValue > 120)) {
        info(`${label}: fovTo ${fovToValue}° is outside the sensible 10–120° range.`);
      }
      if (numAt(shot.body, "focalLength") != null && fovValue != null) {
        info(`${label}: has both focalLength and fov. focalLength wins; delete fov to avoid confusion.`);
      }

      const fromVec = vecAt(shot.body, "from");
      const targetVec = vecAt(shot.body, "target");
      const pathVecs = vecList(shot.body, "path");
      const targetPathVecs = vecList(shot.body, "targetPath");

      if (pathVecs.length >= 2 && fromVec) {
        const gap = dist(pathVecs[0], fromVec);
        if (gap > 0.02) {
          info(`${label}: path starts at [${pathVecs[0].join(", ")}] but from is [${fromVec.join(", ")}] (Δ${gap.toFixed(2)}). The camera would snap.`);
        }
      }
      if (targetPathVecs.length >= 2 && targetVec) {
        const gap = dist(targetPathVecs[0], targetVec);
        if (gap > 0.02) {
          info(`${label}: targetPath starts at [${targetPathVecs[0].join(", ")}] but target is [${targetVec.join(", ")}] (Δ${gap.toFixed(2)}). The look would snap.`);
        }
      }

      if (!/(^|\n)\s*from:\s*\[/m.test(shot.body)) {
        fail(`${label}: missing from[]`);
      }
      if (!/(^|\n)\s*target:\s*\[/m.test(shot.body)) {
        fail(`${label}: missing target[]`);
      }
      if (!/(^|\n)\s*(to|path|targetTo|targetPath|shake|arc):/m.test(shot.body)) {
        fail(`${label}: static shot. Add camera/actor motion or a motivated cut.`);
      }
    }

    const sum = shots.reduce((acc, shot) => acc + shot.dur, 0);
    if (Number.isFinite(duration) && Math.abs(sum - duration) > 0.02) {
      fail(`${slug}/${sceneId}: shots sum to ${sum.toFixed(2)}s, duration is ${duration}s`);
    }

    if (!/(^|\n)\s*(to|path|targetTo|targetPath|shake|arc):/m.test(scene)) {
      fail(`${slug}/${sceneId}: scene has no camera motion at all`);
    }

    const firstShot = shots[0].body;
    const lastShot = shots[shots.length - 1].body;
    boundaries.push({
      sceneId,
      startPos: shotStart(firstShot),
      startTarget: targetStart(firstShot),
      startFov: shotFov(firstShot),
      endPos: shotEnd(lastShot),
      endTarget: targetEnd(lastShot),
      endFov: shotFovTo(lastShot),
    });
  }

  // Camera continuity across scene cuts. A jump here is the classic teleport;
  // it is a warning, not a failure, so a film with one deliberate small cheat
  // can still ship — but a human must review every line printed.
  for (let i = 1; i < boundaries.length; i++) {
    const prev = boundaries[i - 1];
    const cur = boundaries[i];
    const dp = dist(prev.endPos, cur.startPos);
    const dt = dist(prev.endTarget, cur.startTarget);
    const df = Math.abs(prev.endFov - cur.startFov);
    const jumps = [];
    if (dp > 0.06) jumps.push(`position Δ${dp.toFixed(2)}m`);
    if (dt > 0.06) jumps.push(`target Δ${dt.toFixed(2)}m`);
    if (df > 0.75) jumps.push(`fov Δ${df.toFixed(1)}°`);
    if (jumps.length > 0) {
      info(
        `${slug}: camera jump ${prev.sceneId}→${cur.sceneId} (${jumps.join(", ")}). Scene N should start where N-1 ended.`,
      );
    }
  }

  const worldPath = path.join(dir, "world.tsx");
  if (!fs.existsSync(worldPath)) {
    fail(`${slug}: missing world.tsx`);
  } else {
    const world = fs.readFileSync(worldPath, "utf8");

    for (const required of ["GodRay", "LightPool", "Glow", "Dust"]) {
      if (!new RegExp(`<${required}\\b`).test(world)) {
        fail(`${slug}: world.tsx is missing ${required}. Atmosphere is mandatory.`);
      }
    }

    if (/<Door\b/.test(world) && !/<DoorFrame\b/.test(world)) {
      fail(`${slug}: a Door has no DoorFrame. No naked door boxes.`);
    }

    if (/<Bed\b/.test(world)) {
      for (const bed of world.matchAll(/<Bed\b([\s\S]*?)\/>/g)) {
        const props = bed[1];
        if (!/\bsheet=/.test(props) || !/\bblanket=/.test(props)) {
          fail(`${slug}: a Bed has no sheet/blanket. Add bedding, not a white slab.`);
        }
      }
    }

    const lightCount = (
      world.match(/<pointLight\b|<directionalLight\b|<CeilingLight\b|<WindowUnit\b/g) ?? []
    ).length;
    if (lightCount < 3) {
      fail(`${slug}: only ${lightCount} light sources. Use key + practical + rim/kicker.`);
    }

    if (TWO_D.test(world)) {
      fail(`${slug}: world.tsx contains a 2D overlay`);
    }
  }

  // Optional narration script. If a film ships `narration.md`, the voice
  // contract from docs/NARRATION-RULES.md is linted: short lines, plain words,
  // no banned phrases. Missing file is fine; a bad one is a warning.
  const narrationPath = path.join(dir, "narration.md");
  if (fs.existsSync(narrationPath)) {
    const raw = fs.readFileSync(narrationPath, "utf8");
    const fence = raw.match(/```narration\s*([\s\S]*?)```/);
    if (!fence) {
      info(`${slug}: narration.md has no \`\`\`narration block. Wrap the spoken lines in one so they can be linted.`);
    } else {
      const lines = fence[1]
        .split("\n")
        .map((line) => line.replace(/^\s*[-*]\s*/, "").trim())
        .filter((line) => line.length > 0 && !line.startsWith(">") && !line.startsWith("#"));
      for (const line of lines) {
        const clean = line.replace(/^["'`]|["'`]$/g, "").trim();
        const words = clean.split(/\s+/).filter(Boolean).length;
        const lower = clean.toLowerCase();
        if (words > 12) {
          info(`${slug}: narration line is ${words} words: "${clean}". Keep it under 12.`);
        }
        for (const phrase of BANNED_PHRASES) {
          if (lower.includes(phrase)) {
            info(`${slug}: narration uses a banned phrase "${phrase}": "${clean}". See docs/NARRATION-RULES.md.`);
          }
        }
      }
      if (lines.length > 9) {
        info(`${slug}: narration has ${lines.length} lines. A 20-second short usually needs 4–7.`);
      }
    }
  }

  if (total > 21) {
    fail(`${slug}: runtime ${total.toFixed(1)}s exceeds the 21s ceiling`);
  } else if (total > 20.5) {
    info(`${slug}: runtime ${total.toFixed(1)}s is over the 20.5s target`);
  }

  info(
    `${slug}: ${sceneIds.length} scene(s), ${total.toFixed(1)}s, ${width}x${height}@${fps}${id ? `, id=${id}` : ""}`,
  );
}

console.log(`Checked ${filmDirs.length} film(s) in src/videos.\n`);
for (const message of infos) console.log(`  • ${message}`);

if (problems.length > 0) {
  console.error("\nCONTRACT FAILURES");
  for (const message of problems) console.error(`  ✗ ${message}`);
  console.error(`\n${problems.length} problem(s). Fix them before rendering.`);
  process.exit(1);
}

console.log("\nPASS — the mechanical contract is satisfied.");
console.log("Now look at the frames. The lint cannot see beauty.");
