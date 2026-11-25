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

## 10. Still to read (this study)

docs/ (STORY-FILMS, DIRECTING, CAMERA-BIBLE, STYLE, SCENE-CONTRACT, NARRATION-RULES, NARRATION),
Shared/SHADERS, templates, WHY-IT-WORKED, topic.json, outlines (11), reference READMEs (18) +
NEW-SHORT, 20k ANALYSIS ×3, other topics (Deadpan/Explainer/Recreation/Stories/WhatIf/SoundEffects),
drafts, src/videos REVIEW/STORYBOARD files, review/framework-remaster, shot logs + narrations.
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
