# The Remastered Explainer Pack (`PACK.md`)

Everything an Explainer film imports comes through one entrypoint:

```ts
import {
  CitizenLead, EliteLead, Official, ExplainerCrowd, NameTag,
  DetailedBookshelf, RuleBoard, RuleScroll, CouncilTable, OpenBook, Lectern,
  RoyalThrone, RoyalCarpet, Crown, CrownCushion, BannerFlag, BallotBox,
  StoneBillboard, CastleGateWall, TopHat, PeakedCap, Spectacles,
  Coin, CoinStack, CoinPile, Bill, BillStack, MoneyBag, Chest, Printer,
  PriceTag, Bar, BarChart, Arrow, Balance,
  Bread, Apple, Crate, BreadShelf,
  ChatToast, FloatingNumber, Chicken, Water, EmberDrift,
  cam, storyScene, Figure, Icon, Voxels, wordClock, pop, ramp, ease, jolt,
} from "../../../Topics/Explainer";
```

> **STRICT ANTI-BOX & CHANNEL IDENTITY RULE:**  
> 1. Use **`CitizenLead` + `EliteLead`** (NEVER `InThisTown` `Hero` or `Villager` clones).  
> 2. Use multi-part composite props below — **NEVER drop a bare single cube and pretend it is a bookshelf, open book, throne, crown, or ballot box.**

---

## 1. Signature Explainer Cast (`cast.tsx`)

| Component | Role | Signature Look | Key Props |
|---|---|---|---|
| **`CitizenLead`** | **Character 1 (Miles):** Struggling / worker / mistake-maker | Copper-auburn `hairLayer`, terracotta work coat + cream placket + messenger satchel strap, wire spectacles, slate trousers, sneakers | `glasses`, `satchel`, `nameTag`, `animation`, `arms`, `face`, `lookAt`, `pose` |
| **`EliteLead`** | **Character 2 (Sterling):** Rich / put-together / ruler / pres | Champagne-blonde or commander `hairLayer`, midnight navy coat with brass buttons & white belt (`"general"`) OR silk crimson tie & gold clip (`"pres"`) OR top hat (`"tycoon"`), gold rim | `variant` (`"pres" \| "general" \| "tycoon"`), `crown`, `nameTag`, `animation`, `arms`, `face`, `pose` |
| **`Official`** | Moderator, Supreme Judge, Pope, Bank Clerk | Crimson velvet robe + peaked cap (`"mod"`), white ceremonial robe + gold-trim mitre (`"pope"`), or black judicial robe (`"judge"`) | `role` (`"mod" \| "pope" \| "judge"`), `children` (e.g. `<CrownCushion />`) |
| **`ExplainerCrowd`** | Citizens, top-hat townsfolk, uniformed soldiers | Multi-toned citizens, historic top-hat wearers (`"historical"`), or blue-coated peaked-cap troops (`"soldier"`) | `positions`, `rotationY`, `style` (`"citizen" \| "historical" \| "soldier"`), `animation` |
| **`NameTag`** | Translucent dark nameplate above a character | Matches `[Paul]` / `[Leon]` introduction callouts | `text`, `position`, `rotationY`, `accent` |

---

## 2. Detailed Multi-Part Props (`props.tsx`)

| Component | What It Builds | Replaces Lazy Single-Box Mistake |
|---|---|---|
| **`DetailedBookshelf`** | Oak carcass, recessed back panel, 2 shelves, 14+ multi-colored book spines + cream page tops + gold bands | Replaces plain brown cube "bookshelf" |
| **`RuleBoard`** | Framed oak bulletin board with pinned inked parchments (`mode="chaos"` crooked papers vs `mode="order"` single royal charter) | Replaces blank wall block "rules" |
| **`RuleScroll`** | Parchment sheet with colored header bar, pixel ink lines, red wax seal | Replaces white square paper |
| **`CouncilTable`** | Long dark-oak plank table on 4 legs with optional scattered inked documents | Replaces flat slab table |
| **`OpenBook` / `Lectern`** | Oak lectern + tilted open book with thick leather covers, spine gutter, cream page stacks, ink rows, ribbon | Replaces white block "book" |
| **`RoyalThrone` / `RoyalCarpet`** | Stone dais step, plush gold-piped velvet cushion, high gold-trimmed backrest + 3 gold finials, runner carpet | Replaces single stair block |
| **`Crown` / `CrownCushion`** | 4-prong gold band + sapphire/ruby jewels, either worn via `head` or resting on a fringed cream/gold cushion | Replaces yellow cube |
| **`BannerFlag`** | Bracketed oak rod + striped cloth banner + gold borders + pixel emblem (`"crown" \| "gem" \| "star" \| "up"`) | Replaces vertical colored stripe |
| **`BallotBox`** | Oak chest on base with black voting slot, sticking white parchment ballot, front brass plate, extra slips | Replaces slotted plain cube |
| **`StoneBillboard`** | Cobble architectural frame holding crisp dark signage (e.g. `"1799"`, `"99 PERCENT"`, `"DEBT x4"`) | Replaces text floating in empty void |
| **`CastleGateWall`** | Stone-brick battlement wall with crenellations and iron-strapped oak gate doors | Replaces blank flat wall |
| **`IngotStack` / `CompareChestPair` / `Pickaxe`** | Multi-bar beveled iron/gold ingots, twin `YESTERDAY` vs `TODAY` chests, wooden-handled pickaxe | Replaces unlabelled blocks in mining/output comparisons |
| **`TopHat` / `PeakedCap` / `Spectacles`** | Multi-part 3D headwear & eyewear attached to `MinecraftAvatar` `head` prop | Instant silhouette differentiation |

---

## 3. Money, Charts & Goods (`money.tsx`, `charts.tsx`, `goods.tsx`, `src/engine`)

- **Money:** `Coin`, `CoinStack`, `CoinPile`, `Bill`, `BillStack`, `MoneyBag`, `Chest` (animated `open` + overflowing `gold`), `Printer` (`running`, printing `out`).
- **Numbers & UI in 3D:** `PriceTag`, `Bar`, `BarChart`, `Arrow`, `Balance`, `FloatingNumber` (`"+$100"`, `"-90%"`, `pop`), `ChatToast` (`"[Vote] Should Sterling rule for life?"`, `"[Vote] YES: 99%"`).
- **Goods & World Craft:** `Bread` (crust + golden scored top), `Apple`, `Crate`, `BreadShelf`, `Water`, `EmberDrift`.

---

## 4. Camera & Timing Helpers (`src/engine`)

- `storyScene(timing, { id, title, shots })` — fast story cuts + `cut: <sec>` multi-shot lines.
- `cam.push`, `cam.orbit`, `cam.pan`, `cam.whip`, `cam.crane`, `cam.ots`, `cam.truck`, `cam.top` — always pass moving cameras or justified holds.
- `wordClock(timing)` -> `wordAt(cue, word)` — hang animations, `ChatToast`, prop swaps, and face changes directly on the spoken syllable!
