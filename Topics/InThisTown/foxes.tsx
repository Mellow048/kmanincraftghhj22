import type React from "react";
import { Block, MinecraftAvatar, Vox, shade, useFilmTime } from "../../src/engine";
import type { MinecraftAvatarProps, Vec3 } from "../../src/engine";

/**
 * FOXES — the fourth body of the series, built for "In This Town, My Family Stole Things".
 *
 * It is the cat of `catsdogs.tsx` turned around: same avatar, same faces, same clips, a pointed head where the cat's
 * ears are round, a white cheek, a snout, and a tail that is one long brush with a white tip. A fox is small and low,
 * so `scale` wants 0.62–0.66 (an adult fox stands about as high as a villager's chest).
 *
 *   <Fox who={0} animation="walk" carry={<Flower />} />      a fox in a shirt, carrying a flower in its mouth
 *   <Fox who={1} scale={0.72} animation="hold" />            the father, taller
 *   <FoxCub who={2} animation="sit" />                        a cub: shorter, bigger head
 *
 * `who` picks the coat and the shirt: six of each, all the same red-brown family, so a group reads as one family.
 * What a fox does not get: hands. Minecraft foxes carry things in their mouths, so a carried prop goes on `carry`,
 * and it rides the head. `puff` stands the tail's fur up (a fox with its tail up is a fox that has been caught).
 */

/** Six coats, all fox. The first is the teller's. */
export const FOX_FUR = ["#c8631f", "#b85618", "#d4711f", "#a94f16", "#c25c1d", "#bb6a2a"];
/** Six shirts: the teller's is the one loud colour in the film. */
export const FOX_SHIRT = ["#2f6f5a", "#8a3b2a", "#3a4f8a", "#7a5a2a", "#4a3f6a", "#2f5a3a"];
const WHITE = "#f3ece0";
const DARK = "#2a1a12";

export const foxFur = (who: number) => FOX_FUR[((who % 6) + 6) % 6];

/**
 * A fox's head, drawn inside the head's group. `half` is half the head's width, `top` the top of the head and `mouth`
 * the height of the mouth above the head's origin — the same marks `CatDogHead` takes, so the two can be swapped.
 * `sniff` 0–1 stiffens the snout; `ears` 0–1 folds the ears back (fear, or speed).
 */
export const FoxHead: React.FC<{ fur: string; half: number; top: number; mouth: number; sniff?: number; ears?: number }> = ({
  fur,
  half: h,
  top,
  mouth,
  sniff = 0,
  ears = 0,
}) => (
  <>
    {/* the ears: tall, pointed, close together on the crown, dark inside */}
    {[-1, 1].map((s) => (
      <group key={s} position={[s * h * 0.38, top + h * 0.1, -h * 0.06]} rotation={[-0.12 + ears * 0.8, 0, -s * (0.06 + ears * 0.55)]}>
        <Block position={[0, h * 0.44, 0]} size={[h * 0.42, h * 1.0, h * 0.28]} color={shade(fur, -0.12)} />
        <Block position={[0, h * 0.84, 0]} size={[h * 0.18, h * 0.28, h * 0.18]} color={shade(fur, -0.2)} />
        <Block position={[0, h * 0.42, h * 0.15]} size={[h * 0.22, h * 0.62, 0.014]} color={DARK} castShadow={false} />
      </group>
    ))}
    {/* the muzzle: one cream wedge under the eyes, black nose at the tip, and the mouth line — this is the snout,
        and it sits BELOW eye height so it never reads as a brow */}
    <group position={[0, mouth + h * 0.08 - sniff * 0.008, h * 1.0 + sniff * 0.02]}>
      <Block position={[0, h * 0.02, h * 0.2]} size={[h * 0.5, h * 0.3, h * 0.46]} color={shade(fur, 0.06)} />
      <Block position={[0, -h * 0.06, h * 0.46]} size={[h * 0.42, h * 0.26, h * 0.24]} color={WHITE} />
      <Block position={[0, h * 0.02, h * 0.6]} size={[h * 0.19, h * 0.16, h * 0.08]} color={DARK} />
      <Block position={[0, -h * 0.16, h * 0.42]} size={[h * 0.3, h * 0.04, h * 0.16]} color={DARK} castShadow={false} />
    </group>
    {/* the ruff: white fur along the jaw and the throat, well under the face */}
    <Block position={[0, mouth - h * 0.18, h * 0.86]} size={[h * 0.92, h * 0.26, h * 0.3]} color={WHITE} castShadow={false} />
  </>
);

/**
 * A fox's tail, drawn from where it joins the body: +Y up, -Z behind. One long brush that curls, sways, and ends in a
 * white tip. `up` 0 lets it hang in a curl, 1 stands it straight; `puff` 0–1 makes the fur stand out.
 */
export const FoxTail: React.FC<{ fur: string; up?: number; puff?: number; t: number; phase?: number; size?: number; wag?: number }> = ({
  fur,
  up = 0.3,
  puff = 0,
  t,
  phase = 0,
  size = 1,
  wag = 0.35,
}) => {
  const sway = Math.sin(t * 1.7 + phase) * 0.3 * wag + Math.sin(t * 9 + phase) * 0.05 * puff;
  const thick = (0.115 + puff * 0.07) * (1 + up * 0.1);
  const bend = (1 - up) * 0.5;
  const seg = 0.2;
  const piece = (i: number): React.ReactNode =>
    i > 4 ? null : (
      <group position={[0, i ? seg : 0, 0]} rotation={[i ? bend : -1.35 + up * 1.3, 0, i ? sway * (0.5 + i * 0.2) : sway * 0.4]}>
        <Block
          position={[0, seg / 2, 0]}
          size={[thick * (1 - i * 0.13), seg + 0.01, thick * (1 - i * 0.1)]}
          color={i >= 4 ? WHITE : shade(fur, i === 1 ? 0.06 : 0)}
        />
        {puff > 0.05
          ? [0, 1, 2, 3].map((q) => (
              <Block
                key={q}
                position={[Math.cos(q * 1.57 + i) * thick * 0.7, seg * 0.5, Math.sin(q * 1.57 + i) * thick * 0.7]}
                rotation={[Math.sin(q * 1.57 + i) * 0.5, 0, -Math.cos(q * 1.57 + i) * 0.5]}
                size={[0.035, 0.11 * puff, 0.035]}
                color={shade(fur, 0.12)}
                castShadow={false}
              />
            ))
          : null}
        {piece(i + 1)}
      </group>
    );
  return <group scale={size}>{piece(0)}</group>;
};

export type FoxProps = Partial<MinecraftAvatarProps> & {
  who?: number;
  /** Metres, nose to tail. 0.62 is an adult fox beside a villager. */
  scale?: number;
  /** The tail: 0 hangs in a curl, 1 stands straight. */
  tailUp?: number;
  /** Fur standing up, on the tail. */
  puff?: number;
  /** The snout stiffening: a fox working something out by smell. */
  sniff?: number;
  /** 0 standing, 1 folded flat back. Fear, or a run. */
  ears?: number;
  /** Whatever is in its mouth. Rides the head, so it swings with the turn. */
  carry?: React.ReactNode;
  /** Shirt colour. The teller's is `FOX_SHIRT[0]`, the loudest in the film. */
  shirt?: string;
  /** No tail drawn (lying down, or hidden behind a wall). */
  noTail?: boolean;
  fur?: string;
};

/** A fox: a `MinecraftAvatar` with a fox's head and tail, small and low, walking on its feet like the cats do. */
export const Fox: React.FC<FoxProps> = ({
  who = 0,
  scale = 0.64,
  tailUp = 0.3,
  puff = 0,
  sniff = 0,
  ears = 0,
  carry,
  shirt,
  noTail = false,
  fur: furIn,
  head,
  position = [0, 0, 0],
  rotationY = 0,
  ...p
}) => {
  const t = useFilmTime();
  const fur = furIn ?? foxFur(who);
  return (
    <>
      <MinecraftAvatar
        position={position}
        rotationY={rotationY}
        scale={scale}
        outfit="tee"
        skin={fur}
        hair={fur}
        colors={{ torso: shirt ?? FOX_SHIRT[who % 6], arms: "skin", legs: shade(fur, -0.3) }}
        blink
        phase={who * 2.1 + 0.3}
        head={
          <>
            <FoxHead fur={fur} half={0.225} top={0.235} mouth={-0.145} sniff={sniff} ears={ears} />
            {/* what a fox carries, it carries in its mouth: parented to the head, so it turns with it */}
            {carry ? <group position={[0, -0.15, 0.36]}>{carry}</group> : null}
            {head}
          </>
        }
        {...p}
      />
      {noTail ? null : (
        <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
          <group position={[0, 0.66, -0.14]}>
            <FoxTail fur={fur} up={tailUp} puff={puff} t={t} phase={who * 1.7} wag={0.3} />
          </group>
        </group>
      )}
    </>
  );
};

/**
 * A cub: a fox with a head too big for it. Used small in a frame so the family stacks — the tall father, the cub, and
 * the teller between them.
 */
export const FoxCub: React.FC<FoxProps> = ({ scale = 0.5, tailUp = 0.35, ...p }) => (
  <Fox scale={scale * 0.92} headRoll={0} tailUp={tailUp} {...p} />
);

// ----------------------------------------------------------------------------- what a fox carries

/**
 * The red flower: the one thing in the film that cannot be bought back. Sized for a fox's mouth (`scale` 1 is a
 * poppy at the head of a fox), and it lies sideways when a fox carries it, because a fox carries things across its
 * jaw, not upright.
 */
export const RedFlower: React.FC<{ position?: Vec3; scale?: number; rotation?: Vec3; wilt?: number }> = ({
  position = [0, 0, 0],
  scale = 0.85,
  rotation,
  wilt = 0,
}) => (
  <group position={position} scale={scale} rotation={rotation}>
    <group rotation={[0, 0, 1.15 + wilt * 0.5]}>
      <Block position={[0, -0.14, 0]} size={[0.035, 0.3, 0.035]} color="#3f8a35" />
      <Block position={[0.06, -0.06, 0]} size={[0.1, 0.03, 0.035]} color="#3f8a35" />
      <Block position={[0, 0.03, 0]} size={[0.15, 0.11, 0.15]} color="#e3261c" emissive="#e3261c" emissiveIntensity={0.35} />
      <Block position={[0, 0.09, 0]} size={[0.07, 0.03, 0.07]} color="#2a1410" />
    </group>
  </group>
);

/** Sweet berries: a bush of them, or one in a cup. `count` 1 is a single berry in a bowl. */
export const Berries: React.FC<{ position?: Vec3; scale?: number; count?: number; t?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
  count = 6,
  t = 0,
}) => (
  <group position={position} scale={scale}>
    {Array.from({ length: count }, (_, i) => {
      const a = (i / Math.max(1, count)) * Math.PI * 2 + 0.4;
      const r = count > 1 ? 0.055 + (i % 3) * 0.022 : 0;
      return (
        <Block
          key={i}
          position={[Math.cos(a) * r, 0.03 + (i % 2) * 0.012 + Math.sin(t * 2 + i) * 0.001, Math.sin(a) * r]}
          size={[0.055, 0.05, 0.055]}
          color={i % 3 === 0 ? "#b41f2a" : "#d3242f"}
          emissive="#7a1018"
          emissiveIntensity={0.2}
        />
      );
    })}
  </group>
);

/** A cooked chicken, for a sister who takes whole ones. */
export const CookedChicken: React.FC<{ position?: Vec3; scale?: number }> = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0, 0]} size={[0.16, 0.11, 0.24]} color="#b4702a" />
    <Block position={[0, 0.03, 0.16]} size={[0.09, 0.09, 0.12]} color="#c98338" />
    {[-1, 1].map((s) => (
      <Block key={s} position={[s * 0.07, -0.07, -0.12]} rotation={[0, 0, s * 0.5]} size={[0.045, 0.16, 0.045]} color="#c98338" />
    ))}
  </group>
);

/** A sword, for a father who took one. Straight down a fox's jaw, so it reads as a line in a wide shot. */
export const Sword: React.FC<{ position?: Vec3; scale?: number; rotation?: Vec3 }> = ({ position = [0, 0, 0], scale = 1, rotation }) => (
  <group position={position} scale={scale} rotation={rotation}>
    <Block position={[0, 0, 0]} size={[0.045, 0.7, 0.012]} color="#c9d3dd" />
    <Block position={[0, -0.37, 0]} size={[0.2, 0.035, 0.035]} color="#7a6a4a" />
    <Block position={[0, -0.44, 0]} size={[0.035, 0.12, 0.035]} color="#3a2a1a" />
  </group>
);

/** A cup on a sill. `flower` puts the red flower in it; `berry` puts one berry in it. */
export const SillCup: React.FC<{ position?: Vec3; scale?: number; flower?: boolean; berry?: boolean; t?: number }> = ({
  position = [0, 0, 0],
  scale = 1,
  flower = false,
  berry = false,
  t = 0,
}) => (
  <group position={position} scale={scale}>
    <Block position={[0, 0.055, 0]} size={[0.16, 0.11, 0.16]} color="#9a6a3a" />
    <Block position={[0, 0.108, 0]} size={[0.13, 0.01, 0.13]} color="#5a3a20" castShadow={false} />
    {flower ? <RedFlower position={[0, 0.13, 0]} scale={0.7} /> : null}
    {berry ? <Berries position={[0, 0.11, 0]} scale={0.9} count={1} t={t} /> : null}
  </group>
);
