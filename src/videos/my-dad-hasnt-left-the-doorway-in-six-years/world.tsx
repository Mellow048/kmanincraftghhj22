import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Vox } from "../../engine";
import { Moon, Stars } from "../../../Topics/InThisTown";
import { GARDEN, DOOR } from "./kit";

/**
 * THE HOUSE. One wall with a door in it, and two worlds on either side.
 *
 *   street  z > 0   night, a dirt path, two torch posts, the moon. Where the monsters come from.
 *   house   z < 0   the floor he has stood on for six years, and a second floor above his head.
 *   garden  z < -6  daylight, a pond, a table and two chairs. The thing he has never turned round to see.
 *
 * 1 unit = 1 block = 1 metre. Floor is y = 0.
 */

const Wall: React.FC = () => (
  <>
    {/* The doorway wall. Two piers and a lintel: an actual gap, one block wide, at x = 0. */}
    <Vox kind="cobble" position={[-2.42, 1.35, 0]} size={[3.56, 2.7, 0.32]} />
    <Vox kind="cobble" position={[2.42, 1.35, 0]} size={[3.56, 2.7, 0.32]} />
    <Vox kind="planks" position={[0, 2.47, 0]} size={[1.32, 0.46, 0.34]} />

    {/* House floor, three walls, and the opening at the back that he has never looked through. */}
    <Vox kind="planks" position={[0, -0.05, -2.6]} size={[5.24, 0.1, 5.2]} />
    <Vox kind="planks" position={[-2.6, 1.35, -2.6]} size={[0.16, 2.7, 5.2]} />
    <Vox kind="planks" position={[2.6, 1.35, -2.6]} size={[0.16, 2.7, 5.2]} />
    <Vox kind="planks" position={[-1.92, 1.35, -5.2]} size={[1.36, 2.7, 0.16]} />
    <Vox kind="planks" position={[1.92, 1.35, -5.2]} size={[1.36, 2.7, 0.16]} />
    <Vox kind="planks" position={[0, 2.47, -5.2]} size={[2.4, 0.46, 0.16]} />

    {/* The second floor he built: a plank ceiling above the doorway, and the ladder up to it. */}
    <Vox kind="planks" position={[0, 2.98, -2.6]} size={[5.24, 0.14, 5.2]} />
    {[0, 1, 2, 3, 4].map((i) => (
      <Block key={i} position={[2.15, 0.34 + i * 0.55, -3.9]} size={[0.62, 0.1, 0.3]} color="#8a5f34" />
    ))}
    <Block position={[2.15, 3.12, -3.9]} size={[0.9, 0.12, 0.9]} color="#8a5f34" />

    {/* Interior light: the wall lamps are the only reason the inside of this house is not a black box.
        The front wall blocks the sun, so these do the work on every shot that faces the door. */}
    <ambientLight color="#ffd9b4" intensity={0.45} />
    <pointLight position={[-2.35, 2.62, -1.6]} color="#ffb877" intensity={30} distance={11} decay={2} />
    <pointLight position={[2.35, 2.62, -3.4]} color="#ffc890" intensity={26} distance={10} decay={2} />
    <pointLight position={[0, 2.8, -0.7]} color="#ffd0a0" intensity={24} distance={7} decay={2} />
    <pointLight position={[0, 2.05, 4.6]} color="#ffc48a" intensity={22} distance={9} decay={2} />
    <LightPool position={[-1.2, 0.04, -2.0]} width={4.6} depth={4.6} color="#ff9a45" opacity={0.2} />

    {/* A chest by the door, lid open. It is the inventory beat. */}
    <Vox kind="planks" position={[-1.75, 0.02, -1.05]} size={[1.0, 0.04, 0.84]} />
  </>
);

const Street: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 6]} size={[26, 1, 14]} />
    <Vox kind="path" position={[DOOR.at[0], 0.02, 4.2]} size={[2.6, 0.06, 9.2]} />
    <Vox kind="path" position={[0, 0.021, 0.5]} size={[4.6, 0.06, 1.2]} />

    {/* Fence either side of the path, so the yard has edges. */}
    {[-2.1, 2.1].map((x) =>
      [-0.4, 1.6, 3.6, 5.6, 7.6].map((z, i) => (
        <Block key={`${x}-${i}`} position={[x, 0.55, z]} size={[0.14, 1.1, 0.14]} color="#6a4425" />
      )),
    )}
    {[-2.1, 2.1].map((x) => (
      <Block key={`rail-${x}`} position={[x, 0.92, 3.6]} size={[0.1, 0.12, 8.4]} color="#7a5330" />
    ))}

    {/* Two torch posts at the edge of the light: the exact line a zombie stops at. */}
    {[-1.55, 1.55].map((x) => (
      <group key={x} position={[x, 0, 2.0]}>
        <Vox kind="planks" position={[0, 1.15, 0]} size={[0.18, 2.3, 0.18]} />
        <Torch position={[0, 2.4, 0]} light={5} seed={x > 0 ? 3 : 7} />
        <Glow position={[0, 2.45, 0]} size={1.5} color="#ffb066" opacity={0.5} />
        <LightPool position={[0, 0.03, 0]} width={5.4} depth={5.4} color="#ff9a45" opacity={0.34} />
      </group>
    ))}

    {/* The moon, high and cold, and dust in the air for the light to catch. */}
    <Moon position={[-16, 24, 26]} radius={3.4} />
    <Stars center={[0, 10, 20]} count={90} seed={11} />

    {/* A hedge far off, so the street is not an empty plane. */}
    <Vox kind="leaves" position={[-8, 1.1, 9.5]} size={[9, 2.2, 1.2]} />
    <Vox kind="leaves" position={[8.6, 1.0, 9.5]} size={[7, 2.0, 1.2]} />
  </>
);

const Garden: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, -9.6]} size={[22, 1, 8.4]} />

    {/* The pond, west. Water is a flat blue plate and a pale rim. */}
    <Block position={[GARDEN.pond[0], 0.03, GARDEN.pond[2]]} size={[3.6, 0.06, 3.0]} color="#3f78c8" castShadow={false} />
    <Vox kind="cobble" position={[GARDEN.pond[0] - 2.0, 0.12, GARDEN.pond[2]]} size={[0.4, 0.24, 3.2]} />

    {/* The oak he planted the year I was ten. */}
    <Vox kind="planks" position={[GARDEN.tree[0], 2.4, GARDEN.tree[2]]} size={[0.6, 4.8, 0.6]} />
    <Vox kind="leaves" position={[GARDEN.tree[0], 5.2, GARDEN.tree[2]]} size={[4.2, 2.6, 4.2]} />
    <Vox kind="leaves" position={[GARDEN.tree[0], 6.7, GARDEN.tree[2]]} size={[2.6, 1.6, 2.6]} />

    {/* Flowers along the back of the house, so the reveal frame has colour in the foreground. */}
    {[-2.2, -1.4, 1.3, 2.0, 2.7].map((x, i) => (
      <Block
        key={i}
        position={[x, 0.14, -5.7]}
        size={[0.18, 0.28, 0.18]}
        color={["#c8483a", "#e0c040", "#7a5fd0", "#e07a40", "#d86a8a"][i]}
        castShadow={false}
      />
    ))}
    <Vox kind="leaves" position={[-3.9, 0.3, -5.9]} size={[1.2, 0.6, 0.9]} />

    {/* Sunlight through the tree, and dust where the beams cross the garden. */}
    <GodRay position={[2.0, 2.0, -8.4]} rotation={[0.22, 0.5, 0]} width={1.8} height={5.4} color="#fff0c8" opacity={0.2} />
    <Dust position={[0.5, 1.4, -7.6]} area={[6, 3, 5]} count={40} />
  </>
);

export const World: React.FC = () => (
  <>
    <Wall />
    <Street />
    <Garden />
  </>
);
