import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Bits, Cart, Chicken, Cow, Dad, EAST, HalfHouse, Hero, IronGolem, Kid, Loaf, NORTH, ROBE, SOUTH, SnowGolem, SnowTrail, Snowball, Splat, Umbrella, Villager, WEST,
  arc, beside, ease, faceOf, handUp, jolt, ramp, room, snowFace, stickTip, throwArm, timing, villagerFace, wordAt,
} from "./kit";

// ---- 3.at: three throws from one spot.
const P: Vec3 = [3.0, 0, 3.4];
const BIRD: Vec3 = [1.2, 0, -0.3];
const BAKER: Vec3 = [4.7, 0, -1.3];
const ME: Vec3 = [4.45, 0, 2.5];
const toward = (a: Vec3, b: Vec3) => Math.atan2(b[0] - a[0], b[2] - a[2]);
const HIT = [wordAt("3.at", "birds") + 0.07, wordAt("3.at", "baker") + 0.08, wordAt("3.at", "me") + 0.05];
const FLY = [0.2, 0.22, 0.13];
const AIM: Vec3[] = [[BIRD[0], 0.45, BIRD[2]], villagerFace(BAKER), faceOf(ME)];
/** He turns the short way round: west of north, then east of it. */
const TURN = [toward(P, BIRD) + Math.PI * 2, toward(P, BAKER), toward(P, ME)];

const NOON = wordAt("3.noon", "noon");
const PUDDLE = wordAt("3.name", "puddle");

/** WHAT THEY DO, AND WHAT MINE DOES. Three iron golems at work, then the snow one. */
export const scene3 = storyScene(timing, {
  id: "scene3",
  title: "Theirs and mine",
  shots: [
    {
      cue: "3.carts",
      ...cam.truck({ on: [4.4, 1.5, 2.4], dist: 9, yaw: 66, pitch: 5, by: [1.9, 0, 0], fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'Iron golems pulled the carts': one comes down the road at us with a hay cart behind it, a shaft in each hand, and its kid sitting on top of the hay.",
      stage: (t) => {
        const d = 1.3 * t;
        const cart = 1.2 + d;
        return (
          <>
            <IronGolem position={[cart + 4.25, 0, 2.4]} rotationY={EAST} walk={d} armR={0.9} armL={0.9} />
            <Cart position={[cart, 0, 2.4]} rotationY={EAST} roll={d} />
            <Kid n={3} position={[cart + 0.8, 1.08, 2.4]} rotationY={EAST} animation="sit" face="grin" />
          </>
        );
      },
    },
    {
      cue: "3.cows",
      ...cam.push({ on: [11.2, 2.3, 2.3], onTo: [10.2, 2.3, 2.3], dist: 7.4, to: 6.4, yaw: -72, pitch: -7, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'They carried the cows home': from low in the road, a golem walks at us with a cow held over its head, legs swinging. A second one behind it has another.",
      stage: (t) => {
        const d = 1.25 * t;
        const one: Vec3 = [12.2 - d, 0, 2.1];
        const two: Vec3 = [15.6 - d, 0, 3.3];
        return (
          <>
            <IronGolem position={one} rotationY={WEST} walk={d} armR={-2.9} armL={-2.9} />
            <Cow position={[one[0] - 0.45, 3.22, one[2]]} rotationY={SOUTH} dangle={1} />
            <IronGolem position={two} rotationY={WEST} walk={d + 1.3} armR={-2.9} armL={-2.9} />
            <Cow position={[two[0] - 0.45, 3.22, two[2]]} rotationY={NORTH} dangle={1} />
            <Kid n={4} position={[one[0] - 1.5, 0, 3.0]} rotationY={WEST} animation="walk" animDistance={d} />
          </>
        );
      },
    },
    {
      cue: "3.roof",
      ...cam.pan({ from: [-20.6, 1.25, 14.2], on: [-21.3, 0.95, 9.3], onTo: [-20.6, 3.3, 7.2], fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'One held up a roof while the builder ate lunch': the builder on a block with a loaf, chewing. Tilt up: half a house, and where the second wall should be an iron golem with the roof on its hands, looking down at him.",
      stage: (t) => (
        <>
          <HalfHouse position={[-21, 0, 7.2]} />
          <IronGolem position={[-20.0, 0, 7.2]} armR={-2.95} armL={-2.95} headPitch={0.45} headYaw={-0.55 * ease(ramp(t, 0.5, 1.2))} />
          <Villager position={[-21.5, -0.06, 9.3]} sit robe={ROBE.farmer} hat="straw" hmm={0.7 + 0.3 * Math.sin(t * 9)} carry={<Loaf />} nod={0.2} />
        </>
      ),
    },
    {
      cue: "3.mine",
      ...cam.push({ on: [2.52, 1.3, 3.2], dist: 5.0, to: 4.5, yaw: 12, pitch: -3, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Mine threw snowballs': Puddle, close, winds a stick back and lets one go past the lens. The teller, behind him, watches where it is going.",
      stage: (t) => {
        const p: Vec3 = [2.2, 0, 3.2];
        const at = wordAt("3.mine", "threw") + 0.12;
        const a = throwArm(t, at);
        const k = ramp(t, at, at + 0.4);
        return (
          <>
            <SnowGolem position={p} rotationY={0.25} armR={a} armL={{ raise: 0.2, swing: 0.3 }} lean={0.12 * ramp(t, at - 0.07, at + 0.05) * (1 - ramp(t, at + 0.2, at + 0.5))} headRoll={0.08}>
              {a.holding ? <Snowball position={[0, 0.08, 0]} /> : null}
            </SnowGolem>
            {!a.holding && k < 1 ? <Snowball position={arc(stickTip(p, 0.25, a), [3.4, 1.5, 7.2], k, 0.25)} spin={t * 9} /> : null}
            <Hero position={[3.02, 0, 2.3]} rotationY={-0.1} animation="idle" face={t < at ? "uneasy" : "fear"} headYaw={0.4 * ramp(t, at, at + 0.3)} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "3.at",
      ...cam.pan({ from: [3.7, 2.8, 8.4], on: [2.0, 0.8, 0.4], onTo: [4.35, 1.1, 1.5], fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "'At birds. At the baker. At me': from behind him. One at the chicken, which goes up in feathers; one at the baker's face, with the bread still in his sleeves; and he turns round and puts the third in mine.",
      stage: (t) => {
        const rot = TURN[0] + (TURN[1] - TURN[0]) * ease(ramp(t, HIT[0] + 0.05, HIT[1] - FLY[1] - 0.2)) + (TURN[2] - TURN[1]) * ease(ramp(t, HIT[1] + 0.05, HIT[2] - FLY[2] - 0.2));
        const arms = [throwArm(t, HIT[0] - FLY[0]), throwArm(t, HIT[1] - FLY[1]), throwArm(t, HIT[2] - FLY[2])];
        // Right stick for the first and the third, left for the baker.
        const right = t < HIT[0] + 0.3 ? arms[0] : arms[2];
        const hop = Math.max(0, Math.sin(ramp(t, HIT[0], HIT[0] + 0.5) * Math.PI)) * 0.8;
        return (
          <>
            <SnowGolem position={P} rotationY={rot} armR={right} armL={arms[1]}>
              {right.holding ? <Snowball position={[0, 0.08, 0]} /> : null}
            </SnowGolem>
            {[0, 1, 2].map((i) => {
              const from = stickTip(P, TURN[i], { raise: 0.2, swing: 1.4 }, i === 1 ? -1 : 1);
              const k = ramp(t, HIT[i] - FLY[i], HIT[i]);
              return (
                <group key={i}>
                  {k > 0 && k < 1 ? <Snowball position={arc(from, AIM[i], k, 0.25)} spin={t * 9} /> : null}
                  <Splat position={AIM[i]} t={t - HIT[i]} size={i === 0 ? 0.8 : 1.1} seed={i + 2} />
                </group>
              );
            })}
            <Chicken position={[BIRD[0] - hop * 0.5, hop, BIRD[2] - hop * 0.3]} rotationY={0.6 + hop * 3} phase={1} />
            <Bits position={[BIRD[0], 0.4, BIRD[2]]} t={t - HIT[0]} color="#ffffff" count={8} seed={4} power={0.8} />
            <Villager position={BAKER} robe={ROBE.white} carry={<Loaf />} lean={-jolt(t, HIT[1], 0.5) - 0.12 * ramp(t, HIT[1], HIT[1] + 0.1)} nod={-0.25 * ramp(t, HIT[1], HIT[1] + 0.1)} lookAt={t < HIT[1] ? [P[0], 1.5, P[2]] : undefined} />
            <Hero
              position={[ME[0] + 0.18 * ramp(t, HIT[2], HIT[2] + 0.12), 0, ME[2] - 0.1 * ramp(t, HIT[2], HIT[2] + 0.12)]}
              rotationY={toward(ME, P)}
              animation="idle"
              blendTo="scared"
              blend={1 - ramp(t, HIT[2], HIT[2] + 0.08)}
              face={t < HIT[1] ? "uneasy" : t < HIT[2] ? "fear" : "ouch"}
              headPitch={-0.4 * ramp(t, HIT[2], HIT[2] + 0.08)}
              gaze={0}
            />
          </>
        );
      },
    },
    {
      cue: "3.trail",
      ...cam.push({ on: room(-0.05, 0.55, 0.1), dist: 4.9, to: 4.3, yaw: 7, pitch: 17, fov: 40 }),
      zone: "room",
      look: "warm-room",
      note: "'He left snow in the kitchen': low over the floor of the house. A white track runs away from us across the boards, and at the end of it he slides on, and looks back over his shoulder. His dad looks at the floor.",
      stage: (t, { p }) => {
        const from = room(0.25, 0, 2.9);
        const to = room(-0.35, 0, -1.4);
        const k = 0.42 + 0.5 * p;
        const at: Vec3 = [from[0] + (to[0] - from[0]) * k, 0, from[2] + (to[2] - from[2]) * k];
        return (
          <>
            <SnowTrail from={from} to={at} count={Math.max(2, Math.round(k * 12))} width={0.6} />
            <SnowGolem position={at} rotationY={toward(from, to)} headYaw={2.5 * ease(ramp(t, 0.5, 0.85))} headRoll={0.1 * Math.sin(t * 6)} armR={{ raise: 0.5, swing: 0.2 }} armL={{ raise: 0.35, swing: 0.2 }} />
            <Dad position={room(0.62, 0, -1.7)} rotationY={-0.2} animation="shrug" blendTo="idle" blend={0.5} headPitch={0.55} headYaw={0.2} />
          </>
        );
      },
    },
    {
      cue: "3.noon",
      ...cam.push({ on: [1.35, 0.95, 2.2], dist: 4.3, to: 3.5, yaw: -10, pitch: 7, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'Every day at noon, he melted': the teller squints up at the sun. Beside him Puddle sags, spreads, drips and stands in a pool that gets wider while we watch.",
      stage: (t) => {
        const drip = ease(ramp(t, NOON - 0.2, NOON + 1.1));
        return (
          <>
            <SnowGolem position={[1.75, 0, 2.2]} drip={drip} headRoll={0.1 * drip} armR={{ raise: 0.3, swing: 0.2 }} armL={{ raise: 0.3, swing: 1.15 }} />
            <Hero position={[0.8, 0, 2.0]} rotationY={0.25} animation="idle" face={t < NOON + 0.5 ? "uneasy" : "wow"} headPitch={-0.55 * (1 - ramp(t, NOON + 0.4, NOON + 0.65))} headYaw={0.7 * ramp(t, NOON + 0.4, NOON + 0.65)} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "3.umbrella",
      ...cam.truck({ on: [-2.3, 1.45, 2.2], dist: 6.4, yaw: 5, pitch: 2, by: [2.3, 0, 0], fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "'I walked behind him with an umbrella. All summer': along the road beside them. He slides in front, and the teller walks behind him holding a blue umbrella over him with both arms. Two kids and an iron golem watch them go by.",
      stage: (t) => {
        const d = 1.06 * t;
        const me: Vec3 = [-3.0 + d, 0, 2.2];
        return (
          <>
            <SnowGolem position={[me[0] + 1.0, 0, 2.2]} rotationY={EAST} drip={0.22} armR={{ raise: 0.35, swing: 0.2 }} armL={{ raise: 0.35 + 0.2 * Math.sin(t * 6), swing: 0.2 }} />
            <Hero position={me} rotationY={EAST} animation="walk" animDistance={d} arms="lift" face="frown" gaze={0} />
            <Umbrella position={handUp(me, EAST)} rotation={[0, 0, -0.42]} />
            <Kid n={1} position={[0.9, 0, -0.9]} rotationY={0.1} animation="laugh" face="laugh" />
            <Kid n={5} position={[-1.9, 0, -0.5]} rotationY={0.3} animation="laugh" face="laugh" />
            <IronGolem position={[-0.6, 0, -1.6]} headYaw={-0.5 + 0.35 * t} headPitch={0.2} />
          </>
        );
      },
    },
    {
      cue: "3.name",
      ...cam.pan({ from: [2.7, 1.25, 7.9], on: snowFace([2.0, 0, 2.2], 0.82), onTo: [2.0, 0.1, 2.7], fov: 36 }),
      zone: "village",
      look: "overworld-day",
      note: "'I called him Puddle. You can guess why': his pumpkin, in the shade of the umbrella, turning to us at his name. Then down the length of him to what he is standing in.",
      stage: (t) => {
        const me: Vec3 = [2.55, 0, 1.45];
        return (
          <>
            <SnowGolem position={[2.0, 0, 2.2]} drip={0.5} wet={0.95} headYaw={-0.6 * (1 - ease(ramp(t, PUDDLE - 0.1, PUDDLE + 0.25)))} headRoll={0.16 * ease(ramp(t, PUDDLE, PUDDLE + 0.3))} armR={{ raise: 0.3 + 0.5 * ramp(t, PUDDLE, PUDDLE + 0.2), swing: 0.4 }} armL={{ raise: 0.3, swing: 0.2 }} />
            <Hero position={me} rotationY={-0.3} animation="idle" arms="lift" face="frown" gaze={0} />
            <Umbrella position={handUp(me, -0.3)} rotation={[0.5, 0, 0.3]} />
          </>
        );
      },
    },
  ],
});
