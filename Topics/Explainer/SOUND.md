# The Sound of an Explainer (`SOUND.md`)

> **MANDATORY EXPLAINER BACKGROUND MUSIC (ALL NEW FILMS):**  
> Every Explainer short **MUST** use **`Topics/Explainer/explainer_bgm_loop.wav`** as its background music track (`"track": "Topics/Explainer/explainer_bgm_loop.wav"`), kept well under the narration (**`gain: -19`**, `17–25 dB` below the voice) so it **NEVER overpowers or competes with the voice**.  
> `scripts/sound.py draft` inserts this automatically and `scripts/sound.py build` refuses any new Explainer `sound.json` without it.

An Explainer is never voice only. Under the clear narration sits `explainer_bgm_loop.wav`, ambient room/world bed, and crisp Minecraft-style sound effects timed directly to every visual cut, emerald drop, vote pop, rule change, or lever pull.

---

## Commands

```bash
python3 scripts/sound.py draft <film>    # automatically wires Topics/Explainer/explainer_bgm_loop.wav at gain -19
python3 scripts/sound.py build <film>    # builds public/audio/<film>/mix.mp3 + prints voice-vs-music balance report
python3 scripts/sound.py check <film>    # checks levels without rebuilding
```

---

## Keeping BGM Subtle & Never Overpowering (`musicUnderVoiceDb: [17, 25]`)

`explainer_bgm_loop.wav` is an upbeat 32.5s loop mastered hot (`-13.7 LUFS`). `scripts/sound.py` scales its RMS relative to your narrator's speaking level:

```json
"music": {
  "track": "Topics/Explainer/explainer_bgm_loop.wav",
  "gain": -19,
  "sections": [
    { "from": "1.hook", "mood": "explain" },
    { "from": "5.climax", "mood": "tense", "gain": -2 },
    { "from": "8.loop", "mood": "explain", "gain": 0 }
  ]
}
```

- **Default `gain: -19`** keeps music **`~19 dB` below the narration**. Do NOT push `gain` louder than `-16` (`musicUnderVoiceDb` check fails under `17 dB` of headroom!).
- Drop a quiet dramatic section by `gain: -3` (or `mood: "none"` for up to `1.5–2s` max silence) before the big reveal, then bring it back smoothly at `-19`.
- **Voice clarity target:** `voiceOverRestMedianDb >= 10 dB`, `sfxBuried == 0`.

---

## Effects & Ambient Beds

- At least **40 effects a minute**, synced to `"word": "..."` or cut timestamps:
  - Coins / emeralds dropping: `coin`, `coins`, `register`
  - Rules / papers / ballots / signs flipping: `paper`, `stamp`, `pop`, `ding`
  - Voting toast `[Vote] YES: 99%` or floating option numbers `1, 2, 3`: `pop`, `ding`, `buzz`
  - Doors / gates / chests / picks: `creak`, `thud`, `hit`, `whoosh`
- Beds: `"room"` for indoor council/throne/factory halls (`Zone` = `hall`, `council`, `bank`, `shop`), `"sky"` / `"village"` outdoors, `"cave"` in mines.

## Before Handover

- `python3 scripts/sound.py build <film>` prints **OK by the numbers**.
- Confirm `music` in the mix report reads **`~17–24 dB` under the voice** so `explainer_bgm_loop.wav` supports without ever drowning a syllable.
- Remind the owner that sound was measured mathematically, not listened to.
