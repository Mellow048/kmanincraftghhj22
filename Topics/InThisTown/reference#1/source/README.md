# Frozen source for the Broken Egg MP4

This is a **copy of the runnable live code**, not another registered film. Its paths are repository-relative, so you can inspect the project folder (`src/videos/in-this-town-monster-egg/`), the reusable map/creature kit (`Topics/InThisTown/`), engine extensions, exact `public/audio/` MP3s and the two rendering workflows together. `manifest.json` records a SHA-256 digest for each copied file.

## Rebuild it in a compatible ZackCraft Films checkout

1. Start with this repository's framework (`npm ci`; keep the existing React, Remotion, Three and TypeScript versions). Do not render from inside `source/`.
2. From the repository root, copy `source/src/`, `source/Topics/`, and `source/public/` **into the matching root directories**, preserving the subpaths. The copied `src/engine/{Look,types,defineFilm}` contains the day look and timed audio-cue support this film uses. The copied `src/registry.ts` registers the composition; if your checkout already has additional films, *merge* its one import and list entry rather than overwriting your registry.
3. Make sure the `public/audio/in-this-town-monster-egg/` MP3s are present. `source/Topics/InThisTown/reference#1/audio/make-bed.py` can regenerate the **instrumental/foley bed**; the voice clips are exact, pre-generated recordings.
4. Run `npm run typecheck && npm run check`, inspect a still, then render `in-this-town-monster-egg` at 720 × 1280, 30 fps, H.264 with `--gl=swangle`. See [`../README.md`](../README.md) for the commands. The MP4 beside this folder is the reference output.

The workflow copies in `.github/workflows/` are optional CI helpers; merge them into a checkout only if you want GitHub Actions rendering. They are *not* 3D assets. The geometry is original procedural Minecraft-style blocks, textures and meshes; there are no Roblox model downloads, external image URLs or required stock sounds.

## When editing the reference

Edit the **live** `src/` and `Topics/` files first, render/inspect the result, then from the root run:

```bash
node 'Topics/InThisTown/reference#1/freeze-source.mjs'
node 'Topics/InThisTown/reference#1/freeze-source.mjs' --check
```

Do not edit only this snapshot: its manifest and the MP4 would then describe different films. Temporary stills and WAVs stay in ignored `out/`, not here.
