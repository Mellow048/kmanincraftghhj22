# A pelican riding a bicycle

`pelican-on-a-bike.html` — one self-contained file. Inline SVG, animated with SMIL.
No JavaScript, no frameworks, no images, no fonts, no network. Open it in a browser
and it runs.

This is a **separate, independently built** piece. The repo already had a file called
`pelican-riding-a-bicycle.html`; it is untouched by this work and still exactly as it
was at commit `1a0234c`.

## What is in the file

A white pelican in a red cap and scarf, pedalling a teal step-through bicycle along a
seaside boardwalk. It faces right, so it travels to the right and the boardwalk slides
left under the wheels.

Everything is vector: a gradient sky, a low sun, drifting clouds, three gulls, a
summer sea with five small sails, a plank boardwalk, and the rig itself. The bicycle
has spoked wheels with valve caps, mudguards, a full diamond frame, a crankset with
46 teeth driving an 18-tooth cog through a chain, a saddle, drop bars with a bell, and
a wicker basket carrying a bread roll and a fish.

## The mechanics are computed, not drawn by eye

The interesting part is that the bicycle is consistent. Every rate is derived from
the gear ratio, so nothing slides or stutters against anything else:

| quantity | value | how it follows |
| --- | --- | --- |
| crank revolution | 2.2 s | the one free parameter |
| chainring / cog radius | 54 / 23 px | geometry (46 and 18 teeth drawn) |
| wheel revolution | 0.9370 s | `2.2 × 23/54` |
| ground speed | 1375 px/s | `2πR / wheelT` with `R = 205` |
| boardwalk plank period | 0.2473 s | `pitch / speed`, `pitch = 340` |
| chain link period | 0.1686 s | `link / (ω · ringR)`, `link = 26` |

The rider's legs are solved with **two-bone inverse kinematics**: for each of 36
keyframes per revolution the code takes the hip, the pedal position from the crank
angle, and solves for the knee. The thigh, shin and foot are three nested rotating
groups carrying the angles `thigh`, `shin − thigh` and `−shin`, so the foot stays
level through the whole stroke while the leg lengthens and shortens over the pedal
circle.

The chain is a real **external tangent** between two circles of the right radius
ratio, not a decorative squiggle.

## Verify it

```bash
node build/pelican-on-a-bike/build.mjs      # regenerate the page
node build/pelican-on-a-bike/verify.mjs     # check it, no browser needed
```

`verify.mjs` regenerates the file, then:

- checks it is SVG + HTML only — no `<script>`, no raster, no remote URL;
- parses it as XML, rejecting mismatched tags and duplicate attributes;
- checks every `<animate>` has a legal `dur`, an endless `repeatCount`, matching
  `values`/`keyTimes` lengths, and that no element both sets and animates the same
  attribute;
- reads the value tables back out of the file, replays them exactly as a renderer
  would (linear interpolation between keyframes), runs forward kinematics on the
  displayed pose, and measures how far the foot ends up from the pedal.

That last check is the one that catches something real. The generator bakes joint
*angles* at each keyframe, but the pedal travels a *circle*, so between keyframes the
interpolated pose is not exactly the solved pose. Measured at 240 samples per
revolution, the worst error is **0.62 px** — about a third of a pixel at the size the
bicycle is actually drawn. The check fails above 3 px, which is the threshold at which
the eye starts to see the foot skate on the pedal.

Current output:

```
note  animations: r, ry, stroke-dashoffset, transform:rotate, transform:translate
note  11 rotation tracks × 37 keyframes
note  wheel 0.9370 s · board 0.2473 s · chain link 0.1686 s
note  leg tracks: near 8–10, far 3–5
note  worst foot drift: 0.62 px (near at 214.5°) · worst tilt 0.00°
OK — 21 animations · 240 samples per revolution · mechanics exact
```

## Files

- `pelican-on-a-bike.html` — the deliverable, ~50 kB, generated. Do not hand-edit.
- `build.mjs` — the generator: geometry, palette, all the artwork, and the maths.
  `--static --t=<seconds>` bakes one frame to stdout for rasterising; `--bird` renders
  the pelican alone on a flat ground, which is how the bird was drawn.
- `verify.mjs` — the checks above.
