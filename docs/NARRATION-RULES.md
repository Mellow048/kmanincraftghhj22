# NARRATION RULES — talk like a person, not a summary

> **Topic films.** This page is written for the base 20-second short. A topic can replace the length and the beat map
> (`Topics/InThisTown/SCRIPT.md` has an 18-beat, 700-word sheet). The voice rules still hold: plain words, one teller,
> nothing the picture does not show.

This is the voice contract. Read it before writing a line. If a line breaks a rule here, rewrite the line.

The test is one question: **would you say this out loud to a 9-year-old?**

If the answer is no, the line is wrong.

---

## 1. The one rule

Tell the story the way you would tell a friend what happened.

Not like a book report. Not like a trailer. Not like a wise old man. Not like a machine summarizing the video.

A 9-year-old should understand every line the first time. If they have to ask what a word means, the word is too fancy. If they can't tell who is talking, the line is too vague. If they can't tell what changed, the line is doing nothing.

---

## 2. Kill these four voices

### The action list

Bad:
> He stands up. He walks to the door. He opens it. He sees the hallway.

The image already shows all of that. The voice is reading the shot list.

Good:
> He gets up. The door is already open.

The first line is an action. The second line is the turn. The voice says what the image cannot say by itself.

**One action line is allowed when it is a decision, not choreography.** "He opened the door" is a decision. "He stood, walked, reached, turned the handle and pulled" is a list.

Switching teller makes it worse. "He does this. She does that. I pick this." is three people telling three different stories. Pick one teller and stay there.

### The wise old man

Bad:
> And so it came to pass that the boy, in his innocence, opened the door that should have stayed shut.

Nobody talks like this. It is slow, fake, and full of hot air.

Good:
> He opened the door.

### The fancy analogy

Bad:
> The hallway was a long, dark throat, and the boy was a small, bright morsel sliding down it.

It is longer than the shot, and it tries to be smarter than the story.

Good:
> The hall was too long.

### The AI summary

Bad:
> This wasn't just a hallway. It was a warning.

It tells the audience what to feel. It is a summary, not a story.

Good:
> The light was on.

---

## 3. Write the line

1. **One teller.** Pick "I" or "he/she". Stay there for the whole film.
2. **One tense.** Present tense by default. Do not slide between past and present.
3. **One idea per line.** 3–10 words. Twelve is the hard ceiling.
4. **Plain words.** Dark. Quiet. Wrong. Empty. Cold. Not foreboding, malevolent, ethereal or ominous.
5. **Say the thing.** "The door was open." Not "The door stood ajar, a silent invitation."
6. **Do not describe what we can see.** The image shows the action. The voice says what it means, what it costs, or what happens next.
7. **One name per person.** "The boy" or "Miles". Not "the child", "the lad" and "the youth" in alternating lines.
8. **No stacked metaphors.** One plain comparison at most, and only if a 9-year-old gets it in one beat.
9. **No rhetorical questions** unless the next shot answers them.
10. **Read it out loud.** If you run out of breath, cut it. If it sounds like a trailer, rewrite it.

---

## 4. Do / Don't

| Don't write | Write |
|---|---|
| "He stood up. He walked to the door. He opened it." | "He got up. The door was already open." |
| "Little did he know the hall was waiting." | "The hall light was on." |
| "A chill ran down his spine." | "He stopped." |
| "The silence was deafening." | "Nothing moved." |
| "It was as if the shadows had come alive." | "Something moved in the dark." |
| "This wasn't just a schedule. It was a warning." | "His name was on the schedule." |
| "The boy, realizing the danger, began to retreat." | "He backed away." |
| "I made a choice that would change everything." | "I opened the door." |
| "The hallway was a labyrinth of fear." | "The hall had no end." |
| "A myriad of thoughts raced through his mind." | "He couldn't think." |
| "He proceeded to vacate the room." | "He left." |
| "The luminescence from the corridor..." | "The hall light was on." |

---

## 5. Banned phrases

Cut these on sight:

- little did he know
- in that moment / at that moment
- a chill ran down his spine
- a sense of dread
- the air was thick with
- everything changed
- this wasn't just
- it was then that
- without warning
- in the blink of an eye
- a symphony of / a tapestry of
- the silence was deafening
- time stood still
- his blood ran cold
- the darkness consumed
- an eerie / a foreboding
- malevolent / otherworldly / ethereal
- juxtaposition / myriad / plethora
- utilize / commence / endeavor
- and so it came to pass

If you need one of these to make the line work, the line is not working.

---

## 6. The 9-year-old tests

Run all four before you record.

1. **The retell test.** Watch the film. Ask a 9-year-old to tell it back in one sentence. If they can't, the story is too complex or the words are too fancy.
2. **The say-it test.** Would you say the line to a 9-year-old without changing a word? If not, simplify it.
3. **The picture test.** Does the line tell the audience something the picture doesn't? If it only describes the picture, cut it.
4. **The bored test.** If you removed the line, would the scene still make sense? If yes, remove it. Silence is better than filler.

---

## 7. The edit pass

Write the script. Then cut it in half.

1. **Cut every line that describes the shot.** Keep the lines that add a fact, a fear or a turn.
2. **Cut every adjective that does not change the meaning.** "Dark hallway" → "hallway". The image is already dark.
3. **Cut every line that explains the last line.** The audience is not stupid.
4. **Read the rest out loud.** Any line that makes you pause or perform is too fancy. Say it like a person.
5. **Count the lines.** A 20-second film usually needs 4–7. If you have 12, you are writing an audiobook, not a short.

---

## 8. Worked example

A bad script for a 20-second film:

> He is a poor boy. She is a rich girl. He walks into the room. She looks at him. He picks up the coin. She says no. He does not listen. This wasn't just a coin. It was a choice. Little did he know...

Why it fails: it is an action list, it switches tellers, it uses a wise-old-man line, and it tells us what to feel.

A good script:

> She has everything.
> He has a coin.
> She says, "Not yours."
> He picks it up anyway.
> The room goes quiet.
> She smiles.
> He shouldn't have picked it up.

Why it works: short lines. One teller. Plain words. The actions are decisions, not choreography. The last line is a turn, not a moral.

---

## 9. Where the script lives

Every new film gets a `narration.md` (copied by `npm run new`). Put the spoken
lines in one block like this:

````markdown
```narration
The light was on.
He should have stayed in bed.
The door opened by itself.
Something was already in the hall.
```
````

One line per beat, in order. `npm run check` lints the block and warns about
lines over 12 words, banned phrases, and scripts with more than 9 lines. It
cannot hear tone — that is still your job. Read the block out loud before you
call it done.

---

## 10. Checklist

- [ ] One teller. One tense.
- [ ] Every line is 3–10 words (12 max).
- [ ] Every line adds a fact, a fear or a turn.
- [ ] No action list. No wise old man. No fancy analogy. No AI summary.
- [ ] No banned phrase.
- [ ] One name per person.
- [ ] The last line is a button, not a moral.
- [ ] A 9-year-old can retell the film in one sentence.
- [ ] The film still works if the voice is muted.

---

The image tells the story. The voice tells us why it matters. Keep it plain, keep it short, and get out of the way.
