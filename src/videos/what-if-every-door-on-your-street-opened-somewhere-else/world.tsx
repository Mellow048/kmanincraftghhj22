import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, PixelText, Vox, Zone, useActiveShot } from "../../engine";
import type { Vec3 } from "../../engine";
import { Classroom, K, Kitchen, PLACE, P, S, SH, H } from "./kit";

/**
 * THE WORLD, in zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   street   The street he lives on, AT NIGHT. The pavement runs west–east; the houses stand on its north side
 *            and their front doors face south, so a lens on the road sees a row of doors and a night sky.
 *            His door (number 4) is at x −1.6, the blue door (number 9) at x +9.2. The lens lives south of the
 *            houses, between z +1 and z +7, and never goes past the road.
 *   kitchen  The kitchen at home, at night: the fridge on the north wall, the table, the chair his mum sits in at
 *            the end. Its door to the hall is in the east wall; the back door is in the street.
 *   class    The classroom he comes out into: daytime, nine desks, the board, the east door.
 *   shop     The corner shop at night: a counter, shelves, a queue on the pavement outside, its door on the
 *            open south side.
 *   pool     The deep end, at night: water to the top of a tiled box, the lane ropes, the ladder, the wall.
 *   hall     The hallway behind the stuck door. 1.4 m wide, no windows, one lamp at the far end, and the wall
 *            on the +x side rubbed pale where something has been written on it.
 *
 * 1 unit = 1 metre. Ground is y = 0.
 *
 * THE ONE THING EVERY ZONE SHARES is a door the same size, the height of the hole in the wall he walks through.
 * It is the film's grammar: six doors, six places, no two of them labelled.
 */

/** A doorway: two jambs, a lintel, and a slab in it that opens by `open` radians. Faces +Z at rotationY 0. */
const Doorway: React.FC<{ at: Vec3; facing?: number; open?: number; colour?: string; lit?: number; hinge?: -1 | 1 }> = ({
  at,
  facing = 0,
  open = 0,
  colour = "#8a6a44",
  lit = 0,
  hinge = -1,
}) => (
  <group position={at} rotation={[0, facing, 0]}>
    <Block size={[0.16, 2.42, 0.3]} position={[-0.66, 1.21, 0]} color="#d8cfc0" castShadow={false} />
    <Block size={[0.16, 2.42, 0.3]} position={[0.66, 1.21, 0]} color="#d8cfc0" castShadow={false} />
    <Block size={[1.48, 0.18, 0.3]} position={[0, 2.5, 0]} color="#c8bfae" castShadow={false} />
    {/* the room behind the opening, so an open door is not a hole in the world */}
    <Block size={[1.16, 2.34, 0.06]} position={[0, 1.2, -0.22]} color="#1a1614" castShadow={false} />
    <group position={[hinge * 0.58, 0, 0.1]} rotation={[0, open, 0]}>
      <Block size={[1.14, 2.3, 0.08]} position={[-hinge * 0.57, 1.16, 0]} color={colour} />
      <Block size={[0.9, 0.86, 0.02]} position={[-hinge * 0.57, 1.62, 0.05]} color={colour} castShadow={false} />
      <Block size={[0.9, 0.82, 0.02]} position={[-hinge * 0.57, 0.62, 0.05]} color={colour} castShadow={false} />
      <Block size={[0.06, 0.06, 0.09]} position={[-hinge * 1.02, 1.02, 0.06]} color="#d8b44a" castShadow={false} />
    </group>
    {lit > 0 ? <Block size={[1.16, 2.34, 0.04]} position={[0, 1.2, -0.16]} color="#ffe6b0" emissive="#ffd79a" emissiveIntensity={lit} castShadow={false} /> : null}
  </group>
);

/** One house on the street: a wall with a door and two windows, a roof, a number over the door. */
const House: React.FC<{ x: number; number: string; colour: string; roof: string; door?: string; open?: number; light?: number; dark?: boolean }> = ({
  x,
  number,
  colour,
  roof,
  door = "#8a6a44",
  open = 0,
  light = 0,
  dark = false,
}) => (
  <group position={[x, 0, 0]}>
    {/* the front wall, with a hole for the door: two blocks and a lintel. 6.0 m wide, so houses sit 6.4 apart. */}
    <Block size={[2.2, 5.2, 0.36]} position={[-2.1, 2.6, -3.3]} color={colour} castShadow={false} />
    <Block size={[2.2, 5.2, 0.36]} position={[2.15, 2.6, -3.3]} color={colour} castShadow={false} />
    <Block size={[2.1, 2.4, 0.36]} position={[0, 4.0, -3.3]} color={colour} castShadow={false} />
    <Block size={[6.2, 0.34, 0.5]} position={[0, 5.34, -3.3]} color={roof} castShadow={false} />
    {/* a bay, a roof, and the chimney that makes it a house at night */}
    <Block size={[6.0, 3.0, 3.2]} position={[0, 6.7, -4.4]} color={roof} castShadow={false} />
    <Block size={[6.2, 0.3, 3.4]} position={[0, 8.25, -4.4]} color="#3a2f28" castShadow={false} />
    <Block size={[0.8, 1.5, 0.8]} position={[2.1, 8.6, -4.8]} color="#8a5a48" castShadow={false} />
    {/* two windows, warm if somebody is in, black if nobody is */}
    {[-2.1, 2.15].map((wx) => (
      <group key={wx} position={[wx, 2.9, -3.11]}>
        <Block size={[1.3, 1.4, 0.1]} color="#4a382a" castShadow={false} />
        <Block
          size={[1.06, 1.16, 0.06]}
          position={[0, 0, 0.06]}
          color={dark ? "#141a2c" : "#ffd79a"}
          emissive={dark ? "#0e1424" : "#ffc478"}
          emissiveIntensity={dark ? 0.05 : light || 1.3}
          castShadow={false}
        />
        <Block size={[0.07, 1.16, 0.03]} position={[0, 0, 0.1]} color="#4a382a" castShadow={false} />
        <Block size={[1.06, 0.07, 0.03]} position={[0, 0, 0.1]} color="#4a382a" castShadow={false} />
      </group>
    ))}
    {/* the number, painted over the door, in cubes so it survives the night */}
    <PixelText text={number} position={[0, 2.86, -3.08]} height={0.34} color={dark ? "#cfd8ff" : "#fff2cf"} />
    <Doorway at={[0, 0, -3.02]} open={open} colour={door} lit={dark ? 0.15 : 0.5} />
    {/* the step */}
    <Block size={[2.4, 0.14, 0.8]} position={[0, 0.07, -2.4]} color="#8b8792" castShadow={false} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      {/* THE STREET. His is number 4; the blue door is number 9, and it is the dare. */}
      <Zone name="street">
        <group position={PLACE.street}>
          {/* the ground: grass verges, a pavement, a kerb, and the road the lens stands on */}
          <Block size={[70, 0.2, 70]} position={[0, -0.1, 0]} color="#3f5a34" />
          <Block size={[70, 0.22, 2.2]} position={[0, -0.02, -1.7]} color="#6d6a72" castShadow={false} />
          <Block size={[70, 0.3, 0.22]} position={[0, 0.03, -0.5]} color="#8a8790" castShadow={false} />
          <Block size={[70, 0.24, 9.0]} position={[0, -0.05, 4.6]} color="#24242c" castShadow={false} />
          {/* the lane markings, in the middle of the road */}
          {[-24, -18, -12, -6, 0, 6, 12, 18, 24].map((x) => (
            <Block key={x} size={[2.6, 0.03, 0.24]} position={[x, 0.08, 4.6]} color="#c9c2a8" castShadow={false} />
          ))}
          {/* the houses, west to east: 1, 2, 4 (his), 6 (the pizza), 8, 9 (the blue door), 11 */}
          <House x={-19.2} number="1" colour="#8a7460" roof="#5a3c30" open={0.05} dark />
          <House x={-12.8} number="2" colour="#a08a72" roof="#6a4436" open={0.1} dark />
          <House x={-6.4} number="4" colour="#b09070" roof="#5f4030" open={0.9} light={1.6} />
          <House x={0} number="6" colour="#8a7a8a" roof="#4a3a4a" open={0.35} dark />
          <House x={6.4} number="8" colour="#9a8468" roof="#5a4034" open={0.15} dark />
          <House x={12.8} number="9" colour="#7a8494" roof="#3f4a5a" door="#2f5fbf" open={0.0} light={0.5} dark />
          <House x={19.2} number="11" colour="#7a6a58" roof="#4a3a2c" open={0.05} dark />
          {/* WHAT IS BEHIND HIS DOOR: not a hall. A tiled floor and a school desk, cold-lit, in a house, at night. */}
          <group position={[-6.4, 0, -3.9]}>
            <Block size={[2.6, 0.1, 2.2]} position={[0, -0.04, -1.0]} color="#c2baa4" castShadow={false} />
            {[-0.7, 0.3].map((x) =>
              [-1.5, -0.5].map((z) => (
                <Block key={`${x}${z}`} size={[1, 0.1, 1]} position={[x, -0.03, z]} color={(x + z) % 2 ? "#7c95a0" : "#c2baa4"} castShadow={false} />
              )),
            )}
            <Block size={[0.1, 0.72, 0.9]} position={[0.55, 0.36, -1.2]} color="#8a6a44" />
            <Block size={[1.1, 0.8, 0.06]} position={[-0.2, 1.35, -1.9]} color="#2b3a2a" castShadow={false} />
            <Block size={[2.4, 2.1, 0.1]} position={[0, 1.4, -2.3]} color="#cfeaff" emissive="#bfe2ff" emissiveIntensity={0.55} castShadow={false} />
            <pointLight position={[0, 1.4, -1.4]} color="#cfe6ff" intensity={9} distance={5} decay={2} />
          </group>
          {/* the neighbour's wardrobe, standing on the pavement with its doors open: he came out of it */}
          <Wardrobe at={[-12.4, 0, -2.4]} />
          <PizzaBox at={[0, 0.16, -2.35]} />
          {/* number 9's door is BLUE and it is the only blue in the street: the one thing he is dared to open */}
          <Glow position={[12.8, 1.4, -2.6]} size={2.4} color="#5f8fff" opacity={0.26} />
          {/* THE BACK DOOR. In the passage between 2 and 4: a door in a wall, and 0.9 m behind it, a brick wall.
              That is the joke, and the camera has to be able to see both. */}
          <group position={[-9.6, 0, -4.6]}>
            <Block size={[0.4, 5.2, 9.0]} position={[0, 2.6, 0]} color="#9a7f62" castShadow={false} />
            <Block size={[0.4, 2.9, 2.6]} position={[0, 4.05, 0.4]} color="#9a7f62" castShadow={false} />
            <Doorway at={[0, 0, 0.4]} facing={Math.PI / 2} open={0.62} lit={0.24} />
            <Block size={[0.5, 0.14, 2.4]} position={[0.2, 0.07, 0.4]} color="#8b8792" castShadow={false} />
            {/* 0.9 m east of the door: the wall his dad walks into */}
            <Block size={[0.4, 3.2, 7.0]} position={[1.3, 1.6, 0.2]} color="#7a5f4a" castShadow={false} />
          </group>
          {/* ONE street lamp, the way a street is really lit: a pole, an arm, a head, and the pool of light under it */}
          <StreetLamp at={[3.2, 0, 1.6]} turn={Math.PI} />
          <pointLight position={[-6.4, 2.3, -2.3]} color="#ffcf92" intensity={11} distance={7} decay={2} />
          {/* two bins, a hedge, a garden gate: the small true things */}
          {[1.5, 1.9].map((x, i) => (
            <Block key={x} size={[0.44, 0.66, 0.44]} position={[x, 0.33, -2.7]} color={i ? "#3f5a44" : "#565a62"} />
          ))}
          <Block size={[3.0, 0.9, 0.5]} position={[-6.9, 0.45, -2.6]} color="#2f4a2a" castShadow={false} />
          <LightPool position={[4.6, 0.02, 1.2]} width={7} depth={5} color="#ffe4b0" opacity={0.22} />
          <LightPool position={[-1.6, 0.02, -1.4]} width={4.4} depth={3.4} color="#ffcf92" opacity={0.2} />
          <Glow position={[-1.6, 1.5, -2.4]} size={2.6} color="#ffcf92" opacity={0.24} />
          <GodRay position={[4.6, 2.4, 1.5]} rotation={[0, 0, 0.06]} width={0.9} height={3.6} color="#ffe4b0" opacity={0.1} />
          <Dust position={[0, 1.9, 0.6]} area={[22, 3.4, 7]} count={44} size={0.03} color="#ffe9c8" opacity={0.34} seed={9} speed={0.1} />
        </group>
      </Zone>

      {/* THE KITCHEN AT HOME. The fridge is the first door he uses, and the last room of the film. */}
      <Zone name="kitchen">
        <Kitchen at={PLACE.kitchen} />
        <Glow position={K(0, 2.5, -2.2)} size={2.6} color="#fff0c8" opacity={0.2} />
        <LightPool position={K(0, 0.02, -0.6)} width={6.4} depth={5} color="#fff2c8" opacity={0.14} />
        <GodRay position={K(-2.3, 2.1, -2.6)} rotation={[0.1, 0, 0.05]} width={1.4} height={2.4} color="#fff0c8" opacity={0.12} />
        <Dust position={K(0, 1.6, -0.4)} area={[6, 2.6, 5]} count={38} size={0.03} color="#fff3d0" opacity={0.5} seed={17} speed={0.14} />
        {/* his pencil measurements, in his own hand, in the kitchen: the map he was proud of */}
        <group position={K(1.55, 1.66, -3.04)}>
          {[
            [0.0, 0.28, 0.42], [0.1, 0.2, 0.3], [-0.06, 0.12, 0.5], [0.16, 0.03, 0.34],
            [0.02, -0.06, 0.46], [0.12, -0.16, 0.28], [-0.04, -0.26, 0.4],
          ].map(([dx, dy, w], i) => (
            <Block key={i} size={[w, 0.026, 0.012]} position={[dx, dy, 0]} color="#5f5a52" castShadow={false} />
          ))}
        </group>
      </Zone>

      {/* THE CLASSROOM. Daytime: the other end of a door in the dark. */}
      <Zone name="class">
        <Classroom at={PLACE.school} board="TODAY" boardSub="A TEST" night={false} />
        <GodRay position={[PLACE.school[0] - 2.6, 1.9, PLACE.school[2] + 0.4]} rotation={[0, 0, 1.0]} width={2.2} height={4.2} color="#fff0c8" opacity={0.1} />
        <LightPool position={[PLACE.school[0], 0.02, PLACE.school[2] + 1.2]} width={7} depth={5} color="#fff2c8" opacity={0.13} />
        <Glow position={[PLACE.school[0], 3.2, PLACE.school[2] - 0.6]} size={2.4} color="#fff0c8" opacity={0.2} />
        <Dust position={[PLACE.school[0], 1.6, PLACE.school[2] + 1]} area={[8, 2.6, 5]} count={40} size={0.03} color="#fff7d8" opacity={0.5} seed={3} speed={0.15} />
      </Zone>

      {/* THE CORNER SHOP: a counter, shelves, and a queue that does not move. */}
      <Zone name="shop">
        <group position={PLACE.shop}>
          {Array.from({ length: 10 }, (_, i) =>
            Array.from({ length: 8 }, (_, j) => (
              <Block key={`f${i}${j}`} position={[-4.5 + i, -0.05, -3.5 + j]} size={[1, 0.1, 1]} color={(i + j) % 2 ? "#b8b09a" : "#8a8f96"} castShadow={false} />
            )),
          )}
          {/* walls: back, west, east, ceiling. The south side is open, and the door is in it. */}
          <Vox kind="wool" tint="#d8cfb4" position={[0, 1.9, -4.1]} size={[9.4, 3.8, 0.2]} castShadow={false} />
          <Vox kind="wool" tint="#cfc6aa" position={[-4.7, 1.9, 0]} size={[0.2, 3.8, 8.2]} castShadow={false} />
          <Vox kind="wool" tint="#cfc6aa" position={[4.7, 1.9, 0]} size={[0.2, 3.8, 8.2]} castShadow={false} />
          <Vox kind="wool" tint="#efe8d4" position={[0, 3.85, 0]} size={[9.6, 0.2, 8.4]} castShadow={false} />
          {/* shelves of stock, dark so that a lit face in front of them reads */}
          <Block size={[7.6, 2.6, 0.5]} position={[-0.4, 1.3, -3.7]} color="#3f4a52" />
          {[0.5, 1.1, 1.7, 2.3].map((y) => (
            <Block key={y} size={[7.6, 0.06, 0.56]} position={[-0.4, y, -3.66]} color="#8a9096" castShadow={false} />
          ))}
          {Array.from({ length: 22 }, (_, i) => (
            <Block
              key={i}
              position={[-4.0 + (i % 11) * 0.72, 0.28 + Math.floor(i / 11) * 0.6, -3.62]}
              size={[0.34, 0.36, 0.3]}
              color={["#c8402f", "#2f6fb8", "#e8a21c", "#3f8a4f", "#8a4ab0", "#d8d2c0"][i % 6]}
              castShadow={false}
            />
          ))}
          {/* the counter, on the west side, where the queue ends */}
          <Block size={[0.9, 1.0, 3.4]} position={[-3.9, 0.5, 0.6]} color="#7a5a3a" />
          <Block size={[0.96, 0.06, 3.5]} position={[-3.9, 1.03, 0.6]} color="#b48d52" castShadow={false} />
          <Block size={[0.4, 0.5, 0.4]} position={[-3.9, 1.3, 1.5]} color="#3a3344" />
          {/* the till, and a light over it */}
          <Block size={[0.3, 0.24, 0.5]} position={[-3.9, 1.28, -0.5]} color="#c9c2b0" />
          <CeilingLamp at={SH(-2.6, 3.7, 0.4)} />
          <CeilingLamp at={SH(1.8, 3.7, 0.4)} />
          {/* the shopfront: two windows either side of the door, on the open south face */}
          {[-3.0, 3.0].map((x) => (
            <group key={x} position={[x, 1.7, 4.0]}>
              <Block size={[3.0, 2.5, 0.14]} color="#5c4a36" castShadow={false} />
              <Block size={[2.7, 2.2, 0.07]} position={[0, 0, 0.08]} color="#bfe2ff" emissive="#bfe2ff" emissiveIntensity={0.55} opacity={0.5} transparent castShadow={false} />
            </group>
          ))}
          <Doorway at={[0, 0, 4.02]} open={0.85} colour="#3f6a52" lit={0.35} />
          {/* A lamp over the door, and light on the pavement: the queue's faces are the last act's subject and the
              shop's two ceiling lamps do not reach them from out there. */}
          <Block size={[0.5, 0.16, 0.5]} position={[0, 3.30, 4.20]} color="#3a3f47" castShadow={false} />
          <Block size={[0.42, 0.08, 0.42]} position={[0, 3.18, 4.20]} color="#fff2c8" emissive="#ffe9a8" emissiveIntensity={2.2} castShadow={false} />
          <pointLight position={[0, 2.95, 4.35]} color="#ffe4b0" intensity={20} distance={9} decay={2} />
          <LightPool position={[0, 0.02, 5.30]} width={5} depth={3.4} color="#ffe4b0" opacity={0.2} />
          {/* the pavement outside, and the queue on it: a rope on two posts, and the light that finds them */}
          <Block size={[16, 0.2, 7]} position={[0, -0.06, 7.4]} color="#5c5a58" castShadow={false} />
          <Block size={[16, 0.24, 0.3]} position={[0, 0.03, 4.4]} color="#8a8790" castShadow={false} />
          {[-2.1, 2.1].map((x) => (
            <Block key={x} size={[0.1, 1.0, 0.1]} position={[x, 0.5, 5.0]} color="#9a94a0" />
          ))}
          <Block size={[4.2, 0.05, 0.05]} position={[0, 0.94, 5.0]} color="#b8a44a" castShadow={false} />
          <LightPool position={[0, 0.02, 5.0]} width={7} depth={4.4} color="#ffe4b0" opacity={0.24} />
          <Glow position={[0, 2.4, 4.4]} size={3.2} color="#ffe9b8" opacity={0.22} />
          <Dust position={[0, 1.7, 3.2]} area={[9, 3, 6]} count={34} size={0.03} color="#ffe9c8" opacity={0.32} seed={11} speed={0.1} />
        </group>
      </Zone>

      {/* THE POOL. The deep end at night: he comes out of the blue door in his shoes. */}
      <Zone name="pool">
        <group position={PLACE.pool}>
          {/* the deck, and the water in its box: the surface is y = 0, and the water is a slab just under it */}
          <Block size={[26, 0.3, 20]} position={[0, -0.16, 0]} color="#b8b0a0" />
          <Block size={[10, 0.14, 8]} position={[0, -0.12, 0]} color="#1e5f8a" castShadow={false} />
          <Block size={[10, 0.06, 8]} position={[0, -0.04, 0]} color="#2f8ab8" emissive="#1e6a9a" emissiveIntensity={0.35} castShadow={false} />
          {/* the walls of the pool, which is the only thing at eye level in the frame */}
          <Block size={[10.6, 1.1, 0.3]} position={[0, 0.4, -4.15]} color="#cfd8dc" castShadow={false} />
          <Block size={[10.6, 1.1, 0.3]} position={[0, 0.4, 4.15]} color="#cfd8dc" castShadow={false} />
          <Block size={[0.3, 1.1, 8.6]} position={[-5.15, 0.4, 0]} color="#cfd8dc" castShadow={false} />
          <Block size={[0.3, 1.1, 8.6]} position={[5.15, 0.4, 0]} color="#cfd8dc" castShadow={false} />
          {/* the lane ropes, and the ladder, so it reads as a pool and not a puddle */}
          {[-2.6, -0.85, 0.85, 2.6].map((x) => (
            <Block key={x} size={[0.12, 0.12, 7.8]} position={[x, 0.02, 0]} color={x > 0 ? "#e8e2d2" : "#c8402f"} castShadow={false} />
          ))}
          <Block size={[0.12, 1.4, 0.12]} position={[4.4, 0.6, 0.6]} color="#c9c2b0" />
          <Block size={[0.12, 1.4, 0.12]} position={[4.4, 0.6, 1.4]} color="#c9c2b0" />
          <Block size={[0.2, 0.1, 1.0]} position={[4.4, 1.25, 1.0]} color="#c9c2b0" castShadow={false} />
          {/* the far side: a fence, a floodlight, and the night above it */}
          {Array.from({ length: 12 }, (_, i) => (
            <Block key={i} size={[0.12, 1.6, 0.12]} position={[-11 + i * 2, 0.8, -9.4]} color="#6a7a86" castShadow={false} />
          ))}
          <Block size={[24, 0.08, 0.08]} position={[0, 1.5, -9.4]} color="#6a7a86" castShadow={false} />
          <Block size={[0.2, 4.4, 0.2]} position={[-8.6, 2.2, -9.0]} color="#4a4a52" />
          <Block size={[1.0, 0.3, 0.4]} position={[-8.6, 4.3, -8.8]} color="#fff0d0" emissive="#fff0d0" emissiveIntensity={2.6} castShadow={false} />
          <pointLight position={[-8.6, 4.2, -8.6]} color="#ffe8c0" intensity={30} distance={16} decay={2} />
          <LightPool position={[0, 0.03, 0]} width={11} depth={9} color="#8fd0ff" opacity={0.2} />
          <GodRay position={[-8.6, 3.6, -8.8]} rotation={[0.6, 0, 0.1]} width={2.4} height={9} color="#fff0d0" opacity={0.1} />
          <Dust position={[0, 1.4, 0]} area={[12, 2.4, 9]} count={30} size={0.03} color="#dff0ff" opacity={0.3} seed={13} speed={0.08} />
        </group>
      </Zone>

      {/* HIS BEDROOM, FROM THE INSIDE: the tally he keeps, and the bed he lies next to it. Zone "bed". */}
      <Zone name="bed">
        <Bedroom at={H(0, 0, 5.1)} closed />
      </Zone>

      {/* HIS BEDROOM, FROM THE HALL: the same room and the same tally, seen through his own doorway.
          It is the last picture of the film, and it is the picture at 3.tally with the camera on the wrong side. */}
      <Zone name="hisroom">
        <Bedroom at={H(0, 0, 5.1)} count={41} />
      </Zone>

      {/* THE HALLWAY BEHIND THE STUCK DOOR. 1.4 m wide, no windows, and writing on the wall. */}
      <Zone name="hall">
        <group position={PLACE.hall}>
          {Array.from({ length: 6 }, (_, i) => (
            <Block key={i} size={[1.9, 0.1, 1.0]} position={[0, -0.05, 0.5 + i]} color={i % 2 ? "#8a7f6e" : "#7c7264"} castShadow={false} />
          ))}
          <Vox kind="wool" tint="#a89a86" position={[-0.85, 1.2, 2.5]} size={[0.2, 2.4, 5.4]} castShadow={false} />
          <Vox kind="wool" tint="#b0a38e" position={[0.85, 1.2, 2.5]} size={[0.2, 2.4, 5.4]} castShadow={false} />
          <Vox kind="wool" tint="#8f8574" position={[0, 2.45, 2.5]} size={[1.9, 0.2, 5.4]} castShadow={false} />
          {/* the far wall, with a doorway in it: HIS OWN DOOR, seen from the hall side */}
          <Vox kind="wool" tint="#a89a86" position={[-0.62, 1.2, 5.1]} size={[0.66, 2.4, 0.2]} castShadow={false} />
          <Vox kind="wool" tint="#a89a86" position={[0.62, 1.2, 5.1]} size={[0.66, 2.4, 0.2]} castShadow={false} />
          <Vox kind="wool" tint="#a89a86" position={[0, 2.3, 5.1]} size={[1.9, 0.4, 0.2]} castShadow={false} />
          {/* the doorway he came in by: the only light in the hall is what comes through it */}
          <Block size={[1.1, 2.3, 0.06]} position={[0, 1.15, -0.12]} color="#0a0806" castShadow={false} />
          {/* the writing on the wall: rows of pencil, one row higher than a kid can reach */}
          {Array.from({ length: 15 }, (_, i) => (
            <Block
              key={i}
              size={[0.02, 0.022, 0.18 + ((i * 7) % 5) * 0.06]}
              position={[0.74, 1.42 + (i % 5) * 0.16, 1.1 + Math.floor(i / 5) * 1.5 + ((i * 3) % 4) * 0.16]}
              color="#4a443c"
              castShadow={false}
            />
          ))}
          {/* the last line, under the others, in the same pencil: the one he has not written yet */}
          <Block size={[0.02, 0.026, 0.62]} position={[0.74, 1.16, 2.4]} color="#3a342c" castShadow={false} />
          <Block size={[0.02, 0.026, 0.3]} position={[0.74, 1.16, 3.0]} color="#3a342c" castShadow={false} />
          {/* one bulb on a wire, halfway down, so the hall is a place and not a void */}
          <Block size={[0.02, 0.5, 0.02]} position={[0, 2.2, 2.6]} color="#2a2620" castShadow={false} />
          <Block size={[0.16, 0.2, 0.16]} position={[0, 1.92, 2.6]} color="#fff0c8" emissive="#ffe9a8" emissiveIntensity={2.4} castShadow={false} />
          <pointLight position={[0, 1.9, 2.6]} color="#ffd79a" intensity={9} distance={5.4} decay={2} />
          <LightPool position={[0, 0.02, 2.2]} width={1.9} depth={3.2} color="#ffd79a" opacity={0.26} />
          <GodRay position={[0, 1.9, 2.6]} rotation={[0, 0, 0.02]} width={0.6} height={2.2} color="#ffe9a8" opacity={0.12} />
          <Dust position={[0, 1.3, 2.4]} area={[1.8, 2.2, 4.4]} count={30} size={0.026} color="#e8d8b8" opacity={0.5} seed={21} speed={0.12} />
        </group>
      </Zone>
    </>
  );
};

/**
 * HIS BEDROOM. 3.6 × 3.4 m, a bed, a shelf, a window with the night in it, and THE TALLY on the wall he lies next
 * to. Built once and placed twice: behind his own door at the start, and through the hall's doorway at the end.
 *
 * `closed` adds the far wall the inside shots need; without it the hall's doorway sees straight in.
 */
const Bedroom: React.FC<{ at: Vec3; closed?: boolean; count?: number }> = ({ at, closed = false, count = 12 }) => (
  <group position={at}>
    {Array.from({ length: 3 }, (_, i) =>
      Array.from({ length: 4 }, (_, j) => (
        <Block key={`f${i}${j}`} size={[1.2, 0.1, 1.2]} position={[-1.2 + i * 1.2, -0.05, 0.6 + j * 1.2]} color={(i + j) % 2 ? "#8a6a4a" : "#7a5c3f"} castShadow={false} />
      )),
    )}
    <Vox kind="wool" tint="#5c6a8a" position={[0, 1.5, 3.0]} size={[3.6, 3.0, 0.2]} castShadow={false} />
    <Vox kind="wool" tint="#54627f" position={[-1.8, 1.5, 1.5]} size={[0.2, 3.0, 3.2]} castShadow={false} />
    <Vox kind="wool" tint="#54627f" position={[1.8, 1.5, 1.5]} size={[0.2, 3.0, 3.2]} castShadow={false} />
    <Vox kind="darkPlanks" position={[0, 3.05, 1.5]} size={[3.8, 0.2, 3.2]} castShadow={false} />
    {closed ? null : <Vox kind="wool" tint="#54627f" position={[0, 1.5, 0]} size={[3.6, 3.0, 0.2]} castShadow={false} />}
    {/* the bed, the shelf, the window with the night in it */}
    <Block size={[1.5, 0.42, 2.2]} position={[-0.95, 0.24, 1.8]} color="#6a4a34" />
    <Block size={[1.36, 0.24, 2.0]} position={[-0.95, 0.55, 1.8]} color="#d8d2c4" castShadow={false} />
    <Block size={[0.5, 0.16, 0.9]} position={[-0.95, 0.72, 1.1]} color="#e8e4da" castShadow={false} />
    <Block size={[0.7, 0.1, 1.6]} position={[1.3, 1.6, 2.9]} color="#8a6a44" />
    <Block size={[0.2, 0.26, 0.2]} position={[1.3, 1.78, 2.6]} color="#e3261c" castShadow={false} />
    <Block size={[0.24, 0.3, 0.14]} position={[1.3, 1.8, 3.1]} color="#3f6fb8" castShadow={false} />
    <group position={[0.55, 1.85, 2.94]}>
      <Block size={[1.3, 1.2, 0.08]} color="#4a382a" castShadow={false} />
      <Block size={[1.12, 1.02, 0.06]} position={[0, 0, 0.06]} color="#cfe0ff" emissive="#a9c6ff" emissiveIntensity={0.8} castShadow={false} />
      <Block size={[0.06, 1.02, 0.03]} position={[0, 0, 0.1]} color="#4a382a" castShadow={false} />
    </group>
    {/* THE TALLY. Twelve marks, in a kid's hand, on the wall he lies next to. More of them when it is seen
        from the hall, because somebody else has been counting since. */}
    <Tally at={[0.25, 0.0, 2.86]} count={count} />
    {/* THE ONLY LIGHT IN THE ROOM. There was none: this room has an emissive window and a glow but no
        point light at all, so every frame of the tally -- at both ends of the film, and the tally is what
        the last scene is about -- fell back on ambient and came out a black rectangle. The room is 3.4 m
        deep with the tally wall at z 3.0, so the light goes inside that, near the foot of the bed. */}
    <pointLight position={[0, 2.30, 1.10]} color="#a9c6ff" intensity={20} distance={9} decay={2} />
    <pointLight position={[0.2, 1.55, 2.45]} color="#8fb4ff" intensity={8} distance={5} decay={2} />
    <Dust position={[0, 1.3, 1.6]} area={[3.2, 2.4, 3]} count={26} size={0.03} color="#cfe0ff" opacity={0.42} seed={31} speed={0.1} />
    <Glow position={[0.55, 1.85, 2.6]} size={2.2} color="#a9c6ff" opacity={0.28} />
    <LightPool position={[0.3, 0.02, 1.8]} width={2.6} depth={2.6} color="#a9c6ff" opacity={0.2} />
  </group>
);

/**
 * THE TALLY: marks scratched on a wall, five to a group with the fifth struck across. `count` is how many marks,
 * so the SAME wall can be drawn with twelve on it and, later, with more than that.
 */
const Tally: React.FC<{ at: Vec3; count: number }> = ({ at, count }) => (
  <group position={at}>
    {Array.from({ length: count }, (_, i) => {
      const g = Math.floor(i / 5);
      const k = i % 5;
      const struck = k === 4;
      return (
        <Block
          key={i}
          size={struck ? [0.024, 0.2, 0.012] : [0.014, 0.18, 0.012]}
          position={[-0.55 + g * 0.11, 1.02 + Math.floor(g / 6) * 0.28 + (i % 2) * 0.01, 0.008]}
          rotation={struck ? [0, 0, 0.32] : [0, 0, -0.04 + (i % 3) * 0.03]}
          color="#3f382f"
          castShadow={false}
        />
      );
    })}
  </group>
);

/** The wardrobe the neighbour comes out of, standing on the pavement with its doors open. */
const Wardrobe: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Block size={[1.3, 2.2, 0.6]} position={[0, 1.1, 0]} color="#6a4a34" />
    <Block size={[1.16, 2.06, 0.08]} position={[0, 1.08, 0.3]} color="#2a2118" castShadow={false} />
    <group position={[-0.6, 1.08, 0.34]} rotation={[0, 1.5, 0]}>
      <Block size={[0.58, 2.04, 0.06]} position={[0.29, 0, 0]} color="#7a5a3e" />
      <Block size={[0.05, 0.1, 0.06]} position={[0.5, 0, 0.05]} color="#d8b44a" castShadow={false} />
    </group>
    <group position={[0.6, 1.08, 0.34]} rotation={[0, -1.9, 0]}>
      <Block size={[0.58, 2.04, 0.06]} position={[-0.29, 0, 0]} color="#7a5a3e" />
      <Block size={[0.05, 0.1, 0.06]} position={[-0.5, 0, 0.05]} color="#d8b44a" castShadow={false} />
    </group>
    <Block size={[1.44, 0.1, 0.34]} position={[0, 2.24, 0.06]} color="#5a3e2c" castShadow={false} />
  </group>
);

/** The pizza box on the step, with a slice gone, twenty minutes late. */
const PizzaBox: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Block size={[0.46, 0.09, 0.46]} color="#d8c49a" />
    <Block size={[0.44, 0.012, 0.44]} position={[0, 0.05, 0]} color="#c2a878" castShadow={false} />
    <Block size={[0.16, 0.014, 0.16]} position={[0.04, 0.058, 0.02]} color="#c8402f" castShadow={false} />
    <Block size={[0.1, 0.02, 0.08]} position={[-0.1, 0.058, -0.06]} color="#e8c44a" castShadow={false} />
  </group>
);

/** A street lamp: a pole, an arm over the pavement, a head, and the light in it. `turn` aims the arm (0 = south). */
const StreetLamp: React.FC<{ at: Vec3; turn?: number }> = ({ at, turn = 0 }) => (
  <group position={at} rotation={[0, turn, 0]}>
    <Block size={[0.22, 4.0, 0.22]} position={[0, 2.0, 0]} color="#2f333a" />
    <Block size={[0.16, 0.16, 1.0]} position={[0, 3.9, 0.5]} color="#2f333a" castShadow={false} />
    <Block size={[0.5, 0.24, 0.4]} position={[0, 3.82, 1.0]} color="#3a3f47" castShadow={false} />
    <Block size={[0.42, 0.1, 0.32]} position={[0, 3.68, 1.0]} color="#fff2c8" emissive="#ffe9a8" emissiveIntensity={3.0} castShadow={false} />
    <pointLight position={[0, 3.6, 1.0]} color="#ffe4b0" intensity={28} distance={15} decay={2} />
  </group>
);

/** A square ceiling lamp: a lit panel and the light under it. */
const CeilingLamp: React.FC<{ at: Vec3 }> = ({ at }) => (
  <group position={at}>
    <Block size={[1.3, 0.12, 0.7]} color="#fff6dc" emissive="#fff0d0" emissiveIntensity={1.6} castShadow={false} />
    <pointLight position={[0, -0.4, 0]} color="#fff0d0" intensity={7} distance={8} decay={2} />
  </group>
);

void P;
void S;
void SH;
void H;
