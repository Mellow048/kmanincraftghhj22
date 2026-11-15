# Reference: "In This Town, the New Kid Never Took Off His Helmet" (part 1)

**Delivered 2026-11-15, reworked the same day after his review**: "short is good as usual", but the unmasking "feels.. empty, add more movement and polish to it". He has not seen the rework yet. He approved the script (draft 2 in
[`../../outlines/helmet-kid.md`](../../outlines/helmet-kid.md), "yes go"). It is his outline and he calls it horror.

| File | What it is |
|---|---|
| `in-this-town-the-new-kid-never-took-off-his-helmet.mp4` | **The film as delivered**: 1080×1920, 1:48, 47 lines, 413 words, full sound. A copy of `renders/in-this-town-the-new-kid-never-took-off-his-helmet.mp4` |
| `source/` | A **snapshot** of the source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene5.tsx`, `film.tsx`, `sound.json`, and `sound.gen.py`, the script that wrote the sound sheet |

The film that renders lives in `src/videos/in-this-town-the-new-kid-never-took-off-his-helmet/`.

## What it is good for

- **A short cut that is horror.** Day in a classroom, then one night under one lamp. Music stops twice (when the
  helmet comes off, and after the last kid is gone); the loudest effect in the film is one stick.
- **A watcher's shot.** `POV` in `scene4.tsx` is the teller's view from behind his tree, used three times (4.lamp,
  4.swallow, 5.turn), so the audience knows where he is when the arm points at the lens.
- **`Tentacle` in `kit.tsx`**: a chain of blocks from `from` to `to`, grown with `k`, with `thick`, `bend` and `seed`.
- **`NewKid`**: a kid with a helmet that lifts (`lift`), comes off (`bare`), drips (`wet`) and has a hole where the
  face should be (`holeGlow`).

## What went wrong on the way (three rounds of stills)

- **A tree at the camera.** The hiding tree filled the frame or cut off a third of it. A trunk 1.5 blocks from the
  lens moves a long way for two degrees of yaw: check every shot that uses the POV, not one.
- **A ring of people hides the one in the middle.** Three bullies stood west, east and south of the kid; a camera
  from the south showed a back. The camera now looks through the gap between two of them (yaw about 46) from above.
- **Coloured fills wash faces.** A purple `Fill` at power 26 turned faces pink; 2 to 7 is enough at night.
- **Close-ups under dist 2** cropped the helmet; a `Bubble` over a head left the top of the frame; the subscribe
  sign at scale 0.55 was cropped, and at head depth the hair came through it (scale 0.21, in front of the head).
- **The voice service refused one clip** that said in words what happens to the three kids. The spoken lines are
  milder ("It pulled them in. All three. And then they were gone.") and the picture shows it. Write horror for this
  channel that way from the start.

## The unmasking, before and after (his review)

Before: "The helmet came off. There was no face. There was a hole. And something inside it moved." was one voice clip,
4.3 seconds, three shots, and nothing in them moved. He felt nothing.

After: the same words, cut into five clip files (`06a-off` … `06e-tent` in `narration.md`) with `wait` between them,
so the reveal is ten seconds and seven shots (`scene4.tsx`, cues 4.off to 4.moved):

1. The helmet comes off and goes up past the lamp (camera hit).
2. No words: it lands in the dirt, bounces, rocks until it is still. No music.
3. The puller's face: still half laughing, then not.
4. No words, from above and behind the bare head: the two let go, one and then the other.
5. "There was a hole." His head is down and comes up on the word.
6. "And something inside it moved." Dark shapes slide in the black (`stir` on `NewKid`), the rim twitches, one thin end feels along the edge.
7. No words, from the side: the thin arm crosses the gap, touches the puller's face, and snaps back. Then the burst.

**A reveal needs time with no words in it. Record its lines as separate clips from the start.**
