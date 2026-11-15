import type React from "react";
import { Bed, Clouds, Dust, Glow, GodRay, LightPool, PixelText, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Hut, LampPost, Lantern, LanternPost, Room, Stall, Well } from "../../../Topics/InThisTown";
import { Bleachers, DisplayCase, PLACE, Pool, Trophy } from "./kit";

/**
 * THE TOWN, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   village  The square, the town hall and its window. The trophy is in that window all year.
 *   pool     The town pool: six lanes, tiled deck, starting blocks. Deck is y = 0, the water is just below it.
 *   home     His room. No south wall: that is where the camera lives.
 *   woods    The path at the edge of town, where the stranger waits. Night.
 *   arena    The contest: three pools in a row, and the smallest is the one he has trained in.
 */

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[120, 1, 90]} />
    <Vox kind="path" position={[3, 0.02, 2]} size={[60, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />

    {/* North side, west to east. Fronts face south. */}
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    <Hut at={[-10, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    {/* The town hall. The trophy window is the middle of its front. */}
    <Hut at={[0, 0, -7]} w={10} d={7} h={5} roof="#8a3b2a" windows={[-3.3, 3.3]} />
    <DisplayCase position={[0, 0, -3.55]} />
    <Vox kind="planks" tint="#e8dcc0" position={[0, 3.55, -3.44]} size={[3.2, 0.5, 0.12]} />
    <Hut at={[17, 0, -5]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />
    <Hut at={[27, 0, -6]} w={5} h={3.4} tint="#caa268" roof="#4a6a3a" />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />

    <Bell position={[-3.6, 0, -1]} />
    <Well position={[6.4, 0, 1.4]} />
    <Stall position={[-7.5, 0, 2.4]} />

    {(
      [
        [-28, -12, 4.6],
        [-15.5, -13.5, 4],
        [6, -15.5, 4.4],
        [15, -13, 3.8],
        [27, -11, 4.6],
        [-25, 14, 4],
        [8, 17, 4.4],
        [25, 13, 4],
        [-33, 1, 4.8],
        [31, 3, 4.4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <LampPost position={[-16, 0, 4.6]} seed={5} />
    <Clouds y={48} center={[0, 0, 0]} />

    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.3} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

const PoolZone: React.FC = () => (
  <group position={PLACE.pool}>
    <Vox kind="grass" position={[0, -0.55, 0]} size={[64, 1, 48]} />
    <Pool length={25} width={12} lanes={6} />
    {/* The fence, with a gate on the west side. */}
    <Vox kind="log" position={[-22, 0.5, -18]} size={[0.2, 1, 0.2]} />
    {[-18, -12, -6, 0, 6, 12, 18].map((x) => (
      <Vox key={x} kind="log" position={[x, 0.5, -16]} size={[0.18, 1, 0.18]} />
    ))}
    <Vox kind="log" position={[0, 0.95, 16.5]} size={[44, 0.16, 0.16]} />
    {[-20, -14, -8, -2, 4, 10, 16, 20].map((x) => (
      <Vox key={x} kind="log" position={[x, 0.5, 16.5]} size={[0.18, 1, 0.18]} />
    ))}

    {/* the changing hut, and a bench with a towel on it */}
    <Hut at={[-21, 0, 10]} w={5} h={3.2} tint="#d8c49a" roof="#3d5f9a" door={1.1} windows={[-1.2]} />
    <Vox kind="planks" tint="#c8b18a" position={[13.8, 0.28, -8.6]} size={[2.4, 0.14, 0.7]} />
    <Vox kind="planks" tint="#b8a078" position={[13.8, 0.14, -8.6]} size={[0.18, 0.28, 0.6]} />
    <Vox kind="wool" tint="#f2eee2" position={[13.8, 0.4, -8.6]} size={[0.9, 0.08, 0.5]} />

    {/* the sign over the gate */}
    <Vox kind="log" position={[-14, 1.1, 19]} size={[0.22, 2.2, 0.22]} />
    <Vox kind="log" position={[-6, 1.1, 19]} size={[0.22, 2.2, 0.22]} />
    <Vox kind="planks" tint="#e8dcc0" position={[-10, 2.15, 19]} size={[9, 1.5, 0.18]} />
    <PixelText text="TOWN POOL" position={[-10, 2.15, 19.12]} height={0.62} maxWidth={7.6} color="#3c5a66" />

    <Bleachers at={[-1, 0, 24]} rows={3} width={22} />
    {[-24, -18, 22, 26].map((x, i) => (
      <Tree key={x} position={[x, 0, -20 - i * 2]} height={4 + (i % 3)} leaf="#3f7f2d" />
    ))}
    <Clouds y={44} center={[0, 0, 0]} />
    <GodRay position={[-16, 9, -4]} rotation={[0, 0, 0.42]} width={6} height={16} color="#fff4d0" opacity={0.08} />
    <LightPool position={[0, 0.1, 0]} width={30} depth={18} color="#eafcff" opacity={0.1} />
    <Dust position={[0, 3, 0]} area={[34, 5, 24]} count={90} size={0.05} color="#ffffff" opacity={0.5} seed={7} speed={0.25} />
  </group>
);

const Home: React.FC<{ night: boolean }> = ({ night }) => (
  <group position={PLACE.home}>
    <Room at={[0, 0, 0]} night={night} />
    <Bed position={[1.3, 0, -0.4]} rotationY={0} width={0.9} length={2} sheet="#c94f3d" blanket="#c94f3d" />
    <Vox kind="planks" tint="#a8834e" position={[-1.7, 0.28, -0.4]} size={[0.9, 0.56, 0.9]} />
    <Lantern position={[-1.7, 0.62, -0.4]} />
    <Vox kind="wool" tint="#e8dcc0" position={[1.6, 0.06, 2.4]} size={[1.6, 0.06, 1.2]} />
    <Glow position={[-1.7, 0.9, -0.4]} size={1.2} color="#ffd9a0" opacity={night ? 0.4 : 0.16} />
    <LightPool position={[-1.2, 0.05, 0.6]} width={4} depth={4} color="#ffd9a0" opacity={0.12} />
  </group>
);

const Woods: React.FC = () => (
  <group position={PLACE.woods}>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[50, 1, 50]} />
    <Vox kind="path" position={[0, 0.02, 2]} size={[4.2, 0.06, 30]} />
    {(
      [
        [-7, -8, 6],
        [6, -6, 6.6],
        [-9, 2, 7],
        [8, 4, 6.2],
        [-6, 12, 6.8],
        [7, 14, 6],
        [-12, -2, 5.4],
        [12, -1, 5.8],
      ] as Array<[number, number, number]>
    ).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h} leaf={i % 2 ? "#2f5a2a" : "#356430"} />
    ))}
    <Lantern position={[2.4, 2.1, 4]} />
    <LanternPost position={[-2.6, 0, 6.5]} seed={9} />
    <Glow position={[0, 1.6, 2]} size={2.4} color="#a8c8ff" opacity={0.3} />
    <LightPool position={[0, 0.05, 3]} width={10} depth={12} color="#9fc0ff" opacity={0.14} />
    <Dust position={[0, 2, 2]} area={[16, 4, 20]} count={80} size={0.05} color="#cfe0ff" opacity={0.4} seed={11} speed={0.15} />
  </group>
);

const Arena: React.FC = () => (
  <group position={PLACE.arena}>
    <Vox kind="grass" position={[0, -0.55, 0]} size={[180, 1, 120]} />

    {/* Pool three: the small pool. Exactly the size of the one he trained in. */}
    <Pool length={25} width={12} lanes={6} />
    {/* Pool two and pool one, each bigger, each further back. */}
    <group position={[52, 0, -8]}>
      <Pool length={40} width={18} lanes={8} blocks={false} numbers={false} />
    </group>
    <group position={[116, 0, 10]}>
      <Pool length={60} width={26} lanes={10} blocks={false} numbers={false} />
    </group>

    <Bleachers at={[-1, 0, 22]} rows={5} width={30} />
    <Bleachers at={[-1, 0, -19]} rows={4} width={30} turn={Math.PI} />

    {/* The board that says which pool this is. */}
    <Vox kind="log" position={[-15, 1.4, 14]} size={[0.26, 2.8, 0.26]} />
    <Vox kind="log" position={[-1, 1.4, 14]} size={[0.26, 2.8, 0.26]} />
    <Vox kind="planks" tint="#e8dcc0" position={[-8, 2.85, 14]} size={[15, 2.4, 0.2]} />
    <PixelText text="THREE POOLS" position={[-8, 3.35, 14.13]} height={0.46} maxWidth={13} color="#3c5a66" />
    <PixelText text="THIS IS POOL ONE" position={[-8, 2.75, 14.13]} height={0.4} maxWidth={13} color="#a83c2a" />
    <PixelText text="THE SMALLEST" position={[-8, 2.2, 14.13]} height={0.34} maxWidth={13} color="#3c5a66" />

    {/* The trophy table at the finish wall. */}
    <Vox kind="planks" tint="#a8834e" position={[27.5, 0.52, -6]} size={[3.4, 1.04, 1.3]} />
    <Vox kind="wool" tint="#f2eee2" position={[27.5, 1.06, -6]} size={[3.6, 0.06, 1.5]} />
    <Trophy position={[26.6, 1.09, -6]} scale={1.5} />
    <Trophy position={[28.4, 1.09, -6]} scale={1.2} glow={0.2} />

    {/* Tents and flags, so the field reads as an event. */}
    {[
      [-26, 20],
      [10, 26],
      [30, 18],
    ].map(([x, z], i) => (
      <group key={i} position={[x, 0, z]}>
        <Vox kind="wool" tint={["#d8402f", "#e8d27a", "#3f7fb8"][i]} position={[0, 1.6, 0]} size={[4, 0.18, 4]} />
        <Vox kind="log" position={[1.8, 0.8, 1.8]} size={[0.14, 1.6, 0.14]} />
        <Vox kind="log" position={[-1.8, 0.8, 1.8]} size={[0.14, 1.6, 0.14]} />
      </group>
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <Vox key={i} kind="wool" tint={i % 2 ? "#d8402f" : "#f2eee2"} position={[-24 + i * 6, 4.4, 12]} size={[0.8, 1.2, 0.06]} />
    ))}

    <Clouds y={52} center={[20, 0, 0]} />
    <GodRay position={[-10, 10, -6]} rotation={[0, 0, 0.45]} width={8} height={18} color="#fff4d0" opacity={0.07} />
    <LightPool position={[0, 0.1, 0]} width={40} depth={26} color="#eafcff" opacity={0.1} />
    <Dust position={[0, 3, 0]} area={[50, 6, 30]} count={110} size={0.05} color="#ffffff" opacity={0.45} seed={13} speed={0.22} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="pool">
        <PoolZone />
      </Zone>
      <Zone name="home">
        <Home night={night} />
      </Zone>
      <Zone name="woods">
        <Woods />
      </Zone>
      <Zone name="arena">
        <Arena />
      </Zone>
    </>
  );
};
