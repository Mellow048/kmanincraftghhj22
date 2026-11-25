# How to Make a Viral Minecraft Explainer (The Napoleon Reference Playbook)

This topic was completely remastered after studying BOTH owner-chosen references: **`Napoleon, explained using Minecraft`** ([contact sheets & metrics](reference/napoleon/README.md)) AND **`Minimum wage, explained using Minecraft`** ([contact sheets & metrics](reference/minimum-wage/README.md)).  
The old sky-island flying-camera format is retired for new films. Modern Explainers win by combining **sharp real-world ideas**, **two unmistakable contrasting characters**, **hyper-detailed multi-part Minecraft builds**, **fast `~1.5s–2.1s` story cuts**, **`explainer_bgm_loop.wav` sitting smoothly under narration (`-19 dB`)**, and a **seamless loop ending**.

---

## 1. The Channel Separation Rule: Two Signature Leads (NEVER `InThisTown` Default Characters!)

Every Explainer runs on a **separate YouTube channel** from *In This Town*. To protect the channel from duplicate-content flags and give viewers instant brand recognition:

- **NEVER use `InThisTown`'s default hero (`Hero`), Steve lookalikes, or `InThisTown` `Villager`s as your leads.**
- **ALWAYS star our 2 dedicated Explainer Channel Leads** from [`cast.tsx`](cast.tsx):
  1. **`CitizenLead` ("Miles" — The Struggling / Mistake-Making / Everyday Character):**  
     Copper-auburn 3D `hairLayer`, terracotta work jacket + satchel strap, cream undershirt, optional wire `Spectacles`, slate slacks, sneakers.  
     *Dramatic job:* The guy who breaks things, suffers under the bad system, makes the relatable human mistake, votes yes without reading the fine print, or gets hit by inflation.
  2. **`EliteLead` ("Sterling" — The Rich / Put-Together / Authority / Pres / General):**  
     Champagne-blonde (`"pres"` / `"tycoon"`) or deep commander (`"general"`) `hairLayer`, tailored midnight-navy coat with 3D brass buttons, crimson tie / gold collar / white sash, warm gold rim, optional `Crown` or `TopHat`.  
     *Dramatic job:* The "perfect rich one" — President, Emperor, General, Banker, CEO — who always wins smoothly, holds the keys, prints the money, or takes the crown cleanly while Miles watches.

| Explainer Concept | `CitizenLead` (Miles — Struggling / Mistake) | `EliteLead` (Sterling — Rich / Authority) |
|---|---|---|
| **History / Power** *(Napoleon)* | **Citizen Paul:** Stormed the castle for freedom, then voted his freedom away | **General Leon:** Wins every battle, takes over council, crowns himself |
| **Economics** *(Inflation)* | **Worker Miles:** Works harder for 1 loaf of bread while prices double | **President Sterling:** Prints fresh emerald notes smoothly in the vault |
| **Business** *(Monopolies)* | **Small Shopkeeper:** Undercut out of the market, empty shelves | **Tycoon Sterling (`"tycoon"`):** Top hat, gold trim, buys every store on the street |

Give both leads floating **`nameTag`** cards when introduced (`<CitizenLead nameTag="Miles" ... />`, `<EliteLead nameTag="Sterling" ... />`), just like `[Paul]` and `[Leon]` in the reference!

---

## 2. Anti-Plastic Craftsmanship: NO Lazy Single-Box Props!

> *"The video should actually SHOW things instead of viewers guessing one block is a book — some agents are lazy and just place a single box and call it a day as a bookshelf. Give viewers real quality!"* — Owner mandate

In a 9:16 vertical Explainer, viewers look closely at every prop. **Banned forever:** dropping a flat brown cube and calling it a bookshelf, placing a white square on a table and claiming it's an open book, or building blank unframed gray walls.

Use the multi-part composite props built into [`props.tsx`](props.tsx):

| Need | ❌ Lazy Single-Box Mistake (BANNED) | ✅ Remastered Multi-Part Asset (`props.tsx` / Pack) |
|---|---|---|
| **Books / Library** | Solid textured/flat cube | **`<DetailedBookshelf>`** (oak frame, back panel, 14+ multi-colored upright & tilted book spines, cream paper top-edges, gold bands) |
| **Rules / Laws** | Flat wall block | **`<RuleBoard mode="chaos" \| "order" />`** (framed oak board with individual inked parchment sheets & wax seals — crooked mess vs 1 crisp charter) |
| **Reading / Decree** | Flat tan square | **`<Lectern>` + `<OpenBook>`** (angled oak podium, spine gutter, layered cream pages, ink stripes, crimson bookmark ribbon) |
| **Government / Throne** | Stair block | **`<RoyalThrone>` + `<RoyalCarpet>` + `<BannerFlag>`** (dais step, gold finials, textured velvet cushions, runner carpet with gold trim, wall banners) |
| **Power / Coronation** | Yellow cube | **`<Crown>` + `<CrownCushion>`** (crenellated 4-prong gold band + sapphire/ruby gems on fringed pillow, lifted onto head) |
| **Voting / Elections** | Plain wood cube | **`<BallotBox>` + `<CouncilTable>` + `<ChatToast>`** (slotted lid, sticking parchment ballot, brass front seal, in-world server chat poll `[Vote] YES: 99%`) |
| **History Dates / Stats** | Text in empty void | **`<StoneBillboard text="1799" />`** + architectural brick walls with windows, torches, flags, and crowds |
| **Money & Goods** | Flat green box | **`<CoinStack>`**, **`<BillStack>`**, **`<Chest open={1} gold={1} />`**, **`<Bread>`**, **`<BreadShelf>`**, **`<BarChart>`**, **`<PriceTag>`** |

---

## 3. The 8-Beat Story Explainer Spine (Cold-Open Climax -> Seamless Loop)

Study the exact rhythm of `Napoleon explained using Minecraft` (`80.9s`, `44 cuts`, `1.67s median cut`):

| Beat | Time Target | Job | Visual & Camera Execution |
|---|---|---|---|
| **1. Cold Climax Hook** | `0–2s` | Speak `"<Topic>, explained using Minecraft."` over the **peak climax image**. | Frame 0 starts INSIDE the climax throne room (`EliteLead` lifting the crown off the Head Mod's cushion). Dynamic push-in (`cam.push`). **Identical framing to the final shot for the loop!** |
| **2. Contradiction Hook** | `2–6s` | Drop the core irony immediately (*"Got rid of a king -> voted a new one."*). | Fast cut to active courtyard: angry citizens pulling down gate/king, smash-cut straight back to confetti crown ceremony! |
| **3. Broken System (Show Chaos)** | `6–15s` | Prove WHY people are desperate, **strictly visually**. | 3 rapid cuts (`1.3–1.9s` each): arguing council slapping scattered papers (`<CouncilTable messy />`, `<RuleBoard mode="chaos" />`), empty chests (`<Chest open={1} gold={0} />`), rival banners clashing outdoors. |
| **4. Dual Character Intros** | `15–23s` | Meet **Character 1 (`CitizenLead` w/ `nameTag`)** & **Character 2 (`EliteLead` w/ `nameTag`)**. | Low heroic tilt up at castle gate (Character 1's modest goal) -> low angle wide push on Character 2 commanding soldiers ahead of castle tower (never fails!). |
| **5. Fast Fix / Seductive Turn** | `23–34s` | Character 2 walks in, takes charge smoothly, and fixes chaos in 3 visual receipts. | Soldiers escort Character 2 into council -> tears down chaos board and hangs `<RuleBoard mode="order" />` -> overflowing gold `<Chest>`s -> guarded bright roads! |
| **6. Rigged Escalation** | `34–47s` | The trap snaps shut disguised as a "choice". | Officers flank `<BallotBox>` on desk; citizens line up; `<ChatToast>` pops `[Vote] Should he rule for life?` / `[Vote] YES: 99%`. Second escalation raises stakes (`Emperor` / `2× debt`). |
| **7. Climax Action + Real-World Proof** | `47–76s` | Show the defining historical/economic moment, then map it to real life (`1799`, `2008`, etc.). | Dramatic close-up & reverse OTS (`cam.ots`): `EliteLead` snatches `<Crown>` out of `Official`'s hands and puts it on himself. Then clean cut to `<StoneBillboard text="1799" />` + historic top-hat crowd re-enacting the real event! |
| **8. Full-Circle Irony & LOOP** | `76–81s` | Cut back to `CitizenLead`'s realization, then **end mid-sentence on the exact Frame-0 climax**. | Character 1 looks toward the throne room (`"Miles fought X, then voted for Y, and that's"`), smash cut to Frame-0 throne push! Loops infinitely! |

---

## 4. Camera, Motion, Lighting & Retention Rules

1. **Fast Cut Rhythm (`1.1s–1.9s` median shot duration):**
   Use `storyScene` (never slow 5s–8s floating pans!). Break long narration lines into two visual cuts with `cut: <seconds>` so every sub-idea gets a fresh angle (Wide -> Medium -> Close Reaction -> Prop Insert).
2. **Never Static:**
   - Every shot uses an active `cam.*` move (`cam.push`, `cam.orbit`, `cam.crane`, `cam.whip`, `cam.ots`, `cam.pan`, `cam.truck`) or explicit `from` -> `to`.
   - Every actor moves: walk cycles (`animDistance`), head turns (`lookAt`), expressive arms (`reach`, `point`, `raise`, `clap`, `pose`), facial swaps (`blink`, `smile`, `frown`, `wow`, `angry`, `uneasy`), and reacting background crowds (`ExplainerCrowd`).
3. **Always Bright & Readable on a Phone (`lum` ~95–120):**
   Even indoor throne halls and council rooms use warm sconces, `LightPool`, `GodRay`, and `overworld-day` / `overworld-golden` lighting so dark frames never exceed ~8%.
4. **Dual-Color Captions (`y: 0.67`, `motion: "on-beat"`):**
   Highlight power/topic keywords in gold (`highlightWords`) and warnings/stakes in red (`dangerWords`: `["ALONE", "EMPTY", "WAR", "TRAP", "NEVER", "ZERO"]`).
5. **Voice Standard (`docs/VOICE-AND-TTS.md`):**
   Must be **Male, Natural American / No Accent, Energetic, Young / Not Old, Not Too Serious** (~210–245 WPM).
