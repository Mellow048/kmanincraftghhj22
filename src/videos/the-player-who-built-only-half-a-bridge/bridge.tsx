import type React from "react";
import { plankTex } from "../../engine";
import { Block, EmberDrift, Glow, RedstoneLamp, RedstoneLine, Sign, Vox } from "./kit";
import type { Vec3 } from "./kit";

/** Dynamic canyon bridge (`x: -2.6..+2.6, z: 0`) that evolves across every beat of the story. */
export const CanyonBridge: React.FC<{
  mode: "half" | "crater" | "open-center" | "complete";
  lampsLit?: number;
  centerLift?: number;
}> = ({ mode, lampsLit = 0, centerLift = 0 }) => {
  if (mode === "crater") {
    return (
      <group>
        {/* Shattered oak plank stubs + dark scorch marks on west ledge */}
        <Block position={[-2.35, 0.04, -0.35]} rotation={[0.05, 0.2, -0.25]} size={[0.8, 0.14, 0.9]} map={plankTex("#614328")} />
        <Block position={[-2.15, 0.01, 0.48]} rotation={[-0.08, -0.3, -0.35]} size={[0.7, 0.14, 0.75]} map={plankTex("#523821")} />
        <Vox kind="cobble" tint="#2c2d34" position={[-2.8, 0.04, 0.0]} size={[1.4, 0.06, 2.6]} />
        <Block position={[-2.55, 0.08, -0.5]} size={[0.5, 0.05, 0.5]} color="#1c1d22" castShadow={false} />
        <Block position={[-2.45, 0.08, 0.55]} size={[0.45, 0.05, 0.45]} color="#1c1d22" castShadow={false} />
        <EmberDrift position={[-2.2, 0.25, 0]} area={[1.8, 1.8, 2.2]} count={16} color="#ff8e2b" speed={0.55} />
      </group>
    );
  }

  const showEast = mode === "open-center" || mode === "complete";
  const showLamps = mode === "open-center" || mode === "complete";

  return (
    <group>
      {/* West Half: x = -2.6 to -0.35 (length 2.25m, center -1.475) */}
      <Block position={[-1.475, -0.02, 0]} size={[2.25, 0.22, 2.3]} map={plankTex("#8c6239", [2, 2])} />
      {/* West side fence rails */}
      {[-1.08, 1.08].map((z) => (
        <group key={`w${z}`}>
          <Vox kind="log" position={[-2.45, 0.45, z]} size={[0.16, 0.9, 0.16]} />
          <Vox kind="log" position={[-0.55, 0.45, z]} size={[0.16, 0.9, 0.16]} />
          <Block position={[-1.5, 0.78, z]} size={[2.0, 0.1, 0.1]} map={plankTex("#6e4c2a")} />
        </group>
      ))}

      {/* East Half (built by community): x = +0.35 to +2.6 (center +1.475) */}
      {showEast ? (
        <group>
          <Block position={[1.475, -0.02, 0]} size={[2.25, 0.22, 2.3]} map={plankTex("#8c6239", [2, 2])} />
          {[-1.08, 1.08].map((z) => (
            <group key={`e${z}`}>
              <Vox kind="log" position={[0.55, 0.45, z]} size={[0.16, 0.9, 0.16]} />
              <Vox kind="log" position={[2.45, 0.45, z]} size={[0.16, 0.9, 0.16]} />
              <Block position={[1.5, 0.78, z]} size={[2.0, 0.1, 0.1]} map={plankTex("#6e4c2a")} />
            </group>
          ))}
        </group>
      ) : null}

      {/* Redstone Lamps & Wiring along both bridge rails */}
      {showLamps ? (
        <group>
          {[
            [-2.25, -1.12],
            [-1.1, -1.12],
            [1.1, -1.12],
            [2.25, -1.12],
            [-2.25, 1.12],
            [-1.1, 1.12],
            [1.1, 1.12],
            [2.25, 1.12],
          ].map(([x, z], i) => (
            <RedstoneLamp key={i} position={[x!, 1.12, z!]} size={0.44} lit={lampsLit} />
          ))}
          <RedstoneLine from={[-2.5, 0.1, -0.9]} to={[-0.45, 0.1, -0.9]} lit={lampsLit} />
          <RedstoneLine from={[0.45, 0.1, -0.9]} to={[2.5, 0.1, -0.9]} lit={lampsLit} />
          <RedstoneLine from={[-2.5, 0.1, 0.9]} to={[-0.45, 0.1, 0.9]} lit={lampsLit} />
          <RedstoneLine from={[0.45, 0.1, 0.9]} to={[2.5, 0.1, 0.9]} lit={lampsLit} />
        </group>
      ) : null}

      {/* Center keystone oak block (x: -0.35..+0.35) */}
      {mode === "complete" ? (
        <group>
          <Block position={[0, -0.02 + centerLift * 0.45, 0]} size={[0.72, 0.22, 2.3]} map={plankTex("#a87846")} />
          <RedstoneLine from={[-0.5, 0.1, -0.9]} to={[0.5, 0.1, -0.9]} lit={lampsLit} />
          <RedstoneLine from={[-0.5, 0.1, 0.9]} to={[0.5, 0.1, 0.9]} lit={lampsLit} />
          {lampsLit > 0.2 ? <Glow position={[0, 0.6, 0]} size={2.2} color="#ffd866" opacity={0.45 * lampsLit} /> : null}
        </group>
      ) : null}
    </group>
  );
};

/** Oak cliffside Sign reading "WAIT FOR ME". */
export const WaitSign: React.FC<{ position?: Vec3; rotationY?: number; scale?: number }> = ({
  position = [-2.75, 0, 1.45],
  rotationY = 0.55,
  scale = 0.72,
}) => (
  <Sign
    position={position}
    rotationY={rotationY}
    width={1.1 * scale}
    height={0.78 * scale}
    title="WAIT FOR ME"
    lines={["HALF A BRIDGE"]}
    bg="#8a6034"
    fg="#211306"
    accent="#4a2e12"
    grid={false}
    frame
  />
);

/** Crisp oak plank item block held in hands. */
export const OakPlankItem: React.FC<{ position?: Vec3; scale?: number }> = ({
  position = [0, 0.15, 0.2],
  scale = 0.34,
}) => <Block position={position} size={[scale, scale, scale]} map={plankTex("#9a6d40")} />;
