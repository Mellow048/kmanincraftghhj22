import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  Boulder, Bunting, Chicken, EAST, Folk, Hero, IronGolem, Kid, NORTH, PLACE, Puffs, ROBE, RankSign, SOUTH, SnowGolem, Stick, WEST,
  beside, ease, golemHand, jolt, lerp, ramp, snowFace, timing, wordAt,
} from "./kit";

const R = PLACE.rock;
/** The iron golems wait in a row on the north side of the road, a kid in front of each. */
const ROW = [-5.6, -3.4, 1.0, 3.2];
/** The town stands on the south side and watches. */
const TOWN: Array<[number, number, number, string, boolean?]> = [
  [-5.2, 5.9, NORTH, ROBE.brown], [-3.7, 6.3, NORTH, ROBE.white], [-2.2, 5.8, NORTH, ROBE.farmer], [-0.5, 6.4, NORTH, ROBE.elder],
  [1.1, 5.9, NORTH, ROBE.blue], [2.7, 6.3, NORTH, ROBE.red], [4.3, 5.8, NORTH, ROBE.smith], [0.3, 5.5, NORTH, ROBE.friend, true],
];
const Flags = () => (
  <>
    {[-6.5, -2.5, 1.5, 5.5].map((x) => (
      <Bunting key={x} from={[x, 4.6, -1.6]} to={[x, 4.6, 7.2]} count={11} sag={0.5} />
    ))}
  </>
);

// ---- 5.rock
const A: Vec3 = [R[0], 0, R[2] - 0.98];
const B: Vec3 = [R[0], 0, R[2] - 2.15];
const L1 = wordAt("5.rock", "lifted");
const L2 = wordAt("5.rock", "lifted", 1);

// ---- 5.arm, 5.other: he stands east of the rock and faces it.
const HIM: Vec3 = [R[0] + 1.14, 0, R[2]];
const OFF1 = wordAt("5.arm", "came");
const OFF2 = wordAt("5.other", "came");
/** A stick that has come off: it hangs on the rock for a moment, then drops. `side` 1 is the south one. */
const loose = (t: number, off: number, side: number): { position: Vec3; rotation: Vec3 } => {
  const k = ease(ramp(t, off + 0.1, off + 0.4));
  return {
    position: [R[0] + 0.72 - 0.1 * k, lerp(0.82, 0.05, k * k), R[2] + side * (0.3 + 0.35 * k)],
    rotation: [0, side * 0.5 * k, lerp(-0.25, 0, k)],
  };
};
const CHICKEN = wordAt("5.last", "chicken");

/** THE CONTEST. The one day a year everybody looks at the golems, and so at his. */
export const scene5 = storyScene(timing, {
  id: "scene5",
  title: "The strength contest",
  shots: [
    {
      cue: "5.day",
      ...cam.push({ on: [-0.6, 1.9, 2.5], dist: 17.5, to: 15.2, yaw: 82, pitch: 13, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'Once a year, the golems had a strength contest': down the street under lines of flags. The town on one side, a row of iron golems flexing on the other, the boulder between them, and at the near end of the row, small and white, his.",
      stage: (t) => (
        <>
          <Flags />
          <Boulder position={R} />
          {ROW.map((x, i) => (
            <group key={x}>
              <IronGolem position={[x, 0, 0.1]} armR={-1.6 - 1.1 * Math.max(0, Math.sin(t * 5 + i))} armL={-1.6 - 1.1 * Math.max(0, Math.sin(t * 5 + i + 2))} headYaw={0.3 * Math.sin(t * 2 + i)} />
              <Kid n={i} position={[x + 0.2, 0, 1.2]} animation="cheer" animSpeed={0.8} phase={i} />
            </group>
          ))}
          <SnowGolem position={[4.6, 0, 2.5]} rotationY={0.3} armR={{ raise: 0.9 + 0.3 * Math.sin(t * 7), swing: 0.2 }} armL={{ raise: 0.9 + 0.3 * Math.sin(t * 7 + 2), swing: 0.2 }} />
          <Hero position={[5.2, 0, 3.5]} rotationY={0.9} animation="idle" face="uneasy" gaze={0} />
          <Folk spots={TOWN} at={[R[0], 1.5, R[2]]} />
        </>
      ),
    },
    {
      cue: "5.rock",
      ...cam.push({ on: [R[0], 2.0, R[2] - 0.9], onTo: [R[0], 3.5, R[2] - 0.9], dist: 9.5, to: 11.5, yaw: 24, pitch: -7, fov: 46 }),
      zone: "village",
      look: "overworld-day",
      note: "'The first golem lifted a boulder. The second lifted the first golem': one puts the rock over its head. The one behind it takes it under the arms and puts golem and rock over its own. The lens goes up with them.",
      stage: (t) => {
        const up = ease(ramp(t, L1 - 0.1, L1 + 0.4));
        const a = lerp(-0.55, -2.95, up);
        const second = ease(ramp(t, L2 - 0.05, L2 + 0.42));
        const b = lerp(lerp(0, -1.15, ease(ramp(t, L2 - 0.55, L2 - 0.05))), -2.3, second);
        const feet: Vec3 = [A[0], 2.0 * second, A[2]];
        const hand = golemHand(feet, SOUTH, a, 1, 0);
        return (
          <>
            <Flags />
            <IronGolem position={feet} armR={a} armL={a} headPitch={-0.2 * up} />
            <Boulder position={[hand[0], Math.max(0, hand[1] - 0.5 * (1 - up) - 0.04), hand[2]]} />
            <IronGolem position={B} armR={b} armL={b} headPitch={-0.35 * second} />
            <Kid n={0} position={[R[0] - 1.5, 0, R[2] + 0.9]} rotationY={NORTH - 0.6} animation="cheer" face="laugh" />
            <Kid n={1} position={[R[0] + 1.7, 0, R[2] + 0.4]} rotationY={NORTH + 0.5} animation="cheer" face="wow" phase={1.2} />
            <IronGolem position={[-3.4, 0, 0.1]} headYaw={0.7} />
            <IronGolem position={[3.2, 0, 0.1]} headYaw={-0.9} />
          </>
        );
      },
    },
    {
      cue: "5.turn",
      ...cam.push({ on: snowFace(HIM), dist: 3.9, to: 3.3, yaw: -62, pitch: 3, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Then it was Puddle's turn': past the corner of the boulder, he slides up to it and looks it over. Behind him the teller holds his breath, and behind the teller stand the ones that did it before.",
      stage: (t) => {
        const k = ease(ramp(t, 0, 0.75));
        return (
          <>
            <Flags />
            <Boulder position={R} />
            <SnowGolem position={[HIM[0] + 0.8 * (1 - k), 0, HIM[2]]} rotationY={WEST} headPitch={0.25 * ramp(t, 0.5, 0.9)} armR={{ raise: 0.5, swing: 0.3 }} armL={{ raise: 0.5, swing: 0.3 }} />
            <Hero position={[HIM[0] + 1.75, 0, HIM[2] - 0.7]} rotationY={WEST} animation="hug" face="uneasy" gaze={0} />
            <IronGolem position={[HIM[0] + 3.4, 0, HIM[2] - 1.6]} rotationY={WEST} headPitch={0.2} />
            <IronGolem position={[HIM[0] + 4.3, 0, HIM[2] + 0.6]} rotationY={WEST} headPitch={0.2} />
          </>
        );
      },
    },
    {
      cue: "5.arm",
      ...cam.push({ on: [R[0] + 0.75, 0.9, R[2]], dist: 5.6, to: 4.9, yaw: -46, pitch: 6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "'He picked up the rock. His arm came off': past the rock, with him facing us. One stick against the boulder, he leans back and heaves, and he goes backwards without it. The stick stays where it was, and then drops.",
      stage: (t) => {
        const heave = ramp(t, 0.16, 0.5) * (1 - ramp(t, OFF1, OFF1 + 0.05));
        const gone = t > OFF1;
        const back = ease(ramp(t, OFF1, OFF1 + 0.25));
        const s = loose(t, OFF1, 1);
        return (
          <>
            <Flags />
            <Boulder position={R} />
            <SnowGolem
              position={[HIM[0] + 0.42 * back, 0, HIM[2]]}
              rotationY={WEST}
              lean={-0.16 * heave - 0.22 * back * (1 - ramp(t, OFF1 + 0.25, OFF1 + 0.5)) + jolt(t, OFF1, 0.2)}
              headPitch={0.2 + 0.25 * ramp(t, OFF1 + 0.3, OFF1 + 0.5)}
              armR={gone ? null : { raise: -0.3 + 0.05 * Math.sin(t * 38) * heave, swing: 1.57 }}
              armL={{ raise: 0.4, swing: 0.2 }}
            />
            {gone ? <Stick {...s} /> : null}
            <Folk spots={[[R[0] + 2.6, R[2] - 1.9, WEST, ROBE.elder], [R[0] + 3.3, R[2] - 0.4, WEST, ROBE.brown]]} at={[R[0] + 0.5, 0.8, R[2]]} />
            <Hero position={[R[0] + 2.5, 0, R[2] + 0.9]} rotationY={WEST} animation="hug" face={gone ? "ouch" : "uneasy"} gaze={0} />
          </>
        );
      },
    },
    {
      cue: "5.other",
      ...cam.push({ on: [R[0] + 1.05, 1.1, R[2]], dist: 4.0, to: 3.6, yaw: 171, pitch: 5, fov: 50 }),
      zone: "village",
      look: "overworld-day",
      note: "'With his other arm. That one came off too': from the other side, with the town behind him. He puts the stick he has left against the rock, leans back, and that is two. He stands there with no arms, and slowly turns his pumpkin to us.",
      stage: (t) => {
        const reach = ease(ramp(t, 0.1, 0.5));
        const heave = ramp(t, 0.5, 0.9) * (1 - ramp(t, OFF2, OFF2 + 0.05));
        const gone = t > OFF2;
        const back = ease(ramp(t, OFF2, OFF2 + 0.25));
        return (
          <>
            <Flags />
            <Boulder position={R} />
            <Stick {...loose(9, 0, 1)} />
            <SnowGolem
              position={[HIM[0] + 0.42 - 0.42 * reach + 0.42 * back, 0, HIM[2]]}
              rotationY={WEST}
              lean={-0.16 * heave + jolt(t, OFF2, 0.2)}
              headYaw={-1.25 * ease(ramp(t, OFF2 + 0.4, OFF2 + 0.75))}
              armR={null}
              armL={gone ? null : { raise: lerp(0.4, -0.3, reach) + 0.05 * Math.sin(t * 38) * heave, swing: lerp(0.2, 1.57, reach) }}
            />
            {gone ? <Stick {...loose(t, OFF2, -1)} /> : null}
            <Hero position={[HIM[0] + 0.75, 0, HIM[2] + 1.5]} rotationY={NORTH + 0.3} animation="idle" blendTo="ache" blend={1 - ramp(t, OFF2, OFF2 + 0.3)} face="ouch" />
            <Kid n={2} position={[R[0] - 0.35, 0, R[2] + 1.9]} rotationY={NORTH} animation="laugh" face="laugh" />
            <Kid n={3} position={[R[0] + 0.35, 0, R[2] + 2.4]} rotationY={NORTH} animation="laugh" face="laugh" phase={0.5} />
            <Folk spots={TOWN} at={[HIM[0], 1.2, HIM[2]]} />
          </>
        );
      },
    },
    {
      cue: "5.last",
      ...cam.pan({ from: [2.3, 1.4, 7.0], on: [3.45, 1.2, 1.5], onTo: [0.95, 1.5, 1.8], fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'We came last. A chicken beat us': the two of them under a sign that says LAST, the boy holding both of his golem's arms. Pan along to the place above them: a chicken, standing on the boulder.",
      stage: (t) => {
        const me: Vec3 = [3.0, 0, 1.7];
        return (
          <>
            <Flags />
            <Hero position={me} animation="hold" face="frown" headYaw={-0.5 * ramp(t, CHICKEN - 0.2, CHICKEN + 0.1)} gaze={0} />
            <Stick position={beside(me, 0, 0.02, 0.74, 0.34)} rotation={[0, 0.2, 0.1]} />
            <Stick position={beside(me, 0, -0.02, 0.8, 0.32)} rotation={[0, -0.3, -0.15]} />
            <SnowGolem position={[3.95, 0, 1.45]} armR={null} armL={null} headYaw={-0.6 * ramp(t, CHICKEN - 0.2, CHICKEN + 0.1)} headPitch={0.15} />
            <RankSign position={[3.5, 2.25, 0.9]} rank="LAST" scale={0.85} post />
            <Boulder position={[0.95, 0, 1.8]} />
            <Chicken position={[0.95, 1.07, 1.85]} rotationY={0.5} scale={1.5} />
            <RankSign position={[0.95, 2.75, 1.2]} rank="5" scale={0.85} gold post />
            <Puffs position={[0.95, 1.1, 1.8]} color="#ffe9a0" count={5} rise={1.6} spread={0.6} size={0.1} opacity={0.6} seed={2} />
          </>
        );
      },
    },
  ],
});
void EAST;
