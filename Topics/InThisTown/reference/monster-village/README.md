# Reference: "In This Town, I Live in a Monster Village" (part one)

**Approved by the owner** ("i liked the superhero and this one"), and kept here at his request with its source, so
the next agent can build like it. A boy is the only human in a village of monsters who are his family; the one
player who watches him, Mo, turns out to have been guarding them all along.

| File | What it is |
|---|---|
| `in-this-town-monster-village.mp4` | **The film as delivered**: 720×1280, 3:41, 95 shots, full sound. A copy of `renders/in-this-town-monster-village.mp4` |
| `contact-sheet-every-5-seconds.jpg` | One frame every five seconds, on one sheet. An agent cannot watch a video: read this first |
| `shot-log.md` | Every shot on one page: start, length, words, place, camera, and why this picture |
| `source/` | A **snapshot** of the source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene10.tsx`, `film.tsx`, `sound.json` |

The film that renders lives in `src/videos/in-this-town-monster-village/`. `source/` is a copy to read; it is not
compiled and nothing imports it.

## What it is good for

- **Monsters as people.** Every monster comes from the pack (`Topics/InThisTown/monsters.tsx`) and is given a name
  and one habit in `source/kit.tsx`: `Mum` (zombie, pink bow), `Dad` (skeleton whose arm comes off), `Hiss` (the
  creeper who wants a hug), `Postman` (enderman), `Bus` (a slime the children ride). `Folk` and `Crowd` fill a
  street with the rest.
- **The extended cut.** The owner asked for a longer ending than the long cut holds; `cuts.extended` in
  `topic.json` was added for this film (`cut: "extended"` in `source/film.tsx`). Use it only when he asks.
- **Night.** Every face at night has a `Fill` light on the camera's side; speech bubbles at night take `dark`.
  Light iron blows out at night: use `#a9b3c0`.
- **A plant that pays off twice.** Mo's bread ("Zombies do not eat bread") and dad's loose arm both come back in
  the ending, and again in part two.

## What was hard

- Version one ended too soon. Version two added the ambush, the army from the forest and Mo staying behind
  (`source/scene9.tsx`, `source/scene10.tsx`).
- The well and its posts near x ≈ −5 block cameras that look along the street; keep the yaw 30° off the street.
- The market hall's posts and roof block cameras under it.
- Subtitles lagged where the aligner did not know a word; `SAY` in `scripts/narration.py` gives it the sounds.
