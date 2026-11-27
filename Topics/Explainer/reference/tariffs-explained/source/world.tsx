import type React from "react";
import { SolidBox } from "../../engine";
import {
  BannerFlag,
  Clouds,
  Dust,
  Glow,
  GodRay,
  Hut,
  LampPost,
  LightPool,
  PLACE,
  Tree,
  VillageStreet,
  Vox,
  Water,
  Zone,
  on,
} from "./kit";

/**
 * 3-Zone Grounded Minecraft Economics World (ZERO Z-Fighting + True Separate Islands!):
 *   1. `red`    — Red Island Market Street (Sam's local sword stall & Maya's bakery)
 *   2. `bridge` — Twin Ocean Islands separated by wide sparkling turquoise water channel:
 *                 Red Island (South landmass, z=+7.5..+27) <-> Oak Footbridge (z=-7.4..+7.4) <-> Blue Island (North landmass, z=-27..-7.5)
 *   3. `blue`   — Blue Island Craft Plaza (Alex's 5-emerald sword workshop)
 */
export const World: React.FC = () => (
  <group>
    {/* ---- ZONE 1: Red Island Main Street ---- */}
    <Zone name="red">
      <VillageStreet position={PLACE.red} />
      <BannerFlag position={on(PLACE.red, -5.0, 3.2, -3.5)} rotationY={Math.PI / 2} color="#b5332a" trim="#f0c232" emblem="crown" />
      <BannerFlag position={on(PLACE.red, 5.0, 3.2, -3.5)} rotationY={-Math.PI / 2} color="#b5332a" trim="#f0c232" emblem="crown" />
      <BannerFlag position={on(PLACE.red, -5.0, 3.2, 6.5)} rotationY={Math.PI / 2} color="#b5332a" trim="#f0c232" emblem="star" />
      <BannerFlag position={on(PLACE.red, 5.0, 3.2, 6.5)} rotationY={-Math.PI / 2} color="#b5332a" trim="#f0c232" emblem="star" />
      <Clouds y={48} center={PLACE.red} />
      <GodRay position={on(PLACE.red, 0, 8, -4)} rotation={[0, 0, 0.22]} width={5.5} height={14} color="#fff3cc" opacity={0.07} />
      <Glow position={on(PLACE.red, 0, 3.6, -2)} size={3.2} color="#ffe8a8" opacity={0.18} />
      <Dust position={on(PLACE.red, 0, 2.2, 2)} area={[16, 4.5, 22]} count={45} size={0.038} color="#fff9df" opacity={0.45} seed={11} speed={0.18} />
    </Zone>

    {/* ---- ZONE 2: Twin Islands Across Open Water (Red Island South <-> Oak Bridge <-> Blue Island North) ---- */}
    <Zone name="bridge">
      {/* Wide shimmering turquoise sea surrounding BOTH distinct islands on all sides */}
      <Water position={on(PLACE.bridge, 0, -1.25, 0)} size={[120, 0.35, 110]} />

      {/* SOUTH LANDMASS: RED ISLAND (z: +7.5..+27.5, x: -16..+16) with stone sea-cliff base */}
      <Vox kind="stoneBrick" position={on(PLACE.bridge, 0, -0.82, 17.5)} size={[32.6, 1.56, 20.6]} />
      <Vox kind="grass" position={on(PLACE.bridge, 0, -0.09, 17.5)} size={[32.0, 0.1, 20.0]} />
      {/* Red Island cobble plaza flush at y=0 (strictly z: +7.6..+18.4, zero overlap with bridge planks!) */}
      <Vox kind="cobble" position={on(PLACE.bridge, 0, -0.02, 13.0)} size={[10.4, 0.04, 10.8]} />

      {/* NORTH LANDMASS: BLUE ISLAND (z: -27.5..-7.5, x: -16..+16) with stone sea-cliff base */}
      <Vox kind="stoneBrick" position={on(PLACE.bridge, 0, -0.82, -17.5)} size={[32.6, 1.56, 20.6]} />
      <Vox kind="grass" position={on(PLACE.bridge, 0, -0.09, -17.5)} size={[32.0, 0.1, 20.0]} />
      {/* Blue Island cobble plaza flush at y=0 (strictly z: -18.4..-7.6, zero overlap with bridge planks!) */}
      <Vox kind="cobble" position={on(PLACE.bridge, 0, -0.02, -13.0)} size={[10.4, 0.04, 10.8]} />

      {/* Connecting Oak Footbridge spanning open sea channel (strictly z: -7.45..+7.45, top y=0.00) */}
      <Vox kind="planks" position={on(PLACE.bridge, 0, -0.14, 0)} size={[7.4, 0.28, 14.9]} />
      {/* Bridge support piers descending into ocean */}
      <Vox kind="log" position={on(PLACE.bridge, -3.2, -0.95, -4.5)} size={[0.55, 1.5, 0.55]} />
      <Vox kind="log" position={on(PLACE.bridge, 3.2, -0.95, -4.5)} size={[0.55, 1.5, 0.55]} />
      <Vox kind="log" position={on(PLACE.bridge, -3.2, -0.95, 4.5)} size={[0.55, 1.5, 0.55]} />
      <Vox kind="log" position={on(PLACE.bridge, 3.2, -0.95, 4.5)} size={[0.55, 1.5, 0.55]} />
      {/* Guard rails along left & right bridge edges */}
      <Vox kind="darkPlanks" position={on(PLACE.bridge, -3.55, 0.45, 0)} size={[0.32, 0.9, 14.9]} />
      <Vox kind="darkPlanks" position={on(PLACE.bridge, 3.55, 0.45, 0)} size={[0.32, 0.9, 14.9]} />

      {/* Red Island warm red-roof cottages (South landmass) */}
      <Hut at={on(PLACE.bridge, -9.8, 0, 14.0)} w={6.2} d={5.6} h={4.0} wall="bricks" tint="#b85b4a" roof="#962820" turn={Math.PI / 2} />
      <SolidBox name="bridge-hut-SL" position={on(PLACE.bridge, -9.8, 2.0, 14.0)} size={[5.6, 4.0, 6.2]} />
      <Hut at={on(PLACE.bridge, 9.8, 0, 14.0)} w={6.2} d={5.6} h={4.0} wall="planks" tint="#cc9a64" roof="#962820" turn={-Math.PI / 2} />
      <SolidBox name="bridge-hut-SR" position={on(PLACE.bridge, 9.8, 2.0, 14.0)} size={[5.6, 4.0, 6.2]} />

      {/* Blue Island cobalt-roof workshops (North landmass) */}
      <Hut at={on(PLACE.bridge, -9.8, 0, -14.0)} w={6.4} d={5.6} h={4.2} wall="stoneBrick" tint="#9aa5b4" roof="#244a8a" turn={Math.PI / 2} />
      <SolidBox name="bridge-hut-NL" position={on(PLACE.bridge, -9.8, 2.1, -14.0)} size={[5.6, 4.2, 6.4]} />
      <Hut at={on(PLACE.bridge, 9.8, 0, -14.0)} w={6.4} d={5.6} h={4.2} wall="stoneBrick" tint="#9ea8b8" roof="#244a8a" turn={-Math.PI / 2} />
      <SolidBox name="bridge-hut-NR" position={on(PLACE.bridge, 9.8, 2.1, -14.0)} size={[5.6, 4.2, 6.4]} />

      {/* Island shoreline banners */}
      <BannerFlag position={on(PLACE.bridge, -4.6, 2.4, 9.2)} color="#b5332a" trim="#f0c232" emblem="crown" />
      <BannerFlag position={on(PLACE.bridge, 4.6, 2.4, 9.2)} color="#b5332a" trim="#f0c232" emblem="crown" />
      <BannerFlag position={on(PLACE.bridge, -4.6, 2.4, -9.2)} color="#27549c" trim="#57f2f2" emblem="gem" />
      <BannerFlag position={on(PLACE.bridge, 4.6, 2.4, -9.2)} color="#27549c" trim="#57f2f2" emblem="gem" />
      <Tree position={on(PLACE.bridge, -12.5, 0, 19.5)} height={4.8} />
      <Tree position={on(PLACE.bridge, 12.5, 0, 19.5)} height={4.5} />
      <Tree position={on(PLACE.bridge, -12.5, 0, -19.5)} height={4.6} />
      <Tree position={on(PLACE.bridge, 12.5, 0, -19.5)} height={4.6} />
      <LampPost position={on(PLACE.bridge, -4.2, 0, 7.8)} seed={31} />
      <LampPost position={on(PLACE.bridge, 4.2, 0, -7.8)} seed={32} />
      <Clouds y={48} center={PLACE.bridge} />
      <GodRay position={on(PLACE.bridge, 0, 8, 0)} rotation={[0, 0, 0.2]} width={6} height={14} color="#fff4d0" opacity={0.08} />
      <LightPool position={on(PLACE.bridge, 0, 0.08, 0)} width={10} depth={14} color="#fff5d8" opacity={0.16} />
      <Glow position={on(PLACE.bridge, 0, 3.5, 0)} size={3.4} color="#ffefc0" opacity={0.18} />
      <Dust position={on(PLACE.bridge, 0, 2.0, 0)} area={[16, 4.5, 22]} count={45} size={0.038} color="#fff8dd" opacity={0.48} seed={33} speed={0.2} />
    </Zone>

    {/* ---- ZONE 3: Blue Island Craft Plaza (Zero Coplanar Ground!) ---- */}
    <Zone name="blue">
      <Vox kind="grass" position={on(PLACE.blue, 0, -0.3, 0)} size={[58, 0.5, 58]} />
      <Vox kind="cobble" position={on(PLACE.blue, 0, -0.025, 2)} size={[15, 0.05, 22]} />
      {/* Approach path strictly south of cobble plaza (z: 13.05..27.05) */}
      <Vox kind="path" position={on(PLACE.blue, 0, -0.025, 20.05)} size={[6, 0.05, 14]} />
      <Hut at={on(PLACE.blue, -9.8, 0, 0)} w={6.6} d={5.8} h={4.4} wall="stoneBrick" tint="#95a3b8" roof="#1e4488" turn={Math.PI / 2} />
      <SolidBox name="blue-hut-L" position={on(PLACE.blue, -9.8, 2.2, 0)} size={[5.8, 4.4, 6.6]} />
      <Hut at={on(PLACE.blue, 9.8, 0, 0)} w={6.6} d={5.8} h={4.4} wall="stoneBrick" tint="#99a8bd" roof="#1e4488" turn={-Math.PI / 2} />
      <SolidBox name="blue-hut-R" position={on(PLACE.blue, 9.8, 2.2, 0)} size={[5.8, 4.4, 6.6]} />
      <Hut at={on(PLACE.blue, 0, 0, -11.5)} w={9.0} d={6.0} h={5.2} wall="stoneBrick" tint="#8d9cb2" roof="#1b347a" />
      <SolidBox name="blue-hut-N" position={on(PLACE.blue, 0, 2.6, -11.5)} size={[9.0, 5.2, 6.0]} />
      <BannerFlag position={on(PLACE.blue, -3.2, 3.2, -8.3)} color="#1b347a" trim="#57f2f2" emblem="gem" />
      <BannerFlag position={on(PLACE.blue, 3.2, 3.2, -8.3)} color="#1b347a" trim="#57f2f2" emblem="gem" />
      <Tree position={on(PLACE.blue, -10.5, 0, 10)} height={4.8} />
      <Tree position={on(PLACE.blue, 10.5, 0, 10)} height={4.5} />
      <LampPost position={on(PLACE.blue, -5.6, 0, 5.5)} seed={41} />
      <LampPost position={on(PLACE.blue, 5.6, 0, 5.5)} seed={42} />
      <Clouds y={48} center={PLACE.blue} />
      <GodRay position={on(PLACE.blue, 0, 8, -2)} rotation={[0, 0, -0.18]} width={5.5} height={14} color="#e6f5ff" opacity={0.07} />
      <LightPool position={on(PLACE.blue, 0, 0.06, 2)} width={13} depth={14} color="#edf7ff" opacity={0.18} />
      <Glow position={on(PLACE.blue, 0, 3.6, -2)} size={3.2} color="#cceeff" opacity={0.18} />
      <Dust position={on(PLACE.blue, 0, 2.2, 2)} area={[16, 4.5, 18]} count={40} size={0.036} color="#eef8ff" opacity={0.45} seed={43} speed={0.18} />
    </Zone>
  </group>
);
