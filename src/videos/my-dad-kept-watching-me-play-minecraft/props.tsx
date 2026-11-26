import type React from "react";
import { useMemo } from "react";
import * as THREE from "three";
import {
  Bed,
  Block,
  Glow,
  LightPool,
  OpeningChest,
  ServerPlayer,
  Torch,
  Vox,
} from "../../../Topics/ServerLore";
import type { ServerPlayerProps } from "../../../Topics/ServerLore";
import { plankTex, useFilmTime, wordBitmap, wordTexture } from "../../engine";
import type { Vec3 } from "../../engine";

/** Son protagonist ("Sam") in blue hoodie. */
export const Son: React.FC<Omit<ServerPlayerProps, "role">> = ({ nameTag = "Sam", ...rest }) => (
  <ServerPlayer role="hero" nameTag={nameTag} {...rest} />
);

/** Dad co-op protagonist in warm flannel sweater & warm brownish-gray hair. */
export const Dad: React.FC<Omit<ServerPlayerProps, "role">> = ({ nameTag = "Dad", face = "bearded", ...rest }) => (
  <ServerPlayer
    role="mom"
    shirtColor="#7d4a2c"
    skin="#edc49f"
    hair="#4e443e"
    nameTag={nameTag}
    face={face}
    {...rest}
  />
);

/** Crafted Minecraft wooden + iron shield prop (`held` front/hand scale). */
export const WoodenShield: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  scale?: number;
  glowing?: boolean;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, glowing = false }) => (
  <group position={position} rotation={rotation} scale={scale}>
    {/* Main oak plank slab */}
    <Block position={[0, 0, 0]} size={[0.56, 0.88, 0.07]} map={plankTex("#9c6d3b", [1, 2])} />
    {/* Outer dark iron border trim */}
    <Block position={[-0.26, 0, 0.01]} size={[0.07, 0.9, 0.085]} color="#4e5866" metalness={0.45} roughness={0.35} />
    <Block position={[0.26, 0, 0.01]} size={[0.07, 0.9, 0.085]} color="#4e5866" metalness={0.45} roughness={0.35} />
    <Block position={[0, 0.42, 0.01]} size={[0.58, 0.07, 0.085]} color="#4e5866" metalness={0.45} roughness={0.35} />
    <Block position={[0, -0.42, 0.01]} size={[0.58, 0.07, 0.085]} color="#4e5866" metalness={0.45} roughness={0.35} />
    {/* Center iron boss + handle grip */}
    <Block position={[0, 0.02, 0.05]} size={[0.16, 0.24, 0.04]} color="#cfd8e3" metalness={0.6} roughness={0.28} />
    <Block position={[0, 0, -0.07]} size={[0.08, 0.28, 0.08]} color="#3a2818" />
    {glowing ? <Glow position={[0, 0, 0.14]} size={1.15} color="#63d8ff" opacity={0.35} /> : null}
  </group>
);

/** Crisp voxel iron axe tool prop for Dad chopping oak trees cleanly. */
export const IronAxe: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  scale?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.28, 0]} size={[0.07, 0.72, 0.07]} map={plankTex("#6e4724")} />
    <Block position={[0.14, 0.56, 0]} size={[0.26, 0.22, 0.09]} color="#c9d2dc" metalness={0.55} roughness={0.3} />
    <Block position={[0.22, 0.44, 0]} size={[0.14, 0.12, 0.085]} color="#aeb8c4" metalness={0.55} roughness={0.3} />
  </group>
);

/** Pickable bobbing/spinning dropped Minecraft wood plank or log block item in crater/forest. */
export const DroppedBlock: React.FC<{
  position?: Vec3;
  kind?: "plank" | "log";
  seed?: number;
}> = ({ position = [0, 0.3, 0], kind = "plank", seed = 1 }) => {
  const clock = useFilmTime();
  const yBob = 0.32 + Math.sin(clock * 3.4 + seed * 1.7) * 0.11;
  const spin = clock * 1.8 + seed * 1.1;
  return (
    <group position={[position[0], position[1] + yBob, position[2]]} rotation={[0.08, spin, 0.06]}>
      <Block
        position={[0, 0, 0]}
        size={[0.34, 0.34, 0.34]}
        map={plankTex(kind === "log" ? "#6b4928" : "#a87b4a")}
      />
      {kind === "log" ? <Block position={[0, 0.175, 0]} size={[0.26, 0.014, 0.26]} map={plankTex("#b88a55")} /> : null}
      <Glow position={[0, 0, 0]} size={0.62} color="#ffe39a" opacity={0.18} />
    </group>
  );
};

/** Classic Minecraft white/gray death smoke puff burst when a player dies. */
export const DeathPuff: React.FC<{
  position?: Vec3;
  age?: number;
}> = ({ position = [0, 0, 0], age = 0 }) => {
  if (age < 0 || age > 1.35) return null;
  const p = Math.min(1, age / 0.9);
  const fade = Math.max(0, 1 - Math.max(0, (age - 0.35) / 0.9));
  if (fade <= 0.02) return null;
  const puffs: [number, number, number, number][] = [
    [0, 0.7, 0, 0.58],
    [-0.45, 0.9, 0.32, 0.48],
    [0.48, 0.85, -0.25, 0.5],
    [-0.25, 1.35, -0.35, 0.44],
    [0.32, 1.45, 0.35, 0.46],
    [0, 1.85, 0, 0.4],
    [-0.58, 0.5, -0.15, 0.42],
    [0.55, 0.55, 0.28, 0.42],
  ];
  return (
    <group position={position}>
      {puffs.map(([ox, oy, oz, sz], i) => (
        <Block
          key={i}
          position={[ox * (0.4 + p * 1.15), oy + p * (0.65 + (i % 3) * 0.25), oz * (0.4 + p * 1.15)]}
          size={[sz * (1 + p * 0.45) * fade, sz * (1 + p * 0.45) * fade, sz * (1 + p * 0.45) * fade]}
          color={i % 2 === 0 ? "#f2f4f7" : "#cfd6df"}
          opacity={fade * 0.92}
          transparent
          castShadow={false}
        />
      ))}
    </group>
  );
};

/** Collectible floating oak log item dropped cleanly after chopping wood. */
export const OakLogDrop: React.FC<{
  position?: Vec3;
  spin?: number;
  scale?: number;
}> = ({ position = [0, 0.4, 0], spin = 0, scale = 1 }) => (
  <group position={position} rotation={[0.12, spin, 0.08]} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.38, 0.38, 0.38]} map={plankTex("#6e4c2a")} />
    <Block position={[0, 0.195, 0]} size={[0.3, 0.015, 0.3]} map={plankTex("#b88a55")} />
    <Glow position={[0, 0, 0]} size={0.75} color="#ffd77d" opacity={0.22} />
  </group>
);

/** Sleek open silver laptop running co-op Minecraft LAN on kitchen/bedroom table. */
export const Laptop: React.FC<{
  position?: Vec3;
  rotationY?: number;
  screenText?: string;
  screenColor?: string;
  scale?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, screenText = "MC LAN", screenColor = "#4ce68f", scale = 1 }) => {
  const tex = useMemo(() => wordTexture(screenText), [screenText]);
  const w = Math.min(0.66, Math.max(0.32, (wordBitmap(screenText).width / 11) * 0.1));
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* Brushed silver aluminum deck + dark key bed */}
      <Block position={[0, 0.025, 0.12]} size={[0.78, 0.04, 0.52]} color="#c8ced6" metalness={0.45} roughness={0.35} />
      <Block position={[0, 0.048, 0.06]} size={[0.64, 0.015, 0.26]} color="#252932" />
      <Block position={[0, 0.048, 0.27]} size={[0.24, 0.012, 0.12]} color="#98a0ac" />
      {/* Tilted display lid facing +Z */}
      <group position={[0, 0.05, -0.13]} rotation={[-0.22, 0, 0]}>
        <Block position={[0, 0.28, 0]} size={[0.78, 0.52, 0.035]} color="#bcc3cd" metalness={0.45} roughness={0.35} />
        <Block position={[0, 0.28, 0.02]} size={[0.7, 0.44, 0.012]} color="#10202a" emissive={screenColor} emissiveIntensity={0.65} castShadow={false} />
        <mesh position={[0, 0.28, 0.028]}>
          <planeGeometry args={[w, 0.11]} />
          <meshBasicMaterial map={tex} color="#ffffff" transparent alphaTest={0.5} toneMapped={false} fog={false} />
        </mesh>
        <Glow position={[0, 0.28, 0.1]} size={0.9} color={screenColor} opacity={0.18} />
      </group>
    </group>
  );
};

/** 3-state hero SMP starter house (`intact` -> `crater` blast ruin -> `rebuilt` cozy twin-bed base). */
export const StarterHouse: React.FC<{
  position?: Vec3;
  rotationY?: number;
  state?: "intact" | "crater" | "rebuilt";
}> = ({ position = [0, 0, 0], rotationY = 0, state = "intact" }) => {
  const isRebuilt = state === "rebuilt";
  const isCrater = state === "crater";

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Cobblestone foundation pad */}
      <Vox kind="cobble" position={[0, 0.08, 0]} size={[5.4, 0.16, 4.6]} />

      {/* Left corner log pillars + intact left wall */}
      <Block position={[-2.35, 1.45, -1.9]} size={[0.55, 2.7, 0.55]} map={plankTex("#583a22")} />
      <Block position={[2.35, 1.45, -1.9]} size={[0.55, 2.7, 0.55]} map={plankTex("#583a22")} />
      <Block position={[2.35, 1.45, 1.9]} size={[0.55, 2.7, 0.55]} map={plankTex("#583a22")} />
      {!isCrater ? <Block position={[-2.35, 1.45, 1.9]} size={[0.55, 2.7, 0.55]} map={plankTex("#583a22")} /> : null}

      {/* Back wall (partially torn left corner if crater) */}
      <Block position={[isCrater ? 0.65 : 0, 1.45, -1.95]} size={[isCrater ? 3.1 : 4.2, 2.6, 0.38]} map={plankTex("#a87b4a", [3, 2])} />
      {/* Right wall with sunlit window */}
      <Block position={[2.35, 0.72, 0]} size={[0.38, 1.2, 3.3]} map={plankTex("#a87b4a", [2, 1])} />
      <Block position={[2.35, 2.22, 0]} size={[0.38, 1.1, 3.3]} map={plankTex("#a87b4a", [2, 1])} />
      <Block position={[2.35, 1.5, 0]} size={[0.14, 0.75, 1.5]} color="#a7dcff" opacity={0.62} transparent castShadow={false} />

      {/* Left wall: solid/window when intact/rebuilt, blasted hole when crater */}
      {!isCrater ? (
        <>
          <Block position={[-2.35, 0.72, 0]} size={[0.38, 1.2, 3.3]} map={plankTex("#a87b4a", [2, 1])} />
          <Block position={[-2.35, 2.22, 0]} size={[0.38, 1.1, 3.3]} map={plankTex("#a87b4a", [2, 1])} />
          <Block position={[-2.35, 1.5, 0]} size={[0.14, 0.75, 1.5]} color="#a7dcff" opacity={0.62} transparent castShadow={false} />
        </>
      ) : (
        <Block position={[-2.35, 0.55, -0.9]} size={[0.4, 0.85, 1.2]} map={plankTex("#6e4d2e")} />
      )}

      {/* Front wall + doorway: blown open cleanly in crater state so inside ruin shows! */}
      {!isCrater ? (
        <>
          <Block position={[-1.4, 1.45, 1.9]} size={[1.45, 2.6, 0.38]} map={plankTex("#a87b4a", [1, 2])} />
          <Block position={[1.4, 1.45, 1.9]} size={[1.45, 2.6, 0.38]} map={plankTex("#a87b4a", [1, 2])} />
          <Block position={[0, 2.38, 1.9]} size={[1.5, 0.78, 0.38]} map={plankTex("#a87b4a")} />
          <Block position={[0, 1.05, 1.92]} size={[0.92, 1.85, 0.12]} map={plankTex("#754b28")} />
          {/* Warm front torches / rebuilt twin lanterns */}
          <Torch position={[-0.95, 1.8, 2.25]} />
          <Torch position={[0.95, 1.8, 2.25]} />
        </>
      ) : (
        <>
          {/* Blast crater floor hole + pickable bobbing/spinning Minecraft wood block drops */}
          <Vox kind="cobble" position={[-0.55, 0.04, 1.45]} size={[2.9, 0.18, 2.5]} tint="#2a2d34" />
          <DroppedBlock position={[-1.35, 0.12, 2.25]} kind="plank" seed={1} />
          <DroppedBlock position={[-0.45, 0.12, 1.85]} kind="log" seed={2} />
          <DroppedBlock position={[0.35, 0.12, 2.45]} kind="plank" seed={3} />
          <DroppedBlock position={[-1.15, 0.12, 0.85]} kind="plank" seed={4} />
          <DroppedBlock position={[0.15, 0.12, 0.95]} kind="log" seed={5} />
          <Block position={[1.45, 0.85, 1.9]} size={[1.3, 1.5, 0.38]} map={plankTex("#8c6238")} />
          <Glow position={[-0.55, 0.35, 1.45]} size={1.8} color="#ff6828" opacity={0.18} />
        </>
      )}

      {/* Pitched spruce roof (intact / torn-left on crater / wide double-gable when rebuilt) */}
      {!isCrater ? (
        <>
          <Block position={[0, 3.05, 0]} size={[5.7, 0.32, 4.9]} map={plankTex("#5e3c23", [4, 3])} />
          <Block position={[0, 3.38, 0]} size={[4.2, 0.34, 4.1]} map={plankTex("#5e3c23", [3, 3])} />
          <Block position={[0, 3.68, 0]} size={[2.5, 0.28, 3.4]} map={plankTex("#5e3c23", [2, 2])} />
        </>
      ) : (
        <>
          <Block position={[1.15, 3.05, -0.3]} size={[3.2, 0.32, 3.8]} map={plankTex("#4e3420", [2, 2])} />
          <Block position={[-1.1, 2.75, -1.2]} rotation={[0.1, 0.15, -0.22]} size={[1.8, 0.24, 1.9]} map={plankTex("#472f1c")} />
        </>
      )}

      {/* Interior props: single bed normally; glowing TWIN beds + lanterns when rebuilt! */}
      <Bed position={[1.15, 0.16, -0.95]} blanket="#d9423a" />
      {isRebuilt ? (
        <>
          <Bed position={[-1.15, 0.16, -0.95]} blanket="#4287d9" />
          {/* Warm gold lanterns hung neatly inside & outside */}
          <Block position={[-1.8, 2.55, 2.25]} size={[0.24, 0.34, 0.24]} color="#252c36" />
          <Block position={[-1.8, 2.52, 2.25]} size={[0.18, 0.22, 0.18]} color="#ffcf54" emissive="#ffb82e" emissiveIntensity={0.85} castShadow={false} />
          <Block position={[1.8, 2.55, 2.25]} size={[0.24, 0.34, 0.24]} color="#252c36" />
          <Block position={[1.8, 2.52, 2.25]} size={[0.18, 0.22, 0.18]} color="#ffcf54" emissive="#ffb82e" emissiveIntensity={0.85} castShadow={false} />
          <LightPool position={[0, 0.18, 0.4]} width={4.8} depth={4.2} color="#ffdf94" opacity={0.35} />
          <pointLight position={[0, 2.3, 0.2]} color="#ffd585" intensity={5} distance={9} decay={2} />
        </>
      ) : null}
    </group>
  );
};

/** IRL two-story cozy living-room staircase landing + wainscoting + paintings + bookshelf + console table. */
export const StaircaseHall: React.FC<{
  position?: Vec3;
  rotationY?: number;
  withLaptop?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, withLaptop = true }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Warm hardwood floor + woven crimson living room rug */}
    <Block position={[0, -0.18, 0]} size={[12, 0.36, 12]} map={plankTex("#7c5938", [5, 5])} />
    <Block position={[0.5, 0.015, 1.75]} size={[3.6, 0.025, 2.2]} color="#7c2e2e" />
    <Block position={[0.5, 0.022, 1.75]} size={[3.1, 0.02, 1.75]} color="#9e433c" />

    {/* Cozy two-tone wainscoted back & right walls */}
    <Block position={[0, 2.4, -3.4]} size={[12, 4.8, 0.38]} color="#d8cfbd" />
    <Block position={[0, 0.65, -3.18]} size={[12, 1.3, 0.08]} map={plankTex("#5e3f26", [6, 1])} />
    <Block position={[0, 1.32, -3.15]} size={[12, 0.08, 0.12]} map={plankTex("#472f1c", [6, 1])} />
    <Block position={[3.8, 2.4, 0]} size={[0.38, 4.8, 12]} color="#cfc5b2" />
    <Block position={[3.58, 0.65, 0]} size={[0.08, 1.3, 12]} map={plankTex("#5e3f26", [6, 1])} />

    {/* Sunlit window with curtains on left back wall */}
    <Block position={[-2.9, 2.35, -3.16]} size={[1.7, 1.55, 0.06]} color="#b8e2ff" emissive="#8ed0ff" emissiveIntensity={0.45} castShadow={false} />
    <Block position={[-2.9, 2.35, -3.14]} size={[1.82, 0.08, 0.1]} map={plankTex("#472f1c")} />
    <Block position={[-3.72, 2.35, -3.12]} size={[0.26, 1.7, 0.1]} color="#3a5e7c" />
    <Block position={[-2.08, 2.35, -3.12]} size={[0.26, 1.7, 0.1]} color="#3a5e7c" />

    {/* Wooden stair steps rising from y=0 (z=+0.55) up to upper landing + handrail & balusters */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <group key={i}>
        <Block
          position={[-0.7, 0.16 + i * 0.3, 0.55 - i * 0.42]}
          size={[2.1, 0.32, 0.46]}
          map={plankTex("#8f6239", [2, 1])}
        />
        <Block
          position={[0.3, 0.62 + i * 0.3, 0.55 - i * 0.42]}
          size={[0.06, 0.72, 0.06]}
          map={plankTex("#593a20")}
        />
      </group>
    ))}
    <Block position={[0.3, 1.9, -0.7]} rotation={[0.62, 0, 0]} size={[0.1, 0.1, 3.2]} map={plankTex("#4c3018")} />

    {/* Framed family paintings climbing along back wall */}
    <Block position={[-1.4, 2.2, -3.18]} size={[0.72, 0.56, 0.05]} color="#4e3520" />
    <Block position={[-1.4, 2.2, -3.15]} size={[0.56, 0.42, 0.03]} color="#68a85e" />
    <Block position={[-0.2, 2.75, -3.18]} size={[0.82, 0.62, 0.05]} color="#4e3520" />
    <Block position={[-0.2, 2.75, -3.15]} size={[0.66, 0.46, 0.03]} color="#5b8ec9" />

    {/* Cozy tall oak bookshelf + colorful books + potted plant on right */}
    <group position={[2.65, 0, -2.55]}>
      <Block position={[0, 1.15, 0]} size={[1.35, 2.3, 0.52]} map={plankTex("#5a3b22")} />
      <Block position={[-0.25, 0.85, 0.04]} size={[0.5, 0.28, 0.4]} color="#c94b4b" />
      <Block position={[0.25, 0.85, 0.04]} size={[0.45, 0.3, 0.4]} color="#4c84c9" />
      <Block position={[-0.1, 1.45, 0.04]} size={[0.65, 0.28, 0.4]} color="#e0b248" />
      <Block position={[0.35, 1.45, 0.04]} size={[0.32, 0.26, 0.4]} color="#52a868" />
    </group>
    <group position={[2.85, 0, -0.45]}>
      <Block position={[0, 0.25, 0]} size={[0.42, 0.5, 0.42]} color="#9e5332" />
      <Block position={[0, 0.72, 0]} size={[0.58, 0.55, 0.58]} color="#3e8242" />
    </group>

    {/* Downstairs hallway console oak table + warm hall light */}
    <group position={[1.35, 0, 1.15]}>
      <Block position={[0, 0.74, 0]} size={[1.45, 0.08, 0.75]} map={plankTex("#5e4028")} />
      {[
        [-0.62, -0.28],
        [0.62, -0.28],
        [-0.62, 0.28],
        [0.62, 0.28],
      ].map(([lx, lz], k) => (
        <Block key={k} position={[lx!, 0.35, lz!]} size={[0.07, 0.7, 0.07]} color="#232833" />
      ))}
      {withLaptop ? <Laptop position={[0, 0.78, 0]} rotationY={-0.35} screenText="MC READY" screenColor="#5de8a0" scale={0.95} /> : null}
    </group>
    <pointLight position={[0.4, 3.6, 1.4]} color="#ffe9c4" intensity={6.5} distance={14} decay={2} />
  </group>
);

/** Crisp wooden side desk supporting Sam's co-op Laptop beside Dad's main DeskSetup. */
export const LaptopSideTable: React.FC<{ position?: Vec3 }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    <Block position={[0, 0.72, 0]} size={[1.15, 0.08, 0.72]} map={plankTex("#5e4028")} />
    <Block position={[-0.45, 0.34, 0]} size={[0.07, 0.68, 0.56]} color="#232833" />
    <Block position={[0.45, 0.34, 0]} size={[0.07, 0.68, 0.56]} color="#232833" />
  </group>
);

/** Crisp clean floating 3D comic caption/speech placard sized safely inside 9:16 margins. */
export const SpeechCard: React.FC<{
  text: string;
  position?: Vec3;
  rotationY?: number;
  color?: string;
  bg?: string;
  scale?: number;
}> = ({ text, position = [0, 2.45, 0], rotationY = 0, color = "#ffffff", bg = "#141926", scale = 1 }) => {
  const tex = useMemo(() => wordTexture(text), [text]);
  const gw = useMemo(() => wordBitmap(text).width, [text]);
  const rawW = Math.max(0.75, ((gw + 6) / 11) * 0.16);
  const fit = Math.min(1, 1.85 / rawW);
  const textW = rawW * fit;
  const textH = 0.19 * fit;
  const bgW = textW + 0.28;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0, -0.02]} size={[bgW, 0.38, 0.04]} color={bg} />
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[textW, textH]} />
        <meshBasicMaterial map={tex} color={color} transparent alphaTest={0.5} side={THREE.DoubleSide} toneMapped={false} fog={false} />
      </mesh>
    </group>
  );
};
