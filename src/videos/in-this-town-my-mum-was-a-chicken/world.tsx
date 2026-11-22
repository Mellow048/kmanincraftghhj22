import type React from "react";
import { Block, Clouds, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Fence, ForestEdge, Hut, Lantern, LanternLine, LanternPost, Moon, Pine, SchoolDesk, Stars } from "../../../Topics/InThisTown";
import { CLIFF, GATE, PATH_TOP, SCHOOL, StrawNest } from "./kit";

/**
 * WORLD — Three zones, mounted once:
 *   village   z ~ 0     Zombie town, school gate, flat-roofed tall house with rooftop nest, climbing tree
 *   school    z ~ 45    Warm lantern-lit classroom (open south side for camera, window north at z = 41.35)
 *   cliff     z ~ 95    Mountain road cliff ledge (y = 4.5), ravine, pine trees, safe lower valley (y = 0)
 */

const Village: React.FC<{ night: boolean }> = ({ night }) => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[110, 1, 80]} />
    <Vox kind="path" position={[0, 0.025, 1.8]} size={[52, 0.05, 4.4]} />
    <Vox kind="path" position={[0, 0.025, -1.6]} size={[22, 0.05, 5.2]} />

    {/* School gate pillars & fence */}
    <Vox kind="cobble" position={[-2.1, 1.1, -1.2]} size={[0.7, 2.2, 0.7]} />
    <Vox kind="cobble" position={[2.1, 1.1, -1.2]} size={[0.7, 2.2, 0.7]} />
    <Lantern position={[-2.1, 2.55, -1.2]} chain={0.35} light={3.2} reach={11} />
    <Lantern position={[2.1, 2.55, -1.2]} chain={0.35} light={3.2} reach={11} />
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
      {[-3.1, 3.1].map((cx) =>
        [-3.1, 3.1].map((cz) => (
          <Vox key={`${cx},${cz}`} kind="log" position={[cx, GATE.roofTopY / 2, cz]} size={[0.5, GATE.roofTopY + 0.1, 0.5]} />
        )),
      )}
      {[-3.1, 3.1].map((cx) =>
        [-3.1, 3.1].map((cz) => (
          <Vox key={`p${cx},${cz}`} kind="cobble" position={[cx, GATE.roofTopY + 0.25, cz]} size={[0.55, 0.5, 0.55]} />
        )),
      )}
      {[-1.6, 1.6].map((wx) => (
        <Block key={`ws${wx}`} position={[wx, 2.6, 3.22]} size={[1.1, 1.1, 0.06]} color="#ffd982" emissive="#ffb940" emissiveIntensity={1.6} />
      ))}
      <Block position={[-3.22, 2.6, 0]} size={[0.06, 1.1, 1.2]} color="#ffd982" emissive="#ffb940" emissiveIntensity={1.6} />
    </group>
    <StrawNest position={GATE.nest} scale={1.15} />
    <LanternPost position={[11.1, GATE.roofTopY, -7.1]} light={3.5} seed={5} />
    <Torch position={[6.8, GATE.roofTopY, -3.1]} light={2.5} seed={8} />
    <pointLight position={[8.8, GATE.roofTopY + 2.6, -2.5]} intensity={4.8} distance={15} color="#ffd99a" />
    <LightPool position={[8.8, GATE.roofTopY + 0.02, -5.0]} width={6.2} depth={6.2} color="#ffd99a" opacity={0.28} />

    {/* South houses behind camera for reflections & reverse shots */}
    <Hut at={[-9, 0, 11]} w={6.5} roof="#3d5f9a" windows={[-1.8, 1.8]} turn={Math.PI} lit />
    <Hut at={[7, 0, 11.5]} w={7} tint="#c9aa76" roof="#7a3428" windows={[-2, 2]} turn={Math.PI} lit />

    {/* Climbing oak tree on the west side + bright lanterns */}
    <Tree position={GATE.climbTree} height={5.2} leaf="#376e2b" />
    <LanternPost position={[-7.3, 0, -0.6]} light={3.2} seed={6} />
    <pointLight position={[-9.2, 4.0, 0.5]} intensity={3.8} distance={14} color="#ffdba8" />
    <Vox kind="grass" tint="#2f6626" position={[-3.8, 0.55, 1.2]} size={[1.4, 1.1, 1.4]} />

    <Bell position={[3.6, 0, -2.5]} />
    <LanternLine from={[-5.5, 3.3, -1.2]} to={[5.5, 3.3, -1.2]} count={5} sag={0.45} lit={[0, 1, 2, 3, 4]} light={2.6} />
    <LanternPost position={[-6.2, 0, 3.8]} light={3.0} seed={2} />
    <LanternPost position={[6.5, 0, 3.8]} light={3.0} seed={3} />
    <Torch position={[-2.6, 0, 2.8]} light={2.4} seed={12} />
    <Torch position={[2.6, 0, 2.8]} light={2.4} seed={13} />
    <pointLight position={[0, 3.8, 3.2]} intensity={4.2} distance={18} color="#ffe0ad" />

    <Tree position={[-17, 0, -10]} height={4.8} leaf="#3b6e2d" />
    <Tree position={[17, 0, -11]} height={4.6} leaf="#356327" />
    {night ? (
      <>
        <Moon position={[-28, 60, -90]} radius={7} />
        <Stars center={[0, 0, 0]} />
      </>
    ) : (
      <Clouds y={48} center={[0, 0, 0]} />
    )}

    <GodRay position={[-2, 6.5, -2]} rotation={[0, 0, 0.4]} width={4.5} height={11} color="#ffd99a" opacity={0.11} />
    <LightPool position={[0, PATH_TOP + 0.015, 0.5]} width={11} depth={9} color="#ffd68a" opacity={0.24} />
    <Glow position={[0, 2.9, -1.2]} size={2.2} color="#ffc970" opacity={0.38} />
    <Dust position={[0, 2.2, 0]} area={[24, 4, 14]} count={70} size={0.045} color="#ffe7ba" opacity={0.65} seed={7} speed={0.25} />
  </>
);

const School: React.FC = () => (
  <group position={[0, 0, 0]}>
    <Vox kind="planks" tint="#8a603d" position={[0, -0.25, 45]} size={[8, 0.5, 7]} />
    <Vox kind="cobble" position={[0, 3.9, 45]} size={[8, 0.4, 7]} />
    <Vox kind="planks" tint="#c9a87a" position={[-4, 1.85, 45]} size={[0.3, 3.7, 7]} />
    <Vox kind="planks" tint="#c9a87a" position={[4, 1.85, 45]} size={[0.3, 3.7, 7]} />
    <Vox kind="planks" tint="#c9a87a" position={[-2.95, 1.85, 41.5]} size={[2.2, 3.7, 0.3]} />
    <Vox kind="planks" tint="#c9a87a" position={[2.0, 1.85, 41.5]} size={[4.2, 3.7, 0.3]} />
    <Vox kind="planks" tint="#c9a87a" position={[-0.9, 0.5, 41.5]} size={[1.9, 1.0, 0.3]} />
    <Vox kind="planks" tint="#c9a87a" position={[-0.9, 3.0, 41.5]} size={[1.9, 1.4, 0.3]} />
    <Vox kind="log" position={[-0.9, 1.02, 41.45]} size={[2.0, 0.14, 0.42]} />
    <Vox kind="grass" tint="#2f5e29" position={[-0.9, -0.5, 38.5]} size={[14, 1, 6]} />

    <Block position={[1.4, 2.0, 41.68]} size={[2.4, 1.2, 0.08]} color="#21402b" />
    <Vox kind="log" position={[1.4, 1.38, 41.68]} size={[2.5, 0.08, 0.12]} />

    <SchoolDesk position={SCHOOL.heroDesk} />
    <SchoolDesk position={[-2.4, 0, 44.2]} />
    <SchoolDesk position={[0.7, 0, 44.2]} />
    <Vox kind="planks" tint="#a8764a" position={[-0.9, 0.42, 44.85]} size={[0.52, 0.1, 0.48]} />
    <Vox kind="planks" tint="#94653c" position={[-0.9, 0.72, 45.06]} size={[0.52, 0.55, 0.08]} />

    <Lantern position={[0, 3.55, 44.2]} chain={0.45} light={3.6} reach={12} />
    <Lantern position={[-0.9, 2.3, 40.3]} chain={0.3} light={2.8} reach={9} />
    <pointLight position={[0, 3.1, 45.5]} intensity={5.2} distance={15} color="#ffe2a8" />
    <LightPool position={[-0.4, 0.02, 44.4]} width={6.2} depth={5.2} color="#ffd99a" opacity={0.28} />
    <Dust position={[0, 1.7, 44.3]} area={[6, 2.8, 5]} count={55} size={0.04} color="#ffe9bd" opacity={0.6} seed={11} speed={0.2} />
  </group>
);

const Cliff: React.FC<{ isSunrise: boolean }> = ({ isSunrise }) => (
  <group position={[0, 0, 0]}>
    <Vox kind="grass" tint={isSunrise ? "#4b8536" : "#2f5a29"} position={[2, -0.5, 95]} size={[90, 1, 60]} />
    <Vox kind="stone" tint="#1f2838" position={[1.6, -1.2, 95]} size={[6.0, 1.5, 24]} />

    <Vox kind="stone" tint="#566275" position={[-9.4, 2.25, 95]} size={[16, 4.5, 18]} />
    <Vox kind="grass" tint={isSunrise ? "#4a8235" : "#34632e"} position={[-9.4, 4.52, 95]} size={[16.2, 0.16, 18.2]} />
    <Vox kind="stone" tint="#636f82" position={[-6.5, 4.55, 95]} size={[10.2, 0.12, 3.2]} />

    <Vox kind="stone" tint="#566275" position={[12.6, 2.25, 95]} size={[16, 4.5, 18]} />
    <Vox kind="grass" tint={isSunrise ? "#4a8235" : "#34632e"} position={[12.6, 4.52, 95]} size={[16.2, 0.16, 18.2]} />

    <Pine position={[-8.5, 4.5, 91.2]} height={4.4} />
    <Pine position={[-5.2, 4.5, 90.6]} height={3.8} />
    <Pine position={[8.2, 4.5, 91.5]} height={4.6} />
    <ForestEdge from={[-22, 0, 82]} to={[24, 0, 82]} depth={2} count={14} seed={19} />

    <LanternPost position={[-4.5, 4.5, 93.2]} light={3.2} seed={9} />
    <LanternPost position={[-1.8, 4.5, 93.2]} light={3.2} seed={10} />
    <Torch position={[-3.2, 4.5, 96.4]} light={2.5} seed={14} />
    <pointLight position={[-3.0, 7.2, 97.5]} intensity={3.8} distance={16} color="#ffd99a" />

    {isSunrise ? (
      <>
        <GodRay position={[5, 9, 92]} rotation={[0, 0, -0.45]} width={7} height={15} color="#ffb95c" opacity={0.16} />
        <LightPool position={[CLIFF.valleyFloor[0], 0.08, 95]} width={10} depth={8} color="#ffc46b" opacity={0.26} />
      </>
    ) : (
      <LightPool position={[-3.2, 4.62, 95]} width={7} depth={5} color="#ffd082" opacity={0.24} />
    )}
    <Dust position={[1, 3.5, 95]} area={[20, 6, 12]} count={70} size={0.045} color={isSunrise ? "#ffd494" : "#b8d0ff"} opacity={0.6} seed={23} speed={0.28} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const cue = active?.shot.cue ?? "";
  const look = active?.shot.look ?? "overworld-night";
  const night = look === "overworld-night" || look === "lantern-night";
  const isSunrise = cue.startsWith("4.orange") || cue.startsWith("4.burn") || cue.startsWith("4.bridge") ||
    cue.startsWith("4.crack") || cue.startsWith("4.heavy") || cue.startsWith("4.wings") ||
    cue.startsWith("5.") || cue.startsWith("6.") || cue.startsWith("7.knew") || cue.startsWith("7.under") || cue.startsWith("7.wait");

  return (
    <>
      {/* Front-side moonlight & sky fill so characters facing the lens are brightly lit, never buried in shadow */}
      {night ? <directionalLight color="#c4d6ff" intensity={1.45} position={[-6, 11, 16]} /> : null}
      {night ? <ambientLight color="#8ea4e8" intensity={0.62} /> : null}
      <Zone name="village">
        <Village night={night} />
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
