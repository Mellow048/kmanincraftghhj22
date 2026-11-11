import type React from "react";
import {
  Block,
  Glow,
  PixelText,
  Vox,
  clamp01,
  lerp,
  mulberry32,
  pixelTex,
  shade,
  useFilmTime,
} from "../../src/engine";
import type { Vec3 } from "../../src/engine";

/**
 * The monsters of the "In This Town" films, built from boxes.
 *
 * Every creature faces +Z, stands with its feet on `position`, and animates
 * itself from the film clock. Shared by every film in this topic.
 */

// ----------------------------------------------------------------------------- rank sign

/** The wooden board every monster wears. `post` plants it in the ground instead. */
export const RankSign: React.FC<{
  position?: Vec3;
  rotationY?: number;
  rank: string;
  scale?: number;
  gold?: boolean;
  post?: boolean;
}> = ({ position = [0, 0, 0], rotationY = 0, rank, scale = 1, gold = false, post = false }) => (
  <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
    <Vox kind="planks" size={[1.5, 0.82, 0.08]} />
    <Block position={[0, 0.41, 0]} size={[1.58, 0.07, 0.12]} color="#5c3f24" />
    <Block position={[0, -0.41, 0]} size={[1.58, 0.07, 0.12]} color="#5c3f24" />
    <PixelText text="RANK" position={[0, 0.2, 0.046]} height={0.24} color="#ffe2a8" />
    <PixelText text={rank} position={[0, -0.13, 0.046]} height={0.4} maxWidth={1.4} color={gold ? "#ffd84a" : "#ffffff"} />
    {gold ? <Glow position={[0, 0, 0.1]} size={2.4} color="#ffd84a" opacity={0.35} /> : null}
    {post ? <Block position={[0, -1.0, -0.03]} size={[0.12, 1.25, 0.1]} color="#5c3f24" /> : null}
  </group>
);

// ----------------------------------------------------------------------------- egg

/** Egg silhouette: [width, centre height] of each 0.1 m layer, bottom to top. 0.78 m tall at scale 1. */
const EGG: Array<[number, number]> = [
  [0.4, 0.05],
  [0.58, 0.15],
  [0.68, 0.25],
  [0.7, 0.35],
  [0.64, 0.45],
  [0.52, 0.55],
  [0.38, 0.65],
  [0.2, 0.74],
];
const eggHalf = (y: number) => EGG.reduce((best, l) => (Math.abs(l[1] - y) < Math.abs(best[1] - y) ? l : best))[0] / 2;

/** The zig-zag down the front: [x, y, width, height]. */
const CRACK: Array<[number, number, number, number]> = [
  [0.03, 0.74, 0.05, 0.1],
  [-0.02, 0.65, 0.05, 0.1],
  [0.03, 0.57, 0.14, 0.05],
  [0.08, 0.49, 0.05, 0.12],
  [0.02, 0.41, 0.16, 0.05],
  [-0.05, 0.33, 0.05, 0.13],
  [0.01, 0.25, 0.15, 0.05],
  [0.07, 0.17, 0.05, 0.12],
  [0.03, 0.09, 0.05, 0.08],
  [-0.14, 0.45, 0.12, 0.04],
  [0.17, 0.29, 0.1, 0.04],
];

export const MonsterEgg: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  color?: string;
  /** Colour of the speckles. Healthy eggs have them; a dead-looking one does not. */
  spots?: string;
  cracked?: boolean;
  /** 0 = the crack is a dark line. 1 = fire shows through it. */
  glow?: number;
  /** 0 = whole. 1 = the top has lifted off. */
  open?: number;
  /** Lean in radians, for a tap or a wobble. */
  tilt?: number;
  /** The soft glow around a lit crack. Turn it off when many lit eggs sit together, or they wash out. */
  halo?: boolean;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  color = "#8f9197",
  spots,
  cracked = false,
  glow = 0,
  open = 0,
  tilt = 0,
  halo = true,
}) => {
  const map = pixelTex(color, [2, 1], { size: 8, jitter: 0.09 });
  const lit = glow > 0.02;
  const layer = ([w, y]: [number, number], i: number) => (
    <Block key={i} position={[0, y, 0]} size={[w, 0.1, w]} map={map} />
  );
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group rotation={[0, 0, tilt]}>
        {EGG.slice(0, 4).map(layer)}
        <group position={[0.16 * open, 0.42 * open, 0]} rotation={[0, 0, -0.7 * open]}>
          {EGG.slice(4).map((l, i) => layer(l, i + 4))}
        </group>
        {spots
          ? [
              [0.2, 0.3, 1],
              [-0.22, 0.42, 1],
              [0.05, 0.56, 1],
              [-0.1, 0.18, 1],
              [0.24, 0.3, -1],
              [-0.16, 0.5, -1],
            ].map(([x, y, side], i) => (
              <Block
                key={i}
                position={[x, y, side * (eggHalf(y) + 0.004)]}
                size={[0.12, 0.1, 0.012]}
                color={spots}
                castShadow={false}
              />
            ))
          : null}
        {cracked
          ? CRACK.filter(([, y]) => open < 0.05 || y < 0.42).map(([x, y, w, h], i) => (
              <Block
                key={i}
                position={[x, y, eggHalf(y) + 0.008]}
                size={[w, h, 0.02]}
                color={lit ? "#ffb347" : "#1b1b20"}
                emissive={lit ? "#ff8a1e" : undefined}
                emissiveIntensity={lit ? glow * 3.2 : 0}
                castShadow={false}
              />
            ))
          : null}
        {lit && halo ? <Glow position={[0, 0.4, 0.36]} size={0.8 + glow * 1.1} color="#ff9a3c" opacity={0.15 + glow * 0.3} /> : null}
        {open > 0.05 ? <Glow position={[0, 0.5, 0]} size={1.6 * open} color="#ffd27a" opacity={0.6 * open} /> : null}
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- worm

export const Worm: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  /** Metres crawled. Drives the inch-worm ripple, so it never slides. */
  crawl?: number;
  /** 0 = flat. 1 = head and neck reared up. */
  lift?: number;
  /** 0 = shut. 1 = wide open. */
  mouth?: number;
  rank?: string;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, crawl = 0, lift = 0, mouth = 0, rank }) => {
  const t = useFilmTime();
  const body = "#a78bd6";
  const stripe = "#ff9a3c";
  const n = 5;
  const headY = 0.085 + lift * 0.16 + Math.sin(t * 2.2) * 0.004;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {Array.from({ length: n - 1 }, (_, i) => {
        const k = i / (n - 1);
        const hump = Math.max(0, Math.sin(crawl * 14 - k * 3.4)) * 0.05;
        const size = 0.1 + k * 0.035;
        return (
          <Block
            key={i}
            position={[0, size / 2 + hump + lift * 0.1 * k * k, -0.24 + k * 0.44]}
            size={[size, size, 0.12]}
            color={i % 2 === 1 ? stripe : body}
            emissive={i % 2 === 1 ? stripe : body}
            emissiveIntensity={i % 2 === 1 ? 0.7 : 0.3}
          />
        );
      })}
      <group position={[0, headY, 0.22]} rotation={[-lift * 0.5, 0, 0]}>
        <Block size={[0.17, 0.17, 0.16]} color={body} emissive={body} emissiveIntensity={0.3} />
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.045, 0.03, 0.081]}>
            <Block size={[0.066, 0.076, 0.012]} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.35} castShadow={false} />
            <Block position={[0, -0.006, 0.006]} size={[0.034, 0.046, 0.012]} color="#15121c" castShadow={false} />
          </group>
        ))}
        <Block
          position={[0, -0.05, 0.081]}
          size={[0.05 + mouth * 0.03, 0.012 + mouth * 0.05, 0.012]}
          color="#2a1420"
          castShadow={false}
        />
      </group>
      {rank ? <RankSign position={[0, 0.62, 0]} rank={rank} scale={0.34} post /> : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- dragon

export const Dragon: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  color?: string;
  belly?: string;
  /** 0 = head up. 1 = head on the ground. */
  bow?: number;
  /** Turn of the neck, radians. */
  headYaw?: number;
  /** 0 = shut. 1 = jaw wide: breathing fire, or a sneeze. */
  mouth?: number;
  /** Beat the wings as if flying. */
  fly?: boolean;
  /** Rear the head back before a sneeze: 0..1. */
  rear?: number;
  /** 0 = wings out. 1 = wings folded back along the body: a narrow dragon, for a narrow frame. */
  fold?: number;
  rank?: string;
  gold?: boolean;
  phase?: number;
}> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  color = "#c9412b",
  belly = "#f1c57c",
  bow = 0,
  headYaw = 0,
  mouth = 0,
  fly = false,
  rear = 0,
  fold = 0,
  rank,
  gold = false,
  phase = 0,
}) => {
  const t = useFilmTime() + phase;
  const map = pixelTex(color, [2, 2], { size: 8, jitter: 0.08 });
  const dark = shade(color, -0.28);
  const wing = fly ? Math.sin(t * 9) * 0.75 : 0.42 + Math.sin(t * 1.9) * 0.07;
  const breathe = Math.sin(t * 2.1) * 0.012;
  const neck = lerp(-0.12, 1.0, bow) - rear * 0.55;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group position={[0, breathe, 0]} rotation={[bow * 0.16, 0, 0]}>
        <Block position={[0, 0.78, 0]} size={[0.82, 0.7, 1.5]} map={map} />
        <Block position={[0, 0.5, 0.06]} size={[0.6, 0.22, 1.24]} color={belly} />
        {[0.35, 0, -0.35].map((z, i) => (
          <Block key={i} position={[0, 1.2, z]} size={[0.1, 0.16, 0.2]} color={dark} />
        ))}

        <group position={[0, 0.82, -0.72]} rotation={[0.28, Math.sin(t * 1.7) * 0.28, 0]}>
          <Block position={[0, 0, -0.34]} size={[0.46, 0.4, 0.7]} map={map} />
          <Block position={[0, -0.05, -0.94]} size={[0.3, 0.28, 0.6]} map={map} />
          <Block position={[0, -0.09, -1.4]} size={[0.18, 0.18, 0.42]} color={dark} />
          <Block position={[0, -0.09, -1.66]} size={[0.34, 0.06, 0.24]} color={dark} />
        </group>

        <group position={[0, 1.0, 0.62]} rotation={[neck, headYaw, 0]}>
          <Block position={[0, 0.3, 0.1]} size={[0.38, 0.78, 0.38]} map={map} />
          <group position={[0, 0.72, 0.16]} rotation={[-neck * 0.55, 0, 0]}>
            <Block position={[0, 0, 0.14]} size={[0.6, 0.48, 0.66]} map={map} />
            <Block position={[0, -0.04, 0.62]} size={[0.44, 0.24, 0.34]} color={shade(color, 0.1)} />
            <Block
              position={[0, -0.21 - mouth * 0.07, 0.54]}
              rotation={[mouth * 0.55, 0, 0]}
              size={[0.4, 0.08, 0.44]}
              color={dark}
            />
            {mouth > 0.2 ? <Block position={[0, -0.13, 0.6]} size={[0.3, 0.1, 0.3]} color="#ffb02e" emissive="#ff7a14" emissiveIntensity={2} castShadow={false} /> : null}
            {[-1, 1].map((s) => (
              <group key={s}>
                <Block position={[s * 0.17, 0.09, 0.475]} size={[0.15, 0.15, 0.012]} color="#ffffff" castShadow={false} />
                <Block position={[s * 0.17, 0.08, 0.482]} size={[0.07, 0.1, 0.012]} color="#16110f" castShadow={false} />
                <Block position={[s * 0.2, 0.36, -0.06]} rotation={[-0.4, 0, 0]} size={[0.1, 0.34, 0.1]} color="#f4e4b8" />
                <Block position={[s * 0.1, 0.07, 0.795]} size={[0.05, 0.05, 0.012]} color="#3a1410" castShadow={false} />
              </group>
            ))}
          </group>
        </group>

        {[
          [-0.36, 0.48],
          [0.36, 0.48],
          [-0.36, -0.5],
          [0.36, -0.5],
        ].map(([x, z], i) => (
          <group key={i}>
            <Block position={[x, 0.24, z]} size={[0.27, 0.48, 0.32]} color={dark} />
            <Block position={[x, 0.05, z + 0.12]} size={[0.3, 0.1, 0.4]} color={shade(color, -0.4)} />
          </group>
        ))}

        {[-1, 1].map((s) => (
          <group key={s} position={[0.38 * s, 1.1, 0.12]} rotation={[0, s * fold * 1.25, s * lerp(wing, 0.5, fold)]}>
            <Block position={[0.6 * s, 0, 0]} size={[1.2, 0.07, 0.95]} color={dark} />
            <Block position={[1.42 * s, 0, -0.12]} size={[0.5, 0.06, 0.62]} color={shade(color, -0.42)} />
            <Block position={[0.6 * s, 0.04, 0.44]} size={[1.24, 0.1, 0.1]} color={color} />
          </group>
        ))}
      </group>
      {rank ? <RankSign position={[0, 0.74, 0.86]} rank={rank} scale={0.5} gold={gold} /> : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- phoenix

export const Phoenix: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  /** Beating wings, or folded on a perch. */
  fly?: boolean;
  bow?: number;
  /** A letter in its claws. */
  letter?: boolean;
  rank?: string;
  phase?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, fly = true, bow = 0, letter = false, rank, phase = 0 }) => {
  const t = useFilmTime() + phase;
  const wing = fly ? Math.sin(t * 11) * 0.8 : -1.15;
  const lift = fly ? Math.sin(t * 11 + 1.2) * 0.05 : 0;
  const hot = "#ff5a00";
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group position={[0, lift, 0]} rotation={[bow * 0.5, 0, 0]}>
        <Block position={[0, 0.5, 0]} size={[0.36, 0.42, 0.56]} color="#ff7a1a" emissive={hot} emissiveIntensity={0.55} />
        <Block position={[0, 0.42, 0.16]} size={[0.28, 0.28, 0.26]} color="#ffd23a" emissive="#ffae00" emissiveIntensity={0.5} />
        <group position={[0, 0.8, 0.24]} rotation={[bow * 0.9, 0, 0]}>
          <Block size={[0.28, 0.28, 0.3]} color="#ff9a2a" emissive={hot} emissiveIntensity={0.4} />
          <Block position={[0, -0.03, 0.22]} size={[0.1, 0.08, 0.16]} color="#ffe27a" />
          {[-1, 1].map((s) => (
            <Block key={s} position={[s * 0.142, 0.04, 0.06]} size={[0.012, 0.07, 0.07]} color="#1a0f08" castShadow={false} />
          ))}
          {[0, 1, 2].map((i) => (
            <Block
              key={i}
              position={[0, 0.2 + i * 0.03, -0.06 - i * 0.09]}
              rotation={[-0.5, 0, 0]}
              size={[0.07, 0.2, 0.06]}
              color={i === 1 ? "#ffd23a" : "#e62e12"}
              emissive={hot}
              emissiveIntensity={0.8}
            />
          ))}
        </group>
        {[-1, 0, 1].map((i) => (
          <Block
            key={i}
            position={[i * 0.12, 0.36 - Math.abs(i) * 0.03, -0.66]}
            rotation={[0.32 + Math.sin(t * 3 + i) * 0.06, i * 0.22, 0]}
            size={[0.11, 0.05, 0.85]}
            color={i === 0 ? "#ffd23a" : "#e62e12"}
            emissive={hot}
            emissiveIntensity={0.9}
          />
        ))}
        {[-1, 1].map((s) => (
          <group key={s} position={[0.19 * s, 0.64, 0.04]} rotation={[0, 0, s * wing]}>
            <Block position={[0.4 * s, 0, 0]} size={[0.78, 0.05, 0.44]} color="#ff7a1a" emissive={hot} emissiveIntensity={0.6} />
            <Block position={[0.9 * s, 0, -0.04]} size={[0.42, 0.04, 0.32]} color="#ffd23a" emissive="#ffae00" emissiveIntensity={0.9} />
          </group>
        ))}
        {[-1, 1].map((s) => (
          <Block key={s} position={[s * 0.09, 0.16, 0.02]} size={[0.045, 0.3, 0.045]} color="#ffcf4a" />
        ))}
        {letter ? (
          <group position={[0, 0.02, 0.08]}>
            <Block size={[0.34, 0.03, 0.24]} color="#fbf6e6" />
            <Block position={[0, 0.02, 0]} size={[0.07, 0.02, 0.07]} color="#c22a1e" />
          </group>
        ) : null}
        <Glow position={[0, 0.5, 0]} size={1.9} color="#ff9a3c" opacity={0.4} />
      </group>
      {rank ? <RankSign position={[0, 0.3, 0.42]} rank={rank} scale={0.42} /> : null}
    </group>
  );
};

// ----------------------------------------------------------------------------- golem

export const Golem: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  /** Metres walked. Drives the legs. */
  walk?: number;
  /** 0 = arms hanging. 1 = arms out in front, carrying. */
  carry?: number;
  bow?: number;
  /** Eye colour. They glow. */
  eyes?: string;
  rank?: string;
  /** Whatever lies in its arms. Origin is the middle of the forearms. */
  children?: React.ReactNode;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, walk = 0, carry = 0, bow = 0, eyes = "#ffcf5a", rank, children }) => {
  const t = useFilmTime();
  const swing = Math.sin(walk * 2.3) * 0.42;
  const bob = Math.abs(Math.sin(walk * 2.3)) * 0.06 + Math.sin(t * 1.2) * 0.012;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.42, 1.15, 0]} rotation={[s * swing, 0, 0]}>
          <Vox kind="stone" position={[0, -0.575, 0]} size={[0.56, 1.15, 0.56]} />
        </group>
      ))}
      <group position={[0, 1.15 + bob, 0]} rotation={[bow * 0.75, 0, 0]}>
        <Vox kind="cobble" position={[0, 0.68, 0]} size={[1.7, 1.26, 0.95]} />
        <Vox kind="mossy" position={[-0.45, 1.2, 0]} size={[0.82, 0.24, 0.97]} />
        <Vox kind="mossy" position={[0.6, 0.3, 0.02]} size={[0.52, 0.5, 0.97]} />
        <group position={[0, 1.7, 0.05]}>
          <Vox kind="stone" size={[0.76, 0.78, 0.76]} />
          <Block position={[0, 0.16, 0.385]} size={[0.62, 0.1, 0.03]} color="#4b4b4b" castShadow={false} />
          {[-1, 1].map((s) => (
            <Block
              key={s}
              position={[s * 0.17, 0.05, 0.386]}
              size={[0.15, 0.1, 0.02]}
              color={eyes}
              emissive={eyes}
              emissiveIntensity={2.4}
              castShadow={false}
            />
          ))}
          <Vox kind="stone" position={[0, -0.14, 0.46]} size={[0.18, 0.4, 0.18]} />
        </group>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 1.1, 1.18, 0]} rotation={[-carry * 1.3 - (1 - carry) * s * swing * 0.7, 0, 0]}>
            <Vox kind="cobble" position={[0, -0.82, 0]} size={[0.5, 1.8, 0.5]} />
          </group>
        ))}
        <group position={[0, 1.18 - 0.2, 1.0]}>{children}</group>
        {rank ? <RankSign position={[0, 0.62, 0.5]} rank={rank} scale={0.56} /> : null}
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- the mother

/**
 * Bigger than the town. She grips whatever is at `position` (the top of a wall)
 * with both forefeet; her body is behind it and her head comes over it.
 * She has the same crack as the egg.
 */
/** Her hide: lighter than basalt, or she is only a hole in a dark sky. */
const HIDE = "#6b5a80";

export const Mother: React.FC<{
  position?: Vec3;
  rotationY?: number;
  scale?: number;
  /** 0 = wings folded. 1 = wings across the whole sky. */
  spread?: number;
  /** 0 = head high. 1 = head lowered over the wall, to look. */
  lower?: number;
  /** Eye and crack brightness. */
  fire?: number;
}> = ({ position = [0, 0, 0], rotationY = 0, scale = 1, spread = 1, lower = 0, fire = 1 }) => {
  const t = useFilmTime();
  const bone = "#d9d2c0";
  const hot = "#ff8a1e";
  const pulse = fire * (1 + Math.sin(t * 2.4) * 0.12);
  const breathe = Math.sin(t * 1.3) * 0.15;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {[-1, 1].map((s) => (
        <group key={s}>
          <Vox kind="basalt" tint={HIDE} tile={3} position={[s * 5.2, 1.2, 0.3]} size={[3.6, 2.4, 4.6]} />
          {[-1, 0, 1].map((toe) => (
            <group key={toe} position={[s * 5.2 + toe * 1.25, 0.9, 2.6]} rotation={[0.75, 0, 0]}>
              <Vox kind="basalt" tint={HIDE} tile={3} size={[0.95, 1, 2.6]} />
              <Block position={[0, -0.1, 1.7]} rotation={[0.5, 0, 0]} size={[0.6, 0.6, 1.5]} color={bone} />
            </group>
          ))}
          <Vox kind="basalt" tint={HIDE} tile={3} position={[s * 5.2, 8, -2.2]} rotation={[-0.28, 0, 0]} size={[3.2, 13, 3.4]} />
        </group>
      ))}

      <group position={[0, breathe, 0]}>
        <Vox kind="basalt" tint={HIDE} tile={4} position={[0, 17, -7]} size={[19, 14, 12]} />
        {/* The egg's own crack, seventeen times the size. The viewer has looked at this shape for three minutes. */}
        {CRACK.map(([x, y, w, h], i) => (
          <Block
            key={i}
            position={[x * 17, 10.2 + y * 17, -0.95]}
            size={[w * 17, h * 17, 0.3]}
            color="#ffb347"
            emissive={hot}
            emissiveIntensity={2.6 * pulse}
            castShadow={false}
          />
        ))}
        <Glow position={[0.4, 17, 0.5]} size={22} color={hot} opacity={0.3 * fire} />

        <Vox kind="basalt" tint={HIDE} tile={3} position={[0, 24, -0.5]} rotation={[0.5, 0, 0]} size={[6, 6, 9]} />
        <Vox kind="basalt" tint={HIDE} tile={3} position={[0, lerp(23.5, 20, lower), 6]} rotation={[0.85, 0, 0]} size={[5, 5, 9]} />

        <group position={[0, lerp(19.5, 11.5, lower), lerp(11.5, 13.5, lower)]} rotation={[lerp(0.42, 0.95, lower), 0, 0]}>
          <Vox kind="basalt" tint={HIDE} tile={3} size={[8, 5.6, 9]} />
          {/* The snout is low, so the eyes above it can be seen from the street. */}
          <Vox kind="basalt" tint={HIDE} tile={3} position={[0, -1.5, 6.6]} size={[5.8, 2.6, 4.6]} />
          <Block position={[0, -3.5 - (1 - lower) * 0.4, 3.6]} rotation={[0.12, 0, 0]} size={[5.4, 1.1, 8.4]} color={shade(HIDE, -0.45)} />
          {[-1, 1].map((s) => (
            <group key={s}>
              <Block
                position={[s * 2.5, 1.2, 4.56]}
                rotation={[0, 0, -s * 0.3]}
                size={[2.4, 1.3, 0.2]}
                color="#ffd27a"
                emissive={hot}
                emissiveIntensity={4 * pulse}
                castShadow={false}
              />
              <Block position={[s * 2.5, 1.2, 4.68]} rotation={[0, 0, -s * 0.3]} size={[0.5, 1.3, 0.1]} color="#1a0d06" castShadow={false} />
              <Glow position={[s * 2.5, 1.2, 5.4]} size={7} color={hot} opacity={0.5 * fire} />
              <Block position={[s * 3, 4.6, -2.6]} rotation={[-0.6, 0, s * 0.2]} size={[1.1, 6, 1.1]} color={bone} />
              <Block position={[s * 1.5, 3.8, -3.6]} rotation={[-0.8, 0, s * 0.1]} size={[0.8, 3.6, 0.8]} color={bone} />
              <Block position={[s * 1.5, -0.9, 8.92]} size={[0.8, 0.6, 0.1]} color={hot} emissive={hot} emissiveIntensity={2 * pulse} castShadow={false} />
              {[0, 1, 2].map((tooth) => (
                <Block key={tooth} position={[s * 2.3, -2.6, 2.4 + tooth * 2.2]} size={[0.5, 1.1, 0.6]} color={bone} />
              ))}
            </group>
          ))}
        </group>

        {[-1, 1].map((s) => (
          <group
            key={s}
            position={[s * 9, 23, -6]}
            rotation={[0, -s * lerp(1.2, 0.18, spread), s * lerp(-0.5, 0.34, spread)]}
          >
            <Block position={[s * 13, 0, 0]} size={[26, 1.6, 1.6]} color={bone} />
            <Vox kind="basalt" tint={HIDE} tile={4} position={[s * 9, -9, -0.4]} size={[18, 17, 0.6]} />
            <Vox kind="basalt" tint={HIDE} tile={4} position={[s * 24, -6.5, -0.4]} size={[12, 12, 0.6]} />
            {[6, 14, 22].map((x) => (
              <Block key={x} position={[s * x, -8, 0]} rotation={[0, 0, s * 0.1]} size={[0.7, 15, 0.9]} color={bone} />
            ))}
          </group>
        ))}
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------- small things

export const Chicken: React.FC<{ position?: Vec3; rotationY?: number; scale?: number; phase?: number }> = ({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  phase = 0,
}) => {
  const t = useFilmTime() + phase;
  const peck = Math.max(0, Math.sin(t * 3.1)) ** 6;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Block position={[0, 0.34, 0]} size={[0.3, 0.3, 0.42]} color="#f4f4f4" />
      <Block position={[-0.17, 0.34, 0]} size={[0.05, 0.2, 0.3]} color="#dedede" />
      <Block position={[0.17, 0.34, 0]} size={[0.05, 0.2, 0.3]} color="#dedede" />
      <group position={[0, 0.5, 0.2]} rotation={[peck * 0.9, 0, 0]}>
        <Block position={[0, 0.1, 0]} size={[0.2, 0.3, 0.16]} color="#f4f4f4" />
        <Block position={[0, 0.1, 0.13]} size={[0.2, 0.08, 0.1]} color="#f2b21a" />
        <Block position={[0, 0.02, 0.1]} size={[0.08, 0.1, 0.06]} color="#d82a1a" />
        {[-1, 1].map((s) => (
          <Block key={s} position={[s * 0.101, 0.17, 0.03]} size={[0.01, 0.05, 0.05]} color="#111111" castShadow={false} />
        ))}
      </group>
      {[-1, 1].map((s) => (
        <Block key={s} position={[s * 0.07, 0.1, 0.02]} size={[0.04, 0.2, 0.04]} color="#f2b21a" />
      ))}
    </group>
  );
};

/**
 * Fire as flying cubes, from a mouth to whatever it hits.
 * `funnel` narrows it to a point at the far end: fire being drunk, not thrown.
 */
export const Fire: React.FC<{
  from: Vec3;
  to: Vec3;
  /** 0..1: how much of the stream exists. Ramp it up to start a breath. */
  power?: number;
  /** 0..1: how much of the stream has already been swallowed, from the mouth end. */
  tail?: number;
  width?: number;
  funnel?: boolean;
  count?: number;
  seed?: number;
}> = ({ from, to, power = 1, tail = 0, width = 0.3, funnel = false, count = 22, seed = 3 }) => {
  const t = useFilmTime();
  if (power <= 0.01 || tail >= 0.99) return null;
  const rand = mulberry32(seed * 977 + 13);
  const length = Math.hypot(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
  return (
    <group>
      {Array.from({ length: count }, (_, i) => {
        const jx = rand() * 2 - 1;
        const jy = rand() * 2 - 1;
        const jz = rand() * 2 - 1;
        const k = (i / count + t * (2.4 + rand() * 0.8)) % 1;
        if (k > power || k < tail) return null;
        const fan = (funnel ? 1 - k : 0.25 + k) * width;
        const size = (funnel ? lerp(0.2, 0.06, k) : lerp(0.1, 0.3, k)) * (0.8 + rand() * 0.5);
        const color = k < 0.25 ? "#fff3b0" : k < 0.6 ? "#ffb02e" : "#ff5a1e";
        return (
          <mesh
            key={i}
            position={[
              lerp(from[0], to[0], k) + jx * fan,
              lerp(from[1], to[1], k) + jy * fan,
              lerp(from[2], to[2], k) + jz * fan,
            ]}
            rotation={[k * 5 + i, k * 3, i]}
          >
            <boxGeometry args={[size, size, size]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={clamp01((1 - k) * 2.2) * 0.95} />
          </mesh>
        );
      })}
      {tail < 0.05 ? <Glow position={from} size={0.9 + length * 0.12} color="#ffb347" opacity={0.5 * power} /> : null}
      <Glow position={to} size={1.6} color="#ff7a1e" opacity={0.55 * power} />
    </group>
  );
};

/** Smoke, steam or dust: cubes that rise, swell and fade. */
export const Puffs: React.FC<{
  position: Vec3;
  color?: string;
  count?: number;
  rise?: number;
  spread?: number;
  size?: number;
  speed?: number;
  opacity?: number;
  seed?: number;
}> = ({ position, color = "#d8d8d8", count = 7, rise = 1.3, spread = 0.3, size = 0.2, speed = 0.55, opacity = 0.6, seed = 5 }) => {
  const t = useFilmTime();
  const rand = mulberry32(seed * 131 + 3);
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const jx = rand() * 2 - 1;
        const jz = rand() * 2 - 1;
        const k = (t * speed * (0.8 + rand() * 0.4) + i / count) % 1;
        const s = size * (0.5 + k * 1.2);
        return (
          <mesh key={i} position={[jx * spread * (0.4 + k), k * rise, jz * spread * (0.4 + k)]} rotation={[0, i + k, 0]}>
            <boxGeometry args={[s, s, s]} />
            <meshBasicMaterial color={color} transparent opacity={opacity * (1 - k) * clamp01(k * 6)} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
};

/** A sound you can see: square rings that leave a mouth and grow. They face +Z. */
export const SoundRings: React.FC<{ position: Vec3; rotationY?: number; t: number; color?: string; reach?: number }> = ({
  position,
  rotationY = 0,
  t,
  color = "#c9f4ff",
  reach = 1.2,
}) => (
  <group position={position} rotation={[0, rotationY, 0]}>
    {[0, 1, 2].map((i) => {
      const k = t * 1.5 - i * 0.28;
      if (k <= 0 || k >= 1) return null;
      const r = 0.06 + k * reach;
      const w = 0.02 + k * 0.03;
      const o = (1 - k) * 0.95;
      const bar = (x: number, y: number, sx: number, sy: number, key: string) => (
        <mesh key={key} position={[x, y, k * 0.5]}>
          <boxGeometry args={[sx, sy, 0.02]} />
          <meshBasicMaterial color={color} transparent opacity={o} toneMapped={false} depthWrite={false} />
        </mesh>
      );
      return (
        <group key={i}>
          {bar(0, r, r * 2 + w, w, "t")}
          {bar(0, -r, r * 2 + w, w, "b")}
          {bar(r, 0, w, r * 2 + w, "r")}
          {bar(-r, 0, w, r * 2 + w, "l")}
        </group>
      );
    })}
  </group>
);
