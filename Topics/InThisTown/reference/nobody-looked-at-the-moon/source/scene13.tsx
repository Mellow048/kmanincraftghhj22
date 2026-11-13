import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { CHILD, Folk, HAT_BACK, Hero, IronGolem, KID, LOOSE_HAT, PLACE, ROBE, Ringer, Scarecrow, StrawHat, WALK_BLINKS, blinkAt, ease, ramp, timing, wordAt } from "./kit";

const ME = PLACE.atWell;
const PULLED = wordAt("13.hat", "pulled");
const FACE = wordAt("13.hat", "face");
const CLOSER = wordAt("13.closer", "closer");

/** The ones that walk out of the trees in 13.blink: where each one is when the shot begins. They walk south. */
const OUT_OF_TREES: Array<[number, number, string, number]> = [
  [-2.6, -45.2, "#5c3f3a", 0.14],
  [1.6, -44.0, "#4a4f5c", -0.1],
  [-0.7, -42.6, "#5b4a3c", 0.08],
  [3.1, -46.0, "#4c5540", -0.16],
  [0.4, -47.2, "#57493f", 0.1],
  [-3.4, -47.6, "#4a4f5c", -0.06],
  [2.3, -41.6, "#5b4a3c", 0.12],
];
/** The ones the moon is holding in 13.held, seen from behind: [x, z, shirt, scale]. They face the town. */
const HELD: Array<[number, number, string, number]> = [
  [-0.9, -25.6, "#5c3f3a", 1],
  [1.25, -23.6, "#4a4f5c", 0.96],
  [-1.6, -20.6, "#5b4a3c", 1.02],
  [0.5, -18.6, "#4c5540", 0.94],
  [2.5, -16.9, "#57493f", 0.98],
  [-2.8, -15.9, "#4a4f5c", 0.95],
];

/** Him under his hat, as small as he can make himself. */
const Hiding = ({ peek = 0 }: { peek?: number }) => (
  <Hero position={ME} animation="cower" blendTo="peek" blend={1 - peek} face={peek > 0.3 ? "fear" : "uneasy"} gaze={0} hatTilt={0.85 - 0.75 * peek} />
);

/** THE REVEAL. Nobody put the scarecrows there. The moon was the only thing holding them still, and he made it look away. */
export const scene13 = storyScene(timing, {
  id: "scene13",
  title: "The reveal",
  shots: [
    {
      cue: "13.never",
      ...cam.push({ on: [1.0, 1.9, -47], dist: 6.2, to: 5.2, yaw: -5, pitch: -7, fov: 44 }),
      zone: "fields",
      note: "'Nobody had put them there': the edge of the forest, some night long ago. Out of the black between two trunks, on its own two legs, one of them steps into the moonlight.",
      stage: (t) => (
        <>
          <Scarecrow position={[1.0, 0, -48.4 + t * 1.9]} walk={t * 1.9} lean={0.1} headTilt={0.14} shirt="#5c3f3a" eyes={0.7 * (1 - ramp(t, 0.3, 0.8))} />
          <Scarecrow position={[-3.3, 0, -48.9 + t * 0.9]} walk={t * 0.9} lean={0.08} headTilt={-0.1} shirt="#4a4f5c" scale={0.96} eyes={0.8} />
          <Scarecrow position={[4.6, 0, -49.6 + t * 0.7]} walk={t * 0.7} lean={0.08} headTilt={0.1} shirt="#5b4a3c" scale={0.95} eyes={0.8} />
        </>
      ),
    },
    {
      cue: "13.blink",
      ...cam.push({ on: [0, 2.0, -41], dist: 12.5, to: 11.5, yaw: 0, pitch: -3, fov: 48 }),
      zone: "fields",
      note: "'One blink at a time': the wheat under the stare, and seven of them standing in it. The light goes out, for as long as a blink. When it comes back every one of them is a step nearer. Three times.",
      stage: (t) => {
        // The step is taken in the dark: it starts as the lids meet and is over before they part.
        const steps = WALK_BLINKS.reduce((n, b) => n + ease(ramp(t, b + 0.06, b + 0.2)), 0);
        const dark = Math.max(...WALK_BLINKS.map((b) => blinkAt(t, b, 0.12, 0.07)));
        return (
          <>
            {OUT_OF_TREES.map(([x, z, shirt, tilt], i) => (
              <Scarecrow key={i} position={[x, 0, z + steps * 1.5]} walk={steps * 1.5} lean={0.05} headTilt={tilt} shirt={shirt} scale={0.94 + (i % 3) * 0.04} eyes={dark} />
            ))}
          </>
        );
      },
    },
    {
      cue: "13.held",
      ...cam.push({ on: [0, 2.9, -17], dist: 12.6, to: 11.6, yaw: 180, pitch: -6, fov: 56 }),
      zone: "village",
      note: "'Holding them still, just by staring': from out in the wheat, behind them. Their backs, arms out, facing the town. The lanterns of the town beyond. And over all of it the eye, wide open, not blinking, on them.",
      stage: () => (
        <>
          {HELD.map(([x, z, shirt, scale], i) => (
            // Seen from behind, the light is on the far side of them: a little cold of their own, or they are holes in the picture.
            <Scarecrow key={i} position={[x, 0, z]} rotationY={-x * 0.05} shirt={shirt} scale={scale} headTilt={(i % 2 ? 1 : -1) * 0.1} eyes={0.5} />
          ))}
        </>
      ),
    },
    {
      cue: "13.awake",
      ...cam.push({ on: [0, 1.7, -15.5], dist: 9, to: 8, yaw: 0, pitch: -2, fov: 46 }),
      zone: "village",
      note: "'We stayed awake in case it ever looked away': the end of the lane. The golem, the bell ringer, a farmer, a child, all at the fence, all night, every night: a watch that does not know what it is watching for.",
      stage: () => (
        <>
          <IronGolem position={[0.85, 0, -12.4]} rotationY={Math.PI} headPitch={0.25} hat />
          <Ringer position={[-0.8, 0, -12.1]} rotationY={Math.PI} />
          <Folk position={[-0.05, 0, -11.1]} rotationY={Math.PI + 0.1} robe={ROBE.red} scale={CHILD} kid phase={2.9} />
          <Folk position={[-1.6, 0, -10.9]} rotationY={Math.PI - 0.15} robe={ROBE.farmer} phase={2.7} />
          <Scarecrow position={[0.1, 0, -17.4]} shirt="#4a4f5c" headTilt={-0.12} scale={0.98} />
        </>
      ),
    },
    {
      cue: "13.hat",
      ...cam.push({ on: [0, 1.1, ME[2]], dist: 2.9, to: 2.5, yaw: 6, pitch: 8, fov: 42 }),
      zone: "village",
      note: "'I pulled my hat over my face': back at the well. He has the hat in both hands, and on 'pulled' it comes down, right down, over his eyes. Behind him, in the mouth of the lane, they are coming.",
      stage: (t) => {
        const on = ease(ramp(t, PULLED, PULLED + 0.3));
        const down = ease(ramp(t, PULLED + 0.3, FACE + 0.1));
        const worn = on >= 1;
        const held: Vec3 = [ME[0], 1.8 * KID + 0.3 * (1 - on), ME[2] + 0.06];
        return (
          <>
            <Hero
              position={ME}
              animation="lift"
              blendTo="cower"
              blend={1 - down}
              face={down > 0.5 ? "uneasy" : "fear"}
              gaze={0}
              hat={worn ? "on" : "off"}
              hatTilt={HAT_BACK + (0.85 - HAT_BACK) * down}
            />
            {worn ? null : <StrawHat position={held} rotation={[HAT_BACK, 0, 0]} width={LOOSE_HAT} crown={0.4} />}
          </>
        );
      },
    },
    {
      cue: "13.bored",
      ...cam.push({ on: [-0.45, 5.0, 4.1], dist: 12.0, to: 11.6, yaw: 174.7, pitch: -20, fov: 56 }),
      zone: "village",
      note: "'Waited for the moon to get bored': from up the lane, behind the nearest of them, as it walks at him. Under its arm, by the well, a hat with two feet under it. And over the roof the eye, on him: until its lid starts to sink, and it looks away.",
      stage: () => <Hiding />,
    },
    {
      cue: "13.back",
      ...cam.push({ on: [0, 0, -9], dist: 27.5, to: 30, yaw: 0, pitch: 35, fov: 50 }),
      zone: "village",
      note: "'When the light went back to the wheat, they stopped': from the sky again. The white goes back up the lane the way it came, the wheat lights, and on 'stopped' every one of them is a scarecrow again, wherever it happens to be.",
      stage: () => <Hiding />,
    },
    {
      cue: "13.closer",
      ...cam.push({ on: [0.25, 1.35, 0.0], dist: 3.3, to: 2.9, yaw: 10, pitch: 5, fov: 42 }),
      zone: "village",
      note: "'They were just a lot closer': lantern light again. He lifts the brim to see. The nearest one is standing right behind him, one arm's length away, with its head on one side.",
      stage: (t) => <Hiding peek={ease(ramp(t, 0.15, CLOSER))} />,
    },
  ],
});
