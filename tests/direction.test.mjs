import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { Euler, PerspectiveCamera, Vector3 } from 'three';
import { createElement } from 'react';
import { directionReport } from '../scripts/direction-report.mjs';
import { loadFilm } from '../scripts/rehearse.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const bundle = await build({ stdin: { contents: ['caption-beat', 'blocking', 'footing', 'anim', 'story', 'Camera', 'math'].map(s => `export * from './src/engine/${s}';`).join('\n'), resolveDir: root }, bundle: true, format: 'esm', write: false, packages: 'external' });
const cacheDir = path.join(root, 'node_modules/.cache');
fs.mkdirSync(cacheDir, { recursive: true });
const bundleFile = path.join(cacheDir, `direction-test-${process.pid}.mjs`);
fs.writeFileSync(bundleFile, bundle.outputFiles[0].contents);
let mod;
try {
  mod = await import(pathToFileURL(bundleFile).href);
} finally {
  fs.rmSync(bundleFile, { force: true });
}
const { beatFrames, captionBeat, captionPixel, blockedRoute, groundedHip, gaitPose, PX, walkSegment, shotEase, easings } = mod;
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
  const microSlide = { fps: 30, captions: { motion: 'on-beat' }, scenes: [{ duration: 1, shots: [{ ...shot, to: [0, 1, 2.85] }], sampleStage: (i, t) => createElement(Rig, { position: [t, 0, 0] }) }] };
  assert.match(directionReport(microSlide).unfinished.join(), /barely moves/);
  const distantHook = { fps: 30, captions: { motion: 'on-beat' }, scenes: [{ duration: 1, shots: [{ ...shot, from: [0, 2, 22], to: [0, 2, 14] }], sampleStage: (i, t) => createElement(Rig, { position: [t, 0, 0] }) }] };
  assert.match(directionReport(distantHook).unfinished.join(), /opening hook camera starts/);
  const twoFrozen = {
    fps: 30,
    captions: { motion: 'on-beat' },
    scenes: [{
      duration: 2,
      shots: [
        { ...shot, dur: 1, to: [1, 1, 3] },
        { ...shot, at: 1, dur: 1, to: [0, 1, 2.1] },
      ],
      sampleStage: onlyClock,
    }],
  };
  assert.match(directionReport(twoFrozen).unfinished.join(), /frozen unchanged props/);
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
    for (const dir of ['InThisTown', 'Stories', 'Deadpan', 'Explainer', 'WhatIf', 'Recreation', 'ServerLore', 'Shared']) {
      const dest = path.join(tmp, 'Topics', dir); fs.mkdirSync(dest);
      for (const f of fs.readdirSync(path.join(root, 'Topics', dir)).filter(f => f === 'template' || f === 'topic.json' || /\.tsx?$/.test(f))) {
        fs.symlinkSync(path.join(root, 'Topics', dir, f), path.join(dest, f), f === 'template' ? 'dir' : 'file');
      }
    }
    for (const topic of ['in-this-town', 'stories', 'deadpan', 'what-if', 'explainer', 'recreation', 'server-lore']) {
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

    // Single-pass strict tsc --noEmit across all 6 valid scaffolded starters.
    const validStarters = ['in-this-town', 'stories', 'deadpan', 'what-if', 'explainer', 'recreation', 'server-lore'];
    const tsConfigPath = path.join(tmp, 'tsconfig.starters.json');
    fs.writeFileSync(tsConfigPath, JSON.stringify({
      extends: path.join(root, 'tsconfig.json'),
      compilerOptions: { baseUrl: tmp },
      include: validStarters.map(t => `src/videos/probe-${t}/**/*.ts`,).concat(validStarters.map(t => `src/videos/probe-${t}/**/*.tsx`)),
      exclude: [],
    }, null, 2));
    run(path.join(root, 'node_modules/.bin/tsc'), ['--noEmit', '-p', tsConfigPath], tmp);
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});

test('remaster v2: cam helpers, screenOffset, and shader presets behave deterministically', async () => {
  const { pathToFileURL } = await import('node:url');
  const out = path.join(root, 'out');
  fs.mkdirSync(out, { recursive: true });
  const scratch = fs.mkdtempSync(path.join(out, '.remaster-test-'));
  try {
    const outfile = path.join(scratch, 'engine-remaster.mjs');
    await build({
      stdin: {
        contents: `export * from './src/engine/cam';\nexport { pickShot } from './src/engine/Camera';\nexport { resolveShaders, DEFAULT_SHADERS } from './src/engine/shaders';`,
        resolveDir: root,
      },
      outfile,
      platform: 'node',
      format: 'esm',
      target: 'node22',
      packages: 'external',
      bundle: true,
      jsx: 'automatic',
      logLevel: 'silent',
    });
    const { cam, pickShot, resolveShaders, DEFAULT_SHADERS } = await import(pathToFileURL(outfile));

    const craneShot = {
      at: 0,
      dur: 2,
      ...cam.crane({
        on: [0, 1.2, 0],
        dist: 4,
        fromPitch: -10,
        toPitch: 28,
        fov: 38,
        screenOffset: [0, 0.14],
      }),
      note: 'Rise from creeper feet to reveal street.',
    };
    assert.ok(craneShot.to[1] > craneShot.from[1]);
    assert.deepEqual(craneShot.screenOffset, [0, 0.14]);

    const whipShot = {
      at: 2,
      dur: 0.4,
      ...cam.whip({
        from: [3, 1.5, 4],
        on: [0, 1.2, 0],
        onTo: [-3, 1.2, -1],
        fov: 40,
      }),
      note: 'Snap turn to cat on fence.',
    };
    assert.equal(whipShot.ease, 'outExpo');
    assert.equal(pickShot([craneShot, whipShot], 2.1), whipShot);

    const dz = {
      at: 0,
      dur: 2,
      ...cam.dollyZoom({
        on: [0, 1.2, 0],
        dist: 5,
        to: 2.8,
        fov: 34,
      }),
      note: 'Dread trombone zoom.',
    };
    assert.ok((dz.fovTo ?? 0) > (dz.fov ?? 0));
    assert.ok(dz.to[2] < dz.from[2]);

    const ots = {
      at: 0,
      dur: 2,
      ...cam.ots({
        speaker: [0, 1.3, 0],
        listener: [0, 1.3, 3],
      }),
      note: 'Two-shot over shoulder.',
    };
    assert.ok(Array.isArray(ots.from) && Array.isArray(ots.to) && Array.isArray(ots.target));

    const fitDist = cam.fitHeight(2.9, 42, 0.72);
    assert.ok(fitDist > 4 && fitDist < 7, `Enderman 2.9m fits nicely at ${fitDist}m`);

    const vibrant = resolveShaders('vibrant-day');
    assert.ok(vibrant && vibrant.vibrance > DEFAULT_SHADERS.vibrance && vibrant.enabled === true);
    assert.equal(resolveShaders(undefined), null);

    // Check dual-color caption font, 3D sight-gag props, and Explainer Remaster cast/props export cleanly
    const out2 = path.join(scratch, 'props-font.mjs');
    await build({
      stdin: {
        contents: `export { wordTexture } from './src/engine/pixelfont';
export { FloatingNumber, ChatToast, Chicken } from './src/engine/props';
export { CitizenLead, EliteLead, Official, ExplainerCrowd, DetailedBookshelf, RuleBoard, RoyalThrone, Crown, CrownCushion, BallotBox, StoneBillboard, CastleGateWall, IngotStack, Pickaxe, CompareChestPair, NameTag } from './Topics/Explainer';`,
        resolveDir: root,
      },
      outfile: out2,
      platform: 'node',
      format: 'esm',
      target: 'node22',
      packages: 'external',
      bundle: true,
      jsx: 'automatic',
      logLevel: 'silent',
    });
    const mod2 = await import(pathToFileURL(out2));
    const chatTex = mod2.wordTexture('<Dad> 100%: +2!');
    assert.ok(chatTex.image.width > 10 && chatTex.image.height === 11);
    for (const sym of ['FloatingNumber', 'ChatToast', 'Chicken', 'CitizenLead', 'EliteLead', 'DetailedBookshelf', 'RuleBoard', 'RoyalThrone', 'Crown', 'BallotBox', 'StoneBillboard', 'IngotStack', 'Pickaxe', 'CompareChestPair', 'NameTag']) {
      assert.equal(typeof mod2[sym], 'function', `${sym} should be exported`);
    }
    const explainerCfg = JSON.parse(fs.readFileSync(path.join(root, 'Topics/Explainer/topic.json'), 'utf8'));
    assert.equal(explainerCfg.sound.music.file, 'Topics/Explainer/explainer_bgm_loop.wav');
    const bgm = path.join(root, explainerCfg.sound.music.file);
    // The code-only mirror ships no media; scripts/restore-assets.sh brings this back.
    if (fs.existsSync(bgm) || !fs.existsSync(path.join(root, 'CODE_ONLY.md'))) {
      assert.ok(fs.existsSync(bgm), 'explainer_bgm_loop.wav must exist');
    }
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true });
  }
});

test('F2–F5: walkSegment, villagerWalk, ExplainerCrowd, shotEase, money geometry, and directionReport gates', async () => {
  // F3: shotEase preserves short outExpo whips and prevents long-shot tail freezes
  for (const p of [0, 0.25, 0.5, 0.75, 1]) near(shotEase('outExpo', p, 0.4), easings.outExpo(p));
  near(shotEase('outExpo', 0, 2.0), 0);
  near(shotEase('outExpo', 1, 2.0), 1);
  assert.ok(shotEase('outExpo', 0.9, 2.0) - shotEase('outExpo', 0.5, 2.0) > 0.08);

  // F2: walkSegment stays idle when stationary/vertical-only and blends cleanly to idle after stopping
  const stillSeg = walkSegment([1, 0, 2], [1, 3, 2], 0.5, 0, 1);
  assert.equal(stillSeg.animation, 'idle');
  assert.equal(stillSeg.animDistance, 0);
  const midSeg = walkSegment([0, 0, 0], [0, 0, 4], 0.7, 0.2, 1.2);
  assert.equal(midSeg.animation, 'walk');
  assert.equal(midSeg.blendTo, 'idle');
  assert.ok(midSeg.animDistance > 0);
  const stopSeg = walkSegment([0, 0, 0], [0, 0, 4], 1.3, 0.2, 1.2);
  assert.equal(stopSeg.animation, 'idle');
  assert.equal(stopSeg.blendTo, 'walk');
  assert.ok(stopSeg.blend > 0 && stopSeg.blend < 1);
  const settledSeg = walkSegment([0, 0, 0], [0, 0, 4], 1.6, 0.2, 1.2);
  assert.equal(settledSeg.animation, 'idle');
  near(settledSeg.blend, 1);

  // Bundle Topics/InThisTown/villagers, Topics/Explainer/cast, Topics/Explainer/money, MinecraftAvatar types
  const { pathToFileURL } = await import('node:url');
  const out = path.join(root, 'out');
  fs.mkdirSync(out, { recursive: true });
  const scratch = fs.mkdtempSync(path.join(out, '.m1-unit-'));
  try {
    const outfile = path.join(scratch, 'm1-helpers.mjs');
    await build({
      stdin: {
        contents: `export { villagerStride, villagerWalk } from './Topics/InThisTown/villagers';
export { ExplainerCrowd } from './Topics/Explainer/cast';
export { CoinStack, CoinPile, BillStack, Printer } from './Topics/Explainer/money';
export { MinecraftAvatar } from './src/engine/MinecraftAvatar';`,
        resolveDir: root,
      },
      outfile,
      platform: 'node',
      format: 'esm',
      target: 'node22',
      packages: 'external',
      bundle: true,
      jsx: 'automatic',
      logLevel: 'silent',
    });
    const m1 = await import(pathToFileURL(outfile));
    assert.equal(typeof m1.MinecraftAvatar, 'function');

    // F2: villagerStride / villagerWalk
    assert.equal(m1.villagerStride([0, 0, 0], [0, 4, 0], 0.5).walk, 0);
    near(m1.villagerStride([0, 0, 0], [3, 0, 4], 0.5).walk, 2.5);
    assert.equal(m1.villagerWalk([0, 0, 0], [0, 2, 0], 0.5, 0, 1).walk, 0);
    const vMid = m1.villagerWalk([0, 0, 0], [0, 0, 4], 0.5, 0, 1);
    const vStop = m1.villagerWalk([0, 0, 0], [0, 0, 4], 1.1, 0, 1);
    const vDone = m1.villagerWalk([0, 0, 0], [0, 0, 4], 1.5, 0, 1);
    assert.ok(vMid.walk > 0 && vMid.gaitWeight > 0.5);
    near(vStop.walk, 4);
    assert.ok(vStop.gaitWeight > 0 && vStop.gaitWeight < 1);
    near(vDone.walk, 4);
    near(vDone.gaitWeight, 0);

    // F2: ExplainerCrowd forwards animDistance, time, blendTo, blend, plantFeet, face, lookAt
    const crowdEl = m1.ExplainerCrowd({
      positions: [[0, 0, 0], [2, 0, 0]],
      animation: 'walk',
      animDistance: [0.4, 1.1],
      time: 0.85,
      blendTo: 'idle',
      blend: 0.6,
      plantFeet: true,
      face: 'happy',
      lookAt: [0, 1.5, 3],
    });
    const children = crowdEl.props.children;
    assert.equal(children.length, 2);
    assert.equal(children[0].props.animDistance, 0.4);
    assert.equal(children[1].props.animDistance, 1.1);
    assert.equal(children[0].props.time, 0.85);
    assert.equal(children[0].props.blendTo, 'idle');
    assert.equal(children[0].props.blend, 0.6);
    assert.equal(children[0].props.plantFeet, true);
    assert.equal(children[0].props.face, 'happy');
    assert.deepEqual(children[0].props.lookAt, [0, 1.5, 3]);

    // F4: money.tsx z-fighting clearances
    const stackEl = m1.CoinStack({ count: 3, radius: 0.16 });
    const coinYs = stackEl.props.children.map(c => c.props.position[1]);
    assert.ok(coinYs[1] - coinYs[0] >= 0.16 * 0.28 + 0.002 - 1e-9);
    const pileEl = m1.CoinPile({ count: 12, radius: 0.14 });
    for (const c of pileEl.props.children) {
      const [rx, , rz] = c.props.tilt;
      const minRimLift = Math.hypot(Math.sin(rx), Math.sin(rz)) * 0.14;
      assert.ok(c.props.position[1] - minRimLift >= 0.0029);
    }
    const billsEl = m1.BillStack({ count: 6 });
    const billNodes = billsEl.props.children[0];
    const bandNode = billsEl.props.children[1];
    assert.ok(billNodes[1].props.position[1] - billNodes[0].props.position[1] >= 0.019 - 1e-9);
    const bandBottom = bandNode.props.position[1] - bandNode.props.size[1] / 2;
    assert.ok(bandBottom >= -1e-9, `BillStack paper band must not clip below y=0 (got ${bandBottom})`);
    const printerEl = m1.Printer({ out: 3.4 });
    const trayBills = printerEl.props.children.flat().filter(n => n && n.type === m1.Printer ? false : n?.props?.rotationY === Math.PI / 2 || (typeof n?.props?.rotationY === 'number' && n?.props?.position?.[2] > 0.65));
    assert.ok(trayBills.length >= 3);
    assert.ok(trayBills[0].props.position[1] >= 0.382 - 1e-9);
    assert.ok(trayBills[1].props.position[1] - trayBills[0].props.position[1] >= 0.019 - 1e-9);
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true });
  }

  // F5: directionReport catches outExpo > 0.95s, stationary/frozen walks, and World-vs-Stage collisions
  const Villager = () => null;
  const Hero = () => null;
  const Furnace = () => null;
  const Boat = () => null;
  const SnowTrail = () => null;
  const Vox = () => null;
  const Zone = ({ children }) => children;

  const whipLong = directionReport({
    fps: 30,
    captions: { motion: 'on-beat' },
    scenes: [{
      id: 's1',
      duration: 2,
      shots: [{ cue: '1.a', from: [0, 1.5, 4], target: [0, 1.2, 0], targetTo: [3, 1.2, 0], at: 0, dur: 2, ease: 'outExpo' }],
      sampleStage: (_i, t) => createElement(Hero, { position: [t, 0, 0] }),
    }],
  });
  assert.match(whipLong.unfinished.join('\n'), /freezes the tail/);

  const whipShort = directionReport({
    fps: 30,
    captions: { motion: 'on-beat' },
    scenes: [{
      id: 's1',
      duration: 0.4,
      shots: [{ cue: '1.a', from: [0, 1.5, 4], target: [0, 1.2, 0], targetTo: [3, 1.2, 0], at: 0, dur: 0.4, ease: 'outExpo' }],
      sampleStage: (_i, t) => createElement(Hero, { position: [t, 0, 0] }),
    }],
  });
  assert.equal(whipShort.unfinished.filter(m => m.includes('freezes the tail')).length, 0);

  const badWalks = directionReport({
    fps: 30,
    captions: { motion: 'on-beat' },
    scenes: [{
      id: 's1',
      duration: 1.5,
      shots: [{ cue: '1.a', from: [0, 1.5, 4], to: [0, 1.5, 2], target: [0, 1.2, 0], at: 0, dur: 1.5 }],
      sampleStage: (_i, t) => createElement('group', null,
        createElement(Villager, { position: [0, 0, 0], walk: t * 1.2 }),
        createElement(Hero, { position: [1, 0, 0], animation: 'stagger' }),
        createElement(Hero, { position: [Math.min(t, 0.4) * 2, 0, 1], animation: 'walk', animDistance: Math.min(t, 0.4) * 2 }),
      ),
    }],
  });
  assert.match(badWalks.unfinished.join('\n'), /plays walk cycle.*while stationary/);
  assert.match(badWalks.unfinished.join('\n'), /without animDistance/);
  assert.match(badWalks.unfinished.join('\n'), /freezes mid-stride/);

  const cleanWalks = directionReport({
    fps: 30,
    captions: { motion: 'on-beat' },
    scenes: [{
      id: 's1',
      duration: 1.5,
      shots: [{ cue: '1.a', from: [0, 1.5, 4], to: [0, 1.5, 2], target: [0, 1.2, 2], at: 0, dur: 1.5 }],
      sampleStage: (_i, t) => createElement(Hero, { ...walkSegment([0, 0, 0], [0, 0, 2], t, 0, 0.6), time: t }),
    }],
  });
  assert.deepEqual(cleanWalks.unfinished, []);

  // F6: Catch sideways/backward walks, standing floor-slides, and blocking World pillars, while allowing planted acting
  const LampPost = () => null;
  const sideAndSlide = directionReport({
    fps: 30,
    captions: { motion: 'on-beat' },
    World: () => createElement(Zone, { name: 'town' }, createElement(LampPost, { position: [0, 0, 2] })),
    scenes: [{
      id: 's1',
      duration: 3,
      shots: [
        { cue: '1.a', zone: 'town', from: [0, 1.4, 5], to: [0.6, 1.4, 4.4], target: [0, 1.2, 0], at: 0, dur: 1 },
        { cue: '1.b', zone: 'town', from: [0, 1.4, 5], to: [0.6, 1.4, 4.4], target: [0, 1.2, 0], at: 1, dur: 1 },
        { cue: '1.c', zone: 'town', from: [2, 1.4, 5], to: [2, 1.4, 3.8], target: [2, 1.2, 0], at: 2, dur: 1 },
      ],
      sampleStage: (i, t) => i === 0
        ? createElement(Hero, { position: [0, 0, -t * 1.5], rotationY: Math.PI / 2, animation: 'walk', animDistance: t * 1.5, time: t })
        : i === 1
          ? createElement(Hero, { position: [t * 0.4, 0, 0], rotationY: 0, animation: 'shrug', time: t })
          : createElement(Hero, { position: [2, 0, 0], rotationY: 0, animation: 'wave', time: t }),
    }],
  });
  assert.match(sideAndSlide.unfinished.join('\n'), /walks sideways\/backwards/);
  assert.match(sideAndSlide.unfinished.join('\n'), /slides 0\.3\dm while in standing pose "shrug"/);
  assert.match(sideAndSlide.unfinished.join('\n'), /Camera ray blocked by World <LampPost>/);
  assert.equal(sideAndSlide.unfinished.filter(m => m.includes('[1.c]')).length, 0);

  const collisions = directionReport({
    fps: 30,
    captions: { motion: 'on-beat' },
    World: () => createElement(Zone, { name: 'town' },
      createElement(Vox, { kind: 'cobble', position: [0, -0.2, 0], size: [10, 0.5, 10] }),
      createElement(SnowTrail, { points: [[0, 0, 0]] }),
      createElement(Furnace, { position: [2, 0, 0] }),
      createElement(Vox, { kind: 'darkPlanks', position: [4, 0.1, 4], size: [1.7, 0.2, 3.6] }),
    ),
    scenes: [{
      id: 's1',
      duration: 1,
      shots: [{ cue: '1.a', zone: 'town', from: [0, 1.5, 6], to: [0, 1.5, 3], target: [0, 1, 0], at: 0, dur: 1 }],
      sampleStage: (_i, t) => createElement('group', null,
        createElement(Furnace, { position: [2, 0, 0], lit: t > 0.5 }),
        createElement(Boat, { position: [4, 0, 4] }),
      ),
    }],
  });
  assert.match(collisions.unfinished.join('\n'), /World coplanar y=0\.050: Vox vs SnowTrail/);
  assert.match(collisions.unfinished.join('\n'), /Dup World\+Stage <Furnace>/);
  assert.match(collisions.unfinished.join('\n'), /Stage <Boat> intersects World <Vox>/);
});

test('Remaster v3: grounded lie/sleep, cam.front/twoShot/fitWidth, anti-back, lens occlusion, 9:16 over-zoom, phasing & passive mannequin gate', async () => {
  // 1. Grounded lie & sleep poses (HIP=0.675, bodyY=-0.45 => hip=0.225 = 4*PX, head back flush at y=0)
  const { getPose } = mod;
  assert.equal(getPose('lie', 0).bodyY, -0.45);
  assert.ok(Math.abs(getPose('sleep', 0).bodyY - (-0.45)) < 0.01);

  // 2. cam.front, cam.twoShot, cam.fitWidth
  const { pathToFileURL } = await import('node:url');
  const out = path.join(root, 'out');
  fs.mkdirSync(out, { recursive: true });
  const scratch = fs.mkdtempSync(path.join(out, '.v3-cam-'));
  try {
    const outfile = path.join(scratch, 'cam-v3.mjs');
    await build({
      stdin: { contents: `export * from './src/engine/cam';`, resolveDir: root },
      outfile,
      platform: 'node',
      format: 'esm',
      target: 'node22',
      packages: 'external',
      bundle: true,
      logLevel: 'silent',
    });
    const { cam } = await import(pathToFileURL(outfile));
    const f = cam.front({ actor: [0, 0, 0], facing: Math.PI });
    assert.ok(f.from[2] < 0, 'cam.front for actor facing -Z (Math.PI) must stand on the -Z front side');
    const tw = cam.twoShot({ a: [-1.2, 0, 0], b: [1.2, 0, 0], facing: 0 });
    assert.ok(tw.from[2] > 4.4, 'cam.twoShot must auto-fit wide enough for 9:16');
    assert.ok(cam.fitWidth(2.4, 44, 0.82) > 5.0);
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true });
  }

  // 3. directionReport v3 gates
  const Hero = () => null;
  const Dad = () => null;
  const Sign = () => null;
  const Vox = () => null;
  const Zone = ({ children }) => children;

  const v3Bad = directionReport({
    fps: 30,
    captions: { motion: 'on-beat' },
    World: () => createElement(Zone, { name: 'room' }, createElement(Vox, { position: [5, 1.5, 0], size: [2, 3, 2] })),
    scenes: [{
      id: 's1',
      duration: 5,
      shots: [
        // Back-of-head shot without behind/OTS note
        { cue: '1.back', zone: 'room', from: [0, 1.5, 5], to: [0, 1.5, 4], target: [0, 1.2, 0], at: 0, dur: 1, note: 'Dad looking at desk.' },
        // Actor blocking lens between camera (z=5) and target (z=0)
        { cue: '1.block', zone: 'room', from: [0, 1.5, 5], to: [0, 1.5, 4], target: [0, 1.2, 0], at: 1, dur: 1, note: 'Hero talks.' },
        // Over-zoomed 9:16 with 2 actors + Sign
        { cue: '1.zoom', zone: 'room', from: [0, 1.4, 1.8], to: [0, 1.4, 1.3], target: [0, 1.2, 0], fov: 36, at: 2, dur: 1, note: 'Two actors and sign.' },
        // Actor phasing into World wall + two actors phasing into each other
        { cue: '1.phase', zone: 'room', from: [5, 1.5, 5], to: [5, 1.5, 4], target: [5, 1.2, 0], at: 3, dur: 1, note: 'Phasing test.' },
        // Passive sit + time={t} must NOT count as acting when repeated
        { cue: '1.hop', zone: 'room', from: [0, 1.5, 5], to: [0, 1.5, 4], target: [0, 1.2, 0], at: 4, dur: 1, note: 'Cartoon hop recoil.' },
      ],
      sampleStage: (i, t) => {
        if (i === 0) return createElement(Dad, { position: [0, 0, 0], rotationY: Math.PI, animation: 'wave', time: t });
        if (i === 1) return createElement('group', null,
          createElement(Hero, { position: [0, 0, 0], rotationY: 0, animation: 'wave', time: t }),
          createElement(Dad, { position: [0, 0, 2.5], rotationY: 0, animation: 'idle' }),
        );
        if (i === 2) return createElement('group', null,
          createElement(Hero, { position: [-0.6, 0, 0], rotationY: 0, animation: 'wave', time: t }),
          createElement(Dad, { position: [0.6, 0, 0], rotationY: 0, animation: 'wave', time: t }),
          createElement(Sign, { position: [0, 1.6, 0] }),
        );
        if (i === 3) return createElement('group', null,
          createElement(Hero, { position: [5, 0, 0], rotationY: 0, animation: 'wave', time: t }),
          createElement(Dad, { position: [5.1, 0, 0], rotationY: 0, animation: 'wave', time: t }),
        );
        // Cartoon hop arc that starts & ends at y=0 must NOT trigger standing-slide error
        const hopY = Math.sin(Math.PI * t) * 0.4;
        return createElement(Hero, { position: [t * 0.5, hopY, 0], rotationY: 0, animation: 'idle', time: t });
      },
    }],
  });
  const msg = v3Bad.unfinished.join('\n');
  assert.match(msg, /Camera shoots the back of Dad/);
  assert.match(msg, /Actor <Dad>.*blocks the camera view/);
  assert.match(msg, /Over-zoomed for 9:16/);
  assert.match(msg, /Actors <Hero> and <Dad> phase into each other/);
  assert.match(msg, /Actor <Hero>.*phases inside World <Vox>/);
  assert.equal(v3Bad.unfinished.filter(m => m.includes('[1.hop]') && m.includes('slides')).length, 0, 'hop arc must not be flagged as standing slide');
});
