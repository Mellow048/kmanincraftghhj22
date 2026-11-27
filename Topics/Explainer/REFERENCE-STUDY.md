# Explainer Reference Study — Script Flow, Character Motion & Camera Grammar

Modeled on the viral **`Inflation, explained using Minecraft`** reference (`75.8s`, `237 words`, ~188 WPM, seamless loop). Study **how it flows, how characters move, and how the camera glides** — never copy the topic directly.

---

## 1. How the Script Flows (8-Step Loopable Formula)

Plain 9-year-old English (`8–13 words/sentence`, zero jargon, zero textbook lecturing):

1. **Cold Title Hook (`0:00–0:02`):** `"[Concept], explained using Minecraft."` (Right over the signature visual — e.g. `10` emerald shop stall + raining emeralds.)
2. **Concrete Setup (`0:02–0:09`):** One relatable character + one clear goal + one number (`"A diamond pickaxe costs 10 emeralds. Paul has been saving up for one all week..."`).
3. **The Shock Flip (`0:09–0:14`):** The rule breaks right in their face (`"But when he gets to the villager, the price has gone up to 20. Same villager, same pickaxe. So what happened?"`).
4. **The Cause in Plain Action (`0:14–0:33`):** `"Well, the mods wanted to [goal], but they didn't have enough [resource]. So they [action]..."` Show the chain reaction step by step (`typed a command -> spawned 1,000 -> builders got paid -> spent them everywhere -> villager asks for more`).
5. **The 3-Part Clarity Punch (`0:33–0:44`):** Kill the wrong assumption in three short parallel lines, then name the concept:
   * `"The villager isn't being greedy, the pickaxe didn't get more valuable. Paul's emeralds just got more common. That's inflation."`
   * Follow with a 1-sentence kid-simple definition (`"When there's more money going around but the same amount of stuff to buy, every emerald buys a little less."`).
6. **Who Wins vs. Who Loses (`0:44–0:55`):** Contrast the saver vs. the early spender with a physical prop (`"Paul's 10 emeralds used to be a whole pickaxe. Now they're half of one. Meanwhile, the builders spent their emeralds first..."`).
7. **Real-World Bridge (`0:55–1:07`):** One crisp 1-to-1 mapping (`"In the real world, the mods are the government. And when a government prints a lot of new money..."`).
8. **Debate-Bait Question + Seamless Loop (`1:07–1:16`):** Ask a two-sided question that sparks comments (`"So whose fault is it...? Is it Paul's for [A], or the mods' for [B]?"`), then cut back to the **exact Frame-0 shot** mid-sentence (`"And that's..."` -> loops into `"[Concept], explained using Minecraft."`).

---

## 2. How the People Move (Zero Stiff Talking Heads)

Every character is doing a **readable physical verb** on screen — never standing idle while the narrator talks:
* **Saving / Working (`0:04–0:08`):** Paul swings his arm mining while a `MON -> WED -> SUN` sign flips and emeralds fly up into a growing `FloatingItemPyramid` (`1 -> 3 -> 6 -> 10`) over his head.
* **Walking into the Reveal (`0:08–0:11`):** Paul walks right across the path from his house to the `ShopStall`; the second `10` explodes into `20`, he throws BOTH arms up in shock (`scared`/`panic`) and shrugs (`shrug`) with `?` badges popping over his head.
* **Authority Action (`0:15–0:22`):** Both Mods point at the `REBUILD SPAWN` sign, type on the `CommandBoard` (`> /give @mods emerald 1000`), and throw their hands up cheering as an `EmeraldFountain` rains down over them.
* **Crowd Chain Reaction (`0:23–0:33`):** Builders in yellow hard hats physically place deepslate blocks, then sprint across the grass holding emeralds above their heads, crowding the `ShopStall` while handing emeralds to the villager.
* **Physical Metaphors (`0:39–1:06`):** `MONEY` emerald pyramid vs. `STUFF` pickaxes/iron; `Balance` scale tipping as a pickaxe splits in half; `Printer` spitting green bills in front of a `GOVERNMENT` building; `OrbitingItemRing` of 10 emeralds spinning in front of Paul.

---

## 3. How the Camera Moves (Smooth Pans & Trucks — Zero Dizzying Orbits)

* **Lateral pan/truck transitions connect ideas visually:**
  * Pan right from Paul's house (`0:08`) straight to the Villager's `ShopStall` (`0:09`).
  * Pan right from the `MONEY` emerald stack (`0:40`) straight to the `STUFF` pickaxe pile (`0:42`).
  * Pan left to Paul (`1:09`, `"Is it Paul's..."`) then pan right to the Mods (`1:12`, `"or the mods'..."`).
* **Front-facing 9:16-safe distance (`dist: 4.8–6.5m, fov: 44–46°`):** Every giant sign (`PriceBillboard`, `CommandBoard`, `THE MODS`), `Balance` scale, and floating emerald pyramid fits cleanly inside the vertical frame with zero edge cropping.
* **Zero 360° orbit spam:** Uses clean `cam.push`, `cam.front`, `cam.twoShot`, and `cam.truck` for ~90% of the video.

---

## 4. Full Reference Script (237 words · 75.8s · Study Flow Only)

> Inflation explained using Minecraft. A diamond pickaxe costs 10 emeralds. Paul has been saving up for one all week and tonight he finally has 10 emeralds. But when he gets to the villager, the price has gone up to 20. Same villager, same pickaxe. So what happened? Well, the mods wanted to rebuild spawn, but they didn't have enough emeralds to pay the builders. So they typed in a command and spawned a thousand new emeralds out of thin air. The builders got paid and spent them all over the server. Now there are way more emeralds going around, but there are still the same number of pickaxes. So the villager can ask for more and people will still pay it. The villager isn't being greedy, the pickaxe didn't get more valuable. Paul's emeralds just got more common. That's inflation. When there's more money going around but the same amount of stuff to buy, every emerald buys a little less. And the person who loses the most is the one who saved. Paul's 10 emeralds used to be a whole pickaxe. Now they're half of one. Meanwhile, the builders spent their emeralds first before the prices caught up. In the real world, the mods are the government. And when a government prints a lot of new money to pay for things, the same thing happens. Your savings don't disappear, they just buy less. So Paul still got his 10 emeralds, they just aren't a pickaxe anymore. So whose fault is it that Paul can't afford the pickaxe? Is it Paul's for not working harder or the mods for spawning in all those emeralds? And that's... *(loops straight into Frame 0)*
