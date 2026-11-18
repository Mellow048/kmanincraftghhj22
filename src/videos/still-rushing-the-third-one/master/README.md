# Rebuilding the popcorn master

The delivered MP4 is a **full 3-D render at 1080×1920**, not a slideshow or an upscale. The studio composition is registered as `still-rushing-the-third-one`. The delivery path below uses one offscreen GLES context instead of screenshotting a headless browser 2,552 times. It consumes the composition's actual instanced room/actor matrices, push cameras, recorded word clock, pixel-caption textures and finished mix. `render.py` supplies the master-specific shadow, practical light, grain, screen flicker and grade; a Remotion Studio preview is **not** a pixel match for that lighting pass.

Run these commands **from the repository root**. Use a scratch directory for the ~125 MiB frame bake. It is disposable; do not track it or a sequence of master PNGs.

```sh
slug=still-rushing-the-third-one
d=src/videos/$slug
bake=out/$slug/bake
npm ci
# Inside a Python virtual environment:
python3 -m pip install numpy==2.3.5 PyOpenGL==3.1.10 imageio-ffmpeg==0.8.1 Pillow
npm run typecheck && npm run check
node scripts/rehearse.mjs "$slug" --final
node "$d/master/export.mjs" "$bake"
python3 "$d/master/verify.py" "$bake"   # all four drills, moving geometry inside the lens
```

On a machine with a working surfaceless EGL/GLES3 driver:

```sh
EGL_PLATFORM=surfaceless PYOPENGL_PLATFORM=egl \
  python3 "$d/master/render.py" "$bake" "renders/$slug.mp4"
```

The **tested sandbox path** was Linux x64 CPU rendering with the ANGLE / SwiftShader libraries from `@sparticuz/chromium@131.0.1`. Only the graphics libraries are needed, not a browser or dev server. To reproduce on a minimal Linux sandbox:

```sh
gpu=$(mktemp -d)
tgz=$(npm pack @sparticuz/chromium@131.0.1 --silent --pack-destination "$gpu")
tar -xOzf "$gpu/$tgz" package/bin/swiftshader.tar.br \
  | node -e "process.stdin.pipe(require('node:zlib').createBrotliDecompress()).pipe(process.stdout)" \
  | tar -xf - -C "$gpu"
ln -s libEGL.so "$gpu/libEGL.so.1"
ln -s libGLESv2.so "$gpu/libGLESv2.so.2"
ln -s libGLESv2.so "$gpu/libGL.so.1"
export LD_LIBRARY_PATH="$gpu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
export VK_ICD_FILENAMES="$gpu/vk_swiftshader_icd.json" PYOPENGL_PLATFORM=egl
python3 "$d/master/render.py" "$bake" "renders/$slug.mp4" --angle
```

Both paths draw each frame on its own clock; neither interpolates pictures. FFmpeg takes the frames through a pipe, explicitly converts to BT.709 4:2:0, encodes H.264, adds the AAC mix and moves the MP4 index to the front. To inspect contact **before** a full encode, make a separate partial bake:

```sh
node "$d/master/export.mjs" out/popcorn-inserts 0,5,10,22,34,45,319,943,1424,1593,1616,1940,2312,2528
python3 "$d/master/render.py" out/popcorn-inserts out/popcorn-stills --stills --width 360 --angle
```

### Sound and delivery checks

The final `mix.mp3` is already in `public/audio/$slug/`. A picture rebuild does **not** require new voice generation. If deliberately editing the recorded performances, install `pocketsphinx` alongside the Python packages above, then rebuild in order:

```sh
python3 "$d/assemble-reps.py"   # six recorded breath bursts → four three-beat WAVs with exact sidecars
python3 scripts/narration.py build "$slug" --require-alignment --tempo 1 --gap .09 --tail .66
python3 scripts/sound.py build "$slug"
# Rebuild the picture clock above, including the bake and the MP4, after a timing change.
```

For a completed master, `verify.py` counts **decoded** frames with FFprobe and correlates the muxed AAC with the actual mix at the opening, kitchen practice, delayed drill, final catch and audience echo. It uses a system FFprobe, or the Linux compositor copy from `npm ci`. Then inspect the picture, not just the counts:

```sh
python3 "$d/master/verify.py" "$bake" "renders/$slug.mp4"
python3 scripts/film-metrics.py "renders/$slug.mp4" --cues
```
