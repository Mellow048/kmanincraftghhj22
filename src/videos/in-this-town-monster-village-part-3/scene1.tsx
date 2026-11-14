import { cam, storyScene } from "../../engine";
import { NIGHT, Pillager, WARM, Z3, m, mh, timing } from "./kit";

/** TEMPORARY: a look at the new pack parts (the pillagers, the mansion, its hall) before the film is staged. */
export const scene1 = storyScene(timing, {
  id: "scene1",
  title: "Pack check",
  shots: [
    {
      cue: "1.town",
      ...cam.push({ on: mh(0, 1.1, 4), dist: 6.4, to: 6.0, yaw: 0, pitch: 4, fov: 44 }),
      zone: Z3.hall,
      look: WARM,
      note: "Pack check: five pillagers in a row in the hall, the chief in the middle, one walking, one with a crossbow.",
      stage: (t) => (
        <>
          <Pillager n={0} position={mh(-2.6, 0, 4)} rotationY={0.3} />
          <Pillager n={1} position={mh(-1.3, 0, 4)} crossbow armR={-1.3} />
          <Pillager chief position={mh(0, 0, 4.2)} talk={1} />
          <Pillager n={2} position={mh(1.3, 0, 4)} walk={t * 1.4} rotationY={-0.5} />
          <Pillager n={3} position={mh(2.6, 0, 4)} cheer={1} />
        </>
      ),
    },
    {
      cue: "1.friend",
      ...cam.push({ on: mh(0, 1.55, 4.2), dist: 2.6, to: 2.2, yaw: 18, pitch: 2, fov: 38 }),
      zone: Z3.hall,
      look: WARM,
      note: "Pack check: the chief's face close, a second pillager beside him, to see the scowl and the nose.",
      stage: () => (
        <>
          <Pillager chief position={mh(0, 0, 4.2)} armR={-1.4} />
          <Pillager n={1} position={mh(-1.1, 0, 3.8)} rotationY={0.4} mad={0.3} />
        </>
      ),
    },
    {
      cue: "1.found",
      ...cam.push({ on: m(0, 6, -2), dist: 36, to: 33, yaw: 0, pitch: 9, fov: 50 }),
      zone: Z3.mansion,
      look: NIGHT,
      note: "Pack check: the mansion from the front, over the dark oak forest, all three floors in frame.",
      stage: () => null,
    },
    {
      cue: "1.pick",
      ...cam.push({ on: m(0, 5, -4), dist: 46, to: 43, yaw: 32, pitch: 34, fov: 50 }),
      zone: Z3.mansion,
      look: NIGHT,
      note: "Pack check: the mansion from above and to one side, the angle of the owner's own picture of it.",
      stage: () => null,
    },
    {
      cue: "2.tree",
      ...cam.push({ on: m(0, 2, 0.5), dist: 9, to: 8, yaw: 14, pitch: 5, fov: 44 }),
      zone: Z3.mansion,
      look: NIGHT,
      note: "Pack check: the front door, its steps and lanterns, with a pillager on the step for scale.",
      stage: () => <Pillager n={2} position={m(1.0, 0.3, 1.2)} crossbow />,
    },
    {
      cue: "2.watch",
      ...cam.push({ on: mh(0, 2.6, -0.5), dist: 14, to: 13, yaw: -14, pitch: 7, fov: 52 }),
      zone: Z3.hall,
      look: WARM,
      note: "Pack check: the whole hall, as in the owner's picture: table, map, seats, chandelier, windows, shelves.",
      stage: () => (
        <>
          <Pillager n={0} sit position={mh(0, 0.5 - 0.56 * 0.98, -2.45)} />
          <Pillager chief position={mh(-3.2, 0, 2.6)} rotationY={0.4} />
        </>
      ),
    },
  ],
});
