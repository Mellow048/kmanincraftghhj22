import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Hut, LampPost, Well } from "../../../Topics/InThisTown";
import { PLACE } from "./kit";

/** One street and one square. The third place is the sky, and the sky is in every shot. */
const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[80, 1, 70]} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[36, 0.06, 5]} />
    <Hut at={[-12, 0, -6]} w={6} roof="#8a3b2a" windows={[-1.6, 1.6]} />
    <Hut at={[0, 0, -8]} w={8} d={6} h={5} roof="#3f6b3a" windows={[-2.4, 2.4]} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[1.4]} />
    <Hut at={[12, 0, 9]} w={6} roof="#3d5f9a" turn={Math.PI} windows={[-1.4]} />
    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    {(
      [
        [-20, -10, 4.4],
        [18, -12, 4],
        [-18, 12, 4.2],
        [20, 11, 4.6],
      ] as Array<[number, number, number]>
    ).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h} />
    ))}
    <LampPost position={[-6, 0, 0]} seed={2} />
    <LampPost position={[7, 0, 4]} seed={3} />
    <Clouds y={40} center={[0, 0, 0]} />
    <GodRay position={[-2, 8, -2]} rotation={[0, 0, 0.4]} width={5} height={14} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={12} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 3, -2.5]} size={1.4} color="#ffe08a" opacity={0.3} />
    <Dust position={[0, 2, 1]} area={[24, 4, 12]} count={50} size={0.04} color="#fff7d8" opacity={0.55} seed={3} speed={0.2} />
  </>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <Zone name="village">
      <Village />
      {night ? <Glow position={[0, 6, -2]} size={4} color="#9bb7ff" opacity={0.15} /> : null}
    </Zone>
  );
};
