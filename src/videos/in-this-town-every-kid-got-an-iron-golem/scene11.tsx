import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  FaceLight, Fire, FireLight, FireMob, HeldUmbrella, Hero, PLACE, Puffs, SnowGolem, SnowPile, Snowball, Splat, Umbrella, WEST,
  arc, chestOf, ease, handAt, handUp, jolt, lerp, ramp, stickTip, throwArm, timing, wordAt,
} from "./kit";

const STAND = PLACE.stand;
/** The teller stands on his golem's left, a step behind. */
const ME: Vec3 = [STAND[0] + 0.6, 0, STAND[2] + 0.3];
const ME_ROT = -1.2;

// ---- 11.throw
const A: Vec3 = [-2.2, 3.9, 1.7];
const B: Vec3 = [-3.8, 5.1, 3.5];
const C: Vec3 = [-1.2, 5.7, 0.3];
const REL1 = wordAt("11.throw", "threw") + 0.1;
const REL2 = wordAt("11.throw", "threw", 1) + 0.08;
const REL3 = REL2 + 0.16;
const FLIGHT = 0.36;

// ---- 11.fire: the seven that are left, in a ring round him.
const SEVEN: Vec3[] = Array.from({ length: 7 }, (_, i) => {
  const a = (i / 7) * Math.PI * 2 + 0.45;
  return [STAND[0] + Math.cos(a) * 3.0, 2.7 + (i % 3) * 0.35, STAND[2] + Math.sin(a) * 1.75] as Vec3;
});
const TURN = wordAt("11.fire", "turned");
const FIRE = wordAt("11.fire", "fire");

// ---- 11.small
const CHIN = wordAt("11.small", "chin");
const BELT = wordAt("11.small", "belt");
/** How much of him is left, through 11.small. */
const left = (t: number) => lerp(lerp(lerp(0.86, 0.72, ease(ramp(t, 0.3, 0.7))), 0.52, ease(ramp(t, CHIN - 0.45, CHIN))), 0.18, ease(ramp(t, BELT - 0.45, BELT)));
const BLAST = [0.3, CHIN - 0.45, BELT - 0.45];
/** Where the fire comes from, when the ones that breathe it are out of the picture. */
const FROM: Vec3 = [STAND[0] - 3.4, 5.2, STAND[2] + 0.8];

const OPENED = wordAt("11.umbrella", "opened");
const KNEW = wordAt("11.umbrella", "knew");
const CAUGHT = wordAt("11.held", "caught");
const STILL = wordAt("11.knee", "throwing");
const REL = wordAt("11.last", "he");
const MISS = wordAt("11.last", "miss");
const LAST: Vec3 = [STAND[0] - 1.5, 3.9, STAND[2] - 0.3];

const steam = (p: Vec3, amount: number, seed = 3) =>
  amount > 0.02 ? <Puffs position={[p[0], p[1], p[2]]} color="#f2f6fa" count={8} rise={2.0} spread={0.5} size={0.28} speed={1.2} opacity={0.7 * amount} seed={seed} /> : null;

/** THE STAND. He wins, and it costs all of him. */
export const scene11 = storyScene(timing, {
  id: "scene11",
  title: "Fire melts snow",
  shots: [
    {
      cue: "11.throw",
      ...cam.push({ on: [-0.6, 2.5, 2.2], dist: 9.2, to: 8.4, yaw: 76, pitch: -8, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "'He threw. One went out. He threw. Two more': from behind him. The sticks go like a windmill and the white balls go up into the dark, and one after another the burning things over the square turn grey and fall.",
      stage: (t) => {
        const a1 = throwArm(t, REL1);
        const a2 = throwArm(t, REL2);
        const right = t < REL1 + 0.6 ? a1 : a2;
        const leftArm = throwArm(t, REL3);
        const shots: Array<{ rel: number; to: Vec3; side: number }> = [
          { rel: REL1, to: A, side: 1 },
          { rel: REL2, to: B, side: 1 },
          { rel: REL3, to: C, side: -1 },
        ];
        return (
          <>
            <SnowGolem position={STAND} rotationY={WEST} armR={right} armL={leftArm} lean={0.1 * Math.sin(t * 6)}>
              {right.holding ? <Snowball position={[0, 0.08, 0]} /> : null}
            </SnowGolem>
            <SnowPile position={[STAND[0] - 0.75, 0, STAND[2] + 0.55]} />
            {shots.map(({ rel, to, side }, i) => {
              const k = ramp(t, rel, rel + FLIGHT);
              const out = ease(ramp(t, rel + FLIGHT, rel + FLIGHT + 0.4));
              const fall = ease(ramp(t, rel + FLIGHT + 0.3, rel + FLIGHT + 1.0));
              return (
                <group key={i}>
                  {k > 0 && k < 1 ? <Snowball position={arc(stickTip(STAND, WEST, { raise: 0.2, swing: 1.4 }, side), to, k, 0.4)} size={0.2} spin={t * 8} /> : null}
                  <Splat position={to} t={t - rel - FLIGHT} size={1.3} seed={i + 1} />
                  <FireMob position={[to[0], to[1] - 3.2 * fall * fall, to[2]]} rotationY={1.2} out={out} angry={1} seed={i + 1} light={i === 0 ? 20 : 0} />
                </group>
              );
            })}
            <FireMob position={[-6.2, 6.0, 1.0]} rotationY={1.3} angry={1} seed={7} />
            <FireMob position={[-5.2, 4.3, -1.6]} rotationY={1.1} angry={1} seed={8} />
            <FireMob position={[-7.6, 5.4, 4.2]} rotationY={1.5} angry={1} seed={9} />
          </>
        );
      },
    },
    {
      cue: "11.fire",
      ...cam.push({ on: [STAND[0] + 0.2, 1.0, STAND[2]], dist: 10.6, to: 9.4, yaw: -90, pitch: 62, fov: 48 }),
      zone: "village",
      look: "overworld-night",
      note: "'They all turned on him at once. Fire melts snow': from high over the square. One small white thing, and a ring of seven burning heads round it. They swing in to face it, one after another. Then seven lines of fire meet in the middle.",
      stage: (t) => {
        const fire = ramp(t, FIRE - 0.1, FIRE + 0.25);
        const snow = 1 - 0.14 * ease(ramp(t, FIRE, FIRE + 1.0));
        const me: Vec3 = [ME[0] + 0.25, 0, ME[2] + 0.2];
        return (
          <>
            <SnowGolem position={STAND} rotationY={WEST} snow={snow} fill={6} headPitch={-0.5} armR={{ raise: 0.9, swing: 0.6 }} armL={{ raise: 0.9, swing: 0.6 }} lean={-0.12 * fire} />
            <SnowPile position={[STAND[0] - 0.75, 0, STAND[2] + 0.55]} count={4} />
            <Hero position={me} rotationY={ME_ROT} animation="idle" blendTo="cower" blend={1 - fire} face="fear" />
            <HeldUmbrella p={me} rotY={ME_ROT} />
            {SEVEN.map((p, i) => {
              const k = ease(ramp(t, TURN - 0.25 + i * 0.05, TURN + 0.1 + i * 0.05));
              const inward = Math.atan2(STAND[0] - p[0], STAND[2] - p[2]);
              return (
                <group key={i}>
                  <FireMob position={p} rotationY={lerp(inward + 2.4 + i * 0.5, inward, k)} angry={k} seed={i + 2} light={i === 3 ? 18 : 0} />
                  <Fire from={[p[0], p[1] - 0.3, p[2]]} to={[STAND[0], 1.1, STAND[2]]} power={fire} width={0.26} count={14} seed={i + 1} />
                </group>
              );
            })}
            {steam([STAND[0], 1.4, STAND[2]], fire)}
            <FaceLight position={[STAND[0], 4.5, STAND[2]]} power={14} reach={9} color="#ffb070" />
          </>
        );
      },
    },
    {
      cue: "11.small",
      ...cam.push({ on: [STAND[0] + 0.32, 0.9, STAND[2] + 0.1], dist: 4.9, to: 4.2, yaw: -4, pitch: 4, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'Every hit made him smaller. Up to my chin. Then my belt': the two of them side by side, so the boy is the ruler. Each blast of fire takes a slice off the snow. He is at the boy's chin, and throws. At his belt, and throws.",
      stage: (t) => {
        const snow = left(t);
        const blast = Math.max(...BLAST.map((at) => ramp(t, at, at + 0.1) * (1 - ramp(t, at + 0.3, at + 0.5))));
        const arm = throwArm(t % 0.9, 0.62);
        return (
          <>
            <SnowGolem position={STAND} rotationY={WEST} snow={snow} fill={5} armR={arm} armL={{ raise: 0.6, swing: 0.5 }} lean={-0.1 * blast}>
              {arm.holding ? <Snowball position={[0, 0.08, 0]} /> : null}
            </SnowGolem>
            <Fire from={FROM} to={[STAND[0] - 0.2, 0.5 + 1.0 * snow, STAND[2]]} power={blast} width={0.36} count={26} seed={2} />
            {steam([STAND[0], 0.4 + 1.2 * snow, STAND[2]], blast)}
            <Hero position={ME} rotationY={ME_ROT} animation="idle" face="fear" headYaw={0.5} headPitch={0.1 + 0.45 * (1 - snow)} gaze={0} />
            <HeldUmbrella p={ME} rotY={ME_ROT} />
            <FireLight position={[STAND[0] - 1.2, 1.4, STAND[2] + 1.4]} power={6 + 14 * blast} reach={6} />
          </>
        );
      },
    },
    {
      cue: "11.umbrella",
      ...cam.push({ on: chestOf(ME), onTo: [ME[0] - 0.15, 1.85, ME[2]], dist: 2.7, to: 4.4, yaw: -40, pitch: 3, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "'I did the only thing I knew. I opened the umbrella': the boy. He looks at the thing in his hand that he has carried all summer. His face sets. Up it goes, and on 'opened' it opens, blue, over the two of them.",
      stage: (t) => {
        const up = ease(ramp(t, KNEW - 0.05, OPENED - 0.15));
        const open = ease(ramp(t, OPENED - 0.05, OPENED + 0.14));
        return (
          <>
            <Hero position={ME} rotationY={ME_ROT} animation="reachUp" blendTo="idle" blend={up} face={t < KNEW ? "fear" : "brave"} headPitch={t < KNEW ? 0.25 : 0} headYaw={t < KNEW ? -0.4 : 0} gaze={0} />
            <HeldUmbrella p={ME} rotY={ME_ROT} up={up} open={open} />
            <FaceLight position={[ME[0] - 1.6, 1.5, ME[2] + 1.6]} power={5} />
            <SnowGolem position={STAND} rotationY={WEST} snow={0.17} fill={4} armR={throwArm(t % 0.9, 0.62)} armL={{ raise: 0.6, swing: 0.5 }} />
            <FireLight position={[STAND[0] - 1.4, 1.6, STAND[2] + 1.2]} power={10} reach={6} />
          </>
        );
      },
    },
    {
      cue: "11.held",
      ...cam.orbit({ on: [STAND[0] + 0.25, 1.35, STAND[2] + 0.15], dist: 5.0, yaw: -52, yawTo: -12, pitch: -5, distTo: 4.5, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "'I held it over him. It caught fire. I kept holding it': round the two of them. The fire comes down on the blue cloth instead of the snow. The cloth catches. He flinches and does not let go, and under it the little golem goes on throwing.",
      stage: (t) => {
        const burn = 0.75 * ease(ramp(t, CAUGHT - 0.05, CAUGHT + 0.9));
        const arm = throwArm(t % 0.95, 0.6);
        const top: Vec3 = [STAND[0] + 0.1, 2.75, STAND[2] + 0.3];
        return (
          <>
            <SnowGolem position={STAND} rotationY={WEST} snow={0.16 - 0.06 * ramp(t, 0, 2.8)} fill={4} armR={arm} armL={{ raise: 0.6, swing: 0.5 }}>
              {arm.holding ? <Snowball position={[0, 0.08, 0]} /> : null}
            </SnowGolem>
            <Hero position={ME} rotationY={ME_ROT} animation="reachUp" face={t < CAUGHT ? "brave" : "ouch"} headPitch={-0.2 + jolt(t, CAUGHT, 0.5)} gaze={0} />
            <Umbrella position={handAt(ME, ME_ROT, 1)} rotation={[0, 0, 0.3]} burn={burn} />
            <Fire from={FROM} to={top} power={1} width={0.36} count={26} seed={2} />
            <Fire from={[FROM[0] + 0.6, FROM[1] + 0.8, FROM[2] - 1.6]} to={top} power={ramp(t, 0.5, 0.9)} width={0.36} count={22} seed={5} />
            <FireLight position={[top[0], 2.0, top[2] + 0.8]} power={8 + 10 * burn} reach={6} />
          </>
        );
      },
    },
    {
      cue: "11.knee",
      ...cam.push({ on: [STAND[0] - 0.08, 0.3, STAND[2] + 0.1], dist: 2.5, to: 2.25, yaw: -34, pitch: 12, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "'He was at my knee now. Still throwing': down at the boy's shins. A pumpkin on a lump of snow no bigger than itself, two sticks that are too long for it now, and one of them winds back and throws.",
      stage: (t) => {
        const arm = throwArm(t, STILL + 0.1);
        return (
          <>
            <SnowGolem position={STAND} rotationY={WEST} snow={0.07} fill={5} wet={0.5} armR={arm} armL={{ raise: 0.5, swing: 0.5 }} lean={0.1 * ramp(t, STILL, STILL + 0.15)}>
              {arm.holding ? <Snowball position={[0, 0.08, 0]} /> : null}
            </SnowGolem>
            {!arm.holding ? <Snowball position={arc(stickTip(STAND, WEST, { raise: 0.2, swing: 1.4 }, 1, 0.07), [STAND[0] - 2.4, 2.6, STAND[2] + 0.4], ramp(t, STILL + 0.1, STILL + 0.4), 0.2)} spin={t * 9} /> : null}
            <Hero position={ME} rotationY={ME_ROT} animation="reachUp" face="ouch" />
            <Umbrella position={handAt(ME, ME_ROT, 1)} rotation={[0, 0, 0.3]} burn={0.8} />
            <FireLight position={[STAND[0] - 0.6, 1.2, STAND[2] + 1.0]} power={10} reach={5} />
          </>
        );
      },
    },
    {
      cue: "11.last",
      ...cam.push({ on: [STAND[0] - 0.36, 2.1, STAND[2]], dist: 6.9, to: 6.2, yaw: -16, pitch: -10, fov: 46 }),
      zone: "village",
      look: "overworld-night",
      note: "'One left. One snowball. He did not miss': the whole of it in one tall frame. The last burning thing comes down on them from the top. At the bottom, under what is left of the umbrella, a stick lifts the last ball, winds back, and lets go. It goes up the frame and puts the fire out.",
      stage: (t) => {
        const arm = throwArm(t, REL);
        const show = ease(ramp(t, 0.6, 0.9)) * (1 - ramp(t, REL - 0.36, REL - 0.3));
        const mob: Vec3 = [LAST[0], LAST[1] + 0.9 * (1 - ease(ramp(t, 0, REL))), LAST[2]];
        const tip = stickTip(STAND, WEST, { raise: 0.2, swing: 1.4 }, 1, 0.05);
        const k = ramp(t, REL, MISS);
        const out = ease(ramp(t, MISS, MISS + 0.45));
        const fall = ease(ramp(t, MISS + 0.35, MISS + 1.0));
        return (
          <>
            <SnowGolem position={STAND} rotationY={WEST} snow={0.05} fill={5} wet={0.6} armR={arm.holding && t < REL - 0.36 ? { raise: 0.3 + 0.75 * show, swing: 0.6 } : arm} armL={{ raise: 0.3, swing: 0.4 }}>
              {arm.holding ? <Snowball position={[0, 0.08, 0]} size={0.2} /> : null}
            </SnowGolem>
            {k > 0 && k < 1 ? <Snowball position={arc(tip, mob, k, 0.15)} size={0.2} spin={t * 9} /> : null}
            <Splat position={[mob[0] + 0.2, mob[1], mob[2] + 0.1]} t={t - MISS} size={1.5} seed={4} />
            <FireMob position={[mob[0], mob[1] - 3.2 * fall * fall, mob[2]]} rotationY={1.0} out={out} angry={1} seed={3} light={24} />
            <Fire from={[mob[0], mob[1] - 0.4, mob[2]]} to={[STAND[0] + 0.1, 2.7, STAND[2] + 0.3]} power={ramp(t, 0.2, 0.5) * (1 - ramp(t, MISS - 0.1, MISS))} width={0.34} count={24} seed={6} />
            <Hero position={ME} rotationY={ME_ROT} animation="reachUp" face={t < MISS ? "ouch" : "wow"} headPitch={-0.3} />
            <Umbrella position={handAt(ME, ME_ROT, 1)} rotation={[0, 0, 0.3]} burn={0.9} />
          </>
        );
      },
    },
  ],
});
void handUp;
