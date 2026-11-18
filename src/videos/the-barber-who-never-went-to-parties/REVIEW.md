# Review: The Barber Who Never Went to Parties

Reviewed 2026-11-18 against `Topics/Recreation/README.md` (the eight rules and the seven scenes). The owner did not
review the script or the stills ("go i wont review it, im busy"), so this page is the only review the film has had.

| | |
|---|---|
| Premise | A kid skips every party in town for a year to learn to cut hair in his garage, and the two friends who called him weird fall through his shop door an hour before a party with the worst hair in town. |
| Length | 97.1 s, 43 cues, 85 pictures, none over 3 seconds. 206 words: about half the film has no words over it |
| Narration | `narration.md` (26 clips cut from 8 takes by `scripts/split-takes.py`) |
| Storyboard | `STORYBOARD.md`, written from the film's files by `scripts/storyboard.py` |
| Sound | `sound.json`: 21 music sections, 13 beds, 197 entries (255 sounds), each with its reason |
| Render | `renders/the-barber-who-never-went-to-parties.mp4` (1080x1920, 30 fps) |

## Against the rules of the topic

| Rule | Held? |
|---|---|
| 1. Real life, in blocks | Yes: a house, a street, a television, a garage, a barbershop. Nothing from the game |
| 2. Our own lines | Yes. Only "Training." and "HUS HUS HUS!" are the meme's. None of the lines rejected in the first draft are used |
| 3. The main thing on frame one | Yes: frame one is the worst hair in town in a barber chair, the scissors a blur behind it, the chant, and HE NEVER WENT TO A SINGLE PARTY in blocks. The finished head is on screen at 1.1 s |
| 4. The hook asks, the last scene answers | "BRO. HOW?!" at 1.9 s, a breath in, the rewind. The same pictures from the same cameras at 86 s, and then "Training." |
| 5. He never finds it funny | The narrator states facts: "Dad wore a hat until spring." |
| 6. HUS is breath | One snip of the scissors under every HUS, four times in the film |
| 7. The friends need the skill | "THE PARTY STARTS IN AN HOUR, AND LOOK AT HIM!" |
| 8. The last sound is the chant | Yes, on the mop, in a cape, in the shut shop |

The chant was sped up on the owner's word (2026-11-18): each chant plays at 1.7 or 1.8 times its recorded speed, six
HUS in about 0.9 seconds. That is set by `speed` in `takes.json`; a rebuild keeps it.

## Planted and paid

"THAT'S FIXABLE!" (to Dad, then to my own fringe) → "PLEASE! IS THIS FIXABLE?!". "YOU'RE BEING WEIRD AGAIN!" → "WAIT.
IT'S THE WEIRD ONE!". Dad's hat → Dad takes it off and sits back down. The mop → the last picture. The hair of frame
one → it is the big friend's, and the hook is the last scene seen early.

## What the passes on stills changed

- **Pass 1, scenes 1 and 7:** the shop was blown out white (lights at 16 and 34 under the shaders, a white cape). Me
  beside the chair was cut off by the tall frame: the heads are now stacked, me on a crate straight behind.
- **Pass 2, scenes 2 to 4:** every interior and the party house bloomed to white. Lamps went from 30 to about 6, the
  television picture and the bulbs to a third of their glow.
- **Pass 3, scenes 5 and 6:** the garage bulb hung straight over the mop and burnt three close-ups white: it moved to
  one side. The spring shot looked at the inside of a wall. HELP WANTED could not be read (dark letters behind
  glass): white on blue, outside the glass. The queue was hidden by its first person: the camera moved to the street.
  The counter over the door and two plates were cropped by the top of the frame.
- **Pass 4:** the door that shuts on the party was a black frame from inside the hall: it is now seen from the path,
  over the two friends' shoulders. "Two blank faces" had one face half out of the frame.

## Remaining weaknesses

1. **Nobody has listened to it.** The mix is right by the numbers (music 18.6 dB under the voice, the voice 13.3 dB
   over everything else, -15.7 LUFS) and that is all that is known. The moods `party` and `grind` and the effects
   `snip`, `rewind`, `clippers` and `hair` were written for this film and have never been heard by anybody.
2. **One actor plays everybody.** Only `voice-03` could be recorded. The two friends are the same voice shifted up 3
   and down 3.5 semitones. They will sound related. Two real voices need the owner to pick them.
3. **The sped-up chant is a recording played fast**, with its pitch kept. It may sound processed.
4. **Some pictures are plain.** The scissors held up "like a sword" read as a dark stick with a glint beside them. The
   clippers on the floor are small. In the pat-the-chair picture the chair's back hides half of me. The shop sign is
   cropped in the counter shot.
5. **Captions sit over mouths** in several close-ups, as in every film of this pipeline.
6. **The topic is provisional.** `Topics/Recreation/` was made for this one script, without the owner's reference
   videos for it. Its rules are a first guess.
