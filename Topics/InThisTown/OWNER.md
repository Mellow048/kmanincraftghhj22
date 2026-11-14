# What the owner likes, and what the channel has learned

**Read this before you write a script or a shot.** It is the owner's taste and the feedback his films have had, in one
place. `SCRIPT.md` and `SHOTS.md` are how the reference channel does it; this file is how *he* wants it, and where the
two disagree, this file wins. Add to it every time he says what he liked or did not like. Date every entry. Never
delete one unless he takes it back.

## 1. Where the channel is

| When | What |
|---|---|
| 2026-11-14 | 11+ subscribers. The two superpower films: about 1.3k views each, 873–875 engaged viewers, 63–65% stayed to watch. |
| 2026-11-14 | His target: **70% or more stay to watch**. His words: it "will unlock more viewers"; "just a small adjustment and we are near to getting out of that 1k view jail". |

The format stays. An outside review he trusts said to keep this format and keep improving it, and he agrees. Do not
propose a different kind of video.

## 2. The outside review (2026-11-15), and the two rules that come out of it

He had another AI rate Monster Village parts one and two.

| Film | Score | Liked | Held it back |
|---|---|---|---|
| Part 1 | 7.5/10 | The lighting, the character close-ups, the village, the cinematic look. It sets up the premise and gives a reason to care about the people. | Some shots feel repetitive. The opening could establish the central conflict faster. |
| Part 2 | 8/10 | More action, more between the characters, more drama. The story has momentum. | Compositions could be more varied. Some transitions could be tighter. |

### Rule A: the premise is on screen in the first second

Part one opened on a wide shot of a village and only then went to the people. That is a second and a half of nothing.

- **Shot one shows the strange thing itself**, with the person it is strange for, in one frame: the boy among monsters,
  the arm behind the tree, the witch's shoes on his feet. Not a place. Not a title. Not a wide shot to "set the scene".
- **The first line says the premise or the trouble**, and the picture is already doing it when the first word lands.
- If the film is a part two or three, shot one is the worst moment of where the last part stopped, not a recap of how
  we got there. One line of recap at most, and it is said over something happening.
- Something moves in the first half second: a push in, a thing falling, somebody turning round.
- Test: pause on frame 15. Can a stranger say what this story is about? If not, change the shot.

### Rule B: no two shots in a row look alike, and the film leaves the close-up

The close-ups are liked. Too many of the same close-up are not.

- **Never the same framing twice in a row.** Neighbouring shots differ in at least two of: size (close, middle, wide),
  height (worm's eye, eye level, high, straight down), side (front, side, behind, over a shoulder), and whether the
  camera moves.
- **In every scene, at least one shot of each kind:**
  - an *environment* shot: the place is the subject and the people are small in it;
  - a *travelling* shot: the camera goes somewhere, along a street, through a door, up a wall, behind somebody walking;
  - an *odd* angle: from the ground, straight down, through bars or a window or a doorway, from inside a thing (a sack,
    a chest, a helmet), from what a character sees.
- No more than two close-ups of a face in a row. The third is a hand, a thing, a wide, or a point of view.
- **Tighter transitions.** A cut lands on a movement or a word, not after it. Carry something across the cut: the
  same direction of travel, the same shape, a look and then the thing looked at, black into black. Do not start a shot
  on a still frame and do not end one after the action is over.
- Before a render, lay the stills out side by side (`scripts/shots.mjs`, or a stills run). If two neighbours could be
  swapped without anybody noticing, one of them is wrong.

## 3. How he likes a story written

Taken from the outlines he wrote himself (`outlines/`) and from what he said about drafts.

- **His outline is the story.** When he gives beats, follow them in his order and keep his lines ("My son got taken
  away by the players??"). Add jokes and joins; do not replace his plot. A draft that was the agent's own story was
  thrown away (Monster Village part 3, draft 1).
- **He says "or if you think of something better then sure"** about details. That is leave to improve a detail, and
  the improvement is shown to him in the script before it is built.
- **A plain boy with one odd problem, among people who are not like him**: the only human in a monster village, the
  slowest runner in a town that races, a robot at eighteen.
- **Family and friends who are funny and loyal**: the skeleton dad whose arm comes off, the zombie mum with the plan,
  Hiss the creeper, Mo. Running jokes pay off across parts (the arm).
- **Physical comedy he asked for or kept**: an arm that crawls and "talks", a face that falls off, a crowd that all
  jump at once, a golem "with one arm". Dry asides from the teller ("It is a fast arm").
- **Stakes that go up in steps, then a hopeless moment, then "on the other side"**: a cut to somebody doing something
  about it. He asked for this by name.
- **Silence used on purpose**: "narration stop here and make them move like they are discussing", then the camera goes
  into a dark block and the cut comes out of it. He thinks in shots; when he describes a camera move, do that move.
- **Minecraft things that are really in Minecraft**: iron golems, pillagers and their mansion, witches, villagers,
  dark oak forest, desert, rivers. He sends reference pictures: build what is in them.
- **Numbers and countdowns**: "3, 2, 1, GO!", places in a race (15th, 11th, 9th, 6th, 2nd), "since he was 10, now 18".
- **Every part ends on a cliffhanger and "like and sub for part N"**. Stories run as series.
- **A fight is bodies moving**, posed and hitting. He rejected "a png fight another png". The best mark he has given
  was for a fight: "now thats MUCH better! 8.8/10 fight scene".
- **The picture does what the line says**, on the word. Captions never lag.
- **Nothing the teller could not have seen**, unless he says out loud that he heard about it later.
- **Never over three minutes.** His rule, strict. A story that does not fit becomes parts.
- **Full 1080x1920.** He called a 720 copy "degraded".

## 4. How he likes to work

- **One film at a time**: "You cant split your focus, focus on 1 thing first, finish it, then head to the other."
- **Fast**: "lets speed up the production!" Do not ask what can be decided; show the script, get the yes, build.
- **Packs first** when a film needs new people or places, and the packs go to `main` before the film.
- Every finished film goes into `reference/` with its source and its mp4, and onto `main`.
- **Push after every step.** Work that is only in the sandbox is lost when a branch closes. (Six scenes of part 3 were
  lost this way on 2026-11-15 and had to be written again.) Merge a pull request only when everything meant for it is
  pushed.

## 5. Log

- **2026-11-15.** He left with "ill review it later, keep going ill be back soon". The race film (part 1) was written
  and built on his outline without his yes on the script, because he could not be asked. When he is away, follow his
  outline line by line, keep his own phrases, list every addition at the top of `narration.md`, and tell him first
  thing what was added. Do not wait.
- **2026-11-15.** Monster Village part 3 has not been reviewed by him. Its sound was rebuilt after delivery (the sheet
  used `offset`, which the builder ignores; the key is `at`): same picture, new audio track.
