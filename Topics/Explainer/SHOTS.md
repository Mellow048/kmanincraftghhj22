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

## 2. Visuals + Motion Is Mandatory (No Static PowerPoint Slides!)

**Every single shot must show physical acting AND bold camera movement (`>= 0.65m` travel or `>= 22°` orbit):**
- **Never freeze characters in `"idle"`, `"hold"`, `"point"`, or `stage: () =>` across a shot.** Actors must walk (`route(p)` / `animDistance`), lunge, hand over items, recoil on `wordAt`, react with expressions/head turns, and interact with flying/spawning props (`CoinStack`, `FloatingNumber`, `BreadShelf`, `Printer`).
- **Use the full `cam.*` toolkit from `src/engine/cam.ts`** (never repeat the same angle twice in a row, and never write `< 0.45m` nudges):

- **`cam.push` / `cam.whip`**: Open on climax (`dist: 4.2 -> 3.0`), track moving characters (`on: start, onTo: end`), punch into shock/discovery (`2.5 -> 1.6`), or whip-pan across rival armies (`>= 25°`).
- **`cam.orbit`**: Swing boldly (`yaw: -28 -> 24`, `dist: 4.3 -> 3.4`) around a council table, throne dais, or voting queue so the 3D set depth visibly moves across frame.
- **`cam.crane`**: Start low beside `CitizenLead` and crane up (`fromPitch: -10 -> toPitch: 24`, `dist: 4.5 -> 3.6`) to reveal battlements or towering piles of goods/coins.
- **`cam.ots` / `cam.truck`**: Shoot dialogue over the shoulder (`push: 0.8`) or track linearly (`cam.truck`) alongside walking characters.
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
