import type React from "react";
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
 * 3-Zone Grounded Minecraft Economics World:
 *   1. `red`    — Red Village Market Street (warm brick & crimson banners, Sam's smithy & Maya's bakery)
 *   2. `bridge` — Sunlit Oak Border Bridge over shimmering river linking Red Village (W) and Blue Village (E)
 *   3. `blue`   — Blue Village Craft Plaza (spruce & royal-blue banners, Alex's low-cost sword smithy)
 */
export const World: React.FC = () => (
  <group>
    {/* ---- ZONE 1: Red Village Main Street ---- */}
    <Zone name="red">
      <VillageStreet position={PLACE.red} />
      <BannerFlag position={on(PLACE.red, -5.0, 3.2, -3.5)} rotationY={Math.PI / 2} color="#b5332a" trim="#f0c232" emblem="crown" />
      <BannerFlag position={on(PLACE.red, 5.0, 3.2, -3.5)} rotationY={-Math.PI / 2} color="#b5332a" trim="#f0c232" emblem="crown" />
      <BannerFlag position={on(PLACE.red, -5.0, 3.2, 6.5)} rotationY={Math.PI / 2} color="#b5332a" trim="#f0c232" emblem="star" />
      <BannerFlag position={on(PLACE.red, 5.0, 3.2, 6.5)} rotationY={-Math.PI / 2} color="#b5332a" trim="#f0c232" emblem="star" />
      <Clouds y={48} center={PLACE.red} />
      <GodRay position={on(PLACE.red, 0, 8, -4)} rotation={[0, 0, 0.22]} width={5.5} height={14} color="#fff3cc" opacity={0.07} />
      <LightPool position={on(PLACE.red, 0, 0.06, 2)} width={12} depth={14} color="#fff5d6" opacity={0.18} />
      <Glow position={on(PLACE.red, 0, 3.6, -2)} size={3.2} color="#ffe8a8" opacity={0.18} />
      <Dust position={on(PLACE.red, 0, 2.2, 2)} area={[16, 4.5, 22]} count={45} size={0.038} color="#fff9df" opacity={0.45} seed={11} speed={0.18} />
    </Zone>

    {/* ---- ZONE 2: River Crossing Border Bridge (Red West <-> Blue East) ---- */}
    <Zone name="bridge">
      {/* Sparkling river below bridge */}
      <Water position={on(PLACE.bridge, 0, -1.2, 0)} size={[70, 0.35, 14]} />
      <Vox kind="grass" position={on(PLACE.bridge, 0, -0.45, -18)} size={[70, 1.5, 24]} />
      <Vox kind="grass" position={on(PLACE.bridge, 0, -0.45, 18)} size={[70, 1.5, 24]} />
      {/* Wide cobble & oak plank border crossing spanning north-south over river */}
      <Vox kind="planks" position={on(PLACE.bridge, 0, -0.15, 0)} size={[7.6, 0.35, 16]} />
      <Vox kind="cobble" position={on(PLACE.bridge, 0, -0.04, 14)} size={[8.4, 0.2, 16]} />
      <Vox kind="cobble" position={on(PLACE.bridge, 0, -0.04, -14)} size={[8.4, 0.2, 16]} />
      {/* Guard rails along left & right edges of bridge */}
      <Vox kind="darkPlanks" position={on(PLACE.bridge, -3.7, 0.45, 0)} size={[0.35, 0.9, 16]} />
      <Vox kind="darkPlanks" position={on(PLACE.bridge, 3.7, 0.45, 0)} size={[0.35, 0.9, 16]} />
      {/* Red Village cottages framing south bank, Blue Village workshops framing north bank */}
      <Hut at={on(PLACE.bridge, -9.5, 0.3, 12)} w={6.2} d={5.6} h={4.0} wall="bricks" tint="#b85b4a" roof="#962820" turn={Math.PI / 2} />
      <Hut at={on(PLACE.bridge, 9.5, 0.3, 12)} w={6.2} d={5.6} h={4.0} wall="planks" tint="#cc9a64" roof="#962820" turn={-Math.PI / 2} />
      <Hut at={on(PLACE.bridge, -9.5, 0.3, -12)} w={6.4} d={5.6} h={4.2} wall="stoneBrick" tint="#9aa5b4" roof="#244a8a" turn={Math.PI / 2} />
      <Hut at={on(PLACE.bridge, 9.5, 0.3, -12)} w={6.4} d={5.6} h={4.2} wall="stoneBrick" tint="#9ea8b8" roof="#244a8a" turn={-Math.PI / 2} />
      <BannerFlag position={on(PLACE.bridge, -4.4, 2.4, 9.5)} color="#b5332a" trim="#f0c232" emblem="crown" />
      <BannerFlag position={on(PLACE.bridge, 4.4, 2.4, 9.5)} color="#b5332a" trim="#f0c232" emblem="crown" />
      <BannerFlag position={on(PLACE.bridge, -4.4, 2.4, -9.5)} color="#27549c" trim="#57f2f2" emblem="gem" />
      <BannerFlag position={on(PLACE.bridge, 4.4, 2.4, -9.5)} color="#27549c" trim="#57f2f2" emblem="gem" />
      <Tree position={on(PLACE.bridge, -12, 0.3, 17)} height={4.8} />
      <Tree position={on(PLACE.bridge, 12, 0.3, -17)} height={4.6} />
      <LampPost position={on(PLACE.bridge, -4.1, 0.05, 7.2)} seed={31} />
      <LampPost position={on(PLACE.bridge, 4.1, 0.05, -7.2)} seed={32} />
      <Clouds y={48} center={PLACE.bridge} />
      <GodRay position={on(PLACE.bridge, 0, 8, 0)} rotation={[0, 0, 0.2]} width={6} height={14} color="#fff4d0" opacity={0.08} />
      <LightPool position={on(PLACE.bridge, 0, 0.08, 0)} width={10} depth={14} color="#fff5d8" opacity={0.18} />
      <Glow position={on(PLACE.bridge, 0, 3.5, 0)} size={3.4} color="#ffefc0" opacity={0.18} />
      <Dust position={on(PLACE.bridge, 0, 2.0, 0)} area={[16, 4.5, 22]} count={45} size={0.038} color="#fff8dd" opacity={0.48} seed={33} speed={0.2} />
    </Zone>

    {/* ---- ZONE 3: Blue Village Craft Plaza ---- */}
    <Zone name="blue">
      <Vox kind="grass" position={on(PLACE.blue, 0, -0.25, 0)} size={[58, 0.5, 58]} />
      <Vox kind="cobble" position={on(PLACE.blue, 0, 0.02, 2)} size={[15, 0.08, 22]} />
      <Vox kind="path" position={on(PLACE.blue, 0, 0.03, 16)} size={[6, 0.06, 16]} />
      <Hut at={on(PLACE.blue, -9.8, 0, 0)} w={6.6} d={5.8} h={4.4} wall="stoneBrick" tint="#95a3b8" roof="#1e4488" turn={Math.PI / 2} />
      <Hut at={on(PLACE.blue, 9.8, 0, 0)} w={6.6} d={5.8} h={4.4} wall="stoneBrick" tint="#99a8bd" roof="#1e4488" turn={-Math.PI / 2} />
      <Hut at={on(PLACE.blue, 0, 0, -11.5)} w={9.0} d={6.0} h={5.2} wall="stoneBrick" tint="#8d9cb2" roof="#1b347a" />
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
