# Shaders: the look, and how to switch it on

`src/engine/shaders.tsx` gives every film a real post-processing chain and a painted sky. It is **off by
default**, so no delivered film changes under you. One line turns it on:

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
   `overworld-storm`, `town-day`, `street-day` and `lava-shore` all have one.
2. **Bloom** (`UnrealBloomPass`). Only genuinely over-bright things glow. The threshold is **above 1.0 on
   purpose**: a white caption is exactly 1.0 in linear light, so words stay crisp and the sun, torches and
   lanterns bloom. At 0.94 captions turned into fuzzy white blobs — do not go back there.
3. **Output** (`OutputPass`). **Required.** A composer renders into a render target, and three only applies
   tone mapping when it draws to the canvas; without this pass the film comes out linear and dark. This one
   mistake cost a whole render cycle: the frame looked like the lights had been turned off.
4. **Grade** (custom shader): saturation, contrast, warm highlights against cool shadows, vignette, a whisper
   of grain, and a pixel of lens fringing at the corners. Subtle by design — heavy grading on block art reads
   as an Instagram filter, not as sunlight.

## What it is not

It does not replace the lighting presets. `Look.tsx` still decides where the light is and what colour it is;
shaders decide how the camera sees it. The reference film's richness is about 70% lighting and 30% grade.

## Verified

Rendered with the `stills.yml` workflow on `in-this-town-monster-village`, frames 900 and 1500 —
`review/in-this-town-monster-village/`. Captions crisp, sunlit stone warm, grass saturated, sky gradient
visible above the roofs.

## Known gaps

- The sun disc is rarely in frame in our current camera language; when it is, it blooms.
- No volumetric shafts yet: `GodRay` cards do that job, and they bloom with the pass on.
- Sky is only visible outdoors. Interiors get bloom and grade, nothing else.
