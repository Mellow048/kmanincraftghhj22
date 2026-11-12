# renders

Review copies. `.gitignore` drops `out/` and every `*.mp4` the pipeline makes,
so these two files are here on purpose and force-added:

- `never-look-at-the-moon.mp4` — 1080×1920, 30 fps, 19.6 s, h264 + aac.
  The finished short, with voice.
- `never-look-at-the-moon-sheet.png` — one frame per beat, for skimming.

The source of truth is `src/videos/never-look-at-the-moon/`. Re-render with:

```bash
npx remotion render src/index.ts never-look-at-the-moon out/never-look-at-the-moon.mp4
```

Nothing else belongs in this folder.
