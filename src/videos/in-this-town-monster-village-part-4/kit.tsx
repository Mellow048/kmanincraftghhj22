import type React from "react";
import { Block, PixelText, Vox } from "../../engine";
import type { Timing, Vec3 } from "../../engine";
import { ROBE, Villager, wordClock } from "../../../Topics/InThisTown";
import { AimSword, Fallen } from "../in-this-town-monster-village-part-3/kit";
import timingJson from "./timing.json";

/**
 * PART FOUR'S KIT. Everything parts one to three had (the family, Mo, the players, the cage, dad) is passed on from
 * part three's kit; what is new here is the castle at NIGHT with a hole in its wall, a ravager, a vex, TNT, a
 * spyglass, a bush, and a skinny hallway. A scene imports only from "./kit".
 */
export * from "../in-this-town-monster-village-part-3/kit";
export { Bubble, IronGolem, Pillager, Puffs, ROBE, Smoke, SubscribeSign, Villager } from "../../../Topics/InThisTown";
export { PixelText } from "../../engine";
/** The siege pieces (ravager, vex, witch, the army, TNT, the tower, the spyglass …) live in the topic's pack now. */
export {
  Axe, Boom, Bush, HandBanner, HandTorch, Horde, Key, LitWindow, Ravager, SpyMask, Spyglass, TNT, Vex, WatchTower, Web, Witch, spyLook, spyglassAt, spyglassPose,
} from "../../../Topics/InThisTown";

export const timing = timingJson as unknown as Timing;
/** Seconds into its shot at which a word is said. */
export const wordAt = wordClock(timing);
export const dur = (cue: string): number => {
  const c = timing.cues.find((x) => x.id === cue);
  if (!c) throw new Error(`no cue ${cue}`);
  return c.end - c.start;
};

export const NIGHT4 = "overworld-night";
export const Z = { fort: "fort", room: "room", out: "out", horde: "horde", hall: "hallway" };

// ----------------------------------------------------------------------------- places
/** The castle yard at night. North wall at z = -14, the gate tower in the middle of it, the HOLE in the east wall. */
export const FORT: Vec3 = [0, 0, 600];
export const f = (x: number, y: number, z: number): Vec3 => [FORT[0] + x, FORT[1] + y, FORT[2] + z];
/** The guard's room. */
export const ROOM4: Vec3 = [60, 0, 600];
export const r = (x: number, y: number, z: number): Vec3 => [ROOM4[0] + x, ROOM4[1] + y, ROOM4[2] + z];
/** Outside the castle wall: a door, a path, a bush. */
export const OUT: Vec3 = [120, 0, 600];
export const o = (x: number, y: number, z: number): Vec3 => [OUT[0] + x, OUT[1] + y, OUT[2] + z];
/** The edge of the forest, as the spyglass sees it. */
export const HORDE: Vec3 = [200, 0, 600];
export const hd = (x: number, y: number, z: number): Vec3 => [HORDE[0] + x, HORDE[1] + y, HORDE[2] + z];
/** The skinny hallway. It runs north (-z) from its door at z = 0. NOT SEEN BEFORE 10.hall. */
export const HALL4: Vec3 = [280, 0, 600];
export const hw = (x: number, y: number, z: number): Vec3 => [HALL4[0] + x, HALL4[1] + y, HALL4[2] + z];
export const HALL_W = 1.7;
export const HALL_LEN = 24;

export const CAGES = [-5, -2.5, 0, 2.5, 5];
export const MYCAGE: Vec3 = f(-5, 0, 0);
export const MOCAGE: Vec3 = f(5, 0, 0);
/** Where the teller is inside his cage. */
export const ME: Vec3 = f(-5, 0.08, 0.3);
/** Where the teacher stands at the cage door. */
export const TEACH: Vec3 = f(-5, 0, 2.0);
/** The hole the TNT makes: 5 wide, in the east wall. */
export const HOLE: Vec3 = f(17.5, 0, -1.5);
/** In front of the big gate in the north wall: where the golem comes out. */
export const GATE: Vec3 = f(0, 0, -11.2);
/** The floor on top of the lookout tower. */
export const LOOK: Vec3 = f(-9, 10.12, -14.2);
/** The door of the keep (west side of the yard). What is behind it is the hallway. */
export const KEEPDOOR: Vec3 = f(-11.9, 0, 6);
/** Where the bus lands. */
export const BUSSPOT: Vec3 = f(-1.8, 0, 3.4);
/** The house the golem and the ravager go through. */
export const HOUSE: Vec3 = f(9.5, 0, -6.5);
/** Where the two meet. */
export const CLASH: Vec3 = f(6, 0, -2.5);
export const BUSH: Vec3 = o(3.2, 0, 3.4);
export const OUTDOOR: Vec3 = o(0, 0, -0.2);

// ----------------------------------------------------------------------------- people
/** A villager guard: a sword in his belt (his hands do not come out of his sleeves), or a torch stuck in it. */
export const VGuard: React.FC<{ position: Vec3; rotationY?: number; n?: number; lookAt?: Vec3; walk?: number; sword?: boolean; lean?: number; nod?: number }> = ({
  position, rotationY = 0, n = 0, lookAt, walk, sword = true, lean, nod,
}) => (
  <>
    <Villager position={position} rotationY={rotationY} robe={[ROBE.brown, ROBE.smith, ROBE.farmer, ROBE.white][n % 4]} lookAt={lookAt} walk={walk} phase={n} lean={lean} nod={nod} />
    {sword ? <AimSword position={[position[0] + Math.cos(rotationY) * 0.42, position[1] + 1.0, position[2] - Math.sin(rotationY) * 0.42]} yaw={rotationY} pitch={-1.45} scale={0.9} /> : null}
  </>
);
/** Somebody flat on his back, feet at `position`, head pointing along `rotationY` + 180°. */
export const Flat: React.FC<{ position: Vec3; rotationY?: number; k?: number; children: React.ReactNode }> = ({ position, rotationY = 0, k = 1, children }) => (
  <Fallen position={position} rotationY={rotationY} k={k}>
    {children}
  </Fallen>
);

// ----------------------------------------------------------------------------- the cage with a door
const IRON = "#3a3d44";
/** A cage like part three's. `front` false leaves the front (+z) bars out: the door is drawn by the shot. */
export const CageBody: React.FC<{ position: Vec3; front?: boolean }> = ({ position, front = true }) => {
  const w = 1.1;
  const bars: Array<[number, number]> = [];
  for (let i = 0; i <= 6; i++) {
    const a = -w + (i * 2 * w) / 6;
    bars.push([a, -w]);
    if (front || i === 0 || i === 6) bars.push([a, w]);
    if (i > 0 && i < 6) bars.push([-w, a], [w, a]);
  }
  return (
    <group position={position}>
      <Block position={[0, 0.04, 0]} size={[2.3, 0.08, 2.3]} color="#6b4a2a" castShadow={false} />
      <Block position={[0, 2.42, 0]} size={[2.4, 0.12, 2.4]} color="#4a3320" />
      {bars.map(([x, z], i) => (
        <Block key={i} position={[x, 1.22, z]} size={[0.07, 2.3, 0.07]} color={IRON} metalness={0.4} roughness={0.5} />
      ))}
      <Block position={[0, 1.25, -w]} size={[2.2, 0.06, 0.05]} color={IRON} castShadow={false} />
      {front ? <Block position={[0, 1.25, w]} size={[2.2, 0.06, 0.05]} color={IRON} castShadow={false} /> : null}
      {[-w, w].map((x) => (
        <Block key={x} position={[x, 1.25, 0]} size={[0.05, 0.06, 2.2]} color={IRON} castShadow={false} />
      ))}
    </group>
  );
};
/** The front of the teller's cage: a door of bars, hinged on its west post. `k` 0 is shut, 1 is wide open. */
export const CageDoor: React.FC<{ k?: number }> = ({ k = 0 }) => (
  <group position={[MYCAGE[0] - 1.1, 0, MYCAGE[2] + 1.1]} rotation={[0, -1.9 * k, 0]}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Block key={i} position={[(i * 2.2) / 6, 1.22, 0]} size={[0.07, 2.3, 0.07]} color={IRON} metalness={0.4} roughness={0.5} />
    ))}
    <Block position={[1.1, 1.25, 0]} size={[2.1, 0.06, 0.05]} color={IRON} castShadow={false} />
    <Block position={[1.95, 1.05, 0.05]} size={[0.16, 0.2, 0.08]} color="#22242a" />
  </group>
);
/** Where the lock is. */
export const LOCK: Vec3 = [MYCAGE[0] + 0.85, 1.05, MYCAGE[2] + 1.2];

/** The piece of the east wall that the TNT takes out. Draw it in every shot before 5.boom that can see the wall. */
export const WallPlug: React.FC = () => <Vox kind="stoneBrick" position={[HOLE[0], 3, HOLE[2]]} size={[1.6, 6, 5.1]} />;

/** A sheep small enough to jump over a bed in somebody's head. */
export const Sheep: React.FC<{ position: Vec3; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.3, 0]} size={[0.5, 0.36, 0.34]} color="#f4f1ea" emissive="#f4f1ea" emissiveIntensity={0.5} castShadow={false} />
    <Block position={[0.3, 0.38, 0]} size={[0.2, 0.2, 0.22]} color="#3a3330" castShadow={false} />
    {[-0.16, 0.16].map((x) => (
      <Block key={x} position={[x, 0.07, 0]} size={[0.08, 0.14, 0.2]} color="#3a3330" castShadow={false} />
    ))}
  </group>
);
/** Every window in the castle that can light up: [x, y, z, yaw] in the fort's own numbers. */
export const WINDOWS: Array<[number, number, number, number]> = [
  [-17.5, 6.2, -11.78, 0], [17.5, 6.2, -11.78, 0], [0, 7.1, -11.68, 0], [-9, 6.2, -11.98, 0],
  [-11.97, 6.4, 3.6, Math.PI / 2], [-11.97, 6.4, 8.4, Math.PI / 2], [-11.97, 3.2, 8.6, Math.PI / 2],
  [-17.5, 5.6, 14.22, 0], [17.5, 5.6, 14.22, 0], [9.5, 1.9, -3.22, 0], [-9.5, 1.9, -2.97, 0], [5, 3.4, -13.18, 0], [-4.6, 3.4, -13.18, 0],
];
/** Words at the top of the frame. It faces `yaw` (radians): give it the camera's yaw. */
export const TopCard: React.FC<{ text: string; position: Vec3; yaw?: number; height?: number; width?: number }> = ({ text, position, yaw = 0, height = 0.5, width = 3.2 }) => (
  <PixelText text={text} position={position} rotationY={yaw} height={height} maxWidth={width} color="#ffffff" />
);
