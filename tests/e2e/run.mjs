#!/usr/bin/env node
/**
 * Unified E2E Test Runner for `tests/e2e/`.
 *
 * Modes:
 *   --self-test       (default) Tier 1+2+3 synthetic/isolated self-tests + Python pipeline tests (passes immediately on HEAD)
 *   --framework       Live M1 framework assertions (F1-F5) against src/engine/, Topics/, scripts/
 *   --server-lore     Live M2 Topics/ServerLore/ audit assertions (F6 + Combo 2, zero ServerLore renders)
 *   --target <slug>   Live F7-F11 + Combo 1 assertions for one target Short
 *   --all             Live assertions across all 5 target Shorts
 *   --json <path>     Write structured run summary JSON to <path>
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { TARGET_SHORTS } from "./lib/schema.mjs";

const E2E_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(E2E_DIR, "../..");

const args = process.argv.slice(2);
const opt = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : null;
};

const hasFramework = args.includes("--framework");
const hasServerLore = args.includes("--server-lore");
const targetSlug = opt("--target");
const hasAll = args.includes("--all");
const jsonOut = opt("--json");

let mode = "self-test";
if (hasFramework) mode = "framework";
else if (hasServerLore) mode = "server-lore";
else if (targetSlug) mode = "target";
else if (hasAll) mode = "all";

if (mode === "target" && !TARGET_SHORTS.includes(targetSlug)) {
  console.error(`Unknown target slug "${targetSlug}". Valid targets:\n  ${TARGET_SHORTS.join("\n  ")}`);
  process.exit(2);
}

const ALL_TEST_FILES = fs
  .readdirSync(E2E_DIR)
  .filter((f) => f.endsWith(".test.mjs"))
  .sort()
  .map((f) => path.join("tests/e2e", f));

function runNodeTests(files, envOverrides = {}) {
  const res = spawnSync(process.execPath, ["--test", ...files], {
    cwd: REPO_ROOT,
    env: { ...process.env, ...envOverrides },
    encoding: "utf8",
  });
  return { status: res.status ?? 1, stdout: res.stdout || "", stderr: res.stderr || "" };
}

function runPythonPipeline() {
  const res = spawnSync("python3", ["tests/e2e/f5_pipeline.py"], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  return { status: res.status ?? 1, stdout: res.stdout || "", stderr: res.stderr || "" };
}

const summary = { mode, target: targetSlug ?? null, ok: true, steps: [] };

if (mode === "self-test") {
  console.log("=== E2E Mode: --self-test ===");
  const py = runPythonPipeline();
  process.stdout.write(py.stdout);
  process.stderr.write(py.stderr);
  summary.steps.push({ name: "f5_pipeline.py", ok: py.status === 0, exitCode: py.status });

  const nodeRes = runNodeTests(ALL_TEST_FILES, { E2E_MODE: "self-test" });
  process.stdout.write(nodeRes.stdout);
  process.stderr.write(nodeRes.stderr);
  summary.steps.push({ name: "node--test", ok: nodeRes.status === 0, exitCode: nodeRes.status });
  summary.ok = py.status === 0 && nodeRes.status === 0;
} else if (mode === "framework") {
  console.log("=== E2E Mode: --framework (M1 Gates F1–F5) ===");
  const files = [
    "tests/e2e/f1_visual.test.mjs",
    "tests/e2e/f2_motion.test.mjs",
    "tests/e2e/f3_camera.test.mjs",
    "tests/e2e/f4_zfight.test.mjs",
    "tests/e2e/f5_gates.test.mjs",
  ];
  const nodeRes = runNodeTests(files, { E2E_MODE: "framework" });
  process.stdout.write(nodeRes.stdout);
  process.stderr.write(nodeRes.stderr);
  summary.steps.push({ name: "framework-gates", ok: nodeRes.status === 0, exitCode: nodeRes.status });
  summary.ok = nodeRes.status === 0;
} else if (mode === "server-lore") {
  console.log("=== E2E Mode: --server-lore (M2 Audit Gates, No Render) ===");
  const files = [
    "tests/e2e/t1_t2_serverlore.test.mjs",
    "tests/e2e/t3_cross_feature.test.mjs",
  ];
  const nodeRes = runNodeTests(files, { E2E_MODE: "server-lore" });
  process.stdout.write(nodeRes.stdout);
  process.stderr.write(nodeRes.stderr);
  summary.steps.push({ name: "server-lore-gates", ok: nodeRes.status === 0, exitCode: nodeRes.status });
  summary.ok = nodeRes.status === 0;
} else if (mode === "target" || mode === "all") {
  const slugs = mode === "target" ? [targetSlug] : TARGET_SHORTS;
  console.log(`=== E2E Mode: --${mode} (${slugs.length} Short(s)) ===`);
  const files = [
    "tests/e2e/t1_t2_targets.test.mjs",
    "tests/e2e/t3_cross_feature.test.mjs",
  ];
  const results = [];
  for (const slug of slugs) {
    console.log(`\n--- Target Short: ${slug} ---`);
    const nodeRes = runNodeTests(files, { E2E_MODE: "target", E2E_TARGET: slug });
    process.stdout.write(nodeRes.stdout);
    process.stderr.write(nodeRes.stderr);
    const passed = nodeRes.status === 0;
    results.push({ slug, ok: passed, exitCode: nodeRes.status });
    summary.steps.push({ name: slug, ok: passed, exitCode: nodeRes.status });
  }
  console.log("\n=== Target Summary ===");
  for (const r of results) {
    console.log(`  [${r.ok ? "PASS" : "FAIL"}] ${r.slug}`);
  }
  summary.ok = results.every((r) => r.ok);
}

if (jsonOut) {
  const outAbs = path.isAbsolute(jsonOut) ? jsonOut : path.join(REPO_ROOT, jsonOut);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  fs.writeFileSync(outAbs, JSON.stringify(summary, null, 2));
}

process.exit(summary.ok ? 0 : 1);
