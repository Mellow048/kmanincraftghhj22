import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Vox } from "../../engine";
import { A, Bell, Bed, Chair, PLACE, Stall, Stick, Table } from "./kit";

/**
 * Three places, one per act: the hut he trades away, the yard with the bell, and the market where his mouth works.
 * The props are static here so a shot can put the camera on any of them; anything that moves is staged in a scene.
 */

const Hut: React.FC = () => (
  <group position={PLACE.hut}>
    <Vox kind="planks" tint="#8a5f34" position={[0, -0.06, 0]} size={[9, 0.12, 9]} />
    <Vox kind="planks" tint="#6f4a2a" position={[-4.5, 1.6, 0]} size={[0.16, 3.2, 9]} />
    <Vox kind="planks" tint="#6f4a2a" position={[4.5, 1.6, 0]} size={[0.16, 3.2, 9]} />
    <Vox kind="planks" tint="#6f4a2a" position={[0, 1.6, -4.5]} size={[9, 3.2, 0.16]} />
    {/* the door he keeps handing things through */}
    <Vox kind="planks" tint="#6f4a2a" position={[-2.85, 1.6, 4.5]} size={[3.3, 3.2, 0.16]} />
    <Vox kind="planks" tint="#6f4a2a" position={[2.85, 1.6, 4.5]} size={[3.3, 3.2, 0.16]} />
    <Vox kind="planks" tint="#5e3f22" position={[0, 3.0, 4.5]} size={[2.4, 0.5, 0.18]} />
    <Bed at={[-2.9, 0, -2.6]} />
    <Table at={[0, 0, 0.6]} />
    <Chair at={[-2.0, 0, 0.4]} />
    <Stick at={[3.6, 0, 3.2]} />
    <LightPool position={[0, 0.03, 1.2]} width={5} depth={4} color="#ffb877" opacity={0.14} />
    <pointLight position={[0, 2.5, 1.6]} color="#ffcf9a" intensity={22} distance={11} decay={2} />
    <pointLight position={[-2.6, 2.3, -2.2]} color="#ff9b4a" intensity={12} distance={7} decay={2} />
  </group>
);

const Yard: React.FC = () => (
  <group position={PLACE.yard}>
    <Vox kind="grass" tint="#6d9a45" position={[0, -0.06, 0]} size={[14, 0.12, 14]} />
    <Bell at={[0, 1.6, 1.2]} />
    <Vox kind="planks" tint="#7a5230" position={[-3.2, 1.2, -1.4]} size={[3, 2.4, 3]} />
    <Vox kind="planks" tint="#5e3f22" position={[-3.2, 2.6, -1.4]} size={[3.4, 0.3, 3.4]} />
    <Glow position={[0, 2.2, 31.2]} size={1.1} color="#ffe0a0" opacity={0.4} />
    <GodRay position={[2.2, 2.2, 31]} rotation={[0.08, 0.5, 0]} width={2.2} height={5.4} color="#fff3d0" opacity={0.16} />
    <Dust position={[0, 1.4, 1]} area={[10, 2.4, 8]} count={20} />
  </group>
);

const Market: React.FC = () => (
  <group position={PLACE.market}>
    <Vox kind="planks" tint="#9a7a52" position={[0, -0.06, 0]} size={[16, 0.12, 16]} />
    <Stall at={[0, 0, 2.0]} />
    <Stall at={[-5.0, 0, 0.4]} />
    <Block position={[2.4, 0.3, 0.6]} size={[0.6, 0.6, 0.6]} color="#8a5f34" />
    <Block position={[2.4, 0.9, 0.6]} size={[0.6, 0.6, 0.6]} color="#7a5230" />
    <pointLight position={[0, 2.6, 2.4]} color="#ffd8a8" intensity={16} distance={12} decay={2} />
  </group>
);

export const World: React.FC = () => (
  <>
    <ambientLight color="#ffe6c8" intensity={0.55} />
    <Hut />
    <Yard />
    <Market />
  </>
);
