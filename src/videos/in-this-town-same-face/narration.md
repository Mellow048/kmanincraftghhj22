# Narration — In This Town, Everyone Had the Same Face Except Me

**Status: FINISHED. The script was approved by the owner ("yes good enough give me the tts"), recorded, and built on
the owner's word ("build"): 14 scenes, 57 shots, one per line below. The owner on the finished picture: "everything
is perfect top to bottom", "i like the assets". The owner then asked for background music and sound effects made in
Python. They are in: `sound.json`, 11 music sections (one of them silence), 14 beds, 141 effects. The owner has not yet said anything about
the sound.**

Rendered on GitHub (run 15, with sound): the full 1080×1920 file is in the release `render-15`;
`renders/in-this-town-same-face.mp4` is a 720×1280 copy that fits in the repository, and
`renders/in-this-town-same-face-shots.jpg` is one frame per shot. The picture is the picture of run 14, the one the
owner approved (release `render-14`, voice only): the two were compared frame by frame.

Recorded with `voice-00` (the Monster Egg voice) as six clips; built to 104.7 seconds (1:44.7) at 254 words a
minute, 57 shots, median shot 1.70 s. Nobody has listened to any of it: the agent cannot hear audio. The mix was
measured, and the numbers are in `sound.lock.json`. For the owner's ear: the voice, the three "hmm" at about 0:17,
0:31 and 0:46, and now the music and the effects.

This film is the topic's model (`Topics/InThisTown/README.md`). Its people, places and things were moved into the
topic's pack, so its `kit.tsx` now holds only what belongs to this story.

Topic: `Topics/InThisTown`. Read `Topics/InThisTown/SCRIPT.md` before changing a word.

**Length: one to two minutes, two minutes at most.** The owner asked for this after reading draft 1 (739 words,
about 2:54): "keep it short like 1 min to 2 minute max". It overrides the topic's 150–178 seconds for this film.
At 255 words a minute, two minutes is 510 words; this draft is 441.

**The premise, in four sentences.** In this town, everyone had the same face except me. Nobody would explain why I was
different, or why I must never climb the hill. I dug under it. On the other side were people with faces like mine,
burning a village: my town had always known what I was, and had hoped I would grow up to be something else.

**One sentence:** A boy raised by villagers tunnels past the one hill he is forbidden to climb to learn why he alone
has hands, and finds his own kind burning a village like the one that raised him.

- One teller, first person, past tense. Fast and plain: about 255 words a minute, no gaps.
- Each `[cue]` line is **one shot**: the words heard while that picture is on screen. Cut on the noun.
- Each `# clip` is one recording. Record it to `public/audio/in-this-town-same-face/raw/<clip>.mp3`,
  then run `python3 scripts/narration.py build in-this-town-same-face`.
- The villagers only say "hmm". The teller tells us what it meant. Only he, and the strangers, use words.

**This is a 14-beat cut of the topic's 18-beat sheet.** Kept: hook, mysteries, tour, itch, the elder's rule, the
decision with its planted question, one funny failure, one success, the friend, the edge, the act, the wait, the
reveal, the button. Dropped to fit two minutes: the adults' sensible reasons, the tease, the price, the packing, and
the friend's two lines of dialogue (he only fails to wave). The scenes are numbered 1–14, not by the sheet's numbers.

**How the length is enforced:** `film.tsx` says `cut: "short"`. `npm run check` then holds this film to `cuts.short`
in `Topics/InThisTown/topic.json` (60–118 seconds, a failure over 120, 250–520 words) in place of the topic's
150–178 seconds. The cut is described in `Topics/InThisTown/README.md`, "The short cut".

**Told to the owner with draft 2, and not objected to:**

1. The last line. The idea as pitched ended "Subscribe before I become one." The script ends on a wave instead
   (14.seen, 14.waved, "Subscribe before I wave back."), because the wave is planted three times. Going back to the
   pitched line means cutting 14.seen and 14.waved too.
2. The voice: `voice-00`, as in the Monster Egg film.

What is planted, and where it pays off:

| Planted | Pays off |
|---|---|
| "Nobody knew where I had come from" (2.from); the elder "had found me" (5.ask) | He came with the raiders (13.from) |
| The oldest house is burned black (2.black) | He learns who burned it (13.black) |
| Nobody uses a hand or a word (3.hands, 3.hmm) | The strangers have words and hands (11.words, 12.hands) |
| He can wave; nobody waves back (3.wave, 3.back, 9.wave) | A stranger waves at him (14.waved). The last line (14.sub) |
| The elder looks at his hands; "What did my hands have to do with a hill?" (5.stare, 6.plant) | "What all those hands were doing" (13.clear). They had always known (13.known) |
| The iron golem's flower (3.flowers, 7.flower) | Picture only: he still has it on the hill (14.sub) |
| "The air smelled like smoke" (10.smell) | The burning village (13.burn) |

```narration
# clip 01-hook
[1.face]     In this town, everyone had the same face
[1.me]       except me.
[2.from]     Nobody knew where I had come from.
[2.black]    Nobody would say why the oldest house was burned black.
[2.hill]     And nobody would tell me what was behind the hill.

# clip 02-tour
[3.nose]     Everyone had one long nose, one long eyebrow,
[3.arms]     and two arms they kept folded in their sleeves.
[3.hands]    I never saw one of them use a hand.
[3.hmm]      They never used words, either. They just said "hmm."
[3.golem]    An iron golem guarded the square
[3.flowers]  and gave flowers to the children.
[3.wave]     I was the only one who could wave hello.
[3.back]     Nobody ever waved back.
[4.good]     It was a good life, honestly.
[4.why]      But why was I different?

# clip 03-elder
[5.ask]      So I asked the oldest villager, the one who had found me.
[5.stare]    She looked at my hands for a long time,
[5.hmm]      and said "hmm" in a way I had never heard.
[5.rule]     It meant: never climb that hill.
[6.plant]    What did my hands have to do with a hill?
[6.decide]   I decided to go and see.

# clip 04-attempts
[7.walk]     The next morning, I just walked up the hill.
[7.half]     I got halfway.
[7.golem]    Then the iron golem tucked me under its arm, carried me home,
[7.flower]   and gave me a flower.
[7.laugh]    The whole town said "hmm" at me for a week.
[8.under]    So I went under the hill instead.
[8.night]    Every night, I dug under my bed,
[8.bed]      and every morning, I pushed the bed back over the hole.
[9.friend]   The night I finished, my best friend was waiting by the hole.
[9.wave]     He tried to wave goodbye.
[9.sleeves]  His arms stayed in his sleeves.

# clip 05-edge
[10.out]     I came up just below the top.
[10.smell]   The air smelled like smoke.
[10.look]    I looked back one more time.
[10.oneface] A whole town with one face was waking up without me.
[10.steps]   Then I climbed the last few steps.
[11.smoke]   For a second, I saw nothing but smoke.
[11.words]   Then I heard words. Somebody was laughing.
[11.them]    Down in the next valley, I saw people. Dozens.
[11.beard]   One had a beard.
[11.hair]    One had green hair.
[11.pumpkin] One wore a pumpkin.
[12.faces]   Not one face was the same,
[12.hands]   and every one of them had hands.
[12.strange] I wasn't strange. I was just far from home.

# clip 06-reveal
[12.shout]   I was about to shout hello
[13.clear]   when the smoke cleared, and I saw what all those hands were doing.
[13.burn]    They were burning a village.
[13.noses]   A village of long noses and folded arms, just like mine.
[13.black]   Now I knew who had burned the black house,
[13.from]    and where I had come from.
[13.known]   My town had always known what I was.
[13.hoped]   They had just hoped I would grow up to be something else.
[14.seen]    Then one of them looked up, and saw me.
[14.waved]   And he did the one thing nobody in my town had ever done. He waved.
[14.sub]     Subscribe before I wave back.
```
