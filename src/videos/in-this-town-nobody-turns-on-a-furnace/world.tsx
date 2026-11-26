import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone } from "../../engine";
import {
  BedBox,
  Bell,
  BerryPlate,
  Fence,
  Furnace,
  Hut,
  LampPost,
  PLACE,
  Room,
  SnowTrail,
  Stall,
  Well,
  room,
} from "./kit";

/**
 * WORLD: "In This Town, Nobody Turns On a Furnace"
 * Dense, valley-closed Minecraft town + interior Room + summer Bakery zone
 * so EVERY 9:16 portrait shot sees houses, roofs, stalls, cobblestone, or hills behind the actors.
 */
export const World: React.FC = () => (
  <>
    <Zone name="town">
      {/* Grass base + main street road + town square */}
      <Vox kind="grass" side="dirt" position={[0, -0.25, 0]} size={[110, 0.5, 90]} />
      <Vox kind="cobble" position={[0, -0.21, 1.8]} size={[48, 0.5, 4.4]} />
      <Vox kind="cobble" position={[0, -0.20, 1.2]} size={[12, 0.5, 11]} />

      {/* Crisp morning SnowTrail curving down from Hero's house across town square */}
      <SnowTrail
        points={[
          [-0.4, 0.06, -2.0],
          [0.2, 0.06, -1.1],
          [-0.3, 0.06, -0.1],
          [0.4, 0.06, 0.8],
          [-0.2, 0.06, 1.7],
          [0.6, 0.06, 2.3],
        ]}
      />

      {/* North row of village houses right behind square sightlines */}
      <Hut at={[-18.5, 0, -5.5]} w={6.5} wall="planks" roof="#3f6b3a" windows={[-1.8, 1.8]} />
      <Hut at={[-9.0, 0, -4.8]} w={6.5} h={3.8} wall="cobble" roof="#5a4a6a" windows={[-1.8, 1.8]} />
      {/* Hero & Snow Golem Parents' cozy blue-roofed home directly north of center square */}
      <Hut at={[0, 0, -6.2]} w={8.4} d={6.5} h={4.4} wall="planks" roof="#3d5f9a" windows={[-2.6, 2.6]} open />
      <Hut at={[9.5, 0, -5.0]} w={6.5} tint="#caa268" roof="#8a3b2a" door={-1.2} windows={[1.6]} />

      {/* South row so reverse angles also see village fronts */}
      <Hut at={[-10.5, 0, 11.5]} w={6.5} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
      <Hut at={[1.2, 0, 12.0]} w={6.5} h={3.8} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
      <Hut at={[12.0, 0, 11.0]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.5]} turn={Math.PI} />

      {/* Landmarks spaced across distinct town zones */}
      <Bell position={[-1.8, 0, -1.9]} />
      <Well position={[-5.4, 0, 2.6]} />
      <Stall position={[5.2, 0, -2.2]} />
      <Fence from={[-8.0, 0, -3.5]} to={[-4.8, 0, -3.5]} />
      <Fence from={[4.2, 0, -4.2]} to={[7.2, 0, -4.2]} />
      <LampPost position={[-4.4, 0, -1.6]} seed={2} />
      <LampPost position={[3.2, 0, -0.8]} seed={4} />

      {/* Blacksmith cobble smithy & glowing furnace on east edge */}
      <Hut at={[7.8, 0, 2.0]} w={4.8} d={4.4} h={3.4} wall="cobble" roof="#3a3331" door={0} turn={-Math.PI / 2} ablaze />
      <Furnace position={[4.5, 0, 1.5]} rotationY={-Math.PI / 2} lit />

      {/* Village trees filling courtyard gaps */}
      <Tree position={[-6.8, 0, -2.8]} height={4.2} />
      <Tree position={[6.5, 0, -6.5]} height={4.0} leaf="#4b8d33" />
      <Tree position={[-4.5, 0, -10.5]} height={4.6} leaf="#3f7f2d" />
      <Tree position={[4.2, 0, -10.2]} height={4.3} leaf="#4a8c33" />
      <Tree position={[-7.5, 0, 6.2]} height={3.8} />
      <Tree position={[8.2, 0, 6.4]} height={3.9} leaf="#3f7f2d" />

      {/* Stepped green valley ridges north & south so zero shot ever looks into a bare horizon */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Vox kind="grass" tint="#5a9a3a" position={[0, 1.5, s * 32]} size={[110, 3, 12]} />
          <Vox kind="grass" tint="#538f36" position={[0, 4.2, s * 37]} size={[110, 3, 8]} />
          {[-26, -16, -6, 4, 14, 24].map((x, i) => (
            <Tree key={x} position={[x, 3, s * (28 + (i % 2) * 2)]} height={3.8 + (i % 3) * 0.5} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
          ))}
        </group>
      ))}

      <GodRay position={[-2, 6, 1]} rotation={[0, 0, 0.4]} width={5} height={12} color="#fff5d6" opacity={0.07} />
      <LightPool position={[0, 0.04, 1.5]} width={9.5} depth={8.5} color="#fff4d8" opacity={0.2} />
      <Glow position={[0, 2.2, 1.0]} size={2.0} color="#ffe8aa" opacity={0.2} />
      <Dust position={[0, 2.0, 1.5]} area={[12, 4, 12]} count={32} size={0.04} color="#fff9df" opacity={0.5} seed={3} speed={0.2} />
    </Zone>

    <Zone name="room">
      <Room at={PLACE.room} night={false} />
      <BedBox position={room(-1.6, 0, -1.35)} />
      {/* Dark unlit stone Furnace cleanly inside north plank wall */}
      <Furnace position={room(0.2, 0, -1.85)} lit={false} />
      {/* Breakfast table right-front so cold furnace & Hero stay unobstructed */}
      <Vox kind="planks" position={room(1.45, 0.4, 0.55)} size={[1.45, 0.8, 0.95]} />
      <BerryPlate position={room(1.2, 0.82, 0.45)} />
      <BerryPlate position={room(1.72, 0.82, 0.65)} />
    </Zone>

    <Zone name="bakery">
      <Vox kind="grass" side="dirt" position={[PLACE.bakery[0], -0.25, PLACE.bakery[2]]} size={[44, 0.5, 44]} />
      <Vox kind="cobble" position={[PLACE.bakery[0], -0.22, PLACE.bakery[2] + 1.5]} size={[14, 0.5, 11]} />
      <Hut at={[PLACE.bakery[0], 0, PLACE.bakery[2] - 2.5]} wall="planks" roof="#8a3b2a" door={0} windows={[-2, 2]} open />
      {/* Flanking village cottages & trees so every bakery angle has rich village framing */}
      <Hut at={[PLACE.bakery[0] - 8.5, 0, PLACE.bakery[2] - 2.0]} w={5.5} wall="cobble" roof="#5a4a6a" windows={[-1.5, 1.5]} />
      <Hut at={[PLACE.bakery[0] + 8.5, 0, PLACE.bakery[2] - 1.5]} w={5.5} tint="#caa268" roof="#3f6b3a" windows={[-1.5]} />
      <Stall position={[PLACE.bakery[0] - 4.4, 0, PLACE.bakery[2] + 0.5]} />
      <Fence from={[PLACE.bakery[0] + 3.8, 0, PLACE.bakery[2] - 1.5]} to={[PLACE.bakery[0] + 6.0, 0, PLACE.bakery[2] - 1.5]} />
      {/* Waist-high bakery counter so all 4 kids remain clearly visible above it in 6.trap */}
      <Vox kind="planks" position={[PLACE.bakery[0], 0.29, PLACE.bakery[2] + 0.65]} size={[2.6, 0.58, 0.45]} />
      <Furnace position={[PLACE.bakery[0] + 1.5, 0, PLACE.bakery[2] - 1.2]} rotationY={-0.35} lit />
      <Furnace position={[PLACE.bakery[0] + 2.5, 0, PLACE.bakery[2] - 1.2]} rotationY={-0.35} lit />
      <Tree position={[PLACE.bakery[0] - 5.5, 0, PLACE.bakery[2] - 4.8]} height={4.1} leaf="#7a6830" />
      <Tree position={[PLACE.bakery[0] + 5.8, 0, PLACE.bakery[2] - 4.5]} height={3.9} leaf="#6e602b" />
      <Vox kind="grass" tint="#5a9a3a" position={[PLACE.bakery[0], 1.5, PLACE.bakery[2] - 18]} size={[44, 3, 8]} />
      <LightPool position={[PLACE.bakery[0], 0.04, PLACE.bakery[2]]} width={7.5} depth={7.5} color="#ffe4b8" opacity={0.2} />
      <Dust position={[PLACE.bakery[0], 2.0, PLACE.bakery[2]]} area={[8, 4, 8]} count={26} size={0.035} color="#ffeac4" opacity={0.48} seed={7} speed={0.2} />
    </Zone>
  </>
);
