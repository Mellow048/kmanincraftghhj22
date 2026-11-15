# Reference: "In This Town, the New Kid Never Took Off His Helmet" (part 1)

**Delivered 2026-11-15. The owner has not reviewed the film yet.** He approved the script (draft 2 in
[`../../outlines/helmet-kid.md`](../../outlines/helmet-kid.md), "yes go"). It is his outline and he calls it horror.

| File | What it is |
|---|---|
| `in-this-town-the-new-kid-never-took-off-his-helmet.mp4` | **The film as delivered**: 1080×1920, 1:42, 46 lines, 413 words, full sound. A copy of `renders/in-this-town-the-new-kid-never-took-off-his-helmet.mp4` |
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
