import { cam, storyScene, Block, Glow } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  AT, B0, BACK, BFAR, BKNEEL, BRO, BigLeaf, Bits, Bo, Brother, Burst, CHAOS, CROWD, Card, Crowd, DAY, DOOR, Daisy, Drain, EAST, FireLight, Flame, Folk,
  GLIDE_YAW, Garden, Glider, GrowTree, HSTOP, Hero, LAND, LEAF, LavaJet, Lawn, Lids, Lit, MUD, Mira, Mom, NIGHT, NORTH, North, Old, Orbs, PLACE, Pig,
  Roots, Rose, SNIPE, SOUTH, STAND, STREET, SoundRings, Spear, SubscribeSign, TREETOP, Table, Tip, U, WEST, Wall, Wisps, ZONE, ahead, chestOf, ease,
  faceOf, flat, glideAt, hop, kidFace, lerp3, ramp, room, stride, timing, tipAt, waddle, wordAt,
} from "./kit";

/** HE STOPS CHASING. He does not need to chase. */
const HAND: Vec3 = [SNIPE[0] + 0.72, SNIPE[1] + 1.38, SNIPE[2] - 0.05];
const HITW: Vec3 = [-3.1, 3.9, 5.1];
const AIM = Math.atan2(HITW[0] - SNIPE[0], HITW[2] - SNIPE[2]);
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "White hot",
  shots: [
    {
      cue: "7.stop",
      ...cam.push({ on: [SNIPE[0], SNIPE[1] + 1.3, SNIPE[2]], dist: 3.6, to: 3.0, yaw: 70, pitch: -4, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "The brother, hanging in the air on his column of fire. He was coming after us; he pulls up, and stops dead, and tilts his head.",
      stage: (t, { p }) => {
        const x = SNIPE[0] - 2.5 * (1 - ease(Math.min(1, p * 1.8)));
        return (
          <>
            <Brother position={[x, SNIPE[1], SNIPE[2]]} rotationY={AIM} animation="idle" face="angry" headYaw={0.25 * ease(ramp(p, 0.5, 1))} />
            <Flame t={t} position={[x, SNIPE[1] - 0.75, SNIPE[2]]} size={2.2} />
            <pointLight position={[SNIPE[0] + 1.6, SNIPE[1] + 2, SNIPE[2] + 1.2]} color="#ffb070" intensity={18} distance={8} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.aim",
      ...cam.push({ on: [SNIPE[0] + 0.5, SNIPE[1] + 1.35, SNIPE[2]], dist: 4.0, to: 2.6, yaw: 30, pitch: -2, fov: 40 }),
      zone: ZONE.ruin,
      look: CHAOS,
      note: "He holds one arm straight out along his eye-line and goes very still. Fire draws itself out in front of his fist, thinner and brighter, orange, yellow, and on 'white hot' white: a spear, as long as he is.",
      stage: (t, { p }) => {
        const k = ease(ramp(p, 0.3, 0.85));
        return (
          <>
            <Brother position={SNIPE} rotationY={AIM} animation="point" face="smug" gaze={0} />
            <Flame t={t} position={[SNIPE[0], SNIPE[1] - 0.75, SNIPE[2]]} size={2.2} />
            {k > 0 ? <Spear from={HAND} to={HITW} k={0.16 * k} length={0.4 + 2.2 * k} /> : null}
            <Glow position={HAND} size={0.6 + 1.2 * p} color="#ffb060" opacity={0.6} />
            <pointLight position={[SNIPE[0] + 1.2, SNIPE[1] + 2, SNIPE[2] + 2]} color="#ffb070" intensity={14} distance={8} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.shot",
      from: [-0.2, 4.4, 9.6],
      to: [0.2, 4.2, 9.2],
      target: [-3.6, 4.1, 5.5],
      targetTo: [-2.9, 3.7, 4.9],
      fov: 44,
      ease: "linear",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "Him, gliding, still grinning. A white line comes in from behind, faster than the eye, and on 'through' goes clean through the middle of the wing. A hole with burning edges. The grin stops.",
      stage: (t, { p }) => {
        const thru = wordAt("7.shot", "through");
        const k = ramp(t, thru - 0.22, thru + 0.14);
        const hit = t > thru - 0.04;
        return (
          <>
            <Glider position={glideAt(0.72 + 0.12 * p)} yaw={GLIDE_YAW} roll={hit ? 0.5 * ease(ramp(t, thru, thru + 0.5)) : Math.sin(t * 2.2) * 0.1} hole={hit} face={hit ? "scared" : "laugh"} />
            {k > 0 && k < 1 ? <Spear from={[-8, 6.2, 5.6]} to={[1.2, 2.4, 4.7]} k={k} length={3} /> : null}
            <Bits position={glideAt(0.8)} t={t - thru + 0.04} color="#5cbd48" count={16} seed={3} power={1.3} />
            <Bits position={glideAt(0.8)} t={t - thru} color="#ff8a1c" count={10} seed={7} power={0.9} />
            <pointLight position={[-1.5, 5, 6.5]} color="#ffc890" intensity={16} distance={8} decay={2} />
          </>
        );
      },
    },
    {
      cue: "7.fell",
      from: [2.6, 0.9, 7.4],
      to: [2.2, 0.8, 6.9],
      target: [-2.6, 3.6, 4.7],
      targetTo: [-0.5, 0.6, 3.4],
      fov: 46,
      ease: "inSine",
      zone: ZONE.ruin,
      look: CHAOS,
      note: "From the ground in the square, looking up: he comes down out of the smoke spinning, the torn leaf flapping uselessly, and hits the road. On 'not far' he stops, flat on his face.",
      stage: (t, { p }) => {
        const k = Math.min(1, p / 0.55);
        const at = lerp3(glideAt(0.86), [LAND[0], 0.9, LAND[2]], k * k);
        return (
          <>
            {k >= 1 ? (
              <Hero position={flat(LAND)} rotationY={WEST} animation="lie" face="dizzy" />
            ) : (
              <Glider position={at} yaw={GLIDE_YAW + k * 5} pitch={1.15 + k * 2} roll={0.5 + k * 3} hole face="scared" />
            )}
            <Bits position={[LAND[0], 0.2, LAND[2]]} t={(p - 0.55) * 3} color="#8a7a66" count={18} seed={5} power={1.5} />
            <Bits position={[LAND[0], 0.4, LAND[2]]} t={(p - 0.55) * 3} color="#5cbd48" count={12} seed={8} power={1.1} />
            <Lit at={LAND} />
          </>
        );
      },
    },
  ],
});
