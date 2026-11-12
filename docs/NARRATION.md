# NARRATION — hook first, pay it off

> **Topic films.** This page is written for the base 20-second short. A topic can replace the length and the beat map
> (`Topics/InThisTown/SCRIPT.md` has an 18-beat, 700-word sheet). The voice rules still hold: plain words, one teller,
> nothing the picture does not show.

The narration is not a description of the render. It is the other half of the shot. The image shows it; the voice makes it mean something.

> **Voice first.** The words themselves are governed by
> `docs/NARRATION-RULES.md`. Read it before writing a line. This file covers
> structure, sync and the beat map; that file covers how the voice must sound.

Read `AGENTS.md` and `docs/CAMERA-BIBLE.md` first.

---

## 1. The hook

The first line must make a thumb stop. It can be:

- a question: "Why is the hallway light on?"
- a threat: "He should not have opened the door."
- a contradiction: "The schedule said he was alone."
- a countdown: "The lights go out in ten seconds."
- a confession: "I was the one who let it in."

Do not open with:

- "Welcome back."
- "Today we're going to..."
- "In this video..."
- a logo, a title card, a slow pan of an empty room.

The hook lands in the first 1.5 seconds. The image and the line arrive together.

---

## 2. The 20-second script shape

| Time | Beat | Voice | Image |
|---|---|---|---|
| 0.0–1.5 | Hook | One short line that asks the question | The wrong image, already moving |
| 1.5–5.0 | Context | Two or three short lines: who, where, what is normal | The room, the bed, the exit |
| 5.0–9.0 | Turn | The detail that changes the meaning | Insert or reaction |
| 9.0–16.0 | Reveal | Let the image breathe; one line, or silence | The fly-through and the threat |
| 16.0–20.0 | Button | The line that recontextualises everything | Close-up; end before it reaches us |

The voice does not need a line for every shot. Silence is a line.

---

## 3. Rules

1. **Present tense.** "He hears it." Not "he heard it."
2. **Short sentences.** 3–10 words. Twelve is the hard ceiling. One idea per line.
3. **Concrete nouns.** Door, hallway, schedule, window, bed, light. Not "a sense of dread".
4. **No exposition dumps.** The audience can see the room; do not describe the wallpaper.
5. **The line and the image match.** If the line says "the door is open", the door is in frame and open.
6. **Do not name the monster too early.** "It" is scarier than a species name.
7. **End on a button.** A line that makes the last 19 seconds mean something else.
8. **Read it aloud.** If you run out of breath, cut it. If it sounds like a trailer, rewrite it.
9. **No AI clichés.** "Little did he know", "in that moment", "a chill ran down his spine" — cut.
10. **One story.** Do not add a second threat, a twist and a backstory in 20 seconds.

---

## 4. Line bank

### Hospital
- "He thought the ward was empty."
- "The schedule said he was alone."
- "Why is the hallway light on?"
- "He heard the door close."
- "It was not the wind."
- "The chart had his name on it."
- "He should not have looked."
- "It had been waiting since lights-out."

### Home / bedroom
- "The house was supposed to be empty."
- "Someone was in the hallway."
- "The light under the door moved."
- "He heard his name in his mother's voice."
- "The front door was already open."
- "There was someone in the mirror."
- "It only moves when the lights go out."

### School / corridor
- "The school was closed for the night."
- "The intercom clicked on by itself."
- "Every locker was open."
- "The exit sign was pointing the wrong way."
- "Someone was running in the empty hall."
- "The principal's office light was on."

### Forest / road
- "The road was not on the map."
- "The trees stopped at the fence."
- "The headlights found it first."
- "Something was walking beside the car."
- "The sign said the town was two miles away."
- "It had been following since the last turn."

### Buttons
- "It saw him."
- "There was never a schedule."
- "He was never alone."
- "The light was not for him."
- "It was already inside."
- "Do not look at the window."
- "The door was never locked."
- "It knew his name."

---

## 5. Worked example — THE SCHEDULE

| Time | Voice | Image |
|---|---|---|
| 0.0–1.5 | "He thought the ward was empty." | Boy on bed, blue room, open door behind him |
| 1.5–4.0 | "The schedule said he was alone until morning." | Push in; the timetable on the wall |
| 4.0–7.6 | "But the hallway light was on." | Cut to his face; he is not looking at the chart |
| 7.6–11.0 | "Then he heard the door." | Head turn; pan across the room to the doorway |
| 11.0–17.0 | "It had been standing there the whole time." | One continuous fly-through into the hallway; reveal |
| 17.0–20.2 | "It saw him." | Push on the eyes; the figure takes one step |

The narration is 5 lines in 20 seconds. The longest silence is the reveal. That is deliberate: the image has to do the work.

---

## 6. Sync

- Start the camera move on the word that motivates it.
- Land the reveal on the word that names it, or one beat after.
- Do not move the camera on every line. Let the line sit.
- Cut on a breath, a blink, a footstep or a light click — not on a random frame.
- If the line is a question, the next shot is the answer or the fake answer.
- If the line is a warning, the image should show why.

---

## 7. Audio

- Put the voiceover in `public/audio/` and reference it in `film.audio` with `src` and `volume`.
- Music: low drone, one pulse, no melody that competes with the voice.
- Sound design: fluorescent hum, door click, carpet footstep, distant gurney wheel, a single low hit on the reveal.
- Duck the music under the voice. The voice is the story.
- Do not add a jumpscare sound if the image is not a jumpscare. The button is quieter and worse.

That is the base film. A **topic film** has a full soundtrack that is made in Python and mixed under the voice by
`scripts/sound.py`: see `docs/STORY-FILMS.md` section 6 and the topic's `SOUND.md`. Its sounds can be used in a base
film too: `python3 scripts/sound.py list`.

---

## 8. Checklist

- [ ] Hook in the first 1.5 seconds.
- [ ] One story, one turn, one button.
- [ ] One teller, one tense, plain words. No action list, no wise-old-man voice. See `docs/NARRATION-RULES.md`.
- [ ] Every line is under 12 words.
- [ ] Every line is paid off by the image.
- [ ] No greetings, no logos, no exposition dump.
- [ ] The reveal lands on a line or a deliberate silence.
- [ ] The last line recontextualises the film.
- [ ] Read aloud without running out of breath.
- [ ] The film works muted.
