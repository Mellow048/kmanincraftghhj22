import type React from "react";
import { Block, Door, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot, useFilmTime } from "../../engine";
import type { Vec3 } from "../../engine";
import { Fence } from "../../../Topics/Recreation";
import { BarberChair, Calendar, HOME, PLACE, PartyWindow, PixelText, ROOM, SHOP, Sofa, Television, partyColor } from "./kit";

/**
 * FOUR PLACES, in zones. A shot names its zone and the others are not drawn. 1 unit = 1 metre; the ground is y = 0.
 * Every look used is an "overworld" one: its sun follows the shot, so a place can be anywhere. Indoors the walls and
 * ceilings cast no shadow, and lamps do the work.
 *
 *   room     Our living room (ROOM). The television on the WEST wall, the sofa facing it, Dad's armchair in the back
 *            on the right with space behind it, a window in the back wall with the party in it, the drawer unit in
 *            the back left corner, the calendar. No south wall: the lens looks north, east or west.
 *   tv       The same, without its television: the scene draws it, switched on.
 *   spring   The same, without television or calendar: the scene draws the calendar, to turn its pages.
 *   dinner   The same room with the table in it and no sofa.
 *   shop     The barbershop (SHOP). Three chairs face south: the lens is the mirror. Back wall: the door on the
 *            left, the big window on the right, a bench under it. Outside: pavement, road, the town.
 *   shopx    The same, without its door: the scene draws the door, to swing it.
 *   front    The shop from the pavement (the lens is in the north and looks south), with a wall of mirrors behind
 *            the chairs. The scene draws the door.
 *   home     Our front door at night (HOME). The lens is in the hall and looks out, or stands on the path and looks in.
 *   garage   Our garage, next door to it: a bulb, a window to the street with a shelf under it, the party behind it.
 */

const CREAM = "#efe3c8";
const TEAL = "#2f8a8a";

// ----------------------------------------------------------------------------- the living room

export const LivingShell: React.FC<{ t: number; party: boolean }> = ({ t, party }) => (
  <group position={ROOM}>
    <Vox kind="planks" position={[0, -0.1, 0.4]} size={[7.2, 0.2, 7]} />
    <Block position={[0, 1.9, -2.7]} size={[7.2, 3.8, 0.2]} color="#d6c08f" castShadow={false} />
    <Block position={[0, 0.5, -2.59]} size={[7.2, 1.0, 0.03]} color="#8a6a4a" castShadow={false} />
    <Block position={[-3.6, 1.9, 0.4]} size={[0.2, 3.8, 6.4]} color="#c9b384" castShadow={false} />
    <Block position={[-3.49, 0.5, 0.4]} size={[0.03, 1.0, 6.4]} color="#8a6a4a" castShadow={false} />
    <Block position={[3.6, 1.9, 0.4]} size={[0.2, 3.8, 6.4]} color="#c9b384" castShadow={false} />
    <Block position={[3.49, 0.5, 0.4]} size={[0.03, 1.0, 6.4]} color="#8a6a4a" castShadow={false} />
    <Block position={[0, 3.85, 0.4]} size={[7.4, 0.1, 6.6]} color="#e9e0c8" castShadow={false} />
    <PartyWindow position={[0.1, 2.0, -2.58]} t={t} size={[1.2, 1.1]} on={party} />
    {/* the ceiling lamp, and what it does */}
    <Block position={[0.4, 3.6, -0.4]} size={[0.5, 0.25, 0.5]} color="#ffe9b8" emissive="#ffd88a" emissiveIntensity={0.35} castShadow={false} />
    <pointLight position={[0.4, 3.2, -0.2]} color="#ffdcae" intensity={7} distance={9} decay={2} />
    <pointLight position={[0.5, 1.9, 3.4]} color="#ffe8cc" intensity={6} distance={9} decay={2} />
    <Glow position={[0.4, 3.5, -0.4]} size={1.6} color="#ffd88a" opacity={0.3} />
    <LightPool position={[0.4, 0.02, -0.2]} width={4.2} depth={3.6} color="#ffdfa8" opacity={0.12} />
    <GodRay position={[0.1, 1.2, -1.9]} rotation={[0.5, 0, 0]} width={1.2} height={2.2} color={party ? partyColor(t) : "#fff0c8"} opacity={0.07} />
    <Dust position={[0, 1.5, 0]} area={[5.5, 2.6, 4.5]} count={40} size={0.028} color="#ffe9c0" opacity={0.5} seed={4} speed={0.12} />
    {/* the drawer unit in the back left corner: three drawers, the top one is where the kitchen scissors live */}
    <group position={[-2.3, 0, -2.25]}>
      <Block position={[0, 0.45, 0]} size={[1.5, 0.9, 0.6]} color="#e9e2d0" />
      <Block position={[0, 0.92, 0]} size={[1.6, 0.05, 0.66]} color="#5c3f24" />
      {[0.2, 0.47].map((y) => (
        <group key={y}>
          <Block position={[0, y, 0.305]} size={[1.3, 0.22, 0.02]} color="#d8cfb8" castShadow={false} />
          <Block position={[0, y, 0.33]} size={[0.2, 0.04, 0.04]} color="#5c3f24" castShadow={false} />
        </group>
      ))}
    </group>
    <Vox kind="wool" tint="#a8483a" position={[-0.6, 0.02, 0.5]} size={[3.2, 0.04, 2.2]} />
  </group>
);

/** Dad's armchair. It faces +Z. Somebody sits in it at its position. */
export const Armchair: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, 0.25, 0]} size={[0.86, 0.3, 0.8]} color="#7a4a2e" />
    <Block position={[0, 0.72, -0.36]} size={[0.86, 0.9, 0.18]} color="#6a3f26" />
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * 0.5, 0.45, 0]} size={[0.2, 0.66, 0.84]} color="#5e3620" />
    ))}
    <Block position={[0, 0.05, 0]} size={[0.8, 0.1, 0.7]} color="#2a2018" />
  </group>
);

const Living: React.FC = () => (
  <>
    <Sofa position={PLACE.sofa} rotationY={-Math.PI / 2} />
    <Armchair position={PLACE.armchair} />
    <group position={ROOM}>
      {/* a floor lamp by the armchair: the pool Dad sleeps in */}
      <Block position={[3.2, 0.6, -0.3]} size={[0.06, 1.2, 0.06]} color="#2a2c33" />
      <Block position={[3.2, 1.3, -0.3]} size={[0.34, 0.28, 0.34]} color="#e8c890" emissive="#ffcf8a" emissiveIntensity={0.25} castShadow={false} />
      <pointLight position={[2.9, 1.5, -0.2]} color="#ffcf8a" intensity={2.5} distance={4} decay={2} />
    </group>
  </>
);

const Dinner: React.FC = () => (
  <group position={PLACE.table}>
    <Block position={[0, 0.74, 0]} size={[1.9, 0.08, 1.0]} color="#8a5a34" />
    {[
      [-0.85, -0.4],
      [0.85, -0.4],
      [-0.85, 0.4],
      [0.85, 0.4],
    ].map(([x, z], i) => (
      <Block key={i} position={[x, 0.35, z]} size={[0.09, 0.7, 0.09]} color="#6a4426" />
    ))}
    {/* a chair behind it, for Dad */}
    <Block position={[0, 0.45, -0.75]} size={[0.5, 0.07, 0.5]} color="#6a4426" />
    <Block position={[0, 0.85, -0.98]} size={[0.5, 0.8, 0.06]} color="#6a4426" />
  </group>
);

// ----------------------------------------------------------------------------- the barbershop

const Wall: React.FC<{ x0: number; x1: number; y0?: number; y1?: number; z: number; out?: string }> = ({ x0, x1, y0 = 0, y1 = 3.6, z, out = "#b8553a" }) => (
  <>
    {/* inside face: cream over teal; outside face: brick red */}
    <Block position={[(x0 + x1) / 2, (y0 + y1) / 2, z + 0.06]} size={[x1 - x0, y1 - y0, 0.12]} color={CREAM} castShadow={false} />
    {y0 < 1.0 ? <Block position={[(x0 + x1) / 2, (y0 + Math.min(y1, 1.0)) / 2, z + 0.125]} size={[x1 - x0, Math.min(y1, 1.0) - y0, 0.02]} color={TEAL} castShadow={false} /> : null}
    <Vox kind="bricks" tint={out} position={[(x0 + x1) / 2, (y0 + y1) / 2, z - 0.06]} size={[x1 - x0, y1 - y0, 0.12]} castShadow={false} />
  </>
);

const BarberPole: React.FC<{ position: Vec3; t: number }> = ({ position, t }) => (
  <group position={position}>
    <Block position={[0, 0.9, 0]} size={[0.22, 0.12, 0.22]} color="#c9d0d8" metalness={0.6} roughness={0.3} />
    {Array.from({ length: 8 }, (_, i) => {
      const c = ["#e8433a", "#f4f4f0", "#3f6fd0", "#f4f4f0"][(i + Math.floor(t * 6)) % 4];
      return <Block key={i} position={[0, 1.02 + i * 0.12, 0]} size={[0.18, 0.12, 0.18]} color={c} emissive={c} emissiveIntensity={0.15} castShadow={false} />;
    })}
    <Block position={[0, 2.02, 0]} size={[0.22, 0.12, 0.22]} color="#c9d0d8" metalness={0.6} roughness={0.3} />
    <Block position={[0, 2.16, 0]} size={[0.16, 0.16, 0.16]} color="#f4f4f0" emissive="#ffffff" emissiveIntensity={0.3} castShadow={false} />
  </group>
);

/** A building across the road: a box with rows of windows. */
const Building: React.FC<{ position: Vec3; w: number; h: number; color: string; t: number }> = ({ position, w, h, color, t }) => {
  const cols = Math.max(1, Math.floor(w / 2.2));
  return (
    <group position={position}>
      <Vox kind="bricks" tint={color} position={[0, h / 2, 0]} size={[w, h, 5]} />
      <Block position={[0, h + 0.15, 0]} size={[w + 0.3, 0.3, 5.3]} color="#3a3a44" />
      {Array.from({ length: Math.floor(h / 2.4) }, (_, r) =>
        Array.from({ length: cols }, (_, c) => <PartyWindow key={`${r}-${c}`} position={[(c - (cols - 1) / 2) * 2.1, 1.7 + r * 2.4, 2.52]} t={t} size={[1.0, 1.1]} phase={r * 2 + c} on={false} />),
      )}
    </group>
  );
};

/** A trolley by a chair: combs, bottles, a spray. */
const Trolley: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, 0.45, 0]} size={[0.5, 0.04, 0.4]} color="#c9d0d8" metalness={0.6} roughness={0.3} />
    <Block position={[0, 0.9, 0]} size={[0.5, 0.04, 0.4]} color="#c9d0d8" metalness={0.6} roughness={0.3} />
    {[
      [-0.23, -0.18],
      [0.23, -0.18],
      [-0.23, 0.18],
      [0.23, 0.18],
    ].map(([x, z], i) => (
      <Block key={i} position={[x, 0.46, z]} size={[0.03, 0.92, 0.03]} color="#8a919c" metalness={0.6} roughness={0.3} />
    ))}
    <Block position={[-0.12, 1.04, 0]} size={[0.1, 0.24, 0.1]} color="#3fb8ff" />
    <Block position={[0.03, 1.0, 0.06]} size={[0.09, 0.16, 0.09]} color="#ff4fa0" />
    <Block position={[0.16, 1.02, -0.06]} size={[0.09, 0.2, 0.09]} color="#ffe14a" />
  </group>
);

const ShopBuilding: React.FC<{ t: number }> = ({ t }) => (
  <group position={SHOP}>
    {/* the floor: black and white squares */}
    {Array.from({ length: 10 }, (_, ix) =>
      Array.from({ length: 9 }, (_, iz) => (
        <Block key={`${ix}-${iz}`} position={[ix - 4.5, -0.05, iz - 4.1]} size={[1, 0.1, 1]} color={(ix + iz) % 2 ? "#ebe7dc" : "#2b2e36"} castShadow={false} />
      )),
    )}
    {/* back wall: door on the left, big window on the right */}
    <Wall x0={-5} x1={-2.9} z={-4.6} />
    <Wall x0={-2.9} x1={-1.7} y0={2.3} z={-4.6} />
    <Wall x0={-1.7} x1={-1.1} z={-4.6} />
    <Wall x0={-1.1} x1={3.9} y1={0.95} z={-4.6} />
    <Wall x0={-1.1} x1={3.9} y0={2.75} z={-4.6} />
    <Wall x0={3.9} x1={5} z={-4.6} />
    <Block position={[1.4, 1.85, -4.6]} size={[5, 1.8, 0.04]} color="#bfe6ff" opacity={0.14} transparent castShadow={false} />
    <Block position={[1.4, 0.97, -4.6]} size={[5.1, 0.07, 0.3]} color="#5c3f24" />
    {/* side walls and the ceiling */}
    <Block position={[-5.06, 1.8, -0.6]} size={[0.12, 3.6, 8.2]} color={CREAM} castShadow={false} />
    <Block position={[5.06, 1.8, -0.6]} size={[0.12, 3.6, 8.2]} color={CREAM} castShadow={false} />
    <Block position={[-4.99, 0.5, -0.6]} size={[0.02, 1.0, 8.2]} color={TEAL} castShadow={false} />
    <Block position={[4.99, 0.5, -0.6]} size={[0.02, 1.0, 8.2]} color={TEAL} castShadow={false} />
    <Block position={[0, 3.75, -0.6]} size={[10.4, 0.3, 8.6]} color="#e9e0c8" castShadow={false} />
    {/* the bench under the window */}
    <Block position={[1.6, 0.42, -4.05]} size={[4.2, 0.1, 0.55]} color="#5c3f24" />
    {[-0.3, 1.6, 3.5].map((x) => (
      <Block key={x} position={[x, 0.2, -4.05]} size={[0.1, 0.4, 0.5]} color="#3a2616" />
    ))}
    {/* a price board on the east wall, a shelf of bottles on the west */}
    <group position={[4.98, 2.2, -1.6]} rotation={[0, -Math.PI / 2, 0]}>
      <Block size={[1.5, 1.0, 0.04]} color="#17171c" castShadow={false} />
      <PixelText text="CUTS" position={[0, 0.28, 0.03]} height={0.28} color="#ffe14a" />
      <PixelText text="NO REFUNDS" position={[0, -0.12, 0.03]} height={0.15} maxWidth={1.3} />
    </group>
    <group position={[-4.9, 1.7, -1.4]}>
      <Block size={[0.3, 0.05, 2.2]} color="#5c3f24" />
      {["#3fb8ff", "#ff4fa0", "#6aff6a", "#ffe14a", "#b06aff", "#ff7a2a", "#f4f4f0"].map((c, i) => (
        <Block key={i} position={[0, 0.18, -0.9 + i * 0.3]} size={[0.12, 0.3 - (i % 3) * 0.05, 0.12]} color={c} />
      ))}
    </group>
    {/* the three chairs, and a trolley by each */}
    <BarberChair position={PLACE.chairL} />
    <BarberChair position={PLACE.chair} />
    <BarberChair position={PLACE.chairR} />
    <Trolley position={[-3.0, 0, -0.5]} />
    <Trolley position={[1.05, 0, -0.75]} />
    <Trolley position={[3.1, 0, -0.5]} />
    {/* light */}
    {[-2.6, 0, 2.6].map((x) => (
      <group key={x}>
        <Block position={[x, 3.56, -0.6]} size={[1.2, 0.08, 0.3]} color="#fffbe8" emissive="#fff4d0" emissiveIntensity={0.7} castShadow={false} />
        <pointLight position={[x, 3.1, 0.2]} color="#fff4dc" intensity={4} distance={8} decay={2} />
      </group>
    ))}
    <pointLight position={[0, 2.0, 3.6]} color="#ffffff" intensity={5} distance={10} decay={2} />
    <Glow position={[0, 3.4, -0.6]} size={2.2} color="#fff4d0" opacity={0.2} />
    <GodRay position={[1.6, 1.6, -3.2]} rotation={[0.75, 0, 0.1]} width={4.4} height={3.4} color="#fff3d0" opacity={0.06} />
    <LightPool position={[1.4, 0.012, -2.6]} width={4.6} depth={2.4} color="#fff3d0" opacity={0.16} />
    <Dust position={[0, 1.6, -1.2]} area={[8, 2.8, 5]} count={50} size={0.03} color="#fff7d8" opacity={0.5} seed={7} speed={0.12} />

    {/* outside: pavement, road, the far side of the street */}
    <Vox kind="stone" tint="#b9b6ac" position={[0, -0.1, -6.6]} size={[60, 0.2, 4]} />
    <Block position={[0, -0.12, -12]} size={[60, 0.2, 7]} color="#3a3c44" />
    {Array.from({ length: 9 }, (_, i) => (
      <Block key={i} position={[-16 + i * 4, -0.01, -12]} size={[1.6, 0.02, 0.16]} color="#e8e4d0" castShadow={false} />
    ))}
    <Vox kind="stone" tint="#b9b6ac" position={[0, -0.1, -17]} size={[60, 0.2, 3]} />
    <Vox kind="grass" position={[0, -0.2, -30]} size={[90, 0.2, 24]} />
    <Vox kind="grass" position={[0, -0.2, 14]} size={[90, 0.2, 24]} />
    <Building position={[-10, 0, -21]} w={7} h={7.5} color="#c9a070" t={t} />
    <Building position={[-1.5, 0, -21]} w={8} h={5.4} color="#8fa6c0" t={t} />
    <Building position={[8.5, 0, -21]} w={9} h={8.6} color="#b8553a" t={t} />
    <Building position={[19, 0, -21]} w={7} h={6} color="#d8c49a" t={t} />
    <Tree position={[4, 0, -17]} height={3.4} />
    <Tree position={[-6.5, 0, -17]} height={3} leaf="#4a8c33" />
    <BarberPole position={[-1.4, 0, -4.95]} t={t} />
    {/* the name over the door, read from the street: two lines, because the picture is tall */}
    <Block position={[-1.6, 3.2, -4.76]} size={[3.0, 1.3, 0.1]} color="#17171c" />
    <Block position={[-1.6, 3.2, -4.74]} size={[3.16, 1.46, 0.04]} color="#c8362e" />
    <PixelText text="BARBER" position={[-1.6, 3.48, -4.83]} rotationY={Math.PI} height={0.5} color="#ffe14a" />
    <PixelText text="SHOP" position={[-1.6, 2.92, -4.83]} rotationY={Math.PI} height={0.5} color="#ffe14a" />
    {/* the neighbours on each side */}
    <Vox kind="bricks" tint="#8fa6c0" position={[-9.2, 2.2, -2.1]} size={[8, 4.4, 5]} />
    <Vox kind="bricks" tint="#d8c49a" position={[9.6, 2.5, -2.1]} size={[9, 5, 5]} />
  </group>
);

/** What the street sees behind the chairs: a wall, and three mirrors on it. */
const MirrorWall: React.FC = () => (
  <group position={SHOP}>
    <Block position={[0, 1.8, 2.3]} size={[10.2, 3.6, 0.12]} color={CREAM} castShadow={false} />
    <Block position={[0, 0.5, 2.23]} size={[10.2, 1.0, 0.02]} color={TEAL} castShadow={false} />
    {[-2.1, 0, 2.1].map((x) => (
      <group key={x}>
        <Block position={[x, 1.75, 2.22]} size={[1.3, 1.5, 0.04]} color="#5c3f24" castShadow={false} />
        <Block position={[x, 1.75, 2.19]} size={[1.14, 1.34, 0.02]} color="#bfe0ee" emissive="#9fc8dc" emissiveIntensity={0.25} castShadow={false} />
      </group>
    ))}
    <Block position={[0, 0.9, 2.0]} size={[9, 0.06, 0.5]} color="#5c3f24" />
  </group>
);

// ----------------------------------------------------------------------------- our side of the street

const PARTY_X = 4;

const Street: React.FC<{ t: number; night: boolean }> = ({ t, night }) => (
  <group position={HOME}>
    <Vox kind="grass" position={[0, -0.25, -4]} size={[90, 0.5, 60]} />
    {/* our path and our drive */}
    <Vox kind="stone" tint="#c9c4b6" position={[0, 0.01, -2.2]} size={[1.6, 0.04, 5]} />
    {/* pavement, road, pavement */}
    <Vox kind="stone" tint="#b9b6ac" position={[0, 0.02, -5.6]} size={[70, 0.06, 2]} />
    <Block position={[0, 0.0, -9]} size={[70, 0.1, 5]} color="#33353d" />
    {Array.from({ length: 11 }, (_, i) => (
      <Block key={i} position={[-20 + i * 4, 0.055, -9]} size={[1.6, 0.02, 0.16]} color="#e8e4d0" castShadow={false} />
    ))}
    <Vox kind="stone" tint="#b9b6ac" position={[0, 0.02, -12.4]} size={[70, 0.06, 2]} />

    {/* THE PARTY HOUSE, across the road. Two floors, every window going. A tall frame sees about 5 m of it. */}
    <group position={[PARTY_X, 0, -18]}>
      <Vox kind="planks" tint="#8f7f9a" position={[0, 3.1, 0]} size={[8.4, 6.2, 6]} />
      <Block position={[0, 6.5, 0]} size={[9.2, 0.5, 6.8]} color="#5a2a3a" />
      <Block position={[0, 7.1, 0]} size={[7.2, 0.7, 5]} color="#5a2a3a" />
      <Block position={[0, 7.75, 0]} size={[5, 0.6, 3.2]} color="#4a2232" />
      {[-2.1, 2.1].map((x, i) => (
        <PartyWindow key={`g${i}`} position={[x, 1.9, 3.02]} t={t} size={[1.7, 1.6]} phase={i * 3} on={night} />
      ))}
      {[-2.1, 2.1].map((x, i) => (
        <PartyWindow key={`u${i}`} position={[x, 4.6, 3.02]} t={t} size={[1.7, 1.5]} phase={i * 2 + 1} on={night} />
      ))}
      <Block position={[0, 1.15, 3.03]} size={[1.2, 2.3, 0.08]} color="#3f6fd0" />
      <Block position={[0, 0.12, 3.6]} size={[2.2, 0.24, 1.2]} color="#b9b6ac" />
      {/* a string of bulbs along the front */}
      {night
        ? Array.from({ length: 13 }, (_, i) => {
            const c = partyColor(t, i);
            return <Block key={i} position={[-4.0 + i * 0.667, 3.3 - Math.sin((i / 12) * Math.PI) * 0.3, 3.1]} size={[0.2, 0.2, 0.2]} color={c} emissive={c} emissiveIntensity={0.6} castShadow={false} />;
          })
        : null}
      {night ? (
        <>
          <pointLight position={[-2, 2.2, 5.5]} color={partyColor(t, 0)} intensity={16} distance={12} decay={2} />
          <pointLight position={[2, 2.2, 5.5]} color={partyColor(t, 3)} intensity={16} distance={12} decay={2} />
          <Glow position={[0, 3.2, 3.6]} size={7} color={partyColor(t, 1)} opacity={0.1} />
        </>
      ) : null}
    </group>
    <Fence from={[-4.6, 0, -13.6]} to={[-1, 0, -13.6]} />
    <Fence from={[9, 0, -13.6]} to={[12, 0, -13.6]} />
    {/* the neighbours, dark */}
    <Vox kind="planks" tint="#b8a888" position={[-9.5, 2.6, -18.5]} size={[9, 5.2, 6]} />
    <Block position={[-9.5, 5.5, -18.5]} size={[9.8, 0.6, 6.8]} color="#3d5f9a" />
    <Vox kind="planks" tint="#a8b8a0" position={[17.5, 2.4, -18.5]} size={[9, 4.8, 6]} />
    <Block position={[17.5, 5.1, -18.5]} size={[9.8, 0.6, 6.8]} color="#5a4a6a" />
    <Tree position={[-3.4, 0, -13.5]} height={4} />
    <Tree position={[11.6, 0, -14]} height={3.6} leaf="#4a8c33" />
    <Tree position={[-9, 0, -3]} height={3.8} />
    {/* a street lamp on our side */}
    <Block position={[-2.6, 1.6, -5.2]} size={[0.12, 3.2, 0.12]} color="#2a2c33" />
    <Block position={[-2.6, 3.25, -5.2]} size={[0.4, 0.26, 0.4]} color="#ffe9b8" emissive="#ffd88a" emissiveIntensity={night ? 0.4 : 0} castShadow={false} />
    {night ? <pointLight position={[-2.6, 3.0, -5.0]} color="#ffd9a0" intensity={8} distance={11} decay={2} /> : null}
    {night ? <Glow position={[-2.6, 3.2, -5.1]} size={2.0} color="#ffd88a" opacity={0.2} /> : null}
    <LightPool position={[-2.6, 0.07, -5]} width={5} depth={4} color="#ffd9a0" opacity={night ? 0.16 : 0.05} />
    <GodRay position={[-2.6, 1.7, -5]} rotation={[0, 0, 0]} width={2.6} height={3.2} color="#ffd9a0" opacity={night ? 0.05 : 0.02} />
    <Dust position={[2, 2, -4]} area={[18, 4, 10]} count={50} size={0.035} color={night ? "#cfd8ff" : "#fff7d8"} opacity={0.5} seed={9} speed={0.15} />
  </group>
);

/** Our house front and the hall behind the door. The door itself is drawn by the scene. Door hole: x ±0.75, 2.3 high. */
const OurHouse: React.FC = () => (
  <group position={HOME}>
    {/* the front wall, with the door hole in it */}
    <Vox kind="planks" tint="#a89878" position={[-3.375, 1.7, 0.75]} size={[5.25, 3.4, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#a89878" position={[3.075, 1.7, 0.75]} size={[4.65, 3.4, 0.2]} castShadow={false} />
    <Vox kind="planks" tint="#a89878" position={[0, 2.85, 0.75]} size={[1.5, 1.1, 0.2]} castShadow={false} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * 0.81, 1.15, 0.72]} size={[0.14, 2.3, 0.3]} color="#f2efe6" castShadow={false} />
    ))}
    <Block position={[0, 2.37, 0.72]} size={[1.76, 0.14, 0.3]} color="#f2efe6" castShadow={false} />
    <Block position={[0, 3.5, 0.6]} size={[11.6, 0.3, 0.9]} color="#8a3b2a" />
    <PartyWindow position={[-2.6, 1.7, 0.63]} t={0} size={[1.2, 1.2]} on={false} rotationY={Math.PI} />
    {/* the step, and the mat */}
    <Block position={[0, 0.06, 0.1]} size={[1.8, 0.12, 1.0]} color="#b9b6ac" />
    <Vox kind="wool" tint="#8a3b2a" position={[0, 0.13, 0.15]} size={[1.0, 0.03, 0.6]} />
    {/* the hall */}
    <Vox kind="planks" position={[0, 0.02, 2.9]} size={[3.4, 0.2, 4.2]} />
    <Block position={[0, 1.7, 5.0]} size={[3.4, 3.4, 0.2]} color="#c9a070" castShadow={false} />
    <Block position={[-1.7, 1.7, 2.9]} size={[0.2, 3.4, 4.2]} color="#b8935e" castShadow={false} />
    <Block position={[1.7, 1.7, 2.9]} size={[0.2, 3.4, 4.2]} color="#b8935e" castShadow={false} />
    <Block position={[0, 3.45, 2.9]} size={[3.6, 0.1, 4.4]} color="#e9e0c8" castShadow={false} />
    {/* a coat rack and a picture on the back wall */}
    <Block position={[0.9, 1.9, 4.88]} size={[0.7, 0.9, 0.04]} color="#5c3f24" castShadow={false} />
    <Block position={[0.9, 1.9, 4.85]} size={[0.56, 0.76, 0.02]} color="#7fb0c8" castShadow={false} />
    <Block position={[-0.9, 2.0, 4.86]} size={[0.8, 0.08, 0.08]} color="#3a2616" castShadow={false} />
    <Block position={[-1.1, 1.6, 4.82]} size={[0.3, 0.8, 0.12]} color="#3f6fb8" castShadow={false} />
    <pointLight position={[0, 2.7, 2.6]} color="#ffdcae" intensity={4} distance={7} decay={2} />
    <pointLight position={[0, 2.1, -0.4]} color="#ffe2b8" intensity={3} distance={5} decay={2} />
    <Block position={[0, 3.3, 2.6]} size={[0.3, 0.2, 0.3]} color="#ffe9b8" emissive="#ffd88a" emissiveIntensity={0.35} castShadow={false} />
  </group>
);

/** Our garage. Floor 4.8 wide; the window to the street is in its north wall, with a deep shelf under it. */
const Garage: React.FC = () => (
  <group position={PLACE.garage}>
    <Block position={[0, 0.01, 0.4]} size={[5.0, 0.06, 5.8]} color="#6f6d68" castShadow={false} />
    {/* north wall, with the window hole: x ±1.5, y 1.15–2.35 */}
    <Block position={[-2.0, 1.5, -2.4]} size={[1.0, 3.0, 0.2]} color="#9a9484" castShadow={false} />
    <Block position={[2.0, 1.5, -2.4]} size={[1.0, 3.0, 0.2]} color="#9a9484" castShadow={false} />
    <Block position={[0, 0.575, -2.4]} size={[3.0, 1.15, 0.2]} color="#9a9484" castShadow={false} />
    <Block position={[0, 2.675, -2.4]} size={[3.0, 0.65, 0.2]} color="#9a9484" castShadow={false} />
    <Block position={[0, 1.75, -2.4]} size={[3.0, 1.2, 0.03]} color="#bfe6ff" opacity={0.1} transparent castShadow={false} />
    <Block position={[0, 1.75, -2.38]} size={[0.06, 1.2, 0.06]} color="#f2efe6" castShadow={false} />
    {/* the shelf under the window */}
    <Block position={[0, 1.1, -2.1]} size={[3.3, 0.08, 0.5]} color="#5c3f24" />
    <Block position={[-1.5, 0.55, -2.1]} size={[0.08, 1.1, 0.45]} color="#3a2616" />
    <Block position={[1.5, 0.55, -2.1]} size={[0.08, 1.1, 0.45]} color="#3a2616" />
    <Block position={[-2.5, 1.5, 0.4]} size={[0.2, 3.0, 5.8]} color="#9a9484" castShadow={false} />
    <Block position={[2.5, 1.5, 0.4]} size={[0.2, 3.0, 5.8]} color="#9a9484" castShadow={false} />
    <Block position={[0, 3.05, 0.4]} size={[5.2, 0.1, 6]} color="#5a5a64" castShadow={false} />
    {/* garage things: a tyre, a box, tools on the west wall */}
    <Block position={[-2.0, 0.3, -1.7]} size={[0.6, 0.6, 0.6]} color="#b48d52" />
    <Block position={[-2.05, 0.8, -1.7]} size={[0.44, 0.4, 0.44]} color="#c9a070" />
    <Block position={[2.05, 0.35, -1.5]} size={[0.3, 0.7, 0.7]} color="#1c1c22" />
    <Block position={[-2.38, 1.7, -0.3]} size={[0.04, 0.6, 0.1]} color="#8a919c" castShadow={false} />
    <Block position={[-2.38, 1.9, 0.1]} size={[0.04, 0.2, 0.5]} color="#c8362e" castShadow={false} />
    {/* the bulb */}
    {/* It hangs off to one side: straight over the mop it burnt every face under it white. */}
    <Block position={[-1.5, 2.8, -0.6]} size={[0.03, 0.4, 0.03]} color="#1c1c22" castShadow={false} />
    <Block position={[-1.5, 2.55, -0.6]} size={[0.14, 0.18, 0.14]} color="#fff4c8" emissive="#ffe9a0" emissiveIntensity={0.3} castShadow={false} />
    <pointLight position={[-1.3, 2.35, 0.2]} color="#ffe2b0" intensity={5} distance={8} decay={2} />
    <pointLight position={[0.7, 1.6, 2.8]} color="#ffe8cc" intensity={3} distance={7} decay={2} />
    <Glow position={[-1.5, 2.5, -0.6]} size={0.8} color="#ffe9a0" opacity={0.15} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const t = useFilmTime();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night" || look === "lantern-night";
  return (
    <>
      <Zone name="room" with={["dinner", "tv", "spring"]}>
        <LivingShell t={t} party={night} />
      </Zone>
      <Zone name="room" with={["dinner"]}>
        <Television position={PLACE.tv} rotationY={Math.PI / 2} on={false} />
      </Zone>
      <Zone name="room" with={["dinner", "tv"]}>
        <Calendar position={PLACE.calendar} page={0} />
      </Zone>
      <Zone name="room" with={["tv", "spring"]}>
        <Living />
      </Zone>
      <Zone name="dinner">
        <Dinner />
      </Zone>
      <Zone name="shop" with={["shopx", "front"]}>
        <ShopBuilding t={t} />
      </Zone>
      <Zone name="shop">
        <Door position={[SHOP[0] - 2.82, 0, SHOP[2] - 4.6]} width={1.04} height={2.28} color="#2f6f6a" handleColor="#e8c44a" />
      </Zone>
      <Zone name="front">
        <MirrorWall />
      </Zone>
      <Zone name="home" with={["garage"]}>
        <Street t={t} night={night} />
      </Zone>
      <Zone name="home">
        <OurHouse />
      </Zone>
      <Zone name="garage">
        <Garage />
      </Zone>
    </>
  );
};
