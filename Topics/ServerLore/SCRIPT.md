# Writing a Server Lore Script (`SCRIPT.md`)

> Modeled on the 50k+ wholesome SMP format ([`reference/3am-mom/`](reference/3am-mom/README.md): `87.9s`, `36` cuts | [`reference/deaf-creeper/`](reference/deaf-creeper/README.md): `87.9s`, `48` cuts).

Target **`200–340` words (`65–110s`)** at an expressive third-person storytelling cadence (`155–220 WPM`), with crisp visual cuts (`cut:`) every `1.2–2.2s`.

---

## Invent a Fresh Concept First (Never Clone References!)

Do **NOT** repeat the 3 AM night-shift mother (`3am-mom`) or the deaf boy saved by Sculk Sensors (`deaf-creeper`). Every channel needs a fresh human struggle that maps to a **clever Minecraft-native fix**:

1. **The Weird Server Habit (Frame 0 Proof):** What strange ritual, death stat, or rule violation shows up visually in second 0? *(e.g., always logs off mid-fight / refuses to walk past cobble / hoards 400 clocks / digs one-block tunnels forever)*
2. **The Wrong Assumption (Server Shaming):** Why does the town/guild mock or report them as a troll/griefer?
3. **The Real-World Human Reason (Cutaway):** What honest struggle at their keyboard (hospital/classroom/desk/little sibling/colorblindness/slow Wi-Fi/chemo recovery/graveyard shift) makes that "weird habit" heartbreakingly sweet?
4. **The Cruel Turning Point:** How does an ignorant bully ruin their progress or break their heart in chat right before they quit?
5. **The Minecraft-Native Solution (Owner `!` + Town):** How does the **Owner** rally everyone to engineer a real in-game fix (map art, redstone clock, rail line, beacon color-coding, flower clock, totem wall) instead of just handing out free diamonds?

---

## The 7-Beat Wholesome SMP Retention Spine

| Beat | Time | Music Track | Job & Retention Mechanic |
|---|---|---|---|
| **1. Hook + Open Loop** | `0:00–0:11` | **`up_happy.m4a`** | Start mid-incident with a visible stat/timestamp/chat callout. Show the mocking label (`"WORST PLAYER"`, `"GRIEFER?"`). End Beat 1 with the **irreversible promise**: *"But when the Owner found out why, the whole server rebuilt..."* |
| **2. SMP Evidence** | `0:11–0:24` | **`up_happy.m4a`** | 2–3 concrete receipts inside Minecraft: chest contents, Oak sign insult, public Spawn `<ScoreboardWall>`, `<Alex> 48 lol` chat mockery. |
| **3. IRL Secret Reveal** | `0:24–0:40` | **Crossfade -> `up_sad.m4a`** | Hard cut from pixels to real-world `<HospitalCorridor>`, `<ClassroomRoom>`, or `<DeskSetup>` + lamp & PC. Explain the human truth cleanly in plain simple words. |
| **4. Cruel Breaking Point** | `0:40–0:55` | **`up_sad.m4a`** | Griefer destroys the secret treasure (chest burned in lava / tower blown up) -> gut-punch chat whisper (`did they forget me?` / `I don't belong here`) -> `[Player left the game]`. |
| **5. Owner Investigates (`!`)** | `0:55–1:02` | **`none` (1–2s silence breath!)** | `Owner` finds the lone clue/sign/whisper -> `!` badge pops overhead -> sends DM to the whole server Discord/chat. |
| **6. Community Rally & Craft** | `1:02–1:14` | **`up_happy.m4a`** *(starts cleanly at `0:02+`!)* | Flood of `joined the game` toasts -> players run together down caves/mines/woodlands building the clever Minecraft fix (redstone lamps, torches, chests of books, flower path). |
| **7. Payoff + Story CTA** | `1:14–1:28` | **`up_happy.m4a`** | Player logs back in -> sees the glowing tribute / triggers the mechanic -> tear-turning-into-heart celebration -> reset callback (scoreboard hits `0` / chest fills) -> **story-locked Subscribe line** (*"Subscribe if you'd..."*). |

---

## Voice & Word Rules (9-Year-Old Plain English — See [`REFERENCE-SCRIPTS.md`](REFERENCE-SCRIPTS.md))

- **Third-person empathetic narrator** ("Nobody knew why Leo...", "And every night at three...", "Until the server Owner checked...").
- **Short punchy beats (6–14 words per cue).** Split long reveals across two lines or two `cut:` shots.
- **Words paint concrete props & UI:** Always write the name of the chat line, sign text, scoreboard counter, block, or room in plain words so `wordAt(cue, word)` can pop the exact UI card at that syllable!
- **Last line ends with a story-tied `subscribe`** hook (enforced by `topic.json`).

- **Zero wise-old-man / AI-essay prose:** No poetic metaphors or fancy analogies (*"it wasn't just X, it was Y"*, *"beneath the facade"*). Use Grade 3–4 words, 8–12 words per sentence, connected with `So`, `But`, `And`, `Because` (see [`REFERENCE-SCRIPTS.md`](REFERENCE-SCRIPTS.md)).
