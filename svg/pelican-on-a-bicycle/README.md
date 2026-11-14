# A pelican on a bicycle

One self-contained HTML page. Open `index.html` in any browser; there is nothing to install, nothing to
download, and nothing to connect to. The drawing is inline SVG with SMIL animation.

I made this from scratch. The repository already had two pelican-on-a-bicycle files in it
(`pelican-bicycle.html`, `pelican-riding-a-bicycle.html`); I did not open either of them and took nothing from
them. Everything in this folder is drawn from the numbers in `build.mjs`.

---

## What is in here

| File | What it is |
|---|---|
| `index.html` | **The thing to open.** The page, with the drawing inline. 129 KB, no dependencies |
| `pelican-on-a-bicycle.svg` | The same drawing as a standalone SVG (for checking, or for dropping into something else) |
| `build.mjs` | The generator that writes both. `node build.mjs` |
| `README.md` | This page |

`index.html` and the `.svg` are the deliverable. `build.mjs` is how they were made, kept so the drawing can be
changed without hand-editing 129 KB of markup.

---

## SVG + HTML only, and it is meant literally

- **No canvas, no WebGL, no `<img>`, no `<script>`, no web fonts, no libraries.**
  Check it yourself: `grep -cE "<(script|img|canvas|link|iframe)" index.html` → `0`.
- **No network requests of any kind.** The only `http` string in the file is the SVG namespace.
  Every `url(#…)` points at a gradient, pattern or filter defined in the same file.
- The one HTML element over the drawing is a caption, positioned with CSS. Everything else is SVG.
- Animation is **SMIL** (`<animate>`, `<animateTransform>`) — the animation built into SVG itself, no JavaScript.

## What moves

| Element | Motion | Period |
|---|---|---|
| Both wheels | 48 spokes, hub, rim and valve turning | 2.68 s per turn |
| Cranks and pedals | Both arms turning, each pedal counter-rotating so it stays flat | 6 s per turn |
| Both legs | Thigh and tarsus morphing through 48 solved poses; the webbed foot travels with its pedal | 6 s, the near one half a turn ahead |
| The rig | Rises and falls 3.6 units, and rocks about 0.4° about the middle of the bike | 3 s |
| The bird's tail and scarf tails | A gentle sway | 6 s |
| The bird's eye | A blink | 7.3 s |
| Stars, the moon's lamp, the road dashes | Twinkle, flicker, scroll | — |

**The two periods are not arbitrary.** A bicycle is geared: the crank turns once and the wheel turns once per
tooth ratio. Here the chainring is 38 units and the cog 17, so the wheel turns `17/38` slower than the crank:
`6 s × 17/38 = 2.68 s`. Get that backwards and the bike looks like it is pedalling through treacle.

## How it is drawn

The short version: **the numbers that make a drawing read are solved, not eyeballed.**

- **The wheel.** 48 spokes, each one a tangent to a 16-unit circle at the hub. That is why the spokes cross in
  the middle of the wheel the way real ones do, instead of radiating out of the centre.
- **The chain.** The two straight runs are the common tangent between the chainring and the cog, so the chain sits
  in mesh with both sprockets instead of floating near them.
- **The legs.** A two-bone IK solve (thigh 156, shin 166, pedals on a 66-unit crank). The knee lands exactly
  `156` from the hip and exactly `166` from the foot at **every** one of the 48 phases, and the foot is on the
  pedal. `build.mjs` re-checks this on every build and refuses to write the page if it drifts by more than
  0.02 units — a bird that skates is a bug, so it is an assertion, not a hope.
- **The pedals.** Each pedal arm turns with the crank and the pedal itself turns back by the same angle. The two
  transforms multiply out to a pedal that stays parallel to the ground.
- **The frame.** Every tube is a tapered polygon between two real points, with a welded fillet where tubes meet,
  a fork crown, a bottom-bracket shell, dropouts, a seat post, a stem, a swept bar, a brake lever and a bell.
- **The pelican.** Body, a folded wing with separated primaries, a bent neck, a crested head, a hooked mandible, a
  throat pouch with its own shading and veins, an eye with the moon in it, an orange webbed foot per pedal, and a
  red scarf whose band crosses the neck.

## The composition

`1080 × 1886` units, which is 9:16.4 — a phone held upright, with room at the bottom for the interface.

It is deliberately **not** a centred subject: the bike sits on the horizon line with the moon high on the right,
the bird's beak reaching into the empty upper-right quadrant, and the road cropped close along the bottom so the
empty near lane never appears. Three depths move at slightly different rates as the rig bobs (sky 0.35, hills
0.55/0.72/0.86, lamp post 0.9, rig 1.0), so the picture reads as a place rather than a flat drawing.

The light: a cold moon from the upper right (the rim on the bird's back and wing), a warm lamp on the far verge
(the warmth in the beak and the pouch), a deep teal frame against a cream bird, and one red scarf to give the eye
somewhere to land first.

## Rebuilding it

```bash
node build.mjs          # writes index.html and pelican-on-a-bicycle.svg
```

Everything is in user units, so a change is usually one number:

| To change | Edit |
|---|---|
| Wheel size, wheelbase, where the bike sits | `R`, `RIM`, `REAR`, `FRONT`, `BB`, `GROUND` |
| How big the bike is in the frame | `RIG_SCALE`, `VIEW_Y`, `VIEW_H` |
| The bird's legs | `HIP`, `THIGH`, `SHIN`, `CRANK`, `LEG_BEND` |
| How fast it is going | `CRANK_DUR` (the wheel follows from the gear ratio) |
| The sunset | the `sky` gradient in `defs()` |
| The paint job | the `paint` gradient in `defs()` |

## Checks run on this file

- **Well-formed XML**, no duplicate `id`, and every `url(#…)` / `href="#…"` resolves.
- **All 66 animations** carry the attributes their target needs, every `values` list matches its `keyTimes`
  in length, `keyTimes` runs 0 → 1 monotonically, and every `dur` is a time.
- **The leg solve** is asserted on every build (above).
- No external references; no script, image, canvas, font or iframe.
- `prefers-reduced-motion` stops every animation and leaves the still frame, which still reads on its own.
