import { cam, storyScene } from "../../engine";
import { Hero, Villager, ROBE, timing, Bottle, Coins, faceOf, chestOf } from "./kit";
import type { Vec3 } from "../../engine";

const SHOP_DOOR: Vec3 = [-10, 0, -2.2];
const GREEDY: Vec3 = [8.5, 0, -0.8];

/** THREE MYSTERIES — where feelings go, why witch never leaves, why richest never smiles. */
export const scene2 = storyScene(timing, {
  id: "scene2",
  title: "Three mysteries",
  shots: [
    {
      cue: "2.from",
      ...cam.push({ on: [0, 1.2, 60.3], dist: 2.8, to: 2.2, yaw: -18, pitch: -6, fov: 38 }),
      zone: "shop",
      look: "warm-room",
      note: "'Where feelings went': push through empty glass shelves — dozens of empty bottles catching light, nothing inside. The answer isn't there.",
      stage: (t) => (
        <>
          {/* Empty shelves foreground rack focus */}
          <Villager position={[-0.8, 0, 0.4]} robe={ROBE.elder} lookAt={[0, 1.2, 60.8]} phase={2.2} />
        </>
      ),
    },
    {
      cue: "2.witch",
      ...cam.push({ on: [-10, 2.0, -3.6], dist: 5.2, to: 4.2, yaw: 8, pitch: -6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Why the witch never left her shop': the witch on her shop porch, half a block up, looking down at the square she never leaves. Her door is open but she doesn't step through.",
      stage: () => (
        <>
          <Villager position={[-10, 0.5, -3.8]} rotationY={0} robe={ROBE.elder} lookAt={[0, 1.2, 2]} phase={2.2} lean={0.08} />
          {/* Shop interior glow behind her */}
          <Bottle position={[-10, 0.95, -4.8]} color="#d8a0ff" />
          <Bottle position={[-9.4, 0.95, -4.8]} color="#6bc8ff" />
        </>
      ),
    },
    {
      cue: "2.price",
      ...cam.push({ on: [8.5, 1.0, -0.2], dist: 3.2, to: 2.5, yaw: -22, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Richest man never smiled': close on greedy man counting coins, mouth flat. Rich but blank — the warning we won't understand yet.",
      stage: () => (
        <>
          <Villager position={GREEDY} robe={ROBE.smith} lookAt={[8.5, 0.8, 1.2]} phase={1.4} />
          <Coins position={[8.5, 0.38, -0.15]} amount={16} />
        </>
      ),
    },
  ],
});
