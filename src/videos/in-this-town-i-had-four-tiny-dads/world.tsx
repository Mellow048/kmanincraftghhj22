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
import type { Vec3 } from "../../engine";
import { Bell, Hut, Lantern, Moon, Room, Stars, Well } from "../../../Topics/InThisTown";
import { BRIDGE, BRIDGE_Y, DOCK_Y, PATH_Y, PORCH_Y, RIVERBED_Y, ROOM_MARKS, VILLAGE, WATER_Y } from "./marks";
import { EAST, FistCraters, HangingBabyCoat, SOUTH, SwampSign, TinyDoorway, TwinWhiteCraters, WEST } from "./kit";

const KidFamilyDrawing: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block size={[0.72, 0.54, 0.02]} color="#f6efe0" />
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
    <Vox kind="grass" position={[0, -0.5, 0]} size={[360, 1, 360]} />
    <Vox kind="path" position={[0, PATH_Y - 0.02, 1.5]} size={[3.6, 0.06, 40]} />
    <Vox kind="path" position={[4.8, PATH_Y - 0.021, 3.5]} size={[6.8, 0.06, 7.2]} />
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
    <Vox kind="planks" tint="#9c7648" position={[0, PORCH_Y / 2, -13.1]} size={[4.6, PORCH_Y, 2.2]} />
    <TwinWhiteCraters position={[1.45, 0.03, -11.55]} rotationY={0.14} />
    <Block position={[0, 3.35, -14.42]} size={[0.72, 0.72, 0.1]} color="#68d846" />
    <Block position={[-0.16, 3.44, -14.36]} size={[0.13, 0.13, 0.03]} color="#193014" />
    <Block position={[0.16, 3.44, -14.36]} size={[0.13, 0.13, 0.03]} color="#193014" />
    <Block position={[0, 3.2, -14.36]} size={[0.16, 0.14, 0.03]} color="#193014" />

    {/* Side Wooden Shed */}
    <group position={VILLAGE.shed}>
      <Vox kind="darkPlanks" position={[0, 1.25, -1.35]} size={[2.8, 2.5, 2.7]} />
      <Vox kind="log" position={[0, 2.65, -1.35]} size={[3.1, 0.35, 3.0]} />
      <Vox kind="planks" tint="#6d5030" position={[-0.52, 1.0, 0.04]} size={[0.92, 1.95, 0.08]} />
      <Vox kind="planks" tint="#6d5030" position={[0.52, 1.0, 0.04]} size={[0.92, 1.95, 0.08]} />
      <Block position={[0, 1.05, 0.11]} size={[0.55, 0.1, 0.06]} color="#4c4f54" />
    </group>

    {/* Neighboring Village Houses */}
    <Hut at={[-8.8, 0, -4.5]} w={6.0} h={3.8} turn={EAST} roof="#4e943a" windows={[-1.8, 1.8]} lit={night} />
    <Hut at={[-8.8, 0, 6.8]} w={5.8} h={3.6} turn={EAST} roof="#559e40" windows={[-1.7, 1.7]} lit={night} />
    <Hut at={[8.8, 0, -6.5]} w={6.0} h={3.8} turn={WEST} roof="#4e943a" windows={[-1.8, 1.8]} lit={night} />

    {/* Village Schoolhouse on the east side, facing WEST (-X) onto the wide schoolyard */}
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
    <Vox kind="darkPlanks" position={[8.45, 1.85, 1.1]} size={[0.1, 1.25, 2.1]} />
    <Block position={[8.38, 1.85, 1.1]} size={[0.03, 1.02, 1.85]} color="#1f3b2b" castShadow={false} />
    {/* Tall School Bell Tower (`7.roof`) */}
    <group position={[7.2, 0, 7.8]}>
      <Vox kind="cobble" position={[0, 2.2, 0]} size={[1.8, 4.4, 1.8]} />
      <Vox kind="log" position={[-0.72, 5.1, -0.72]} size={[0.24, 1.4, 0.24]} />
      <Vox kind="log" position={[0.72, 5.1, -0.72]} size={[0.24, 1.4, 0.24]} />
      <Vox kind="log" position={[-0.72, 5.1, 0.72]} size={[0.24, 1.4, 0.24]} />
      <Vox kind="log" position={[0.72, 5.1, 0.72]} size={[0.24, 1.4, 0.24]} />
      <Vox kind="darkPlanks" tint="#7f3528" position={[0, 6.05, 0]} size={[2.3, 0.5, 2.3]} />
      <Bell position={[0, 4.4, 0]} />
    </group>
    {/* Wide open School Front Gate Arch (`7.gate`) — wide enough never to clip schoolyard cameras */}
    <group position={[1.75, 0, 3.5]}>
      <Vox kind="log" position={[0, 1.75, -2.35]} size={[0.26, 3.5, 0.26]} />
      <Vox kind="log" position={[0, 1.75, 2.35]} size={[0.26, 3.5, 0.26]} />
      <Vox kind="darkPlanks" position={[0, 3.45, 0]} size={[0.32, 0.3, 5.1]} />
    </group>

    <Well position={VILLAGE.well} />

    {/* South Village Gate */}
    <group position={[0, 0, VILLAGE.gate[2]]}>
      <Vox kind="cobble" position={[-2.5, 1.95, 0]} size={[1.05, 3.9, 1.05]} />
      <Vox kind="cobble" position={[2.5, 1.95, 0]} size={[1.05, 3.9, 1.05]} />
      <Vox kind="log" position={[0, 3.75, 0]} size={[6.2, 0.42, 0.55]} />
      <Lantern position={[-1.85, 3.25, 0]} chain={0.3} light={night || sunset ? 1.5 : 0.2} seed={11} />
      <Lantern position={[1.85, 3.25, 0]} chain={0.3} light={night || sunset ? 1.5 : 0.2} seed={17} />
    </group>
    <SwampSign position={VILLAGE.gateSign} rotationY={0.22} />

    {/* Swamp puddles & lilypads along the village grass so "We lived in a swamp" reads visually! */}
    {(
      [
        [-3.6, -9.5],
        [3.4, -8.8],
        [-3.8, 1.5],
        [3.5, -2.2],
      ] as Array<[number, number]>
    ).map(([x, z], i) => (
      <group key={`sp${i}`} position={[x, 0.015, z]}>
        <Block size={[1.9, 0.02, 1.5]} color="#255c4b" />
        <Block position={[0.3, 0.018, 0.15]} size={[0.52, 0.02, 0.52]} color="#3e8c34" />
      </group>
    ))}

    {[-9, -2, 5, 12].map((z) =>
      [-1, 1].map((s) => (
        <Torch key={`${s}_${z}`} position={[s * 2.25, 0, z]} light={night || sunset ? 1.1 : 0} seed={z + s * 3} />
      )),
    )}

    {night ? null : (
      <>
        <GodRay
          position={[-4.2, 6.8, -6]}
          rotation={[0, 0, 0.46]}
          width={5.5}
          height={14}
          color={sunset ? "#ffbe7b" : "#fff1c8"}
          opacity={sunset ? 0.09 : 0.055}
        />
        <GodRay
          position={[4.5, 6.8, 5]}
          rotation={[0, 0, 0.4]}
          width={5.2}
          height={14}
          color={sunset ? "#ffb26b" : "#fff1c8"}
          opacity={sunset ? 0.08 : 0.05}
        />
      </>
    )}
    <LightPool position={[0, 0.05, -10.5]} width={6.5} depth={6.5} color={sunset ? "#ffb878" : "#fff3c4"} opacity={0.14} />
    <LightPool position={[4.2, 0.05, 3.5]} width={6.8} depth={6.2} color={sunset ? "#ffb878" : "#fff3c4"} opacity={0.13} />
    <Glow position={[0, 1.9, -12.8]} size={2.0} color={sunset ? "#ffba74" : "#d9ffb8"} opacity={0.14} />
    <Dust position={[0, 2.2, 1]} area={[24, 4, 32]} count={64} size={0.042} color={sunset ? "#ffd7a8" : "#fff7d8"} opacity={0.5} seed={7} speed={0.2} />
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
    {/* Door, coat hook, and family drawing all on the back (-Z) wall so cameras on the open +Z side NEVER clip side walls! */}
    <TinyDoorway position={ROOM_MARKS.backDoor} rotationY={SOUTH} open={0.18} />
    <HangingBabyCoat position={ROOM_MARKS.coatHook} rotationY={SOUTH} sway={0.04} />
    <KidFamilyDrawing position={[0.42, 1.88, -2.38]} />
    <group position={ROOM_MARKS.bed}>
      <Vox kind="planks" position={[0, 0.16, 0]} size={[1.05, 0.24, 1.75]} />
      <Vox kind="wool" tint="#5bc940" position={[0, 0.31, 0.12]} size={[0.96, 0.12, 1.38]} />
      <Vox kind="wool" tint="#f5f1e6" position={[0, 0.34, -0.58]} size={[0.78, 0.14, 0.36]} />
    </group>
  </group>
);

const COLLAPSED_BRIDGE_CUES = new Set(["6.drop", "6.rope", "6.three", "6.block", "6.boing"]);
const CRATER_BRIDGE_CUES = new Set(["5.stare", "5.list", "5.zero", "5.front", "6.scoop", "6.pin"]);

const BridgeZone: React.FC<{ night: boolean; sunset: boolean; cue: string }> = ({ night, sunset, cue }) => {
  const collapsed = COLLAPSED_BRIDGE_CUES.has(cue);
  const hasCraters = CRATER_BRIDGE_CUES.has(cue);
  return (
    <group>
      {/* Shimmering dark swamp water */}
      <Vox kind="stone" tint="#0c1f1b" position={[0, WATER_Y - 0.85, 0]} size={[220, 1, 220]} />
      <mesh position={[0, WATER_Y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial
          color={night ? "#133430" : sunset ? "#2b4d40" : "#1f5446"}
          emissive={night ? "#0b2420" : "#12332a"}
          emissiveIntensity={0.28}
          roughness={0.24}
        />
      </mesh>

      {/* North & South Swamp Banks + Deep 4m Open-Sky River Gorge */}
      <Vox kind="grass" tint="#3b5e32" position={[-18.9, -0.45, -17.5]} size={[42.2, 1.1, 23]} />
      <Vox kind="grass" tint="#3b5e32" position={[23.9, -0.45, -17.5]} size={[32.2, 1.1, 23]} />
      <Vox kind="grass" tint="#3b5e32" position={[5.0, -0.45, -18.95]} size={[5.6, 1.1, 20.1]} />
      <Vox kind="grass" tint="#3b5e32" position={[0, -0.45, 17.5]} size={[80, 1.1, 23]} />
      {/* Deep stone gorge cliff walls beneath upper banks (leaving x ∈ [2.25, 7.80], z ∈ [-8.85, +6.0] wide open to sky & cameras!) */}
      <Vox kind="cobble" tint="#4d574a" position={[-18.9, -1.95, -17.5]} size={[42.2, 2.0, 23]} />
      <Vox kind="cobble" tint="#4d574a" position={[23.9, -1.95, -17.5]} size={[32.2, 2.0, 23]} />
      <Vox kind="cobble" tint="#4d574a" position={[5.0, -1.95, -18.95]} size={[5.6, 2.0, 20.1]} />
      <Vox kind="cobble" tint="#4d574a" position={[0, -1.95, 17.5]} size={[80, 2.0, 23]} />
      {/* Sheer mossy cliff face dropping from the broken east bridgehead (`x = 2.08`) down to the lower boardwalk! */}
      <Vox kind="cobble" tint="#556052" position={[2.08, -0.88, -5.45]} size={[0.28, 3.82, 6.7]} />

      <Vox kind="path" tint="#695d46" position={[0, 0.1, -9.35]} size={[4.2, 0.1, 7.3]} />
      <Vox kind="path" tint="#695d46" position={[0, 0.1, 9.35]} size={[4.2, 0.1, 7.3]} />

      {/* Long Lower Gorge Waterside Boardwalk (`top = DOCK_Y = -2.68`, `z ∈ [-8.8, -1.6]`) so Dad #1 can sprint-push the cart! */}
      <group position={[3.65, 0, -5.2]}>
        <Vox kind="planks" tint="#7c5b38" position={[0, DOCK_Y - 0.08, 0]} size={[2.7, 0.16, 7.2]} />
        {[-3.2, -1.6, 0, 1.6, 3.2].map((pz, i) => (
          <Vox key={`dp${i}`} kind="log" position={[1.18, DOCK_Y - 0.36, pz]} size={[0.18, 0.42, 0.18]} />
        ))}
      </group>

      {/* Smoothly Sloped Cobble Bridge Approaches:
          North ramp (`z = -5.9`, `rotX = -0.312`) rises UP from north bank (`y = 0.15`) to bridge (`y = 1.15`).
          South ramp (`z = +5.9`, `rotX = +0.312`) slopes DOWN from bridge (`y = 1.15`) to south ruins (`y = 0.15`). */}
      <Vox kind="cobble" tint="#6f776c" position={[0, 0.48, -5.9]} rotation={[-0.312, 0, 0]} size={[4.4, 0.34, 3.35]} />
      <Vox kind="cobble" tint="#6f776c" position={[0, 0.48, 5.9]} rotation={[0.312, 0, 0]} size={[4.4, 0.34, 3.35]} />

      {/* Standing North Bridgehead Ledge (`z ∈ [-4.4, -2.1]`) — remains standing after the center span drops! */}
      <Vox kind="darkPlanks" tint="#7c5d3b" position={[0, BRIDGE_Y - 0.16, -3.25]} size={[4.4, 0.32, 2.3]} />
      <Vox kind="cobble" tint="#687264" position={[-2.08, BRIDGE_Y + 0.08, -3.25]} size={[0.28, 0.16, 2.3]} />
      {/* North-east ledge (`z ∈ [-3.75, -2.1]`) is open/unguarded right above the waterside dock! */}
      <Vox kind="cobble" tint="#687264" position={[2.08, BRIDGE_Y + 0.08, -4.1]} size={[0.28, 0.16, 0.6]} />
      {[-3.95, -2.25].map((z) => (
        <Vox key={`wnp${z}`} kind="log" position={[-2.08, BRIDGE_Y + 0.38, z]} size={[0.18, 0.76, 0.18]} />
      ))}
      <Vox kind="planks" position={[-2.08, BRIDGE_Y + 0.72, -3.15]} size={[0.14, 0.1, 2.1]} />
      <Vox kind="log" position={[2.08, BRIDGE_Y + 0.38, -3.95]} size={[0.18, 0.76, 0.18]} />

      {/* Center & South Span (`z ∈ [-2.1, +4.4]`) — intact until `6.drop` knocks the pin out! */}
      {!collapsed ? (
        <>
          <Vox kind="darkPlanks" tint="#7c5d3b" position={[0, BRIDGE_Y - 0.16, 1.15]} size={[4.4, 0.32, 6.5]} />
          <Vox kind="cobble" tint="#687264" position={[-2.08, BRIDGE_Y + 0.08, 1.15]} size={[0.28, 0.16, 6.5]} />
          <Vox kind="cobble" tint="#687264" position={[2.08, BRIDGE_Y + 0.08, 2.3]} size={[0.28, 0.16, 4.2]} />
          {[-0.3, 1.75, 3.8].map((z) => (
            <Vox key={`wsp${z}`} kind="log" position={[-2.08, BRIDGE_Y + 0.38, z]} size={[0.18, 0.76, 0.18]} />
          ))}
          <Vox kind="planks" position={[-2.08, BRIDGE_Y + 0.72, 1.05]} size={[0.14, 0.1, 6.3]} />
          {[0.4, 2.1, 3.8].map((z) => (
            <Vox key={`esp${z}`} kind="log" position={[2.08, BRIDGE_Y + 0.38, z]} size={[0.18, 0.76, 0.18]} />
          ))}
          <Vox kind="planks" position={[2.08, BRIDGE_Y + 0.72, 2.15]} size={[0.14, 0.1, 3.7]} />
        </>
      ) : null}

      {/* Bridge support piers descending all the way into the 4m river gorge */}
      {[-3.2, 3.2].map((z) =>
        [-1.7, 1.7].map((x) => (
          <Vox key={`${x}_${z}`} kind="cobble" tint="#586155" position={[x, -0.92, z]} size={[0.74, 3.86, 0.74]} />
        )),
      )}

      {/* South-Bank Mossy Ruin Pillars (wide at x = ±3.2 so center lane stays wide open) */}
      <group position={[-3.2, 0.1, 7.8]}>
        <Vox kind="cobble" tint="#5e6859" position={[0, 1.45, 0]} size={[1.1, 2.9, 1.1]} />
        <Vox kind="leaves" tint="#3b7d31" position={[0.42, 1.55, -0.48]} size={[0.26, 1.8, 0.18]} />
      </group>
      <group position={[3.2, 0.1, 7.9]}>
        <Vox kind="cobble" tint="#5e6859" position={[0, 1.2, 0]} size={[1.0, 2.4, 1.0]} />
        <Vox kind="leaves" tint="#3b7d31" position={[-0.35, 1.2, -0.45]} size={[0.24, 1.5, 0.16]} />
      </group>
      {hasCraters && !collapsed ? <FistCraters position={BRIDGE.craterStone} /> : null}

      <Lantern position={[-2.08, BRIDGE_Y + 1.05, -3.95]} chain={0.18} light={night || sunset ? 1.6 : 0.3} seed={21} />
      {!collapsed ? (
        <Lantern position={[-2.08, BRIDGE_Y + 1.05, 3.8]} chain={0.18} light={night || sunset ? 1.6 : 0.3} seed={29} />
      ) : null}

      {(
        [
          [-3.6, -1.8],
          [-2.8, 2.2],
          [3.6, -0.6],
          [4.3, 1.9],
          [2.7, 3.6],
          [-4.4, 0.4],
        ] as Array<[number, number]>
      ).map(([x, z], i) => (
        <Block key={`lp${i}`} position={[x, WATER_Y + 0.02, z]} size={[0.72, 0.03, 0.72]} color="#3b8232" />
      ))}

      {ring(40, 20, 48, 9).map(([x, z, h], i) => (
        <Tree
          key={`sw${i}`}
          position={[x, Math.abs(z) < 6.5 ? -100 : 0, z]}
          height={h + 0.6}
          leaf={i % 2 ? "#35682d" : "#447c36"}
        />
      ))}

      <GodRay
        position={[-2.4, 6.0, -1.2]}
        rotation={[0, 0, 0.36]}
        width={5.2}
        height={12}
        color={night ? "#8fb9ff" : sunset ? "#ffad66" : "#dcffca"}
        opacity={night ? 0.09 : 0.07}
      />
      {!collapsed ? (
        <LightPool position={[0, BRIDGE_Y + 0.02, 0]} width={4.0} depth={7.4} color={night ? "#95bcff" : "#ffb673"} opacity={0.14} />
      ) : null}
      <Glow position={[-2.08, BRIDGE_Y + 1.0, -3.95]} size={1.8} color={night ? "#ffbe6b" : "#bfff9c"} opacity={0.16} />
      <Dust position={[0, BRIDGE_Y + 1.5, 0]} area={[16, 4.5, 18]} count={68} size={0.046} color={night ? "#cfe2ff" : "#ffd29d"} opacity={0.55} seed={13} speed={0.22} />
      {night ? <Moon position={[18, 54, -82]} radius={7.5} /> : <Clouds y={46} center={[0, 0, 0]} />}
      {night ? <Stars center={[0, 0, 0]} /> : null}
    </group>
  );
};

const RiverbedZone: React.FC = () => (
  <group>
    <Vox kind="dirt" tint="#243c44" position={[0, RIVERBED_Y - 0.5, 0]} size={[90, 1, 90]} />
    <mesh position={[0, 7.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#4ac6e8" emissive="#227996" emissiveIntensity={0.45} transparent opacity={0.38} />
    </mesh>
    {(
      [
        [-3.2, -2.4, 1.1],
        [3.3, -2.1, 1.25],
        [-3.6, 2.6, 0.95],
        [3.1, 2.8, 1.1],
      ] as Array<[number, number, number]>
    ).map(([x, z, s], i) => (
      <Vox key={`rk${i}`} kind="cobble" tint="#3a525c" position={[x, s * 0.4, z]} size={[s * 1.3, s * 0.85, s * 1.2]} />
    ))}
    {(
      [
        [-2.5, -1.6, 3.4],
        [-1.9, -2.8, 4.1],
        [2.6, -1.8, 3.8],
        [3.1, 1.4, 3.1],
      ] as Array<[number, number, number]>
    ).map(([x, z, h], i) => (
      <group key={`kl${i}`} position={[x, 0, z]}>
        <Vox kind="leaves" tint="#2e8e68" position={[0, h / 2, 0]} size={[0.18, h, 0.18]} />
      </group>
    ))}
    <pointLight position={[0.8, 5.4, 3.2]} color="#ffe2ab" intensity={6.5} distance={16} decay={2} />
    <GodRay position={[-0.6, 3.8, -0.8]} rotation={[0, 0, 0.18]} width={3.6} height={7.5} color="#ffdfa8" opacity={0.18} />
    <LightPool position={[0, 0.03, 0]} width={5.4} depth={5.4} color="#ffd89c" opacity={0.22} />
    <Glow position={[0, 1.5, -0.5]} size={2.6} color="#9bf0e4" opacity={0.18} />
    <Dust position={[0, 2.6, 0]} area={[10, 5.5, 10]} count={85} size={0.05} color="#fff1d0" opacity={0.68} seed={31} speed={0.3} />
  </group>
);

export const World: React.FC = () => {
  const active = useActiveShot();
  const look = active?.shot.look ?? "overworld-day";
  const cue = active?.shot.cue ?? "";
  const night = look === "overworld-night";
  const sunset = look === "overworld-sunset";
  return (
    <>
      {night ? <directionalLight color="#adc6ff" intensity={1.25} position={[-4, 10, 14]} /> : null}
      {night ? <ambientLight color="#748ed6" intensity={0.42} /> : null}
      <Zone name="village">
        <VillageZone night={night} sunset={sunset} />
      </Zone>
      <Zone name="room">
        <RoomZone night={night} />
      </Zone>
      <Zone name="bridge">
        <BridgeZone night={night} sunset={sunset} cue={cue} />
      </Zone>
      <Zone name="riverbed">
        <RiverbedZone />
      </Zone>
    </>
  );
};
