import { Vox, useTime } from "../../engine";
import { Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie } from "../../../Topics/InThisTown";
import { defineScene } from "../../engine";
import { LENS } from "./one";

export const scene3 = defineScene({
  id: "scene3",
  title: "Pack preview 3",
  duration: 4,
  shots: [
    {
      at: 0,
      dur: 4,
      from: [2.17, 1.8, 7.2],
      to: [-2.17, 1.7, 6.58],
      target: [0, 1.5, 1],
      fov: 42,
      ease: "inOutSine",
      note: "Pack preview: the monsters, turned slowly past, with a villager for scale.",
    },
  ],
  Component: () => (
  <>
    <Enderman position={[-1.0, 0, 0.6]} lookAt={LENS} carry={1} scarf={MONSTER.scarfYellow}>
      <Vox kind="grass" position={[0, 0, 0]} size={[0.6, 0.6, 0.6]} />
    </Enderman>
    <Enderman position={[1.1, 0, 0.2]} jaw={1} shake={1} mood="angry" lookAt={LENS} />
    <Villager position={[0.1, 0, 1.4]} lookAt={LENS} />
  </>
),
});
void [Vox, useTime, Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie];
