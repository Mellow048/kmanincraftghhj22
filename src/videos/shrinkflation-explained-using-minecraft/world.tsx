import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone } from "../../engine";
import {
  Block,
  GroceryShelf,
  KitchenCounterSet,
  PLACE,
  PlainsVillageMap,
  ShopStand,
  Vox,
} from "./kit";

/**
 * 3-Zone World for "Shrinkflation, Explained Using Minecraft":
 * - `bakery`: Sterling's sunlit Bakery counter + towering emerald vault
 * - `workshop`: Back bakery kitchen counter where Sterling secretly shrinks cakes
 * - `market`: Sunlit Plains Village market + farm + real-world grocery aisle
 */
export const World: React.FC = () => (
  <>
    {/* ZONE 1: STERLING'S BAKERY & EMERALD VAULT */}
    <Zone name="bakery">
      <group position={PLACE.bakery}>
        <Vox kind="grass" position={[0, -0.25, 0]} size={[44, 0.5, 44]} />
        <Block position={[0, 0.02, 1.0]} size={[14.0, 0.04, 12.0]} color="#d4c7a3" />
        <ShopStand position={[0, 0, -2.0]} title="STERLING'S BAKERY" awningColor="#d93829" itemColor="#f5f3ee" />
        {/* Sterling's towering emerald vault on the right */}
        <group position={[4.8, 0, -2.6]}>
          <Vox kind="stoneBrick" position={[0, 2.3, 0]} size={[3.6, 4.6, 3.2]} />
          <Block position={[0, 2.1, 1.65]} size={[2.0, 2.6, 0.1]} color="#25d963" emissive="#1cb850" emissiveIntensity={0.22} />
        </group>
        <GodRay position={[0, 5.5, 0]} width={3.6} height={11} color="#fff2c8" opacity={0.14} />
        <LightPool position={[0, 0.05, 0.8]} width={6.8} depth={5.6} color="#ffeab3" opacity={0.14} />
        <Glow position={[4.8, 2.4, -0.8]} size={1.6} color="#3ee878" opacity={0.24} />
        <Dust count={40} position={[0, 2.2, 0]} area={[14, 4.5, 14]} color="#fff3d6" opacity={0.32} />
      </group>
    </Zone>

    {/* ZONE 2: SECRET BACK BAKERY WORKSHOP */}
    <Zone name="workshop">
      <group position={PLACE.workshop}>
        <KitchenCounterSet position={[0, 0, 0]} />
        <LightPool position={[0, 0.02, 0]} width={5.5} depth={5.5} color="#ffdfb0" opacity={0.18} />
      </group>
    </Zone>

    {/* ZONE 3: SUNLIT MARKET, FARM & GROCERY AISLE */}
    <Zone name="market">
      <group position={PLACE.market}>
        <PlainsVillageMap position={[0, 0, 0]} />
        {/* Real-world grocery aisle set cleanly to the right */}
        <GroceryShelf position={[9.5, 0, -2.0]} />
        <LightPool position={[0, 0.02, 2.0]} width={7} depth={7} color="#ffeab3" opacity={0.14} />
      </group>
    </Zone>
  </>
);
