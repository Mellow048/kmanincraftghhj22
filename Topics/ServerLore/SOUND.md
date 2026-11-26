# The Sound of Server Lore (`SOUND.md`)

> **MANDATORY TWO-TRACK UP SCORE (HAPPY + SAD SWITCHING):**  
> This topic alternates dynamically between TWO pre-mastered tracks supplied by the owner:
> 1. **[`Topics/ServerLore/up_happy.m4a`](up_happy.m4a)** — *Trimmed past `0:00–0:01` silence directly to **`0:02.000`** so music enters on Frame 0, and loudness-boosted (`-14.3 LUFS`, ~110%+ punchy lift).* Play during the **Hook, Evidence, Owner Rally, Build Montage, Climax Payoff, and Subscribe CTA**.
> 2. **[`Topics/ServerLore/up_sad.m4a`](up_sad.m4a)** — *Mastered cleanly from `0:00` at matching loudness (`-15.4 LUFS`, ~110%+ lift).* Play during the **Real-World Struggle Cutaway (`IRL` beats) and Cruel Breaking Point**.

`scripts/sound.py` natively supports per-section `"track"` switching inside `music.sections` with automatic **0.5s smooth crossfades** and starts each new track cue freshly at its musical entrance!

---

## Example Multi-Track `sound.json`

```json
{
  "film": "my-server-lore-film",
  "music": {
    "track": "Topics/ServerLore/up_happy.m4a",
    "gain": -14,
    "sections": [
      {
        "from": "1.hook",
        "mood": "hope",
        "track": "Topics/ServerLore/up_happy.m4a",
        "gain": 0,
        "why": "Hook + weird habit + open loop: bright Up Happy starts cleanly at 0:02+"
      },
      {
        "from": "3.irl_truth",
        "mood": "sad",
        "track": "Topics/ServerLore/up_sad.m4a",
        "gain": 0.5,
        "why": "Real-world cutaway reveals why they struggled -> switch smoothly to Up Sad"
      },
      {
        "from": "4.betrayal",
        "mood": "sad",
        "track": "Topics/ServerLore/up_sad.m4a",
        "gain": -1,
        "why": "Griefing + player logs off heartbroken"
      },
      {
        "from": "5.owner_clue",
        "mood": "none",
        "why": "1.5s dead silence pause as Owner reads the sad message (!)"
      },
      {
        "from": "6.rally",
        "mood": "hope",
        "track": "Topics/ServerLore/up_happy.m4a",
        "gain": 0.5,
        "why": "Entire server rejoins & builds the solution -> bright Up Happy enters cleanly!"
      },
      {
        "from": "7.payoff",
        "mood": "wonder",
        "track": "Topics/ServerLore/up_happy.m4a",
        "gain": 1.0,
        "why": "Lamps light up / hearts burst / scoreboard resets -> Up swells to finale + CTA"
      }
    ]
  },
  "beds": [
    { "from": "1.hook", "to": "2.mock", "bed": "village" },
    { "from": "3.irl_truth", "to": "4.betrayal", "bed": "room" },
    { "from": "6.rally", "to": "7.payoff", "bed": "village" }
  ],
  "sfx": [
    { "cue": "1.hook", "sfx": "pop", "why": "Player joined toast + nametag pop" },
    { "cue": "2.mock", "sfx": "chat", "why": "Server mockery chat line appears" }
  ]
}
```

---

## Tuning Rules (`music.gain: -14` / `musicUnderVoiceDb: [11, 22]`)

- Why `-14` instead of `-16` or `-19`? Because the owner specifically asked for `~110%+` musical presence so the Up piano/strings carry real warmth and tears instead of vanishing behind the voice, while voice still stays `>= 3 dB` clear in every spoken half-second (`voiceOverRestMedianDb >= 9 dB`).
- **Always drop a `1–2s` `"mood": "none"` pause** right before the Owner discovers the truth (`5.owner_clue`), then bring `up_happy.m4a` swelling straight back in! That silence contrast is what makes the happy transition hit emotionally.
- Run:
  ```bash
  python3 scripts/sound.py draft <film>
  python3 scripts/sound.py build <film>
  ```
