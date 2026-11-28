import type React from "react";
import { Dust, Glow, GodRay, LightPool, Zone } from "../../engine";
import {
  BeeHiveBox,
  Block,
  HoneyJarWall,
  PLACE,
  PlainsVillageMap,
  Room,
  ShopStand,
  Sign,
  Vox,
  Well,
} from "./kit";

/**
 * 4-Zone World for "In This Town, Nobody Eats the Honey":
 * - `hall`: Bright open-front Town Hall with 400 glowing amber jars & dusty FIRST jar
 * - `village`: Sunlit Plains Village with wooden bee hives, market & stone town well
 * - `school`: Warm indoor classroom / windowsill room
 * - `meadow`: Sunlit sunflower & poppy community rally meadow
 */
export const World: React.FC = () => (
  <>
    {/* ZONE 1: OPEN-FRONT SUNLIT HONEY HALL */}
    <Zone name="hall">
      <group position={PLACE.hall}>
        <Vox kind="grass" position={[0, -0.25, 0]} size={[42, 0.5, 42]} />
        <Vox kind="planks" position={[0, 0.03, 1.5]} size={[11.0, 0.06, 9.0]} />
        <HoneyJarWall position={[0, 0.06, -2.4]} lit={1} />
        <Sign title="HONEY HALL" position={[0, 3.78, -2.35]} width={3.6} height={0.72} />
        <GodRay position={[0, 5.2, 0.4]} width={3.4} height={10} color="#ffeab3" opacity={0.14} />
        <LightPool position={[0, 0.08, 0.6]} width={6.8} depth={5.6} color="#ffdfa0" opacity={0.16} />
        <Glow position={[0, 2.2, -1.8]} size={1.8} color="#ffb833" opacity={0.26} />
        <Dust count={44} position={[0, 2.2, 0.4]} area={[10, 4.5, 8]} color="#fff1c4" opacity={0.35} />
      </group>
    </Zone>

    {/* ZONE 2: SUNLIT VILLAGE STREET + HIVES + WELL */}
    <Zone name="village">
      <group position={PLACE.village}>
        <PlainsVillageMap position={[0, 0, 0]} />
        <BeeHiveBox position={[-4.8, 0, -2.2]} smoke={false} />
        <BeeHiveBox position={[-2.8, 0, -2.2]} smoke={false} />
        <ShopStand position={[4.8, 0, -2.6]} title="MARKET" awningColor="#e67e22" itemColor="#f5a623" />
        <Well position={[5.6, 0, 3.2]} />
        <LightPool position={[0, 0.02, 2.0]} width={7} depth={7} color="#ffeab3" opacity={0.14} />
      </group>
    </Zone>

    {/* ZONE 3: CLASSROOM / HOME WINDOWSILL */}
    <Zone name="school">
      <group position={PLACE.school}>
        <Room at={[0, 0, 0]} night={false} />
        {/* Sunlit open window sill on back wall (z = -2.4) */}
        <Block position={[0, 1.65, -2.38]} size={[2.2, 1.5, 0.1]} color="#8fd4ff" />
        <Vox kind="darkPlanks" position={[0, 0.88, -2.2]} size={[2.5, 0.14, 0.45]} />
        <LightPool position={[0, 0.02, 0.6]} width={4.2} depth={4.2} color="#ffdfb0" opacity={0.18} />
      </group>
    </Zone>

    {/* ZONE 4: GOLDEN SUNFLOWER & POPPY MEADOW */}
    <Zone name="meadow">
      <group position={PLACE.meadow}>
        <Vox kind="grass" position={[0, -0.25, 0]} size={[48, 0.5, 48]} />
        <BeeHiveBox position={[-5.4, 0, -4.5]} smoke={false} />
        <BeeHiveBox position={[5.4, 0, -4.5]} smoke={false} />
        <GodRay position={[0, 5.5, -2.0]} width={4.2} height={11} color="#ffeab3" opacity={0.15} />
        <Dust count={40} position={[0, 2.0, 0]} area={[16, 4, 16]} color="#fff2c8" opacity={0.35} />
      </group>
    </Zone>
  </>
);
