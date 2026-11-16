import type React from "react";
import { Block } from "../../src/engine";

/**
 * THE TELLER — who tells a "What if" film, in one place, so every film of the topic is the same kid telling a
 * different story instead of every film inventing him again.
 *
 * He is not in the pack's cast (`cast.tsx`) because the cast are the people round him; he is not in
 * `things.tsx` because he is not a prop. PACK.md has his page.
 *
 * THE CUT IS THE POINT. A default Minecraft head is a cube with hair on the top and the back: from behind it is
 * a brown box, and so is every teller of In This Town's. This one is a sweep — two blocks standing proud of the
 * cube, tall at one ear and stepping down to the other — so the outline against a wall is a diagonal, and a shot
 * from behind says which kid it is. It costs two boxes and it reads at phone size in a dark room.
 *
 *   1.8 / 32 is one Minecraft pixel in metres: the head is 8 of them, and the `head` prop is parented at the
 *   MIDDLE of the 8×8×8 head cube, so the top of the head is +1.8/16 m and one pixel is +1.8/32 m from there.
 */

const PX = 1.8 / 32;

/**
 * What the teller wears, and the colour of his hair. `hair` must be the colour the avatar itself is drawn with:
 * the head cube's own top and back are that colour, and a cut in another colour would not join them.
 *
 * Warm near-black, not In This Town's brown `#3a2415`: the two boys are not the same boy at a glance.
 */
export const HERO = {
  skin: "#dba47c",
  hair: "#241a1e",
  torso: "#ff7a1a",
  arms: "#ff7a1a",
  legs: "#2b2f6a",
} as const;

/**
 * THE CUT. Hair swept to one side: a lift over the whole crown, a taller half on one side, and its step down to
 * the other. `part` is which side is tall; his is the default, and a film that wants the mirror image says so.
 *
 *   <MinecraftAvatar scale={KID} outfit="tee" skin={HERO.skin} hair={HERO.hair}
 *     colors={{ torso: HERO.torso, arms: HERO.arms, legs: HERO.legs }} head={<TellerHair />} blink />
 *
 * Hair below the crown line is the avatar's own (`hairMat`, the top and back of the head, and `headSideTexture`
 * on the sides), so this only ever draws ON TOP of the cube and never past its cheeks.
 */
export const TellerHair: React.FC<{ hair?: string; part?: "left" | "right" }> = ({ hair = HERO.hair, part = "left" }) => {
  const p = PX;
  const top = 4 * p; // the top face of the head cube, from its middle
  const dir = part === "left" ? 1 : -1;
  // Two blocks, not three: the first is 6 px of the head's 8, the second 4 px. Each is one pixel higher and
  // set in from the last, so the cut is a staircase in silhouette — from the front, from the side, and from
  // behind, where a flat cube cut is only a rectangle.
  return (
    <group>
      <Block position={[dir * 3 * p, top + 0.5 * p, 0]} size={[6 * p, p, 8 * p]} color={hair} />
      <Block position={[dir * 2 * p, top + 1.5 * p, -0.5 * p]} size={[4 * p, p, 7 * p]} color={hair} />
    </group>
  );
};
