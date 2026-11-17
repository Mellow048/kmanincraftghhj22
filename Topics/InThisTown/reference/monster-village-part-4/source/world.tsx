import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone } from "../../engine";
import { Hut, LanternPost, Moon, Stars, WatchTower } from "../../../Topics/InThisTown";
import { CAGES, CageBody, FORT, HALL4, HALL_LEN, HALL_W, HORDE, OUT, ROOM4 } from "./kit";

/**
 * PART FOUR'S WORLD. All of it is night.
 *
 *   fort     The castle village of part three, seen again at night: wall and towers on three sides (no south wall:
 *            the camera lives there), the row of cages, the big gate in the north wall, a lookout tower, the keep on
 *            the west side with its door, and A GAP IN THE EAST WALL, 5 wide. Before the TNT a shot fills the gap
 *            with `WallPlug`. The teller's cage has no front bars here: a shot draws its door (`CageDoor`).
 *   room     The guard's room: a bed, a window, a torch. No south wall.
 *   out      Outside the castle wall: a door in it, a path, a bush, the forest.
 *   horde    The edge of the forest, a long way off, for the spyglass.
 *   hallway  The skinny hallway inside the keep. It runs north from z = 0 to z = -24. NOT SEEN BEFORE 10.hall.
 *
 * 1 unit = 1 block = 1 metre. Ground is y = 0.
 */

const rnd = (i: number): number => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** A length of castle wall with teeth on top. `along` "x" runs east–west. */
const Wall: React.FC<{ at: [number, number]; length: number; along: "x" | "z"; height?: number }> = ({ at, length, along, height = 6 }) => {
  const n = Math.floor(length / 2);
  return (
    <group position={[at[0], 0, at[1]]} rotation={[0, along === "z" ? Math.PI / 2 : 0, 0]}>
      <Vox kind="stoneBrick" position={[0, height / 2, 0]} size={[length, height, 1.6]} />
      <Block position={[0, height + 0.05, 0]} size={[length, 0.1, 2.0]} color="#77777a" castShadow={false} />
      {Array.from({ length: n }, (_, i) => (
        <Vox key={i} kind="stoneBrick" position={[-length / 2 + 1 + i * 2, height + 0.5, 0.6]} size={[1, 0.9, 0.5]} />
      ))}
    </group>
  );
};
/** A tower: square, taller than the wall, teeth round the top. */
const Tower: React.FC<{ at: [number, number]; height?: number; size?: number; gate?: boolean }> = ({ at, height = 10, size = 4.4, gate = false }) => (
  <group position={[at[0], 0, at[1]]}>
    <Vox kind="stoneBrick" position={[0, height / 2, 0]} size={[size, height, size]} />
    <Block position={[0, height + 0.06, 0]} size={[size + 0.6, 0.12, size + 0.6]} color="#77777a" />
    {[-1, 1].map((sx) => [-1, 1].map((sz) => <Vox key={`${sx}${sz}`} kind="stoneBrick" position={[sx * (size / 2 + 0.05), height + 0.55, sz * (size / 2 + 0.05)]} size={[1, 1, 1]} />))}
    {gate ? (
      <>
        <Block position={[0, 1.9, size / 2 + 0.02]} size={[3.4, 3.8, 0.06]} color="#0c0a08" castShadow={false} />
        <Block position={[0, 3.9, size / 2 + 0.05]} size={[3.8, 0.3, 0.12]} color="#5c3f24" castShadow={false} />
        {[-1.85, 1.85].map((x) => (
          <Block key={x} position={[x, 1.9, size / 2 + 0.05]} size={[0.3, 3.8, 0.12]} color="#5c3f24" castShadow={false} />
        ))}
      </>
    ) : null}
    <Block position={[0, height + 2.1, 0]} size={[0.1, 3, 0.1]} color="#5c3f24" />
    <Block position={[0.55, height + 3.1, 0]} size={[1, 0.7, 0.05]} color="#b0302a" castShadow={false} />
  </group>
);
/** Forest and dark country all round a place, so no shot sees the end of the world. `clear` keeps a box empty. */
const Country: React.FC<{ inner?: number; clear?: (x: number, z: number) => boolean; count?: number }> = ({ inner = 27, clear, count = 130 }) => {
  const trees: Array<[number, number, number]> = [];
  for (let i = 0; i < count; i++) {
    const a = rnd(i) * Math.PI * 2;
    const rr = inner + rnd(i + 500) * 60;
    const x = Math.cos(a) * rr * 1.1;
    const z = Math.sin(a) * rr;
    if (clear && clear(x, z)) continue;
    trees.push([x, z, 4 + rnd(i + 900) * 3.5]);
  }
  return (
    <>
      <Block position={[0, -0.32, 0]} size={[500, 0.5, 500]} color="#3f6f34" castShadow={false} />
      {trees.map(([x, z, height], i) => (
        <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 3 === 0 ? "#2f5f2a" : i % 3 === 1 ? "#356b2f" : "#284f24"} />
      ))}
      <Stars center={[0, 0, 0]} radius={170} count={260} seed={21} />
      <Moon position={[-50, 62, -110]} radius={7} rotation={[0.3, 0.3, 0]} glow={0.5} />
    </>
  );
};

const Fort: React.FC = () => (
  <group position={FORT}>
    <Vox kind="grass" position={[0, -0.25, -1]} size={[64, 0.5, 56]} />
    <Country clear={(x, z) => (Math.abs(x) < 16 && z > 6) || (x > 17 && Math.abs(z + 1.5) < 6)} />
    <Vox kind="path" position={[0, 0.02, -5.2]} size={[3.2, 0.06, 13.5]} />
    <Vox kind="path" position={[0, 0.021, 1.6]} size={[30, 0.06, 5.4]} />
    <Vox kind="path" position={[24, 0.02, -1.5]} size={[14, 0.06, 4]} />
    {/* The north wall, in two pieces: the lookout tower stands in the gap, so its rooms are not full of wall. */}
    <Wall at={[-14.55, -14]} length={6.9} along="x" />
    <Wall at={[5.55, -14]} length={24.9} along="x" />
    <Wall at={[-17.5, -1]} length={26} along="z" />
    {/* The east wall, in two pieces: the gap between them (z -4 … 1) is the hole. */}
    <Wall at={[17.5, -9]} length={10} along="z" />
    <Wall at={[17.5, 6.5]} length={11} along="z" />
    <Tower at={[-17.5, -14]} />
    <Tower at={[17.5, -14]} />
    <Tower at={[0, -14.4]} height={11.5} size={5.4} gate />
    <WatchTower position={[-9, 0, -14.2]} height={10} size={4.2} />
    <Tower at={[-17.5, 12]} height={9} />
    <Tower at={[17.5, 12]} height={9} />
    <Hut at={[-9.5, 0, -6]} w={6} h={3.6} tint="#caa268" roof="#8a3b2a" windows={[-1.7]} door={1.2} />
    <Hut at={[9.5, 0, -6.5]} w={6.5} wall="cobble" roof="#3f6b3a" windows={[1.8]} door={-1.2} />
    <Hut at={[12, 0, 4.5]} w={5} d={5} h={3.4} wall="cobble" roof="#4a2f2f" door={0} turn={-Math.PI / 2} />
    {/* The keep: the castle itself, against the west wall. Its door faces east into the yard. */}
    <Vox kind="stoneBrick" position={[-14.5, 4.5, 6]} size={[5, 9, 9]} />
    <Block position={[-14.5, 9.06, 6]} size={[5.6, 0.12, 9.6]} color="#77777a" />
    {[2, 4, 6, 8, 10].map((z) => (
      <Vox key={z} kind="stoneBrick" position={[-12.2, 9.55, z]} size={[0.5, 0.9, 1]} />
    ))}
    <Block position={[-11.98, 1.4, 6]} size={[0.06, 2.8, 1.9]} color="#050505" castShadow={false} />
    <Block position={[-11.95, 2.95, 6]} size={[0.12, 0.3, 2.5]} color="#5c3f24" castShadow={false} />
    {[4.9, 7.1].map((z) => (
      <Block key={z} position={[-11.95, 1.4, z]} size={[0.12, 2.8, 0.3]} color="#5c3f24" castShadow={false} />
    ))}
    <Torch position={[-11.85, 2.3, 4.3]} light={10} seed={3} />
    <Torch position={[-11.85, 2.3, 7.7]} light={10} seed={4} />
    {CAGES.map((x, i) => (
      <CageBody key={x} position={[x, 0, 0]} front={i !== 0} />
    ))}
    <Vox kind="hay" position={[CAGES[0] - 0.55, 0.2, -0.6]} size={[0.9, 0.3, 0.8]} />
    <Vox kind="hay" position={[CAGES[4] + 0.5, 0.2, -0.6]} size={[0.9, 0.3, 0.8]} />
    <Vox kind="planks" position={[7.6, 0.4, 2.0]} size={[0.8, 0.8, 0.8]} />
    <Vox kind="planks" position={[8.3, 0.3, 2.7]} size={[0.6, 0.6, 0.6]} />
    <Vox kind="hay" position={[-7.6, 0.45, -2.6]} size={[1.2, 0.9, 0.9]} />
    <LanternPost position={[-7.6, 0, 2.6]} light={16} seed={1} />
    <LanternPost position={[7.2, 0, 3.2]} light={16} seed={2} turn={Math.PI} />
    <LanternPost position={[-2.6, 0, -9.4]} light={14} seed={5} />
    <LanternPost position={[2.6, 0, -9.4]} light={14} seed={6} />
    <Torch position={[16.6, 2.6, -6]} light={8} seed={7} />
    <Torch position={[16.6, 2.6, 3]} light={8} seed={8} />
    {/* Moonlight: cold, from above, enough to read a face by. */}
    {[[-9, -4], [9, -4], [0, 3], [-10, 6], [12, 5], [0, -10], [22, -1.5]].map(([x, z]) => (
      <pointLight key={`${x}${z}`} position={[x, 9, z]} color="#a9b8ff" intensity={95} distance={26} decay={2} />
    ))}
    <pointLight position={[-9, 15, -11]} color="#a9b8ff" intensity={90} distance={22} decay={2} />
    <LightPool position={[0, 0.08, 1.6]} width={18} depth={6} color="#9fb0ff" opacity={0.1} />
    <GodRay position={[-6, 7, 1]} rotation={[0, 0, 0.5]} width={6} height={14} color="#b9c8ff" opacity={0.05} />
    <Glow position={[-7.6, 2.5, 3.1]} size={2.4} color="#ffc878" opacity={0.22} />
    <Glow position={[7.2, 2.5, 2.7]} size={2.4} color="#ffc878" opacity={0.22} />
    <Dust position={[0, 2.2, 0]} area={[30, 4, 14]} count={40} size={0.04} color="#cfd8ff" opacity={0.4} seed={9} speed={0.15} />
  </group>
);

const GuardRoom: React.FC = () => (
  <group position={ROOM4}>
    <Vox kind="planks" position={[0, -0.1, 0]} size={[5.4, 0.2, 5.4]} />
    <Vox kind="stoneBrick" position={[0, 1.8, -2.6]} size={[5.4, 3.8, 0.4]} />
    <Vox kind="stoneBrick" position={[-2.6, 1.8, 0]} size={[0.4, 3.8, 5.4]} />
    <Vox kind="stoneBrick" position={[2.6, 1.8, 0]} size={[0.4, 3.8, 5.4]} />
    <Vox kind="planks" position={[0, 3.8, 0]} size={[5.6, 0.2, 5.6]} />
    {/* the bed, head to the north wall */}
    <Vox kind="planks" position={[-1.2, 0.2, -1.3]} size={[1.2, 0.4, 2.3]} />
    <Block position={[-1.2, 0.47, -1.0]} size={[1.16, 0.14, 1.6]} color="#9a3f34" />
    <Block position={[-1.2, 0.5, -2.1]} size={[0.9, 0.16, 0.5]} color="#f1efe6" />
    {/* a window with the night in it */}
    <Block position={[1.0, 2.1, -2.38]} size={[1.2, 1.2, 0.05]} color="#0e1630" emissive="#1c2c66" emissiveIntensity={0.8} castShadow={false} />
    <Block position={[1.0, 2.1, -2.36]} size={[0.08, 1.2, 0.06]} color="#5c3f24" castShadow={false} />
    <Block position={[1.0, 2.1, -2.36]} size={[1.2, 0.08, 0.06]} color="#5c3f24" castShadow={false} />
    {[[0.65, 2.45], [1.3, 2.3], [0.8, 1.8], [1.35, 1.75]].map(([x, y]) => (
      <Block key={`${x}${y}`} position={[x, y, -2.35]} size={[0.05, 0.05, 0.02]} color="#000000" emissive="#ffffff" emissiveIntensity={2} castShadow={false} />
    ))}
    {/* the door, in the east wall; a chest; a sword rack */}
    <Block position={[2.38, 1.3, 0.9]} size={[0.06, 2.6, 1.3]} color="#6b4a2a" castShadow={false} />
    <Block position={[2.34, 1.3, 0.4]} size={[0.06, 0.12, 0.12]} color="#d8a820" castShadow={false} />
    <Vox kind="planks" position={[1.7, 0.35, -1.9]} size={[0.9, 0.7, 0.7]} />
    <Block position={[-2.36, 1.6, 0.6]} size={[0.06, 0.12, 1.4]} color="#5c3f24" castShadow={false} />
    <Torch position={[-2.3, 2.2, -0.6]} light={9} seed={11} />
    <pointLight position={[0.4, 3, 1.2]} color="#a9b8ff" intensity={16} distance={8} decay={2} />
  </group>
);

const Outside: React.FC = () => (
  <group position={OUT}>
    <Country inner={16} count={110} clear={(x, z) => z < 2 || (Math.abs(x) < 7 && z < 12)} />
    <Vox kind="grass" position={[0, -0.25, 12]} size={[70, 0.5, 30]} />
    {/* the castle wall, with a small door in it; the yard is behind it (north) */}
    <Vox kind="stoneBrick" position={[0, 3.5, -1.2]} size={[70, 7, 1.6]} />
    {Array.from({ length: 34 }, (_, i) => (
      <Vox key={i} kind="stoneBrick" position={[-33 + i * 2, 7.45, -0.6]} size={[1, 0.9, 0.5]} />
    ))}
    <Vox kind="stoneBrick" position={[-9, 5, -1.6]} size={[4.4, 10, 4.4]} />
    <Vox kind="stoneBrick" position={[11, 5, -1.6]} size={[4.4, 10, 4.4]} />
    <Block position={[0, 1.3, -0.38]} size={[1.3, 2.6, 0.06]} color="#6b4a2a" castShadow={false} />
    <Block position={[0, 2.7, -0.36]} size={[1.7, 0.2, 0.1]} color="#4a3320" castShadow={false} />
    <Vox kind="path" position={[0, 0.02, 5]} size={[1.8, 0.06, 11]} />
    <Vox kind="cobble" position={[0, 0.06, 0.25]} size={[2.2, 0.12, 1.1]} />
    <Torch position={[-1.1, 2.2, -0.3]} light={12} seed={13} />
    <Torch position={[1.1, 2.2, -0.3]} light={0} seed={14} />
    {/* other bushes, flowers, a stump: it is a nice night */}
    <Vox kind="leaves" tint="#2a5f26" position={[-4.2, 0.5, 2.6]} size={[1.6, 1.0, 1.2]} />
    <Vox kind="leaves" tint="#356b2f" position={[-6.4, 0.45, 6.2]} size={[1.4, 0.9, 1.4]} />
    <Vox kind="leaves" tint="#2f6a2a" position={[6.8, 0.5, 7.2]} size={[1.8, 1.0, 1.3]} />
    <Vox kind="log" position={[-2.4, 0.25, 5.4]} size={[0.7, 0.5, 0.7]} />
    {[[-1.6, 2.2, "#e3261c"], [1.5, 6.3, "#f0c23a"], [-3.1, 7.4, "#e8e4d8"], [4.6, 1.4, "#e3261c"]].map(([x, z, col]) => (
      <group key={`${x}${z}`} position={[x as number, 0, z as number]}>
        <Block position={[0, 0.14, 0]} size={[0.04, 0.28, 0.04]} color="#3f8a35" castShadow={false} />
        <Block position={[0, 0.32, 0]} size={[0.15, 0.1, 0.15]} color={col as string} emissive={col as string} emissiveIntensity={0.3} castShadow={false} />
      </group>
    ))}
    {[[-3, 4], [4, 5], [0, 9], [3, 1.5]].map(([x, z]) => (
      <pointLight key={`${x}${z}`} position={[x, 7, z]} color="#a9b8ff" intensity={70} distance={20} decay={2} />
    ))}
    <Dust position={[0, 2, 4]} area={[14, 3, 10]} count={30} size={0.04} color="#e8ffb0" opacity={0.6} seed={15} speed={0.2} />
  </group>
);

const HordeEdge: React.FC = () => {
  const trees: Array<[number, number, number]> = [];
  for (let i = 0; i < 90; i++) trees.push([(rnd(i + 3) - 0.5) * 70, -16 - rnd(i + 40) * 34, 5 + rnd(i + 70) * 4]);
  return (
    <group position={HORDE}>
      <Block position={[0, -0.3, -10]} size={[300, 0.5, 300]} color="#35602e" castShadow={false} />
      {trees.map(([x, z, height], i) => (
        <Tree key={i} position={[x, 0, z]} height={height} leaf={i % 2 ? "#264d22" : "#2f5f2a"} spread={1.2} />
      ))}
      <Stars center={[0, 0, 0]} radius={170} count={220} seed={31} />
      {[[-12, -8], [0, -6], [12, -8], [-6, -14], [6, -14]].map(([x, z]) => (
        <pointLight key={`${x}${z}`} position={[x, 9, z]} color="#a9b8ff" intensity={110} distance={28} decay={2} />
      ))}
    </group>
  );
};

/** The skinny hallway: 1.7 wide, 4.4 high, 24 long, torches, a red runner, a door at the far end. */
const Hallway: React.FC = () => (
  <group position={HALL4}>
    <Vox kind="stoneBrick" position={[0, -0.1, -HALL_LEN / 2 + 2]} size={[HALL_W + 1, 0.2, HALL_LEN + 6]} />
    <Block position={[0, 0.012, -HALL_LEN / 2 + 1]} size={[0.8, 0.02, HALL_LEN + 2]} color="#8a2a2a" castShadow={false} />
    {[-1, 1].map((s) => (
      <Vox key={s} kind="stoneBrick" position={[s * (HALL_W / 2 + 0.4), 2.2, -HALL_LEN / 2 + 2]} size={[0.8, 4.6, HALL_LEN + 6]} />
    ))}
    <Vox kind="stoneBrick" position={[0, 4.5, -HALL_LEN / 2 + 2]} size={[HALL_W + 1, 0.3, HALL_LEN + 6]} />
    <Vox kind="stoneBrick" position={[0, 2.2, -HALL_LEN - 0.4]} size={[HALL_W + 1, 4.6, 0.8]} />
    <Block position={[0, 1.4, -HALL_LEN + 0.02]} size={[1.2, 2.8, 0.06]} color="#3a2414" castShadow={false} />
    <Block position={[0.4, 1.3, -HALL_LEN + 0.06]} size={[0.1, 0.1, 0.06]} color="#d8a820" castShadow={false} />
    <Vox kind="stoneBrick" position={[0, 2.2, 4.6]} size={[HALL_W + 1, 4.6, 0.8]} />
    {[-3, -9, -15, -21].map((z, i) => (
      <group key={z}>
        <Torch position={[(i % 2 ? 1 : -1) * (HALL_W / 2 - 0.06), 2.5, z]} light={11} seed={40 + i} />
        <Block position={[(i % 2 ? -1 : 1) * (HALL_W / 2 - 0.02), 2.4, z - 3]} size={[0.04, 1.3, 0.8]} color={i % 2 ? "#b0302a" : "#2f4a8a"} castShadow={false} />
      </group>
    ))}
    <pointLight position={[0, 3.6, -HALL_LEN + 3]} color="#ffd9a0" intensity={14} distance={9} decay={2} />
    <pointLight position={[0, 3.6, 1]} color="#a9b8ff" intensity={10} distance={8} decay={2} />
  </group>
);

export const World: React.FC = () => (
  <>
    <Zone name="fort">
      <Fort />
    </Zone>
    <Zone name="room">
      <GuardRoom />
    </Zone>
    <Zone name="out">
      <Outside />
    </Zone>
    <Zone name="horde">
      <HordeEdge />
    </Zone>
    <Zone name="hallway">
      <Hallway />
    </Zone>
  </>
);
