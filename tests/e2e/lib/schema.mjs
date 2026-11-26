import fs from "node:fs";
import path from "node:path";

export const TARGET_SHORTS = [
  "in-this-town-nobody-has-ever-slept",
  "in-this-town-we-live-at-the-bottom",
  "in-this-town-my-family-stole-things",
  "inflation-explained-using-minecraft",
  "in-this-town-nobody-turns-on-a-furnace",
];

export const SHORT_LABELS = {
  "in-this-town-nobody-has-ever-slept": "slept",
  "in-this-town-we-live-at-the-bottom": "bottom",
  "in-this-town-my-family-stole-things": "stole-things",
  "inflation-explained-using-minecraft": "inflation",
  "in-this-town-nobody-turns-on-a-furnace": "furnace",
};

export const SERVERLORE_MP4_PATTERN = /server[-_]?lore|3am[-_]?mom|deaf[-_]?creeper/i;

export function validateTimingSchema(timing, { requireAligned = true } = {}) {
  const errors = [];
  if (!timing || typeof timing !== "object") {
    return { ok: false, errors: ["timing.json must be a JSON object"] };
  }
  if (typeof timing.fps !== "number" || timing.fps <= 0) {
    errors.push(`invalid fps: ${timing.fps}`);
  }
  if (typeof timing.duration !== "number" || !Number.isFinite(timing.duration) || timing.duration <= 0) {
    errors.push(`invalid duration: ${timing.duration}`);
  }
  if (!Array.isArray(timing.cues) || timing.cues.length === 0) {
    errors.push("cues must be a non-empty array");
  }
  if (!Array.isArray(timing.words) || timing.words.length === 0) {
    errors.push("words must be a non-empty array");
  } else {
    for (let i = 0; i < timing.words.length; i++) {
      const w = timing.words[i];
      if (!w || typeof w.w !== "string" || typeof w.s !== "number" || typeof w.e !== "number") {
        errors.push(`word[${i}] missing w/s/e`);
        break;
      }
      if (w.s < 0 || w.e <= w.s || w.e > timing.duration + 1 / (timing.fps || 30)) {
        errors.push(`word[${i}] (${w.w}) out of bounds [${w.s}, ${w.e}] vs duration ${timing.duration}`);
        break;
      }
      if (i > 0 && (w.s < timing.words[i - 1].s || w.s < timing.words[i - 1].e - 0.001)) {
        errors.push(`word[${i}] (${w.w}) overlaps previous word`);
        break;
      }
    }
  }
  if (requireAligned) {
    if (timing.estimated !== false) {
      errors.push(`estimated must be false, got ${timing.estimated}`);
    }
    if (timing.wordTiming !== "aligned") {
      errors.push(`wordTiming must be "aligned", got ${timing.wordTiming}`);
    }
    if (!timing.audio || typeof timing.audio !== "string") {
      errors.push("aligned timing.json must specify audio path");
    }
    if (!Array.isArray(timing.clips) || timing.clips.length === 0) {
      errors.push("aligned timing.json must include non-empty clips[]");
    } else if (timing.clips.some((c) => c.timing !== "aligned")) {
      errors.push("every clip in timing.clips must have timing === 'aligned'");
    }
  }
  return { ok: errors.length === 0, errors };
}

export function validateSoundLockSchema(lock) {
  const errors = [];
  if (!lock || typeof lock !== "object") {
    return { ok: false, errors: ["sound.lock.json must be a JSON object"] };
  }
  if (typeof lock.mix !== "string" || !lock.mix) errors.push("missing lock.mix");
  if (typeof lock.mix_sha1 !== "string" || !/^[a-f0-9]{40}$/i.test(lock.mix_sha1)) {
    errors.push("invalid lock.mix_sha1");
  }
  if (!lock.built_from || typeof lock.built_from !== "object") {
    errors.push("missing lock.built_from");
  } else {
    for (const key of ["timing.json", "sound.json", "narration.mp3"]) {
      if (typeof lock.built_from[key] !== "string" || !lock.built_from[key]) {
        errors.push(`missing built_from["${key}"]`);
      }
    }
  }
  if (!Array.isArray(lock.failures)) {
    errors.push("lock.failures must be an array");
  } else if (lock.failures.length > 0) {
    errors.push(`lock.failures non-empty: ${lock.failures.join("; ")}`);
  }
  if (!lock.measured || typeof lock.measured !== "object") {
    errors.push("missing lock.measured");
  } else {
    for (const numKey of ["lufs", "truePeakDb"]) {
      if (typeof lock.measured[numKey] !== "number" || !Number.isFinite(lock.measured[numKey])) {
        errors.push(`missing numeric measured.${numKey}`);
      }
    }
  }
  return { ok: errors.length === 0, errors };
}

export function validateDirectionReportSchema(report) {
  const errors = [];
  if (!report || typeof report !== "object") {
    return { ok: false, errors: ["directionReport must return an object"] };
  }
  for (const k of ["shots", "sampled", "changing"]) {
    if (typeof report[k] !== "number" || !Number.isFinite(report[k]) || report[k] < 0) {
      errors.push(`directionReport.${k} must be a non-negative number`);
    }
  }
  for (const k of ["errors", "unfinished", "review"]) {
    if (!Array.isArray(report[k])) {
      errors.push(`directionReport.${k} must be an array`);
    }
  }
  return { ok: errors.length === 0, errors };
}

export function getServerLoreVideoSlugs(repoRoot) {
  const videosDir = path.join(repoRoot, "src", "videos");
  if (!fs.existsSync(videosDir)) return [];
  const slugs = [];
  for (const entry of fs.readdirSync(videosDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const filmPath = path.join(videosDir, entry.name, "film.tsx");
    if (!fs.existsSync(filmPath)) continue;
    const src = fs.readFileSync(filmPath, "utf8");
    if (/^\s*topic:\s*["']server-lore["']/m.test(src)) {
      slugs.push(entry.name);
    }
  }
  return slugs;
}

function scanMp4s(dir, maxDepth, currentDepth = 0, out = []) {
  if (!fs.existsSync(dir) || currentDepth > maxDepth) return out;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === "Topics") continue;
    const full = path.join(dir, entry.name);
    if (entry.isFile() && /\.mp4$/i.test(entry.name)) {
      out.push(full);
    } else if (entry.isDirectory() && currentDepth < maxDepth) {
      // Skip scanning inside git repo checkout on Desktop if Desktop is scanned
      if (fs.existsSync(path.join(full, "package.json")) && fs.existsSync(path.join(full, "src", "engine"))) {
        continue;
      }
      scanMp4s(full, maxDepth, currentDepth + 1, out);
    }
  }
  return out;
}

/**
 * Enforce R3 / F6 rule: zero ServerLore MP4s may be rendered in renders/, out/, or Desktop.
 */
export function findUnexpectedServerLoreMp4s(repoRoot, extraDirs = []) {
  const serverLoreSlugs = getServerLoreVideoSlugs(repoRoot);
  const dirsToScan = [
    { dir: path.join(repoRoot, "renders"), depth: 2 },
    { dir: path.join(repoRoot, "out"), depth: 2 },
    { dir: "/home/mellbot/Desktop", depth: 2 },
    ...extraDirs.map((d) => ({ dir: d, depth: 2 })),
  ];

  const hits = [];
  for (const { dir, depth } of dirsToScan) {
    for (const mp4 of scanMp4s(dir, depth)) {
      const base = path.basename(mp4, ".mp4");
      if (SERVERLORE_MP4_PATTERN.test(base) || serverLoreSlugs.includes(base)) {
        hits.push(mp4);
      }
    }
  }
  return [...new Set(hits)];
}
