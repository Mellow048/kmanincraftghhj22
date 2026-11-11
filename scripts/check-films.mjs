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
 * It cannot check whether the film is beautiful. A human still has to look.
 */
import fs from "node:fs";
import path from "node:path";

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
