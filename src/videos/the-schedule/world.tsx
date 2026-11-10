import { Bed, Block, Carpet, CeilingLight, Door, DoorFrame, Glow, GodRay, LightPool, Locker, Monitor, Sign, WallClock, WindowUnit } from "../../engine";
import { Dust, FogCard } from "../../engine/fx";
import { pixelTex, plankTex } from "../../engine/textures";

/**
 * THE SCHEDULE — world.
 *
 * One continuous location, built once and shared by every scene:
 *
 *   ROOM      x -2.6 .. 2.6   z -3.0 .. 3.0   (bed on the left, window right)
 *   DOOR      x  1.15 .. 2.15 at z = 3.0      (swings into the hall)
 *   HALLWAY   x -2.2 .. 2.2   z  3.0 .. 13.0  (red runner, The Figure at z 9.4)
 *
 * The camera must never teleport through these walls. If a scene is in the
 * hallway, the previous scene's camera needs a path through the door.
 */

const ROOM = {
  minX: -2.6,
  maxX: 2.6,
  minZ: -3.0,
  maxZ: 3.0,
  height: 3.0,
};

const HALL = {
  minX: -2.2,
  maxX: 2.2,
  minZ: 3.0,
  maxZ: 13.0,
  height: 3.0,
};

const FLICKER: Array<[number, number]> = [
  [7.15, 8.25],
  [9.9, 10.35],
  [12.3, 14.1],
  [17.15, 19.7],
];

const wallTex = (color: string, repeat: [number, number]) => pixelTex(color, repeat, { jitter: 0.06 });

export const World: React.FC = () => {
  return (
    <group>
      {/* ───────────────────────── ROOM ───────────────────────── */}
      <group>
        <Block position={[0, -0.05, 0]} size={[5.2, 0.1, 6]} map={wallTex("#1a2a44", [4, 5])} />
        <Block position={[0, 3.05, 0]} size={[5.2, 0.1, 6]} color="#0c1422" />

        {/* back wall (+ timetable) */}
        <Block position={[0, 1.5, -3.06]} size={[5.2, 3, 0.12]} map={wallTex("#1d2f4c", [4, 2])} />
        <Block position={[0, 0.09, -2.98]} size={[5.2, 0.18, 0.04]} color="#0b1526" />

        {/* left wall */}
        <Block position={[-2.66, 1.5, 0]} size={[0.12, 3, 6]} map={wallTex("#1a2b46", [4, 2])} />
        <Block position={[-2.58, 0.09, 0]} size={[0.04, 0.18, 6]} color="#0b1526" />

        {/* right wall, split around the window opening */}
        <Block position={[2.66, 1.5, -1.7]} size={[0.12, 3, 2.6]} map={wallTex("#1a2b46", [2, 2])} />
        <Block position={[2.66, 1.5, 2.05]} size={[0.12, 3, 1.9]} map={wallTex("#1a2b46", [2, 2])} />
        <Block position={[2.66, 0.575, 0.35]} size={[0.12, 1.15, 1.5]} map={wallTex("#1a2b46", [1, 1])} />
        <Block position={[2.66, 2.675, 0.35]} size={[0.12, 0.65, 1.5]} map={wallTex("#1a2b46", [1, 1])} />

        <WindowUnit position={[2.58, 1.75, 0.35]} rotationY={-Math.PI / 2} width={1.5} height={1.2} />
        <pointLight position={[2.2, 1.95, 0.35]} color="#bcd8ff" intensity={11} distance={6} decay={2} />
        <pointLight position={[0.1, 1.7, 1.5]} color="#cfdff5" intensity={3.6} distance={4.5} decay={2} />
        <Glow position={[2.42, 1.85, 0.35]} size={2.6} color="#9fc6ff" opacity={0.42} />
        <pointLight position={[-2.15, 1.5, -2.2]} color="#7fa8ff" intensity={5} distance={4.5} decay={2} />
        <Block position={[2.5, 1.08, 0.35]} size={[0.22, 0.06, 1.7]} color="#37445c" />

        {/* curtains */}
        <Block position={[2.5, 1.72, -0.52]} size={[0.08, 1.4, 0.42]} color="#16294a" />
        <Block position={[2.5, 1.72, 1.22]} size={[0.08, 1.4, 0.42]} color="#16294a" />

        {/* front wall around the door */}
        <Block position={[-0.725, 1.5, 3.06]} size={[3.75, 3, 0.12]} map={wallTex("#1a2b46", [3, 2])} />
        <Block position={[2.375, 1.5, 3.06]} size={[0.45, 3, 0.12]} map={wallTex("#1a2b46", [1, 2])} />
        <Block position={[1.65, 2.6, 3.06]} size={[1.0, 0.8, 0.12]} map={wallTex("#1a2b46", [1, 1])} />
        <Block position={[-0.725, 0.09, 2.98]} size={[3.75, 0.18, 0.04]} color="#0b1526" />
        <Block position={[2.375, 0.09, 2.98]} size={[0.45, 0.18, 0.04]} color="#0b1526" />

        {/* door frame */}
        <Block position={[1.11, 1.12, 3.03]} size={[0.1, 2.25, 0.18]} color="#2c374c" />
        <Block position={[2.19, 1.12, 3.03]} size={[0.1, 2.25, 0.18]} color="#2c374c" />
        <Block position={[1.65, 2.24, 3.03]} size={[1.18, 0.1, 0.18]} color="#2c374c" />

        <Door position={[1.15, 0, 3.03]} width={1.0} height={2.18} open={-1.35} color="#22352d" />

        {/* bed */}
        <Bed position={[-1.8, 0, -1.75]} length={2.2} width={1.15} sheet="#c3d7e8" blanket="#24629e" />
        <Block position={[-1.8, 0.596, -0.78]} size={[1.21, 0.022, 0.22]} color="#e6eef6" />
        <Block position={[-1.8, 0.585, -1.02]} size={[1.19, 0.02, 0.06]} color="#8fb4d2" />

        {/* nightstand + lamp + monitor */}
        <Block position={[-0.55, 0.3, -2.55]} size={[0.55, 0.6, 0.45]} color="#2b3548" />
        <Block position={[-0.55, 0.58, -2.55]} size={[0.6, 0.05, 0.5]} color="#3a4761" />
        <Block position={[-0.55, 0.72, -2.55]} size={[0.06, 0.24, 0.06]} color="#1c2431" />
        <Block position={[-0.55, 0.86, -2.55]} size={[0.26, 0.14, 0.26]} color="#ffcf9a" emissive="#ffb066" emissiveIntensity={0.9} />
        <Glow position={[-0.55, 0.88, -2.5]} size={1.0} color="#ffb066" opacity={0.4} />

        <Monitor position={[-0.28, 0, -2.32]} rotationY={0.25} />
        <Glow position={[-0.26, 0.53, -2.19]} size={0.9} color="#54e08a" opacity={0.4} />

        {/* IV stand */}
        <Block position={[-0.55, 0.8, -2.05]} size={[0.035, 1.6, 0.035]} color="#8b97a8" metalness={0.5} roughness={0.4} />
        <Block position={[-0.42, 1.55, -2.05]} size={[0.3, 0.03, 0.03]} color="#8b97a8" metalness={0.5} roughness={0.4} />
        <Block position={[-0.28, 1.4, -2.05]} size={[0.16, 0.24, 0.05]} color="#dce9f5" emissive="#9fd8ff" emissiveIntensity={0.18} />
        <Block position={[-0.55, 0.02, -2.05]} size={[0.34, 0.04, 0.34]} color="#6f7b8c" />

        {/* wall details */}
        <Sign
          position={[-1.8, 1.95, -2.94]}
          width={1.25}
          height={1.0}
          title="MY TIMETABLE"
          bg="#e8e1cd"
          fg="#26303c"
          accent="#3963a8"
          grid
          lit={0.28}
        />
        <WallClock position={[0.95, 2.5, -2.93]} radius={0.17} />
        <Locker position={[1.95, 0, -2.62]} width={0.8} height={1.85} depth={0.42} doors={2} />

        {/* light above the door, the one that starts misbehaving */}
        <CeilingLight position={[1.55, 2.9, 2.45]} size={[0.34, 0.14]} color="#ffe9c9" lightColor="#ffdfae" intensity={3.8} flicker={FLICKER} />

        <LightPool position={[1.5, 0.015, 0.3]} width={2.8} depth={2.2} color="#5f8fd6" opacity={0.22} />
        <LightPool position={[1.55, 0.02, 2.35]} width={1.5} depth={1.6} color="#ff9a45" opacity={0.16} />
        <GodRay position={[1.35, 1.5, 2.6]} rotation={[0, 0.2, -0.35]} width={0.85} height={3.1} color="#8fb6ee" opacity={0.07} />
        <LightPool position={[-0.7, 0.02, -2.25]} width={1.4} depth={1.2} color="#ffb066" opacity={0.18} />

        <GodRay
          position={[1.55, 1.35, 0.15]}
          rotation={[0, 0.12, -1.02]}
          width={0.9}
          height={4.6}
          color="#a9c9ff"
          opacity={0.1}
        />
        <GodRay
          position={[1.3, 1.2, 0.6]}
          rotation={[0, -0.1, -1.05]}
          width={1.25}
          height={4.2}
          color="#8fb6ee"
          opacity={0.08}
        />
      </group>

      {/* ──────────────────────── HALLWAY ─────────────────────── */}
      <group>
        <Block position={[0, -0.05, 8]} size={[4.4, 0.1, 10]} map={plankTex("#2a2230", [4, 9])} />
        <Block position={[0, 3.05, 8]} size={[4.4, 0.1, 10]} color="#0a0f14" />

        {/* hall walls */}
        <Block position={[-2.26, 1.5, 8]} size={[0.12, 3, 10]} map={wallTex("#17362f", [6, 2])} />
        <Block position={[2.26, 1.5, 8]} size={[0.12, 3, 10]} map={wallTex("#17362f", [6, 2])} />
        <Block position={[-2.19, 0.45, 8]} size={[0.06, 0.9, 10]} map={wallTex("#0f2620", [6, 1])} />
        <Block position={[2.19, 0.45, 8]} size={[0.06, 0.9, 10]} map={wallTex("#0f2620", [6, 1])} />

        {/* hall end wall + window */}
        <Block position={[0, 1.5, 13.06]} size={[4.4, 3, 0.12]} map={wallTex("#0f2621", [4, 2])} />
        <WindowUnit position={[0, 1.85, 12.98]} rotationY={Math.PI} width={1.6} height={1.3} dim={0.12} />
        <pointLight position={[0, 2.0, 12.45]} color="#9fc6ff" intensity={5} distance={6} decay={2} />
        <Glow position={[0, 2.0, 12.8]} size={3.2} color="#8fb6ee" opacity={0.16} />
        <GodRay
          position={[0, 1.55, 11.4]}
          rotation={[Math.PI / 2, 0, 0]}
          width={1.9}
          height={3.6}
          color="#8fb6ee"
          opacity={0.07}
        />

        <Carpet position={[0, 0.012, 8]} width={1.65} length={9.6} />

        {/* far window light on the floor */}
        <LightPool position={[0, 0.02, 11.7]} width={3.2} depth={3.2} color="#6f9fe0" opacity={0.2} />
        <Glow position={[0.1, 1.2, 9.85]} size={3.4} color="#6f9fd8" opacity={0.28} />
        <Glow position={[0.1, 1.66, 9.54]} size={1.45} color="#a9c9ff" opacity={0.34} />
        <Glow position={[0.1, 1.66, 9.58]} size={0.62} color="#d6e8ff" opacity={0.22} />
        <pointLight position={[0.82, 1.62, 9.58]} color="#8fb6ee" intensity={7} distance={2.2} decay={2} />
        <pointLight position={[-0.62, 1.55, 9.58]} color="#7fa8ee" intensity={6} distance={2.2} decay={2} />
        <pointLight position={[0.1, 1.42, 8.55]} color="#6f93c9" intensity={1.1} distance={2.4} decay={2} />
        <LightPool position={[0, 0.02, 8.6]} width={2.4} depth={2.6} color="#ff5b3a" opacity={0.07} />

        {/* side doors */}
        <DoorFrame position={[2.19, 0, 5.5]} rotationY={-Math.PI / 2} color="#0d241f" />
        <DoorFrame position={[2.19, 0, 9.0]} rotationY={-Math.PI / 2} color="#0d241f" />
        <DoorFrame position={[-2.19, 0, 6.8]} rotationY={Math.PI / 2} color="#0d241f" />
        <DoorFrame position={[-2.19, 0, 10.6]} rotationY={Math.PI / 2} color="#0d241f" />
        <Door position={[2.17, 0, 5.5]} rotationY={-Math.PI / 2} width={1.0} height={2.15} open={-0.12} color="#1b3730" />
        <Door position={[2.17, 0, 9.0]} rotationY={-Math.PI / 2} width={1.0} height={2.15} open={-0.08} color="#1b3730" />
        <pointLight position={[1.9, 1.35, 8.3]} color="#7fa8dd" intensity={2.8} distance={2.6} decay={2} />
        <Door position={[-2.17, 0, 6.8]} rotationY={Math.PI / 2} width={1.0} height={2.15} open={-0.1} color="#1b3730" />
        <Door position={[-2.17, 0, 10.6]} rotationY={Math.PI / 2} width={1.0} height={2.15} open={-0.06} color="#1b3730" />

        {/* wall seams, rail, vents — the things that stop a corridor looking like a tube */}
        {[4.0, 6.2, 8.4, 10.6, 12.4].map((z) => (
          <group key={z}>
            <Block position={[-2.18, 1.55, z]} size={[0.03, 1.9, 0.05]} color="#0c211c" />
            <Block position={[2.18, 1.55, z]} size={[0.03, 1.9, 0.05]} color="#0c211c" />
          </group>
        ))}
        <Block position={[0, 1.02, 8]} size={[0.02, 0.05, 9.6]} color="#0c211c" />
        <Block position={[-2.18, 2.25, 6.0]} size={[0.04, 0.5, 0.72]} color="#0b1d19" />
        {[0, 1, 2, 3].map((i) => (
          <Block key={i} position={[-2.155, 2.06 + i * 0.12, 6.0]} size={[0.03, 0.03, 0.62]} color="#1d3a33" />
        ))}
        <Block position={[-2.08, 0.62, 7.7]} size={[0.12, 0.5, 0.26]} color="#7d1420" />
        <Block position={[-2.08, 0.86, 7.7]} size={[0.06, 0.1, 0.06]} color="#2b2f36" />
        {[5.8, 8.6, 11.2].map((z) => (
          <Block key={z} position={[0, 2.93, z]} size={[4.4, 0.14, 0.2]} color="#0a1216" />
        ))}

        {/* posters */}
        <Sign
          position={[2.14, 1.82, 4.05]}
          rotationY={-Math.PI / 2}
          width={0.72}
          height={0.92}
          title="KEEP"
          subtitle="OUT"
          lines={["WARD 9", "AFTER 22:00"]}
          bg="#ded8c4"
          fg="#1a2230"
          accent="#2c4fa3"
          lit={0.35}
        />
        <Sign
          position={[2.14, 1.28, 4.82]}
          rotationY={-Math.PI / 2}
          width={0.66}
          height={0.86}
          title="99 NIGHTS"
          lines={["IN THE", "FOREST"]}
          bg="#14243c"
          fg="#e8c76a"
          accent="#e8c76a"
          lit={0.3}
        />

        {/* ceiling lights */}
        <CeilingLight position={[0, 2.98, 4.35]} size={[0.9, 0.2]} color="#ffe9c9" lightColor="#ffdfae" intensity={4} distance={7} flicker={FLICKER} />
        <CeilingLight position={[0, 2.98, 7.2]} size={[0.9, 0.2]} color="#ffe9c9" lightColor="#ffdfae" intensity={4} distance={7} flicker={FLICKER} />
        <CeilingLight position={[0, 2.98, 9.9]} size={[0.9, 0.2]} color="#ffe9c9" lightColor="#ffdfae" intensity={4.5} distance={7} flicker={FLICKER} />
        <CeilingLight position={[0, 2.98, 12.2]} size={[0.9, 0.2]} color="#ffe9c9" lightColor="#ffdfae" intensity={4.5} distance={6} flicker={FLICKER} />

        {/* empty gurney, far end */}
        <Bed
          position={[-1.25, 0, 11.4]}
          rotationY={Math.PI / 2}
          width={0.95}
          length={1.95}
          sheet="#d8e2ec"
          blanket="#dfe7ef"
        />

        <FogCard position={[0, 1.5, 12.5]} width={4.2} height={2.9} color="#08151b" opacity={0.45} />

        <Dust position={[0, 1.55, 8]} area={[4, 2.7, 9]} count={220} size={0.03} color="#a9c9ff" opacity={0.32} seed={21} speed={0.5} />
      </group>

      <Dust position={[0, 1.45, 0]} area={[4.6, 2.6, 5.2]} count={150} size={0.026} color="#bcd8ff" opacity={0.3} seed={4} speed={0.35} />
    </group>
  );
};
