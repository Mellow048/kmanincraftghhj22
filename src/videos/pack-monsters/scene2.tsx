import { Vox, useTime } from "../../engine";
import { Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie } from "../../../Topics/InThisTown";
import { defineScene } from "../../engine";
import { LENS } from "./one";

export const scene2 = defineScene({
  id: "scene2",
  title: "Pack preview 2",
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
      <Skeleton position={[-0.9, 0, 1]} lookAt={LENS} mood="happy" wave={1} />
      <Skeleton position={[0.1, 0, 0.5]} bow mood="angry" scarf={MONSTER.scarfBlue} lookAt={LENS} />
      <Creeper position={[1.0, 0, 1.2]} lookAt={LENS} mood="sad" fuse={t > 1.2 ? 0.8 : 0} />
      <Creeper position={[-0.2, 0, 1.9]} scale={0.6} mood="happy" hat="straw" lookAt={LENS} />
    </>
  );
},
});
void [Vox, useTime, Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie];
