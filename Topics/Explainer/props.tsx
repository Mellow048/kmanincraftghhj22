import { useMemo } from "react";
import * as THREE from "three";
import { Block, Vox, mulberry32, pixelTex, plankTex, stripeTex, wordBitmap, wordTexture } from "../../src/engine";
import type { Vec3 } from "../../src/engine";
import { Icon } from "../Shared";
import { Chest } from "./money";

/**
 * DETAILED COMPOSITE PROPS FOR EXPLAINER FILMS
 *
 * Never drop a single solid cube and pretend it is a bookshelf, scroll, throne, or ballot box.
 * Every prop here is built from multi-part, textured Minecraft geometry so viewers read what the
 * thing is instantaneously on a 9:16 phone screen. `position` is always the floor/base center.
 */

const BOOK_PALETTE = [
  "#b5332a", // crimson
  "#27549c", // royal navy
  "#2a7544", // emerald
  "#c28e27", // ochre gold
  "#683d87", // plum
  "#5c3d28", // mahogany leather
  "#386d80", // teal cloth
  "#8c384e", // burgundy
];

/**
 * Detailed 2-tier Minecraft bookshelf: dark oak outer frame, recessed plank shelves,
 * individual upright and leaning book spines with gold bands and cream page edges.
 */
export const DetailedBookshelf: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  seed?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 1.4, height = 1.8, seed = 1 }) => {
  const rand = mulberry32(seed * 733 + 11);
  const depth = 0.42;
  const innerW = width - 0.16;

  // Build deterministic book rows for two shelves
  const shelves = useMemo(() => {
    const out: { y: number; books: { x: number; w: number; h: number; color: string; band: boolean; tilt: number }[] }[] = [];
    const ys = [0.1, height * 0.52];
    for (let row = 0; row < ys.length; row++) {
      const books: { x: number; w: number; h: number; color: string; band: boolean; tilt: number }[] = [];
      let cursor = -innerW / 2 + 0.03;
      let idx = 0;
      while (cursor < innerW / 2 - 0.11) {
        if (rand() < 0.14 && cursor < innerW / 2 - 0.22) {
          cursor += 0.07; // small readable gap between book groups
        }
        const bw = 0.065 + rand() * 0.045;
        const bh = height * (0.28 + rand() * 0.09);
        const tilt = idx % 7 === 6 && cursor < innerW / 2 - 0.16 ? 0.14 : 0;
        books.push({
          x: cursor + bw / 2,
          w: bw,
          h: bh,
          color: BOOK_PALETTE[(idx + seed + row * 3) % BOOK_PALETTE.length]!,
          band: idx % 2 === 0,
          tilt,
        });
        cursor += bw + 0.008;
        idx++;
      }
      out.push({ y: ys[row]!, books });
    }
    return out;
  }, [innerW, height, seed]);

  const woodTex = useMemo(() => plankTex("#8b6138", [1, 1]), []);
  const backTex = useMemo(() => plankTex("#52371f", [1, 1]), []);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Backboard */}
      <Block position={[0, height / 2, -depth / 2 + 0.03]} size={[width - 0.04, height - 0.04, 0.05]} map={backTex} />
      {/* Left & right oak stiles */}
      {[-1, 1].map((side) => (
        <Vox key={side} kind="darkPlanks" position={[(side * (width - 0.08)) / 2, height / 2, 0]} size={[0.08, height, depth]} />
      ))}
      {/* Base plinth, middle shelf, top crown molding */}
      <Vox kind="darkPlanks" position={[0, 0.05, 0]} size={[width + 0.04, 0.1, depth + 0.03]} />
      <Block position={[0, height * 0.49, 0.01]} size={[innerW, 0.06, depth - 0.02]} map={woodTex} />
      <Vox kind="darkPlanks" position={[0, height - 0.045, 0.01]} size={[width + 0.05, 0.09, depth + 0.04]} />

      {/* Individual colored books with cream paper top-edge & spine band */}
      {shelves.map((shelf, si) => (
        <group key={si} position={[0, shelf.y, 0.02]}>
          {shelf.books.map((b, bi) => (
            <group key={bi} position={[b.x, b.h / 2, 0.03]} rotation={[0, 0, b.tilt]}>
              <Block position={[0, 0, 0]} size={[b.w, b.h, 0.24]} map={pixelTex(b.color, [1, 1], { jitter: 0.08 })} />
              {/* Cream paper top block */}
              <Block position={[0, b.h / 2 + 0.005, -0.01]} size={[b.w * 0.78, 0.012, 0.2]} color="#efe6ce" castShadow={false} />
              {/* Gold spine clasp */}
              {b.band ? (
                <Block position={[0, b.h * 0.22, 0.123]} size={[b.w * 0.85, 0.024, 0.012]} color="#e6ba3c" castShadow={false} />
              ) : null}
            </group>
          ))}
        </group>
      ))}
    </group>
  );
};

/** One parchment sheet with crisp pixel ink lines and optional seal. */
export const RuleScroll: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  width?: number;
  height?: number;
  headerColor?: string;
  lines?: number;
  seal?: boolean;
}> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 0.38,
  height = 0.5,
  headerColor = "#243b6b",
  lines = 6,
  seal = false,
}) => (
  <group position={position} rotation={rotation}>
    <Block position={[0, 0, 0]} size={[width, height, 0.016]} map={pixelTex("#f4ecd6", [1, 1], { jitter: 0.04 })} castShadow={false} />
    <Block position={[0, height * 0.36, 0.01]} size={[width * 0.72, height * 0.08, 0.006]} color={headerColor} castShadow={false} />
    {Array.from({ length: lines }, (_, i) => (
      <Block
        key={i}
        position={[(i % 3 === 2 ? -width * 0.1 : 0), height * (0.2 - i * 0.1), 0.01]}
        size={[width * (i % 3 === 2 ? 0.52 : 0.74), 0.018, 0.006]}
        color="#362c22"
        castShadow={false}
      />
    ))}
    {seal ? (
      <Block position={[width * 0.24, -height * 0.32, 0.014]} size={[0.055, 0.055, 0.014]} color="#b82c24" castShadow={false} />
    ) : null}
  </group>
);

/**
 * Framed oak bulletin board pinned with server rules:
 * `mode="chaos"` shows crooked overlapping scribbled sheets; `mode="order"` shows one crisp charter.
 */
export const RuleBoard: React.FC<{
  position?: Vec3;
  rotationY?: number;
  mode?: "chaos" | "order";
  width?: number;
  height?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, mode = "chaos", width = 2.4, height = 1.25 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0, -0.04]} size={[width, height, 0.08]} />
    <Vox kind="darkPlanks" position={[0, height / 2, 0]} size={[width + 0.14, 0.09, 0.12]} />
    <Vox kind="darkPlanks" position={[0, -height / 2, 0]} size={[width + 0.14, 0.09, 0.12]} />
    {[-1, 1].map((side) => (
      <Vox key={side} kind="darkPlanks" position={[(side * width) / 2, 0, 0]} size={[0.09, height, 0.12]} />
    ))}

    {mode === "chaos" ? (
      <>
        <RuleScroll position={[-0.72, 0.14, 0.02]} rotation={[0, 0, -0.14]} headerColor="#9c2a2a" />
        <RuleScroll position={[-0.24, -0.06, 0.032]} rotation={[0, 0, 0.18]} headerColor="#8a6220" lines={5} />
        <RuleScroll position={[0.28, 0.1, 0.044]} rotation={[0, 0, -0.22]} headerColor="#5c2828" seal />
        <RuleScroll position={[0.74, -0.05, 0.055]} rotation={[0, 0, 0.11]} headerColor="#334c24" lines={7} />
      </>
    ) : (
      <RuleScroll
        position={[0, 0, 0.025]}
        width={width * 0.36}
        height={height * 0.78}
        headerColor="#1d356b"
        lines={7}
        seal
      />
    )}
  </group>
);

/** Long dark oak council/parliament table with optional scattered documents and gavel block. */
export const CouncilTable: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  depth?: number;
  messy?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 3.2, depth = 1.05, messy = true }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="darkPlanks" position={[0, 0.76, 0]} size={[width, 0.1, depth]} />
    {[-1, 1].flatMap((sx) =>
      [-1, 1].map((sz) => (
        <Vox key={`${sx}${sz}`} kind="darkPlanks" position={[sx * (width / 2 - 0.18), 0.36, sz * (depth / 2 - 0.16)]} size={[0.14, 0.72, 0.14]} />
      )),
    )}
    {messy ? (
      <>
        <RuleScroll position={[-width * 0.28, 0.82, 0.1]} rotation={[-Math.PI / 2, 0, 0.25]} width={0.32} height={0.42} lines={5} />
        <RuleScroll position={[0.1, 0.825, -0.08]} rotation={[-Math.PI / 2, 0, -0.4]} width={0.32} height={0.42} headerColor="#9c2a2a" />
        <RuleScroll position={[width * 0.28, 0.82, 0.12]} rotation={[-Math.PI / 2, 0, 0.15]} width={0.32} height={0.42} seal />
      </>
    ) : (
      <RuleScroll position={[0, 0.82, 0]} rotation={[-Math.PI / 2, 0, 0]} width={0.44} height={0.56} headerColor="#1d356b" seal />
    )}
  </group>
);

/** Open thick leather-bound book showing fanned cream pages, ink rows, and red bookmark ribbon. */
export const OpenBook: React.FC<{ position?: Vec3; rotation?: Vec3; scale?: number; coverColor?: string }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  coverColor = "#6b2622",
}) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[-0.17, 0.02, 0]} rotation={[0, 0, 0.14]} size={[0.32, 0.03, 0.42]} map={pixelTex(coverColor)} />
    <Block position={[0.17, 0.02, 0]} rotation={[0, 0, -0.14]} size={[0.32, 0.03, 0.42]} map={pixelTex(coverColor)} />
    <Block position={[0, 0.01, 0]} size={[0.06, 0.035, 0.43]} color="#d4a738" />
    {/* Cream page blocks */}
    <Block position={[-0.16, 0.048, 0]} rotation={[0, 0, 0.14]} size={[0.28, 0.04, 0.37]} color="#f4ecd4" castShadow={false} />
    <Block position={[0.16, 0.048, 0]} rotation={[0, 0, -0.14]} size={[0.28, 0.04, 0.37]} color="#f4ecd4" castShadow={false} />
    {/* Ink lines */}
    {[-0.1, -0.02, 0.06, 0.12].map((z, i) => (
      <group key={i}>
        <Block position={[-0.16, 0.072, z]} rotation={[0, 0, 0.14]} size={[0.19, 0.005, 0.016]} color="#3a2f26" castShadow={false} />
        <Block position={[0.16, 0.072, z]} rotation={[0, 0, -0.14]} size={[0.19, 0.005, 0.016]} color="#3a2f26" castShadow={false} />
      </group>
    ))}
    {/* Red bookmark ribbon */}
    <Block position={[0.04, 0.035, 0.22]} rotation={[0.4, 0, 0]} size={[0.028, 0.008, 0.14]} color="#b82323" castShadow={false} />
  </group>
);

/** Carved oak lectern with angled shelf and OpenBook resting on top. */
export const Lectern: React.FC<{ position?: Vec3; rotationY?: number }> = ({ position = [0, 0, 0], rotationY = 0 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="darkPlanks" position={[0, 0.07, 0]} size={[0.66, 0.14, 0.66]} />
    <Vox kind="planks" position={[0, 0.56, 0]} size={[0.28, 0.84, 0.28]} />
    <group position={[0, 1.05, 0.04]} rotation={[0.35, 0, 0]}>
      <Vox kind="darkPlanks" position={[0, 0, 0]} size={[0.78, 0.07, 0.58]} />
      <OpenBook position={[0, 0.04, 0]} />
    </group>
  </group>
);

/** Four-pronged gold crown with royal sapphire/emerald gems. Fits MinecraftAvatar `head` at `[0, 0.26, 0]`. */
export const Crown: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; gemColor?: string }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  gemColor = "#2457c9",
}) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    {/* Circlet band */}
    <Block position={[0, 0.06, 0.26]} size={[0.56, 0.12, 0.06]} color="#ecc034" metalness={0.25} roughness={0.35} />
    <Block position={[0, 0.06, -0.26]} size={[0.56, 0.12, 0.06]} color="#ecc034" metalness={0.25} roughness={0.35} />
    <Block position={[-0.26, 0.06, 0]} size={[0.06, 0.12, 0.56]} color="#d8a822" metalness={0.25} roughness={0.35} />
    <Block position={[0.26, 0.06, 0]} size={[0.06, 0.12, 0.56]} color="#d8a822" metalness={0.25} roughness={0.35} />
    {/* Crown prongs */}
    {[
      [-0.24, 0.24],
      [0, 0.26],
      [0.24, 0.24],
      [-0.24, -0.24],
      [0, -0.26],
      [0.24, -0.24],
      [-0.26, 0],
      [0.26, 0],
    ].map(([x, z], i) => (
      <Block key={i} position={[x!, 0.17, z!]} size={[0.08, 0.12, 0.08]} color="#f5cf47" metalness={0.25} roughness={0.35} />
    ))}
    {/* Center jewels */}
    <Block position={[0, 0.065, 0.295]} size={[0.1, 0.075, 0.025]} color={gemColor} emissive={gemColor} emissiveIntensity={0.2} castShadow={false} />
    <Block position={[0.295, 0.065, 0]} size={[0.025, 0.075, 0.1]} color="#d43535" castShadow={false} />
    <Block position={[-0.295, 0.065, 0]} size={[0.025, 0.075, 0.1]} color="#d43535" castShadow={false} />
  </group>
);

/** Velvet cushion carrying a gold Crown (for a Head Mod / Official handing over power). */
export const CrownCushion: React.FC<{ position?: Vec3; rotationY?: number; showCrown?: boolean }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  showCrown = true,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Block position={[0, 0.04, 0]} size={[0.64, 0.08, 0.64]} color="#d8a822" />
    <Vox kind="wool" tint="#f3efe0" position={[0, 0.11, 0]} size={[0.56, 0.09, 0.56]} />
    {showCrown ? <Crown position={[0, 0.16, 0]} scale={0.9} /> : null}
  </group>
);

/** Tall velvet-and-gold royal throne. `position` is the floor under its center. Faces +Z. */
export const RoyalThrone: React.FC<{
  position?: Vec3;
  rotationY?: number;
  clothColor?: string;
  goldColor?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, clothColor = "#1a357a", goldColor = "#e0b128" }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {/* Dais step */}
    <Vox kind="stoneBrick" position={[0, 0.14, 0.2]} size={[2.2, 0.28, 2.2]} />
    <Vox kind="wool" tint={clothColor} position={[0, 0.3, 0.28]} size={[1.65, 0.06, 2.05]} />
    {/* Seat base & cushion */}
    <Block position={[0, 0.56, 0]} size={[1.15, 0.52, 1.0]} color={goldColor} />
    <Vox kind="wool" tint={clothColor} position={[0, 0.85, 0.04]} size={[0.92, 0.12, 0.86]} />
    {/* High backrest */}
    <Block position={[0, 1.65, -0.44]} size={[1.15, 1.85, 0.22]} color={goldColor} />
    <Vox kind="wool" tint={clothColor} position={[0, 1.65, -0.35]} size={[0.88, 1.55, 0.12]} />
    {/* Finial peaks */}
    {[-0.5, 0, 0.5].map((x, i) => (
      <Block key={i} position={[x, i === 1 ? 2.75 : 2.66, -0.44]} size={[0.2, i === 1 ? 0.34 : 0.2, 0.24]} color="#f5cf47" />
    ))}
    {/* Armrests */}
    {[-0.56, 0.56].map((x) => (
      <group key={x}>
        <Block position={[x, 1.05, 0.05]} size={[0.18, 0.14, 0.96]} color={goldColor} />
        <Block position={[x, 0.72, 0.44]} size={[0.16, 0.54, 0.16]} color="#b88814" />
      </group>
    ))}
  </group>
);

/** Royal runner carpet with gold trim borders along Z. */
export const RoyalCarpet: React.FC<{
  position?: Vec3;
  length?: number;
  width?: number;
  color?: string;
}> = ({ position = [0, 0, 0], length = 6, width = 1.6, color = "#1a357a" }) => (
  <group position={position}>
    <Vox kind="wool" tint={color} position={[0, 0.02, 0]} size={[width, 0.04, length]} />
    {[-1, 1].map((s) => (
      <Block key={s} position={[(s * (width - 0.12)) / 2, 0.024, 0]} size={[0.12, 0.042, length]} color="#e0b128" castShadow={false} />
    ))}
  </group>
);

/** Hanging wall cloth banner with gold trim & pixel emblem. */
export const BannerFlag: React.FC<{
  position?: Vec3;
  rotationY?: number;
  color?: string;
  trim?: string;
  emblem?: "crown" | "gem" | "star" | "up";
  width?: number;
  height?: number;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  color = "#1b347a",
  trim = "#f0c232",
  emblem = "crown",
  width = 0.85,
  height = 2.0,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="darkPlanks" position={[0, height / 2 + 0.06, 0]} size={[width + 0.22, 0.1, 0.1]} />
    <Block position={[0, 0, 0]} size={[width, height, 0.05]} map={stripeTex(color, trim, { count: 14 })} />
    <Block position={[0, height / 2 - 0.12, 0.032]} size={[width * 0.9, 0.07, 0.015]} color={trim} castShadow={false} />
    <Block position={[0, -height / 2 + 0.12, 0.032]} size={[width * 0.9, 0.07, 0.015]} color={trim} castShadow={false} />
    <Icon kind={emblem} position={[0, 0.1, 0.05]} height={width * 0.56} color={trim} depth={0.7} />
  </group>
);

/** Slotted wooden ballot box resting on floor/desk with ballot papers. */
export const BallotBox: React.FC<{
  position?: Vec3;
  rotationY?: number;
  papers?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, papers = 2 }) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Vox kind="planks" position={[0, 0.24, 0]} size={[0.56, 0.48, 0.46]} />
    <Vox kind="darkPlanks" position={[0, 0.5, 0]} size={[0.62, 0.06, 0.52]} />
    {/* Ballot slot */}
    <Block position={[0, 0.535, 0]} size={[0.3, 0.014, 0.055]} color="#161412" castShadow={false} />
    {/* Paper ballot sticking into slot */}
    <Block position={[0, 0.59, 0]} rotation={[0.1, 0, 0.08]} size={[0.2, 0.14, 0.014]} color="#f7f2e4" castShadow={false} />
    {/* Brass seal front badge */}
    <Block position={[0, 0.25, 0.236]} size={[0.18, 0.12, 0.016]} color="#e6ba3c" castShadow={false} />
    {papers > 0 ? (
      <RuleScroll position={[-0.44, 0.015, 0.08]} rotation={[-Math.PI / 2, 0, 0.25]} width={0.24} height={0.32} lines={4} />
    ) : null}
  </group>
);

/** Stone-framed architectural banner sign (for dates/stats in-world like `1799` or `99%`). */
export const StoneBillboard: React.FC<{
  text: string;
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  bgColor?: string;
  textColor?: string;
}> = ({
  text,
  position = [0, 0, 0],
  rotationY = 0,
  width = 3.8,
  height = 1.5,
  bgColor = "#343844",
  textColor = "#f5f2e8",
}) => {
  const tex = useMemo(() => wordTexture(text), [text]);
  const { width: gw } = useMemo(() => wordBitmap(text), [text]);
  const textW = Math.min(width * 0.86, ((gw + 4) / 11) * height * 0.56);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Vox kind="cobble" position={[0, 0, -0.06]} size={[width + 0.5, height + 0.5, 0.22]} />
      <Block position={[0, 0, 0.07]} size={[width, height, 0.06]} map={pixelTex(bgColor, [1, 1], { jitter: 0.04 })} />
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[textW, height * 0.56]} />
        <meshBasicMaterial map={tex} color={textColor} transparent />
      </mesh>
    </group>
  );
};

/** Textured castle/citadel stone brick wall segment with crenellations and iron-strapped oak gate. */
export const CastleGateWall: React.FC<{
  position?: Vec3;
  rotationY?: number;
  width?: number;
  height?: number;
  gate?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, width = 10, height = 6.5, gate = true }) => {
  const merlons = Math.max(2, Math.floor(width / 1.4));
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Vox kind="stoneBrick" position={[0, height / 2, 0]} size={[width, height, 0.9]} />
      {/* Crenellations along top */}
      {Array.from({ length: merlons }, (_, i) => {
        const x = -width / 2 + 0.7 + (i * (width - 1.4)) / Math.max(1, merlons - 1);
        return <Vox key={i} kind="stoneBrick" position={[x, height + 0.35, 0]} size={[0.8, 0.7, 0.92]} />;
      })}
      {gate ? (
        <group position={[0, 0, 0.46]}>
          <Vox kind="darkPlanks" position={[0, 1.55, 0.04]} size={[2.2, 3.1, 0.16]} />
          <Block position={[0, 2.25, 0.14]} size={[2.25, 0.14, 0.04]} color="#2c3038" />
          <Block position={[0, 0.85, 0.14]} size={[2.25, 0.14, 0.04]} color="#2c3038" />
          <Block position={[-0.18, 1.5, 0.16]} size={[0.12, 0.16, 0.06]} color="#8c96a4" />
          <Block position={[0.18, 1.5, 0.16]} size={[0.12, 0.16, 0.06]} color="#8c96a4" />
        </group>
      ) : null}
    </group>
  );
};

/** Sleek 3D top hat for EliteLead ("tycoon" / banker / historic citizen). Fits `head` at `[0, 0.25, 0]`. */
export const TopHat: React.FC<{ position?: Vec3; color?: string; band?: string }> = ({
  position = [0, 0, 0],
  color = "#1b1e28",
  band = "#b82828",
}) => (
  <group position={position}>
    <Block position={[0, 0.02, 0]} size={[0.7, 0.05, 0.7]} color={color} />
    <Block position={[0, 0.1, 0]} size={[0.48, 0.08, 0.48]} color={band} />
    <Block position={[0, 0.28, 0]} size={[0.46, 0.32, 0.46]} color={color} />
  </group>
);

/** Peaked officer/guard cap. Fits `head` at `[0, 0.24, 0]`. */
export const PeakedCap: React.FC<{ position?: Vec3; color?: string; visor?: string; badge?: string }> = ({
  position = [0, 0, 0],
  color = "#1e3266",
  visor = "#121620",
  badge = "#ecc034",
}) => (
  <group position={position}>
    <Block position={[0, 0.05, 0]} size={[0.56, 0.1, 0.56]} color={color} />
    <Block position={[0, 0.13, -0.02]} size={[0.6, 0.08, 0.6]} color={color} />
    <Block position={[0, 0.015, 0.34]} size={[0.48, 0.04, 0.18]} color={visor} />
    <Block position={[0, 0.09, 0.285]} size={[0.09, 0.06, 0.02]} color={badge} castShadow={false} />
  </group>
);

/** Crisp pixel round wire spectacles. Attach inside `head` at `[0, 0, 0]`. */
export const Spectacles: React.FC<{ position?: Vec3; color?: string }> = ({
  position = [0, 0.02, 0.265],
  color = "#232730",
}) => (
  <group position={position}>
    <Block position={[-0.1, 0, 0]} size={[0.13, 0.09, 0.02]} color={color} castShadow={false} />
    <Block position={[-0.1, 0, 0.006]} size={[0.09, 0.055, 0.015]} color="#cbe7ff" opacity={0.35} transparent castShadow={false} />
    <Block position={[0.1, 0, 0]} size={[0.13, 0.09, 0.02]} color={color} castShadow={false} />
    <Block position={[0.1, 0, 0.006]} size={[0.09, 0.055, 0.015]} color="#cbe7ff" opacity={0.35} transparent castShadow={false} />
    <Block position={[0, 0.01, 0.003]} size={[0.07, 0.02, 0.018]} color={color} castShadow={false} />
  </group>
);

/** Floating dark-translucent Minecraft character nameplate above a lead's head. */
export const NameTag: React.FC<{
  text: string;
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  accent?: string;
}> = ({ text, position = [0, 2.25, 0], rotationY = 0, scale = 1, accent = "#ffffff" }) => {
  const tex = useMemo(() => wordTexture(text), [text]);
  const { width: gw } = useMemo(() => wordBitmap(text), [text]);
  const textW = Math.max(0.45, ((gw + 4) / 11) * 0.22);
  const bgW = textW + 0.26;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[bgW, 0.34]} />
        <meshBasicMaterial color="#0f141e" transparent opacity={0.78} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[textW, 0.22]} />
        <meshBasicMaterial map={tex} color={accent} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/** Beveled stack of iron/gold ingots (for iron farms, output comparisons, hauled wages). */
export const IngotStack: React.FC<{
  position?: Vec3;
  rotationY?: number;
  count?: number;
  kind?: "iron" | "gold";
  scale?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, count = 4, kind = "iron", scale = 1 }) => {
  const base = kind === "gold" ? "#ebc034" : "#d6dce2";
  const top = kind === "gold" ? "#ffe066" : "#f2f5f8";
  const layers = Math.max(1, Math.min(8, Math.round(count)));
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {Array.from({ length: layers }, (_, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <group key={i} position={[(col - 0.5) * 0.26, 0.045 + row * 0.095, (row % 2) * 0.04]} rotation={[0, (i % 3) * 0.08 - 0.08, 0]}>
            <Block position={[0, 0, 0]} size={[0.22, 0.08, 0.4]} color={base} metalness={0.25} roughness={0.35} />
            <Block position={[0, 0.042, 0]} size={[0.16, 0.015, 0.34]} color={top} castShadow={false} />
          </group>
        );
      })}
    </group>
  );
};

/** Multi-part wooden-handled voxel Pickaxe (for mining / extra shifts). */
export const Pickaxe: React.FC<{
  position?: Vec3;
  rotation?: Vec3;
  headColor?: string;
  scale?: number;
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0], headColor = "#8a94a0", scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <Block position={[0, 0.32, 0]} size={[0.06, 0.64, 0.06]} map={plankTex("#7c532d")} />
    <Block position={[0, 0.64, 0]} size={[0.42, 0.08, 0.08]} color={headColor} metalness={0.25} roughness={0.35} />
    <Block position={[-0.22, 0.58, 0]} size={[0.09, 0.12, 0.075]} color={headColor} metalness={0.25} roughness={0.35} />
    <Block position={[0.22, 0.58, 0]} size={[0.09, 0.12, 0.075]} color={headColor} metalness={0.25} roughness={0.35} />
  </group>
);

/** Twin side-by-side comparison chests (`YESTERDAY` vs `TODAY` / `BEFORE` vs `AFTER`) with output piles. */
export const CompareChestPair: React.FC<{
  position?: Vec3;
  rotationY?: number;
  leftLabel?: string;
  rightLabel?: string;
  leftCount?: number;
  rightCount?: number;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  leftLabel = "YESTERDAY",
  rightLabel = "TODAY",
  leftCount = 4,
  rightCount = 4,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    <Chest position={[-1.0, 0, 0]} open={0.8} gold={0.5} />
    <StoneBillboard text={leftLabel} position={[-1.0, 1.5, -0.35]} width={1.7} height={0.58} bgColor="#5b4026" />
    <IngotStack position={[-1.0, 0, 0.85]} count={leftCount} />

    <Chest position={[1.0, 0, 0]} open={0.8} gold={0.5} />
    <StoneBillboard text={rightLabel} position={[1.0, 1.5, -0.35]} width={1.7} height={0.58} bgColor="#5b4026" />
    <IngotStack position={[1.0, 0, 0.85]} count={rightCount} />
  </group>
);
