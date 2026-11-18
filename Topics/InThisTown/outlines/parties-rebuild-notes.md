# Why the first *Guy Who Never Went To Parties* render was a 1/10

Studied 2026-11-16 against `reference/same-face/` (the topic's reference film),
`reference/iron-golem/`, `reference/robot-at-18/`, `OWNER.md`, `SHOTS.md`, `RETENTION.md`,
and contact sheets of the delivered mp4. The user: "overall the video is a 1/10 ...
please study the references".

## The measurements

| | reference `same-face` | `iron-golem` | `robot-at-18` | **delivered film 6** |
|---|---|---|---|---|
| `look` on the shots | 35 day / 17 lava / 4 night / 1 warm-room | mixed | mixed | **75 of 76 are `overworld-night`** |
| median camera `dist` | 3.65 m | 5.70 m | 4.80 m | **2.20 m** |
| a 1.8 m person as % of frame height | 68% | 43% | 46% | **107% (overflows the frame)** |
| frames with mean luma < 45 | 8% | 8% | — | **30%** |
| frames with mean luma > 120 | 29% | 31% | — | **41%** (blown-out blank walls) |

So about **70% of the delivered film is either nearly black or a blank, blown-out surface**.
The approved films are 16–37%. That is the downgrade.

## The regressions, in the words of the house rules

1. **`OWNER.md` rule A — the premise is on screen in the first second.** Shot one is a dark street
   with a tiny figure and blue windows. Pause on frame 15 and a stranger cannot say what the story is.
   The reference opens on a wall of identical faces with the one different face in front of them.
2. **`SHOTS.md` §3.6 — "Fill the frame. A person is a medium shot unless the place is the point."**
   The film was shot as 76 macro close-ups. Faces are cut in half at the frame edge, hands and boards
   fill the whole screen, and there is no context. `SHOTS.md` §6 gives the numbers: a 9:16 frame
   at 40° is 23° across; at 2.2 m a person is bigger than the frame. Distances that worked in the
   references are 3.6–5.7 m.
3. **`OWNER.md` rule B — every scene has an environment shot, a travelling shot and an odd angle.**
   50 of 76 shots are `cam.push` at 1.2–2.4 m. There is no wide shot of the town, no shot that shows
   the place, and consecutive shots are interchangeable.
4. **Cameras inside walls.** `cam.push({on})` — `on` is the LOOK POINT, not the camera position
   (`src/engine/cam.ts` `around()`). Shots with `yaw` near 180 put the lens behind the north wall of
   a house (`1.home`, `3.every`) or behind the sealed north wall of the restaurant (`8.door`,
   `8.turned`, `10.sub`). Those frames are a flat blue/white wall. The sets were sealed on all four
   sides **and** had a ceiling, so even top-down shots filmed the ceiling.
5. **A whole film in one colour.** `SHOTS.md` §3.7 "One colour world per act"; the reference uses
   bright blue day, a warm lit night and lava-orange for three acts. Delivered film 6 used
   `overworld-night` for 75/76 shots. The village has four lamp posts; the approved night film
   (`nobody-looked-at-the-moon`) has lantern lines, lantern posts, glows and light pools over every
   part of the street.
6. **Pace.** 254 words a minute with no air between story steps. `OWNER.md` records the same fault
   being rejected on the iron golem film ("the video is too fast no time to digest even half a
   second") and the pace he approved: **about 235 wpm with a quarter to three quarters of a second
   of silence before each new step**. `narration.md` of film 6 literally says "About 255 words a
   minute, no gaps" — the opposite of his note.
7. **Stranded geometry.** Some shots and props still used origin coordinates while their `zone` was
   a set 400/500/600 m away (`1.cook`, `9.but`). They render a blank wall or nothing.

## What is kept

The script (668 words, 76 cues, every original reel beat, the mystery, the plants and payoffs),
the voice (Arena TTS `voice-04`), the music and the 121 sound effects. All of those passed
`npm run check`. The failure is entirely in the picture and the pace.

## The rebuild

- Two new `look` presets: `kitchen-day` (bright warm interior, follows the camera so it works on
  the offset sets) and reuse of `overworld-sunset` for the party town and `lava-shore` for the hot
  kitchen — three colour acts, all bright.
- Open the sets: no ceiling, no south wall, floor extended. A zone is exclusive, so the walls were
  never needed to hide the other zones; they only put the lens inside plaster.
- Rewrite all 76 camera recipes to the reference's distances, with an environment shot, a travelling
  shot and an odd angle in every scene, and `yaw` constrained so no lens ever sits behind a wall.
- Village lighting: lantern lines, posts, glows and warm light pools over the square.
- Pace: ~238 wpm with 0.3–0.4 s of air before each story step; rebuild timing and sound together.
- Verify from a fresh full render, one still per shot, against the reference contact sheet.

## What the second build actually changed

- **Three colour acts.** `overworld-sunset` for the town (27 shots), a new `kitchen-day` preset for the
  kitchens (29), `lava-shore` for the restaurant line (20). The night look is gone. `kitchen-day`
  follows the camera, so every kitchen shot is lit wherever it stands, and `film.tsx` carries
  `post.exposure 0.82` so the warm walls sit at the reference's exposure, not at white.
- **Framing rewritten twice.** First pass took every camera to the references' distances (median 3.5–10 m;
  a person 40–60% of the frame). Second pass, from the contact sheet, gave neighbouring shots different
  sizes, heights and moves, because 29 medium shots of a head in a kitchen is its own kind of flat.
- **Sets opened.** No ceilings, no south wall, floor extended: a zone is exclusive, so the walls were
  only ever in the way. Six `cam.top` shots remain, and the rest of the odd angles are high/low.
- **The town is populated.** Twelve villagers and three players stand in the square in `world.tsx`
  (not only inside a shot's own stage), and the square is strung with lantern lines, lantern posts,
  light pools and a warm key, so a party is visible behind any shot.
- **The teller is in the room.** The prop-only cues (`FILL_HOME`, `FILL_RESTAURANT`) get him from the
  world, so the film returns to him at least every third shot.
- **The fridge is one prop with three states** (closed / empty / full) owned by the world. Both fridge
  shots used to draw a second solid box over it and film a white wall.
- **The pace.** 242 wpm asked, 237 delivered, with 0.35 s of air before each story step. `narration.py`
  grew a per-line `rate` (`[6.chant rate 1.55]`) so a line can be said faster than the rest of its clip:
  the **"HUS HUS HUS" chant is time-compressed to ~2.1× natural speech**, and its on-screen bubbles
  fire three-to-a-second instead of one slow pulse.
- **Measured on the delivered mp4**: 0 frames dark or blown (reference: 8% dark, 29% bright); luma 125
  sunset / 110 kitchen / 102 lava against the references' 98–102.
