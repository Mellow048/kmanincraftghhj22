# Reference: "In This Town, I Live in a Monster Village, Part 2"

**Approved by the owner** ("it was pretty good", then "perfect" after one shot was fixed). It is **his own outline,
beat for beat, in his order**: the hideout that looks like mud, the doubt, the players overhead, Mo's diary, and
the boy going back alone to find a sword and a helmet in the street. Read
[`../monster-village/`](../monster-village/README.md) first.

| File | What it is |
|---|---|
| `in-this-town-monster-village-part-2.mp4` | **The film as delivered**: 1080×1920, 2:08, 54 shots, full sound (rendered again at full size on 2026-11-14; the film itself did not change). A copy of `renders/in-this-town-monster-village-part-2.mp4` |
| `contact-sheet-every-3-seconds.jpg` | One frame every three seconds, on one sheet |
| `shot-log.md` | Every shot on one page |
| `source/` | A **snapshot** of the source: `narration.md`, `timing.json`, `kit.tsx`, `world.tsx`, `scene1.tsx` … `scene5.tsx`, `film.tsx`, `sound.json` |

The film that renders lives in `src/videos/in-this-town-monster-village-part-2/`. `source/kit.tsx` re-exports part
one's kit and `source/world.tsx` builds on part one's village, so read them beside `../monster-village/source/`.

## What it is good for

- **A sequel that reuses a world.** The kit is `export * from` part one's kit plus the new things (`MudDoor`,
  `Pig`, `Cow`, `Diary`, `IronHelmet`, `Runners`); the world is part one's village plus zones a long way off
  (`farm`, `hide`, `hall`, `moroom`). A shot names its zones joined by `+` (`ZONES` in `source/kit.tsx`).
- **The middle cut.** His story ran 2:08, between the short and the long cut; `cuts.middle` in `topic.json` was
  added for it.
- **Five scene files, not eighteen.** One file per act (7 recorded clips, 54 cues). It checks and renders the same.

## What the first stills showed, and the rule behind each fix

- **A phone frame is narrow.** At fov 42–46 the picture is only about 0.4 × the camera distance wide. Three people
  1.3 m apart need the camera 8 m back. Half the first framing faults were somebody standing outside the frame.
- **Bubbles go just over the head.** `Bubble` is centred on its position and is `(0.24 + 0.23 × letters) × scale`
  wide. Put it at face height + 0.5 and size it to 85% of the frame width; higher than that it is off the top.
- **A camera that eases cannot follow a runner who does not.** In `7.houses` and `7.arm` the boy's x is computed
  from the camera's own easing, so he stays in frame.
- **A door has to open on something.** The owner's one note: Mo's door opened on planks. The wall now has a real
  doorway with the end of the room behind it (`Hall` in `source/world.tsx`).

## One shot was replaced without a full render

The owner's idea, and it works. Render only the shot's frames as stills (`stills.yml`, `frames=2551,…,2615`),
then splice: copy the video before the keyframe that starts the shot's GOP and after the keyframe that ends it,
re-encode only that GOP with the **same** x264 settings the delivery copy used (`-preset medium -b:v … -maxrate …
-bufsize …`, bt601 matrix left untagged) so the SPS and PPS are byte-identical, join with the concat demuxer and
`-c copy`, and take the audio from the original untouched. Check that the frame count is unchanged and compare
frames either side of both joins.
