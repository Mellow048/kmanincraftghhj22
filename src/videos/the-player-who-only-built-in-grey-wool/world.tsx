import type React from "react";
import { Block, Dust, Glow, GodRay, LightPool, Torch, Tree, Vox, Zone, pixelTex, plankTex, wordBitmap, wordTexture } from "../../engine";
import { useMemo } from "react";
import { ClassroomRoom, DeskSetup, Hut, PLACE, ScoreboardWall, on } from "./kit";
import type { Vec3 } from "../../engine";

/** Sam's house in 3 distinct visual states: plain grey wool, pranked neon pink/lime, or texture-rich brick/oak/lanterns. */
export const SamHouse: React.FC<{ position?: Vec3; state?: "grey" | "pranked" | "rebuilt" }> = ({
  position = [0, 0, 0],
  state = "grey",
}) => {
  const wallCol = state === "grey" ? "#8b8f96" : state === "pranked" ? "#f24cb4" : "#9c4a3a";
  const trimCol = state === "grey" ? "#6d7178" : state === "pranked" ? "#66e038" : "#6c4828";
  const roofCol = state === "grey" ? "#5b5f66" : state === "pranked" ? "#d92694" : "#4e321d";
  return (
    <group position={position}>
      {/* Main house cube (exterior front sits at z = +2.0 so staging stays strictly at z >= +2.5) */}
      <Block position={[0, 1.5, 0]} size={[4.2, 3.0, 4.0]} map={state === "rebuilt" ? plankTex(wallCol) : pixelTex(wallCol)} />
      {/* Corner pillars */}
      {[-2.05, 2.05].flatMap((x) =>
        [-1.95, 1.95].map((z, i) => (
          <Block key={`${x}${i}`} position={[x, 1.5, z]} size={[0.35, 3.05, 0.35]} color={trimCol} />
        )),
      )}
      {/* Stepped roof */}
      <Block position={[0, 3.2, 0]} size={[4.7, 0.45, 4.5]} color={roofCol} />
      <Block position={[0, 3.6, 0]} size={[3.6, 0.42, 3.5]} color={roofCol} />
      {/* Front doorway recess at z = +2.02 */}
      <Block position={[0, 1.05, 2.02]} size={[1.05, 2.1, 0.08]} color="#161922" />
      <Block position={[0, 2.18, 2.06]} size={[1.25, 0.16, 0.14]} color={trimCol} />
      {/* Windows */}
      {[-1.25, 1.25].map((x) => (
        <Block
          key={x}
          position={[x, 1.6, 2.02]}
          size={[0.72, 0.72, 0.06]}
          color={state === "rebuilt" ? "#ffe39c" : "#9ec6db"}
          emissive={state === "rebuilt" ? "#ffcf70" : "#000000"}
          emissiveIntensity={state === "rebuilt" ? 0.55 : 0}
        />
      ))}
      {state === "rebuilt" ? (
        <>
          <Torch position={[-0.85, 1.95, 2.22]} light={1.8} />
          <Torch position={[0.85, 1.95, 2.22]} light={1.8} />
        </>
      ) : null}
    </group>
  );
};

/** Giant labeled Color & Texture Palette Wall built by the server so Sam can tell every color by texture + sign. */
export const PaletteWall: React.FC<{ position?: Vec3; rotationY?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
}) => {
  const rows = [
    { label: "RED = BRICK", color: "#a64336" },
    { label: "BLUE = ICE", color: "#55a8e8" },
    { label: "GOLD = GLOW", color: "#f2c94c" },
    { label: "OAK = WOOD", color: "#8c6138" },
  ];
  const labels = useMemo(
    () =>
      rows.map((r) => ({
        ...r,
        tex: wordTexture(r.label),
        w: Math.min(1.6, Math.max(0.6, (wordBitmap(r.label).width / 11) * 0.17)),
      })),
    [],
  );

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Block position={[0, 1.6, -0.15]} size={[3.6, 3.2, 0.25]} map={plankTex("#593d24")} />
      {labels.map((item, i) => {
        const y = 2.65 - i * 0.68;
        return (
          <group key={i} position={[0, y, 0]}>
            <Block position={[-1.25, 0, 0.12]} size={[0.52, 0.52, 0.32]} color={item.color} emissive={i === 2 ? "#f2c94c" : "#000000"} emissiveIntensity={i === 2 ? 0.45 : 0} />
            <Block position={[0.4, 0, 0.02]} size={[2.0, 0.42, 0.05]} color="#171b24" />
            <mesh position={[0.4, 0, 0.06]}>
              <planeGeometry args={[item.w, 0.17]} />
              <meshBasicMaterial map={item.tex} color="#ffffff" transparent alphaTest={0.5} toneMapped={false} fog={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export const World: React.FC = () => (
  <>
    {/* ---- ZONE 1: Minecraft SMP Spawn & Sam's Yard ---- */}
    <Zone name="server">
      <Vox kind="grass" position={on(PLACE.server, 0, -0.25, 0)} size={[38, 0.5, 38]} />
      <Vox kind="cobble" position={on(PLACE.server, 0, 0.02, 1.5)} size={[10, 0.08, 12]} />
      {/* Colorful neighbor houses in the background to contrast Sam's grey build */}
      <Hut at={on(PLACE.server, -6.5, 0, -4.5)} tint="#c94b3b" roof="#3d6cb8" />
      <Hut at={on(PLACE.server, 6.5, 0, -4.2)} tint="#e0a838" roof="#2d8a5e" />
      <ScoreboardWall
        title="SERVER BUILDS"
        rows={[
          { label: "ALEX", value: "9/10", color: "#5ef28e" },
          { label: "SAM", value: "GREY", color: "#b8bec9" },
        ]}
        position={on(PLACE.server, -4.2, 0, 0.8)}
        rotationY={0.42}
      />
      <Tree position={on(PLACE.server, -8.2, 0, 3.0)} height={4.5} />
      <Tree position={on(PLACE.server, 8.2, 0, 2.8)} height={4.4} />
      <Torch position={on(PLACE.server, -2.8, 1.4, 3.2)} light={0} />
      <Torch position={on(PLACE.server, 2.8, 1.4, 3.2)} light={0} />
      <GodRay position={on(PLACE.server, 0, 6.2, -1.5)} rotation={[0, 0, 0.2]} width={4.5} height={11} color="#fff3d4" opacity={0.07} />
      <LightPool position={on(PLACE.server, 0, 0.03, 1.5)} width={10} depth={10} color="#fff4d6" opacity={0.2} />
      <Glow position={on(PLACE.server, 0, 3.0, -1.8)} size={2.2} color="#ffe8a3" opacity={0.18} />
      <Dust position={on(PLACE.server, 0, 2.1, 1.0)} area={[10, 4, 10]} count={32} size={0.034} color="#fff7dc" opacity={0.45} seed={17} speed={0.18} />
      <pointLight position={on(PLACE.server, -2.5, 4.8, 4.0)} color="#fff5e0" intensity={6.5} distance={18} decay={1.5} />
    </Zone>

    {/* ---- ZONE 2: IRL PC Desk Cutaway ---- */}
    <Zone name="irl">
      <Block position={on(PLACE.irl, 0, -0.2, 0)} size={[10, 0.4, 10]} map={plankTex("#735234", [4, 4])} />
      <Block position={on(PLACE.irl, 0, 2.1, -3.2)} size={[10, 4.2, 0.4]} color="#263245" />
      <DeskSetup position={on(PLACE.irl, 0, 0, -1.2)} screenText="GREY WOOL ONLY" screenColor="#7ac8ff" clockText="8:15 PM" lampOn={false} />
      <LightPool position={on(PLACE.irl, 0, 0.03, -0.4)} width={5.5} depth={5.5} color="#a9d4ff" opacity={0.18} />
      <pointLight position={on(PLACE.irl, 0, 3.2, 1.5)} color="#cfe4ff" intensity={5.5} distance={12} decay={2} />
    </Zone>

    {/* ---- ZONE 3: IRL School Art Classroom Cutaway ---- */}
    <Zone name="cave">
      <ClassroomRoom position={PLACE.cave} boardText="ART CLASS" />
    </Zone>
  </>
);
