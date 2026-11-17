import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { BedBox, Moon, Stars } from "../../../Topics/InThisTown";

/**
 * Where it happens: a machine in the sky.
 *
 *   farm    The air round the platform, and the ground two hundred blocks under it (drawn sixty down: far enough to
 *           be small). The platform, the glass rooms and the water change during the film, so the scenes draw them
 *           (kit.tsx, `Farm`). On the ground, straight under the south edge, is the boss's base: a floor, a bed.
 *   under   The room under the floor, drawn by the scenes (`Under`): this zone is only the sky round it.
 *
 * Night is the shot's `look`.
 */

/** The ground under the south edge, and where the boss's bed is on it. */
export const GROUND = -60;
export const BASE: [number, number, number] = [0.4, GROUND, 9];

const Sky: React.FC<{ night: boolean }> = ({ night }) => (
  <>
    {night ? <Moon position={[-16, 58, -90]} radius={7} /> : <Clouds y={34} center={[0, 0, 0]} />}
    {night ? <Stars center={[0, 0, 0]} /> : null}
    {/* clouds UNDER the platform: that is how high it is */}
    <Clouds y={-16} center={[0, 0, 0]} span={110} opacity={night ? 0.5 : 0.85} />
  </>
);

const Far: React.FC = () => (
  <group position={[0, GROUND, 0]}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[500, 1, 500]} />
    <Block position={[-30, 0.03, 10]} rotation={[0, 0.3, 0]} size={[9, 0.06, 300]} color="#3f76e4" castShadow={false} />
    {([[-12, 22, 14, 10, "#c9a53a"], [16, 26, 12, 12, "#7a5536"], [22, -2, 10, 14, "#c9a53a"], [-18, -8, 12, 9, "#8fbf4a"]] as Array<[number, number, number, number, string]>).map(([x, z, w, d, c], i) => (
      <Block key={i} position={[x, 0.04, z]} size={[w, 0.06, d]} color={c} castShadow={false} />
    ))}
    {Array.from({ length: 34 }, (_, i) => {
      const a = i * 2.399;
      const r = 14 + ((i * 53) % 100) / 2.2;
      return <Tree key={i} position={[Math.sin(a) * r, 0, 9 + Math.cos(a) * r]} height={4 + (i % 4)} leaf={i % 2 ? "#3f7f2d" : "#356430"} />;
    })}
    {/* the boss's base: a plank floor, a bed, a chest, and the foot of the long ladder */}
    <Vox kind="planks" position={[BASE[0], 0.05, BASE[2]]} size={[7, 0.1, 6]} />
    <BedBox position={[BASE[0], 0.1, BASE[2]]} />
    <Block position={[BASE[0] + 2.2, 0.45, BASE[2] - 1.6]} size={[0.9, 0.7, 0.9]} color="#a06a2c" />
    <Block position={[BASE[0] - 2.3, 0.45, BASE[2] + 1.4]} size={[0.9, 0.9, 0.9]} color="#6b6b6b" />
  </group>
);

const Air: React.FC<{ night: boolean }> = ({ night }) => (
  <group>
    {night ? null : <GodRay position={[-4, 7, 1]} rotation={[0, 0, 0.5]} width={6} height={14} color="#fff0c8" opacity={0.06} />}
    <LightPool position={[0, 0.05, 1]} width={8} depth={8} color={night ? "#b9c4ff" : "#fff2c0"} opacity={night ? 0.16 : 0.1} />
    <Glow position={[0, 1.6, 0.3]} size={3} color={night ? "#ffcf8a" : "#fff0c0"} opacity={night ? 0.16 : 0.08} />
    <Dust position={[0, 2.2, 0]} area={[16, 5, 14]} count={50} size={0.045} color="#ffffff" opacity={0.5} seed={3} speed={0.35} />
    <Sky night={night} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  return (
    <>
      {night ? <directionalLight color="#b9c4ff" intensity={1.1} position={[-5, 9, 12]} /> : null}
      {night ? <ambientLight color="#8088e0" intensity={0.4} /> : null}
      <Zone name="farm">
        <Air night={night} />
        <Far />
      </Zone>
      <Zone name="under">
        <Air night={night} />
      </Zone>
    </>
  );
};
