# Writing a Remastered Explainer Script (`SCRIPT.md`)

> Measured against **[`reference/napoleon/README.md`](reference/napoleon/README.md)** (`80.93s`, `286 words`, `212 WPM`, `44 cuts`, seamless loop).

A great Minecraft Explainer uses a **parable inside a Minecraft server/town**, followed by the **real-world parallel**, stitched together by a **looping irony hook**.

---

## Before a line is written

Fill these four specs at the top of `narration.md`:

1. **The Opening Line (`1.hook`):** `"<Concept>, explained using Minecraft."` (5–8 words max over the climax shot!)
2. **Character 1 (`CitizenLead` — Miles / worker):** What does the everyday guy want, and what mistake does he make? *(e.g. "Miles just wants affordable bread, so he votes for free money.")*
3. **Character 2 (`EliteLead` — Sterling / authority / rich):** How does the rich/powerful one solve it cleanly on the surface while hoarding control? *(e.g. "President Sterling turns on the emerald printer.")*
4. **The Loop Closer (`last`):** End mid-clause so the last syllable runs straight back into Line 1!  
   Example:  
   `[last] Miles wanted cheap bread, voted for easy money, and that's` -> *(loops to Line 1)* `Inflation, explained using Minecraft.`

---

## The 8-Beat Story Explainer Spine

Target **180–420 words (`55–110s`)** across ~22–45 spoken cues (split long lines visually with `cut:` for `1.1–1.9s` median shots).

| Beat | Seconds | Job | Visual Anchor |
|---|---|---|---|
| **1. Cold Climax Hook** | `0–2s` | Speak `"<Concept>, explained using Minecraft."` | Frame-0 peak climax image (`EliteLead` crowning himself / vault overflowing / chart bursting) — **must match final frame**. |
| **2. Contradiction Setup** | `2–6s` | Reveal the central paradox right away. | Hard cut to active rebellion/problem -> flash forward to irony. |
| **3. Broken Status Quo** | `6–15s` | Show 3 visual receipts of chaos (NO abstract lecturing). | Messy `<RuleBoard mode="chaos" />`, empty `<Chest gold={0} />`, warring banners, bare shelves. |
| **4. Meet the 2 Leads** | `15–23s` | Introduce Character 1 (`<NameTag>`) & Character 2 (`<NameTag>`). | Everyday guy staring up at problem -> rich/perfect leader striding cleanly ahead of results/troops. |
| **5. The Clean Fix** | `23–34s` | Character 2 takes control and makes everything look better fast. | Swaps to `<RuleBoard mode="order" />`, full chests, organized shelves, calm roads. |
| **6. Escalating Trap** | `34–47s` | The hidden catch happens while citizens cheer ("99% vote yes!"). | `<BallotBox>` + `<ChatToast>` poll, printing notes, debt gauge climbing behind Character 1. |
| **7. Climax & Real-World Bridge** | `47–76s` | Iconic turn + explicit real-world date/event (`<StoneBillboard>`). | Snatches crown / vault locks -> cut to historical/real-world era (`1799`, `1971`, `2008`, etc.). |
| **8. Full-Circle Irony Loop** | `76–81s` | Tie Character 1's mistake directly to the ending loop phrase. | Close reaction on `CitizenLead` -> Frame-0 climax push ending mid-sentence `"and that's"` -> loops seamlessly! |

---

## Rules of every line

- **Show-first verbs:** Every sentence must name something visible (`chest`, `crown`, `bread`, `ballot`, `bar`, `rules`).
- **6–15 words per cue** (over 16? Split the line into two cues or split visually with `cut:`).
- **One idea per beat.** Contrast fast: `"Empty chests. Broken rules. Rival clans."` beats a 22-word compound paragraph.
- **No throat-clearing:** Never say *"Hey guys"*, *"In this video"*, *"Before we start"*, or *"But wait, here's the crazy thing"*.
- **Spell out awkward symbols** or align digits carefully (`99%` -> `"ninety-nine percent"` in spoken audio if TTS misreads, or verify alignment in `timing.json`).
- **Loop cleanly:** Test reading the last cue aloud immediately followed by the first cue (`"...and that's" + "Napoleon, explained using Minecraft."`). If there is a bumpy pause, trim the last word.
