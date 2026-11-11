import type { AnimName, FaceName, OutfitName, Vec3 } from "../../engine";
import { MinecraftAvatar } from "../../engine";

/**
 * __TITLE__ — cast.
 *
 * CAST RULES
 * 1. Two leads, not a crowd. They must contrast in at least three ways:
 *    want, status, silhouette, palette or posture.
 * 2. The extra is the world. Same face and body; change skin, hair and outfit.
 *    Never give an extra a want, a close-up or a line.
 * 3. Change DUO to recast the film. Add a preset to DUOS if the story needs
 *    a different pair. Keep the tagline short enough to say to a 9-year-old.
 */

/** One character's look and story job. */
export type CastLook = {
  /** One word the audience can use for this person. */
  role: string;
  /** What they want in this scene. Leads only. */
  want?: string;
  /** A plain line the narrator could say about them. */
  note?: string;
  skin: string;
  hair: string;
  outfit: OutfitName;
  face: FaceName;
  /** 1.0 is the default 1.8m body. Keep it between 0.94 and 1.08. */
  scale?: number;
};

export type DuoPreset = {
  /** The whole story in one plain sentence. */
  tagline: string;
  a: CastLook;
  b: CastLook;
};

/**
 * The three starter duos. They are deliberately broad archetypes: swap the
 * skin, hair and outfit, keep the contrast.
 */
export const DUOS = {
  noobVsPro: {
    tagline: "One has nothing. One has everything.",
    a: {
      role: "Noob",
      want: "To be picked.",
      note: "He trusts everyone.",
      skin: "#e8b78d",
      hair: "#6b4423",
      outfit: "tee",
      face: "worried",
      scale: 0.95,
    },
    b: {
      role: "Pro",
      want: "To win.",
      note: "He trusts no one.",
      skin: "#b9825a",
      hair: "#16161c",
      outfit: "hoodie",
      face: "smug",
      scale: 1.04,
    },
  },
  richVsPoor: {
    tagline: "One owns the room. One cleans it.",
    a: {
      role: "Rich",
      want: "To be obeyed.",
      note: "He has never waited for anything.",
      skin: "#d9a273",
      hair: "#2a1b12",
      outfit: "suit",
      face: "smug",
      scale: 1.02,
    },
    b: {
      role: "Poor",
      want: "To be paid.",
      note: "He counts everything.",
      skin: "#a9714b",
      hair: "#3b2a1e",
      outfit: "tee",
      face: "sad",
      scale: 0.96,
    },
  },
  bullyVsNerd: {
    tagline: "One takes space. One makes himself small.",
    a: {
      role: "Bully",
      want: "Someone to hit.",
      note: "He is never alone.",
      skin: "#c98d63",
      hair: "#1b1b1f",
      outfit: "hoodie",
      face: "angry",
      scale: 1.08,
    },
    b: {
      role: "Nerd",
      want: "To be left alone.",
      note: "He knows the answer.",
      skin: "#f0c9a0",
      hair: "#8a5a2b",
      outfit: "tee",
      face: "worried",
      scale: 0.94,
    },
  },
} satisfies Record<string, DuoPreset>;

export type DuoName = keyof typeof DUOS;

/** The reusable background face. Same body and face map, different paint. */
export const EXTRA_BASE: CastLook = {
  role: "Extra",
  note: "The world, not the story.",
  skin: "#c98d63",
  hair: "#2a1b12",
  outfit: "hoodie",
  face: "neutral",
  scale: 1,
};

export type Cast = {
  a: CastLook;
  b: CastLook;
  extra: CastLook;
};

/** Turn a duo preset into a full cast, with an overridable extra. */
export function makeCast(duo: DuoName, extra: Partial<CastLook> = {}): Cast {
  const pair = DUOS[duo];
  return {
    a: pair.a,
    b: pair.b,
    extra: { ...EXTRA_BASE, ...extra },
  };
}

/** Change this one line to recast the film. */
export const DUO: DuoName = "noobVsPro";
export const CAST = makeCast(DUO);

type CharacterMotion = {
  position?: Vec3;
  rotationY?: number;
  animation?: AnimName;
  animSpeed?: number;
  phase?: number;
  animDistance?: number;
  blendTo?: AnimName;
  blend?: number;
  blendTime?: number;
  time?: number;
  headYaw?: number;
  headPitch?: number;
  headRoll?: number;
  lookAt?: Vec3;
  gaze?: -1 | 0 | 1;
  saccade?: boolean;
  blink?: boolean;
  breath?: number;
  weightShift?: number;
  shadow?: boolean;
  shadowOpacity?: number;
  rim?: number;
  faceGlow?: number;
  children?: React.ReactNode;
};

export type CharacterProps = CharacterMotion & {
  /** Expression for this shot. Defaults to the look's resting face. */
  face?: FaceName;
};

/** The base renderer. Use this directly for a one-off look. */
export const Character: React.FC<CharacterProps & { look: CastLook }> = ({ look, face, ...motion }) => (
  <MinecraftAvatar
    {...motion}
    face={face ?? look.face}
    skin={look.skin}
    hair={look.hair}
    outfit={look.outfit}
    scale={look.scale ?? 1}
    shadow={motion.shadow ?? true}
  />
);

export type LeadProps = Omit<CharacterProps, "look">;

/** The first lead. The story starts with what this one wants. */
export const LeadA: React.FC<LeadProps> = (props) => <Character look={CAST.a} {...props} />;

/** The second lead. The story turns on the gap between their wants. */
export const LeadB: React.FC<LeadProps> = (props) => <Character look={CAST.b} {...props} />;

export type ExtraProps = LeadProps & {
  skin?: string;
  hair?: string;
  outfit?: OutfitName;
  face?: FaceName;
  scale?: number;
};

/**
 * The repeatable background character. Same face and body as the cast, with a
 * different skin tone, hair and clothes. Use it for crowds and background
 * roles; never for a third lead.
 */
export const Extra: React.FC<ExtraProps> = ({ skin, hair, outfit, face, scale, ...rest }) => (
  <Character
    look={{
      ...CAST.extra,
      skin: skin ?? CAST.extra.skin,
      hair: hair ?? CAST.extra.hair,
      outfit: outfit ?? CAST.extra.outfit,
      face: face ?? CAST.extra.face,
      scale: scale ?? CAST.extra.scale,
    }}
    {...rest}
  />
);
