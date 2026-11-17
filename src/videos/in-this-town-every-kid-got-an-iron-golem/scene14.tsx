import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { FaceLight, Hero, NORTH, PLACE, SnowCap, SnowGolem, Snowfall, Stick, SubscribeSign, ease, jolt, ramp, timing, wordAt } from "./kit";

const STAND = PLACE.stand;
const ME: Vec3 = [STAND[0] + 0.36, 0, STAND[2] + 0.75];
const TWO = wordAt("14.sub", "two");

/** THE ASK. And the first sign of part two: the snow is landing on him, and the pumpkin moves. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "Part two",
  shots: [
    {
      cue: "14.sub",
      ...cam.push({ on: [STAND[0], 0.2, STAND[2] + 0.3], dist: 4.1, to: 3.6, yaw: 180, pitch: 11, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "'Like and subscribe for part two': the red sign stuck in the ground by the pumpkin, the boy crouched beside it in the falling snow. The snow on the pumpkin is getting deeper. On 'two' the pumpkin rocks, by itself.",
      stage: (t, { p }) => {
        const rock = jolt(t, TWO, 0.5);
        return (
          <>
            <SnowGolem position={STAND} rotationY={NORTH - 0.2} snow={0.02 + 0.05 * ease(ramp(t, 0.3, 2.0))} wet={0.9} armR={null} armL={null} fill={0.6} headRoll={rock} headYaw={0.3 * ease(ramp(t, TWO, TWO + 0.3))} />
            <SnowCap position={[STAND[0], 0.52 + 0.06 * ease(ramp(t, 0.3, 2.0)), STAND[2]]} amount={0.5 + 0.5 * p} />
            <Stick position={[STAND[0] - 0.4, 0.04, STAND[2] - 0.55]} rotation={[0, 0.5, 0]} />
            <SubscribeSign position={[STAND[0] - 0.3, 1.18, STAND[2] + 0.62]} rotationY={NORTH + 0.08} scale={0.38} tilt={0.05 + Math.sin(t * 17) * 0.012} />
            <FaceLight position={[STAND[0] + 0.2, 1.9, STAND[2] - 1.4]} power={5} reach={4.5} />
            <Hero position={ME} rotationY={NORTH - 0.25} animation="crouch" face={t < TWO + 0.1 ? "frown" : "wow"} headYaw={t < TWO + 0.1 ? 0 : 0.3} headPitch={0.3} gaze={0} />
            <Snowfall center={[STAND[0], 2.6, STAND[2]]} area={[8, 6, 8]} count={220} seed={6} />
          </>
        );
      },
    },
  ],
});
