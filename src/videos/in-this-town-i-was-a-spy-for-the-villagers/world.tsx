import type React from "react";
import { Block, Clouds, Dust, GodRay, Glow, LightPool, Tree, Vox, Zone } from "../../engine";
import {
  BellTower,
  DARK_OAKS,
  DarkOak,
  Hut,
  LampPost,
  Mansion,
  MansionHall,
  PLACE,
  Stall,
} from "./kit";

/** Leave a clear training yard directly south of the mansion path. */
const CampForest: React.FC = () => (
  <group position={PLACE.campDoor}>
    <Vox kind="grass" tint="#3c6b2e" position={[0, -0.25, 6]} size={[90, 0.5, 70]} />
    <Vox kind="path" position={[0, 0.02, 10.5]} size={[2.6, 0.06, 16]} />
    {DARK_OAKS.filter(([x, z]) => !(Math.abs(x) < 12 && z > 12 && z < 30)).map(([x, z, height], i) => (
      <DarkOak key={i} position={[x, 0, z]} height={height} n={i} />
    ))}
  </group>
);

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[74, 1, 76]} />
    <Vox kind="path" position={[0, 0.02, 1.5]} size={[8, 0.06, 48]} />
    <Vox kind="path" position={[0, 0.021, -5.5]} size={[23, 0.06, 12]} />

    <Hut at={[-17, 0, -10]} w={7} d={7} h={4} roof="#8a3b2a" windows={[-2, 2]} />
    <Hut at={[17, 0, -10]} w={7} d={7} h={4} roof="#3d5f9a" windows={[-2, 2]} />
    <Hut at={[-17, 0, 13]} w={7} d={7} h={4} roof="#5a4a6a" windows={[-2, 2]} turn={Math.PI} />
    <Hut at={[17, 0, 13]} w={7} d={7} h={4} roof="#3f6b3a" windows={[-2, 2]} turn={Math.PI} />
    <Hut at={[-27, 0, 1]} w={6} d={7} h={3.8} tint="#d8c49a" roof="#8a3b2a" door={1.2} windows={[-1.6]} turn={Math.PI / 2} />
    <Hut at={[27, 0, 1]} w={6} d={7} h={3.8} tint="#caa268" roof="#5a4a6a" door={-1.2} windows={[1.6]} turn={-Math.PI / 2} />

    <BellTower position={PLACE.bell} />
    <Stall position={[-7, 0, 1]} />
    <Stall position={[10.5, 0, 2]} />
    <Block position={[-7, 0.09, 1.1]} size={[1.2, 0.18, 0.45]} color="#6a4730" />
    <Block position={[10.5, 0.09, 2.1]} size={[1.2, 0.18, 0.45]} color="#6a4730" />

    {[
      [-30, -19, 5], [-25, 20, 4.4], [31, -18, 5.2], [29, 20, 4.3],
      [-34, 7, 4.6], [35, 8, 5.1], [-8, 25, 4.2], [10, 26, 4.7],
    ].map(([x, z, h], i) => <Tree key={i} position={[x, 0, z]} height={h} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />)}
    <LampPost position={[-10, 0, -2]} seed={3} />
    <LampPost position={[10, 0, -2]} seed={4} />
    <LampPost position={[0, 0, 13]} seed={7} />
    <Clouds y={42} center={[0, 0, 0]} opacity={0.88} />

    <GodRay position={[-4, 7, -5]} rotation={[0, 0, 0.48]} width={5} height={13} color="#fff0c8" opacity={0.07} />
    <LightPool position={[0, 0.06, -4]} width={14} depth={14} color="#ffe7ad" opacity={0.13} />
    <Glow position={[0, 3, -6]} size={2.3} color="#ffd66e" opacity={0.24} />
    <Dust position={[0, 2.1, 0]} area={[28, 4, 24]} count={74} size={0.045} color="#fff1d1" opacity={0.56} seed={17} speed={0.22} />
  </>
);

const PillagerCamp: React.FC = () => (
  <>
    <Vox kind="grass" tint="#476b37" position={[70, -0.5, 0]} size={[112, 1, 110]} />
    <Vox kind="path" position={[70, 0.02, -5]} size={[5, 0.06, 47]} />
    <Vox kind="path" tint="#947747" position={[70, 0.025, 4]} size={[26, 0.07, 9]} />
    <Mansion at={PLACE.campDoor} lit />
    <CampForest />
    <MansionHall at={[104, 0, 23]} ceiling={false} />

    {/* Training yard: the ram's target is a wooden model of the real bell tower. */}
    <Vox kind="planks" position={[70, 0.08, 4]} size={[27, 0.12, 10]} />
    {/* Crossbow practice boards, offset from the ram lane. */}
    {[-1, 0, 1].map((n) => (
      <group key={n} position={[59 + n * 5.2, 0, 10]}>
        <Vox kind="log" position={[0, 1.2, 0]} size={[0.18, 2.4, 0.18]} />
        <Vox kind="planks" position={[0, 2.3, 0]} size={[1.45, 1.2, 0.18]} />
        <Block position={[0, 2.3, 0.12]} size={[0.58, 0.58, 0.06]} color={n === 0 ? "#a5332b" : "#d8c49a"} />
        <Block position={[0, 2.3, 0.17]} size={[0.17, 0.17, 0.04]} color="#e8c44a" />
      </group>
    ))}
    <Tree position={[51, 0, 13]} height={5} leaf="#315b2d" />
    <Tree position={[87, 0, 14]} height={5.2} leaf="#355f2f" />
    <Tree position={[93, 0, -4]} height={4.7} leaf="#315b2d" />
    <Clouds y={43} center={[70, 0, 0]} color="#e6e5de" opacity={0.72} />

    <GodRay position={[67, 8, -6]} rotation={[0, 0, 0.4]} width={4} height={12} color="#c6d2de" opacity={0.07} />
    <LightPool position={[70, 0.07, 4]} width={22} depth={14} color="#ffce82" opacity={0.1} />
    <Glow position={[70, 3.7, 4]} size={2} color="#f2bd58" opacity={0.18} />
    <Dust position={[70, 2.4, 3]} area={[32, 5, 22]} count={86} size={0.05} color="#efe2c9" opacity={0.56} seed={24} speed={0.28} />
  </>
);

const RunTrail: React.FC = () => (
  <>
    <Vox kind="grass" tint="#4e7d39" position={[35, -0.5, 0]} size={[100, 1, 70]} />
    <Vox kind="path" position={[35, 0.02, 2]} size={[100, 0.06, 4]} />
    {Array.from({ length: 14 }, (_, i) => {
      const x = 4 + i * 4;
      const side = i % 2 ? 1 : -1;
      const z = side * (8 + (i % 4) * 3);
      return <Tree key={i} position={[x, 0, z]} height={4.2 + (i % 3) * 0.5} leaf={i % 2 ? "#3e742e" : "#315f2b"} spread={0.86} />;
    })}
    <Vox kind="dirt" tint="#705238" position={[35, 0.1, 2]} size={[100, 0.2, 2.7]} />
    <Clouds y={40} center={[35, 0, 0]} color="#f0f0eb" opacity={0.75} />
    <GodRay position={[35, 6.8, 2]} rotation={[0, 0, 0.43]} width={5} height={12} color="#fff0bd" opacity={0.08} />
    <LightPool position={[35, 0.05, 2]} width={70} depth={9} color="#e1d09b" opacity={0.09} />
    <Glow position={[36, 3, 2]} size={1.6} color="#eacb77" opacity={0.17} />
    <Dust position={[35, 1.8, 2]} area={[80, 4, 8]} count={90} size={0.04} color="#fff1d1" opacity={0.48} seed={31} speed={0.3} />
  </>
);

export const World: React.FC = () => (
  <>
    <Zone name="village" with={["trail"]}><Village /></Zone>
    <Zone name="camp" with={["trail"]}><PillagerCamp /></Zone>
    <Zone name="trail"><RunTrail /></Zone>
  </>
);
