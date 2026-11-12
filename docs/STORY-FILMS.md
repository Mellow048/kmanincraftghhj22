# Story films — when the voice is the clock

A base film is 20 seconds and its shots are typed by hand: `at: 3.4, dur: 4.8`. That does not survive a
three-minute narrated film with 85 cuts. For those, the narration decides when everything happens.

    narration.md  →  recorded clips  →  timing.json  →  storyScene  →  captions  →  sound.json  →  mix.mp3

Any topic can use this. `Topics/InThisTown` is the first that does. Start a film of a topic from the topic's own
starter, which is already wired to all of it:

```bash
npm run new -- "In This Town, Nobody Rang the Bell" --topic in-this-town
```

## 1. The script: `src/videos/<film>/narration.md`

Inside a ```` ```narration ```` block:

```
# clip 01-hook
[1.me]    In this town,
[1.eggs]  every kid got a monster egg on their tenth birthday.
```

- A `[cue]` line is **one shot**: the words heard while that picture is on screen. Cue ids are unique.
  By convention the number before the dot is the scene.
- A `# clip <name>` line starts one recording. Keep a clip to a paragraph or two.

## 2. The voice and the timing: `scripts/narration.py`

```bash
python3 scripts/narration.py clips <film>              # prints each clip's text and where to save it
python3 scripts/narration.py build <film> --estimate   # no audio yet: time the words from the target pace
python3 scripts/narration.py build <film>              # measure the recordings
```

Record each clip to `public/audio/<film>/raw/<clip>.mp3`. `build` then:

1. trims the silence off both ends of every clip and speeds the voice up to the target pace
   (`--wpm`, default 255; or a fixed `--tempo`);
2. joins the clips into `public/audio/<film>/narration.mp3`;
3. finds when each word is said (forced alignment with `pocketsphinx`; without it, an estimate by syllables,
   and the tool says which it used);
4. writes `src/videos/<film>/timing.json`: every word with its start and end, and every cue with the frame it
   cuts in on, a hair before its first word.

Needs Python 3.9+, `numpy`, ffmpeg (or `pip install imageio-ffmpeg`), and `pip install pocketsphinx` for word-accurate
timing. Rendering needs none of these: the outputs are committed.

**Change a word → run `build` again.** Every cut and every caption moves with it. Never edit `timing.json` by hand.

## 3. The scenes: `storyScene`

```tsx
import { cam, storyScene } from "../../engine";
import { Hero, timing } from "./kit"; // the film's cast and helpers. kit.tsx loads timing.json once, for every scene

export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "The hook",
  shots: [
    {
      cue: "1.me",
      ...cam.push({ on: [0, 1.4, 0], dist: 3, to: 2.4, yaw: 12 }),
      zone: "town",
      note: "Meet the teller before the town: one kid, eye level, a slow push in.",
      stage: (t) => <Hero position={[0, 0, 0]} face="neutral" />,
    },
    // …one object per script line, in script order
  ],
});
```

- `cue` ties the shot to a script line. Its length comes from the voice. There is no `at` or `dur`.
- The camera is a `cam.*` recipe (see `Topics/InThisTown/SHOTS.md`) or the usual `from`/`to`/`target` fields,
  written as plain `[x, y, z]` arrays: the lint reads the file as text and does not follow a helper call.
- `stage(t, { dur, p })` returns who and what is in the shot. `t` is seconds since the cut, `p` runs 0→1. It is a
  plain function: no hooks in it. For a straight walk use `stride(a, b, p)`.
- `look` changes the lighting preset for that shot. `zone` picks the part of the world to draw.
- Shots in a scene must follow the script line by line. `storyScene` throws if one is skipped.

To make something happen **on a word**, ask the timing when the word is said. This is how an item lands in the bag as
it is named, and how the egg jumps on each "tap":

```tsx
const BREAD = wordAt("12.pack", "bread");          // seconds into that shot
stage: (t) => (pop(t, BREAD) > 0 ? <Bread scale={pop(t, BREAD)} /> : null)
```

`wordAt`, `pop`, `ramp`, `jolt` and the rest come from the topic's pack (`Topics/InThisTown/staging.ts`,
catalogue in `Topics/InThisTown/PACK.md`). A film's `kit.tsx` passes the pack on and adds one line of its own,
`export const wordAt = wordClock(timing);`, so a scene imports everything from `"./kit"`.

## 4. The world: zones

```tsx
export const World = () => (
  <>
    <Zone name="town">…</Zone>
    <Zone name="bedroom">…</Zone>
  </>
);
```

A shot with `zone: "bedroom"` draws only that zone, lights included. `zone: "town+lake"` draws two. A shot with no
`zone` draws everything.

With an outdoor look (`overworld-day`, `overworld-night`) the sun follows the shot's subject, so shadows work
anywhere on a large map.

## 5. The film

```tsx
export const film = defineFilm({
  id: "in-this-town-same-face",
  title: "…",
  topic: "in-this-town",
  cut: "short",
  look: "overworld-day",
  audio: { src: "audio/in-this-town-same-face/mix.mp3" },
  captions: { words: timing.words, y: 0.72 },
  World,
  scenes: [scene1, scene2 /* … */],
});
```

`audio` plays one file for the whole film. While the film is being shot that is the voice,
`audio/<film>/narration.mp3`. A finished film plays the mix (section 6).

`captions` puts one word on screen at a time, cut to the voice. It is drawn inside the 3D canvas from a built-in
pixel font, so it needs no font file and no HTML layer. Options: `y` (0 top … 1 bottom, default 0.72), `size`,
`letterCase`.

## 6. The sound: `scripts/sound.py`

The last step, when every shot exists. Music, the air of each place and the sound effects are **made in Python**:
computed with numpy from a seed, nothing downloaded or sampled.

```bash
python3 scripts/sound.py list            # every mood, bed and effect, one line each
python3 scripts/sound.py draft <film>    # a first src/videos/<film>/sound.json
python3 scripts/sound.py build <film>    # sound.json + narration.mp3 → public/audio/<film>/mix.mp3, and a report
```

`sound.json`, the sound sheet, names times the way a scene does, by cue and by word, so rebuilding the narration
moves every sound with it:

```json
{ "cue": "3.hmm", "word": "hmm", "sfx": "pop", "why": "The first HMM bubble. Every bubble in the film pops." }
```

`build` mixes the sheet under the voice, measures the result (is any word covered, is any effect lost under the
music, how loud is the file) and writes `sound.lock.json`, which records what the mix was built from. Then
`film.tsx` plays `audio/<film>/mix.mp3`.

How to write a sheet, what each level means and what the limits are: the topic's own page,
`Topics/InThisTown/SOUND.md`. A topic turns the sound rule on with `sound.required` in its `topic.json`.

Needs Python 3.9+, `numpy` and ffmpeg (or `pip install imageio-ffmpeg`). Rendering needs none of it.

## 7. What `npm run check` verifies for a story film

- every script line has exactly one shot, in order, and every shot has a note, a move and a stage;
- `timing.json` matches the script (if not: rebuild) and says whether it was measured or estimated;
- length, shot lengths, pace and word count against the topic's `topic.json`, or against one of its named cuts
  if the film says `cut: "<name>"` (for example `cut: "short"`, the one-to-two-minute In This Town film);
- the topic's floor (`hardMinSeconds`, `hardMinWords`): a film under it is reported while it is a draft, and
  fails once its voice is recorded or its last line has a shot;
- the first and last lines the topic asks for;
- the sound, if the topic requires it: a sheet, a mix built from the script, timing and sheet **as they are now**,
  `film.tsx` playing that mix, and the mix inside the topic's limits (music sections, effects a minute, the voice
  clear of everything else, loudness). It reads `sound.lock.json` and compares file hashes, so it needs no Python;
- the usual: no 2D overlays in scenes, deterministic code, atmosphere and lights in the world.

And for a film that declares **no** topic: it must not open the way a topic opens. A base film whose title or
narration begins "In this town" fails, with the command that starts it again as a topic film.

## 8. Review: one still per shot

Ninety shots are ninety pictures. Look at every one.

```bash
npm run shots -- <film>                     # every shot, at its middle → out/shots/<film>/NN-cue.jpg
npm run shots -- <film> --only 3.,14.       # only scenes 3 and 14
npm run shots -- <film> --at 0.1,0.9        # two stills a shot: where the move starts and ends
```

It bundles once and reuses one browser, so a still costs about four seconds instead of twenty. Tile the stills into
a contact sheet and read it like a comic. For each shot ask: is the noun of the line in the picture, can I see a
face, is anything cut off by the edge, would I know which act this is from the colour alone?

A film still being built is fine: shots that do not exist yet are skipped, and `npm run check` reports
`IN PROGRESS — 24 of 93`.

The first film went through four passes of this. What the stills caught, so the next film can skip the mistakes:

| Seen in the stills | Cause | Fix |
|---|---|---|
| A dragon sitting on the hero's head like a hat | Background thing directly behind and above a close subject | Move it to the side of the frame, or much further back |
| Two people both cut off by the edges | A 9:16 frame is 23° wide. Side by side does not fit | Stack them: one nearer and lower, one further and higher. See `Topics/InThisTown/SHOTS.md` |
| The back of a head filling the frame | Over-the-shoulder with the shoulder on the lens axis | Put the near person at the edge, or raise the camera and look down |
| A face that is a black square at night | Night look lights the top of things, not the front | A fill light on the camera side, or a torch in a hand |
| Glow that turns the whole frame white | Several additive glows and a point light on one small object | One glow; stand the light a metre off the thing |
| Worried eyes that look like a chequerboard | Dark brow pixels touching dark pupils on an 8×8 face | The story faces use a soft brow |

## 9. Rendering a long film

The render policy in `AGENTS.md` applies. A three-minute film is 5,300 frames; software WebGL manages about one
frame a second at half size on two cores, so budget an hour and more.

```bash
npx remotion render src/index.ts <film> renders/<film>-preview-540p.mp4 --scale=0.5 --crf=25   # a review copy
```

For the real thing use the **Render short** workflow on GitHub. It splits the film into twenty frame ranges
(`scripts/render-plan.mjs`), renders each on its own runner, and joins them: the whole film in the time one
range takes.

```bash
gh workflow run render.yml --ref <branch> -f composition=<film> -f commit_to=renders/<film>.mp4
```

`scale` must be `1`, `0.75`, `0.5` or `0.25`. Remotion refuses a scale that does not give whole pixels (0.667 does not).
The full-quality MP4 goes to the repo's Releases; `commit_to` also puts a copy of at most 45 MB on the branch.
