import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { Euler, PerspectiveCamera, Vector3 } from 'three';
import { createElement } from 'react';
import { directionReport } from '../scripts/direction-report.mjs';
import { loadFilm } from '../scripts/rehearse.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const bundle = await build({ stdin: { contents: ['caption-beat', 'blocking', 'footing', 'anim'].map(s => `export * from './src/engine/${s}';`).join('\n'), resolveDir: root }, bundle: true, format: 'esm', write: false });
const { beatFrames, captionBeat, captionPixel, blockedRoute, groundedHip, gaitPose, PX } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].contents).toString('base64'));
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);

test('caption attack on the nearest output frame, release into silence, random-access sampling', () => {
  const words = [{ w: 'Wait.', s: .179, e: .42 }, { w: 'Now!', s: 1, e: 1.2 }];
  const starts = beatFrames(words, 30), at = f => captionBeat(words, starts, f, 30);
  assert.deepEqual(starts, [5, 30]);
  assert.equal(at(4), null); assert.equal(at(5).word, words[0]);
  assert.ok(at(5).scale > at(7).scale && at(7).lift > at(9).lift);
  near(at(9).scale, 1); near(at(9).lift, 0);
  assert.equal(at(16), null); assert.equal(at(29), null); assert.equal(at(30).word, words[1]);
  near(at(5).scale, at(30).scale); // no dependence on the previous rendered frame
  const px = captionPixel(1080, 120, 1, true);
  near(px * 120 * at(5).scale, 1080 * .88); // even a long word has room to pop then shrink
  assert.ok(px < captionPixel(1080, 120, 1, false));
});

test('competing short words each get a frame; no permanent caption lag after the gap', () => {
  const words = ['I', 'am', 'a', 'kid'].map((w, i) => ({ w, s: [.1, .102, .108, .3][i], e: [.102, .108, .12, .6][i] }));
  const starts = beatFrames(words, 30);
  assert.deepEqual(starts, [3, 4, 5, 9]);
  assert.deepEqual(starts.map(f => captionBeat(words, starts, f, 30).word.w), ['I', 'am', 'a', 'kid']);
});

const wall = { name: 'thin wall', position: [0, 1, 0], size: [.02, 2, 2] }, body = { radius: .25, height: 1.5 };
test('blocking checks the swept body, not just the marks or centre line; contact is legal', () => {
  const route = marks => blockedRoute('teller', marks, [wall], body);
  assert.throws(() => route([[-3, 0, 0], [3, 0, 0]]), /mark 1 → 2 crosses thin wall/);
  assert.throws(() => route([[-3, 0, 1.24], [3, 0, 1.24]]), /crosses thin wall/);
  assert.throws(() => route([[0, 0, 0]]), /crosses thin wall/);
  assert.doesNotThrow(() => route([[-3, 0, 1.25], [3, 0, 1.25]]));
  assert.doesNotThrow(() => route([[0, 2, 0]])); // feet on top; not *in* the table
  assert.doesNotThrow(() => route([[0, -1.5, 0]])); // head at underside
  assert.throws(() => route([[0, -1.49, 0]]), /crosses thin wall/);
  assert.throws(() => route([[NaN, 0, 1]]), /invalid marks/);
});

test('position, facing and gait sample the same checked route by arc length', () => {
  const travel = blockedRoute('walk', [[-1, 0, 0], [-1, 0, 2], [1, 0, 2]], [wall], body);
  assert.deepEqual(travel(-3).position, [-1, 0, 0]);
  assert.deepEqual(travel(.25), { position: [-1, 0, 1], rotationY: 0, animDistance: 1 });
  assert.deepEqual(travel(.5).position, [-1, 0, 2]); near(travel(.5).rotationY, Math.PI / 4);
  assert.deepEqual(travel(.75), { position: [0, 0, 2], rotationY: Math.PI / 2, animDistance: 3 });
  assert.deepEqual(travel(2).position, [1, 0, 2]);
  assert.deepEqual(blockedRoute('still', [[1, 0, 1]], [wall], body)(.7).animDistance, 0);
});

test('planted walk: lowest actual shin or shoe vertex stays on the floor at different scales', () => {
  for (const shoes of [false, true]) for (const scale of [.8, 1.1]) for (let i = 0; i < 20; i++) {
    const pose = gaitPose('walk', i / 13), bodyRot = [.014, pose.bodyYaw, pose.bodyRoll - .009];
    const hip = groundedHip(pose, bodyRot, shoes);
    let low = Infinity;
    for (const side of ['L', 'R']) {
      const boxes = [[-3, 0, 3.6, 6, 4], ...(shoes ? [[-5.1, .5, 4.1, 2, 5.4], [-5.9, .5, 4.2, .6, 5.5]] : [])];
      for (const [cy, cz, w, h, d] of boxes) for (const x of [-w/2, w/2]) for (const y of [cy-h/2, cy+h/2]) for (const z of [cz-d/2, cz+d/2]) {
        const v = new Vector3(x, y, z).applyEuler(new Euler(...pose[`knee${side}`]));
        v.y -= 6; v.applyEuler(new Euler(...pose[`leg${side}`])); v.x += side === 'R' ? 2.2 : -2.2;
        v.applyEuler(new Euler(...bodyRot)); low = Math.min(low, (v.y * PX + hip) * scale);
      }
    }
    near(low, 0);
  }
});

const shot = { cue: '1.me', from: [0, 1, 3], target: [0, 1, 0], at: 0, dur: 1 };
const inspect = (camera, stage) => directionReport({ fps: 30, scenes: [{ id: 'scene1', duration: 1, shots: [{ ...shot, ...camera }], sampleStage: stage }] });
test('an impressive recipe name or a time prop is not a camera move or proof of acting', () => {
  const Rig = () => { throw Error('must never execute the child rig or its hooks'); };
  const onlyClock = (i, t) => createElement(Rig, { time: t });
  const hold = inspect({ targetTo: [0, 1, -4], path: [shot.from, shot.from] }, onlyClock);
  assert.match(hold.review.join('\n'), /resolves to a hold/);
  assert.match(hold.review.join('\n'), /unchanged props/);
  assert.equal(hold.errors.length, 0); assert.equal(hold.changing, 0);
  for (const move of [{ to: [1, 1, 3] }, { targetTo: [1, 1, 0] }, { focalLength: 35, focalLengthTo: 52 }, { path: [shot.from, [1, 1, 3], shot.from] }]) {
    const r = inspect(move, (i, t) => createElement(Rig, { position: [t, 0, 0] }));
    assert.equal(r.changing, 1); assert.deepEqual(r.review, []); assert.deepEqual(r.errors, []);
  }
  const modern = { fps: 30, captions: { motion: 'on-beat' }, scenes: [{ duration: 1, shots: [shot], sampleStage: onlyClock }] };
  assert.match(directionReport(modern).unfinished.join(), /camera resolves to a hold/);
  assert.deepEqual(inspect({ locked: true }, onlyClock).review.filter(s => s.includes('resolves to a hold')), []);
  assert.match(inspect({ locked: true, to: [2, 1, 3] }, onlyClock).errors.join(), /says locked/);
  assert.match(inspect({ from: shot.target }, onlyClock).errors.join(), /no valid view/);
});

test('delivery distinguishes a measured clock/mix from partial timing, stale captions and an unfinished cut', () => {
  const words = [{ w: 'Hello.', s: .1, e: .5 }], timing = { fps: 30, duration: 1, audio: 'audio/test/narration.mp3', estimated: false, cues: [{ id: shot.cue, start: 0, end: 1, text: 'Hello.' }], words, clips: [{ name: 'hook', timing: 'aligned' }] };
  const film = { fps: 30, id: 'test', scenes: [{ id: 's', duration: 1, shots: [shot] }], captions: { words, motion: 'on-beat' }, audio: { src: 'audio/test/mix.mp3' }, post: { shaders: true } };
  const topic = { film: { captions: true }, sound: { required: true } };
  const report = (f = {}, t = {}) => directionReport({ ...film, ...f }, { ...timing, ...t }, topic);
  assert.deepEqual(report().unfinished, []); assert.deepEqual(report().errors, []);
  assert.match(report({}, { clips: [{ name: 'hook', timing: 'estimated' }] }).unfinished.join(), /alignment in: hook/);
  const old = { ...film, captions: { words } }, mixed = { ...timing, clips: [{ name: 'hook', timing: 'interpolated' }] };
  assert.match(directionReport(old, mixed, topic).unfinished.join(), /alignment in: hook/); // explicit final
  const replay = directionReport(old, mixed, topic, undefined, { replayLegacy: true });
  assert.deepEqual(replay.unfinished, []); assert.match(replay.review.join(), /legacy clock/);
  assert.match(directionReport(old, { ...mixed, wordTiming: 'partial' }, topic, undefined, { replayLegacy: true }).unfinished.join(), /alignment/);
  assert.match(directionReport(old, { ...timing, wordTiming: 'aligned' }, topic).unfinished.join(), /legacy caption motion/);
  assert.match(report({}, { clips: [], estimated: true, audio: null }).unfinished.join(), /No fully aligned/);
  assert.match(report({ scenes: [] }).unfinished.join(), /whole voice/);
  assert.match(report({ audio: { src: timing.audio } }).unfinished.join(), /mix.mp3/);
  assert.match(report({ post: { shaders: { enabled: false } } }).unfinished.join(), /shader chain is off/);
  assert.match(report({ captions: { words: [{ ...words[0], s: .2 }] } }).errors.join(), /displayed captions/);
  assert.match(report({}, { words: [{ ...words[0], e: -.2 }] }).errors.join(), /invalid or overlapping/);
});

function run(bin, args, cwd = root, status = 0) {
  const r = spawnSync(bin, args, { cwd, encoding: 'utf8' });
  assert.equal(r.status, status, `${bin} ${args.join(' ')}\n${r.error || ''}${r.stdout}${r.stderr}`);
  return r.stdout + r.stderr;
}
test('alignment, interpolation and no-overwrite regression tests (stdlib Python)', () => {
  run('python3', ['tests/test_alignment.py']);
});

test('every narrated starter scaffolds with its own identity; drafts rehearse but cannot pass delivery', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'directing-test-'));
  try {
    // The scaffold writes here only. A real Topics directory is needed to enumerate topic.json;
    // the topic packs/scripts/engine can be read from the checkout without copying any media.
    fs.mkdirSync(path.join(tmp, 'src')); fs.mkdirSync(path.join(tmp, 'Topics')); fs.mkdirSync(path.join(tmp, 'scripts'));
    fs.symlinkSync(path.join(root, 'src/engine'), path.join(tmp, 'src/engine'), 'dir');
    fs.symlinkSync(path.join(root, 'node_modules'), path.join(tmp, 'node_modules'), 'dir');
    for (const name of ['new-video.mjs', 'narration.py']) fs.copyFileSync(path.join(root, 'scripts', name), path.join(tmp, 'scripts', name));
    for (const dir of ['InThisTown', 'Stories', 'Deadpan', 'Explainer', 'WhatIf', 'Recreation']) {
      const dest = path.join(tmp, 'Topics', dir); fs.mkdirSync(dest);
      for (const f of fs.readdirSync(path.join(root, 'Topics', dir)).filter(f => f === 'template' || f === 'topic.json' || /\.tsx?$/.test(f))) {
        fs.symlinkSync(path.join(root, 'Topics', dir, f), path.join(dest, f), f === 'template' ? 'dir' : 'file');
      }
    }
    for (const topic of ['in-this-town', 'stories', 'deadpan', 'what-if', 'explainer', 'recreation']) {
      const id = 'probe-' + topic;
      run(process.execPath, ['scripts/new-video.mjs', id, '--topic', topic], tmp);
      const film = await loadFilm(tmp, id);
      assert.equal(film.topic, topic); assert.equal(film.cut, ['stories', 'in-this-town'].includes(topic) ? 'short' : undefined);
      assert.equal(film.captions.motion, 'on-beat'); assert.equal(film.post.shaders, true);
      const file = path.join(tmp, 'src/videos', id, 'timing.json'), timing = JSON.parse(fs.readFileSync(file));
      assert.equal(timing.wordTiming, 'estimated');
      assert.deepEqual(directionReport(film, timing, { film: { captions: true } }).errors, []);
      if (topic === 'in-this-town') {
        // The first visual pass lost the bent blossom AND half the face at the
        // end of the reverse. Protect those two story marks, not a camera recipe tally.
        const scene = film.scenes[0], i = scene.shots.findIndex(s => s.cue === '1.turn'), reverse = scene.shots[i];
        const { position, lookAt } = scene.sampleStage(i, reverse.dur - 1 / film.fps).props.children[0].props;
        const lens = new PerspectiveCamera(reverse.fov, film.width / film.height, .05, 200);
        lens.position.fromArray(reverse.to); lens.lookAt(new Vector3(...reverse.target)); lens.updateMatrixWorld();
        const face = new Vector3(...position).add(new Vector3(0, 1.25, 0));
        const bloom = new Vector3(...lookAt).add(new Vector3(-.30, -.10, 0)); // fully bent to this side
        for (const mark of [face, bloom]) {
          const screen = mark.project(lens);
          assert.ok(Math.abs(screen.x) < .88 && Math.abs(screen.y) < .88 && screen.z > -1 && screen.z < 1, 'face and flower must survive the reverse at 9:16');
        }
      }
    }
    const cli = path.join(root, 'scripts/rehearse.mjs'), id = 'probe-in-this-town';
    assert.match(run(process.execPath, [cli, id], tmp), /3 shots/);
    for (const flag of ['--final', '--pre-render']) assert.match(run(process.execPath, [cli, id, flag], tmp, 1), /DRAFT: No fully aligned/);
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});
