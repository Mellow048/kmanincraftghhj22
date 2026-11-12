# Case study — *Never Look at the Moon* (19.6 s, 1080×1920, 30 fps)

Five beats, one room, one continuous camera, no cuts. The camera leaves the
bedroom through the window and comes back through it, so the last image is the
first image with its meaning turned over. Read `src/videos/never-look-at-the-moon/`
alongside this file; everything below is a number that cost a render to find.

---

## 1. The premise is a camera rule, not a monster

The moon is an eye. That only works if the audience sees it **through the
window**, at the size a window shows it, before the camera ever gets close. So:

- the moon is a 6.4 m sphere at 30 m, `y = 4.6`;
- the window is 2.0 × 1.6 m at `z = -2.38`, head at `y = 2.35`;
- from anywhere in the room the window's head **always crops the top of the
  disc**. Do not fight it. A moon too big for the window is the shot.

Compute the crop before staging the reveal. From a camera at height `c`, the
window head subtends `atan((2.35 - c) / 4.7)` and the moon's centre sits at
`atan((4.6 - c) / 32)`. At `c = 1.6` those are `9.2°` and `5.3°`, so the pupil
survives and the crown of the sclera does not. At `c = 1.9` the crop lands on
the pupil and the eye reads as a mistake. **Camera height, not aim, decides the
crop.**

## 2. The eye has to look *away* first

An eye with a pupil is a face. A face in the first frame spends the reveal. The
gaze therefore starts at `yaw = 1.5 rad` — 86°, so the pupil is a sliver on the
limb — holds through the whole hook, and rolls around only in beat 4
(`12.6 → 14.36 s`), snapping onto the lens on the last 0.24 s. The turn *is* the
reveal; nothing else in the film is allowed to be.

## 3. An iris is not concentric rings

Three hard-edged caps read as a dartboard at the size this eye gets. What fixed
it:

- a radial iris map (256 × 96) drawn in **polar coordinates**: x = angle around
  the eye, y = distance from the pupil;
- the iris cap's UVs rewritten to `u = atan2(x, z)/2π + 0.5`,
  `v = theta / capAngle` — a `SphereGeometry` cap's default UVs sample one
  smeared horizontal band of the texture;
- striations made **periodic in x**, or the tile seam shows at 12 o'clock;
- a limb-darkened sclera (`-0.06 - edge² × 0.42`), so the sphere reads round
  instead of like a pale disc;
- one 0.021 rad white cap on the pupil's edge. Bloom turns it into the glint.

## 4. 9:16 staging arithmetic

At fov `F` the vertical view is `F°` and the horizontal is
`2·atan(tan(F/2) · 9/16)`. A Minecraft head is 0.45 m wide, a body 1.8 m tall.
A head at `d` metres subtends `atan(0.45 / d)`:

| fov | distance | head fills | reads as |
|---|---|---|---|
| 46 | 1.2 m | 52 % | a slab of skin, no room |
| 50 | 2.6 m | 20 % | medium shot |
| 62 | 3.5 m | 12 % | a person in a room |

Interior shots live at **fov 48–62 and 2–3 m**. Below 1.5 m the actor stops
being an actor. Set the aim **below** the eyes (target `y ≈ 1.3` when standing)
and the head lands in the upper third without a tilt.

## 5. Three layers or it looks like a diorama

Foreground curtain, midground boy, background moon. In practice: the ray from
the lens to the boy's head had to pass **beside** the window's opening, so the
moon's disc stayed clear at the frame's left while his silhouette filled the
right. Test that relationship on a still before smoothing any camera move.

## 6. Light jobs, and the ones that lie

- **Key:** one directional light from the moon's own position, the only shadow
  caster. It lights the room, not the street.
- **Warm practical:** the bedside lamp. It is the only warm colour in the film
  and the only reason the boy is not a silhouette.
- **Bounce:** a point light *well in front* of the window (`z ≈ 0.8`). At the
  window plane it lights nothing that is in frame.
- **Town fill:** the facades across the street face the camera, so the moon key
  and a moon-direction fill both leave them black. One dim cool point light in
  the street fixes the lower third of every wide shot.
- Moonlight **cannot** be the only light on a person standing at the window: it
  is behind him. Budget a cheat.

## 7. Things that read as bugs

- a pupil that drifts behind a curtain panel → keep the gaze inside ±0.5 of the
  window's centre;
- a moon whose iris wraps the limb → `yaw` under ~1.3 rad;
- the camera overtaking an actor → an arc-length path does not slow down for
  staging. Give the actor a mark the path clears by 0.4 m, or pass over him;
- a boy cowering under a high camera → 45 % of the frame is untouched black.
  Either light him or put him at the frame's edge and keep the threat visible.

## 8. Sound

Six narration lines, one bed, one hit. Cues are in **seconds against the film
clock**, so a line can straddle a scene boundary (line 1 starts in beat 1 and
ends in beat 2). Files live in `public/audio/never-look-at-the-moon/` and are
referenced by path. The last line is placed by subtraction —
`duration - lineDuration - margin` — never by feel, or the film ends mid-word.
