import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";
import { Kneeling } from "./scene14";

/** HE RAISES HIS HAND. For three seconds it could be either thing. */
const PALM: Vec3 = [HSTOP[0] + 0.3, 1.8, HSTOP[2] - 0.42];
const KD: Array<[number, number]> = [[-0.7, 0.8], [0.5, 0.9], [-0.5, -0.8], [0.6, -0.7], [-1.0, 0.1]];
const Flowers = ({ k }: { k: number }) => (
  <>
    {KD.map(([x, z], i) => (
      <Daisy key={i} position={[BKNEEL[0] + x, 0.02, BKNEEL[2] + z]} grow={k} scale={1.3} />
    ))}
  </>
);
export const scene15 = storyScene(timing, {
  id: "scene15",
  title: "The hand",
  shots: [
    {
      cue: "15.hand",
      ...cam.push({ on: [HSTOP[0], 1.6, HSTOP[2]], dist: 3.4, to: 3.0, yaw: 100, pitch: -14, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From the brother's knees, looking up: the teller, towering, and one arm going up over his head. Green light gathers in the palm.",
      stage: (t, { p }) => (
        <>
          <Hero position={HSTOP} rotationY={EAST} animation="idle" blendTo="reachUp" blend={1 - ease(p)} face="neutral" headPitch={0.25} />
          <Glow position={PALM} size={0.3 + 0.6 * p} color="#9dff8a" opacity={0.7 * p} />
          <FireLight position={[17.6, 1.6, 4.0]} power={16} reach={7} seed={3} />
        </>
      ),
    },
    {
      cue: "15.take",
      ...cam.push({ on: [BKNEEL[0] - 0.2, 0.8, BKNEEL[2]], dist: 3.6, to: 3.0, yaw: -52, pitch: 14, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The brother, head down, waiting. Green light pulses over him from above. Small daisies have come up in the road round his knees, where the wall passed; with each pulse they shrink, as if the light were drinking them. A power that gives could take.",
      stage: (t, { p }) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 5);
        return (
          <>
            <Kneeling face="sad" headPitch={0.6} />
            <Flowers k={1 - 0.6 * ease(p)} />
            <pointLight position={[BKNEEL[0] - 1, 2.4, BKNEEL[2] + 0.3]} color="#7dff6a" intensity={3 + 9 * p * pulse} distance={7} decay={2} />
            <Glow position={[BKNEEL[0] - 1.1, 2.3, BKNEEL[2] + 0.3]} size={1.4 + p} color="#7dff6a" opacity={0.3 + 0.4 * p * pulse} />
            <FireLight position={[16.6, 1.8, 4.4]} power={12} reach={7} seed={3} />
          </>
        );
      },
    },
    {
      cue: "15.open",
      ...cam.push({ on: [16.85, 1.1, STREET], dist: 4.8, to: 4.3, yaw: 6, pitch: 4, fov: 46 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Side on, close. The hand comes down. It is not a fist. It opens, and stops in the air in front of his brother's bowed head. The green light goes out of it, and the daisies stand back up.",
      stage: (t, { p }) => (
        <>
          <Hero position={HSTOP} rotationY={EAST} animation="reachUp" blendTo="reach" blend={1 - ease(ramp(p, 0, 0.5))} face="calm" headPitch={0.3} />
          <Kneeling face="sad" headPitch={0.6} />
          <Flowers k={0.4 + 0.6 * ease(ramp(p, 0.4, 1))} />
          <Glow position={[HSTOP[0] + 0.7, 1.3, HSTOP[2] + 0.3]} size={1.2} color="#9dff8a" opacity={0.6 * (1 - p)} />
          <FireLight position={[16.9, 2, 4.4]} power={20} reach={8} seed={3} />
        </>
      ),
    },
    {
      cue: "15.smile",
      ...cam.push({ on: [HSTOP[0], 1.35, HSTOP[2]], dist: 3.0, to: 2.2, yaw: 104, pitch: -8, fov: 38 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From his brother's place, looking up at him. He is smiling: the small, ordinary smile from the first film. He says it gently, and on 'okay?' tips his head.",
      stage: (t) => (
        <>
          <Hero position={HSTOP} rotationY={EAST} animation="reach" face="smile" headPitch={0.3} headYaw={t > wordAt("15.smile", "okay") ? 0.2 : 0} gaze={0} />
          <FireLight position={[17.6, 1.7, 4.0]} power={18} reach={7} seed={3} />
        </>
      ),
    },
  ],
});
