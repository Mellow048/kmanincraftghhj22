import { Vox, useTime } from "../../engine";
import { Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie } from "../../../Topics/InThisTown";
import { defineScene } from "../../engine";
import { LENS } from "./one";

export const scene5 = defineScene({
  id: "scene5",
  title: "Pack preview 5",
  duration: 4,
  shots: [
    {
      at: 0,
      dur: 4,
      from: [2.2, 1.7, 8.0],
      to: [-2.2, 1.6, 7.4],
      target: [0, 1.3, 1],
      fov: 42,
      ease: "inOutSine",
      note: "Pack preview: the monsters, turned slowly past, with a villager for scale.",
    },
  ],
  Component: () => (
    <>
      <Zombie position={[-1.3, 0, 1.2]} rotationY={0.5} mood="happy" lookAt={LENS} />
      <Skeleton position={[-0.45, 0, 0.4]} rotationY={0.3} />
      <Creeper position={[0.3, 0, 1.6]} />
      <Villager position={[1.0, 0, 0.6]} rotationY={-0.3} />
      <Enderman position={[0.2, 0, -0.8]} />
      <Slime position={[1.5, 0, 1.9]} size={0.5} mood="happy" />
      <Spider position={[-1.2, 0, 2.6]} rotationY={1.2} scale={0.7} />
    </>
  ),
});
void [Vox, useTime, Creeper, Enderman, MONSTER, Skeleton, Slime, Spider, Villager, Zombie];
