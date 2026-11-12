# The Sunday ride — standalone SVG test

## Open it

Download **[`pelican-riding-a-bicycle.html`](../pelican-riding-a-bicycle.html)** and open it in a modern browser.
That is the entire deliverable. No installation, server, build, or internet connection is required.

A white pelican in a cycling cap takes a coral bicycle along the coast, with a fish in the basket.
The drawing replaces the earlier pier illustration at the same filename; it is not an unmodified copy of that file.

- All artwork is inline SVG: paths, gradients, patterns, reusable shapes, and a subtle SVG grain filter.
- Inline CSS handles layout and animation. There is **no JavaScript**, canvas, bitmap image, embedded video,
  downloaded font, or third-party library in the HTML.
- The native **Pause ride** checkbox freezes every moving part. Click again to resume at the same phase.
  Keyboard: **Tab**, then **Space**. The focus outline appears around the visible control.
- The phone layout crops the scenery, not the pelican or bicycle.
- An operating-system/browser **reduced-motion** preference shows the composed initial pose, hides the pause
  control, and explains why the illustration is still. Printing is static too.

## Details worth inspecting

The two legs are articulated, not whole-leg rotations. Each shin meets the ankle of its webbed foot, while the
feet and pedals remain level. Opposite crank phases keep the feet half a revolution apart.

| Geometry / timing | Value |
|---|---|
| Rear / front axle | `(390, 650)` / `(797, 650)` |
| Outside tyre radius | `104` SVG units |
| Crank centre / radius | `(552, 654)` / `44` |
| Hip | `(488, 501)` |
| Thigh / shin length | `108` / `114` |
| Ankle relative to pedal spindle | `(-14, -11)` |
| Pedal revolution | `3.6 s` |
| Wheel revolution | `2.4 s` |
| Gearing | `36:24`, or `3:2` |
| Road travel per wheel revolution | `2π × 104 = 653.451272` units |

The four limb animations contain 72 intervals each, calculated in advance with two-bone inverse kinematics:

```text
D = ankle_target - hip
knee = acos((dot(D,D) - thigh² - shin²) / (2 × thigh × shin))
thigh_angle = atan2(D.y,D.x) - atan2(shin × sin(knee), thigh + shin × cos(knee))
```

The resulting angles are plain CSS keyframes in the downloadable HTML. Nothing calculates them at runtime.
Placement wrappers and animated groups are separate, so a spinning wheel cannot overwrite its axle position.
Spokes, reflectors and valves turn together; the frame, fenders, saddle and handlebars do not.

Secondary motion includes the scarf, breathing, blinking, a fish tail, bobbing boats, gulls, clouds and water.
Every animated element has the `motion` class, which is the shared pause/reduced-motion switch.

## Checks

Run the source checks with Python 3.9+ and its standard library only:

```bash
python3 scripts/check-pelican.py
npm run typecheck
npm run check
```

The Python checker reads the **published HTML**, checks its references and no-dependency contract, then samples
14,402 leg poses, including points between keyframes. The maximum ankle error measured is **0.06194 SVG units**;
its failure threshold is 0.20. It also checks gearing, pedal counter-rotation, road travel and tile spacing.

Browser checks performed in headless Chromium, with JavaScript disabled and networking offline:

- Direct `file://` opening; no console errors and no network requests.
- Native keyboard and pointer pause/resume, including preservation of animation time.
- Actual SVG transformation matrices at 145 points through a full pedal cycle: attached ankles, level pedals,
  fixed axle centres.
- Widths **320, 360, 390, 600, 768 and 1440 px**: no horizontal page overflow and no clipped rider.
- Reduced-motion and print modes: no running animations.
- Visual review of the four quarter-cycle poses and desktop / phone layouts.

Browser tooling and diagnostic screenshots were kept in ignored `out/`, not added as project dependencies or
committed as deliverables. Only Chromium was browser-tested; no claim of a Safari/Firefox test is made.

Both framework commands pass. `npm run check` still reports the two pre-existing camera-boundary warnings in
`the-hallway` and `the-schedule`; those films were not changed. No Remotion still, video render, narration recording,
or cloud render was started for this task.

## Framework boundary

All **21 existing Markdown files** were read before this test, including `AGENTS.md`, every `docs/` contract,
both templates, the In This Town playbooks and reference studies, and the current film's narration.
The registry, composition, scene/timing and camera implementation were also studied.

This is a separate HTML/SVG capability test requested by the owner, **not a Remotion film**. It is intentionally
not registered in `src/registry.ts`, and the strictly-3D film rules have not been weakened to accommodate it.
Future base shorts still follow the continuous-world, roughly 20-second contract; In This Town follows its
voice-timed, hard-cut topic contract and requires script approval before production.
