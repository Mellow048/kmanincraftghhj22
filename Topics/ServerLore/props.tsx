import type React from "react";
import { useMemo } from "react";
import * as THREE from "three";
import { Block, EmberDrift, Glow, Vox, clamp01, mulberry32, pixelTex, plankTex, useFilmTime, wordBitmap, wordTexture } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { SoundRings } from "../Shared";

/**
 * SERVER LORE SMP & REDSTONE PROPS — 100% 3D world-space readable storytelling props.
 * Zero 2D HTML overlays, zero bare single-cube substitutes.
 */

export type ChatEntry = {
  sender?: string;
  text: string;
  color?: string;
  whisper?: boolean;
};

/** Stacked multi-line 3D Minecraft server chat window floating in world space (always use upper-55% or clear of captions). */
export const ServerChatBox: React.FC<{
  lines: ChatEntry[];
  position?: Vec3;
  rotationY?: number;
  lineHeight?: number;
  scale?: number;
}> = ({ lines, position = [0, 2.0, 0], rotationY = 0, lineHeight = 0.21, scale = 1 }) => {
  const rendered = useMemo(
    () =>
      lines.map((entry) => {
        const line = entry.whisper && entry.sender
          ? `${entry.sender} whispers to you: ${entry.text}`
          : entry.sender
            ? `<${entry.sender}> ${entry.text}`
            : entry.text;
        const tex = wordTexture(line);
        const { width: gw } = wordBitmap(line);
        const textW = Math.max(0.45, ((gw + 2) / 11) * lineHeight);
        const color = entry.color ?? (entry.whisper ? "#d38aff" : entry.sender ? "#ffffff" : "#ffeb5c");
        return { tex, textW, color };
      }),
    [lines, lineHeight],
  );

  if (rendered.length === 0) return null;
  const maxW = Math.max(...rendered.map((r) => r.textW)) + 0.34;
  const rowStep = lineHeight * 1.38;
  const boxH = rendered.length * rowStep + 0.14;

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <mesh position={[0, 0, -0.015]}>
        <planeGeometry args={[maxW, boxH]} />
        <meshBasicMaterial color="#090b12" transparent opacity={0.74} side={THREE.DoubleSide} fog={false} />
      </mesh>
      {rendered.map((item, i) => {
        const y = boxH / 2 - 0.1 - (i + 0.5) * rowStep;
        return (
          <mesh key={i} position={[-maxW / 2 + 0.17 + item.textW / 2, y, 0]}>
            <planeGeometry args={[item.textW, lineHeight]} />
            <meshBasicMaterial map={item.tex} color={item.color} transparent alphaTest={0.5} side={THREE.DoubleSide} toneMapped={false} fog={false} />
          </mesh>
        );
      })}
    </group>
  );
};

/** Large Spawn Scoreboard Wall displaying live counter rankings (e.g. `CREEPER DEATHS: ELI - 47` -> `0`). */
export const ScoreboardWall: React.FC<{
  title: string;
  rows: Array<{ label: string; value: string | number; color?: string }>;
  position?: Vec3;
  rotationY?: number;
  width?: number;
}> = ({ title, rows, position = [0, 0, 0], rotationY = 0, width = 3.2 }) => {
  const height = 0.85 + Math.max(1, rows.length) * 0.42;
  const titleTex = useMemo(() => wordTexture(title), [title]);
  const titleW = Math.min(width - 0.4, Math.max(0.8, (wordBitmap(title).width / 11) * 0.25));

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Supporting oak posts & stone plinth */}
      <Vox kind="stoneBrick" position={[0, 0.22, 0]} size={[width + 0.35, 0.44, 0.56]} />
      <Vox kind="darkPlanks" position={[-width / 2 + 0.12, height / 2 + 0.44, -0.08]} size={[0.18, height, 0.22]} />
      <Vox kind="darkPlanks" position={[width / 2 - 0.12, height / 2 + 0.44, -0.08]} size={[0.18, height, 0.22]} />
      {/* Dark slate display panel */}
      <Block position={[0, height / 2 + 0.44, 0]} size={[width, height, 0.16]} color="#151923" />
      <Block position={[0, height + 0.44, 0]} size={[width + 0.16, 0.12, 0.24]} color="#4a311c" />
      {/* Header text */}
      <mesh position={[0, height + 0.14, 0.088]}>
        <planeGeometry args={[titleW, 0.25]} />
        <meshBasicMaterial map={titleTex} color="#ffd84f" transparent alphaTest={0.5} toneMapped={false} fog={false} />
      </mesh>
      <Block position={[0, height - 0.03, 0.086]} size={[width - 0.28, 0.025, 0.01]} color="#4d556e" castShadow={false} />
      {/* Rows */}
      {rows.map((row, i) => {
        const y = height - 0.32 - i * 0.4;
        const lTex = wordTexture(row.label);
        const vTex = wordTexture(String(row.value));
        const lW = Math.min(width * 0.58, Math.max(0.35, (wordBitmap(row.label).width / 11) * 0.22));
        const vW = Math.min(width * 0.28, Math.max(0.2, (wordBitmap(String(row.value)).width / 11) * 0.24));
        return (
          <group key={i} position={[0, y, 0.09]}>
            <mesh position={[-width / 2 + 0.26 + lW / 2, 0, 0]}>
              <planeGeometry args={[lW, 0.22]} />
              <meshBasicMaterial map={lTex} color={row.color ?? "#f0f4ff"} transparent alphaTest={0.5} toneMapped={false} fog={false} />
            </mesh>
            <mesh position={[width / 2 - 0.26 - vW / 2, 0, 0]}>
              <planeGeometry args={[vW, 0.24]} />
              <meshBasicMaterial map={vTex} color={row.color ?? "#ff5b4d"} transparent alphaTest={0.5} toneMapped={false} fog={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

/** Glowing 3D digital alarm clock (`3:00 AM`) with optional vibrating alarm bells (`alarm = 0..1`). */
export const Clock3AM: React.FC<{
  text?: string;
  alarm?: number;
  color?: string;
  position?: Vec3;
  rotationY?: number;
  scale?: number;
}> = ({ text = "3:00 AM", alarm = 0, color = "#ff4e3f", position = [0, 0, 0], rotationY = 0, scale = 1 }) => {
  const t = useFilmTime();
  const shake = alarm > 0.05 ? Math.sin(t * 36) * 0.08 * alarm : 0;
  const tex = useMemo(() => wordTexture(text), [text]);
  const w = Math.max(0.38, (wordBitmap(text).width / 11) * 0.14);

  return (
    <group position={position} rotation={[0, rotationY, shake]} scale={scale}>
      <Block position={[0, 0.14, 0]} size={[w + 0.16, 0.28, 0.18]} color="#161b24" />
      <Block position={[0, 0.14, 0.092]} size={[w + 0.08, 0.2, 0.015]} color="#080b10" castShadow={false} />
      <mesh position={[0, 0.14, 0.104]}>
        <planeGeometry args={[w, 0.14]} />
        <meshBasicMaterial map={tex} color={color} transparent alphaTest={0.5} toneMapped={false} fog={false} />
      </mesh>
      {/* Twin top alarm bells */}
      {[-0.14, 0.14].map((x, i) => (
        <group key={i} position={[x, 0.31, 0]}>
          <Block size={[0.09, 0.06, 0.09]} color="#c99e3a" metalness={0.35} roughness={0.35} />
        </group>
      ))}
      <Glow position={[0, 0.14, 0.16]} size={0.7 + alarm * 0.45} color={color} opacity={0.22 + alarm * 0.3} />
    </group>
  );
};

/** Detailed leather-bound Book & Quill resting on a desk, pedestal, or chest interior. */
export const WritableBook: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  scale?: number;
  cover?: string;
  glow?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, cover = "#6c2824", glow = 0.15 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.04, 0]} size={[0.32, 0.075, 0.4]} map={pixelTex(cover)} />
    <Block position={[0.018, 0.042, 0]} size={[0.27, 0.055, 0.35]} color="#f4ecd2" castShadow={false} />
    <Block position={[-0.15, 0.042, 0]} size={[0.04, 0.082, 0.41]} color="#d4a738" />
    {/* White quill feather angled upward */}
    <group position={[0.1, 0.14, -0.06]} rotation={[0.25, 0, -0.35]}>
      <Block position={[0, 0, 0]} size={[0.025, 0.24, 0.025]} color="#f4f2ec" />
      <Block position={[0, 0.09, 0]} size={[0.075, 0.14, 0.015]} color="#ffffff" emissive="#ffffff" emissiveIntensity={glow} castShadow={false} />
    </group>
  </group>
);

/** Hinged Minecraft plank chest whose lid opens smoothly (`open: 0..1`) showing books, gold, or emptiness. */
export const OpeningChest: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  open?: number;
  contents?: "book" | "books" | "gold" | "empty";
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, open = 0, contents = "book" }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Vox kind="planks" tint="#a8763a" position={[0, 0.28, 0]} size={[0.9, 0.56, 0.9]} />
    {[-0.45, 0.45].map((x) => (
      <Block key={x} position={[x, 0.28, 0]} size={[0.04, 0.58, 0.92]} color="#3a2916" />
    ))}
    {contents === "book" ? (
      <>
        <WritableBook position={[0, 0.54, 0.04]} rotation={[0, 0.22, 0]} scale={1.15} glow={0.35 * open} />
        {open > 0.25 ? <Glow position={[0, 0.85, 0.04]} size={1.3} color="#ffe399" opacity={0.35 * open} /> : null}
      </>
    ) : contents === "books" ? (
      <>
        {[
          [-0.18, 0.56, -0.08, "#9c2b27", 0.15],
          [0.14, 0.56, -0.05, "#28589c", -0.2],
          [-0.02, 0.63, 0.08, "#2b7844", 0.3],
          [0.05, 0.71, -0.02, "#c98b2a", -0.1],
        ].map(([x, y, z, color, ry], i) => (
          <WritableBook key={i} position={[x as number, y as number, z as number]} rotation={[0, ry as number, 0]} cover={color as string} glow={0.3 * open} />
        ))}
        {open > 0.2 ? <Glow position={[0, 0.95, 0]} size={1.7} color="#ffdf7e" opacity={0.4 * open} /> : null}
      </>
    ) : contents === "gold" ? (
      <>
        <Block position={[0, 0.55, 0]} size={[0.78, 0.18, 0.78]} color="#f5c632" emissive="#f5c632" emissiveIntensity={0.28 * open} />
        {open > 0.2 ? <Glow position={[0, 0.9, 0]} size={1.6} color="#ffdf7a" opacity={0.35 * open} /> : null}
      </>
    ) : null}

    {/* Hinged top lid pivoting along -Z edge */}
    <group position={[0, 0.56, -0.45]} rotation={[-1.25 * clamp01(open), 0, 0]}>
      <Vox kind="planks" tint="#a8763a" position={[0, 0.14, 0.45]} size={[0.9, 0.28, 0.9]} />
      {[-0.45, 0.45].map((x) => (
        <Block key={x} position={[x, 0.14, 0.45]} size={[0.04, 0.3, 0.92]} color="#3a2916" />
      ))}
      <Block position={[0, 0.03, 0.915]} size={[0.14, 0.2, 0.05]} color="#d8dfe5" metalness={0.3} roughness={0.4} />
    </group>
  </group>
);

/** Deep Dark Sculk Sensor with articulated flapping cyan tendrils & visible sound pulses when triggered (`active: 0..1`). */
export const SculkSensor: React.FC<{
  position?: Vec3;
  scale?: number;
  active?: number;
}> = ({ position = [0, 0, 0], scale = 1, active = 0 }) => {
  const t = useFilmTime();
  const pulse = clamp01(active);
  const wiggle = pulse * Math.sin(t * 18) * 0.38;
  return (
    <group position={position} scale={scale}>
      <Block position={[0, 0.22, 0]} size={[0.92, 0.44, 0.92]} map={pixelTex("#0c2832")} />
      <Block position={[0, 0.45, 0]} size={[0.74, 0.04, 0.74]} color="#103946" emissive="#18b6b0" emissiveIntensity={0.2 + 0.8 * pulse} castShadow={false} />
      {[
        [-0.25, -0.25],
        [0.25, -0.25],
        [-0.25, 0.25],
        [0.25, 0.25],
      ].map(([x, z], i) => (
        <group key={i} position={[x!, 0.46, z!]} rotation={[i % 2 ? wiggle : -wiggle, 0, i < 2 ? wiggle : -wiggle]}>
          <Block position={[0, 0.16, 0]} size={[0.1, 0.32, 0.1]} color="#169f9e" emissive="#22efe0" emissiveIntensity={0.3 + 1.15 * pulse} />
          <Block position={[0, 0.34, 0]} size={[0.15, 0.08, 0.15]} color="#5cf7eb" emissive="#5cf7eb" emissiveIntensity={0.4 + 1.4 * pulse} castShadow={false} />
        </group>
      ))}
      {pulse > 0.15 ? (
        <>
          <Glow position={[0, 0.75, 0]} size={1.8 * (0.6 + 0.4 * pulse)} color="#26f2e2" opacity={0.42 * pulse} />
          <pointLight position={[0, 0.9, 0]} color="#2bf2e0" intensity={3.5 * pulse} distance={5} decay={2} />
          <SoundRings position={[0, 0.7, 0]} t={(t * 1.4) % 1} color="#4af7ea" reach={1.1} />
        </>
      ) : null}
    </group>
  );
};

/** Crafted oak-framed Redstone Lamp switching cleanly between dark unlit bronze and warm glowing golden light. */
export const RedstoneLamp: React.FC<{
  position?: Vec3;
  size?: number;
  lit?: number;
}> = ({ position = [0, 0, 0], size = 0.92, lit = 0 }) => {
  const glow = clamp01(lit);
  const coreColor = glow > 0.25 ? "#ffd559" : "#4a301e";
  return (
    <group position={position}>
      <Block size={[size, size, size]} color={coreColor} emissive="#ffb228" emissiveIntensity={1.35 * glow} roughness={0.6} />
      {/* Framed dark oak mullions */}
      <Block position={[0, 0, 0]} size={[size + 0.03, size * 0.14, size + 0.03]} color="#2f1c10" />
      <Block position={[0, 0, 0]} size={[size * 0.14, size + 0.03, size + 0.03]} color="#2f1c10" />
      <Block position={[0, 0, 0]} size={[size + 0.03, size + 0.03, size * 0.14]} color="#2f1c10" />
      {glow > 0.15 ? (
        <>
          <Glow position={[0, 0, 0]} size={size * 2.5} color="#ffd054" opacity={0.4 * glow} />
          <pointLight color="#ffbf47" intensity={4.2 * glow} distance={6.5} decay={2} />
        </>
      ) : null}
    </group>
  );
};

/** Continuous redstone dust wire running along a floor path from `from` to `to`. */
export const RedstoneLine: React.FC<{
  from: Vec3;
  to: Vec3;
  lit?: number;
}> = ({ from, to, lit = 0 }) => {
  const power = clamp01(lit);
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const len = Math.max(0.05, Math.hypot(dx, dz));
  const yaw = Math.atan2(dx, dz);
  const mid: Vec3 = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + 0.018, (from[2] + to[2]) / 2];
  return (
    <group position={mid} rotation={[0, yaw, 0]}>
      <Block size={[0.14, 0.025, len]} color={power > 0.2 ? "#ff291f" : "#681414"} emissive="#ff3322" emissiveIntensity={1.2 * power} castShadow={false} />
    </group>
  );
};

/** Glowing obsidian-bordered lava pit emitting light & fiery embers for cruel griefing beats. */
export const ObsidianLavaPit: React.FC<{
  position?: Vec3;
  size?: number;
}> = ({ position = [0, 0, 0], size = 2.4 }) => {
  const t = useFilmTime();
  const pulse = 1.05 + Math.sin(t * 4.5) * 0.15;
  const cells = useMemo(() => {
    const rand = mulberry32(404);
    return Array.from({ length: 6 }, (_, i) => ({
      x: (rand() - 0.5) * (size - 0.8),
      z: (rand() - 0.5) * (size - 0.8),
      s: 0.25 + rand() * 0.22,
      p: i * 1.1,
    }));
  }, [size]);

  return (
    <group position={position}>
      {/* Obsidian outer rim */}
      <Block position={[0, 0.25, -size / 2]} size={[size + 0.5, 0.5, 0.45]} map={pixelTex("#1c1528")} />
      <Block position={[0, 0.25, size / 2]} size={[size + 0.5, 0.5, 0.45]} map={pixelTex("#1c1528")} />
      <Block position={[-size / 2, 0.25, 0]} size={[0.45, 0.5, size]} map={pixelTex("#1c1528")} />
      <Block position={[size / 2, 0.25, 0]} size={[0.45, 0.5, size]} map={pixelTex("#1c1528")} />
      {/* Glowing molten pool */}
      <Block position={[0, 0.18, 0]} size={[size - 0.25, 0.12, size - 0.25]} color="#ff6014" emissive="#ff520d" emissiveIntensity={pulse} />
      {cells.map((c, i) => (
        <Block key={i} position={[c.x, 0.245, c.z]} size={[c.s, 0.04, c.s]} color="#ffbe33" emissive="#ff9f1a" emissiveIntensity={1.4 * pulse} castShadow={false} />
      ))}
      <Glow position={[0, 0.9, 0]} size={size * 1.4} color="#ff6d1f" opacity={0.35} />
      <pointLight position={[0, 0.8, 0]} color="#ff6d1f" intensity={5.5} distance={8} decay={2} />
      <EmberDrift position={[0, 0.25, 0]} area={[size * 0.8, 2.4, size * 0.8]} count={20} color="#ff8e2b" speed={0.7} />
    </group>
  );
};
