# Narration — In This Town, Nobody Looked at the Moon

**Status: APPROVED and RECORDED.** The owner approved this script on 2026-11-11 ("yes go i trust you on making
it"). The six clips are recorded (`public/audio/in-this-town-nobody-looked-at-the-moon/raw/`), the film is cut to
them (`timing.json`), and the sound is mixed (`sound.json`). Changing a word now means recording that clip again,
rebuilding the timing, and checking every shot and every effect that hangs on the words after it.

**Delivered 2026-11-12** as render 24: 1080×1920, 3351 frames, 1:51.7. The master is the release asset
(`render-24`, 80 MB); `renders/in-this-town-nobody-looked-at-the-moon.mp4` is a 720×1280 copy that fits in the
repository, and `renders/in-this-town-nobody-looked-at-the-moon-shots.jpg` is one frame of it per shot. Measured on
the delivered file: the sound sits 0.0 ms from `mix.mp3`, −15.0 LUFS, true peak −1.2 dB. **Nobody has listened to
the sound: an agent cannot.** The owner had not yet answered on the finished film when this was written.

This is a remake of *Never Look at the Moon*, the 19.6-second film another agent made
(`Topics/InThisTown/reference/moon-20-seconds/`). The owner: "it wasnt really what i wanted … maybe put it in a
village where you woke up with the moon and stuff". So: the same idea, told as a real film of this topic, in the
village of the pack.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word. The reference for how a
finished one is built is `src/videos/in-this-town-same-face/`. Its shape is copied here; nothing of its story is.

**The premise, in four sentences.** In this town, we woke up with the moon, and nobody was allowed to look at it.
Nobody would explain the rule; the old bell ringer only knew "never let it catch you looking". I looked at it in
the water of the well, and it looked back. The moon was an eye, and its stare was the only thing holding the
scarecrows in our fields still: the rule was there so it would never look away, and we stayed awake in case it did.

**One sentence:** A kid in a village that lives by night and never looks up sneaks a look at the moon in the well,
and learns that the moon is an eye, and that every second it spends looking at him, the scarecrows walk.

**What is kept from the first version.** Its six lines were: nobody looks at the moon; nobody tells me why; tonight
I peek; it is looking for something; it finds my window; now it knows where I sleep. All six are still here: the
rule (1.look), nobody knows why (2.rule), he peeks (10.lean), it is an eye and it looks (11.eye, 11.caught), and it
knows where he lives (14.knows, 14.blinks). What is new is everything that version had no room for: the town, the
tour, the reason, and the price.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun.
- Each `# clip` is one recording. Record it to `public/audio/in-this-town-nobody-looked-at-the-moon/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build in-this-town-nobody-looked-at-the-moon`.
- Only one person in the town speaks: the bell ringer, one line (5.know, 5.rule). The friend acts and says nothing.
- The teller never says what the scarecrows are. He only says what they do.

**Length.** 471 words in 63 lines: about 1:51 at the topic's pace. This is the short cut (`cut: "short"` in
`film.tsx`: 60–118 seconds, a failure over 120, 250–520 words), the same cut as Same Face (441 words, 1:45).

**This is a 14-beat cut of the topic's 18-beat sheet.** Kept: hook (1), mysteries (2), tour (3), itch (4), the
elder's rule (5), the decision with its planted question (6), one funny failure (7), one success (8), the friend
(9), the edge (10), the act (11), the wait (12), the reveal (13), the button (14). Dropped to fit two minutes: the
adults' sensible reasons, the tease, the price, the packing, and the friend's two lines of dialogue (she climbs off
the lid and turns her back). The scenes are numbered 1–14, not by the sheet's numbers.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| "We woke up with the moon" (1.wake); "Nobody knew why we stayed awake all night" (2.awake) | "We stayed awake in case it ever looked away" (13.awake) |
| "Nobody knew who kept putting scarecrows in our fields" (2.crows) | "Nobody had put them there" (13.never) |
| "Nothing ever came out of the forest" (3.forest) | "They had walked out of the forest, one blink at a time" (13.blink) |
| "The moonlight never came into town. It stayed out on the wheat, with the scarecrows" (3.light, 3.crows) | It comes into town (11.light); the wheat goes dark (12.dark); it goes back (13.back) |
| The well has a lid "so the moon could not get into the water" (3.lid, 3.water) | He looks at the moon in the water (8.down, 8.lid, 11.moon) |
| Everybody's eyes are on the ground (3.eyes, 3.bump) | Nobody sees him do it (8.nobody, 10.nobody). "Something was finally looking at me" (11.ground, 11.seen) |
| The hats (3.hats, 3.golem); the golem and its bucket (7.bucket) | He takes his hat off to look (10.hat), and hides under it to be forgotten (13.hat, 13.bored) |
| "Never let it catch you looking" (5.rule); "How could a moon catch anybody?" (6.plant) | "It rolled, slowly, and caught me looking" (11.caught) |
| "Then it blinked" (11.blink) | "One blink at a time" (13.blink); it blinks at his house (14.blinks); the last line (14.sub) |

Planted in the picture only, never in the words: in each wide shot of the fields one scarecrow stands a little
nearer than in the one before; and the iron golem walks its rounds between the town and the wheat.

**Sentences of six words or fewer** (they should carry the plot on their own): Even the iron golem wore one. · But
what was up there? · So I decided to look. · I saw one white edge. · Everybody knocked on it. · It took thirty
nights. · Nobody looked up. · Then it blinked. · It was an eye. · The scarecrows were walking. · Nobody had put them
there. · They were just a lot closer. · But it knows me now. · Subscribe before it blinks again.

**What was put to the owner with the draft, and how it was settled.** He answered all four with "yes go i trust
you on making it", so each was built as proposed:

1. The story: the village that wakes up with the moon.
2. The title: *In This Town, Nobody Looked at the Moon*. (His own phrase, "we woke up with the moon", is the
   first line instead.)
3. The length: 1:52, the short cut. A three-minute version would add the adults, a tease, the price and the packing.
4. The voice: `voice-00`, as in the other films of the topic.

**What was built for it, and where it lives.** In the pack, for any film (`Topics/InThisTown/PACK.md`, "Fields and
night"): a moon, moonlight that falls on one place, stars, wheat, scarecrows that stand and walk, the edge of a
forest, the wide straw hat, the bucket, the lid of the well, the lanterns, and the look `lantern-night`. In this
film's `kit.tsx` only, because they are this story: the eye in the moon (`MoonEye`), who stands where, and `skyAt()`,
which says for every shot what the moon is staring at. The whole film is at night: the town is warm lantern light,
the fields are cold moonlight, and the story is told by where the cold light is.

```narration
# clip 01-hook
[1.wake]     In this town, we woke up with the moon,
[1.look]     and nobody was allowed to look at it.
[2.rule]     Nobody knew who had made the rule.
[2.awake]    Nobody knew why we stayed awake all night.
[2.crows]    And nobody knew who kept putting scarecrows in our fields.

# clip 02-tour
[3.hats]     Everybody wore a straw hat as wide as a door.
[3.golem]    Even the iron golem wore one.
[3.eyes]     We kept our eyes on the ground,
[3.bump]     and bumped into each other all night.
[3.lid]      The well had a stone lid,
[3.water]    so the moon could not get into the water.
[3.light]    The moonlight never came into town. It stayed out on the wheat,
[3.crows]    with the scarecrows.
[3.forest]   And nothing ever came out of the forest.
[4.good]     It was a quiet life, and a good one.
[4.what]     But what was up there?

# clip 03-elder
[5.ask]      One evening, I asked the old bell ringer why.
[5.know]     She said, "All I know is this:
[5.rule]     never let it catch you looking."
[5.away]     Then she lowered her hat and walked away.
[6.plant]    Catch me? How could a moon catch anybody?
[6.decide]   So I decided to look.

# clip 04-attempts
[7.tip]      The very next night, I tipped my hat back.
[7.edge]     I saw one white edge.
[7.bucket]   And the iron golem dropped a bucket over my head.
[7.week]     I wore it for a week.
[7.knock]    Everybody knocked on it.
[8.down]     But nobody had ever said I could not look down.
[8.lid]      So every night, I pushed the lid of the well a little further.
[8.nobody]   Nobody saw me. Nobody was ever looking.
[8.nights]   It took thirty nights.
[9.friend]   On the last night, my best friend was sitting on the lid.
[9.off]      She climbed off without a word,
[9.back]     and turned her back.

# clip 05-edge
[10.gap]     The gap was just wide enough for a moon.
[10.town]    Behind me: hats, lanterns, open doors.
[10.nobody]  Nobody looked up.
[10.hat]     I took off my hat,
[10.stone]   put my hands on the cold stone,
[10.lean]    and leaned over.
[11.moon]    For a second, it was only a moon, shaking a little in the water.
[11.blink]   Then it blinked.
[11.eye]     It was an eye.
[11.caught]  It rolled, slowly, and caught me looking.
[11.up]      I looked up. I could not help it.
[11.ground]  In a town that only looked at the ground,
[11.seen]    something was finally looking at me.
[11.light]   And for the first time, the moonlight came into town.

# clip 06-reveal
[12.stay]    I could have stood in that light all night,
[12.dark]    if the dark wheat behind me had not begun to move.
[12.walk]    The scarecrows were walking.
[13.never]   Nobody had put them there.
[13.blink]   They had walked out of the forest, one blink at a time.
[13.held]    The moon had been holding them still, just by staring.
[13.awake]   We stayed awake in case it ever looked away.
[13.hat]     I pulled my hat over my face
[13.bored]   and waited for the moon to get bored.
[13.back]    When the light went back to the wheat, they stopped.
[13.closer]  They were just a lot closer.
[14.knows]   But it knows me now.
[14.blinks]  Every night, it finds my house and blinks.
[14.step]    And every night, they are one step closer to my door.
[14.sub]     Subscribe before it blinks again.
```
