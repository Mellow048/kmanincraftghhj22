import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** HE GOES DOWN ON HIS KNEES, and waits for what he would have done. */
const KN: Vec3 = [BKNEEL[0], -0.42, BKNEEL[2]];
const KFACE: Vec3 = [BKNEEL[0], 1.12, BKNEEL[2]];
type KFaceName = "sad" | "fear" | "dizzy" | "wow" | "crying" | "uneasy" | "smile" | "hollow";
export const Kneeling = ({ face = "sad", headPitch = 0.3, headYaw = 0 }: { face?: KFaceName; headPitch?: number; headYaw?: number }) => (
  <>
    <Brother position={KN} rotationY={WEST} animation="sit" face={face} headPitch={headPitch} headYaw={headYaw} gaze={0} />
    <Rose position={[KN[0], 1.42, KN[2]]} scale={1.5} />
  </>
);
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "You win. Do it.",
  shots: [
    {
      cue: "14.kneel",
      ...cam.push({ on: [16.85, 1.0, STREET], dist: 5.4, to: 4.8, yaw: 4, pitch: 4, fov: 42 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Side on, the two of them. He arrives at a run and pulls up a step short. His brother's legs fold, and he is on his knees in the road.",
      stage: (t, { p }) => {
        const k = ease(ramp(p, 0.25, 0.7));
        return (
          <>
            <Hero {...stride([13.6, 0, 2.8], HSTOP, ease(Math.min(1, p * 2.2)))} animation={p < 0.45 ? "run" : "idle"} face="sad" />
            <Brother position={[BKNEEL[0], -0.42 * k, BKNEEL[2]]} rotationY={WEST} animation="ache" blendTo="sit" blend={1 - k} face="dizzy" headPitch={0.3 * k} />
            <Rose position={[BKNEEL[0], 1.84 - 0.42 * k, BKNEEL[2]]} scale={1.5} />
            <FireLight position={[16.9, 2, 4.6]} power={22} reach={9} seed={3} />
          </>
        );
      },
    },
    {
      cue: "14.up",
      ...cam.push({ on: KFACE, dist: 2.3, to: 2.0, yaw: -84, pitch: 16, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Under a second, from where the teller stands, looking down: his brother's face tipping up to him. There is nothing clever left in it.",
      stage: (t, { p }) => (
        <>
          <Kneeling face="fear" headPitch={0.3 - 0.75 * ease(p)} />
          <FireLight position={[16.4, 1.9, 4.2]} power={16} reach={7} seed={3} />
        </>
      ),
    },
    {
      cue: "14.down",
      ...cam.push({ on: KFACE, dist: 2.2, to: 1.9, yaw: -70, pitch: -4, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Level with him now. He holds the look for a moment, and then his head goes down until all we can see is his hair, and the rose.",
      stage: (t, { p }) => (
        <>
          <Kneeling face="sad" headPitch={-0.45 + 1.05 * ease(ramp(p, 0.15, 0.7))} />
          <FireLight position={[16.4, 1.7, 4.2]} power={16} reach={7} seed={3} />
        </>
      ),
    },
    {
      cue: "14.win",
      ...cam.push({ on: [16.85, 1.0, STREET], dist: 4.4, to: 4.0, yaw: -6, pitch: 2, fov: 42 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The two of them, side on, and nothing moving but the fires. One standing. One kneeling with his head bowed, saying it to the road.",
      stage: () => (
        <>
          <Hero position={HSTOP} rotationY={EAST} animation="idle" face="sad" headPitch={0.25} />
          <Kneeling face="sad" headPitch={0.6} />
          <FireLight position={[16.9, 2, 4.6]} power={22} reach={9} seed={3} />
        </>
      ),
    },
  ],
});
