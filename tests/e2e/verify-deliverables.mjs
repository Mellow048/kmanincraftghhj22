#!/usr/bin/env node
/**
 * Tier 4 Deliverable Verification Runner (F12 + F13).
 *
 * Usage:
 *   node tests/e2e/verify-deliverables.mjs --desktop-dir <dir> [options]
 *     --desktop-dir <dir>         Required. Delivery folder containing the 5 standalone .mp4 Shorts.
 *     --out-dir <dir>             Where JSON report, metrics JSONs, and contact sheets are written.
 *     --duration-tolerance <sec>  Max |ffprobe.duration - timing.duration| (default: 1.0).
 *     --skip-python-checks        Skip render-check.py / film-metrics.py / look-metrics.py.
 *     --skip-sheets               Skip ffmpeg + PIL contact sheet extraction.
 *     --repo-root <dir>           Override repo root (used by Tier 2 tests with synthetic timing fixtures).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  SERVERLORE_MP4_PATTERN,
  TARGET_SHORTS,
  getServerLoreVideoSlugs,
} from "./lib/schema.mjs";

const DEFAULT_REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const DEFECT_CUES = {
  "in-this-town-nobody-has-ever-slept": ["1.work", "1.bed", "5.cellar", "6.job", "10.stopped"],
  "in-this-town-we-live-at-the-bottom": ["1.town", "1.above", "3.rods", "10.rod", "16.jetty"],
  "in-this-town-my-family-stole-things": ["1.town", "1.night", "4.cup", "8.dogs", "11.count"],
  "inflation-explained-using-minecraft": ["1.hook", "5.print", "6.ovens", "7.chart", "7.value"],
  "in-this-town-nobody-turns-on-a-furnace": ["1.town", "1.snow", "2.cold", "2.dark", "8.puddle"],
};

function probeMp4(mp4Path) {
  const res = spawnSync(
    "ffprobe",
    ["-v", "error", "-show_format", "-show_streams", "-of", "json", mp4Path],
    { encoding: "utf8" },
  );
  if (res.status !== 0) {
    return { ok: false, error: `ffprobe failed (${res.status}): ${(res.stderr || "").trim()}` };
  }
  try {
    return { ok: true, data: JSON.parse(res.stdout) };
  } catch (err) {
    return { ok: false, error: `ffprobe invalid JSON: ${err.message}` };
  }
}

function resolveInspectionTimestamps(timing, slug) {
  const duration = Number(timing.duration) || 10;
  const points = [
    { t: 0.1, label: "hook @ 0.1s" },
    { t: Math.min(1.0, duration * 0.25), label: "hook @ 1.0s" },
    { t: Math.min(2.0, duration * 0.5), label: "hook @ 2.0s" },
    { t: Math.min(2.9, duration * 0.75), label: "hook @ 2.9s" },
    { t: duration * 0.35, label: "mid @ 35%" },
    { t: duration * 0.65, label: "late @ 65%" },
    { t: duration * 0.9, label: "end @ 90%" },
  ];

  const cues = timing.cues ?? [];
  const targetCueIds = DEFECT_CUES[slug] ?? [];
  for (const cid of targetCueIds) {
    const cue = cues.find((c) => c.id === cid || c.id.startsWith(cid));
    if (!cue) continue;
    const span = cue.end - cue.start;
    const fracs = cid === "3.rods" ? [0.15, 0.5, 0.85] : [0.2, 0.5, 0.85];
    for (const f of fracs) {
      const t = Math.min(duration - 0.05, Math.max(0.05, cue.start + span * f));
      points.push({ t, label: `${cue.id} (${Math.round(f * 100)}%)` });
    }
  }

  // Sort & deduplicate within 0.25s
  points.sort((a, b) => a.t - b.t);
  const deduped = [];
  for (const pt of points) {
    const clamped = Math.min(Math.max(0.05, pt.t), Math.max(0.05, duration - 0.05));
    if (deduped.length === 0 || Math.abs(clamped - deduped[deduped.length - 1].t) >= 0.25) {
      deduped.push({ t: Number(clamped.toFixed(2)), label: pt.label });
    }
  }
  return deduped;
}

function generateInspectionSheet(mp4Path, timing, slug, outDir) {
  const framesDir = path.join(outDir, slug, "frames");
  fs.mkdirSync(framesDir, { recursive: true });
  const stamps = resolveInspectionTimestamps(timing, slug);
  const extracted = [];

  for (const [idx, st] of stamps.entries()) {
    const jpgPath = path.join(framesDir, `${String(idx + 1).padStart(2, "0")}.jpg`);
    execFileSync(
      "ffmpeg",
      ["-y", "-v", "error", "-ss", String(st.t), "-i", mp4Path, "-frames:v", "1", "-q:v", "2", jpgPath],
      { stdio: "pipe" },
    );
    if (fs.existsSync(jpgPath)) {
      extracted.push({ path: jpgPath, label: `${st.label} | ${st.t.toFixed(2)}s` });
    }
  }

  const sheetPath = path.join(outDir, `${slug}-inspection-sheet.jpg`);
  const py = `
import json, math
from PIL import Image, ImageDraw, ImageFont

items = json.loads(${JSON.stringify(JSON.stringify(extracted))})
cols = 4
tile_w, tile_h = 360, 640
bar_h = 34
rows = max(1, math.ceil(len(items) / cols))
sheet = Image.new("RGB", (cols * tile_w, rows * (tile_h + bar_h)), (18, 20, 26))
draw = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 15)
except Exception:
    font = ImageFont.load_default()

for i, it in enumerate(items):
    r, c = divmod(i, cols)
    x0, y0 = c * tile_w, r * (tile_h + bar_h)
    im = Image.open(it["path"]).convert("RGB").resize((tile_w, tile_h), Image.Resampling.LANCZOS)
    sheet.paste(im, (x0, y0 + bar_h))
    draw.rectangle([x0, y0, x0 + tile_w, y0 + bar_h], fill=(28, 32, 42))
    draw.text((x0 + 8, y0 + 8), it["label"][:36], fill=(245, 245, 250), font=font)

sheet.save(${JSON.stringify(sheetPath)}, quality=90)
`;
  execFileSync("python3", ["-c", py], { stdio: "pipe" });
  return { sheetPath, extracted };
}

export function validateDesktopDir(desktopDir, options = {}) {
  const {
    repoRoot = DEFAULT_REPO_ROOT,
    outDir = null,
    durationToleranceSec = 1.0,
    skipPythonChecks = false,
    skipSheets = false,
  } = options;

  if (!desktopDir || !fs.existsSync(desktopDir) || !fs.statSync(desktopDir).isDirectory()) {
    return {
      ok: false,
      usageError: true,
      errors: [`Desktop directory does not exist: ${desktopDir}`],
      shorts: {},
    };
  }

  const errors = [];
  const serverLoreSlugs = getServerLoreVideoSlugs(repoRoot);
  const expectedMp4s = new Set(TARGET_SHORTS.map((s) => `${s}.mp4`));

  // 1) Directory hygiene scan
  const entries = fs.readdirSync(desktopDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const name = entry.name;
    if (entry.isDirectory()) {
      errors.push(`Unexpected subdirectory in delivery folder: ${name}`);
      continue;
    }
    if (/^chunk-/i.test(name) || /chunk[-_]\d+/i.test(name)) {
      errors.push(`Forbidden split chunk artifact: ${name}`);
      continue;
    }
    if (/\.(part|mov|zip|tmp)$/i.test(name)) {
      errors.push(`Forbidden non-MP4/partial artifact: ${name}`);
      continue;
    }
    if (/\.mp4$/i.test(name)) {
      if (!expectedMp4s.has(name)) {
        const base = path.basename(name, ".mp4");
        if (SERVERLORE_MP4_PATTERN.test(base) || serverLoreSlugs.includes(base)) {
          errors.push(`Unexpected ServerLore MP4 forbidden by R3: ${name}`);
        } else {
          errors.push(`Unexpected MP4 not in 5-Short target manifest: ${name}`);
        }
      }
    } else {
      errors.push(`Unexpected non-target file in delivery folder: ${name}`);
    }
  }

  // 2) Per-Short checks
  const shorts = {};
  for (const slug of TARGET_SHORTS) {
    const mp4Path = path.join(desktopDir, `${slug}.mp4`);
    const shortRes = { slug, mp4Path, ok: true, errors: [], ffprobe: null, metrics: null, lookMetrics: [], sheetPath: null };

    if (!fs.existsSync(mp4Path)) {
      shortRes.ok = false;
      shortRes.errors.push(`Missing required target Short: ${slug}.mp4`);
      shorts[slug] = shortRes;
      errors.push(...shortRes.errors);
      continue;
    }

    const stat = fs.statSync(mp4Path);
    if (stat.size === 0) {
      shortRes.ok = false;
      shortRes.errors.push(`0-byte empty MP4: ${slug}.mp4`);
      shorts[slug] = shortRes;
      errors.push(...shortRes.errors);
      continue;
    }

    const probe = probeMp4(mp4Path);
    if (!probe.ok) {
      shortRes.ok = false;
      shortRes.errors.push(`${slug}.mp4: ${probe.error}`);
      shorts[slug] = shortRes;
      errors.push(...shortRes.errors);
      continue;
    }

    const streams = probe.data.streams ?? [];
    const formatDur = Number(probe.data.format?.duration);
    const vStream = streams.find((s) => s.codec_type === "video");
    const aStream = streams.find((s) => s.codec_type === "audio");

    if (!Number.isFinite(formatDur) || formatDur <= 0) {
      shortRes.errors.push(`${slug}.mp4: non-positive or missing format.duration (${probe.data.format?.duration})`);
    }
    if (formatDur > 180) {
      shortRes.errors.push(`${slug}.mp4: duration ${formatDur.toFixed(2)}s exceeds 180s Short limit`);
    }

    if (!vStream) {
      shortRes.errors.push(`${slug}.mp4: missing video stream`);
    } else {
      if (vStream.codec_name !== "h264") {
        shortRes.errors.push(`${slug}.mp4: expected h264 video codec, got ${vStream.codec_name}`);
      }
      if (vStream.width !== 1080 || vStream.height !== 1920) {
        shortRes.errors.push(`${slug}.mp4: expected 1080x1920 vertical, got ${vStream.width}x${vStream.height}`);
      }
      if (vStream.r_frame_rate !== "30/1") {
        const [num, den] = String(vStream.r_frame_rate || "0/1").split("/").map(Number);
        const fps = den ? num / den : 0;
        if (Math.abs(fps - 30) > 0.05) {
          shortRes.errors.push(`${slug}.mp4: expected 30/1 fps, got ${vStream.r_frame_rate}`);
        }
      }
      if (vStream.nb_frames !== undefined && Number(vStream.nb_frames) <= 0) {
        shortRes.errors.push(`${slug}.mp4: invalid nb_frames=${vStream.nb_frames}`);
      }
    }

    if (!aStream) {
      shortRes.errors.push(`${slug}.mp4: missing audio stream (video-only MP4 rejected)`);
    } else {
      if (aStream.codec_name !== "aac") {
        shortRes.errors.push(`${slug}.mp4: expected aac audio codec, got ${aStream.codec_name}`);
      }
      if (!(Number(aStream.sample_rate) > 0) || !(Number(aStream.channels) >= 1)) {
        shortRes.errors.push(`${slug}.mp4: invalid audio sample_rate=${aStream.sample_rate} / channels=${aStream.channels}`);
      }
    }

    const timingPath = path.join(repoRoot, "src", "videos", slug, "timing.json");
    let timing = { duration: formatDur, cues: [] };
    if (!fs.existsSync(timingPath)) {
      shortRes.errors.push(`${slug}: missing timing.json at ${timingPath}`);
    } else {
      timing = JSON.parse(fs.readFileSync(timingPath, "utf8"));
      const expectedDur = Number(timing.duration);
      if (Number.isFinite(formatDur) && Number.isFinite(expectedDur)) {
        if (Math.abs(formatDur - expectedDur) > durationToleranceSec) {
          shortRes.errors.push(
            `${slug}.mp4: duration ${formatDur.toFixed(2)}s differs from timing.json ${expectedDur.toFixed(2)}s by > ${durationToleranceSec}s`,
          );
        }
      }
    }

    shortRes.ffprobe = {
      duration: formatDur,
      width: vStream?.width,
      height: vStream?.height,
      r_frame_rate: vStream?.r_frame_rate,
      vCodec: vStream?.codec_name,
      aCodec: aStream?.codec_name,
    };

    const resolvedOutDir = outDir ?? path.join(os.tmpdir(), "e2e-deliverables-tmp");
    if (!skipSheets && shortRes.errors.length === 0) {
      try {
        fs.mkdirSync(resolvedOutDir, { recursive: true });
        const sheet = generateInspectionSheet(mp4Path, timing, slug, resolvedOutDir);
        shortRes.sheetPath = sheet.sheetPath;
        shortRes._extractedFrames = sheet.extracted;
      } catch (err) {
        shortRes.errors.push(`${slug}: failed inspection sheet extraction: ${err.message}`);
      }
    }

    if (!skipPythonChecks && shortRes.errors.length === 0) {
      // 2a) render-check.py --file
      const rc = spawnSync(
        "python3",
        [path.join(repoRoot, "scripts", "render-check.py"), slug, "--file", mp4Path],
        { cwd: repoRoot, encoding: "utf8" },
      );
      if (rc.status !== 0) {
        shortRes.errors.push(`${slug}: render-check.py failed:\n${(rc.stdout + rc.stderr).trim()}`);
      }

      // 2b) film-metrics.py --json (NOTE: film-metrics.py always exits 0, must check entry.verdict!)
      fs.mkdirSync(resolvedOutDir, { recursive: true });
      const metricsJsonPath = path.join(resolvedOutDir, `${slug}-metrics.json`);
      const fm = spawnSync(
        "python3",
        [path.join(repoRoot, "scripts", "film-metrics.py"), mp4Path, "--json", metricsJsonPath],
        { cwd: repoRoot, encoding: "utf8" },
      );
      if (fm.status !== 0 || !fs.existsSync(metricsJsonPath)) {
        shortRes.errors.push(`${slug}: film-metrics.py failed (${fm.status}): ${(fm.stderr || fm.stdout).trim()}`);
      } else {
        const arr = JSON.parse(fs.readFileSync(metricsJsonPath, "utf8"));
        const entry = Array.isArray(arr) ? arr[0] : null;
        shortRes.metrics = entry;
        if (!entry || entry.error) {
          shortRes.errors.push(`${slug}: film-metrics.py reported error: ${entry?.error ?? "empty result"}`);
        } else if (Array.isArray(entry.verdict) && entry.verdict.length > 0) {
          shortRes.errors.push(`${slug}: film-metrics.py verdict non-empty: ${entry.verdict.join("; ")}`);
        }
      }

      // 2c) look-metrics.py on hook / mid / late extracted frames
      if (shortRes._extractedFrames && shortRes._extractedFrames.length >= 3) {
        const frames = [
          shortRes._extractedFrames[0].path,
          shortRes._extractedFrames[Math.floor(shortRes._extractedFrames.length / 2)].path,
          shortRes._extractedFrames[shortRes._extractedFrames.length - 1].path,
        ];
        const lm = spawnSync(
          "python3",
          [path.join(repoRoot, "scripts", "look-metrics.py"), ...frames],
          { cwd: repoRoot, encoding: "utf8" },
        );
        if (lm.status !== 0) {
          shortRes.errors.push(`${slug}: look-metrics.py failed: ${(lm.stderr || lm.stdout).trim()}`);
        } else {
          for (const line of lm.stdout.trim().split("\n").filter(Boolean)) {
            const m = line.match(
              /^(\S+)\s+(\d+x\d+)\s+\|\s+warm\s+([+-]?\d+\.\d+)\s+\|\s+sat\s+(\d+\.\d+)\s+\|\s+lum\s+(\d+)\/(\d+)\/(\d+)\s+\|\s+dark\s+(\d+\.\d+)%\s+clip\s+(\d+\.\d+)%/,
            );
            if (!m) {
              shortRes.errors.push(`${slug}: unparseable look-metrics line: ${line}`);
            } else {
              const darkPct = Number(m[8]);
              const clipPct = Number(m[9]);
              shortRes.lookMetrics.push({ frame: m[1], size: m[2], warm: Number(m[3]), sat: Number(m[4]), darkPct, clipPct });
              if (m[2] !== "1080x1920") shortRes.errors.push(`${slug}: look-metrics wrong size ${m[2]}`);
              if (darkPct >= 85) shortRes.errors.push(`${slug}: frame ${m[1]} too dark (${darkPct}%)`);
              if (clipPct >= 50) shortRes.errors.push(`${slug}: frame ${m[1]} blown out (${clipPct}% clipped)`);
            }
          }
        }
      }
    }

    delete shortRes._extractedFrames;
    if (shortRes.errors.length > 0) {
      shortRes.ok = false;
      errors.push(...shortRes.errors);
    }
    shorts[slug] = shortRes;
  }

  return { ok: errors.length === 0, usageError: false, desktopDir, errors, shorts };
}

function parseCli(argv) {
  const opt = (flag, fallback = null) => {
    const i = argv.indexOf(flag);
    return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : fallback;
  };
  return {
    desktopDir: opt("--desktop-dir"),
    outDir: opt("--out-dir", path.join(os.tmpdir(), `verify-deliverables-${Date.now()}`)),
    durationToleranceSec: Number(opt("--duration-tolerance", "1.0")),
    skipPythonChecks: argv.includes("--skip-python-checks"),
    skipSheets: argv.includes("--skip-sheets"),
    repoRoot: opt("--repo-root", DEFAULT_REPO_ROOT),
  };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const args = parseCli(process.argv.slice(2));
  if (!args.desktopDir) {
    console.error("Usage: node tests/e2e/verify-deliverables.mjs --desktop-dir <dir> [--out-dir <dir>] [--duration-tolerance <sec>] [--skip-python-checks] [--skip-sheets]");
    process.exit(2);
  }
  if (!fs.existsSync(args.desktopDir) || !fs.statSync(args.desktopDir).isDirectory()) {
    console.error(`verify-deliverables: directory does not exist: ${args.desktopDir}`);
    process.exit(2);
  }

  fs.mkdirSync(args.outDir, { recursive: true });
  const report = validateDesktopDir(args.desktopDir, args);
  const reportPath = path.join(args.outDir, "deliverables-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  for (const slug of TARGET_SHORTS) {
    const s = report.shorts[slug];
    console.log(`[${s.ok ? "PASS" : "FAIL"}] ${slug}${s.sheetPath ? ` (sheet: ${s.sheetPath})` : ""}`);
    for (const e of s.errors) console.error(`  ✗ ${e}`);
  }
  const extraErrors = report.errors.filter(
    (e) => !Object.values(report.shorts).some((s) => s.errors.includes(e)),
  );
  for (const e of extraErrors) console.error(`  ✗ ${e}`);
  console.log(`\nReport written to: ${reportPath}`);
  process.exit(report.ok ? 0 : 1);
}
