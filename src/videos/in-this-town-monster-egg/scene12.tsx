import { cam, storyScene } from "../../engine";
import { MonsterEgg } from "../../../Topics/InThisTown/creatures";
import { Blanket, Bottle, Bread, CARRIED, Hero, OpenBag, Rope, TorchItem, carried, pop, room, timing, wordAt } from "./kit";

const BAG = room(0.6, 0.04, 0.5);
const STANDS = room(0.2, 0, -0.5);
const AT = {
  bread: wordAt("12.pack", "bread"),
  water: wordAt("12.pack", "water"),
  rope: wordAt("12.pack", "rope"),
  torch: wordAt("12.pack", "torch"),
};

/** PACKING. The long shot of the film: four things, each landing on its word. Then the one that matters. */
export const scene12 = storyScene(timing, {
  id: "scene12",
  title: "Packing",
  shots: [
    {
      cue: "12.pack",
      ...cam.top({ on: room(0.6, 0.1, 0.5), height: 2.3, to: 3.2, spin: [10, -8] }),
      zone: "bedroom",
      look: "overworld-night",
      note: "The second held breath: straight down on the open bag, pulling back and turning, as each thing he names drops in beside it.",
      stage: (t) => (
        <>
          <OpenBag position={BAG} />
          {pop(t, AT.bread) > 0 ? <Bread position={room(0.24, 0.05, -0.2)} rotationY={0.3} scale={1.5 * pop(t, AT.bread)} /> : null}
          {pop(t, AT.water) > 0 ? <Bottle position={room(0.96, 0.05, -0.2)} rotationY={-0.4} scale={1.6 * pop(t, AT.water)} /> : null}
          {pop(t, AT.rope) > 0 ? <Rope position={room(0.24, 0.05, 1.22)} rotationY={0.2} scale={1.5 * pop(t, AT.rope)} /> : null}
          {pop(t, AT.torch) > 0 ? <TorchItem position={room(1.12, 0.05, 1.2)} rotationY={0.5} scale={1.4 * pop(t, AT.torch)} /> : null}
        </>
      ),
    },
    {
      cue: "12.blanket",
      ...cam.push({ on: [STANDS[0], 0.85, STANDS[2]], dist: 2.25, to: 1.75, yaw: -6, pitch: 8 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "'My blanket': he has taken it off his own bed, which is bare behind him. The blanket comes back at the end.",
      stage: () => (
        <>
          <Hero position={STANDS} rotationY={0} animation="hold" face="smile" />
          <Blanket position={carried(STANDS, 0)} size={[0.46, 0.2, 0.34]} />
        </>
      ),
    },
    {
      cue: "12.cold",
      ...cam.push({ on: room(0.6, 0.5, 0.25), dist: 2.35, to: 1.8, yaw: 0, pitch: 24 }),
      zone: "bedroom",
      look: "overworld-night",
      note: "'In case the thing inside was cold': the egg in the bag with the blanket tucked round it, and his face over it. He already loves it.",
      stage: () => (
        <>
          <OpenBag position={BAG} />
          <MonsterEgg position={room(0.6, 0.14, 0.5)} scale={CARRIED} cracked />
          <Blanket position={room(0.6, 0.28, 0.5)} size={[0.5, 0.2, 0.42]} />
          <Hero position={room(0.6, 0, -0.2)} rotationY={0} animation="crouch" arms="hold" face="smile" />
        </>
      ),
    },
  ],
});
