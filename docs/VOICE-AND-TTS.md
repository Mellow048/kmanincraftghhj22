# MANDATORY TTS & VOICE STANDARD (IGNORE ALL OLDER VOICE NOTES)

> **CRITICAL OVERRIDE:** If any older file in this repo mentions `voice-00`, `voice-01`, `voice-08`, slow/heavy documentary voices, or conflicting TTS notes from earlier drafts, **IGNORE THEM.** This document is the single standing voice rule for **every Arena agent** and **every new Short**.

---

## 1. Required Voice Profile (Non-Negotiable Checklist)

Every narration TTS you pick or audition **MUST match ALL FIVE traits**:

| Trait | Required | Immediate Reject (Do NOT Use) |
|---|---|---|
| **Gender** | **Male** | Female narrator (unless casting a specific side character's dialogue line) |
| **Accent** | **No accent / Natural American English** | British, Australian, thick regional, or synthetic ESL-sounding voices |
| **Energy** | **Energetic & engaged** | Sleepy, flat, bored, monotone reading |
| **Age feel** | **Young / NOT old** (teen to young-adult storyteller energy) | Deep grandpa/movie-trailer boomer voice or weathered "wise old man" |
| **Tone** | **NOT too serious** — bright, expressive, reactive, human | Heavy grimdark, stiff news anchor, corporate/explainer robot, melodramatic gloom |

### Why This Exact Voice Wins on YouTube Shorts
- Compare the 1k-in-15h flops vs the winners (*Creeper Parents*, *Enderman Parents*, *Never Walk Alone After Dark*): viewers decide in **0.5 seconds** whether the speaker feels like **a fun friend telling a wild Minecraft story** or **an AI content farm**.
- A young, energetic, unaccented male storyteller sells jokes (*"we're on our ninth baker"*), awkward kid embarrassment (*"they cluck when I walk by"*), AND sudden emotional dread (*"five blocks... two blocks..."*) cleanly in the same 2-minute run.

---

## 2. Audition & Delivery Rules

1. **Test-listen BEFORE batch-recording the whole script:** Generate or audition one 1-sentence test line first (including both a joke beat and an urgent climax beat). If the voice sounds:
   - robotic / "cheap TTS generator"
   - too old, overly gravelly, or too serious
   - accented or clipped with weird mid-sentence pauses
   **reject it immediately and pick a better candidate before generating the rest.**
2. **Delivery speed & clarity:**
   - Natural spoken pace + tuned output via `scripts/narration.py build <film>` around **230–255 words per minute** (`tempo` roughly `1.30x–1.47x`, never muddy or slurred).
   - Never compress dramatic reveals using frantic fast-forwarding (`> 265 wpm`); instead write crisp 4–10 word punchy sentences!
   - Use short intentional breath gaps (`# clip <name> wait 0.25` to `0.45`) ONLY right before punchlines or plot twists — never leave dead-air gaps at the start (`0.0s`) or across idle street walks.
3. **Never write "AI trailer" lines:** No TTS on earth can save *"Little did he know, a shadow awaited."* Keep every line conversational, as if spoken out loud to a 9-year-old friend (`docs/NARRATION-RULES.md`).

---

## 3. Mix Check (Post-Build Gate)

When running `python3 scripts/sound.py build <film>`:
- Voice sits **13–17 dB** above the music/ambient bed (median), and **never drops below 3–4 dB** over any SFX burst (`sound.lock.json`).
- **0.0s–0.3s:** Voice starts IMMEDIATELY on beat 1 of the video. No musical intro.

---

## 4. Generating & Aligning TTS on This Machine

1. **Primary TTS (`edge-tts`, zero API keys required):**
   - Use **`en-US-GuyNeural`** at **`--rate=+10%`** (same energetic young American male voice used in the remastered *Mountain* and *Fox* Shorts; keeps `narration.py` `atempo` cleanly inside `1.30x–1.45x`).
   - Run the wrapper:
     ```bash
     python3 scripts/tts.py <slug> --voice en-US-GuyNeural --rate=+10%
     ```
     This reads `src/videos/<slug>/narration.md` via `narration.read_script(slug)` and writes `public/audio/<slug>/raw/<clip>.mp3`.
   - **Offline fallback (`kokoro-onnx`):** If outbound `speech.platform.bing.com` is unavailable, use the cached local Kokoro v1.0 model (`~/.cache/hyperframes/tts/models/kokoro-v1.0.onnx` + `voices-v1.0.bin`):
     ```bash
     python3 scripts/tts.py <slug> --engine kokoro --voice am_puck
     ```
2. **Forced Alignment (`pocketsphinx` via cached `uv` environment):**
   - `pocketsphinx` (`5.1.1`) and `numpy` (`2.5.5`) are pre-cached in `uv`'s Python `3.14` environment (rather than system `/usr/bin/python3`). Always run `narration.py build` through `uv run --offline`:
     ```bash
     uv run --offline --with numpy --with pocketsphinx python scripts/narration.py build <slug> --require-alignment
     ```
   - If any word in `narration.md` is missing from CMUdict, add its ARPAbet pronunciation to `SAY` in `scripts/narration.py` and re-run (`--require-alignment` aborts cleanly without replacing outputs).
3. **Final Audio Mix (`sound.py`):**
   ```bash
   python3 scripts/sound.py build <slug>
   ```
   Writes `public/audio/<slug>/mix.mp3` and `src/videos/<slug>/sound.lock.json`. Ensure `film.tsx` sets `audio: { src: "audio/<slug>/mix.mp3" }` and re-run `npm run rehearse -- <slug> --final`.
