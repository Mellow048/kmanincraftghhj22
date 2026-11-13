/**
 * Lint for STORY films: narrated films cut to their voice (docs/STORY-FILMS.md).
 * A film opts in by naming a topic whose topic.json says `"profile": "story"`.
 * It may also name a cut (`cut: "short"`): topic.json `cuts.<name>` then replaces
 * the topic's length and word numbers for that film.
 *
 * The base contract in check-films.mjs still covers every other film.
 */
import crypto from "node:crypto";
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

/** Every topic.json under Topics/. */
export function loadTopics(root) {
  const topicsDir = path.join(root, "Topics");
  if (!fs.existsSync(topicsDir)) return [];
  const topics = [];
  for (const entry of fs.readdirSync(topicsDir, { withFileTypes: true })) {
    const file = path.join(topicsDir, entry.name, "topic.json");
    if (!entry.isDirectory() || !fs.existsSync(file)) continue;
    try {
      topics.push(JSON.parse(fs.readFileSync(file, "utf8")));
    } catch {
      /* reported elsewhere */
    }
  }
  return topics;
}

const sha1 = (data) => crypto.createHash("sha1").update(data).digest("hex");
/** The same hashes scripts/sound.py writes into sound.lock.json. Text is hashed without its line endings, so git cannot change it. */
const textHash = (file) => sha1(Buffer.from(fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n").trim(), "utf8"));
const fileHash = (file) => sha1(fs.readFileSync(file));

/**
 * THE SOUND. A story film is not finished until it has music, beds and effects under the voice:
 * a sound sheet (sound.json), and the mix scripts/sound.py built from it. This checks that the mix
 * exists, that it was built from the files as they are now, that the film plays it, and that the
 * numbers the tool measured are inside the topic's limits. It needs no Python: it reads sound.lock.json.
 */
function checkSound({ root, slug, dir, film, topic, tag, timing, complete, fail, info }) {
  const rules = topic.sound;
  if (!rules?.required) return;
  const build = `python3 scripts/sound.py build ${slug}`;
  const guide = rules.guide ? ` See ${rules.guide}.` : "";
  const excused = rules.voiceOnly?.[slug];
  const sheetPath = path.join(dir, "sound.json");
  if (excused && !fs.existsSync(sheetPath)) {
    info(`${tag}: VOICE ONLY, no music or effects. ${excused}`);
    return;
  }
  if (timing.estimated) {
    info(`${tag}: no sound yet. It is built after the voice is recorded.${guide}`);
    return;
  }
  // A film still being built is told what is missing; a finished one is failed for it.
  const need = complete ? fail : info;
  if (!fs.existsSync(sheetPath)) {
    need(`${tag}: no sound.json. This topic's films have music and sound effects. Start with: python3 scripts/sound.py draft ${slug}${guide}`);
    return;
  }
  const lockPath = path.join(dir, "sound.lock.json");
  if (!fs.existsSync(lockPath)) {
    need(`${tag}: sound.json has not been built. Run: ${build}`);
    return;
  }
  let lock;
  try {
    lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
  } catch {
    fail(`${tag}: sound.lock.json is not valid JSON. Rebuild it: ${build}`);
    return;
  }
  const mixPath = path.join(root, lock.mix ?? "");
  if (!lock.mix || !fs.existsSync(mixPath)) {
    fail(`${tag}: the mix (${lock.mix ?? "?"}) is missing. Run: ${build}`);
    return;
  }
  const voicePath = path.join(root, "public", "audio", slug, "narration.mp3");
  const from = lock.built_from ?? {};
  const changed = [];
  if (from["timing.json"] !== textHash(path.join(dir, "timing.json"))) changed.push("timing.json");
  if (from["sound.json"] !== textHash(sheetPath)) changed.push("sound.json");
  if (!fs.existsSync(voicePath) || from["narration.mp3"] !== fileHash(voicePath)) changed.push("narration.mp3");
  // A mix that plays a recorded track was built from that file too.
  const track = lock.music_file;
  if (track && (!fs.existsSync(path.join(root, track.path)) || track.sha1 !== fileHash(path.join(root, track.path)))) changed.push(`${track.path} (the music)`);
  if (changed.length > 0) {
    fail(`${tag}: the mix is out of date: ${changed.join(", ")} changed after it was built. Run: ${build}`);
    return;
  }
  if (lock.mix_sha1 !== fileHash(mixPath)) {
    fail(`${tag}: ${lock.mix} is not the file sound.lock.json describes. Run: ${build}`);
    return;
  }
  const played = film.match(/\baudio\s*:\s*\{[^}]*?\bsrc\s*:\s*["']([^"']+)["']/)?.[1];
  const wanted = lock.mix.replace(/^public\//, "");
  if (played !== wanted) {
    need(`${tag}: film.tsx plays "${played ?? "nothing"}". It must play the mix: audio: { src: "${wanted}" }`);
  }
  for (const line of lock.failures ?? []) fail(`${tag}: sound: ${line}`);

  const m = lock.measured ?? {};
  const sections = (lock.music_sections ?? []).filter((part) => part.mood !== "none");
  // A topic can have ONE track for all its films, chosen by the owner (`sound.music.file` in topic.json). A film's
  // sheet names it in `music.track`, and `scripts/sound.py build` refuses a sheet of that topic without it. A film
  // finished before the rule (`madeBefore`) keeps the music it was approved with.
  const own = rules.music?.file;
  let sheetTrack = null;
  try {
    sheetTrack = JSON.parse(fs.readFileSync(sheetPath, "utf8")).music?.track ?? null;
  } catch {
    sheetTrack = null;
  }
  const playsOwn = own && sheetTrack && path.normalize(sheetTrack) === path.normalize(own);
  if (own && !playsOwn && !(rules.music.madeBefore ?? []).includes(slug)) {
    info(`${tag}: its music is not the topic's track (${own}). The owner chose that track for this topic's films: add "track": "${own}" to "music" in sound.json; the next \`${build}\` will ask for it.${guide}`);
  }
  // The sections are written with a track too: each one is a turn of the story (silence, or the track stepping back).
  if (rules.minMusicSections && sections.length < rules.minMusicSections) {
    fail(`${tag}: the music has ${sections.length} section(s). The music changes when the story does: at least ${rules.minMusicSections}.${guide}`);
  }
  if (rules.musicUnderVoiceDb && m.musicUnderVoiceDb != null) {
    const [lo, hi] = rules.musicUnderVoiceDb;
    if (m.musicUnderVoiceDb < lo) fail(`${tag}: the music is only ${m.musicUnderVoiceDb} dB under the voice. It must be at least ${lo}: turn music.gain down.`);
    else if (m.musicUnderVoiceDb > hi) fail(`${tag}: the music is ${m.musicUnderVoiceDb} dB under the voice. Past ${hi} nobody hears it: turn music.gain up.`);
  } else if (rules.musicUnderVoiceDb) {
    fail(`${tag}: the mix has no music.${guide}`);
  }
  if (rules.maxSecondsWithoutMusic != null && m.secondsWithoutMusic > rules.maxSecondsWithoutMusic) {
    fail(`${tag}: ${m.secondsWithoutMusic}s of the film has no music. Silence is for one held breath: at most ${rules.maxSecondsWithoutMusic}s.`);
  }
  if (rules.minSfxPerMinute && m.sfxPerMinute < rules.minSfxPerMinute) {
    fail(`${tag}: ${m.sfx} sound effects is ${m.sfxPerMinute} a minute. This topic wants at least ${rules.minSfxPerMinute}: one for each thing that happens on screen.${guide}`);
  }
  if (rules.maxGapSeconds && m.longestGapSeconds > rules.maxGapSeconds) {
    fail(`${tag}: ${m.longestGapSeconds}s with no sound effect, from ${m.longestGapAt}s. Nothing goes longer than ${rules.maxGapSeconds}s.`);
  }
  if (rules.maxBuried != null && m.sfxBuried > rules.maxBuried) {
    fail(`${tag}: ${m.sfxBuried} sound effect(s) cannot be heard under the music. Run ${build} and raise or cut the ones it lists.`);
  }
  if (rules.minVoiceOverRestDb != null && m.voiceOverRestWorstDb != null && m.voiceOverRestWorstDb < rules.minVoiceOverRestDb) {
    const w = m.voiceOverRestWorst?.[0];
    fail(`${tag}: the words are covered at ${w?.t}s [${w?.cue}]: the voice is only ${m.voiceOverRestWorstDb} dB over the rest.`);
  }
  if (rules.minVoiceOverRestMedianDb != null && m.voiceOverRestMedianDb != null && m.voiceOverRestMedianDb < rules.minVoiceOverRestMedianDb) {
    fail(`${tag}: the voice is only ${m.voiceOverRestMedianDb} dB over the music and effects on average. It needs ${rules.minVoiceOverRestMedianDb}.`);
  }
  if (rules.lufs && m.lufs != null && (m.lufs < rules.lufs[0] || m.lufs > rules.lufs[1])) {
    fail(`${tag}: the mix is ${m.lufs} LUFS. It must be between ${rules.lufs[0]} and ${rules.lufs[1]}.`);
  }
  if (rules.maxTruePeakDb != null && m.truePeakDb != null && m.truePeakDb > rules.maxTruePeakDb) {
    fail(`${tag}: the mix peaks at ${m.truePeakDb} dB. Over ${rules.maxTruePeakDb} it can clip.`);
  }
  info(
    `${tag}: sound: ${track ? `music from ${path.basename(track.path)}` : `${sections.length} music sections`}, ${lock.beds ?? 0} beds, ${m.sfx} effects (${m.sfxPerMinute}/min); ` +
      `music ${m.musicUnderVoiceDb} dB under the voice; voice ${m.voiceOverRestMedianDb} dB over the rest (worst ${m.voiceOverRestWorstDb}); ${m.lufs} LUFS`,
  );
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
  // A film may name a cut of its topic (`cut: "short"`). The cut's numbers replace the topic's, one by one.
  const cutId = film.match(/^\s*cut:\s*["']([^"']+)["']/m)?.[1];
  const cut = cutId ? topic.cuts?.[cutId] : null;
  if (cutId && !cut) {
    const known = Object.keys(topic.cuts ?? {});
    fail(`${slug} [${topic.id}]: cut "${cutId}" is not in the topic's topic.json${known.length ? ` (it has: ${known.join(", ")})` : ""}`);
  }
  const lim = { ...(topic.film ?? {}), ...(cut ?? {}) };
  const rules = cut ? `the ${cutId} cut` : "the topic";
  const tag = `${slug} [${topic.id}${cut ? `, ${cutId} cut` : ""}]`;

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
  // Under the topic's floor it is not a short film of this topic; it is another kind of video. That is judged
  // further down, once it is known whether the film is still a draft. Above the floor, the range is advice.
  const underWords = Boolean(lim.hardMinWords) && totalWords < lim.hardMinWords;
  if (!underWords && lim.words && (totalWords < lim.words[0] || totalWords > lim.words[1])) {
    info(`${tag}: the script is ${totalWords} words. ${rules[0].toUpperCase()}${rules.slice(1)} asks for ${lim.words[0]}–${lim.words[1]}.`);
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
  const underSeconds = Boolean(lim.hardMinSeconds) && seconds < lim.hardMinSeconds;
  if (lim.hardMaxSeconds && seconds > lim.hardMaxSeconds) {
    fail(`${tag}: ${seconds.toFixed(1)}s is over the hard limit of ${lim.hardMaxSeconds}s.`);
  } else if (!underSeconds && lim.seconds && (seconds < lim.seconds[0] || seconds > lim.seconds[1])) {
    info(`${tag}: ${seconds.toFixed(1)}s is outside ${rules}'s ${lim.seconds[0]}–${lim.seconds[1]}s.`);
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
  // A topic may fly its camera (topic.json `camera`): its scenes are built with another builder, a shot names
  // the stop it lands on, and film.tsx calls a guard that throws if the camera ever teleports.
  const builder = topic.camera?.builder ?? "storyScene";
  const flies = builder !== "storyScene";
  const hardCuts = [];
  if (topic.camera?.guard && !new RegExp(`\\b${topic.camera.guard}\\s*\\(`).test(film)) {
    fail(`${tag}: film.tsx does not call ${topic.camera.guard}(film.scenes). In this topic the camera never teleports, and that call is what checks it.`);
  }
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
    if (flies) {
      if (!new RegExp(`\\b${builder}\\s*\\(`).test(scene)) fail(`${label}: a film of this topic builds its scenes with ${builder}(): the camera flies from stop to stop (${topic.folder}/SHOTS.md).`);
    } else if (!/\bstoryScene\s*\(/.test(scene)) fail(`${label}: a story film's scenes are built with storyScene().`);
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

      if (flies) {
        // A flown shot has no camera numbers and no stage: it names the stop it lands on, and what it shows lives in the world.
        if (!/(^|[\s{,])to\s*:/.test(body)) fail(`${shot}: no stop. Give \`to: STOPS.<name>\`: where the camera comes to rest for this line.`);
        if (/(^|[\s{,])cut\s*:\s*true\b/.test(body)) hardCuts.push(mark[1]);
        return;
      }
      const recipe = /\.\.\.cam\.(push|orbit|pan|truck|top)\s*\(/.test(body);
      // The camera as two points: written out (`from: [x, y, z]`) or from a place's own helper (`from: GYM.at(x, y, z)`).
      const literal = /(^|\n)\s*from:\s*[\[\w]/.test(body) && /(^|\n)\s*target:\s*[\[\w]/.test(body);
      if (!recipe && !literal) fail(`${shot}: no camera. Spread a cam.* recipe, or give \`from:\` and \`target:\` (two points).`);
      if (!recipe && !/(^|\n)\s*(to|path|targetTo|targetPath|arc|shake):/.test(body)) {
        fail(`${shot}: static shot. Every shot in a story film moves.`);
      }
      if (!/\bstage\s*:/.test(body)) fail(`${shot}: nothing on stage. Add \`stage: (t) => …\`.`);
      for (const fov of body.matchAll(/\bfov(?:To)?:\s*([\d.]+)/g)) {
        if (Number(fov[1]) > 62) info(`${shot}: fov ${fov[1]}° is very wide. People turn small; 30–46° fills a phone.`);
      }
    });
  }

  if (topic.camera?.maxHardCuts !== undefined && hardCuts.length > topic.camera.maxHardCuts) {
    fail(`${tag}: ${hardCuts.length} shots are hard cuts (${hardCuts.join(", ")}). This topic allows ${topic.camera.maxHardCuts}: the camera flies.`);
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

  // ---- the floor ------------------------------------------------------------
  // A 20-second film with this topic's name on it has been built twice and rejected twice. While a film is a
  // draft (the voice not recorded, lines still without a shot) being short is only reported. Once the voice is
  // recorded, or every line has a shot, a film under the floor is not a film of this topic, and it fails.
  if (underWords || underSeconds) {
    const least = [lim.hardMinSeconds ? `${lim.hardMinSeconds}s` : null, lim.hardMinWords ? `${lim.hardMinWords} words` : null].filter(Boolean).join(" or ");
    const size = `${seconds.toFixed(1)}s and ${totalWords} words`;
    const model = topic.reference?.film ?? Object.keys(topic.models ?? {}).find((key) => key !== "note");
    const how = `Write the script to the beat sheet in ${topic.folder}/SCRIPT.md${model ? `, and build like src/videos/${model}` : ""}.`;
    if (missing.length === 0 || !timing.estimated) {
      fail(`${tag}: this film is ${size}. A film of this topic is never under ${least}: this is a different kind of video with the topic's name on it. ${how}`);
    } else {
      info(`${tag}: the script is ${size} so far. A film of this topic is never under ${least}; shorter than that fails once the voice is recorded or the last line has a shot. ${how}`);
    }
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
    // A flown film is one place: the camera sees what it has left and what it is coming to, so nothing is hidden by zone.
    if (!topic.camera?.continuous && !/<Zone\b/.test(world)) info(`${tag}: world.tsx has no <Zone>. A long film should not draw every set in every shot.`);
    if (TWO_D.test(world)) fail(`${tag}: world.tsx contains a 2D overlay`);
  }

  // ---- 6. the pack and the sound -------------------------------------------
  if (topic.folder && topic.pack) {
    const kitPath = path.join(dir, "kit.tsx");
    const sources = [kitPath, worldPath].filter((file) => fs.existsSync(file)).map((file) => fs.readFileSync(file, "utf8"));
    if (!sources.some((source) => source.includes(topic.folder))) {
      info(`${tag}: nothing is imported from ${topic.folder}. The topic has a pack of people, places and props (${topic.pack}): use it before building new ones.`);
    }
  }
  checkSound({ root, slug, dir, film, topic, tag, timing, complete: missing.length === 0, fail, info });

  info(
    `${tag}: ${used.length}/${cues.length} shots, ${totalWords} words, ${seconds.toFixed(1)}s, ` +
      `${Math.round(pace)} words/min, median shot ${mid.toFixed(2)}s${timing.estimated ? " (timing estimated)" : ""}`,
  );
}
