# A pelican riding a bicycle

`pelican-on-a-bicycle.svg` — one deliverable file, HTML with one inline SVG in it. Open it in a browser; nothing is
fetched, nothing runs.

Made to this repository's own house rules rather than as a one-off drawing, because that is the thing being tested:
one world, a phone-first 9:16 frame, three lights doing three jobs, foreground / midground / background, and every
pixel an object in the scene instead of an overlay on top of it (the rule `AGENTS.md` calls "strictly 3D" — here,
strictly drawn: no cards, no captions laid over the picture, no screen effects).

## What is in the frame

| | |
|---|---|
| Key light | A low warm sun off the left. His breast, the bill's culmen and the deck's coping carry the warm edge |
| Practical | The lighthouse on the right headland: its lamp, its halo, and a beam that sweeps across one turn every 19 s |
| Rim | The cold sky on his back and the cool side of the neck: the three light jobs the style bible asks for |
| Foreground | Dark, blurred grass passing at 1.7× the deck |
| Midground | The rider, the bicycle, the pier |
| Background | Sea, the sun's road on it, two headlands, a sail, gulls, cloud banks |

## What is exact, and why

- **The wheels roll without slipping.** One turn is 1.2 s and the tyre's outer edge is 150 from the hub, so the pier
  scrolls 2π × 150 = 942.5 px in that time. A bollard is one circumference from the next, so one passes every turn.
  A wheel that turns over a deck that scrolls at any other speed is the first thing an eye catches.
- **The gearing is honest.** A 50-tooth chainring and a 24-tooth cog: the wheels turn twice while the cranks turn once
  (1.2 s and 2.4 s). The chain runs 130.9 px/s; its drawn links are 13.09 px apart and each takes 0.1 s to travel one
  pitch, so the dashes move at the speed of the chain they are drawn on.
- **The legs are solved, not guessed.** A two-bone solve (thigh 134, shin 130) sampled every 7.5° of the cranks, 48
  poses a turn, so each webbed foot stays on its pedal. The pedals counter-rotate and stay level; the far leg is half
  a turn ahead.
- **He is never quite still.** His weight bobs 3.4 px every turn of the wheels, his head and crest carry a slower idle,
  the scarf and the chain and the sea all move at their own rates.

## The one thing it does not do

It does not run JavaScript, load a font, or fetch anything. That is a rule here, not a limitation: the whole drawing is
one SVG whose movements are native `<animate>` elements, so it works opened from a file, pasted into a page, or
embedded as an `<img>`.

## Rebuilding it

`scripts/pelican-bicycle.mjs` holds the numbers and writes the file. Change a number there, run it, and the drawing,
the keyframes and the comments agree:

```bash
node scripts/pelican-bicycle.mjs
```

Two other pelican drawings were already in the repository root (`pelican-bicycle.html`,
`pelican-riding-a-bicycle.html`) before this one. This is a third, drawn from scratch, and it shares no geometry,
palette or code with them.
