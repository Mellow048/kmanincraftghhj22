# The Treehouse — the owner's builder prompt

The owner supplied this prompt with the reference video "so that you know what the video is showing". It describes
the **Roblox** original scene by scene. It is kept word for word as evidence; it is not our build plan. Our films are
Minecraft-shaped, and `../../SHOTS.md` says how each trick below carries over.

Two things in it do not match the file when measured (see `shot-log.md` and `transcript.md`):

- The voice runs at about **259** words a minute, not ~165 (718 words in 166.5 s).
- The video has **87** shots (86 cuts). The 23 "scenes" below are groups of shots, not shots.

---

# MASTER SYSTEM PROMPT: 9:16 ROBLOX STORYTIME SHORT BUILDER ("THE TREEHOUSE ABOVE THE CLOUDS")

## 1. PROJECT OVERVIEW & CORE OBJECTIVE

You are building a complete, 166.5-second vertical (9:16, 1080x1920) 3D animated Roblox storytime video titled **"The Treehouse Above The Clouds"**.

Your goal is to replicate the exact narrative structure, visual staging, "See-Say" shot pacing, minimalist R6 keyframe animation style, environmental lighting, and audio-caption synchronization of high-retention Roblox mystery Shorts.

## 2. WHY THIS ARCHITECTURE WORKS (DESIGN & RETENTION RULES)

1. **Literal "See-Say" Visual Matching (1.5s–3.5s Cut Frequency):** Never hold a static shot for more than 4 seconds. Every concrete noun or action in the voiceover must immediately trigger a corresponding visual prop or camera angle (e.g., "barrels" -> show water barrels; "fruits" -> character grabs mango; "packed a bag with fruit, water, rope, knife" -> top-down shot of a blue basket containing those exact 4 meshes).

2. **Modular 2D Cartoon Face Swapping (Zero Lip-Sync):** Do not use complex 3D facial bones or lip-syncing. Use blocky R6 rigs with custom 2D Rick-and-Morty-inspired cartoon face decals (round white eyes, pinpoint pupils, heavy under-eye lines). Convey all emotion by swapping the head decal across 6 discrete states:

   - `FACE_NEUTRAL` (bored, half-lidded eyes, flat mouth)
   - `FACE_GLARE` (angled angry eyebrows, frown or open shouting mouth)
   - `FACE_HAPPY` (wide eyes, open triangular smile)
   - `FACE_SWEAT` (nervous wide eyes with sweat droplets)
   - `FACE_SLEEP` (closed curved eyelids, flat mouth)
   - `FACE_SCREAM` (wide bloodshot/shocked eyes, huge vertical screaming mouth)

3. **Camera Motion Carries 70% of the Energy:** Keep character animations simple (2-keyframe arm loops like scratching the back of the head, waving one arm during dialogue, or static leaning poses). Drive visual momentum using continuous slow camera dollies (zoom in/out), slow pans, and orbital rotation around the subject.

4. **Pragmatic Asset Shortcuts ("Jank-Smart" Design):**

   - When showing mysterious shapes beneath the clouds `00:49`), animate a simple flat dark-grey square `Part` sliding horizontally through the white cloud fog and fading its `Transparency` from `0.2` to `1.0`.
   - When the protagonist reads the final warning sign `02:40`), point the camera at the *back* of the black sign looking at the protagonist's horrified face so no complex text rendering is required.
   - End on an abrupt 1.5-second cliffhanger jump-cut `02:45`) where the protagonist screams in front of burning barrels while holding a 3D red plaque with light-blue extruded text reading `"SUBCRIBE"` ("Subscribe to save me").

## 3. CHARACTER & ASSET MANIFEST

### Characters (R6 Blocky Rigs)

- **Protagonist:** Brown parted/spiky 3D hair mesh, dark green football jersey `#8` on chest with two white stars, double white stripes on sleeves), dark navy shorts, white sneakers, tan skin tone.
- **Adult Man (Townsperson):** Balding brown hair ring mesh, white short-sleeve dress shirt, brown striped tie, brown slacks.
- **Oldest Man (Town Elder):** Long messy white hair mesh, bushy white 3D beard, black/grey argyle sweater vest over a white shirt with black sleeve patterns, grey pants.
- **Best Friend:** White baseball cap and white t-shirt featuring a red-and-yellow blocky explosion graphic, black pants.
- **Background NPCs:**
  - *Child Girl:* Long brown hair, light blue shirt.
  - *Bridge Workers (x2):* White hard hats, grey/blue overalls with yellow reflective stripes.
  - *Farmer:* Woven straw hat, pink plaid flannel shirt, blue jeans.

### Key Props

- **Water Barrels:** Wooden barrels with black iron hoops filled at the top with a bright blue water cylinder.
- **Tree Fruits:** Large smooth mango-shaped meshes with a red-orange-yellow-green vertical gradient.
- **Kiwi Birds (x4):** Brown spherical body, long tapered beak, orange blocky feet, black bead eyes.
- **Feather Wings (Attempt 1):** Two white low-poly feathered angel wings + a floor pile of red/orange autumn leaf decals/meshes.
- **Leaf Glider / Parachute (Attempt 2):** A U-shaped frame built from brown wooden cylinders topped with a canopy of overlapping giant green leaf meshes.
- **Supply Bag:** Blue woven rectangular tote/backpack containing 4 visible sub-meshes: coiled brown rope, clear plastic water bottle with blue cap, green apple, and a small grey knife blade.
- **"SUBCRIBE" Sign:** Red rounded-rectangle 3D block with light-blue 3D text reading `"SUBCRIBE"`.

### Environments (3 Distinct Zones)

- **Zone 1: The Giant Treehouse (Daytime Sky):** Massive brown geometric tree trunk and branches high above a dense white cloud plane. Smooth green sphere clusters for foliage. Multi-level wooden plank decks, log cabins with green roofs, wooden rope suspension bridges, vertical ladders, teal climbing vines, cube-bush garden rows, and a stone-ring campfire. Bright blue skybox with warm directional sunlight.
- **Zone 2: The Cloud Abyss (Mid-Air):** Empty vertical space surrounded by volumetric white cloud particles/fog layers.
- **Zone 3: The Dead World Below (Apocalyptic Night):** Dark blue-grey night lighting, dark asphalt road, grey concrete building silhouettes, low-poly trees, burning houses/barrels with orange fire and grey smoke emitters, and a dark standing sign post.

## 4. AUDIO & CAPTION SPECIFICATIONS

- **Voiceover:** Steady, clear first-person male narrator (~165 WPM) with zero silence gaps between sentences.
- **Captions:** Single-word pop-in subtitles (1 word displayed at a time, synced to exact word timestamps), centered horizontally and positioned at ~72% vertical height (lower-middle). Font: Bold lowercase sans-serif, white fill `#FFFFFF`) with thick black outline `#000000`).

## 5. COMPLETE SCENE-BY-SCENE EXECUTION TIMELINE (00:00 – 02:46.4)

### ACT I: THE WORLD & THE FORBIDDEN QUESTION (00:00 – 01:09)

- **00:00–00:01 | Scene 1:** Medium shot of Protagonist `FACE_NEUTRAL`) standing on wooden deck near barrels. Slow dolly in.
  - *VO:* "In this town,"
- **00:01–00:03 | Scene 2:** Wide establishing shot of Giant Treehouse above white clouds `00:01–00:02`), cutting to a high-angle tilt looking straight down the trunk into the cloud floor `00:03`).
  - *VO:* "we all lived in a giant tree house high above the clouds."
- **00:04–00:05 | Scene 3:** Medium two-shot of Adult Man and Protagonist `FACE_NEUTRAL`). Both raise left hands to scratch the back of their heads in sync.
  - *VO:* "You see, nobody knew how we had ended up there."
- **00:06–00:07 | Scene 4:** Low-angle shot of Protagonist `FACE_GLARE`) peering over a wooden ledge beside a ladder.
  - *VO:* "And the strangest part was that nobody knew how to get back down."
- **00:08–00:10 | Scene 5:** OTS shot behind Protagonist looking at Oldest Man `FACE_NEUTRAL`), who shakes his head slightly.
  - *VO:* "Not even the oldest man in town remembered ever living on the ground."
- **00:11–00:16 | Scene 6:** Montage: Low-angle pan up giant tree branches `00:11–00:13`), close-up of wooden cabin `00:14`), pan across wooden rope bridge `00:15–00:16`).
  - *VO:* "Our entire town was built between enormous branches. Hundreds of wooden houses were connected by rope bridges..."
- **00:17–00:18 | Scene 7:** Protagonist `FACE_HAPPY`) walks out of a wooden structure shaded by a giant green leaf canopy.
  - *VO:* "...and giant leaves acted as roofs whenever it rained."
- **00:19–00:24 | Scene 8:** Survival montage: High-angle pan over 4 water-filled barrels `00:19–00:20`); Protagonist `FACE_HAPPY`) reaching up to pick giant mango fruits `00:21`); Protagonist climbing vertically up a teal vine `00:22–00:24`).
  - *VO:* "We collected rainwater in barrels, picked strange fruits growing from the tree and used thick vines to climb between different levels."
- **00:24–00:33 | Scene 9:** Daily life montage: Adult Man waking up on green bed `00:24`); camera pushing through window to 4 kiwi birds on a railing `00:25–00:27`); Child Girl walking on branch `00:28`); 2 Workers in hard hats by bridge `00:29`); Farmer in straw hat tending cube crops `00:30–00:32`); Protagonist `FACE_HAPPY`) smiling on deck `00:33`).
  - *VO:* "Every morning, people woke up to birds singing outside their windows. Children played on the branches, workers repaired broken bridges and farmers grew vegetables in little gardens built into the tree. It was actually a pretty good life."
- **00:34–00:36 | Scene 10:** Medium close-up of Protagonist `FACE_GLARE`) leaning both arms on wooden railing as camera orbits slightly.
  - *VO:* "But there was one thing I could never stop thinking about. What was down there?"
- **00:37–00:44 | Scene 11:** OTS shot on Adult Man `FACE_GLARE`) gesturing with arms while lecturing Protagonist `00:37–00:43`), cutting to Protagonist rubbing chin in thought `00:44`).
  - *VO:* "Whenever I asked the adults, they told me the clouds were too thick to see through. They said the fall was too dangerous and nobody could survive reaching the ground. But that only made me more curious."
- **00:45–00:54 | Scene 12:** Protagonist `FACE_SWEAT`) sitting on narrow high beam as camera pulls back `00:45–00:47`), low-angle shot standing at edge `00:48`), cutting to straight-down POV into white clouds as a flat dark-grey square `Part` slides across and fades out `00:49–00:54`).
  - *VO:* "Sometimes I would climb to the very edge of the tree house and stare down through the clouds. Occasionally, I could see strange dark shapes moving far below, but they always disappeared before I could get a better look."
- **00:55–01:03 | Scene 13:** OTS shot on Protagonist asking Oldest Man `00:55–00:57`), reverse OTS shot on Oldest Man `00:58–01:03`) staring, speaking, and walking away.
  - *VO:* "One day, I asked the oldest man in town if he remembered anything about the ground. He stared at me for a long time before saying, 'All I remember is that we were told never to go down,' then he walked away."
- **01:04–01:09 | Scene 14:** Top-down rotating shot of Protagonist `FACE_NEUTRAL`) lying awake in bed `01:04–01:08`), cutting to Protagonist `FACE_GLARE`) leaning on porch railing `01:09`).
  - *VO:* "That night I couldn't sleep. Why would someone build an entire town in a tree unless there was a reason to stay up here? So I decided to find out."

### ACT II: INVENTION, FAILURE & PREPARATION (01:10 – 01:52)

- **01:10–01:19 | Scene 15:** Protagonist crouching over white feathered wings on floor `01:10–01:12`); jumping off roof ledge wearing wings with `FACE_HAPPY` `01:13–01:14`); broken white wings lying in a pile of autumn leaves `01:15–01:17`); Best Friend laughing `01:18`) and Protagonist scowling with `FACE_GLARE` `01:19`).
  - *VO:* "First, I tried building a pair of wings using giant feathers and vines. I climbed onto the highest branch and jumped, but the wings immediately broke and I landed in a pile of leaves. Everyone laughed at me, but I wasn't giving up."
- **01:20–01:31 | Scene 16:** Protagonist hand-on-chin thinking `01:20`); looking down at pile of sticks and giant green leaves `01:21–01:22`); close-up pan of assembled green leaf glider on wooden frame `01:23–01:26`); gliding between platforms `01:27–01:28`); lying flat on deck with `FACE_SLEEP` after crash `01:29`); landing upright holding glider with `FACE_HAPPY` `01:30–01:31`).
  - *VO:* "If wings wouldn't work, I needed something better. For the next few weeks, I secretly collected materials. I used enormous leaves to make a parachute, tied them together with strong vines, and tested it by jumping between smaller branches. After several failed attempts, I finally managed to make one that actually worked."
- **01:32–01:40 | Scene 17:** Protagonist looking worried `01:32–01:33`); high-angle shot of lower trunk vanishing into clouds `01:34`); Protagonist holding head in distress `01:35–01:37`); high-angle shot looking down wooden shaft `01:38–01:40`).
  - *VO:* "But there was still a problem, the ground was so far below the clouds that the journey could take hours, maybe even days. I had no idea what I would find down there or whether I would ever make it back."
- **01:41–01:46 | Scene 18:** Top-down slow zoom-out on the blue woven bag on the wooden floor containing coiled brown rope, water bottle, green apple, and small knife.
  - *VO:* "So, I packed a bag with fruit, water, rope, and a few tools. I even brought a small knife in case I needed to cut through plants or vines."
- **01:47–01:52 | Scene 19:** OTS shot of Best Friend `FACE_SCREAM`/pleading) clasping hands together `01:47–01:50`), reverse shot of Protagonist `FACE_NEUTRAL`) standing firm `01:51–01:52`).
  - *VO:* "When my best friend discovered what I was planning, he begged me not to go. 'What if there's nothing down there?' he asked. 'Then I'll finally know,' I replied."

### ACT III: THE LEAP & THE APOCALYPTIC TWIST (01:53 – 02:46.4)

- **01:53–02:10 | Scene 20:** Rear shot of Protagonist wearing blue backpack at the edge of the highest wooden beam `01:53–01:55`); front high-angle shot on beam `01:56–01:59`); montage of NPC walking on rope bridge `02:00–02:01`), 2 kids on deck `02:02`), and campfire burning `02:03–02:04`); close-up of Protagonist tightening backpack strap `02:05–02:09`); close-up of feet stepping off the ledge `02:10`).
  - *VO:* "The next morning, I climbed to the highest branch in the treehouse. The wind was strong, and the wooden branch creaked beneath my feet. For the last time, I looked back down. People were walking across the bridges, children were playing near the gardens and smoke rose from the cooking fires. Nobody knew I was about to leave everything behind. I tightened the straps on my parachute, took a deep breath and stepped off the branch."
- **02:11–02:22 | Scene 21:** Protagonist `FACE_SCREAM`) tumbling rapidly through air and clouds `02:11–02:16`); low-angle POV of treehouse vanishing into white fog above `02:17–02:18`); close-up pulling vertical wooden cord on chest `02:19`); medium-wide shot hanging under deployed leaf glider with `FACE_HAPPY` `02:20–02:22`).
  - *VO:* "For a moment, I thought I had made the biggest mistake of my life. I fell through the air as the clouds rushed past my face. The wind pulled at my clothes and the treehouse slowly disappeared above me. Then I pulled the cord. My parachute opened and suddenly I was floating."
- **02:22.5–02:30 | Scene 22:** Drifting inside thick white cloud fog `02:22.5–02:25`); close-up biting red apple `02:26`); close-up of blue bag on back `02:27`); close-up looking around thoughtfully `02:28–02:30`).
  - *VO:* "For hours I drifted downward through thick clouds. I couldn't see anything so I ate some fruit and held tightly onto my bag, wondering what kind of world could be hidden beneath us."
- **02:30.5–02:46.4 | Scene 23:** Clouds clear to blue sky as Protagonist smiles `02:30.5–02:33`), then switches to `FACE_GLAREFACE_SCREAM` looking down `02:33.5–02:36`); wide high-angle shot of dark ruined city with fires and smoke `02:36.5–02:38`); landing on dark ground and walking up to the back of a dark warning sign `02:38.5–02:40`); low-angle close-up of Protagonist staring at sign in horror `02:40.5–02:43`); flashback wide shot of bright Giant Treehouse `02:43.5–02:44.5`); final jump-cut to Protagonist `FACE_SCREAM`) in front of burning barrels holding red `"SUBCRIBE"` sign `02:45.0–02:46.4`).
  - *VO:* "Finally, the clouds began to clear down and what I saw made me realize why nobody had ever been allowed to return to the ground. The entire world below was dead. And when I landed, I saw an old warning sign. It revealed that a deadly virus had wiped out humanity, except for the people saved in our treehouse. Subscribe to save me."
