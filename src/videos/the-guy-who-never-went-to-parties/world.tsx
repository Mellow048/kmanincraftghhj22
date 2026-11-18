import type React from "react";
import { Clouds, Dust, Glow, GodRay, LightPool, Tree, Vox, Zone, useActiveShot } from "../../engine";
import { Bell, Hut, LampPost, Lantern, LanternLine, LanternPost, Stall, Well } from "../../../Topics/InThisTown";
import { Hero, PLACE, Player, ROBE, Villager } from "./kit";

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

    {/* THE TOWN IS AT A PARTY. A crowd in the world, not only in a shot's stage, so a wide shot or a
        shot of a prop still has the premise behind it. The reference films fill the frame this way. */}
    {([
      [-8.5, 1.5, ROBE.red], [-6.2, 3.4, ROBE.blue], [-4.0, -1.6, ROBE.white],
      [-2.6, 4.2, ROBE.farmer], [0.8, 3.8, ROBE.brown], [2.4, -1.8, ROBE.friend],
      [4.6, 2.2, ROBE.red], [6.8, -1.2, ROBE.blue], [9.2, 3.0, ROBE.white],
      [-11.5, -1.8, ROBE.farmer], [11.8, 1.2, ROBE.brown], [1.2, -3.0, ROBE.friend],
    ] as Array<[number, number, string]>).map(([x, z, robe], i) => (
      <Villager key={i} position={[x, 0, z]} robe={robe} phase={i * 0.8} walk={0.18} />
    ))}
    <Player who={2} position={[-5.0, 0, 6.4]} rotationY={0.4} animation="idle" face="grin" />
    <Player who={7} position={[3.4, 0, 7.2]} rotationY={-0.6} animation="idle" face="laugh" />
    <Player who={9} position={[10.4, 0, -1.6]} rotationY={1.0} animation="idle" face="smile" />

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

    {/* THE PARTY. A night street is not lit by one lamp: the approved night film
        (`nobody-looked-at-the-moon`) strings lanterns over every part of the square. Every pool of
        light here is also a place a camera can stand and still see the people in it. */}
    <LanternLine from={[-7.2, 4.7, -2.4]} to={[7.2, 4.7, -2.4]} count={7} sag={0.9} lit={[0, 2, 4, 6]} light={30} seed={7} />
    <LanternLine from={[-7.2, 4.4, 5.8]} to={[7.2, 4.4, 5.8]} count={7} sag={0.8} lit={[1, 3, 5]} light={24} seed={11} />
    <LanternLine from={[-3.0, 4.2, -4.6]} to={[3.0, 4.2, -4.6]} count={3} sag={0.45} lit={[0, 2]} light={22} seed={13} />
    <LanternPost position={[-11.5, 0, -0.6]} light={22} seed={5} />
    <LanternPost position={[11.5, 0, -0.6]} light={22} seed={6} />
    <LanternPost position={[-19, 0, 4.8]} turn={Math.PI} light={18} seed={8} />
    <LanternPost position={[19, 0, 4.8]} turn={Math.PI} light={18} seed={9} />
    <Lantern position={[1.05, 2.74, 9.22]} chain={0.2} light={14} reach={9} seed={21} />
    <Lantern position={[-4.9, 0.9, 5.8]} chain={0.05} light={9} reach={6} seed={31} />
    <Lantern position={[6.4, 2.62, -2.05]} chain={0.2} light={10} reach={6} seed={17} />

    {/* warm pools on the ground: the street reads as a room the whole town is inside of */}
    <pointLight position={[0, 3.4, 1.2]} color="#ffc478" intensity={16} distance={16} decay={1.7} />
    <pointLight position={[-9, 3.0, -1.0]} color="#ffb45c" intensity={11} distance={12} decay={1.8} />
    <pointLight position={[9, 3.0, 1.0]} color="#ffb45c" intensity={11} distance={12} decay={1.8} />

    <GodRay position={[-3, 6.5, -3]} rotation={[0, 0, 0.5]} width={5} height={12} color="#fff0c8" opacity={0.09} />
    <LightPool position={[0, 0.07, 1.5]} width={13} depth={10} color="#ffd798" opacity={0.22} />
    <LightPool position={[-9, 0.07, 0.0]} width={7} depth={7} color="#ffd798" opacity={0.2} />
    <LightPool position={[9, 0.07, 0.0]} width={7} depth={7} color="#ffd798" opacity={0.2} />
    <Glow position={[0, 2.7, -2.5]} size={3.2} color="#ffe08a" opacity={0.3} />
    <Glow position={[0, 2.7, 5.4]} size={2.8} color="#ffc478" opacity={0.24} />
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

/**
 * Shots of a thing and not a person still need the teller in the room: `OWNER.md` rule B says come
 * back to him at least every third shot, and an empty kitchen reads as a lighting fault. These are the
 * cues whose `stage` is only props, so the world supplies him for them and only for them (a shot that
 * already stages him does not get a second one).
 */
const FILL_HOME = new Set([
  "1.chop", "2.mum", "2.fridge", "3.brand", "3.never", "4.cannot", "5.but", "5.flipped",
  "5.ceiling", "6.slow", "6.faster", "6.blade", "6.again", "6.omelette", "6.calendar", "9.fridge",
]);
const FILL_RESTAURANT = new Set(["7.hands", "8.onions"]);

const HomeKitchen: React.FC<{ night?: boolean; fill?: boolean; fridge?: "closed" | "empty" | "full" }> = ({ night, fill, fridge = "closed" }) => (
  <group position={PLACE.home2}>
    {/* AN OPEN SET. A zone is exclusive, so the village is not drawn while this is. Sealing the room
        on all four sides only ever put the lens inside plaster (and its ceiling blocked every top
        shot). North wall and two short side returns give the kitchen its shape; the front is open. */}
    <Vox kind="planks" tint="#a07d50" position={[0, -0.05, 0]} size={[18, 0.1, 16]} />
    <Vox kind="wool" tint="#c2a882" position={[0, HOME.h / 2, -HOME.d]} size={[HOME.w * 2, HOME.h, 0.2]} />
    <Vox kind="wool" tint="#b49a76" position={[-HOME.w, HOME.h / 2, -1.4]} size={[0.2, HOME.h, 3.2]} />
    <Vox kind="wool" tint="#b49a76" position={[HOME.w, HOME.h / 2, -1.4]} size={[0.2, HOME.h, 3.2]} />
    {/* a low beam in front, so a wide shot still reads as being inside a room */}
    <Vox kind="darkPlanks" position={[0, 2.86, 2.9]} size={[7.0, 0.16, 0.16]} />

    {/* THE COUNTER, along the north wall. Top at y 0.92. */}
    <Vox kind="planks" position={[0, 0.45, -2.55]} size={[6.0, 0.9, 0.8]} />
    <Vox kind="stoneBrick" tint="#a89c84" position={[0, 0.93, -2.55]} size={[6.1, 0.06, 0.9]} />

    {/* THE STOVE, west end of the counter, with a pot on it. */}
    <Vox kind="obsidian" position={[-2.1, 1.0, -2.55]} size={[0.9, 0.1, 0.8]} />
    <Vox kind="magma" position={[-2.1, 1.06, -2.55]} size={[0.5, 0.04, 0.5]} />
    <Vox kind="stone" position={[-2.1, 1.16, -2.55]} size={[0.5, 0.2, 0.5]} />
    <pointLight position={[-2.1, 1.5, -2.3]} color="#ff9a3c" intensity={3} distance={4} decay={2} />

    {/* a window over the sink, boarded outside — it is night in most of this film */}
    <Vox kind="wool" tint="#bfe2ff" position={[1.4, 1.7, -HOME.d + 0.06]} size={[1.6, 1.0, 0.02]} />
    <Vox kind="darkPlanks" position={[1.4, 1.7, -HOME.d - 0.02]} size={[1.9, 1.3, 0.08]} />

    {/* THE FRIDGE. One prop, three states, owned by the world: a shot must never draw a second solid
        fridge over it (the first render did, and the punchline was a white wall). The open states are
        a real box with an inside, so the food on the shelves can be seen from the camera's side. */}
    {fridge === "closed" ? (
      <>
        <Vox kind="wool" tint="#8b979e" position={[2.75, 0.9, -2.5]} size={[1.0, 1.8, 0.7]} />
        <Vox kind="wool" tint="#c9d2d8" position={[2.75, 0.9, -2.14]} size={[0.92, 1.7, 0.03]} />
        <Vox kind="stone" position={[2.75, 1.25, -2.12]} size={[0.06, 0.1, 0.04]} />
      </>
    ) : (
      <>
        <Vox kind="wool" tint="#7d8c96" position={[2.75, 0.9, -2.55]} size={[1.02, 1.8, 0.06]} />
        <Vox kind="wool" tint="#b6c1c8" position={[2.23, 0.9, -2.2]} size={[0.06, 1.8, 0.7]} />
        <Vox kind="wool" tint="#b6c1c8" position={[3.27, 0.9, -2.2]} size={[0.06, 1.8, 0.7]} />
        <Vox kind="wool" tint="#b6c1c8" position={[2.75, 1.79, -2.2]} size={[1.02, 0.06, 0.7]} />
        <Vox kind="wool" tint="#b6c1c8" position={[2.75, 0.03, -2.2]} size={[1.02, 0.06, 0.7]} />
        {/* the door, swung open to the left: a wing at the edge of the frame, never a wall in front */}
        <Vox kind="wool" tint="#c9d2d8" position={[2.08, 0.9, -1.78]} size={[0.06, 1.72, 0.62]} />
        <pointLight position={[2.75, 1.25, -1.95]} color="#dff0ff" intensity={6} distance={3.4} decay={2} />
        {fridge === "empty" ? (
          <>
            <Vox kind="wool" tint="#a9b5bc" position={[2.75, 0.88, -2.12]} size={[0.86, 0.04, 0.42]} />
            {/* the whole joke: the fridge contains exactly one thing, and that thing is a fridge */}
            <Vox kind="wool" tint="#e2e9ed" position={[2.75, 1.12, -2.05]} size={[0.34, 0.42, 0.26]} />
            <Vox kind="stone" position={[2.62, 1.2, -1.91]} size={[0.04, 0.1, 0.03]} />
          </>
        ) : (
          <>
            {[0.32, 0.72, 1.12, 1.52].map((y, row) => (
              <group key={y}>
                <Vox kind="wool" tint="#a9b5bc" position={[2.75, y, -2.12]} size={[0.86, 0.04, 0.42]} />
                {[2.47, 2.68, 2.89, 3.10].map((x, i) => (
                  <Vox
                    key={x}
                    kind="wool"
                    tint={["#c8402f", "#7ac04f", "#e8a21c", "#e8853c", "#f7f4ea", "#3f8a4f"][(i + row * 2) % 6]}
                    position={[x, y + 0.14, -2.02]}
                    size={[0.15, 0.22, 0.2]}
                  />
                ))}
              </group>
            ))}
          </>
        )}
      </>
    )}

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
    {fill && (
      <Hero position={[0.15, 0, 0.95]} rotationY={0.12} animation="idle" face="calm" />
    )}
    {/* a fill from the open front: a lens that looks north into the kitchen is looking INTO the key,
        and without this the faces on that side of the room go to silhouette */}
    <pointLight position={[0.4, 2.3, 2.7]} color="#ffe6bd" intensity={9} distance={12} decay={1.8} />
    <pointLight position={[0, 2.55, 0.5]} color="#ffe8c0" intensity={night ? 7 : 8} distance={9} decay={1.7} />
    <pointLight position={[0.6, 2.4, -2.2]} color="#fff0d0" intensity={4} distance={6} decay={2} />
    <Glow position={[0, 2.3, 0.4]} size={1.5} color="#ffe8c0" opacity={0.2} />
    <Dust position={[0, 1.5, 0.4]} area={[6, 2.4, 5]} count={28} size={0.03} color="#fff2d8" opacity={0.35} seed={21} speed={0.09} />
  </group>
);

/**
 * THE RESTAURANT. A vending machine on the street, and behind it: a professional kitchen.
 * 12 x 9 m, with a service window and a hot line. The third act.
 */
const REST = { w: 6.0, d: 4.5, h: 3.4 };

const Restaurant: React.FC<{ fill?: boolean }> = ({ fill }) => (
  <group position={PLACE.restaurant}>
    <Vox kind="stoneBrick" position={[0, -0.05, 0]} size={[24, 0.1, 20]} />
    <Vox kind="stoneBrick" tint="#c8bda8" position={[0, REST.h / 2, -REST.d]} size={[REST.w * 2, REST.h, 0.2]} />
    <Vox kind="stoneBrick" tint="#c8bda8" position={[-REST.w, REST.h / 2, -2.2]} size={[0.2, REST.h, 4.6]} />
    <Vox kind="stoneBrick" tint="#c8bda8" position={[REST.w, REST.h / 2, -2.2]} size={[0.2, REST.h, 4.6]} />
    {/* the pass beam: the front is open, so a lens can stand in the dining room and see the line */}
    <Vox kind="planks" tint="#c9a06a" position={[0, 3.1, REST.d]} size={[5.0, 0.2, 0.24]} />
    <Vox kind="stoneBrick" tint="#c8bda8" position={[-4.7, 1.0, REST.d]} size={[2.4, 2.0, 0.2]} />
    <Vox kind="stoneBrick" tint="#c8bda8" position={[4.7, 1.0, REST.d]} size={[2.4, 2.0, 0.2]} />

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

    {fill && (
      <Hero position={[-1.2, 0, -0.8]} rotationY={0.2} animation="idle" face="calm" />
    )}
    <pointLight position={[0, 3.0, -1.0]} color="#ffd9a8" intensity={17} distance={12} decay={1.7} />
    <pointLight position={[0, 2.9, 2.6]} color="#fff0d0" intensity={9} distance={8} decay={2} />
    <GodRay position={[0, 3.3, -3.0]} rotation={[0, 0, 0]} width={6} height={5} color="#ffb070" opacity={0.1} />
    <Glow position={[0, 1.4, -3.4]} size={2.2} color="#ff8f30" opacity={0.24} />
    <Dust position={[0, 2.0, -1]} area={[11, 2.6, 7]} count={36} size={0.035} color="#ffe4b0" opacity={0.4} seed={33} speed={0.14} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const cue = active?.shot.cue ?? "";
  const night = (active?.shot.look ?? "overworld-day") === "overworld-night";
  return (
    <>
      <Zone name="village">
        <Village />
      </Zone>
      <Zone name="home">
        <HomeKitchen
          night={night}
          fill={FILL_HOME.has(cue)}
          fridge={cue === "9.fridge" ? "full" : cue === "2.fridge" ? "empty" : "closed"}
        />
      </Zone>
      <Zone name="room">
        <Bedroom />
      </Zone>
      <Zone name="restaurant">
        <Restaurant fill={FILL_RESTAURANT.has(cue)} />
      </Zone>
    </>
  );
};

/** HIS BEDROOM. 5 x 5, one window, no south wall: the lens lives in the gap. */
const Bedroom: React.FC = () => (
  <group position={PLACE.room}>
    <Vox kind="planks" tint="#a8834f" position={[0, -0.05, 0]} size={[20, 0.1, 20]} />
    <Vox kind="wool" tint="#9fb4c8" position={[0, 1.45, -5]} size={[10, 2.9, 0.2]} />
    <Vox kind="wool" tint="#a8bccd" position={[-5, 1.45, -2.6]} size={[0.2, 2.9, 4.8]} />
    <Vox kind="wool" tint="#a8bccd" position={[5, 1.45, -2.6]} size={[0.2, 2.9, 4.8]} />
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
