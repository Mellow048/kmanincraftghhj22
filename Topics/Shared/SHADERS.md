# Shaders: the look, and how to switch it on

`src/engine/shaders.tsx` gives every film a real post-processing chain and a painted sky. It is **off by
default in the engine**; the narrated topic starters now switch it **on** in `film.tsx`. Existing films keep their choice.

```ts
post: { shaders: true },
```

or, to tune it:

```ts
post: { shaders: { bloom: 0.6, threshold: 1.25, vignette: 0.22, warmth: 0.45 } },
```

## What it does, in order

1. **Sky dome** (outdoor looks only). A shader on a sphere that follows the camera: vertical gradient, haze
   band at the horizon, a sun disc with a halo. Colours live in `LOOKS` in `Look.tsx` as `sky: { top, horizon,
   bottom, sun, haze }`. `overworld-day`, `overworld-sunset`, `overworld-night`, `lantern-night`,
   `overworld-storm`, `overworld-rain`, `town-day`, `street-day` and `lava-shore` all have one.
2. **Bloom** (`UnrealBloomPass`). Only genuinely over-bright things glow. The threshold is **above 1.0 on
   purpose**: a white caption is exactly 1.0 in linear light, so words stay crisp and the sun, torches and
   lanterns bloom. At 0.94 captions turned into fuzzy white blobs — do not go back there.
3. **Output** (`OutputPass`). **Required.** A composer renders into a render target, and three only applies
   tone mapping when it draws to the canvas; without this pass the film comes out linear and dark. This one
   mistake cost a whole render cycle: the frame looked like the lights had been turned off.
4. **Shafts** (custom shader): a radial scatter towards the sun on screen, so light streams across whatever
   sits in front of it. Off where there is no sky.
5. **Grade** (custom shader): highlight diffusion through the glass, a filmic shoulder, a lifted black point,
   saturation, warm midtones against cooled shadows, vignette, grain, and a pixel of lens fringing at the
   corners. Constant-tuned against the reference film, not by eye — see *Verified* below.

## What it is not

It does not replace the lighting presets. `Look.tsx` still decides where the light is and what colour it is;
shaders decide how the camera sees it. The reference film's richness is about 70% lighting and 30% grade.

## Verified, and by how much

Two scripts now decide this instead of a pair of eyes:

- `scripts/look-metrics.py` takes a picture apart into the things a shader does — warmth (mean R−B),
  saturation, how much light the frame holds, bloom, sky ramp, sky texture, vignette, soft edges, grain —
  and prints them next to the reference film's own numbers, measured with the same script.
- `scripts/shader-sim.py` pushes a real frame through the grade's maths and scores it against those
  numbers, so constants can be tuned in seconds instead of one Actions render at a time.

The reference (*His Dad Kept Punching The Same Tree For An HOUR..*, 32 frames) measures
warmth **+82**, saturation **77**, luma **17–198**, clipped **0.6 %**, glow **1.05x**, sky texture **7.2**,
soft edges **0.78**, grain **1.4**.

Measured on the scenery bench (`scenery-day`, before → after this pass of work):

| | before | after | reference |
|---|---|---|---|
| warmth (R−B) | +1.3 | **+54** | +82 |
| saturation | 48.5 | 46–68 | 77 |
| sky texture | 0.44 | 1.1–3.1 | 7.2 |
| blacks (p2) | 45 | 54 | 17 |
| soft edges | 0.88 | 0.89 | 0.78 |

Warmth and the black point moved most of the way to the reference. Sky texture is the gap that is
still open: the cloud layer is in, but it reads softer than the reference's. That is the next thing
to turn up — `cloudScale` and `clouds` on the outdoor looks in `Look.tsx`.

## Known gaps

- The sun disc is rarely in frame in our current camera language; when it is, it blooms.
- Shafts have no depth test: a roof cannot block one. Strength is a whisper by default for that reason.
- Cloud is a flat noise layer, not volume. It reads softer than the reference's sky.
- Sky is only visible outdoors. Interiors get bloom and grade, nothing else.

## The scenery bench

`src/scenery.tsx` is a shader test bench, registered as three compositions (`scenery-day`, `scenery-sunset`,
`scenery-night`) and deliberately kept out of `src/videos` so the film contract does not apply to it. One meadow,
one cottage, three oaks, three lenses: wide, medium, close.

Render stills without touching a film:

```
gh workflow run stills.yml -f composition=scenery-day -f frames=20 -f commit_review=true
```

Frames land in `review/scenery-day/`. Change the look in `src/scenery.tsx`, push, run again — that is the whole
loop for testing the grade.
