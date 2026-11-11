/**
 * Lint for STORY films: narrated films cut to their voice (docs/STORY-FILMS.md).
 * A film opts in by naming a topic whose topic.json says `"profile": "story"`.
 *
 * The base contract in check-films.mjs still covers every other film.
 */
import fs from "node:fs";
import path from "node:path";

/** Find Topics/<Folder>/topic.json by its id. */
export function loadTopic(root, topicId) {
  const topicsDir = path.join(root, "Topics");
  if (!fs.existsSync(topicsDir)) return null;
  for (const entry of fs.readdirSync(topicsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(topicsDir, entry.name, "topic.json");
    if (!fs.existsSync(file)) continue;
    try {
      const topic = JSON.parse(fs.readFileSync(file, "utf8"));
      if (topic.id === topicId) return topic;
    } catch {
      /* a broken topic.json is reported by the caller as "unknown topic" */
    }
  }
  return null;
}

const wordsOf = (text) => text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));
const median = (list) => [...list].sort((a, b) => a - b)[Math.floor(list.length / 2)];

/** The ```narration block as clips and cues. */
export function readScript(raw) {
  const fence = raw.match(/```narration\s*\n([\s\S]*?)```/);
  if (!fence) return null;
  const cues = [];
  let clips = 0;
  for (const rawLine of fence[1].split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    if (/^#\s*clip\s+\S+/.test(line)) {
      clips++;
      continue;
    }
    if (line.startsWith("#") || line.startsWith(">")) continue;
    const match = line.match(/^\[([^\]]+)\]\s*(.+)$/);
    if (!match) return { error: `cannot read script line: "${line}"` };
    cues.push({ id: match[1].trim(), text: match[2].trim() });
  }
  return { cues, clips };
}

export function checkStoryFilm({ root, slug, dir, film, topic, fail, info, TWO_D, BANNED_PHRASES }) {
  const lim = topic.film ?? {};
  const tag = `${slug} [${topic.id}]`;

  // ---- 1. the script ------------------------------------------------------
  const narrationPath = path.join(dir, "narration.md");
  if (!fs.existsSync(narrationPath)) {
    fail(`${tag}: missing narration.md. A story film is cut to its script.`);
    return;
  }
  const script = readScript(fs.readFileSync(narrationPath, "utf8"));
  if (!script) {
    fail(`${tag}: narration.md has no \`\`\`narration block.`);
    return;
  }
  if (script.error) {
    fail(`${tag}: narration.md: ${script.error}`);
    return;
  }
  const cues = script.cues;
  if (cues.length === 0) {
    fail(`${tag}: narration.md has no [cue] lines.`);
    return;
  }

  const ids = new Set();
  for (const cue of cues) {
    if (ids.has(cue.id)) fail(`${tag}: cue id "${cue.id}" is used twice in narration.md`);
    ids.add(cue.id);
  }

  const totalWords = cues.reduce((n, cue) => n + wordsOf(cue.text).length, 0);
  const clean = (text) => text.replace(/^["'“”`]+/, "").trim().toLowerCase();
  if (lim.opensWith && !clean(cues[0].text).startsWith(lim.opensWith.toLowerCase())) {
    fail(`${tag}: the first line must start "${lim.opensWith}". It starts "${cues[0].text}".`);
  }
  if (lim.lastLineContains && !cues[cues.length - 1].text.toLowerCase().includes(lim.lastLineContains.toLowerCase())) {
    fail(`${tag}: the last line must be the "${lim.lastLineContains}" line. It is "${cues[cues.length - 1].text}".`);
  }
  for (const cue of cues) {
    const n = wordsOf(cue.text).length;
    if (lim.maxWordsPerShot && n > lim.maxWordsPerShot) {
      info(`${tag}: line [${cue.id}] is ${n} words. Over ${lim.maxWordsPerShot} is two shots: split it.`);
    }
    if (/\d/.test(cue.text)) {
      info(`${tag}: line [${cue.id}] has digits. Spell numbers out so the voice and the captions agree.`);
    }
    const lower = cue.text.toLowerCase();
    for (const phrase of BANNED_PHRASES) {
      if (lower.includes(phrase)) info(`${tag}: line [${cue.id}] uses a banned phrase "${phrase}".`);
    }
  }
  if (lim.words && (totalWords < lim.words[0] || totalWords > lim.words[1])) {
    info(`${tag}: the script is ${totalWords} words. The topic asks for ${lim.words[0]}–${lim.words[1]}.`);
  }

  // ---- 2. the timing ------------------------------------------------------
  const timingPath = path.join(dir, "timing.json");
  if (!fs.existsSync(timingPath)) {
    fail(`${tag}: missing timing.json. Run: python3 scripts/narration.py build ${slug} --estimate`);
    return;
  }
  let timing;
  try {
    timing = JSON.parse(fs.readFileSync(timingPath, "utf8"));
  } catch {
    fail(`${tag}: timing.json is not valid JSON. Rebuild it; never edit it by hand.`);
    return;
  }
  const stale =
    timing.cues.length !== cues.length ||
    timing.cues.some((cue, i) => cue.id !== cues[i].id || cue.text !== cues[i].text);
  if (stale) {
    fail(`${tag}: narration.md changed after timing.json was built. Run: python3 scripts/narration.py build ${slug}`);
    return;
  }
  if (timing.estimated) {
    info(`${tag}: timing is ESTIMATED from words per minute. Record the voice and rebuild before the final render.`);
  }

  const seconds = timing.duration;
  if (lim.hardMaxSeconds && seconds > lim.hardMaxSeconds) {
    fail(`${tag}: ${seconds.toFixed(1)}s is over the hard limit of ${lim.hardMaxSeconds}s.`);
  } else if (lim.seconds && (seconds < lim.seconds[0] || seconds > lim.seconds[1])) {
    info(`${tag}: ${seconds.toFixed(1)}s is outside the topic's ${lim.seconds[0]}–${lim.seconds[1]}s.`);
  }
  const durations = timing.cues.map((cue) => cue.end - cue.start);
  if (lim.shotSeconds) {
    timing.cues.forEach((cue, i) => {
      if (durations[i] > lim.shotSeconds[1] + 1e-6) {
        fail(`${tag}: shot [${cue.id}] runs ${durations[i].toFixed(1)}s. Nothing holds over ${lim.shotSeconds[1]}s: split the line.`);
      } else if (durations[i] < lim.shotSeconds[0] - 1e-6) {
        info(`${tag}: shot [${cue.id}] is only ${durations[i].toFixed(2)}s. Too short to read: merge it with a neighbour.`);
      }
    });
  }
  const mid = median(durations);
  if (lim.medianShotSeconds && (mid < lim.medianShotSeconds[0] || mid > lim.medianShotSeconds[1])) {
    info(`${tag}: median shot is ${mid.toFixed(2)}s. The topic cuts at ${lim.medianShotSeconds[0]}–${lim.medianShotSeconds[1]}s.`);
  }
  const pace = timing.wordsPerMinute;
  if (lim.wordsPerMinute && (pace < lim.wordsPerMinute[0] || pace > lim.wordsPerMinute[1])) {
    info(`${tag}: the voice runs at ${Math.round(pace)} words/min. The topic asks for ${lim.wordsPerMinute[0]}–${lim.wordsPerMinute[1]}.`);
  }

  // ---- 3. the film file ---------------------------------------------------
  if (lim.captions && !/\bcaptions\s*:/.test(film)) {
    fail(`${tag}: film.tsx has no \`captions\`. This topic puts every word on screen.`);
  }
  if (!/\baudio\s*:/.test(film)) {
    info(`${tag}: film.tsx has no \`audio\`. The film is silent until the narration track is wired in.`);
  }
  if (TWO_D.test(film)) fail(`${tag}: film.tsx contains a 2D overlay.`);

  const sceneList = film.match(/scenes:\s*\[([\s\S]*?)\]/)?.[1] ?? "";
  const sceneNames = [...sceneList.matchAll(/[A-Za-z_]\w*/g)].map((m) => m[0]);
  if (sceneNames.length === 0) {
    fail(`${tag}: film.tsx lists no scenes.`);
    return;
  }

  // ---- 4. the scenes: one shot per script line ----------------------------
  const used = [];
  for (const name of sceneNames) {
    const from = film.match(new RegExp(`import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from\\s*["']\\./([^"']+)["']`))?.[1];
    const scenePath = path.join(dir, `${from ?? name}.tsx`);
    if (!fs.existsSync(scenePath)) {
      fail(`${tag}: scene "${name}" is in film.tsx but ${path.basename(scenePath)} does not exist`);
      continue;
    }
    const scene = fs.readFileSync(scenePath, "utf8");
    const label = `${slug}/${path.basename(scenePath, ".tsx")}`;
    if (TWO_D.test(scene)) fail(`${label}: 2D overlay found. Build the object in 3D.`);
    if (!/\bstoryScene\s*\(/.test(scene)) fail(`${label}: a story film's scenes are built with storyScene().`);
    if (!/^\s*id:\s*["']scene\d+["']/m.test(scene)) fail(`${label}: scene id must be sceneN`);

    const marks = [...scene.matchAll(/\bcue:\s*["']([^"']+)["']/g)];
    if (marks.length === 0) fail(`${label}: no shots found. Each shot needs \`cue: "…"\`.`);
    marks.forEach((mark, i) => {
      const body = scene.slice(mark.index, i + 1 < marks.length ? marks[i + 1].index : scene.length);
      const shot = `${label} [${mark[1]}]`;
      used.push(mark[1]);

      const note = body.match(/note:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`([^`]*)`)/);
      const noteText = note ? (note[1] ?? note[2] ?? note[3]) : "";
      if (noteText.trim().length < 24) fail(`${shot}: note must say why this picture, for these words (24+ chars)`);

      const recipe = /\.\.\.cam\.(push|orbit|pan|truck|top)\s*\(/.test(body);
      const literal = /(^|\n)\s*from:\s*\[/.test(body) && /(^|\n)\s*target:\s*\[/.test(body);
      if (!recipe && !literal) fail(`${shot}: no camera. Spread a cam.* recipe, or give from[] and target[].`);
      if (!recipe && !/(^|\n)\s*(to|path|targetTo|targetPath|arc|shake):/.test(body)) {
        fail(`${shot}: static shot. Every shot in a story film moves.`);
      }
      if (!/\bstage\s*:/.test(body)) fail(`${shot}: nothing on stage. Add \`stage: (t) => …\`.`);
      for (const fov of body.matchAll(/\bfov(?:To)?:\s*([\d.]+)/g)) {
        if (Number(fov[1]) > 62) info(`${shot}: fov ${fov[1]}° is very wide. People turn small; 30–46° fills a phone.`);
      }
    });
  }

  const want = cues.map((cue) => cue.id);
  const usedSet = new Set(used);
  const missing = want.filter((id) => !usedSet.has(id));
  const unknown = used.filter((id) => !ids.has(id));
  for (const id of unknown) fail(`${tag}: a shot uses cue "${id}", which is not in narration.md`);
  const seen = new Set();
  for (const id of used) {
    if (seen.has(id)) fail(`${tag}: cue "${id}" has two shots. One line, one shot.`);
    seen.add(id);
  }
  if (missing.length > 0) {
    const built = want.length - missing.length;
    // Shots must be built in script order; a film in progress may stop early, but not skip.
    const firstMissing = want.indexOf(missing[0]);
    const skipped = used.some((id) => want.indexOf(id) > firstMissing);
    if (skipped) {
      fail(`${tag}: script line [${missing[0]}] has no shot, but later lines do. Lines cannot be skipped.`);
    } else {
      info(`${tag}: IN PROGRESS — ${built} of ${want.length} script lines have a shot. Next: [${missing[0]}] "${cues[firstMissing].text}"`);
    }
  } else {
    const order = used.filter((id) => ids.has(id));
    const wrong = order.findIndex((id, i) => id !== want[i]);
    if (wrong >= 0) fail(`${tag}: shots are out of script order at [${order[wrong]}] (expected [${want[wrong]}])`);
  }

  // ---- 5. the world -------------------------------------------------------
  const worldPath = path.join(dir, "world.tsx");
  if (!fs.existsSync(worldPath)) {
    fail(`${tag}: missing world.tsx`);
  } else {
    const world = fs.readFileSync(worldPath, "utf8");
    for (const required of ["GodRay", "LightPool", "Glow", "Dust"]) {
      if (!new RegExp(`<${required}\\b`).test(world)) {
        fail(`${tag}: world.tsx is missing ${required}. Atmosphere is mandatory.`);
      }
    }
    if (!/<Zone\b/.test(world)) info(`${tag}: world.tsx has no <Zone>. A long film should not draw every set in every shot.`);
    if (TWO_D.test(world)) fail(`${tag}: world.tsx contains a 2D overlay`);
  }

  info(
    `${tag}: ${used.length}/${cues.length} shots, ${totalWords} words, ${seconds.toFixed(1)}s, ` +
      `${Math.round(pace)} words/min, median shot ${mid.toFixed(2)}s${timing.estimated ? " (timing estimated)" : ""}`,
  );
}
