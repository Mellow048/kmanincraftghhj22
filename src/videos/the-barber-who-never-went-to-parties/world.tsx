import type React from "react";
import { Block, Door, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot, useFilmTime } from "../../engine";
import type { Vec3 } from "../../engine";
import { Fence } from "../../../Topics/Recreation";
import { BarberChair, Calendar, HOME, PLACE, PartyWindow, PixelText, ROOM, SHOP, Sofa, partyColor } from "./kit";

/**
 * FOUR PLACES, in zones. A shot names its zone and the others are not drawn. 1 unit = 1 metre; the ground is y = 0.
 * In all of them the lens stands in the south (+z), in a wall that is not built, and looks north.
 *
 *   room     Our living room, at the origin (the warm-room look puts its lamps there). Television on the west wall,
 *            the sofa facing it, Dad's armchair in the back on the right with space behind it, a window in the back
 *            wall with the party in it, the drawer in the back left corner, the calendar.
 *   dinner   The same room with the table in it instead of the sofa.
 *   shop     The barbershop (SHOP). Three chairs face the lens, which is the mirror. Back wall: the door on the
 *            left, the big window on the right, a bench under it. Outside: pavement, road, the town.
 *   floor    The shop without the mirror shelf, for anything shot near the ground.
 *   front    The shop from the pavement, with its roof on.
 *   home     Our side of the street (HOME). Our doorway at x = 0 and our open garage at x = 8, both looking north
 *            across the road at the party house.
 */

const CREAM = "#efe3c8";
const TEAL = "#2f8a8a";

// ----------------------------------------------------------------------------- the living room

const LivingShell: React.FC<{ t: number; party: boolean }> = ({ t, party }) => (
  <group position={ROOM}>
    <Vox kind="planks" position={[0, -0.1, 0.4]} size={[7, 0.2, 7]} />
    {/* back wall, with a window in it */}
    <Block position={[0, 1.9, -2.7]} size={[7, 3.8, 0.2]} color="#c9b48a" castShadow={false} />
    <Block position={[0, 0.5, -2.59]} size={[7, 1.0, 0.03]} color="#8a6a4a" castShadow={false} />
    <Block position={[-3.5, 1.9, 0.4]} size={[0.2, 3.8, 6.4]} color="#bfa880" castShadow={false} />
    <Block position={[3.5, 1.9, 0.4]} size={[0.2, 3.8, 6.4]} color="#bfa880" castShadow={false} />
    <PartyWindow position={[0.2, 2.0, -2.58]} t={t} size={[1.2, 1.1]} on={party} />
    {/* the ceiling lamp, and what it does */}
    <Block position={[0.4, 3.3, -0.4]} size={[0.5, 0.25, 0.5]} color="#ffe9b8" emissive="#ffd88a" emissiveIntensity={0.7} castShadow={false} />
    <pointLight position={[0.4, 3.0, -0.2]} color="#ffdcae" intensity={26} distance={9} decay={2} />
    <pointLight position={[0.5, 1.9, 3.4]} color="#ffe8cc" intensity={20} distance={9} decay={2} />
    <Glow position={[0.4, 3.2, -0.4]} size={1.6} color="#ffd88a" opacity={0.3} />
    <LightPool position={[0.4, 0.02, -0.2]} width={4.2} depth={3.6} color="#ffdfa8" opacity={0.12} />
    <GodRay position={[0.2, 1.2, -1.9]} rotation={[0.5, 0, 0]} width={1.2} height={2.2} color={party ? partyColor(t) : "#fff0c8"} opacity={0.07} />
    <Dust position={[0, 1.5, 0]} area={[5.5, 2.6, 4.5]} count={40} size={0.028} color="#ffe9c0" opacity={0.5} seed={4} speed={0.12} />
    {/* the drawer unit in the back left corner */}
    <Block position={[-2.3, 0.45, -2.25]} size={[1.6, 0.9, 0.6]} color="#e9e2d0" />
    <Block position={[-2.3, 0.92, -2.25]} size={[1.7, 0.05, 0.66]} color="#5c3f24" />
    <Block position={[-2.7, 0.3, -1.94]} size={[0.6, 0.3, 0.02]} color="#d8cfb8" castShadow={false} />
    {/* a rug */}
    <Vox kind="wool" tint="#a8483a" position={[-0.6, 0.02, 0.3]} size={[3.2, 0.04, 2.2]} />
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
  <group position={ROOM}>
    <Sofa position={[0.5, 0, 0.5]} rotationY={-Math.PI / 2} />
    <Armchair position={[1.9, 0, -1.0]} />
    {/* a floor lamp by the armchair: the pool Dad sleeps in */}
    <Block position={[2.9, 0.8, -1.5]} size={[0.06, 1.6, 0.06]} color="#2a2c33" />
    <Block position={[2.9, 1.7, -1.5]} size={[0.36, 0.3, 0.36]} color="#ffe2a8" emissive="#ffcf8a" emissiveIntensity={0.6} castShadow={false} />
    <pointLight position={[2.6, 1.6, -1.2]} color="#ffcf8a" intensity={7} distance={4} decay={2} />
  </group>
);

const Dinner: React.FC = () => (
  <group position={ROOM}>
    <Block position={[0, 0.74, 0.3]} size={[1.9, 0.08, 1.0]} color="#8a5a34" />
    {[
      [-0.85, -0.1],
      [0.85, -0.1],
      [-0.85, 0.7],
      [0.85, 0.7],
    ].map(([x, z], i) => (
      <Block key={i} position={[x, 0.35, z]} size={[0.09, 0.7, 0.09]} color="#6a4426" />
    ))}
    {/* two chairs, one at each end */}
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 1.45, 0, 0.3]}>
        <Block position={[0, 0.45, 0]} size={[0.5, 0.07, 0.5]} color="#6a4426" />
        <Block position={[s * 0.24, 0.85, 0]} size={[0.06, 0.8, 0.5]} color="#6a4426" />
      </group>
    ))}
  </group>
);

// ----------------------------------------------------------------------------- the barbershop

const s = (x: number, y: number, z: number): Vec3 => [SHOP[0] + x, SHOP[1] + y, SHOP[2] + z];

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

/** A building across the road: a box with rows of windows. `lit` makes them party windows. */
const Building: React.FC<{ position: Vec3; w: number; h: number; color: string; t: number; lit?: boolean }> = ({ position, w, h, color, t, lit = false }) => (
  <group position={position}>
    <Vox kind="bricks" tint={color} position={[0, h / 2, 0]} size={[w, h, 5]} />
    <Block position={[0, h + 0.15, 0]} size={[w + 0.3, 0.3, 5.3]} color="#3a3a44" />
    {Array.from({ length: Math.floor(h / 2.4) }, (_, r) =>
      Array.from({ length: Math.max(1, Math.floor(w / 2.2)) }, (_, c) => (
        <PartyWindow key={`${r}-${c}`} position={[(c - (Math.max(1, Math.floor(w / 2.2)) - 1) / 2) * 2.1, 1.7 + r * 2.4, 2.52]} t={t} size={[1.0, 1.1]} phase={r * 2 + c} on={lit} />
      )),
    )}
  </group>
);

const ShopBuilding: React.FC<{ t: number; doorOpen: number }> = ({ t, doorOpen }) => (
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
    <Block position={[1.4, 1.85, -4.6]} size={[5, 1.8, 0.04]} color="#bfe6ff" opacity={0.16} transparent castShadow={false} />
    <Block position={[1.4, 0.97, -4.6]} size={[5.1, 0.07, 0.3]} color="#5c3f24" />
    <Door position={[-2.3 - 0.52, 0, -4.6]} width={1.04} height={2.25} open={doorOpen} color="#2f6f6a" handleColor="#e8c44a" />
    {/* side walls */}
    <Block position={[-5.06, 1.8, -0.6]} size={[0.12, 3.6, 8.2]} color={CREAM} castShadow={false} />
    <Block position={[5.06, 1.8, -0.6]} size={[0.12, 3.6, 8.2]} color={CREAM} castShadow={false} />
    <Block position={[-4.99, 0.5, -0.6]} size={[0.02, 1.0, 8.2]} color={TEAL} castShadow={false} />
    <Block position={[4.99, 0.5, -0.6]} size={[0.02, 1.0, 8.2]} color={TEAL} castShadow={false} />
    {/* the bench under the window */}
    <Block position={[1.6, 0.42, -4.05]} size={[4.2, 0.1, 0.55]} color="#5c3f24" />
    {[-0.3, 1.6, 3.5].map((x) => (
      <Block key={x} position={[x, 0.2, -4.05]} size={[0.1, 0.4, 0.5]} color="#3a2616" />
    ))}
    {/* a price board on the east wall, a shelf of bottles on the west */}
    <group position={[4.98, 2.2, -1.6]} rotation={[0, -Math.PI / 2, 0]}>
      <Block size={[1.5, 1.0, 0.04]} color="#17171c" castShadow={false} />
      <PixelText text="CUTS" position={[0, 0.28, 0.03]} height={0.28} color="#ffe14a" />
      <PixelText text="NO APPOINTMENT" position={[0, -0.05, 0.03]} height={0.13} maxWidth={1.3} />
      <PixelText text="NO REFUNDS" position={[0, -0.28, 0.03]} height={0.13} maxWidth={1.3} />
    </group>
    <group position={[-4.9, 1.7, -1.4]}>
      <Block size={[0.3, 0.05, 2.2]} color="#5c3f24" />
      {["#3fb8ff", "#ff4fa0", "#6aff6a", "#ffe14a", "#b06aff", "#ff7a2a", "#f4f4f0"].map((c, i) => (
        <Block key={i} position={[0, 0.18, -0.9 + i * 0.3]} size={[0.12, 0.3 - (i % 3) * 0.05, 0.12]} color={c} />
      ))}
    </group>
    {/* the three chairs */}
    <BarberChair position={PLACE.chairL} />
    <BarberChair position={PLACE.chair} />
    <BarberChair position={PLACE.chairR} />
    {/* light */}
    {[-2.6, 0, 2.6].map((x) => (
      <group key={x}>
        <Block position={[x, 3.45, -0.6]} size={[1.2, 0.08, 0.3]} color="#fffbe8" emissive="#fff4d0" emissiveIntensity={0.7} castShadow={false} />
        <pointLight position={[x, 3.1, 0.2]} color="#fff4dc" intensity={16} distance={8} decay={2} />
      </group>
    ))}
    <pointLight position={[0, 2.0, 3.6]} color="#ffffff" intensity={34} distance={10} decay={2} />
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
    <Building position={[-10, 0, -21]} w={7} h={7.5} color="#c9a070" t={t} />
    <Building position={[-1.5, 0, -21]} w={8} h={5.4} color="#8fa6c0" t={t} />
    <Building position={[8.5, 0, -21]} w={9} h={8.6} color="#b8553a" t={t} />
    <Building position={[19, 0, -21]} w={7} h={6} color="#d8c49a" t={t} />
    <Tree position={[4, 0, -17]} height={3.4} />
    <Tree position={[-6.5, 0, -17]} height={3} leaf="#4a8c33" />
    <BarberPole position={[-3.6, 0, -4.95]} t={t} />
    {/* the name over the window, read from the street */}
    <Block position={[0.6, 3.15, -4.76]} size={[7.6, 0.8, 0.1]} color="#17171c" />
    <PixelText text="BARBER SHOP" position={[0.6, 3.15, -4.82]} rotationY={Math.PI} height={0.56} color="#ffe14a" />
    {/* the neighbours on each side, so the queue has a street to stand in */}
    <Vox kind="bricks" tint="#8fa6c0" position={[-9.2, 2.2, -2.1]} size={[8, 4.4, 5]} />
    <Vox kind="bricks" tint="#d8c49a" position={[9.6, 2.5, -2.1]} size={[9, 5, 5]} />
  </group>
);

/** The mirror shelf: the lens is the mirror, and this is what is under it. */
const MirrorShelf: React.FC = () => (
  <group position={SHOP}>
    <Block position={[0, 0.42, 1.55]} size={[9, 0.84, 0.5]} color="#5c3f24" />
    <Block position={[0, 0.86, 1.5]} size={[9.1, 0.05, 0.62]} color="#2a2c33" />
    {[-2.6, -2.0, -0.55, 0.5, 1.6, 2.7].map((x, i) => (
      <Block key={i} position={[x, 0.99 + (i % 2) * 0.03, 1.5]} size={[0.11, 0.22 + (i % 2) * 0.06, 0.11]} color={["#3fb8ff", "#ff4fa0", "#ffe14a", "#6aff6a", "#b06aff", "#f4f4f0"][i]} />
    ))}
  </group>
);

const ShopRoof: React.FC = () => (
  <group position={SHOP}>
    <Block position={[0, 3.75, -0.6]} size={[10.4, 0.3, 8.6]} color="#3a3a44" />
  </group>
);

// ----------------------------------------------------------------------------- our side of the street

const h = (x: number, y: number, z: number): Vec3 => [HOME[0] + x, HOME[1] + y, HOME[2] + z];

const Street: React.FC<{ t: number; night: boolean }> = ({ t, night }) => (
  <group position={HOME}>
    <Vox kind="grass" position={[0, -0.25, -4]} size={[90, 0.5, 60]} />
    {/* our path and our drive */}
    <Vox kind="stone" tint="#c9c4b6" position={[0, 0.01, -2.2]} size={[1.6, 0.04, 5]} />
    <Vox kind="stone" tint="#a8a69c" position={[8, 0.01, -1.6]} size={[4.4, 0.04, 9]} />
    {/* pavement, road, pavement */}
    <Vox kind="stone" tint="#b9b6ac" position={[0, 0.02, -5.6]} size={[70, 0.06, 2]} />
    <Block position={[0, 0.0, -9]} size={[70, 0.1, 5]} color="#33353d" />
    {Array.from({ length: 11 }, (_, i) => (
      <Block key={i} position={[-20 + i * 4, 0.055, -9]} size={[1.6, 0.02, 0.16]} color="#e8e4d0" castShadow={false} />
    ))}
    <Vox kind="stone" tint="#b9b6ac" position={[0, 0.02, -12.4]} size={[70, 0.06, 2]} />

    {/* THE PARTY HOUSE, across the road. Two floors, every window going. */}
    <group position={[1.5, 0, -18]}>
      <Vox kind="planks" tint="#e9e2d0" position={[0, 3.1, 0]} size={[10, 6.2, 6]} />
      <Block position={[0, 6.5, 0]} size={[10.8, 0.5, 6.8]} color="#8a3b2a" />
      <Block position={[0, 7.1, 0]} size={[8.6, 0.7, 5]} color="#8a3b2a" />
      <Block position={[0, 7.75, 0]} size={[6, 0.6, 3.2]} color="#7a3324" />
      {[-3.2, 3.2].map((x, i) => (
        <PartyWindow key={`g${i}`} position={[x, 1.9, 3.02]} t={t} size={[1.7, 1.5]} phase={i * 3} on={night} />
      ))}
      {[-3.2, 0, 3.2].map((x, i) => (
        <PartyWindow key={`u${i}`} position={[x, 4.6, 3.02]} t={t} size={[1.5, 1.4]} phase={i * 2 + 1} on={night} />
      ))}
      <Block position={[0, 1.15, 3.03]} size={[1.2, 2.3, 0.08]} color="#3f6fd0" />
      <Block position={[0, 0.12, 3.6]} size={[2.2, 0.24, 1.2]} color="#b9b6ac" />
      {/* a string of bulbs along the front */}
      {night
        ? Array.from({ length: 13 }, (_, i) => {
            const c = partyColor(t, i);
            return <Block key={i} position={[-4.8 + i * 0.8, 3.25 - Math.sin((i / 12) * Math.PI) * 0.35, 3.1]} size={[0.16, 0.16, 0.16]} color={c} emissive={c} emissiveIntensity={0.8} castShadow={false} />;
          })
        : null}
      {night ? (
        <>
          <pointLight position={[-2.5, 2.4, 6]} color={partyColor(t, 0)} intensity={60} distance={16} decay={2} />
          <pointLight position={[2.5, 2.4, 6]} color={partyColor(t, 3)} intensity={60} distance={16} decay={2} />
          <Glow position={[0, 3.2, 3.6]} size={11} color={partyColor(t, 1)} opacity={0.22} />
        </>
      ) : null}
    </group>
    <Fence from={[-4.6, 0, -13.6]} to={[-1, 0, -13.6]} />
    <Fence from={[4, 0, -13.6]} to={[8, 0, -13.6]} />
    {/* the neighbours, dark */}
    <Vox kind="planks" tint="#b8a888" position={[-13, 2.6, -18.5]} size={[9, 5.2, 6]} />
    <Block position={[-13, 5.5, -18.5]} size={[9.8, 0.6, 6.8]} color="#3d5f9a" />
    <Vox kind="planks" tint="#a8b8a0" position={[15.5, 2.4, -18.5]} size={[9, 4.8, 6]} />
    <Block position={[15.5, 5.1, -18.5]} size={[9.8, 0.6, 6.8]} color="#5a4a6a" />
    <Tree position={[-6.5, 0, -13.5]} height={4} />
    <Tree position={[9.5, 0, -14]} height={3.6} leaf="#4a8c33" />
    <Tree position={[-9, 0, -3]} height={3.8} />
    {/* a street lamp on our side */}
    <Block position={[-3.2, 1.6, -5.2]} size={[0.12, 3.2, 0.12]} color="#2a2c33" />
    <Block position={[-3.2, 3.25, -5.2]} size={[0.4, 0.26, 0.4]} color="#ffe9b8" emissive="#ffd88a" emissiveIntensity={night ? 0.8 : 0} castShadow={false} />
    {night ? <pointLight position={[-3.2, 3.0, -5.0]} color="#ffd9a0" intensity={30} distance={11} decay={2} /> : null}
    {night ? <Glow position={[-3.2, 3.2, -5.1]} size={2.4} color="#ffd88a" opacity={0.35} /> : null}
    <LightPool position={[-3.2, 0.07, -5]} width={5} depth={4} color="#ffd9a0" opacity={night ? 0.16 : 0.05} />
    <GodRay position={[-3.2, 1.7, -5]} rotation={[0, 0, 0]} width={2.6} height={3.2} color="#ffd9a0" opacity={night ? 0.05 : 0.02} />
    <Dust position={[2, 2, -4]} area={[18, 4, 10]} count={50} size={0.035} color={night ? "#cfd8ff" : "#fff7d8"} opacity={0.5} seed={9} speed={0.15} />

    {/* OUR DOORWAY: the lens is inside the house, looking out. The frame is all there is of the house. */}
    <Block position={[-0.78, 1.3, 0.75]} size={[0.3, 2.6, 0.3]} color="#f2efe6" />
    <Block position={[0.78, 1.3, 0.75]} size={[0.3, 2.6, 0.3]} color="#f2efe6" />
    <Block position={[0, 2.5, 0.75]} size={[1.9, 0.3, 0.3]} color="#f2efe6" />
    <Vox kind="wool" tint="#8a3b2a" position={[0, 0.03, 0.2]} size={[1.0, 0.04, 0.6]} />
    {/* the hall light falls out of the door onto whoever knocks */}
    <pointLight position={[0, 2.0, 1.4]} color="#ffe2b8" intensity={night ? 22 : 0} distance={7} decay={2} />

    {/* OUR GARAGE: open to the road, the lens at the back of it. */}
    <group position={[8, 0, 0]}>
      <Block position={[0, 0.02, 0.4]} size={[4.6, 0.04, 5.4]} color="#8f8d86" />
      <Block position={[-2.4, 1.4, 0.4]} size={[0.2, 2.8, 5.4]} color="#d8d2c0" />
      <Block position={[2.4, 1.4, 0.4]} size={[0.2, 2.8, 5.4]} color="#d8d2c0" />
      <Block position={[0, 2.9, 0.4]} size={[5.0, 0.2, 5.6]} color="#5a5a64" />
      {/* a shelf down the east wall */}
      <Block position={[2.12, 1.25, 0.2]} size={[0.4, 0.06, 4.2]} color="#5c3f24" />
      <Block position={[2.12, 0.6, 0.2]} size={[0.4, 0.06, 4.2]} color="#5c3f24" />
      {/* the bulb */}
      <Block position={[0, 2.55, -0.2]} size={[0.14, 0.18, 0.14]} color="#fff4c8" emissive="#ffe9a0" emissiveIntensity={0.8} castShadow={false} />
      <pointLight position={[0, 2.3, 0]} color="#ffe2b0" intensity={24} distance={8} decay={2} />
      <pointLight position={[0, 1.6, 2.6]} color="#ffe8cc" intensity={12} distance={7} decay={2} />
      <Glow position={[0, 2.5, -0.2]} size={1.2} color="#ffe9a0" opacity={0.4} />
    </group>
  </group>
);

void h;
void s;

export const World: React.FC = () => {
  const active = useActiveShot();
  const t = useFilmTime();
  const shot = active?.shot;
  const look = shot?.look ?? "overworld-day";
  const night = look === "overworld-night" || look === "lantern-night" || look === "warm-room";
  const zone = shot?.zone ?? "";
  return (
    <>
      <Zone name="room" with={["dinner"]}>
        <LivingShell t={t} party={look !== "overworld-day"} />
        <Calendar position={[ROOM[0] + 1.9, 1.75, ROOM[2] - 2.585]} page={0} />
      </Zone>
      <Zone name="room">
        <Living />
      </Zone>
      <Zone name="dinner">
        <Dinner />
      </Zone>
      <Zone name="shop" with={["floor", "front"]}>
        <ShopBuilding t={t} doorOpen={zone === "front" ? 1.2 : 0} />
      </Zone>
      <Zone name="shop">
        <MirrorShelf />
      </Zone>
      <Zone name="front">
        <ShopRoof />
      </Zone>
      <Zone name="home">
        <Street t={t} night={night} />
      </Zone>
    </>
  );
};
