# Remaster audit — the two finished What If films vs MASTERPROMPT 01

Written 2026-11-16, after *Monster Village Part 1* passed 15,000 views at 81.1% stayed-to-watch.
Judged against [`MASTERPROMPT.md`](../MASTERPROMPT.md) §2 (the principles), §4 stage 6 (the self-review list) and §6
(the eleven required outputs). Not against what I meant to do.

| | Film 1: One Clock | Film 2: Your Shadow |
|---|---|---|
| Duration | 84.6 s | 108.7 s |
| Shots | 38 | 55 |
| Median shot | 2.2 s | 2.00 s |
| Words / wpm | 356 / 254 | 475 / 263 |
| Reference target | 175 s max, ~91 s watched | same |

---

## The eleven required outputs, and whether the two films actually have them

| # | Required | Film 1 | Film 2 | State |
|---|---|---|---|---|
| 1 | Video title | yes | yes | OK |
| 2 | One-sentence premise | yes | yes | OK |
| 3 | **Three hook alternatives, one chosen** | **no** | **no** | **MISSING — never done** |
| 4 | Complete narration | yes | yes | OK |
| 5 | **Timestamped storyboard** | shots + `timing.json`, but no readable document | same | **PARTIAL — no human-readable board** |
| 6 | Character and asset list | implicit in kit | implicit in kit | **PARTIAL** |
| 7 | Caption track | engine one-word captions | same | OK mechanically; see C1 below |
| 8 | Audio and sound plan | `sound.json` + mix | same | OK |
| 9 | Rendered path | `renders/…mp4` | `renders/…mp4` | OK |
| 10 | **Self-review report** | **no** | **no** | **MISSING — never written** |
| 11 | Remaining weaknesses | **no** | **no** | **MISSING** |

Three of the eleven were never produced for either film. That is the first remaster job and it is cheap: it is
paperwork over work that is already measured.

---

## Stage 6 — the self-review, honestly run

### Film 1 — One Clock

| Question | Verdict |
|---|---|
| First three seconds create curiosity? | **Weak.** Opens on a wide classroom with the teller standing in a doorway. The interesting thing — the number over every head — arrives *after* the wide. The reference opens on the strange thing itself. **FIX: open on a face with a number over it, close.** |
| Premise immediately understandable? | Yes by 0:06, not by 0:03. |
| Does every scene contribute? | Mostly. The assembly beat is the weakest — it re-proves a rule already proven. |
| Middle engaging? | Yes — the teacher-at-forty payoff lands at 36%. |
| Increasingly interesting? | Yes. |
| Characters visually consistent? | Yes — one `TELLER` head, one outfit colour. |
| Captions accurate? | Yes, engine-synced. |
| Narration intelligible? | Measured, not heard. **Unverified by ear.** |
| Ending delivers on the opening? | Yes — "It was never counting down. It was counting on me." |
| Filler? | The 0:00–0:06 establishing block. |
| Works standalone? | Yes. |

### Film 2 — Your Shadow

| Question | Verdict |
|---|---|
| First three seconds create curiosity? | **Good.** The shadow waves at a girl while he does not. That is the reference's move: the wrong thing is visible immediately. |
| Premise immediately understandable? | Yes. |
| Does every scene contribute? | Yes, and the mid-film gear change is the strongest thing in either film. |
| Middle engaging? | Yes. |
| Increasingly interesting? | Yes — the escalation to the dead brother is real. |
| Characters visually consistent? | Yes, after the `opacity={1}` fix. |
| Captions accurate? | Yes. |
| Narration intelligible? | Measured, not heard. **Unverified by ear.** |
| Ending delivers on the opening? | Yes — "I was following it." |
| Filler? | None. |
| Works standalone? | Yes. |

---

## The gaps that actually cost views

Ordered by how much they plausibly cost against a 175-second, 81%-retention reference.

### C1. Captions are one word at a time. The reference is not.

The reference uses **"large uppercase pixel-style captions with white lettering and black outlines"** and
**"one-word-at-a-time captions **or short phrases** may be used"**. Both my films do one word, always, at 263 wpm.
At that rate a single word is on screen for about 0.23 s — faster than the eye can lock onto a shape. The reference's
captions are readable at a glance *because they are phrases*.

**Fix:** group captions into 2–4 word chunks on one line, keeping the pop-in on the spoken word. This is a caption
layer change, not a re-record.

### C2. Shot length is at the very bottom of the band.

Median 2.00 s and 2.2 s. The reference holds shots longer — it is 175 s with far fewer cuts per minute than 30. A
2-second median is not "fast-paced", it is *restless*: nothing is ever on screen long enough to be looked at, which
is exactly what §2.D (visual storytelling, readable with the sound off) and §2.E (wide / medium / close variety) both
ask for. Cutting faster is the most common way an agent mistakes motion for retention.

**Fix:** for the film 3+ work, target **median 2.6–3.2 s** with deliberate wide→medium→close grammar, not uniform
2-second chops. Films 1 and 2 keep their approved cut — see the owner's rule: never change an approved film.

### C3. Duration is less than half the reference.

84.6 s and 108.7 s against 175 s. The topic contract allows 60–118 s, so this is legal — but the reference earns
91 seconds of watch time per view partly because there is more story to hold. Film 2 at 108.7 s is the closer of the
two. Films 4 and 5 should sit at **105–118 s**, at the top of the contract, with the extra time spent on the twist,
not on the middle.

### C4. The hook is a caption, not an image.

Both films open on the "What if…" line, which is right — but film 1 puts it over a *wide*. The reference's first
frame is already the strange thing. **Rule going forward: the weirdest image in the film is frame one, and the
"What if" line plays over it.**

### C5. No human-readable storyboard or self-review exists.

§6 items 3, 5, 10, 11. Cheap to fix, and they are also the documents that would have caught C1–C4 earlier.

---

## What is NOT wrong (do not "fix" these)

- The **sound law** — every effect on a word, 47–48 effects a minute, −14.8 LUFS, true peak −2.3 dB. That beats the
  reference's audible mix by measurement.
- The **one-word caption *look*** — bold, uppercase, white, thick black outline, pixel font, centred. Exactly §2.F.
- The **cast consistency** — one teller, one face, one loud colour.
- **Film 2's structure** — five jokes by 0:20, rule at 12 words, misread out loud, payoff at 36%, picture promise at
  57%, escalation twice in the last quarter. It is built to the reference's spine.

---

## The plan, in order

1. **Caption layer: phrases, not words.** One engine change, applies to films 1 and 2 without touching their cut.
   *Blocked on the owner's rule that an approved film is never changed* — see the question asked of him. If he says
   go, this alone is worth more than anything else on the list.
2. **Film 1 hook re-cut.** Open on the close face with the number over it, then the wide. ~4 s of resequencing.
   Same blocker: it changes an approved film.
3. **Film 3 ships to the new grammar** — median 2.6–3.2 s, wide/medium/close stated per shot in the note.
4. **Films 4 and 5** at 105–118 s, frame-one hook, phrase captions.
5. **Paperwork for all five**: three hooks, a timestamped board, a self-review, a weaknesses list.

---

# The camera rules that came out of this remaster

Eight lens bugs, all found by rendering and looking. They are all one family: **`on` is the LOOK POINT, and the lens
sits `dist` metres away at `yaw`/`pitch`.** Everything else follows from that sentence, and I had it backwards for two
whole films.

```
lens = on + dist x (sin yaw x cos pitch,  sin pitch,  cos yaw x cos pitch)
```

**yaw 0 = SOUTH of the look point. yaw 90 = EAST. yaw 180 = NORTH. yaw -90 = WEST.**

`pitch` positive = the lens is ABOVE the look point looking down.

That one formula has now paid for seven separate bugs:

| # | Symptom | Cause |
|---|---|---|
| 1 | Lens behind a wall, frame is flat plaster | `yaw 148` from a seat near the east wall lands outside the room |
| 2 | Lens above the ceiling, frame is a roof slab | `cam.top(height 4.0)` in a room 3.6 m high |
| 3 | Lens inside a desk, bottom third of frame is wood | `dist` shorter than the gap to the obstacle |
| 4 | A person's shadow is invisible from every angle | The actor is between the lens and the thing behind him |
| 5 | A number/picture renders as a black slab | The voxel figure faces away from the lens |
| 6 | The subscribe sign is a cropped banner | The 9:16 frame is narrow; nobody computed the width |
| 7 | The subject's face is never on screen | A north-facing actor faces a lens at `yaw ≈ 180`, not `yaw 0` |
| 8 | A shadow's head is cut off | A prop on the wall is occluded by its own tray/rail |

## The four rules

1. **Solve the stand point, never type the angles.** Pick where the lens stands and what it looks at, then compute
   `dist`, `yaw` and `pitch`. `Topics/WhatIf/README.md` has the three-line Python.

2. **Check the stand point against the set before rendering.** Every set has bounds; the lens must be inside them.
   The classroom is x ±4.4, z −3.5…3.6, ceiling 3.6. The hall is z −1.8…1.7. A lens outside is a wall.

3. **Compute the width of frame before choosing a distance.**
   `width = 2 x dist x tan(fov/2) x (1080/1920)` — the 9:16 frame is less than a third as wide as it is tall, so
   distances that feel right are three times too close. At 3.2 m and fov 36 you see **1.17 m**, which cannot hold a
   1.7 m sign or a person and the thing behind them.

4. **Ask who is facing the camera.** An actor's `rotationY` is the direction they look. Put the lens where they are
   looking and you get their face; put it behind them and you get a neck — for 40 of 55 shots, which is what film 2
   shipped the first time.

## What the vision is for

The owner said use the vision and do not lean on him as the tester. That is what this list is: every one of these
eight was invisible to `npm run check`, which measures duration, words, tempo, loudness — every number — and cannot
see that a frame is a wall. **A passing check is not a finished film.** The only test that counts is pulling frames
out of the actual mp4 and looking at them.
