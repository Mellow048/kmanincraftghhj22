import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, Villager, ROBE, timing, wordAt, ramp, FearGhost, Cart, Coins, Bottle } from "./kit";

const STAND: Vec3 = [6.4, 0, -1.2];
const FEAR_AT: Vec3 = [6.9, 0, -1.0];
const WATCHING = wordAt("12.watching", "watching");

/** THE UNDERSTANDING — it was watching while he poured. The witch was holding it still. Greedy still staring. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "What it was doing",
  shots: [
    {
      cue: "12.clear",
      ...cam.push({ on: [6.7, 1.05, -0.9], dist: 2.6, to: 2.1, yaw: 22, pitch: 6, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'When the cart cleared the corner I saw what my fear had been doing': over feared shoulder — cart now past, road clear, fear still watching where cart was.",
      stage: (t) => (
        <>
          <FearGhost position={FEAR_AT} rotationY={-1.57} />
          <Hero position={STAND} rotationY={-0.15} animation="idle" face="uneasy" lookAt={[6.9, 0.55, -1.0]} />
          <Cart position={[1.0 + t * 0.2, 0, 3.8]} />
        </>
      ),
    },
    {
      cue: "12.watching",
      ...cam.push({ on: [6.65, 0.55, -0.7], dist: 2.1, to: 1.75, yaw: 12, pitch: 4, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'It had been watching the road while I poured': split focus — his hands pouring soft, fear sharp watching road. The lookout he fired.",
      stage: (t) => (
        <>
          <Hero position={STAND} animation="hold" face="uneasy" />
          <FearGhost position={[6.9, 0, -0.7]} rotationY={-1.57} />
        </>
      ),
    },
    {
      cue: "12.never",
      ...cam.push({ on: [0.2, 1.15, 60.6], dist: 2.6, to: 2.1, yaw: -14, pitch: -2, fov: 38 }),
      zone: "shop",
      look: "warm-room",
      note: "'No one had taken it. I had left it there': shop shelf — his yellow bottle alone where he left it, not bought, just left.",
      stage: () => (
        <>
          <Villager position={[-1.6, 0, 60.5]} robe={ROBE.elder} lookAt={[0.2, 0.4, 60.6]} phase={2.2} />
          <Bottle position={[0.2, 1.05, 60.6]} color="#ffe66b" />
        </>
      ),
    },
    {
      cue: "12.held",
      ...cam.push({ on: [-0.1, 1.4, 60.4], dist: 1.85, to: 1.5, yaw: 18, pitch: -4, fov: 34 }),
      zone: "shop",
      look: "warm-room",
      note: "'The witch had just been holding it still': witch's hands over bottle, keeping it still — not stealing, holding. She knew the price.",
      stage: (t) => (
        <>
          <Villager position={[-0.9, 0, 60.8]} robe={ROBE.elder} lookAt={[0.1, 0.45, 60.6]} phase={2.2} lean={0.18} />
          <Bottle position={[0.2, 1.05, 60.6]} color="#ffe66b" />
        </>
      ),
    },
    {
      cue: "12.greedy2",
      ...cam.push({ on: [8.5, 0.95, -0.8], dist: 2.4, to: 1.95, yaw: -26, pitch: 6, fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'Rich man still staring — no one left to copy': payoff of mimic — street empty around him, he stares at coins, no one to copy now.",
      stage: () => (
        <>
          <Villager position={[8.5, 0, -0.8]} robe={ROBE.smith} lookAt={[8.5, 0.4, 1.0]} phase={1.4} />
          <Coins position={[8.5, 0.38, -0.15]} amount={8} />
        </>
      ),
    },
  ],
});


