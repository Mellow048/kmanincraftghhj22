import { Block, CeilingLight, Door, DoorFrame, Sign, WindowUnit, pixelTex } from "../../../src/engine";
import type { Vec3 } from "../../../src/engine";

/** Optional SCHOOL bathroom module. Its door faces local -Z; connect it physically to a hall before filming inside. */
export const RestroomMap: React.FC<{ position?: Vec3; rotationY?: number }> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation-y={rotationY}>
    <Block position={[0, -0.05, 2]} size={[4.4, 0.1, 4]} map={pixelTex("#8ca9a5", [4, 4])} />
    <Block position={[0, 3.35, 2]} size={[4.4, 0.1, 4]} color="#d3d2bb" />
    <Block position={[-2.26, 1.65, 2]} size={[0.12, 3.3, 4]} color="#d0dccf" />
    <Block position={[2.26, 1.65, 2]} size={[0.12, 3.3, 4]} color="#d0dccf" />
    <Block position={[0, 1.65, 4.06]} size={[4.4, 3.3, 0.12]} color="#c0d0c3" />
    <Block position={[-1.55, 1.65, -0.06]} size={[1.1, 3.3, 0.12]} color="#c0d0c3" />
    <Block position={[1.55, 1.65, -0.06]} size={[1.1, 3.3, 0.12]} color="#c0d0c3" />
    <Block position={[0, 2.76, -0.06]} size={[2.0, 1.08, 0.12]} color="#c0d0c3" />
    <DoorFrame position={[0, 0, -0.06]} width={1.9} height={2.23} />
    <Door position={[-0.95, 0, -0.1]} width={1.9} height={2.2} open={Math.PI} color="#5c8179" />
    <Sign position={[1.44, 2.38, -0.14]} rotationY={Math.PI} title="RESTROOM" width={0.68} height={0.46} bg="#f1e9cd" fg="#304550" />
    {[0.5, 1.5].map((z) => (
      <group key={z}>
        <Block position={[-1.55, 0.5, z]} size={[0.42, 1, 0.63]} color="#eff1dd" />
        <Block position={[-1.52, 0.96, z]} size={[0.56, 0.1, 0.57]} color="#f9faed" />
        <Block position={[-1.63, 1.8, z]} size={[0.05, 1.9, 0.85]} color="#5c827a" />
      </group>
    ))}
    <Block position={[1.45, 0.84, 1.55]} size={[0.68, 0.28, 0.48]} color="#f6f5e7" />
    <Block position={[1.45, 1.6, 1.54]} size={[0.68, 0.73, 0.05]} color="#95b9b6" metalness={0.25} roughness={0.2} />
    <Block position={[1.45, 1.05, 1.91]} size={[0.25, 0.07, 0.06]} color="#7d9696" metalness={0.55} />
    <WindowUnit position={[0, 2.4, 4.0]} rotationY={Math.PI} width={1.0} height={0.6} dim={0.35} />
    <CeilingLight position={[0, 3.27, 1.7]} size={[0.65, 0.22]} intensity={4} />
  </group>
);
