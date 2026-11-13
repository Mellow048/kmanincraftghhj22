import { Vox, useTime } from "../../engine";
import { Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie } from "../../../Topics/InThisTown";
import { defineScene } from "../../engine";
import { LENS } from "./one";

export const scene4 = defineScene({
  id: "scene4",
  title: "Pack preview 4",
  duration: 4,
  shots: [
    {
      at: 0,
      dur: 4,
      from: [1.75, 1.1, 6.0],
      to: [-1.75, 1.0, 5.5],
      target: [0, 0.8, 1],
      fov: 42,
      ease: "inOutSine",
      note: "Pack preview: the monsters, turned slowly past, with a villager for scale.",
    },
  ],
  Component: () => {
  const t = useTime();
  return (
    <>
      <Spider position={[-0.9, 0, 0.3]} rotationY={0.6} lookAt={LENS} walk={t} mood="happy" hat="bow" />
      <Spider position={[1.3, 0, -0.6]} rotationY={-0.5} rear={1} mood="angry" />
      <Slime position={[0.7, 0, 1.9]} size={1} mood="happy" lookAt={LENS} />
      <Slime position={[-0.3, 0, 2.4]} size={0.5} mood="scared" squash={0.8} />
      <Slime position={[1.6, 0, 2.6]} size={0.5} mood="angry" hat="straw" squash={-0.6} />
    </>
  );
},
});
void [Vox, useTime, Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie];
