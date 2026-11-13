import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Hut, LampPost, Room, Stall, Well } from "../../../Topics/InThisTown";
import { PLACE, shopAt, LemonadeStall, HelmetChair, Shelf, Bottle, Cart, Coins } from "./kit";

/**
 * THE TOWN + SHOP. Four zones:
 *  village — street, square, huts, bell/well, stall (becomes lemonade stand), cart path
 *  shop    — witch's interior at [0,0,60]: helmet, shelves, bottles
 *  room    — teller's room (kept for night moment if needed)
 */

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[120, 1, 90]} />
    <Vox kind="path" position={[3, 0.02, 2]} size={[60, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />
    <Vox kind="path" position={[10, 0.021, 3.8]} size={[18, 0.06, 2.4]} /> {/* cart lane behind stall */}

    {/* North side */}
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    {/* Witch's shop — north, imposing, open door */}
    <Hut at={PLACE.shop} w={7} h={4.0} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} open door={0} />
    <Vox kind="cobble" position={[-10, 0.25, -4.15]} size={[2.8, 0.5, 1.7]} />
    <Vox kind="stone" position={[-10, 0.12, -3.1]} size={[1.6, 0.24, 0.5]} />
    {/* Witch sign: helmet icon */}
    <Block position={[-10, 3.6, -4.0]} size={[1.1, 0.7, 0.06]} color="#2a183a" />
    <Block position={[-10, 3.6, -3.96]} size={[0.5, 0.35, 0.07]} color="#a8b8c8" />

    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={[20, 0, -5]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />

    {/* South side */}
    <Hut at={[-13, 0, 11]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />

    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    {/* Stall is the lemonade stand base; scenes overlay LemonadeStall for detail */}
    <Stall position={PLACE.stall} />
    <LemonadeStall position={PLACE.stall} />

    {/* Greedy man's bench corner near stall */}
    <Vox kind="cobble" position={[8.5, 0.18, -0.2]} size={[1.4, 0.36, 0.9]} />
    <Coins position={[8.5, 0.38, -0.15]} amount={14} />

    {/* Cart lane markers */}
    <Vox kind="cobble" position={[0, 0.03, 3.8]} size={[14, 0.06, 0.28]} tint="#9a8a72" />

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
    <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.35} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

const Shop: React.FC = () => (
  <>
    {/* Floor + walls */}
    <Vox kind="planks" position={shopAt(0, -0.1, 0)} size={[8, 0.2, 8]} tint="#c8a878" />
    <Vox kind="planks" position={shopAt(0, 2.3, -4)} size={[8, 4.6, 0.2]} tint="#7a5a3a" />
    <Vox kind="planks" position={shopAt(-4, 2.3, 0)} size={[0.2, 4.6, 8]} tint="#8a6a4a" />
    <Vox kind="planks" position={shopAt(4, 2.3, 0)} size={[0.2, 4.6, 8]} tint="#8a6a4a" />
    <Vox kind="darkPlanks" position={shopAt(0, 4.7, 0)} size={[8.2, 0.2, 8]} />
    {/* Counter */}
    <Vox kind="darkPlanks" position={shopAt(0, 0.55, 1.2)} size={[3.2, 0.9, 0.6]} />
    <Vox kind="planks" position={shopAt(0, 1.02, 1.2)} size={[3.2, 0.06, 0.62]} tint="#e8d4a0" />

    {/* Helmet chair centre */}
    <HelmetChair position={shopAt(0, 0, 0)} />

    {/* Shelves left + right with bottles */}
    <Shelf position={shopAt(-2.8, 0, -2.8)} rotationY={0} bottles={[{ x: -0.6, color: "#ff6b6b" }, { x: 0.0, color: "#6bc8ff" }, { x: 0.6, color: "#d8a0ff" }]} />
    <Shelf position={shopAt(2.8, 0, -2.8)} rotationY={0} bottles={[{ x: -0.9, color: "#ff6b3a" }, { x: -0.3, color: "#7aff6b" }, { x: 0.4, color: "#ffe66b" }]} />
    <Shelf position={shopAt(-2.8, 0, 1.8)} rotationY={Math.PI} bottles={[{ x: 0.2, color: "#ff4a4a" }]} />

    {/* Window light */}
    <Block position={shopAt(1.5, 1.85, -3.9)} size={[1.2, 1.2, 0.06]} color="#f0e0ff" emissive="#a080ff" emissiveIntensity={0.6} />
    <GodRay position={shopAt(1.2, 1.2, -1.5)} rotation={[0.5, 0, 0.1]} width={1.3} height={2.6} color="#d8c8ff" opacity={0.12} />
    <LightPool position={shopAt(0, 0.012, 0.3)} width={2.6} depth={2.2} color="#dcc8ff" opacity={0.18} />
    <Glow position={shopAt(0, 1.5, -1)} size={1.0} color="#9ec8ff" opacity={0.2} />
    <Dust position={shopAt(0, 1.4, 0)} area={[5, 2.2, 4.5]} count={35} size={0.03} color="#e8d8ff" opacity={0.5} seed={7} speed={0.15} />
    <pointLight position={shopAt(0, 2.2, 0)} color="#b8a0ff" intensity={8} distance={7} decay={2} />
  </>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="shop">
        <Shop />
      </Zone>
      <Zone name="room">
        <Room at={PLACE.room} night={night} />
      </Zone>
    </>
  );
};
