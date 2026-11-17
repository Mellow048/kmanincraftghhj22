import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Vox } from "../../engine";
import { Classroom, Desk, SchoolHall, Kitchen } from "../../../Topics/WhatIf";
import { A, PLACE } from "./kit";

/**
 * FOUR PLACES, far apart in one world, so a cut is a cut.
 *
 *   class    maths, a test on the desk, the board behind
 *   hall     lockers, and the place a friend decides not to speak
 *   kitchen  one lamp, one table, a mother doing arithmetic in her head
 *   room     the doorway the whole film turns on
 */

const Class: React.FC = () => (
  <>
    <Classroom at={PLACE.class} board="MATHS TEST" boardSub="" />
    {[
      [-2.4, 1.4],
      [-0.6, 1.4],
      [1.2, 1.4],
      [-2.4, 3.0],
      [-0.6, 3.0],
      [1.2, 3.0],
    ].map(([x, z], i) => (
      <Desk key={i} position={A("class", x, 0, z)} book={i === 1 ? "#e8e2d2" : null} />
    ))}
  </>
);

const Room: React.FC = () => (
  <group position={PLACE.room}>
    {/* Floor, three walls, and the door gap he stands in every night. */}
    <Vox kind="planks" tint="#8a5f34" position={[0, -0.06, 0]} size={[6, 0.12, 6]} />
    <Vox kind="planks" tint="#6f4a2a" position={[-3, 1.4, 0]} size={[0.16, 2.8, 6]} />
    <Vox kind="planks" tint="#6f4a2a" position={[3, 1.4, 0]} size={[0.16, 2.8, 6]} />
    <Vox kind="planks" tint="#6f4a2a" position={[0, 1.4, -3]} size={[6, 2.8, 0.16]} />

    {/* The doorway: two piers and a lintel at the +z wall, which is left open. */}
    <Vox kind="planks" tint="#6f4a2a" position={[-2.1, 1.4, 3]} size={[1.8, 2.8, 0.16]} />
    <Vox kind="planks" tint="#6f4a2a" position={[2.1, 1.4, 3]} size={[1.8, 2.8, 0.16]} />
    <Vox kind="planks" tint="#5e3f22" position={[0, 2.62, 3]} size={[2.4, 0.36, 0.18]} />

    {/* The bed, the lamp, the desk he never uses. */}
    <Vox kind="planks" tint="#b0803f" position={[-1.9, 0.24, -1.6]} size={[1.5, 0.48, 2.2]} />
    <Block position={[-1.9, 0.6, -2.2]} size={[1.3, 0.2, 0.6]} color="#e8e2d2" castShadow={false} />
    <Vox kind="planks" tint="#5e3f22" position={[2.2, 0.4, 1.4]} size={[0.9, 0.06, 1.6]} />
    <Glow position={[-2.4, 2.3, 1.2]} size={0.8} color="#ffbe80" opacity={0.5} />
    <pointLight position={[-2.4, 2.25, 1.2]} color="#ffb877" intensity={22} distance={8} decay={2} />
    <pointLight position={[1.6, 2.3, 2.2]} color="#ffc890" intensity={16} distance={7} decay={2} />
    <LightPool position={[0, 0.03, 1.6]} width={4.4} depth={3.4} color="#ff9a45" opacity={0.16} />
  </group>
);

export const World: React.FC = () => (
  <>
    {/* Rooms in this film are boxes, and a box blocks the look's sun. These keep every interior readable. */}
    <ambientLight color="#ffe6c8" intensity={0.5} />
    <pointLight position={[0, 2.5, 84]} color="#ffc48a" intensity={26} distance={10} decay={2} />
    <pointLight position={[-2, 2.4, 78]} color="#ffb877" intensity={18} distance={9} decay={2} />
    <pointLight position={[0, 2.6, 4]} color="#fff0d8" intensity={20} distance={11} decay={2} />
    <pointLight position={[0, 2.6, 44]} color="#fff0d8" intensity={18} distance={12} decay={2} />
    <Class />
    <SchoolHall at={PLACE.hall} length={16} sign="ROOM 4" />
    <Kitchen at={PLACE.kitchen} />
    <Room />
    <GodRay position={[2.4, 2.2, 40]} rotation={[0.1, 0.4, 0]} width={2.0} height={5} color="#fff3d0" opacity={0.14} />
    <Dust position={[0, 1.6, 40]} area={[14, 3, 8]} count={26} />
  </>
);
