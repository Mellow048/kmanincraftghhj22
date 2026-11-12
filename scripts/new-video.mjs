#!/usr/bin/env node
/**
 * Scaffold a new film and register it in src/registry.ts.
 *
 *   npm run new -- "The Title"                                    the base film: a 20-second cinematic short
 *   npm run new -- "In This Town, Nobody Rang the Bell" --topic in-this-town
 *                                                                 a film of a TOPIC, from that topic's own starter
 *
 * A topic (Topics/<Folder>/) is a kind of video with its own rules, kit and starter.
 * A title that opens the way a topic opens is refused without --topic: building an
 * "In This Town" film from the 20-second template is how a film ends up with the
 * name of the format and none of the format.
 *
 * This script never renders. It only creates source files.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
let topicId = null;
const words = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--topic") topicId = args[++i] ?? "";
  else if (args[i].startsWith("--topic=")) topicId = args[i].slice("--topic=".length);
  else words.push(args[i]);
}
const title = words.join(" ").trim();

/** Every Topics/<Folder>/topic.json. */
function loadTopics() {
  const dir = path.join(root, "Topics");
  if (!fs.existsSync(dir)) return [];
  const topics = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name, "topic.json");
    if (!entry.isDirectory() || !fs.existsSync(file)) continue;
    try {
      topics.push(JSON.parse(fs.readFileSync(file, "utf8")));
    } catch {
      console.error(`Topics/${entry.name}/topic.json is not valid JSON.`);
      process.exit(1);
    }
  }
  return topics;
}
const topics = loadTopics();
const topicList = topics.map((t) => `  --topic ${t.id}    ${t.name} (${t.folder}/README.md)`).join("\n");

if (!title) {
  console.error('Usage: npm run new -- "The Title" [--topic <id>]');
  if (topicList) console.error(`\nTopics:\n${topicList}`);
  process.exit(1);
}

let topic = null;
if (topicId !== null) {
  topic = topics.find((t) => t.id === topicId);
  if (!topic) {
    console.error(`No topic "${topicId}".${topicList ? `\n\nTopics:\n${topicList}` : " There is no Topics/ folder."}`);
    process.exit(1);
  }
} else {
  const belongs = topics.find((t) => t.film?.opensWith && title.toLowerCase().startsWith(t.film.opensWith.toLowerCase()));
  if (belongs) {
    console.error(`"${title}" opens "${belongs.film.opensWith}…": it is a film of the topic "${belongs.name}".`);
    console.error(`That topic has its own length, script shape, shots, sound and kit. Read ${belongs.folder}/README.md, then run:\n`);
    console.error(`  npm run new -- "${title}" --topic ${belongs.id}\n`);
    process.exit(1);
  }
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
if (fs.existsSync(videoDir)) {
  console.error(`src/videos/${slug}/ already exists. Pick another title or delete it first.`);
  process.exit(1);
}

const codeTitle = title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
/** Fill a template. In code the title sits inside a string, so its quotes are escaped. */
const fill = (source, isCode) =>
  source
    .replaceAll("__TITLE__", isCode ? codeTitle : title)
    .replaceAll("__ID__", slug)
    .replaceAll("__SLUG__", slug)
    .replaceAll("__CAMEL__", camel);

let copied = 0;
if (topic) {
  // ---- a topic film: everything in the topic's own starter folder ----------
  const templateDir = path.join(root, topic.template ?? path.join(topic.folder, "template"));
  if (!fs.existsSync(templateDir)) {
    console.error(`The topic "${topic.id}" has no starter (${path.relative(root, templateDir)}/). Read ${topic.folder}/README.md and build from its model film.`);
    process.exit(1);
  }
  fs.mkdirSync(videoDir, { recursive: true });
  for (const file of fs.readdirSync(templateDir)) {
    if (!/\.(tsx|ts|md|json)$/.test(file)) continue;
    fs.writeFileSync(path.join(videoDir, file), fill(fs.readFileSync(path.join(templateDir, file), "utf8"), /\.tsx?$/.test(file)));
    copied += 1;
  }
} else {
  // ---- the base film: templates/video + templates/cast ---------------------
  const templateDir = path.join(root, "templates", "video");
  const castTemplatePath = path.join(root, "templates", "cast", "characters.tsx");
  const templateFiles = fs.readdirSync(templateDir).filter((file) => file.endsWith(".tsx"));
  if (templateFiles.length === 0) {
    console.error("templates/video/ has no .tsx files. Restore the template before scaffolding.");
    process.exit(1);
  }
  if (!fs.existsSync(castTemplatePath)) {
    console.error("templates/cast/characters.tsx is missing. Restore the cast template before scaffolding.");
    process.exit(1);
  }
  fs.mkdirSync(videoDir, { recursive: true });
  for (const file of templateFiles) {
    fs.writeFileSync(path.join(videoDir, file), fill(fs.readFileSync(path.join(templateDir, file), "utf8"), true));
    copied += 1;
  }
  // Optional narration script. Copying `narration.md` gives every film a place
  // to write the spoken lines, and `npm run check` lints the ```narration block.
  const narrationTemplatePath = path.join(templateDir, "narration.md");
  if (fs.existsSync(narrationTemplatePath)) {
    fs.writeFileSync(path.join(videoDir, "narration.md"), fill(fs.readFileSync(narrationTemplatePath, "utf8"), false));
    copied += 1;
  }
  // The duo + extra cast template travels with every new base film.
  fs.writeFileSync(path.join(videoDir, "characters.tsx"), fill(fs.readFileSync(castTemplatePath, "utf8"), true));
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

if (topic) {
  // A story film is cut to its script. Until a voice is recorded the timing is a guess from the word count,
  // and it must exist for the film to compile.
  const estimate = `python3 scripts/narration.py build ${slug} --estimate`;
  const run = spawnSync("python3", ["scripts/narration.py", "build", slug, "--estimate"], { cwd: root, encoding: "utf8" });
  if (run.status === 0) console.log(`Wrote src/videos/${slug}/timing.json (estimated from the placeholder script).`);
  else console.log(`python3 was not found, so timing.json is the starter's own. After you change narration.md, run:\n  ${estimate}`);
  console.log("");
  console.log(`This is a film of the topic "${topic.name}". Its rules are in ${topic.folder}/README.md: read it first.`);
  console.log("The order of work, and each step needs the owner's yes before the next:");
  console.log(`  1. IDEAS, then the SCRIPT in narration.md (${topic.folder}/SCRIPT.md). Stop. The owner approves the script.`);
  console.log(`  2. VOICE: python3 scripts/narration.py clips ${slug}, record each clip, then narration.py build ${slug}.`);
  console.log(`  3. SHOTS: one per script line (${topic.folder}/SHOTS.md), from the pack (${topic.pack ?? topic.folder}).`);
  console.log(`     Review with: node scripts/shots.mjs ${slug}`);
  if (topic.sound?.required) {
    console.log(`  4. SOUND: python3 scripts/sound.py draft ${slug}, fill in sound.json (${topic.sound.guide}),`);
    console.log(`     then python3 scripts/sound.py build ${slug}, and point film.tsx at the mix.`);
  }
  console.log("  5. npm run typecheck && npm run check, then render (AGENTS.md §10).");
  // The topic's reference film: a finished film of ours that the owner chose. Older topic files only list `models`.
  const model = topic.reference?.film ?? Object.keys(topic.models ?? {}).find((key) => key !== "note");
  if (model) {
    console.log(`\nThe reference film. Copy how it is BUILT, never its story: src/videos/${model}/`);
    if (topic.reference?.page) console.log(`Its page, with its shape and its sound measured: ${topic.reference.page}/README.md`);
  }
} else {
  console.log("Next:");
  console.log("  0. Write the narration first in narration.md: docs/NARRATION-RULES.md.");
  console.log("  1. Build world.tsx: set, lights, GodRay/LightPool/Glow/Dust.");
  console.log("  2. Cast the duo in characters.tsx: two leads who contrast, extras repeat.");
  console.log("  3. Copy scene1.tsx to scene2.tsx... and add them to film.tsx.");
  console.log("  4. Match the camera across every scene boundary.");
  console.log("  5. npm run typecheck && npm run check");
  if (topicList) console.log(`\nThis is the BASE film: 20 seconds, one continuous camera. For a film of a topic, use:\n${topicList}`);
}
console.log("");
console.log("Do not render on the user's laptop without explicit permission.");
