# Review: The Barber Who Never Went to Parties

Reviewed 2026-11-18 against `Topics/Recreation/README.md` (the eight rules and the seven scenes). The owner did not
review the script or the stills ("go i wont review it, im busy"), so this page is the only review the film has had.

| | |
|---|---|
| Premise | A kid skips every party in town for a year to learn to cut hair in his garage, and the two friends who called him weird fall through his shop door an hour before a party with the worst hair in town. |
| Length | **Second cut: 79.6 s**, 53 cues, 83 pictures, none over 2.2 seconds. 244 words (66 of them HUS) at 188 a minute. No stretch without a voice is over 1.9 s. The first cut was 97.1 s |
| Narration | `narration.md` (36 clips cut from 9 takes by `scripts/split-takes.py`), built at `--tempo 1.43` |
| Storyboard | `STORYBOARD.md`, written from the film's files by `scripts/storyboard.py` |
| Sound | `sound.json`: 22 music sections (six of them silence, 5.0 s in all), 13 beds, 238 entries (274 sounds), each with its reason |
| Render | `renders/the-barber-who-never-went-to-parties.mp4` (1080x1920, 30 fps) |

## The second cut (2026-11-18)

The owner on the first cut: "i love it but sometimes its good but sometimes its weak". His eight points, and what was done:

| He asked | Done |
|---|---|
| The retention is uneven | Every wait was cut: the longest stretch without a voice went from over 5 s to 1.9 s, and 17.5 s came out of the film with no line of the story removed. Seven slow pictures were dropped (Dad asleep on his own, the newspaper, the mop close-up, the rack of dummies, the clippers on the floor, the snapped comb, the CLOSED board) |
| HUS HUS HUS when we cut Dad's hair | `3.hus`: three HUS and three snips on Dad asleep, the stripe on the third. And `5.dadhus` when he sits back down in spring: three more, and this time it is right |
| HUS HUS HUS on every haircut in the shop | `6.hus`: nine HUS, three heads, a new cape for each three. `7.hus1`: the haircut of frame one now has its chant in scene 7 too |
| The second half is weak | Scenes 5 to 7 lost their waits and gained ten chants. From the montage (39 s) to the end, no picture is held over 1.6 s |
| The voice 1.1 times faster | `--tempo` 1.3 → 1.43 |
| Remove the long pauses | As above. What is left without words: the drawer and the scissors (1.9 s, three pictures), the last picture (1.7 s) |
| A montage of cutting and HUS HUS HUS | `5.m1` to `5.m6`, 4.6 s, nothing but the chant: the dog, the hedge, a dummy, a mop, six heads on one post getting better, and his own fringe, where the chant stops dead |
| The ending just cuts: they go to a party, he says no, then HUS | "YOU COMING?!" → his face, "No.", the music stops → two blank faces at the door → the mop in the chair, the scissors go up → six HUS, the last two run together → the finished mop held for 1.5 s under WHILE THEY'RE OUT PARTYING BTW, two clicks of the scissors and a last note. The line "I never went to a single party." is gone: "No." says it |

The render preflight on `main` (`npm run rehearse -- <film> --pre-render`) is newer than the first cut and stopped the
first render of this one: three clips had a word whose time was a guess, and the captions were on the old motion. Now
every word is measured (`"words": "take"` in `takes.json` hands over the times the aligner found in the whole take for
`02-how` and `18-help`, where it loses a word in the short clip) and `captions.motion` is `on-beat`.

The mp4 was checked on 80 frames, one a second: every chant, the montage, "No." and the last picture are in it.

`hero-no.mp3` ("No.") is the one new recording. Every new chant is cut from the two chant takes of the first cut.

## Against the rules of the topic

| Rule | Held? |
|---|---|
| 1. Real life, in blocks | Yes: a house, a street, a television, a garage, a barbershop. Nothing from the game |
| 2. Our own lines | Yes. Only "Training." and "HUS HUS HUS!" are the meme's. None of the lines rejected in the first draft are used |
| 3. The main thing on frame one | Yes: frame one is the worst hair in town in a barber chair, the scissors a blur behind it, the chant, and HE NEVER WENT TO A SINGLE PARTY in blocks. The finished head is on screen at 1.1 s |
| 4. The hook asks, the last scene answers | "BRO. HOW?!" at 1.8 s, a breath in, the rewind. The same pictures from the same cameras at 68 s, and then "Training." |
| 5. He never finds it funny | The narrator states facts: "Dad wore a hat until spring." |
| 6. HUS is breath | One snip of the scissors under every HUS. Fourteen chants in the second cut: every haircut on screen has one |
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

1. **Nobody has listened to it.** The mix is right by the numbers (music 18.7 dB under the voice, the voice 12.3 dB
   over everything else, -15.5 LUFS) and that is all that is known. The second cut has 206 effects a minute: it may
   be too busy to the ear, and the limiter works for 41% of the film. The moods `party` and `grind` and the effects
   `snip`, `rewind`, `clippers` and `hair` were written for this film and have never been heard by anybody.
2. **One actor plays everybody.** Only `voice-03` could be recorded. The two friends are the same voice shifted up 3
   and down 3.5 semitones. They will sound related. Two real voices need the owner to pick them.
3. **The sped-up chant is a recording played fast**, with its pitch kept. It may sound processed. All fourteen chants
   are cut from the same fourteen recorded HUS, so they sound alike. "No." is one short word slowed to 0.7 of its
   recorded speed so that it lands: it may sound flat.
4. **Some pictures are plain, and the fast ones are very fast.** The scissors held up "like a sword" read as a dark
   stick with a glint beside them. In the pat-the-chair picture the chair's back hides half of me. The shop sign is
   cropped in the counter shot. The montage pictures are 0.6 s each: the hedge's side parting and the dog's flat top
   are on screen for a quarter of a second. Two of the three heads in the shop chant look alike. The sparkle on the
   two friends' haircuts blooms into a white patch for a few frames.
5. **Captions sit over mouths** in several close-ups, as in every film of this pipeline.
6. **It is under the topic's first length** (97 s was inside 90–120; 80 s is not). The topic now says 75–120.
7. **The topic is provisional.** `Topics/Recreation/` was made for this one script, without the owner's reference
   videos for it. Its rules are a first guess.
