import { Vox, useTime } from "../../engine";
import { Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie } from "../../../Topics/InThisTown";
import { defineScene } from "../../engine";
import { LENS } from "./one";

export const scene1 = defineScene({
  id: "scene1",
  title: "Pack preview 1",
  duration: 4,
  shots: [
    {
      at: 0,
      dur: 4,
      from: [1.54, 1.4, 5.4],
      to: [-1.54, 1.3, 4.96],
      target: [0, 1.1, 1],
      fov: 42,
      ease: "inOutSine",
      note: "Pack preview: the monsters, turned slowly past, with a villager for scale.",
    },
  ],
  Component: () => {
  const t = useTime();
  return (
    <>
      <Zombie position={[-0.75, 0, 1]} lookAt={LENS} mood="happy" scarf={MONSTER.scarfRed} walk={t * 0.4} />
      <Zombie position={[0.5, 0, 1.3]} baby mood="scared" lookAt={LENS} hat="bow" />
      <Zombie position={[1.1, 0, 0.4]} arms={0} wave={1} mood="angry" shirt="#9a5a2a" hat="straw" lookAt={LENS} />
    </>
  );
},
});
void [Vox, useTime, Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie];
