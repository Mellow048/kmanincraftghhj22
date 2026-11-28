import type React from "react";
import { AbsoluteFill } from "remotion";
import {
  Block,
  Dust,
  Glow,
  GodRay,
  LightPool,
  Torch,
  Vox,
  defineFilm,
  defineScene,
} from "./engine";
import { GLYPH_ROWS, wordBitmap } from "./engine/pixelfont";
import {
  BarChart,
  CitizenLead,
  CoinPile,
  EmeraldFountain,
} from "../Topics/Explainer";
import { PlainsVillageMap } from "../Topics/InThisTown";
import {
  CherryCabinMap,
  DeskSetup,
  ServerPlayer,
} from "../Topics/ServerLore";
import { ShopStand } from "../Topics/Shared/universal";

/* ────────────────────── CAPTION-STYLE PIXEL ART TEXT ────────────────────── */

function pixelTextPaths(text: string): { w: number; h: number; outlineD: string; glyphD: string } {
  const { width, rows } = wordBitmap(text);
  const pad = 2;
  const w = width + pad * 2;
  const h = GLYPH_ROWS + pad * 2;
  const lit = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < width && y < GLYPH_ROWS && rows[y][x] === 1;

  const outlineParts: string[] = [];
  const glyphParts: string[] = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const gx = x - pad;
      const gy = y - pad;
      if (lit(gx, gy)) {
        glyphParts.push(`M${x},${y}h1v1h-1z`);
      } else {
        let black = false;
        outer: for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (lit(gx + dx, gy + dy)) {
              black = true;
              break outer;
            }
          }
        }
        if (!black && (lit(gx - 2, gy - 2) || lit(gx - 1, gy - 2) || lit(gx - 2, gy - 1))) {
          black = true;
        }
        if (black) outlineParts.push(`M${x},${y}h1v1h-1z`);
      }
    }
  }
  return { w, h, outlineD: outlineParts.join(""), glyphD: glyphParts.join("") };
}

const PixelLine: React.FC<{ text: string; color: string; pixel: number }> = ({ text, color, pixel }) => {
  const p = pixelTextPaths(text);
  return (
    <svg
      width={p.w * pixel}
      height={p.h * pixel}
      viewBox={`0 0 ${p.w} ${p.h}`}
      shapeRendering="crispEdges"
      style={{ display: "block", overflow: "visible" }}
    >
      <path d={p.outlineD} fill="#000000" />
      <path d={p.glyphD} fill={color} />
    </svg>
  );
};

const BannerPixelTitle: React.FC<{
  title: string;
  subtitle: string;
  accent: string;
}> = ({ title, subtitle, accent }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingRight: "10%",
      gap: 24,
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 22 }}>
      <PixelLine text={title} color="#ffffff" pixel={16} />
      <PixelLine text={subtitle} color={accent} pixel={6} />
    </div>
  </AbsoluteFill>
);

function withBannerOverlay(film: ReturnType<typeof defineFilm>, overlay: React.ReactNode) {
  const Inner = film.Component;
  return {
    ...film,
    Component: () => (
      <AbsoluteFill>
        <Inner />
        {overlay}
      </AbsoluteFill>
    ),
  };
}

/* ─────────────────────────── EXPLAINER WORLDS ─────────────────────────── */

const ExplainerDayWorld: React.FC<{ isPfp?: boolean }> = ({ isPfp = false }) => (
  <>
    <PlainsVillageMap position={[0, 0, -5.0]} />
    {/* Atmospheric rim glow & sunbeams behind hero */}
    <GodRay position={[-1.4, 4.2, -1.8]} width={4.2} height={11} color="#fff4c8" opacity={0.22} />
    <GodRay position={[1.8, 4.6, -2.5]} width={3.6} height={11} color="#98ffba" opacity={0.16} />
    <Glow position={isPfp ? [0, 1.35, -1.1] : [-1.5, 1.35, -1.0]} size={2.2} color="#52f081" opacity={0.34} />
    <Glow position={isPfp ? [0.6, 1.8, -1.4] : [-0.4, 2.0, -1.4]} size={1.8} color="#ffe066" opacity={0.26} />
    <Dust count={90} position={[0, 1.8, 0]} area={[10, 5, 8]} color="#ffe57a" opacity={0.65} />

    {/* Iconic Explainer props pushed cleanly behind/beside */}
    <BarChart
      position={isPfp ? [1.25, 0, -2.6] : [1.8, 0, -2.4]}
      values={[1.0, 1.8, 2.7]}
      labels={["10", "20", "27"]}
      colors={["#4cd964", "#34c759", "#ffd43b"]}
    />
    <EmeraldFountain position={isPfp ? [-1.5, 0, -3.2] : [-3.8, 0, -2.2]} />
    <CoinPile position={[-0.3, 0.04, 1.2]} count={12} />
    <ShopStand position={[4.5, 0, -4.5]} title="MARKET" awningColor="#c92a2a" itemColor="#52f081" />

    {/* Hero Leo in dynamic forward action pose holding glowing emerald */}
    <group rotation={[0.06, isPfp ? 0.28 : 0.52, -0.04]} position={isPfp ? [0, 0, 0] : [-1.6, 0, 0.4]}>
      <CitizenLead
        variant="leo"
        position={[0, 0, 0]}
        rotationY={0}
        animation="push"
        face="grin"
        time={0.28}
      >
        <Block
          position={[0.02, 0.04, 0.26]}
          size={[0.26, 0.34, 0.26]}
          color="#42f587"
          emissive="#25d963"
          emissiveIntensity={0.75}
        />
      </CitizenLead>
    </group>
    <LightPool position={[0, 0.02, 0.5]} width={7} depth={7} color="#ffeaa6" opacity={0.22} />
  </>
);

const ExplainerNightWorld: React.FC<{ isPfp?: boolean }> = ({ isPfp = false }) => (
  <>
    <Vox kind="cobble" position={[0, -0.5, 0]} size={[40, 1, 40]} />
    <Vox kind="stoneBrick" position={[0, 4.5, -6.5]} size={[24, 9, 1]} />
    <Torch position={[-3.2, 2.2, -5.8]} />
    <Torch position={[3.2, 2.2, -5.8]} />

    {/* Dramatic cyan + amber rim lights for strong silhouette separation */}
    <Glow position={isPfp ? [0, 1.35, -1.2] : [-1.5, 1.35, -1.0]} size={2.4} color="#4ce8ff" opacity={0.45} />
    <Glow position={isPfp ? [-0.9, 1.5, -1.0] : [-2.6, 1.6, -0.8]} size={1.6} color="#ffaa33" opacity={0.35} />
    <GodRay position={[0.4, 4.0, -2.5]} width={4.0} height={10} color="#4ce8ff" opacity={0.18} />
    <Dust count={95} position={[0, 1.6, 0]} area={[10, 4.5, 8]} color="#6cf0ff" opacity={0.65} />

    <BarChart
      position={isPfp ? [1.2, 0, -2.5] : [1.8, 0, -2.4]}
      values={[0.9, 1.6, 2.3, 3.0]}
      labels={["8", "16", "23", "30"]}
      colors={["#4cd964", "#34c759", "#4ce8ff", "#ffd43b"]}
    />
    <CoinPile position={[0.8, 0.04, 0.8]} count={16} />

    {/* Hero Leo in dynamic pointing-up pose holding glowing gold block */}
    <group rotation={[0.04, isPfp ? -0.28 : 0.48, 0.04]} position={isPfp ? [0, 0, 0] : [-1.6, 0, 0.45]}>
      <CitizenLead
        variant="leo"
        position={[0, 0, 0]}
        rotationY={0}
        animation="reachUp"
        face="brave"
        time={0.34}
      >
        <Block
          position={[0, 0.06, 0.24]}
          size={[0.26, 0.26, 0.26]}
          color="#ffd43b"
          emissive="#f59f00"
          emissiveIntensity={0.65}
        />
      </CitizenLead>
    </group>
    <LightPool position={[0, 0.08, 0.2]} width={8} depth={8} color="#4ce8ff" opacity={0.22} />
  </>
);

/* ─────────────────────────── EXPLAINER COMPOSITIONS ─────────────────────────── */

export const explainerBannerV1 = withBannerOverlay(
  defineFilm({
    id: "explainer-banner-v1",
    title: "Explainer Banner V1",
    fps: 30,
    width: 2560,
    height: 1440,
    look: "overworld-golden",
    post: {
      exposure: 0.96,
      bloom: 0.55,
      shaders: { preset: "vibrant-day", bloom: 0.28, threshold: 0.9, diffusion: 0.08, veil: 0.05, shafts: 0.14 },
    },
    World: () => <ExplainerDayWorld isPfp={false} />,
    scenes: [
      defineScene({
        id: "banner",
        title: "Banner",
        duration: 0.1,
        shots: [
          {
            from: [-0.8, 1.38, 3.6],
            target: [-0.15, 1.25, 0.0],
            fov: 38,
            locked: true,
            at: 0,
            dur: 0.1,
            note: "Explainer V1 sunlit hero banner with pixel-art text",
          },
        ],
        Component: () => null,
      }),
    ],
  }),
  <BannerPixelTitle title="EXPLAINER" subtitle="SYSTEMS AND ECONOMIES" accent="#52f081" />,
);

export const explainerBannerV2 = withBannerOverlay(
  defineFilm({
    id: "explainer-banner-v2",
    title: "Explainer Banner V2",
    fps: 30,
    width: 2560,
    height: 1440,
    look: "lantern-night",
    post: {
      exposure: 1.0,
      bloom: 0.6,
      shaders: { preset: "cinematic", bloom: 0.36, threshold: 0.88, warmth: 0.18, shafts: 0 },
    },
    World: () => <ExplainerNightWorld isPfp={false} />,
    scenes: [
      defineScene({
        id: "banner",
        title: "Banner",
        duration: 0.1,
        shots: [
          {
            from: [-0.8, 1.38, 3.6],
            target: [-0.15, 1.25, 0.0],
            fov: 38,
            locked: true,
            at: 0,
            dur: 0.1,
            note: "Explainer V2 neon vault banner with pixel-art text",
          },
        ],
        Component: () => null,
      }),
    ],
  }),
  <BannerPixelTitle title="EXPLAINER" subtitle="BIG IDEAS IN MINECRAFT" accent="#4ce8ff" />,
);

export const explainerPfpV1 = defineFilm({
  id: "explainer-pfp-v1",
  title: "Explainer PFP V1",
  fps: 30,
  width: 1080,
  height: 1080,
  look: "overworld-golden",
  post: {
    exposure: 0.96,
    bloom: 0.52,
    shaders: { preset: "vibrant-day", bloom: 0.28, threshold: 0.9, diffusion: 0.08, veil: 0.05, shafts: 0.14 },
  },
  World: () => <ExplainerDayWorld isPfp />,
  scenes: [
    defineScene({
      id: "pfp",
      title: "PFP",
      duration: 0.1,
      shots: [
        {
          from: [0.35, 1.28, 2.05],
          target: [0, 1.26, 0],
          fov: 34,
          locked: true,
          at: 0,
          dur: 0.1,
          note: "Explainer V1 tight chest-up golden hero PFP",
        },
      ],
      Component: () => null,
    }),
  ],
});

export const explainerPfpV2 = defineFilm({
  id: "explainer-pfp-v2",
  title: "Explainer PFP V2",
  fps: 30,
  width: 1080,
  height: 1080,
  look: "lantern-night",
  post: {
    exposure: 1.0,
    bloom: 0.58,
    shaders: { preset: "cinematic", bloom: 0.35, threshold: 0.88, warmth: 0.18, shafts: 0 },
  },
  World: () => <ExplainerNightWorld isPfp />,
  scenes: [
    defineScene({
      id: "pfp",
      title: "PFP",
      duration: 0.1,
      shots: [
        {
          from: [-0.35, 1.28, 2.05],
          target: [0, 1.26, 0],
          fov: 34,
          locked: true,
          at: 0,
          dur: 0.1,
          note: "Explainer V2 tight chest-up neon vault PFP",
        },
      ],
      Component: () => null,
    }),
  ],
});

/* ─────────────────────────── SERVERLORE WORLDS ─────────────────────────── */

const ServerLoreCherryWorld: React.FC<{ isPfp?: boolean }> = ({ isPfp = false }) => (
  <>
    <CherryCabinMap position={[0, 0, -3.5]} />
    {/* Golden sunset rays + pink cherry petal dust + warm rim halo */}
    <GodRay position={[-1.2, 4.5, -1.8]} width={4.2} height={11} color="#ffd59e" opacity={0.22} />
    <Glow position={isPfp ? [0, 1.35, -1.1] : [-1.5, 1.35, -1.0]} size={2.2} color="#ffae63" opacity={0.38} />
    <Glow position={isPfp ? [-0.8, 1.6, -1.3] : [-2.4, 1.6, -1.0]} size={1.6} color="#ff85c0" opacity={0.28} />
    <Dust count={100} position={[0, 2.0, 0]} area={[10, 5, 8]} color="#ffb3d9" opacity={0.75} />

    {/* Hero in dynamic sword-guard hero pose */}
    <group rotation={[0.05, isPfp ? -0.32 : 0.48, -0.04]} position={isPfp ? [0, 0, 0] : [-1.55, 0, 0.5]}>
      <ServerPlayer
        role="hero"
        position={[0, 0, 0]}
        rotationY={0}
        animation="guard"
        face="brave"
        time={0.32}
      >
        <group position={[0.02, 0.04, 0.24]} rotation={[0.45, 0, 0.2]}>
          <Block position={[0, -0.1, 0]} size={[0.07, 0.22, 0.07]} color="#5c3b20" />
          <Block position={[0, 0.02, 0]} size={[0.24, 0.06, 0.09]} color="#2589a3" />
          <Block position={[0, 0.34, 0]} size={[0.1, 0.6, 0.05]} color="#4deeea" emissive="#22b8cf" emissiveIntensity={0.35} />
        </group>
      </ServerPlayer>
    </group>
    <LightPool position={[0, 0.02, 0.5]} width={7} depth={7} color="#ffcc88" opacity={0.2} />
  </>
);

const ServerLoreDeskWorld: React.FC<{ isPfp?: boolean }> = ({ isPfp = false }) => (
  <>
    <DeskSetup position={[0, 0, -2.3]} screenText="SPAWN SMP" clockText="4:20" />
    {/* High-contrast emerald monitor glow + warm lamp rim */}
    <Glow position={isPfp ? [0, 1.35, -1.3] : [-1.5, 1.35, -1.2]} size={2.3} color="#42f587" opacity={0.44} />
    <Glow position={isPfp ? [0.9, 1.4, -1.4] : [-0.4, 1.4, -1.5]} size={1.6} color="#ffb347" opacity={0.34} />
    <GodRay position={[0, 3.8, -2.0]} width={3.6} height={9} color="#5ce69a" opacity={0.16} />
    <Dust count={90} position={[0, 1.6, -0.5]} area={[8, 4, 6]} color="#6cffb3" opacity={0.65} />

    {/* Hero in dynamic alert/action pose with glowing torch */}
    <group rotation={[0.05, isPfp ? 0.32 : 0.48, 0.03]} position={isPfp ? [0, 0, 0] : [-1.55, 0, 0.4]}>
      <ServerPlayer
        role="hero"
        position={[0, 0, 0]}
        rotationY={0}
        animation="push"
        face="surprised"
        time={0.28}
      >
        <group position={[0, 0.05, 0.24]} scale={0.75}>
          <Torch position={[0, 0, 0]} />
        </group>
      </ServerPlayer>
    </group>
  </>
);

/* ─────────────────────────── SERVERLORE COMPOSITIONS ─────────────────────────── */

export const serverLoreBannerV1 = withBannerOverlay(
  defineFilm({
    id: "serverlore-banner-v1",
    title: "ServerLore Banner V1",
    fps: 30,
    width: 2560,
    height: 1440,
    look: "overworld-golden",
    post: {
      exposure: 0.94,
      bloom: 0.54,
      shaders: { preset: "vibrant-day", bloom: 0.28, threshold: 0.9, diffusion: 0.08, veil: 0.05, shafts: 0.14 },
    },
    World: () => <ServerLoreCherryWorld isPfp={false} />,
    scenes: [
      defineScene({
        id: "banner",
        title: "Banner",
        duration: 0.1,
        shots: [
          {
            from: [-0.8, 1.38, 3.6],
            target: [-0.15, 1.25, 0.0],
            fov: 38,
            locked: true,
            at: 0,
            dur: 0.1,
            note: "ServerLore V1 golden cherry cabin hero banner with pixel-art text",
          },
        ],
        Component: () => null,
      }),
    ],
  }),
  <BannerPixelTitle title="SERVER LORE" subtitle="TRUE STORIES FROM THE SMP" accent="#ffb86c" />,
);

export const serverLoreBannerV2 = withBannerOverlay(
  defineFilm({
    id: "serverlore-banner-v2",
    title: "ServerLore Banner V2",
    fps: 30,
    width: 2560,
    height: 1440,
    look: "lantern-night",
    post: {
      exposure: 1.0,
      bloom: 0.6,
      shaders: { preset: "cinematic", bloom: 0.36, threshold: 0.88, shafts: 0 },
    },
    World: () => <ServerLoreDeskWorld isPfp={false} />,
    scenes: [
      defineScene({
        id: "banner",
        title: "Banner",
        duration: 0.1,
        shots: [
          {
            from: [-0.8, 1.38, 3.6],
            target: [-0.15, 1.25, 0.0],
            fov: 38,
            locked: true,
            at: 0,
            dur: 0.1,
            note: "ServerLore V2 late-night SMP room hero banner with pixel-art text",
          },
        ],
        Component: () => null,
      }),
    ],
  }),
  <BannerPixelTitle title="SERVER LORE" subtitle="UNTOLD SMP CHRONICLES" accent="#5ce69a" />,
);

export const serverLorePfpV1 = defineFilm({
  id: "serverlore-pfp-v1",
  title: "ServerLore PFP V1",
  fps: 30,
  width: 1080,
  height: 1080,
  look: "overworld-golden",
  post: {
    exposure: 0.94,
    bloom: 0.54,
    shaders: { preset: "vibrant-day", bloom: 0.28, threshold: 0.9, diffusion: 0.08, veil: 0.05, shafts: 0.14 },
  },
  World: () => <ServerLoreCherryWorld isPfp />,
  scenes: [
    defineScene({
      id: "pfp",
      title: "PFP",
      duration: 0.1,
      shots: [
        {
          from: [-0.38, 1.28, 2.05],
          target: [0, 1.26, 0],
          fov: 34,
          locked: true,
          at: 0,
          dur: 0.1,
          note: "ServerLore V1 tight chest-up golden hero PFP",
        },
      ],
      Component: () => null,
    }),
  ],
});

export const serverLorePfpV2 = defineFilm({
  id: "serverlore-pfp-v2",
  title: "ServerLore PFP V2",
  fps: 30,
  width: 1080,
  height: 1080,
  look: "lantern-night",
  post: {
    exposure: 1.0,
    bloom: 0.58,
    shaders: { preset: "cinematic", bloom: 0.36, threshold: 0.88, shafts: 0 },
  },
  World: () => <ServerLoreDeskWorld isPfp />,
  scenes: [
    defineScene({
      id: "pfp",
      title: "PFP",
      duration: 0.1,
      shots: [
        {
          from: [0.38, 1.28, 2.05],
          target: [0, 1.26, 0],
          fov: 34,
          locked: true,
          at: 0,
          dur: 0.1,
          note: "ServerLore V2 tight chest-up neon SMP PFP",
        },
      ],
      Component: () => null,
    }),
  ],
});

export const BRANDING = [
  explainerBannerV1,
  explainerBannerV2,
  explainerPfpV1,
  explainerPfpV2,
  serverLoreBannerV1,
  serverLoreBannerV2,
  serverLorePfpV1,
  serverLorePfpV2,
];
