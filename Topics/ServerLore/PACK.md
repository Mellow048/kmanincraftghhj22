# The Server Lore Pack (`PACK.md`)

Everything a Server Lore film needs comes from one entrypoint:

```ts
import {
  ServerPlayer,
  ServerCrowd,
  BadgePop,
  TearDrops,
  FloatingHeart,
  ServerChatBox,
  ScoreboardWall,
  Clock3AM,
  OpeningChest,
  WritableBook,
  SculkSensor,
  RedstoneLamp,
  RedstoneLine,
  ObsidianLavaPit,
  DeskSetup,
  HospitalCorridor,
  ClassroomRoom,
  OwnerCrown,
  // Shared engine & town helpers
  cam,
  storyScene,
  wordClock,
  ease,
  pop,
  ramp,
  jolt,
  Villager,
  Hut,
  Tree,
  Water,
  Clouds,
  Sign,
  Bed,
  ChatToast,
  FloatingNumber,
  Creeper,
  Zombie,
  SubscribeSign,
} from "../../../Topics/ServerLore";
```

**Rule:** Never draw HTML overlays (`<div>`) for server chat, nametags, clocks, or counters, and never build bare cubes for desks, chests, books, or Sculk. Every prop below is rich multi-part 3D geometry ready for `shaders: true`.

---

## 1. Cast & Expressive Badges (`cast.tsx`)

| Component | Purpose | Key Props |
|---|---|---|
| **`ServerPlayer`** | Styled Minecraft avatar with distinct skins/jackets + floating 3D `nameTag` + `!`/`?`/`<3` `badge` + animated crying **`tears`** | `name` (preset `"hero" \| "owner" \| "mom" \| "bully" \| "friendA" \| "friendB"` or `skin`/`shirt`/`hair`), `nameTag`, `nameTagYaw`, `badge` (`"!" \| "?" \| "heart" \| "skull"`), `tears` (`0..1`), `crown`, plus all `MinecraftAvatar` props (`animation`, `blendTo`, `blend`, `face`, `lookAt`, `pose`) |
| **`ServerCrowd`** | Animated group of server members running, reacting, or placing torches together | `members` (names/offsets), `animation`, `badge`, `time` |
| **`BadgePop`** | Crisp floating 3D speech/reaction box (`!`, `?`, heartbreak, heart) above any head | `kind`, `position`, `rotationY`, `popIn` |
| **`TearDrops` / `FloatingHeart`** | Pixel-tear streaks falling from eyes / warm rising floating voxel hearts for payoff moments | `t`, `intensity` |

---

## 2. Minecraft SMP & Redstone/Deep Dark Props (`props.tsx`)

| Component | Purpose | Key Props |
|---|---|---|
| **`ServerChatBox`** | Stacked multi-line 3D floating Minecraft chat window (`<Owner> Wait.`, `Anna joined the game`, whisper gold text) | `lines` (`{ sender?, text, color?, whisper? }[]`), `position`, `rotationY`, `scale` |
| **`ScoreboardWall`** | Architectural stone/oak spawn scoreboard header + ranked pixel rows (animate numbers live, e.g. `47 -> 48 -> 0`) | `title`, `rows` (`{ label, value, color? }[]`), `position`, `rotationY` |
| **`Clock3AM`** | Glowing bedside/HUD timestamp display (`3:00 AM`, alarm ring pulse) + optional alarm bell bounce | `text`, `alarm` (`0..1`), `color`, `position`, `rotationY` |
| **`OpeningChest` / `WritableBook`** | Hinged multi-part plank chest (`open: 0..1`) holding glowing book or treasure pile + standalone feather-quill book | `open`, `contents` (`"book" \| "gold" \| "empty"`), `position`, `rotationY` |
| **`SculkSensor` / `RedstoneLamp` / `RedstoneLine`** | Deep Dark deepslate base with glowing cyan flapping tendrils (`active: 0..1` + `Glow`) wired via glowing crimson `RedstoneLine` into dark-brown/warm-gold `RedstoneLamp` blocks | `active` (`0..1`), `lit` (`0..1`), `from`, `to` |
| **`ObsidianLavaPit`** | Glowing bubbling lava cauldron/pit with embers & obsidian rim (for tragic griefing/disposal beats) | `t`, `size`, `position` |

---

## 3. Real-World Cutaway Sets (`places.tsx`)

| Component | Purpose | Key Props |
|---|---|---|
| **`DeskSetup`** | Gamer/student wooden desk, dual/wide glowing computer monitor running Minecraft, illuminated RGB/white keyboard, mouse, mug, desk lamp, and ergonomic chair | `screenText`, `screenColor`, `lampOn`, `position`, `rotationY` |
| **`HospitalCorridor`** | Night-shift hospital hall for IRL nurse/parent scenes: tiled floor, locker/bed doors, warm/cool overhead panels, glowing green EXIT sign, wall monitor, phone-in-hand waiting bench | `position`, `rotationY`, `length` |
| **`ClassroomRoom`** | School classroom set: green chalkboard (`wordTexture` title), teacher podium, 4–6 multi-part oak student desks + chairs facing front | `boardText`, `rows`, `cols`, `position`, `rotationY` |
