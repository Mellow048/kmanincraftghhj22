# Reference: "In This Town, Everyone Gets a Robot at 18"

**Open this one for a fight.** It is the owner's own outline (a kid whose robot is only a head, which turns out to
be a suit; an old man in the forest with the same suit; a girl with a shield robot), and it took three renders. The
first two fights were rejected. The third he scored himself:

> "now thats MUCH better! 8.8/10 fight scene great job lad" … "so other agents can see how to make a good fight
> scenes!" (the owner, 2026-11-13)

| File | What it is |
|---|---|
| `in-this-town-robot-at-18.mp4` | **The film as delivered**: 1080×1920, 3:25, full sound. A copy of `renders/in-this-town-robot-at-18.mp4` |
| `fight-2m03-to-2m42-five-frames-a-second.jpg` | **The whole fight, five frames a second**, read left to right, top to bottom. An agent cannot watch a video: this is the nearest thing. Read it first |
| `contact-sheet-every-2-seconds.jpg` | The whole film, one frame every two seconds |
| `shot-log.md` | Every shot on one page. A row whose cue ends `+1.3s` is a cut inside a line (see below) |
| `source/` | A **snapshot** of the source. The fight is `source/scene6.tsx`; its body language and effects are `source/fight.tsx`; the girl from the bush is the `14.bush` shots of `source/scene7.tsx` |

The film that renders lives in `src/videos/in-this-town-robot-at-18/`.

**What is and is not a model here.** The fight (beat 6) and Nora's entrance (start of beat 7) are what he approved
and scored. Beats 1 to 5 still have their first staging; he asked for more motion "throughout" after the first
render and that part was not redone, so do not copy how those five beats move. No agent has listened to the mix.

## What he rejected, twice, in his words

1. First render: the fight was a few held poses and too short; the girl "popped" into place ("that same problem on
   point A to point B again"); the ending went flat straight into "like and sub".
2. Second render, after the fight had been lengthened and checked on stills:
   - "it's like I'm watching a png fight another png". Upright bodies sliding about with a stock arm pose.
   - "dude said duck but run towards him". The picture said the opposite of the line.
   - "they aren't even doing a flying pose"; "that air fight was so hard to watch". He named *Superpower at 18,
     part 2* as the standard.
   - "how did the main character even know Nora followed him". A flashback the teller could not have seen. He had
     it removed: she only jumps out of the bush.
   - "the visuals also degraded". The delivery copy had been shrunk to 720 wide to fit a size cap.

**Stills did not catch any of this.** Every frame of the second fight looked fine on a contact sheet. A fight is
judged in motion, so it has to be designed for motion: the list below is what that means.

## What made the third fight work

1. **Bodies are posed joint by joint, never by a stock animation.** `fight.tsx` has a pose builder,
   `P({ pitch, roll, yaw, y, head, torso, aR, aL, R: [hip, knee, splay], L, air })`, and the avatar takes it through
   a `pose` prop (`src/engine/MinecraftAvatar.tsx`). Each fighter has a small library of **named** poses: the old
   man's `READY`, `HIGH`, `CHOPPED`, `SWEEP0`, `SWEEP1`, `THRUST`, `LANDED`; the teller's `DUCKED`, `TUCKED`,
   `BENT`, `PINNED`, `STRUCK`. A walk cycle with an arm out is what read as a "png".
2. **A move is a wind-up, a hit and a result, and the hit arrives fast.** `keys(t, [[time, pose, how]…])` runs
   through poses; `snap` gets to the hit pose in two frames, `out` settles. Never ease into a blow.
3. **Freeze on the hit, then let go.** `hold(t, at, len)` stops the action for 0.08 to 0.12 s on contact, with a
   `Flash`, an `Arc` for the blade's path, `Debris`, and an `impacts` kick on the camera. `slow(t, a, b, rate)` is
   the slow motion on "Duck".
4. **Cut inside the line.** A shot may give `cut: <seconds into the line>` and share its cue with the shot before
   it (`src/engine/story.tsx`; `scripts/check-story-film.mjs` allows it). 13 lines of script became 30 shots, and
   the median fight shot is about 1.2 s. Cut on the wind-up, land the hit in the new angle.
5. **The picture does what the line says, on the word.** After "Duck" he is flat on the ground and the blade goes
   over him into a tree. Use `wordAt(cue, word)` minus the shot's `cut`. One rule kept the whole fight readable:
   the old man is always on the right coming left, the teller is on the left going left. He never takes a step
   towards the man attacking him.
6. **Every blow breaks something.** A tree is cut and falls, a chop goes into the ground, the blade sticks in a
   trunk, the fall ends in a crater. Somebody always ends a shot somewhere new, and you see them get there.
7. **Flying is a pose and a speed.** `Flyer` takes a hips position and a pose; `soar(t, bank)` is flat and
   head-first, `flail` is the one who is bad at it, `rocket`, `tumble`. Speed has to be measured against
   something: `SkyRun` scrolls treetops and clouds under them at 24 m/s, with jet trails and streaks, and the
   camera flies **with** them (`from`/`to`/`target`/`targetTo`, `ease: "linear"`, because a camera that eases
   cannot stay on a flyer who does not).
8. **Change the angle every shot**: over a shoulder, low and flat, from above, from in front looking back, from
   the ground looking up, falling with him (`roll`).
9. **Give it light.** The second fight was a dark storm. This one is a low sun (`overworld-sunset` in
   `src/engine/Look.tsx`), so every pose is a clear shape against orange.
10. **Someone arrives by moving.** Nora comes over the top of the bush in one leap with leaves flying, lands, runs
    at the camera, slides in. Nothing explains how she got to the forest, and nothing needs to.

## What the stills of the third fight did catch

- **A phone frame is narrow.** At fov 44 the picture is about 0.45 × the camera distance wide. Two fighters 3.3 m
  apart with the camera 5 m back were both outside the frame for half a second. Keep duellists about 1.9 m apart
  and the camera 6 to 7 m back, or put one behind the other.
- **A raised arm near the camera is a white slab over the other actor.** Lower it or move the camera.
- **A close shot needs the face.** A look-up from behind showed the back of a helmet; the camera went round.
- Take three to five stills **inside each action shot** (`stills.yml` with `frames=` and `commit_review=true`),
  not one for each shot. Then delete `review/` before the delivery.

## Other things this film settled

- **The ending** he asked for: a reveal ("No way. That is the same robot as his."), one second of silence
  (`# clip <name> wait 1` in `narration.md`), then the subscribe line.
- **A girl has to look like one.** The first Nora was the teller in another colour, and he rejected her. See
  `Nora` and `LongHair` in `source/kit.tsx`.
- **Full picture quality.** `render.yml` now keeps 1080 wide when the size budget is 3000 kb/s or more: run it
  with `commit_max_mb=95`.
- **Fight lines and the voice.** Speech generation refused long violent passages. Short clips and soft verbs went
  through ("tried again", "cut it in two", "bumped me out of the sky").
- **A changed script means a hand-edited sound sheet.** Never run `sound.py draft` twice: it overwrites.

## Its shape

99 shots, 833 words, 3:25.1 (205.1 s), 244 words a minute.

| # | Beat | Starts | Seconds | Words | Shots |
|---|---|---|---|---|---|
| 1 | A robot at eighteen | 0:00.0 | 21.5 | 97 | 8 |
| 2 | Just a head | 0:21.5 | 37.4 | 155 | 14 |
| 3 | Put him down | 0:58.9 | 21.8 | 91 | 10 |
| 4 | It was a suit | 1:20.7 | 23.0 | 95 | 10 |
| 5 | The forest | 1:43.7 | 19.8 | 77 | 9 |
| 6 | The fight | 2:03.5 | 38.9 | 147 | 30 |
| 7 | Nora | 2:42.3 | 42.8 | 171 | 18 |

- Shots: the median holds 1.97 s, the shortest 0.58 s, the longest 4.47 s. 9 are under a second and 18 are over three. About 8.4 words to a picture.
- Camera: 84 `cam.push`, 5 `cam.truck`, 5 set by hand, 3 `cam.orbit`, 2 `cam.top`.
- Places: village 24, living 5, class+classN 1, class+classS 4, room 10, forest 45, sky 10 shots.

The script has 81 lines; 18 more shots are cuts inside a line, all in beats 6 and 7. It is an **extended cut**
(`cut: "extended"` in `film.tsx`).

## Its sound, measured (`source/sound.lock.json`)

Music 17.5 dB under the voice, beds 27.2 dB under. 208 effects, 61 a minute, 40 kinds; none buried. The voice is
14.8 dB over everything else (median), 4.3 dB at the worst half second. In the fight every effect is placed by
`offset` from the start of its line, at the time of the blow in `scene6.tsx`, not on a word.
