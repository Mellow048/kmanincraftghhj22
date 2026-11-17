import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Cinder, EAST, FaceLight, FireMob, Folk, HeldUmbrella, Hero, Kid, NORTH, PLACE, Puffs, ROBE, SOUTH, SatGolem, SnowGolem, SnowPile, Snowball, Splat, Umbrella, WEST,
  arc, ease, handAt, jolt, ramp, snowFace, stickTip, timing, wordAt,
} from "./kit";

const STAND = PLACE.stand;
const MARK = PLACE.mark;
/** Where the ball leaves his stick. */
const TIP = stickTip(STAND, WEST, { raise: 0.2, swing: 1.4 });
const HIT = wordAt("10.hit", "hit") + 0.06;
const WENT = wordAt("10.hit", "went");
const TURNED = wordAt("10.look", "turned");

/** The people in the square, all looking the wrong way. [x, z, robe, kid?] */
const CROWD: Array<[number, number, string, boolean?]> = [
  [-1.5, 2.1, ROBE.brown], [-2.5, 3.3, ROBE.white], [-1.1, 3.7, ROBE.friend, true], [-3.1, 1.3, ROBE.farmer],
];

/** ONE SNOWBALL. The turn: the thing everybody laughed at is the only thing that works. */
export const scene10 = storyScene(timing, {
  id: "scene10",
  title: "One snowball",
  shots: [
    {
      cue: "10.ball",
      ...cam.push({ on: arc(TIP, MARK, 0.1, 0.5), onTo: arc(TIP, MARK, 0.9, 0.5), dist: 3.3, to: 2.9, yaw: 24, pitch: -6, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "'Then one snowball flew across the square': the lens flies beside it. One small white ball, turning over in the firelight, crossing the whole burning square above the heads of people who have not seen it yet.",
      stage: (t, { p }) => {
        // The same ease as the camera, so the ball stays in the middle of the frame.
        const k = 0.1 + 0.8 * (0.5 - 0.5 * Math.cos(Math.PI * p));
        return (
          <>
            <Snowball position={arc(TIP, MARK, k, 0.5)} size={0.22} spin={t * 7} />
            <Folk spots={[[1.4, 1.2, WEST, ROBE.brown], [-0.3, 0.2, WEST, ROBE.white], [-1.6, 1.6, WEST - 0.4, ROBE.blue], [0.4, 2.0, WEST, ROBE.friend, true]]} nod={-0.3} />
            <Kid n={2} position={[-0.9, 0, 0.9]} rotationY={WEST} animation="cower" />
            <FireMob position={[-5.5, 5.2, -1.5]} rotationY={0.9} angry={1} seed={6} />
            <FireMob position={[-2.6, 6.4, -3.2]} rotationY={0.4} angry={1} seed={9} />
          </>
        );
      },
    },
    {
      cue: "10.hit",
      ...cam.push({ on: [MARK[0], MARK[1] - 0.3, MARK[2]], onTo: [MARK[0], MARK[1] - 1.5, MARK[2]], dist: 4.3, to: 3.9, yaw: 34, pitch: -9, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'It hit one in the face. It went out, like a candle': the ball bursts on the burning head. The thing rocks back, and stops turning, and the fire goes out of it from the top down. Grey, with a thread of steam, it drops out of the picture.",
      stage: (t) => {
        const out = ease(ramp(t, WENT - 0.05, WENT + 0.5));
        const drop = ease(ramp(t, WENT + 0.45, WENT + 1.1));
        const k = ramp(t, HIT - 0.16, HIT);
        return (
          <>
            {k < 1 ? <Snowball position={arc(TIP, MARK, 0.9 + 0.1 * k, 0.5)} size={0.22} spin={t * 7} /> : null}
            <Splat position={[MARK[0] + 0.3, MARK[1], MARK[2] + 0.15]} t={t - HIT} size={1.4} seed={3} />
            <FireMob position={[MARK[0] - 0.25 * ramp(t, HIT, HIT + 0.1) + jolt(t, HIT, 0.25), MARK[1] - 2.6 * drop * drop, MARK[2]]} rotationY={EAST - 0.5} out={out} angry={1 - ramp(t, HIT, HIT + 0.1)} light={24} seed={1} />
            {t > WENT + 0.4 ? <Puffs position={[MARK[0], MARK[1] - 0.4, MARK[2]]} color="#e6ecf2" count={7} rise={2.6} spread={0.4} size={0.3} speed={0.6} opacity={0.6} seed={5} /> : null}
          </>
        );
      },
    },
    {
      cue: "10.look",
      ...cam.push({ on: [-0.6, 1.15, 2.6], dist: 6.4, to: 5.5, yaw: 90, pitch: 3, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'Everyone turned around': the grey thing lies steaming in the road, and everybody who was looking at it turns, one after another, to look past us at where the snowball came from. The teller is the last.",
      stage: (t) => {
        const turn = (i: number) => WEST + Math.PI * ease(ramp(t, TURNED - 0.2 + i * 0.07, TURNED + 0.12 + i * 0.07));
        const me: Vec3 = [0.55, 0, 2.2];
        return (
          <>
            <Cinder position={[MARK[0], 0, MARK[2]]} seed={2} />
            {CROWD.map(([x, z, robe, kid], i) => (
              <Folk key={i} spots={[[x, z, turn(i), robe, kid]]} />
            ))}
            <Kid n={3} position={[-0.5, 0, 3.4]} rotationY={turn(2)} animation="idle" face="wow" />
            <SatGolem position={[-4.6, 0, 3.6]} rotationY={SOUTH} droop={0.6} headYaw={1.0 * ease(ramp(t, TURNED, TURNED + 0.4))} />
            <Hero position={me} rotationY={turn(5)} animation="idle" face="wow" gaze={0} />
            <HeldUmbrella p={me} rotY={turn(5)} />
            <FaceLight position={[2.6, 2.0, 2.8]} power={9} reach={8} />
          </>
        );
      },
    },
    {
      cue: "10.puddle",
      ...cam.push({ on: snowFace(STAND), onTo: [STAND[0] - 0.3, 1.0, STAND[2] + 0.1], dist: 3.6, to: 4.4, yaw: -72, pitch: -12, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'It was Puddle. And he had more': him, from low down, with the burning town behind him, tossing a snowball in one stick. Pull back and down on 'more': a heap of them at his foot.",
      stage: (t) => {
        const toss = Math.abs(Math.sin(t * 5.2));
        const arm = { raise: 0.55 + 0.12 * toss, swing: 0.9 };
        const tip = stickTip(STAND, WEST, arm);
        return (
          <>
            <SnowGolem position={STAND} rotationY={WEST} fill={7} headRoll={0.1} armR={arm} armL={{ raise: 0.35, swing: 0.3 }} />
            <Snowball position={[tip[0], tip[1] + 0.14 + 0.42 * toss, tip[2]]} spin={t * 6} />
            <SnowPile position={[STAND[0] - 0.75, 0, STAND[2] + 0.55]} />
            <SnowPile position={[STAND[0] - 0.55, 0, STAND[2] - 0.6]} count={8} />
          </>
        );
      },
    },
  ],
});
void NORTH;
