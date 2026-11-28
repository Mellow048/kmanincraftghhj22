import type React from "react";
import { AbsoluteFill } from "remotion";
import {
  Block,
  Clouds,
  Dust,
  Glow,
  LightPool,
  Torch,
  Vox,
  cam,
  defineFilm,
  defineScene,
} from "./engine";
import {
  BarChart,
  CitizenLead,
  CoinPile,
  EmeraldFountain,
  ShopStall,
} from "../Topics/Explainer";
import { PlainsVillageMap } from "../Topics/InThisTown";
import {
  CherryCabinMap,
  DeskSetup,
  ServerPlayer,
} from "../Topics/ServerLore";
import { ShopStand } from "../Topics/Shared/universal";

/* ─────────────────────────── SHARED BANNER OVERLAYS ─────────────────────────── */

const BannerTitle: React.FC<{
  title: string;
  subtitle: string;
  accent: string;
  bgBadge?: string;
}> = ({ title, subtitle, accent, bgBadge = "rgba(10, 14, 22, 0.72)" }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: "14%",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 18,
        padding: "36px 52px",
        borderRadius: 20,
        background: bgBadge,
        border: `3px solid ${accent}`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', 'Arial Black', sans-serif",
          fontWeight: 900,
          fontSize: 96,
          letterSpacing: 4,
          lineHeight: 1,
          color: "#ffffff",
          textShadow: `0 6px 0 rgba(0,0,0,0.65), 0 0 28px ${accent}55`,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "'Inter', Arial, sans-serif",
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: 5,
          color: accent,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 36,
            height: 5,
            background: accent,
            borderRadius: 3,
          }}
        />
        {subtitle}
      </div>
    </div>
  </AbsoluteFill>
);

/* ─────────────────────────── EXPLAINER CHANNEL ART ─────────────────────────── */

const ExplainerDayWorld: React.FC = () => (
  <>
    <PlainsVillageMap night={false} />
    <Clouds y={26} />
    <ShopStand position={[3.6, 0, -2.5]} rotationY={-0.35} />
    <ShopStall position={[-4.2, 0, -3.5]} rotationY={0.45} price="25" showPickaxe />
    <BarChart
      position={[-1.9, 0, -1.6]}
      values={[0.9, 1.4, 2.0, 2.7]}
      labels={["10", "15", "20", "27"]}
      colors={["#37c967", "#37c967", "#4ef27c", "#ffd84d"]}
    />
    <CoinPile position={[1.8, 0, 0.8]} count={16} kind="emerald" />
    <EmeraldFountain position={[2.2, 0.8, -0.8]} t={0.6} count={14} color="#4ce8ff" />
    <CitizenLead
      variant="leo"
      position={[-0.4, 0, 0.4]}
      rotationY={0.25}
      animation="cheer"
      face="grin"
      time={0.2}
    />
    <LightPool position={[0, 0.04, 0]} width={8} depth={8} color="#fff2c4" opacity={0.22} />
    <Dust position={[0, 2.2, 0]} area={[10, 4, 10]} count={28} color="#fff6d6" opacity={0.35} />
  </>
);

const ExplainerNightWorld: React.FC = () => (
  <>
    <Vox kind="stoneBrick" position={[0, -0.5, 0]} size={[44, 1, 44]} />
    <Vox kind="stone" position={[0, 0.04, -1.5]} size={[12, 0.08, 10]} />
    <Block position={[0, 3.2, -5.8]} size={[18, 6.4, 0.4]} color="#141c2b" />
    <Torch position={[-3.2, 1.4, -3.6]} light={3.2} />
    <Torch position={[3.2, 1.4, -3.6]} light={3.2} />
    <BarChart
      position={[2.0, 0.08, -1.2]}
      values={[1.0, 1.6, 2.3, 3.0]}
      labels={["10", "16", "23", "30"]}
      colors={["#2eb85c", "#37c967", "#4ce8ff", "#ffd84d"]}
    />
    <CoinPile position={[-2.0, 0.08, 0.4]} count={18} kind="gold" />
    <Glow position={[2.0, 2.2, -1.2]} size={2.2} color="#4ce8ff" opacity={0.28} />
    <CitizenLead
      variant="leo"
      position={[-0.4, 0.08, 0.5]}
      rotationY={0.2}
      animation="point"
      face="wow"
      time={0.2}
    />
    <LightPool position={[0, 0.1, 0]} width={8} depth={8} color="#4ce8ff" opacity={0.2} />
  </>
);

export const explainerBannerV1 = defineFilm({
  id: "explainer-banner-v1",
  title: "Explainer Banner V1",
  fps: 30,
  width: 2560,
  height: 1440,
  look: "overworld-day",
  post: {
    exposure: 0.94,
    bloom: 0.45,
    shaders: { preset: "vibrant-day", bloom: 0.24, threshold: 0.92, diffusion: 0.06, veil: 0.04, shafts: 0.12 },
  },
  World: ExplainerDayWorld,
  scenes: [
    defineScene({
      id: "banner",
      title: "Banner",
      duration: 0.1,
      shots: [
        {
          from: [-2.4, 2.0, 5.2],
          target: [0.4, 1.35, -0.2],
          fov: 40,
          locked: true,
          at: 0,
          dur: 0.1,
          note: "Explainer V1 sunlit market banner",
        },
      ],
      Component: () => (
        <BannerTitle
          title="EXPLAINER"
          subtitle="SYSTEMS • ECONOMIES • IN BLOCKS"
          accent="#52f081"
        />
      ),
    }),
  ],
});

export const explainerBannerV2 = defineFilm({
  id: "explainer-banner-v2",
  title: "Explainer Banner V2",
  fps: 30,
  width: 2560,
  height: 1440,
  look: "lantern-night",
  post: {
    exposure: 0.98,
    bloom: 0.55,
    shaders: { preset: "cinematic", bloom: 0.35, threshold: 0.9, warmth: 0.2, shafts: 0 },
  },
  World: ExplainerNightWorld,
  scenes: [
    defineScene({
      id: "banner",
      title: "Banner",
      duration: 0.1,
      shots: [
        {
          from: [-2.2, 1.9, 5.2],
          target: [0.5, 1.35, -0.2],
          fov: 40,
          locked: true,
          at: 0,
          dur: 0.1,
          note: "Explainer V2 dark vault banner",
        },
      ],
      Component: () => (
        <BannerTitle
          title="EXPLAINER"
          subtitle="BIG IDEAS IN MINECRAFT"
          accent="#4ce8ff"
          bgBadge="rgba(8, 12, 22, 0.8)"
        />
      ),
    }),
  ],
});

export const explainerPfpV1 = defineFilm({
  id: "explainer-pfp-v1",
  title: "Explainer PFP V1",
  fps: 30,
  width: 1080,
  height: 1080,
  look: "overworld-day",
  post: {
    exposure: 0.94,
    bloom: 0.45,
    shaders: { preset: "vibrant-day", bloom: 0.22, threshold: 0.92, diffusion: 0.05, veil: 0.03, shafts: 0.1 },
  },
  World: ExplainerDayWorld,
  scenes: [
    defineScene({
      id: "pfp",
      title: "PFP",
      duration: 0.1,
      Component: () => null,
      shots: [
        {
          ...cam.front({ actor: [-0.4, 0.2, 0.4], facing: 0.25, dist: 2.8, side: 14, pitch: 4, fov: 36 }),
          locked: true,
          at: 0,
          dur: 0.1,
          note: "Explainer V1 close portrait PFP",
        },
      ],
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
    exposure: 0.98,
    bloom: 0.55,
    shaders: { preset: "cinematic", bloom: 0.32, threshold: 0.9, shafts: 0 },
  },
  World: ExplainerNightWorld,
  scenes: [
    defineScene({
      id: "pfp",
      title: "PFP",
      duration: 0.1,
      Component: () => null,
      shots: [
        {
          ...cam.front({ actor: [-0.4, 0.28, 0.5], facing: 0.2, dist: 2.8, side: -14, pitch: 4, fov: 36 }),
          locked: true,
          at: 0,
          dur: 0.1,
          note: "Explainer V2 dark vault portrait PFP",
        },
      ],
    }),
  ],
});

/* ─────────────────────────── SERVERLORE CHANNEL ART ─────────────────────────── */

const ServerLoreCherryWorld: React.FC = () => (
  <>
    <CherryCabinMap night={false} />
    <Clouds y={25} />
    <Vox kind="planks" tint="#b57a40" position={[0, 0.35, 1.4]} size={[2.2, 0.12, 0.7]} />
    <Vox kind="planks" tint="#8a5a2c" position={[-0.9, 0.18, 1.4]} size={[0.18, 0.36, 0.6]} />
    <Vox kind="planks" tint="#8a5a2c" position={[0.9, 0.18, 1.4]} size={[0.18, 0.36, 0.6]} />
    <Torch position={[-2.4, 1.3, 1.2]} light={2.6} />
    <Torch position={[2.4, 1.3, 1.2]} light={2.6} />
    <ServerPlayer
      role="hero"
      position={[-0.4, 0, 0.6]}
      rotationY={0.28}
      animation="wave"
      face="smile"
      time={0.2}
    />
    <Dust position={[0, 2.0, 0]} area={[10, 4, 10]} count={30} color="#ffd6ea" opacity={0.38} />
  </>
);

const ServerLoreDeskWorld: React.FC = () => (
  <>
    <Vox kind="planks" tint="#6a482c" position={[0, -0.15, 0]} size={[14, 0.3, 12]} />
    <Block position={[0, 2.5, -3.2]} size={[14, 5.0, 0.35]} color="#182538" />
    <Block position={[-4.8, 2.5, 1.0]} size={[0.35, 5.0, 10]} color="#131e2e" />
    <DeskSetup position={[0.4, 0, -1.6]} screenText="SPAWN SMP" screenColor="#5ce69a" clockText="4:20" />
    <ServerPlayer
      role="hero"
      position={[-0.4, 0, -0.6]}
      rotationY={0.35}
      animation="press"
      face="surprised"
      time={0.2}
    />
    <Glow position={[0.4, 1.35, -1.6]} size={1.8} color="#5ce69a" opacity={0.32} />
    <LightPool position={[0, 0.04, -0.8]} width={6} depth={6} color="#5ce69a" opacity={0.22} />
  </>
);

export const serverLoreBannerV1 = defineFilm({
  id: "serverlore-banner-v1",
  title: "ServerLore Banner V1",
  fps: 30,
  width: 2560,
  height: 1440,
  look: "overworld-golden",
  post: {
    exposure: 0.92,
    bloom: 0.45,
    shaders: { preset: "vibrant-day", bloom: 0.24, threshold: 0.92, diffusion: 0.06, veil: 0.04, shafts: 0.12 },
  },
  World: ServerLoreCherryWorld,
  scenes: [
    defineScene({
      id: "banner",
      title: "Banner",
      duration: 0.1,
      shots: [
        {
          from: [-2.2, 1.85, 5.2],
          target: [0.5, 1.3, 0.4],
          fov: 40,
          locked: true,
          at: 0,
          dur: 0.1,
          note: "ServerLore V1 golden cherry cabin banner",
        },
      ],
      Component: () => (
        <BannerTitle
          title="SERVER LORE"
          subtitle="TRUE STORIES FROM THE SMP"
          accent="#ffb86c"
        />
      ),
    }),
  ],
});

export const serverLoreBannerV2 = defineFilm({
  id: "serverlore-banner-v2",
  title: "ServerLore Banner V2",
  fps: 30,
  width: 2560,
  height: 1440,
  look: "lantern-night",
  post: {
    exposure: 0.98,
    bloom: 0.55,
    shaders: { preset: "cinematic", bloom: 0.35, threshold: 0.9, shafts: 0 },
  },
  World: ServerLoreDeskWorld,
  scenes: [
    defineScene({
      id: "banner",
      title: "Banner",
      duration: 0.1,
      shots: [
        {
          from: [-2.0, 1.65, 3.6],
          target: [0.4, 1.15, -1.0],
          fov: 42,
          locked: true,
          at: 0,
          dur: 0.1,
          note: "ServerLore V2 late-night SMP room banner",
        },
      ],
      Component: () => (
        <BannerTitle
          title="SERVER LORE"
          subtitle="4:20 AM • UNTOLD CHRONICLES"
          accent="#5ce69a"
          bgBadge="rgba(8, 16, 24, 0.8)"
        />
      ),
    }),
  ],
});

export const serverLorePfpV1 = defineFilm({
  id: "serverlore-pfp-v1",
  title: "ServerLore PFP V1",
  fps: 30,
  width: 1080,
  height: 1080,
  look: "overworld-golden",
  post: {
    exposure: 0.92,
    bloom: 0.45,
    shaders: { preset: "vibrant-day", bloom: 0.22, threshold: 0.92, diffusion: 0.05, veil: 0.03, shafts: 0.1 },
  },
  World: ServerLoreCherryWorld,
  scenes: [
    defineScene({
      id: "pfp",
      title: "PFP",
      duration: 0.1,
      Component: () => null,
      shots: [
        {
          ...cam.front({ actor: [-0.4, 0.2, 0.6], facing: 0.28, dist: 2.8, side: 14, pitch: 4, fov: 36 }),
          locked: true,
          at: 0,
          dur: 0.1,
          note: "ServerLore V1 cherry cabin portrait PFP",
        },
      ],
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
    exposure: 0.98,
    bloom: 0.55,
    shaders: { preset: "cinematic", bloom: 0.35, threshold: 0.9, shafts: 0 },
  },
  World: ServerLoreDeskWorld,
  scenes: [
    defineScene({
      id: "pfp",
      title: "PFP",
      duration: 0.1,
      Component: () => null,
      shots: [
        {
          ...cam.front({ actor: [-0.4, 0.2, -0.6], facing: 0.35, dist: 2.7, side: -16, pitch: 4, fov: 36 }),
          locked: true,
          at: 0,
          dur: 0.1,
          note: "ServerLore V2 late-night monitor glow PFP",
        },
      ],
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
