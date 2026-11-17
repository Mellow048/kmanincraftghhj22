import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Vox, Zone, useActiveShot } from "../../engine";
import { Hut, Moon, Stars } from "../../../Topics/InThisTown";

/**
 * Two places. A shot names one, and the other is not drawn.
 *   dock  The town's dock, the chain, the pond where a door sank.
 *   sea   Open water. The boat is drawn by the shot, so the hatch and the lantern can move.
 */

const Water: React.FC<{ wide?: number }> = ({ wide = 80 }) => (
  <>
    <Block position={[0, -0.35, 8]} size={[wide, 0.7, wide]} color="#1d6ea8" />
    <mesh position={[0, 0.02, 8]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[wide, wide]} />
      <meshStandardMaterial color="#3d94d4" transparent opacity={0.55} roughness={0.15} />
    </mesh>
  </>
);

const Dock: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, -6]} size={[40, 1, 22]} />
    <Vox kind="path" position={[0, 0.02, -1]} size={[8, 0.06, 6]} />
    <Vox kind="planks" position={[0, 0.08, 4.2]} size={[2.4, 0.16, 8]} />
    <Vox kind="log" position={[-1.3, -0.2, 1.2]} size={[0.28, 1.2, 0.28]} />
    <Vox kind="log" position={[1.3, -0.2, 1.2]} size={[0.28, 1.2, 0.28]} />
    <Vox kind="log" position={[-1.3, -0.4, 7.2]} size={[0.28, 1.6, 0.28]} />
    <Vox kind="log" position={[1.3, -0.4, 7.2]} size={[0.28, 1.6, 0.28]} />
    <Hut at={[-8, 0, -6]} w={6} roof="#8a3b2a" windows={[-1.4, 1.4]} />
    <Hut at={[7.5, 0, -6.5]} w={6.5} tint="#d8c49a" roof="#3f6b3a" door={-1.2} windows={[1.4]} />
    <Hut at={[0, 0, -10]} w={8} h={4.2} roof="#3d5f9a" windows={[-2.2, 2.2]} />
    {/* The pond the door-boat sinks in. */}
    <Vox kind="stone" position={[-6.2, 0.15, 5.2]} size={[3.2, 0.3, 2.4]} />
    <Block position={[-6.2, 0.32, 5.2]} size={[2.6, 0.08, 1.8]} color="#2f6fb8" />
    <Water wide={50} />
    <Clouds y={40} center={[0, 0, 0]} />
    <GodRay position={[-2, 7, 2]} rotation={[0, 0, 0.4]} width={4} height={11} color="#fff0c8" opacity={0.07} />
    <LightPool position={[0, 0.08, 2]} width={8} depth={10} color="#fff2c8" opacity={0.12} />
    <Glow position={[0, 2.2, 6]} size={1.4} color="#ffe08a" opacity={0.3} />
    <Dust position={[0, 1.6, 2]} area={[18, 3, 12]} count={40} size={0.04} color="#fff7d8" opacity={0.5} seed={4} speed={0.15} />
  </>
);

const Sea: React.FC<{ night: boolean }> = ({ night }) => (
  <>
    <Block position={[0, -0.4, 0]} size={[120, 0.8, 120]} color={night ? "#0c2740" : "#1d6ea8"} />
    <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[120, 120]} />
      <meshStandardMaterial color={night ? "#14324e" : "#4ea0dc"} transparent opacity={night ? 0.72 : 0.5} roughness={0.2} />
    </mesh>
    {/* No town here. A house at talking distance looked like it was floating beside the boat.
        The sail-away shot places its own far shore. */}
    {night ? (
      <>
        <Moon position={[6, 18, -10]} radius={3.2} />
        <Stars center={[0, 0, 0]} count={80} />
        <Glow position={[0.3, 3.6, 0.2]} size={1.8} color="#ffd27a" opacity={0.45} />
        <GodRay position={[6, 12, -6]} rotation={[0.2, 0, -0.3]} width={6} height={14} color="#9eb6ff" opacity={0.05} />
        <LightPool position={[0, 0.05, 0]} width={10} depth={12} color="#1a3050" opacity={0.2} />
        <Dust position={[0, 1.4, 0]} area={[16, 2, 16]} count={30} size={0.035} color="#c9d7ef" opacity={0.35} seed={9} speed={0.08} />
      </>
    ) : (
      <>
        <Clouds y={36} center={[0, 0, 0]} />
        <GodRay position={[-4, 8, 2]} rotation={[0, 0, 0.35]} width={6} height={12} color="#fff0c8" opacity={0.08} />
        <LightPool position={[0, 0.05, 1]} width={12} depth={14} color="#fff6d8" opacity={0.16} />
        <Glow position={[0, 3, 0]} size={1.2} color="#ffe08a" opacity={0.22} />
        <Dust position={[0, 1.5, 0]} area={[20, 3, 20]} count={36} size={0.04} color="#fff7d8" opacity={0.4} seed={6} speed={0.12} />
      </>
    )}
  </>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="dock">
        <Dock />
      </Zone>
      <Zone name="sea">
        <Sea night={night} />
      </Zone>
    </>
  );
};
