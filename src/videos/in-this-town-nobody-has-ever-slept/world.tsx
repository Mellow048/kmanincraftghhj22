import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot, useFilmTime } from "../../engine";
import { BedBox, Bell, Hut, LampPost, Lantern, LanternLine, Room, Smoke, Stall } from "../../../Topics/InThisTown";
import { GlowstoneCluster, LavaSurface, MushroomRow, PLACE, RuinedDoor, SoupCauldron } from "./kit";

/**
 * Three distinct Zones for "In This Town, Nobody Has Ever Slept":
 * 1. `nether`: basalt/crimson lane, glowing mushroom racks, chalk counter wall, chained cellar, soup shed & hot lava channel.
 * 2. `under`: underground netherrack bridge, molten magma trench, ruined blackstone+gold portal frame.
 * 3. `overworld`: moonlit green grass village on the other side of the lit purple portal, sleeping houses & dark stars.
 */

const NetherTown: React.FC = () => {
  const t = useFilmTime();
  return (
    <>
      <Vox kind="cobble" tint="#30181f" position={[0, -0.55, 0]} size={[120, 1, 90]} tile={2} />
      <Vox kind="stoneBrick" tint="#453642" position={[2, 0.02, 2]} size={[64, 0.06, 4.8]} />
      <Vox kind="stoneBrick" tint="#4e3d4b" position={[0, 0.03, 1.5]} size={[13, 0.06, 11]} />

      {/* Lava lake skirting the south shore */}
      <LavaSurface position={[0, -0.15, 13.5]} size={[70, 12]} t={t} embers={10} />
      <Vox kind="cobble" tint="#3a2f39" position={[0, -0.05, 7.6]} size={[70, 0.4, 0.8]} />

      {/* Buildings on the north street */}
      <Hut at={[-17, 0, -5.5]} w={6.5} wall="cobble" tint="#55323b" roof="#6e2420" windows={[-1.8, 1.8]} lit />
      <Hut at={PLACE.soupShed} w={6} wall="planks" tint="#6a3b34" roof="#7c2824" windows={[-1.7, 1.7]} lit />
      <SoupCauldron position={[PLACE.soupShed[0] + 1.8, 0, -2.9]} heat={0.8} />
      <MushroomRow position={[PLACE.mushrooms[0], 0, PLACE.mushrooms[2]]} wobble={t} />
      <MushroomRow position={[PLACE.mushrooms[0], 0, PLACE.mushrooms[2] + 1.9]} wobble={t + 1.4} />
      <GlowstoneCluster position={[PLACE.mushrooms[0], 2.9, PLACE.mushrooms[2] + 0.9]} light={2.2} pulse={t * 3} />

      <Bell position={PLACE.bell} />
      <Stall position={[6.5, 0, -2.8]} />
      <Hut at={[17.5, 0, -5.5]} w={6.5} wall="cobble" tint="#502c36" roof="#7e2824" windows={[-1.8, 1.8]} lit />

      {/* Hanging glowstone & lanterns lining the lane */}
      <LanternLine from={[-10, 3.8, -1.2]} to={[12, 3.8, -1.2]} sag={0.6} count={6} lit={[1, 3]} light={1.4} />
      <GlowstoneCluster position={[-3.2, 4.1, 1.8]} light={2.6} pulse={t * 2.5 + 1} />
      <GlowstoneCluster position={[4.6, 4.2, 1.6]} light={2.4} pulse={t * 2.5 + 2} />
      <LampPost position={[-12, 0, 4.8]} seed={4} />
      <LampPost position={[12.5, 0, 4.8]} seed={7} />

      <GodRay position={[-2, 5.5, 1.2]} rotation={[0.1, 0, 0.35]} width={6} height={11} color="#ffaa5c" opacity={0.07} />
      <LightPool position={[0, 0.08, 1.8]} width={12} depth={9} color="#ff8e47" opacity={0.18} />
      <Glow position={[0, 0.9, 8.2]} size={4.2} color="#ff6e24" opacity={0.35} />
      <Dust position={[0, 2.2, 1.5]} area={[28, 4, 14]} count={80} size={0.055} color="#ffb970" opacity={0.68} seed={9} speed={0.28} />
      <Smoke position={[-6, 3.4, 7]} rise={4} spread={2} size={0.6} count={8} opacity={0.22} />
    </>
  );
};

const UnderTown: React.FC = () => {
  const t = useFilmTime();
  return (
    <>
      <Vox kind="cobble" tint="#24151c" position={[0, -0.6, 0]} size={[70, 1, 60]} tile={2} />
      <Vox kind="cobble" tint="#3b2631" position={[0, 0.02, -1]} size={[7, 0.08, 18]} />
      <Vox kind="cobble" tint="#29161f" position={[-8, 3.2, -12]} size={[34, 7, 4]} tile={2} />
      <Vox kind="cobble" tint="#29161f" position={[10, 3.2, -12]} size={[28, 7, 4]} tile={2} />
      <Vox kind="cobble" tint="#1d1118" position={[0, 6.2, -3]} size={[48, 1, 24]} tile={3} />

      <LavaSurface position={[6.5, -0.2, 2]} size={[10, 18]} t={t} embers={10} />
      <GlowstoneCluster position={[-2.6, 4.6, -2.5]} light={2.8} pulse={t * 3.2} />
      <GlowstoneCluster position={[3.2, 4.7, -3.5]} light={2.5} pulse={t * 3.2 + 1} />
      <Lantern position={[-2.8, 3.4, -0.5]} chain={0.6} light={1.8} />
      <GodRay position={[0, 4.5, -2]} rotation={[0.2, 0, -0.25]} width={5} height={10} color="#ff9d52" opacity={0.07} />
      <Dust position={[0, 2, -1]} area={[20, 4, 16]} count={65} size={0.05} color="#ffad66" opacity={0.62} seed={11} speed={0.22} />
    </>
  );
};

const OverworldQuiet: React.FC = () => {
  const t = useFilmTime();
  return (
    <>
      <Vox kind="grass" side="dirt" position={[0, -0.5, 0]} size={[100, 1, 90]} />
      <Vox kind="path" position={[0, 0.02, 0]} size={[5, 0.06, 26]} />
      <Vox kind="path" position={[0, 0.03, 2]} size={[24, 0.06, 4.6]} />

      <RuinedDoor position={PLACE.overPortal} lit={1} t={t} />
      <Hut at={[-7.5, 0, -3.5]} w={6.2} roof="#3d5f9a" windows={[-1.8, 1.8]} turn={0.45} lit />
      <Hut at={[7.5, 0, -3.5]} w={6.2} roof="#3f6b3a" windows={[-1.8, 1.8]} turn={-0.45} lit />
      <Room at={[0, 0, 18]} night />
      <BedBox position={[-4.5, 0, 4]} rotationY={Math.PI / 2} />
      <BedBox position={[4.5, 0, 4]} rotationY={-Math.PI / 2} />

      {[
        [-13, -7, 4.4],
        [13, -6, 4.6],
        [-12, 8, 4.0],
        [12, 8, 4.2],
      ].map(([x, z, h], i) => (
        <Tree key={i} position={[x, 0, z]} height={h} leaf="#3c7344" />
      ))}

      <Clouds y={42} center={[0, 0, 0]} />
      <GodRay position={[0, 6.5, -2]} rotation={[0.15, 0, 0.2]} width={5.5} height={12} color="#9bc4ff" opacity={0.07} />
      <LightPool position={[0, 0.07, 1.5]} width={12} depth={12} color="#7ea8ff" opacity={0.18} />
      <Dust position={[0, 2.2, 1]} area={[24, 4, 18]} count={70} size={0.045} color="#b7d7ff" opacity={0.55} seed={15} speed={0.12} />
    </>
  );
};

export const World: React.FC = () => {
  const active = useActiveShot();
  void active;
  return (
    <>
      <Zone name="nether">
        <NetherTown />
      </Zone>
      <Zone name="under">
        <UnderTown />
      </Zone>
      <Zone name="overworld">
        <OverworldQuiet />
      </Zone>
    </>
  );
};
