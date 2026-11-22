import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Fence, ForestEdge, Hut, Lantern, LanternLine, LanternPost, Pine, SchoolDesk } from "../../../Topics/InThisTown";
import { CLIFF, GATE, PATH_TOP, SCHOOL, StrawNest } from "./kit";

/**
 * WORLD — Three zones, mounted once:
 *   village   z ~ 0     Zombie town, school gate, big house with tall rooftop nest, climbing tree
 *   school    z ~ 45    Lantern-lit classroom (open south side for camera, window north at z = 41.35)
 *   cliff     z ~ 95    Mountain road cliff ledge (y = 4.5), ravine, pine trees, safe lower valley (y = 0)
 */

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[110, 1, 80]} />
    <Vox kind="path" position={[0, 0.025, 1.8]} size={[52, 0.05, 4.4]} />
    <Vox kind="path" position={[0, 0.025, -1.6]} size={[22, 0.05, 5.2]} />

    {/* School gate pillars & fence */}
    <Vox kind="cobble" position={[-2.1, 1.1, -1.2]} size={[0.7, 2.2, 0.7]} />
    <Vox kind="cobble" position={[2.1, 1.1, -1.2]} size={[0.7, 2.2, 0.7]} />
    <Lantern position={[-2.1, 2.55, -1.2]} chain={0.35} light={2.2} reach={8} />
    <Lantern position={[2.1, 2.55, -1.2]} chain={0.35} light={2.2} reach={8} />
    <Fence from={[-11, 0, -1.2]} to={[-2.4, 0, -1.2]} height={1.1} gap={1.8} />
    <Fence from={[2.4, 0, -1.2]} to={[12, 0, -1.2]} height={1.1} gap={1.8} />

    {/* North houses: schoolhouse, break-door house, and the flat-roofed tall house with the rooftop nest */}
    <Hut at={[-6.5, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-1.8, 1.8]} lit />
    <Hut at={[0, 0, -5.8]} w={8.5} d={6.5} h={4.4} roof="#6b3428" windows={[-2.6, 2.6]} lit />
    {/* Flat-roofed tall house centered at GATE.tallHouse = [8.8, 0, -5] with terrace at y = GATE.roofTopY (5.4) */}
    <group position={GATE.tallHouse}>
      <Vox kind="cobble" position={[0, 0.5, 0]} size={[6.6, 1.0, 6.6]} />
      <Vox kind="planks" tint="#b89864" position={[0, 3.05, 0]} size={[6.4, 4.1, 6.4]} />
      <Vox kind="planks" tint="#734c2b" position={[0, GATE.roofTopY - 0.15, 0]} size={[6.7, 0.3, 6.7]} />
      {/* Corner log pillars */}
      {[-3.1, 3.1].map((cx) =>
        [-3.1, 3.1].map((cz) => (
          <Vox key={`${cx},${cz}`} kind="log" position={[cx, GATE.roofTopY / 2, cz]} size={[0.5, GATE.roofTopY + 0.1, 0.5]} />
        )),
      )}
      {/* Low rooftop parapet posts on corners so the nest stays open to the sky */}
      {[-3.1, 3.1].map((cx) =>
        [-3.1, 3.1].map((cz) => (
          <Vox key={`p${cx},${cz}`} kind="cobble" position={[cx, GATE.roofTopY + 0.25, cz]} size={[0.55, 0.5, 0.55]} />
        )),
      )}
      {/* Warm glowing south & west windows */}
      {[-1.6, 1.6].map((wx) => (
        <Block key={`ws${wx}`} position={[wx, 2.6, 3.22]} size={[1.1, 1.1, 0.06]} color="#ffd982" emissive="#ffb940" emissiveIntensity={1.6} />
      ))}
      <Block position={[-3.22, 2.6, 0]} size={[0.06, 1.1, 1.2]} color="#ffd982" emissive="#ffb940" emissiveIntensity={1.6} />
    </group>
    <StrawNest position={GATE.nest} scale={1.15} />
    <LanternPost position={[11.1, GATE.roofTopY, -7.1]} light={2.8} seed={5} />
    <LightPool position={[8.8, GATE.roofTopY + 0.02, -5.0]} width={5.8} depth={5.8} color="#ffd99a" opacity={0.22} />

    {/* South houses behind camera for reflections & reverse shots */}
    <Hut at={[-9, 0, 11]} w={6.5} roof="#3d5f9a" windows={[-1.8, 1.8]} turn={Math.PI} lit />
    <Hut at={[7, 0, 11.5]} w={7} tint="#c9aa76" roof="#7a3428" windows={[-2, 2]} turn={Math.PI} lit />

    {/* Climbing oak tree on the west side + lantern near base */}
    <Tree position={GATE.climbTree} height={5.2} leaf="#376e2b" />
    <LanternPost position={[-7.3, 0, -1.2]} light={2.2} seed={6} />
    {/* Corner hedge/bush for 1.corner */}
    <Vox kind="grass" tint="#2f6626" position={[-3.8, 0.55, 1.2]} size={[1.4, 1.1, 1.4]} />

    <Bell position={[3.6, 0, -2.5]} />
    <LanternLine from={[-5.5, 3.3, -1.2]} to={[5.5, 3.3, -1.2]} count={5} sag={0.45} lit={[0, 1, 2, 3, 4]} light={1.8} />
    <LanternPost position={[-6.2, 0, 3.8]} light={2.0} seed={2} />
    <LanternPost position={[6.5, 0, 3.8]} light={2.0} seed={3} />

    <Tree position={[-17, 0, -10]} height={4.8} leaf="#3b6e2d" />
    <Tree position={[17, 0, -11]} height={4.6} leaf="#356327" />
    <Clouds y={48} center={[0, 0, 0]} />

    <GodRay position={[-2, 6.5, -2]} rotation={[0, 0, 0.4]} width={4.5} height={11} color="#ffd99a" opacity={0.07} />
    <LightPool position={[0, PATH_TOP + 0.015, 0.5]} width={9} depth={7} color="#ffd68a" opacity={0.14} />
    <Glow position={[0, 2.9, -1.2]} size={1.8} color="#ffc970" opacity={0.32} />
    <Dust position={[0, 2.2, 0]} area={[24, 4, 14]} count={60} size={0.04} color="#ffe7ba" opacity={0.55} seed={7} speed={0.22} />
  </>
);

const School: React.FC = () => (
  <group position={[0, 0, 0]}>
    {/* Floor, north window wall, west/east walls, ceiling (south open for camera) */}
    <Vox kind="planks" tint="#7c5636" position={[0, -0.25, 45]} size={[8, 0.5, 7]} />
    <Vox kind="cobble" position={[0, 3.9, 45]} size={[8, 0.4, 7]} />
    <Vox kind="planks" tint="#b8986c" position={[-4, 1.85, 45]} size={[0.3, 3.7, 7]} />
    <Vox kind="planks" tint="#b8986c" position={[4, 1.85, 45]} size={[0.3, 3.7, 7]} />
    {/* North wall around window opening at x = -0.9, y = 1.05..2.3 */}
    <Vox kind="planks" tint="#b8986c" position={[-2.95, 1.85, 41.5]} size={[2.2, 3.7, 0.3]} />
    <Vox kind="planks" tint="#b8986c" position={[2.0, 1.85, 41.5]} size={[4.2, 3.7, 0.3]} />
    <Vox kind="planks" tint="#b8986c" position={[-0.9, 0.5, 41.5]} size={[1.9, 1.0, 0.3]} />
    <Vox kind="planks" tint="#b8986c" position={[-0.9, 3.0, 41.5]} size={[1.9, 1.4, 0.3]} />
    {/* Window sill & frame */}
    <Vox kind="log" position={[-0.9, 1.02, 41.45]} size={[2.0, 0.14, 0.42]} />
    {/* Outside dark grass & backdrop outside classroom window */}
    <Vox kind="grass" tint="#244a20" position={[-0.9, -0.5, 38.5]} size={[14, 1, 6]} />

    {/* Chalkboard */}
    <Block position={[1.4, 2.0, 41.68]} size={[2.4, 1.2, 0.08]} color="#21402b" />
    <Vox kind="log" position={[1.4, 1.38, 41.68]} size={[2.5, 0.08, 0.12]} />

    {/* Desks & chairs */}
    <SchoolDesk position={SCHOOL.heroDesk} />
    <SchoolDesk position={[-2.4, 0, 44.2]} />
    <SchoolDesk position={[0.7, 0, 44.2]} />
    {/* Small wooden chair behind hero desk */}
    <Vox kind="planks" tint="#9e6d42" position={[-0.9, 0.42, 44.85]} size={[0.52, 0.1, 0.48]} />
    <Vox kind="planks" tint="#8a5c34" position={[-0.9, 0.72, 45.06]} size={[0.52, 0.55, 0.08]} />

    {/* Warm lanterns */}
    <Lantern position={[0, 3.55, 44.2]} chain={0.45} light={2.6} reach={9} />
    <Lantern position={[-0.9, 2.3, 40.3]} chain={0.3} light={1.8} reach={6} />
    <LightPool position={[-0.4, 0.02, 44.4]} width={5.5} depth={4.5} color="#ffd99a" opacity={0.18} />
    <Dust position={[0, 1.7, 44.3]} area={[6, 2.8, 5]} count={45} size={0.035} color="#ffe9bd" opacity={0.5} seed={11} speed={0.18} />
  </group>
);

const Cliff: React.FC<{ isSunrise: boolean }> = ({ isSunrise }) => (
  <group position={[0, 0, 0]}>
    {/* Lower safe grass valley */}
    <Vox kind="grass" tint={isSunrise ? "#4b8536" : "#284d23"} position={[2, -0.5, 95]} size={[90, 1, 60]} />
    {/* Ravine depth shadow */}
    <Vox kind="stone" tint="#1a212e" position={[1.6, -1.2, 95]} size={[6.0, 1.5, 24]} />

    {/* West high cliff ledge (x = -16 .. -1.4, top y = 4.5) */}
    <Vox kind="stone" tint="#4d5768" position={[-9.4, 2.25, 95]} size={[16, 4.5, 18]} />
    <Vox kind="grass" tint={isSunrise ? "#4a8235" : "#2b5226"} position={[-9.4, 4.52, 95]} size={[16.2, 0.16, 18.2]} />
    {/* Stepped path leading up */}
    <Vox kind="stone" tint="#5b6678" position={[-6.5, 4.55, 95]} size={[10.2, 0.12, 3.2]} />

    {/* East high cliff ledge (x = 4.6 .. 20, top y = 4.5) */}
    <Vox kind="stone" tint="#4d5768" position={[12.6, 2.25, 95]} size={[16, 4.5, 18]} />
    <Vox kind="grass" tint={isSunrise ? "#4a8235" : "#2b5226"} position={[12.6, 4.52, 95]} size={[16.2, 0.16, 18.2]} />

    {/* Pines on the cliff & far forest */}
    <Pine position={[-8.5, 4.5, 91.2]} height={4.4} />
    <Pine position={[-5.2, 4.5, 90.6]} height={3.8} />
    <Pine position={[8.2, 4.5, 91.5]} height={4.6} />
    <ForestEdge from={[-22, 0, 82]} to={[24, 0, 82]} depth={2} count={14} seed={19} />

    {/* Trail lanterns along cliff */}
    <LanternPost position={[-4.5, 4.5, 93.2]} light={2.2} seed={9} />
    <LanternPost position={[-1.8, 4.5, 93.2]} light={2.2} seed={10} />

    {isSunrise ? (
      <>
        <GodRay position={[5, 9, 92]} rotation={[0, 0, -0.45]} width={7} height={15} color="#ffb95c" opacity={0.14} />
        <LightPool position={[CLIFF.valleyFloor[0], 0.08, 95]} width={10} depth={8} color="#ffc46b" opacity={0.22} />
      </>
    ) : (
      <LightPool position={[-3.2, 4.62, 95]} width={6} depth={4} color="#ffd082" opacity={0.16} />
    )}
    <Dust position={[1, 3.5, 95]} area={[20, 6, 12]} count={65} size={0.045} color={isSunrise ? "#ffd494" : "#b8d0ff"} opacity={0.55} seed={23} speed={0.25} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const cue = active?.shot.cue ?? "";
  const isSunrise = cue.startsWith("4.orange") || cue.startsWith("4.burn") || cue.startsWith("4.bridge") ||
    cue.startsWith("4.crack") || cue.startsWith("4.heavy") || cue.startsWith("4.wings") ||
    cue.startsWith("5.") || cue.startsWith("6.") || cue.startsWith("7.knew") || cue.startsWith("7.under") || cue.startsWith("7.wait");

  return (
    <>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="school">
        <School />
      </Zone>
      <Zone name="cliff">
        <Cliff isSunrise={isSunrise} />
      </Zone>
    </>
  );
};
