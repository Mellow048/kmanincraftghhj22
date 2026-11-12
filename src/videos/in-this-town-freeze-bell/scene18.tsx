import { cam, storyScene } from "../../engine";
import { Hero, JarNeighbor, NORTH, ReachWithBun, ReachingHand, ShadowKey, TownPeople, ramp, timing, wordAt } from "./kit";

/** Owner-directed ending: recall the downward gaze, choose to look up, withhold what he sees. */
export const scene18 = storyScene(timing, {
  id: "scene18",
  title: "The one direction he never looked",
  shots: [
    {
      cue: "18.memory",
      ...cam.push({ on: [8.36, 1.1, -22.045], dist: 3.6, to: 3.1, yaw: 158, pitch: 10, fov: 40 }),
      zone: "shelf",
      look: "void",
      note: "Stay beside the jar as the thought arrives. The bun is still in his spare hand, the right hand is still reaching, and the child's palm has not touched him.",
      stage: (t, { p }) => (<>
        <ReachWithBun position={[8.36, 0, -22.045]} face="uneasy" headPitch={0.08} headYaw={-0.25} /><JarNeighbor alive t={t} /><group position={[3.5 * ramp(p, 0, 1), 0.9 * ramp(p, 0, 1), 0]}><ReachingHand progress={0.65 + p * 0.02} /></group><ShadowKey />
      </>),
    },
    {
      cue: "18.down",
      ...cam.push({ on: [-3.4, 1.65, -2.1], dist: 5.0, to: 4.5, yaw: 38, pitch: 6, fov: 40 }),
      zone: "village",
      look: "overworld-day",
      note: "A brief daylight memory matches 3.golem: the same iron face and fixed downward gaze, while people behind him keep moving after the bell. It is a recollection, not a return home.",
      stage: (t) => (<>
        <Hero position={[-2.7, 0, -0.75]} rotationY={NORTH} animation="idle" face="frown" headPitch={-0.2} headYaw={0.35} time={t + 0.8} /><TownPeople t={t} />
      </>),
    },
    {
      cue: "18.look",
      ...cam.push({ on: [8.36, 1.2, -22.045], dist: 2.9, to: 2.4, yaw: 170, pitch: 5, fov: 40 }),
      zone: "shelf",
      look: "void",
      note: "Back on the same shelf. His head lifts on looked/up, but the camera stays with his face instead of giving a reverse shot of the answer. The approaching hand stays above and short of contact.",
      stage: (t, { p }) => (<>
        <ReachWithBun position={[8.36, 0, -22.045]} face={t < wordAt("18.look", "up") ? "uneasy" : "wow"} headPitch={0.08 - 0.73 * ramp(t, wordAt("18.look", "looked"), wordAt("18.look", "up") + 0.06)} headYaw={-0.25 + 0.1 * ramp(t, wordAt("18.look", "looked"), wordAt("18.look", "up") + 0.06)} /><JarNeighbor alive t={t} /><group position={[3.5, 0.9, 0]}><ReachingHand progress={0.67 + p * 0.08} /></group><ShadowKey />
      </>),
    },
    {
      cue: "18.saw",
      ...cam.push({ on: [8.36, 1.25, -22.045], dist: 2.3, to: 2.0, yaw: 170, pitch: 10, fov: 36 }),
      zone: "shelf",
      look: "void",
      note: "Hold the upward-looking eyes for And I saw. Do not show or invent what is above him. The film-owned timing sends the engine to full black one frame after saw ends; there is no sign, CTA or sequel promise.",
      stage: (t, { p }) => (<>
        <ReachWithBun position={[8.36, 0, -22.045]} face="wow" headPitch={-0.65} headYaw={-0.15} /><JarNeighbor alive t={t} /><group position={[3.5, 0.9, 0]}><ReachingHand progress={0.75 + p * 0.07} /></group><ShadowKey />
      </>),
    },
  ],
});
