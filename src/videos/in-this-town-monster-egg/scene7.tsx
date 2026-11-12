import { cam, storyScene, stride } from "../../engine";
import { MonsterEgg } from "../../../Topics/InThisTown/creatures";
import { CARRIED, EAST, Elder, HeroEgg, NORTH, PLACE, timing } from "./kit";

const ELDER = PLACE.porch;
const FACE: [number, number, number] = [19.3, 1.84, -2.62];

/** THE WARNING. The one person who might know, and all she has left is the rule. */
export const scene7 = storyScene(timing, {
  id: "scene7",
  title: "The oldest woman",
  shots: [
    {
      cue: "7.ask",
      ...cam.push({ on: [19.3, 1.15, -2.2], dist: 4.7, to: 4.2, yaw: -90, pitch: 2 }),
      zone: "town",
      look: "overworld-day",
      note: "From the side: the oldest woman up on her porch, him below holding the egg up to her. A diagonal that fills a tall frame.",
      stage: () => (
        <>
          <Elder position={ELDER} rotationY={-0.45} animation="sit" face="neutral" lookAt={[19.2, 1.75, -1.85]} />
          <HeroEgg position={[19.3, 0.24, -1.72]} rotationY={NORTH + 0.45} carry="lift" face="smile" />
        </>
      ),
    },
    {
      cue: "7.stare",
      ...cam.push({ on: FACE, dist: 1.8, to: 1.35, yaw: 10, pitch: -4, fov: 36 }),
      zone: "town",
      look: "overworld-day",
      note: "'She stared at my egg for a long time': her face, and only the tip of the egg in the bottom of the frame. A slow push, nothing else.",
      stage: (t) => (
        <>
          <Elder position={ELDER} animation="sit" face="uneasy" lookAt={[19.3, 1.7, -1.9]} gaze={0} />
          <MonsterEgg position={[19.33, 1.17, -2.15]} rotationY={0} scale={CARRIED} cracked tilt={Math.sin(t * 1.3) * 0.03} />
        </>
      ),
    },
    {
      cue: "7.told",
      ...cam.orbit({ on: FACE, dist: 1.55, yaw: 26, yawTo: -8, pitch: -12, fov: 36 }),
      zone: "town",
      look: "overworld-day",
      note: "The rule, said from fear. We look up at her from where he stands and drift across her face as she says it.",
      stage: () => <Elder position={ELDER} animation="sit" arms="talk" face="fear" gaze={0} />,
    },
    {
      cue: "7.away",
      ...cam.push({ on: [21.4, 1.1, -1.3], dist: 3.7, to: 3.2, yaw: -86, pitch: 2 }),
      zone: "town",
      look: "overworld-day",
      note: "'Then she walked away': her back, leaving, and him in the corner of the frame with the egg and no answer.",
      stage: (t, { p }) => (
        <>
          <Elder {...stride([20.4, 0, -1.25], [22.5, 0, -1.6], p)} animation="walk" face="neutral" />
          <HeroEgg position={[19.3, 0, -0.85]} rotationY={EAST} face="uneasy" />
        </>
      ),
    },
  ],
});
