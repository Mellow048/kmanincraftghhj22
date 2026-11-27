import type React from "react";
import { Block, MinecraftAvatar, mulberry32 } from "../../src/engine";
import type { MinecraftAvatarProps, Vec3 } from "../../src/engine";
import { Crown, NameTag, PeakedCap, Spectacles, TopHat } from "./props";

/**
 * THE EXPLAINER CHANNEL CAST — DISTINCT CHANNEL BRAND IDENTITY
 *
 * CRITICAL RULE: Do NOT reuse InThisTown's default Steve/orange-tee Hero (`Hero`) or
 * InThisTown's Villagers in Explainer videos. This topic belongs to its own dedicated
 * Explainer channel, and every video pairs TWO contrasting recurring leads:
 *
 *   1. `CitizenLead` ("Miles") — the everyday / struggling / mistake-making worker.
 *      Copper-auburn hair (`hairLayer`), terracotta jacket + satchel strap, cream undershirt,
 *      round wire spectacles option, slate workwear trousers, sneakers.
 *
 *   2. `EliteLead` ("Sterling") — the rich / put-together / authority / pres / general.
 *      Tailored midnight-navy coat, gold buttons/trim/tie, champagne-blonde hair (`hairLayer`),
 *      subtle warm-gold rim silhouette. Variants: `"pres" | "general" | "tycoon"`.
 */

type AvatarBase = Partial<MinecraftAvatarProps>;

export type CitizenVariant = "leo" | "sam" | "alex" | "maya" | "builder";

const CITIZEN_VARIANTS: Record<CitizenVariant, { skin: string; hair: string; torso: string; arms: string; legs: string; glasses: boolean }> = {
  leo: { skin: "#efc29f", hair: "#7a361a", torso: "#c85537", arms: "#b5482c", legs: "#333f52", glasses: true },
  sam: { skin: "#d9a47c", hair: "#211d1a", torso: "#2b7a78", arms: "#236361", legs: "#2c3340", glasses: false },
  alex: { skin: "#f0c8a8", hair: "#c26c2d", torso: "#3b8248", arms: "#316e3c", legs: "#3b2f28", glasses: false },
  maya: { skin: "#e3b28e", hair: "#3d2314", torso: "#6c48a6", arms: "#5a3b8c", legs: "#273347", glasses: true },
  builder: { skin: "#e8ba92", hair: "#523620", torso: "#d49b2a", arms: "#b88421", legs: "#384252", glasses: false },
};

export type CitizenLeadProps = AvatarBase & {
  /** Distinct citizen look so two citizens in one scene are NEVER identical clones. */
  variant?: CitizenVariant;
  /** Render round wire spectacles on his face. Default true. */
  glasses?: boolean;
  /** Carry a leather satchel strap across his torso. Default true. */
  satchel?: boolean;
  /** Optional floating nameplate over his head (e.g. "Miles" or story name like "Paul"). */
  nameTag?: string;
  /** Rotation of nameplate if camera is off-axis. */
  nameTagYaw?: number;
};

/** Character 1: The relatable everyday / struggling / mistake-maker lead. */
export const CitizenLead: React.FC<CitizenLeadProps> = ({
  variant = "leo",
  glasses,
  satchel = true,
  nameTag,
  nameTagYaw,
  head,
  torso,
  position = [0, 0, 0],
  scale = 1,
  ...rest
}) => {
  const v = CITIZEN_VARIANTS[variant];
  const showGlasses = glasses ?? v.glasses;
  return (
  <group>
    <MinecraftAvatar
      position={position}
      scale={scale}
      outfit="hoodie"
      skin={v.skin}
      hair={v.hair}
      hairLayer
      colors={{ torso: v.torso, arms: v.arms, legs: v.legs }}
      shoes="#ebe4d3"
      rim={0.08}
      rimColor="#1c273b"
      blink
      head={
        <>
          {showGlasses ? <Spectacles /> : null}
          {head}
        </>
      }
      torso={
        <>
          {/* Cream undershirt collar + front placket */}
          <Block position={[0, 0.29, 0.132]} size={[0.14, 0.14, 0.014]} color="#f0e8d6" castShadow={false} />
          <Block position={[0, 0.02, 0.132]} size={[0.04, 0.42, 0.012]} color="#dfccb0" castShadow={false} />
          {/* Crossbody messenger satchel strap + brass buckle */}
          {satchel ? (
            <group>
              <Block position={[0, 0.03, 0.138]} rotation={[0, 0, -0.58]} size={[0.065, 0.68, 0.014]} color="#5e3a20" castShadow={false} />
              <Block position={[0, 0.03, -0.136]} rotation={[0, 0, 0.58]} size={[0.065, 0.68, 0.014]} color="#5e3a20" castShadow={false} />
              <Block position={[0.12, -0.14, 0.142]} size={[0.055, 0.055, 0.018]} color="#e0b238" castShadow={false} />
            </group>
          ) : null}
          {torso}
        </>
      }
      {...rest}
    />
    {nameTag ? (
      <NameTag
        text={nameTag}
        position={[position[0], position[1] + 2.22 * scale, position[2]]}
        rotationY={nameTagYaw}
      />
    ) : null}
  </group>
);
};

export type EliteVariant = "pres" | "general" | "tycoon";

export type EliteLeadProps = AvatarBase & {
  /** Role silhouette: "pres" (crimson tie & gold pin), "general" (brass buttons & white belt), "tycoon" (top hat & waistcoat). */
  variant?: EliteVariant;
  /** Mount the 3D gold Crown on top of his head. */
  crown?: boolean;
  /** Optional floating nameplate over his head (e.g. "Sterling" or story name like "Leon"). */
  nameTag?: string;
  nameTagYaw?: number;
};

/** Character 2: The rich, confident, put-together authority / ruler / president lead. */
export const EliteLead: React.FC<EliteLeadProps> = ({
  variant = "pres",
  crown = false,
  nameTag,
  nameTagYaw,
  head,
  torso,
  hair,
  colors,
  position = [0, 0, 0],
  scale = 1,
  ...rest
}) => {
  const defaultHair = variant === "general" ? "#452a16" : "#dcc278";
  const torsoCol = colors?.torso ?? (variant === "tycoon" ? "#1e222e" : "#18274d");
  const armCol = colors?.arms ?? torsoCol;
  const legCol = colors?.legs ?? "#101624";

  return (
    <group>
      <MinecraftAvatar
        position={position}
        scale={scale}
        outfit="suit"
        skin="#f3d4bb"
        hair={hair ?? defaultHair}
        hairLayer
        colors={{ torso: torsoCol, arms: armCol, legs: legCol }}
        shoes="#151720"
        rim={0.14}
        rimColor="#3f3112"
        blink
        head={
          <>
            {crown ? <Crown position={[0, 0.25, 0]} scale={0.94} /> : null}
            {!crown && variant === "tycoon" ? <TopHat position={[0, 0.24, 0]} band="#d4a428" /> : null}
            {head}
          </>
        }
        torso={
          variant === "general" ? (
            <>
              {/* Gold high collar */}
              <Block position={[0, 0.34, 0.132]} size={[0.28, 0.06, 0.02]} color="#ecc034" castShadow={false} />
              {/* Double-row gold brass buttons */}
              {[-0.085, 0.085].flatMap((x) =>
                [0.2, 0.09].map((y, i) => (
                  <Block key={`${x}${i}`} position={[x, y, 0.135]} size={[0.045, 0.045, 0.015]} color="#f0c438" castShadow={false} />
                )),
              )}
              {/* Crisp white military sash/belt */}
              <Block position={[0, -0.05, 0]} size={[0.53, 0.085, 0.275]} color="#f0ede4" castShadow={false} />
              <Block position={[0, -0.05, 0.142]} size={[0.085, 0.09, 0.018]} color="#ecc034" castShadow={false} />
              {/* Gold shoulder epaulettes */}
              {[-0.22, 0.22].map((x) => (
                <Block key={x} position={[x, 0.37, 0]} size={[0.1, 0.03, 0.22]} color="#ecc034" castShadow={false} />
              ))}
              {torso}
            </>
          ) : (
            <>
              {/* Crisp white shirt V + silk crimson tie + gold tie clip & lapel pin */}
              <Block position={[0, 0.26, 0.132]} size={[0.14, 0.22, 0.014]} color="#f4f2ec" castShadow={false} />
              <Block position={[0, 0.11, 0.14]} size={[0.052, 0.42, 0.016]} color="#b82424" castShadow={false} />
              <Block position={[0, 0.12, 0.15]} size={[0.06, 0.018, 0.012]} color="#ecc034" castShadow={false} />
              <Block position={[-0.14, 0.2, 0.136]} size={[0.065, 0.032, 0.015]} color="#ecc034" castShadow={false} />
              <Block position={[0, -0.07, 0.135]} size={[0.48, 0.055, 0.018]} color="#12141c" castShadow={false} />
              <Block position={[0, -0.07, 0.144]} size={[0.075, 0.06, 0.015]} color="#ecc034" castShadow={false} />
              {torso}
            </>
          )
        }
        {...rest}
      />
      {nameTag ? (
        <NameTag
          text={nameTag}
          position={[position[0], position[1] + (crown || variant === "tycoon" ? 2.52 : 2.22) * scale, position[2]]}
          rotationY={nameTagYaw}
          accent="#ffe084"
        />
      ) : null}
    </group>
  );
};

/**
 * Authority official (Head Mod in crimson robe, Supreme Judge, Pope in white robes, or Bank Official).
 * Distinct silhouette from InThisTown Villagers.
 */
export const Official: React.FC<
  AvatarBase & { role?: "mod" | "pope" | "judge" }
> = ({ role = "mod", head, torso, ...rest }) => {
  const palette =
    role === "pope"
      ? { coat: "#f2efe6", trim: "#ecc034", hat: "#f5f2ea" }
      : role === "judge"
        ? { coat: "#1a1c24", trim: "#f0ede4", hat: "#242733" }
        : { coat: "#9c2222", trim: "#ecc034", hat: "#8c1a1a" };

  return (
    <MinecraftAvatar
      outfit="gown"
      skin="#e8ba96"
      hair="#5a4a3a"
      hairLayer
      colors={{ torso: palette.coat, arms: palette.coat, legs: "#202438" }}
      shoes="#261e1a"
      head={
        <>
          {role === "pope" ? (
            <group position={[0, 0.25, 0]}>
              <Block position={[0, 0.12, 0]} size={[0.48, 0.28, 0.44]} color={palette.hat} />
              <Block position={[0, 0.04, 0.23]} size={[0.48, 0.06, 0.02]} color="#ecc034" castShadow={false} />
            </group>
          ) : (
            <PeakedCap position={[0, 0.24, 0]} color={palette.hat} visor={palette.hat} badge={palette.trim} />
          )}
          {head}
        </>
      }
      torso={
        <>
          <Block position={[0, 0.04, 0.135]} size={[0.09, 0.56, 0.015]} color={palette.trim} castShadow={false} />
          {torso}
        </>
      }
      {...rest}
    />
  );
};

const CITIZEN_COATS = ["#5c6678", "#735a44", "#4d664a", "#784c5c", "#524c66", "#826b48"];
const CITIZEN_SKINS = ["#efc29f", "#d9a278", "#f4d5bc", "#b67e56", "#8f5c3a"];
const CITIZEN_HAIRS = ["#3a281c", "#6a4228", "#202229", "#9c703c"];

/**
 * Varied crowd of citizens or uniformed soldiers (zero Villager noses, zero Steve clones).
 * `style="citizen"` wears historical coats/top-hats or wool tunics; `style="soldier"` wears peaked navy caps & belts.
 */
export const ExplainerCrowd: React.FC<{
  positions: Vec3[];
  rotationY?: number;
  style?: "citizen" | "historical" | "soldier";
  animation?: MinecraftAvatarProps["animation"];
  animDistance?: number | number[];
  blendTo?: MinecraftAvatarProps["blendTo"];
  blend?: number;
  plantFeet?: boolean;
  face?: MinecraftAvatarProps["face"];
  lookAt?: Vec3;
  time?: number;
  phaseStep?: number;
  seed?: number;
}> = ({
  positions,
  rotationY = 0,
  style = "citizen",
  animation = "idle",
  animDistance,
  blendTo,
  blend,
  plantFeet,
  face,
  lookAt,
  time,
  phaseStep = 0.25,
  seed = 1,
}) => {
  const rand = mulberry32(seed * 919 + 13);
  return (
    <>
      {positions.map((pos, i) => {
        const coat =
          style === "soldier"
            ? "#1e3266"
            : CITIZEN_COATS[Math.floor(rand() * CITIZEN_COATS.length)]!;
        const skin = CITIZEN_SKINS[Math.floor(rand() * CITIZEN_SKINS.length)]!;
        const hair = CITIZEN_HAIRS[Math.floor(rand() * CITIZEN_HAIRS.length)]!;
        return (
          <MinecraftAvatar
            key={i}
            position={pos}
            rotationY={rotationY}
            outfit={style === "soldier" ? "suit" : "hoodie"}
            skin={skin}
            hair={hair}
            hairLayer
            colors={{ torso: coat, arms: coat, legs: "#1d222e" }}
            animation={animation}
            animDistance={Array.isArray(animDistance) ? animDistance[i] : animDistance}
            blendTo={blendTo}
            blend={blend}
            plantFeet={plantFeet}
            face={face}
            lookAt={lookAt}
            time={time}
            phase={i * phaseStep}
            head={
              style === "soldier" ? (
                <PeakedCap position={[0, 0.24, 0]} />
              ) : style === "historical" ? (
                <TopHat position={[0, 0.24, 0]} color="#1c1f28" band="#4a4e5e" />
              ) : undefined
            }
            torso={
              style === "soldier" ? (
                <Block position={[0, -0.05, 0.134]} size={[0.5, 0.07, 0.015]} color="#e6e2d6" castShadow={false} />
              ) : undefined
            }
          />
        );
      })}
    </>
  );
};
