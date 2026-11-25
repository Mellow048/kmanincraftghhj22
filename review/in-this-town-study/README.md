# In This Town — agent study notes (2026-11-25)

Assignment: I am the **In This Town topic agent**. This file is my working digest of the whole
framework, built while reading every markdown file in the repo. Sources are cited per section.
It is a study aid, not a rule file — the rule files always win.

## 1. What this repo is

**ZackCraft Films** — a Minecraft-native, Zack D Films-style 3D vertical-short framework.
Remotion 4.0.542 + React Three Fiber + Three.js. One folder per film in `src/videos/<slug>/`,
one TSX per scene, one shared `world.tsx`, one camera. Registry: `src/registry.ts`.
Engine: `src/engine/` (Camera, cam helpers, defineFilm, MinecraftAvatar, Look, shaders, fx,
props, blocks, textures, anim clips, face maps, pixelfont, Captions, story.tsx, blocking, footing…).
Scripts: `new-video.mjs` (scaffold), `check-films.mjs` (director lint), `narration.py` (voice→
narration.mp3 + timing.json word clock), `sound.py` (numpy-made music/beds/SFX → mix.mp3 +
sound.lock.json + report), `shots.mjs` (still per shot), `shot-log.mjs` (film on one page),
`film-metrics.py` (measure rendered mp4: luma/detail/motion/cuts/captions), `look-metrics.py`,
`compare-stills.py` (pixel-proof approved films unchanged), `rehearse.mjs`, `storyboard.py`,
`trim-narration.py`, `split-takes.py`, `pack-sheet.py`, `direction-report.mjs`, `render-check.py`.
Tests: `tests/direction.test.mjs` (cam helpers, screenOffset, resolveShaders), `test_alignment.py`.
Render: GitHub Actions `render.yml` — parallel ~9s frame-range chunks (≤20 runners), joins,
uploads artifact + Release; optional `commit_to=renders/<name>.mp4` (≤45MB re-encoded copy,
never main). `npm run check` runs first; failing films are not rendered. swangle software WebGL.

## 2. Rule stack (who wins)

1. `MASTERPROMPT-01.md` (root) / `Topics/InThisTown/MASTERPROMPT.md` (owner's word-for-word brief,
   2026-11-17) — above topic rules. Read at start of EVERY turn touching a film.
2. `AGENTS.md` — decides WHICH kind of film; hard rules; render policy; API discipline.
3. Topic `README.md` + `topic.json` — for films declaring `topic: "<id>"`, topic wins over base.
4. `Topics/InThisTown/OWNER.md` — owner's taste; wins over the playbooks (SCRIPT/SHOTS/SOUND).
5. Mandatory gate before ANY new short: `20k-hits/README.md` + 3 ANALYSIS + shot logs + source,
   `docs/WHY-THE-3-HITS-BLEW-UP.md`, `docs/COMPETITOR-STUDY-NEVER-WALK-ALONE.md`,
   `docs/VOICE-AND-TTS.md`, `docs/VIRAL-SHORTS-BLUEPRINT.md`, `docs/FRAMEWORK-REVIEW-AND-REMASTER.md`.
6. `CLAUDE.md`/`GEMINI.md` are identical pointers: MASTERPROMPT first, then AGENTS.

## 3. The 20k+ hit formula (measured, from 20k-hits + WHY-THE-3-HITS)

Three winners out of 40+: Monster Village Part 1 (175s, 67 cuts, median 2.55s, lum 101/68.7/72.7,
hook 66.5, 82-83% stayed), Creeper Parents (100.4s, 48 cuts, median 2.03s, lum 152.5 start, hook
44.4), Enderman Parents (105.6s, 50 cuts, median 2.03s, lum 121.6 start, hook 67.7).
All: 0% flat frames, ≥99.9% captions, ≤2.4% dark.

Five pillars:
1. **Bright frame-1 iconic mob contrast** (lum ≥95, hook motion ≥44): recognizable mob doing
   something humanly odd IN FRAME ONE. No dark opens, no generic villagers, no empty establishing.
2. **100% real vanilla Minecraft mechanics** as both jokes and plot (creepers fear cats, mobs burn
   in sun, endermen hate water/eye contact, light-level-0 spawns, slow-falling chickens). Zero
   invented rules needing explanation. Instant comprehension in 1s.
3. **Cold misread → protective family love** emotional curve. Kid narrator; weird/strict/scary
   behavior flips into love/sacrifice/belonging.
4. **Role reversal: players are the villains** (armed Steve/Alex raiders at night).
5. **100% standalone** — no sequel tax; each film hooks cold viewers alone.

Trap: Enderman Parents copied Creeper Parents' 6-beat skeleton → owner flagged reused-content risk.
Keep pillars, ROTATE the spine (Blueprint engines A–E: Misunderstood Protector / Forbidden Ability
Cost / Reverse Rescue (kid saves mob with human mechanics) / Shared Secret / Comedic Job Disaster).

Competitor study (Never Walk Alone After Dark, 5k/15h): 110 cuts, 0.64/s, median ~1.47s, 0.7% dark
even at night, 5 compositions in first 8s. Stolen into Remaster v2: `<FloatingNumber>`,
`<ChatToast>`, `<Chicken scarf>` (slow-fall gag), micro-cutaways 0.8–1.8s for every funny line,
dual-color captions: dangerWords #ff4f42, highlightWords/accent #ffd84d, y 0.67.

Pacing targets (Blueprint): short 95–115s or long 150–176s; median shot 1.4–1.8s (0.55–0.65 cuts/s);
longest still ≤0.7s; opening luma 100–160; dark <2%; flat 0%; captions 95–100%.
5-question premise gate: frame-1 recognition / vanilla lore engine / one-sentence hook question /
emotional flip / standalone.

## 4. Voice (docs/VOICE-AND-TTS.md — overrides ALL older voice notes)

MALE, Natural American / no accent, ENERGETIC, YOUNG (not old), NOT TOO SERIOUS. Audition one test
line (joke + urgent beat) BEFORE batch recording; reject robotic/old/accented immediately.
Pace ~230–255 wpm (tempo ~1.30–1.47x); owner's confirmed sweet spot ≈235 wpm with 0.25–0.7s waits
between story steps (`# clip <name> wait <s>`); never >265; hook word 1 at 0.0–0.3s, no intro.
Clip levels within ~1 dB of each other before build (quiet subscribe clip was a real fault).
Voice 13–17 dB over mix median, never <3–4 dB in any half second. Owner wants to HEAR the voice
before a film is built ("first let me hear the tts").

## 5. In This Town format (topic README + SCRIPT + SHOTS + topic.json)

A kid tells (first person, PAST tense) about his town's one unexplained rule and what happened
when he broke it. Last line twists the first. NEVER a 20s base short (rejected twice:
moon-20-seconds, monster-egg-v1 — lint refuses).
- Full: 150–176s (HARD CEILING 178s — owner strict rule 2026-11-14; >3:00 isn't a Short), 640–770
  words, ~18 beats, 80–95 shots. Short cut (`cut:"short"`): 60–118s (never >120), 250–520 words,
  ~14 beats, 35–65 shots. Floor both: 60s / 250 words. Middle cut exists (iron-golem 2:13, snow
  golem 132.7s) — move up a cut rather than speed up.
- Median shot 1.4–2.3s, none >6s; 4–6s held-breath shots 3–4 times; every shot moves one way.
- First three words "In this town," over the teller's face; title = first sentence.
- One word captions (engine `captions` from timing.json), pixel caps white/black outline.
- Hard cuts are the language; cut ON the noun/word. One script line = one shot (5–12 words; >18 → 2).
- Come back to teller ≥ every 3rd shot; face changes ON the cut; lens 30–46°; fill frame.
- Wides only: town at start, truth at end. One colour world per act; light changes need story reason.
- 9:16 frame is a slit: stack by depth/height, top-down for floor things; near person off lens axis.
- Sound: owner's track InThisTownMusic.aac under whole film (gain −16), beds per zone, ≥40 SFX/min
  (reference ~80–87), no gap >6s, boom once (twice max), silence ≤8s total as ONE held breath pre-reveal.
- Last line: 4–6 word "Subscribe …" that belongs to the story, AFTER payoff. Red SubscribeSign held
  to camera (creatures.tsx) — but pumpkin-heads shows an ending that isn't the sign.

SCRIPT.md 18 beats (word budgets): 1 Hook 12–18 / 2 Mysteries 30–45 ("nobody knew" ×2 before s12) /
3 Tour 70–100 (things only, lists of three, end "pretty good life…") / 4 Itch 12–25 (wish as ≤5-word
question) / 5 Adults say no 30–45 / 6 Tease 30–45 / 7 Elder's warning 35–45 (rule, NO reason, walks
away) / 8 Decision 25–35 (PLANTED QUESTION whose answer is the twist) / 9 Attempt 1 fails 35–50
(cheap funny) / 10 Attempt 2 works 45–60 / 11 Price 35–50 / 12 Packing 20–30 (objects = decision) /
13 Friend 25–35 (two lines, second = theme) / 14 Edge 65–85 (look back at tour, three small body
actions) / 15 Act 45–60 / 16 Wait 30–40 / 17 Reveal 50–65 (long delay sentence → short picture
sentence → reason that rewrites beat 1) / 18 Button 4–6.
Short cut drops beats 5, 6, 11, 12, friend's dialogue first; NEVER drop anything planted.
Voice: one teller "I", no names (roles only), ~70% one-syllable words, time words open sentences,
But/So turn, ≤6-word sentences ARE the plot, ~3 dialogue lines max, no lesson/moral.
Treehouse reference measured: 718 words, 259 wpm, 87 shots, ~8 words/shot.

SHOTS.md distances that worked (kid 1.44m = scale 0.8): face on y1.2 dist 1.9→1.4 fov36; waist-up
y1.0 2.1→1.6 fov38–40; whole body 2.4→1.9 fov40; adult face y1.85 1.8→1.3; two people profile
between 4.7→4.2 fov40; street above 27→21 pitch21 fov50. cam.push/orbit/pan/truck/top; yaw 0 =
front of actor facing +Z, 90 = their left (+X); pitch + looks down. Kid faces: smile grin laugh
frown uneasy brave fear wow ouch calm (old worried/angry/sad read as threat on a child).

## 6. OWNER.md — the owner's taste (wins over playbooks)

Channel: MV1 ~18k views/100+ likes/83% stayed (2026-11-18); most films 1.4–1.5k = "1k view jail";
target ≥70% stayed. MV1 is the benchmark every film is held against.
- **Rule A: premise on screen in first second.** Shot 1 = the strange thing + the person it's
  strange for, in ONE frame. First line says premise/trouble. Something moves in first 0.5s.
  Frame-15 test: can a stranger say what this is about? First 2s must keep CHANGING (MV1 changes
  picture 11× in 2s; build piece by piece, each with own sound). Teller faces lens, big in frame 1.
- **Rule B: no two neighbouring shots alike** (differ in ≥2 of size/height/side/motion). Every
  scene: ≥1 environment shot + ≥1 travelling shot + ≥1 odd angle. ≤2 face close-ups in a row.
  Cuts land ON movement/word; carry something across the cut.
- His outline IS the story — keep his beats/order/lines; additions listed at top of narration.md.
  "or if you think of something better then sure" = improve details, show in script.
- Plain boy, one odd problem, among people not like him. Funny loyal family/friends. Physical
  comedy (arm comes off, face falls off, crowd jumps). Dry asides. Stakes in steps → hopeless
  moment → "on the other side" cut. Purposeful silence. Real Minecraft things. Numbers/countdowns.
  Series end on cliffhanger + "like and sub for part N" — UNLESS he says "no parts, whole short"
  (then it ends, still with subscribe). Fights = bodies posed joint-by-joint hitting (8.8/10 was a
  fight; "png fight another png" rejected). Picture does what line says ON the word; picture LEADS
  words. Nothing teller couldn't have seen (unless "heard later"). Full 1080×1920 (720 = "degraded").
- Premise needs a REASON told in FULL SENTENCES at start ("nobody knew why" = plot hole to him);
  turn = the usual thing going wrong ("it wasn't piglins this time"), not random surprise.
- Pace: 249 no-air too fast; 220 with 1s air too slow; **235 wpm + 0.25–0.7s waits confirmed**.
  Length never bought with speed — move up a cut.
- Reveal moments need TIME WITH NO WORDS (helmet unmask: 3 lines/4.3s = "empty" → 10s/7 shots).
  Give reveals own clips so pauses can be set.
- Work style: ONE film at a time, finish before next. Fast. Packs first (to main before film).
  Push after every step (sandbox work lost = disaster). Script approved by owner BEFORE build
  (exception: he explicitly enabled "automatic mode" for the 5-film batch 2026-11-16/17 — that
  exception was for those five films). Finished films → reference/ + main with mp4. He reviews
  as a viewer; worries about reused-content standing.
- Anti-duplication rule (2026-11-16): before pitching, write SIX WORDS for idea and for each of
  his last two films (who tells / where / what goes wrong / what the player is / how it ends /
  how it feels). >2 same as either recent film = not a new idea. Put six words in the pitch.
  No third "odd kid in town of one famous mob + players at night" film. Two films in a row must
  not share town, family costumes, or night scene.
- MV recipe = first 15s + pull (known thing doing wrong thing in frame 1, "I" in line 1, someone
  to care about, true MC facts, rule that looks unkind but is love, clues said back) — NOT the
  outline "kid + mob parents + six players".
- Lessons from reviews: bodies must TOUCH what they use (contact in stills); no boxes behind
  actors; buildings have insides; a thing used is held; prop that hides checked from EVERY camera;
  place seen from above needs country round it; 9:16 fov40 = 0.41×dist wide (two people side by
  side need OTS or long lens); night = one warm light near face + close camera; two same-colour
  things read as one; low shot cuts at waist not face; "sad" from below = two black bars (use
  frown); look at MP4 frames not just stills; first two seconds are the best two seconds.
- 2026-11-17 five-film batch (I Was Told to Sit 2:27, A Stranger Moved Into My House 2:12, Being
  Scared Is My Job 2:23, I Have Forty Minutes 1:52, We Lost the Vote 1:39): "i love them" except
  Stranger is weakest (grown villager wronged, joke-on-viewer ending — vs teller you feel for).
  Past tense from first word. Shot 2 shows what line 2 names. Mix voice ~14 dB over (MV1 14.1).
  After merge with main: diff src/registry.ts, AGENTS.md 3-min rule, scripts/narration.py words.

## 7. Work order (topic README)

1. `npm run new -- "In This Town, …" --topic in-this-town`
2. Premise as 4 sentences: In this town X. Nobody explained Y. I broke it. Y was really Z.
   (Z must change what X means.)
3. narration.md to beat sheet; one line per shot.
4. `narration.py build <film> --estimate` — fix length/rhythm as text.
5. OWNER APPROVES SCRIPT (unless explicit automatic mode). Record clips → build (word clock).
6. world.tsx zones from pack + ONE new place; sceneN.tsx per beat; kit.tsx cast; every shot cam.*
   + note + stage; actions hung on wordAt.
7. typecheck + check.
8. `npm run shots` contact sheet → fix → look again (3–4 passes). THEN look at mp4 frames.
9. sound.py draft → write sheet shot-by-shot → build → read report → film.tsx audio mix.mp3.
10. typecheck + check → render (permission policy; cloud workflow).
11. Deliver with honesty: sound measured not heard; REVIEW.md vs Stage-6 list on mp4 frames.

MASTERPROMPT six stages: concept → 3 hooks pick 1 → script → timestamped storyboard → REAL render
(never claim done without file) → self-review as viewer. Required 11 outputs: title, premise,
3 hooks + chosen, script, storyboard, cast/asset list, caption track, audio plan, mp4 path,
self-review, remaining weaknesses. film-metrics.py = Stage 6 by measurement when no vision.

## 8. Pack inventory (Topics/InThisTown/PACK.md) — USE, DON'T REBUILD

staging.ts: wordClock/pop/ramp/jolt/ahead/beside/SOUTH-EAST-NORTH-WEST/KID=0.8/faceOf/chestOf/hill.
villagers.tsx: Villager (ONE face, folded arms; arms-out ONLY zombie villager), ROBE 8 colours,
IronGolem 2.7m, golemHand, Poppy. players.tsx: Player who 0–11, Pumpkin. things.tsx: Bubble (use
dark!), BedBox, Hole, Bits, Smoke/SmokeBank/Wisps, Blaze, FireLight, StrawHat, Bucket, Lantern.
places.tsx: Hut (burnt/ablaze/lit/open), Bell, Well/WellLid, Stall, LampPost, LanternPost,
LanternLine, Fence, SteppedHill, Room (no south wall), Tunnel. fields.tsx: Wheat, Scarecrow
(eyes in dark!), Pine, ForestEdge, Moon, PixelDisc, Moonlight (one moving cone = character),
Stars. creatures.tsx: MonsterEgg, Worm, Dragon, Phoenix, Golem(stone), Mother, Chicken, Fire,
Puffs, SoundRings, RankSign, SubscribeSign. monsters.tsx: Zombie/Skeleton(jaw!)/Creeper(fuse)/
Spider/Enderman(jaw/shake/carry)/Slime + monsterFace; NOT built: witch ghast blaze piglin phantom
(piglin exists in snow-golem film kit only). pillagers.tsx + mansion.tsx (Mansion 38m, DarkOakForest,
MansionHall + MANSION_HALL measurements). siege.tsx: Horde (every one real Pillager), WatchTower
(floors!), spyglassPose/SpyMask, Boom/TNT (smoke ≤0.2), Ravager/Vex/Witch/Axe/HandTorch/HandBanner,
Bush/Key/LitWindow/Web. catsdogs.tsx: Cat/Dog Player/Villager/Golem + CatDogHead/Tail for new
bodies, catArchPose, Fish/Bone; no bark/hiss in sound kit (bonk pitch .75 / gust pitch 1.6).
creepertown.tsx: CreeperMum/Dad/Kid, CreeperCrowd (cat+at bolt!), creeperBolt, CreeperHouse,
CreeperFace, CreeperSuit, GunpowderPlayer, PlayerSword/EmptySack/LostShoe, LongTable (shoot from
END), SchoolDesk, CardboardBox, PixelHeart, NightFill, groundSitPose, openArmsPose.
endertown.tsx: EnderMum (pink bow, knee bands)/EnderDad, EnderCrowd (jaw/shake/hold/drop/outAt
teleport), EnderThing, EnderZap, EnderHouse, BlockPile, PumpkinPlayer (on= takes pumpkin off),
KnockedPumpkin, PumpkinHat, PumpkinView (static cam looks north!), PhotoBorder, EnderPearl/PearlSign,
KidDrawing, Rain/Puddle, DinnerPlate, Kitchen*, KitchenGone. Scream = buzz pitch 1.4–1.9; teleport
= glitch; teach both in first 6s.
Night craft: lantern-night look; some lanterns real light (12 of 25), face needs lamp on CAMERA
side; wide hat hides face from above → lens under chin; check lens→moon line; Moonlight strength
2.4 fields / 3.5 square. Shaders ON since I-Had-Never-Seen-the-Sun (post:{shaders:true}); emissive
<1; dark Bubble; Hut open blooms in day (cover with brown block); overworld-rain for day rain;
sun position day 14°W of N 22° up, sunset 11°W 9° up; stills 4× slower, shoot in 30s.
Pack changes: pixel-proof ALL approved films before/after (compare-stills.py); new look = new prop
with old default. Teller NOT in pack (each film's own kid, one loud colour). Town layout + third
place (what rule hid) = new per film.

## 9. Sound (SOUND.md)

Sheet sound.json: music.track = Topics/InThisTown/InThisTownMusic.aac (3:36, owner's, since
2026-11-13; gain −16; sections {from,mood,gain,why}; mood "none" = silence; track runs on film
clock, mutes don't restart). ≥80% coverage, ≤8s silence. Beds {from,to,bed,trim}. SFX {cue,word,
nth,p,at,sfx,trim,gain,pan,repeat,every,pitchStep,pitch,dur,note,f,ring,align,why}. **KEY IS `at`
NOT `offset`** (4 delivered films carry offset fault: MV1, MV2, MV3, Robot). Whoosh centered on
cut; riser ENDS on its time. Levels dB vs voice on phone speaker: −5 hard hit, −10 most, −14 bg,
<−18 inaudible. Limits: music 15–24 dB under voice; ≥40 sfx/min; no 6s gap; voice ≥3 dB every
half-second, ≥10 dB median; −16.5..−13 LUFS; peak ≤−0.3. Report + effects.txt + timeline.png in
out/sound/<film>/. Sound on the WORD; feet follow animation; each thing keeps its sound; plant
sounds like questions (bell ×3); pan to side; quiet beats loud. Last word of sentence 9–13 dB
quieter → put effects on loud early words. Reveal: riser through silence, boom on first word.
Add sounds as @sfx in sound.py (computed numpy only), rebuild ALL films. Nobody can hear it: SAY SO.

## 10. Coverage — COMPLETE as of 2026-11-25

**295 markdown files on disk, 226 unique by hash — all read or accounted for.** Where a file is a byte-identical copy
of another (the topics were made by copying), it is recorded as such rather than read twice.

| Area | Files | How it was covered |
|---|---|---|
| Root (`AGENTS.md`, `README.md`, `CLAUDE.md`, `MASTERPROMPT-01*`, `README`) | 5 | read in full |
| `docs/` | 12 | read in full (digested §12) |
| `Topics/` root + `Topics/README.md` + `Topics/MASTERPROMPT-01.md` | 3 | read |
| `Topics/InThisTown/` — README, OWNER, SCRIPT, SHOTS, SOUND, PACK, MASTERPROMPT, WHY-IT-WORKED, topic.json | 8 | read in full (§1–§9, §18, §20) |
| `Topics/InThisTown/outlines/` | 11 | read (§21) |
| `Topics/InThisTown/reference/` — 19 films, READMEs + shot logs + narrations + NEW-SHORT + treehouse + 2 rejections | 68 | read; all 16 narrations line by line (§14); all 13 shot logs measured (§17); READMEs (§19.6) |
| `Topics/Stories/` — README, OWNER, SCRIPT, SHOTS, SOUND, PACK, REFERENCE-STUDY, WHY-IT-WORKED, IDEAS, outlines, old reference, bread | 37 | read; SOUND/PACK/SHOTS proved near-identical diffs (§15.2) |
| `Topics/WhatIf/` | 12 | read in full (§15.3) |
| `Topics/Explainer/` | 8 | read in full (§15.4) |
| `Topics/Deadpan/` | 6 | read in full (§15.5) |
| `Topics/Recreation/` | 10 | read (§15.6) |
| `Topics/Shared/` | 2 | read (§15.7–8) |
| `Topics/SoundEffects/` | — | no markdown; the effect list lives in `scripts/sound.py` (§13) |
| `20k-hits/` | 10 | read in full (§3) |
| `src/videos/` — 11 `REVIEW.md`, 11 `STORYBOARD.md`, 40 `narration.md` | 43 | REVIEWs read in full (§16); every unbuilt script read (§16.5); STORYBOARD format read |
| `drafts/` | 6 | read (§18.4) |
| `templates/` | 3 | read |
| `review/framework-remaster/` | 1 | read |

What I did **not** do: open any binary (mp4, jpg, png, aac), or run a render. No film was built, no git history was
inspected, and nothing outside this branch was touched.

## 11. Reference films, measured (all read 2026-11-25)

| Film | Cut | Secs | Shots | Words | wpm | Median shot | Owner's words | Open it for |
|---|---|---|---|---|---|---|---|---|
| same-face | short 14/18 | 104.7 | 57 | 441 | 254 | 1.70 | "everything is perfect top to bottom"; "put it as the topic's reference" | THE reference: everything |
| nobody-looked-at-the-moon | short | 111.7 | 63 | 471 | 254 | 1.73 | "every single one u made is good" | night, plus a remake of a rejected short |
| monster-egg | long 18/18 | 177 | 93 | 746 | ~254 | — | "every single one u made is good" | long cut, 3 places; NO sound sheet (do not copy) |
| superpower-at-18 | long | 168 | 90 | 710 | ~254 | — | "wow i love it" | long cut with sound; his outline |
| superpower-at-18-part-2 | long | 169 | 83 | 713 | ~253 | — | "a banger and a massive upgrade! ... peak!" | MOTION: attack/reject fix list |
| monster-village | long | 175 | 74 | 713 | 244 | 2.37 | "i liked the superhero and this one"; 83% stayed (18k views) | 22 situations, the 82% engine |
| monster-village-part-2 | middle | 128 | 54 | — | — | — | "perfect" | sequel on reused world; 5 scene files |
| monster-village-part-3 | long | 156 | 66 lines | — | — | — | "love it" (rework) | Rule A + Rule B done; silence on purpose; prop as character |
| the-fastest-kid-wins | middle | 140 | 55 lines | — | — | — | "love it" | race in 4 zones, runner kept in frame (`by * p`) |
| helmet-kid | short | 102 | 46 lines | 413 | — | — | script "yes go"; film unreviewed | HORROR: watcher behind tree, Tentacle, silence |
| robot-at-18 | long (trimmed 3:25→2:54) | 174 | 86 | 697 | 241 | 1.88 | "8.8/10 fight scene" | A FIGHT: posed bodies, hit-freezes, cuts inside a line |
| pumpkin-heads | short | 116.1 | 58 | 490 | 254 | 1.90 | approved script + ending | teller with no face; ENDING THAT IS A PICTURE (no spoken punchline) |
| iron-golem | middle | 132.7 | 61 | 516 | 234 | 2.23 | "pretty nice", "this is a good short" (6th render) | PACE (234 + 0.25–0.7s waits) + reason in full sentences |
| we-are-all-cats | short 6 beats | 83.1 | 42 | 342 | 248 | 1.97 | "actually really funny, i love this" | whole story in one film; comedy by picture; one prop through the film |
| everyone-runs-away-from-me | short 6 beats | 100.4 | 50 | 402 | 241 | 2.03 | "really cute short, i like it" | THE 82% recipe in 100s; weakness = weapon |
| i-have-never-seen-my-mums-face | short 6 beats | 105.6 | 52 | 413 | 236 | 1.97 | "banger idea" (script) but "kinda similar to the creeper one" | script-first done right; reveal = picture + silence |
| monster-village-part-4 | long | 169.5 | 81 | — | — | — | FIRST REJECTED ("retention is bad", stopped at 1:05); v2 unreviewed | what a check cannot catch |
| monster-egg-v1 / moon-20-seconds | 20s | — | — | — | — | — | REJECTED | the wrong KIND of video, not a bad one |

Camera mix in approved films: **cam.push dominates (42/57, 49/61, 53/63, 71/86)**; then truck, orbit, pan, top.
Every shot moves. 3–4 holds of 3–4.5s per film for held breaths. Median 1.7–2.2s → 0.45–0.6 cuts/s.
Sound in approved films: 80–128 effects/min (MV1 87, same-face 81, moon 127, iron-golem 128, creeper 128),
music 17.7–18.9 dB under voice, 11–23 music sections in mood films, 1.6–6.6s of true silence used at the reveal,
voice 12.7–14.7 dB over rest (median), LUFS −14.8…−15.4, peak −0.8…−1.7, 9–14 beds.

### The 82% engine (MV1 studied twice) — carry vs leave
CARRY: first shot keeps changing for 2s round a teller who looks at us (11 changes, each with its own `pop`);
past tense; "I"; an unexplained thing in line 4; two neighbours with one habit each that comes back as plot;
things the viewer works out before the teller ("he did not burn"); "I thought…" said out loud and WRONG (3×);
other people speaking (16 lines); a crisis where HIS OWN TRY FAILS ("It is a trick"); clues said back as a list
("The bread. The lantern. The sneeze. The sun."); a second bigger truth; an ending that opens.
LEAVE (this = "reused content"): a kid + mob mum & dad + basket + players with swords at night + a friend in
disguise + "we always knew".
MV1 also: changes SITUATION every ~8s (22 acts vs shadow's 9); every situation = new place/character/object/idea.
Situation budget: full film 20–24 situations (7–9s each); short cut ~14.

### Rejection lessons (never repeat)
- monster-egg-v1: 20s, 0 cuts, 41 words in fragments, dull first shot, no world before problem, ending rushed
  (rank 1→100→10,000→∞ in 6s), no captions, 88° lens. → the format is EXPLAINED: town first, then the odd one.
- moon-20-seconds: 19.6s, 0 cuts, 30 words, present tense, town never seen, rule stated never explained,
  ending = scare not answer, no captions, no topic, drone + one boom mp3s.
- MV4 v1: passed typecheck, check and 2 rounds of stills, and he stopped at 1:05. Faults no lint sees: solid-block
  tower (no floors), arms-at-sides "holding" a spyglass, grey boxes for a crowd, painted-line jaw, fight = one
  wide shot through bars. → "would he know what this is with no sound and no line" is the review question.
- superpower-2 v1: "it just teleports to B", no wind-up/act/result inside the shot, roots too slow, no bounce,
  Tip ran through the well, a joke used twice. → stills cannot see motion; ask for 3–5 frames per action shot.
- robot v2: "png fight another png", "said duck but run towards him" (picture contradicted line), no flying pose,
  flashback he could not have seen, 720 shrink = "visuals degraded".
- iron-golem: 249wpm no air too fast; 220 + 1s air too slow; 234 + 0.25–0.7s approved. One clip 16 dB quiet was
  heard. Never buy length with speed — move UP a cut.
- helmet: reveal of 3 lines in 4.3s felt "empty" → 10s/7 shots, silence, own clips so pauses can go between.

### Frame breadth (measured, 9:16)
fov 40 → 0.41–0.43 × dist wide; fov 42–46 → ~0.4 ×; fov 44 → 0.45 ×. At 3m ±0.6m; at 4m ±0.75m.
Consequences used in approved films: shoot ALONG a long thing not across it; two people within 0.9–1.15m and the
lens on the line between them (OTS); duellists 1.9m apart with camera 6–7m back; a row of 4 needs 6–7m;
golem 6m tall/2.7m normal → camera >9m or it is a white wall; enderman 2.9m → stage kid nearer lens, shoot at
his height, let the enderman be legs. Bubble at scale 1 = 1.6m wide ("HELLO!") → 0.7. Sign 2m wide needs 3m+.

## 12. Craft docs (docs/*.md, all 12 read)

CAMERA-BIBLE: camera is a character with a body, height, reason to move; "put the camera in the room, move it
for a reason, reveal what the hook promised, end before it reaches us". 6 shot types (establish/insert/reaction/
follow/reveal-flythrough/button) with durations+fov. Move vocabulary + when to avoid. One move per shot; ease in
and out; start/end on a composition; a cut lands on a NEW composition. 20s beat map (base films). Lens table
24mm≈53°, 35mm≈38°, 50mm≈27°, 85mm≈16°. Camera heights 1.2–1.7 default, 0.4–0.8 threat, 2.4+ vulnerable.
Roll ≤3°, shake 0.005–0.03. Continuity: from/to/target/fov must copy exactly between scene files. One-question
test per shot: what does the audience know now that it did not?
Remaster toolkit: screenOffset [x,y] (−0.5..0.5, biases frame without breaking target — [0,0.12] lifts subject
above captions), cam.fitHeight, cam.whip, cam.dollyZoom, cam.crane, cam.ots.
DIRECTING: pick the reference by the problem (don't know what I'm watching → same-face; looks like PNGs →
superpower-2/robot; drags → iron-golem; lighting missing → moon + SHADERS). Block in metres on the real set,
`blockedRoute(label, marks, solids, {radius,height})` outside the stage callback; spread the same route as
`<Hero {...route(p)} animation="walk" plantFeet />`; shoot relationships; tie actions to wordAt minus `cut`;
locked camera is right for a photograph/held breath (say why in note); a nominal move with identical endpoints
is a delivery issue. Captions: `captions:{words: timing.words, y:0.72, motion:"on-beat"}`; don't key captions off
scene time/CSS/re-transcription. `--estimate` is layout only; delivery uses `--require-alignment`. Rehearse:
`npm run rehearse -- <film> [--final]`; ERROR = broken clock/contract, DRAFT = not signable, LOOK = frame to
inspect. Review the actual MP4 at speed muted then with sound; a hash/sheet is not a listen.
SCENE-CONTRACT: exact film/scene/shot API, required fields, shot lengths, actor contract, determinism (pure
function of frame; mulberry32/hashString, no Math.random/Date.now/timers), props go in engine not scenes.
STORY-FILMS: narration.md → clips → timing.json → storyScene → captions → sound.json → mix. `cut:` inside a line.
`flightScene` for uncut camera (Explainer). Zones `a+b`. check-story-film rules list.
STYLE: night not black; one warm one cold; three-light rule (key/practical/rim + optional fill); light budget
(1 shadowed key, 3–6 points, 1–2 glows, god rays, pools, dust, fog); exposure 1.05–1.2; procedural canvas
textures NearestFilter; detail at 3 scales; palette tables (hospital night, town-day etc.); copy-paste recipes
(room shell, window+moon+rays, bed, doorway, hallway, figure reveal, foreground occlusion, desk); atmosphere
opacities; composition (3 layers, upper third, 15–30° off-axis, frame-in-frame); anti-patterns table.
Daylight section: build with `Vox` (grass dirt path cobble mossy stone stoneBrick planks darkPlanks log leaves
bricks wool sand hay basalt obsidian magma lava), 5–6 big Vox per house never unit cubes; one colour world per
act; fill faces at night.
NARRATION/RULES: one teller, one tense, 3–10 words (12 hard ceiling), plain words, no action list, no wise old
man, no fancy analogy, no AI summary, banned phrases list, 9-year-old tests (retell/say-it/picture/bored),
edit pass = cut it in half. For topic films: SCRIPT.md replaces the beat map but these voice rules hold.

## 13. Audio pipeline realities
`sound.py draft` OVERWRITES a hand-written sheet — never run it twice. Effects named by cue+word move with the
voice; after ANY script/cut/sheet change re-run build. `out/sound/<film>/effects.txt` is the file to read (not
the timeline png). A `sting` hangs >1s; effects within 1/4s bury each other; last word of a sentence is 9–13 dB
quieter (put effects on loud early words); if a quiet line-end still fails after removing effects, lower that
ONE section's music gain. Level every recorded clip to within ~1 dB before build; the build only sets the whole
track's peak. `# clip <name> wait <s>` for story-step air; record one clip per story step from the start.
Voice: x1.33–1.47; 234–254 wpm in approved films (topic.json allows 235–268).

## 14. Every In This Town script, read (16 narrations)

Read in full: same-face, everyone-runs-away-from-me (creeper), never-seen-my-mums-face (enderman), iron-golem,
nobody-looked-at-the-moon, pumpkin-heads, we-are-all-cats, helmet-kid, monster-village, monster-village-p2/p3/p4,
superpower-at-18 + p2, robot-at-18, monster-egg, the-fastest-kid-wins.

**The opening, verbatim in all 16:** "In this town," + the impossible fact, in ONE sentence, then the second
sentence names the teller's own exception ("Mine was made of snow." / "except me." / "And I was the slowest kid in
town." / "Everyone else is a creeper."). Two lines, ~3–4 s, two shots.
**The three mysteries** come next, always as "Nobody knew…" stacked 2–3 times (who made the rule / who left the eggs
/ where I came from), then the ONE thing nobody will explain ("nobody would tell me what was behind the hill").
**The tour** is things only: nine-block table, own row at school, soup through the mouth hole, scarecrows in the
wheat, rank signs, ovens lit by dragons. **The itch** is one line: "It was a good life, honestly. But why was I
different?" — or a ≤5-word question ("What was up there?").
**The elder** gives a rule with NO reason and leaves/walks away (5.rule + 5.away in 4 of them). Four films use the
exact structure "She looked at ___ for a long time, then said ___ in a way I had never heard."
**The planted question** before the first attempt: "What did my hands have to do with a hill?" / "Who was a whole
town hiding its face from?" / "Catch me? How could a moon catch anybody?"
**Attempt one fails cheaply and the town laughs** (golem carries him home + gives a flower; bucket over the head for
a week; twenty hands push the pumpkin down; three days sitting on the egg, "the only thing that cracked was my back").
**Best friend waits at the hole/window/lid** and cannot say no properly (arms stay in sleeves / knocks twice → no /
climbs off the lid in silence).
**The edge** = look back at the tour's exact nouns, one body action, then the act. **The reveal** = long delay
sentence, then a 4–7 word picture sentence ("The entire world below was dead" scale: "There was no face." / "It was
an eye." / "His power was life." / "My mum has purple eyes."). **Then the reason**, which re-reads the hook.
**The button**: 4–7 words, "Subscribe/Like and subscribe…" and always a story joke, never cheerful
("Subscribe before I wave back." / "…Or I will come and say hello." / "…But do not stare. My dad is right behind
you." / "Subscribe before it blinks again." / "…I have thirty-nine minutes."-style). Series films end
"…for part two/three/four/five."
**Line lengths:** most lines 4–9 words; the long lines are the delay before a reveal. Half the sentences are ≤5
words. "So I tried everything." and "I am small. I cannot fight six players. But there is one thing I am very, very
good at." are the two most reused SENTENCES — reuse the SHAPE, never the sentence (that is the reused-content risk).
**The turn always runs on a true Minecraft fact** that the viewer knows and the teller does not (bread/lantern/
sneeze/sun; pumpkin eye holes; creepers can't hiss and run; helmets wear out in sun; fox drops its item for berries).
**Series state:** each part opens on the worst moment of where the last stopped, one line of recap max, then moves.

---

# 15. The rest of `Topics/`, read: Stories, WhatIf, Explainer, Deadpan, Recreation, Shared

Read 2026-11-25. This is the map of the *other* six topics, so that the In This Town agent knows exactly what is
In-This-Town-only and what is shared, and never re-invents a rule that already exists two folders over.

## 15.1 The topic ladder (from `Topics/README.md`)

| Topic | What it makes | Change flag | Status |
|---|---|---|---|
| **In This Town** | first-person town-rule story, ≤3 min | `--topic in-this-town` | measured, 19 reference films |
| **Stories** | first-person story, any world | `--topic stories` | copy of In This Town, subject freed |
| **What If** | a kid gets one impossible power | `--topic what-if` | PROVISIONAL → now has its reference (`crush`) |
| **Explainer** | a factual question, camera never cuts | `--topic explainer` | PROVISIONAL, one film built, unwatched |
| **Deadpan** | mundane rule taken literally, ironic button | `--topic deadpan` | no approved film yet; re-exports Stories' pack |
| **Recreation** | real-life meme stories in blocks, *no* game mechanics | `--topic recreation` | has an approved reference (Elbow, 77.5 s) |

The rule stack is three deep and does not nest further: `AGENTS.md` + `docs/` is the base 20-second contract; a film
that declares `topic: "<id>"` follows that topic's README instead *where the two disagree*; a film with no `topic`
follows the base unchanged. `npm run check` reads the same field.

## 15.2 Stories — the generalised In This Town

- Provenance: made 2026-11-12 by copying this topic on the owner's word ("duplicate InThisTown and rename that
  duplicated one Stories then work there"). Pack, numbers, sound guide, camera notes all came with it.
- What changed is **the subject**: no required town, no inherited rule, no required opening. `film.opensWith` is
  gone from Stories' `topic.json`.
- 18 beats (not 14), 640–770 words, 150–176 s, over 178 fails. The 18-beat sheet in its `SCRIPT.md` is the treehouse
  transcript measured (718 words, 259 wpm, 87 shots, 2:46.5). **The five beats In This Town's 14-beat cut compresses
  are the ones it keeps whole: the tease (6), the price (11), packing (12), the long wait (16).**
- Its `SCRIPT.md` §3 gives twelve named moves — the same twelve I derived independently in §14 of this digest, which
  is a good cross-check: title = first sentence; three questions in 11 s ("nobody knew" ×2 before 0:12); every clause
  a picture; lists in threes; comfort then itch; the wish is a ≤5-word question; two kinds of "no" (reasons close a
  question, a rule without a reason opens one); the answer planted as a question before attempt one; fail cheap; name
  the price then pack a bag; slow at the edge and name the tour's own nouns; delay-picture-reason-stop.
- **`Topics/Stories/OWNER.md` is the single most important file in the framework after `AGENTS.md`.** It is the
  owner's taste with dates, and it says of itself: *where SCRIPT.md and SHOTS.md disagree with it, it wins.*
- Its `PACK.md`/`SOUND.md` are near-copies of this topic's, differing only in paths plus: `Villager` gains `skin`
  (`"#5f9a4e"` zombie villager), `headwear`, `carry`, `eyes`, `arms`; `Zombie` gains `armPitch`, `headwear`;
  Stories adds `creepertown.tsx`, `endertown.tsx`, `monsters.tsx`, `catsdogs.tsx`, `pillagers.tsx`, `mansion.tsx`,
  `siege.tsx`. Its `PACK.md` keeps the "With the shaders on" section that In This Town's has.
- `Topics/Stories/reference/` holds only `bread/` and its `README.md` — the rest of its examples live in
  `Old Reference/`, which is a page-only mirror of `Topics/InThisTown/reference/` (source + mp4 live once, here).
  Verified file by file: every `Old Reference` README/shot-log is byte-identical to this topic's, except the index,
  and the `source/narration.md` snapshots differ only in the topic path in their header.

## 15.3 WhatIf — an In This Town film wearing a power

Owner's words, quoted in its README: *"its a story just like the InThisTown it has the same camera technique."* So
**the camera, the cuts, the pipeline and the sound are ours, unchanged**; only the opening, the story shape and the
props that show a power are its own. 14 beats, 60–118 s, 250–520 words, 35–65 shots, median cut 1.4–2.3 s.

Its order of business before a word is written — and this is the part every topic should steal:

1. the premise in four sentences: *What if I could X. I used it for Y. It worked, until Z. What it was really doing
   was W.* **If W does not change what X means, there is no story.**
2. the rule of the power in one line, **with the one thing it cannot do** — the limit is where the story turns, so it
   is chosen before anything else;
3. the price: what using it takes, or shows him, that he did not want; a power with no price is a list of wins;
4. a plant/payoff table, filled in before writing, because "a twist nobody planted is a cheat".

Two hard laws for a power, both usable as tests in any film of ours:

- **The look never changes.** Same part, same colour, same size from hook to reveal. After ten seconds the look *is*
  the power, so a line can say "I saw it over her head" and show only a head. `joHeart(metres)` is the film's single
  function of distance; **no shot sizes a sign by hand** — a sign that swells on a word with nobody moving teaches
  the wrong rule.
- **The reveal reuses the same look and means something else.** That is the whole trick of the format, so the last
  use of the look is planned when the look is chosen.

Shooting a classroom in a 9:16 frame: two families of shot (from the back row looking north at backs of heads and
the board; from the board looking south at faces), lens under 3.3 m and inside the side walls, stack by depth
(one column of desks, not three at 6 m), and **whoever the teller must not see sits straight behind him** — the
plant costs no words. Also: sign and the face that sees it are two shots; nobody else in frame looks at a sign.

## 15.4 Explainer — the one topic where the camera may not cut

30–58 s (never >60), 110–250 words, 12–25 stops of 2–4 s, `flightScene` + `stop`/`near`, guarded by
`unbroken(film.scenes, { maxCuts: 2 })` in `film.tsx`. Its `topic.json` camera block is the mechanism:
`{ builder: "flightScene", continuous: true, guard: "unbroken", maxHardCuts: 2 }`, and `npm run check` enforces it.

- The whoosh is the journey, not a cut: centred on the first half second of the line, `dur` as long as the flight.
- An effect belongs **on the word**, not on the shot (the tag pops on "price").
- One idea per line; a number is a thing you can stand next to; the answer lands in beat 6; claims must be true.
- Music: `curious`/`town` → **`explain`** (a two-note question that keeps being asked) → `tense`/`playful` →
  `hope`; change on the line where the explanation changes direction, never on a round number of seconds.
- New sounds: `coin coins register paper count stamp buzz pop ding slide_up slide_down creak thud whoosh gust`.
- Bed default `sky` (open air, a bird a long way off).

## 15.5 Deadpan — Stories' comic sibling

Re-exports the Stories pack through its `index.ts`; no pack of its own. 100–132 s (the longest short cut in the
framework), 340–420 words, **95–115 shots at 0.8–1.4 s** — near-double our cut rate — 6 beats,
`minSfxPerMinute` 55, ≥3 music sections, hook mid-action, no wink to the camera, exact numbers, ironic button.
Forbids a held static shot and any 2D overlay: every device must be 3D geometry (its example is the phone UI).

## 15.6 Recreation — the only topic that forbids the game

Owner: *"its IRL coated with minecraft. No nether, no mc shenanigans. its a recreation cmon."* Real life in blocks: a
house, a street, a job, a television. No mobs, no crafting, no game mechanics, **no Minecraft jokes** — the exact
opposite of the In This Town / Stories house style, where a Minecraft fact is the turn. Only `"Training."` and
`"HUS HUS HUS!"` are fixed lines (the meme); everything else is ours. 75–120 s, `--tempo 1.43`, no picture over 3 s,
no silent stretch over 1.9 s, three voices (one actor, one voice, pitch-shifted friends until he registers more),
`split-takes.py` + `takes.json` for the chant's speed, shaders on.

The approved Elbow film: 77.5 s, 49 setups, 242 spoken words. Its lesson is the chant marking individual movements
and a last joke that works with the sound off.

## 15.7 Shared — what is nobody's

No `topic.json`, no rules, no starter, and no film may import it directly: the topic's `index.ts` passes it on.
`voxel.tsx` (`Voxels`/`Figure`/`Icon`, 16 icon kinds, `outline` for pale backgrounds, `glow` at night) and
`clock.ts` (`filmClock` → `useSince`/`at`/`end`, called in the world or a world component, **never inside a shot's
`stage`**). Passed on from this topic unchanged: `staging.ts`, `players.tsx`, `villagers.tsx` (Hut/Stall/LampPost/
Room), `things.tsx` (Bubble/Bits/BedBox), `creatures.tsx` (Puffs/SoundRings/SubscribeSign). Moving a part here for
real requires `compare-stills.py` proof that no pixel of a finished film moved.

## 15.8 `Shared/SHADERS.md` — the look, measured

`post: { shaders: true }` or a preset (`vibrant-day`, `warm-sunset`, `moonlight`, `horror-noir`, `cinematic`), or
fields by hand. Chain, in order: sky dome → **bloom with threshold above 1.0 on purpose** (a white caption is
exactly 1.0 in linear light; at 0.94 captions bloomed into blobs) → `OutputPass` (**required**; without it the film
renders linear and dark — one whole render cycle lost) → sun shafts (no depth test, so a whisper) → grade (glass
diffusion, filmic shoulder, lifted black, warm mid / cool shadow, vignette, grain, corner fringing).

It is ~70% lighting and 30% grade; the shader does not replace `Look.tsx`. Reference measurements (tree-dad film,
32 frames): warmth **+82**, saturation **77**, luma 17–198, clipped 0.6%, glow 1.05×, sky texture 7.2, soft edges
0.78, grain 1.4. Our bench went warmth +1.3 → +54 and blacks p2 45 → 54; **sky texture 0.44 → 1.1–3.1 against 7.2
is still the open gap** (`cloudScale`/`clouds` on the outdoor looks). Test with
`gh workflow run stills.yml -f composition=scenery-day -f frames=20`, or `scripts/look-metrics.py` /
`scripts/shader-sim.py` locally instead of a render.

---

# 16. The 2026-11-17 batch: six `REVIEW.md` files, read in full

These are the newest In This Town films, and each has a `REVIEW.md` written against `MASTERPROMPT.md`. They are the
richest unpublished lessons in the repo: the mistakes an agent can only find by looking at stills. Read at least one
before writing a shot list.

| Film | Length | Shots | Effects/min | Voice over mix |
|---|---|---|---|---|
| My Brother Got Bitten | 2:04 | 72 | 155 | 12.8 dB (worst 0.5 s: 5.1) |
| A Stranger Moved Into My House | 2:12 | 75 | 141 | 13.8 dB (was 13.2) |
| Being Scared Is My Job | 2:23 | 71 | 172 | 14.2 dB (was 13.4) |
| I Have Forty Minutes | 1:52 | 54 | 114 | 15.8 dB (worst 4.5) |
| I Was Told to Sit | 2:27 | 75 | 163 | 13.9 dB (was 12.7) |
| I Had Never Seen the Sun | 2:14 | 72 | 124 | 13.0 dB (worst 4.6) |
| We Lost the Vote | 1:39 | 48 | 136 | 14.8 dB |

**The one-line summary of all six: the mix is 12.7–15.8 dB of voice over everything, and Monster Village — the film
that did 5k views — is 14.1. Field agents should aim at 14.** Every one of these six ends its review with the same
sentence: *the sound was measured and never listened to.*

## 16.1 The review file's shape (copy this literally)

Eleven numbered items in a table (title, one-sentence premise, three hooks + which was chosen, narration, storyboard,
characters/assets, caption track, sound plan, render, self-review, remaining weaknesses), then:

1. **The concept** as six rows: main character / audience / conflict / appeal / unexpected development / payoff.
2. **Three hooks**, each as *what is seen · what is said · the question it leaves*, then the one chosen and why.
   Hook 1 wins in five of six, and the reason given is always the same two things: **it is the title line, and both
   the odd thing and the person it is odd for are in the first frame**.
3. **Self-review** as twelve questions with a yes/no/sentence each — first three seconds, premise at once, every scene
   contributes, middle engaging, gets more interesting, characters consistent, captions accurate, narration
   intelligible (**"measured only, nobody has listened"**), ending delivers on opening, filler, works alone.
4. **What the review changed**, pass by pass.
5. **Remaining weaknesses** — named shots, by cue id, without excuses.

## 16.2 The three-pass rhythm the owner forced on 2026-11-17

His instruction was *"perfect the five like Monster Village"*, explained as: every frame and every script checked again,
against `MASTERPROMPT.md` and the Monster Village study. The passes were:

- **Pass 1 — the hook is a held picture and must be rebuilt.** In all five, the opening was *one finished picture,
  only one element moving*. The fix is always the same: the lens closer, and **a new thing arriving every 0.2–0.3 s,
  each with its own sound**, round a teller who looks at us. Monster Village changes its picture eleven times in its
  first two seconds.
  - Stranger: a Z, a pickaxe against the bed, a "?" over the villager, a loaf on the blanket, a block of dirt, another,
    more Zs, a "!" as he looks at us.
  - Being Scared: he hops and screams, KEVIN lands over the zombie, neighbours' screams pop left and right, an iron
    man pops out behind the glass, then another, then the scream stops and both look at us.
  - Forty Minutes: he hops in under his clock, a llama at one shoulder, the other llama, his shop lands at his elbow,
    a villager walks past at the frame edge.
  - Told to Sit: the same build-in, lens moved 6.4 m → 4.3 m so **the dog's face is the biggest thing in frame one**.
- **Pass 2 — the tense of the script.** The benchmark is past tense from its first word. Being Scared's whole first
  clip (29 lines) was present tense, so it was **written again and recorded again** — and gained two real lines from
  the rewrite ("I thought it meant good morning"; "…I opened my mouth, and nothing came out"), because a habit became
  an event. The others kept present-tense frames ("In this town, I have forty minutes") with the story in the past.
  **The rule: present tense is only allowed as a frame held across the film, never as the tense of the story.**
- **Pass 3 — sound.** Every effect 1–2 dB quieter (`sfxGain`), then the ones that would have been buried put back
  individually. That is how the voice margin went 12.7 → 13.9 and 13.4 → 14.2.

## 16.3 The staging faults that keep coming back

These recur across all six. They are the checklist before any stills run.

1. **Two people in a line with the lens are one person.** A lens straight behind or in front of a column hides the far
   one. Stand 15–40° aside. (Two blue robes in one frame read as one person — the fisherman had to become teal.)
2. **A long body in front of the lens hides the neighbour.** The cow stands beside or behind, never in front.
3. **Carried things hang over the face.** Lower the loaf, the emerald, the bottle **below the nose** — a bottle at the
   mouth reads as a tongue, scissors in front of a face read as a tongue.
4. **A prop that hides must be checked from every camera in the scene.** The arm stood inside the well; it hides
   behind a tree now. The helmet's own tag is cut by the frame edge in over-the-shoulder shots.
5. **Captions are at 72% of the height; aim faces at 60% or higher.** Five close-ups had to be reframed in Being
   Scared alone. It is listed as a known weakness of *every* film in this pipeline.
6. **Night needs one warm light placed by the shot, and faces are black without it.** Lantern + fill + moonlight at
   once blows the subject white (We Lost the Vote); a lantern a third as strong and fills under half fixed it.
7. **Mailboxes, signs and flags are shot from the lit side.** From the north they are a shadow, and the flag is behind
   the box.
8. **Don't shoot the same frame twice in a row** (`2.rule` and `2.gate` were the same gate; `7.tell` and `7.two` were
   the same close-up with one shot between).
9. **A monster in a helmet at sunrise needs a clock nobody explained** — I Had Never Seen the Sun's whole middle is a
   wear bar over his head that only goes down; it broke at 64%.
10. **Light must change across a film.** Being Scared was daylight start to finish and was rebuilt as day → sunset
    ("Then it was just us") → night with two torches, so that the bed lighting up far below is the brightest thing in
    the film. Forty Minutes keeps its windows dark until the emerald goes round, so the town lighting up is *seen*.
11. **The look back must be readable from 60 blocks.** Night fog made the bed a grey smudge; the lens goes down to it.
12. **A still cannot show a subject that is black against a lit door.** Two of these only appeared in the rendered
    film's frames. Always end with `render-check.py <film> --sheet`.

## 16.4 The shaders, as this batch learnt them

First film with `post: { shaders: true }` is I Had Never Seen the Sun (owner, 2026-11-17). What it cost:

- Emissive at intensity 2 near the lens is a white blob. **Keep emissive under 1**; a lamp's light modest (2–3 at arm's
  length). Indoors for Recreation: 3–7, never 16+.
- A sunset look under a roof of leaves reads as plain day: keep `overworld-night` and add your own pink side light.
- **Every `Bubble` gets `dark`.** The white bubble blooms to a blob and its dark letters close up into an unreadable
  block; the dark bubble's pale letters read at any size. One or two words, scale 0.4–0.55; stack two for a longer line.
- A lit open doorway in full sun blooms to white across a street — lay a plain brown block over it for that shot.
- Rain by day is `overworld-rain` (added for that film); `overworld-storm` is bruise-purple with a warm low sun and
  reads as a strange sunset. Keep `Rain` away from the lens: a streak near the camera blooms into a white bar.
- The sun is at a known place: `overworld-day` 14° west of north and 22° up; `overworld-sunset` 11° west, 9° up. A
  shot that says "there it was" must point at it (`yaw: 14, pitch: -20`) — one film had the sun outside the frame.
- A still takes ~4× as long: shoot in groups of thirty.

## 16.5 The unbuilt / not-yet-watched scripts in `src/videos/`

Read for craft, not to be built. They show what the topic's voice sounds like at its most confident.

- **`i-traded-my-bed-for-a-plate-of-stew`** — the purest *binding-rule* film in the repo. A ladder of consequences,
  one per day, each clause caused by the one before: plate → table → floor → chair → arm ("that arm had handed him the
  plate") → legs → mouth. Then the loophole is found by **re-reading the mechanism**: everything that touched the plate
  is in the trade, so he trades the one thing that only *pushed* it — the stick — and the receipt that lived in his
  other trousers. The button is a second debt. Note the rhythm: 7-line clips, almost all ≤8 words, present tense,
  and the joke always one word long ("He read it. He cannot read.").
- **`in-this-town-me-and-my-shadow-dont-get-along`** — the cleanest "the power was you all along" structure, and the
  proof that the turn can be emotional rather than factual: the shadow is *"the part of me that was not scared, doing
  what I wanted"*. The plant is the janitor's line ("Because you keep letting it do the brave parts") at 60%, and the
  reveal re-reads it. The button is a *conditional*: "Like this video if you had to borrow your courage before it
  became yours."
- **`in-this-town-everyone-swims-except-me`** — series part one built as a **race ladder**: 10th → 8th → 7th → 4th →
  3rd → 2nd, and the loss is the point ("But I couldn't catch him"). The object (the ring) has a rule the hero must
  learn by accident, and the last beat is a *discovery about the rival*, not a win. Ends "Like and subscribe for part
  two" with no resolution at all.
- **`in-this-town-i-was-a-spy-for-the-villagers`** — the funniest structure here, and the model for a **comedy of
  competence by accident**: everyone takes one step back, he was looking at a butterfly; he is made captain for his
  grunt; he leads the raid on his own town by turning left four times. Ends on the disguise failing ("I felt the ash
  run down my face." / "Oh no.") — a cliffhanger built on a physical fact established 90 seconds earlier.
- **`my-dad-hasnt-left-the-doorway-in-six-years`** — the most efficient emotional film in the repo, and its engine is
  a **Minecraft mechanic as grief**: a mob sees a body in the gap and turns around. The plant is an inventory check
  ("No axe. No food. No bed. … A wooden sword with one hit left on it"), and the reveal re-reads a line from minute
  one: *"the night you stop being scared"* — but the kid is sixteen and nobody ever told him. Button: "Subscribe if
  you'd take a shift."
- **`in-this-town-the-new-kid-never-took-off-his-helmet`** — the only horror film. Note the **wait values in the clip
  headers** (`# clip 06b-noface wait 1.7`) doing the silence: "There was no face." / "There was a hole." / "And
  something inside it moved." — three one-line shots, 1.1–2.0 s of held silence between them. That is the reveal
  grammar of §14 executed with waits instead of music.
- **`in-this-town-the-fastest-kid-wins-part-2`** — a series part two that obeys the rule: it opens on the worst moment
  of part one (came second; the winner wore the same shoes) in three lines, then never recaps again. The whole middle
  is *strategy*, not racing: paint the shoes, blend in, don't press the button yet.
- **The WhatIf drafts** (`smell-a-lie`, `every-lie-added-a-netherite-block`, `how-many-times-youll-talk-to-someone-again`,
  `hear-every-unsaid-thing`, `hear-what-blocks-remember`, `see-peoples-future`) all pass the topic's own test — W
  changes what X meant — and each is a different shape of the same trick:
  - *smell a lie* → **the limit is the twist** (he can never smell his own), so the lies he catches were kindness.
  - *netherite blocks* → **a visible counter** for the cost, cleared one block at a time by confession; the last three
    only clear when he admits he needs help.
  - *conversations left* → **the number is read backwards**: not a countdown but the times he may speak first.
  - *unsaid things* → the heard sentence is right and the assumption about it is wrong ("I'm proud of you" →
    "do you still need me?").
  - *blocks remember* → the medium is the flaw: **it keeps the words, not the meaning**, and the friend was rehearsing
    a villain's goodbye.
  - *see peoples' future* (the owner's own premise, 2026-11-13) → the future is a diagnostic, not a prophecy: the man
    only has shoes when Max has a wrench in his hand. Saved **without a word**, by handing him something broken to fix.
- **`what-is-a-dictator`** — the explainer voice, and its last line is the best button in the repo: *"So subscribe.
  Or say no. Here, you still can."*

## 16.6 What this batch proves about the owner's taste

- He rewards **one strange rule, honoured exactly**, more than a big idea.
- He says "perfect the five like Monster Village" — meaning *apply the single best film you have to everything*, not
  *invent a new style*. When in doubt, hold a new film against Monster Village Part 1's numbers.
- He wants **the picture to change eleven times in two seconds** and a teller looking at the lens.
- He wants **past tense**, and will accept present tense only as a frame.
- He marks a film as "worse" for going too fast *and* too slow; the window is ~234–240 wpm with 0.25–0.75 s of air
  between story steps.
- He notices reuse between films before he notices anything else, and it worries him for the channel's standing.

---

# 17. The shot logs, measured: every camera move in the topic, and what the numbers say

Every approved film has a `shot-log.md` made by `node scripts/shot-log.mjs <film>`: start, hold, cue, words, zone,
camera move, and the shot's own `note` (why this picture for these words). **The `note` column is the most valuable
thing in the repo** — it is the director explaining, shot by shot, what a line was turned into. Read `same-face`'s,
then `monster-village`'s for a night film.

## 17.1 Camera moves, counted across all 780 logged shots

| Film | Shots | push | truck | orbit | pan | top | hand-set |
|---|---|---|---|---|---|---|---|
| same-face (reference) | 57 | 42 | 3 | 3 | 2 | – | 7 |
| nobody-looked-at-the-moon | 63 | 53 | 4 | – | 3 | 3 | – |
| monster-egg (long) | 93 | 68 | 7 | 8 | 3 | 7 | – |
| superpower-at-18 (long) | 90 | 62 | 6 | 3 | 2 | 9 | 8 |
| robot-at-18 (fight) | 86 | 71 | 5 | 3 | – | 2 | 5 |
| monster-village | 74 | 63 | 6 | 3 | 2 | – | – |
| iron-golem | 61 | 49 | 2 | 2 | 7 | 1 | – |
| pumpkin-heads | 58 | 42 | 4 | 2 | – | 6 | 4 |
| monster-village-part-2 | 54 | 42 | 12 | – | – | – | – |
| never-seen-my-mums-face | 52 | 47 | 4 | – | 1 | – | – |
| everyone-runs-away-from-me | 50 | 39 | 5 | 4 | 2 | – | – |
| we-are-all-cats | 42 | 20 | 7 | **10** | 3 | 2 | – |

**`cam.push` is 68–90% of every film.** It is the language, not one of the options. `cam.truck` is the second
(4–22%), and it is used for exactly one job: **travelling alongside somebody going somewhere** ("one take, flat out,
the camera running beside him"). `cam.orbit` belongs to reveals of a *presence* — the camera swings out and someone
was there all along (Mo catching the sword). `cam.top` is for smallness and for decisions made alone in a bed or over
a bag. `cam.pan` is to move from a part to a whole, or from a thing to the face that cannot say it.

`we-are-all-cats` is the outlier: 10 orbits in 42 shots. It is a *comedy*, and the orbit is the joke's timing device —
swing round and the situation is worse/different than you thought.

## 17.2 Shot length, counted

| Film | n | median | min | max | <1 s | >3 s |
|---|---|---|---|---|---|---|
| same-face | 57 | **1.70** | 0.77 | 3.17 | 3 | 1 |
| nobody-looked-at-the-moon | 63 | **1.73** | 0.77 | 3.23 | 7 | 2 |
| superpower-at-18 | 90 | 1.77 | 0.73 | 3.40 | 9 | 8 |
| monster-egg | 93 | 1.87 | 0.53 | 4.10 | 8 | 6 |
| robot-at-18 | 86 | 1.89 | 0.58 | 4.43 | 9 | 15 |
| pumpkin-heads | 58 | 1.90 | 0.87 | 3.53 | 3 | 4 |
| never-seen-my-mums-face | 52 | 1.97 | 1.07 | 4.07 | 0 | 4 |
| we-are-all-cats | 42 | 1.97 | 0.87 | 3.80 | 1 | 2 |
| everyone-runs-away-from-me | 50 | 2.03 | 0.83 | 4.10 | 2 | 4 |
| iron-golem | 61 | 2.23 | 0.93 | 3.50 | 1 | 6 |
| monster-village-part-2 | 54 | 2.33 | 1.00 | 4.37 | 0 | 10 |
| monster-village | 74 | 2.37 | 0.87 | 4.93 | 2 | 18 |

- **The reference film's median (1.70 s) is the fastest in the topic, and the two films the owner called best
  (monster-village, part 2) are the slowest (2.37, 2.33).** So median shot length is NOT the quality signal; the
  variance is. Monster Village has 18 shots over 3 s and 2 under 1 s in the same film.
- **Never plan a uniform cut rate.** Plan a *base* of ~2 s with deliberate outliers: sub-second flashes on a list or a
  flashback (a 0.4 s shot of a dead city), and 4–5 s holds only at the elder's stare, the bag, the bed, the POV down.
- A long cut (18 beats, 90+ shots) runs at 1.8–1.9 s median; a short cut (6 beats) also runs at ~2.0. The number of
  shots grows with the story, not with the tempo.

## 17.3 Zones: how many places a film really uses

| Film | Distinct zone strings | Main / secondary / rest |
|---|---|---|
| same-face | 7 | village 31, lava-shore 16, room+night 5, hill 3, tunnel 1 |
| monster-egg | 7 | town 53, night 16, lava-shore 10, storm 8, lake 5, bedroom 1 |
| superpower-at-18 | 7 | house-storm 38, house 41, night 5 |
| robot-at-18 | 7 | forest-sunset 42, village 20, night 8, sky 6, room 3 |
| monster-village-part-2 | 7 | hide 20, night 12, dusk 12, rooms 9, pit 1 |
| iron-golem | 4 | village 27, night 30, room 4 |
| never-seen-my-mums-face | 4 | night 25, town 24, photo 2 |
| everyone-runs-away-from-me | 4 | town 24, night 17, sunset 8, room 1 |
| we-are-all-cats | 3 | village 32, sunset 6, night 4 |
| monster-village | 3 | night 50, day 21, storm 3 |
| nobody-looked-at-the-moon | 2 | village 58, fields 5 |
| pumpkin-heads | 3 | night 28, village 26, room 4 |

**A short cut of ours is 2–4 places, not six.** The reference uses 7 but 47 of its 57 shots are in two of them. The
zone *string* is also the light: `village, overworld-night` and `village, overworld-sunset` are the same geometry
under two looks, and that is how a film gets a day and a night out of one street for free.

## 17.4 The reference film's beats, shot by shot (read this before writing a shot list)

`same-face` is the model, and its notes are the grammar. What it does at each hinge:

- **`1.face` + `1.me`**: the title as a picture — him low, a wall of identical faces stacked behind; then cut in to the
  one different face. **The hook is two shots: the world, then the exception.**
- **`2.from`**: a flashback is a *smaller him in the same grass*, one villager bending over him, and deliberately
  nothing that explains it.
- **`2.black`**: the word is "burned black", so the picture is the one black house in a bright town, him small in
  front of it. **The adjective gets the frame, not the event.**
- **`3.nose`**: the nose **wags when it is named**. A tour prop does a small action on its own cue.
- **`3.arms`**: `cam.truck` travels at chest height so the folded sleeves stay centre and never unfold. **The tour's
  absurdity is shown by holding still, not by moving.**
- **`3.hmm`**: on the word, the one word they have pops between two noses and the other nods. **A vocabulary of one
  word is a shot, not a line.**
- **`5.rule`**: the hill from its foot, pushed in from below, step on step — "the rule, as a wall".
- **`7.golem`**: `cam.truck` side-on, him a plank under one iron arm with his legs still going, neighbours watching.
  **Comedy is a body that is still moving after it has been picked up.**
- **`8.under`**: the boards break **on the word**; then inside the tunnel he punches at *us* and the dirt flies past
  the lens.
- **`9.wave`/`9.sleeves`**: the friend tries to wave and cannot; the shot then moves to the seam where the arms are
  fused, and comes up to the face "which cannot say it either". **A goodbye that a body cannot perform.**
- **`10.look`**: over the top of his head, a long lens down the valley, every roof he knows. **The look back is one
  shot of the whole place, not a montage** — then `10.oneface` from above, nine identical faces waking up without him.
- **`12.faces`**: "not one face was the same" — five strangers stacked up the steps, **the exact composition of shot
  one, inverted**. That is the film's best idea: the opening picture, answered.
- **`13.clear`**: over his shoulder, arm still up, the smoke parts like a curtain, the arm comes down slowly and the
  roofs are burning behind the people. **Reveal by subtraction, in one unbroken move.**
- **`14.waved`**: 3.00 s, held, closer — "he only looks, for as long as the sentence takes. Then, on the last two
  words, the arm goes up." **The payoff of the whole film is a held shot with one gesture on the final two words.**
- **`14.sub`**: him on the hilltop behind the red sign, **the golem's poppy stuck on the sign**, his own hand coming
  slowly up. The subscribe line is the story's last action, not a card.

## 17.5 The original reference video (treehouse), measured

166.5 s, 87 shots, median 1.73 s, mean 1.91, longest 5.8 s, **31 cuts a minute**, 8.3 words a shot, 16 shots under a
second. Its own grammar, from the file:

- **The tour is fast and flat**: 0.5–2.5 s per thing, a flash of a cabin, a rope bridge panning, barrels, a fruit
  picked, a vine climbed from behind and then from above. **Two angles of the same action in a row is a tour technique**
  (climb from behind, climb from above) — the only place a repeat is right.
- **The elder's warning is the slowest passage in the film**: 3.5 s of asking, 4.9 s of the stare, 0.8 s of him
  walking away, then a 4.8 s **top-down rotating** shot of the hero awake in bed. Authority = long holds.
- **The edge, in order**: a 3.1 s from behind at the end of the beam → 3.1 s from the front and high → 1.3 s he looks
  back → **four shots of the town's nouns, 1.2–2.1 s each** (a person on a rope bridge, two children on a deck, a
  campfire) → 2.2 s close on his quiet face → 1.5 s pulling a strap tight → 0.8 s a breath → 1.1 s his feet step off.
  **Look back = the tour's nouns, one per shot.** Then three small body actions, then the act.
- **The fall is three tumbling shots of 1.7–2.5 s and then three *flashes* (0.4/0.7/0.8 s) of the treehouse fading
  into fog** — the place letting go of him. A flash-frame sequence can carry a whole idea.
- **The reveal**: 0.8 s he smiles (a flash) → 3.2 s his face drops and he stares down → 1.9 s the wide of the dead
  city → 2.1 s **seen from behind a dark sign** → 2.6 s low-angle close as he reads it → 1.8 s **cut back to the
  bright opening wide**, now meaning the opposite → 1.4 s the button, screaming at camera with a SUBSCRIBE plaque.
  **Delay, picture, reason, and then return to the first frame.**

---

# 18. `WHY-IT-WORKED.md`, the outside-video study, the camera distances, and the drafts

## 18.1 WHY-IT-WORKED: the audit of the 5.5k film (read this second, after `OWNER.md`)

Owner's question, 2026-11-12: *"that video got me like 5.5k views on shorts… i have no idea what i did there… i need
you to study that short and make a similar one… increase our stayed to watch to atleast above 75%."*

The audit compares Monster Village (5.5k) with the shadow film that followed:

| | Monster Village | Shadow film |
|---|---|---|
| shots / words / length | 74 / 713 / 175 s | 62 / 489 / 116 s |
| median shot | 2.37 s | 1.83 s |
| **places / situations** | **22 acts** | **9 scenes** |
| **seconds per new situation** | **8.0 s** | **12.9 s** |

**The single biggest machine in these films is not the cut rate — it is the rate of new situations.** 22 in 175 s
against 9 in 116 s, at almost the same shot count and the same words a minute. The shadow film sits in one classroom
for its first third. *The target is a new place, character, object or idea every 7–9 seconds.*

The other findings, as rules:

- **The first seven seconds carry four lines and two questions**, both concrete and impossible, not riddles:
  "I was the only one who was not a monster." / "My mum was a zombie. My dad was a skeleton." / "And I was a boy
  they found in a basket."
- **Every world line is a rule plus a punchline in under 3.5 s**: "Our neighbour Hiss was a creeper. He loved hugs.
  Nobody wanted one." / "The school bus was a slime. You got in. You got out wet." Two of these in a row *promise*
  the viewer a joke every few seconds, and that promise is why they stay past ten seconds.
- **The second character is a puzzle, not an introduction**: Mo's straw hat, scarf to the nose, sitting in the sun,
  carrying a lantern, eating bread, sneezing — five wrong notes, four filed without comment, then "Zombies do not eat
  bread."
- **The teller misreads the town and the viewer gets ahead of him** ("I thought it was because I was the weak one" →
  eight seconds later they are standing in a ring facing out). Two beats of being smarter than the narrator is what
  makes people comment, and comments are half of what pushes a short.
- **Nine escalations**, each bigger and faster, and **the jokes get quieter as it goes**, so the turn to violence lands.
- **The reveal is paid for by a list**: "The bread. The lantern. The sneeze. The sun." then the re-read, "Who do you
  think carried the basket here?" — *the cheapest, most reliable emotional hit in the form.*
- **Comedy becomes the weapon**: a monster wins a fight with the word "Hug.", a callback to the second act.
- **The ask works because the story is visibly unfinished** — a bigger threat and the friend turning, then "Like and
  subscribe for part two." A promise, not a beg.

**The skeleton, verbatim** (copy the skeleton, never the plot):

```
HOOK      0:00–0:07   4 shots. A contradiction, a family, the self, a mystery object.
WORLD     0:07–0:35   6–8 shots. Rule + punchline. 2.5 s each. Places change every shot.
FRIEND    0:35–1:05   6–8 shots. A second character built out of 3–4 wrong details.
RULE      1:05–1:20   3 shots. A town custom the hero explains wrongly.
BREAK     1:20–1:30   3 shots. He breaks the rule and finds out what it was really for.
THREAT    1:30–1:55   5 shots. Outsiders arrive. Fast cuts, 1.0–1.5 s.
BRAVE     1:55–2:10   4 shots. The hero does the one thing he was scared of.
PRICE     2:10–2:25   4 shots. The friend pays for it. An image, not a speech.
LIST      2:25–2:35   3 shots. The planted details, restated, then re-read.
REVERSE   2:35–2:45   3 shots. The threat turns out to be about the friend, not the town.
BIGGER    2:45–3:00   3 shots. A bigger threat, someone stays behind, the promise of part two.
```

→ **700–760 words, 175–185 s, 74–80 shots, 244–252 wpm, median shot 2.2–2.5 s, shortest under 1 s, longest under
5 s, 20–24 situations.**

**The 75%-retention plan**, which is a different target from "good film" and is the point of the whole exercise:
test shorter cuts (75% of 2:55 is 2:11 of attention; 75% of 1:50 is 1:22); **a loop point** so the last line hands
back to the first and a rewatch is a full view; **never let a shot be furniture**; the hook is an impossible fact,
not a feeling; one question on screen at all times, planted a shot before the last is answered; front-load the
oddest image; **cut the abstractions** — no "it was a good life", no "nobody knew why".

## 18.2 The outside reference, measured (`reference for new topic/STUDY.md`)

*His Dad Kept Punching The Same Tree For An HOUR..* — 67.0 s, 720×1280 (the ReadME claims 1080), 37 cuts, median
1.79 s, **longest shot 3.5 s**, 230 words = **206 wpm**, captions on screen 97.8% of the film, luma 66.9 → 98.0 →
97.1, 0% flat, 0% black, warmth **R−B = +80**.

| | Tree video | Monster Village | our Netherite film | our Blocks film |
|---|---|---|---|---|
| wpm | **206** | 253 | 237 | 254 |
| cuts/s | 0.55 | 0.40 | 0.53 | 0.57 |
| median shot | 1.79 s | 2.33 s | 1.80 s | 1.70 s |
| longest shot | **3.5 s** | 6.4 s | 4.6 s | 4.9 s |
| warmth (R−B) | **+80** | +10 | +54 | +21 |
| flat / black | 0/0 | 0/0 | 0.1/1.5 | 0/1.5 |

Three gaps: **warmth** (and it *rises with the feeling*: +53 hook, +96 low point, +104 rescue), **no shot allowed to
last** (3.5 s ceiling in 67 s, against our 4.6–4.9), and **it is spoken more slowly than we speak** — 206 wpm, so the
pictures carry more.

Two findings a description cannot give: **the hook is the darkest act** (77.6 against a 95–105 body — it opens in the
shade and comes up into the light), and **caption density falls by two thirds at the low point** (276 → 42). The
words thin out exactly where the music does, so the defeat is carried by the picture.

Its seven transferable rules: state the impossible thing and the human stake in the first two seconds, then show how
it works; seal the obvious objection before the viewer can ask it; one turn from comedy to feeling at about a third
in, marked by music; **take the music out entirely for the defeat**; let the person who was laughed at become the one
who saves it; **upgrade the goal at the end** (not "he got what he wanted" but "they got more, together"); put the
CTA on the peak, never over the story.

It also has something we have never built: **in-world dialogue as dark translucent nametag boxes above the speaker**,
separate from the caption track.

## 18.3 The camera distances that work (from `SHOTS.md` §6)

**A 9:16 frame with a 40° lens sees 23° across and 40° up and down — at three metres, a picture 1.2 m wide and 2.2 m
tall.** One person, nothing beside them. Every framing mistake in the first film came from forgetting it.

| Shot | `on` | `dist` → `to` | `fov` |
|---|---|---|---|
| Kid's face | face, y 1.2 | 1.9 → 1.4 | 36 |
| Kid, waist up, holding something | chest, y 1.0 | 2.1 → 1.6 | 38–40 |
| Kid, whole body | y 1.0 | 2.4 → 1.9 | 40 |
| Adult's face | face, y 1.85 | 1.8 → 1.3 | 36 |
| A thing in the hands | the thing | 1.6 → 1.2, pitch 30 | 38 |
| A thing on a table/ground | the thing | 1.4 → 1.0 | 36–38 |
| Two people, profile | between them | 4.7 → 4.2 | 40 |
| A golem | chest y 2.0 | 5.6, low | 42 |
| Straight down on a bed | the bed | height 3.6 → 2.9 | 44 |
| The street from above | the middle of it | 27 → 21, pitch 21 | 50 |
| Something bigger than the town | its middle | 46 → 41, low | 56 |

Stack, do not line up: **by depth** (near thing low, far thing over it, pitch 15–30 to spread depth up the frame),
**by height** (put one on something — the oldest woman on a raised porch), **from above** (`cam.top` turns a floor
into a tall picture). Keep the near person off the lens axis. Check what is straight behind a close face.

**Kid faces use the story set**: `smile grin laugh frown uneasy brave fear wow ouch calm`. The older names
(`worried`, `angry`, `sad`) were drawn for horror films — a heavy brow that reads as a threat on a child.

## 18.4 The owner's own outlines (`Topics/Stories/outlines/`) and the drafts

- **The race**, word for word from the owner — this is the gold standard for how he writes: one long breath, no
  punctuation discipline, every beat concrete, and the turn is a detail he buried at the start ("you see the 1st
  place player is wearing a familiar shoes too"). *A clue placed in the middle of a paragraph, unpaid, is his
  signature.*
- **`drafts/in-this-town-the-only-house-with-a-door/`** — the most complete unbuilt In This Town script in the repo,
  and a **loop + list + misread** executed perfectly: "every house has a door, nobody uses one"; the family stands
  with its back to the door for four hours every night; the town has no doors "so that yours is the only one";
  the list re-reads the key, the crack, Bea counting it every morning; the last line returns to the first with one
  change ("Except when they use mine.").
- **`drafts/in-this-town-one-birthday-older/`** — the best *emotional* premise unbuilt: every family gives up one
  year to keep a child alive; the empty chair is the teller's own; he is "the year". Note the plant discipline: the
  third plate, the worn cushion, the cupboard he may not open, "a present for every year I have been alive", the
  thirteen candles for a twelve-year-old. Button: *"Like this video if somebody spent a year on you and never once
  mentioned it."*
- **`drafts/my-dad-has-died-four-hundred-times/`** — built to `REFERENCE-STUDY.md`, 62 s, and it is the cleanest
  example of the mechanic-as-debt engine: dying is free, respawn is at the bed, so **breaking the bed** is the act of
  love. *The payoff is an action on the world's rules, not a speech.*
- **`drafts/the-one-trip-grocery-run/PITCH.md`** — the Recreation pitch format: title / topic / length / one-paragraph
  log-line, then a table of beats with what we see. Note "no game mechanics" holds even here.

## 18.5 The topic ladder as it now stands, and what it means for me

- **In This Town is the only topic with 19 measured, owner-approved films**, and it is the parent of Stories (copy)
  and of What If (same camera). Anything I learn here is the house style.
- **The house style in one sentence:** a concrete impossible fact in frame one, a rule with no reason, a teller who
  misreads his own world, three to five plants paid off in a list, a reveal that is a picture and re-reads the hook,
  and a button that belongs to the story.
- **What I may never do, gathered from every folder:** copy a premise, sentence, joke or twist from a finished film;
  build before the owner approves the script; fill in a finished film's outline; hold a static shot; put a 2D
  overlay anywhere; make a 20-second version of a story; run past 178 s (or 120 s in a short cut) or under the
  word floor; play a third film of the "one odd kid in a town of one famous mob" shape.

---

# 19. `monster-village/NEW-SHORT.md`: the newest director's readme, and the only real analytics we have

**The owner, 2026-11-18: Part 1 ≈18,000 views, 100+ likes, 83% stayed to watch; one other Short ≈2k; most ≈1.4–1.5k.**
That 83% is *stayed versus swiped* — not completion, not average percentage viewed, not the fraction still there at a
known second. And the 18k is not attributable to any one shot. Keep both cautions; they are in the file.

This page replaces the earlier guesswork in `monster-village/README.md` with a frame-level reading of the delivered
cut, and it is the best thing to imitate in the whole repo. Its central idea:

> **Borrow the change of mind, not the monster family.** At 0:54 the bar across the boy's door looks like a way to
> keep him in. At 1:04 we see the backs of the people outside. They are looking *away* from him. The bar hasn't
> changed; our idea of the people who put it there has.

## 19.1 The hook, corrected

The older study said "eleven cuts in two seconds". This page corrects it: **it is ONE shot, `1.town`, 2.73 s long,
that keeps changing.** At frame 0 there is an empty sunny path behind the boy. At 0.40 s Mum is there; at 0.60 s a
skeleton; by the word "only" (1.148 s) he has company; by "monster" (2.108 s) the crowd fills the space round his head.
*"It's one shot, not eleven cuts; you needn't be able to count every partly hidden mob to get the joke."*

That is a materially different instruction, and it is the one to build to: **stagger the arrivals inside a single held
shot, each on its own sound, round a teller who stays easy to find.** The picture says "he fits here"; the voice says
"I'm different". *Which should we believe?*

## 19.2 The question ladder (the film's actual engine, timed)

| Time / cues | What the viewer sees | The question that changes |
|---|---|---|
| 0:00–0:07 `1.town`, `1.mum`, `1.dad`, `1.me` | One shot that populates; then nearer views give two faces names a child would use (*Mum. Dad.*); then the camera looks **down** between them at the basket | Being different now costs somebody something. "How he joined this family" is told *without* saying who brought him |
| 0:06–0:18 `2.hiss`–`3.me` | The creeper wants a hug; the bus is a slime and the boy comes out wet | These are **little stories with endings, not a tour of assets.** "Not every prop needs a secret" |
| 0:18–0:50 `4.stare`, `5.bread`, `6.lamp` | Mo's scarf hides his mouth; his stare reads as dislike; but he **sits beside** him in the sun, blames the hat, breaks bread, needs a lantern, sneezes | Not "is Mo human" — a viewer can guess that early and still want **why he hides, and why he is kind to this boy.** "The bread is lunch before it is evidence; the sneeze is something they have in common before it is a clue" |
| 0:50–1:10 `7.lock`–`9.out` | The outside bar looks like a cage; he climbs out; faces, then the reverse behind their backs. "Out" lands at 1:04.35 | "Why lock him in?" is answered **now** (they are guarding him) and immediately earns *from whom?* — "No extra speech explaining that Mum loves him" |
| 1:10–1:40 `12.mum`, `13.front`, `14.trick` | Mum falls; he looks like a player, so he runs in with arms out: "I live here!"; the big player calls **him** a monster in disguise | **His choice follows from the first line. It costs him something and it does not work.** Now someone else must choose to be seen |
| 1:40–2:11 `15.red`–`18.hunt` | Red on a blue sleeve; the scarf comes down; the wipe leaves a **patch** of skin, not a new face; then "I am human too" (1:55.18); bread, lantern, sneeze and sun named back; **the basket again, in Mo's arms** | The reveal answers more than species: the stare was recognition, he was not alone, and the raiders came for Mo. **Take the basket out of the opening and the later line loses its force** |
| 2:11–2:33 `19.hiss`–`20.knew` | "Hug" at 2:16.65; empty-handed players flee, swords left on the path; Mo holds his hat low and **Mum puts it back on his head**; "Zombies do not eat bread" | Two rewards: the old joke changes the action, and **acceptance is a gesture, not a speech** |
| 2:33–2:55 `21.army`–`22.sub` | The army arrives **only after** welcome; wide of Mo alone; close of hat off, iron on, sword up; subscribe at 2:53.17 | "Do I belong?" is paid. "What will Mo do?" belongs to Part 2. *If the story ends in one part, keep the earned ending — do not manufacture an army* |

## 19.3 Word, action and sound on the same event

Scrub 0:34.20 → 0:34.80 → 0:35.23: one tan loaf, hands apart with crumbs, two halves. The word clock puts "broke" at
34.758; the frame reads BROKE; the sound sheet asks for a crack on that word.

> *"A generic talking close-up with a loaf floating beside it would satisfy the noun and lose the verb."*

And: **the caption helps you name it; it should not be the only place it happens.** The music is `none` from
1:32.57–1:39.20 as his defence fails — not dead silence, speech and effects remain.

## 19.4 The transfer card — fill this in before recording, answer it in REVIEW

| Borrow one job | Before recording | In review |
|---|---|---|
| **Opening** | What can I point at in the first vertical frame? What changes **within** the first phrase? Give three hook options; choose one for the question it raises **about a person** | Your cue + frame 0, a frame inside the action, and the end of the phrase. Mute it; cover the caption; describe the change **without using the title**. If the answer is only "camera zooms", restage it |
| **Change of mind** | "At ___ the teller thinks ___. The viewer can already see ___. Later ___ makes that same detail mean ___." Name the object/action and the word it lands on | Your before and after cues and the intervening action. **Is the evidence visible before the explanation, or only mentioned in the script?** |
| **Choice and reward** | Who chooses, what might they lose, what is settled **before** the CTA? **Why could the last line not belong to either of the last two films?** | Your payoff and CTA times. Watch at phone size, then listen without following the script. A passed rehearsal or a silent sheet is **not** a listening pass |

**Its worked example, which is a masterclass in adapting rather than copying**: borrow `9.out`'s *reverse*, not its
ring of guards. A sign painter watches the market arrow swing toward his stall and blames the apprentice who keeps
touching it; the early clue is a streak of fresh yellow on a passing cart hub; in the new reverse we see the hub
**clip** the low arrow and the apprentice straighten it — **show wheel, blade and hand in that order on "clip"; if the
axle is below the phone crop, the shot fails.** The painter then raises the arrow even though the queue goes the other
way, and the payoff is the next cart passing without turning it. Different job, mistake, cost and comic ending.

## 19.5 After upload: diagnose which problem you actually have

Write **one prediction before upload**. Compare against one *named* ordinary Short over the **same age since
publication** and traffic source (Shorts feed). Keep the Studio labels: shown in feed, stayed/swiped, engaged views,
average view duration and percentage viewed, retention graph, likes.

- **Lower stayed rate** → compare the first phrase muted and voiced. *What did a stranger have to wait for?* Change
  that first, not the finale.
- **Same stayed rate, earlier drop later** → mark the first sustained dip and the cue **just before** it. Was a clue
  invisible, a choice delayed, or a question repeated instead of answered?
- **Same rates, different views** → check feed exposure and audience mix before blaming the script. A spike can mean a
  replay **or** confusion. If the graphs are not available, write "unknown"; do not invent a drop.

## 19.6 The reference films' own "what it is good for" pages, in one place

| Film | Take from it |
|---|---|
| `same-face` | The shape itself: 14 beats, 57 shots, 441 words, 1:44.7, 254 wpm; 36/19/44 in thirds; "nobody" three times before 0:12; music 11 sections with 4.5 s of silence before the reveal; 141 effects (81/min); voice 14.2 dB over everything |
| `nobody-looked-at-the-moon` | A film at night: warm lantern light, and cold moonlight that **lies on one place at a time and moves like a character** (`skyAt()`); the densest sound sheet and what was cut from it |
| `monster-egg` (long) | 18 beats over three minutes, three places in one world. **Voice only — it predates the sound rule. Do not copy that** |
| `superpower-at-18` | The long cut with sound, from the owner's own outline |
| `superpower-at-18-part-2` | The owner's favourite so far: fast action and **showing a process** |
| `robot-at-18` | **A fight.** Bodies posed joint by joint, hit-freezes, cuts inside a line, flying poses (`scene6.tsx`, `fight.tsx`). "Beats 1 to 5 are not a model for motion" |
| `pumpkin-heads` | A second short with sound; **an ending that is a picture, not the subscribe sign held to camera** |
| `iron-golem` | **Pace**: 234 wpm with 0.25–0.75 s of air between story steps, and a premise that states its reason in five full sentences |
| `we-are-all-cats` | **A funny film that ends in one part.** A fight where nobody touches anybody, told in pictures |
| `everyone-runs-away-from-me` | **The recipe in 100 s**: famous mob + kid + wrong thing in daylight; two jokes by 0:10; the weakness becomes the weapon; a number carried through (the nine-block table); true facts as jokes *and* plot |
| `never-seen-my-mums-face` | **Script first, done right** (he said yes and no line changed); a reveal held to the last twenty seconds with 0.5 s of silence; seven plants; a kid among people 2.9 m tall shot from his own 1.22 m eye height so the endermen are *legs* until the one tilt up |
| `same-face` + `never-seen-my-mums-face` | **The warning**: `never-seen-my-mums-face` is `everyone-runs-away-from-me` with a different mob. Same teller, same family, same want, same "tries everything", same six players at night, same turn, same ending, same cut. He saw it in one message |

**The enderman film's staging lesson, which applies to any tall frame**: put the kid **nearer the lens** than the tall
thing, shoot from his height, and let the tall thing be legs unless its face is the point. A scarf on a tall thing that
bends down hangs in front of its face **like a tongue**.

## 19.7 Where the topic stands, 2026-11-25

- 19 approved films, one reference (`same-face`), one rejected 20-second short kept as a warning twice over, two v1s.
- The last owner-facing numbers: **Monster Village Part 1 ≈18k views / 83% stayed**; the rest ≈1.4–1.5k; the goal he
  has stated is **70%+ stayed to watch** and out of "1k view jail".
- The newest films of the topic (`we-lost-the-vote`, `i-was-told-to-sit`, `i-have-forty-minutes`,
  `being-scared-is-my-job`, `a-stranger-moved-into-my-house`, `my-brother-got-bitten`, `i-had-never-seen-the-sun`)
  were built by an agent in **automatic mode** and **he has not reviewed their scripts**; several were re-cut three
  times against Monster Village's numbers. They are the current state of the craft, not approved models.
- **Nothing in this folder may be built without his yes on the script.** That is the rule that has held best.

---

# 20. `MASTERPROMPT.md`, the Roblox builder prompt, the treehouse transcript, and the night film's two craft pages

## 20.1 `Topics/InThisTown/MASTERPROMPT.md` — the owner's own brief (2026-11-17)

Given after Monster Village Part 1 passed 15,000 views. **His text, word for word; do not edit it.** It sits *above*
the topic rules: `AGENTS.md` decides which kind of film is being made, this decides whether it will hold a viewer.
Every `REVIEW.md` in `src/videos/` is written against its §6 list of eleven deliverables.

Its performance snapshot, quoted: 7,047 views at export, 178.33 hours watch time, 21 subscribers attributed, **~91
seconds of watch time per recorded view**, 1,321 views on Nov 14 and 5,726 on Nov 15, later reported past 15,000 and
**81.1% stayed to watch**. It says explicitly: *these are reference results, not guaranteed outcomes; do not invent
explanations about the algorithm.*

The rules that are his, and that no other page states as plainly:

- **The opening must not waste a second** on logos, greetings, channel intros, unnecessary explanations or empty
  establishing shots.
- **Minecraft is the visual medium, not the entire story.** The human element — family, friendship, secrets, fear,
  curiosity, betrayal, embarrassment, unexpected consequences, survival — is what the story is made of.
- **The video should be understood much of the way with the sound muted.**
- **Do not interrupt an important story scene with a like-and-subscribe request.** The CTA comes after the payoff.
- **No forced padding to reach a duration.** Maximum 175 s; "preferred duration: whatever the complete story actually
  needs".
- **Each video must work alone.** A connected world is fine, but the current video needs its own hook, conflict and
  payoff — do not require Part 1.
- **Stage 2: three hooks, each with what is seen, what is said, the question it creates, and why a viewer continues.**
  **No generic phrases** ("You won't believe what happened").
- **Stage 4 storyboard must give eight things per scene**: start/end, narration, visual action, characters present,
  location, camera framing and movement, caption text, sound effects or music changes.
- **Stage 5: do not substitute a written storyboard for a render when rendering tools exist; do not claim completion
  unless the output file exists and has been checked.**
- **§5 "Do not overfit to one video"** — no same family, no same conflict, no same scene order, no copied narration, no
  monsters in every story just because the reference has them, no meaningless scenes to imitate its duration, and
  **no assumption that more cuts mean better retention.**
- **§6 the eleven deliverables** (the `REVIEW.md` table), and: *"Be honest about incomplete work and technical
  limitations. Your objective is not simply to produce more videos."*

`MASTERPROMPT-01.md` at the repo root is the same text with the line breaks counted differently, plus a header saying
it is read at the start of every turn that touches a film. `MASTERPROMPT-01-REVIEW.md` is the review of it.

## 20.2 The Roblox builder prompt (`treehouse/roblox-builder-prompt.md`)

The owner supplied this with the reference video "so that you know what the video is showing". It is a **Roblox**
prompt and is kept word for word as evidence, not as a build plan. Two things in it are wrong when measured: the voice
is ~259 wpm not ~165, and the video has 87 shots, not the 23 "scenes" it lists.

What is worth keeping from it, because it is a designer's account of *why* the format works:

1. **Literal "See-Say" matching at 1.5–3.5 s.** "Every concrete noun or action in the voiceover must immediately
   trigger a corresponding visual prop or camera angle" — barrels → water barrels; fruits → a hand on a mango; "a bag
   with fruit, water, rope, knife" → a top-down shot of a bag containing exactly those four objects. (Our version of
   this is the shot's `note`, and `same-face`'s `10.look` doing it in one shot rather than four.)
2. **2D face swapping, zero lip-sync.** Six discrete faces: neutral, glare, happy, sweat, sleep, scream. *Convey all
   emotion by swapping the decal across the cut.* Ours is the `face` prop with the story set (`smile grin laugh frown
   uneasy brave fear wow ouch calm`), and the rule is the same: **the face changes on the cut, not during the shot.**
3. **Camera motion carries ~70% of the energy.** Keep the bodies almost still and let dollies, pans and orbits do the
   work. Our measured equivalent: **68–90% of every film's shots are a `cam.push`.**
4. **"Jank-smart" shortcuts.** A mysterious shape under the clouds is one flat grey square sliding through the fog; the
   final warning sign is shot **from behind the sign** looking at the protagonist's face so no text has to be rendered.
   *Cheap is fine if it reads* — and our `10.look`-style "shoot past the thing" solves the same problem. Note that the
   final warning sign in the original **is** legible to the viewer from behind (86 is the reverse of it), which is the
   one place the shortcut is beaten by just writing the words in blocks.

## 20.3 The treehouse transcript and beat split

718 words, 54 sentences, 259 wpm, 2:46.5. It is the source of the 18 beats in `SCRIPT.md`. Two facts to keep:

- **Nine of the 54 sentences are six words or fewer, and every single one is a turn:** *What was down there? · Then he
  walked away. · That night, I couldn't sleep. · So, I decided to find out. · But there was still a problem. · "Then
  I'll finally know," I replied. · Then, I pulled the cord. · The entire world below was dead. · Subscribe to save me.*
  Read only those nine and you have the plot.
- **Three spoken lines in 718 words**, each a hinge. Almost no dialogue.

## 20.4 `nobody-looked-at-the-moon`: the night film's two craft pages (the best sound lessons in the repo)

**The look.** `lantern-night`: the night is nearly black, the town is lit warm by its own lanterns, and **the moonlight
is cold and lies on one place at a time** — it starts on the wheat, comes into town when the moon finds him, and goes
back.

**One place that directs the whole world.** `skyAt(cue, t)` in the film's `kit.tsx` answers, for any moment: where the
moon is, whether it is an eye yet, what it stares at, which doors are open, how far the well lid has been pushed, how
near the scarecrows have come. The world draws it; **the scenes stage only people.** *No shot sets the moon by hand, so
no two shots can disagree.* That is the general pattern for any film with a world-level state: **one function, called
by the world, never by a shot.**

**Things planted in the picture and never said**: in each wide of the fields a scarecrow stands a little nearer than in
the one before, and a golem walks its rounds. Nobody mentions either until the end.

**The three picture lessons**, each found on a still and on nothing else:

- **A face needs a lamp on the camera's side.** Looking down a lit street every lamp is *behind* the person and the face
  is a black square. Stand a real `Lantern`, low, just beside the lens.
- **A hat as wide as a door hides the face from above.** Put the lens under the chin and look up. (That is also *why*
  nobody in that town sees the moon — the staging problem became the story.)
- **Anything on the line from lens to moon covers the moon**: a roof, a line of lanterns, a head.

**The sound lessons — this is the checklist when a mix fails and nobody can hear it:**

1. **The last word of a sentence is 9–13 dB under the voice's own level** ("one.", "there.", "to look.", "night."). An
   effect landing on it covers it. **Put the effect on a loud word early in the line**, not on the end.
2. **A `sting` hangs for over a second at nearly full level.** Under the next line it covers the words. Shorten it with
   `dur`, or use it where a pause follows. A `boom` drops 10 dB per quarter second and is not the problem.
3. **Effects inside the same quarter second bury each other.** Three doors shutting on three `hit`s: only the first was
   audible. Use one, on the loud word.
4. **Turning an effect down to save the words can bury the effect** and fail the other limit. **Cut it.**
5. **When a quiet line end still fails with effects gone, the music is what is left.** Lower that *one section's*
   `gain` (−4.5 dB on one cue), not the whole film's.
6. **The `town` mood has loud fills**; they landed on sentence ends, so that section runs 2 dB down.
7. **An effect placed by guess misses the picture.** The scene already hangs the action on a word with `wordAt`; read
   the scene and give the effect the same cue and word.
8. **Read `out/sound/<film>/effects.txt`**, not the timeline picture. It lists every effect and how far it stands over
   what plays under it.

Its own cut list is instructive: removed a `sting`, a `swish`, a `rustle`, two of three `hit`s and two of three steps;
turned down nine effects; left 13 faint ones in and named the weakest. Three sounds were added to `scripts/sound.py`
for it and any film may use them: `blink`, `creak`, `step_stick`.

**And the method note that governs all of it:** *"Every shot was looked at as a still, and many were shot again, before
the film was rendered. The type check and `npm run check` pass on a black face and on a moon behind a roof. Only a
picture shows them."*

---

# 21. The outlines: the owner talking, unfiltered (11 files in `Topics/InThisTown/outlines/`)

These are the closest thing to a specification of his taste, because they are his, word for word, before any agent
touched them. Every one is quoted in place; this section is about what they have in common.

## 21.1 The outlines that exist

| File | His or the agent's | State |
|---|---|---|
| `race-part-2.md` | **his outline**, word for word (2026-11-15) | built as `the-fastest-kid-wins-part-2` |
| `helmet-kid.md` | **his outline** for part 1; draft 2 of the script is the agent's | built as `the-new-kid-never-took-off-his-helmet` |
| `helmet-kid-part-2-script-draft.md` | entirely the agent's — he gave no outline ("save the part 2 of this short ill review it later") | parked |
| `monster-village-part-3.md` | **his outline** | built |
| `monster-village-part-4.md` | **his outline**, plus his changes to draft 1, word for word | built |
| `me-and-my-shadow.md` | **his outline** | built |
| `robot-at-18-part-2-script-draft.md` | the agent's; parked by him ("lets leave robot part 2 for now") | parked |
| `ideas-2026-11-15.md` | agent's six, to the Monster Village recipe | idea 5 built (creeper), idea 4 built (enderman); 1 and 6 parked, 2 needs another danger, 3 stands |
| `ideas-2026-11-16.md` | agent's five | all five built (§16) |
| `ideas-2026-11-17.md` | agent's five, all with a kid, a family and a secret, and **no players in any of them** | **no answer yet** |
| `README.md` | build order | — |

## 21.2 How he actually writes, and what to do with it

Read one of his outlines cold and the shape is unmistakable:

1. **One paragraph, stream of consciousness, almost no full stops.** The race outline is ~330 words in about sixteen
   sentences. He does not stop to be tidy; he stops when the story is done.
2. **"u" and "you" for the protagonist, "we" when he means the camera.** *"we cut to Us waking up in the cage"*, *"you
   look down at your shoes"*. **"We" is the audience's eye**, and it is how he directs.
3. **He directs the camera mid-sentence** and means it literally. *"now focus the camera on 1 guard"*; *"transition
   the camera to move on a black or dark block then once in a dark block, cut that"*; *"make it a hallway but make it a
   skinny hallway"*, *"dont show the hallway first thats the ending"*. **When he names a camera move, do that move.**
4. **He buries the twist in the middle of a sentence.** The race: *"but then.. you see the 1st place player is wearing
   a familiar shoes too"* — dropped at the end of a long list of race positions, never set up. Part 4's *"a Vex popped
   up on his view on the spyglass"* comes in the middle of a description of a raid.
5. **He leaves himself notes to improve.** *"(or if u think of something better then yeah sure)"*, *"(im thinking of in
   part 4, the monsters get help from the pillagers who hates humans. but yeah thats for later)"*. That parenthetical
   is **the** instruction: the major beats are fixed, the details are yours.
6. **He asks for the joke and the emotion in the same breath.** Part 4: *"then for a little humor we see the earlier
   guy who is in charge of the tower fell down in the background"* — a slapstick beat timed under a serious scene.
7. **He thinks in numbers**: places in a race (15th, 11th, 9th, 6th, 2nd), "since he was 10, now 18", "4 minutes
   earlier", "hundreds of pillagers".
8. **He asks for a pause on purpose**: *"narration stop here and make them move like they are discussing"*. He wants
   the silence played by bodies, then a wipe through a dark block, then the next scene.

## 21.3 His corrections, which are the sharpest rules in the repo

- **"i dont like the part where he gave us a note 'DO not follow me' like what, we are planning to stalk him and he
  suddenly know"** → *nobody knows a thing they were not shown finding out.* (Rarely stated this plainly anywhere else.)
- **"before u render i need to change something… make it atleast 2:30"** with new beats, and *"the outline that i said
  are the major parts u can add your own"* → **his beats are the plot; the agent's additions fill between them; and a
  length request is a request for more story, never for a slower read.** (This is the same lesson as the snow golem
  film: *"length is never bought with speed"* — move up a cut instead.)
- **"it got worse ngl"** / *"the video is too fast no time to digest even half a second"* → the pace window, settled by
  the iron-golem film at **~234 wpm with 0.25–0.75 s of air between story steps**.
- **"speed it up abit, u turned it down too much"** → the window has two walls. Do not overshoot the correction.
- **"the ending why did the tts get weaker in volume"** → every recorded clip must sit **within ~1 dB** of the others;
  nothing in the build levels clips against each other. Measure each clip's speech level before building.
- **"it was kinda similar to the creeper one"** → the six-word test, and the ban on filling in a finished film's
  outline (§19.6).
- **"this short has no parts just whole short"** → when he says that, the film ends: no cliffhanger, no "part two",
  and the last line still says "subscribe".
- **"i like that in this town the new kid never takes off his helmet, ill approach that as a horror short"** → he
  supplies the genre, and expects it honoured (silence, waits, a cliffhanger), not softened.

## 21.4 The idea sets, and what he did with them

- **`ideas-2026-11-15.md` (six, to the Monster Village recipe).** He took idea 5 with two words ("lets do 5"). Ideas
  1, 4, 5 and 6 turned out to be **one outline with four mobs**; 4 was built anyway and he caught the repeat. 1 and 6
  are parked by his own judgement. **Lesson: a batch written to one recipe produces one story several times.**
- **`ideas-2026-11-16.md` (five).** He took all five ("lets make 5"/"lets make more"), and all five were built. His
  only criticism: *"i love them but the only 1 thats lacking is the stranger moving inside my house one, but its decent
  enough"* — the one he found weakest is the one with **the least to feel** (a grown villager listing grievances and
  losing). The agent's reading of why is in `ideas-2026-11-17.md` and is marked as a guess.
- **`ideas-2026-11-17.md` (five, unanswered).** Written to his correction: **back to a kid, a family and a secret;
  no players in any of the five** (the previous ten all had players); every turn a true Minecraft fact; every fact
  sourced with a URL or marked "from memory". This is the *current* state of the idea pipeline and the best model of
  how to pitch to him: a five-row comparison table with *who tells it · what he wants · what is in the way · the turn
  (a Minecraft fact) · how it feels · are there players*, then each idea as a pull-quote opening, **frame one** in
  words, the story, the facts, **why it could travel**, **to build** (with an honest size), **the risk** — and a
  stated agent's order with reasons. Two of its five were built: idea 1 as `my-brother-got-bitten` and idea 3 as `i-had-never-seen-the-sun` (§16).

## 21.5 Where the study ends

The framework is now read end to end. What I know that I did not know at the start:

1. **The film's engine is a change of mind, not a cut rate.** Every document that tried to name the secret landed
   there eventually — `NEW-SHORT.md` states it best. The cuts and the effects are how it is delivered.
2. **Novelty is measured in situations per second, not shots per second.** Monster Village: 22 situations in 175 s
   (8.0 s each). The shadow film: 9 in 116 s (12.9 s each). Same shot count, same wpm, half the film.
3. **The house style is a concrete impossible fact, a rule with no reason, a teller who misreads his own world, three
   to five plants paid off in a list, a reveal that is a picture and re-reads the hook, and a button that belongs to
   the story.**
4. **Everything is measured and nothing has been heard.** Every review in the repo ends with the same admission. That
   honesty is part of the craft, and it is the first thing I must say at any handover.
5. **The owner's approval of the script is the gate**, and the one time it was skipped in bulk (automatic mode, the
   seven 2026-11-17 films) it produced films he has still not read.

Nothing is built. Nothing is pitched. The next move is his.
