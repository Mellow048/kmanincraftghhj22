import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Hut, LampPost, Lantern, Stall, Well } from "../../../Topics/InThisTown";
import { PLACE } from "./kit";

/**
 * THE TOWN, in four zones. A shot names the zone it plays in, and the others are not drawn.
 *
 *   village    The street, west–east. House fronts on the north side face south, at the camera. The square
 *              is at x = 0. This is where the parties are, and where every front door has a kitchen behind
 *              it that nobody has ever used.
 *   home       THE TELLER'S KITCHEN: a real kitchen, and the one room in the film with a lit stove. Its own
 *              set, 400 m away, so it can be sealed on all four sides and lit like a room and not like a
 *              street. This is where the training happens.
 *   room       His bedroom. One window, no south wall: the lens lives in the gap.
 *   restaurant The vending machine with a door in it, and behind the door a professional kitchen. The
 *              third act, and the only place in town with heat over food.
 *
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const Village: React.FC = () => (
  <>
    <Vox kind="grass" position={[0, -0.5, 0]} size={[120, 1, 90]} />
    <Vox kind="path" position={[3, 0.02, 2]} size={[60, 0.06, 4.6]} />
    <Vox kind="path" position={[0, 0.021, 1.5]} size={[13, 0.06, 12]} />

    {/* North side, west to east. Fronts face south. */}
    <Hut at={[-21, 0, -5]} w={7} windows={[-2, 2]} roof="#3f6b3a" />
    <Hut at={[-10, 0, -5]} w={6} h={3.6} wall="cobble" roof="#5a4a6a" windows={[-2, 2]} />
    <Vox kind="cobble" position={[-10, 0.25, -4.15]} size={[2.8, 0.5, 1.7]} />
    <Vox kind="stone" position={[-10, 0.12, -3.1]} size={[1.6, 0.24, 0.5]} />
    <Hut at={[0, 0, -7]} w={9} d={7} h={4.6} roof="#8a3b2a" windows={[-2.9, 2.9]} />
    <Hut at={PLACE.home} w={6.5} tint="#caa268" roof="#3f6b3a" door={-1.3} windows={[1.5]} />
    <Hut at={[20, 0, -5]} w={6} h={3.6} tint="#d8c49a" roof="#3d5f9a" door={1.2} windows={[-1.6]} />

    {/* South side: backs to the usual camera. */}
    <Hut at={[-13, 0, 11]} w={7} tint="#d8c49a" roof="#8a3b2a" windows={[-1.8, 1.8]} turn={Math.PI} />
    <Hut at={[1.5, 0, 12.5]} w={6} h={3.6} wall="cobble" roof="#3d5f9a" windows={[1.5]} door={-1.2} turn={Math.PI} />
    <Hut at={[15, 0, 11]} w={6.5} tint="#caa268" roof="#5a4a6a" windows={[-1.6]} door={1.3} turn={Math.PI} />

    <Bell position={PLACE.bell} />
    <Well position={PLACE.well} />
    <Stall position={PLACE.stall} />

    {/* THE VENDING MACHINE. The town's only restaurant, and there is a queue for it. */}
    <Vox kind="stoneBrick" position={[PLACE.vending[0], 0.9, PLACE.vending[2]]} size={[1.4, 1.8, 0.9]} />
    <Vox kind="wool" tint="#2f6fb8" position={[PLACE.vending[0], 1.35, PLACE.vending[2] + 0.47]} size={[1.1, 1.0, 0.04]} />
    {[-0.3, 0.0, 0.3].map((dx, i) => (
      <Vox
        key={i}
        kind="wool"
        tint={["#c8402f", "#e8a21c", "#3f8a4f"][i]}
        position={[PLACE.vending[0] + dx, 1.02, PLACE.vending[2] + 0.49]}
        size={[0.14, 0.5, 0.03]}
      />
    ))}
    <Vox kind="stone" position={[PLACE.vending[0], 0.42, PLACE.vending[2] + 0.5]} size={[0.5, 0.16, 0.06]} />
    <Glow position={[PLACE.vending[0], 1.35, PLACE.vending[2] + 0.6]} size={1.3} color="#8fd0ff" opacity={0.3} />
    <pointLight position={[PLACE.vending[0], 1.5, PLACE.vending[2] + 0.9]} color="#9fd8ff" intensity={9} distance={5} decay={2} />

    {(
      [
        [-28, -12, 4.6],
        [-15.5, -13.5, 4],
        [6, -15.5, 4.4],
        [15, -13, 3.8],
        [27, -11, 4.6],
        [-25, 14, 4],
        [8, 17, 4.4],
        [25, 13, 4],
        [-33, 1, 4.8],
        [31, 3, 4.4],
      ] as Array<[number, number, number]>
    ).map(([x, z, height], i) => (
      <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#3f7f2d" : "#4a8c33"} />
    ))}
    <LampPost position={[-5.6, 0, -3.6]} seed={2} />
    <LampPost position={[5.2, 0, 6.6]} seed={3} />
    <LampPost position={[15.6, 0, -3.4]} seed={4} />
    <LampPost position={[-16, 0, 4.6]} seed={5} />
    <Clouds y={48} center={[0, 0, 0]} />

    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.06} />
    <LightPool position={[0, 0.07, 1.5]} width={11} depth={9} color="#fff2c8" opacity={0.14} />
    <Glow position={[0, 2.3, -2.5]} size={1.6} color="#ffe08a" opacity={0.35} />
    <Dust position={[0, 2.2, 1]} area={[30, 4, 14]} count={70} size={0.045} color="#fff7d8" opacity={0.6} seed={3} speed={0.2} />
  </>
);

/**
 * THE KITCHEN AT HOME. 7 x 6 m, sealed on four sides, one door in the east wall.
 *
 * A street has no walls, so a lens on it can point anywhere; a kitchen cannot. Every shot in here is placed
 * from the room's own numbers (below), and every one of them is checked so the camera lands inside the
 * 6.6 x 5.6 m of floor and not in the plaster.
 */
const HOME = { w: 3.5, d: 3.0, h: 3.0 };

const HomeKitchen: React.FC<{ night?: boolean }> = ({ night }) => (
  <group position={PLACE.home2}>
    {/* floor, ceiling, and the four walls. The south wall has a door gap so the lens can live outside it. */}
    <Vox kind="planks" tint="#c9a06a" position={[0, -0.05, 0]} size={[HOME.w * 2, 0.1, HOME.d * 2]} />
    <Vox kind="stone" position={[0, HOME.h, 0]} size={[HOME.w * 2, 0.12, HOME.d * 2]} />
    <Vox kind="wool" tint="#efe6d2" position={[0, HOME.h / 2, -HOME.d]} size={[HOME.w * 2, HOME.h, 0.2]} />
    <Vox kind="wool" tint="#e8dfc8" position={[-HOME.w, HOME.h / 2, 0]} size={[0.2, HOME.h, HOME.d * 2]} />
    <Vox kind="wool" tint="#e8dfc8" position={[HOME.w, HOME.h / 2, 0]} size={[0.2, HOME.h, HOME.d * 2]} />
    {/* south: two stubs and a doorway the lens stands in */}
    <Vox kind="wool" tint="#efe6d2" position={[-2.1, HOME.h / 2, HOME.d]} size={[2.8, HOME.h, 0.2]} />
    <Vox kind="wool" tint="#efe6d2" position={[2.1, HOME.h / 2, HOME.d]} size={[2.8, HOME.h, 0.2]} />

    {/* THE COUNTER, along the north wall. Top at y 0.92. */}
    <Vox kind="planks" position={[0, 0.45, -2.55]} size={[6.0, 0.9, 0.8]} />
    <Vox kind="stoneBrick" tint="#d8d2c0" position={[0, 0.93, -2.55]} size={[6.1, 0.06, 0.9]} />

    {/* THE STOVE, west end of the counter, with a pot on it. */}
    <Vox kind="obsidian" position={[-2.1, 1.0, -2.55]} size={[0.9, 0.1, 0.8]} />
    <Vox kind="magma" position={[-2.1, 1.06, -2.55]} size={[0.5, 0.04, 0.5]} />
    <Vox kind="stone" position={[-2.1, 1.16, -2.55]} size={[0.5, 0.2, 0.5]} />
    <pointLight position={[-2.1, 1.5, -2.3]} color="#ff9a3c" intensity={7} distance={4} decay={2} />

    {/* a window over the sink, boarded outside — it is night in most of this film */}
    <Vox kind="wool" tint="#bfe2ff" position={[1.4, 1.7, -HOME.d + 0.06]} size={[1.6, 1.0, 0.02]} />
    <Vox kind="darkPlanks" position={[1.4, 1.7, -HOME.d - 0.02]} size={[1.9, 1.3, 0.08]} />

    {/* THE FRIDGE. It is almost empty for the first half of the film and full at the end. */}
    <Vox kind="wool" tint="#dfe6ea" position={[2.75, 0.9, -2.5]} size={[1.0, 1.8, 0.7]} />
    <Vox kind="wool" tint="#b8c2c8" position={[2.75, 0.9, -2.14]} size={[0.92, 1.7, 0.03]} />
    <Vox kind="stone" position={[2.75, 1.25, -2.12]} size={[0.06, 0.1, 0.04]} />

    {/* THE TABLE he works at, and the chair he does not sit in. */}
    <Vox kind="planks" tint="#b0803f" position={[0, 0.76, 0.6]} size={[2.2, 0.08, 1.3]} />
    {[-1.0, 1.0].flatMap((x) => [-0.05, 1.25].map((z) => <Vox key={`${x}${z}`} kind="planks" tint="#8a6a44" position={[x, 0.37, z]} size={[0.1, 0.74, 0.1]} />))}

    {/* THE CUTTING BOARD. A metre of pale wood at the table's north edge, in the light, always. */}
    <Vox kind="planks" tint="#d9b888" position={[0, 0.85, 0.25]} size={[1.1, 0.06, 0.7]} />

    {/* knives on a rail: the one wall decoration in the film */}
    <Vox kind="stone" position={[1.0, 1.55, -HOME.d + 0.12]} size={[1.4, 0.06, 0.06]} />
    {[-0.42, -0.14, 0.14, 0.42].map((dx, i) => (
      <Vox key={i} kind="wool" tint="#c8ced4" position={[1.0 + dx, 1.38, -HOME.d + 0.12]} size={[0.09, 0.3 + i * 0.04, 0.03]} />
    ))}

    {/* LIGHT. Two warm lamps, and the stove. A kitchen with one LightPool and no point light renders black. */}
    <pointLight position={[0, 2.55, 0.5]} color="#ffe8c0" intensity={night ? 26 : 30} distance={9} decay={1.7} />
    <pointLight position={[0.6, 2.4, -2.2]} color="#fff0d0" intensity={14} distance={6} decay={2} />
    <Glow position={[0, 2.3, 0.4]} size={1.5} color="#ffe8c0" opacity={0.2} />
    <Dust position={[0, 1.5, 0.4]} area={[6, 2.4, 5]} count={28} size={0.03} color="#fff2d8" opacity={0.35} seed={21} speed={0.09} />
  </group>
);

/**
 * THE RESTAURANT. A vending machine on the street, and behind it: a professional kitchen.
 * 12 x 9 m, with a service window and a hot line. The third act.
 */
const REST = { w: 6.0, d: 4.5, h: 3.4 };

const Restaurant: React.FC = () => (
  <group position={PLACE.restaurant}>
    <Vox kind="stoneBrick" position={[0, -0.05, 0]} size={[REST.w * 2, 0.1, REST.d * 2]} />
    <Vox kind="stone" position={[0, REST.h, 0]} size={[REST.w * 2, 0.12, REST.d * 2]} />
    <Vox kind="stoneBrick" tint="#c8bda8" position={[0, REST.h / 2, -REST.d]} size={[REST.w * 2, REST.h, 0.2]} />
    <Vox kind="stoneBrick" tint="#c8bda8" position={[-REST.w, REST.h / 2, 0]} size={[0.2, REST.h, REST.d * 2]} />
    <Vox kind="stoneBrick" tint="#c8bda8" position={[REST.w, REST.h / 2, 0]} size={[0.2, REST.h, REST.d * 2]} />
    {/* south wall: the pass, a 5 m window onto the dining room, and the door the friends come through */}
    <Vox kind="stoneBrick" tint="#c8bda8" position={[-3.4, REST.h / 2, REST.d]} size={[5.2, REST.h, 0.2]} />
    <Vox kind="stoneBrick" tint="#c8bda8" position={[3.4, REST.h / 2, REST.d]} size={[5.2, REST.h, 0.2]} />
    <Vox kind="planks" tint="#c9a06a" position={[0, 2.9, REST.d]} size={[1.7, 0.2, 0.24]} />

    {/* THE HOT LINE along the north wall: six burners, all of them on. */}
    <Vox kind="stoneBrick" tint="#4a4a52" position={[0, 0.45, -3.6]} size={[11.0, 0.9, 0.9]} />
    <Vox kind="obsidian" position={[0, 0.93, -3.6]} size={[11.0, 0.08, 0.86]} />
    {[-4.2, -2.6, -1.0, 0.6, 2.2, 3.8].map((x, i) => (
      <group key={i}>
        <Vox kind="magma" position={[x, 0.99, -3.6]} size={[0.56, 0.05, 0.56]} />
        <pointLight position={[x, 1.35, -3.3]} color="#ff8f30" intensity={i % 2 ? 6 : 4} distance={3.4} decay={2} />
      </group>
    ))}
    {/* pans and pots on the line */}
    {[-2.6, 0.6, 3.8].map((x, i) => (
      <Vox key={i} kind="wool" tint="#3a3a42" position={[x, 1.16, -3.6]} size={[0.46, 0.26, 0.46]} />
    ))}

    {/* THE PASS: a stainless shelf between the kitchen and the room, with plates on it. */}
    <Vox kind="stone" tint="#cfd6da" position={[0, 1.1, 3.2]} size={[5.0, 0.1, 0.9]} />
    {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
      <Vox key={i} kind="wool" tint="#f7f4ea" position={[x, 1.17, 3.2]} size={[0.34, 0.04, 0.34]} />
    ))}

    {/* shelves of plate stacks and a knife rail — the shape of a real kitchen */}
    <Vox kind="stone" position={[4.4, 1.9, -3.9]} size={[2.6, 0.08, 0.4]} />
    {[-1.0, -0.3, 0.4, 1.1].map((dx, i) => (
      <Vox key={i} kind="wool" tint="#e8e2d2" position={[4.4 + dx, 2.06, -3.9]} size={[0.4, 0.24, 0.3]} />
    ))}

    <pointLight position={[0, 3.0, -1.0]} color="#ffd9a8" intensity={34} distance={12} decay={1.7} />
    <pointLight position={[0, 2.9, 2.6]} color="#fff0d0" intensity={18} distance={8} decay={2} />
    <GodRay position={[0, 3.3, -3.0]} rotation={[0, 0, 0]} width={6} height={5} color="#ffb070" opacity={0.1} />
    <Glow position={[0, 1.4, -3.4]} size={2.2} color="#ff8f30" opacity={0.24} />
    <Dust position={[0, 2.0, -1]} area={[11, 2.6, 7]} count={36} size={0.035} color="#ffe4b0" opacity={0.4} seed={33} speed={0.14} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="home">
        <HomeKitchen night={night} />
      </Zone>
      <Zone name="room">
        <Bedroom />
      </Zone>
      <Zone name="restaurant">
        <Restaurant />
      </Zone>
    </>
  );
};

/** HIS BEDROOM. 5 x 5, one window, no south wall: the lens lives in the gap. */
const Bedroom: React.FC = () => (
  <group position={PLACE.room}>
    <Vox kind="planks" tint="#a8834f" position={[0, -0.05, 0]} size={[10, 0.1, 10]} />
    <Vox kind="stone" position={[0, 2.9, 0]} size={[10, 0.12, 10]} />
    <Vox kind="wool" tint="#9fb4c8" position={[0, 1.45, -5]} size={[10, 2.9, 0.2]} />
    <Vox kind="wool" tint="#a8bccd" position={[-5, 1.45, 0]} size={[0.2, 2.9, 10]} />
    <Vox kind="wool" tint="#a8bccd" position={[5, 1.45, 0]} size={[0.2, 2.9, 10]} />
    {/* bed */}
    <Vox kind="planks" tint="#8a6a44" position={[-1.6, 0.28, -3.4]} size={[2.0, 0.56, 3.0]} />
    <Vox kind="wool" tint="#c8402f" position={[-1.6, 0.62, -3.4]} size={[1.9, 0.12, 2.9]} />
    <Vox kind="wool" tint="#f2ecd8" position={[-1.6, 0.7, -4.6]} size={[1.4, 0.14, 0.7]} />
    {/* window */}
    <Vox kind="wool" tint="#cfe6ff" position={[3.4, 1.8, -4.9]} size={[2.0, 1.4, 0.04]} />
    <Vox kind="darkPlanks" position={[3.4, 1.8, -4.94]} size={[2.3, 1.6, 0.06]} />
    {/* a poster of a chef, hand-drawn, crooked */}
    <Vox kind="wool" tint="#ffe8a8" position={[2.0, 2.0, -4.9]} size={[1.1, 1.4, 0.03]} />
    <Vox kind="wool" tint="#e8a21c" position={[2.0, 2.1, -4.88]} size={[0.5, 0.6, 0.02]} />
    <pointLight position={[2.0, 2.5, -3.6]} color="#ffd9a8" intensity={12} distance={7} decay={2} />
    <Glow position={[2.6, 1.9, -4.6]} size={1.2} color="#ffe8c0" opacity={0.16} />
    <Dust position={[0, 1.4, -1.6]} area={[7, 2.2, 6]} count={20} size={0.028} color="#ffe9c8" opacity={0.3} seed={17} speed={0.08} />
  </group>
);
