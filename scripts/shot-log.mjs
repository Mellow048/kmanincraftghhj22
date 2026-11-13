#!/usr/bin/env node
/**
 * A film written down: every shot, when it starts, how long it holds, the words heard over it, where it plays,
 * how the camera moves, and WHY this picture for these words (the shot's own `note`).
 *
 * A finished film is fourteen to eighteen scene files. This is the same film on one page, for the agent who has
 * to build the next one. It is what `shot-log.md` in a topic's reference folder is made with.
 *
 *   node scripts/shot-log.mjs in-this-town-same-face                    the log, as markdown, on stdout
 *   node scripts/shot-log.mjs in-this-town-same-face --out log.md       … into a file
 *   node scripts/shot-log.mjs in-this-town-same-face --shape            its shape only: the beats and the numbers
 *
 * It reads `src/videos/<film>/film.tsx` (the order of the scenes), each `sceneN.tsx` (the shots) and `timing.json`
 * (the voice). Nothing is rendered. It works on a film of cuts (`storyScene`); a flown film (`flightScene`) lists
 * the stop of each line where the camera recipe would be.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const film = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--out");
const outAt = args.indexOf("--out");
const outFile = outAt >= 0 ? args[outAt + 1] : null;
const shapeOnly = args.includes("--shape");

if (!film) {
  console.error("Usage: node scripts/shot-log.mjs <film> [--out file.md] [--shape]");
  process.exit(1);
}
const dir = path.join(root, "src", "videos", film);
const read = (name) => {
  const file = path.join(dir, name);
  if (!fs.existsSync(file)) {
    console.error(`shot-log: ${path.relative(root, file)} does not exist.`);
    process.exit(1);
  }
  return fs.readFileSync(file, "utf8");
};

const timing = JSON.parse(read("timing.json"));
const cues = new Map(timing.cues.map((c) => [c.id, c]));
const filmSource = read("film.tsx");
const title = filmSource.match(/\btitle:\s*"((?:[^"\\]|\\.)*)"/)?.[1] ?? film;
/** The look the whole film is lit with. A shot is listed with a look only when it has ANOTHER one. */
const filmLook = filmSource.match(/\blook:\s*"([^"]+)"/)?.[1] ?? "";

// ---- the shots, scene by scene ----------------------------------------------------------------------

const STRING = /(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`([^`]*)`)/.source;
const text = (m) => (m ? (m[1] ?? m[2] ?? m[3] ?? "").replace(/\\(["'`\\])/g, "$1").replace(/\\n/g, " ") : "");
const words = (s) => s.split(/\s+/).filter(Boolean).length;

/**
 * A film may name its zones and looks once, in kit.tsx (`export const ZONE = { day: "village+calm" }`,
 * `export const CHAOS = "overworld-storm"`), and a shot then says `zone: ZONE.day`. Collect those names, so the
 * log can say where the shot plays and not what the constant is called.
 */
const named = (source, into = new Map()) => {
  for (const m of source.matchAll(/(?:export\s+)?const\s+([A-Za-z_]\w*)\s*(?::[^=\n]+)?=\s*"([^"\n]*)"/g)) into.set(m[1], m[2]);
  for (const m of source.matchAll(/(?:export\s+)?const\s+([A-Za-z_]\w*)\s*(?::[^=\n]+)?=\s*\{([^{}]*)\}/g)) {
    for (const field of m[2].matchAll(/(\w+)\s*:\s*"([^"\n]*)"/g)) into.set(`${m[1]}.${field[1]}`, field[2]);
  }
  return into;
};
const kitNames = fs.existsSync(path.join(dir, "kit.tsx")) ? named(read("kit.tsx")) : new Map();

const sceneList = filmSource.match(/scenes:\s*\[([\s\S]*?)\]/)?.[1] ?? "";
const sceneNames = [...sceneList.matchAll(/[A-Za-z_]\w*/g)].map((m) => m[0]);

const beats = [];
for (const name of sceneNames) {
  const from = filmSource.match(new RegExp(`import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*["']\\./([^"']+)["']`))?.[1];
  const source = read(`${from ?? name}.tsx`);
  const beatTitle = text(source.match(new RegExp(`\\btitle:\\s*${STRING}`))) || name;
  const names = named(source, new Map(kitNames));
  const marks = [...source.matchAll(/\bcue:\s*["']([^"']+)["']/g)];
  const shots = marks.map((mark, i) => {
    const body = source.slice(mark.index, i + 1 < marks.length ? marks[i + 1].index : source.length);
    // What a shot says about itself comes before its `stage`. Look there first: staging code has words of its own.
    const head = body.split(/\bstage\s*:/)[0];
    const pick = (re) => head.match(re) ?? body.match(re);
    const cue = cues.get(mark[1]);
    if (!cue) {
      console.error(`shot-log: ${from ?? name}.tsx uses cue "${mark[1]}", which is not in timing.json. Rebuild the timing.`);
      process.exit(1);
    }
    const recipe = pick(/\.\.\.cam\.(\w+)\s*\(/)?.[1];
    const stopName = pick(/(?:^|[\s{,])to:\s*(STOPS\.\w+|near\([^)]*\)|stop\([^)]*\))/)?.[1];
    const camera = recipe
      ? `\`cam.${recipe}\``
      : stopName
        ? `to \`${stopName.replace(/\s+/g, " ")}\`${/(?:^|[\s{,])cut:\s*true/.test(head) ? " (a cut)" : ""}`
        : /(?:^|[\s{,])path:/.test(head)
          ? "`path`"
          : "`from` → `to`";
    // A value is a string, or a name for one (`ZONE.day`): give the string when the film says what the name stands for.
    const value = (key) => {
      const literal = pick(new RegExp(`\\b${key}:\\s*${STRING}`));
      if (literal) return text(literal);
      const name = pick(new RegExp(`\\b${key}:\\s*([A-Za-z_][\\w.]*)`))?.[1];
      return name ? (names.get(name) ?? `\`${name}\``) : "";
    };
    const zone = value("zone");
    const look = value("look");
    // A line cut into several shots: `cut: 1.3` (or a named number) is where in the line this shot starts.
    const cutRaw = head.match(/(?:^|\n)\s*cut:\s*([\w.]+)/)?.[1];
    const cutNamed = cutRaw && Number.isNaN(Number(cutRaw)) ? source.match(new RegExp(`const\\s+${cutRaw}\\s*=\\s*([\\d.]+)`))?.[1] : cutRaw;
    return {
      cut: cutNamed === undefined || cutRaw === "true" ? 0 : Number(cutNamed) || 0,
      cue: mark[1],
      start: cue.start,
      end: cue.end,
      text: cue.text,
      camera,
      recipe: recipe ?? (stopName ? "flight" : "hand"),
      where: [zone, look === filmLook ? "" : look].filter(Boolean).join(", "),
      note: text(pick(new RegExp(`\\bnote:\\s*${STRING}`))),
    };
  });
  shots.forEach((shot, i) => {
    const before = shots[i - 1];
    if (shot.cut > 0 && before && before.cue.split(" +")[0] === shot.cue) {
      shot.start += shot.cut;
      before.end = shot.start;
      shot.text = "";
      shot.cue = `${shot.cue} +${shot.cut}s`;
    }
  });
  // `cue` of a cut shot now carries its offset: compare on the id alone.
  for (let i = shots.length - 1; i > 0; i--) {
    const id = (c) => c.split(" +")[0];
    if (shots[i].text === "" && id(shots[i - 1].cue) === id(shots[i].cue) && shots[i - 1].end > shots[i].start) shots[i - 1].end = shots[i].start;
  }
  if (shots.length > 0) beats.push({ title: beatTitle, shots });
}

const all = beats.flatMap((b) => b.shots);
if (all.length === 0) {
  console.error(`shot-log: no shots found in ${film}.`);
  process.exit(1);
}

// ---- numbers ----------------------------------------------------------------------------------------

const clock = (t) => {
  const tenths = Math.round(t * 10);
  return `${Math.floor(tenths / 600)}:${((tenths % 600) / 10).toFixed(1).padStart(4, "0")}`;
};
const cell = (s) => s.replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ").trim();
const total = timing.duration ?? all[all.length - 1].end;
const totalWords = all.reduce((n, s) => n + words(s.text), 0);
const holds = all.map((s) => s.end - s.start).sort((a, b) => a - b);
const median = holds.length % 2 ? holds[(holds.length - 1) / 2] : (holds[holds.length / 2 - 1] + holds[holds.length / 2]) / 2;
const span = (b) => b.shots[b.shots.length - 1].end - b.shots[0].start;
const beatWords = (b) => b.shots.reduce((n, s) => n + words(s.text), 0);

const are = (n) => `${n} ${n === 1 ? "is" : "are"}`;

// A film still being built: say so, or its numbers read like the shape of a film.
const unfinished =
  all.length < timing.cues.length
    ? `**NOT FINISHED: ${all.length} of ${timing.cues.length} lines of the script have a shot.** The numbers below are of the shots that exist; the length is the whole voice.`
    : null;

const shape = () => {
  const lines = [];
  if (unfinished) lines.push(unfinished, "");
  lines.push(`${all.length} shots, ${totalWords} words, ${clock(total)} (${total.toFixed(1)} s), ${Math.round(timing.wordsPerMinute ?? (totalWords / total) * 60)} words a minute.`);
  lines.push("");
  lines.push("| # | Beat | Starts | Seconds | Words | Shots |");
  lines.push("|---|---|---|---|---|---|");
  beats.forEach((b, i) => lines.push(`| ${i + 1} | ${cell(b.title)} | ${clock(b.shots[0].start)} | ${span(b).toFixed(1)} | ${beatWords(b)} | ${b.shots.length} |`));
  lines.push("");
  const count = (name) => all.filter((s) => s.recipe === name).length;
  const kinds = [...new Set(all.map((s) => s.recipe))].sort((a, b) => count(b) - count(a));
  lines.push(
    `- Shots: the median holds ${median.toFixed(2)} s, the shortest ${holds[0].toFixed(2)} s, the longest ${holds[holds.length - 1].toFixed(2)} s. ` +
      `${are(holds.filter((h) => h < 1).length)} under a second and ${are(holds.filter((h) => h > 3).length)} over three. ` +
      `About ${(totalWords / all.length).toFixed(1)} words to a picture.`,
  );
  lines.push(`- Camera: ${kinds.map((k) => `${count(k)} ${k === "hand" ? "set by hand" : k === "flight" ? "flown to a stop" : `\`cam.${k}\``}`).join(", ")}.`);
  const place = (s) => s.where.split(", ")[0] || "(no zone)";
  const places = [...new Set(all.map(place))];
  lines.push(`- Places: ${places.map((p) => `${p} ${all.filter((s) => place(s) === p).length}`).join(", ")} shots.`);
  return lines.join("\n");
};

const log = () => {
  const lines = [];
  lines.push(`# Shot log: ${title}`);
  lines.push("");
  lines.push("Every shot of the film: when it starts, how long it holds, the words heard over it, where it plays, how the");
  lines.push("camera moves, and why this picture for these words (the shot's own `note`).");
  lines.push("");
  lines.push(`Made by \`node scripts/shot-log.mjs ${film}\` from \`src/videos/${film}/scene*.tsx\` and \`timing.json\`. ${all.length} shots in ${clock(total)}.`);
  if (unfinished) lines.push("", unfinished);
  let n = 0;
  beats.forEach((b, i) => {
    lines.push("");
    lines.push(`## ${i + 1}. ${b.title}  (${clock(b.shots[0].start)}, ${span(b).toFixed(1)} s, ${beatWords(b)} words, ${b.shots.length} shots)`);
    lines.push("");
    lines.push("| # | Starts | Holds | Cue | Words | Where | Camera | Why this picture |");
    lines.push("|---|---|---|---|---|---|---|---|");
    for (const s of b.shots) {
      n++;
      lines.push(`| ${n} | ${clock(s.start)} | ${(s.end - s.start).toFixed(2)} s | \`${s.cue}\` | ${cell(s.text)} | ${cell(s.where)} | ${s.camera} | ${cell(s.note)} |`);
    }
  });
  return lines.join("\n") + "\n";
};

const result = shapeOnly ? shape() + "\n" : log();
if (outFile) {
  fs.mkdirSync(path.dirname(path.resolve(outFile)), { recursive: true });
  fs.writeFileSync(outFile, result);
  console.log(`wrote ${outFile}: ${all.length} shots in ${beats.length} beats`);
} else {
  process.stdout.write(result);
}
