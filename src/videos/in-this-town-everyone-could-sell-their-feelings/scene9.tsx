import { cam, storyScene } from "../../engine";
import type { Vec3 } from "../../engine";
import { Hero, Villager, ROBE, timing, wordAt, ramp } from "./kit";

const STAND: Vec3 = [6.4, 0, -1.2];
const FRIEND: Vec3 = [5.6, 0, -0.6];
const CROSS = wordAt("9.worry", "cross");

/** THE FRIEND — the one who kept her fear, warning him. */
export const scene9 = storyScene(timing, {
  id: "scene9",
  title: "The friend",
  shots: [
    {
      cue: "9.friend",
      ...cam.push({ on: [5.9, 1.2, -0.8], dist: 2.8, to: 2.3, yaw: 42, pitch: -2, fov: 38 }),
      zone: "village",
      look: "overworld-night",
      note: "'My best friend was waiting by my stand that night': past his shoulder — she small, torch-lit, hands worried, stand dark behind her.",
      stage: () => (
        <>
          <Hero position={STAND} rotationY={-0.7} animation="idle" face="smile" lookAt={[FRIEND[0], 0.9, FRIEND[2]]} />
          <Villager position={FRIEND} rotationY={2.1} scale={0.7} kid robe={ROBE.friend} lookAt={[STAND[0], 1.1, STAND[2]]} phase={1.1} />
        </>
      ),
    },
    {
      cue: "9.worry",
      ...cam.push({ on: [5.6, 1.05, -0.55], dist: 1.95, to: 1.65, yaw: 22, pitch: 4, fov: 36 }),
      zone: "village",
      look: "overworld-night",
      note: "'You don't look before you cross anymore': close on friend, eyes wide, the line as worry not scold.",
      stage: (t) => (
        <>
          <Villager position={FRIEND} rotationY={2.1} scale={0.7} kid robe={ROBE.friend} lookAt={[STAND[0], 1.1, STAND[2]]} nod={0.06 * ramp(t, CROSS - 0.4, CROSS)} phase={1.1} />
        </>
      ),
    },
    {
      cue: "9.sleeves",
      ...cam.push({ on: [6.4, 1.15, -0.8], dist: 1.9, to: 1.55, yaw: -24, pitch: 2, fov: 36 }),
      zone: "village",
      look: "overworld-night",
      note: "'I don't have to': his answer — shrug, grin, wrong-lightness. He believes it.",
      stage: () => <Hero position={STAND} rotationY={-0.4} animation="shrug" face="grin" gaze={0} />,
    },
  ],
});
