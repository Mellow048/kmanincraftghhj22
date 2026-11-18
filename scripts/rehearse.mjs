#!/usr/bin/env node
/** Run the real shot recipes and the stage callbacks, without Chrome, a GPU, audio synthesis or a render. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { directionReport } from './direction-report.mjs';
import { loadTopic, readScript } from './check-story-film.mjs';

export async function loadFilm(root, id) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw Error('Expected a film id (kebab-case).');
  const entry = path.join(root, 'src/videos', id, 'film.tsx');
  await fs.access(entry);
  const out = path.join(root, 'out'); await fs.mkdir(out, { recursive: true });
  const scratch = await fs.mkdtemp(path.join(out, '.rehearse-'));
  try {
    const outfile = path.join(scratch, 'film.mjs');
    await build({ entryPoints: [entry], outfile, platform: 'node', format: 'esm', target: 'node22', packages: 'external', bundle: true, jsx: 'automatic', logLevel: 'silent' });
    return (await import(pathToFileURL(outfile))).film;
  } finally { await fs.rm(scratch, { recursive: true, force: true }); }
}

async function main() {
  const [id, mode = '--draft', extra] = process.argv.slice(2), root = process.cwd();
  if (!id || extra || !['--draft', '--final', '--pre-render'].includes(mode)) throw Error('Usage: npm run rehearse -- <film-id> [--final | --pre-render]');
  // These explicitly registered lighting benches have no actors, script or audio.
  if (['scenery-day', 'scenery-sunset', 'scenery-night'].includes(id)) { console.log('Lighting bench, not a narrative film.'); return; }
  const film = await loadFilm(root, id), topic = film.topic && loadTopic(root, film.topic);
  if (film.topic && !topic) throw Error(`Unknown topic: ${film.topic}`);
  const dir = path.join(root, 'src/videos', id);
  let timing, script;
  if (topic?.film?.captions) {
    timing = JSON.parse(await fs.readFile(path.join(dir, 'timing.json'), 'utf8'));
    script = readScript(await fs.readFile(path.join(dir, 'narration.md'), 'utf8'));
    if (!script || script.error) throw Error(script?.error ?? 'No narration block in narration.md.');
  }
  const r = directionReport(film, timing, topic, script, { replayLegacy: mode === '--pre-render' });
  for (const src of new Set([timing?.audio, film.audio?.src].filter(Boolean))) {
    try { await fs.access(path.join(root, 'public', src)); }
    catch { r.unfinished.push(`Missing audio asset: public/${src}`); }
  }
  console.log(`${id} · ${r.shots} shots · ${r.sampled ? `${r.changing}/${r.sampled} sampled stages change non-clock props (not a score)` : 'no per-shot stages to sample; inspect the world/scene performance'}`);
  for (const message of r.errors) console.error(`ERROR: ${message}`);
  for (const message of r.unfinished) console.log(`DRAFT: ${message}`);
  for (const message of r.review) console.log(`LOOK: ${message}`);
  if (r.errors.length || (mode !== '--draft' && r.unfinished.length)) process.exitCode = 1;
  else if (mode === '--final') console.log('Delivery preflight passed. Review the actual picture AND sound; this cannot certify retention or contact in unmarked scenery.');
  else if (mode === '--pre-render') console.log('Render preflight passed. See LOOK notes and review the picture and mix.');
  else console.log('Rehearsal complete. --final rejects unfinished voice, cuts and mix.');
}
if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) main().catch(error => { console.error(`rehearsal: ${error.message}`); process.exitCode = 1; });
