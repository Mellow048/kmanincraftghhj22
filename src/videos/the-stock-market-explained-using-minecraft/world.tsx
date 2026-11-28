import type React from "react";
import {
  BannerFlag,
  Block,
  Clouds,
  CoinPile,
  CouncilTable,
  DetailedBookshelf,
  Dust,
  EXCHANGE_POS,
  ForgeFurnace,
  Glow,
  GodRay,
  IronAnvil,
  IronworkersMarket,
  LampPost,
  LightPool,
  OFFICE_POS,
  ShopStall,
  SolidBox,
  StoneBillboard,
  Vox,
  Zone,
  on,
} from "./kit";
import { CraftingStation, ShopStand } from "../../../Topics/Shared/universal";

/**
 * Three 100% distinct persistent worlds with mandatory atmosphere (GodRay, LightPool, Glow, Dust)
 * and Remaster v7 <SolidBox> collision / camera anti-clip at non-overlapping zone offsets:
 *  - "forge" ([0,0,0]): BRAND-NEW Ironworkers' Stone-and-Terracotta Market Town (2-story stone/birch townhouses, clocktower, fountain, alpine pines — zero village reuse!) featuring Sam's open-front Blacksmith Forge.
 *  - "exchange" (EXCHANGE_POS): grand sunlit cobblestone Market Exchange Plaza with emerald banners & stone ticker wall.
 *  - "office" (OFFICE_POS): Sterling's luxury oak-and-gold tycoon parlor with tall enclosing walls, bookshelves, desk, and emerald vault piles.
 */
export const World: React.FC = () => (
  <>
    <Zone name="forge">
      <IronworkersMarket />
      <Clouds y={25} />
      <group position={[2.8, 0, 2.0]}>
        <Vox kind="cobble" position={[0, 0.06, 0]} size={[3.6, 0.12, 5.2]} />
        <Vox kind="stoneBrick" tint="#7c8591" position={[1.45, 1.5, 0]} size={[0.28, 3.0, 5.0]} />
        <Vox kind="planks" tint="#5c3a1e" position={[0, 3.1, 0]} size={[3.8, 0.26, 5.4]} />
        <Vox kind="planks" tint="#4d2f18" position={[-1.55, 1.5, -2.35]} size={[0.22, 3.0, 0.22]} />
        <Vox kind="planks" tint="#4d2f18" position={[-1.55, 1.5, 2.35]} size={[0.22, 3.0, 0.22]} />
        <ForgeFurnace position={[0.45, 0.12, -1.1]} rotationY={-Math.PI / 2} lit />
        <IronAnvil position={[-0.75, 0.12, 1.35]} rotationY={Math.PI / 2} />
      </group>
      <SolidBox name="forge-back-wall" position={[4.25, 1.5, 2.0]} size={[0.4, 3.2, 5.2]} />
      <ShopStall position={[-2.9, 0, -4.2]} rotationY={Math.PI / 2} price="10" showPickaxe />
      <CraftingStation position={[-3.2, 0, 0.2]} rotationY={0.4} />
      <GodRay position={[0.4, 6.4, 2.0]} rotation={[0.14, 0, -0.18]} width={3.8} height={11} color="#fff1c4" opacity={0.14} />
      <LightPool position={[1.6, 0.08, 2.0]} width={4.6} depth={5.2} color="#ffb95a" opacity={0.24} />
      <Glow position={[2.6, 1.3, 1.0]} size={1.9} color="#ff9933" opacity={0.28} />
      <Dust position={[0.5, 2.1, 1.5]} area={[9, 3.8, 12]} count={32} color="#ffeec2" opacity={0.34} />
    </Zone>

    <Zone name="exchange">
      <group position={EXCHANGE_POS}>
        <Vox kind="grass" side="dirt" position={[0, -0.5, 0]} size={[56, 1, 56]} />
        <Vox kind="cobble" position={[0, 0.02, 0]} size={[18, 0.06, 22]} />
        <Vox kind="stone" position={[0, 0.08, -2.5]} size={[9.5, 0.12, 7.0]} />
        <Vox kind="stoneBrick" position={[0, 0.45, -8.5]} size={[6.4, 0.9, 1.2]} />
        <StoneBillboard text="FORGE MARKET" position={[0, 0.9, -8.5]} />
        <ShopStand position={on(EXCHANGE_POS, -4.8, 0, -3.5)} rotationY={0.45} />
        <BannerFlag position={[-5.2, 0, -7.2]} color="#2eb85c" trim="#ffd84d" />
        <BannerFlag position={[5.2, 0, -7.2]} color="#2eb85c" trim="#ffd84d" />
        <BannerFlag position={[-6.8, 0, -1.5]} color="#1d4d8f" trim="#ffd84d" />
        <BannerFlag position={[6.8, 0, -1.5]} color="#1d4d8f" trim="#ffd84d" />
        <LampPost position={[-5.4, 0, 3.5]} />
        <LampPost position={[5.4, 0, 3.5]} />
        <Clouds y={24} />
        <GodRay position={[0, 6.5, -1.2]} rotation={[0.12, 0, -0.16]} width={4.4} height={11} color="#fff2c8" opacity={0.14} />
        <LightPool position={[0, 0.16, -0.6]} width={6.0} depth={5.2} color="#fff0b8" opacity={0.22} />
        <Glow position={[0, 2.4, -7.6]} size={2.0} color="#9ef5be" opacity={0.24} />
        <Dust position={[0, 2.2, 0]} area={[10, 4, 12]} count={34} color="#fff4cf" opacity={0.32} />
      </group>
      <SolidBox name="exchange-billboard" position={on(EXCHANGE_POS, 0, 2.5, -8.5)} size={[9.0, 5.0, 1.2]} />
    </Zone>

    <Zone name="office">
      <group position={OFFICE_POS}>
        <Vox kind="planks" tint="#5e3d24" position={[0, -0.1, 0]} size={[16, 0.2, 16]} />
        <Vox kind="planks" tint="#49301e" position={[0, 3.25, -5.2]} size={[16, 6.8, 0.4]} />
        <Vox kind="planks" tint="#49301e" position={[-6.4, 3.25, 0.5]} size={[0.4, 6.8, 14]} />
        <Vox kind="planks" tint="#49301e" position={[6.4, 3.25, 0.5]} size={[0.4, 6.8, 14]} />
        <Block position={[0, 0.02, 0.4]} size={[5.4, 0.03, 4.4]} color="#1f6e43" />
        <Block position={[0, 0.03, 0.4]} size={[5.0, 0.02, 4.0]} color="#e5b83b" />
        <Block position={[0, 0.04, 0.4]} size={[4.7, 0.02, 3.7]} color="#1d5938" />
        <DetailedBookshelf position={[-3.2, 0, -4.5]} />
        <DetailedBookshelf position={[3.2, 0, -4.5]} />
        <BannerFlag position={[0, 0, -4.6]} color="#1a2f57" trim="#f0c146" />
        <CouncilTable position={[0, 0, -1.2]} />
        <CoinPile position={[-2.6, 0, -1.6]} count={18} kind="emerald" />
        <CoinPile position={[2.6, 0, -1.4]} count={18} kind="emerald" />
        <GodRay position={[0.6, 4.2, -0.4]} rotation={[0.16, 0, -0.2]} width={2.8} height={7.5} color="#ffd98c" opacity={0.14} />
        <LightPool position={[0, 0.06, 0.2]} width={4.6} depth={4.2} color="#ffcf75" opacity={0.26} />
        <Glow position={[0, 2.2, -1.2]} size={1.9} color="#ffd97a" opacity={0.26} />
        <Dust position={[0, 1.8, 0]} area={[7, 3.2, 7]} count={26} color="#ffdfa0" opacity={0.3} />
      </group>
      {/* Solid office walls for v7 camera anti-clip & actor pushback (open +Z for camera) */}
      <SolidBox name="office-back" position={on(OFFICE_POS, 0, 3.25, -5.2)} size={[16, 6.8, 0.5]} />
      <SolidBox name="office-left" position={on(OFFICE_POS, -6.4, 3.25, 0.5)} size={[0.5, 6.8, 14]} />
      <SolidBox name="office-right" position={on(OFFICE_POS, 6.4, 3.25, 0.5)} size={[0.5, 6.8, 14]} />
    </Zone>
  </>
);
