import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Hut, LampPost, Room } from "../../../Topics/InThisTown";
import { PLACE } from "./kit";

/** An open bay. The front is missing on purpose, so the camera never sits inside a wall. */
const Bay: React.FC<{ at: [number, number, number]; roof?: string }> = ({ at, roof = "#8a3b2a" }) => (
  <group position={at}>
    <Vox kind="cobble" position={[0, 0.2, -0.4]} size={[7.2, 0.4, 5.2]} />
    <Vox kind="planks" position={[0, 2.1, -2.9]} size={[7, 3.4, 0.28]} />
    <Vox kind="planks" position={[-3.5, 2.1, -0.4]} size={[0.28, 3.4, 5]} />
    <Vox kind="planks" position={[3.5, 2.1, -0.4]} size={[0.28, 3.4, 5]} />
    <Vox kind="darkPlanks" tint={roof} position={[0, 4, -0.5]} size={[7.8, 0.35, 5.8]} />
    <Vox kind="log" position={[0, 3.2, 2.1]} size={[6.4, 0.28, 0.28]} />
  </group>
);

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[80, 1, 70]} />
    <Vox kind="path" position={[0, 0.02, 3.2]} size={[36, 0.06, 5]} />
    <Vox kind="path" position={[11, 0.02, 0.4]} size={[8, 0.06, 6]} />
    <Hut at={[0, 0, -8]} w={8} d={6} h={4.4} roof="#3f6b3a" windows={[-2.4, 2.4]} />
    <Hut at={[10, 0, -6]} w={6} roof="#5a4a6a" windows={[1.2]} />
    <Hut at={[-8, 0, 10]} w={5.5} roof="#6a4030" turn={Math.PI} windows={[0.4]} />
    <Bay at={PLACE.yard} roof="#5a4a6a" />
    <Bay at={PLACE.shop} roof="#8a3b2a" />
    <Vox kind="leaves" position={PLACE.hedge} size={[2.4, 1.3, 1.1]} />
    <Vox kind="log" position={[PLACE.hedge[0], 0.4, PLACE.hedge[2]]} size={[0.3, 0.8, 0.3]} />
    {(
      [
        [-22, -12, 4.2],
        [18, -11, 4],
        [-18, 14, 4.4],
        [22, 12, 4.6],
      ] as Array<[number, number, number]>
    ).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h} />
    ))}
    <LampPost position={[-6, 0, 2]} seed={2} />
    <LampPost position={[6, 0, 5]} seed={3} />
    <Clouds y={40} center={[0, 0, 0]} />
    <GodRay position={[-2, 8, -2]} rotation={[0, 0, 0.4]} width={5} height={14} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 2]} width={12} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 3, -2]} size={1.4} color="#ffe08a" opacity={0.3} />
    <Dust position={[0, 2, 1]} area={[24, 4, 12]} count={40} size={0.04} color="#fff7d8" opacity={0.5} seed={3} speed={0.2} />
  </>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="village">
        <Village />
        {night ? <Glow position={[1.6, 2.6, -4.2]} size={2.2} color="#ffb060" opacity={0.45} /> : null}
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>
    </>
  );
};
