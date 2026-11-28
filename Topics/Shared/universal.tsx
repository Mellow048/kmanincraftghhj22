import React from "react";
import {
  Block,
  Glow,
  LightPool,
  Sign,
  SolidBox,
  Torch,
  Vox,
  Water,
} from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/**
 * UNIVERSAL MODULAR SET PIECES (Zero Z-Fighting, Auto-SolidBox, Cross-Topic).
 * Available in Explainer, ServerLore, InThisTown, and all other topics so agents
 * NEVER "gaslight" the viewer by narrating a shop, castle, mine, kitchen, or bridge
 * that isn't actually built on screen.
 */

/** Market / Shop Stand with striped awning, wooden counter, visible display item, and non-submerged sign. */
export const ShopStand: React.FC<{
  position?: Vec3;
  rotationY?: number;
  title?: string;
  awningColor?: string;
  itemColor?: string;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  title = "SHOP",
  awningColor = "#d93829",
  itemColor = "#4ce8ff",
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Wooden counter base */}
    <Vox kind="planks" position={[0, 0.5, 0]} size={[2.8, 1.0, 1.1]} />
    <Vox kind="darkPlanks" position={[0, 1.04, 0]} size={[3.0, 0.1, 1.24]} />
    {/* Four corner posts */}
    {[-1.3, 1.3].map((x) =>
      [-0.45, 0.45].map((z) => (
        <Vox key={`${x}_${z}`} kind="darkPlanks" position={[x, 1.75, z]} size={[0.14, 1.5, 0.14]} />
      )),
    )}
    {/* Striped awning canopy */}
    {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
      <Block
        key={i}
        position={[x, 2.58, 0]}
        rotation={[0.14, 0, 0]}
        size={[0.62, 0.14, 1.55]}
        color={i % 2 === 0 ? awningColor : "#f4f1ea"}
      />
    ))}
    {/* Visible display item on counter */}
    <Block
      position={[0, 1.26, 0]}
      rotation={[0.3, 0.5, 0]}
      size={[0.34, 0.34, 0.34]}
      color={itemColor}
      emissive={itemColor}
      emissiveIntensity={0.28}
    />
    {/* Crisp sign mounted cleanly above counter (never submerged!) */}
    <Sign title={title} position={[0, 2.95, 0.62]} width={2.1} height={0.5} />
    <Torch position={[-1.3, 1.45, 0.56]} />
    <Torch position={[1.3, 1.45, 0.56]} />
    <SolidBox name={`shop-${title}`} position={[position[0], position[1] + 0.55, position[2]]} size={[2.8, 1.1, 1.1]} blocksCamera={false} />
  </group>
);

/** Medieval Stone-Brick Castle Keep with 4 battlement towers, arched gate, banners, and torches. */
export const CastleKeep: React.FC<{
  position?: Vec3;
  rotationY?: number;
  bannerColor?: string;
}> = ({ position = [0, 0, -10], rotationY = 0, bannerColor = "#c8322b" }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Main curtain wall */}
    <Vox kind="stoneBrick" position={[0, 2.8, 0]} size={[11.0, 5.6, 1.6]} />
    {/* Dark recessed arched gateway */}
    <Block position={[0, 1.65, 0.72]} size={[2.8, 3.3, 0.35]} color="#201a16" />
    <Vox kind="darkPlanks" position={[0, 1.65, 0.6]} size={[2.5, 3.1, 0.25]} />
    {/* Left & right corner towers */}
    {[-5.2, 5.2].map((x) => (
      <group key={x} position={[x, 0, 0.4]}>
        <Vox kind="stoneBrick" position={[0, 3.8, 0]} size={[2.8, 7.6, 2.8]} />
        {/* Crenellations */}
        {[-1.0, 0, 1.0].map((cx) => (
          <Vox key={cx} kind="stoneBrick" position={[cx, 7.9, 1.1]} size={[0.55, 0.6, 0.55]} />
        ))}
        {/* Hanging castle banner */}
        <Block position={[0, 4.6, 1.48]} size={[0.85, 2.2, 0.08]} color={bannerColor} />
        <Block position={[0, 4.7, 1.53]} size={[0.36, 0.9, 0.04]} color="#f5d142" />
      </group>
    ))}
    <Torch position={[-2.1, 2.5, 0.96]} />
    <Torch position={[2.1, 2.5, 0.96]} />
    <SolidBox name="castle-wall" position={[position[0], position[1] + 2.8, position[2]]} size={[13.6, 5.6, 2.2]} />
  </group>
);

/** Flexible Indoor Kitchen / Home Counter Set (ideal for psychology/habit Explainers like perfectionism!). */
export const KitchenCounterSet: React.FC<{
  position?: Vec3;
  rotationY?: number;
}> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Clean tiled floor (non-coplanar, zero z-fighting) */}
    <Block position={[0, -0.18, 0]} size={[12, 0.34, 10]} color="#d8d4ca" />
    <Block position={[0, 2.1, -3.6]} size={[12, 4.2, 0.35]} color="#ece6d8" />
    <Block position={[-5.82, 2.1, 0.8]} size={[0.35, 4.2, 8.4]} color="#e2dccd" />
    <Block position={[5.82, 2.1, 0.8]} size={[0.35, 4.2, 8.4]} color="#e2dccd" />
    {/* Kitchen counter + sink + stack of dishes + stove */}
    <Vox kind="planks" tint="#8d653e" position={[0, 0.45, -2.7]} size={[5.2, 0.9, 1.0]} />
    <Block position={[0, 0.94, -2.7]} size={[5.3, 0.08, 1.08]} color="#cfd6de" />
    {/* Recessed sink basin + faucet */}
    <Block position={[-0.8, 0.97, -2.7]} size={[1.1, 0.05, 0.65]} color="#4d6d85" />
    <Block position={[-0.8, 1.22, -3.05]} size={[0.1, 0.44, 0.1]} color="#98a4b0" />
    {/* Neat stack of white plates */}
    {[0, 1, 2, 3].map((i) => (
      <Block key={i} position={[0.6, 1.005 + i * 0.055, -2.65]} size={[0.42, 0.05, 0.42]} color="#ffffff" />
    ))}
    {/* Window above sink */}
    <Block position={[-0.8, 2.25, -3.4]} size={[1.8, 1.2, 0.1]} color="#a3dcff" emissive="#88d0ff" emissiveIntensity={0.35} />
    <SolidBox name="kitchen-back" position={[position[0], position[1] + 2.1, position[2] - 3.6]} size={[12, 4.2, 0.4]} />
  </group>
);

/** Timber-Framed Mine Entrance with stone arch, rails, ore blocks, and lanterns. */
export const MineEntrance: React.FC<{
  position?: Vec3;
  rotationY?: number;
}> = ({ position = [0, 0, -6], rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="cobble" position={[-2.2, 1.6, 0]} size={[1.8, 3.2, 3.2]} />
    <Vox kind="cobble" position={[2.2, 1.6, 0]} size={[1.8, 3.2, 3.2]} />
    <Vox kind="cobble" position={[0, 3.2, 0]} size={[6.2, 1.2, 3.2]} />
    {/* Dark mine interior recess */}
    <Block position={[0, 1.4, -1.2]} size={[2.8, 2.8, 0.4]} color="#0f1014" />
    {/* Oak support beams */}
    <Vox kind="darkPlanks" position={[-1.25, 1.35, 1.45]} size={[0.26, 2.7, 0.26]} />
    <Vox kind="darkPlanks" position={[1.25, 1.35, 1.45]} size={[0.26, 2.7, 0.26]} />
    <Vox kind="darkPlanks" position={[0, 2.65, 1.45]} size={[2.8, 0.26, 0.26]} />
    {/* Steel minecart rails leading out (y=+0.05, zero z-fighting!) */}
    <Block position={[-0.45, 0.05, 2.2]} size={[0.08, 0.04, 4.4]} color="#8c96a4" />
    <Block position={[0.45, 0.05, 2.2]} size={[0.08, 0.04, 4.4]} color="#8c96a4" />
    <Torch position={[-1.25, 2.0, 1.66]} />
    <Torch position={[1.25, 2.0, 1.66]} />
  </group>
);

/** Two Distinct Islands Separated by Real Water with a Wooden Bridge Between Them. */
export const IslandBridge: React.FC<{
  position?: Vec3;
  leftColor?: string;
  rightColor?: string;
}> = ({ position = [0, 0, 0], leftColor = "#c94438", rightColor = "#2f78c4" }) => (
  <group position={position}>
    {/* Deep ocean water plane cleanly below ground (y = -0.35, zero z-fighting) */}
    <Water position={[0, -0.35, 0]} size={[64, 0.2, 48]} />
    {/* Left island */}
    <Vox kind="grass" position={[-13, -0.25, 0]} size={[16, 0.54, 18]} />
    <Vox kind="darkPlanks" position={[-6.5, 1.8, -3.62]} size={[0.16, 3.6, 0.16]} />
    <Block position={[-6.5, 2.4, -3.5]} size={[0.8, 2.2, 0.1]} color={leftColor} />
    {/* Right island */}
    <Vox kind="grass" position={[13, -0.25, 0]} size={[16, 0.54, 18]} />
    <Vox kind="darkPlanks" position={[6.5, 1.8, -3.62]} size={[0.16, 3.6, 0.16]} />
    <Block position={[6.5, 2.4, -3.5]} size={[0.8, 2.2, 0.1]} color={rightColor} />
    {/* Wooden plank bridge spanning cleanly across the water gap (-5..+5) */}
    <Vox kind="planks" position={[0, -0.02, 0]} size={[10.4, 0.14, 3.6]} />
    <Vox kind="darkPlanks" position={[0, 0.52, -1.72]} size={[10.4, 0.14, 0.14]} />
    <Vox kind="darkPlanks" position={[0, 0.52, 1.72]} size={[10.4, 0.14, 0.14]} />
    {[-4.5, -1.5, 1.5, 4.5].map((x) => (
      <React.Fragment key={x}>
        <Vox kind="darkPlanks" position={[x, 0.3, -1.72]} size={[0.16, 0.65, 0.16]} />
        <Vox kind="darkPlanks" position={[x, 0.3, 1.72]} size={[0.16, 0.65, 0.16]} />
      </React.Fragment>
    ))}
  </group>
);

/** Crackling Minecraft Campfire with crossed oak logs, glowing embers, and warm light pool. */
export const CampfireProp: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Vox kind="darkPlanks" position={[0, 0.1, -0.26]} size={[0.92, 0.2, 0.2]} />
    <Vox kind="darkPlanks" position={[0, 0.1, 0.26]} size={[0.92, 0.2, 0.2]} />
    <Vox kind="darkPlanks" position={[-0.26, 0.22, 0]} size={[0.2, 0.2, 0.92]} />
    <Vox kind="darkPlanks" position={[0.26, 0.22, 0]} size={[0.2, 0.2, 0.92]} />
    <Block position={[0, 0.34, 0]} size={[0.42, 0.42, 0.42]} color="#ff9d2e" emissive="#ff6e14" emissiveIntensity={1.8} />
    <Block position={[0, 0.58, 0]} size={[0.24, 0.3, 0.24]} color="#ffe45c" emissive="#ffd02b" emissiveIntensity={2.0} />
    <Glow position={[0, 0.55, 0]} size={1.6} color="#ffaa44" opacity={0.45} />
    <LightPool position={[0, 0.03, 0]} width={4.8} depth={4.8} color="#ffb955" opacity={0.3} />
    <pointLight position={[0, 0.85, 0]} color="#ffad42" intensity={4.5} distance={9} decay={2} />
  </group>
);

/** Crafting Table + Double Chest + Torch SMP starter corner (matches Druvv's Cherry Cabin ref!). */
export const CraftingStation: React.FC<{ position?: Vec3; rotationY?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Crafting table */}
    <Vox kind="planks" tint="#a8743b" position={[-0.52, 0.45, 0]} size={[0.9, 0.9, 0.9]} />
    <Block position={[-0.52, 0.91, 0]} size={[0.76, 0.02, 0.76]} color="#6b4423" />
    {/* Double wooden chest */}
    <Vox kind="planks" tint="#b57a32" position={[0.68, 0.42, 0]} size={[1.45, 0.84, 0.86]} />
    <Block position={[0.68, 0.54, 0.44]} size={[0.16, 0.22, 0.05]} color="#d6dce4" />
    <Torch position={[1.15, 0.84, 0]} />
  </group>
);
