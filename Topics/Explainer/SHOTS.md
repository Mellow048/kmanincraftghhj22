# Directing & Camera Guide (`SHOTS.md`)

> Measured against **[`reference/napoleon/README.md`](reference/napoleon/README.md)**: `44 cuts` in `80.93s` (`0.54 cuts/s`, **`1.67s` median shot duration**).

The remastered Explainer uses **`storyScene`** (hard cuts + kinetic camera moves + intra-line `cut:` switches), NOT slow passive floating cameras.

---

## 1. The Cut Rhythm (`1.1s–1.9s` Median Shot)

A single `3.5s` sentence almost always holds **2 visual shots**:
1. Main shot at `cue: "4.fix"` (`t = 0..1.7s`): `EliteLead` marches into the hall and tears off the old crooked sheets.
2. Sub-shot with `cut: 1.7`: close-up push on `<RuleBoard mode="order" />` locking cleanly into place with gold trim!

```tsx
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Fast Order",
  shots: [
    {
      cue: "4.fix",
      ...cam.push({ on: [0, 1.3, 0], dist: 3.4, to: 2.7, yaw: 18, pitch: 8, fov: 42 }),
      zone: "hall",
      note: "EliteLead enters briskly and clears messy rule sheets while officers flank behind him.",
      stage: (t) => <CouncilMarch t={t} order={false} />,
    },
    {
      cue: "4.fix",
      cut: 1.6,
      ...cam.push({ on: [0, 1.8, -2.6], dist: 2.2, to: 1.75, yaw: 0, pitch: 2, fov: 38 }),
      zone: "hall",
      note: "Hard insert onto the bulletin board as one clean charter replaces four crooked sheets.",
      stage: (t) => <RuleBoardInsert t={t} />,
    },
  ],
});
```

---

## 2. Camera Variety Inside Every Beat

Use the full `cam.*` toolkit from `src/engine/cam.ts` (never repeat the exact same angle twice in a row):

- **`cam.push` / `cam.whip`**: Open on climax (`dist: 3.8 -> 2.8`), punch into shock/discovery (`1.4 -> 1.0`), or whip-pan across rival armies.
- **`cam.orbit`**: Swing smoothly around a council table (`yaw: -24 -> 18`), throne dais, or voting queue so the 3D set depth reads clearly.
- **`cam.crane`**: Start low at `CitizenLead`'s shoulders and crane high up past castle battlements (`CastleGateWall`), OR drop from overhead plaza crowd straight down to `<BallotBox>`.
- **`cam.ots`**: Over-the-shoulder shots during confrontations, bribes, crowning moments (`EliteLead` snatching `<Crown>` right over `Official`'s shoulder!).
- **`fitHeight` & `screenOffset`**: Keep the upper 55% framing the action cleanly above captions (`y: 0.67`). Leave bottom-left clean when `<ChatToast>` pops!

---

## 3. Loop Matching Rule (First Shot == Final Shot)

For an infinite loop:
- **Opening shot (`scene1`, Shot 1)** and **Closing shot (final `sceneN`, last `cut:`)** share the **identical stage setup, camera position/angle, lighting, and character climax pose** (`EliteLead` raising `<Crown>` onto his own head in the throne hall).
- Because the ending line cuts mid-sentence (`"...and that's"`), when YouTube replays from `00:00` (`"Napoleon, explained using Minecraft."`), the visual frame continues without an awkward black jump!

---

## 4. World Staging (`world.tsx` + `<Zone>`)

Divide distinct locations with `<Zone name="hall">`, `<Zone name="square">`, `<Zone name="history">`:
- Every set uses grounded textured Minecraft floors (`stoneBrick`, `cobble`, `planks`, `grass`) and rich walls (`DetailedBookshelf`, `RuleBoard`, `BannerFlag`, `CastleGateWall`, `StoneBillboard`).
- Mount mandatory atmosphere on lit zones (`GodRay`, `LightPool`, `Glow`, `Dust`) and keep **median luma >= 90** (`overworld-day` / `overworld-golden` + warm wall sconces outdoors/indoors).
- Never stage against empty flat gray background void — frame windows, battlements, trees, banners, or crowds behind every shot.
