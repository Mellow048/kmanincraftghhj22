# Draft: In This Town, I Have Never Seen My Mum's Face

A script waiting for the owner's yes (put to him 2026-11-16). **Nothing is built.**

- `narration.md`: the script, with its cues, plants and pay-offs.
- `timing.json`: the timing of the recorded voice at tempo 1.45 (52 shots, 413 words, 1:47).
- The voice is recorded: `public/audio/in-this-town-i-have-never-seen-my-mums-face/raw/01-hook.mp3` … `09-sub.mp3`
  (`voice-03`), and the joined track is `narration.mp3` beside them. Do not record again unless a line changes; then
  record only that clip.

It is here and not in `src/videos/` because `npm run check` fails on a film folder with no `film.tsx`.

**When he says yes:** `mkdir src/videos/in-this-town-i-have-never-seen-my-mums-face`, move `narration.md` and
`timing.json` into it, run `python scripts/narration.py build in-this-town-i-have-never-seen-my-mums-face --tempo 1.47`
(1.45 gives 233 words a minute; the topic asks for 235 or more), and build it on the model of
`Topics/InThisTown/reference/everyone-runs-away-from-me/`. The `Enderman` (`jaw` is the scream, `carry` holds a
block) and the `Pumpkin` are in the pack; the players can be `GunpowderPlayer`s with a pumpkin on.
