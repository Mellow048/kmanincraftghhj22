import type React from "react";
import {
  Clouds,
  Dust,
  Glow,
  GodRay,
  LightPool,
  Sign,
  SolidBox,
  Tree,
  Vox,
  Zone,
  useActiveShot,
} from "../../engine";
import {
  Bell,
  ForestEdge,
  Hut,
  LampPost,
  Pine,
  Stall,
  VillageStreet,
  NetherPortal,
  PLACE,
  on,
} from "./kit";

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night" || look === "lantern-night";
  const sunset = look === "overworld-sunset" || look === "overworld-golden";

  return (
    <>
      {/* ---- ZONE 1: Multi-Axis Main Street + Nether Portal at North End ---- */}
      <Zone name="village">
        <VillageStreet position={PLACE.village} night={night} />
        <Bell position={on(PLACE.village, 2.7, 0, -2.6)} />
        <Stall position={on(PLACE.village, -2.9, 0, 5.8)} />
        <NetherPortal position={on(PLACE.village, 0, 0, -23.5)} lit={night || sunset ? 1 : 0.7} />
        <Clouds y={48} center={PLACE.village} />
        {night ? (
          <>
            <pointLight position={on(PLACE.village, 0, 5.2, 4)} color="#ffcf80" intensity={10} distance={24} decay={1.6} />
            <pointLight position={on(PLACE.village, 0, 4.8, -10)} color="#ffc475" intensity={10} distance={22} decay={1.6} />
          </>
        ) : null}
      </Zone>

      {/* ---- ZONE 2: Mayor Vance's Brick Vault Plaza & Iron Armor Stall (Zero Coplanar Ground!) ---- */}
      <Zone name="vault">
        {/* Grass recessed strictly below y=0 (top at -0.05) */}
        <Vox kind="grass" position={on(PLACE.vault, 0, -0.3, 0)} size={[56, 0.5, 56]} />
        {/* Cobble plaza flush at y=0 (z: -6..14) */}
        <Vox kind="cobble" position={on(PLACE.vault, 0, -0.025, 4)} size={[14, 0.05, 20]} />
        {/* Approach path strictly south of cobble plaza (z: 14.05..28.05) — zero XZ overlap! */}
        <Vox kind="path" position={on(PLACE.vault, 0, -0.025, 21.05)} size={[6, 0.05, 14]} />
        {/* Neighboring brick & plank cottages framing both flanks */}
        <Hut at={on(PLACE.vault, -10.5, 0, 1.5)} w={6.2} d={5.6} h={4.0} wall="planks" tint="#c99a60" roof="#3d5e80" turn={Math.PI / 2} lit={night} />
        <SolidBox name="vault-hut-L1" position={on(PLACE.vault, -10.5, 2.0, 1.5)} size={[5.6, 4.0, 6.2]} />
        <Hut at={on(PLACE.vault, 10.5, 0, 2.0)} w={6.2} d={5.6} h={4.0} wall="stoneBrick" tint="#9da4ad" roof="#6e3a24" turn={-Math.PI / 2} lit={night} />
        <SolidBox name="vault-hut-R1" position={on(PLACE.vault, 10.5, 2.0, 2.0)} size={[5.6, 4.0, 6.2]} />
        <Hut at={on(PLACE.vault, -9.5, 0, 13)} w={5.8} d={5.2} h={3.8} wall="bricks" tint="#b55d4a" roof="#386641" turn={Math.PI / 2} lit={night} />
        <SolidBox name="vault-hut-L2" position={on(PLACE.vault, -9.5, 1.9, 13)} size={[5.2, 3.8, 5.8]} />
        <Hut at={on(PLACE.vault, 9.5, 0, 13)} w={5.8} d={5.2} h={3.8} wall="planks" tint="#cfa976" roof="#5a3322" turn={-Math.PI / 2} lit={night} />
        <SolidBox name="vault-hut-R2" position={on(PLACE.vault, 9.5, 1.9, 13)} size={[5.2, 3.8, 5.8]} />
        <Stall position={on(PLACE.vault, 4.8, 0, 5.2)} />
        <Sign position={on(PLACE.vault, 4.8, 1.85, 5.95)} title="IRON ARMOR" />
        <Tree position={on(PLACE.vault, -8.5, 0, -7.5)} height={4.6} />
        <Tree position={on(PLACE.vault, 8.5, 0, -7.2)} height={4.8} />
        <LampPost position={on(PLACE.vault, -5.8, 0, 6.2)} seed={11} />
        <LampPost position={on(PLACE.vault, 6.2, 0, 11.2)} seed={12} />
        <Clouds y={48} center={PLACE.vault} />
        <GodRay position={on(PLACE.vault, 0, 7, 1)} rotation={[0, 0, 0.2]} width={5} height={13} color="#fff2cc" opacity={0.07} />
        <LightPool position={on(PLACE.vault, 0, 0.05, 4)} width={12} depth={12} color="#fff4d2" opacity={0.18} />
        <Glow position={on(PLACE.vault, 0, 3.2, -1)} size={2.6} color="#ffd966" opacity={0.22} />
        <Dust position={on(PLACE.vault, 0, 2.2, 3)} area={[16, 4.5, 16]} count={40} size={0.038} color="#fff7da" opacity={0.48} seed={23} speed={0.18} />
        <pointLight position={on(PLACE.vault, 0, 5.2, 6)} color="#ffe8ba" intensity={night ? 12 : 6} distance={24} decay={1.6} />
      </Zone>

      {/* ---- ZONE 3: Dark Pine Forest Edge (Pines widened clear of side tracking lens!) ---- */}
      <Zone name="pines">
        <Vox kind="grass" position={on(PLACE.pines, 0, -0.3, 0)} size={[64, 0.5, 64]} />
        <Vox kind="path" position={on(PLACE.pines, 0, -0.025, 4)} size={[4.4, 0.05, 26]} />
        <ForestEdge from={on(PLACE.pines, -16, 0, -9)} to={on(PLACE.pines, 16, 0, -9)} depth={9} count={14} seed={9} />
        <Pine position={on(PLACE.pines, -8.2, 0, -3.5)} height={6.6} spread={2.0} />
        <Pine position={on(PLACE.pines, 8.6, 0, -3.0)} height={6.8} spread={2.0} />
        <Pine position={on(PLACE.pines, -9.8, 0, 6.2)} height={6.0} spread={1.9} />
        <Pine position={on(PLACE.pines, 10.6, 0, 7.0)} height={6.2} spread={1.9} />
        <LampPost position={on(PLACE.pines, -3.4, 0, 5.5)} seed={21} />
        <LampPost position={on(PLACE.pines, 3.6, 0, 1.5)} seed={22} />
        <Clouds y={48} center={PLACE.pines} />
        <GodRay position={on(PLACE.pines, 0, 7, 1)} rotation={[0, 0, 0.18]} width={5.5} height={13} color="#ffe7b3" opacity={0.08} />
        <LightPool position={on(PLACE.pines, 0, 0.05, 3)} width={10} depth={12} color="#ffefc8" opacity={0.2} />
        <Glow position={on(PLACE.pines, 0, 2.8, -3)} size={2.4} color="#ffd98a" opacity={0.22} />
        <Dust position={on(PLACE.pines, 0, 2.2, 2)} area={[16, 4.5, 16]} count={40} size={0.04} color="#fff5d0" opacity={0.5} seed={31} speed={0.18} />
        <pointLight position={on(PLACE.pines, 0, 4.8, 5)} color="#ffe5b4" intensity={night ? 11 : 6} distance={24} decay={1.6} />
      </Zone>
    </>
  );
};
