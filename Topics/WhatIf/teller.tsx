import type { MinecraftAvatarProps } from "../../src/engine";

/**
 * THE TELLER — who tells a "What if" film, in one place, so every film of the topic is the same kid telling a
 * different story instead of every film inventing him again.
 *
 * HAIR IS PAINTED, NOT BUILT. A Minecraft head is a cube; the top and the back already ARE the hair colour.
 * A cut is therefore what the 8×8 skin draws — the hairline, the fringe, the length at the sides — and blocks
 * standing off the cube read as a helmet. Every mark below is one whole Minecraft pixel, which is why it
 * survives being shrunk to a phone.
 */

/** His colours. `hair` is the colour the cube itself is drawn in, so the paint and the block agree. */
export const HERO = {
  skin: "#dba47c",
  hair: "#3b2a20",
  torso: "#ff7a1a",
  arms: "#ff7a1a",
  legs: "#2b2f6a",
} as const;

/**
 * THE FACE, eight rows of eight. Palette: `.` skin · `,` skin shadow · `h` hair · `H` dark hair · `b` darkest
 * hair · `w` eye white · `p` pupil · `m` mouth.
 *
 * A heavy crown that falls into a jagged fringe, the fringe cut LOW on his right so one eye is in shadow,
 * and the other side short enough to see his ear. Asymmetric, so it cannot be mistaken for a bob.
 */
export const HERO_FACE = [
  "hhhhhhhh",
  "hhhhhhhh",
  "hhhhhhhh",
  "hhhhhbHH",
  "hhhhbH.p",
  "..p..w..",
  "........",
  "...mm...",
];

/**
 * THE SIDES, eight rows of eight, painted front-to-back (the engine mirrors them for the other side). Hair
 * over the whole crown, running down the back of the head, and a sideburn in front of the ear.
 */
export const HERO_SIDE = [
  "hhhhhhhh",
  "hhhhhhhh",
  "hhhhhhhh",
  "hhhhhhhh",
  "hbhhhhhh",
  "..hhhhhh",
  "..hhbhbb",
  "...hhhhh",
];

/** The props a teller needs, so a film's `Hero` is one spread. */
export const TELLER: Pick<MinecraftAvatarProps, "skin" | "hair" | "colors" | "faceRows" | "sideRows"> = {
  skin: HERO.skin,
  hair: HERO.hair,
  colors: { torso: HERO.torso, arms: HERO.arms, legs: HERO.legs },
  faceRows: HERO_FACE,
  sideRows: HERO_SIDE,
};
