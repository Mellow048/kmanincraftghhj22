/** Bake the film's real instanced sets, rigs, lens and engine caption textures. Only transient data goes to outDir. */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
if (!process.argv[2])
  throw Error("Usage: node master/export.mjs OUT_DIR [all|FRAME,FRAME,…]");
const here = path.dirname(fileURLToPath(import.meta.url)),
  dir = path.resolve(here, ".."),
  out = path.resolve(process.argv[2]);
fs.mkdirSync(out, { recursive: true });
const result = await build({
  stdin: {
    contents: `export {film} from './film'; export {acting,timing} from './action'; export {rooms} from './sets'; export {Blocks} from './blocks'; export {easings} from '../../engine/math'; export {wordTexture} from '../../engine/pixelfont'; export {captionText} from '../../engine/Captions'; export {beatFrames,captionBeat,captionPixel} from '../../engine/caption-beat';`,
    resolveDir: dir,
  },
  bundle: true,
  write: false,
  platform: "node",
  packages: "external",
  format: "cjs",
  jsx: "automatic",
});
const req = createRequire(import.meta.url),
  mod = { exports: {} };
new Function("module", "exports", "require", result.outputFiles[0].text)(
  mod,
  mod.exports,
  req,
);
const {
  film,
  acting,
  rooms,
  Blocks,
  timing,
  wordTexture,
  captionText,
  beatFrames,
  captionBeat,
  captionPixel,
  easings,
} = mod.exports;
const T = req("three"),
  W = film.width,
  H = film.height,
  FPS = film.fps;
function pack(parts) {
  const a = new Float32Array(parts.length * 20);
  for (const [i, p] of parts.entries()) {
    const k = i * 20;
    a.set(p.matrix.elements, k);
    a[k + 16] = ((p.rgb >> 16) & 255) / 255;
    a[k + 17] = ((p.rgb >> 8) & 255) / 255;
    a[k + 18] = (p.rgb & 255) / 255;
    a[k + 19] = p.glow;
  }
  return Buffer.from(a.buffer);
}
const manifests = {
  rooms: {},
  caps: {},
  frames: [],
  width: W,
  height: H,
  fps: FPS,
  total: film.durationInFrames,
};
for (const [name, fn] of Object.entries(rooms)) {
  const b = new Blocks();
  fn(b);
  fs.writeFileSync(path.join(out, `${name}.bin`), pack(b.parts));
  manifests.rooms[name] = b.parts.length;
}
const flat = [];
let off = 0;
for (const sc of film.scenes) {
  for (const sh of sc.shots) {
    // This master implements this film's push lenses only. Don't silently flatten a future camera move.
    for (const field of [
      "path",
      "arc",
      "targetPath",
      "aim",
      "roll",
      "rollTo",
      "handheld",
      "shake",
      "impacts",
      "focalLength",
      "focalLengthTo",
      "fovTo",
    ]) {
      if (sh[field])
        throw Error(
          `Unsupported lens field ${field} in ${sh.cue}; extend the master before rendering.`,
        );
    }
    flat.push({ ...sh, scStart: off });
  }
  off += Math.round(sc.duration * FPS) / FPS;
}
const begins = beatFrames(timing.words, FPS),
  cam = new T.PerspectiveCamera(40, W / H, 0.05, 70);
const farg = process.argv[3] || "all",
  frames =
    farg === "all"
      ? Array.from({ length: film.durationInFrames }, (_, i) => i)
      : farg.split(",").map(Number);
if (
  !frames.length ||
  frames.some(
    (n) => !Number.isInteger(n) || n < 0 || n >= film.durationInFrames,
  )
)
  throw Error("Frame outside this composition.");
const dyn = fs.openSync(path.join(out, "acting.bin"), "w");
let byte = 0;
for (const n of frames) {
  const tm = n / FPS;
  const shot = flat.findLast((s) => s.scStart + s.at <= tm + 1e-6) ?? flat[0],
    local = tm - shot.scStart - shot.at,
    e = easings[shot.ease ?? "inOutCubic"](
      Math.max(0, Math.min(1, local / shot.dur)),
    );
  const v = (a, b) => new T.Vector3(...a).lerp(new T.Vector3(...(b ?? a)), e);
  cam.position.copy(v(shot.from, shot.to));
  cam.lookAt(v(shot.target, shot.targetTo));
  cam.fov = shot.fov ?? 38;
  cam.updateProjectionMatrix();
  cam.updateMatrixWorld(true);
  const vp = cam.projectionMatrix.clone().multiply(cam.matrixWorldInverse);
  const cue = timing.cues.find((c) => c.id === shot.cue);
  const parts = acting(shot.cue, tm - cue.start);
  const buf = pack(parts);
  fs.writeSync(dyn, buf);
  const beat = captionBeat(timing.words, begins, n, FPS);
  let cap = null;
  if (beat) {
    const txt = captionText(beat.word.w);
    if (txt) {
      if (!manifests.caps[txt]) {
        const image = wordTexture(txt).image;
        manifests.caps[txt] = [
          image.width,
          image.height,
          Buffer.from(image.data).toString("base64"),
        ];
      }
      const [w, h] = manifests.caps[txt],
        px = captionPixel(W, w, film.captions.size ?? 1, true) * beat.scale;
      cap = [
        txt,
        0,
        1 - 2 * (film.captions.y - beat.lift),
        (w * px) / W,
        (h * px) / H,
      ];
    }
  }
  manifests.frames.push({
    n,
    cue: shot.cue,
    room: shot.zone,
    byte,
    count: parts.length,
    vp: vp.toArray(),
    cap,
  });
  byte += buf.length;
}
fs.closeSync(dyn);
fs.writeFileSync(path.join(out, "frames.json"), JSON.stringify(manifests));
console.log(
  `${frames.length} frames, ${Object.keys(manifests.caps).length} distinct caption textures, ${Math.round(byte / 1048576)} MiB transient choreography`,
);
