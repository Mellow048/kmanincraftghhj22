import React from "react";
import { Block, Sign, SolidBox, Vox } from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/**
 * EXPLAINER CAMPUS MAP (Open-Roof Schoolhouse + Pillared College + Smokestack Factory).
 * Modeled for high-retention Minecraft Explainer Shorts ("School explained with Minecraft",
 * economics, history flashbacks, automation, work/debt stories).
 *
 * - Open-top brick schoolhouse at `[0, 0, 0]` (9 desks + chalkboard + teacher lectern) for crisp 3/4 & top-down shots.
 * - White-pillared classical college hall at `[-16, 0, -10]` for degree / debt / institution beats.
 * - Brick industrial factory with twin smokestacks at `[16, 0, -10]` for "200 YEARS AGO — FACTORY AGE" sepia flashbacks.
 * - Zero coplanar z-fighting, zero floating props, all walls registered with `<SolidBox>`.
 */
export const SchoolCampusMap: React.FC<{
  position?: Vec3;
  schoolTitle?: string;
  collegeTitle?: string;
  factoryTitle?: string;
}> = ({
  position = [0, 0, 0],
  schoolTitle = "SCHOOL",
  collegeTitle = "COLLEGE",
  factoryTitle = "FACTORY",
}) => {
  const [ox, oy, oz] = position;
  const deskXs = [-3.0, 0, 3.0];
  const deskZs = [-0.6, 1.4, 3.4];

  return (
    <group position={position}>
      {/* Campus lawn (top at y = 0.0) */}
      <Vox kind="grass" position={[0, -0.25, -4]} size={[58, 0.5, 58]} />

      {/* Main stone-brick campus walkway (thin slab with auto polygonOffset, starts at z = 4.6 outside school floor) */}
      <Block position={[0, 0.02, 12.6]} size={[3.4, 0.04, 16.0]} color="#9ca2aa" />
      {/* Side paths branching cleanly to College (left) and Factory (right) */}
      <Block position={[-9.5, 0.02, 8.0]} size={[15.6, 0.04, 2.2]} color="#9ca2aa" />
      <Block position={[9.5, 0.02, 8.0]} size={[15.6, 0.04, 2.2]} color="#9ca2aa" />

      {/* ================================================================= */}
      {/* ZONE A: OPEN-ROOF BRICK SCHOOLHOUSE (centered at [0, 0, 0])       */}
      {/* ================================================================= */}
      <group position={[0, 0, 0]}>
        {/* Interior oak-plank floor (bottom y=0.0, top y=0.06) */}
        <Vox kind="planks" position={[0, 0.03, 0]} size={[11.0, 0.06, 9.0]} />

        {/* Back brick wall (bottom y=0.06, top y=4.06, z from -4.5 to -4.2) */}
        <Vox kind="bricks" position={[0, 2.06, -4.35]} size={[11.0, 4.0, 0.3]} />
        {/* Left & Right brick walls (z from -4.2 to +4.5 — stop flush at back wall inner face, zero corner overlap!) */}
        <Vox kind="bricks" position={[-5.35, 2.06, 0.15]} size={[0.3, 4.0, 8.7]} />
        <Vox kind="bricks" position={[5.35, 2.06, 0.15]} size={[0.3, 4.0, 8.7]} />

        {/* Green chalkboard mounted cleanly in front of back wall (back wall inner face z = -4.2) */}
        <Block position={[0, 2.15, -4.14]} size={[5.4, 1.9, 0.08]} color="#1e4d30" />
        <Vox kind="darkPlanks" position={[0, 1.14, -4.08]} size={[5.6, 0.12, 0.2]} />

        {/* Teacher's podium / desk */}
        <Vox kind="darkPlanks" position={[0, 0.56, -2.6]} size={[1.9, 1.0, 0.8]} />
        <Block position={[0, 1.1, -2.6]} size={[2.0, 0.08, 0.88]} color="#b88b5a" />

        {/* 3x3 Student Desks + Stools (all grounded cleanly at y = 0.06) */}
        {deskXs.map((dx) =>
          deskZs.map((dz) => (
            <group key={`desk_${dx}_${dz}`} position={[dx, 0, dz]}>
              {/* Desk legs (bottom 0.06, top 0.74) */}
              <Vox kind="darkPlanks" position={[-0.55, 0.4, 0]} size={[0.1, 0.68, 0.65]} />
              <Vox kind="darkPlanks" position={[0.55, 0.4, 0]} size={[0.1, 0.68, 0.65]} />
              {/* Desk tabletop (bottom 0.74, top 0.84) */}
              <Vox kind="planks" position={[0, 0.79, 0]} size={[1.3, 0.1, 0.75]} />
              {/* Student wooden stool behind desk (bottom 0.06, top 0.54) */}
              <Vox kind="darkPlanks" position={[0, 0.3, 0.65]} size={[0.54, 0.48, 0.54]} />
            </group>
          )),
        )}

        {/* School header sign above back wall */}
        <Sign title={schoolTitle} position={[0, 3.56, -4.15]} width={3.6} height={0.76} />

        {/* SolidBox collision walls for actors & camera spring-arm */}
        <SolidBox name="school-back" position={[ox, oy + 2.06, oz - 4.35]} size={[11.0, 4.0, 0.3]} />
        <SolidBox name="school-left" position={[ox - 5.35, oy + 2.06, oz + 0.15]} size={[0.3, 4.0, 8.7]} />
        <SolidBox name="school-right" position={[ox + 5.35, oy + 2.06, oz + 0.15]} size={[0.3, 4.0, 8.7]} />
      </group>

      {/* ================================================================= */}
      {/* ZONE B: CLASSICAL WHITE-PILLARED COLLEGE HALL ([-16, 0, -10])     */}
      {/* ================================================================= */}
      <group position={[-16, 0, -10]}>
        {/* Stepped stone plinth (bottom y=0.0, top y=0.5) */}
        <Vox kind="stoneBrick" position={[0, 0.25, 0]} size={[10.4, 0.5, 7.4]} />
        {/* Main college building block (bottom y=0.5, top y=4.5) */}
        <Block position={[0, 2.5, -1.2]} size={[9.2, 4.0, 4.6]} color="#e6e2d6" />
        {/* Dark arched double entrance flush on front wall (z = 1.1) */}
        <Block position={[0, 1.7, 1.15]} size={[2.2, 2.4, 0.1]} color="#25211e" />
        {/* 4 Classical white quartz columns (bottom y=0.5, top y=4.5) */}
        {[-3.6, -1.2, 1.2, 3.6].map((cx) => (
          <Block key={`col_${cx}`} position={[cx, 2.5, 2.6]} size={[0.62, 4.0, 0.62]} color="#f4f2ec" />
        ))}
        {/* Stepped classical pediment roof (architrave y=4.5..5.3, non-overlapping layers) */}
        <Block position={[0, 4.9, 0.0]} size={[10.2, 0.8, 7.0]} color="#dedad0" />
        <Block position={[0, 5.55, 0.0]} size={[7.6, 0.5, 6.4]} color="#d4d0c5" />
        <Block position={[0, 6.05, 0.0]} size={[4.8, 0.5, 5.8]} color="#cac6ba" />

        <Sign title={collegeTitle} position={[0, 4.9, 3.55]} width={3.6} height={0.68} />
        <SolidBox name="college-hall" position={[ox - 16, oy + 2.5, oz - 11.2]} size={[9.6, 4.5, 5.0]} />
      </group>

      {/* ================================================================= */}
      {/* ZONE C: INDUSTRIAL BRICK FACTORY WITH TWIN SMOKESTACKS ([16,0,-10])*/}
      {/* ================================================================= */}
      <group position={[16, 0, -10]}>
        {/* Concrete slab foundation (bottom y=0.0, top y=0.3) */}
        <Vox kind="stone" position={[0, 0.15, 0]} size={[11.2, 0.3, 8.2]} />
        {/* Main brick factory hall (bottom y=0.3, top y=4.3) */}
        <Vox kind="bricks" position={[0, 2.3, 0]} size={[10.2, 4.0, 7.2]} />
        {/* Industrial loading bay doorway (flush in front of z = 3.6) */}
        <Block position={[0, 1.5, 3.66]} size={[2.8, 2.4, 0.12]} color="#1f1d1b" />
        {/* Warm factory windows (flush on front wall, zero overlap) */}
        {[-3.2, 3.2].map((wx) => (
          <Block
            key={`fwin_${wx}`}
            position={[wx, 2.4, 3.65]}
            size={[1.6, 1.3, 0.1]}
            color="#f7c86a"
            emissive="#f5a623"
            emissiveIntensity={0.45}
          />
        ))}
        {/* Twin brick smokestacks rising cleanly from roof (bottom y=4.3, top y=9.3) */}
        {[-2.8, 2.8].map((sx) => (
          <group key={`stack_${sx}`} position={[sx, 0, -1.8]}>
            <Vox kind="bricks" position={[0, 6.8, 0]} size={[1.4, 5.0, 1.4]} />
            <Block position={[0, 9.45, 0]} size={[1.6, 0.3, 1.6]} color="#2d2d32" />
            {/* Stylized blocky Minecraft smoke puffs */}
            <Block position={[0.1, 10.25, -0.1]} size={[0.95, 0.75, 0.95]} color="#8b8e94" opacity={0.82} transparent castShadow={false} />
            <Block position={[0.45, 11.25, -0.35]} size={[1.2, 0.85, 1.2]} color="#9ea2a8" opacity={0.68} transparent castShadow={false} />
            <Block position={[0.95, 12.35, -0.65]} size={[1.45, 0.9, 1.45]} color="#b4b8be" opacity={0.5} transparent castShadow={false} />
          </group>
        ))}

        <Sign title={factoryTitle} position={[0, 3.55, 3.65]} width={3.6} height={0.76} />
        <SolidBox name="factory-hall" position={[ox + 16, oy + 2.3, oz - 10]} size={[10.4, 4.3, 7.4]} />
      </group>
    </group>
  );
};
