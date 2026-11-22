import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Fence, Hut, LampPost, Lantern, LanternLine, Moon, Moonlight, Sign, Stars, WoolRoots } from "./kit";
import { BEDS, BELOW, HOUSES, SIGNS, TOWER, WOOL, woolSlab } from "./marks";

/**
 * THE TOWN, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   street   One street of wool, west–east. Houses north (facing us) and south. The school is the signs
 *            in front of its wall; the bell tower stands at the north-east end, its door facing us.
 *   tower    The inside of the tower's upper floor, at night: stone, the open south side, the beam the
 *            bell hangs from. The bell itself is on the stage of each shot, so it can swing.
 *   below    What the town is built over: dark ground, wool hanging from the ceiling, and the mass.
 *
 * Everything the town is floured with is one layer of wool. That is the film's whole idea in one object:
 * a town that put carpet over the world. 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const Street: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[96, 1, 74]} />
    {/* the wool: the floor of the entire town */}
    <Vox kind="wool" tint="#ece3cf" position={woolSlab.at} size={woolSlab.size} />
    <Vox kind="wool" tint="#e4dac4" position={[4, WOOL / 2, -6.4]} size={[9, WOOL, 7]} />
    <Vox kind="wool" tint="#e4dac4" position={[-10, WOOL / 2, -1.4]} size={[9, WOOL, 3.4]} />

    {HOUSES.map((h, i) => (
      <Hut key={i} at={h.at} w={h.w} h={h.h} roof={h.roof} door={h.door} turn={h.turn} windows={i === 1 ? [] : [-1.7, 1.7]} />
    ))}

    {/* the school's signs, on the wool in front of it */}
    {SIGNS.map((s, i) => (
      <Sign key={i} at={[s.x, WOOL, s.z]} words={s.words} tilt={s.tilt} h={1.25 + (i % 3) * 0.1} turn={0.06 * (i - 2)} />
    ))}

    {/* THE TOWER: a stone box with a doorway on the south face, and the dark of its inside standing in it */}
    <group position={TOWER.at}>
      <Vox kind="stoneBrick" position={[0, TOWER.h / 2, 0]} size={[TOWER.w, TOWER.h, TOWER.w]} />
      <Vox kind="mossy" position={[0, 0.45, 0]} size={[TOWER.w + 0.3, 0.9, TOWER.w + 0.3]} />
      <Vox kind="stone" position={[0, TOWER.h + 0.25, 0]} size={[TOWER.w + 0.5, 0.5, TOWER.w + 0.5]} />
      {/* the doorway: the stone is not cut, so the dark is a block standing in the face */}
      <Block position={[0, 1.2, TOWER.w / 2 - 0.02]} size={[TOWER.doorW, TOWER.doorH, 0.12]} color="#0a0a0d" />
      <Block position={[0, TOWER.doorH + 0.16, TOWER.w / 2 + 0.08]} size={[TOWER.doorW + 0.5, 0.3, 0.24]} color="#7d7d7d" />
      <Block position={[0, 2.92, TOWER.w / 2 + 0.3]} size={[1.1, 0.18, 1.1]} color="#8b8b8b" />
    </group>

    {/* bedrolls: the whole town, asleep in the wool */}
    {BEDS.map((b, i) => (
      <group key={i} position={b.at}>
        <Block position={[0, 0.16, 0]} size={[b.wide, 0.32, 0.86]} color="#e9e0ca" roughness={1} />
        <Block position={[0, 0.34, -0.06]} size={[b.wide - 0.2, 0.16, 0.7]} color="#f2ebd8" roughness={1} />
        <Block position={[-b.wide / 2 + 0.22, 0.3, 0]} size={[0.4, 0.2, 0.5]} color="#d8cdb4" roughness={1} />
      </group>
    ))}

    <Fence from={[-15.5, WOOL, -0.6]} to={[-15.5, WOOL, 9]} height={0.8} gap={2} />
    <Fence from={[-16.4, WOOL, 9]} to={[-8, WOOL, 9]} height={0.8} gap={2} />

    {(
      [
        [-24, -12, 5.2],
        [-16, 13, 4.4],
        [20, -11, 4.8],
        [17, 12, 4.2],
        [-27, 4, 4.6],
        [24, 2, 4.4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => x > 15 || x < -20 ? null : <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#4a7f36" : "#3f7f2d"} />)}

    <LampPost position={[-4.6, WOOL, -1.4]} seed={2} />
    <LampPost position={[2.2, WOOL, 9]} seed={3} />
    <LampPost position={[9.4, WOOL, -1.2]} seed={4} />
    <LanternLine from={[-14, 3.6, 3]} to={[12, 3.6, 3]} count={9} sag={0.5} seed={5} />
    <Clouds y={46} center={[0, 0, 0]} />

    {/* Atmosphere is not optional: a ray, a pool of light, a glow and dust in every zone. */}
    <GodRay position={[-9, 6.4, -1]} rotation={[0, 0, 0.55]} width={5} height={12} color="#fff3cc" opacity={0.07} />
    <LightPool position={[0, WOOL + 0.02, 2]} width={16} depth={10} color="#fff4cf" opacity={0.13} />
    <Glow position={[TOWER.at[0], 3.4, TOWER.at[2] + 2.3]} size={1.4} color="#fff0b8" opacity={0.16} />
    <Dust position={[0, 2.2, 2]} area={[36, 4, 16]} count={80} size={0.045} color="#fff7d8" opacity={0.55} seed={3} speed={0.18} />
  </>
);

const Tower: React.FC<{ night: boolean }> = ({ night }) => (
  <group>
    {/* the floor of the upper room, and the walls it sits in */}
    <Vox kind="stoneBrick" position={[TOWER.at[0], TOWER.floorY, TOWER.at[2]]} size={[TOWER.w, 0.3, TOWER.w]} />
    <Vox kind="stone" position={[TOWER.at[0], TOWER.floorY - 0.35, TOWER.at[2]]} size={[TOWER.w + 0.2, 0.4, TOWER.w + 0.2]} />
    {/* three walls: north, west, east. The south side is open to the night, which is where the lens lives. */}
    <Vox kind="stoneBrick" position={[TOWER.at[0], 7.0, TOWER.at[2] - TOWER.w / 2]} size={[TOWER.w, 7.4, TOWER.wall]} />
    <Vox kind="stoneBrick" position={[TOWER.at[0] - TOWER.w / 2, 7.0, TOWER.at[2]]} size={[TOWER.wall, 7.4, TOWER.w]} />
    <Vox kind="stoneBrick" position={[TOWER.at[0] + TOWER.w / 2, 7.0, TOWER.at[2]]} size={[TOWER.wall, 7.4, TOWER.w]} />
    {/* a slit on each side, at the height of the bell */}
    <Block position={[TOWER.at[0], 6.7, TOWER.at[2] - TOWER.w / 2 + 0.05]} size={[0.5, 1.5, 0.2]} color="#1d2b40" />
    <Block position={[TOWER.at[0] - TOWER.w / 2 + 0.05, 6.7, TOWER.at[2]]} size={[0.2, 1.5, 0.5]} color="#1d2b40" />
    <Block position={[TOWER.at[0] + TOWER.w / 2 - 0.05, 6.7, TOWER.at[2]]} size={[0.2, 1.5, 0.5]} color="#1d2b40" />
    {/* the stairs come up through a dark gap in the floor at the back of the room */}
    <Block position={[TOWER.at[0] - 1.2, TOWER.floorTop + 0.01, TOWER.at[2] - 1.2]} size={[1.5, 0.04, 1.2]} color="#0b0b0e" />
    <Lantern position={[TOWER.at[0] + 1.55, TOWER.floorTop + 2.5, TOWER.at[2] - 1.5]} chain={1.0} light={2} reach={5} seed={4} />
    <Lantern position={[TOWER.at[0] - 1.55, TOWER.floorTop + 2.2, TOWER.at[2] - 1.9]} chain={0.8} light={1} reach={4} seed={9} />
    <GodRay position={[TOWER.at[0] + 0.4, 6.4, TOWER.at[2] + 0.2]} rotation={[0.2, 0, 0.1]} width={2.6} height={7} color="#cfe0ff" opacity={night ? 0.1 : 0.05} />
    <LightPool position={[TOWER.at[0], TOWER.floorTop + 0.02, TOWER.at[2] + 0.6]} width={4} depth={4} color="#ffe6b0" opacity={0.16} />
    <Glow position={[TOWER.at[0] + 1.5, TOWER.floorTop + 2.2, TOWER.at[2] - 1.4]} size={0.9} color="#ffcf7a" opacity={0.3} />
    <Dust position={[TOWER.at[0], TOWER.floorTop + 2, TOWER.at[2]]} area={[3.4, 4, 3.4]} count={40} size={0.03} color="#e8eefc" opacity={0.5} seed={8} speed={0.2} />
  </group>
);

const Below: React.FC = () => (
  <>
    <Vox kind="dirt" tint="#241f19" position={BELOW.floor} size={BELOW.floorSize} />
    <Vox kind="basalt" position={[0, BELOW.ceilingY, 58]} size={[64, 1.2, 44]} />
    <WoolRoots at={[0, BELOW.ceilingY - 0.6, 60]} />
    {(
      [
        [-16, 44, 3],
        [15, 46, 3.6],
        [-22, 62, 4],
        [21, 66, 3.2],
        [-14, 74, 4.2],
        [17, 76, 3],
      ] as Array<[number, number, number]>
    ).map(([x, z, h], i) => (
      <Vox key={i} kind="basalt" position={[x, h / 2 - 0.5, z]} size={[2.4, h, 2.4]} />
    ))}
    {/* the hole the town puts its bell-sound through: a shaft of nothing, straight down onto the mass */}
    <GodRay position={[0, 7.2, 60]} rotation={[0, 0, 0]} width={3.2} height={9} color="#c9d8ff" opacity={0.06} />
    <LightPool position={[0, 0.03, 62]} width={16} depth={10} color="#5f6f8a" opacity={0.1} />
    <Glow position={[0, 3.2, 64.4]} size={4.6} color="#8ef2de" opacity={0.1} />
    <Dust position={[0, 3, 60]} area={[18, 6, 14]} count={70} size={0.05} color="#b9c6d8" opacity={0.35} seed={12} speed={0.12} />
  </>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="street">
        <Street />
      </Zone>
      <Zone name="tower">
        <Tower night={night} />
      </Zone>
      <Zone name="below">
        <Below />
      </Zone>
      {night && (
        <>
          <Zone name="street">
            <Moon position={[20, 23, -34]} radius={5.4} glow={0.9} />
            <Stars center={[0, 30, 0]} radius={70} count={220} seed={5} />
            <Moonlight on={[0, 1, 2]} from={[14, 22, -18]} radius={20} power={2.4} color="#b9cdf2" />
          </Zone>
          <Zone name="tower">
            <Moon position={[4.6, 15.5, -30]} radius={4.6} glow={0.9} />
            <Stars center={[4, 26, -26]} radius={60} count={160} seed={7} />
            <Moonlight on={[TOWER.at[0], TOWER.floorTop + 1.2, TOWER.at[2] + 0.6]} from={[8, 16, -20]} radius={9} power={2.6} color="#bdd0f5" />
          </Zone>
        </>
      )}
    </>
  );
};
