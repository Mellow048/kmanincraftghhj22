// Inspect a constructed film, not the names of recipes in its TSX. No renderer or hooks.
const rad = Math.PI / 180;
const gap = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));
const points = (path, from, to) => path?.length >= 2 ? path : [from, to ?? from];
function lens(s, end = false) {
  if (s.focalLength == null) return (end ? s.fovTo ?? s.fov : s.fov) ?? 38;
  const mm = end ? s.focalLengthTo ?? s.focalLength : s.focalLength;
  return 2 * Math.atan(12 / Math.max(1, mm)) / rad; // Camera.tsx: vertical 24mm sensor
}
function framing(eye, target, aim, fov, roll) {
  const ray = eye.map((v, i) => v - target[i] - (i === 1 ? aim : 0));
  const distance = Math.hypot(...ray);
  return { axis: ray.map(v => v / distance), span: 2 * distance * Math.tan(fov * rad / 2), roll };
}
function similar(a, b) {
  return a && a.axis.reduce((d, v, i) => d + v * b.axis[i], 0) > Math.cos(9 * rad) &&
    Math.abs(Math.log(a.span / b.span)) < Math.log(1.18) && Math.abs(a.roll - b.roll) < 6 * rad;
}
function camera(s) {
  const eyes = points(s.path, s.from, s.to), targets = points(s.targetPath, s.target, s.targetTo);
  const start = framing(eyes[0], targets[0], s.aim ?? 0, lens(s), s.roll ?? 0);
  const end = framing(eyes.at(-1), targets.at(-1), s.aim ?? 0, lens(s, true), s.rollTo ?? start.roll);
  // With a stationary eye, moving its target directly along the look ray does NOT pan.
  const changes = eyes.some(p => gap(p, eyes[0]) > .001) ||
    targets.some(p => gap(framing(eyes[0], p, s.aim ?? 0, lens(s), start.roll).axis, start.axis) > .001) ||
    Math.abs(lens(s) - lens(s, true)) > .01 || Math.abs(start.roll - end.roll) > .001 ||
    s.shake > 0 || s.handheld > 0 || s.impacts?.some(i => i.amp > 0 && i.at < s.at + s.dur && i.at + (i.dur ?? .35) > s.at);
  return { start, end, changes };
}

// A child can run its own animation clock. Don't call it here (it may use hooks),
// and don't count passing t={t} to an inert child as proof that it moved.
function stagePrint(node) {
  return JSON.stringify(node, (key, v) => {
    if (['time', 't', 'clock'].includes(key) && typeof v === 'number') return '[clock]';
    if (v && typeof v === 'object') {
      if (v.$$typeof && v.props) return [typeof v.type === 'string' ? v.type : v.type?.name ?? 'component', v.props];
      if (!Array.isArray(v) && Object.getPrototypeOf(v) !== Object.prototype && Object.getPrototypeOf(v) !== null) return v.constructor?.name;
    }
    return typeof v === 'number' ? Math.round(v * 1000) / 1000 : v;
  });
}

function narration(film, timing, topic, script, covered, frames, r, replayLegacy) {
  const { fps } = film, { errors, unfinished, review } = r;
  if (!timing?.words?.length || !timing.cues?.length) {
    errors.push('Missing word or cue track. Rebuild timing.json from narration.md.');
    return;
  }
  const { words, cues, clips = [] } = timing;
  if (timing.fps !== fps || !Number.isFinite(timing.duration) || timing.duration <= 0) errors.push('Film and voice clocks disagree (fps/duration).');
  if (script && (script.cues.length !== cues.length || cues.some((c, i) => c.id !== script.cues[i].id || c.text !== script.cues[i].text))) errors.push('The cue transcript is stale. Record the edited script and rebuild timing.json.');
  const expected = cues.flatMap(c => c.text.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)));
  if (expected.length !== words.length || words.some((w, i) => w.w !== expected[i])) errors.push('Caption text differs from the cue transcript. Rebuild timing.json; do not edit the captions.');
  const bad = words.findIndex((w, i) => !Number.isFinite(w.s) || !Number.isFinite(w.e) || w.s < 0 || w.e <= w.s ||
    w.e > timing.duration + 1/fps || (i > 0 && (w.s < words[i-1].s || w.s < words[i-1].e - .001)));
  if (bad >= 0) errors.push(`Word ${bad + 1} (${words[bad].w}): invalid or overlapping onset/end.`);
  const track = film.captions?.words;
  if (track?.length !== words.length || words.some((w, i) => track[i].w !== w.w || track[i].s !== w.s || track[i].e !== w.e)) errors.push('The displayed captions are not the recorded timing.words track (wrong words or offset).');
  if (!timing.audio || timing.estimated || !clips.length || (timing.wordTiming && timing.wordTiming !== 'aligned')) unfinished.push('No fully aligned word track. Record the clips and build with --require-alignment.');
  if (script && clips.length && (script.clipNames.length !== clips.length || clips.some((c, i) => c.name !== script.clipNames[i]))) unfinished.push('Clip timing does not account for each recording in the script, in order.');
  const guessed = [...new Set(clips.filter(c => c.timing !== 'aligned').map(c => c.name))];
  if (guessed.length) {
    const archivedClock = replayLegacy && !timing.estimated && timing.audio && timing.wordTiming === undefined && film.captions?.motion !== 'on-beat';
    (archivedClock ? review : unfinished).push(`Word timing needs alignment in: ${guessed.join(', ')}. ${archivedClock ? 'Replaying the legacy clock without retiming an archived cut; this would not pass --final.' : 'Having a voice file does not mean its words were measured.'}`);
  }
  if (covered.length !== cues.length || covered.some((c, i) => c.id !== cues[i]?.id || Math.abs(c.frame - Math.round(cues[i].start * fps)) > 1) || Math.abs(frames - Math.round(timing.duration * fps)) > 1) unfinished.push('The staged cut does not cover the whole voice on its cue frames, in order. Finish the shots before delivery.');
  const mix = `audio/${film.id}/mix.mp3`;
  const voiceOnly = topic.sound?.voiceOnly?.[film.id];
  const wanted = topic.sound?.required && !voiceOnly ? mix : timing.audio;
  if (!film.audio?.src || film.audio.volume <= 0 || (film.audio.src !== wanted && !(voiceOnly && film.audio.src === mix))) unfinished.push(`Film is not playing its finished audio (${wanted ?? 'recording missing'}).`);
  if (timing.wordTiming !== undefined && film.captions?.motion !== 'on-beat') unfinished.push('New voice clock, legacy caption motion. Set captions.motion to "on-beat" for this cut.');
  if (!film.post?.shaders || film.post.shaders.enabled === false) {
    (timing.wordTiming !== undefined || film.captions?.motion === 'on-beat' ? unfinished : review).push('Built-in shader chain is off. Keep an approved legacy look; new work uses post.shaders, not just post.bloom.');
  }
}

export function directionReport(film, timing, topic, script, { replayLegacy = false } = {}) {
  const r = { shots: 0, sampled: 0, changing: 0, errors: [], unfinished: [], review: [] };
  const { fps } = film, covered = [];
  let prior, alike = 0, quiet = 0, frame = 0;
  for (const scene of film.scenes) {
    const duration = Math.max(1, Math.round(scene.duration * fps));
    for (const [i, s] of scene.shots.entries()) {
      r.shots++;
      // Same threshold as pickShot: the earliest output frame that actually selects it.
      const first = Math.max(0, Math.ceil((s.at - 1e-6) * fps));
      const next = scene.shots[i + 1];
      const last = (next ? Math.ceil((next.at - 1e-6) * fps) : duration) - 1;
      const where = `[${s.cue ?? `${scene.id}/${i + 1}`}] frame ${frame + first}`;
      if (s.cue && covered.at(-1)?.id !== s.cue) covered.push({ id: s.cue, frame: frame + first });
      const view = camera(s);
      if (![view.start, view.end].every(v => Number.isFinite(v.span) && v.span > 0)) r.errors.push(`${where}: lens has no valid view of its subject.`);
      if (last < first) r.errors.push(`${where}: this shot has no screen frames.`);
      if (scene.sampleStage && !view.changes && !s.locked) {
        (timing?.wordTiming !== undefined || film.captions?.motion === 'on-beat' ? r.unfinished : r.review).push(`${where}: camera resolves to a hold. Change the endpoints, or for a deliberate photograph/POV set locked: true and explain it in the note.`);
      }
      if (s.locked && view.changes) r.errors.push(`${where}: shot says locked but the camera moves.`);
      alike = similar(prior, view.start) ? alike + 1 : 1;
      if (alike === 3) r.review.push(`${where}: third consecutive opening with nearly the same view angle and frame size. Does the cut reveal anything new?`);
      prior = view.start;
      if (!scene.sampleStage || last < first) continue;
      r.sampled++;
      const poses = new Set([0, .15, .5, .85, 1].map(p => stagePrint(scene.sampleStage(i, (first + Math.round(p * (last - first))) / fps - s.at))));
      if (poses.size > 1) { r.changing++; quiet = 0; }
      else if (++quiet === 3 || r.shots === 1) r.review.push(`${where}: ${r.shots === 1 ? 'the opening sends' : 'three stages in a row send'} unchanged props (apart from clocks) at five samples. Check the child rig on screen; a moving lens alone is not acting.`);
    }
    frame += duration;
  }
  if (topic?.film?.captions) narration(film, timing, topic, script, covered, frame, r, replayLegacy);
  return r;
}
