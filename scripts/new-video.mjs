#!/usr/bin/env node
/**
 * Scaffold a new film from templates/video and register it in src/registry.ts.
 *
 *   npm run new -- "The Title"
 *
 * This script never renders. It only creates source files.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new -- "The Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^\w\s-]/g, "")
  .trim()
  .replace(/[\s_]+/g, "-")
  .replace(/-+/g, "-");

if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error(`Could not turn "${title}" into a kebab-case folder name.`);
  process.exit(1);
}

const camel = slug
  .split("-")
  .map((part, i) => (i === 0 ? part : part[0].toUpperCase() + part.slice(1)))
  .join("");

const videoDir = path.join(root, "src", "videos", slug);
const templateDir = path.join(root, "templates", "video");
const castTemplatePath = path.join(root, "templates", "cast", "characters.tsx");

if (fs.existsSync(videoDir)) {
  console.error(`src/videos/${slug}/ already exists. Pick another title or delete it first.`);
  process.exit(1);
}

const templateFiles = fs
  .readdirSync(templateDir)
  .filter((file) => file.endsWith(".tsx"));

if (templateFiles.length === 0) {
  console.error("templates/video/ has no .tsx files. Restore the template before scaffolding.");
  process.exit(1);
}

const codeTitle = title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

fs.mkdirSync(videoDir, { recursive: true });
for (const file of templateFiles) {
  const source = fs.readFileSync(path.join(templateDir, file), "utf8");
  const next = source
    .replaceAll("__TITLE__", codeTitle)
    .replaceAll("__ID__", slug)
    .replaceAll("__SLUG__", slug)
    .replaceAll("__CAMEL__", camel);
  fs.writeFileSync(path.join(videoDir, file), next);
}

// The duo + extra cast template travels with every new film. It is a separate
// folder because it is useful to story films, not just the night-ward template.
let copied = templateFiles.length;
if (fs.existsSync(castTemplatePath)) {
  const source = fs.readFileSync(castTemplatePath, "utf8");
  const next = source
    .replaceAll("__TITLE__", codeTitle)
    .replaceAll("__ID__", slug)
    .replaceAll("__SLUG__", slug)
    .replaceAll("__CAMEL__", camel);
  fs.writeFileSync(path.join(videoDir, "characters.tsx"), next);
  copied += 1;
}

// --- register the film -----------------------------------------------------
const registryPath = path.join(root, "src", "registry.ts");
let registry = fs.existsSync(registryPath)
  ? fs.readFileSync(registryPath, "utf8")
  : "export const FILMS = [];\n";

const importLine = `import { film as ${camel} } from "./videos/${slug}/film";`;

if (!registry.includes(importLine)) {
  const importRe = /^import .*;$/gm;
  let last = null;
  let match;
  while ((match = importRe.exec(registry))) last = match;

  if (last) {
    const end = last.index + last[0].length;
    registry = registry.slice(0, end) + "\n" + importLine + registry.slice(end);
  } else {
    registry = importLine + "\n\n" + registry;
  }
}

const filmsRe = /export const FILMS = \[([\s\S]*?)\];/;
if (!filmsRe.test(registry)) {
  console.error("Could not find `export const FILMS = [...];` in src/registry.ts.");
  process.exit(1);
}

registry = registry.replace(filmsRe, (_full, inner) => {
  const ids = inner
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (!ids.includes(camel)) ids.push(camel);
  return `export const FILMS = [\n${ids.map((id) => `  ${id},`).join("\n")}\n];`;
});

fs.writeFileSync(registryPath, registry);

console.log(`Created src/videos/${slug}/ (${copied} files).`);
console.log(`Registered ${camel} in src/registry.ts.`);
console.log("");
console.log("Next:");
console.log("  0. Write the narration first: docs/NARRATION-RULES.md.");
console.log("  1. Build world.tsx: set, lights, GodRay/LightPool/Glow/Dust.");
console.log("  2. Cast the duo in characters.tsx: two leads who contrast, extras repeat.");
console.log("  3. Copy scene1.tsx to scene2.tsx... and add them to film.tsx.");
console.log("  4. Match the camera across every scene boundary.");
console.log("  5. npm run typecheck && npm run check");
console.log("");
console.log("Do not render on the user's laptop without explicit permission.");
