import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import {
  FaceLight, EAST, Fire, FireLight, FireMob, Folk, Hero, IronGolem, Kid, ROBE, SatGolem, Slumped, Villager, WEST, ease, faceOf, onRoad, ramp, roadY, timing, wordAt,
} from "./kit";

/** The fliers over the hill: where each hangs. */
const SKY: Vec3[] = [
  [36.5, 11.2, 0.2], [38.4, 12.6, 3.6], [34.6, 10.2, 4.4], [40.2, 11.6, -1.4], [33.2, 11.8, 1.2], [37.2, 13.6, 6.2], [35.6, 12.8, -2.6], [39.4, 10.4, 6.8],
];
const Sky: React.FC<{ n?: number; lit?: number }> = ({ n = SKY.length, lit = 1 }) => (
  <>
    {SKY.slice(0, n).map((p, i) => (
      <FireMob key={i} position={p} rotationY={WEST + (i % 3) * 0.3} angry={1} seed={i + 1} light={i < lit ? 22 : 0} />
    ))}
  </>
);

// ---- 9.count: the same twenty, on the steps. The order they stop in.
const STEPS = [32.25, 33.75, 35.25, 36.75, 38.25];
const ORDER = [7, 15, 2, 11, 18, 5, 9, 0, 13, 4, 19, 8, 16, 1, 10, 6, 17, 12, 3, 14];
const TWELVE = wordAt("9.count", "twelve");
const FIVE = wordAt("9.count", "five");
/** When golem `i` of the twenty stops. The last five never do, in this shot. */
const stopsAt = (i: number) => {
  const turn = ORDER.indexOf(i);
  return turn < 8 ? TWELVE - 0.12 + turn * 0.035 : turn < 15 ? FIVE - 0.12 + (turn - 8) * 0.035 : 99;
};

const SAT = wordAt("9.sat", "sat");
const ROOFS = wordAt("9.roofs", "roofs");
const ME: Vec3 = [-3.4, 0, 2.6];

/** THE GUARD FAILS. What the golems were for, and why it was never going to work. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "Twenty, twelve, five",
  shots: [
    {
      cue: "9.reach",
      ...cam.pan({ from: [35.2, 6.4, 6.6], on: [38.25, 8.2, 2.2], onTo: [38.3, 11.5, 2.2], fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "'Iron golems could not fly. These things could': a golem on the top step, both arms as high as they go, swinging at nothing. Tilt up the length of its arms and on, to the burning thing that hangs a block out of reach and looks down at it.",
      stage: (t) => (
        <>
          <IronGolem position={[38.25, 6, 2.2]} rotationY={-0.75} armR={-2.75 - 0.3 * Math.sin(t * 9)} armL={-2.75 + 0.3 * Math.sin(t * 9)} headPitch={-0.5} />
          <IronGolem position={[40.4, 6, -0.2]} rotationY={-0.4} armR={-2.6 + 0.3 * Math.sin(t * 8 + 1)} armL={-2.9} headPitch={-0.5} />
          <FireMob position={[38.0, 11.4 + 0.5 * ease(ramp(t, 1.4, 2.2)), 2.5]} rotationY={-0.75} angry={1} light={30} seed={3} />
          <FireMob position={[40.6, 12.6, -1.6]} rotationY={-0.6} angry={1} seed={5} />
          <FireMob position={[36.4, 13.4, 4.6]} rotationY={-0.9} angry={1} seed={7} />
        </>
      ),
    },
    {
      cue: "9.red",
      ...cam.push({ on: [36.75, 7.0, 2.4], dist: 6.6, to: 5.4, yaw: -52, pitch: -5, fov: 42 }),
      zone: "village",
      look: "overworld-night",
      note: "'The fire came down on them. The iron went red': fire pours onto one golem from two of them at once. It keeps its arms up. Then it starts to glow, and the arms come down.",
      stage: (t) => {
        const g: Vec3 = [36.75, 5, 2.4];
        const red = wordAt("9.red", "red");
        const hot = ease(ramp(t, red - 0.45, red + 0.1));
        const fire = ramp(t, 0.12, 0.5);
        const give = ease(ramp(t, red, red + 0.5));
        return (
          <>
            <Slumped position={g} rotationY={-0.6} slump={0.5 * give} hot={hot} lamp armR={-2.5 * (1 - give)} armL={-2.3 * (1 - give)} headPitch={-0.4} />
            <FireMob position={[35.6, 10.6, 3.6]} rotationY={-0.8} angry={1} seed={2} light={18} />
            <FireMob position={[38.3, 11.2, 1.0]} rotationY={-0.6} angry={1} seed={4} />
            <Fire from={[35.6, 10.2, 3.6]} to={[g[0], 7.1, g[2]]} power={fire} width={0.34} count={26} seed={2} />
            <Fire from={[38.3, 10.8, 1.0]} to={[g[0], 7.2, g[2]]} power={fire} width={0.34} count={26} seed={5} />
            <Slumped position={[38.25, 6, 0.2]} rotationY={-0.5} slump={0.9 * ease(ramp(t, 0.6, 1.2))} hot={0.7} armR={-2.0} armL={-2.2} />
          </>
        );
      },
    },
    {
      cue: "9.count",
      ...cam.push({ on: [35.4, 4.6, 2], dist: 18, to: 16.2, yaw: -90, pitch: 13, fov: 46 }),
      zone: "village",
      look: "overworld-night",
      note: "'Twenty golems. Then twelve. Then five': the whole slope, from the road. Twenty iron backs on the steps under the fire. On 'twelve' eight of them fold at the waist and stop, red. On 'five', seven more.",
      stage: (t) => (
        <>
          <Sky lit={1} />
          {Array.from({ length: 20 }, (_, i) => {
            const row = Math.floor(i / 4);
            const at = stopsAt(i);
            const p: Vec3 = [STEPS[row], roadY(STEPS[row]), 2 + (i % 4 - 1.5) * 1.75 + (row % 2) * 0.4];
            const swing = Math.sin(t * 8 + i);
            return <Slumped key={i} position={p} rotationY={EAST} slump={ramp(t, at, at + 0.3)} hot={0.25 + 0.75 * ramp(t, at - 0.5, at)} armR={-2.6 + 0.35 * swing} armL={-2.6 - 0.35 * swing} headPitch={-0.4} />;
          })}
          <Fire from={[SKY[0][0], SKY[0][1] - 0.5, SKY[0][2]]} to={[35.25, 6, 1.5]} power={1} width={0.4} count={24} seed={1} />
          <Fire from={[SKY[2][0], SKY[2][1] - 0.5, SKY[2][2]]} to={[33.75, 4.5, 4.2]} power={ramp(t, 0.5, 0.9)} width={0.4} count={24} seed={3} />
          <Fire from={[SKY[3][0], SKY[3][1] - 0.5, SKY[3][2]]} to={[38.25, 7.5, -0.4]} power={ramp(t, 1.2, 1.6)} width={0.4} count={24} seed={4} />
        </>
      ),
    },
    {
      cue: "9.sat",
      ...cam.push({ on: [26.2, 1.25, 2.2], dist: 6.6, to: 5.6, yaw: -76, pitch: 3, fov: 40 }),
      zone: "village",
      look: "overworld-night",
      note: "'The last one sat down in the road': at the foot of the hill, the one that is left stops walking, sits down where it is with its legs out in front of it, and lets its head go. Behind it, the ones that are not left.",
      stage: (t) => {
        const sit = ease(ramp(t, SAT - 0.1, SAT + 0.4));
        const x = 26.9 - 0.7 * ease(ramp(t, 0, SAT - 0.1));
        return (
          <>
            <SatGolem position={[x, 0, 2.2]} rotationY={WEST} sit={sit} droop={ease(ramp(t, SAT + 0.35, SAT + 0.8))} />
            {[[32.25, 0.4], [33.75, 3.9], [35.25, 1.3], [36.75, 4.4], [32.3, 5.6], [35.3, -1.6]].map(([gx, z], i) => (
              <Slumped key={i} position={[gx, roadY(gx), z]} rotationY={EAST} slump={1} hot={0.5} />
            ))}
            <FireMob position={[34 - 3.5 * t, 9.5, 0.4]} rotationY={WEST} angry={1} seed={2} light={16} />
            <FireMob position={[37 - 3.5 * t, 11, 4.2]} rotationY={WEST} angry={1} seed={5} />
            <FireMob position={[31 - 3.5 * t, 8.4, 4.8]} rotationY={WEST} angry={1} seed={8} />
          </>
        );
      },
    },
    {
      cue: "9.roofs",
      ...cam.push({ on: [20, 4.9, -7.2], dist: 13.5, to: 12, yaw: 16, pitch: -7, fov: 44 }),
      zone: "village",
      look: "overworld-night",
      note: "'Then the roofs caught fire': two of them come in low over a house, breathing fire down on it as they pass, and on 'roofs' the roof goes up.",
      stage: (t) => {
        const a: Vec3 = [25.5 - 6.5 * t, 8.6, -6.6];
        const b: Vec3 = [28 - 6.5 * t, 9.8, -9];
        return (
          <>
            <FireMob position={a} rotationY={WEST} angry={1} seed={2} light={20} />
            <FireMob position={b} rotationY={WEST} angry={1} seed={6} />
            <Fire from={[a[0], a[1] - 0.4, a[2]]} to={[a[0] - 1.6, 5.2, -7.6]} power={ramp(t, ROOFS - 0.2, ROOFS + 0.1)} width={0.4} count={24} seed={2} />
            <Fire from={[b[0], b[1] - 0.4, b[2]]} to={[b[0] - 1.6, 5.4, -8.6]} power={ramp(t, ROOFS, ROOFS + 0.3)} width={0.4} count={24} seed={7} />
            <Villager position={[21.6 + 1.6 * t, 0, -2.6]} rotationY={EAST} walk={2.4 * t} robe={ROBE.blue} lean={0.2} />
          </>
        );
      },
    },
    {
      cue: "9.end",
      ...cam.push({ on: faceOf(ME), dist: 2.2, to: 1.7, yaw: 38, pitch: -2, fov: 36 }),
      zone: "village",
      look: "overworld-night",
      note: "'I thought our town was finished': his face, lit orange from one side. Behind him a house is burning and people are running past it.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={0.66} animation="idle" face="fear" headYaw={0.25 * Math.sin(t * 2.2)} />
          <FireLight position={[-2.3, 1.7, 3.6]} power={9} reach={5} seed={2} />
          <Folk spots={[[-9.5 + 2.6 * t, -0.6, EAST, ROBE.brown], [-6 + 2.6 * t, 0.8, EAST, ROBE.white], [-8.2 + 2.2 * t, 0.2, EAST, ROBE.friend, true]]} walk={2.6 * t} lean={0.2} />
        </>
      ),
    },
  ],
});
