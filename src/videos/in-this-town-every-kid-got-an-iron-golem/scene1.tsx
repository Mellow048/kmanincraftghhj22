import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, IronGolem, Kid, SnowGolem, timing } from "./kit";

/** Everybody walks south across the square, at the lens. */
const SPEED = 1.15;
const go = (p: Vec3, d: number): Vec3 => [p[0], p[1], p[2] + d];
const ME: Vec3 = [-0.38, 0, 2.6];
const HIM: Vec3 = [0.62, 0, 2.25];
/** Three kids, and behind each of them what a kid of this town gets. */
const PAIRS: Array<{ kid: Vec3; golem: Vec3; n: number }> = [
  { kid: [-1.1, 0, 1.2], golem: [-1.3, 0, 0.0], n: 0 },
  { kid: [1.45, 0, 0.9], golem: [1.6, 0, -0.5], n: 1 },
  { kid: [0.1, 0, -0.5], golem: [0.2, 0, -1.9], n: 2 },
];
const END = SPEED * 2.27;

/**
 * HOOK. The rule of the town and the one it went wrong for, in one picture: three kids with three iron golems
 * towering behind them, and in front of them all the teller, with a thing made of snow.
 */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Hook",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: [0, 1.5, 2.3], onTo: [0, 1.5, 2.3 + END - 0.2], dist: 5.7, to: 5.2, yaw: 0, pitch: 3, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "'Every kid got an iron golem at ten': three kids walk at us, each with an iron golem twice his size behind him. In front of them walks the teller, in red, and beside him slides a snowman with a pumpkin for a head.",
      stage: (t) => {
        const d = t * SPEED;
        return (
          <>
            <Hero position={go(ME, d)} animation="walk" animDistance={d} face="uneasy" headYaw={0.25} gaze={0} />
            <SnowGolem position={go(HIM, d)} armR={{ raise: 0.75 + 0.35 * Math.sin(t * 9), swing: 0.5 }} armL={{ raise: 0.2 + 0.1 * Math.sin(t * 5), swing: 0.2 }} headRoll={Math.sin(t * 5) * 0.08} />
            {PAIRS.map(({ kid, golem, n }) => (
              <group key={n}>
                <Kid n={n} position={go(kid, d)} animation="walk" animDistance={d + n * 0.4} face="grin" />
                <IronGolem position={go(golem, d)} walk={d + n} />
              </group>
            ))}
          </>
        );
      },
    },
    {
      cue: "1.me",
      ...cam.push({ on: [0.26, 1.28, 2.4 + END], dist: 4.3, to: 3.8, yaw: -6, pitch: 2, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "'Mine was made of snow': the two of them, close. He looks sideways at it. It looks back at him and waves a stick.",
      stage: (t) => (
        <>
          <Hero position={go(ME, END)} animation="idle" face="frown" headYaw={0.55} gaze={0} />
          <SnowGolem position={go([0.56, 0, 2.25], END)} headYaw={-0.5} headRoll={0.12} armR={{ raise: 0.9 + 0.3 * Math.sin(t * 12), swing: 0.9 }} armL={{ raise: 0.25, swing: 0.2 }} />
          <IronGolem position={go([-1.3, 0, 0.0], END)} headPitch={0.25} />
          <IronGolem position={go([1.6, 0, -0.5], END)} headPitch={0.25} />
        </>
      ),
    },
  ],
});
