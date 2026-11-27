# Small-Model Render Guide (Remaster v4 — Batch 2 Ready-to-Render Shorts, 100% Free `edge-tts`)

> **READ `docs/CRITIQUE-V4-QUALITY-GATES.md` FIRST.**
> Remaster v4 fixes TTS speed (`+0%` natural pace, NOT rushed `+10%`), adds automatic `0.42s` breath pauses between clips (`--gap 0.42`), raises BGM loudness (`-12`/`-13` with instant start), widens 9:16 cameras (`dist >= 6.2`) so zero 3D text clips, and adds missing `pixelfont.ts` glyphs (`=`, `/`, `$`, `(`, `)`, `#`, `&`, `—`).

| # | Topic | Slug (Batch 2 — Upgraded v4) | Recommended Edge-TTS Rate |
|---|-------|------------------------------|---------------------------|
| 1 | `explainer` | `taxes-explained-using-minecraft` | `--rate=+0%` (~195–205 WPM) |
| 2 | `server-lore` | `the-player-who-never-left-the-spawn-bench` | `--rate=-2%` (~180–195 WPM) |
| 3 | `in-this-town` | `in-this-town-you-cant-drop-your-torch` | `--rate=+3%` (~210–220 WPM) |

> **IMPORTANT RULE — FREE TTS ONLY:**
> **NEVER** use ElevenLabs. Always use `scripts/tts.py` (default `--engine edge`, `--rate=+0%`) or `.github/workflows/tts.yml`. Offline fallback: `--engine kokoro`.

---

## Step 1 — Install Dependencies (Once)

```bash
npm install
pip install edge-tts pocketsphinx numpy
```

---

## Step 2 — Generate Natural-Paced Free Voiceovers, Align with Breath Pauses & Mix Audio

Run these exact commands for each of the **3 Batch 2 slugs** (or trigger GitHub Actions → **Generate TTS narration and audio mix** `.github/workflows/tts.yml` per slug):

### Film 1 — `taxes-explained-using-minecraft` (Explainer)
```bash
python3 scripts/tts.py taxes-explained-using-minecraft --voice en-US-GuyNeural --rate=+0%
python3 scripts/narration.py build taxes-explained-using-minecraft --require-alignment --gap 0.42
python3 scripts/sound.py build taxes-explained-using-minecraft
```

### Film 2 — `the-player-who-never-left-the-spawn-bench` (ServerLore — Zero Scoreboards)
```bash
python3 scripts/tts.py the-player-who-never-left-the-spawn-bench --voice en-US-AndrewNeural --rate=-2%
python3 scripts/narration.py build the-player-who-never-left-the-spawn-bench --require-alignment --gap 0.42
python3 scripts/sound.py build the-player-who-never-left-the-spawn-bench
```

### Film 3 — `in-this-town-you-cant-drop-your-torch` (InThisTown Short)
```bash
python3 scripts/tts.py in-this-town-you-cant-drop-your-torch --voice en-US-ChristopherNeural --rate=+3%
python3 scripts/narration.py build in-this-town-you-cant-drop-your-torch --require-alignment --gap 0.42
python3 scripts/sound.py build in-this-town-you-cant-drop-your-torch
```

---

## Step 3 — Wire Each `film.tsx` to Its Mixed Audio Track

Once `scripts/sound.py build <slug>` creates `public/audio/<slug>/mix.mp3`, add this one line inside `defineFilm({ ... })` in each `src/videos/<slug>/film.tsx`:

- `src/videos/taxes-explained-using-minecraft/film.tsx` → `audio: { src: "audio/taxes-explained-using-minecraft/mix.mp3" },`
- `src/videos/the-player-who-never-left-the-spawn-bench/film.tsx` → `audio: { src: "audio/the-player-who-never-left-the-spawn-bench/mix.mp3" },`
- `src/videos/in-this-town-you-cant-drop-your-torch/film.tsx` → `audio: { src: "audio/in-this-town-you-cant-drop-your-torch/mix.mp3" },`

---

## Step 4 — Verify Everything Passes Before Rendering

```bash
npm run typecheck
npm run check
npm run test:direction
npm run rehearse -- taxes-explained-using-minecraft --final
npm run rehearse -- the-player-who-never-left-the-spawn-bench --final
npm run rehearse -- in-this-town-you-cant-drop-your-torch --final
```

---

## Step 5 — Push & Render on GitHub Actions (`render.yml`)

```bash
git add src/videos/ public/audio/
git commit -m "Add Remaster v4 edge-tts mixes and timings for Batch 2 Shorts"
git push origin main
```

Then open **Actions → Render short (`render.yml`) → Run workflow** once per slug:
- `taxes-explained-using-minecraft`
- `the-player-who-never-left-the-spawn-bench`
- `in-this-town-you-cant-drop-your-torch`
