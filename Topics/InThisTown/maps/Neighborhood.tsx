import { BedsideTable, Block, Door, DoorFrame, LightPool, Sign, WindowUnit, pixelTex } from "../../../src/engine";
import type { Vec3 } from "../../../src/engine";

/** Modest, furnished voxel house: roof, windows, frame, porch, mailbox and garden. Face is local +Z. */
export const House: React.FC<{
  position: Vec3;
  rotationY?: number;
  walls?: string;
  roof?: string;
  name?: string;
}> = ({ position, rotationY = 0, walls = "#e9cd9d", roof = "#b86a55", name = "HOME" }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 1.35, 0]} size={[3.1, 2.7, 2.75]} map={pixelTex(walls, [3, 2], { jitter: 0.07 })} />
    <Block position={[0, 1.42, 1.39]} size={[3.24, 0.15, 0.08]} color="#f9e9ca" />
    <Block position={[0, 0.13, 1.46]} size={[3.38, 0.26, 0.26]} color="#c6ae85" />
    <Block position={[-0.82, 2.86, 0]} size={[2, 0.15, 3.15]} rotation={[0, 0, -0.43]} color={roof} />
    <Block position={[0.82, 2.86, 0]} size={[2, 0.15, 3.15]} rotation={[0, 0, 0.43]} color={roof} />
    <Block position={[0, 3.19, 0]} size={[0.3, 0.18, 3.2]} color="#6b4b47" />
    <Block position={[0.72, 3.48, -0.55]} size={[0.38, 0.55, 0.42]} color="#996f58" />
    <DoorFrame position={[0, 0, 1.48]} width={0.9} height={2.05} color="#694e4d" />
    <Door position={[-0.45, 0, 1.49]} width={0.9} height={2.05} color="#537c79" />
    <WindowUnit position={[-1.02, 1.72, 1.48]} width={0.58} height={0.76} dim={0.34} warm />
    <WindowUnit position={[1.02, 1.72, 1.48]} width={0.58} height={0.76} dim={0.34} warm />
    <Block position={[-1.02, 1.08, 1.57]} size={[0.87, 0.11, 0.23]} color="#f9e9ca" />
    <Block position={[1.02, 1.08, 1.57]} size={[0.87, 0.11, 0.23]} color="#f9e9ca" />
    <Block position={[0, 0.04, 1.8]} size={[1.4, 0.08, 0.5]} color="#a48b72" />
    <Block position={[0, 0.025, 2.18]} size={[1.15, 0.05, 0.34]} color="#ccac85" />
    <Sign position={[1.5, 2.3, 1.52]} width={0.35} height={0.32} title={name} bg="#f5e6c7" fg="#314d4d" frame={false} />
    <Block position={[-1.45, 0.14, 1.75]} size={[0.38, 0.28, 0.36]} color="#699e70" />
    <Block position={[1.45, 0.18, 1.78]} size={[0.38, 0.36, 0.42]} color="#66936e" />
  </group>
);

/** Simple but recognisable parked car: chassis, cabin, windscreen, mirrors, lamps and four wheels. */
export const TownCar: React.FC<{ position: Vec3; rotationY?: number; color?: string }> = ({
  position, rotationY = 0, color = "#d76e62",
}) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, 0.58, 0]} size={[1.32, 0.52, 2.45]} color={color} />
    <Block position={[0, 1.01, -0.15]} size={[1.15, 0.45, 1.35]} color={color} />
    <Block position={[0, 1.08, 0.55]} size={[0.99, 0.32, 0.06]} color="#93b8be" emissive="#6e99a4" emissiveIntensity={0.1} />
    <Block position={[0, 1.08, -0.87]} size={[0.99, 0.32, 0.06]} color="#9ebfc0" />
    {[-1, 1].map((s) => (
      <group key={s}>
        <Block position={[s * 0.68, 0.98, 0.37]} size={[0.17, 0.09, 0.2]} color="#304b55" />
        <Block position={[s * 0.48, 0.68, 1.24]} size={[0.24, 0.16, 0.04]} color="#ffe3a0" emissive="#ffdd94" emissiveIntensity={0.3} />
        <Block position={[s * 0.47, 0.66, -1.24]} size={[0.24, 0.14, 0.04]} color="#b9524c" />
        {[-0.76, 0.78].map((z) => (
          <mesh key={z} position={[s * 0.73, 0.31, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.27, 0.27, 0.14, 12]} />
            <meshStandardMaterial color="#29333c" roughness={0.85} />
          </mesh>
        ))}
      </group>
    ))}
    <Block position={[0, 0.48, 1.27]} size={[0.6, 0.14, 0.06]} color="#394b4d" />
  </group>
);

const StreetTree: React.FC<{ position: Vec3; leaf?: string }> = ({ position, leaf = "#588c69" }) => (
  <group position={position}>
    <Block position={[0, 1.1, 0]} size={[0.26, 2.2, 0.26]} color="#755844" />
    <Block position={[0, 2.55, 0]} size={[1.36, 1.18, 1.3]} map={pixelTex(leaf, [2, 2])} />
    <Block position={[-0.3, 2.95, -0.12]} size={[0.95, 0.62, 1.02]} color={leaf} />
    <Block position={[0.3, 2.92, 0.1]} size={[0.92, 0.65, 0.95]} color={leaf} />
  </group>
);

const Streetlamp: React.FC<{ position: Vec3 }> = ({ position }) => (
  <group position={position}>
    <Block position={[0, 1.45, 0]} size={[0.1, 2.9, 0.1]} color="#4d6565" />
    <Block position={[-0.27, 2.86, 0]} size={[0.6, 0.08, 0.08]} color="#4d6565" />
    <Block position={[-0.52, 2.76, 0]} size={[0.3, 0.12, 0.32]} color="#ffe4a4" emissive="#ffd588" emissiveIntensity={0.5} />
    <LightPool position={[-0.5, 0.014, 0]} width={1.3} depth={1.5} color="#ffdc95" opacity={0.13} />
  </group>
);

/** Reusable exterior, entirely in the same coordinate system as SchoolMap. */
export const NeighborhoodMap: React.FC = () => (
  <group>
    <Block position={[0, -0.12, -3.3]} size={[22, 0.2, 14]} map={pixelTex("#91b781", [14, 9], { jitter: 0.08 })} />
    <Block position={[0, -0.055, -3.3]} size={[5.7, 0.11, 14]} map={pixelTex("#4c6370", [4, 10], { jitter: 0.04 })} />
    {[-1, 1].map((side) => (
      <group key={side}>
        <Block position={[side * 3.06, -0.005, -3.3]} size={[0.58, 0.1, 14]} color="#c1c8b8" />
        <Block position={[side * 3.45, 0.12, -3.3]} size={[0.12, 0.24, 14]} color="#aebdb0" />
        {[-7.8, -5.3, -2.8, -0.3, 2.2].map((z) => (
          <Block key={z} position={[side * 3.07, 0.052, z]} size={[0.56, 0.013, 0.025]} color="#899ba0" />
        ))}
      </group>
    ))}
    {[-8.3, -6.6, -4.9, -3.2, -1.5, 0.2, 1.9].map((z) => (
      <Block key={z} position={[0, 0.004, z]} size={[0.09, 0.015, 0.85]} color="#eddcab" />
    ))}
    <House position={[-5.5, 0, -4.5]} rotationY={Math.PI / 2} walls="#e8c4aa" roof="#b85d58" name="HOME" />
    <House position={[-5.5, 0, 1.1]} rotationY={Math.PI / 2} walls="#e7d8aa" roof="#8a7775" name="12" />
    <House position={[5.7, 0, -6.7]} rotationY={-Math.PI / 2} walls="#bfd4c1" roof="#ad6959" name="14" />
    <House position={[5.7, 0, -1.1]} rotationY={-Math.PI / 2} walls="#c7d4d8" roof="#606f83" name="16" />
    <TownCar position={[3.55, 0, -3.2]} rotationY={0.1} color="#cd7963" />
    <TownCar position={[-3.05, 0, -4.3]} rotationY={Math.PI} color="#6b9ea0" />
    <StreetTree position={[-8.1, 0, -8.3]} />
    <StreetTree position={[8.0, 0, -2.8]} leaf="#71a774" />
    <Streetlamp position={[3.4, 0, 0.8]} />
    <Streetlamp position={[-3.45, 0, -5.2]} />
    <Block position={[-3.45, 0.62, -3.5]} size={[0.12, 1.24, 0.12]} color="#597070" />
    <Block position={[-3.45, 1.17, -3.5]} size={[0.34, 0.22, 0.26]} color="#cf715d" />
    <Sign position={[-3.12, 1.16, -3.5]} rotationY={Math.PI / 2} width={0.22} height={0.16} title="10" bg="#f9e7ba" fg="#304550" frame={false} />
    <Sign position={[-2.5, 2.18, -0.5]} rotationY={-Math.PI / 2} width={1.05} height={0.72} title="EGG DAY" subtitle="AGE 10" bg="#f3e3be" fg="#304b4e" accent="#ce6957" lit={0.25} />
    <Block position={[-2.58, 1.13, -0.5]} size={[0.12, 2.25, 0.12]} color="#526b69" />
    <Block position={[2.8, 0.01, 2.5]} size={[5.5, 0.03, 0.14]} color="#e6ddba" />
    <Block position={[2.8, 0.01, 2.85]} size={[5.5, 0.03, 0.14]} color="#e6ddba" />
  </group>
);
