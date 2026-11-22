import type React from "react";
import {
  Block,
  Clouds,
  Dust,
  Glow,
  GodRay,
  LightPool,
  Torch,
  Tree,
  Vox,
  Zone,
  useActiveShot,
} from "../../engine";
import { Hut, Lantern, Moon, Room, Stars, Well, Bell } from "../../../Topics/InThisTown";
import { BRIDGE, BRIDGE_Y, PATH_Y, PORCH_Y, RIVERBED_Y, ROOM_MARKS, VILLAGE, WATER_Y } from "./marks";
import { EAST, FistCraters, SwampSign, TinyDoorway, TwinWhiteCraters, WEST } from "./kit";
import type { Vec3 } from "../../engine";

const KidFamilyDrawing: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block size={[0.72, 0.54, 0.02]} color="#f6efe0" />
    {/* Crayoned orange kid + 4 tiny green squares with hearts */}
    <Block position={[-0.18, -0.02, 0.015]} size={[0.1, 0.24, 0.01]} color="#f07c2e" />
    {[-0.02, 0.08, 0.18, 0.28].map((x, i) => (
      <Block key={i} position={[x, -0.09, 0.015]} size={[0.075, 0.075, 0.01]} color="#62cf40" />
    ))}
    <Block position={[0.05, 0.12, 0.015]} size={[0.09, 0.08, 0.01]} color="#e84a5f" />
  </group>
);

const ring = (n: number, r0: number, r1: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.07;
    const r = r0 + (((i * 37 + seed * 13) % 100) / 100) * (r1 - r0);
    return [Math.cos(a) * r, Math.sin(a) * r, 4.4 + ((i * 7 + seed) % 5) * 0.75] as [number, number, number];
  });

const VillageZone: React.FC<{ night: boolean; sunset: boolean }> = ({ night, sunset }) => (
  <group>
    {/* Meadow ground & cobble main street */}
    <Vox kind="grass" position={[0, -0.5, 0]} size={[360, 1, 360]} />
    <Vox kind="path" position={[0, PATH_Y - 0.02, 1.5]} size={[3.6, 0.06, 40]} />
    {/* Schoolyard paved court */}
    <Vox kind="path" position={[4.6, PATH_Y - 0.021, 3.5]} size={[6.4, 0.06, 6.8]} />
    {/* Side path to shed */}
    <Vox kind="path" position={[-2.9, PATH_Y - 0.022, -11.8]} size={[5.6, 0.06, 1.5]} />

    {/* OUR SLIME FAMILY COTTAGE at north end of lane, facing +Z */}
    <Hut
      at={VILLAGE.home}
      w={6.4}
      d={5.4}
      h={3.8}
      wall="planks"
      tint="#ccb286"
      roof="#45983b"
      windows={[-1.95, 1.95]}
      lit={night || sunset}
    />
    {/* Wooden front porch, twin white craters by our stairs, & low slime-family crest */}
    <Vox kind="planks" tint="#9c7648" position={[0, PORCH_Y / 2, -13.1]} size={[4.6, PORCH_Y, 2.2]} />
    <TwinWhiteCraters position={[1.55, 0.03, -11.75]} rotationY={0.18} />
    <Block position={[0, 3.35, -14.42]} size={[0.72, 0.72, 0.1]} color="#68d846" />
    <Block position={[-0.16, 3.44, -14.36]} size={[0.13, 0.13, 0.03]} color="#193014" />
    <Block position={[0.16, 3.44, -14.36]} size={[0.13, 0.13, 0.03]} color="#193014" />
    <Block position={[0, 3.2, -14.36]} size={[0.16, 0.14, 0.03]} color="#193014" />

    {/* Side Wooden Shed where the old green-stained wheelbarrow was locked */}
    <group position={VILLAGE.shed}>
      <Vox kind="darkPlanks" position={[0, 1.25, -1.35]} size={[2.8, 2.5, 2.7]} />
      <Vox kind="log" position={[0, 2.65, -1.35]} size={[3.1, 0.35, 3.0]} />
      <Vox kind="planks" tint="#6d5030" position={[-0.52, 1.0, 0.04]} size={[0.92, 1.95, 0.08]} />
      <Vox kind="planks" tint="#6d5030" position={[0.52, 1.0, 0.04]} size={[0.92, 1.95, 0.08]} />
      <Block position={[0, 1.05, 0.11]} size={[0.55, 0.1, 0.06]} color="#4c4f54" />
    </group>

    {/* Neighboring Village Houses */}
    <Hut at={[-8.6, 0, -4.5]} w={6.0} h={3.8} turn={EAST} roof="#8a3b2a" windows={[-1.8, 1.8]} lit={night} />
    <Hut at={[-8.6, 0, 6.8]} w={5.8} h={3.6} turn={EAST} roof="#7a4c2a" windows={[-1.7, 1.7]} lit={night} />
    <Hut at={[8.6, 0, -6.5]} w={6.0} h={3.8} turn={WEST} roof="#8a3b2a" windows={[-1.8, 1.8]} lit={night} />

    {/* Village Schoolhouse on the east side, facing WEST (-X) onto the schoolyard */}
    <Hut
      at={VILLAGE.school}
      w={7.6}
      d={5.8}
      h={4.3}
      turn={WEST}
      wall="cobble"
      tint="#c8ccbf"
      roof="#7f3528"
      windows={[-2.4, 2.4]}
      lit={night}
    />
    {/* Outdoor chalkboard, Bell Tower & School Gate on schoolyard edge */}
    <Vox kind="darkPlanks" position={[8.25, 1.85, 1.1]} size={[0.1, 1.25, 2.1]} />
    <Block position={[8.18, 1.85, 1.1]} size={[0.03, 1.02, 1.85]} color="#1f3b2b" castShadow={false} />
    {/* Tall School Bell Tower (`7.roof`) */}
    <group position={[6.8, 0, 7.6]}>
      <Vox kind="cobble" position={[0, 2.2, 0]} size={[1.8, 4.4, 1.8]} />
      <Vox kind="log" position={[-0.72, 5.1, -0.72]} size={[0.24, 1.4, 0.24]} />
      <Vox kind="log" position={[0.72, 5.1, -0.72]} size={[0.24, 1.4, 0.24]} />
      <Vox kind="log" position={[-0.72, 5.1, 0.72]} size={[0.24, 1.4, 0.24]} />
      <Vox kind="log" position={[0.72, 5.1, 0.72]} size={[0.24, 1.4, 0.24]} />
      <Vox kind="darkPlanks" tint="#7f3528" position={[0, 6.05, 0]} size={[2.3, 0.5, 2.3]} />
      <Bell position={[0, 4.4, 0]} />
    </group>
    {/* School Front Gate Arch (`7.gate`) */}
    <group position={[1.95, 0, 3.5]}>
      <Vox kind="log" position={[0, 1.55, -1.65]} size={[0.28, 3.1, 0.28]} />
      <Vox kind="log" position={[0, 1.55, 1.65]} size={[0.28, 3.1, 0.28]} />
      <Vox kind="darkPlanks" position={[0, 3.05, 0]} size={[0.34, 0.32, 3.8]} />
    </group>

    {/* Village Well */}
    <Well position={VILLAGE.well} />

    {/* South Village Gate (leading out to the Swamp Bridge) */}
    <group position={[0, 0, VILLAGE.gate[2]]}>
      <Vox kind="cobble" position={[-2.5, 1.95, 0]} size={[1.05, 3.9, 1.05]} />
      <Vox kind="cobble" position={[2.5, 1.95, 0]} size={[1.05, 3.9, 1.05]} />
      <Vox kind="log" position={[0, 3.75, 0]} size={[6.2, 0.42, 0.55]} />
      <Lantern position={[-1.85, 3.25, 0]} chain={0.3} light={night || sunset ? 1.8 : 0.3} seed={11} />
      <Lantern position={[1.85, 3.25, 0]} chain={0.3} light={night || sunset ? 1.8 : 0.3} seed={17} />
      <Vox kind="cobble" position={[-5.2, 0.85, 0]} size={[4.4, 1.7, 0.65]} />
      <Vox kind="cobble" position={[5.2, 0.85, 0]} size={[4.4, 1.7, 0.65]} />
    </group>
    <SwampSign position={VILLAGE.gateSign} rotationY={0.22} />

    {/* Wildflowers & torches along the village lane */}
    {[-9, -2, 5, 12].map((z) =>
      [-1, 1].map((s) => (
        <Torch key={`${s}_${z}`} position={[s * 2.25, 0, z]} light={night || sunset ? 1.3 : 0} seed={z + s * 3} />
      )),
    )}
    {Array.from({ length: 36 }, (_, i) => {
      const s = i % 2 ? 1 : -1;
      const x = s * (2.6 + ((i * 29) % 45) / 10);
      const z = -11 + ((i * 47) % 260) / 10;
      const col = ["#f2d24a", "#78e052", "#ffffff", "#eb634b"][i % 4];
      return (
        <group key={`fl${i}`} position={[x, 0, z]}>
          <Block position={[0, 0.09, 0]} size={[0.04, 0.18, 0.04]} color="#3f8a34" castShadow={false} />
          <Block position={[0, 0.21, 0]} size={[0.12, 0.09, 0.12]} color={col} castShadow={false} />
        </group>
      );
    })}

    {/* Atmospheric Depth: GodRays, LightPools, Glow, Dust, Perimeter Forest & Sky */}
    {night ? null : (
      <>
        <GodRay
          position={[-4.2, 6.8, -6]}
          rotation={[0, 0, 0.46]}
          width={5.5}
          height={14}
          color={sunset ? "#ffbe7b" : "#fff1c8"}
          opacity={sunset ? 0.11 : 0.065}
        />
        <GodRay
          position={[4.5, 6.8, 5]}
          rotation={[0, 0, 0.4]}
          width={5.2}
          height={14}
          color={sunset ? "#ffb26b" : "#fff1c8"}
          opacity={sunset ? 0.1 : 0.055}
        />
      </>
    )}
    <LightPool
      position={[0, 0.05, -10.5]}
      width={6.5}
      depth={6.5}
      color={sunset ? "#ffb878" : "#fff3c4"}
      opacity={sunset ? 0.18 : 0.15}
    />
    <LightPool
      position={[3.6, 0.05, 3.5]}
      width={6.8}
      depth={6.2}
      color={sunset ? "#ffb878" : "#fff3c4"}
      opacity={0.14}
    />
    <Glow position={[0, 1.9, -12.8]} size={2.3} color={sunset ? "#ffba74" : "#d9ffb8"} opacity={0.18} />
    <Dust
      position={[0, 2.2, 1]}
      area={[24, 4, 32]}
      count={68}
      size={0.044}
      color={sunset ? "#ffd7a8" : "#fff7d8"}
      opacity={0.55}
      seed={7}
      speed={0.2}
    />
    {ring(56, 32, 66, 5).map(([x, z, h], i) => (
      <Tree key={i} position={[x, 0, z]} height={h + 0.8} leaf={i % 3 === 0 ? "#488f38" : "#366c2d"} />
    ))}
    {night ? <Moon position={[-26, 60, -90]} radius={7} /> : <Clouds y={48} center={[0, 0, 0]} />}
    {night ? <Stars center={[0, 0, 0]} /> : null}
  </group>
);

const RoomZone: React.FC<{ night: boolean }> = ({ night }) => (
  <group>
    <Room at={[0, 0, 0]} night={night} />
    {/* Knee-high slime doorway on west wall + low kid bed + wooden storage chest + family drawing */}
    <TinyDoorway position={ROOM_MARKS.lowDoor} rotationY={EAST} open={0.25} />
    <group position={ROOM_MARKS.bed}>
      <Vox kind="planks" position={[0, 0.16, 0]} size={[1.05, 0.24, 1.85]} />
      <Vox kind="wool" tint="#5bc940" position={[0, 0.31, 0.12]} size={[0.96, 0.12, 1.48]} />
      <Vox kind="wool" tint="#f5f1e6" position={[0, 0.34, -0.62]} size={[0.78, 0.14, 0.38]} />
    </group>
    {/* Wooden keepsake chest in back-right corner */}
    <group position={ROOM_MARKS.chest}>
      <Vox kind="planks" tint="#8f6237" position={[0, 0.22, 0]} size={[0.78, 0.44, 0.56]} />
      <Vox kind="darkPlanks" position={[0, 0.46, -0.22]} rotation={[-0.65, 0, 0]} size={[0.8, 0.12, 0.56]} />
      <Block position={[0, 0.36, 0.29]} size={[0.1, 0.12, 0.04]} color="#e8c44a" />
    </group>
    <KidFamilyDrawing position={[-0.55, 1.75, -2.38]} />
    <Glow position={[0, 1.3, -0.2]} size={2.2} color="#ffdba0" opacity={0.18} />
  </group>
);

const BridgeZone: React.FC<{ night: boolean; sunset: boolean }> = ({ night, sunset }) => (
  <group>
    {/* Dark shimmering swamp water expanse */}
    <Vox kind="stone" tint="#0c1f1b" position={[0, WATER_Y - 0.6, 0]} size={[220, 1, 220]} />
    <mesh position={[0, WATER_Y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[220, 220]} />
      <meshStandardMaterial
        color={night ? "#102d29" : sunset ? "#2b4a3e" : "#1f5446"}
        emissive={night ? "#0a2420" : "#12332a"}
        emissiveIntensity={0.35}
        roughness={0.22}
      />
    </mesh>

    {/* North & South Swamp Muddy Banks */}
    <Vox kind="grass" tint="#3b5e32" position={[0, -0.45, -18]} size={[80, 1.1, 24]} />
    <Vox kind="grass" tint="#3b5e32" position={[0, -0.45, 18]} size={[80, 1.1, 24]} />
    <Vox kind="path" tint="#695d46" position={[0, 0.12, -9.5]} size={[3.8, 0.12, 7.5]} />
    <Vox kind="path" tint="#695d46" position={[0, 0.12, 9.5]} size={[3.8, 0.12, 7.5]} />

    {/* Stepped Stone Bridge Approaches & Main Arch Span */}
    <Vox kind="cobble" tint="#6f776c" position={[0, 0.55, -6.2]} rotation={[0.36, 0, 0]} size={[4.5, 0.45, 3.8]} />
    <Vox kind="cobble" tint="#6f776c" position={[0, 0.55, 6.2]} rotation={[-0.36, 0, 0]} size={[4.5, 0.45, 3.8]} />
    <Vox kind="cobble" tint="#767f72" position={[0, BRIDGE_Y - 0.22, 0]} size={[4.6, 0.44, 9.2]} />
    {/* Bridge support piers in the water */}
    {[-3.4, 3.4].map((z) =>
      [-1.7, 1.7].map((x) => (
        <Vox key={`${x}_${z}`} kind="cobble" tint="#586155" position={[x, 0.6, z]} size={[0.85, 2.2, 0.85]} />
      )),
    )}
    {/* Intact West Stone Parapet */}
    <Vox kind="cobble" tint="#687264" position={[-2.12, BRIDGE_Y + 0.42, 0]} size={[0.38, 0.84, 9.0]} />
    {/* Broken East Stone Parapet (gap around z = -0.6..1.5 where kid falls & vine hangs!) */}
    <Vox kind="cobble" tint="#687264" position={[2.12, BRIDGE_Y + 0.42, -2.65]} size={[0.38, 0.84, 3.5]} />
    <Vox kind="cobble" tint="#687264" position={[2.12, BRIDGE_Y + 0.42, 3.05]} size={[0.38, 0.84, 2.9]} />
    <Vox kind="cobble" tint="#5c6658" position={[2.08, BRIDGE_Y + 0.14, -0.7]} size={[0.36, 0.28, 0.45]} />
    <Vox kind="cobble" tint="#5c6658" position={[2.1, BRIDGE_Y + 0.12, 1.42]} size={[0.36, 0.24, 0.42]} />

    {/* Ancient Cracked Ruin Pillars, Hanging Vines & Fist Craters */}
    <group position={BRIDGE.ruinPillar}>
      <Vox kind="cobble" tint="#5e6859" position={[0, 1.5, 0]} size={[1.1, 3.0, 1.1]} />
      <Vox kind="leaves" tint="#3b7d31" position={[0.42, 1.7, 0.48]} size={[0.26, 1.9, 0.18]} />
      <Vox kind="leaves" tint="#49933c" position={[-0.36, 1.3, 0.5]} size={[0.22, 1.4, 0.16]} />
    </group>
    <group position={[2.9, 0, -5.6]}>
      <Vox kind="cobble" tint="#5e6859" position={[0, 1.15, 0]} size={[1.0, 2.3, 1.0]} />
      <Vox kind="leaves" tint="#3b7d31" position={[-0.35, 1.2, 0.45]} size={[0.24, 1.5, 0.16]} />
    </group>
    <FistCraters position={BRIDGE.craterStone} />

    {/* Bridge Torches / Lanterns so night shots glow warmly against cool moonlit swamp */}
    <Lantern position={[-2.12, BRIDGE_Y + 1.22, -3.6]} chain={0.2} light={night || sunset ? 2.2 : 0.4} seed={21} />
    <Lantern position={[-2.12, BRIDGE_Y + 1.22, 3.4]} chain={0.2} light={night || sunset ? 2.2 : 0.4} seed={29} />

    {/* Swamp Lilypads & Reeds in the river */}
    {(
      [
        [-3.6, -1.8],
        [-2.8, 2.2],
        [3.4, -2.1],
        [4.1, 1.8],
        [2.7, 3.6],
        [-4.4, 0.4],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <Block key={`lp${i}`} position={[x, WATER_Y + 0.02, z]} size={[0.72, 0.03, 0.72]} color="#3b8232" />
    ))}
    {(
      [
        [-3.2, -4.4],
        [-2.4, -4.7],
        [2.8, -4.5],
        [3.5, 4.6],
        [-3.5, 4.5],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <group key={`rd${i}`} position={[x, WATER_Y, z]}>
        <Block position={[0, 0.55, 0]} size={[0.08, 1.1, 0.08]} color="#4d9239" />
        <Block position={[0.16, 0.46, 0.1]} size={[0.08, 0.92, 0.08]} color="#5ca644" />
      </group>
    ))}

    {/* Swamp Willows & Perimeter Mist */}
    {ring(42, 18, 48, 9).map(([x, z, h], i) => (
      <Tree
        key={`sw${i}`}
        position={[x, Math.abs(z) < 6.5 ? -100 : 0, z]}
        height={h + 0.6}
        leaf={i % 2 ? "#35682d" : "#447c36"}
      />
    ))}

    <GodRay
      position={[-2.4, 6.2, -1.2]}
      rotation={[0, 0, 0.36]}
      width={5.4}
      height={12}
      color={night ? "#8fb9ff" : sunset ? "#ffad66" : "#dcffca"}
      opacity={night ? 0.11 : 0.09}
    />
    <LightPool
      position={[0, BRIDGE_Y + 0.02, 0]}
      width={4.2}
      depth={7.6}
      color={night ? "#95bcff" : sunset ? "#ffb673" : "#e8ffd6"}
      opacity={night ? 0.16 : 0.18}
    />
    <Glow
      position={[-2.1, BRIDGE_Y + 1.15, -3.6]}
      size={2.1}
      color={night ? "#ffbe6b" : "#bfff9c"}
      opacity={0.22}
    />
    <Dust
      position={[0, BRIDGE_Y + 1.5, 0]}
      area={[16, 4.5, 18]}
      count={75}
      size={0.05}
      color={night ? "#9eff7a" : sunset ? "#ffd29d" : "#dcffbe"}
      opacity={0.62}
      seed={13}
      speed={0.22}
    />
    {night ? <Moon position={[18, 54, -82]} radius={7.5} /> : <Clouds y={46} center={[0, 0, 0]} />}
    {night ? <Stars center={[0, 0, 0]} /> : null}
  </group>
);

const RiverbedZone: React.FC = () => (
  <group>
    {/* Sandy emerald-silt riverbed floor */}
    <Vox kind="dirt" tint="#223e38" position={[0, RIVERBED_Y - 0.5, 0]} size={[90, 1, 90]} />
    {/* Shimmering overhead water surface */}
    <mesh position={[0, 6.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial
        color="#3ec9b8"
        emissive="#259688"
        emissiveIntensity={0.65}
        transparent
        opacity={0.42}
      />
    </mesh>

    {/* Mossy river boulders & tall underwater kelp columns */}
    {(
      [
        [-2.8, -2.2, 1.1],
        [3.1, -1.9, 1.3],
        [-3.4, 2.4, 0.95],
        [2.7, 2.8, 1.15],
        [0.4, -4.2, 1.5],
      ] as Array<[number, number, number]>
    ).map(([x, z, s], i) => (
      <Vox
        key={`rk${i}`}
        kind="cobble"
        tint="#34594f"
        position={[x, s * 0.4, z]}
        size={[s * 1.3, s * 0.85, s * 1.2]}
      />
    ))}
    {(
      [
        [-2.2, -1.2, 3.4],
        [-1.7, -2.5, 4.1],
        [2.3, -1.5, 3.8],
        [2.9, 1.4, 3.1],
        [-2.6, 1.6, 3.6],
        [1.5, -3.4, 4.3],
      ] as Array<[number, number, number]>
    ).map(([x, z, h], i) => (
      <group key={`kl${i}`} position={[x, 0, z]}>
        <Vox kind="leaves" tint="#2e8e5c" position={[0, h / 2, 0]} size={[0.18, h, 0.18]} />
        <Block position={[0.12, h * 0.65, 0]} size={[0.16, 0.35, 0.08]} color="#43b576" />
      </group>
    ))}

    {/* Underwater Emerald-Aqua Caustic Shafts, Pools, Bubbles & Key Lights */}
    <pointLight position={[0.8, 5.2, 2.4]} color="#6fffe8" intensity={8} distance={14} decay={2} />
    <pointLight position={[-2.2, 2.4, 2.6]} color="#7aff5c" intensity={6} distance={11} decay={2} />
    <GodRay
      position={[-0.6, 3.6, -0.8]}
      rotation={[0, 0, 0.18]}
      width={3.6}
      height={7.5}
      color="#78fff0"
      opacity={0.18}
    />
    <GodRay
      position={[1.4, 3.6, 0.4]}
      rotation={[0, 0, -0.14]}
      width={2.8}
      height={7.5}
      color="#8aff6e"
      opacity={0.14}
    />
    <LightPool position={[0, 0.03, 0]} width={5.4} depth={5.4} color="#7affda" opacity={0.28} />
    <Glow position={[0, 1.2, 0]} size={3.0} color="#78ff70" opacity={0.26} />
    <Dust
      position={[0, 2.6, 0]}
      area={[10, 5.5, 10]}
      count={95}
      size={0.055}
      color="#b8fff4"
      opacity={0.72}
      seed={31}
      speed={0.32}
    />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const night = look === "overworld-night";
  const sunset = look === "overworld-sunset";
  return (
    <>
      {/* Camera-side moonlight fill so night faces & lime slime dads stay crisp and readable */}
      {night ? <directionalLight color="#9cbaff" intensity={1.15} position={[-4, 9, 12]} /> : null}
      {night ? <ambientLight color="#6c86cf" intensity={0.38} /> : null}
      <Zone name="village">
        <VillageZone night={night} sunset={sunset} />
      </Zone>
      <Zone name="room">
        <RoomZone night={night} />
      </Zone>
      <Zone name="bridge">
        <BridgeZone night={night} sunset={sunset} />
      </Zone>
      <Zone name="riverbed">
        <RiverbedZone />
      </Zone>
    </>
  );
};
