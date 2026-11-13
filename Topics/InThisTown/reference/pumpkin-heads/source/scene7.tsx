import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { EAST, Hero, KNEEL, NORTH, PLACE, SOUTH, Townie, WATER, WEST, WaterPumpkin, ease, jolt, ramp, stride, timing, wordAt } from "./kit";

const W = PLACE.well;
const ME: Vec3 = [W[0], 0, W[2] + 3.0];
const LIFT = wordAt("7.lift", "lift");
const CHIN = wordAt("7.hands", "chin");
const TWENTY = wordAt("7.hands", "twenty");
const DOWN = wordAt("7.hands", "down");
/** The ring of people who come running: [who, the angle they come from]. */
const RING: Array<[number, number]> = [[1, 0.5], [2, 1.5], [3, 2.6], [7, 3.7], [8, 4.7], [9, 5.8]];

/** ATTEMPT ONE. In daylight, in front of everyone. It fails, loudly. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "Twenty hands",
  shots: [
    {
      cue: "7.well",
      ...cam.push({ on: [W[0], 0.9, W[2] + 1.3], dist: 3.3, to: 2.6, yaw: 196, pitch: 14, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "Morning. From across the well, over the water: he comes up to the rim and leans his pumpkin out over it to look down.",
      stage: (t, { p }) => <Hero position={KNEEL} rotationY={NORTH} animation="idle" blendTo="crouch" blend={ease(ramp(p, 0.1, 0.6))} headPitch={0.6 * ease(ramp(p, 0.2, 0.8))} carve="wow" />,
    },
    {
      cue: "7.back",
      ...cam.top({ on: WATER, height: 1.9, to: 1.5, fov: 44 }),
      zone: "village",
      look: "overworld-day",
      note: "Straight down into the well. In the blue water, looking back up: a pumpkin with a flat carved mouth. Of course.",
      stage: () => <WaterPumpkin position={[WATER[0], WATER[1], WATER[2] + 0.1]} carve="flat" />,
    },
    {
      cue: "7.lift",
      ...cam.push({ on: [ME[0], 1.05, ME[2]], dist: 2.4, to: 1.9, yaw: -8, pitch: 2, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "He steps back from the well, faces us, takes hold of his pumpkin with both hands, and on 'lift' it starts to come up.",
      stage: (t) => <Hero position={ME} rotationY={SOUTH} animation="idle" blendTo="lift" blend={ease(ramp(t, 0.5, LIFT))} raise={0.1 * ease(ramp(t, LIFT, LIFT + 0.5))} carve="grin" />,
    },
    {
      cue: "7.hands",
      ...cam.push({ on: [ME[0], 1.15, ME[2]], dist: 4.4, to: 3.6, yaw: 12, pitch: 20, fov: 42 }),
      zone: "village",
      look: "overworld-day",
      note: "Wider and from above. The pumpkin is up to his chin. On 'twenty' six grown-ups run in from every side, and on 'down' all their hands slam it back onto his head.",
      stage: (t) => {
        const up = 0.1 + 0.16 * ease(ramp(t, 0, CHIN)) - 0.26 * ramp(t, DOWN - 0.12, DOWN);
        const run = ramp(t, TWENTY - 0.15, DOWN - 0.15);
        return (
          <>
            <Hero position={[ME[0], -jolt(t, DOWN, 0.08), ME[2]]} rotationY={SOUTH} animation="lift" blendTo="cower" blend={ramp(t, DOWN - 0.1, DOWN + 0.1)} raise={up} carve={t < TWENTY ? "grin" : "fear"} />
            {t >= TWENTY - 0.15
              ? RING.map(([who, a]) => {
                  const far: Vec3 = [ME[0] + Math.sin(a) * 4.6, 0, ME[2] + Math.cos(a) * 4.6];
                  const near: Vec3 = [ME[0] + Math.sin(a) * 0.72, 0, ME[2] + Math.cos(a) * 0.72];
                  return <Townie key={who} who={who} {...stride(far, near, run)} animation={run < 1 ? "run" : "idle"} arms={run < 1 ? undefined : "press"} time={t - DOWN + 0.2} headPitch={0.3} carve="wow" />;
                })
              : null}
          </>
        );
      },
    },
    {
      cue: "7.rope",
      ...cam.push({ on: [ME[0] + 0.1, 1.2, ME[2]], dist: 2.5, to: 2.0, yaw: -14, pitch: 0, fov: 38 }),
      zone: "village",
      look: "overworld-day",
      note: "His pumpkin, frowning, with a rope round it knotted under the chin. His mother stands behind him, head bent, pulling the knot tight.",
      stage: (t) => (
        <>
          <Hero position={ME} rotationY={SOUTH} animation="idle" rope carve="frown" />
          <Townie who={4} position={[ME[0] + 0.3, 0, ME[2] - 0.55]} rotationY={-0.25} animation="idle" arms="press" time={t % 0.7} headPitch={0.4} carve="glad" />
        </>
      ),
    },
  ],
});
