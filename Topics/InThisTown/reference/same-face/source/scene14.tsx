import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { SubscribeSign } from "../../../Topics/InThisTown/creatures";
import { EAST, FireLight, Hero, PLACE, Poppy, Raider, WEST, Wisps, ease, ramp, timing, wordAt } from "./kit";

const LIP = PLACE.lip;
/** The one who looks up. He stands in the middle of the burning village. */
const HIM: Vec3 = [80.7, 0, -3.9];
const LOOKED = wordAt("14.seen", "looked");
const HE = wordAt("14.waved", "he", 1);

const Others = ({ t }: { t: number }) => (
  <>
    <Raider who={4} position={[84.6, 0, -5.6]} rotationY={-2.7} animation="reachUp" torch />
    <Raider who={9} position={[83.4 + t * 0.9, 0, -2.6]} rotationY={EAST} animation="walk" animDistance={t * 0.9} torch />
    <Raider who={7} position={[87.6, 0, -3.4]} rotationY={2.6} animation="cheer" torch />
  </>
);

/** THE WAVE. Nobody in his town could ever wave back. Someone finally does. */
export const scene14 = storyScene(timing, {
  id: "scene14",
  title: "The wave",
  shots: [
    {
      cue: "14.seen",
      ...cam.push({ on: [HIM[0], 1.5, HIM[2]], dist: 7.6, to: 6.2, yaw: -90, pitch: 9, fov: 30 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'One of them looked up, and saw me': from the hill, a long lens on one man in the fire. He turns round and lifts his face straight to us.",
      stage: (t) => {
        const turn = ease(ramp(t, LOOKED - 0.15, LOOKED + 0.5));
        return (
          <>
            <Raider who={0} position={HIM} rotationY={EAST + turn * Math.PI} animation="idle" headPitch={-0.3 * turn} gaze={0} />
            <Others t={t} />
          </>
        );
      },
    },
    {
      cue: "14.waved",
      ...cam.push({ on: [HIM[0], 1.56, HIM[2] + 0.29], dist: 5.0, to: 3.9, yaw: -90, pitch: 7, fov: 34 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'He waved': closer, and held. He only looks, for as long as the sentence takes. Then, on the last two words, the arm goes up.",
      stage: (t) => (
        <>
          <Raider who={0} position={HIM} rotationY={WEST} animation="wave" blendTo="idle" blend={ease(ramp(t, HE - 0.1, HE + 0.22))} headPitch={-0.3} gaze={0} />
          <Others t={t + 1.83} />
        </>
      ),
    },
    {
      cue: "14.sub",
      ...cam.push({ on: [LIP[0], 11.9, 0], dist: 2.75, to: 2.2, yaw: 90, pitch: 2, fov: 38 }),
      zone: "valley2",
      look: "lava-shore",
      note: "'Subscribe before I wave back': him on the hilltop behind the red sign, the golem's flower stuck on it, and his own hand coming slowly up.",
      stage: (t) => (
        <>
          <Hero position={LIP} rotationY={EAST} animation="wave" blendTo="idle" blend={0.6 * ease(ramp(t, 0.35, 1.9))} face={t < 1.15 ? "uneasy" : "smile"} gaze={0} />
          <SubscribeSign position={[LIP[0] + 0.5, 11.84, 0]} rotationY={EAST} scale={0.34} tilt={Math.sin(t * 17) * 0.02} />
          <Poppy position={[LIP[0] + 0.5, 11.94, 0.22]} scale={0.7} />
          <FireLight position={[LIP[0] + 2.2, 11.9, -0.9]} power={18} reach={7} />
          <Wisps position={[LIP[0] - 1.4, 12.5, 0]} t={t + 2} count={12} reach={5} size={0.7} opacity={0.5} color="#5f524a" dir={[0, 0.1, 1]} seed={6} />
        </>
      ),
    },
  ],
});
